/// <reference path='fourslash.ts' />

// @Filename: /I.ts
////export interface J {}
////export interface I {
////    x: J;
////    m(): J;
////}

// @Filename: /C.ts
////import { I } from "./I";
////export class C implements I {}

goTo.file("/C.ts");
verify.codeFix({
    description: "Implement interface 'I'",
    newFileContent:
`import { I, J } from "./I";
export class C implements I {
    x: J;
    m(): J {
        throw new Error("Method not implemented.");
    }
}`,
});
