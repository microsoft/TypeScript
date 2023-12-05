import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    compilerOptionsToConfigJson,
} from "../helpers/contents";
import {
    baselineTsserverLogs,
    openExternalProjectForSession,
    openFilesForSession,
    setCompilerOptionsForInferredProjectsRequestForSession,
    TestSession,
    toExternalFiles,
    verifyGetErrRequest,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: resolutionCache:: tsserverProjectSystem extra resolution pass in server host", () => {
    it("can load typings that are proper modules", () => {
        const file1 = {
            path: "/a/b/app.js",
            content: `var x = require("lib")`,
        };
        const lib = {
            path: "/a/cache/node_modules/@types/lib/index.d.ts",
            content: "export let x = 1",
        };
        const host = createServerHost([file1, lib]);
        const session = new TestSession({ host, globalTypingsCacheLocation: "/a/cache" });

        setCompilerOptionsForInferredProjectsRequestForSession({ traceResolution: true, allowJs: true }, session);
        openFilesForSession([file1], session);
        baselineTsserverLogs("resolutionCache", "can load typings that are proper modules", session);
    });
});

describe("unittests:: tsserver:: resolutionCache:: tsserverProjectSystem watching @types", () => {
    it("works correctly when typings are added or removed", () => {
        const f1 = {
            path: "/users/username/projects/project/app.ts",
            content: "let x = 1;",
        };
        const t1 = {
            path: "/users/username/projects/project/node_modules/@types/lib1/index.d.ts",
            content: "export let a: number",
        };
        const t2 = {
            path: "/users/username/projects/project/node_modules/@types/lib2/index.d.ts",
            content: "export let b: number",
        };
        const tsconfig = {
            path: "/users/username/projects/project/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {},
                exclude: ["node_modules"],
            }),
        };
        const host = createServerHost([f1, t1, tsconfig]);
        const session = new TestSession(host);

        openFilesForSession([f1], session);

        // delete t1
        host.deleteFile(t1.path);
        // run throttled operation
        host.runQueuedTimeoutCallbacks();

        // create t2
        host.writeFile(t2.path, t2.content);
        // run throttled operation
        host.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("resolutionCache", "works correctly when typings are added or removed", session);
    });
});

