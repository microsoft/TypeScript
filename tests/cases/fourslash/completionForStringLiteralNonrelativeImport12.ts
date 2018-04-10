/// <reference path='fourslash.ts' />

// Should give completions for all dependencies in package.json

// @Filename: tests/test0.ts
//// import * as foo1 from "m/*import_as0*/
//// import foo2 = require("m/*import_equals0*/
//// var foo3 = require("m/*require0*/

// @Filename: package.json
//// {
////     "dependencies": { "module": "latest" },
////     "devDependencies": { "dev-module": "latest" },
////     "optionalDependencies": { "optional-module": "latest" },
////     "peerDependencies": { "peer-module": "latest" }
//// }

verify.completions({
    at: test.markerNames(),
    are: ["module", "dev-module", "peer-module", "optional-module"],
    isNewIdentifierLocation: true,
});
