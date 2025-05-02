import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyAlternateResultScenario } from "../helpers/alternateResult.js";
import { solutionBuildWithBaseline } from "../helpers/solutionBuilder.js";
import {
    baselineTsserverLogs,
    forEachTscWatchEdit,
    openFilesForSession,
    protocolTextSpanFromSubstring,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: moduleResolution::", () => {
    describe("package json file is edited", () => {
        function setup(packageFileContents: string) {
            const configFile: File = {
                path: `/user/username/projects/myproject/src/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        target: "es2016",
                        module: "Node16",
                        outDir: "../out",
                        traceResolution: true,
                    },
                }),
            };
            const packageFile: File = {
                path: `/user/username/projects/myproject/package.json`,
                content: packageFileContents,
            };
            const fileA: File = {
                path: `/user/username/projects/myproject/src/fileA.ts`,
                content: dedent`
                        import { foo } from "./fileB.mjs";
                        foo();
                    `,
            };
            const fileB: File = {
                path: `/user/username/projects/myproject/src/fileB.mts`,
                content: dedent`
                        export function foo() {
                        }
                    `,
            };
            const host = TestServerHost.createServerHost([
                configFile,
                fileA,
                fileB,
                packageFile,
            ]);
            const session = new TestSession(host);
            openFilesForSession([fileA], session);
            return {
                host,
                session,
                packageFile,
                verifyErr: () => verifyGetErrRequest({ files: [fileA], session }),
            };
        }
        it("package json file is edited", () => {
            const { host, session, packageFile, verifyErr } = setup(jsonToReadableText({ name: "app", version: "1.0.0" }));

            session.logger.info("Modify package json file to add type module");
            host.modifyFile(
                packageFile.path,
                jsonToReadableText({
                    name: "app",
                    version: "1.0.0",
                    type: "module",
                }),
                { ignoreWatches: true },
            );
            host.invokeFsWatches(packageFile.path, "rename", packageFile.path, /*useTildeSuffix*/ undefined); // Create event instead of change
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            session.logger.info("Modify package json file to remove type module");
            host.writeFile(packageFile.path, packageFile.content);
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            session.logger.info("Delete package.json");
            host.deleteFile(packageFile.path);
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            session.logger.info("Modify package json file to add type module");
            host.writeFile(
                packageFile.path,
                jsonToReadableText({
                    name: "app",
                    version: "1.0.0",
                    type: "module",
                }),
            );
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            session.logger.info("Delete package.json");
            host.deleteFile(packageFile.path);
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            baselineTsserverLogs("moduleResolution", "package json file is edited", session);
        });

        it("package json file is edited when package json with type module exists", () => {
            const { host, session, packageFile, verifyErr } = setup(jsonToReadableText({
                name: "app",
                version: "1.0.0",
                type: "module",
            }));

            session.logger.info("Modify package json file to remove type module");
            host.writeFile(packageFile.path, jsonToReadableText({ name: "app", version: "1.0.0" }));
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            session.logger.info("Modify package json file to add type module");
            host.writeFile(packageFile.path, packageFile.content);
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            session.logger.info("Delete package.json");
            host.deleteFile(packageFile.path);
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            session.logger.info("Modify package json file to without type module");
            host.writeFile(packageFile.path, jsonToReadableText({ name: "app", version: "1.0.0" }));
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            session.logger.info("Delete package.json");
            host.deleteFile(packageFile.path);
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            baselineTsserverLogs("moduleResolution", "package json file is edited when package json with type module exists", session);
        });
    });

    verifyAlternateResultScenario(
        /*forTsserver*/ true,
        (scenario, getHost, edits) => {
            it(scenario, () => {
                const host = getHost();
                const indexFile = "/home/src/projects/project/index.mts";
                const session = new TestSession(host);
                openFilesForSession([indexFile], session);
                verifyGetErrRequest({ files: [indexFile], session });
                forEachTscWatchEdit(session, edits(), () => verifyGetErrRequest({ session, files: [indexFile] }));
                baselineTsserverLogs("moduleResolution", scenario, session);
            });
        },
    );

    describe("using referenced project", () => {
        it("not built", () => {
            verify();
        });
        it("built", () => {
            verify(/*built*/ true);
        });
        function verify(built?: boolean) {
            const indexContent = dedent`
                import { FOO } from "package-a";
                console.log(FOO);
            `;
            const host = TestServerHost.createServerHost({
                "/home/src/projects/project/packages/package-a/package.json": getPackageJson("package-a"),
                "/home/src/projects/project/packages/package-a/tsconfig.json": getTsConfig(),
                "/home/src/projects/project/packages/package-a/src/index.ts": `export * from "./subfolder";`,
                "/home/src/projects/project/packages/package-a/src/subfolder/index.ts": `export const FOO = "bar";`,
                "/home/src/projects/project/packages/package-b/package.json": getPackageJson("package-b"),
                "/home/src/projects/project/packages/package-b/tsconfig.json": getTsConfig([{ path: "../package-a" }]),
                "/home/src/projects/project/packages/package-b/src/index.ts": indexContent,
                "/home/src/projects/project/node_modules/package-a": { symLink: "/home/src/projects/project/packages/package-a" },
                "/home/src/projects/project/node_modules/package-b": { symLink: "/home/src/projects/project/packages/package-b" },
            });
            if (built) {
                solutionBuildWithBaseline(host, ["/home/src/projects/project/packages/package-b"]);
                host.clearOutput();
            }
            const session = new TestSession(host);
            openFilesForSession(["/home/src/projects/project/packages/package-b/src/index.ts"], session);
            verifyGetErrRequest({
                session,
                files: ["/home/src/projects/project/packages/package-b/src/index.ts"],
            });
            const { end } = protocolTextSpanFromSubstring(indexContent, "package-a");
            session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                command: ts.server.protocol.CommandTypes.UpdateOpen,
                arguments: {
                    changedFiles: [{
                        fileName: "/home/src/projects/project/packages/package-b/src/index.ts",
                        textChanges: [{
                            start: end,
                            end,
                            newText: "X",
                        }],
                    }],
                },
            });
            verifyGetErrRequest({
                session,
                files: ["/home/src/projects/project/packages/package-b/src/index.ts"],
            });
            session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                command: ts.server.protocol.CommandTypes.UpdateOpen,
                arguments: {
                    changedFiles: [{
                        fileName: "/home/src/projects/project/packages/package-b/src/index.ts",
                        textChanges: [{
                            start: end,
                            end: { ...end, offset: end.offset + 1 },
                            newText: "",
                        }],
                    }],
                },
            });
            verifyGetErrRequest({
                session,
                files: ["/home/src/projects/project/packages/package-b/src/index.ts"],
            });
            baselineTsserverLogs("moduleResolution", `using referenced project${built ? " built" : ""}`, session);
        }
        function getPackageJson(packageName: string) {
            return jsonToReadableText({
                name: packageName,
                version: "1.0.0",
                type: "module",
                main: "build/index.js",
                exports: {
                    ".": "./build/index.js",
                    "./package.json": "./package.json",
                    "./*": ["./build/*/index.js", "./build/*.js"],
                },
            });
        }

        function getTsConfig(references?: object[]) {
            return jsonToReadableText({
                compilerOptions: {
                    allowSyntheticDefaultImports: true,
                    baseUrl: "./",
                    composite: true,
                    declarationMap: true,
                    esModuleInterop: true,
                    lib: ["es2021"],
                    module: "esnext",
                    moduleResolution: "bundler",
                    outDir: "build",
                    rootDir: "./src",
                    target: "ES2021",
                    traceResolution: true,
                    tsBuildInfoFile: "./build/tsconfig.tsbuildinfo",
                },
                include: ["./src/**/*.ts"],
                references,
            });
        }
    });
});
