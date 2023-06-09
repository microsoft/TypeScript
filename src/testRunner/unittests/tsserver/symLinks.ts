import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createSession,
    openFilesForSession,
    protocolLocationFromSubstring,
    verifyGetErrRequest,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
    SymLink,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: symLinks", () => {
    it("rename in common file renames all project", () => {
        const folderA = `/users/username/projects/a`;
        const aFile: File = {
            path: `${folderA}/a.ts`,
            content: `import {C} from "./c/fc"; console.log(C)`
        };
        const aTsconfig: File = {
            path: `${folderA}/tsconfig.json`,
            content: JSON.stringify({ compilerOptions: { module: "commonjs" } })
        };
        const aC: SymLink = {
            path: `${folderA}/c`,
            symLink: "../c"
        };
        const aFc = `${folderA}/c/fc.ts`;

        const folderB = `/users/username/projects/b`;
        const bFile: File = {
            path: `${folderB}/b.ts`,
            content: `import {C} from "./c/fc"; console.log(C)`
        };
        const bTsconfig: File = {
            path: `${folderB}/tsconfig.json`,
            content: JSON.stringify({ compilerOptions: { module: "commonjs" } })
        };
        const bC: SymLink = {
            path: `${folderB}/c`,
            symLink: "../c"
        };
        const bFc = `${folderB}/c/fc.ts`;

        const folderC = `/users/username/projects/c`;
        const cFile: File = {
            path: `${folderC}/fc.ts`,
            content: `export const C = 8`
        };

        const files = [cFile, libFile, aFile, aTsconfig, aC, bFile, bTsconfig, bC];
        const host = createServerHost(files);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession(
            [
                { file: aFile, projectRootPath: folderA },
                { file: bFile, projectRootPath: folderB },
                { file: aFc, projectRootPath: folderA },
                { file: bFc, projectRootPath: folderB },
            ],
            session);
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: { file: aFc, ...protocolLocationFromSubstring(cFile.content, "C") }
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
new C();`
        };
        const recognizerDateTimeTsconfigPath = `${recognizersDateTime}/tsconfig.json`;
        const recognizerDateTimeTsconfigWithoutPathMapping: File = {
            path: recognizerDateTimeTsconfigPath,
            content: JSON.stringify({
                include: ["src"]
            })
        };
        const recognizerDateTimeTsconfigWithPathMapping: File = {
            path: recognizerDateTimeTsconfigPath,
            content: JSON.stringify({
                compilerOptions: {
                    rootDir: "src",
                    baseUrl: "./",
                    paths: {
                        "@microsoft/*": ["../*"]
                    }
                },
                include: ["src"]
            })
        };
        const nodeModulesRecorgnizersText: SymLink = {
            path: `${recognizersDateTime}/node_modules/@microsoft/recognizers-text`,
            symLink: recognizersText
        };
        const recognizerTextSrcFile: File = {
            path: `${recognizersText}/src/recognizers-text.ts`,
            content: `export class C { method () { return 10; } }`
        };
        const recongnizerTextDistTypingFile: File = {
            path: `${recognizersTextDist}/types/recognizers-text.d.ts`,
            content: `export class C { method(): number; }`
        };
        const recongnizerTextPackageJson: File = {
            path: `${recognizersText}/package.json`,
            content: JSON.stringify({
                typings: "dist/types/recognizers-text.d.ts"
            })
        };

        function createSessionAndOpenFile(host: TestServerHost) {
            const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
            session.executeCommandSeq<ts.server.protocol.OpenRequest>({
                command: ts.server.protocol.CommandTypes.Open,
                arguments: {
                    file: recognizersDateTimeSrcFile.path,
                    projectRootPath
                }
            });
            return session;
        }

        function verifyModuleResolution(withPathMapping: boolean) {
            describe(withPathMapping ? "when tsconfig file contains path mapping" : "when tsconfig does not contain path mapping", () => {
                const filesWithSources = [libFile, recognizersDateTimeSrcFile, withPathMapping ? recognizerDateTimeTsconfigWithPathMapping : recognizerDateTimeTsconfigWithoutPathMapping, recognizerTextSrcFile, recongnizerTextPackageJson];
                it("when project compiles from sources", () => {
                    const host = createServerHost(filesWithSources);
                    const session = createSessionAndOpenFile(host);
                    verifyGetErrRequest({ session, files: [recognizersDateTimeSrcFile] });

                    host.ensureFileOrFolder(nodeModulesRecorgnizersText);
                    host.writeFile(recongnizerTextDistTypingFile.path, recongnizerTextDistTypingFile.content);
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    verifyGetErrRequest({ session, files: [recognizersDateTimeSrcFile] });

                    // Change config file's module resolution affecting option
                    const config = JSON.parse(host.readFile(recognizerDateTimeTsconfigPath)!);
                    host.writeFile(recognizerDateTimeTsconfigPath, JSON.stringify({
                        ...config,
                        compilerOptions: { ...config.compilerOptions, resolveJsonModule: true }
                    }));
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    baselineTsserverLogs("symLinks", `module resolution${withPathMapping ? " with path mapping" : ""} when project compiles from sources`, session);
                });

                it("when project has node_modules setup but doesnt have modules in typings folder and then recompiles", () => {
                    const host = createServerHost([...filesWithSources, nodeModulesRecorgnizersText]);
                    const session = createSessionAndOpenFile(host);
                    verifyGetErrRequest({ session, files: [recognizersDateTimeSrcFile] });

                    host.writeFile(recongnizerTextDistTypingFile.path, recongnizerTextDistTypingFile.content);
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    verifyGetErrRequest({ session, files: [recognizersDateTimeSrcFile] });
                    baselineTsserverLogs("symLinks", `module resolution${withPathMapping ? " with path mapping" : ""} when project has node_modules setup but doesnt have modules in typings folder and then recompiles`, session);
                });

                it("when project recompiles after deleting generated folders", () => {
                    const host = createServerHost([...filesWithSources, nodeModulesRecorgnizersText, recongnizerTextDistTypingFile]);
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
});
