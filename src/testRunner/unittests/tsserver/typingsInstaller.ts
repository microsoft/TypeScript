import {
    createLoggerWithInMemoryLogs,
    replaceAll,
} from "../../../harness/tsserverLogger.js";
import * as ts from "../../_namespaces/ts.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openExternalProjectForSession,
    openFilesForSession,
    patchHostTimeouts,
    setCompilerOptionsForInferredProjectsRequestForSession,
    TestSession,
    TestSessionRequest,
    toExternalFile,
} from "../helpers/tsserver.js";
import {
    createTypesRegistry,
    customTypesMap,
    FileWithPackageName,
    loggerToTypingsInstallerLog,
} from "../helpers/typingsInstaller.js";
import {
    changeToHostTrackingWrittenFiles,
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

import validatePackageName = ts.JsTyping.validatePackageName;
import NameValidationResult = ts.JsTyping.NameValidationResult;
import { stringifyIndented } from "../../_namespaces/ts.server.js";
import { jsonToReadableText } from "../helpers.js";
import { getPathForTypeScriptTypingInstallerCacheTest } from "../helpers/contents.js";

describe("unittests:: tsserver:: typingsInstaller:: local module", () => {
    it("should not be picked up", () => {
        const f1 = {
            path: "/user/username/projects/project/app.js",
            content: "const c = require('./config');",
        };
        const f2 = {
            path: "/user/username/projects/project/config.js",
            content: "export let x = 1",
        };
        const typesConfig = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/config/index.d.ts"),
            content: "export let y: number;",
        };
        const config = {
            path: "/user/username/projects/project/jsconfig.json",
            content: jsonToReadableText({
                compilerOptions: { moduleResolution: "commonjs" },
                typeAcquisition: { enable: true },
            }),
        };
        const host = TestServerHost.createServerHost(
            [f1, f2, config, typesConfig],
            { typingsInstallerTypesRegistry: "config" },
        );
        const session = new TestSession({
            host,
            installAction: "should not be called",
        });
        openFilesForSession([f1], session);
        host.runPendingInstalls();
        baselineTsserverLogs("typingsInstaller", "local module should not be picked up", session);
    });
});

