import { TestStep } from "../interface/interface";
import { MakeCamel, RemoveSpecialCharacters } from "./general";

export let indentLevel = 2; // default is 2

const addTabs = ():string =>{
    let script = ``
    for(let i = 0;i<indentLevel;i++){
        script += `\t`
    }
    return script;
}

const beautifyCode = (code:string, step:TestStep):string =>{
    let index = {index : 0}
    let script = ``
    const newArray = code.split('\n').map(text=>{
        console.log(text)
        script += `\n${addTabs()}`;
        script += text;
    })

    script = replaceParams(script, step, index);
    return script
}

export const generateTestSteps = (teststeps:TestStep[]):string =>{
    let script = ``
    let stepCnt = 1;
    teststeps.forEach(step=>{
        // adding step comment
        if(step.isStep){
            if(stepCnt != 1){ // if step is 1, skip spacing
                script += `\n${addTabs()}`
            }
            script += `\n${addTabs()}`
            script += `// step ${stepCnt++}`
        }
        
        // adding actual script
        script += `${beautifyCode(step.code, step)}`
        
    })
    return script
}


export const generateScript = (testID:string, testName:string, testStep:TestStep[]):string => {
    let cameledName = MakeCamel(testName)
    let testCaseName = RemoveSpecialCharacters(cameledName);
    let script = `// ${testID}
testcase ${testCaseName}() appstate VarsLoadedState
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

const replaceParams = (text:string, testStep:TestStep, indexObj:{index:number}):string =>{
    let newText = text
    let actionValueIndex = indexObj ? indexObj.index : 0;

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

                if (indexObj){
                    indexObj.index++;
                    actionValueIndex++
                }
            }
        })
    }

    return newText
}

export const refineScript = (testStep:TestStep):JSX.Element[] =>{
    let index = {index : 0}

    let value = testStep.code.split('\n').map(text => {
        let newText = replaceParams(text, testStep, index);
        return <p>{
            newText
            }</p>
    })

    return value
}