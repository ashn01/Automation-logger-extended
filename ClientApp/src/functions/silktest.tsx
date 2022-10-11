import { TestStep } from "../interface/interface";
import { MakeCamel } from "./general";

export let indentLevel = 2; // default is 2

const addTabs = ():string =>{
    let script = ``
    script += `\n`
    for(let i = 0;i<indentLevel;i++){
        script += `\t`
    }
    return script;
}

const beautifyCode = (code:string):string =>{
    let ret = code.replace('\n',addTabs()) 
    return ret
}

export const generateTestSteps = (teststeps:TestStep[]):string =>{
    let script = ``
    let stepCnt = 1;
    teststeps.forEach(step=>{
        // adding step comment
        script += `${addTabs()}`
        script += step.isStep ? `// step ${stepCnt++}` : ``
        
        // adding actual script
        script += `${addTabs()}`
        script += `${beautifyCode(step.code)}`
        
        // adding a space between steps
        script += `${addTabs()}`
    })
    return script
}


export const generateScript = (testID:string, testName:string, testStep:TestStep[]):string => {
    let script = `// ${testID}
testcase ${MakeCamel(testName)}() appstate VarsLoadedState
\tSTRING sTestcaseId = "${testID}"
\tLOGGER.testresult("${testName}", R_SUBTITLE, sTestcaseId)
\t
\tdo
\t\tTaskbar.SetActive ()
\t\tCaseWare.SetActive ()
\texcept
\t\tLOGGER.testresult("Testcase {GetTestCaseName ()} could not start. {ExceptData ()}", R_EXCEPT)
\t\treraise
\t
\tdo`

        // Add each test cases here
        script += generateTestSteps(testStep);

        script += `
\texcept
\t\tLOGGER.testresult("Could not complete. {ExceptData()}", R_EXCEPT, sTestcaseId)`
        // output
        // console.log(script)

    return script
}