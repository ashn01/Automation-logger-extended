export interface TestResult{
    id?:number,
    status:boolean,
    version:string,
    created:Date,
    templateID?:number,
    template:Template,
    testCaseID?:number,
    testCase:TestCase
}

export interface TestCase{
    id?:number,
    name:string,
    testResults:Array<TestResult>,
    recentPass?:TestResult,
    recentFail?:TestResult
}

export interface Template{
    id?:number,
    name:string,
    testResults:Array<TestResult>
}

// view models
export interface TestResultViewModel{
    id?:number,
    status:boolean,
    version:string,
    created:Date,
    templateName:string,
    testCaseName:string,
}

export interface TestStep{
    id?:number,
    action:string,
    code:string,
    alteredCode?:string,
    testActionValues?:Array<TestActionValue>,
    isStep?:boolean
}

export interface TestActionValue{
    id?:number,
    name:string,
    defaultValue:string,
    order:number,
    testStepId?:number
}