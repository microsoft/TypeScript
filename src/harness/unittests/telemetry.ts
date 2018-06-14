/// <reference path="../harness.ts" />
/// <reference path="./tsserverProjectSystem.ts" />

namespace ts.projectSystem {
    describe("project telemetry", () => {
        it("does nothing for inferred project", () => {
            const file = makeFile("/a.js");
            const et = new TestServerEventManager([file]);
            et.service.openClientFile(file.path);
            et.hasZeroEvent(server.ProjectInfoTelemetryEvent);
        });

        it("only sends an event once", () => {
            const file = makeFile("/a/a.ts");
            const file2 = makeFile("/b.ts");
            const tsconfig = makeFile("/a/tsconfig.json", {});

            const et = new TestServerEventManager([file, file2, tsconfig]);
            et.service.openClientFile(file.path);
            et.assertProjectInfoTelemetryEvent({}, tsconfig.path);

            et.service.closeClientFile(file.path);
            checkNumberOfProjects(et.service, { configuredProjects: 1 });

            et.service.openClientFile(file2.path);
            checkNumberOfProjects(et.service, { inferredProjects: 1 });

            et.hasZeroEvent(server.ProjectInfoTelemetryEvent);

            et.service.openClientFile(file.path);
            checkNumberOfProjects(et.service, { configuredProjects: 1, inferredProjects: 1 });

            et.hasZeroEvent(server.ProjectInfoTelemetryEvent);
        });

        it("counts files by extension", () => {
            const files = ["ts.ts", "tsx.tsx", "moo.ts", "dts.d.ts", "jsx.jsx", "js.js", "badExtension.badExtension"].map(f => makeFile(`/src/${f}`));
            const notIncludedFile = makeFile("/bin/ts.js");
            const compilerOptions: CompilerOptions = { allowJs: true };
            const tsconfig = makeFile("/tsconfig.json", { compilerOptions, include: ["src"] });

            const et = new TestServerEventManager([...files, notIncludedFile, tsconfig]);
            et.service.openClientFile(files[0].path);
            et.assertProjectInfoTelemetryEvent({
                fileStats: fileStats({ ts: 2, tsx: 1, js: 1, jsx: 1, dts: 1 }),
                compilerOptions,
                include: true,
            });
        });

        it("works with external project", () => {
            const file1 = makeFile("/a.ts");
            const et = new TestServerEventManager([file1]);
            const compilerOptions: server.protocol.CompilerOptions = { strict: true };

            const projectFileName = "/hunter2/foo.csproj";

            open();

            // TODO: Apparently compilerOptions is mutated, so have to repeat it here!
            et.assertProjectInfoTelemetryEvent({
                compilerOptions: { strict: true },
                compileOnSave: true,
                // These properties can't be present for an external project, so they are undefined instead of false.
                extends: undefined,
                files: undefined,
                include: undefined,
                exclude: undefined,
                configFileName: "other",
                projectType: "external",
            }, "/hunter2/foo.csproj");

            // Also test that opening an external project only sends an event once.

            et.service.closeExternalProject(projectFileName);
            checkNumberOfProjects(et.service, { externalProjects: 0 });

            open();
            assert.equal(et.getEvents().length, 0);

            function open(): void {
                et.service.openExternalProject({
                    rootFiles: toExternalFiles([file1.path]),
                    options: compilerOptions,
                    projectFileName,
                });
                checkNumberOfProjects(et.service, { externalProjects: 1 });
            }
        });

        it("does not expose paths", () => {
            const file = makeFile("/a.ts");

            const compilerOptions: CompilerOptions = {
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
            const safeCompilerOptions: CompilerOptions = {
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
            const tsconfig = makeFile("/tsconfig.json", { compilerOptions, files: ["/a.ts"] });

            const et = new TestServerEventManager([file, tsconfig]);
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

            const et = new TestServerEventManager([tsconfig, file]);
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
            noEmit: true
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
            const et = new TestServerEventManager([jsconfig, file]);
            et.service.openClientFile(file.path);
            et.assertProjectInfoTelemetryEvent({
                fileStats: fileStats({ js: 1 }),
                compilerOptions: autoJsCompilerOptions,
                typeAcquisition: {
                    enable: true,
                    include: true,
                    exclude: false,
                },
                configFileName: "jsconfig.json",
            }, "/jsconfig.json");
        });

        it("detects whether language service was disabled", () => {
            const file = makeFile("/a.js");
            const tsconfig = makeFile("/jsconfig.json", {});
            const et = new TestServerEventManager([tsconfig, file]);
            et.host.getFileSize = () => server.maxProgramSizeForNonTsFiles + 1;
            et.service.openClientFile(file.path);
            et.getEvent<server.ProjectLanguageServiceStateEvent>(server.ProjectLanguageServiceStateEvent);
            et.assertProjectInfoTelemetryEvent({
                fileStats: fileStats({ js: 1 }),
                compilerOptions: autoJsCompilerOptions,
                configFileName: "jsconfig.json",
                typeAcquisition: {
                    enable: true,
                    include: false,
                    exclude: false,
                },
                languageServiceEnabled: false,
            }, "/jsconfig.json");
        });

        describe("open files telemetry", () => {
            it("sends event for inferred project", () => {
                const ajs = makeFile("/a.js", "// @ts-check\nconst x = 0;");
                const bjs = makeFile("/b.js");
                const et = new TestServerEventManager([ajs, bjs]);

                et.service.openClientFile(ajs.path);
                et.assertOpenFileTelemetryEvent({ checkJs: true });

                et.service.openClientFile(bjs.path);
                et.assertOpenFileTelemetryEvent({ checkJs: false });

                // No repeated send for opening a file seen before.
                et.service.openClientFile(bjs.path);
                et.assertNoOpenFilesTelemetryEvent();
            });

            it("not for '.ts' file", () => {
                const ats = makeFile("/a.ts", "");
                const et = new TestServerEventManager([ats]);

                et.service.openClientFile(ats.path);
                et.assertNoOpenFilesTelemetryEvent();
            });

            it("even for project with 'ts-check' in config", () => {
                const file = makeFile("/a.js");
                const compilerOptions: CompilerOptions = { checkJs: true };
                const jsconfig = makeFile("/jsconfig.json", { compilerOptions });
                const et = new TestServerEventManager([jsconfig, file]);
                et.service.openClientFile(file.path);
                et.assertOpenFileTelemetryEvent({ checkJs: false });
            });
        });
    });

    function makeFile(path: string, content: {} = ""): File {
        return { path, content: isString(content) ? content : JSON.stringify(content) };
    }
}
