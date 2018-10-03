/// <reference path='fourslash.ts' />

////function f(s: string) {
////    s.toStrang();
////    s.toStrong();
////}

verify.codeFixAll({
    fixId: "fixSpelling",
    newFileContent:
`function f(s: string) {
    s.toString();
    s.toString();
}`,
});
