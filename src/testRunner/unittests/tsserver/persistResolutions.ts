namespace ts.projectSystem {
    interface SetupHostOutput {
        host: TestServerHost;
        openFiles: readonly File[];
        config: File;
    }

    function setupHostWithSavedResolutions<T extends SetupHostOutput>(setupHost: () => T): T {
        const result = setupHost();
        const exit = result.host.exit;
        result.host.exit = noop;
        fakes.withTemporaryPatchingForBuildinfoReadWrite(result.host, sys => executeCommandLine(sys, noop, ["--b", result.config.path]));
        result.host.clearOutput();
        result.host.exit = exit;
        return result;
    }

    function setupHostWithClearedResolutions<T extends SetupHostOutput>(setupHost: () => T): T {
        const result = setupHost();
        const exit = result.host.exit;
        result.host.exit = noop;
        fakes.withTemporaryPatchingForBuildinfoReadWrite(result.host, sys => {
            executeCommandLine(sys, noop, ["--b", result.config.path]);
            executeCommandLine(sys, noop, ["--b", result.config.path, "--cleanPersistedProgram"]);
        });
        result.host.clearOutput();
        result.host.exit = exit;
        return result;
    }

    function setup<T extends SetupHostOutput>({ host, openFiles, config }: T) {
        fakes.patchHostForBuildInfoReadWrite(host);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs() });
        openFilesForSession(openFiles, session);
        const project = session.getProjectService().configuredProjects.get(config.path)!;
        return { session, project };
    }

    function persistResolutions(file: File) {
        const content = JSON.parse(file.content);
        content.compilerOptions = {
            ...content.compilerOptions || {},
            persistResolutions: true,
            traceResolution: true,
        };
        file.content = JSON.stringify(content, /*replacer*/ undefined, 4);
        return file;
    }

    describe("unittests:: tsserver:: persistResolutions", () => {
        function setupHost() {
            const { main, anotherFileReusingResolution, filePresent, fileWithRef, types, globalMain, globalAnotherFileWithSameReferenes, globalFilePresent, externalThing, someType, config } = tscWatch.PersistentResolutionsTests.getFiles();
            const host = createServerHost(
                [main, anotherFileReusingResolution, filePresent, fileWithRef, types, globalMain, globalAnotherFileWithSameReferenes, globalFilePresent, externalThing, someType, config, libFile],
                { currentDirectory: tscWatch.projectRoot, useCaseSensitiveFileNames: true }
            );
            return { host, main, globalMain, config, openFiles: [main, globalMain] };
        }

        function modifyGlobalMain(session: TestSession, project: server.ConfiguredProject, globalMain: File) {
            session.logger.logs.push(`Modify global file::`);
            session.executeCommandSeq<protocol.ChangeRequest>({
                command: protocol.CommandTypes.Change,
                arguments: {
                    file: globalMain.path,
                    line: 4,
                    offset: 1,
                    endLine: 4,
                    endOffset: 1,
                    insertString: `globalSomething();
`
                }
            });
            project.updateGraph();
            appendProjectFileText(project, session);
        }

        function addNewGlobalFile(host: TestServerHost, session: TestSession, project: server.ConfiguredProject, globalMain: File) {
            session.logger.logs.push(`Add new globalFile and update globalMain file::`);
            host.writeFile(`${tscWatch.projectRoot}/src/globalNewFile.ts`, "function globalFoo() { return 20; }");
            session.executeCommandSeq<protocol.ChangeRequest>({
                command: protocol.CommandTypes.Change,
                arguments: {
                    file: globalMain.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `/// <reference path="./globalNewFile.ts"/>
`,
                }
            });
            session.executeCommandSeq<protocol.ChangeRequest>({
                command: protocol.CommandTypes.Change,
                arguments: {
                    file: globalMain.path,
                    line: 6,
                    offset: 1,
                    endLine: 6,
                    endOffset: 1,
                    insertString: `globalFoo();
`
                }
            });
            host.runQueuedTimeoutCallbacks();
            appendProjectFileText(project, session);
        }

        function writeFileNotResolvedByReferencedPath(host: TestServerHost, session: TestSession, project: server.ConfiguredProject) {
            session.logger.logs.push("Write file that could not be resolved by referenced path::");
            host.writeFile(`${tscWatch.projectRoot}/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }");
            host.runQueuedTimeoutCallbacks();
            appendProjectFileText(project, session);
        }

        function modifyMain(session: TestSession, project: server.ConfiguredProject, main: File) {
            session.logger.logs.push(`Modify main file::`);
            session.executeCommandSeq<protocol.ChangeRequest>({
                command: protocol.CommandTypes.Change,
                arguments: {
                    file: main.path,
                    line: 4,
                    offset: 1,
                    endLine: 4,
                    endOffset: 1,
                    insertString: `something();
`
                }
            });
            project.updateGraph();
            appendProjectFileText(project, session);
        }

        function addNewFile(host: TestServerHost, session: TestSession, project: server.ConfiguredProject, main: File) {
            session.logger.logs.push(`Add new module and update main file::`);
            host.writeFile(`${tscWatch.projectRoot}/src/newFile.ts`, "export function foo() { return 20; }");
            session.executeCommandSeq<protocol.ChangeRequest>({
                command: protocol.CommandTypes.Change,
                arguments: {
                    file: main.path,
                    line: 1,
                    offset: 1,
                    endLine: 1,
                    endOffset: 1,
                    insertString: `import { foo } from "./newFile";
`,
                }
            });
            host.runQueuedTimeoutCallbacks();
            appendProjectFileText(project, session);
        }

        function writeFileNotResolved(host: TestServerHost, session: TestSession, project: server.ConfiguredProject) {
            session.logger.logs.push("Write file that could not be resolved");
            host.writeFile(`${tscWatch.projectRoot}/src/fileNotFound.ts`, "export function something2() { return 20; }");
            host.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            host.runQueuedTimeoutCallbacks(); // Actual Update
            appendProjectFileText(project, session);
        }

        function deleteFileNotResolved(host: TestServerHost, session: TestSession, project: server.ConfiguredProject) {
            session.logger.logs.push("Delete file that could not be resolved");
            host.deleteFile(`${tscWatch.projectRoot}/src/fileNotFound.ts`);
            host.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            host.runQueuedTimeoutCallbacks(); // Actual Update
            appendProjectFileText(project, session);
        }

        function writeExternalModuleNotResolved(host: TestServerHost, session: TestSession, project: server.ConfiguredProject) {
            session.logger.logs.push("Create external module file that could not be resolved");
            host.writeFile(`${tscWatch.projectRoot}/src/externalThingNotPresent.ts`, "export function externalThing2() { return 20; }");
            host.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            host.runQueuedTimeoutCallbacks(); // Actual Update
            appendProjectFileText(project, session);
        }

        function writeExternalModuleTakingPreference(host: TestServerHost, session: TestSession, project: server.ConfiguredProject) {
            session.logger.logs.push("Write .ts file that takes preference over resolved .d.ts file");
            host.writeFile(`${tscWatch.projectRoot}/src/externalThing.ts`, "export function externalThing1() { return 10; }");
            host.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            host.runQueuedTimeoutCallbacks(); // Actual Update
            appendProjectFileText(project, session);
        }

        function deleteExternalModuleTakingPreference(host: TestServerHost, session: TestSession, project: server.ConfiguredProject) {
            session.logger.logs.push("Delete .ts file that takes preference over resolved .d.ts file");
            host.deleteFile(`${tscWatch.projectRoot}/src/externalThing.ts`);
            host.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            host.runQueuedTimeoutCallbacks(); // Actual Update
            appendProjectFileText(project, session);
        }

        function installNewType(host: TestServerHost, session: TestSession, project: server.ConfiguredProject) {
            session.logger.logs.push("Install another type picked up by program");
            host.ensureFileOrFolder({ path: `${tscWatch.projectRoot}/node_modules/@types/someType2/index.d.ts`, content: "export function someType2(): number;" });
            host.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            host.runQueuedTimeoutCallbacks(); // Actual Update
            appendProjectFileText(project, session);
        }

        function deleteExistingType(host: TestServerHost, session: TestSession, project: server.ConfiguredProject) {
            session.logger.logs.push("Delete existing type picked up by program");
            host.deleteFolder(`${tscWatch.projectRoot}/node_modules/@types/someType`, /*recursive*/ true);
            host.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            host.runQueuedTimeoutCallbacks(); // Actual Update
            appendProjectFileText(project, session);
        }

        it("uses saved resolution for program", () => {
            const result = setupHostWithSavedResolutions(setupHost);
            const { project, session } = setup(result);
            const { host, main, globalMain } = result;
            appendProjectFileText(project, session);

            modifyGlobalMain(session, project, globalMain);
            addNewGlobalFile(host, session, project, globalMain);
            writeFileNotResolvedByReferencedPath(host, session, project);
            modifyMain(session, project, main);
            addNewFile(host, session, project, main);
            writeFileNotResolved(host, session, project);
            deleteFileNotResolved(host, session, project);
            writeFileNotResolved(host, session, project);
            writeExternalModuleNotResolved(host, session, project);
            writeExternalModuleTakingPreference(host, session, project);
            deleteExternalModuleTakingPreference(host, session, project);
            installNewType(host, session, project);
            deleteExistingType(host, session, project);

            baselineTsserverLogs("persistResolutions", "uses saved resolution for program", session);
        });

        it("creates new resolutions for program if tsbuildinfo is not present", () => {
            const result = setupHost();
            const { project, session } = setup(result);
            const { host, main, globalMain } = result;
            appendProjectFileText(project, session);

            modifyGlobalMain(session, project, globalMain);
            addNewGlobalFile(host, session, project, globalMain);
            writeFileNotResolvedByReferencedPath(host, session, project);
            modifyMain(session, project, main);
            addNewFile(host, session, project, main);
            writeFileNotResolved(host, session, project);
            deleteFileNotResolved(host, session, project);
            writeFileNotResolved(host, session, project);
            writeExternalModuleNotResolved(host, session, project);
            writeExternalModuleTakingPreference(host, session, project);
            deleteExternalModuleTakingPreference(host, session, project);
            installNewType(host, session, project);
            deleteExistingType(host, session, project);

            baselineTsserverLogs("persistResolutions", "creates new resolutions for program if tsbuildinfo is not present", session);
        });

        it("creates new resolutions for program if tsbuildinfo is present but program is not persisted", () => {
            const result = setupHostWithClearedResolutions(setupHost);
            const { project, session } = setup(result);
            const { host, main, globalMain } = result;
            appendProjectFileText(project, session);

            modifyGlobalMain(session, project, globalMain);
            addNewGlobalFile(host, session, project, globalMain);
            writeFileNotResolvedByReferencedPath(host, session, project);
            modifyMain(session, project, main);
            addNewFile(host, session, project, main);
            writeFileNotResolved(host, session, project);
            deleteFileNotResolved(host, session, project);
            writeFileNotResolved(host, session, project);
            writeExternalModuleNotResolved(host, session, project);
            writeExternalModuleTakingPreference(host, session, project);
            deleteExternalModuleTakingPreference(host, session, project);
            installNewType(host, session, project);
            deleteExistingType(host, session, project);

            baselineTsserverLogs("persistResolutions", "creates new resolutions for program if tsbuildinfo is present but program is not persisted", session);
        });
    });

    describe("unittests:: tsserver:: persistResolutions on sample project", () => {
        function setupHost() {
            const coreConfig = persistResolutions(TestFSWithWatch.getTsBuildProjectFile("sample1", "core/tsconfig.json"));
            const coreIndex = TestFSWithWatch.getTsBuildProjectFile("sample1", "core/index.ts");
            const coreAnotherModule = TestFSWithWatch.getTsBuildProjectFile("sample1", "core/anotherModule.ts");
            const coreSomeDecl = TestFSWithWatch.getTsBuildProjectFile("sample1", "core/some_decl.d.ts");
            const logicConfig = persistResolutions(TestFSWithWatch.getTsBuildProjectFile("sample1", "logic/tsconfig.json"));
            const logicIndex = TestFSWithWatch.getTsBuildProjectFile("sample1", "logic/index.ts");
            const testsConfig = persistResolutions(TestFSWithWatch.getTsBuildProjectFile("sample1", "tests/tsconfig.json"));
            const testsIndex = TestFSWithWatch.getTsBuildProjectFile("sample1", "tests/index.ts");
            const host = createServerHost([libFile, coreConfig, coreIndex, coreAnotherModule, coreSomeDecl, logicConfig, logicIndex, testsConfig, testsIndex]);
            return { host, config: testsConfig, openFiles: [testsIndex] };
        }


        it("uses saved resolution for program", () => {
            const result = setupHostWithSavedResolutions(setupHost);
            const { project, session } = setup(result);
            appendProjectFileText(project, session);
            baselineTsserverLogs("persistResolutions", "uses saved resolution for program with sample project", session);
        });

        it("creates new resolutions for program if tsbuildinfo is not present", () => {
            const result = setupHost();
            const { project, session } = setup(result);
            appendProjectFileText(project, session);
            baselineTsserverLogs("persistResolutions", "creates new resolutions for program if tsbuildinfo is not present with sample project", session);
        });

        it("creates new resolutions for program if tsbuildinfo is present but program is not persisted", () => {
            const result = setupHostWithClearedResolutions(setupHost);
            const { project, session } = setup(result);
            appendProjectFileText(project, session);
            baselineTsserverLogs("persistResolutions", "creates new resolutions for program if tsbuildinfo is present but program is not persisted with sample project", session);
        });
    });

    describe("unittests:: tsserver:: persistResolutions on project where d.ts file contains fewer modules than original file", () => {
        function setupHost() {
            const coreConfig: File = {
                path: `${tscWatch.projectRoot}/core/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { composite: true, persistResolutions: true, traceResolution: true } })
            };
            const coreIndex: File = {
                path: `${tscWatch.projectRoot}/core/index.ts`,
                content: `export function bar() { return 10; }`
            };
            const coreMyClass: File = {
                path: `${tscWatch.projectRoot}/core/myClass.ts`,
                content: `export class myClass { }`
            };
            const coreAnotherClass: File = {
                path: `${tscWatch.projectRoot}/core/anotherClass.ts`,
                content: `export class anotherClass { }`
            };
            const logicConfig: File = {
                path: `${tscWatch.projectRoot}/logic/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { composite: true, persistResolutions: true, traceResolution: true },
                    references: [{ path: "../core" }]
                })
            };
            const logicIndex: File = {
                path: `${tscWatch.projectRoot}/logic/index.ts`,
                content: `import { myClass } from "../core/myClass";
import { bar } from "../core";
import { anotherClass } from "../core/anotherClass";
export function returnMyClass() {
    bar();
    return new myClass();
}
export function returnAnotherClass() {
    return new anotherClass();
}`
            };
            const testsConfig: File = {
                path: `${tscWatch.projectRoot}/tests/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { composite: true, persistResolutions: true, traceResolution: true },
                    references: [{ path: "../logic" }]
                })
            };
            const testsIndex: File = {
                path: `${tscWatch.projectRoot}/tests/index.ts`,
                content: `import { returnMyClass } from "../logic";
returnMyClass();`
            };
            const host = createServerHost([libFile, coreConfig, coreIndex, coreMyClass, coreAnotherClass, logicConfig, logicIndex, testsConfig, testsIndex]);
            return { host, config: testsConfig, openFiles: [testsIndex] };
        }

        it("uses saved resolution for program", () => {
            const result = setupHostWithSavedResolutions(setupHost);
            const { project, session } = setup(result);
            appendProjectFileText(project, session);
            baselineTsserverLogs("persistResolutions", "uses saved resolution for program with project where dts file contains fewer modules than original file", session);
        });

        it("creates new resolutions for program if tsbuildinfo is not present", () => {
            const result = setupHost();
            const { project, session } = setup(result);
            appendProjectFileText(project, session);
            baselineTsserverLogs("persistResolutions", "creates new resolutions for program if tsbuildinfo is not present with project where dts file contains fewer modules than original file", session);
        });

        it("creates new resolutions for program if tsbuildinfo is present but program is not persisted", () => {
            const result = setupHostWithClearedResolutions(setupHost);
            const { project, session } = setup(result);
            appendProjectFileText(project, session);
            baselineTsserverLogs("persistResolutions", "creates new resolutions for program if tsbuildinfo is present but program is not persisted with project where dts file contains fewer modules than original file", session);
        });
    });
}