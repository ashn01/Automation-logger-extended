
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Automation_logger_extended.Models
{
    public class Panel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } 
        public int TestScriptId { get; set; }
        public TestScript? TestScript { get; set; }
        public int TemplateId { get; set; }
        public Template? Template { get; set; }

        public int Order { get; set; }
    }
}
