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
    var Inner;
    (function (Inner) {
        Inner.m;
    })(Inner || (Inner = {}));
    Outer.f;
})(Outer || (Outer = {}));
