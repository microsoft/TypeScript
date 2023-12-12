import * as fakes from "../../_namespaces/fakes";
import * as Harness from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselinePrograms,
    CommandLineCallbacks,
    commandLineCallbacks,
    CommandLineProgram,
    generateSourceMapBaselineFiles,
    isReadableProgramBundleEmitBuildInfo,
    ReadableBuildInfo,
    ReadableProgramBuildInfoFileInfo,
    ReadableProgramMultiFileEmitBuildInfo,
    toPathWithSystem,
    tscBaselineName,
} from "./baseline";

export interface DtsSignatureData {
    signature: string | undefined;
    exportedModules: string[] | undefined;
}

export type TscCompileSystem = fakes.System & {
    writtenFiles: Set<ts.Path>;
    baseLine(): { file: string; text: string; };
    dtsSignaures?: Map<ts.Path, Map<string, DtsSignatureData>>;
    storeFilesChangingSignatureDuringEmit?: boolean;
};

export const noChangeRun: TestTscEdit = {
    caption: "no-change-run",
    edit: ts.noop,
};
export const noChangeOnlyRuns = [noChangeRun];

export interface TestTscCompile extends TestTscCompileLikeBase {
    baselineSourceMap?: boolean;
    baselineReadFileCalls?: boolean;
    baselinePrograms?: boolean;
    baselineDependencies?: boolean;
}

export interface TestTscCompileLikeBase extends VerifyTscCompileLike {
    diffWithInitial?: boolean;
    modifyFs?: (fs: vfs.FileSystem) => void;
    computeDtsSignatures?: boolean;
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
        scenario,
        subScenario,
        diffWithInitial,
        commandLineArgs,
        modifyFs,
        environmentVariables,
        compile: worker,
        additionalBaseline,
    } = input;
    if (modifyFs) modifyFs(inputFs);
    inputFs.makeReadonly();
    const fs = inputFs.shadow();

    // Create system
    const sys = new fakes.System(fs, { executingFilePath: `${fs.meta.get("defaultLibLocation")}/tsc`, env: environmentVariables }) as TscCompileSystem;
    sys.storeFilesChangingSignatureDuringEmit = true;
    sys.write(`${sys.getExecutingFilePath()} ${commandLineArgs.join(" ")}\n`);
    sys.exit = exitCode => sys.exitCode = exitCode;
    worker(sys);
    sys.write(`exitCode:: ExitStatus.${ts.ExitStatus[sys.exitCode as ts.ExitStatus]}\n`);
    additionalBaseline?.(sys);
    fs.makeReadonly();
    sys.baseLine = () => {
        const baseFsPatch = diffWithInitial ?
            inputFs.diff(initialFs, { includeChangedFileWithSameContent: true }) :
            inputFs.diff(/*base*/ undefined, { baseIsNotShadowRoot: true });
        const patch = fs.diff(inputFs, { includeChangedFileWithSameContent: true });
        return {
            file: tscBaselineName(scenario, subScenario, commandLineArgs),
            text: `Input::
${baseFsPatch ? vfs.formatPatch(baseFsPatch) : ""}

Output::
${sys.output.join("")}

${patch ? vfs.formatPatch(patch) : ""}`,
        };
    };
    return sys;
}

export function makeSystemReadyForBaseline(sys: TscCompileSystem, versionToWrite?: string) {
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
        ts.Debug.assert(!writtenFiles.has(path) || ts.endsWith(path, "baseline.txt"));
        writtenFiles.add(path);
        return originalWriteFile.call(sys, fileName, content, writeByteOrderMark);
    };
}

/**
 * Initialize Fs, execute command line and save baseline
 */
