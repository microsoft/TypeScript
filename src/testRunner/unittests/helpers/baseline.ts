import * as fakes from "../../_namespaces/fakes.js";
import * as Harness from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { TscCompileSystem } from "./tsc.js";
import { TestServerHost } from "./virtualFileSystemWithWatch.js";

export function sanitizeSysOutput(output: string) {
    return output
        .replace(/Elapsed::\s[0-9]+(?:\.\d+)?ms/g, "Elapsed:: *ms")
        .replace(/[0-9][0-9]:[0-9][0-9]:[0-9][0-9]\s(A|P)M/g, "HH:MM:SS AM");
}

export type CommandLineProgram = [ts.Program, ts.BuilderProgram?];
export interface CommandLineCallbacks {
    cb: ts.ExecuteCommandLineCallbacks;
    getPrograms: () => readonly CommandLineProgram[];
}

function isAnyProgram(program: ts.Program | ts.BuilderProgram | ts.ParsedCommandLine): program is ts.Program | ts.BuilderProgram {
    return !!(program as ts.Program | ts.BuilderProgram).getCompilerOptions;
}
export function commandLineCallbacks(
    sys: TscCompileSystem | TestServerHost,
    originalReadCall?: ts.System["readFile"],
): CommandLineCallbacks {
    let programs: CommandLineProgram[] | undefined;

    return {
        cb: program => {
            if (isAnyProgram(program)) {
                baselineBuildInfo(program.getCompilerOptions(), sys, originalReadCall);
                (programs || (programs = [])).push(
                    ts.isBuilderProgram(program) ?
                        [program.getProgram(), program] :
                        [program],
                );
            }
            else {
                baselineBuildInfo(program.options, sys, originalReadCall);
            }
        },
        getPrograms: () => {
            const result = programs || ts.emptyArray;
            programs = undefined;
            return result;
        },
    };
}

export function baselinePrograms(baseline: string[], programs: readonly CommandLineProgram[], oldPrograms: readonly (CommandLineProgram | undefined)[], baselineDependencies: boolean | undefined) {
    for (let i = 0; i < programs.length; i++) {
        baselineProgram(baseline, programs[i], oldPrograms[i], baselineDependencies);
    }
}

function baselineProgram(baseline: string[], [program, builderProgram]: CommandLineProgram, oldProgram: CommandLineProgram | undefined, baselineDependencies: boolean | undefined) {
    if (program !== oldProgram?.[0]) {
        const options = program.getCompilerOptions();
        baseline.push(`Program root files: ${jsonToReadableText(program.getRootFileNames())}`);
        baseline.push(`Program options: ${jsonToReadableText(options)}`);
        baseline.push(`Program structureReused: ${(ts as any).StructureIsReused[program.structureIsReused]}`);
        baseline.push("Program files::");
        for (const file of program.getSourceFiles()) {
            baseline.push(file.fileName);
        }
    }
    else {
        baseline.push(`Program: Same as old program`);
    }
    baseline.push("");

    if (!builderProgram) return;
    if (builderProgram !== oldProgram?.[1]) {
        const internalState = builderProgram.state as ts.BuilderProgramState;
        if (builderProgram.state.semanticDiagnosticsPerFile.size) {
            baseline.push("Semantic diagnostics in builder refreshed for::");
            for (const file of program.getSourceFiles()) {
                if (!internalState.semanticDiagnosticsFromOldState || !internalState.semanticDiagnosticsFromOldState.has(file.resolvedPath)) {
                    baseline.push(file.fileName);
                }
            }
        }
        else {
            baseline.push("No cached semantic diagnostics in the builder::");
        }
        if (internalState) {
            baseline.push("");
            if (internalState.hasCalledUpdateShapeSignature?.size) {
                baseline.push("Shape signatures in builder refreshed for::");
                internalState.hasCalledUpdateShapeSignature.forEach((path: ts.Path) => {
                    const info = builderProgram.state.fileInfos.get(path);
                    const signatureInfo = internalState.signatureInfo?.get(path)!;
                    switch (signatureInfo) {
                        case ts.SignatureInfo.ComputedDts:
                            baseline.push(path + " (computed .d.ts)");
                            break;
                        case ts.SignatureInfo.StoredSignatureAtEmit:
                            baseline.push(path + " (computed .d.ts during emit)");
                            break;
                        case ts.SignatureInfo.UsedVersion:
                            ts.Debug.assert(info?.version === info?.signature || !info?.signature);
                            baseline.push(path + " (used version)");
                            break;
                        default:
                            ts.Debug.assertNever(signatureInfo);
                    }
                });
            }
            else {
                baseline.push("No shapes updated in the builder::");
            }
        }
        baseline.push("");
        if (!baselineDependencies) return;
        baseline.push("Dependencies for::");
        for (const file of builderProgram.getSourceFiles()) {
            baseline.push(`${file.fileName}:`);
            for (const depenedency of builderProgram.getAllDependencies(file)) {
                baseline.push(`  ${depenedency}`);
            }
        }
    }
    else {
        baseline.push(`BuilderProgram: Same as old builder program`);
    }
    baseline.push("");
}

