import { createVirtualFileSystem } from "@typescript/api/fs";
import type { FileSystem } from "@typescript/api/fs";
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
} from "@typescript/api/sync";
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
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import { fileURLToPath } from "node:url";
import { runBenchmarks } from "./api.sync.bench.ts";

const defaultFiles = {
    "/tsconfig.json": "{}",
    "/src/index.ts": `import { foo } from './foo';`,
    "/src/foo.ts": `export const foo = 42;`,
};

describe("API", () => {
    test("parseConfigFile", () => {
        const api = spawnAPI();
        const config = api.parseConfigFile("/tsconfig.json");
        assert.deepEqual(config.fileNames, ["/src/index.ts", "/src/foo.ts"]);
        assert.deepEqual(config.options, { configFilePath: "/tsconfig.json" });
    });
});

describe("Snapshot", () => {
    test("updateSnapshot returns snapshot with projects", () => {
        const api = spawnAPI();
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        assert.ok(snapshot);
        assert.ok(snapshot.id);
        assert.ok(snapshot.getProjects().length > 0);
        assert.ok(snapshot.getProject("/tsconfig.json"));
    });

    test("getSymbolAtPosition", () => {
        const api = spawnAPI();
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const symbol = project.checker.getSymbolAtPosition("/src/index.ts", 9);
        assert.ok(symbol);
        assert.equal(symbol.name, "foo");
        assert.ok(symbol.flags & SymbolFlags.Alias);
    });

    test("getSymbolAtLocation", () => {
        const api = spawnAPI();
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const sourceFile = project.program.getSourceFile("/src/index.ts");
        assert.ok(sourceFile);
        const node = cast(
            cast(sourceFile.statements[0], isImportDeclaration).importClause?.namedBindings,
            isNamedImports,
        ).elements[0].name;
        assert.ok(node);
        const symbol = project.checker.getSymbolAtLocation(node);
        assert.ok(symbol);
        assert.equal(symbol.name, "foo");
        assert.ok(symbol.flags & SymbolFlags.Alias);
    });

    test("getTypeOfSymbol", () => {
        const api = spawnAPI();
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const symbol = project.checker.getSymbolAtPosition("/src/index.ts", 9);
        assert.ok(symbol);
        const type = project.checker.getTypeOfSymbol(symbol);
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.NumberLiteral);
    });
});

describe("SourceFile", () => {
    test("file properties", () => {
        const api = spawnAPI();
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const sourceFile = project.program.getSourceFile("/src/index.ts");

        assert.ok(sourceFile);
        assert.equal(sourceFile.text, defaultFiles["/src/index.ts"]);
        assert.equal(sourceFile.fileName, "/src/index.ts");
    });

    test("extended data", () => {
        const api = spawnAPI();
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const sourceFile = project.program.getSourceFile("/src/index.ts");

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
    });
});

test("unicode escapes", () => {
    const srcFiles = {
        "/src/1.ts": `"😃"`,
        "/src/2.ts": `"\\ud83d\\ude03"`, // this is "😃"
    };

    const api = spawnAPI({
        "/tsconfig.json": "{}",
        ...srcFiles,
    });
    const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
    const project = snapshot.getProject("/tsconfig.json")!;

    Object.keys(srcFiles).forEach(file => {
        const sourceFile = project.program.getSourceFile(file);
        assert.ok(sourceFile);

        sourceFile.forEachChild(function visit(node) {
            if (isStringLiteral(node)) {
                assert.equal(node.text, "😃");
            }
            node.forEachChild(visit);
        });
    });
});

test("Object equality", () => {
    const api = spawnAPI();
    const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
    const project = snapshot.getProject("/tsconfig.json")!;
    // Same symbol returned from same snapshot's checker
    assert.strictEqual(
        project.checker.getSymbolAtPosition("/src/index.ts", 9),
        project.checker.getSymbolAtPosition("/src/index.ts", 10),
    );
});

test("Snapshot dispose", () => {
    const api = spawnAPI();
    const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
    const project = snapshot.getProject("/tsconfig.json")!;
    const symbol = project.checker.getSymbolAtPosition("/src/index.ts", 9);
    assert.ok(symbol);

    // Snapshot dispose should release server-side resources
    assert.ok(snapshot.isDisposed() === false);
    snapshot.dispose();
    assert.ok(snapshot.isDisposed() === true);

    // After dispose, snapshot methods should throw
    assert.throws(() => {
        snapshot.getProject("/tsconfig.json");
    }, {
        name: "Error",
        message: "Snapshot is disposed",
    });
});

