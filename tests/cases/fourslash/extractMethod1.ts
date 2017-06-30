/// <reference path='fourslash.ts' />

//// class Foo {
////     someMethod(m: number) {
////         /*start*/var x = m;
////         x = x * 3;
////         var y = 30;
////         var z = y + x;/*end*/
////         return z;
////     }
//// }

goTo.select('start', 'end')
verify.refactorAvailable('Extract method');
debug.printCurrentFileState();
edit.applyRefactor('Extract method', 1);
debug.printCurrentFileState();
