//// [tests/cases/compiler/declarationFilesWithTypeReferences1.ts] ////

//// [index.d.ts]

interface Error {
    stack2: string;
}

//// [app.ts]

function foo(): Error {
    return undefined;
}

//// [app.js]
function foo() {
    return undefined;
}


//// [app.d.ts]
declare function foo(): Error;
