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

        const localChange = "function fn3() { }";
        const change = `export ${localChange}`;
        const changeJs = `function fn3() { }
exports.fn3 = fn3;`;
        const changeDts = "export declare function fn3(): void;";

        function expectedAffectedFiles(config: File, fileNames: readonly File[]): protocol.CompileOnSaveAffectedFileListSingleProject {
            return {
                projectFileName: config.path,
                fileNames: fileNames.map(f => f.path),
                projectUsesOutFile: false
            };
        }

        function expectedUsageEmitFiles(appendJsText?: string): readonly File[] {
            const appendJs = appendJsText ? `${appendJsText}
` : "";
            return [{
                path: `${usageLocation}/usage.js`,
                content: `"use strict";
exports.__esModule = true;${appendJsText === changeJs ? "\nexports.fn3 = void 0;" : ""}
var fns_1 = require("../decls/fns");
(0, fns_1.fn1)();
(0, fns_1.fn2)();
${appendJs}`
            }];
        }

        function expectedEmitOutput(expectedFiles: readonly File[]): EmitOutput {
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

        function noEmitOutput(): EmitOutput {
            return {
                emitSkipped: true,
                outputFiles: [],
                diagnostics: emptyArray
            };
        }

        function expectedDependencyEmitFiles(appendJsText?: string, appendDtsText?: string): readonly File[] {
            const appendJs = appendJsText ? `${appendJsText}
` : "";
            const appendDts = appendDtsText ? `${appendDtsText}
` : "";
            return [
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
            ];
        }

        describe("when dependency project is not open", () => {
            describe("Of usageTs", () => {
                it("with initial file open, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with initial file open, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with local change to dependency, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    host.writeFile(dependencyTs.path, `${dependencyTs.content}${localChange}`);
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with local change to dependency, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    host.writeFile(dependencyTs.path, `${dependencyTs.content}${localChange}`);
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with local change to usage, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles(localChange);
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with local change to usage, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles(localChange);
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with change to dependency, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    host.writeFile(dependencyTs.path, `${dependencyTs.content}${change}`);
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with change to dependency, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    host.writeFile(dependencyTs.path, `${dependencyTs.content}${change}`);
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with change to usage, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles(changeJs);
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with change to usage, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles(changeJs);
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
            });

            describe("Of dependencyTs in usage project", () => {
                it("with initial file open, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with initial file open, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with local change to dependency, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    host.writeFile(dependencyTs.path, `${dependencyTs.content}${localChange}`);
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, emptyArray)
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with local change to dependency, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    host.writeFile(dependencyTs.path, `${dependencyTs.content}${localChange}`);
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, emptyArray)
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with local change to usage, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, emptyArray)
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with local change to usage, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, emptyArray)
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with change to dependency, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    host.writeFile(dependencyTs.path, `${dependencyTs.content}${change}`);
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with change to dependency, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    host.writeFile(dependencyTs.path, `${dependencyTs.content}${change}`);
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with change to usage, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, emptyArray)
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with change to usage, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, emptyArray)
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
            });
        });

        describe("when the depedency file is open", () => {
            describe("Of usageTs", () => {
                it("with initial file open, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with initial file open, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with local change to dependency, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(dependencyTs.content);
                    const location = toLocation(dependencyTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with local change to dependency, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(dependencyTs.content);
                    const location = toLocation(dependencyTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with local change to usage, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles(localChange);
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with local change to usage, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles(localChange);
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with change to dependency, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(dependencyTs.content);
                    const location = toLocation(dependencyTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with change to dependency, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(dependencyTs.content);
                    const location = toLocation(dependencyTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with change to usage, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles(changeJs);
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with change to usage, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedUsageEmitFiles(changeJs);
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: usageTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
            });

            describe("Of dependencyTs in usage project", () => {
                it("with initial file open, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with local change to dependency, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(dependencyTs.content);
                    const location = toLocation(dependencyTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, emptyArray)
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with local change to usage, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, emptyArray)
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with change to dependency, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(dependencyTs.content);
                    const location = toLocation(dependencyTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
                it("with change to usage, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, emptyArray)
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response;
                    assert.isFalse(actualEmit, "Emit files");
                    assert.equal(host.writtenFiles.size, 0);

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: usageConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, noEmitOutput(), "Emit output");
                });
            });

            describe("Of dependencyTs", () => {
                it("with initial file open, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs]),
                        expectedAffectedFiles(dependencyConfig, [dependencyTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedDependencyEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with initial file open, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(dependencyConfig, [dependencyTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedDependencyEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with local change to dependency, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(dependencyTs.content);
                    const location = toLocation(dependencyTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, emptyArray),
                        expectedAffectedFiles(dependencyConfig, [dependencyTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedDependencyEmitFiles(localChange);
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with local change to dependency, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(dependencyTs.content);
                    const location = toLocation(dependencyTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(dependencyConfig, [dependencyTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedDependencyEmitFiles(localChange);
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with local change to usage, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, emptyArray),
                        expectedAffectedFiles(dependencyConfig, [dependencyTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedDependencyEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with local change to usage, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: localChange
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(dependencyConfig, [dependencyTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedDependencyEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with change to dependency, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(dependencyTs.content);
                    const location = toLocation(dependencyTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, [usageTs]),
                        expectedAffectedFiles(dependencyConfig, [dependencyTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedDependencyEmitFiles(changeJs, changeDts);
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with change to dependency, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(dependencyTs.content);
                    const location = toLocation(dependencyTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(dependencyConfig, [dependencyTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedDependencyEmitFiles(changeJs, changeDts);
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with change to usage, without specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(usageConfig, emptyArray),
                        expectedAffectedFiles(dependencyConfig, [dependencyTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedDependencyEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
                it("with change to usage, with specifying project file", () => {
                    const host = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                        createServerHost([dependencyTs, dependencyConfig, usageTs, usageConfig, libFile])
                    );
                    const session = createSession(host);
                    openFilesForSession([usageTs, dependencyTs], session);

                    session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path }
                    });
                    const toLocation = protocolToLocation(usageTs.content);
                    const location = toLocation(usageTs.content.length);
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: usageTs.path,
                            ...location,
                            endLine: location.line,
                            endOffset: location.offset,
                            insertString: change
                        }
                    });
                    host.writtenFiles.clear();

                    // Verify CompileOnSaveAffectedFileList
                    const actualAffectedFiles = session.executeCommandSeq<protocol.CompileOnSaveAffectedFileListRequest>({
                        command: protocol.CommandTypes.CompileOnSaveAffectedFileList,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response as protocol.CompileOnSaveAffectedFileListSingleProject[];
                    assert.deepEqual(actualAffectedFiles, [
                        expectedAffectedFiles(dependencyConfig, [dependencyTs])
                    ], "Affected files");

                    // Verify CompileOnSaveEmit
                    const actualEmit = session.executeCommandSeq<protocol.CompileOnSaveEmitFileRequest>({
                        command: protocol.CommandTypes.CompileOnSaveEmitFile,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response;
                    assert.isTrue(actualEmit, "Emit files");
                    const expectedFiles = expectedDependencyEmitFiles();
                    assert.equal(host.writtenFiles.size, expectedFiles.length);
                    for (const file of expectedFiles) {
                        assert.equal(host.readFile(file.path), file.content, `Expected to write ${file.path}`);
                        assert.isTrue(host.writtenFiles.has(file.path as Path), `${file.path} is newly written`);
                    }

                    // Verify EmitOutput
                    const { exportedModulesFromDeclarationEmit: _1, ...actualEmitOutput } = session.executeCommandSeq<protocol.EmitOutputRequest>({
                        command: protocol.CommandTypes.EmitOutput,
                        arguments: { file: dependencyTs.path, projectFileName: dependencyConfig.path }
                    }).response as EmitOutput;
                    assert.deepEqual(actualEmitOutput, expectedEmitOutput(expectedFiles), "Emit output");
                });
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