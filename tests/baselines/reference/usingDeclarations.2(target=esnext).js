//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarations.2.ts] ////

//// [usingDeclarations.2.ts]
{
    using d1 = { [Symbol.dispose]() {} },
          d2 = { [Symbol.dispose]() {} };
}


//// [usingDeclarations.2.js]
{
    using d1 = { [Symbol.dispose]() { } }, d2 = { [Symbol.dispose]() { } };
}
