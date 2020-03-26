namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: forceConsistentCasingInFileNames", () => {
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

        function verifyConsistentFileNames({ subScenario, changes }: { subScenario: string; changes: TscWatchCompileChange[]; }) {
            verifyTscWatch({
                scenario: "forceConsistentCasingInFileNames",
                subScenario,
                commandLineArgs: ["--w", "--p", tsconfig.path],
                sys: () => createWatchedSystem([loggerFile, anotherFile, tsconfig, libFile, tsconfig]),
                changes
            });
        }

        verifyConsistentFileNames({
            subScenario: "when changing module name with different casing",
            changes: [
                sys => {
                    sys.writeFile(anotherFile.path, anotherFile.content.replace("./logger", "./Logger"));
                    sys.runQueuedTimeoutCallbacks();
                    return "Change module name from logger to Logger";
                }
            ]
        });

        verifyConsistentFileNames({
            subScenario: "when renaming file with different casing",
            changes: [
                sys => {
                    sys.renameFile(loggerFile.path, `${projectRoot}/Logger.ts`);
                    sys.runQueuedTimeoutCallbacks();
                    return "Change name of file from logger to Logger";
                }
            ]
        });
    });
}
