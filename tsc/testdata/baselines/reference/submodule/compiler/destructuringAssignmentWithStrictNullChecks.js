//// [tests/cases/compiler/destructuringAssignmentWithStrictNullChecks.ts] ////

//// [destructuringAssignmentWithStrictNullChecks.ts]
let bar: {};
({ ...bar } = {});


//// [destructuringAssignmentWithStrictNullChecks.js]
let bar;
({ ...bar } = {});
