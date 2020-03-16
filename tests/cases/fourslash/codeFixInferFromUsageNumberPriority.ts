/// <reference path='fourslash.ts' />

////function f(x, y) {
////    return x + y
////}
////f(1, 2)
verify.codeFix({
    description: "Infer parameter types from usage",
    index: 0,
    newFileContent:
`function f(x: number, y: number) {
    return x + y
}
f(1, 2)`,
});
