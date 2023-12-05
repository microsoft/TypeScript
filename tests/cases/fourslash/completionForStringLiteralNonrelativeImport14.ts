/// <reference path='fourslash.ts' />

// Should give completions for modules referenced via baseUrl and paths compiler options with explicit name mappings

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "baseUrl": "./modules",
////         "paths": {
////             "/module1": ["some/path/whatever.ts"],
////             "/module2": ["some/other/path.ts"]
////         }
////     }
//// }


// @Filename: tests/test0.ts
//// import * as foo1 from "//*import_as0*/
//// import foo2 = require("//*import_equals0*/
//// var foo3 = require("//*require0*/

// @Filename: some/path/whatever.ts
//// export var x = 9;

// @Filename: some/other/path.ts
//// export var y = 10;

verify.completions({
    marker: ["import_as0",],
    exact: ["lib", "lib.decorators", "lib.decorators.legacy", "tests",
        {
            name: "/module1",
            replacementSpan: {
                fileName: "foo",
                pos: 23,
                end: 24
            }
        },
        {
            name: "/module2",
            replacementSpan: {
                fileName: "foo",
                pos: 23,
                end: 24
            }
        }],
    isNewIdentifierLocation: true
});


verify.completions({
    marker: ["import_equals0",],
    exact: ["lib", "lib.decorators", "lib.decorators.legacy", "tests",
        {
            name: "/module1",
            replacementSpan: {
                fileName: "foo",
                pos: 48,
                end: 49
            }
        },
        {
            name: "/module2",
            replacementSpan: {
                fileName: "foo",
                pos: 48,
                end: 49
            }
        }],
    isNewIdentifierLocation: true
});

verify.completions({
    marker: ["require0",],
    exact: ["lib", "lib.decorators", "lib.decorators.legacy", "tests",
        {
            name: "/module1",
            replacementSpan: {
                fileName: "foo",
                pos: 70,
                end: 71
            }
        },
        {
            name: "/module2",
            replacementSpan: {
                fileName: "foo",
                pos: 70,
                end: 71
            }
        }],
    isNewIdentifierLocation: true
});
