import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";
import * as Harness from "../../_namespaces/Harness";

describe("unittests:: tsc:: builder cancellationToken", () => {
    verifyCancellation(/*useBuildInfo*/ true, "when emitting buildInfo");
    verifyCancellation(/*useBuildInfo*/ false, "when using state");
    function verifyCancellation(useBuildInfo: boolean, scenario: string) {
        it(scenario, () => {
            const aFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: Utils.dedent`
                    import {B} from './b';
                    declare var console: any;
                    let b = new B();
                    console.log(b.c.d);`
            };
            const bFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/b.ts`,
                content: Utils.dedent`
                    import {C} from './c';
                    export class B {
                        c = new C();
                    }`
            };
            const cFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/c.ts`,
                content: Utils.dedent`
                    export class C {
                        d = 1;
                    }`
            };
            const dFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/d.ts`,
                content: "export class D { }"
            };
            const config: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { incremental: true, declaration: true } })
            };
            const { sys, baseline, oldSnap: originalSnap } = ts.tscWatch.createBaseline(ts.tscWatch.createWatchedSystem(
                [aFile, bFile, cFile, dFile, config, ts.tscWatch.libFile],
                { currentDirectory: ts.tscWatch.projectRoot }
            ));
            sys.exit = exitCode => sys.exitCode = exitCode;
            const reportDiagnostic = ts.createDiagnosticReporter(sys, /*pretty*/ true);
            const parsedConfig = ts.parseConfigFileWithSystem(
                "tsconfig.json",
                {},
             /*extendedConfigCache*/ undefined,
              /*watchOptionsToExtend*/ undefined,
                sys,
                reportDiagnostic
            )!;
            const host = ts.createIncrementalCompilerHost(parsedConfig.options, sys);
            let programs: ts.CommandLineProgram[] = ts.emptyArray;
            let oldPrograms: ts.CommandLineProgram[] = ts.emptyArray;
            let builderProgram: ts.EmitAndSemanticDiagnosticsBuilderProgram = undefined!;
            let oldSnap = originalSnap;
            let cancel = false;
            const cancellationToken: ts.CancellationToken = {
                isCancellationRequested: () => cancel,
                throwIfCancellationRequested: () => {
                    if (cancel) {
                        sys.write(`Cancelled!!\r\n`);
                        throw new ts.OperationCanceledException();
                    }
                },
            };

            // Initial build
            baselineBuild();

            // Cancel on first semantic operation
            // Change
            oldSnap = ts.tscWatch.applyChange(
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
                sys.write(`Operation ws cancelled:: ${e instanceof ts.OperationCanceledException}\r\n`);
            }
            cancel = false;
            builderProgram.emitBuildInfo();
            ts.baselineBuildInfo(builderProgram.getCompilerOptions(), sys);
            ts.tscWatch.watchBaseline({
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
                oldSnap = ts.tscWatch.applyChange(sys, baseline, ts.noop, caption);
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
                    builderProgram = builderProgram = ts.createEmitAndSemanticDiagnosticsBuilderProgram(
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
                ts.emitFilesAndReportErrorsAndGetExitStatus(builderProgram, reportDiagnostic);
                ts.baselineBuildInfo(builderProgram.getCompilerOptions(), sys);
                ts.tscWatch.watchBaseline({
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
                builderProgram = ts.createEmitAndSemanticDiagnosticsBuilderProgram(
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