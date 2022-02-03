//// [uncalledFunction.ts]
function a() {}
a;

const b = () => {}
b;

const c = {
    d: () => {},
    e: {
        f: () => {}
    }
}

c.d;
c['d'];

c.e.f;
c.e['f'];

class C {
    m1() {}
    m2() {
        this.m1;
        this['m1'];
    }
}


//// [uncalledFunction.js]
"use strict";
function a() { }
a;
var b = function () { };
b;
var c = {
    d: function () { },
    e: {
        f: function () { }
    }
};
c.d;
c['d'];
c.e.f;
c.e['f'];
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m1 = function () { };
    C.prototype.m2 = function () {
        this.m1;
        this['m1'];
    };
    return C;
}());
