using Automation_logger_extended.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automation_logger_extended.Data.Repositories
{
    public class TestStepRepository : GenericRepository<TestStep>, ITestStepRepository
    {
        public TestStepRepository(webContext webContext) : base(webContext) { }

        public async Task Create(TestStep testStep)
        {
            await _webContext.AddAsync(testStep);
        }

        public IEnumerable<TestStep> GetAllTestStep()
        {
            IEnumerable<TestStep> entities = _webContext.TestSteps.ToList();

            return entities;
        }
    }
}