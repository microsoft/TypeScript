//// [tests/cases/conformance/es6/templates/templateStringInModuleName.ts] ////

//// [templateStringInModuleName.ts]
declare module `M1` {
}

declare module `M${2}` {
}

//// [templateStringInModuleName.js]
"M1";
{
}
"M".concat(2);
{
}
