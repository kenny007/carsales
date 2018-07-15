using System.Threading.Tasks;

namespace playground.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}