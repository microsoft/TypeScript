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
    var Inner;
    (function (Inner) {
    })(Inner || (Inner = {}));
})(Outer || (Outer = {}));


//// [privacyCheckTypeOfInvisibleModuleError.d.ts]
declare namespace Outer {
    namespace Inner {
    }
    export var f: typeof Inner;
    export {};
}


//// [DtsFileErrors]


privacyCheckTypeOfInvisibleModuleError.d.ts(4,26): error TS2708: Cannot use namespace 'Inner' as a value.


==== privacyCheckTypeOfInvisibleModuleError.d.ts (1 errors) ====
    declare namespace Outer {
        namespace Inner {
        }
        export var f: typeof Inner;
                             ~~~~~
!!! error TS2708: Cannot use namespace 'Inner' as a value.
        export {};
    }
    