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
            const buildInfo = getBuildInfo(value);
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

    export function getTime() {
        let currentTime = 100;
        return { tick, time, touch };

        function tick() {
            currentTime += 60_000;
        }

        function time() {
            return currentTime;
        }

        function touch(fs: vfs.FileSystem, path: string) {
            if (!fs.statSync(path).isFile()) {
                throw new Error(`File ${path} does not exist`);
            }
            fs.utimesSync(path, new Date(time()), new Date(time()));
        }
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

    /**
     * Gets the FS mountuing existing fs's /src and /lib folder
     */
    export function getFsWithTime(baseFs: vfs.FileSystem) {
        const { time, tick } = getTime();
        const host = new fakes.System(baseFs) as any as vfs.FileSystemResolverHost;
        host.getWorkspaceRoot = notImplemented;
        const resolver = vfs.createResolver(host);
        const fs = new vfs.FileSystem(/*ignoreCase*/ true, {
            files: {
                ["/src"]: new vfs.Mount("/src", resolver),
                ["/lib"]: new vfs.Mount("/lib", resolver)
            },
            cwd: "/",
            meta: { defaultLibLocation: "/lib" },
            time
        });
        return { fs, time, tick };
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
    type ReadableProgramBuilderInfoFilePendingEmit = [string, "DtsOnly" | "Full"];
    type ReadablePersistedProgramResolvedModuleFull = Omit<PersistedProgramResolvedModuleFull, "resolvedFileName" | "originalPath"> & {
        resolvedFileName: string;
        readonly originalPath?: string;
    };
    interface ReadablePersistedProgramResolvedModuleWithFailedLookupLocations {
        readonly resolvedModule: ReadablePersistedProgramResolvedModuleFull | undefined;
        failedLookupLocations?: readonly string[];
    }
    type ReadablePersistedProgramResolvedTypeReferenceDirective = Omit<PersistedProgramResolvedTypeReferenceDirective, "resolvedFileName"> & {
        resolvedFileName: string | undefined;
    };
    interface ReadablePersistedProgramResolvedTypeReferenceDirectiveWithFailedLookupLocations {
        resolvedTypeReferenceDirective: ReadablePersistedProgramResolvedTypeReferenceDirective | undefined;
        failedLookupLocations?: readonly string[];
    }
    type ReadablePersistedProgramResolution = ReadablePersistedProgramResolvedModuleWithFailedLookupLocations & ReadablePersistedProgramResolvedTypeReferenceDirectiveWithFailedLookupLocations;
    type ReadablePersistedProgramResolutionEntry = [name: string, resolution: ReadablePersistedProgramResolution];
    interface ReadablePersistedProgramSourceFile {
        fileName: string;
        originalFileName: string;
        path: string;
        resolvedPath: string;
        flags: NodeFlags;
        version: string;
        typeReferenceDirectives?: readonly string[];
        libReferenceDirectives?: readonly string[];
        referencedFiles?: readonly string[];
        imports?: readonly StringLiteralLikeOfProgramFromBuildInfo[];
        moduleAugmentations?: readonly ModuleNameOfProgramFromBuildInfo[];
        ambientModuleNames?: readonly string[];
        hasNoDefaultLib?: true;
        resolvedModules?: readonly ReadablePersistedProgramResolutionEntry[];
        resolvedTypeReferenceDirectiveNames?: readonly ReadablePersistedProgramResolutionEntry[];
        redirectInfo?: { readonly redirectTarget: { readonly path: string }; };
        includeReasons: readonly ReadablePersistedProgramFileIncludeReason[];
        isSourceFileFromExternalLibraryPath?: true;
        redirectTargets?: readonly string[];
        packageName?: string;
    }
    enum ReadableFileIncludeKind {
        RootFile = "RootFile",
        SourceFromProjectReference = "SourceFromProjectReference",
        OutputFromProjectReference = "OutputFromProjectReference",
        Import = "Import",
        ReferenceFile = "ReferenceFile",
        TypeReferenceDirective = "TypeReferenceDirective",
        LibFile = "LibFile",
        LibReferenceDirective = "LibReferenceDirective",
        AutomaticTypeDirectiveFile = "AutomaticTypeDirectiveFile",
    }
    type ReadableReferencedFileKind = ReadableFileIncludeKind.Import |
        ReadableFileIncludeKind.ReferenceFile |
        ReadableFileIncludeKind.TypeReferenceDirective |
        ReadableFileIncludeKind.LibReferenceDirective;
    interface ReadablePersistedProgramReferencedFile {
        kind: ReadableReferencedFileKind;
        file: string;
        index: number;
    }
    type ReadablePersistedProgramFileIncludeReason = Omit<(
        RootFile |
        LibFile |
        ProjectReferenceFile |
        ReadablePersistedProgramReferencedFile |
        AutomaticTypeDirectiveFile
    ), "kind"> & { kind: ReadableFileIncludeKind };
    const enum ReadableFilePreprocessingDiagnosticsKind {
        FilePreprocessingReferencedDiagnostic = "FilePreprocessingReferencedDiagnostic",
        FilePreprocessingFileExplainingDiagnostic = "FilePreprocessingFileExplainingDiagnostic"
    }
    interface ReadablePersistedProgramFilePreprocessingReferencedDiagnostic {
        kind: ReadableFilePreprocessingDiagnosticsKind.FilePreprocessingReferencedDiagnostic;
        reason: ReadablePersistedProgramReferencedFile;
        diagnostic: keyof typeof Diagnostics;
        args?: (string | number | undefined)[];
    }
    interface ReadablePersistedProgramFilePreprocessingFileExplainingDiagnostic {
        kind: ReadableFilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic;
        file?: string;
        fileProcessingReason: ReadablePersistedProgramFileIncludeReason;
        diagnostic: keyof typeof Diagnostics;
        args?: (string | number | undefined)[];
    }
    type ReadablePersistedProgramFilePreprocessingDiagnostic = ReadablePersistedProgramFilePreprocessingReferencedDiagnostic | ReadablePersistedProgramFilePreprocessingFileExplainingDiagnostic;
    interface ReadablePersistedProgramResolvedProjectReference {
        commandLine: {
            fileNames: readonly string[] | undefined;
            options: CompilerOptions;
            projectReferences: readonly ProjectReference[] | undefined;
        };
        sourceFile: { version: string; path: string; };
        references: readonly (ReadablePersistedProgramResolvedProjectReference | undefined)[] | undefined;
    }
    interface ReadablePersistedProgram {
        files: readonly ReadablePersistedProgramSourceFile[] | undefined;
        rootFileNames: readonly string[] | undefined;
        filesByName: MapLike<string | typeof missingSourceOfProjectReferenceRedirect | typeof missingFile> | undefined;
        projectReferences: readonly ProjectReference[] | undefined;
        resolvedProjectReferences: readonly (ReadablePersistedProgramResolvedProjectReference | undefined)[] | undefined;
        missingPaths: readonly string[] | undefined;
        resolvedTypeReferenceDirectives: readonly ReadablePersistedProgramResolutionEntry[] | undefined;
        fileProcessingDiagnostics: readonly ReadablePersistedProgramFilePreprocessingDiagnostic[] | undefined;
        resolutions: readonly ReadablePersistedProgramResolution[] | undefined;
    }
    interface ReadableProgramBuildInfo {
        fileNames: readonly string[];
        fileNamesList: readonly (readonly string[])[] | undefined;
        fileInfos: MapLike<BuilderState.FileInfo>;
        options: CompilerOptions | undefined;
        referencedMap?: MapLike<string[]>;
        exportedModulesMap?: MapLike<string[]>;
        semanticDiagnosticsPerFile?: readonly ReadableProgramBuildInfoDiagnostic[];
        affectedFilesPendingEmit?: readonly ReadableProgramBuilderInfoFilePendingEmit[];
        peristedProgram?: ReadablePersistedProgram;
    }
    type ReadableBuildInfo = Omit<BuildInfo, "program"> & { program: ReadableProgramBuildInfo | undefined; size: number; };
    function generateBuildInfoProgramBaseline(sys: System, originalWriteFile: System["writeFile"], buildInfoPath: string, buildInfo: BuildInfo) {
        const fileInfos: ReadableProgramBuildInfo["fileInfos"] = {};
        buildInfo.program?.fileInfos.forEach((fileInfo, index) => fileInfos[toFileName(index + 1 as ProgramBuildInfoFileId)] = toBuilderStateFileInfo(fileInfo));
        const fileNamesList = buildInfo.program?.fileIdsList?.map(fileIdsListId => fileIdsListId.map(toFileName));
        const filesByName: ReadablePersistedProgram["filesByName"] = buildInfo.program?.peristedProgram?.filesByName ? {} : undefined;
        buildInfo.program?.peristedProgram?.filesByName?.forEach(entry => {
            if (isArray(entry)) {
                filesByName![toFileName(entry[0])] = entry[1] ? toFileName(entry[1]) :entry[1] as typeof missingSourceOfProjectReferenceRedirect | typeof missingFile;
            }
            else {
                const path = toFileName(entry);
                filesByName![path] = path;
            }
        });
        const resolutions = buildInfo.program?.peristedProgram?.resolutions?.map(toReadablePersistedProgramResolution);
        const program: ReadableProgramBuildInfo | undefined = buildInfo.program && {
            fileNames: buildInfo.program.fileNames,
            fileNamesList,
            fileInfos,
            options: buildInfo.program.options,
            referencedMap: toMapOfReferencedSet(buildInfo.program.referencedMap),
            exportedModulesMap: toMapOfReferencedSet(buildInfo.program.exportedModulesMap),
            semanticDiagnosticsPerFile: buildInfo.program.semanticDiagnosticsPerFile?.map(d =>
                isNumber(d) ?
                    toFileName(d) :
                    [toFileName(d[0]), d[1]]
            ),
            affectedFilesPendingEmit: buildInfo.program.affectedFilesPendingEmit?.map(([fileId, emitKind]) => [
                toFileName(fileId),
                emitKind === BuilderFileEmit.DtsOnly ? "DtsOnly" :
                    emitKind === BuilderFileEmit.Full ? "Full" :
                        Debug.assertNever(emitKind)
            ]),
            peristedProgram: buildInfo.program.peristedProgram && {
                ...buildInfo.program.peristedProgram,
                files: buildInfo.program.peristedProgram.files?.map(toReadablePersistedProgramSourceFile),
                rootFileNames: buildInfo.program.peristedProgram.rootFileNames?.map(toFileName),
                filesByName,
                projectReferences: buildInfo.program.peristedProgram.projectReferences?.map(toProjectReference),
                resolvedProjectReferences: buildInfo.program.peristedProgram.resolvedProjectReferences?.map(toReadablePersistedProgramResolvedProjectReference),
                missingPaths: buildInfo.program.peristedProgram.missingPaths?.map(toFileName),
                resolvedTypeReferenceDirectives: buildInfo.program.peristedProgram.resolvedTypeReferenceDirectives?.map(toReadablePersistedProgramResolutionEntry),
                fileProcessingDiagnostics: buildInfo.program.peristedProgram.fileProcessingDiagnostics?.map(toReadablePersistedProgramFilePreprocessingDiagnostic),
                resolutions
            },
        };
        const version = buildInfo.version === ts.version ? fakes.version : buildInfo.version;
        const result: ReadableBuildInfo = {
            bundle: buildInfo.bundle,
            program,
            version,
            size: getBuildInfoText({ ...buildInfo, version }).length,
        };
        // For now its just JSON.stringify
        originalWriteFile.call(sys, `${buildInfoPath}.readable.baseline.txt`, JSON.stringify(result, /*replacer*/ undefined, 2));

        function toFileName(fileId: ProgramBuildInfoFileId | ProgramBuildInfoAbsoluteFileId) {
            return buildInfo.program!.fileNames[fileId - 1];
        }

        function toFileNames(fileIdsListId: ProgramBuildInfoFileIdListId) {
            return fileNamesList![fileIdsListId - 1];
        }

        function toMapOfReferencedSet(referenceMap: ProgramBuildInfoReferencedMap | undefined): MapLike<string[]> | undefined {
            if (!referenceMap) return undefined;
            const result: MapLike<string[]> = {};
            for (const [fileNamesKey, fileNamesListKey] of referenceMap) {
                result[toFileName(fileNamesKey)] = toFileNames(fileNamesListKey);
            }
            return result;
        }

        function toReadablePersistedProgramSourceFile(file: PersistedProgramSourceFile): ReadablePersistedProgramSourceFile {
            return {
                ...file,
                fileName: toFileName(file.fileName),
                originalFileName: toFileName(file.originalFileName),
                path: toFileName(file.path),
                resolvedPath: toFileName(file.resolvedPath),
                redirectInfo: file.redirectInfo && { redirectTarget: { path: toFileName(file.redirectInfo.redirectTarget.path) } },
                resolvedModules: file.resolvedModules?.map(toReadablePersistedProgramResolutionEntry),
                resolvedTypeReferenceDirectiveNames: file.resolvedTypeReferenceDirectiveNames?.map(toReadablePersistedProgramResolutionEntry),
                redirectTargets: file.redirectTargets?.map(toFileName),
                includeReasons: file.includeReasons.map(toReadablePersistedProgramFileIncludeReason),
            };
        }

        function toReadableFileIncludeKind(kind: FileIncludeKind): ReadableFileIncludeKind {
            switch (kind) {
                case FileIncludeKind.RootFile: return ReadableFileIncludeKind.RootFile;
                case FileIncludeKind.SourceFromProjectReference: return ReadableFileIncludeKind.SourceFromProjectReference;
                case FileIncludeKind.OutputFromProjectReference: return ReadableFileIncludeKind.OutputFromProjectReference;
                case FileIncludeKind.Import: return ReadableFileIncludeKind.Import;
                case FileIncludeKind.ReferenceFile: return ReadableFileIncludeKind.ReferenceFile;
                case FileIncludeKind.TypeReferenceDirective: return ReadableFileIncludeKind.TypeReferenceDirective;
                case FileIncludeKind.LibFile: return ReadableFileIncludeKind.LibFile;
                case FileIncludeKind.LibReferenceDirective: return ReadableFileIncludeKind.LibReferenceDirective;
                case FileIncludeKind.AutomaticTypeDirectiveFile: return ReadableFileIncludeKind.AutomaticTypeDirectiveFile;
                default:
                    Debug.assertNever(kind);
            }
        }

        function toReadablePersistedProgramReferencedFile(reason: PersistedProgramReferencedFile): ReadablePersistedProgramReferencedFile {
            return { ...reason, kind: toReadableFileIncludeKind(reason.kind) as ReadableReferencedFileKind, file: toFileName(reason.file) };
        }

        function toReadablePersistedProgramFileIncludeReason(reason: PersistedProgramFileIncludeReason): ReadablePersistedProgramFileIncludeReason {
            return isReferencedFile(reason) ? toReadablePersistedProgramReferencedFile(reason) : { ...reason, kind: toReadableFileIncludeKind(reason.kind) };
        }

        function toReadablePersistedProgramFilePreprocessingDiagnostic(d: PersistedProgramFilePreprocessingDiagnostic): ReadablePersistedProgramFilePreprocessingDiagnostic {
            switch (d.kind) {
                case FilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic:
                    return {
                        ...d,
                        kind: ReadableFilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic,
                        file: d.file ? toFileName(d.file) : undefined,
                        fileProcessingReason: toReadablePersistedProgramFileIncludeReason(d.fileProcessingReason),
                    };
                case FilePreprocessingDiagnosticsKind.FilePreprocessingReferencedDiagnostic:
                    return {
                        ...d,
                        kind: ReadableFilePreprocessingDiagnosticsKind.FilePreprocessingReferencedDiagnostic,
                        reason: toReadablePersistedProgramReferencedFile(d.reason),
                    };
                default:
                    Debug.assertNever(d);
            }
        }

        function toReadablePersistedProgramResolvedProjectReference(ref: PersistedProgramResolvedProjectReference | undefined): ReadablePersistedProgramResolvedProjectReference | undefined {
            return ref && {
                commandLine: {
                    fileNames: ref.commandLine.fileNames?.map(toFileName),
                    options: ref.commandLine.options,
                    projectReferences: ref.commandLine.projectReferences?.map(toProjectReference)
                },
                sourceFile: { ...ref.sourceFile, path: toFileName(ref.sourceFile.path) },
                references: ref.references?.map(toReadablePersistedProgramResolvedProjectReference)
            };
        }

        function toProjectReference(ref: PersistedProgramProjectReference): ProjectReference {
            return { ...ref, path: toFileName(ref.path) };
        }

        function toReadablePersistedProgramResolution(resolution: PersistedProgramResolution): ReadablePersistedProgramResolution {
            return {
                resolvedModule: resolution.resolvedModule && {
                    ...resolution.resolvedModule,
                    resolvedFileName: toFileName(resolution.resolvedModule.resolvedFileName),
                    originalPath: resolution.resolvedModule.originalPath ? toFileName(resolution.resolvedModule.originalPath) : undefined,
                },
                resolvedTypeReferenceDirective: resolution.resolvedTypeReferenceDirective && {
                    ...resolution.resolvedTypeReferenceDirective,
                    resolvedFileName: resolution.resolvedTypeReferenceDirective.resolvedFileName ? toFileName(resolution.resolvedTypeReferenceDirective.resolvedFileName) : undefined,
                },
                failedLookupLocations: resolution.failedLookupLocations?.map(toFileName)
            };
        }

        function toReadablePersistedProgramResolutionEntry([name, resolutionId]: PersistedProgramResolutionEntry): ReadablePersistedProgramResolutionEntry {
            return [name, resolutions![resolutionId - 1]];
        }
    }

    export function toPathWithSystem(sys: System, fileName: string): Path {
        return toPath(fileName, sys.getCurrentDirectory(), createGetCanonicalFileName(sys.useCaseSensitiveFileNames));
    }

    export function baselineBuildInfo(
        options: CompilerOptions,
        sys: System & { writtenFiles: ReadonlyCollection<Path>; },
        originalReadCall?: System["readFile"],
        originalWriteFile?: System["writeFile"],
    ) {
        const buildInfoPath = getTsBuildInfoEmitOutputFilePath(options);
        if (!buildInfoPath || !sys.writtenFiles.has(toPathWithSystem(sys, buildInfoPath))) return;
        if (!sys.fileExists(buildInfoPath)) return;

        const buildInfo = getBuildInfo((originalReadCall || sys.readFile).call(sys, buildInfoPath, "utf8")!);
        generateBuildInfoProgramBaseline(sys, originalWriteFile || sys.writeFile, buildInfoPath, buildInfo);

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
        (originalWriteFile || sys.writeFile).call(sys, `${buildInfoPath}.baseline.txt`, text);
    }

    interface VerifyIncrementalCorrectness {
        scenario: TscCompile["scenario"];
        commandLineArgs: TscCompile["commandLineArgs"];
        modifyFs: TscCompile["modifyFs"];
        incrementalModifyFs: TscIncremental["modifyFs"];
        tick: () => void;
        baseFs: vfs.FileSystem;
        newSys: TscCompileSystem;
        cleanBuildDiscrepancies: TscIncremental["cleanBuildDiscrepancies"];
    }
    function verifyIncrementalCorrectness(input: () => VerifyIncrementalCorrectness, index: number, subScenario: TscCompile["subScenario"]) {
        it(`Verify emit output file text is same when built clean for incremental scenario at:: ${index} ${subScenario}`, () => {
            const {
                scenario, commandLineArgs, cleanBuildDiscrepancies,
                modifyFs, incrementalModifyFs,
                tick, baseFs, newSys
            } = input();
            const sys = tscCompile({
                scenario,
                subScenario,
                fs: () => baseFs.makeReadonly(),
                commandLineArgs,
                modifyFs: fs => {
                    tick();
                    if (modifyFs) modifyFs(fs);
                    incrementalModifyFs(fs);
                },
                disableUseFileVersionAsSignature: true,
            });
            const discrepancies = cleanBuildDiscrepancies?.();
            for (const outputFile of arrayFrom(sys.writtenFiles.keys())) {
                const cleanBuildText = sys.readFile(outputFile);
                const incrementalBuildText = newSys.readFile(outputFile);
                const descrepancyInClean = discrepancies?.get(outputFile);
                if (isBuildInfoFile(outputFile)) {
                    // Check only presence and absence and not text as we will do that for readable baseline
                    assert.isTrue(sys.fileExists(`${outputFile}.readable.baseline.txt`), `Readable baseline should be present in clean build:: File:: ${outputFile}`);
                    assert.isTrue(newSys.fileExists(`${outputFile}.readable.baseline.txt`), `Readable baseline should be present in incremental build:: File:: ${outputFile}`);
                    if (descrepancyInClean === undefined) {
                        verifyPresenceAbsence(incrementalBuildText, cleanBuildText, `Incremental and clean tsbuildinfo file presence should match:: File:: ${outputFile}`);
                    }
                    else {
                        verifyTextEqual(incrementalBuildText, cleanBuildText, descrepancyInClean, `File: ${outputFile}`);
                    }
                }
                else if (!fileExtensionIs(outputFile, ".tsbuildinfo.readable.baseline.txt")) {
                    verifyTextEqual(incrementalBuildText, cleanBuildText, descrepancyInClean, `File: ${outputFile}`);
                }
                else if (incrementalBuildText !== cleanBuildText) {
                    // Verify build info without affectedFilesPendingEmit
                    const { buildInfo: incrementalBuildInfo, readableBuildInfo: incrementalReadableBuildInfo } = getBuildInfoForIncrementalCorrectnessCheck(incrementalBuildText);
                    const { buildInfo: cleanBuildInfo, readableBuildInfo: cleanReadableBuildInfo } = getBuildInfoForIncrementalCorrectnessCheck(cleanBuildText);
                    verifyTextEqual(incrementalBuildInfo, cleanBuildInfo, descrepancyInClean, `TsBuild info text without affectedFilesPendingEmit ${subScenario}:: ${outputFile}::\nIncremental buildInfoText:: ${incrementalBuildText}\nClean buildInfoText:: ${cleanBuildText}`);
                    if (descrepancyInClean === undefined) {
                        // Verify file info sigantures
                        verifyMapLike(
                            incrementalReadableBuildInfo?.program?.fileInfos,
                            cleanReadableBuildInfo?.program?.fileInfos,
                            (key, incrementalFileInfo, cleanFileInfo) => {
                                if (incrementalFileInfo.signature !== cleanFileInfo.signature && incrementalFileInfo.signature !== incrementalFileInfo.version) {
                                    assert.fail(`Incremental signature should either be dts signature or file version for File:: ${key}:: Incremental:: ${JSON.stringify(incrementalFileInfo)}, Clean:: ${JSON.stringify(cleanFileInfo)}}`);
                                }
                            },
                            `FileInfos:: File:: ${outputFile}`
                        );
                        // Verify exportedModulesMap
                        verifyMapLike(
                            incrementalReadableBuildInfo?.program?.exportedModulesMap,
                            cleanReadableBuildInfo?.program?.exportedModulesMap,
                            (key, incrementalReferenceSet, cleanReferenceSet) => {
                                if (!arrayIsEqualTo(incrementalReferenceSet, cleanReferenceSet) && !arrayIsEqualTo(incrementalReferenceSet, incrementalReadableBuildInfo!.program!.referencedMap![key])) {
                                    assert.fail(`Incremental Reference set should either be from dts or files reference map for File:: ${key}:: Incremental:: ${JSON.stringify(incrementalReferenceSet)}, Clean:: ${JSON.stringify(cleanReferenceSet)}, referenceMap:: ${JSON.stringify(incrementalReadableBuildInfo!.program!.referencedMap![key])}}`);
                                }
                            },
                            `exportedModulesMap:: File:: ${outputFile}`
                        );
                        // Verify that incrementally pending affected file emit are in clean build since clean build can contain more files compared to incremental depending of noEmitOnError option
                        if (incrementalReadableBuildInfo?.program?.affectedFilesPendingEmit) {
                            assert.isDefined(cleanReadableBuildInfo?.program?.affectedFilesPendingEmit, `Incremental build contains affectedFilesPendingEmit, clean build should also have it: ${outputFile}::\nIncremental buildInfoText:: ${incrementalBuildText}\nClean buildInfoText:: ${cleanBuildText}`);
                            let expectedIndex = 0;
                            incrementalReadableBuildInfo.program.affectedFilesPendingEmit.forEach(([actualFile]) => {
                                expectedIndex = findIndex(cleanReadableBuildInfo!.program!.affectedFilesPendingEmit!, ([expectedFile]) => actualFile === expectedFile, expectedIndex);
                                assert.notEqual(expectedIndex, -1, `Incremental build contains ${actualFile} file as pending emit, clean build should also have it: ${outputFile}::\nIncremental buildInfoText:: ${incrementalBuildText}\nClean buildInfoText:: ${cleanBuildText}`);
                                expectedIndex++;
                            });
                        }
                    }
                }
            }

            function verifyTextEqual(incrementalText: string | undefined, cleanText: string | undefined, descrepancyInClean: CleanBuildDescrepancy | undefined, message: string) {
                if (descrepancyInClean === undefined) {
                    assert.equal(incrementalText, cleanText, message);
                    return;
                }
                switch (descrepancyInClean) {
                    case CleanBuildDescrepancy.CleanFileTextDifferent:
                        assert.isDefined(incrementalText, `Incremental file should be present:: ${message}`);
                        assert.isDefined(cleanText, `Clean file should be present present:: ${message}`);
                        assert.notEqual(incrementalText, cleanText, message);
                        return;
                    case CleanBuildDescrepancy.CleanFilePresent:
                        assert.isUndefined(incrementalText, `Incremental file should be absent:: ${message}`);
                        assert.isDefined(cleanText, `Clean file should be present:: ${message}`);
                        return;
                    default:
                        Debug.assertNever(descrepancyInClean);
                }
            }

            function verifyMapLike<T>(incremental: MapLike<T> | undefined, clean: MapLike<T> | undefined, verifyValue: (key: string, incrementalValue: T, cleanValue: T) => void, message: string) {
                verifyPresenceAbsence(incremental, clean, `Incremental and clean presence should match:: ${message}`);
                if (!incremental) return;
                const incrementalMap = new Map(getEntries(incremental));
                const cleanMap = new Map(getEntries(clean!));
                assert.equal(incrementalMap.size, cleanMap.size, `Incremental and clean size of map should match:: ${message}, Incremental keys: ${arrayFrom(incrementalMap.keys())} Clean: ${arrayFrom(cleanMap.keys())}${TestFSWithWatch.getDiffInKeys(incrementalMap, arrayFrom(cleanMap.keys()))}`);
                cleanMap.forEach((cleanValue, key) => {
                    assert.isTrue(incrementalMap.has(key), `Expected to contain ${key} in incremental map:: ${message}, Incremental keys: ${arrayFrom(incrementalMap.keys())}`);
                    verifyValue(key, incrementalMap.get(key)!, cleanValue);
                });
            }
        });
    }

    function verifyPresenceAbsence<T>(actual: T | undefined, expected: T | undefined, message: string) {
        (expected !== undefined ? assert.isDefined : assert.isUndefined)(actual, message);
    }

    function getBuildInfoForIncrementalCorrectnessCheck(text: string | undefined): {
        buildInfo: string | undefined;
        readableBuildInfo?: ReadableBuildInfo;
    } {
        if (!text) return { buildInfo: text };
        const readableBuildInfo = JSON.parse(text) as ReadableBuildInfo;
        let sanitizedFileInfos: MapLike<BuilderState.FileInfo> | undefined;
        if (readableBuildInfo.program) {
            sanitizedFileInfos = {};
            for (const id in readableBuildInfo.program.fileInfos) {
                if (hasProperty(readableBuildInfo.program.fileInfos, id)) {
                    sanitizedFileInfos[id] = { ...readableBuildInfo.program.fileInfos[id], signature: undefined };
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

    export interface TscIncremental {
        buildKind: BuildKind;
        modifyFs: (fs: vfs.FileSystem) => void;
        subScenario?: string;
        commandLineArgs?: readonly string[];
        cleanBuildDiscrepancies?: () => ESMap<string, CleanBuildDescrepancy>;
    }

    export interface VerifyTsBuildInput extends VerifyTsBuildInputWorker {
        baselineIncremental?: boolean;
    }

    export function verifyTscIncrementalEdits(input: VerifyTsBuildInput) {
        verifyTscIncrementalEditsWorker(input);
        if (input.baselineIncremental) {
            verifyTscIncrementalEditsWorker({
                ...input,
                subScenario: `${input.subScenario} with incremental`,
                commandLineArgs: [...input.commandLineArgs, "--incremental"],
            });
        }
    }

    export interface VerifyTsBuildInputWorker extends TscCompile {
        incrementalScenarios: TscIncremental[];
    }
    function verifyTscIncrementalEditsWorker({
        subScenario, fs, scenario, commandLineArgs,
        baselineSourceMap, modifyFs, baselineReadFileCalls, baselinePrograms,
        incrementalScenarios
    }: VerifyTsBuildInputWorker) {
        describe(`tsc ${commandLineArgs.join(" ")} ${scenario}:: ${subScenario}`, () => {
            let tick: () => void;
            let sys: TscCompileSystem;
            let baseFs: vfs.FileSystem;
            before(() => {
                ({ fs: baseFs, tick } = getFsWithTime(fs()));
                sys = tscCompile({
                    scenario,
                    subScenario,
                    fs: () => baseFs.makeReadonly(),
                    commandLineArgs,
                    modifyFs: fs => {
                        if (modifyFs) modifyFs(fs);
                        tick();
                    },
                    baselineSourceMap,
                    baselineReadFileCalls,
                    baselinePrograms
                });
                Debug.assert(!!incrementalScenarios.length, `${scenario}/${subScenario}:: No incremental scenarios, you probably want to use verifyTsc instead.`);
            });
            after(() => {
                baseFs = undefined!;
                sys = undefined!;
                tick = undefined!;
            });
            describe("initialBuild", () => {
                verifyTscBaseline(() => sys);
            });

            incrementalScenarios.forEach(({
                buildKind,
                modifyFs: incrementalModifyFs,
                subScenario: incrementalSubScenario,
                commandLineArgs: incrementalCommandLineArgs,
                cleanBuildDiscrepancies,
            }, index) => {
                describe(incrementalSubScenario || buildKind, () => {
                    let newSys: TscCompileSystem;
                    before(() => {
                        Debug.assert(buildKind !== BuildKind.Initial, "Incremental edit cannot be initial compilation");
                        tick();
                        newSys = tscCompile({
                            scenario,
                            subScenario: incrementalSubScenario || subScenario,
                            buildKind,
                            fs: () => sys.vfs,
                            commandLineArgs: incrementalCommandLineArgs || commandLineArgs,
                            modifyFs: fs => {
                                tick();
                                incrementalModifyFs(fs);
                                tick();
                            },
                            baselineSourceMap,
                            baselineReadFileCalls,
                            baselinePrograms
                        });
                    });
                    after(() => {
                        newSys = undefined!;
                    });
                    verifyTscBaseline(() => newSys);
                    verifyIncrementalCorrectness(() => ({
                        scenario,
                        baseFs,
                        newSys,
                        commandLineArgs: incrementalCommandLineArgs || commandLineArgs,
                        cleanBuildDiscrepancies,
                        incrementalModifyFs,
                        modifyFs,
                        tick
                    }), index, incrementalSubScenario || subScenario);
                });
            });
        });
    }

    export function verifyTscSerializedIncrementalEdits(input: VerifyTsBuildInput) {
        verifyTscSerializedIncrementalEditsWorker(input);
        if (input.baselineIncremental) {
            verifyTscSerializedIncrementalEditsWorker({
                ...input,
                subScenario: `${input.subScenario} with incremental`,
                commandLineArgs: [...input.commandLineArgs, "--incremental"],
            });
        }
    }
    function verifyTscSerializedIncrementalEditsWorker({
        subScenario, fs, scenario, commandLineArgs,
        baselineSourceMap, modifyFs, baselineReadFileCalls, baselinePrograms,
        incrementalScenarios
    }: VerifyTsBuildInputWorker) {
        describe(`tsc ${commandLineArgs.join(" ")} ${scenario}:: ${subScenario} serializedEdits`, () => {
            Debug.assert(!!incrementalScenarios.length, `${scenario}/${subScenario}:: No incremental scenarios, you probably want to use verifyTsc instead.`);
            let tick: () => void;
            let sys: TscCompileSystem;
            let baseFs: vfs.FileSystem;
            let incrementalSys: TscCompileSystem[];
            before(() => {
                ({ fs: baseFs, tick } = getFsWithTime(fs()));
                sys = tscCompile({
                    scenario,
                    subScenario,
                    fs: () => baseFs.makeReadonly(),
                    commandLineArgs,
                    modifyFs: fs => {
                        if (modifyFs) modifyFs(fs);
                        tick();
                    },
                    baselineSourceMap,
                    baselineReadFileCalls,
                    baselinePrograms
                });
                incrementalScenarios.forEach((
                    { buildKind, modifyFs, subScenario: incrementalSubScenario, commandLineArgs: incrementalCommandLineArgs },
                    index
                ) => {
                    Debug.assert(buildKind !== BuildKind.Initial, "Incremental edit cannot be initial compilation");
                    tick();
                    (incrementalSys || (incrementalSys = [])).push(tscCompile({
                        scenario,
                        subScenario: incrementalSubScenario || subScenario,
                        buildKind,
                        fs: () => index === 0 ? sys.vfs : incrementalSys[index - 1].vfs,
                        commandLineArgs: incrementalCommandLineArgs || commandLineArgs,
                        modifyFs: fs => {
                            tick();
                            modifyFs(fs);
                            tick();
                        },
                        baselineSourceMap,
                        baselineReadFileCalls,
                        baselinePrograms
                    }));
                });
            });
            after(() => {
                baseFs = undefined!;
                sys = undefined!;
                tick = undefined!;
                incrementalSys = undefined!;
            });
            describe("serializedBuild", () => {

                verifyTscBaseline(() => ({
                    baseLine: () => {
                        const { file, text } = sys.baseLine();
                        const texts: string[] = [text];
                        incrementalSys.forEach((sys, index) => {
                            const incrementalScenario = incrementalScenarios[index];
                            texts.push("");
                            texts.push(`Change:: ${incrementalScenario.subScenario || incrementalScenario.buildKind}`);
                            texts.push(sys.baseLine().text);
                        });
                        return { file, text: texts.join("\r\n") };
                    }
                }));
            });
            describe("incremental correctness", () => {
                incrementalScenarios.forEach(({ commandLineArgs: incrementalCommandLineArgs, subScenario, buildKind, cleanBuildDiscrepancies }, index) => verifyIncrementalCorrectness(() => ({
                    scenario,
                    baseFs,
                    newSys: incrementalSys[index],
                    commandLineArgs: incrementalCommandLineArgs || commandLineArgs,
                    cleanBuildDiscrepancies,
                    incrementalModifyFs: fs => {
                        for (let i = 0; i <= index; i++) {
                            incrementalScenarios[i].modifyFs(fs);
                        }
                    },
                    modifyFs,
                    tick
                }), index, subScenario || buildKind));
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
