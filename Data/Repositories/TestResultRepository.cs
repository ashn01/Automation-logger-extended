using Automation_logger_extended.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Automation_logger_extended.Data.Repositories
{
    public class TestResultRepository : GenericRepository<TestResult>, ITestResultRepository
    {
        public TestResultRepository(webContext webContext) : base(webContext) { }
    }
}
