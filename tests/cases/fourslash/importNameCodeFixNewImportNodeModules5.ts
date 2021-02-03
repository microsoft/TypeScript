/// <reference path="fourslash.ts" />

//// [|f1/*0*/('');|]

// @Filename: package.json
//// { "dependencies": { "package-name": "latest" } }

// @Filename: node_modules/package-name/node_modules/package-name2/bin/lib/libfile.d.ts
//// export function f1(text: string): string;

// @Filename: node_modules/package-name/node_modules/package-name2/bin/lib/libfile.js
//// function f1(text) { }
//// exports.f1 = f1;

// @Filename: node_modules/package-name/node_modules/package-name2/package.json
//// {
////   "main": "bin/lib/libfile.js",
////   "types": "bin/lib/libfile.d.ts"
//// }

verify.codeFixAvailable([
    { description: "Add missing function declaration 'f1'" }
]);
