import {
    type __String,
    cast,
    escapeLeadingUnderscores,
    type Expression,
    getJSDocTags,
    getSynthesizedDeepClone,
    InternalSymbolName,
    isCallExpression,
    isFunctionDeclaration,
    isIdentifier,
    isImportDeclaration,
    isJSDocParameterTag,
    isNamedImports,
    isReturnStatement,
    isShorthandPropertyAssignment,
    isStringLiteral,
    isTemplateHead,
    isTemplateMiddle,
    isTemplateTail,
    isTypeAliasDeclaration,
    isTypeNode,
    isVariableDeclarationList,
    isVariableStatement,
    type Node,
    type NodeArray,
    NodeFlags,
    SyntaxKind,
    unescapeLeadingUnderscores,
} from "@typescript/native-preview/unstable/ast";
import {
    createArrayTypeNode,
    createFunctionTypeNode,
    createIdentifier,
    createKeywordTypeNode,
    createParameterDeclaration,
    createToken,
    createTypeAliasDeclaration,
    createTypeReferenceNode,
    createUnionTypeNode,
} from "@typescript/native-preview/unstable/ast/factory";
import { visitEachChild } from "@typescript/native-preview/unstable/ast/visitor";
import {
    API,
    type BigIntLiteralType,
    type ConditionalType,
    DiagnosticCategory,
    type FreshableType,
    type ImportAdderAction,
    type IndexedAccessType,
    type IndexType,
    type InterfaceType,
    type IntrinsicType,
    isErrorType,
    type LiteralType,
    ModifierFlags,
    ModuleKind,
    ObjectFlags,
    SignatureKind,
    type StringMappingType,
    SymbolFlags,
    type TemplateLiteralType,
    type TextEdit,
    TypeFlags,
    type TypeParameter,
    TypePredicateKind,
    type TypeReference,
    type UnionOrIntersectionType,
} from "@typescript/native-preview/unstable/async"; // @sync: } from "@typescript/native-preview/unstable/sync";
import { createVirtualFileSystem } from "@typescript/native-preview/unstable/fs";
import type { FileSystem } from "@typescript/native-preview/unstable/fs";
import assert from "node:assert";
import { globSync } from "node:fs";
import { resolve } from "node:path";
import {
    describe,
    test,
} from "node:test";
import { fileURLToPath } from "node:url";
import { runBenchmarks } from "./api.bench.ts";

const defaultFiles = {
    "/tsconfig.json": "{}",
    "/src/index.ts": `import { foo } from './foo';`,
    "/src/foo.ts": `export const foo = 42;`,
};

describe("API", () => {
    test("parseConfigFile", async () => {
        const api = spawnAPI();
        try {
            const config = await api.parseConfigFile("/tsconfig.json");
            assert.deepEqual(config.fileNames, ["/src/index.ts", "/src/foo.ts"]);
            assert.deepEqual(config.options, { configFilePath: "/tsconfig.json" });
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getImmediateAliasedSymbol", () => {
    test("resolves one level of alias indirection", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/foo.ts": `export const foo = 42;`,
            "/src/main.ts": `import { foo } from "./foo";\nexport const usage = foo;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = `import { foo } from "./foo";`.indexOf("foo }");
            const aliasSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(aliasSymbol);
            const aliased = await project.checker.getImmediateAliasedSymbol(aliasSymbol);
            assert.ok(aliased, "Should resolve the immediate aliased symbol");
            assert.equal(aliased.name, "foo");
        }
        finally {
            await api.close();
        }
    });
});

describe("Snapshot", () => {
    test("updateSnapshot returns snapshot with projects", async () => {
        const api = spawnAPI();
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            assert.ok(snapshot);
            assert.ok(snapshot.id);
            assert.ok(snapshot.getProjects().length > 0);
            assert.ok(snapshot.getProject("/tsconfig.json"));
        }
        finally {
            await api.close();
        }
    });

    test("getSymbolAtPosition", async () => {
        const api = spawnAPI();
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const symbol = await project.checker.getSymbolAtPosition("/src/index.ts", 9);
            assert.ok(symbol);
            assert.equal(symbol.name, "foo");
            assert.ok(symbol.flags & SymbolFlags.Alias);
        }
        finally {
            await api.close();
        }
    });

    test("getSymbolAtLocation", async () => {
        const api = spawnAPI();
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);
            const node = cast(
                cast(sourceFile.statements[0], isImportDeclaration).importClause?.namedBindings,
                isNamedImports,
            ).elements[0].name;
            assert.ok(node);
            const symbol = await project.checker.getSymbolAtLocation(node);
            assert.ok(symbol);
            assert.equal(symbol.name, "foo");
            assert.ok(symbol.flags & SymbolFlags.Alias);
        }
        finally {
            await api.close();
        }
    });

    test("getTypeOfSymbol", async () => {
        const api = spawnAPI();
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const symbol = await project.checker.getSymbolAtPosition("/src/index.ts", 9);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.NumberLiteral);
        }
        finally {
            await api.close();
        }
    });

    test("getImportEditsForSymbols adds a named import", async () => {
        const source = `const value = foo;\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": source,
            "/src/foo.ts": `export const foo = 1;\n`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const symbol = await project.checker.getSymbolAtPosition("/src/foo.ts", "export const ".length);
            assert.ok(symbol);

            const edits = await project.getImportEditsForSymbols("/src/index.ts", [await symbol.getExportSymbol()]);

            assert.equal(applyTextEdits(source, edits), `import { foo } from "./foo";\n\nconst value = foo;\n`);
        }
        finally {
            await api.close();
        }
    });

    test("getImportAdderEdits coalesces multiple importSymbol actions", async () => {
        const source = `const value = foo + bar;\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": source,
            "/src/foo.ts": `export const foo = 1;\nexport const bar = 2;\n`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const foo = await project.checker.getSymbolAtPosition("/src/foo.ts", "export const ".length);
            const bar = await project.checker.getSymbolAtPosition("/src/foo.ts", "export const foo = 1;\nexport const ".length);
            assert.ok(foo);
            assert.ok(bar);

            const edits = await project.getImportAdderEdits("/src/index.ts", [
                { kind: "importSymbol", symbol: await foo.getExportSymbol() },
                { kind: "importSymbol", symbol: await bar.getExportSymbol() },
            ]);

            assert.equal(applyTextEdits(source, edits), `import { bar, foo } from "./foo";\n\nconst value = foo + bar;\n`);
        }
        finally {
            await api.close();
        }
    });

    test("getImportAdderEdits adds to an existing import", async () => {
        const source = `import { foo } from "./foo";\nconst value = foo + bar;\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": source,
            "/src/foo.ts": `export const foo = 1;\nexport const bar = 2;\n`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const bar = await project.checker.getSymbolAtPosition("/src/foo.ts", "export const foo = 1;\nexport const ".length);
            assert.ok(bar);

            const edits = await project.getImportAdderEdits("/src/index.ts", [
                { kind: "importSymbol", symbol: await bar.getExportSymbol() },
            ]);

            assert.equal(applyTextEdits(source, edits), `import { bar, foo } from "./foo";\nconst value = foo + bar;\n`);
        }
        finally {
            await api.close();
        }
    });

    test("getImportAdderEdits returns no edits for non-exported symbols", async () => {
        const source = `const value = local;\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": source,
            "/src/foo.ts": `const local = 1;\n`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const symbol = await project.checker.getSymbolAtPosition("/src/foo.ts", "const ".length);
            assert.ok(symbol);

            const edits = await project.getImportAdderEdits("/src/index.ts", [
                { kind: "importSymbol", symbol },
            ]);

            assert.deepEqual(edits, []);
        }
        finally {
            await api.close();
        }
    });

    test("getImportAdderEdits rejects invalid actions", async () => {
        const api = spawnAPI();
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const symbol = await project.checker.getSymbolAtPosition("/src/foo.ts", 13);
            assert.ok(symbol);

            await assert.rejects( // @sync: assert.throws(
                () => project.getImportAdderEdits("/src/index.ts", [{ kind: "unknown", symbol: symbol.id } as unknown as ImportAdderAction]),
                /Debug Failure\. Illegal value: "unknown"/,
            );
            await assert.rejects( // @sync: assert.throws(
                () => project.getImportAdderEdits("/src/index.ts", [{ kind: "importSymbol", symbol: { ...symbol, id: 999_999_999 } } as unknown as ImportAdderAction]),
                /symbol handle \d+ not found/,
            );
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getApparentType", () => {
    test("returns the apparent type of a literal type", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const x = "hello" as const;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = `export const x = "hello" as const;`.indexOf("x =");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.equal(type.isLiteralType(), true);
            assert.equal(type.isStringLiteralType(), true);
            assert.equal(type.isIntrinsicType(), false);
            const apparent = await project.checker.getApparentType(type);
            assert.ok(apparent);
            assert.ok(apparent.id > 0);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getMemberInModuleExports", () => {
    test("returns a named export when present", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/index.ts": `export const direct = 1;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);
            const moduleSymbol = await project.checker.getSymbolAtLocation(sourceFile);
            assert.ok(moduleSymbol);
            const found = await project.checker.getMemberInModuleExports(moduleSymbol, "direct");
            assert.ok(found);
            assert.equal(found.name, "direct");
            const missing = await project.checker.getMemberInModuleExports(moduleSymbol, "missing");
            assert.equal(missing, undefined);
        }
        finally {
            await api.close();
        }
    });
});

