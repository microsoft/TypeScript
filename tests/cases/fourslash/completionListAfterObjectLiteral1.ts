/// <reference path="fourslash.ts" />

////var v = { x: 4, y: 3 }./**/

goTo.marker();
verify.not.completionListContains('a');
verify.completionListContains('x');