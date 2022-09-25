using Automation_logger_extended.Data.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Automation_logger_extended.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestStepController : ControllerBase
    {
        private readonly ITestStepRepository _testStepRepository;

        public TestStepController(ITestStepRepository testStepRepository)
        {
            _testStepRepository = testStepRepository;
        }


        [HttpGet]
        public IActionResult GetAction()
        {
            try
            {
                var actions = _testStepRepository.GetAllTestStep();

                return Ok(actions);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);
            }
        }
    }
}
