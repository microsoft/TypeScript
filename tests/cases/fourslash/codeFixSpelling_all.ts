/// <reference path='fourslash.ts' />

////function f(s: string) {
////    s.toStrang();
////    s.toStrong();
////}
////
////type A = { "foo-bar": number; "barbaz": string; };
////var a: A;
////a.foobar;
////a.barbz

verify.codeFixAll({
    fixId: "fixSpelling",
    newFileContent:
`function f(s: string) {
    s.toString();
    s.toString();
}

type A = { "foo-bar": number; "barbaz": string; };
var a: A;
a["foo-bar"];
a.barbaz`,
});
