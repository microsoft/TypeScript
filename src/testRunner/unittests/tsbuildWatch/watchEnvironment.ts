import * as ts from "../../_namespaces/ts";

describe("unittests:: tsbuildWatch:: watchEnvironment:: tsbuild:: watchMode:: with different watch environments", () => {
    it("watchFile on same file multiple times because file is part of multiple projects", () => {
        const project = `${ts.TestFSWithWatch.tsbuildProjectsLocation}/myproject`;
        let maxPkgs = 4;
        const configPath = `${project}/tsconfig.json`;
        const typing: ts.tscWatch.File = {
            path: `${project}/typings/xterm.d.ts`,
            content: "export const typing = 10;"
        };

        const allPkgFiles = pkgs(pkgFiles);
        const system = ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, typing, ...flatArray(allPkgFiles)], { currentDirectory: project });
        writePkgReferences(system);
        const { sys, baseline, oldSnap, cb, getPrograms } = ts.tscWatch.createBaseline(system);
        const host = ts.tscWatch.createSolutionBuilderWithWatchHostForBaseline(sys, cb);
        const solutionBuilder = ts.createSolutionBuilderWithWatch(host, ["tsconfig.json"], { watch: true, verbose: true });
        solutionBuilder.build();
        ts.tscWatch.runWatchBaseline({
            scenario: "watchEnvironment",
            subScenario: `same file in multiple projects with single watcher per file`,
            commandLineArgs: ["--b", "--w"],
            sys,
            baseline,
            oldSnap,
            getPrograms,
            changes: [
                {
                    caption: "modify typing file",
                    change: sys => sys.writeFile(typing.path, `${typing.content}export const typing1 = 10;`),
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1);
                        ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout(sys);
                    }
                },
                {
                    // Make change
                    caption: "change pkg references",
                    change: sys => {
                        maxPkgs--;
                        writePkgReferences(sys);
                    },
                    timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
                },
                {
                    caption: "modify typing file",
                    change: sys => sys.writeFile(typing.path, typing.content),
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1);
                        ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout(sys);
                    }
                },
                {
                    // Make change to remove all watches
                    caption: "change pkg references to remove all watches",
                    change: sys => {
                        maxPkgs = 0;
                        writePkgReferences(sys);
                    },
                    timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
                },
                {
                    caption: "modify typing file",
                    change: sys => sys.writeFile(typing.path, `${typing.content}export const typing1 = 10;`),
                    timeouts: sys => sys.checkTimeoutQueueLength(0),
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
        function pkgFiles(index: number): ts.tscWatch.File[] {
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
        function writePkgReferences(system: ts.TestFSWithWatch.TestServerHost) {
            system.writeFile(configPath, JSON.stringify({
                files: [],
                include: [],
                references: pkgs(createPkgReference)
            }));
        }
    });
});
