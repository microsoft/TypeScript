namespace ts.projectSystem {
    describe("unittests:: tsserver:: with project references and compile on save", () => {
        const dependecyLocation = `${tscWatch.projectRoot}/dependency`;
        const usageLocation = `${tscWatch.projectRoot}/usage`;
        const dependencyTs: File = {
            path: `${dependecyLocation}/fns.ts`,
            content: `export function fn1() { }
export function fn2() { }
`
        };
        const dependencyConfig: File = {
            path: `${dependecyLocation}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: { composite: true, declarationDir: "../decls" },
                compileOnSave: true
            })
        };
        const usageTs: File = {
            path: `${usageLocation}/usage.ts`,
            content: `import {
    fn1,
    fn2,
} from '../decls/fns'
fn1();
fn2();
`
        };
        const usageConfig: File = {
            path: `${usageLocation}/tsconfig.json`,
            content: JSON.stringify({
                compileOnSave: true,
                references: [{ path: "../dependency" }]
            })
        };

        interface VerifySingleScenarioWorker extends VerifySingleScenario {
            withProject: boolean;
        }
        function verifySingleScenarioWorker({
            withProject, scenario, openFiles, requestArgs, change, expectedResult
        }: VerifySingleScenarioWorker) {
            it(scenario, () => {
                const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                    createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                );
                const session = createSession(host);
                openFilesForSession(openFiles(), session);
                const reqArgs = requestArgs();
                const {
                    expectedAffected,
                    expectedEmit: { expectedEmitSuccess, expectedFiles },
                    expectedEmitOutput
                } = expectedResult(withProject);

                if (change) {
                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const { file, insertString } = change();
                    if (session.getProjectService().openFiles.has(file.path)) {
                        const toLocation = protocolToLocation(file.content);
                        const location = toLocation(file.content.length);
                        session.executeCommandSeq<protocol.ChangeRequest>({
                            command: protocol.CommandTypes.Change,
                            arguments: {
                                file: file.path,
                                ...location,
                                endLine: location.line,
                                endOffset: location.offset,
                                insertString
                            }
                        });
                    }
                    else {
                        host.writeFile(file.path, `${file.content}${insertString}`);
                    }
                    host.writtenFiles.clear();
                }

                const args = withProject ? reqArgs : { file: reqArgs.file };
                // Verify CompileOnSaveAffectedFileList
                const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                    command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                    arguments: args
                }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                assert.deepEqual(actualAffectedFiles, expectedAffected, "Affected files");

                // Verify CompileOnSaveEmit
                const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                    command: protocol.CommandTypes.CompileOnSaveEmitFile,
                    arguments: args
                }).response;
                assert.deepEqual(actualEmit, expectedEmitSuccess, "Emit files");
                assert.equal(host.writtenFiles.size, expectedFiles.length);
                for (const file of expectedFiles) {
                    assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                    assert.isTrue(host.writtenFiles.has(file.path), `${file.path} is newly written`);
                }

                // Verify EmitOutput
                const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                    command: protocol.CommandTypes.EmitOutput,
                    arguments: args
                }).response as EmitOutput;
                assert.deepEqual(actualEmitOutput, expectedEmitOutput, "Emit output");
            });
        }

        interface VerifySingleScenario {
            scenario: string;
            openFiles: () => readonly File[];
            requestArgs: () => protocol.FileRequestArgs;
            skipWithoutProject?: boolean;
            change?: () => SingleScenarioChange;
            expectedResult: GetSingleScenarioResult;
        }
        function verifySingleScenario(scenario: VerifySingleScenario) {
            if (!scenario.skipWithoutProject) {
                describe("without specifying project file", () => {
                    verifySingleScenarioWorker({
                        withProject: false,
                        ...scenario
                    });
                });
            }
            describe("with specifying project file", () => {
                verifySingleScenarioWorker({
                    withProject: true,
                    ...scenario
                });
            });
        }

        interface SingleScenarioExpectedEmit {
            expectedEmitSuccess: boolean;
            expectedFiles: readonly File[];
        }
        interface SingleScenarioResult {
            expectedAffected: protocol.CompileOnSaveAffectedFileListSingleProject[];
            expectedEmit: SingleScenarioExpectedEmit;
            expectedEmitOutput: EmitOutput;
        }
        type GetSingleScenarioResult = (withProject: boolean) => SingleScenarioResult;
        interface SingleScenarioChange {
            file: File;
            insertString: string;
        }
        interface ScenarioDetails {
            scenarioName: string;
            requestArgs: () => protocol.FileRequestArgs;
            skipWithoutProject?: boolean;
            initial: GetSingleScenarioResult;
            localChangeToDependency: GetSingleScenarioResult;
            localChangeToUsage: GetSingleScenarioResult;
            changeToDependency: GetSingleScenarioResult;
            changeToUsage: GetSingleScenarioResult;
        }
        interface VerifyScenario {
            openFiles: () => readonly File[];
            scenarios: readonly ScenarioDetails[];
        }

        const localChange = "function fn3() { }";
        const change = `export ${localChange}`;
        const changeJs = `function fn3() { }
exports.fn3 = fn3;`;
        const changeDts = "export declare function fn3(): void;";
        function verifyScenario({ openFiles, scenarios }: VerifyScenario) {
            for (const {
                scenarioName, requestArgs, skipWithoutProject, initial,
                localChangeToDependency, localChangeToUsage,
                changeToDependency, changeToUsage
            } of scenarios) {
                describe(scenarioName, () => {
                    verifySingleScenario({
                        scenario: "with initial file open",
                        openFiles,
                        requestArgs,
                        skipWithoutProject,
                        expectedResult: initial
                    });

                    verifySingleScenario({
                        scenario: "with local change to dependency",
                        openFiles,
                        requestArgs,
                        skipWithoutProject,
                        change: () => ({ file: dependencyTs, insertString: localChange }),
                        expectedResult: localChangeToDependency
                    });

                    verifySingleScenario({
                        scenario: "with local change to usage",
                        openFiles,
                        requestArgs,
                        skipWithoutProject,
                        change: () => ({ file: usageTs, insertString: localChange }),
                        expectedResult: localChangeToUsage
                    });

                    verifySingleScenario({
                        scenario: "with change to dependency",
                        openFiles,
                        requestArgs,
                        skipWithoutProject,
                        change: () => ({ file: dependencyTs, insertString: change }),
                        expectedResult: changeToDependency
                    });

                    verifySingleScenario({
                        scenario: "with change to usage",
                        openFiles,
                        requestArgs,
                        skipWithoutProject,
                        change: () => ({ file: usageTs, insertString: change }),
                        expectedResult: changeToUsage
                    });
                });
            }
        }

        function expectedAffectedFiles(config: File, fileNames: File[]): protocol.CompileOnSaveAffectedFileListSingleProject {
            return {
                projectFileName: config.path,
                fileNames: fileNames.map(f => f.path),
                projectUsesOutFile: false
            };
        }

        function expectedUsageEmit(appendJsText?: string): SingleScenarioExpectedEmit {
            const appendJs = appendJsText ? `${appendJsText}
` : "";
            return {
                expectedEmitSuccess: true,
                expectedFiles: [{
                    path: `${usageLocation}/usage.js`,
                    content: `"use strict";
exports.__esModule = true;${appendJsText === changeJs ? "\nexports.fn3 = void 0;" : ""}
var fns_1 = require("../decls/fns");
fns_1.fn1();
fns_1.fn2();
${appendJs}`
                }]
            };
        }

        function expectedEmitOutput({ expectedFiles }: SingleScenarioExpectedEmit): EmitOutput {
            return {
                outputFiles: expectedFiles.map(({ path, content }) => ({
                    name: path,
                    text: content,
                    writeByteOrderMark: false
                })),
                emitSkipped: false,
                diagnostics: emptyArray
            };
        }

        function expectedUsageEmitOutput(appendJsText?: string): EmitOutput {
            return expectedEmitOutput(expectedUsageEmit(appendJsText));
        }

        function noEmit(): SingleScenarioExpectedEmit {
            return {
                expectedEmitSuccess: false,
                expectedFiles: emptyArray
            };
        }

        function noEmitOutput(): EmitOutput {
            return {
                emitSkipped: true,
                outputFiles: [],
                diagnostics: emptyArray
            };
        }

        function expectedDependencyEmit(appendJsText?: string, appendDtsText?: string): SingleScenarioExpectedEmit {
            const appendJs = appendJsText ? `${appendJsText}
` : "";
            const appendDts = appendDtsText ? `${appendDtsText}
` : "";
            return {
                expectedEmitSuccess: true,
                expectedFiles: [
                    {
                        path: `${dependecyLocation}/fns.js`,
                        content: `"use strict";
exports.__esModule = true;
${appendJsText === changeJs ? "exports.fn3 = " : ""}exports.fn2 = exports.fn1 = void 0;
function fn1() { }
exports.fn1 = fn1;
function fn2() { }
exports.fn2 = fn2;
${appendJs}`
                    },
                    {
                        path: `${tscWatch.projectRoot}/decls/fns.d.ts`,
                        content: `export declare function fn1(): void;
export declare function fn2(): void;
${appendDts}`
                    }
                ]
            };
        }

        function expectedDependencyEmitOutput(appendJsText?: string, appendDtsText?: string): EmitOutput {
            return expectedEmitOutput(expectedDependencyEmit(appendJsText, appendDtsText));
        }

        function scenarioDetailsOfUsage(isDependencyOpen?: boolean): ScenarioDetails[] {
            return [
                {
                    scenarioName: "Of usageTs",
                    requestArgs: () => ({ file: usageTs.path, projectFileName: usageConfig.path }),
                    initial: () => initialUsageTs(),
                    // no change to usage so same as initial only usage file
                    localChangeToDependency: () => initialUsageTs(),
                    localChangeToUsage: () => initialUsageTs(localChange),
                    changeToDependency: () => initialUsageTs(),
                    changeToUsage: () => initialUsageTs(changeJs)
                },
                {
                    scenarioName: "Of dependencyTs in usage project",
                    requestArgs: () => ({ file: dependencyTs.path, projectFileName: usageConfig.path }),
                    skipWithoutProject: !!isDependencyOpen,
                    initial: () => initialDependencyTs(),
                    localChangeToDependency: () => initialDependencyTs(/*noUsageFiles*/ true),
                    localChangeToUsage: () => initialDependencyTs(/*noUsageFiles*/ true),
                    changeToDependency: () => initialDependencyTs(),
                    changeToUsage: () => initialDependencyTs(/*noUsageFiles*/ true)
                }
            ];

            function initialUsageTs(jsText?: string) {
                return {
                    expectedAffected: [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ],
                    expectedEmit: expectedUsageEmit(jsText),
                    expectedEmitOutput: expectedUsageEmitOutput(jsText)
                };
            }

            function initialDependencyTs(noUsageFiles?: true) {
                return {
                    expectedAffected: [
                        expectedAffectedFiles(usageConfig, noUsageFiles ? [] : [usageTs])
                    ],
                    expectedEmit: noEmit(),
                    expectedEmitOutput: noEmitOutput()
                };
            }
        }

        function scenarioDetailsOfDependencyWhenOpen(): ScenarioDetails {
            return {
                scenarioName: "Of dependencyTs",
                requestArgs: () => ({ file: dependencyTs.path, projectFileName: dependencyConfig.path }),
                initial,
                localChangeToDependency: withProject => ({
                    expectedAffected: withProject ?
                        [
                            expectedAffectedFiles(dependencyConfig, [dependencyTs])
                        ] :
                        [
                            expectedAffectedFiles(usageConfig, []),
                            expectedAffectedFiles(dependencyConfig, [dependencyTs])
                        ],
                    expectedEmit: expectedDependencyEmit(localChange),
                    expectedEmitOutput: expectedDependencyEmitOutput(localChange)
                }),
                localChangeToUsage: withProject => initial(withProject, /*noUsageFiles*/ true),
                changeToDependency: withProject => initial(withProject, /*noUsageFiles*/ undefined, changeJs, changeDts),
                changeToUsage: withProject => initial(withProject, /*noUsageFiles*/ true)
            };

            function initial(withProject: boolean, noUsageFiles?: true, appendJs?: string, appendDts?: string): SingleScenarioResult {
                return {
                    expectedAffected: withProject ?
                        [
                            expectedAffectedFiles(dependencyConfig, [dependencyTs])
                        ] :
                        [
                            expectedAffectedFiles(usageConfig, noUsageFiles ? [] : [usageTs]),
                            expectedAffectedFiles(dependencyConfig, [dependencyTs])
                        ],
                    expectedEmit: expectedDependencyEmit(appendJs, appendDts),
                    expectedEmitOutput: expectedDependencyEmitOutput(appendJs, appendDts)
                };
            }
        }

        describe("when dependency project is not open", () => {
            verifyScenario({
                openFiles: () => [usageTs],
                scenarios: scenarioDetailsOfUsage()
            });
        });

        describe("when the depedency file is open", () => {
            verifyScenario({
                openFiles: () => [usageTs, dependencyTs],
                scenarios: [
                    ...scenarioDetailsOfUsage(/*isDependencyOpen*/ true),
                    scenarioDetailsOfDependencyWhenOpen(),
                ]
            });
        });
    });

    describe("unittests:: tsserver:: with project references and compile on save with external projects", () => {
        it("compile on save emits same output as project build", () => {
            const tsbaseJson: File = {
                path: `${tscWatch.projectRoot}/tsbase.json`,
                content: JSON.stringify({
                    compileOnSave: true,
                    compilerOptions: {
                        module: "none",
                        composite: true
                    }
                })
            };
            const buttonClass = `${tscWatch.projectRoot}/buttonClass`;
            const buttonConfig: File = {
                path: `${buttonClass}/tsconfig.json`,
                content: JSON.stringify({
                    extends: "../tsbase.json",
                    compilerOptions: {
                        outFile: "Source.js"
                    },
                    files: ["Source.ts"]
                })
            };
            const buttonSource: File = {
                path: `${buttonClass}/Source.ts`,
                content: `module Hmi {
    export class Button {
        public static myStaticFunction() {
        }
    }
}`
            };

            const siblingClass = `${tscWatch.projectRoot}/SiblingClass`;
            const siblingConfig: File = {
                path: `${siblingClass}/tsconfig.json`,
                content: JSON.stringify({
                    extends: "../tsbase.json",
                    references: [{
                        path: "../buttonClass/"
                    }],
                    compilerOptions: {
                        outFile: "Source.js"
                    },
                    files: ["Source.ts"]
                })
            };
            const siblingSource: File = {
                path: `${siblingClass}/Source.ts`,
                content: `module Hmi {
    export class Sibling {
        public mySiblingFunction() {
        }
    }
}`
            };
            const host = createServerHost([libFile, tsbaseJson, buttonConfig, buttonSource, siblingConfig, siblingSource], { useCaseSensitiveFileNames: true });

            // ts build should succeed
            tscWatch.ensureErrorFreeBuild(host, [siblingConfig.path]);
            const sourceJs = changeExtension(siblingSource.path, ".js");
            const expectedSiblingJs = host.readFile(sourceJs);

            const session = createSession(host);
            openFilesForSession([siblingSource], session);

            session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                command: protocol.CommandTypes.CompileOnSaveEmitFile,
                arguments: {
                    file: siblingSource.path,
                    projectFileName: siblingConfig.path
                }
            });
            assert.equal(host.readFile(sourceJs), expectedSiblingJs);
        });
    });
}
