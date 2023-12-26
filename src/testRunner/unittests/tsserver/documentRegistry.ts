import {
    reportDocumentRegistryStats,
} from "../../../harness/incrementalUtils";
import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: documentRegistry:: document registry in project service", () => {
    const importModuleContent = `import {a} from "./module1"`;
    const file: File = {
        path: `/user/username/projects/myproject/index.ts`,
        content: importModuleContent,
    };
    const moduleFile: File = {
        path: `/user/username/projects/myproject/module1.d.ts`,
        content: "export const a: number;",
    };
    const configFile: File = {
        path: `/user/username/projects/myproject/tsconfig.json`,
        content: jsonToReadableText({ files: ["index.ts"] }),
    };

    function getProject(session: TestSession) {
        return session.getProjectService().configuredProjects.get(configFile.path)!;
    }

    function checkProject(session: TestSession, moduleIsOrphan: boolean) {
        // Update the project
        const project = getProject(session);
        project.getLanguageService();
        const moduleInfo = session.getProjectService().getScriptInfo(moduleFile.path)!;
        assert.isDefined(moduleInfo);
        assert.equal(moduleInfo.isOrphan(), moduleIsOrphan);
        session.logger.log("DocumentRegistry::");
        session.logger.log(reportDocumentRegistryStats(session.getProjectService().documentRegistry).join("\n"));
    }

    function createSessionAndHost() {
        const host = createServerHost([file, moduleFile, libFile, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file], session);
        checkProject(session, /*moduleIsOrphan*/ false);
        return { host, session };
    }

    function changeFileToNotImportModule(session: TestSession) {
        session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
            command: ts.server.protocol.CommandTypes.Change,
            arguments: {
                file: file.path,
                line: 1,
                offset: 1,
                endLine: 1,
                endOffset: importModuleContent.length + 1,
                insertString: "",
            },
        });
        checkProject(session, /*moduleIsOrphan*/ true);
    }

    function changeFileToImportModule(session: TestSession) {
        session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
            command: ts.server.protocol.CommandTypes.Change,
            arguments: {
                file: file.path,
                line: 1,
                offset: 1,
                endLine: 1,
                endOffset: 1,
                insertString: importModuleContent,
            },
        });
        checkProject(session, /*moduleIsOrphan*/ false);
    }

    it("Caches the source file if script info is orphan", () => {
        const { session } = createSessionAndHost();
        const project = getProject(session);

        const moduleInfo = session.getProjectService().getScriptInfo(moduleFile.path)!;
        const sourceFile = moduleInfo.cacheSourceFile!.sourceFile;
        assert.equal(project.getSourceFile(moduleInfo.path), sourceFile);

        // edit file
        changeFileToNotImportModule(session);
        assert.equal(moduleInfo.cacheSourceFile!.sourceFile, sourceFile);

        // write content back
        changeFileToImportModule(session);
        assert.equal(moduleInfo.cacheSourceFile!.sourceFile, sourceFile);
        assert.equal(project.getSourceFile(moduleInfo.path), sourceFile);
        baselineTsserverLogs("documentRegistry", "Caches the source file if script info is orphan", session);
    });

    it("Caches the source file if script info is orphan, and orphan script info changes", () => {
        const { host, session } = createSessionAndHost();
        const project = getProject(session);

        const moduleInfo = session.getProjectService().getScriptInfo(moduleFile.path)!;
        const sourceFile = moduleInfo.cacheSourceFile!.sourceFile;
        assert.equal(project.getSourceFile(moduleInfo.path), sourceFile);

        // edit file
        changeFileToNotImportModule(session);
        assert.equal(moduleInfo.cacheSourceFile!.sourceFile, sourceFile);

        const updatedModuleContent = moduleFile.content + "\nexport const b: number;";
        host.writeFile(moduleFile.path, updatedModuleContent);

        // write content back
        changeFileToImportModule(session);
        assert.notEqual(moduleInfo.cacheSourceFile!.sourceFile, sourceFile);
        assert.equal(project.getSourceFile(moduleInfo.path), moduleInfo.cacheSourceFile!.sourceFile);
        assert.equal(moduleInfo.cacheSourceFile!.sourceFile.text, updatedModuleContent);
        baselineTsserverLogs("documentRegistry", "Caches the source file if script info is orphan, and orphan script info changes", session);
    });
});

describe("unittests:: tsserver:: documentRegistry:: works when reusing orphan script info with different scriptKind", () => {
    it("works when reusing orphan script info with different scriptKind", () => {
        const host = createServerHost({});
        const session = new TestSession({ host, useInferredProjectPerProjectRoot: true });
        const newText = "exrpot const x = 10;";
        const content = `import x from 'react';\n${newText}`;
        openFilesForSession([
            { file: "^/inmemory/model/6", content, scriptKindName: "TSX", projectRootPath: "/users/user/projects/san" },
            { file: "^/inmemory/model/4", content, scriptKindName: "TSX", projectRootPath: "/users/user/projects/san" },
        ], session);
        closeFilesForSession(["^/inmemory/model/4"], session);
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: "^/inmemory/model/6",
                    textChanges: [{
                        newText,
                        start: { line: 1, offset: 1 },
                        end: { line: 2, offset: newText.length + 1 }, // Remove the import so that structure is not reused
                    }],
                }],
                openFiles: [
                    {
                        file: "^/inmemory/model/4",
                        fileContent: newText,
                        projectRootPath: "/users/user/projects/san", // Add same document with different script kind
                        scriptKindName: "TS",
                    },
                ],
            },
        });
        baselineTsserverLogs("documentRegistry", "works when reusing orphan script info with different scriptKind", session);
    });
});