export function generateSourceMapBaselineFiles(sys: ts.System & { writtenFiles: ts.ReadonlyCollection<ts.Path>; }) {
    const mapFileNames = ts.mapDefinedIterator(sys.writtenFiles.keys(), f => f.endsWith(".map") ? f : undefined);
    for (const mapFile of mapFileNames) {
        const text = Harness.SourceMapRecorder.getSourceMapRecordWithSystem(sys, mapFile);
        sys.writeFile(`${mapFile}.baseline.txt`, text);
    }
}

export type ReadableIncrementalBuildInfoDiagnosticOfFile = [file: string, diagnostics: readonly ts.ReusableDiagnostic[]];
export type ReadableIncrementalBuildInfoDiagnostic = [file: string, "not cached"] | ReadableIncrementalBuildInfoDiagnosticOfFile;
export type ReadableIncrementalBuildInfoEmitDiagnostic = ReadableIncrementalBuildInfoDiagnosticOfFile;
export type ReadableBuilderFileEmit = string & { __readableBuilderFileEmit: any; };
export type ReadableIncrementalBuilderInfoFilePendingEmit = [original: string | [string], emitKind: ReadableBuilderFileEmit];
export type ReadableIncrementalBuildInfoEmitSignature = string | [file: string, signature: ts.EmitSignature | []];
export type ReadableIncrementalBuildInfoFileInfo<T> = Omit<ts.BuilderState.FileInfo, "impliedFormat"> & {
    impliedFormat: string | undefined;
    original: T | undefined;
};
export type ReadableIncrementalBuildInfoRoot =
    | [original: ts.IncrementalBuildInfoFileId, readable: string]
    | [original: ts.IncrementalBuildInfoRootStartEnd, readable: readonly string[]];

export type ReadableIncrementalBuildInfoResolvedRoot = [
    original: ts.IncrementalBuildInfoResolvedRoot,
    readable: [resolved: string, root: string],
];

export type ReadableIncrementalBuildInfoBase =
    & Omit<
        ts.IncrementalBuildInfoBase,
        | "root"
        | "resolvedRoot"
        | "semanticDiagnosticsPerFile"
        | "emitDiagnosticsPerFile"
    >
    & {
        root: readonly ReadableIncrementalBuildInfoRoot[];
        resolvedRoot: readonly ReadableIncrementalBuildInfoResolvedRoot[] | undefined;
        semanticDiagnosticsPerFile: readonly ReadableIncrementalBuildInfoDiagnostic[] | undefined;
        emitDiagnosticsPerFile: readonly ReadableIncrementalBuildInfoEmitDiagnostic[] | undefined;
    }
    & ReadableBuildInfo;
