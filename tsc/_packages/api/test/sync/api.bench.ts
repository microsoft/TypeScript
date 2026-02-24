//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED - DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: test/async/api.bench.ts
// Regenerate: npm run generate (from _packages/api)
//
import {
    API,
    type Project,
    type Snapshot,
} from "@typescript/api/sync";
import {
    type Node,
    type SourceFile,
    SyntaxKind,
} from "@typescript/ast";
import {
    existsSync,
    writeFileSync,
} from "node:fs";
import inspector from "node:inspector";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { Bench } from "tinybench";
import ts from "typescript";
import { RemoteSourceFile } from "../../src/node/node.ts";

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
    const { values } = parseArgs({
        options: {
            filter: { type: "string" },
            singleIteration: { type: "boolean", default: false },
            cpuprofile: { type: "boolean", default: false },
        },
    });
    runBenchmarks(values);
}

export function runBenchmarks(options?: { filter?: string; singleIteration?: boolean; cpuprofile?: boolean; }) {
    const { filter, singleIteration, cpuprofile } = options ?? {};
    const repoRoot = fileURLToPath(new URL("../../../../", import.meta.url).toString());
    if (!existsSync(path.join(repoRoot, "_submodules/TypeScript/src/compiler"))) {
        console.warn("Warning: TypeScript submodule is not cloned; skipping benchmarks.");
        return;
    }

    const bench = new Bench({
        name: "Sync API",
        teardown,
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
    let snapshot: Snapshot;
    let project: Project;
    let tsProgram: ts.Program;
    let file: SourceFile;
    let tsFile: ts.SourceFile;

    const programIdentifierCount = (() => {
        spawnAPI();
        loadSnapshot();
        getProgramTS();
        let count = 0;
        file!.forEachChild(function visit(node) {
            if (node.kind === SyntaxKind.Identifier) {
                count++;
            }
            node.forEachChild(visit);
        });
        teardown();
        return count;
    })();

    bench
        .add("spawn API", () => {
            spawnAPI();
        })
        .add("load snapshot", () => {
            loadSnapshot();
        }, { beforeAll: spawnAPI })
        .add("TS - load project", () => {
            tsCreateProgram();
        })
        .add("transfer debug.ts", () => {
            getDebugTS();
        }, { beforeAll: all(spawnAPI, loadSnapshot) })
        .add("transfer program.ts", () => {
            getProgramTS();
        }, { beforeAll: all(spawnAPI, loadSnapshot) })
        .add("transfer checker.ts", () => {
            getCheckerTS();
        }, { beforeAll: all(spawnAPI, loadSnapshot) })
        .add("materialize program.ts", () => {
            const { view, _decoder } = file as unknown as RemoteSourceFile;
            new RemoteSourceFile(new Uint8Array(view.buffer, view.byteOffset, view.byteLength), _decoder).forEachChild(function visit(node) {
                node.forEachChild(visit);
            });
        }, { beforeAll: all(spawnAPI, loadSnapshot, getProgramTS) })
        .add("materialize checker.ts", () => {
            const { view, _decoder } = file as unknown as RemoteSourceFile;
            new RemoteSourceFile(new Uint8Array(view.buffer, view.byteOffset, view.byteLength), _decoder).forEachChild(function visit(node) {
                node.forEachChild(visit);
            });
        }, { beforeAll: all(spawnAPI, loadSnapshot, getCheckerTS) })
        .add("getSymbolAtPosition - one location", () => {
            project.checker.getSymbolAtPosition("program.ts", 8895);
        }, { beforeAll: all(spawnAPI, loadSnapshot, createChecker) })
        .add("TS - getSymbolAtPosition - one location", () => {
            tsProgram.getTypeChecker().getSymbolAtLocation(
                // @ts-ignore internal API
                ts.getTokenAtPosition(tsFile, 8895),
            );
        }, { beforeAll: all(tsCreateProgram, tsCreateChecker, tsGetProgramTS) })
        .add(`getSymbolAtPosition - ${programIdentifierCount} identifiers`, () => {
            for (const node of collectIdentifiers(file)) {
                project.checker.getSymbolAtPosition("program.ts", node.pos);
            }
        }, { beforeAll: all(spawnAPI, loadSnapshot, createChecker, getProgramTS) })
        .add(`getSymbolAtPosition - ${programIdentifierCount} identifiers (batched)`, () => {
            const positions = collectIdentifiers(file).map(node => node.pos);
            project.checker.getSymbolAtPosition("program.ts", positions);
        }, { beforeAll: all(spawnAPI, loadSnapshot, createChecker, getProgramTS) })
        .add(`getSymbolAtLocation - ${programIdentifierCount} identifiers`, () => {
            for (const node of collectIdentifiers(file)) {
                project.checker.getSymbolAtLocation(node);
            }
        }, { beforeAll: all(spawnAPI, loadSnapshot, createChecker, getProgramTS) })
        .add(`getSymbolAtLocation - ${programIdentifierCount} identifiers (batched)`, () => {
            const nodes = collectIdentifiers(file);
            project.checker.getSymbolAtLocation(nodes);
        }, { beforeAll: all(spawnAPI, loadSnapshot, createChecker, getProgramTS) })
        .add(`TS - getSymbolAtLocation - ${programIdentifierCount} identifiers`, () => {
            const checker = tsProgram.getTypeChecker();
            tsFile.forEachChild(function visit(node) {
                if (node.kind === ts.SyntaxKind.Identifier) {
                    checker.getSymbolAtLocation(node);
                }
                node.forEachChild(visit);
            });
        }, { beforeAll: all(tsCreateProgram, tsCreateChecker, tsGetProgramTS) });

    if (filter) {
        const pattern = filter.toLowerCase();
        for (const task of [...bench.tasks]) {
            if (!task.name.toLowerCase().includes(pattern)) {
                bench.remove(task.name);
            }
        }
    }

    let session: inspector.Session | undefined;
    if (cpuprofile) {
        session = new inspector.Session();
        session.connect();
        session.post("Profiler.enable");
        session.post("Profiler.start");
    }

    bench.runSync();

    if (session) {
        session.post("Profiler.stop", (err, { profile }) => {
            if (err) throw err;
            const outPath = `bench-${Date.now()}.cpuprofile`;
            writeFileSync(outPath, JSON.stringify(profile));
            console.log(`CPU profile written to ${outPath}`);
        });
        session.disconnect();
    }
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

    function spawnAPI() {
        api = new API({
            cwd: repoRoot,
            tsserverPath: fileURLToPath(new URL(`../../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
        });
    }

    function loadSnapshot() {
        snapshot = api.updateSnapshot({ openProject: "_submodules/TypeScript/src/compiler/tsconfig.json" });
        project = snapshot.getProjects()[0];
    }

    function tsCreateProgram() {
        const configFileName = fileURLToPath(new URL("../../../../_submodules/TypeScript/src/compiler/tsconfig.json", import.meta.url).toString());
        const configFile = ts.readConfigFile(configFileName, ts.sys.readFile);
        const parsedCommandLine = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configFileName));
        const host = ts.createCompilerHost(parsedCommandLine.options);
        tsProgram = ts.createProgram({
            rootNames: parsedCommandLine.fileNames,
            options: parsedCommandLine.options,
            host,
        });
    }

    function createChecker() {
        // checker is created lazily, for measuring symbol time in a loop
        // we need to create it first.
        project.checker.getSymbolAtPosition("core.ts", 0);
    }

    function tsCreateChecker() {
        tsProgram.getTypeChecker();
    }

    function getDebugTS() {
        file = (project.program.getSourceFile("debug.ts"))!;
    }

    function getProgramTS() {
        file = (project.program.getSourceFile("program.ts"))!;
    }

    function tsGetProgramTS() {
        tsFile = tsProgram.getSourceFile(fileURLToPath(new URL("../../../../_submodules/TypeScript/src/compiler/program.ts", import.meta.url).toString()))!;
    }

    function getCheckerTS() {
        file = (project.program.getSourceFile("checker.ts"))!;
    }

    function teardown() {
        api?.close();
        api = undefined!;
        snapshot = undefined!;
        project = undefined!;
        file = undefined!;
        tsProgram = undefined!;
        tsFile = undefined!;
    }

    function all(...fns: (() => void | void)[]) {
        return () => {
            for (const fn of fns) {
                fn();
            }
        };
    }
}
