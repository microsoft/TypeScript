//// [tests/cases/conformance/es6/destructuring/destructuringObjectBindingPatternAndAssignment5.ts] ////

//// [destructuringObjectBindingPatternAndAssignment5.ts]
function a () {
    let x: number;
    let y: any
    ({ x, ...y } = ({ } as any));
}


//// [destructuringObjectBindingPatternAndAssignment5.js]
function a() {
    let x;
    let y;
    ({ x, ...y } = {});
}