export type ReadableIncrementalMultiFileEmitBuildInfo =
    & Omit<
        ts.IncrementalMultiFileEmitBuildInfo,
        | "fileIdsList"
        | "fileInfos"
        | "root"
        | "resolvedRoot"
        | "referencedMap"
        | "semanticDiagnosticsPerFile"
        | "emitDiagnosticsPerFile"
        | "affectedFilesPendingEmit"
        | "emitSignatures"
    >
    & ReadableIncrementalBuildInfoBase
    & {
        fileIdsList: readonly (readonly string[])[] | undefined;
        fileInfos: ts.MapLike<ReadableIncrementalBuildInfoFileInfo<ts.IncrementalMultiFileEmitBuildInfoFileInfo>>;
        referencedMap: ts.MapLike<string[]> | undefined;
        affectedFilesPendingEmit: readonly ReadableIncrementalBuilderInfoFilePendingEmit[] | undefined;
        emitSignatures: readonly ReadableIncrementalBuildInfoEmitSignature[] | undefined;
    };
export type ReadableIncrementalBuildInfoBundlePendingEmit = [emitKind: ReadableBuilderFileEmit, original: ts.IncrementalBuildInfoBundlePendingEmit];
export type ReadableIncrementalBundleEmitBuildInfo =
    & Omit<
        ts.IncrementalBundleEmitBuildInfo,
        | "fileInfos"
        | "root"
        | "resolvedRoot"
        | "semanticDiagnosticsPerFile"
        | "emitDiagnosticsPerFile"
        | "pendingEmit"
    >
    & ReadableIncrementalBuildInfoBase
    & {
        fileInfos: ts.MapLike<string | ReadableIncrementalBuildInfoFileInfo<ts.BuilderState.FileInfo>>;
        pendingEmit: ReadableIncrementalBuildInfoBundlePendingEmit | undefined;
    };

export type ReadableIncrementalBuildInfo = ReadableIncrementalMultiFileEmitBuildInfo | ReadableIncrementalBundleEmitBuildInfo;
export function isReadableIncrementalBuildInfo(buildInfo: ReadableBuildInfo): buildInfo is ReadableIncrementalBuildInfo {
    return !!(buildInfo as ReadableIncrementalBuildInfo).fileNames;
}

