/// <reference path='fourslash.ts' />

//// function foo () {
////     var x = 3;
////     var y = /*start*/x++ + 5/*end*/;
//// }

goTo.select('start', 'end')
verify.refactorAvailable('Extract Method', 'scope_0');
verify.not.refactorAvailable('Extract Method', 'scope_1');
