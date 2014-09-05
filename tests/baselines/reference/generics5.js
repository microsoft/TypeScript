//// [generics5.ts]
interface A { a: string; }
interface B extends A { b: string; }

interface C extends B { c: string; }
interface G<T, U extends B> {


}

var v3: G<A, A>;               // Error, A not valid argument for U



//// [generics5.js]
var v3; // Error, A not valid argument for U
