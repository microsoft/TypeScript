/// <reference path='fourslash.ts' />

////function f() {
////    return f();
////    return 1;
////    function f() {}
////    return 2;
////    type T = number;
////    interface I {}
////    const enum E {}
////    enum E {}
////    namespace N { export type T = number; }
////    namespace N { export const x = 0; }
////    var x;
////    var y = 0;
////}

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
    var x;
}`,
});
