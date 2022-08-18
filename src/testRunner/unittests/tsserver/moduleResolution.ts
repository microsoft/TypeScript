namespace ts.projectSystem {
    describe("unittests:: tsserver:: moduleResolution", () => {
        describe("package json file is edited", () => {
            function setup(packageFileContents: string) {
                const configObj ={
                        compilerOptions: {
                            target: "es2016",
                            module: "Node16",
                            outDir: "../out",
                            traceResolution: true,
                        }
                    };
                const configFile: File = {
                    path: `${tscWatch.projectRoot}/src/tsconfig.json`,
                    content: JSON.stringify(configObj)
                };
                const packageFile: File = {
                    path: `${tscWatch.projectRoot}/package.json`,
                    content: packageFileContents
                };
                const fileA: File = {
                    path: `${tscWatch.projectRoot}/src/fileA.ts`,
                    content: Utils.dedent`
                        import { foo } from "./fileB.mjs";
                        foo();
                    `
                };
                const fileB: File = {
                    path: `${tscWatch.projectRoot}/src/fileB.mts`,
                    content: Utils.dedent`
                        export function foo() {
                        }
                    `
                };
                const host = createServerHost([configFile, fileA, fileB, packageFile, { ...libFile, path: "/a/lib/lib.es2016.full.d.ts" }]);
                const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs() });
                openFilesForSession([fileA], session);
                return {
                    host, session, packageFile,
                    verifyErr: () => verifyGetErrRequest({ files: [fileA], session, host }),
                };
            }
            it("package json file is edited", () => {
                const packageObj1 ={ name: "app", version: "1.0.0" };
                const { host, session, packageFile, verifyErr } = setup(JSON.stringify(packageObj1));

                session.logger.info("Modify package json file to add type module");
                const packageObj2 ={
                    name: "app", version: "1.0.0", type: "module",
                };
                host.writeFile(packageFile.path, JSON.stringify(packageObj2));
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

                const packageObj3 ={
                    name: "app", version: "1.0.0", type: "module",
                };
                session.logger.info("Modify package json file to add type module");
                host.writeFile(packageFile.path, JSON.stringify(packageObj3));
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
                const packageObj1 ={
                    name: "app", version: "1.0.0", type: "module",
                };
                const { host, session, packageFile, verifyErr } = setup(JSON.stringify(packageObj1));

const packageObj2 ={ name: "app", version: "1.0.0" };
                session.logger.info("Modify package json file to remove type module");
                host.writeFile(packageFile.path, JSON.stringify(packageObj2));
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

    const packageObj3 ={ name: "app", version: "1.0.0" };
                session.logger.info("Modify package json file to without type module");
                host.writeFile(packageFile.path, JSON.stringify(packageObj3));
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
    });
}
