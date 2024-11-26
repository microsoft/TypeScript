import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { compilerOptionsToConfigJson } from "../helpers/contents.js";
import { ensureErrorFreeBuild } from "../helpers/solutionBuilder.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    projectInfoForSession,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import {
    File,
    libFile,
    SymLink,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: configuredProjects::", () => {
    it("create configured project without file list", () => {
        const configFile: File = {
            path: "/home/src/project/project/a/b/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {},
                exclude: ["e"],
            }),
        };
        const file1: File = {
            path: "/home/src/project/project/a/b/c/f1.ts",
            content: "let x = 1",
        };
        const file2: File = {
            path: "/home/src/project/project/a/b/d/f2.ts",
            content: "let y = 1",
        };
        const file3: File = {
            path: "/home/src/project/project/a/b/e/f3.ts",
            content: "let z = 1",
        };

        const host = TestServerHost.createServerHost([configFile, file1, file2, file3]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);
        baselineTsserverLogs("configuredProjects", "create configured project without file list", session);
    });

    it("create configured project with the file list", () => {
        const configFile: File = {
            path: "/home/src/project/project/a/b/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {},
                include: ["*.ts"],
            }),
        };
        const file1: File = {
            path: "/home/src/project/project/a/b/f1.ts",
            content: "let x = 1",
        };
        const file2: File = {
            path: "/home/src/project/project/a/b/f2.ts",
            content: "let y = 1",
        };
        const file3: File = {
            path: "/home/src/project/project/a/b/c/f3.ts",
            content: "let z = 1",
        };

        const host = TestServerHost.createServerHost([configFile, file1, file2, file3]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);
        baselineTsserverLogs("configuredProjects", "create configured project with the file list", session);
    });

    it("add and then remove a config file in a folder with loose files", () => {
        const configFile: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: jsonToReadableText({ files: ["commonFile1.ts"] }),
        };
        const commonFile1: File = {
            path: `/user/username/projects/myproject/commonFile1.ts`,
            content: "let x = 1",
        };
        const commonFile2: File = {
            path: `/user/username/projects/myproject/commonFile2.ts`,
            content: "let y = 1",
        };

        const host = TestServerHost.createServerHost([commonFile1, commonFile2]);

        const session = new TestSession(host);
        // 1: when both files are open
        openFilesForSession([commonFile1, commonFile2], session);

        // Add a tsconfig file
        host.writeFile(configFile.path, configFile.content);
        host.runQueuedTimeoutCallbacks(); // load configured project from disk + ensureProjectsForOpenFiles

        // remove the tsconfig file
        host.deleteFile(configFile.path);
        host.runQueuedTimeoutCallbacks(); // Refresh inferred projects

        // Add a tsconfig file
        host.writeFile(configFile.path, configFile.content);
        host.runQueuedTimeoutCallbacks(); // load configured project from disk + ensureProjectsForOpenFiles

        openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);
        // Check status when all files are closed
        closeFilesForSession([commonFile1, commonFile2, "/user/username/projects/random/random.ts"], session);
        openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

        // 2: when file is opened while config file is deleted
        closeFilesForSession(["/user/username/projects/random/random.ts"], session);
        openFilesForSession([commonFile1], session);

        // remove the tsconfig file
        host.deleteFile(configFile.path);
        openFilesForSession([commonFile2], session);

        // Add a tsconfig file
        host.writeFile(configFile.path, configFile.content);
        host.runQueuedTimeoutCallbacks(); // load configured project from disk + ensureProjectsForOpenFiles

        openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);
        // Check status when all files are closed
        closeFilesForSession([commonFile1, commonFile2, "/user/username/projects/random/random.ts"], session);
        openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

        baselineTsserverLogs("configuredProjects", "add and then remove a config file in a folder with loose files", session);
    });

    describe("add and then remove a config file with another config", () => {
        function setup(parentOrSiblingConfigFile: File) {
            const configFile: File = {
                path: `/user/username/projects/myproject/folder/tsconfig.json`,
                content: jsonToReadableText({ files: ["commonFile1.ts"] }),
            };
            const commonFile1: File = {
                path: `/user/username/projects/myproject/folder/commonFile1.ts`,
                content: "let x = 1",
            };
            const commonFile2: File = {
                path: `/user/username/projects/myproject/folder/commonFile2.ts`,
                content: "let y = 1",
            };

            const host = TestServerHost.createServerHost([commonFile1, commonFile2, configFile, parentOrSiblingConfigFile]);
            const session = new TestSession(host);
            return { host, session, commonFile1, commonFile2, configFile };
        }
        function verify(scenario: string, parentOrSiblingConfigFile: File) {
            it(`add and then remove a config file ${scenario}`, () => {
                const { host, session, commonFile1, commonFile2, configFile } = setup(parentOrSiblingConfigFile);

                openFilesForSession([commonFile1], session);
                projectInfoForSession(session, commonFile1);

                session.logger.log("1: When config file is deleted and then another file is opened");
                // remove the tsconfig file
                host.deleteFile(configFile.path);
                openFilesForSession([commonFile2], session);

                // Add a tsconfig file
                host.writeFile(configFile.path, configFile.content);
                host.runQueuedTimeoutCallbacks();

                // Check the state after files collected
                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

                // Check status when all files are closed
                closeFilesForSession([commonFile1, commonFile2, "/user/username/projects/random/random.ts"], session);
                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

                closeFilesForSession(["/user/username/projects/random/random.ts"], session);
                openFilesForSession([commonFile1, commonFile2], session);

                session.logger.log("2: When both files are open and config file is deleted");
                // remove the tsconfig file
                host.deleteFile(configFile.path);
                host.runQueuedTimeoutCallbacks();

                // Add a tsconfig file
                host.writeFile(configFile.path, configFile.content);
                host.runQueuedTimeoutCallbacks(); // load configured project from disk + ensureProjectsForOpenFiles

                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

                closeFilesForSession([commonFile1, commonFile2, "/user/username/projects/random/random.ts"], session);
                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

                closeFilesForSession(["/user/username/projects/random/random.ts"], session);
                openFilesForSession([commonFile1], session);

                session.logger.log("3: Check when both files are closed when config file is deleted");
                // remove the tsconfig file
                host.deleteFile(configFile.path);
                openFilesForSession([commonFile2], session);

                // State after open files are closed
                closeFilesForSession([commonFile1, commonFile2], session);
                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

                host.writeFile(configFile.path, configFile.content);
                closeFilesForSession(["/user/username/projects/random/random.ts"], session);
                openFilesForSession([commonFile1], session);

                session.logger.log("4: Check when both files are closed one by one when file is deleted");
                // remove the tsconfig file
                host.deleteFile(configFile.path);
                openFilesForSession([commonFile2], session);

                // State after open files are closed
                closeFilesForSession([commonFile1], session);
                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

                closeFilesForSession([commonFile2, "/user/username/projects/random/random.ts"], session);
                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

                host.writeFile(configFile.path, configFile.content);
                closeFilesForSession(["/user/username/projects/random/random.ts"], session);
                openFilesForSession([commonFile1], session);

                session.logger.log("5: Check when both files are closed one by one when file is deleted order changed");
                // remove the tsconfig file
                host.deleteFile(configFile.path);
                openFilesForSession([commonFile2], session);

                // State after open files are closed
                closeFilesForSession([commonFile2], session);
                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

                closeFilesForSession([commonFile1, "/user/username/projects/random/random.ts"], session);
                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

                session.logger.log("6. Check closing commonFile2 first");
                host.writeFile(configFile.path, configFile.content);
                closeFilesForSession(["/user/username/projects/random/random.ts"], session);
                openFilesForSession([commonFile1, commonFile2], session);
                closeFilesForSession([commonFile2], session);
                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);
                closeFilesForSession(["/user/username/projects/random/random.ts"], session);

                session.logger.log("7: When config file is deleted and then another file is opened and projectInfo");
                // remove the tsconfig file
                host.deleteFile(configFile.path);
                openFilesForSession([commonFile2], session);

                projectInfoForSession(session, commonFile1);
                projectInfoForSession(session, commonFile2);

                // Add a tsconfig file
                host.writeFile(configFile.path, configFile.content);
                host.runQueuedTimeoutCallbacks();

                session.logger.log("8: When both files are open and config file is deleted and projectInfo");
                // remove the tsconfig file
                host.deleteFile(configFile.path);
                host.runQueuedTimeoutCallbacks();

                projectInfoForSession(session, commonFile1);
                projectInfoForSession(session, commonFile2);

                baselineTsserverLogs("configuredProjects", `add and then remove a config file ${scenario}`, session);
            });

            it(`add and then remove a config file ${scenario} and file from first config is not open`, () => {
                const { host, session, commonFile2, configFile } = setup(parentOrSiblingConfigFile);
                openFilesForSession([commonFile2], session);
                projectInfoForSession(session, commonFile2);

                session.logger.log("1: When config file is deleted");
                // remove the tsconfig file
                host.deleteFile(configFile.path);
                host.runQueuedTimeoutCallbacks();

                // Add a tsconfig file
                host.writeFile(configFile.path, configFile.content);
                host.runQueuedTimeoutCallbacks();

                // Check the state after files collected
                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

                // Check status when all files are closed
                closeFilesForSession([commonFile2, "/user/username/projects/random/random.ts"], session);
                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

                closeFilesForSession(["/user/username/projects/random/random.ts"], session);
                openFilesForSession([commonFile2], session);

                session.logger.log("2: Check when file is closed when config file is deleted");
                // remove the tsconfig file
                host.deleteFile(configFile.path);

                // State after open files are closed
                closeFilesForSession([commonFile2], session);
                openFilesForSession([{ file: "/user/username/projects/random/random.ts", content: "export const y = 10;" }], session);

                // Add a tsconfig file
                host.writeFile(configFile.path, configFile.content);
                host.runQueuedTimeoutCallbacks();
                closeFilesForSession(["/user/username/projects/random/random.ts"], session);
                openFilesForSession([commonFile2], session);

                session.logger.log("3: When config file is deleted and projectInfo");
                // remove the tsconfig file
                host.deleteFile(configFile.path);
                host.runQueuedTimeoutCallbacks();
                projectInfoForSession(session, commonFile2);

                // Add a tsconfig file
                host.writeFile(configFile.path, configFile.content);
                host.runQueuedTimeoutCallbacks();

                session.logger.log("4: Check when file is closed when config file is deleted and projectInfo");
                // remove the tsconfig file
                host.deleteFile(configFile.path);
                projectInfoForSession(session, commonFile2);

                baselineTsserverLogs("configuredProjects", `add and then remove a config file ${scenario} and file from first config is not open`, session);
            });
        }
        verify("when parent folder has config file", {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: jsonToReadableText({ files: ["folder/commonFile2.ts"] }),
        });
        verify("with sibling jsconfig file", {
            path: `/user/username/projects/myproject/folder/jsconfig.json`,
            content: jsonToReadableText({ files: ["commonFile2.ts"], typeAcquisition: { enable: false } }),
        });
    });

    it("add new files to a configured project without file list", () => {
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: `{}`,
        };
        const commonFile1: File = {
            path: "/user/username/projects/project/commonFile1.ts",
            content: "let x = 1",
        };
        const commonFile2: File = {
            path: "/user/username/projects/project/commonFile2.ts",
            content: "let y = 1",
        };
        const host = TestServerHost.createServerHost([commonFile1, configFile]);
        const session = new TestSession(host);
        openFilesForSession([commonFile1], session);

        // add a new ts file
        host.writeFile(commonFile2.path, commonFile2.content);
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("configuredProjects", "add new files to a configured project without file list", session);
    });

    it("should ignore non-existing files specified in the config file", () => {
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {},
                files: [
                    "commonFile1.ts",
                    "commonFile3.ts",
                ],
            }),
        };
        const commonFile1: File = {
            path: "/user/username/projects/project/commonFile1.ts",
            content: "let x = 1",
        };
        const commonFile2: File = {
            path: "/user/username/projects/project/commonFile2.ts",
            content: "let y = 1",
        };
        const host = TestServerHost.createServerHost([commonFile1, commonFile2, configFile]);
        const session = new TestSession(host);
        openFilesForSession([commonFile1, commonFile2], session);
        baselineTsserverLogs("configuredProjects", "should ignore non-existing files specified in the config file", session);
    });

    it("handle recreated files correctly", () => {
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: `{}`,
        };
        const commonFile1: File = {
            path: "/user/username/projects/project/commonFile1.ts",
            content: "let x = 1",
        };
        const commonFile2: File = {
            path: "/user/username/projects/project/commonFile2.ts",
            content: "let y = 1",
        };
        const host = TestServerHost.createServerHost([commonFile1, commonFile2, configFile]);
        const session = new TestSession(host);
        openFilesForSession([commonFile1], session);

        // delete commonFile2
        host.deleteFile(commonFile2.path);
        host.runQueuedTimeoutCallbacks();

        // re-add commonFile2
        host.writeFile(commonFile2.path, commonFile2.content);
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("configuredProjects", "handle recreated files correctly", session);
    });

    it("files explicitly excluded in config file", () => {
        const configFile: File = {
            path: "/user/username/projects/project/b/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {},
                exclude: ["/user/username/projects/project/c"],
            }),
        };
        const excludedFile1: File = {
            path: "/user/username/projects/project/c/excluedFile1.ts",
            content: `let t = 1;`,
        };
        const commonFile1: File = {
            path: "/user/username/projects/project/b/commonFile1.ts",
            content: "let x = 1",
        };
        const commonFile2: File = {
            path: "/user/username/projects/project/b/commonFile2.ts",
            content: "let y = 1",
        };
        const host = TestServerHost.createServerHost([commonFile1, commonFile2, excludedFile1, configFile]);
        const session = new TestSession(host);
        openFilesForSession([commonFile1, excludedFile1], session);

        baselineTsserverLogs("configuredProjects", "files explicitly excluded in config file", session);
    });

    it("should properly handle module resolution changes in config file", () => {
        const file1: File = {
            path: "/user/username/projects/project/a/b/file1.ts",
            content: `import { T } from "module1";`,
        };
        const nodeModuleFile: File = {
            path: "/user/username/projects/project/a/b/node_modules/module1.ts",
            content: `export interface T {}`,
        };
        const classicModuleFile: File = {
            path: "/user/username/projects/project/a/module1.ts",
            content: `export interface T {}`,
        };
        const randomFile: File = {
            path: "/user/username/projects/project/a/file1.ts",
            content: `export interface T {}`,
        };
        const configFile: File = {
            path: "/user/username/projects/project/a/b/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: compilerOptionsToConfigJson({ moduleResolution: ts.ModuleResolutionKind.Node10 }),
                files: [file1.path],
            }),
        };
        const files = [file1, nodeModuleFile, classicModuleFile, configFile, randomFile];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        openFilesForSession([file1, nodeModuleFile, classicModuleFile], session);

        host.writeFile(
            configFile.path,
            jsonToReadableText({
                compilerOptions: compilerOptionsToConfigJson({ moduleResolution: ts.ModuleResolutionKind.Classic }),
                files: [file1.path],
            }),
        );
        host.runQueuedTimeoutCallbacks();

        // will not remove project 1
        // Open random file and it will reuse first inferred project
        openFilesForSession([randomFile], session);
        baselineTsserverLogs("configuredProjects", "should properly handle module resolution changes in config file", session);
    });

    it("should keep the configured project when the opened file is referenced by the project but not its root", () => {
        const file1: File = {
            path: "/user/username/projects/project/a/b/main.ts",
            content: "import { objA } from './obj-a';",
        };
        const file2: File = {
            path: "/user/username/projects/project/a/b/obj-a.ts",
            content: `export const objA = Object.assign({foo: "bar"}, {bar: "baz"});`,
        };
        const configFile: File = {
            path: "/user/username/projects/project/a/b/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {
                    target: "es6",
                },
                files: ["main.ts"],
            }),
        };
        const host = TestServerHost.createServerHost([file1, file2, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);
        closeFilesForSession([file1], session);
        openFilesForSession([file2], session);
        baselineTsserverLogs("configuredProjects", "should keep the configured project when the opened file is referenced by the project but not its root", session);
    });

    it("should tolerate config file errors and still try to build a project", () => {
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {
                    target: "es6",
                    allowAnything: true,
                },
                someOtherProperty: {},
            }),
        };
        const commonFile1: File = {
            path: "/user/username/projects/project/commonFile1.ts",
            content: "let x = 1",
        };
        const commonFile2: File = {
            path: "/user/username/projects/project/commonFile2.ts",
            content: "let y = 1",
        };
        const host = TestServerHost.createServerHost([commonFile1, commonFile2, configFile]);
        const session = new TestSession(host);
        openFilesForSession([commonFile1], session);
        baselineTsserverLogs("configuredProjects", "should tolerate config file errors and still try to build a project", session);
    });

    it("should reuse same project if file is opened from the configured project that has no open files", () => {
        const file1 = {
            path: "/user/username/projects/project/main.ts",
            content: "let x =1;",
        };
        const file2 = {
            path: "/user/username/projects/project/main2.ts",
            content: "let y =1;",
        };
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {
                    target: "es6",
                },
                files: ["main.ts", "main2.ts"],
            }),
        };
        const host = TestServerHost.createServerHost([file1, file2, configFile]);
        const session = new TestSession({ host, useSingleInferredProject: true });
        openFilesForSession([file1], session);
        closeFilesForSession([file1], session);
        openFilesForSession([file2], session);
        baselineTsserverLogs("configuredProjects", "should reuse same project if file is opened from the configured project that has no open files", session);
    });

    it("should not close configured project after closing last open file, but should be closed on next file open if its not the file from same project", () => {
        const file1 = {
            path: "/user/username/projects/project/main.ts",
            content: "let x =1;",
        };
        const configFile: File = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {
                    target: "es6",
                },
                files: ["main.ts"],
            }),
        };
        const host = TestServerHost.createServerHost([file1, configFile]);
        const session = new TestSession({ host, useSingleInferredProject: true });
        openFilesForSession([file1], session);
        closeFilesForSession([file1], session);
        openFilesForSession([libFile], session);
        baselineTsserverLogs("configuredProjects", "should not close configured project after closing last open file, but should be closed on next file open if its not the file from same project", session);
    });

    it("open file become a part of configured project if it is referenced from root file", () => {
        const file1 = {
            path: `/user/username/projects/myproject/a/b/f1.ts`,
            content: "export let x = 5",
        };
        const file2 = {
            path: `/user/username/projects/myproject/a/c/f2.ts`,
            content: `import {x} from "../b/f1"`,
        };
        const file3 = {
            path: `/user/username/projects/myproject/a/c/f3.ts`,
            content: "export let y = 1",
        };
        const configFile = {
            path: `/user/username/projects/myproject/a/c/tsconfig.json`,
            content: jsonToReadableText({ compilerOptions: {}, files: ["f2.ts", "f3.ts"] }),
        };

        const host = TestServerHost.createServerHost([file1, file2, file3]);
        const session = new TestSession(host);
        openFilesForSession([file1, file3], session);

        host.writeFile(configFile.path, configFile.content);
        host.runQueuedTimeoutCallbacks(); // load configured project from disk + ensureProjectsForOpenFiles
        baselineTsserverLogs("configuredProjects", "open file become a part of configured project if it is referenced from root file", session);
    });

    it("can correctly update configured project when set of root files has changed (new file on disk)", () => {
        const file1 = {
            path: "/user/username/projects/project/f1.ts",
            content: "let x = 1",
        };
        const file2 = {
            path: "/user/username/projects/project/f2.ts",
            content: "let y = 1",
        };
        const configFile = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({ compilerOptions: {} }),
        };

        const host = TestServerHost.createServerHost([file1, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        host.writeFile(file2.path, file2.content);

        host.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("configuredProjects", "can correctly update configured project when set of root files has changed (new file on disk)", session);
    });

    it("can correctly update configured project when set of root files has changed (new file in list of files)", () => {
        const file1 = {
            path: "/user/username/projects/project/f1.ts",
            content: "let x = 1",
        };
        const file2 = {
            path: "/user/username/projects/project/f2.ts",
            content: "let y = 1",
        };
        const configFile = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({ compilerOptions: {}, files: ["f1.ts"] }),
        };

        const host = TestServerHost.createServerHost([file1, file2, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        host.writeFile(configFile.path, jsonToReadableText({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] }));

        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("configuredProjects", "can correctly update configured project when set of root files has changed (new file in list of files)", session);
    });

    it("can update configured project when set of root files was not changed", () => {
        const file1 = {
            path: "/user/username/projects/project/f1.ts",
            content: "let x = 1",
        };
        const file2 = {
            path: "/user/username/projects/project/f2.ts",
            content: "let y = 1",
        };
        const configFile = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] }),
        };

        const host = TestServerHost.createServerHost([file1, file2, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        host.writeFile(configFile.path, jsonToReadableText({ compilerOptions: { outFile: "out.js" }, files: ["f1.ts", "f2.ts"] }));
        host.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("configuredProjects", "can update configured project when set of root files was not changed", session);
    });

    it("Open ref of configured project when open file gets added to the project as part of configured file update", () => {
        const file1: File = {
            path: "/user/username/projects/project/a/b/src/file1.ts",
            content: "let x = 1;",
        };
        const file2: File = {
            path: "/user/username/projects/project/a/b/src/file2.ts",
            content: "let y = 1;",
        };
        const file3: File = {
            path: "/user/username/projects/project/a/b/file3.ts",
            content: "let z = 1;",
        };
        const file4: File = {
            path: "/user/username/projects/project/a/file4.ts",
            content: "let z = 1;",
        };
        const configFile = {
            path: "/user/username/projects/project/a/b/tsconfig.json",
            content: jsonToReadableText({ files: ["src/file1.ts", "file3.ts"] }),
        };

        const files = [file1, file2, file3, file4];
        const host = TestServerHost.createServerHost(files.concat(configFile));
        const session = new TestSession(host);
        openFilesForSession([file1, file2, file3, file4], session);

        host.writeFile(configFile.path, "{}");
        host.runQueuedTimeoutCallbacks();
        closeFilesForSession([file1, file2, file4], session);
        openFilesForSession([file4], session);
        closeFilesForSession([file3], session);

        const file5: File = {
            path: "/user/username/projects/project/file5.ts",
            content: "let zz = 1;",
        };
        host.writeFile(file5.path, file5.content);
        session.host.baselineHost("File5 written");
        openFilesForSession([file5], session);

        baselineTsserverLogs("configuredProjects", "Open ref of configured project when open file gets added to the project as part of configured file update", session);
    });

    it("Open ref of configured project when open file gets added to the project as part of configured file update buts its open file references are all closed when the update happens", () => {
        const file1: File = {
            path: "/user/username/projects/project/a/b/src/file1.ts",
            content: "let x = 1;",
        };
        const file2: File = {
            path: "/user/username/projects/project/a/b/src/file2.ts",
            content: "let y = 1;",
        };
        const file3: File = {
            path: "/user/username/projects/project/a/b/file3.ts",
            content: "let z = 1;",
        };
        const file4: File = {
            path: "/user/username/projects/project/a/file4.ts",
            content: "let z = 1;",
        };
        const configFile = {
            path: "/user/username/projects/project/a/b/tsconfig.json",
            content: jsonToReadableText({ files: ["src/file1.ts", "file3.ts"] }),
        };

        const files = [file1, file2, file3];
        const hostFiles = files.concat(file4, configFile);
        const host = TestServerHost.createServerHost(hostFiles);
        const session = new TestSession(host);
        openFilesForSession([file1, file2, file3], session);
        closeFilesForSession([file1, file3], session);

        host.writeFile(configFile.path, "{}");
        session.host.baselineHost("configFile updated");
        // Time out is not yet run so there is project update pending

        openFilesForSession([file4], session);

        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("configuredProjects", "Open ref of configured project when open file gets added to the project as part of configured file update buts its open file references are all closed when the update happens", session);
    });

    it("files are properly detached when language service is disabled", () => {
        const f1 = {
            path: "/user/username/projects/project/a/app.js",
            content: "var x = 1",
        };
        const f2 = {
            path: "/user/username/projects/project/a/largefile.js",
            content: "",
        };
        const f3 = {
            path: "/user/username/projects/project/a/lib.js",
            content: "var x = 1",
        };
        const config = {
            path: "/user/username/projects/project/a/tsconfig.json",
            content: jsonToReadableText({ compilerOptions: { allowJs: true } }),
        };
        const host = TestServerHost.createServerHost([f1, f2, f3, config]);
        const originalGetFileSize = host.getFileSize;
        host.getFileSize = (filePath: string) => filePath === f2.path ? ts.server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

        const session = new TestSession(host);
        openFilesForSession([f1], session);
        closeFilesForSession([f1], session);
        const f4 = {
            path: "/user/username/projects/project/aa.js",
            content: "var x = 1",
        };
        host.writeFile(f4.path, f4.content);
        openFilesForSession([f4], session);
        baselineTsserverLogs("configuredProjects", "files are properly detached when language service is disabled", session);
    });

    it("syntactic features work even if language service is disabled", () => {
        const f1 = {
            path: "/user/username/projects/project/a/app.js",
            content: "let x =   1;",
        };
        const f2 = {
            path: "/user/username/projects/project/a/largefile.js",
            content: "",
        };
        const config = {
            path: "/user/username/projects/project/a/jsconfig.json",
            content: "{}",
        };
        const host = TestServerHost.createServerHost([f1, f2, config]);
        const originalGetFileSize = host.getFileSize;
        host.getFileSize = (filePath: string) => filePath === f2.path ? ts.server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);
        const session = new TestSession(host);
        openFilesForSession([f1], session);
        session.logger.log(`Language languageServiceEnabled:: ${session.getProjectService().configuredProjects.get(config.path)!.languageServiceEnabled}`);

        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.FormatFull,
            arguments: {
                file: f1.path,
            },
        });
        baselineTsserverLogs("configuredProjects", "syntactic features work even if language service is disabled", session);
    });

    it("when multiple projects are open, detects correct default project", () => {
        const barConfig: File = {
            path: `/user/username/projects/myproject/bar/tsconfig.json`,
            content: jsonToReadableText({
                include: ["index.ts"],
                compilerOptions: {
                    lib: ["dom", "es2017"],
                },
            }),
        };
        const barIndex: File = {
            path: `/user/username/projects/myproject/bar/index.ts`,
            content: `
export function bar() {
  console.log("hello world");
}`,
        };
        const fooConfig: File = {
            path: `/user/username/projects/myproject/foo/tsconfig.json`,
            content: jsonToReadableText({
                include: ["index.ts"],
                compilerOptions: {
                    lib: ["es2017"],
                },
            }),
        };
        const fooIndex: File = {
            path: `/user/username/projects/myproject/foo/index.ts`,
            content: `
import { bar } from "bar";
bar();`,
        };
        const barSymLink: SymLink = {
            path: `/user/username/projects/myproject/foo/node_modules/bar`,
            symLink: `/user/username/projects/myproject/bar`,
        };

        const libDom: File = {
            path: `${ts.getDirectoryPath(libFile.path)}/lib.dom.d.ts`,
            content: `
declare var console: {
    log(...args: any[]): void;
};`,
        };
        const host = TestServerHost.createServerHost([barConfig, barIndex, fooConfig, fooIndex, barSymLink, libDom]);
        const session = new TestSession(host);
        openFilesForSession([fooIndex, barIndex], session);
        verifyGetErrRequest({ session, files: [barIndex, fooIndex] });
        baselineTsserverLogs("configuredProjects", "when multiple projects are open detects correct default project", session);
    });

    it("when file name starts with ^", () => {
        const file: File = {
            path: `/user/username/projects/myproject/file.ts`,
            content: "const x = 10;",
        };
        const app: File = {
            path: `/user/username/projects/myproject/^app.ts`,
            content: "const y = 10;",
        };
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        const host = TestServerHost.createServerHost([file, app, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([file], session);
        baselineTsserverLogs("configuredProjects", "when file name starts with caret", session);
    });

    describe("when creating new file", () => {
        const foo: File = {
            path: `/user/username/projects/myproject/src/foo.ts`,
            content: "export function foo() { }",
        };
        const bar: File = {
            path: `/user/username/projects/myproject/src/bar.ts`,
            content: "export function bar() { }",
        };
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: jsonToReadableText({
                include: ["./src"],
            }),
        };
        const fooBar: File = {
            path: `/user/username/projects/myproject/src/sub/fooBar.ts`,
            content: "export function fooBar() { }",
        };
        function verifySessionWorker({ withExclude, openFileBeforeCreating }: VerifySession, errorOnNewFileBeforeOldFile: boolean) {
            const host = TestServerHost.createServerHost([
                foo,
                bar,
                { path: `/user/username/projects/myproject/src/sub` },
                withExclude ?
                    {
                        path: config.path,
                        content: jsonToReadableText({
                            include: ["./src"],
                            exclude: ["./src/sub"],
                        }),
                    } :
                    config,
            ]);
            const session = new TestSession(host);
            session.executeCommandSeq<ts.server.protocol.OpenRequest>({
                command: ts.server.protocol.CommandTypes.Open,
                arguments: {
                    file: foo.path,
                    fileContent: foo.content,
                    projectRootPath: "/user/username/projects/myproject",
                },
            });
            if (!openFileBeforeCreating) {
                host.writeFile(fooBar.path, fooBar.content);
            }
            session.executeCommandSeq<ts.server.protocol.OpenRequest>({
                command: ts.server.protocol.CommandTypes.Open,
                arguments: {
                    file: fooBar.path,
                    fileContent: fooBar.content,
                    projectRootPath: "/user/username/projects/myproject",
                },
            });
            if (openFileBeforeCreating) {
                host.writeFile(fooBar.path, fooBar.content);
            }
            verifyGetErrRequest({
                session,
                files: errorOnNewFileBeforeOldFile ?
                    [fooBar, foo] :
                    [foo, fooBar],
                existingTimeouts: !withExclude,
            });
            baselineTsserverLogs("configuredProjects", `creating new file and then open it ${openFileBeforeCreating ? "before" : "after"} watcher is invoked, ask errors on it ${errorOnNewFileBeforeOldFile ? "before" : "after"} old one${withExclude ? " without file being in config" : ""}`, session);
        }
        interface VerifySession {
            withExclude?: boolean;
            openFileBeforeCreating: boolean;
        }
        function verifySession(input: VerifySession) {
            it("when error on new file are asked before old one", () => {
                verifySessionWorker(input, /*errorOnNewFileBeforeOldFile*/ true);
            });

            it("when error on new file are asked after old one", () => {
                verifySessionWorker(input, /*errorOnNewFileBeforeOldFile*/ false);
            });
        }
        describe("when new file creation directory watcher is invoked before file is opened in editor", () => {
            verifySession({
                openFileBeforeCreating: false,
            });
            describe("when new file is excluded from config", () => {
                verifySession({
                    withExclude: true,
                    openFileBeforeCreating: false,
                });
            });
        });

        describe("when new file creation directory watcher is invoked after file is opened in editor", () => {
            verifySession({
                openFileBeforeCreating: true,
            });
            describe("when new file is excluded from config", () => {
                verifySession({
                    withExclude: true,
                    openFileBeforeCreating: true,
                });
            });
        });
    });

    it("when default configured project does not contain the file", () => {
        const barConfig: File = {
            path: `/user/username/projects/myproject/bar/tsconfig.json`,
            content: "{}",
        };
        const barIndex: File = {
            path: `/user/username/projects/myproject/bar/index.ts`,
            content: `import {foo} from "../foo/lib";
foo();`,
        };
        const fooBarConfig: File = {
            path: `/user/username/projects/myproject/foobar/tsconfig.json`,
            content: barConfig.path,
        };
        const fooBarIndex: File = {
            path: `/user/username/projects/myproject/foobar/index.ts`,
            content: barIndex.content,
        };
        const fooConfig: File = {
            path: `/user/username/projects/myproject/foo/tsconfig.json`,
            content: jsonToReadableText({
                include: ["index.ts"],
                compilerOptions: {
                    declaration: true,
                    outDir: "lib",
                },
            }),
        };
        const fooIndex: File = {
            path: `/user/username/projects/myproject/foo/index.ts`,
            content: `export function foo() {}`,
        };
        const host = TestServerHost.createServerHost([barConfig, barIndex, fooBarConfig, fooBarIndex, fooConfig, fooIndex]);
        ensureErrorFreeBuild(host, [fooConfig.path]);
        const fooDts = `/user/username/projects/myproject/foo/lib/index.d.ts`;
        const session = new TestSession(host);
        openFilesForSession([barIndex, fooBarIndex, fooIndex, fooDts], session);
        session.executeCommandSeq<ts.server.protocol.GetApplicableRefactorsRequest>({
            command: ts.server.protocol.CommandTypes.GetApplicableRefactors,
            arguments: {
                file: fooDts,
                startLine: 1,
                startOffset: 1,
                endLine: 1,
                endOffset: 1,
            },
        });
        projectInfoForSession(session, fooDts);
        baselineTsserverLogs("configuredProjects", "when default configured project does not contain the file", session);
    });

    describe("watches extended config files", () => {
        function getService(additionalFiles?: File[]) {
            const alphaExtendedConfig: File = {
                path: `/user/username/projects/myproject/extended/alpha.tsconfig.json`,
                content: "{}",
            };
            const bravoExtendedConfig: File = {
                path: `/user/username/projects/myproject/extended/bravo.tsconfig.json`,
                content: jsonToReadableText({
                    extends: "./alpha.tsconfig.json",
                }),
            };
            const aConfig: File = {
                path: `/user/username/projects/myproject/a/tsconfig.json`,
                content: jsonToReadableText({
                    extends: "../extended/alpha.tsconfig.json",
                    files: ["a.ts"],
                }),
            };
            const aFile: File = {
                path: `/user/username/projects/myproject/a/a.ts`,
                content: `let a = 1;`,
            };
            const bConfig: File = {
                path: `/user/username/projects/myproject/b/tsconfig.json`,
                content: jsonToReadableText({
                    extends: "../extended/bravo.tsconfig.json",
                    files: ["b.ts"],
                }),
            };
            const bFile: File = {
                path: `/user/username/projects/myproject/b/b.ts`,
                content: `let b = 1;`,
            };

            const host = TestServerHost.createServerHost([alphaExtendedConfig, aConfig, aFile, bravoExtendedConfig, bConfig, bFile, ...(additionalFiles || ts.emptyArray)]);
            const session = new TestSession(host);
            return { host, session, aFile, bFile, aConfig, bConfig, alphaExtendedConfig, bravoExtendedConfig };
        }

        it("should watch the extended configs of multiple projects", () => {
            const { host, session, aFile, bFile, bConfig, alphaExtendedConfig, bravoExtendedConfig } = getService();

            openFilesForSession([aFile, bFile], session);

            host.writeFile(
                alphaExtendedConfig.path,
                jsonToReadableText({
                    compilerOptions: {
                        strict: true,
                    },
                }),
            );
            host.runQueuedTimeoutCallbacks();

            host.writeFile(
                bravoExtendedConfig.path,
                jsonToReadableText({
                    extends: "./alpha.tsconfig.json",
                    compilerOptions: {
                        strict: false,
                    },
                }),
            );
            host.runQueuedTimeoutCallbacks();

            host.writeFile(
                bConfig.path,
                jsonToReadableText({
                    extends: "../extended/alpha.tsconfig.json",
                }),
            );
            host.runQueuedTimeoutCallbacks();

            host.writeFile(alphaExtendedConfig.path, "{}");
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("configuredProjects", "should watch the extended configs of multiple projects", session);
        });

        it("should stop watching the extended configs of closed projects", () => {
            const dummy: File = {
                path: `/user/username/projects/myproject/dummy/dummy.ts`,
                content: `let dummy = 1;`,
            };
            const dummyConfig: File = {
                path: `/user/username/projects/myproject/dummy/tsconfig.json`,
                content: "{}",
            };
            const { session, aFile, bFile } = getService([dummy, dummyConfig]);

            openFilesForSession([aFile, bFile, dummy], session);

            closeFilesForSession([bFile, dummy], session);
            openFilesForSession([dummy], session);

            closeFilesForSession([aFile, dummy], session);
            openFilesForSession([dummy], session);
            baselineTsserverLogs("configuredProjects", "should stop watching the extended configs of closed projects", session);
        });
    });
});

