import {
    base64encode,
    combinePaths,
    CompilerOptions,
    createEmitDeclarationResolver,
    createGetCanonicalFileName,
    createPrinter,
    createSourceMapGenerator,
    createTextWriter,
    Debug,
    Diagnostic,
    EmitHost,
    EmitResolver,
    ensureTrailingDirectorySeparator,
    factory,
    getAreDeclarationMapsEnabled,
    getBaseFileName,
    getDeclarationEmitOutputFilePathWorker,
    getDirectoryPath,
    getNewLineCharacter,
    getOutputPathsFor,
    getRelativePathToDirectoryOrUrl,
    getRootLength,
    getSourceFilePathInNewDir,
    IsolatedEmitHost,
    noop,
    normalizePath,
    normalizeSlashes,
    PrinterOptions,
    returnFalse,
    returnUndefined,
    SourceFile,
    SourceMapGenerator,
    sys,
    System,
    TransformationContext,
    transformDeclarations,
} from "../../_namespaces/ts";

export function createEmitDeclarationHost(options: CompilerOptions, sys: System, commonSourceDirectory = sys.getCurrentDirectory()): IsolatedEmitHost {
    return {
        redirectTargetsMap: new Map(),
        directoryExists: sys.directoryExists.bind(sys),
        fileExists: sys.fileExists.bind(sys),
        getDirectories: sys.getDirectories.bind(sys),
        readFile: sys.readFile.bind(sys),
        realpath: sys.realpath?.bind(sys),
        getCurrentDirectory: sys.getCurrentDirectory.bind(sys),
        getCanonicalFileName: createGetCanonicalFileName(sys.useCaseSensitiveFileNames),
        useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
        getCompilerOptions: () => options,
        getCommonSourceDirectory: () => ensureTrailingDirectorySeparator(sys.resolvePath(commonSourceDirectory)),
        trace: noop,
        getLibFileFromReference: returnUndefined,
        getSourceFileFromReference: returnUndefined,
        isSourceOfProjectReferenceRedirect: returnFalse,
    };
}

