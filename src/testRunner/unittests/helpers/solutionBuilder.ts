import * as fakes from "../../_namespaces/fakes";
import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    commandLineCallbacks,
} from "./baseline";
import {
    makeSystemReadyForBaseline,
    TscCompileSystem,
} from "./tsc";
import {
    changeToHostTrackingWrittenFiles,
    TestServerHost,
} from "./virtualFileSystemWithWatch";

export function createSolutionBuilderHostForBaseline(
    sys: TscCompileSystem | TestServerHost,
    versionToWrite?: string,
    originalRead?: (TscCompileSystem | TestServerHost)["readFile"],
) {
    if (sys instanceof fakes.System) makeSystemReadyForBaseline(sys, versionToWrite);
    const { cb } = commandLineCallbacks(sys, originalRead);
    const host = ts.createSolutionBuilderHost(sys, /*createProgram*/ undefined, ts.createDiagnosticReporter(sys, /*pretty*/ true), ts.createBuilderStatusReporter(sys, /*pretty*/ true));
    host.afterProgramEmitAndDiagnostics = cb;
    host.afterEmitBundle = cb;
    return host;
}

export function createSolutionBuilder(system: TestServerHost, rootNames: readonly string[], originalRead?: TestServerHost["readFile"]) {
    const host = createSolutionBuilderHostForBaseline(system, /*versionToWrite*/ undefined, originalRead);
    return ts.createSolutionBuilder(host, rootNames, {});
}

export function ensureErrorFreeBuild(host: TestServerHost, rootNames: readonly string[]) {
    // ts build should succeed
    solutionBuildWithBaseline(host, rootNames);
    assert.equal(host.getOutput().length, 0, jsonToReadableText(host.getOutput()));
}

export function solutionBuildWithBaseline(sys: TestServerHost, solutionRoots: readonly string[], originalRead?: TestServerHost["readFile"]) {
    const originalReadFile = sys.readFile;
    const originalWrite = sys.write;
    const originalWriteFile = sys.writeFile;
    ts.Debug.assert(sys.writtenFiles === undefined);
    const solutionBuilder = createSolutionBuilder(
        changeToHostTrackingWrittenFiles(
            fakes.patchHostForBuildInfoReadWrite(sys),
        ),
        solutionRoots,
        originalRead,
    );
    solutionBuilder.build();
    sys.readFile = originalReadFile;
    sys.write = originalWrite;
    sys.writeFile = originalWriteFile;
    sys.writtenFiles = undefined;
    return sys;
}
