import * as ts from "./_namespaces/ts";

const brackets = createBracketsMap();

/*@internal*/
export function isBuildInfoFile(file: string) {
    return ts.fileExtensionIs(file, ts.Extension.TsBuildInfo);
}

/*@internal*/
/**
 * Iterates over the source files that are expected to have an emit output.
 *
 * @param host An EmitHost.
 * @param action The action to execute.
 * @param sourceFilesOrTargetSourceFile
 *   If an array, the full list of source files to emit.
 *   Else, calls `getSourceFilesToEmit` with the (optional) target source file to determine the list of source files to emit.
 */
export function forEachEmittedFile<T>(
    host: ts.EmitHost, action: (emitFileNames: ts.EmitFileNames, sourceFileOrBundle: ts.SourceFile | ts.Bundle | undefined) => T,
    sourceFilesOrTargetSourceFile?: readonly ts.SourceFile[] | ts.SourceFile,
    forceDtsEmit = false,
    onlyBuildInfo?: boolean,
    includeBuildInfo?: boolean) {
    const sourceFiles = ts.isArray(sourceFilesOrTargetSourceFile) ? sourceFilesOrTargetSourceFile : ts.getSourceFilesToEmit(host, sourceFilesOrTargetSourceFile, forceDtsEmit);
    const options = host.getCompilerOptions();
    if (ts.outFile(options)) {
        const prepends = host.getPrependNodes();
        if (sourceFiles.length || prepends.length) {
            const bundle = ts.factory.createBundle(sourceFiles, prepends);
            const result = action(getOutputPathsFor(bundle, host, forceDtsEmit), bundle);
            if (result) {
                return result;
            }
        }
    }
    else {
        if (!onlyBuildInfo) {
            for (const sourceFile of sourceFiles) {
                const result = action(getOutputPathsFor(sourceFile, host, forceDtsEmit), sourceFile);
                if (result) {
                    return result;
                }
            }
        }
        if (includeBuildInfo) {
            const buildInfoPath = getTsBuildInfoEmitOutputFilePath(options);
            if (buildInfoPath) return action({ buildInfoPath }, /*sourceFileOrBundle*/ undefined);
        }
    }
}

export function getTsBuildInfoEmitOutputFilePath(options: ts.CompilerOptions) {
    const configFile = options.configFilePath;
    if (!ts.isIncrementalCompilation(options)) return undefined;
    if (options.tsBuildInfoFile) return options.tsBuildInfoFile;
    const outPath = ts.outFile(options);
    let buildInfoExtensionLess: string;
    if (outPath) {
        buildInfoExtensionLess = ts.removeFileExtension(outPath);
    }
    else {
        if (!configFile) return undefined;
        const configFileExtensionLess = ts.removeFileExtension(configFile);
        buildInfoExtensionLess = options.outDir ?
            options.rootDir ?
                ts.resolvePath(options.outDir, ts.getRelativePathFromDirectory(options.rootDir, configFileExtensionLess, /*ignoreCase*/ true)) :
                ts.combinePaths(options.outDir, ts.getBaseFileName(configFileExtensionLess)) :
            configFileExtensionLess;
    }
    return buildInfoExtensionLess + ts.Extension.TsBuildInfo;
}

/*@internal*/
export function getOutputPathsForBundle(options: ts.CompilerOptions, forceDtsPaths: boolean): ts.EmitFileNames {
    const outPath = ts.outFile(options)!;
    const jsFilePath = options.emitDeclarationOnly ? undefined : outPath;
    const sourceMapFilePath = jsFilePath && getSourceMapFilePath(jsFilePath, options);
    const declarationFilePath = (forceDtsPaths || ts.getEmitDeclarations(options)) ? ts.removeFileExtension(outPath) + ts.Extension.Dts : undefined;
    const declarationMapPath = declarationFilePath && ts.getAreDeclarationMapsEnabled(options) ? declarationFilePath + ".map" : undefined;
    const buildInfoPath = getTsBuildInfoEmitOutputFilePath(options);
    return { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath };
}

/*@internal*/
export function getOutputPathsFor(sourceFile: ts.SourceFile | ts.Bundle, host: ts.EmitHost, forceDtsPaths: boolean): ts.EmitFileNames {
    const options = host.getCompilerOptions();
    if (sourceFile.kind === ts.SyntaxKind.Bundle) {
        return getOutputPathsForBundle(options, forceDtsPaths);
    }
    else {
        const ownOutputFilePath = ts.getOwnEmitOutputFilePath(sourceFile.fileName, host, getOutputExtension(sourceFile.fileName, options));
        const isJsonFile = ts.isJsonSourceFile(sourceFile);
        // If json file emits to the same location skip writing it, if emitDeclarationOnly skip writing it
        const isJsonEmittedToSameLocation = isJsonFile &&
            ts.comparePaths(sourceFile.fileName, ownOutputFilePath, host.getCurrentDirectory(), !host.useCaseSensitiveFileNames()) === ts.Comparison.EqualTo;
        const jsFilePath = options.emitDeclarationOnly || isJsonEmittedToSameLocation ? undefined : ownOutputFilePath;
        const sourceMapFilePath = !jsFilePath || ts.isJsonSourceFile(sourceFile) ? undefined : getSourceMapFilePath(jsFilePath, options);
        const declarationFilePath = (forceDtsPaths || (ts.getEmitDeclarations(options) && !isJsonFile)) ? ts.getDeclarationEmitOutputFilePath(sourceFile.fileName, host) : undefined;
        const declarationMapPath = declarationFilePath && ts.getAreDeclarationMapsEnabled(options) ? declarationFilePath + ".map" : undefined;
        return { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath: undefined };
    }
}

function getSourceMapFilePath(jsFilePath: string, options: ts.CompilerOptions) {
    return (options.sourceMap && !options.inlineSourceMap) ? jsFilePath + ".map" : undefined;
}

/* @internal */
export function getOutputExtension(fileName: string, options: ts.CompilerOptions): ts.Extension {
    return ts.fileExtensionIs(fileName, ts.Extension.Json) ? ts.Extension.Json :
    options.jsx === ts.JsxEmit.Preserve && ts.fileExtensionIsOneOf(fileName, [ts.Extension.Jsx, ts.Extension.Tsx]) ? ts.Extension.Jsx :
    ts.fileExtensionIsOneOf(fileName, [ts.Extension.Mts, ts.Extension.Mjs]) ? ts.Extension.Mjs :
    ts.fileExtensionIsOneOf(fileName, [ts.Extension.Cts, ts.Extension.Cjs]) ? ts.Extension.Cjs :
    ts.Extension.Js;
}

function getOutputPathWithoutChangingExt(inputFileName: string, configFile: ts.ParsedCommandLine, ignoreCase: boolean, outputDir: string | undefined, getCommonSourceDirectory?: () => string) {
    return outputDir ?
        ts.resolvePath(
            outputDir,
            ts.getRelativePathFromDirectory(getCommonSourceDirectory ? getCommonSourceDirectory() : getCommonSourceDirectoryOfConfig(configFile, ignoreCase), inputFileName, ignoreCase)
        ) :
        inputFileName;
}

/* @internal */
export function getOutputDeclarationFileName(inputFileName: string, configFile: ts.ParsedCommandLine, ignoreCase: boolean, getCommonSourceDirectory?: () => string) {
    return ts.changeExtension(
        getOutputPathWithoutChangingExt(inputFileName, configFile, ignoreCase, configFile.options.declarationDir || configFile.options.outDir, getCommonSourceDirectory),
        ts.getDeclarationEmitExtensionForPath(inputFileName)
    );
}

function getOutputJSFileName(inputFileName: string, configFile: ts.ParsedCommandLine, ignoreCase: boolean, getCommonSourceDirectory?: () => string) {
    if (configFile.options.emitDeclarationOnly) return undefined;
    const isJsonFile = ts.fileExtensionIs(inputFileName, ts.Extension.Json);
    const outputFileName = ts.changeExtension(
        getOutputPathWithoutChangingExt(inputFileName, configFile, ignoreCase, configFile.options.outDir, getCommonSourceDirectory),
        getOutputExtension(inputFileName, configFile.options)
    );
    return !isJsonFile || ts.comparePaths(inputFileName, outputFileName, ts.Debug.checkDefined(configFile.options.configFilePath), ignoreCase) !== ts.Comparison.EqualTo ?
        outputFileName :
        undefined;
}

function createAddOutput() {
    let outputs: string[] | undefined;
    return { addOutput, getOutputs };
    function addOutput(path: string | undefined) {
        if (path) {
            (outputs || (outputs = [])).push(path);
        }
    }
    function getOutputs(): readonly string[] {
        return outputs || ts.emptyArray;
    }
}

function getSingleOutputFileNames(configFile: ts.ParsedCommandLine, addOutput: ReturnType<typeof createAddOutput>["addOutput"]) {
    const { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath } = getOutputPathsForBundle(configFile.options, /*forceDtsPaths*/ false);
    addOutput(jsFilePath);
    addOutput(sourceMapFilePath);
    addOutput(declarationFilePath);
    addOutput(declarationMapPath);
    addOutput(buildInfoPath);
}

function getOwnOutputFileNames(configFile: ts.ParsedCommandLine, inputFileName: string, ignoreCase: boolean, addOutput: ReturnType<typeof createAddOutput>["addOutput"], getCommonSourceDirectory?: () => string) {
    if (ts.isDeclarationFileName(inputFileName)) return;
    const js = getOutputJSFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory);
    addOutput(js);
    if (ts.fileExtensionIs(inputFileName, ts.Extension.Json)) return;
    if (js && configFile.options.sourceMap) {
        addOutput(`${js}.map`);
    }
    if (ts.getEmitDeclarations(configFile.options)) {
        const dts = getOutputDeclarationFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory);
        addOutput(dts);
        if (configFile.options.declarationMap) {
            addOutput(`${dts}.map`);
        }
    }
}

/*@internal*/
export function getCommonSourceDirectory(
    options: ts.CompilerOptions,
    emittedFiles: () => readonly string[],
    currentDirectory: string,
    getCanonicalFileName: ts.GetCanonicalFileName,
    checkSourceFilesBelongToPath?: (commonSourceDirectory: string) => void
): string {
    let commonSourceDirectory;
    if (options.rootDir) {
        // If a rootDir is specified use it as the commonSourceDirectory
        commonSourceDirectory = ts.getNormalizedAbsolutePath(options.rootDir, currentDirectory);
        checkSourceFilesBelongToPath?.(options.rootDir);
    }
    else if (options.composite && options.configFilePath) {
        // Project compilations never infer their root from the input source paths
        commonSourceDirectory = ts.getDirectoryPath(ts.normalizeSlashes(options.configFilePath));
        checkSourceFilesBelongToPath?.(commonSourceDirectory);
    }
    else {
        commonSourceDirectory = ts.computeCommonSourceDirectoryOfFilenames(emittedFiles(), currentDirectory, getCanonicalFileName);
    }

    if (commonSourceDirectory && commonSourceDirectory[commonSourceDirectory.length - 1] !== ts.directorySeparator) {
        // Make sure directory path ends with directory separator so this string can directly
        // used to replace with "" to get the relative path of the source file and the relative path doesn't
        // start with / making it rooted path
        commonSourceDirectory += ts.directorySeparator;
    }
    return commonSourceDirectory;
}

/*@internal*/
export function getCommonSourceDirectoryOfConfig({ options, fileNames }: ts.ParsedCommandLine, ignoreCase: boolean): string {
    return getCommonSourceDirectory(
        options,
        () => ts.filter(fileNames, file => !(options.noEmitForJsFiles && ts.fileExtensionIsOneOf(file, ts.supportedJSExtensionsFlat)) && !ts.isDeclarationFileName(file)),
        ts.getDirectoryPath(ts.normalizeSlashes(ts.Debug.checkDefined(options.configFilePath))),
        ts.createGetCanonicalFileName(!ignoreCase)
    );
}

/*@internal*/
export function getAllProjectOutputs(configFile: ts.ParsedCommandLine, ignoreCase: boolean): readonly string[] {
    const { addOutput, getOutputs } = createAddOutput();
    if (ts.outFile(configFile.options)) {
        getSingleOutputFileNames(configFile, addOutput);
    }
    else {
        const getCommonSourceDirectory = ts.memoize(() => getCommonSourceDirectoryOfConfig(configFile, ignoreCase));
        for (const inputFileName of configFile.fileNames) {
            getOwnOutputFileNames(configFile, inputFileName, ignoreCase, addOutput, getCommonSourceDirectory);
        }
        addOutput(getTsBuildInfoEmitOutputFilePath(configFile.options));
    }
    return getOutputs();
}

export function getOutputFileNames(commandLine: ts.ParsedCommandLine, inputFileName: string, ignoreCase: boolean): readonly string[] {
    inputFileName = ts.normalizePath(inputFileName);
    ts.Debug.assert(ts.contains(commandLine.fileNames, inputFileName), `Expected fileName to be present in command line`);
    const { addOutput, getOutputs } = createAddOutput();
    if (ts.outFile(commandLine.options)) {
        getSingleOutputFileNames(commandLine, addOutput);
    }
    else {
        getOwnOutputFileNames(commandLine, inputFileName, ignoreCase, addOutput);
    }
    return getOutputs();
}

/*@internal*/
export function getFirstProjectOutput(configFile: ts.ParsedCommandLine, ignoreCase: boolean): string {
    if (ts.outFile(configFile.options)) {
        const { jsFilePath } = getOutputPathsForBundle(configFile.options, /*forceDtsPaths*/ false);
        return ts.Debug.checkDefined(jsFilePath, `project ${configFile.options.configFilePath} expected to have at least one output`);
    }

    const getCommonSourceDirectory = ts.memoize(() => getCommonSourceDirectoryOfConfig(configFile, ignoreCase));
    for (const inputFileName of configFile.fileNames) {
        if (ts.isDeclarationFileName(inputFileName)) continue;
        const jsFilePath = getOutputJSFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory);
        if (jsFilePath) return jsFilePath;
        if (ts.fileExtensionIs(inputFileName, ts.Extension.Json)) continue;
        if (ts.getEmitDeclarations(configFile.options)) {
            return getOutputDeclarationFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory);
        }
    }
    const buildInfoPath = getTsBuildInfoEmitOutputFilePath(configFile.options);
    if (buildInfoPath) return buildInfoPath;
    return ts.Debug.fail(`project ${configFile.options.configFilePath} expected to have at least one output`);
}

