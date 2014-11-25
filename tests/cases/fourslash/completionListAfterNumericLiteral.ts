/// <reference path='fourslash.ts' />

// @Filename: f1.ts
////0./*dotOnNumberExrpressions1*/

// @Filename: f2.ts
////0.0./*dotOnNumberExrpressions2*/

// @Filename: f3.ts
////0.0.0./*dotOnNumberExrpressions3*/

// @Filename: f4.ts
////0./** comment *//*dotOnNumberExrpressions4*/

// @Filename: f5.ts
////(0)./*validDotOnNumberExrpressions1*/

// @Filename: f6.ts
////(0.)./*validDotOnNumberExrpressions2*/

// @Filename: f7.ts
////(0.0)./*validDotOnNumberExrpressions3*/

goTo.marker("dotOnNumberExrpressions1");
verify.completionListIsEmpty();

goTo.marker("dotOnNumberExrpressions2");
verify.completionListContains("toExponential");

goTo.marker("dotOnNumberExrpressions3");
verify.completionListContains("toExponential");

goTo.marker("dotOnNumberExrpressions4");
verify.completionListIsEmpty();

goTo.marker("validDotOnNumberExrpressions1");
verify.completionListContains("toExponential");

goTo.marker("validDotOnNumberExrpressions2");
verify.completionListContains("toExponential");

goTo.marker("validDotOnNumberExrpressions3");
verify.completionListContains("toExponential");
