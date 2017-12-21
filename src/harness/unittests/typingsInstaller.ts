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
                host.vfs.writeFile(file.path, file.content);
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
            const host = new fakes.FakeServerHost();
            const f1 = host.vfs.addFile("/a/app.js", `const c = require('./config');`);
            const f2 = host.vfs.addFile("/a/config.js", `export let x = 1`);
            const config = host.vfs.addFile("/a/jsconfig.json", `{ "typeAcquisition": { "enable": true }, "compilerOptions": { "moduleResolution": "commonjs } }`);
            host.vfs.addFile("/cache/node_modules/@types/config/index.d.ts", `export let y: number;`);

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("config"), globalTypingsCacheLocation: "/cache" });
            const installWorkerSpy = spy(installer, "installWorker");

            const service = createProjectService(host, { typingsInstaller: installer });
            service.openClientFile(f1.path);
            service.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(service, 0), [f1.path, f2.path, config.path]);
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

            const host = new fakes.FakeServerHost({ safeList: true });
            const file1 = host.vfs.addFile("/a/b/app.js", ``);
            const tsconfig = host.vfs.addFile("/a/b/tsconfig.json", `{ "compilerOptions": { "allowJs": true }, "typeAcquisition": { "enable": true } }`);
            host.vfs.addFile("/a/b/package.json", `{ "name": "test", "dependencies": { "jquery": "^3.1.0" } }`);

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
            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(p, [file1.path, tsconfig.path]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectActualFiles(p, [file1.path, jquery.path, tsconfig.path]);

            installWorkerSpy.revoke();
        });

        it("inferred project (typings installed)", () => {
            const jquery = {
                path: "/a/data/node_modules/@types/jquery/index.d.ts",
                content: "declare const $: { x: number }"
            };

            const host = new fakes.FakeServerHost({ safeList: true });
            const file1 = host.vfs.addFile("/a/b/app.js", ``);
            host.vfs.addFile("/a/b/package.json", `{ "name": "test", "dependencies": { "jquery": "^3.1.0" } }`);

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
            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const p = projectService.inferredProjects[0];
            checkProjectActualFiles(p, [file1.path]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(p, [file1.path, jquery.path]);

            installWorkerSpy.revoke();
        });

        it("external project - no type acquisition, no .d.ts/js files", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const file1 = host.vfs.addFile("/a/b/app.ts", ``);

            const installer = new Installer(host);
            const enqueueInstallTypingsRequestSpy = spy(installer, "enqueueInstallTypingsRequest");

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: {},
                rootFiles: [toExternalFile(file1.path)]
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
            const host = new fakes.FakeServerHost({ safeList: true });
            const appJs = host.vfs.addFile("/a/b/app.js", "");
            host.vfs.addFile("/node_modules/@types/node/index.d.ts", "declare var node;");

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("node") });
            const installWorkerSpy = spy(installer, "installWorker");

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: {},
                rootFiles: [toExternalFile(appJs.path)],
                typeAcquisition: { enable: true, include: ["node"] }
            });

            installer.checkPendingCommands(/*expectedCount*/ 0);
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            installWorkerSpy
                .verify(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), Times.none(), "nothing should get installed")
                .revoke();
        });

        it("external project - no auto in typing acquisition, no .d.ts/js files", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const file1 = host.vfs.addFile("/a/b/app.ts", ``);

            const installer = new Installer(host, { typesRegistry: createTypesRegistry("jquery") });
            const enqueueInstallTypingsRequestSpy = spy(installer, "enqueueInstallTypingsRequest");

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: {},
                rootFiles: [toExternalFile(file1.path)],
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
            const host = new fakes.FakeServerHost({ safeList: true });
            const file1 = host.vfs.addFile("/a/b/app.ts", ``);

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
                rootFiles: [toExternalFile(file1.path)],
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
            const host = new fakes.FakeServerHost({ safeList: true });
            const lodashJs = host.vfs.addFile("/a/b/lodash.js", ``);
            const file2Jsx = host.vfs.addFile("/a/b/file2.jsx", ``);
            const file3Dts = host.vfs.addFile("/a/b/file3.d.ts", ``);
            host.vfs.addFile(customTypesMap.path, customTypesMap.content);

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
                rootFiles: [toExternalFile(lodashJs.path), toExternalFile(file2Jsx.path), toExternalFile(file3Dts.path)],
                typeAcquisition: { }
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file2Jsx.path, file3Dts.path]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file2Jsx.path, file3Dts.path, lodashDts.path, reactDts.path]);

            installWorkerSpy.revoke();
        });

        it("external project - type acquisition with enable: false", () => {
            // Tests:
            // Exclude

            const host = new fakes.FakeServerHost({ safeList: true });
            const jqueryJs = host.vfs.addFile("/a/b/jquery.js", "");

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
                rootFiles: [toExternalFile(jqueryJs.path)],
                typeAcquisition: { enable: false }
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            checkProjectActualFiles(p, [jqueryJs.path]);

            installer.checkPendingCommands(/*expectedCount*/ 0);
            installWorkerSpy.revoke();
        });
        it("external project - no type acquisition, with js & ts files", () => {
            // Tests:
            // 1. No typings are included for JS projects when the project contains ts files
            const host = new fakes.FakeServerHost({ safeList: true });
            const jqueryJs = host.vfs.addFile("/a/b/jquery.js", ``);
            const file2Ts = host.vfs.addFile("/a/b/file2.ts", ``);

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
                rootFiles: [toExternalFile(jqueryJs.path), toExternalFile(file2Ts.path)],
                typeAcquisition: {}
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            checkProjectActualFiles(p, [jqueryJs.path, file2Ts.path]);

            installer.checkPendingCommands(/*expectedCount*/ 0);

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [jqueryJs.path, file2Ts.path]);
            installWorkerSpy.revoke();
        });

        it("external project - with type acquisition, with only js, d.ts files", () => {
            // Tests:
            // 1. Safelist matching, type acquisition includes/excludes and package.json typings are all acquired
            // 2. Types for safelist matches are not included when they also appear in the type acquisition exclude list
            // 3. Multiple includes and excludes are respected in type acquisition
            const host = new fakes.FakeServerHost({ safeList: true });
            const lodashJs = host.vfs.addFile("/a/b/lodash.js", ``);
            const commanderJs = host.vfs.addFile("/a/b/commander.js", ``);
            const file3Dts = host.vfs.addFile("/a/b/file3.d.ts", ``);
            host.vfs.addFile("/a/b/package.json", `{ "name": "test", "dependencies": { "express": "^3.1.0" } }`);
            host.vfs.addFile(customTypesMap.path, customTypesMap.content);

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
                rootFiles: [toExternalFile(lodashJs.path), toExternalFile(commanderJs.path), toExternalFile(file3Dts.path)],
                typeAcquisition: { enable: true, include: ["jquery", "moment"], exclude: ["lodash"] }
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file3Dts.path]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            // Commander: Existed as a JS file
            // JQuery: Specified in 'include'
            // Moment: Specified in 'include'
            // Express: Specified in package.json
            // lodash: Excluded (not present)
            checkProjectActualFiles(p, [file3Dts.path, commander.path, jquery.path, moment.path, express.path]);
            installWorkerSpy.revoke();
        });

        it("Throttle - delayed typings to install", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const lodashJs = host.vfs.addFile("/a/b/lodash.js", ``);
            const commanderJs = host.vfs.addFile("/a/b/commander.js", ``);
            const file3 = host.vfs.addFile("/a/b/file3.d.ts", ``);
            host.vfs.addFile("/a/b/package.json", `{ "name": "test", "dependencies": { "express": "^3.1.0" } }`);
            host.vfs.addFile(customTypesMap.path, customTypesMap.content);

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
                rootFiles: [toExternalFile(lodashJs.path), toExternalFile(commanderJs.path), toExternalFile(file3.path)],
                typeAcquisition: { include: ["jquery", "moment"] }
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file3.path]);
            installer.checkPendingCommands(/*expectedCount*/ 1);
            installer.executePendingCommands();
            // expected all typings file to exist
            for (const f of typingFiles) {
                assert.isTrue(host.fileExists(f.path), `expected file ${f.path} to exist`);
            }
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file3.path, commander.path, express.path, jquery.path, moment.path, lodash.path]);
            installWorkerSpy.revoke();
        });

        it("Throttle - delayed run install requests", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const lodashJs = host.vfs.addFile("/a/b/lodash.js", ``);
            const commanderJs = host.vfs.addFile("/a/b/commander.js", ``);
            const file3 = host.vfs.addFile("/a/b/file3.d.ts", ``);
            host.vfs.addFile(customTypesMap.path, customTypesMap.content);

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
                rootFiles: [toExternalFile(lodashJs.path), toExternalFile(commanderJs.path), toExternalFile(file3.path)],
                typeAcquisition: { include: ["jquery", "cordova"] }
            });

            installer.checkPendingCommands(/*expectedCount*/ 1);
            assert.equal(installer.pendingRunRequests.length, 0, "expect no throttled requests");

            // Create project #2 with 2 typings
            const projectFileName2 = "/a/app/test2.csproj";
            projectService.openExternalProject({
                projectFileName: projectFileName2,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(file3.path)],
                typeAcquisition: { include: ["grunt", "gulp"] }
            });
            assert.equal(installer.pendingRunRequests.length, 1, "expect one throttled request");

            const p1 = projectService.externalProjects[0];
            const p2 = projectService.externalProjects[1];
            projectService.checkNumberOfProjects({ externalProjects: 2 });
            checkProjectActualFiles(p1, [file3.path]);
            checkProjectActualFiles(p2, [file3.path]);

            installer.executePendingCommands();

            // expected one install request from the second project
            installer.checkPendingCommands(/*expectedCount*/ 1);
            assert.equal(installer.pendingRunRequests.length, 0, "expected no throttled requests");

            installer.executePendingCommands();
            host.checkTimeoutQueueLengthAndRun(3); // for 2 projects and 1 refreshing inferred project
            checkProjectActualFiles(p1, [file3.path, commander.path, jquery.path, lodash.path, cordova.path]);
            checkProjectActualFiles(p2, [file3.path, grunt.path, gulp.path]);
            installWorkerSpy.revoke();
        });

        it("configured projects discover from node_modules", () => {
            const jqueryDTS = {
                path: "/tmp/node_modules/@types/jquery/index.d.ts",
                content: ""
            };
            const host = new fakes.FakeServerHost({ safeList: true });
            const app = host.vfs.addFile("/app.js", ``);
            const jsconfig = host.vfs.addFile("/jsconfig.json", `{}`);
            host.vfs.addFile("/node_modules/jquery/index.js", ``);
            host.vfs.addFile("/node_modules/jquery/package.json", `{ "name": "jquery" }`);
            // Should not search deeply in node_modules.
            host.vfs.addFile("/node_modules/jquery/nested/package.json", `{ "name": "nested" }`);

            const installer = new Installer(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: createTypesRegistry("jquery", "nested") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.array([`@types/jquery@ts${versionMajorMinor}`]), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, ["@types/jquery"], [jqueryDTS], cb);
                    }
                });

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(app.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(p, [app.path, jsconfig.path]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectActualFiles(p, [app.path, jqueryDTS.path, jsconfig.path]);
            installWorkerSpy
                .verify(_ => _(Arg.any(), Arg.not(Arg.array([`@types/jquery@ts${versionMajorMinor}`])), Arg.any(), Arg.any()), Times.none())
                .revoke();
        });

        it("configured projects discover from bower_components", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const app = host.vfs.addFile("/app.js", ``);
            const jsconfig = host.vfs.addFile("/jsconfig.json", `{}`);
            host.vfs.addFile("/bower_components/jquery/index.js", ``);
            host.vfs.addFile("/bower_components/jquery/package.json", `{ "name": "jquery" }`);

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
            projectService.openClientFile(app.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(p, [app.path, jsconfig.path]);
            host.checkWatchedFiles([jsconfig.path, "/bower_components", "/node_modules", "/.ts/lib.d.ts"]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectActualFiles(p, [app.path, jqueryDTS.path, jsconfig.path]);
            installWorkerSpy.revoke();
        });

        it("configured projects discover from bower.json", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const app = host.vfs.addFile("/app.js", ``);
            const jsconfig = host.vfs.addFile("/jsconfig.json", `{}`);
            host.vfs.addFile("/bower.json", `{ "dependencies": { "jquery": "^3.1.0" } }`);

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
            projectService.openClientFile(app.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(p, [app.path, jsconfig.path]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectActualFiles(p, [app.path, jqueryDTS.path, jsconfig.path]);
            installWorkerSpy.revoke();
        });

        it("Malformed package.json should be watched", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const f = host.vfs.addFile("/a/b/app.js", `var x = 1`);
            host.vfs.addFile("/a/b/package.json", `{ "dependencies": { "co } }`);

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
            service.openClientFile(f.path);

            installer.checkPendingCommands(/*expectedCount*/ 0);

            host.vfs.writeFile("/a/b/package.json", `{ "dependencies": { "commander": "0.0.2" } }`);

            host.checkTimeoutQueueLengthAndRun(2); // To refresh the project and refresh inferred projects

            // expected install request
            installer.installAll(/*expectedCount*/ 1);

            host.checkTimeoutQueueLengthAndRun(2);

            service.checkNumberOfProjects({ inferredProjects: 1 });
            checkProjectActualFiles(service.inferredProjects[0], [f.path, commander.path]);
            installWorkerSpy.revoke();
        });

        it("should install typings for unresolved imports", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const file = host.vfs.addFile("/a/b/app.js",
                `import * as fs from "fs";\n` +
                `import * as commander from "commander";`);

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
            service.openClientFile(file.path);

            service.checkNumberOfProjects({ inferredProjects: 1 });
            checkProjectActualFiles(service.inferredProjects[0], [file.path]);

            installer.installAll(/*expectedCount*/1);

            assert.isTrue(host.fileExists(node.path), "typings for 'node' should be created");
            assert.isTrue(host.fileExists(commander.path), "typings for 'commander' should be created");

            checkProjectActualFiles(service.inferredProjects[0], [file.path, node.path, commander.path]);
            installWorkerSpy.revoke();
        });

        it("should pick typing names from non-relative unresolved imports", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const f1 = host.vfs.addFile("/a/b/app.js",
                `import * as a from "foo/a/a";\n` +
                `import * as b from "foo/a/b";\n` +
                `import * as c from "foo/a/c";\n` +
                `import * as d from "@bar/router/";\n` +
                `import * as e from "@bar/common/shared";\n` +
                `import * as e from "@bar/common/apps";\n` +
                `import * as f from "./lib"`);

            const installer = new Installer(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: createTypesRegistry("foo") });
            const installWorkerSpy = spy(installer, "installWorker")
                .setup(_ => _(Arg.any(), Arg.any(), Arg.any(), Arg.any()), {
                    callback: (_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction) => {
                        executeCommand(installer, host, ["foo"], [], cb);
                    }
                });

            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ inferredProjects: 1 });

            const proj = projectService.inferredProjects[0];
            proj.updateGraph();

            assert.deepEqual(
                proj.getCachedUnresolvedImportsPerFile_TestOnly().get(<Path>f1.path),
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
            const host = new fakes.FakeServerHost({ safeList: true });
            const f1 = host.vfs.addFile("/a/b/app.js", `let x = 1`);
            host.vfs.addFile("/a/b/package.json", `{ "dependencies": { "; say ‘Hello from TypeScript!’ #": "0.0.x" } }`);

            const messages: string[] = [];
            const installer = new Installer(host, { globalTypingsCacheLocation: "/tmp" }, { isEnabled: () => true, writeLine: msg => messages.push(msg) });
            const installWorkerSpy = spy(installer, "installWorker");

            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openClientFile(f1.path);

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
            const host = new fakes.FakeServerHost({ safeList: true });
            const app = host.vfs.addFile("/a/b/app.js", ``);
            const jquery = host.vfs.addFile("/a/b/jquery.js", ``);
            const chroma = host.vfs.addFile("/a/b/chroma.min.js", ``);

            const safeList = createMapFromTemplate({ jquery: "jquery", chroma: "chroma-js" });

            // const host = createServerHost([app, jquery, chroma]);
            const logger = trackingLogger();
            const result = JsTyping.discoverTypings(host, logger.log, [app.path, jquery.path, chroma.path], getDirectoryPath(<Path>app.path), safeList, emptyMap, { enable: true }, emptyArray);
            const finish = logger.finish();
            assert.deepEqual(finish, [
                'Inferred typings from file names: ["jquery","chroma-js"]',
                "Inferred typings from unresolved imports: []",
                'Result: {"cachedTypingPaths":[],"newTypingNames":["jquery","chroma-js"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}',
            ], finish.join("\r\n"));
            assert.deepEqual(result.newTypingNames, ["jquery", "chroma-js"]);
        });

        it("should return node for core modules", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const f = host.vfs.addFile("/a/b/app.js", ``);

            const cache = createMap<string>();

            for (const name of JsTyping.nodeCoreModuleList) {
                const logger = trackingLogger();
                const result = JsTyping.discoverTypings(host, logger.log, [f.path], getDirectoryPath(<Path>f.path), emptySafeList, cache, { enable: true }, [name, "somename"]);
                assert.deepEqual(logger.finish(), [
                    'Inferred typings from unresolved imports: ["node","somename"]',
                    'Result: {"cachedTypingPaths":[],"newTypingNames":["node","somename"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}',
                ]);
                assert.deepEqual(result.newTypingNames.sort(), ["node", "somename"]);
            }
        });

        it("should use cached locations", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const f = host.vfs.addFile("/a/b/app.js", ``);
            const node = host.vfs.addFile("/a/b/node.d.ts", ``);

            const cache = createMapFromTemplate<string>({ node: node.path });
            const logger = trackingLogger();
            const result = JsTyping.discoverTypings(host, logger.log, [f.path], getDirectoryPath(<Path>f.path), emptySafeList, cache, { enable: true }, ["fs", "bar"]);
            assert.deepEqual(logger.finish(), [
                'Inferred typings from unresolved imports: ["node","bar"]',
                'Result: {"cachedTypingPaths":["/a/b/node.d.ts"],"newTypingNames":["bar"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}',
            ]);
            assert.deepEqual(result.cachedTypingPaths, [node.path]);
            assert.deepEqual(result.newTypingNames, ["bar"]);
        });

        it("should search only 2 levels deep", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const app = host.vfs.addFile("/app.js");
            host.vfs.addFile("/node_modules/a/package.json", `{ "name": "a" }`);
            host.vfs.addFile("/node_modules/a/b/package.json", `{ "name": "b" }`);

            const cache = createMap<string>();
            const logger = trackingLogger();
            const result = JsTyping.discoverTypings(host, logger.log, [app.path], getDirectoryPath(<Path>app.path), emptySafeList, cache, { enable: true }, /*unresolvedImports*/ []);
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
            const host = new fakes.FakeServerHost({ safeList: true });
            const f1 = host.vfs.addFile("/a/app.js", ``);
            host.vfs.addFile("/a/package.json", `{ "dependencies": { "commander": "1.0.0" } }`);

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
            projectService.openClientFile(f1.path);

            installer.installAll(/*expectedCount*/ 1);

            installWorkerSpy.revoke();
            sendResponseSpy
                .verify(_ => _(Arg.is(response => response.kind === server.EventEndInstallTypes &&
                    response.packagesToInstall.length === 1 &&
                    response.packagesToInstall[0] === typingsName("commander"))))
                .revoke();

            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [f1.path, commander.path]);
        });
    });

    describe("progress notifications", () => {
        it("should be sent for success", () => {
            const host = new fakes.FakeServerHost({ safeList: true });
            const f1 = host.vfs.addFile("/a/app.js", ``);
            host.vfs.addFile("/a/package.json", `{ "dependencies": { "commander": "1.0.0" } }`);

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
            projectService.openClientFile(f1.path);

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
            checkProjectActualFiles(projectService.inferredProjects[0], [f1.path, commander.path]);
        });

        it("should be sent for error", () => {
            // const host = createServerHost([f1, packageFile]);
            const host = new fakes.FakeServerHost({ safeList: true });
            const f1 = host.vfs.addFile("/a/app.js", ``);
            host.vfs.addFile("/a/package.json", `{ "dependencies": { "commander": "1.0.0" } }`);

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
            projectService.openClientFile(f1.path);

            installer.installAll(/*expectedCount*/ 1);

            installWorkerSpy.revoke();
            sendResponseSpy
                .verify(_ => _(Arg.is(response => response.kind === server.EventBeginInstallTypes)))
                .verify(_ => _(Arg.is(response => response.kind === server.EventEndInstallTypes)))
                .revoke();

            assert.isTrue(beginEvent.eventId === endEvent.eventId);
            assert.isFalse(endEvent.installSuccess);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [f1.path]);
        });
    });
}
