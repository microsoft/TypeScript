/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
////let a = 1, b = 1;
////type T = number;
////export type { T };

// @filename: /b.ts
////import { b } from "./a";

goTo.file("/b.ts");
verify.codeFix({
    description: [ts.Diagnostics.Export_0_from_module_1.message, "b", "./a"],
    index: 0,
    newFileContent: {
        "/a.ts":
`let a = 1, b = 1;
type T = number;
export type { T };

export { b };
`,
    }
});
