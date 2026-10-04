//// [tests/cases/compiler/declareAlreadySeen.ts] ////

//// [declareAlreadySeen.ts]
namespace M {
    declare declare var x;
    declare declare function f();

    declare declare namespace N { }  

    declare declare class C { }
}

//// [declareAlreadySeen.js]
"use strict";
var M;
(function (M) {
})(M || (M = {}));
