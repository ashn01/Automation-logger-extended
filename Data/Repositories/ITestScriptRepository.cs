using Automation_logger_extended.Models;

namespace Automation_logger_extended.Data.Repositories
{
    public interface ITestScriptRepository : IGenericRepository<TestScript>
    {
        IEnumerable<TestScript> GetEntities(string template);
        TestScript? GetEntityByName(string name);
        TestScript? GetEntityWithResults(string testcaseName, string template);
        IEnumerable<TestScript> GetEntitiesWithName(string testcaseName);
    }
}