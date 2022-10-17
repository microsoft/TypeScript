/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
/////**
//// * foo
//// */
////function foo() {}
////export {};

// @filename: /b.ts
////import { foo } from "./a";

goTo.file("/b.ts");
verify.codeFix({
    description: [ts.Diagnostics.Export_0_from_module_1.message, "foo", "./a"],
    index: 0,
    newFileContent: {
        "/a.ts":
`/**
 * foo
 */
function foo() {}
export { foo };`,
    }
});
