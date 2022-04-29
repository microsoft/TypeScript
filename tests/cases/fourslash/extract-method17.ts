/// <reference path='fourslash.ts' />

//// function foo () {
////     var x = 3;
////     var y = /*start*/x++ + 5/*end*/;
//// }

goTo.select('start', 'end')
verify.refactorAvailable('Extract Symbol', 'function_scope_0');
verify.not.refactorAvailable('Extract Symbol', 'function_scope_1');
