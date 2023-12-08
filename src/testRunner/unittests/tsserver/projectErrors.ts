import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    appendAllScriptInfos,
    baselineTsserverLogs,
    closeFilesForSession,
    openExternalProjectForSession,
    openFilesForSession,
    setCompilerOptionsForInferredProjectsRequestForSession,
    TestSession,
    TestSessionRequest,
    toExternalFiles,
    verifyGetErrRequest,
    verifyGetErrScenario,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    Folder,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: projectErrors::", () => {
    it("external project - diagnostics for missing files", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: "",
        };
        const file2 = {
            path: "/a/b/applib.ts",
            content: "",
        };
        const host = createServerHost([file1, libFile]);
        const session = new TestSession(host);
        const projectFileName = "/a/b/test.csproj";
        const compilerOptionsRequest: TestSessionRequest<ts.server.protocol.CompilerOptionsDiagnosticsRequest> = {
            command: ts.server.protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
            arguments: { projectFileName },
        };

        {
            openExternalProjectForSession({
                projectFileName,
                options: {},
                rootFiles: toExternalFiles([file1.path, file2.path]),
            }, session);

            session.executeCommandSeq(compilerOptionsRequest);
            // only file1 exists - expect error
        }
        host.renameFile(file1.path, file2.path);
        {
            // only file2 exists - expect error
            session.executeCommandSeq(compilerOptionsRequest);
        }

        host.writeFile(file1.path, file1.content);
        {
            // both files exist - expect no errors
            session.executeCommandSeq(compilerOptionsRequest);
        }
        baselineTsserverLogs("projectErrors", "external project - diagnostics for missing files", session);
    });

    it("configured projects - diagnostics for missing files", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: "",
        };
        const file2 = {
            path: "/a/b/applib.ts",
            content: "",
        };
        const config = {
            path: "/a/b/tsconfig.json",
            content: jsonToReadableText({ files: [file1, file2].map(f => ts.getBaseFileName(f.path)) }),
        };
        const host = createServerHost([file1, config, libFile]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);
        const compilerOptionsRequest: TestSessionRequest<ts.server.protocol.CompilerOptionsDiagnosticsRequest> = {
            command: ts.server.protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
            arguments: { projectFileName: config.path },
        };
        session.executeCommandSeq(compilerOptionsRequest);

        host.writeFile(file2.path, file2.content);

        session.executeCommandSeq(compilerOptionsRequest);
        baselineTsserverLogs("projectErrors", "configured projects - diagnostics for missing files", session);
    });

    it("configured projects - diagnostics for corrupted config 1", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: "",
        };
        const file2 = {
            path: "/a/b/lib.ts",
            content: "",
        };
        const correctConfig = {
            path: "/a/b/tsconfig.json",
            content: jsonToReadableText({ files: [file1, file2].map(f => ts.getBaseFileName(f.path)) }),
        };
        const corruptedConfig = {
            path: correctConfig.path,
            content: correctConfig.content.substr(1),
        };
        const host = createServerHost([file1, file2, corruptedConfig]);
        const session = new TestSession(host);

        openFilesForSession([file1], session);
        {
            session.executeCommandSeq<ts.server.protocol.SynchronizeProjectListRequest>({
                command: ts.server.protocol.CommandTypes.SynchronizeProjectList,
                arguments: { knownProjects: [] },
            });
            session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
                command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
                arguments: {
                    file: corruptedConfig.path,
                    projectFileName: corruptedConfig.path,
                },
            });
        }
        // fix config and trigger watcher
        host.writeFile(correctConfig.path, correctConfig.content);
        {
            session.executeCommandSeq<ts.server.protocol.SynchronizeProjectListRequest>({
                command: ts.server.protocol.CommandTypes.SynchronizeProjectList,
                arguments: { knownProjects: [] },
            });
            session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
                command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
                arguments: {
                    file: correctConfig.path,
                    projectFileName: correctConfig.path,
                },
            });
        }
        baselineTsserverLogs("projectErrors", "configured projects - diagnostics for corrupted config 1", session);
    });

    it("configured projects - diagnostics for corrupted config 2", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: "",
        };
        const file2 = {
            path: "/a/b/lib.ts",
            content: "",
        };
        const correctConfig = {
            path: "/a/b/tsconfig.json",
            content: jsonToReadableText({ files: [file1, file2].map(f => ts.getBaseFileName(f.path)) }),
        };
        const corruptedConfig = {
            path: correctConfig.path,
            content: correctConfig.content.substr(1),
        };
        const host = createServerHost([file1, file2, correctConfig]);
        const session = new TestSession(host);

        openFilesForSession([file1], session);
        {
            session.executeCommandSeq<ts.server.protocol.SynchronizeProjectListRequest>({
                command: ts.server.protocol.CommandTypes.SynchronizeProjectList,
                arguments: { knownProjects: [] },
            });
            session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
                command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
                arguments: {
                    file: correctConfig.path,
                    projectFileName: correctConfig.path,
                },
            });
        }
        // break config and trigger watcher
        host.writeFile(corruptedConfig.path, corruptedConfig.content);
        {
            session.executeCommandSeq<ts.server.protocol.SynchronizeProjectListRequest>({
                command: ts.server.protocol.CommandTypes.SynchronizeProjectList,
                arguments: { knownProjects: [] },
            });
            session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
                command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
                arguments: {
                    file: corruptedConfig.path,
                    projectFileName: corruptedConfig.path,
                },
            });
        }
        baselineTsserverLogs("projectErrors", "configured projects - diagnostics for corrupted config 2", session);
    });
});

