//// [tests/cases/compiler/destructuringPropertyAssignmentNameIsNotAssignmentTarget.ts] ////

//// [destructuringPropertyAssignmentNameIsNotAssignmentTarget.ts]
// test for #10668
function qux(bar: { value: number }) {
    let foo: number;
    ({ value: foo } = bar);
    let x = () => bar;
}



//// [destructuringPropertyAssignmentNameIsNotAssignmentTarget.js]
// test for #10668
function qux(bar) {
    let foo;
    ({ value: foo } = bar);
    let x = () => bar;
}
