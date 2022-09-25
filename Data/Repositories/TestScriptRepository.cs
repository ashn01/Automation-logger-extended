using Automation_logger_extended.Models;
using Automation_logger_extended.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Automation_logger_extended.Data.Repositories
{
    public class TestScriptRepository : GenericRepository<TestScript>, ITestScriptRepository
    {
        public TestScriptRepository(webContext webContext) : base(webContext) { }

        /*
         * Name     :   GetEntities
         * Params   :   
         * Return   :   List of testcases
         * Note     :   All testcases with all the results
         */
        public IEnumerable<TestScript> GetEntities(string template)
        {
            IEnumerable<TestScript> entities = _webContext.TestCases
                .Select(tCase=>new TestScript
                {
                    Id = tCase.Id,
                    Name = tCase.Name,
                    Order = tCase.Order,
                    RecentPass = tCase.TestResults
                                .Where(tResult => // pass status and matched template
                                       tResult.Status == true && tResult.Template.Name.Equals(template))
                                .Select(tResult => new TestResult // prevent circular references
                                {
                                    Id=tResult.Id,
                                    Created = tResult.Created,
                                    Version = tResult.Version,
                                    Status = tResult.Status,
                                })
                                .OrderByDescending(tResult => tResult.Created)  // get recent data
                                .SingleOrDefault(), // one row
                    RecentFail = tCase.TestResults
                                .Where(tResult =>
                                       tResult.Status == false && tResult.Template.Name.Equals(template))
                                .Select(tResult => new TestResult
                                {
                                    Id = tResult.Id,
                                    Created = tResult.Created,
                                    Version = tResult.Version,
                                    Status = tResult.Status,
                                })
                                .OrderByDescending(tResult => tResult.Created)
                                .SingleOrDefault(),
                    TestResults = tCase.TestResults
                                .Where( tResult => 
                                        tResult != null 
                                        && tResult.TestScriptId == tCase.Id 
                                        && tResult.Template.Name.Equals(template))
                                .Select(tResult => new TestResult
                                {
                                    Id = tResult.Id,
                                    Created = tResult.Created,
                                    Status = tResult.Status,
                                    Template = new Template {Name = tResult.Template.Name },
                                    TestScriptId = tCase.Id,
                                    Version = tResult.Version,
                                })
                                .OrderByDescending(tResult => tResult.Created)
                                .Take(5)
                                .ToList(),
                })
                .OrderBy(testcase => testcase.Order)
                .ToList();


            return entities;
        }

        /*
         * Name     :   GetEntityByName
         * Params   :   string, name of testcase
         * Return   :   TestCase, an object with data or null if not found
         * Note     :   
         */
        public TestScript? GetEntityByName(string name)
        {
            var result = _webContext.TestCases
                         .Where(testcase => testcase.Name == name)
                         .SingleOrDefault();
            return result;
        }


        /*
         * Name     :   GetAllByTestCases
         * Params   :   
         * Return   :   List of test results
         * Note     :   Return test results filtered by test case id
         */
        public TestScript? GetEntityWithResults(string testcaseName, string template)
        {
            var result = _webContext.TestCases
                         .Where(testcase => testcase.Name == testcaseName)
                         .Select(testcase => new TestScript
                         {
                             Name = testcase.Name,
                             Order = testcase.Order,
                             TestResults = testcase.TestResults
                                .Where(tResult =>
                                       tResult != null
                                       && tResult.TestScriptId == testcase.Id
                                       && tResult.Template.Name.Equals(template))
                                .Select(tResult => new TestResult
                                {
                                    Id = tResult.Id,
                                    Created = tResult.Created,
                                    Status = tResult.Status,
                                    Template = new Template { Name = tResult.Template.Name },
                                    TestScriptId = testcase.Id,
                                    Version = tResult.Version,
                                })
                                .OrderByDescending(tResult => tResult.Created)
                                .Take(20)
                                .ToList()
                         })
                        .SingleOrDefault();
            return result;
        }
        /*
         * Name     :   GetEntitiesWithName
         * Params   :   testcaseName, partial name
         * Return   :   List of test results
         * Note     :   Return test cases that contains testcase name
         */
        public IEnumerable<TestScript> GetEntitiesWithName(string testcaseName)
        {
            var result = _webContext.TestCases
                         .Where(testcase => testcase.Name != null && testcase.Name.Contains(testcaseName))
                         .ToList();

            return result;
        }

    }
}
