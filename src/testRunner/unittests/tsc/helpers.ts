import * as ts from "../../_namespaces/ts";
import * as fakes from "../../_namespaces/fakes";
import * as vfs from "../../_namespaces/vfs";
import * as vpath from "../../_namespaces/vpath";
import * as Harness from "../../_namespaces/Harness";
import {
    libFile,
    TestServerHost,
} from "../virtualFileSystemWithWatch";

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

export function compilerOptionsToConfigJson(options: ts.CompilerOptions) {
    return ts.optionMapToObject(ts.serializeCompilerOptions(options));
}

export const noChangeRun: TestTscEdit = {
    caption: "no-change-run",
    edit: ts.noop
};
export const noChangeOnlyRuns = [noChangeRun];

export interface TestTscCompile extends TestTscCompileLikeBase {
    baselineSourceMap?: boolean;
    baselineReadFileCalls?: boolean;
    baselinePrograms?: boolean;
    baselineDependencies?: boolean;
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
                (programs || (programs = [])).push(ts.isBuilderProgram(program) ?
                    [program.getProgram(), program] :
                    [program]
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
        }
    };
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
        scenario, subScenario, diffWithInitial,
        commandLineArgs, modifyFs,
        environmentVariables,
        compile: worker, additionalBaseline,
    } = input;
    if (modifyFs) modifyFs(inputFs);
    inputFs.makeReadonly();
    const fs = inputFs.shadow();

    // Create system
    const sys = new fakes.System(fs, { executingFilePath: "/lib/tsc", env: environmentVariables }) as TscCompileSystem;
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
            file: `${ts.isBuild(commandLineArgs) ? "tsbuild" : "tsc"}/${scenario}/${subScenario.split(" ").join("-")}.js`,
            text: `Input::
${baseFsPatch ? vfs.formatPatch(baseFsPatch) : ""}

Output::
${sys.output.join("")}

${patch ? vfs.formatPatch(patch) : ""}`
        };
    };
    return sys;
}

function makeSystemReadyForBaseline(sys: TscCompileSystem, versionToWrite?: string) {
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

export function createSolutionBuilderHostForBaseline(
    sys: TscCompileSystem | TestServerHost,
    versionToWrite?: string,
    originalRead?: (TscCompileSystem | TestServerHost)["readFile"]
) {
    if (sys instanceof fakes.System) makeSystemReadyForBaseline(sys, versionToWrite);
    const { cb } = commandLineCallbacks(sys, originalRead);
    const host = ts.createSolutionBuilderHost(sys,
        /*createProgram*/ undefined,
        ts.createDiagnosticReporter(sys, /*pretty*/ true),
        ts.createBuilderStatusReporter(sys, /*pretty*/ true),
    );
    host.afterProgramEmitAndDiagnostics = cb;
    host.afterEmitBundle = cb;
    return host;
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
        additionalBaseline
    });

    function commandLineCompile(sys: TscCompileSystem) {
        makeSystemReadyForBaseline(sys);
        actualReadFileMap = {};
        const originalReadFile = sys.readFile;
        sys.readFile = path => {
            // Dont record libs
            if (path.startsWith("/src/")) {
                actualReadFileMap![path] = (ts.getProperty(actualReadFileMap!, path) || 0) + 1;
            }
            return originalReadFile.call(sys, path);
        };

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
        if (input.computeDtsSignatures) storeDtsSignatures(sys, getPrograms!());
        if (shouldBaselinePrograms) {
            const baseline: string[] = [];
            baselinePrograms(baseline, getPrograms!, ts.emptyArray, baselineDependencies);
            sys.write(baseline.join("\n"));
        }
        if (baselineReadFileCalls) {
            sys.write(`readFiles:: ${JSON.stringify(actualReadFileMap, /*replacer*/ undefined, " ")} `);
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

export function baselinePrograms(baseline: string[], getPrograms: () => readonly CommandLineProgram[], oldPrograms: readonly (CommandLineProgram | undefined)[], baselineDependencies: boolean | undefined) {
    const programs = getPrograms();
    for (let i = 0; i < programs.length; i++) {
        baselineProgram(baseline, programs[i], oldPrograms[i], baselineDependencies);
    }
    return programs;
}

function baselineProgram(baseline: string[], [program, builderProgram]: CommandLineProgram, oldProgram: CommandLineProgram | undefined, baselineDependencies: boolean | undefined) {
    if (program !== oldProgram?.[0]) {
        const options = program.getCompilerOptions();
        baseline.push(`Program root files: ${JSON.stringify(program.getRootFileNames())}`);
        baseline.push(`Program options: ${JSON.stringify(options)}`);
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
        const state = builderProgram.getState();
        const internalState = state as unknown as ts.BuilderProgramState;
        if (state.semanticDiagnosticsPerFile?.size) {
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
                    const info = state.fileInfos.get(path);
                    if (info?.version === info?.signature || !info?.signature) {
                        baseline.push(path + " (used version)");
                    }
                    else if (internalState.filesChangingSignature?.has(path)) {
                        baseline.push(path + " (computed .d.ts during emit)");
                    }
                    else {
                        baseline.push(path + " (computed .d.ts)");
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
                verifyTscBaseline(() => verifier({
                    ...input,
                    fs: () => input.fs().makeReadonly()
                }));
            });
        });
    });
}

