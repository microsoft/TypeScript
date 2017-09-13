/// <reference path='fourslash.ts' />

// Same as `extract-method-not-for-token, but without the `;`,
// so the range is the entire ExpressionStatement rather than just the token it contains.

/////*start*/a/*end*/

goTo.select('start', 'end')
verify.not.refactorAvailable("Extract Method");
