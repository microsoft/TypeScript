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
