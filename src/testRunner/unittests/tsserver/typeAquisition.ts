import { emptyArray } from "../../_namespaces/ts.js";
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
    enum TestType {
        Single = "",
        MultiProject = " multiple projects",
        ProjectWithSharedResolution = " multiple projects with shared resolution",
    }
    [TestType.Single, TestType.MultiProject, TestType.ProjectWithSharedResolution].forEach(testType => {
        it(scenario("changes to typeAquisition with already aquired typing", testType), () => {
            const { session, verifyTypeAcquisition } = setup(
                testType,
                /*hostHasBarTyping*/ true,
                /*enabledTypeAquisition*/ true,
            );
            verifyTypeAcquisition(/*enable*/ false);
            verifyTypeAcquisition(/*enable*/ true);
            baselineTsserverLogs("typeAquisition", scenario("changes to typeAquisition with already aquired typing", testType), session);
        });

        it(scenario("changes to typeAquisition when typing installer installs typing", testType), () => {
            const { session, verifyTypeAcquisition, verifyPendingInstalls } = setup(
                testType,
                /*hostHasBarTyping*/ false,
                /*enabledTypeAquisition*/ true,
            );
            verifyPendingInstalls();
            verifyTypeAcquisition(/*enable*/ false);
            verifyTypeAcquisition(/*enable*/ true);
            baselineTsserverLogs("typeAquisition", scenario("changes to typeAquisition when typing installer installs typing", testType), session);
        });

        it(scenario("midway changes to typeAquisition when typing installer installs typing", testType), () => {
            const { host, session, verifyTypeAcquisition } = setup(
                testType,
                /*hostHasBarTyping*/ false,
                /*enabledTypeAquisition*/ true,
            );
            host.runPendingInstalls();
            verifyTypeAcquisition(/*enable*/ false);
            verifyTypeAcquisition(/*enable*/ true);
            baselineTsserverLogs("typeAquisition", scenario("midway changes to typeAquisition when typing installer installs typing", testType), session);
        });

        it(scenario("receives update of typings after project changes", testType), () => {
            const { session, verifyTypeAcquisition, verifyPendingInstalls } = setup(
                testType,
                /*hostHasBarTyping*/ false,
                /*enabledTypeAquisition*/ true,
            );
            verifyTypeAcquisition(/*enable*/ false);
            verifyPendingInstalls();
            verifyTypeAcquisition(/*enable*/ true);
            baselineTsserverLogs("typeAquisition", scenario("receives update of typings after project changes", testType), session);
        });

        it(scenario("change after enabling typeAquisition", testType), () => {
            const { session, verifyTypeAcquisition, verifyPendingInstalls } = setup(
                testType,
                /*hostHasBarTyping*/ true,
                /*enabledTypeAquisition*/ false,
            );
            verifyTypeAcquisition(/*enable*/ true);
            verifyPendingInstalls();
            baselineTsserverLogs("typeAquisition", scenario("change after enabling typeAquisition", testType), session);
        });

        it(scenario("enabled typeAquisition", testType), () => {
            const { session, verifyPendingInstalls } = setup(
                testType,
                /*hostHasBarTyping*/ false,
                /*enabledTypeAquisition*/ true,
            );
            verifyPendingInstalls();
            baselineTsserverLogs("typeAquisition", scenario("enabled typeAquisition", testType), session);
        });

        it(scenario("disabled typeAquisition", testType), () => {
            const { session, verifyPendingInstalls } = setup(
                testType,
                /*hostHasBarTyping*/ false,
                /*enabledTypeAquisition*/ false,
            );
            verifyPendingInstalls();
            baselineTsserverLogs("typeAquisition", scenario("disabled typeAquisition", testType), session);
        });
    });

    function scenario(name: string, testType: TestType) {
        return `${name}${testType}`;
    }

    function setup(
        testType: TestType,
        hostHasBarTyping: boolean,
        enabledTypeAquisition: boolean,
    ) {
        const host = TestServerHost.createServerHost({
            "/users/user/projects/project1/app.js": `var x = require('bar');`,
            [
                testType !== TestType.ProjectWithSharedResolution ?
                    "/users/user/projects/project1/node_modules/bar/index.js" :
                    "/users/user/projects/node_modules/bar/index.js"
            ]: "export const x = 1",
            ...(
                testType ?
                    {
                        "/users/user/projects/project2/app.js": `var x = require('bar');`,
                        "/users/user/projects/project2/app2.js": `var x = require('foo');`,
                        "/users/user/projects/project2/jsconfig.json": config(/*enabledTypeAquisition*/ true),
                        "/users/user/projects/project3/app.js": `var x = require('bar');`,
                        "/users/user/projects/project3/app2.js": `var x = require('foo');`,
                        "/users/user/projects/project3/jsconfig.json": config(/*enabledTypeAquisition*/ false),
                        [getPathForTypeScriptTypingInstallerCacheTest("/node_modules/@types/foo/index.d.ts")]: "export const foo = 1;",
                    } :
                    {}
            ),
            ...(
                testType === TestType.MultiProject ?
                    {
                        "/users/user/projects/project2/node_modules/bar/index.js": "export const x = 1",
                        "/users/user/projects/project3/node_modules/bar/index.js": "export const x = 1",
                    } :
                    {}
            ),
        }, { typingsInstallerTypesRegistry: testType ? ["bar", "foo"] : "bar" });
        typeAcquisition(enabledTypeAquisition);
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
        openFilesForSession([
            "/users/user/projects/project1/app.js",
            ...(
                testType ?
                    [
                        "/users/user/projects/project2/app.js",
                        "/users/user/projects/project3/app.js",
                    ] :
                    emptyArray
            ),
        ], session);
        return { host, session, verifyTypeAcquisition, verifyPendingInstalls };

        function typeAcquisition(enable: boolean) {
            host.writeFile("/users/user/projects/project1/jsconfig.json", config(enable));
        }

        function config(enabledTypeAquisition: boolean) {
            return jsonToReadableText({
                compilerOptions: {
                    allowJs: true,
                    traceResolution: true,
                },
                typeAcquisition: enabledTypeAquisition ? undefined : { enable: false },
            });
        }

        function verifyTypeAcquisition(enable: boolean) {
            typeAcquisition(enable);
            timeouts();
        }

        function verifyPendingInstalls() {
            host.runPendingInstalls();
            timeouts();
        }

        function timeouts() {
            host.runQueuedTimeoutCallbacks();
            host.runQueuedTimeoutCallbacks();
            host.runQueuedTimeoutCallbacks();
        }
    }
});
