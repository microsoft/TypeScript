//// [FunctionDeclaration7.ts]
module M {
   function foo();
}

//// [FunctionDeclaration7.js]
var M = M || (M = {});
(function (M) {
})(M);