export function replaceText(fs: vfs.FileSystem, path: string, oldText: string, newText: string) {
    if (!fs.statSync(path).isFile()) {
        throw new Error(`File ${path} does not exist`);
    }
    const old = fs.readFileSync(path, "utf-8");
    if (old.indexOf(oldText) < 0) {
        throw new Error(`Text "${oldText}" does not exist in file ${path}`);
    }
    const newContent = old.replace(oldText, newText);
    fs.writeFileSync(path, newContent, "utf-8");
}

export function prependText(fs: vfs.FileSystem, path: string, additionalContent: string) {
    if (!fs.statSync(path).isFile()) {
        throw new Error(`File ${path} does not exist`);
    }
    const old = fs.readFileSync(path, "utf-8");
    fs.writeFileSync(path, `${additionalContent}${old}`, "utf-8");
}

export function appendText(fs: vfs.FileSystem, path: string, additionalContent: string) {
    if (!fs.statSync(path).isFile()) {
        throw new Error(`File ${path} does not exist`);
    }
    const old = fs.readFileSync(path, "utf-8");
    fs.writeFileSync(path, `${old}${additionalContent}`);
}

export const libContent = `${libFile.content}
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };`;

export const symbolLibContent = `
interface SymbolConstructor {
    readonly species: symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
`;

/**
 * Load project from disk into /src folder
 */
export function loadProjectFromDisk(
    root: string,
    libContentToAppend?: string
): vfs.FileSystem {
    const resolver = vfs.createResolver(Harness.IO);
    const fs = new vfs.FileSystem(/*ignoreCase*/ true, {
        files: {
            ["/src"]: new vfs.Mount(vpath.resolve(Harness.IO.getWorkspaceRoot(), root), resolver)
        },
        cwd: "/",
        meta: { defaultLibLocation: "/lib" },
    });
    addLibAndMakeReadonly(fs, libContentToAppend);
    return fs;
}

/**
 * All the files must be in /src
 */
export function loadProjectFromFiles(
    files: vfs.FileSet,
    libContentToAppend?: string
): vfs.FileSystem {
    const fs = new vfs.FileSystem(/*ignoreCase*/ true, {
        files,
        cwd: "/",
        meta: { defaultLibLocation: "/lib" },
    });
    addLibAndMakeReadonly(fs, libContentToAppend);
    return fs;
}

function addLibAndMakeReadonly(fs: vfs.FileSystem, libContentToAppend?: string) {
    fs.mkdirSync("/lib");
    fs.writeFileSync("/lib/lib.d.ts", libContentToAppend ? `${libContent}${libContentToAppend}` : libContent);
    fs.makeReadonly();
}

