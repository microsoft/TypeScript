//// [tests/cases/compiler/constEnumExternalModule.ts] ////

//// [m1.ts]
const enum E {
    V = 100
}

export = E
//// [m2.ts]
import A = require('m1')
var v = A.V;

//// [m1.js]
define(["require", "exports"], function (require, exports) {
});
//// [m2.js]
define(["require", "exports"], function (require, exports) {
    var v = 100 /* V */;
});
