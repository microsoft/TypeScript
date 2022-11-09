// @strict: true
// @declaration: true
// @target: esnext

let a1 = [] as tuple;
let a2 = [1, 2, 3] as tuple;
let a3 = [10, 'hello', true] as tuple;
let a4 = [...[1, 2, 3]] as tuple;
let a5 = [1, 2, 3];
let a6 = [...a5] as tuple;
let a7 = [...a6];
let a8 = ['abc', ...a7] as tuple;
let a9 = [...a8];

let e1 = 'abc' as tuple;
let e2 = 10 as tuple;
let e3 = { x: 10, y: 20 } as tuple;
let e4 = `${e1}-${e2}` as tuple;

let p1 = (10) as tuple; // Error
let p2 = ((-10)) as tuple; // Error
let p3 = ([(10)]) as tuple; // OK
let p4 = [[[[10]]]] as tuple; // OK

let q1 = <tuple> 10; // Error
let q2 = <tuple> 'abc'; // Error
let q3 = <tuple> true; // Error
let q4 = <tuple> [1, 2, 3]; // OK
let q5 = <tuple> { x: 10, y: 20 }; // Error

function accessorNames<S extends string>(propName: S) {
    return [`get-${propName}`, `set-${propName}`] as tuple;
}

const ns1 = accessorNames('foo');