describe("unittests:: tsserver:: projectErrors:: are reported as appropriate", () => {
    it("document is not contained in project", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: "",
        };
        const corruptedConfig = {
            path: "/a/b/tsconfig.json",
            content: "{",
        };
        const host = createServerHost([file1, corruptedConfig]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);
        baselineTsserverLogs("projectErrors", "document is not contained in project", session);
    });

    describe("when opening new file that doesnt exist on disk yet", () => {
        function verifyNonExistentFile(useProjectRoot: boolean) {
            const folderPath = "/user/someuser/projects/someFolder";
            const fileInRoot: File = {
                path: `/src/somefile.d.ts`,
                content: "class c { }",
            };
            const fileInProjectRoot: File = {
                path: `${folderPath}/src/somefile.d.ts`,
                content: "class c { }",
            };
            const host = createServerHost([libFile, fileInRoot, fileInProjectRoot]);
            const session = new TestSession({ host, useInferredProjectPerProjectRoot: true });

            const untitledFile = "untitled:Untitled-1";
            const refPathNotFound1 = "../../../../../../typings/@epic/Core.d.ts";
            const refPathNotFound2 = "./src/somefile.d.ts";
            const fileContent = `/// <reference path="${refPathNotFound1}" />
/// <reference path="${refPathNotFound2}" />`;
            session.executeCommandSeq<ts.server.protocol.OpenRequest>({
                command: ts.server.protocol.CommandTypes.Open,
                arguments: {
                    file: untitledFile,
                    fileContent,
                    scriptKindName: "TS",
                    projectRootPath: useProjectRoot ? folderPath : undefined,
                },
            });
            appendAllScriptInfos(session);

            // Since this is not js project so no typings are queued
            verifyGetErrRequest({ session, files: [untitledFile] });
            baselineTsserverLogs("projectErrors", `when opening new file that doesnt exist on disk yet ${useProjectRoot ? "with projectRoot" : "without projectRoot"}`, session);
        }

        it("has projectRoot", () => {
            verifyNonExistentFile(/*useProjectRoot*/ true);
        });

        it("does not have projectRoot", () => {
            verifyNonExistentFile(/*useProjectRoot*/ false);
        });
    });

    it("folder rename updates project structure and reports no errors", () => {
        const projectDir = "/a/b/projects/myproject";
        const app: File = {
            path: `${projectDir}/bar/app.ts`,
            content: "class Bar implements foo.Foo { getFoo() { return ''; } get2() { return 1; } }",
        };
        const foo: File = {
            path: `${projectDir}/foo/foo.ts`,
            content: "declare namespace foo { interface Foo { get2(): number; getFoo(): string; } }",
        };
        const configFile: File = {
            path: `${projectDir}/tsconfig.json`,
            content: jsonToReadableText({ compilerOptions: { module: "none", targer: "es5" }, exclude: ["node_modules"] }),
        };
        const host = createServerHost([app, foo, configFile]);
        const session = new TestSession(host);

        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: app.path },
        });
        verifyGetErrRequest({ session, files: [app] });

        host.renameFolder(`${projectDir}/foo`, `${projectDir}/foo2`);
        host.runQueuedTimeoutCallbacks();
        host.runQueuedTimeoutCallbacks();
        verifyGetErrRequest({ session, files: [app] });
        baselineTsserverLogs("projectErrors", `folder rename updates project structure and reports no errors`, session);
    });

    it("Getting errors before opening file", () => {
        const file: File = {
            path: "/a/b/project/file.ts",
            content: "let x: number = false;",
        };
        const host = createServerHost([file, libFile]);
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.GeterrRequest>({
            command: ts.server.protocol.CommandTypes.Geterr,
            arguments: {
                delay: 0,
                files: [file.path],
            },
        });

        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("projectErrors", "getting errors before opening file", session);
    });

    it("Reports errors correctly when file referenced by inferred project root, is opened right after closing the root file", () => {
        const app: File = {
            path: `/user/username/projects/myproject/src/client/app.js`,
            content: "",
        };
        const serverUtilities: File = {
            path: `/user/username/projects/myproject/src/server/utilities.js`,
            content: `function getHostName() { return "hello"; } export { getHostName };`,
        };
        const backendTest: File = {
            path: `/user/username/projects/myproject/test/backend/index.js`,
            content: `import { getHostName } from '../../src/server/utilities';export default getHostName;`,
        };
        const files = [libFile, app, serverUtilities, backendTest];
        const host = createServerHost(files);
        const session = new TestSession({ host, useInferredProjectPerProjectRoot: true });
        openFilesForSession([{ file: app, projectRootPath: "/user/username/projects/myproject" }], session);
        openFilesForSession([{ file: backendTest, projectRootPath: "/user/username/projects/myproject" }], session);
        verifyGetErrRequest({ session, files: [backendTest.path, app.path] });
        closeFilesForSession([backendTest], session);
        openFilesForSession([{ file: serverUtilities.path, projectRootPath: "/user/username/projects/myproject" }], session);
        verifyGetErrRequest({ session, files: [serverUtilities.path, app.path] });
        baselineTsserverLogs("projectErrors", `reports errors correctly when file referenced by inferred project root, is opened right after closing the root file`, session);
    });

    it("Correct errors when resolution resolves to file that has same ambient module and is also module", () => {
        const projectRootPath = "/users/username/projects/myproject";
        const aFile: File = {
            path: `${projectRootPath}/src/a.ts`,
            content: `import * as myModule from "@custom/plugin";
function foo() {
  // hello
}`,
        };
        const config: File = {
            path: `${projectRootPath}/tsconfig.json`,
            content: jsonToReadableText({ include: ["src"] }),
        };
        const plugin: File = {
            path: `${projectRootPath}/node_modules/@custom/plugin/index.d.ts`,
            content: `import './proposed';
declare module '@custom/plugin' {
    export const version: string;
}`,
        };
        const pluginProposed: File = {
            path: `${projectRootPath}/node_modules/@custom/plugin/proposed.d.ts`,
            content: `declare module '@custom/plugin' {
    export const bar = 10;
}`,
        };
        const files = [libFile, aFile, config, plugin, pluginProposed];
        const host = createServerHost(files);
        const session = new TestSession(host);
        openFilesForSession([aFile], session);

        verifyGetErrRequest({ session, files: [aFile] });

        session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
            command: ts.server.protocol.CommandTypes.Change,
            arguments: {
                file: aFile.path,
                line: 3,
                offset: 8,
                endLine: 3,
                endOffset: 8,
                insertString: "o",
            },
        });
        verifyGetErrRequest({ session, files: [aFile] });
        baselineTsserverLogs("projectErrors", `correct errors when resolution resolves to file that has same ambient module and is also module`, session);
    });

    describe("when semantic error returns includes global error", () => {
        const file: File = {
            path: `/user/username/projects/myproject/ui.ts`,
            content: `const x = async (_action: string) => {
};`,
        };
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        verifyGetErrScenario({
            scenario: "projectErrors",
            subScenario: "when semantic error returns includes global error",
            allFiles: () => [libFile, file, config],
            openFiles: () => [file],
            getErrRequest: () => [file],
            getErrForProjectRequest: () => [{ project: file, files: [file] }],
            syncDiagnostics: () => [{ file, project: config }],
        });
    });
});