describe("SourceFile", () => {
    test("getSourceFileNames returns all program files, not just root files", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    moduleResolution: "node10",
                    noLib: true,
                },
            }),
            "/src/index.ts": `import { foo } from "./foo";\nimport { bar } from "my-lib";\nexport const result = foo + bar;`,
            "/src/foo.ts": `export const foo = 42;`,
            "/node_modules/my-lib/package.json": JSON.stringify({ name: "my-lib", types: "./index.d.ts" }),
            "/node_modules/my-lib/index.d.ts": `export declare const bar: number;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const fileNames = await project.program.getSourceFileNames();
            assert.deepEqual(fileNames, [
                "/src/foo.ts",
                "/node_modules/my-lib/index.d.ts",
                "/src/index.ts",
            ]);
        }
        finally {
            await api.close();
        }
    });

    test("source file metadata identifies external library and default library files", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    moduleResolution: "node10",
                },
            }),
            "/src/index.ts": `import { bar } from "my-lib";\nexport const result = bar;`,
            "/node_modules/my-lib/package.json": JSON.stringify({ name: "my-lib", types: "./index.d.ts" }),
            "/node_modules/my-lib/index.d.ts": `export declare const bar: number;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const program = project.program;

            const index = await program.getSourceFile("/src/index.ts");
            assert.ok(index);
            assert.equal(await program.isSourceFileFromExternalLibrary(index), false);
            assert.equal(await program.isSourceFileDefaultLibrary(index), false);

            const lib = await program.getSourceFile("/node_modules/my-lib/index.d.ts");
            assert.ok(lib);
            assert.equal(await program.isSourceFileFromExternalLibrary(lib), true);
            assert.equal(await program.isSourceFileDefaultLibrary(lib), false);

            const fileNames = await program.getSourceFileNames();
            const defaultLibName = fileNames.find(name => name.endsWith("lib.d.ts") || name.includes("/lib."));
            assert.ok(defaultLibName, "expected a default library file in the program");
            const defaultLib = await program.getSourceFile(defaultLibName);
            assert.ok(defaultLib);
            assert.equal(await program.isSourceFileDefaultLibrary(defaultLib), true);
        }
        finally {
            await api.close();
        }
    });

    test("source file metadata reports implied node format", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    module: "nodenext",
                    moduleResolution: "nodenext",
                },
            }),
            "/src/index.ts": `export const x = 1;`,
            "/src/esm.mts": `export const e = 1;`,
            "/src/cjs.cts": `export const c = 1;`,
            "/esm/package.json": JSON.stringify({ type: "module" }),
            "/esm/index.ts": `export const m = 1;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const program = snapshot.getProject("/tsconfig.json")!.program;

            const mts = await program.getSourceFile("/src/esm.mts");
            assert.ok(mts);
            assert.equal((await program.getSourceFileMetadata(mts.fileName))?.impliedNodeFormat, ModuleKind.ESNext);
            assert.equal((await program.getSourceFileMetadataByPath(mts.path))?.impliedNodeFormat, ModuleKind.ESNext);

            const cts = await program.getSourceFile("/src/cjs.cts");
            assert.ok(cts);
            assert.equal((await program.getSourceFileMetadata(cts.fileName))?.impliedNodeFormat, ModuleKind.CommonJS);

            // A plain .ts file with no nearby `"type": "module"` is CommonJS.
            const index = await program.getSourceFile("/src/index.ts");
            assert.ok(index);
            assert.equal((await program.getSourceFileMetadata(index.fileName))?.impliedNodeFormat, ModuleKind.CommonJS);

            // A plain .ts file under a `"type": "module"` package is ESM.
            const esmIndex = await program.getSourceFile("/esm/index.ts");
            assert.ok(esmIndex);
            assert.equal((await program.getSourceFileMetadata(esmIndex.fileName))?.impliedNodeFormat, ModuleKind.ESNext);
        }
        finally {
            await api.close();
        }
    });

    test("file properties", async () => {
        const api = spawnAPI();
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");

            assert.ok(sourceFile);
            assert.equal(sourceFile.text, defaultFiles["/src/index.ts"]);
            assert.equal(sourceFile.fileName, "/src/index.ts");
        }
        finally {
            await api.close();
        }
    });

    test("extended data", async () => {
        const api = spawnAPI();
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");

            assert.ok(sourceFile);
            let nodeCount = 1;
            sourceFile.forEachChild(function visit(node) {
                if (isTemplateHead(node)) {
                    assert.equal(node.text, "head ");
                    assert.equal(node.rawText, "head ");
                    assert.equal(node.templateFlags, 0);
                }
                else if (isTemplateMiddle(node)) {
                    assert.equal(node.text, "middle");
                    assert.equal(node.rawText, "middle");
                    assert.equal(node.templateFlags, 0);
                }
                else if (isTemplateTail(node)) {
                    assert.equal(node.text, " tail");
                    assert.equal(node.rawText, " tail");
                    assert.equal(node.templateFlags, 0);
                }
                nodeCount++;
                node.forEachChild(visit);
            });
            assert.equal(nodeCount, 8);
        }
        finally {
            await api.close();
        }
    });

    test("forEachChild with visitList does not visit array children twice", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ files: ["/input.ts"] }),
            "/input.ts": `let arrow = () => {}`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/input.ts");

            assert.ok(sourceFile);

            const visited: { kind: SyntaxKind; pos: number; end: number; }[] = [];
            (function walk(node: Node): void {
                visited.push({ kind: node.kind, pos: node.pos, end: node.end });
                node.forEachChild(walk, (nodes: NodeArray<Node>) => {
                    for (let i = 0; i < nodes.length; i++) {
                        walk(nodes[i]);
                    }
                    return undefined;
                });
            })(sourceFile);

            // Each node should be visited exactly once, even when a visitList callback
            // is supplied. Previously array children were visited twice.
            const seen = new Set<string>();
            for (const { kind, pos, end } of visited) {
                const key = `${kind}.${pos}.${end}`;
                assert.ok(!seen.has(key), `Node ${key} was visited more than once`);
                seen.add(key);
            }
        }
        finally {
            await api.close();
        }
    });
});

test("unicode escapes", async () => {
    const api = spawnAPI({
        "/tsconfig.json": "{}",
        "/src/1.ts": `"😃"`,
        "/src/2.ts": `"\\ud83d\\ude03"`,
        "/src/3.ts": `"\\ud800a\\udc00"`,
    });
    try {
        const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const expectedTexts = new Map([
            ["/src/1.ts", "😃"],
            ["/src/2.ts", "😃"],
            ["/src/3.ts", "\ud800a\udc00"],
        ]);

        for (const file of expectedTexts.keys()) {
            const sourceFile = await project.program.getSourceFile(file);
            assert.ok(sourceFile);

            sourceFile.forEachChild(function visit(node) {
                if (isStringLiteral(node)) {
                    assert.equal(node.text, expectedTexts.get(file));
                }
                node.forEachChild(visit);
            });
        }
    }
    finally {
        await api.close();
    }
});

test("template unicode escapes", async () => {
    const api = spawnAPI({
        "/tsconfig.json": "{}",
        "/src/index.ts": "`\\ud800${0}\\udc00`",
    });
    try {
        const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const sourceFile = await project.program.getSourceFile("/src/index.ts");
        assert.ok(sourceFile);

        let sawHead = false;
        let sawTail = false;
        sourceFile.forEachChild(function visit(node) {
            if (isTemplateHead(node)) {
                assert.equal(node.text, "\ud800");
                sawHead = true;
            }
            else if (isTemplateTail(node)) {
                assert.equal(node.text, "\udc00");
                sawTail = true;
            }
            node.forEachChild(visit);
        });
        assert.ok(sawHead);
        assert.ok(sawTail);
    }
    finally {
        await api.close();
    }
});

test("Object equality", async () => {
    const api = spawnAPI();
    try {
        const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        // Same symbol returned from same snapshot's checker
        assert.strictEqual(
            await project.checker.getSymbolAtPosition("/src/index.ts", 9),
            await project.checker.getSymbolAtPosition("/src/index.ts", 10),
        );
    }
    finally {
        await api.close();
    }
});

test("Snapshot dispose", async () => {
    const api = spawnAPI();
    try {
        const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const symbol = await project.checker.getSymbolAtPosition("/src/index.ts", 9);
        assert.ok(symbol);

        // Snapshot dispose should release server-side resources
        assert.ok(snapshot.isDisposed() === false);
        await snapshot.dispose();
        assert.ok(snapshot.isDisposed() === true);

        // After dispose, snapshot methods should throw
        assert.throws(() => {
            snapshot.getProject("/tsconfig.json");
        }, {
            name: "Error",
            message: "Snapshot is disposed",
        });
    }
    finally {
        await api.close();
    }
});

describe("Multiple snapshots", () => {
    test("two snapshots work independently", async () => {
        const api = spawnAPI();
        try {
            const snap1 = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const snap2 = await api.updateSnapshot({ openProject: "/tsconfig.json" });

            // Both can fetch source files
            const sf1 = await snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
            const sf2 = await snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
            assert.ok(sf1);
            assert.ok(sf2);

            // Disposing one doesn't break the other
            await snap1.dispose();
            assert.ok(snap1.isDisposed());
            assert.ok(!snap2.isDisposed());

            // snap2 still works after snap1 is disposed
            const symbol = await snap2.getProject("/tsconfig.json")!.checker.getSymbolAtPosition("/src/index.ts", 9);
            assert.ok(symbol);
            assert.equal(symbol.name, "foo");
        }
        finally {
            await api.close();
        }
    });

    test("each snapshot has its own server-side lifecycle", async () => {
        const { api, fs } = spawnAPIWithFS();
        try {
            const snap1 = await api.updateSnapshot({ openProject: "/tsconfig.json" });

            // Verify initial state
            const sf1 = await snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
            assert.ok(sf1);
            assert.equal(sf1.text, `export const foo = 42;`);

            // Mutate the file and create a new snapshot with the change
            fs.writeFile!("/src/foo.ts", `export const foo = "changed";`);
            const snap2 = await api.updateSnapshot({
                fileChanges: { changed: ["/src/foo.ts"] },
            });

            // snap2 should reflect the updated content
            const sf2 = await snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
            assert.ok(sf2);
            assert.equal(sf2.text, `export const foo = "changed";`);

            // snap1's source file should still have the original content
            assert.equal(sf1.text, `export const foo = 42;`);

            await snap1.dispose();

            // snap2 still works independently after snap1 is disposed
            const symbol = await snap2.getProject("/tsconfig.json")!.checker.getSymbolAtPosition("/src/index.ts", 9);
            assert.ok(symbol);

            await snap2.dispose();

            // Both are disposed, new snapshot works fine with latest content
            const snap3 = await api.updateSnapshot();
            const sf3 = await snap3.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
            assert.ok(sf3);
            assert.equal(sf3.text, `export const foo = "changed";`);
        }
        finally {
            await api.close();
        }
    });

    test("adding a new file is reflected in the next snapshot", async () => {
        const { api, fs } = spawnAPIWithFS();
        try {
            const snap1 = await api.updateSnapshot({ openProject: "/tsconfig.json" });

            // Add a brand new file
            fs.writeFile!("/src/bar.ts", `export const bar = true;`);
            const snap2 = await api.updateSnapshot({
                fileChanges: { created: ["/src/bar.ts"] },
            });

            const sf = await snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/bar.ts");
            assert.ok(sf);
            assert.equal(sf.text, `export const bar = true;`);

            // Original snapshot shouldn't have the new file
            const sfOld = await snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/bar.ts");
            assert.equal(sfOld, undefined);
        }
        finally {
            await api.close();
        }
    });

    test("multiple sequential edits produce correct snapshots", async () => {
        const { api, fs } = spawnAPIWithFS();
        try {
            await api.updateSnapshot({ openProject: "/tsconfig.json" });

            const versions = [
                `export const foo = 1;`,
                `export const foo = 2;`,
                `export const foo = 3;`,
            ];

            for (const version of versions) {
                fs.writeFile!("/src/foo.ts", version);
                const snap = await api.updateSnapshot({
                    fileChanges: { changed: ["/src/foo.ts"] },
                });
                const sf = await snap.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
                assert.ok(sf);
                assert.equal(sf.text, version);
            }
        }
        finally {
            await api.close();
        }
    });
});

describe("Source file caching", () => {
    test("same file from same snapshot returns cached object", async () => {
        const api = spawnAPI();
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sf1 = await project.program.getSourceFile("/src/index.ts");
            const sf2 = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sf1);
            assert.strictEqual(sf1, sf2, "Same source file should be returned from cache");
        }
        finally {
            await api.close();
        }
    });

    test("same file from two snapshots (same content) returns cached object", async () => {
        const api = spawnAPI();
        try {
            const snap1 = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const snap2 = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            // Fetch from snap1 first (populates cache), then snap2 (cache hit via hash)
            const sf1 = await snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
            const sf2 = await snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
            assert.ok(sf1);
            assert.ok(sf2);
            // Same content hash → cache hit → same object
            assert.strictEqual(sf1, sf2, "Same file with same content should share cached object");
        }
        finally {
            await api.close();
        }
    });

    test("modified file returns a different source file object", async () => {
        const { api, fs } = spawnAPIWithFS();
        try {
            const snap1 = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const sf1 = await snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
            assert.ok(sf1);
            assert.equal(sf1.text, `export const foo = 42;`);

            // Mutate the file in the VFS
            fs.writeFile!("/src/foo.ts", `export const foo = 100;`);

            // Notify the server about the change
            const snap2 = await api.updateSnapshot({
                fileChanges: { changed: ["/src/foo.ts"] },
            });
            const sf2 = await snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
            assert.ok(sf2);
            assert.equal(sf2.text, `export const foo = 100;`);

            // Different content → different object
            assert.notStrictEqual(sf1, sf2, "Modified file should return a new source file object");
        }
        finally {
            await api.close();
        }
    });

    test("unmodified file retains cached object across file change notification", async () => {
        const { api, fs } = spawnAPIWithFS();
        try {
            const snap1 = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const sf1 = await snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
            assert.ok(sf1);

            // Mutate a different file
            fs.writeFile!("/src/foo.ts", `export const foo = 999;`);

            // Notify the server about the change to foo.ts only
            const snap2 = await api.updateSnapshot({
                fileChanges: { changed: ["/src/foo.ts"] },
            });
            const sf2 = await snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
            assert.ok(sf2);

            // index.ts wasn't changed — should still get cached object
            assert.strictEqual(sf1, sf2, "Unchanged file should return cached object across snapshots");
        }
        finally {
            await api.close();
        }
    });

    test("cache entries survive when one of two snapshots is disposed", async () => {
        const api = spawnAPI();
        try {
            const snap1 = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            // Fetch from snap1 to populate cache
            const sf1 = await snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
            assert.ok(sf1);

            // snap2 retains snap1's cache refs for unchanged files via snapshot changes
            const snap2 = await api.updateSnapshot({ openProject: "/tsconfig.json" });

            // Dispose snap1 — snap2 still holds a ref, so the entry survives
            await snap1.dispose();

            // Fetching from snap2 should still return the cached object
            const sf2 = await snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
            assert.ok(sf2);
            assert.strictEqual(sf1, sf2, "Cache entry should survive when retained by the next snapshot");
        }
        finally {
            await api.close();
        }
    });

    test("invalidateAll causes all files to be re-fetched", async () => {
        const { api, fs } = spawnAPIWithFS();
        try {
            const snap1 = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const sf1 = await snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
            assert.ok(sf1);
            assert.equal(sf1.text, `export const foo = 42;`);

            // Mutate the file
            fs.writeFile!("/src/foo.ts", `export const foo = "hello";`);

            // Use invalidateAll to force re-fetch
            const snap2 = await api.updateSnapshot({
                fileChanges: { invalidateAll: true },
            });
            const sf2 = await snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
            assert.ok(sf2);
            assert.equal(sf2.text, `export const foo = "hello";`);
            assert.notStrictEqual(sf1, sf2, "invalidateAll should produce new source file objects");
        }
        finally {
            await api.close();
        }
    });

    test("node handles from a cached source file should be valid in a new snapshot", async () => {
        const { api, fs } = spawnAPIWithFS({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `function foo(x: number) {}\nfoo(42);`,
            "/src/other.ts": `export const x = 1;`,
        });
        try {
            // Snapshot 1: get a node and verify getContextualType works
            const snap1 = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const proj1 = snap1.getProject("/tsconfig.json")!;

            const sf1 = await proj1.program.getSourceFile("/src/main.ts");
            assert.ok(sf1);

            let numLiteral: Expression | undefined;
            sf1.forEachChild(function visit(node) {
                if (isCallExpression(node)) numLiteral = node.arguments[0];
                node.forEachChild(visit);
            });
            assert.ok(numLiteral, "should find the 42 argument");

            const type1 = await proj1.checker.getContextualType(numLiteral);
            assert.ok(type1);
            assert.ok(type1.flags & TypeFlags.Number);

            // Snapshot 2: change a different file
            fs.writeFile!("/src/other.ts", `export const x = 2;`);
            const snap2 = await api.updateSnapshot({
                fileChanges: { changed: ["/src/other.ts"] },
            });
            const proj2 = snap2.getProject("/tsconfig.json")!;

            // main.ts is unchanged — client returns the cached SourceFile (same object)
            const sf2 = await proj2.program.getSourceFile("/src/main.ts");
            assert.ok(sf2);
            assert.strictEqual(sf1, sf2, "unchanged file should be served from client cache");

            let numLiteral2: Expression | undefined;
            sf2.forEachChild(function visit(node) {
                if (isCallExpression(node)) numLiteral2 = node.arguments[0];
                node.forEachChild(visit);
            });
            assert.ok(numLiteral2, "should find the 42 argument");
            assert.strictEqual(numLiteral, numLiteral2, "unchanged file should be served from client cache");

            // A type from new snapshot should be resolved
            const type2 = await proj2.checker.getContextualType(numLiteral);
            assert.ok(type2);
            assert.ok(type2.flags & TypeFlags.Number);
        }
        finally {
            await api.close();
        }
    });
});

describe("Snapshot disposal", () => {
    test("dispose is idempotent", async () => {
        const api = spawnAPI();
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            await snapshot.dispose();
            assert.ok(snapshot.isDisposed());
            // Second dispose should not throw
            await snapshot.dispose();
            assert.ok(snapshot.isDisposed());
        }
        finally {
            await api.close();
        }
    });

    test("api.close disposes all active snapshots", async () => {
        const api = spawnAPI();
        const snap1 = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        const snap2 = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        assert.ok(!snap1.isDisposed());
        assert.ok(!snap2.isDisposed());
        await api.close();
        assert.ok(snap1.isDisposed());
        assert.ok(snap2.isDisposed());
    });
});

describe("Source file cache keying across projects", () => {
    // Three projects share the same file (/src/shared.ts).
    // The file sits inside a package.json scope with "type": "module".
    //
    // Project A: moduleResolution: bundler  (auto detection, bundler doesn't
    //   trigger isFileForcedToBeModuleByFormat → file parsed as script)
    // Project B: moduleResolution: bundler, moduleDetection: force
    //   (force → file parsed as module)
    // Project C: moduleResolution: nodenext
    //   (nodenext + type:module → impliedNodeFormat ESNext →
    //    isFileForcedToBeModuleByFormat → file parsed as module)
    //
    // Expected: exactly two distinct source file objects are stored:
    //   - A gets one (script parse)
    //   - B and C share another (module parse)
    const multiProjectFiles: Record<string, string> = {
        "/package.json": JSON.stringify({ type: "module" }),
        "/src/shared.ts": `export const x = 1;`,
        // Project A – bundler, auto detection (default)
        "/projectA/tsconfig.json": JSON.stringify({
            compilerOptions: {
                moduleResolution: "bundler",
                module: "esnext",
                strict: true,
            },
            files: ["../src/shared.ts"],
        }),
        // Project B – bundler, force module detection
        "/projectB/tsconfig.json": JSON.stringify({
            compilerOptions: {
                moduleResolution: "bundler",
                module: "esnext",
                moduleDetection: "force",
                strict: true,
            },
            files: ["../src/shared.ts"],
        }),
        // Project C – nodenext (type:module → module)
        "/projectC/tsconfig.json": JSON.stringify({
            compilerOptions: {
                moduleResolution: "nodenext",
                module: "nodenext",
                strict: true,
            },
            files: ["../src/shared.ts"],
        }),
    };

    test("different parse modes produce separate cached objects; same parse modes share", async () => {
        const api = spawnAPI(multiProjectFiles);
        try {
            // Open all three projects
            await api.updateSnapshot({ openProject: "/projectA/tsconfig.json" });
            await api.updateSnapshot({ openProject: "/projectB/tsconfig.json" });
            const snapshot = await api.updateSnapshot({ openProject: "/projectC/tsconfig.json" });

            const projectA = snapshot.getProject("/projectA/tsconfig.json")!;
            const projectB = snapshot.getProject("/projectB/tsconfig.json")!;
            const projectC = snapshot.getProject("/projectC/tsconfig.json")!;
            assert.ok(projectA, "projectA should exist");
            assert.ok(projectB, "projectB should exist");
            assert.ok(projectC, "projectC should exist");

            // Fetch the shared file from each project
            const sfA = await projectA.program.getSourceFile("/src/shared.ts");
            const sfB = await projectB.program.getSourceFile("/src/shared.ts");
            const sfC = await projectC.program.getSourceFile("/src/shared.ts");
            assert.ok(sfA, "sfA should exist");
            assert.ok(sfB, "sfB should exist");
            assert.ok(sfC, "sfC should exist");

            // A should differ from B and C (script vs module parse)
            assert.notStrictEqual(sfA, sfB, "projectA (script) and projectB (module) should have different cached source files");
            assert.notStrictEqual(sfA, sfC, "projectA (script) and projectC (module) should have different cached source files");

            // B and C should share the same cached object (both module parse, same content hash)
            assert.strictEqual(sfB, sfC, "projectB and projectC (both module parse) should share the same cached source file");
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - symbol identity across projects", () => {
    const sharedSymbolFiles = {
        "/projectA/tsconfig.json": JSON.stringify({ files: ["../src/shared.ts"] }),
        "/projectB/tsconfig.json": JSON.stringify({ files: ["../src/shared.ts"] }),
        "/src/shared.ts": `export const sharedVar = 42;`,
    };

    test("getSymbolAtPosition returns same Symbol instance across projects", async () => {
        const api = spawnAPI(sharedSymbolFiles);
        try {
            await api.updateSnapshot({ openProject: "/projectA/tsconfig.json" });
            const snapshot = await api.updateSnapshot({ openProject: "/projectB/tsconfig.json" });

            const projectA = snapshot.getProject("/projectA/tsconfig.json")!;
            const projectB = snapshot.getProject("/projectB/tsconfig.json")!;
            assert.ok(projectA, "projectA should exist");
            assert.ok(projectB, "projectB should exist");

            const src = sharedSymbolFiles["/src/shared.ts"];
            const varPos = src.indexOf("sharedVar");

            const symbolA = await projectA.checker.getSymbolAtPosition("/src/shared.ts", varPos);
            const symbolB = await projectB.checker.getSymbolAtPosition("/src/shared.ts", varPos);

            assert.ok(symbolA, "symbolA should exist");
            assert.ok(symbolB, "symbolB should exist");
            assert.equal(symbolA.name, "sharedVar");
            assert.equal(symbolB.name, "sharedVar");

            assert.strictEqual(symbolA, symbolB, "Same source symbol queried from two projects should be the same object");
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - types and signatures", () => {
    const checkerFiles = {
        "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
        "/src/main.ts": `