export function isReadableIncrementalBundleEmitBuildInfo(info: ReadableBuildInfo | undefined): info is ReadableIncrementalBundleEmitBuildInfo {
    return !!info && isReadableIncrementalBuildInfo(info) && !!info.options?.outFile;
}
export function isReadableIncrementalMultiFileEmitBuildInfo(info: ReadableBuildInfo | undefined): info is ReadableIncrementalMultiFileEmitBuildInfo {
    return !!info && isReadableIncrementalBuildInfo(info) && !info.options?.outFile;
}
export interface ReadableBuildInfo extends ts.BuildInfo {
    size: number;
}
function generateBuildInfoBaseline(sys: ts.System, buildInfoPath: string, buildInfo: ts.BuildInfo) {
    let fileIdsList: string[][] | undefined;
    let result;
    const version = buildInfo.version === ts.version ? fakes.version : buildInfo.version;
    if (!ts.isIncrementalBuildInfo(buildInfo)) {
        result = {
            ...buildInfo,
            version,
            size: toSize(),
        } satisfies ReadableBuildInfo;
    }
    else if (ts.isIncrementalBundleEmitBuildInfo(buildInfo)) {
        const fileInfos: ReadableIncrementalBundleEmitBuildInfo["fileInfos"] = {};
        buildInfo.fileInfos?.forEach((fileInfo, index) =>
            fileInfos[toFileName(index + 1 as ts.IncrementalBuildInfoFileId)] = ts.isString(fileInfo) ?
                fileInfo :
                toReadableIncrementalBuildInfoFileInfo(fileInfo, ts.identity)
        );
        const pendingEmit = buildInfo.pendingEmit;
        result = {
            ...buildInfo,
            fileInfos,
            root: buildInfo.root.map(toReadableIncrementalBuildInfoRoot),
            resolvedRoot: buildInfo.resolvedRoot?.map(toReadableIncrementalBuildInfoResolvedRoot),
            semanticDiagnosticsPerFile: toReadableIncrementalBuildInfoDiagnostic(buildInfo.semanticDiagnosticsPerFile),
            emitDiagnosticsPerFile: toReadableIncrementalBuildInfoEmitDiagnostic(buildInfo.emitDiagnosticsPerFile),
            pendingEmit: pendingEmit === undefined ?
                undefined :
                [
                    toReadableBuilderFileEmit(ts.toProgramEmitPending(pendingEmit, buildInfo.options)),
                    pendingEmit,
                ],
            version,
            size: toSize(),
        } satisfies ReadableIncrementalBundleEmitBuildInfo;
    }
    else {
        const fileInfos: ReadableIncrementalMultiFileEmitBuildInfo["fileInfos"] = {};
        buildInfo.fileInfos.forEach((fileInfo, index) => fileInfos[toFileName(index + 1 as ts.IncrementalBuildInfoFileId)] = toReadableIncrementalBuildInfoFileInfo(fileInfo, ts.toBuilderStateFileInfoForMultiEmit));
        fileIdsList = buildInfo.fileIdsList?.map(fileIdsListId => fileIdsListId.map(toFileName));
        const fullEmitForOptions = buildInfo.affectedFilesPendingEmit ? ts.getBuilderFileEmit(buildInfo.options || {}) : undefined;
        result = {
            ...buildInfo,
            fileIdsList,
            fileInfos,
            root: buildInfo.root.map(toReadableIncrementalBuildInfoRoot),
            resolvedRoot: buildInfo.resolvedRoot?.map(toReadableIncrementalBuildInfoResolvedRoot),
            referencedMap: toMapOfReferencedSet(buildInfo.referencedMap),
            semanticDiagnosticsPerFile: toReadableIncrementalBuildInfoDiagnostic(buildInfo.semanticDiagnosticsPerFile),
            emitDiagnosticsPerFile: toReadableIncrementalBuildInfoEmitDiagnostic(buildInfo.emitDiagnosticsPerFile),
            affectedFilesPendingEmit: buildInfo.affectedFilesPendingEmit?.map(value => toReadableIncrementalBuilderInfoFilePendingEmit(value, fullEmitForOptions!)),
            emitSignatures: buildInfo.emitSignatures?.map(s =>
                ts.isNumber(s) ?
                    toFileName(s) :
                    [toFileName(s[0]), s[1]]
            ),
            version,
            size: toSize(),
        } satisfies ReadableIncrementalMultiFileEmitBuildInfo;
    }
    // For now its just JSON.stringify
    sys.writeFile(`${buildInfoPath}.readable.baseline.txt`, jsonToReadableText(result));

    function toSize() {
        return ts.getBuildInfoText({ ...buildInfo, version }).length;
    }

    function toFileName(fileId: ts.IncrementalBuildInfoFileId) {
        return (buildInfo as ts.IncrementalBuildInfo).fileNames[fileId - 1];
    }

    function toFileNames(fileIdsListId: ts.IncrementalBuildInfoFileIdListId) {
        return fileIdsList![fileIdsListId - 1];
    }

    function toReadableIncrementalBuildInfoFileInfo<T>(
        original: T,
        toFileInfo: (fileInfo: T) => ts.BuilderState.FileInfo,
    ): ReadableIncrementalBuildInfoFileInfo<T> {
        const info = toFileInfo(original);
        return {
            original: ts.isString(original) ? undefined : original,
            ...info,
            impliedFormat: info.impliedFormat && ts.getNameOfCompilerOptionValue(info.impliedFormat, ts.moduleOptionDeclaration.type),
        };
    }

    function toReadableIncrementalBuildInfoRoot(
        original: ts.IncrementalBuildInfoRoot,
    ): ReadableIncrementalBuildInfoRoot {
        if (!ts.isArray(original)) return [original, toFileName(original)];
        const readable: string[] = [];
        for (let index = original[0]; index <= original[1]; index++) readable.push(toFileName(index));
        return [original, readable];
    }

    function toReadableIncrementalBuildInfoResolvedRoot(
        original: ts.IncrementalBuildInfoResolvedRoot,
    ): ReadableIncrementalBuildInfoResolvedRoot {
        return [original, [toFileName(original[0]), toFileName(original[1])]];
    }

    function toMapOfReferencedSet(
        referenceMap: ts.IncrementalBuildInfoReferencedMap | undefined,
    ): ts.MapLike<string[]> | undefined {
        if (!referenceMap) return undefined;
        const result: ts.MapLike<string[]> = {};
        for (const [fileNamesKey, fileNamesListKey] of referenceMap) {
            result[toFileName(fileNamesKey)] = toFileNames(fileNamesListKey);
        }
        return result;
    }

    function toReadableIncrementalBuilderInfoFilePendingEmit(
        value: ts.IncrementalBuildInfoFilePendingEmit,
        fullEmitForOptions: ts.BuilderFileEmit,
    ): ReadableIncrementalBuilderInfoFilePendingEmit {
        return [
            ts.isNumber(value) ? toFileName(value) : [toFileName(value[0])],
            toReadableBuilderFileEmit(ts.toBuilderFileEmit(value, fullEmitForOptions)),
        ];
    }

    function toReadableBuilderFileEmit(emit: ts.BuilderFileEmit | undefined): ReadableBuilderFileEmit {
        let result = "";
        if (emit) {
            if (emit & ts.BuilderFileEmit.Js) addFlags("Js");
            if (emit & ts.BuilderFileEmit.JsMap) addFlags("JsMap");
            if (emit & ts.BuilderFileEmit.JsInlineMap) addFlags("JsInlineMap");
            if (emit & ts.BuilderFileEmit.Dts) addFlags("Dts");
            if (emit & ts.BuilderFileEmit.DtsMap) addFlags("DtsMap");
        }
        return (result || "None") as ReadableBuilderFileEmit;
        function addFlags(flag: string) {
            result = result ? `${result} | ${flag}` : flag;
        }
    }

    function toReadableIncrementalBuildInfoDiagnostic(
        diagnostics: ts.IncrementalBuildInfoDiagnostic[] | undefined,
    ): readonly ReadableIncrementalBuildInfoDiagnostic[] | undefined {
        return diagnostics?.map(d =>
            ts.isNumber(d) ?
                [toFileName(d), "not cached"] :
                [toFileName(d[0]), d[1]]
        );
    }

    function toReadableIncrementalBuildInfoEmitDiagnostic(
        diagnostics: ts.IncrementalBuildInfoEmitDiagnostic[] | undefined,
    ): readonly ReadableIncrementalBuildInfoEmitDiagnostic[] | undefined {
        return diagnostics?.map(d => [toFileName(d[0]), d[1]]);
    }
}

