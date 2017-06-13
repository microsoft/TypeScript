/// <reference path="../harness.ts" />
/// <reference path="./tsserverProjectSystem.ts" />

namespace ts.projectSystem {
    describe("project telemetry", () => {
        it("does nothing for inferred project", () => {
            const file = makeFile("/a.js");
            const et = new EventTracker([file]);
            et.service.openClientFile(file.path);
            assert.equal(et.getEvents().length, 0);
        });

        it("only sends an event once", () => {
            const file = makeFile("/a.ts");
            const tsconfig = makeFile("/tsconfig.json", {});

            const et = new EventTracker([file, tsconfig]);
            et.service.openClientFile(file.path);
            et.assertProjectInfoTelemetryEvent({});

            et.service.closeClientFile(file.path);
            checkNumberOfProjects(et.service, { configuredProjects: 0 });

            et.service.openClientFile(file.path);
            checkNumberOfProjects(et.service, { configuredProjects: 1 });

            assert.equal(et.getEvents().length, 0);
        });

        it("counts files by extension", () => {
            const files = ["ts.ts", "tsx.tsx", "moo.ts", "dts.d.ts", "jsx.jsx", "js.js", "badExtension.badExtension"].map(f => makeFile(`/src/${f}`));
            const notIncludedFile = makeFile("/bin/ts.js");
            const compilerOptions: ts.CompilerOptions = { allowJs: true };
            const tsconfig = makeFile("/tsconfig.json", { compilerOptions, include: ["src"] });

            const et = new EventTracker([...files, notIncludedFile, tsconfig]);
            et.service.openClientFile(files[0].path);
            et.assertProjectInfoTelemetryEvent({
                fileStats: { ts: 2, tsx: 1, js: 1, jsx: 1, dts: 1 },
                compilerOptions,
                include: true,
            });
        });

        it("works with external project", () => {
            const file1 = makeFile("/a.ts");
            const et = new EventTracker([file1]);
            const compilerOptions: ts.CompilerOptions = { strict: true };

            const projectFileName = "/hunter2/foo.csproj";

            open();

            // TODO: Apparently compilerOptions is mutated, so have to repeat it here!
            et.assertProjectInfoTelemetryEvent({
                projectId: Harness.LanguageService.mockHash("/hunter2/foo.csproj"),
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
                    rootFiles: toExternalFiles([file1.path]),
                    options: compilerOptions,
                    projectFileName: projectFileName,
                });
                checkNumberOfProjects(et.service, { externalProjects: 1 });
            }
        });

        it("does not expose paths", () => {
            const file = makeFile("/a.ts");

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

                checkJs: "" as any as boolean,
            };
            (compilerOptions as any).unknownCompilerOption = "hunter2"; // These are always ignored.
            const tsconfig = makeFile("/tsconfig.json", { compilerOptions, files: ["/a.ts"] });

            const et = new EventTracker([file, tsconfig]);
            et.service.openClientFile(file.path);

            et.assertProjectInfoTelemetryEvent({
                compilerOptions: safeCompilerOptions,
                files: true,
            });
        });

        it("sends telemetry for extends, files, include, exclude, and compileOnSave", () => {
            const file = makeFile("/hunter2/a.ts");
            const tsconfig = makeFile("/tsconfig.json", {
                compilerOptions: {},
                extends: "hunter2.json",
                files: ["hunter2/a.ts"],
                include: ["hunter2"],
                exclude: ["hunter2"],
                compileOnSave: true,
            });

            const et = new EventTracker([tsconfig, file]);
            et.service.openClientFile(file.path);
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
        };

        it("sends telemetry for typeAcquisition settings", () => {
            const file = makeFile("/a.js");
            const jsconfig = makeFile("/jsconfig.json", {
                compilerOptions: {},
                typeAcquisition: {
                    enable: true,
                    enableAutoDiscovery: false,
                    include: ["hunter2", "hunter3"],
                    exclude: [],
                },
            });
            const et = new EventTracker([jsconfig, file]);
            et.service.openClientFile(file.path);
            et.assertProjectInfoTelemetryEvent({
                projectId: Harness.LanguageService.mockHash("/jsconfig.json"),
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
            const file = makeFile("/a.js");
            const tsconfig = makeFile("/jsconfig.json", {});
            const et = new EventTracker([tsconfig, file]);
            et.host.getFileSize = () => server.maxProgramSizeForNonTsFiles + 1;
            et.service.openClientFile(file.path);
            et.getEvent<server.ProjectLanguageServiceStateEvent>(server.ProjectLanguageServiceStateEvent, /*mayBeMore*/ true);
            et.assertProjectInfoTelemetryEvent({
                projectId: Harness.LanguageService.mockHash("/jsconfig.json"),
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

    class EventTracker {
        private events: server.ProjectServiceEvent[] = [];
        readonly service: TestProjectService;
        readonly host: projectSystem.TestServerHost;

        constructor(files: projectSystem.FileOrFolder[]) {
            this.host = createServerHost(files);
            this.service = createProjectService(this.host, {
                eventHandler: event => {
                    this.events.push(event);
                },
            });
        }

        getEvents(): ReadonlyArray<server.ProjectServiceEvent> {
            const events = this.events;
            this.events = [];
            return events;
        }

        assertProjectInfoTelemetryEvent(partial: Partial<server.ProjectInfoTelemetryEventData>): void {
            assert.deepEqual(this.getEvent<server.ProjectInfoTelemetryEvent>(ts.server.ProjectInfoTelemetryEvent), {
                projectId: Harness.LanguageService.mockHash("/tsconfig.json"),
                fileStats: fileStats({ ts: 1 }),
                compilerOptions: {},
                extends: false,
                files: false,
                include: false,
                exclude: false,
                compileOnSave: false,
                typeAcquisition: {
                    enable: false,
                    exclude: false,
                    include: false,
                },
                configFileName: "tsconfig.json",
                projectType: "configured",
                languageServiceEnabled: true,
                version: ts.version,
                ...partial,
            });
        }

        getEvent<T extends server.ProjectServiceEvent>(eventName: T["eventName"], mayBeMore = false): T["data"] {
            if (mayBeMore) { assert(this.events.length !== 0); }
            else { assert.equal(this.events.length, 1); }
            const event = this.events.shift();
            assert.equal(event.eventName, eventName);
            return event.data;
        }
    }

    function makeFile(path: string, content: {} = ""): projectSystem.FileOrFolder {
        return { path, content: typeof content === "string" ? "" : JSON.stringify(content) };
    }

    function fileStats(nonZeroStats: Partial<server.FileStats>): server.FileStats {
        return { ts: 0, tsx: 0, dts: 0, js: 0, jsx: 0, ...nonZeroStats };
    }
}