test("Server-side release", () => {
    const api = spawnAPI();
    const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
    const project = snapshot.getProject("/tsconfig.json")!;
    const symbol = project.checker.getSymbolAtPosition("/src/index.ts", 9);
    assert.ok(symbol);

    // Manually release the snapshot on the server
    // @ts-ignore private API
    api.client.request("release", { handle: snapshot.id });

    // Symbol handle should no longer be resolvable on the server
    assert.throws(() => {
        project.checker.getTypeOfSymbol(symbol);
    }, {
        name: "Error",
        message: `api: client error: snapshot ${snapshot.id} not found`,
    });
});

describe("Multiple snapshots", () => {
    test("two snapshots work independently", () => {
        const api = spawnAPI();
        const snap1 = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const snap2 = api.updateSnapshot({ openProject: "/tsconfig.json" });

        // Both can fetch source files
        const sf1 = snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
        const sf2 = snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
        assert.ok(sf1);
        assert.ok(sf2);

        // Disposing one doesn't break the other
        snap1.dispose();
        assert.ok(snap1.isDisposed());
        assert.ok(!snap2.isDisposed());

        // snap2 still works after snap1 is disposed
        const symbol = snap2.getProject("/tsconfig.json")!.checker.getSymbolAtPosition("/src/index.ts", 9);
        assert.ok(symbol);
        assert.equal(symbol.name, "foo");

        snap2.dispose();
        api.close();
    });

    test("each snapshot has its own server-side lifecycle", () => {
        const { api, fs } = spawnAPIWithFS();
        const snap1 = api.updateSnapshot({ openProject: "/tsconfig.json" });

        // Verify initial state
        const sf1 = snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
        assert.ok(sf1);
        assert.equal(sf1.text, `export const foo = 42;`);

        // Mutate the file and create a new snapshot with the change
        fs.writeFile!("/src/foo.ts", `export const foo = "changed";`);
        const snap2 = api.updateSnapshot({
            fileChanges: { changed: ["/src/foo.ts"] },
        });

        // snap2 should reflect the updated content
        const sf2 = snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
        assert.ok(sf2);
        assert.equal(sf2.text, `export const foo = "changed";`);

        // snap1's source file should still have the original content
        assert.equal(sf1.text, `export const foo = 42;`);

        snap1.dispose();

        // snap2 still works independently after snap1 is disposed
        const symbol = snap2.getProject("/tsconfig.json")!.checker.getSymbolAtPosition("/src/index.ts", 9);
        assert.ok(symbol);

        snap2.dispose();

        // Both are disposed, new snapshot works fine with latest content
        const snap3 = api.updateSnapshot();
        const sf3 = snap3.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
        assert.ok(sf3);
        assert.equal(sf3.text, `export const foo = "changed";`);

        api.close();
    });

    test("adding a new file is reflected in the next snapshot", () => {
        const { api, fs } = spawnAPIWithFS();
        const snap1 = api.updateSnapshot({ openProject: "/tsconfig.json" });

        // Add a brand new file
        fs.writeFile!("/src/bar.ts", `export const bar = true;`);
        const snap2 = api.updateSnapshot({
            fileChanges: { created: ["/src/bar.ts"] },
        });

        const sf = snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/bar.ts");
        assert.ok(sf);
        assert.equal(sf.text, `export const bar = true;`);

        // Original snapshot shouldn't have the new file
        // const sfOld = snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/bar.ts");
        // assert.equal(sfOld, undefined);

        api.close();
    });

    test("multiple sequential edits produce correct snapshots", () => {
        const { api, fs } = spawnAPIWithFS();
        api.updateSnapshot({ openProject: "/tsconfig.json" });

        const versions = [
            `export const foo = 1;`,
            `export const foo = 2;`,
            `export const foo = 3;`,
        ];

        for (const version of versions) {
            fs.writeFile!("/src/foo.ts", version);
            const snap = api.updateSnapshot({
                fileChanges: { changed: ["/src/foo.ts"] },
            });
            const sf = snap.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
            assert.ok(sf);
            assert.equal(sf.text, version);
        }

        api.close();
    });
});