export const x = 42;
export function add(a: number, b: number, ...rest: number[]): number { return a + b; }
export class MyClass {
    value: string = "";
    getValue(): string { return this.value; }
}
`,
    };

    test("getTypeAtPosition", async () => {
        const api = spawnAPI(checkerFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = checkerFiles["/src/main.ts"];
            const xPos = src.indexOf("x = 42");
            const type = await project.checker.getTypeAtPosition("/src/main.ts", xPos);
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.NumberLiteral);
        }
        finally {
            await api.close();
        }
    });

    test("getTypeAtPosition batched", async () => {
        const api = spawnAPI(checkerFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = checkerFiles["/src/main.ts"];
            const xPos = src.indexOf("x = 42");
            const addPos = src.indexOf("add(");
            const types = await project.checker.getTypeAtPosition("/src/main.ts", [xPos, addPos]);
            assert.equal(types.length, 2);
            assert.ok(types[0]);
            assert.ok(types[1]);
        }
        finally {
            await api.close();
        }
    });

    test("getTypeAtLocation", async () => {
        const api = spawnAPI(checkerFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);
            const firstVarDecl = sourceFile.statements[2]; // "export const x"
            assert.ok(firstVarDecl);
            const type = await project.checker.getTypeAtLocation(firstVarDecl);
            assert.ok(type);
        }
        finally {
            await api.close();
        }
    });

    test("getTypeAtLocation returns property type for parenthesized and chained access (issue #3938)", async () => {
        const files = {
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
interface A {
    a: number;
    b: { c: number };
}
const obj: A = { a: 1, b: { c: 2 } };
const a1 = obj.a;
const a2 = (obj).a;
const c = obj.b.c;
`,
        };

        const api = spawnAPI(files);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);

            const targetNodes = new Map<string, Node>();
            sourceFile.forEachChild(function visit(node) {
                if (node.kind === SyntaxKind.PropertyAccessExpression) {
                    const text = sourceFile.text.slice(node.pos, node.end).trim();
                    if (text === "obj.a" || text === "(obj).a" || text === "obj.b.c") {
                        targetNodes.set(text, node);
                    }
                }
                node.forEachChild(visit);
            });

            assert.equal(targetNodes.size, 3, "Should find all target property access expressions");
            for (const expr of ["obj.a", "(obj).a", "obj.b.c"] as const) {
                const node = targetNodes.get(expr);
                assert.ok(node, `Should find expression '${expr}'`);
                const type = await project.checker.getTypeAtLocation(node);
                assert.ok(type, `Should get a type for '${expr}'`);
                assert.ok(type.flags & TypeFlags.Number, `Expected '${expr}' to have number type flags, got ${type.flags}`);
            }
        }
        finally {
            await api.close();
        }
    });

    test("getTypeAtLocation returns call result type for private method call (issue #4041)", async () => {
        const files = {
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true, target: "esnext" } }),
            "/src/main.ts": `
type Result = { readonly value: string };

export class Cache {
    run(): Result {
        return this.#buildCapabilities();
    }

    #buildCapabilities(): Result {
        return { value: "ok" };
    }
}
`,
        };

        const api = spawnAPI(files);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);

            let callNode: import("@typescript/native-preview/unstable/ast").CallExpression | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (isCallExpression(node)) {
                    const text = sourceFile.text.slice(node.pos, node.end).trim();
                    if (text === "this.#buildCapabilities()") {
                        callNode = node;
                    }
                }
                node.forEachChild(visit);
            });

            assert.ok(callNode, "Should find private method call expression");
            const callType = await project.checker.getTypeAtLocation(callNode);
            const calleeType = await project.checker.getTypeAtLocation(callNode.expression);
            assert.ok(callType, "Should get type for call expression");
            assert.ok(calleeType, "Should get type for callee expression");

            const callSignatures = await project.checker.getSignaturesOfType(calleeType, SignatureKind.Call);
            assert.ok(callSignatures.length > 0, "Callee should be callable");
            const returnType = await project.checker.getReturnTypeOfSignature(callSignatures[0]);
            assert.ok(returnType, "Should get return type for private method call");
            const callExprSignatures = await project.checker.getSignaturesOfType(callType, SignatureKind.Call);

            assert.ok(callType.flags & TypeFlags.Object, `Expected call expression type to be object-like, got ${callType.flags}`);
            assert.ok(returnType.flags & TypeFlags.Object, `Expected return type to be object-like, got ${returnType.flags}`);
            assert.equal(callType.flags, returnType.flags, "Call expression type should have same flags as method return type");
            assert.equal(callExprSignatures.length, 0, "Call expression result type should not itself be callable");
        }
        finally {
            await api.close();
        }
    });

    test("getSignaturesOfType - call signatures", async () => {
        const api = spawnAPI(checkerFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = checkerFiles["/src/main.ts"];
            const addPos = src.indexOf("add(");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", addPos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const callSigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(callSigs.length > 0);
            const sig = callSigs[0];
            assert.ok(sig.id);
            assert.ok(sig.parameters.length >= 2);
            assert.ok(sig.hasRestParameter);
            assert.ok(!sig.isConstruct);
            assert.ok(!sig.isAbstract);
        }
        finally {
            await api.close();
        }
    });

    test("getSignaturesOfType - construct signatures", async () => {
        const api = spawnAPI(checkerFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = checkerFiles["/src/main.ts"];
            const classPos = src.indexOf("MyClass");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", classPos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const constructSigs = await project.checker.getSignaturesOfType(type, SignatureKind.Construct);
            assert.ok(constructSigs.length > 0);
            const sig = constructSigs[0];
            assert.ok(sig.isConstruct);
        }
        finally {
            await api.close();
        }
    });

    test("Signature declaration can be resolved", async () => {
        const api = spawnAPI(checkerFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = checkerFiles["/src/main.ts"];
            const addPos = src.indexOf("add(");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", addPos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const callSigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(callSigs.length > 0);
            const sig = callSigs[0];
            assert.ok(sig.declaration);
            const node = await sig.declaration.resolve(project);
            assert.ok(node);
            // The handle remembers its canonical project, so resolve() works without an argument.
            const nodeFromCanonical = await sig.declaration.resolve();
            assert.ok(nodeFromCanonical);
            assert.strictEqual(nodeFromCanonical.kind, node.kind);

            const methodPos = src.indexOf("getValue");
            const methodSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", methodPos);
            assert.ok(methodSymbol);
            assert.ok(methodSymbol.valueDeclaration);
            const methodNode = await methodSymbol.valueDeclaration.resolve(project);
            assert.ok(methodNode);
            assert.strictEqual(methodNode.parent.kind, SyntaxKind.ClassDeclaration);
            assert.strictEqual(methodNode.parent.parent.kind, SyntaxKind.SourceFile);
            // A symbol's declaration handles default to the symbol's canonical project.
            const methodNodeFromCanonical = await methodSymbol.valueDeclaration.resolve();
            assert.ok(methodNodeFromCanonical);
            assert.strictEqual(methodNodeFromCanonical.kind, methodNode.kind);
        }
        finally {
            await api.close();
        }
    });

    test("getSignaturesOfType - signature type parameters", async () => {
        const mainFile = `
            interface Operator<T, R> {
            }
            export declare class Observable<T> {
                lift<R>(operator: Operator<T, R>): Observable<R>;
            }
            `;
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": mainFile,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const liftPos = mainFile.indexOf("lift");
            const type = await project.checker.getTypeAtPosition("/src/main.ts", liftPos);
            assert.ok(type);
            const callSigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(callSigs.length === 1, "should have exactly one call signature, found: " + callSigs.length);
            const sig = callSigs[0];
            assert.ok(sig.typeParameters?.length === 1, "should have exactly one type parameter, found: " + sig.typeParameters?.length);
            const typeParams = await sig.getTypeParameters();
            const typeParam = typeParams[0];
            assert.ok(typeParam, "should have type parameter");
            const name = (await typeParam.getSymbol())?.name;
            assert.ok(name === "R", "should be named R, instead: " + name);
            assert.ok(typeParam.flags & TypeFlags.TypeParameter, "should be a type parameter, instead flags: " + typeParam.flags);
        }
        finally {
            await api.close();
        }
    });

    test("Signature.getParameters() returns parameter symbols with correct names", async () => {
        const api = spawnAPI(checkerFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = checkerFiles["/src/main.ts"];
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("add("));
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const params = await sigs[0].getParameters();
            assert.equal(params.length, 3);
            assert.equal(params[0].name, "a");
            assert.equal(params[1].name, "b");
            assert.equal(params[2].name, "rest");
            assert.ok(params[0].flags & SymbolFlags.FunctionScopedVariable, `expected FunctionScopedVariable on 'a', got ${params[0].flags}`);
        }
        finally {
            await api.close();
        }
    });

    test("Signature.getThisParameter() returns undefined when no explicit this parameter", async () => {
        const api = spawnAPI(checkerFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = checkerFiles["/src/main.ts"];
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("add("));
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const thisParam = await sigs[0].getThisParameter();
            assert.strictEqual(thisParam, undefined, "add() has no explicit this parameter");
        }
        finally {
            await api.close();
        }
    });

    test("Signature.getThisParameter() returns symbol for explicit this parameter", async () => {
        const src = `export function foo(this: { n: number }, x: string): void {}`;
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("foo("));
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const thisParam = await sigs[0].getThisParameter();
            assert.ok(thisParam, "foo has an explicit this parameter");
            assert.equal(thisParam.name, "this");
            assert.ok(thisParam.flags & SymbolFlags.FunctionScopedVariable, `expected FunctionScopedVariable, got ${thisParam.flags}`);
        }
        finally {
            await api.close();
        }
    });

    test("Signature.getTarget() returns undefined for a non-instantiated signature", async () => {
        const api = spawnAPI(checkerFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = checkerFiles["/src/main.ts"];
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("add("));
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const target = await sigs[0].getTarget();
            assert.strictEqual(target, undefined, "add() is not an instantiated signature");
        }
        finally {
            await api.close();
        }
    });

    test("Signature.getTarget() returns the generic source signature for an instantiated call", async () => {
        const src = `
            function identity<T>(x: T): T { return x; }
            identity<string>("hello");
        `;
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);
            let callNode: Node | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (isCallExpression(node)) callNode = node;
                node.forEachChild(visit);
            });
            assert.ok(callNode, "should find a call expression");
            const sig = await project.checker.getResolvedSignature(callNode);
            assert.ok(sig, "should resolve a signature for the call");
            assert.ok(sig.target !== undefined, "instantiated call should have a target ID");
            const target = await sig.getTarget();
            assert.ok(target, "getTarget() should return the generic signature");
            assert.ok(target.typeParameters && target.typeParameters.length > 0, "target should have type parameters");
        }
        finally {
            await api.close();
        }
    });
});

describe("Symbol - parent, members, exports", () => {
    const symbolFiles = {
        "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
        "/src/mod.ts": `
export class Animal {
    name: string = "";
    speak(): void {}
}
export const value = 1;
`,
    };

    test("getMembers returns class members", async () => {
        const api = spawnAPI(symbolFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = symbolFiles["/src/mod.ts"];
            const animalPos = src.indexOf("Animal");
            const symbol = await project.checker.getSymbolAtPosition("/src/mod.ts", animalPos);
            assert.ok(symbol);
            const members = await symbol.getMembers();
            assert.ok(members.size > 0);
            const memberNames = [...members.values()].map(m => m.name);
            assert.ok(memberNames.includes("name"), "should have 'name' member");
            assert.ok(memberNames.includes("speak"), "should have 'speak' member");
        }
        finally {
            await api.close();
        }
    });

    test("getExports returns module exports via sourceFile symbol", async () => {
        const api = spawnAPI(symbolFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/mod.ts");
            assert.ok(sourceFile);
            const moduleSymbol = await project.checker.getSymbolAtLocation(sourceFile);
            assert.ok(moduleSymbol);
            const exports = await moduleSymbol.getExports();
            assert.ok(exports.size > 0);
            const exportNames = [...exports.values()].map(e => e.name);
            assert.ok(exportNames.includes("Animal"), "should export Animal");
            assert.ok(exportNames.includes("value"), "should export value");
        }
        finally {
            await api.close();
        }
    });

    test("getParent returns containing symbol", async () => {
        const api = spawnAPI(symbolFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = symbolFiles["/src/mod.ts"];
            const namePos = src.indexOf("name:");
            const nameSymbol = await project.checker.getSymbolAtPosition("/src/mod.ts", namePos);
            assert.ok(nameSymbol);
            assert.equal(nameSymbol.name, "name");
            const parent = await nameSymbol.getParent();
            assert.ok(parent);
            assert.equal(parent.name, "Animal");
        }
        finally {
            await api.close();
        }
    });
});