export function generateSourceMapBaselineFiles(sys: ts.System & { writtenFiles: ts.ReadonlyCollection<ts.Path>; }) {
    const mapFileNames = ts.mapDefinedIterator(sys.writtenFiles.keys(), f => f.endsWith(".map") ? f : undefined);
    for (const mapFile of mapFileNames) {
        const text = Harness.SourceMapRecorder.getSourceMapRecordWithSystem(sys, mapFile);
        sys.writeFile(`${mapFile}.baseline.txt`, text);
    }
}

function generateBundleFileSectionInfo(sys: ts.System, originalReadCall: ts.System["readFile"], baselineRecorder: Harness.Compiler.WriterAggregator, bundleFileInfo: ts.BundleFileInfo | undefined, outFile: string | undefined) {
    if (!ts.length(bundleFileInfo && bundleFileInfo.sections) && !outFile) return; // Nothing to baseline

    const content = outFile && sys.fileExists(outFile) ? originalReadCall.call(sys, outFile, "utf8")! : "";
    baselineRecorder.WriteLine("======================================================================");
    baselineRecorder.WriteLine(`File:: ${outFile}`);
    for (const section of bundleFileInfo ? bundleFileInfo.sections : ts.emptyArray) {
        baselineRecorder.WriteLine("----------------------------------------------------------------------");
        writeSectionHeader(section);
        if (section.kind !== ts.BundleFileSectionKind.Prepend) {
            writeTextOfSection(section.pos, section.end);
        }
        else if (section.texts.length > 0) {
            ts.Debug.assert(section.pos === ts.first(section.texts).pos);
            ts.Debug.assert(section.end === ts.last(section.texts).end);
            for (const text of section.texts) {
                baselineRecorder.WriteLine(">>--------------------------------------------------------------------");
                writeSectionHeader(text);
                writeTextOfSection(text.pos, text.end);
            }
        }
        else {
            ts.Debug.assert(section.pos === section.end);
        }
    }
    baselineRecorder.WriteLine("======================================================================");

    function writeTextOfSection(pos: number, end: number) {
        const textLines = content.substring(pos, end).split(/\r?\n/);
        for (const line of textLines) {
            baselineRecorder.WriteLine(line);
        }
    }

    function writeSectionHeader(section: ts.BundleFileSection) {
        baselineRecorder.WriteLine(`${section.kind}: (${section.pos}-${section.end})${section.data ? ":: " + section.data : ""}${section.kind === ts.BundleFileSectionKind.Prepend ? " texts:: " + section.texts.length : ""}`);
    }
}

type ReadableProgramBuildInfoDiagnostic = string | [string, readonly ts.ReusableDiagnostic[]];
type ReadableBuilderFileEmit = string & { __readableBuilderFileEmit: any; };
type ReadableProgramBuilderInfoFilePendingEmit = [original: string | [string], emitKind: ReadableBuilderFileEmit];
type ReadableProgramBuildInfoEmitSignature = string | [string, ts.EmitSignature | []];
type ReadableProgramBuildInfoFileInfo<T> = Omit<ts.BuilderState.FileInfo, "impliedFormat"> & {
    impliedFormat: string | undefined;
    original: T | undefined;
};
type ReadableProgramBuildInfoRoot =
    [original: ts.ProgramBuildInfoFileId, readable: string] |
    [orginal: ts.ProgramBuildInfoRootStartEnd, readable: readonly string[]];
type ReadableProgramMultiFileEmitBuildInfo = Omit<ts.ProgramMultiFileEmitBuildInfo,
    "fileIdsList" | "fileInfos" | "root" |
    "referencedMap" | "exportedModulesMap" | "semanticDiagnosticsPerFile" |
    "affectedFilesPendingEmit" | "changeFileSet" | "emitSignatures"
