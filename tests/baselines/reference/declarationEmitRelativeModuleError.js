//// [tests/cases/compiler/declarationEmitRelativeModuleError.ts] ////

//// [declarationEmitRelativeModuleError.ts]
declare module "b:block" { // <-- no error anymore
    
}

declare module "b:/block" { // <-- still an error
    
}

//// [declarationEmitRelativeModuleError.js]
