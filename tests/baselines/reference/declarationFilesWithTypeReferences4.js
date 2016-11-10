//// [tests/cases/compiler/declarationFilesWithTypeReferences4.ts] ////

//// [index.d.ts]

interface Error {
    stack2: string;
}

//// [app.ts]
/// <reference types="node"/>
function foo(): Error {
    return undefined;
}

//// [app.js]
/// <reference types="node"/>
function foo() {
    return undefined;
}


//// [app.d.ts]
declare function foo(): Error;
