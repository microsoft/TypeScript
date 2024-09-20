import { Baseline } from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    applyEdit,
    baselineAfterTscCompile as baseline_baselineAfterTscCompile,
    BaselineBase,
    CommandLineCallbacks,
    commandLineCallbacks,
    CommandLineProgram,
    createBaseline,
    isReadableIncrementalBuildInfo,
    isReadableIncrementalBundleEmitBuildInfo,
    isReadableIncrementalMultiFileEmitBuildInfo,
    isWatch,
    ReadableBuildInfo,
    ReadableIncrementalBuildInfo,
    ReadableIncrementalBuildInfoFileInfo,
    ReadableIncrementalBundleEmitBuildInfo,
    ReadableIncrementalMultiFileEmitBuildInfo,
    toPathWithSystem,
    tscBaselineName,
    TscWatchSystem,
} from "./baseline.js";
import {
    isFsFile,
    TestServerHost,
    TestServerHostSnapshot,
} from "./virtualFileSystemWithWatch.js";

export const noChangeRun: TestTscEdit = {
    caption: "no-change-run",
    edit: ts.noop,
};
export const noChangeOnlyRuns: TestTscEdit[] = [noChangeRun];

export interface TestTscCompile {
    commandLineArgs: readonly string[];
    sys: () => TestServerHost;
    modifySystem?: (fs: TestServerHost) => void;
    computeDtsSignatures?: boolean;
    getWrittenFiles?: boolean;
    baselineSourceMap?: boolean;
    baselineReadFileCalls?: boolean;
    baselinePrograms?: boolean;
    baselineDependencies?: boolean;
    compile?: (sys: TscWatchSystem) => CommandLineCallbacks["getPrograms"];
}

/**
 * Initialize Fs, execute command line and save baseline
 */
function initialTestTscCompile(input: TestTscCompile) {
    const { sys, baseline } = createBaseline(input.sys(), input.modifySystem);
    sys.exit = exitCode => sys.exitCode = exitCode;
    ts.Debug.assert(!isWatch(input.commandLineArgs), "use verifyTscWatch");
    return testTscCompileWith(sys, baseline, input);
}

/**
 * execute command line and save baseline
 */
function testTscCompileWith(
    sys: BaselineBase["sys"],
    baseline: BaselineBase["baseline"],
    input: TestTscCompileBaselineInput & Pick<TestTscCompile, "compile">,
) {
    let actualReadFileMap: ts.MapLike<number> | undefined;
    let getPrograms: CommandLineCallbacks["getPrograms"] | undefined;
    if (!input.compile) {
        actualReadFileMap = {};
        const originalReadFile = sys.readFile;
        if (input.baselineReadFileCalls) {
            sys.readFile = path => {
                // Dont record libs
                if (!path.startsWith(ts.getDirectoryPath(sys.getExecutingFilePath()))) {
                    actualReadFileMap![path] = (ts.getProperty(actualReadFileMap!, path) || 0) + 1;
                }
                return originalReadFile.call(sys, path);
            };
        }
        const result = commandLineCallbacks(sys, originalReadFile);
        ts.executeCommandLine(
            sys,
            result.cb,
            input.commandLineArgs,
        );
        sys.readFile = originalReadFile;
        getPrograms = result.getPrograms;
    }
    else {
        getPrograms = input.compile(sys);
    }
    const { dtsSignatures, writtenFiles } = baselineAfterTscCompile(sys, baseline, input, getPrograms, actualReadFileMap);
    return { sys, baseline, dtsSignatures, writtenFiles };
}
type TestTscCompileBaselineInput = Pick<
    TestTscCompile,
    | "commandLineArgs"
    | "computeDtsSignatures"
    | "getWrittenFiles"
    | "baselineSourceMap"
    | "baselineReadFileCalls"
    | "baselinePrograms"
    | "baselineDependencies"
