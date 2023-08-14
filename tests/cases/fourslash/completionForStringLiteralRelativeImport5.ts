/// <reference path='fourslash.ts' />

// Should give correct completions for directories when invoked from within nested folders

// @rootDirs: /repo/src,/repo/generated

// @Filename: /dir/secret_file.ts
//// /*secret_file*/

// @Filename: /repo/src/dir/test.ts
//// import * as foo1 from ".//*import_as*/
//// import foo2 = require(".//*import_equals*/
//// var foo3 = require(".//*require*/

// @Filename: /repo/generated/dir/f.ts
//// /*f*/

verify.completions(
    {
        marker: ["import_as", "import_equals", "require"],
        exact: ["f"],
        isNewIdentifierLocation: true,
    }
);
