import {
    base64encode,
    combinePaths,
    CompilerHost,
    CompilerOptions,
    createEmitDeclarationHost,
    createEmitDeclarationResolver,
    createPrinter,
    createSourceMapGenerator,
    createTextWriter,
    Debug,
    Diagnostic,
    EmitHost,
    EmitResolver,
    ensureTrailingDirectorySeparator,
    factory,
    getDeclarationEmitExtensionForPath,
    getNormalizedAbsolutePath,
    getRelativePathFromDirectory,
    getBaseFileName,
    getDirectoryPath,
    getNewLineCharacter,
    getOutputPathsFor,
    getRelativePathToDirectoryOrUrl,
    getRootLength,
    getSourceFilePathInNewDir,
    NewLineKind,
    normalizePath,
    normalizeSlashes,
    PrinterOptions,
    ScriptTarget,
    SourceFile,
    SourceMapGenerator,
    sys,
    TransformationContext,
    transformDeclarations,
    pathIsAbsolute,
    changeAnyExtension,
} from "../../_namespaces/ts";

export function emitDeclarationsForProject(
    projectPath: string,
    files: string[] | undefined,
    options: CompilerOptions,
    host: CompilerHost,
) {
    const rootDir = options.rootDir ? normalizePath(sys.resolvePath(combinePaths(projectPath, options.rootDir))) : normalizePath(projectPath);
    files ??= host.readDirectory!(rootDir, [".ts", ".tsx"], ["**/*.d.ts"], []);
    emitDeclarationsForAllFiles(rootDir, files, host, options);
    return rootDir;
}

function joinToRootIfNeeded(rootDir: string, existingPath: string) {
    return normalizePath(pathIsAbsolute(existingPath) ? existingPath : combinePaths(rootDir, existingPath));
}

export function createIsolatedDeclarationsEmitter(rootDir: string, options: CompilerOptions) {
    const declarationDir = options.declarationDir ? joinToRootIfNeeded(rootDir, options.declarationDir) :
        options.outDir ? joinToRootIfNeeded(rootDir, options.outDir) :
        undefined;
    rootDir = normalizePath(rootDir);
    return (file: string, host: CompilerHost) => {
        file = normalizePath(file);
        const source = host.getSourceFile(file, {
            languageVersion: options.target ?? ScriptTarget.ES2015,
        });

        if (!source) return {};

        const { code, diagnostics, declarationMap, declarationMapPath} = emitDeclarationsForFile(source, options);
        const extension = getDeclarationEmitExtensionForPath(file);
        const relativeToRoot = getRelativePathFromDirectory(rootDir, file, !host.useCaseSensitiveFileNames());
        const declarationPath = !declarationDir ? file : getNormalizedAbsolutePath(combinePaths(declarationDir, relativeToRoot), host.getCurrentDirectory());
        const output = changeAnyExtension(declarationPath, extension);
        host.writeFile(output, code, !!options.emitBOM);
        if (declarationMap) {
            host.writeFile(declarationMapPath!, declarationMap, !!options.emitBOM);
        }
        return { output, diagnostics };
    };
}

function emitDeclarationsForAllFiles(rootDir: string, files: string[], host: CompilerHost, options: CompilerOptions) {
    const transformer = createIsolatedDeclarationsEmitter(rootDir, options);
    for (const file of files) {
        transformer(file, host);
    }
}

export function emitDeclarationsForFile(sourceFile: SourceFile, options: CompilerOptions) {
    const emitHost = createEmitDeclarationHost(options, sys);
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
            return options;
        },
        factory,
        addDiagnostic(diag: any) {
            diagnostics.push(diag);
        },
    } as Partial<TransformationContext> as TransformationContext);
    const result = transformer(sourceFile);

    const printer = createPrinter({
        onlyPrintJsDocStyle: true,
        newLine: options.newLine ?? NewLineKind.CarriageReturnLineFeed,
        target: options.target,
        removeComments: options.removeComments,
    } as PrinterOptions);

    const writer = createTextWriter(getNewLineCharacter(options));
    const sourceMap = getSourceMapGenerator();
    printer.writeFile(result, writer, sourceMap?.sourceMapGenerator);
    if (sourceMap) {
        if (!writer.isAtStartOfLine()) writer.rawWrite(getNewLineCharacter(options));
        writer.writeComment(sourceMap.sourceMappingURL);
    }

    if (diagnostics.length > 0) {
        throw new Error(`Cannot transform file '${sourceFile.fileName}' due to ${diagnostics.length} diagnostics`);
    }
    const { declarationMapPath, declarationFilePath } = getOutputPathsFor(sourceFile, emitHost as unknown as EmitHost, /*forceDtsPaths*/ false);

    return {
        code: writer.getText(),
        diagnostics,
        declarationFilePath: declarationFilePath!,
        declarationMap: sourceMap?.sourceMapGenerator.toString(),
        declarationMapPath,
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
        if (!options.declarationMap) return;

        const mapOptions = {
            sourceRoot: options.sourceRoot,
            mapRoot: options.mapRoot,
            extendedDiagnostics: options.extendedDiagnostics,
            // Explicitly do not passthru either `inline` option
        }

        const sourceRoot = normalizeSlashes(options.sourceRoot || "");
        const { declarationMapPath, declarationFilePath } = getOutputPathsFor(sourceFile, emitHost as unknown as EmitHost, /*forceDtsPaths*/ false);
        const sourceMapGenerator = createSourceMapGenerator(
            emitHost as unknown as EmitHost,
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
