//// [tests/cases/conformance/types/members/objectTypeHidingMembersOfObjectAssignmentCompat2.ts] ////

//// [objectTypeHidingMembersOfObjectAssignmentCompat2.ts]
interface I {
    toString(): number;
}

declare var i: I;
declare var o: Object;
o = i; // error
i = o; // error

class C {
    toString(): number { return 1; }
}
declare var c: C;
o = c; // error
c = o; // error

var a = {
    toString: () => { }
}
o = a; // error
a = o; // ok

//// [objectTypeHidingMembersOfObjectAssignmentCompat2.js]
"use strict";
o = i; // error
i = o; // error
class C {
    toString() { return 1; }
}
o = c; // error
c = o; // error
var a = {
    toString: () => { }
};
o = a; // error
a = o; // ok