/*@internal*/
// targetSourceFile is when users only want one file in entire project to be emitted. This is used in compileOnSave feature
export function emitFiles(resolver: ts.EmitResolver, host: ts.EmitHost, targetSourceFile: ts.SourceFile | undefined, { scriptTransformers, declarationTransformers }: ts.EmitTransformers, emitOnlyDtsFiles?: boolean, onlyBuildInfo?: boolean, forceDtsEmit?: boolean): ts.EmitResult {
    const compilerOptions = host.getCompilerOptions();
    const sourceMapDataList: ts.SourceMapEmitResult[] | undefined = (compilerOptions.sourceMap || compilerOptions.inlineSourceMap || ts.getAreDeclarationMapsEnabled(compilerOptions)) ? [] : undefined;
    const emittedFilesList: string[] | undefined = compilerOptions.listEmittedFiles ? [] : undefined;
    const emitterDiagnostics = ts.createDiagnosticCollection();
    const newLine = ts.getNewLineCharacter(compilerOptions, () => host.getNewLine());
    const writer = ts.createTextWriter(newLine);
    const { enter, exit } = ts.performance.createTimer("printTime", "beforePrint", "afterPrint");
    let bundleBuildInfo: ts.BundleBuildInfo | undefined;
    let emitSkipped = false;

    // Emit each output file
    enter();
    forEachEmittedFile(
        host,
        emitSourceFileOrBundle,
        ts.getSourceFilesToEmit(host, targetSourceFile, forceDtsEmit),
        forceDtsEmit,
        onlyBuildInfo,
        !targetSourceFile
    );
    exit();


    return {
        emitSkipped,
        diagnostics: emitterDiagnostics.getDiagnostics(),
        emittedFiles: emittedFilesList,
        sourceMaps: sourceMapDataList,
    };

    function emitSourceFileOrBundle({ jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath }: ts.EmitFileNames, sourceFileOrBundle: ts.SourceFile | ts.Bundle | undefined) {
        let buildInfoDirectory: string | undefined;
        if (buildInfoPath && sourceFileOrBundle && ts.isBundle(sourceFileOrBundle)) {
            buildInfoDirectory = ts.getDirectoryPath(ts.getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
            bundleBuildInfo = {
                commonSourceDirectory: relativeToBuildInfo(host.getCommonSourceDirectory()),
                sourceFiles: sourceFileOrBundle.sourceFiles.map(file => relativeToBuildInfo(ts.getNormalizedAbsolutePath(file.fileName, host.getCurrentDirectory())))
            };
        }
        ts.tracing?.push(ts.tracing.Phase.Emit, "emitJsFileOrBundle", { jsFilePath });
        emitJsFileOrBundle(sourceFileOrBundle, jsFilePath, sourceMapFilePath, relativeToBuildInfo);
        ts.tracing?.pop();

        ts.tracing?.push(ts.tracing.Phase.Emit, "emitDeclarationFileOrBundle", { declarationFilePath });
        emitDeclarationFileOrBundle(sourceFileOrBundle, declarationFilePath, declarationMapPath, relativeToBuildInfo);
        ts.tracing?.pop();

        ts.tracing?.push(ts.tracing.Phase.Emit, "emitBuildInfo", { buildInfoPath });
        emitBuildInfo(bundleBuildInfo, buildInfoPath);
        ts.tracing?.pop();

        if (!emitSkipped && emittedFilesList) {
            if (!emitOnlyDtsFiles) {
                if (jsFilePath) {
                    emittedFilesList.push(jsFilePath);
                }
                if (sourceMapFilePath) {
                    emittedFilesList.push(sourceMapFilePath);
                }
                if (buildInfoPath) {
                    emittedFilesList.push(buildInfoPath);
                }
            }
            if (declarationFilePath) {
                emittedFilesList.push(declarationFilePath);
            }
            if (declarationMapPath) {
                emittedFilesList.push(declarationMapPath);
            }
        }

        function relativeToBuildInfo(path: string) {
            return ts.ensurePathIsNonModuleName(ts.getRelativePathFromDirectory(buildInfoDirectory!, path, host.getCanonicalFileName));
        }
    }

    function emitBuildInfo(bundle: ts.BundleBuildInfo | undefined, buildInfoPath: string | undefined) {
        // Write build information if applicable
        if (!buildInfoPath || targetSourceFile || emitSkipped) return;
        const program = host.getProgramBuildInfo();
        if (host.isEmitBlocked(buildInfoPath)) {
            emitSkipped = true;
            return;
        }
        const version = ts.version; // Extracted into a const so the form is stable between namespace and module
        const buildInfo: ts.BuildInfo = { bundle, program, version };
        // Pass buildinfo as additional data to avoid having to reparse
        ts.writeFile(host, emitterDiagnostics, buildInfoPath, getBuildInfoText(buildInfo), /*writeByteOrderMark*/ false, /*sourceFiles*/ undefined, { buildInfo });
    }

    function emitJsFileOrBundle(
        sourceFileOrBundle: ts.SourceFile | ts.Bundle | undefined,
        jsFilePath: string | undefined,
        sourceMapFilePath: string | undefined,
        relativeToBuildInfo: (path: string) => string) {
        if (!sourceFileOrBundle || emitOnlyDtsFiles || !jsFilePath) {
            return;
        }

        // Make sure not to write js file and source map file if any of them cannot be written
        if (host.isEmitBlocked(jsFilePath) || compilerOptions.noEmit) {
            emitSkipped = true;
            return;
        }
        // Transform the source files
        const transform = ts.transformNodes(resolver, host, ts.factory, compilerOptions, [sourceFileOrBundle], scriptTransformers, /*allowDtsFiles*/ false);

        const printerOptions: ts.PrinterOptions = {
            removeComments: compilerOptions.removeComments,
            newLine: compilerOptions.newLine,
            noEmitHelpers: compilerOptions.noEmitHelpers,
            module: compilerOptions.module,
            target: compilerOptions.target,
            sourceMap: compilerOptions.sourceMap,
            inlineSourceMap: compilerOptions.inlineSourceMap,
            inlineSources: compilerOptions.inlineSources,
            extendedDiagnostics: compilerOptions.extendedDiagnostics,
            writeBundleFileInfo: !!bundleBuildInfo,
            relativeToBuildInfo
        };

        // Create a printer to print the nodes
        const printer = createPrinter(printerOptions, {
            // resolver hooks
            hasGlobalName: resolver.hasGlobalName,

            // transform hooks
            onEmitNode: transform.emitNodeWithNotification,
            isEmitNotificationEnabled: transform.isEmitNotificationEnabled,
            substituteNode: transform.substituteNode,
        });

        ts.Debug.assert(transform.transformed.length === 1, "Should only see one output from the transform");
        printSourceFileOrBundle(jsFilePath, sourceMapFilePath, transform, printer, compilerOptions);

        // Clean up emit nodes on parse tree
        transform.dispose();
        if (bundleBuildInfo) bundleBuildInfo.js = printer.bundleFileInfo;
    }

    function emitDeclarationFileOrBundle(
        sourceFileOrBundle: ts.SourceFile | ts.Bundle | undefined,
        declarationFilePath: string | undefined,
        declarationMapPath: string | undefined,
        relativeToBuildInfo: (path: string) => string) {
        if (!sourceFileOrBundle) return;
        if (!declarationFilePath) {
            if (emitOnlyDtsFiles || compilerOptions.emitDeclarationOnly) emitSkipped = true;
            return;
        }
        const sourceFiles = ts.isSourceFile(sourceFileOrBundle) ? [sourceFileOrBundle] : sourceFileOrBundle.sourceFiles;
        const filesForEmit = forceDtsEmit ? sourceFiles : ts.filter(sourceFiles, ts.isSourceFileNotJson);
        // Setup and perform the transformation to retrieve declarations from the input files
        const inputListOrBundle = ts.outFile(compilerOptions) ? [ts.factory.createBundle(filesForEmit, !ts.isSourceFile(sourceFileOrBundle) ? sourceFileOrBundle.prepends : undefined)] : filesForEmit;
        if (emitOnlyDtsFiles && !ts.getEmitDeclarations(compilerOptions)) {
            // Checker wont collect the linked aliases since thats only done when declaration is enabled.
            // Do that here when emitting only dts files
            filesForEmit.forEach(collectLinkedAliases);
        }
        const declarationTransform = ts.transformNodes(resolver, host, ts.factory, compilerOptions, inputListOrBundle, declarationTransformers, /*allowDtsFiles*/ false);
        if (ts.length(declarationTransform.diagnostics)) {
            for (const diagnostic of declarationTransform.diagnostics!) {
                emitterDiagnostics.add(diagnostic);
            }
        }

        const printerOptions: ts.PrinterOptions = {
            removeComments: compilerOptions.removeComments,
            newLine: compilerOptions.newLine,
            noEmitHelpers: true,
            module: compilerOptions.module,
            target: compilerOptions.target,
            sourceMap: !forceDtsEmit && compilerOptions.declarationMap,
            inlineSourceMap: compilerOptions.inlineSourceMap,
            extendedDiagnostics: compilerOptions.extendedDiagnostics,
            onlyPrintJsDocStyle: true,
            writeBundleFileInfo: !!bundleBuildInfo,
            recordInternalSection: !!bundleBuildInfo,
            relativeToBuildInfo
        };

        const declarationPrinter = createPrinter(printerOptions, {
            // resolver hooks
            hasGlobalName: resolver.hasGlobalName,

            // transform hooks
            onEmitNode: declarationTransform.emitNodeWithNotification,
            isEmitNotificationEnabled: declarationTransform.isEmitNotificationEnabled,
            substituteNode: declarationTransform.substituteNode,
        });
        const declBlocked = (!!declarationTransform.diagnostics && !!declarationTransform.diagnostics.length) || !!host.isEmitBlocked(declarationFilePath) || !!compilerOptions.noEmit;
        emitSkipped = emitSkipped || declBlocked;
        if (!declBlocked || forceDtsEmit) {
            ts.Debug.assert(declarationTransform.transformed.length === 1, "Should only see one output from the decl transform");
            printSourceFileOrBundle(
                declarationFilePath,
                declarationMapPath,
                declarationTransform,
                declarationPrinter,
                {
                    sourceMap: printerOptions.sourceMap,
                    sourceRoot: compilerOptions.sourceRoot,
                    mapRoot: compilerOptions.mapRoot,
                    extendedDiagnostics: compilerOptions.extendedDiagnostics,
                    // Explicitly do not passthru either `inline` option
                }
            );
        }
        declarationTransform.dispose();
        if (bundleBuildInfo) bundleBuildInfo.dts = declarationPrinter.bundleFileInfo;
    }

    function collectLinkedAliases(node: ts.Node) {
        if (ts.isExportAssignment(node)) {
            if (node.expression.kind === ts.SyntaxKind.Identifier) {
                resolver.collectLinkedAliases(node.expression as ts.Identifier, /*setVisibility*/ true);
            }
            return;
        }
        else if (ts.isExportSpecifier(node)) {
            resolver.collectLinkedAliases(node.propertyName || node.name, /*setVisibility*/ true);
            return;
        }
        ts.forEachChild(node, collectLinkedAliases);
    }

    function printSourceFileOrBundle(jsFilePath: string, sourceMapFilePath: string | undefined, transform: ts.TransformationResult<ts.SourceFile | ts.Bundle>, printer: ts.Printer, mapOptions: SourceMapOptions) {
        const sourceFileOrBundle = transform.transformed[0];
        const bundle = sourceFileOrBundle.kind === ts.SyntaxKind.Bundle ? sourceFileOrBundle : undefined;
        const sourceFile = sourceFileOrBundle.kind === ts.SyntaxKind.SourceFile ? sourceFileOrBundle : undefined;
        const sourceFiles = bundle ? bundle.sourceFiles : [sourceFile!];

        let sourceMapGenerator: ts.SourceMapGenerator | undefined;
        if (shouldEmitSourceMaps(mapOptions, sourceFileOrBundle)) {
            sourceMapGenerator = ts.createSourceMapGenerator(
                host,
                ts.getBaseFileName(ts.normalizeSlashes(jsFilePath)),
                getSourceRoot(mapOptions),
                getSourceMapDirectory(mapOptions, jsFilePath, sourceFile),
                mapOptions);
        }

        if (bundle) {
            printer.writeBundle(bundle, writer, sourceMapGenerator);
        }
        else {
            printer.writeFile(sourceFile!, writer, sourceMapGenerator);
        }

        let sourceMapUrlPos;
        if (sourceMapGenerator) {
            if (sourceMapDataList) {
                sourceMapDataList.push({
                    inputSourceFileNames: sourceMapGenerator.getSources(),
                    sourceMap: sourceMapGenerator.toJSON()
                });
            }

            const sourceMappingURL = getSourceMappingURL(
                mapOptions,
                sourceMapGenerator,
                jsFilePath,
                sourceMapFilePath,
                sourceFile);

            if (sourceMappingURL) {
                if (!writer.isAtStartOfLine()) writer.rawWrite(newLine);
                sourceMapUrlPos = writer.getTextPos();
                writer.writeComment(`//# ${"sourceMappingURL"}=${sourceMappingURL}`); // Tools can sometimes see this line as a source mapping url comment
            }

            // Write the source map
            if (sourceMapFilePath) {
                const sourceMap = sourceMapGenerator.toString();
                ts.writeFile(host, emitterDiagnostics, sourceMapFilePath, sourceMap, /*writeByteOrderMark*/ false, sourceFiles);
                if (printer.bundleFileInfo) printer.bundleFileInfo.mapHash = ts.computeSignature(sourceMap, ts.maybeBind(host, host.createHash));
            }
        }
        else {
            writer.writeLine();
        }

        // Write the output file
        const text = writer.getText();
        ts.writeFile(host, emitterDiagnostics, jsFilePath, text, !!compilerOptions.emitBOM, sourceFiles, { sourceMapUrlPos, diagnostics: transform.diagnostics });
        // We store the hash of the text written in the buildinfo to ensure that text of the referenced d.ts file is same as whats in the buildinfo
        // This is needed because incremental can be toggled between two runs and we might use stale file text to do text manipulation in prepend mode
        if (printer.bundleFileInfo) printer.bundleFileInfo.hash = ts.computeSignature(text, ts.maybeBind(host, host.createHash));

        // Reset state
        writer.clear();
    }

    interface SourceMapOptions {
        sourceMap?: boolean;
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        sourceRoot?: string;
        mapRoot?: string;
        extendedDiagnostics?: boolean;
    }

    function shouldEmitSourceMaps(mapOptions: SourceMapOptions, sourceFileOrBundle: ts.SourceFile | ts.Bundle) {
        return (mapOptions.sourceMap || mapOptions.inlineSourceMap)
            && (sourceFileOrBundle.kind !== ts.SyntaxKind.SourceFile || !ts.fileExtensionIs(sourceFileOrBundle.fileName, ts.Extension.Json));
    }

    function getSourceRoot(mapOptions: SourceMapOptions) {
        // Normalize source root and make sure it has trailing "/" so that it can be used to combine paths with the
        // relative paths of the sources list in the sourcemap
        const sourceRoot = ts.normalizeSlashes(mapOptions.sourceRoot || "");
        return sourceRoot ? ts.ensureTrailingDirectorySeparator(sourceRoot) : sourceRoot;
    }

    function getSourceMapDirectory(mapOptions: SourceMapOptions, filePath: string, sourceFile: ts.SourceFile | undefined) {
        if (mapOptions.sourceRoot) return host.getCommonSourceDirectory();
        if (mapOptions.mapRoot) {
            let sourceMapDir = ts.normalizeSlashes(mapOptions.mapRoot);
            if (sourceFile) {
                // For modules or multiple emit files the mapRoot will have directory structure like the sources
                // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                sourceMapDir = ts.getDirectoryPath(ts.getSourceFilePathInNewDir(sourceFile.fileName, host, sourceMapDir));
            }
            if (ts.getRootLength(sourceMapDir) === 0) {
                // The relative paths are relative to the common directory
                sourceMapDir = ts.combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
            }
            return sourceMapDir;
        }
        return ts.getDirectoryPath(ts.normalizePath(filePath));
    }

    function getSourceMappingURL(mapOptions: SourceMapOptions, sourceMapGenerator: ts.SourceMapGenerator, filePath: string, sourceMapFilePath: string | undefined, sourceFile: ts.SourceFile | undefined) {
        if (mapOptions.inlineSourceMap) {
            // Encode the sourceMap into the sourceMap url
            const sourceMapText = sourceMapGenerator.toString();
            const base64SourceMapText = ts.base64encode(ts.sys, sourceMapText);
            return `data:application/json;base64,${base64SourceMapText}`;
        }

        const sourceMapFile = ts.getBaseFileName(ts.normalizeSlashes(ts.Debug.checkDefined(sourceMapFilePath)));
        if (mapOptions.mapRoot) {
            let sourceMapDir = ts.normalizeSlashes(mapOptions.mapRoot);
            if (sourceFile) {
                // For modules or multiple emit files the mapRoot will have directory structure like the sources
                // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                sourceMapDir = ts.getDirectoryPath(ts.getSourceFilePathInNewDir(sourceFile.fileName, host, sourceMapDir));
            }
            if (ts.getRootLength(sourceMapDir) === 0) {
                // The relative paths are relative to the common directory
                sourceMapDir = ts.combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
                return encodeURI(
                    ts.getRelativePathToDirectoryOrUrl(
                        ts.getDirectoryPath(ts.normalizePath(filePath)), // get the relative sourceMapDir path based on jsFilePath
                        ts.combinePaths(sourceMapDir, sourceMapFile), // this is where user expects to see sourceMap
                        host.getCurrentDirectory(),
                        host.getCanonicalFileName,
                        /*isAbsolutePathAnUrl*/ true));
            }
            else {
                return encodeURI(ts.combinePaths(sourceMapDir, sourceMapFile));
            }
        }
        return encodeURI(sourceMapFile);
    }
}

/*@internal*/
export function getBuildInfoText(buildInfo: ts.BuildInfo) {
    return JSON.stringify(buildInfo);
}

/*@internal*/
export function getBuildInfo(buildInfoFile: string, buildInfoText: string) {
    return ts.readJsonOrUndefined(buildInfoFile, buildInfoText) as ts.BuildInfo | undefined;
}

/*@internal*/
export const notImplementedResolver: ts.EmitResolver = {
    hasGlobalName: ts.notImplemented,
    getReferencedExportContainer: ts.notImplemented,
    getReferencedImportDeclaration: ts.notImplemented,
    getReferencedDeclarationWithCollidingName: ts.notImplemented,
    isDeclarationWithCollidingName: ts.notImplemented,
    isValueAliasDeclaration: ts.notImplemented,
    isReferencedAliasDeclaration: ts.notImplemented,
    isTopLevelValueImportEqualsWithEntityName: ts.notImplemented,
    getNodeCheckFlags: ts.notImplemented,
    isDeclarationVisible: ts.notImplemented,
    isLateBound: (_node): _node is ts.LateBoundDeclaration => false,
    collectLinkedAliases: ts.notImplemented,
    isImplementationOfOverload: ts.notImplemented,
    isRequiredInitializedParameter: ts.notImplemented,
    isOptionalUninitializedParameterProperty: ts.notImplemented,
    isExpandoFunctionDeclaration: ts.notImplemented,
    getPropertiesOfContainerFunction: ts.notImplemented,
    createTypeOfDeclaration: ts.notImplemented,
    createReturnTypeOfSignatureDeclaration: ts.notImplemented,
    createTypeOfExpression: ts.notImplemented,
    createLiteralConstValue: ts.notImplemented,
    isSymbolAccessible: ts.notImplemented,
    isEntityNameVisible: ts.notImplemented,
    // Returns the constant value this property access resolves to: notImplemented, or 'undefined' for a non-constant
    getConstantValue: ts.notImplemented,
    getReferencedValueDeclaration: ts.notImplemented,
    getTypeReferenceSerializationKind: ts.notImplemented,
    isOptionalParameter: ts.notImplemented,
    moduleExportsSomeValue: ts.notImplemented,
    isArgumentsLocalBinding: ts.notImplemented,
    getExternalModuleFileFromDeclaration: ts.notImplemented,
    getTypeReferenceDirectivesForEntityName: ts.notImplemented,
    getTypeReferenceDirectivesForSymbol: ts.notImplemented,
    isLiteralConstDeclaration: ts.notImplemented,
    getJsxFactoryEntity: ts.notImplemented,
    getJsxFragmentFactoryEntity: ts.notImplemented,
    getAllAccessorDeclarations: ts.notImplemented,
    getSymbolOfExternalModuleSpecifier: ts.notImplemented,
    isBindingCapturedByNode: ts.notImplemented,
    getDeclarationStatementsForSourceFile: ts.notImplemented,
    isImportRequiredByAugmentation: ts.notImplemented,
};

/*@internal*/
/** File that isnt present resulting in error or output files */
export type EmitUsingBuildInfoResult = string | readonly ts.OutputFile[];

/*@internal*/
export interface EmitUsingBuildInfoHost extends ts.ModuleResolutionHost {
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
    createHash?(data: string): string;
    getBuildInfo?(fileName: string, configFilePath: string | undefined): ts.BuildInfo | undefined;
}

function createSourceFilesFromBundleBuildInfo(bundle: ts.BundleBuildInfo, buildInfoDirectory: string, host: EmitUsingBuildInfoHost): readonly ts.SourceFile[] {
    const jsBundle = ts.Debug.checkDefined(bundle.js);
    const prologueMap = jsBundle.sources?.prologues && ts.arrayToMap(jsBundle.sources.prologues, prologueInfo => prologueInfo.file);
    return bundle.sourceFiles.map((fileName, index) => {
        const prologueInfo = prologueMap?.get(index);
        const statements = prologueInfo?.directives.map(directive => {
            const literal = ts.setTextRange(ts.factory.createStringLiteral(directive.expression.text), directive.expression);
            const statement = ts.setTextRange(ts.factory.createExpressionStatement(literal), directive);
            ts.setParent(literal, statement);
            return statement;
        });
        const eofToken = ts.factory.createToken(ts.SyntaxKind.EndOfFileToken);
        const sourceFile = ts.factory.createSourceFile(statements ?? [], eofToken, ts.NodeFlags.None);
        sourceFile.fileName = ts.getRelativePathFromDirectory(
            host.getCurrentDirectory(),
            ts.getNormalizedAbsolutePath(fileName, buildInfoDirectory),
            !host.useCaseSensitiveFileNames()
        );
        sourceFile.text = prologueInfo?.text ?? "";
        ts.setTextRangePosWidth(sourceFile, 0, prologueInfo?.text.length ?? 0);
        ts.setEachParent(sourceFile.statements, sourceFile);
        ts.setTextRangePosWidth(eofToken, sourceFile.end, 0);
        ts.setParent(eofToken, sourceFile);
        return sourceFile;
    });
}

/*@internal*/
export function emitUsingBuildInfo(
    config: ts.ParsedCommandLine,
    host: EmitUsingBuildInfoHost,
    getCommandLine: (ref: ts.ProjectReference) => ts.ParsedCommandLine | undefined,
    customTransformers?: ts.CustomTransformers
): EmitUsingBuildInfoResult {
    const createHash = ts.maybeBind(host, host.createHash);
    const { buildInfoPath, jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath } = getOutputPathsForBundle(config.options, /*forceDtsPaths*/ false);
    let buildInfo: ts.BuildInfo | undefined;
    if (host.getBuildInfo) {
        // If host directly provides buildinfo we can get it directly. This allows host to cache the buildinfo
        buildInfo = host.getBuildInfo(buildInfoPath!, config.options.configFilePath);
    }
    else {
        const buildInfoText = host.readFile(buildInfoPath!);
        if (!buildInfoText) return buildInfoPath!;
        buildInfo = getBuildInfo(buildInfoPath!, buildInfoText);
    }
    if (!buildInfo) return buildInfoPath!;
    if (!buildInfo.bundle || !buildInfo.bundle.js || (declarationFilePath && !buildInfo.bundle.dts)) return buildInfoPath!;

    const jsFileText = host.readFile(ts.Debug.checkDefined(jsFilePath));
    if (!jsFileText) return jsFilePath!;
    // If the jsFileText is not same has what it was created with, tsbuildinfo is stale so dont use it
    if (ts.computeSignature(jsFileText, createHash) !== buildInfo.bundle.js.hash) return jsFilePath!;
    const sourceMapText = sourceMapFilePath && host.readFile(sourceMapFilePath);
    // error if no source map or for now if inline sourcemap
    if ((sourceMapFilePath && !sourceMapText) || config.options.inlineSourceMap) return sourceMapFilePath || "inline sourcemap decoding";
    if (sourceMapFilePath && ts.computeSignature(sourceMapText!, createHash) !== buildInfo.bundle.js.mapHash) return sourceMapFilePath;

    // read declaration text
    const declarationText = declarationFilePath && host.readFile(declarationFilePath);
    if (declarationFilePath && !declarationText) return declarationFilePath;
    if (declarationFilePath && ts.computeSignature(declarationText!, createHash) !== buildInfo.bundle.dts!.hash) return declarationFilePath;
    const declarationMapText = declarationMapPath && host.readFile(declarationMapPath);
    // error if no source map or for now if inline sourcemap
    if ((declarationMapPath && !declarationMapText) || config.options.inlineSourceMap) return declarationMapPath || "inline sourcemap decoding";
    if (declarationMapPath && ts.computeSignature(declarationMapText!, createHash) !== buildInfo.bundle.dts!.mapHash) return declarationMapPath;

    const buildInfoDirectory = ts.getDirectoryPath(ts.getNormalizedAbsolutePath(buildInfoPath!, host.getCurrentDirectory()));
    const ownPrependInput = ts.createInputFiles(
        jsFileText,
        declarationText!,
        sourceMapFilePath,
        sourceMapText,
        declarationMapPath,
        declarationMapText,
        jsFilePath,
        declarationFilePath,
        buildInfoPath,
        buildInfo,
        /*onlyOwnText*/ true
    );
    const outputFiles: ts.OutputFile[] = [];
    const prependNodes = ts.createPrependNodes(config.projectReferences, getCommandLine, f => host.readFile(f));
    const sourceFilesForJsEmit = createSourceFilesFromBundleBuildInfo(buildInfo.bundle, buildInfoDirectory, host);
    let changedDtsText: string | undefined;
    let changedDtsData: ts.WriteFileCallbackData | undefined;
    const emitHost: ts.EmitHost = {
        getPrependNodes: ts.memoize(() => [...prependNodes, ownPrependInput]),
        getCanonicalFileName: host.getCanonicalFileName,
        getCommonSourceDirectory: () => ts.getNormalizedAbsolutePath(buildInfo!.bundle!.commonSourceDirectory, buildInfoDirectory),
        getCompilerOptions: () => config.options,
        getCurrentDirectory: () => host.getCurrentDirectory(),
        getNewLine: () => host.getNewLine(),
        getSourceFile: ts.returnUndefined,
        getSourceFileByPath: ts.returnUndefined,
        getSourceFiles: () => sourceFilesForJsEmit,
        getLibFileFromReference: ts.notImplemented,
        isSourceFileFromExternalLibrary: ts.returnFalse,
        getResolvedProjectReferenceToRedirect: ts.returnUndefined,
        getProjectReferenceRedirect: ts.returnUndefined,
        isSourceOfProjectReferenceRedirect: ts.returnFalse,
        writeFile: (name, text, writeByteOrderMark, _onError, _sourceFiles, data) => {
            switch (name) {
                case jsFilePath:
                    if (jsFileText === text) return;
                    break;
                case sourceMapFilePath:
                    if (sourceMapText === text) return;
                    break;
                case buildInfoPath:
                    const newBuildInfo = data!.buildInfo!;
                    newBuildInfo.program = buildInfo!.program;
                    if (newBuildInfo.program && changedDtsText !== undefined && config.options.composite) {
                        // Update the output signature
                        (newBuildInfo.program as ts.ProgramBundleEmitBuildInfo).outSignature = ts.computeSignature(changedDtsText, createHash, changedDtsData);
                    }
                    // Update sourceFileInfo
                    const { js, dts, sourceFiles } = buildInfo!.bundle!;
                    newBuildInfo.bundle!.js!.sources = js!.sources;
                    if (dts) {
                        newBuildInfo.bundle!.dts!.sources = dts.sources;
                    }
                    newBuildInfo.bundle!.sourceFiles = sourceFiles;
                    outputFiles.push({ name, text: getBuildInfoText(newBuildInfo), writeByteOrderMark, buildInfo: newBuildInfo });
                    return;
                case declarationFilePath:
                    if (declarationText === text) return;
                    changedDtsText = text;
                    changedDtsData = data;
                    break;
                case declarationMapPath:
                    if (declarationMapText === text) return;
                    break;
                default:
                    ts.Debug.fail(`Unexpected path: ${name}`);
            }
            outputFiles.push({ name, text, writeByteOrderMark });
        },
        isEmitBlocked: ts.returnFalse,
        readFile: f => host.readFile(f),
        fileExists: f => host.fileExists(f),
        useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames(),
        getProgramBuildInfo: ts.returnUndefined,
        getSourceFileFromReference: ts.returnUndefined,
        redirectTargetsMap: ts.createMultiMap(),
        getFileIncludeReasons: ts.notImplemented,
        createHash,
    };
    emitFiles(
        notImplementedResolver,
        emitHost,
        /*targetSourceFile*/ undefined,
        ts.getTransformers(config.options, customTransformers)
    );
    return outputFiles;
}

const enum PipelinePhase {
    Notification,
    Substitution,
    Comments,
    SourceMaps,
    Emit,
}

export function createPrinter(printerOptions: ts.PrinterOptions = {}, handlers: ts.PrintHandlers = {}): ts.Printer {
    const {
        hasGlobalName,
        onEmitNode = ts.noEmitNotification,
        isEmitNotificationEnabled,
        substituteNode = ts.noEmitSubstitution,
        onBeforeEmitNode,
        onAfterEmitNode,
        onBeforeEmitNodeArray,
        onAfterEmitNodeArray,
        onBeforeEmitToken,
        onAfterEmitToken
    } = handlers;

    const extendedDiagnostics = !!printerOptions.extendedDiagnostics;
    const newLine = ts.getNewLineCharacter(printerOptions);
    const moduleKind = ts.getEmitModuleKind(printerOptions);
    const bundledHelpers = new ts.Map<string, boolean>();

    let currentSourceFile: ts.SourceFile | undefined;
    let nodeIdToGeneratedName: string[]; // Map of generated names for specific nodes.
    let autoGeneratedIdToGeneratedName: string[]; // Map of generated names for temp and loop variables.
    let generatedNames: ts.Set<string>; // Set of names generated by the NameGenerator.
    let formattedNameTempFlagsStack: (ts.ESMap<string, TempFlags> | undefined)[];
    let formattedNameTempFlags: ts.ESMap<string, TempFlags> | undefined;
    let privateNameTempFlagsStack: TempFlags[]; // Stack of enclosing name generation scopes.
    let privateNameTempFlags: TempFlags; // TempFlags for the current name generation scope.
    let tempFlagsStack: TempFlags[]; // Stack of enclosing name generation scopes.
    let tempFlags: TempFlags; // TempFlags for the current name generation scope.
    let reservedNamesStack: ts.Set<string>[]; // Stack of TempFlags reserved in enclosing name generation scopes.
    let reservedNames: ts.Set<string>; // TempFlags to reserve in nested name generation scopes.
    let preserveSourceNewlines = printerOptions.preserveSourceNewlines; // Can be overridden inside nodes with the `IgnoreSourceNewlines` emit flag.
    let nextListElementPos: number | undefined; // See comment in `getLeadingLineTerminatorCount`.

    let writer: ts.EmitTextWriter;
    let ownWriter: ts.EmitTextWriter; // Reusable `EmitTextWriter` for basic printing.
    let write = writeBase;
    let isOwnFileEmit: boolean;
    const bundleFileInfo = printerOptions.writeBundleFileInfo ? { sections: [] } as ts.BundleFileInfo : undefined;
    const relativeToBuildInfo = bundleFileInfo ? ts.Debug.checkDefined(printerOptions.relativeToBuildInfo) : undefined;
    const recordInternalSection = printerOptions.recordInternalSection;
    let sourceFileTextPos = 0;
    let sourceFileTextKind: ts.BundleFileTextLikeKind = ts.BundleFileSectionKind.Text;

    // Source Maps
    let sourceMapsDisabled = true;
    let sourceMapGenerator: ts.SourceMapGenerator | undefined;
    let sourceMapSource: ts.SourceMapSource;
    let sourceMapSourceIndex = -1;
    let mostRecentlyAddedSourceMapSource: ts.SourceMapSource;
    let mostRecentlyAddedSourceMapSourceIndex = -1;

    // Comments
    let containerPos = -1;
    let containerEnd = -1;
    let declarationListContainerEnd = -1;
    let currentLineMap: readonly number[] | undefined;
    let detachedCommentsInfo: { nodePos: number, detachedCommentEndPos: number }[] | undefined;
    let hasWrittenComment = false;
    let commentsDisabled = !!printerOptions.removeComments;
    let lastSubstitution: ts.Node | undefined;
    let currentParenthesizerRule: ((node: ts.Node) => ts.Node) | undefined;
    const { enter: enterComment, exit: exitComment } = ts.performance.createTimerIf(extendedDiagnostics, "commentTime", "beforeComment", "afterComment");
    const parenthesizer = ts.factory.parenthesizer;
    const typeArgumentParenthesizerRuleSelector: OrdinalParentheizerRuleSelector<ts.Node> = {
        select: index => index === 0 ? parenthesizer.parenthesizeLeadingTypeArgument : undefined
    };
    const emitBinaryExpression = createEmitBinaryExpression();

    reset();
    return {
        // public API
        printNode,
        printList,
        printFile,
        printBundle,

        // internal API
        writeNode,
        writeList,
        writeFile,
        writeBundle,
        bundleFileInfo
    };

    function printNode(hint: ts.EmitHint, node: ts.Node, sourceFile: ts.SourceFile): string {
        switch (hint) {
            case ts.EmitHint.SourceFile:
                ts.Debug.assert(ts.isSourceFile(node), "Expected a SourceFile node.");
                break;
            case ts.EmitHint.IdentifierName:
                ts.Debug.assert(ts.isIdentifier(node), "Expected an Identifier node.");
                break;
            case ts.EmitHint.Expression:
                ts.Debug.assert(ts.isExpression(node), "Expected an Expression node.");
                break;
        }
        switch (node.kind) {
            case ts.SyntaxKind.SourceFile: return printFile(node as ts.SourceFile);
            case ts.SyntaxKind.Bundle: return printBundle(node as ts.Bundle);
            case ts.SyntaxKind.UnparsedSource: return printUnparsedSource(node as ts.UnparsedSource);
        }
        writeNode(hint, node, sourceFile, beginPrint());
        return endPrint();
    }

    function printList<T extends ts.Node>(format: ts.ListFormat, nodes: ts.NodeArray<T>, sourceFile: ts.SourceFile) {
        writeList(format, nodes, sourceFile, beginPrint());
        return endPrint();
    }

    function printBundle(bundle: ts.Bundle): string {
        writeBundle(bundle, beginPrint(), /*sourceMapEmitter*/ undefined);
        return endPrint();
    }

    function printFile(sourceFile: ts.SourceFile): string {
        writeFile(sourceFile, beginPrint(), /*sourceMapEmitter*/ undefined);
        return endPrint();
    }

    function printUnparsedSource(unparsed: ts.UnparsedSource): string {
        writeUnparsedSource(unparsed, beginPrint());
        return endPrint();
    }

    /**
     * If `sourceFile` is `undefined`, `node` must be a synthesized `TypeNode`.
     */
    function writeNode(hint: ts.EmitHint, node: ts.TypeNode, sourceFile: undefined, output: ts.EmitTextWriter): void;
    function writeNode(hint: ts.EmitHint, node: ts.Node, sourceFile: ts.SourceFile, output: ts.EmitTextWriter): void;
    function writeNode(hint: ts.EmitHint, node: ts.Node, sourceFile: ts.SourceFile | undefined, output: ts.EmitTextWriter) {
        const previousWriter = writer;
        setWriter(output, /*_sourceMapGenerator*/ undefined);
        print(hint, node, sourceFile);
        reset();
        writer = previousWriter;
    }

    function writeList<T extends ts.Node>(format: ts.ListFormat, nodes: ts.NodeArray<T>, sourceFile: ts.SourceFile | undefined, output: ts.EmitTextWriter) {
        const previousWriter = writer;
        setWriter(output, /*_sourceMapGenerator*/ undefined);
        if (sourceFile) {
            setSourceFile(sourceFile);
        }
        emitList(/*parentNode*/ undefined, nodes, format);
        reset();
        writer = previousWriter;
    }

    function getTextPosWithWriteLine() {
        return writer.getTextPosWithWriteLine ? writer.getTextPosWithWriteLine() : writer.getTextPos();
    }

    function updateOrPushBundleFileTextLike(pos: number, end: number, kind: ts.BundleFileTextLikeKind) {
        const last = ts.lastOrUndefined(bundleFileInfo!.sections);
        if (last && last.kind === kind) {
            last.end = end;
        }
        else {
            bundleFileInfo!.sections.push({ pos, end, kind });
        }
    }

    function recordBundleFileInternalSectionStart(node: ts.Node) {
        if (recordInternalSection &&
            bundleFileInfo &&
            currentSourceFile &&
            (ts.isDeclaration(node) || ts.isVariableStatement(node)) &&
            ts.isInternalDeclaration(node, currentSourceFile) &&
            sourceFileTextKind !== ts.BundleFileSectionKind.Internal) {
            const prevSourceFileTextKind = sourceFileTextKind;
            recordBundleFileTextLikeSection(writer.getTextPos());
            sourceFileTextPos = getTextPosWithWriteLine();
            sourceFileTextKind = ts.BundleFileSectionKind.Internal;
            return prevSourceFileTextKind;
        }
        return undefined;
    }

    function recordBundleFileInternalSectionEnd(prevSourceFileTextKind: ReturnType<typeof recordBundleFileInternalSectionStart>) {
        if (prevSourceFileTextKind) {
            recordBundleFileTextLikeSection(writer.getTextPos());
            sourceFileTextPos = getTextPosWithWriteLine();
            sourceFileTextKind = prevSourceFileTextKind;
        }
    }

    function recordBundleFileTextLikeSection(end: number) {
        if (sourceFileTextPos < end) {
            updateOrPushBundleFileTextLike(sourceFileTextPos, end, sourceFileTextKind);
            return true;
        }
        return false;
    }

    function writeBundle(bundle: ts.Bundle, output: ts.EmitTextWriter, sourceMapGenerator: ts.SourceMapGenerator | undefined) {
        isOwnFileEmit = false;
        const previousWriter = writer;
        setWriter(output, sourceMapGenerator);
        emitShebangIfNeeded(bundle);
        emitPrologueDirectivesIfNeeded(bundle);
        emitHelpers(bundle);
        emitSyntheticTripleSlashReferencesIfNeeded(bundle);

        for (const prepend of bundle.prepends) {
            writeLine();
            const pos = writer.getTextPos();
            const savedSections = bundleFileInfo && bundleFileInfo.sections;
            if (savedSections) bundleFileInfo.sections = [];
            print(ts.EmitHint.Unspecified, prepend, /*sourceFile*/ undefined);
            if (bundleFileInfo) {
                const newSections = bundleFileInfo.sections;
                bundleFileInfo.sections = savedSections!;
                if (prepend.oldFileOfCurrentEmit) bundleFileInfo.sections.push(...newSections);
                else {
                    newSections.forEach(section => ts.Debug.assert(ts.isBundleFileTextLike(section)));
                    bundleFileInfo.sections.push({
                        pos,
                        end: writer.getTextPos(),
                        kind: ts.BundleFileSectionKind.Prepend,
                        data: relativeToBuildInfo!((prepend as ts.UnparsedSource).fileName),
                        texts: newSections as ts.BundleFileTextLike[]
                    });
                }
            }
        }

        sourceFileTextPos = getTextPosWithWriteLine();
        for (const sourceFile of bundle.sourceFiles) {
            print(ts.EmitHint.SourceFile, sourceFile, sourceFile);
        }
        if (bundleFileInfo && bundle.sourceFiles.length) {
            const end = writer.getTextPos();
            if (recordBundleFileTextLikeSection(end)) {
                // Store prologues
                const prologues = getPrologueDirectivesFromBundledSourceFiles(bundle);
                if (prologues) {
                    if (!bundleFileInfo.sources) bundleFileInfo.sources = {};
                    bundleFileInfo.sources.prologues = prologues;
                }

                // Store helpes
                const helpers = getHelpersFromBundledSourceFiles(bundle);
                if (helpers) {
                    if (!bundleFileInfo.sources) bundleFileInfo.sources = {};
                    bundleFileInfo.sources.helpers = helpers;
                }
            }
        }

        reset();
        writer = previousWriter;
    }

    function writeUnparsedSource(unparsed: ts.UnparsedSource, output: ts.EmitTextWriter) {
        const previousWriter = writer;
        setWriter(output, /*_sourceMapGenerator*/ undefined);
        print(ts.EmitHint.Unspecified, unparsed, /*sourceFile*/ undefined);
        reset();
        writer = previousWriter;
    }

    function writeFile(sourceFile: ts.SourceFile, output: ts.EmitTextWriter, sourceMapGenerator: ts.SourceMapGenerator | undefined) {
        isOwnFileEmit = true;
        const previousWriter = writer;
        setWriter(output, sourceMapGenerator);
        emitShebangIfNeeded(sourceFile);
        emitPrologueDirectivesIfNeeded(sourceFile);
        print(ts.EmitHint.SourceFile, sourceFile, sourceFile);
        reset();
        writer = previousWriter;
    }

    function beginPrint() {
        return ownWriter || (ownWriter = ts.createTextWriter(newLine));
    }

    function endPrint() {
        const text = ownWriter.getText();
        ownWriter.clear();
        return text;
    }

    function print(hint: ts.EmitHint, node: ts.Node, sourceFile: ts.SourceFile | undefined) {
        if (sourceFile) {
            setSourceFile(sourceFile);
        }

        pipelineEmit(hint, node, /*parenthesizerRule*/ undefined);
    }

    function setSourceFile(sourceFile: ts.SourceFile | undefined) {
        currentSourceFile = sourceFile;
        currentLineMap = undefined;
        detachedCommentsInfo = undefined;
        if (sourceFile) {
            setSourceMapSource(sourceFile);
        }
    }

    function setWriter(_writer: ts.EmitTextWriter | undefined, _sourceMapGenerator: ts.SourceMapGenerator | undefined) {
        if (_writer && printerOptions.omitTrailingSemicolon) {
            _writer = ts.getTrailingSemicolonDeferringWriter(_writer);
        }

        writer = _writer!; // TODO: GH#18217
        sourceMapGenerator = _sourceMapGenerator;
        sourceMapsDisabled = !writer || !sourceMapGenerator;
    }

    function reset() {
        nodeIdToGeneratedName = [];
        autoGeneratedIdToGeneratedName = [];
        generatedNames = new ts.Set();
        formattedNameTempFlagsStack = [];
        formattedNameTempFlags = new ts.Map();
        privateNameTempFlagsStack = [];
        privateNameTempFlags = TempFlags.Auto;
        tempFlagsStack = [];
        tempFlags = TempFlags.Auto;
        reservedNamesStack = [];
        currentSourceFile = undefined;
        currentLineMap = undefined;
        detachedCommentsInfo = undefined;
        setWriter(/*output*/ undefined, /*_sourceMapGenerator*/ undefined);
    }

    function getCurrentLineMap() {
        return currentLineMap || (currentLineMap = ts.getLineStarts(ts.Debug.checkDefined(currentSourceFile)));
    }

    function emit(node: ts.Node, parenthesizerRule?: (node: ts.Node) => ts.Node): void;
    function emit(node: ts.Node | undefined, parenthesizerRule?: (node: ts.Node) => ts.Node): void;
    function emit(node: ts.Node | undefined, parenthesizerRule?: (node: ts.Node) => ts.Node) {
        if (node === undefined) return;
        const prevSourceFileTextKind = recordBundleFileInternalSectionStart(node);
        pipelineEmit(ts.EmitHint.Unspecified, node, parenthesizerRule);
        recordBundleFileInternalSectionEnd(prevSourceFileTextKind);
    }

    function emitIdentifierName(node: ts.Identifier): void;
    function emitIdentifierName(node: ts.Identifier | undefined): void;
    function emitIdentifierName(node: ts.Identifier | undefined) {
        if (node === undefined) return;
        pipelineEmit(ts.EmitHint.IdentifierName, node, /*parenthesizerRule*/ undefined);
    }

    function emitExpression(node: ts.Expression, parenthesizerRule?: (node: ts.Expression) => ts.Expression): void;
    function emitExpression(node: ts.Expression | undefined, parenthesizerRule?: (node: ts.Expression) => ts.Expression): void;
    function emitExpression(node: ts.Expression | undefined, parenthesizerRule?: (node: ts.Expression) => ts.Expression) {
        if (node === undefined) return;
        pipelineEmit(ts.EmitHint.Expression, node, parenthesizerRule);
    }

    function emitJsxAttributeValue(node: ts.StringLiteral | ts.JsxExpression): void {
        pipelineEmit(ts.isStringLiteral(node) ? ts.EmitHint.JsxAttributeValue : ts.EmitHint.Unspecified, node);
    }

    function beforeEmitNode(node: ts.Node) {
        if (preserveSourceNewlines && (ts.getEmitFlags(node) & ts.EmitFlags.IgnoreSourceNewlines)) {
            preserveSourceNewlines = false;
        }
    }

    function afterEmitNode(savedPreserveSourceNewlines: boolean | undefined) {
        preserveSourceNewlines = savedPreserveSourceNewlines;
    }

    function pipelineEmit(emitHint: ts.EmitHint, node: ts.Node, parenthesizerRule?: (node: ts.Node) => ts.Node) {
        currentParenthesizerRule = parenthesizerRule;
        const pipelinePhase = getPipelinePhase(PipelinePhase.Notification, emitHint, node);
        pipelinePhase(emitHint, node);
        currentParenthesizerRule = undefined;
    }

    function shouldEmitComments(node: ts.Node) {
        return !commentsDisabled && !ts.isSourceFile(node);
    }

    function shouldEmitSourceMaps(node: ts.Node) {
        return !sourceMapsDisabled &&
            !ts.isSourceFile(node) &&
            !ts.isInJsonFile(node) &&
            !ts.isUnparsedSource(node) &&
            !ts.isUnparsedPrepend(node);
    }

    function getPipelinePhase(phase: PipelinePhase, emitHint: ts.EmitHint, node: ts.Node) {
        switch (phase) {
            case PipelinePhase.Notification:
                if (onEmitNode !== ts.noEmitNotification && (!isEmitNotificationEnabled || isEmitNotificationEnabled(node))) {
                    return pipelineEmitWithNotification;
                }
                // falls through
            case PipelinePhase.Substitution:
                if (substituteNode !== ts.noEmitSubstitution && (lastSubstitution = substituteNode(emitHint, node) || node) !== node) {
                    if (currentParenthesizerRule) {
                        lastSubstitution = currentParenthesizerRule(lastSubstitution);
                    }
                    return pipelineEmitWithSubstitution;
                }
                // falls through
            case PipelinePhase.Comments:
                if (shouldEmitComments(node)) {
                    return pipelineEmitWithComments;
                }
                // falls through
            case PipelinePhase.SourceMaps:
                if (shouldEmitSourceMaps(node)) {
                    return pipelineEmitWithSourceMaps;
                }
                // falls through
            case PipelinePhase.Emit:
                return pipelineEmitWithHint;
            default:
                return ts.Debug.assertNever(phase);
        }
    }

    function getNextPipelinePhase(currentPhase: PipelinePhase, emitHint: ts.EmitHint, node: ts.Node) {
        return getPipelinePhase(currentPhase + 1, emitHint, node);
    }

    function pipelineEmitWithNotification(hint: ts.EmitHint, node: ts.Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.Notification, hint, node);
        onEmitNode(hint, node, pipelinePhase);
    }

    function pipelineEmitWithHint(hint: ts.EmitHint, node: ts.Node): void {
        onBeforeEmitNode?.(node);
        if (preserveSourceNewlines) {
            const savedPreserveSourceNewlines = preserveSourceNewlines;
            beforeEmitNode(node);
            pipelineEmitWithHintWorker(hint, node);
            afterEmitNode(savedPreserveSourceNewlines);
        }
        else {
            pipelineEmitWithHintWorker(hint, node);
        }
        onAfterEmitNode?.(node);
        // clear the parenthesizer rule as we ascend
        currentParenthesizerRule = undefined;
    }

    function pipelineEmitWithHintWorker(hint: ts.EmitHint, node: ts.Node, allowSnippets = true): void {
        if (allowSnippets) {
            const snippet = ts.getSnippetElement(node);
            if (snippet) {
                return emitSnippetNode(hint, node, snippet);
            }
        }
        if (hint === ts.EmitHint.SourceFile) return emitSourceFile(ts.cast(node, ts.isSourceFile));
        if (hint === ts.EmitHint.IdentifierName) return emitIdentifier(ts.cast(node, ts.isIdentifier));
        if (hint === ts.EmitHint.JsxAttributeValue) return emitLiteral(ts.cast(node, ts.isStringLiteral), /*jsxAttributeEscape*/ true);
        if (hint === ts.EmitHint.MappedTypeParameter) return emitMappedTypeParameter(ts.cast(node, ts.isTypeParameterDeclaration));
        if (hint === ts.EmitHint.EmbeddedStatement) {
            ts.Debug.assertNode(node, ts.isEmptyStatement);
            return emitEmptyStatement(/*isEmbeddedStatement*/ true);
        }
        if (hint === ts.EmitHint.Unspecified) {
            switch (node.kind) {
                // Pseudo-literals
                case ts.SyntaxKind.TemplateHead:
                case ts.SyntaxKind.TemplateMiddle:
                case ts.SyntaxKind.TemplateTail:
                    return emitLiteral(node as ts.LiteralExpression, /*jsxAttributeEscape*/ false);

                // Identifiers
                case ts.SyntaxKind.Identifier:
                    return emitIdentifier(node as ts.Identifier);

                // PrivateIdentifiers
                case ts.SyntaxKind.PrivateIdentifier:
                    return emitPrivateIdentifier(node as ts.PrivateIdentifier);

                // Parse tree nodes
                // Names
                case ts.SyntaxKind.QualifiedName:
                    return emitQualifiedName(node as ts.QualifiedName);
                case ts.SyntaxKind.ComputedPropertyName:
                    return emitComputedPropertyName(node as ts.ComputedPropertyName);

                // Signature elements
                case ts.SyntaxKind.TypeParameter:
                    return emitTypeParameter(node as ts.TypeParameterDeclaration);
                case ts.SyntaxKind.Parameter:
                    return emitParameter(node as ts.ParameterDeclaration);
                case ts.SyntaxKind.Decorator:
                    return emitDecorator(node as ts.Decorator);

                // Type members
                case ts.SyntaxKind.PropertySignature:
                    return emitPropertySignature(node as ts.PropertySignature);
                case ts.SyntaxKind.PropertyDeclaration:
                    return emitPropertyDeclaration(node as ts.PropertyDeclaration);
                case ts.SyntaxKind.MethodSignature:
                    return emitMethodSignature(node as ts.MethodSignature);
                case ts.SyntaxKind.MethodDeclaration:
                    return emitMethodDeclaration(node as ts.MethodDeclaration);
                case ts.SyntaxKind.ClassStaticBlockDeclaration:
                    return emitClassStaticBlockDeclaration(node as ts.ClassStaticBlockDeclaration);
                case ts.SyntaxKind.Constructor:
                    return emitConstructor(node as ts.ConstructorDeclaration);
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                    return emitAccessorDeclaration(node as ts.AccessorDeclaration);
                case ts.SyntaxKind.CallSignature:
                    return emitCallSignature(node as ts.CallSignatureDeclaration);
                case ts.SyntaxKind.ConstructSignature:
                    return emitConstructSignature(node as ts.ConstructSignatureDeclaration);
                case ts.SyntaxKind.IndexSignature:
                    return emitIndexSignature(node as ts.IndexSignatureDeclaration);

                // Types
                case ts.SyntaxKind.TypePredicate:
                    return emitTypePredicate(node as ts.TypePredicateNode);
                case ts.SyntaxKind.TypeReference:
                    return emitTypeReference(node as ts.TypeReferenceNode);
                case ts.SyntaxKind.FunctionType:
                    return emitFunctionType(node as ts.FunctionTypeNode);
                case ts.SyntaxKind.ConstructorType:
                    return emitConstructorType(node as ts.ConstructorTypeNode);
                case ts.SyntaxKind.TypeQuery:
                    return emitTypeQuery(node as ts.TypeQueryNode);
                case ts.SyntaxKind.TypeLiteral:
                    return emitTypeLiteral(node as ts.TypeLiteralNode);
                case ts.SyntaxKind.ArrayType:
                    return emitArrayType(node as ts.ArrayTypeNode);
                case ts.SyntaxKind.TupleType:
                    return emitTupleType(node as ts.TupleTypeNode);
                case ts.SyntaxKind.OptionalType:
                    return emitOptionalType(node as ts.OptionalTypeNode);
                // SyntaxKind.RestType is handled below
                case ts.SyntaxKind.UnionType:
                    return emitUnionType(node as ts.UnionTypeNode);
                case ts.SyntaxKind.IntersectionType:
                    return emitIntersectionType(node as ts.IntersectionTypeNode);
                case ts.SyntaxKind.ConditionalType:
                    return emitConditionalType(node as ts.ConditionalTypeNode);
                case ts.SyntaxKind.InferType:
                    return emitInferType(node as ts.InferTypeNode);
                case ts.SyntaxKind.ParenthesizedType:
                    return emitParenthesizedType(node as ts.ParenthesizedTypeNode);
                case ts.SyntaxKind.ExpressionWithTypeArguments:
                    return emitExpressionWithTypeArguments(node as ts.ExpressionWithTypeArguments);
                case ts.SyntaxKind.ThisType:
                    return emitThisType();
                case ts.SyntaxKind.TypeOperator:
                    return emitTypeOperator(node as ts.TypeOperatorNode);
                case ts.SyntaxKind.IndexedAccessType:
                    return emitIndexedAccessType(node as ts.IndexedAccessTypeNode);
                case ts.SyntaxKind.MappedType:
                    return emitMappedType(node as ts.MappedTypeNode);
                case ts.SyntaxKind.LiteralType:
                    return emitLiteralType(node as ts.LiteralTypeNode);
                case ts.SyntaxKind.NamedTupleMember:
                    return emitNamedTupleMember(node as ts.NamedTupleMember);
                case ts.SyntaxKind.TemplateLiteralType:
                    return emitTemplateType(node as ts.TemplateLiteralTypeNode);
                case ts.SyntaxKind.TemplateLiteralTypeSpan:
                    return emitTemplateTypeSpan(node as ts.TemplateLiteralTypeSpan);
                case ts.SyntaxKind.ImportType:
                    return emitImportTypeNode(node as ts.ImportTypeNode);

                // Binding patterns
                case ts.SyntaxKind.ObjectBindingPattern:
                    return emitObjectBindingPattern(node as ts.ObjectBindingPattern);
                case ts.SyntaxKind.ArrayBindingPattern:
                    return emitArrayBindingPattern(node as ts.ArrayBindingPattern);
                case ts.SyntaxKind.BindingElement:
                    return emitBindingElement(node as ts.BindingElement);

                // Misc
                case ts.SyntaxKind.TemplateSpan:
                    return emitTemplateSpan(node as ts.TemplateSpan);
                case ts.SyntaxKind.SemicolonClassElement:
                    return emitSemicolonClassElement();

                // Statements
                case ts.SyntaxKind.Block:
                    return emitBlock(node as ts.Block);
                case ts.SyntaxKind.VariableStatement:
                    return emitVariableStatement(node as ts.VariableStatement);
                case ts.SyntaxKind.EmptyStatement:
                    return emitEmptyStatement(/*isEmbeddedStatement*/ false);
                case ts.SyntaxKind.ExpressionStatement:
                    return emitExpressionStatement(node as ts.ExpressionStatement);
                case ts.SyntaxKind.IfStatement:
                    return emitIfStatement(node as ts.IfStatement);
                case ts.SyntaxKind.DoStatement:
                    return emitDoStatement(node as ts.DoStatement);
                case ts.SyntaxKind.WhileStatement:
                    return emitWhileStatement(node as ts.WhileStatement);
                case ts.SyntaxKind.ForStatement:
                    return emitForStatement(node as ts.ForStatement);
                case ts.SyntaxKind.ForInStatement:
                    return emitForInStatement(node as ts.ForInStatement);
                case ts.SyntaxKind.ForOfStatement:
                    return emitForOfStatement(node as ts.ForOfStatement);
                case ts.SyntaxKind.ContinueStatement:
                    return emitContinueStatement(node as ts.ContinueStatement);
                case ts.SyntaxKind.BreakStatement:
                    return emitBreakStatement(node as ts.BreakStatement);
                case ts.SyntaxKind.ReturnStatement:
                    return emitReturnStatement(node as ts.ReturnStatement);
                case ts.SyntaxKind.WithStatement:
                    return emitWithStatement(node as ts.WithStatement);
                case ts.SyntaxKind.SwitchStatement:
                    return emitSwitchStatement(node as ts.SwitchStatement);
                case ts.SyntaxKind.LabeledStatement:
                    return emitLabeledStatement(node as ts.LabeledStatement);
                case ts.SyntaxKind.ThrowStatement:
                    return emitThrowStatement(node as ts.ThrowStatement);
                case ts.SyntaxKind.TryStatement:
                    return emitTryStatement(node as ts.TryStatement);
                case ts.SyntaxKind.DebuggerStatement:
                    return emitDebuggerStatement(node as ts.DebuggerStatement);

                // Declarations
                case ts.SyntaxKind.VariableDeclaration:
                    return emitVariableDeclaration(node as ts.VariableDeclaration);
                case ts.SyntaxKind.VariableDeclarationList:
                    return emitVariableDeclarationList(node as ts.VariableDeclarationList);
                case ts.SyntaxKind.FunctionDeclaration:
                    return emitFunctionDeclaration(node as ts.FunctionDeclaration);
                case ts.SyntaxKind.ClassDeclaration:
                    return emitClassDeclaration(node as ts.ClassDeclaration);
                case ts.SyntaxKind.InterfaceDeclaration:
                    return emitInterfaceDeclaration(node as ts.InterfaceDeclaration);
                case ts.SyntaxKind.TypeAliasDeclaration:
                    return emitTypeAliasDeclaration(node as ts.TypeAliasDeclaration);
                case ts.SyntaxKind.EnumDeclaration:
                    return emitEnumDeclaration(node as ts.EnumDeclaration);
                case ts.SyntaxKind.ModuleDeclaration:
                    return emitModuleDeclaration(node as ts.ModuleDeclaration);
                case ts.SyntaxKind.ModuleBlock:
                    return emitModuleBlock(node as ts.ModuleBlock);
                case ts.SyntaxKind.CaseBlock:
                    return emitCaseBlock(node as ts.CaseBlock);
                case ts.SyntaxKind.NamespaceExportDeclaration:
                    return emitNamespaceExportDeclaration(node as ts.NamespaceExportDeclaration);
                case ts.SyntaxKind.ImportEqualsDeclaration:
                    return emitImportEqualsDeclaration(node as ts.ImportEqualsDeclaration);
                case ts.SyntaxKind.ImportDeclaration:
                    return emitImportDeclaration(node as ts.ImportDeclaration);
                case ts.SyntaxKind.ImportClause:
                    return emitImportClause(node as ts.ImportClause);
                case ts.SyntaxKind.NamespaceImport:
                    return emitNamespaceImport(node as ts.NamespaceImport);
                case ts.SyntaxKind.NamespaceExport:
                    return emitNamespaceExport(node as ts.NamespaceExport);
                case ts.SyntaxKind.NamedImports:
                    return emitNamedImports(node as ts.NamedImports);
                case ts.SyntaxKind.ImportSpecifier:
                    return emitImportSpecifier(node as ts.ImportSpecifier);
                case ts.SyntaxKind.ExportAssignment:
                    return emitExportAssignment(node as ts.ExportAssignment);
                case ts.SyntaxKind.ExportDeclaration:
                    return emitExportDeclaration(node as ts.ExportDeclaration);
                case ts.SyntaxKind.NamedExports:
                    return emitNamedExports(node as ts.NamedExports);
                case ts.SyntaxKind.ExportSpecifier:
                    return emitExportSpecifier(node as ts.ExportSpecifier);
                case ts.SyntaxKind.AssertClause:
                    return emitAssertClause(node as ts.AssertClause);
                case ts.SyntaxKind.AssertEntry:
                    return emitAssertEntry(node as ts.AssertEntry);
                case ts.SyntaxKind.MissingDeclaration:
                    return;

                // Module references
                case ts.SyntaxKind.ExternalModuleReference:
                    return emitExternalModuleReference(node as ts.ExternalModuleReference);

                // JSX (non-expression)
                case ts.SyntaxKind.JsxText:
                    return emitJsxText(node as ts.JsxText);
                case ts.SyntaxKind.JsxOpeningElement:
                case ts.SyntaxKind.JsxOpeningFragment:
                    return emitJsxOpeningElementOrFragment(node as ts.JsxOpeningElement);
                case ts.SyntaxKind.JsxClosingElement:
                case ts.SyntaxKind.JsxClosingFragment:
                    return emitJsxClosingElementOrFragment(node as ts.JsxClosingElement);
                case ts.SyntaxKind.JsxAttribute:
                    return emitJsxAttribute(node as ts.JsxAttribute);
                case ts.SyntaxKind.JsxAttributes:
                    return emitJsxAttributes(node as ts.JsxAttributes);
                case ts.SyntaxKind.JsxSpreadAttribute:
                    return emitJsxSpreadAttribute(node as ts.JsxSpreadAttribute);
                case ts.SyntaxKind.JsxExpression:
                    return emitJsxExpression(node as ts.JsxExpression);

                // Clauses
                case ts.SyntaxKind.CaseClause:
                    return emitCaseClause(node as ts.CaseClause);
                case ts.SyntaxKind.DefaultClause:
                    return emitDefaultClause(node as ts.DefaultClause);
                case ts.SyntaxKind.HeritageClause:
                    return emitHeritageClause(node as ts.HeritageClause);
                case ts.SyntaxKind.CatchClause:
                    return emitCatchClause(node as ts.CatchClause);

                // Property assignments
                case ts.SyntaxKind.PropertyAssignment:
                    return emitPropertyAssignment(node as ts.PropertyAssignment);
                case ts.SyntaxKind.ShorthandPropertyAssignment:
                    return emitShorthandPropertyAssignment(node as ts.ShorthandPropertyAssignment);
                case ts.SyntaxKind.SpreadAssignment:
                    return emitSpreadAssignment(node as ts.SpreadAssignment);

                // Enum
                case ts.SyntaxKind.EnumMember:
                    return emitEnumMember(node as ts.EnumMember);

                // Unparsed
                case ts.SyntaxKind.UnparsedPrologue:
                    return writeUnparsedNode(node as ts.UnparsedNode);
                case ts.SyntaxKind.UnparsedSource:
                case ts.SyntaxKind.UnparsedPrepend:
                    return emitUnparsedSourceOrPrepend(node as ts.UnparsedSource);
                case ts.SyntaxKind.UnparsedText:
                case ts.SyntaxKind.UnparsedInternalText:
                    return emitUnparsedTextLike(node as ts.UnparsedTextLike);
                case ts.SyntaxKind.UnparsedSyntheticReference:
                    return emitUnparsedSyntheticReference(node as ts.UnparsedSyntheticReference);

                // Top-level nodes
                case ts.SyntaxKind.SourceFile:
                    return emitSourceFile(node as ts.SourceFile);
                case ts.SyntaxKind.Bundle:
                    return ts.Debug.fail("Bundles should be printed using printBundle");
                // SyntaxKind.UnparsedSource (handled above)
                case ts.SyntaxKind.InputFiles:
                    return ts.Debug.fail("InputFiles should not be printed");

                // JSDoc nodes (only used in codefixes currently)
                case ts.SyntaxKind.JSDocTypeExpression:
                    return emitJSDocTypeExpression(node as ts.JSDocTypeExpression);
                case ts.SyntaxKind.JSDocNameReference:
                    return emitJSDocNameReference(node as ts.JSDocNameReference);
                case ts.SyntaxKind.JSDocAllType:
                    return writePunctuation("*");
                case ts.SyntaxKind.JSDocUnknownType:
                    return writePunctuation("?");
                case ts.SyntaxKind.JSDocNullableType:
                    return emitJSDocNullableType(node as ts.JSDocNullableType);
                case ts.SyntaxKind.JSDocNonNullableType:
                    return emitJSDocNonNullableType(node as ts.JSDocNonNullableType);
                case ts.SyntaxKind.JSDocOptionalType:
                    return emitJSDocOptionalType(node as ts.JSDocOptionalType);
                case ts.SyntaxKind.JSDocFunctionType:
                    return emitJSDocFunctionType(node as ts.JSDocFunctionType);
                case ts.SyntaxKind.RestType:
                case ts.SyntaxKind.JSDocVariadicType:
                    return emitRestOrJSDocVariadicType(node as ts.RestTypeNode | ts.JSDocVariadicType);
                case ts.SyntaxKind.JSDocNamepathType:
                    return;
                case ts.SyntaxKind.JSDoc:
                    return emitJSDoc(node as ts.JSDoc);
                case ts.SyntaxKind.JSDocTypeLiteral:
                    return emitJSDocTypeLiteral(node as ts.JSDocTypeLiteral);
                case ts.SyntaxKind.JSDocSignature:
                    return emitJSDocSignature(node as ts.JSDocSignature);
                case ts.SyntaxKind.JSDocTag:
                case ts.SyntaxKind.JSDocClassTag:
                case ts.SyntaxKind.JSDocOverrideTag:
                    return emitJSDocSimpleTag(node as ts.JSDocTag);
                case ts.SyntaxKind.JSDocAugmentsTag:
                case ts.SyntaxKind.JSDocImplementsTag:
                    return emitJSDocHeritageTag(node as ts.JSDocImplementsTag | ts.JSDocAugmentsTag);
                case ts.SyntaxKind.JSDocAuthorTag:
                case ts.SyntaxKind.JSDocDeprecatedTag:
                    return;
                // SyntaxKind.JSDocClassTag (see JSDocTag, above)
                case ts.SyntaxKind.JSDocPublicTag:
                case ts.SyntaxKind.JSDocPrivateTag:
                case ts.SyntaxKind.JSDocProtectedTag:
                case ts.SyntaxKind.JSDocReadonlyTag:
                    return;
                case ts.SyntaxKind.JSDocCallbackTag:
                    return emitJSDocCallbackTag(node as ts.JSDocCallbackTag);
                // SyntaxKind.JSDocEnumTag (see below)
                case ts.SyntaxKind.JSDocParameterTag:
                case ts.SyntaxKind.JSDocPropertyTag:
                    return emitJSDocPropertyLikeTag(node as ts.JSDocPropertyLikeTag);
                case ts.SyntaxKind.JSDocEnumTag:
                case ts.SyntaxKind.JSDocReturnTag:
                case ts.SyntaxKind.JSDocThisTag:
                case ts.SyntaxKind.JSDocTypeTag:
                    return emitJSDocSimpleTypedTag(node as ts.JSDocTypeTag);
                case ts.SyntaxKind.JSDocTemplateTag:
                    return emitJSDocTemplateTag(node as ts.JSDocTemplateTag);
                case ts.SyntaxKind.JSDocTypedefTag:
                    return emitJSDocTypedefTag(node as ts.JSDocTypedefTag);
                case ts.SyntaxKind.JSDocSeeTag:
                    return emitJSDocSeeTag(node as ts.JSDocSeeTag);
                // SyntaxKind.JSDocPropertyTag (see JSDocParameterTag, above)

                // Transformation nodes
                case ts.SyntaxKind.NotEmittedStatement:
                case ts.SyntaxKind.EndOfDeclarationMarker:
                case ts.SyntaxKind.MergeDeclarationMarker:
                    return;
            }
            if (ts.isExpression(node)) {
                hint = ts.EmitHint.Expression;
                if (substituteNode !== ts.noEmitSubstitution) {
                    const substitute = substituteNode(hint, node) || node;
                    if (substitute !== node) {
                        node = substitute;
                        if (currentParenthesizerRule) {
                            node = currentParenthesizerRule(node);
                        }
                    }
                }
            }
        }
        if (hint === ts.EmitHint.Expression) {
            switch (node.kind) {
                // Literals
                case ts.SyntaxKind.NumericLiteral:
                case ts.SyntaxKind.BigIntLiteral:
                    return emitNumericOrBigIntLiteral(node as ts.NumericLiteral | ts.BigIntLiteral);

                case ts.SyntaxKind.StringLiteral:
                case ts.SyntaxKind.RegularExpressionLiteral:
                case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                    return emitLiteral(node as ts.LiteralExpression, /*jsxAttributeEscape*/ false);

                // Identifiers
                case ts.SyntaxKind.Identifier:
                    return emitIdentifier(node as ts.Identifier);
                case ts.SyntaxKind.PrivateIdentifier:
                    return emitPrivateIdentifier(node as ts.PrivateIdentifier);

                // Expressions
                case ts.SyntaxKind.ArrayLiteralExpression:
                    return emitArrayLiteralExpression(node as ts.ArrayLiteralExpression);
                case ts.SyntaxKind.ObjectLiteralExpression:
                    return emitObjectLiteralExpression(node as ts.ObjectLiteralExpression);
                case ts.SyntaxKind.PropertyAccessExpression:
                    return emitPropertyAccessExpression(node as ts.PropertyAccessExpression);
                case ts.SyntaxKind.ElementAccessExpression:
                    return emitElementAccessExpression(node as ts.ElementAccessExpression);
                case ts.SyntaxKind.CallExpression:
                    return emitCallExpression(node as ts.CallExpression);
                case ts.SyntaxKind.NewExpression:
                    return emitNewExpression(node as ts.NewExpression);
                case ts.SyntaxKind.TaggedTemplateExpression:
                    return emitTaggedTemplateExpression(node as ts.TaggedTemplateExpression);
                case ts.SyntaxKind.TypeAssertionExpression:
                    return emitTypeAssertionExpression(node as ts.TypeAssertion);
                case ts.SyntaxKind.ParenthesizedExpression:
                    return emitParenthesizedExpression(node as ts.ParenthesizedExpression);
                case ts.SyntaxKind.FunctionExpression:
                    return emitFunctionExpression(node as ts.FunctionExpression);
                case ts.SyntaxKind.ArrowFunction:
                    return emitArrowFunction(node as ts.ArrowFunction);
                case ts.SyntaxKind.DeleteExpression:
                    return emitDeleteExpression(node as ts.DeleteExpression);
                case ts.SyntaxKind.TypeOfExpression:
                    return emitTypeOfExpression(node as ts.TypeOfExpression);
                case ts.SyntaxKind.VoidExpression:
                    return emitVoidExpression(node as ts.VoidExpression);
                case ts.SyntaxKind.AwaitExpression:
                    return emitAwaitExpression(node as ts.AwaitExpression);
                case ts.SyntaxKind.PrefixUnaryExpression:
                    return emitPrefixUnaryExpression(node as ts.PrefixUnaryExpression);
                case ts.SyntaxKind.PostfixUnaryExpression:
                    return emitPostfixUnaryExpression(node as ts.PostfixUnaryExpression);
                case ts.SyntaxKind.BinaryExpression:
                    return emitBinaryExpression(node as ts.BinaryExpression);
                case ts.SyntaxKind.ConditionalExpression:
                    return emitConditionalExpression(node as ts.ConditionalExpression);
                case ts.SyntaxKind.TemplateExpression:
                    return emitTemplateExpression(node as ts.TemplateExpression);
                case ts.SyntaxKind.YieldExpression:
                    return emitYieldExpression(node as ts.YieldExpression);
                case ts.SyntaxKind.SpreadElement:
                    return emitSpreadElement(node as ts.SpreadElement);
                case ts.SyntaxKind.ClassExpression:
                    return emitClassExpression(node as ts.ClassExpression);
                case ts.SyntaxKind.OmittedExpression:
                    return;
                case ts.SyntaxKind.AsExpression:
                    return emitAsExpression(node as ts.AsExpression);
                case ts.SyntaxKind.NonNullExpression:
                    return emitNonNullExpression(node as ts.NonNullExpression);
                case ts.SyntaxKind.ExpressionWithTypeArguments:
                    return emitExpressionWithTypeArguments(node as ts.ExpressionWithTypeArguments);
                case ts.SyntaxKind.SatisfiesExpression:
                    return emitSatisfiesExpression(node as ts.SatisfiesExpression);
                case ts.SyntaxKind.MetaProperty:
                    return emitMetaProperty(node as ts.MetaProperty);
                case ts.SyntaxKind.SyntheticExpression:
                    return ts.Debug.fail("SyntheticExpression should never be printed.");

                // JSX
                case ts.SyntaxKind.JsxElement:
                    return emitJsxElement(node as ts.JsxElement);
                case ts.SyntaxKind.JsxSelfClosingElement:
                    return emitJsxSelfClosingElement(node as ts.JsxSelfClosingElement);
                case ts.SyntaxKind.JsxFragment:
                    return emitJsxFragment(node as ts.JsxFragment);

                // Synthesized list
                case ts.SyntaxKind.SyntaxList:
                    return ts.Debug.fail("SyntaxList should not be printed");

                // Transformation nodes
                case ts.SyntaxKind.NotEmittedStatement:
                    return;
                case ts.SyntaxKind.PartiallyEmittedExpression:
                    return emitPartiallyEmittedExpression(node as ts.PartiallyEmittedExpression);
                case ts.SyntaxKind.CommaListExpression:
                    return emitCommaList(node as ts.CommaListExpression);
                case ts.SyntaxKind.MergeDeclarationMarker:
                case ts.SyntaxKind.EndOfDeclarationMarker:
                    return;
                case ts.SyntaxKind.SyntheticReferenceExpression:
                    return ts.Debug.fail("SyntheticReferenceExpression should not be printed");
            }
        }
        if (ts.isKeyword(node.kind)) return writeTokenNode(node, writeKeyword);
        if (ts.isTokenKind(node.kind)) return writeTokenNode(node, writePunctuation);
        ts.Debug.fail(`Unhandled SyntaxKind: ${ts.Debug.formatSyntaxKind(node.kind)}.`);
    }

    function emitMappedTypeParameter(node: ts.TypeParameterDeclaration): void {
        emit(node.name);
        writeSpace();
        writeKeyword("in");
        writeSpace();
        emit(node.constraint);
    }

    function pipelineEmitWithSubstitution(hint: ts.EmitHint, node: ts.Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.Substitution, hint, node);
        ts.Debug.assertIsDefined(lastSubstitution);
        node = lastSubstitution;
        lastSubstitution = undefined;
        pipelinePhase(hint, node);
    }

    function getHelpersFromBundledSourceFiles(bundle: ts.Bundle): string[] | undefined {
        let result: string[] | undefined;
        if (moduleKind === ts.ModuleKind.None || printerOptions.noEmitHelpers) {
            return undefined;
        }
        const bundledHelpers = new ts.Map<string, boolean>();
        for (const sourceFile of bundle.sourceFiles) {
            const shouldSkip = ts.getExternalHelpersModuleName(sourceFile) !== undefined;
            const helpers = getSortedEmitHelpers(sourceFile);
            if (!helpers) continue;
            for (const helper of helpers) {
                if (!helper.scoped && !shouldSkip && !bundledHelpers.get(helper.name)) {
                    bundledHelpers.set(helper.name, true);
                    (result || (result = [])).push(helper.name);
                }
            }
        }

        return result;
    }

    function emitHelpers(node: ts.Node) {
        let helpersEmitted = false;
        const bundle = node.kind === ts.SyntaxKind.Bundle ? node as ts.Bundle : undefined;
        if (bundle && moduleKind === ts.ModuleKind.None) {
            return;
        }
        const numPrepends = bundle ? bundle.prepends.length : 0;
        const numNodes = bundle ? bundle.sourceFiles.length + numPrepends : 1;
        for (let i = 0; i < numNodes; i++) {
            const currentNode = bundle ? i < numPrepends ? bundle.prepends[i] : bundle.sourceFiles[i - numPrepends] : node;
            const sourceFile = ts.isSourceFile(currentNode) ? currentNode : ts.isUnparsedSource(currentNode) ? undefined : currentSourceFile;
            const shouldSkip = printerOptions.noEmitHelpers || (!!sourceFile && ts.hasRecordedExternalHelpers(sourceFile));
            const shouldBundle = (ts.isSourceFile(currentNode) || ts.isUnparsedSource(currentNode)) && !isOwnFileEmit;
            const helpers = ts.isUnparsedSource(currentNode) ? currentNode.helpers : getSortedEmitHelpers(currentNode);
            if (helpers) {
                for (const helper of helpers) {
                    if (!helper.scoped) {
                        // Skip the helper if it can be skipped and the noEmitHelpers compiler
                        // option is set, or if it can be imported and the importHelpers compiler
                        // option is set.
                        if (shouldSkip) continue;

                        // Skip the helper if it can be bundled but hasn't already been emitted and we
                        // are emitting a bundled module.
                        if (shouldBundle) {
                            if (bundledHelpers.get(helper.name)) {
                                continue;
                            }

                            bundledHelpers.set(helper.name, true);
                        }
                    }
                    else if (bundle) {
                        // Skip the helper if it is scoped and we are emitting bundled helpers
                        continue;
                    }
                    const pos = getTextPosWithWriteLine();
                    if (typeof helper.text === "string") {
                        writeLines(helper.text);
                    }
                    else {
                        writeLines(helper.text(makeFileLevelOptimisticUniqueName));
                    }
                    if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: ts.BundleFileSectionKind.EmitHelpers, data: helper.name });
                    helpersEmitted = true;
                }
            }
        }

        return helpersEmitted;
    }

    function getSortedEmitHelpers(node: ts.Node) {
        const helpers = ts.getEmitHelpers(node);
        return helpers && ts.stableSort(helpers, ts.compareEmitHelpers);
    }

    //
    // Literals/Pseudo-literals
    //

    // SyntaxKind.NumericLiteral
    // SyntaxKind.BigIntLiteral
    function emitNumericOrBigIntLiteral(node: ts.NumericLiteral | ts.BigIntLiteral) {
        emitLiteral(node, /*jsxAttributeEscape*/ false);
    }

    // SyntaxKind.StringLiteral
    // SyntaxKind.RegularExpressionLiteral
    // SyntaxKind.NoSubstitutionTemplateLiteral
    // SyntaxKind.TemplateHead
    // SyntaxKind.TemplateMiddle
    // SyntaxKind.TemplateTail
    function emitLiteral(node: ts.LiteralLikeNode, jsxAttributeEscape: boolean) {
        const text = getLiteralTextOfNode(node, printerOptions.neverAsciiEscape, jsxAttributeEscape);
        if ((printerOptions.sourceMap || printerOptions.inlineSourceMap)
            && (node.kind === ts.SyntaxKind.StringLiteral || ts.isTemplateLiteralKind(node.kind))) {
            writeLiteral(text);
        }
        else {
            // Quick info expects all literals to be called with writeStringLiteral, as there's no specific type for numberLiterals
            writeStringLiteral(text);
        }
    }

    // SyntaxKind.UnparsedSource
    // SyntaxKind.UnparsedPrepend
    function emitUnparsedSourceOrPrepend(unparsed: ts.UnparsedSource | ts.UnparsedPrepend) {
        for (const text of unparsed.texts) {
            writeLine();
            emit(text);
        }
    }

    // SyntaxKind.UnparsedPrologue
    // SyntaxKind.UnparsedText
    // SyntaxKind.UnparsedInternal
    // SyntaxKind.UnparsedSyntheticReference
    function writeUnparsedNode(unparsed: ts.UnparsedNode) {
        writer.rawWrite(unparsed.parent.text.substring(unparsed.pos, unparsed.end));
    }

    // SyntaxKind.UnparsedText
    // SyntaxKind.UnparsedInternal
    function emitUnparsedTextLike(unparsed: ts.UnparsedTextLike) {
        const pos = getTextPosWithWriteLine();
        writeUnparsedNode(unparsed);
        if (bundleFileInfo) {
            updateOrPushBundleFileTextLike(
                pos,
                writer.getTextPos(),
                unparsed.kind === ts.SyntaxKind.UnparsedText ?
                    ts.BundleFileSectionKind.Text :
                    ts.BundleFileSectionKind.Internal
            );
        }
    }

    // SyntaxKind.UnparsedSyntheticReference
    function emitUnparsedSyntheticReference(unparsed: ts.UnparsedSyntheticReference) {
        const pos = getTextPosWithWriteLine();
        writeUnparsedNode(unparsed);
        if (bundleFileInfo) {
            const section = ts.clone(unparsed.section);
            section.pos = pos;
            section.end = writer.getTextPos();
            bundleFileInfo.sections.push(section);
        }
    }

    //
    // Snippet Elements
    //

    function emitSnippetNode(hint: ts.EmitHint, node: ts.Node, snippet: ts.SnippetElement) {
        switch (snippet.kind) {
            case ts.SnippetKind.Placeholder:
                emitPlaceholder(hint, node, snippet);
                break;
            case ts.SnippetKind.TabStop:
                emitTabStop(hint, node, snippet);
                break;
        }
    }

    function emitPlaceholder(hint: ts.EmitHint, node: ts.Node, snippet: ts.Placeholder) {
        nonEscapingWrite(`\$\{${snippet.order}:`); // `${2:`
        pipelineEmitWithHintWorker(hint, node, /*allowSnippets*/ false); // `...`
        nonEscapingWrite(`\}`); // `}`
        // `${2:...}`
    }

    function emitTabStop(hint: ts.EmitHint, node: ts.Node, snippet: ts.TabStop) {
        // A tab stop should only be attached to an empty node, i.e. a node that doesn't emit any text.
        ts.Debug.assert(node.kind === ts.SyntaxKind.EmptyStatement,
            `A tab stop cannot be attached to a node of kind ${ts.Debug.formatSyntaxKind(node.kind)}.`);
        ts.Debug.assert(hint !== ts.EmitHint.EmbeddedStatement,
            `A tab stop cannot be attached to an embedded statement.`);
        nonEscapingWrite(`\$${snippet.order}`);
    }

    //
    // Identifiers
    //

    function emitIdentifier(node: ts.Identifier) {
        const writeText = node.symbol ? writeSymbol : write;
        writeText(getTextOfNode(node, /*includeTrivia*/ false), node.symbol);
        emitList(node, node.typeArguments, ts.ListFormat.TypeParameters); // Call emitList directly since it could be an array of TypeParameterDeclarations _or_ type arguments
    }

    //
    // Names
    //

    function emitPrivateIdentifier(node: ts.PrivateIdentifier) {
        const writeText = node.symbol ? writeSymbol : write;
        writeText(getTextOfNode(node, /*includeTrivia*/ false), node.symbol);
    }


    function emitQualifiedName(node: ts.QualifiedName) {
        emitEntityName(node.left);
        writePunctuation(".");
        emit(node.right);
    }

    function emitEntityName(node: ts.EntityName) {
        if (node.kind === ts.SyntaxKind.Identifier) {
            emitExpression(node);
        }
        else {
            emit(node);
        }
    }

    function emitComputedPropertyName(node: ts.ComputedPropertyName) {
        writePunctuation("[");
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionOfComputedPropertyName);
        writePunctuation("]");
    }

    //
    // Signature elements
    //

    function emitTypeParameter(node: ts.TypeParameterDeclaration) {
        emitModifiers(node, node.modifiers);
        emit(node.name);
        if (node.constraint) {
            writeSpace();
            writeKeyword("extends");
            writeSpace();
            emit(node.constraint);
        }
        if (node.default) {
            writeSpace();
            writeOperator("=");
            writeSpace();
            emit(node.default);
        }
    }

    function emitParameter(node: ts.ParameterDeclaration) {
        emitDecoratorsAndModifiers(node, node.modifiers);
        emit(node.dotDotDotToken);
        emitNodeWithWriter(node.name, writeParameter);
        emit(node.questionToken);
        if (node.parent && node.parent.kind === ts.SyntaxKind.JSDocFunctionType && !node.name) {
            emit(node.type);
        }
        else {
            emitTypeAnnotation(node.type);
        }
        // The comment position has to fallback to any present node within the parameterdeclaration because as it turns out, the parser can make parameter declarations with _just_ an initializer.
        emitInitializer(node.initializer, node.type ? node.type.end : node.questionToken ? node.questionToken.end : node.name ? node.name.end : node.modifiers ? node.modifiers.end : node.pos, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitDecorator(decorator: ts.Decorator) {
        writePunctuation("@");
        emitExpression(decorator.expression, parenthesizer.parenthesizeLeftSideOfAccess);
    }

    //
    // Type members
    //

    function emitPropertySignature(node: ts.PropertySignature) {
        emitModifiers(node, node.modifiers);
        emitNodeWithWriter(node.name, writeProperty);
        emit(node.questionToken);
        emitTypeAnnotation(node.type);
        writeTrailingSemicolon();
    }

    function emitPropertyDeclaration(node: ts.PropertyDeclaration) {
        emitDecoratorsAndModifiers(node, node.modifiers);
        emit(node.name);
        emit(node.questionToken);
        emit(node.exclamationToken);
        emitTypeAnnotation(node.type);
        emitInitializer(node.initializer, node.type ? node.type.end : node.questionToken ? node.questionToken.end : node.name.end, node);
        writeTrailingSemicolon();
    }

    function emitMethodSignature(node: ts.MethodSignature) {
        pushNameGenerationScope(node);
        emitModifiers(node, node.modifiers);
        emit(node.name);
        emit(node.questionToken);
        emitTypeParameters(node, node.typeParameters);
        emitParameters(node, node.parameters);
        emitTypeAnnotation(node.type);
        writeTrailingSemicolon();
        popNameGenerationScope(node);
    }

    function emitMethodDeclaration(node: ts.MethodDeclaration) {
        emitDecoratorsAndModifiers(node, node.modifiers);
        emit(node.asteriskToken);
        emit(node.name);
        emit(node.questionToken);
        emitSignatureAndBody(node, emitSignatureHead);
    }

    function emitClassStaticBlockDeclaration(node: ts.ClassStaticBlockDeclaration) {
        writeKeyword("static");
        emitBlockFunctionBody(node.body);
    }

    function emitConstructor(node: ts.ConstructorDeclaration) {
        emitModifiers(node, node.modifiers);
        writeKeyword("constructor");
        emitSignatureAndBody(node, emitSignatureHead);
    }

    function emitAccessorDeclaration(node: ts.AccessorDeclaration) {
        emitDecoratorsAndModifiers(node, node.modifiers);
        writeKeyword(node.kind === ts.SyntaxKind.GetAccessor ? "get" : "set");
        writeSpace();
        emit(node.name);
        emitSignatureAndBody(node, emitSignatureHead);
    }

    function emitCallSignature(node: ts.CallSignatureDeclaration) {
        pushNameGenerationScope(node);
        emitTypeParameters(node, node.typeParameters);
        emitParameters(node, node.parameters);
        emitTypeAnnotation(node.type);
        writeTrailingSemicolon();
        popNameGenerationScope(node);
    }

    function emitConstructSignature(node: ts.ConstructSignatureDeclaration) {
        pushNameGenerationScope(node);
        writeKeyword("new");
        writeSpace();
        emitTypeParameters(node, node.typeParameters);
        emitParameters(node, node.parameters);
        emitTypeAnnotation(node.type);
        writeTrailingSemicolon();
        popNameGenerationScope(node);
    }

    function emitIndexSignature(node: ts.IndexSignatureDeclaration) {
        emitModifiers(node, node.modifiers);
        emitParametersForIndexSignature(node, node.parameters);
        emitTypeAnnotation(node.type);
        writeTrailingSemicolon();
    }

    function emitTemplateTypeSpan(node: ts.TemplateLiteralTypeSpan) {
        emit(node.type);
        emit(node.literal);
    }

    function emitSemicolonClassElement() {
        writeTrailingSemicolon();
    }

    //
    // Types
    //

    function emitTypePredicate(node: ts.TypePredicateNode) {
        if (node.assertsModifier) {
            emit(node.assertsModifier);
            writeSpace();
        }
        emit(node.parameterName);
        if (node.type) {
            writeSpace();
            writeKeyword("is");
            writeSpace();
            emit(node.type);
        }
    }

    function emitTypeReference(node: ts.TypeReferenceNode) {
        emit(node.typeName);
        emitTypeArguments(node, node.typeArguments);
    }

    function emitFunctionType(node: ts.FunctionTypeNode) {
        pushNameGenerationScope(node);
        emitTypeParameters(node, node.typeParameters);
        emitParametersForArrow(node, node.parameters);
        writeSpace();
        writePunctuation("=>");
        writeSpace();
        emit(node.type);
        popNameGenerationScope(node);
    }

    function emitJSDocFunctionType(node: ts.JSDocFunctionType) {
        writeKeyword("function");
        emitParameters(node, node.parameters);
        writePunctuation(":");
        emit(node.type);
    }


    function emitJSDocNullableType(node: ts.JSDocNullableType) {
        writePunctuation("?");
        emit(node.type);
    }

    function emitJSDocNonNullableType(node: ts.JSDocNonNullableType) {
        writePunctuation("!");
        emit(node.type);
    }

    function emitJSDocOptionalType(node: ts.JSDocOptionalType) {
        emit(node.type);
        writePunctuation("=");
    }

    function emitConstructorType(node: ts.ConstructorTypeNode) {
        pushNameGenerationScope(node);
        emitModifiers(node, node.modifiers);
        writeKeyword("new");
        writeSpace();
        emitTypeParameters(node, node.typeParameters);
        emitParameters(node, node.parameters);
        writeSpace();
        writePunctuation("=>");
        writeSpace();
        emit(node.type);
        popNameGenerationScope(node);
    }

    function emitTypeQuery(node: ts.TypeQueryNode) {
        writeKeyword("typeof");
        writeSpace();
        emit(node.exprName);
        emitTypeArguments(node, node.typeArguments);
    }

    function emitTypeLiteral(node: ts.TypeLiteralNode) {
        writePunctuation("{");
        const flags = ts.getEmitFlags(node) & ts.EmitFlags.SingleLine ? ts.ListFormat.SingleLineTypeLiteralMembers : ts.ListFormat.MultiLineTypeLiteralMembers;
        emitList(node, node.members, flags | ts.ListFormat.NoSpaceIfEmpty);
        writePunctuation("}");
    }

    function emitArrayType(node: ts.ArrayTypeNode) {
        emit(node.elementType, parenthesizer.parenthesizeNonArrayTypeOfPostfixType);
        writePunctuation("[");
        writePunctuation("]");
    }

    function emitRestOrJSDocVariadicType(node: ts.RestTypeNode | ts.JSDocVariadicType) {
        writePunctuation("...");
        emit(node.type);
    }

    function emitTupleType(node: ts.TupleTypeNode) {
        emitTokenWithComment(ts.SyntaxKind.OpenBracketToken, node.pos, writePunctuation, node);
        const flags = ts.getEmitFlags(node) & ts.EmitFlags.SingleLine ? ts.ListFormat.SingleLineTupleTypeElements : ts.ListFormat.MultiLineTupleTypeElements;
        emitList(node, node.elements, flags | ts.ListFormat.NoSpaceIfEmpty, parenthesizer.parenthesizeElementTypeOfTupleType);
        emitTokenWithComment(ts.SyntaxKind.CloseBracketToken, node.elements.end, writePunctuation, node);
    }

    function emitNamedTupleMember(node: ts.NamedTupleMember) {
        emit(node.dotDotDotToken);
        emit(node.name);
        emit(node.questionToken);
        emitTokenWithComment(ts.SyntaxKind.ColonToken, node.name.end, writePunctuation, node);
        writeSpace();
        emit(node.type);
    }

    function emitOptionalType(node: ts.OptionalTypeNode) {
        emit(node.type, parenthesizer.parenthesizeTypeOfOptionalType);
        writePunctuation("?");
    }

    function emitUnionType(node: ts.UnionTypeNode) {
        emitList(node, node.types, ts.ListFormat.UnionTypeConstituents, parenthesizer.parenthesizeConstituentTypeOfUnionType);
    }

    function emitIntersectionType(node: ts.IntersectionTypeNode) {
        emitList(node, node.types, ts.ListFormat.IntersectionTypeConstituents, parenthesizer.parenthesizeConstituentTypeOfIntersectionType);
    }

    function emitConditionalType(node: ts.ConditionalTypeNode) {
        emit(node.checkType, parenthesizer.parenthesizeCheckTypeOfConditionalType);
        writeSpace();
        writeKeyword("extends");
        writeSpace();
        emit(node.extendsType, parenthesizer.parenthesizeExtendsTypeOfConditionalType);
        writeSpace();
        writePunctuation("?");
        writeSpace();
        emit(node.trueType);
        writeSpace();
        writePunctuation(":");
        writeSpace();
        emit(node.falseType);
    }

    function emitInferType(node: ts.InferTypeNode) {
        writeKeyword("infer");
        writeSpace();
        emit(node.typeParameter);
    }

    function emitParenthesizedType(node: ts.ParenthesizedTypeNode) {
        writePunctuation("(");
        emit(node.type);
        writePunctuation(")");
    }

    function emitThisType() {
        writeKeyword("this");
    }

    function emitTypeOperator(node: ts.TypeOperatorNode) {
        writeTokenText(node.operator, writeKeyword);
        writeSpace();

        const parenthesizerRule = node.operator === ts.SyntaxKind.ReadonlyKeyword ?
            parenthesizer.parenthesizeOperandOfReadonlyTypeOperator :
            parenthesizer.parenthesizeOperandOfTypeOperator;
        emit(node.type, parenthesizerRule);
    }

    function emitIndexedAccessType(node: ts.IndexedAccessTypeNode) {
        emit(node.objectType, parenthesizer.parenthesizeNonArrayTypeOfPostfixType);
        writePunctuation("[");
        emit(node.indexType);
        writePunctuation("]");
    }

    function emitMappedType(node: ts.MappedTypeNode) {
        const emitFlags = ts.getEmitFlags(node);
        writePunctuation("{");
        if (emitFlags & ts.EmitFlags.SingleLine) {
            writeSpace();
        }
        else {
            writeLine();
            increaseIndent();
        }
        if (node.readonlyToken) {
            emit(node.readonlyToken);
            if (node.readonlyToken.kind !== ts.SyntaxKind.ReadonlyKeyword) {
                writeKeyword("readonly");
            }
            writeSpace();
        }
        writePunctuation("[");

        pipelineEmit(ts.EmitHint.MappedTypeParameter, node.typeParameter);
        if (node.nameType) {
            writeSpace();
            writeKeyword("as");
            writeSpace();
            emit(node.nameType);
        }

        writePunctuation("]");
        if (node.questionToken) {
            emit(node.questionToken);
            if (node.questionToken.kind !== ts.SyntaxKind.QuestionToken) {
                writePunctuation("?");
            }
        }
        writePunctuation(":");
        writeSpace();
        emit(node.type);
        writeTrailingSemicolon();
        if (emitFlags & ts.EmitFlags.SingleLine) {
            writeSpace();
        }
        else {
            writeLine();
            decreaseIndent();
        }
        emitList(node, node.members, ts.ListFormat.PreserveLines);
        writePunctuation("}");
    }

    function emitLiteralType(node: ts.LiteralTypeNode) {
        emitExpression(node.literal);
    }

    function emitTemplateType(node: ts.TemplateLiteralTypeNode) {
        emit(node.head);
        emitList(node, node.templateSpans, ts.ListFormat.TemplateExpressionSpans);
    }

    function emitImportTypeNode(node: ts.ImportTypeNode) {
        if (node.isTypeOf) {
            writeKeyword("typeof");
            writeSpace();
        }
        writeKeyword("import");
        writePunctuation("(");
        emit(node.argument);
        if (node.assertions) {
            writePunctuation(",");
            writeSpace();
            writePunctuation("{");
            writeSpace();
            writeKeyword("assert");
            writePunctuation(":");
            writeSpace();
            const elements = node.assertions.assertClause.elements;
            emitList(node.assertions.assertClause, elements, ts.ListFormat.ImportClauseEntries);
            writeSpace();
            writePunctuation("}");
        }
        writePunctuation(")");
        if (node.qualifier) {
            writePunctuation(".");
            emit(node.qualifier);
        }
        emitTypeArguments(node, node.typeArguments);
    }

    //
    // Binding patterns
    //

    function emitObjectBindingPattern(node: ts.ObjectBindingPattern) {
        writePunctuation("{");
        emitList(node, node.elements, ts.ListFormat.ObjectBindingPatternElements);
        writePunctuation("}");
    }

    function emitArrayBindingPattern(node: ts.ArrayBindingPattern) {
        writePunctuation("[");
        emitList(node, node.elements, ts.ListFormat.ArrayBindingPatternElements);
        writePunctuation("]");
    }

    function emitBindingElement(node: ts.BindingElement) {
        emit(node.dotDotDotToken);
        if (node.propertyName) {
            emit(node.propertyName);
            writePunctuation(":");
            writeSpace();
        }
        emit(node.name);
        emitInitializer(node.initializer, node.name.end, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    //
    // Expressions
    //

    function emitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
        const elements = node.elements;
        const preferNewLine = node.multiLine ? ts.ListFormat.PreferNewLine : ts.ListFormat.None;
        emitExpressionList(node, elements, ts.ListFormat.ArrayLiteralExpressionElements | preferNewLine, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitObjectLiteralExpression(node: ts.ObjectLiteralExpression) {
        ts.forEach(node.properties, generateMemberNames);

        const indentedFlag = ts.getEmitFlags(node) & ts.EmitFlags.Indented;
        if (indentedFlag) {
            increaseIndent();
        }

        const preferNewLine = node.multiLine ? ts.ListFormat.PreferNewLine : ts.ListFormat.None;
        const allowTrailingComma = currentSourceFile && currentSourceFile.languageVersion >= ts.ScriptTarget.ES5 && !ts.isJsonSourceFile(currentSourceFile) ? ts.ListFormat.AllowTrailingComma : ts.ListFormat.None;
        emitList(node, node.properties, ts.ListFormat.ObjectLiteralExpressionProperties | allowTrailingComma | preferNewLine);

        if (indentedFlag) {
            decreaseIndent();
        }
    }

    function emitPropertyAccessExpression(node: ts.PropertyAccessExpression) {
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        const token = node.questionDotToken || ts.setTextRangePosEnd(ts.factory.createToken(ts.SyntaxKind.DotToken) as ts.DotToken, node.expression.end, node.name.pos);
        const linesBeforeDot = getLinesBetweenNodes(node, node.expression, token);
        const linesAfterDot = getLinesBetweenNodes(node, token, node.name);

        writeLinesAndIndent(linesBeforeDot, /*writeSpaceIfNotIndenting*/ false);

        const shouldEmitDotDot =
            token.kind !== ts.SyntaxKind.QuestionDotToken &&
            mayNeedDotDotForPropertyAccess(node.expression) &&
            !writer.hasTrailingComment() &&
            !writer.hasTrailingWhitespace();

        if (shouldEmitDotDot) {
            writePunctuation(".");
        }

        if (node.questionDotToken) {
            emit(token);
        }
        else {
            emitTokenWithComment(token.kind, node.expression.end, writePunctuation, node);
        }
        writeLinesAndIndent(linesAfterDot, /*writeSpaceIfNotIndenting*/ false);
        emit(node.name);
        decreaseIndentIf(linesBeforeDot, linesAfterDot);
    }

    // 1..toString is a valid property access, emit a dot after the literal
    // Also emit a dot if expression is a integer const enum value - it will appear in generated code as numeric literal
    function mayNeedDotDotForPropertyAccess(expression: ts.Expression) {
        expression = ts.skipPartiallyEmittedExpressions(expression);
        if (ts.isNumericLiteral(expression)) {
            // check if numeric literal is a decimal literal that was originally written with a dot
            const text = getLiteralTextOfNode(expression as ts.LiteralExpression, /*neverAsciiEscape*/ true, /*jsxAttributeEscape*/ false);
            // If he number will be printed verbatim and it doesn't already contain a dot, add one
            // if the expression doesn't have any comments that will be emitted.
            return !expression.numericLiteralFlags && !ts.stringContains(text, ts.tokenToString(ts.SyntaxKind.DotToken)!);
        }
        else if (ts.isAccessExpression(expression)) {
            // check if constant enum value is integer
            const constantValue = ts.getConstantValue(expression);
            // isFinite handles cases when constantValue is undefined
            return typeof constantValue === "number" && isFinite(constantValue)
                && Math.floor(constantValue) === constantValue;
        }
    }

    function emitElementAccessExpression(node: ts.ElementAccessExpression) {
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        emit(node.questionDotToken);
        emitTokenWithComment(ts.SyntaxKind.OpenBracketToken, node.expression.end, writePunctuation, node);
        emitExpression(node.argumentExpression);
        emitTokenWithComment(ts.SyntaxKind.CloseBracketToken, node.argumentExpression.end, writePunctuation, node);
    }

    function emitCallExpression(node: ts.CallExpression) {
        const indirectCall = ts.getEmitFlags(node) & ts.EmitFlags.IndirectCall;
        if (indirectCall) {
            writePunctuation("(");
            writeLiteral("0");
            writePunctuation(",");
            writeSpace();
        }
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        if (indirectCall) {
            writePunctuation(")");
        }
        emit(node.questionDotToken);
        emitTypeArguments(node, node.typeArguments);
        emitExpressionList(node, node.arguments, ts.ListFormat.CallExpressionArguments, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitNewExpression(node: ts.NewExpression) {
        emitTokenWithComment(ts.SyntaxKind.NewKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionOfNew);
        emitTypeArguments(node, node.typeArguments);
        emitExpressionList(node, node.arguments, ts.ListFormat.NewExpressionArguments, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitTaggedTemplateExpression(node: ts.TaggedTemplateExpression) {
        const indirectCall = ts.getEmitFlags(node) & ts.EmitFlags.IndirectCall;
        if (indirectCall) {
            writePunctuation("(");
            writeLiteral("0");
            writePunctuation(",");
            writeSpace();
        }
        emitExpression(node.tag, parenthesizer.parenthesizeLeftSideOfAccess);
        if (indirectCall) {
            writePunctuation(")");
        }
        emitTypeArguments(node, node.typeArguments);
        writeSpace();
        emitExpression(node.template);
    }

    function emitTypeAssertionExpression(node: ts.TypeAssertion) {
        writePunctuation("<");
        emit(node.type);
        writePunctuation(">");
        emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function emitParenthesizedExpression(node: ts.ParenthesizedExpression) {
        const openParenPos = emitTokenWithComment(ts.SyntaxKind.OpenParenToken, node.pos, writePunctuation, node);
        const indented = writeLineSeparatorsAndIndentBefore(node.expression, node);
        emitExpression(node.expression, /*parenthesizerRules*/ undefined);
        writeLineSeparatorsAfter(node.expression, node);
        decreaseIndentIf(indented);
        emitTokenWithComment(ts.SyntaxKind.CloseParenToken, node.expression ? node.expression.end : openParenPos, writePunctuation, node);
    }

    function emitFunctionExpression(node: ts.FunctionExpression) {
        generateNameIfNeeded(node.name);
        emitFunctionDeclarationOrExpression(node);
    }

    function emitArrowFunction(node: ts.ArrowFunction) {
        emitModifiers(node, node.modifiers);
        emitSignatureAndBody(node, emitArrowFunctionHead);
    }

    function emitArrowFunctionHead(node: ts.ArrowFunction) {
        emitTypeParameters(node, node.typeParameters);
        emitParametersForArrow(node, node.parameters);
        emitTypeAnnotation(node.type);
        writeSpace();
        emit(node.equalsGreaterThanToken);
    }

    function emitDeleteExpression(node: ts.DeleteExpression) {
        emitTokenWithComment(ts.SyntaxKind.DeleteKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function emitTypeOfExpression(node: ts.TypeOfExpression) {
        emitTokenWithComment(ts.SyntaxKind.TypeOfKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function emitVoidExpression(node: ts.VoidExpression) {
        emitTokenWithComment(ts.SyntaxKind.VoidKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function emitAwaitExpression(node: ts.AwaitExpression) {
        emitTokenWithComment(ts.SyntaxKind.AwaitKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function emitPrefixUnaryExpression(node: ts.PrefixUnaryExpression) {
        writeTokenText(node.operator, writeOperator);
        if (shouldEmitWhitespaceBeforeOperand(node)) {
            writeSpace();
        }
        emitExpression(node.operand, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function shouldEmitWhitespaceBeforeOperand(node: ts.PrefixUnaryExpression) {
        // In some cases, we need to emit a space between the operator and the operand. One obvious case
        // is when the operator is an identifier, like delete or typeof. We also need to do this for plus
        // and minus expressions in certain cases. Specifically, consider the following two cases (parens
        // are just for clarity of exposition, and not part of the source code):
        //
        //  (+(+1))
        //  (+(++1))
        //
        // We need to emit a space in both cases. In the first case, the absence of a space will make
        // the resulting expression a prefix increment operation. And in the second, it will make the resulting
        // expression a prefix increment whose operand is a plus expression - (++(+x))
        // The same is true of minus of course.
        const operand = node.operand;
        return operand.kind === ts.SyntaxKind.PrefixUnaryExpression
            && ((node.operator === ts.SyntaxKind.PlusToken && ((operand as ts.PrefixUnaryExpression).operator === ts.SyntaxKind.PlusToken || (operand as ts.PrefixUnaryExpression).operator === ts.SyntaxKind.PlusPlusToken))
                || (node.operator === ts.SyntaxKind.MinusToken && ((operand as ts.PrefixUnaryExpression).operator === ts.SyntaxKind.MinusToken || (operand as ts.PrefixUnaryExpression).operator === ts.SyntaxKind.MinusMinusToken)));
    }

    function emitPostfixUnaryExpression(node: ts.PostfixUnaryExpression) {
        emitExpression(node.operand, parenthesizer.parenthesizeOperandOfPostfixUnary);
        writeTokenText(node.operator, writeOperator);
    }

    function createEmitBinaryExpression() {
        interface WorkArea {
            stackIndex: number;
            preserveSourceNewlinesStack: (boolean | undefined)[];
            containerPosStack: number[];
            containerEndStack: number[];
            declarationListContainerEndStack: number[];
            shouldEmitCommentsStack: boolean[];
            shouldEmitSourceMapsStack: boolean[];
        }

        return ts.createBinaryExpressionTrampoline(onEnter, onLeft, onOperator, onRight, onExit, /*foldState*/ undefined);

        function onEnter(node: ts.BinaryExpression, state: WorkArea | undefined) {
            if (state) {
                state.stackIndex++;
                state.preserveSourceNewlinesStack[state.stackIndex] = preserveSourceNewlines;
                state.containerPosStack[state.stackIndex] = containerPos;
                state.containerEndStack[state.stackIndex] = containerEnd;
                state.declarationListContainerEndStack[state.stackIndex] = declarationListContainerEnd;
                const emitComments = state.shouldEmitCommentsStack[state.stackIndex] = shouldEmitComments(node);
                const emitSourceMaps = state.shouldEmitSourceMapsStack[state.stackIndex] = shouldEmitSourceMaps(node);
                onBeforeEmitNode?.(node);
                if (emitComments) emitCommentsBeforeNode(node);
                if (emitSourceMaps) emitSourceMapsBeforeNode(node);
                beforeEmitNode(node);
            }
            else {
                state = {
                    stackIndex: 0,
                    preserveSourceNewlinesStack: [undefined],
                    containerPosStack: [-1],
                    containerEndStack: [-1],
                    declarationListContainerEndStack: [-1],
                    shouldEmitCommentsStack: [false],
                    shouldEmitSourceMapsStack: [false],
                };
            }
            return state;
        }

        function onLeft(next: ts.Expression, _workArea: WorkArea, parent: ts.BinaryExpression) {
            return maybeEmitExpression(next, parent, "left");
        }

        function onOperator(operatorToken: ts.BinaryOperatorToken, _state: WorkArea, node: ts.BinaryExpression) {
            const isCommaOperator = operatorToken.kind !== ts.SyntaxKind.CommaToken;
            const linesBeforeOperator = getLinesBetweenNodes(node, node.left, operatorToken);
            const linesAfterOperator = getLinesBetweenNodes(node, operatorToken, node.right);
            writeLinesAndIndent(linesBeforeOperator, isCommaOperator);
            emitLeadingCommentsOfPosition(operatorToken.pos);
            writeTokenNode(operatorToken, operatorToken.kind === ts.SyntaxKind.InKeyword ? writeKeyword : writeOperator);
            emitTrailingCommentsOfPosition(operatorToken.end, /*prefixSpace*/ true); // Binary operators should have a space before the comment starts
            writeLinesAndIndent(linesAfterOperator, /*writeSpaceIfNotIndenting*/ true);
        }

        function onRight(next: ts.Expression, _workArea: WorkArea, parent: ts.BinaryExpression) {
            return maybeEmitExpression(next, parent, "right");
        }

        function onExit(node: ts.BinaryExpression, state: WorkArea) {
            const linesBeforeOperator = getLinesBetweenNodes(node, node.left, node.operatorToken);
            const linesAfterOperator = getLinesBetweenNodes(node, node.operatorToken, node.right);
            decreaseIndentIf(linesBeforeOperator, linesAfterOperator);
            if (state.stackIndex > 0) {
                const savedPreserveSourceNewlines = state.preserveSourceNewlinesStack[state.stackIndex];
                const savedContainerPos = state.containerPosStack[state.stackIndex];
                const savedContainerEnd = state.containerEndStack[state.stackIndex];
                const savedDeclarationListContainerEnd = state.declarationListContainerEndStack[state.stackIndex];
                const shouldEmitComments = state.shouldEmitCommentsStack[state.stackIndex];
                const shouldEmitSourceMaps = state.shouldEmitSourceMapsStack[state.stackIndex];
                afterEmitNode(savedPreserveSourceNewlines);
                if (shouldEmitSourceMaps) emitSourceMapsAfterNode(node);
                if (shouldEmitComments) emitCommentsAfterNode(node, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
                onAfterEmitNode?.(node);
                state.stackIndex--;
            }
        }

        function maybeEmitExpression(next: ts.Expression, parent: ts.BinaryExpression, side: "left" | "right") {
            const parenthesizerRule = side === "left" ?
                parenthesizer.getParenthesizeLeftSideOfBinaryForOperator(parent.operatorToken.kind) :
                parenthesizer.getParenthesizeRightSideOfBinaryForOperator(parent.operatorToken.kind);

            let pipelinePhase = getPipelinePhase(PipelinePhase.Notification, ts.EmitHint.Expression, next);
            if (pipelinePhase === pipelineEmitWithSubstitution) {
                ts.Debug.assertIsDefined(lastSubstitution);
                next = parenthesizerRule(ts.cast(lastSubstitution, ts.isExpression));
                pipelinePhase = getNextPipelinePhase(PipelinePhase.Substitution, ts.EmitHint.Expression, next);
                lastSubstitution = undefined;
            }

            if (pipelinePhase === pipelineEmitWithComments ||
                pipelinePhase === pipelineEmitWithSourceMaps ||
                pipelinePhase === pipelineEmitWithHint) {
                if (ts.isBinaryExpression(next)) {
                    return next;
                }
            }

            currentParenthesizerRule = parenthesizerRule;
            pipelinePhase(ts.EmitHint.Expression, next);
        }
    }

    function emitConditionalExpression(node: ts.ConditionalExpression) {
        const linesBeforeQuestion = getLinesBetweenNodes(node, node.condition, node.questionToken);
        const linesAfterQuestion = getLinesBetweenNodes(node, node.questionToken, node.whenTrue);
        const linesBeforeColon = getLinesBetweenNodes(node, node.whenTrue, node.colonToken);
        const linesAfterColon = getLinesBetweenNodes(node, node.colonToken, node.whenFalse);

        emitExpression(node.condition, parenthesizer.parenthesizeConditionOfConditionalExpression);
        writeLinesAndIndent(linesBeforeQuestion, /*writeSpaceIfNotIndenting*/ true);
        emit(node.questionToken);
        writeLinesAndIndent(linesAfterQuestion, /*writeSpaceIfNotIndenting*/ true);
        emitExpression(node.whenTrue, parenthesizer.parenthesizeBranchOfConditionalExpression);
        decreaseIndentIf(linesBeforeQuestion, linesAfterQuestion);

        writeLinesAndIndent(linesBeforeColon, /*writeSpaceIfNotIndenting*/ true);
        emit(node.colonToken);
        writeLinesAndIndent(linesAfterColon, /*writeSpaceIfNotIndenting*/ true);
        emitExpression(node.whenFalse, parenthesizer.parenthesizeBranchOfConditionalExpression);
        decreaseIndentIf(linesBeforeColon, linesAfterColon);
    }

    function emitTemplateExpression(node: ts.TemplateExpression) {
        emit(node.head);
        emitList(node, node.templateSpans, ts.ListFormat.TemplateExpressionSpans);
    }

    function emitYieldExpression(node: ts.YieldExpression) {
        emitTokenWithComment(ts.SyntaxKind.YieldKeyword, node.pos, writeKeyword, node);
        emit(node.asteriskToken);
        emitExpressionWithLeadingSpace(node.expression && parenthesizeExpressionForNoAsi(node.expression), parenthesizeExpressionForNoAsiAndDisallowedComma);
    }

    function emitSpreadElement(node: ts.SpreadElement) {
        emitTokenWithComment(ts.SyntaxKind.DotDotDotToken, node.pos, writePunctuation, node);
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitClassExpression(node: ts.ClassExpression) {
        generateNameIfNeeded(node.name);
        emitClassDeclarationOrExpression(node);
    }

    function emitExpressionWithTypeArguments(node: ts.ExpressionWithTypeArguments) {
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        emitTypeArguments(node, node.typeArguments);
    }

    function emitAsExpression(node: ts.AsExpression) {
        emitExpression(node.expression, /*parenthesizerRules*/ undefined);
        if (node.type) {
            writeSpace();
            writeKeyword("as");
            writeSpace();
            emit(node.type);
        }
    }

    function emitNonNullExpression(node: ts.NonNullExpression) {
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        writeOperator("!");
    }

    function emitSatisfiesExpression(node: ts.SatisfiesExpression) {
        emitExpression(node.expression, /*parenthesizerRules*/ undefined);
        if (node.type) {
            writeSpace();
            writeKeyword("satisfies");
            writeSpace();
            emit(node.type);
        }
    }

    function emitMetaProperty(node: ts.MetaProperty) {
        writeToken(node.keywordToken, node.pos, writePunctuation);
        writePunctuation(".");
        emit(node.name);
    }

    //
    // Misc
    //

    function emitTemplateSpan(node: ts.TemplateSpan) {
        emitExpression(node.expression);
        emit(node.literal);
    }

    //
    // Statements
    //

    function emitBlock(node: ts.Block) {
        emitBlockStatements(node, /*forceSingleLine*/ !node.multiLine && isEmptyBlock(node));
    }

    function emitBlockStatements(node: ts.BlockLike, forceSingleLine: boolean) {
        emitTokenWithComment(ts.SyntaxKind.OpenBraceToken, node.pos, writePunctuation, /*contextNode*/ node);
        const format = forceSingleLine || ts.getEmitFlags(node) & ts.EmitFlags.SingleLine ? ts.ListFormat.SingleLineBlockStatements : ts.ListFormat.MultiLineBlockStatements;
        emitList(node, node.statements, format);
        emitTokenWithComment(ts.SyntaxKind.CloseBraceToken, node.statements.end, writePunctuation, /*contextNode*/ node, /*indentLeading*/ !!(format & ts.ListFormat.MultiLine));
    }

    function emitVariableStatement(node: ts.VariableStatement) {
        emitModifiers(node, node.modifiers);
        emit(node.declarationList);
        writeTrailingSemicolon();
    }

    function emitEmptyStatement(isEmbeddedStatement: boolean) {
        // While most trailing semicolons are possibly insignificant, an embedded "empty"
        // statement is significant and cannot be elided by a trailing-semicolon-omitting writer.
        if (isEmbeddedStatement) {
            writePunctuation(";");
        }
        else {
            writeTrailingSemicolon();
        }
    }

    function emitExpressionStatement(node: ts.ExpressionStatement) {
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionOfExpressionStatement);
        // Emit semicolon in non json files
        // or if json file that created synthesized expression(eg.define expression statement when --out and amd code generation)
        if (!currentSourceFile || !ts.isJsonSourceFile(currentSourceFile) || ts.nodeIsSynthesized(node.expression)) {
            writeTrailingSemicolon();
        }
    }

    function emitIfStatement(node: ts.IfStatement) {
        const openParenPos = emitTokenWithComment(ts.SyntaxKind.IfKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(ts.SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitExpression(node.expression);
        emitTokenWithComment(ts.SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        emitEmbeddedStatement(node, node.thenStatement);
        if (node.elseStatement) {
            writeLineOrSpace(node, node.thenStatement, node.elseStatement);
            emitTokenWithComment(ts.SyntaxKind.ElseKeyword, node.thenStatement.end, writeKeyword, node);
            if (node.elseStatement.kind === ts.SyntaxKind.IfStatement) {
                writeSpace();
                emit(node.elseStatement);
            }
            else {
                emitEmbeddedStatement(node, node.elseStatement);
            }
        }
    }

    function emitWhileClause(node: ts.WhileStatement | ts.DoStatement, startPos: number) {
        const openParenPos = emitTokenWithComment(ts.SyntaxKind.WhileKeyword, startPos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(ts.SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitExpression(node.expression);
        emitTokenWithComment(ts.SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
    }

    function emitDoStatement(node: ts.DoStatement) {
        emitTokenWithComment(ts.SyntaxKind.DoKeyword, node.pos, writeKeyword, node);
        emitEmbeddedStatement(node, node.statement);
        if (ts.isBlock(node.statement) && !preserveSourceNewlines) {
            writeSpace();
        }
        else {
            writeLineOrSpace(node, node.statement, node.expression);
        }

        emitWhileClause(node, node.statement.end);
        writeTrailingSemicolon();
    }

    function emitWhileStatement(node: ts.WhileStatement) {
        emitWhileClause(node, node.pos);
        emitEmbeddedStatement(node, node.statement);
    }

    function emitForStatement(node: ts.ForStatement) {
        const openParenPos = emitTokenWithComment(ts.SyntaxKind.ForKeyword, node.pos, writeKeyword, node);
        writeSpace();
        let pos = emitTokenWithComment(ts.SyntaxKind.OpenParenToken, openParenPos, writePunctuation, /*contextNode*/ node);
        emitForBinding(node.initializer);
        pos = emitTokenWithComment(ts.SyntaxKind.SemicolonToken, node.initializer ? node.initializer.end : pos, writePunctuation, node);
        emitExpressionWithLeadingSpace(node.condition);
        pos = emitTokenWithComment(ts.SyntaxKind.SemicolonToken, node.condition ? node.condition.end : pos, writePunctuation, node);
        emitExpressionWithLeadingSpace(node.incrementor);
        emitTokenWithComment(ts.SyntaxKind.CloseParenToken, node.incrementor ? node.incrementor.end : pos, writePunctuation, node);
        emitEmbeddedStatement(node, node.statement);
    }

    function emitForInStatement(node: ts.ForInStatement) {
        const openParenPos = emitTokenWithComment(ts.SyntaxKind.ForKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(ts.SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitForBinding(node.initializer);
        writeSpace();
        emitTokenWithComment(ts.SyntaxKind.InKeyword, node.initializer.end, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression);
        emitTokenWithComment(ts.SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        emitEmbeddedStatement(node, node.statement);
    }

    function emitForOfStatement(node: ts.ForOfStatement) {
        const openParenPos = emitTokenWithComment(ts.SyntaxKind.ForKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitWithTrailingSpace(node.awaitModifier);
        emitTokenWithComment(ts.SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitForBinding(node.initializer);
        writeSpace();
        emitTokenWithComment(ts.SyntaxKind.OfKeyword, node.initializer.end, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression);
        emitTokenWithComment(ts.SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        emitEmbeddedStatement(node, node.statement);
    }

    function emitForBinding(node: ts.VariableDeclarationList | ts.Expression | undefined) {
        if (node !== undefined) {
            if (node.kind === ts.SyntaxKind.VariableDeclarationList) {
                emit(node);
            }
            else {
                emitExpression(node);
            }
        }
    }

    function emitContinueStatement(node: ts.ContinueStatement) {
        emitTokenWithComment(ts.SyntaxKind.ContinueKeyword, node.pos, writeKeyword, node);
        emitWithLeadingSpace(node.label);
        writeTrailingSemicolon();
    }

    function emitBreakStatement(node: ts.BreakStatement) {
        emitTokenWithComment(ts.SyntaxKind.BreakKeyword, node.pos, writeKeyword, node);
        emitWithLeadingSpace(node.label);
        writeTrailingSemicolon();
    }

    function emitTokenWithComment(token: ts.SyntaxKind, pos: number, writer: (s: string) => void, contextNode: ts.Node, indentLeading?: boolean) {
        const node = ts.getParseTreeNode(contextNode);
        const isSimilarNode = node && node.kind === contextNode.kind;
        const startPos = pos;
        if (isSimilarNode && currentSourceFile) {
            pos = ts.skipTrivia(currentSourceFile.text, pos);
        }
        if (isSimilarNode && contextNode.pos !== startPos) {
            const needsIndent = indentLeading && currentSourceFile && !ts.positionsAreOnSameLine(startPos, pos, currentSourceFile);
            if (needsIndent) {
                increaseIndent();
            }
            emitLeadingCommentsOfPosition(startPos);
            if (needsIndent) {
                decreaseIndent();
            }
        }
        pos = writeTokenText(token, writer, pos);
        if (isSimilarNode && contextNode.end !== pos) {
            const isJsxExprContext = contextNode.kind === ts.SyntaxKind.JsxExpression;
            emitTrailingCommentsOfPosition(pos, /*prefixSpace*/ !isJsxExprContext, /*forceNoNewline*/ isJsxExprContext);
        }
        return pos;
    }

    function commentWillEmitNewLine(node: ts.CommentRange) {
        return node.kind === ts.SyntaxKind.SingleLineCommentTrivia || !!node.hasTrailingNewLine;
    }

    function willEmitLeadingNewLine(node: ts.Expression): boolean {
        if (!currentSourceFile) return false;
        if (ts.some(ts.getLeadingCommentRanges(currentSourceFile.text, node.pos), commentWillEmitNewLine)) return true;
        if (ts.some(ts.getSyntheticLeadingComments(node), commentWillEmitNewLine)) return true;
        if (ts.isPartiallyEmittedExpression(node)) {
            if (node.pos !== node.expression.pos) {
                if (ts.some(ts.getTrailingCommentRanges(currentSourceFile.text, node.expression.pos), commentWillEmitNewLine)) return true;
            }
            return willEmitLeadingNewLine(node.expression);
        }
        return false;
    }

    /**
     * Wraps an expression in parens if we would emit a leading comment that would introduce a line separator
     * between the node and its parent.
     */
    function parenthesizeExpressionForNoAsi(node: ts.Expression) {
        if (!commentsDisabled && ts.isPartiallyEmittedExpression(node) && willEmitLeadingNewLine(node)) {
            const parseNode = ts.getParseTreeNode(node);
            if (parseNode && ts.isParenthesizedExpression(parseNode)) {
                // If the original node was a parenthesized expression, restore it to preserve comment and source map emit
                const parens = ts.factory.createParenthesizedExpression(node.expression);
                ts.setOriginalNode(parens, node);
                ts.setTextRange(parens, parseNode);
                return parens;
            }
            return ts.factory.createParenthesizedExpression(node);
        }
        return node;
    }

    function parenthesizeExpressionForNoAsiAndDisallowedComma(node: ts.Expression) {
        return parenthesizeExpressionForNoAsi(parenthesizer.parenthesizeExpressionForDisallowedComma(node));
    }

    function emitReturnStatement(node: ts.ReturnStatement) {
        emitTokenWithComment(ts.SyntaxKind.ReturnKeyword, node.pos, writeKeyword, /*contextNode*/ node);
        emitExpressionWithLeadingSpace(node.expression && parenthesizeExpressionForNoAsi(node.expression), parenthesizeExpressionForNoAsi);
        writeTrailingSemicolon();
    }

    function emitWithStatement(node: ts.WithStatement) {
        const openParenPos = emitTokenWithComment(ts.SyntaxKind.WithKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(ts.SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitExpression(node.expression);
        emitTokenWithComment(ts.SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        emitEmbeddedStatement(node, node.statement);
    }

    function emitSwitchStatement(node: ts.SwitchStatement) {
        const openParenPos = emitTokenWithComment(ts.SyntaxKind.SwitchKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(ts.SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitExpression(node.expression);
        emitTokenWithComment(ts.SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        writeSpace();
        emit(node.caseBlock);
    }

    function emitLabeledStatement(node: ts.LabeledStatement) {
        emit(node.label);
        emitTokenWithComment(ts.SyntaxKind.ColonToken, node.label.end, writePunctuation, node);
        writeSpace();
        emit(node.statement);
    }

    function emitThrowStatement(node: ts.ThrowStatement) {
        emitTokenWithComment(ts.SyntaxKind.ThrowKeyword, node.pos, writeKeyword, node);
        emitExpressionWithLeadingSpace(parenthesizeExpressionForNoAsi(node.expression), parenthesizeExpressionForNoAsi);
        writeTrailingSemicolon();
    }

    function emitTryStatement(node: ts.TryStatement) {
        emitTokenWithComment(ts.SyntaxKind.TryKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emit(node.tryBlock);
        if (node.catchClause) {
            writeLineOrSpace(node, node.tryBlock, node.catchClause);
            emit(node.catchClause);
        }
        if (node.finallyBlock) {
            writeLineOrSpace(node, node.catchClause || node.tryBlock, node.finallyBlock);
            emitTokenWithComment(ts.SyntaxKind.FinallyKeyword, (node.catchClause || node.tryBlock).end, writeKeyword, node);
            writeSpace();
            emit(node.finallyBlock);
        }
    }

    function emitDebuggerStatement(node: ts.DebuggerStatement) {
        writeToken(ts.SyntaxKind.DebuggerKeyword, node.pos, writeKeyword);
        writeTrailingSemicolon();
    }

    //
    // Declarations
    //

    function emitVariableDeclaration(node: ts.VariableDeclaration) {
        emit(node.name);
        emit(node.exclamationToken);
        emitTypeAnnotation(node.type);
        emitInitializer(node.initializer, node.type?.end ?? node.name.emitNode?.typeNode?.end ?? node.name.end, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitVariableDeclarationList(node: ts.VariableDeclarationList) {
        writeKeyword(ts.isLet(node) ? "let" : ts.isVarConst(node) ? "const" : "var");
        writeSpace();
        emitList(node, node.declarations, ts.ListFormat.VariableDeclarationList);
    }

    function emitFunctionDeclaration(node: ts.FunctionDeclaration) {
        emitFunctionDeclarationOrExpression(node);
    }

    function emitFunctionDeclarationOrExpression(node: ts.FunctionDeclaration | ts.FunctionExpression) {
        emitModifiers(node, node.modifiers);
        writeKeyword("function");
        emit(node.asteriskToken);
        writeSpace();
        emitIdentifierName(node.name);
        emitSignatureAndBody(node, emitSignatureHead);
    }

    function emitSignatureAndBody(node: ts.FunctionLikeDeclaration, emitSignatureHead: (node: ts.SignatureDeclaration) => void) {
        const body = node.body;
        if (body) {
            if (ts.isBlock(body)) {
                const indentedFlag = ts.getEmitFlags(node) & ts.EmitFlags.Indented;
                if (indentedFlag) {
                    increaseIndent();
                }

                pushNameGenerationScope(node);
                ts.forEach(node.parameters, generateNames);
                generateNames(node.body);

                emitSignatureHead(node);
                emitBlockFunctionBody(body);
                popNameGenerationScope(node);

                if (indentedFlag) {
                    decreaseIndent();
                }
            }
            else {
                emitSignatureHead(node);
                writeSpace();
                emitExpression(body, parenthesizer.parenthesizeConciseBodyOfArrowFunction);
            }
        }
        else {
            emitSignatureHead(node);
            writeTrailingSemicolon();
        }

    }

    function emitSignatureHead(node: ts.FunctionDeclaration | ts.FunctionExpression | ts.MethodDeclaration | ts.AccessorDeclaration | ts.ConstructorDeclaration) {
        emitTypeParameters(node, node.typeParameters);
        emitParameters(node, node.parameters);
        emitTypeAnnotation(node.type);
    }

    function shouldEmitBlockFunctionBodyOnSingleLine(body: ts.Block) {
        // We must emit a function body as a single-line body in the following case:
        // * The body has NodeEmitFlags.SingleLine specified.

        // We must emit a function body as a multi-line body in the following cases:
        // * The body is explicitly marked as multi-line.
        // * A non-synthesized body's start and end position are on different lines.
        // * Any statement in the body starts on a new line.

        if (ts.getEmitFlags(body) & ts.EmitFlags.SingleLine) {
            return true;
        }

        if (body.multiLine) {
            return false;
        }

        if (!ts.nodeIsSynthesized(body) && currentSourceFile && !ts.rangeIsOnSingleLine(body, currentSourceFile)) {
            return false;
        }

        if (getLeadingLineTerminatorCount(body, ts.firstOrUndefined(body.statements), ts.ListFormat.PreserveLines)
            || getClosingLineTerminatorCount(body, ts.lastOrUndefined(body.statements), ts.ListFormat.PreserveLines, body.statements)) {
            return false;
        }

        let previousStatement: ts.Statement | undefined;
        for (const statement of body.statements) {
            if (getSeparatingLineTerminatorCount(previousStatement, statement, ts.ListFormat.PreserveLines) > 0) {
                return false;
            }

            previousStatement = statement;
        }

        return true;
    }

    function emitBlockFunctionBody(body: ts.Block) {
        onBeforeEmitNode?.(body);
        writeSpace();
        writePunctuation("{");
        increaseIndent();

        const emitBlockFunctionBody = shouldEmitBlockFunctionBodyOnSingleLine(body)
            ? emitBlockFunctionBodyOnSingleLine
            : emitBlockFunctionBodyWorker;

        emitBodyWithDetachedComments(body, body.statements, emitBlockFunctionBody);

        decreaseIndent();
        writeToken(ts.SyntaxKind.CloseBraceToken, body.statements.end, writePunctuation, body);
        onAfterEmitNode?.(body);
    }

    function emitBlockFunctionBodyOnSingleLine(body: ts.Block) {
        emitBlockFunctionBodyWorker(body, /*emitBlockFunctionBodyOnSingleLine*/ true);
    }

    function emitBlockFunctionBodyWorker(body: ts.Block, emitBlockFunctionBodyOnSingleLine?: boolean) {
        // Emit all the prologue directives (like "use strict").
        const statementOffset = emitPrologueDirectives(body.statements);
        const pos = writer.getTextPos();
        emitHelpers(body);
        if (statementOffset === 0 && pos === writer.getTextPos() && emitBlockFunctionBodyOnSingleLine) {
            decreaseIndent();
            emitList(body, body.statements, ts.ListFormat.SingleLineFunctionBodyStatements);
            increaseIndent();
        }
        else {
            emitList(body, body.statements, ts.ListFormat.MultiLineFunctionBodyStatements, /*parenthesizerRule*/ undefined, statementOffset);
        }
    }

    function emitClassDeclaration(node: ts.ClassDeclaration) {
        emitClassDeclarationOrExpression(node);
    }

    function emitClassDeclarationOrExpression(node: ts.ClassDeclaration | ts.ClassExpression) {
        ts.forEach(node.members, generateMemberNames);

        emitDecoratorsAndModifiers(node, node.modifiers);
        writeKeyword("class");
        if (node.name) {
            writeSpace();
            emitIdentifierName(node.name);
        }

        const indentedFlag = ts.getEmitFlags(node) & ts.EmitFlags.Indented;
        if (indentedFlag) {
            increaseIndent();
        }

        emitTypeParameters(node, node.typeParameters);
        emitList(node, node.heritageClauses, ts.ListFormat.ClassHeritageClauses);

        writeSpace();
        writePunctuation("{");
        emitList(node, node.members, ts.ListFormat.ClassMembers);
        writePunctuation("}");

        if (indentedFlag) {
            decreaseIndent();
        }
    }

    function emitInterfaceDeclaration(node: ts.InterfaceDeclaration) {
        emitModifiers(node, node.modifiers);
        writeKeyword("interface");
        writeSpace();
        emit(node.name);
        emitTypeParameters(node, node.typeParameters);
        emitList(node, node.heritageClauses, ts.ListFormat.HeritageClauses);
        writeSpace();
        writePunctuation("{");
        emitList(node, node.members, ts.ListFormat.InterfaceMembers);
        writePunctuation("}");
    }

    function emitTypeAliasDeclaration(node: ts.TypeAliasDeclaration) {
        emitModifiers(node, node.modifiers);
        writeKeyword("type");
        writeSpace();
        emit(node.name);
        emitTypeParameters(node, node.typeParameters);
        writeSpace();
        writePunctuation("=");
        writeSpace();
        emit(node.type);
        writeTrailingSemicolon();
    }

    function emitEnumDeclaration(node: ts.EnumDeclaration) {
        emitModifiers(node, node.modifiers);
        writeKeyword("enum");
        writeSpace();
        emit(node.name);

        writeSpace();
        writePunctuation("{");
        emitList(node, node.members, ts.ListFormat.EnumMembers);
        writePunctuation("}");
    }

    function emitModuleDeclaration(node: ts.ModuleDeclaration) {
        emitModifiers(node, node.modifiers);
        if (~node.flags & ts.NodeFlags.GlobalAugmentation) {
            writeKeyword(node.flags & ts.NodeFlags.Namespace ? "namespace" : "module");
            writeSpace();
        }
        emit(node.name);

        let body = node.body;
        if (!body) return writeTrailingSemicolon();
        while (body && ts.isModuleDeclaration(body)) {
            writePunctuation(".");
            emit(body.name);
            body = body.body;
        }

        writeSpace();
        emit(body);
    }

    function emitModuleBlock(node: ts.ModuleBlock) {
        pushNameGenerationScope(node);
        ts.forEach(node.statements, generateNames);
        emitBlockStatements(node, /*forceSingleLine*/ isEmptyBlock(node));
        popNameGenerationScope(node);
    }

    function emitCaseBlock(node: ts.CaseBlock) {
        emitTokenWithComment(ts.SyntaxKind.OpenBraceToken, node.pos, writePunctuation, node);
        emitList(node, node.clauses, ts.ListFormat.CaseBlockClauses);
        emitTokenWithComment(ts.SyntaxKind.CloseBraceToken, node.clauses.end, writePunctuation, node, /*indentLeading*/ true);
    }

    function emitImportEqualsDeclaration(node: ts.ImportEqualsDeclaration) {
        emitModifiers(node, node.modifiers);
        emitTokenWithComment(ts.SyntaxKind.ImportKeyword, node.modifiers ? node.modifiers.end : node.pos, writeKeyword, node);
        writeSpace();
        if (node.isTypeOnly) {
            emitTokenWithComment(ts.SyntaxKind.TypeKeyword, node.pos, writeKeyword, node);
            writeSpace();
        }
        emit(node.name);
        writeSpace();
        emitTokenWithComment(ts.SyntaxKind.EqualsToken, node.name.end, writePunctuation, node);
        writeSpace();
        emitModuleReference(node.moduleReference);
        writeTrailingSemicolon();
    }

    function emitModuleReference(node: ts.ModuleReference) {
        if (node.kind === ts.SyntaxKind.Identifier) {
            emitExpression(node);
        }
        else {
            emit(node);
        }
    }

    function emitImportDeclaration(node: ts.ImportDeclaration) {
        emitModifiers(node, node.modifiers);
        emitTokenWithComment(ts.SyntaxKind.ImportKeyword, node.modifiers ? node.modifiers.end : node.pos, writeKeyword, node);
        writeSpace();
        if (node.importClause) {
            emit(node.importClause);
            writeSpace();
            emitTokenWithComment(ts.SyntaxKind.FromKeyword, node.importClause.end, writeKeyword, node);
            writeSpace();
        }
        emitExpression(node.moduleSpecifier);
        if (node.assertClause) {
            emitWithLeadingSpace(node.assertClause);
        }
        writeTrailingSemicolon();
    }

    function emitImportClause(node: ts.ImportClause) {
        if (node.isTypeOnly) {
            emitTokenWithComment(ts.SyntaxKind.TypeKeyword, node.pos, writeKeyword, node);
            writeSpace();
        }
        emit(node.name);
        if (node.name && node.namedBindings) {
            emitTokenWithComment(ts.SyntaxKind.CommaToken, node.name.end, writePunctuation, node);
            writeSpace();
        }
        emit(node.namedBindings);
    }

    function emitNamespaceImport(node: ts.NamespaceImport) {
        const asPos = emitTokenWithComment(ts.SyntaxKind.AsteriskToken, node.pos, writePunctuation, node);
        writeSpace();
        emitTokenWithComment(ts.SyntaxKind.AsKeyword, asPos, writeKeyword, node);
        writeSpace();
        emit(node.name);
    }

    function emitNamedImports(node: ts.NamedImports) {
        emitNamedImportsOrExports(node);
    }

    function emitImportSpecifier(node: ts.ImportSpecifier) {
        emitImportOrExportSpecifier(node);
    }

    function emitExportAssignment(node: ts.ExportAssignment) {
        const nextPos = emitTokenWithComment(ts.SyntaxKind.ExportKeyword, node.pos, writeKeyword, node);
        writeSpace();
        if (node.isExportEquals) {
            emitTokenWithComment(ts.SyntaxKind.EqualsToken, nextPos, writeOperator, node);
        }
        else {
            emitTokenWithComment(ts.SyntaxKind.DefaultKeyword, nextPos, writeKeyword, node);
        }
        writeSpace();
        emitExpression(node.expression, node.isExportEquals ?
            parenthesizer.getParenthesizeRightSideOfBinaryForOperator(ts.SyntaxKind.EqualsToken) :
            parenthesizer.parenthesizeExpressionOfExportDefault);
        writeTrailingSemicolon();
    }

    function emitExportDeclaration(node: ts.ExportDeclaration) {
        emitModifiers(node, node.modifiers);
        let nextPos = emitTokenWithComment(ts.SyntaxKind.ExportKeyword, node.pos, writeKeyword, node);
        writeSpace();
        if (node.isTypeOnly) {
            nextPos = emitTokenWithComment(ts.SyntaxKind.TypeKeyword, nextPos, writeKeyword, node);
            writeSpace();
        }
        if (node.exportClause) {
            emit(node.exportClause);
        }
        else {
            nextPos = emitTokenWithComment(ts.SyntaxKind.AsteriskToken, nextPos, writePunctuation, node);
        }
        if (node.moduleSpecifier) {
            writeSpace();
            const fromPos = node.exportClause ? node.exportClause.end : nextPos;
            emitTokenWithComment(ts.SyntaxKind.FromKeyword, fromPos, writeKeyword, node);
            writeSpace();
            emitExpression(node.moduleSpecifier);
        }
        if (node.assertClause) {
            emitWithLeadingSpace(node.assertClause);
        }
        writeTrailingSemicolon();
    }

    function emitAssertClause(node: ts.AssertClause) {
        emitTokenWithComment(ts.SyntaxKind.AssertKeyword, node.pos, writeKeyword, node);
        writeSpace();
        const elements = node.elements;
        emitList(node, elements, ts.ListFormat.ImportClauseEntries);
    }

    function emitAssertEntry(node: ts.AssertEntry) {
        emit(node.name);
        writePunctuation(":");
        writeSpace();

        const value = node.value;
        /** @see {emitPropertyAssignment} */
        if ((ts.getEmitFlags(value) & ts.EmitFlags.NoLeadingComments) === 0) {
            const commentRange = ts.getCommentRange(value);
            emitTrailingCommentsOfPosition(commentRange.pos);
        }
        emit(value);
    }

    function emitNamespaceExportDeclaration(node: ts.NamespaceExportDeclaration) {
        let nextPos = emitTokenWithComment(ts.SyntaxKind.ExportKeyword, node.pos, writeKeyword, node);
        writeSpace();
        nextPos = emitTokenWithComment(ts.SyntaxKind.AsKeyword, nextPos, writeKeyword, node);
        writeSpace();
        nextPos = emitTokenWithComment(ts.SyntaxKind.NamespaceKeyword, nextPos, writeKeyword, node);
        writeSpace();
        emit(node.name);
        writeTrailingSemicolon();
    }

    function emitNamespaceExport(node: ts.NamespaceExport) {
        const asPos = emitTokenWithComment(ts.SyntaxKind.AsteriskToken, node.pos, writePunctuation, node);
        writeSpace();
        emitTokenWithComment(ts.SyntaxKind.AsKeyword, asPos, writeKeyword, node);
        writeSpace();
        emit(node.name);
    }

    function emitNamedExports(node: ts.NamedExports) {
        emitNamedImportsOrExports(node);
    }

    function emitExportSpecifier(node: ts.ExportSpecifier) {
        emitImportOrExportSpecifier(node);
    }

    function emitNamedImportsOrExports(node: ts.NamedImportsOrExports) {
        writePunctuation("{");
        emitList(node, node.elements, ts.ListFormat.NamedImportsOrExportsElements);
        writePunctuation("}");
    }

    function emitImportOrExportSpecifier(node: ts.ImportOrExportSpecifier) {
        if (node.isTypeOnly) {
            writeKeyword("type");
            writeSpace();
        }
        if (node.propertyName) {
            emit(node.propertyName);
            writeSpace();
            emitTokenWithComment(ts.SyntaxKind.AsKeyword, node.propertyName.end, writeKeyword, node);
            writeSpace();
        }

        emit(node.name);
    }

    //
    // Module references
    //

    function emitExternalModuleReference(node: ts.ExternalModuleReference) {
        writeKeyword("require");
        writePunctuation("(");
        emitExpression(node.expression);
        writePunctuation(")");
    }

    //
    // JSX
    //

    function emitJsxElement(node: ts.JsxElement) {
        emit(node.openingElement);
        emitList(node, node.children, ts.ListFormat.JsxElementOrFragmentChildren);
        emit(node.closingElement);
    }

    function emitJsxSelfClosingElement(node: ts.JsxSelfClosingElement) {
        writePunctuation("<");
        emitJsxTagName(node.tagName);
        emitTypeArguments(node, node.typeArguments);
        writeSpace();
        emit(node.attributes);
        writePunctuation("/>");
    }

    function emitJsxFragment(node: ts.JsxFragment) {
        emit(node.openingFragment);
        emitList(node, node.children, ts.ListFormat.JsxElementOrFragmentChildren);
        emit(node.closingFragment);
    }

    function emitJsxOpeningElementOrFragment(node: ts.JsxOpeningElement | ts.JsxOpeningFragment) {
        writePunctuation("<");

        if (ts.isJsxOpeningElement(node)) {
            const indented = writeLineSeparatorsAndIndentBefore(node.tagName, node);
            emitJsxTagName(node.tagName);
            emitTypeArguments(node, node.typeArguments);
            if (node.attributes.properties && node.attributes.properties.length > 0) {
                writeSpace();
            }
            emit(node.attributes);
            writeLineSeparatorsAfter(node.attributes, node);
            decreaseIndentIf(indented);
        }

        writePunctuation(">");
    }

    function emitJsxText(node: ts.JsxText) {
        writer.writeLiteral(node.text);
    }

    function emitJsxClosingElementOrFragment(node: ts.JsxClosingElement | ts.JsxClosingFragment) {
        writePunctuation("</");
        if (ts.isJsxClosingElement(node)) {
            emitJsxTagName(node.tagName);
        }
        writePunctuation(">");
    }

    function emitJsxAttributes(node: ts.JsxAttributes) {
        emitList(node, node.properties, ts.ListFormat.JsxElementAttributes);
    }

    function emitJsxAttribute(node: ts.JsxAttribute) {
        emit(node.name);
        emitNodeWithPrefix("=", writePunctuation, node.initializer, emitJsxAttributeValue);
    }

    function emitJsxSpreadAttribute(node: ts.JsxSpreadAttribute) {
        writePunctuation("{...");
        emitExpression(node.expression);
        writePunctuation("}");
    }

    function hasTrailingCommentsAtPosition(pos: number) {
        let result = false;
        ts.forEachTrailingCommentRange(currentSourceFile?.text || "", pos + 1, () => result = true);
        return result;
    }

    function hasLeadingCommentsAtPosition(pos: number) {
        let result = false;
        ts.forEachLeadingCommentRange(currentSourceFile?.text || "", pos + 1, () => result = true);
        return result;
    }

    function hasCommentsAtPosition(pos: number) {
        return hasTrailingCommentsAtPosition(pos) || hasLeadingCommentsAtPosition(pos);
    }

    function emitJsxExpression(node: ts.JsxExpression) {
        if (node.expression || (!commentsDisabled && !ts.nodeIsSynthesized(node) && hasCommentsAtPosition(node.pos))) { // preserve empty expressions if they contain comments!
            const isMultiline = currentSourceFile && !ts.nodeIsSynthesized(node) && ts.getLineAndCharacterOfPosition(currentSourceFile, node.pos).line !== ts.getLineAndCharacterOfPosition(currentSourceFile, node.end).line;
            if (isMultiline) {
                writer.increaseIndent();
            }
            const end = emitTokenWithComment(ts.SyntaxKind.OpenBraceToken, node.pos, writePunctuation, node);
            emit(node.dotDotDotToken);
            emitExpression(node.expression);
            emitTokenWithComment(ts.SyntaxKind.CloseBraceToken, node.expression?.end || end, writePunctuation, node);
            if (isMultiline) {
                writer.decreaseIndent();
            }
        }
    }

    function emitJsxTagName(node: ts.JsxTagNameExpression) {
        if (node.kind === ts.SyntaxKind.Identifier) {
            emitExpression(node);
        }
        else {
            emit(node);
        }
    }

    //
    // Clauses
    //

    function emitCaseClause(node: ts.CaseClause) {
        emitTokenWithComment(ts.SyntaxKind.CaseKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionForDisallowedComma);

        emitCaseOrDefaultClauseRest(node, node.statements, node.expression.end);
    }

    function emitDefaultClause(node: ts.DefaultClause) {
        const pos = emitTokenWithComment(ts.SyntaxKind.DefaultKeyword, node.pos, writeKeyword, node);
        emitCaseOrDefaultClauseRest(node, node.statements, pos);
    }

    function emitCaseOrDefaultClauseRest(parentNode: ts.Node, statements: ts.NodeArray<ts.Statement>, colonPos: number) {
        const emitAsSingleStatement =
            statements.length === 1 &&
            (
                // treat synthesized nodes as located on the same line for emit purposes
                !currentSourceFile ||
                ts.nodeIsSynthesized(parentNode) ||
                ts.nodeIsSynthesized(statements[0]) ||
                ts.rangeStartPositionsAreOnSameLine(parentNode, statements[0], currentSourceFile)
            );

        let format = ts.ListFormat.CaseOrDefaultClauseStatements;
        if (emitAsSingleStatement) {
            writeToken(ts.SyntaxKind.ColonToken, colonPos, writePunctuation, parentNode);
            writeSpace();
            format &= ~(ts.ListFormat.MultiLine | ts.ListFormat.Indented);
        }
        else {
            emitTokenWithComment(ts.SyntaxKind.ColonToken, colonPos, writePunctuation, parentNode);
        }
        emitList(parentNode, statements, format);
    }

    function emitHeritageClause(node: ts.HeritageClause) {
        writeSpace();
        writeTokenText(node.token, writeKeyword);
        writeSpace();
        emitList(node, node.types, ts.ListFormat.HeritageClauseTypes);
    }

    function emitCatchClause(node: ts.CatchClause) {
        const openParenPos = emitTokenWithComment(ts.SyntaxKind.CatchKeyword, node.pos, writeKeyword, node);
        writeSpace();
        if (node.variableDeclaration) {
            emitTokenWithComment(ts.SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
            emit(node.variableDeclaration);
            emitTokenWithComment(ts.SyntaxKind.CloseParenToken, node.variableDeclaration.end, writePunctuation, node);
            writeSpace();
        }
        emit(node.block);
    }

    //
    // Property assignments
    //

    function emitPropertyAssignment(node: ts.PropertyAssignment) {
        emit(node.name);
        writePunctuation(":");
        writeSpace();
        // This is to ensure that we emit comment in the following case:
        //      For example:
        //          obj = {
        //              id: /*comment1*/ ()=>void
        //          }
        // "comment1" is not considered to be leading comment for node.initializer
        // but rather a trailing comment on the previous node.
        const initializer = node.initializer;
        if ((ts.getEmitFlags(initializer) & ts.EmitFlags.NoLeadingComments) === 0) {
            const commentRange = ts.getCommentRange(initializer);
            emitTrailingCommentsOfPosition(commentRange.pos);
        }
        emitExpression(initializer, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitShorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment) {
        emit(node.name);
        if (node.objectAssignmentInitializer) {
            writeSpace();
            writePunctuation("=");
            writeSpace();
            emitExpression(node.objectAssignmentInitializer, parenthesizer.parenthesizeExpressionForDisallowedComma);
        }
    }

    function emitSpreadAssignment(node: ts.SpreadAssignment) {
        if (node.expression) {
            emitTokenWithComment(ts.SyntaxKind.DotDotDotToken, node.pos, writePunctuation, node);
            emitExpression(node.expression, parenthesizer.parenthesizeExpressionForDisallowedComma);
        }
    }

    //
    // Enum
    //

    function emitEnumMember(node: ts.EnumMember) {
        emit(node.name);
        emitInitializer(node.initializer, node.name.end, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    //
    // JSDoc
    //
    function emitJSDoc(node: ts.JSDoc) {
        write("/**");
        if (node.comment) {
            const text = ts.getTextOfJSDocComment(node.comment);
            if (text) {
                const lines = text.split(/\r\n?|\n/g);
                for (const line of lines) {
                    writeLine();
                    writeSpace();
                    writePunctuation("*");
                    writeSpace();
                    write(line);
                }
            }
        }
        if (node.tags) {
            if (node.tags.length === 1 && node.tags[0].kind === ts.SyntaxKind.JSDocTypeTag && !node.comment) {
                writeSpace();
                emit(node.tags[0]);
            }
            else {
                emitList(node, node.tags, ts.ListFormat.JSDocComment);
            }
        }
        writeSpace();
        write("*/");
    }

    function emitJSDocSimpleTypedTag(tag: ts.JSDocTypeTag | ts.JSDocThisTag | ts.JSDocEnumTag | ts.JSDocReturnTag) {
        emitJSDocTagName(tag.tagName);
        emitJSDocTypeExpression(tag.typeExpression);
        emitJSDocComment(tag.comment);
    }

    function emitJSDocSeeTag(tag: ts.JSDocSeeTag) {
        emitJSDocTagName(tag.tagName);
        emit(tag.name);
        emitJSDocComment(tag.comment);
    }

    function emitJSDocNameReference(node: ts.JSDocNameReference) {
        writeSpace();
        writePunctuation("{");
        emit(node.name);
        writePunctuation("}");
    }

    function emitJSDocHeritageTag(tag: ts.JSDocImplementsTag | ts.JSDocAugmentsTag) {
        emitJSDocTagName(tag.tagName);
        writeSpace();
        writePunctuation("{");
        emit(tag.class);
        writePunctuation("}");
        emitJSDocComment(tag.comment);
    }

    function emitJSDocTemplateTag(tag: ts.JSDocTemplateTag) {
        emitJSDocTagName(tag.tagName);
        emitJSDocTypeExpression(tag.constraint);
        writeSpace();
        emitList(tag, tag.typeParameters, ts.ListFormat.CommaListElements);
        emitJSDocComment(tag.comment);
    }

    function emitJSDocTypedefTag(tag: ts.JSDocTypedefTag) {
        emitJSDocTagName(tag.tagName);
        if (tag.typeExpression) {
            if (tag.typeExpression.kind === ts.SyntaxKind.JSDocTypeExpression) {
                emitJSDocTypeExpression(tag.typeExpression);
            }
            else {
                writeSpace();
                writePunctuation("{");
                write("Object");
                if (tag.typeExpression.isArrayType) {
                    writePunctuation("[");
                    writePunctuation("]");
                }
                writePunctuation("}");
            }
        }
        if (tag.fullName) {
            writeSpace();
            emit(tag.fullName);
        }
        emitJSDocComment(tag.comment);
        if (tag.typeExpression && tag.typeExpression.kind === ts.SyntaxKind.JSDocTypeLiteral) {
            emitJSDocTypeLiteral(tag.typeExpression);
        }
    }

    function emitJSDocCallbackTag(tag: ts.JSDocCallbackTag) {
        emitJSDocTagName(tag.tagName);
        if (tag.name) {
            writeSpace();
            emit(tag.name);
        }
        emitJSDocComment(tag.comment);
        emitJSDocSignature(tag.typeExpression);
    }

    function emitJSDocSimpleTag(tag: ts.JSDocTag) {
        emitJSDocTagName(tag.tagName);
        emitJSDocComment(tag.comment);
    }

    function emitJSDocTypeLiteral(lit: ts.JSDocTypeLiteral) {
        emitList(lit, ts.factory.createNodeArray(lit.jsDocPropertyTags), ts.ListFormat.JSDocComment);
    }

    function emitJSDocSignature(sig: ts.JSDocSignature) {
        if (sig.typeParameters) {
            emitList(sig, ts.factory.createNodeArray(sig.typeParameters), ts.ListFormat.JSDocComment);
        }
        if (sig.parameters) {
            emitList(sig, ts.factory.createNodeArray(sig.parameters), ts.ListFormat.JSDocComment);
        }
        if (sig.type) {
            writeLine();
            writeSpace();
            writePunctuation("*");
            writeSpace();
            emit(sig.type);
        }
    }

    function emitJSDocPropertyLikeTag(param: ts.JSDocPropertyLikeTag) {
        emitJSDocTagName(param.tagName);
        emitJSDocTypeExpression(param.typeExpression);
        writeSpace();
        if (param.isBracketed) {
            writePunctuation("[");
        }
        emit(param.name);
        if (param.isBracketed) {
            writePunctuation("]");
        }
        emitJSDocComment(param.comment);
    }

    function emitJSDocTagName(tagName: ts.Identifier) {
        writePunctuation("@");
        emit(tagName);
    }

    function emitJSDocComment(comment: string | ts.NodeArray<ts.JSDocComment> | undefined) {
        const text = ts.getTextOfJSDocComment(comment);
        if (text) {
            writeSpace();
            write(text);
        }
    }

    function emitJSDocTypeExpression(typeExpression: ts.JSDocTypeExpression | undefined) {
        if (typeExpression) {
            writeSpace();
            writePunctuation("{");
            emit(typeExpression.type);
            writePunctuation("}");
        }
    }

    //
    // Top-level nodes
    //

    function emitSourceFile(node: ts.SourceFile) {
        writeLine();
        const statements = node.statements;
        // Emit detached comment if there are no prologue directives or if the first node is synthesized.
        // The synthesized node will have no leading comment so some comments may be missed.
        const shouldEmitDetachedComment = statements.length === 0 ||
            !ts.isPrologueDirective(statements[0]) ||
            ts.nodeIsSynthesized(statements[0]);
        if (shouldEmitDetachedComment) {
            emitBodyWithDetachedComments(node, statements, emitSourceFileWorker);
            return;
        }
        emitSourceFileWorker(node);
    }

    function emitSyntheticTripleSlashReferencesIfNeeded(node: ts.Bundle) {
        emitTripleSlashDirectives(!!node.hasNoDefaultLib, node.syntheticFileReferences || [], node.syntheticTypeReferences || [], node.syntheticLibReferences || []);
        for (const prepend of node.prepends) {
            if (ts.isUnparsedSource(prepend) && prepend.syntheticReferences) {
                for (const ref of prepend.syntheticReferences) {
                    emit(ref);
                    writeLine();
                }
            }
        }
    }

    function emitTripleSlashDirectivesIfNeeded(node: ts.SourceFile) {
        if (node.isDeclarationFile) emitTripleSlashDirectives(node.hasNoDefaultLib, node.referencedFiles, node.typeReferenceDirectives, node.libReferenceDirectives);
    }

    function emitTripleSlashDirectives(hasNoDefaultLib: boolean, files: readonly ts.FileReference[], types: readonly ts.FileReference[], libs: readonly ts.FileReference[]) {
        if (hasNoDefaultLib) {
            const pos = writer.getTextPos();
            writeComment(`/// <reference no-default-lib="true"/>`);
            if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: ts.BundleFileSectionKind.NoDefaultLib });
            writeLine();
        }
        if (currentSourceFile && currentSourceFile.moduleName) {
            writeComment(`/// <amd-module name="${currentSourceFile.moduleName}" />`);
            writeLine();
        }
        if (currentSourceFile && currentSourceFile.amdDependencies) {
            for (const dep of currentSourceFile.amdDependencies) {
                if (dep.name) {
                    writeComment(`/// <amd-dependency name="${dep.name}" path="${dep.path}" />`);
                }
                else {
                    writeComment(`/// <amd-dependency path="${dep.path}" />`);
                }
                writeLine();
            }
        }
        for (const directive of files) {
            const pos = writer.getTextPos();
            writeComment(`/// <reference path="${directive.fileName}" />`);
            if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: ts.BundleFileSectionKind.Reference, data: directive.fileName });
            writeLine();
        }
        for (const directive of types) {
            const pos = writer.getTextPos();
            const resolutionMode = directive.resolutionMode && directive.resolutionMode !== currentSourceFile?.impliedNodeFormat
                ? `resolution-mode="${directive.resolutionMode === ts.ModuleKind.ESNext ? "import" : "require"}"`
                : "";
            writeComment(`/// <reference types="${directive.fileName}" ${resolutionMode}/>`);
            if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: !directive.resolutionMode ? ts.BundleFileSectionKind.Type : directive.resolutionMode === ts.ModuleKind.ESNext ? ts.BundleFileSectionKind.TypeResolutionModeImport : ts.BundleFileSectionKind.TypeResolutionModeRequire, data: directive.fileName });
            writeLine();
        }
        for (const directive of libs) {
            const pos = writer.getTextPos();
            writeComment(`/// <reference lib="${directive.fileName}" />`);
            if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: ts.BundleFileSectionKind.Lib, data: directive.fileName });
            writeLine();
        }
    }

    function emitSourceFileWorker(node: ts.SourceFile) {
        const statements = node.statements;
        pushNameGenerationScope(node);
        ts.forEach(node.statements, generateNames);
        emitHelpers(node);
        const index = ts.findIndex(statements, statement => !ts.isPrologueDirective(statement));
        emitTripleSlashDirectivesIfNeeded(node);
        emitList(node, statements, ts.ListFormat.MultiLine, /*parenthesizerRule*/ undefined, index === -1 ? statements.length : index);
        popNameGenerationScope(node);
    }

    // Transformation nodes

    function emitPartiallyEmittedExpression(node: ts.PartiallyEmittedExpression) {
        const emitFlags = ts.getEmitFlags(node);
        if (!(emitFlags & ts.EmitFlags.NoLeadingComments) && node.pos !== node.expression.pos) {
            emitTrailingCommentsOfPosition(node.expression.pos);
        }
        emitExpression(node.expression);
        if (!(emitFlags & ts.EmitFlags.NoTrailingComments) && node.end !== node.expression.end) {
            emitLeadingCommentsOfPosition(node.expression.end);
        }
    }

    function emitCommaList(node: ts.CommaListExpression) {
        emitExpressionList(node, node.elements, ts.ListFormat.CommaListElements, /*parenthesizerRule*/ undefined);
    }

    /**
     * Emits any prologue directives at the start of a Statement list, returning the
     * number of prologue directives written to the output.
     */
    function emitPrologueDirectives(statements: readonly ts.Node[], sourceFile?: ts.SourceFile, seenPrologueDirectives?: ts.Set<string>, recordBundleFileSection?: true): number {
        let needsToSetSourceFile = !!sourceFile;
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (ts.isPrologueDirective(statement)) {
                const shouldEmitPrologueDirective = seenPrologueDirectives ? !seenPrologueDirectives.has(statement.expression.text) : true;
                if (shouldEmitPrologueDirective) {
                    if (needsToSetSourceFile) {
                        needsToSetSourceFile = false;
                        setSourceFile(sourceFile);
                    }
                    writeLine();
                    const pos = writer.getTextPos();
                    emit(statement);
                    if (recordBundleFileSection && bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: ts.BundleFileSectionKind.Prologue, data: statement.expression.text });
                    if (seenPrologueDirectives) {
                        seenPrologueDirectives.add(statement.expression.text);
                    }
                }
            }
            else {
                // return index of the first non prologue directive
                return i;
            }
        }

        return statements.length;
    }

    function emitUnparsedPrologues(prologues: readonly ts.UnparsedPrologue[], seenPrologueDirectives: ts.Set<string>) {
        for (const prologue of prologues) {
            if (!seenPrologueDirectives.has(prologue.data)) {
                writeLine();
                const pos = writer.getTextPos();
                emit(prologue);
                if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: ts.BundleFileSectionKind.Prologue, data: prologue.data });
                if (seenPrologueDirectives) {
                    seenPrologueDirectives.add(prologue.data);
                }
            }
        }
    }

    function emitPrologueDirectivesIfNeeded(sourceFileOrBundle: ts.Bundle | ts.SourceFile) {
        if (ts.isSourceFile(sourceFileOrBundle)) {
            emitPrologueDirectives(sourceFileOrBundle.statements, sourceFileOrBundle);
        }
        else {
            const seenPrologueDirectives = new ts.Set<string>();
            for (const prepend of sourceFileOrBundle.prepends) {
                emitUnparsedPrologues((prepend as ts.UnparsedSource).prologues, seenPrologueDirectives);
            }
            for (const sourceFile of sourceFileOrBundle.sourceFiles) {
                emitPrologueDirectives(sourceFile.statements, sourceFile, seenPrologueDirectives, /*recordBundleFileSection*/ true);
            }
            setSourceFile(undefined);
        }
    }

    function getPrologueDirectivesFromBundledSourceFiles(bundle: ts.Bundle): ts.SourceFilePrologueInfo[] | undefined {
        const seenPrologueDirectives = new ts.Set<string>();
        let prologues: ts.SourceFilePrologueInfo[] | undefined;
        for (let index = 0; index < bundle.sourceFiles.length; index++) {
            const sourceFile = bundle.sourceFiles[index];
            let directives: ts.SourceFilePrologueDirective[] | undefined;
            let end = 0;
            for (const statement of sourceFile.statements) {
                if (!ts.isPrologueDirective(statement)) break;
                if (seenPrologueDirectives.has(statement.expression.text)) continue;
                seenPrologueDirectives.add(statement.expression.text);
                (directives || (directives = [])).push({
                    pos: statement.pos,
                    end: statement.end,
                    expression: {
                        pos: statement.expression.pos,
                        end: statement.expression.end,
                        text: statement.expression.text
                    }
                });
                end = end < statement.end ? statement.end : end;
            }
            if (directives) (prologues || (prologues = [])).push({ file: index, text: sourceFile.text.substring(0, end), directives });
        }
        return prologues;
    }

    function emitShebangIfNeeded(sourceFileOrBundle: ts.Bundle | ts.SourceFile | ts.UnparsedSource) {
        if (ts.isSourceFile(sourceFileOrBundle) || ts.isUnparsedSource(sourceFileOrBundle)) {
            const shebang = ts.getShebang(sourceFileOrBundle.text);
            if (shebang) {
                writeComment(shebang);
                writeLine();
                return true;
            }
        }
        else {
            for (const prepend of sourceFileOrBundle.prepends) {
                ts.Debug.assertNode(prepend, ts.isUnparsedSource);
                if (emitShebangIfNeeded(prepend)) {
                    return true;
                }
            }
            for (const sourceFile of sourceFileOrBundle.sourceFiles) {
                // Emit only the first encountered shebang
                if (emitShebangIfNeeded(sourceFile)) {
                    return true;
                }
            }
        }
    }

    //
    // Helpers
    //

    function emitNodeWithWriter(node: ts.Node | undefined, writer: typeof write) {
        if (!node) return;
        const savedWrite = write;
        write = writer;
        emit(node);
        write = savedWrite;
    }

    function emitDecoratorsAndModifiers(node: ts.Node, modifiers: ts.NodeArray<ts.ModifierLike> | undefined) {
        if (modifiers?.length) {
            if (ts.every(modifiers, ts.isModifier)) {
                // if all modifier-likes are `Modifier`, simply emit the array as modifiers.
                return emitModifiers(node, modifiers as ts.NodeArray<ts.Modifier>);
            }

            if (ts.every(modifiers, ts.isDecorator)) {
                // if all modifier-likes are `Decorator`, simply emit the array as decorators.
                return emitDecorators(node, modifiers as ts.NodeArray<ts.Decorator>);
            }

            onBeforeEmitNodeArray?.(modifiers);

            // partition modifiers into contiguous chunks of `Modifier` or `Decorator`
            let lastMode: "modifiers" | "decorators" | undefined;
            let mode: "modifiers" | "decorators" | undefined;
            let start = 0;
            let pos = 0;
            while (start < modifiers.length) {
                while (pos < modifiers.length) {
                    const modifier = modifiers[pos];
                    mode = ts.isDecorator(modifier) ? "decorators" : "modifiers";
                    if (lastMode === undefined) {
                        lastMode = mode;
                    }
                    else if (mode !== lastMode) {
                        break;
                    }

                    pos++;
                }

                const textRange: ts.TextRange = { pos: -1, end: -1 };
                if (start === 0) textRange.pos = modifiers.pos;
                if (pos === modifiers.length - 1) textRange.end = modifiers.end;
                emitNodeListItems(
                    emit,
                    node,
                    modifiers,
                    lastMode === "modifiers" ? ts.ListFormat.Modifiers : ts.ListFormat.Decorators,
                    /*parenthesizerRule*/ undefined,
                    start,
                    pos - start,
                    /*hasTrailingComma*/ false,
                    textRange);
                start = pos;
                lastMode = mode;
                pos++;
            }

            onAfterEmitNodeArray?.(modifiers);
        }
    }

    function emitModifiers(node: ts.Node, modifiers: ts.NodeArray<ts.Modifier> | undefined): void {
        emitList(node, modifiers, ts.ListFormat.Modifiers);
    }

    function emitTypeAnnotation(node: ts.TypeNode | undefined) {
        if (node) {
            writePunctuation(":");
            writeSpace();
            emit(node);
        }
    }

    function emitInitializer(node: ts.Expression | undefined, equalCommentStartPos: number, container: ts.Node, parenthesizerRule?: (node: ts.Expression) => ts.Expression) {
        if (node) {
            writeSpace();
            emitTokenWithComment(ts.SyntaxKind.EqualsToken, equalCommentStartPos, writeOperator, container);
            writeSpace();
            emitExpression(node, parenthesizerRule);
        }
    }

    function emitNodeWithPrefix<T extends ts.Node>(prefix: string, prefixWriter: (s: string) => void, node: T | undefined, emit: (node: T) => void) {
        if (node) {
            prefixWriter(prefix);
            emit(node);
        }
    }

    function emitWithLeadingSpace(node: ts.Node | undefined) {
        if (node) {
            writeSpace();
            emit(node);
        }
    }

    function emitExpressionWithLeadingSpace(node: ts.Expression | undefined, parenthesizerRule?: (node: ts.Expression) => ts.Expression) {
        if (node) {
            writeSpace();
            emitExpression(node, parenthesizerRule);
        }
    }

    function emitWithTrailingSpace(node: ts.Node | undefined) {
        if (node) {
            emit(node);
            writeSpace();
        }
    }

    function emitEmbeddedStatement(parent: ts.Node, node: ts.Statement) {
        if (ts.isBlock(node) || ts.getEmitFlags(parent) & ts.EmitFlags.SingleLine) {
            writeSpace();
            emit(node);
        }
        else {
            writeLine();
            increaseIndent();
            if (ts.isEmptyStatement(node)) {
                pipelineEmit(ts.EmitHint.EmbeddedStatement, node);
            }
            else {
                emit(node);
            }
            decreaseIndent();
        }
    }

    function emitDecorators(parentNode: ts.Node, decorators: ts.NodeArray<ts.Decorator> | undefined): void {
        emitList(parentNode, decorators, ts.ListFormat.Decorators);
    }

    function emitTypeArguments(parentNode: ts.Node, typeArguments: ts.NodeArray<ts.TypeNode> | undefined) {
        emitList(parentNode, typeArguments, ts.ListFormat.TypeArguments, typeArgumentParenthesizerRuleSelector);
    }

    function emitTypeParameters(parentNode: ts.SignatureDeclaration | ts.InterfaceDeclaration | ts.TypeAliasDeclaration | ts.ClassDeclaration | ts.ClassExpression, typeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined) {
        if (ts.isFunctionLike(parentNode) && parentNode.typeArguments) { // Quick info uses type arguments in place of type parameters on instantiated signatures
            return emitTypeArguments(parentNode, parentNode.typeArguments);
        }
        emitList(parentNode, typeParameters, ts.ListFormat.TypeParameters);
    }

    function emitParameters(parentNode: ts.Node, parameters: ts.NodeArray<ts.ParameterDeclaration>) {
        emitList(parentNode, parameters, ts.ListFormat.Parameters);
    }

    function canEmitSimpleArrowHead(parentNode: ts.FunctionTypeNode | ts.ArrowFunction, parameters: ts.NodeArray<ts.ParameterDeclaration>) {
        const parameter = ts.singleOrUndefined(parameters);
        return parameter
            && parameter.pos === parentNode.pos // may not have parsed tokens between parent and parameter
            && ts.isArrowFunction(parentNode)      // only arrow functions may have simple arrow head
            && !parentNode.type                 // arrow function may not have return type annotation
            && !ts.some(parentNode.modifiers)      // parent may not have decorators or modifiers
            && !ts.some(parentNode.typeParameters) // parent may not have type parameters
            && !ts.some(parameter.modifiers)       // parameter may not have decorators or modifiers
            && !parameter.dotDotDotToken        // parameter may not be rest
            && !parameter.questionToken         // parameter may not be optional
            && !parameter.type                  // parameter may not have a type annotation
            && !parameter.initializer           // parameter may not have an initializer
            && ts.isIdentifier(parameter.name);    // parameter name must be identifier
    }

    function emitParametersForArrow(parentNode: ts.FunctionTypeNode | ts.ArrowFunction, parameters: ts.NodeArray<ts.ParameterDeclaration>) {
        if (canEmitSimpleArrowHead(parentNode, parameters)) {
            emitList(parentNode, parameters, ts.ListFormat.Parameters & ~ts.ListFormat.Parenthesis);
        }
        else {
            emitParameters(parentNode, parameters);
        }
    }

    function emitParametersForIndexSignature(parentNode: ts.Node, parameters: ts.NodeArray<ts.ParameterDeclaration>) {
        emitList(parentNode, parameters, ts.ListFormat.IndexSignatureParameters);
    }

    function writeDelimiter(format: ts.ListFormat) {
        switch (format & ts.ListFormat.DelimitersMask) {
            case ts.ListFormat.None:
                break;
            case ts.ListFormat.CommaDelimited:
                writePunctuation(",");
                break;
            case ts.ListFormat.BarDelimited:
                writeSpace();
                writePunctuation("|");
                break;
            case ts.ListFormat.AsteriskDelimited:
                writeSpace();
                writePunctuation("*");
                writeSpace();
                break;
            case ts.ListFormat.AmpersandDelimited:
                writeSpace();
                writePunctuation("&");
                break;
        }
    }

    function emitList(parentNode: ts.Node | undefined, children: ts.NodeArray<ts.Node> | undefined, format: ts.ListFormat, parenthesizerRule?: ParenthesizerRuleOrSelector<ts.Node>, start?: number, count?: number) {
        emitNodeList(emit, parentNode, children, format, parenthesizerRule, start, count);
    }

    function emitExpressionList(parentNode: ts.Node | undefined, children: ts.NodeArray<ts.Node> | undefined, format: ts.ListFormat, parenthesizerRule?: ParenthesizerRuleOrSelector<ts.Expression>, start?: number, count?: number) {
        emitNodeList(emitExpression, parentNode, children, format, parenthesizerRule, start, count);
    }

    function emitNodeList(emit: (node: ts.Node, parenthesizerRule?: ((node: ts.Node) => ts.Node) | undefined) => void, parentNode: ts.Node | undefined, children: ts.NodeArray<ts.Node> | undefined, format: ts.ListFormat, parenthesizerRule: ParenthesizerRuleOrSelector<ts.Node> | undefined, start = 0, count = children ? children.length - start : 0) {
        const isUndefined = children === undefined;
        if (isUndefined && format & ts.ListFormat.OptionalIfUndefined) {
            return;
        }

        const isEmpty = children === undefined || start >= children.length || count === 0;
        if (isEmpty && format & ts.ListFormat.OptionalIfEmpty) {
            onBeforeEmitNodeArray?.(children);
            onAfterEmitNodeArray?.(children);
            return;
        }

        if (format & ts.ListFormat.BracketsMask) {
            writePunctuation(getOpeningBracket(format));
            if (isEmpty && children) {
                emitTrailingCommentsOfPosition(children.pos, /*prefixSpace*/ true); // Emit comments within empty bracketed lists
            }
        }

        onBeforeEmitNodeArray?.(children);

        if (isEmpty) {
            // Write a line terminator if the parent node was multi-line
            if (format & ts.ListFormat.MultiLine && !(preserveSourceNewlines && (!parentNode || currentSourceFile && ts.rangeIsOnSingleLine(parentNode, currentSourceFile)))) {
                writeLine();
            }
            else if (format & ts.ListFormat.SpaceBetweenBraces && !(format & ts.ListFormat.NoSpaceIfEmpty)) {
                writeSpace();
            }
        }
        else {
            emitNodeListItems(emit, parentNode, children, format, parenthesizerRule, start, count, children.hasTrailingComma, children);
        }

        onAfterEmitNodeArray?.(children);

        if (format & ts.ListFormat.BracketsMask) {
            if (isEmpty && children) {
                emitLeadingCommentsOfPosition(children.end); // Emit leading comments within empty lists
            }
            writePunctuation(getClosingBracket(format));
        }
    }

    /**
     * Emits a list without brackets or raising events.
     *
     * NOTE: You probably don't want to call this directly and should be using `emitList` or `emitExpressionList` instead.
     */
    function emitNodeListItems(emit: (node: ts.Node, parenthesizerRule?: ((node: ts.Node) => ts.Node) | undefined) => void, parentNode: ts.Node | undefined, children: readonly ts.Node[], format: ts.ListFormat, parenthesizerRule: ParenthesizerRuleOrSelector<ts.Node> | undefined, start: number, count: number, hasTrailingComma: boolean, childrenTextRange: ts.TextRange | undefined) {
        // Write the opening line terminator or leading whitespace.
        const mayEmitInterveningComments = (format & ts.ListFormat.NoInterveningComments) === 0;
        let shouldEmitInterveningComments = mayEmitInterveningComments;

        const leadingLineTerminatorCount = getLeadingLineTerminatorCount(parentNode, children[start], format);
        if (leadingLineTerminatorCount) {
            writeLine(leadingLineTerminatorCount);
            shouldEmitInterveningComments = false;
        }
        else if (format & ts.ListFormat.SpaceBetweenBraces) {
            writeSpace();
        }

        // Increase the indent, if requested.
        if (format & ts.ListFormat.Indented) {
            increaseIndent();
        }

        const emitListItem = getEmitListItem(emit, parenthesizerRule);

        // Emit each child.
        let previousSibling: ts.Node | undefined;
        let previousSourceFileTextKind: ReturnType<typeof recordBundleFileInternalSectionStart>;
        let shouldDecreaseIndentAfterEmit = false;
        for (let i = 0; i < count; i++) {
            const child = children[start + i];

            // Write the delimiter if this is not the first node.
            if (format & ts.ListFormat.AsteriskDelimited) {
                // always write JSDoc in the format "\n *"
                writeLine();
                writeDelimiter(format);
            }
            else if (previousSibling) {
                // i.e
                //      function commentedParameters(
                //          /* Parameter a */
                //          a
                //          /* End of parameter a */ -> this comment isn't considered to be trailing comment of parameter "a" due to newline
                //          ,
                if (format & ts.ListFormat.DelimitersMask && previousSibling.end !== (parentNode ? parentNode.end : -1)) {
                    emitLeadingCommentsOfPosition(previousSibling.end);
                }
                writeDelimiter(format);
                recordBundleFileInternalSectionEnd(previousSourceFileTextKind);

                // Write either a line terminator or whitespace to separate the elements.
                const separatingLineTerminatorCount = getSeparatingLineTerminatorCount(previousSibling, child, format);
                if (separatingLineTerminatorCount > 0) {
                    // If a synthesized node in a single-line list starts on a new
                    // line, we should increase the indent.
                    if ((format & (ts.ListFormat.LinesMask | ts.ListFormat.Indented)) === ts.ListFormat.SingleLine) {
                        increaseIndent();
                        shouldDecreaseIndentAfterEmit = true;
                    }

                    writeLine(separatingLineTerminatorCount);
                    shouldEmitInterveningComments = false;
                }
                else if (previousSibling && format & ts.ListFormat.SpaceBetweenSiblings) {
                    writeSpace();
                }
            }

            // Emit this child.
            previousSourceFileTextKind = recordBundleFileInternalSectionStart(child);
            if (shouldEmitInterveningComments) {
                const commentRange = ts.getCommentRange(child);
                emitTrailingCommentsOfPosition(commentRange.pos);
            }
            else {
                shouldEmitInterveningComments = mayEmitInterveningComments;
            }

            nextListElementPos = child.pos;
            emitListItem(child, emit, parenthesizerRule, i);

            if (shouldDecreaseIndentAfterEmit) {
                decreaseIndent();
                shouldDecreaseIndentAfterEmit = false;
            }

            previousSibling = child;
        }

        // Write a trailing comma, if requested.
        const emitFlags = previousSibling ? ts.getEmitFlags(previousSibling) : 0;
        const skipTrailingComments = commentsDisabled || !!(emitFlags & ts.EmitFlags.NoTrailingComments);
        const emitTrailingComma = hasTrailingComma && (format & ts.ListFormat.AllowTrailingComma) && (format & ts.ListFormat.CommaDelimited);
        if (emitTrailingComma) {
            if (previousSibling && !skipTrailingComments) {
                emitTokenWithComment(ts.SyntaxKind.CommaToken, previousSibling.end, writePunctuation, previousSibling);
            }
            else {
                writePunctuation(",");
            }
        }

        // Emit any trailing comment of the last element in the list
        // i.e
        //       var array = [...
        //          2
        //          /* end of element 2 */
        //       ];
        if (previousSibling && (parentNode ? parentNode.end : -1) !== previousSibling.end && (format & ts.ListFormat.DelimitersMask) && !skipTrailingComments) {
            emitLeadingCommentsOfPosition(emitTrailingComma && childrenTextRange?.end ? childrenTextRange.end : previousSibling.end);
        }

        // Decrease the indent, if requested.
        if (format & ts.ListFormat.Indented) {
            decreaseIndent();
        }

        recordBundleFileInternalSectionEnd(previousSourceFileTextKind);

        // Write the closing line terminator or closing whitespace.
        const closingLineTerminatorCount = getClosingLineTerminatorCount(parentNode, children[start + count - 1], format, childrenTextRange);
        if (closingLineTerminatorCount) {
            writeLine(closingLineTerminatorCount);
        }
        else if (format & (ts.ListFormat.SpaceAfterList | ts.ListFormat.SpaceBetweenBraces)) {
            writeSpace();
        }
    }

    // Writers

    function writeLiteral(s: string) {
        writer.writeLiteral(s);
    }

    function writeStringLiteral(s: string) {
        writer.writeStringLiteral(s);
    }

    function writeBase(s: string) {
        writer.write(s);
    }

    function writeSymbol(s: string, sym: ts.Symbol) {
        writer.writeSymbol(s, sym);
    }

    function writePunctuation(s: string) {
        writer.writePunctuation(s);
    }

    function writeTrailingSemicolon() {
        writer.writeTrailingSemicolon(";");
    }

    function writeKeyword(s: string) {
        writer.writeKeyword(s);
    }

    function writeOperator(s: string) {
        writer.writeOperator(s);
    }

    function writeParameter(s: string) {
        writer.writeParameter(s);
    }

    function writeComment(s: string) {
        writer.writeComment(s);
    }

    function writeSpace() {
        writer.writeSpace(" ");
    }

    function writeProperty(s: string) {
        writer.writeProperty(s);
    }

    function nonEscapingWrite(s: string) {
        // This should be defined in a snippet-escaping text writer.
        if (writer.nonEscapingWrite) {
            writer.nonEscapingWrite(s);
        }
        else {
            writer.write(s);
        }
    }

    function writeLine(count = 1) {
        for (let i = 0; i < count; i++) {
            writer.writeLine(i > 0);
        }
    }

    function increaseIndent() {
        writer.increaseIndent();
    }

    function decreaseIndent() {
        writer.decreaseIndent();
    }

    function writeToken(token: ts.SyntaxKind, pos: number, writer: (s: string) => void, contextNode?: ts.Node) {
        return !sourceMapsDisabled
            ? emitTokenWithSourceMap(contextNode, token, writer, pos, writeTokenText)
            : writeTokenText(token, writer, pos);
    }

    function writeTokenNode(node: ts.Node, writer: (s: string) => void) {
        if (onBeforeEmitToken) {
            onBeforeEmitToken(node);
        }
        writer(ts.tokenToString(node.kind)!);
        if (onAfterEmitToken) {
            onAfterEmitToken(node);
        }
    }

    function writeTokenText(token: ts.SyntaxKind, writer: (s: string) => void): void;
    function writeTokenText(token: ts.SyntaxKind, writer: (s: string) => void, pos: number): number;
    function writeTokenText(token: ts.SyntaxKind, writer: (s: string) => void, pos?: number): number {
        const tokenString = ts.tokenToString(token)!;
        writer(tokenString);
        return pos! < 0 ? pos! : pos! + tokenString.length;
    }

    function writeLineOrSpace(parentNode: ts.Node, prevChildNode: ts.Node, nextChildNode: ts.Node) {
        if (ts.getEmitFlags(parentNode) & ts.EmitFlags.SingleLine) {
            writeSpace();
        }
        else if (preserveSourceNewlines) {
            const lines = getLinesBetweenNodes(parentNode, prevChildNode, nextChildNode);
            if (lines) {
                writeLine(lines);
            }
            else {
                writeSpace();
            }
        }
        else {
            writeLine();
        }
    }

    function writeLines(text: string): void {
        const lines = text.split(/\r\n?|\n/g);
        const indentation = ts.guessIndentation(lines);
        for (const lineText of lines) {
            const line = indentation ? lineText.slice(indentation) : lineText;
            if (line.length) {
                writeLine();
                write(line);
            }
        }
    }

    function writeLinesAndIndent(lineCount: number, writeSpaceIfNotIndenting: boolean) {
        if (lineCount) {
            increaseIndent();
            writeLine(lineCount);
        }
        else if (writeSpaceIfNotIndenting) {
            writeSpace();
        }
    }

    // Helper function to decrease the indent if we previously indented.  Allows multiple
    // previous indent values to be considered at a time.  This also allows caller to just
    // call this once, passing in all their appropriate indent values, instead of needing
    // to call this helper function multiple times.
    function decreaseIndentIf(value1: boolean | number | undefined, value2?: boolean | number) {
        if (value1) {
            decreaseIndent();
        }
        if (value2) {
            decreaseIndent();
        }
    }

    function getLeadingLineTerminatorCount(parentNode: ts.Node | undefined, firstChild: ts.Node | undefined, format: ts.ListFormat): number {
        if (format & ts.ListFormat.PreserveLines || preserveSourceNewlines) {
            if (format & ts.ListFormat.PreferNewLine) {
                return 1;
            }

            if (firstChild === undefined) {
                return !parentNode || currentSourceFile && ts.rangeIsOnSingleLine(parentNode, currentSourceFile) ? 0 : 1;
            }
            if (firstChild.pos === nextListElementPos) {
                // If this child starts at the beginning of a list item in a parent list, its leading
                // line terminators have already been written as the separating line terminators of the
                // parent list. Example:
                //
                // class Foo {
                //   constructor() {}
                //   public foo() {}
                // }
                //
                // The outer list is the list of class members, with one line terminator between the
                // constructor and the method. The constructor is written, the separating line terminator
                // is written, and then we start emitting the method. Its modifiers ([public]) constitute an inner
                // list, so we look for its leading line terminators. If we didn't know that we had already
                // written a newline as part of the parent list, it would appear that we need to write a
                // leading newline to start the modifiers.
                return 0;
            }
            if (firstChild.kind === ts.SyntaxKind.JsxText) {
                // JsxText will be written with its leading whitespace, so don't add more manually.
                return 0;
            }
            if (currentSourceFile && parentNode &&
                !ts.positionIsSynthesized(parentNode.pos) &&
                !ts.nodeIsSynthesized(firstChild) &&
                (!firstChild.parent || ts.getOriginalNode(firstChild.parent) === ts.getOriginalNode(parentNode))
            ) {
                if (preserveSourceNewlines) {
                    return getEffectiveLines(
                        includeComments => ts.getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(
                            firstChild.pos,
                            parentNode.pos,
                            currentSourceFile!,
                            includeComments));
                }
                return ts.rangeStartPositionsAreOnSameLine(parentNode, firstChild, currentSourceFile) ? 0 : 1;
            }
            if (synthesizedNodeStartsOnNewLine(firstChild, format)) {
                return 1;
            }
        }
        return format & ts.ListFormat.MultiLine ? 1 : 0;
    }

    function getSeparatingLineTerminatorCount(previousNode: ts.Node | undefined, nextNode: ts.Node, format: ts.ListFormat): number {
        if (format & ts.ListFormat.PreserveLines || preserveSourceNewlines) {
            if (previousNode === undefined || nextNode === undefined) {
                return 0;
            }
            if (nextNode.kind === ts.SyntaxKind.JsxText) {
                // JsxText will be written with its leading whitespace, so don't add more manually.
                return 0;
            }
            else if (currentSourceFile && !ts.nodeIsSynthesized(previousNode) && !ts.nodeIsSynthesized(nextNode)) {
                if (preserveSourceNewlines && siblingNodePositionsAreComparable(previousNode, nextNode)) {
                    return getEffectiveLines(
                        includeComments => ts.getLinesBetweenRangeEndAndRangeStart(
                            previousNode,
                            nextNode,
                            currentSourceFile!,
                            includeComments));
                }
                // If `preserveSourceNewlines` is `false` we do not intend to preserve the effective lines between the
                // previous and next node. Instead we naively check whether nodes are on separate lines within the
                // same node parent. If so, we intend to preserve a single line terminator. This is less precise and
                // expensive than checking with `preserveSourceNewlines` as above, but the goal is not to preserve the
                // effective source lines between two sibling nodes.
                else if (!preserveSourceNewlines && originalNodesHaveSameParent(previousNode, nextNode)) {
                    return ts.rangeEndIsOnSameLineAsRangeStart(previousNode, nextNode, currentSourceFile) ? 0 : 1;
                }
                // If the two nodes are not comparable, add a line terminator based on the format that can indicate
                // whether new lines are preferred or not.
                return format & ts.ListFormat.PreferNewLine ? 1 : 0;
            }
            else if (synthesizedNodeStartsOnNewLine(previousNode, format) || synthesizedNodeStartsOnNewLine(nextNode, format)) {
                return 1;
            }
        }
        else if (ts.getStartsOnNewLine(nextNode)) {
            return 1;
        }
        return format & ts.ListFormat.MultiLine ? 1 : 0;
    }

    function getClosingLineTerminatorCount(parentNode: ts.Node | undefined, lastChild: ts.Node | undefined, format: ts.ListFormat, childrenTextRange: ts.TextRange | undefined): number {
        if (format & ts.ListFormat.PreserveLines || preserveSourceNewlines) {
            if (format & ts.ListFormat.PreferNewLine) {
                return 1;
            }

            if (lastChild === undefined) {
                return !parentNode || currentSourceFile && ts.rangeIsOnSingleLine(parentNode, currentSourceFile) ? 0 : 1;
            }
            if (currentSourceFile && parentNode && !ts.positionIsSynthesized(parentNode.pos) && !ts.nodeIsSynthesized(lastChild) && (!lastChild.parent || lastChild.parent === parentNode)) {
                if (preserveSourceNewlines) {
                    const end = childrenTextRange && !ts.positionIsSynthesized(childrenTextRange.end) ? childrenTextRange.end : lastChild.end;
                    return getEffectiveLines(
                        includeComments => ts.getLinesBetweenPositionAndNextNonWhitespaceCharacter(
                            end,
                            parentNode.end,
                            currentSourceFile!,
                            includeComments));
                }
                return ts.rangeEndPositionsAreOnSameLine(parentNode, lastChild, currentSourceFile) ? 0 : 1;
            }
            if (synthesizedNodeStartsOnNewLine(lastChild, format)) {
                return 1;
            }
        }
        if (format & ts.ListFormat.MultiLine && !(format & ts.ListFormat.NoTrailingNewLine)) {
            return 1;
        }
        return 0;
    }

    function getEffectiveLines(getLineDifference: (includeComments: boolean) => number) {
        // If 'preserveSourceNewlines' is disabled, we should never call this function
        // because it could be more expensive than alternative approximations.
        ts.Debug.assert(!!preserveSourceNewlines);
        // We start by measuring the line difference from a position to its adjacent comments,
        // so that this is counted as a one-line difference, not two:
        //
        //   node1;
        //   // NODE2 COMMENT
        //   node2;
        const lines = getLineDifference(/*includeComments*/ true);
        if (lines === 0) {
            // However, if the line difference considering comments was 0, we might have this:
            //
            //   node1; // NODE2 COMMENT
            //   node2;
            //
            // in which case we should be ignoring node2's comment, so this too is counted as
            // a one-line difference, not zero.
            return getLineDifference(/*includeComments*/ false);
        }
        return lines;
    }

    function writeLineSeparatorsAndIndentBefore(node: ts.Node, parent: ts.Node): boolean {
        const leadingNewlines = preserveSourceNewlines && getLeadingLineTerminatorCount(parent, node, ts.ListFormat.None);
        if (leadingNewlines) {
            writeLinesAndIndent(leadingNewlines, /*writeSpaceIfNotIndenting*/ false);
        }
        return !!leadingNewlines;
    }

    function writeLineSeparatorsAfter(node: ts.Node, parent: ts.Node) {
        const trailingNewlines = preserveSourceNewlines && getClosingLineTerminatorCount(parent, node, ts.ListFormat.None, /*childrenTextRange*/ undefined);
        if (trailingNewlines) {
            writeLine(trailingNewlines);
        }
    }

    function synthesizedNodeStartsOnNewLine(node: ts.Node, format: ts.ListFormat) {
        if (ts.nodeIsSynthesized(node)) {
            const startsOnNewLine = ts.getStartsOnNewLine(node);
            if (startsOnNewLine === undefined) {
                return (format & ts.ListFormat.PreferNewLine) !== 0;
            }

            return startsOnNewLine;
        }

        return (format & ts.ListFormat.PreferNewLine) !== 0;
    }

    function getLinesBetweenNodes(parent: ts.Node, node1: ts.Node, node2: ts.Node): number {
        if (ts.getEmitFlags(parent) & ts.EmitFlags.NoIndentation) {
            return 0;
        }

        parent = skipSynthesizedParentheses(parent);
        node1 = skipSynthesizedParentheses(node1);
        node2 = skipSynthesizedParentheses(node2);

        // Always use a newline for synthesized code if the synthesizer desires it.
        if (ts.getStartsOnNewLine(node2)) {
            return 1;
        }

        if (currentSourceFile && !ts.nodeIsSynthesized(parent) && !ts.nodeIsSynthesized(node1) && !ts.nodeIsSynthesized(node2)) {
            if (preserveSourceNewlines) {
                return getEffectiveLines(
                    includeComments => ts.getLinesBetweenRangeEndAndRangeStart(
                        node1,
                        node2,
                        currentSourceFile!,
                        includeComments));
            }
            return ts.rangeEndIsOnSameLineAsRangeStart(node1, node2, currentSourceFile) ? 0 : 1;
        }

        return 0;
    }

    function isEmptyBlock(block: ts.BlockLike) {
        return block.statements.length === 0
            && (!currentSourceFile || ts.rangeEndIsOnSameLineAsRangeStart(block, block, currentSourceFile));
    }

    function skipSynthesizedParentheses(node: ts.Node) {
        while (node.kind === ts.SyntaxKind.ParenthesizedExpression && ts.nodeIsSynthesized(node)) {
            node = (node as ts.ParenthesizedExpression).expression;
        }

        return node;
    }

    function getTextOfNode(node: ts.Identifier | ts.PrivateIdentifier | ts.LiteralExpression, includeTrivia?: boolean): string {
        if (ts.isGeneratedIdentifier(node) || ts.isGeneratedPrivateIdentifier(node)) {
            return generateName(node);
        }
        if (ts.isStringLiteral(node) && node.textSourceNode) {
            return getTextOfNode(node.textSourceNode, includeTrivia);
        }
        const sourceFile = currentSourceFile; // const needed for control flow
        const canUseSourceFile = !!sourceFile && !!node.parent && !ts.nodeIsSynthesized(node);
        if (ts.isMemberName(node)) {
            if (!canUseSourceFile || ts.getSourceFileOfNode(node) !== ts.getOriginalNode(sourceFile)) {
                return ts.idText(node);
            }
        }
        else {
            ts.Debug.assertNode(node, ts.isLiteralExpression); // not strictly necessary
            if (!canUseSourceFile) {
                return node.text;
            }
        }
        return ts.getSourceTextOfNodeFromSourceFile(sourceFile, node, includeTrivia);
    }

    function getLiteralTextOfNode(node: ts.LiteralLikeNode, neverAsciiEscape: boolean | undefined, jsxAttributeEscape: boolean): string {
        if (node.kind === ts.SyntaxKind.StringLiteral && (node as ts.StringLiteral).textSourceNode) {
            const textSourceNode = (node as ts.StringLiteral).textSourceNode!;
            if (ts.isIdentifier(textSourceNode) || ts.isPrivateIdentifier(textSourceNode) || ts.isNumericLiteral(textSourceNode)) {
                const text = ts.isNumericLiteral(textSourceNode) ? textSourceNode.text : getTextOfNode(textSourceNode);
                return jsxAttributeEscape ? `"${ts.escapeJsxAttributeString(text)}"` :
                    neverAsciiEscape || (ts.getEmitFlags(node) & ts.EmitFlags.NoAsciiEscaping) ? `"${ts.escapeString(text)}"` :
                    `"${ts.escapeNonAsciiString(text)}"`;
            }
            else {
                return getLiteralTextOfNode(textSourceNode, neverAsciiEscape, jsxAttributeEscape);
            }
        }

        const flags = (neverAsciiEscape ? ts.GetLiteralTextFlags.NeverAsciiEscape : 0)
            | (jsxAttributeEscape ? ts.GetLiteralTextFlags.JsxAttributeEscape : 0)
            | (printerOptions.terminateUnterminatedLiterals ? ts.GetLiteralTextFlags.TerminateUnterminatedLiterals : 0)
            | (printerOptions.target && printerOptions.target === ts.ScriptTarget.ESNext ? ts.GetLiteralTextFlags.AllowNumericSeparator : 0);

        return ts.getLiteralText(node, currentSourceFile, flags);
    }

    /**
     * Push a new name generation scope.
     */
    function pushNameGenerationScope(node: ts.Node | undefined) {
        if (node && ts.getEmitFlags(node) & ts.EmitFlags.ReuseTempVariableScope) {
            return;
        }
        tempFlagsStack.push(tempFlags);
        tempFlags = TempFlags.Auto;
        privateNameTempFlagsStack.push(privateNameTempFlags);
        privateNameTempFlags = TempFlags.Auto;
        formattedNameTempFlagsStack.push(formattedNameTempFlags);
        formattedNameTempFlags = undefined;
        reservedNamesStack.push(reservedNames);
    }

    /**
     * Pop the current name generation scope.
     */
    function popNameGenerationScope(node: ts.Node | undefined) {
        if (node && ts.getEmitFlags(node) & ts.EmitFlags.ReuseTempVariableScope) {
            return;
        }
        tempFlags = tempFlagsStack.pop()!;
        privateNameTempFlags = privateNameTempFlagsStack.pop()!;
        formattedNameTempFlags = formattedNameTempFlagsStack.pop();
        reservedNames = reservedNamesStack.pop()!;
    }

    function reserveNameInNestedScopes(name: string) {
        if (!reservedNames || reservedNames === ts.lastOrUndefined(reservedNamesStack)) {
            reservedNames = new ts.Set();
        }
        reservedNames.add(name);
    }

    function generateNames(node: ts.Node | undefined) {
        if (!node) return;
        switch (node.kind) {
            case ts.SyntaxKind.Block:
                ts.forEach((node as ts.Block).statements, generateNames);
                break;
            case ts.SyntaxKind.LabeledStatement:
            case ts.SyntaxKind.WithStatement:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.WhileStatement:
                generateNames((node as ts.LabeledStatement | ts.WithStatement | ts.DoStatement | ts.WhileStatement).statement);
                break;
            case ts.SyntaxKind.IfStatement:
                generateNames((node as ts.IfStatement).thenStatement);
                generateNames((node as ts.IfStatement).elseStatement);
                break;
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.ForInStatement:
                generateNames((node as ts.ForStatement | ts.ForInOrOfStatement).initializer);
                generateNames((node as ts.ForStatement | ts.ForInOrOfStatement).statement);
                break;
            case ts.SyntaxKind.SwitchStatement:
                generateNames((node as ts.SwitchStatement).caseBlock);
                break;
            case ts.SyntaxKind.CaseBlock:
                ts.forEach((node as ts.CaseBlock).clauses, generateNames);
                break;
            case ts.SyntaxKind.CaseClause:
            case ts.SyntaxKind.DefaultClause:
                ts.forEach((node as ts.CaseOrDefaultClause).statements, generateNames);
                break;
            case ts.SyntaxKind.TryStatement:
                generateNames((node as ts.TryStatement).tryBlock);
                generateNames((node as ts.TryStatement).catchClause);
                generateNames((node as ts.TryStatement).finallyBlock);
                break;
            case ts.SyntaxKind.CatchClause:
                generateNames((node as ts.CatchClause).variableDeclaration);
                generateNames((node as ts.CatchClause).block);
                break;
            case ts.SyntaxKind.VariableStatement:
                generateNames((node as ts.VariableStatement).declarationList);
                break;
            case ts.SyntaxKind.VariableDeclarationList:
                ts.forEach((node as ts.VariableDeclarationList).declarations, generateNames);
                break;
            case ts.SyntaxKind.VariableDeclaration:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.BindingElement:
            case ts.SyntaxKind.ClassDeclaration:
                generateNameIfNeeded((node as ts.NamedDeclaration).name);
                break;
            case ts.SyntaxKind.FunctionDeclaration:
                generateNameIfNeeded((node as ts.FunctionDeclaration).name);
                if (ts.getEmitFlags(node) & ts.EmitFlags.ReuseTempVariableScope) {
                    ts.forEach((node as ts.FunctionDeclaration).parameters, generateNames);
                    generateNames((node as ts.FunctionDeclaration).body);
                }
                break;
            case ts.SyntaxKind.ObjectBindingPattern:
            case ts.SyntaxKind.ArrayBindingPattern:
                ts.forEach((node as ts.BindingPattern).elements, generateNames);
                break;
            case ts.SyntaxKind.ImportDeclaration:
                generateNames((node as ts.ImportDeclaration).importClause);
                break;
            case ts.SyntaxKind.ImportClause:
                generateNameIfNeeded((node as ts.ImportClause).name);
                generateNames((node as ts.ImportClause).namedBindings);
                break;
            case ts.SyntaxKind.NamespaceImport:
                generateNameIfNeeded((node as ts.NamespaceImport).name);
                break;
            case ts.SyntaxKind.NamespaceExport:
                generateNameIfNeeded((node as ts.NamespaceExport).name);
                break;
            case ts.SyntaxKind.NamedImports:
                ts.forEach((node as ts.NamedImports).elements, generateNames);
                break;
            case ts.SyntaxKind.ImportSpecifier:
                generateNameIfNeeded((node as ts.ImportSpecifier).propertyName || (node as ts.ImportSpecifier).name);
                break;
        }
    }

    function generateMemberNames(node: ts.Node | undefined) {
        if (!node) return;
        switch (node.kind) {
            case ts.SyntaxKind.PropertyAssignment:
            case ts.SyntaxKind.ShorthandPropertyAssignment:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                generateNameIfNeeded((node as ts.NamedDeclaration).name);
                break;
        }
    }

    function generateNameIfNeeded(name: ts.DeclarationName | undefined) {
        if (name) {
            if (ts.isGeneratedIdentifier(name) || ts.isGeneratedPrivateIdentifier(name)) {
                generateName(name);
            }
            else if (ts.isBindingPattern(name)) {
                generateNames(name);
            }
        }
    }

    /**
     * Generate the text for a generated identifier.
     */
    function generateName(name: ts.GeneratedIdentifier | ts.GeneratedPrivateIdentifier) {
        if ((name.autoGenerateFlags & ts.GeneratedIdentifierFlags.KindMask) === ts.GeneratedIdentifierFlags.Node) {
            // Node names generate unique names based on their original node
            // and are cached based on that node's id.
            return generateNameCached(ts.getNodeForGeneratedName(name), ts.isPrivateIdentifier(name), name.autoGenerateFlags, name.autoGeneratePrefix, name.autoGenerateSuffix);
        }
        else {
            // Auto, Loop, and Unique names are cached based on their unique
            // autoGenerateId.
            const autoGenerateId = name.autoGenerateId!;
            return autoGeneratedIdToGeneratedName[autoGenerateId] || (autoGeneratedIdToGeneratedName[autoGenerateId] = makeName(name));
        }
    }

    function generateNameCached(node: ts.Node, privateName: boolean, flags?: ts.GeneratedIdentifierFlags, prefix?: string | ts.GeneratedNamePart, suffix?: string) {
        const nodeId = ts.getNodeId(node);
        return nodeIdToGeneratedName[nodeId] || (nodeIdToGeneratedName[nodeId] = generateNameForNode(node, privateName, flags ?? ts.GeneratedIdentifierFlags.None, ts.formatGeneratedNamePart(prefix, generateName), ts.formatGeneratedNamePart(suffix)));
    }

    /**
     * Returns a value indicating whether a name is unique globally, within the current file,
     * or within the NameGenerator.
     */
    function isUniqueName(name: string): boolean {
        return isFileLevelUniqueName(name)
            && !generatedNames.has(name)
            && !(reservedNames && reservedNames.has(name));
    }

    /**
     * Returns a value indicating whether a name is unique globally or within the current file.
     */
    function isFileLevelUniqueName(name: string) {
        return currentSourceFile ? ts.isFileLevelUniqueName(currentSourceFile, name, hasGlobalName) : true;
    }

    /**
     * Returns a value indicating whether a name is unique within a container.
     */
    function isUniqueLocalName(name: string, container: ts.Node): boolean {
        for (let node = container; ts.isNodeDescendantOf(node, container); node = node.nextContainer!) {
            if (node.locals) {
                const local = node.locals.get(ts.escapeLeadingUnderscores(name));
                // We conservatively include alias symbols to cover cases where they're emitted as locals
                if (local && local.flags & (ts.SymbolFlags.Value | ts.SymbolFlags.ExportValue | ts.SymbolFlags.Alias)) {
                    return false;
                }
            }
        }
        return true;
    }

    function getTempFlags(formattedNameKey: string) {
        switch (formattedNameKey) {
            case "":
                return tempFlags;
            case "#":
                return privateNameTempFlags;
            default:
                return formattedNameTempFlags?.get(formattedNameKey) ?? TempFlags.Auto;
        }
    }

    function setTempFlags(formattedNameKey: string, flags: TempFlags) {
        switch (formattedNameKey) {
            case "":
                tempFlags = flags;
                break;
            case "#":
                privateNameTempFlags = flags;
                break;
            default:
                formattedNameTempFlags ??= new ts.Map();
                formattedNameTempFlags.set(formattedNameKey, flags);
                break;
        }
    }

    /**
     * Return the next available name in the pattern _a ... _z, _0, _1, ...
     * TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
     * Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
     */
    function makeTempVariableName(flags: TempFlags, reservedInNestedScopes: boolean, privateName: boolean, prefix: string, suffix: string): string {
        if (prefix.length > 0 && prefix.charCodeAt(0) === ts.CharacterCodes.hash) {
            prefix = prefix.slice(1);
        }

        // Generate a key to use to acquire a TempFlags counter based on the fixed portions of the generated name.
        const key = ts.formatGeneratedName(privateName, prefix, "", suffix);
        let tempFlags = getTempFlags(key);

        if (flags && !(tempFlags & flags)) {
            const name = flags === TempFlags._i ? "_i" : "_n";
            const fullName = ts.formatGeneratedName(privateName, prefix, name, suffix);
            if (isUniqueName(fullName)) {
                tempFlags |= flags;
                if (reservedInNestedScopes) {
                    reserveNameInNestedScopes(fullName);
                }
                setTempFlags(key, tempFlags);
                return fullName;
            }
        }

        while (true) {
            const count = tempFlags & TempFlags.CountMask;
            tempFlags++;
            // Skip over 'i' and 'n'
            if (count !== 8 && count !== 13) {
                const name = count < 26
                    ? "_" + String.fromCharCode(ts.CharacterCodes.a + count)
                    : "_" + (count - 26);
                const fullName = ts.formatGeneratedName(privateName, prefix, name, suffix);
                if (isUniqueName(fullName)) {
                    if (reservedInNestedScopes) {
                        reserveNameInNestedScopes(fullName);
                    }
                    setTempFlags(key, tempFlags);
                    return fullName;
                }
            }
        }
    }

    /**
     * Generate a name that is unique within the current file and doesn't conflict with any names
     * in global scope. The name is formed by adding an '_n' suffix to the specified base name,
     * where n is a positive integer. Note that names generated by makeTempVariableName and
     * makeUniqueName are guaranteed to never conflict.
     * If `optimistic` is set, the first instance will use 'baseName' verbatim instead of 'baseName_1'
     */
    function makeUniqueName(baseName: string, checkFn: (name: string) => boolean = isUniqueName, optimistic: boolean, scoped: boolean, privateName: boolean, prefix: string, suffix: string): string {
        if (baseName.length > 0 && baseName.charCodeAt(0) === ts.CharacterCodes.hash) {
            baseName = baseName.slice(1);
        }
        if (prefix.length > 0 && prefix.charCodeAt(0) === ts.CharacterCodes.hash) {
            prefix = prefix.slice(1);
        }
        if (optimistic) {
            const fullName = ts.formatGeneratedName(privateName, prefix, baseName, suffix);
            if (checkFn(fullName)) {
                if (scoped) {
                    reserveNameInNestedScopes(fullName);
                }
                else {
                    generatedNames.add(fullName);
                }
                return fullName;
            }
        }
        // Find the first unique 'name_n', where n is a positive number
        if (baseName.charCodeAt(baseName.length - 1) !== ts.CharacterCodes._) {
            baseName += "_";
        }
        let i = 1;
        while (true) {
            const fullName = ts.formatGeneratedName(privateName, prefix, baseName + i, suffix);
            if (checkFn(fullName)) {
                if (scoped) {
                    reserveNameInNestedScopes(fullName);
                }
                else {
                    generatedNames.add(fullName);
                }
                return fullName;
            }
            i++;
        }
    }

    function makeFileLevelOptimisticUniqueName(name: string) {
        return makeUniqueName(name, isFileLevelUniqueName, /*optimistic*/ true, /*scoped*/ false, /*privateName*/ false, /*prefix*/ "", /*suffix*/ "");
    }

    /**
     * Generates a unique name for a ModuleDeclaration or EnumDeclaration.
     */
    function generateNameForModuleOrEnum(node: ts.ModuleDeclaration | ts.EnumDeclaration) {
        const name = getTextOfNode(node.name);
        // Use module/enum name itself if it is unique, otherwise make a unique variation
        return isUniqueLocalName(name, node) ? name : makeUniqueName(name, isUniqueName, /*optimistic*/ false, /*scoped*/ false, /*privateName*/ false, /*prefix*/ "", /*suffix*/ "");
    }

    /**
     * Generates a unique name for an ImportDeclaration or ExportDeclaration.
     */
    function generateNameForImportOrExportDeclaration(node: ts.ImportDeclaration | ts.ExportDeclaration) {
        const expr = ts.getExternalModuleName(node)!; // TODO: GH#18217
        const baseName = ts.isStringLiteral(expr) ?
            ts.makeIdentifierFromModuleName(expr.text) : "module";
        return makeUniqueName(baseName, isUniqueName, /*optimistic*/ false, /*scoped*/ false, /*privateName*/ false, /*prefix*/ "", /*suffix*/ "");
    }

    /**
     * Generates a unique name for a default export.
     */
    function generateNameForExportDefault() {
        return makeUniqueName("default", isUniqueName, /*optimistic*/ false, /*scoped*/ false, /*privateName*/ false, /*prefix*/ "", /*suffix*/ "");
    }

    /**
     * Generates a unique name for a class expression.
     */
    function generateNameForClassExpression() {
        return makeUniqueName("class", isUniqueName, /*optimistic*/ false, /*scoped*/ false, /*privateName*/ false, /*prefix*/ "", /*suffix*/ "");
    }

    function generateNameForMethodOrAccessor(node: ts.MethodDeclaration | ts.AccessorDeclaration, privateName: boolean, prefix: string, suffix: string) {
        if (ts.isIdentifier(node.name)) {
            return generateNameCached(node.name, privateName);
        }
        return makeTempVariableName(TempFlags.Auto, /*reservedInNestedScopes*/ false, privateName, prefix, suffix);
    }

    /**
     * Generates a unique name from a node.
     */
    function generateNameForNode(node: ts.Node, privateName: boolean, flags: ts.GeneratedIdentifierFlags, prefix: string, suffix: string): string {
        switch (node.kind) {
            case ts.SyntaxKind.Identifier:
            case ts.SyntaxKind.PrivateIdentifier:
                return makeUniqueName(
                    getTextOfNode(node as ts.Identifier),
                    isUniqueName,
                    !!(flags & ts.GeneratedIdentifierFlags.Optimistic),
                    !!(flags & ts.GeneratedIdentifierFlags.ReservedInNestedScopes),
                    privateName,
                    prefix,
                    suffix
                );
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
                ts.Debug.assert(!prefix && !suffix && !privateName);
                return generateNameForModuleOrEnum(node as ts.ModuleDeclaration | ts.EnumDeclaration);
            case ts.SyntaxKind.ImportDeclaration:
            case ts.SyntaxKind.ExportDeclaration:
                ts.Debug.assert(!prefix && !suffix && !privateName);
                return generateNameForImportOrExportDeclaration(node as ts.ImportDeclaration | ts.ExportDeclaration);
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ExportAssignment:
                ts.Debug.assert(!prefix && !suffix && !privateName);
                return generateNameForExportDefault();
            case ts.SyntaxKind.ClassExpression:
                ts.Debug.assert(!prefix && !suffix && !privateName);
                return generateNameForClassExpression();
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return generateNameForMethodOrAccessor(node as ts.MethodDeclaration | ts.AccessorDeclaration, privateName, prefix, suffix);
            case ts.SyntaxKind.ComputedPropertyName:
                return makeTempVariableName(TempFlags.Auto, /*reserveInNestedScopes*/ true, privateName, prefix, suffix);
            default:
                return makeTempVariableName(TempFlags.Auto, /*reserveInNestedScopes*/ false, privateName, prefix, suffix);
        }
    }

    /**
     * Generates a unique identifier for a node.
     */
    function makeName(name: ts.GeneratedIdentifier | ts.GeneratedPrivateIdentifier) {
        const prefix = ts.formatGeneratedNamePart(name.autoGeneratePrefix, generateName);
        const suffix = ts.formatGeneratedNamePart (name.autoGenerateSuffix);
        switch (name.autoGenerateFlags & ts.GeneratedIdentifierFlags.KindMask) {
            case ts.GeneratedIdentifierFlags.Auto:
                return makeTempVariableName(TempFlags.Auto, !!(name.autoGenerateFlags & ts.GeneratedIdentifierFlags.ReservedInNestedScopes), ts.isPrivateIdentifier(name), prefix, suffix);
            case ts.GeneratedIdentifierFlags.Loop:
                ts.Debug.assertNode(name, ts.isIdentifier);
                return makeTempVariableName(TempFlags._i, !!(name.autoGenerateFlags & ts.GeneratedIdentifierFlags.ReservedInNestedScopes), /*privateName*/ false, prefix, suffix);
            case ts.GeneratedIdentifierFlags.Unique:
                return makeUniqueName(
                    ts.idText(name),
                    (name.autoGenerateFlags & ts.GeneratedIdentifierFlags.FileLevel) ? isFileLevelUniqueName : isUniqueName,
                    !!(name.autoGenerateFlags & ts.GeneratedIdentifierFlags.Optimistic),
                    !!(name.autoGenerateFlags & ts.GeneratedIdentifierFlags.ReservedInNestedScopes),
                    ts.isPrivateIdentifier(name),
                    prefix,
                    suffix
                );
        }

        return ts.Debug.fail(`Unsupported GeneratedIdentifierKind: ${ts.Debug.formatEnum(name.autoGenerateFlags & ts.GeneratedIdentifierFlags.KindMask, (ts as any).GeneratedIdentifierFlags, /*isFlags*/ true)}.`);
    }

    // Comments

    function pipelineEmitWithComments(hint: ts.EmitHint, node: ts.Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.Comments, hint, node);
        const savedContainerPos = containerPos;
        const savedContainerEnd = containerEnd;
        const savedDeclarationListContainerEnd = declarationListContainerEnd;
        emitCommentsBeforeNode(node);
        pipelinePhase(hint, node);
        emitCommentsAfterNode(node, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
    }

    function emitCommentsBeforeNode(node: ts.Node) {
        const emitFlags = ts.getEmitFlags(node);
        const commentRange = ts.getCommentRange(node);

        // Emit leading comments
        emitLeadingCommentsOfNode(node, emitFlags, commentRange.pos, commentRange.end);
        if (emitFlags & ts.EmitFlags.NoNestedComments) {
            commentsDisabled = true;
        }
    }

    function emitCommentsAfterNode(node: ts.Node, savedContainerPos: number, savedContainerEnd: number, savedDeclarationListContainerEnd: number) {
        const emitFlags = ts.getEmitFlags(node);
        const commentRange = ts.getCommentRange(node);

        // Emit trailing comments
        if (emitFlags & ts.EmitFlags.NoNestedComments) {
            commentsDisabled = false;
        }
        emitTrailingCommentsOfNode(node, emitFlags, commentRange.pos, commentRange.end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
        const typeNode = ts.getTypeNode(node);
        if (typeNode) {
            emitTrailingCommentsOfNode(node, emitFlags, typeNode.pos, typeNode.end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
        }
    }

    function emitLeadingCommentsOfNode(node: ts.Node, emitFlags: ts.EmitFlags, pos: number, end: number) {
        enterComment();
        hasWrittenComment = false;

        // We have to explicitly check that the node is JsxText because if the compilerOptions.jsx is "preserve" we will not do any transformation.
        // It is expensive to walk entire tree just to set one kind of node to have no comments.
        const skipLeadingComments = pos < 0 || (emitFlags & ts.EmitFlags.NoLeadingComments) !== 0 || node.kind === ts.SyntaxKind.JsxText;
        const skipTrailingComments = end < 0 || (emitFlags & ts.EmitFlags.NoTrailingComments) !== 0 || node.kind === ts.SyntaxKind.JsxText;

        // Save current container state on the stack.
        if ((pos > 0 || end > 0) && pos !== end) {
            // Emit leading comments if the position is not synthesized and the node
            // has not opted out from emitting leading comments.
            if (!skipLeadingComments) {
                emitLeadingComments(pos, /*isEmittedNode*/ node.kind !== ts.SyntaxKind.NotEmittedStatement);
            }

            if (!skipLeadingComments || (pos >= 0 && (emitFlags & ts.EmitFlags.NoLeadingComments) !== 0)) {
                // Advance the container position if comments get emitted or if they've been disabled explicitly using NoLeadingComments.
                containerPos = pos;
            }

            if (!skipTrailingComments || (end >= 0 && (emitFlags & ts.EmitFlags.NoTrailingComments) !== 0)) {
                // As above.
                containerEnd = end;

                // To avoid invalid comment emit in a down-level binding pattern, we
                // keep track of the last declaration list container's end
                if (node.kind === ts.SyntaxKind.VariableDeclarationList) {
                    declarationListContainerEnd = end;
                }
            }
        }
        ts.forEach(ts.getSyntheticLeadingComments(node), emitLeadingSynthesizedComment);
        exitComment();
    }

    function emitTrailingCommentsOfNode(node: ts.Node, emitFlags: ts.EmitFlags, pos: number, end: number, savedContainerPos: number, savedContainerEnd: number, savedDeclarationListContainerEnd: number) {
        enterComment();
        const skipTrailingComments = end < 0 || (emitFlags & ts.EmitFlags.NoTrailingComments) !== 0 || node.kind === ts.SyntaxKind.JsxText;
        ts.forEach(ts.getSyntheticTrailingComments(node), emitTrailingSynthesizedComment);
        if ((pos > 0 || end > 0) && pos !== end) {
            // Restore previous container state.
            containerPos = savedContainerPos;
            containerEnd = savedContainerEnd;
            declarationListContainerEnd = savedDeclarationListContainerEnd;

            // Emit trailing comments if the position is not synthesized and the node
            // has not opted out from emitting leading comments and is an emitted node.
            if (!skipTrailingComments && node.kind !== ts.SyntaxKind.NotEmittedStatement) {
                emitTrailingComments(end);
            }
        }
        exitComment();
    }

    function emitLeadingSynthesizedComment(comment: ts.SynthesizedComment) {
        if (comment.hasLeadingNewline || comment.kind === ts.SyntaxKind.SingleLineCommentTrivia) {
            writer.writeLine();
        }
        writeSynthesizedComment(comment);
        if (comment.hasTrailingNewLine || comment.kind === ts.SyntaxKind.SingleLineCommentTrivia) {
            writer.writeLine();
        }
        else {
            writer.writeSpace(" ");
        }
    }

    function emitTrailingSynthesizedComment(comment: ts.SynthesizedComment) {
        if (!writer.isAtStartOfLine()) {
            writer.writeSpace(" ");
        }
        writeSynthesizedComment(comment);
        if (comment.hasTrailingNewLine) {
            writer.writeLine();
        }
    }

    function writeSynthesizedComment(comment: ts.SynthesizedComment) {
        const text = formatSynthesizedComment(comment);
        const lineMap = comment.kind === ts.SyntaxKind.MultiLineCommentTrivia ? ts.computeLineStarts(text) : undefined;
        ts.writeCommentRange(text, lineMap!, writer, 0, text.length, newLine);
    }

    function formatSynthesizedComment(comment: ts.SynthesizedComment) {
        return comment.kind === ts.SyntaxKind.MultiLineCommentTrivia
            ? `/*${comment.text}*/`
            : `//${comment.text}`;
    }

    function emitBodyWithDetachedComments(node: ts.Node, detachedRange: ts.TextRange, emitCallback: (node: ts.Node) => void) {
        enterComment();
        const { pos, end } = detachedRange;
        const emitFlags = ts.getEmitFlags(node);
        const skipLeadingComments = pos < 0 || (emitFlags & ts.EmitFlags.NoLeadingComments) !== 0;
        const skipTrailingComments = commentsDisabled || end < 0 || (emitFlags & ts.EmitFlags.NoTrailingComments) !== 0;
        if (!skipLeadingComments) {
            emitDetachedCommentsAndUpdateCommentsInfo(detachedRange);
        }

        exitComment();
        if (emitFlags & ts.EmitFlags.NoNestedComments && !commentsDisabled) {
            commentsDisabled = true;
            emitCallback(node);
            commentsDisabled = false;
        }
        else {
            emitCallback(node);
        }

        enterComment();
        if (!skipTrailingComments) {
            emitLeadingComments(detachedRange.end, /*isEmittedNode*/ true);
            if (hasWrittenComment && !writer.isAtStartOfLine()) {
                writer.writeLine();
            }
        }
        exitComment();

    }

    function originalNodesHaveSameParent(nodeA: ts.Node, nodeB: ts.Node) {
        nodeA = ts.getOriginalNode(nodeA);
        // For performance, do not call `getOriginalNode` for `nodeB` if `nodeA` doesn't even
        // have a parent node.
        return nodeA.parent && nodeA.parent === ts.getOriginalNode(nodeB).parent;
    }

    function siblingNodePositionsAreComparable(previousNode: ts.Node, nextNode: ts.Node) {
        if (nextNode.pos < previousNode.end) {
            return false;
        }

        previousNode = ts.getOriginalNode(previousNode);
        nextNode = ts.getOriginalNode(nextNode);
        const parent = previousNode.parent;
        if (!parent || parent !== nextNode.parent) {
            return false;
        }

        const parentNodeArray = ts.getContainingNodeArray(previousNode);
        const prevNodeIndex = parentNodeArray?.indexOf(previousNode);
        return prevNodeIndex !== undefined && prevNodeIndex > -1 && parentNodeArray!.indexOf(nextNode) === prevNodeIndex + 1;
    }

    function emitLeadingComments(pos: number, isEmittedNode: boolean) {
        hasWrittenComment = false;

        if (isEmittedNode) {
            if (pos === 0 && currentSourceFile?.isDeclarationFile) {
                forEachLeadingCommentToEmit(pos, emitNonTripleSlashLeadingComment);
            }
            else {
                forEachLeadingCommentToEmit(pos, emitLeadingComment);
            }
        }
        else if (pos === 0) {
            // If the node will not be emitted in JS, remove all the comments(normal, pinned and ///) associated with the node,
            // unless it is a triple slash comment at the top of the file.
            // For Example:
            //      /// <reference-path ...>
            //      declare var x;
            //      /// <reference-path ...>
            //      interface F {}
            //  The first /// will NOT be removed while the second one will be removed even though both node will not be emitted
            forEachLeadingCommentToEmit(pos, emitTripleSlashLeadingComment);
        }
    }

    function emitTripleSlashLeadingComment(commentPos: number, commentEnd: number, kind: ts.SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
        if (isTripleSlashComment(commentPos, commentEnd)) {
            emitLeadingComment(commentPos, commentEnd, kind, hasTrailingNewLine, rangePos);
        }
    }

    function emitNonTripleSlashLeadingComment(commentPos: number, commentEnd: number, kind: ts.SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
        if (!isTripleSlashComment(commentPos, commentEnd)) {
            emitLeadingComment(commentPos, commentEnd, kind, hasTrailingNewLine, rangePos);
        }
    }

    function shouldWriteComment(text: string, pos: number) {
        if (printerOptions.onlyPrintJsDocStyle) {
            return (ts.isJSDocLikeText(text, pos) || ts.isPinnedComment(text, pos));
        }
        return true;
    }

    function emitLeadingComment(commentPos: number, commentEnd: number, kind: ts.SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
        if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos)) return;
        if (!hasWrittenComment) {
            ts.emitNewLineBeforeLeadingCommentOfPosition(getCurrentLineMap(), writer, rangePos, commentPos);
            hasWrittenComment = true;
        }

        // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
        emitPos(commentPos);
        ts.writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);

        if (hasTrailingNewLine) {
            writer.writeLine();
        }
        else if (kind === ts.SyntaxKind.MultiLineCommentTrivia) {
            writer.writeSpace(" ");
        }
    }

    function emitLeadingCommentsOfPosition(pos: number) {
        if (commentsDisabled || pos === -1) {
            return;
        }

        emitLeadingComments(pos, /*isEmittedNode*/ true);
    }

    function emitTrailingComments(pos: number) {
        forEachTrailingCommentToEmit(pos, emitTrailingComment);
    }

    function emitTrailingComment(commentPos: number, commentEnd: number, _kind: ts.SyntaxKind, hasTrailingNewLine: boolean) {
        if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos)) return;
        // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment2*/
        if (!writer.isAtStartOfLine()) {
            writer.writeSpace(" ");
        }

        emitPos(commentPos);
        ts.writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);

        if (hasTrailingNewLine) {
            writer.writeLine();
        }
    }

    function emitTrailingCommentsOfPosition(pos: number, prefixSpace?: boolean, forceNoNewline?: boolean) {
        if (commentsDisabled) {
            return;
        }
        enterComment();
        forEachTrailingCommentToEmit(pos, prefixSpace ? emitTrailingComment : forceNoNewline ? emitTrailingCommentOfPositionNoNewline : emitTrailingCommentOfPosition);
        exitComment();
    }

    function emitTrailingCommentOfPositionNoNewline(commentPos: number, commentEnd: number, kind: ts.SyntaxKind) {
        if (!currentSourceFile) return;
        // trailing comments of a position are emitted at /*trailing comment1 */space/*trailing comment*/space

        emitPos(commentPos);
        ts.writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);

        if (kind === ts.SyntaxKind.SingleLineCommentTrivia) {
            writer.writeLine(); // still write a newline for single-line comments, so closing tokens aren't written on the same line
        }
    }

    function emitTrailingCommentOfPosition(commentPos: number, commentEnd: number, _kind: ts.SyntaxKind, hasTrailingNewLine: boolean) {
        if(!currentSourceFile) return;
        // trailing comments of a position are emitted at /*trailing comment1 */space/*trailing comment*/space

        emitPos(commentPos);
        ts.writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);

        if (hasTrailingNewLine) {
            writer.writeLine();
        }
        else {
            writer.writeSpace(" ");
        }
    }

    function forEachLeadingCommentToEmit(pos: number, cb: (commentPos: number, commentEnd: number, kind: ts.SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) => void) {
        // Emit the leading comments only if the container's pos doesn't match because the container should take care of emitting these comments
        if (currentSourceFile && (containerPos === -1 || pos !== containerPos)) {
            if (hasDetachedComments(pos)) {
                forEachLeadingCommentWithoutDetachedComments(cb);
            }
            else {
                ts.forEachLeadingCommentRange(currentSourceFile.text, pos, cb, /*state*/ pos);
            }
        }
    }

    function forEachTrailingCommentToEmit(end: number, cb: (commentPos: number, commentEnd: number, kind: ts.SyntaxKind, hasTrailingNewLine: boolean) => void) {
        // Emit the trailing comments only if the container's end doesn't match because the container should take care of emitting these comments
        if (currentSourceFile && (containerEnd === -1 || (end !== containerEnd && end !== declarationListContainerEnd))) {
            ts.forEachTrailingCommentRange(currentSourceFile.text, end, cb);
        }
    }

    function hasDetachedComments(pos: number) {
        return detachedCommentsInfo !== undefined && ts.last(detachedCommentsInfo).nodePos === pos;
    }

    function forEachLeadingCommentWithoutDetachedComments(cb: (commentPos: number, commentEnd: number, kind: ts.SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) => void) {
        if (!currentSourceFile) return;
        // get the leading comments from detachedPos
        const pos = ts.last(detachedCommentsInfo!).detachedCommentEndPos;
        if (detachedCommentsInfo!.length - 1) {
            detachedCommentsInfo!.pop();
        }
        else {
            detachedCommentsInfo = undefined;
        }

        ts.forEachLeadingCommentRange(currentSourceFile.text, pos, cb, /*state*/ pos);
    }

    function emitDetachedCommentsAndUpdateCommentsInfo(range: ts.TextRange) {
        const currentDetachedCommentInfo = currentSourceFile && ts.emitDetachedComments(currentSourceFile.text, getCurrentLineMap(), writer, emitComment, range, newLine, commentsDisabled);
        if (currentDetachedCommentInfo) {
            if (detachedCommentsInfo) {
                detachedCommentsInfo.push(currentDetachedCommentInfo);
            }
            else {
                detachedCommentsInfo = [currentDetachedCommentInfo];
            }
        }
    }

    function emitComment(text: string, lineMap: number[], writer: ts.EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
        if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos)) return;
        emitPos(commentPos);
        ts.writeCommentRange(text, lineMap, writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);
    }

    /**
     * Determine if the given comment is a triple-slash
     *
     * @return true if the comment is a triple-slash comment else false
     */
    function isTripleSlashComment(commentPos: number, commentEnd: number) {
        return !!currentSourceFile && ts.isRecognizedTripleSlashComment(currentSourceFile.text, commentPos, commentEnd);
    }

    // Source Maps

    function getParsedSourceMap(node: ts.UnparsedSource) {
        if (node.parsedSourceMap === undefined && node.sourceMapText !== undefined) {
            node.parsedSourceMap = ts.tryParseRawSourceMap(node.sourceMapText) || false;
        }
        return node.parsedSourceMap || undefined;
    }

    function pipelineEmitWithSourceMaps(hint: ts.EmitHint, node: ts.Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.SourceMaps, hint, node);
        emitSourceMapsBeforeNode(node);
        pipelinePhase(hint, node);
        emitSourceMapsAfterNode(node);
    }

    function emitSourceMapsBeforeNode(node: ts.Node) {
        const emitFlags = ts.getEmitFlags(node);
        const sourceMapRange = ts.getSourceMapRange(node);

        // Emit leading sourcemap
        if (ts.isUnparsedNode(node)) {
            ts.Debug.assertIsDefined(node.parent, "UnparsedNodes must have parent pointers");
            const parsed = getParsedSourceMap(node.parent);
            if (parsed && sourceMapGenerator) {
                sourceMapGenerator.appendSourceMap(
                    writer.getLine(),
                    writer.getColumn(),
                    parsed,
                    node.parent.sourceMapPath!,
                    node.parent.getLineAndCharacterOfPosition(node.pos),
                    node.parent.getLineAndCharacterOfPosition(node.end)
                );
            }
        }
        else {
            const source = sourceMapRange.source || sourceMapSource;
            if (node.kind !== ts.SyntaxKind.NotEmittedStatement
                && (emitFlags & ts.EmitFlags.NoLeadingSourceMap) === 0
                && sourceMapRange.pos >= 0) {
                emitSourcePos(sourceMapRange.source || sourceMapSource, skipSourceTrivia(source, sourceMapRange.pos));
            }
            if (emitFlags & ts.EmitFlags.NoNestedSourceMaps) {
                sourceMapsDisabled = true;
            }
        }
    }

    function emitSourceMapsAfterNode(node: ts.Node) {
        const emitFlags = ts.getEmitFlags(node);
        const sourceMapRange = ts.getSourceMapRange(node);

        // Emit trailing sourcemap
        if (!ts.isUnparsedNode(node)) {
            if (emitFlags & ts.EmitFlags.NoNestedSourceMaps) {
                sourceMapsDisabled = false;
            }
            if (node.kind !== ts.SyntaxKind.NotEmittedStatement
                && (emitFlags & ts.EmitFlags.NoTrailingSourceMap) === 0
                && sourceMapRange.end >= 0) {
                emitSourcePos(sourceMapRange.source || sourceMapSource, sourceMapRange.end);
            }
        }
    }

    /**
     * Skips trivia such as comments and white-space that can be optionally overridden by the source-map source
     */
    function skipSourceTrivia(source: ts.SourceMapSource, pos: number): number {
        return source.skipTrivia ? source.skipTrivia(pos) : ts.skipTrivia(source.text, pos);
    }

    /**
     * Emits a mapping.
     *
     * If the position is synthetic (undefined or a negative value), no mapping will be
     * created.
     *
     * @param pos The position.
     */
    function emitPos(pos: number) {
        if (sourceMapsDisabled || ts.positionIsSynthesized(pos) || isJsonSourceMapSource(sourceMapSource)) {
            return;
        }

        const { line: sourceLine, character: sourceCharacter } = ts.getLineAndCharacterOfPosition(sourceMapSource, pos);
        sourceMapGenerator!.addMapping(
            writer.getLine(),
            writer.getColumn(),
            sourceMapSourceIndex,
            sourceLine,
            sourceCharacter,
            /*nameIndex*/ undefined);
    }

    function emitSourcePos(source: ts.SourceMapSource, pos: number) {
        if (source !== sourceMapSource) {
            const savedSourceMapSource = sourceMapSource;
            const savedSourceMapSourceIndex = sourceMapSourceIndex;
            setSourceMapSource(source);
            emitPos(pos);
            resetSourceMapSource(savedSourceMapSource, savedSourceMapSourceIndex);
        }
        else {
            emitPos(pos);
        }
    }

    /**
     * Emits a token of a node with possible leading and trailing source maps.
     *
     * @param node The node containing the token.
     * @param token The token to emit.
     * @param tokenStartPos The start pos of the token.
     * @param emitCallback The callback used to emit the token.
     */
    function emitTokenWithSourceMap(node: ts.Node | undefined, token: ts.SyntaxKind, writer: (s: string) => void, tokenPos: number, emitCallback: (token: ts.SyntaxKind, writer: (s: string) => void, tokenStartPos: number) => number) {
        if (sourceMapsDisabled || node && ts.isInJsonFile(node)) {
            return emitCallback(token, writer, tokenPos);
        }

        const emitNode = node && node.emitNode;
        const emitFlags = emitNode && emitNode.flags || ts.EmitFlags.None;
        const range = emitNode && emitNode.tokenSourceMapRanges && emitNode.tokenSourceMapRanges[token];
        const source = range && range.source || sourceMapSource;

        tokenPos = skipSourceTrivia(source, range ? range.pos : tokenPos);
        if ((emitFlags & ts.EmitFlags.NoTokenLeadingSourceMaps) === 0 && tokenPos >= 0) {
            emitSourcePos(source, tokenPos);
        }

        tokenPos = emitCallback(token, writer, tokenPos);

        if (range) tokenPos = range.end;
        if ((emitFlags & ts.EmitFlags.NoTokenTrailingSourceMaps) === 0 && tokenPos >= 0) {
            emitSourcePos(source, tokenPos);
        }

        return tokenPos;
    }

    function setSourceMapSource(source: ts.SourceMapSource) {
        if (sourceMapsDisabled) {
            return;
        }

        sourceMapSource = source;

        if (source === mostRecentlyAddedSourceMapSource) {
            // Fast path for when the new source map is the most recently added, in which case
            // we use its captured index without going through the source map generator.
            sourceMapSourceIndex = mostRecentlyAddedSourceMapSourceIndex;
            return;
        }

        if (isJsonSourceMapSource(source)) {
            return;
        }

        sourceMapSourceIndex = sourceMapGenerator!.addSource(source.fileName);
        if (printerOptions.inlineSources) {
            sourceMapGenerator!.setSourceContent(sourceMapSourceIndex, source.text);
        }

        mostRecentlyAddedSourceMapSource = source;
        mostRecentlyAddedSourceMapSourceIndex = sourceMapSourceIndex;
    }

    function resetSourceMapSource(source: ts.SourceMapSource, sourceIndex: number) {
        sourceMapSource = source;
        sourceMapSourceIndex = sourceIndex;
    }

    function isJsonSourceMapSource(sourceFile: ts.SourceMapSource) {
        return ts.fileExtensionIs(sourceFile.fileName, ts.Extension.Json);
    }
}

function createBracketsMap() {
    const brackets: string[][] = [];
    brackets[ts.ListFormat.Braces] = ["{", "}"];
    brackets[ts.ListFormat.Parenthesis] = ["(", ")"];
    brackets[ts.ListFormat.AngleBrackets] = ["<", ">"];
    brackets[ts.ListFormat.SquareBrackets] = ["[", "]"];
    return brackets;
}

function getOpeningBracket(format: ts.ListFormat) {
    return brackets[format & ts.ListFormat.BracketsMask][0];
}

function getClosingBracket(format: ts.ListFormat) {
    return brackets[format & ts.ListFormat.BracketsMask][1];
}

// Flags enum to track count of temp variables and a few dedicated names
const enum TempFlags {
    Auto = 0x00000000,  // No preferred name
    CountMask = 0x0FFFFFFF,  // Temp variable counter
    _i = 0x10000000,  // Use/preference flag for '_i'
}

interface OrdinalParentheizerRuleSelector<T extends ts.Node> {
    select(index: number): ((node: T) => T) | undefined;
}

type ParenthesizerRule<T extends ts.Node> = (node: T) => T;

type ParenthesizerRuleOrSelector<T extends ts.Node> = OrdinalParentheizerRuleSelector<T> | ParenthesizerRule<T>;

function emitListItemNoParenthesizer(node: ts.Node, emit: (node: ts.Node, parenthesizerRule?: ((node: ts.Node) => ts.Node) | undefined) => void, _parenthesizerRule: ParenthesizerRuleOrSelector<ts.Node> | undefined, _index: number) {
    emit(node);
}

function emitListItemWithParenthesizerRuleSelector(node: ts.Node, emit: (node: ts.Node, parenthesizerRule?: ((node: ts.Node) => ts.Node) | undefined) => void, parenthesizerRuleSelector: OrdinalParentheizerRuleSelector<ts.Node>, index: number) {
    emit(node, parenthesizerRuleSelector.select(index));
}

function emitListItemWithParenthesizerRule(node: ts.Node, emit: (node: ts.Node, parenthesizerRule?: ((node: ts.Node) => ts.Node) | undefined) => void, parenthesizerRule: ParenthesizerRule<ts.Node> | undefined, _index: number) {
    emit(node, parenthesizerRule);
}

function getEmitListItem<T extends ts.Node, R extends ParenthesizerRuleOrSelector<T> | undefined>(emit: (node: ts.Node, parenthesizerRule?: ((node: ts.Node) => ts.Node) | undefined) => void, parenthesizerRule: R): (node: ts.Node, emit: (node: ts.Node, parenthesizerRule?: ((node: ts.Node) => ts.Node) | undefined) => void, parenthesizerRule: R, index: number) => void {
    return emit.length === 1 ? emitListItemNoParenthesizer :
        typeof parenthesizerRule === "object" ? emitListItemWithParenthesizerRuleSelector :
        emitListItemWithParenthesizerRule;
}
