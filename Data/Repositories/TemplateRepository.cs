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

        /*
         * Name     :   GetEntityByName
         * Params   :   string, name of template
         * Return   :   Template, an object with data or null if not found
         * Note     :   
         */
        public Template? GetEntityByName(string name)
        {
            var result = _webContext.Templates
                         .Where(template => template.Name == name)
                         .SingleOrDefault();
            return result;
        }
    }
}
