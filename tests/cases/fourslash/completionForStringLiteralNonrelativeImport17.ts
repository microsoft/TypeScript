/// <reference path='fourslash.ts' />

// Should give completions for modules referenced via baseUrl and paths compiler options with explicit name mappings

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "paths": {
////             "module1/*": ["some/path/*"],
////         }
////     }
//// }

// @Filename: test0.ts
//// import * as foo1 from "module1/w/*first*/

// @Filename: some/path/whatever.ts
//// export {}

verify.completions({ marker: ["first"], exact: "whatever", isNewIdentifierLocation: true });
