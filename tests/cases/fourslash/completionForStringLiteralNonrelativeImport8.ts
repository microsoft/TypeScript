/// <reference path='fourslash.ts' />

// Should give completions for modules referenced via baseUrl and paths compiler options with wildcards

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "baseUrl": "./modules",
////         "paths": {
////             "*": [
////                 "prefix/0*/suffix.ts",
////                 "prefix-only/*",
////                 "*/suffix-only.ts"
////             ]
////         }
////     }
//// }


// @Filename: tests/test0.ts
//// import * as foo1 from "f/*import_as0*/
//// import foo2 = require("f/*import_equals0*/
//// var foo3 = require("f/*require0*/

//// import * as foo1 from "f/*import_as1*/
//// import foo2 = require("f/*import_equals1*/
//// var foo3 = require("f/*require1*/

//// import * as foo1 from "f/*import_as2*/
//// import foo2 = require("f/*import_equals2*/
//// var foo3 = require("f/*require2*/


// @Filename: modules/prefix/00test/suffix.ts
//// export var x = 5;

// @Filename: modules/prefix-only/1test.ts
//// export var y = 5;

// @Filename: modules/2test/suffix-only.ts
//// export var z = 5;

verify.completions({
    at: test.markerNames(),
    are: ["prefix", "prefix-only", "2test", "0test", "1test"],
    isNewIdentifierLocation: true,
});
