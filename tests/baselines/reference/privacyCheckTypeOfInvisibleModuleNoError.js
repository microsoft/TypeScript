//// [privacyCheckTypeOfInvisibleModuleNoError.ts]
module Outer {
    module Inner {
        export var m: number;
    }

    export var f: typeof Inner; // Since we dont unwind inner any more, it is error here
}


//// [privacyCheckTypeOfInvisibleModuleNoError.js]
var Outer = Outer || (Outer = {});
(function (Outer) {
    var Inner = Inner || (Inner = {});
    (function (Inner) {
    })(Inner);
})(Outer);


//// [privacyCheckTypeOfInvisibleModuleNoError.d.ts]
declare module Outer {
    module Inner {
        var m: number;
    }
    var f: typeof Inner;
}