describe("unittests:: tsserver:: typingsInstaller:: General functionality", () => {
    it("configured projects (typings installed) 1", () => {
        const file1 = {
            path: "/user/username/projects/project/app.js",
            content: "",
        };
        const tsconfig = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {
                    allowJs: true,
                },
                typeAcquisition: {
                    enable: true,
                },
            }),
        };
        const packageJson = {
            path: "/user/username/projects/project/package.json",
            content: jsonToReadableText({
                name: "test",
                dependencies: {
                    jquery: "^3.1.0",
                },
            }),
        };

        const jquery = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/jquery/index.d.ts"),
            content: "declare const $: { x: number }",
        };
        const host = TestServerHost.createServerHost(
            [file1, tsconfig, packageJson],
            { typingsInstallerTypesRegistry: "jquery" },
        );
        const session = new TestSession({
            host,
            useSingleInferredProject: true,
            installAction: [jquery],
        });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { includePackageJsonAutoImports: "off" } },
        });
        openFilesForSession([file1], session);

        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typingsInstaller", "configured projects", session);
    });

    it("inferred project (typings installed)", () => {
        const file1 = {
            path: "/user/username/projects/project/app.js",
            content: "",
        };
        const packageJson = {
            path: "/user/username/projects/project/package.json",
            content: jsonToReadableText({
                name: "test",
                dependencies: {
                    jquery: "^3.1.0",
                },
            }),
        };

        const jquery = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/jquery/index.d.ts"),
            content: "declare const $: { x: number }",
        };
        const host = TestServerHost.createServerHost(
            [file1, packageJson],
            { typingsInstallerTypesRegistry: "jquery" },
        );
        const session = new TestSession({
            host,
            useSingleInferredProject: true,
            installAction: [jquery],
        });
        openFilesForSession([file1], session);

        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();

        baselineTsserverLogs("typingsInstaller", "inferred projects", session);
    });

    it("inferred project - type acquisition with disableFilenameBasedTypeAcquisition:true", () => {
        // Tests:
        // Exclude file with disableFilenameBasedTypeAcquisition:true
        const jqueryJs = {
            path: "/user/username/projects/project/jquery.js",
            content: "",
        };

        const host = TestServerHost.createServerHost(
            [jqueryJs],
            { typingsInstallerTypesRegistry: "jquery" },
        );
        const session = new TestSession({
            host,
            installAction: true,
        });
        setCompilerOptionsForInferredProjectsRequestForSession({
            allowJs: true,
            enable: true,
            disableFilenameBasedTypeAcquisition: true,
        }, session);
        openFilesForSession([jqueryJs], session);

        host.runPendingInstalls();
        // files should not be removed from project if ATA is skipped

        baselineTsserverLogs("typingsInstaller", "inferred projects with disableFilenameBasedTypeAcquisition", session);
    });

    it("external project - no type acquisition, no .d.ts/js files", () => {
        const file1 = {
            path: "/user/username/projects/project/app.ts",
            content: "",
        };
        const host = TestServerHost.createServerHost([file1]);

        const projectFileName = "/user/username/projects/app/test.csproj";
        const session = new TestSession(host);
        openExternalProjectForSession({
            projectFileName,
            options: {},
            rootFiles: [toExternalFile(file1.path)],
        }, session);
        // by default auto discovery will kick in if project contain only .js/.d.ts files
        // in this case project contain only ts files - no auto discovery
        baselineTsserverLogs("typingsInstaller", "external projects", session);
    });

    it("external project - deduplicate from local @types packages", () => {
        const appJs = {
            path: "/home/src/projects/project/a/b/app.js",
            content: "",
        };
        const nodeDts = {
            path: "/home/src/projects/project/node_modules/@types/node/index.d.ts",
            content: "declare var node;",
        };
        const host = TestServerHost.createServerHost(
            [appJs, nodeDts],
            { typingsInstallerTypesRegistry: "node" },
        );
        const projectFileName = "/home/src/projects/project/a/app/test.csproj";
        const session = new TestSession({
            host,
            installAction: "nothing should get installed",
        });
        openExternalProjectForSession({
            projectFileName,
            options: {},
            rootFiles: [toExternalFile(appJs.path)],
            typeAcquisition: { enable: true, include: ["node"] },
        }, session);
        baselineTsserverLogs("typingsInstaller", "external projects duplicate package", session);
    });

    it("external project - no auto in typing acquisition, no .d.ts/js files", () => {
        const file1 = {
            path: "/user/username/projects/project/app.ts",
            content: "",
        };
        const host = TestServerHost.createServerHost(
            [file1],
            { typingsInstallerTypesRegistry: "jquery" },
        );
        const projectFileName = "/user/username/projects/app/test.csproj";
        const session = new TestSession(host);
        openExternalProjectForSession({
            projectFileName,
            options: {},
            rootFiles: [toExternalFile(file1.path)],
            typeAcquisition: { include: ["jquery"] },
        }, session);
        // by default auto discovery will kick in if project contain only .js/.d.ts files
        // in this case project contain only ts files - no auto discovery even if type acquisition is set
        baselineTsserverLogs("typingsInstaller", "external projects no auto typings", session);
    });

    it("external project - autoDiscovery = true, no .d.ts/js files", () => {
        const file1 = {
            path: "/user/username/projects/project/app.ts",
            content: "",
        };
        const jquery = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/jquery/index.d.ts"),
            content: "declare const $: { x: number }",
        };
        const host = TestServerHost.createServerHost(
            [file1],
            { typingsInstallerTypesRegistry: "jquery" },
        );
        const projectFileName = "/user/username/projects/app/test.csproj";
        const session = new TestSession({
            host,
            installAction: [jquery],
        });
        openExternalProjectForSession({
            projectFileName,
            options: {},
            rootFiles: [toExternalFile(file1.path)],
            typeAcquisition: { enable: true, include: ["jquery"] },
        }, session);

        host.runPendingInstalls();

        // auto is set in type acquisition - use it even if project contains only .ts files

        baselineTsserverLogs("typingsInstaller", "external projects autoDiscovery", session);
    });

    it("external project - no type acquisition, with only js, jsx, d.ts files", () => {
        // Tests:
        // 1. react typings are installed for .jsx
        // 2. loose files names are matched against safe list for typings if
        //    this is a JS project (only js, jsx, d.ts files are present)
        const lodashJs = {
            path: "/user/username/projects/project/lodash.js",
            content: "",
        };
        const file2Jsx = {
            path: "/user/username/projects/project/file2.jsx",
            content: "",
        };
        const file3dts = {
            path: "/user/username/projects/project/file3.d.ts",
            content: "",
        };
        const reactDts = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/react/index.d.ts"),
            content: "declare const react: { x: number }",
        };
        const lodashDts = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/lodash/index.d.ts"),
            content: "declare const lodash: { x: number }",
        };

        const host = TestServerHost.createServerHost(
            [lodashJs, file2Jsx, file3dts, customTypesMap],
            { typingsInstallerTypesRegistry: ["lodash", "react"] },
        );
        const projectFileName = "/user/username/projects/app/test.csproj";
        const session = new TestSession({
            host,
            installAction: [lodashDts, reactDts],
        });
        openExternalProjectForSession({
            projectFileName,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
            rootFiles: [toExternalFile(lodashJs.path), toExternalFile(file2Jsx.path), toExternalFile(file3dts.path)],
            typeAcquisition: {},
        }, session);

        host.runPendingInstalls();

        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typingsInstaller", "external projects no type acquisition", session);
    });

    it("external project - type acquisition with enable: false", () => {
        // Tests:
        // Exclude
        const jqueryJs = {
            path: "/user/username/projects/project/jquery.js",
            content: "",
        };

        const host = TestServerHost.createServerHost(
            [jqueryJs],
            { typingsInstallerTypesRegistry: "jquery" },
        );
        const projectFileName = "/user/username/projects/app/test.csproj";
        const session = new TestSession({
            host,
            installAction: true,
        });
        openExternalProjectForSession({
            projectFileName,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
            rootFiles: [toExternalFile(jqueryJs.path)],
            typeAcquisition: { enable: false },
        }, session);

        baselineTsserverLogs("typingsInstaller", "external projects no type acquisition with enable false", session);
    });

    it("external project - type acquisition with disableFilenameBasedTypeAcquisition:true", () => {
        // Tests:
        // Exclude file with disableFilenameBasedTypeAcquisition:true
        const jqueryJs = {
            path: "/user/username/projects/project/jquery.js",
            content: "",
        };

        const host = TestServerHost.createServerHost(
            [jqueryJs],
            { typingsInstallerTypesRegistry: "jquery" },
        );
        const projectFileName = "/user/username/projects/app/test.csproj";
        const session = new TestSession({
            host,
            installAction: true,
        });
        openExternalProjectForSession({
            projectFileName,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
            rootFiles: [toExternalFile(jqueryJs.path)],
            typeAcquisition: { enable: true, disableFilenameBasedTypeAcquisition: true },
        }, session);

        host.runPendingInstalls();
        // files should not be removed from project if ATA is skipped
        baselineTsserverLogs("typingsInstaller", "external projects type acquisition with disableFilenameBasedTypeAcquisition", session);
    });

    it("external project - no type acquisition, with js & ts files", () => {
        // Tests:
        // 1. No typings are included for JS projects when the project contains ts files
        const jqueryJs = {
            path: "/user/username/projects/project/jquery.js",
            content: "",
        };
        const file2Ts = {
            path: "/user/username/projects/project/file2.ts",
            content: "",
        };

        const host = TestServerHost.createServerHost(
            [jqueryJs, file2Ts],
            { typingsInstallerTypesRegistry: "jquery" },
        );
        const projectFileName = "/user/username/projects/app/test.csproj";
        const session = new TestSession({
            host,
            installAction: true,
        });
        openExternalProjectForSession({
            projectFileName,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
            rootFiles: [toExternalFile(jqueryJs.path), toExternalFile(file2Ts.path)],
            typeAcquisition: {},
        }, session);

        baselineTsserverLogs("typingsInstaller", "external projects no type acquisition with js ts files", session);
    });

    it("external project - with type acquisition, with only js, d.ts files", () => {
        // Tests:
        // 1. Safelist matching, type acquisition includes/excludes and package.json typings are all acquired
        // 2. Types for safelist matches are not included when they also appear in the type acquisition exclude list
        // 3. Multiple includes and excludes are respected in type acquisition
        const lodashJs = {
            path: "/user/username/projects/project//lodash.js",
            content: "",
        };
        const commanderJs = {
            path: "/user/username/projects/project//commander.js",
            content: "",
        };
        const file3dts = {
            path: "/user/username/projects/project//file3.d.ts",
            content: "",
        };
        const packageJson = {
            path: "/user/username/projects/project//package.json",
            content: jsonToReadableText({
                name: "test",
                dependencies: {
                    express: "^3.1.0",
                },
            }),
        };

        const commander = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/commander/index.d.ts"),
            content: "declare const commander: { x: number }",
        };
        const express = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/express/index.d.ts"),
            content: "declare const express: { x: number }",
        };
        const jquery = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/jquery/index.d.ts"),
            content: "declare const jquery: { x: number }",
        };
        const moment = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/moment/index.d.ts"),
            content: "declare const moment: { x: number }",
        };

        const host = TestServerHost.createServerHost(
            [lodashJs, commanderJs, file3dts, packageJson, customTypesMap],
            { typingsInstallerTypesRegistry: ["jquery", "commander", "moment", "express"] },
        );
        const projectFileName = "/user/username/projects/app/test.csproj";
        const session = new TestSession({
            host,
            installAction: [commander, express, jquery, moment],
        });
        openExternalProjectForSession({
            projectFileName,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
            rootFiles: [toExternalFile(lodashJs.path), toExternalFile(commanderJs.path), toExternalFile(file3dts.path)],
            typeAcquisition: { enable: true, include: ["jquery", "moment"], exclude: ["lodash"] },
        }, session);

        host.runPendingInstalls();

        host.runQueuedTimeoutCallbacks();
        // Commander: Existed as a JS file
        // JQuery: Specified in 'include'
        // Moment: Specified in 'include'
        // Express: Specified in package.json
        // lodash: Excluded (not present)
        baselineTsserverLogs("typingsInstaller", "external projects type acquisition", session);
    });

    it("Throttle - delayed typings to install", () => {
        const lodashJs = {
            path: "/user/username/projects/project//lodash.js",
            content: "",
        };
        const commanderJs = {
            path: "/user/username/projects/project//commander.js",
            content: "",
        };
        const file3 = {
            path: "/user/username/projects/project//file3.d.ts",
            content: "",
        };
        const packageJson = {
            path: "/user/username/projects/project//package.json",
            content: jsonToReadableText({
                name: "test",
                dependencies: {
                    express: "^3.1.0",
                },
            }),
        };

        const commander = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/commander/index.d.ts"),
            content: "declare const commander: { x: number }",
        };
        const express = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/express/index.d.ts"),
            content: "declare const express: { x: number }",
        };
        const jquery = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/jquery/index.d.ts"),
            content: "declare const jquery: { x: number }",
        };
        const moment = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/moment/index.d.ts"),
            content: "declare const moment: { x: number }",
        };
        const lodash = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/lodash/index.d.ts"),
            content: "declare const lodash: { x: number }",
        };

        const host = TestServerHost.createServerHost(
            [lodashJs, commanderJs, file3, packageJson, customTypesMap],
            { typingsInstallerTypesRegistry: ["commander", "express", "jquery", "moment", "lodash"] },
        );
        const projectFileName = "/user/username/projects/app/test.csproj";
        const session = new TestSession({
            host,
            installAction: [commander, express, jquery, moment, lodash],
            throttleLimit: 3,
        });
        openExternalProjectForSession({
            projectFileName,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
            rootFiles: [toExternalFile(lodashJs.path), toExternalFile(commanderJs.path), toExternalFile(file3.path)],
            typeAcquisition: { include: ["jquery", "moment"] },
        }, session);

        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typingsInstaller", "throttle delayed typings to install", session);
    });

    describe("throttled testing", () => {
        function setup() {
            const lodashJs = {
                path: "/user/username/projects/project/lodash.js",
                content: "",
            };
            const commanderJs = {
                path: "/user/username/projects/project/commander.js",
                content: "",
            };
            const file3 = {
                path: "/user/username/projects/project/file3.d.ts",
                content: "",
            };

            const commander: FileWithPackageName = {
                path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/commander/index.d.ts"),
                content: "declare const commander: { x: number }",
                package: "commander",
            };
            const jquery: FileWithPackageName = {
                path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/jquery/index.d.ts"),
                content: "declare const jquery: { x: number }",
                package: "jquery",
            };
            const lodash: FileWithPackageName = {
                path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/lodash/index.d.ts"),
                content: "declare const lodash: { x: number }",
                package: "lodash",
            };
            const cordova: FileWithPackageName = {
                path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/cordova/index.d.ts"),
                content: "declare const cordova: { x: number }",
                package: "cordova",
            };
            const grunt: FileWithPackageName = {
                path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/grunt/index.d.ts"),
                content: "declare const grunt: { x: number }",
                package: "grunt",
            };
            const gulp: FileWithPackageName = {
                path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/gulp/index.d.ts"),
                content: "declare const gulp: { x: number }",
                package: "gulp",
            };

            const host = TestServerHost.createServerHost(
                [lodashJs, commanderJs, file3, customTypesMap],
                { typingsInstallerTypesRegistry: ["commander", "jquery", "lodash", "cordova", "gulp", "grunt"] },
            );
            return { lodashJs, commanderJs, file3, commander, jquery, lodash, cordova, grunt, gulp, host };
        }
        it("Throttle - delayed run install requests", () => {
            const { lodashJs, commanderJs, file3, commander, jquery, lodash, cordova, grunt, gulp, host } = setup();

            // Create project #1 with 4 typings
            const session = new TestSession({
                host,
                installAction: [commander, jquery, lodash, cordova, grunt, gulp],
                throttleLimit: 1,
            });
            const projectFileName1 = "/user/username/projects/app/test1.csproj";
            openExternalProjectForSession({
                projectFileName: projectFileName1,
                options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
                rootFiles: [toExternalFile(lodashJs.path), toExternalFile(commanderJs.path), toExternalFile(file3.path)],
                typeAcquisition: { include: ["jquery", "cordova"] },
            }, session);

            // Create project #2 with 2 typings
            const projectFileName2 = "/user/username/projects/app/test2.csproj";
            openExternalProjectForSession({
                projectFileName: projectFileName2,
                options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
                rootFiles: [toExternalFile(file3.path)],
                typeAcquisition: { include: ["grunt", "gulp"] },
            }, session);

            host.runPendingInstalls();
            host.runPendingInstalls();
            host.runQueuedTimeoutCallbacks(); // for 2 projects
            baselineTsserverLogs("typingsInstaller", "throttle delayed run install requests", session);
        });

        it("Throttle - scheduled run install requests without reaching limit", () => {
            const { lodashJs, commanderJs, file3, commander, jquery, lodash, cordova, grunt, gulp, host } = setup();

            const session = new TestSession({
                host,
                installAction: [commander, jquery, lodash, cordova, grunt, gulp],
                throttledRequests: 1,
            });
            const projectFileName1 = "/user/username/projects/app/test1.csproj";
            openExternalProjectForSession({
                projectFileName: projectFileName1,
                options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
                rootFiles: [toExternalFile(lodashJs.path), toExternalFile(commanderJs.path), toExternalFile(file3.path)],
                typeAcquisition: { include: ["jquery", "cordova"] },
            }, session);

            host.runQueuedTimeoutCallbacks(); // Send the request to worker for project1
            host.runPendingInstalls(); // Actual install for project1

            const id = host.getNextTimeoutId();
            const projectFileName2 = "/user/username/projects/project/app/test2.csproj";
            openExternalProjectForSession({
                projectFileName: projectFileName2,
                options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
                rootFiles: [toExternalFile(file3.path)],
                typeAcquisition: { include: ["grunt", "gulp"] },
            }, session);

            host.runQueuedTimeoutCallbacks(id); // Send the request to worker for project2
            host.runPendingInstalls(); // Actual install for project2
            baselineTsserverLogs("typingsInstaller", "throttle scheduled run install requests without reaching limit", session);
        });

        it("Throttle - scheduled run install requests with defer", () => {
            const { lodashJs, commanderJs, file3, commander, jquery, lodash, cordova, grunt, gulp, host } = setup();

            const session = new TestSession({
                host,
                installAction: [commander, jquery, lodash, cordova, grunt, gulp],
                throttledRequests: 1,
            });
            const projectFileName1 = "/user/username/projects/app/test1.csproj";
            openExternalProjectForSession({
                projectFileName: projectFileName1,
                options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
                rootFiles: [toExternalFile(lodashJs.path), toExternalFile(commanderJs.path), toExternalFile(file3.path)],
                typeAcquisition: { include: ["jquery", "cordova"] },
            }, session);

            // this will be deferred
            const projectFileName2 = "/user/username/projects/app/test2.csproj";
            openExternalProjectForSession({
                projectFileName: projectFileName2,
                options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
                rootFiles: [toExternalFile(file3.path)],
                typeAcquisition: { include: ["grunt", "gulp"] },
            }, session);
            const id = host.getNextTimeoutId();
            host.runQueuedTimeoutCallbacks(); // Send the request to worker for project1
            host.runPendingInstalls(); // Actual install for project1

            host.runQueuedTimeoutCallbacks(id); // Send the request to worker for project2
            host.runPendingInstalls(); // Actual install for project2
            baselineTsserverLogs("typingsInstaller", "throttle scheduled run install requests with defer", session);
        });

        it("Throttle - scheduled run install requests with defer refreshed", () => {
            const { lodashJs, commanderJs, file3, commander, jquery, lodash, cordova, grunt, gulp, host } = setup();

            const session = new TestSession({
                host,
                installAction: [commander, jquery, lodash, cordova, grunt, gulp],
                throttledRequests: 1,
            });
            const projectFileName1 = "/user/username/projects/app/test1.csproj";
            openExternalProjectForSession({
                projectFileName: projectFileName1,
                options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
                rootFiles: [toExternalFile(commanderJs.path), toExternalFile(file3.path)],
                typeAcquisition: { include: ["jquery", "cordova"] },
            }, session);

            // Create project #2 with 2 typings - this will be deferred
            const projectFileName2 = "/user/username/projects/project/app/test2.csproj";
            openExternalProjectForSession({
                projectFileName: projectFileName2,
                options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
                rootFiles: [toExternalFile(file3.path)],
                typeAcquisition: { include: ["grunt", "gulp"] },
            }, session);
            // Update project for 3 typings and this should be used instead of first one
            openExternalProjectForSession({
                projectFileName: projectFileName2,
                options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
                rootFiles: [toExternalFile(lodashJs.path), toExternalFile(file3.path)],
                typeAcquisition: { include: ["grunt", "gulp"] },
            }, session);
            const id = host.getNextTimeoutId();
            host.runQueuedTimeoutCallbacks(); // Send the request to worker for project1
            host.runPendingInstalls(); // Actual install for project1

            host.runQueuedTimeoutCallbacks(id); // Send the request to worker for project2
            host.runPendingInstalls(); // Actual install for project2
            baselineTsserverLogs("typingsInstaller", "throttle scheduled run install requests with defer refreshed", session);
        });

        it("Throttle - scheduled run install requests with defer while queuing again", () => {
            const { lodashJs, commanderJs, file3, commander, jquery, lodash, cordova, grunt, gulp, host } = setup();

            const session = new TestSession({
                host,
                installAction: [commander, jquery, lodash, cordova, grunt, gulp],
                throttledRequests: 1,
            });
            const projectFileName1 = "/user/username/projects/app/test1.csproj";
            openExternalProjectForSession({
                projectFileName: projectFileName1,
                options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
                rootFiles: [toExternalFile(commanderJs.path), toExternalFile(file3.path)],
                typeAcquisition: { include: ["jquery"] },
            }, session);

            const projectFileName2 = "/user/username/projects/app/test2.csproj";
            openExternalProjectForSession({
                projectFileName: projectFileName2,
                options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
                rootFiles: [toExternalFile(file3.path)],
                typeAcquisition: { include: ["grunt", "gulp"] },
            }, session);

            const projectFileName3 = "/user/username/projects/app/test3.csproj";
            openExternalProjectForSession({
                projectFileName: projectFileName3,
                options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.Node10 },
                rootFiles: [toExternalFile(lodashJs.path), toExternalFile(file3.path)],
                typeAcquisition: { include: ["cordova"] },
            }, session);
            const id = host.getNextTimeoutId();
            host.runQueuedTimeoutCallbacks(); // Send the request to worker for project1
            host.runPendingInstalls(); // Actual install for project1

            const id2 = host.getNextTimeoutId();
            host.runQueuedTimeoutCallbacks(id); // Send the request to worker for project2
            host.runPendingInstalls(); // Actual install for project2

            host.runQueuedTimeoutCallbacks(id2); // Send the request to worker for project3
            host.runPendingInstalls(); // Actual install for project3

            baselineTsserverLogs("typingsInstaller", "throttle scheduled run install requests with defer while queuing again", session);
        });
    });

    it("configured scoped name projects discover from node_modules", () => {
        const app = {
            path: "/user/username/projects/project/app.js",
            content: "",
        };
        const pkgJson = {
            path: "/user/username/projects/project/package.json",
            content: jsonToReadableText({
                dependencies: {
                    "@zkat/cacache": "1.0.0",
                },
            }),
        };
        const jsconfig = {
            path: "/user/username/projects/project/jsconfig.json",
            content: jsonToReadableText({}),
        };
        // Should only accept direct dependencies.
        const commander = {
            path: "/user/username/projects/project/node_modules/commander/index.js",
            content: "",
        };
        const commanderPackage = {
            path: "/user/username/projects/project/node_modules/commander/package.json",
            content: jsonToReadableText({
                name: "commander",
            }),
        };
        const cacache = {
            path: "/user/username/projects/project/node_modules/@zkat/cacache/index.js",
            content: "",
        };
        const cacachePackage = {
            path: "/user/username/projects/project/node_modules/@zkat/cacache/package.json",
            content: jsonToReadableText({ name: "@zkat/cacache" }),
        };
        const cacacheDTS = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/zkat__cacache/index.d.ts"),
            content: "",
        };
        const host = TestServerHost.createServerHost(
            [app, jsconfig, pkgJson, commander, commanderPackage, cacache, cacachePackage],
            { typingsInstallerTypesRegistry: ["zkat__cacache", "nested", "commander"] },
        );
        const session = new TestSession({
            host,
            useSingleInferredProject: true,
            installAction: [cacacheDTS],
        });
        openFilesForSession([app], session);

        host.runPendingInstalls();

        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typingsInstaller", "scoped name discovery", session);
    });

    function testConfiguredProjectNodeModules(
        subScenario: string,
        { jsconfigContent, appJsContent }: {
            jsconfigContent?: object;
            appJsContent?: string;
        } = {},
    ) {
        it(subScenario, () => {
            const app = {
                path: "/user/username/projects/project/app.js",
                content: appJsContent || "",
            };
            const pkgJson = {
                path: "/user/username/projects/project/package.json",
                content: jsonToReadableText({
                    dependencies: {
                        jquery: "1.0.0",
                    },
                }),
            };
            const jsconfig = {
                path: "/user/username/projects/project/jsconfig.json",
                content: jsonToReadableText(jsconfigContent || {}),
            };
            // Should only accept direct dependencies.
            const commander = {
                path: "/user/username/projects/project/node_modules/commander/index.js",
                content: "",
            };
            const commanderPackage = {
                path: "/user/username/projects/project/node_modules/commander/package.json",
                content: jsonToReadableText({
                    name: "commander",
                }),
            };
            const jquery = {
                path: "/user/username/projects/project/node_modules/jquery/index.js",
                content: "",
            };
            const jqueryPackage = {
                path: "/user/username/projects/project/node_modules/jquery/package.json",
                content: jsonToReadableText({ name: "jquery" }),
            };
            // Should not search deeply in node_modules.
            const nestedPackage = {
                path: "/user/username/projects/project/node_modules/jquery/nested/package.json",
                content: jsonToReadableText({ name: "nested" }),
            };
            const jqueryDTS = {
                path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/jquery/index.d.ts"),
                content: "",
            };
            const host = TestServerHost.createServerHost(
                [app, jsconfig, pkgJson, commander, commanderPackage, jquery, jqueryPackage, nestedPackage],
                { typingsInstallerTypesRegistry: ["jquery", "nested", "commander"] },
            );
            const session = new TestSession({
                host,
                useSingleInferredProject: true,
                installAction: [jqueryDTS],
            });
            openFilesForSession([app], session);

            host.runPendingInstalls();
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("typingsInstaller", subScenario, session);
        });
    }

    testConfiguredProjectNodeModules("discover from node_modules", {});

    // Explicit types prevent automatic inclusion from package.json listing
    testConfiguredProjectNodeModules("discover from node_modules empty types", {
        jsconfigContent: { compilerOptions: { types: [] } },
    });

    // A type reference directive will not resolve to the global typings cache
    testConfiguredProjectNodeModules("discover from node_modules explicit types", {
        jsconfigContent: { compilerOptions: { types: ["jquery"] } },
    });

    // However, explicit types will not prevent unresolved imports from pulling in typings
    testConfiguredProjectNodeModules("discover from node_modules empty types has import", {
        jsconfigContent: { compilerOptions: { types: [] } },
        appJsContent: `import "jquery";`,
    });

    it("configured projects discover from bower_components", () => {
        const app = {
            path: "/user/username/projects/project/app.js",
            content: "",
        };
        const jsconfig = {
            path: "/user/username/projects/project/jsconfig.json",
            content: jsonToReadableText({}),
        };
        const jquery = {
            path: "/user/username/projects/project/bower_components/jquery/index.js",
            content: "",
        };
        const jqueryPackage = {
            path: "/user/username/projects/project/bower_components/jquery/bower.json",
            content: jsonToReadableText({ name: "jquery" }),
        };
        const jqueryDTS = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/jquery/index.d.ts"),
            content: "",
        };
        const host = TestServerHost.createServerHost(
            [app, jsconfig, jquery, jqueryPackage],
            { typingsInstallerTypesRegistry: "jquery" },
        );
        const session = new TestSession({
            host,
            useSingleInferredProject: true,
            installAction: [jqueryDTS],
        });
        openFilesForSession([app], session);

        host.runPendingInstalls();

        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typingsInstaller", "configured projects discover from bower_components", session);
    });

    it("configured projects discover from bower.json", () => {
        const app = {
            path: "/user/username/projects/project/app.js",
            content: "",
        };
        const jsconfig = {
            path: "/user/username/projects/project/jsconfig.json",
            content: jsonToReadableText({}),
        };
        const bowerJson = {
            path: "/user/username/projects/project/bower.json",
            content: jsonToReadableText({
                dependencies: {
                    jquery: "^3.1.0",
                },
            }),
        };
        const jqueryDTS = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/jquery/index.d.ts"),
            content: "",
        };
        const host = TestServerHost.createServerHost(
            [app, jsconfig, bowerJson],
            { typingsInstallerTypesRegistry: "jquery" },
        );
        const session = new TestSession({
            host,
            useSingleInferredProject: true,
            installAction: [jqueryDTS],
        });
        openFilesForSession([app], session);

        host.runPendingInstalls();

        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typingsInstaller", "discover from bower", session);
    });

    it("Malformed package.json should be watched", () => {
        const f = {
            path: "/home/src/projects/project/app.js",
            content: "var x = 1",
        };
        const brokenPackageJson = {
            path: "/home/src/projects/project/package.json",
            content: `{ "dependencies": { "co } }`,
        };
        const fixedPackageJson = {
            path: brokenPackageJson.path,
            content: `{ "dependencies": { "commander": "0.0.2" } }`,
        };
        const commander = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/commander/index.d.ts"),
            content: "export let x: number",
        };
        const host = TestServerHost.createServerHost(
            [f, brokenPackageJson],
            { typingsInstallerTypesRegistry: "commander" },
        );
        const session = new TestSession({
            host,
            installAction: [commander],
        });
        openFilesForSession([f], session);

        host.writeFile(fixedPackageJson.path, fixedPackageJson.content);
        // expected install request
        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typingsInstaller", "malformed packagejson", session);
    });

    it("should install typings for unresolved imports", () => {
        const file = {
            path: "/home/src/projects/project/app.js",
            content: `
                import * as fs from "fs";
                import * as commander from "commander";
                import * as component from "@ember/component";`,
        };
        const node = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/node/index.d.ts"),
            content: "export let x: number",
        };
        const commander = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/commander/index.d.ts"),
            content: "export let y: string",
        };
        const emberComponentDirectory = "ember__component";
        const emberComponent = {
            path: getPathForTypeScriptTypingInstallerCacheTest(`node_modules/@types/${emberComponentDirectory}/index.d.ts`),
            content: "export let x: number",
        };
        const host = TestServerHost.createServerHost(
            [file],
            { typingsInstallerTypesRegistry: ["node", "commander"] },
        );
        const session = new TestSession({
            host,
            installAction: [node, commander, emberComponent],
        });
        openFilesForSession([file], session);

        host.runPendingInstalls();

        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typingsInstaller", "install typings for unresolved imports", session);
    });

    it("should redo resolution that resolved to '.js' file after typings are installed", () => {
        const file: File = {
            path: `/user/username/projects/a/b/app.js`,
            content: `
                import * as commander from "commander";`,
        };
        const commanderJS: File = {
            path: `/user/username/projects/node_modules/commander/index.js`,
            content: "module.exports = 0",
        };

        const host = TestServerHost.createServerHost(
            [file, commanderJS],
            { typingsInstallerTypesRegistry: "commander" },
        );
        const session = new TestSession({
            host,
            installAction: [{
                path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/commander/index.d.ts"),
                content: "",
            }],
        });
        openFilesForSession([file], session);

        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typingsInstaller", "redo resolutions pointing to js on typing install", session);
    });

    it("should pick typing names from non-relative unresolved imports", () => {
        const f1 = {
            path: "/home/src/projects/project/app.js",
            content: `
                import * as a from "foo/a/a";
                import * as b from "foo/a/b";
                import * as c from "foo/a/c";
                import * as d from "@bar/router/";
                import * as e from "@bar/common/shared";
                import * as e from "@bar/common/apps";
                import * as f from "./lib"
                `,
        };

        const host = TestServerHost.createServerHost(
            [f1],
            { typingsInstallerTypesRegistry: "foo" },
        );
        const session = new TestSession({
            host,
            installAction: true,
        });
        openFilesForSession([f1], session);

        const proj = session.getProjectService().inferredProjects[0];
        proj.updateGraph();

        assert.deepEqual(
            proj.cachedUnresolvedImportsPerFile.get(f1.path as ts.Path),
            ["foo", "foo", "foo", "@bar/router", "@bar/common", "@bar/common"],
        );

        host.runPendingInstalls();
        baselineTsserverLogs("typingsInstaller", "pick typing names from nonrelative unresolved imports", session);
    });

    it("cached unresolved typings are not recomputed if program structure did not change", () => {
        const host = TestServerHost.createServerHost([]);
        const session = new TestSession(host);
        const f = {
            path: "/home/src/projects/project/app.js",
            content: `
                import * as fs from "fs";
                import * as cmd from "commander
                `,
        };
        const openRequest: TestSessionRequest<ts.server.protocol.OpenRequest> = {
            command: ts.server.protocol.CommandTypes.Open,
            arguments: {
                file: f.path,
                fileContent: f.content,
            },
        };
        session.executeCommandSeq(openRequest);
        const proj = session.getProjectService().inferredProjects[0];
        const version1 = proj.lastCachedUnresolvedImportsList;

        // make a change that should not affect the structure of the program
        const changeRequest: TestSessionRequest<ts.server.protocol.ChangeRequest> = {
            command: ts.server.protocol.CommandTypes.Change,
            arguments: {
                file: f.path,
                insertString: "\nlet x = 1;",
                line: 2,
                offset: 0,
                endLine: 2,
                endOffset: 0,
            },
        };
        session.executeCommandSeq(changeRequest);
        proj.updateGraph();
        const version2 = proj.lastCachedUnresolvedImportsList;
        assert.strictEqual(version1, version2, "set of unresolved imports should change");
        baselineTsserverLogs("typingsInstaller", "cached unresolved typings are not recomputed if program structure did not change", session);
    });

    it("multiple projects", () => {
        const file1 = {
            path: "/user/username/projects/project/app.js",
            content: "",
        };
        const tsconfig = {
            path: "/user/username/projects/project/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {
                    allowJs: true,
                },
                typeAcquisition: {
                    enable: true,
                },
            }),
        };
        const packageJson = {
            path: "/user/username/projects/project/package.json",
            content: jsonToReadableText({
                name: "test",
                dependencies: {
                    jquery: "^3.1.0",
                },
            }),
        };
        const file2 = {
            path: "/user/username/projects/project2/app.js",
            content: "",
        };
        const tsconfig2 = {
            path: "/user/username/projects/project2/tsconfig.json",
            content: jsonToReadableText({
                compilerOptions: {
                    allowJs: true,
                },
                typeAcquisition: {
                    enable: true,
                },
            }),
        };
        const packageJson2 = {
            path: "/user/username/projects/project2/package.json",
            content: jsonToReadableText({
                name: "test",
                dependencies: {
                    commander: "^3.1.0",
                },
            }),
        };

        const jquery: FileWithPackageName = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/jquery/index.d.ts"),
            content: "declare const $: { x: number }",
            package: "jquery",
        };
        const commander: FileWithPackageName = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/commander/index.d.ts"),
            content: "export let x: number",
            package: "commander",
        };
        const host = TestServerHost.createServerHost(
            [file1, tsconfig, packageJson, file2, tsconfig2, packageJson2],
            { typingsInstallerTypesRegistry: ["jquery", "commander"] },
        );
        const session = new TestSession({
            host,
            useSingleInferredProject: true,
            installAction: [commander, jquery],
        });
        // projectService.setHostConfiguration({ preferences: { includePackageJsonAutoImports: "off" } });
        openFilesForSession([file1], session);

        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();
        closeFilesForSession([file1], session);
        openFilesForSession([file2], session);
        baselineTsserverLogs("typingsInstaller", "multiple projects", session);
    });

    it("expired cache entry (inferred project, should install typings)", () => {
        const file1 = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const packageJson = {
            path: "/home/src/projects/project/package.json",
            content: jsonToReadableText({
                name: "test",
                dependencies: {
                    jquery: "^3.1.0",
                },
            }),
        };
        const jquery = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/jquery/index.d.ts"),
            content: "declare const $: { x: number }",
        };
        const cacheConfig = {
            path: getPathForTypeScriptTypingInstallerCacheTest("package.json"),
            content: jsonToReadableText({
                dependencies: {
                    "types-registry": "^0.1.317",
                },
                devDependencies: {
                    "@types/jquery": "^1.0.0",
                },
            }),
        };
        const cacheLockConfig = {
            path: getPathForTypeScriptTypingInstallerCacheTest("package-lock.json"),
            content: jsonToReadableText({
                dependencies: {
                    "@types/jquery": {
                        version: "1.0.0",
                    },
                },
            }),
        };
        const host = TestServerHost.createServerHost(
            [file1, packageJson, jquery, cacheConfig, cacheLockConfig],
            { typingsInstallerTypesRegistry: "jquery" },
        );
        const session = new TestSession({
            host,
            useSingleInferredProject: true,
            installAction: [jquery],
        });
        openFilesForSession([file1], session);
        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typingsInstaller", "expired cache entry", session);
    });

    it("non-expired cache entry (inferred project, should not install typings)", () => {
        const file1 = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const packageJson = {
            path: "/home/src/projects/project/package.json",
            content: jsonToReadableText({
                name: "test",
                dependencies: {
                    jquery: "^3.1.0",
                },
            }),
        };
        const cacheConfig = {
            path: getPathForTypeScriptTypingInstallerCacheTest("package.json"),
            content: jsonToReadableText({
                dependencies: {
                    "types-registry": "^0.1.317",
                },
                devDependencies: {
                    "@types/jquery": "^1.3.0",
                },
            }),
        };
        const cacheLockConfig = {
            path: getPathForTypeScriptTypingInstallerCacheTest("package-lock.json"),
            content: jsonToReadableText({
                dependencies: {
                    "@types/jquery": {
                        version: "1.3.0",
                    },
                },
            }),
        };
        const jquery = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/jquery/index.d.ts"),
            content: "declare const $: { x: number }",
        };
        const host = TestServerHost.createServerHost(
            [file1, packageJson, cacheConfig, cacheLockConfig, jquery],
            { typingsInstallerTypesRegistry: "jquery" },
        );
        const session = new TestSession({
            host,
            useSingleInferredProject: true,
            installAction: true,
        });
        openFilesForSession([file1], session);
        host.runPendingInstalls();
        baselineTsserverLogs("typingsInstaller", "non expired cache entry", session);
    });
});

