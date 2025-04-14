/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
////const a = 1;
////export const foo = 1;

// @filename: /b.ts
////const b = 1;
////export const bar = 1;

// @filename: /c.ts
////import { a } from "./a";
////import { b } from "./b";

goTo.file("/c.ts");
verify.codeFixAll({
    fixId: "fixImportNonExportedMember",
    fixAllDescription: ts.Diagnostics.Export_all_referenced_locals.message,
    newFileContent: {
        "/a.ts":
`export const a = 1;
export const foo = 1;`,
        "/b.ts":
`export const b = 1;
export const bar = 1;`
    },
});
