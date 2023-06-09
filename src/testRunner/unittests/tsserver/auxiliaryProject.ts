import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createSession,
    openFilesForSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
} from "../helpers/virtualFileSystemWithWatch";

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
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        const projectService = session.getProjectService();
        openFilesForSession([aTs], session);

        // Open file is in inferred project
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
        openFilesForSession([bJs], session);
        assert(!bJsScriptInfo.isOrphan());
        assert(bJsScriptInfo.isContainedByBackgroundProject());
        assert.equal(bJsScriptInfo.getDefaultProject().projectKind, ts.server.ProjectKind.Inferred);
        baselineTsserverLogs("auxiliaryProject", "does not remove scrips from InferredProject", session);
    });
});
