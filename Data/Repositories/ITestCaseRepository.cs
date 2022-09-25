using Automation_logger_extended.Models;

namespace Automation_logger_extended.Data.Repositories
{
    public interface ITestCaseRepository : IGenericRepository<TestCase>
    {
        IEnumerable<TestCase> GetEntities(string template);
        TestCase? GetEntityByName(string name);
        TestCase? GetEntityWithResults(string testcaseName, string template);
        IEnumerable<TestCase> GetEntitiesWithName(string testcaseName);
    }
}