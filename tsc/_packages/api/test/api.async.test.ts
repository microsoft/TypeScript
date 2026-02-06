import {
    API,
    SymbolFlags,
    TypeFlags,
} from "@typescript/api/async";
import {
    cast,
    isImportDeclaration,
    isNamedImports,
    isStringLiteral,
} from "@typescript/ast";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import {
    after,
    before,
    describe,
    test,
} from "node:test";
import { fileURLToPath } from "node:url";
import { runBenchmarks } from "./api.async.bench.ts";

// Create a temp directory with test files
const repoRoot = fileURLToPath(new URL("../../../", import.meta.url).toString());
const fixtureDir = path.join(repoRoot, "testdata/fixtures/async-api-test");
const indexContent = `import { foo } from './foo';`;
const fooContent = `export const foo = 42;`;

before(() => {
    fs.mkdirSync(path.join(fixtureDir, "src"), { recursive: true });
    fs.writeFileSync(path.join(fixtureDir, "tsconfig.json"), "{}");
    fs.writeFileSync(path.join(fixtureDir, "src/index.ts"), indexContent);
    fs.writeFileSync(path.join(fixtureDir, "src/foo.ts"), fooContent);
});

after(() => {
    fs.rmSync(fixtureDir, { recursive: true, force: true });
});

describe("API", () => {
    test("parseConfigFile", async () => {
        const api = spawnAPI();
        try {
            const config = await api.parseConfigFile(path.join(fixtureDir, "tsconfig.json"));
            assert.ok(config.fileNames.some(f => f.endsWith("src/index.ts")));
            assert.ok(config.fileNames.some(f => f.endsWith("src/foo.ts")));
        }
        finally {
            await api.close();
        }
    });
});

describe("Project", () => {
    test("getSymbolAtPosition", async () => {
        const api = spawnAPI();
        try {
            const project = await api.loadProject(path.join(fixtureDir, "tsconfig.json"));
            const symbol = await project.getSymbolAtPosition(path.join(fixtureDir, "src/index.ts"), 9);
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
            const project = await api.loadProject(path.join(fixtureDir, "tsconfig.json"));
            const sourceFile = await project.getSourceFile(path.join(fixtureDir, "src/index.ts"));
            assert.ok(sourceFile);
            const node = cast(
                cast(sourceFile.statements[0], isImportDeclaration).importClause?.namedBindings,
                isNamedImports,
            ).elements[0].name;
            assert.ok(node);
            const symbol = await project.getSymbolAtLocation(node);
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
            const project = await api.loadProject(path.join(fixtureDir, "tsconfig.json"));
            const symbol = await project.getSymbolAtPosition(path.join(fixtureDir, "src/index.ts"), 9);
            assert.ok(symbol);
            const type = await project.getTypeOfSymbol(symbol);
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
            const project = await api.loadProject(path.join(fixtureDir, "tsconfig.json"));
            const sourceFile = await project.getSourceFile(path.join(fixtureDir, "src/index.ts"));

            assert.ok(sourceFile);
            assert.equal(sourceFile.text, indexContent);
            assert.ok(sourceFile.fileName.endsWith("src/index.ts"));
        }
        finally {
            await api.close();
        }
    });

    test("extended data", async () => {
        const api = spawnAPI();
        try {
            const project = await api.loadProject(path.join(fixtureDir, "tsconfig.json"));
            const sourceFile = await project.getSourceFile(path.join(fixtureDir, "src/index.ts"));

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
    const unicodeDir = path.join(fixtureDir, "unicode");
    fs.mkdirSync(unicodeDir, { recursive: true });
    fs.writeFileSync(path.join(unicodeDir, "tsconfig.json"), "{}");
    fs.writeFileSync(path.join(unicodeDir, "1.ts"), `"😃"`);
    fs.writeFileSync(path.join(unicodeDir, "2.ts"), `"\\ud83d\\ude03"`);

    const api = spawnAPI();
    try {
        const project = await api.loadProject(path.join(unicodeDir, "tsconfig.json"));

        for (const file of ["1.ts", "2.ts"]) {
            const sourceFile = await project.getSourceFile(path.join(unicodeDir, file));
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
        fs.rmSync(unicodeDir, { recursive: true, force: true });
    }
});

test("async Object equality", async () => {
    const api = spawnAPI();
    try {
        const project = await api.loadProject(path.join(fixtureDir, "tsconfig.json"));
        assert.strictEqual(project, await api.loadProject(path.join(fixtureDir, "tsconfig.json")));
        assert.strictEqual(
            await project.getSymbolAtPosition(path.join(fixtureDir, "src/index.ts"), 9),
            await project.getSymbolAtPosition(path.join(fixtureDir, "src/index.ts"), 10),
        );
    }
    finally {
        await api.close();
    }
});

test("async Dispose", async () => {
    const api = spawnAPI();
    try {
        const project = await api.loadProject(path.join(fixtureDir, "tsconfig.json"));
        const symbol = await project.getSymbolAtPosition(path.join(fixtureDir, "src/index.ts"), 9);
        assert.ok(symbol);
        assert.ok(symbol.isDisposed() === false);
        symbol.dispose();
        assert.ok(symbol.isDisposed() === true);
        await assert.rejects(async () => {
            await project.getTypeOfSymbol(symbol);
        }, {
            name: "Error",
            message: "Symbol is disposed",
        });

        const symbol2 = await project.getSymbolAtPosition(path.join(fixtureDir, "src/index.ts"), 9);
        assert.ok(symbol2);
        assert.notStrictEqual(symbol, symbol2);
    }
    finally {
        await api.close();
    }
});

test("async Benchmarks", async () => {
    await runBenchmarks(/*singleIteration*/ true);
});

function spawnAPI() {
    return new API({
        cwd: repoRoot,
        tsserverPath: fileURLToPath(new URL(`../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
    });
}