export function testTscCompile(input: TestTscCompile) {
    let actualReadFileMap: ts.MapLike<number> | undefined;
    let getPrograms: CommandLineCallbacks["getPrograms"] | undefined;
    return testTscCompileLike({
        ...input,
        compile: commandLineCompile,
        additionalBaseline,
    });

    function commandLineCompile(sys: TscCompileSystem) {
        makeSystemReadyForBaseline(sys);
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

    function additionalBaseline(sys: TscCompileSystem) {
        const { baselineSourceMap, baselineReadFileCalls, baselinePrograms: shouldBaselinePrograms, baselineDependencies } = input;
        const programs = getPrograms!();
        if (input.computeDtsSignatures) storeDtsSignatures(sys, programs);
        if (shouldBaselinePrograms) {
            const baseline: string[] = [];
            baselinePrograms(baseline, programs, ts.emptyArray, baselineDependencies);
            sys.write(baseline.join("\n"));
        }
        if (baselineReadFileCalls) {
            sys.write(`readFiles:: ${jsonToReadableText(actualReadFileMap)} `);
        }
        if (baselineSourceMap) generateSourceMapBaselineFiles(sys);
        actualReadFileMap = undefined;
        getPrograms = undefined;
    }
}

function storeDtsSignatures(sys: TscCompileSystem, programs: readonly CommandLineProgram[]) {
    for (const [program, builderProgram] of programs) {
        if (!builderProgram) continue;
        const buildInfoPath = ts.getTsBuildInfoEmitOutputFilePath(program.getCompilerOptions());
        if (!buildInfoPath) continue;
        sys.dtsSignaures ??= new Map();
        const dtsSignatureData = new Map<string, DtsSignatureData>();
        sys.dtsSignaures.set(`${toPathWithSystem(sys, buildInfoPath)}.readable.baseline.txt` as ts.Path, dtsSignatureData);
        const state = builderProgram.getState();
        state.hasCalledUpdateShapeSignature?.forEach(resolvedPath => {
            const file = program.getSourceFileByPath(resolvedPath);
            if (!file || file.isDeclarationFile) return;
            // Compute dts and exported map and store it
            ts.BuilderState.computeDtsSignature(
                program,
                file,
                /*cancellationToken*/ undefined,
                sys,
                (signature, sourceFiles) => {
                    const exportedModules = ts.BuilderState.getExportedModules(state.exportedModulesMap && sourceFiles[0].exportedModulesFromDeclarationEmit);
                    dtsSignatureData.set(relativeToBuildInfo(resolvedPath), { signature, exportedModules: exportedModules && ts.arrayFrom(exportedModules.keys(), relativeToBuildInfo) });
                },
            );
        });

        function relativeToBuildInfo(path: string) {
            const currentDirectory = program.getCurrentDirectory();
            const getCanonicalFileName = ts.createGetCanonicalFileName(program.useCaseSensitiveFileNames());
            const buildInfoDirectory = ts.getDirectoryPath(ts.getNormalizedAbsolutePath(buildInfoPath!, currentDirectory));
            return ts.ensurePathIsNonModuleName(ts.getRelativePathFromDirectory(buildInfoDirectory, path, getCanonicalFileName));
        }
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
                verifyTscBaseline(() =>
                    verifier({
                        ...input,
                        fs: () => input.fs().makeReadonly(),
                    })
                );
            });
        });
    });
}

