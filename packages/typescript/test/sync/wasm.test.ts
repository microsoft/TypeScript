import {
    instantiateWasm,
    WasmTransport,
    wasmURL,
} from "@typescript/api-wasm";
import {
    isIdentifier,
    isVariableStatement,
} from "@typescript/typescript/unstable/ast";
import { API as AsyncAPI } from "@typescript/typescript/unstable/async";
import { API as SyncAPI } from "@typescript/typescript/unstable/sync";
import assert from "node:assert";
import { readFile } from "node:fs/promises";
import {
    describe,
    test,
} from "node:test";

describe("API over WebAssembly", () => {
    test("runs the compiler and checker through the reactor", async () => {
        const WebAssembly = (globalThis as any).WebAssembly;
        const module = await WebAssembly.compile(
            await readFile(wasmURL),
        );
        const instance = await instantiateWasm(module);

        const transport = new WasmTransport({ instance, cwd: "/", collectTiming: true });
        const api = new SyncAPI({ transport, collectTiming: true });
        assert.strictEqual(transport.requestSync("echo", "text"), "text");
        assert.deepStrictEqual(
            transport.requestBinarySync("echo", new Uint8Array([1, 2, 3])),
            new Uint8Array([1, 2, 3]),
        );

        transport.setFile("/tsconfig.json", "{}");
        transport.setFile("/src/index.ts", "export const value = 42 as const;");
        const snapshot = api.updateSnapshot({
            openFiles: ["/src/index.ts"],
            fileChanges: {
                changed: ["/tsconfig.json", "/src/index.ts"],
                deleted: [],
            },
        });
        const project = snapshot.getDefaultProjectForFile("/src/index.ts");
        assert.ok(project);
        const sourceFile = project.program.getSourceFile("/src/index.ts");
        assert.ok(sourceFile);
        const statement = sourceFile.statements[0];
        assert.ok(isVariableStatement(statement));
        const name = statement.declarationList.declarations[0].name;
        assert.ok(isIdentifier(name));
        const type = project.checker.getTypeAtLocation(name);
        assert.strictEqual(project.checker.typeToString(type), "42");

        const timing = api.getTimingInfo();
        assert.strictEqual(timing.enabled, true);
        assert.ok(timing.totals.requestCount > 0);
        assert.ok(timing.totals.serverTimeMs >= 0);
        api.close();

        const secondTransport = new WasmTransport({ instance, cwd: "/" });
        const second = new SyncAPI({ transport: secondTransport });
        assert.strictEqual(secondTransport.requestSync("echo", "recreated"), "recreated");
        second.close();

        const asyncTransport = new WasmTransport({ instance, cwd: "/" });
        const asyncAPI = new AsyncAPI({ transport: asyncTransport });
        asyncTransport.setFile("/tsconfig.json", "{}");
        asyncTransport.setFile("/src/async.ts", "export const value = 42 as const;");
        const asyncSnapshot = await asyncAPI.updateSnapshot({
            openFiles: ["/src/async.ts"],
            fileChanges: {
                changed: ["/tsconfig.json", "/src/async.ts"],
                deleted: [],
            },
        });
        const asyncProject = await asyncSnapshot.getDefaultProjectForFile("/src/async.ts");
        assert.ok(asyncProject);
        const asyncSourceFile = await asyncProject.program.getSourceFile("/src/async.ts");
        assert.ok(asyncSourceFile);
        const asyncStatement = asyncSourceFile.statements[0];
        assert.ok(isVariableStatement(asyncStatement));
        const asyncName = asyncStatement.declarationList.declarations[0].name;
        assert.ok(isIdentifier(asyncName));
        const asyncType = await asyncProject.checker.getTypeAtLocation(asyncName);
        assert.strictEqual(await asyncProject.checker.typeToString(asyncType), "42");
        await asyncAPI.close();
    });
});
