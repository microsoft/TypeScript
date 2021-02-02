//// [outOfBoundTupleIndexTypeIsUndefined.ts]
type T = [number, boolean] & { x: number };
type U = [number, boolean] & { [2]: number };

declare const t: T;
const a = t[0]; // number
const b = t[1]; // boolean
const c = t[2]; // undefined

const x: T[2] = 0 // error
const y: U[2] = 0 // no error


//// [outOfBoundTupleIndexTypeIsUndefined.js]
var a = t[0]; // number
var b = t[1]; // boolean
var c = t[2]; // undefined
var x = 0; // error
var y = 0; // no error
