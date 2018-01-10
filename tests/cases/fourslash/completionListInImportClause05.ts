/// <reference path='fourslash.ts' />

// @Filename: app.ts
//// import * as A from "[|/*1*/|]";

// @Filename: /node_modules/@types/a__b/index.d.ts
////declare module "@e/f" { function fun(): string; }

// @Filename: /node_modules/@types/c__d/index.d.ts
////export declare let x: number;

const [replacementSpan] = test.ranges();
verify.completionsAt("1", [
    { name: "@a/b", replacementSpan },
    { name: "@c/d", replacementSpan },
    { name: "@e/f", replacementSpan },
]);
