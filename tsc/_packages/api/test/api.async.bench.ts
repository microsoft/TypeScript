import {
    API,
    type Project,
} from "@typescript/api/async";
import {
    type Node,
    type SourceFile,
    SyntaxKind,
} from "@typescript/ast";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Bench } from "tinybench";
import ts from "typescript";

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
    await runBenchmarks();
}

export async function runBenchmarks(singleIteration?: boolean) {
    const repoRoot = fileURLToPath(new URL("../../../", import.meta.url).toString());
    if (!existsSync(path.join(repoRoot, "_submodules/TypeScript/src/compiler"))) {
        console.warn("Warning: TypeScript submodule is not cloned; skipping async benchmarks.");
        return;
    }

    const bench = new Bench({
        name: "Async API",
        teardown: async () => {
            await teardown();
        },
        // Reduce iterations from the default 64 to 10.  Slow tasks
        // are dominated by the iteration minimum, not the time limit.
        // 10 iterations still gives stable medians while cutting total
        // bench time by ~5x.
        iterations: 10,
        warmupIterations: 4,
        ...singleIteration ? {
            iterations: 1,
            warmup: false,
            time: 0,
        } : undefined,
    });

    let api: API;
    let project: Project;
    let tsProgram: ts.Program;
    let file: SourceFile;
    let tsFile: ts.SourceFile;

    const programIdentifierCount = await (async () => {
        await spawnAPI();
        await loadProject();
        await getProgramTS();
        let count = 0;
        file!.forEachChild(function visit(node) {
            if (node.kind === SyntaxKind.Identifier) {
                count++;
            }
            node.forEachChild(visit);
        });
        await teardown();
        return count;
    })();

    bench
        .add("spawn Async API", async () => {
            await spawnAPI();
        })
        .add("load project", async () => {
            await loadProject();
        }, { beforeAll: spawnAPI })
        .add("TS - load project", () => {
            tsCreateProgram();
        })
        .add("transfer debug.ts", async () => {
            await getDebugTS();
        }, { beforeAll: all(spawnAPI, loadProject) })
        .add("transfer program.ts", async () => {
            await getProgramTS();
        }, { beforeAll: all(spawnAPI, loadProject) })
        .add("transfer checker.ts", async () => {
            await getCheckerTS();
        }, { beforeAll: all(spawnAPI, loadProject) })
        .add("materialize program.ts", async () => {
            file.forEachChild(function visit(node) {
                node.forEachChild(visit);
            });
        }, { beforeAll: all(spawnAPI, loadProject, getProgramTS) })
        .add("materialize checker.ts", async () => {
            file.forEachChild(function visit(node) {
                node.forEachChild(visit);
            });
        }, { beforeAll: all(spawnAPI, loadProject, getCheckerTS) })
        .add("getSymbolAtPosition - one location", async () => {
            await project.getSymbolAtPosition("program.ts", 8895);
        }, { beforeAll: all(spawnAPI, loadProject, createChecker) })
        .add("TS - getSymbolAtPosition - one location", () => {
            tsProgram.getTypeChecker().getSymbolAtLocation(
                // @ts-ignore internal API
                ts.getTokenAtPosition(tsFile, 8895),
            );
        }, { beforeAll: all(tsCreateProgram, tsCreateChecker, tsGetProgramTS) })
        .add(`getSymbolAtPosition - ${programIdentifierCount} identifiers`, async () => {
            for (const node of collectIdentifiers(file)) {
                await project.getSymbolAtPosition("program.ts", node.pos);
            }
        }, { beforeAll: all(spawnAPI, loadProject, createChecker, getProgramTS) })
        .add(`getSymbolAtPosition - ${programIdentifierCount} identifiers (batched)`, async () => {
            const positions = collectIdentifiers(file).map(node => node.pos);
            await project.getSymbolAtPosition("program.ts", positions);
        }, { beforeAll: all(spawnAPI, loadProject, createChecker, getProgramTS) })
        .add(`getSymbolAtLocation - ${programIdentifierCount} identifiers`, async () => {
            for (const node of collectIdentifiers(file)) {
                await project.getSymbolAtLocation(node);
            }
        }, { beforeAll: all(spawnAPI, loadProject, createChecker, getProgramTS) })
        .add(`getSymbolAtLocation - ${programIdentifierCount} identifiers (batched)`, async () => {
            const nodes = collectIdentifiers(file);
            await project.getSymbolAtLocation(nodes);
        }, { beforeAll: all(spawnAPI, loadProject, createChecker, getProgramTS) })
        .add(`TS - getSymbolAtLocation - ${programIdentifierCount} identifiers`, () => {
            const checker = tsProgram.getTypeChecker();
            tsFile.forEachChild(function visit(node) {
                if (node.kind === ts.SyntaxKind.Identifier) {
                    checker.getSymbolAtLocation(node);
                }
                node.forEachChild(visit);
            });
        }, { beforeAll: all(tsCreateProgram, tsCreateChecker, tsGetProgramTS) });

    await bench.run();
    console.table(bench.table());

    function collectIdentifiers(sourceFile: SourceFile): Node[] {
        const nodes: Node[] = [];
        sourceFile.forEachChild(function visit(node) {
            if (node.kind === SyntaxKind.Identifier) {
                nodes.push(node);
            }
            node.forEachChild(visit);
        });
        return nodes;
    }

    async function spawnAPI() {
        api = new API({
            cwd: repoRoot,
            tsserverPath: fileURLToPath(new URL(`../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
        });
    }

    async function loadProject() {
        project = await api.loadProject("_submodules/TypeScript/src/compiler/tsconfig.json");
    }

    function tsCreateProgram() {
        const configFileName = fileURLToPath(new URL("../../../_submodules/TypeScript/src/compiler/tsconfig.json", import.meta.url).toString());
        const configFile = ts.readConfigFile(configFileName, ts.sys.readFile);
        const parsedCommandLine = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configFileName));
        const host = ts.createCompilerHost(parsedCommandLine.options);
        tsProgram = ts.createProgram({
            rootNames: parsedCommandLine.fileNames,
            options: parsedCommandLine.options,
            host,
        });
    }

    async function createChecker() {
        // checker is created lazily, for measuring symbol time in a loop
        // we need to create it first.
        await project.getSymbolAtPosition("core.ts", 0);
    }

    function tsCreateChecker() {
        tsProgram.getTypeChecker();
    }

    async function getDebugTS() {
        file = (await project.getSourceFile("debug.ts"))!;
    }

    async function getProgramTS() {
        file = (await project.getSourceFile("program.ts"))!;
    }

    function tsGetProgramTS() {
        tsFile = tsProgram.getSourceFile(fileURLToPath(new URL("../../../_submodules/TypeScript/src/compiler/program.ts", import.meta.url).toString()))!;
    }

    async function getCheckerTS() {
        file = (await project.getSourceFile("checker.ts"))!;
    }

    async function teardown() {
        await api?.close();
        api = undefined!;
        project = undefined!;
        file = undefined!;
        tsProgram = undefined!;
        tsFile = undefined!;
    }

    function all(...fns: (() => void | Promise<void>)[]) {
        return async () => {
            for (const fn of fns) {
                await fn();
            }
        };
    }
}