>;
function baselineAfterTscCompile(
    sys: BaselineBase["sys"],
    baseline: BaselineBase["baseline"],
    input: TestTscCompileBaselineInput,
    getPrograms: () => readonly CommandLineProgram[],
    actualReadFileMap: ts.MapLike<number> | undefined,
) {
    baseline.push(`${sys.getExecutingFilePath()} ${input.commandLineArgs.join(" ")}`);
    const writtenFiles = input.getWrittenFiles ? new Set(sys.writtenFiles.keys()) : undefined;
    const programs = baseline_baselineAfterTscCompile(
        sys,
        baseline,
        getPrograms,
        ts.emptyArray,
        input.baselineSourceMap,
        input.baselinePrograms,
        input.baselineDependencies,
    );
    const dtsSignatures = input.computeDtsSignatures ? storeDtsSignatures(sys, programs) : undefined;
    if (input.baselineReadFileCalls) {
        baseline.push(`readFiles:: ${jsonToReadableText(actualReadFileMap)} `);
    }
    actualReadFileMap = undefined;
    return { dtsSignatures, writtenFiles };
}

function storeDtsSignatures(sys: TscWatchSystem, programs: readonly CommandLineProgram[]) {
    let dtsSignatures: Map<ts.Path, Map<string, string>> | undefined;
    for (const [program, builderProgram] of programs) {
        if (!builderProgram) continue;
        const buildInfoPath = ts.getTsBuildInfoEmitOutputFilePath(program.getCompilerOptions());
        if (!buildInfoPath) continue;
        dtsSignatures ??= new Map();
        const dtsSignatureData = new Map<string, string>();
        dtsSignatures.set(`${toPathWithSystem(sys, buildInfoPath)}.readable.baseline.txt` as ts.Path, dtsSignatureData);
        builderProgram.state.hasCalledUpdateShapeSignature?.forEach(resolvedPath => {
            const file = program.getSourceFileByPath(resolvedPath);
            if (!file || file.isDeclarationFile) return;
            // Compute dts and exported map and store it
            ts.BuilderState.computeDtsSignature(
                program,
                file,
                /*cancellationToken*/ undefined,
                sys,
                signature => dtsSignatureData.set(relativeToBuildInfo(resolvedPath), signature),
            );
        });

        function relativeToBuildInfo(path: string) {
            const currentDirectory = program.getCurrentDirectory();
            const getCanonicalFileName = ts.createGetCanonicalFileName(program.useCaseSensitiveFileNames());
            const buildInfoDirectory = ts.getDirectoryPath(ts.getNormalizedAbsolutePath(buildInfoPath!, currentDirectory));
            return ts.ensurePathIsNonModuleName(ts.getRelativePathFromDirectory(buildInfoDirectory, path, getCanonicalFileName));
        }
    }
    return dtsSignatures;
}

