import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    CommandLineCallbacks,
    commandLineCallbacks,
    patchHostForBuildInfoReadWrite,
    patchHostForBuildInfoWrite,
    TscWatchSystem,
} from "./baseline.js";
import {
    verifyTsc,
    VerifyTscWithEditsInput,
} from "./tsc.js";
import {
    changeToHostTrackingWrittenFiles,
    TestServerHost,
} from "./virtualFileSystemWithWatch.js";

export type SolutionBuilderHostWithGetPrograms =
    & ts.SolutionBuilderHost<ts.EmitAndSemanticDiagnosticsBuilderProgram>
    & { getPrograms: CommandLineCallbacks["getPrograms"]; };
export function createSolutionBuilderHostForBaseline(
    sys: TscWatchSystem,
    originalRead?: TestServerHost["readFile"],
): ts.SolutionBuilderHost<ts.EmitAndSemanticDiagnosticsBuilderProgram> & { getPrograms: CommandLineCallbacks["getPrograms"]; } {
    const { cb, getPrograms } = commandLineCallbacks(sys, originalRead);
    const host = ts.createSolutionBuilderHost(
        sys,
        /*createProgram*/ undefined,
        ts.createDiagnosticReporter(sys, /*pretty*/ true),
        ts.createBuilderStatusReporter(sys, /*pretty*/ true),
    ) as SolutionBuilderHostWithGetPrograms;
    host.afterProgramEmitAndDiagnostics = cb;
    host.getPrograms = getPrograms;
    return host;
}

export function createSolutionBuilder(
    system: TscWatchSystem,
    rootNames: readonly string[],
    buildOptions?: ts.BuildOptions,
    originalRead?: TestServerHost["readFile"],
): ts.SolutionBuilder<ts.EmitAndSemanticDiagnosticsBuilderProgram> {
    const host = createSolutionBuilderHostForBaseline(system, originalRead);
    return ts.createSolutionBuilder(host, rootNames, buildOptions ?? {});
}

export function ensureErrorFreeBuild(host: TestServerHost, rootNames: readonly string[]): void {
    // ts build should succeed
    solutionBuildWithBaseline(host, rootNames);
    assert.equal(host.getOutput().length, 0, jsonToReadableText(host.getOutput()));
}

export function solutionBuildWithBaseline(
    sys: TestServerHost,
    solutionRoots: readonly string[],
    buildOptions?: ts.BuildOptions,
    versionToWrite?: string,
    originalRead?: TestServerHost["readFile"],
): TestServerHost {
    if (sys.writtenFiles === undefined) {
        const originalReadFile = sys.readFile;
        const originalWrite = sys.write;
        const originalWriteFile = sys.writeFile;
        const solutionBuilder = createSolutionBuilder(
            changeToHostTrackingWrittenFiles(
                versionToWrite ?
                    patchHostForBuildInfoWrite(sys, versionToWrite) :
                    patchHostForBuildInfoReadWrite(sys),
            ),
            solutionRoots,
            buildOptions,
            originalRead,
        );
        solutionBuilder.build();
        sys.readFile = originalReadFile;
        sys.write = originalWrite;
        sys.writeFile = originalWriteFile;
        sys.writtenFiles = undefined;
        sys.clearOutput();
        return sys;
    }
    else {
        const solutionBuilder = createSolutionBuilder(sys as TscWatchSystem, solutionRoots, buildOptions, originalRead);
        solutionBuilder.build();
        return sys;
    }
}

export function verifySolutionBuilderWithDifferentTsVersion(input: VerifyTscWithEditsInput, rootNames: readonly string[]): void {
    describe(input.subScenario, () => {
        let originalReadFile: TscWatchSystem["readFile"];
        let originalWriteFile: TscWatchSystem["writeFile"];
        verifyTsc({
            ...input,
            sys: () => {
                const sys = input.sys();
                originalReadFile = sys.readFile;
                originalWriteFile = sys.writeFile;
                return sys;
            },
            compile: sys => {
                sys.readFile = originalReadFile;
                sys.writeFile = originalWriteFile;
                originalReadFile = undefined!;
                originalWriteFile = undefined!;
                sys.writtenFiles = undefined!;
                // Buildinfo will have version which does not match with current ts version
                changeToHostTrackingWrittenFiles(patchHostForBuildInfoWrite(sys, "FakeTSCurrentVersion"));
                const buildHost = createSolutionBuilderHostForBaseline(sys);
                const builder = ts.createSolutionBuilder(buildHost, rootNames, { verbose: true });
                sys.exit(builder.build());
                return buildHost.getPrograms;
            },
        });
    });
}
