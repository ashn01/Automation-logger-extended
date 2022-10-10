import { TestStep } from "../interface/interface";

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
    teststeps.map((step, index)=>{
        // adding step comment
        script += `${addTabs()}`
        script += `// step ${index+1}`
        
        // adding actual script
        script += `${addTabs()}`
        script += `${beautifyCode(step.code)}`
        
        // adding a space between steps
        script += `${addTabs()}`
    })
    return script
}