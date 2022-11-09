//// [tupleAssertions.ts]
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

//// [tupleAssertions.js]
"use strict";
let a1 = [];
let a2 = [1, 2, 3];
let a3 = [10, 'hello', true];
let a4 = [...[1, 2, 3]];
let a5 = [1, 2, 3];
let a6 = [...a5];
let a7 = [...a6];
let a8 = ['abc', ...a7];
let a9 = [...a8];
let e1 = 'abc';
let e2 = 10;
let e3 = { x: 10, y: 20 };
let e4 = `${e1}-${e2}`;
let p1 = (10); // Error
let p2 = ((-10)); // Error
let p3 = ([(10)]); // OK
let p4 = [[[[10]]]]; // OK
let q1 = 10; // Error
let q2 = 'abc'; // Error
let q3 = true; // Error
let q4 = [1, 2, 3]; // OK
let q5 = { x: 10, y: 20 }; // Error
function accessorNames(propName) {
    return [`get-${propName}`, `set-${propName}`];
}
const ns1 = accessorNames('foo');


//// [tupleAssertions.d.ts]
declare let a1: [];
declare let a2: [number, number, number];
declare let a3: [number, string, boolean];
declare let a4: [number, number, number];
declare let a5: number[];
declare let a6: number[];
declare let a7: number[];
declare let a8: [string, ...number[]];
declare let a9: (string | number)[];
declare let e1: "abc";
declare let e2: 10;
declare let e3: {
    x: number;
    y: number;
};
declare let e4: string;
declare let p1: 10;
declare let p2: -10;
declare let p3: number[];
declare let p4: [[[[number]]]];
declare let q1: 10;
declare let q2: "abc";
declare let q3: true;
declare let q4: [number, number, number];
declare let q5: {
    x: number;
    y: number;
};
declare function accessorNames<S extends string>(propName: S): [string, string];
declare const ns1: [string, string];
