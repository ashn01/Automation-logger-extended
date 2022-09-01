
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Automation_logger_extended.Models
{
    public class Panel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } 
        public int TestCaseId { get; set; }
        public TestCase? TestCase { get; set; }
        public int TemplateId { get; set; }
        public Template? Template { get; set; }

        public int Order { get; set; }
    }
}
