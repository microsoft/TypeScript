/// <reference path='fourslash.ts' />

// Should give completions for node modules and files within those modules with ts file extensions

// @Filename: tests/test0.ts
//// import * as foo1 from "f/*import_as0*/
//// import * as foo2 from "fake-module//*import_as1*/
//// import * as foo3 from "fake-module/*import_as2*/

//// import foo4 = require("f/*import_equals0*/
//// import foo5 = require("fake-module//*import_equals1*/
//// import foo6 = require("fake-module/*import_equals2*/

//// var foo7 = require("f/*require0*/
//// var foo8 = require("fake-module//*require1*/
//// var foo9 = require("fake-module/*require2*/

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

const kinds = ["import_as", "import_equals", "require"];

for (const kind of kinds) {
    goTo.marker(kind + "0");
    verify.completionListContains("fake-module");
    verify.completionListContains("fake-module-dev");
    verify.not.completionListItemsCountIsGreaterThan(2);

    goTo.marker(kind + "1");
    verify.completionListContains("index");
    verify.completionListContains("ts");
    verify.completionListContains("dts");
    verify.completionListContains("tsx");
    verify.not.completionListItemsCountIsGreaterThan(4);

    goTo.marker(kind + "2");
    verify.completionListContains("fake-module");
    verify.completionListContains("fake-module-dev");
    verify.not.completionListItemsCountIsGreaterThan(2);
}