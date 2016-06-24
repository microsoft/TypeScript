/// <reference path='fourslash.ts' />
// @allowJs: true

// @Filename: tests/test0.ts
//// import * as foo from "fake-module//*0*/

// @Filename: package.json
//// { "dependencies": { "fake-module": "latest" } }

// @Filename: node_modules/fake-module/ts.ts
//// /*ts*/
// @Filename: node_modules/fake-module/tsx.tsx
//// /*tsx*/
// @Filename: node_modules/fake-module/dts.d.ts
//// /*dts*/
// @Filename: node_modules/fake-module/js.js
//// /*js*/
// @Filename: node_modules/fake-module/jsx.jsx
//// /*jsx*/
// @Filename: node_modules/fake-module/repeated.js
//// /*repeatedjs*/
// @Filename: node_modules/fake-module/repeated.jsx
//// /*repeatedjsx*/

goTo.marker("0");

verify.completionListContains("ts");
verify.completionListContains("tsx");
verify.completionListContains("dts");
verify.not.completionListItemsCountIsGreaterThan(3);
