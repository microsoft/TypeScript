//// [classWithSemicolonClassElement2.ts]
class C {
    ;
    ;
}

//// [classWithSemicolonClassElement2.js]
var C = /** @class */ (function () {
    function C() {
    }
    var C_prototype = C.prototype;
    ;
    ;
    return C;
}());
