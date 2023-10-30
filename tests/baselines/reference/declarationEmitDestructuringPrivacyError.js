//// [tests/cases/compiler/declarationEmitDestructuringPrivacyError.ts] ////

//// [declarationEmitDestructuringPrivacyError.ts]
module m {
    class c {
    }
    export var [x, y, z] = [10, new c(), 30];
}

//// [declarationEmitDestructuringPrivacyError.js]
var m;
(function (m) {
    var _a;
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
    _a = [10, new c(), 30], m.x = _a[0], m.y = _a[1], m.z = _a[2];
})(m || (m = {}));


//// [declarationEmitDestructuringPrivacyError.d.ts]
declare namespace m {
    class c {
    }
    export var x: number, y: c, z: number;
    export {};
}
