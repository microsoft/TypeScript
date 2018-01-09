//// [assignmentCompatWithObjectMembers5.ts]
class C {
    foo: string;
}

var c: C;

interface I {
    fooo: string;
}

var i: I;

c = i; // error
i = c; // error

//// [assignmentCompatWithObjectMembers5.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c;
var i;
c = i; // error
i = c; // error
