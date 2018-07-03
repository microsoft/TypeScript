/// <reference path='fourslash.ts' />

////function f() {
////    return f();
////    [|return 1;
////    function f() {}
////    return 2;
////    type T = number;
////    interface I {}
////    const enum E {}
////    enum E {}
////    namespace N { export type T = number; }
////    namespace N { export const x: T = 0; }
////    var x: I;
////    var y: T = 0;
////    E; N; x; y;|]
////}

verify.getSuggestionDiagnostics([{
    message: "Unreachable code detected.",
    code: 7027,
    reportsUnnecessary: true,
}]);

verify.codeFix({
    description: "Remove unreachable code",
    index: 0,
    newFileContent:
`function f() {
    return f();
    function f() {}
    type T = number;
    interface I {}
    const enum E {}
    namespace N { export type T = number; }
    var x: I;
}`,
});
