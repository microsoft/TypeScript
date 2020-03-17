//// [inferFromBindingPattern.ts]
declare function f1<T extends string>(): T;
declare function f2<T extends string>(): [T];
declare function f3<T extends string>(): { x: T };

let x1 = f1();         // string
let [x2] = f2();       // string
let { x: x3 } = f3();  // string

// Repro from #30379

function foo<T = number>(): [T] {
	return [42 as any]
}
const [x] = foo();  // [number]

// Repro from #35291

interface SelectProps<T, K> {
  selector?: (obj: T) => K;
}

type SelectResult<T, K> = [K, T];

interface Person {
  name: string;
  surname: string;
}

declare function selectJohn<K = Person>(props?: SelectProps<Person, K>): SelectResult<Person, K>;

const [person] = selectJohn();
const [any, whatever] = selectJohn();
const john = selectJohn();
const [personAgain, nufinspecial] = john;

// Repro from #35291

declare function makeTuple<T1>(arg: T1): [T1];
declare function stringy<T = string>(arg?: T): T;

const isStringTuple = makeTuple(stringy());  // [string]
const [isAny] = makeTuple(stringy());  // [string]


//// [inferFromBindingPattern.js]
"use strict";
var x1 = f1(); // string
var x2 = f2()[0]; // string
var x3 = f3().x; // string
// Repro from #30379
function foo() {
    return [42];
}
var x = foo()[0]; // [number]
var person = selectJohn()[0];
var _a = selectJohn(), any = _a[0], whatever = _a[1];
var john = selectJohn();
var personAgain = john[0], nufinspecial = john[1];
var isStringTuple = makeTuple(stringy()); // [string]
var isAny = makeTuple(stringy())[0]; // [string]
