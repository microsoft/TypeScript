/// <reference path="fourslash.ts" />

// @Filename: a/f1.ts
//// [|foo/*0*/();|]

// @Filename: types/random/index.ts
//// export function foo() {};

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "typeRoots": [
////             "./types"
////         ]
////     }
//// }

verify.importFixAtPosition([
`import { foo } from "random";

foo();`
]);
