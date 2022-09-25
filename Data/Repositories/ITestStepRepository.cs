using Automation_logger_extended.Models;

namespace Automation_logger_extended.Data.Repositories
{
    public interface ITestStepRepository
    {
        Task Create(TestStep testStep);
        IEnumerable<TestStep> GetAllTestStep();
    }
}