using Microsoft.EntityFrameworkCore;
using Automation_logger_extended.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Automation_logger_extended.Data.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        protected readonly webContext _webContext;

        public GenericRepository(webContext webContext)
        {
            _webContext = webContext;
        }

        public IEnumerable<TEntity> GetEntities()
        {
            return _webContext.Set<TEntity>().AsNoTracking();
        }
        public async Task Create(TEntity entity)
        {
            await _webContext.Set<TEntity>().AddAsync(entity);
            await Save();
        }
        public async Task Update(TEntity entity)
        {
            _webContext.Set<TEntity>().Update(entity);
            await Save();
        }
        public async Task Save()
        {
            await _webContext.SaveChangesAsync();
        }
    }
}
