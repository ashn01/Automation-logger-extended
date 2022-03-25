using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Automation_logger_extended.Models
{
    public class TestCase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public int Order { get; set; }

        // relationship
        public ICollection<TestResult>? TestResults { get; set; }
        [NotMapped]
        public TestResult? RecentPass { get; set; }
        [NotMapped]
        public TestResult? RecentFail { get; set; }
    }
}
