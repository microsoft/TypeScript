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
var x;
function foo() {
    var x;
}
var A;
(function (A) {
    var x;
})(A || (A = {}));