describe("Type - getSymbol", () => {
    test("getSymbol returns the symbol of a type", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/types.ts": `
export class Foo {
    x: number = 0;
}
export const instance: Foo = new Foo();
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\nexport class Foo {\n    x: number = 0;\n}\nexport const instance: Foo = new Foo();\n`;
            const instancePos = src.indexOf("instance");
            const symbol = await project.checker.getSymbolAtPosition("/src/types.ts", instancePos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const typeSymbol = await type.getSymbol();
            assert.ok(typeSymbol);
            assert.equal(typeSymbol.name, "Foo");
        }
        finally {
            await api.close();
        }
    });
});

describe("Type - sub-property fetchers", () => {
    const typeFiles = {
        "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true, target: "esnext" } }),
        "/src/types.ts": `
export const arr: Array<number> = [1, 2, 3];
export const union: string | number = "hello";
export const intersection: { a: number } & { b: string } = { a: 1, b: "hi" };
export type KeyOf<T> = keyof T;
export type Lookup<T, K extends keyof T> = T[K];
export type Cond<T> = T extends string ? "yes" : "no";
export const tpl: \`hello \${string}\` = "hello world";
export type Upper = Uppercase<"hello">;
export const tuple: readonly [number, string?, ...boolean[]] = [1];
`,
    };

    async function getTypeAtName(api: API, name: string) {
        const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = typeFiles["/src/types.ts"];
        const pos = src.indexOf(name);
        assert.ok(pos >= 0, `Could not find "${name}" in source`);
        const symbol = await project.checker.getSymbolAtPosition("/src/types.ts", pos);
        assert.ok(symbol, `No symbol found at "${name}"`);
        const type = await project.checker.getTypeOfSymbol(symbol);
        assert.ok(type, `No type found for symbol "${name}"`);
        return { type, project, snapshot, api };
    }

    test("TypeReference.getTarget() returns the generic target", async () => {
        const { type, api } = await getTypeAtName(spawnAPI(typeFiles), "arr:");
        try {
            assert.ok(type.flags & TypeFlags.Object);
            const ref = type as TypeReference;
            assert.ok(ref.objectFlags & ObjectFlags.Reference);
            assert.equal(type.isObjectType(), true);
            assert.equal(type.isTypeReference(), true);
            assert.equal(type.isLiteralType(), false);
            const target = await ref.getTarget();
            assert.ok(target);
            assert.ok(target.flags & TypeFlags.Object);
        }
        finally {
            await api.close();
        }
    });

    test("UnionOrIntersectionType.getTypes() returns union members", async () => {
        const { type, api } = await getTypeAtName(spawnAPI(typeFiles), "union:");
        try {
            assert.ok(type.flags & TypeFlags.Union);
            const union = type as UnionOrIntersectionType;
            const types = await union.getTypes();
            assert.ok(types.length >= 2);
            assert.equal(type.isUnionType(), true);
            assert.equal(type.isIntersectionType(), false);
        }
        finally {
            await api.close();
        }
    });

    test("UnionOrIntersectionType.getTypes() returns intersection members", async () => {
        const { type, api } = await getTypeAtName(spawnAPI(typeFiles), "intersection:");
        try {
            assert.ok(type.flags & TypeFlags.Intersection);
            const inter = type as UnionOrIntersectionType;
            const types = await inter.getTypes();
            assert.ok(types.length >= 2);
        }
        finally {
            await api.close();
        }
    });

    test("UnionOrIntersectionType.getTypes() on a wrongly-cast type returns undefined without hitting the server", async () => {
        const src = `export const s: string = ""; export const u: string | number = "";`;
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;

            // `string` is neither a union/intersection nor a template literal type,
            // so it has no constituent types. The client guards on the type's flags
            // and returns undefined without ever sending a request the server cannot satisfy.
            const sSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("s:"));
            assert.ok(sSymbol);
            const sType = await project.checker.getTypeOfSymbol(sSymbol);
            assert.ok(sType);
            assert.equal(await (sType as unknown as UnionOrIntersectionType).getTypes(), undefined);

            // A real union still returns its constituents.
            const uSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("u:"));
            assert.ok(uSymbol);
            const uType = await project.checker.getTypeOfSymbol(uSymbol);
            assert.ok(uType);
            assert.equal((await (uType as UnionOrIntersectionType).getTypes()).length, 2);
        }
        finally {
            await api.close();
        }
    });

    test("IndexType.getTarget() returns the target type", async () => {
        const api = spawnAPI(typeFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const symbol = await project.checker.resolveName("KeyOf", SymbolFlags.TypeAlias, { document: "/src/types.ts", position: 0 });
            assert.ok(symbol);
            const type = await project.checker.getDeclaredTypeOfSymbol(symbol);
            assert.ok(type);
            // KeyOf<T> = keyof T — this is an IndexType
            assert.ok(type.flags & TypeFlags.Index, `Expected IndexType, got flags ${type.flags}`);
            const indexType = type as IndexType;
            const target = await indexType.getTarget();
            assert.ok(target);
        }
        finally {
            await api.close();
        }
    });

    test("IndexedAccessType.getObjectType() and getIndexType()", async () => {
        const api = spawnAPI(typeFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const symbol = await project.checker.resolveName("Lookup", SymbolFlags.TypeAlias, { document: "/src/types.ts", position: 0 });
            assert.ok(symbol);
            const type = await project.checker.getDeclaredTypeOfSymbol(symbol);
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.IndexedAccess, `Expected IndexedAccessType, got flags ${type.flags}`);
            const ia = type as IndexedAccessType;
            assert.equal(type.isIndexedAccessType(), true);
            const objectType = await ia.getObjectType();
            assert.ok(objectType);
            const indexType = await ia.getIndexType();
            assert.ok(indexType);
        }
        finally {
            await api.close();
        }
    });

    test("ConditionalType.getCheckType() and getExtendsType()", async () => {
        const api = spawnAPI(typeFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const symbol = await project.checker.resolveName("Cond", SymbolFlags.TypeAlias, { document: "/src/types.ts", position: 0 });
            assert.ok(symbol);
            const type = await project.checker.getDeclaredTypeOfSymbol(symbol);
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Conditional, `Expected ConditionalType, got flags ${type.flags}`);
            const cond = type as ConditionalType;
            assert.equal(type.isConditionalType(), true);
            const checkType = await cond.getCheckType();
            assert.ok(checkType);
            const extendsType = await cond.getExtendsType();
            assert.ok(extendsType);
        }
        finally {
            await api.close();
        }
    });

    test("ConditionalType.getTrueType() and getFalseType()", async () => {
        const api = spawnAPI(typeFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const symbol = await project.checker.resolveName("Cond", SymbolFlags.TypeAlias, { document: "/src/types.ts", position: 0 });
            assert.ok(symbol);
            const type = await project.checker.getDeclaredTypeOfSymbol(symbol);
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Conditional, `Expected ConditionalType, got flags ${type.flags}`);

            const trueType = await (type as ConditionalType).getTrueType();
            assert.ok(trueType, "should return the true-branch type");
            assert.ok(trueType.flags & TypeFlags.StringLiteral, `Expected StringLiteral for true branch, got flags ${trueType.flags}`);
            assert.equal((trueType as LiteralType).value, "yes");

            const falseType = await (type as ConditionalType).getFalseType();
            assert.ok(falseType, "should return the false-branch type");
            assert.ok(falseType.flags & TypeFlags.StringLiteral, `Expected StringLiteral for false branch, got flags ${falseType.flags}`);
            assert.equal((falseType as LiteralType).value, "no");
        }
        finally {
            await api.close();
        }
    });

    test("TemplateLiteralType.texts and getTypes()", async () => {
        const { type, api } = await getTypeAtName(spawnAPI(typeFiles), "tpl:");
        try {
            assert.ok(type.flags & TypeFlags.TemplateLiteral, `Expected TemplateLiteralType, got flags ${type.flags}`);
            const tpl = type as TemplateLiteralType;
            assert.ok(tpl.texts);
            assert.ok(tpl.texts.length >= 2);
            assert.equal(tpl.texts[0], "hello ");
            const types = await tpl.getTypes();
            assert.ok(types.length >= 1);
        }
        finally {
            await api.close();
        }
    });

    test("StringMappingType.getTarget() returns the mapped type", async () => {
        const api = spawnAPI(typeFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = typeFiles["/src/types.ts"];
            const pos = src.indexOf("Upper");
            const symbol = await project.checker.getSymbolAtPosition("/src/types.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            // Uppercase<"hello"> may resolve to a StringMappingType or a string literal
            if (type.flags & TypeFlags.StringMapping) {
                const sm = type as StringMappingType;
                const target = await sm.getTarget();
                assert.ok(target);
            }
            // If it resolved to "HELLO" literal, that's fine too — it means eager evaluation
        }
        finally {
            await api.close();
        }
    });

    test("TupleType properties", async () => {
        const { type, api } = await getTypeAtName(spawnAPI(typeFiles), "tuple:");
        try {
            assert.ok(type.flags & TypeFlags.Object);
            const ref = type as TypeReference;
            assert.ok(ref.objectFlags & ObjectFlags.Reference);
            const target = await ref.getTarget();
            assert.ok(target);
            assert.ok(target.flags & TypeFlags.Object);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - intrinsic type getters", () => {
    const intrinsicFiles = {
        "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
        "/src/main.ts": `export const x = 1;`,
    };

    test("getAnyType returns a type with Any flag", async () => {
        const api = spawnAPI(intrinsicFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const type = await project.checker.getAnyType();
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Any);
        }
        finally {
            await api.close();
        }
    });

    test("getStringType returns a type with String flag", async () => {
        const api = spawnAPI(intrinsicFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const type = await project.checker.getStringType();
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.String);
        }
        finally {
            await api.close();
        }
    });

    test("getNumberType returns a type with Number flag", async () => {
        const api = spawnAPI(intrinsicFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const type = await project.checker.getNumberType();
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Number);
        }
        finally {
            await api.close();
        }
    });

    test("getBooleanType returns a type with Boolean flag", async () => {
        const api = spawnAPI(intrinsicFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const type = await project.checker.getBooleanType();
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Boolean);
        }
        finally {
            await api.close();
        }
    });

    test("getVoidType returns a type with Void flag", async () => {
        const api = spawnAPI(intrinsicFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const type = await project.checker.getVoidType();
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Void);
        }
        finally {
            await api.close();
        }
    });

    test("getUndefinedType returns a type with Undefined flag", async () => {
        const api = spawnAPI(intrinsicFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const type = await project.checker.getUndefinedType();
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Undefined);
        }
        finally {
            await api.close();
        }
    });

    test("getNullType returns a type with Null flag", async () => {
        const api = spawnAPI(intrinsicFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const type = await project.checker.getNullType();
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Null);
        }
        finally {
            await api.close();
        }
    });

    test("getNeverType returns a type with Never flag", async () => {
        const api = spawnAPI(intrinsicFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const type = await project.checker.getNeverType();
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Never);
        }
        finally {
            await api.close();
        }
    });

    test("getUnknownType returns a type with Unknown flag", async () => {
        const api = spawnAPI(intrinsicFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const type = await project.checker.getUnknownType();
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Unknown);
        }
        finally {
            await api.close();
        }
    });

    test("getBigIntType returns a type with BigInt flag", async () => {
        const api = spawnAPI(intrinsicFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const type = await project.checker.getBigIntType();
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.BigInt);
        }
        finally {
            await api.close();
        }
    });

    test("getESSymbolType returns a type with ESSymbol flag", async () => {
        const api = spawnAPI(intrinsicFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const type = await project.checker.getESSymbolType();
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.ESSymbol);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - multi-project type ID uniqueness", () => {
    test("intrinsic types from 3 projects in the same snapshot have non-colliding IDs", async () => {
        const api = spawnAPI({
            "/proj1/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/proj1/src/index.ts": `export const x = 1;`,
            "/proj2/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/proj2/src/index.ts": `export const y = "hello";`,
            "/proj3/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/proj3/src/index.ts": `export const z = true;`,
        });
        try {
            // Open all 3 projects — each updateSnapshot accumulates open projects
            await api.updateSnapshot({ openProject: "/proj1/tsconfig.json" });
            await api.updateSnapshot({ openProject: "/proj2/tsconfig.json" });
            const snapshot = await api.updateSnapshot({ openProject: "/proj3/tsconfig.json" });

            const proj1 = snapshot.getProject("/proj1/tsconfig.json")!;
            const proj2 = snapshot.getProject("/proj2/tsconfig.json")!;
            const proj3 = snapshot.getProject("/proj3/tsconfig.json")!;
            assert.ok(proj1, "proj1 should be in final snapshot");
            assert.ok(proj2, "proj2 should be in final snapshot");
            assert.ok(proj3, "proj3 should be in final snapshot");

            // Fetch several intrinsic types from each checker.
            // If type IDs collide across checkers, registerType panics → API error.
            const num1 = await proj1.checker.getNumberType();
            const str1 = await proj1.checker.getStringType();
            const bool1 = await proj1.checker.getBooleanType();
            const any1 = await proj1.checker.getAnyType();
            const num2 = await proj2.checker.getNumberType();
            const str2 = await proj2.checker.getStringType();
            const bool2 = await proj2.checker.getBooleanType();
            const any2 = await proj2.checker.getAnyType();
            const num3 = await proj3.checker.getNumberType();
            const str3 = await proj3.checker.getStringType();
            const bool3 = await proj3.checker.getBooleanType();
            const any3 = await proj3.checker.getAnyType();

            assert.ok(num1.flags & TypeFlags.Number, "proj1 number type");
            assert.ok(str1.flags & TypeFlags.String, "proj1 string type");
            assert.ok(bool1.flags & TypeFlags.Boolean, "proj1 boolean type");
            assert.ok(any1.flags & TypeFlags.Any, "proj1 any type");

            assert.ok(num2.flags & TypeFlags.Number, "proj2 number type");
            assert.ok(str2.flags & TypeFlags.String, "proj2 string type");
            assert.ok(bool2.flags & TypeFlags.Boolean, "proj2 boolean type");
            assert.ok(any2.flags & TypeFlags.Any, "proj2 any type");

            assert.ok(num3.flags & TypeFlags.Number, "proj3 number type");
            assert.ok(str3.flags & TypeFlags.String, "proj3 string type");
            assert.ok(bool3.flags & TypeFlags.Boolean, "proj3 boolean type");
            assert.ok(any3.flags & TypeFlags.Any, "proj3 any type");
        }
        finally {
            await api.close();
        }
    });

    test("symbol and signature handles from 3 projects in the same snapshot have non-colliding IDs", async () => {
        const api = spawnAPI({
            "/proj1/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/proj1/src/index.ts": `export function add(a: number, b: number): number { return a + b; }`,
            "/proj2/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/proj2/src/index.ts": `export function greet(name: string): string { return "hello " + name; }`,
            "/proj3/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/proj3/src/index.ts": `export function toggle(b: boolean): boolean { return !b; }`,
        });
        try {
            await api.updateSnapshot({ openProject: "/proj1/tsconfig.json" });
            await api.updateSnapshot({ openProject: "/proj2/tsconfig.json" });
            const snapshot = await api.updateSnapshot({ openProject: "/proj3/tsconfig.json" });

            const proj1 = snapshot.getProject("/proj1/tsconfig.json")!;
            const proj2 = snapshot.getProject("/proj2/tsconfig.json")!;
            const proj3 = snapshot.getProject("/proj3/tsconfig.json")!;

            // Get a symbol from each project (exercises symbol registry)
            const src1 = `export function add(a: number, b: number): number { return a + b; }`;
            const src2 = `export function greet(name: string): string { return "hello " + name; }`;
            const src3 = `export function toggle(b: boolean): boolean { return !b; }`;

            const sym1 = await proj1.checker.getSymbolAtPosition("/proj1/src/index.ts", src1.indexOf("add"));
            const sym2 = await proj2.checker.getSymbolAtPosition("/proj2/src/index.ts", src2.indexOf("greet"));
            const sym3 = await proj3.checker.getSymbolAtPosition("/proj3/src/index.ts", src3.indexOf("toggle"));
            assert.ok(sym1, "proj1 symbol");
            assert.ok(sym2, "proj2 symbol");
            assert.ok(sym3, "proj3 symbol");
            assert.equal(sym1.name, "add", "proj1 symbol name");
            assert.equal(sym2.name, "greet", "proj2 symbol name");
            assert.equal(sym3.name, "toggle", "proj3 symbol name");

            // Get type of each symbol, then signatures (exercises type + signature registries)
            const type1 = await proj1.checker.getTypeOfSymbol(sym1);
            const type2 = await proj2.checker.getTypeOfSymbol(sym2);
            const type3 = await proj3.checker.getTypeOfSymbol(sym3);
            assert.ok(type1, "proj1 function type");
            assert.ok(type2, "proj2 function type");
            assert.ok(type3, "proj3 function type");

            const sigs1 = await proj1.checker.getSignaturesOfType(type1, SignatureKind.Call);
            const sigs2 = await proj2.checker.getSignaturesOfType(type2, SignatureKind.Call);
            const sigs3 = await proj3.checker.getSignaturesOfType(type3, SignatureKind.Call);
            assert.equal(sigs1.length, 1, "proj1 has 1 call signature");
            assert.equal(sigs2.length, 1, "proj2 has 1 call signature");
            assert.equal(sigs3.length, 1, "proj3 has 1 call signature");
            assert.equal(sigs1[0].parameters.length, 2, "proj1 add() has 2 params");
            assert.equal(sigs2[0].parameters.length, 1, "proj2 greet() has 1 param");
            assert.equal(sigs3[0].parameters.length, 1, "proj3 toggle() has 1 param");
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getBaseTypeOfLiteralType", () => {
    test("number literal widens to number", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const x = 42;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export const x = 42;`;
            const pos = src.indexOf("x =");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const literalType = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(literalType);
            assert.ok(literalType.flags & TypeFlags.NumberLiteral);
            const baseType = await project.checker.getBaseTypeOfLiteralType(literalType);
            assert.ok(baseType);
            assert.ok(baseType.flags & TypeFlags.Number);
        }
        finally {
            await api.close();
        }
    });

    test("string literal widens to string", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const s = "hello";`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export const s = "hello";`;
            const pos = src.indexOf("s ");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const literalType = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(literalType);
            assert.ok(literalType.flags & TypeFlags.StringLiteral);
            const baseType = await project.checker.getBaseTypeOfLiteralType(literalType);
            assert.ok(baseType);
            assert.ok(baseType.flags & TypeFlags.String);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getContextualType", () => {
    test("contextual type from function parameter", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
function foo(x: number) {}
foo(42);
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;

            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);

            // Find the argument "42" in foo(42)
            // statement[1] = foo(42); which is an ExpressionStatement -> CallExpression
            const callStmt = sourceFile.statements[1];
            assert.ok(callStmt);
            let numLiteral: import("@typescript/native-preview/unstable/ast").Expression | undefined;
            callStmt.forEachChild(function visit(node) {
                if (isCallExpression(node)) {
                    // First argument
                    numLiteral = node.arguments[0];
                }
                node.forEachChild(visit);
            });
            assert.ok(numLiteral);
            const contextualType = await project.checker.getContextualType(numLiteral);
            assert.ok(contextualType);
            assert.ok(contextualType.flags & TypeFlags.Number);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getTypeOfSymbolAtLocation", () => {
    test("narrowed type via typeof check", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export function check(x: string | number) {
    if (typeof x === "string") {
        return x;
    }
    return x;
}
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\nexport function check(x: string | number) {\n    if (typeof x === "string") {\n        return x;\n    }\n    return x;\n}\n`;

            // Get the symbol for parameter "x"
            const paramPos = src.indexOf("x:");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", paramPos);
            assert.ok(symbol);
            assert.equal(symbol.name, "x");

            // Get the type of "x" at the wider function scope — should be string | number
            const wideType = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(wideType);
            assert.ok(wideType.flags & TypeFlags.Union, `Expected union type, got flags ${wideType.flags}`);

            // Get the narrowed return x inside the if block
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);

            // statement[0] is the function declaration
            const funcDecl = sourceFile.statements[0];
            assert.ok(funcDecl);
            // Walk to find the first "return x" — inside the if, x should be narrowed to string
            let firstReturnX: import("@typescript/native-preview/unstable/ast").Node | undefined;
            funcDecl.forEachChild(function visit(node) {
                if (isReturnStatement(node) && !firstReturnX) {
                    // The expression of the return statement is the identifier "x"
                    if (node.expression) {
                        firstReturnX = node.expression;
                    }
                }
                node.forEachChild(visit);
            });
            assert.ok(firstReturnX);
            const narrowedType = await project.checker.getTypeOfSymbolAtLocation(symbol, firstReturnX);
            assert.ok(narrowedType);
            // Inside the if (typeof x === "string") branch, x should be narrowed to string
            assert.ok(narrowedType.flags & TypeFlags.String, `Expected string type, got flags ${narrowedType.flags}`);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getShorthandAssignmentValueSymbol", () => {
    test("shorthand property symbol resolves to variable", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
const name = "Alice";
export const obj = { name };
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;

            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);

            // Find the shorthand property assignment { name }
            // statement[1] = export const obj = { name };
            let shorthandNode: import("@typescript/native-preview/unstable/ast").Node | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (isShorthandPropertyAssignment(node)) {
                    shorthandNode = node;
                }
                node.forEachChild(visit);
            });
            assert.ok(shorthandNode, "Should find a shorthand property assignment");
            const valueSymbol = await project.checker.getShorthandAssignmentValueSymbol(shorthandNode);
            assert.ok(valueSymbol);
            assert.equal(valueSymbol.name, "name");
        }
        finally {
            await api.close();
        }
    });
});

describe("readFile callback semantics", () => {
    test("readFile: string returns content, null blocks fallback, undefined falls through to real FS", async () => {
        const virtualFiles: Record<string, string> = {
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/index.ts": `export const x: number = 1;`,
        };
        const vfs = createVirtualFileSystem(virtualFiles);
        const blockedPath = "/src/blocked.ts";

        const fs: FileSystem = {
            ...vfs,
            readFile: (fileName: string) => {
                if (fileName === blockedPath) {
                    // null = file not found, don't fall back to real FS
                    return null;
                }
                // Try the VFS first; if it has the file, return its content (string).
                // Otherwise return undefined to fall through to the real FS.
                return vfs.readFile!(fileName);
            },
        };

        const api = new API({
            cwd: fileURLToPath(new URL("../../../../", import.meta.url).toString()),
            fs,
        });

        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;

            // 1. String content: virtual file is found
            const sf = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sf, "Virtual file should be found");
            assert.equal(sf.text, virtualFiles["/src/index.ts"]);

            // 2. undefined fallback: lib files from the real FS should be present.
            //    If readFile returned null for unknowns, lib files would be missing
            //    and `number` would not resolve — this was the original async bug.
            //    Verify by checking that `number` resolves to a proper type (not error).
            const pos = virtualFiles["/src/index.ts"].indexOf("x:");
            const type = await project.checker.getTypeAtPosition("/src/index.ts", pos);
            assert.ok(type, "Type should resolve");
            assert.ok(type.flags & TypeFlags.Number, `Expected number type, got flags ${type.flags}`);

            // 3. null blocks fallback: blocked file should not be found
            const blockedSf = await project.program.getSourceFile(blockedPath);
            assert.equal(blockedSf, undefined, "Blocked file should not be found (null prevents fallback)");
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - isArrayType / isTupleType", () => {
    test("number[] is array, not tuple", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const xs: number[] = [];`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export const xs: number[] = [];`;
            const pos = src.indexOf("xs");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.equal(await project.checker.isArrayType(type), true);
            assert.equal(await project.checker.isTupleType(type), false);
        }
        finally {
            await api.close();
        }
    });

    test("readonly number[] is array", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const xs: readonly number[] = [];`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export const xs: readonly number[] = [];`;
            const pos = src.indexOf("xs");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.equal(await project.checker.isArrayType(type), true);
            assert.equal(await project.checker.isTupleType(type), false);
        }
        finally {
            await api.close();
        }
    });

    test("Array<number> is array, not tuple", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const xs: Array<number> = [];`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export const xs: Array<number> = [];`;
            const pos = src.indexOf("xs");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.equal(await project.checker.isArrayType(type), true);
            assert.equal(await project.checker.isTupleType(type), false);
        }
        finally {
            await api.close();
        }
    });

    test("[number, string] is tuple, not array", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const tup: [number, string] = [1, "a"];`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export const tup: [number, string] = [1, "a"];`;
            const pos = src.indexOf("tup");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.equal(await project.checker.isArrayType(type), false);
            assert.equal(await project.checker.isTupleType(type), true);
        }
        finally {
            await api.close();
        }
    });

    test("readonly [number, string] is tuple, not array", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const tup: readonly [number, string] = [1, "a"];`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export const tup: readonly [number, string] = [1, "a"];`;
            const pos = src.indexOf("tup");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.equal(await project.checker.isArrayType(type), false);
            assert.equal(await project.checker.isTupleType(type), true);
        }
        finally {
            await api.close();
        }
    });

    test("string is neither array nor tuple", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const str: string = "";`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export const str: string = "";`;
            const pos = src.indexOf("str");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.equal(await project.checker.isArrayType(type), false);
            assert.equal(await project.checker.isTupleType(type), false);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getReturnTypeOfSignature", () => {
    test("returns the return type of a function signature", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export function add(a: number, b: number): number { return a + b; }`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export function add(a: number, b: number): number { return a + b; }`;
            const pos = src.indexOf("add(");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const returnType = await project.checker.getReturnTypeOfSignature(sigs[0]);
            assert.ok(returnType);
            assert.ok(returnType.flags & TypeFlags.Number, `Expected number, got flags ${returnType.flags}`);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getRestTypeOfSignature", () => {
    test("returns the rest type of a signature with rest parameter", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export function sum(...nums: number[]): number { return nums.reduce((a, b) => a + b, 0); }`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export function sum(...nums: number[]): number { return nums.reduce((a, b) => a + b, 0); }`;
            const pos = src.indexOf("sum(");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const restType = await project.checker.getRestTypeOfSignature(sigs[0]);
            assert.ok(restType);
            assert.ok(restType.flags & TypeFlags.Number, `Expected number type, got flags ${restType.flags}`);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getTypePredicateOfSignature", () => {
    test("returns type predicate for 'x is T' guard", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export function isString(x: unknown): x is string { return typeof x === "string"; }`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export function isString(x: unknown): x is string { return typeof x === "string"; }`;
            const pos = src.indexOf("isString(");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const predicate = await project.checker.getTypePredicateOfSignature(sigs[0]);
            assert.ok(predicate);
            assert.equal(predicate.kind, TypePredicateKind.Identifier);
            assert.equal(predicate.parameterName, "x");
            assert.equal(predicate.parameterIndex, 0);
            assert.ok(predicate.type);
            assert.ok(predicate.type.flags & TypeFlags.String);
        }
        finally {
            await api.close();
        }
    });

    test("returns type predicate for 'this is T' guard", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export class Animal {
    isdog(): this is Dog { return this instanceof Dog; }
}
export class Dog extends Animal {
    bark() {}
}
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\nexport class Animal {\n    isdog(): this is Dog { return this instanceof Dog; }\n}\nexport class Dog extends Animal {\n    bark() {}\n}\n`;
            const pos = src.indexOf("isdog(");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const predicate = await project.checker.getTypePredicateOfSignature(sigs[0]);
            assert.ok(predicate);
            assert.equal(predicate.kind, TypePredicateKind.This);
        }
        finally {
            await api.close();
        }
    });

    test("returns type predicate for 'asserts x is T'", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export function assertIsString(x: unknown): asserts x is string { if (typeof x !== "string") throw new Error(); }`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export function assertIsString(x: unknown): asserts x is string { if (typeof x !== "string") throw new Error(); }`;
            const pos = src.indexOf("assertIsString(");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const predicate = await project.checker.getTypePredicateOfSignature(sigs[0]);
            assert.ok(predicate);
            assert.equal(predicate.kind, TypePredicateKind.AssertsIdentifier);
            assert.equal(predicate.parameterName, "x");
            assert.equal(predicate.parameterIndex, 0);
            assert.ok(predicate.type);
            assert.ok(predicate.type.flags & TypeFlags.String);
        }
        finally {
            await api.close();
        }
    });

    test("returns undefined for signature without type predicate", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export function add(a: number, b: number): number { return a + b; }`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export function add(a: number, b: number): number { return a + b; }`;
            const pos = src.indexOf("add(");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const predicate = await project.checker.getTypePredicateOfSignature(sigs[0]);
            assert.equal(predicate, undefined);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getBaseTypes", () => {
    test("returns base types of a class", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export class Base {
    x: number = 0;
}
export class Derived extends Base {
    y: string = "";
}
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\nexport class Base {\n    x: number = 0;\n}\nexport class Derived extends Base {\n    y: string = "";\n}\n`;
            const pos = src.indexOf("Derived");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getDeclaredTypeOfSymbol(symbol);
            assert.ok(type);
            const baseTypes = await project.checker.getBaseTypes(type as InterfaceType);
            assert.ok(baseTypes.length > 0, "Should have at least one base type");
            const baseSymbol = await baseTypes[0].getSymbol();
            assert.ok(baseSymbol);
            assert.equal(baseSymbol.name, "Base");
        }
        finally {
            await api.close();
        }
    });

    test("returns base types of an interface", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export interface Animal {
    name: string;
}
export interface Dog extends Animal {
    bark(): void;
}
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\nexport interface Animal {\n    name: string;\n}\nexport interface Dog extends Animal {\n    bark(): void;\n}\n`;
            const pos = src.indexOf("Dog");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getDeclaredTypeOfSymbol(symbol);
            assert.ok(type);
            const baseTypes = await project.checker.getBaseTypes(type as InterfaceType);
            assert.ok(baseTypes.length > 0, "Should have at least one base type");
            const baseSymbol = await baseTypes[0].getSymbol();
            assert.ok(baseSymbol);
            assert.equal(baseSymbol.name, "Animal");
        }
        finally {
            await api.close();
        }
    });

    test("does not panic for a type alias to a generic interface instantiation", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export interface Box<T> {
    value: T;
}
export type BoxOfString = Box<string>;
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);
            const typeAlias = sourceFile.statements.find(isTypeAliasDeclaration);
            assert.ok(typeAlias);
            const type = await project.checker.getTypeAtLocation(typeAlias);
            assert.ok(type);
            // A generic interface instantiation produces a type reference, not an
            // interface type, so it has no base types and yields [].
            const baseTypes = await project.checker.getBaseTypes(type as InterfaceType);
            assert.deepEqual(baseTypes, []);
        }
        finally {
            await api.close();
        }
    });
});

describe("Type - getBaseTypes", () => {
    test("returns base types for a class type and undefined for a non-class/interface", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export class Base {
    x: number = 0;
}
export class Derived extends Base {
    y: string = "";
}
export const n: number = 0;
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\nexport class Base {\n    x: number = 0;\n}\nexport class Derived extends Base {\n    y: string = "";\n}\nexport const n: number = 0;\n`;

            const derivedSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("Derived"));
            assert.ok(derivedSymbol);
            const derivedType = await project.checker.getDeclaredTypeOfSymbol(derivedSymbol);
            assert.ok(derivedType.isClassOrInterface(), "Derived should be a class/interface type");
            const baseTypes = await derivedType.getBaseTypes();
            assert.ok(baseTypes && baseTypes.length > 0, "class type should have base types");
            const baseSymbol = await baseTypes![0].getSymbol();
            assert.equal(baseSymbol?.name, "Base");

            // A primitive type is not a class/interface, so getBaseTypes() is undefined.
            const numberSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("n:"));
            assert.ok(numberSymbol);
            const numberType = await project.checker.getTypeOfSymbol(numberSymbol);
            assert.ok(numberType);
            assert.equal(numberType.isClassOrInterface(), false);
            assert.equal(await numberType.getBaseTypes(), undefined);
        }
        finally {
            await api.close();
        }
    });
});

