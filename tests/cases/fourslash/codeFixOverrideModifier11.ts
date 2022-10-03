/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

//// abstract class Base {
////     abstract bar(): void;
//// }
//// class Sub extends Base {
////     [|override bar() {}|]
//// }

verify.not.refactorAvailable();
