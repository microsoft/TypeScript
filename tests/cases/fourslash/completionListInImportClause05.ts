/// <reference path='fourslash.ts' />

// @Filename: app.ts
//// import * as A from "[|/*1*/|]";

// @Filename: /node_modules/@types/a__b/index.d.ts
////declare module "@e/f" { function fun(): string; }

// @Filename: /node_modules/@types/c__d/index.d.ts
////export declare let x: number;

// NOTE: When performing completion, the "current directory" appears to be "/",
// which is well above "." (i.e. the directory containing "app.ts").  This issue
// is specific to the virtual file system, so just work around it by putting the
// node modules folder in "/", rather than ".".

const [replacementSpan] = test.ranges();
verify.completionsAt("1", [
    { name: "@a/b", replacementSpan },
    { name: "@c/d", replacementSpan },
    { name: "@e/f", replacementSpan },
]);