describe("Type - isErrorType", () => {
    test("identifies the error type from an unresolvable annotation", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
declare const good: string;
declare const bad: ThisTypeDoesNotExist;
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\ndeclare const good: string;\ndeclare const bad: ThisTypeDoesNotExist;\n`;

            const badSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("bad"));
            assert.ok(badSymbol);
            const badType = await project.checker.getTypeOfSymbol(badSymbol);
            assert.ok(badType);
            assert.ok(badType.isErrorType(), "unresolved annotation should yield the error type");
            assert.ok(isErrorType(badType));

            const goodSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("good"));
            assert.ok(goodSymbol);
            const goodType = await project.checker.getTypeOfSymbol(goodSymbol);
            assert.ok(goodType);
            assert.equal(goodType.isErrorType(), false, "string type is not the error type");
            assert.equal(isErrorType(goodType), false);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - well-known symbols", () => {
    test("isUnknownSymbol identifies the aliased unknown symbol", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export const value = 1;
export type Alias = typeof value;
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\nexport const value = 1;\nexport type Alias = typeof value;\n`;

            // A real symbol is not the unknown/undefined symbol.
            const valueSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("value"));
            assert.ok(valueSymbol);
            assert.equal(await project.checker.isUnknownSymbol(valueSymbol), false);
            assert.equal(await project.checker.isUndefinedSymbol(valueSymbol), false);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - well-known signatures", () => {
    test("isUnknownSignature identifies an unresolvable call", async () => {
        const src = `
const ok = (x: number) => x;
ok(1);
const notCallable = 1;
notCallable();
`;
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);
            const calls: Node[] = [];
            sourceFile.forEachChild(function visit(node) {
                if (isCallExpression(node)) calls.push(node);
                node.forEachChild(visit);
            });
            assert.equal(calls.length, 2, "should find two call expressions");

            // The valid call resolves to a real signature, not the unknown signature.
            const okSig = await project.checker.getResolvedSignature(calls[0]);
            assert.equal(await project.checker.isUnknownSignature(okSig), false);

            // The call to a non-callable value yields the unknown signature.
            const badSig = await project.checker.getResolvedSignature(calls[1]);
            assert.equal(await project.checker.isUnknownSignature(badSig), true);
        }
        finally {
            await api.close();
        }
    });
});

describe("Symbol - escaped names and tables", () => {
    test("getExports/getMembers return a cached Map keyed by escaped name", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export class Animal {
    name: string = "";
    speak(): void {}
}
export const value = 1;
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);
            const moduleSymbol = await project.checker.getSymbolAtLocation(sourceFile);
            assert.ok(moduleSymbol);

            const exports = await moduleSymbol.getExports();
            assert.ok(exports.has(escapeLeadingUnderscores("Animal")));
            assert.ok(exports.get(escapeLeadingUnderscores("value")));
            // Calling again returns the same cached Map instance.
            assert.strictEqual(await moduleSymbol.getExports(), exports);

            const animal = exports.get(escapeLeadingUnderscores("Animal"))!;
            const members = await animal.getMembers();
            assert.ok(members.get(escapeLeadingUnderscores("name")));
            assert.ok(members.get(escapeLeadingUnderscores("speak")));
            assert.strictEqual(await animal.getMembers(), members);
        }
        finally {
            await api.close();
        }
    });

    test("anonymous type symbol has a __-escaped name, never the \\xFE sentinel", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export const obj: { a: number } = { a: 1 };
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\nexport const obj: { a: number } = { a: 1 };\n`;
            const objSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("obj"));
            assert.ok(objSymbol);
            const objType = await project.checker.getTypeOfSymbol(objSymbol);
            assert.ok(objType);
            const typeSymbol = await objType.getSymbol();
            assert.ok(typeSymbol);
            // The anonymous type literal symbol is internally named; over the wire
            // it must be the "__type" escaped form, not the raw "\xFE" sentinel.
            assert.equal(typeSymbol.escapedName, InternalSymbolName.Type);
            assert.ok(!typeSymbol.escapedName.includes("\xFE"));
        }
        finally {
            await api.close();
        }
    });
});

describe("ast - escapeLeadingUnderscores", () => {
    test("round-trips display and escaped names", () => {
        assert.equal(escapeLeadingUnderscores("foo"), "foo");
        assert.equal(escapeLeadingUnderscores("_foo"), "_foo");
        assert.equal(escapeLeadingUnderscores("__foo"), "___foo");
        assert.equal(unescapeLeadingUnderscores("foo" as __String), "foo");
        assert.equal(unescapeLeadingUnderscores("__type" as __String), "__type");
        assert.equal(unescapeLeadingUnderscores("___foo" as __String), "__foo");
    });
});

describe("ast - getJSDocTags", () => {
    test("returns a node's own tags, and inherited @param / @template tags", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
/**
 * Adds two numbers.
 * @param a the first number
 * @param b the second number
 * @returns the sum
 */
export function add(a: number, b: number): number {
    return a + b;
}

/**
 * @template T the element type
 * @param x a value
 */
export function identity<T>(x: T): T {
    return x;
}

/** @deprecated use add */
export const total = add(1, 2);
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);
            const functions = [...sourceFile.statements].filter(isFunctionDeclaration);
            const add = functions[0];
            const identity = functions[1];
            assert.ok(add);
            assert.ok(identity);

            // A function reports its own JSDoc tags.
            assert.deepEqual(getJSDocTags(add).map(t => t.tagName.text), ["param", "param", "returns"]);

            // A parameter inherits the matching @param tag from its containing
            // signature.
            const paramA = add.parameters[0];
            const paramATags = getJSDocTags(paramA);
            assert.deepEqual(paramATags.map(t => t.tagName.text), ["param"]);
            const paramATag = paramATags[0];
            assert.ok(isJSDocParameterTag(paramATag));
            assert.ok(isIdentifier(paramATag.name));
            assert.equal(paramATag.name.text, "a");

            const paramB = add.parameters[1];
            const paramBTags = getJSDocTags(paramB);
            assert.deepEqual(paramBTags.map(t => t.tagName.text), ["param"]);
            const paramBTag = paramBTags[0];
            assert.ok(isJSDocParameterTag(paramBTag));
            assert.ok(isIdentifier(paramBTag.name));
            assert.equal(paramBTag.name.text, "b");

            // A type parameter inherits the matching @template tag.
            const typeParam = identity.typeParameters![0];
            assert.deepEqual(getJSDocTags(typeParam).map(t => t.tagName.text), ["template"]);

            // The value parameter of `identity` inherits its @param tag.
            const identityParam = identity.parameters[0];
            assert.deepEqual(getJSDocTags(identityParam).map(t => t.tagName.text), ["param"]);

            // A variable declaration walks up its comment-location chain
            // (declaration -> declaration list -> statement) to the JSDoc on the
            // containing variable statement.
            const variable = sourceFile.statements.find(isVariableStatement);
            assert.ok(variable);
            const declaration = variable.declarationList.declarations[0];
            assert.deepEqual(getJSDocTags(declaration).map(t => t.tagName.text), ["deprecated"]);
        }
        finally {
            await api.close();
        }
    });

    test("a function-expression parameter inherits @param tags from the variable statement", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { allowJs: true, checkJs: true } }),
            "/src/main.js": `
/**
 * @param {string} name a name
 * @returns {number} the length
 */
var measure = function (name) {
    return name.length;
};
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.js");
            assert.ok(sourceFile);
            const variable = sourceFile.statements.find(isVariableStatement);
            assert.ok(variable);
            const declaration = variable.declarationList.declarations[0];
            const funcExpr = declaration.initializer;
            assert.ok(funcExpr);

            // The variable statement carries the @param and @returns tags.
            assert.deepEqual(getJSDocTags(declaration).map(t => t.tagName.text), ["param", "returns"]);

            // The function expression's parameter walks declaration -> list ->
            // statement and inherits the matching @param tag.
            const param = (funcExpr as unknown as { parameters: NodeArray<Node>; }).parameters[0];
            const paramTags = getJSDocTags(param);
            assert.deepEqual(paramTags.map(t => t.tagName.text), ["param"]);
            const paramTag = paramTags[0];
            assert.ok(isJSDocParameterTag(paramTag));
            assert.ok(isIdentifier(paramTag.name));
            assert.equal(paramTag.name.text, "name");
        }
        finally {
            await api.close();
        }
    });

    test("a @type cast tag is owned by its parenthesized expression, not the declaration", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { allowJs: true, checkJs: true } }),
            "/src/main.js": `
/** @type {string} */
const value = "hello";

const cast = /** @type {number} */ (someValue);
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.js");
            assert.ok(sourceFile);
            const statements = [...sourceFile.statements].filter(isVariableStatement);

            // A @type tag directly on a declaration is reported for that declaration.
            const valueDecl = statements[0].declarationList.declarations[0];
            assert.deepEqual(getJSDocTags(valueDecl).map(t => t.tagName.text), ["type"]);

            // A @type cast tag attached to a parenthesized expression is owned by
            // that expression and is not reported for the enclosing declaration.
            const castDecl = statements[1].declarationList.declarations[0];
            assert.deepEqual(getJSDocTags(castDecl).map(t => t.tagName.text), []);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getPropertiesOfType", () => {
    test("returns properties of an object type", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export interface Person {
    name: string;
    age: number;
    greet(): void;
}
export declare const p: Person;
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\nexport interface Person {\n    name: string;\n    age: number;\n    greet(): void;\n}\nexport declare const p: Person;\n`;
            const pos = src.indexOf("p: Person");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const props = await project.checker.getPropertiesOfType(type);
            assert.ok(props.length >= 3, `Expected at least 3 properties, got ${props.length}`);
            const names = props.map(p => p.name);
            assert.ok(names.includes("name"), "should have 'name' property");
            assert.ok(names.includes("age"), "should have 'age' property");
            assert.ok(names.includes("greet"), "should have 'greet' property");
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getIndexInfosOfType", () => {
    test("returns index signatures of an indexed type", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export interface StringMap {
    [key: string]: number;
}
export declare const m: StringMap;
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\nexport interface StringMap {\n    [key: string]: number;\n}\nexport declare const m: StringMap;\n`;
            const pos = src.indexOf("m: StringMap");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const indexInfos = await project.checker.getIndexInfosOfType(type);
            assert.ok(indexInfos.length > 0, "Should have at least one index info");
            const info = indexInfos[0];
            assert.ok(info.keyType);
            assert.ok(info.keyType.flags & TypeFlags.String, `Expected string key type, got flags ${info.keyType.flags}`);
            assert.ok(info.valueType);
            assert.ok(info.valueType.flags & TypeFlags.Number, `Expected number value type, got flags ${info.valueType.flags}`);
            assert.equal(info.isReadonly, false);
        }
        finally {
            await api.close();
        }
    });

    test("readonly index signature reports isReadonly true", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export interface ReadonlyMap {
    readonly [key: string]: number;
}
export declare const m: ReadonlyMap;
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\nexport interface ReadonlyMap {\n    readonly [key: string]: number;\n}\nexport declare const m: ReadonlyMap;\n`;
            const pos = src.indexOf("m: ReadonlyMap");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const indexInfos = await project.checker.getIndexInfosOfType(type);
            assert.ok(indexInfos.length > 0);
            assert.equal(indexInfos[0].isReadonly, true);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getConstraintOfTypeParameter", () => {
    test("returns constraint of a type parameter", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export function identity<T extends string>(x: T): T { return x; }`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export function identity<T extends string>(x: T): T { return x; }`;
            const pos = src.indexOf("identity<");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            assert.ok(sigs[0].typeParameters && sigs[0].typeParameters.length > 0, "Should have type parameters");
            const typeParams = await sigs[0].getTypeParameters();
            const constraint = await project.checker.getConstraintOfTypeParameter(typeParams[0]);
            assert.ok(constraint);
            assert.ok(constraint.flags & TypeFlags.String, `Expected string constraint, got flags ${constraint.flags}`);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - TypeParameter getters", () => {
    test("getConstraint() and getDefault() return the constraint and default types", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export function f<T extends string = "hello">(x: T): T { return x; }`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export function f<T extends string = "hello">(x: T): T { return x; }`;
            const pos = src.indexOf("f<");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const typeParams = await sigs[0].getTypeParameters();
            assert.ok(typeParams.length > 0, "Should have type parameters");
            const typeParam = typeParams[0] as TypeParameter;

            const constraint = await typeParam.getConstraint();
            assert.ok(constraint);
            assert.ok(constraint.flags & TypeFlags.String, `Expected string constraint, got flags ${constraint.flags}`);

            const defaultType = await typeParam.getDefault();
            assert.ok(defaultType);
            assert.ok(defaultType.flags & TypeFlags.StringLiteral, `Expected string literal default, got flags ${defaultType.flags}`);
        }
        finally {
            await api.close();
        }
    });

    test("getConstraint() and getDefault() return undefined when there is none", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export function f<T>(x: T): T { return x; }`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export function f<T>(x: T): T { return x; }`;
            const pos = src.indexOf("f<");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const typeParams = await sigs[0].getTypeParameters();
            assert.ok(typeParams.length > 0, "Should have type parameters");
            const typeParam = typeParams[0] as TypeParameter;

            assert.equal(await typeParam.getConstraint(), undefined);
            assert.equal(await typeParam.getDefault(), undefined);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getTypeArguments", () => {
    test("returns type arguments of a generic instantiation", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const arr: Array<number> = [1, 2, 3];`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export const arr: Array<number> = [1, 2, 3];`;
            const pos = src.indexOf("arr:");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const typeArgs = await project.checker.getTypeArguments(type as TypeReference);
            assert.ok(typeArgs.length > 0, "Should have type arguments");
            assert.ok(typeArgs[0].flags & TypeFlags.Number, `Expected number type argument, got flags ${typeArgs[0].flags}`);
        }
        finally {
            await api.close();
        }
    });

    test("a wrongly-typed call throws on the client without taking down the server", async () => {
        const src = `export const s: string = ""; export const arr: Array<number> = [1];`;
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;

            // `string` is not a type reference. When getTypeArguments is reached
            // with one, the server panics, but the per-request panic recovery
            // converts that into an error response rather than crashing the process.
            const sSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("s:"));
            assert.ok(sSymbol);
            const sType = await project.checker.getTypeOfSymbol(sSymbol);
            assert.ok(sType);
            await assert.rejects(() => project.checker.getTypeArguments(sType as unknown as TypeReference)); // @sync: assert.throws(() => project.checker.getTypeArguments(sType as unknown as TypeReference));

            // The server survived: a subsequent valid request still succeeds.
            const arrSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("arr:"));
            assert.ok(arrSymbol);
            const arrType = await project.checker.getTypeOfSymbol(arrSymbol);
            assert.ok(arrType);
            const typeArgs = await project.checker.getTypeArguments(arrType as TypeReference);
            assert.ok(typeArgs.length > 0, "Server should still serve valid requests");
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getBaseConstraintOfType", () => {
    test("returns the base constraint of a type parameter", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export function identity<T extends string>(x: T): T { return x; }`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `export function identity<T extends string>(x: T): T { return x; }`;
            const pos = src.indexOf("identity<");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const sigs = await project.checker.getSignaturesOfType(type, SignatureKind.Call);
            assert.ok(sigs.length > 0);
            const typeParams = await sigs[0].getTypeParameters();
            const constraint = await project.checker.getBaseConstraintOfType(typeParams[0]);
            assert.ok(constraint, "Should resolve a base constraint");
            assert.ok(constraint.flags & TypeFlags.String, `Expected string constraint, got flags ${constraint.flags}`);
        }
        finally {
            await api.close();
        }
    });

    test("returns undefined for a non-instantiable type", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const x: number = 1;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = `export const x: number = 1;`.indexOf("x:");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const constraint = await project.checker.getBaseConstraintOfType(type);
            assert.equal(constraint, undefined);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getPropertyOfType", () => {
    test("returns a named property symbol of a type", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
export interface Person {
    name: string;
    age: number;
}
export declare const p: Person;
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const src = `\nexport interface Person {\n    name: string;\n    age: number;\n}\nexport declare const p: Person;\n`;
            const pos = src.indexOf("p: Person");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const nameProp = await project.checker.getPropertyOfType(type, "name");
            assert.ok(nameProp, "Should find 'name' property");
            assert.equal(nameProp.name, "name");
            const missing = await project.checker.getPropertyOfType(type, "doesNotExist");
            assert.equal(missing, undefined);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getConstantValue", () => {
    test("returns numeric value of an enum member", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export enum E { A = 1, B = 2 }`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);
            let memberB: Node | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (node.kind === SyntaxKind.EnumMember) {
                    const text = sourceFile.text.slice(node.pos, node.end).trim();
                    if (text.startsWith("B")) memberB = node;
                }
                node.forEachChild(visit);
            });
            assert.ok(memberB, "Should find enum member B");
            const value = await project.checker.getConstantValue(memberB);
            assert.equal(value, 2);
        }
        finally {
            await api.close();
        }
    });

    test("returns string value of a string-initialized enum member", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export enum Color { Red = "red" }`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);
            let member: Node | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (node.kind === SyntaxKind.EnumMember) member = node;
                node.forEachChild(visit);
            });
            assert.ok(member);
            const value = await project.checker.getConstantValue(member);
            assert.equal(value, "red");
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getSignatureFromDeclaration", () => {
    test("returns the signature of a function declaration", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export function add(a: number, b: number): number { return a + b; }`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);
            let funcDecl: Node | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (isFunctionDeclaration(node)) funcDecl = node;
                node.forEachChild(visit);
            });
            assert.ok(funcDecl, "Should find the function declaration");
            const sig = await project.checker.getSignatureFromDeclaration(funcDecl);
            assert.ok(sig, "Should resolve a signature");
            assert.equal(sig.parameters.length, 2);
            const returnType = await project.checker.getReturnTypeOfSignature(sig);
            assert.ok(returnType);
            assert.ok(returnType.flags & TypeFlags.Number);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getExportSpecifierLocalTargetSymbol", () => {
    test("resolves the local target of an export specifier", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
const value = 42;
export { value as renamed };
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);
            let exportSpecifier: Node | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (node.kind === SyntaxKind.ExportSpecifier) exportSpecifier = node;
                node.forEachChild(visit);
            });
            assert.ok(exportSpecifier, "Should find the export specifier");
            const target = await project.checker.getExportSpecifierLocalTargetSymbol(exportSpecifier);
            assert.ok(target, "Should resolve a local target symbol");
            assert.equal(target.name, "value");
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getAliasedSymbol", () => {
    test("resolves an import alias to its target symbol", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/foo.ts": `export const foo = 42;`,
            "/src/main.ts": `import { foo } from "./foo";\nexport const usage = foo;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = `import { foo } from "./foo";`.indexOf("foo }");
            const aliasSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(aliasSymbol);
            assert.ok(aliasSymbol.flags & SymbolFlags.Alias, "Import binding should be an alias");
            const aliased = await project.checker.getAliasedSymbol(aliasSymbol);
            assert.ok(aliased, "Should resolve the aliased symbol");
            assert.equal(aliased.name, "foo");
            assert.ok(!(aliased.flags & SymbolFlags.Alias), "Target should not be an alias");
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getExportsOfModule", () => {
    test("returns all exports including re-exports via 'export *'", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/inner.ts": `export const innerValue = 1;`,
            "/src/index.ts": `
export const direct = 1;
export * from "./inner";
`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);
            const moduleSymbol = await project.checker.getSymbolAtLocation(sourceFile);
            assert.ok(moduleSymbol, "Source file should have a module symbol");
            const exports = await project.checker.getExportsOfModule(moduleSymbol);
            const names = exports.map(e => e.name);
            assert.ok(names.includes("direct"), "should include directly-declared export");
            assert.ok(names.includes("innerValue"), "should include 'export *' re-export");
        }
        finally {
            await api.close();
        }
    });
});

describe("Symbol - getDocumentationComment and getJsDocTags", () => {
    const docFiles = {
        "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
        "/src/main.ts": `
/**
 * Adds two numbers together.
 * @param a the first number
 * @returns the sum
 */
export function add(a: number, b: number): number { return a + b; }
`,
    };

    test("getDocumentationComment returns the leading comment text", async () => {
        const api = spawnAPI(docFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = docFiles["/src/main.ts"].indexOf("add(a");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const doc = await symbol.getDocumentationComment(project.checker);
            assert.ok(doc.includes("Adds two numbers together"), `Expected documentation, got: ${doc}`);
            assert.ok(!doc.includes("@param"), "Documentation comment should not include tags");
        }
        finally {
            await api.close();
        }
    });

    test("getJsDocTags returns structured tag name/text pairs", async () => {
        const api = spawnAPI(docFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = docFiles["/src/main.ts"].indexOf("add(a");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const tags = await symbol.getJsDocTags(project.checker);
            const param = tags.find(t => t.name === "param");
            assert.ok(param, `Expected a @param tag, got: ${JSON.stringify(tags)}`);
            assert.equal(param.text, "a the first number");
            const returns = tags.find(t => t.name === "returns");
            assert.ok(returns, `Expected a @returns tag, got: ${JSON.stringify(tags)}`);
            assert.equal(returns.text, "the sum");
        }
        finally {
            await api.close();
        }
    });
});

describe("TypeParameter - isThisType", () => {
    test("isThisType is true for the polymorphic 'this' type in a class method", async () => {
        const src = `\nexport class Builder {\n    setName(name: string): this { return this; }\n}\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            // ": this {" — offset 2 past ': ' lands on 't' in the return-type 'this'
            const pos = src.indexOf(": this {") + 2;
            const type = await project.checker.getTypeAtPosition("/src/main.ts", pos);
            assert.ok(type, "Expected a type at the 'this' position");
            assert.ok(type.flags & TypeFlags.TypeParameter, "Expected TypeParameter");
            const typeParam = type as TypeParameter;
            assert.equal(typeParam.isThisType, true);
        }
        finally {
            await api.close();
        }
    });

    test("isThisType is absent for a regular generic type parameter", async () => {
        const src = `\nexport function identity<T>(x: T): T { return x; }\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            // Point to 'T' in the type parameter declaration '<T>' — getTypeAtPosition
            // on a type annotation reference doesn't resolve to TypeParameter, but
            // the declaration position does.
            const pos = src.indexOf("<T>") + 1;
            const type = await project.checker.getTypeAtPosition("/src/main.ts", pos);
            assert.ok(type, "Expected a type at the 'T' position");
            assert.ok(type.flags & TypeFlags.TypeParameter, "Expected TypeParameter");
            const typeParam = type as TypeParameter;
            assert.ok(!typeParam.isThisType, "Expected isThisType to be absent/false for a regular type parameter");
        }
        finally {
            await api.close();
        }
    });
});

describe("Type - getAliasTypeArguments", () => {
    test("returns the type arguments of a single-param generic type alias", async () => {
        const src = `\ntype Box<T> = { value: T };\nexport const x: Box<string> = { value: "hi" };\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("x:");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const aliasArgs = await type.getAliasTypeArguments();
            assert.equal(aliasArgs.length, 1, "Expected 1 alias type argument");
            assert.ok(aliasArgs[0].flags & TypeFlags.String, `Expected string, got flags ${aliasArgs[0].flags}`);
        }
        finally {
            await api.close();
        }
    });

    test("returns multiple type arguments for a multi-param generic type alias", async () => {
        const src = `\ntype Pair<A, B> = [A, B];\nexport const p: Pair<string, number> = ["hello", 42];\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("p:");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const aliasArgs = await type.getAliasTypeArguments();
            assert.equal(aliasArgs.length, 2, "Expected 2 alias type arguments");
            assert.ok(aliasArgs[0].flags & TypeFlags.String, `Expected first arg to be string, got flags ${aliasArgs[0].flags}`);
            assert.ok(aliasArgs[1].flags & TypeFlags.Number, `Expected second arg to be number, got flags ${aliasArgs[1].flags}`);
        }
        finally {
            await api.close();
        }
    });

    test("returns empty array for a non-alias generic type", async () => {
        const src = `\nexport const arr: Array<string> = ["hello"];\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("arr:");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const aliasArgs = await type.getAliasTypeArguments();
            assert.equal(aliasArgs.length, 0, "Expected no alias type arguments for a direct generic reference");
        }
        finally {
            await api.close();
        }
    });
});

