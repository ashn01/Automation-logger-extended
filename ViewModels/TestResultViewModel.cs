namespace Automation_logger_extended.ViewModels
{
    public class TestResultViewModel
    {
        public int Id { get; set; }
        public Boolean Status { get; set; }
        public string? Version { get; set; }
        public DateTimeOffset? Created { get; set; }
        public string TemplateName { get; set; }
        public string TestScriptName { get; set; }
    }
}
