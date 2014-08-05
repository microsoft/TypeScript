/// <reference path='fourslash.ts'/>

////interface A { a: string; }
////interface B extends A { b: string; }
////interface C extends B { c: string; }
////interface G<T, U extends B> {
////    x: T;
////    y: U;
////}
////var v/*1*/1: G<A, C>;               // Ok
////var v/*2*/2: G<{ a: string }, C>;   // Ok, equivalent to G<A, C>
////var v/*3*/3: G<G<A, B>, C>;         // Ok

goTo.marker('1');
verify.quickInfoIs('G<A, C>', null, 'v1');
goTo.marker('2');
verify.quickInfoIs('G<{ a: string; }, C>', null, 'v2');
goTo.marker('3');
verify.quickInfoIs('G<G<A, B>, C>', null, 'v3');