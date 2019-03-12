namespace ts {
    describe("unittests:: tsbuild - graph-ordering", () => {
        let host: fakes.SolutionBuilderHost | undefined;
        const deps: [string, string][] = [
            ["A", "B"],
            ["B", "C"],
            ["A", "C"],
            ["B", "D"],
            ["C", "D"],
            ["C", "E"],
            ["F", "E"]
        ];

        before(() => {
            const fs = new vfs.FileSystem(false);
            host = new fakes.SolutionBuilderHost(fs);
            writeProjects(fs, ["A", "B", "C", "D", "E", "F", "G"], deps);
        });

        after(() => {
            host = undefined;
        });

        it("orders the graph correctly - specify two roots", () => {
            checkGraphOrdering(["A", "G"], ["A", "B", "C", "D", "E", "G"]);
        });

        it("orders the graph correctly - multiple parts of the same graph in various orders", () => {
            checkGraphOrdering(["A"], ["A", "B", "C", "D", "E"]);
            checkGraphOrdering(["A", "C", "D"], ["A", "B", "C", "D", "E"]);
            checkGraphOrdering(["D", "C", "A"], ["A", "B", "C", "D", "E"]);
        });

        it("orders the graph correctly - other orderings", () => {
            checkGraphOrdering(["F"], ["F", "E"]);
            checkGraphOrdering(["E"], ["E"]);
            checkGraphOrdering(["F", "C", "A"], ["A", "B", "C", "D", "E", "F"]);
        });

        function checkGraphOrdering(rootNames: string[], expectedBuildSet: string[]) {
            const builder = createSolutionBuilder(host!, rootNames, { dry: true, force: false, verbose: false });

            const projFileNames = rootNames.map(getProjectFileName);
            const graph = builder.getBuildGraph(projFileNames);

            assert.sameMembers(graph.buildQueue, expectedBuildSet.map(getProjectFileName));

            for (const dep of deps) {
                const child = getProjectFileName(dep[0]);
                if (graph.buildQueue.indexOf(child) < 0) continue;
                const parent = getProjectFileName(dep[1]);
                assert.isAbove(graph.buildQueue.indexOf(child), graph.buildQueue.indexOf(parent), `Expecting child ${child} to be built after parent ${parent}`);
            }
        }

        function getProjectFileName(proj: string) {
            return `/project/${proj}/tsconfig.json` as ResolvedConfigFileName;
        }

        function writeProjects(fileSystem: vfs.FileSystem, projectNames: string[], deps: [string, string][]): string[] {
            const projFileNames: string[] = [];
            for (const dep of deps) {
                if (projectNames.indexOf(dep[0]) < 0) throw new Error(`Invalid dependency - project ${dep[0]} does not exist`);
                if (projectNames.indexOf(dep[1]) < 0) throw new Error(`Invalid dependency - project ${dep[1]} does not exist`);
            }
            for (const proj of projectNames) {
                fileSystem.mkdirpSync(`/project/${proj}`);
                fileSystem.writeFileSync(`/project/${proj}/${proj}.ts`, "export {}");
                const configFileName = getProjectFileName(proj);
                const configContent = JSON.stringify({
                    compilerOptions: { composite: true },
                    files: [`./${proj}.ts`],
                    references: deps.filter(d => d[0] === proj).map(d => ({ path: `../${d[1]}` }))
                }, undefined, 2);
                fileSystem.writeFileSync(configFileName, configContent);
                projFileNames.push(configFileName);
            }
            return projFileNames;
        }
    });
}
