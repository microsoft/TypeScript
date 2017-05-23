/// <reference path="../harness.ts" />
/// <reference path="./tsserverProjectSystem.ts" />
/// <reference path="../../server/typingsInstaller/typingsInstaller.ts" />

namespace ts.projectSystem {
    import TI = server.typingsInstaller;

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

    function executeCommand(self: Installer, host: TestServerHost, installedTypings: string[] | string, typingFiles: FileOrFolder[], cb: TI.RequestCompletedAction): void {
        self.addPostExecAction(installedTypings, success => {
            for (const file of typingFiles) {
                host.createFileOrFolder(file, /*createParentDirectory*/ true);
            }
            cb(success);
        });
    }

    import typingsName = server.typingsInstaller.typingsName;

    describe("local module", () => {
        it("should not be picked up", () => {
            const f1 = {
                path: "/a/app.js",
                content: "const c = require('./config');"
            };
            const f2 = {
                path: "/a/config.js",
                content: "export let x = 1"
            };
            const typesCache = "/cache";
            const typesConfig = {
                path: typesCache + "/node_modules/@types/config/index.d.ts",
                content: "export let y: number;"
            };
            const config = {
                path: "/a/jsconfig.json",
                content: JSON.stringify({
                    compilerOptions: { moduleResolution: "commonjs" },
                    typeAcquisition: { enable: true }
                })
            };
            const host = createServerHost([f1, f2, config, typesConfig]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { typesRegistry: createTypesRegistry("config"), globalTypingsCacheLocation: typesCache });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, _cb: server.typingsInstaller.RequestCompletedAction) {
                    assert(false, "should not be called");
                }
            })();
            const service = createProjectService(host, { typingsInstaller: installer });
            service.openClientFile(f1.path);
            service.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(service.configuredProjects[0], [f1.path, f2.path]);
            installer.installAll(0);
        });
    });

    describe("typingsInstaller", () => {
        it("configured projects (typings installed) 1", () => {
            const file1 = {
                path: "/a/b/app.js",
                content: ""
            };
            const tsconfig = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        allowJs: true
                    },
                    typeAcquisition: {
                        enable: true
                    }
                })
            };
            const packageJson = {
                path: "/a/b/package.json",
                content: JSON.stringify({
                    name: "test",
                    dependencies: {
                        jquery: "^3.1.0"
                    }
                })
            };

            const jquery = {
                path: "/a/data/node_modules/@types/jquery/index.d.ts",
                content: "declare const $: { x: number }"
            };
            const host = createServerHost([file1, tsconfig, packageJson]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { typesRegistry: createTypesRegistry("jquery") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: server.typingsInstaller.RequestCompletedAction) {
                    const installedTypings = ["@types/jquery"];
                    const typingFiles = [jquery];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
            })();

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = projectService.configuredProjects[0];
            checkProjectActualFiles(p, [file1.path]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(p, [file1.path, jquery.path]);
        });

        it("inferred project (typings installed)", () => {
            const file1 = {
                path: "/a/b/app.js",
                content: ""
            };
            const packageJson = {
                path: "/a/b/package.json",
                content: JSON.stringify({
                    name: "test",
                    dependencies: {
                        jquery: "^3.1.0"
                    }
                })
            };

            const jquery = {
                path: "/a/data/node_modules/@types/jquery/index.d.ts",
                content: "declare const $: { x: number }"
            };
            const host = createServerHost([file1, packageJson]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { typesRegistry: createTypesRegistry("jquery") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: server.typingsInstaller.RequestCompletedAction) {
                    const installedTypings = ["@types/jquery"];
                    const typingFiles = [jquery];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
            })();

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const p = projectService.inferredProjects[0];
            checkProjectActualFiles(p, [file1.path]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(p, [file1.path, jquery.path]);
        });

        it("external project - no type acquisition, no .d.ts/js files", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const host = createServerHost([file1]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host);
                }
                enqueueInstallTypingsRequest() {
                    assert(false, "auto discovery should not be enabled");
                }
            })();

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
        });

        it("external project - no auto in typing acquisition, no .d.ts/js files", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const host = createServerHost([file1]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { typesRegistry: createTypesRegistry("jquery") });
                }
                enqueueInstallTypingsRequest() {
                    assert(false, "auto discovery should not be enabled");
                }
            })();

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
        });

        it("external project - autoDiscovery = true, no .d.ts/js files", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const jquery = {
                path: "/a/data/node_modules/@types/jquery/index.d.ts",
                content: "declare const $: { x: number }"
            };
            const host = createServerHost([file1]);
            let enqueueIsCalled = false;
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { typesRegistry: createTypesRegistry("jquery") });
                }
                enqueueInstallTypingsRequest(project: server.Project, typeAcquisition: TypeAcquisition, unresolvedImports: server.SortedReadonlyArray<string>) {
                    enqueueIsCalled = true;
                    super.enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction): void {
                    const installedTypings = ["@types/node"];
                    const typingFiles = [jquery];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
            })();

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: {},
                rootFiles: [toExternalFile(file1.path)],
                typeAcquisition: { enable: true, include: ["jquery"] }
            });

            assert.isTrue(enqueueIsCalled, "expected enqueueIsCalled to be true");
            installer.installAll(/*expectedCount*/ 1);

            // auto is set in type acquisition - use it even if project contains only .ts files
            projectService.checkNumberOfProjects({ externalProjects: 1 });
        });

        it("external project - no type acquisition, with only js, jsx, d.ts files", () => {
            // Tests:
            // 1. react typings are installed for .jsx
            // 2. loose files names are matched against safe list for typings if
            //    this is a JS project (only js, jsx, d.ts files are present)
            const file1 = {
                path: "/a/b/lodash.js",
                content: ""
            };
            const file2 = {
                path: "/a/b/file2.jsx",
                content: ""
            };
            const file3 = {
                path: "/a/b/file3.d.ts",
                content: ""
            };
            const react = {
                path: "/a/data/node_modules/@types/react/index.d.ts",
                content: "declare const react: { x: number }"
            };
            const lodash = {
                path: "/a/data/node_modules/@types/lodash/index.d.ts",
                content: "declare const lodash: { x: number }"
            };

            const host = createServerHost([file1, file2, file3]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { typesRegistry: createTypesRegistry("lodash", "react") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction): void {
                    const installedTypings = ["@types/lodash", "@types/react"];
                    const typingFiles = [lodash, react];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
            })();

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(file1.path), toExternalFile(file2.path), toExternalFile(file3.path)],
                typeAcquisition: {}
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path, file3.path]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path, file3.path, lodash.path, react.path]);
        });

        it("external project - no type acquisition, with js & ts files", () => {
            // Tests:
            // 1. No typings are included for JS projects when the project contains ts files
            const file1 = {
                path: "/a/b/jquery.js",
                content: ""
            };
            const file2 = {
                path: "/a/b/file2.ts",
                content: ""
            };

            const host = createServerHost([file1, file2]);
            let enqueueIsCalled = false;
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { typesRegistry: createTypesRegistry("jquery") });
                }
                enqueueInstallTypingsRequest(project: server.Project, typeAcquisition: TypeAcquisition, unresolvedImports: server.SortedReadonlyArray<string>) {
                    enqueueIsCalled = true;
                    super.enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction): void {
                    const installedTypings: string[] = [];
                    const typingFiles: FileOrFolder[] = [];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
            })();

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(file1.path), toExternalFile(file2.path)],
                typeAcquisition: {}
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file2.path]);

            installer.checkPendingCommands(/*expectedCount*/ 0);

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file2.path]);
        });

        it("external project - with type acquisition, with only js, d.ts files", () => {
            // Tests:
            // 1. Safelist matching, type acquisition includes/excludes and package.json typings are all acquired
            // 2. Types for safelist matches are not included when they also appear in the type acquisition exclude list
            // 3. Multiple includes and excludes are respected in type acquisition
            const file1 = {
                path: "/a/b/lodash.js",
                content: ""
            };
            const file2 = {
                path: "/a/b/commander.js",
                content: ""
            };
            const file3 = {
                path: "/a/b/file3.d.ts",
                content: ""
            };
            const packageJson = {
                path: "/a/b/package.json",
                content: JSON.stringify({
                    name: "test",
                    dependencies: {
                        express: "^3.1.0"
                    }
                })
            };

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

            const host = createServerHost([file1, file2, file3, packageJson]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { typesRegistry: createTypesRegistry("jquery", "commander", "moment", "express") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction): void {
                    const installedTypings = ["@types/commander", "@types/express", "@types/jquery", "@types/moment"];
                    const typingFiles = [commander, express, jquery, moment];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
            })();

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(file1.path), toExternalFile(file2.path), toExternalFile(file3.path)],
                typeAcquisition: { include: ["jquery", "moment"], exclude: ["lodash"] }
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path, file3.path]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path, file3.path, commander.path, express.path, jquery.path, moment.path]);
        });

        it("Throttle - delayed typings to install", () => {
            const lodashJs = {
                path: "/a/b/lodash.js",
                content: ""
            };
            const commanderJs = {
                path: "/a/b/commander.js",
                content: ""
            };
            const file3 = {
                path: "/a/b/file3.d.ts",
                content: ""
            };
            const packageJson = {
                path: "/a/b/package.json",
                content: JSON.stringify({
                    name: "test",
                    dependencies: {
                        express: "^3.1.0"
                    }
                })
            };

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
            const host = createServerHost([lodashJs, commanderJs, file3, packageJson]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { throttleLimit: 3, typesRegistry: createTypesRegistry("commander", "express", "jquery", "moment", "lodash") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction): void {
                    const installedTypings = ["@types/commander", "@types/express", "@types/jquery", "@types/moment", "@types/lodash"];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
            })();

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
            checkProjectActualFiles(p, [lodashJs.path, commanderJs.path, file3.path]);
            installer.checkPendingCommands(/*expectedCount*/ 1);
            installer.executePendingCommands();
            // expected all typings file to exist
            for (const f of typingFiles) {
                assert.isTrue(host.fileExists(f.path), `expected file ${f.path} to exist`);
            }

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [lodashJs.path, commanderJs.path, file3.path, commander.path, express.path, jquery.path, moment.path, lodash.path]);
        });

        it("Throttle - delayed run install requests", () => {
            const lodashJs = {
                path: "/a/b/lodash.js",
                content: ""
            };
            const commanderJs = {
                path: "/a/b/commander.js",
                content: ""
            };
            const file3 = {
                path: "/a/b/file3.d.ts",
                content: ""
            };

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

            const host = createServerHost([lodashJs, commanderJs, file3]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { throttleLimit: 1, typesRegistry: createTypesRegistry("commander", "jquery", "lodash", "cordova", "gulp", "grunt") });
                }
                installWorker(_requestId: number, args: string[], _cwd: string, cb: TI.RequestCompletedAction): void {
                    let typingFiles: (FileOrFolder & { typings: string })[] = [];
                    if (args.indexOf(typingsName("commander")) >= 0) {
                        typingFiles = [commander, jquery, lodash, cordova];
                    }
                    else {
                        typingFiles = [grunt, gulp];
                    }
                    executeCommand(this, host, typingFiles.map(f => f.typings), typingFiles, cb);
                }
            })();

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
            checkProjectActualFiles(p1, [lodashJs.path, commanderJs.path, file3.path]);
            checkProjectActualFiles(p2, [file3.path]);

            installer.executePendingCommands();

            // expected one install request from the second project
            installer.checkPendingCommands(/*expectedCount*/ 1);
            assert.equal(installer.pendingRunRequests.length, 0, "expected no throttled requests");

            installer.executePendingCommands();

            checkProjectActualFiles(p1, [lodashJs.path, commanderJs.path, file3.path, commander.path, jquery.path, lodash.path, cordova.path]);
            checkProjectActualFiles(p2, [file3.path, grunt.path, gulp.path]);
        });

        it("configured projects discover from node_modules", () => {
            const app = {
                path: "/app.js",
                content: ""
            };
            const jsconfig = {
                path: "/jsconfig.json",
                content: JSON.stringify({})
            };
            const jquery = {
                path: "/node_modules/jquery/index.js",
                content: ""
            };
            const jqueryPackage = {
                path: "/node_modules/jquery/package.json",
                content: JSON.stringify({ name: "jquery" })
            };
            const jqueryDTS = {
                path: "/tmp/node_modules/@types/jquery/index.d.ts",
                content: ""
            };
            const host = createServerHost([app, jsconfig, jquery, jqueryPackage]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: createTypesRegistry("jquery") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: server.typingsInstaller.RequestCompletedAction) {
                    const installedTypings = ["@types/jquery"];
                    const typingFiles = [jqueryDTS];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
            })();

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(app.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = projectService.configuredProjects[0];
            checkProjectActualFiles(p, [app.path]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(p, [app.path, jqueryDTS.path]);
        });

        it("configured projects discover from bower_components", () => {
            const app = {
                path: "/app.js",
                content: ""
            };
            const jsconfig = {
                path: "/jsconfig.json",
                content: JSON.stringify({})
            };
            const jquery = {
                path: "/bower_components/jquery/index.js",
                content: ""
            };
            const jqueryPackage = {
                path: "/bower_components/jquery/package.json",
                content: JSON.stringify({ name: "jquery" })
            };
            const jqueryDTS = {
                path: "/tmp/node_modules/@types/jquery/index.d.ts",
                content: ""
            };
            const host = createServerHost([app, jsconfig, jquery, jqueryPackage]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: createTypesRegistry("jquery") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: server.typingsInstaller.RequestCompletedAction) {
                    const installedTypings = ["@types/jquery"];
                    const typingFiles = [jqueryDTS];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
            })();

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(app.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = projectService.configuredProjects[0];
            checkProjectActualFiles(p, [app.path]);
            checkWatchedFiles(host, [jsconfig.path, "/bower_components", "/node_modules"]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(p, [app.path, jqueryDTS.path]);
        });

        it("configured projects discover from bower.json", () => {
            const app = {
                path: "/app.js",
                content: ""
            };
            const jsconfig = {
                path: "/jsconfig.json",
                content: JSON.stringify({})
            };
            const bowerJson = {
                path: "/bower.json",
                content: JSON.stringify({
                    "dependencies": {
                        "jquery": "^3.1.0"
                    }
                })
            };
            const jqueryDTS = {
                path: "/tmp/node_modules/@types/jquery/index.d.ts",
                content: ""
            };
            const host = createServerHost([app, jsconfig, bowerJson]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: createTypesRegistry("jquery") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: server.typingsInstaller.RequestCompletedAction) {
                    const installedTypings = ["@types/jquery"];
                    const typingFiles = [jqueryDTS];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
            })();

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(app.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = projectService.configuredProjects[0];
            checkProjectActualFiles(p, [app.path]);

            installer.installAll(/*expectedCount*/ 1);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(p, [app.path, jqueryDTS.path]);
        });

        it("Malformed package.json should be watched", () => {
            const f = {
                path: "/a/b/app.js",
                content: "var x = 1"
            };
            const brokenPackageJson = {
                path: "/a/b/package.json",
                content: `{ "dependencies": { "co } }`
            };
            const fixedPackageJson = {
                path: brokenPackageJson.path,
                content: `{ "dependencies": { "commander": "0.0.2" } }`
            };
            const cachePath = "/a/cache/";
            const commander = {
                path: cachePath + "node_modules/@types/commander/index.d.ts",
                content: "export let x: number"
            };
            const host = createServerHost([f, brokenPackageJson]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { globalTypingsCacheLocation: cachePath, typesRegistry: createTypesRegistry("commander") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: server.typingsInstaller.RequestCompletedAction) {
                    const installedTypings = ["@types/commander"];
                    const typingFiles = [commander];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
            })();
            const service = createProjectService(host, { typingsInstaller: installer });
            service.openClientFile(f.path);

            installer.checkPendingCommands(/*expectedCount*/ 0);

            host.reloadFS([f, fixedPackageJson]);
            host.triggerFileWatcherCallback(fixedPackageJson.path, /*removed*/ false);
            // expected install request
            installer.installAll(/*expectedCount*/ 1);

            service.checkNumberOfProjects({ inferredProjects: 1 });
            checkProjectActualFiles(service.inferredProjects[0], [f.path, commander.path]);
        });

        it("should install typings for unresolved imports", () => {
            const file = {
                path: "/a/b/app.js",
                content: `
                import * as fs from "fs";
                import * as commander from "commander";`
            };
            const cachePath = "/a/cache";
            const node = {
                path: cachePath + "/node_modules/@types/node/index.d.ts",
                content: "export let x: number"
            };
            const commander = {
                path: cachePath + "/node_modules/@types/commander/index.d.ts",
                content: "export let y: string"
            };
            const host = createServerHost([file]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { globalTypingsCacheLocation: cachePath, typesRegistry: createTypesRegistry("node", "commander") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: server.typingsInstaller.RequestCompletedAction) {
                    const installedTypings = ["@types/node", "@types/commander"];
                    const typingFiles = [node, commander];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
            })();
            const service = createProjectService(host, { typingsInstaller: installer });
            service.openClientFile(file.path);

            service.checkNumberOfProjects({ inferredProjects: 1 });
            checkProjectActualFiles(service.inferredProjects[0], [file.path]);

            installer.installAll(/*expectedCount*/1);

            assert.isTrue(host.fileExists(node.path), "typings for 'node' should be created");
            assert.isTrue(host.fileExists(commander.path), "typings for 'commander' should be created");

            checkProjectActualFiles(service.inferredProjects[0], [file.path, node.path, commander.path]);
        });

        it("should pick typing names from non-relative unresolved imports", () => {
            const f1 = {
                path: "/a/b/app.js",
                content: `
                import * as a from "foo/a/a";
                import * as b from "foo/a/b";
                import * as c from "foo/a/c";
                import * as d from "@bar/router/";
                import * as e from "@bar/common/shared";
                import * as e from "@bar/common/apps";
                import * as f from "./lib"
                `
            };

            const host = createServerHost([f1]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: createTypesRegistry("foo") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: server.typingsInstaller.RequestCompletedAction) {
                    executeCommand(this, host, ["foo"], [], cb);
                }
            })();
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
        });

        it("cached unresolved typings are not recomputed if program structure did not change", () => {
            const host = createServerHost([]);
            const session = createSession(host);
            const f = {
                path: "/a/app.js",
                content: `
                import * as fs from "fs";
                import * as cmd from "commander
                `
            };
            session.executeCommand(<server.protocol.OpenRequest>{
                seq: 1,
                type: "request",
                command: "open",
                arguments: {
                    file: f.path,
                    fileContent: f.content
                }
            });
            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const proj = projectService.inferredProjects[0];
            const version1 = proj.getCachedUnresolvedImportsPerFile_TestOnly().getVersion();

            // make a change that should not affect the structure of the program
            session.executeCommand(<server.protocol.ChangeRequest>{
                seq: 2,
                type: "request",
                command: "change",
                arguments: {
                    file: f.path,
                    insertString: "\nlet x = 1;",
                    line: 2,
                    offset: 0,
                    endLine: 2,
                    endOffset: 0
                }
            });
            host.checkTimeoutQueueLength(1);
            host.runQueuedTimeoutCallbacks();
            const version2 = proj.getCachedUnresolvedImportsPerFile_TestOnly().getVersion();
            assert.equal(version1, version2, "set of unresolved imports should not change");
        });
    });

    describe("Validate package name:", () => {
        it("name cannot be too long", () => {
            let packageName = "a";
            for (let i = 0; i < 8; i++) {
                packageName += packageName;
            }
            assert.equal(TI.validatePackageName(packageName), TI.PackageNameValidationResult.NameTooLong);
        });
        it("name cannot start with dot", () => {
            assert.equal(TI.validatePackageName(".foo"), TI.PackageNameValidationResult.NameStartsWithDot);
        });
        it("name cannot start with underscore", () => {
            assert.equal(TI.validatePackageName("_foo"), TI.PackageNameValidationResult.NameStartsWithUnderscore);
        });
        it("scoped packages not supported", () => {
            assert.equal(TI.validatePackageName("@scope/bar"), TI.PackageNameValidationResult.ScopedPackagesNotSupported);
        });
        it("non URI safe characters are not supported", () => {
            assert.equal(TI.validatePackageName("  scope  "), TI.PackageNameValidationResult.NameContainsNonURISafeCharacters);
            assert.equal(TI.validatePackageName("; say ‘Hello from TypeScript!’ #"), TI.PackageNameValidationResult.NameContainsNonURISafeCharacters);
            assert.equal(TI.validatePackageName("a/b/c"), TI.PackageNameValidationResult.NameContainsNonURISafeCharacters);
        });
    });

    describe("Invalid package names", () => {
        it("should not be installed", () => {
            const f1 = {
                path: "/a/b/app.js",
                content: "let x = 1"
            };
            const packageJson = {
                path: "/a/b/package.json",
                content: JSON.stringify({
                    "dependencies": {
                        "; say ‘Hello from TypeScript!’ #": "0.0.x"
                    }
                })
            };
            const messages: string[] = [];
            const host = createServerHost([f1, packageJson]);
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { globalTypingsCacheLocation: "/tmp" }, { isEnabled: () => true, writeLine: msg => messages.push(msg) });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, _cb: server.typingsInstaller.RequestCompletedAction) {
                    assert(false, "runCommand should not be invoked");
                }
            })();
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openClientFile(f1.path);

            installer.checkPendingCommands(/*expectedCount*/ 0);
            assert.isTrue(messages.indexOf("Package name '; say ‘Hello from TypeScript!’ #' contains non URI safe characters") > 0, "should find package with invalid name");
        });
    });

    describe("discover typings", () => {
        it("should return node for core modules", () => {
            const f = {
                path: "/a/b/app.js",
                content: ""
            };
            const host = createServerHost([f]);
            const cache = createMap<string>();
            for (const name of JsTyping.nodeCoreModuleList) {
                const result = JsTyping.discoverTypings(host, [f.path], getDirectoryPath(<Path>f.path), /*safeListPath*/ undefined, cache, { enable: true }, [name, "somename"]);
                assert.deepEqual(result.newTypingNames.sort(), ["node", "somename"]);
            }
        });

        it("should use cached locations", () => {
            const f = {
                path: "/a/b/app.js",
                content: ""
            };
            const node = {
                path: "/a/b/node.d.ts",
                content: ""
            };
            const host = createServerHost([f, node]);
            const cache = createMapFromTemplate<string>({ "node": node.path });
            const result = JsTyping.discoverTypings(host, [f.path], getDirectoryPath(<Path>f.path), /*safeListPath*/ undefined, cache, { enable: true }, ["fs", "bar"]);
            assert.deepEqual(result.cachedTypingPaths, [node.path]);
            assert.deepEqual(result.newTypingNames, ["bar"]);
        });
    });

    describe("telemetry events", () => {
        it ("should be received", () => {
            const f1 = {
                path: "/a/app.js",
                content: ""
            };
            const package = {
                path: "/a/package.json",
                content: JSON.stringify({ dependencies: { "commander": "1.0.0" } })
            };
            const cachePath = "/a/cache/";
            const commander = {
                path: cachePath + "node_modules/@types/commander/index.d.ts",
                content: "export let x: number"
            };
            const host = createServerHost([f1, package]);
            let seenTelemetryEvent = false;
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { globalTypingsCacheLocation: cachePath, typesRegistry: createTypesRegistry("commander") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: server.typingsInstaller.RequestCompletedAction) {
                    const installedTypings = ["@types/commander"];
                    const typingFiles = [commander];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
                sendResponse(response: server.SetTypings | server.InvalidateCachedTypings | server.BeginInstallTypes | server.EndInstallTypes) {
                    if (response.kind === server.EventBeginInstallTypes) {
                        return;
                    }
                    if (response.kind === server.EventEndInstallTypes) {
                        assert.deepEqual(response.packagesToInstall, [typingsName("commander")]);
                        seenTelemetryEvent = true;
                        return;
                    }
                    super.sendResponse(response);
                }
            })();
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openClientFile(f1.path);

            installer.installAll(/*expectedCount*/ 1);

            assert.isTrue(seenTelemetryEvent);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [f1.path, commander.path]);
        });
    });

    describe("progress notifications", () => {
        it ("should be sent for success", () => {
            const f1 = {
                path: "/a/app.js",
                content: ""
            };
            const package = {
                path: "/a/package.json",
                content: JSON.stringify({ dependencies: { "commander": "1.0.0" } })
            };
            const cachePath = "/a/cache/";
            const commander = {
                path: cachePath + "node_modules/@types/commander/index.d.ts",
                content: "export let x: number"
            };
            const host = createServerHost([f1, package]);
            let beginEvent: server.BeginInstallTypes;
            let endEvent: server.EndInstallTypes;
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { globalTypingsCacheLocation: cachePath, typesRegistry: createTypesRegistry("commander") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: server.typingsInstaller.RequestCompletedAction) {
                    const installedTypings = ["@types/commander"];
                    const typingFiles = [commander];
                    executeCommand(this, host, installedTypings, typingFiles, cb);
                }
                sendResponse(response: server.SetTypings | server.InvalidateCachedTypings | server.BeginInstallTypes | server.EndInstallTypes) {
                    if (response.kind === server.EventBeginInstallTypes) {
                        beginEvent = response;
                        return;
                    }
                    if (response.kind === server.EventEndInstallTypes) {
                        endEvent = response;
                        return;
                    }
                    super.sendResponse(response);
                }
            })();
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openClientFile(f1.path);

            installer.installAll(/*expectedCount*/ 1);

            assert.isTrue(!!beginEvent);
            assert.isTrue(!!endEvent);
            assert.isTrue(beginEvent.eventId === endEvent.eventId);
            assert.isTrue(endEvent.installSuccess);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [f1.path, commander.path]);
        });

        it ("should be sent for error", () => {
            const f1 = {
                path: "/a/app.js",
                content: ""
            };
            const package = {
                path: "/a/package.json",
                content: JSON.stringify({ dependencies: { "commander": "1.0.0" } })
            };
            const cachePath = "/a/cache/";
            const host = createServerHost([f1, package]);
            let beginEvent: server.BeginInstallTypes;
            let endEvent: server.EndInstallTypes;
            const installer = new (class extends Installer {
                constructor() {
                    super(host, { globalTypingsCacheLocation: cachePath, typesRegistry: createTypesRegistry("commander") });
                }
                installWorker(_requestId: number, _args: string[], _cwd: string, cb: server.typingsInstaller.RequestCompletedAction) {
                    executeCommand(this, host, "", [], cb);
                }
                sendResponse(response: server.SetTypings | server.InvalidateCachedTypings | server.BeginInstallTypes | server.EndInstallTypes) {
                    if (response.kind === server.EventBeginInstallTypes) {
                        beginEvent = response;
                        return;
                    }
                    if (response.kind === server.EventEndInstallTypes) {
                        endEvent = response;
                        return;
                    }
                    super.sendResponse(response);
                }
            })();
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openClientFile(f1.path);

            installer.installAll(/*expectedCount*/ 1);

            assert.isTrue(!!beginEvent);
            assert.isTrue(!!endEvent);
            assert.isTrue(beginEvent.eventId === endEvent.eventId);
            assert.isFalse(endEvent.installSuccess);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [f1.path]);
        });
    });
}