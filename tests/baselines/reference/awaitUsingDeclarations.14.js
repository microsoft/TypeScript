//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.14.ts] ////

//// [awaitUsingDeclarations.14.ts]
class C {
    static {
        await using x = null;
        {
            await using y = null;
        }
    }
}


//// [awaitUsingDeclarations.14.js]
"use strict";
class C {
    static {
        await using x = null;
        {
            await using y = null;
        }
    }
}
