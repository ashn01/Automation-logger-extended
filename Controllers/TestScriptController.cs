using Automation_logger_extended.Data.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Automation_logger_extended.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestScriptController : ControllerBase
    {
        private readonly ITestScriptRepository _testScriptRepository;

        public TestScriptController(ITestScriptRepository testScriptRepository)
        {
            _testScriptRepository = testScriptRepository;
        }

        [HttpGet("{template}")]
        public IActionResult GetTestScripts(string template)
        {
            if (template == null)
            {
                template = "international";
            }

            try
            {
                var testcases = _testScriptRepository.GetEntities(template);

                return Ok(testcases);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult GetTemplates()
        {
            try
            {

                return Ok("hello");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);
            }
        }
    }
}
