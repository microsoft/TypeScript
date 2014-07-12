//// [privacyCheckTypeOfInvisibleModuleError.js]
var Outer;
(function (Outer) {
    var Inner;
    (function (Inner) {
        Inner.m;
    })(Inner || (Inner = {}));

    Outer.f;
})(Outer || (Outer = {}));
