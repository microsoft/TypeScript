/// <reference path='fourslash.ts' />

// @strict: true
// @target: esnext
// @lib: esnext

//// const prop = Symbol.for('foo');
////
//// class A {
////     [prop] = 1;
//// }
//// class B extends A {
////     get [prop]() { return 2; }
//// }

verify.not.codeFixAvailable("fixPropertyOverrideAccessor");
