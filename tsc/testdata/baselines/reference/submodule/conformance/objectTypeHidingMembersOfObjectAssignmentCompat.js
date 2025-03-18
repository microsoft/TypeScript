//// [tests/cases/conformance/types/members/objectTypeHidingMembersOfObjectAssignmentCompat.ts] ////

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
o = i;
i = o;
class C {
    toString() { }
}
var c;
o = c;
c = o;
var a = {
    toString: () => { }
};
o = a;
a = o;
