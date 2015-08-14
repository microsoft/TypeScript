//// [privacyCannotNameAccessorDeclFile2.ts]

namespace M {
    export interface I { }
}

namespace N {
    export function getI(): M.I {
        return undefined
    }
}

namespace O {
    // shadow M with a local namespace declaration
    export namespace M {
        export var x = 0;
    }

    // Error, return type cannot be named
    export function getIlocally() {
        return N.getI();
    }
}


//// [privacyCannotNameAccessorDeclFile2.js]
var N;
(function (N) {
    function getI() {
        return undefined;
    }
    N.getI = getI;
})(N || (N = {}));
var O;
(function (O) {
    // shadow M with a local namespace declaration
    var M;
    (function (M) {
        M.x = 0;
    })(M = O.M || (O.M = {}));
    // Error, return type cannot be named
    function getIlocally() {
        return N.getI();
    }
    O.getIlocally = getIlocally;
})(O || (O = {}));
