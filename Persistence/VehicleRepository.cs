using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using playground.Core;
using playground.Core.Models;
using playground.Extensions;
using playground.Models;

namespace playground.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;

        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;
        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true){
            if(!includeRelated)
            return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
                    .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                    .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                    .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle){
            context.Vehicles.Add(vehicle);
        }
        public void Remove(Vehicle vehicle){
            context.Vehicles.Remove(vehicle);
        }

        public async Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            var query = context.Vehicles
                    .Include(v=>v.Model)
                    .ThenInclude(m=>m.Make)
                    .Include(v=>v.Features)
                    .ThenInclude(vf=>vf.Feature)
                    .AsQueryable();

                    if(queryObj.MakeId.HasValue)
                    query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);

                    if(queryObj.ModelId.HasValue)
                    query = query.Where(v => v.ModelId == queryObj.ModelId.Value);

                 
                    //Expression<Func<Vehicle, object>> func = v => v.ContactName;
                    var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
                    {
                        ["make"] = v => v.Model.Make.Name,
                        ["model"] = v => v.Model.Name,
                        ["contactName"] = v => v.ContactName
                    };
                  
                  query = query.ApplyOrdering(queryObj, columnsMap);
                   //here paging is done in SQL Server not in memory
                   query = query.ApplyPaging(queryObj);

                  return await query.ToListAsync();
        }
        
        private IQueryable<Vehicle> ApplyOrdering(VehicleQuery queryObj, IQueryable<Vehicle> query, Dictionary<string, Expression<Func<Vehicle, object>>> columnsMap){
             if (queryObj.IsSortAscending)
                  return  query = query.OrderBy(columnsMap[queryObj.SortBy]);
                    else
                  return   query = query.OrderByDescending(columnsMap[queryObj.SortBy]);
        }
    }
}