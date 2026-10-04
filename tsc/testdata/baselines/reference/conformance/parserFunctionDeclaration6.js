//// [tests/cases/conformance/parser/ecmascript5/FunctionDeclarations/parserFunctionDeclaration6.ts] ////

//// [parserFunctionDeclaration6.ts]
{
    function foo();
    function bar() { }
}

//// [parserFunctionDeclaration6.js]
"use strict";
{
    function bar() { }
}
