//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarations.5.ts] ////

//// [usingDeclarations.5.ts]
{
    using a = null,
          [b] = null,
          c = null;
}


//// [usingDeclarations.5.js]
"use strict";
{
    using a = null, [b] = null, c = null;
}
