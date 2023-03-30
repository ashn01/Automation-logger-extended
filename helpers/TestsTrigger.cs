using Automation_logger_extended.Data.Repositories;

namespace Automation_logger_extended.helpers
{
    public class TestsTrigger
    {
        private readonly ITestScriptRepository _testScriptRepository;

        TestsTrigger(ITestScriptRepository testScriptRepository)
        {
            _testScriptRepository = testScriptRepository;
        }

        void GetTests()
        {

        }

        // return API URLs
        string GetURL()
        {
            string sUrls="";

            return sUrls;
        }
    }
}
