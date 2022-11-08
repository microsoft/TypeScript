import * as ts from "../../_namespaces/ts";

const aTs: ts.projectSystem.File = {
    path: "/a.ts",
    content: `import { B } from "./b";`
};
const bDts: ts.projectSystem.File = {
    path: "/b.d.ts",
    content: `export declare class B {}`
};
const bJs: ts.projectSystem.File = {
    path: "/b.js",
    content: `export class B {}`
};
describe("unittests:: tsserver:: auxiliaryProject", () => {
    it("AuxiliaryProject does not remove scrips from InferredProject", () => {
        const host = ts.projectSystem.createServerHost([aTs, bDts, bJs]);
        const session = ts.projectSystem.createSession(host);
        const projectService = session.getProjectService();
        ts.projectSystem.openFilesForSession([aTs], session);

        // Open file is in inferred project
        ts.projectSystem.checkNumberOfInferredProjects(projectService, 1);
        const inferredProject = projectService.inferredProjects[0];

        // getNoDtsResolutionProject will create an AuxiliaryProject with a.ts and b.js
        const auxProject = inferredProject.getNoDtsResolutionProject([aTs.path]);
        auxProject.updateGraph();

        // b.js ScriptInfo is now available because it's contained by the AuxiliaryProject.
        // The AuxiliaryProject should never be the default project for anything, so
        // the ScriptInfo should still report being an orphan, and getting its default
        // project should throw.
        const bJsScriptInfo = ts.Debug.checkDefined(projectService.getScriptInfo(bJs.path));
        assert(bJsScriptInfo.isOrphan());
        assert(bJsScriptInfo.isContainedByBackgroundProject());
        assert.deepEqual(bJsScriptInfo.containingProjects, [auxProject]);
        assert.throws(() => bJsScriptInfo.getDefaultProject());

        // When b.js is opened in the editor, it should be put into an InferredProject
        // even though it's still contained by the AuxiliaryProject.
        ts.projectSystem.openFilesForSession([bJs], session);
        assert(!bJsScriptInfo.isOrphan());
        assert(bJsScriptInfo.isContainedByBackgroundProject());
        assert.equal(bJsScriptInfo.getDefaultProject().projectKind, ts.server.ProjectKind.Inferred);
    });
});
