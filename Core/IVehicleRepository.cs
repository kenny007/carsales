using System.Collections.Generic;
using System.Threading.Tasks;
using playground.Core.Models;
using playground.Models;

namespace playground.Core
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery filter);
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
    }
}