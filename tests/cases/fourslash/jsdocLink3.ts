///<reference path="fourslash.ts" />

// @Filename: /jsdocLink3.ts
//// export class C {
//// }
// @Filename: /module1.ts
//// import { C } from './jsdocLink3'
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
