/// <reference path="fourslash.ts" />

// @noUnusedLocals: true

////function foo(): number;
////function foo(x: number, y: number): number;
////function foo(x?: number, y?: number): number {
////    return 1234;
////}
////
////export {}

verify.codeFix({
    index: 0,
    description: "Remove unused declaration for: 'foo'",
    newFileContent:
`
export {}`,
});
