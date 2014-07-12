/// <reference path="fourslash.ts" />

//// function method() { var dictionary/**/ = <{ [index]: string; }>{}; }

goTo.marker();
verify.quickInfoIs('{ [index: any]: string; }');
