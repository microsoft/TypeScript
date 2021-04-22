/// <reference path="fourslash.ts" />

//// // *** situations that `constructor` is partly present ***
//// class A {
////   blah; con/*1*/
//// }
//// class B {
////   blah
////   con/*2*/
//// }
//// class C {
////   blah;
////   con/*3*/
//// }
//// class D {
////   blah: number
////   con/*4*/
//// }
//// class E {
////   blah: number; con/*5*/
//// }
//// class F {
////   blah = 123
////   con/*6*/
//// }
//// class G {
////   blah = 123; con/*7*/
//// }
//// // *** situations that `constructor` is fully present ***
//// class H {
////   blah
////   constructor/*8*/(props) {}
//// }
//// class I {
////   blah;
////   constructor/*9*/(props) {}
//// }
//// class J {
////   blah: number
////   constructor/*10*/(props) {}
//// }
//// class K {
////   blah: number;
////   constructor/*11*/(props) {}
//// }
//// class L {
////   blah = 123
////   constructor/*12*/(props) {}
//// }
//// class M {
////   blah = 123;
////   constructor/*13*/(props) {}
//// }
//// class N {
////   blah = [123]
////   constructor/*14*/(props) {}
//// }
//// class O {
////   blah = {key: 1}
////   constructor/*15*/(props) {}
//// }
//// function return1() {
////   return 1
//// }
//// class P {
////   blah = return1()
////   constructor/*16*/(props) {}
//// }

verify.completions({
  marker: Array.from(Array(16), (_, i) => String(i + 1)),
  includes: { name: "constructor", sortText: completion.SortText.GlobalsOrKeywords },
  isNewIdentifierLocation: true,
});