describe("unittests:: tsserver:: Project Errors for Configure file diagnostics events", () => {
    it("are generated when the config file has errors", () => {
        const file: File = {
            path: "/a/b/app.ts",
            content: "let x = 10",
        };
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {
                        "foo": "bar",
                        "allowJS": true
                    }
                }`,
        };
        const host = createServerHost([file, libFile, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file], session);
        baselineTsserverLogs("projectErrors", "configFileDiagnostic events are generated when the config file has errors", session);
    });

    it("are generated when the config file doesn't have errors", () => {
        const file: File = {
            path: "/a/b/app.ts",
            content: "let x = 10",
        };
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {}
                }`,
        };
        const host = createServerHost([file, libFile, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file], session);
        baselineTsserverLogs("projectErrors", "configFileDiagnostic events are generated when the config file doesnt have errors", session);
    });

    it("are generated when the config file changes", () => {
        const file: File = {
            path: "/a/b/app.ts",
            content: "let x = 10",
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {}
                }`,
        };

        const host = createServerHost([file, libFile, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file], session);

        configFile.content = `{
                "compilerOptions": {
                    "haha": 123
                }
            }`;
        host.writeFile(configFile.path, configFile.content);
        host.runQueuedTimeoutCallbacks();

        configFile.content = `{
                "compilerOptions": {}
            }`;
        host.writeFile(configFile.path, configFile.content);
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("projectErrors", "configFileDiagnostic events are generated when the config file changes", session);
    });

    it("are not generated when the config file does not include file opened and config file has errors", () => {
        const file: File = {
            path: "/a/b/app.ts",
            content: "let x = 10",
        };
        const file2: File = {
            path: "/a/b/test.ts",
            content: "let x = 10",
        };
        const file3: File = {
            path: "/a/b/test2.ts",
            content: "let xy = 10",
        };
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {
                        "foo": "bar",
                        "allowJS": true
                    },
                    "files": ["app.ts"]
                }`,
        };
        const host = createServerHost([file, libFile, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file2], session);
        openFilesForSession([file], session);
        // We generate only if project is created when opening file from the project
        openFilesForSession([file3], session);
        baselineTsserverLogs("projectErrors", "configFileDiagnostic events are not generated when the config file does not include file opened and config file has errors", session);
    });

    it("are not generated when the config file has errors but suppressDiagnosticEvents is true", () => {
        const file: File = {
            path: "/a/b/app.ts",
            content: "let x = 10",
        };
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {
                        "foo": "bar",
                        "allowJS": true
                    }
                }`,
        };
        const host = createServerHost([file, libFile, configFile]);
        const session = new TestSession({ host, suppressDiagnosticEvents: true });
        openFilesForSession([file], session);
        baselineTsserverLogs("projectErrors", "configFileDiagnostic events are not generated when the config file has errors but suppressDiagnosticEvents is true", session);
    });

    it("are not generated when the config file does not include file opened and doesnt contain any errors", () => {
        const file: File = {
            path: "/a/b/app.ts",
            content: "let x = 10",
        };
        const file2: File = {
            path: "/a/b/test.ts",
            content: "let x = 10",
        };
        const file3: File = {
            path: "/a/b/test2.ts",
            content: "let xy = 10",
        };
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "files": ["app.ts"]
                }`,
        };

        const host = createServerHost([file, file2, file3, libFile, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file2], session);
        openFilesForSession([file], session);
        // We generate only if project is created when opening file from the project
        openFilesForSession([file3], session);
        baselineTsserverLogs("projectErrors", "configFileDiagnostic events are not generated when the config file does not include file opened and doesnt contain any errors", session);
    });

    it("contains the project reference errors", () => {
        const file: File = {
            path: "/a/b/app.ts",
            content: "let x = 10",
        };
        const noSuchTsconfig = "no-such-tsconfig.json";
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "files": ["app.ts"],
                    "references": [{"path":"./${noSuchTsconfig}"}]
                }`,
        };

        const host = createServerHost([file, libFile, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file], session);
        baselineTsserverLogs("projectErrors", "configFileDiagnostic events contains the project reference errors", session);
    });
});

describe("unittests:: tsserver:: projectErrors:: dont include overwrite emit error", () => {
    it("for inferred project", () => {
        const f1 = {
            path: "/a/b/f1.js",
            content: "function test1() { }",
        };
        const host = createServerHost([f1, libFile]);
        const session = new TestSession(host);
        openFilesForSession([f1], session);

        const projectService = session.getProjectService();
        const projectFileName = projectService.inferredProjects[0].getProjectName();
        session.executeCommandSeq<ts.server.protocol.CompilerOptionsDiagnosticsRequest>({
            command: ts.server.protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
            arguments: { projectFileName },
        });

        setCompilerOptionsForInferredProjectsRequestForSession({ module: ts.server.protocol.ModuleKind.CommonJS }, session);
        session.executeCommandSeq<ts.server.protocol.CompilerOptionsDiagnosticsRequest>({
            command: ts.server.protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
            arguments: { projectFileName },
        });
        baselineTsserverLogs("projectErrors", "for inferred project", session);
    });

    it("for external project", () => {
        const f1 = {
            path: "/a/b/f1.js",
            content: "function test1() { }",
        };
        const host = createServerHost([f1, libFile]);
        const session = new TestSession(host);
        const projectFileName = "/a/b/project.csproj";
        const externalFiles = toExternalFiles([f1.path]);
        openExternalProjectForSession({
            projectFileName,
            rootFiles: externalFiles,
            options: {},
        }, session);

        session.executeCommandSeq<ts.server.protocol.CompilerOptionsDiagnosticsRequest>({
            command: ts.server.protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
            arguments: { projectFileName },
        });

        openExternalProjectForSession({
            projectFileName,
            rootFiles: externalFiles,
            options: { module: ts.server.protocol.ModuleKind.CommonJS },
        }, session);
        session.executeCommandSeq<ts.server.protocol.CompilerOptionsDiagnosticsRequest>({
            command: ts.server.protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
            arguments: { projectFileName },
        });
        baselineTsserverLogs("projectErrors", "for external project", session);
    });
});

describe("unittests:: tsserver:: projectErrors:: reports Options Diagnostic locations correctly with changes in configFile contents", () => {
    it("when options change", () => {
        const file = {
            path: "/a/b/app.ts",
            content: "let x = 10",
        };
        const configFileContentBeforeComment = `{`;
        const configFileContentComment = `
                // comment`;
        const configFileContentAfterComment = `
                "compilerOptions": {
                    "inlineSourceMap": true,
                    "mapRoot": "./"
                }
            }`;
        const configFileContentWithComment = configFileContentBeforeComment + configFileContentComment + configFileContentAfterComment;
        const configFileContentWithoutCommentLine = configFileContentBeforeComment + configFileContentAfterComment;

        const configFile = {
            path: "/a/b/tsconfig.json",
            content: configFileContentWithComment,
        };
        const host = createServerHost([file, libFile, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file], session);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: configFile.path, projectFileName: configFile.path, includeLinePosition: true },
        });

        host.writeFile(configFile.path, configFileContentWithoutCommentLine);

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: configFile.path, projectFileName: configFile.path, includeLinePosition: true },
        });
        baselineTsserverLogs("projectErrors", "when options change", session);
    });
});

