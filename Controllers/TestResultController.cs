using Automation_logger_extended.Data.Repositories;
using Automation_logger_extended.Models;
using Microsoft.AspNetCore.Mvc;

namespace Automation_logger_extended.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestResultController : ControllerBase
    {
        private readonly ITestResultRepository _testResultRepository;

        public TestResultController(ITestResultRepository testResultRepository)
        {
            _testResultRepository = testResultRepository;
        }

        [HttpPut("insert")]
        public IActionResult PutTestResult([FromBody] TestResult testResult)
        {
            try
            {
                _testResultRepository.Create(testResult);

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);
            }
        }
    }
}
