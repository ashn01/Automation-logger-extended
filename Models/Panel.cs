
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Automation_logger_extended.Models
{
    public class Panel
    {
        [Key, Column(Order =0)]
        public int TestCaseId { get; set; }
        public TestCase TestCase { get; set; }
        [Key, Column(Order = 1)]
        public int TemplateId { get; set; }
        public Template Template { get; set; }

        public int Order { get; set; }
    }
}
