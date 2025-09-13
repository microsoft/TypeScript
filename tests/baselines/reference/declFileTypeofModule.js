//// [tests/cases/compiler/declFileTypeofModule.ts] ////

//// [declFileTypeofModule.ts]
namespace m1 {
    export var c: string;
}
var m1_1 = m1;
var m1_2: typeof m1;

namespace m2 {
    export var d: typeof m2;
}

var m2_1 = m2;
var m2_2: typeof m2;

//// [declFileTypeofModule.js]
var m1;
(function (m1) {
})(m1 || (m1 = {}));
var m1_1 = m1;
var m1_2;
var m2;
(function (m2) {
})(m2 || (m2 = {}));
var m2_1 = m2;
var m2_2;


//// [declFileTypeofModule.d.ts]
declare namespace m1 {
    var c: string;
}
declare var m1_1: typeof m1;
declare var m1_2: typeof m1;
declare namespace m2 {
    var d: typeof m2;
}
declare var m2_1: typeof m2;
declare var m2_2: typeof m2;