export function transpileDeclaration(sourceFile: SourceFile, emitHost: IsolatedEmitHost) {
    const options: CompilerOptions = emitHost.getCompilerOptions();
    const emitResolver = createEmitDeclarationResolver(sourceFile, emitHost);
    const diagnostics: Diagnostic[] = [];
    const transformer = transformDeclarations({
        getEmitHost() {
            return emitHost as never as EmitHost;
        },
        getEmitResolver() {
            return emitResolver as EmitResolver;
        },
        getCompilerOptions() {
            return emitHost.getCompilerOptions();
        },
        factory,
        addDiagnostic(diag: any) {
            diagnostics.push(diag);
        },
    } as Partial<TransformationContext> as TransformationContext);
    const result = transformer(sourceFile);

    const printer = createPrinter({
        removeComments: options.removeComments,
        newLine: options.newLine,
        noEmitHelpers: true,
        module: options.module,
        target: options.target,
        sourceMap: options.declarationMap,
        inlineSourceMap: options.inlineSourceMap,
        extendedDiagnostics: options.extendedDiagnostics,
        onlyPrintJsDocStyle: true,
        omitBraceSourceMapPositions: true,
    } as PrinterOptions);

    const writer = createTextWriter(getNewLineCharacter(options));
    const sourceMap = getSourceMapGenerator();
    printer.writeFile(result, writer, sourceMap?.sourceMapGenerator);
    if (sourceMap) {
        if (!writer.isAtStartOfLine()) writer.writeLine();
        writer.writeComment(sourceMap.sourceMappingURL);
        writer.writeLine();
    }

    const declarationPath = getDeclarationEmitOutputFilePathWorker(
        sourceFile.fileName,
        options,
        emitHost.getCurrentDirectory(),
        emitHost.getCommonSourceDirectory(),
        emitHost.getCanonicalFileName,
    );

    return {
        declaration: writer.getText(),
        declarationPath,
        declarationMap: sourceMap?.sourceMapGenerator.toString(),
        declarationMapPath: sourceMap && declarationPath + ".map",
        diagnostics,
    };

    // logic replicated from emitter.ts
    function getSourceMapDirectory(mapOptions: CompilerOptions, filePath: string, sourceFile: SourceFile | undefined) {
        if (mapOptions.sourceRoot) return emitHost.getCommonSourceDirectory();
        if (mapOptions.mapRoot) {
            let sourceMapDir = normalizeSlashes(mapOptions.mapRoot);
            if (sourceFile) {
                // For modules or multiple emit files the mapRoot will have directory structure like the sources
                // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceFile.fileName, emitHost as unknown as EmitHost, sourceMapDir));
            }
            if (getRootLength(sourceMapDir) === 0) {
                // The relative paths are relative to the common directory
                sourceMapDir = combinePaths(emitHost.getCommonSourceDirectory(), sourceMapDir);
            }
            return sourceMapDir;
        }
        return getDirectoryPath(normalizePath(filePath));
    }

    // logic replicated from emitter.ts
    function getSourceMapGenerator() {
        if (!getAreDeclarationMapsEnabled(options)) return;

        const mapOptions = {
            sourceRoot: options.sourceRoot,
            mapRoot: options.mapRoot,
            extendedDiagnostics: options.extendedDiagnostics,
            // Explicitly do not passthru either `inline` option
        };

        const sourceRoot = normalizeSlashes(options.sourceRoot || "");
        const { declarationMapPath, declarationFilePath } = getOutputPathsFor(sourceFile, emitHost as unknown as EmitHost, /*forceDtsPaths*/ false);
        const sourceMapGenerator = createSourceMapGenerator(
            emitHost,
            getBaseFileName(normalizeSlashes(declarationFilePath!)),
            sourceRoot ? ensureTrailingDirectorySeparator(sourceRoot) : sourceRoot,
            getSourceMapDirectory(options, sourceFile.fileName, sourceFile),
            mapOptions,
        );

        const sourceMappingURL = getSourceMappingURL(
            mapOptions,
            sourceMapGenerator,
            declarationFilePath!,
            declarationMapPath,
            sourceFile,
        );
        return { sourceMapGenerator, sourceMappingURL: `//# ${"sourceMappingURL"}=${sourceMappingURL}` };
    }

    // logic replicated from emitter.ts
    function getSourceMappingURL(mapOptions: CompilerOptions, sourceMapGenerator: SourceMapGenerator, filePath: string, sourceMapFilePath: string | undefined, sourceFile: SourceFile | undefined) {
        if (mapOptions.inlineSourceMap) {
            // Encode the sourceMap into the sourceMap url
            const sourceMapText = sourceMapGenerator.toString();
            const base64SourceMapText = base64encode(sys, sourceMapText);
            return `data:application/json;base64,${base64SourceMapText}`;
        }

        const sourceMapFile = getBaseFileName(normalizeSlashes(Debug.checkDefined(sourceMapFilePath)));
        if (mapOptions.mapRoot) {
            let sourceMapDir = normalizeSlashes(mapOptions.mapRoot);
            if (sourceFile) {
                // For modules or multiple emit files the mapRoot will have directory structure like the sources
                // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceFile.fileName, emitHost as unknown as EmitHost, sourceMapDir));
            }
            if (getRootLength(sourceMapDir) === 0) {
                // The relative paths are relative to the common directory
                sourceMapDir = combinePaths(emitHost.getCommonSourceDirectory(), sourceMapDir);
                return encodeURI(
                    getRelativePathToDirectoryOrUrl(
                        getDirectoryPath(normalizePath(filePath)), // get the relative sourceMapDir path based on jsFilePath
                        combinePaths(sourceMapDir, sourceMapFile), // this is where user expects to see sourceMap
                        emitHost.getCurrentDirectory(),
                        emitHost.getCanonicalFileName,
                        /*isAbsolutePathAnUrl*/ true,
                    ),
                );
            }
            else {
                return encodeURI(combinePaths(sourceMapDir, sourceMapFile));
            }
        }
        return encodeURI(sourceMapFile);
    }
}
