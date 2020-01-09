/// <reference path="fourslash.ts" />

// @Filename: /a.d.ts
////declare function a(): void;
////declare namespace a {
////    export interface b {}
////}
////export = a;

// @Filename: /b.ts
////a;
////let x: b;

goTo.file("/b.ts");
verify.codeFixAll({
    fixId: "fixMissingImport",
    fixAllDescription: "Add all missing imports",
    newFileContent:
`import a = require("./a");

import type { b } from "./a";

a;
let x: b;`,
});
