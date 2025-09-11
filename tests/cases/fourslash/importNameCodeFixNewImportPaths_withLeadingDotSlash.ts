/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////[|foo|]

// @Filename: /thisHasPathMapping.ts
////export function foo() {};

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
        "ignoreDeprecations": "6.0",
////        "paths": {
////            "foo": ["././thisHasPathMapping"]
////        }
////    }
////}

verify.importFixAtPosition([
`import { foo } from "foo";

foo`
]);
