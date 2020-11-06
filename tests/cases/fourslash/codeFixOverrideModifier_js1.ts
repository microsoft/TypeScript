/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitOverride: true
// @filename: a.js
//// class B {
////     foo (v) {}
//// }
//// class D extends B {
////     foo (v) {}
////     /**@override*/
////     bar (v) {}
//// }
//// class C {
////     /**@override*/
////     foo () {}
//// }

verify.not.codeFixAvailable("fixAddOverrideModifier");
verify.not.codeFixAvailable("fixRemoveOverrideModifier");
