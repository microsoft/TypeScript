//// [letKeepNamesOfTopLevelItems.ts]
let x;
function foo() {
    let x;
}

module A {
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
