//// [tests/cases/conformance/types/members/objectTypeWithCallSignatureHidingMembersOfFunctionAssignmentCompat.ts] ////

//// [objectTypeWithCallSignatureHidingMembersOfFunctionAssignmentCompat.ts]
interface I {
    (): void;
}

declare var i: I;
declare var f: Object;
f = i;
i = f;

declare var a: {
    (): void
}
f = a;
a = f;

//// [objectTypeWithCallSignatureHidingMembersOfFunctionAssignmentCompat.js]
f = i;
i = f;
f = a;
a = f;
