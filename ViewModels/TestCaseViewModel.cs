using Automation_logger_extended.Models;
using Newtonsoft.Json;

namespace Automation_logger_extended.ViewModels
{
    public class TestCaseViewModel
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "testResults")]
        public ICollection<TestResult>? TestResults { get; set; }
        [JsonProperty(PropertyName = "recentPass")]
        public TestResult? RecentPass { get; set; }
        [JsonProperty(PropertyName = "recentFail")]
        public TestResult? RecentFail { get; set; }

    }
}
