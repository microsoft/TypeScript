/// <reference path="fourslash.ts" />

// @module: esnext
// @isolatedModules: true
// @filename: /a.ts
////type T = {};
////export {};

// @filename: /b.ts
////import { T } from "./a";

goTo.file("/b.ts");
verify.codeFix({
    description: [ts.Diagnostics.Export_0_from_module_1.message, "T", "./a"],
    index: 0,
    newFileContent: {
        "/a.ts":
`type T = {};
export { type T };`,
    }
});
