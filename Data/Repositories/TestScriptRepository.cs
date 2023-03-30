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
         * Return   :   List of testscripts
         * Note     :   All testscripts with all the results
         */
        public IEnumerable<TestScript> GetEntities(string template)
        {
            IEnumerable<TestScript> entities = _webContext.TestScripts
                .Select( testscript => 
                    new TestScript
                    {
                        Id = testscript.Id,
                        Name = testscript.Name,
                        Order = testscript.Order,
                        RecentPass = testscript.TestResults
                                    .Where(tResult => // pass status and matched template
                                           tResult.Status == true && tResult.Template.Name.Equals(template))
                                    .Select(tResult => new TestResult() // prevent circular references
                                    {
                                        Id = tResult.Id,
                                        Created = tResult.Created,
                                        Version = tResult.Version,
                                        Status = tResult.Status,
                                    })
                                    .OrderByDescending(tResult => tResult.Created) // get recent data
                                    .SingleOrDefault(), // one row
                        RecentFail = testscript.TestResults
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
                        FailedContinued = testscript.TestResults
                                    .Where(tResult =>
                                                tResult.Status == false &&
                                                tResult.Template.Name.Equals(template)
                                                &&
                                                (
                                                tResult.Created.CompareTo(testscript.TestResults
                                                                                             .Where(tResult => // pass status and matched template
                                                                                             tResult.Status == true && tResult.Template.Name.Equals(template))
                                                                                             .OrderByDescending(tResult => tResult.Created) // get recent data
                                                                                             .FirstOrDefault().Created ) > 0
                                                )
                                    )
                                    .Count(),
                        TestResults = testscript.TestResults
                                    .Where(tResult =>
                                            tResult != null
                                            && tResult.TestScriptId == testscript.Id
                                            && tResult.Template.Name.Equals(template))
                                    .Select(tResult => new TestResult
                                    {
                                        Id = tResult.Id,
                                        Created = tResult.Created,
                                        Status = tResult.Status,
                                        Template = new Template { Name = tResult.Template.Name },
                                        TestScriptId = testscript.Id,
                                        Version = tResult.Version,
                                    })
                                    .OrderByDescending(tResult => tResult.Created)
                                    .Take(10)
                                    .ToList(),
                    })
                .OrderBy(testscript => testscript.Order)
                .ToList();


            return entities;
        }

        /*
         * Name     :   GetEntityByName
         * Params   :   string, name of testscript
         * Return   :   Testscript, an object with data or null if not found
         * Note     :   
         */
        public TestScript? GetEntityByName(string name)
        {
            var result = _webContext.TestScripts
                         .Where(testscript => testscript.Name == name)
                         .SingleOrDefault();
            return result;
        }


        /*
         * Name     :   GetAllByTestScripts
         * Params   :   
         * Return   :   List of test results
         * Note     :   Return test results filtered by test script id
         */
        public TestScript? GetEntityWithResults(string testscriptName, string template)
        {
            var result = _webContext.TestScripts
                         .Where(testscript => testscript.Name == testscriptName)
                         .Select(testscript => new TestScript
                         {
                             Name = testscript.Name,
                             Order = testscript.Order,
                             TestResults = testscript.TestResults
                                .Where(tResult =>
                                       tResult != null
                                       && tResult.TestScriptId == testscript.Id
                                       && tResult.Template.Name.Equals(template))
                                .Select(tResult => new TestResult
                                {
                                    Id = tResult.Id,
                                    Created = tResult.Created,
                                    Status = tResult.Status,
                                    Template = new Template { Name = tResult.Template.Name },
                                    TestScriptId = testscript.Id,
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
         * Params   :   testscriptName, partial name
         * Return   :   List of test results
         * Note     :   Return test scripts that contains testscript name
         */
        public IEnumerable<TestScript> GetEntitiesWithName(string testscriptName)
        {
            var result = _webContext.TestScripts
                         .Where(testscript => testscript.Name != null && testscript.Name.Contains(testscriptName))
                         .ToList();

            return result;
        }

    }
}
