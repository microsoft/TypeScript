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
o = i;
i = o;
class C {
    toString() { return 1; }
}
var c;
o = c;
c = o;
var a = {
    toString: () => { }
};
o = a;
a = o;
