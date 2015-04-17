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
