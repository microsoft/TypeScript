//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithObjectMembers5.ts] ////

//// [assignmentCompatWithObjectMembers5.ts]
class C {
    foo: string;
}

declare var c: C;

interface I {
    fooo: string;
}

declare var i: I;

c = i; // error
i = c; // error

//// [assignmentCompatWithObjectMembers5.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
c = i; // error
i = c; // error