> & {
    fileNamesList: readonly (readonly string[])[] | undefined;
    fileInfos: ts.MapLike<ReadableProgramBuildInfoFileInfo<ts.ProgramMultiFileEmitBuildInfoFileInfo>>;
    root: readonly ReadableProgramBuildInfoRoot[];
    referencedMap: ts.MapLike<string[]> | undefined;
    exportedModulesMap: ts.MapLike<string[]> | undefined;
    semanticDiagnosticsPerFile: readonly ReadableProgramBuildInfoDiagnostic[] | undefined;
    affectedFilesPendingEmit: readonly ReadableProgramBuilderInfoFilePendingEmit[] | undefined;
    changeFileSet: readonly string[] | undefined;
    emitSignatures: readonly ReadableProgramBuildInfoEmitSignature[] | undefined;
};
type ReadableProgramBuildInfoBundlePendingEmit = [emitKind: ReadableBuilderFileEmit, original: ts.ProgramBuildInfoBundlePendingEmit];
type ReadableProgramBundleEmitBuildInfo = Omit<ts.ProgramBundleEmitBuildInfo, "fileInfos" | "root" | "pendingEmit"> & {
    fileInfos: ts.MapLike<string | ReadableProgramBuildInfoFileInfo<ts.BuilderState.FileInfo>>;
    root: readonly ReadableProgramBuildInfoRoot[];
    pendingEmit: ReadableProgramBuildInfoBundlePendingEmit | undefined;
};

type ReadableProgramBuildInfo = ReadableProgramMultiFileEmitBuildInfo | ReadableProgramBundleEmitBuildInfo;

