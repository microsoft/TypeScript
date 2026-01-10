//// [tests/cases/conformance/types/members/objectTypeWithConstructSignatureHidingMembersOfFunctionAssignmentCompat.ts] ////

//// [objectTypeWithConstructSignatureHidingMembersOfFunctionAssignmentCompat.ts]
interface I {
    new(): any;
}

declare var i: I;
declare var f: Object;
f = i;
i = f;

declare var a: {
    new(): any
}
f = a;
a = f;

//// [objectTypeWithConstructSignatureHidingMembersOfFunctionAssignmentCompat.js]
f = i;
i = f;
f = a;
a = f;
