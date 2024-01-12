//// [tests/cases/compiler/declarationFilesWithTypeReferences2.ts] ////

//// [index.d.ts]
interface Error2 {
    stack2: string;
}

//// [app.ts]
function foo(): Error2 {
    return undefined;
}

/// [Declarations] ////



//// [/app.d.ts]
declare function foo(): Error2;
