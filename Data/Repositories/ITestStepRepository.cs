using Automation_logger_extended.Models;

namespace Automation_logger_extended.Data.Repositories
{
    public interface ITestStepRepository : IGenericRepository<TestStep>
    {
        Task Create(TestStep testStep);
        IEnumerable<TestStep> GetAllTestStep();
        TestStep? GetTestStep(int id);
        TestStep? UpdateTestStep(TestStep updatedStep);
    }
}