/// <reference path="../harness.ts" />
/// <reference path="./tsserverProjectSystem.ts" />
/// <reference path="../../server/typingsInstaller/typingsInstaller.ts" />

namespace ts.projectSystem {
    describe("typingsInstaller", () => {
        function execHelper(self: TestTypingsInstaller, host: TestServerHost, installedTypings: string[], typingFiles: FileOrFolder[], prefix: string, cb: (err: Error, stdout: string, stderr: string) => void): boolean {
            let execSuper = true;
            switch (prefix) {
                case "npm install":
                    for (const file of typingFiles) {
                        host.createFileOrFolder(file, /*createParentDirectory*/ true);
                    }
                    break;
                case "npm ls":
                    self.addPostExecAction(installedTypings, cb);
                    execSuper = false;
                    break;
                default:
                    break;
            }
            return execSuper;
        }
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
                    typingOptions: {
                        enableAutoDiscovery: true
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
            const installer = new (class extends TestTypingsInstaller {
                constructor() {
                    super("/a/data/", host);
                }
                execAsync(prefix: string, command: string, cwd: string, requestId: number, cb: (err: Error, stdout: string, stderr: string) => void): void {
                    const installedTypings = ["@types/jquery"];
                    const typingFiles = [jquery];
                    if (execHelper(this, host, installedTypings, typingFiles, prefix, cb)) {
                        super.execAsync(prefix, command, cwd, requestId, cb);
                    }
                }
            })();

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = projectService.configuredProjects[0];
            checkProjectActualFiles(p, [file1.path]);

            assert(host.fileExists(combinePaths(installer.globalTypingsCacheLocation, "package.json")));

            installer.runPostExecActions();

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
            const installer = new (class extends TestTypingsInstaller {
                constructor() {
                    super("/a/data/", host);
                }
                execAsync(prefix: string, command: string, cwd: string, requestId: number, cb: (err: Error, stdout: string, stderr: string) => void): void {
                    const installedTypings = ["@types/jquery"];
                    const typingFiles = [jquery];
                    if (execHelper(this, host, installedTypings, typingFiles, prefix, cb)) {
                        super.execAsync(prefix, command, cwd, requestId, cb);
                    }
                }
            })();

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const p = projectService.inferredProjects[0];
            checkProjectActualFiles(p, [file1.path]);

            assert(host.fileExists(combinePaths(installer.globalTypingsCacheLocation, "package.json")));

            installer.runPostExecActions();

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(p, [file1.path, jquery.path]);
        });

        it("external project - no typing options, no .d.ts/js files", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const host = createServerHost([file1]);
            const installer = new (class extends TestTypingsInstaller {
                constructor() {
                    super("", host);
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
            // by default auto discovery will kick in if project contain only .js/.d.ts files
            // in this case project contain only ts files - no auto discovery
            projectService.checkNumberOfProjects({ externalProjects: 1 });
        });

        it("external project - no autoDiscovery in typing options, no .d.ts/js files", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const host = createServerHost([file1]);
            const installer = new (class extends TestTypingsInstaller {
                constructor() {
                    super("", host);
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
                typingOptions: { include: ["jquery"] }
            });
            // by default auto discovery will kick in if project contain only .js/.d.ts files
            // in this case project contain only ts files - no auto discovery even if typing options is set
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
            let runInstallIsCalled = false;
            const installer = new (class extends TestTypingsInstaller {
                constructor() {
                    super("", host);
                }
                enqueueInstallTypingsRequest(project: server.Project, typingOptions: TypingOptions) {
                    enqueueIsCalled = true;
                    super.enqueueInstallTypingsRequest(project, typingOptions);
                }
                execAsync(prefix: string, command: string, cwd: string, requestId: number, cb: (err: Error, stdout: string, stderr: string) => void): void {
                    const installedTypings = ["@types/jquery"];
                    const typingFiles = [jquery];
                    if (execHelper(this, host, installedTypings, typingFiles, prefix, cb)) {
                        super.execAsync(prefix, command, cwd, requestId, cb);
                    }
                    if (prefix === "npm install") {
                        runInstallIsCalled = true;
                    }
                }
            })();

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: {},
                rootFiles: [toExternalFile(file1.path)],
                typingOptions: { enableAutoDiscovery: true, include: ["node"] }
            });

            installer.runPostExecActions();

            // autoDiscovery is set in typing options - use it even if project contains only .ts files
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            assert.isTrue(enqueueIsCalled, "expected 'enqueueIsCalled' to be true");
            assert.isTrue(runInstallIsCalled, "expected 'runInstallIsCalled' to be true");
        });

        it("external project - no typing options, with only js, jsx, d.ts files", () => {
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
            const installer = new (class extends TestTypingsInstaller {
                constructor() {
                    super("/a/data/", host);
                }
                execAsync(prefix: string, command: string, cwd: string, requestId: number, cb: (err: Error, stdout: string, stderr: string) => void): void {
                    const installedTypings = ["@types/lodash", "@types/react"];
                    const typingFiles = [lodash, react];
                    if (execHelper(this, host, installedTypings, typingFiles, prefix, cb)) {
                        super.execAsync(prefix, command, cwd, requestId, cb);
                    }
                }
            })();

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(file1.path), toExternalFile(file2.path), toExternalFile(file3.path)],
                typingOptions: {}
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path, file3.path]);

