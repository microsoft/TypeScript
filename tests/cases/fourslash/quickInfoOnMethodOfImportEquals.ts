/// <reference path="fourslash.ts" />

// Test for https://github.com/Microsoft/TypeScript/issues/15931

// @Filename: /a.d.ts
////declare class C<T> {
////    m(): void;
////}
////export = C;

// @Filename: /b.ts
////import C = require("./a");
////declare var x: C<number>;
////x./**/m;

verify.quickInfoAt("", "(method) C<number>.m(): void", undefined);
