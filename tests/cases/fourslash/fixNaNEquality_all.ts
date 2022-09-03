/// <reference path="fourslash.ts" />

////if (x === NaN) {}
////if (NaN === x) {}
////if (x !== NaN) {}
////if (NaN !== x) {}

verify.codeFixAll({
    fixId: "fixNaNEquality",
    fixAllDescription: ts.Diagnostics.Use_Number_isNaN_in_all_conditions.message,
    newFileContent:
`if (Number.isNaN(x)) {}
if (Number.isNaN(x)) {}
if (!Number.isNaN(x)) {}
if (!Number.isNaN(x)) {}`
});
