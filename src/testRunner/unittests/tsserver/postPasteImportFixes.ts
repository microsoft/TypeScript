import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: postPasteImportFixes", () => {
    it("returns the same file unchanged, after updating and reverting changes added to a file", () => {
        const target: File = {
            path: "/project/a/target.ts",
            content: `const a = 1;
const b = 2;
const c = 3;`,
        };
        const tsconfig: File = {
            path: "/project/tsconfig.json",
            content: "{}",
        };
        const pastedText = `const a = 1;
function e();
const f = r + s;
const b = 2;
const c = 3;`;

        const host = createServerHost([target, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([target], session);

        const originalContent = target.content;
        const originalProgram = session.getProjectService().configuredProjects.get(tsconfig.path)!.getLanguageService().getProgram();

        const hostProject = session.getProjectService().configuredProjects.get(tsconfig.path)!;
        const updatedContent = hostProject.runWithTemporaryFileUpdate(target.path, pastedText);

        if (updatedContent.updatedFile !== undefined) {
            hostProject.revertUpdatedFile(target.path, updatedContent.updatedFile.getText(), originalContent);
        }
        assert.strictEqual(hostProject.getCurrentProgram()?.getSourceFileByPath(target.path as ts.Path)?.getText(), originalProgram?.getSourceFileByPath(target.path as ts.Path)?.getText());
        baselineTsserverLogs("getPostPasteImportFixes", "Returns the same file unchanged ", session);
    });
});
