/// <reference path="../harness.ts" />
/// <reference path="./tsserverProjectSystem.ts" />
/// <reference path="../../server/typingsInstaller/typingsInstaller.ts" />

namespace ts.projectSystem {
    describe("typings installer", () => {
        it("configured projects (tsd installed) 1", () => {
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
                path: "/a/data/typings/jquery/jquery.d.ts",
                content: "declare const $: { x: number }"
            };

            const host = createServerHost([file1, tsconfig, packageJson]);
            const installer = new TestTypingsInstaller("/a/data/", host);
            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const p = projectService.configuredProjects[0];
            checkProjectActualFiles(p, [file1.path]);

            assert(host.fileExists(combinePaths(installer.cachePath, "tsd.json")));

            installer.runPostInstallActions(t => {
                assert.deepEqual(t, ["jquery"]);
                host.createFileOrFolder(jquery, /*createParentDirectory*/ true);
                return ["jquery/jquery.d.ts"];
            });
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(p, [file1.path, jquery.path]);
        });

        it("inferred project (tsd installed)", () => {
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
                path: "/a/data/typings/jquery/jquery.d.ts",
                content: "declare const $: { x: number }"
            };
            const host = createServerHost([file1, packageJson]);
            const installer = new TestTypingsInstaller("/a/data/", host);

            const projectService = createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const p = projectService.inferredProjects[0];
            checkProjectActualFiles(p, [file1.path]);

            assert(host.fileExists(combinePaths(installer.cachePath, "tsd.json")));

            installer.runPostInstallActions(t => {
                assert.deepEqual(t, ["jquery"]);
                host.createFileOrFolder(jquery, /*createParentDirectory*/ true);
                return ["jquery/jquery.d.ts"];
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
            let runTsdIsCalled = false;
            const installer = new (class extends TestTypingsInstaller {
                constructor() {
                    super("", host);
                }
                enqueueInstallTypingsRequest(project: server.Project, typingOptions: TypingOptions) {
                    enqueueIsCalled = true;
                    super.enqueueInstallTypingsRequest(project, typingOptions);
                }
                runTsd(cachePath: string, typingsToInstall: string[], postInstallAction: (installedTypings: string[]) => void): void {
                    assert.deepEqual(typingsToInstall, ["node"]);
                    runTsdIsCalled = true;
                    super.runTsd(cachePath, typingsToInstall, postInstallAction);
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
            assert.isTrue(runTsdIsCalled, "expected 'runTsdIsCalled' to be true");
        });
    });
}