/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": "./a"
////    }
////}

// @Filename: /a/b/x.ts
////export function f1() { };

// @Filename: /a/b/y.ts
////[|f1/*0*/();|]

goTo.file("/a/b/y.ts");
// Order the local import first because it's simpler.
verify.importFixAtPosition([
`import { f1 } from "./x";

f1();`,
`import { f1 } from "b/x";

f1();`
]);
