//// [declarationEmitDestructuringPrivacyError.ts]
module m {
    class c {
    }
    export var [x, y, z] = [10, new c(), 30];
}

//// [declarationEmitDestructuringPrivacyError.js]
var m;
(function (m) {
    var c = (function () {
        function c() {
        }
        return c;
    }());
    _a = [10, new c(), 30], m.x = _a[0], m.y = _a[1], m.z = _a[2];
    var _a;
})(m || (m = {}));
