namespace ts.projectSystem {
    const aTs: File = {
        path: "/a.ts",
        content: `import { B } from "./b";`
    };
    const bDts: File = {
        path: "/b.d.ts",
        content: `export declare class B {}`
    };
    const bJs: File = {
        path: "/b.js",
        content: `export class B {}`
    };
    describe("unittests:: tsserver:: auxiliaryProject", () => {
        it("AuxiliaryProject does not remove scrips from InferredProject", () => {
            const host = createServerHost([aTs, bDts, bJs]);
            const session = createSession(host);
            const projectService = session.getProjectService();
            openFilesForSession([aTs], session);

            checkNumberOfInferredProjects(projectService, 1);
            const inferredProject = projectService.inferredProjects[0];
            const auxProject = inferredProject.getNoDtsResolutionProject([aTs.path]);
            auxProject.updateGraph();

            const bJsScriptInfo = Debug.checkDefined(projectService.getScriptInfo(bJs.path));
            assert(bJsScriptInfo.isOrphan());
            assert(bJsScriptInfo.isContainedByBackgroundProject());
            assert.deepEqual(bJsScriptInfo.containingProjects, [auxProject]);
            assert.throws(() => bJsScriptInfo.getDefaultProject());

            openFilesForSession([bJs], session);
            assert(!bJsScriptInfo.isOrphan());
            assert(bJsScriptInfo.isContainedByBackgroundProject());
            assert.equal(bJsScriptInfo.getDefaultProject().projectKind, server.ProjectKind.Inferred);
        });
    });
}
