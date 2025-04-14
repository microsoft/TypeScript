/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.d.ts
////declare function foo(): any;
////declare function bar(): any;

// @filename: /b.ts
////import { bar } from "./a";

goTo.file("/b.ts");
verify.not.codeFixAvailable("fixImportNonExportedMember");
