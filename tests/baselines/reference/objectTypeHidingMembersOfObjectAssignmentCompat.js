//// [objectTypeHidingMembersOfObjectAssignmentCompat.ts]
interface I {
    toString(): void;
}

var i: I;
var o: Object;
o = i; // error
i = o; // ok

class C {
    toString(): void { }
}
var c: C;
o = c; // error
c = o; // ok

var a = {
    toString: () => { }
}
o = a; // error
a = o; // ok

//// [objectTypeHidingMembersOfObjectAssignmentCompat.js]
var i;
var o;
o = i; // error
i = o; // ok
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.toString = function () { };
    return C;
}());
var c;
o = c; // error
c = o; // ok
var a = {
    toString: function () { }
};
o = a; // error
a = o; // ok
