import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineTsserverLogs,
    openExternalProjectForSession,
    openFilesForSession,
    TestSession,
    toExternalFile,
} from "../helpers/tsserver";
import {
    FileWithPackageName,
} from "../helpers/typingsInstaller";
import {
    createServerHost,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: typeAquisition:: autoDiscovery", () => {
    it("does not depend on extension", () => {
        const file1 = {
            path: "/a/b/app.html",
            content: "",
        };
        const file2 = {
            path: "/a/b/app.d.ts",
            content: "",
        };
        const host = createServerHost([file1, file2]);
        const session = new TestSession(host);
        openExternalProjectForSession({
            projectFileName: "/a/b/proj.csproj",
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
        const globalTypingsCacheLocation = "/a/typings";
        const f1 = {
            path: "/a/b/app.js",
            content: "var x = require('bar')",
        };
        const barjs = {
            path: "/a/b/node_modules/bar/index.js",
            content: "export let x = 1",
        };
        const barTypings = {
            path: `${globalTypingsCacheLocation}/node_modules/@types/bar/index.d.ts`,
            content: "export let y: number",
        };
        const config = {
            path: "/a/b/jsconfig.json",
            content: jsonToReadableText({ compilerOptions: { allowJs: true }, exclude: ["node_modules"] }),
        };
        const host = createServerHost([f1, barjs, barTypings, config]);
        const session = new TestSession({ host, globalTypingsCacheLocation });

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
        baselineTsserverLogs("typeAquisition", "change after enabling typeAquisition", session);
    });

    function setup(
        hostHasBarTyping: boolean,
        enablebleTypeAquisition: boolean,
    ) {
        const globalTypingsCacheLocation = "/users/user/projects/typings";
        const host = createServerHost({
            "/users/user/projects/project1/app.js": `var x = require('bar');`,
            "/users/user/projects/project1/node_modules/bar/index.js": "export const x = 1",
        });
        typeAcquisition(enablebleTypeAquisition);
        const barTyping: FileWithPackageName = {
            path: `${globalTypingsCacheLocation}/node_modules/@types/bar/index.d.ts`,
            content: "export const x = 1;",
            package: "bar",
        };
        if (hostHasBarTyping) host.ensureFileOrFolder(barTyping);
        const session = new TestSession({
            host,
            installAction: [barTyping],
            globalTypingsCacheLocation,
            typesRegistry: "bar",
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
        }

        function disableTypeAcquisition() {
            typeAcquisition(/*enable*/ false);
        }
    }
});
