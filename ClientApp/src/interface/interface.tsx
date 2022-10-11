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
    action:string,
    code:string,
    isStep?:boolean
}