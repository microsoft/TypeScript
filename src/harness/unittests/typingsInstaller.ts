/// <reference path="../harness.ts" />
/// <reference path="./tsserverProjectSystem.ts" />
/// <reference path="../../server/typingsInstaller/typingsInstaller.ts" />
/// <reference path="../vfs.ts" />
/// <reference path="../typemock.ts" />
/// <reference path="../fakes.ts" />

namespace ts.projectSystem {
    import spy = typemock.spy;
    import Arg = typemock.Arg;
    import Times = typemock.Times;

    import TI = server.typingsInstaller;
    import validatePackageName = JsTyping.validatePackageName;
    import PackageNameValidationResult = JsTyping.PackageNameValidationResult;

    interface InstallerParams {
        globalTypingsCacheLocation?: string;
        throttleLimit?: number;
        typesRegistry?: Map<void>;
    }

    function createTypesRegistry(...list: string[]): Map<void> {
        const map = createMap<void>();
        for (const l of list) {
            map.set(l, undefined);
        }
        return map;
    }

    class Installer extends TestTypingsInstaller {
        constructor(host: server.ServerHost, p?: InstallerParams, log?: TI.Log) {
            super(
                (p && p.globalTypingsCacheLocation) || "/a/data",
                (p && p.throttleLimit) || 5,
                host,
                (p && p.typesRegistry),
                log);
        }

        installAll(expectedCount: number) {
            this.checkPendingCommands(expectedCount);
            this.executePendingCommands();
        }
    }

    function executeCommand(self: Installer, host: fakes.FakeServerHost, installedTypings: string[] | string, typingFiles: { path: string, content: string }[], cb: TI.RequestCompletedAction): void {
        self.addPostExecAction(installedTypings, success => {
            for (const file of typingFiles) {
                host.vfs.mkdirpSync(vpath.dirname(file.path));
                host.vfs.writeFileSync(file.path, file.content);
            }
            cb(success);
        });
    }

    function trackingLogger(): { log(message: string): void, finish(): string[] } {
        const logs: string[] = [];
        return {
            log(message) {
               logs.push(message);
            },
            finish() {
                return logs;
            }
        };
    }

    import typingsName = TI.typingsName;

