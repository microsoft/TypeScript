//// [tests/cases/compiler/letKeepNamesOfTopLevelItems.ts] ////

//// [letKeepNamesOfTopLevelItems.ts]
let x;
function foo() {
    let x;
}

namespace A {
    let x;
}

//// [letKeepNamesOfTopLevelItems.js]
"use strict";
let x;
function foo() {
    let x;
}
var A;
(function (A) {
    let x;
})(A || (A = {}));
