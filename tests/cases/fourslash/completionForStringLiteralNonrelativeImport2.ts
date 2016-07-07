/// <reference path='fourslash.ts' />

// @Filename: tests/test0.ts
//// import * as foo1 from "fake-module//*import_as0*/
//// import foo2 = require("fake-module//*import_equals0*/
//// var foo3 = require("fake-module//*require0*/

// @Filename: package.json
//// { "dependencies": { "fake-module": "latest" }, "devDependencies": { "fake-module-dev": "latest" } }

// @Filename: node_modules/fake-module/repeated.ts
//// /*repeatedts*/
// @Filename: node_modules/fake-module/repeated.tsx
//// /*repeatedtsx*/
// @Filename: node_modules/fake-module/repeated.d.ts
//// /*repeateddts*/
// @Filename: node_modules/fake-module/other.js
//// /*other*/
// @Filename: node_modules/fake-module/other2.js
//// /*other2*/

// @Filename: node_modules/unlisted-module/index.js
//// /*unlisted-module*/

// @Filename: node_modules/@types/fake-module/other.d.ts
//// declare module "fake-module/other" {}

// @Filename: node_modules/@types/unlisted-module/index.d.ts
//// /*unlisted-types*/

const kinds = ["import_as", "import_equals", "require"];

for (const kind of kinds) {
    goTo.marker(kind + "0");
    verify.completionListContains("repeated");
    verify.completionListContains("other");
    verify.not.completionListItemsCountIsGreaterThan(2);
}
