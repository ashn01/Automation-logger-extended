using Automation_logger_extended.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace Automation_logger_extended.Data.Repositories
{
    public class TestStepRepository : GenericRepository<TestStep>, ITestStepRepository
    {
        public TestStepRepository(webContext webContext) : base(webContext) { }

        public async Task Create(TestStep testStep)
        {
            await _webContext.AddAsync(testStep);
        }

        public IEnumerable<TestStep> GetAllTestStep()
        {
            IEnumerable<TestStep> entities = _webContext.TestSteps
                .Select(testStep => new TestStep
                {
                    Id = testStep.Id,
                    Action = testStep.Action,
                    Code = testStep.Code,
                    TestActionValues = testStep.TestActionValues.Where(testActionValue=>
                        testActionValue.TestStepId == testStep.Id)
                    .OrderBy(testActionValue => testActionValue.Order)
                    .ToList()
                })
                .ToList();

            return entities;
        }

        public TestStep? GetTestStep(int id)
        {
            TestStep? entity = _webContext.TestSteps
                .Where(testStep => testStep.Id == id)
                .Select(testStep => new TestStep
                {
                    Id = testStep.Id,
                    Action = testStep.Action,
                    Code = testStep.Code,
                    TestActionValues = testStep.TestActionValues != null ? testStep.TestActionValues.Where(testActionValue =>
                        testActionValue.TestStepId == testStep.Id)
                    .OrderBy(testActionValue => testActionValue.Order)
                    .ToList() : null
                })
                .AsNoTracking()
                .SingleOrDefault();

            return entity;
        }

        public TestStep? UpdateTestStep(TestStep updatedStep)
        {
            TestStep? tsStep = GetTestStep(updatedStep.Id);

            if (tsStep != null)
            {
                tsStep.Action = updatedStep.Action;
                tsStep.Code = updatedStep.Code;
                //tsStep.TestActionValues = action.TestActionValues;
                _webContext.TestSteps.Update(tsStep);

                if (updatedStep.TestActionValues != null)
                {
                    IEnumerable<TestActionValue> iTavValues = _webContext.TestActionValues
                        .Where(testActionValue => testActionValue.TestStepId == updatedStep.Id)
                        .ToList();
                    _webContext.TestActionValues.RemoveRange(iTavValues); // remove and add new action params

                    foreach (TestActionValue testActionValue in updatedStep.TestActionValues)
                    {
                        testActionValue.TestStepId = tsStep.Id;
                        _webContext.TestActionValues.Add(testActionValue);
                    }
                }

                _webContext.SaveChanges();
            }

            return tsStep;
        }
    }
}