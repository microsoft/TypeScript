namespace ts {
    export type TscCompileSystem = fakes.System & {
        writtenFiles: Set<Path>;
        baseLine(): { file: string; text: string; };
        disableUseFileVersionAsSignature?: boolean;
        storeFilesChangingSignatureDuringEmit?: boolean;
    };

    export function compilerOptionsToConfigJson(options: CompilerOptions) {
        return optionMapToObject(serializeCompilerOptions(options));
    }

    export const noChangeRun: TestTscEdit = {
        subScenario: "no-change-run",
        modifyFs: noop
    };
    export const noChangeWithExportsDiscrepancyRun: TestTscEdit = {
        ...noChangeRun,
        discrepancyExplanation: () => [
            "Incremental build did not emit and has .ts as signature so exports has all imported modules/referenced files",
            "Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed"
        ]
    };
    export const noChangeOnlyRuns = [noChangeRun];
    export const noChangeWithExportsDiscrepancyOnlyRuns = [noChangeWithExportsDiscrepancyRun];

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
        sys: TscCompileSystem | tscWatch.WatchedSystem,
        originalReadCall?: System["readFile"],
    ): CommandLineCallbacks {
        let programs: CommandLineProgram[] | undefined;

        return {
            cb: program => {
                if (isAnyProgram(program)) {
                    baselineBuildInfo(program.getCompilerOptions(), sys, originalReadCall);
                    (programs || (programs = [])).push(isBuilderProgram(program) ?
                        [program.getProgram(), program] :
                        [program]
                    );
                }
                else {
                    baselineBuildInfo(program.options, sys, originalReadCall);
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
        sys.storeFilesChangingSignatureDuringEmit = true;
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

    function makeSystemReadyForBaseline(sys: TscCompileSystem, versionToWrite?: string) {
        if (versionToWrite) {
            fakes.patchHostForBuildInfoWrite(sys, versionToWrite);
        }
        else {
            fakes.patchHostForBuildInfoReadWrite(sys);
        }
        const writtenFiles = sys.writtenFiles = new Set();
        const originalWriteFile = sys.writeFile;
        sys.writeFile = (fileName, content, writeByteOrderMark) => {
            const path = toPathWithSystem(sys, fileName);
            // When buildinfo is same for two projects,
            // it gives error and doesnt write buildinfo but because buildInfo is written for one project,
            // readable baseline will be written two times for those two projects with same contents and is ok
            Debug.assert(!writtenFiles.has(path) || endsWith(path, "baseline.txt"));
            writtenFiles.add(path);
            return originalWriteFile.call(sys, fileName, content, writeByteOrderMark);
        };
    }

    export function createSolutionBuilderHostForBaseline(
        sys: TscCompileSystem | tscWatch.WatchedSystem,
        versionToWrite?: string,
        originalRead?: (TscCompileSystem | tscWatch.WatchedSystem)["readFile"]
    ) {
        if (sys instanceof fakes.System) makeSystemReadyForBaseline(sys, versionToWrite);
        const { cb } = commandLineCallbacks(sys, originalRead);
        const host = createSolutionBuilderHost(sys,
            /*createProgram*/ undefined,
            createDiagnosticReporter(sys, /*pretty*/ true),
            createBuilderStatusReporter(sys, /*pretty*/ true),
        );
        host.afterProgramEmitAndDiagnostics = cb;
        host.afterEmitBundle = cb;
        return host;
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
            makeSystemReadyForBaseline(sys);
            actualReadFileMap = {};
            const originalReadFile = sys.readFile;
            sys.readFile = path => {
                // Dont record libs
                if (path.startsWith("/src/")) {
                    actualReadFileMap![path] = (getProperty(actualReadFileMap!, path) || 0) + 1;
                }
                return originalReadFile.call(sys, path);
            };

            const result = commandLineCallbacks(sys, originalReadFile);
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
                        fs: () => input.fs().makeReadonly()
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
