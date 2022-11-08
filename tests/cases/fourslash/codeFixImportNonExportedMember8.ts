/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
////const a = 1;
////type T = number;
////export { a };

// @filename: /b.ts
////import { T } from "./a";

goTo.file("/b.ts");
verify.codeFix({
    description: [ts.Diagnostics.Export_0_from_module_1.message, "T", "./a"],
    index: 0,
    newFileContent: {
        "/a.ts":
`const a = 1;
type T = number;
export { a, T };`,
    }
});