describe("unittests:: tsserver:: projectErrors:: with config file change", () => {
    it("Updates diagnostics when '--noUnusedLabels' changes", () => {
        const aTs: File = { path: "/a.ts", content: "label: while (1) {}" };
        const options = (allowUnusedLabels: boolean) => `{ "compilerOptions": { "allowUnusedLabels": ${allowUnusedLabels} } }`;
        const tsconfig: File = { path: "/tsconfig.json", content: options(/*allowUnusedLabels*/ true) };

        const host = createServerHost([aTs, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([aTs], session);

        host.modifyFile(tsconfig.path, options(/*allowUnusedLabels*/ false));
        host.runQueuedTimeoutCallbacks();

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: aTs.path },
        });
        baselineTsserverLogs("projectErrors", `diagnostics after noUnusedLabels changes`, session);
    });
});

describe("unittests:: tsserver:: projectErrors:: with resolveJsonModule", () => {
    function createSessionForTest({ include }: { include: readonly string[]; }) {
        const test: File = {
            path: `/user/username/projects/myproject/src/test.ts`,
            content: `import * as blabla from "./blabla.json";
declare var console: any;
console.log(blabla);`,
        };
        const blabla: File = {
            path: `/user/username/projects/myproject/src/blabla.json`,
            content: "{}",
        };
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    resolveJsonModule: true,
                    composite: true,
                    outDir: "dist",
                },
                include,
            }),
        };

        const host = createServerHost([test, blabla, libFile, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([test], session);
        return { host, session, test, blabla, tsconfig };
    }

    it("should not report incorrect error when json is root file found by tsconfig", () => {
        const { session, test } = createSessionForTest({
            include: ["./src/*.ts", "./src/*.json"],
        });
        verifyGetErrRequest({ session, files: [test] });
        baselineTsserverLogs("projectErrors", `should not report incorrect error when json is root file found by tsconfig`, session);
    });

    it("should report error when json is not root file found by tsconfig", () => {
        const { session, test } = createSessionForTest({
            include: ["./src/*.ts"],
        });
        verifyGetErrRequest({ session, files: [test] });
        baselineTsserverLogs("projectErrors", `should report error when json is not root file found by tsconfig`, session);
    });
});

