namespace ts.projectSystem {
    export interface GetErrDiagnostics {
        file: string | File;
        syntax?: protocol.Diagnostic[];
        semantic?: protocol.Diagnostic[];
        suggestion?: protocol.Diagnostic[];
    }
    export interface VerifyGetErrRequestBase {
        session: TestSession;
        host: TestServerHost;
        onErrEvent?: () => void;
        existingTimeouts?: number;
    }
    export interface VerifyGetErrRequest extends VerifyGetErrRequestBase {
        expected: readonly GetErrDiagnostics[];
    }
    export function verifyGetErrRequest(request: VerifyGetErrRequest) {
        const { session, expected } = request;
        session.clearMessages();
        const expectedSequenceId = session.getNextSeq();
        session.executeCommandSeq<protocol.GeterrRequest>({
            command: protocol.CommandTypes.Geterr,
            arguments: {
                delay: 0,
                files: expected.map(f => filePath(f.file))
            }
        });
        checkAllErrors({ ...request, expectedSequenceId });
    }

    export interface CheckAllErrors extends VerifyGetErrRequest {
        expectedSequenceId: number;
    }
    function checkAllErrors({ expected, expectedSequenceId, ...rest }: CheckAllErrors) {
        for (let i = 0; i < expected.length; i++) {
            checkErrorsInFile({
                ...rest,
                expected: expected[i],
                expectedSequenceId: i === expected.length - 1 ? expectedSequenceId : undefined,
            });
        }
    }

    function filePath(file: string | File) {
        return isString(file) ? file : file.path;
    }
    interface CheckErrorsInFile extends VerifyGetErrRequestBase {
        expected: GetErrDiagnostics;
        expectedSequenceId?: number;
    }
    function checkErrorsInFile({
        session, host, onErrEvent, existingTimeouts, expectedSequenceId,
        expected: { file, syntax, semantic, suggestion },
    }: CheckErrorsInFile) {
        onErrEvent = onErrEvent || noop;
        if (existingTimeouts !== undefined) {
            host.checkTimeoutQueueLength(existingTimeouts + 1);
            host.runQueuedTimeoutCallbacks(host.getNextTimeoutId() - 1);
        }
        else {
            host.checkTimeoutQueueLengthAndRun(1);
        }
        if (syntax) {
            onErrEvent();
            checkErrorMessage(session, "syntaxDiag", { file: filePath(file), diagnostics: syntax });
        }
        if (semantic) {
            session.clearMessages();

            host.runQueuedImmediateCallbacks(1);
            onErrEvent();
            checkErrorMessage(session, "semanticDiag", { file: filePath(file), diagnostics: semantic });
        }
        if (suggestion) {
            session.clearMessages();

            host.runQueuedImmediateCallbacks(1);
            onErrEvent();
            checkErrorMessage(session, "suggestionDiag", { file: filePath(file), diagnostics: suggestion });
        }
        if (expectedSequenceId !== undefined) {
            checkCompleteEvent(session, syntax || semantic || suggestion ? 2 : 1, expectedSequenceId);
        }
        session.clearMessages();
    }

