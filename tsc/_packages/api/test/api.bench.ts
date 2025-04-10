import {
    API,
    type Project,
} from "@typescript/api";
import {
    type FileSystem,
    type FileSystemEntries,
} from "@typescript/api/fs";
import {
    type Node,
    type SourceFile,
    SyntaxKind,
} from "@typescript/ast";
import fs, { existsSync } from "node:fs";
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
        console.warn("Warning: TypeScript submodule is not cloned; skipping benchmarks.");
        return;
    }

    const bench = new Bench({
        name: "Sync API",
        teardown,
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

    const programIdentifierCount = (() => {
        spawnAPI();
        loadProject();
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

    const SMALL_STRING = "ping";
    const LARGE_STRING = "a".repeat(1_000_000);
    const SMALL_UINT8_ARRAY = new Uint8Array([1, 2, 3, 4]);
    const LARGE_UINT8_ARRAY = new Uint8Array(1_000_000);

    bench
        .add("spawn API", () => {
            spawnAPI();
        })
        .add("echo (small string)", () => {
            api.echo(SMALL_STRING);
        }, { beforeAll: spawnAPI })
        .add("echo (large string)", () => {
            api.echo(LARGE_STRING);
        }, { beforeAll: spawnAPI })
        .add("echo (small Uint8Array)", () => {
            api.echoBinary(SMALL_UINT8_ARRAY);
        }, { beforeAll: spawnAPI })
        .add("echo (large Uint8Array)", () => {
            api.echoBinary(LARGE_UINT8_ARRAY);
        }, { beforeAll: spawnAPI })
        .add("load project", () => {
            loadProject();
        }, { beforeAll: spawnAPI })
        .add("load project (client FS)", () => {
            loadProject();
        }, { beforeAll: spawnAPIHosted })
        .add("TS - load project", () => {
            tsCreateProgram();
        })
        .add("transfer debug.ts", () => {
            getDebugTS();
        }, { beforeAll: all(spawnAPI, loadProject) })
        .add("transfer program.ts", () => {
            getProgramTS();
        }, { beforeAll: all(spawnAPI, loadProject) })
        .add("transfer checker.ts", () => {
            getCheckerTS();
        }, { beforeAll: all(spawnAPI, loadProject) })
        .add("materialize program.ts", () => {
            file.forEachChild(function visit(node) {
                node.forEachChild(visit);
            });
        }, { beforeAll: all(spawnAPI, loadProject, getProgramTS) })
        .add("materialize checker.ts", () => {
            file.forEachChild(function visit(node) {
                node.forEachChild(visit);
            });
        }, { beforeAll: all(spawnAPI, loadProject, getCheckerTS) })
        .add("getSymbolAtPosition - one location", () => {
            project.getSymbolAtPosition("program.ts", 8895);
        }, { beforeAll: all(spawnAPI, loadProject, createChecker) })
        .add("TS - getSymbolAtPosition - one location", () => {
            tsProgram.getTypeChecker().getSymbolAtLocation(
                // @ts-ignore internal API
                ts.getTokenAtPosition(tsFile, 8895),
            );
        }, { beforeAll: all(tsCreateProgram, tsCreateChecker, tsGetProgramTS) })
        .add(`getSymbolAtPosition - ${programIdentifierCount} identifiers`, () => {
            file.forEachChild(function visit(node) {
                if (node.kind === SyntaxKind.Identifier) {
                    project.getSymbolAtPosition("program.ts", node.pos);
                }
                node.forEachChild(visit);
            });
        }, { beforeAll: all(spawnAPI, loadProject, createChecker, getProgramTS) })
        .add(`getSymbolAtPosition - ${programIdentifierCount} identifiers (batched)`, () => {
            const positions: number[] = [];
            file.forEachChild(function visit(node) {
                if (node.kind === SyntaxKind.Identifier) {
                    positions.push(node.pos);
                }
                node.forEachChild(visit);
            });
            project.getSymbolAtPosition("program.ts", positions);
        }, { beforeAll: all(spawnAPI, loadProject, createChecker, getProgramTS) })
        .add(`getSymbolAtLocation - ${programIdentifierCount} identifiers`, () => {
            file.forEachChild(function visit(node) {
                if (node.kind === SyntaxKind.Identifier) {
                    project.getSymbolAtLocation(node);
                }
                node.forEachChild(visit);
            });
        }, { beforeAll: all(spawnAPI, loadProject, createChecker, getProgramTS) })
        .add(`getSymbolAtLocation - ${programIdentifierCount} identifiers (batched)`, () => {
            const nodes: Node[] = [];
            file.forEachChild(function visit(node) {
                if (node.kind === SyntaxKind.Identifier) {
                    nodes.push(node);
                }
                node.forEachChild(visit);
            });
            project.getSymbolAtLocation(nodes);
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

    function spawnAPI() {
        api = new API({
            cwd: repoRoot,
            tsserverPath: fileURLToPath(new URL(`../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
        });
    }

    function spawnAPIHosted() {
        api = new API({
            cwd: repoRoot,
            tsserverPath: fileURLToPath(new URL(`../../../built/local/tsgo${process.platform === "win32" ? ".exe" : ""}`, import.meta.url).toString()),
            fs: createNodeFileSystem(),
        });
    }

    function loadProject() {
        project = api.loadProject("_submodules/TypeScript/src/compiler/tsconfig.json");
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

    function createChecker() {
        // checker is created lazily, for measuring symbol time in a loop
        // we need to create it first.
        project.getSymbolAtPosition("core.ts", 0);
    }

    function tsCreateChecker() {
        tsProgram.getTypeChecker();
    }

    function getDebugTS() {
        file = project.getSourceFile("debug.ts")!;
    }

    function getProgramTS() {
        file = project.getSourceFile("program.ts")!;
    }

    function tsGetProgramTS() {
        tsFile = tsProgram.getSourceFile(fileURLToPath(new URL("../../../_submodules/TypeScript/src/compiler/program.ts", import.meta.url).toString()))!;
    }

    function getCheckerTS() {
        file = project.getSourceFile("checker.ts")!;
    }

    function teardown() {
        api?.close();
        api = undefined!;
        project = undefined!;
        file = undefined!;
        tsProgram = undefined!;
        tsFile = undefined!;
    }

    function all(...fns: (() => void)[]) {
        return () => {
            for (const fn of fns) {
                fn();
            }
        };
    }

    function createNodeFileSystem(): FileSystem {
        return {
            directoryExists: directoryName => {
                try {
                    return fs.statSync(directoryName).isDirectory();
                }
                catch {
                    return false;
                }
            },
            fileExists: fileName => {
                try {
                    return fs.statSync(fileName).isFile();
                }
                catch {
                    return false;
                }
            },
            readFile: fileName => {
                try {
                    return fs.readFileSync(fileName, "utf8");
                }
                catch {
                    return undefined;
                }
            },
            getAccessibleEntries: dirName => {
                const entries: FileSystemEntries = {
                    files: [],
                    directories: [],
                };
                for (const entry of fs.readdirSync(dirName, { withFileTypes: true })) {
                    if (entry.isFile()) {
                        entries.files.push(entry.name);
                    }
                    else if (entry.isDirectory()) {
                        entries.directories.push(entry.name);
                    }
                    else if (entry.isSymbolicLink()) {
                        const fullName = path.join(dirName, entry.name);
                        try {
                            const stat = fs.statSync(fullName);
                            if (stat.isFile()) {
                                entries.files.push(entry.name);
                            }
                            else if (stat.isDirectory()) {
                                entries.directories.push(entry.name);
                            }
                        }
                        catch {
                            // Ignore errors
                        }
                    }
                }
                return entries;
            },
            realpath: fs.realpathSync,
        };
    }
}
