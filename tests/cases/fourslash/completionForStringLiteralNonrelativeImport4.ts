/// <reference path='fourslash.ts' />

// Should give completions for all node modules visible to the script

// @Filename: dir1/dir2/dir3/dir4/test0.ts
//// import * as foo1 from "f/*import_as0*/
//// import foo4 = require("f/*import_equals0*/
//// var foo7 = require("f/*require0*/

// @Filename: package.json
//// { "dependencies": { "fake-module": "latest" } }
// @Filename: node_modules/fake-module/ts.ts
//// /*module1*/

// @Filename: dir1/package.json
//// { "dependencies": { "fake-module2": "latest" } }
// @Filename: dir1/node_modules/fake-module2/index.ts
//// /*module2*/

// @Filename: dir1/dir2/dir3/package.json
//// { "dependencies": { "fake-module3": "latest" } }
// @Filename: dir1/dir2/dir3/node_modules/fake-module3/ts.ts
//// /*module3*/

const kinds = ["import_as", "import_equals", "require"];

for (const kind of kinds) {
    goTo.marker(kind + "0");

    verify.completionListContains("fake-module");
    verify.completionListContains("fake-module2");
    verify.completionListContains("fake-module3");
    verify.not.completionListItemsCountIsGreaterThan(3);
}