///<reference path="fourslash.ts" />

// Infer types from initializer

// @allowJs: true

// @Filename: a.js
//// /**
////  * @p/*z*/
////  */
//// function zz(a = 3) {}

//// /**
////  * @p/*y*/
////  */
//// function yy({ a = 3 }) {}

//// /**
////  * @p/*x*/
////  */
//// function xx({ a, o: { b, c: [d, e = 1] }}) {}

//// /**
////  * @p/*w*/
////  */
//// function ww({ a, o: { b, c: [d, e] = [1, true] }}) {}

//// /**
////  * @p/*v*/
////  */
//// function vv({ a = [1, true] }) {}

//// function random(a) { return a }
//// /**
////  * @p/*u*/
////  */
//// function uu({ a = random() }) {}

verify.baselineCompletions();