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

export type ReadableProgramBuildInfoDiagnosticOfFile = [file: string, diagnostics: readonly ts.ReusableDiagnostic[]];
export type ReadableProgramBuildInfoDiagnostic = [file: string, "not cached or not changed"] | ReadableProgramBuildInfoDiagnosticOfFile;
export type ReadableProgramBuildInfoEmitDiagnostic = ReadableProgramBuildInfoDiagnosticOfFile;
export type ReadableBuilderFileEmit = string & { __readableBuilderFileEmit: any; };
export type ReadableProgramBuilderInfoFilePendingEmit = [original: string | [string], emitKind: ReadableBuilderFileEmit];
export type ReadableProgramBuildInfoEmitSignature = string | [file: string, signature: ts.EmitSignature | []];
export type ReadableProgramBuildInfoFileInfo<T> = Omit<ts.BuilderState.FileInfo, "impliedFormat"> & {
    impliedFormat: string | undefined;
    original: T | undefined;
};
export type ReadableProgramBuildInfoRoot =
    | [original: ts.ProgramBuildInfoFileId, readable: string]
    | [original: ts.ProgramBuildInfoRootStartEnd, readable: readonly string[]];

export type ReadableProgramBuildInfoResolvedRoot = [
    original: ts.ProgramBuildInfoResolvedRoot,
    readable: [resolved: string, root: string],
];
export type ReadableProgramMultiFileEmitBuildInfo =
    & Omit<
        ts.ProgramMultiFileEmitBuildInfo,
        | "fileIdsList"
        | "fileInfos"
        | "root"
        | "resolvedRoot"
        | "referencedMap"
        | "semanticDiagnosticsPerFile"
        | "emitDiagnosticsPerFile"
        | "affectedFilesPendingEmit"
        | "changeFileSet"
        | "emitSignatures"
    >
    & {
        fileNamesList: readonly (readonly string[])[] | undefined;
        fileInfos: ts.MapLike<ReadableProgramBuildInfoFileInfo<ts.ProgramMultiFileEmitBuildInfoFileInfo>>;
        root: readonly ReadableProgramBuildInfoRoot[];
        resolvedRoot: readonly ReadableProgramBuildInfoResolvedRoot[] | undefined;
        referencedMap: ts.MapLike<string[]> | undefined;
        semanticDiagnosticsPerFile: readonly ReadableProgramBuildInfoDiagnostic[] | undefined;
        emitDiagnosticsPerFile: readonly ReadableProgramBuildInfoEmitDiagnostic[] | undefined;
        affectedFilesPendingEmit: readonly ReadableProgramBuilderInfoFilePendingEmit[] | undefined;
        changeFileSet: readonly string[] | undefined;
        emitSignatures: readonly ReadableProgramBuildInfoEmitSignature[] | undefined;
    };
export type ReadableProgramBuildInfoBundlePendingEmit = [emitKind: ReadableBuilderFileEmit, original: ts.ProgramBuildInfoBundlePendingEmit];
export type ReadableProgramBundleEmitBuildInfo =
    & Omit<
        ts.ProgramBundleEmitBuildInfo,
        | "fileInfos"
        | "root"
        | "resolvedRoot"
        | "semanticDiagnosticsPerFile"
        | "emitDiagnosticsPerFile"
        | "changeFileSet"
        | "pendingEmit"
    >
    & {
        fileInfos: ts.MapLike<string | ReadableProgramBuildInfoFileInfo<ts.BuilderState.FileInfo>>;
        root: readonly ReadableProgramBuildInfoRoot[];
        resolvedRoot: readonly ReadableProgramBuildInfoResolvedRoot[] | undefined;
        semanticDiagnosticsPerFile: readonly ReadableProgramBuildInfoDiagnostic[] | undefined;
        emitDiagnosticsPerFile: readonly ReadableProgramBuildInfoEmitDiagnostic[] | undefined;
        changeFileSet: readonly string[] | undefined;
        pendingEmit: ReadableProgramBuildInfoBundlePendingEmit | undefined;
    };

