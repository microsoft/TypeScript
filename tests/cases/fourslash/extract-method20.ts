/// <reference path='fourslash.ts' />

// Shouldn't be able to extract a readonly property initializer outside the constructor

//// class Foo {
////     readonly prop;
////     constructor() {
////         /*a*/this.prop = 10;/*b*/
////     }
//// }

goTo.select('a', 'b')
verify.refactorAvailable('Extract Method', 'scope_0');
verify.not.refactorAvailable('Extract Method', 'scope_1');
