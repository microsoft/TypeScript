namespace ts {
    export type TscCompileSystem = fakes.System & {
        writtenFiles: Set<Path>;
        baseLine(): { file: string; text: string; };
        disableUseFileVersionAsSignature?: boolean;
    };

    export const noChangeRun: TestTscEdit = {
        subScenario: "no-change-run",
        modifyFs: noop
    };
    export const noChangeOnlyRuns = [noChangeRun];

    export interface TestTscCompile extends TestTscCompileLikeBase {
        baselineSourceMap?: boolean;
        baselineReadFileCalls?: boolean;
        baselinePrograms?: boolean;
        baselineDependencies?: boolean;
    }

    export type CommandLineProgram = [Program, BuilderProgram?];
    export interface CommandLineCallbacks {
        cb: ExecuteCommandLineCallbacks;
        getPrograms: () => readonly CommandLineProgram[];
    }

    function isAnyProgram(program: Program | BuilderProgram | ParsedCommandLine): program is Program | BuilderProgram {
        return !!(program as Program | BuilderProgram).getCompilerOptions;
    }
    export function commandLineCallbacks(
        sys: System & { writtenFiles: ReadonlyCollection<Path>; },
        originalReadCall?: System["readFile"],
        originalWriteFile?: System["writeFile"],
    ): CommandLineCallbacks {
        let programs: CommandLineProgram[] | undefined;

        return {
            cb: program => {
                if (isAnyProgram(program)) {
                    baselineBuildInfo(program.getCompilerOptions(), sys, originalReadCall, originalWriteFile);
                    (programs || (programs = [])).push(isBuilderProgram(program) ?
                        [program.getProgram(), program] :
                        [program]
                    );
                }
                else {
                    baselineBuildInfo(program.options, sys, originalReadCall, originalWriteFile);
                }
            },
            getPrograms: () => {
                const result = programs || emptyArray;
                programs = undefined;
                return result;
            }
        };
    }
    export interface TestTscCompileLikeBase extends VerifyTscCompileLike {
        diffWithInitial?: boolean;
        modifyFs?: (fs: vfs.FileSystem) => void;
        disableUseFileVersionAsSignature?: boolean;
        environmentVariables?: Record<string, string>;
    }

    export interface TestTscCompileLike extends TestTscCompileLikeBase {
        compile: (sys: TscCompileSystem) => void;
        additionalBaseline?: (sys: TscCompileSystem) => void;
    }
    /**
     * Initialize FS, run compile function and save baseline
     */
    export function testTscCompileLike(input: TestTscCompileLike) {
        const initialFs = input.fs();
        const inputFs = initialFs.shadow();
        const {
            scenario, subScenario, diffWithInitial,
            commandLineArgs, modifyFs,
            environmentVariables,
            compile: worker, additionalBaseline,
        } = input;
        if (modifyFs) modifyFs(inputFs);
        inputFs.makeReadonly();
        const fs = inputFs.shadow();

        // Create system
        const sys = new fakes.System(fs, { executingFilePath: "/lib/tsc", env: environmentVariables }) as TscCompileSystem;
        if (input.disableUseFileVersionAsSignature) sys.disableUseFileVersionAsSignature = true;
        sys.write(`${sys.getExecutingFilePath()} ${commandLineArgs.join(" ")}\n`);
        sys.exit = exitCode => sys.exitCode = exitCode;
        worker(sys);
        sys.write(`exitCode:: ExitStatus.${ExitStatus[sys.exitCode as ExitStatus]}\n`);
        additionalBaseline?.(sys);
        fs.makeReadonly();
        sys.baseLine = () => {
            const baseFsPatch = diffWithInitial ?
                inputFs.diff(initialFs, { includeChangedFileWithSameContent: true }) :
                inputFs.diff(/*base*/ undefined, { baseIsNotShadowRoot: true });
            const patch = fs.diff(inputFs, { includeChangedFileWithSameContent: true });
            return {
                file: `${isBuild(commandLineArgs) ? "tsbuild" : "tsc"}/${scenario}/${subScenario.split(" ").join("-")}.js`,
                text: `Input::
${baseFsPatch ? vfs.formatPatch(baseFsPatch) : ""}

Output::
${sys.output.join("")}

${patch ? vfs.formatPatch(patch) : ""}`
            };
        };
        return sys;
    }

    /**
     * Initialize Fs, execute command line and save baseline
     */
    export function testTscCompile(input: TestTscCompile) {
        let actualReadFileMap: MapLike<number> | undefined;
        let getPrograms: CommandLineCallbacks["getPrograms"] | undefined;
        return testTscCompileLike({
            ...input,
            compile: commandLineCompile,
            additionalBaseline
        });

        function commandLineCompile(sys: TscCompileSystem) {
            fakes.patchHostForBuildInfoReadWrite(sys);
            const writtenFiles = sys.writtenFiles = new Set();
            const originalWriteFile = sys.writeFile;
            sys.writeFile = (fileName, content, writeByteOrderMark) => {
                const path = toPathWithSystem(sys, fileName);
                assert.isFalse(writtenFiles.has(path));
                writtenFiles.add(path);
                return originalWriteFile.call(sys, fileName, content, writeByteOrderMark);
            };
            actualReadFileMap = {};
            const originalReadFile = sys.readFile;
            sys.readFile = path => {
                // Dont record libs
                if (path.startsWith("/src/")) {
                    actualReadFileMap![path] = (getProperty(actualReadFileMap!, path) || 0) + 1;
                }
                return originalReadFile.call(sys, path);
            };

            const result = commandLineCallbacks(sys, originalReadFile, originalWriteFile);
            executeCommandLine(
                sys,
                result.cb,
                input.commandLineArgs,
            );
            sys.readFile = originalReadFile;
            getPrograms = result.getPrograms;
        }

        function additionalBaseline(sys: TscCompileSystem) {
            const { baselineSourceMap, baselineReadFileCalls, baselinePrograms, baselineDependencies } = input;
            if (baselinePrograms) {
                const baseline: string[] = [];
                tscWatch.baselinePrograms(baseline, getPrograms!, emptyArray, baselineDependencies);
                sys.write(baseline.join("\n"));
            }
            if (baselineReadFileCalls) {
                sys.write(`readFiles:: ${JSON.stringify(actualReadFileMap, /*replacer*/ undefined, " ")} `);
            }
            if (baselineSourceMap) generateSourceMapBaselineFiles(sys);
            actualReadFileMap = undefined;
            getPrograms = undefined;
        }
    }

    export function verifyTscBaseline(sys: () => { baseLine: TscCompileSystem["baseLine"]; }) {
        it(`Generates files matching the baseline`, () => {
            const { file, text } = sys().baseLine();
            Harness.Baseline.runBaseline(file, text);
        });
    }
    export interface VerifyTscCompileLike {
        scenario: string;
        subScenario: string;
        commandLineArgs: readonly string[];
        fs: () => vfs.FileSystem;
    }

    /**
     * Verify by baselining after initializing FS and custom compile
     */
    export function verifyTscCompileLike<T extends VerifyTscCompileLike>(verifier: (input: T) => { baseLine: TscCompileSystem["baseLine"]; }, input: T) {
        describe(`tsc ${input.commandLineArgs.join(" ")} ${input.scenario}:: ${input.subScenario}`, () => {
            describe(input.scenario, () => {
                describe(input.subScenario, () => {
                    verifyTscBaseline(() => verifier({
                        ...input,
                        fs: () => getFsWithTime(input.fs()).fs.makeReadonly()
                    }));
                });
            });
        });
    }

    /**
     * Verify by baselining after initializing FS and command line compile
     */
     export function verifyTsc(input: TestTscCompile) {
        verifyTscCompileLike(testTscCompile, input);
    }
}
