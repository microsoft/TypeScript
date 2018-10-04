/// <reference path="fourslash.ts" />

//// [|foo/*0*/();|]

// @Filename: folder_b/f2.ts
//// export function foo() {};

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "baseUrl": ".",
////         "paths": {
////             "b/*": [ "folder_b/*" ]
////         }
////     }
//// }

verify.importFixAtPosition([
`import { foo } from "b/f2";

foo();`
]);
