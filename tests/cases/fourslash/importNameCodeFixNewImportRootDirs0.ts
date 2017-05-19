/// <reference path="fourslash.ts" />

// @Filename: a/f1.ts
//// [|foo/*0*/();|]

// @Filename: b/c/f2.ts
//// export function foo() {};

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "rootDirs": [
////             "a",
////             "b/c"
////         ]
////     }
//// }

verify.importFixAtPosition([
`import { foo } from "./f2";

foo();`
]);