describe("Type - getAliasSymbol", () => {
    test("returns the symbol for a non-generic type alias", async () => {
        // Object-type aliases preserve aliasSymbol; primitive aliases (type Foo = string) do not.
        const src = `\ntype Point = { x: number; y: number };\nexport const p: Point = { x: 1, y: 2 };\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("p:");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const aliasSymbol = await type.getAliasSymbol();
            assert.ok(aliasSymbol, "Expected alias symbol to exist");
            assert.equal(aliasSymbol.name, "Point");
        }
        finally {
            await api.close();
        }
    });

    test("returns the symbol for a generic type alias", async () => {
        const src = `\ntype Container<T> = { item: T };\nexport const c: Container<number> = { item: 42 };\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("c:");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const aliasSymbol = await type.getAliasSymbol();
            assert.ok(aliasSymbol, "Expected alias symbol for generic alias");
            assert.equal(aliasSymbol.name, "Container");
        }
        finally {
            await api.close();
        }
    });

    test("returns undefined for a non-alias type", async () => {
        const src = `\nexport const str: string = "test";\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("str:");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const aliasSymbol = await type.getAliasSymbol();
            assert.equal(aliasSymbol, undefined, "Expected no alias symbol for primitive type");
        }
        finally {
            await api.close();
        }
    });
});

describe("IntrinsicType - intrinsicName", () => {
    test("intrinsicName matches the primitive type name", async () => {
        const src = `\nexport const x: string = "hello";\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const stringType = await project.checker.getStringType();
            assert.equal((stringType as IntrinsicType).intrinsicName, "string");
            const anyType = await project.checker.getAnyType();
            assert.equal((anyType as IntrinsicType).intrinsicName, "any");
            const neverType = await project.checker.getNeverType();
            assert.equal((neverType as IntrinsicType).intrinsicName, "never");
            const pos = src.indexOf("x:");
            const sym = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(sym);
            const litType = await project.checker.getTypeOfSymbol(sym);
            assert.ok(litType);
            assert.ok(litType.flags & TypeFlags.Intrinsic);
            assert.equal((litType as IntrinsicType).intrinsicName, "string");
        }
        finally {
            await api.close();
        }
    });
});

describe("FreshableType - getFreshType and getRegularType", () => {
    test("LiteralType.value is empty string for the empty-string literal type", async () => {
        const src = `\nexport const empty: "" = "";\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("empty:"));
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.StringLiteral, "Expected StringLiteral");
            const literal = type as LiteralType;
            assert.equal(literal.value, "", "value should be empty string, not undefined");
        }
        finally {
            await api.close();
        }
    });

    test("LiteralType.value is accessible via the FreshableType hierarchy", async () => {
        const src = `\nexport const greeting: "hello" = "hello";\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("greeting:");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.StringLiteral, "Expected StringLiteral");
            const literal = type as LiteralType;
            assert.equal(literal.value, "hello");
        }
        finally {
            await api.close();
        }
    });

    test("BigIntLiteralType.value is a bigint (positive and negative)", async () => {
        const src = `\nexport const pos = 123n;\nexport const neg = -123n;\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;

            const posSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("pos ="));
            assert.ok(posSymbol);
            const posType = await project.checker.getTypeOfSymbol(posSymbol);
            assert.ok(posType);
            assert.ok(posType.flags & TypeFlags.BigIntLiteral, "Expected BigIntLiteral");
            const posLiteral = posType as BigIntLiteralType;
            assert.equal(typeof posLiteral.value, "bigint");
            assert.equal(posLiteral.value, 123n);

            const negSymbol = await project.checker.getSymbolAtPosition("/src/main.ts", src.indexOf("neg ="));
            assert.ok(negSymbol);
            const negType = await project.checker.getTypeOfSymbol(negSymbol);
            assert.ok(negType);
            assert.ok(negType.flags & TypeFlags.BigIntLiteral, "Expected BigIntLiteral");
            const negLiteral = negType as BigIntLiteralType;
            assert.equal(typeof negLiteral.value, "bigint");
            assert.equal(negLiteral.value, -123n);
        }
        finally {
            await api.close();
        }
    });

    test("getFreshType() returns a fresh twin with matching value", async () => {
        const src = `\nexport const greeting: "hello" = "hello";\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("greeting:");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Freshable, "Type should be a freshable type");
            const fresh = await (type as FreshableType).getFreshType();
            assert.ok(fresh, "Expected getFreshType() to return non-undefined for a literal type");
            assert.ok(fresh.flags & TypeFlags.StringLiteral, "Fresh type should be a StringLiteral");
            assert.equal((fresh as LiteralType).value, "hello", "Fresh type should carry the same value");
            assert.notEqual(fresh.id, type.id, "Fresh type should not be the original type");
            const freshFresh = await fresh.getFreshType();
            assert.ok(freshFresh, "Expected getFreshType() to return non-undefined for a fresh type");
            assert.equal(freshFresh.id, fresh.id, "Fresh type of a fresh type should be the fresh type");
        }
        finally {
            await api.close();
        }
    });

    test("getRegularType() on a fresh literal returns the regular twin", async () => {
        // The initial type response from getTypeOfSymbol does not always include the
        // regularType handle, so getRegularType() is tested via the fresh twin which
        // always includes its regularType in its own response.
        const src = `\nexport const greeting: "hello" = "hello";\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("greeting:");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Freshable, "Type should be a freshable type");
            const fresh = await (type as FreshableType).getFreshType();
            assert.ok(fresh, "Need fresh type for this test");
            assert.ok(fresh.flags & TypeFlags.Freshable, "Fresh type should be a freshable type");
            const regular = await fresh.getRegularType();
            assert.ok(regular, "Expected getRegularType() on the fresh twin to return non-undefined");
            assert.ok(regular.flags & TypeFlags.StringLiteral, "Regular type should be a StringLiteral");
            assert.equal((regular as LiteralType).value, "hello", "Regular type should carry the same value");
            assert.equal(regular.id, type.id, "Regular type should be the original type");
        }
        finally {
            await api.close();
        }
    });

    test("getFreshType() and getRegularType() work for computed enum types (TypeFlags.Enum)", async () => {
        // getTypeOfSymbol on an ambient enum member returns the FRESH computed enum type.
        // For fresh types: getFreshType() returns self, getRegularType() returns the regular twin.
        const src = `\ndeclare enum Status { Pending }\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("Pending");
            const symbol = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(symbol);
            const type = await project.checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            assert.ok(type.flags & TypeFlags.Enum, `Expected TypeFlags.Enum, got ${type.flags}`);
            assert.ok(type.flags & TypeFlags.Freshable, "Enum type should be freshable");
            // The returned type IS the fresh type: getFreshType() returns itself
            const fresh = await (type as FreshableType).getFreshType();
            assert.ok(fresh, "Expected getFreshType() to return non-undefined");
            assert.equal(fresh.id, type.id, "getFreshType() on a fresh enum type returns itself");
            // getRegularType() returns the regular twin (a different type)
            const regular = await (type as FreshableType).getRegularType();
            assert.ok(regular, "Expected getRegularType() to return non-undefined");
            assert.ok(regular.flags & TypeFlags.Enum, "Regular enum type should also have TypeFlags.Enum");
            assert.notEqual(regular.id, type.id, "Regular type should be distinct from the fresh type");
            // Round-trip: regular → getFreshType() → back to the original fresh type
            const backToFresh = await (regular as FreshableType).getFreshType();
            assert.ok(backToFresh);
            assert.equal(backToFresh.id, type.id, "Round-trip through regular/fresh returns the original type");
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - isContextSensitive", () => {
    test("arrow function with no type annotation is context sensitive", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const fn = (x) => x;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);
            // Find the arrow function node
            let arrowFn: import("@typescript/native-preview/unstable/ast").Node | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (node.kind === SyntaxKind.ArrowFunction) {
                    arrowFn = node;
                }
                node.forEachChild(visit);
            });
            assert.ok(arrowFn, "Should find an arrow function");
            const result = await project.checker.isContextSensitive(arrowFn);
            assert.equal(result, true);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - isTypeAssignableTo", () => {
    test("returns true when source is assignable to target", async () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": `export {};`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const stringType = await project.checker.getStringType();
            const anyType = await project.checker.getAnyType();
            const neverType = await project.checker.getNeverType();
            assert.ok(await project.checker.isTypeAssignableTo(stringType, stringType), "string assignable to string");
            assert.ok(await project.checker.isTypeAssignableTo(stringType, anyType), "string assignable to any");
            assert.ok(await project.checker.isTypeAssignableTo(neverType, stringType), "never assignable to string (bottom type)");
        }
        finally {
            await api.close();
        }
    });

    test("returns false when source is not assignable to target", async () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": `export {};`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const stringType = await project.checker.getStringType();
            const numberType = await project.checker.getNumberType();
            assert.ok(!await project.checker.isTypeAssignableTo(numberType, stringType), "number not assignable to string");
            assert.ok(!await project.checker.isTypeAssignableTo(stringType, numberType), "string not assignable to number");
        }
        finally {
            await api.close();
        }
    });

    test("a string literal type is assignable to string but not number", async () => {
        const src = `\nexport const x: "hello" = "hello";\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("x:");
            const sym = await project.checker.getSymbolAtPosition("/src/main.ts", pos);
            assert.ok(sym);
            const litType = await project.checker.getTypeOfSymbol(sym);
            assert.ok(litType);
            assert.ok(litType.flags & TypeFlags.StringLiteral);
            const stringType = await project.checker.getStringType();
            const numberType = await project.checker.getNumberType();
            assert.ok(await project.checker.isTypeAssignableTo(litType, stringType));
            assert.ok(!await project.checker.isTypeAssignableTo(litType, numberType));
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getCompletionsAtPosition", () => {
    test("returns member completions after a dot", async () => {
        const src = `\nconst obj = { name: "hello", age: 42 };\nobj.\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            // Position right after "obj." — member completion trigger
            const pos = src.indexOf("obj.") + "obj.".length;
            const completions = await project.checker.getCompletionsAtPosition("/src/main.ts", pos, { triggerCharacter: "." });
            assert.ok(completions, "Expected completions to be returned");
            assert.ok(completions.entries.length > 0, "Expected at least one completion entry");
            assert.ok(completions.entries.some(e => e.name === "name"), "Expected 'name' property in completions");
            assert.ok(completions.entries.some(e => e.name === "age"), "Expected 'age' property in completions");
            assert.ok(completions.entries.every(e => e.symbol === undefined), "Expected no symbol information");
        }
        finally {
            await api.close();
        }
    });

    test("completion entries include sortText", async () => {
        const src = `\nconst obj = { value: 1 };\nobj.\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("obj.") + "obj.".length;
            const completions = await project.checker.getCompletionsAtPosition("/src/main.ts", pos, { triggerCharacter: "." });
            assert.ok(completions);
            assert.ok(completions.entries.length > 0);
            assert.ok(completions.entries.some(e => e.sortText !== undefined), "Expected sortText on all entries");
        }
        finally {
            await api.close();
        }
    });

    test("returns undefined for a non-existent file", async () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": `export {};`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const completions = await project.checker.getCompletionsAtPosition("/src/does-not-exist.ts", 0);
            assert.equal(completions, undefined, "Expected undefined for non-existent file");
        }
        finally {
            await api.close();
        }
    });

    test("includeSymbol: true populates symbol on property completions", async () => {
        const src = `\nconst obj = { name: "hello", age: 42 };\nobj.\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/main.ts": src,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const pos = src.indexOf("obj.") + "obj.".length;
            const completions = await project.checker.getCompletionsAtPosition("/src/main.ts", pos, { triggerCharacter: ".", includeSymbol: true });
            assert.ok(completions, "Expected completions");
            const nameEntry = completions.entries.find(e => e.name === "name");
            assert.ok(nameEntry, "Expected 'name' entry");
            assert.ok(nameEntry.symbol, "Expected symbol to be set on 'name' entry when includeSymbol: true");
            assert.equal(nameEntry.symbol.name, "name", "Symbol name should match completion name");
        }
        finally {
            await api.close();
        }
    });
});

