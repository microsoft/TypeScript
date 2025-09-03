/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": "./a",
        "ignoreDeprecations": "6.0"
////    }
////}

// @Filename: /a/b/x.ts
////export function f1() { };

// @Filename: /a/c/y.ts
////[|f1/*0*/();|]

goTo.file("/a/c/y.ts");
// Order the baseUrl import first, because the relative import climbs up to the base url.
verify.importFixAtPosition([
`import { f1 } from "b/x";

f1();`,
]);

verify.importFixAtPosition([
`import { f1 } from "../b/x";

f1();`,
], /*errorCode*/ undefined, {
    importModuleSpecifierPreference: "relative",
});

