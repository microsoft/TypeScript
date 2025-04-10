import {
    API,
    SymbolFlags,
    TypeFlags,
} from "@typescript/api";
import { createVirtualFileSystem } from "@typescript/api/fs";
import {
    cast,
    isImportDeclaration,
    isNamedImports,
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
import { runBenchmarks } from "./api.bench.ts";

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

describe("Project", () => {
    test("getSymbolAtPosition", () => {
        const api = spawnAPI();
        const project = api.loadProject("/tsconfig.json");
        const symbol = project.getSymbolAtPosition("/src/index.ts", 9);
        assert.ok(symbol);
        assert.equal(symbol.name, "foo");
        assert.ok(symbol.flags & SymbolFlags.Alias);
    });

    test("getSymbolAtLocation", () => {
        const api = spawnAPI();
        const project = api.loadProject("/tsconfig.json");
        const sourceFile = project.getSourceFile("/src/index.ts");
        assert.ok(sourceFile);
        const node = cast(
            cast(sourceFile.statements[0], isImportDeclaration).importClause?.namedBindings,
            isNamedImports,
        ).elements[0].name;
        assert.ok(node);
        const symbol = project.getSymbolAtLocation(node);
        assert.ok(symbol);
        assert.equal(symbol.name, "foo");
        assert.ok(symbol.flags & SymbolFlags.Alias);
    });

    test("getTypeOfSymbol", () => {
        const api = spawnAPI();
        const project = api.loadProject("/tsconfig.json");
        const symbol = project.getSymbolAtPosition("/src/index.ts", 9);
        assert.ok(symbol);
        const type = project.getTypeOfSymbol(symbol);
        assert.ok(type);
        assert.ok(type.flags & TypeFlags.NumberLiteral);
    });
});

describe("SourceFile", () => {
    test("file properties", () => {
        const api = spawnAPI();
        const project = api.loadProject("/tsconfig.json");
        const sourceFile = project.getSourceFile("/src/index.ts");

        assert.ok(sourceFile);
        assert.equal(sourceFile.text, defaultFiles["/src/index.ts"]);
        assert.equal(sourceFile.fileName, "/src/index.ts");
    });

    test("extended data", () => {
        const api = spawnAPI();
        const project = api.loadProject("/tsconfig.json");
        const sourceFile = project.getSourceFile("/src/index.ts");

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
        assert.equal(nodeCount, 7);
    });
});

test("Object equality", () => {
    const api = spawnAPI();
    const project = api.loadProject("/tsconfig.json");
    assert.strictEqual(project, api.loadProject("/tsconfig.json"));
    assert.strictEqual(
        project.getSymbolAtPosition("/src/index.ts", 9),
        project.getSymbolAtPosition("/src/index.ts", 10),
    );
});

test("Dispose", () => {
    const api = spawnAPI();
    const project = api.loadProject("/tsconfig.json");
    const symbol = project.getSymbolAtPosition("/src/index.ts", 9);
    assert.ok(symbol);
    assert.ok(symbol.isDisposed() === false);
    symbol.dispose();
    assert.ok(symbol.isDisposed() === true);
    assert.throws(() => {
        project.getTypeOfSymbol(symbol);
    }, {
        name: "Error",
        message: "Symbol is disposed",
    });

    const symbol2 = project.getSymbolAtPosition("/src/index.ts", 9);
    assert.ok(symbol2);
    assert.notStrictEqual(symbol, symbol2);
    // @ts-ignore private API
    api.client.request("release", symbol2.id);
    assert.throws(() => {
        project.getTypeOfSymbol(symbol2);
    }, {
        name: "Error",
        message: `symbol "${symbol.id}" not found`,
    });
});

test("Benchmarks", async () => {
    await runBenchmarks(/*singleIteration*/ true);
});

function spawnAPI(files: Record<string, string> = defaultFiles) {
    return new API({
        cwd: fileURLToPath(new URL("../../../", import.meta.url).toString()),
        tsserverPath: fileURLToPath(new URL(`../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
        fs: createVirtualFileSystem(files),
    });
}