describe("Emitter - printNode", () => {
    const emitterFiles = {
        "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
        "/src/main.ts": `
export const x = 42;
export function greet(name: string): string { return name; }
export type Pair = [string, number];
export const obj = { m: 1, s: "hi", b: true };
`,
    };

    test("printNode with factory-created keyword type", async () => {
        const api = spawnAPI(emitterFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const node = createKeywordTypeNode(SyntaxKind.StringKeyword);
            const text = await project.emitter.printNode(node);
            assert.strictEqual(text, "string");
        }
        finally {
            await api.close();
        }
    });

    test("printNode with factory-created union type", async () => {
        const api = spawnAPI(emitterFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const node = createUnionTypeNode([
                createKeywordTypeNode(SyntaxKind.StringKeyword),
                createKeywordTypeNode(SyntaxKind.NumberKeyword),
            ]);
            const text = await project.emitter.printNode(node);
            assert.strictEqual(text, "string | number");
        }
        finally {
            await api.close();
        }
    });

    test("printNode with factory-created function type", async () => {
        const api = spawnAPI(emitterFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const param = createParameterDeclaration(
                undefined,
                undefined,
                createIdentifier("x"),
                undefined,
                createKeywordTypeNode(SyntaxKind.StringKeyword),
                undefined,
            );
            const node = createFunctionTypeNode(
                undefined,
                [param],
                createKeywordTypeNode(SyntaxKind.NumberKeyword),
            );
            const text = await project.emitter.printNode(node);
            assert.strictEqual(text, "(x: string) => number");
        }
        finally {
            await api.close();
        }
    });

    test("printNode with factory-created type reference", async () => {
        const api = spawnAPI(emitterFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const node = createTypeReferenceNode(createIdentifier("Array"), [
                createKeywordTypeNode(SyntaxKind.StringKeyword),
            ]);
            const text = await project.emitter.printNode(node);
            assert.strictEqual(text, "Array<string>");
        }
        finally {
            await api.close();
        }
    });

    test("printNode with factory-created array type", async () => {
        const api = spawnAPI(emitterFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const node = createArrayTypeNode(createKeywordTypeNode(SyntaxKind.NumberKeyword));
            const text = await project.emitter.printNode(node);
            assert.strictEqual(text, "number[]");
        }
        finally {
            await api.close();
        }
    });

    test("typeToTypeNode + printNode round-trip", async () => {
        const api = spawnAPI(emitterFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const { checker, emitter } = snapshot.getProject("/tsconfig.json")!;
            const src = emitterFiles["/src/main.ts"];

            const greetPos = src.indexOf("greet(");
            const symbol = await checker.getSymbolAtPosition("/src/main.ts", greetPos);
            assert.ok(symbol);
            const type = await checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const typeNode = await checker.typeToTypeNode(type);
            assert.ok(typeNode);
            const text = await emitter.printNode(typeNode);
            assert.ok(text);
            assert.strictEqual(text, "(name: string) => string");
        }
        finally {
            await api.close();
        }
    });

    test("visitEachChild on typeToTypeNode result with keyword types", async () => {
        const api = spawnAPI(emitterFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const { checker } = snapshot.getProject("/tsconfig.json")!;
            const src = emitterFiles["/src/main.ts"];
            const objPos = src.indexOf("obj");
            const symbol = await checker.getSymbolAtPosition("/src/main.ts", objPos);
            assert.ok(symbol, "should find symbol for obj");
            const type = await checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const typeNode = await checker.typeToTypeNode(type);
            assert.ok(typeNode, "typeToTypeNode should return a type node");

            // Recursively visit to reach PropertySignature.type where isTypeNode is checked.
            const visited = (function visit(node: Node): Node {
                return visitEachChild(node, visit);
            })(typeNode);
            assert.ok(visited, "visitEachChild should not throw");

            const kinds = [
                SyntaxKind.NumberKeyword,
                SyntaxKind.StringKeyword,
                SyntaxKind.BooleanKeyword,
                SyntaxKind.AnyKeyword,
                SyntaxKind.VoidKeyword,
                SyntaxKind.UndefinedKeyword,
                SyntaxKind.NeverKeyword,
                SyntaxKind.UnknownKeyword,
                SyntaxKind.BigIntKeyword,
                SyntaxKind.ObjectKeyword,
                SyntaxKind.SymbolKeyword,
                SyntaxKind.IntrinsicKeyword,
                SyntaxKind.ExpressionWithTypeArguments,
                SyntaxKind.JSDocAllType,
                SyntaxKind.JSDocNullableType,
                SyntaxKind.JSDocNonNullableType,
                SyntaxKind.JSDocOptionalType,
                SyntaxKind.JSDocVariadicType,
                SyntaxKind.JSDocTypeExpression,
                SyntaxKind.JSDocTypeLiteral,
                SyntaxKind.JSDocSignature,
            ];
            for (const kind of kinds) {
                assert.ok(isTypeNode({ kind } as any), `isTypeNode should accept ${SyntaxKind[kind]}`);
            }
        }
        finally {
            await api.close();
        }
    });

    test("typeToString", async () => {
        const api = spawnAPI(emitterFiles);
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const { checker } = snapshot.getProject("/tsconfig.json")!;
            const src = emitterFiles["/src/main.ts"];

            const greetPos = src.indexOf("greet(");
            const symbol = await checker.getSymbolAtPosition("/src/main.ts", greetPos);
            assert.ok(symbol);
            const type = await checker.getTypeOfSymbol(symbol);
            assert.ok(type);
            const text = await checker.typeToString(type);
            assert.strictEqual(text, "(name: string) => string");
        }
        finally {
            await api.close();
        }
    });

    test("printNode with terminateUnterminatedLiterals option", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `const foo = /asdfasf;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/main.ts");
            assert.ok(sourceFile);

            // Find the regex literal node
            let regexNode: import("@typescript/native-preview/unstable/ast").Node | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (node.kind === SyntaxKind.RegularExpressionLiteral) {
                    regexNode = node;
                    return;
                }
                node.forEachChild(visit);
            });
            assert.ok(regexNode, "Should find a regex literal");

            // Without the option, regex is printed as-is
            const textWithout = await project.emitter.printNode(regexNode);
            assert.strictEqual(textWithout, "/asdfasf");

            // With the option, the closing slash is added
            const textWith = await project.emitter.printNode(regexNode, { terminateUnterminatedLiterals: true });
            assert.strictEqual(textWith, "/asdfasf/");
        }
        finally {
            await api.close();
        }
    });
});

describe("modifierFlags", () => {
    test("export async function has Export | Async flags", async () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": `export async function foo() {}`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);

            let fnNode: import("@typescript/native-preview/unstable/ast").FunctionDeclaration | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (isFunctionDeclaration(node)) {
                    fnNode = node;
                }
                node.forEachChild(visit);
            });
            assert.ok(fnNode, "Should find a function declaration");
            assert.ok(fnNode.modifierFlags & ModifierFlags.Export, "Should have Export flag");
            assert.ok(fnNode.modifierFlags & ModifierFlags.Async, "Should have Async flag");
            assert.strictEqual(fnNode.modifierFlags, ModifierFlags.Export | ModifierFlags.Async);
        }
        finally {
            await api.close();
        }
    });

    test("node without modifiers has ModifierFlags.None", async () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": `function bar() {}`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);

            let fnNode: import("@typescript/native-preview/unstable/ast").FunctionDeclaration | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (isFunctionDeclaration(node)) {
                    fnNode = node;
                }
                node.forEachChild(visit);
            });
            assert.ok(fnNode, "Should find a function declaration");
            assert.strictEqual(fnNode.modifierFlags, ModifierFlags.None);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getResolvedSymbol", () => {
    test("resolves variable reference to its declaration symbol", async () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": `const x = 1;\nconst y = x;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);

            // Find the 'x' identifier in `const y = x`
            let refNode: import("@typescript/native-preview/unstable/ast").Identifier | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (isIdentifier(node) && node.text === "x") {
                    // We want the reference, not the declaration - take the last one
                    refNode = node;
                }
                node.forEachChild(visit);
            });
            assert.ok(refNode, "Should find identifier 'x'");

            const symbol = await project.checker.getResolvedSymbol(refNode);
            assert.ok(symbol, "Should resolve symbol for 'x'");
            assert.equal(symbol.name, "x");
        }
        finally {
            await api.close();
        }
    });
});

describe("VariableDeclarationList - BlockScoped flags", () => {
    test("let declaration has Let flag", async () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": `let x = 1;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);

            let declList: import("@typescript/native-preview/unstable/ast").Node | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (isVariableDeclarationList(node)) {
                    declList = node;
                }
                node.forEachChild(visit);
            });
            assert.ok(declList, "Should find VariableDeclarationList");
            assert.ok(declList.flags & NodeFlags.Let, "Should have Let flag");
        }
        finally {
            await api.close();
        }
    });

    test("const declaration has Const flag", async () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": `const x = 1;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);

            let declList: import("@typescript/native-preview/unstable/ast").Node | undefined;
            sourceFile.forEachChild(function visit(node) {
                if (isVariableDeclarationList(node)) {
                    declList = node;
                }
                node.forEachChild(visit);
            });
            assert.ok(declList, "Should find VariableDeclarationList");
            assert.ok(declList.flags & NodeFlags.Const, "Should have Const flag");
        }
        finally {
            await api.close();
        }
    });
});

test("TypeOperator operator kind", async () => {
    const api = spawnAPI({
        "/tsconfig.json": "{}",
        "/src/index.ts": `function test(arg: readonly number[]) { }\n`,
    });
    try {
        const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const sourceFile = await project.program.getSourceFile("/src/index.ts");
        assert(sourceFile);
        const param = (sourceFile.statements[0] as import("@typescript/native-preview/unstable/ast").FunctionDeclaration).parameters[0];
        assert(param);
        const type = param.type as import("@typescript/native-preview/unstable/ast").TypeOperatorNode;
        assert(type);
        assert.equal(type.kind, SyntaxKind.TypeOperator);
        assert.equal(type.operator, SyntaxKind.ReadonlyKeyword);
        const printed = await project.emitter.printNode(sourceFile);
        assert.equal(sourceFile.text, printed);
    }
    finally {
        await api.close();
    }
});

test("SpreadAssignment roundtrip", async () => {
    const api = spawnAPI({
        "/tsconfig.json": "{}",
        "/src/index.ts": `var thing = { ...other };\n`,
    });
    try {
        const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const sourceFile = await project.program.getSourceFile("/src/index.ts");
        assert(sourceFile);
        const stmt = sourceFile.statements[0] as import("@typescript/native-preview/unstable/ast").VariableStatement;
        const object = stmt.declarationList.declarations[0].initializer as import("@typescript/native-preview/unstable/ast").ObjectLiteralExpression;
        const assignment = object.properties[0] as import("@typescript/native-preview/unstable/ast").SpreadAssignment;
        assert(assignment);
        assert.equal(assignment.kind, SyntaxKind.SpreadAssignment);
        const expr = assignment.expression;
        assert(expr);
        assert.equal(expr.kind, SyntaxKind.Identifier);
        const printed = await project.emitter.printNode(sourceFile);
        assert.equal(sourceFile.text, printed);
    }
    finally {
        await api.close();
    }
});

test("VariableDeclarationList const flag clone", async () => {
    const api = spawnAPI({
        "/tsconfig.json": "{}",
        "/src/index.ts": `const thing = 123;\n`,
    });
    try {
        const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const sourceFile = await project.program.getSourceFile("/src/index.ts");
        assert(sourceFile);
        {
            const stmt = sourceFile.statements[0] as import("@typescript/native-preview/unstable/ast").VariableStatement;
            const list = stmt.declarationList;
            assert(list.flags & NodeFlags.Const);
        }
        const cloned = getSynthesizedDeepClone(sourceFile);
        {
            const stmt = cloned.statements[0] as import("@typescript/native-preview/unstable/ast").VariableStatement;
            const list = stmt.declarationList;
            assert(list.flags & NodeFlags.Const);
        }
        const printed = await project.emitter.printNode(cloned);
        assert.equal(sourceFile.text, printed);
    }
    finally {
        await api.close();
    }
});

test("JSDoc before ExpressionStatement allowed", async () => {
    const api = spawnAPI({
        "/tsconfig.json": "{}",
        "/src/index.ts": `
/**
 * A doc.
 */
doThing();
        `,
    });
    try {
        const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const sourceFile = await project.program.getSourceFile("/src/index.ts");
        assert(sourceFile);
        const printed = await project.emitter.printNode(sourceFile);
        assert.equal(sourceFile.text.trim(), printed.trim());
    }
    finally {
        await api.close();
    }
});

test("Factory ModifierList auto-conversion", async () => {
    const api = spawnAPI();
    try {
        const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const node = createTypeAliasDeclaration(
            [createToken(SyntaxKind.ExportKeyword)],
            createIdentifier("Test"),
            undefined,
            createKeywordTypeNode(SyntaxKind.AnyKeyword),
        );

        assert.equal(await project.emitter.printNode(node), "export type Test = any;");

        const cloned = getSynthesizedDeepClone(node);
        assert.equal(await project.emitter.printNode(cloned), "export type Test = any;");
    }
    finally {
        await api.close();
    }
});

test("Parse-clone-emit roundtrip", async () => {
    const tsSource = fileURLToPath(new URL("../../../../_submodules/TypeScript/src", import.meta.url).toString());
    const api = new API({
        cwd: tsSource,
    });
    const target = {
        cloneCrashed: 0,
        printCrashed: 0,
        clonePrintCrashed: 0,
    };
    const errors = { ...target };
    try {
        for (const tsconfig of globSync("**/tsconfig.json", { cwd: tsSource })) {
            const snapshot = await api.updateSnapshot({ openProject: resolve(tsSource, tsconfig) });
            const project = snapshot.getProject(tsconfig);
            assert(project);
            for (const file of project.rootFiles) {
                const source = await project.program.getSourceFile(file);
                assert(source);
                let clone: typeof source;

                try {
                    await project.emitter.printNode(source);
                }
                catch {
                    errors.printCrashed++;
                    continue;
                }

                try {
                    clone = getSynthesizedDeepClone(source);
                }
                catch {
                    errors.cloneCrashed++;
                    continue;
                }

                try {
                    await project.emitter.printNode(clone);
                }
                catch {
                    errors.clonePrintCrashed++;
                    continue;
                }
            }
        }
    }
    finally {
        await api.close();
    }
    assert.deepEqual(errors, target);
});

