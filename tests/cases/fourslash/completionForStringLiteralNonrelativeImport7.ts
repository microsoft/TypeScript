/// <reference path='fourslash.ts' />

// Should give completions for files that are discovered via the baseUrl compiler option

// @baseUrl: tests/cases/fourslash/modules

// @Filename: tests/test0.ts
//// import * as foo1 from "mod/*import_as0*/
//// import foo2 = require("mod/*import_equals0*/
//// var foo3 = require("mod/*require0*/

// @Filename: modules/module.ts
//// export var x = 5;

// @Filename: package.json
//// { "dependencies": { "module-from-node": "latest" } }
// @Filename: node_modules/module-from-node/index.ts
////

verify.completions({
    at: test.markerNames(),
    are: ["module", "module-from-node"],
    isNewIdentifierLocation: true,
});
