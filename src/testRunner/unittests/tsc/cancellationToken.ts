import { Baseline } from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    applyEdit,
    baselineBuildInfo,
    CommandLineProgram,
    createBaseline,
} from "../helpers/baseline.js";
import { watchBaseline } from "../helpers/tscWatch.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: builder cancellationToken::", () => {
    verifyCancellation(/*useBuildInfo*/ true, "when emitting buildInfo");
    verifyCancellation(/*useBuildInfo*/ false, "when using state");
    function verifyCancellation(useBuildInfo: boolean, scenario: string) {
        it(scenario, () => {
            const aFile: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: dedent`
                    import {B} from './b';
                    declare var console: any;
                    let b = new B();
                    console.log(b.c.d);`,
            };
            const bFile: File = {
                path: `/user/username/projects/myproject/b.ts`,
                content: dedent`
                    import {C} from './c';
                    export class B {
                        c = new C();
                    }`,
            };
            const cFile: File = {
                path: `/user/username/projects/myproject/c.ts`,
                content: dedent`
                    export var C = class CReal {
                        d = 1;
                    };`,
            };
            const dFile: File = {
                path: `/user/username/projects/myproject/d.ts`,
                content: "export class D { }",
            };
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({ compilerOptions: { incremental: true, declaration: true } }),
            };
            const { sys, baseline } = createBaseline(TestServerHost.createWatchedSystem(
                [aFile, bFile, cFile, dFile, config],
                { currentDirectory: "/user/username/projects/myproject" },
            ));
            sys.exit = exitCode => sys.exitCode = exitCode;
            const reportDiagnostic = ts.createDiagnosticReporter(sys, /*pretty*/ true);
            const parsedConfig = ts.parseConfigFileWithSystem(
                "tsconfig.json",
                {},
                /*extendedConfigCache*/ undefined,
                /*watchOptionsToExtend*/ undefined,
                sys,
                reportDiagnostic,
            )!;
            const host = ts.createIncrementalCompilerHost(parsedConfig.options, sys);
            let programs: CommandLineProgram[] = ts.emptyArray;
            let oldPrograms: CommandLineProgram[] = ts.emptyArray;
            let builderProgram: ts.EmitAndSemanticDiagnosticsBuilderProgram = undefined!;
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
            applyEdit(
                sys,
                baseline,
                sys => sys.appendFile(cFile.path, "export function foo() {}"),
                "Add change that affects d.ts",
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
            baselineBuildInfo(builderProgram.getCompilerOptions(), sys);
            watchBaseline({
                baseline,
                getPrograms: () => programs,
                oldPrograms,
                sys,
            });

            // Normal emit again
            noChange("Normal build");
            baselineBuild();

            // Do clean build:: all the emitted files should be same
            noChange("Clean build");
            baselineCleanBuild();

            Baseline.runBaseline(`tsc/cancellationToken/${scenario.split(" ").join("-")}.js`, baseline.join("\r\n"));

            function noChange(caption: string) {
                applyEdit(sys, baseline, ts.noop, caption);
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
                        /*configFileParsingDiagnostics*/ undefined,
                        /*projectReferences*/ undefined,
                    );
                updatePrograms();
            }

            function emitAndBaseline() {
                ts.emitFilesAndReportErrorsAndGetExitStatus(builderProgram, reportDiagnostic);
                baselineBuildInfo(builderProgram.getCompilerOptions(), sys);
                watchBaseline({
                    baseline,
                    getPrograms: () => programs,
                    oldPrograms,
                    sys,
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
                    /*configFileParsingDiagnostics*/ undefined,
                    /*projectReferences*/ undefined,
                );
                updatePrograms();
                emitAndBaseline();
            }
        });
    }
});