            installer.runPostExecActions();

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path, file3.path, lodash.path, react.path]);
        });

        it("external project - no typing options, with js & ts files", () => {
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
            let runInstallIsCalled = false;
            const installer = new (class extends TestTypingsInstaller {
                constructor() {
                    super("/a/data/", host);
                }
                enqueueInstallTypingsRequest(project: server.Project, typingOptions: TypingOptions) {
                    enqueueIsCalled = true;
                    super.enqueueInstallTypingsRequest(project, typingOptions);
                }
                execAsync(prefix: string, command: string, cwd: string, requestId: number, cb: (err: Error, stdout: string, stderr: string) => void): void {
                    const installedTypings: string[] = [];
                    const typingFiles: FileOrFolder[] = [];
                    if (execHelper(this, host, installedTypings, typingFiles, prefix, cb)) {
                        super.execAsync(prefix, command, cwd, requestId, cb);
                    }
                    if (prefix === "npm install") {
                        runInstallIsCalled = true;
                    }
                }
            })();

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(file1.path), toExternalFile(file2.path)],
                typingOptions: {}
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path]);

            installer.runPostExecActions();

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path]);
            assert.isFalse(enqueueIsCalled, "expected 'enqueueIsCalled' to be false");
            assert.isFalse(runInstallIsCalled, "expected 'runInstallIsCalled' to be false");
        });

        it("external project - with typing options, with only js, d.ts files", () => {
            // Tests:
            // 1. Safelist matching, typing options includes/excludes and package.json typings are all acquired
            // 2. Types for safelist matches are not included when they also appear in the typing option exclude list
            // 3. Multiple includes and excludes are respected in typing options
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
            const installer = new (class extends TestTypingsInstaller {
                constructor() {
                    super("/a/data/", host);
                }
                execAsync(prefix: string, command: string, cwd: string, requestId: number, cb: (err: Error, stdout: string, stderr: string) => void): void {
                    const installedTypings = ["@types/commander", "@types/express", "@types/jquery", "@types/moment"];
                    const typingFiles = [commander, express, jquery, moment];
                    if (execHelper(this, host, installedTypings, typingFiles, prefix, cb)) {
                        super.execAsync(prefix, command, cwd, requestId, cb);
                    }
                }
            })();

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(file1.path), toExternalFile(file2.path), toExternalFile(file3.path)],
                typingOptions: { include: ["jquery", "moment"], exclude: ["lodash"] }
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path, file3.path]);

            installer.runPostExecActions();

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path, file3.path, commander.path, express.path, jquery.path, moment.path]);
        });

        it("Throttle - delayed typings to install", () => {
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
                        express: "^3.1.0",
                        cordova: "1.0.0",
                        grunt: "1.0.0",
                        gulp: "1.0.0",
                        forever: "1.0.0",
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
            const cordova = {
                path: "/a/data/node_modules/@types/cordova/index.d.ts",
                content: "declare const cordova: { x: number }"
            };
            const grunt = {
                path: "/a/data/node_modules/@types/grunt/index.d.ts",
                content: "declare const grunt: { x: number }"
            };
            const gulp = {
                path: "/a/data/node_modules/@types/gulp/index.d.ts",
                content: "declare const gulp: { x: number }"
            };
           const forever = {
                path: "/a/data/node_modules/@types/forever/index.d.ts",
                content: "declare const forever: { x: number }"
            };

            let npmViewCount = 0;
            let npmInstallCount = 0;
            const host = createServerHost([file1, file2, file3, packageJson]);
            const installer = new (class extends TestTypingsInstaller {
                constructor() {
                    super("/a/data/", host);
                }
                execAsync(prefix: string, command: string, cwd: string, requestId: number, cb: (err: Error, stdout: string, stderr: string) => void): void {
                    if (prefix === "npm view") {
                        npmViewCount++;
                    }
                     if (prefix === "npm install") {
                        npmInstallCount++;
                    }
                    const installedTypings = ["@types/commander", "@types/express", "@types/jquery", "@types/moment", "@types/lodash", "@types/cordova", "@types/grunt", "@types/gulp", "@types/forever"];
                    const typingFiles = [commander, express, jquery, moment, lodash, cordova, grunt, gulp, forever];
                    if (execHelper(this, host, installedTypings, typingFiles, prefix, cb)) {
                        super.execAsync(prefix, command, cwd, requestId, cb);
                    }
                }
            })();

            const projectFileName = "/a/app/test.csproj";
            const projectService = createProjectService(host, { typingsInstaller: installer });
            projectService.openExternalProject({
                projectFileName,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(file1.path), toExternalFile(file2.path), toExternalFile(file3.path)],
                typingOptions: { include: ["jquery", "moment"] }
            });

            const p = projectService.externalProjects[0];
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path, file3.path]);
            // The npm view count should be 5 even though there are 9 typings to acquire.
            // The throttle limit has been reached so no more execAsync requests will be 
            // queued until these have been processed. 
            assert.isTrue(npmViewCount === 5);
            assert.isTrue(npmInstallCount === 0);

            installer.runPostExecActions();

            assert.isTrue(npmViewCount === 9);
            assert.isTrue(npmInstallCount === 1);
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path, file3.path, commander.path, express.path, jquery.path, moment.path, lodash.path, cordova.path, grunt.path, gulp.path, forever.path]);
        });

        it("Throttle - delayed run install requests", () => {
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
            const cordova = {
                path: "/a/data/node_modules/@types/cordova/index.d.ts",
                content: "declare const cordova: { x: number }"
            };
            const grunt = {
                path: "/a/data/node_modules/@types/grunt/index.d.ts",
                content: "declare const grunt: { x: number }"
            };
            const gulp = {
                path: "/a/data/node_modules/@types/gulp/index.d.ts",
                content: "declare const gulp: { x: number }"
            };
           const forever = {
                path: "/a/data/node_modules/@types/forever/index.d.ts",
                content: "declare const forever: { x: number }"
            };

            let npmViewCount = 0;
            let npmInstallCount = 0;
            let hasRunInstall2Typings = false;
            const host = createServerHost([file1, file2, file3]);
            const installer = new (class extends TestTypingsInstaller {
                constructor() {
                    super("/a/data/", host);
                }
                execAsync(prefix: string, command: string, cwd: string, requestId: number, cb: (err: Error, stdout: string, stderr: string) => void): void {
                    switch (prefix) {
                        case "npm view":
                            if (command.match("grunt|gulp|forever")) {
                                hasRunInstall2Typings = true;
                            }
                            npmViewCount++;
                            break;
                        case "npm install":
                            npmInstallCount++;
                            break;
                    }

                    let installedTypings: string[];
                    let typingFiles: FileOrFolder[];
                    if (npmInstallCount <= 1) {
                        installedTypings = ["@types/commander", "@types/express", "@types/jquery", "@types/moment", "@types/lodash", "@types/cordova"];
                        typingFiles = [commander, express, jquery, moment, lodash, cordova];
                    }
                    else {
                        installedTypings = ["@types/grunt", "@types/gulp", "@types/forever"];
                        typingFiles = [grunt, gulp, forever];
                    }

                    if (execHelper(this, host, installedTypings, typingFiles, prefix, cb)) {
                        super.execAsync(prefix, command, cwd, requestId, cb);
                    }
                }
            })();

            // Create project #1 with 6 typings
            const projectService = createProjectService(host, { typingsInstaller: installer });
            const projectFileName1 = "/a/app/test1.csproj";
            projectService.openExternalProject({
                projectFileName: projectFileName1,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(file1.path), toExternalFile(file2.path), toExternalFile(file3.path)],
                typingOptions: { include: ["jquery", "moment", "express", "cordova"] }
            });

            // Create project #2 with 3 typings
            const projectFileName2 = "/a/app/test2.csproj";
            projectService.openExternalProject({
                projectFileName: projectFileName2,
                options: { allowJS: true, moduleResolution: ModuleResolutionKind.NodeJs },
                rootFiles: [toExternalFile(file3.path)],
                typingOptions: { include: ["grunt", "gulp", "forever"] }
            });

            const p1 = projectService.externalProjects[0];
            const p2 = projectService.externalProjects[1];
            projectService.checkNumberOfProjects({ externalProjects: 2 });
            checkProjectActualFiles(p1, [file1.path, file2.path, file3.path]);
            checkProjectActualFiles(p2, [file3.path]);

            // The npm view count should be 5 even though there are 9 typings to acquire.
            // The throttle limit has been reached so no more run execAsync requests will be 
            // queued until these have been processed. Assert that typings from the second 
            // run install request have not been queued.
            assert.isTrue(npmViewCount === 5);
            assert.isTrue(npmInstallCount === 0);
            assert.isFalse(hasRunInstall2Typings);

            installer.runPostExecActions();

            assert.isTrue(npmViewCount === 9);
            assert.isTrue(npmInstallCount === 2);
            assert.isTrue(hasRunInstall2Typings);
            checkProjectActualFiles(p1, [file1.path, file2.path, file3.path, commander.path, express.path, jquery.path, moment.path, lodash.path, cordova.path]);
            checkProjectActualFiles(p2, [file3.path, grunt.path, gulp.path, forever.path]);
        });
    });
}