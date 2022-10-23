using AutoMapper;
using Automation_logger_extended.Data.Repositories;
using Automation_logger_extended.Models;
using Automation_logger_extended.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Automation_logger_extended.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestStepController : ControllerBase
    {
        private readonly ITestStepRepository _testStepRepository;
        private IMapper _mapper;

        public TestStepController(ITestStepRepository testStepRepository,
                                  IMapper mapper)
        {
            _testStepRepository = testStepRepository;
            _mapper = mapper;
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

        [HttpPost]
        public IActionResult AddNewAction([FromBody]TestStepViewModel newAction)
        {
            try
            {
                var action = _mapper.Map<TestStep>(newAction);
                _testStepRepository.Create(action);
                _testStepRepository.SaveChanges();

                var actions = _testStepRepository.GetAllTestStep();
                return Ok(actions);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult ModifyAction([FromBody] TestStepViewModel newAction)
        {
            try
            {
                TestStep action = _mapper.Map<TestStep>(newAction);

                TestStep? tsStep = _testStepRepository.UpdateTestStep(action);
                if (tsStep != null)
                {
                    TestStepViewModel tsModified = _mapper.Map<TestStepViewModel>(tsStep);
                    return Ok(tsModified);
                }
                else
                {
                    return BadRequest("ID NOT FOUND");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);
            }
        }


    }
}
