import * as Harness from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import {
    createServerHost,
    File,
} from "../helpers/virtualFileSystemWithWatch.js";
import {
    newLineCharacter,
    TestProjectService,
} from "./extract/helpers.js";

describe("unittests:: services:: organizeImports", () => {
    describe("Sort imports", () => {
        it("Sort - non-relative vs non-relative", () => {
            assertSortsBefore(
                `import y from "lib1";`,
                `import x from "lib2";`,
            );
        });

        it("Sort - relative vs relative", () => {
            assertSortsBefore(
                `import y from "./lib1";`,
                `import x from "./lib2";`,
            );
        });

        it("Sort - relative vs non-relative", () => {
            assertSortsBefore(
                `import y from "lib";`,
                `import x from "./lib";`,
            );
        });

        it("Sort - case-insensitive", () => {
            assertSortsBefore(
                `import y from "a";`,
                `import x from "Z";`,
            );
            assertSortsBefore(
                `import y from "A";`,
                `import x from "z";`,
            );
        });

        function assertSortsBefore(importString1: string, importString2: string) {
            const [{ moduleSpecifier: moduleSpecifier1 }, { moduleSpecifier: moduleSpecifier2 }] = parseImports(importString1, importString2);
            assert.equal(ts.OrganizeImports.compareModuleSpecifiers(moduleSpecifier1, moduleSpecifier2, /*ignoreCase*/ true), ts.Comparison.LessThan);
            assert.equal(ts.OrganizeImports.compareModuleSpecifiers(moduleSpecifier2, moduleSpecifier1, /*ignoreCase*/ true), ts.Comparison.GreaterThan);
        }
    });

    describe("Coalesce imports", () => {
        it("No imports", () => {
            assert.isEmpty(ts.OrganizeImports.testCoalesceImports([], /*ignoreCase*/ true));
        });

        it("Sort specifiers - case-insensitive", () => {
            const sortedImports = parseImports(`import { default as M, a as n, B, y, Z as O } from "lib";`);
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = parseImports(`import { B, default as M, a as n, Z as O, y } from "lib";`);
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Combine side-effect-only imports", () => {
            const sortedImports = parseImports(
                `import "lib";`,
                `import "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = parseImports(`import "lib";`);
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Combine namespace imports", () => {
            const sortedImports = parseImports(
                `import * as x from "lib";`,
                `import * as y from "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = sortedImports;
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Combine default imports", () => {
            const sortedImports = parseImports(
                `import x from "lib";`,
                `import y from "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = parseImports(`import { default as x, default as y } from "lib";`);
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Combine property imports", () => {
            const sortedImports = parseImports(
                `import { x } from "lib";`,
                `import { y as z } from "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = parseImports(`import { x, y as z } from "lib";`);
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Combine side-effect-only import with namespace import", () => {
            const sortedImports = parseImports(
                `import "lib";`,
                `import * as x from "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = sortedImports;
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Combine side-effect-only import with default import", () => {
            const sortedImports = parseImports(
                `import "lib";`,
                `import x from "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = sortedImports;
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Combine side-effect-only import with property import", () => {
            const sortedImports = parseImports(
                `import "lib";`,
                `import { x } from "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = sortedImports;
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Combine namespace import with default import", () => {
            const sortedImports = parseImports(
                `import * as x from "lib";`,
                `import y from "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = parseImports(
                `import y, * as x from "lib";`,
            );
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Combine namespace import with property import", () => {
            const sortedImports = parseImports(
                `import * as x from "lib";`,
                `import { y } from "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = sortedImports;
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Combine default import with property import", () => {
            const sortedImports = parseImports(
                `import x from "lib";`,
                `import { y } from "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = parseImports(
                `import x, { y } from "lib";`,
            );
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
                `import { a } from "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = parseImports(
                `import "lib";`,
                `import * as x from "lib";`,
                `import * as y from "lib";`,
                `import { a, b, default as w, default as z } from "lib";`,
            );
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        // This is descriptive, rather than normative
        it("Combine two namespace imports with one default import", () => {
            const sortedImports = parseImports(
                `import * as x from "lib";`,
                `import * as y from "lib";`,
                `import z from "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = sortedImports;
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Combine type-only imports separately from other imports", () => {
            const sortedImports = parseImports(
                `import type { x } from "lib";`,
                `import type { y } from "lib";`,
                `import { z } from "lib";`,
            );
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = parseImports(
                `import { z } from "lib";`,
                `import type { x, y } from "lib";`,
            );
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Do not combine type-only default, namespace, or named imports with each other", () => {
            const sortedImports = parseImports(
                `import type { x } from "lib";`,
                `import type * as y from "lib";`,
                `import type z from "lib";`,
            );
            // Default import could be rewritten as a named import to combine with `x`,
            // but seems of debatable merit.
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true);
            const expectedCoalescedImports = actualCoalescedImports;
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });
    });

    describe("Coalesce exports", () => {
        it("No exports", () => {
            assert.isEmpty(ts.OrganizeImports.testCoalesceExports([], /*ignoreCase*/ true));
        });

        it("Sort specifiers - case-insensitive", () => {
            const sortedExports = parseExports(`export { default as M, a as n, B, y, Z as O } from "lib";`);
            const actualCoalescedExports = ts.OrganizeImports.testCoalesceExports(sortedExports, /*ignoreCase*/ true);
            const expectedCoalescedExports = parseExports(`export { B, default as M, a as n, Z as O, y } from "lib";`);
            assertListEqual(actualCoalescedExports, expectedCoalescedExports);
        });

        it("Sort specifiers - type-only-inline", () => {
            const sortedImports = parseImports(`import { type z, y, type x, c, type b, a } from "lib";`);
            const actualCoalescedImports = ts.OrganizeImports.testCoalesceImports(sortedImports, /*ignoreCase*/ true, ts.getSourceFileOfNode(sortedImports[0]), { organizeImportsTypeOrder: "inline" });
            const expectedCoalescedImports = parseImports(`import { a, type b, c, type x, y, type z } from "lib";`);
            assertListEqual(actualCoalescedImports, expectedCoalescedImports);
        });

        it("Combine namespace re-exports", () => {
            const sortedExports = parseExports(
                `export * from "lib";`,
                `export * from "lib";`,
            );
            const actualCoalescedExports = ts.OrganizeImports.testCoalesceExports(sortedExports, /*ignoreCase*/ true);
            const expectedCoalescedExports = parseExports(`export * from "lib";`);
            assertListEqual(actualCoalescedExports, expectedCoalescedExports);
        });

        it("Combine property exports", () => {
            const sortedExports = parseExports(
                `export { x };`,
                `export { y as z };`,
            );
            const actualCoalescedExports = ts.OrganizeImports.testCoalesceExports(sortedExports, /*ignoreCase*/ true);
            const expectedCoalescedExports = parseExports(`export { x, y as z };`);
            assertListEqual(actualCoalescedExports, expectedCoalescedExports);
        });

        it("Combine property re-exports", () => {
            const sortedExports = parseExports(
                `export { x } from "lib";`,
                `export { y as z } from "lib";`,
            );
            const actualCoalescedExports = ts.OrganizeImports.testCoalesceExports(sortedExports, /*ignoreCase*/ true);
            const expectedCoalescedExports = parseExports(`export { x, y as z } from "lib";`);
            assertListEqual(actualCoalescedExports, expectedCoalescedExports);
        });

        it("Combine namespace re-export with property re-export", () => {
            const sortedExports = parseExports(
                `export * from "lib";`,
                `export { y } from "lib";`,
            );
            const actualCoalescedExports = ts.OrganizeImports.testCoalesceExports(sortedExports, /*ignoreCase*/ true);
            const expectedCoalescedExports = sortedExports;
            assertListEqual(actualCoalescedExports, expectedCoalescedExports);
        });

        it("Combine many exports", () => {
            const sortedExports = parseExports(
                `export { x };`,
                `export { y as w, z as default };`,
                `export { w as q };`,
            );
            const actualCoalescedExports = ts.OrganizeImports.testCoalesceExports(sortedExports, /*ignoreCase*/ true);
            const expectedCoalescedExports = parseExports(
                `export { z as default, w as q, y as w, x };`,
            );
            assertListEqual(actualCoalescedExports, expectedCoalescedExports);
        });

        it("Combine many re-exports", () => {
            const sortedExports = parseExports(
                `export { x as a, y } from "lib";`,
                `export * from "lib";`,
                `export { z as b } from "lib";`,
            );
            const actualCoalescedExports = ts.OrganizeImports.testCoalesceExports(sortedExports, /*ignoreCase*/ true);
            const expectedCoalescedExports = parseExports(
                `export * from "lib";`,
                `export { x as a, z as b, y } from "lib";`,
            );
            assertListEqual(actualCoalescedExports, expectedCoalescedExports);
        });

        it("Keep type-only exports separate", () => {
            const sortedExports = parseExports(
                `export { x };`,
                `export type { y };`,
            );
            const actualCoalescedExports = ts.OrganizeImports.testCoalesceExports(sortedExports, /*ignoreCase*/ true);
            const expectedCoalescedExports = sortedExports;
            assertListEqual(actualCoalescedExports, expectedCoalescedExports);
        });

        it("Combine type-only exports", () => {
            const sortedExports = parseExports(
                `export type { x };`,
                `export type { y };`,
            );
            const actualCoalescedExports = ts.OrganizeImports.testCoalesceExports(sortedExports, /*ignoreCase*/ true);
            const expectedCoalescedExports = parseExports(
                `export type { x, y };`,
            );
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
            const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, ts.testFormatSettings, ts.emptyOptions);
            assert.isEmpty(changes);
        });

        it("doesn't crash on shorthand ambient module", () => {
            const testFile = {
                path: "/a.ts",
                content: "declare module '*';",
            };
            const languageService = makeLanguageService(testFile);
            const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, ts.testFormatSettings, ts.emptyOptions);
            assert.isEmpty(changes);
        });

        it("doesn't return any changes when the text would be identical", () => {
            const testFile = {
                path: "/a.ts",
                content: `import { f } from 'foo';\nf();`,
            };
            const languageService = makeLanguageService(testFile);
            const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, ts.testFormatSettings, ts.emptyOptions);
            assert.isEmpty(changes);
        });

        testDetectionBaseline("detection1", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `import { abc, Abc } from 'b';
import { I, M, R } from 'a';
const x = abc + Abc + I + M + R;`,
        });

        testDetectionBaseline("detection2", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `import { abc, Abc } from 'a';
import { I, M, R } from 'b';
const x = abc + Abc + I + M + R;`,
        });

        testDetectionBaseline("detection3", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `import { I, M, R } from 'a';
import { Abc, abc } from 'b';
const x = abc + Abc + I + M + R;`,
        });

        testDetectionBaseline("detection4", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `import { I, M, R } from 'a';
import { abc, Abc } from 'b';
const x = abc + Abc + I + M + R;`,
        });

        testDetectionBaseline("detection5", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `import {
    Type9,
    Type2,
    Type8,
    Type7,
    Type5,
    Type4,
    Type3,
    Type1,
    func9,
    Type6,
    func5,
    func6,
    func8,
    func4,
    func7,
    func3,
    func2,
    func1,
} from "foo";
console.log(Type1, Type2, Type3, Type4, Type5, Type6, Type7, Type8, Type9, func1, func2, func3, func4, func5, func6, func7, func8, func9);`,
        });

        testDetectionBaseline("detection6", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `import { A, B, a, b } from 'foo';
console.log(A, B, a, b);`,
        });

        testDetectionBaseline("detection7", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `import { A, a, B, b } from 'foo';
console.log(A, B, a, b);`,
        });

        testDetectionBaseline("detection8", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `import { A, a, b, B } from 'foo';
console.log(A, B, a, b);`,
        });

        testDetectionBaseline("detection9", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `import { a, b, A, B } from 'foo';
console.log(A, B, a, b);`,
        });

        testDetectionBaseline("detection10", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `import { a, A, b, B } from 'foo';
console.log(A, B, a, b);`,
        });

        testOrganizeImports("parseErrors", /*skipDestructiveCodeActions*/ false, {
            path: "/test.js",
            content: `declare module 'mod1' {
    declare export type P = {|
    |};
    declare export type F = {|
        ...$Exact<Node>,
        await?: Span,
    |};
    declare export type S = {|
    |};
    declare export type C = {|
    |};
}

declare module 'mod2' {
    import type {
        U,
    } from 'mod1';
}`,
        });

        testOrganizeImports("Renamed_used", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `
import { F1 as EffOne, F2 as EffTwo } from "lib";
EffOne();
`,
        }, libFile);

        testOrganizeImports("Simple", /*skipDestructiveCodeActions*/ false, {
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
        }, libFile);

        testOrganizeImports("Unused_Some", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `
import { F1, F2 } from "lib";
import * as NS from "lib";
import D from "lib";

D();
`,
        }, libFile);

        describe("skipDestructiveCodeActions=true", () => {
            testOrganizeImports("Syntax_Error_Body_skipDestructiveCodeActions", /*skipDestructiveCodeActions*/ true, {
                path: "/test.ts",
                content: `
import { F1, F2 } from "lib";
import * as NS from "lib";
import D from "lib";

class class class;
D;
`,
            }, libFile);
        });

        testOrganizeImports("Syntax_Error_Imports_skipDestructiveCodeActions", /*skipDestructiveCodeActions*/ true, {
            path: "/test.ts",
            content: `
import { F1, F2 class class class; } from "lib";
import * as NS from "lib";
class class class;
import D from "lib";

D;
`,
        }, libFile);

        describe("skipDestructiveCodeActions=false", () => {
            testOrganizeImports("Syntax_Error_Body", /*skipDestructiveCodeActions*/ false, {
                path: "/test.ts",
                content: `
import { F1, F2 } from "lib";
import * as NS from "lib";
import D from "lib";

class class class;
D;
`,
            }, libFile);

            testOrganizeImports("Syntax_Error_Imports", /*skipDestructiveCodeActions*/ false, {
                path: "/test.ts",
                content: `
import { F1, F2 class class class; } from "lib";
import * as NS from "lib";
class class class;
import D from "lib";

D;
`,
            }, libFile);
        });

        it("doesn't return any changes when the text would be identical", () => {
            const testFile = {
                path: "/a.ts",
                content: `import { f } from 'foo';\nf();`,
            };
            const languageService = makeLanguageService(testFile);
            const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, ts.testFormatSettings, ts.emptyOptions);
            assert.isEmpty(changes);
        });

        testOrganizeImports("Unused_All", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `
import { F1, F2 } from "lib";
import * as NS from "lib";
import D from "lib";
`,
        }, libFile);

        it("Unused_Empty", () => {
            const testFile = {
                path: "/test.ts",
                content: `
import { } from "lib";
`,
            };
            const languageService = makeLanguageService(testFile);
            const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, ts.testFormatSettings, ts.emptyOptions);
            assert.isEmpty(changes);
        });

        testOrganizeImports("Unused_false_positive_module_augmentation", /*skipDestructiveCodeActions*/ false, {
            path: "/test.d.ts",
            content: `
import foo from 'foo';
import { Caseless } from 'caseless';

declare module 'foo' {}
declare module 'caseless' {
    interface Caseless {
        test(name: KeyType): boolean;
    }
}`,
        });

        testOrganizeImports("Unused_preserve_imports_for_module_augmentation_in_non_declaration_file", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `
import foo from 'foo';
import { Caseless } from 'caseless';

declare module 'foo' {}
declare module 'caseless' {
    interface Caseless {
        test(name: KeyType): boolean;
    }
}`,
        });

        it("Unused_false_positive_shorthand_assignment", () => {
            const testFile = {
                path: "/test.ts",
                content: `
import { x } from "a";
const o = { x };
`,
            };
            const languageService = makeLanguageService(testFile);
            const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, ts.testFormatSettings, ts.emptyOptions);
            assert.isEmpty(changes);
        });

        it("Unused_false_positive_export_shorthand", () => {
            const testFile = {
                path: "/test.ts",
                content: `
import { x } from "a";
export { x };
`,
            };
            const languageService = makeLanguageService(testFile);
            const changes = languageService.organizeImports({ type: "file", fileName: testFile.path }, ts.testFormatSettings, ts.emptyOptions);
            assert.isEmpty(changes);
        });

        testOrganizeImports("MoveToTop", /*skipDestructiveCodeActions*/ false, {
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
        }, libFile);

        /* eslint-disable no-template-curly-in-string */
        testOrganizeImports("MoveToTop_Invalid", /*skipDestructiveCodeActions*/ false, {
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
        }, libFile);
        /* eslint-enable no-template-curly-in-string */

        testOrganizeImports("TypeOnly", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `
import { X } from "lib";
import type Y from "lib";
import { Z } from "lib";
import type { A, B } from "lib";

export { A, B, X, Y, Z };`,
        });

        testOrganizeImports(
            "CoalesceMultipleModules",
            /*skipDestructiveCodeActions*/ false,
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
            { path: "/lib2.ts", content: "export const a = 3, c = 4;" },
        );

        testOrganizeImports("CoalesceTrivia", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `
/*A*/import /*B*/ { /*C*/ F2 /*D*/ } /*E*/ from /*F*/ "lib" /*G*/;/*H*/ //I
/*J*/import /*K*/ { /*L*/ F1 /*M*/ } /*N*/ from /*O*/ "lib" /*P*/;/*Q*/ //R

F1();
F2();
`,
        }, libFile);

        testOrganizeImports(
            "SortTrivia",
            /*skipDestructiveCodeActions*/ false,
            {
                path: "/test.ts",
                content: `
/*A*/import /*B*/ "lib2" /*C*/;/*D*/ //E
/*F*/import /*G*/ "lib1" /*H*/;/*I*/ //J
`,
            },
            { path: "/lib1.ts", content: "" },
            { path: "/lib2.ts", content: "" },
        );

        testOrganizeImports("UnusedTrivia1", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `
/*A*/import /*B*/ { /*C*/ F1 /*D*/ } /*E*/ from /*F*/ "lib" /*G*/;/*H*/ //I
`,
        }, libFile);

        testOrganizeImports("UnusedTrivia2", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `
/*A*/import /*B*/ { /*C*/ F1 /*D*/, /*E*/ F2 /*F*/ } /*G*/ from /*H*/ "lib" /*I*/;/*J*/ //K

F1();
`,
        }, libFile);

        testOrganizeImports("UnusedHeaderComment", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `
// Header
import { F1 } from "lib";
`,
        }, libFile);

        testOrganizeImports(
            "SortHeaderComment",
            /*skipDestructiveCodeActions*/ false,
            {
                path: "/test.ts",
                content: `
// Header
import "lib2";
import "lib1";
`,
            },
            { path: "/lib1.ts", content: "" },
            { path: "/lib2.ts", content: "" },
        );

        testOrganizeImports("AmbientModule", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `
declare module "mod" {
    import { F1 } from "lib";
    import * as NS from "lib";
    import { F2 } from "lib";

    function F(f1: {} = F1, f2: {} = F2) {}
}
`,
        }, libFile);

        testOrganizeImports("TopLevelAndAmbientModule", /*skipDestructiveCodeActions*/ false, {
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
        }, libFile);

        testOrganizeImports("JsxFactoryUsedJsx", /*skipDestructiveCodeActions*/ false, {
            path: "/test.jsx",
            content: `
import { React, Other } from "react";

<div/>;
`,
        }, reactLibFile);

        testOrganizeImports("JsxFactoryUsedJs", /*skipDestructiveCodeActions*/ false, {
            path: "/test.js",
            content: `
import { React, Other } from "react";

<div/>;
`,
        }, reactLibFile);

        testOrganizeImports("JsxFactoryUsedTsx", /*skipDestructiveCodeActions*/ false, {
            path: "/test.tsx",
            content: `
import { React, Other } from "react";

<div/>;
`,
        }, reactLibFile);

        // TS files are not JSX contexts, so the parser does not treat `<div/>` as a JSX element.
        testOrganizeImports("JsxFactoryUsedTs", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `
import { React, Other } from "react";

<div/>;
`,
        }, reactLibFile);

        testOrganizeImports("JsxFactoryUnusedJsx", /*skipDestructiveCodeActions*/ false, {
            path: "/test.jsx",
            content: `
import { React, Other } from "react";
`,
        }, reactLibFile);

        // Note: Since the file extension does not end with "x", the jsx compiler option
        // will not be enabled.  The import should be retained regardless.
        testOrganizeImports("JsxFactoryUnusedJs", /*skipDestructiveCodeActions*/ false, {
            path: "/test.js",
            content: `
import { React, Other } from "react";
`,
        }, reactLibFile);

        testOrganizeImports("JsxFactoryUnusedTsx", /*skipDestructiveCodeActions*/ false, {
            path: "/test.tsx",
            content: `
import { React, Other } from "react";
`,
        }, reactLibFile);

        testOrganizeImports("JsxFactoryUnusedTs", /*skipDestructiveCodeActions*/ false, {
            path: "/test.ts",
            content: `
import { React, Other } from "react";
`,
        }, reactLibFile);

        testOrganizeImports("JsxPragmaTsx", /*skipDestructiveCodeActions*/ false, {
            path: "/test.tsx",
            content: `/** @jsx jsx */

import { Global, jsx } from '@emotion/core';
import * as React from 'react';

export const App: React.FunctionComponent = _ => <Global><h1>Hello!</h1></Global>
`,
        }, {
            path: "/@emotion/core/index.d.ts",
            content: `import {  createElement } from 'react'
export const jsx: typeof createElement;
export function Global(props: any): ReactElement<any>;`,
        }, {
            path: reactLibFile.path,
            content: `${reactLibFile.content}
export namespace React {
    interface FunctionComponent {
    }
}
`,
        });

        testOrganizeImports("JsxFragmentPragmaTsx", /*skipDestructiveCodeActions*/ false, {
            path: "/test.tsx",
            content: `/** @jsx h */
/** @jsxFrag frag */
import { h, frag } from "@foo/core";

const elem = <><div>Foo</div></>;
`,
        }, {
            path: "/@foo/core/index.d.ts",
            content: `export function h(): void;
export function frag(): void;
`,
        });

        describe("Exports", () => {
            testOrganizeExports("MoveToTop", {
                path: "/test.ts",
                content: `
export { F1, F2 } from "lib";
1;
export * from "lib";
2;
`,
            }, libFile);

            /* eslint-disable no-template-curly-in-string */
            testOrganizeExports("MoveToTop_Invalid", {
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
            }, libFile);
            /* eslint-enable no-template-curly-in-string */

            testOrganizeExports("MoveToTop_WithImportsFirst", {
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
            }, libFile);

            testOrganizeExports("MoveToTop_WithExportsFirst", {
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
            }, libFile);

            testOrganizeExports(
                "CoalesceMultipleModules",
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
                { path: "/lib2.ts", content: "export const a = 3, c = 4;" },
            );

            testOrganizeExports("CoalesceTrivia", {
                path: "/test.ts",
                content: `
/*A*/export /*B*/ { /*C*/ F2 /*D*/ } /*E*/ from /*F*/ "lib" /*G*/;/*H*/ //I
/*J*/export /*K*/ { /*L*/ F1 /*M*/ } /*N*/ from /*O*/ "lib" /*P*/;/*Q*/ //R
`,
            }, libFile);

            testOrganizeExports(
                "SortTrivia",
                {
                    path: "/test.ts",
                    content: `
/*A*/export /*B*/ * /*C*/ from /*D*/ "lib2" /*E*/;/*F*/ //G
/*H*/export /*I*/ * /*J*/ from /*K*/ "lib1" /*L*/;/*M*/ //N
`,
                },
                { path: "/lib1.ts", content: "" },
                { path: "/lib2.ts", content: "" },
            );

            testOrganizeExports(
                "SortHeaderComment",
                {
                    path: "/test.ts",
                    content: `
// Header
export * from "lib2";
export * from "lib1";
`,
                },
                { path: "/lib1.ts", content: "" },
                { path: "/lib2.ts", content: "" },
            );

            testOrganizeExports("AmbientModule", {
                path: "/test.ts",
                content: `
declare module "mod" {
    export { F1 } from "lib";
    export * from "lib";
    export { F2 } from "lib";
}
    `,
            }, libFile);

            testOrganizeExports("TopLevelAndAmbientModule", {
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
            }, libFile);
        });

        function testOrganizeExports(testName: string, testFile: File, ...otherFiles: File[]) {
            testOrganizeImports(`${testName}.exports`, /*skipDestructiveCodeActions*/ true, testFile, ...otherFiles);
        }

        function testOrganizeImports(testName: string, skipDestructiveCodeActions: boolean, testFile: File, ...otherFiles: File[]) {
            it(testName, () => runBaseline(`organizeImports/${testName}.ts`, skipDestructiveCodeActions, testFile, ...otherFiles));
        }

        function runBaseline(baselinePath: string, skipDestructiveCodeActions: boolean, testFile: File, ...otherFiles: File[]) {
            const { path: testPath, content: testContent } = testFile;
            const languageService = makeLanguageService(testFile, ...otherFiles);
            const changes = languageService.organizeImports({ skipDestructiveCodeActions, type: "file", fileName: testPath }, ts.testFormatSettings, ts.emptyOptions);

            if (changes.length !== 0) {
                assert.equal(changes.length, 1);
                assert.equal(changes[0].fileName, testPath);

                const newText = ts.textChanges.applyChanges(testContent, changes[0].textChanges);
                Harness.Baseline.runBaseline(
                    baselinePath,
                    [
                        "// ==ORIGINAL==",
                        testContent,
                        "// ==ORGANIZED==",
                        newText,
                    ].join(newLineCharacter),
                );
            }
            else {
                Harness.Baseline.runBaseline(
                    baselinePath,
                    [
                        "// ==ORIGINAL==",
                        "// ==NO CHANGES==",
                        testContent,
                    ].join(newLineCharacter),
                );
            }
        }

        function testDetectionBaseline(testName: string, skipDestructiveCodeActions: boolean, testFile: File, ...otherFiles: File[]) {
            it(testName, () => {
                // this differs from the test above, in that it doesn't assert that there are changes
                const baselinePath = `organizeImports/${testName}.ts`;
                const { path: testPath, content: testContent } = testFile;
                const languageService = makeLanguageService(testFile, ...otherFiles);
                const changes = languageService.organizeImports({ skipDestructiveCodeActions, type: "file", fileName: testPath }, ts.testFormatSettings, ts.emptyOptions);

                const newText = changes.length ? ts.textChanges.applyChanges(testContent, changes[0].textChanges) : testContent;
                Harness.Baseline.runBaseline(
                    baselinePath,
                    [
                        "// ==ORIGINAL==",
                        testContent,
                        "// ==ORGANIZED==",
                        newText,
                    ].join(newLineCharacter),
                );
            });
        }

        function makeLanguageService(...files: File[]) {
            const host = createServerHost(files);
            const projectService = new TestProjectService({ host, useSingleInferredProject: true });
            projectService.setCompilerOptionsForInferredProjects({ jsx: files.some(f => f.path.endsWith("x")) ? ts.JsxEmit.React : ts.JsxEmit.None });
            files.forEach(f => projectService.openClientFile(f.path));
            return projectService.inferredProjects[0].getLanguageService();
        }
    });

    function parseImports(...importStrings: string[]): readonly ts.ImportDeclaration[] {
        const sourceFile = ts.createSourceFile("a.ts", importStrings.join("\n"), ts.ScriptTarget.ES2015, /*setParentNodes*/ true, ts.ScriptKind.TS);
        const imports = ts.filter(sourceFile.statements, ts.isImportDeclaration);
        assert.equal(imports.length, importStrings.length);
        return imports;
    }

    function parseExports(...exportStrings: string[]): readonly ts.ExportDeclaration[] {
        const sourceFile = ts.createSourceFile("a.ts", exportStrings.join("\n"), ts.ScriptTarget.ES2015, /*setParentNodes*/ true, ts.ScriptKind.TS);
        const exports = ts.filter(sourceFile.statements, ts.isExportDeclaration);
        assert.equal(exports.length, exportStrings.length);
        return exports;
    }

    function assertEqual(node1?: ts.Node, node2?: ts.Node) {
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
            case ts.SyntaxKind.ImportDeclaration:
                const decl1 = node1 as ts.ImportDeclaration;
                const decl2 = node2 as ts.ImportDeclaration;
                assertEqual(decl1.importClause, decl2.importClause);
                assertEqual(decl1.moduleSpecifier, decl2.moduleSpecifier);
                break;
            case ts.SyntaxKind.ImportClause:
                const clause1 = node1 as ts.ImportClause;
                const clause2 = node2 as ts.ImportClause;
                assertEqual(clause1.name, clause2.name);
                assertEqual(clause1.namedBindings, clause2.namedBindings);
                break;
            case ts.SyntaxKind.NamespaceImport:
                const nsi1 = node1 as ts.NamespaceImport;
                const nsi2 = node2 as ts.NamespaceImport;
                assertEqual(nsi1.name, nsi2.name);
                break;
            case ts.SyntaxKind.NamedImports:
                const ni1 = node1 as ts.NamedImports;
                const ni2 = node2 as ts.NamedImports;
                assertListEqual(ni1.elements, ni2.elements);
                break;
            case ts.SyntaxKind.ImportSpecifier:
                const is1 = node1 as ts.ImportSpecifier;
                const is2 = node2 as ts.ImportSpecifier;
                assertEqual(is1.name, is2.name);
                assertEqual(is1.propertyName, is2.propertyName);
                break;
            case ts.SyntaxKind.ExportDeclaration:
                const ed1 = node1 as ts.ExportDeclaration;
                const ed2 = node2 as ts.ExportDeclaration;
                assertEqual(ed1.exportClause, ed2.exportClause);
                assertEqual(ed1.moduleSpecifier, ed2.moduleSpecifier);
                break;
            case ts.SyntaxKind.NamedExports:
                const ne1 = node1 as ts.NamedExports;
                const ne2 = node2 as ts.NamedExports;
                assertListEqual(ne1.elements, ne2.elements);
                break;
            case ts.SyntaxKind.ExportSpecifier:
                const es1 = node1 as ts.ExportSpecifier;
                const es2 = node2 as ts.ExportSpecifier;
                assertEqual(es1.name, es2.name);
                assertEqual(es1.propertyName, es2.propertyName);
                break;
            case ts.SyntaxKind.Identifier:
                const id1 = node1 as ts.Identifier;
                const id2 = node2 as ts.Identifier;
                assert.equal(id1.text, id2.text);
                break;
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                const sl1 = node1 as ts.LiteralLikeNode;
                const sl2 = node2 as ts.LiteralLikeNode;
                assert.equal(sl1.text, sl2.text);
                break;
            default:
                assert.equal(node1.getText(), node2.getText());
                break;
        }
    }

    function assertListEqual(list1: readonly ts.Node[], list2: readonly ts.Node[]) {
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
