//// [tests/cases/compiler/privacyCheckTypeOfInvisibleModuleError.ts] ////

//// [privacyCheckTypeOfInvisibleModuleError.ts]
namespace Outer {
    namespace Inner {
        export var m: typeof Inner;
    }

    export var f: typeof Inner;
}


//// [privacyCheckTypeOfInvisibleModuleError.js]
var Outer;
(function (Outer) {
    var Inner;
    (function (Inner) {
    })(Inner || (Inner = {}));
})(Outer || (Outer = {}));


//// [privacyCheckTypeOfInvisibleModuleError.d.ts]
declare namespace Outer {
    namespace Inner {
        var m: typeof Inner;
    }
    export var f: typeof Inner;
    export {};
}
