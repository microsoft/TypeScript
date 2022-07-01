namespace ts.projectSystem {
    describe("unittests:: tsserver:: cacheResolutions:: tsserverProjectSystem caching module resolutions option", () => {
        describe("multi file project", () => {
            verifyTsserverWithNode16("caching resolutions in multi file scenario when project is not built", tscWatch.cacheResolutions.getServerHostWithNode16);
            verifyTsserverWithNode16("caching resolutions in multi file scenario when project is built", tscWatch.cacheResolutions.getServerHostWithNode16WithBuild);
            function verifyTsserverWithNode16(scenario: string, createHost: () => TestServerHost) {
                it(scenario, () => {
                    const host = createHost();
                    fakes.patchHostForBuildInfoReadWrite(host);
                    const logger = createLoggerWithInMemoryLogs();
                    const session = createSession(host, { logger });
                    openFilesForSession(["/src/project/randomFileForImport.ts", "/src/project/randomFileForTypeRef.ts"], session);

                    logger.info("modify randomFileForImport by adding import");
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: "/src/project/randomFileForImport.ts",
                            line: 1,
                            offset: 1,
                            endLine: 1,
                            endOffset: 1,
                            insertString: `import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };\n`,
                        }
                    });
                    server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                    logger.info("modify randomFileForTypeRef by adding typeRef");
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: "/src/project/randomFileForTypeRef.ts",
                            line: 1,
                            offset: 1,
                            endLine: 1,
                            endOffset: 1,
                            insertString: `/// <reference types="pkg2" resolution-mode="import"/>\n`,
                        }
                    });
                    server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                    logger.info("write file not resolved by import");
                    host.writeFile("/src/project/node_modules/pkg1/require.d.ts", tscWatch.cacheResolutions.getPkgImportContent("Require", 1));
                    host.runQueuedTimeoutCallbacks(); // failed lookup
                    host.runQueuedTimeoutCallbacks(); // actual update

                    logger.info("write file not resolved by typeRef");
                    host.writeFile("/src/project/node_modules/pkg3/require.d.ts", tscWatch.cacheResolutions.getPkgImportContent("Require", 3));
                    host.runQueuedTimeoutCallbacks(); // failed lookup
                    host.runQueuedTimeoutCallbacks(); // actual update

                    logger.info("delete file with imports");
                    host.deleteFile("/src/project/fileWithImports.ts");
                    host.runQueuedTimeoutCallbacks();

                    logger.info("delete file with typeRefs");
                    host.deleteFile("/src/project/fileWithTypeRefs.ts");
                    host.runQueuedTimeoutCallbacks();

                    logger.info("delete resolved import file");
                    host.deleteFile("/src/project/node_modules/pkg0/import.d.ts");
                    host.runQueuedTimeoutCallbacks();

                    logger.info("delete resolved typeRef file");
                    host.deleteFile("/src/project/node_modules/pkg2/import.d.ts");
                    host.runQueuedTimeoutCallbacks();

                    baselineTsserverLogs("cacheResolutions", scenario, session);
                });
            }
        });

        describe("with bundle emit", () => {
            verifyTsserverWithNode16("caching resolutions with bundle emit when project is not built", tscWatch.cacheResolutions.getServerHostWithOut);
            verifyTsserverWithNode16("caching resolutions with bundle emit when project is built", tscWatch.cacheResolutions.getServerHostWithOutWithBuild);
            function verifyTsserverWithNode16(scenario: string, createHost: () => TestServerHost) {
                it(scenario, () => {
                    const host = createHost();
                    fakes.patchHostForBuildInfoReadWrite(host);
                    const logger = createLoggerWithInMemoryLogs();
                    const session = createSession(host, { logger });
                    openFilesForSession(["/src/project/randomFileForImport.ts", "/src/project/randomFileForTypeRef.ts"], session);

                    logger.info("modify randomFileForImport by adding import");
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: "/src/project/randomFileForImport.ts",
                            line: 1,
                            offset: 1,
                            endLine: 1,
                            endOffset: 1,
                            insertString: `import type { ImportInterface0 } from "pkg0";\n`,
                        }
                    });
                    server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                    logger.info("modify randomFileForTypeRef by adding typeRef");
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: "/src/project/randomFileForTypeRef.ts",
                            line: 1,
                            offset: 1,
                            endLine: 1,
                            endOffset: 1,
                            insertString: `/// <reference types="pkg2"/>\n`,
                        }
                    });
                    server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                    logger.info("write file not resolved by import");
                    host.writeFile("/src/project/pkg1.d.ts", tscWatch.cacheResolutions.getPkgImportContent("Require", 1));
                    host.runQueuedTimeoutCallbacks(); // failed lookup
                    host.runQueuedTimeoutCallbacks(); // actual update

                    logger.info("write file not resolved by typeRef");
                    host.ensureFileOrFolder({
                        path: "/src/project/node_modules/pkg3/index.d.ts",
                        content: tscWatch.cacheResolutions.getPkgImportContent("Require", 3)
                    });
                    host.runQueuedTimeoutCallbacks(); // failed lookup
                    host.runQueuedTimeoutCallbacks(); // actual update

                    logger.info("delete file with imports");
                    host.deleteFile("/src/project/fileWithImports.ts");
                    host.runQueuedTimeoutCallbacks();

                    logger.info("delete file with typeRefs");
                    host.deleteFile("/src/project/fileWithTypeRefs.ts");
                    host.runQueuedTimeoutCallbacks();

                    logger.info("delete resolved import file");
                    host.deleteFile("/src/project/pkg0.d.ts");
                    host.runQueuedTimeoutCallbacks();

                    logger.info("delete resolved typeRef file");
                    host.deleteFile("/src/project/node_modules/pkg2/index.d.ts");
                    host.runQueuedTimeoutCallbacks();

                    baselineTsserverLogs("cacheResolutions", scenario, session);
                });
            }
        });

        describe("on sample project", () => {
            function cacheResolutions(file: File) {
                const content = JSON.parse(file.content);
                content.compilerOptions = {
                    ...content.compilerOptions || {},
                    cacheResolutions: true,
                    traceResolution: true,
                };
                file.content = JSON.stringify(content, /*replacer*/ undefined, 4);
                return file;
            }

            function setupHost() {
                const coreConfig = cacheResolutions(TestFSWithWatch.getTsBuildProjectFile("sample1", "core/tsconfig.json"));
                const coreIndex = TestFSWithWatch.getTsBuildProjectFile("sample1", "core/index.ts");
                const coreAnotherModule = TestFSWithWatch.getTsBuildProjectFile("sample1", "core/anotherModule.ts");
                const coreSomeDecl = TestFSWithWatch.getTsBuildProjectFile("sample1", "core/some_decl.d.ts");
                const logicConfig = cacheResolutions(TestFSWithWatch.getTsBuildProjectFile("sample1", "logic/tsconfig.json"));
                const logicIndex = TestFSWithWatch.getTsBuildProjectFile("sample1", "logic/index.ts");
                const testsConfig = cacheResolutions(TestFSWithWatch.getTsBuildProjectFile("sample1", "tests/tsconfig.json"));
                const testsIndex = TestFSWithWatch.getTsBuildProjectFile("sample1", "tests/index.ts");
                const host = createServerHost([libFile, coreConfig, coreIndex, coreAnotherModule, coreSomeDecl, logicConfig, logicIndex, testsConfig, testsIndex]);
                return { host, testsConfig, testsIndex };
            }

            it("uses saved resolution for program", () => {
                const { host, testsConfig, testsIndex } = setupHost();
                tscWatch.solutionBuildWithBaseline(host, [testsConfig.path]);
                fakes.patchHostForBuildInfoReadWrite(host);
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs() });
                openFilesForSession([testsIndex], session);
                baselineTsserverLogs("cacheResolutions", "uses saved resolution for program with sample project", session);
            });

            it("creates new resolutions for program if tsbuildinfo is not present", () => {
                const { host, testsConfig, testsIndex } = setupHost();
                tscWatch.solutionBuildWithBaseline(host, [testsConfig.path]);
                fakes.patchHostForBuildInfoReadWrite(host);
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs() });
                openFilesForSession([testsIndex], session);
                baselineTsserverLogs("cacheResolutions", "creates new resolutions for program if tsbuildinfo is not present with sample project", session);
            });
        });

        describe("project where d.ts file contains fewer modules than original file", () => {
            function setupHost() {
                const coreConfig: File = {
                    path: `${tscWatch.projectRoot}/core/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { composite: true, cacheResolutions: true, traceResolution: true } })
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
                        compilerOptions: { composite: true, cacheResolutions: true, traceResolution: true },
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
                        compilerOptions: { composite: true, cacheResolutions: true, traceResolution: true },
                        references: [{ path: "../logic" }]
                    })
                };
                const testsIndex: File = {
                    path: `${tscWatch.projectRoot}/tests/index.ts`,
                    content: `import { returnMyClass } from "../logic";
    returnMyClass();`
                };
                const host = createServerHost([libFile, coreConfig, coreIndex, coreMyClass, coreAnotherClass, logicConfig, logicIndex, testsConfig, testsIndex]);
                return { host, testsConfig, testsIndex };
            }

            it("uses saved resolution for program", () => {
                const { host, testsConfig, testsIndex } = setupHost();
                tscWatch.solutionBuildWithBaseline(host, [testsConfig.path]);
                fakes.patchHostForBuildInfoReadWrite(host);
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs() });
                openFilesForSession([testsIndex], session);
                baselineTsserverLogs("cacheResolutions", "uses saved resolution for program with project where dts file contains fewer modules than original file", session);
            });

            it("creates new resolutions for program if tsbuildinfo is not present", () => {
                const { host, testsConfig, testsIndex } = setupHost();
                tscWatch.solutionBuildWithBaseline(host, [testsConfig.path]);
                fakes.patchHostForBuildInfoReadWrite(host);
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs() });
                openFilesForSession([testsIndex], session);
                baselineTsserverLogs("cacheResolutions", "creates new resolutions for program if tsbuildinfo is not present with project where dts file contains fewer modules than original file", session);
            });
        });
    });
}