    describe("unittests:: tsserver:: with project references and error reporting", () => {
        const dependecyLocation = `${projectRoot}/dependency`;
        const usageLocation = `${projectRoot}/usage`;

        function verifyErrorsUsingGeterr({ allFiles, openFiles, expectedGetErr }: VerifyScenario) {
            it("verifies the errors in open file", () => {
                const host = createServerHost([...allFiles(), libFile]);
                const session = createSession(host, { canUseEvents: true, });
                openFilesForSession(openFiles(), session);

                verifyGetErrRequest({ session, host, expected: expectedGetErr() });
            });
        }

        function verifyErrorsUsingGeterrForProject({ allFiles, openFiles, expectedGetErrForProject }: VerifyScenario) {
            it("verifies the errors in projects", () => {
                const host = createServerHost([...allFiles(), libFile]);
                const session = createSession(host, { canUseEvents: true, });
                openFilesForSession(openFiles(), session);

                session.clearMessages();
                for (const expected of expectedGetErrForProject()) {
                    const expectedSequenceId = session.getNextSeq();
                    session.executeCommandSeq<protocol.GeterrForProjectRequest>({
                        command: protocol.CommandTypes.GeterrForProject,
                        arguments: {
                            delay: 0,
                            file: expected.project
                        }
                    });

                    checkAllErrors({ session, host, expected: expected.errors, expectedSequenceId });
                }
            });
        }

        function verifyErrorsUsingSyncMethods({ allFiles, openFiles, expectedSyncDiagnostics }: VerifyScenario) {
            it("verifies the errors using sync commands", () => {
                const host = createServerHost([...allFiles(), libFile]);
                const session = createSession(host);
                openFilesForSession(openFiles(), session);
                for (const { file, project, syntax, semantic, suggestion } of expectedSyncDiagnostics()) {
                    const actualSyntax = session.executeCommandSeq<protocol.SyntacticDiagnosticsSyncRequest>({
                        command: protocol.CommandTypes.SyntacticDiagnosticsSync,
                        arguments: {
                            file: filePath(file),
                            projectFileName: project
                        }
                    }).response as protocol.Diagnostic[];
                    assert.deepEqual(actualSyntax, syntax, `Syntax diagnostics for file: ${filePath(file)}, project: ${project}`);
                    const actualSemantic = session.executeCommandSeq<protocol.SemanticDiagnosticsSyncRequest>({
                        command: protocol.CommandTypes.SemanticDiagnosticsSync,
                        arguments: {
                            file: filePath(file),
                            projectFileName: project
                        }
                    }).response as protocol.Diagnostic[];
                    assert.deepEqual(actualSemantic, semantic, `Semantic diagnostics for file: ${filePath(file)}, project: ${project}`);
                    const actualSuggestion = session.executeCommandSeq<protocol.SuggestionDiagnosticsSyncRequest>({
                        command: protocol.CommandTypes.SuggestionDiagnosticsSync,
                        arguments: {
                            file: filePath(file),
                            projectFileName: project
                        }
                    }).response as protocol.Diagnostic[];
                    assert.deepEqual(actualSuggestion, suggestion, `Suggestion diagnostics for file: ${filePath(file)}, project: ${project}`);
                }
            });
        }

        function verifyConfigFileErrors({ allFiles, openFiles, expectedConfigFileDiagEvents }: VerifyScenario) {
            it("verify config file errors", () => {
                const host = createServerHost([...allFiles(), libFile]);
                const { session, events } = createSessionWithEventTracking<server.ConfigFileDiagEvent>(host, server.ConfigFileDiagEvent);

                for (const file of openFiles()) {
                    session.executeCommandSeq<protocol.OpenRequest>({
                        command: protocol.CommandTypes.Open,
                        arguments: { file: file.path }
                    });
                }

                assert.deepEqual(events, expectedConfigFileDiagEvents().map(data => ({
                    eventName: server.ConfigFileDiagEvent,
                    data
                })));
            });
        }

        interface GetErrForProjectDiagnostics {
            project: string;
            errors: readonly GetErrDiagnostics[];
        }
        interface SyncDiagnostics extends GetErrDiagnostics {
            project?: string;
        }
        interface VerifyScenario {
            allFiles: () => readonly File[];
            openFiles: () => readonly File[];
            expectedGetErr: () => readonly GetErrDiagnostics[];
            expectedGetErrForProject: () => readonly GetErrForProjectDiagnostics[];
            expectedSyncDiagnostics: () => readonly SyncDiagnostics[];
            expectedConfigFileDiagEvents: () => readonly server.ConfigFileDiagEvent["data"][];
        }
        function verifyScenario(scenario: VerifyScenario) {
            verifyErrorsUsingGeterr(scenario);
            verifyErrorsUsingGeterrForProject(scenario);
            verifyErrorsUsingSyncMethods(scenario);
            verifyConfigFileErrors(scenario);
        }

        function emptyDiagnostics(file: File): GetErrDiagnostics {
            return {
                file,
                syntax: emptyArray,
                semantic: emptyArray,
                suggestion: emptyArray
            };
        }

        function syncDiagnostics(diagnostics: GetErrDiagnostics, project: string): SyncDiagnostics {
            return { project, ...diagnostics };
        }

        interface VerifyUsageAndDependency {
            allFiles: readonly [File, File, File, File]; // dependencyTs, dependencyConfig, usageTs, usageConfig
            usageDiagnostics(): GetErrDiagnostics;
            dependencyDiagnostics(): GetErrDiagnostics;

        }
        function verifyUsageAndDependency({ allFiles, usageDiagnostics, dependencyDiagnostics }: VerifyUsageAndDependency) {
            const [dependencyTs, dependencyConfig, usageTs, usageConfig] = allFiles;
            function usageProjectDiagnostics(): GetErrForProjectDiagnostics {
                return {
                    project: usageTs.path,
                    errors: [
                        usageDiagnostics(),
                        emptyDiagnostics(dependencyTs)
                    ]
                };
            }

            function dependencyProjectDiagnostics(): GetErrForProjectDiagnostics {
                return {
                    project: dependencyTs.path,
                    errors: [
                        dependencyDiagnostics()
                    ]
                };
            }

            function usageConfigDiag(): server.ConfigFileDiagEvent["data"] {
                return {
                    triggerFile: usageTs.path,
                    configFileName: usageConfig.path,
                    diagnostics: emptyArray
                };
            }

            function dependencyConfigDiag(): server.ConfigFileDiagEvent["data"] {
                return {
                    triggerFile: dependencyTs.path,
                    configFileName: dependencyConfig.path,
                    diagnostics: emptyArray
                };
            }

            describe("when dependency project is not open", () => {
                verifyScenario({
                    allFiles: () => allFiles,
                    openFiles: () => [usageTs],
                    expectedGetErr: () => [
                        usageDiagnostics()
                    ],
                    expectedGetErrForProject: () => [
                        usageProjectDiagnostics(),
                        {
                            project: dependencyTs.path,
                            errors: [
                                emptyDiagnostics(dependencyTs),
                                usageDiagnostics()
                            ]
                        }
                    ],
                    expectedSyncDiagnostics: () => [
                        // Without project
                        usageDiagnostics(),
                        emptyDiagnostics(dependencyTs),
                        // With project
                        syncDiagnostics(usageDiagnostics(), usageConfig.path),
                        syncDiagnostics(emptyDiagnostics(dependencyTs), usageConfig.path),
                    ],
                    expectedConfigFileDiagEvents: () => [
                        usageConfigDiag()
                    ],
                });
            });

            describe("when the depedency file is open", () => {
                verifyScenario({
                    allFiles: () => allFiles,
                    openFiles: () => [usageTs, dependencyTs],
                    expectedGetErr: () => [
                        usageDiagnostics(),
                        dependencyDiagnostics(),
                    ],
                    expectedGetErrForProject: () => [
                        usageProjectDiagnostics(),
                        dependencyProjectDiagnostics()
                    ],
                    expectedSyncDiagnostics: () => [
                        // Without project
                        usageDiagnostics(),
                        dependencyDiagnostics(),
                        // With project
                        syncDiagnostics(usageDiagnostics(), usageConfig.path),
                        syncDiagnostics(emptyDiagnostics(dependencyTs), usageConfig.path),
                        syncDiagnostics(dependencyDiagnostics(), dependencyConfig.path),
                    ],
                    expectedConfigFileDiagEvents: () => [
                        usageConfigDiag(),
                        dependencyConfigDiag()
                    ],
                });
            });
        }

        describe("with module scenario", () => {
            const dependencyTs: File = {
                path: `${dependecyLocation}/fns.ts`,
                content: `export function fn1() { }
export function fn2() { }
// Introduce error for fnErr import in main
// export function fnErr() { }
// Error in dependency ts file
export let x: string = 10;`
            };
            const dependencyConfig: File = {
                path: `${dependecyLocation}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { composite: true, declarationDir: "../decls" } })
            };
            const usageTs: File = {
                path: `${usageLocation}/usage.ts`,
                content: `import {
    fn1,
    fn2,
    fnErr
} from '../decls/fns'
fn1();
fn2();
fnErr();
`
            };
            const usageConfig: File = {
                path: `${usageLocation}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { composite: true },
                    references: [{ path: "../dependency" }]
                })
            };
            function usageDiagnostics(): GetErrDiagnostics {
                return {
                    file: usageTs,
                    syntax: emptyArray,
                    semantic: [
                        createDiagnostic(
                            { line: 4, offset: 5 },
                            { line: 4, offset: 10 },
                            Diagnostics.Module_0_has_no_exported_member_1,
                            [`"../dependency/fns"`, "fnErr"],
                            "error",
                        )
                    ],
                    suggestion: emptyArray
                };
            }

            function dependencyDiagnostics(): GetErrDiagnostics {
                return {
                    file: dependencyTs,
                    syntax: emptyArray,
                    semantic: [
                        createDiagnostic(
                            { line: 6, offset: 12 },
                            { line: 6, offset: 13 },
                            Diagnostics.Type_0_is_not_assignable_to_type_1,
                            ["10", "string"],
                            "error",
                        )
                    ],
                    suggestion: emptyArray
                };
            }

            verifyUsageAndDependency({
                allFiles: [dependencyTs, dependencyConfig, usageTs, usageConfig],
                usageDiagnostics,
                dependencyDiagnostics
            });
        });

