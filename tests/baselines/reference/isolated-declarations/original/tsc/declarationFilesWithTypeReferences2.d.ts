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

/// [Errors] ////

/app.ts(1,17): error TS9024: Declaration emit for this file requires adding a type reference directive which are not supported with --isolatedDeclarations


==== /node_modules/@types/node/index.d.ts (0 errors) ====
    interface Error2 {
        stack2: string;
    }
    
==== /app.ts (1 errors) ====
    function foo(): Error2 {
                    ~~~~~~
!!! error TS9024: Declaration emit for this file requires adding a type reference directive which are not supported with --isolatedDeclarations
        return undefined;
    }