describe("unittests:: tsserver:: typingsInstaller:: Validate package name:", () => {
    it("name cannot be too long", () => {
        let packageName = "a";
        for (let i = 0; i < 8; i++) {
            packageName += packageName;
        }
        assert.equal(validatePackageName(packageName), NameValidationResult.NameTooLong);
    });
    it("package name cannot start with dot", () => {
        assert.equal(validatePackageName(".foo"), NameValidationResult.NameStartsWithDot);
    });
    it("package name cannot start with underscore", () => {
        assert.equal(validatePackageName("_foo"), NameValidationResult.NameStartsWithUnderscore);
    });
    it("package non URI safe characters are not supported", () => {
        assert.equal(validatePackageName("  scope  "), NameValidationResult.NameContainsNonURISafeCharacters);
        assert.equal(validatePackageName("; say ‘Hello from TypeScript!’ #"), NameValidationResult.NameContainsNonURISafeCharacters);
        assert.equal(validatePackageName("a/b/c"), NameValidationResult.NameContainsNonURISafeCharacters);
    });
    it("scoped package name is supported", () => {
        assert.equal(validatePackageName("@scope/bar"), NameValidationResult.Ok);
    });
    it("scoped name in scoped package name cannot start with dot", () => {
        assert.deepEqual(validatePackageName("@.scope/bar"), { name: ".scope", isScopeName: true, result: NameValidationResult.NameStartsWithDot });
        assert.deepEqual(validatePackageName("@.scope/.bar"), { name: ".scope", isScopeName: true, result: NameValidationResult.NameStartsWithDot });
    });
    it("scope name in scoped package name cannot start with underscore", () => {
        assert.deepEqual(validatePackageName("@_scope/bar"), { name: "_scope", isScopeName: true, result: NameValidationResult.NameStartsWithUnderscore });
        assert.deepEqual(validatePackageName("@_scope/_bar"), { name: "_scope", isScopeName: true, result: NameValidationResult.NameStartsWithUnderscore });
    });
    it("scope name in scoped package name with non URI safe characters are not supported", () => {
        assert.deepEqual(validatePackageName("@  scope  /bar"), { name: "  scope  ", isScopeName: true, result: NameValidationResult.NameContainsNonURISafeCharacters });
        assert.deepEqual(validatePackageName("@; say ‘Hello from TypeScript!’ #/bar"), { name: "; say ‘Hello from TypeScript!’ #", isScopeName: true, result: NameValidationResult.NameContainsNonURISafeCharacters });
        assert.deepEqual(validatePackageName("@  scope  /  bar  "), { name: "  scope  ", isScopeName: true, result: NameValidationResult.NameContainsNonURISafeCharacters });
    });
    it("package name in scoped package name cannot start with dot", () => {
        assert.deepEqual(validatePackageName("@scope/.bar"), { name: ".bar", isScopeName: false, result: NameValidationResult.NameStartsWithDot });
    });
    it("package name in scoped package name cannot start with underscore", () => {
        assert.deepEqual(validatePackageName("@scope/_bar"), { name: "_bar", isScopeName: false, result: NameValidationResult.NameStartsWithUnderscore });
    });
    it("package name in scoped package name with non URI safe characters are not supported", () => {
        assert.deepEqual(validatePackageName("@scope/  bar  "), { name: "  bar  ", isScopeName: false, result: NameValidationResult.NameContainsNonURISafeCharacters });
        assert.deepEqual(validatePackageName("@scope/; say ‘Hello from TypeScript!’ #"), { name: "; say ‘Hello from TypeScript!’ #", isScopeName: false, result: NameValidationResult.NameContainsNonURISafeCharacters });
    });
});

