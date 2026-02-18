import {
    API,
    SymbolFlags,
    TypeFlags,
} from "@typescript/api/async";
import { createVirtualFileSystem } from "@typescript/api/fs";
import type { FileSystem } from "@typescript/api/fs";
import {
    cast,
    isImportDeclaration,
    isNamedImports,
    isStringLiteral,
} from "@typescript/ast";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import { fileURLToPath } from "node:url";
import { runBenchmarks } from "./api.async.bench.ts";

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

test("async unicode escapes", async () => {
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

test("async Object equality", async () => {
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

test("async Snapshot dispose", async () => {
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

describe("async Multiple snapshots", () => {
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

describe("async Source file caching", () => {
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

describe("async Snapshot disposal", () => {
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

describe("async Source file cache keying across projects", () => {
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

test("async Benchmarks", async () => {
    await runBenchmarks(/*singleIteration*/ true);
});

function spawnAPI(files: Record<string, string> = { ...defaultFiles }) {
    return new API({
        cwd: fileURLToPath(new URL("../../../", import.meta.url).toString()),
        tsserverPath: fileURLToPath(new URL(`../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
        fs: createVirtualFileSystem(files),
    });
}

function spawnAPIWithFS(files: Record<string, string> = { ...defaultFiles }): { api: API; fs: FileSystem; } {
    const fs = createVirtualFileSystem(files);
    const api = new API({
        cwd: fileURLToPath(new URL("../../../", import.meta.url).toString()),
        tsserverPath: fileURLToPath(new URL(`../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
        fs,
    });
    return { api, fs };
}
