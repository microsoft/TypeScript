namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: watchAPI:: tsc-watch with custom module resolution", () => {
        const projectRoot = "/user/username/projects/project";
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
            const compilerHost = createWatchCompilerHostOfConfigFile(config.path, {}, host);
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
}
