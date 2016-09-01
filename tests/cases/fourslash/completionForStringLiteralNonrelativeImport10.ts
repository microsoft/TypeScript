/// <reference path='fourslash.ts' />

// Should not give node module completions if classic module resolution is enabled

// @moduleResolution: classic

// @Filename: dir1/dir2/dir3/dir4/test0.ts
//// import * as foo1 from "f/*import_as0*/
//// import * as foo3 from "fake-module/*import_as1*/

//// import foo4 = require("f/*import_equals0*/
//// import foo6 = require("fake-module/*import_equals1*/

//// var foo7 = require("f/*require0*/
//// var foo9 = require("fake-module/*require1*/

// @Filename: package.json
//// { "dependencies": { "fake-module": "latest" } }
// @Filename: node_modules/fake-module/ts.ts
//// /*module1*/

// @Filename: dir1/dir2/dir3/package.json
//// { "dependencies": { "fake-module3": "latest" } }
// @Filename: dir1/dir2/dir3/node_modules/fake-module3/ts.ts
//// /*module3*/

const kinds = ["import_as", "import_equals", "require"];

for (const kind of kinds) {
    goTo.marker(kind + "0");
    verify.completionListIsEmpty();

    goTo.marker(kind + "1");
    verify.completionListIsEmpty();
}