function verifyTscEditDiscrepancies(
    input: VerifyTscWithEditsInput,
    index: number,
    snaps: readonly TestServerHostSnapshot[],
    baselines: string[] | undefined,
): string[] | undefined {
    const result = initialTestTscCompile({
        ...input,
        modifySystem: fs => {
            input.modifySystem?.(fs);
            for (let i = 0; i <= index; i++) {
                input.edits![i].edit(fs as TscWatchSystem);
            }
        },
        commandLineArgs: input.edits![index].commandLineArgs ?? input.commandLineArgs,
        computeDtsSignatures: true,
        getWrittenFiles: true,
    });
    let headerAdded = false;
    for (const outputFile of result.writtenFiles!.keys()) {
        const cleanBuildText = result.sys.readFile(outputFile);
        const incrementalFsEntry = snaps[index].get(outputFile);
        const incrementalBuildText = isFsFile(incrementalFsEntry) ? incrementalFsEntry.content : undefined;
        if (ts.isBuildInfoFile(outputFile)) {
            // Check only presence and absence and not text as we will do that for readable baseline
            if (!result.sys.fileExists(`${outputFile}.readable.baseline.txt`)) addBaseline(`Readable baseline not present in clean build:: File:: ${outputFile}`);
            if (!isFsFile(snaps[index].get(`${outputFile}.readable.baseline.txt` as ts.Path))) addBaseline(`Readable baseline not present in incremental build:: File:: ${outputFile}`);
            verifyPresenceAbsence(incrementalBuildText, cleanBuildText, `Incremental and clean tsbuildinfo file presence differs:: File:: ${outputFile}`);
        }
        else if (!ts.fileExtensionIs(outputFile, ".tsbuildinfo.readable.baseline.txt")) {
            verifyTextEqual(incrementalBuildText, cleanBuildText, `File: ${outputFile}`);
        }
        else if (incrementalBuildText !== cleanBuildText) {
            // Verify build info without affectedFilesPendingEmit
            const { buildInfo: incrementalBuildInfo, readableBuildInfo: incrementalReadableBuildInfo } = getBuildInfoForIncrementalCorrectnessCheck(incrementalBuildText);
            const { buildInfo: cleanBuildInfo, readableBuildInfo: cleanReadableBuildInfo } = getBuildInfoForIncrementalCorrectnessCheck(cleanBuildText);
            const dtsSignatures = result.dtsSignatures?.get(outputFile);
            verifyTextEqual(incrementalBuildInfo, cleanBuildInfo, `TsBuild info text without affectedFilesPendingEmit:: ${outputFile}::`);
            // Verify file info sigantures
            verifyMapLike(
                (incrementalReadableBuildInfo as ReadableIncrementalMultiFileEmitBuildInfo)?.fileInfos,
                (cleanReadableBuildInfo as ReadableIncrementalMultiFileEmitBuildInfo)?.fileInfos,
                (key, incrementalFileInfo, cleanFileInfo) => {
                    const dtsForKey = dtsSignatures?.get(key);
                    if (
                        !incrementalFileInfo ||
                        !cleanFileInfo ||
                        incrementalFileInfo.signature !== cleanFileInfo.signature &&
                            incrementalFileInfo.signature !== cleanFileInfo.version &&
                            (dtsForKey === undefined || incrementalFileInfo.signature !== dtsForKey)
                    ) {
                        return [
                            `Incremental signature is neither dts signature nor file version for File:: ${key}`,
                            `Incremental:: ${jsonToReadableText(incrementalFileInfo)}`,
                            `Clean:: ${jsonToReadableText(cleanFileInfo)}`,
                            `Dts Signature:: ${jsonToReadableText(dtsForKey)}`,
                        ];
                    }
                },
                `FileInfos:: File:: ${outputFile}`,
            );
            if (isReadableIncrementalMultiFileEmitBuildInfo(incrementalReadableBuildInfo)) {
                ts.Debug.assert(!isReadableIncrementalBundleEmitBuildInfo(cleanReadableBuildInfo));
                // Verify that incrementally pending affected file emit are in clean build since clean build can contain more files compared to incremental depending of noEmitOnError option
                incrementalReadableBuildInfo.affectedFilesPendingEmit?.forEach(([actualFileOrArray]) => {
                    const actualFile = ts.isString(actualFileOrArray) ? actualFileOrArray : actualFileOrArray[0];
                    if (
                        !ts.find(
                            (cleanReadableBuildInfo as ReadableIncrementalMultiFileEmitBuildInfo)?.affectedFilesPendingEmit,
                            ([expectedFileOrArray]) => actualFile === (ts.isString(expectedFileOrArray) ? expectedFileOrArray : expectedFileOrArray[0]),
                        )
                    ) {
                        addBaseline(
                            `Incremental build contains ${actualFile} file as pending emit, clean build does not have it: ${outputFile}::`,
                            `Incremental buildInfoText:: ${incrementalBuildText}`,
                            `Clean buildInfoText:: ${cleanBuildText}`,
                        );
                    }
                });
            }
            else {
                ts.Debug.assert(!isReadableIncrementalMultiFileEmitBuildInfo(cleanReadableBuildInfo));
                // Verify that incrementally pending affected file emit are in clean build since clean build can contain more files compared to incremental depending of noEmitOnError option
                if ((incrementalReadableBuildInfo as ReadableIncrementalBundleEmitBuildInfo)?.pendingEmit) {
                    if ((cleanReadableBuildInfo as ReadableIncrementalBundleEmitBuildInfo)?.pendingEmit === undefined) {
                        addBaseline(
                            `Incremental build contains pendingEmit, clean build does not have it: ${outputFile}::`,
                            `Incremental buildInfoText:: ${incrementalBuildText}`,
                            `Clean buildInfoText:: ${cleanBuildText}`,
                        );
                    }
                }
            }
            const readableIncrementalBuildInfo = incrementalReadableBuildInfo as ReadableIncrementalBuildInfo | undefined;
            const readableCleanBuildInfo = cleanReadableBuildInfo as ReadableIncrementalBuildInfo | undefined;
            readableIncrementalBuildInfo?.changeFileSet?.forEach(actualFile => {
                if (
                    !ts.find(
                        readableCleanBuildInfo?.changeFileSet,
                        expectedFile => actualFile === expectedFile,
                    )
                ) {
                    addBaseline(
                        `Incremental build contains ${actualFile} file in changeFileSet, clean build does not have it: ${outputFile}::`,
                        `Incremental buildInfoText:: ${incrementalBuildText}`,
                        `Clean buildInfoText:: ${cleanBuildText}`,
                    );
                }
            });
            readableIncrementalBuildInfo?.semanticDiagnosticsPerFile?.forEach((
                [actualFile, notCachedORDiagnostics],
            ) => {
                const cleanFileDiagnostics = ts.find(
                    readableCleanBuildInfo?.semanticDiagnosticsPerFile,
                    ([expectedFile]) => actualFile === expectedFile,
                );
                // Incremental build should have same diagnostics as clean build
                if (
                    cleanFileDiagnostics &&
                    JSON.stringify(notCachedORDiagnostics) === JSON.stringify(cleanFileDiagnostics[1])
                ) return;
                // If the diagnostics are marked as not cached in incremental build,
                // and clean build doesnt mark it that way because its in its change file set, its ok
                if (
                    !cleanFileDiagnostics &&
                    ts.isString(notCachedORDiagnostics) &&
                    ts.contains(readableCleanBuildInfo?.changeFileSet, actualFile)
                ) return;
                // Otherwise marked as "not Cached" in clean build with errors in incremental build is ok
                if (
                    ts.isString(cleanFileDiagnostics?.[1]) &&
                    !ts.isString(notCachedORDiagnostics)
                ) return;
                addBaseline(
                    `Incremental build contains ${actualFile} file ${!ts.isString(notCachedORDiagnostics) ? "has" : "does not have"} semantic errors, it does not match with clean build: ${outputFile}::`,
                    `Incremental buildInfoText:: ${incrementalBuildText}`,
                    `Clean buildInfoText:: ${cleanBuildText}`,
                );
            });
            readableCleanBuildInfo?.semanticDiagnosticsPerFile?.forEach((
                [expectedFile, cleanFileDiagnostics],
            ) => {
                if (
                    // if there are errors in the file
                    !ts.isString(cleanFileDiagnostics?.[1]) &&
                    // and its not already verified, its issue with the error caching
                    !ts.find(
                        readableIncrementalBuildInfo?.semanticDiagnosticsPerFile,
                        ([actualFile]) => actualFile === expectedFile,
                    )
                ) {
                    addBaseline(
                        `Incremental build does not contain ${expectedFile} file for semantic errors, clean build has semantic errors: ${outputFile}::`,
                        `Incremental buildInfoText:: ${incrementalBuildText}`,
                        `Clean buildInfoText:: ${cleanBuildText}`,
                    );
                }
            });
            readableIncrementalBuildInfo?.emitDiagnosticsPerFile?.forEach(([actualFile]) => {
                if (
                    // Does not have emit diagnostics in clean buildInfo
                    !ts.find(
                        readableCleanBuildInfo!.emitDiagnosticsPerFile,
                        ([expectedFile]) => actualFile === expectedFile,
                    ) &&
                    // Is not marked as affectedFilesPendingEmit in clean buildInfo
                    (!ts.find(
                        (readableCleanBuildInfo as ReadableIncrementalMultiFileEmitBuildInfo).affectedFilesPendingEmit,
                        ([expectedFileOrArray]) => actualFile === (ts.isString(expectedFileOrArray) ? expectedFileOrArray : expectedFileOrArray[0]),
                    )) &&
                    // Program emit is not pending in clean buildInfo
                    !(readableCleanBuildInfo as ReadableIncrementalBundleEmitBuildInfo).pendingEmit
                ) {
                    addBaseline(
                        `Incremental build contains ${actualFile} file has emit errors, clean build does not have errors or does not mark is as pending emit: ${outputFile}::`,
                        `Incremental buildInfoText:: ${incrementalBuildText}`,
                        `Clean buildInfoText:: ${cleanBuildText}`,
                    );
                }
            });
        }
    }
    if (!headerAdded && input.edits![index].discrepancyExplanation) addBaseline("*** Supplied discrepancy explanation but didnt find any difference");
    return baselines;

    function verifyTextEqual(incrementalText: string | undefined, cleanText: string | undefined, message: string) {
        if (incrementalText !== cleanText) writeNotEqual(incrementalText, cleanText, message);
    }

    function verifyMapLike<T>(
        incremental: ts.MapLike<T> | undefined,
        clean: ts.MapLike<T> | undefined,
        verifyValue: (key: string, incrementalValue: T | undefined, cleanValue: T | undefined) => string[] | undefined,
        message: string,
    ) {
        verifyPresenceAbsence(incremental, clean, `Incremental and clean do not match:: ${message}`);
        if (!incremental || !clean) return;
        const incrementalMap = new Map(Object.entries(incremental));
        const cleanMap = new Map(Object.entries(clean));
        cleanMap.forEach((cleanValue, key) => {
            const result = verifyValue(key, incrementalMap.get(key), cleanValue);
            if (result) addBaseline(...result);
        });
        incrementalMap.forEach((incremetnalValue, key) => {
            if (cleanMap.has(key)) return;
            // This is value only in incremental Map
            const result = verifyValue(key, incremetnalValue, /*cleanValue*/ undefined);
            if (result) addBaseline(...result);
        });
    }

    function verifyPresenceAbsence<T>(actual: T | undefined, expected: T | undefined, message: string) {
        if (expected === undefined) {
            if (actual === undefined) return;
        }
        else {
            if (actual !== undefined) return;
        }
        writeNotEqual(actual, expected, message);
    }

    function writeNotEqual<T>(actual: T | undefined, expected: T | undefined, message: string) {
        addBaseline(
            message,
            "CleanBuild:",
            ts.isString(expected) ? expected : jsonToReadableText(expected),
            "IncrementalBuild:",
            ts.isString(actual) ? actual : jsonToReadableText(actual),
        );
    }

    function addBaseline(...text: string[]) {
        if (!baselines || !headerAdded) {
            (baselines ||= []).push(`${index}:: ${input.edits![index].caption}`, ...(input.edits![index].discrepancyExplanation?.() || ["*** Needs explanation"]));
            headerAdded = true;
        }
        baselines.push(...text);
    }
}

