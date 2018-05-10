/// <reference path='fourslash.ts' />

////function f() {
////    return 0;
////    return 1;
////}

verify.codeFix({
    description: "Remove unreachable code",
    newFileContent:
`function f() {
    return 0;
}`,
});
