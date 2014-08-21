//// [generics2.ts]
interface A { a: string; }
interface B extends A { b: string; }
interface C extends B { c: string; }
interface G<T, U extends B> {
    x: T;
    y: U;
}


var v1: {
    x: { a: string; }
    y: { a: string; b: string; c: string };
}; // Ok


var v2: G<{ a: string }, C>;   // Ok, equivalent to G<A, C>
var v3: G<A, A>;               // Error, A not valid argument for U
var v4: G<G<A, B>, C>;         // Ok
var v5: G<any, any>;           // Error, any does not satisfy constraint B
var v6: G<any>;                // Error, wrong number of arguments
var v7: G;                     // Error, no type arguments


//// [generics2.js]
var v1; // Ok
var v2; // Ok, equivalent to G<A, C>
var v3; // Error, A not valid argument for U
var v4; // Ok
var v5; // Error, any does not satisfy constraint B
var v6; // Error, wrong number of arguments
var v7; // Error, no type arguments
