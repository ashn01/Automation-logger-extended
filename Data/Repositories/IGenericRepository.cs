using System.Collections.Generic;
using System.Threading.Tasks;
namespace Automation_logger_extended.Data.Repositories
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> GetEntities();
        void Create(TEntity entity); 
        Task CreateWithSave(TEntity entity);
        Task Update(TEntity entity);
        Task Save();
        void SaveChanges();
        void DeleteAll();
    }
}