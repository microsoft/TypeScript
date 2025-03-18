//// [tests/cases/conformance/es6/destructuring/destructuringArrayBindingPatternAndAssignment4.ts] ////

//// [destructuringArrayBindingPatternAndAssignment4.ts]
// #35497


declare const data: number[] | null;
const [value] = data; // Error


//// [destructuringArrayBindingPatternAndAssignment4.js]
const [value] = data;
