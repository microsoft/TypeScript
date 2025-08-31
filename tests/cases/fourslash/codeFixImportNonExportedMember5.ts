/// <reference path="fourslash.ts" />

// @moduleResolution: bundler
// @module: esnext
// @filename: /node_modules/foo/index.js
////function bar() {}

// @filename: /b.ts
////import { bar } from "./foo";

goTo.file("/b.ts");
verify.not.codeFixAvailable("fixImportNonExportedMember");
