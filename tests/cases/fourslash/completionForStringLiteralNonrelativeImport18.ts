/// <reference path='fourslash.ts' />

// Should give completions for modules referenced via baseUrl and paths compiler options with explicit name mappings

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////        "paths": {
////            "/*": ["./*"]
////        },
////     }
//// }

// @Filename: test0.ts
//// import * as foo1 from "/path/w/*first*/

// @Filename: path/whatever.ts
//// export {}

verify.completions({ marker: ["first"], exact: ["whatever"], isNewIdentifierLocation: true });
