/// <reference path='fourslash.ts' />

// @Filename: tests/test0.ts
//// import * as foo from "f/*0*/

// @Filename: tests/test1.ts
//// import * as foo from "fake-module//*1*/

// @Filename: tests/test2.ts
//// import * as foo from "fake-module/*2*/

// @Filename: package.json
//// { "dependencies": { "fake-module": "latest" }, "devDependencies": { "fake-module-dev": "latest" } }

// @Filename: node_modules/fake-module/index.js
//// /*fake-module*/
// @Filename: node_modules/fake-module/index.d.ts
//// /*fakemodule-d-ts*/
// @Filename: node_modules/fake-module/ts.ts
//// /*ts*/
// @Filename: node_modules/fake-module/dts.d.ts
//// /*dts*/
// @Filename: node_modules/fake-module/tsx.tsx
//// /*tsx*/
// @Filename: node_modules/fake-module/js.js
//// /*js*/
// @Filename: node_modules/fake-module/jsx.jsx
//// /*jsx*/

// @Filename: node_modules/fake-module-dev/index.js
//// /*fakemodule-dev*/
// @Filename: node_modules/fake-module-dev/index.d.ts
//// /*fakemodule-dev-d-ts*/

// @Filename: node_modules/unlisted-module/index.ts
//// /*unlisted-module*/

goTo.marker("0");
verify.completionListContains("fake-module");
verify.completionListContains("fake-module-dev");
verify.not.completionListItemsCountIsGreaterThan(2);

goTo.marker("1");
verify.completionListContains("index");
verify.completionListContains("ts");
verify.completionListContains("dts");
verify.completionListContains("tsx");
verify.not.completionListItemsCountIsGreaterThan(4);

goTo.marker("2");
verify.completionListContains("fake-module");
verify.completionListContains("fake-module-dev");
verify.not.completionListItemsCountIsGreaterThan(2);