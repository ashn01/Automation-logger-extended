using Automation_logger_extended.Models;

namespace Automation_logger_extended.Data.Repositories
{
    public interface ITemplateRepository : IGenericRepository<Template>
    {
        Template? GetEntityByName(string name);
    }
}