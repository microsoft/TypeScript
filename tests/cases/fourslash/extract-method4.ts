/// <reference path='fourslash.ts' />

//// let a = 1, b = 2, c = 3, d = 4;
//// namespace NS {
////     class Q {
////         foo() {
////             a = /*1*/b = c/*2*/ = d;
////         }
////     }
//// }

// Should rewrite to a = newFunc(); function() { return b = c = d; }
goTo.select('1', '2');
verify.not.refactorAvailable('Extract Symbol');
