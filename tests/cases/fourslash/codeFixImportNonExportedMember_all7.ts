/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
////type T1 = {};
////type T2 = {};
////type T3 = {};
////const a = 1;
////export { a, type T1 };

// @filename: /b.ts
////import { T2, T3 } from "./a";

goTo.file("/b.ts");
verify.codeFixAll({
    fixId: "fixImportNonExportedMember",
    fixAllDescription: ts.Diagnostics.Export_all_referenced_locals.message,
    newFileContent: {
        "/a.ts":
`type T1 = {};
type T2 = {};
type T3 = {};
const a = 1;
export { a, type T1, type T2, type T3 };`,
    },
});
