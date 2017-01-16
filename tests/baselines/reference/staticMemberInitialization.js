//// [staticMemberInitialization.ts]
class C {
    static x = 1;
}

var c = new C();
var r = C.x;

//// [staticMemberInitialization.js]
var C = (function () {
    function C() {
    }
    return C;
}());
C.x = 1;
var c = new C();
var r = C.x;
