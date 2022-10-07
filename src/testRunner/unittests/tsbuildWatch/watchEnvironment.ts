import * as ts from "../../_namespaces/ts";
import {
    createBaseline,
    createSolutionBuilderWithWatchHostForBaseline,
    createWatchFactorySystem,
    implementRequireForWatchFactorySystem,
    runWatchBaseline,
    VerifyTscWatch,
    verifyTscWatch,
    WatchFactorySystem,
} from "../tscWatch/helpers";
import {
    createWatchedSystem,
    File,
    libFile,
    TestServerHost,
} from "../virtualFileSystemWithWatch";

describe("unittests:: tsbuildWatch:: watchEnvironment:: tsbuild:: watchMode:: with different watch environments", () => {
    it("watchFile on same file multiple times because file is part of multiple projects", () => {
        const project = `/user/username/projects/myproject`;
        let maxPkgs = 4;
        const configPath = `${project}/tsconfig.json`;
        const typing: File = {
            path: `${project}/typings/xterm.d.ts`,
            content: "export const typing = 10;"
        };

        const allPkgFiles = pkgs(pkgFiles);
        const system = createWatchedSystem([libFile, typing, ...flatArray(allPkgFiles)], { currentDirectory: project });
        writePkgReferences(system);
        const { sys, baseline, oldSnap, cb, getPrograms } = createBaseline(system);
        const host = createSolutionBuilderWithWatchHostForBaseline(sys, cb);
        const solutionBuilder = ts.createSolutionBuilderWithWatch(host, ["tsconfig.json"], { watch: true, verbose: true });
        solutionBuilder.build();
        runWatchBaseline({
            scenario: "watchEnvironment",
            subScenario: `same file in multiple projects with single watcher per file`,
            commandLineArgs: ["--b", "--w"],
            sys,
            baseline,
            oldSnap,
            getPrograms,
            edits: [
                {
                    caption: "modify typing file",
                    edit: sys => sys.writeFile(typing.path, `${typing.content}export const typing1 = 10;`),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.runQueuedTimeoutCallbacks();
                    }
                },
                {
                    // Make change
                    caption: "change pkg references",
                    edit: sys => {
                        maxPkgs--;
                        writePkgReferences(sys);
                    },
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "modify typing file",
                    edit: sys => sys.writeFile(typing.path, typing.content),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.runQueuedTimeoutCallbacks();
                    }
                },
                {
                    // Make change to remove all watches
                    caption: "change pkg references to remove all watches",
                    edit: sys => {
                        maxPkgs = 0;
                        writePkgReferences(sys);
                    },
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "modify typing file",
                    edit: sys => sys.writeFile(typing.path, `${typing.content}export const typing1 = 10;`),
                    timeouts: sys => sys.logTimeoutQueueLength(),
                },
            ],
            watchOrSolution: solutionBuilder
        });

        function flatArray<T>(arr: T[][]): readonly T[] {
            return ts.flatMap(arr, ts.identity);
        }
        function pkgs<T>(cb: (index: number) => T): T[] {
            const result: T[] = [];
            for (let index = 0; index < maxPkgs; index++) {
                result.push(cb(index));
            }
            return result;
        }
        function createPkgReference(index: number) {
            return { path: `./pkg${index}` };
        }
        function pkgFiles(index: number): File[] {
            return [
                {
                    path: `${project}/pkg${index}/index.ts`,
                    content: `export const pkg${index} = ${index};`
                },
                {
                    path: `${project}/pkg${index}/tsconfig.json`,
                    content: JSON.stringify({
                        complerOptions: { composite: true },
                        include: [
                            "**/*.ts",
                            "../typings/xterm.d.ts"
                        ]
                    })
                }
            ];
        }
        function writePkgReferences(system: TestServerHost) {
            system.writeFile(configPath, JSON.stringify({
                files: [],
                include: [],
                references: pkgs(createPkgReference)
            }));
        }
    });

    describe("watchFactory", () => {
        verifyWatchFactory({
            subScenario: `watchFactory/in config file`,
            commandLineArgs: ["-b", "-w", "--extendedDiagnostics"],
            sys: createSystemWithFactory,
            edits: [
                {
                    caption: "Change file",
                    edit: sys => sys.appendFile(`/user/username/projects/myproject/b.ts`, "export function foo() { }"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Invoke plugin watches",
                    edit: sys => (sys as WatchFactorySystem).factoryData.watchedFiles.get(`/user/username/projects/myproject/b.ts`)!.forEach(({ callback }) => callback(`/user/username/projects/myproject/b.ts`, ts.FileWatcherEventKind.Changed)),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ]
        }, "myplugin");

        verifyWatchFactory({
            subScenario: `watchFactory/in config file with error`,
            commandLineArgs: ["-b", "-w", "--extendedDiagnostics"],
            sys: createSystemWithFactory,
            edits: [
                {
                    caption: "Change file",
                    edit: sys => sys.appendFile(`/user/username/projects/myproject/b.ts`, "export function foo() { }"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ]
        }, "myplugin/../malicious");

        verifyWatchFactoryCommandLine({
            subScenario: `watchFactory/through commandline`,
            sys: () => createSystemWithFactory(),
            edits: [
                {
                    caption: "Change file",
                    edit: sys => sys.appendFile(`/user/username/projects/myproject/b.ts`, "export function foo() { }"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Invoke plugin watches",
                    edit: sys => (sys as WatchFactorySystem).factoryData.watchedFiles.get(`/user/username/projects/myproject/b.ts`)!.forEach(({ callback }) => callback(`/user/username/projects/myproject/b.ts`, ts.FileWatcherEventKind.Changed)),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ]
        }, "myplugin");

        verifyWatchFactoryCommandLine({
            subScenario: `watchFactory/through commandline with error`,
            sys: () => {
                // Patch to not throw exception so the tests can run and baseline
                const sys = createSystem();
                sys.exit = exitCode => sys.exitCode = exitCode;
                return sys;
            },
        }, "myplugin/../malicious");

        verifyWatchFactory({
            subScenario: `watchFactory/when plugin not found`,
            commandLineArgs: ["-b", "-w", "--extendedDiagnostics"],
            sys: watchOptions => {
                const system = createSystem(watchOptions);
                system.require = (initialPath, moduleName) => {
                    system.write(`Require:: Resolving ${moduleName} from ${initialPath}\n`);
                    return {
                        module: undefined,
                        error: { message: `Cannot find module myPlugin at ${initialPath}` }
                    };
                };
                return system;
            },
            edits: [
                {
                    caption: "Change file",
                    edit: sys => sys.appendFile(`/user/username/projects/myproject/b.ts`, "export function foo() { }"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ]
        }, "myplugin");

        verifyWatchFactory({
            subScenario: `watchFactory/when plugin does not implements watchFile`,
            commandLineArgs: ["-b", "-w", "--extendedDiagnostics"],
            sys: watchOptions => createSystemWithFactory(watchOptions, /*excludeWatchFile*/ true),
            edits: [
                {
                    caption: "Change file",
                    edit: sys => sys.appendFile(`/user/username/projects/myproject/b.ts`, "export function foo() { }"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Add file",
                    edit: sys => sys.writeFile(`/user/username/projects/myproject/c.ts`, "export function foo() { }"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Invoke plugin watches",
                    edit: sys => (sys as WatchFactorySystem).factoryData.watchedDirectoriesRecursive.get("/user/username/projects/myproject")!.forEach(({ callback }) => callback(`/user/username/projects/myproject/c.ts`)),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ]
        }, "myplugin");

        verifyWatchFactory({
            subScenario: `watchFactory/when plugin doesnt return factory function`,
            commandLineArgs: ["-b", "-w", "--extendedDiagnostics"],
            sys: watchOptions => {
                const system = createSystem(watchOptions);
                system.require = (initialPath, moduleName) => {
                    system.write(`Require:: Resolving ${moduleName} from ${initialPath}\n`);
                    return {
                        module: { watchDirectory: system.factoryData.watchDirectory },
                        error: undefined
                    };
                };
                return system;
            },
            edits: [
                {
                    caption: "Change file",
                    edit: sys => sys.appendFile(`/user/username/projects/myproject/b.ts`, "export function foo() { }"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ]
        }, "myplugin");

        verifyWatchFactory({
            subScenario: `watchFactory/when host does not implement require`,
            commandLineArgs: ["-b", "-w", "--extendedDiagnostics"],
            sys: createSystem,
            edits: [
                {
                    caption: "Change file",
                    edit: sys => sys.appendFile(`/user/username/projects/myproject/b.ts`, "export function foo() { }"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ]
        }, "myplugin");

        function createSystem(watchOptions?: ts.WatchOptions) {
            const configFile: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: JSON.stringify({ watchOptions })
            };
            const aTs: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `export class a { prop = "hello"; foo() { return this.prop; } }`
            };
            const bTs: File = {
                path: `/user/username/projects/myproject/b.ts`,
                content: `export class b { prop = "hello"; foo() { return this.prop; } }`
            };

            return createWatchFactorySystem(createWatchedSystem([aTs, bTs, configFile, libFile], { currentDirectory: "/user/username/projects/myproject" }));
        }

        function createSystemWithFactory(watchOptions?: ts.WatchOptions, excludeWatchFile?: boolean) {
            return implementRequireForWatchFactorySystem(createSystem(watchOptions), !!excludeWatchFile);
        }

        function verifyWatchFactory(
            input: Omit<VerifyTscWatch, "sys" | "scenario"> & { sys: (watchOptions?: ts.WatchOptions) => TestServerHost; },
            watchFactory: string,
        ) {
            verifyTscWatch({
                scenario: "watchEnvironment",
                ...input,
                sys: () => input.sys({ watchFactory }),
            });
            verifyTscWatch({
                scenario: "watchEnvironment",
                ...input,
                subScenario: `${input.subScenario} object`,
                sys: () => input.sys({ watchFactory: { name: watchFactory, myconfig: "somethingelse" } as ts.PluginImport }),
            });
        }

        function verifyWatchFactoryCommandLine(
            input: Omit<VerifyTscWatch, "commandLineArgs" | "scenario">,
            watchFactory: string,
        ) {
            verifyTscWatch({
                scenario: "watchEnvironment",
                ...input,
                commandLineArgs: ["-b", "-w", "--extendedDiagnostics", "--watchFactory", watchFactory],
            });
            verifyTscWatch({
                scenario: "watchEnvironment",
                ...input,
                subScenario: `${input.subScenario} object`,
                commandLineArgs: ["-b", "-w", "--extendedDiagnostics", "--watchFactory", JSON.stringify({ name: watchFactory, myconfig: "somethingelse" })],
            });
        }
    });
});
