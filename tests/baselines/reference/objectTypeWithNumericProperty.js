//// [tests/cases/conformance/types/members/objectTypeWithNumericProperty.ts] ////

//// [objectTypeWithNumericProperty.ts]
// no errors here

class C {
    1: number;
    1.1: string;
}

var c: C;
var r1 = c[1];
var r2 = c[1.1];
var r3 = c['1'];
var r4 = c['1.1'];

interface I {
    1: number;
    1.1: string;
}

var i: I;
var r1 = i[1];
var r2 = i[1.1];
var r3 = i['1'];
var r4 = i['1.1'];

var a: {
    1: number;
    1.1: string;
}

var r1 = a[1];
var r2 = a[1.1];
var r3 = a['1'];
var r4 = a['1.1'];

var b = {
    1: 1,
    1.1: ""
}

var r1 = b[1];
var r2 = b[1.1];
var r3 = b['1'];
var r4 = b['1.1'];

//// [objectTypeWithNumericProperty.js]
// no errors here
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c;
var r1 = c[1];
var r2 = c[1.1];
var r3 = c['1'];
var r4 = c['1.1'];
var i;
var r1 = i[1];
var r2 = i[1.1];
var r3 = i['1'];
var r4 = i['1.1'];
var a;
var r1 = a[1];
var r2 = a[1.1];
var r3 = a['1'];
var r4 = a['1.1'];
var b = {
    1: 1,
    1.1: ""
};
var r1 = b[1];
var r2 = b[1.1];
var r3 = b['1'];
var r4 = b['1.1'];
