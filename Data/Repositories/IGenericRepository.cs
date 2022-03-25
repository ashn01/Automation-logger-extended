using System.Collections.Generic;
using System.Threading.Tasks;
namespace Automation_logger_extended.Data.Repositories
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> GetEntities();
        Task Create(TEntity entity);
        Task Update(TEntity entity);
        Task Save();
    }
}