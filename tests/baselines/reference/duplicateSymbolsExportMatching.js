//// [duplicateSymbolsExportMatching.ts]
module M {
    export interface E { }
    interface I { }
}
module M {
    export interface E { } // ok
    interface I { } // ok
}

// Doesn't match export visibility, but it's in a different parent, so it's ok
module M {
    interface E { } // ok
    export interface I { } // ok
}

module N {
    interface I { }
    interface I { } // ok
    export interface E { }
    export interface E { } // ok
}

module N2 {
    interface I { }
    export interface I { } // error
    export interface E { }
    interface E { } // error
}

// Should report error only once for instantiated module
module M {
    module inst {
        var t;
    }
    export module inst { // one error
        var t;
    }
}

// Variables of the same / different type
module M2 {
    var v: string;
    export var v: string; // one error (visibility)
    var w: number;
    export var w: string; // two errors (visibility and type mismatch)
}

module M {
    module F {
        var t;
    }
    export function F() { } // Only one error for duplicate identifier (don't consider visibility)
}

module M {
    class C { }
    module C { }
    export module C { // Two visibility errors (one for the clodule symbol, and one for the merged container symbol)
        var t;
    }
}

// Top level
interface D { }
export interface D { }

//// [duplicateSymbolsExportMatching.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    // Should report error only once for instantiated module
    var M;
    (function (M) {
        var inst;
        (function (inst) {
            var t;
        })(inst || (inst = {}));
        (function (inst) {
            var t;
        })(inst = M.inst || (M.inst = {}));
    })(M || (M = {}));
    // Variables of the same / different type
    var M2;
    (function (M2) {
        var v;
        var w;
    })(M2 || (M2 = {}));
    (function (M) {
        var F;
        (function (F) {
            var t;
        })(F || (F = {}));
        function F() { } // Only one error for duplicate identifier (don't consider visibility)
        M.F = F;
    })(M || (M = {}));
    (function (M) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        (function (C) {
            var t;
        })(C = M.C || (M.C = {}));
    })(M || (M = {}));
});
