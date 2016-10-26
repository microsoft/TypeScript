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


//// [DtsFileErrors]


error TS2688: Cannot find type definition file for 'node'.


!!! error TS2688: Cannot find type definition file for 'node'.
==== /node_modules/@types/node/index.d.ts (0 errors) ====
    
    interface Error {
        stack2: string;
    }
    
==== /app.d.ts (0 errors) ====
    declare function foo(): Error;
    