//// [tests/cases/compiler/typeofInternalModules.ts] ////

//// [typeofInternalModules.ts]
module Outer {
    export module instantiated {
        export class C { }
    }
    export module uninstantiated {
        export interface P { }
    }
}

import importInst = Outer.instantiated;
import importUninst = Outer.uninstantiated;

var x1: typeof importInst.C = importInst.C;
var x2: importInst.C = new x1();
var x3: typeof importUninst.P; // Error again

var x4: Outer = Outer;
var x5: typeof importInst;
x5 = Outer;
x5 = Outer.instantiated;
var x6: typeof importUninst;
var x7: typeof Outer = Outer;
x7 = importInst;


//// [typeofInternalModules.js]
var Outer;
(function (Outer) {
    var instantiated;
    (function (instantiated) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        instantiated.C = C;
    })(instantiated = Outer.instantiated || (Outer.instantiated = {}));
})(Outer || (Outer = {}));
var importInst = Outer.instantiated;
var x1 = importInst.C;
var x2 = new x1();
var x3; // Error again
var x4 = Outer;
var x5;
x5 = Outer;
x5 = Outer.instantiated;
var x6;
var x7 = Outer;
x7 = importInst;
