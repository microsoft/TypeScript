//// [usingDeclarations.3.ts]
{
    using d1 = { [Symbol.dispose]() {} },
          d2 = null,
          d3 = undefined,
          d4 = { [Symbol.dispose]() {} };
}


//// [usingDeclarations.3.js]
{
    using d1 = { [Symbol.dispose]() { } }, d2 = null, d3 = undefined, d4 = { [Symbol.dispose]() { } };
}
