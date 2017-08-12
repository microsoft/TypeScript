//// [indexersInClassType.ts]
class C {
    [x: number]: Date;
    [x: string]: Object;
    1: Date;
    'a': {}

    fn() {
        return this;
    }
}

var c = new C();
var r = c.fn();
var r2 = r[1];
var r3 = r.a



//// [indexersInClassType.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.fn = function () {
        return this;
    };
    return C;
}());
var c = new C();
var r = c.fn();
var r2 = r[1];
var r3 = r.a;
