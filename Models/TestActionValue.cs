using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Automation_logger_extended.Models
{
    public class TestActionValue
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string DefaultValue { get; set; }
        public int Order { get; set; }

        // relationship
        public int TestStepId { get; set; }
        public TestStep TestStep { get; set; }
    }
}
