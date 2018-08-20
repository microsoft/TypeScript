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
        function projectFile(subProject: SubProject, baseFileName: string): File {
            return {
                path: `${projectsLocation}/${project}/${subProject}/${baseFileName.toLowerCase()}`,
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

        const core = subProjectFiles(SubProject.core, /*anotherModuleAndSomeDecl*/ true);
        const logic = subProjectFiles(SubProject.logic);
        const tests = subProjectFiles(SubProject.tests);
        const ui = subProjectFiles(SubProject.ui);
        const allFiles: ReadonlyArray<File> = [libFile, ...core, ...logic, ...tests, ...ui];
        const testProjectExpectedWatchedFiles = [core[0], core[1], core[2], ...logic, ...tests].map(f => f.path);
        it("creates solution in watch mode", () => {
            const host = createWatchedSystem(allFiles, { currentDirectory: projectsLocation });
            const originalWrite = host.write;
            host.write = s => { console.log(s); originalWrite.call(host, s); };
            createSolutionBuilderWithWatch(host, [`${project}/${SubProject.tests}`]);
            checkWatchedFiles(host, testProjectExpectedWatchedFiles);
            checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
            checkWatchedDirectories(host, emptyArray, /*recursive*/ true); // TODO: #26524
        });
    });
}