describe("unittests:: tsserver:: resolutionCache:: tsserverProjectSystem add the missing module file for inferred project", () => {
    it("should remove the `module not found` error", () => {
        const moduleFile = {
            path: "/users/username/projects/project/moduleFile.ts",
            content: "export function bar() { };",
        };
        const file1 = {
            path: "/users/username/projects/project/file1.ts",
            content: "import * as T from './moduleFile'; T.bar();",
        };
        const host = createServerHost([file1]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file1.path },
        });

        host.writeFile(moduleFile.path, moduleFile.content);
        host.runQueuedTimeoutCallbacks();

        // Make a change to trigger the program rebuild
        session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
            command: ts.server.protocol.CommandTypes.Change,
            arguments: { file: file1.path, line: 1, offset: 44, endLine: 1, endOffset: 44, insertString: "\n" },
        });

        // Recheck
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file1.path },
        });
        baselineTsserverLogs("resolutionCache", "should remove the module not found error", session);
    });

    it("npm install @types works", () => {
        const folderPath = "/a/b/projects/temp";
        const file1: File = {
            path: `${folderPath}/a.ts`,
            content: 'import f = require("pad"); f;',
        };
        const host = createServerHost([file1, libFile]);
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: {
                file: file1.path,
                fileContent: file1.content,
                scriptKindName: "TS",
                projectRootPath: folderPath,
            },
        });

        verifyGetErrRequest({ session, files: [file1] });

        const padIndex: File = {
            path: `${folderPath}/node_modules/@types/pad/index.d.ts`,
            content: "export = pad;declare function pad(length: number, text: string, char ?: string): string;",
        };
        host.ensureFileOrFolder(padIndex, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ true);
        host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
        host.runQueuedTimeoutCallbacks(); // Actual update
        host.runQueuedTimeoutCallbacks();
        host.runQueuedImmediateCallbacks();
        baselineTsserverLogs("resolutionCache", `npm install @types works`, session);
    });

    it("suggestion diagnostics", () => {
        const file: File = {
            path: "/a.js",
            content: "function f(p) {}",
        };

        const host = createServerHost([file]);
        const session = new TestSession(host);

        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: file.path, fileContent: file.content },
        });

        verifyGetErrRequest({ session, files: [file] });
        baselineTsserverLogs("resolutionCache", `suggestion diagnostics`, session);
    });

    it("disable suggestion diagnostics", () => {
        const file: File = {
            path: "/a.js",
            content: 'require("b")',
        };

        const host = createServerHost([file]);
        const session = new TestSession(host);

        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: file.path, fileContent: file.content },
        });

        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                preferences: { disableSuggestions: true },
            },
        });

        verifyGetErrRequest({ session, files: [file], skip: [{ suggestion: true }] });
        baselineTsserverLogs("resolutionCache", `disable suggestion diagnostics`, session);
    });

    it("suppressed diagnostic events", () => {
        const file: File = {
            path: "/a.ts",
            content: "1 = 2;",
        };

        const host = createServerHost([file]);
        const session = new TestSession({ host, suppressDiagnosticEvents: true });

        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: file.path, fileContent: file.content },
        });

        session.executeCommandSeq<ts.server.protocol.GeterrRequest>({
            command: ts.server.protocol.CommandTypes.Geterr,
            arguments: {
                delay: 0,
                files: [file.path],
            },
        });

        session.executeCommandSeq<ts.server.protocol.GeterrForProjectRequest>({
            command: ts.server.protocol.CommandTypes.GeterrForProject,
            arguments: {
                delay: 0,
                file: file.path,
            },
        });

        baselineTsserverLogs("resolutionCache", "suppressed diagnostic events", session);
    });
});