function isReadableProgramBundleEmitBuildInfo(info: ReadableProgramBuildInfo | undefined): info is ReadableProgramBundleEmitBuildInfo {
    return !!info && !!ts.outFile(info.options || {});
}
type ReadableBuildInfo = Omit<ts.BuildInfo, "program"> & { program: ReadableProgramBuildInfo | undefined; size: number; };
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
            pendingEmit: pendingEmit === undefined ?
                undefined :
                [
                    toReadableBuilderFileEmit(ts.toProgramEmitPending(pendingEmit, buildInfo.program.options)),
                    pendingEmit
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
            options: buildInfo.program.options,
            referencedMap: toMapOfReferencedSet(buildInfo.program.referencedMap),
            exportedModulesMap: toMapOfReferencedSet(buildInfo.program.exportedModulesMap),
            semanticDiagnosticsPerFile: buildInfo.program.semanticDiagnosticsPerFile?.map(d =>
                ts.isNumber(d) ?
                    toFileName(d) :
                    [toFileName(d[0]), d[1]]
            ),
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
        // Baseline fixed order for bundle
        bundle: buildInfo.bundle && {
            ...buildInfo.bundle,
            js: buildInfo.bundle.js && {
                sections: buildInfo.bundle.js.sections,
                hash: buildInfo.bundle.js.hash,
                mapHash: buildInfo.bundle.js.mapHash,
                sources: buildInfo.bundle.js.sources,
            },
            dts: buildInfo.bundle.dts && {
                sections: buildInfo.bundle.dts.sections,
                hash: buildInfo.bundle.dts.hash,
                mapHash: buildInfo.bundle.dts.mapHash,
                sources: buildInfo.bundle.dts.sources,
            },
        },
        program,
        version,
        size: ts.getBuildInfoText({ ...buildInfo, version }).length,
    };
    // For now its just JSON.stringify
    sys.writeFile(`${buildInfoPath}.readable.baseline.txt`, JSON.stringify(result, /*replacer*/ undefined, 2));

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

    const buildInfo = ts.getBuildInfo(buildInfoPath, (originalReadCall || sys.readFile).call(sys, buildInfoPath, "utf8")!);
    if (!buildInfo) return sys.writeFile(`${buildInfoPath}.baseline.txt`, "Error reading valid buildinfo file");
    generateBuildInfoProgramBaseline(sys, buildInfoPath, buildInfo);

    if (!ts.outFile(options)) return;
    const { jsFilePath, declarationFilePath } = ts.getOutputPathsForBundle(options, /*forceDts*/ false);
    const bundle = buildInfo.bundle;
    if (!bundle || (!ts.length(bundle.js && bundle.js.sections) && !ts.length(bundle.dts && bundle.dts.sections))) return;

    // Write the baselines:
    const baselineRecorder = new Harness.Compiler.WriterAggregator();
    generateBundleFileSectionInfo(sys, originalReadCall || sys.readFile, baselineRecorder, bundle.js, jsFilePath);
    generateBundleFileSectionInfo(sys, originalReadCall || sys.readFile, baselineRecorder, bundle.dts, declarationFilePath);
    baselineRecorder.Close();
    const text = baselineRecorder.lines.join("\r\n");
    sys.writeFile(`${buildInfoPath}.baseline.txt`, text);
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
    index, edits, scenario, commandLineArgs, environmentVariables,
    baselines,
    modifyFs, baseFs, newSys
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
                            `Incremental:: ${JSON.stringify(incrementalFileInfo, /*replacer*/ undefined, 2)}`,
                            `Clean:: ${JSON.stringify(cleanFileInfo, /*replacer*/ undefined, 2)}`,
                            `Dts Signature:: $${JSON.stringify(dtsForKey?.signature)}`
                        ];
                    }
                },
                `FileInfos:: File:: ${outputFile}`
            );
            if (!isReadableProgramBundleEmitBuildInfo(incrementalReadableBuildInfo?.program)) {
                ts.Debug.assert(!isReadableProgramBundleEmitBuildInfo(cleanReadableBuildInfo?.program));
                // Verify exportedModulesMap
                verifyMapLike(
                    incrementalReadableBuildInfo?.program?.exportedModulesMap,
                    cleanReadableBuildInfo?.program?.exportedModulesMap,
                    (key, incrementalReferenceSet, cleanReferenceSet) => {
                        const dtsForKey = dtsSignaures?.get(key);
                        if (!ts.arrayIsEqualTo(incrementalReferenceSet, cleanReferenceSet) &&
                            (!dtsForKey || !ts.arrayIsEqualTo(incrementalReferenceSet, dtsForKey.exportedModules))) {
                            return [
                                `Incremental Reference set is neither from dts nor files reference map for File:: ${key}::`,
                                `Incremental:: ${JSON.stringify(incrementalReferenceSet, /*replacer*/ undefined, 2)}`,
                                `Clean:: ${JSON.stringify(cleanReferenceSet, /*replacer*/ undefined, 2)}`,
                                `DtsExportsMap:: ${JSON.stringify(dtsForKey?.exportedModules, /*replacer*/ undefined, 2)}`
                            ];
                        }
                    },
                    `exportedModulesMap:: File:: ${outputFile}`
                );
                // Verify that incrementally pending affected file emit are in clean build since clean build can contain more files compared to incremental depending of noEmitOnError option
                if (incrementalReadableBuildInfo?.program?.affectedFilesPendingEmit) {
                    if (cleanReadableBuildInfo?.program?.affectedFilesPendingEmit === undefined) {
                        addBaseline(
                            `Incremental build contains affectedFilesPendingEmit, clean build does not have it: ${outputFile}::`,
                            `Incremental buildInfoText:: ${incrementalBuildText}`,
                            `Clean buildInfoText:: ${cleanBuildText}`
                        );
                    }
                    let expectedIndex = 0;
                    incrementalReadableBuildInfo.program.affectedFilesPendingEmit.forEach(([actualFileOrArray]) => {
                        const actualFile = ts.isString(actualFileOrArray) ? actualFileOrArray : actualFileOrArray[0];
                        expectedIndex = ts.findIndex(
                            (cleanReadableBuildInfo!.program! as ReadableProgramMultiFileEmitBuildInfo).affectedFilesPendingEmit,
                            ([expectedFileOrArray]) => actualFile === (ts.isString(expectedFileOrArray) ? expectedFileOrArray : expectedFileOrArray[0]),
                            expectedIndex
                        );
                        if (expectedIndex === -1) {
                            addBaseline(
                                `Incremental build contains ${actualFile} file as pending emit, clean build does not have it: ${outputFile}::`,
                                `Incremental buildInfoText:: ${incrementalBuildText}`,
                                `Clean buildInfoText:: ${cleanBuildText}`
                            );
                        }
                        expectedIndex++;
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
            ts.isString(expected) ? expected : JSON.stringify(expected),
            "IncrementalBuild:",
            ts.isString(actual) ? actual : JSON.stringify(actual),
        );
    }

    function addBaseline(...text: string[]) {
        if (!baselines || !headerAdded) {
            (baselines ||= []).push(`${index}:: ${caption}`, ...(discrepancyExplanation?.()|| ["*** Needs explanation"]));
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
        buildInfo: JSON.stringify({
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
                latestChangedDtsFile: readableBuildInfo.program.latestChangedDtsFile ? "FakeFileName" : undefined,
            },
            size: undefined, // Size doesnt need to be equal
        },  /*replacer*/ undefined, 2),
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
    subScenario, fs, scenario, commandLineArgs, environmentVariables,
    baselineSourceMap, modifyFs, baselineReadFileCalls, baselinePrograms,
    edits
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
                index
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
                return { file, text: texts.join("\r\n") };
            }
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
                    `${ts.isBuild(commandLineArgs) ? "tsbuild" : "tsc"}/${scenario}/${subScenario.split(" ").join("-")}-discrepancies.js`,
                    baselines ? baselines.join("\r\n") : null // eslint-disable-line no-null/no-null
                );
            });
        }
    });
}