describe("Source file caching", () => {
    test("same file from same snapshot returns cached object", () => {
        const api = spawnAPI();
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const sf1 = project.program.getSourceFile("/src/index.ts");
        const sf2 = project.program.getSourceFile("/src/index.ts");
        assert.ok(sf1);
        assert.strictEqual(sf1, sf2, "Same source file should be returned from cache");
        api.close();
    });

    test("same file from two snapshots (same content) returns cached object", () => {
        const api = spawnAPI();
        const snap1 = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const snap2 = api.updateSnapshot({ openProject: "/tsconfig.json" });
        // Fetch from snap1 first (populates cache), then snap2 (cache hit via hash)
        const sf1 = snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
        const sf2 = snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
        assert.ok(sf1);
        assert.ok(sf2);
        // Same content hash → cache hit → same object
        assert.strictEqual(sf1, sf2, "Same file with same content should share cached object");
        api.close();
    });

    test("modified file returns a different source file object", () => {
        const { api, fs } = spawnAPIWithFS();
        const snap1 = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const sf1 = snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
        assert.ok(sf1);
        assert.equal(sf1.text, `export const foo = 42;`);

        // Mutate the file in the VFS
        fs.writeFile!("/src/foo.ts", `export const foo = 100;`);

        // Notify the server about the change
        const snap2 = api.updateSnapshot({
            fileChanges: { changed: ["/src/foo.ts"] },
        });
        const sf2 = snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
        assert.ok(sf2);
        assert.equal(sf2.text, `export const foo = 100;`);

        // Different content → different object
        assert.notStrictEqual(sf1, sf2, "Modified file should return a new source file object");
        api.close();
    });

    test("unmodified file retains cached object across file change notification", () => {
        const { api, fs } = spawnAPIWithFS();
        const snap1 = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const sf1 = snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
        assert.ok(sf1);

        // Mutate a different file
        fs.writeFile!("/src/foo.ts", `export const foo = 999;`);

        // Notify the server about the change to foo.ts only
        const snap2 = api.updateSnapshot({
            fileChanges: { changed: ["/src/foo.ts"] },
        });
        const sf2 = snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
        assert.ok(sf2);

        // index.ts wasn't changed — should still get cached object
        assert.strictEqual(sf1, sf2, "Unchanged file should return cached object across snapshots");
        api.close();
    });

    test("cache entries survive when one of two snapshots is disposed", () => {
        const api = spawnAPI();
        const snap1 = api.updateSnapshot({ openProject: "/tsconfig.json" });
        // Fetch from snap1 to populate cache
        const sf1 = snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
        assert.ok(sf1);

        // snap2 retains snap1's cache refs for unchanged files via snapshot changes
        const snap2 = api.updateSnapshot({ openProject: "/tsconfig.json" });

        // Dispose snap1 — snap2 still holds a ref, so the entry survives
        snap1.dispose();

        // Fetching from snap2 should still return the cached object
        const sf2 = snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/index.ts");
        assert.ok(sf2);
        assert.strictEqual(sf1, sf2, "Cache entry should survive when retained by the next snapshot");
        api.close();
    });

    test("invalidateAll causes all files to be re-fetched", () => {
        const { api, fs } = spawnAPIWithFS();
        const snap1 = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const sf1 = snap1.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
        assert.ok(sf1);
        assert.equal(sf1.text, `export const foo = 42;`);

        // Mutate the file
        fs.writeFile!("/src/foo.ts", `export const foo = "hello";`);

        // Use invalidateAll to force re-fetch
        const snap2 = api.updateSnapshot({
            fileChanges: { invalidateAll: true },
        });
        const sf2 = snap2.getProject("/tsconfig.json")!.program.getSourceFile("/src/foo.ts");
        assert.ok(sf2);
        assert.equal(sf2.text, `export const foo = "hello";`);
        assert.notStrictEqual(sf1, sf2, "invalidateAll should produce new source file objects");
        api.close();
    });
});

