/// <reference path="fourslash.ts" />

//// [|f1/*0*/('');|]

// @Filename: package.json
//// { "dependencies": { "package-name": "0.0.1" } }

// @Filename: node_modules/package-name/bin/lib/libfile.d.ts
//// export declare function f1(text: string): string;

// @Filename: node_modules/package-name/bin/lib/libfile.js
//// function f1(text) {}
//// exports.f1 = f1;

// @Filename: node_modules/package-name/package.json
//// { "main": "bin/lib/libfile.js" }


// In this case, importing the module by its package name:
// import { f1 } from 'package-name'
// could in theory work, however the resulting code compiles with a module resolution error
// since bin/lib/libfile.d.ts isn't declared under "typings" in package.json
// Therefore just import the module by its qualified path

verify.importFixAtPosition([
`import { f1 } from "package-name/bin/lib/libfile";

f1('');`
]);