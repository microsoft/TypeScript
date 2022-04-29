/// <reference path='fourslash.ts' />

// Shouldn't be able to extract a readonly property initializer outside the constructor

//// class Foo {
////     readonly prop;
////     constructor() {
////         /*a*/this.prop = 10;/*b*/
////     }
//// }

goTo.select('a', 'b')
verify.refactorAvailable('Extract Symbol', 'function_scope_0');
verify.refactorAvailable('Extract Symbol', 'function_scope_1');
verify.not.refactorAvailable('Extract Symbol', 'function_scope_2');
