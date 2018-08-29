/// <reference path="fourslash.ts" />

//// [|foo/*0*/();|]

// @Filename: folder_a/f2.ts
//// export function foo() {};

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "baseUrl": ".",
////         "paths": {
////             "a": [ "folder_a/f2" ]
////         }
////     }
//// }

verify.importFixAtPosition([
`import { foo } from "a";

foo();`
]);
