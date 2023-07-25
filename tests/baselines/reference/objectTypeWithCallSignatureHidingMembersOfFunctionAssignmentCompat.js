//// [tests/cases/conformance/types/members/objectTypeWithCallSignatureHidingMembersOfFunctionAssignmentCompat.ts] ////

//// [objectTypeWithCallSignatureHidingMembersOfFunctionAssignmentCompat.ts]
interface I {
    (): void;
}

var i: I;
var f: Object;
f = i;
i = f;

var a: {
    (): void
}
f = a;
a = f;

//// [objectTypeWithCallSignatureHidingMembersOfFunctionAssignmentCompat.js]
var i;
var f;
f = i;
i = f;
var a;
f = a;
a = f;
