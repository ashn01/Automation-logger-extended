using Microsoft.AspNetCore.Mvc;
using Automation_logger_extended.Models;
using Automation_logger_extended.Data.Repositories;

namespace Automation_logger_extended.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController : ControllerBase
    {
        private readonly ITemplateRepository _templateRepository;

        public TemplateController(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        [HttpGet]
        public IActionResult GetTemplates()
        {
            try
            {
                var templates = _templateRepository.GetEntities();

                return Ok(templates);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("insert")]
        public IActionResult PutTemplate([FromBody]Template template)
        {
            try
            {
                _templateRepository.Create(template);

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
