/// <reference path="fourslash.ts" />

////let v = 100;
////let x = /absidey//**/

// Should get nothing at the marker since it's
// going to be considered part of the regex flags.
verify.completions({ marker: "", exact: undefined });