describe("unittests:: tsserver:: typingsInstaller:: Invalid package names", () => {
    it("should not be installed", () => {
        const f1 = {
            path: "/home/src/projects/project/app.js",
            content: "let x = 1",
        };
        const packageJson = {
            path: "/home/src/projects/project/package.json",
            content: jsonToReadableText({
                dependencies: {
                    "; say ‘Hello from TypeScript!’ #": "0.0.x",
                },
            }),
        };
        const host = TestServerHost.createServerHost([f1, packageJson]);
        const session = new TestSession({
            host,
            installAction: "installWorker should not be invoked",
        });
        openFilesForSession([f1], session);
        baselineTsserverLogs("typingsInstaller", "should not initialize invaalid package names", session);
    });
});

describe("unittests:: tsserver:: typingsInstaller:: discover typings", () => {
    const emptySafeList = ts.emptyMap;
    it("should use mappings from safe list", () => {
        const app = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const jquery = {
            path: "/home/src/projects/project/jquery.js",
            content: "",
        };
        const chroma = {
            path: "/home/src/projects/project/chroma.min.js",
            content: "",
        };

        const safeList = new Map(Object.entries({ jquery: "jquery", chroma: "chroma-js" }));

        const { discoverTypings, baseline } = setup([app, jquery, chroma]);
        discoverTypings(
            [app.path, jquery.path, chroma.path],
            ts.getDirectoryPath(app.path as ts.Path),
            safeList,
            ts.emptyMap,
            { enable: true },
            ts.emptyArray,
            ts.emptyMap,
            ts.emptyOptions,
        );
        baseline("should use mappings from safe list");
    });

    it("should return node for core modules", () => {
        const f = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const { discoverTypings, baseline } = setup([f]);
        const cache = new Map<string, ts.JsTyping.CachedTyping>();

        for (const name of ts.nodeCoreModules) {
            discoverTypings(
                [f.path],
                ts.getDirectoryPath(f.path as ts.Path),
                emptySafeList,
                cache,
                { enable: true },
                [name, "somename"],
                ts.emptyMap,
                ts.emptyOptions,
            );
        }
        baseline("should return node for core modules");
    });

    it("should use cached locations", () => {
        const f = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const node = {
            path: "/home/src/projects/project/node.d.ts",
            content: "",
        };
        const { discoverTypings, baseline } = setup([f, node]);
        const cache = new Map(Object.entries<ts.JsTyping.CachedTyping>({ node: { typingLocation: node.path, version: new ts.Version("1.3.0") } }));
        const registry = createTypesRegistry("node");
        discoverTypings([f.path], ts.getDirectoryPath(f.path as ts.Path), emptySafeList, cache, { enable: true }, ["fs", "bar"], registry, ts.emptyOptions);
        baseline("should use cached locations");
    });

    it("should gracefully handle packages that have been removed from the types-registry", () => {
        const f = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const node = {
            path: "/home/src/projects/project/node.d.ts",
            content: "",
        };
        const { discoverTypings, baseline } = setup([f, node]);
        const cache = new Map(Object.entries<ts.JsTyping.CachedTyping>({ node: { typingLocation: node.path, version: new ts.Version("1.3.0") } }));
        discoverTypings(
            [f.path],
            ts.getDirectoryPath(f.path as ts.Path),
            emptySafeList,
            cache,
            { enable: true },
            ["fs", "bar"],
            ts.emptyMap,
            ts.emptyOptions,
        );
        baseline("should gracefully handle packages that have been removed from the types-registry");
    });

    it("should search only 2 levels deep", () => {
        const app = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const a = {
            path: "/home/src/projects/project/node_modules/a/package.json",
            content: jsonToReadableText({ name: "a" }),
        };
        const b = {
            path: "/home/src/projects/project/node_modules/a/b/package.json",
            content: jsonToReadableText({ name: "b" }),
        };
        const { discoverTypings, baseline } = setup([app, a, b]);
        const cache = new Map<string, ts.JsTyping.CachedTyping>();
        discoverTypings(
            [app.path],
            ts.getDirectoryPath(app.path as ts.Path),
            emptySafeList,
            cache,
            { enable: true },
            /*unresolvedImports*/ [],
            ts.emptyMap,
            ts.emptyOptions,
        );
        baseline("should search only 2 levels deep");
    });

    it("should support scoped packages", () => {
        const app = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const a = {
            path: "/home/src/projects/project/node_modules/@a/b/package.json",
            content: jsonToReadableText({ name: "@a/b" }),
        };
        const { discoverTypings, baseline } = setup([app, a]);
        const cache = new Map<string, ts.JsTyping.CachedTyping>();
        discoverTypings(
            [app.path],
            ts.getDirectoryPath(app.path as ts.Path),
            emptySafeList,
            cache,
            { enable: true },
            /*unresolvedImports*/ [],
            ts.emptyMap,
            ts.emptyOptions,
        );
        baseline("should support scoped packages");
    });
    it("should install expired typings", () => {
        const app = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const commander = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/commander/index.d.ts"),
            content: "export let x: number",
        };
        const node = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/node/index.d.ts"),
            content: "export let y: number",
        };
        const { discoverTypings, baseline } = setup([app]);
        const cache = new Map(Object.entries<ts.JsTyping.CachedTyping>({
            node: { typingLocation: node.path, version: new ts.Version("1.3.0") },
            commander: { typingLocation: commander.path, version: new ts.Version("1.0.0") },
        }));
        const registry = createTypesRegistry("node", "commander");
        discoverTypings(
            [app.path],
            ts.getDirectoryPath(app.path as ts.Path),
            emptySafeList,
            cache,
            { enable: true },
            ["http", "commander"],
            registry,
            ts.emptyOptions,
        );
        baseline("should install expired typings");
    });

    it("should install expired typings with prerelease version of tsserver", () => {
        const app = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const node = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/node/index.d.ts"),
            content: "export let y: number",
        };
        const { discoverTypings, baseline } = setup([app]);
        const cache = new Map(Object.entries<ts.JsTyping.CachedTyping>({
            node: { typingLocation: node.path, version: new ts.Version("1.0.0") },
        }));
        const registry = createTypesRegistry("node");
        registry.delete(`ts${ts.versionMajorMinor}`);
        discoverTypings(
            [app.path],
            ts.getDirectoryPath(app.path as ts.Path),
            emptySafeList,
            cache,
            { enable: true },
            ["http"],
            registry,
            ts.emptyOptions,
        );
        baseline("should install expired typings with prerelease version of tsserver");
    });

    it("prerelease typings are properly handled", () => {
        const app = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const commander = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/commander/index.d.ts"),
            content: "export let x: number",
        };
        const node = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/node/index.d.ts"),
            content: "export let y: number",
        };
        const { discoverTypings, baseline } = setup([app]);
        const cache = new Map(Object.entries<ts.JsTyping.CachedTyping>({
            node: { typingLocation: node.path, version: new ts.Version("1.3.0-next.0") },
            commander: { typingLocation: commander.path, version: new ts.Version("1.3.0-next.0") },
        }));
        const registry = createTypesRegistry("node", "commander");
        registry.get("node")![`ts${ts.versionMajorMinor}`] = "1.3.0-next.1";
        discoverTypings(
            [app.path],
            ts.getDirectoryPath(app.path as ts.Path),
            emptySafeList,
            cache,
            { enable: true },
            ["http", "commander"],
            registry,
            ts.emptyOptions,
        );
        baseline("prerelease typings are properly handled");
    });

    function setup(files: readonly File[]) {
        const host = TestServerHost.createServerHost(files);
        const logger = createLoggerWithInMemoryLogs(host);
        const log = loggerToTypingsInstallerLog(logger);
        const testhost = patchHostTimeouts(
            changeToHostTrackingWrittenFiles(host),
            /*session*/ undefined,
            logger,
        );
        testhost.baselineHost("");
        return { discoverTypings, baseline };

        function baseline(scenario: string) {
            baselineTsserverLogs("typingsInstaller", `discover typings ${scenario}`, { logger });
        }

        function discoverTypings(
            fileNames: string[],
            projectRootPath: ts.Path,
            safeList: ts.JsTyping.SafeList,
            packageNameToTypingLocation: ReadonlyMap<string, ts.JsTyping.CachedTyping>,
            typeAcquisition: ts.TypeAcquisition,
            unresolvedImports: readonly string[],
            typesRegistry: ReadonlyMap<string, ts.MapLike<string>>,
            compilerOptions: ts.CompilerOptions,
        ) {
            logger.log(`ts.JsTyping.discoverTypings::${
                replaceAll(
                    stringifyIndented({
                        fileNames,
                        projectRootPath,
                        safeList: toMapLike(safeList),
                        packageNameToTypingLocation: toMapLike(packageNameToTypingLocation),
                        typeAcquisition,
                        unresolvedImports,
                        typesRegistry: toMapLike(typesRegistry),
                        compilerOptions,
                    }),
                    `"ts${ts.versionMajorMinor}"`,
                    `"tsFakeMajor.Minor"`,
                )
            }`);
            ts.JsTyping.discoverTypings(
                host,
                log.writeLine,
                fileNames,
                projectRootPath,
                safeList,
                packageNameToTypingLocation,
                typeAcquisition,
                unresolvedImports,
                typesRegistry,
                compilerOptions,
            );
            logger.log("");
        }

        function toMapLike<T>(map: ReadonlyMap<string, T>) {
            const result: ts.MapLike<T> = {};
            map.forEach((value, key) => result[key] = value);
            return result;
        }
    }
});

