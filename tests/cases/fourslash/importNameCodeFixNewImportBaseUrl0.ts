/// <reference path="fourslash.ts" />

//// [|f1/*0*/();|]

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "baseUrl": "./a",
        "ignoreDeprecations": "6.0"
////     }
//// }

// @Filename: a/b.ts
//// export function f1() { };

verify.importFixAtPosition([
`import { f1 } from "b";

f1();`,
]);