describe("unittests:: tsserver:: resolutionCache:: tsserverProjectSystem rename a module file and rename back", () => {
    it("should restore the states for inferred projects", () => {
        const moduleFile = {
            path: "/users/username/projects/project/moduleFile.ts",
            content: "export function bar() { };",
        };
        const file1 = {
            path: "/users/username/projects/project/file1.ts",
            content: "import * as T from './moduleFile'; T.bar();",
        };
        const host = createServerHost([moduleFile, file1]);
        const session = new TestSession(host);

        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file1.path },
        });

        const moduleFileNewPath = "/users/username/projects/project/moduleFile1.ts";
        host.renameFile(moduleFile.path, moduleFileNewPath);
        host.runQueuedTimeoutCallbacks();
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file1.path },
        });

        host.renameFile(moduleFileNewPath, moduleFile.path);
        host.runQueuedTimeoutCallbacks();

        // Make a change to trigger the program rebuild
        session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
            command: ts.server.protocol.CommandTypes.Change,
            arguments: { file: file1.path, line: 1, offset: 44, endLine: 1, endOffset: 44, insertString: "\n" },
        });
        host.runQueuedTimeoutCallbacks();

        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file1.path },
        });
        baselineTsserverLogs("resolutionCache", "renaming module should restore the states for inferred projects", session);
    });

    it("should restore the states for configured projects", () => {
        const moduleFile = {
            path: "/users/username/projects/project/moduleFile.ts",
            content: "export function bar() { };",
        };
        const file1 = {
            path: "/users/username/projects/project/file1.ts",
            content: "import * as T from './moduleFile'; T.bar();",
        };
        const configFile = {
            path: "/users/username/projects/project/tsconfig.json",
            content: `{}`,
        };
        const host = createServerHost([moduleFile, file1, configFile]);
        const session = new TestSession(host);

        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file1.path },
        });

        const moduleFileNewPath = "/users/username/projects/project/moduleFile1.ts";
        host.renameFile(moduleFile.path, moduleFileNewPath);
        host.runQueuedTimeoutCallbacks();
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file1.path },
        });

        host.renameFile(moduleFileNewPath, moduleFile.path);
        host.runQueuedTimeoutCallbacks();
        session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
            command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file1.path },
        });
        baselineTsserverLogs("resolutionCache", "renaming module should restore the states for configured projects", session);
    });

    it("should property handle missing config files", () => {
        const f1 = {
            path: "/a/b/app.ts",
            content: "let x = 1",
        };
        const config = {
            path: "/a/b/tsconfig.json",
            content: "{}",
        };
        const projectFileName = "project1";
        const host = createServerHost([f1]);
        const session = new TestSession(host);
        openExternalProjectForSession({
            rootFiles: toExternalFiles([f1.path, config.path]),
            options: {},
            projectFileName,
        }, session);

        // should have one external project since config file is missing

        host.writeFile(config.path, config.content);
        openExternalProjectForSession({
            rootFiles: toExternalFiles([f1.path, config.path]),
            options: {},
            projectFileName,
        }, session);
        baselineTsserverLogs("resolutionCache", "should property handle missing config files", session);
    });

    describe("types from config file", () => {
        function verifyTypesLoad(subScenario: string, includeTypeRoots: boolean) {
            it(subScenario, () => {
                const f1 = {
                    path: "/a/b/app.ts",
                    content: "let x = 1",
                };
                const config = {
                    path: "/a/b/tsconfig.json",
                    content: jsonToReadableText({ compilerOptions: { types: ["node"], typeRoots: includeTypeRoots ? [] : undefined } }),
                };
                const node = {
                    path: "/a/b/node_modules/@types/node/index.d.ts",
                    content: "declare var process: any",
                };
                const cwd = {
                    path: "/a/c",
                };
                const host = createServerHost([f1, config, node, cwd], { currentDirectory: cwd.path });
                const session = new TestSession(host);
                openFilesForSession([f1], session);
                baselineTsserverLogs("resolutionCache", subScenario, session);
            });
        }
        verifyTypesLoad("types should load from config file path if config exists", /*includeTypeRoots*/ false);
        verifyTypesLoad("types should not load from config file path if config exists but does not specifies typeRoots", /*includeTypeRoots*/ true);
    });
});

