//// [tests/cases/compiler/funduleSplitAcrossFiles.ts] ////

//// [funduleSplitAcrossFiles_function.ts]
function D() { }

//// [funduleSplitAcrossFiles_module.ts]
namespace D {
    export var y = "hi";
}
D.y;

//// [funduleSplitAcrossFiles_function.js]
"use strict";
function D() { }
//// [funduleSplitAcrossFiles_module.js]
"use strict";
var D;
(function (D) {
    D.y = "hi";
})(D || (D = {}));
D.y;
