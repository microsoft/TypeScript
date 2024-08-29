import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";

describe("unittests:: services:: PreProcessFile:", () => {
    function test(sourceText: string, readImportFile: boolean, detectJavaScriptImports: boolean, expectedPreProcess: ts.PreProcessedFileInfo): void {
        const resultPreProcess = ts.preProcessFile(sourceText, readImportFile, detectJavaScriptImports);

        assert.equal(resultPreProcess.isLibFile, expectedPreProcess.isLibFile, "Pre-processed file has different value for isLibFile. Expected: " + expectedPreProcess.isLibFile + ". Actual: " + resultPreProcess.isLibFile);

        checkFileReferenceList("Imported files", expectedPreProcess.importedFiles, resultPreProcess.importedFiles);
        checkFileReferenceList("Referenced files", expectedPreProcess.referencedFiles, resultPreProcess.referencedFiles);
        checkFileReferenceList("Type reference directives", expectedPreProcess.typeReferenceDirectives, resultPreProcess.typeReferenceDirectives);
        checkFileReferenceList("Lib reference directives", expectedPreProcess.libReferenceDirectives, resultPreProcess.libReferenceDirectives);

        assert.deepEqual(resultPreProcess.ambientExternalModules, expectedPreProcess.ambientExternalModules);
    }

    function checkFileReferenceList(kind: string, expected: ts.FileReference[], actual: ts.FileReference[]) {
        if (expected === actual) {
            return;
        }
        assert.deepEqual(actual, expected, `Expected [${kind}] ${jsonToReadableText(expected)}, got ${jsonToReadableText(actual)}`);
    }

    describe("Test preProcessFiles,", () => {
        it("Correctly return referenced files from triple slash", () => {
            test('///<reference path = "refFile1.ts" />' + "\n" + '///<reference path ="refFile2.ts"/>' + "\n" + '///<reference path="refFile3.ts" />' + "\n" + '///<reference path= "..\\refFile4d.ts" />', /*readImportFile*/ true, /*detectJavaScriptImports*/ false, {
                referencedFiles: [{ fileName: "refFile1.ts", pos: 22, end: 33 }, { fileName: "refFile2.ts", pos: 59, end: 70 }, { fileName: "refFile3.ts", pos: 94, end: 105 }, { fileName: "..\\refFile4d.ts", pos: 131, end: 146 }],
                importedFiles: [] as ts.FileReference[],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
        });

        it("Do not return reference path because of invalid triple-slash syntax", () => {
            test('///<reference path"refFile1.ts" />' + "\n" + '///<reference path ="refFile2.ts">' + "\n" + '///<referencepath="refFile3.ts" />' + "\n" + '///<reference pat= "refFile4d.ts" />', /*readImportFile*/ true, /*detectJavaScriptImports*/ false, {
                referencedFiles: [] as ts.FileReference[],
                importedFiles: [] as ts.FileReference[],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
        });

        it("Do not return reference path of non-imports", () => {
            test("Quill.import('delta');", /*readImportFile*/ true, /*detectJavaScriptImports*/ false, {
                referencedFiles: [] as ts.FileReference[],
                importedFiles: [] as ts.FileReference[],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
        });

        it("Do not return reference path of nested non-imports", () => {
            test("a.b.import('c');", /*readImportFile*/ true, /*detectJavaScriptImports*/ false, {
                referencedFiles: [] as ts.FileReference[],
                importedFiles: [] as ts.FileReference[],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
        });

        it("Correctly return imported files", () => {
            test('import i1 = require("r1.ts"); import i2 =require("r2.ts"); import i3= require("r3.ts"); import i4=require("r4.ts"); import i5 = require  ("r5.ts");', /*readImportFile*/ true, /*detectJavaScriptImports*/ false, {
                referencedFiles: [] as ts.FileReference[],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                importedFiles: [{ fileName: "r1.ts", pos: 20, end: 25 }, { fileName: "r2.ts", pos: 49, end: 54 }, { fileName: "r3.ts", pos: 78, end: 83 }, { fileName: "r4.ts", pos: 106, end: 111 }, { fileName: "r5.ts", pos: 138, end: 143 }],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
        });

        it("Do not return imported files if readImportFiles argument is false", () => {
            test('import i1 = require("r1.ts"); import i2 =require("r2.ts"); import i3= require("r3.ts"); import i4=require("r4.ts"); import i5 = require  ("r5.ts");', /*readImportFile*/ false, /*detectJavaScriptImports*/ false, {
                referencedFiles: [] as ts.FileReference[],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                importedFiles: [] as ts.FileReference[],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
        });

        it("Do not return import path because of invalid import syntax", () => {
            test('import i1 require("r1.ts"); import = require("r2.ts") import i3= require("r3.ts"); import i5', /*readImportFile*/ true, /*detectJavaScriptImports*/ false, {
                referencedFiles: [] as ts.FileReference[],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                importedFiles: [{ fileName: "r3.ts", pos: 73, end: 78 }],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
        });

        it("Correctly return referenced files and import files", () => {
            test('///<reference path="refFile1.ts" />' + "\n" + '///<reference path ="refFile2.ts"/>' + "\n" + 'import i1 = require("r1.ts"); import i2 =require("r2.ts");', /*readImportFile*/ true, /*detectJavaScriptImports*/ false, {
                referencedFiles: [{ fileName: "refFile1.ts", pos: 20, end: 31 }, { fileName: "refFile2.ts", pos: 57, end: 68 }],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                importedFiles: [{ fileName: "r1.ts", pos: 92, end: 97 }, { fileName: "r2.ts", pos: 121, end: 126 }],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
        });

        it("Correctly return referenced files and import files even with some invalid syntax", () => {
            test('///<reference path="refFile1.ts" />' + "\n" + '///<reference path "refFile2.ts"/>' + "\n" + 'import i1 = require("r1.ts"); import = require("r2.ts"); import i2 = require("r3.ts");', /*readImportFile*/ true, /*detectJavaScriptImports*/ false, {
                referencedFiles: [{ fileName: "refFile1.ts", pos: 20, end: 31 }],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                importedFiles: [{ fileName: "r1.ts", pos: 91, end: 96 }, { fileName: "r3.ts", pos: 148, end: 153 }],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
        });

        it("Correctly return ES6 imports", () => {
            test(
                'import * as ns from "m1";' + "\n" +
                    'import def, * as ns from "m2";' + "\n" +
                    'import def from "m3";' + "\n" +
                    'import {a} from "m4";' + "\n" +
                    'import {a as A} from "m5";' + "\n" +
                    'import {a as A, b, c as C} from "m6";' + "\n" +
                    'import def , {a, b, c as C} from "m7";' + "\n",
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "m1", pos: 20, end: 22 },
                        { fileName: "m2", pos: 51, end: 53 },
                        { fileName: "m3", pos: 73, end: 75 },
                        { fileName: "m4", pos: 95, end: 97 },
                        { fileName: "m5", pos: 122, end: 124 },
                        { fileName: "m6", pos: 160, end: 162 },
                        { fileName: "m7", pos: 199, end: 201 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });

        it("Correctly ignore commented imports following template expression", () => {
            /* eslint-disable no-template-curly-in-string */
            test(
                "/**" + "\n" +
                    " * Before" + "\n" +
                    " * ```" + "\n" +
                    ' * import * as a from "a";' + "\n" +
                    " * ```" + "\n" +
                    " */" + "\n" +
                    "type Foo = `${string}`;" + "\n" +
                    "/**" + "\n" +
                    " * After" + "\n" +
                    " * ```" + "\n" +
                    ' * import { B } from "b";' + "\n" +
                    ' * import * as c from "c";' + "\n" +
                    " * ```" + "\n" +
                    " */",
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ true,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
            /* eslint-enable no-template-curly-in-string */
        });

        it("Ignores imports in template strings", () => {
            /* eslint-disable no-template-curly-in-string */
            test('a ? `&${a}` : `#${b}`;\n\n `import("${moduleSpecifier}").${id}`;', /*readImportFile*/ true, /*detectJavaScriptImports*/ true, {
                referencedFiles: [],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                importedFiles: [],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
            /* eslint-enable no-template-curly-in-string */
        });

        it("Correctly returns imports after a template expression", () => {
            /* eslint-disable no-template-curly-in-string */
            test('`${foo}`; import "./foo";', /*readImportFile*/ true, /*detectJavaScriptImports*/ true, {
                referencedFiles: [],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                importedFiles: [
                    { fileName: "./foo", pos: 17, end: 22 },
                ],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
            /* eslint-enable no-template-curly-in-string */
        });

        it("Correctly returns dynamic imports from template expression", () => {
            /* eslint-disable no-template-curly-in-string */
            test(
                "`${(<div>Text `` ${} text {} " + "\n" +
                    '${import("a")} {import("b")} ' + "\n" +
                    '${/* A comment */} ${/* import("ignored") */} </div>)}`',
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ true,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "a", pos: 39, end: 40 },
                        { fileName: "b", pos: 53, end: 54 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
            /* eslint-enable no-template-curly-in-string */
        });

        it("Correctly returns dynamic imports from nested template expression", () => {
            /* eslint-disable no-template-curly-in-string */
            test('`${foo(`${bar(`${import("a")} ${import("b")}`, `${baz(`${import("c") ${import("d")}`)}`)}`)}`', /*readImportFile*/ true, /*detectJavaScriptImports*/ true, {
                referencedFiles: [],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                importedFiles: [
                    { fileName: "a", pos: 24, end: 25 },
                    { fileName: "b", pos: 39, end: 40 },
                    { fileName: "c", pos: 64, end: 65 },
                    { fileName: "d", pos: 78, end: 79 },
                ],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
            /* eslint-enable no-template-curly-in-string */
        });

        it("Correctly returns dynamic imports from tagged template expression", () => {
            /* eslint-disable no-template-curly-in-string */
            test('foo`${ fn({ a: 100 }, import("a"), `${import("b")}`, import("c"), `${import("d")} foo`, import("e")) }`', /*readImportFile*/ true, /*detectJavaScriptImports*/ true, {
                referencedFiles: [],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                importedFiles: [
                    { fileName: "a", pos: 29, end: 30 },
                    { fileName: "b", pos: 45, end: 46 },
                    { fileName: "c", pos: 60, end: 61 },
                    { fileName: "d", pos: 76, end: 77 },
                    { fileName: "e", pos: 95, end: 96 },
                ],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
            /* eslint-enable no-template-curly-in-string */
        });

        it("Correctly returns dynamic imports from template expression and imports following it", () => {
            /* eslint-disable no-template-curly-in-string */
            test(
                'const x = `hello ${await import("a").default}`;' + "\n\n" +
                    'import { y } from "b";',
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ true,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "a", pos: 32, end: 33 },
                        { fileName: "b", pos: 67, end: 68 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
            /* eslint-enable no-template-curly-in-string */
        });

        it("Correctly returns dynamic imports from template expressions and other imports", () => {
            /* eslint-disable no-template-curly-in-string */
            test(
                'const x = `x ${await import("a").default}`;' + "\n\n" +
                    'import { y } from "b";' + "\n" +
                    'const y = `y ${import("c")}`;' + "\n\n" +
                    'import { d } from "d";',
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ true,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "a", pos: 28, end: 29 },
                        { fileName: "b", pos: 63, end: 64 },
                        { fileName: "c", pos: 90, end: 91 },
                        { fileName: "d", pos: 117, end: 118 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
            /* eslint-enable no-template-curly-in-string */
        });

        it("Correctly returns empty importedFiles with incorrect template expression", () => {
            test("const foo = `${", /*readImportFile*/ true, /*detectJavaScriptImports*/ true, {
                referencedFiles: [],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                importedFiles: [],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
        });

        it("Correctly return ES6 exports", () => {
            test(
                'export * from "m1";' + "\n" +
                    'export {a} from "m2";' + "\n" +
                    'export {a as A} from "m3";' + "\n" +
                    'export {a as A, b, c as C} from "m4";' + "\n",
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "m1", pos: 14, end: 16 },
                        { fileName: "m2", pos: 36, end: 38 },
                        { fileName: "m3", pos: 63, end: 65 },
                        { fileName: "m4", pos: 101, end: 103 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });

        it("Correctly handles import types", () => {
            test(
                'import type * as ns from "m1";' + "\n" +
                    'import type def, * as ns from "m2";' + "\n" +
                    'import type def from "m3";' + "\n" +
                    'import type {a} from "m4";' + "\n" +
                    'import type {a as A} from "m5";' + "\n" +
                    'import type {a as A, b, c as C} from "m6";' + "\n" +
                    'import type def , {a, b, c as C} from "m7";' + "\n" +
                    'import type from "m8";' + "\n" +
                    'import type T = require("m9");' + "\n" +
                    'import type = require("m10");' + "\n" +
                    'export import type T = require("m11");' + "\n" +
                    'export import type = require("m12");' + "\n",
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [] as ts.FileReference[],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "m1", pos: 25, end: 27 },
                        { fileName: "m2", pos: 61, end: 63 },
                        { fileName: "m3", pos: 88, end: 90 },
                        { fileName: "m4", pos: 115, end: 117 },
                        { fileName: "m5", pos: 147, end: 149 },
                        { fileName: "m6", pos: 190, end: 192 },
                        { fileName: "m7", pos: 234, end: 236 },
                        { fileName: "m8", pos: 257, end: 259 },
                        { fileName: "m9", pos: 287, end: 289 },
                        { fileName: "m10", pos: 316, end: 319 },
                        { fileName: "m11", pos: 355, end: 358 },
                        { fileName: "m12", pos: 392, end: 395 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });

        it("Correctly handles export types", () => {
            test(
                'export type * from "m1";' + "\n" +
                    'export type {a} from "m2";' + "\n" +
                    'export type {a as A} from "m3";' + "\n" +
                    'export type {a as A, b, c as C} from "m4";' + "\n",
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [] as ts.FileReference[],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "m1", pos: 19, end: 21 },
                        { fileName: "m2", pos: 46, end: 48 },
                        { fileName: "m3", pos: 78, end: 80 },
                        { fileName: "m4", pos: 121, end: 123 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });

        it("Correctly handles import type node", () => {
            test(
                'const x: import("m1") = { x: 0, y: 0 };' + "\n" +
                    'let y: import("m2").Bar.I = { a: "", b: 0 };' + "\n" +
                    'let shim: typeof import("m3") = { Bar: Bar2 };' + "\n",
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "m1", pos: 16, end: 18 },
                        { fileName: "m2", pos: 54, end: 56 },
                        { fileName: "m3", pos: 109, end: 111 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });

        it("Correctly return ambient external modules", () => {
            test(
                `
               declare module A {}
               declare module "B" {}
               function foo() {
               }
               `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [],
                    ambientExternalModules: ["B"],
                    isLibFile: false,
                },
            );
        });

        it("Correctly handles export import declarations", () => {
            test('export import a = require("m1");', /*readImportFile*/ true, /*detectJavaScriptImports*/ false, {
                referencedFiles: [],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                importedFiles: [
                    { fileName: "m1", pos: 26, end: 28 },
                ],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
        });
        it("Correctly handles export require calls in JavaScript files", () => {
            test(
                `
            export import a = require("m1");
            var x = require('m2');
            foo(require('m3'));
            var z = { f: require('m4') }
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ true,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "m1", pos: 39, end: 41 },
                        { fileName: "m2", pos: 74, end: 76 },
                        { fileName: "m3", pos: 105, end: 107 },
                        { fileName: "m4", pos: 146, end: 148 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });
        it("Correctly handles dependency lists in define([deplist]) calls in JavaScript files", () => {
            test(
                `
            define(["mod1", "mod2"], (m1, m2) => {
            });
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ true,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "mod1", pos: 21, end: 25 },
                        { fileName: "mod2", pos: 29, end: 33 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });

        it("Correctly handles dependency lists in define(modName, [deplist]) calls in JavaScript files", () => {
            test(
                `
            define("mod", ["mod1", "mod2"], (m1, m2) => {
            });
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ true,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "mod1", pos: 28, end: 32 },
                        { fileName: "mod2", pos: 36, end: 40 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });

        it("correctly handles augmentations in external modules - 1", () => {
            test(
                `
            declare module "../Observable" {
                interface I {}
            }

            export {}
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "../Observable", pos: 28, end: 41 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });
        it("correctly handles augmentations in external modules - 2", () => {
            test(
                `
            declare module "../Observable" {
                interface I {}
            }

            import * as x from "m";
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "m", pos: 123, end: 124 },
                        { fileName: "../Observable", pos: 28, end: 41 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });
        it("correctly handles augmentations in external modules - 3", () => {
            test(
                `
            declare module "../Observable" {
                interface I {}
            }

            import m = require("m");
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "m", pos: 123, end: 124 },
                        { fileName: "../Observable", pos: 28, end: 41 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });
        it("correctly handles augmentations in external modules - 4", () => {
            test(
                `
            declare module "../Observable" {
                interface I {}
            }
            namespace N {}
            export = N;
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "../Observable", pos: 28, end: 41 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });
        it("correctly handles augmentations in external modules - 5", () => {
            test(
                `
            declare module "../Observable" {
                interface I {}
            }
            namespace N {}
            export import IN = N;
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "../Observable", pos: 28, end: 41 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });
        it("correctly handles augmentations in external modules - 6", () => {
            test(
                `
            declare module "../Observable" {
                interface I {}
            }
            export let x = 1;
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "../Observable", pos: 28, end: 41 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });
        it("correctly handles augmentations in ambient external modules - 1", () => {
            test(
                `
            declare module "m1" {
                export * from "m2";
                declare module "augmentation" {
                    interface I {}
                }
            }
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "m2", pos: 65, end: 67 },
                        { fileName: "augmentation", pos: 102, end: 114 },
                    ],
                    ambientExternalModules: ["m1"],
                    isLibFile: false,
                },
            );
        });
        it("correctly handles augmentations in ambient external modules - 2", () => {
            test(
                `
            namespace M { var x; }
            import IM = M;
            declare module "m1" {
                export * from "m2";
                declare module "augmentation" {
                    interface I {}
                }
            }
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "m2", pos: 127, end: 129 },
                        { fileName: "augmentation", pos: 164, end: 176 },
                    ],
                    ambientExternalModules: ["m1"],
                    isLibFile: false,
                },
            );
        });
        it("correctly recognizes type reference directives", () => {
            test(
                `
            /// <reference path="a"/>
            /// <reference types="a1"/>
            /// <reference path="a2"/>
            /// <reference types="a3"/>
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [
                        { pos: 34, end: 35, fileName: "a" },
                        { pos: 112, end: 114, fileName: "a2" },
                    ],
                    typeReferenceDirectives: [
                        { pos: 73, end: 75, fileName: "a1" },
                        { pos: 152, end: 154, fileName: "a3" },
                    ],
                    libReferenceDirectives: [],
                    importedFiles: [],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });
        it("correctly recognizes lib reference directives", () => {
            test(
                `
            /// <reference path="a"/>
            /// <reference lib="a1"/>
            /// <reference path="a2"/>
            /// <reference lib="a3"/>
            `,
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [
                        { pos: 34, end: 35, fileName: "a" },
                        { pos: 110, end: 112, fileName: "a2" },
                    ],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [
                        { pos: 71, end: 73, fileName: "a1" },
                        { pos: 148, end: 150, fileName: "a3" },
                    ],
                    importedFiles: [],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });

        it("Correctly handles dynamic imports with template literals", () => {
            test(
                "const m1 = import('mod1');" + "\n" +
                    "const m2 = import(`mod2`);" + "\n" +
                    "Promise.all([import('mod3'), import(`mod4`)]);" + "\n" +
                    "import(/* webpackChunkName: 'module5' */ `mod5`);" + "\n",
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ false,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "mod1", pos: 18, end: 22 },
                        { fileName: "mod2", pos: 45, end: 49 },
                        { fileName: "mod3", pos: 74, end: 78 },
                        { fileName: "mod4", pos: 90, end: 94 },
                        { fileName: "mod5", pos: 142, end: 146 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });

        it("Correctly handles require calls with template literals in JS files", () => {
            test(
                "const m1 = require(`mod1`);" + "\n" +
                    "f(require(`mod2`));" + "\n" +
                    "const a = { x: require(`mod3`) };" + "\n",
                /*readImportFile*/ true,
                /*detectJavaScriptImports*/ true,
                {
                    referencedFiles: [],
                    typeReferenceDirectives: [],
                    libReferenceDirectives: [],
                    importedFiles: [
                        { fileName: "mod1", pos: 19, end: 23 },
                        { fileName: "mod2", pos: 38, end: 42 },
                        { fileName: "mod3", pos: 71, end: 75 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false,
                },
            );
        });

        it("Correctly handles dependency lists in define(modName, [deplist]) calls with template literals in JS files", () => {
            test("define(`mod`, [`mod1`, `mod2`], (m1, m2) => {});", /*readImportFile*/ true, /*detectJavaScriptImports*/ true, {
                referencedFiles: [],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                importedFiles: [
                    { fileName: "mod1", pos: 15, end: 19 },
                    { fileName: "mod2", pos: 23, end: 27 },
                ],
                ambientExternalModules: undefined,
                isLibFile: false,
            });
        });
    });
});
