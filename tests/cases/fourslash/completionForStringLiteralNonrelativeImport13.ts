/// <reference path='fourslash.ts' />

// Should give completions based on typesVersions

// @Filename: node_modules/ext/package.json
//// {
////     "name": "ext",
////     "version": "1.0.0",
////     "types": "index",
////     "typesVersions": {
////         ">=3.1.0-0": { "*" : ["ts3.1/*"] }
////     }
//// }

// @Filename: node_modules/ext/index.d.ts
//// export {};

// @Filename: node_modules/ext/aaa.d.ts
//// export {};

// @Filename: node_modules/ext/ts3.1/index.d.ts
//// export {};

// @Filename: node_modules/ext/ts3.1/zzz.d.ts
//// export {};

// @Filename: main.ts
//// import * as ext1 from "ext//*import_as0*/
//// import ext2 = require("ext//*import_equals0*/
//// var ext2 = require("ext//*require0*/

verify.completions({
    marker: test.markerNames(),
    exact: ["index", "zzz"],
    isNewIdentifierLocation: true,
});
