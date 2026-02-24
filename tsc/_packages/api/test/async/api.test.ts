import {
    API,
    type ConditionalType,
    type IndexedAccessType,
    type IndexType,
    ObjectFlags,
    SignatureKind,
    type StringMappingType,
    SymbolFlags,
    type TemplateLiteralType,
    TypeFlags,
    type TypeReference,
    type UnionOrIntersectionType,
} from "@typescript/api/async"; // @sync: } from "@typescript/api/sync";
import { createVirtualFileSystem } from "@typescript/api/fs";
import type { FileSystem } from "@typescript/api/fs";
import {
    cast,
    isCallExpression,
    isImportDeclaration,
    isNamedImports,
    isReturnStatement,
    isShorthandPropertyAssignment,
    isStringLiteral,
    isTemplateHead,
    isTemplateMiddle,
    isTemplateTail,
} from "@typescript/ast";
import { SyntaxKind } from "@typescript/ast";
import {
    createArrayTypeNode,
    createFunctionTypeNode,
    createIdentifier,
    createKeywordTypeNode,
    createParameterDeclaration,
    createTypeReferenceNode,
    createUnionTypeNode,
} from "@typescript/ast/factory";
import assert from "node:assert";
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
});

describe("SourceFile", () => {
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
});

test("unicode escapes", async () => {
    const api = spawnAPI({
        "/tsconfig.json": "{}",
        "/src/1.ts": `"😃"`,
        "/src/2.ts": `"\\ud83d\\ude03"`,
    });
    try {
        const snapshot = await api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;

        for (const file of ["/src/1.ts", "/src/2.ts"]) {
            const sourceFile = await project.program.getSourceFile(file);
            assert.ok(sourceFile);

            sourceFile.forEachChild(function visit(node) {
                if (isStringLiteral(node)) {
                    assert.equal(node.text, "😃");
                }
                node.forEachChild(visit);
            });
        }
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
            assert.ok(members.length > 0);
            const memberNames = members.map(m => m.name);
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
            assert.ok(exports.length > 0);
            const exportNames = exports.map(e => e.name);
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
            const checkType = await cond.getCheckType();
            assert.ok(checkType);
            const extendsType = await cond.getExtendsType();
            assert.ok(extendsType);
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
            let numLiteral: import("@typescript/ast").Expression | undefined;
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
            let firstReturnX: import("@typescript/ast").Node | undefined;
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
            let shorthandNode: import("@typescript/ast").Node | undefined;
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
            tsserverPath: fileURLToPath(new URL(`../../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
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

describe("Emitter - printNode", () => {
    const emitterFiles = {
        "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
        "/src/main.ts": `
export const x = 42;
export function greet(name: string): string { return name; }
export type Pair = [string, number];
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
});

test("Benchmarks", async () => {
    await runBenchmarks({ singleIteration: true });
});

function spawnAPI(files: Record<string, string> = { ...defaultFiles }) {
    return new API({
        cwd: fileURLToPath(new URL("../../../../", import.meta.url).toString()),
        tsserverPath: fileURLToPath(new URL(`../../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
        fs: createVirtualFileSystem(files),
    });
}

function spawnAPIWithFS(files: Record<string, string> = { ...defaultFiles }): { api: API; fs: FileSystem; } {
    const fs = createVirtualFileSystem(files);
    const api = new API({
        cwd: fileURLToPath(new URL("../../../../", import.meta.url).toString()),
        tsserverPath: fileURLToPath(new URL(`../../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
        fs,
    });
    return { api, fs };
}
