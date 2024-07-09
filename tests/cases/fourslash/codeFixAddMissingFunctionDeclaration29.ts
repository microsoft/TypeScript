/// <reference path='fourslash.ts' />

// @filename: /a.ts
////export namespace A {
////    export function test() {}
////};

// @filename: /b.ts
////import { A } from "./a";
////
////A.fn();

goTo.file("/b.ts");
verify.codeFix({
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "fn"],
    index: 0,
    newFileContent: {
        "/a.ts":
`export namespace A {
    export function test() {}

    export function fn() {
        throw new Error("Function not implemented.");
    }
};`,
    }
});