function getBuildInfoForIncrementalCorrectnessCheck(text: string | undefined): {
    buildInfo: string | undefined;
    readableBuildInfo?: ReadableBuildInfo;
} {
    if (!text) return { buildInfo: text };
    const readableBuildInfo = JSON.parse(text) as ReadableBuildInfo;
    let sanitizedFileInfos: ts.MapLike<string | Omit<ReadableIncrementalBuildInfoFileInfo<ts.IncrementalMultiFileEmitBuildInfoFileInfo> | ReadableIncrementalBuildInfoFileInfo<ts.BuilderState.FileInfo>, "signature" | "original"> & { signature: undefined; original: undefined; }> | undefined;
    if (isReadableIncrementalBuildInfo(readableBuildInfo)) {
        sanitizedFileInfos = {};
        for (const id in readableBuildInfo.fileInfos) {
            if (ts.hasProperty(readableBuildInfo.fileInfos, id)) {
                const info = readableBuildInfo.fileInfos[id];
                sanitizedFileInfos[id] = ts.isString(info) ? info : { ...info, signature: undefined, original: undefined };
            }
        }
    }
    return {
        buildInfo: jsonToReadableText({
            ...readableBuildInfo,
            ...(isReadableIncrementalBuildInfo(readableBuildInfo) ?
                {
                    fileNames: undefined,
                    fileIdsList: undefined,
                    fileInfos: sanitizedFileInfos,
                    // Ignore noEmit since that shouldnt be reason to emit the tsbuild info and presence of it in the buildinfo file does not matter
                    options: readableBuildInfo.options && {
                        ...readableBuildInfo.options,
                        noEmit: undefined,
                    },
                    affectedFilesPendingEmit: undefined,
                    pendingEmit: undefined,
                    emitDiagnosticsPerFile: undefined,
                    latestChangedDtsFile: readableBuildInfo.latestChangedDtsFile ? "FakeFileName" : undefined,
                    semanticDiagnosticsPerFile: undefined,
                    changeFileSet: undefined,
                } : undefined),
            size: undefined, // Size doesnt need to be equal
        }),
        readableBuildInfo,
    };
}

