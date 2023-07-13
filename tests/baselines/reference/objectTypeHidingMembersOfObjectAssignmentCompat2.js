//// [tests/cases/conformance/types/members/objectTypeHidingMembersOfObjectAssignmentCompat2.ts] ////

//// [objectTypeHidingMembersOfObjectAssignmentCompat2.ts]
interface I {
    toString(): number;
}

var i: I;
var o: Object;
o = i; // error
i = o; // error

class C {
    toString(): number { return 1; }
}
var c: C;
o = c; // error
c = o; // error

var a = {
    toString: () => { }
}
o = a; // error
a = o; // ok

//// [objectTypeHidingMembersOfObjectAssignmentCompat2.js]
var i;
var o;
o = i; // error
i = o; // error
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.toString = function () { return 1; };
    return C;
}());
var c;
o = c; // error
c = o; // error
var a = {
    toString: function () { }
};
o = a; // error
a = o; // ok
