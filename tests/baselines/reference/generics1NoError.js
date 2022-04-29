//// [generics1NoError.ts]
interface A { a: string; }
interface B extends A { b: string; }
interface C extends B { c: string; }
interface G<T, U extends B> {
    x: T;
    y: U;
}
var v1: G<A, C>;               // Ok
var v2: G<{ a: string }, C>;   // Ok, equivalent to G<A, C>
var v4: G<G<A, B>, C>;         // Ok

//// [generics1NoError.js]
var v1; // Ok
var v2; // Ok, equivalent to G<A, C>
var v4; // Ok


//// [generics1NoError.d.ts]
interface A {
    a: string;
}
interface B extends A {
    b: string;
}
interface C extends B {
    c: string;
}
interface G<T, U extends B> {
    x: T;
    y: U;
}
declare var v1: G<A, C>;
declare var v2: G<{
    a: string;
}, C>;
declare var v4: G<G<A, B>, C>;
