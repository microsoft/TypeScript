/// <reference path='fourslash.ts' />

// You may not extract variable declarations with the export modifier

//// namespace NS {
////     /*start*/export var x = 10, y = 15;/*end*/
//// }

goTo.select('start', 'end')
verify.not.refactorAvailable('Extract Symbol');
