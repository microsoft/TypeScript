namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: watchAPI:: tsc-watch with custom module resolution", () => {
        const configFileJson: any = {
            compilerOptions: { module: "commonjs", resolveJsonModule: true },
            files: ["index.ts"]
        };
        const mainFile: File = {
            path: `${projectRoot}/index.ts`,
            content: "import settings from './settings.json';"
        };
        const config: File = {
            path: `${projectRoot}/tsconfig.json`,
            content: JSON.stringify(configFileJson)
        };
        const settingsJson: File = {
            path: `${projectRoot}/settings.json`,
            content: JSON.stringify({ content: "Print this" })
        };

        it("verify that module resolution with json extension works when returned without extension", () => {
            const files = [libFile, mainFile, config, settingsJson];
            const host = createWatchedSystem(files, { currentDirectory: projectRoot });
            const compilerHost = createWatchCompilerHostOfConfigFile({
                configFileName: config.path,
                system: host
            });
            const parsedCommandResult = parseJsonConfigFileContent(configFileJson, host, config.path);
            compilerHost.resolveModuleNames = (moduleNames, containingFile) => moduleNames.map(m => {
                const result = resolveModuleName(m, containingFile, parsedCommandResult.options, compilerHost);
                const resolvedModule = result.resolvedModule!;
                return {
                    resolvedFileName: resolvedModule.resolvedFileName,
                    isExternalLibraryImport: resolvedModule.isExternalLibraryImport,
                    originalFileName: resolvedModule.originalPath,
                };
            });
            const watch = createWatchProgram(compilerHost);
            const program = watch.getCurrentProgram().getProgram();
            checkProgramActualFiles(program, [mainFile.path, libFile.path, settingsJson.path]);
        });
    });

    describe("unittests:: tsc-watch:: watchAPI:: tsc-watch expose error count to watch status reporter", () => {
        const configFileJson: any = {
            compilerOptions: { module: "commonjs" },
            files: ["index.ts"]
        };
        const config: File = {
            path: `${projectRoot}/tsconfig.json`,
            content: JSON.stringify(configFileJson)
        };
        const mainFile: File = {
            path: `${projectRoot}/index.ts`,
            content: "let compiler = new Compiler(); for (let i = 0; j < 5; i++) {}"
        };

        it("verify that the error count is correctly passed down to the watch status reporter", () => {
            const files = [libFile, mainFile, config];
            const host = createWatchedSystem(files, { currentDirectory: projectRoot });
            let watchedErrorCount;
            const reportWatchStatus: WatchStatusReporter = (_, __, ___, errorCount) => {
                watchedErrorCount = errorCount;
            };
            const compilerHost = createWatchCompilerHostOfConfigFile({
                configFileName: config.path,
                system: host,
                reportWatchStatus
            });
            createWatchProgram(compilerHost);
            assert.equal(watchedErrorCount, 2, "The error count was expected to be 2 for the file change");
        });
    });

    describe("unittests:: tsc-watch:: watchAPI:: when watchHost does not implement setTimeout or clearTimeout", () => {
        it("verifies that getProgram gets updated program if new file is added to the program", () => {
            const config: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const mainFile: File = {
                path: `${projectRoot}/main.ts`,
                content: "const x = 10;"
            };
            const sys = createWatchedSystem([config, mainFile, libFile]);
            const watchCompilerHost = createWatchCompilerHost(config.path, {}, sys);
            watchCompilerHost.setTimeout = undefined;
            watchCompilerHost.clearTimeout = undefined;
            const watch = createWatchProgram(watchCompilerHost);
            checkProgramActualFiles(watch.getProgram().getProgram(), [mainFile.path, libFile.path]);
            // Write new file
            const barPath = `${projectRoot}/bar.ts`;
            sys.writeFile(barPath, "const y =10;");
            checkProgramActualFiles(watch.getProgram().getProgram(), [mainFile.path, barPath, libFile.path]);
        });
    });

    describe("unittests:: tsc-watch:: watchAPI:: when watchHost can add extraFileExtensions to process", () => {
        it("verifies that extraFileExtensions are supported to get the program with other extensions", () => {
            const config: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const mainFile: File = {
                path: `${projectRoot}/main.ts`,
                content: "const x = 10;"
            };
            const otherFile: File = {
                path: `${projectRoot}/other.vue`,
                content: ""
            };
            const sys = createWatchedSystem([config, mainFile, otherFile, libFile]);
            const watchCompilerHost = createWatchCompilerHost(
                config.path,
                { allowNonTsExtensions: true },
                sys,
                /*createProgram*/ undefined,
                /*reportDiagnostics*/ undefined,
                /*reportWatchStatus*/ undefined,
                /*watchOptionsToExtend*/ undefined,
                [{ extension: ".vue", isMixedContent: true, scriptKind: ScriptKind.Deferred }]
            );
            const watch = createWatchProgram(watchCompilerHost);
            checkProgramActualFiles(watch.getProgram().getProgram(), [mainFile.path, otherFile.path, libFile.path]);
        });
    });
}
