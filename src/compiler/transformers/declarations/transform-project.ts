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
    ensureTrailingDirectorySeparator,
    factory,
    getAreDeclarationMapsEnabled,
    getBaseFileName,
    getDeclarationEmitOutputFilePathWorker,
    getDirectoryPath,
    getNewLineCharacter,
    getRelativePathToDirectoryOrUrl,
    getRootLength,
    getSourceFilePathInNewDir,
    normalizePath,
    normalizeSlashes,
    PrinterOptions,
    SourceFile,
    SourceMapGenerator,
    sys,
    TransformationContext,
    transformDeclarations,
    TranspileDeclarationsOptions,
    TranspileDeclarationsOutput,
} from "../../_namespaces/ts";

function createEmitDeclarationHost(options: TranspileDeclarationsOptions): EmitHost {
    const throws = () => Debug.fail("Function should not be called in isolated declarations emit");
    return {
        getCurrentDirectory: () => options.currentDirectory ?? ".",
        getCanonicalFileName: createGetCanonicalFileName(sys.useCaseSensitiveFileNames),
        useCaseSensitiveFileNames: () => !!options.useCaseSensitiveFileNames,
        getCompilerOptions: () => options.compilerOptions,
        getCommonSourceDirectory: () => ensureTrailingDirectorySeparator(options.commonSourceDirectory ?? "."),
        redirectTargetsMap: undefined!, // new Map(),
        directoryExists: throws,
        fileExists: throws,
        readFile: throws,
        realpath: throws,
        getLibFileFromReference: throws,
        getSourceFileFromReference: throws,
        isSourceOfProjectReferenceRedirect: throws,

        getSourceFiles: throws,
        isEmitBlocked: throws,
        getPrependNodes: throws,
        writeFile: throws,
        getBuildInfo: throws,
        getSourceFile: throws,
        getSourceFileByPath: throws,
        getProjectReferenceRedirect: throws,
        getFileIncludeReasons: throws,
        isSourceFileFromExternalLibrary: throws,
        getResolvedProjectReferenceToRedirect: throws,
    };
}

export function transpileDeclaration(sourceFile: SourceFile, transpileOptions: TranspileDeclarationsOptions): TranspileDeclarationsOutput {
    const compilerOptions: CompilerOptions = {
        ...transpileOptions.compilerOptions,
        isolatedDeclarations: true,
        traceResolution: false,
    };
    const emitHost = createEmitDeclarationHost(transpileOptions);
    const emitResolver = createEmitDeclarationResolver(sourceFile);
    const diagnostics: Diagnostic[] = [];
    const transformer = transformDeclarations({
        getEmitHost() {
            return emitHost;
        },
        getEmitResolver() {
            return emitResolver;
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
        removeComments: compilerOptions.removeComments,
        newLine: compilerOptions.newLine,
        noEmitHelpers: true,
        module: compilerOptions.module,
        target: compilerOptions.target,
        sourceMap: compilerOptions.declarationMap,
        inlineSourceMap: compilerOptions.inlineSourceMap,
        extendedDiagnostics: compilerOptions.extendedDiagnostics,
        onlyPrintJsDocStyle: true,
        omitBraceSourceMapPositions: true,
    } as PrinterOptions);

    const writer = createTextWriter(getNewLineCharacter(compilerOptions));
    const declarationPath = getDeclarationEmitOutputFilePathWorker(
        sourceFile.fileName,
        compilerOptions,
        emitHost.getCurrentDirectory(),
        emitHost.getCommonSourceDirectory(),
        emitHost.getCanonicalFileName,
    );
    const declarationMapPath = declarationPath + ".map";
    const sourceMap = getSourceMapGenerator(declarationPath, declarationMapPath);
    printer.writeFile(result, writer, sourceMap?.sourceMapGenerator);
    if (sourceMap) {
        if (!writer.isAtStartOfLine()) writer.writeLine();
        writer.writeComment(sourceMap.sourceMappingURL);
    }

    return {
        declaration: writer.getText(),
        declarationPath,
        declarationMap: sourceMap?.sourceMapGenerator.toString(),
        declarationMapPath: sourceMap && declarationMapPath,
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
    function getSourceMapGenerator(declarationFilePath: string, declarationMapPath: string) {
        if (!getAreDeclarationMapsEnabled(compilerOptions)) return;

        const mapOptions = {
            sourceRoot: compilerOptions.sourceRoot,
            mapRoot: compilerOptions.mapRoot,
            extendedDiagnostics: compilerOptions.extendedDiagnostics,
            // Explicitly do not passthru either `inline` option
        };

        const sourceRoot = normalizeSlashes(compilerOptions.sourceRoot || "");
        const sourceMapGenerator = createSourceMapGenerator(
            emitHost,
            getBaseFileName(normalizeSlashes(declarationFilePath)),
            sourceRoot ? ensureTrailingDirectorySeparator(sourceRoot) : sourceRoot,
            getSourceMapDirectory(compilerOptions, declarationFilePath, sourceFile),
            mapOptions,
        );

        const sourceMappingURL = getSourceMappingURL(
            mapOptions,
            sourceMapGenerator,
            declarationFilePath,
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
