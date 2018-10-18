//// [staticMemberInitialization.ts]
class C {
    static x = 1;
}

var c = new C();
var r = C.x;

//// [staticMemberInitialization.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.x = 1;
    return C;
}());
var c = new C();
var r = C.x;
