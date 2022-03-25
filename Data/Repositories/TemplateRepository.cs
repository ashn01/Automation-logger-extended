using Automation_logger_extended.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Automation_logger_extended.Data.Repositories
{
    public class TemplateRepository : GenericRepository<Template>, ITemplateRepository
    {
        public TemplateRepository(webContext webContext) : base(webContext) { }

    }
}
