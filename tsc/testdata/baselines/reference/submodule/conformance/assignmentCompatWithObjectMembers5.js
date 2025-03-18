//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithObjectMembers5.ts] ////

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
class C {
    foo;
}
var c;
var i;
c = i;
i = c;
