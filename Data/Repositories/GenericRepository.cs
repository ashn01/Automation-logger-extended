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
        public void Create(TEntity entity)
        {
             _webContext.Set<TEntity>().Add(entity);
        }
        public async Task CreateWithSave(TEntity entity)
        {
            await _webContext.Set<TEntity>().AddAsync(entity);
            await Save();
        }
        public async Task Update(TEntity entity)
        {
            _webContext.Set<TEntity>().Update(entity);
            await Save();
        }

        public void DeleteAll()
        {
            foreach(var entity in _webContext.Set<TEntity>())
            {
                _webContext.Set<TEntity>().Remove(entity);
            }
            SaveChanges();
        }

        public async Task Save()
        {
            await _webContext.SaveChangesAsync();
        }
        public void SaveChanges()
        {
            _webContext.SaveChanges();
        }
    }
}
