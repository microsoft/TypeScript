namespace ts.projectSystem {
    export function createHostWithSolutionBuild(files: readonly TestFSWithWatch.FileOrFolderOrSymLink[], rootNames: readonly string[]) {
        const host = createServerHost(files);
        // ts build should succeed
        tscWatch.ensureErrorFreeBuild(host, rootNames);
        return host;
    }

    describe("unittests:: tsserver:: with project references and tsbuild", () => {
        describe("with container project", () => {
            function getProjectFiles(project: string): [File, File] {
                return [
                    TestFSWithWatch.getTsBuildProjectFile(project, "tsconfig.json"),
                    TestFSWithWatch.getTsBuildProjectFile(project, "index.ts"),
                ];
            }

            const project = "container";
            const containerLib = getProjectFiles("container/lib");
            const containerExec = getProjectFiles("container/exec");
            const containerCompositeExec = getProjectFiles("container/compositeExec");
            const containerConfig = TestFSWithWatch.getTsBuildProjectFile(project, "tsconfig.json");
            const files = [libFile, ...containerLib, ...containerExec, ...containerCompositeExec, containerConfig];

            it("does not error on container only project", () => {
                const host = createHostWithSolutionBuild(files, [containerConfig.path]);

                // Open external project for the folder
                const session = createSession(host);
                const service = session.getProjectService();
                service.openExternalProjects([{
                    projectFileName: TestFSWithWatch.getTsBuildProjectFilePath(project, project),
                    rootFiles: files.map(f => ({ fileName: f.path })),
                    options: {}
                }]);
                checkNumberOfProjects(service, { configuredProjects: 4 });
                files.forEach(f => {
                    const args: protocol.FileRequestArgs = {
                        file: f.path,
                        projectFileName: endsWith(f.path, "tsconfig.json") ? f.path : undefined
                    };
                    const syntaxDiagnostics = session.executeCommandSeq<protocol.SyntacticDiagnosticsSyncRequest>({
                        command: protocol.CommandTypes.SyntacticDiagnosticsSync,
                        arguments: args
                    }).response;
                    assert.deepEqual(syntaxDiagnostics, []);
                    const semanticDiagnostics = session.executeCommandSeq<protocol.SemanticDiagnosticsSyncRequest>({
                        command: protocol.CommandTypes.SemanticDiagnosticsSync,
                        arguments: args
                    }).response;
                    assert.deepEqual(semanticDiagnostics, []);
                });
                const containerProject = service.configuredProjects.get(containerConfig.path)!;
                checkProjectActualFiles(containerProject, [containerConfig.path]);
                const optionsDiagnostics = session.executeCommandSeq<protocol.CompilerOptionsDiagnosticsRequest>({
                    command: protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
                    arguments: { projectFileName: containerProject.projectName }
                }).response;
                assert.deepEqual(optionsDiagnostics, []);
            });

            it("can successfully find references with --out options", () => {
                const host = createHostWithSolutionBuild(files, [containerConfig.path]);
                const session = createSession(host);
                openFilesForSession([containerCompositeExec[1]], session);
                const service = session.getProjectService();
                checkNumberOfProjects(service, { configuredProjects: 2 }); // compositeExec and solution
                const solutionProject = service.configuredProjects.get(containerConfig.path)!;
                assert.isTrue(solutionProject.isInitialLoadPending());
                const { file: myConstFile, start: myConstStart, end: myConstEnd } = protocolFileSpanFromSubstring({
                    file: containerCompositeExec[1],
                    text: "myConst",
                });
                const response = session.executeCommandSeq<protocol.RenameRequest>({
                    command: protocol.CommandTypes.Rename,
                    arguments: { file: myConstFile, ...myConstStart }
                }).response as protocol.RenameResponseBody;

                const locationOfMyConstInLib = protocolFileSpanWithContextFromSubstring({
                    file: containerLib[1],
                    text: "myConst",
                    contextText: "export const myConst = 30;"
                });
                const { file: _, ...renameTextOfMyConstInLib } = locationOfMyConstInLib;
                const locationOfMyConstInExec = protocolFileSpanWithContextFromSubstring({
                    file: containerExec[1],
                    text: "myConst"
                });
                const { file: myConstInExecFile, ...renameTextOfMyConstInExec } = locationOfMyConstInExec;
                assert.deepEqual(response.locs, [
                    { file: locationOfMyConstInLib.file, locs: [renameTextOfMyConstInLib] },
                    { file: myConstFile, locs: [{ start: myConstStart, end: myConstEnd }] },
                    { file: myConstInExecFile, locs: [renameTextOfMyConstInExec] },
                ]);
                checkNumberOfProjects(service, { configuredProjects: 4 });
                assert.isFalse(solutionProject.isInitialLoadPending());
            });

            it("ancestor and project ref management", () => {
                const tempFile: File = {
                    path: `/user/username/projects/temp/temp.ts`,
                    content: "let x = 10"
                };
                const host = createHostWithSolutionBuild(files.concat([tempFile]), [containerConfig.path]);
                const session = createSession(host);
                openFilesForSession([containerCompositeExec[1]], session);
                const service = session.getProjectService();
                checkNumberOfProjects(service, { configuredProjects: 2 }); // compositeExec and solution
                const solutionProject = service.configuredProjects.get(containerConfig.path)!;
                assert.isTrue(solutionProject.isInitialLoadPending());

                // Open temp file and verify all projects alive
                openFilesForSession([tempFile], session);
                checkNumberOfProjects(service, { configuredProjects: 2, inferredProjects: 1 });
                assert.isTrue(solutionProject.isInitialLoadPending());

                const locationOfMyConst = protocolLocationFromSubstring(containerCompositeExec[1].content, "myConst");
                session.executeCommandSeq<protocol.RenameRequest>({
                    command: protocol.CommandTypes.Rename,
                    arguments: {
                        file: containerCompositeExec[1].path,
                        ...locationOfMyConst
                    }
                });

                // Ref projects are loaded
                checkNumberOfProjects(service, { configuredProjects: 4, inferredProjects: 1 });
                assert.isFalse(solutionProject.isInitialLoadPending());

                // Open temp file and verify all projects alive
                service.closeClientFile(tempFile.path);
                openFilesForSession([tempFile], session);
                checkNumberOfProjects(service, { configuredProjects: 4, inferredProjects: 1 });

                // Close all files and open temp file, only inferred project should be alive
                service.closeClientFile(containerCompositeExec[1].path);
                service.closeClientFile(tempFile.path);
                openFilesForSession([tempFile], session);
                checkNumberOfProjects(service, { inferredProjects: 1 });
            });
        });

        describe("when root file is file from referenced project", () => {
            function verify(disableSourceOfProjectReferenceRedirect: boolean) {
                const projectLocation = `/user/username/projects/project`;
                const commonConfig: File = {
                    path: `${projectLocation}/src/common/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            declarationMap: true,
                            outDir: "../../out",
                            baseUrl: "..",
                            disableSourceOfProjectReferenceRedirect
                        },
                        include: ["./**/*"]
                    })
                };
                const keyboardTs: File = {
                    path: `${projectLocation}/src/common/input/keyboard.ts`,
                    content: `function bar() { return "just a random function so .d.ts location doesnt match"; }
export function evaluateKeyboardEvent() { }`
                };
                const keyboardTestTs: File = {
                    path: `${projectLocation}/src/common/input/keyboard.test.ts`,
                    content: `import { evaluateKeyboardEvent } from 'common/input/keyboard';
function testEvaluateKeyboardEvent() {
    return evaluateKeyboardEvent();
}
`
                };
                const srcConfig: File = {
                    path: `${projectLocation}/src/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            declarationMap: true,
                            outDir: "../out",
                            baseUrl: ".",
                            paths: {
                                "common/*": ["./common/*"],
                            },
                            tsBuildInfoFile: "../out/src.tsconfig.tsbuildinfo",
                            disableSourceOfProjectReferenceRedirect
                        },
                        include: ["./**/*"],
                        references: [
                            { path: "./common" }
                        ]
                    })
                };
                const terminalTs: File = {
                    path: `${projectLocation}/src/terminal.ts`,
                    content: `import { evaluateKeyboardEvent } from 'common/input/keyboard';
function foo() {
    return evaluateKeyboardEvent();
}
`
                };
                const host = createHostWithSolutionBuild(
                    [commonConfig, keyboardTs, keyboardTestTs, srcConfig, terminalTs, libFile],
                    [srcConfig.path]
                );
                const session = createSession(host);
                openFilesForSession([keyboardTs, terminalTs], session);

                const searchStr = "evaluateKeyboardEvent";
                const importStr = `import { evaluateKeyboardEvent } from 'common/input/keyboard';`;
                const result = session.executeCommandSeq<protocol.ReferencesRequest>({
                    command: protocol.CommandTypes.References,
                    arguments: protocolFileLocationFromSubstring(keyboardTs, searchStr)
                }).response as protocol.ReferencesResponseBody;
                assert.deepEqual(result, {
                    refs: [
                        makeReferenceItem({
                            file: keyboardTs,
                            text: searchStr,
                            contextText: `export function evaluateKeyboardEvent() { }`,
                            isDefinition: true,
                            lineText: `export function evaluateKeyboardEvent() { }`
                        }),
                        makeReferenceItem({
                            file: keyboardTestTs,
                            text: searchStr,
                            contextText: importStr,
                            isDefinition: true,
                            lineText: importStr
                        }),
                        makeReferenceItem({
                            file: keyboardTestTs,
                            text: searchStr,
                            options: { index: 1 },
                            isDefinition: false,
                            lineText: `    return evaluateKeyboardEvent();`
                        }),
                        makeReferenceItem({
                            file: terminalTs,
                            text: searchStr,
                            contextText: importStr,
                            isDefinition: true,
                            lineText: importStr
                        }),
                        makeReferenceItem({
                            file: terminalTs,
                            text: searchStr,
                            options: { index: 1 },
                            isDefinition: false,
                            lineText: `    return evaluateKeyboardEvent();`
                        }),
                    ],
                    symbolName: searchStr,
                    symbolStartOffset: protocolLocationFromSubstring(keyboardTs.content, searchStr).offset,
                    symbolDisplayString: "function evaluateKeyboardEvent(): void"
                });
            }

            it(`when using declaration file maps to navigate between projects`, () => {
                verify(/*disableSourceOfProjectReferenceRedirect*/ true);
            });
            it(`when using original source files in the project`, () => {
                verify(/*disableSourceOfProjectReferenceRedirect*/ false);
            });
        });

        it("reusing d.ts files from composite and non composite projects", () => {
            const configA: File = {
                path: `${tscWatch.projectRoot}/compositea/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        outDir: "../dist/",
                        rootDir: "../",
                        baseUrl: "../",
                        paths: { "@ref/*": ["./dist/*"] }
                    }
                })
            };
            const aTs: File = {
                path: `${tscWatch.projectRoot}/compositea/a.ts`,
                content: `import { b } from "@ref/compositeb/b";`
            };
            const a2Ts: File = {
                path: `${tscWatch.projectRoot}/compositea/a2.ts`,
                content: `export const x = 10;`
            };
            const configB: File = {
                path: `${tscWatch.projectRoot}/compositeb/tsconfig.json`,
                content: configA.content
            };
            const bTs: File = {
                path: `${tscWatch.projectRoot}/compositeb/b.ts`,
                content: "export function b() {}"
            };
            const bDts: File = {
                path: `${tscWatch.projectRoot}/dist/compositeb/b.d.ts`,
                content: "export declare function b(): void;"
            };
            const configC: File = {
                path: `${tscWatch.projectRoot}/compositec/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        outDir: "../dist/",
                        rootDir: "../",
                        baseUrl: "../",
                        paths: { "@ref/*": ["./*"] }
                    },
                    references: [{ path: "../compositeb" }]
                })
            };
            const cTs: File = {
                path: `${tscWatch.projectRoot}/compositec/c.ts`,
                content: aTs.content
            };
            const files = [libFile, aTs, a2Ts, configA, bDts, bTs, configB, cTs, configC];
            const host = createServerHost(files);
            const service = createProjectService(host);
            service.openClientFile(aTs.path);
            service.checkNumberOfProjects({ configuredProjects: 1 });

            // project A referencing b.d.ts without project reference
            const projectA = service.configuredProjects.get(configA.path)!;
            assert.isDefined(projectA);
            checkProjectActualFiles(projectA, [aTs.path, a2Ts.path, bDts.path, libFile.path, configA.path]);

            // reuses b.d.ts but sets the path and resolved path since projectC has project references
            // as the real resolution was to b.ts
            service.openClientFile(cTs.path);
            service.checkNumberOfProjects({ configuredProjects: 2 });
            const projectC = service.configuredProjects.get(configC.path)!;
            checkProjectActualFiles(projectC, [cTs.path, bTs.path, libFile.path, configC.path]);

            // Now new project for project A tries to reuse b but there is no filesByName mapping for b's source location
            host.writeFile(a2Ts.path, `${a2Ts.content}export const y = 30;`);
            assert.isTrue(projectA.dirty);
            projectA.updateGraph();
        });

        describe("when references are monorepo like with symlinks", () => {
            interface Packages {
                bPackageJson: File;
                aTest: File;
                bFoo: File;
                bBar: File;
                bSymlink: SymLink;
            }
            function verifySymlinkScenario(packages: () => Packages) {
                describe("when solution is not built", () => {
                    it("with preserveSymlinks turned off", () => {
                        verifySession(packages(), /*alreadyBuilt*/ false, {});
                    });

                    it("with preserveSymlinks turned on", () => {
                        verifySession(packages(), /*alreadyBuilt*/ false, { preserveSymlinks: true });
                    });
                });

                describe("when solution is already built", () => {
                    it("with preserveSymlinks turned off", () => {
                        verifySession(packages(), /*alreadyBuilt*/ true, {});
                    });

                    it("with preserveSymlinks turned on", () => {
                        verifySession(packages(), /*alreadyBuilt*/ true, { preserveSymlinks: true });
                    });
                });
            }

            function verifySession({ bPackageJson, aTest, bFoo, bBar, bSymlink }: Packages, alreadyBuilt: boolean, extraOptions: CompilerOptions) {
                const aConfig = config("A", extraOptions, ["../B"]);
                const bConfig = config("B", extraOptions);
                const files = [libFile, bPackageJson, aConfig, bConfig, aTest, bFoo, bBar, bSymlink];
                const host = alreadyBuilt ?
                    createHostWithSolutionBuild(files, [aConfig.path]) :
                    createServerHost(files);

                // Create symlink in node module
                const session = createSession(host, { canUseEvents: true });
                openFilesForSession([aTest], session);
                const service = session.getProjectService();
                const project = service.configuredProjects.get(aConfig.path.toLowerCase())!;
                assert.deepEqual(project.getAllProjectErrors(), []);
                checkProjectActualFiles(
                    project,
                    [aConfig.path, aTest.path, bFoo.path, bBar.path, libFile.path]
                );
                verifyGetErrRequestNoErrors({ session, host, files: [aTest] });
                session.executeCommandSeq<protocol.UpdateOpenRequest>({
                    command: protocol.CommandTypes.UpdateOpen,
                    arguments: {
                        changedFiles: [{
                            fileName: aTest.path,
                            textChanges: [{
                                newText: "\n",
                                start: { line: 5, offset: 1 },
                                end: { line: 5, offset: 1 }
                            }]
                        }]
                    }
                });
                verifyGetErrRequestNoErrors({ session, host, files: [aTest] });
            }

            function config(packageName: string, extraOptions: CompilerOptions, references?: string[]): File {
                return {
                    path: `${tscWatch.projectRoot}/packages/${packageName}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            outDir: "lib",
                            rootDir: "src",
                            composite: true,
                            ...extraOptions
                        },
                        include: ["src"],
                        ...(references ? { references: references.map(path => ({ path })) } : {})
                    })
                };
            }

            function file(packageName: string, fileName: string, content: string): File {
                return {
                    path: `${tscWatch.projectRoot}/packages/${packageName}/src/${fileName}`,
                    content
                };
            }

            function verifyMonoRepoLike(scope = "") {
                describe("when packageJson has types field and has index.ts", () => {
                    verifySymlinkScenario(() => ({
                        bPackageJson: {
                            path: `${tscWatch.projectRoot}/packages/B/package.json`,
                            content: JSON.stringify({
                                main: "lib/index.js",
                                types: "lib/index.d.ts"
                            })
                        },
                        aTest: file("A", "index.ts", `import { foo } from '${scope}b';
import { bar } from '${scope}b/lib/bar';
foo();
bar();
`),
                        bFoo: file("B", "index.ts", `export function foo() { }`),
                        bBar: file("B", "bar.ts", `export function bar() { }`),
                        bSymlink: {
                            path: `${tscWatch.projectRoot}/node_modules/${scope}b`,
                            symLink: `${tscWatch.projectRoot}/packages/B`
                        }
                    }));
                });

                describe("when referencing file from subFolder", () => {
                    verifySymlinkScenario(() => ({
                        bPackageJson: {
                            path: `${tscWatch.projectRoot}/packages/B/package.json`,
                            content: "{}"
                        },
                        aTest: file("A", "test.ts", `import { foo } from '${scope}b/lib/foo';
import { bar } from '${scope}b/lib/bar/foo';
foo();
bar();
`),
                        bFoo: file("B", "foo.ts", `export function foo() { }`),
                        bBar: file("B", "bar/foo.ts", `export function bar() { }`),
                        bSymlink: {
                            path: `${tscWatch.projectRoot}/node_modules/${scope}b`,
                            symLink: `${tscWatch.projectRoot}/packages/B`
                        }
                    }));
                });
            }
            describe("when package is not scoped", () => {
                verifyMonoRepoLike();
            });
            describe("when package is scoped", () => {
                verifyMonoRepoLike("@issue/");
            });
        });

        it("when finding local reference doesnt load ancestor/sibling projects", () => {
            const solutionLocation = "/user/username/projects/solution";
            const solution: File = {
                path: `${solutionLocation}/tsconfig.json`,
                content: JSON.stringify({
                    files: [],
                    include: [],
                    references: [
                        { path: "./compiler" },
                        { path: "./services" },
                    ]
                })
            };
            const compilerConfig: File = {
                path: `${solutionLocation}/compiler/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        module: "none"
                    },
                    files: ["./types.ts", "./program.ts"]
                })
            };
            const typesFile: File = {
                path: `${solutionLocation}/compiler/types.ts`,
                content: `
                namespace ts {
                    export interface Program {
                        getSourceFiles(): string[];
                    }
                }`
            };
            const programFile: File = {
                path: `${solutionLocation}/compiler/program.ts`,
                content: `
                namespace ts {
                    export const program: Program = {
                        getSourceFiles: () => [getSourceFile()]
                    };
                    function getSourceFile() { return "something"; }
                }`
            };
            const servicesConfig: File = {
                path: `${solutionLocation}/services/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true
                    },
                    files: ["./services.ts"],
                    references: [
                        { path: "../compiler" }
                    ]
                })
            };
            const servicesFile: File = {
                path: `${solutionLocation}/services/services.ts`,
                content: `
                namespace ts {
                    const result = program.getSourceFiles();
                }`
            };

            const files = [libFile, solution, compilerConfig, typesFile, programFile, servicesConfig, servicesFile, libFile];
            const host = createServerHost(files);
            const session = createSession(host);
            const service = session.getProjectService();
            service.openClientFile(programFile.path);
            checkNumberOfProjects(service, { configuredProjects: 2 });
            const compilerProject = service.configuredProjects.get(compilerConfig.path)!;
            checkProjectActualFiles(compilerProject, [libFile.path, typesFile.path, programFile.path, compilerConfig.path]);
            const solutionProject = service.configuredProjects.get(solution.path)!;
            assert.isTrue(solutionProject.isInitialLoadPending());

            // Find all references for getSourceFile
            const response = session.executeCommandSeq<protocol.ReferencesRequest>({
                command: protocol.CommandTypes.References,
                arguments: protocolFileLocationFromSubstring(programFile, "getSourceFile", { index: 1 })
            }).response as protocol.ReferencesResponseBody;
            assert.deepEqual(response, {
                refs: [
                    makeReferenceItem({
                        file: programFile,
                        text: "getSourceFile",
                        options: { index: 1 },
                        isDefinition: false,
                        lineText: `                        getSourceFiles: () => [getSourceFile()]`,
                    }),
                    makeReferenceItem({
                        file: programFile,
                        text: "getSourceFile",
                        options: { index: 2 },
                        contextText: `function getSourceFile() { return "something"; }`,
                        isDefinition: true,
                        lineText: `                    function getSourceFile() { return "something"; }`,
                    })
                ],
                symbolName: "getSourceFile",
                symbolStartOffset: protocolLocationFromSubstring(programFile.content, "getSourceFile", { index: 1 }).offset,
                symbolDisplayString: "function getSourceFile(): string"
            });
            // Shouldnt load more projects
            checkNumberOfProjects(service, { configuredProjects: 2 });
            assert.isTrue(solutionProject.isInitialLoadPending());

            // Find all references for getSourceFiles
            const getSourceFilesResponse = session.executeCommandSeq<protocol.ReferencesRequest>({
                command: protocol.CommandTypes.References,
                arguments: protocolFileLocationFromSubstring(programFile, "getSourceFiles")
            }).response as protocol.ReferencesResponseBody;
            assert.deepEqual(getSourceFilesResponse, {
                refs: [
                    makeReferenceItem({
                        file: typesFile,
                        text: "getSourceFiles",
                        contextText: `getSourceFiles(): string[];`,
                        isDefinition: true,
                        isWriteAccess: false,
                        lineText: `                        getSourceFiles(): string[];`,
                    }),
                    makeReferenceItem({
                        file: programFile,
                        text: "getSourceFiles",
                        contextText: `getSourceFiles: () => [getSourceFile()]`,
                        isDefinition: true,
                        lineText: `                        getSourceFiles: () => [getSourceFile()]`,
                    }),
                    makeReferenceItem({
                        file: servicesFile,
                        text: "getSourceFiles",
                        isDefinition: false,
                        lineText: `                    const result = program.getSourceFiles();`,
                    })
                ],
                symbolName: "getSourceFiles",
                symbolStartOffset: protocolLocationFromSubstring(typesFile.content, "getSourceFiles").offset,
                symbolDisplayString: "(method) ts.Program.getSourceFiles(): string[]"
            });

            // Should load more projects
            checkNumberOfProjects(service, { configuredProjects: 3 });
            assert.isFalse(solutionProject.isInitialLoadPending());
            checkProjectActualFiles(solutionProject, [solution.path]);
            checkProjectActualFiles(service.configuredProjects.get(servicesConfig.path)!, [servicesFile.path, servicesConfig.path, libFile.path, typesFile.path, programFile.path]);
        });

        it("when disableSolutionSearching is true, solution and siblings are not loaded", () => {
            const solutionLocation = "/user/username/projects/solution";
            const solution: File = {
                path: `${solutionLocation}/tsconfig.json`,
                content: JSON.stringify({
                    files: [],
                    include: [],
                    references: [
                        { path: "./compiler" },
                        { path: "./services" },
                    ]
                })
            };
            const compilerConfig: File = {
                path: `${solutionLocation}/compiler/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        module: "none",
                        disableSolutionSearching: true
                    },
                    files: ["./types.ts", "./program.ts"]
                })
            };
            const typesFile: File = {
                path: `${solutionLocation}/compiler/types.ts`,
                content: `
                namespace ts {
                    export interface Program {
                        getSourceFiles(): string[];
                    }
                }`
            };
            const programFile: File = {
                path: `${solutionLocation}/compiler/program.ts`,
                content: `
                namespace ts {
                    export const program: Program = {
                        getSourceFiles: () => [getSourceFile()]
                    };
                    function getSourceFile() { return "something"; }
                }`
            };
            const servicesConfig: File = {
                path: `${solutionLocation}/services/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true
                    },
                    files: ["./services.ts"],
                    references: [
                        { path: "../compiler" }
                    ]
                })
            };
            const servicesFile: File = {
                path: `${solutionLocation}/services/services.ts`,
                content: `
                namespace ts {
                    const result = program.getSourceFiles();
                }`
            };

            const files = [libFile, solution, compilerConfig, typesFile, programFile, servicesConfig, servicesFile, libFile];
            const host = createServerHost(files);
            const session = createSession(host);
            const service = session.getProjectService();
            service.openClientFile(programFile.path);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            const compilerProject = service.configuredProjects.get(compilerConfig.path)!;
            checkProjectActualFiles(compilerProject, [libFile.path, typesFile.path, programFile.path, compilerConfig.path]);

            // Find all references
            const getSourceFilesResponse = session.executeCommandSeq<protocol.ReferencesRequest>({
                command: protocol.CommandTypes.References,
                arguments: protocolFileLocationFromSubstring(programFile, "getSourceFiles")
            }).response as protocol.ReferencesResponseBody;
            assert.deepEqual(getSourceFilesResponse, {
                refs: [
                    makeReferenceItem({
                        file: typesFile,
                        text: "getSourceFiles",
                        contextText: `getSourceFiles(): string[];`,
                        isDefinition: true,
                        isWriteAccess: false,
                        lineText: `                        getSourceFiles(): string[];`,
                    }),
                    makeReferenceItem({
                        file: programFile,
                        text: "getSourceFiles",
                        contextText: `getSourceFiles: () => [getSourceFile()]`,
                        isDefinition: true,
                        lineText: `                        getSourceFiles: () => [getSourceFile()]`,
                    }),
                ],
                symbolName: "getSourceFiles",
                symbolStartOffset: protocolLocationFromSubstring(typesFile.content, "getSourceFiles").offset,
                symbolDisplayString: "(method) ts.Program.getSourceFiles(): string[]"
            });

            // No new solutions/projects loaded
            checkNumberOfProjects(service, { configuredProjects: 1 });
        });

        describe("when default project is solution project", () => {
            interface Setup {
                solutionOptions?: CompilerOptions;
                solutionFiles?: string[];
                configRefs: string[];
                additionalFiles: readonly File[];
                expectedOpenEvents: protocol.Event[];
            }
            interface VerifySolutionScenario extends Setup {
                solutionProject?: readonly string[];
                additionalProjects: readonly { projectName: string, files: readonly string[] }[];
                expectedReloadEvents: protocol.Event[];
                expectedReferences: protocol.ReferencesResponseBody;
                expectedReferencesFromDtsProject: protocol.ReferencesResponseBody;
            }
            const main: File = {
                path: `${tscWatch.projectRoot}/src/main.ts`,
                content: `import { foo } from 'helpers/functions';
export { foo };`
            };
            const helper: File = {
                path: `${tscWatch.projectRoot}/src/helpers/functions.ts`,
                content: `export const foo = 1;`
            };
            const mainDts: File = {
                path: `${tscWatch.projectRoot}/target/src/main.d.ts`,
                content: `import { foo } from 'helpers/functions';
export { foo };
//# sourceMappingURL=main.d.ts.map`
            };
            const mainDtsMap: File = {
                path: `${tscWatch.projectRoot}/target/src/main.d.ts.map`,
                content: `{"version":3,"file":"main.d.ts","sourceRoot":"","sources":["../../src/main.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,GAAG,EAAE,MAAM,mBAAmB,CAAC;AAExC,OAAO,EAAC,GAAG,EAAC,CAAC"}`
            };
            const helperDts: File = {
                path: `${tscWatch.projectRoot}/target/src/helpers/functions.d.ts`,
                content: `export declare const foo = 1;
//# sourceMappingURL=functions.d.ts.map`
            };
            const helperDtsMap: File = {
                path: `${tscWatch.projectRoot}/target/src/helpers/functions.d.ts.map`,
                content: `{"version":3,"file":"functions.d.ts","sourceRoot":"","sources":["../../../src/helpers/functions.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,GAAG,IAAI,CAAC"}`
            };
            const tsconfigIndirect3: File = {
                path: `${tscWatch.projectRoot}/indirect3/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        baseUrl: "../target/src/"
                    },
                })
            };
            const fileResolvingToMainDts: File = {
                path: `${tscWatch.projectRoot}/indirect3/main.ts`,
                content: `import { foo } from 'main';
foo;
export function bar() {}`
            };
            const tsconfigSrcPath = `${tscWatch.projectRoot}/tsconfig-src.json`;
            const tsconfigPath = `${tscWatch.projectRoot}/tsconfig.json`;
            const dummyFilePath = "/dummy/dummy.ts";
            function setup({ solutionFiles, solutionOptions, configRefs, additionalFiles, expectedOpenEvents }: Setup) {
                const tsconfigSrc: File = {
                    path: tsconfigSrcPath,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            outDir: "./target/",
                            baseUrl: "./src/"
                        },
                        include: ["./src/**/*"]
                    })
                };
                const tsconfig: File = {
                    path: tsconfigPath,
                    content: JSON.stringify({
                        ... (solutionOptions ? { compilerOptions: solutionOptions } : {}),
                        references: configRefs.map(path => ({ path })),
                        files: solutionFiles || []
                    })
                };
                const dummyFile: File = {
                    path: dummyFilePath,
                    content: "let a = 10;"
                };
                const host = createServerHost([
                    tsconfigSrc, tsconfig, main, helper,
                    libFile, dummyFile,
                    mainDts, mainDtsMap, helperDts, helperDtsMap,
                    tsconfigIndirect3, fileResolvingToMainDts,
                    ...additionalFiles]);
                const session = createSession(host, { canUseEvents: true });
                const service = session.getProjectService();
                service.openClientFile(main.path);
                checkEvents(session, expectedOpenEvents);
                return { session, service, host, tsconfigSrc, tsconfig };
            }

            function verifySolutionScenario(input: VerifySolutionScenario) {
                const { session, service, host, tsconfigSrc, tsconfig } = setup(input);
                const {
                    solutionProject, additionalProjects, expectedReloadEvents,
                    expectedReferences, expectedReferencesFromDtsProject
                } = input;
                verifyProjects(/*includeConfigured*/ true, /*includeDummy*/ false);
                const info = service.getScriptInfoForPath(main.path as Path)!;
                const project = service.configuredProjects.get(tsconfigSrc.path)!;
                assert.equal(info.getDefaultProject(), project);
                assert.equal(service.findDefaultConfiguredProject(info), project);

                // Verify errors
                verifyGetErrRequestNoErrors({ session, host, files: [main] });

                // Verify collection of script infos
                service.openClientFile(dummyFilePath);
                verifyProjects(/*includeConfigured*/ true, /*includeDummy*/ true);

                service.closeClientFile(main.path);
                service.closeClientFile(dummyFilePath);
                service.openClientFile(dummyFilePath);
                verifyProjects(/*includeConfigured*/ false, /*includeDummy*/ true);

                service.openClientFile(main.path);
                service.closeClientFile(dummyFilePath);
                service.openClientFile(dummyFilePath);
                verifyProjects(/*includeConfigured*/ true, /*includeDummy*/ true);

                // Verify Reload projects
                session.clearMessages();
                service.reloadProjects();
                checkEvents(session, expectedReloadEvents);
                verifyProjects(/*includeConfigured*/ true, /*includeDummy*/ true);

                // Find all refs
                const response = session.executeCommandSeq<protocol.ReferencesRequest>({
                    command: protocol.CommandTypes.References,
                    arguments: protocolFileLocationFromSubstring(main, "foo", { index: 1 })
                }).response as protocol.ReferencesResponseBody;
                assert.deepEqual(response, expectedReferences);

                service.closeClientFile(main.path);
                service.closeClientFile(dummyFilePath);

                // Verify when declaration map references the file
                service.openClientFile(fileResolvingToMainDts.path);
                checkNumberOfProjects(service, { configuredProjects: 1 });
                checkProjectActualFiles(service.configuredProjects.get(tsconfigIndirect3.path)!, [tsconfigIndirect3.path, fileResolvingToMainDts.path, mainDts.path, helperDts.path, libFile.path]);

                // Find all refs from dts include
                const response2 = session.executeCommandSeq<protocol.ReferencesRequest>({
                    command: protocol.CommandTypes.References,
                    arguments: protocolFileLocationFromSubstring(fileResolvingToMainDts, "foo")
                }).response as protocol.ReferencesResponseBody;
                assert.deepEqual(response2, expectedReferencesFromDtsProject);

                function verifyProjects(includeConfigured: boolean, includeDummy: boolean) {
                    const inferredProjects = includeDummy ? 1 : 0;
                    const configuredProjects = includeConfigured ? additionalProjects.length + 2 : 0;
                    checkNumberOfProjects(service, { configuredProjects, inferredProjects });
                    if (includeConfigured) {
                        checkProjectActualFiles(service.configuredProjects.get(tsconfigSrc.path)!, [tsconfigSrc.path, main.path, helper.path, libFile.path]);
                        checkProjectActualFiles(service.configuredProjects.get(tsconfig.path)!, solutionProject || [tsconfig.path]);
                        additionalProjects.forEach(({ projectName, files }) =>
                            checkProjectActualFiles(service.configuredProjects.get(projectName)!, files));
                    }
                    if (includeDummy) {
                        checkProjectActualFiles(service.inferredProjects[0], [dummyFilePath, libFile.path]);
                    }
                }
            }

            function expectedProjectLoadAndTelemetry(config: string, reason: string) {
                return [
                    projectLoadingStartEvent(config, reason),
                    projectLoadingFinishEvent(config),
                    projectInfoTelemetryEvent(),
                ];
            }

            function expectedSolutionLoadAndTelemetry() {
                return expectedProjectLoadAndTelemetry(tsconfigPath, `Creating possible configured project for ${main.path} to open`);
            }

            function expectedProjectReferenceLoadAndTelemetry(config: string) {
                return expectedProjectLoadAndTelemetry(config, `Creating project referenced in solution ${tsconfigPath} to find possible configured project for ${main.path} to open`);
            }

            function expectedReloadEvent(config: string) {
                return [
                    projectLoadingStartEvent(config, `User requested reload projects`),
                    projectLoadingFinishEvent(config),
                    configFileDiagEvent(config, config, [])
                ];
            }

            function expectedReferencesResponse(): protocol.ReferencesResponseBody {
                return {
                    refs: [
                        makeReferenceItem({
                            file: main,
                            text: "foo",
                            contextText: `import { foo } from 'helpers/functions';`,
                            isDefinition: true,
                            isWriteAccess: true,
                            lineText: `import { foo } from 'helpers/functions';`,
                        }),
                        makeReferenceItem({
                            file: main,
                            text: "foo",
                            options: { index: 1 },
                            contextText: `export { foo };`,
                            isDefinition: true,
                            isWriteAccess: true,
                            lineText: `export { foo };`,
                        }),
                        makeReferenceItem({
                            file: helper,
                            text: "foo",
                            contextText: `export const foo = 1;`,
                            isDefinition: true,
                            isWriteAccess: true,
                            lineText: `export const foo = 1;`,
                        }),
                    ],
                    symbolName: "foo",
                    symbolStartOffset: protocolLocationFromSubstring(main.content, "foo").offset,
                    symbolDisplayString: "(alias) const foo: 1\nexport foo"
                };
            }

            function expectedIndirectRefs(indirect: File) {
                return [
                    makeReferenceItem({
                        file: indirect,
                        text: "foo",
                        contextText: `import { foo } from 'main';`,
                        isDefinition: true,
                        isWriteAccess: true,
                        lineText: `import { foo } from 'main';`,
                    }),
                    makeReferenceItem({
                        file: indirect,
                        text: "foo",
                        options: { index: 1 },
                        isDefinition: false,
                        isWriteAccess: false,
                        lineText: `foo;`,
                    }),
                ];
            }

            function getIndirectProject(postfix: string, optionsToExtend?: CompilerOptions) {
                const tsconfigIndirect: File = {
                    path: `${tscWatch.projectRoot}/tsconfig-indirect${postfix}.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            outDir: "./target/",
                            baseUrl: "./src/",
                            ...optionsToExtend
                        },
                        files: [`./indirect${postfix}/main.ts`],
                        references: [{ path: "./tsconfig-src.json" }]
                    })
                };
                const indirect: File = {
                    path: `${tscWatch.projectRoot}/indirect${postfix}/main.ts`,
                    content: fileResolvingToMainDts.content
                };
                return { tsconfigIndirect, indirect };
            }

            interface VerifyProjects {
                configuredProjects: readonly { projectName: string, files: readonly string[] }[];
                inferredProjects: readonly (readonly string[])[];
            }

            interface VerifyDisableReferencedProjectLoad extends Setup {
                expectedProjectsOnOpen: VerifyProjects;
                expectedProjectsOnDummyOpen?: VerifyProjects;
                expectedProjectsOnReload?: VerifyProjects;
                expectedDefaultProject: (service: server.ProjectService) => server.Project;
                expectedDefaultConfiguredProject: (service: server.ProjectService) => server.ConfiguredProject | undefined;
                expectedReloadEvents: protocol.Event[];
            }

            function verifyDisableReferencedProjectLoad(input: VerifyDisableReferencedProjectLoad) {
                const { session, service } = setup(input);
                const { expectedProjectsOnOpen, expectedDefaultProject, expectedDefaultConfiguredProject, expectedReloadEvents } = input;
                const expectedProjectsOnOnlyDummy: VerifyProjects = {
                    configuredProjects: emptyArray,
                    inferredProjects: [
                        [dummyFilePath, libFile.path],
                    ]
                };
                const expectedProjectsOnDummyOpen = input.expectedProjectsOnDummyOpen || {
                    configuredProjects: expectedProjectsOnOpen.configuredProjects,
                    inferredProjects: expectedProjectsOnOnlyDummy.inferredProjects,
                };
                const expectedProjectsOnReload = input.expectedProjectsOnReload || expectedProjectsOnDummyOpen;

                verifyProjects(expectedProjectsOnOpen);
                const info = service.getScriptInfoForPath(main.path as Path)!;
                assert.equal(info.getDefaultProject(), expectedDefaultProject(service));
                assert.equal(service.findDefaultConfiguredProject(info), expectedDefaultConfiguredProject(service));

                // Verify collection of script infos
                service.openClientFile(dummyFilePath);
                verifyProjects(expectedProjectsOnDummyOpen);

                service.closeClientFile(main.path);
                service.closeClientFile(dummyFilePath);
                service.openClientFile(dummyFilePath);
                verifyProjects(expectedProjectsOnOnlyDummy);

                service.openClientFile(main.path);

                // Verify Reload projects
                session.clearMessages();
                service.reloadProjects();
                checkEvents(session, expectedReloadEvents);
                verifyProjects(expectedProjectsOnReload);

                function verifyProjects(expected: VerifyProjects) {
                    checkNumberOfProjects(service, { configuredProjects: expected.configuredProjects.length, inferredProjects: expected.inferredProjects.length });
                    expected.configuredProjects.forEach(({ projectName, files }) =>
                        checkProjectActualFiles(service.configuredProjects.get(projectName)!, files));
                    expected.inferredProjects.forEach((files, index) =>
                        checkProjectActualFiles(service.inferredProjects[index], files));
                }
            }

            it("when project is directly referenced by solution", () => {
                const expectedReferences = expectedReferencesResponse();
                verifySolutionScenario({
                    configRefs: ["./tsconfig-src.json"],
                    additionalFiles: emptyArray,
                    additionalProjects: emptyArray,
                    expectedOpenEvents: [
                        ...expectedSolutionLoadAndTelemetry(),
                        ...expectedProjectReferenceLoadAndTelemetry(tsconfigSrcPath),
                        configFileDiagEvent(main.path, tsconfigSrcPath, [])
                    ],
                    expectedReloadEvents: [
                        ...expectedReloadEvent(tsconfigPath),
                        ...expectedReloadEvent(tsconfigSrcPath),
                    ],
                    expectedReferences,
                    expectedReferencesFromDtsProject: {
                        ...expectedReferences,
                        refs: [
                            ...expectedIndirectRefs(fileResolvingToMainDts),
                            ...expectedReferences.refs
                        ],
                        symbolDisplayString: "(alias) const foo: 1\nimport foo",
                    }
                });
            });

            it("when project is indirectly referenced by solution", () => {
                const { tsconfigIndirect, indirect } = getIndirectProject("1");
                const { tsconfigIndirect: tsconfigIndirect2, indirect: indirect2 } = getIndirectProject("2");
                const { refs, ...rest } = expectedReferencesResponse();
                verifySolutionScenario({
                    configRefs: ["./tsconfig-indirect1.json", "./tsconfig-indirect2.json"],
                    additionalFiles: [tsconfigIndirect, indirect, tsconfigIndirect2, indirect2],
                    additionalProjects: emptyArray,
                    expectedOpenEvents: [
                        ...expectedSolutionLoadAndTelemetry(),
                        ...expectedProjectReferenceLoadAndTelemetry(tsconfigSrcPath),
                        configFileDiagEvent(main.path, tsconfigSrcPath, [])
                    ],
                    expectedReloadEvents: [
                        ...expectedReloadEvent(tsconfigPath),
                        ...expectedReloadEvent(tsconfigSrcPath),
                    ],
                    expectedReferences: {
                        refs: [
                            ...refs,
                            ...expectedIndirectRefs(indirect),
                            ...expectedIndirectRefs(indirect2),
                        ],
                        ...rest
                    },
                    expectedReferencesFromDtsProject: {
                        ...rest,
                        refs: [
                            ...expectedIndirectRefs(fileResolvingToMainDts),
                            ...refs,
                            ...expectedIndirectRefs(indirect),
                            ...expectedIndirectRefs(indirect2),
                        ],
                        symbolDisplayString: "(alias) const foo: 1\nimport foo",
                    }
                });
            });

            it("disables looking into the child project if disableReferencedProjectLoad is set", () => {
                const expectedProjectsOnOpen: VerifyProjects = {
                    configuredProjects: [
                        { projectName: tsconfigPath, files: [tsconfigPath] },
                    ],
                    inferredProjects: [
                        [main.path, libFile.path],
                    ]
                };
                verifyDisableReferencedProjectLoad({
                    solutionOptions: { disableReferencedProjectLoad: true },
                    configRefs: ["./tsconfig-src.json"],
                    additionalFiles: emptyArray,
                    expectedOpenEvents: [
                        ...expectedSolutionLoadAndTelemetry(),
                        configFileDiagEvent(main.path, tsconfigPath, [])
                    ],
                    expectedDefaultProject: service => service.inferredProjects[0],
                    expectedDefaultConfiguredProject: returnUndefined,
                    expectedProjectsOnOpen,
                    expectedProjectsOnDummyOpen: {
                        configuredProjects: emptyArray,
                        inferredProjects: [
                            ...expectedProjectsOnOpen.inferredProjects,
                            [dummyFilePath, libFile.path],
                        ]
                    },
                    expectedProjectsOnReload: {
                        configuredProjects: expectedProjectsOnOpen.configuredProjects,
                        inferredProjects: [
                            [dummyFilePath, libFile.path],
                            ...expectedProjectsOnOpen.inferredProjects,
                        ]
                    },
                    expectedReloadEvents: expectedReloadEvent(tsconfigPath)
                });
            });

            it("disables looking into the child project if disableReferencedProjectLoad is set in indirect project", () => {
                const { tsconfigIndirect, indirect } = getIndirectProject("1", { disableReferencedProjectLoad: true });
                const expectedProjectsOnOpen: VerifyProjects = {
                    configuredProjects: [
                        { projectName: tsconfigPath, files: [tsconfigPath] },
                        { projectName: tsconfigIndirect.path, files: [tsconfigIndirect.path, main.path, helper.path, indirect.path, libFile.path] },
                    ],
                    inferredProjects: emptyArray
                };
                verifyDisableReferencedProjectLoad({
                    configRefs: ["./tsconfig-indirect1.json"],
                    additionalFiles: [tsconfigIndirect, indirect],
                    expectedOpenEvents: [
                        ...expectedSolutionLoadAndTelemetry(),
                        ...expectedProjectReferenceLoadAndTelemetry(tsconfigIndirect.path),
                        configFileDiagEvent(main.path, tsconfigIndirect.path, [])
                    ],
                    expectedDefaultProject: service => service.configuredProjects.get(tsconfigIndirect.path)!,
                    expectedDefaultConfiguredProject: returnUndefined,
                    expectedProjectsOnOpen,
                    expectedReloadEvents: [
                        ...expectedReloadEvent(tsconfigPath),
                        ...expectedReloadEvent(tsconfigIndirect.path),
                    ]
                });
            });

            it("disables looking into the child project if disableReferencedProjectLoad is set in first indirect project but not in another one", () => {
                const { tsconfigIndirect, indirect } = getIndirectProject("1", { disableReferencedProjectLoad: true });
                const { tsconfigIndirect: tsconfigIndirect2, indirect: indirect2 } = getIndirectProject("2");
                const expectedProjectsOnOpen: VerifyProjects = {
                    configuredProjects: [
                        { projectName: tsconfigPath, files: [tsconfigPath] },
                        { projectName: tsconfigSrcPath, files: [tsconfigSrcPath, main.path, helper.path, libFile.path] },
                    ],
                    inferredProjects: emptyArray
                };
                verifyDisableReferencedProjectLoad({
                    configRefs: ["./tsconfig-indirect1.json", "./tsconfig-indirect2.json"],
                    additionalFiles: [tsconfigIndirect, indirect, tsconfigIndirect2, indirect2],
                    expectedOpenEvents: [
                        ...expectedSolutionLoadAndTelemetry(),
                        ...expectedProjectReferenceLoadAndTelemetry(tsconfigSrcPath),
                        configFileDiagEvent(main.path, tsconfigSrcPath, [])
                    ],
                    expectedDefaultProject: service => service.configuredProjects.get(tsconfigSrcPath)!,
                    expectedDefaultConfiguredProject: service => service.configuredProjects.get(tsconfigSrcPath)!,
                    expectedProjectsOnOpen,
                    expectedReloadEvents: [
                        ...expectedReloadEvent(tsconfigPath),
                        ...expectedReloadEvent(tsconfigSrcPath),
                    ]
                });
            });

            describe("when solution is project that contains its own files", () => {
                it("when the project found is not solution but references open file through project reference", () => {
                    const ownMain: File = {
                        path: `${tscWatch.projectRoot}/own/main.ts`,
                        content: fileResolvingToMainDts.content
                    };
                    const { refs, ...rest } = expectedReferencesResponse();
                    verifySolutionScenario({
                        solutionFiles: [`./own/main.ts`],
                        solutionOptions: {
                            outDir: "./target/",
                            baseUrl: "./src/"
                        },
                        solutionProject: [tsconfigPath, ownMain.path, main.path, libFile.path, helper.path],
                        configRefs: ["./tsconfig-src.json"],
                        additionalFiles: [ownMain],
                        additionalProjects: emptyArray,
                        expectedOpenEvents: [
                            ...expectedSolutionLoadAndTelemetry(),
                            ...expectedProjectReferenceLoadAndTelemetry(tsconfigSrcPath),
                            configFileDiagEvent(main.path, tsconfigSrcPath, [])
                        ],
                        expectedReloadEvents: [
                            ...expectedReloadEvent(tsconfigPath),
                            ...expectedReloadEvent(tsconfigSrcPath),
                        ],
                        expectedReferences: {
                            refs: [
                                ...refs,
                                ...expectedIndirectRefs(ownMain),
                            ],
                            ...rest
                        },
                        expectedReferencesFromDtsProject: {
                            ...rest,
                            refs: [
                                ...expectedIndirectRefs(fileResolvingToMainDts),
                                ...refs,
                                ...expectedIndirectRefs(ownMain),
                            ],
                            symbolDisplayString: "(alias) const foo: 1\nimport foo",
                        },
                    });
                });

                it("when project is indirectly referenced by solution", () => {
                    const ownMain: File = {
                        path: `${tscWatch.projectRoot}/own/main.ts`,
                        content: `import { bar } from 'main';
bar;`
                    };
                    const { tsconfigIndirect, indirect } = getIndirectProject("1");
                    const { tsconfigIndirect: tsconfigIndirect2, indirect: indirect2 } = getIndirectProject("2");
                    const { refs, ...rest } = expectedReferencesResponse();
                    verifySolutionScenario({
                        solutionFiles: [`./own/main.ts`],
                        solutionOptions: {
                            outDir: "./target/",
                            baseUrl: "./indirect1/"
                        },
                        solutionProject: [tsconfigPath, indirect.path, ownMain.path, main.path, libFile.path, helper.path],
                        configRefs: ["./tsconfig-indirect1.json", "./tsconfig-indirect2.json"],
                        additionalFiles: [tsconfigIndirect, indirect, tsconfigIndirect2, indirect2, ownMain],
                        additionalProjects: emptyArray,
                        expectedOpenEvents: [
                            ...expectedSolutionLoadAndTelemetry(),
                            ...expectedProjectReferenceLoadAndTelemetry(tsconfigSrcPath),
                            configFileDiagEvent(main.path, tsconfigSrcPath, [])
                        ],
                        expectedReloadEvents: [
                            ...expectedReloadEvent(tsconfigPath),
                            ...expectedReloadEvent(tsconfigSrcPath),
                        ],
                        expectedReferences: {
                            refs: [
                                ...refs,
                                ...expectedIndirectRefs(indirect),
                                ...expectedIndirectRefs(indirect2),
                            ],
                            ...rest
                        },
                        expectedReferencesFromDtsProject: {
                            ...rest,
                            refs: [
                                ...expectedIndirectRefs(fileResolvingToMainDts),
                                ...refs,
                                ...expectedIndirectRefs(indirect),
                                ...expectedIndirectRefs(indirect2),
                            ],
                            symbolDisplayString: "(alias) const foo: 1\nimport foo",
                        }
                    });
                });

                it("disables looking into the child project if disableReferencedProjectLoad is set", () => {
                    const ownMain: File = {
                        path: `${tscWatch.projectRoot}/own/main.ts`,
                        content: fileResolvingToMainDts.content
                    };
                    const expectedProjectsOnOpen: VerifyProjects = {
                        configuredProjects: [
                            { projectName: tsconfigPath, files: [tsconfigPath, ownMain.path, main.path, libFile.path, helper.path] },
                        ],
                        inferredProjects: emptyArray
                    };
                    verifyDisableReferencedProjectLoad({
                        solutionFiles: [`./own/main.ts`],
                        solutionOptions: {
                            outDir: "./target/",
                            baseUrl: "./src/",
                            disableReferencedProjectLoad: true
                        },
                        configRefs: ["./tsconfig-src.json"],
                        additionalFiles: [ownMain],
                        expectedOpenEvents: [
                            ...expectedSolutionLoadAndTelemetry(),
                            configFileDiagEvent(main.path, tsconfigPath, [])
                        ],
                        expectedDefaultProject: service => service.configuredProjects.get(tsconfigPath)!,
                        expectedDefaultConfiguredProject: returnUndefined,
                        expectedProjectsOnOpen,
                        expectedReloadEvents: expectedReloadEvent(tsconfigPath)
                    });
                });

                it("disables looking into the child project if disableReferencedProjectLoad is set in indirect project", () => {
                    const ownMain: File = {
                        path: `${tscWatch.projectRoot}/own/main.ts`,
                        content: `import { bar } from 'main';
bar;`
                    };
                    const { tsconfigIndirect, indirect } = getIndirectProject("1", { disableReferencedProjectLoad: true });
                    const expectedProjectsOnOpen: VerifyProjects = {
                        configuredProjects: [
                            { projectName: tsconfigPath, files: [tsconfigPath, indirect.path, ownMain.path, main.path, libFile.path, helper.path] },
                            { projectName: tsconfigIndirect.path, files: [tsconfigIndirect.path, main.path, helper.path, indirect.path, libFile.path] },
                        ],
                        inferredProjects: emptyArray
                    };
                    verifyDisableReferencedProjectLoad({
                        solutionFiles: [`./own/main.ts`],
                        solutionOptions: {
                            outDir: "./target/",
                            baseUrl: "./indirect1/",
                        },
                        configRefs: ["./tsconfig-indirect1.json"],
                        additionalFiles: [tsconfigIndirect, indirect, ownMain],
                        expectedOpenEvents: [
                            ...expectedSolutionLoadAndTelemetry(),
                            ...expectedProjectReferenceLoadAndTelemetry(tsconfigIndirect.path),
                            configFileDiagEvent(main.path, tsconfigPath, [])
                        ],
                        expectedDefaultProject: service => service.configuredProjects.get(tsconfigPath)!,
                        expectedDefaultConfiguredProject: returnUndefined,
                        expectedProjectsOnOpen,
                        expectedReloadEvents: [
                            ...expectedReloadEvent(tsconfigPath),
                            ...expectedReloadEvent(tsconfigIndirect.path),
                        ]
                    });
                });

                it("disables looking into the child project if disableReferencedProjectLoad is set in first indirect project but not in another one", () => {
                    const ownMain: File = {
                        path: `${tscWatch.projectRoot}/own/main.ts`,
                        content: `import { bar } from 'main';
bar;`
                    };
                    const { tsconfigIndirect, indirect } = getIndirectProject("1", { disableReferencedProjectLoad: true });
                    const { tsconfigIndirect: tsconfigIndirect2, indirect: indirect2 } = getIndirectProject("2");
                    const expectedProjectsOnOpen: VerifyProjects = {
                        configuredProjects: [
                            { projectName: tsconfigPath, files: [tsconfigPath, indirect.path, ownMain.path, main.path, libFile.path, helper.path] },
                            { projectName: tsconfigSrcPath, files: [tsconfigSrcPath, main.path, helper.path, libFile.path] },
                        ],
                        inferredProjects: emptyArray
                    };
                    verifyDisableReferencedProjectLoad({
                        solutionFiles: [`./own/main.ts`],
                        solutionOptions: {
                            outDir: "./target/",
                            baseUrl: "./indirect1/",
                        },
                        configRefs: ["./tsconfig-indirect1.json", "./tsconfig-indirect2.json"],
                        additionalFiles: [tsconfigIndirect, indirect, tsconfigIndirect2, indirect2, ownMain],
                        expectedOpenEvents: [
                            ...expectedSolutionLoadAndTelemetry(),
                            ...expectedProjectReferenceLoadAndTelemetry(tsconfigSrcPath),
                            configFileDiagEvent(main.path, tsconfigSrcPath, [])
                        ],
                        expectedDefaultProject: service => service.configuredProjects.get(tsconfigSrcPath)!,
                        expectedDefaultConfiguredProject: service => service.configuredProjects.get(tsconfigSrcPath)!,
                        expectedProjectsOnOpen,
                        expectedReloadEvents: [
                            ...expectedReloadEvent(tsconfigPath),
                            ...expectedReloadEvent(tsconfigSrcPath),
                        ]
                    });
                });
            });
        });

        describe("when new file is added to the referenced project", () => {
            function setup(extendOptionsProject2?: CompilerOptions) {
                const config1: File = {
                    path: `${tscWatch.projectRoot}/projects/project1/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            module: "none",
                            composite: true
                        },
                        exclude: ["temp"]
                    })
                };
                const class1: File = {
                    path: `${tscWatch.projectRoot}/projects/project1/class1.ts`,
                    content: `class class1 {}`
                };
                const class1Dts: File = {
                    path: `${tscWatch.projectRoot}/projects/project1/class1.d.ts`,
                    content: `declare class class1 {}`
                };
                const config2: File = {
                    path: `${tscWatch.projectRoot}/projects/project2/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            module: "none",
                            composite: true,
                            ...(extendOptionsProject2 || {})
                        },
                        references: [
                            { path: "../project1" }
                        ]
                    })
                };
                const class2: File = {
                    path: `${tscWatch.projectRoot}/projects/project2/class2.ts`,
                    content: `class class2 {}`
                };
                const host = createServerHost([config1, class1, class1Dts, config2, class2, libFile]);
                const session = createSession(host);
                openFilesForSession([class2], session);
                const service = session.getProjectService();
                return { host, session, service, class1, class1Dts, class2, config1, config2 };
            }

            it("when referenced project is not open", () => {
                const { host, service, class1, class2, config2 } = setup();
                checkNumberOfProjects(service, { configuredProjects: 1 });
                const project2 = Debug.checkDefined(service.configuredProjects.get(config2.path));
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1.path, config2.path]);

                // Add new class to referenced project
                const class3 = `${tscWatch.projectRoot}/projects/project1/class3.ts`;
                host.writeFile(class3, `class class3 {}`);
                host.checkTimeoutQueueLengthAndRun(2);
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1.path, config2.path, class3]);
                // Add excluded file to referenced project
                host.ensureFileOrFolder({ path: `${tscWatch.projectRoot}/projects/project1/temp/file.d.ts`, content: `declare class file {}` });
                host.checkTimeoutQueueLengthAndRun(0);
                // Add output from new class to referenced project
                const class3Dts = `${tscWatch.projectRoot}/projects/project1/class3.d.ts`;
                host.writeFile(class3Dts, `declare class class3 {}`);
                host.checkTimeoutQueueLengthAndRun(0);
            });

            it("when referenced project is open", () => {
                const { host, session, service, class1, class2, config1, config2 } = setup();
                openFilesForSession([class1], session);
                checkNumberOfProjects(service, { configuredProjects: 2 });
                const project1 = Debug.checkDefined(service.configuredProjects.get(config1.path));
                checkProjectActualFiles(project1, [libFile.path, class1.path, config1.path]);
                const project2 = Debug.checkDefined(service.configuredProjects.get(config2.path));
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1.path, config2.path]);

                // Add new class to referenced project
                const class3 = `${tscWatch.projectRoot}/projects/project1/class3.ts`;
                host.writeFile(class3, `class class3 {}`);
                host.checkTimeoutQueueLengthAndRun(3);
                checkProjectActualFiles(project1, [libFile.path, class1.path, config1.path, class3]);
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1.path, config2.path, class3]);
                // Add excluded file to referenced project
                host.ensureFileOrFolder({ path: `${tscWatch.projectRoot}/projects/project1/temp/file.d.ts`, content: `declare class file {}` });
                host.checkTimeoutQueueLengthAndRun(0);
                // Add output from new class to referenced project
                const class3Dts = `${tscWatch.projectRoot}/projects/project1/class3.d.ts`;
                host.writeFile(class3Dts, `declare class class3 {}`);
                host.checkTimeoutQueueLengthAndRun(0);
            });

            it("when referenced project is not open with disableSourceOfProjectReferenceRedirect", () => {
                const { host, service, class1Dts, class2, config2 } = setup({ disableSourceOfProjectReferenceRedirect: true });
                checkNumberOfProjects(service, { configuredProjects: 1 });
                const project2 = Debug.checkDefined(service.configuredProjects.get(config2.path));
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1Dts.path, config2.path]);

                // Add new class to referenced project
                const class3 = `${tscWatch.projectRoot}/projects/project1/class3.ts`;
                host.writeFile(class3, `class class3 {}`);
                host.checkTimeoutQueueLengthAndRun(2);
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1Dts.path, config2.path]);
                // Add output of new class to referenced project
                const class3Dts = `${tscWatch.projectRoot}/projects/project1/class3.d.ts`;
                host.writeFile(class3Dts, `declare class class3 {}`);
                host.checkTimeoutQueueLengthAndRun(2);
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1Dts.path, config2.path, class3Dts]);
                // Add excluded file to referenced project
                host.ensureFileOrFolder({ path: `${tscWatch.projectRoot}/projects/project1/temp/file.d.ts`, content: `declare class file {}` });
                host.checkTimeoutQueueLengthAndRun(0);
                // Delete output from new class to referenced project
                host.deleteFile(class3Dts);
                host.checkTimeoutQueueLengthAndRun(2);
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1Dts.path, config2.path]);
                // Write back output of new class to referenced project
                host.writeFile(class3Dts, `declare class class3 {}`);
                host.checkTimeoutQueueLengthAndRun(2);
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1Dts.path, config2.path, class3Dts]);
            });

            it("when referenced project is open with disableSourceOfProjectReferenceRedirect", () => {
                const { host, session, service, class1, class1Dts, class2, config1, config2 } = setup({ disableSourceOfProjectReferenceRedirect: true });
                openFilesForSession([class1], session);
                checkNumberOfProjects(service, { configuredProjects: 2 });
                const project1 = Debug.checkDefined(service.configuredProjects.get(config1.path));
                checkProjectActualFiles(project1, [libFile.path, class1.path, config1.path]);
                const project2 = Debug.checkDefined(service.configuredProjects.get(config2.path));
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1Dts.path, config2.path]);

                // Add new class to referenced project
                const class3 = `${tscWatch.projectRoot}/projects/project1/class3.ts`;
                host.writeFile(class3, `class class3 {}`);
                host.checkTimeoutQueueLengthAndRun(3);
                checkProjectActualFiles(project1, [libFile.path, class1.path, config1.path, class3]);
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1Dts.path, config2.path]);
                // Add output of new class to referenced project
                const class3Dts = `${tscWatch.projectRoot}/projects/project1/class3.d.ts`;
                host.writeFile(class3Dts, `declare class class3 {}`);
                host.checkTimeoutQueueLengthAndRun(2);
                checkProjectActualFiles(project1, [libFile.path, class1.path, config1.path, class3]);
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1Dts.path, config2.path, class3Dts]);
                // Add excluded file to referenced project
                host.ensureFileOrFolder({ path: `${tscWatch.projectRoot}/projects/project1/temp/file.d.ts`, content: `declare class file {}` });
                host.checkTimeoutQueueLengthAndRun(0);
                // Delete output from new class to referenced project
                host.deleteFile(class3Dts);
                host.checkTimeoutQueueLengthAndRun(2);
                checkProjectActualFiles(project1, [libFile.path, class1.path, config1.path, class3]);
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1Dts.path, config2.path]);
                // Write back output of new class to referenced project
                host.writeFile(class3Dts, `declare class class3 {}`);
                host.checkTimeoutQueueLengthAndRun(2);
                checkProjectActualFiles(project1, [libFile.path, class1.path, config1.path, class3]);
                checkProjectActualFiles(project2, [class2.path, libFile.path, class1Dts.path, config2.path, class3Dts]);
            });
        });

        describe("auto import with referenced project", () => {
            function verifyAutoImport(built: boolean, disableSourceOfProjectReferenceRedirect?: boolean) {
                const solnConfig: File = {
                    path: `${tscWatch.projectRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        files: [],
                        references: [
                            { path: "shared/src/library" },
                            { path: "app/src/program" }
                        ]
                    })
                };
                const sharedConfig: File = {
                    path: `${tscWatch.projectRoot}/shared/src/library/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            outDir: "../../bld/library"
                        }
                    })
                };
                const sharedIndex: File = {
                    path: `${tscWatch.projectRoot}/shared/src/library/index.ts`,
                    content: `export function foo() {}`
                };
                const sharedPackage: File = {
                    path: `${tscWatch.projectRoot}/shared/package.json`,
                    content: JSON.stringify({
                        name: "shared",
                        version: "1.0.0",
                        main: "bld/library/index.js",
                        types: "bld/library/index.d.ts"
                    })
                };
                const appConfig: File = {
                    path: `${tscWatch.projectRoot}/app/src/program/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            outDir: "../../bld/program",
                            disableSourceOfProjectReferenceRedirect
                        },
                        references: [
                            { path: "../../../shared/src/library" }
                        ]
                    })
                };
                const appBar: File = {
                    path: `${tscWatch.projectRoot}/app/src/program/bar.ts`,
                    content: `import {foo} from "shared";`
                };
                const appIndex: File = {
                    path: `${tscWatch.projectRoot}/app/src/program/index.ts`,
                    content: `foo`
                };
                const sharedSymlink: SymLink = {
                    path: `${tscWatch.projectRoot}/node_modules/shared`,
                    symLink: `${tscWatch.projectRoot}/shared`
                };
                const files = [solnConfig, sharedConfig, sharedIndex, sharedPackage, appConfig, appBar, appIndex, sharedSymlink, libFile];
                const host = createServerHost(files);
                if (built) {
                    const solutionBuilder = tscWatch.createSolutionBuilder(host, [solnConfig.path], {});
                    solutionBuilder.build();
                    host.clearOutput();
                }
                const session = createSession(host);
                openFilesForSession([appIndex], session);
                const response = session.executeCommandSeq<protocol.CodeFixRequest>({
                    command: protocol.CommandTypes.GetCodeFixes,
                    arguments: {
                        file: appIndex.path,
                        startLine: 1,
                        startOffset: 1,
                        endLine: 1,
                        endOffset: 4,
                        errorCodes: [Diagnostics.Cannot_find_name_0.code],
                    }
                }).response as protocol.CodeFixAction[];
                assert.deepEqual(response, [
                    {
                        fixName: "import",
                        description: `Import 'foo' from module "shared"`,
                        changes: [{
                            fileName: appIndex.path,
                            textChanges: [{
                                start: { line: 1, offset: 1 },
                                end: { line: 1, offset: 1 },
                                newText: 'import { foo } from "shared";\n\n',
                            }],
                        }],
                        commands: undefined,
                        fixAllDescription: undefined,
                        fixId: undefined
                    }
                ]);
            }

            it("when project is built", () => {
                verifyAutoImport(/*built*/ true);
            });
            it("when project is not built", () => {
                verifyAutoImport(/*built*/ false);
            });
            it("when disableSourceOfProjectReferenceRedirect is true", () => {
                verifyAutoImport(/*built*/ true, /*disableSourceOfProjectReferenceRedirect*/ true);
            });
        });

        it("when files from two projects are open and one project references", () => {
            function getPackageAndFile(packageName: string, references?: string[], optionsToExtend?: CompilerOptions): [file: File, config: File] {
                const file: File = {
                    path: `${tscWatch.projectRoot}/${packageName}/src/file1.ts`,
                    content: `export const ${packageName}Const = 10;`
                };
                const config: File = {
                    path: `${tscWatch.projectRoot}/${packageName}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { composite: true, ...optionsToExtend || {} },
                        references: references?.map(path => ({ path: `../${path}` }))
                    })
                };
                return [file, config];
            }
            const [mainFile, mainConfig] = getPackageAndFile("main", ["core", "indirect", "noCoreRef1", "indirectDisabledChildLoad1", "indirectDisabledChildLoad2", "refToCoreRef3", "indirectNoCoreRef"]);
            const [coreFile, coreConfig] = getPackageAndFile("core");
            const [noCoreRef1File, noCoreRef1Config] = getPackageAndFile("noCoreRef1");
            const [indirectFile, indirectConfig] = getPackageAndFile("indirect", ["coreRef1"]);
            const [coreRef1File, coreRef1Config] = getPackageAndFile("coreRef1", ["core"]);
            const [indirectDisabledChildLoad1File, indirectDisabledChildLoad1Config] = getPackageAndFile("indirectDisabledChildLoad1", ["coreRef2"], { disableReferencedProjectLoad: true });
            const [coreRef2File, coreRef2Config] = getPackageAndFile("coreRef2", ["core"]);
            const [indirectDisabledChildLoad2File, indirectDisabledChildLoad2Config] = getPackageAndFile("indirectDisabledChildLoad2", ["coreRef3"], { disableReferencedProjectLoad: true });
            const [coreRef3File, coreRef3Config] = getPackageAndFile("coreRef3", ["core"]);
            const [refToCoreRef3File, refToCoreRef3Config] = getPackageAndFile("refToCoreRef3", ["coreRef3"]);
            const [indirectNoCoreRefFile, indirectNoCoreRefConfig] = getPackageAndFile("indirectNoCoreRef", ["noCoreRef2"]);
            const [noCoreRef2File, noCoreRef2Config] = getPackageAndFile("noCoreRef2");

            const host = createServerHost([
                libFile, mainFile, mainConfig, coreFile, coreConfig, noCoreRef1File, noCoreRef1Config,
                indirectFile, indirectConfig, coreRef1File, coreRef1Config,
                indirectDisabledChildLoad1File, indirectDisabledChildLoad1Config, coreRef2File, coreRef2Config,
                indirectDisabledChildLoad2File, indirectDisabledChildLoad2Config, coreRef3File, coreRef3Config,
                refToCoreRef3File, refToCoreRef3Config,
                indirectNoCoreRefFile, indirectNoCoreRefConfig, noCoreRef2File, noCoreRef2Config
            ], { useCaseSensitiveFileNames: true });
            const session = createSession(host);
            const service = session.getProjectService();
            openFilesForSession([mainFile, coreFile], session);

            verifyProject(mainConfig);
            verifyProject(coreConfig);

            // Find all refs in coreFile
            session.executeCommandSeq<protocol.ReferencesRequest>({
                command: protocol.CommandTypes.References,
                arguments: protocolFileLocationFromSubstring(coreFile, `coreConst`)
            });
            verifyProject(mainConfig);
            verifyProject(coreConfig);
            verifyNoProject(noCoreRef1Config); // Should not be loaded
            verifyProject(indirectConfig);
            verifyProject(coreRef1Config);
            verifyProject(indirectDisabledChildLoad1Config);
            verifyNoProject(coreRef2Config); // Should not be loaded
            verifyProject(indirectDisabledChildLoad2Config);
            verifyProject(coreRef3Config);
            verifyProject(refToCoreRef3Config);
            verifyNoProject(indirectNoCoreRefConfig); // Should not be loaded
            verifyNoProject(noCoreRef2Config); // Should not be loaded

            function verifyProject(config: File) {
                assert.isDefined(service.configuredProjects.get(config.path), `Expected to find ${config.path}`);
            }

            function verifyNoProject(config: File) {
                assert.isUndefined(service.configuredProjects.get(config.path), `Expected to not find ${config.path}`);
            }
        });
    });
}
