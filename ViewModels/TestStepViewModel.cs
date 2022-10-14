using Automation_logger_extended.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Automation_logger_extended.ViewModels
{
    public class TestStepViewModel
    {
        public int Id { get; set; }

        public string Action { get; set; }
        public string Code { get; set; }
        // relationship
        public ICollection<TestActionValueViewModel>? TestActionValues { get; set; }
    }
}
