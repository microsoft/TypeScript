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
    var foo;
    (foo = bar.value);
    var x = function () { return bar; };
}
