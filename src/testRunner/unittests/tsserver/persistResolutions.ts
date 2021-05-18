namespace ts.projectSystem {
    describe("unittests:: tsserver:: persistResolutions", () => {
        function setupHost() {
            const { main, anotherFileReusingResolution, filePresent, fileWithRef, types, globalMain, globalAnotherFileWithSameReferenes, globalFilePresent, externalThing, someType, config } = tscWatch.PersistentResolutionsTests.getFiles();
            const host = createServerHost(
                [main, anotherFileReusingResolution, filePresent, fileWithRef, types, globalMain, globalAnotherFileWithSameReferenes, globalFilePresent, externalThing, someType, config, libFile],
                { currentDirectory: tscWatch.projectRoot, useCaseSensitiveFileNames: true }
            );
            return { host, main, globalMain, config };
        }

        function setupHostWithSavedResolutions() {
            const result = setupHost();
            const exit = result.host.exit;
            result.host.exit = noop;
            fakes.withTemporaryPatchingForBuildinfoReadWrite(result.host, sys => executeCommandLine(sys, noop, ["--p", "."]));
            result.host.exit = exit;
            result.host.clearOutput();
            return result;
        }

        function setupHostWithClearedResolutions() {
            const result = setupHost();
            const exit = result.host.exit;
            result.host.exit = noop;
            fakes.withTemporaryPatchingForBuildinfoReadWrite(result.host, sys => {
                executeCommandLine(sys, noop, ["--p", "."]);
                executeCommandLine(sys, noop, ["--p", ".", "--cleanPersistedProgram"]);
            });
            result.host.exit = exit;
            result.host.clearOutput();
            return result;
        }

        function setup({ host, main, globalMain, config }: ReturnType<typeof setupHost>) {
            fakes.patchHostForBuildInfoReadWrite(host);
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs() });
            openFilesForSession([main, globalMain], session);
            const project = session.getProjectService().configuredProjects.get(config.path)!;
            return { session, project };
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
            const result = setupHostWithSavedResolutions();
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
            const result = setupHostWithClearedResolutions();
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
}