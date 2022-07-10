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
    exact: [
        "lib",
        "lib.es2009.array",
        "lib.es2009.arraybuffer",
        "lib.es2009.boolean",
        "lib.es2009.core",
        "lib.es2009.dataview",
        "lib.es2009.date",
        "lib.es2009.error",
        "lib.es2009.evalerror",
        "lib.es2009.float32array",
        "lib.es2009.float64array",
        "lib.es2009.function",
        "lib.es2009.int16array",
        "lib.es2009.int32array",
        "lib.es2009.int8array",
        "lib.es2009.intl",
        "lib.es2009.json",
        "lib.es2009.math",
        "lib.es2009.number",
        "lib.es2009.object",
        "lib.es2009.promise",
        "lib.es2009.rangeerror",
        "lib.es2009.referenceerror",
        "lib.es2009.regexp",
        "lib.es2009.string",
        "lib.es2009.symbol",
        "lib.es2009.syntaxerror",
        "lib.es2009.typeerror",
        "lib.es2009.uint16array",
        "lib.es2009.uint32array",
        "lib.es2009.uint8array",
        "lib.es2009.uint8clampedarray",
        "lib.es2009.urierror",
        "lib.utils.import",
        "lib.utils.modifiers",
        "tests",
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
    exact: [
        "lib",
        "lib.es2009.array",
        "lib.es2009.arraybuffer",
        "lib.es2009.boolean",
        "lib.es2009.core",
        "lib.es2009.dataview",
        "lib.es2009.date",
        "lib.es2009.error",
        "lib.es2009.evalerror",
        "lib.es2009.float32array",
        "lib.es2009.float64array",
        "lib.es2009.function",
        "lib.es2009.int16array",
        "lib.es2009.int32array",
        "lib.es2009.int8array",
        "lib.es2009.intl",
        "lib.es2009.json",
        "lib.es2009.math",
        "lib.es2009.number",
        "lib.es2009.object",
        "lib.es2009.promise",
        "lib.es2009.rangeerror",
        "lib.es2009.referenceerror",
        "lib.es2009.regexp",
        "lib.es2009.string",
        "lib.es2009.symbol",
        "lib.es2009.syntaxerror",
        "lib.es2009.typeerror",
        "lib.es2009.uint16array",
        "lib.es2009.uint32array",
        "lib.es2009.uint8array",
        "lib.es2009.uint8clampedarray",
        "lib.es2009.urierror",
        "lib.utils.import",
        "lib.utils.modifiers",
        "tests",
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
    exact: [
        "lib",
        "lib.es2009.array",
        "lib.es2009.arraybuffer",
        "lib.es2009.boolean",
        "lib.es2009.core",
        "lib.es2009.dataview",
        "lib.es2009.date",
        "lib.es2009.error",
        "lib.es2009.evalerror",
        "lib.es2009.float32array",
        "lib.es2009.float64array",
        "lib.es2009.function",
        "lib.es2009.int16array",
        "lib.es2009.int32array",
        "lib.es2009.int8array",
        "lib.es2009.intl",
        "lib.es2009.json",
        "lib.es2009.math",
        "lib.es2009.number",
        "lib.es2009.object",
        "lib.es2009.promise",
        "lib.es2009.rangeerror",
        "lib.es2009.referenceerror",
        "lib.es2009.regexp",
        "lib.es2009.string",
        "lib.es2009.symbol",
        "lib.es2009.syntaxerror",
        "lib.es2009.typeerror",
        "lib.es2009.uint16array",
        "lib.es2009.uint32array",
        "lib.es2009.uint8array",
        "lib.es2009.uint8clampedarray",
        "lib.es2009.urierror",
        "lib.utils.import",
        "lib.utils.modifiers",
        "tests",
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