describe("unittests:: tsserver:: typingsInstaller:: telemetry events", () => {
    it("should be received", () => {
        const f1 = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const packageFile = {
            path: "/home/src/projects/project/package.json",
            content: jsonToReadableText({ dependencies: { commander: "1.0.0" } }),
        };
        const commander = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/commander/index.d.ts"),
            content: "export let x: number",
        };
        const host = TestServerHost.createServerHost(
            [f1, packageFile],
            { typingsInstallerTypesRegistry: "commander" },
        );

        const session = new TestSession({
            host,
            installAction: [commander],
        });
        openFilesForSession([f1], session);

        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typingsInstaller", "telemetry events", session);
    });
});

describe("unittests:: tsserver:: typingsInstaller:: progress notifications", () => {
    it("should be sent for success", () => {
        const f1 = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const packageFile = {
            path: "/home/src/projects/project/package.json",
            content: jsonToReadableText({ dependencies: { commander: "1.0.0" } }),
        };
        const packageLockFile = {
            path: getPathForTypeScriptTypingInstallerCacheTest("package-lock.json"),
            content: jsonToReadableText({
                dependencies: {
                    "@types/commander": {
                        version: "1.0.0",
                    },
                },
            }),
        };
        const commander = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/@types/commander/index.d.ts"),
            content: "export let x: number",
        };
        const host = TestServerHost.createServerHost(
            [f1, packageFile, packageLockFile],
            { typingsInstallerTypesRegistry: "commander" },
        );

        const session = new TestSession({
            host,
            installAction: [commander],
        });
        openFilesForSession([f1], session);

        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("typingsInstaller", "progress notification", session);
    });

    it("should be sent for error", () => {
        const f1 = {
            path: "/home/src/projects/project/app.js",
            content: "",
        };
        const packageFile = {
            path: "/home/src/projects/project/package.json",
            content: jsonToReadableText({ dependencies: { commander: "1.0.0" } }),
        };
        const host = TestServerHost.createServerHost(
            [f1, packageFile],
            { typingsInstallerTypesRegistry: "commander" },
        );
        const session = new TestSession({
            host,
            installAction: false,
        });
        openFilesForSession([f1], session);

        host.runPendingInstalls();

        baselineTsserverLogs("typingsInstaller", "progress notification for error", session);
    });
});

