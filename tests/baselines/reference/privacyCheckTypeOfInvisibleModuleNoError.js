//// [privacyCheckTypeOfInvisibleModuleNoError.js]
var Outer;
(function (Outer) {
    var Inner;
    (function (Inner) {
        Inner.m;
    })(Inner || (Inner = {}));

    Outer.f;
})(Outer || (Outer = {}));


////[privacyCheckTypeOfInvisibleModuleNoError.d.ts]
declare module Outer {
    var f: typeof Inner;
}
