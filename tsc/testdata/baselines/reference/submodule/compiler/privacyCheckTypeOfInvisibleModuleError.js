//// [tests/cases/compiler/privacyCheckTypeOfInvisibleModuleError.ts] ////

//// [privacyCheckTypeOfInvisibleModuleError.ts]
module Outer {
    module Inner {
        export var m: typeof Inner;
    }

    export var f: typeof Inner;
}


//// [privacyCheckTypeOfInvisibleModuleError.js]
var Outer;
(function (Outer) {
    let Inner;
    (function (Inner) {
    })(Inner || (Inner = {}));
})(Outer || (Outer = {}));
