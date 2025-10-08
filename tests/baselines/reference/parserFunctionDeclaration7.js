//// [tests/cases/conformance/parser/ecmascript5/FunctionDeclarations/parserFunctionDeclaration7.ts] ////

//// [parserFunctionDeclaration7.ts]
namespace M {
   function foo();
}

//// [parserFunctionDeclaration7.js]
var M;
(function (M) {
})(M || (M = {}));
