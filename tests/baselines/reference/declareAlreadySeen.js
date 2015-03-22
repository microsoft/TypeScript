//// [declareAlreadySeen.ts]
module M {
    declare declare var x;
    declare declare function f();

    declare declare module N { }  

    declare declare class C { }
}

//// [declareAlreadySeen.js]
var M;
(function (M) {
})(M || (M = {}));
