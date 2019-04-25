namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: emit file --incremental", () => {
        const project = "/users/username/projects/project";

        const configFile: File = {
            path: `${project}/tsconfig.json`,
            content: JSON.stringify({ compilerOptions: { incremental: true } })
        };

        interface VerifyIncrementalWatchEmitInput {
            files: ReadonlyArray<File>;
            expectedInitialEmit: ReadonlyArray<File>;
            expectedInitialErrors: ReadonlyArray<string>;
            modifyFs?: (host: WatchedSystem) => void;
            expectedIncrementalEmit?: ReadonlyArray<File>;
            expectedIncrementalErrors?: ReadonlyArray<string>;
        }
        function verifyIncrementalWatchEmit(input: VerifyIncrementalWatchEmitInput) {
            it("with tsc --w", () => {
                verifyIncrementalWatchEmitWorker({
                    input,
                    emitAndReportErrors: createWatchOfConfigFile,
                    verifyErrors: checkOutputErrorsInitial
                });
            });
            it("with tsc", () => {
                verifyIncrementalWatchEmitWorker({
                    input,
                    emitAndReportErrors: incrementalBuild,
                    verifyErrors: checkNormalBuildErrors
                });
            });
        }

        function incrementalBuild(configFile: string, host: WatchedSystem) {
            const reportDiagnostic = createDiagnosticReporter(host);
            const config = parseConfigFileWithSystem(configFile, {}, host, reportDiagnostic);
            if (config) {
                performIncrementalCompilation({
                    rootNames: config.fileNames,
                    options: config.options,
                    projectReferences: config.projectReferences,
                    configFileParsingDiagnostics: getConfigFileParsingDiagnostics(config),
                    reportDiagnostic,
                    system: host
                });
            }
            return { close: noop };
        }

        interface VerifyIncrementalWatchEmitWorkerInput {
            input: VerifyIncrementalWatchEmitInput;
            emitAndReportErrors: (configFile: string, host: WatchedSystem) => { close(): void; };
            verifyErrors: (host: WatchedSystem, errors: ReadonlyArray<string>) => void;
        }
        function verifyIncrementalWatchEmitWorker({
            input: {
                files, expectedInitialEmit, expectedInitialErrors, modifyFs, expectedIncrementalEmit, expectedIncrementalErrors
            },
            emitAndReportErrors,
            verifyErrors
        }: VerifyIncrementalWatchEmitWorkerInput) {
            const host = createWatchedSystem(files, { currentDirectory: project });
            const originalWriteFile = host.writeFile;
            const writtenFiles = createMap<string>();
            host.writeFile = (path, content) => {
                assert.isFalse(writtenFiles.has(path));
                writtenFiles.set(path, content);
                originalWriteFile.call(host, path, content);
            };
            verifyBuild({
                host,
                writtenFiles,
                emitAndReportErrors,
                verifyErrors,
                expectedEmit: expectedInitialEmit,
                expectedErrors: expectedInitialErrors
            });
            if (modifyFs) {
                modifyFs(host);
                verifyBuild({
                    host,
                    writtenFiles,
                    emitAndReportErrors,
                    verifyErrors,
                    expectedEmit: Debug.assertDefined(expectedIncrementalEmit),
                    expectedErrors: Debug.assertDefined(expectedIncrementalErrors)
                });
            }
        }

        interface VerifyBuildWorker {
            host: WatchedSystem;
            writtenFiles: Map<string>;
            emitAndReportErrors: VerifyIncrementalWatchEmitWorkerInput["emitAndReportErrors"];
            verifyErrors: VerifyIncrementalWatchEmitWorkerInput["verifyErrors"];
            expectedEmit: ReadonlyArray<File>;
            expectedErrors: ReadonlyArray<string>;
        }
        function verifyBuild({ host, writtenFiles, emitAndReportErrors, verifyErrors, expectedEmit, expectedErrors }: VerifyBuildWorker) {
            writtenFiles.clear();
            const result = emitAndReportErrors("tsconfig.json", host);
            checkFileEmit(writtenFiles, expectedEmit);
            verifyErrors(host, expectedErrors);
            result.close();
        }

        function checkFileEmit(actual: Map<string>, expected: ReadonlyArray<File>) {
            assert.equal(actual.size, expected.length, `Actual: ${JSON.stringify(arrayFrom(actual.entries()), /*replacer*/ undefined, " ")}\nExpected: ${JSON.stringify(expected, /*replacer*/ undefined, " ")}`);
            expected.forEach(file => assert.equal(actual.get(file.path), file.content, `Emit for ${file.path}`));
        }

        const libFileInfo: BuilderState.FileInfo = {
            version: Harness.mockHash(libFile.content),
            signature: Harness.mockHash(libFile.content)
        };

        describe("non module compilation", () => {
            function getFileInfo(content: string): BuilderState.FileInfo {
                return { version: Harness.mockHash(content), signature: Harness.mockHash(`declare ${content}\n`) };
            }

            const file1: File = {
                path: `${project}/file1.ts`,
                content: "const x = 10;"
            };
            const file2: File = {
                path: `${project}/file2.ts`,
                content: "const y = 20;"
            };
            const file1Js: File = {
                path: `${project}/file1.js`,
                content: "var x = 10;\n"
            };
            const file2Js: File = {
                path: `${project}/file2.js`,
                content: "var y = 20;\n"
            };

            describe("own file emit without errors", () => {
                const modifiedFile2Content = file2.content.replace("y", "z").replace("20", "10");
                verifyIncrementalWatchEmit({
                    files: [libFile, file1, file2, configFile],
                    expectedInitialEmit: [
                        file1Js,
                        file2Js,
                        {
                            path: `${project}/tsconfig.tsbuildinfo`,
                            content: getBuildInfoText({
                                program: {
                                    fileInfos: {
                                        [libFile.path]: libFileInfo,
                                        [file1.path]: getFileInfo(file1.content),
                                        [file2.path]: getFileInfo(file2.content)
                                    },
                                    options: { incremental: true, configFilePath: configFile.path },
                                    referencedMap: {},
                                    exportedModulesMap: {},
                                    semanticDiagnosticsPerFile: [libFile.path, file1.path, file2.path]
                                },
                                version
                            })
                        }
                    ],
                    expectedInitialErrors: emptyArray,
                    modifyFs: host => host.writeFile(file2.path, modifiedFile2Content),
                    expectedIncrementalEmit: [
                        file1Js,
                        { path: file2Js.path, content: file2Js.content.replace("y", "z").replace("20", "10") },
                        {
                            path: `${project}/tsconfig.tsbuildinfo`,
                            content: getBuildInfoText({
                                program: {
                                    fileInfos: {
                                        [libFile.path]: libFileInfo,
                                        [file1.path]: getFileInfo(file1.content),
                                        [file2.path]: getFileInfo(modifiedFile2Content)
                                    },
                                    options: { incremental: true, configFilePath: configFile.path },
                                    referencedMap: {},
                                    exportedModulesMap: {},
                                    semanticDiagnosticsPerFile: [libFile.path, file1.path, file2.path]
                                },
                                version
                            })
                        }
                    ],
                    expectedIncrementalErrors: emptyArray,
                });
            });

            describe("own file emit with errors", () => {
                const fileModified: File = {
                    path: file2.path,
                    content: `const y: string = 20;`
                };
                const file2FileInfo: BuilderState.FileInfo = {
                    version: Harness.mockHash(fileModified.content),
                    signature: Harness.mockHash("declare const y: string;\n")
                };
                const file2ReuasableError: ProgramBuildInfoDiagnostic = [
                    file2.path, [
                        {
                            file: file2.path,
                            start: 6,
                            length: 1,
                            code: Diagnostics.Type_0_is_not_assignable_to_type_1.code,
                            category: Diagnostics.Type_0_is_not_assignable_to_type_1.category,
                            messageText: "Type '20' is not assignable to type 'string'."
                        }
                    ] as ReusableDiagnostic[]
                ];
                const file2Errors = [
                    "file2.ts(1,7): error TS2322: Type '20' is not assignable to type 'string'.\n"
                ];
                const modifiedFile1Content = file1.content.replace("x", "z");
                verifyIncrementalWatchEmit({
                    files: [libFile, file1, fileModified, configFile],
                    expectedInitialEmit: [
                        file1Js,
                        file2Js,
                        {
                            path: `${project}/tsconfig.tsbuildinfo`,
                            content: getBuildInfoText({
                                program: {
                                    fileInfos: {
                                        [libFile.path]: libFileInfo,
                                        [file1.path]: getFileInfo(file1.content),
                                        [file2.path]: file2FileInfo
                                    },
                                    options: { incremental: true, configFilePath: configFile.path },
                                    referencedMap: {},
                                    exportedModulesMap: {},
                                    semanticDiagnosticsPerFile: [
                                        libFile.path,
                                        file1.path,
                                        file2ReuasableError
                                    ]
                                },
                                version
                            })
                        }
                    ],
                    expectedInitialErrors: file2Errors,
                    modifyFs: host => host.writeFile(file1.path, modifiedFile1Content),
                    expectedIncrementalEmit: [
                        { path: file1Js.path, content: file1Js.content.replace("x", "z") },
                        file2Js,
                        {
                            path: `${project}/tsconfig.tsbuildinfo`,
                            content: getBuildInfoText({
                                program: {
                                    fileInfos: {
                                        [libFile.path]: libFileInfo,
                                        [file1.path]: getFileInfo(modifiedFile1Content),
                                        [file2.path]: file2FileInfo
                                    },
                                    options: { incremental: true, configFilePath: configFile.path },
                                    referencedMap: {},
                                    exportedModulesMap: {},
                                    semanticDiagnosticsPerFile: [
                                        libFile.path,
                                        file1.path,
                                        file2ReuasableError
                                    ]
                                },
                                version
                            })
                        }
                    ],
                    expectedIncrementalErrors: file2Errors,
                });
            });

            describe("with --out", () => {
                const config: File = {
                    path: configFile.path,
                    content: JSON.stringify({ compilerOptions: { incremental: true, outFile: "out.js" } })
                };
                const outFile: File = {
                    path: `${project}/out.js`,
                    content: "var x = 10;\nvar y = 20;\n"
                };
                verifyIncrementalWatchEmit({
                    files: [libFile, file1, file2, config],
                    expectedInitialEmit: [
                        outFile,
                        {
                            path: `${project}/out.tsbuildinfo`,
                            content: getBuildInfoText({
                                bundle: {
                                    commonSourceDirectory: `${project}/`,
                                    sourceFiles: [file1.path, file2.path],
                                    js: {
                                        sections: [
                                            { pos: 0, end: outFile.content.length, kind: BundleFileSectionKind.Text }
                                        ]
                                    },
                                },
                                version
                            })
                        }
                    ],
                    expectedInitialErrors: emptyArray
                });
            });
        });

        describe("module compilation", () => {
            function getFileInfo(content: string): BuilderState.FileInfo {
                return {
                    version: Harness.mockHash(content),
                    signature: Harness.mockHash(`${content.replace("export ", "export declare ")}\n`)
                };
            }

            function getEmitContent(varName: string, value: string) {
                return `define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.${varName} = ${value};
});
`;
            }
            const file1: File = {
                path: `${project}/file1.ts`,
                content: "export const x = 10;"
            };
            const file2: File = {
                path: `${project}/file2.ts`,
                content: "export const y = 20;"
            };
            const file1Js: File = {
                path: `${project}/file1.js`,
                content: getEmitContent("x", "10")
            };
            const file2Js: File = {
                path: `${project}/file2.js`,
                content: getEmitContent("y", "20")
            };
            const config: File = {
                path: configFile.path,
                content: JSON.stringify({ compilerOptions: { incremental: true, module: "amd" } })
            };

            describe("own file emit without errors", () => {
                const modifiedFile2Content = file2.content.replace("y", "z").replace("20", "10");
                verifyIncrementalWatchEmit({
                    files: [libFile, file1, file2, config],
                    expectedInitialEmit: [
                        file1Js,
                        file2Js,
                        {
                            path: `${project}/tsconfig.tsbuildinfo`,
                            content: getBuildInfoText({
                                program: {
                                    fileInfos: {
                                        [libFile.path]: libFileInfo,
                                        [file1.path]: getFileInfo(file1.content),
                                        [file2.path]: getFileInfo(file2.content)
                                    },
                                    options: { incremental: true, module: ModuleKind.AMD, configFilePath: configFile.path },
                                    referencedMap: {},
                                    exportedModulesMap: {},
                                    semanticDiagnosticsPerFile: [libFile.path, file1.path, file2.path]
                                },
                                version
                            })
                        }
                    ],
                    expectedInitialErrors: emptyArray,
                    modifyFs: host => host.writeFile(file2.path, modifiedFile2Content),
                    expectedIncrementalEmit: [
                        { path: `${project}/file2.js`, content: getEmitContent("z", "10") },
                        {
                            path: `${project}/tsconfig.tsbuildinfo`,
                            content: getBuildInfoText({
                                program: {
                                    fileInfos: {
                                        [libFile.path]: libFileInfo,
                                        [file1.path]: getFileInfo(file1.content),
                                        [file2.path]: getFileInfo(modifiedFile2Content)
                                    },
                                    options: { incremental: true, module: ModuleKind.AMD, configFilePath: configFile.path },
                                    referencedMap: {},
                                    exportedModulesMap: {},
                                    semanticDiagnosticsPerFile: [libFile.path, file1.path, file2.path]
                                },
                                version
                            })
                        }
                    ],
                    expectedIncrementalErrors: emptyArray,
                });
            });

            describe("own file emit with errors", () => {
                const fileModified: File = {
                    path: file2.path,
                    content: `export const y: string = 20;`
                };
                const file2FileInfo: BuilderState.FileInfo = {
                    version: Harness.mockHash(fileModified.content),
                    signature: Harness.mockHash("export declare const y: string;\n")
                };
                const file2ReuasableError: ProgramBuildInfoDiagnostic = [
                    file2.path, [
                        {
                            file: file2.path,
                            start: 13,
                            length: 1,
                            code: Diagnostics.Type_0_is_not_assignable_to_type_1.code,
                            category: Diagnostics.Type_0_is_not_assignable_to_type_1.category,
                            messageText: "Type '20' is not assignable to type 'string'."
                        }
                    ] as ReusableDiagnostic[]
                ];
                const file2Errors = [
                    "file2.ts(1,14): error TS2322: Type '20' is not assignable to type 'string'.\n"
                ];
                const modifiedFile1Content = file1.content.replace("x = 10", "z = 10");
                verifyIncrementalWatchEmit({
                    files: [libFile, file1, fileModified, config],
                    expectedInitialEmit: [
                        file1Js,
                        file2Js,
                        {
                            path: `${project}/tsconfig.tsbuildinfo`,
                            content: getBuildInfoText({
                                program: {
                                    fileInfos: {
                                        [libFile.path]: libFileInfo,
                                        [file1.path]: getFileInfo(file1.content),
                                        [file2.path]: file2FileInfo
                                    },
                                    options: { incremental: true, module: ModuleKind.AMD, configFilePath: configFile.path },
                                    referencedMap: {},
                                    exportedModulesMap: {},
                                    semanticDiagnosticsPerFile: [
                                        libFile.path,
                                        file1.path,
                                        file2ReuasableError
                                    ]
                                },
                                version
                            })
                        }
                    ],
                    expectedInitialErrors: file2Errors,
                    modifyFs: host => host.writeFile(file1.path, modifiedFile1Content),
                    expectedIncrementalEmit: [
                        { path: file1Js.path, content: file1Js.content.replace("x = 10", "z = 10") },
                        {
                            path: `${project}/tsconfig.tsbuildinfo`,
                            content: getBuildInfoText({
                                program: {
                                    fileInfos: {
                                        [libFile.path]: libFileInfo,
                                        [file1.path]: getFileInfo(modifiedFile1Content),
                                        [file2.path]: file2FileInfo
                                    },
                                    options: { incremental: true, module: ModuleKind.AMD, configFilePath: configFile.path },
                                    referencedMap: {},
                                    exportedModulesMap: {},
                                    semanticDiagnosticsPerFile: [
                                        libFile.path,
                                        file2ReuasableError,
                                        file1.path
                                    ]
                                },
                                version
                            })
                        }
                    ],
                    expectedIncrementalErrors: file2Errors,
                });
            });

            describe("with --out", () => {
                const config: File = {
                    path: configFile.path,
                    content: JSON.stringify({ compilerOptions: { incremental: true, module: "amd", outFile: "out.js" } })
                };
                const outFile: File = {
                    path: `${project}/out.js`,
                    content: `${getEmitContent("file1", "x", "10")}${getEmitContent("file2", "y", "20")}`
                };
                function getEmitContent(file: string, varName: string, value: string) {
                    return `define("${file}", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.${varName} = ${value};
});
`;
                }
                verifyIncrementalWatchEmit({
                    files: [libFile, file1, file2, config],
                    expectedInitialEmit: [
                        outFile,
                        {
                            path: `${project}/out.tsbuildinfo`,
                            content: getBuildInfoText({
                                bundle: {
                                    commonSourceDirectory: `${project}/`,
                                    sourceFiles: [file1.path, file2.path],
                                    js: {
                                        sections: [
                                            { pos: 0, end: outFile.content.length, kind: BundleFileSectionKind.Text }
                                        ]
                                    },
                                },
                                version
                            })
                        }
                    ],
                    expectedInitialErrors: emptyArray
                });
            });
        });
    });
}
