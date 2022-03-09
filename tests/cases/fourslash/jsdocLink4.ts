///<reference path="fourslash.ts" />

//// declare class I {
////   /** {@link I} */
////   bar/*1*/(): void
//// }
//// /** {@link I} */
//// var n/*2*/ = 1
//// /**
////  * A real, very serious {@link I to an interface}. Right there.
////  * @param x one {@link Pos here too}
////  */
//// function f(x) {
//// }
//// f/*3*/()
//// type Pos = [number, number]
verify.baselineQuickInfo();
