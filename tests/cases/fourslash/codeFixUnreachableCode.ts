/// <reference path='fourslash.ts' />

////function f() {
////    return f();
////    return 1;
////    function f() {}
////    return 2;
////}

verify.codeFix({
    description: "Remove unreachable code",
    newFileContent:
`function f() {
    return f();
    function f() {}
}`,
});
