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

verify.completions(
    { marker: ["dotOnNumberExpressions1", "dotOnNumberExpressions4"], exact: undefined },
    {
        marker: ["dotOnNumberExpressions2", "dotOnNumberExpressions3", "validDotOnNumberExpressions1", "validDotOnNumberExpressions2", "validDotOnNumberExpressions3"],
        includes: "toExponential"
    },
);
