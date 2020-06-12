namespace ts {
    export type TscCompileSystem = fakes.System & {
        writtenFiles: Map<true>;
        baseLine(): { file: string; text: string; };
    };

    export enum BuildKind {
        Initial = "initial-build",
        IncrementalDtsChange = "incremental-declaration-changes",
        IncrementalDtsUnchanged = "incremental-declaration-doesnt-change",
        IncrementalHeadersChange = "incremental-headers-change-without-dts-changes",
        NoChangeRun ="no-change-run"
    }

    export const noChangeRun: TscIncremental = {
        buildKind: BuildKind.NoChangeRun,
        modifyFs: noop
    };
    export const noChangeOnlyRuns = [noChangeRun];

    export interface TscCompile {
        scenario: string;
        subScenario: string;
        buildKind?: BuildKind; // Should be defined for tsc --b
        fs: () => vfs.FileSystem;
        commandLineArgs: readonly string[];

        modifyFs?: (fs: vfs.FileSystem) => void;
        baselineSourceMap?: boolean;
        baselineReadFileCalls?: boolean;
        baselinePrograms?: boolean;
    }

    export type CommandLineProgram = [Program, EmitAndSemanticDiagnosticsBuilderProgram?];
    export interface CommandLineCallbacks {
        cb: ExecuteCommandLineCallbacks;
        getPrograms: () => readonly CommandLineProgram[];
    }

    function isBuilderProgram(program: Program | EmitAndSemanticDiagnosticsBuilderProgram): program is EmitAndSemanticDiagnosticsBuilderProgram {
        return !!(program as EmitAndSemanticDiagnosticsBuilderProgram).getState;
    }
    function isAnyProgram(program: Program | EmitAndSemanticDiagnosticsBuilderProgram | ParsedCommandLine): program is Program | EmitAndSemanticDiagnosticsBuilderProgram {
        return !!(program as Program | EmitAndSemanticDiagnosticsBuilderProgram).getCompilerOptions;
    }
    export function commandLineCallbacks(
        sys: System & { writtenFiles: Map<any>; },
        originalReadCall?: System["readFile"]
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

    export function tscCompile(input: TscCompile) {
        const initialFs = input.fs();
        const inputFs = initialFs.shadow();
        const {
            scenario, subScenario, buildKind,
            commandLineArgs, modifyFs,
            baselineSourceMap, baselineReadFileCalls, baselinePrograms
        } = input;
        if (modifyFs) modifyFs(inputFs);
        inputFs.makeReadonly();
        const fs = inputFs.shadow();

        // Create system
        const sys = new fakes.System(fs, { executingFilePath: "/lib/tsc" }) as TscCompileSystem;
        fakes.patchHostForBuildInfoReadWrite(sys);
        const writtenFiles = sys.writtenFiles = createMap<true>();
        const originalWriteFile = sys.writeFile;
        sys.writeFile = (fileName, content, writeByteOrderMark) => {
            assert.isFalse(writtenFiles.has(fileName));
            writtenFiles.set(fileName, true);
            return originalWriteFile.call(sys, fileName, content, writeByteOrderMark);
        };
        const actualReadFileMap: MapLike<number> = {};
        const originalReadFile = sys.readFile;
        sys.readFile = path => {
            // Dont record libs
            if (path.startsWith("/src/")) {
                actualReadFileMap[path] = (getProperty(actualReadFileMap, path) || 0) + 1;
            }
            return originalReadFile.call(sys, path);
        };

        sys.write(`${sys.getExecutingFilePath()} ${commandLineArgs.join(" ")}\n`);
        sys.exit = exitCode => sys.exitCode = exitCode;
        const { cb, getPrograms } = commandLineCallbacks(sys, originalReadFile);
        executeCommandLine(
            sys,
            cb,
            commandLineArgs,
        );
        sys.write(`exitCode:: ExitStatus.${ExitStatus[sys.exitCode as ExitStatus]}\n`);
        if (baselinePrograms) {
            const baseline: string[] = [];
            tscWatch.baselinePrograms(baseline, getPrograms);
            sys.write(baseline.join("\n"));
        }
        if (baselineReadFileCalls) {
            sys.write(`readFiles:: ${JSON.stringify(actualReadFileMap, /*replacer*/ undefined, " ")} `);
        }
        if (baselineSourceMap) generateSourceMapBaselineFiles(sys);

        fs.makeReadonly();

        sys.baseLine = () => {
            const baseFsPatch = !buildKind || buildKind === BuildKind.Initial ?
                inputFs.diff(/*base*/ undefined, { baseIsNotShadowRoot: true }) :
                inputFs.diff(initialFs, { includeChangedFileWithSameContent: true });
            const patch = fs.diff(inputFs, { includeChangedFileWithSameContent: true });
            return {
                file: `${isBuild(commandLineArgs) ? "tsbuild" : "tsc"}/${scenario}/${buildKind || BuildKind.Initial}/${subScenario.split(" ").join("-")}.js`,
                text: `Input::
${baseFsPatch ? vfs.formatPatch(baseFsPatch) : ""}

Output::
${sys.output.join("")}

${patch ? vfs.formatPatch(patch) : ""}`
            };
        };
        return sys;
    }

    export function verifyTscBaseline(sys: () => { baseLine: TscCompileSystem["baseLine"]; }) {
        it(`Generates files matching the baseline`, () => {
            const { file, text } = sys().baseLine();
            Harness.Baseline.runBaseline(file, text);
        });
    }

    export function verifyTsc(input: TscCompile) {
        describe(`tsc ${input.commandLineArgs.join(" ")} ${input.scenario}:: ${input.subScenario}`, () => {
            describe(input.scenario, () => {
                describe(input.subScenario, () => {
                    let sys: TscCompileSystem;
                    before(() => {
                        sys = tscCompile({
                            ...input,
                            fs: () => getFsWithTime(input.fs()).fs.makeReadonly()
                        });
                    });
                    after(() => {
                        sys = undefined!;
                    });
                    verifyTscBaseline(() => sys);
                });
            });
        });
    }
}