describe("unittests:: tsserver:: resolutionCache:: tsserverProjectSystem module resolution caching", () => {
    const configFile: File = {
        path: `/user/username/projects/myproject/tsconfig.json`,
        content: jsonToReadableText({ compilerOptions: { traceResolution: true } }),
    };

    function getModules(module1Path: string, module2Path: string) {
        const module1: File = {
            path: module1Path,
            content: `export function module1() {}`,
        };
        const module2: File = {
            path: module2Path,
            content: `export function module2() {}`,
        };
        return { module1, module2 };
    }

    describe("from files in same folder", () => {
        function getFiles(fileContent: string) {
            const file1: File = {
                path: `/user/username/projects/myproject/src/file1.ts`,
                content: fileContent,
            };
            const file2: File = {
                path: `/user/username/projects/myproject/src/file2.ts`,
                content: fileContent,
            };
            return { file1, file2 };
        }

        it("relative module name", () => {
            const fileContent = `import { module1 } from "./module1";import { module2 } from "../module2";`;
            const { file1, file2 } = getFiles(fileContent);
            const { module1, module2 } = getModules(`/user/username/projects/myproject/src/module1.ts`, `/user/username/projects/myproject/module2.ts`);
            const files = [module1, module2, file1, file2, configFile, libFile];
            const host = createServerHost(files);
            const session = new TestSession(host);
            openFilesForSession([file1], session);

            host.writeFile(file2.path, file2.content + fileContent);
            host.runQueuedTimeoutCallbacks();

            baselineTsserverLogs("resolutionCache", "relative module name from files in same folder", session);
        });

        it("non relative module name", () => {
            const fileContent = `import { module1 } from "module1";import { module2 } from "module2";`;
            const { file1, file2 } = getFiles(fileContent);
            const { module1, module2 } = getModules(`/user/username/projects/myproject/src/node_modules/module1/index.ts`, `/user/username/projects/myproject/node_modules/module2/index.ts`);
            const files = [module1, module2, file1, file2, configFile, libFile];
            const host = createServerHost(files);
            const session = new TestSession(host);
            openFilesForSession([file1], session);

            host.writeFile(file2.path, file2.content + fileContent);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("resolutionCache", "non relative module name from files in same folder", session);
        });
    });

    describe("from files in different folders", () => {
        function getFiles(fileContent1: string, fileContent2 = fileContent1, fileContent3 = fileContent1, fileContent4 = fileContent1) {
            const file1: File = {
                path: `/user/username/projects/myproject/product/src/file1.ts`,
                content: fileContent1,
            };
            const file2: File = {
                path: `/user/username/projects/myproject/product/src/feature/file2.ts`,
                content: fileContent2,
            };
            const file3: File = {
                path: `/user/username/projects/myproject/product/test/src/file3.ts`,
                content: fileContent3,
            };
            const file4: File = {
                path: `/user/username/projects/myproject/product/test/file4.ts`,
                content: fileContent4,
            };
            return { file1, file2, file3, file4 };
        }

        it("relative module name", () => {
            const fileContent1 = `import { module1 } from "./module1";import { module2 } from "../module2";`;
            const fileContent2 = `import { module1 } from "../module1";import { module2 } from "../../module2";`;
            const fileContent3 = `import { module1 } from "../../src/module1";import { module2 } from "../../module2";`;
            const fileContent4 = `import { module1 } from "../src/module1}";import { module2 } from "../module2";`;
            const { file1, file2, file3, file4 } = getFiles(fileContent1, fileContent2, fileContent3, fileContent4);
            const { module1, module2 } = getModules(`/user/username/projects/myproject/product/src/module1.ts`, `/user/username/projects/myproject/product/module2.ts`);
            const files = [module1, module2, file1, file2, file3, file4, configFile, libFile];
            const host = createServerHost(files);
            const session = new TestSession(host);
            openFilesForSession([file1], session);

            host.writeFile(file2.path, file2.content + fileContent2);
            host.writeFile(file3.path, file3.content + fileContent3);
            host.writeFile(file4.path, file4.content + fileContent4);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("resolutionCache", "relative module name from files in different folders", session);
        });

        it("non relative module name", () => {
            const fileContent = `import { module1 } from "module1";import { module2 } from "module2";`;
            const { file1, file2, file3, file4 } = getFiles(fileContent);
            const { module1, module2 } = getModules(`/user/username/projects/myproject/product/node_modules/module1/index.ts`, `/user/username/projects/myproject/node_modules/module2/index.ts`);
            const files = [module1, module2, file1, file2, file3, file4, configFile, libFile];
            const host = createServerHost(files);
            const session = new TestSession(host);
            openFilesForSession([file1], session);

            host.writeFile(file2.path, file2.content + fileContent);
            host.writeFile(file3.path, file3.content + fileContent);
            host.writeFile(file4.path, file4.content + fileContent);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("resolutionCache", "non relative module name from files in different folders", session);
        });

        it("non relative module name from inferred project", () => {
            const module1Name = "module1";
            const module2Name = "module2";
            const file2Name = "./feature/file2";
            const file3Name = "../test/src/file3";
            const file4Name = "../test/file4";
            const importModuleContent = `import { module1 } from "${module1Name}";import { module2 } from "${module2Name}";`;
            const { file1, file2, file3, file4 } = getFiles(`import "${file2Name}"; import "${file4Name}"; import "${file3Name}"; ${importModuleContent}`, importModuleContent, importModuleContent, importModuleContent);
            const { module1, module2 } = getModules(`/user/username/projects/myproject/product/node_modules/module1/index.ts`, `/user/username/projects/myproject/node_modules/module2/index.ts`);
            const files = [module1, module2, file1, file2, file3, file4, libFile];
            const host = createServerHost(files);
            const session = new TestSession(host);
            setCompilerOptionsForInferredProjectsRequestForSession({ traceResolution: true }, session);
            openFilesForSession([file1], session);
            host.writeFile(file2.path, file2.content + importModuleContent);
            host.writeFile(file3.path, file3.content + importModuleContent);
            host.writeFile(file4.path, file4.content + importModuleContent);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("resolutionCache", "non relative module name from inferred project", session);
        });
    });

    describe("when watching directories for failed lookup locations in amd resolution", () => {
        function verifyModuleResolution(scenario: string, useNodeFile: boolean) {
            it(scenario, () => {
                const nodeFile: File = {
                    path: `/user/username/projects/myproject/src/typings/node.d.ts`,
                    content: `
declare module "fs" {
    export interface something {
    }
}`,
                };
                const electronFile: File = {
                    path: `/user/username/projects/myproject/src/typings/electron.d.ts`,
                    content: `
declare module 'original-fs' {
    import * as fs from 'fs';
    export = fs;
}`,
                };
                const srcFile: File = {
                    path: `/user/username/projects/myproject/src/somefolder/srcfile.ts`,
                    content: `
import { x } from "somefolder/module1";
import { x } from "somefolder/module2";
const y = x;`,
                };
                const moduleFile: File = {
                    path: `/user/username/projects/myproject/src/somefolder/module1.ts`,
                    content: `
export const x = 10;`,
                };
                const configFile: File = {
                    path: `/user/username/projects/myproject/src/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: {
                            module: "amd",
                            moduleResolution: "classic",
                            target: "es5",
                            outDir: "../out",
                            baseUrl: "./",
                            typeRoots: ["typings"],
                        },
                    }),
                };

                const files = [...(useNodeFile ? [nodeFile] : []), electronFile, srcFile, moduleFile, configFile, libFile];
                const host = createServerHost(files);
                const session = new TestSession(host);
                openFilesForSession([{ file: srcFile.path, content: srcFile.content, scriptKindName: "TS", projectRootPath: "/user/username/projects/myproject" }], session);
                baselineTsserverLogs("resolutionCache", scenario, session);
            });
        }
        verifyModuleResolution("when resolves to ambient module", /*useNodeFile*/ true);
        verifyModuleResolution("when resolution fails", /*useNodeFile*/ false);
    });

    describe("ignores files/folder changes in node_modules that start with '.'", () => {
        const npmCacheFile: File = {
            path: `/user/username/projects/myproject/node_modules/.cache/babel-loader/89c02171edab901b9926470ba6d5677e.ts`,
            content: jsonToReadableText({ something: 10 }),
        };
        const file1: File = {
            path: `/user/username/projects/myproject/test.ts`,
            content: `import { x } from "somemodule";`,
        };
        const file2: File = {
            path: `/user/username/projects/myproject/node_modules/somemodule/index.d.ts`,
            content: `export const x = 10;`,
        };
        it("when watching node_modules in inferred project for failed lookup/closed script infos", () => {
            const files = [libFile, file1, file2];
            const host = createServerHost(files);
            const session = new TestSession(host);
            openFilesForSession([file1], session);

            host.ensureFileOrFolder(npmCacheFile);
            session.host.baselineHost("After npm cache update");
            baselineTsserverLogs("resolutionCache", "when watching node_modules in inferred project for failed lookup/closed script infos", session);
        });
        it("when watching node_modules as part of wild card directories in config project", () => {
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: "{}",
            };
            const files = [libFile, file1, file2, config];
            const host = createServerHost(files);
            const session = new TestSession(host);
            openFilesForSession([file1], session);

            host.ensureFileOrFolder(npmCacheFile);
            session.host.baselineHost("After npm cache update");
            baselineTsserverLogs("resolutionCache", "when watching node_modules as part of wild card directories in config project", session);
        });
    });

    describe("avoid unnecessary invalidation", () => {
        it("unnecessary lookup invalidation on save", () => {
            const fileContent = `import { module1 } from "module1";import { module2 } from "module2";`;
            const file1: File = {
                path: `/user/username/projects/myproject/src/file1.ts`,
                content: fileContent,
            };
            const { module1, module2 } = getModules(`/user/username/projects/myproject/src/node_modules/module1/index.ts`, `/user/username/projects/myproject/node_modules/module2/index.ts`);
            const files = [module1, module2, file1, configFile, libFile];
            const host = createServerHost(files);
            const session = new TestSession(host);
            openFilesForSession([file1], session);

            // invoke callback to simulate saving
            host.modifyFile(file1.path, file1.content, { invokeFileDeleteCreateAsPartInsteadOfChange: true });
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("resolutionCache", "avoid unnecessary lookup invalidation on save", session);
        });
    });
});

describe("unittests:: tsserver:: resolutionCache:: tsserverProjectSystem with project references", () => {
    it("sharing across references", () => {
        const host = createServerHost({
            "/users/username/projects/node_modules/moduleX/index.d.ts": "export const x = 10;",
            "/users/username/projects/common/tsconfig.json": jsonToReadableText({
                compilerOptions: compilerOptionsToConfigJson({
                    composite: true,
                    traceResolution: true,
                }),
            }),
            "/users/username/projects/common/moduleA.ts": "export const a = 10;",
            "/users/username/projects/common/moduleB.ts": Utils.dedent`
                import { x } from "moduleX";
                export const b = x;
            `,
            "/users/username/projects/app/tsconfig.json": jsonToReadableText({
                compilerOptions: compilerOptionsToConfigJson({
                    composite: true,
                    traceResolution: true,
                }),
                references: [{ path: "../common" }],
            }),
            "/users/username/projects/app/appA.ts": Utils.dedent`
                import { x } from "moduleX";
                export const y = x;
            `,
            "/users/username/projects/app/appB.ts": Utils.dedent`
                import { x } from "../common/moduleB";
                export const y = x;
            `,
        });
        const session = new TestSession(host);
        openFilesForSession(["/users/username/projects/app/appB.ts"], session);
        baselineTsserverLogs("resolutionCache", "sharing across references", session);
    });

    it("not sharing across references", () => {
        const host = createServerHost({
            "/users/username/projects/node_modules/moduleX/index.d.ts": "export const x = 10;",
            "/users/username/projects/common/tsconfig.json": jsonToReadableText({
                compilerOptions: { composite: true, traceResolution: true },
            }),
            "/users/username/projects/common/moduleA.ts": "export const a = 10;",
            "/users/username/projects/common/moduleB.ts": Utils.dedent`
                import { x } from "moduleX";
                export const b = x;
            `,
            "/users/username/projects/app/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    composite: true,
                    traceResolution: true,
                    typeRoots: [], // Just some sample option that is different across the projects
                },
                references: [{ path: "../common" }],
            }),
            "/users/username/projects/app/appA.ts": Utils.dedent`
                import { x } from "moduleX";
                export const y = x;
            `,
            "/users/username/projects/app/appB.ts": Utils.dedent`
                import { x } from "../common/moduleB";
                export const y = x;
            `,
        });
        const session = new TestSession(host);
        openFilesForSession(["/users/username/projects/app/appB.ts"], session);
        baselineTsserverLogs("resolutionCache", "not sharing across references", session);
    });
});
