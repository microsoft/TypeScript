/// <reference path="fourslash.ts" />

// @module: esnext
// @isolatedModules: true
// @filename: /a.ts
////type T1 = {};
////type T2 = {};
////export type { T1 };

// @filename: /b.ts
////import { T2 } from "./a";

goTo.file("/b.ts");
verify.codeFix({
    description: [ts.Diagnostics.Export_0_from_module_1.message, "T2", "./a"],
    index: 0,
    newFileContent: {
        "/a.ts":
`type T1 = {};
type T2 = {};
export type { T1, T2 };`,
    }
});
