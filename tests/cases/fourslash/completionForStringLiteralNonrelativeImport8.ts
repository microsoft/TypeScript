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
//// import * as foo1 from "0/*import_as0*/
//// import foo2 = require("0/*import_equals0*/
//// var foo3 = require("0/*require0*/

//// import * as foo1 from "1/*import_as1*/
//// import foo2 = require("1/*import_equals1*/
//// var foo3 = require("1/*require1*/

//// import * as foo1 from "2/*import_as2*/
//// import foo2 = require("2/*import_equals2*/
//// var foo3 = require("2/*require2*/


// @Filename: modules/prefix/00test/suffix.ts
//// export var x = 5;

// @Filename: modules/prefix-only/1test.ts
//// export var y = 5;

// @Filename: modules/2test/suffix-only.ts
//// export var z = 5;


const kinds = ["import_as", "import_equals", "require"];

for (const kind of kinds) {
    goTo.marker(kind + "0");
    verify.completionListContains("0test");

    goTo.marker(kind + "1");
    verify.completionListContains("1test");

    goTo.marker(kind + "2");
    verify.completionListContains("2test", undefined, undefined, undefined, undefined, undefined, { allowDuplicate: true }); // TODO: GH#20042
}
