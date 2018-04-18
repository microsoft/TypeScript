/// <reference path='fourslash.ts' />

// Should give completions for js files in node modules when allowJs is set to true

// @allowJs: true

// @Filename: tests/test0.ts
//// import * as foo1 from "fake-module//*import_as0*/
//// import foo2 = require("fake-module//*import_equals0*/
//// var foo3 = require("fake-module//*require0*/

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

verify.completionsAt(["import_as0", "import_equals0", "require0"], ["dts", "js", "jsx", "repeated", "ts", "tsx"], { isNewIdentifierLocation: true });
