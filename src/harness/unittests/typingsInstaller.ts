/// <reference path="../harness.ts" />
/// <reference path="./tsserverProjectSystem.ts" />
/// <reference path="../../server/typingsInstaller/typingsInstaller.ts" />

namespace ts.projectSystem {
    describe("typings installer", () => {
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
            const installer = new TestTypingsInstaller("/a/data/", host);
            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = projectService.configuredProjects[0];
            checkProjectActualFiles(p, [file1.path]);

            assert(host.fileExists(combinePaths(installer.globalTypingsCacheLocation, "package.json")));

            installer.runPostInstallActions(t => {
                assert.deepEqual(t, ["jquery"]);
                host.createFileOrFolder(jquery, /*createParentDirectory*/ true);
                return ["@types/jquery"];
            });
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
            const installer = new TestTypingsInstaller("/a/data/", host);

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const p = projectService.inferredProjects[0];
            checkProjectActualFiles(p, [file1.path]);

            assert(host.fileExists(combinePaths(installer.globalTypingsCacheLocation, "package.json")));

            installer.runPostInstallActions(t => {
                assert.deepEqual(t, ["jquery"]);
                host.createFileOrFolder(jquery, /*createParentDirectory*/ true);
                return ["@types/jquery"];
            });
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
                runInstall(cachePath: string, typingsToInstall: string[], postInstallAction: (installedTypings: string[]) => void): void {
                    assert.deepEqual(typingsToInstall, ["node"]);
                    runInstallIsCalled = true;
                    super.runInstall(cachePath, typingsToInstall, postInstallAction);
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
            const installer = new TestTypingsInstaller("/a/data/", host);

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

            installer.runPostInstallActions(t => {
                assert.deepEqual(t, ["lodash", "react"]);
                host.createFileOrFolder(lodash, /*createParentDirectory*/ true);
                host.createFileOrFolder(react, /*createParentDirectory*/ true);
                return ["@types/lodash", "@types/react"];
            });

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
            let runPostInstallIsCalled = false;
            const installer = new (class extends TestTypingsInstaller {
                constructor() {
                    super("/a/data/", host);
                }
                enqueueInstallTypingsRequest(project: server.Project, typingOptions: TypingOptions) {
                    enqueueIsCalled = true;
                    super.enqueueInstallTypingsRequest(project, typingOptions);
                }
                runInstall(cachePath: string, typingsToInstall: string[], postInstallAction: (installedTypings: string[]) => void): void {
                    runInstallIsCalled = true;
                    super.runInstall(cachePath, typingsToInstall, postInstallAction);
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

            installer.runPostInstallActions(t => {
                runPostInstallIsCalled = true;
                return [];
            });

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path]);
            assert.isFalse(enqueueIsCalled, "expected 'enqueueIsCalled' to be false");
            assert.isFalse(runInstallIsCalled, "expected 'runInstallIsCalled' to be false");
            assert.isFalse(runPostInstallIsCalled, "expected 'runPostInstallIsCalled' to be false");
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
            const installer = new TestTypingsInstaller("/a/data/", host);

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

            installer.runPostInstallActions(t => {
                assert.deepEqual(t, ["jquery", "moment", "express", "commander" ]);
                host.createFileOrFolder(commander, /*createParentDirectory*/ true);
                host.createFileOrFolder(express, /*createParentDirectory*/ true);
                host.createFileOrFolder(jquery, /*createParentDirectory*/ true);
                host.createFileOrFolder(moment, /*createParentDirectory*/ true);
                return ["@types/commander", "@types/express", "@types/jquery", "@types/moment"];
            });

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(p, [file1.path, file2.path, file3.path, commander.path, express.path, jquery.path, moment.path]);
        });
    });
}