/// <reference path='fourslash.ts' />

// @filename: a.ts
////export interface I {
////    a(): void;
////    b(x: "x", y: "a" | "b"): "b";
////
////    c: "c";
////    d: { e: "e"; };
////}
// @filename: b.ts
////import { I } from "./a";
////class Foo implements I {}

goTo.file("b.ts")
verify.codeFix({
    description: [ts.Diagnostics.Implement_interface_0.message, "I"],
    index: 0,
    newFileContent:
`import { I } from "./a";
class Foo implements I {
    a(): void {
        throw new Error("Method not implemented.");
    }
    b(x: "x", y: "a" | "b"): "b" {
        throw new Error("Method not implemented.");
    }
    c: "c";
    d: { e: "e"; };
}`,
    preferences: { quotePreference: "auto" }
});
