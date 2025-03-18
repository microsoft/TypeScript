//// [tests/cases/compiler/declarationFilesWithTypeReferences3.ts] ////

//// [index.d.ts]
interface Error2 {
    stack2: string;
}

//// [app.ts]
/// <reference types="node"/>
function foo(): Error2 {
    return undefined;
}

//// [app.js]
function foo() {
    return undefined;
}
