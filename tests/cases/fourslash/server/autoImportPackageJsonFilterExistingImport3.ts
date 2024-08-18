/// <reference path="../fourslash.ts" />

// @module: preserve

// @Filename: /node_modules/@types/node/index.d.ts
//// declare module "node:fs" {
////     export function readFile(): void;
////     export function writeFile(): void;
//// }

// @Filename: /package.json
//// {}

// @Filename: /index.ts
//// readFile/**/

goTo.marker("");
verify.importFixAtPosition([]);

goTo.bof();
edit.insertLine(`import { writeFile } from "node:fs";`);

goTo.marker("");
verify.importFixAtPosition([
`import { readFile, writeFile } from "node:fs";
readFile`
]);