//// [tests/cases/compiler/funduleSplitAcrossFiles.ts] ////

//// [funduleSplitAcrossFiles_function.ts]
function D() { }

//// [funduleSplitAcrossFiles_module.ts]
module D {
    export var y = "hi";
}
D.y;

//// [funduleSplitAcrossFiles_function.js]
function D() { }
//// [funduleSplitAcrossFiles_module.js]
var D;
(function (D) {
    D.y = "hi";
})(D || (D = {}));
D.y;
