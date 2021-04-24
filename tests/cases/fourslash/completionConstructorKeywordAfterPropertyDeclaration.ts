/// <reference path="fourslash.ts" />

//// // situations that `constructor` is partly present
//// class A {
////   blah; con/*1*/
//// }
//// class B {
////   blah
////   con/*2*/
//// }
//// class C {
////   blah: number
////   con/*3*/
//// }
//// class D {
////   blah = 123
////   con/*4*/
//// }
//// class E {
////   blah = [123]
////   con/*5*/
//// }
//// class F {
////   blah = {key: 123}
////   con/*6*/
//// }
//// // situations that `constructor` is fully present
//// class G {
////   blah; constructor/*7*/
//// }
//// class H {
////   blah
////   constructor/*8*/
//// }
//// class I {
////   blah: number
////   constructor/*9*/
//// }
//// class J {
////   blah = 123
////   constructor/*10*/
//// }
//// class K {
////   blah = [123]
////   constructor/*11*/
//// }
//// class L {
////   blah = {key: 123}
////   constructor/*12*/
//// }
//// // situations that `constructor` isn't present, but we should offer it
//// class M {
////   blah; /*13*/ 
//// }
//// class N {
////   blah
////   /*14*/
//// }
//// // situations that `constructor` should not be suggested
//// class O {
////   blah /*15*/ 
//// }
//// class P {
////   blah con/*16*/
//// }
//// class Q {
////   blah: number con/*17*/
//// }
//// class R {
////   blah = 123 con/*18*/
//// }
//// class S {
////   blah = {key: 123} con/*19*/
//// }
//// type SomeType = number
//// class T {
////   blah: SomeType con/*20*/
//// }
//// const SomeValue = 123
//// class U {
////   blah = SomeValue con/*21*/
//// }

function generateRange(l: number, r: number) {
  return Array.from(Array(r - l + 1), (_, i) => String(i + l)); // [l, r]
}

verify.completions({
  marker: generateRange(1, 14),
  includes: { name: "constructor", sortText: completion.SortText.GlobalsOrKeywords },
  isNewIdentifierLocation: true,
});

verify.completions({
  marker: generateRange(15, 21),
  exact: [],
  isNewIdentifierLocation: true,
});
