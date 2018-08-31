/// <reference path="fourslash.ts" />

// @Filename: a/f1.ts
//// [|foo/*0*/();|]

// @Filename: types/random/index.ts
//// export function foo() {};

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "baseUrl": ".",
////         "typeRoots": [
////             "./types"
////         ]
////     }
//// }

// "typeRoots" does not affect module resolution, though "baseUrl" does. Importing from "random" would be a compile error.
verify.importFixAtPosition([
`import { foo } from "types/random";

foo();`,
]);
