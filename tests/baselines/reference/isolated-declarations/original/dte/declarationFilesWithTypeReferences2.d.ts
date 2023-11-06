//// [tests/cases/compiler/declarationFilesWithTypeReferences2.ts] ////

//// [/node_modules/@types/node/index.d.ts]
interface Error2 {
    stack2: string;
}

//// [/app.ts]
function foo(): Error2 {
    return undefined;
}

/// [Declarations] ////



//// [/app.d.ts]
declare function foo(): Error2;
