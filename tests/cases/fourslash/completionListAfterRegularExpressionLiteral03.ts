/// <reference path="fourslash.ts" />

////let x = /absidey/
/////**/

// Should not be blocked since there is a
// newline separating us from the regex flags.

goTo.marker();
verify.not.completionListIsEmpty();