namespace ts {
    describe("unittests:: services:: organizeImports", () => {
        describe("Sort imports", () => {
            it("Sort - non-relative vs non-relative", () => {
                assertSortsBefore(
                    `import y from "lib1";`,
                    `import x from "lib2";`);
            });

            it("Sort - relative vs relative", () => {
                assertSortsBefore(
                    `import y from "./lib1";`,
                    `import x from "./lib2";`);
            });

            it("Sort - relative vs non-relative", () => {
                assertSortsBefore(
                    `import y from "lib";`,
                    `import x from "./lib";`);
            });

            it("Sort - case-insensitive", () => {
                assertSortsBefore(
                    `import y from "a";`,
                    `import x from "Z";`);
                assertSortsBefore(
                    `import y from "A";`,
                    `import x from "z";`);
            });

            function assertSortsBefore(importString1: string, importString2: string) {
                const [{moduleSpecifier: moduleSpecifier1}, {moduleSpecifier: moduleSpecifier2}] = parseImports(importString1, importString2);
                assert.equal(OrganizeImports.compareModuleSpecifiers(moduleSpecifier1, moduleSpecifier2), Comparison.LessThan);
                assert.equal(OrganizeImports.compareModuleSpecifiers(moduleSpecifier2, moduleSpecifier1), Comparison.GreaterThan);
            }
        });

        describe("Coalesce imports", () => {
            it("No imports", () => {
                assert.isEmpty(OrganizeImports.coalesceImports([]));
            });

            it("Sort specifiers - case-insensitive", () => {
                const sortedImports = parseImports(`import { default as M, a as n, B, y, Z as O } from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(`import { a as n, B, default as M, y, Z as O } from "lib";`);
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Combine side-effect-only imports", () => {
                const sortedImports = parseImports(
                    `import "lib";`,
                    `import "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(`import "lib";`);
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Combine namespace imports", () => {
                const sortedImports = parseImports(
                    `import * as x from "lib";`,
                    `import * as y from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = sortedImports;
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Combine default imports", () => {
                const sortedImports = parseImports(
                    `import x from "lib";`,
                    `import y from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(`import { default as x, default as y } from "lib";`);
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Combine property imports", () => {
                const sortedImports = parseImports(
                    `import { x } from "lib";`,
                    `import { y as z } from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(`import { x, y as z } from "lib";`);
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Combine side-effect-only import with namespace import", () => {
                const sortedImports = parseImports(
                    `import "lib";`,
                    `import * as x from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = sortedImports;
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Combine side-effect-only import with default import", () => {
                const sortedImports = parseImports(
                    `import "lib";`,
                    `import x from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = sortedImports;
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Combine side-effect-only import with property import", () => {
                const sortedImports = parseImports(
                    `import "lib";`,
                    `import { x } from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = sortedImports;
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Combine namespace import with default import", () => {
                const sortedImports = parseImports(
                    `import * as x from "lib";`,
                    `import y from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(
                    `import y, * as x from "lib";`);
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Combine namespace import with property import", () => {
                const sortedImports = parseImports(
                    `import * as x from "lib";`,
                    `import { y } from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = sortedImports;
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Combine default import with property import", () => {
                const sortedImports = parseImports(
                    `import x from "lib";`,
                    `import { y } from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(
                    `import x, { y } from "lib";`);
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Combine many imports", () => {
                const sortedImports = parseImports(
                    `import "lib";`,
                    `import * as y from "lib";`,
                    `import w from "lib";`,
                    `import { b } from "lib";`,
                    `import "lib";`,
                    `import * as x from "lib";`,
                    `import z from "lib";`,
                    `import { a } from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(
                    `import "lib";`,
                    `import * as x from "lib";`,
                    `import * as y from "lib";`,
                    `import { a, b, default as w, default as z } from "lib";`);
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            // This is descriptive, rather than normative
            it("Combine two namespace imports with one default import", () => {
                const sortedImports = parseImports(
                    `import * as x from "lib";`,
                    `import * as y from "lib";`,
                    `import z from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = sortedImports;
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Combine type-only imports separately from other imports", () => {
                const sortedImports = parseImports(
                    `import type { x } from "lib";`,
                    `import type { y } from "lib";`,
                    `import { z } from "lib";`);
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(
                    `import { z } from "lib";`,
                    `import type { x, y } from "lib";`);
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });

            it("Do not combine type-only default, namespace, or named imports with each other", () => {
                const sortedImports = parseImports(
                    `import type { x } from "lib";`,
                    `import type * as y from "lib";`,
                    `import type z from "lib";`);
                // Default import could be rewritten as a named import to combine with `x`,
                // but seems of debatable merit.
                const actualCoalescedImports = OrganizeImports.coalesceImports(sortedImports);
                const expectedCoalescedImports = actualCoalescedImports;
                assertListEqual(actualCoalescedImports, expectedCoalescedImports);
            });
        });

        describe("Coalesce exports", () => {
            it("No exports", () => {
                assert.isEmpty(OrganizeImports.coalesceExports([]));
            });

            it("Sort specifiers - case-insensitive", () => {
                const sortedExports = parseExports(`export { default as M, a as n, B, y, Z as O } from "lib";`);
                const actualCoalescedExports = OrganizeImports.coalesceExports(sortedExports);
                const expectedCoalescedExports = parseExports(`export { a as n, B, default as M, y, Z as O } from "lib";`);
                assertListEqual(actualCoalescedExports, expectedCoalescedExports);
            });

            it("Combine namespace re-exports", () => {
                const sortedExports = parseExports(
                    `export * from "lib";`,
                    `export * from "lib";`);
                const actualCoalescedExports = OrganizeImports.coalesceExports(sortedExports);
                const expectedCoalescedExports = parseExports(`export * from "lib";`);
                assertListEqual(actualCoalescedExports, expectedCoalescedExports);
            });

            it("Combine property exports", () => {
                const sortedExports = parseExports(
                    `export { x };`,
                    `export { y as z };`);
                const actualCoalescedExports = OrganizeImports.coalesceExports(sortedExports);
                const expectedCoalescedExports = parseExports(`export { x, y as z };`);
                assertListEqual(actualCoalescedExports, expectedCoalescedExports);
            });

            it("Combine property re-exports", () => {
                const sortedExports = parseExports(
                    `export { x } from "lib";`,
                    `export { y as z } from "lib";`);
                const actualCoalescedExports = OrganizeImports.coalesceExports(sortedExports);
                const expectedCoalescedExports = parseExports(`export { x, y as z } from "lib";`);
                assertListEqual(actualCoalescedExports, expectedCoalescedExports);
            });

            it("Combine namespace re-export with property re-export", () => {
                const sortedExports = parseExports(
                    `export * from "lib";`,
                    `export { y } from "lib";`);
                const actualCoalescedExports = OrganizeImports.coalesceExports(sortedExports);
                const expectedCoalescedExports = sortedExports;
                assertListEqual(actualCoalescedExports, expectedCoalescedExports);
            });

            it("Combine many exports", () => {
                const sortedExports = parseExports(
                    `export { x };`,
                    `export { y as w, z as default };`,
                    `export { w as q };`);
                const actualCoalescedExports = OrganizeImports.coalesceExports(sortedExports);
                const expectedCoalescedExports = parseExports(
                    `export { w as q, x, y as w, z as default };`);
                assertListEqual(actualCoalescedExports, expectedCoalescedExports);
            });

            it("Combine many re-exports", () => {
                const sortedExports = parseExports(
                    `export { x as a, y } from "lib";`,
                    `export * from "lib";`,
                    `export { z as b } from "lib";`);
                const actualCoalescedExports = OrganizeImports.coalesceExports(sortedExports);
                const expectedCoalescedExports = parseExports(
                    `export * from "lib";`,
                    `export { x as a, y, z as b } from "lib";`);
                assertListEqual(actualCoalescedExports, expectedCoalescedExports);
            });

            it("Keep type-only exports separate", () => {
                const sortedExports = parseExports(
                    `export { x };`,
                    `export type { y };`);
                const actualCoalescedExports = OrganizeImports.coalesceExports(sortedExports);
                const expectedCoalescedExports = sortedExports;
                assertListEqual(actualCoalescedExports, expectedCoalescedExports);
            });

            it("Combine type-only exports", () => {
                const sortedExports = parseExports(
                    `export type { x };`,
                    `export type { y };`);
                const actualCoalescedExports = OrganizeImports.coalesceExports(sortedExports);
                const expectedCoalescedExports = parseExports(
                    `export type { x, y };`);
                assertListEqual(actualCoalescedExports, expectedCoalescedExports);
            });
        });


        describe("Baselines", () => {

            const libFile = {
                path: "/lib.ts",
                content: `
export function F1();
export default function F2();
`,
            };

            const reactLibFile = {
                path: "/react.ts",
                content: `
export const React = {
createElement: (_type, _props, _children) => {},
};

export const Other = 1;
`,
            };

            // Don't bother to actually emit a baseline for this.
            it("NoImports", () => {
                const testFile = {
                    path: "/a.ts",
                    content: "function F() { }",
                };
                const languageService = makeLanguageService(testFile);
                const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, testFormatSettings, emptyOptions);
                assert.isEmpty(changes);
            });

            it("doesn't crash on shorthand ambient module", () => {
                const testFile = {
                    path: "/a.ts",
                    content: "declare module '*';",
                };
                const languageService = makeLanguageService(testFile);
                const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, testFormatSettings, emptyOptions);
                assert.isEmpty(changes);
            });

            it("doesn't return any changes when the text would be identical", () => {
                const testFile = {
                    path: "/a.ts",
                    content: `import { f } from 'foo';\nf();`
                };
                const languageService = makeLanguageService(testFile);
                const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, testFormatSettings, emptyOptions);
                assert.isEmpty(changes);
            });

            testOrganizeImports("Renamed_used",
                {
                    path: "/test.ts",
                    content: `
import { F1 as EffOne, F2 as EffTwo } from "lib";
EffOne();
`,
                },
                libFile);

            testOrganizeImports("Simple",
                {
                    path: "/test.ts",
                    content: `
import { F1, F2 } from "lib";
import * as NS from "lib";
import D from "lib";

NS.F1();
D();
F1();
F2();
`,
                },
                libFile);

            testOrganizeImports("Unused_Some",
                {
                    path: "/test.ts",
                    content: `
import { F1, F2 } from "lib";
import * as NS from "lib";
import D from "lib";

D();
`,
                },
                libFile);

                it("doesn't return any changes when the text would be identical", () => {
                    const testFile = {
                        path: "/a.ts",
                        content: `import { f } from 'foo';\nf();`
                    };
                    const languageService = makeLanguageService(testFile);
                    const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, testFormatSettings, emptyOptions);
                    assert.isEmpty(changes);
                });

            testOrganizeImports("Unused_All",
                {
                    path: "/test.ts",
                    content: `
import { F1, F2 } from "lib";
import * as NS from "lib";
import D from "lib";
`,
                },
                libFile);

            it("Unused_Empty", () => {
                const testFile = {
                    path: "/test.ts",
                    content: `
import { } from "lib";
`,
                };
                const languageService = makeLanguageService(testFile);
                const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, testFormatSettings, emptyOptions);
                assert.isEmpty(changes);
            });

            testOrganizeImports("Unused_false_positive_module_augmentation",
                {
                    path: "/test.d.ts",
                    content: `
import foo from 'foo';
import { Caseless } from 'caseless';

declare module 'foo' {}
declare module 'caseless' {
    interface Caseless {
        test(name: KeyType): boolean;
    }
}`
                });

            testOrganizeImports("Unused_preserve_imports_for_module_augmentation_in_non_declaration_file",
                {
                    path: "/test.ts",
                    content: `
import foo from 'foo';
import { Caseless } from 'caseless';

declare module 'foo' {}
declare module 'caseless' {
    interface Caseless {
        test(name: KeyType): boolean;
    }
}`
            });

            it("Unused_false_positive_shorthand_assignment", () => {
                const testFile = {
                    path: "/test.ts",
                    content: `
import { x } from "a";
const o = { x };
`
                };
                const languageService = makeLanguageService(testFile);
                const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, testFormatSettings, emptyOptions);
                assert.isEmpty(changes);
            });

            it("Unused_false_positive_export_shorthand", () => {
                const testFile = {
                    path: "/test.ts",
                    content: `
import { x } from "a";
export { x };
`
                };
                const languageService = makeLanguageService(testFile);
                const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, testFormatSettings, emptyOptions);
                assert.isEmpty(changes);
            });

            testOrganizeImports("MoveToTop",
                {
                    path: "/test.ts",
                    content: `
import { F1, F2 } from "lib";
F1();
F2();
import * as NS from "lib";
NS.F1();
import D from "lib";
D();
`,
                },
                libFile);

            /* eslint-disable no-template-curly-in-string */
            testOrganizeImports("MoveToTop_Invalid",
                {
                    path: "/test.ts",
                    content: `
import { F1, F2 } from "lib";
F1();
F2();
import * as NS from "lib";
NS.F1();
import b from ${"`${'lib'}`"};
import a from ${"`${'lib'}`"};
import D from "lib";
D();
`,
                },
                libFile);
            /* eslint-enable no-template-curly-in-string */

            testOrganizeImports("TypeOnly",
                {
                    path: "/test.ts",
                    content: `
import { X } from "lib";
import type Y from "lib";
import { Z } from "lib";
import type { A, B } from "lib";

export { A, B, X, Y, Z };`
                });

            testOrganizeImports("CoalesceMultipleModules",
                {
                    path: "/test.ts",
                    content: `
import { d } from "lib1";
import { b } from "lib1";
import { c } from "lib2";
import { a } from "lib2";
a + b + c + d;
`,
                },
                { path: "/lib1.ts", content: "export const b = 1, d = 2;" },
                { path: "/lib2.ts", content: "export const a = 3, c = 4;" });

            testOrganizeImports("CoalesceTrivia",
                {
                    path: "/test.ts",
                    content: `
/*A*/import /*B*/ { /*C*/ F2 /*D*/ } /*E*/ from /*F*/ "lib" /*G*/;/*H*/ //I
/*J*/import /*K*/ { /*L*/ F1 /*M*/ } /*N*/ from /*O*/ "lib" /*P*/;/*Q*/ //R

F1();
F2();
`,
                },
                libFile);

            testOrganizeImports("SortTrivia",
                {
                    path: "/test.ts",
                    content: `
/*A*/import /*B*/ "lib2" /*C*/;/*D*/ //E
/*F*/import /*G*/ "lib1" /*H*/;/*I*/ //J
`,
                },
                { path: "/lib1.ts", content: "" },
                { path: "/lib2.ts", content: "" });

            testOrganizeImports("UnusedTrivia1",
                {
                    path: "/test.ts",
                    content: `
/*A*/import /*B*/ { /*C*/ F1 /*D*/ } /*E*/ from /*F*/ "lib" /*G*/;/*H*/ //I
`,
                },
                libFile);

            testOrganizeImports("UnusedTrivia2",
                {
                    path: "/test.ts",
                    content: `
/*A*/import /*B*/ { /*C*/ F1 /*D*/, /*E*/ F2 /*F*/ } /*G*/ from /*H*/ "lib" /*I*/;/*J*/ //K

F1();
`,
                },
                libFile);

            testOrganizeImports("UnusedHeaderComment",
                {
                    path: "/test.ts",
                    content: `
// Header
import { F1 } from "lib";
`,
                },
                libFile);

            testOrganizeImports("SortHeaderComment",
                {
                    path: "/test.ts",
                    content: `
// Header
import "lib2";
import "lib1";
`,
                },
                { path: "/lib1.ts", content: "" },
                { path: "/lib2.ts", content: "" });

                testOrganizeImports("SortComments",
                {
                    path: "/test.ts",
                    content: `
// Header
import "lib3";
// Comment2
import "lib2";
// Comment1
import "lib1";
`,
                },
                { path: "/lib1.ts", content: "" },
                { path: "/lib2.ts", content: "" },
                { path: "/lib3.ts", content: "" });

            testOrganizeImports("AmbientModule",
                {
                    path: "/test.ts",
                    content: `
declare module "mod" {
    import { F1 } from "lib";
    import * as NS from "lib";
    import { F2 } from "lib";

    function F(f1: {} = F1, f2: {} = F2) {}
}
`,
                },
                libFile);

            testOrganizeImports("TopLevelAndAmbientModule",
                {
                    path: "/test.ts",
                    content: `
import D from "lib";

declare module "mod" {
    import { F1 } from "lib";
    import * as NS from "lib";
    import { F2 } from "lib";

    function F(f1: {} = F1, f2: {} = F2) {}
}

import E from "lib";
import "lib";

D();
`,
                },
                libFile);

            testOrganizeImports("JsxFactoryUsedJsx",
                {
                    path: "/test.jsx",
                    content: `
import { React, Other } from "react";

<div/>;
`,
                },
                reactLibFile);

            testOrganizeImports("JsxFactoryUsedJs",
                {
                    path: "/test.js",
                    content: `
import { React, Other } from "react";

<div/>;
`,
                },
                reactLibFile);

            testOrganizeImports("JsxFactoryUsedTsx",
                {
                    path: "/test.tsx",
                    content: `
import { React, Other } from "react";

<div/>;
`,
                },
                reactLibFile);

            // TS files are not JSX contexts, so the parser does not treat
            // `<div/>` as a JSX element.
            testOrganizeImports("JsxFactoryUsedTs",
                {
                    path: "/test.ts",
                    content: `
import { React, Other } from "react";

<div/>;
`,
                },
                reactLibFile);

            testOrganizeImports("JsxFactoryUnusedJsx",
                {
                    path: "/test.jsx",
                    content: `
import { React, Other } from "react";
`,
                },
                reactLibFile);

            // Note: Since the file extension does not end with "x", the jsx compiler option
            // will not be enabled.  The import should be retained regardless.
            testOrganizeImports("JsxFactoryUnusedJs",
                {
                    path: "/test.js",
                    content: `
import { React, Other } from "react";
`,
                },
                reactLibFile);

            testOrganizeImports("JsxFactoryUnusedTsx",
                {
                    path: "/test.tsx",
                    content: `
import { React, Other } from "react";
`,
                },
                reactLibFile);

            testOrganizeImports("JsxFactoryUnusedTs",
                {
                    path: "/test.ts",
                    content: `
import { React, Other } from "react";
`,
                },
                reactLibFile);

            testOrganizeImports("JsxPragmaTsx",
                {
                    path: "/test.tsx",
                    content: `/** @jsx jsx */

import { Global, jsx } from '@emotion/core';
import * as React from 'react';

export const App: React.FunctionComponent = _ => <Global><h1>Hello!</h1></Global>
`,
                },
                {
                    path: "/@emotion/core/index.d.ts",
                    content: `import {  createElement } from 'react'
export const jsx: typeof createElement;
export function Global(props: any): ReactElement<any>;`
                },
                {
                    path: reactLibFile.path,
                    content: `${reactLibFile.content}
export namespace React {
    interface FunctionComponent {
    }
}
`
                }
            );

            describe("Exports", () => {

                testOrganizeExports("MoveToTop",
                    {
                        path: "/test.ts",
                        content: `
export { F1, F2 } from "lib";
1;
export * from "lib";
2;
`,
                    },
                    libFile);

                /* eslint-disable no-template-curly-in-string */
                testOrganizeExports("MoveToTop_Invalid",
                    {
                        path: "/test.ts",
                        content: `
export { F1, F2 } from "lib";
1;
export * from "lib";
2;
export { b } from ${"`${'lib'}`"};
export { a } from ${"`${'lib'}`"};
export { D } from "lib";
3;
`,
                    },
                    libFile);
                /* eslint-enable no-template-curly-in-string */

                testOrganizeExports("MoveToTop_WithImportsFirst",
                    {
                        path: "/test.ts",
                        content: `
import { F1, F2 } from "lib";
1;
export { F1, F2 } from "lib";
2;
import * as NS from "lib";
3;
export * from "lib";
4;
F1(); F2(); NS.F1();
`,
                    },
                    libFile);

                testOrganizeExports("MoveToTop_WithExportsFirst",
                    {
                        path: "/test.ts",
                        content: `
export { F1, F2 } from "lib";
1;
import { F1, F2 } from "lib";
2;
export * from "lib";
3;
import * as NS from "lib";
4;
F1(); F2(); NS.F1();
`,
                    },
                    libFile);

                testOrganizeExports("CoalesceMultipleModules",
                    {
                        path: "/test.ts",
                        content: `
export { d } from "lib1";
export { b } from "lib1";
export { c } from "lib2";
export { a } from "lib2";
`,
                    },
                    { path: "/lib1.ts", content: "export const b = 1, d = 2;" },
                    { path: "/lib2.ts", content: "export const a = 3, c = 4;" });

                testOrganizeExports("CoalesceTrivia",
                    {
                        path: "/test.ts",
                        content: `
/*A*/export /*B*/ { /*C*/ F2 /*D*/ } /*E*/ from /*F*/ "lib" /*G*/;/*H*/ //I
/*J*/export /*K*/ { /*L*/ F1 /*M*/ } /*N*/ from /*O*/ "lib" /*P*/;/*Q*/ //R
`,
                    },
                    libFile);

                testOrganizeExports("SortTrivia",
                    {
                        path: "/test.ts",
                        content: `
/*A*/export /*B*/ * /*C*/ from /*D*/ "lib2" /*E*/;/*F*/ //G
/*H*/export /*I*/ * /*J*/ from /*K*/ "lib1" /*L*/;/*M*/ //N
`,
                    },
                    { path: "/lib1.ts", content: "" },
                    { path: "/lib2.ts", content: "" });

                testOrganizeExports("SortHeaderComment",
                    {
                        path: "/test.ts",
                        content: `
// Header
export * from "lib2";
export * from "lib1";
`,
                    },
                    { path: "/lib1.ts", content: "" },
                    { path: "/lib2.ts", content: "" });

                testOrganizeExports("AmbientModule",
                    {
                        path: "/test.ts",
                        content: `
declare module "mod" {
    export { F1 } from "lib";
    export * from "lib";
    export { F2 } from "lib";
}
    `,
                    },
                    libFile);

                testOrganizeExports("TopLevelAndAmbientModule",
                    {
                        path: "/test.ts",
                        content: `
export { D } from "lib";

declare module "mod" {
    export { F1 } from "lib";
    export * from "lib";
    export { F2 } from "lib";
}

export { E } from "lib";
export * from "lib";
`,
                    },
                    libFile);
            });

            function testOrganizeExports(testName: string, testFile: TestFSWithWatch.File, ...otherFiles: TestFSWithWatch.File[]) {
                testOrganizeImports(`${testName}.exports`, testFile, ...otherFiles);
            }

            function testOrganizeImports(testName: string, testFile: TestFSWithWatch.File, ...otherFiles: TestFSWithWatch.File[]) {
                it(testName, () => runBaseline(`organizeImports/${testName}.ts`, testFile, ...otherFiles));
            }

            function runBaseline(baselinePath: string, testFile: TestFSWithWatch.File, ...otherFiles: TestFSWithWatch.File[]) {
                const { path: testPath, content: testContent } = testFile;
                const languageService = makeLanguageService(testFile, ...otherFiles);
                const changes = languageService.organizeImports({ type: "file", fileName: testPath }, testFormatSettings, emptyOptions);
                assert.equal(changes.length, 1);
                assert.equal(changes[0].fileName, testPath);

                const newText = textChanges.applyChanges(testContent, changes[0].textChanges);
                Harness.Baseline.runBaseline(baselinePath, [
                    "// ==ORIGINAL==",
                    testContent,
                    "// ==ORGANIZED==",
                    newText,
                ].join(newLineCharacter));
            }

            function makeLanguageService(...files: TestFSWithWatch.File[]) {
                const host = projectSystem.createServerHost(files);
                const projectService = projectSystem.createProjectService(host, { useSingleInferredProject: true });
                projectService.setCompilerOptionsForInferredProjects({ jsx: files.some(f => f.path.endsWith("x")) ? JsxEmit.React : JsxEmit.None });
                files.forEach(f => projectService.openClientFile(f.path));
                return projectService.inferredProjects[0].getLanguageService();
            }
        });

        function parseImports(...importStrings: string[]): readonly ImportDeclaration[] {
            const sourceFile = createSourceFile("a.ts", importStrings.join("\n"), ScriptTarget.ES2015, /*setParentNodes*/ true, ScriptKind.TS);
            const imports = filter(sourceFile.statements, isImportDeclaration);
            assert.equal(imports.length, importStrings.length);
            return imports;
        }

        function parseExports(...exportStrings: string[]): readonly ExportDeclaration[] {
            const sourceFile = createSourceFile("a.ts", exportStrings.join("\n"), ScriptTarget.ES2015, /*setParentNodes*/ true, ScriptKind.TS);
            const exports = filter(sourceFile.statements, isExportDeclaration);
            assert.equal(exports.length, exportStrings.length);
            return exports;
        }

        function assertEqual(node1?: Node, node2?: Node) {
            if (node1 === undefined) {
                assert.isUndefined(node2);
                return;
            }
            else if (node2 === undefined) {
                assert.isUndefined(node1); // Guaranteed to fail
                return;
            }

            assert.equal(node1.kind, node2.kind);

            switch (node1.kind) {
                case SyntaxKind.ImportDeclaration:
                    const decl1 = node1 as ImportDeclaration;
                    const decl2 = node2 as ImportDeclaration;
                    assertEqual(decl1.importClause, decl2.importClause);
                    assertEqual(decl1.moduleSpecifier, decl2.moduleSpecifier);
                    break;
                case SyntaxKind.ImportClause:
                    const clause1 = node1 as ImportClause;
                    const clause2 = node2 as ImportClause;
                    assertEqual(clause1.name, clause2.name);
                    assertEqual(clause1.namedBindings, clause2.namedBindings);
                    break;
                case SyntaxKind.NamespaceImport:
                    const nsi1 = node1 as NamespaceImport;
                    const nsi2 = node2 as NamespaceImport;
                    assertEqual(nsi1.name, nsi2.name);
                    break;
                case SyntaxKind.NamedImports:
                    const ni1 = node1 as NamedImports;
                    const ni2 = node2 as NamedImports;
                    assertListEqual(ni1.elements, ni2.elements);
                    break;
                case SyntaxKind.ImportSpecifier:
                    const is1 = node1 as ImportSpecifier;
                    const is2 = node2 as ImportSpecifier;
                    assertEqual(is1.name, is2.name);
                    assertEqual(is1.propertyName, is2.propertyName);
                    break;
                case SyntaxKind.ExportDeclaration:
                    const ed1 = node1 as ExportDeclaration;
                    const ed2 = node2 as ExportDeclaration;
                    assertEqual(ed1.exportClause, ed2.exportClause);
                    assertEqual(ed1.moduleSpecifier, ed2.moduleSpecifier);
                    break;
                case SyntaxKind.NamedExports:
                    const ne1 = node1 as NamedExports;
                    const ne2 = node2 as NamedExports;
                    assertListEqual(ne1.elements, ne2.elements);
                    break;
                case SyntaxKind.ExportSpecifier:
                    const es1 = node1 as ExportSpecifier;
                    const es2 = node2 as ExportSpecifier;
                    assertEqual(es1.name, es2.name);
                    assertEqual(es1.propertyName, es2.propertyName);
                    break;
                case SyntaxKind.Identifier:
                    const id1 = node1 as Identifier;
                    const id2 = node2 as Identifier;
                    assert.equal(id1.text, id2.text);
                    break;
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                    const sl1 = node1 as LiteralLikeNode;
                    const sl2 = node2 as LiteralLikeNode;
                    assert.equal(sl1.text, sl2.text);
                    break;
                default:
                    assert.equal(node1.getText(), node2.getText());
                    break;
            }
        }

        function assertListEqual(list1: readonly Node[], list2: readonly Node[]) {
            if (list1 === undefined || list2 === undefined) {
                assert.isUndefined(list1);
                assert.isUndefined(list2);
                return;
            }

            assert.equal(list1.length, list2.length);
            for (let i = 0; i < list1.length; i++) {
                assertEqual(list1[i], list2[i]);
            }
        }
    });
}
