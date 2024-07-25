/// <reference path="fourslash.ts" />

////const a = 1;
////a = 2;
////a = 3;

verify.codeFixAll({
    fixId: "fixConvertConstToLet",
    fixAllDescription: ts.Diagnostics.Convert_all_const_to_let.message,
    newFileContent:
`let a = 1;
a = 2;
a = 3;`
});
