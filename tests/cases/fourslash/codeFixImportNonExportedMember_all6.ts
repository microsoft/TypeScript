/// <reference path="fourslash.ts" />

// @module: esnext
// @isolatedModules: true
// @filename: /a.ts
////type T1 = {};
////const a = 1;
////const b = 1;
////export { a };

// @filename: /b.ts
////type T2 = {};
////type T3 = {};
////export type { T2 };

// @filename: /c.ts
////import { b, T1 } from "./a";
////import { T3 } from "./b";

goTo.file("/c.ts");
verify.codeFixAll({
    fixId: "fixImportNonExportedMember",
    fixAllDescription: ts.Diagnostics.Export_all_referenced_locals.message,
    newFileContent: {
        "/a.ts":
`type T1 = {};
const a = 1;
const b = 1;
export { a, b, type T1 };`,
        "/b.ts":
`type T2 = {};
type T3 = {};
export type { T2, T3 };`,
    },
});
