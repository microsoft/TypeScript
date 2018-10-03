/// <reference path="fourslash.ts" />

// @Filename: /src/a.ts
////[|foo|]

// @Filename: /src/thisHasPathMapping.ts
////export function foo() {};

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
////        "paths": {
////            "foo": ["src/thisHasPathMapping.ts"]
////        }
////    }
////}

verify.importFixAtPosition([
`import { foo } from "foo";

foo`
]);
