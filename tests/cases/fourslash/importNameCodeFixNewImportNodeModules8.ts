/// <reference path="fourslash.ts" />

//// [|f1/*0*/('');|]

// @Filename: package.json
//// { "dependencies": { "package-name": "latest" } }

// @Filename: node_modules/@scope/package-name/bin/lib/index.d.ts
//// export function f1(text: string): string;

// @Filename: node_modules/@scope/package-name/bin/lib/index.js
//// function f1(text) { }
//// exports.f1 = f1;

// @Filename: node_modules/@scope/package-name/package.json
//// {
////   "main": "bin/lib/index.js",
////   "types": "bin/lib/index.d.ts"
//// }

verify.importFixAtPosition([
`import { f1 } from "@scope/package-name";

f1('');`
]);
