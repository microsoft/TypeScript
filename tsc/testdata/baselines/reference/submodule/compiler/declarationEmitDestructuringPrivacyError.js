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
    class c {
    }
    [m.x, m.y, m.z] = [10, new c(), 30];
})(m || (m = {}));
