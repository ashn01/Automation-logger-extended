﻿using Automation_logger_extended.Data.Repositories;
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
        private readonly ITestScriptRepository _testScriptRepository;

        public TestResultController(
            ITestResultRepository testResultRepository,
            ITemplateRepository templateRepository,
            ITestScriptRepository testScriptRepository
            )
        {
            _testResultRepository = testResultRepository;
            _templateRepository = templateRepository;
            _testScriptRepository = testScriptRepository;
        }

        [HttpPost]
        public IActionResult PostTestResult([FromBody] TestResultViewModel testResult)
        {
            try
            {
                Template template = _templateRepository.GetEntityByName(testResult.TemplateName);
                TestScript testScript = _testScriptRepository.GetEntityByName(testResult.TestScriptName);
                // no test case found
                if (testScript == null)
                {
                    string[] split = testResult.TestScriptName.Split("/");
                    string testSection = split[0];
                    var testScripts = _testScriptRepository.GetEntitiesWithName(testSection);
                    _testScriptRepository.Create(new Models.TestScript { Name = testResult.TestScriptName, Order = testScripts.Last().Order + 1 });
                    _testScriptRepository.SaveChanges();

                    testScript = _testScriptRepository.GetEntityByName(testResult.TestScriptName);
                }

                TestResult result = new TestResult
                {
                    TemplateId = template.Id,
                    TestScriptId = testScript.Id,
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

        [HttpGet("{template}/{**testScriptName}")]
        public IActionResult SearchTestResults(string template, string testScriptName)
        {
            try
            {
                TestScript testScript = _testScriptRepository.GetEntityWithResults(testScriptName, template);
                return Ok(testScript);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }
    }
}
