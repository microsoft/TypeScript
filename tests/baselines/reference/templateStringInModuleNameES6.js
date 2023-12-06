//// [tests/cases/conformance/es6/templates/templateStringInModuleNameES6.ts] ////

//// [templateStringInModuleNameES6.ts]
declare module `M1` {
}

declare module `M${2}` {
}

//// [templateStringInModuleNameES6.js]
declare;
module `M1`;
{
}
declare;
module `M${2}`;
{
}
