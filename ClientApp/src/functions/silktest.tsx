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

const beautifyCode = (code:string, step:TestStep):string =>{
    let ret = code.replace('\n',addTabs()) 
    ret = replaceParams(ret, step);
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
        script += `${beautifyCode(step.code, step)}`
        
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

const replaceParams = (text:string, testStep:TestStep):string =>{
    let newText = text
    let actionValueIndex = 0;

    // if found parameter delimiter
    if (text.indexOf('#p') !== -1){
        const newArray = text.split('#p');
        // console.log(newArray)
        newText = ``
        newArray.forEach((t,index)=>{
            newText += t;
            if (index < newArray.length -1)
            {
                newText += testStep.testActionValues&&
                    testStep.testActionValues[actionValueIndex]&&
                    testStep.testActionValues[actionValueIndex].defaultValue;

                actionValueIndex++;
            }
        })
    }

    return newText
}

export const refineScript = (testStep:TestStep):JSX.Element[] =>{

    let value = testStep.code.split('\n').map(text => {
        let newText = replaceParams(text, testStep);
        return <p>{
            newText
            }</p>
    })

    return value
}