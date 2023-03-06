///<reference path="fourslash.ts" />

// @Filename: jsdocLink2.ts
//// class C {
//// }
// @Filename: script.ts
//// /**
////  * {@link C}
////  * @wat Makes a {@link C}. A default one.
////  * {@link C()}
////  * {@link C|postfix text}
////  * {@link unformatted postfix text}
////  * @see {@link C} its great
////  */
//// function /**/CC() {
//// }

verify.baselineQuickInfo();
