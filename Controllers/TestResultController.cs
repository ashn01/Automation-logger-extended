using Automation_logger_extended.Data.Repositories;
using Automation_logger_extended.Models;
using Automation_logger_extended.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Automation_logger_extended.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestResultController : ControllerBase
    {
        private readonly ITestResultRepository _testResultRepository;
        private readonly ITemplateRepository _templateRepository;
        private readonly ITestCaseRepository _testCaseRepository;

        public TestResultController(
            ITestResultRepository testResultRepository,
            ITemplateRepository templateRepository,
            ITestCaseRepository testCaseRepository
            )
        {
            _testResultRepository = testResultRepository;
            _templateRepository = templateRepository;
            _testCaseRepository = testCaseRepository;
        }

        [HttpPost]
        public IActionResult PutTestResult([FromBody] TestResultViewModel testResult)
        {
            try
            {
                Template template = _templateRepository.GetEntityByName(testResult.TemplateName);
                TestCase testCase = _testCaseRepository.GetEntityByName(testResult.TestCaseName);

                TestResult result = new TestResult
                {
                    TemplateId = template.Id,
                    TestCaseId = testCase.Id,
                    Status = testResult.Status,
                    Version = testResult.Version,
                    Created = DateTime.UtcNow.AddHours(-4) // toronto time
                };

                _testResultRepository.Create(result);
                _testResultRepository.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{template}/{**testcaseName}")]
        public IActionResult SearchTestResults(string template, string testcaseName)
        {
            try
            {
                TestCase testCase = _testCaseRepository.GetEntityWithResults(testcaseName, template);
                return Ok(testCase);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }
    }
}
