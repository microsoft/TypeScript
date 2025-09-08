//// [tests/cases/compiler/FunctionDeclaration7.ts] ////

//// [FunctionDeclaration7.ts]
namespace M {
   function foo();
}

//// [FunctionDeclaration7.js]
var M;
(function (M) {
})(M || (M = {}));
