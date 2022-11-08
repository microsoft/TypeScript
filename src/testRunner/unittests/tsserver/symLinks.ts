import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: symLinks", () => {
    it("rename in common file renames all project", () => {
        const projects = "/users/username/projects";
        const folderA = `${projects}/a`;
        const aFile: ts.projectSystem.File = {
            path: `${folderA}/a.ts`,
            content: `import {C} from "./c/fc"; console.log(C)`
        };
        const aTsconfig: ts.projectSystem.File = {
            path: `${folderA}/tsconfig.json`,
            content: JSON.stringify({ compilerOptions: { module: "commonjs" } })
        };
        const aC: ts.projectSystem.SymLink = {
            path: `${folderA}/c`,
            symLink: "../c"
        };
        const aFc = `${folderA}/c/fc.ts`;

        const folderB = `${projects}/b`;
        const bFile: ts.projectSystem.File = {
            path: `${folderB}/b.ts`,
            content: `import {C} from "./c/fc"; console.log(C)`
        };
        const bTsconfig: ts.projectSystem.File = {
            path: `${folderB}/tsconfig.json`,
            content: JSON.stringify({ compilerOptions: { module: "commonjs" } })
        };
        const bC: ts.projectSystem.SymLink = {
            path: `${folderB}/c`,
            symLink: "../c"
        };
        const bFc = `${folderB}/c/fc.ts`;

        const folderC = `${projects}/c`;
        const cFile: ts.projectSystem.File = {
            path: `${folderC}/fc.ts`,
            content: `export const C = 8`
        };

        const files = [cFile, ts.projectSystem.libFile, aFile, aTsconfig, aC, bFile, bTsconfig, bC];
        const host = ts.projectSystem.createServerHost(files);
        const session = ts.projectSystem.createSession(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        ts.projectSystem.openFilesForSession(
            [
                { file: aFile, projectRootPath: folderA },
                { file: bFile, projectRootPath: folderB },
                { file: aFc, projectRootPath: folderA },
                { file: bFc, projectRootPath: folderB },
            ],
            session);
        ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, { file: aFc, ...ts.projectSystem.protocolLocationFromSubstring(cFile.content, "C") });
        ts.projectSystem.baselineTsserverLogs("symLinks", "rename in common file renames all project", session);
    });

    describe("module resolution when symlinked folder contents change and resolve modules", () => {
        const projectRootPath = "/users/username/projects/myproject";
        const packages = `${projectRootPath}/javascript/packages`;
        const recognizersDateTime = `${packages}/recognizers-date-time`;
        const recognizersText = `${packages}/recognizers-text`;
        const recognizersTextDist = `${recognizersText}/dist`;
        const moduleName = "@microsoft/recognizers-text";
        const moduleNameInFile = `"${moduleName}"`;
        const recognizersDateTimeSrcFile: ts.projectSystem.File = {
            path: `${recognizersDateTime}/src/datetime/baseDate.ts`,
            content: `import {C} from ${moduleNameInFile};
new C();`
        };
        const recognizerDateTimeTsconfigPath = `${recognizersDateTime}/tsconfig.json`;
        const recognizerDateTimeTsconfigWithoutPathMapping: ts.projectSystem.File = {
            path: recognizerDateTimeTsconfigPath,
            content: JSON.stringify({
                include: ["src"]
            })
        };
        const recognizerDateTimeTsconfigWithPathMapping: ts.projectSystem.File = {
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
        const nodeModulesRecorgnizersText: ts.projectSystem.SymLink = {
            path: `${recognizersDateTime}/node_modules/@microsoft/recognizers-text`,
            symLink: recognizersText
        };
        const recognizerTextSrcFile: ts.projectSystem.File = {
            path: `${recognizersText}/src/recognizers-text.ts`,
            content: `export class C { method () { return 10; } }`
        };
        const recongnizerTextDistTypingFile: ts.projectSystem.File = {
            path: `${recognizersTextDist}/types/recognizers-text.d.ts`,
            content: `export class C { method(): number; }`
        };
        const recongnizerTextPackageJson: ts.projectSystem.File = {
            path: `${recognizersText}/package.json`,
            content: JSON.stringify({
                typings: "dist/types/recognizers-text.d.ts"
            })
        };

        function createSessionAndOpenFile(host: ts.projectSystem.TestServerHost) {
            const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
            session.executeCommandSeq<ts.projectSystem.protocol.OpenRequest>({
                command: ts.projectSystem.protocol.CommandTypes.Open,
                arguments: {
                    file: recognizersDateTimeSrcFile.path,
                    projectRootPath
                }
            });
            return session;
        }

        function verifyModuleResolution(withPathMapping: boolean) {
            describe(withPathMapping ? "when tsconfig file contains path mapping" : "when tsconfig does not contain path mapping", () => {
                const filesWithSources = [ts.projectSystem.libFile, recognizersDateTimeSrcFile, withPathMapping ? recognizerDateTimeTsconfigWithPathMapping : recognizerDateTimeTsconfigWithoutPathMapping, recognizerTextSrcFile, recongnizerTextPackageJson];
                it("when project compiles from sources", () => {
                    const host = ts.projectSystem.createServerHost(filesWithSources);
                    const session = createSessionAndOpenFile(host);
                    ts.projectSystem.verifyGetErrRequest({ session, host, files: [recognizersDateTimeSrcFile] });

                    host.ensureFileOrFolder(nodeModulesRecorgnizersText);
                    host.writeFile(recongnizerTextDistTypingFile.path, recongnizerTextDistTypingFile.content);
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    ts.projectSystem.verifyGetErrRequest({ session, host, files: [recognizersDateTimeSrcFile] });

                    // Change config file's module resolution affecting option
                    const config = JSON.parse(host.readFile(recognizerDateTimeTsconfigPath)!);
                    host.writeFile(recognizerDateTimeTsconfigPath, JSON.stringify({
                        ...config,
                        compilerOptions: { ...config.compilerOptions, resolveJsonModule: true }
                    }));
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    ts.projectSystem.baselineTsserverLogs("symLinks", `module resolution${withPathMapping ? " with path mapping" : ""} when project compiles from sources`, session);
                });

                it("when project has node_modules setup but doesnt have modules in typings folder and then recompiles", () => {
                    const host = ts.projectSystem.createServerHost([...filesWithSources, nodeModulesRecorgnizersText]);
                    const session = createSessionAndOpenFile(host);
                    ts.projectSystem.verifyGetErrRequest({ session, host, files: [recognizersDateTimeSrcFile] });

                    host.writeFile(recongnizerTextDistTypingFile.path, recongnizerTextDistTypingFile.content);
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    ts.projectSystem.verifyGetErrRequest({ session, host, files: [recognizersDateTimeSrcFile] });
                    ts.projectSystem.baselineTsserverLogs("symLinks", `module resolution${withPathMapping ? " with path mapping" : ""} when project has node_modules setup but doesnt have modules in typings folder and then recompiles`, session);
                });

                it("when project recompiles after deleting generated folders", () => {
                    const host = ts.projectSystem.createServerHost([...filesWithSources, nodeModulesRecorgnizersText, recongnizerTextDistTypingFile]);
                    const session = createSessionAndOpenFile(host);

                    ts.projectSystem.verifyGetErrRequest({ session, host, files: [recognizersDateTimeSrcFile] });

                    host.deleteFolder(recognizersTextDist, /*recursive*/ true);
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    ts.projectSystem.verifyGetErrRequest({ session, host, files: [recognizersDateTimeSrcFile] });

                    host.ensureFileOrFolder(recongnizerTextDistTypingFile);
                    host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                    host.runQueuedTimeoutCallbacks(); // Actual update

                    ts.projectSystem.verifyGetErrRequest({ session, host, files: [recognizersDateTimeSrcFile] });
                    ts.projectSystem.baselineTsserverLogs("symLinks", `module resolution${withPathMapping ? " with path mapping" : ""} when project recompiles after deleting generated folders`, session);
                });
            });
        }

        verifyModuleResolution(/*withPathMapping*/ false);
        verifyModuleResolution(/*withPathMapping*/ true);
    });
});
