/// <reference path='fourslash.ts' />

//// class Foo {
////     someMethod(m: number) {
////         /*start*/var x = m;
////         x = x * 3;
////         var y = 30;
////         var z = y + x;
////         console.log(z);/*end*/
////         var q = 10;
////         return q;
////     }
//// }

goTo.select('start', 'end')
verify.refactorAvailable('Extract Method');
debug.printCurrentFileState();
edit.applyRefactor('Extract Method', "scope_0");
debug.printCurrentFileState();
