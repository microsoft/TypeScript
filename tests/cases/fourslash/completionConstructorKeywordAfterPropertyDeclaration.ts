/// <reference path="fourslash.ts" />

//// const GlobalWhat = 123
//// // situations that `constructor` is partly present
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
//// // situations that `constructor` is fully present
//// class H {
////   blah
////   constructor/*8*/
//// }
//// class I {
////   blah;
////   constructor/*9*/
//// }
//// class J {
////   blah: number
////   constructor/*10*/
//// }
//// class K {
////   blah: number;
////   constructor/*11*/
//// }
//// class L {
////   blah = 123
////   constructor/*12*/
//// }
//// class M {
////   blah = 123;
////   constructor/*13*/
//// }
//// class N {
////   blah = [123]
////   constructor/*14*/
//// }
//// class O {
////   blah = {key: 1}
////   constructor/*15*/
//// }
//// function return1() {
////   return 1
//// }
//// class P {
////   blah = return1()
////   constructor/*16*/
//// }
//// // situations that `constructor` isn't present
//// class Q {
////   blah; /*17*/ 
//// }
//// class R {
////   blah
////   /*18*/
//// }
//// // situations that `constructor` should not be suggested
//// class R {
////   blah /*19*/ 
//// }
//// class S {
////   blah con/*20*/
//// }
//// // situations that `constructor` should not be suggested but 
//// class T {
////   blah: number con/*21*/
//// }
//// const SomeValue = 123
//// class U {
////   blah = SomeValue con/*22*/  
//// }

function generateRange(l: number, r: number) {
  return Array.from(Array(r - l + 1), (_, i) => String(i + l)); // [l, r]
}

verify.completions({
  marker: generateRange(1, 18),
  includes: { name: "constructor", sortText: completion.SortText.GlobalsOrKeywords },
  isNewIdentifierLocation: true,
});

verify.completions({
  marker: generateRange(19, 20),
  exact: [],
  isNewIdentifierLocation: true,
});