interface VerifyTscEditDiscrepanciesInput {
    index: number;
    edits: readonly TestTscEdit[];
    scenario: TestTscCompile["scenario"];
    baselines: string[] | undefined;
    commandLineArgs: TestTscCompile["commandLineArgs"];
    modifyFs: TestTscCompile["modifyFs"];
    baseFs: vfs.FileSystem;
    newSys: TscCompileSystem;
    environmentVariables: TestTscCompile["environmentVariables"];
}
function verifyTscEditDiscrepancies({
    index,
    edits,
    scenario,
    commandLineArgs,
    environmentVariables,
    baselines,
    modifyFs,
    baseFs,
    newSys,
}: VerifyTscEditDiscrepanciesInput): string[] | undefined {
    const { caption, discrepancyExplanation } = edits[index];
    const sys = testTscCompile({
        scenario,
        subScenario: caption,
        fs: () => baseFs.makeReadonly(),
        commandLineArgs: edits[index].commandLineArgs || commandLineArgs,
        modifyFs: fs => {
            if (modifyFs) modifyFs(fs);
            for (let i = 0; i <= index; i++) {
                edits[i].edit(fs);
            }
        },
        environmentVariables,
        computeDtsSignatures: true,
    });
    let headerAdded = false;
    for (const outputFile of sys.writtenFiles.keys()) {
        const cleanBuildText = sys.readFile(outputFile);
        const incrementalBuildText = newSys.readFile(outputFile);
        if (ts.isBuildInfoFile(outputFile)) {
            // Check only presence and absence and not text as we will do that for readable baseline
            if (!sys.fileExists(`${outputFile}.readable.baseline.txt`)) addBaseline(`Readable baseline not present in clean build:: File:: ${outputFile}`);
            if (!newSys.fileExists(`${outputFile}.readable.baseline.txt`)) addBaseline(`Readable baseline not present in incremental build:: File:: ${outputFile}`);
            verifyPresenceAbsence(incrementalBuildText, cleanBuildText, `Incremental and clean tsbuildinfo file presence differs:: File:: ${outputFile}`);
        }
        else if (!ts.fileExtensionIs(outputFile, ".tsbuildinfo.readable.baseline.txt")) {
            verifyTextEqual(incrementalBuildText, cleanBuildText, `File: ${outputFile}`);
        }
        else if (incrementalBuildText !== cleanBuildText) {
            // Verify build info without affectedFilesPendingEmit
            const { buildInfo: incrementalBuildInfo, readableBuildInfo: incrementalReadableBuildInfo } = getBuildInfoForIncrementalCorrectnessCheck(incrementalBuildText);
            const { buildInfo: cleanBuildInfo, readableBuildInfo: cleanReadableBuildInfo } = getBuildInfoForIncrementalCorrectnessCheck(cleanBuildText);
            const dtsSignaures = sys.dtsSignaures?.get(outputFile);
            verifyTextEqual(incrementalBuildInfo, cleanBuildInfo, `TsBuild info text without affectedFilesPendingEmit:: ${outputFile}::`);
            // Verify file info sigantures
            verifyMapLike(
                incrementalReadableBuildInfo?.program?.fileInfos as ReadableProgramMultiFileEmitBuildInfo["fileInfos"],
                cleanReadableBuildInfo?.program?.fileInfos as ReadableProgramMultiFileEmitBuildInfo["fileInfos"],
                (key, incrementalFileInfo, cleanFileInfo) => {
                    const dtsForKey = dtsSignaures?.get(key);
                    if (!incrementalFileInfo || !cleanFileInfo || incrementalFileInfo.signature !== cleanFileInfo.signature && (!dtsForKey || incrementalFileInfo.signature !== dtsForKey.signature)) {
                        return [
                            `Incremental signature is neither dts signature nor file version for File:: ${key}`,
                            `Incremental:: ${jsonToReadableText(incrementalFileInfo)}`,
                            `Clean:: ${jsonToReadableText(cleanFileInfo)}`,
                            `Dts Signature:: $${jsonToReadableText(dtsForKey?.signature)}`,
                        ];
                    }
                },
                `FileInfos:: File:: ${outputFile}`,
            );
            if (!isReadableProgramBundleEmitBuildInfo(incrementalReadableBuildInfo?.program)) {
                ts.Debug.assert(!isReadableProgramBundleEmitBuildInfo(cleanReadableBuildInfo?.program));
                // Verify exportedModulesMap
                verifyMapLike(
                    incrementalReadableBuildInfo?.program?.exportedModulesMap,
                    cleanReadableBuildInfo?.program?.exportedModulesMap,
                    (key, incrementalReferenceSet, cleanReferenceSet) => {
                        const dtsForKey = dtsSignaures?.get(key);
                        if (
                            !ts.arrayIsEqualTo(incrementalReferenceSet, cleanReferenceSet) &&
                            (!dtsForKey || !ts.arrayIsEqualTo(incrementalReferenceSet, dtsForKey.exportedModules))
                        ) {
                            return [
                                `Incremental Reference set is neither from dts nor files reference map for File:: ${key}::`,
                                `Incremental:: ${jsonToReadableText(incrementalReferenceSet)}`,
                                `Clean:: ${jsonToReadableText(cleanReferenceSet)}`,
                                `DtsExportsMap:: ${jsonToReadableText(dtsForKey?.exportedModules)}`,
                            ];
                        }
                    },
                    `exportedModulesMap:: File:: ${outputFile}`,
                );
                // Verify that incrementally pending affected file emit are in clean build since clean build can contain more files compared to incremental depending of noEmitOnError option
                if (incrementalReadableBuildInfo?.program?.affectedFilesPendingEmit) {
                    if (cleanReadableBuildInfo?.program?.affectedFilesPendingEmit === undefined) {
                        addBaseline(
                            `Incremental build contains affectedFilesPendingEmit, clean build does not have it: ${outputFile}::`,
                            `Incremental buildInfoText:: ${incrementalBuildText}`,
                            `Clean buildInfoText:: ${cleanBuildText}`,
                        );
                    }
                    let expectedIndex = 0;
                    incrementalReadableBuildInfo.program.affectedFilesPendingEmit.forEach(([actualFileOrArray]) => {
                        const actualFile = ts.isString(actualFileOrArray) ? actualFileOrArray : actualFileOrArray[0];
                        expectedIndex = ts.findIndex(
                            (cleanReadableBuildInfo!.program! as ReadableProgramMultiFileEmitBuildInfo).affectedFilesPendingEmit,
                            ([expectedFileOrArray]) => actualFile === (ts.isString(expectedFileOrArray) ? expectedFileOrArray : expectedFileOrArray[0]),
                            expectedIndex,
                        );
                        if (expectedIndex === -1) {
                            addBaseline(
                                `Incremental build contains ${actualFile} file as pending emit, clean build does not have it: ${outputFile}::`,
                                `Incremental buildInfoText:: ${incrementalBuildText}`,
                                `Clean buildInfoText:: ${cleanBuildText}`,
                            );
                        }
                        expectedIndex++;
                    });
                }
                if (incrementalReadableBuildInfo?.program?.emitDiagnosticsPerFile) {
                    incrementalReadableBuildInfo.program.emitDiagnosticsPerFile.forEach(([actualFileOrArray]) => {
                        const actualFile = ts.isString(actualFileOrArray) ? actualFileOrArray : actualFileOrArray[0];
                        if (
                            !ts.find(
                                (cleanReadableBuildInfo!.program! as ReadableProgramMultiFileEmitBuildInfo).emitDiagnosticsPerFile,
                                ([expectedFileOrArray]) => actualFile === (ts.isString(expectedFileOrArray) ? expectedFileOrArray : expectedFileOrArray[0]),
                            ) && !ts.find(
                                (cleanReadableBuildInfo!.program! as ReadableProgramMultiFileEmitBuildInfo).affectedFilesPendingEmit,
                                ([expectedFileOrArray]) => actualFile === (ts.isString(expectedFileOrArray) ? expectedFileOrArray : expectedFileOrArray[0]),
                            )
                        ) {
                            addBaseline(
                                `Incremental build contains ${actualFile} file has errors, clean build does not have errors or does not mark is as pending emit: ${outputFile}::`,
                                `Incremental buildInfoText:: ${incrementalBuildText}`,
                                `Clean buildInfoText:: ${cleanBuildText}`,
                            );
                        }
                    });
                }
            }
        }
    }
    if (!headerAdded && discrepancyExplanation) addBaseline("*** Supplied discrepancy explanation but didnt file any difference");
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
            (baselines ||= []).push(`${index}:: ${caption}`, ...(discrepancyExplanation?.() || ["*** Needs explanation"]));
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
    let sanitizedFileInfos: ts.MapLike<string | Omit<ReadableProgramBuildInfoFileInfo<ts.ProgramMultiFileEmitBuildInfoFileInfo> | ReadableProgramBuildInfoFileInfo<ts.BuilderState.FileInfo>, "signature" | "original"> & { signature: undefined; original: undefined; }> | undefined;
    if (readableBuildInfo.program?.fileInfos) {
        sanitizedFileInfos = {};
        for (const id in readableBuildInfo.program.fileInfos) {
            if (ts.hasProperty(readableBuildInfo.program.fileInfos, id)) {
                const info = readableBuildInfo.program.fileInfos[id];
                sanitizedFileInfos[id] = ts.isString(info) ? info : { ...info, signature: undefined, original: undefined };
            }
        }
    }
    return {
        buildInfo: jsonToReadableText({
            ...readableBuildInfo,
            program: readableBuildInfo.program && {
                ...readableBuildInfo.program,
                fileNames: undefined,
                fileNamesList: undefined,
                fileInfos: sanitizedFileInfos,
                // Ignore noEmit since that shouldnt be reason to emit the tsbuild info and presence of it in the buildinfo file does not matter
                options: { ...readableBuildInfo.program.options, noEmit: undefined },
                exportedModulesMap: undefined,
                affectedFilesPendingEmit: undefined,
                emitDiagnosticsPerFile: undefined,
                latestChangedDtsFile: readableBuildInfo.program.latestChangedDtsFile ? "FakeFileName" : undefined,
            },
            size: undefined, // Size doesnt need to be equal
        }),
        readableBuildInfo,
    };
}

