//// [tests/cases/compiler/cloduleSplitAcrossFiles.ts] ////

//// [cloduleSplitAcrossFiles_class.ts]
class D { }

//// [cloduleSplitAcrossFiles_module.ts]
namespace D {
    export var y = "hi";
}
D.y;

//// [cloduleSplitAcrossFiles_class.js]
"use strict";
class D {
}
//// [cloduleSplitAcrossFiles_module.js]
"use strict";
var D;
(function (D) {
    D.y = "hi";
})(D || (D = {}));
D.y;
