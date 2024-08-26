/// <reference path='fourslash.ts' />

////function f() {
////    return f();
////    [|return 1;|]
////    function f(a?: EE) { return a; }
////    [|return 2;|]
////    type T = number;
////    interface I {}
////    const enum E {}
////    [|enum EE {}|]
////    namespace N { export type T = number; }
////    [|namespace N { export const x: T = 0; }|]
////    var x: I;
////    [|var y: T = 0;
////    E; N; x; y;|]
////}

verify.getSuggestionDiagnostics(test.ranges().map((range): FourSlashInterface.Diagnostic => ({
    message: "Unreachable code detected.",
    code: 7027,
    reportsUnnecessary: true,
    range,
})));

verify.codeFixAll({
    fixId: "fixUnreachableCode",
    fixAllDescription: "Remove all unreachable code",
    newFileContent:
`function f() {
    return f();
    function f(a?: EE) { return a; }
    type T = number;
    interface I {}
    const enum E {}
    namespace N { export type T = number; }
    var x: I;
}`,
});
