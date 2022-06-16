using Automation_logger_extended.Models;
using Automation_logger_extended.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Automation_logger_extended.Data.Repositories
{
    public class TestCaseRepository : GenericRepository<TestCase>, ITestCaseRepository
    {
        public TestCaseRepository(webContext webContext) : base(webContext) { }

        /*
         * Name     :   GetEntities
         * Params   :   
         * Return   :   List of testcases
         * Note     :   All testcases with all the results
         */
        public IEnumerable<TestCase> GetEntities(string template)
        {
            IEnumerable<TestCase> entities = _webContext.TestCases
                .Select(tCase=>new TestCase
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
                                        && tResult.TestCaseId == tCase.Id 
                                        && tResult.Template.Name.Equals(template))
                                .Select(tResult => new TestResult
                                {
                                    Id = tResult.Id,
                                    Created = tResult.Created,
                                    Status = tResult.Status,
                                    Template = new Template {Name = tResult.Template.Name },
                                    TestCaseId = tCase.Id,
                                    Version = tResult.Version,
                                })
                                .OrderByDescending(tResult => tResult.Created)
                                .Take(5)
                                .ToList(),
                })
                .ToList();


            return entities;
        }

        /*
         * Name     :   GetEntityByName
         * Params   :   string, name of testcase
         * Return   :   TestCase, an object with data or null if not found
         * Note     :   
         */
        public TestCase? GetEntityByName(string name)
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
        public TestCase? GetEntityWithResults(string testcaseName, string template)
        {
            var result = _webContext.TestCases
                         .Where(testcase => testcase.Name == testcaseName)
                         .Select(testcase => new TestCase
                         {
                             Name = testcase.Name,
                             Order = testcase.Order,
                             TestResults = testcase.TestResults
                                .Where(tResult =>
                                       tResult != null
                                       && tResult.TestCaseId == testcase.Id
                                       && tResult.Template.Name.Equals(template))
                                .Select(tResult => new TestResult
                                {
                                    Id = tResult.Id,
                                    Created = tResult.Created,
                                    Status = tResult.Status,
                                    Template = new Template { Name = tResult.Template.Name },
                                    TestCaseId = testcase.Id,
                                    Version = tResult.Version,
                                })
                                .OrderByDescending(tResult => tResult.Created)
                                .Take(20)
                                .ToList()
                         })
                        .SingleOrDefault();
            return result;
        }

    }
}
