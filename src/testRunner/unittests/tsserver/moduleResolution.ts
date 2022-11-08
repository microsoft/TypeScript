import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

describe("unittests:: tsserver:: moduleResolution", () => {
    describe("package json file is edited", () => {
        function setup(packageFileContents: string) {
            const configFile: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/src/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        target: "es2016",
                        module: "Node16",
                        outDir: "../out",
                        traceResolution: true,
                    }
                })
            };
            const packageFile: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/package.json`,
                content: packageFileContents
            };
            const fileA: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/src/fileA.ts`,
                content: Utils.dedent`
                        import { foo } from "./fileB.mjs";
                        foo();
                    `
            };
            const fileB: ts.projectSystem.File = {
                path: `${ts.tscWatch.projectRoot}/src/fileB.mts`,
                content: Utils.dedent`
                        export function foo() {
                        }
                    `
            };
            const host = ts.projectSystem.createServerHost([configFile, fileA, fileB, packageFile, { ...ts.projectSystem.libFile, path: "/a/lib/lib.es2016.full.d.ts" }]);
            const session = ts.projectSystem.createSession(host, { canUseEvents: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
            ts.projectSystem.openFilesForSession([fileA], session);
            return {
                host, session, packageFile,
                verifyErr: () => ts.projectSystem.verifyGetErrRequest({ files: [fileA], session, host }),
            };
        }
        it("package json file is edited", () => {
            const { host, session, packageFile, verifyErr } = setup(JSON.stringify({ name: "app", version: "1.0.0" }));

            session.logger.info("Modify package json file to add type module");
            host.writeFile(packageFile.path, JSON.stringify({
                name: "app", version: "1.0.0", type: "module",
            }));
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
            host.writeFile(packageFile.path, JSON.stringify({
                name: "app", version: "1.0.0", type: "module",
            }));
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            session.logger.info("Delete package.json");
            host.deleteFile(packageFile.path);
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            ts.projectSystem.baselineTsserverLogs("moduleResolution", "package json file is edited", session);
        });

        it("package json file is edited when package json with type module exists", () => {
            const { host, session, packageFile, verifyErr } = setup(JSON.stringify({
                name: "app", version: "1.0.0", type: "module",
            }));

            session.logger.info("Modify package json file to remove type module");
            host.writeFile(packageFile.path, JSON.stringify({ name: "app", version: "1.0.0" }));
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
            host.writeFile(packageFile.path, JSON.stringify({ name: "app", version: "1.0.0" }));
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            session.logger.info("Delete package.json");
            host.deleteFile(packageFile.path);
            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
            host.runQueuedTimeoutCallbacks(); // Actual update
            verifyErr();

            ts.projectSystem.baselineTsserverLogs("moduleResolution", "package json file is edited when package json with type module exists", session);
        });
    });
});