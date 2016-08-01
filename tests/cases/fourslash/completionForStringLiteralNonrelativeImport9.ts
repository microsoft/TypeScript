/// <reference path='fourslash.ts' />

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "baseUrl": "./modules",
////         "paths": {
////             "module1": ["some/path/whatever.ts"],
////             "module2": ["some/other/path.ts"]
////         }
////     }
//// }


// @Filename: tests/test0.ts
//// import * as foo1 from "m/*import_as0*/
//// import foo2 = require("m/*import_equals0*/
//// var foo3 = require("m/*require0*/

// @Filename: some/path/whatever.ts
//// export var x = 9;

// @Filename: some/other/path.ts
//// export var y = 10;


const kinds = ["import_as", "import_equals", "require"];

for (const kind of kinds) {
    goTo.marker(kind + "0");
    verify.importModuleCompletionListContains("module1");
    verify.importModuleCompletionListContains("module2");
    verify.not.importModuleCompletionListItemsCountIsGreaterThan(2);
}
