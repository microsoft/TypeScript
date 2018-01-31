/// <reference path="../harness.ts" />
/// <reference path="./tsserverProjectSystem.ts" />
/// <reference path="../fakes.ts" />

namespace ts.projectSystem {
    describe("project telemetry", () => {
        it("does nothing for inferred project", () => {
            const host = new fakes.FakeServerHost({}, /*files*/ {
                "/a.js": "",
            });
            const et = new TestServerEventManager(host);
            et.service.openClientFile("/a.js");
            et.hasZeroEvent(ts.server.ProjectInfoTelemetryEvent);
        });

        it("only sends an event once", () => {
            const host = new fakes.FakeServerHost({}, /*files*/ {
                "/a/a.ts": ``,
                "/b.ts": ``,
                "/a/tsconfig.json": `{}`,
            });

            const et = new TestServerEventManager(host);
            et.service.openClientFile("/a/a.ts");
            et.assertProjectInfoTelemetryEvent({}, "/a/tsconfig.json");

            et.service.closeClientFile("/a/a.ts");
            checkNumberOfProjects(et.service, { configuredProjects: 1 });

            et.service.openClientFile("/b.ts");
            checkNumberOfProjects(et.service, { inferredProjects: 1 });

            et.hasZeroEvent(ts.server.ProjectInfoTelemetryEvent);

            et.service.openClientFile("/a/a.ts");
            checkNumberOfProjects(et.service, { configuredProjects: 1, inferredProjects: 1 });

            et.hasZeroEvent(ts.server.ProjectInfoTelemetryEvent);
        });

        it("counts files by extension", () => {
            const compilerOptions: ts.CompilerOptions = { allowJs: true };
            const host = new fakes.FakeServerHost({}, /*files*/ {
                "/src/ts.ts": ``,
                "/src/tsx.tsx": ``,
                "/src/moo.ts": ``,
                "/src/dts.d.ts": ``,
                "/src/jsx.jsx": ``,
                "/src/js.js": ``,
                "/src/badExtension.badExtension": ``,
                "/bin/ts.js": ``,
                "/tsconfig.json": JSON.stringify({ compilerOptions, include: ["src"] }),
            });

            const et = new TestServerEventManager(host);
            et.service.openClientFile("/src/ts.ts");
            et.assertProjectInfoTelemetryEvent({
                fileStats: { ts: 2, tsx: 1, js: 1, jsx: 1, dts: 1 },
                compilerOptions,
                include: true,
            });
        });

        it("works with external project", () => {
            const host = new fakes.FakeServerHost({}, /*files*/ {
                "/a.ts": ``,
            });

            const et = new TestServerEventManager(host);
            const compilerOptions: ts.server.protocol.CompilerOptions = { strict: true };

            const projectFileName = "/hunter2/foo.csproj";

            open();

            // TODO: Apparently compilerOptions is mutated, so have to repeat it here!
            et.assertProjectInfoTelemetryEvent({
                projectId: core.sha1("/hunter2/foo.csproj"),
                compilerOptions: { strict: true },
                compileOnSave: true,
                // These properties can't be present for an external project, so they are undefined instead of false.
                extends: undefined,
                files: undefined,
                include: undefined,
                exclude: undefined,
                configFileName: "other",
                projectType: "external",
            });

            // Also test that opening an external project only sends an event once.

            et.service.closeExternalProject(projectFileName);
            checkNumberOfProjects(et.service, { externalProjects: 0 });

            open();
            assert.equal(et.getEvents().length, 0);

            function open(): void {
                et.service.openExternalProject({
                    rootFiles: toExternalFiles(["/a.ts"]),
                    options: compilerOptions,
                    projectFileName,
                });
                checkNumberOfProjects(et.service, { externalProjects: 1 });
            }
        });

        it("does not expose paths", () => {
            const compilerOptions: ts.CompilerOptions = {
                project: "",
                outFile: "hunter2.js",
                outDir: "hunter2",
                rootDir: "hunter2",
                baseUrl: "hunter2",
                rootDirs: ["hunter2"],
                typeRoots: ["hunter2"],
                types: ["hunter2"],
                sourceRoot: "hunter2",
                mapRoot: "hunter2",
                jsxFactory: "hunter2",
                out: "hunter2",
                reactNamespace: "hunter2",
                charset: "hunter2",
                locale: "hunter2",
                declarationDir: "hunter2",
                paths: {
                    "*": ["hunter2"],
                },

                // Boolean / number options get through
                declaration: true,

                // List of string enum gets through -- but only if legitimately a member of the enum
                lib: ["es6", "dom", "hunter2"],

                // Sensitive data doesn't get through even if sent to an option of safe type
                checkJs: "hunter2" as any as boolean,
            };
            const safeCompilerOptions: ts.CompilerOptions = {
                project: "",
                outFile: "",
                outDir: "",
                rootDir: "",
                baseUrl: "",
                rootDirs: [""],
                typeRoots: [""],
                types: [""],
                sourceRoot: "",
                mapRoot: "",
                jsxFactory: "",
                out: "",
                reactNamespace: "",
                charset: "",
                locale: "",
                declarationDir: "",
                paths: "" as any,

                declaration: true,

                lib: ["es6", "dom"],
            };
            (compilerOptions as any).unknownCompilerOption = "hunter2"; // These are always ignored.

            const host = new fakes.FakeServerHost({}, /*files*/ {
                "/a.ts": ``,
                "/tsconfig.json": JSON.stringify({ compilerOptions, files: ["/a.ts"] }),
            });

            const et = new TestServerEventManager(host);
            et.service.openClientFile("/a.ts");

            et.assertProjectInfoTelemetryEvent({
                compilerOptions: safeCompilerOptions,
                files: true,
            });
        });

        it("sends telemetry for extends, files, include, exclude, and compileOnSave", () => {
            const host = new fakes.FakeServerHost({}, /*files*/ {
                "/hunter2/a.ts": ``,
                "/tsconfig.json": JSON.stringify({
                    compilerOptions: {},
                    extends: "hunter2.json",
                    files: ["hunter2/a.ts"],
                    include: ["hunter2"],
                    exclude: ["hunter2"],
                    compileOnSave: true,
                })
            });

            const et = new TestServerEventManager(host);
            et.service.openClientFile("/hunter2/a.ts");
            et.assertProjectInfoTelemetryEvent({
                extends: true,
                files: true,
                include: true,
                exclude: true,
                compileOnSave: true,
            });
        });

        const autoJsCompilerOptions = {
            // Apparently some options are added by default.
            allowJs: true,
            allowSyntheticDefaultImports: true,
            maxNodeModuleJsDepth: 2,
            skipLibCheck: true,
            noEmit: true
        };

        it("sends telemetry for typeAcquisition settings", () => {
            const host = new fakes.FakeServerHost({}, /*files*/ {
                "/a.js": ``,
                "/jsconfig.json": JSON.stringify({
                    compilerOptions: {},
                    typeAcquisition: {
                        enable: true,
                        enableAutoDiscovery: false,
                        include: ["hunter2", "hunter3"],
                        exclude: [],
                    },
                })
            });
            const et = new TestServerEventManager(host);
            et.service.openClientFile("/a.js");
            et.assertProjectInfoTelemetryEvent({
                projectId: core.sha1("/jsconfig.json"),
                fileStats: fileStats({ js: 1 }),
                compilerOptions: autoJsCompilerOptions,
                typeAcquisition: {
                    enable: true,
                    include: true,
                    exclude: false,
                },
                configFileName: "jsconfig.json",
            });
        });

        it("detects whether language service was disabled", () => {
            const host = new fakes.FakeServerHost({}, /*files*/ {
                "/a.js": ``,
                "/jsconfig.json": `{}`,
            });

            const et = new TestServerEventManager(host);
            et.host.getFileSize = () => server.maxProgramSizeForNonTsFiles + 1;
            et.service.openClientFile("/a.js");
            et.getEvent<server.ProjectLanguageServiceStateEvent>(server.ProjectLanguageServiceStateEvent);
            et.assertProjectInfoTelemetryEvent({
                projectId: core.sha1("/jsconfig.json"),
                fileStats: fileStats({ js: 1 }),
                compilerOptions: autoJsCompilerOptions,
                configFileName: "jsconfig.json",
                typeAcquisition: {
                    enable: true,
                    include: false,
                    exclude: false,
                },
                languageServiceEnabled: false,
            });
        });
    });
}
