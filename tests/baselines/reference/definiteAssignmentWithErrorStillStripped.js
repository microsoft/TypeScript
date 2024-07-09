//// [tests/cases/compiler/definiteAssignmentWithErrorStillStripped.ts] ////

//// [definiteAssignmentWithErrorStillStripped.ts]
class C {
    p!;
}

//// [definiteAssignmentWithErrorStillStripped.js]
class C {
    p;
}