        describe("with non module --out", () => {
            const dependencyTs: File = {
                path: `${dependecyLocation}/fns.ts`,
                content: `function fn1() { }
function fn2() { }
// Introduce error for fnErr import in main
// function fnErr() { }
// Error in dependency ts file
let x: string = 10;`
            };
            const dependencyConfig: File = {
                path: `${dependecyLocation}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { composite: true, outFile: "../dependency.js" } })
            };
            const usageTs: File = {
                path: `${usageLocation}/usage.ts`,
                content: `fn1();
fn2();
fnErr();
`
            };
            const usageConfig: File = {
                path: `${usageLocation}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { composite: true, outFile: "../usage.js" },
                    references: [{ path: "../dependency" }]
                })
            };
            function usageDiagnostics(): GetErrDiagnostics {
                return {
                    file: usageTs,
                    syntax: emptyArray,
                    semantic: [
                        createDiagnostic(
                            { line: 3, offset: 1 },
                            { line: 3, offset: 6 },
                            Diagnostics.Cannot_find_name_0,
                            ["fnErr"],
                            "error",
                        )
                    ],
                    suggestion: emptyArray
                };
            }

            function dependencyDiagnostics(): GetErrDiagnostics {
                return {
                    file: dependencyTs,
                    syntax: emptyArray,
                    semantic: [
                        createDiagnostic(
                            { line: 6, offset: 5 },
                            { line: 6, offset: 6 },
                            Diagnostics.Type_0_is_not_assignable_to_type_1,
                            ["10", "string"],
                            "error",
                        )
                    ],
                    suggestion: emptyArray
                };
            }

            verifyUsageAndDependency({
                allFiles: [dependencyTs, dependencyConfig, usageTs, usageConfig],
                usageDiagnostics,
                dependencyDiagnostics
            });
        });
    });
}
