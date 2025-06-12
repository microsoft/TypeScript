//// [tests/cases/compiler/letKeepNamesOfTopLevelItems.ts] ////

//// [letKeepNamesOfTopLevelItems.ts]
let x;
function foo() {
    let x;
}

module A {
    let x;
}

//// [letKeepNamesOfTopLevelItems.js]
let x;
function foo() {
    let x;
}
var A;
(function (A) {
    let x;
})(A || (A = {}));
