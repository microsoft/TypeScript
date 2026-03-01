/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
////let a = 1, b = 1;
////let c = 1, d = 1;
////export const e = 1;

// @filename: /b.ts
////import { b, d } from "./a";

goTo.file("/b.ts");
verify.codeFixAll({
    fixId: "fixImportNonExportedMember",
    fixAllDescription: ts.Diagnostics.Export_all_referenced_locals.message,
    newFileContent: {
        "/a.ts":
`let a = 1, b = 1;
let c = 1, d = 1;
export const e = 1;

export { b, d };
`
    },
});
