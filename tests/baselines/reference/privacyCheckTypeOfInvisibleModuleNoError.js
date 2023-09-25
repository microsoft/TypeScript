//// [tests/cases/compiler/privacyCheckTypeOfInvisibleModuleNoError.ts] ////

//// [privacyCheckTypeOfInvisibleModuleNoError.ts]
module Outer {
    module Inner {
        export var m: number;
    }

    export var f: typeof Inner; // Since we dont unwind inner any more, it is error here
}


//// [privacyCheckTypeOfInvisibleModuleNoError.js]
var Outer;
(function (Outer) {
    var Inner;
    (function (Inner) {
    })(Inner || (Inner = {}));
})(Outer || (Outer = {}));


//// [privacyCheckTypeOfInvisibleModuleNoError.d.ts]
declare namespace Outer {
    namespace Inner {
    }
    export var f: typeof Inner;
    export {};
}


//// [DtsFileErrors]


privacyCheckTypeOfInvisibleModuleNoError.d.ts(4,26): error TS2708: Cannot use namespace 'Inner' as a value.


==== privacyCheckTypeOfInvisibleModuleNoError.d.ts (1 errors) ====
    declare namespace Outer {
        namespace Inner {
        }
        export var f: typeof Inner;
                             ~~~~~
!!! error TS2708: Cannot use namespace 'Inner' as a value.
        export {};
    }
    