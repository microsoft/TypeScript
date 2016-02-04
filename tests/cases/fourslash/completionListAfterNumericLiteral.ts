/// <reference path='fourslash.ts' />

// @Filename: f1.ts
////0./*dotOnNumberExpressions1*/

// @Filename: f2.ts
////0.0./*dotOnNumberExpressions2*/

// @Filename: f3.ts
////0.0.0./*dotOnNumberExpressions3*/

// @Filename: f4.ts
////0./** comment *//*dotOnNumberExpressions4*/

// @Filename: f5.ts
////(0)./*validDotOnNumberExpressions1*/

// @Filename: f6.ts
////(0.)./*validDotOnNumberExpressions2*/

// @Filename: f7.ts
////(0.0)./*validDotOnNumberExpressions3*/

goTo.marker("dotOnNumberExpressions1");
verify.completionListIsEmpty();

goTo.marker("dotOnNumberExpressions2");
verify.completionListContains("toExponential");

goTo.marker("dotOnNumberExpressions3");
verify.completionListContains("toExponential");

goTo.marker("dotOnNumberExpressions4");
verify.completionListIsEmpty();

goTo.marker("validDotOnNumberExpressions1");
verify.completionListContains("toExponential");

goTo.marker("validDotOnNumberExpressions2");
verify.completionListContains("toExponential");

goTo.marker("validDotOnNumberExpressions3");
verify.completionListContains("toExponential");
