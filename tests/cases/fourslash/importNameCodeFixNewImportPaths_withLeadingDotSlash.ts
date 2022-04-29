/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////[|foo|]

// @Filename: /thisHasPathMapping.ts
////export function foo() {};

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
////        "paths": {
////            "foo": ["././thisHasPathMapping"]
////        }
////    }
////}

verify.importFixAtPosition([
`import { foo } from "foo";

foo`
]);
