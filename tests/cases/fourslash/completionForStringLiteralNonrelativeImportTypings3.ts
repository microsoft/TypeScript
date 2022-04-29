/// <reference path='fourslash.ts' />

// Should give completions for typings discovered in all visible @types directories

// @Filename: subdirectory/test0.ts
//// /// <reference types="m/*types_ref0*/" />
//// import * as foo1 from "m/*import_as0*/
//// import foo2 = require("m/*import_equals0*/
//// var foo3 = require("m/*require0*/

// @Filename: subdirectory/node_modules/@types/module-x/index.d.ts
//// export var x = 9;
// @Filename: subdirectory/package.json
//// { "dependencies": { "@types/module-x": "latest" } }

// @Filename: node_modules/@types/module-y/index.d.ts
//// export var y = 9;
// @Filename: package.json
//// { "dependencies": { "@types/module-y": "latest" } }

verify.completions({
    marker: ["types_ref0", "import_as0", "import_equals0", "require0"],
    exact: ["module-x", "module-y"],
    isNewIdentifierLocation: true,
});