describe("unittests:: tsserver:: typingsInstaller:: npm installation command", () => {
    const npmPath = "npm", tsVersion = "2.9.0-dev.20180410";
    const packageNames = [
        "@types/graphql@ts2.8",
        "@types/highlight.js@ts2.8",
        "@types/jest@ts2.8",
        "@types/mini-css-extract-plugin@ts2.8",
        "@types/mongoose@ts2.8",
        "@types/pg@ts2.8",
        "@types/webpack-bundle-analyzer@ts2.8",
        "@types/enhanced-resolve@ts2.8",
        "@types/eslint-plugin-prettier@ts2.8",
        "@types/friendly-errors-webpack-plugin@ts2.8",
        "@types/hammerjs@ts2.8",
        "@types/history@ts2.8",
        "@types/image-size@ts2.8",
        "@types/js-cookie@ts2.8",
        "@types/koa-compress@ts2.8",
        "@types/less@ts2.8",
        "@types/material-ui@ts2.8",
        "@types/mysql@ts2.8",
        "@types/nodemailer@ts2.8",
        "@types/prettier@ts2.8",
        "@types/query-string@ts2.8",
        "@types/react-places-autocomplete@ts2.8",
        "@types/react-router@ts2.8",
        "@types/react-router-config@ts2.8",
        "@types/react-select@ts2.8",
        "@types/react-transition-group@ts2.8",
        "@types/redux-form@ts2.8",
        "@types/abbrev@ts2.8",
        "@types/accepts@ts2.8",
        "@types/acorn@ts2.8",
        "@types/ansi-regex@ts2.8",
        "@types/ansi-styles@ts2.8",
        "@types/anymatch@ts2.8",
        "@types/apollo-codegen@ts2.8",
        "@types/are-we-there-yet@ts2.8",
        "@types/argparse@ts2.8",
        "@types/arr-union@ts2.8",
        "@types/array-find-index@ts2.8",
        "@types/array-uniq@ts2.8",
        "@types/array-unique@ts2.8",
        "@types/arrify@ts2.8",
        "@types/assert-plus@ts2.8",
        "@types/async@ts2.8",
        "@types/autoprefixer@ts2.8",
        "@types/aws4@ts2.8",
        "@types/babel-code-frame@ts2.8",
        "@types/babel-generator@ts2.8",
        "@types/babel-plugin-syntax-jsx@ts2.8",
        "@types/babel-template@ts2.8",
        "@types/babel-traverse@ts2.8",
        "@types/babel-types@ts2.8",
        "@types/babylon@ts2.8",
        "@types/base64-js@ts2.8",
        "@types/basic-auth@ts2.8",
        "@types/big.js@ts2.8",
        "@types/bl@ts2.8",
        "@types/bluebird@ts2.8",
        "@types/body-parser@ts2.8",
        "@types/bonjour@ts2.8",
        "@types/boom@ts2.8",
        "@types/brace-expansion@ts2.8",
        "@types/braces@ts2.8",
        "@types/brorand@ts2.8",
        "@types/browser-resolve@ts2.8",
        "@types/bson@ts2.8",
        "@types/buffer-equal@ts2.8",
        "@types/builtin-modules@ts2.8",
        "@types/bytes@ts2.8",
        "@types/callsites@ts2.8",
        "@types/camelcase@ts2.8",
        "@types/camelcase-keys@ts2.8",
        "@types/caseless@ts2.8",
        "@types/change-emitter@ts2.8",
        "@types/check-types@ts2.8",
        "@types/cheerio@ts2.8",
        "@types/chokidar@ts2.8",
        "@types/chownr@ts2.8",
        "@types/circular-json@ts2.8",
        "@types/classnames@ts2.8",
        "@types/clean-css@ts2.8",
        "@types/clone@ts2.8",
        "@types/co-body@ts2.8",
        "@types/color@ts2.8",
        "@types/color-convert@ts2.8",
        "@types/color-name@ts2.8",
        "@types/color-string@ts2.8",
        "@types/colors@ts2.8",
        "@types/combined-stream@ts2.8",
        "@types/common-tags@ts2.8",
        "@types/component-emitter@ts2.8",
        "@types/compressible@ts2.8",
        "@types/compression@ts2.8",
        "@types/concat-stream@ts2.8",
        "@types/connect-history-api-fallback@ts2.8",
        "@types/content-disposition@ts2.8",
        "@types/content-type@ts2.8",
        "@types/convert-source-map@ts2.8",
        "@types/cookie@ts2.8",
        "@types/cookie-signature@ts2.8",
        "@types/cookies@ts2.8",
        "@types/core-js@ts2.8",
        "@types/cosmiconfig@ts2.8",
        "@types/create-react-class@ts2.8",
        "@types/cross-spawn@ts2.8",
        "@types/cryptiles@ts2.8",
        "@types/css-modules-require-hook@ts2.8",
        "@types/dargs@ts2.8",
        "@types/dateformat@ts2.8",
        "@types/debug@ts2.8",
        "@types/decamelize@ts2.8",
        "@types/decompress@ts2.8",
        "@types/decompress-response@ts2.8",
        "@types/deep-equal@ts2.8",
        "@types/deep-extend@ts2.8",
        "@types/deepmerge@ts2.8",
        "@types/defined@ts2.8",
        "@types/del@ts2.8",
        "@types/depd@ts2.8",
        "@types/destroy@ts2.8",
        "@types/detect-indent@ts2.8",
        "@types/detect-newline@ts2.8",
        "@types/diff@ts2.8",
        "@types/doctrine@ts2.8",
        "@types/download@ts2.8",
        "@types/draft-js@ts2.8",
        "@types/duplexer2@ts2.8",
        "@types/duplexer3@ts2.8",
        "@types/duplexify@ts2.8",
        "@types/ejs@ts2.8",
        "@types/end-of-stream@ts2.8",
        "@types/entities@ts2.8",
        "@types/escape-html@ts2.8",
        "@types/escape-string-regexp@ts2.8",
        "@types/escodegen@ts2.8",
        "@types/eslint-scope@ts2.8",
        "@types/eslint-visitor-keys@ts2.8",
        "@types/esprima@ts2.8",
        "@types/estraverse@ts2.8",
        "@types/etag@ts2.8",
        "@types/events@ts2.8",
        "@types/execa@ts2.8",
        "@types/exenv@ts2.8",
        "@types/exit@ts2.8",
        "@types/exit-hook@ts2.8",
        "@types/expect@ts2.8",
        "@types/express@ts2.8",
        "@types/express-graphql@ts2.8",
        "@types/extend@ts2.8",
        "@types/extract-zip@ts2.8",
        "@types/fancy-log@ts2.8",
        "@types/fast-diff@ts2.8",
        "@types/fast-levenshtein@ts2.8",
        "@types/figures@ts2.8",
        "@types/file-type@ts2.8",
        "@types/filenamify@ts2.8",
        "@types/filesize@ts2.8",
        "@types/finalhandler@ts2.8",
        "@types/find-root@ts2.8",
        "@types/find-up@ts2.8",
        "@types/findup-sync@ts2.8",
        "@types/forever-agent@ts2.8",
        "@types/form-data@ts2.8",
        "@types/forwarded@ts2.8",
        "@types/fresh@ts2.8",
        "@types/from2@ts2.8",
        "@types/fs-extra@ts2.8",
        "@types/get-caller-file@ts2.8",
        "@types/get-stdin@ts2.8",
        "@types/get-stream@ts2.8",
        "@types/get-value@ts2.8",
        "@types/glob-base@ts2.8",
        "@types/glob-parent@ts2.8",
        "@types/glob-stream@ts2.8",
        "@types/globby@ts2.8",
        "@types/globule@ts2.8",
        "@types/got@ts2.8",
        "@types/graceful-fs@ts2.8",
        "@types/gulp-rename@ts2.8",
        "@types/gulp-sourcemaps@ts2.8",
        "@types/gulp-util@ts2.8",
        "@types/gzip-size@ts2.8",
        "@types/handlebars@ts2.8",
        "@types/has-ansi@ts2.8",
        "@types/hasha@ts2.8",
        "@types/he@ts2.8",
        "@types/hoek@ts2.8",
        "@types/html-entities@ts2.8",
        "@types/html-minifier@ts2.8",
        "@types/htmlparser2@ts2.8",
        "@types/http-assert@ts2.8",
        "@types/http-errors@ts2.8",
        "@types/http-proxy@ts2.8",
        "@types/http-proxy-middleware@ts2.8",
        "@types/indent-string@ts2.8",
        "@types/inflected@ts2.8",
        "@types/inherits@ts2.8",
        "@types/ini@ts2.8",
        "@types/inline-style-prefixer@ts2.8",
        "@types/inquirer@ts2.8",
        "@types/internal-ip@ts2.8",
        "@types/into-stream@ts2.8",
        "@types/invariant@ts2.8",
        "@types/ip@ts2.8",
        "@types/ip-regex@ts2.8",
        "@types/is-absolute-url@ts2.8",
        "@types/is-binary-path@ts2.8",
        "@types/is-finite@ts2.8",
        "@types/is-glob@ts2.8",
        "@types/is-my-json-valid@ts2.8",
        "@types/is-number@ts2.8",
        "@types/is-object@ts2.8",
        "@types/is-path-cwd@ts2.8",
        "@types/is-path-in-cwd@ts2.8",
        "@types/is-promise@ts2.8",
        "@types/is-scoped@ts2.8",
        "@types/is-stream@ts2.8",
        "@types/is-svg@ts2.8",
        "@types/is-url@ts2.8",
        "@types/is-windows@ts2.8",
        "@types/istanbul-lib-coverage@ts2.8",
        "@types/istanbul-lib-hook@ts2.8",
        "@types/istanbul-lib-instrument@ts2.8",
        "@types/istanbul-lib-report@ts2.8",
        "@types/istanbul-lib-source-maps@ts2.8",
        "@types/istanbul-reports@ts2.8",
        "@types/jest-diff@ts2.8",
        "@types/jest-docblock@ts2.8",
        "@types/jest-get-type@ts2.8",
        "@types/jest-matcher-utils@ts2.8",
        "@types/jest-validate@ts2.8",
        "@types/jpeg-js@ts2.8",
        "@types/js-base64@ts2.8",
        "@types/js-string-escape@ts2.8",
        "@types/js-yaml@ts2.8",
        "@types/jsbn@ts2.8",
        "@types/jsdom@ts2.8",
        "@types/jsesc@ts2.8",
        "@types/json-parse-better-errors@ts2.8",
        "@types/json-schema@ts2.8",
        "@types/json-stable-stringify@ts2.8",
        "@types/json-stringify-safe@ts2.8",
        "@types/json5@ts2.8",
        "@types/jsonfile@ts2.8",
        "@types/jsontoxml@ts2.8",
        "@types/jss@ts2.8",
        "@types/keygrip@ts2.8",
        "@types/keymirror@ts2.8",
        "@types/keyv@ts2.8",
        "@types/klaw@ts2.8",
        "@types/koa-send@ts2.8",
        "@types/leven@ts2.8",
        "@types/listr@ts2.8",
        "@types/load-json-file@ts2.8",
        "@types/loader-runner@ts2.8",
        "@types/loader-utils@ts2.8",
        "@types/locate-path@ts2.8",
        "@types/lodash-es@ts2.8",
        "@types/lodash.assign@ts2.8",
        "@types/lodash.camelcase@ts2.8",
        "@types/lodash.clonedeep@ts2.8",
        "@types/lodash.debounce@ts2.8",
        "@types/lodash.escape@ts2.8",
        "@types/lodash.flowright@ts2.8",
        "@types/lodash.get@ts2.8",
        "@types/lodash.isarguments@ts2.8",
        "@types/lodash.isarray@ts2.8",
        "@types/lodash.isequal@ts2.8",
        "@types/lodash.isobject@ts2.8",
        "@types/lodash.isstring@ts2.8",
        "@types/lodash.keys@ts2.8",
        "@types/lodash.memoize@ts2.8",
        "@types/lodash.merge@ts2.8",
        "@types/lodash.mergewith@ts2.8",
        "@types/lodash.pick@ts2.8",
        "@types/lodash.sortby@ts2.8",
        "@types/lodash.tail@ts2.8",
        "@types/lodash.template@ts2.8",
        "@types/lodash.throttle@ts2.8",
        "@types/lodash.unescape@ts2.8",
        "@types/lodash.uniq@ts2.8",
        "@types/log-symbols@ts2.8",
        "@types/log-update@ts2.8",
        "@types/loglevel@ts2.8",
        "@types/loud-rejection@ts2.8",
        "@types/lru-cache@ts2.8",
        "@types/make-dir@ts2.8",
        "@types/map-obj@ts2.8",
        "@types/media-typer@ts2.8",
        "@types/mem@ts2.8",
        "@types/mem-fs@ts2.8",
        "@types/memory-fs@ts2.8",
        "@types/meow@ts2.8",
        "@types/merge-descriptors@ts2.8",
        "@types/merge-stream@ts2.8",
        "@types/methods@ts2.8",
        "@types/micromatch@ts2.8",
        "@types/mime@ts2.8",
        "@types/mime-db@ts2.8",
        "@types/mime-types@ts2.8",
        "@types/minimatch@ts2.8",
        "@types/minimist@ts2.8",
        "@types/minipass@ts2.8",
        "@types/mkdirp@ts2.8",
        "@types/mongodb@ts2.8",
        "@types/morgan@ts2.8",
        "@types/move-concurrently@ts2.8",
        "@types/ms@ts2.8",
        "@types/msgpack-lite@ts2.8",
        "@types/multimatch@ts2.8",
        "@types/mz@ts2.8",
        "@types/negotiator@ts2.8",
        "@types/node-dir@ts2.8",
        "@types/node-fetch@ts2.8",
        "@types/node-forge@ts2.8",
        "@types/node-int64@ts2.8",
        "@types/node-ipc@ts2.8",
        "@types/node-notifier@ts2.8",
        "@types/nomnom@ts2.8",
        "@types/nopt@ts2.8",
        "@types/normalize-package-data@ts2.8",
        "@types/normalize-url@ts2.8",
        "@types/number-is-nan@ts2.8",
        "@types/object-assign@ts2.8",
        "@types/on-finished@ts2.8",
        "@types/on-headers@ts2.8",
        "@types/once@ts2.8",
        "@types/onetime@ts2.8",
        "@types/opener@ts2.8",
        "@types/opn@ts2.8",
        "@types/optimist@ts2.8",
        "@types/ora@ts2.8",
        "@types/os-homedir@ts2.8",
        "@types/os-locale@ts2.8",
        "@types/os-tmpdir@ts2.8",
        "@types/p-cancelable@ts2.8",
        "@types/p-each-series@ts2.8",
        "@types/p-event@ts2.8",
        "@types/p-lazy@ts2.8",
        "@types/p-limit@ts2.8",
        "@types/p-locate@ts2.8",
        "@types/p-map@ts2.8",
        "@types/p-map-series@ts2.8",
        "@types/p-reduce@ts2.8",
        "@types/p-timeout@ts2.8",
        "@types/p-try@ts2.8",
        "@types/pako@ts2.8",
        "@types/parse-glob@ts2.8",
        "@types/parse-json@ts2.8",
        "@types/parseurl@ts2.8",
        "@types/path-exists@ts2.8",
        "@types/path-is-absolute@ts2.8",
        "@types/path-parse@ts2.8",
        "@types/pg-pool@ts2.8",
        "@types/pg-types@ts2.8",
        "@types/pify@ts2.8",
        "@types/pixelmatch@ts2.8",
        "@types/pkg-dir@ts2.8",
        "@types/pluralize@ts2.8",
        "@types/pngjs@ts2.8",
        "@types/prelude-ls@ts2.8",
        "@types/pretty-bytes@ts2.8",
        "@types/pretty-format@ts2.8",
        "@types/progress@ts2.8",
        "@types/promise-retry@ts2.8",
        "@types/proxy-addr@ts2.8",
        "@types/pump@ts2.8",
        "@types/q@ts2.8",
        "@types/qs@ts2.8",
        "@types/range-parser@ts2.8",
        "@types/rc@ts2.8",
        "@types/rc-select@ts2.8",
        "@types/rc-slider@ts2.8",
        "@types/rc-tooltip@ts2.8",
        "@types/rc-tree@ts2.8",
        "@types/react-event-listener@ts2.8",
        "@types/react-side-effect@ts2.8",
        "@types/react-slick@ts2.8",
        "@types/read-chunk@ts2.8",
        "@types/read-pkg@ts2.8",
        "@types/read-pkg-up@ts2.8",
        "@types/recompose@ts2.8",
        "@types/recursive-readdir@ts2.8",
        "@types/relateurl@ts2.8",
        "@types/replace-ext@ts2.8",
        "@types/request@ts2.8",
        "@types/request-promise-native@ts2.8",
        "@types/require-directory@ts2.8",
        "@types/require-from-string@ts2.8",
        "@types/require-relative@ts2.8",
        "@types/resolve@ts2.8",
        "@types/resolve-from@ts2.8",
        "@types/retry@ts2.8",
        "@types/rx@ts2.8",
        "@types/rx-lite@ts2.8",
        "@types/rx-lite-aggregates@ts2.8",
        "@types/safe-regex@ts2.8",
        "@types/sane@ts2.8",
        "@types/sass-graph@ts2.8",
        "@types/sax@ts2.8",
        "@types/scriptjs@ts2.8",
        "@types/semver@ts2.8",
        "@types/send@ts2.8",
        "@types/serialize-javascript@ts2.8",
        "@types/serve-index@ts2.8",
        "@types/serve-static@ts2.8",
        "@types/set-value@ts2.8",
        "@types/shallowequal@ts2.8",
        "@types/shelljs@ts2.8",
        "@types/sockjs@ts2.8",
        "@types/sockjs-client@ts2.8",
        "@types/source-list-map@ts2.8",
        "@types/source-map-support@ts2.8",
        "@types/spdx-correct@ts2.8",
        "@types/spdy@ts2.8",
        "@types/split@ts2.8",
        "@types/sprintf@ts2.8",
        "@types/sprintf-js@ts2.8",
        "@types/sqlstring@ts2.8",
        "@types/sshpk@ts2.8",
        "@types/stack-utils@ts2.8",
        "@types/stat-mode@ts2.8",
        "@types/statuses@ts2.8",
        "@types/strict-uri-encode@ts2.8",
        "@types/string-template@ts2.8",
        "@types/strip-ansi@ts2.8",
        "@types/strip-bom@ts2.8",
        "@types/strip-json-comments@ts2.8",
        "@types/supports-color@ts2.8",
        "@types/svg2png@ts2.8",
        "@types/svgo@ts2.8",
        "@types/table@ts2.8",
        "@types/tapable@ts2.8",
        "@types/tar@ts2.8",
        "@types/temp@ts2.8",
        "@types/tempfile@ts2.8",
        "@types/through@ts2.8",
        "@types/through2@ts2.8",
        "@types/tinycolor2@ts2.8",
        "@types/tmp@ts2.8",
        "@types/to-absolute-glob@ts2.8",
        "@types/tough-cookie@ts2.8",
        "@types/trim@ts2.8",
        "@types/tryer@ts2.8",
        "@types/type-check@ts2.8",
        "@types/type-is@ts2.8",
        "@types/ua-parser-js@ts2.8",
        "@types/uglify-js@ts2.8",
        "@types/uglifyjs-webpack-plugin@ts2.8",
        "@types/underscore@ts2.8",
        "@types/uniq@ts2.8",
        "@types/uniqid@ts2.8",
        "@types/untildify@ts2.8",
        "@types/urijs@ts2.8",
        "@types/url-join@ts2.8",
        "@types/url-parse@ts2.8",
        "@types/url-regex@ts2.8",
        "@types/user-home@ts2.8",
        "@types/util-deprecate@ts2.8",
        "@types/util.promisify@ts2.8",
        "@types/utils-merge@ts2.8",
        "@types/uuid@ts2.8",
        "@types/vali-date@ts2.8",
        "@types/vary@ts2.8",
        "@types/verror@ts2.8",
        "@types/vinyl@ts2.8",
        "@types/vinyl-fs@ts2.8",
        "@types/warning@ts2.8",
        "@types/watch@ts2.8",
        "@types/watchpack@ts2.8",
        "@types/webpack-dev-middleware@ts2.8",
        "@types/webpack-sources@ts2.8",
        "@types/which@ts2.8",
        "@types/window-size@ts2.8",
        "@types/wrap-ansi@ts2.8",
        "@types/write-file-atomic@ts2.8",
        "@types/ws@ts2.8",
        "@types/xml2js@ts2.8",
        "@types/xmlbuilder@ts2.8",
        "@types/xtend@ts2.8",
        "@types/yallist@ts2.8",
        "@types/yargs@ts2.8",
        "@types/yauzl@ts2.8",
        "@types/yeoman-generator@ts2.8",
        "@types/zen-observable@ts2.8",
        "@types/react-content-loader@ts2.8",
    ];
    const expectedCommands = [
        ts.server.typingsInstaller.getNpmCommandForInstallation(npmPath, tsVersion, packageNames, packageNames.length).command,
        ts.server.typingsInstaller.getNpmCommandForInstallation(npmPath, tsVersion, packageNames, packageNames.length - Math.ceil(packageNames.length / 2)).command,
    ];
    it("works when the command is too long to install all packages at once", () => {
        const commands: string[] = [];
        const hasError = ts.server.typingsInstaller.installNpmPackages(npmPath, tsVersion, packageNames, command => {
            commands.push(command);
            return false;
        });
        assert.isFalse(hasError);
        assert.deepEqual(commands, expectedCommands, "commands");
    });

    it("installs remaining packages when one of the partial command fails", () => {
        const commands: string[] = [];
        const hasError = ts.server.typingsInstaller.installNpmPackages(npmPath, tsVersion, packageNames, command => {
            commands.push(command);
            return commands.length === 1;
        });
        assert.isTrue(hasError);
        assert.deepEqual(commands, expectedCommands, "commands");
    });
});

