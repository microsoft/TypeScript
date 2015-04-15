//// [destructuringArrayBindingPatternAndAssignment2.ts]
function foo() {
    return [1, 2, 3];
}
interface J extends Array<Number> {
    2: number;
}

function bar(): J {
    return <[number, number, number]>[1, 2, 3]; 
}

var [j, k] = foo();
var [...p] = foo();


//// [destructuringArrayBindingPatternAndAssignment2.js]
function foo() {
    return [1, 2, 3];
}
function bar() {
    return [1, 2, 3];
}
var _a = foo(), j = _a[0], k = _a[1];
var _b = foo(), p = _b.slice(0);
