/// <reference path='fourslash.ts' />

// @Filename: tests/test0.ts
//// import * as foo from "module-/*0*/

// @Filename: package.json
//// { "dependencies": {
////    "module-no-main": "latest",
////    "module-no-main-index-d-ts": "latest",
////    "module-index-ts": "latest",
////    "module-index-d-ts-explicit-main": "latest",
////    "module-index-d-ts-default-main": "latest",
////    "module-typings": "latest"
//// } }

// @Filename: node_modules/module-no-main/package.json
//// { }

// @Filename: node_modules/module-no-main-index-d-ts/package.json
//// { }
// @Filename: node_modules/module-no-main-index-d-ts/index.d.ts
//// /*module-no-main-index-d-ts*/

// @Filename: node_modules/module-index-ts/package.json
//// { }
// @Filename: node_modules/module-index-ts/index.ts
//// /*module-index-ts*/

// @Filename: node_modules/module-index-d-ts-explicit-main/package.json
//// { "main":"./notIndex.js" }
// @Filename: node_modules/module-index-d-ts-explicit-main/notIndex.js
//// /*module-index-d-ts-explicit-main*/
// @Filename: node_modules/module-index-d-ts-explicit-main/index.d.ts
//// /*module-index-d-ts-explicit-main2*/

// @Filename: node_modules/module-index-d-ts-default-main/package.json
//// { }
// @Filename: node_modules/module-index-d-ts-default-main/index.js
//// /*module-index-d-ts-default-main*/
// @Filename: node_modules/module-index-d-ts-default-main/index.d.ts
//// /*module-index-d-ts-default-main2*/

// @Filename: node_modules/module-typings/package.json
//// { "typings":"./types.d.ts" }
// @Filename: node_modules/module-typings/types.d.ts
//// /*module-typings*/


goTo.marker("0");

verify.completionListContains("module-no-main/");
verify.completionListContains("module-no-main-index-d-ts/");
verify.completionListContains("module-index-ts");
verify.completionListContains("module-index-d-ts-explicit-main");
verify.completionListContains("module-index-d-ts-default-main");
verify.completionListContains("module-typings");
verify.not.completionListItemsCountIsGreaterThan(6);
