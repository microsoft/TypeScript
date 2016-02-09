//@strictThis: true
interface A { a: number; m(this: this): number }
interface B { b: number, m(this: this): number }
interface C { c: number; m(): number }
let a: A;
let ab: A | B;
let abc: A | B | C;
// ab.m().length;
abc.m().length; // should be OK? this: any, right?