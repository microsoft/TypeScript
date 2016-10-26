//// [tests/cases/compiler/declarationFilesWithTypeReferences2.ts] ////

//// [index.d.ts]

interface Error2 {
    stack2: string;
}

//// [app.ts]

function foo(): Error2 {
    return undefined;
}

//// [app.js]
function foo() {
    return undefined;
}


//// [app.d.ts]
/// <reference types="node" />
declare function foo(): Error2;


//// [DtsFileErrors]


error TS2688: Cannot find type definition file for 'node'.


!!! error TS2688: Cannot find type definition file for 'node'.
==== /node_modules/@types/node/index.d.ts (0 errors) ====
    
    interface Error2 {
        stack2: string;
    }
    
==== /app.d.ts (0 errors) ====
    /// <reference types="node" />
    declare function foo(): Error2;
    