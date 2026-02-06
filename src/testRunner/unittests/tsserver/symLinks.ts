import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { forEachMonorepoSymlinkScenario } from "../helpers/monorepoSymlinkedSiblingPackages.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    forEachTscWatchEdit,
    openFilesForSession,
    protocolLocationFromSubstring,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import {
    File,
    SymLink,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: symLinks::", () => {
    it("rename in common file renames all project", () => {
        const folderA = `/users/username/projects/a`;
        const aFile: File = {
            path: `${folderA}/a.ts`,
            content: `import {C} from "./c/fc"; console.log(C)`,
        };
        const aTsconfig: File = {
            path: `${folderA}/tsconfig.json`,
            content: jsonToReadableText({ compilerOptions: { module: "commonjs" } }),
        };
        const aC: SymLink = {
            path: `${folderA}/c`,
            symLink: "../c",
        };
        const aFc = `${folderA}/c/fc.ts`;

        const folderB = `/users/username/projects/b`;
        const bFile: File = {
            path: `${folderB}/b.ts`,
            content: `import {C} from "./c/fc"; console.log(C)`,
        };
        const bTsconfig: File = {
            path: `${folderB}/tsconfig.json`,
            content: jsonToReadableText({ compilerOptions: { module: "commonjs" } }),
        };
        const bC: SymLink = {
            path: `${folderB}/c`,
            symLink: "../c",
        };
        const bFc = `${folderB}/c/fc.ts`;

        const folderC = `/users/username/projects/c`;
        const cFile: File = {
            path: `${folderC}/fc.ts`,
            content: `export const C = 8`,
        };

        const files = [cFile, aFile, aTsconfig, aC, bFile, bTsconfig, bC];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        openFilesForSession(
            [
                { file: aFile, projectRootPath: folderA },
                { file: bFile, projectRootPath: folderB },
                { file: aFc, projectRootPath: folderA },
                { file: bFc, projectRootPath: folderB },
            ],
            session,
        );
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: { file: aFc, ...protocolLocationFromSubstring(cFile.content, "C") },
        });
        baselineTsserverLogs("symLinks", "rename in common file renames all project", session);
    });

    describe("module resolution when symlinked folder contents change and resolve modules", () => {
        const projectRootPath = "/users/username/projects/myproject";
        const packages = `${projectRootPath}/javascript/packages`;
        const recognizersDateTime = `${packages}/recognizers-date-time`;
        const recognizersText = `${packages}/recognizers-text`;
        const recognizersTextDist = `${recognizersText}/dist`;
        const moduleName = "@microsoft/recognizers-text";
        const moduleNameInFile = `"${moduleName}"`;
        const recognizersDateTimeSrcFile: File = {
            path: `${recognizersDateTime}/src/datetime/baseDate.ts`,
            content: `import {C} from ${moduleNameInFile};
new C();`,
        };
        const recognizerDateTimeTsconfigPath = `${recognizersDateTime}/tsconfig.json`;
        const recognizerDateTimeTsconfigWithoutPathMapping: File = {
            path: recognizerDateTimeTsconfigPath,
            content: jsonToReadableText({
                include: ["src"],
            }),
        };
        const recognizerDateTimeTsconfigWithPathMapping: File = {
            path: recognizerDateTimeTsconfigPath,
            content: jsonToReadableText({
                compilerOptions: {
                    rootDir: "src",
                    baseUrl: "./",
                    paths: {
                        "@microsoft/*": ["../*"],
                    },
                },
                include: ["src"],
            }),
        };
        const nodeModulesRecorgnizersText: SymLink = {
            path: `${recognizersDateTime}/node_modules/@microsoft/recognizers-text`,
            symLink: recognizersText,
        };
        const recognizerTextSrcFile: File = {
            path: `${recognizersText}/src/recognizers-text.ts`,
            content: `export class C { method () { return 10; } }`,
        };
        const recongnizerTextDistTypingFile: File = {
            path: `${recognizersTextDist}/types/recognizers-text.d.ts`,
            content: `export class C { method(): number; }`,
        };
        const recongnizerTextPackageJson: File = {
            path: `${recognizersText}/package.json`,
            content: jsonToReadableText({
                typings: "dist/types/recognizers-text.d.ts",
            }),
        };

        function createSessionAndOpenFile(host: TestServerHost) {
            const session = new TestSession(host);
            session.executeCommandSeq<ts.server.protocol.OpenRequest>({
                command: ts.server.protocol.CommandTypes.Open,
                arguments: {
                    file: recognizersDateTimeSrcFile.path,
                    projectRootPath,
                },
            });
            return session;
        }

        function verifyModuleResolution(withPathMapping: boolean) {
            describe(withPathMapping ? "when tsconfig file contains path mapping" : "when tsconfig does not contain path mapping", () => {
                const filesWithSources = [recognizersDateTimeSrcFile, withPathMapping ? recognizerDateTimeTsconfigWithPathMapping : recognizerDateTimeTsconfigWithoutPathMapping, recognizerTextSrcFile, recongnizerTextPackageJson];
                it("when project compiles from sources", () => {
                    const host = TestServerHost.createServerHost(filesWithSources);
                    const session = createSessionAndOpenFile(host);
                    verifyGetErrRequest({ session, files: [recognizersDateTimeSrcFile] });

                    host.ensureFileOrFolder(nodeModulesRecorgnizersText);
                    host.writeFile(recongnizerTextDistTypingFile.path, recongnizerTextDistTypingFile.content);
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    verifyGetErrRequest({ session, files: [recognizersDateTimeSrcFile] });

                    // Change config file's module resolution affecting option
                    const config = JSON.parse(host.readFile(recognizerDateTimeTsconfigPath)!);
                    host.writeFile(
                        recognizerDateTimeTsconfigPath,
                        jsonToReadableText({
                            ...config,
                            compilerOptions: { ...config.compilerOptions, resolveJsonModule: true },
                        }),
                    );
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    baselineTsserverLogs("symLinks", `module resolution${withPathMapping ? " with path mapping" : ""} when project compiles from sources`, session);
                });

                it("when project has node_modules setup but doesnt have modules in typings folder and then recompiles", () => {
                    const host = TestServerHost.createServerHost([...filesWithSources, nodeModulesRecorgnizersText]);
                    const session = createSessionAndOpenFile(host);
                    verifyGetErrRequest({ session, files: [recognizersDateTimeSrcFile] });

                    host.writeFile(recongnizerTextDistTypingFile.path, recongnizerTextDistTypingFile.content);
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    verifyGetErrRequest({ session, files: [recognizersDateTimeSrcFile] });
                    baselineTsserverLogs("symLinks", `module resolution${withPathMapping ? " with path mapping" : ""} when project has node_modules setup but doesnt have modules in typings folder and then recompiles`, session);
                });

                it("when project recompiles after deleting generated folders", () => {
                    const host = TestServerHost.createServerHost([...filesWithSources, nodeModulesRecorgnizersText, recongnizerTextDistTypingFile]);
                    const session = createSessionAndOpenFile(host);

                    verifyGetErrRequest({ session, files: [recognizersDateTimeSrcFile] });

                    host.deleteFolder(recognizersTextDist, /*recursive*/ true);
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    verifyGetErrRequest({ session, files: [recognizersDateTimeSrcFile] });

                    host.ensureFileOrFolder(recongnizerTextDistTypingFile);
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    verifyGetErrRequest({ session, files: [recognizersDateTimeSrcFile] });
                    baselineTsserverLogs("symLinks", `module resolution${withPathMapping ? " with path mapping" : ""} when project recompiles after deleting generated folders`, session);
                });
            });
        }

        verifyModuleResolution(/*withPathMapping*/ false);
        verifyModuleResolution(/*withPathMapping*/ true);
    });

    it("when not symlink but differs in casing", () => {
        const host = TestServerHost.createServerHost({
            "C:/temp/replay/axios-src/lib/core/AxiosHeaders.js": dedent`
                export const b = 10;

            `,
            "C:/temp/replay/axios-src/lib/core/dispatchRequest.js": dedent`
                import { b } from "./AxiosHeaders.js";
                import { b2 } from "./settle.js";
                import { x } from "follow-redirects";
                export const y = 10;
            `,
            "C:/temp/replay/axios-src/lib/core/mergeConfig.js": dedent`
                import { b } from "./AxiosHeaders.js";
                export const y = 10;
            `,
            "C:/temp/replay/axios-src/lib/core/settle.js": dedent`
                export const b2 = 10;
            `,
            "C:/temp/replay/axios-src/package.json": jsonToReadableText({
                name: "axios",
                version: "1.4.0",
                dependencies: { "follow-redirects": "^1.15.0" },
            }),
            "C:/temp/replay/axios-src/node_modules/follow-redirects/package.json": jsonToReadableText({
                name: "follow-redirects",
                version: "1.15.0",
            }),
            "C:/temp/replay/axios-src/node_modules/follow-redirects/index.js": "export const x = 10;",
        }, { windowsStyleRoot: "C:/" });
        const session = new TestSession({ host, disableAutomaticTypingAcquisition: true });
        openFilesForSession(["c:/temp/replay/axios-src/lib/core/AxiosHeaders.js"], session); // Creates InferredProject1 and AutoImportProvider1
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({ // Different content from disk
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: "c:/temp/replay/axios-src/lib/core/AxiosHeaders.js",
                    textChanges: [{
                        newText: "//comment",
                        start: { line: 2, offset: 1 },
                        end: { line: 2, offset: 1 },
                    }],
                }],
            },
        });
        // This will create InferredProject2, but will not create AutoImportProvider as it includes follow-redirect import,
        // contains the file we will be opening after closing changed file
        // It will also close InferredProject1 and AutoImportProvider1
        openFilesForSession(["c:/temp/replay/axios-src/lib/core/dispatchRequest.js"], session);
        // This creates InferredProject3 and AutoImportProvider2
        openFilesForSession(["c:/temp/replay/axios-src/lib/core/mergeConfig.js"], session);
        // Closing this file will schedule update for InferredProject2, InferredProject3
        closeFilesForSession(["c:/temp/replay/axios-src/lib/core/AxiosHeaders.js"], session);
        // When we open this file, we will update InferredProject2 which contains this file and the follow-redirect will be resolved again
        openFilesForSession(["c:/temp/replay/axios-src/lib/core/settle.js"], session);
        baselineTsserverLogs("symLinks", "when not symlink but differs in casing", session);
    });

    forEachMonorepoSymlinkScenario(/*forTsserver*/ true, (scenario, getHost, edits, project, currentDirectory) => {
        [undefined, true].forEach(canUseWatchEvents => {
            it(`${scenario}${canUseWatchEvents ? " canUseWatchEvents" : ""}`, () => {
                const host = getHost();
                const indexFile = ts.normalizePath(ts.combinePaths(currentDirectory, project, "src/index.ts"));
                const session = new TestSession({ host, canUseWatchEvents });
                openFilesForSession([indexFile], session);
                verifyGetErrRequest({ session, files: [indexFile] });
                forEachTscWatchEdit(session, edits(), () => verifyGetErrRequest({ session, files: [indexFile] }));
                baselineTsserverLogs("symLinks", `${scenario}${canUseWatchEvents ? " canUseWatchEvents" : ""}`, session);
            });
        });
    });
});
