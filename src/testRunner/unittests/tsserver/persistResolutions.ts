namespace ts.projectSystem {
    describe("unittests:: tsserver:: persistResolutions", () => {
        function setupHost() {
            const main: File = {
                path: `${tscWatch.projectRoot}/src/main.ts`,
                content: Utils.dedent`
                    import { something } from "./filePresent";
                    import { something as something1 } from "./filePresent";
                    import { something2 } from "./fileNotFound";
                `,
            };
            const anotherFileReusingResolution: File = {
                path: `${tscWatch.projectRoot}/src/anotherFileReusingResolution.ts`,
                content: Utils.dedent`
                    import { something } from "./filePresent";
                    import { something2 } from "./fileNotFound";`,
            };
            const filePresent: File = {
                path: `${tscWatch.projectRoot}/src/filePresent.ts`,
                content: `export function something() { return 10; }`,
            };
            const fileWithRef: File = {
                path: `${tscWatch.projectRoot}/src/fileWithRef.ts`,
                content: `/// <reference path="./types.ts"/>`,
            };
            const types: File = {
                path: `${tscWatch.projectRoot}/src/types.ts`,
                content: `interface SomeType {}`,
            };
            const globalMain: File = {
                path: `${tscWatch.projectRoot}/src/globalMain.ts`,
                content: Utils.dedent`
                    /// <reference path="./globalFilePresent.ts"/>
                    /// <reference path="./globalFileNotFound.ts"/>
                    function globalMain() { }
                `,
            };
            const globalAnotherFileWithSameReferenes: File = {
                path: `${tscWatch.projectRoot}/src/globalAnotherFileWithSameReferenes.ts`,
                content: Utils.dedent`
                        /// <reference path="./globalFilePresent.ts"/>
                        /// <reference path="./globalFileNotFound.ts"/>
                        function globalAnotherFileWithSameReferenes() { }
                    `,
            };
            const globalFilePresent: File = {
                path: `${tscWatch.projectRoot}/src/globalFilePresent.ts`,
                content: `function globalSomething() { return 10; }`,
            };
            const config: File = {
                path: `${tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        module: "amd",
                        composite: true,
                        // persistResolutions: true,
                        traceResolution: true,
                        outFile
                    },
                    include: ["src/**/*.ts"]
                }),
            };
            const host = createServerHost(
                [main, anotherFileReusingResolution, filePresent, fileWithRef, types, globalMain, globalAnotherFileWithSameReferenes, globalFilePresent, config, libFile],
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

        it("uses saved resolution for program", () => {
            const result = setupHostWithSavedResolutions();
            const { project, session } = setup(result);
            const { host, main, globalMain } = result;
            appendProjectFileText(project, session);

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

            session.logger.logs.push("Write file that could not be resolved by referenced path::");
            host.writeFile(`${tscWatch.projectRoot}/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }");
                host.runQueuedTimeoutCallbacks();
            appendProjectFileText(project, session);

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

            session.logger.logs.push("Write file that could not be resolved");
            host.writeFile(`${tscWatch.projectRoot}/src/fileNotFound.ts`, "export function something2() { return 20; }");
            host.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            host.runQueuedTimeoutCallbacks(); // Actual Update
            appendProjectFileText(project, session);

            baselineTsserverLogs("persistResolutions", "uses saved resolution for program", session);
        });

        it("creates new resolutions for program if tsbuildinfo is not present", () => {
            const result = setupHost();
            const { project, session } = setup(result);
            const { host, main, globalMain } = result;
            appendProjectFileText(project, session);

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

            session.logger.logs.push("Write file that could not be resolved by referenced path::");
            host.writeFile(`${tscWatch.projectRoot}/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }");
            host.runQueuedTimeoutCallbacks();
            appendProjectFileText(project, session);

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

            session.logger.logs.push("Write file that could not be resolved");
            host.writeFile(`${tscWatch.projectRoot}/src/fileNotFound.ts`, "export function something2() { return 20; }");
            host.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            host.runQueuedTimeoutCallbacks(); // Actual Update
            appendProjectFileText(project, session);

            baselineTsserverLogs("persistResolutions", "creates new resolutions for program if tsbuildinfo is not present", session);
        });

        it("creates new resolutions for program if tsbuildinfo is present but program is not persisted", () => {
            const result = setupHostWithClearedResolutions();
            const { project, session } = setup(result);
            const { host, main, globalMain } = result;
            appendProjectFileText(project, session);

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

            session.logger.logs.push("Write file that could not be resolved by referenced path::");
            host.writeFile(`${tscWatch.projectRoot}/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }");
            host.runQueuedTimeoutCallbacks();
            appendProjectFileText(project, session);

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

            session.logger.logs.push("Write file that could not be resolved");
            host.writeFile(`${tscWatch.projectRoot}/src/fileNotFound.ts`, "export function something2() { return 20; }");
            host.runQueuedTimeoutCallbacks(); // Invalidate resolutions
            host.runQueuedTimeoutCallbacks(); // Actual Update
            appendProjectFileText(project, session);

            baselineTsserverLogs("persistResolutions", "creates new resolutions for program if tsbuildinfo is present but program is not persisted", session);
        });
    });
}