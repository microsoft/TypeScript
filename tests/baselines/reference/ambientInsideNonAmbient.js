//// [tests/cases/conformance/ambient/ambientInsideNonAmbient.ts] ////

//// [ambientInsideNonAmbient.ts]
namespace M {
    export declare var x;
    export declare function f();
    export declare class C { }
    export declare enum E { }
    export declare namespace M { }
}

namespace M2 {
    declare var x;
    declare function f();
    declare class C { }
    declare enum E { }
    declare namespace M { }
}

//// [ambientInsideNonAmbient.js]
var M;
(function (M) {
})(M || (M = {}));
var M2;
(function (M2) {
})(M2 || (M2 = {}));
