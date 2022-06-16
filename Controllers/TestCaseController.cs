using Automation_logger_extended.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Automation_logger_extended.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestCaseController : ControllerBase
    {
        private readonly ITestCaseRepository _testCaseRepository;

        public TestCaseController(ITestCaseRepository testCaseRepository)
        {
            _testCaseRepository = testCaseRepository;
        }

        [HttpGet("{template}")]
        public IActionResult GetTestCases(string template)
        {
            if (template == null)
            {
                template = "international";
            }
                
            try
            {
                var testcases = _testCaseRepository.GetEntities(template);

                return Ok(testcases);
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("init")]
        public  IActionResult Init()
        {
            try
            {
                string[] array = new string[] {"- Automated Acceptance Test -","Automated Acceptance Test/Audit - Client Acceptance Part 1.t",
"Automated Acceptance Test/Audit - Client Acceptance Part 2.t",
"Automated Acceptance Test/Audit - Client Acceptance Part 3.t",
"Automated Acceptance Test/Audit - Client Acceptance Part 4.t",
"Automated Acceptance Test/Audit - Client Acceptance Part 5.t",
"Automated Acceptance Test/Audit - Client Acceptance Part 6.t",
"Automated Acceptance Test/Audit - Client Acceptance Part 7.t",
"Automated Acceptance Test/Audit - Client Acceptance Part 8.t",
"Automated Acceptance Test/Audit - Client Acceptance Part 9.t",
"Automated Acceptance Test/Audit - Client Acceptance Part 10.t",
"Automated Acceptance Test/Audit - Firm side AcceptanceTest.t",
"Automated Acceptance Test/Audit - Firm side Acceptance Part2.t",
"Automated Acceptance Test/Audit - Firm side Acceptance Part3.t",
"Automated Acceptance Test/Audit - Firm side Acceptance Part4.t",
"Automated Acceptance Test/Audit - Firm side Acceptance Part5.t",
"Automated Acceptance Test/Audit - Patch Client Acceptance.t",
"Automated Acceptance Test/TD-9435 Acceptance test - Content.t",
"Automated Acceptance Test/AS-1439 Include-Exclude Combined Assertions.t",
"Automated Acceptance Test/Audit - Firm side AcceptanceTest_POC.t",
"- Control Matrix and Controls -",
"Control Matrix and Controls/TD-1652 Control Matrix and Editing Controls.t",
"- Dialogs -",
"Dialogs/TD-758 Document Properties.t",
"Dialogs/TD-1546 Risks.t",
"Dialogs/TD-1602 Reportable Items.t",
"Dialogs/TD-1617 Controls.t",
"Dialogs/TD-1679 Import Procedures.t",
"Dialogs/TD-1707 New Procedures.t",
"- EP7 -",
"EP7/TD-2782 EP7 and Logo Preview Functionality.t",
"- Experimental Test Plans -",
"Experimental Test Plans/Audit - Document Translated To Chinese Test.t",
"Experimental Test Plans/Audit - Patch Test.t",
"Experimental Test Plans/JenkinsEnableJsrt.t",
"- FSA -",
"FSA/TD-1783 Balances.t",
"FSA/AS-2567 Configuration Setting Part 1.t",
"FSA/AS-2567 Configuration Setting Part 2.t",
"FSA/AS-3029 Multiple FSA Documents.t",
"FSA/AS-3008 Control Risk.t",
"- Menus - Areas -",
"Menus - Areas/TD-1574 Areas menu items - Work Programs and Checklists (Client Side).t",
"Menus - Areas/TD-1575 Areas menu items - Work Programs and Checklists (Template Side).t",
"- Menus - Author -",
"Menus - Author/TD-1595 Author menu items - Work Programs and Checklists (Template Side).t",
"- Menus - Document -",
"Menus - Document/TD-1545 Document menu items - Work Programs and Checklists (Template Side).t",
"Menus - Document/TD-1554 Document menu items - Work Programs and Checklists (Client Side).t",
"Menus - Document/TD-1573 Document menu items - Flat Forms (Client Side).t",
"Menus - Document/TD-1577 Document menu items - Flat Forms (Template Side).t",
"Menus - Document/TD-1580 Document menu items - Letters (Template Side).t",
"Menus - Document/TD-1624 Document menu items - Letters (Client Side).t",
"- Menus - Help -",
"Menus - Help/TD-1570 Help menu items (Template Side).t",
"Menus - Help/TD-1571 Help menu items (Client Side).t",
"- Menus - Options -",
"Menus - Options/TD-1568 Options Menu Items (Template Side).t",
"- Menus - Procedures -",
"Menus - Procedures/TD-1553 Procedure menu items - Work Programs and Checklists (Template Side).t",
"Menus - Procedures/TD-1594 Procedure menu items - Work Programs and Checklists (Client Side).t",
"- Miscellaneous Document Functionality -",
"Miscellaneous Document Functionality/TD-191 Highlight External Cells (Template Side).t",
"Miscellaneous Document Functionality/TD-566 Lock Down.t",
"Miscellaneous Document Functionality/TD-599 Sign-Offs.t",
"- Old Test Plans -",
"Old Test Plans/Audit - Audit Response Table Test.t",
"Old Test Plans/Audit - Checklist and WPG Menu Test.t",
"Old Test Plans/Audit - Highlight Procedures Test.t",
"Old Test Plans/Audit - Smoke Test.t",
"Old Test Plans/Audit - Template Procedure Update AUD-10547.t",
"Old Test Plans/Audit - Test CV-5821.t",
"Old Test Plans/Audit - Test WP-10398.t",
"Old Test Plans/Audit API/API.t",
"- Optimiser - AOCR -",
"Optimiser - AOCR/TD-602 AOCR - FSA Assessment.t",
"Optimiser - AOCR/TD-603 AOCR - Industry.t",
"Optimiser - AOCR/TD-973 AOCR - Checklist Responses.t",
"Optimiser - AOCR/AS-8937 Audit Optimiser And Procedure Threshold.t",
"Optimiser - AOCR/AS-8980 Procedure Tagging and Procedure Pre-Condition Deletion Part 1",
"- Performance Tests -",
"Performance Tests/Audit - Generate FSA Performance.t",
"Performance Tests/Audit - Performance Test 2.t",
"Performance Tests/Audit - Performance Test.t",
"Performance Tests/Audit - Risk Load Performance.t",
"- PMSD -",
"PMSD/TD-1621 PMSD Functionality.t",
"- Procedure-Risk-Control deletions -",
"Procedure-Risk-Control deletions/AS-336 Procedure Conditions.t",
"- Risk Report and Risks -",
"Risk Report and Risks/TD-146 Mini-Risk Report.t",
"Risk Report and Risks/TD-1940 Importing Risks.t",
"Risk Report and Risks/TD-2212 Risk Report and Editing Risks.t",
"Risk Report and Risks/TD-5802 Risk Relations.t",
"- Template Updates -",
"Template Updates/AS-279 Documents Update.t",
"Template Updates/TD-1302 Procedures Update.t",
"Template Updates/TD-1302-2 Procedures Update.t",
"- Test Tools -",
"Test Tools/Any Test Boilerplate/Audit - Any Test Auto-Generate.t",
"Test Tools/Any Test Boilerplate/Audit - Any Test Boilerplate.t",
"Test Tools/Create Client Files/Template - Create Client Files.t",
"Test Tools/Create Master Templates/Audit - Create Master Templates.t",
"Test Tools/Find Groupings/Audit - Find Groupings.t",
"- Toolbar Buttons - CaseView Toolbar -",
"Toolbar Buttons - CaseView Toolbar/TD-1616 Template Toolbar Button Functionality.t",
"- Training Test Plans -",
"Training test - TD-11165/TD-11165 Training Test.t",
"Training Test Plans/Automate Audit Training Test plan AUD-13235/Audit - Sample Test 3.t",
"Training Test Plans/Automate Audit Training/Automate Audit Training.t",
"- Unit Tests -",
"Unit Tests/Unit Tests - TemplateAudit.t",
"- Work Program and Checklists - Authoring -",
"Work Program and Checklists - Authoring/TD-567 Conclusion.t",
"Work Program and Checklists - Authoring/TD-589 Guidance.t",
"Work Program and Checklists - Authoring/TD-1939 Procedures.t",
"Work Program and Checklists - Authoring/AS-1588 Common Procedures.t",
"Work Program and Checklists - Authoring/AS-1588-1 Common Procedures - Creating and Author Levels.t",
"Work Program and Checklists - Authoring/AS-1588-2 Common Procedures - Inserting Editing and Deleting.t",
"- Work Program and Checklists - General -",
"Work Program and Checklists - General/AS-250 Procedure Response.t",
"Work Program and Checklists - General/TD-1764 Procedure Deletion.t",
"Work Program and Checklists - General/TD-5804 Insert and Delete Procedures.t",
"Work Program and Checklists - General/TD-5806 Based on Procedure.t",
"Work Program and Checklists - General/TD-13634 Filter Procedures.t",
"- AO -",
"AO/AUD-24434 Financial Statement Area.t",
"AO/TD-144 Distributor Settings.t",
"AO/TD-145 Areas.t",
"AO/TD-983 Check For Updates.t",
"AO/TD-1165 Rollforward.t",
"AO/TD-1181 Materiality.t",
"AO/TD-1181-2 Materiality.t",
"AO/TD-1579 Optimiser.t",
"AO/TD-1677 Controls.t",
"AO/TD-1677-2 Controls.t",
"AO/TD-1686 Risks.t",
"AO/TD-1765 Completion Responses.t",
"AO/TD-1828 Industry.t",
"AO/TD-1941 Reportable Item Options.t",
"AO/TD-1941-2 Reportable Item Options.t",
"AO/TD-4414 Engagement Profiles.t",
"AO/AS-3678 Additional Document Library.t",
"AO/AS-4332 Automate control Risk and RMM.t",
"- Audit and Financials Combined files -",
"Audit and Financials Combined files/TD-1693 Audit and Financials Combined File - Update 1.t",
"Audit and Financials Combined files/TD-1693 Audit and Financials Combined File - Update 2.t",
"Audit and Financials Combined files/TD-1693 Audit and Financials Combined File - Update 3.t",
"Audit and Financials Combined files/TD-1693 Audit and Financials Combined File - Update 4.t",
"Audit and Financials Combined files/TD-1693 Audit and Financials Combined File - Update 5.t",
"Audit and Financials Combined files/TD-1744 Audit and Financials Combined File - Functionality.t" };

                _testCaseRepository.DeleteAll();

                int order = 0;
                foreach(string test in array)
                {
                    _testCaseRepository.Create(new Models.TestCase { Name=test, Order=order+=10});
                }

                _testCaseRepository.SaveChanges();

                return Ok();
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }
    }
}
