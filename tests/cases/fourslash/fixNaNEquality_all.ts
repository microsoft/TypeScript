/// <reference path="fourslash.ts" />

////declare const x: number;
////declare const y: any;
////if (x === NaN) {}
////if (NaN === x) {}
////if (x !== NaN) {}
////if (NaN !== x) {}
////if (NaN === y[0][1]) {}

verify.codeFixAll({
    fixId: "fixNaNEquality",
    fixAllDescription: ts.Diagnostics.Use_Number_isNaN_in_all_conditions.message,
    newFileContent:
`declare const x: number;
declare const y: any;
if (Number.isNaN(x)) {}
if (Number.isNaN(x)) {}
if (!Number.isNaN(x)) {}
if (!Number.isNaN(x)) {}
if (Number.isNaN(y[0][1])) {}`
});
