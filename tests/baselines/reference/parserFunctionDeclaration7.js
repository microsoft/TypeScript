//// [parserFunctionDeclaration7.ts]
module M {
   function foo();
}

//// [parserFunctionDeclaration7.js]
var M;
(function (M) {
})(M || (M = {}));
