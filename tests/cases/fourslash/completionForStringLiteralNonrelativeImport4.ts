/// <reference path='fourslash.ts' />

// @Filename: dir1/dir2/dir3/dir4/test0.ts
//// import * as foo from "f/*0*/

// @Filename: dir1/dir2/dir3/dir4/test1.ts
//// import * as foo from "a/*1*/

// @Filename: dir1/dir2/dir3/dir4/test2.ts
//// import * as foo from "fake-module/*2*/

// @Filename: package.json
//// { "dependencies": { "fake-module": "latest" } }
// @Filename: node_modules/fake-module/ts.ts
//// /*module1*/

// @Filename: dir1/package.json
//// { "dependencies": { "fake-module2": "latest" } }
// @Filename: dir1/node_modules/@types/fake-module2/js.d.ts
//// declare module "ambient-module-test" {}

// @Filename: dir1/dir2/dir3/package.json
//// { "dependencies": { "fake-module3": "latest" } }
// @Filename: dir1/dir2/dir3/node_modules/fake-module3/ts.ts
//// /*module3*/


goTo.marker("0");

verify.completionListContains("fake-module/");
verify.completionListContains("fake-module2/");
verify.completionListContains("fake-module3/");
verify.not.completionListItemsCountIsGreaterThan(3);

goTo.marker("1");

verify.completionListContains("ambient-module-test");
verify.not.completionListItemsCountIsGreaterThan(1);

goTo.marker("2");

verify.completionListContains("fake-module/");
verify.completionListContains("fake-module2/");
verify.completionListContains("fake-module3/");
verify.not.completionListItemsCountIsGreaterThan(3);