export interface TestTscEdit {
    edit: (sys: TscWatchSystem) => void;
    caption: string;
    commandLineArgs?: readonly string[];
    /** An array of lines to be printed in order when a discrepancy is detected */
    discrepancyExplanation?: () => readonly string[];
}

export interface VerifyTscWithEditsInput extends Omit<TestTscCompile, "computeDtsSignatures" | "getWrittenFiles"> {
    scenario: string;
    subScenario: string;
    edits?: readonly TestTscEdit[];
}

/**
 * Verify non watch tsc invokcation after each edit
 */
export function verifyTsc(input: VerifyTscWithEditsInput): void {
    describe(`tsc ${input.commandLineArgs.join(" ")} ${input.scenario}:: ${input.subScenario}`, () => {
        let snaps: TestServerHostSnapshot[] | undefined;
        after(() => {
            snaps = undefined;
        });
        it("baseline for the tsc compiles", () => {
            const { sys, baseline } = initialTestTscCompile(input);
            input.edits?.forEach(edit => {
                applyEdit(sys, baseline, edit.edit, edit.caption);
                testTscCompileWith(sys, baseline, {
                    ...input,
                    commandLineArgs: edit.commandLineArgs ?? input.commandLineArgs,
                });
                (snaps ??= []).push(sys.getSnap());
            });
            Baseline.runBaseline(
                tscBaselineName(input.scenario, input.subScenario, input.commandLineArgs),
                baseline.join("\r\n"),
            );
        });
        if (input.edits?.length) {
            it("tsc invocation after edit and clean build correctness", () => {
                let baselines: string[] | undefined;
                for (let index = 0; index < input.edits!.length; index++) {
                    baselines = verifyTscEditDiscrepancies(
                        input,
                        index,
                        snaps!,
                        baselines,
                    );
                }
                Baseline.runBaseline(
                    tscBaselineName(input.scenario, input.subScenario, input.commandLineArgs, "-discrepancies"),
                    baselines ? baselines.join("\r\n") : null, // eslint-disable-line no-restricted-syntax
                );
            });
        }
    });
}
