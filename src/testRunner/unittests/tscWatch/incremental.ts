namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: emit file --incremental", () => {
        const project = "/users/username/projects/project";

        const configFile: File = {
            path: `${project}/tsconfig.json`,
            content: JSON.stringify({ compilerOptions: { incremental: true } })
        };

        interface VerifyIncrementalWatchEmitInput {
            subScenario: string;
            files: () => readonly File[];
            optionsToExtend?: readonly string[];
            modifyFs?: (host: WatchedSystem) => void;
        }
        function verifyIncrementalWatchEmit(input: VerifyIncrementalWatchEmitInput) {
            describe(input.subScenario, () => {
                it("with tsc --w", () => {
                    verifyIncrementalWatchEmitWorker(input, /*incremental*/ false);
                });
                it("with tsc", () => {
                    verifyIncrementalWatchEmitWorker(input, /*incremental*/ true);
                });
            });
        }

        function verifyIncrementalWatchEmitWorker(
            { subScenario, files, optionsToExtend, modifyFs }: VerifyIncrementalWatchEmitInput,
            incremental: boolean
        ) {
            const { sys, baseline, oldSnap } = createBaseline(createWatchedSystem(files(), { currentDirectory: project }));
            if (incremental) sys.exit = exitCode => sys.exitCode = exitCode;
            const argsToPass = [incremental ? "-i" : "-w", ...(optionsToExtend || emptyArray)];
            baseline.push(`${sys.getExecutingFilePath()} ${argsToPass.join(" ")}`);
            const { cb, getPrograms } = commandLineCallbacks(sys);
            build(oldSnap);

            if (modifyFs) {
                const oldSnap = applyChange(sys, baseline, modifyFs);
                build(oldSnap);
            }

            Harness.Baseline.runBaseline(`${isBuild(argsToPass) ? "tsbuild/watchMode" : "tscWatch"}/incremental/${subScenario.split(" ").join("-")}-${incremental ? "incremental" : "watch"}.js`, baseline.join("\r\n"));

            function build(oldSnap: SystemSnap) {
                const closer = executeCommandLine(
                    sys,
                    cb,
                    argsToPass,
                );
                watchBaseline({
                    baseline,
                    getPrograms,
                    sys,
                    oldSnap
                });
                if (closer) closer.close();
            }
        }

        describe("non module compilation", () => {
            const file1: File = {
                path: `${project}/file1.ts`,
                content: "const x = 10;"
            };
            const file2: File = {
                path: `${project}/file2.ts`,
                content: "const y = 20;"
            };
            describe("own file emit without errors", () => {
                function verify(subScenario: string, optionsToExtend?: readonly string[]) {
                    const modifiedFile2Content = file2.content.replace("y", "z").replace("20", "10");
                    verifyIncrementalWatchEmit({
                        files: () => [libFile, file1, file2, configFile],
                        optionsToExtend,
                        subScenario: `own file emit without errors/${subScenario}`,
                        modifyFs: host => host.writeFile(file2.path, modifiedFile2Content),
                    });
                }
                verify("without commandline options");
                verify("with commandline parameters that are not relative", ["-p", "tsconfig.json"]);
            });

            verifyIncrementalWatchEmit({
                files: () => [libFile, file1, configFile, {
                    path: file2.path,
                    content: `const y: string = 20;`
                }],
                subScenario: "own file emit with errors",
                modifyFs: host => host.writeFile(file1.path, file1.content.replace("x", "z")),
            });

            verifyIncrementalWatchEmit({
                files: () => [libFile, file1, file2, {
                    path: configFile.path,
                    content: JSON.stringify({ compilerOptions: { incremental: true, outFile: "out.js" } })
                }],
                subScenario: "with --out",
            });
        });

        describe("module compilation", () => {
            const file1: File = {
                path: `${project}/file1.ts`,
                content: "export const x = 10;"
            };
            const file2: File = {
                path: `${project}/file2.ts`,
                content: "export const y = 20;"
            };
            const config: File = {
                path: configFile.path,
                content: JSON.stringify({ compilerOptions: { incremental: true, module: "amd" } })
            };

            verifyIncrementalWatchEmit({
                files: () => [libFile, file1, file2, config],
                subScenario: "module compilation/own file emit without errors",
                modifyFs: host => host.writeFile(file2.path, file2.content.replace("y", "z").replace("20", "10")),
            });

            describe("own file emit with errors", () => {
                const fileModified: File = {
                    path: file2.path,
                    content: `export const y: string = 20;`
                };

                verifyIncrementalWatchEmit({
                    files: () => [libFile, file1, fileModified, config],
                    subScenario: "module compilation/own file emit with errors",
                    modifyFs: host => host.writeFile(file1.path, file1.content.replace("x = 10", "z = 10")),
                });

                it("verify that state is read correctly", () => {
                    const system = createWatchedSystem([libFile, file1, fileModified, config], { currentDirectory: project });
                    const reportDiagnostic = createDiagnosticReporter(system);
                    const parsedConfig = parseConfigFileWithSystem("tsconfig.json", {}, /*watchOptionsToExtend*/ undefined, system, reportDiagnostic)!;
                    performIncrementalCompilation({
                        rootNames: parsedConfig.fileNames,
                        options: parsedConfig.options,
                        projectReferences: parsedConfig.projectReferences,
                        configFileParsingDiagnostics: getConfigFileParsingDiagnostics(parsedConfig),
                        reportDiagnostic,
                        system
                    });

                    const command = parseConfigFileWithSystem("tsconfig.json", {}, /*watchOptionsToExtend*/ undefined, system, noop)!;
                    const builderProgram = createIncrementalProgram({
                        rootNames: command.fileNames,
                        options: command.options,
                        projectReferences: command.projectReferences,
                        configFileParsingDiagnostics: getConfigFileParsingDiagnostics(command),
                        host: createIncrementalCompilerHost(command.options, system)
                    });

                    const state = builderProgram.getState();
                    assert.equal(state.changedFilesSet!.size, 0, "changes");

                    assert.equal(state.fileInfos.size, 3, "FileInfo size");
                    assert.deepEqual(state.fileInfos.get(libFile.path), {
                        version: system.createHash(libFile.content),
                        signature: system.createHash(libFile.content),
                        affectsGlobalScope: true,
                    });
                    assert.deepEqual(state.fileInfos.get(file1.path), {
                        version: system.createHash(file1.content),
                        signature: system.createHash(`${file1.content.replace("export ", "export declare ")}\n`),
                        affectsGlobalScope: false,
                    });
                    assert.deepEqual(state.fileInfos.get(file2.path), {
                        version: system.createHash(fileModified.content),
                        signature: system.createHash("export declare const y: string;\n"),
                        affectsGlobalScope: false,
                    });

                    assert.deepEqual(state.compilerOptions, {
                        incremental: true,
                        module: ModuleKind.AMD,
                        configFilePath: config.path
                    });

                    assert.equal(state.referencedMap!.size, 0);
                    assert.equal(state.exportedModulesMap!.size, 0);

                    assert.equal(state.semanticDiagnosticsPerFile!.size, 3);
                    assert.deepEqual(state.semanticDiagnosticsPerFile!.get(libFile.path), emptyArray);
                    assert.deepEqual(state.semanticDiagnosticsPerFile!.get(file1.path), emptyArray);
                    assert.deepEqual(state.semanticDiagnosticsPerFile!.get(file2.path), [{
                        file: state.program!.getSourceFileByPath(file2.path as Path)!,
                        start: 13,
                        length: 1,
                        code: Diagnostics.Type_0_is_not_assignable_to_type_1.code,
                        category: Diagnostics.Type_0_is_not_assignable_to_type_1.category,
                        messageText: "Type 'number' is not assignable to type 'string'.",
                        relatedInformation: undefined,
                        reportsUnnecessary: undefined,
                        source: undefined
                    }]);
                });
            });

            verifyIncrementalWatchEmit({
                files: () => [libFile, file1, file2, {
                    path: configFile.path,
                    content: JSON.stringify({ compilerOptions: { incremental: true, module: "amd", outFile: "out.js" } })
                }],
                subScenario: "module compilation/with --out",
            });
        });

        verifyIncrementalWatchEmit({
            files: () => {
                const config: File = {
                    path: configFile.path,
                    content: JSON.stringify({
                        compilerOptions: {
                            incremental: true,
                            target: "es5",
                            module: "commonjs",
                            declaration: true,
                            emitDeclarationOnly: true
                        }
                    })
                };
                const aTs: File = {
                    path: `${project}/a.ts`,
                    content: `import { B } from "./b";
export interface A {
    b: B;
}
`
                };
                const bTs: File = {
                    path: `${project}/b.ts`,
                    content: `import { C } from "./c";
export interface B {
    b: C;
}
`
                };
                const cTs: File = {
                    path: `${project}/c.ts`,
                    content: `import { A } from "./a";
export interface C {
    a: A;
}
`
                };
                const indexTs: File = {
                    path: `${project}/index.ts`,
                    content: `export { A } from "./a";
export { B } from "./b";
export { C } from "./c";
`
                };
                return [libFile, aTs, bTs, cTs, indexTs, config];
            },
            subScenario: "incremental with circular references",
            modifyFs: host => host.writeFile(`${project}/a.ts`, `import { B } from "./b";
export interface A {
    b: B;
    foo: any;
}
`)
        });

        verifyIncrementalWatchEmit({
            subScenario: "when file with ambient global declaration file is deleted",
            files: () => [
                { path: libFile.path, content: libContent },
                { path: `${project}/globals.d.ts`, content: `declare namespace Config { const value: string;} ` },
                { path: `${project}/index.ts`, content: `console.log(Config.value);` },
                { path: configFile.path, content: JSON.stringify({ compilerOptions: { incremental: true, } }) }
            ],
            modifyFs: host => host.deleteFile(`${project}/globals.d.ts`)
        });
    });
}
