/// <reference path="..\..\..\src\harness\harness.ts" />
/// <reference path="..\..\..\src\harness\virtualFileSystem.ts" />


namespace ts {
    describe("Organize imports", () => {
        describe("Sort imports", () => {
            it("No imports", () => {
                assert.isEmpty(sortImports([]));
            });

            it("One import", () => {
                const unsortedImports = parseImports(`import "lib";`);
                const actualSortedImports = sortImports(unsortedImports);
                const expectedSortedImports = unsortedImports;
                assertListEqual(expectedSortedImports, actualSortedImports);
            });

            it("Stable - import kind", () => {
                assertUnaffectedBySort(
                    `import "lib";`,
                    `import * as x from "lib";`,
                    `import x from "lib";`,
                    `import {x} from "lib";`);
            });

            it("Stable - default property alias", () => {
                assertUnaffectedBySort(
                    `import x from "lib";`,
                    `import y from "lib";`);
            });

            it("Stable - module alias", () => {
                assertUnaffectedBySort(
                    `import * as x from "lib";`,
                    `import * as y from "lib";`);
            });

            it("Stable - symbol", () => {
                assertUnaffectedBySort(
                    `import {x} from "lib";`,
                    `import {y} from "lib";`);
            });

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

            it("Sort - invalid vs invalid", () => {
                assertSortsBefore(
                    // tslint:disable-next-line no-invalid-template-strings
                    "import y from `${'lib1'}`;",
                    // tslint:disable-next-line no-invalid-template-strings
                    "import x from `${'lib2'}`;");
            });

            it("Sort - relative vs non-relative", () => {
                assertSortsBefore(
                    `import y from "lib";`,
                    `import x from "./lib";`);
            });

            it("Sort - non-relative vs invalid", () => {
                assertSortsBefore(
                    `import y from "lib";`,
                    // tslint:disable-next-line no-invalid-template-strings
                    "import x from `${'lib'}`;");
            });

            it("Sort - relative vs invalid", () => {
                assertSortsBefore(
                    `import y from "./lib";`,
                    // tslint:disable-next-line no-invalid-template-strings
                    "import x from `${'lib'}`;");
            });

            function assertUnaffectedBySort(...importStrings: string[]) {
                const unsortedImports1 = parseImports(...importStrings);
                assertListEqual(unsortedImports1, sortImports(unsortedImports1));

                const unsortedImports2 = reverse(unsortedImports1);
                assertListEqual(unsortedImports2, sortImports(unsortedImports2));
            }

            function assertSortsBefore(importString1: string, importString2: string) {
                const imports = parseImports(importString1, importString2);
                assertListEqual(imports, sortImports(imports));
                assertListEqual(imports, sortImports(reverse(imports)));
            }
        });

        describe("Coalesce imports", () => {
            it("No imports", () => {
                assert.isEmpty(coalesceImports([]));
            });

            it("Sort specifiers", () => {
                const sortedImports = parseImports(`import { default as m, a as n, b, y, z as o } from "lib";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(`import { a as n, b, default as m, y, z as o } from "lib";`);
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
            });

            it("Combine side-effect-only imports", () => {
                const sortedImports = parseImports(
                    `import "lib";`,
                    `import "lib";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(`import "lib";`);
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
            });

            it("Combine namespace imports", () => {
                const sortedImports = parseImports(
                    `import * as x from "lib";`,
                    `import * as y from "lib";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = sortedImports;
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
            });

            it("Combine default imports", () => {
                const sortedImports = parseImports(
                    `import x from "lib";`,
                    `import y from "lib";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(`import { default as x, default as y } from "lib";`);
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
            });

            it("Combine property imports", () => {
                const sortedImports = parseImports(
                    `import { x } from "lib";`,
                    `import { y as z } from "lib";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(`import { x, y as z } from "lib";`);
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
            });

            it("Combine side-effect-only import with namespace import", () => {
                const sortedImports = parseImports(
                    `import "lib";`,
                    `import * as x from "lib";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = sortedImports;
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
            });

            it("Combine side-effect-only import with default import", () => {
                const sortedImports = parseImports(
                    `import "lib";`,
                    `import x from "lib";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = sortedImports;
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
            });

            it("Combine side-effect-only import with property import", () => {
                const sortedImports = parseImports(
                    `import "lib";`,
                    `import { x } from "lib";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = sortedImports;
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
            });

            it("Combine namespace import with default import", () => {
                const sortedImports = parseImports(
                    `import * as x from "lib";`,
                    `import y from "lib";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(
                    `import y, * as x from "lib";`);
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
            });

            it("Combine namespace import with property import", () => {
                const sortedImports = parseImports(
                    `import * as x from "lib";`,
                    `import { y } from "lib";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = sortedImports;
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
            });

            it("Combine default import with property import", () => {
                const sortedImports = parseImports(
                    `import x from "lib";`,
                    `import { y } from "lib";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(
                    `import x, { y } from "lib";`);
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
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
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(
                    `import "lib";`,
                    `import * as x from "lib";`,
                    `import * as y from "lib";`,
                    `import { a, b, default as w, default as z } from "lib";`);
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
            });

            it("Combine imports from different modules", () => {
                const sortedImports = parseImports(
                    `import { d } from "lib1";`,
                    `import { b } from "lib1";`,
                    `import { c } from "lib2";`,
                    `import { a } from "lib2";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = parseImports(
                    `import { b, d } from "lib1";`,
                    `import { a, c } from "lib2";`);
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
            });

            // This is descriptive, rather than normative
            it("Combine two namespace imports with one default import", () => {
                const sortedImports = parseImports(
                    `import * as x from "lib";`,
                    `import * as y from "lib";`,
                    `import z from "lib";`);
                const actualCoalescedImports = coalesceImports(sortedImports);
                const expectedCoalescedImports = sortedImports;
                assertListEqual(expectedCoalescedImports, actualCoalescedImports);
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

            function testOrganizeImports(testName: string, testFile: TestFSWithWatch.FileOrFolder, ...otherFiles: TestFSWithWatch.FileOrFolder[]) {
                it(testName, () => runBaseline(`organizeImports/${testName}.ts`, testFile, ...otherFiles));
            }

            function runBaseline(baselinePath: string, testFile: TestFSWithWatch.FileOrFolder, ...otherFiles: TestFSWithWatch.FileOrFolder[]) {
                const { path: testPath, content: testContent } = testFile;
                const languageService = makeLanguageService(testFile, ...otherFiles);
                const changes = languageService.organizeImports({ type: "file", fileName: testPath }, testFormatOptions);
                assert.equal(1, changes.length);
                assert.equal(testPath, changes[0].fileName);

                Harness.Baseline.runBaseline(baselinePath, () => {
                    const data: string[] = [];
                    data.push(`// ==ORIGINAL==`);
                    data.push(testContent);

                    data.push(`// ==ORGANIZED==`);
                    const newText = textChanges.applyChanges(testContent, changes[0].textChanges);
                    data.push(newText);

                    return data.join(newLineCharacter);
                });
            }

            function makeLanguageService(...files: TestFSWithWatch.FileOrFolder[]) {
                const host = projectSystem.createServerHost(files);
                const projectService = projectSystem.createProjectService(host, { useSingleInferredProject: true });
                files.forEach(f => projectService.openClientFile(f.path));
                return projectService.inferredProjects[0].getLanguageService();
            }
        });

        function parseImports(...importStrings: string[]): ReadonlyArray<ImportDeclaration> {
            const sourceFile = createSourceFile("a.ts", importStrings.join("\n"), ScriptTarget.ES2015, /*setParentNodes*/ true, ScriptKind.TS);
            const imports = filter(sourceFile.statements, isImportDeclaration);
            assert.equal(importStrings.length, imports.length);
            return imports;
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

        function assertListEqual(list1: ReadonlyArray<Node>, list2: ReadonlyArray<Node>) {
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

        function reverse<T>(list: ReadonlyArray<T>) {
            const result = [];
            for (let i = list.length - 1; i >= 0; i--) {
                result.push(list[i]);
            }
            return result;
        }
    });
}