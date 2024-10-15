/// <reference path="../fourslash.ts" />

// @module: preserve

// @Filename: /home/src/workspaces/project/node_modules/@types/node/index.d.ts
//// declare module "node:fs" {
////     export function readFile(): void;
////     export function writeFile(): void;
//// }

// @Filename: /home/src/workspaces/project/package.json
//// {}

// @Filename: /home/src/workspaces/project/index.ts
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