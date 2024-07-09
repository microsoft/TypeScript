//// [tests/cases/conformance/types/thisType/thisTypeInTuples.ts] ////

//// [thisTypeInTuples.ts]
interface Array<T> {
    slice(): this;
}

let t: [number, string] = [42, "hello"];
let a = t.slice();
let b = t.slice(1);
let c = t.slice(0, 1);


//// [thisTypeInTuples.js]
var t = [42, "hello"];
var a = t.slice();
var b = t.slice(1);
var c = t.slice(0, 1);