describe("unittests:: tsserver:: typingsInstaller:: recomputing resolutions of unresolved imports", () => {
    const appPath = "/home/src/projects/project/app.js" as ts.Path;
    function verifyResolvedModuleOfFooo(project: ts.server.Project) {
        ts.server.updateProjectIfDirty(project);
        const program = project.getLanguageService().getProgram()!;
        const sourceFile = program.getSourceFileByPath(appPath)!;
        const foooResolution = program.getResolvedModule(sourceFile, "fooo", /*mode*/ undefined)!.resolvedModule!;
        project.writeLog(`Resolution from : ${sourceFile.fileName} for "fooo" goes to: ${jsonToReadableText(foooResolution)}`);
        return foooResolution;
    }

    function verifyUnresolvedImportResolutions(scenario: string, appContents: string, typingFiles: File[]) {
        const app: File = {
            path: appPath,
            content: `${appContents}import * as x from "fooo";`,
        };
        const fooo: File = {
            path: "/home/src/projects/project/node_modules/fooo/index.d.ts",
            content: `export var x: string;`,
        };

        const host = TestServerHost.createServerHost(
            [app, fooo],
            { typingsInstallerTypesRegistry: "foo" },
        );
        const session = new TestSession({
            host,
            installAction: typingFiles,
        });
        openFilesForSession([app], session);

        const proj = session.getProjectService().inferredProjects[0];
        const foooResolution1 = verifyResolvedModuleOfFooo(proj);

        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();
        const foooResolution2 = verifyResolvedModuleOfFooo(proj);
        assert.strictEqual(foooResolution1, foooResolution2);
        session.executeCommandSeq<ts.server.protocol.ApplyChangedToOpenFilesRequest>({
            command: ts.server.protocol.CommandTypes.ApplyChangedToOpenFiles,
            arguments: {
                changedFiles: [{
                    fileName: app.path,
                    changes: [{
                        span: { start: 0, length: 0 },
                        newText: `import * as bar from "bar";`,
                    }],
                }],
            },
        });
        host.runQueuedTimeoutCallbacks(); // Update the graph
        // Update the typing
        assert.isFalse(proj.resolutionCache.isFileWithInvalidatedNonRelativeUnresolvedImports(app.path as ts.Path));
        baselineTsserverLogs("typingsInstaller", scenario, session);
    }

    it("correctly invalidate the resolutions with typing names", () => {
        verifyUnresolvedImportResolutions("invalidate the resolutions", 'import * as a from "foo";', [{
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/foo/index.d.ts"),
            content: "export function a(): void;",
        }]);
    });

    it("correctly invalidate the resolutions with typing names that are trimmed", () => {
        const fooIndex: File = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/foo/index.d.ts"),
            content: "export function aa(): void;",
        };
        const fooAA: File = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/foo/a/a.d.ts"),
            content: "export function a (): void;",
        };
        const fooAB: File = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/foo/a/b.d.ts"),
            content: "export function b (): void;",
        };
        const fooAC: File = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/foo/a/c.d.ts"),
            content: "export function c (): void;",
        };
        verifyUnresolvedImportResolutions(
            "invalidate the resolutions with trimmed names",
            `
                    import * as a from "foo/a/a";
                    import * as b from "foo/a/b";
                    import * as c from "foo/a/c";
            `,
            [fooIndex, fooAA, fooAB, fooAC],
        );
    });

    it("should handle node core modules", () => {
        const file: File = {
            path: "/home/src/projects/project/app.js",
            content: `// @ts-check

const net = require("net");
const stream = require("stream");`,
        };
        const nodeTyping: File = {
            path: getPathForTypeScriptTypingInstallerCacheTest("node_modules/node/index.d.ts"),
            content: `
declare module "net" {
    export type n = number;
}
declare module "stream" {
    export type s = string;
}`,
        };

        const host = TestServerHost.createServerHost(
            [file],
            { typingsInstallerTypesRegistry: "node" },
        );
        const session = new TestSession({
            host,
            installAction: [nodeTyping],
        });
        openFilesForSession([file], session);

        const proj = session.getProjectService().inferredProjects[0];
        host.runPendingInstalls();
        host.runQueuedTimeoutCallbacks();
        session.executeCommandSeq<ts.server.protocol.ApplyChangedToOpenFilesRequest>({
            command: ts.server.protocol.CommandTypes.ApplyChangedToOpenFiles,
            arguments: {
                changedFiles: [{
                    fileName: file.path,
                    changes: [{
                        span: {
                            start: file.content.indexOf(`"stream"`) + 2,
                            length: 0,
                        },
                        newText: " ",
                    }],
                }],
            },
        });
        // Below timeout Updates the typings to empty array because of "s tream" as unsresolved import
        // and schedules the update graph because of this.
        host.runQueuedTimeoutCallbacks();

        // Here, since typings dont change, there is no timeout scheduled
        session.executeCommandSeq<ts.server.protocol.ApplyChangedToOpenFilesRequest>({
            command: ts.server.protocol.CommandTypes.ApplyChangedToOpenFiles,
            arguments: {
                changedFiles: [{
                    fileName: file.path,
                    changes: [{
                        span: { start: file.content.indexOf("const"), length: 0 },
                        newText: `const bar = require("bar");`,
                    }],
                }],
            },
        });
        proj.updateGraph(); // Update the graph
        // Update the typing
        session.host.baselineHost("After program update");
        assert.isFalse(proj.resolutionCache.isFileWithInvalidatedNonRelativeUnresolvedImports(file.path as ts.Path));
        baselineTsserverLogs("typingsInstaller", "should handle node core modules", session);
    });
});

