/// <reference path='fourslash.ts' />

// @Filename: dir1/dir2/dir3/dir4/test0.ts
//// import * as foo1 from "f/*import_as0*/
//// import * as foo2 from "a/*import_as1*/
//// import * as foo3 from "fake-module/*import_as2*/

//// import foo4 = require("f/*import_equals0*/
//// import foo5 = require("a/*import_equals1*/
//// import foo6 = require("fake-module/*import_equals2*/

//// var foo7 = require("f/*require0*/
//// var foo8 = require("a/*require1*/
//// var foo9 = require("fake-module/*require2*/

// @Filename: package.json
//// { "dependencies": { "fake-module": "latest" } }
// @Filename: node_modules/fake-module/ts.ts
//// /*module1*/

// @Filename: dir1/package.json
//// { "dependencies": { "fake-module2": "latest" } }
// @Filename: dir1/node_modules/fake-module2/index.ts
//// declare module "ambient-module-test" {}

// @Filename: dir1/dir2/dir3/package.json
//// { "dependencies": { "fake-module3": "latest" } }
// @Filename: dir1/dir2/dir3/node_modules/fake-module3/ts.ts
//// /*module3*/

const kinds = ["import_as", "import_equals", "require"];

for (const kind of kinds) {
    goTo.marker(kind + "0");

    verify.importModuleCompletionListContains("fake-module/");
    verify.importModuleCompletionListContains("fake-module2");
    verify.importModuleCompletionListContains("fake-module3/");
    verify.not.importModuleCompletionListItemsCountIsGreaterThan(3);

    goTo.marker(kind + "1");

    verify.importModuleCompletionListContains("ambient-module-test");
    verify.not.importModuleCompletionListItemsCountIsGreaterThan(1);

    goTo.marker(kind + "2");

    verify.importModuleCompletionListContains("fake-module/");
    verify.importModuleCompletionListContains("fake-module2");
    verify.importModuleCompletionListContains("fake-module3/");
    verify.not.importModuleCompletionListItemsCountIsGreaterThan(3);
}