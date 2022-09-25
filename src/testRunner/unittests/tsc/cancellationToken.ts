namespace ts.tscWatch {
    describe("unittests:: tsc:: builder cancellationToken", () => {
        verifyCancellation(/*useBuildInfo*/ true, "when emitting buildInfo");
        verifyCancellation(/*useBuildInfo*/ false, "when using state");
        function verifyCancellation(useBuildInfo: boolean, scenario: string) {
            it(scenario, () => {
                const aFile: File = {
                    path: `${projectRoot}/a.ts`,
                    content: Utils.dedent`
                    import {B} from './b';
                    declare var console: any;
                    let b = new B();
                    console.log(b.c.d);`
                };
                const bFile: File = {
                    path: `${projectRoot}/b.ts`,
                    content: Utils.dedent`
                    import {C} from './c';
                    export class B {
                        c = new C();
                    }`
                };
                const cFile: File = {
                    path: `${projectRoot}/c.ts`,
                    content: Utils.dedent`
                    export class C {
                        d = 1;
                    }`
                };
                const dFile: File = {
                    path: `${projectRoot}/d.ts`,
                    content: "export class D { }"
                };
                const config: File = {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { incremental: true, declaration: true } })
                };
                const { sys, baseline, oldSnap: originalSnap } = createBaseline(createWatchedSystem(
                    [aFile, bFile, cFile, dFile, config, libFile],
                    { currentDirectory: projectRoot }
                ));
                sys.exit = exitCode => sys.exitCode = exitCode;
                const reportDiagnostic = createDiagnosticReporter(sys, /*pretty*/ true);
                const parsedConfig = parseConfigFileWithSystem(
                    "tsconfig.json",
                    {},
                 /*extendedConfigCache*/ undefined,
                  /*watchOptionsToExtend*/ undefined,
                    sys,
                    reportDiagnostic
                )!;
                const host = createIncrementalCompilerHost(parsedConfig.options, sys);
                let programs: CommandLineProgram[] = emptyArray;
                let oldPrograms: CommandLineProgram[] = emptyArray;
                let builderProgram: EmitAndSemanticDiagnosticsBuilderProgram = undefined!;
                let oldSnap = originalSnap;
                let cancel = false;
                const cancellationToken: CancellationToken = {
                    isCancellationRequested: () => cancel,
                    throwIfCancellationRequested: () => {
                        if (cancel) {
                            sys.write(`Cancelled!!\r\n`);
                            throw new OperationCanceledException();
                        }
                    },
                };

                // Initial build
                baselineBuild();

                // Cancel on first semantic operation
                // Change
                oldSnap = applyChange(
                    sys,
                    baseline,
                    sys => sys.appendFile(cFile.path, "export function foo() {}"),
                    "Add change that affects d.ts"
                );
                createIncrementalProgram();

                // Cancel during semantic diagnostics
                cancel = true;
                try {
                    builderProgram.getSemanticDiagnosticsOfNextAffectedFile(cancellationToken);
                }
                catch (e) {
                    sys.write(`Operation ws cancelled:: ${e instanceof OperationCanceledException}\r\n`);
                }
                cancel = false;
                builderProgram.emitBuildInfo();
                baselineBuildInfo(builderProgram.getCompilerOptions(), sys);
                watchBaseline({
                    baseline,
                    getPrograms: () => programs,
                    oldPrograms,
                    sys,
                    oldSnap,
                });

                // Normal emit again
                noChange("Normal build");
                baselineBuild();

                // Do clean build:: all the emitted files should be same
                noChange("Clean build");
                baselineCleanBuild();

                Harness.Baseline.runBaseline(`tsc/cancellationToken/${scenario.split(" ").join("-")}.js`, baseline.join("\r\n"));

                function noChange(caption: string) {
                    oldSnap = applyChange(sys, baseline, noop, caption);
                }

                function updatePrograms() {
                    oldPrograms = programs;
                    programs = [[builderProgram.getProgram(), builderProgram]];
                }

                function createIncrementalProgram() {
                    builderProgram = useBuildInfo ?
                        ts.createIncrementalProgram({
                            rootNames: parsedConfig.fileNames,
                            options: parsedConfig.options,
                            host,
                        }) :
                        builderProgram = builderProgram = createEmitAndSemanticDiagnosticsBuilderProgram(
                            parsedConfig.fileNames,
                            parsedConfig.options,
                            host,
                            builderProgram,
                        /* configFileParsingDiagnostics*/ undefined,
                        /*projectReferences*/ undefined,
                        );
                    updatePrograms();
                }

                function emitAndBaseline() {
                    emitFilesAndReportErrorsAndGetExitStatus(builderProgram, reportDiagnostic);
                    baselineBuildInfo(builderProgram.getCompilerOptions(), sys);
                    watchBaseline({
                        baseline,
                        getPrograms: () => programs,
                        oldPrograms,
                        sys,
                        oldSnap,
                    });
                }

                function baselineBuild() {
                    createIncrementalProgram();
                    emitAndBaseline();
                }

                function baselineCleanBuild() {
                    builderProgram = createEmitAndSemanticDiagnosticsBuilderProgram(
                        parsedConfig.fileNames,
                        parsedConfig.options,
                        host,
                    /*oldProgram*/ undefined,
                    /* configFileParsingDiagnostics*/ undefined,
                    /*projectReferences*/ undefined,
                    );
                    updatePrograms();
                    emitAndBaseline();
                }
            });
        }
    });
}