//// [tests/cases/compiler/sourcemapValidationDuplicateNames.ts] ////

//// [sourcemapValidationDuplicateNames.ts]
namespace m1 {
    var x = 10;
    export class c {
    }
}
namespace m1 {
    var b = new m1.c();
}

//// [sourcemapValidationDuplicateNames.js]
"use strict";
var m1;
(function (m1) {
    var x = 10;
    class c {
    }
    m1.c = c;
})(m1 || (m1 = {}));
(function (m1) {
    var b = new m1.c();
})(m1 || (m1 = {}));
//# sourceMappingURL=sourcemapValidationDuplicateNames.js.map