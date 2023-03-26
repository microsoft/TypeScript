
/// <reference path='fourslash.ts' />


// @Filename: /bar.ts
//// const q = 0;

// @Filename: /a.ts
////import { type A } from "./other";
////[|function f(a: A) {}|]

// @Filename: /other.ts
////export interface A {
////    x: number;
////}


verify.moveToAnotherFile({
    newFileContents: {
        "/a.ts":"",
        "/bar.ts":
` import { type A } from "./other";

 const q = 0;
 function f(a: A) { }
`,
    },
    newFile: "/bar.ts",
    preferences: {}
});
