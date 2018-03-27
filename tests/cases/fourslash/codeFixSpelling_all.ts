/// <reference path='fourslash.ts' />

////function f(s: string) {
////    s.toStrang();
////    s.toStrong();
////}

verify.codeFixAll({
    fixId: "fixSpelling",
    fixAllDescription: "Fix all detected spelling errors",
    newFileContent:
`function f(s: string) {
    s.toString();
    s.toString();
}`,
});