describe("unittests:: tsserver:: configuredProjects:: non-existing directories listed in config file input array", () => {
    it("should be tolerated without crashing the server", () => {
        const configFile = {
            path: "/user/username/projects/project/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {},
                    "include": ["app/*", "test/**/*", "something"]
                }`,
        };
        const file1 = {
            path: "/user/username/projects/project/a/b/file1.ts",
            content: "let t = 10;",
        };

        const host = TestServerHost.createServerHost([file1, configFile]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);
        host.runQueuedTimeoutCallbacks();

        // Since file1 refers to config file as the default project, it needs to be kept alive
        baselineTsserverLogs("configuredProjects", "should be tolerated without crashing the server", session);
    });

    it("should be able to handle @types if input file list is empty", () => {
        const f = {
            path: "/user/username/projects/project/a/app.ts",
            content: "let x = 1",
        };
        const config = {
            path: "/user/username/projects/project/a/tsconfig.json",
            content: jsonToReadableText({
                compiler: {},
                files: [],
            }),
        };
        const t1 = {
            path: "/user/username/projects/project/a/node_modules/@types/typings/index.d.ts",
            content: `export * from "./lib"`,
        };
        const t2 = {
            path: "/user/username/projects/project/a/node_modules/@types/typings/lib.d.ts",
            content: `export const x: number`,
        };
        const host = TestServerHost.createServerHost([f, config, t1, t2]);
        const session = new TestSession(host);
        openFilesForSession([f], session);

        // Since f refers to config file as the default project, it needs to be kept alive
        baselineTsserverLogs("configuredProjects", "should be able to handle @types if input file list is empty", session);
    });

    it("should tolerate invalid include files that start in subDirectory", () => {
        const f = {
            path: `/user/username/projects/myproject/src/server/index.ts`,
            content: "let x = 1",
        };
        const config = {
            path: `/user/username/projects/myproject/src/server/tsconfig.json`,
            content: jsonToReadableText({
                compiler: {
                    module: "commonjs",
                    outDir: "../../build",
                },
                include: [
                    "../src/**/*.ts",
                ],
            }),
        };
        const host = TestServerHost.createServerHost([f, config], { useCaseSensitiveFileNames: true });
        const session = new TestSession(host);
        openFilesForSession([f], session);

        // Since f refers to config file as the default project, it needs to be kept alive
        baselineTsserverLogs("configuredProjects", "should tolerate invalid include files that start in subDirectory", session);
    });

    it("Changed module resolution reflected when specifying files list", () => {
        const file1: File = {
            path: "/users/username/solution/projects/project/file1.ts",
            content: 'import classc from "file2"',
        };
        const file2a: File = {
            path: "/users/username/solution/projects/file2.ts",
            content: "export classc { method2a() { return 10; } }",
        };
        const file2: File = {
            path: "/users/username/solution/projects/project/file2.ts",
            content: "export classc { method2() { return 10; } }",
        };
        const configFile: File = {
            path: "/users/username/solution/projects/project/tsconfig.json",
            content: jsonToReadableText({ files: [file1.path], compilerOptions: { module: "amd" } }),
        };
        const files = [file1, file2a, configFile];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        host.writeFile(file2.path, file2.content);
        host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
        host.runQueuedTimeoutCallbacks(); // Actual update

        // On next file open the files file2a should be closed and not watched any more
        openFilesForSession([file2], session);
        baselineTsserverLogs("configuredProjects", "changed module resolution reflected when specifying files list", session);
    });

    it("Failed lookup locations uses parent most node_modules directory", () => {
        const file1: File = {
            path: "/user/username/rootfolder/a/b/src/file1.ts",
            content: 'import { classc } from "module1"',
        };
        const module1: File = {
            path: "/user/username/rootfolder/a/b/node_modules/module1/index.d.ts",
            content: `import { class2 } from "module2";
                          export classc { method2a(): class2; }`,
        };
        const module2: File = {
            path: "/user/username/rootfolder/a/b/node_modules/module2/index.d.ts",
            content: "export class2 { method2() { return 10; } }",
        };
        const module3: File = {
            path: "/user/username/rootfolder/a/b/node_modules/module/node_modules/module3/index.d.ts",
            content: "export class3 { method2() { return 10; } }",
        };
        const configFile: File = {
            path: "/user/username/rootfolder/a/b/src/tsconfig.json",
            content: jsonToReadableText({ files: ["file1.ts"] }),
        };
        const files = [file1, module1, module2, module3, configFile];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        openFilesForSession([file1], session);
        baselineTsserverLogs("configuredProjects", "failed lookup locations uses parent most node_modules directory", session);
    });
});

describe("unittests:: tsserver:: configuredProjects:: when reading tsconfig file fails", () => {
    it("should be tolerated without crashing the server", () => {
        const configFile = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "",
        };
        const file1 = {
            path: `/user/username/projects/myproject/file1.ts`,
            content: "let t = 10;",
        };

        const host = TestServerHost.createServerHost([file1, configFile]);
        const session = new TestSession(host);
        const originalReadFile = host.readFile;
        host.readFile = f => {
            return f === configFile.path ?
                undefined :
                originalReadFile.call(host, f);
        };
        openFilesForSession([file1], session);

        baselineTsserverLogs("configuredProjects", "should be tolerated without crashing the server when reading tsconfig file fails", session);
    });
});