export function enableStrict(fs: vfs.FileSystem, path: string) {
    replaceText(fs, path, `"strict": false`, `"strict": true`);
}

export function addTestPrologue(fs: vfs.FileSystem, path: string, prologue: string) {
    prependText(fs, path, `${prologue}
`);
}

export function addShebang(fs: vfs.FileSystem, project: string, file: string) {
    prependText(fs, `src/${project}/${file}.ts`, `#!someshebang ${project} ${file}
`);
}

export function restContent(project: string, file: string) {
    return `function for${project}${file}Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}`;
}

function nonrestContent(project: string, file: string) {
    return `function for${project}${file}Rest() { }`;
}

export function addRest(fs: vfs.FileSystem, project: string, file: string) {
    appendText(fs, `src/${project}/${file}.ts`, restContent(project, file));
}

export function removeRest(fs: vfs.FileSystem, project: string, file: string) {
    replaceText(fs, `src/${project}/${file}.ts`, restContent(project, file), nonrestContent(project, file));
}

export function addStubFoo(fs: vfs.FileSystem, project: string, file: string) {
    appendText(fs, `src/${project}/${file}.ts`, nonrestContent(project, file));
}

export function changeStubToRest(fs: vfs.FileSystem, project: string, file: string) {
    replaceText(fs, `src/${project}/${file}.ts`, nonrestContent(project, file), restContent(project, file));
}

export function addSpread(fs: vfs.FileSystem, project: string, file: string) {
    const path = `src/${project}/${file}.ts`;
    const content = fs.readFileSync(path, "utf8");
    fs.writeFileSync(path, `${content}
function ${project}${file}Spread(...b: number[]) { }
const ${project}${file}_ar = [20, 30];
${project}${file}Spread(10, ...${project}${file}_ar);`);

    replaceText(fs, `src/${project}/tsconfig.json`, `"strict": false,`, `"strict": false,
    "downlevelIteration": true,`);
}

export function getTripleSlashRef(project: string) {
    return `/src/${project}/tripleRef.d.ts`;
}

export function addTripleSlashRef(fs: vfs.FileSystem, project: string, file: string) {
    fs.writeFileSync(getTripleSlashRef(project), `declare class ${project}${file} { }`);
    prependText(fs, `src/${project}/${file}.ts`, `///<reference path="./tripleRef.d.ts"/>
const ${file}Const = new ${project}${file}();
`);
}
