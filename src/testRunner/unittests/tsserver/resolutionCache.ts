namespace ts.projectSystem {
    function createHostModuleResolutionTrace(host: TestServerHost & ModuleResolutionHost) {
        const resolutionTrace: string[] = [];
        host.trace = resolutionTrace.push.bind(resolutionTrace);
        return resolutionTrace;
    }

    describe("unittests:: tsserver:: resolutionCache:: tsserverProjectSystem extra resolution pass in server host", () => {
        it("can load typings that are proper modules", () => {
            const file1 = {
                path: "/a/b/app.js",
                content: `var x = require("lib")`
            };
            const lib = {
                path: "/a/cache/node_modules/@types/lib/index.d.ts",
                content: "export let x = 1"
            };
            const host: TestServerHost & ModuleResolutionHost = createServerHost([file1, lib]);
            const resolutionTrace = createHostModuleResolutionTrace(host);
            const projectService = createProjectService(host, { typingsInstaller: new TestTypingsInstaller("/a/cache", /*throttleLimit*/5, host) });

            projectService.setCompilerOptionsForInferredProjects({ traceResolution: true, allowJs: true });
            projectService.openClientFile(file1.path);
            projectService.checkNumberOfProjects({ inferredProjects: 1 });
            const proj = projectService.inferredProjects[0];

            assert.deepEqual(resolutionTrace, [
                "======== Resolving module 'lib' from '/a/b/app.js'. ========",
                "Module resolution kind is not specified, using 'NodeJs'.",
                "Loading module 'lib' from 'node_modules' folder, target file type 'TypeScript'.",
                "Directory '/a/b/node_modules' does not exist, skipping all lookups in it.",
                "Directory '/a/node_modules' does not exist, skipping all lookups in it.",
                "Directory '/node_modules' does not exist, skipping all lookups in it.",
                "Loading module 'lib' from 'node_modules' folder, target file type 'JavaScript'.",
                "Directory '/a/b/node_modules' does not exist, skipping all lookups in it.",
                "Directory '/a/node_modules' does not exist, skipping all lookups in it.",
                "Directory '/node_modules' does not exist, skipping all lookups in it.",
                "======== Module name 'lib' was not resolved. ========",
                `Auto discovery for typings is enabled in project '${proj.getProjectName()}'. Running extra resolution pass for module 'lib' using cache location '/a/cache'.`,
                "File '/a/cache/node_modules/lib.d.ts' does not exist.",
                "File '/a/cache/node_modules/@types/lib/package.json' does not exist.",
                "File '/a/cache/node_modules/@types/lib.d.ts' does not exist.",
                "File '/a/cache/node_modules/@types/lib/index.d.ts' exist - use it as a name resolution result.",
            ]);
            checkProjectActualFiles(proj, [file1.path, lib.path]);
        });
    });

    describe("unittests:: tsserver:: resolutionCache:: tsserverProjectSystem watching @types", () => {
        it("works correctly when typings are added or removed", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const t1 = {
                path: "/a/b/node_modules/@types/lib1/index.d.ts",
                content: "export let a: number"
            };
            const t2 = {
                path: "/a/b/node_modules/@types/lib2/index.d.ts",
                content: "export let b: number"
            };
            const tsconfig = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {},
                    exclude: ["node_modules"]
                })
            };
            const host = createServerHost([f1, t1, tsconfig]);
            const projectService = createProjectService(host);

            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, t1.path, tsconfig.path]);

            // delete t1
            host.deleteFile(t1.path);
            // run throttled operation
            host.runQueuedTimeoutCallbacks();

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, tsconfig.path]);

            // create t2
            host.writeFile(t2.path, t2.content);
            // run throttled operation
            host.runQueuedTimeoutCallbacks();

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, t2.path, tsconfig.path]);
        });
    });

    describe("unittests:: tsserver:: resolutionCache:: tsserverProjectSystem add the missing module file for inferred project", () => {
        it("should remove the `module not found` error", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "import * as T from './moduleFile'; T.bar();"
            };
            const host = createServerHost([file1]);
            const session = createSession(host);
            openFilesForSession([file1], session);
            const getErrRequest = makeSessionRequest<server.protocol.SemanticDiagnosticsSyncRequestArgs>(
                server.CommandNames.SemanticDiagnosticsSync,
                { file: file1.path }
            );
            let diags = session.executeCommand(getErrRequest).response as server.protocol.Diagnostic[];
            verifyDiagnostics(diags, [
                { diagnosticMessage: Diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations, errorTextArguments: ["./moduleFile"] }
            ]);

            host.writeFile(moduleFile.path, moduleFile.content);
            host.runQueuedTimeoutCallbacks();

            // Make a change to trigger the program rebuild
            const changeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(
                server.CommandNames.Change,
                { file: file1.path, line: 1, offset: 44, endLine: 1, endOffset: 44, insertString: "\n" }
            );
            session.executeCommand(changeRequest);

            // Recheck
            diags = session.executeCommand(getErrRequest).response as server.protocol.Diagnostic[];
            verifyNoDiagnostics(diags);
        });

        it("npm install @types works", () => {
            const folderPath = "/a/b/projects/temp";
            const file1: File = {
                path: `${folderPath}/a.ts`,
                content: 'import f = require("pad"); f;'
            };
            const host = createServerHost([file1, libFile]);
            const session = createSession(host, { canUseEvents: true });
            const service = session.getProjectService();
            session.executeCommandSeq<protocol.OpenRequest>({
                command: server.CommandNames.Open,
                arguments: {
                    file: file1.path,
                    fileContent: file1.content,
                    scriptKindName: "TS",
                    projectRootPath: folderPath
                }
            });
            checkNumberOfProjects(service, { inferredProjects: 1 });

            const startOffset = file1.content.indexOf('"') + 1;
            verifyGetErrRequest({
                session,
                host,
                expected: [{
                    file: file1,
                    syntax: [],
                    semantic: [
                        createDiagnostic({ line: 1, offset: startOffset }, { line: 1, offset: startOffset + '"pad"'.length }, Diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations, ["pad"])
                    ],
                    suggestion: []
                }]
            });

            const padIndex: File = {
                path: `${folderPath}/node_modules/@types/pad/index.d.ts`,
                content: "export = pad;declare function pad(length: number, text: string, char ?: string): string;"
            };
            host.ensureFileOrFolder(padIndex, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ true);
            host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
            host.runQueuedTimeoutCallbacks(); // Actual update
            checkProjectUpdatedInBackgroundEvent(session, [file1.path]);
            session.clearMessages();

            host.runQueuedTimeoutCallbacks();
            checkErrorMessage(session, "syntaxDiag", { file: file1.path, diagnostics: [] });
            session.clearMessages();

            host.runQueuedImmediateCallbacks();
            checkErrorMessage(session, "semanticDiag", { file: file1.path, diagnostics: [] });
        });

        it("suggestion diagnostics", () => {
            const file: File = {
                path: "/a.js",
                content: "function f(p) {}",
            };

            const host = createServerHost([file]);
            const session = createSession(host, { canUseEvents: true });
            const service = session.getProjectService();

            session.executeCommandSeq<protocol.OpenRequest>({
                command: server.CommandNames.Open,
                arguments: { file: file.path, fileContent: file.content },
            });

            checkNumberOfProjects(service, { inferredProjects: 1 });
            session.clearMessages();
            host.checkTimeoutQueueLengthAndRun(2);

            checkProjectUpdatedInBackgroundEvent(session, [file.path]);

            verifyGetErrRequest({
                session,
                host,
                expected: [{
                    file,
                    syntax: [],
                    semantic: [],
                    suggestion: [
                        createDiagnostic({ line: 1, offset: 12 }, { line: 1, offset: 13 }, Diagnostics._0_is_declared_but_its_value_is_never_read, ["p"], "suggestion", /*reportsUnnecessary*/ true),
                    ]
                }]
            });
        });

        it("disable suggestion diagnostics", () => {
            const file: File = {
                path: "/a.js",
                content: 'require("b")',
            };

            const host = createServerHost([file]);
            const session = createSession(host, { canUseEvents: true });
            const service = session.getProjectService();

            session.executeCommandSeq<protocol.OpenRequest>({
                command: server.CommandNames.Open,
                arguments: { file: file.path, fileContent: file.content },
            });

            session.executeCommandSeq<protocol.ConfigureRequest>({
                command: server.CommandNames.Configure,
                arguments: {
                    preferences: { disableSuggestions: true }
                },
            });

            checkNumberOfProjects(service, { inferredProjects: 1 });
            session.clearMessages();
            host.checkTimeoutQueueLengthAndRun(2);

            checkProjectUpdatedInBackgroundEvent(session, [file.path]);

            verifyGetErrRequest({
                session,
                host,
                expected: [{
                    file,
                    syntax: [],
                    semantic: []
                }]
            });
        });

        it("suppressed diagnostic events", () => {
            const file: File = {
                path: "/a.ts",
                content: "1 = 2;",
            };

            const host = createServerHost([file]);
            const session = createSession(host, { canUseEvents: true, suppressDiagnosticEvents: true });
            const service = session.getProjectService();

            session.executeCommandSeq<protocol.OpenRequest>({
                command: server.CommandNames.Open,
                arguments: { file: file.path, fileContent: file.content },
            });

            checkNumberOfProjects(service, { inferredProjects: 1 });

            host.checkTimeoutQueueLength(0);
            checkNoDiagnosticEvents(session);

            session.clearMessages();

            let expectedSequenceId = session.getNextSeq();

            session.executeCommandSeq<protocol.GeterrRequest>({
                command: server.CommandNames.Geterr,
                arguments: {
                    delay: 0,
                    files: [file.path],
                }
            });

            host.checkTimeoutQueueLength(0);
            checkNoDiagnosticEvents(session);

            checkCompleteEvent(session, 1, expectedSequenceId);

            session.clearMessages();

            expectedSequenceId = session.getNextSeq();

            session.executeCommandSeq<protocol.GeterrForProjectRequest>({
                command: server.CommandNames.Geterr,
                arguments: {
                    delay: 0,
                    file: file.path,
                }
            });

            host.checkTimeoutQueueLength(0);
            checkNoDiagnosticEvents(session);

            checkCompleteEvent(session, 1, expectedSequenceId);

            session.clearMessages();
        });
    });

    describe("unittests:: tsserver:: resolutionCache:: tsserverProjectSystem rename a module file and rename back", () => {
        it("should restore the states for inferred projects", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "import * as T from './moduleFile'; T.bar();"
            };
            const host = createServerHost([moduleFile, file1]);
            const session = createSession(host);

            openFilesForSession([file1], session);
            const getErrRequest = makeSessionRequest<server.protocol.SemanticDiagnosticsSyncRequestArgs>(
                server.CommandNames.SemanticDiagnosticsSync,
                { file: file1.path }
            );
            let diags = session.executeCommand(getErrRequest).response as server.protocol.Diagnostic[];
            verifyNoDiagnostics(diags);

            const moduleFileNewPath = "/a/b/moduleFile1.ts";
            host.renameFile(moduleFile.path, moduleFileNewPath);
            host.runQueuedTimeoutCallbacks();
            diags = session.executeCommand(getErrRequest).response as server.protocol.Diagnostic[];
            verifyDiagnostics(diags, [
                { diagnosticMessage: Diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations, errorTextArguments: ["./moduleFile"] }
            ]);
            assert.equal(diags.length, 1);

            host.renameFile(moduleFileNewPath, moduleFile.path);
            host.runQueuedTimeoutCallbacks();

            // Make a change to trigger the program rebuild
            const changeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(
                server.CommandNames.Change,
                { file: file1.path, line: 1, offset: 44, endLine: 1, endOffset: 44, insertString: "\n" }
            );
            session.executeCommand(changeRequest);
            host.runQueuedTimeoutCallbacks();

            diags = session.executeCommand(getErrRequest).response as server.protocol.Diagnostic[];
            verifyNoDiagnostics(diags);
        });

        it("should restore the states for configured projects", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "import * as T from './moduleFile'; T.bar();"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createServerHost([moduleFile, file1, configFile]);
            const session = createSession(host);

            openFilesForSession([file1], session);
            const getErrRequest = makeSessionRequest<server.protocol.SemanticDiagnosticsSyncRequestArgs>(
                server.CommandNames.SemanticDiagnosticsSync,
                { file: file1.path }
            );
            let diags = session.executeCommand(getErrRequest).response as server.protocol.Diagnostic[];
            verifyNoDiagnostics(diags);

            const moduleFileNewPath = "/a/b/moduleFile1.ts";
            host.renameFile(moduleFile.path, moduleFileNewPath);
            host.runQueuedTimeoutCallbacks();
            diags = session.executeCommand(getErrRequest).response as server.protocol.Diagnostic[];
            verifyDiagnostics(diags, [
                { diagnosticMessage: Diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations, errorTextArguments: ["./moduleFile"] }
            ]);

            host.renameFile(moduleFileNewPath, moduleFile.path);
            host.runQueuedTimeoutCallbacks();
            diags = session.executeCommand(getErrRequest).response as server.protocol.Diagnostic[];
            verifyNoDiagnostics(diags);
        });

        it("should property handle missing config files", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            const projectName = "project1";
            const host = createServerHost([f1]);
            const projectService = createProjectService(host);
            projectService.openExternalProject({ rootFiles: toExternalFiles([f1.path, config.path]), options: {}, projectFileName: projectName });

            // should have one external project since config file is missing
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            host.writeFile(config.path, config.content);
            projectService.openExternalProject({ rootFiles: toExternalFiles([f1.path, config.path]), options: {}, projectFileName: projectName });
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
        });

        it("types should load from config file path if config exists", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { types: ["node"], typeRoots: [] } })
            };
            const node = {
                path: "/a/b/node_modules/@types/node/index.d.ts",
                content: "declare var process: any"
            };
            const cwd = {
                path: "/a/c"
            };
            const host = createServerHost([f1, config, node, cwd], { currentDirectory: cwd.path });
            const projectService = createProjectService(host);
            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, node.path, config.path]);
        });
    });

    describe("unittests:: tsserver:: resolutionCache:: tsserverProjectSystem module resolution caching", () => {
        const configFile: File = {
            path: `${tscWatch.projectRoot}/tsconfig.json`,
            content: JSON.stringify({ compilerOptions: { traceResolution: true } })
        };

        function getModules(module1Path: string, module2Path: string) {
            const module1: File = {
                path: module1Path,
                content: `export function module1() {}`
            };
            const module2: File = {
                path: module2Path,
                content: `export function module2() {}`
            };
            return { module1, module2 };
        }

        function verifyTrace(resolutionTrace: string[], expected: string[]) {
            assert.deepEqual(resolutionTrace, expected);
            resolutionTrace.length = 0;
        }

        function getExpectedFileDoesNotExistResolutionTrace(host: TestServerHost, expectedTrace: string[], foundModule: boolean, module: File, directory: string, file: string, ignoreIfParentMissing?: boolean) {
            if (!foundModule) {
                const path = combinePaths(directory, file);
                if (!ignoreIfParentMissing || host.directoryExists(getDirectoryPath(path))) {
                    if (module.path === path) {
                        foundModule = true;
                    }
                    else {
                        expectedTrace.push(`File '${path}' does not exist.`);
                    }
                }
            }
            return foundModule;
        }

        function getExpectedMissedLocationResolutionTrace(host: TestServerHost, expectedTrace: string[], dirPath: string, module: File, moduleName: string, useNodeModules: boolean, cacheLocation?: string) {
            let foundModule = false;
            forEachAncestorDirectory(dirPath, dirPath => {
                if (dirPath === cacheLocation) {
                    return foundModule;
                }

                const directory = useNodeModules ? combinePaths(dirPath, nodeModules) : dirPath;
                if (useNodeModules && !foundModule && !host.directoryExists(directory)) {
                    expectedTrace.push(`Directory '${directory}' does not exist, skipping all lookups in it.`);
                    return undefined;
                }
                foundModule = getExpectedFileDoesNotExistResolutionTrace(host, expectedTrace, foundModule, module, directory, `${moduleName}/package.json`, /*ignoreIfParentMissing*/ true);
                foundModule = getExpectedFileDoesNotExistResolutionTrace(host, expectedTrace, foundModule, module, directory, `${moduleName}.ts`);
                foundModule = getExpectedFileDoesNotExistResolutionTrace(host, expectedTrace, foundModule, module, directory, `${moduleName}.tsx`);
                foundModule = getExpectedFileDoesNotExistResolutionTrace(host, expectedTrace, foundModule, module, directory, `${moduleName}.d.ts`);
                foundModule = getExpectedFileDoesNotExistResolutionTrace(host, expectedTrace, foundModule, module, directory, `${moduleName}/index.ts`, /*ignoreIfParentMissing*/ true);
                if (useNodeModules && !foundModule) {
                    expectedTrace.push(`Directory '${directory}/@types' does not exist, skipping all lookups in it.`);
                }
                return foundModule ? true : undefined;
            });
        }

        function getExpectedResolutionTraceHeader(expectedTrace: string[], file: File, moduleName: string) {
            expectedTrace.push(
                `======== Resolving module '${moduleName}' from '${file.path}'. ========`,
                `Module resolution kind is not specified, using 'NodeJs'.`
            );
        }

        function getExpectedResolutionTraceFooter(expectedTrace: string[], module: File, moduleName: string, addRealPathTrace: boolean, ignoreModuleFileFound?: boolean) {
            if (!ignoreModuleFileFound) {
                expectedTrace.push(`File '${module.path}' exist - use it as a name resolution result.`);
            }
            if (addRealPathTrace) {
                expectedTrace.push(`Resolving real path for '${module.path}', result '${module.path}'.`);
            }
            expectedTrace.push(`======== Module name '${moduleName}' was successfully resolved to '${module.path}'. ========`);
        }

        function getExpectedRelativeModuleResolutionTrace(host: TestServerHost, file: File, module: File, moduleName: string, expectedTrace: string[] = []) {
            getExpectedResolutionTraceHeader(expectedTrace, file, moduleName);
            expectedTrace.push(`Loading module as file / folder, candidate module location '${removeFileExtension(module.path)}', target file type 'TypeScript'.`);
            getExpectedMissedLocationResolutionTrace(host, expectedTrace, getDirectoryPath(normalizePath(combinePaths(getDirectoryPath(file.path), moduleName))), module, moduleName.substring(moduleName.lastIndexOf("/") + 1), /*useNodeModules*/ false);
            getExpectedResolutionTraceFooter(expectedTrace, module, moduleName, /*addRealPathTrace*/ false);
            return expectedTrace;
        }

        function getExpectedNonRelativeModuleResolutionTrace(host: TestServerHost, file: File, module: File, moduleName: string, expectedTrace: string[] = []) {
            getExpectedResolutionTraceHeader(expectedTrace, file, moduleName);
            expectedTrace.push(`Loading module '${moduleName}' from 'node_modules' folder, target file type 'TypeScript'.`);
            getExpectedMissedLocationResolutionTrace(host, expectedTrace, getDirectoryPath(file.path), module, moduleName, /*useNodeModules*/ true);
            getExpectedResolutionTraceFooter(expectedTrace, module, moduleName, /*addRealPathTrace*/ true);
            return expectedTrace;
        }

        function getExpectedNonRelativeModuleResolutionFromCacheTrace(host: TestServerHost, file: File, module: File, moduleName: string, cacheLocation: string, expectedTrace: string[] = []) {
            getExpectedResolutionTraceHeader(expectedTrace, file, moduleName);
            expectedTrace.push(`Loading module '${moduleName}' from 'node_modules' folder, target file type 'TypeScript'.`);
            getExpectedMissedLocationResolutionTrace(host, expectedTrace, getDirectoryPath(file.path), module, moduleName, /*useNodeModules*/ true, cacheLocation);
            expectedTrace.push(`Resolution for module '${moduleName}' was found in cache from location '${cacheLocation}'.`);
            getExpectedResolutionTraceFooter(expectedTrace, module, moduleName, /*addRealPathTrace*/ false, /*ignoreModuleFileFound*/ true);
            return expectedTrace;
        }

        function getExpectedReusingResolutionFromOldProgram(file: File, moduleName: string) {
            return `Reusing resolution of module '${moduleName}' to file '${file.path}' from old program.`;
        }

        function verifyWatchesWithConfigFile(host: TestServerHost, files: File[], openFile: File, extraExpectedDirectories?: readonly string[]) {
            const expectedRecursiveDirectories = arrayToSet([tscWatch.projectRoot, `${tscWatch.projectRoot}/${nodeModulesAtTypes}`, ...(extraExpectedDirectories || emptyArray)]);
            checkWatchedFiles(host, mapDefined(files, f => {
                if (f === openFile) {
                    return undefined;
                }
                const indexOfNodeModules = f.path.indexOf("/node_modules/");
                if (indexOfNodeModules === -1) {
                    return f.path;
                }
                expectedRecursiveDirectories.set(f.path.substr(0, indexOfNodeModules + "/node_modules".length), true);
                return undefined;
            }));
            checkWatchedDirectories(host, [], /*recursive*/ false);
            checkWatchedDirectories(host, arrayFrom(expectedRecursiveDirectories.keys()), /*recursive*/ true);
        }

        describe("from files in same folder", () => {
            function getFiles(fileContent: string) {
                const file1: File = {
                    path: `${tscWatch.projectRoot}/src/file1.ts`,
                    content: fileContent
                };
                const file2: File = {
                    path: `${tscWatch.projectRoot}/src/file2.ts`,
                    content: fileContent
                };
                return { file1, file2 };
            }

            it("relative module name", () => {
                const module1Name = "./module1";
                const module2Name = "../module2";
                const fileContent = `import { module1 } from "${module1Name}";import { module2 } from "${module2Name}";`;
                const { file1, file2 } = getFiles(fileContent);
                const { module1, module2 } = getModules(`${tscWatch.projectRoot}/src/module1.ts`, `${tscWatch.projectRoot}/module2.ts`);
                const files = [module1, module2, file1, file2, configFile, libFile];
                const host = createServerHost(files);
                const resolutionTrace = createHostModuleResolutionTrace(host);
                const service = createProjectService(host);
                service.openClientFile(file1.path);
                const expectedTrace = getExpectedRelativeModuleResolutionTrace(host, file1, module1, module1Name);
                getExpectedRelativeModuleResolutionTrace(host, file1, module2, module2Name, expectedTrace);
                verifyTrace(resolutionTrace, expectedTrace);
                verifyWatchesWithConfigFile(host, files, file1);

                host.writeFile(file1.path, file1.content + fileContent);
                host.writeFile(file2.path, file2.content + fileContent);
                host.runQueuedTimeoutCallbacks();
                verifyTrace(resolutionTrace, [
                    getExpectedReusingResolutionFromOldProgram(file1, module1Name),
                    getExpectedReusingResolutionFromOldProgram(file1, module2Name)
                ]);
                verifyWatchesWithConfigFile(host, files, file1);
            });

            it("non relative module name", () => {
                const expectedNonRelativeDirectories = [`${tscWatch.projectRoot}/node_modules`, `${tscWatch.projectRoot}/src`];
                const module1Name = "module1";
                const module2Name = "module2";
                const fileContent = `import { module1 } from "${module1Name}";import { module2 } from "${module2Name}";`;
                const { file1, file2 } = getFiles(fileContent);
                const { module1, module2 } = getModules(`${tscWatch.projectRoot}/src/node_modules/module1/index.ts`, `${tscWatch.projectRoot}/node_modules/module2/index.ts`);
                const files = [module1, module2, file1, file2, configFile, libFile];
                const host = createServerHost(files);
                const resolutionTrace = createHostModuleResolutionTrace(host);
                const service = createProjectService(host);
                service.openClientFile(file1.path);
                const expectedTrace = getExpectedNonRelativeModuleResolutionTrace(host, file1, module1, module1Name);
                getExpectedNonRelativeModuleResolutionTrace(host, file1, module2, module2Name, expectedTrace);
                verifyTrace(resolutionTrace, expectedTrace);
                verifyWatchesWithConfigFile(host, files, file1, expectedNonRelativeDirectories);

                host.writeFile(file1.path, file1.content + fileContent);
                host.writeFile(file2.path, file2.content + fileContent);
                host.runQueuedTimeoutCallbacks();
                verifyTrace(resolutionTrace, [
                    getExpectedReusingResolutionFromOldProgram(file1, module1Name),
                    getExpectedReusingResolutionFromOldProgram(file1, module2Name)
                ]);
                verifyWatchesWithConfigFile(host, files, file1, expectedNonRelativeDirectories);
            });
        });

        describe("from files in different folders", () => {
            function getFiles(fileContent1: string, fileContent2 = fileContent1, fileContent3 = fileContent1, fileContent4 = fileContent1) {
                const file1: File = {
                    path: `${tscWatch.projectRoot}/product/src/file1.ts`,
                    content: fileContent1
                };
                const file2: File = {
                    path: `${tscWatch.projectRoot}/product/src/feature/file2.ts`,
                    content: fileContent2
                };
                const file3: File = {
                    path: `${tscWatch.projectRoot}/product/test/src/file3.ts`,
                    content: fileContent3
                };
                const file4: File = {
                    path: `${tscWatch.projectRoot}/product/test/file4.ts`,
                    content: fileContent4
                };
                return { file1, file2, file3, file4 };
            }

            it("relative module name", () => {
                const module1Name = "./module1";
                const module2Name = "../module2";
                const module3Name = "../module1";
                const module4Name = "../../module2";
                const module5Name = "../../src/module1";
                const module6Name = "../src/module1";
                const fileContent1 = `import { module1 } from "${module1Name}";import { module2 } from "${module2Name}";`;
                const fileContent2 = `import { module1 } from "${module3Name}";import { module2 } from "${module4Name}";`;
                const fileContent3 = `import { module1 } from "${module5Name}";import { module2 } from "${module4Name}";`;
                const fileContent4 = `import { module1 } from "${module6Name}";import { module2 } from "${module2Name}";`;
                const { file1, file2, file3, file4 } = getFiles(fileContent1, fileContent2, fileContent3, fileContent4);
                const { module1, module2 } = getModules(`${tscWatch.projectRoot}/product/src/module1.ts`, `${tscWatch.projectRoot}/product/module2.ts`);
                const files = [module1, module2, file1, file2, file3, file4, configFile, libFile];
                const host = createServerHost(files);
                const resolutionTrace = createHostModuleResolutionTrace(host);
                const service = createProjectService(host);
                service.openClientFile(file1.path);
                const expectedTrace = getExpectedRelativeModuleResolutionTrace(host, file1, module1, module1Name);
                getExpectedRelativeModuleResolutionTrace(host, file1, module2, module2Name, expectedTrace);
                getExpectedRelativeModuleResolutionTrace(host, file2, module1, module3Name, expectedTrace);
                getExpectedRelativeModuleResolutionTrace(host, file2, module2, module4Name, expectedTrace);
                getExpectedRelativeModuleResolutionTrace(host, file4, module1, module6Name, expectedTrace);
                getExpectedRelativeModuleResolutionTrace(host, file4, module2, module2Name, expectedTrace);
                getExpectedRelativeModuleResolutionTrace(host, file3, module1, module5Name, expectedTrace);
                getExpectedRelativeModuleResolutionTrace(host, file3, module2, module4Name, expectedTrace);
                verifyTrace(resolutionTrace, expectedTrace);
                verifyWatchesWithConfigFile(host, files, file1);

                host.writeFile(file1.path, file1.content + fileContent1);
                host.writeFile(file2.path, file2.content + fileContent2);
                host.writeFile(file3.path, file3.content + fileContent3);
                host.writeFile(file4.path, file4.content + fileContent4);
                host.runQueuedTimeoutCallbacks();

                verifyTrace(resolutionTrace, [
                    getExpectedReusingResolutionFromOldProgram(file1, module1Name),
                    getExpectedReusingResolutionFromOldProgram(file1, module2Name)
                ]);
                verifyWatchesWithConfigFile(host, files, file1);
            });

            it("non relative module name", () => {
                const expectedNonRelativeDirectories = [`${tscWatch.projectRoot}/node_modules`, `${tscWatch.projectRoot}/product`];
                const module1Name = "module1";
                const module2Name = "module2";
                const fileContent = `import { module1 } from "${module1Name}";import { module2 } from "${module2Name}";`;
                const { file1, file2, file3, file4 } = getFiles(fileContent);
                const { module1, module2 } = getModules(`${tscWatch.projectRoot}/product/node_modules/module1/index.ts`, `${tscWatch.projectRoot}/node_modules/module2/index.ts`);
                const files = [module1, module2, file1, file2, file3, file4, configFile, libFile];
                const host = createServerHost(files);
                const resolutionTrace = createHostModuleResolutionTrace(host);
                const service = createProjectService(host);
                service.openClientFile(file1.path);
                const expectedTrace = getExpectedNonRelativeModuleResolutionTrace(host, file1, module1, module1Name);
                getExpectedNonRelativeModuleResolutionTrace(host, file1, module2, module2Name, expectedTrace);
                getExpectedNonRelativeModuleResolutionFromCacheTrace(host, file2, module1, module1Name, getDirectoryPath(file1.path), expectedTrace);
                getExpectedNonRelativeModuleResolutionFromCacheTrace(host, file2, module2, module2Name, getDirectoryPath(file1.path), expectedTrace);
                getExpectedNonRelativeModuleResolutionFromCacheTrace(host, file4, module1, module1Name, `${tscWatch.projectRoot}/product`, expectedTrace);
                getExpectedNonRelativeModuleResolutionFromCacheTrace(host, file4, module2, module2Name, `${tscWatch.projectRoot}/product`, expectedTrace);
                getExpectedNonRelativeModuleResolutionFromCacheTrace(host, file3, module1, module1Name, getDirectoryPath(file4.path), expectedTrace);
                getExpectedNonRelativeModuleResolutionFromCacheTrace(host, file3, module2, module2Name, getDirectoryPath(file4.path), expectedTrace);
                verifyTrace(resolutionTrace, expectedTrace);
                verifyWatchesWithConfigFile(host, files, file1, expectedNonRelativeDirectories);

                host.writeFile(file1.path, file1.content + fileContent);
                host.writeFile(file2.path, file2.content + fileContent);
                host.writeFile(file3.path, file3.content + fileContent);
                host.writeFile(file4.path, file4.content + fileContent);
                host.runQueuedTimeoutCallbacks();

                verifyTrace(resolutionTrace, [
                    getExpectedReusingResolutionFromOldProgram(file1, module1Name),
                    getExpectedReusingResolutionFromOldProgram(file1, module2Name)
                ]);
                verifyWatchesWithConfigFile(host, files, file1, expectedNonRelativeDirectories);
            });

            it("non relative module name from inferred project", () => {
                const module1Name = "module1";
                const module2Name = "module2";
                const file2Name = "./feature/file2";
                const file3Name = "../test/src/file3";
                const file4Name = "../test/file4";
                const importModuleContent = `import { module1 } from "${module1Name}";import { module2 } from "${module2Name}";`;
                const { file1, file2, file3, file4 } = getFiles(`import "${file2Name}"; import "${file4Name}"; import "${file3Name}"; ${importModuleContent}`, importModuleContent, importModuleContent, importModuleContent);
                const { module1, module2 } = getModules(`${tscWatch.projectRoot}/product/node_modules/module1/index.ts`, `${tscWatch.projectRoot}/node_modules/module2/index.ts`);
                const files = [module1, module2, file1, file2, file3, file4, libFile];
                const host = createServerHost(files);
                const resolutionTrace = createHostModuleResolutionTrace(host);
                const service = createProjectService(host);
                service.setCompilerOptionsForInferredProjects({ traceResolution: true });
                service.openClientFile(file1.path);
                const expectedTrace = getExpectedRelativeModuleResolutionTrace(host, file1, file2, file2Name);
                getExpectedRelativeModuleResolutionTrace(host, file1, file4, file4Name, expectedTrace);
                getExpectedRelativeModuleResolutionTrace(host, file1, file3, file3Name, expectedTrace);
                getExpectedNonRelativeModuleResolutionTrace(host, file1, module1, module1Name, expectedTrace);
                getExpectedNonRelativeModuleResolutionTrace(host, file1, module2, module2Name, expectedTrace);
                getExpectedNonRelativeModuleResolutionFromCacheTrace(host, file2, module1, module1Name, getDirectoryPath(file1.path), expectedTrace);
                getExpectedNonRelativeModuleResolutionFromCacheTrace(host, file2, module2, module2Name, getDirectoryPath(file1.path), expectedTrace);
                getExpectedNonRelativeModuleResolutionFromCacheTrace(host, file4, module1, module1Name, `${tscWatch.projectRoot}/product`, expectedTrace);
                getExpectedNonRelativeModuleResolutionFromCacheTrace(host, file4, module2, module2Name, `${tscWatch.projectRoot}/product`, expectedTrace);
                getExpectedNonRelativeModuleResolutionFromCacheTrace(host, file3, module1, module1Name, getDirectoryPath(file4.path), expectedTrace);
                getExpectedNonRelativeModuleResolutionFromCacheTrace(host, file3, module2, module2Name, getDirectoryPath(file4.path), expectedTrace);
                verifyTrace(resolutionTrace, expectedTrace);

                const currentDirectory = getDirectoryPath(file1.path);
                const watchedFiles = mapDefined(files, f => f === file1 || f.path.indexOf("/node_modules/") !== -1 ? undefined : f.path)
                    .concat(getConfigFilesToWatch(`${tscWatch.projectRoot}/product/src`));
                const watchedRecursiveDirectories = getTypeRootsFromLocation(currentDirectory).concat([
                    `${currentDirectory}/node_modules`, `${currentDirectory}/feature`, `${tscWatch.projectRoot}/product/${nodeModules}`,
                    `${tscWatch.projectRoot}/${nodeModules}`, `${tscWatch.projectRoot}/product/test/${nodeModules}`,
                    `${tscWatch.projectRoot}/product/test/src/${nodeModules}`
                ]);
                checkWatches();

                host.writeFile(file1.path, file1.content + importModuleContent);
                host.writeFile(file2.path, file2.content + importModuleContent);
                host.writeFile(file3.path, file3.content + importModuleContent);
                host.writeFile(file4.path, file4.content + importModuleContent);
                host.runQueuedTimeoutCallbacks();

                verifyTrace(resolutionTrace, [
                    getExpectedReusingResolutionFromOldProgram(file1, file2Name),
                    getExpectedReusingResolutionFromOldProgram(file1, file4Name),
                    getExpectedReusingResolutionFromOldProgram(file1, file3Name),
                    getExpectedReusingResolutionFromOldProgram(file1, module1Name),
                    getExpectedReusingResolutionFromOldProgram(file1, module2Name)
                ]);
                checkWatches();

                function checkWatches() {
                    checkWatchedFiles(host, watchedFiles);
                    checkWatchedDirectories(host, [], /*recursive*/ false);
                    checkWatchedDirectories(host, watchedRecursiveDirectories, /*recursive*/ true);
                }
            });
        });

        describe("when watching directories for failed lookup locations in amd resolution", () => {
            const nodeFile: File = {
                path: `${tscWatch.projectRoot}/src/typings/node.d.ts`,
                content: `
declare module "fs" {
    export interface something {
    }
}`
            };
            const electronFile: File = {
                path: `${tscWatch.projectRoot}/src/typings/electron.d.ts`,
                content: `
declare module 'original-fs' {
    import * as fs from 'fs';
    export = fs;
}`
            };
            const srcFile: File = {
                path: `${tscWatch.projectRoot}/src/somefolder/srcfile.ts`,
                content: `
import { x } from "somefolder/module1";
import { x } from "somefolder/module2";
const y = x;`
            };
            const moduleFile: File = {
                path: `${tscWatch.projectRoot}/src/somefolder/module1.ts`,
                content: `
export const x = 10;`
            };
            const configFile: File = {
                path: `${tscWatch.projectRoot}/src/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        module: "amd",
                        moduleResolution: "classic",
                        target: "es5",
                        outDir: "../out",
                        baseUrl: "./",
                        typeRoots: ["typings"]
                    }
                })
            };

            function verifyModuleResolution(useNodeFile: boolean) {
                const files = [...(useNodeFile ? [nodeFile] : []), electronFile, srcFile, moduleFile, configFile, libFile];
                const host = createServerHost(files);
                const service = createProjectService(host);
                service.openClientFile(srcFile.path, srcFile.content, ScriptKind.TS, tscWatch.projectRoot);
                checkProjectActualFiles(service.configuredProjects.get(configFile.path)!, files.map(f => f.path));
                checkWatchedFilesDetailed(host, mapDefined(files, f => f === srcFile ? undefined : f.path), 1);
                if (useNodeFile) {
                    checkWatchedDirectories(host, emptyArray,  /*recursive*/ false); // since fs resolves to ambient module, shouldnt watch failed lookup
                }
                else {
                    checkWatchedDirectoriesDetailed(host, [`${tscWatch.projectRoot}`, `${tscWatch.projectRoot}/src`], 1,  /*recursive*/ false); // failed lookup for fs
                }
                const expectedWatchedDirectories = createMap<number>();
                expectedWatchedDirectories.set(`${tscWatch.projectRoot}/src`, 1); // Wild card
                expectedWatchedDirectories.set(`${tscWatch.projectRoot}/src/somefolder`, 1); // failedLookup for somefolder/module2
                expectedWatchedDirectories.set(`${tscWatch.projectRoot}/src/node_modules`, 1); // failed lookup for somefolder/module2
                expectedWatchedDirectories.set(`${tscWatch.projectRoot}/somefolder`, 1); // failed lookup for somefolder/module2
                expectedWatchedDirectories.set(`${tscWatch.projectRoot}/node_modules`, 1); // failed lookup for with node_modules/@types/fs
                expectedWatchedDirectories.set(`${tscWatch.projectRoot}/src/typings`, useNodeFile ? 1 : 2); // typeroot directory + failed lookup if not using node file
                checkWatchedDirectoriesDetailed(host, expectedWatchedDirectories, /*recursive*/ true);
            }

            it("when resolves to ambient module", () => {
                verifyModuleResolution(/*useNodeFile*/ true);
            });

            it("when resolution fails", () => {
                verifyModuleResolution(/*useNodeFile*/ false);
            });
        });

        describe("ignores files/folder changes in node_modules that start with '.'", () => {
            const npmCacheFile: File = {
                path: `${tscWatch.projectRoot}/node_modules/.cache/babel-loader/89c02171edab901b9926470ba6d5677e.ts`,
                content: JSON.stringify({ something: 10 })
            };
            const file1: File = {
                path: `${tscWatch.projectRoot}/test.ts`,
                content: `import { x } from "somemodule";`
            };
            const file2: File = {
                path: `${tscWatch.projectRoot}/node_modules/somemodule/index.d.ts`,
                content: `export const x = 10;`
            };
            it("when watching node_modules in inferred project for failed lookup/closed script infos", () => {
                const files = [libFile, file1, file2];
                const host = createServerHost(files);
                const service = createProjectService(host);
                service.openClientFile(file1.path);
                checkNumberOfProjects(service, { inferredProjects: 1 });
                const project = service.inferredProjects[0];
                checkProjectActualFiles(project, files.map(f => f.path));
                host.checkTimeoutQueueLength(0);

                host.ensureFileOrFolder(npmCacheFile);
                host.checkTimeoutQueueLength(0);
            });
            it("when watching node_modules as part of wild card directories in config project", () => {
                const config: File = {
                    path: `${tscWatch.projectRoot}/tsconfig.json`,
                    content: "{}"
                };
                const files = [libFile, file1, file2, config];
                const host = createServerHost(files);
                const service = createProjectService(host);
                service.openClientFile(file1.path);
                checkNumberOfProjects(service, { configuredProjects: 1 });
                const project = Debug.checkDefined(service.configuredProjects.get(config.path));
                checkProjectActualFiles(project, files.map(f => f.path));
                host.checkTimeoutQueueLength(0);

                host.ensureFileOrFolder(npmCacheFile);
                host.checkTimeoutQueueLength(0);
            });
        });

        describe("avoid unnecessary invalidation", () => {
            it("unnecessary lookup invalidation on save", () => {
                const expectedNonRelativeDirectories = [`${tscWatch.projectRoot}/node_modules`, `${tscWatch.projectRoot}/src`];
                const module1Name = "module1";
                const module2Name = "module2";
                const fileContent = `import { module1 } from "${module1Name}";import { module2 } from "${module2Name}";`;
                const file1: File = {
                    path: `${tscWatch.projectRoot}/src/file1.ts`,
                    content: fileContent
                };
                const { module1, module2 } = getModules(`${tscWatch.projectRoot}/src/node_modules/module1/index.ts`, `${tscWatch.projectRoot}/node_modules/module2/index.ts`);
                const files = [module1, module2, file1, configFile, libFile];
                const host = createServerHost(files);
                const resolutionTrace = createHostModuleResolutionTrace(host);
                const service = createProjectService(host);
                service.openClientFile(file1.path);
                const expectedTrace = getExpectedNonRelativeModuleResolutionTrace(host, file1, module1, module1Name);
                getExpectedNonRelativeModuleResolutionTrace(host, file1, module2, module2Name, expectedTrace);
                verifyTrace(resolutionTrace, expectedTrace);
                verifyWatchesWithConfigFile(host, files, file1, expectedNonRelativeDirectories);

                // invoke callback to simulate saving
                host.modifyFile(file1.path, file1.content, { invokeFileDeleteCreateAsPartInsteadOfChange: true });
                host.checkTimeoutQueueLengthAndRun(0);
            });
        });
    });
}
