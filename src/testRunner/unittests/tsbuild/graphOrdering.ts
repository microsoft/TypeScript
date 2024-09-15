import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: graphOrdering::", () => {
    let host: ts.SolutionBuilderHost<ts.EmitAndSemanticDiagnosticsBuilderProgram> | undefined;
    const deps: [string, string][] = [
        ["A", "B"],
        ["B", "C"],
        ["A", "C"],
        ["B", "D"],
        ["C", "D"],
        ["C", "E"],
        ["F", "E"],
        ["H", "I"],
        ["I", "J"],
        ["J", "H"],
        ["J", "E"],
    ];

    before(() => {
        const sys = TestServerHost.createWatchedSystem(ts.emptyArray, { useCaseSensitiveFileNames: true });
        host = ts.createSolutionBuilderHost(sys);
        writeProjects(sys, ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"], deps);
    });

    after(() => {
        host = undefined;
    });

    it("orders the graph correctly - specify two roots", () => {
        checkGraphOrdering(["A", "G"], ["D", "E", "C", "B", "A", "G"]);
    });

    it("orders the graph correctly - multiple parts of the same graph in various orders", () => {
        checkGraphOrdering(["A"], ["D", "E", "C", "B", "A"]);
        checkGraphOrdering(["A", "C", "D"], ["D", "E", "C", "B", "A"]);
        checkGraphOrdering(["D", "C", "A"], ["D", "E", "C", "B", "A"]);
    });

    it("orders the graph correctly - other orderings", () => {
        checkGraphOrdering(["F"], ["E", "F"]);
        checkGraphOrdering(["E"], ["E"]);
        checkGraphOrdering(["F", "C", "A"], ["E", "F", "D", "C", "B", "A"]);
    });

    it("returns circular order", () => {
        checkGraphOrdering(["H"], ["E", "J", "I", "H"], /*circular*/ true);
        checkGraphOrdering(["A", "H"], ["D", "E", "C", "B", "A", "J", "I", "H"], /*circular*/ true);
    });

    function checkGraphOrdering(rootNames: string[], expectedBuildSet: string[], circular?: true) {
        const builder = ts.createSolutionBuilder(host!, rootNames.map(getProjectFileName), { dry: true, force: false, verbose: false });
        const buildOrder = builder.getBuildOrder();
        assert.equal(ts.isCircularBuildOrder(buildOrder), !!circular);
        const buildQueue = ts.getBuildOrderFromAnyBuildOrder(buildOrder);
        assert.deepEqual(buildQueue, expectedBuildSet.map(getProjectFileName));

        if (!circular) {
            for (const dep of deps) {
                const child = getProjectFileName(dep[0]);
                if (!buildQueue.includes(child)) continue;
                const parent = getProjectFileName(dep[1]);
                assert.isAbove(buildQueue.indexOf(child), buildQueue.indexOf(parent), `Expecting child ${child} to be built after parent ${parent}`);
            }
        }
    }

    function getProjectFileName(proj: string) {
        return `/home/src/workspaces/project/${proj}/tsconfig.json` as ts.ResolvedConfigFileName;
    }

    function writeProjects(sys: TestServerHost, projectNames: string[], deps: [string, string][]): string[] {
        const projFileNames: string[] = [];
        for (const dep of deps) {
            if (!projectNames.includes(dep[0])) throw new Error(`Invalid dependency - project ${dep[0]} does not exist`);
            if (!projectNames.includes(dep[1])) throw new Error(`Invalid dependency - project ${dep[1]} does not exist`);
        }
        for (const proj of projectNames) {
            sys.ensureFileOrFolder({ path: `/home/src/workspaces/project/${proj}` });
            sys.writeFile(`/home/src/workspaces/project/${proj}/${proj}.ts`, "export {}");
            const configFileName = getProjectFileName(proj);
            const configContent = jsonToReadableText({
                compilerOptions: { composite: true },
                files: [`./${proj}.ts`],
                references: deps.filter(d => d[0] === proj).map(d => ({ path: `../${d[1]}` })),
            });
            sys.writeFile(configFileName, configContent);
            projFileNames.push(configFileName);
        }
        return projFileNames;
    }
});
