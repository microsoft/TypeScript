namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: forceConsistentCasingInFileNames", () => {
        function createWatch() {
            const loggerFile: File = {
                path: `${projectRoot}/logger.ts`,
                content: `export class logger { }`
            };
            const anotherFile: File = {
                path: `${projectRoot}/another.ts`,
                content: `import { logger } from "./logger"; new logger();`
            };
            const tsconfig: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { forceConsistentCasingInFileNames: true }
                })
            };

            const host = createWatchedSystem([loggerFile, anotherFile, tsconfig, libFile, tsconfig]);
            const watch = createWatchOfConfigFile(tsconfig.path, host);
            checkProgramActualFiles(watch(), [loggerFile.path, anotherFile.path, libFile.path]);
            checkOutputErrorsInitial(host, emptyArray);
            return { host, watch, anotherFile, loggerFile };
        }

        it("when changing module name with different casing", () => {
            const { host, watch, anotherFile, loggerFile } = createWatch();
            host.writeFile(anotherFile.path, anotherFile.content.replace("./logger", "./Logger"));
            host.runQueuedTimeoutCallbacks();
            checkProgramActualFiles(watch(), [`${projectRoot}/Logger.ts`, anotherFile.path, libFile.path]);
            checkOutputErrorsIncremental(host, [
                getDiagnosticOfFileFromProgram(
                    watch(),
                    anotherFile.path,
                    anotherFile.content.indexOf(`"./logger"`),
                    `"./logger"`.length,
                    Diagnostics.Already_included_file_name_0_differs_from_file_name_1_only_in_casing,
                    `${projectRoot}/Logger.ts`,
                    loggerFile.path,
                ),
            ]);
        });

        it("when renaming file with different casing", () => {
            const { host, watch, anotherFile, loggerFile } = createWatch();
            host.renameFile(loggerFile.path, `${projectRoot}/Logger.ts`);
            host.runQueuedTimeoutCallbacks();
            checkProgramActualFiles(watch(), [`${projectRoot}/Logger.ts`, anotherFile.path, libFile.path]);
            checkOutputErrorsIncremental(host, [
                getDiagnosticOfFileFromProgram(
                    watch(),
                    anotherFile.path,
                    anotherFile.content.indexOf(`"./logger"`),
                    `"./logger"`.length,
                    Diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing,
                    loggerFile.path,
                    `${projectRoot}/Logger.ts`
                ),
            ]);
        });
    });
}