    describe("local module", () => {
        it("should not be picked up", () => {
            const f1 = "/a/app.js";
            const f2 = "/a/config.js";
            const config = "/a/jsconfig.json";
            const host = new fakes.FakeServerHost({}, /*files*/ {
                [f1]: `const c = require('./config');`,
                [f2]: `export let x = 1`,
                [config]: `{ "typeAcquisition": { "enable": true }, "compilerOptions": { "moduleResolution": "commonjs } }`,
                "/cache/node_modules/@types/config/index.d.ts": `export let y: number;`,
            });

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("config"), globalTypingsCacheLocation: "/cache" });
            const installWorkerSpy = spy(installer, "installWorker");

            const service = createProjectService(host, { typingsInstaller: installer });
            service.openClientFile(f1);
            service.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(service, 0), [f1, f2, config]);
            installer.installAll(0);

            installWorkerSpy
                .verify(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), Times.none())
                .revoke();
        });
    });

    describe("typingsInstaller", () => {
        it("configured projects (typings installed) 1", () => {
            const jquery = {
                path: "/a/data/node_modules/@types/jquery/index.d.ts",
                content: "declare const $: { x: number }"
            };

            const file1 = "/a/b/app.js";
            const tsconfig = "/a/b/tsconfig.json";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [file1]: ``,
                [tsconfig]: `{ "compilerOptions": { "allowJs": true }, "typeAcquisition": { "enable": true } }`,
                "/a/b/package.json": `{ "name": "test", "dependencies": { "jquery": "^3.1.0" } }`,
            });

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("jquery") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        const installedTypings = ["@types/jquery"];
                        const typingFiles = [jquery];
                        executeCommand(installer, host, installedTypings, typingFiles, cb);
                    }
                });

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(file1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(p, [file1, tsconfig]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectActualFiles(p, [file1, jquery.path, tsconfig]);

            installWorkerSpy.revoke();
        });

        it("inferred project (typings installed)", () => {
            const jquery = {
                path: "/a/data/node_modules/@types/jquery/index.d.ts",
                content: "declare const $: { x: number }"
            };

            const file1 = "/a/b/app.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [file1]: ``,
                "/a/b/package.json": `{ "name": "test", "dependencies": { "jquery": "^3.1.0" } }`,
            });

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("jquery") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        const installedTypings = ["@types/jquery"];
                        const typingFiles = [jquery];
                        executeCommand(installer, host, installedTypings, typingFiles, cb);
                    }
                });

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(file1);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const p = projectService.inferredProjects[0];
            checkProjectActualFiles(p, [file1]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(p, [file1, jquery.path]);

            installWorkerSpy.revoke();
        });

        it("external project - no type acquisition, no .d.ts/js files", () => {
            const file1 = "/a/b/app.ts";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [file1]: ``,
            });

            const installer = new Installer(host);
            const enqueueInstallTypingsRequestSpy = spy(installer, "enqueueInstallTypingsRequest");

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: {},
                rootFiles: [toExternalFile(file1)]
            });

            installer.checkPendingCommands(/*expectedCount*/ 0);
            // by default auto discovery will kick in if project contain only .js/.d.ts files
            // in this case project contain only ts files - no auto discovery
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            enqueueInstallTypingsRequestSpy
                .verify(_ => _(Arg.any(), Arg.any(), Arg.any()), Times.none(), "auto discovery should not be enabled")
                .revoke();
        });

        it("external project - deduplicate from local @types packages", () => {
            const appJs = "/a/b/app.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [appJs]: "",
                "/node_modules/@types/node/index.d.ts": "declare var node;",
            });

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("node") });
            const installWorkerSpy = spy(installer, "installWorker");

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: {},
                rootFiles: [toExternalFile(appJs)],
                typeAcquisition: { enable: true, include: ["node"] }
            });

            installer.checkPendingCommands(/*expectedCount*/ 0);
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            installWorkerSpy
                .verify(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), Times.none(), "nothing should get installed")
                .revoke();
        });

        it("external project - no auto in typing acquisition, no .d.ts/js files", () => {
            const file1 = "/a/b/app.ts";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [file1]: ``,
            });

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("jquery") });
            const enqueueInstallTypingsRequestSpy = spy(installer, "enqueueInstallTypingsRequest");

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: {},
                rootFiles: [toExternalFile(file1)],
                typeAcquisition: { include: ["jquery"] }
            });
            installer.checkPendingCommands(/*expectedCount*/ 0);
            // by default auto discovery will kick in if project contain only .js/.d.ts files
            // in this case project contain only ts files - no auto discovery even if type acquisition is set
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            enqueueInstallTypingsRequestSpy
                .verify(_ => _(Arg.any(), Arg.any(), Arg.any()), Times.none(), "auto discovery should not be enabled")
                .revoke();
        });

        it("external project - autoDiscovery = true, no .d.ts/js files", () => {
            const file1 = "/a/b/app.ts";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [file1]: ``,
            });

            const jquery = {
                path: "/a/data/node_modules/@types/jquery/index.d.ts",
                content: "declare const $: { x: number }"
            };

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("jquery") });
            const enqueueInstallTypingsRequestSpy = spy(installer, "enqueueInstallTypingsRequest");
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        const installedTypings = ["@types/jquery"];
                        const typingFiles = [jquery];
                        executeCommand(installer, host, installedTypings, typingFiles, cb);
                    }
                });

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: {},
                rootFiles: [toExternalFile(file1)],
                typeAcquisition: { enable: true, include: ["jquery"] }
            });

            installer.installAll(/*expectedCount*/ 1);

            // auto is set in type acquisition - use it even if project contains only .ts files
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            enqueueInstallTypingsRequestSpy
                .verify(_ => _(Arg.any(), Arg.any(), Arg.any()), Times.atLeastOnce())
                .revoke();

            installWorkerSpy.revoke();
        });

        it("external project - no type acquisition, with only js, jsx, d.ts files", () => {
            // Tests:
            // 1. react typings are installed for .jsx
            // 2. loose files names are matched against safe list for typings if
            //    this is a JS project (only js, jsx, d.ts files are present)
            const lodashJs = "/a/b/lodash.js";
            const file2Jsx = "/a/b/file2.jsx";
            const file3Dts = "/a/b/file3.d.ts";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [lodashJs]: ``,
                [file2Jsx]: ``,
                [file3Dts]: ``,
                [customTypesMap.path]: customTypesMap.content
            });

            const reactDts = {
                path: "/a/data/node_modules/@types/react/index.d.ts",
                content: "declare const react: { x: number }"
            };
            const lodashDts = {
                path: "/a/data/node_modules/@types/lodash/index.d.ts",
                content: "declare const lodash: { x: number }"
            };

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("lodash", "react") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        const installedTypings = ["@types/lodash", "@types/react"];
                        const typingFiles = [lodashDts, reactDts];
                        executeCommand(installer, host, installedTypings, typingFiles, cb);
                    }
                });

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(lodashJs), toExternalFile(file2Jsx), toExternalFile(file3Dts)],
                typeAcquisition: { }
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file2Jsx, file3Dts]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file2Jsx, file3Dts, lodashDts.path, reactDts.path]);

            installWorkerSpy.revoke();
        });

        it("external project - type acquisition with enable: false", () => {
            // Tests:
            // Exclude

            const jqueryJs = "/a/b/jquery.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [jqueryJs]: "",
            });

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("jquery") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, [], [], cb);
                    }
                });

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(jqueryJs)],
                typeAcquisition: { enable: false }
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            checkProjectActualFiles(p, [jqueryJs]);

            installer.checkPendingCommands(/*expectedCount*/ 0);
            installWorkerSpy.revoke();
        });
        it("external project - no type acquisition, with js & ts files", () => {
            // Tests:
            // 1. No typings are included for JS projects when the project contains ts files
            const jqueryJs = "/a/b/jquery.js";
            const file2Ts = "/a/b/file2.ts";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [jqueryJs]: ``,
                [file2Ts]: ``,
            });

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("jquery") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, [], [], cb);
                    }
                });

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(jqueryJs), toExternalFile(file2Ts)],
                typeAcquisition: {}
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            checkProjectActualFiles(p, [jqueryJs, file2Ts]);

            installer.checkPendingCommands(/*expectedCount*/ 0);

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [jqueryJs, file2Ts]);
            installWorkerSpy.revoke();
        });

        it("external project - with type acquisition, with only js, d.ts files", () => {
            // Tests:
            // 1. Safelist matching, type acquisition includes/excludes and package.json typings are all acquired
            // 2. Types for safelist matches are not included when they also appear in the type acquisition exclude list
            // 3. Multiple includes and excludes are respected in type acquisition
            const lodashJs = "/a/b/lodash.js";
            const commanderJs = "/a/b/commander.js";
            const file3Dts = "/a/b/file3.d.ts";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [lodashJs]: ``,
                [commanderJs]: ``,
                [file3Dts]: ``,
                "/a/b/package.json": `{ "name": "test", "dependencies": { "express": "^3.1.0" } }`,
                [customTypesMap.path]: customTypesMap.content
            });

            const commander = {
                path: "/a/data/node_modules/@types/commander/index.d.ts",
                content: "declare const commander: { x: number }"
            };
            const express = {
                path: "/a/data/node_modules/@types/express/index.d.ts",
                content: "declare const express: { x: number }"
            };
            const jquery = {
                path: "/a/data/node_modules/@types/jquery/index.d.ts",
                content: "declare const jquery: { x: number }"
            };
            const moment = {
                path: "/a/data/node_modules/@types/moment/index.d.ts",
                content: "declare const moment: { x: number }"
            };

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("jquery", "commander", "moment", "express") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        const installedTypings = ["@types/commander", "@types/express", "@types/jquery", "@types/moment"];
                        const typingFiles = [commander, express, jquery, moment];
                        executeCommand(installer, host, installedTypings, typingFiles, cb);
                    }
                });

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(lodashJs), toExternalFile(commanderJs), toExternalFile(file3Dts)],
                typeAcquisition: { enable: true, include: ["jquery", "moment"], exclude: ["lodash"] }
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file3Dts]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            // Commander: Existed as a JS file
            // JQuery: Specified in 'include'
            // Moment: Specified in 'include'
            // Express: Specified in package.json
            // lodash: Excluded (not present)
            checkProjectActualFiles(p, [file3Dts, commander.path, jquery.path, moment.path, express.path]);
            installWorkerSpy.revoke();
        });

        it("Throttle - delayed typings to install", () => {
            const lodashJs = "/a/b/lodash.js";
            const commanderJs = "/a/b/commander.js";
            const file3 = "/a/b/file3.d.ts";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [lodashJs]: ``,
                [commanderJs]: ``,
                [file3]: ``,
                "/a/b/package.json": `{ "name": "test", "dependencies": { "express": "^3.1.0" } }`,
                [customTypesMap.path]: customTypesMap.content
            });

            const commander = {
                path: "/a/data/node_modules/@types/commander/index.d.ts",
                content: "declare const commander: { x: number }"
            };
            const express = {
                path: "/a/data/node_modules/@types/express/index.d.ts",
                content: "declare const express: { x: number }"
            };
            const jquery = {
                path: "/a/data/node_modules/@types/jquery/index.d.ts",
                content: "declare const jquery: { x: number }"
            };
            const moment = {
                path: "/a/data/node_modules/@types/moment/index.d.ts",
                content: "declare const moment: { x: number }"
            };
            const lodash = {
                path: "/a/data/node_modules/@types/lodash/index.d.ts",
                content: "declare const lodash: { x: number }"
            };

            const typingFiles = [commander, express, jquery, moment, lodash];
            const installer = new Installer(host, { typesRegistry: createTypesRegistry("commander", "express", "jquery", "moment", "lodash") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        const installedTypings = ["@types/commander", "@types/express", "@types/jquery", "@types/moment", "@types/lodash"];
                        executeCommand(installer, host, installedTypings, typingFiles, cb);
                    }
                });

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(lodashJs), toExternalFile(commanderJs), toExternalFile(file3)],
                typeAcquisition: { include: ["jquery", "moment"] }
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file3]);
            installer.checkPendingCommands(/*expectedCount*/ 1);
            installer.executePendingCommands();
            // expected all typings file to exist
            for (const f of typingFiles) {
                assert.isTrue(host.fileExists(f.path), `expected file ${f.path} to exist`);
            }
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file3, commander.path, express.path, jquery.path, moment.path, lodash.path]);
            installWorkerSpy.revoke();
        });

        it("Throttle - delayed run install requests", () => {
            const lodashJs = "/a/b/lodash.js";
            const commanderJs = "/a/b/commander.js";
            const file3 = "/a/b/file3.d.ts";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [lodashJs]: ``,
                [commanderJs]: ``,
                [file3]: ``,
                [customTypesMap.path]: customTypesMap.content
            });

            const commander = {
                path: "/a/data/node_modules/@types/commander/index.d.ts",
                content: "declare const commander: { x: number }",
                typings: typingsName("commander")
            };
            const jquery = {
                path: "/a/data/node_modules/@types/jquery/index.d.ts",
                content: "declare const jquery: { x: number }",
                typings: typingsName("jquery")
            };
            const lodash = {
                path: "/a/data/node_modules/@types/lodash/index.d.ts",
                content: "declare const lodash: { x: number }",
                typings: typingsName("lodash")
            };
            const cordova = {
                path: "/a/data/node_modules/@types/cordova/index.d.ts",
                content: "declare const cordova: { x: number }",
                typings: typingsName("cordova")
            };
            const grunt = {
                path: "/a/data/node_modules/@types/grunt/index.d.ts",
                content: "declare const grunt: { x: number }",
                typings: typingsName("grunt")
            };
            const gulp = {
                path: "/a/data/node_modules/@types/gulp/index.d.ts",
                content: "declare const gulp: { x: number }",
                typings: typingsName("gulp")
            };

            const installer = new Installer(host, { throttleLimit: 1, typesRegistry: createTypesRegistry("commander", "jquery", "lodash", "cordova", "gulp", "grunt") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.hasElement(typingsName("commander")), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, [commander.typings, jquery.typings, lodash.typings, cordova.typings], [commander, jquery, lodash, cordova], cb);
                    }
                })
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, [grunt.typings, gulp.typings], [grunt, gulp], cb);
                    }
                });

            // Create project #1 with 4 typings
            const projectService = createProjectService(host, { typingsInstaller: installer });
            const projectFileName1 = "/a/app/test1.csproj";
            projectService.openExternalProject({
                projectFileName: projectFileName1,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(lodashJs), toExternalFile(commanderJs), toExternalFile(file3)],
                typeAcquisition: { include: ["jquery", "cordova"] }
            });

            installer.checkPendingCommands(/*expectedCount*/ 1);
            assert.equal(installer.pendingRunRequests.length, 0, "expect no throttled requests");

            // Create project #2 with 2 typings
            const projectFileName2 = "/a/app/test2.csproj";
            projectService.openExternalProject({
                projectFileName: projectFileName2,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(file3)],
                typeAcquisition: { include: ["grunt", "gulp"] }
            });
            assert.equal(installer.pendingRunRequests.length, 1, "expect one throttled request");

            const p1 = projectService.externalProjects[0];
            const p2 = projectService.externalProjects[1];
            projectService.checkNumberOfProjects({ externalProjects: 2 });
            checkProjectActualFiles(p1, [file3]);
            checkProjectActualFiles(p2, [file3]);

            installer.executePendingCommands();

            // expected one install request from the second project
            installer.checkPendingCommands(/*expectedCount*/ 1);
            assert.equal(installer.pendingRunRequests.length, 0, "expected no throttled requests");

            installer.executePendingCommands();
            host.checkTimeoutQueueLengthAndRun(3); // for 2 projects and 1 refreshing inferred project
            checkProjectActualFiles(p1, [file3, commander.path, jquery.path, lodash.path, cordova.path]);
            checkProjectActualFiles(p2, [file3, grunt.path, gulp.path]);
            installWorkerSpy.revoke();
        });

        it("configured projects discover from node_modules", () => {
            const jqueryDTS = {
                path: "/tmp/node_modules/@types/jquery/index.d.ts",
                content: ""
            };
            const app = "/app.js";
            const jsconfig = "/jsconfig.json";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [app]: ``,
                [jsconfig]: `{}`,
                "/node_modules/jquery/index.js": ``,
                "/node_modules/jquery/package.json": `{ "name": "jquery" }`,
            });
            // Should not search deeply in node_modules.
            host.vfs.apply({
                "/node_modules/jquery/nested/package.json": `{ "name": "nested" }`,
            });

            const installer = new Installer(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: createTypesRegistry("jquery", "nested") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.array([`@types/jquery@ts${versionMajorMinor}`]), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, ["@types/jquery"], [jqueryDTS], cb);
                    }
                });

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(app);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(p, [app, jsconfig]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectActualFiles(p, [app, jqueryDTS.path, jsconfig]);
            installWorkerSpy
                .verify(_ => _(Arg.any(), Arg.not(Arg.array([`@types/jquery@ts${versionMajorMinor}`])), Arg.any(), Arg.any()), Times.none())
                .revoke();
        });

        it("configured projects discover from bower_components", () => {
            const app = "/app.js";
            const jsconfig = "/jsconfig.json";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [app]: ``,
                [jsconfig]: `{}`,
                "/bower_components/jquery/index.js": ``,
                "/bower_components/jquery/package.json": `{ "name": "jquery" }`,
            });

            const jqueryDTS = {
                path: "/tmp/node_modules/@types/jquery/index.d.ts",
                content: ""
            };

            const installer = new Installer(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: createTypesRegistry("jquery") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, ["@types/jquery"], [jqueryDTS], cb);
                    }
                });

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(app);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(p, [app, jsconfig]);
            host.checkWatchedFiles([jsconfig, "/bower_components", "/node_modules", vpath.combine(vfsutils.builtFolder, "lib.d.ts")]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectActualFiles(p, [app, jqueryDTS.path, jsconfig]);
            installWorkerSpy.revoke();
        });

        it("configured projects discover from bower.json", () => {
            const app = "/app.js";
            const jsconfig = "/jsconfig.json";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [app]: ``,
                [jsconfig]: `{}`,
                "/bower.json": `{ "dependencies": { "jquery": "^3.1.0" } }`,
            });

            const jqueryDTS = {
                path: "/tmp/node_modules/@types/jquery/index.d.ts",
                content: ""
            };

            const installer = new Installer(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: createTypesRegistry("jquery") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, ["@types/jquery"], [jqueryDTS], cb);
                    }
                });

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(app);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(p, [app, jsconfig]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectActualFiles(p, [app, jqueryDTS.path, jsconfig]);
            installWorkerSpy.revoke();
        });

        it("Malformed package.json should be watched", () => {
            const f = "/a/b/app.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [f]: `var x = 1`,
                "/a/b/package.json": `{ "dependencies": { "co } }`,
            });

            const cachePath = "/a/cache/";
            const commander = {
                path: cachePath + "node_modules/@types/commander/index.d.ts",
                content: "export let x: number"
            };

            const installer = new Installer(host, { globalTypingsCacheLocation: cachePath, typesRegistry: createTypesRegistry("commander") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, ["@types/commander"], [commander], cb);
                    }
                });

            const service = createProjectService(host, { typingsInstaller: installer });
            service.openClientFile(f);

            installer.checkPendingCommands(/*expectedCount*/ 0);

            host.vfs.writeFileSync("/a/b/package.json", `{ "dependencies": { "commander": "0.0.2" } }`);

            host.checkTimeoutQueueLengthAndRun(2); // To refresh the project and refresh inferred projects

            // expected install request
            installer.installAll(/*expectedCount*/ 1);

            host.checkTimeoutQueueLengthAndRun(2);

            service.checkNumberOfProjects({ inferredProjects: 1 });
            checkProjectActualFiles(service.inferredProjects[0], [f, commander.path]);
            installWorkerSpy.revoke();
        });

        it("should install typings for unresolved imports", () => {
            const file = "/a/b/app.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                "/a/b/app.js":
                    `import * as fs from "fs";\n` +
                    `import * as commander from "commander";`,
            });

            const cachePath = "/a/cache";
            const node = {
                path: cachePath + "/node_modules/@types/node/index.d.ts",
                content: "export let x: number"
            };
            const commander = {
                path: cachePath + "/node_modules/@types/commander/index.d.ts",
                content: "export let y: string"
            };

            const installer = new Installer(host, { globalTypingsCacheLocation: cachePath, typesRegistry: createTypesRegistry("node", "commander") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, ["@types/node", "@types/commander"], [node, commander], cb);
                    }
                });

            const service = createProjectService(host, { typingsInstaller: installer });
            service.openClientFile(file);

            service.checkNumberOfProjects({ inferredProjects: 1 });
            checkProjectActualFiles(service.inferredProjects[0], [file]);

            installer.installAll(/*expectedCount*/1);

            assert.isTrue(host.fileExists(node.path), "typings for 'node' should be created");
            assert.isTrue(host.fileExists(commander.path), "typings for 'commander' should be created");

            checkProjectActualFiles(service.inferredProjects[0], [file, node.path, commander.path]);
            installWorkerSpy.revoke();
        });

        it("should pick typing names from non-relative unresolved imports", () => {
            const f1 = "/a/b/app.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [f1]:
                    `import * as a from "foo/a/a";\n` +
                    `import * as b from "foo/a/b";\n` +
                    `import * as c from "foo/a/c";\n` +
                    `import * as d from "@bar/router/";\n` +
                    `import * as e from "@bar/common/shared";\n` +
                    `import * as e from "@bar/common/apps";\n` +
                    `import * as f from "./lib"`,
            });

            const installer = new Installer(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: createTypesRegistry("foo") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, ["foo"], [], cb);
                    }
                });

            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openClientFile(f1);
            projectService.checkNumberOfProjects({ inferredProjects: 1 });

            const proj = projectService.inferredProjects[0];
            proj.updateGraph();

            assert.deepEqual(
                proj.getCachedUnresolvedImportsPerFile_TestOnly().get(<Path>f1),
                ["foo", "foo", "foo", "@bar/router", "@bar/common", "@bar/common"]
            );

            installer.installAll(/*expectedCount*/ 1);
            installWorkerSpy.revoke();
        });

        it("should recompute resolutions after typings are installed", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const session = createSession(host);
            const f = {
                path: "/a/app.js",
                content: `
                import * as fs from "fs";
                import * as cmd from "commander
                `
            };
            const openRequest: server.protocol.OpenRequest = {
                seq: 1,
                type: "request",
                command: server.protocol.CommandTypes.Open,
                arguments: {
                    file: f.path,
                    fileContent: f.content
                }
            };
            session.executeCommand(openRequest);
            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const proj = projectService.inferredProjects[0];
            const version1 = proj.getCachedUnresolvedImportsPerFile_TestOnly().getVersion();

            // make a change that should not affect the structure of the program
            const changeRequest: server.protocol.ChangeRequest = {
                seq: 2,
                type: "request",
                command: server.protocol.CommandTypes.Change,
                arguments: {
                    file: f.path,
                    insertString: "\nlet x = 1;",
                    line: 2,
                    offset: 0,
                    endLine: 2,
                    endOffset: 0
                }
            };
            session.executeCommand(changeRequest);
            host.checkTimeoutQueueLengthAndRun(2); // This enqueues the updategraph and refresh inferred projects
            const version2 = proj.getCachedUnresolvedImportsPerFile_TestOnly().getVersion();
            assert.notEqual(version1, version2, "set of unresolved imports should change");
        });
    });

    describe("Validate package name:", () => {
        it("name cannot be too long", () => {
            let packageName = "a";
            for (let i = 0; i < 8; i++) {
                packageName += packageName;
            }
            assert.equal(validatePackageName(packageName), PackageNameValidationResult.NameTooLong);
        });
        it("name cannot start with dot", () => {
            assert.equal(validatePackageName(".foo"), PackageNameValidationResult.NameStartsWithDot);
        });
        it("name cannot start with underscore", () => {
            assert.equal(validatePackageName("_foo"), PackageNameValidationResult.NameStartsWithUnderscore);
        });
        it("scoped packages not supported", () => {
            assert.equal(validatePackageName("@scope/bar"), PackageNameValidationResult.ScopedPackagesNotSupported);
        });
        it("non URI safe characters are not supported", () => {
            assert.equal(validatePackageName("  scope  "), PackageNameValidationResult.NameContainsNonURISafeCharacters);
            assert.equal(validatePackageName("; say ‘Hello from TypeScript!’ #"), PackageNameValidationResult.NameContainsNonURISafeCharacters);
            assert.equal(validatePackageName("a/b/c"), PackageNameValidationResult.NameContainsNonURISafeCharacters);
        });
    });

    describe("Invalid package names", () => {
        it("should not be installed", () => {
            const f1 = "/a/b/app.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [f1]: `let x = 1`,
                "/a/b/package.json": `{ "dependencies": { "; say ‘Hello from TypeScript!’ #": "0.0.x" } }`,
            });

            const messages: string[] = [];
            const installer = new Installer(host, { globalTypingsCacheLocation: "/tmp" }, { isEnabled: () => true, writeLine: msg => messages.push(msg) });
            const installWorkerSpy = spy(installer, "installWorker");

            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openClientFile(f1);

            installer.checkPendingCommands(/*expectedCount*/ 0);
            assert.isTrue(messages.indexOf("Package name '; say ‘Hello from TypeScript!’ #' contains non URI safe characters") > 0, "should find package with invalid name");

            installWorkerSpy
                .verify(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), Times.none())
                .revoke();
        });
    });

    describe("discover typings", () => {
        const emptySafeList = emptyMap;

        it("should use mappings from safe list", () => {
            const app = "/a/b/app.js";
            const jquery = "/a/b/jquery.js";
            const chroma = "/a/b/chroma.min.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [app]: ``,
                [jquery]: ``,
                [chroma]: ``,
            });

            const safeList = createMapFromTemplate({ jquery: "jquery", chroma: "chroma-js" });

            // const host = createServerHost([app, jquery, chroma]);
            const logger = trackingLogger();
            const result = JsTyping.discoverTypings(host, logger.log, [app, jquery, chroma], getDirectoryPath(<Path>app), safeList, emptyMap, { enable: true }, emptyArray);
            const finish = logger.finish();
            assert.deepEqual(finish, [
                'Inferred typings from file names: ["jquery","chroma-js"]',
                "Inferred typings from unresolved imports: []",
                'Result: {"cachedTypingPaths":[],"newTypingNames":["jquery","chroma-js"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}',
            ], finish.join("\r\n"));
            assert.deepEqual(result.newTypingNames, ["jquery", "chroma-js"]);
        });

        it("should return node for core modules", () => {
            const f = "/a/b/app.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [f]: ``,
            });

            const cache = createMap<string>();

            for (const name of JsTyping.nodeCoreModuleList) {
                const logger = trackingLogger();
                const result = JsTyping.discoverTypings(host, logger.log, [f], getDirectoryPath(<Path>f), emptySafeList, cache, { enable: true }, [name, "somename"]);
                assert.deepEqual(logger.finish(), [
                    'Inferred typings from unresolved imports: ["node","somename"]',
                    'Result: {"cachedTypingPaths":[],"newTypingNames":["node","somename"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}',
                ]);
                assert.deepEqual(result.newTypingNames.sort(), ["node", "somename"]);
            }
        });

        it("should use cached locations", () => {
            const f = "/a/b/app.js";
            const node = "/a/b/node.d.ts";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [f]: ``,
                [node]: ``,
            });

            const cache = createMapFromTemplate<string>({ node });
            const logger = trackingLogger();
            const result = JsTyping.discoverTypings(host, logger.log, [f], getDirectoryPath(<Path>f), emptySafeList, cache, { enable: true }, ["fs", "bar"]);
            assert.deepEqual(logger.finish(), [
                'Inferred typings from unresolved imports: ["node","bar"]',
                'Result: {"cachedTypingPaths":["/a/b/node.d.ts"],"newTypingNames":["bar"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}',
            ]);
            assert.deepEqual(result.cachedTypingPaths, [node]);
            assert.deepEqual(result.newTypingNames, ["bar"]);
        });

        it("should search only 2 levels deep", () => {
            const app = "/app.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [app]: "",
                "/node_modules/a/package.json": `{ "name": "a" }`,
                "/node_modules/a/b/package.json": `{ "name": "b" }`,
            });

            const cache = createMap<string>();
            const logger = trackingLogger();
            const result = JsTyping.discoverTypings(host, logger.log, [app], getDirectoryPath(<Path>app), emptySafeList, cache, { enable: true }, /*unresolvedImports*/ []);
            assert.deepEqual(logger.finish(), [
                'Searching for typing names in /node_modules; all files: ["/node_modules/a/package.json"]',
                '    Found package names: ["a"]',
                "Inferred typings from unresolved imports: []",
                'Result: {"cachedTypingPaths":[],"newTypingNames":["a"],"filesToWatch":["/bower_components","/node_modules"]}',
            ]);
            assert.deepEqual(result, {
                cachedTypingPaths: [],
                newTypingNames: ["a"], // But not "b"
                filesToWatch: ["/bower_components", "/node_modules"],
            });
        });
    });

    describe("telemetry events", () => {
        it("should be received", () => {
            const f1 = "/a/app.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [f1]: ``,
                "/a/package.json": `{ "dependencies": { "commander": "1.0.0" } }`,
            });

            const cachePath = "/a/cache/";
            const commander = {
                path: cachePath + "node_modules/@types/commander/index.d.ts",
                content: "export let x: number"
            };

            const installer = new Installer(host, { globalTypingsCacheLocation: cachePath, typesRegistry: createTypesRegistry("commander") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, ["@types/commander"], [commander], cb);
                    }
                });
            const sendResponseSpy = spy(installer, "sendResponse")
                .setup(_ => _(Arg.is(response => response.kind === server.EventBeginInstallTypes)))
                .setup(_ => _(Arg.is(response => response.kind === server.EventEndInstallTypes)))
                .setup(_ => _(Arg.any()), { fallback: true });

            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openClientFile(f1);

            installer.installAll(/*expectedCount*/ 1);

            installWorkerSpy.revoke();
            sendResponseSpy
                .verify(_ => _(Arg.is(response => response.kind === server.EventEndInstallTypes &&
                    response.packagesToInstall.length === 1 &&
                    response.packagesToInstall[0] === typingsName("commander"))))
                .revoke();

            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [f1, commander.path]);
        });
    });

    describe("progress notifications", () => {
        it("should be sent for success", () => {
            const f1 = "/a/app.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [f1]: ``,
                "/a/package.json": `{ "dependencies": { "commander": "1.0.0" } }`,
            });

            const cachePath = "/a/cache/";
            const commander = {
                path: cachePath + "node_modules/@types/commander/index.d.ts",
                content: "export let x: number"
            };

            let beginEvent: server.BeginInstallTypes;
            let endEvent: server.EndInstallTypes;
            const installer = new Installer(host, { globalTypingsCacheLocation: cachePath, typesRegistry: createTypesRegistry("commander") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, ["@types/commander"], [commander], cb);
                    }
                });
            const sendResponseSpy = spy(installer, "sendResponse")
                .setup(_ => _(Arg.is(response => response.kind === server.EventBeginInstallTypes)), { callback: response => { beginEvent = response; } })
                .setup(_ => _(Arg.is(response => response.kind === server.EventEndInstallTypes)), { callback: response => { endEvent = response; } })
                .setup(_ => _(Arg.any()), { fallback: true });

            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openClientFile(f1);

            installer.installAll(/*expectedCount*/ 1);

            installWorkerSpy.revoke();
            sendResponseSpy
                .verify(_ => _(Arg.is(response => response.kind === server.EventBeginInstallTypes)))
                .verify(_ => _(Arg.is(response => response.kind === server.EventEndInstallTypes)))
                .revoke();

            assert.isTrue(beginEvent.eventId === endEvent.eventId);
            assert.isTrue(endEvent.installSuccess);
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [f1, commander.path]);
        });

        it("should be sent for error", () => {
            // const host = createServerHost([f1, packageFile]);
            const f1 = "/a/app.js";
            const host = new fakes.FakeServerHost({ safeList: true }, /*files*/ {
                [f1]: ``,
                "/a/package.json": `{ "dependencies": { "commander": "1.0.0" } }`,
            });

            const cachePath = "/a/cache/";

            let beginEvent: server.BeginInstallTypes;
            let endEvent: server.EndInstallTypes;
            const installer = new Installer(host, { globalTypingsCacheLocation: cachePath, typesRegistry: createTypesRegistry("commander") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, "", [], cb);
                    }
                });
            const sendResponseSpy = spy(installer, "sendResponse")
                .setup(_ => _(Arg.is(response => response.kind === server.EventBeginInstallTypes)), { callback: response => { beginEvent = response; } })
                .setup(_ => _(Arg.is(response => response.kind === server.EventEndInstallTypes)), { callback: response => { endEvent = response; } })
                .setup(_ => _(Arg.any()), { fallback: true });

            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openClientFile(f1);

            installer.installAll(/*expectedCount*/ 1);

            installWorkerSpy.revoke();
            sendResponseSpy
                .verify(_ => _(Arg.is(response => response.kind === server.EventBeginInstallTypes)))
                .verify(_ => _(Arg.is(response => response.kind === server.EventEndInstallTypes)))
                .revoke();

            assert.isTrue(beginEvent.eventId === endEvent.eventId);
            assert.isFalse(endEvent.installSuccess);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [f1]);
        });
    });
}
