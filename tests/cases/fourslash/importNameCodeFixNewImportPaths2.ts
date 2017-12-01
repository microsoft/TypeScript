/// <reference path="fourslash.ts" />

//// [|foo/*0*/();|]

// @Filename: folder_b/index.ts
//// export function foo() {};

// @Filename: tsconfig.path.json
//// {
////     "compilerOptions": {
////         "baseUrl": ".",
////         "paths": {
////             "b": [ "folder_b/index" ]
////         }
////     }
//// }

// @Filename: tsconfig.json
//// {
////     "extends": "./tsconfig.path",
////     "compilerOptions": { }
//// }

verify.importFixAtPosition([
`import { foo } from "b";

foo();`
]);
