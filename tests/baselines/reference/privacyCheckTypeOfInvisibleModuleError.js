//// [privacyCheckTypeOfInvisibleModuleError.ts]
module Outer {
    module Inner {
        export var m: typeof Inner;
    }

    export var f: typeof Inner;
}


//// [privacyCheckTypeOfInvisibleModuleError.js]
var Outer = Outer || (Outer = {});
(function (Outer) {
    var Inner = Inner || (Inner = {});
    (function (Inner) {
    })(Inner);
})(Outer);


//// [privacyCheckTypeOfInvisibleModuleError.d.ts]
declare module Outer {
    module Inner {
        var m: typeof Inner;
    }
    var f: typeof Inner;
}
