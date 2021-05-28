namespace ts.tscWatch {
    describe("unittests:: tsbuildWatch:: watchEnvironment:: tsbuild:: watchMode:: with different watch environments", () => {
        describe("when watchFile can create multiple watchers per file", () => {
            verifyWatchFileOnMultipleProjects(/*singleWatchPerFile*/ false);
        });

        describe("when watchFile is single watcher per file", () => {
            verifyWatchFileOnMultipleProjects(
                /*singleWatchPerFile*/ true,
                arrayToMap(["TSC_WATCHFILE"], identity, () => TestFSWithWatch.Tsc_WatchFile.SingleFileWatcherPerName)
            );
        });

        function verifyWatchFileOnMultipleProjects(singleWatchPerFile: boolean, environmentVariables?: ESMap<string, string>) {
            it("watchFile on same file multiple times because file is part of multiple projects", () => {
                const project = `${TestFSWithWatch.tsbuildProjectsLocation}/myproject`;
                let maxPkgs = 4;
                const configPath = `${project}/tsconfig.json`;
                const typing: File = {
                    path: `${project}/typings/xterm.d.ts`,
                    content: "export const typing = 10;"
                };

                const allPkgFiles = pkgs(pkgFiles);
                const system = createWatchedSystem([libFile, typing, ...flatArray(allPkgFiles)], { currentDirectory: project, environmentVariables });
                writePkgReferences();
                const host = createSolutionBuilderWithWatchHost(system);
                const solutionBuilder = createSolutionBuilderWithWatch(host, ["tsconfig.json"], { watch: true, verbose: true });
                solutionBuilder.build();
                checkOutputErrorsInitial(system, emptyArray, /*disableConsoleClears*/ undefined, [
                    `Projects in this build: \r\n${
                        concatenate(
                            pkgs(index => `    * pkg${index}/tsconfig.json`),
                            ["    * tsconfig.json"]
                        ).join("\r\n")}\n\n`,
                    ...flatArray(pkgs(index => [
                        `Project 'pkg${index}/tsconfig.json' is out of date because output file 'pkg${index}/index.js' does not exist\n\n`,
                        `Building project '${project}/pkg${index}/tsconfig.json'...\n\n`
                    ]))
                ]);

                const watchFilesDetailed = arrayToMap(flatArray(allPkgFiles), f => f.path, () => 1);
                watchFilesDetailed.set(configPath, 1);
                watchFilesDetailed.set(typing.path, singleWatchPerFile ? 1 : maxPkgs);
                checkWatchedFilesDetailed(system, watchFilesDetailed);
                system.writeFile(typing.path, `${typing.content}export const typing1 = 10;`);
                verifyInvoke();

                // Make change
                maxPkgs--;
                writePkgReferences();
                system.checkTimeoutQueueLengthAndRun(1);
                checkOutputErrorsIncremental(system, emptyArray);
                const lastFiles = last(allPkgFiles);
                lastFiles.forEach(f => watchFilesDetailed.delete(f.path));
                watchFilesDetailed.set(typing.path, singleWatchPerFile ? 1 : maxPkgs);
                checkWatchedFilesDetailed(system, watchFilesDetailed);
                system.writeFile(typing.path, typing.content);
                verifyInvoke();

                // Make change to remove all the watches
                maxPkgs = 0;
                writePkgReferences();
                system.checkTimeoutQueueLengthAndRun(1);
                checkOutputErrorsIncremental(system, [
                    `tsconfig.json(1,10): error TS18002: The 'files' list in config file '${configPath}' is empty.\n`
                ]);
                checkWatchedFilesDetailed(system, [configPath], 1);

                system.writeFile(typing.path, `${typing.content}export const typing1 = 10;`);
                system.checkTimeoutQueueLength(0);

                function flatArray<T>(arr: T[][]): readonly T[] {
                    return flatMap(arr, identity);
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
                function writePkgReferences() {
                    system.writeFile(configPath, JSON.stringify({
                        files: [],
                        include: [],
                        references: pkgs(createPkgReference)
                    }));
                }
                function verifyInvoke() {
                    pkgs(() => system.checkTimeoutQueueLengthAndRun(1));
                    checkOutputErrorsIncremental(system, emptyArray, /*disableConsoleClears*/ undefined, /*logsBeforeWatchDiagnostics*/ undefined, [
                        ...flatArray(pkgs(index => [
                            `Project 'pkg${index}/tsconfig.json' is out of date because oldest output 'pkg${index}/index.js' is older than newest input 'typings/xterm.d.ts'\n\n`,
                            `Building project '${project}/pkg${index}/tsconfig.json'...\n\n`,
                            `Updating unchanged output timestamps of project '${project}/pkg${index}/tsconfig.json'...\n\n`
                        ]))
                    ]);
                }
            });
        }
    });
}
