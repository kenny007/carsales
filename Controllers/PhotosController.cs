using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace playground.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController
    {
        [HttpPost]
        public IActionResult Upload(int vehicleId, IFormFile file) { 

        }
    }
}