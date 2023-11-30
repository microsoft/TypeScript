/// <reference path='fourslash.ts' />

// Should give correct completions for rootDirs regardless of the slash at the end

// @rootDirs: /repo/src1,/repo/src2/,/repo/generated1,/repo/generated2/

// @Filename: /repo/src1/test1.ts
//// import * as foo1 from "./dir//*import_as1*/
//// import foo2 = require("./dir//*import_equals1*/
//// var foo3 = require("./dir//*require1*/

// @Filename: /repo/src2/test2.ts
//// import * as foo1 from "./dir//*import_as2*/
//// import foo2 = require("./dir//*import_equals2*/
//// var foo3 = require("./dir//*require2*/

// @Filename: /repo/generated1/dir/f1.ts
//// /*f1*/

// @Filename: /repo/generated2/dir/f2.ts
//// /*f2*/

verify.completions(
    {
        marker: ["import_as1", "import_equals1", "require1"],
        exact: ["f1", "f2"],
        isNewIdentifierLocation: true,
    },
    {
        marker: ["import_as2", "import_equals2", "require2"],
        exact: ["f1", "f2"],
        isNewIdentifierLocation: true,
    }
);
