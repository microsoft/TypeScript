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
////   /*18*/ // dont complete since `blah \n = 123` is legal
//// }
//// class R {
////   blah /*19*/ 
//// }
//// // situations that `constructor` should not be suggested
//// class S {
////   blah con/*20*/
//// }
//// class T {
////   blah: number con/*21*/
//// }

const positiveCaseCount = 17; // 1~17
const negativeCaseCount = 4; // 18~21
const positiveCases = Array.from(Array(positiveCaseCount), (_, i) => String(i + 1));
const negativeCases = Array.from(Array(negativeCaseCount), (_, i) => String(i + 1 + positiveCaseCount));

verify.completions({
  marker: positiveCases,
  includes: { name: "constructor", sortText: completion.SortText.GlobalsOrKeywords },
  isNewIdentifierLocation: true,
});

verify.completions({
  marker: negativeCases,
  exact: [],
  isNewIdentifierLocation: true,
});
