using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using playground.Controllers.Resources;
using playground.Models;
using playground.Persistence;

namespace playground.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly VegaDbContext context;

        public VehiclesController(IMapper mapper, VegaDbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            if(!ModelState.IsValid)
              return BadRequest(ModelState);

            // var model = await context.Models.FindAsync(vehicleResource.ModelId);

            // if(model == null){
            //     ModelState.AddModelError("ModelId","Invalid modelId");
            //     return BadRequest(ModelState);
            // }

            var vehicle = Mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;
            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();

            var result = mapper.Map<Vehicle,VehicleResource>(vehicle);
            return Ok(result);
        }
        [HttpPut("{id}")] // /api/vehicles/{id}
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] VehicleResource vehicleResource)
        {
            if(!ModelState.IsValid)
              return BadRequest(ModelState);

            var vehicle = await context.Vehicles.Include(v=>v.Features)
            .SingleOrDefaultAsync(v=>v.Id == id);

            mapper.Map<VehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;
            
            await context.SaveChangesAsync();

            var result = mapper.Map<Vehicle,VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await context.Vehicles.FindAsync(id);

            if(vehicle == null)
              NotFound();

            context.Remove(vehicle);
            await context.SaveChangesAsync();

            return Ok(id);
        }
    }
}