namespace ts {
    export function errorDiagnostic(message: fakes.ExpectedDiagnosticMessage): fakes.ExpectedErrorDiagnostic {
        return { message };
    }

    export function getExpectedDiagnosticForProjectsInBuild(...projects: string[]): fakes.ExpectedDiagnostic {
        return [Diagnostics.Projects_in_this_build_Colon_0, projects.map(p => "\r\n    * " + p).join("")];
    }

    export function changeCompilerVersion(host: fakes.SolutionBuilderHost) {
        const originalReadFile = host.readFile;
        host.readFile = path => {
            const value = originalReadFile.call(host, path);
            if (!value || !isBuildInfoFile(path)) return value;
            const buildInfo = getBuildInfo(path, value);
            if (!buildInfo) return value;
            buildInfo.version = fakes.version;
            return getBuildInfoText(buildInfo);
        };
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

    export function indexOf(fs: vfs.FileSystem, path: string, searchStr: string) {
        if (!fs.statSync(path).isFile()) {
            throw new Error(`File ${path} does not exist`);
        }
        const content = fs.readFileSync(path, "utf-8");
        return content.indexOf(searchStr);
    }

    export function lastIndexOf(fs: vfs.FileSystem, path: string, searchStr: string) {
        if (!fs.statSync(path).isFile()) {
            throw new Error(`File ${path} does not exist`);
        }
        const content = fs.readFileSync(path, "utf-8");
        return content.lastIndexOf(searchStr);
    }

    export function expectedLocationIndexOf(fs: vfs.FileSystem, file: string, searchStr: string): fakes.ExpectedDiagnosticLocation {
        return {
            file,
            start: indexOf(fs, file, searchStr),
            length: searchStr.length
        };
    }

    export function expectedLocationLastIndexOf(fs: vfs.FileSystem, file: string, searchStr: string): fakes.ExpectedDiagnosticLocation {
        return {
            file,
            start: lastIndexOf(fs, file, searchStr),
            length: searchStr.length
        };
    }

    export const libContent = `${TestFSWithWatch.libFile.content}
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

    export function verifyOutputsPresent(fs: vfs.FileSystem, outputs: readonly string[]) {
        for (const output of outputs) {
            assert(fs.existsSync(output), `Expect file ${output} to exist`);
        }
    }

    export function verifyOutputsAbsent(fs: vfs.FileSystem, outputs: readonly string[]) {
        for (const output of outputs) {
            assert.isFalse(fs.existsSync(output), `Expect file ${output} to not exist`);
        }
    }

    export function generateSourceMapBaselineFiles(sys: System & { writtenFiles: ReadonlyCollection<Path>; }) {
        const mapFileNames = mapDefinedIterator(sys.writtenFiles.keys(), f => f.endsWith(".map") ? f : undefined);
        while (true) {
            const result = mapFileNames.next();
            if (result.done) break;
            const mapFile = result.value;
            const text = Harness.SourceMapRecorder.getSourceMapRecordWithSystem(sys, mapFile);
            sys.writeFile(`${mapFile}.baseline.txt`, text);
        }
    }

    function generateBundleFileSectionInfo(sys: System, originalReadCall: System["readFile"], baselineRecorder: Harness.Compiler.WriterAggregator, bundleFileInfo: BundleFileInfo | undefined, outFile: string | undefined) {
        if (!length(bundleFileInfo && bundleFileInfo.sections) && !outFile) return; // Nothing to baseline

        const content = outFile && sys.fileExists(outFile) ? originalReadCall.call(sys, outFile, "utf8")! : "";
        baselineRecorder.WriteLine("======================================================================");
        baselineRecorder.WriteLine(`File:: ${outFile}`);
        for (const section of bundleFileInfo ? bundleFileInfo.sections : emptyArray) {
            baselineRecorder.WriteLine("----------------------------------------------------------------------");
            writeSectionHeader(section);
            if (section.kind !== BundleFileSectionKind.Prepend) {
                writeTextOfSection(section.pos, section.end);
            }
            else if (section.texts.length > 0) {
                Debug.assert(section.pos === first(section.texts).pos);
                Debug.assert(section.end === last(section.texts).end);
                for (const text of section.texts) {
                    baselineRecorder.WriteLine(">>--------------------------------------------------------------------");
                    writeSectionHeader(text);
                    writeTextOfSection(text.pos, text.end);
                }
            }
            else {
                Debug.assert(section.pos === section.end);
            }
        }
        baselineRecorder.WriteLine("======================================================================");

        function writeTextOfSection(pos: number, end: number) {
            const textLines = content.substring(pos, end).split(/\r?\n/);
            for (const line of textLines) {
                baselineRecorder.WriteLine(line);
            }
        }

        function writeSectionHeader(section: BundleFileSection) {
            baselineRecorder.WriteLine(`${section.kind}: (${section.pos}-${section.end})${section.data ? ":: " + section.data : ""}${section.kind === BundleFileSectionKind.Prepend ? " texts:: " + section.texts.length : ""}`);
        }
    }

    type ReadableProgramBuildInfoDiagnostic = string | [string, readonly ReusableDiagnostic[]];
    type ReadableProgramBuilderInfoFilePendingEmit = [original: string | [string], emitKind: "DtsOnly" | "Full"];
    type ReadableProgramBuildInfoEmitSignature = string | [string, string];
    type ReadableProgramBuildInfoFileInfo = Omit<BuilderState.FileInfo, "impliedFormat"> & {
        impliedFormat: string | undefined;
        original: ProgramBuildInfoBuilderStateFileInfo | undefined;
    };
    type ReadableProgramMultiFileEmitBuildInfo = Omit<ProgramMultiFileEmitBuildInfo,
        "fileIdsList" | "fileInfos" |
        "referencedMap" | "exportedModulesMap" | "semanticDiagnosticsPerFile" |
        "affectedFilesPendingEmit" | "changeFileSet" | "emitSignatures"
    > & {
        fileNamesList: readonly (readonly string[])[] | undefined;
        fileInfos: MapLike<ReadableProgramBuildInfoFileInfo>;
        referencedMap: MapLike<string[]> | undefined;
        exportedModulesMap: MapLike<string[]> | undefined;
        semanticDiagnosticsPerFile: readonly ReadableProgramBuildInfoDiagnostic[] | undefined;
        affectedFilesPendingEmit: readonly ReadableProgramBuilderInfoFilePendingEmit[] | undefined;
        changeFileSet: readonly string[] | undefined;
        emitSignatures: readonly ReadableProgramBuildInfoEmitSignature[] | undefined;
    };
    type ReadableProgramBundleEmitBuildInfo = Omit<ProgramBundleEmitBuildInfo, "fileInfos"> & {
        fileInfos: MapLike<string>;
    };

    type ReadableProgramBuildInfo = ReadableProgramMultiFileEmitBuildInfo | ReadableProgramBundleEmitBuildInfo;

    function isReadableProgramBundleEmitBuildInfo(info: ReadableProgramBuildInfo | undefined): info is ReadableProgramBundleEmitBuildInfo {
        return !!info && !!outFile(info.options || {});
    }
    type ReadableBuildInfo = Omit<BuildInfo, "program"> & { program: ReadableProgramBuildInfo | undefined; size: number; };
    function generateBuildInfoProgramBaseline(sys: System, buildInfoPath: string, buildInfo: BuildInfo) {
        let program: ReadableProgramBuildInfo | undefined;
        let fileNamesList: string[][] | undefined;
        if (buildInfo.program && isProgramBundleEmitBuildInfo(buildInfo.program)) {
            const fileInfos: ReadableProgramBundleEmitBuildInfo["fileInfos"] = {};
            buildInfo.program?.fileInfos?.forEach((fileInfo, index) => fileInfos[toFileName(index + 1 as ProgramBuildInfoFileId)] = fileInfo);
            program = {
                ...buildInfo.program,
                fileInfos
            };
        }
        else if (buildInfo.program) {
            const fileInfos: ReadableProgramMultiFileEmitBuildInfo["fileInfos"] = {};
            buildInfo.program?.fileInfos?.forEach((fileInfo, index) => fileInfos[toFileName(index + 1 as ProgramBuildInfoFileId)] = toReadableFileInfo(fileInfo));
            fileNamesList = buildInfo.program.fileIdsList?.map(fileIdsListId => fileIdsListId.map(toFileName));
            program = buildInfo.program && {
                fileNames: buildInfo.program.fileNames,
                fileNamesList,
                fileInfos: buildInfo.program.fileInfos ? fileInfos : undefined!,
                options: buildInfo.program.options,
                referencedMap: toMapOfReferencedSet(buildInfo.program.referencedMap),
                exportedModulesMap: toMapOfReferencedSet(buildInfo.program.exportedModulesMap),
                semanticDiagnosticsPerFile: buildInfo.program.semanticDiagnosticsPerFile?.map(d =>
                    isNumber(d) ?
                        toFileName(d) :
                        [toFileName(d[0]), d[1]]
                ),
                affectedFilesPendingEmit: buildInfo.program.affectedFilesPendingEmit?.map(toReadableProgramBuilderInfoFilePendingEmit),
                changeFileSet: buildInfo.program.changeFileSet?.map(toFileName),
                emitSignatures: buildInfo.program.emitSignatures?.map(s =>
                    isNumber(s) ?
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
            size: getBuildInfoText({ ...buildInfo, version }).length,
        };
        // For now its just JSON.stringify
        sys.writeFile(`${buildInfoPath}.readable.baseline.txt`, JSON.stringify(result, /*replacer*/ undefined, 2));

        function toFileName(fileId: ProgramBuildInfoFileId) {
            return buildInfo.program!.fileNames[fileId - 1];
        }

        function toFileNames(fileIdsListId: ProgramBuildInfoFileIdListId) {
            return fileNamesList![fileIdsListId - 1];
        }

        function toReadableFileInfo(fileInfo: ProgramBuildInfoFileInfo): ReadableProgramBuildInfoFileInfo {
            const info = toBuilderStateFileInfo(fileInfo);
            return {
                original: isString(fileInfo) ? undefined : fileInfo,
                ...info,
                impliedFormat: info.impliedFormat && getNameOfCompilerOptionValue(info.impliedFormat, moduleOptionDeclaration.type),
            };
        }

        function toMapOfReferencedSet(referenceMap: ProgramBuildInfoReferencedMap | undefined): MapLike<string[]> | undefined {
            if (!referenceMap) return undefined;
            const result: MapLike<string[]> = {};
            for (const [fileNamesKey, fileNamesListKey] of referenceMap) {
                result[toFileName(fileNamesKey)] = toFileNames(fileNamesListKey);
            }
            return result;
        }

        function toReadableProgramBuilderInfoFilePendingEmit(value: ProgramBuilderInfoFilePendingEmit): ReadableProgramBuilderInfoFilePendingEmit {
            const emitKind = toBuilderFileEmit(value);
            return [
                isNumber(value) ? toFileName(value) : [toFileName(value[0])],
                emitKind === BuilderFileEmit.DtsOnly ? "DtsOnly" :
                    emitKind === BuilderFileEmit.Full ? "Full" :
                        Debug.assertNever(emitKind),
            ];
        }
    }

    export function toPathWithSystem(sys: System, fileName: string): Path {
        return toPath(fileName, sys.getCurrentDirectory(), createGetCanonicalFileName(sys.useCaseSensitiveFileNames));
    }

    export function baselineBuildInfo(
        options: CompilerOptions,
        sys: TscCompileSystem | tscWatch.WatchedSystem,
        originalReadCall?: System["readFile"],
    ) {
        const buildInfoPath = getTsBuildInfoEmitOutputFilePath(options);
        if (!buildInfoPath || !sys.writtenFiles!.has(toPathWithSystem(sys, buildInfoPath))) return;
        if (!sys.fileExists(buildInfoPath)) return;

        const buildInfo = getBuildInfo(buildInfoPath, (originalReadCall || sys.readFile).call(sys, buildInfoPath, "utf8")!);
        if (!buildInfo) return sys.writeFile(`${buildInfoPath}.baseline.txt`, "Error reading valid buildinfo file");
        generateBuildInfoProgramBaseline(sys, buildInfoPath, buildInfo);

        if (!outFile(options)) return;
        const { jsFilePath, declarationFilePath } = getOutputPathsForBundle(options, /*forceDts*/ false);
        const bundle = buildInfo.bundle;
        if (!bundle || (!length(bundle.js && bundle.js.sections) && !length(bundle.dts && bundle.dts.sections))) return;

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
        scenario: TestTscCompile["scenario"];
        subScenario: TestTscCompile["subScenario"];
        baselines: string[] | undefined;
        commandLineArgs: TestTscCompile["commandLineArgs"];
        modifyFs: TestTscCompile["modifyFs"];
        editFs: TestTscEdit["modifyFs"];
        baseFs: vfs.FileSystem;
        newSys: TscCompileSystem;
        discrepancyExplanation: TestTscEdit["discrepancyExplanation"];
    }
    function verifyTscEditDiscrepancies({
        index, scenario, subScenario, commandLineArgs,
        discrepancyExplanation, baselines,
        modifyFs, editFs, baseFs, newSys
    }: VerifyTscEditDiscrepanciesInput): string[] | undefined {
        const sys = testTscCompile({
            scenario,
            subScenario,
            fs: () => baseFs.makeReadonly(),
            commandLineArgs,
            modifyFs: fs => {
                if (modifyFs) modifyFs(fs);
                editFs(fs);
            },
            disableUseFileVersionAsSignature: true,
        });
        let headerAdded = false;
        for (const outputFile of arrayFrom(sys.writtenFiles.keys())) {
            const cleanBuildText = sys.readFile(outputFile);
            const incrementalBuildText = newSys.readFile(outputFile);
            if (isBuildInfoFile(outputFile)) {
                // Check only presence and absence and not text as we will do that for readable baseline
                if (!sys.fileExists(`${outputFile}.readable.baseline.txt`)) addBaseline(`Readable baseline not present in clean build:: File:: ${outputFile}`);
                if (!newSys.fileExists(`${outputFile}.readable.baseline.txt`)) addBaseline(`Readable baseline not present in incremental build:: File:: ${outputFile}`);
                verifyPresenceAbsence(incrementalBuildText, cleanBuildText, `Incremental and clean tsbuildinfo file presence differs:: File:: ${outputFile}`);
            }
            else if (!fileExtensionIs(outputFile, ".tsbuildinfo.readable.baseline.txt")) {
                verifyTextEqual(incrementalBuildText, cleanBuildText, `File: ${outputFile}`);
            }
            else if (incrementalBuildText !== cleanBuildText) {
                // Verify build info without affectedFilesPendingEmit
                const { buildInfo: incrementalBuildInfo, readableBuildInfo: incrementalReadableBuildInfo } = getBuildInfoForIncrementalCorrectnessCheck(incrementalBuildText);
                const { buildInfo: cleanBuildInfo, readableBuildInfo: cleanReadableBuildInfo } = getBuildInfoForIncrementalCorrectnessCheck(cleanBuildText);
                verifyTextEqual(incrementalBuildInfo, cleanBuildInfo, `TsBuild info text without affectedFilesPendingEmit:: ${outputFile}::`);
                    // Verify file info sigantures
                verifyMapLike(
                    incrementalReadableBuildInfo?.program?.fileInfos as ReadableProgramMultiFileEmitBuildInfo["fileInfos"],
                    cleanReadableBuildInfo?.program?.fileInfos as ReadableProgramMultiFileEmitBuildInfo["fileInfos"],
                    (key, incrementalFileInfo, cleanFileInfo) => {
                        if (incrementalFileInfo.signature !== cleanFileInfo.signature && incrementalFileInfo.signature !== incrementalFileInfo.version) {
                            return [
                                `Incremental signature is neither dts signature nor file version for File:: ${key}`,
                                `Incremental:: ${JSON.stringify(incrementalFileInfo, /*replacer*/ undefined, 2)}`,
                                `Clean:: ${JSON.stringify(cleanFileInfo, /*replacer*/ undefined, 2)}`
                            ];
                        }
                    },
                    `FileInfos:: File:: ${outputFile}`
                );
                if (!isReadableProgramBundleEmitBuildInfo(incrementalReadableBuildInfo?.program)) {
                    Debug.assert(!isReadableProgramBundleEmitBuildInfo(cleanReadableBuildInfo?.program));
                    // Verify exportedModulesMap
                    verifyMapLike(
                        incrementalReadableBuildInfo?.program?.exportedModulesMap,
                        cleanReadableBuildInfo?.program?.exportedModulesMap,
                        (key, incrementalReferenceSet, cleanReferenceSet) => {
                            if (!arrayIsEqualTo(incrementalReferenceSet, cleanReferenceSet) && !arrayIsEqualTo(incrementalReferenceSet, (incrementalReadableBuildInfo!.program! as ReadableProgramMultiFileEmitBuildInfo).referencedMap![key])) {
                                return [
                                    `Incremental Reference set is neither from dts nor files reference map for File:: ${key}::`,
                                    `Incremental:: ${JSON.stringify(incrementalReferenceSet, /*replacer*/ undefined, 2)}`,
                                    `Clean:: ${JSON.stringify(cleanReferenceSet, /*replacer*/ undefined, 2)}`,
                                    `IncrementalReferenceMap:: ${JSON.stringify((incrementalReadableBuildInfo!.program! as ReadableProgramMultiFileEmitBuildInfo).referencedMap![key], /*replacer*/ undefined, 2)}`,
                                    `CleanReferenceMap:: ${JSON.stringify((cleanReadableBuildInfo!.program! as ReadableProgramMultiFileEmitBuildInfo).referencedMap![key], /*replacer*/ undefined, 2)}`,
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
                            const actualFile = isString(actualFileOrArray) ? actualFileOrArray : actualFileOrArray[0];
                            expectedIndex = findIndex(
                                (cleanReadableBuildInfo!.program! as ReadableProgramMultiFileEmitBuildInfo).affectedFilesPendingEmit,
                                ([expectedFileOrArray]) => actualFile === (isString(expectedFileOrArray) ? expectedFileOrArray : expectedFileOrArray[0]),
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

        function verifyMapLike<T>(incremental: MapLike<T> | undefined, clean: MapLike<T> | undefined, verifyValue: (key: string, incrementalValue: T, cleanValue: T) => string[] | undefined, message: string) {
            verifyPresenceAbsence(incremental, clean, `Incremental and clean do not match:: ${message}`);
            if (!incremental || !clean) return;
            const incrementalMap = new Map(getEntries(incremental));
            const cleanMap = new Map(getEntries(clean));
            if (incrementalMap.size !== cleanMap.size) {
                addBaseline(
                    `Incremental and clean size of maps do not match:: ${message}`,
                    `Incremental: ${JSON.stringify(incremental, /*replacer*/ undefined, 2)}`,
                    `Clean: ${JSON.stringify(clean, /*replacer*/ undefined, 2)}`,
                );
                return;
            }
            cleanMap.forEach((cleanValue, key) => {
                const incrementalValue = incrementalMap.get(key);
                if (!incrementalValue) {
                    addBaseline(
                        `Incremental does not contain ${key} which is present in clean:: ${message}`,
                        `Incremental: ${JSON.stringify(incremental, /*replacer*/ undefined, 2)}`,
                        `Clean: ${JSON.stringify(clean, /*replacer*/ undefined, 2)}`,
                    );
                }
                else {
                    const result = verifyValue(key, incrementalMap.get(key)!, cleanValue);
                    if (result) addBaseline(...result);
                }
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
                isString(expected) ? expected : JSON.stringify(expected),
                "IncrementalBuild:",
                isString(actual) ? actual : JSON.stringify(actual),
            );
        }

        function addBaseline(...text: string[]) {
            if (!baselines || !headerAdded) {
                (baselines ||= []).push(`${index}:: ${subScenario}`, ...(discrepancyExplanation?.()|| ["*** Needs explanation"]));
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
        let sanitizedFileInfos: MapLike<ReadableProgramBuildInfoFileInfo | string> | undefined;
        if (readableBuildInfo.program?.fileInfos) {
            sanitizedFileInfos = {};
            for (const id in readableBuildInfo.program.fileInfos) {
                if (hasProperty(readableBuildInfo.program.fileInfos, id)) {
                    const info = readableBuildInfo.program.fileInfos[id];
                    sanitizedFileInfos[id] = isString(info) ? info : { ...info, signature: undefined, original: undefined };
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

    export enum CleanBuildDescrepancy {
        CleanFileTextDifferent,
        CleanFilePresent,
    }

    export interface TestTscEdit {
        modifyFs: (fs: vfs.FileSystem) => void;
        subScenario: string;
        commandLineArgs?: readonly string[];
        /** An array of lines to be printed in order when a discrepancy is detected */
        discrepancyExplanation?: () => readonly string[];
    }

    export interface VerifyTscWithEditsInput extends TestTscCompile {
        edits: TestTscEdit[];
    }

    /**
     * Verify non watch tsc invokcation after each edit
     */
    export function verifyTscWithEdits({
        subScenario, fs, scenario, commandLineArgs,
        baselineSourceMap, modifyFs, baselineReadFileCalls, baselinePrograms,
        edits
    }: VerifyTscWithEditsInput) {
        describe(`tsc ${commandLineArgs.join(" ")} ${scenario}:: ${subScenario} serializedEdits`, () => {
            let sys: TscCompileSystem;
            let baseFs: vfs.FileSystem;
            let editsSys: TscCompileSystem[];
            before(() => {
                Debug.assert(!!edits.length, `${scenario}/${subScenario}:: No incremental scenarios, you probably want to use verifyTsc instead.`);
                baseFs = fs().makeReadonly();
                sys = testTscCompile({
                    scenario,
                    subScenario,
                    fs: () => baseFs,
                    commandLineArgs,
                    modifyFs,
                    baselineSourceMap,
                    baselineReadFileCalls,
                    baselinePrograms
                });
                edits.forEach((
                    { modifyFs, subScenario: editScenario, commandLineArgs: editCommandLineArgs },
                    index
                ) => {
                    (editsSys || (editsSys = [])).push(testTscCompile({
                        scenario,
                        subScenario: editScenario || subScenario,
                        diffWithInitial: true,
                        fs: () => index === 0 ? sys.vfs : editsSys[index - 1].vfs,
                        commandLineArgs: editCommandLineArgs || commandLineArgs,
                        modifyFs,
                        baselineSourceMap,
                        baselineReadFileCalls,
                        baselinePrograms
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
                    editsSys.forEach((sys, index) => {
                        const incrementalScenario = edits[index];
                        texts.push("");
                        texts.push(`Change:: ${incrementalScenario.subScenario}`);
                        texts.push(sys.baseLine().text);
                    });
                    return { file, text: texts.join("\r\n") };
                }
            }));
            it("tsc invocation after edit and clean build correctness", () => {
                let baselines: string[] | undefined;
                for (let index = 0; index < edits.length; index++) {
                    baselines = verifyTscEditDiscrepancies({
                        index,
                        scenario,
                        subScenario: edits[index].subScenario,
                        baselines,
                        baseFs,
                        newSys: editsSys[index],
                        commandLineArgs: edits[index].commandLineArgs || commandLineArgs,
                        discrepancyExplanation: edits[index].discrepancyExplanation,
                        editFs: fs => {
                            for (let i = 0; i <= index; i++) {
                                edits[i].modifyFs(fs);
                            }
                        },
                        modifyFs
                    });
                }
                Harness.Baseline.runBaseline(
                    `${isBuild(commandLineArgs) ? "tsbuild" : "tsc"}/${scenario}/${subScenario.split(" ").join("-")}-discrepancies.js`,
                    baselines ? baselines.join("\r\n") : null // eslint-disable-line no-null/no-null
                );
            });
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
}