describe("unittests:: tsserver:: projectErrors:: with npm install when", () => {
    function verifyNpmInstall(timeoutDuringPartialInstallation: boolean) {
        const main: File = {
            path: `/user/username/projects/myproject/src/main.ts`,
            content: "import * as _a from '@angular/core';",
        };
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        // Move things from staging to node_modules without triggering watch
        const moduleFile: File = {
            path: `/user/username/projects/myproject/node_modules/@angular/core/index.d.ts`,
            content: `export const y = 10;`,
        };
        const projectFiles = [main, libFile, config];
        const host = createServerHost(projectFiles);
        const session = new TestSession(host);
        openFilesForSession([{ file: main, projectRootPath: "/user/username/projects/myproject" }], session);
        verifyGetErrRequest({ session, files: [main] });

        let npmInstallComplete = false;

        // Simulate npm install
        let filesAndFoldersToAdd: (File | Folder)[] = [
            { path: `/user/username/projects/myproject/node_modules` }, // This should queue update
            { path: `/user/username/projects/myproject/node_modules/.staging` },
            { path: `/user/username/projects/myproject/node_modules/.staging/@babel` },
            { path: `/user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f` },
            { path: `/user/username/projects/myproject/node_modules/.staging/core-js-db53158d` },
        ];
        verifyWhileNpmInstall();

        filesAndFoldersToAdd = [
            { path: `/user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a` },
            { path: `/user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts`, content: `export const x = 10;` },
            { path: `/user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts`, content: `export const y = 10;` },
        ];
        // Since we added/removed in .staging no timeout
        verifyWhileNpmInstall();

        filesAndFoldersToAdd = [];
        host.ensureFileOrFolder(moduleFile, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ true, /*ignoreParentWatch*/ true);
        // Since we added/removed in .staging no timeout
        verifyWhileNpmInstall();

        // Remove staging folder to remove errors
        host.deleteFolder(`/user/username/projects/myproject/node_modules/.staging`, /*recursive*/ true);
        npmInstallComplete = true;
        projectFiles.push(moduleFile);
        // Additional watch for watching script infos from node_modules
        verifyWhileNpmInstall();

        baselineTsserverLogs("projectErrors", `npm install when timeout occurs ${timeoutDuringPartialInstallation ? "inbetween" : "after"} installation`, session);

        function verifyWhileNpmInstall() {
            filesAndFoldersToAdd.forEach(f => host.ensureFileOrFolder(f));
            if (npmInstallComplete || timeoutDuringPartialInstallation) {
                host.runQueuedTimeoutCallbacks(); // Invalidation of failed lookups
                host.runQueuedTimeoutCallbacks(); // Actual update
            }
            verifyGetErrRequest({ session, files: [main], existingTimeouts: !npmInstallComplete && !timeoutDuringPartialInstallation });
        }
    }

    it("timeouts occur inbetween installation", () => {
        verifyNpmInstall(/*timeoutDuringPartialInstallation*/ true);
    });

    it("timeout occurs after installation", () => {
        verifyNpmInstall(/*timeoutDuringPartialInstallation*/ false);
    });
});
