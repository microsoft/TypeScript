/// <reference path='fourslash.ts' />

// Should give correct completions for directories when invoked from within nested folders

// @rootDirs: /repo/src1,/repo/src2/,/repo/generated1,/repo/generated2/

// @Filename: /dir/secret_file.ts
//// /*secret_file*/

// @Filename: /repo/src1/dir/test1.ts
//// import * as foo1 from ".//*import_as1*/
//// import foo2 = require(".//*import_equals1*/
//// var foo3 = require(".//*require1*/

// @Filename: /repo/src2/dir/test2.ts
//// import * as foo1 from "..//*import_as2*/
//// import foo2 = require("..//*import_equals2*/
//// var foo3 = require("..//*require2*/

// @Filename: /repo/src2/index.ts
//// import * as foo1 from ".//*import_as3*/
//// import foo2 = require(".//*import_equals3*/
//// var foo3 = require(".//*require3*/

// @Filename: /repo/generated1/dir/f1.ts
//// /*f1*/

// @Filename: /repo/generated2/dir/f2.ts
//// /*f2*/

verify.completions(
    {
        marker: ["import_as1", "import_equals1", "require1"],
        unsorted: ["f1", "f2", "test2"],
        isNewIdentifierLocation: true,
    },
    {
        marker: ["import_as2", "import_equals2", "require2"],
        unsorted: ["dir", "index"],
        isNewIdentifierLocation: true,
    },
    {
        marker: ["import_as3", "import_equals3", "require3"],
        unsorted: ["dir"],
        isNewIdentifierLocation: true,
    }
);
