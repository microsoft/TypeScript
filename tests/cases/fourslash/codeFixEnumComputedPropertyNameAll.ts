/// <reference path='fourslash.ts' />

// @Filename: test.ts
////enum CHAR {
////    ['\t'] = 0x09,
////    ['\n'] = 0x0A,
////    [`\r`] = 0x0D,
////}

goTo.file("test.ts");
verify.codeFixAll({
    fixId: "convertComputedEnumMemberName",
    fixAllDescription: "Remove all unnecessary computed property name syntax",
    newFileContent: `enum CHAR {
    "\\t" = 0x09,
    "\\n" = 0x0A,
    "\\r" = 0x0D,
}`,
});
