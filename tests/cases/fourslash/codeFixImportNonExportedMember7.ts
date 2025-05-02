/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
////const a = 1
////const b = 1;
////export { a, b };
////
////type T2 = number;
////type T1 = number;
////export type { T1 };

// @filename: /b.ts
////import { T2 } from "./a";

goTo.file("/b.ts");
verify.codeFix({
    description: [ts.Diagnostics.Export_0_from_module_1.message, "T2", "./a"],
    index: 0,
    newFileContent: {
        "/a.ts":
`const a = 1
const b = 1;
export { a, b };

type T2 = number;
type T1 = number;
export type { T1, T2 };`,
    }
});