export type ReadableProgramBuildInfo = ReadableProgramMultiFileEmitBuildInfo | ReadableProgramBundleEmitBuildInfo;

export function isReadableProgramBundleEmitBuildInfo(info: ReadableProgramBuildInfo | undefined): info is ReadableProgramBundleEmitBuildInfo {
    return !!info && !!info.options?.outFile;
}
export type ReadableBuildInfo = Omit<ts.BuildInfo, "program"> & { program: ReadableProgramBuildInfo | undefined; size: number; };
function generateBuildInfoProgramBaseline(sys: ts.System, buildInfoPath: string, buildInfo: ts.BuildInfo) {
    let program: ReadableProgramBuildInfo | undefined;
    let fileNamesList: string[][] | undefined;
    if (buildInfo.program && ts.isProgramBundleEmitBuildInfo(buildInfo.program)) {
        const fileInfos: ReadableProgramBundleEmitBuildInfo["fileInfos"] = {};
        buildInfo.program?.fileInfos?.forEach((fileInfo, index) =>
            fileInfos[toFileName(index + 1 as ts.ProgramBuildInfoFileId)] = ts.isString(fileInfo) ?
                fileInfo :
                toReadableFileInfo(fileInfo, ts.identity)
        );
        const pendingEmit = buildInfo.program.pendingEmit;
        program = {
            ...buildInfo.program,
            fileInfos,
            root: buildInfo.program.root.map(toReadableProgramBuildInfoRoot),
            resolvedRoot: buildInfo.program.resolvedRoot?.map(toReadableProgramBuildInfoResolvedRoot),
            semanticDiagnosticsPerFile: toReadableProgramBuildInfoDiagnosticsPerFile(buildInfo.program.semanticDiagnosticsPerFile),
            emitDiagnosticsPerFile: toReadableProgramBuildInfoEmitDiagnosticsPerFile(buildInfo.program.emitDiagnosticsPerFile),
            changeFileSet: buildInfo.program.changeFileSet?.map(toFileName),
            pendingEmit: pendingEmit === undefined ?
                undefined :
                [
                    toReadableBuilderFileEmit(ts.toProgramEmitPending(pendingEmit, buildInfo.program.options)),
                    pendingEmit,
                ],
        };
    }
    else if (buildInfo.program) {
        const fileInfos: ReadableProgramMultiFileEmitBuildInfo["fileInfos"] = {};
        buildInfo.program?.fileInfos?.forEach((fileInfo, index) => fileInfos[toFileName(index + 1 as ts.ProgramBuildInfoFileId)] = toReadableFileInfo(fileInfo, ts.toBuilderStateFileInfoForMultiEmit));
        fileNamesList = buildInfo.program.fileIdsList?.map(fileIdsListId => fileIdsListId.map(toFileName));
        const fullEmitForOptions = buildInfo.program.affectedFilesPendingEmit ? ts.getBuilderFileEmit(buildInfo.program.options || {}) : undefined;
        program = buildInfo.program && {
            fileNames: buildInfo.program.fileNames,
            fileNamesList,
            fileInfos: buildInfo.program.fileInfos ? fileInfos : undefined!,
            root: buildInfo.program.root.map(toReadableProgramBuildInfoRoot),
            resolvedRoot: buildInfo.program.resolvedRoot?.map(toReadableProgramBuildInfoResolvedRoot),
            options: buildInfo.program.options,
            referencedMap: toMapOfReferencedSet(buildInfo.program.referencedMap),
            semanticDiagnosticsPerFile: toReadableProgramBuildInfoDiagnosticsPerFile(buildInfo.program.semanticDiagnosticsPerFile),
            emitDiagnosticsPerFile: toReadableProgramBuildInfoEmitDiagnosticsPerFile(buildInfo.program.emitDiagnosticsPerFile),
            affectedFilesPendingEmit: buildInfo.program.affectedFilesPendingEmit?.map(value => toReadableProgramBuilderInfoFilePendingEmit(value, fullEmitForOptions!)),
            changeFileSet: buildInfo.program.changeFileSet?.map(toFileName),
            emitSignatures: buildInfo.program.emitSignatures?.map(s =>
                ts.isNumber(s) ?
                    toFileName(s) :
                    [toFileName(s[0]), s[1]]
            ),
            latestChangedDtsFile: buildInfo.program.latestChangedDtsFile,
        };
    }
    const version = buildInfo.version === ts.version ? fakes.version : buildInfo.version;
    const result: ReadableBuildInfo = {
        program,
        version,
        size: ts.getBuildInfoText({ ...buildInfo, version }).length,
    };
    // For now its just JSON.stringify
    sys.writeFile(`${buildInfoPath}.readable.baseline.txt`, jsonToReadableText(result));

    function toFileName(fileId: ts.ProgramBuildInfoFileId) {
        return buildInfo.program!.fileNames[fileId - 1];
    }

    function toFileNames(fileIdsListId: ts.ProgramBuildInfoFileIdListId) {
        return fileNamesList![fileIdsListId - 1];
    }

    function toReadableFileInfo<T>(original: T, toFileInfo: (fileInfo: T) => ts.BuilderState.FileInfo): ReadableProgramBuildInfoFileInfo<T> {
        const info = toFileInfo(original);
        return {
            original: ts.isString(original) ? undefined : original,
            ...info,
            impliedFormat: info.impliedFormat && ts.getNameOfCompilerOptionValue(info.impliedFormat, ts.moduleOptionDeclaration.type),
        };
    }

    function toReadableProgramBuildInfoRoot(original: ts.ProgramBuildInfoRoot): ReadableProgramBuildInfoRoot {
        if (!ts.isArray(original)) return [original, toFileName(original)];
        const readable: string[] = [];
        for (let index = original[0]; index <= original[1]; index++) readable.push(toFileName(index));
        return [original, readable];
    }

    function toReadableProgramBuildInfoResolvedRoot(original: ts.ProgramBuildInfoResolvedRoot): ReadableProgramBuildInfoResolvedRoot {
        return [original, [toFileName(original[0]), toFileName(original[1])]];
    }

    function toMapOfReferencedSet(referenceMap: ts.ProgramBuildInfoReferencedMap | undefined): ts.MapLike<string[]> | undefined {
        if (!referenceMap) return undefined;
        const result: ts.MapLike<string[]> = {};
        for (const [fileNamesKey, fileNamesListKey] of referenceMap) {
            result[toFileName(fileNamesKey)] = toFileNames(fileNamesListKey);
        }
        return result;
    }

    function toReadableProgramBuilderInfoFilePendingEmit(value: ts.ProgramBuilderInfoFilePendingEmit, fullEmitForOptions: ts.BuilderFileEmit): ReadableProgramBuilderInfoFilePendingEmit {
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

    function toReadableProgramBuildInfoDiagnosticsPerFile(diagnostics: ts.ProgramBuildInfoDiagnostic[] | undefined): readonly ReadableProgramBuildInfoDiagnostic[] | undefined {
        return diagnostics?.map(d =>
            ts.isNumber(d) ?
                [toFileName(d), "not cached or not changed"] :
                [toFileName(d[0]), d[1]]
        );
    }

    function toReadableProgramBuildInfoEmitDiagnosticsPerFile(diagnostics: ts.ProgramBuildInfoEmitDiagnostic[] | undefined): readonly ReadableProgramBuildInfoEmitDiagnostic[] | undefined {
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
    generateBuildInfoProgramBaseline(sys, buildInfoPath, buildInfo);
}

export function tscBaselineName(scenario: string, subScenario: string, commandLineArgs: readonly string[], isWatch?: boolean, suffix?: string) {
    return `${ts.isBuild(commandLineArgs) ? "tsbuild" : "tsc"}${isWatch ? "Watch" : ""}/${scenario}/${subScenario.split(" ").join("-")}${suffix ? suffix : ""}.js`;
}
