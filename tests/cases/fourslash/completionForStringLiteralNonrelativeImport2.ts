/// <reference path='fourslash.ts' />

// Should not give duplicate entries for similarly named files with different extensions

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

// @Filename: ambient.ts
//// declare module "fake-module/other"

verify.completions({ marker: ["import_as0", "import_equals0", "require0"], exact: ["other", "repeated"], isNewIdentifierLocation: true });
