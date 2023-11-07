import { jsonToReadableText } from "../helpers.js";
import { getPathForTypeScriptTypingInstallerCacheTest } from "../helpers/contents.js";
import {
    baselineTsserverLogs,
    openExternalProjectForSession,
    openFilesForSession,
    TestSession,
    toExternalFile,
} from "../helpers/tsserver.js";
import { FileWithPackageName } from "../helpers/typingsInstaller.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: typeAquisition:: autoDiscovery", () => {
    it("does not depend on extension", () => {
        const file1 = {
            path: "/user/username/projects/project/app.html",
            content: "",
        };
        const file2 = {
            path: "/user/username/projects/project/app.d.ts",
            content: "",
        };
        const host = TestServerHost.createServerHost([file1, file2]);
        const session = new TestSession(host);
        openExternalProjectForSession({
            projectFileName: "/user/username/projects/project/proj.csproj",
            rootFiles: [toExternalFile(file2.path), { fileName: file1.path, hasMixedContent: true, scriptKind: "JS" }],
            options: {},
        }, session);
        const typeAcquisition = session.getProjectService().externalProjects[0].getTypeAcquisition();
        session.logger.log(`Typine acquisition should be enabled: ${typeAcquisition.enable}`);
        baselineTsserverLogs("typeAquisition", "does not depend on extension", session);
    });
});

describe("unittests:: tsserver:: typeAquisition:: prefer typings to js", () => {
    it("during second resolution pass", () => {
        const f1 = {
            path: "/user/username/projects/project/app.js",
            content: "var x = require('bar')",
        };
        const barjs = {
            path: "/user/username/projects/project/node_modules/bar/index.js",
            content: "export let x = 1",
        };
        const barTypings = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/bar/index.d.ts"),
            content: "export let y: number",
        };
        const config = {
            path: "/user/username/projects/project/jsconfig.json",
            content: jsonToReadableText({ compilerOptions: { allowJs: true }, exclude: ["node_modules"] }),
        };
        const host = TestServerHost.createServerHost([f1, barjs, barTypings, config]);
        const session = new TestSession(host);

        openFilesForSession([f1], session);

        baselineTsserverLogs("typeAquisition", "prefer typings in second pass", session);
    });
});

describe("unittests:: tsserver:: typeAquisition:: changes", () => {
    it("changes to typeAquisition with already aquired typing", () => {
        const { host, session, disableTypeAcquisition, verifyEnabledTypeAcquisition } = setup(
            /*hostHasBarTyping*/ true,
            /*enablebleTypeAquisition*/ true,
        );
        disableTypeAcquisition();
        host.runQueuedTimeoutCallbacks();
        verifyEnabledTypeAcquisition();
        baselineTsserverLogs("typeAquisition", "changes to typeAquisition with already aquired typing", session);
    });

    it("changes to typeAquisition when typing installer installs typing", () => {
        const { host, session, disableTypeAcquisition, verifyEnabledTypeAcquisition } = setup(
            /*hostHasBarTyping*/ false,
            /*enablebleTypeAquisition*/ true,
        );
        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks(); // First project upate after typings are installed
        host.runQueuedTimeoutCallbacks(); // Update scheduled after the typings from unresolved imports are discovered again
        host.runQueuedTimeoutCallbacks();
        disableTypeAcquisition();
        host.runQueuedTimeoutCallbacks();
        verifyEnabledTypeAcquisition();
        baselineTsserverLogs("typeAquisition", "changes to typeAquisition when typing installer installs typing", session);
    });

    it("midway changes to typeAquisition when typing installer installs typing", () => {
        const { host, session, disableTypeAcquisition, verifyEnabledTypeAcquisition } = setup(
            /*hostHasBarTyping*/ false,
            /*enablebleTypeAquisition*/ true,
        );
        host.runPendingInstalls();
        disableTypeAcquisition();
        host.runQueuedTimeoutCallbacks(); // First project upate after typings are installed
        verifyEnabledTypeAcquisition();
        baselineTsserverLogs("typeAquisition", "midway changes to typeAquisition when typing installer installs typing", session);
    });

    it("receives update of typings after project changes", () => {
        const { host, session, disableTypeAcquisition, verifyEnabledTypeAcquisition } = setup(
            /*hostHasBarTyping*/ false,
            /*enablebleTypeAquisition*/ true,
        );
        disableTypeAcquisition();
        host.runQueuedTimeoutCallbacks(); // Update project
        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();
        verifyEnabledTypeAcquisition();
        baselineTsserverLogs("typeAquisition", "receives update of typings after project changes", session);
    });

    it("change after enabling typeAquisition", () => {
        const { host, session, verifyEnabledTypeAcquisition } = setup(
            /*hostHasBarTyping*/ true,
            /*enablebleTypeAquisition*/ false,
        );
        verifyEnabledTypeAcquisition();
        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();
        host.runQueuedTimeoutCallbacks();
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typeAquisition", "change after enabling typeAquisition", session);
    });

    function setup(
        hostHasBarTyping: boolean,
        enablebleTypeAquisition: boolean,
    ) {
        const host = TestServerHost.createServerHost({
            "/users/user/projects/project1/app.js": `var x = require('bar');`,
            "/users/user/projects/project1/node_modules/bar/index.js": "export const x = 1",
        }, { typingsInstallerTypesRegistry: "bar" });
        typeAcquisition(enablebleTypeAquisition);
        const barTyping: FileWithPackageName = {
            path: getPathForTypeScriptTypingInstallerCacheTest("/node_modules/@types/bar/index.d.ts"),
            content: "export const x = 1;",
            package: "bar",
        };
        if (hostHasBarTyping) host.ensureFileOrFolder(barTyping);
        const session = new TestSession({
            host,
            installAction: [barTyping],
        });
        openFilesForSession(["/users/user/projects/project1/app.js"], session);
        return { host, session, disableTypeAcquisition, verifyEnabledTypeAcquisition };

        function typeAcquisition(enable: boolean) {
            host.writeFile("/users/user/projects/project1/jsconfig.json", config(enable));
        }

        function config(enablebleTypeAquisition: boolean) {
            return jsonToReadableText({
                compilerOptions: {
                    allowJs: true,
                    traceResolution: true,
                },
                typeAcquisition: enablebleTypeAquisition ? undefined : { enable: false },
            });
        }

        function verifyEnabledTypeAcquisition() {
            typeAcquisition(/*enable*/ true);
            host.runQueuedTimeoutCallbacks();
            host.runQueuedTimeoutCallbacks();
            host.runQueuedTimeoutCallbacks();
        }

        function disableTypeAcquisition() {
            typeAcquisition(/*enable*/ false);
        }
    }
});
