//// [tests/cases/compiler/bigintIndex.ts] ////

//// [a.ts]
interface BigIntIndex<E> {
    [index: bigint]: E; // should error
}

const arr: number[] = [1, 2, 3];
let num: number = arr[1];
num = arr["1"];
num = arr[1n]; // should error

let key: keyof any; // should be type "string | number | symbol"
key = 123;
key = "abc";
key = Symbol();
key = 123n; // should error

// Show correct usage of bigint index: explicitly convert to string
const bigNum: bigint = 0n;
const typedArray = new Uint8Array(3);
typedArray[bigNum] = 0xAA; // should error
typedArray[String(bigNum)] = 0xAA;
typedArray["1"] = 0xBB;
typedArray[2] = 0xCC;

// {1n: 123} is a syntax error; must go in separate file so BigIntIndex error is shown
//// [b.ts]
// BigInt cannot be used as an object literal property
const a = {1n: 123};
const b = {[1n]: 456};
const c = {[bigNum]: 789};


//// [a.js]
const arr = [1, 2, 3];
let num = arr[1];
num = arr["1"];
num = arr[1n]; // should error
let key; // should be type "string | number | symbol"
key = 123;
key = "abc";
key = Symbol();
key = 123n; // should error
// Show correct usage of bigint index: explicitly convert to string
const bigNum = 0n;
const typedArray = new Uint8Array(3);
typedArray[bigNum] = 0xAA; // should error
typedArray[String(bigNum)] = 0xAA;
typedArray["1"] = 0xBB;
typedArray[2] = 0xCC;
// {1n: 123} is a syntax error; must go in separate file so BigIntIndex error is shown
//// [b.js]
// BigInt cannot be used as an object literal property
const a = {};
1n;
123;
;
const b = { [1n]: 456 };
const c = { [bigNum]: 789 };
