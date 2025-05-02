/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
////declare function foo(): any;
////declare function bar(): any;
////export declare function baz(): any;

// @filename: /b.ts
////import { foo, bar } from "./a";

goTo.file("/b.ts");
verify.codeFixAll({
    fixId: "fixImportNonExportedMember",
    fixAllDescription: ts.Diagnostics.Export_all_referenced_locals.message,
    newFileContent: {
        "/a.ts":
`export declare function foo(): any;
export declare function bar(): any;
export declare function baz(): any;`
    },
});
