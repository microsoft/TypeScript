namespace ts.tscWatch {
    export import libFile = TestFSWithWatch.libFile;
    function createSolutionBuilder(system: WatchedSystem, rootNames: ReadonlyArray<string>, defaultOptions?: BuildOptions) {
        const host = createSolutionBuilderWithWatchHost(system);
        return ts.createSolutionBuilder(host, rootNames, defaultOptions || { dry: false, force: false, verbose: false, watch: true });
    }

    function createSolutionBuilderWithWatch(host: WatchedSystem, rootNames: ReadonlyArray<string>, defaultOptions?: BuildOptions) {
        const solutionBuilder = createSolutionBuilder(host, rootNames, defaultOptions);
        solutionBuilder.buildAllProjects();
        solutionBuilder.startWatching();
        return solutionBuilder;
    }

    describe("tsbuild-watch program updates", () => {
        const projectsLocation = "/user/username/projects";
        const project = "sample1";
        const enum SubProject {
            core = "core",
            logic = "logic",
            tests = "tests",
            ui = "ui"
        }
        type ReadonlyFile = Readonly<File>;
        /** [tsconfig, index] | [tsconfig, index, anotherModule, someDecl] */
        type SubProjectFiles = [ReadonlyFile, ReadonlyFile] | [ReadonlyFile, ReadonlyFile, ReadonlyFile, ReadonlyFile];
        const root = Harness.IO.getWorkspaceRoot();

        function projectFilePath(subProject: SubProject, baseFileName: string) {
            return `${projectsLocation}/${project}/${subProject}/${baseFileName.toLowerCase()}`;
        }

        function projectFile(subProject: SubProject, baseFileName: string): File {
            return {
                path: projectFilePath(subProject, baseFileName),
                content: Harness.IO.readFile(`${root}/tests/projects/${project}/${subProject}/${baseFileName}`)!
            };
        }

        function subProjectFiles(subProject: SubProject, anotherModuleAndSomeDecl?: true): SubProjectFiles {
            const tsconfig = projectFile(subProject, "tsconfig.json");
            const index = projectFile(subProject, "index.ts");
            if (!anotherModuleAndSomeDecl) {
                return [tsconfig, index];
            }
            const anotherModule = projectFile(SubProject.core, "anotherModule.ts");
            const someDecl = projectFile(SubProject.core, "some_decl.ts");
            return [tsconfig, index, anotherModule, someDecl];
        }

        function getOutputFileNames(subProject: SubProject, baseFileNameWithoutExtension: string) {
            const file = projectFilePath(subProject, baseFileNameWithoutExtension);
            return [`${file}.js`, `${file}.d.ts`];
        }

        type OutputFileStamp = [string, Date | undefined];
        function getOutputStamps(host: WatchedSystem, subProject: SubProject, baseFileNameWithoutExtension: string): OutputFileStamp[] {
            return getOutputFileNames(subProject, baseFileNameWithoutExtension).map(f => [f, host.getModifiedTime(f)] as OutputFileStamp);
        }

        function getOutputFileStamps(host: WatchedSystem): OutputFileStamp[] {
            return [
                ...getOutputStamps(host, SubProject.core, "anotherModule"),
                ...getOutputStamps(host, SubProject.core, "index"),
                ...getOutputStamps(host, SubProject.logic, "index"),
                ...getOutputStamps(host, SubProject.tests, "index"),
            ];
        }

        function verifyChangedFiles(actualStamps: OutputFileStamp[], oldTimeStamps: OutputFileStamp[], changedFiles: string[]) {
            for (let i = 0; i < oldTimeStamps.length; i++) {
                const actual = actualStamps[i];
                const old = oldTimeStamps[i];
                if (contains(changedFiles, actual[0])) {
                    assert.isTrue((actual[1] || 0) > (old[1] || 0), `${actual[0]} expected to written`);
                }
                else {
                    assert.equal(actual[1], old[1], `${actual[0]} expected to not change`);
                }
            }
        }

        const core = subProjectFiles(SubProject.core, /*anotherModuleAndSomeDecl*/ true);
        const logic = subProjectFiles(SubProject.logic);
        const tests = subProjectFiles(SubProject.tests);
        const ui = subProjectFiles(SubProject.ui);
        const allFiles: ReadonlyArray<File> = [libFile, ...core, ...logic, ...tests, ...ui];
        const testProjectExpectedWatchedFiles = [core[0], core[1], core[2], ...logic, ...tests].map(f => f.path);

        function createSolutionInWatchMode() {
            const host = createWatchedSystem(allFiles, { currentDirectory: projectsLocation });
            createSolutionBuilderWithWatch(host, [`${project}/${SubProject.tests}`]);
            checkWatchedFiles(host, testProjectExpectedWatchedFiles);
            checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
            checkWatchedDirectories(host, emptyArray, /*recursive*/ true); // TODO: #26524
            checkOutputErrorsInitial(host, emptyArray);
            const outputFileStamps = getOutputFileStamps(host);
            for (const stamp of outputFileStamps) {
                assert.isDefined(stamp[1], `${stamp[0]} expected to be present`);
            }
            return host;
        }
        it("creates solution in watch mode", () => {
            createSolutionInWatchMode();
        });

        it("change builds changes and reports found errors message", () => {
            const host = createSolutionInWatchMode();
            verifyChange(`${core[1].content}
export class someClass { }`);

            // Another change requeues and builds it
            verifyChange(core[1].content);

            // Two changes together report only single time message: File change detected. Starting incremental compilation...
            const outputFileStamps = getOutputFileStamps(host);
            const change1 = `${core[1].content}
export class someClass { }`;
            host.writeFile(core[1].path, change1);
            host.writeFile(core[1].path, `${change1}
export class someClass2 { }`);
            verifyChangeAfterTimeout(outputFileStamps);

            function verifyChange(coreContent: string) {
                const outputFileStamps = getOutputFileStamps(host);
                host.writeFile(core[1].path, coreContent);
                verifyChangeAfterTimeout(outputFileStamps);
            }

            function verifyChangeAfterTimeout(outputFileStamps: OutputFileStamp[]) {
                host.checkTimeoutQueueLengthAndRun(1); // Builds core
                const changedCore = getOutputFileStamps(host);
                verifyChangedFiles(changedCore, outputFileStamps, [
                    ...getOutputFileNames(SubProject.core, "anotherModule"), // This should not be written really
                    ...getOutputFileNames(SubProject.core, "index")
                ]);
                host.checkTimeoutQueueLengthAndRun(1); // Builds tests
                const changedTests = getOutputFileStamps(host);
                verifyChangedFiles(changedTests, changedCore, [
                    ...getOutputFileNames(SubProject.tests, "index") // Again these need not be written
                ]);
                host.checkTimeoutQueueLengthAndRun(1); // Builds logic
                const changedLogic = getOutputFileStamps(host);
                verifyChangedFiles(changedLogic, changedTests, [
                    ...getOutputFileNames(SubProject.logic, "index") // Again these need not be written
                ]);
                host.checkTimeoutQueueLength(0);
                checkOutputErrorsIncremental(host, emptyArray);
            }
        });

        // TODO: write tests reporting errors but that will have more involved work since file
    });
}
