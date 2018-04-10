/// <reference path='fourslash.ts' />

// Should handle nested files in folders discovered via the baseUrl compiler option

// @baseUrl: tests/cases/fourslash/modules

// @Filename: tests/test0.ts
//// import * as foo1 from "subfolder//*import_as0*/
//// import foo2 = require("subfolder//*import_equals0*/
//// var foo3 = require("subfolder//*require0*/

//// import * as foo1 from "module-from-node//*import_as1*/
//// import foo2 = require("module-from-node//*import_equals1*/
//// var foo3 = require("module-from-node//*require1*/

// @Filename: modules/subfolder/module.ts
//// export var x = 5;

// @Filename: package.json
//// { "dependencies": { "module-from-node": "latest" } }
// @Filename: node_modules/module-from-node/index.ts
//// /*module1*/

const kinds = ["import_as", "import_equals", "require"];
verify.completions(
    {
        at: kinds.map(k => `${k}0`),
        are: "module",
        isNewIdentifierLocation: true,
    },
    {
        at: kinds.map(k => `${k}1`),
        are: "index",
        isNewIdentifierLocation: true,
    },
)
