
/// <reference path='fourslash.ts' />

// @verbatimModuleSyntax: true
//@module: esnext
//moduleResolution: bundler

// @Filename: /bar.ts
////import {} from "./somefile";

// @Filename: /a.ts
////import { type A } from "./other";
////import type { B } from "./other";
////[|function f(a: B) {}|]

// @Filename: /other.ts
////export type B = {};
////export interface A {
////    x: number;
////}


verify.moveToFile({
    newFileContents: {
        "/a.ts":
`import { type A } from "./other";
`,
        "/bar.ts":
`import type { B } from "./other";
import {} from "./somefile";
function f(a: B) { }
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});
