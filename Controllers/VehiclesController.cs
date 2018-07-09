using Microsoft.AspNetCore.Mvc;
using playground.Models;

namespace playground.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        [HttpPost]
        public IActionResult CreateVehicle(Vehicle vehicle){
            return Ok(vehicle);
        }
    }
}