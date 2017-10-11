/// <reference path='fourslash.ts' />

//// namespace NS {
////     class Q {
////         foo() {
////             console.log('100');
////             const m = 10, j = "hello", k = {x: "what"};
////             const q = /*a*/m/*b*/;
////         }
////     }
//// }

// Don't offer to 'extract symbol' a single identifier

goTo.marker('a');
verify.not.refactorAvailable('Extract Symbol');
goTo.select('a', 'b');
verify.not.refactorAvailable('Extract Symbol');
