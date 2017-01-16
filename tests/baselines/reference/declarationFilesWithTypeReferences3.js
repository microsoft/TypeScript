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
/// <reference types="node"/>
function foo() {
    return undefined;
}


//// [app.d.ts]
/// <reference types="node" />
declare function foo(): Error2;
