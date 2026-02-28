//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarations.7.ts] ////

//// [usingDeclarations.7.ts]
{
    using a = null,
          {b} = null,
          c = null;
}

//// [usingDeclarations.7.js]
"use strict";
{
    using a = null, { b } = null, c = null;
}
