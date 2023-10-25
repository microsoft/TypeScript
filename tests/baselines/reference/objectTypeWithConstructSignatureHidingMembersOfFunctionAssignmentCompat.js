//// [tests/cases/conformance/types/members/objectTypeWithConstructSignatureHidingMembersOfFunctionAssignmentCompat.ts] ////

//// [objectTypeWithConstructSignatureHidingMembersOfFunctionAssignmentCompat.ts]
interface I {
    new(): any;
}

var i: I;
var f: Object;
f = i;
i = f;

var a: {
    new(): any
}
f = a;
a = f;

//// [objectTypeWithConstructSignatureHidingMembersOfFunctionAssignmentCompat.js]
var i;
var f;
f = i;
i = f;
var a;
f = a;
a = f;
