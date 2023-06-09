import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as Utils from "../../_namespaces/Utils";
import { getFsConentsForNode10ResultAtTypesPackageJson, getFsContentsForNode10Result, getFsContentsForNode10ResultDts, getFsContentsForNode10ResultPackageJson } from "../helpers/node10Result";
import {
    baselineTsserverLogs,
    createSession,
    openFilesForSession,
    verifyGetErrRequest,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: moduleResolution", () => {
    describe("package json file is edited", () => {
        function setup(packageFileContents: string) {
            const configFile: File = {
                path: `/user/username/projects/myproject/src/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        target: "es2016",
                        module: "Node16",
                        outDir: "../out",
                        traceResolution: true,
                    }
                })
            };
            const packageFile: File = {
                path: `/user/username/projects/myproject/package.json`,
                content: packageFileContents
            };
            const fileA: File = {
                path: `/user/username/projects/myproject/src/fileA.ts`,
                content: Utils.dedent`
                        import { foo } from "./fileB.mjs";
                        foo();
                    `
            };
            const fileB: File = {
                path: `/user/username/projects/myproject/src/fileB.mts`,
                content: Utils.dedent`
                        export function foo() {
                        }
                    `
            };
            const host = createServerHost([configFile, fileA, fileB, packageFile, { ...libFile, path: "/a/lib/lib.es2016.full.d.ts" }]);
            const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
            openFilesForSession([fileA], session);
            return {
                host, session, packageFile,
                verifyErr: () => verifyGetErrRequest({ files: [fileA], session }),
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

            baselineTsserverLogs("moduleResolution", "package json file is edited", session);
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

            baselineTsserverLogs("moduleResolution", "package json file is edited when package json with type module exists", session);
        });
    });

    it("node10Result", () => {
        const host = createServerHost(getFsContentsForNode10Result());
        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession(["/home/src/projects/project/index.mts"], session);
        verifyGetErrRequest({
            files: ["/home/src/projects/project/index.mts"],
            session,
        });
        host.deleteFile("/home/src/projects/project/node_modules/@types/bar/index.d.ts");
        verifyErrors();
        host.deleteFile("/home/src/projects/project/node_modules/foo/index.d.ts");
        verifyErrors();
        host.writeFile("/home/src/projects/project/node_modules/@types/bar/index.d.ts", getFsContentsForNode10ResultDts("bar"));
        verifyErrors();
        host.writeFile("/home/src/projects/project/node_modules/foo/index.d.ts", getFsContentsForNode10ResultDts("foo"));
        verifyErrors();
        host.writeFile("/home/src/projects/project/node_modules/@types/bar/package.json", getFsConentsForNode10ResultAtTypesPackageJson("bar", /*addTypesCondition*/ true));
        verifyErrors();
        host.writeFile("/home/src/projects/project/node_modules/foo/package.json", getFsContentsForNode10ResultPackageJson("foo", /*addTypes*/ true, /*addTypesCondition*/ true));
        verifyErrors();
        host.writeFile("/home/src/projects/project/node_modules/@types/bar2/package.json", getFsConentsForNode10ResultAtTypesPackageJson("bar2", /*addTypesCondition*/ false));
        verifyErrors();
        host.writeFile("/home/src/projects/project/node_modules/foo2/package.json", getFsContentsForNode10ResultPackageJson("foo2", /*addTypes*/ true, /*addTypesCondition*/ false));
        verifyErrors();
        host.deleteFile("/home/src/projects/project/node_modules/@types/bar2/index.d.ts");
        verifyErrors();
        host.deleteFile("/home/src/projects/project/node_modules/foo2/index.d.ts");
        verifyErrors();
        host.writeFile("/home/src/projects/project/node_modules/@types/bar2/index.d.ts", getFsContentsForNode10ResultDts("bar2"));
        verifyErrors();
        host.writeFile("/home/src/projects/project/node_modules/foo2/index.d.ts", getFsContentsForNode10ResultDts("foo2"));
        verifyErrors();

        baselineTsserverLogs("moduleResolution", "node10Result", session);

        function verifyErrors() {
            host.runQueuedTimeoutCallbacks();
            host.runQueuedImmediateCallbacks();
            verifyGetErrRequest({
                files: ["/home/src/projects/project/index.mts"],
                session,
            });
        }
    });
});