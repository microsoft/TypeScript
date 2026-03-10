import { reportDocumentRegistryStats } from "../../../harness/incrementalUtils.js";
import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

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
        const host = TestServerHost.createServerHost([file, moduleFile, configFile]);
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

describe("unittests:: tsserver:: documentRegistry:: projects with different pathsBasePath share the same document registry bucket", () => {
    function getProject(session: TestSession, config: File) {
        return session.getProjectService().configuredProjects.get(config.path.toLowerCase())!;
    }

    it("shares document registry bucket for projects with same compiler options but different pathsBasePath", () => {
        const sharedFile: File = {
            path: "/home/src/projects/shared/utils.d.ts",
            content: "export const util: number;",
        };

        const configA: File = {
            path: "/home/src/projects/projectA/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: { paths: { "@utils": ["../shared/utils.d.ts"] } },
                files: ["index.ts"],
            }),
        };
        const indexA: File = {
            path: "/home/src/projects/projectA/index.ts",
            content: `import { util } from "@utils";`,
        };

        const configB: File = {
            path: "/home/src/projects/projectB/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: { paths: { "@utils": ["../shared/utils.d.ts"] } },
                files: ["index.ts"],
            }),
        };
        const indexB: File = {
            path: "/home/src/projects/projectB/index.ts",
            content: `import { util } from "@utils";`,
        };

        const host = TestServerHost.createServerHost([sharedFile, configA, indexA, configB, indexB]);
        const session = new TestSession(host);
        openFilesForSession([
            { file: indexA, projectRootPath: "/home/src/projects/projectA" },
            { file: indexB, projectRootPath: "/home/src/projects/projectB" },
        ], session);

        const projectA = getProject(session, configA);
        const projectB = getProject(session, configB);

        // Both projects should reuse the same source file instance for the shared file
        const sharedInfo = session.getProjectService().getScriptInfo(sharedFile.path)!;
        const sourceFileA = projectA.getSourceFile(sharedInfo.path);
        const sourceFileB = projectB.getSourceFile(sharedInfo.path);
        assert.equal(sourceFileA, sourceFileB, "Both projects should share the same source file instance from the document registry");

        session.logger.log("DocumentRegistry::");
        session.logger.log(reportDocumentRegistryStats(session.getProjectService().documentRegistry).join("\n"));
        baselineTsserverLogs("documentRegistry", "shares document registry bucket for projects with different pathsBasePath", session);
    });
});

describe("unittests:: tsserver:: documentRegistry:: works when reusing orphan script info with different scriptKind", () => {
    it("works when reusing orphan script info with different scriptKind", () => {
        const host = TestServerHost.createServerHost({});
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
