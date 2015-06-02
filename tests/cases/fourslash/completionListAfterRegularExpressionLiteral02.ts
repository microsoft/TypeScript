/// <reference path="fourslash.ts" />

////let x = /absidey//**/

// Should get nothing at the marker since it's
// going to be considered part of the regex flags.

goTo.marker();
verify.completionListIsEmpty();