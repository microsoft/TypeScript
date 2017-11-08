/// <reference path='fourslash.ts' />

//// declare namespace Foo {
////     const x = /*start*/3/*end*/;
//// }

goTo.select('start', 'end')
verify.not.refactorAvailable('Extract Symbol');
