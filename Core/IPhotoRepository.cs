using System.Collections.Generic;
using System.Threading.Tasks;
using playground.Core.Models;

namespace playground.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}