export interface TestTscEdit {
    edit: (fs: vfs.FileSystem) => void;
    caption: string;
    commandLineArgs?: readonly string[];
    /** An array of lines to be printed in order when a discrepancy is detected */
    discrepancyExplanation?: () => readonly string[];
}

export interface VerifyTscWithEditsInput extends TestTscCompile {
    edits?: readonly TestTscEdit[];
}

/**
 * Verify non watch tsc invokcation after each edit
 */
export function verifyTsc({
    subScenario,
    fs,
    scenario,
    commandLineArgs,
    environmentVariables,
    baselineSourceMap,
    modifyFs,
    baselineReadFileCalls,
    baselinePrograms,
    edits,
}: VerifyTscWithEditsInput) {
    describe(`tsc ${commandLineArgs.join(" ")} ${scenario}:: ${subScenario}`, () => {
        let sys: TscCompileSystem;
        let baseFs: vfs.FileSystem;
        let editsSys: TscCompileSystem[] | undefined;
        before(() => {
            baseFs = fs().makeReadonly();
            sys = testTscCompile({
                scenario,
                subScenario,
                fs: () => baseFs,
                commandLineArgs,
                modifyFs,
                baselineSourceMap,
                baselineReadFileCalls,
                baselinePrograms,
                environmentVariables,
            });
            edits?.forEach((
                { edit, caption, commandLineArgs: editCommandLineArgs },
                index,
            ) => {
                (editsSys || (editsSys = [])).push(testTscCompile({
                    scenario,
                    subScenario: caption,
                    diffWithInitial: true,
                    fs: () => index === 0 ? sys.vfs : editsSys![index - 1].vfs,
                    commandLineArgs: editCommandLineArgs || commandLineArgs,
                    modifyFs: edit,
                    baselineSourceMap,
                    baselineReadFileCalls,
                    baselinePrograms,
                    environmentVariables,
                }));
            });
        });
        after(() => {
            baseFs = undefined!;
            sys = undefined!;
            editsSys = undefined!;
        });
        verifyTscBaseline(() => ({
            baseLine: () => {
                const { file, text } = sys.baseLine();
                const texts: string[] = [text];
                editsSys?.forEach((sys, index) => {
                    const incrementalScenario = edits![index];
                    texts.push("");
                    texts.push(`Change:: ${incrementalScenario.caption}`);
                    texts.push(sys.baseLine().text);
                });
                return {
                    file,
                    text: `currentDirectory:: ${sys.getCurrentDirectory()} useCaseSensitiveFileNames: ${sys.useCaseSensitiveFileNames}\r\n` +
                        texts.join("\r\n"),
                };
            },
        }));
        if (edits?.length) {
            it("tsc invocation after edit and clean build correctness", () => {
                let baselines: string[] | undefined;
                for (let index = 0; index < edits.length; index++) {
                    baselines = verifyTscEditDiscrepancies({
                        index,
                        edits,
                        scenario,
                        baselines,
                        baseFs,
                        newSys: editsSys![index],
                        commandLineArgs,
                        modifyFs,
                        environmentVariables,
                    });
                }
                Harness.Baseline.runBaseline(
                    tscBaselineName(scenario, subScenario, commandLineArgs, /*isWatch*/ undefined, "-discrepancies"),
                    baselines ? baselines.join("\r\n") : null, // eslint-disable-line no-null/no-null
                );
            });
        }
    });
}
