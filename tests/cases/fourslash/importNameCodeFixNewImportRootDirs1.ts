/// <reference path="fourslash.ts" />

// @Filename: a/f1.ts
//// [|foo/*0*/();|]

// @Filename: a/b/index.ts
//// export function foo() {};

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "rootDirs": [
////             "a"
////         ]
////     }
//// }

verify.importFixAtPosition([
`import { foo } from "./b";

foo();`
]);
