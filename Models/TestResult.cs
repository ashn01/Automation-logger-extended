using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Automation_logger_extended.Models
{
    public class TestResult
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public Boolean Status { get; set; }
        [Required]
        public string? Version { get; set; }
        [Required]
        public DateTimeOffset Created { get; set; }

        // relationship
        public int TemplateId { get; set; }
        public Template Template { get; set; }

        public int TestScriptId { get; set; }
        public TestScript TestScript { get; set; }
    }
}