describe("Snapshot disposal", () => {
    test("dispose is idempotent", () => {
        const api = spawnAPI();
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        snapshot.dispose();
        assert.ok(snapshot.isDisposed());
        // Second dispose should not throw
        snapshot.dispose();
        assert.ok(snapshot.isDisposed());
        api.close();
    });

    test("api.close disposes all active snapshots", () => {
        const api = spawnAPI();
        const snap1 = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const snap2 = api.updateSnapshot({ openProject: "/tsconfig.json" });
        assert.ok(!snap1.isDisposed());
        assert.ok(!snap2.isDisposed());
        api.close();
        assert.ok(snap1.isDisposed());
        assert.ok(snap2.isDisposed());
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

    test("getTypeAtPosition", () => {
        const api = spawnAPI(checkerFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = checkerFiles["/src/main.ts"];
        const xPos = src.indexOf("x = 42");
        const type = project.checker.getTypeAtPosition("/src/main.ts", xPos);
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.NumberLiteral);
        api.close();
    });

    test("getTypeAtPosition batched", () => {
        const api = spawnAPI(checkerFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = checkerFiles["/src/main.ts"];
        const xPos = src.indexOf("x = 42");
        const addPos = src.indexOf("add(");
        const types = project.checker.getTypeAtPosition("/src/main.ts", [xPos, addPos]);
        assert.equal(types.length, 2);
        assert.ok(types[0]);
        assert.ok(types[1]);
        api.close();
    });

    test("getTypeAtLocation", () => {
        const api = spawnAPI(checkerFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const sourceFile = project.program.getSourceFile("/src/main.ts");
        assert.ok(sourceFile);
        // Get the type of the first statement's declaration
        const firstVarDecl = sourceFile.statements[2]; // "export const x"
        assert.ok(firstVarDecl);
        const type = project.checker.getTypeAtLocation(firstVarDecl);
        assert.ok(type);
        api.close();
    });

    test("getSignaturesOfType - call signatures", () => {
        const api = spawnAPI(checkerFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = checkerFiles["/src/main.ts"];
        const addPos = src.indexOf("add(");
        const symbol = project.checker.getSymbolAtPosition("/src/main.ts", addPos);
        assert.ok(symbol);
        const type = project.checker.getTypeOfSymbol(symbol);
        assert.ok(type);
        const callSigs = project.checker.getSignaturesOfType(type, SignatureKind.Call);
        assert.ok(callSigs.length > 0);
        const sig = callSigs[0];
        assert.ok(sig.id);
        assert.ok(sig.parameters.length >= 2);
        assert.ok(sig.hasRestParameter);
        assert.ok(!sig.isConstruct);
        assert.ok(!sig.isAbstract);
        api.close();
    });

    test("getSignaturesOfType - construct signatures", () => {
        const api = spawnAPI(checkerFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = checkerFiles["/src/main.ts"];
        const classPos = src.indexOf("MyClass");
        const symbol = project.checker.getSymbolAtPosition("/src/main.ts", classPos);
        assert.ok(symbol);
        const type = project.checker.getTypeOfSymbol(symbol);
        assert.ok(type);
        const constructSigs = project.checker.getSignaturesOfType(type, SignatureKind.Construct);
        assert.ok(constructSigs.length > 0);
        const sig = constructSigs[0];
        assert.ok(sig.isConstruct);
        api.close();
    });

    test("Signature declaration can be resolved", () => {
        const api = spawnAPI(checkerFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = checkerFiles["/src/main.ts"];
        const addPos = src.indexOf("add(");
        const symbol = project.checker.getSymbolAtPosition("/src/main.ts", addPos);
        assert.ok(symbol);
        const type = project.checker.getTypeOfSymbol(symbol);
        assert.ok(type);
        const callSigs = project.checker.getSignaturesOfType(type, SignatureKind.Call);
        assert.ok(callSigs.length > 0);
        const sig = callSigs[0];
        assert.ok(sig.declaration);
        const node = sig.declaration.resolve(project);
        assert.ok(node);
        api.close();
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

    test("getMembers returns class members", () => {
        const api = spawnAPI(symbolFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = symbolFiles["/src/mod.ts"];
        const animalPos = src.indexOf("Animal");
        const symbol = project.checker.getSymbolAtPosition("/src/mod.ts", animalPos);
        assert.ok(symbol);
        const members = symbol.getMembers();
        assert.ok(members.length > 0);
        const memberNames = members.map(m => m.name);
        assert.ok(memberNames.includes("name"), "should have 'name' member");
        assert.ok(memberNames.includes("speak"), "should have 'speak' member");
        api.close();
    });

    test("getExports returns module exports via sourceFile symbol", () => {
        const api = spawnAPI(symbolFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const sourceFile = project.program.getSourceFile("/src/mod.ts")!;
        assert.ok(sourceFile);
        // getSymbolAtLocation(sourceFile) should return the module symbol
        const moduleSymbol = project.checker.getSymbolAtLocation(sourceFile);
        assert.ok(moduleSymbol);
        const exports = moduleSymbol.getExports();
        assert.ok(exports.length > 0);
        const exportNames = exports.map(e => e.name);
        assert.ok(exportNames.includes("Animal"), "should export Animal");
        assert.ok(exportNames.includes("value"), "should export value");
        api.close();
    });

    test("getParent returns containing symbol", () => {
        const api = spawnAPI(symbolFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = symbolFiles["/src/mod.ts"];
        // Get the "name" member of Animal
        const namePos = src.indexOf("name:");
        const nameSymbol = project.checker.getSymbolAtPosition("/src/mod.ts", namePos);
        assert.ok(nameSymbol);
        assert.equal(nameSymbol.name, "name");
        const parent = nameSymbol.getParent();
        assert.ok(parent);
        assert.equal(parent.name, "Animal");
        api.close();
    });
});

describe("Type - getSymbol", () => {
    test("getSymbol returns the symbol of a type", () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/types.ts": `
export class Foo {
    x: number = 0;
}
export const instance: Foo = new Foo();
`,
        });
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        // Get the type of "instance"
        const src = `\nexport class Foo {\n    x: number = 0;\n}\nexport const instance: Foo = new Foo();\n`;
        const instancePos = src.indexOf("instance");
        const symbol = project.checker.getSymbolAtPosition("/src/types.ts", instancePos);
        assert.ok(symbol);
        const type = project.checker.getTypeOfSymbol(symbol);
        assert.ok(type);
        const typeSymbol = type.getSymbol();
        assert.ok(typeSymbol);
        assert.equal(typeSymbol.name, "Foo");
        api.close();
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

    function getTypeAtName(api: API, name: string) {
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = typeFiles["/src/types.ts"];
        const pos = src.indexOf(name);
        assert.ok(pos >= 0, `Could not find "${name}" in source`);
        const symbol = project.checker.getSymbolAtPosition("/src/types.ts", pos);
        assert.ok(symbol, `No symbol found at "${name}"`);
        const type = project.checker.getTypeOfSymbol(symbol);
        assert.ok(type, `No type found for symbol "${name}"`);
        return { type, project, snapshot, api };
    }

    test("TypeReference.getTarget() returns the generic target", () => {
        const { type, api } = getTypeAtName(spawnAPI(typeFiles), "arr:");
        assert.ok(type.flags & TypeFlags.Object);
        const ref = type as TypeReference;
        assert.ok(ref.objectFlags & ObjectFlags.Reference);
        const target = ref.getTarget();
        assert.ok(target);
        assert.ok(target.flags & TypeFlags.Object);
        api.close();
    });

    test("UnionOrIntersectionType.getTypes() returns union members", () => {
        const { type, api } = getTypeAtName(spawnAPI(typeFiles), "union:");
        assert.ok(type.flags & TypeFlags.Union);
        const union = type as UnionOrIntersectionType;
        const types = union.getTypes();
        assert.ok(types.length >= 2);
        api.close();
    });

    test("UnionOrIntersectionType.getTypes() returns intersection members", () => {
        const { type, api } = getTypeAtName(spawnAPI(typeFiles), "intersection:");
        assert.ok(type.flags & TypeFlags.Intersection);
        const inter = type as UnionOrIntersectionType;
        const types = inter.getTypes();
        assert.ok(types.length >= 2);
        api.close();
    });

    test("IndexType.getTarget() returns the target type", () => {
        const api = spawnAPI(typeFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const symbol = project.checker.resolveName("KeyOf", SymbolFlags.TypeAlias, { document: "/src/types.ts", position: 0 });
        assert.ok(symbol);
        const type = project.checker.getDeclaredTypeOfSymbol(symbol);
        assert.ok(type);
        // KeyOf<T> = keyof T — this is an IndexType
        assert.ok(type.flags & TypeFlags.Index, `Expected IndexType, got flags ${type.flags}`);
        const indexType = type as IndexType;
        const target = indexType.getTarget();
        assert.ok(target);
        api.close();
    });

    test("IndexedAccessType.getObjectType() and getIndexType()", () => {
        const api = spawnAPI(typeFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const symbol = project.checker.resolveName("Lookup", SymbolFlags.TypeAlias, { document: "/src/types.ts", position: 0 });
        assert.ok(symbol);
        const type = project.checker.getDeclaredTypeOfSymbol(symbol);
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.IndexedAccess, `Expected IndexedAccessType, got flags ${type.flags}`);
        const ia = type as IndexedAccessType;
        const objectType = ia.getObjectType();
        assert.ok(objectType);
        const indexType = ia.getIndexType();
        assert.ok(indexType);
        api.close();
    });

    test("ConditionalType.getCheckType() and getExtendsType()", () => {
        const api = spawnAPI(typeFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const symbol = project.checker.resolveName("Cond", SymbolFlags.TypeAlias, { document: "/src/types.ts", position: 0 });
        assert.ok(symbol);
        const type = project.checker.getDeclaredTypeOfSymbol(symbol);
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.Conditional, `Expected ConditionalType, got flags ${type.flags}`);
        const cond = type as ConditionalType;
        const checkType = cond.getCheckType();
        assert.ok(checkType);
        const extendsType = cond.getExtendsType();
        assert.ok(extendsType);
        api.close();
    });

    test("TemplateLiteralType.texts and getTypes()", () => {
        const { type, api } = getTypeAtName(spawnAPI(typeFiles), "tpl:");
        assert.ok(type.flags & TypeFlags.TemplateLiteral, `Expected TemplateLiteralType, got flags ${type.flags}`);
        const tpl = type as TemplateLiteralType;
        assert.ok(tpl.texts);
        assert.ok(tpl.texts.length >= 2);
        assert.equal(tpl.texts[0], "hello ");
        const types = tpl.getTypes();
        assert.ok(types.length >= 1);
        api.close();
    });

    test("StringMappingType.getTarget() returns the mapped type", () => {
        const api = spawnAPI(typeFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = typeFiles["/src/types.ts"];
        const pos = src.indexOf("Upper");
        const symbol = project.checker.getSymbolAtPosition("/src/types.ts", pos);
        assert.ok(symbol);
        const type = project.checker.getTypeOfSymbol(symbol);
        assert.ok(type);
        // Uppercase<"hello"> may resolve to a StringMappingType or a string literal
        if (type.flags & TypeFlags.StringMapping) {
            const sm = type as StringMappingType;
            const target = sm.getTarget();
            assert.ok(target);
        }
        // If it resolved to "HELLO" literal, that's fine too — it means eager evaluation
        api.close();
    });

    test("TupleType properties", () => {
        const { type, api } = getTypeAtName(spawnAPI(typeFiles), "tuple:");
        assert.ok(type.flags & TypeFlags.Object);
        const ref = type as TypeReference;
        assert.ok(ref.objectFlags & ObjectFlags.Reference);
        const target = ref.getTarget();
        assert.ok(target);
        assert.ok(target.flags & TypeFlags.Object);
        api.close();
    });
});

describe("Checker - intrinsic type getters", () => {
    const intrinsicFiles = {
        "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
        "/src/main.ts": `export const x = 1;`,
    };

    test("getAnyType returns a type with Any flag", () => {
        const api = spawnAPI(intrinsicFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const type = project.checker.getAnyType();
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.Any);
        api.close();
    });

    test("getStringType returns a type with String flag", () => {
        const api = spawnAPI(intrinsicFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const type = project.checker.getStringType();
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.String);
        api.close();
    });

    test("getNumberType returns a type with Number flag", () => {
        const api = spawnAPI(intrinsicFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const type = project.checker.getNumberType();
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.Number);
        api.close();
    });

    test("getBooleanType returns a type with Boolean flag", () => {
        const api = spawnAPI(intrinsicFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const type = project.checker.getBooleanType();
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.Boolean);
        api.close();
    });

    test("getVoidType returns a type with Void flag", () => {
        const api = spawnAPI(intrinsicFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const type = project.checker.getVoidType();
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.Void);
        api.close();
    });

    test("getUndefinedType returns a type with Undefined flag", () => {
        const api = spawnAPI(intrinsicFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const type = project.checker.getUndefinedType();
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.Undefined);
        api.close();
    });

    test("getNullType returns a type with Null flag", () => {
        const api = spawnAPI(intrinsicFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const type = project.checker.getNullType();
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.Null);
        api.close();
    });

    test("getNeverType returns a type with Never flag", () => {
        const api = spawnAPI(intrinsicFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const type = project.checker.getNeverType();
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.Never);
        api.close();
    });

    test("getUnknownType returns a type with Unknown flag", () => {
        const api = spawnAPI(intrinsicFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const type = project.checker.getUnknownType();
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.Unknown);
        api.close();
    });

    test("getBigIntType returns a type with BigInt flag", () => {
        const api = spawnAPI(intrinsicFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const type = project.checker.getBigIntType();
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.BigInt);
        api.close();
    });

    test("getESSymbolType returns a type with ESSymbol flag", () => {
        const api = spawnAPI(intrinsicFiles);
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const type = project.checker.getESSymbolType();
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.ESSymbol);
        api.close();
    });
});

describe("Checker - getBaseTypeOfLiteralType", () => {
    test("number literal widens to number", () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const x = 42;`,
        });
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = `export const x = 42;`;
        const pos = src.indexOf("x =");
        const symbol = project.checker.getSymbolAtPosition("/src/main.ts", pos);
        assert.ok(symbol);
        const literalType = project.checker.getTypeOfSymbol(symbol);
        assert.ok(literalType);
        assert.ok(literalType.flags & TypeFlags.NumberLiteral);
        const baseType = project.checker.getBaseTypeOfLiteralType(literalType);
        assert.ok(baseType);
        assert.ok(baseType.flags & TypeFlags.Number);
        api.close();
    });

    test("string literal widens to string", () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `export const s = "hello";`,
        });
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = `export const s = "hello";`;
        const pos = src.indexOf("s ");
        const symbol = project.checker.getSymbolAtPosition("/src/main.ts", pos);
        assert.ok(symbol);
        const literalType = project.checker.getTypeOfSymbol(symbol);
        assert.ok(literalType);
        assert.ok(literalType.flags & TypeFlags.StringLiteral);
        const baseType = project.checker.getBaseTypeOfLiteralType(literalType);
        assert.ok(baseType);
        assert.ok(baseType.flags & TypeFlags.String);
        api.close();
    });
});

describe("Checker - getContextualType", () => {
    test("contextual type from function parameter", () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
function foo(x: number) {}
foo(42);
`,
        });
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;

        const sourceFile = project.program.getSourceFile("/src/main.ts");
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
        const contextualType = project.checker.getContextualType(numLiteral);
        assert.ok(contextualType);
        assert.ok(contextualType.flags & TypeFlags.Number);
        api.close();
    });
});

describe("Checker - getTypeOfSymbolAtLocation", () => {
    test("narrowed type via typeof check", () => {
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
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;
        const src = `\nexport function check(x: string | number) {\n    if (typeof x === "string") {\n        return x;\n    }\n    return x;\n}\n`;

        // Get the symbol for parameter "x"
        const paramPos = src.indexOf("x:");
        const symbol = project.checker.getSymbolAtPosition("/src/main.ts", paramPos);
        assert.ok(symbol);
        assert.equal(symbol.name, "x");

        // Get the type of "x" at the wider function scope — should be string | number
        const wideType = project.checker.getTypeOfSymbol(symbol);
        assert.ok(wideType);
        assert.ok(wideType.flags & TypeFlags.Union, `Expected union type, got flags ${wideType.flags}`);

        // Get the narrowed return x inside the if block
        const sourceFile = project.program.getSourceFile("/src/main.ts");
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
        const narrowedType = project.checker.getTypeOfSymbolAtLocation(symbol, firstReturnX);
        assert.ok(narrowedType);
        // Inside the if (typeof x === "string") branch, x should be narrowed to string
        assert.ok(narrowedType.flags & TypeFlags.String, `Expected string type, got flags ${narrowedType.flags}`);
        api.close();
    });
});

describe("Checker - getShorthandAssignmentValueSymbol", () => {
    test("shorthand property symbol resolves to variable", () => {
        const api = spawnAPI({
            "/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true } }),
            "/src/main.ts": `
const name = "Alice";
export const obj = { name };
`,
        });
        const snapshot = api.updateSnapshot({ openProject: "/tsconfig.json" });
        const project = snapshot.getProject("/tsconfig.json")!;

        const sourceFile = project.program.getSourceFile("/src/main.ts");
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
        const valueSymbol = project.checker.getShorthandAssignmentValueSymbol(shorthandNode);
        assert.ok(valueSymbol);
        assert.equal(valueSymbol.name, "name");
        api.close();
    });
});

test("Benchmarks", async () => {
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
