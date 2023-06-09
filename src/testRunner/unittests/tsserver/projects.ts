import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    commonFile1,
    commonFile2,
} from "../helpers/tscWatch";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    createProjectService,
    createSession,
    customTypesMap,
    logConfiguredProjectsHasOpenRefStatus,
    logInferredProjectsOrphanStatus,
    openExternalProjectForSession,
    openFilesForSession,
    protocolFileLocationFromSubstring,
    TestSessionRequest,
    toExternalFile,
    toExternalFiles,
    verifyGetErrRequest,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: projects::", () => {
    it("handles the missing files - that were added to program because they were added with ///<ref", () => {
        const file1: File = {
            path: "/a/b/commonFile1.ts",
            content: `/// <reference path="commonFile2.ts"/>
                    let x = y`
        };
        const host = createServerHost([file1, libFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file1], session);

        // Two errors: CommonFile2 not found and cannot find name y
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file1.path }
        });

        host.writeFile(commonFile2.path, commonFile2.content);
        host.runQueuedTimeoutCallbacks();
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file1.path }
        });
        baselineTsserverLogs("projects", "handles the missing files added with tripleslash ref", session);
    });

    it("should create new inferred projects for files excluded from a configured project", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {},
                    "files": ["${commonFile1.path}", "${commonFile2.path}"]
                }`
        };
        const files = [commonFile1, commonFile2, configFile];
        const host = createServerHost(files);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([commonFile1], session);

        configFile.content = `{
                "compilerOptions": {},
                "files": ["${commonFile1.path}"]
            }`;
        host.writeFile(configFile.path, configFile.content);

        host.runQueuedTimeoutCallbacks(); // Update the configured project + refresh inferred projects

        openFilesForSession([commonFile2], session);
        baselineTsserverLogs("projects", "should create new inferred projects for files excluded from a configured project", session);
    });

    it("should disable features when the files are too large", () => {
        const file1 = {
            path: "/a/b/f1.js",
            content: "let x =1;",
            fileSize: 10 * 1024 * 1024
        };
        const file2 = {
            path: "/a/b/f2.js",
            content: "let y =1;",
            fileSize: 6 * 1024 * 1024
        };
        const file3 = {
            path: "/a/b/f3.js",
            content: "let y =1;",
            fileSize: 6 * 1024 * 1024
        };

        const proj1name = "proj1", proj2name = "proj2", proj3name = "proj3";

        const host = createServerHost([file1, file2, file3]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });

        openExternalProjectForSession({ rootFiles: toExternalFiles([file1.path]), options: {}, projectFileName: proj1name }, session);

        openExternalProjectForSession({ rootFiles: toExternalFiles([file2.path]), options: {}, projectFileName: proj2name }, session);

        openExternalProjectForSession({ rootFiles: toExternalFiles([file3.path]), options: {}, projectFileName: proj3name }, session);
        baselineTsserverLogs("projects", "should disable features when the files are too large", session);
    });

    it("should not crash when opening a file in a project with a disabled language service", () => {
        const file1 = {
            path: "/a/b/f1.js",
            content: "let x =1;",
            fileSize: 50 * 1024 * 1024
        };
        const file2 = {
            path: "/a/b/f2.js",
            content: "let x =1;",
            fileSize: 100
        };

        const projName = "proj1";

        const host = createServerHost([file1, file2]);
        const session = createSession(host, { useSingleInferredProject: true, logger: createLoggerWithInMemoryLogs(host) });

        openExternalProjectForSession({ rootFiles: toExternalFiles([file1.path, file2.path]), options: {}, projectFileName: projName }, session);

        openFilesForSession([file2], session);
        baselineTsserverLogs("projects", "should not crash when opening a file in a project with a disabled language service", session);
    });

    describe("ignoreConfigFiles", () => {
        it("external project including config file", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x =1;"
            };
            const config1 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify(
                    {
                        compilerOptions: {},
                        files: ["f1.ts"]
                    }
                )
            };

            const externalProjectName = "externalproject";
            const host = createServerHost([file1, config1]);
            const projectService = createProjectService(host, { useSingleInferredProject: true, serverMode: ts.LanguageServiceMode.Syntactic, logger: createLoggerWithInMemoryLogs(host) });
            projectService.openExternalProject({
                rootFiles: toExternalFiles([file1.path, config1.path]),
                options: {},
                projectFileName: externalProjectName
            });

            baselineTsserverLogs("projects", "external project including config file", projectService);
        });

        it("loose file included in config file (openClientFile)", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x =1;"
            };
            const config1 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify(
                    {
                        compilerOptions: {},
                        files: ["f1.ts"]
                    }
                )
            };

            const host = createServerHost([file1, config1]);
            const projectService = createProjectService(host, { useSingleInferredProject: true, serverMode: ts.LanguageServiceMode.Syntactic, logger: createLoggerWithInMemoryLogs(host) });
            projectService.openClientFile(file1.path, file1.content);
            baselineTsserverLogs("projects", "loose file included in config file (openClientFile)", projectService);
        });

        it("loose file included in config file (applyCodeChanges)", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x =1;"
            };
            const config1 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify(
                    {
                        compilerOptions: {},
                        files: ["f1.ts"]
                    }
                )
            };

            const host = createServerHost([file1, config1]);
            const projectService = createProjectService(host, { useSingleInferredProject: true, serverMode: ts.LanguageServiceMode.Syntactic, logger: createLoggerWithInMemoryLogs(host) });
            projectService.applyChangesInOpenFiles(ts.singleIterator({ fileName: file1.path, content: file1.content }));

            baselineTsserverLogs("projects", "loose file included in config file (applyCodeChanges)", projectService);
        });
    });

    it("reload regular file after closing", () => {
        const f1 = {
            path: "/a/b/app.ts",
            content: "x."
        };
        const f2 = {
            path: "/a/b/lib.ts",
            content: "let x: number;"
        };

        const host = createServerHost([f1, f2, libFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openExternalProjectForSession({ projectFileName: "/a/b/project", rootFiles: toExternalFiles([f1.path, f2.path]), options: {} }, session);

        openFilesForSession([f1, { file: f2.path, content: "let x: string" }], session);
        // should contain completions for string
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: { file: f1.path, line: 1, offset: 3 }
        });

        closeFilesForSession([f2], session);
        // should contain completions for string
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: { file: f1.path, line: 1, offset: 3 }
        });
        baselineTsserverLogs("projects", "reload regular file after closing", session);
    });

    it("clear mixed content file after closing", () => {
        const f1 = {
            path: "/a/b/app.ts",
            content: " "
        };
        const f2 = {
            path: "/a/b/lib.html",
            content: "<html/>"
        };

        const host = createServerHost([f1, f2, libFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openExternalProjectForSession({ projectFileName: "/a/b/project", rootFiles: [{ fileName: f1.path }, { fileName: f2.path, hasMixedContent: true }], options: {} }, session);
        openFilesForSession([f1, { file: f2.path, content: "let somelongname: string" }], session);

        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: { file: f1.path, line: 1, offset: 1 }
        });

        closeFilesForSession([f2], session);
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: { file: f1.path, line: 1, offset: 1 }
        });
        baselineTsserverLogs("projects", "clear mixed content file after closing", session);
    });

    it("changes in closed files are reflected in project structure", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: `export * from "./f2"`
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: `export let x = 1`
        };
        const file3 = {
            path: "/a/c/f3.ts",
            content: `export let y = 1;`
        };
        const host = createServerHost([file1, file2, file3]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file1.path);

        projectService.openClientFile(file3.path);

        host.writeFile(file2.path, `export * from "../c/f3"`); // now inferred project should inclule file3
        host.runQueuedTimeoutCallbacks();
        logInferredProjectsOrphanStatus(projectService);
        baselineTsserverLogs("projects", "changes in closed files are reflected in project structure", projectService);
    });

    it("deleted files affect project structure", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: `export * from "./f2"`
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: `export * from "../c/f3"`
        };
        const file3 = {
            path: "/a/c/f3.ts",
            content: `export let y = 1;`
        };
        const host = createServerHost([file1, file2, file3]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file1.path);
        projectService.openClientFile(file3.path);

        host.deleteFile(file2.path);
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("projects", "deleted files affect project structure", projectService);
    });

    it("ignores files excluded by a custom safe type list", () => {
        const file1 = {
            path: "/a/b/f1.js",
            content: "export let x = 5"
        };
        const office = {
            path: "/lib/duckquack-3.min.js",
            content: "whoa do @@ not parse me ok thanks!!!"
        };
        const host = createServerHost([file1, office, customTypesMap]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        try {
            projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path, office.path]) });
            projectService.logger.log(`TypeAcquisition:: ${JSON.stringify(projectService.externalProjects[0].getTypeAcquisition(), undefined, " ")}`);
        }
        finally {
            projectService.resetSafeList();
        }
        baselineTsserverLogs("projects", "ignores files excluded by a custom safe type list", projectService);
    });

    it("file with name constructor.js doesnt cause issue with typeAcquisition when safe type list", () => {
        const file1 = {
            path: "/a/b/f1.js",
            content: `export let x = 5; import { s } from "s"`
        };
        const constructorFile = {
            path: "/a/b/constructor.js",
            content: "const x = 10;"
        };
        const bliss = {
            path: "/a/b/bliss.js",
            content: "export function is() { return true; }"
        };
        const host = createServerHost([file1, libFile, constructorFile, bliss, customTypesMap]);
        let request: string | undefined;
        const cachePath = "/a/data";
        const typingsInstaller: ts.server.ITypingsInstaller = {
            isKnownTypesPackageName: ts.returnFalse,
            installPackage: ts.notImplemented,
            enqueueInstallTypingsRequest: (proj, typeAcquisition, unresolvedImports) => {
                assert.isUndefined(request);
                request = JSON.stringify(ts.server.createInstallTypingsRequest(proj, typeAcquisition, unresolvedImports || ts.server.emptyArray, cachePath));
            },
            attach: ts.noop,
            onProjectClosed: ts.noop,
            globalTypingsCacheLocation: cachePath
        };

        const projectName = "project";
        const projectService = createProjectService(host, { typingsInstaller, logger: createLoggerWithInMemoryLogs(host) });
        projectService.openExternalProject({ projectFileName: projectName, options: {}, rootFiles: toExternalFiles([file1.path, constructorFile.path, bliss.path]) });
        assert.equal(request, JSON.stringify({
            projectName,
            fileNames: [libFile.path, file1.path, constructorFile.path, bliss.path],
            compilerOptions: { allowNonTsExtensions: true, noEmitForJsFiles: true },
            typeAcquisition: { include: ["blissfuljs"], exclude: [], enable: true },
            unresolvedImports: ["s"],
            projectRootPath: "/",
            cachePath,
            kind: "discover"
        }));
        const response = JSON.parse(request!);
        request = undefined;
        projectService.updateTypingsForProject({
            kind: "action::set",
            projectName: response.projectName,
            typeAcquisition: response.typeAcquisition,
            compilerOptions: response.compilerOptions,
            typings: ts.emptyArray,
            unresolvedImports: response.unresolvedImports,
        });

        projectService.testhost.logTimeoutQueueLength();
        assert.isUndefined(request);
        baselineTsserverLogs("projects", "file with name constructor.js doesnt cause issue with typeAcquisition when safe type list", projectService);
    });

    it("ignores files excluded by the default type list", () => {
        const file1 = {
            path: "/a/b/f1.js",
            content: "export let x = 5"
        };
        const minFile = {
            path: "/c/moment.min.js",
            content: "unspecified"
        };
        const kendoFile1 = {
            path: "/q/lib/kendo/kendo.all.min.js",
            content: "unspecified"
        };
        const kendoFile2 = {
            path: "/q/lib/kendo/kendo.ui.min.js",
            content: "unspecified"
        };
        const kendoFile3 = {
            path: "/q/lib/kendo-ui/kendo.all.js",
            content: "unspecified"
        };
        const officeFile1 = {
            path: "/scripts/Office/1/excel-15.debug.js",
            content: "unspecified"
        };
        const officeFile2 = {
            path: "/scripts/Office/1/powerpoint.js",
            content: "unspecified"
        };
        const files = [file1, minFile, kendoFile1, kendoFile2, kendoFile3, officeFile1, officeFile2];
        const host = createServerHost(files);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        try {
            projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles(files.map(f => f.path)) });
            projectService.logger.log(`TypeAcquisition:: ${JSON.stringify(projectService.externalProjects[0].getTypeAcquisition(), undefined, " ")}`);
        }
        finally {
            projectService.resetSafeList();
        }
        baselineTsserverLogs("projects", "ignores files excluded by the default type list", projectService);
    });

    it("removes version numbers correctly", () => {
        const testData: [string, string][] = [
            ["jquery-max", "jquery-max"],
            ["jquery.min", "jquery"],
            ["jquery-min.4.2.3", "jquery"],
            ["jquery.min.4.2.1", "jquery"],
            ["minimum", "minimum"],
            ["min", "min"],
            ["min.3.2", "min"],
            ["jquery", "jquery"]
        ];
        for (const t of testData) {
            assert.equal(ts.removeMinAndVersionNumbers(t[0]), t[1], t[0]);
        }
    });

    it("ignores files excluded by a legacy safe type list", () => {
        const file1 = {
            path: "/a/b/bliss.js",
            content: "let x = 5"
        };
        const file2 = {
            path: "/a/b/foo.js",
            content: ""
        };
        const file3 = {
            path: "/a/b/Bacon.js",
            content: "let y = 5"
        };
        const host = createServerHost([file1, file2, file3, customTypesMap]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        try {
            projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path, file2.path]), typeAcquisition: { enable: true } });
        }
        finally {
            projectService.resetSafeList();
        }
        baselineTsserverLogs("projects", "ignores files excluded by a legacy safe type list", projectService);
    });

    it("correctly migrate files between projects", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: `
                export * from "../c/f2";
                export * from "../d/f3";`
        };
        const file2 = {
            path: "/a/c/f2.ts",
            content: "export let x = 1;"
        };
        const file3 = {
            path: "/a/d/f3.ts",
            content: "export let y = 1;"
        };
        const host = createServerHost([file1, file2, file3]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file2.path);
        logInferredProjectsOrphanStatus(projectService);

        projectService.openClientFile(file3.path);
        logInferredProjectsOrphanStatus(projectService);

        projectService.openClientFile(file1.path);
        logInferredProjectsOrphanStatus(projectService);

        projectService.closeClientFile(file1.path);
        logInferredProjectsOrphanStatus(projectService);

        projectService.closeClientFile(file3.path);
        logInferredProjectsOrphanStatus(projectService);

        projectService.openClientFile(file3.path);
        logInferredProjectsOrphanStatus(projectService);
        baselineTsserverLogs("projects", "correctly migrate files between projects", projectService);
    });

    it("regression test for crash in acquireOrUpdateDocument", () => {
        const tsFile = {
            fileName: "/a/b/file1.ts",
            path: "/a/b/file1.ts",
            content: ""
        };
        const jsFile = {
            path: "/a/b/file1.js",
            content: "var x = 10;",
            fileName: "/a/b/file1.js",
            scriptKind: "JS" as const
        };

        const host = createServerHost([]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.applyChangesInOpenFiles(ts.singleIterator(tsFile));
        const projs = projectService.synchronizeProjectList([]);
        projectService.findProject(projs[0].info!.projectName)!.getLanguageService().getNavigationBarItems(tsFile.fileName);
        projectService.synchronizeProjectList([projs[0].info!]);
        projectService.applyChangesInOpenFiles(ts.singleIterator(jsFile));
        baselineTsserverLogs("projects", "regression test for crash in acquireOrUpdateDocument", projectService);
    });

    it("config file is deleted", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x = 1;"
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: "let y = 2;"
        };
        const config = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ compilerOptions: {} })
        };
        const host = createServerHost([file1, file2, config]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file1.path);

        projectService.openClientFile(file2.path);

        host.deleteFile(config.path);
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("projects", "config file is deleted", projectService);
    });

    it("loading files with correct priority", () => {
        const f1 = {
            path: "/a/main.ts",
            content: "let x = 1"
        };
        const f2 = {
            path: "/a/main.js",
            content: "var y = 1"
        };
        const f3 = {
            path: "/main.js",
            content: "var y = 1"
        };
        const config = {
            path: "/a/tsconfig.json",
            content: JSON.stringify({
                compilerOptions: { allowJs: true }
            })
        };
        const host = createServerHost([f1, f2, f3, config]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.setHostConfiguration({
            extraFileExtensions: [
                { extension: ".js", isMixedContent: false },
                { extension: ".html", isMixedContent: true }
            ]
        });
        projectService.openClientFile(f1.path);

        // Since f2 refers to config file as the default project, it needs to be kept alive
        projectService.closeClientFile(f1.path);
        projectService.openClientFile(f2.path);

        // Should close configured project with next file open
        projectService.closeClientFile(f2.path);
        projectService.openClientFile(f3.path);
        baselineTsserverLogs("projects", "loading files with correct priority", projectService);
    });

    it("tsconfig script block support", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: ` `
        };
        const file2 = {
            path: "/a/b/f2.html",
            content: `var hello = "hello";`
        };
        const config = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ compilerOptions: { allowJs: true } })
        };
        const host = createServerHost([file1, file2, config]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        // HTML file will not be included in any projects yet
        openFilesForSession([file1], session);
        const projectService = session.getProjectService();

        // Specify .html extension as mixed content
        const extraFileExtensions = [{ extension: ".html", scriptKind: ts.ScriptKind.JS, isMixedContent: true }];
        // The configured project should now be updated to include html file
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { extraFileExtensions }
        });

        // Open HTML file
        projectService.applyChangesInOpenFiles(ts.singleIterator({
            fileName: file2.path,
            hasMixedContent: true,
            scriptKind: ts.ScriptKind.JS,
            content: `var hello = "hello";`
        }));
        // Now HTML file is included in the project

        // Check identifiers defined in HTML content are available in .ts file
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                file: file1.path,
                position: 1,
                line: undefined!,
                offset: undefined!,
            }
        });

        // Close HTML file
        projectService.applyChangesInOpenFiles(
            /*openFiles*/ undefined,
            /*changedFiles*/ undefined,
            /*closedFiles*/[file2.path]);

        // HTML file is still included in project

        // Check identifiers defined in HTML content are not available in .ts file
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                file: file1.path,
                position: 5,
                line: undefined!,
                offset: undefined!,
            }
        });
        baselineTsserverLogs("projects", "tsconfig script block support", session);
    });

    it("no tsconfig script block diagnostic errors", () => {

        //  #1. Ensure no diagnostic errors when allowJs is true
        const file1 = {
            path: "/a/b/f1.ts",
            content: ` `
        };
        const file2 = {
            path: "/a/b/f2.html",
            content: `var hello = "hello";`
        };
        const config1 = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ compilerOptions: { allowJs: true } })
        };

        const logger = createLoggerWithInMemoryLogs(/*host*/ undefined!); // Special

        // Specify .html extension as mixed content in a configure host request
        const extraFileExtensions = [{ extension: ".html", scriptKind: ts.ScriptKind.JS, isMixedContent: true }];
        verfiy(config1, createServerHost([file1, file2, config1, libFile], { executingFilePath: ts.combinePaths(ts.getDirectoryPath(libFile.path), "tsc.js") }));

        //  #2. Ensure no errors when allowJs is false
        const config2 = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ compilerOptions: { allowJs: false } })
        };
        verfiy(config2, createServerHost([file1, file2, config2, libFile], { executingFilePath: ts.combinePaths(ts.getDirectoryPath(libFile.path), "tsc.js") }));

        //  #3. Ensure no errors when compiler options aren't specified
        const config3 = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({})
        };

        verfiy(config3, createServerHost([file1, file2, config3, libFile], { executingFilePath: ts.combinePaths(ts.getDirectoryPath(libFile.path), "tsc.js") }));

        //  #4. Ensure no errors when files are explicitly specified in tsconfig
        const config4 = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ compilerOptions: { allowJs: true }, files: [file1.path, file2.path] })
        };

        verfiy(config4, createServerHost([file1, file2, config4, libFile], { executingFilePath: ts.combinePaths(ts.getDirectoryPath(libFile.path), "tsc.js") }));

        //  #4. Ensure no errors when files are explicitly excluded in tsconfig
        const config5 = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ compilerOptions: { allowJs: true }, exclude: [file2.path] })
        };

        const session = verfiy(config5, createServerHost([file1, file2, config5, libFile], { executingFilePath: ts.combinePaths(ts.getDirectoryPath(libFile.path), "tsc.js") }));
        baselineTsserverLogs("projects", "no tsconfig script block diagnostic errors", session);

        function verfiy(config: File, host: TestServerHost) {
            logger.host = host;
            logger.log(`currentDirectory:: ${host.getCurrentDirectory()} useCaseSensitiveFileNames: ${host.useCaseSensitiveFileNames}`);
            const session = createSession(host, { logger });
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: { extraFileExtensions }
            });
            openFilesForSession([file1], session);
            session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
                command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
                arguments: {
                    file: config.path,
                    projectFileName: config.path,
                }
            });
            return session;
        }
    });

    it("project structure update is deferred if files are not added or removed", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: `import {x} from "./f2"`
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: "export let x = 1"
        };
        const host = createServerHost([file1, file2]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file1.path);
        projectService.openClientFile(file2.path);

        projectService.applyChangesInOpenFiles(
            /*openFiles*/ undefined,
            /*changedFiles*/ts.singleIterator({ fileName: file1.path, changes: ts.singleIterator({ span: ts.createTextSpan(0, file1.path.length), newText: "let y = 1" }) }),
            /*closedFiles*/ undefined);

        projectService.ensureInferredProjectsUpToDate_TestOnly();
        baselineTsserverLogs("projects", "project structure update is deferred if files are not added or removed", projectService);
    });

    it("files with mixed content are handled correctly", () => {
        const file1 = {
            path: "/a/b/f1.html",
            content: `<html><script language="javascript">var x = 1;</></html>`
        };
        const host = createServerHost([file1]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        const projectFileName = "projectFileName";
        projectService.openExternalProject({ projectFileName, options: {}, rootFiles: [{ fileName: file1.path, scriptKind: ts.ScriptKind.JS, hasMixedContent: true }] });


        const project = projectService.externalProjects[0];

        const scriptInfo = project.getScriptInfo(file1.path)!;
        const snap = scriptInfo.getSnapshot();
        const actualText = ts.getSnapshotText(snap);
        projectService.logger.info(`Text of${file1.path}: ${actualText}`);

        projectService.openClientFile(file1.path, `var x = 1;`);
        project.updateGraph();

        const quickInfo = project.getLanguageService().getQuickInfoAtPosition(file1.path, 4)!;
        projectService.logger.info(`QuickInfo : ${quickInfo.kind}`);

        projectService.closeClientFile(file1.path);

        const scriptInfo2 = project.getScriptInfo(file1.path)!;
        const actualText2 = ts.getSnapshotText(scriptInfo2.getSnapshot());
        projectService.logger.info(`Text of${file1.path}: ${actualText2}`);
        baselineTsserverLogs("projects", "files with mixed content are handled correctly", projectService);
    });

    it("syntax tree cache handles changes in project settings", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: "{x: 1}"
        };
        const host = createServerHost([file1]);
        const projectService = createProjectService(host, { useSingleInferredProject: true, logger: createLoggerWithInMemoryLogs(host) });
        projectService.setCompilerOptionsForInferredProjects({ target: ts.ScriptTarget.ES5, allowJs: false });
        projectService.openClientFile(file1.path);
        projectService.inferredProjects[0].getLanguageService(/*ensureSynchronized*/ false).getOutliningSpans(file1.path);
        projectService.setCompilerOptionsForInferredProjects({ target: ts.ScriptTarget.ES5, allowJs: true });
        projectService.getScriptInfo(file1.path)!.editContent(0, 0, " ");
        projectService.inferredProjects[0].getLanguageService(/*ensureSynchronized*/ false).getOutliningSpans(file1.path);
        projectService.closeClientFile(file1.path);
        baselineTsserverLogs("projects", "syntax tree cache handles changes in project settings", projectService);
    });

    it("File in multiple projects at opened and closed correctly", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: "let x = 1;"
        };
        const file2 = {
            path: "/a/c/f.ts",
            content: `/// <reference path="../b/app.ts"/>`
        };
        const tsconfig1 = {
            path: "/a/c/tsconfig.json",
            content: "{}"
        };
        const tsconfig2 = {
            path: "/a/b/tsconfig.json",
            content: "{}"
        };
        const host = createServerHost([file1, file2, tsconfig1, tsconfig2]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file2.path);
        logConfiguredProjectsHasOpenRefStatus(projectService);

        projectService.openClientFile(file1.path);
        logConfiguredProjectsHasOpenRefStatus(projectService);

        projectService.closeClientFile(file2.path);
        logConfiguredProjectsHasOpenRefStatus(projectService);

        projectService.closeClientFile(file1.path);
        logConfiguredProjectsHasOpenRefStatus(projectService);

        projectService.openClientFile(file2.path);
        logConfiguredProjectsHasOpenRefStatus(projectService);
        baselineTsserverLogs("projects", "File in multiple projects at opened and closed correctly", projectService);
    });

    it("snapshot from different caches are incompatible", () => {
        const f1 = {
            path: "/a/b/app.ts",
            content: "let x = 1;"
        };
        const host = createServerHost([f1]);
        const projectFileName = "/a/b/proj.csproj";
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openExternalProjectForSession({
            projectFileName,
            rootFiles: [toExternalFile(f1.path)],
            options: {}
        }, session);
        openFilesForSession([{ file: f1, content: "let x = 1;\nlet y = 2;" }], session);
        session.executeCommandSeq<ts.server.protocol.NavBarRequest>({
            command: ts.server.protocol.CommandTypes.NavBar,
            arguments: { file: f1.path }
        });
        closeFilesForSession([f1], session);
        openFilesForSession([f1], session);
        session.executeCommandSeq<ts.server.protocol.NavBarRequest>({
            command: ts.server.protocol.CommandTypes.NavBar,
            arguments: { file: f1.path }
        });
        baselineTsserverLogs("projects", "snapshot from different caches are incompatible", session);
    });

    it("Getting errors from closed script info does not throw exception (because of getting project from orphan script info)", () => {
        const f1 = {
            path: "/a/b/app.ts",
            content: "let x = 1;"
        };
        const config = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ compilerOptions: {} })
        };
        const host = createServerHost([f1, libFile, config]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: {
                file: f1.path
            }
        } as ts.server.protocol.OpenRequest);
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.Close,
            arguments: {
                file: f1.path
            }
        } as ts.server.protocol.CloseRequest);
        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.Geterr,
            arguments: {
                delay: 0,
                files: [f1.path]
            }
        } as ts.server.protocol.GeterrRequest);
        baselineTsserverLogs("projects", "getting errors from closed script info does not throw exception because of getting project from orphan script info", session);
    });

    it("Properly handle Windows-style outDir", () => {
        const configFile: File = {
            path: "C:\\a\\tsconfig.json",
            content: JSON.stringify({
                compilerOptions: {
                    outDir: `C:\\a\\b`
                },
                include: ["*.ts"]
            })
        };
        const file1: File = {
            path: "C:\\a\\f1.ts",
            content: "let x = 1;"
        };

        const host = createServerHost([file1, configFile], { windowsStyleRoot: "c:/" });
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file1.path);
        baselineTsserverLogs("projects", "Properly handle Windows-style outDir", projectService);
    });

    it("files opened and closed affecting multiple projects", () => {
        const file: File = {
            path: "/a/b/projects/config/file.ts",
            content: `import {a} from "../files/file1"; export let b = a;`
        };
        const config: File = {
            path: "/a/b/projects/config/tsconfig.json",
            content: ""
        };
        const filesFile1: File = {
            path: "/a/b/projects/files/file1.ts",
            content: "export let a = 10;"
        };
        const filesFile2: File = {
            path: "/a/b/projects/files/file2.ts",
            content: "export let aa = 10;"
        };

        const files = [config, file, filesFile1, filesFile2, libFile];
        const host = createServerHost(files);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        // Create configured project
        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: {
                file: file.path
            }
        });

        // open files/file1 = should not create another project
        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: {
                file: filesFile1.path
            }
        });

        // Close the file = should still have project
        session.executeCommandSeq<ts.server.protocol.CloseRequest>({
            command: ts.server.protocol.CommandTypes.Close,
            arguments: {
                file: file.path
            }
        });

        // Open files/file2 - should create inferred project and close configured project
        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: {
                file: filesFile2.path
            }
        });

        // Actions on file1 would result in assert
        session.executeCommandSeq<ts.server.protocol.DocumentHighlightsRequest>({
            command: ts.server.protocol.CommandTypes.DocumentHighlights,
            arguments: {
                file: filesFile1.path,
                line: 1,
                offset: filesFile1.content.indexOf("a"),
                filesToSearch: [filesFile1.path],
            }
        });

        baselineTsserverLogs("projects", "files opened and closed affecting multiple projects", session);
    });

    it("requests are done on file on pendingReload but has svc for previous version", () => {
        const file1: File = {
            path: `/user/username/projects/myproject/src/file1.ts`,
            content: `import { y } from "./file2"; let x = 10;`
        };
        const file2: File = {
            path: `/user/username/projects/myproject/src/file2.ts`,
            content: "export let y = 10;"
        };
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}"
        };
        const files = [file1, file2, libFile, config];
        const host = createServerHost(files);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: file2.path, fileContent: file2.content }
        });
        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: file1.path }
        });
        session.executeCommandSeq<ts.server.protocol.CloseRequest>({
            command: ts.server.protocol.CommandTypes.Close,
            arguments: { file: file2.path }
        });

        file2.content += "export let z = 10;";
        host.writeFile(file2.path, file2.content);
        // Do not let the timeout runs, before executing command
        const startOffset = file2.content.indexOf("y") + 1;
        session.executeCommandSeq<ts.server.protocol.GetApplicableRefactorsRequest>({
            command: ts.server.protocol.CommandTypes.GetApplicableRefactors,
            arguments: { file: file2.path, startLine: 1, startOffset, endLine: 1, endOffset: startOffset + 1 }
        });
        baselineTsserverLogs("projects", "requests are done on file on pendingReload but has svc for previous version", session);
    });

    describe("includes deferred files in the project context", () => {
        function verifyDeferredContext(lazyConfiguredProjectsFromExternalProject: boolean) {
            const file1 = {
                path: "/a.deferred",
                content: "const a = 1;"
            };
            // Deferred extensions should not affect JS files.
            const file2 = {
                path: "/b.js",
                content: "const b = 1;"
            };
            const tsconfig = {
                path: "/tsconfig.json",
                content: ""
            };

            const host = createServerHost([file1, file2, tsconfig]);
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            const projectService = session.getProjectService();
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: { preferences: { lazyConfiguredProjectsFromExternalProject } }
            });

            // Configure the deferred extension.
            const extraFileExtensions = [{ extension: ".deferred", scriptKind: ts.ScriptKind.Deferred, isMixedContent: true }];
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: { extraFileExtensions }
            });

            // Open external project
            const projectName = "/proj1";
            openExternalProjectForSession({
                projectFileName: projectName,
                rootFiles: toExternalFiles([file1.path, file2.path, tsconfig.path]),
                options: {}
            }, session);

            if (lazyConfiguredProjectsFromExternalProject) {
                // configured project is just created and not yet loaded
                session.logger.info("Calling ensureInferredProjectsUpToDate_TestOnly");
                projectService.ensureInferredProjectsUpToDate_TestOnly();
            }

            // Allow allowNonTsExtensions will be set to true for deferred extensions.
            session.logger.info(`Has allowNonTsExtension: ${session.getProjectService().configuredProjects.get(tsconfig.path)!.getCompilerOptions().allowNonTsExtensions}`);

            baselineTsserverLogs("projects", `deferred files in the project context${lazyConfiguredProjectsFromExternalProject ? " with lazyConfiguredProjectsFromExternalProject" : ""}`, session);
        }

        it("when lazyConfiguredProjectsFromExternalProject not set", () => {
            verifyDeferredContext(/*lazyConfiguredProjectsFromExternalProject*/ false);
        });
        it("when lazyConfiguredProjectsFromExternalProject is set", () => {
            verifyDeferredContext(/*lazyConfiguredProjectsFromExternalProject*/ true);
        });
    });

    it("Orphan source files are handled correctly on watch trigger", () => {
        const file1: File = {
            path: `/user/username/projects/myproject/src/file1.ts`,
            content: `export let x = 10;`
        };
        const file2: File = {
            path: `/user/username/projects/myproject/src/file2.ts`,
            content: "export let y = 10;"
        };
        const configContent1 = JSON.stringify({
            files: ["src/file1.ts", "src/file2.ts"]
        });
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: configContent1
        };
        const files = [file1, file2, libFile, config];
        const host = createServerHost(files);
        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        service.openClientFile(file1.path);

        const configContent2 = JSON.stringify({
            files: ["src/file1.ts"]
        });
        config.content = configContent2;
        host.writeFile(config.path, config.content);
        host.runQueuedTimeoutCallbacks();

        verifyFile2InfoIsOrphan();

        file2.content += "export let z = 10;";
        host.writeFile(file2.path, file2.content);
        host.runQueuedTimeoutCallbacks();

        verifyFile2InfoIsOrphan();
        baselineTsserverLogs("projects", "Orphan source files are handled correctly on watch trigger", service);

        function verifyFile2InfoIsOrphan() {
            const info = ts.Debug.checkDefined(service.getScriptInfoForPath(file2.path as ts.Path));
            service.logger.log(`Containing projects for ${file2.path}:: ${info.containingProjects.map(p => p.projectName).join(",")}`);
        }
    });

    it("no project structure update on directory watch invoke on open file save", () => {
        const projectRootPath = "/users/username/projects/project";
        const file1: File = {
            path: `${projectRootPath}/a.ts`,
            content: "export const a = 10;"
        };
        const config: File = {
            path: `${projectRootPath}/tsconfig.json`,
            content: "{}"
        };
        const files = [file1, config];
        const host = createServerHost(files);
        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        service.openClientFile(file1.path);

        host.modifyFile(file1.path, file1.content, { invokeFileDeleteCreateAsPartInsteadOfChange: true });
        service.testhost.logTimeoutQueueLength();
        baselineTsserverLogs("projects", "no project structure update on directory watch invoke on open file save", service);
    });

    it("synchronizeProjectList provides redirect info when requested", () => {
        const projectRootPath = "/users/username/projects/project";
        const fileA: File = {
            path: `${projectRootPath}/A/a.ts`,
            content: "export const foo: string = 5;"
        };
        const configA: File = {
            path: `${projectRootPath}/A/tsconfig.json`,
            content: `{
  "compilerOptions": {
    "composite": true,
    "declaration": true
  }
}`
        };
        const fileB: File = {
            path: `${projectRootPath}/B/b.ts`,
            content: "import { foo } from \"../A/a\"; console.log(foo);"
        };
        const configB: File = {
            path: `${projectRootPath}/B/tsconfig.json`,
            content: `{
  "compilerOptions": {
    "composite": true,
    "declaration": true
  },
  "references": [
    { "path": "../A" }
  ]
}`
        };
        const files = [fileA, fileB, configA, configB, libFile];
        const host = createServerHost(files);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([fileA, fileB], session);
        session.executeCommandSeq<ts.server.protocol.SynchronizeProjectListRequest>({
            command: ts.server.protocol.CommandTypes.SynchronizeProjectList,
            arguments: { knownProjects: [], includeProjectReferenceRedirectInfo: true }
        });
        baselineTsserverLogs("projects", "synchronizeProjectList provides redirect info when requested", session);
    });

    it("synchronizeProjectList provides updates to redirect info when requested", () => {
        const projectRootPath = "/users/username/projects/project";
        const fileA: File = {
            path: `${projectRootPath}/A/a.ts`,
            content: "export const foo: string = 5;"
        };
        const configA: File = {
            path: `${projectRootPath}/A/tsconfig.json`,
            content: `{
  "compilerOptions": {
    "composite": true,
    "declaration": true
  }
}`
        };
        const fileB: File = {
            path: `${projectRootPath}/B/b.ts`,
            content: "import { foo } from \"../B/b2\"; console.log(foo);"
        };
        const fileB2: File = {
            path: `${projectRootPath}/B/b2.ts`,
            content: "export const foo: string = 5;"
        };
        const configB: File = {
            path: `${projectRootPath}/B/tsconfig.json`,
            content: `{
  "compilerOptions": {
    "composite": true,
    "declaration": true
  },
  "references": [
    { "path": "../A" }
  ]
}`
        };
        const files = [fileA, fileB, fileB2, configA, configB, libFile];
        const host = createServerHost(files);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([fileA, fileB], session);
        session.executeCommandSeq<ts.server.protocol.SynchronizeProjectListRequest>({
            command: ts.server.protocol.CommandTypes.SynchronizeProjectList,
            arguments: { knownProjects: [], includeProjectReferenceRedirectInfo: true }
        });
        const knownProjects = session.getProjectService().synchronizeProjectList([], /*includeProjectReferenceRedirectInfo*/ true);

        host.modifyFile(configA.path, `{
  "compilerOptions": {
    "composite": true,
    "declaration": true
  },
  "include": [
      "**/*",
      "../B/b2.ts"
  ]
}`);

        session.executeCommandSeq<ts.server.protocol.SynchronizeProjectListRequest>({
            command: ts.server.protocol.CommandTypes.SynchronizeProjectList,
            arguments: { knownProjects: knownProjects.map(proj => proj.info!), includeProjectReferenceRedirectInfo: true }
        });
        baselineTsserverLogs("projects", "synchronizeProjectList provides updates to redirect info when requested", session);
    });

    it("synchronizeProjectList returns correct information when base configuration file cannot be resolved", () => {
        const file: File = {
            path: `/user/username/projects/myproject/index.ts`,
            content: "export const foo = 5;"
        };
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: JSON.stringify({ extends: "./tsconfig_base.json" })
        };
        const host = createServerHost([file, config, libFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file], session);
        session.executeCommandSeq<ts.server.protocol.SynchronizeProjectListRequest>({
            command: ts.server.protocol.CommandTypes.SynchronizeProjectList,
            arguments: { knownProjects: [], includeProjectReferenceRedirectInfo: false }
        });
        baselineTsserverLogs("projects", "synchronizeProjectList returns correct information when base configuration file cannot be resolved", session);
    });

    it("synchronizeProjectList returns correct information when base configuration file cannot be resolved and redirect info is requested", () => {
        const file: File = {
            path: `/user/username/projects/myproject/index.ts`,
            content: "export const foo = 5;"
        };
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: JSON.stringify({ extends: "./tsconfig_base.json" })
        };
        const host = createServerHost([file, config, libFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file], session);
        session.executeCommandSeq<ts.server.protocol.SynchronizeProjectListRequest>({
            command: ts.server.protocol.CommandTypes.SynchronizeProjectList,
            arguments: { knownProjects: [], includeProjectReferenceRedirectInfo: true }
        });
        baselineTsserverLogs("projects", "synchronizeProjectList returns correct information when base configuration file cannot be resolved and redirect info is requested", session);
    });

    it("handles delayed directory watch invoke on file creation", () => {
        const projectRootPath = "/users/username/projects/project";
        const fileB: File = {
            path: `${projectRootPath}/b.ts`,
            content: "export const b = 10;"
        };
        const fileA: File = {
            path: `${projectRootPath}/a.ts`,
            content: "export const a = 10;"
        };
        const fileSubA: File = {
            path: `${projectRootPath}/sub/a.ts`,
            content: fileA.content
        };
        const config: File = {
            path: `${projectRootPath}/tsconfig.json`,
            content: "{}"
        };
        const files = [fileSubA, fileB, config, libFile];
        const host = createServerHost(files);
        const session = createSession(host, { canUseEvents: true, noGetErrOnBackgroundUpdate: true, logger: createLoggerWithInMemoryLogs(host) });
        openFile(fileB);
        openFile(fileSubA);

        host.runQueuedTimeoutCallbacks();

        // This should schedule 2 timeouts for ensuring project structure and ensuring projects for open file
        host.deleteFile(fileSubA.path);
        host.deleteFolder(ts.getDirectoryPath(fileSubA.path));
        host.writeFile(fileA.path, fileA.content);
        session.testhost.logTimeoutQueueLength();

        closeFilesForSession([fileSubA], session);
        // This should cancel existing updates and schedule new ones
        session.testhost.logTimeoutQueueLength();

        // Open the fileA (as if rename)
        // config project is updated to check if fileA is present in it
        openFile(fileA);

        // Run the timeout for updating configured project and ensuring projects for open file
        host.runQueuedTimeoutCallbacks();

        // file is deleted but watches are not yet invoked
        const originalFileExists = host.fileExists;
        host.fileExists = s => s === fileA.path ? false : originalFileExists.call(host, s);
        closeFilesForSession([fileA], session);
        session.testhost.logTimeoutQueueLength(); // Update configured project and projects for open file

        // This should create inferred project since fileSubA not on the disk
        openFile(fileSubA);

        host.runQueuedTimeoutCallbacks(); // Update configured project and projects for open file
        host.fileExists = originalFileExists;

        // Actually trigger the file move
        host.deleteFile(fileA.path);
        host.ensureFileOrFolder(fileSubA);
        session.testhost.logTimeoutQueueLength();

        verifyGetErrRequest({ session, files: [fileB, fileSubA], existingTimeouts: true });
        baselineTsserverLogs("projects", "handles delayed directory watch invoke on file creation", session);

        function openFile(file: File) {
            openFilesForSession([{ file, projectRootPath }], session);
        }
    });

    it("assert when removing project", () => {
        const host = createServerHost([commonFile1, commonFile2, libFile]);
        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        service.openClientFile(commonFile1.path);
        const project = service.inferredProjects[0];
        // Intentionally create scriptinfo and attach it to project
        const info = service.getOrCreateScriptInfoForNormalizedPath(commonFile2.path as ts.server.NormalizedPath, /*openedByClient*/ false)!;
        info.attachToProject(project);
        try {
            service.applyChangesInOpenFiles(/*openFiles*/ undefined, /*changedFiles*/ undefined, [commonFile1.path]);
        }
        catch (e) {
            assert.isTrue(e.message.indexOf("Debug Failure. False expression: Found script Info still attached to project") === 0);
        }
        baselineTsserverLogs("projects", "assert when removing project", service);
    });
    it("does not look beyond node_modules folders for default configured projects", () => {
        const rootFilePath = ts.server.asNormalizedPath("/project/index.ts");
        const rootProjectPath = ts.server.asNormalizedPath("/project/tsconfig.json");
        const nodeModulesFilePath1 = ts.server.asNormalizedPath("/project/node_modules/@types/a/index.d.ts");
        const nodeModulesProjectPath1 = ts.server.asNormalizedPath("/project/node_modules/@types/a/tsconfig.json");
        const nodeModulesFilePath2 = ts.server.asNormalizedPath("/project/node_modules/@types/b/index.d.ts");
        const serverHost = createServerHost([
            { path: rootFilePath, content: "import 'a'; import 'b';" },
            { path: rootProjectPath, content: "{}" },
            { path: nodeModulesFilePath1, content: "{}" },
            { path: nodeModulesProjectPath1, content: "{}" },
            { path: nodeModulesFilePath2, content: "{}" },
        ]);
        const projectService = createProjectService(serverHost, { useSingleInferredProject: true, logger: createLoggerWithInMemoryLogs(serverHost) });

        const openRootFileResult = projectService.openClientFile(rootFilePath);
        assert.strictEqual(openRootFileResult.configFileName?.toString(), rootProjectPath);

        const openNodeModulesFileResult1 = projectService.openClientFile(nodeModulesFilePath1);
        assert.strictEqual(openNodeModulesFileResult1.configFileName?.toString(), nodeModulesProjectPath1);

        const openNodeModulesFileResult2 = projectService.openClientFile(nodeModulesFilePath2);
        assert.isUndefined(openNodeModulesFileResult2.configFileName);

        baselineTsserverLogs("projects", "does not look beyond node_modules folders for default configured projects", projectService);
    });

    describe("file opened is in configured project that will be removed", () => {
        function runOnTs<T extends ts.server.protocol.Request>(scenario: string, getRequest: (innerFile: File) => TestSessionRequest<T>) {
            it(scenario, () => {
                const testsConfig: File = {
                    path: `/user/username/projects/myproject/playground/tsconfig.json`,
                    content: "{}"
                };
                const testsFile: File = {
                    path: `/user/username/projects/myproject/playground/tests.ts`,
                    content: `export function foo() {}`
                };
                const innerFile: File = {
                    path: `/user/username/projects/myproject/playground/tsconfig-json/tests/spec.ts`,
                    content: `export function bar() { }`
                };
                const innerConfig: File = {
                    path: `/user/username/projects/myproject/playground/tsconfig-json/tsconfig.json`,
                    content: JSON.stringify({
                        include: ["./src"]
                    })
                };
                const innerSrcFile: File = {
                    path: `/user/username/projects/myproject/playground/tsconfig-json/src/src.ts`,
                    content: `export function foobar() { }`
                };
                const host = createServerHost([testsConfig, testsFile, innerFile, innerConfig, innerSrcFile, libFile]);
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
                openFilesForSession([testsFile], session);
                closeFilesForSession([testsFile], session);
                openFilesForSession([innerFile], session);
                session.executeCommandSeq(getRequest(innerFile));
                baselineTsserverLogs("projects", scenario, session);
            });
        }
        runOnTs<ts.server.protocol.OutliningSpansRequest>(
            "file opened is in configured project that will be removed",
            innerFile => ({
                command: ts.server.protocol.CommandTypes.GetOutliningSpans,
                arguments: { file: innerFile.path }
            })
        );

        runOnTs<ts.server.protocol.ReferencesRequest>(
            "references on file opened is in configured project that will be removed",
            innerFile => ({
                command: ts.server.protocol.CommandTypes.References,
                arguments: protocolFileLocationFromSubstring(innerFile, "bar")
            })
        );

        it("js file opened is in configured project that will be removed", () => {
            const rootConfig: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { allowJs: true } })
            };
            const mocksFile: File = {
                path: `/user/username/projects/myproject/mocks/cssMock.js`,
                content: `function foo() { }`
            };
            const innerFile: File = {
                path: `/user/username/projects/myproject/apps/editor/scripts/createConfigVariable.js`,
                content: `function bar() { }`
            };
            const innerConfig: File = {
                path: `/user/username/projects/myproject/apps/editor/tsconfig.json`,
                content: JSON.stringify({
                    extends: "../../tsconfig.json",
                    include: ["./src"],
                })
            };
            const innerSrcFile: File = {
                path: `/user/username/projects/myproject/apps/editor/src/src.js`,
                content: `function fooBar() { }`
            };
            const host = createServerHost([rootConfig, mocksFile, innerFile, innerConfig, innerSrcFile, libFile]);
            const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
            openFilesForSession([mocksFile], session);
            closeFilesForSession([mocksFile], session);
            openFilesForSession([innerFile], session);
            baselineTsserverLogs("projects", "js file opened is in configured project that will be removed", session);
        });
    });
});