describe("Program - diagnostics", () => {
    test("getSyntacticDiagnostics", async () => {
        const source = `const x: = 1;`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": source,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const diags = await project.program.getSyntacticDiagnostics("/src/index.ts");
            assert.deepEqual(diags, [{
                fileName: "/src/index.ts",
                ...rangeOf(source, "="),
                code: 1110,
                category: DiagnosticCategory.Error,
                text: "Type expected.",
            }]);
        }
        finally {
            await api.close();
        }
    });

    test("getSemanticDiagnostics with messageChain and relatedInformation", async () => {
        const source = `interface Props { callback: (x: string) => void }\nconst p: Props = { callback: (x: number) => {} };`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": source,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const diags = await project.program.getSemanticDiagnostics("/src/index.ts");
            const declRange = rangeOf(source, "callback", 0);
            const assignRange = rangeOf(source, "callback", 1);
            assert.deepEqual(diags, [{
                fileName: "/src/index.ts",
                ...assignRange,
                code: 2322,
                category: DiagnosticCategory.Error,
                text: "Type '(x: number) => void' is not assignable to type '(x: string) => void'.",
                messageChain: [{
                    fileName: "/src/index.ts",
                    ...assignRange,
                    code: 2328,
                    category: DiagnosticCategory.Error,
                    text: "Types of parameters 'x' and 'x' are incompatible.",
                    messageChain: [{
                        fileName: "/src/index.ts",
                        ...assignRange,
                        code: 2322,
                        category: DiagnosticCategory.Error,
                        text: "Type 'string' is not assignable to type 'number'.",
                    }],
                }],
                relatedInformation: [{
                    fileName: "/src/index.ts",
                    ...declRange,
                    code: 6500,
                    category: DiagnosticCategory.Message,
                    text: "The expected type comes from property 'callback' which is declared here on type 'Props'",
                }],
            }]);
        }
        finally {
            await api.close();
        }
    });

    test("getSuggestionDiagnostics", async () => {
        const source = `export function f() { const x = 1; return x; }\nconst _unused = 1;\n`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": source,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const diags = await project.program.getSuggestionDiagnostics("/src/index.ts");
            assert.deepEqual(diags, [{
                fileName: "/src/index.ts",
                ...rangeOf(source, "_unused"),
                code: 6133,
                category: DiagnosticCategory.Suggestion,
                text: "'_unused' is declared but its value is never read.",
                reportsUnnecessary: true,
            }]);
        }
        finally {
            await api.close();
        }
    });

    test("getConfigFileParsingDiagnostics", async () => {
        const config = `{ "compilerOptions": { "target": "invalid" } }`;
        const api = spawnAPI({
            "/tsconfig.json": config,
            "/src/index.ts": `export const x = 1;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const diags = await project.program.getConfigFileParsingDiagnostics();
            assert.deepEqual(diags, [{
                fileName: "/tsconfig.json",
                ...rangeOf(config, `"invalid"`),
                code: 6046,
                category: DiagnosticCategory.Error,
                text: "Argument for '--target' option must be: 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'es2023', 'es2024', 'es2025', 'esnext'.",
            }]);
        }
        finally {
            await api.close();
        }
    });

    test("getDeclarationDiagnostics", async () => {
        const api = spawnAPI({
            "/tsconfig.json": `{ "compilerOptions": { "declaration": true } }`,
            "/src/index.ts": `export const x: number = 1;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const diags = await project.program.getDeclarationDiagnostics("/src/index.ts");
            assert.deepEqual(diags, []);
        }
        finally {
            await api.close();
        }
    });

    test("getBindDiagnostics", async () => {
        const source = `let x = 1;\nlet x = 2;`;
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": source,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const diags = await project.program.getBindDiagnostics("/src/index.ts");
            assert.deepEqual(diags, [
                {
                    fileName: "/src/index.ts",
                    ...rangeOf(source, "x", 0),
                    code: 2451,
                    category: DiagnosticCategory.Error,
                    text: "Cannot redeclare block-scoped variable 'x'.",
                },
                {
                    fileName: "/src/index.ts",
                    ...rangeOf(source, "x", 1),
                    code: 2451,
                    category: DiagnosticCategory.Error,
                    text: "Cannot redeclare block-scoped variable 'x'.",
                },
            ]);
        }
        finally {
            await api.close();
        }
    });

    test("getProgramDiagnostics", async () => {
        const config = `{ "compilerOptions": { "moduleResolution": "bundler", "module": "nodenext" } }`;
        const api = spawnAPI({
            "/tsconfig.json": config,
            "/src/index.ts": `export const x = 1;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const diags = await project.program.getProgramDiagnostics();
            assert.deepEqual(diags, [
                {
                    fileName: "/tsconfig.json",
                    ...rangeOf(config, `"bundler"`),
                    code: 5095,
                    category: DiagnosticCategory.Error,
                    text: "Option 'bundler' can only be used when 'module' is set to 'preserve', 'commonjs', or 'es2015' or later.",
                },
                {
                    fileName: "/tsconfig.json",
                    ...rangeOf(config, `"bundler"`),
                    code: 5109,
                    category: DiagnosticCategory.Error,
                    text: "Option 'moduleResolution' must be set to 'NodeNext' (or left unspecified) when option 'module' is set to 'NodeNext'.",
                },
            ]);
        }
        finally {
            await api.close();
        }
    });

    test("getGlobalDiagnostics", async () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": `export const x = 1;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const diags = await project.program.getGlobalDiagnostics();
            assert.deepEqual(diags, []);
        }
        finally {
            await api.close();
        }
    });

    test("getGlobalDiagnostics returns file-less diagnostics from the checker", async () => {
        const api = spawnAPI({
            "/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`,
            "/src/index.ts": `export const x = [1, 2, 3];`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const diags = await project.program.getGlobalDiagnostics();
            // With noLib, the checker reports "Cannot find global type" diagnostics that
            // are not associated with any source file.
            assert.ok(diags.length > 0, "expected global diagnostics to be reported");
            for (const diag of diags) {
                assert.equal(diag.fileName, undefined);
                assert.equal(diag.code, 2318);
                assert.equal(diag.category, DiagnosticCategory.Error);
            }
            assert.ok(
                diags.some(d => d.text === "Cannot find global type 'Array'."),
                "expected a global diagnostic for the 'Array' type",
            );
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getReferencedSymbolsForNode", () => {
    test("getReferencedSymbolsForNode", async () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": `function greet(name: string) { return name; }\ngreet("world");`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);
            const funcDecl = cast(sourceFile.statements[0], isFunctionDeclaration);
            const funcName = funcDecl.name!;
            const refs = await project.checker.getReferencedSymbolsForNode(funcName, funcName.pos);
            assert.ok(refs.length > 0);
            // Each entry should have a definition and references
            const entry = refs[0];
            assert.ok(entry.definition);
            assert.ok(entry.references.length > 0);
        }
        finally {
            await api.close();
        }
    });
});

describe("Checker - getSignatureUsage", () => {
    test("getSignatureUsage", async () => {
        const api = spawnAPI({
            "/tsconfig.json": "{}",
            "/src/index.ts": `function greet(name: string) { return name; }\ngreet("world");`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);
            const funcDecl = cast(sourceFile.statements[0], isFunctionDeclaration);
            const usages = await project.checker.getSignatureUsage(funcDecl);
            assert.ok(usages.length > 0);
            // The call site should have a call expression
            const usage = usages.find(u => u.call !== undefined);
            assert.ok(usage, "Expected at least one usage with a call expression");
        }
        finally {
            await api.close();
        }
    });
});

describe("getDefaultProjectForFile", () => {
    test("finds inferred project for d.ts in node_modules after openFiles", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/index.ts": `export const x = 1;`,
            "/node_modules/my-lib/package.json": JSON.stringify({ name: "my-lib", types: "./index.d.ts" }),
            "/node_modules/my-lib/index.d.ts": `export declare const foo: string;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;

            // The d.ts is not imported, so it is not in the project's program
            const dtsSf = await project.program.getSourceFile("/node_modules/my-lib/index.d.ts");
            assert.equal(dtsSf, undefined, "d.ts not in import graph should not be found via project.program.getSourceFile");

            // Before opening the file, getDefaultProjectForFile returns undefined (no error)
            const noProject = await snapshot.getDefaultProjectForFile("/node_modules/my-lib/index.d.ts");
            assert.equal(noProject, undefined, "getDefaultProjectForFile returns undefined for unloaded file");

            // Load the file into the inferred project via updateSnapshot openFiles
            const snapshot2 = await api.updateSnapshot({ openFiles: ["/node_modules/my-lib/index.d.ts"] });
            const defaultProject = await snapshot2.getDefaultProjectForFile("/node_modules/my-lib/index.d.ts");
            assert.ok(defaultProject, "getDefaultProjectForFile should find inferred project after openFiles");

            const fooPos = `export declare const foo: string;`.indexOf("foo");
            const fooType = await defaultProject.checker.getTypeAtPosition("/node_modules/my-lib/index.d.ts", fooPos);
            assert.ok(fooType);
            assert.ok(fooType.flags & TypeFlags.String);
        }
        finally {
            await api.close();
        }
    });

    test("keeps previously opened files open across subsequent openFiles calls", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/index.ts": `export const x = 1;`,
            "/node_modules/my-lib/package.json": JSON.stringify({ name: "my-lib", types: "./index.d.ts" }),
            "/node_modules/my-lib/index.d.ts": `export declare const foo: string;`,
            "/node_modules/other-lib/package.json": JSON.stringify({ name: "other-lib", types: "./index.d.ts" }),
            "/node_modules/other-lib/index.d.ts": `export declare const bar: number;`,
        });
        try {
            await api.updateSnapshot({ openProject: "/tsconfig.json" });
            await api.updateSnapshot({ openFiles: ["/node_modules/my-lib/index.d.ts"] });

            // Opening a second file in a later snapshot must not close the first one.
            const snapshot = await api.updateSnapshot({ openFiles: ["/node_modules/other-lib/index.d.ts"] });

            const firstProject = await snapshot.getDefaultProjectForFile("/node_modules/my-lib/index.d.ts");
            assert.ok(firstProject, "previously opened file should remain in the inferred project");
            const secondProject = await snapshot.getDefaultProjectForFile("/node_modules/other-lib/index.d.ts");
            assert.ok(secondProject, "newly opened file should be in the inferred project");
        }
        finally {
            await api.close();
        }
    });

    test("opening a file resolves to a configured project via ancestor search", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/index.ts": `export const x = 1;`,
        });
        try {
            // Open the file without first opening the project. Like LSP's didOpen, this
            // should search ancestor directories for a tsconfig that contains the file.
            const snapshot = await api.updateSnapshot({ openFiles: ["/src/index.ts"] });
            const defaultProject = await snapshot.getDefaultProjectForFile("/src/index.ts");
            assert.ok(defaultProject, "should find a project for the opened file");
            assert.equal(
                defaultProject.configFileName,
                "/tsconfig.json",
                "opened file should resolve to the containing configured project, not the inferred project",
            );
        }
        finally {
            await api.close();
        }
    });

    test("closeProjects releases a project opened via openProjects", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/index.ts": `export const x = 1;`,
        });
        try {
            const opened = await api.updateSnapshot({ openProjects: ["/tsconfig.json"] });
            assert.ok(opened.getProject("/tsconfig.json"), "project should be open after openProjects");

            const closed = await api.updateSnapshot({ closeProjects: ["/tsconfig.json"] });
            assert.equal(
                closed.getProject("/tsconfig.json"),
                undefined,
                "project should be unloaded after closeProjects",
            );
        }
        finally {
            await api.close();
        }
    });

    test("closeFiles releases a file opened via openFiles", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/index.ts": `export const x = 1;`,
            "/node_modules/my-lib/package.json": JSON.stringify({ name: "my-lib", types: "./index.d.ts" }),
            "/node_modules/my-lib/index.d.ts": `export declare const foo: string;`,
        });
        try {
            await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const opened = await api.updateSnapshot({ openFiles: ["/node_modules/my-lib/index.d.ts"] });
            assert.ok(
                await opened.getDefaultProjectForFile("/node_modules/my-lib/index.d.ts"),
                "file should resolve to a project after openFiles",
            );

            const closed = await api.updateSnapshot({ closeFiles: ["/node_modules/my-lib/index.d.ts"] });
            assert.equal(
                await closed.getDefaultProjectForFile("/node_modules/my-lib/index.d.ts"),
                undefined,
                "file should no longer resolve to a project after closeFiles",
            );
        }
        finally {
            await api.close();
        }
    });
});

test("Benchmarks", async () => {
    await runBenchmarks({ singleIteration: true });
});

describe("Timing", () => {
    test("collects combined client, server, and transport timing info", async () => {
        const api = new API({
            cwd: fileURLToPath(new URL("../../../../", import.meta.url).toString()),
            fs: createVirtualFileSystem({ ...defaultFiles }),
            collectTiming: true,
        });
        try {
            // Baseline: enabled, but nothing measured yet.
            let info = await api.getTimingInfo();
            assert.equal(info.enabled, true);
            assert.equal(info.totals.requestCount, 0);
            assert.equal(info.recentRequests.length, 0);

            // Exercise a JSON request and a binary source-file request.
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);

            // Client-side timing: round-trip latency and byte counts.
            info = await api.getTimingInfo();
            assert.ok(info.totals.requestCount >= 2, "expected at least two measured requests");
            assert.ok(info.totals.bytesSent > 0);
            assert.ok(info.totals.bytesReceived > 0);
            assert.ok(info.totals.roundTripMs >= 0);

            // Server-side timing is folded into the same snapshot.
            assert.ok(info.totals.serverTimeMs >= 0);
            assert.ok(info.totals.transportOverheadMs >= 0);
            assert.equal(
                info.totals.transportOverheadMs,
                Math.max(0, info.totals.roundTripMs - info.totals.serverTimeMs),
            );

            // The ring buffer retains at most the 5 most recent requests.
            assert.ok(info.recentRequests.length > 0);
            assert.ok(info.recentRequests.length <= 5);
            assert.ok(info.recentRequests.length <= info.totals.requestCount);

            for (const r of info.recentRequests) {
                assert.ok(r.roundTripMs >= 0);
                assert.ok(r.bytesSent >= 0);
                assert.ok(r.bytesReceived >= 0);
                assert.ok(typeof r.method === "string" && r.method.length > 0);
                assert.equal(typeof r.timestamp, "number");
                // Transport overhead is present exactly when server time is.
                assert.equal(r.transportOverheadMs === undefined, r.serverTimeMs === undefined);
                if (r.serverTimeMs !== undefined) {
                    assert.ok(r.serverTimeMs >= 0);
                    assert.equal(r.transportOverheadMs, Math.max(0, r.roundTripMs - r.serverTimeMs));
                }
            }

            // Server processing time is folded in for the recent requests.
            assert.ok(info.recentRequests.every(r => r.serverTimeMs !== undefined), "server time should be reported");

            // Reset clears totals and history on both client and server.
            await api.resetTimingInfo();
            info = await api.getTimingInfo();
            assert.equal(info.enabled, true);
            assert.equal(info.totals.requestCount, 0);
            assert.equal(info.totals.serverTimeMs, 0);
            assert.equal(info.totals.transportOverheadMs, 0);
            assert.equal(info.recentRequests.length, 0);
        }
        finally {
            await api.close();
        }
    });

    test("tracks source-file node materialization", async () => {
        const api = new API({
            cwd: fileURLToPath(new URL("../../../../", import.meta.url).toString()),
            fs: createVirtualFileSystem({ ...defaultFiles }),
            collectTiming: true,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;
            const sourceFile = await project.program.getSourceFile("/src/index.ts");
            assert.ok(sourceFile);

            // The source file node itself is pre-cached, so before walking the
            // tree no descendant nodes have been materialized.
            let info = await api.getTimingInfo();
            const before = info.totals.nodesMaterialized;
            assert.equal(info.totals.sourceFilesFetched, 1, "one source file was fetched");
            assert.ok(info.totals.nodesFetched > 0, "the fetched file contributes materializable nodes");
            assert.equal(info.totals.nodesMaterialized, 0, "nothing walked yet, so no nodes materialized");

            // Walk the whole tree to force lazy materialization of every node.
            let visited = 0;
            sourceFile.forEachChild(function visit(node) {
                visited++;
                node.forEachChild(visit);
            });
            assert.ok(visited > 0, "expected to visit at least one node");

            info = await api.getTimingInfo();
            assert.ok(
                info.totals.nodesMaterialized > before,
                "walking the tree should materialize nodes",
            );
            assert.ok(
                info.totals.nodesMaterialized >= visited,
                "every visited node should have been materialized",
            );

            // A full walk materializes (nearly) every fetched node, so the share
            // of fetched nodes materialized should be substantial.
            assert.equal(info.totals.sourceFilesFetched, 1);
            assert.ok(
                info.totals.nodesMaterialized > 0
                    && info.totals.nodesMaterialized <= info.totals.nodesFetched,
                "materialized nodes should be in (0, nodesFetched]",
            );

            // Reset clears materialization totals along with the rest.
            await api.resetTimingInfo();
            info = await api.getTimingInfo();
            assert.equal(info.totals.nodesMaterialized, 0);
            assert.equal(info.totals.sourceFilesFetched, 0);
            assert.equal(info.totals.nodesFetched, 0);
        }
        finally {
            await api.close();
        }
    });

    test("is disabled by default", async () => {
        const api = spawnAPI();
        try {
            await api.parseConfigFile("/tsconfig.json");
            const info = await api.getTimingInfo();
            assert.equal(info.enabled, false);
            assert.equal(info.totals.requestCount, 0);
            assert.equal(info.totals.nodesMaterialized, 0);
            assert.equal(info.totals.sourceFilesFetched, 0);
            assert.equal(info.totals.nodesFetched, 0);
            assert.equal(info.recentRequests.length, 0);
        }
        finally {
            await api.close();
        }
    });
});

describe("runWithTemporaryFileUpdate", () => {
    test("temporary file update is visible in the callback and reverted afterward", async () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/index.ts": `export const x: number = 1;`,
        });
        try {
            const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
            const project = snapshot.getProject("/tsconfig.json")!;

            // The original content type-checks cleanly.
            const baseDiags = await project.program.getSemanticDiagnostics("/src/index.ts");
            assert.equal(baseDiags.length, 0);

            // Keep a newer snapshot active to verify any active snapshot can be the base.
            const latestSnapshot = await api.updateSnapshot();
            assert.notEqual(latestSnapshot.id, snapshot.id);

            // Inside the callback, the file has the temporary (erroneous) content.
            let errorCount = -1;
            await api.runWithTemporaryFileUpdate(snapshot, "/src/index.ts", `export const x: string = 1;`, async tempSnapshot => {
                const tempProject = tempSnapshot.getProject("/tsconfig.json")!;
                const diags = await tempProject.program.getSemanticDiagnostics("/src/index.ts");
                errorCount = diags.length;
            });
            assert.ok(errorCount > 0, "temporary content should produce a semantic error inside the callback");

            // The original snapshot is unaffected by the temporary update.
            const afterDiags = await project.program.getSemanticDiagnostics("/src/index.ts");
            assert.equal(afterDiags.length, 0);

            // Subsequent regular updates still work and diff against the real latest snapshot.
            const snapshot2 = await api.updateSnapshot();
            const project2 = snapshot2.getProject("/tsconfig.json")!;
            const diags2 = await project2.program.getSemanticDiagnostics("/src/index.ts");
            assert.equal(diags2.length, 0);
        }
        finally {
            await api.close();
        }
    });
});

function spawnAPI(files: Record<string, string> = { ...defaultFiles }) {
    return new API({
        cwd: fileURLToPath(new URL("../../../../", import.meta.url).toString()),
        fs: createVirtualFileSystem(files),
    });
}

function spawnAPIWithFS(files: Record<string, string> = { ...defaultFiles }): { api: API; fs: FileSystem; } {
    const fs = createVirtualFileSystem(files);
    const api = new API({
        cwd: fileURLToPath(new URL("../../../../", import.meta.url).toString()),
        fs,
    });
    return { api, fs };
}

/** Returns `{ pos, end }` for the nth (0-based, default 0) occurrence of `searchString` in `source`. */
function rangeOf(source: string, searchString: string, occurrence: number = 0): { pos: number; end: number; } {
    let index = -1;
    for (let i = 0; i <= occurrence; i++) {
        index = source.indexOf(searchString, index + 1);
        if (index === -1) {
            throw new Error(`Occurrence ${occurrence} of "${searchString}" not found in source`);
        }
    }
    return { pos: index, end: index + searchString.length };
}

function applyTextEdits(source: string, edits: readonly TextEdit[]): string {
    const sorted = [...edits].sort((a, b) => b.pos - a.pos);
    let result = source;
    for (const edit of sorted) {
        result = result.slice(0, edit.pos) + edit.newText + result.slice(edit.end);
    }
    return result;
}