export function toPathWithSystem(sys: ts.System, fileName: string): ts.Path {
    return ts.toPath(fileName, sys.getCurrentDirectory(), ts.createGetCanonicalFileName(sys.useCaseSensitiveFileNames));
}

export function baselineBuildInfo(
    options: ts.CompilerOptions,
    sys: TscCompileSystem | TestServerHost,
    originalReadCall?: ts.System["readFile"],
) {
    const buildInfoPath = ts.getTsBuildInfoEmitOutputFilePath(options);
    if (!buildInfoPath || !sys.writtenFiles!.has(toPathWithSystem(sys, buildInfoPath))) return;
    if (!sys.fileExists(buildInfoPath)) return;

    const buildInfo = ts.getBuildInfo(buildInfoPath, (originalReadCall || sys.readFile).call(sys, buildInfoPath, "utf8"));
    if (!buildInfo) return sys.writeFile(`${buildInfoPath}.baseline.txt`, "Error reading valid buildinfo file");
    generateBuildInfoBaseline(sys, buildInfoPath, buildInfo);
}

export function tscBaselineName(scenario: string, subScenario: string, commandLineArgs: readonly string[], isWatch?: boolean, suffix?: string) {
    return `${ts.isBuild(commandLineArgs) ? "tsbuild" : "tsc"}${isWatch ? "Watch" : ""}/${scenario}/${subScenario.split(" ").join("-")}${suffix ? suffix : ""}.js`;
}
