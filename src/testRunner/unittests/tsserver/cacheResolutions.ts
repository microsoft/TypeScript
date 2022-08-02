import * as ts from "../../_namespaces/ts";
import * as fakes from "../../_namespaces/fakes";
import * as Utils from "../../_namespaces/Utils";
import {
    createServerHost,
    File,
    getTsBuildProjectFile,
    libFile,
    TestServerHost,
} from "../virtualFileSystemWithWatch";
import {
    solutionBuildWithBaseline,
} from "../tscWatch/helpers";
import {
    baselineTsserverLogs,
    createLoggerWithInMemoryLogs,
    createSession,
    openFilesForSession,
} from "./helpers";
import {
    getPkgImportContent,
    getServerHostWithMultipleProjects,
    getServerHostWithMultipleProjectsWithBuild,
    getServerHostWithNode16,
    getServerHostWithNode16WithBuild,
    getServerHostWithOut,
    getServerHostWithOutWithBuild,
    getServerHostWithPackageJsonEdits,
    getServerHostWithPackageJsonEditsWithBuild,
    getServerHostWithSameResolutionFromMultiplePlaces,
    getServerHostWithSameResolutionFromMultiplePlacesWithBuild,
} from "../tsbuild/cacheResolutionsHelper";

describe("unittests:: tsserver:: cacheResolutions:: tsserverProjectSystem caching module resolutions option", () => {
    describe("multi file project", () => {
        verifyTsserverMultiFile("multi file not built", getServerHostWithNode16);
        verifyTsserverMultiFile("multi file", getServerHostWithNode16WithBuild);
        function verifyTsserverMultiFile(scenario: string, createHost: () => TestServerHost) {
            it(scenario, () => {
                const host = fakes.patchHostForBuildInfoReadWrite(createHost());
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
                openFilesForSession(["/src/project/randomFileForImport.ts", "/src/project/randomFileForTypeRef.ts"], session);

                session.logger.info("modify randomFileForImport by adding import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify randomFileForTypeRef by adding typeRef");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/randomFileForTypeRef.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `/// <reference types="pkg2" resolution-mode="import"/>\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("write file not resolved by import");
                host.writeFile("/src/project/node_modules/pkg1/require.d.ts", getPkgImportContent("Require", 1));
                host.runQueuedTimeoutCallbacks(); // failed lookup
                host.runQueuedTimeoutCallbacks(); // actual update

                session.logger.info("write file not resolved by typeRef");
                host.writeFile("/src/project/node_modules/pkg3/require.d.ts", getPkgImportContent("Require", 3));
                host.runQueuedTimeoutCallbacks(); // failed lookup
                host.runQueuedTimeoutCallbacks(); // actual update

                session.logger.info("modify package.json and that should re-resolve");
                host.replaceFileText("/src/project/node_modules/pkg1/package.json", "./require.js", "./require1.js");
                host.runQueuedTimeoutCallbacks(); // failed lookup
                host.runQueuedTimeoutCallbacks(); // actual update

                session.logger.info("write file not resolved by import");
                host.writeFile("/src/project/node_modules/pkg1/require1.d.ts", getPkgImportContent("Require", 1));
                host.runQueuedTimeoutCallbacks(); // failed lookup
                host.runQueuedTimeoutCallbacks(); // actual update

                session.logger.info("delete file with imports");
                host.deleteFile("/src/project/fileWithImports.ts");
                host.runQueuedTimeoutCallbacks();

                session.logger.info("delete file with typeRefs");
                host.deleteFile("/src/project/fileWithTypeRefs.ts");
                host.runQueuedTimeoutCallbacks();

                session.logger.info("delete resolved import file");
                host.deleteFile("/src/project/node_modules/pkg0/import.d.ts");
                host.runQueuedTimeoutCallbacks();

                session.logger.info("delete resolved typeRef file");
                host.deleteFile("/src/project/node_modules/pkg2/import.d.ts");
                host.runQueuedTimeoutCallbacks();

                baselineTsserverLogs("cacheResolutions", scenario, session);
            });
        }
    });

    describe("with bundle emit", () => {
        verifyTsserverBundleEmit("bundle emit not built", getServerHostWithOut);
        verifyTsserverBundleEmit("bundle emit", getServerHostWithOutWithBuild);
        function verifyTsserverBundleEmit(scenario: string, createHost: () => TestServerHost) {
            it(scenario, () => {
                const host = fakes.patchHostForBuildInfoReadWrite(createHost());
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
                openFilesForSession(["/src/project/randomFileForImport.ts", "/src/project/randomFileForTypeRef.ts"], session);

                session.logger.info("modify randomFileForImport by adding import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface0 } from "pkg0";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify randomFileForTypeRef by adding typeRef");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/randomFileForTypeRef.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `/// <reference types="pkg2"/>\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("write file not resolved by import");
                host.writeFile("/src/project/pkg1.d.ts", getPkgImportContent("Require", 1));
                host.runQueuedTimeoutCallbacks(); // failed lookup
                host.runQueuedTimeoutCallbacks(); // actual update

                session.logger.info("write file not resolved by typeRef");
                host.ensureFileOrFolder({
                    path: "/src/project/node_modules/pkg3/index.d.ts",
                    content: getPkgImportContent("Require", 3)
                });
                host.runQueuedTimeoutCallbacks(); // failed lookup
                host.runQueuedTimeoutCallbacks(); // actual update

                session.logger.info("delete file with imports");
                host.deleteFile("/src/project/fileWithImports.ts");
                host.runQueuedTimeoutCallbacks();

                session.logger.info("delete file with typeRefs");
                host.deleteFile("/src/project/fileWithTypeRefs.ts");
                host.runQueuedTimeoutCallbacks();

                session.logger.info("delete resolved import file");
                host.deleteFile("/src/project/pkg0.d.ts");
                host.runQueuedTimeoutCallbacks();

                session.logger.info("delete resolved typeRef file");
                host.deleteFile("/src/project/node_modules/pkg2/index.d.ts");
                host.runQueuedTimeoutCallbacks();

                baselineTsserverLogs("cacheResolutions", scenario, session);
            });
        }
    });

    describe("multi project", () => {
        verifyTsserverMultiProject("multi project not built", getServerHostWithMultipleProjects, "bRandomFileForImport", "/src/project/tsconfig.b.json");
        verifyTsserverMultiProject("multi project mixed redirect options not built", getServerHostWithMultipleProjects, "cRandomFileForImport");
        verifyTsserverMultiProject("multi project", getServerHostWithMultipleProjectsWithBuild, "bRandomFileForImport", "/src/project/tsconfig.b.json");
        verifyTsserverMultiProject("multi project mixed redirect options", getServerHostWithMultipleProjectsWithBuild, "cRandomFileForImport");
        function verifyTsserverMultiProject(scenario: string, createHost: () => TestServerHost, file: string, project?: string) {
            it(scenario, () => {
                const host = fakes.patchHostForBuildInfoReadWrite(createHost());
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
                openFilesForSession([`/src/project/${file}.ts`], session);

                session.logger.info(`modify ${file} by adding import`);
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: `/src/project/${file}.ts`,
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `export type { ImportInterface0 } from "pkg0";\n`,
                    }
                });
                if (project) ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get(project)!);
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);
                baselineTsserverLogs("cacheResolutions", scenario, session);
            });
        }
    });

    describe("resolution reuse from multiple places", () => {
        verifyTsserverMultiPlaces("multiple places not built", getServerHostWithSameResolutionFromMultiplePlaces);
        verifyTsserverMultiPlaces("multiple places", getServerHostWithSameResolutionFromMultiplePlacesWithBuild);
        it("multiple places first pass", () => {
            const host = getServerHostWithSameResolutionFromMultiplePlacesWithBuild();
            host.prependFile("/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts", `import type { ImportInterface0 } from "pkg0";\n`);
            fakes.patchHostForBuildInfoReadWrite(host);
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
            openFilesForSession(["/src/project/randomFileForImport.ts"], session);
            baselineTsserverLogs("cacheResolutions", "multiple places first pass", session);
        });
        function verifyTsserverMultiPlaces(scenario: string, createHost: () => TestServerHost) {
            it(scenario, () => {
                const host = fakes.patchHostForBuildInfoReadWrite(createHost());
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
                openFilesForSession([
                    "/src/project/randomFileForImport.ts",
                    "/src/project/b/randomFileForImport.ts",
                    "/src/project/c/ca/caa/randomFileForImport.ts",
                    "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
                    "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
                ], session);

                session.logger.info("modify randomFileForImport by adding import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface0 } from "pkg0";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify b/randomFileForImport by adding import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/b/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface0 } from "pkg0";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify c/ca/caa/randomFileForImport by adding import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/c/ca/caa/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface0 } from "pkg0";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface0 } from "pkg0";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface0 } from "pkg0";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify randomFileForImport by adding unresolved import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface1 } from "pkg1";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify b/randomFileForImport by adding unresolved import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/b/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface1 } from "pkg1";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify c/ca/caa/randomFileForImport by adding unresolved import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/c/ca/caa/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface1 } from "pkg1";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify d/da/daa/daaa/x/y/z/randomFileForImport by adding unresolved import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface1 } from "pkg1";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding unresolved import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface1 } from "pkg1";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify f/fa/faa/x/y/z/randomFileForImport by adding import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/f/fa/faa/x/y/z/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface0 } from "pkg0";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("modify f/fa/faa/x/y/z/randomFileForImport by adding unresolved import");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/project/f/fa/faa/x/y/z/randomFileForImport.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `import type { ImportInterface1 } from "pkg1";\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/project/tsconfig.json")!);

                session.logger.info("add file for unresolved import and random edit");
                host.ensureFileOrFolder({ path: "/src/project/node_modules/pkg1/index.d.ts", content: getPkgImportContent("Import", 1) });
                host.appendFile("/src/project/randomFileForImport.ts", `export const y = 10;`);
                host.runQueuedTimeoutCallbacks(); // Failed lookups
                host.runQueuedTimeoutCallbacks(); // actual update

                baselineTsserverLogs("cacheResolutions", scenario, session);
            });
        }
    });

    describe("packageJson edited", () => {
        verifyTscWatchPackageJsonEdits("packageJson edited", getServerHostWithPackageJsonEdits);
        verifyTscWatchPackageJsonEdits("packageJson edited already built", getServerHostWithPackageJsonEditsWithBuild);
        function verifyTscWatchPackageJsonEdits(scenario: string, createHost: () => TestServerHost) {
            it(scenario, () => {
                const host = fakes.patchHostForBuildInfoReadWrite(createHost());
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
                openFilesForSession(["/src/projects/project/src/randomFile.ts"], session);

                session.logger.info("random edit");
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: "/src/projects/project/src/randomFile.ts",
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `export cont y = 10;\n`,
                    }
                });
                ts.server.updateProjectIfDirty(session.getProjectService().configuredProjects.get("/src/projects/project/src/tsconfig.json")!);

                session.logger.info("Modify package json file to add type module");
                host.writeFile(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0", type: "module" }));
                host.runQueuedTimeoutCallbacks(); // failed lookup
                host.runQueuedTimeoutCallbacks(); // actual update

                session.logger.info("Modify package.json file to remove type module");
                host.writeFile(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0" }));
                host.runQueuedTimeoutCallbacks(); // failed lookup
                host.runQueuedTimeoutCallbacks(); // actual update

                session.logger.info("Delete package.json");
                host.deleteFile(`/src/projects/project/package.json`);
                host.runQueuedTimeoutCallbacks(); // failed lookup
                host.runQueuedTimeoutCallbacks(); // actual update

                session.logger.info("Add package json file with type module");
                host.writeFile(`/src/projects/project/package.json`, JSON.stringify({ name: "app", version: "1.0.0", type: "module" }));
                host.runQueuedTimeoutCallbacks(); // failed lookup
                host.runQueuedTimeoutCallbacks(); // actual update

                session.logger.info("Delete package.json");
                host.deleteFile(`/src/projects/project/package.json`);
                host.runQueuedTimeoutCallbacks(); // failed lookup
                host.runQueuedTimeoutCallbacks(); // actual update

                baselineTsserverLogs("cacheResolutions", scenario, session);
            });
        }
    });

    describe("different projects", () => {
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
                const coreConfig = cacheResolutions(getTsBuildProjectFile("sample1", "core/tsconfig.json"));
                const coreIndex = getTsBuildProjectFile("sample1", "core/index.ts");
                const coreAnotherModule = getTsBuildProjectFile("sample1", "core/anotherModule.ts");
                const coreSomeDecl = getTsBuildProjectFile("sample1", "core/some_decl.d.ts");
                const logicConfig = cacheResolutions(getTsBuildProjectFile("sample1", "logic/tsconfig.json"));
                const logicIndex = getTsBuildProjectFile("sample1", "logic/index.ts");
                const testsConfig = cacheResolutions(getTsBuildProjectFile("sample1", "tests/tsconfig.json"));
                const testsIndex = getTsBuildProjectFile("sample1", "tests/index.ts");
                const host = createServerHost([libFile, coreConfig, coreIndex, coreAnotherModule, coreSomeDecl, logicConfig, logicIndex, testsConfig, testsIndex]);
                return { host, testsConfig, testsIndex };
            }
            verifyOnProject("sample project", setupHost);
        });

        describe("project where d.ts file contains fewer modules than original file", () => {
            function setupHost() {
                const coreConfig: File = {
                    path: `/user/username/projects/sample1/core/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { composite: true, cacheResolutions: true, traceResolution: true } })
                };
                const coreIndex: File = {
                    path: `/user/username/projects/sample1/core/index.ts`,
                    content: `export function bar() { return 10; }`
                };
                const coreMyClass: File = {
                    path: `/user/username/projects/sample1/core/myClass.ts`,
                    content: `export class myClass { }`
                };
                const coreAnotherClass: File = {
                    path: `/user/username/projects/sample1/core/anotherClass.ts`,
                    content: `export class anotherClass { }`
                };
                const logicConfig: File = {
                    path: `/user/username/projects/sample1/logic/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { composite: true, cacheResolutions: true, traceResolution: true },
                        references: [{ path: "../core" }]
                    })
                };
                const logicIndex: File = {
                    path: `/user/username/projects/sample1/logic/index.ts`,
                    content: Utils.dedent`
                        import { myClass } from "../core/myClass";
                        import { bar } from "../core";
                        import { anotherClass } from "../core/anotherClass";
                        export function returnMyClass() {
                            bar();
                            return new myClass();
                        }
                        export function returnAnotherClass() {
                            return new anotherClass();
                        }
                    `
                };
                const testsConfig: File = {
                    path: `/user/username/projects/sample1/tests/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { composite: true, cacheResolutions: true, traceResolution: true },
                        references: [{ path: "../logic" }]
                    })
                };
                const testsIndex: File = {
                    path: `/user/username/projects/sample1/tests/index.ts`,
                    content: Utils.dedent`
                        import { returnMyClass } from "../logic";
                        returnMyClass();
                    `
                };
                const host = createServerHost([libFile, coreConfig, coreIndex, coreMyClass, coreAnotherClass, logicConfig, logicIndex, testsConfig, testsIndex]);
                return { host, testsConfig, testsIndex };
            }

            verifyOnProject("dts has fewer resolutions than ts", setupHost);
        });

        function verifyOnProject(
            scenario: string,
            setupHost: () => {
                host: TestServerHost;
                testsConfig: File;
                testsIndex: File;
            }) {
            it(scenario, () => {
                const { host, testsConfig, testsIndex } = setupHost();
                solutionBuildWithBaseline(host, [testsConfig.path]);
                fakes.patchHostForBuildInfoReadWrite(host);
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
                openFilesForSession([testsIndex], session);
                baselineTsserverLogs("cacheResolutions", scenario, session);
            });
            it(`${scenario} not built`, () => {
                const { host, testsIndex } = setupHost();
                fakes.patchHostForBuildInfoReadWrite(host);
                const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
                openFilesForSession([testsIndex], session);
                baselineTsserverLogs("cacheResolutions", `${scenario} not built`, session);
            });
        }
    });
});