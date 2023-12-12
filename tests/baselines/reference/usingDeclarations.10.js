//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarations.10.ts] ////

//// [usingDeclarations.10.ts]
declare var x: any;
if (x) using a = null;


//// [usingDeclarations.10.js]
if (x)
    using a = null;
