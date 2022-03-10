/// <reference path='fourslash.ts' />

// @Filename: f.ts
////export { foo as default };
////function /*start*/foo(a: number, b: number) {
////    return a + b;
////}

// @Filename: b.ts
////import bar from "./f";
////bar(1, 2);

verify.noErrors();
verify.baselineFindAllReferences('start')
