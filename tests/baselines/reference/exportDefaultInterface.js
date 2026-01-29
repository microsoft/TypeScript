//// [tests/cases/compiler/exportDefaultInterface.ts] ////

//// [a.ts]
export default interface A { value: number; }

var a: A;
a.value.toExponential();

//// [b.ts]
import A from './a';

var a: A;
a.value.toExponential();

//// [a.js]
var a;
a.value.toExponential();
export {};
//// [b.js]
var a;
a.value.toExponential();
export {};