describe("unittests:: tsserver:: typingsInstaller:: tsserver:: with inferred Project", () => {
    it("when projectRootPath is provided", () => {
        const projectRootPath = `/user/username/projects/san2`;
        const file: File = {
            path: `${projectRootPath}/x.js`,
            content: "const aaaaaaav = 1;",
        };

        const currentDirectory = `/user/username/projects/anotherProject`;
        const packageJsonInCurrentDirectory: File = {
            path: `${currentDirectory}/package.json`,
            content: jsonToReadableText({
                devDependencies: {
                    pkgcurrentdirectory: "",
                },
            }),
        };
        const packageJsonOfPkgcurrentdirectory: File = {
            path: `${currentDirectory}/node_modules/pkgcurrentdirectory/package.json`,
            content: jsonToReadableText({
                name: "pkgcurrentdirectory",
                main: "index.js",
                typings: "index.d.ts",
            }),
        };
        const indexOfPkgcurrentdirectory: File = {
            path: `${currentDirectory}/node_modules/pkgcurrentdirectory/index.d.ts`,
            content: "export function foo() { }",
        };

        const typingsCache = `/users/username/Library/Caches/typescript/2.7`;
        const typingsCachePackageJson: File = {
            path: `${typingsCache}/package.json`,
            content: jsonToReadableText({
                devDependencies: {},
            }),
        };
        const typingsCachePackageLockJson: File = {
            path: `${typingsCache}/package-lock.json`,
            content: jsonToReadableText({
                dependencies: {},
            }),
        };

        const host = TestServerHost.createServerHost(
            [file, packageJsonInCurrentDirectory, packageJsonOfPkgcurrentdirectory, indexOfPkgcurrentdirectory, typingsCachePackageJson, typingsCachePackageLockJson],
            {
                typingsInstallerGlobalCacheLocation: typingsCache,
                typingsInstallerTypesRegistry: "pkgcurrentdirectory",
            },
        );
        const session = new TestSession(host);

        setCompilerOptionsForInferredProjectsRequestForSession({
            module: ts.server.protocol.ModuleKind.CommonJS,
            target: ts.server.protocol.ScriptTarget.ES2016,
            jsx: ts.server.protocol.JsxEmit.Preserve,
            experimentalDecorators: true,
            allowJs: true,
            allowSyntheticDefaultImports: true,
            allowNonTsExtensions: true,
        }, session);

        openFilesForSession([{ file, projectRootPath }], session);

        baselineTsserverLogs("typingsInstaller", "projectRootPath is provided for inferred project", session);
    });
});
