using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Automation_logger_extended.Models
{
    public class TestScript
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }
        public int Order { get; set; }

        // defalt value -1 (Never run), 0 reset value, 1+ failed counts
        // purpose of this value is to run regression scripts regularly if it has failed recently
        [NotMapped]
        public int FailedContinued { get; set; } // number of failed continuously. be reset when passed. be accumulated when failed

        // relationship
        public ICollection<TestResult>? TestResults { get; set; }
        public ICollection<Panel>? Panels { get; set; }
        [NotMapped]
        public TestResult? RecentPass { get; set; }
        [NotMapped]
        public TestResult? RecentFail { get; set; }
    }
}
