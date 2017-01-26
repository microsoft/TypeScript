/// <reference path="checker.ts" />
/// <reference path="transformer.ts" />
/// <reference path="declarationEmitter.ts" />
/// <reference path="sourcemap.ts" />
/// <reference path="comments.ts" />
/// <reference path="printer.ts" />

/* @internal */
namespace ts {
    const id = (s: SourceFile) => s;
    const nullTransformers: Transformer[] = [_ => id];

    // targetSourceFile is when users only want one file in entire project to be emitted. This is used in compileOnSave feature
    export function emitFiles(resolver: EmitResolver, host: EmitHost, targetSourceFile: SourceFile, emitOnlyDtsFiles?: boolean): EmitResult {
        const compilerOptions = host.getCompilerOptions();
        const sourceMapDataList: SourceMapData[] = compilerOptions.sourceMap || compilerOptions.inlineSourceMap ? [] : undefined;
        const emittedFilesList: string[] = compilerOptions.listEmittedFiles ? [] : undefined;
        const emitterDiagnostics = createDiagnosticCollection();
        const newLine = host.getNewLine();
        const transformers: Transformer[] = emitOnlyDtsFiles ? nullTransformers : getTransformers(compilerOptions);
        const writer = createTextWriter(newLine);
        const sourceMap = createSourceMapWriter(host, writer);
        const comments = createCommentWriter(writer, compilerOptions, newLine, sourceMap.emitPos);

        let currentSourceFile: SourceFile;
        let bundledHelpers: Map<boolean>;
        let isOwnFileEmit: boolean;
        let emitSkipped = false;

        const sourceFiles = getSourceFilesToEmit(host, targetSourceFile);

        // Transform the source files
        const transform = transformFiles(resolver, host, sourceFiles, transformers);

        // Create a printer to print the nodes
        const printer = createPrinter(writer, compilerOptions, {
            // resolver hooks
            hasGlobalName: resolver.hasGlobalName,

            // transform hooks
            onEmitNode: transform.emitNodeWithNotification,
            onSubstituteNode: transform.emitNodeWithSubstitution,

            // sourcemap hooks
            onEmitSourceMapOfNode: sourceMap.emitNodeWithSourceMap,
            onEmitSourceMapOfToken: sourceMap.emitTokenWithSourceMap,

            // comment hooks
            onEmitCommentsOfNode: comments.emitNodeWithComments,
            onEmitDetachedCommentsOfNode: comments.emitBodyWithDetachedComments,
            onEmitTrailingCommentsOfPosition: comments.emitTrailingCommentsOfPosition,

            // emitter hooks
            onEmitHelpers: emitHelpers,
            onSetSourceFile: setSourceFile,
        });

        // Emit each output file
        performance.mark("beforePrint");
        forEachEmittedFile(host, emitSourceFileOrBundle, transform.transformed, emitOnlyDtsFiles);
        performance.measure("printTime", "beforePrint");

        // Clean up emit nodes on parse tree
        for (const sourceFile of sourceFiles) {
            disposeEmitNodes(sourceFile);
        }

        return {
            emitSkipped,
            diagnostics: emitterDiagnostics.getDiagnostics(),
            emittedFiles: emittedFilesList,
            sourceMaps: sourceMapDataList
        };

        function emitSourceFileOrBundle({ jsFilePath, sourceMapFilePath, declarationFilePath }: EmitFileNames, sourceFileOrBundle: SourceFile | Bundle) {
            // Make sure not to write js file and source map file if any of them cannot be written
            if (!host.isEmitBlocked(jsFilePath) && !compilerOptions.noEmit) {
                if (!emitOnlyDtsFiles) {
                    printSourceFileOrBundle(jsFilePath, sourceMapFilePath, sourceFileOrBundle);
                }
            }
            else {
                emitSkipped = true;
            }

            if (declarationFilePath) {
                emitSkipped = writeDeclarationFile(declarationFilePath, getOriginalSourceFileOrBundle(sourceFileOrBundle), host, resolver, emitterDiagnostics, emitOnlyDtsFiles) || emitSkipped;
            }

            if (!emitSkipped && emittedFilesList) {
                if (!emitOnlyDtsFiles) {
                    emittedFilesList.push(jsFilePath);
                }
                if (sourceMapFilePath) {
                    emittedFilesList.push(sourceMapFilePath);
                }
                if (declarationFilePath) {
                    emittedFilesList.push(declarationFilePath);
                }
            }
        }

        function printSourceFileOrBundle(jsFilePath: string, sourceMapFilePath: string, sourceFileOrBundle: SourceFile | Bundle) {
            const bundle = sourceFileOrBundle.kind === SyntaxKind.Bundle ? sourceFileOrBundle : undefined;
            const sourceFile = sourceFileOrBundle.kind === SyntaxKind.SourceFile ? sourceFileOrBundle : undefined;
            const sourceFiles = bundle ? bundle.sourceFiles : [sourceFile];
            sourceMap.initialize(jsFilePath, sourceMapFilePath, sourceFileOrBundle);

            if (bundle) {
                bundledHelpers = createMap<boolean>();
                isOwnFileEmit = false;
                printer.printBundle(bundle);
            }
            else {
                isOwnFileEmit = true;
                printer.printFile(sourceFile);
            }

            writer.writeLine();

            const sourceMappingURL = sourceMap.getSourceMappingURL();
            if (sourceMappingURL) {
                writer.write(`//# ${"sourceMappingURL"}=${sourceMappingURL}`); // Sometimes tools can sometimes see this line as a source mapping url comment
            }

            // Write the source map
            if (compilerOptions.sourceMap && !compilerOptions.inlineSourceMap) {
                writeFile(host, emitterDiagnostics, sourceMapFilePath, sourceMap.getText(), /*writeByteOrderMark*/ false, sourceFiles);
            }

            // Record source map data for the test harness.
            if (sourceMapDataList) {
                sourceMapDataList.push(sourceMap.getSourceMapData());
            }

            // Write the output file
            writeFile(host, emitterDiagnostics, jsFilePath, writer.getText(), compilerOptions.emitBOM, sourceFiles);

            // Reset state
            sourceMap.reset();
            comments.reset();
            writer.reset();

            currentSourceFile = undefined;
            bundledHelpers = undefined;
            isOwnFileEmit = false;
        }

        function setSourceFile(node: SourceFile) {
            currentSourceFile = node;
            sourceMap.setSourceFile(node);
            comments.setSourceFile(node);
        }

        function emitHelpers(node: Node, writeLines: (text: string) => void) {
            let helpersEmitted = false;
            const bundle = node.kind === SyntaxKind.Bundle ? <Bundle>node : undefined;
            const numNodes = bundle ? bundle.sourceFiles.length : 1;
            for (let i = 0; i < numNodes; i++) {
                const currentNode = bundle ? bundle.sourceFiles[i] : node;
                const sourceFile = isSourceFile(currentNode) ? currentNode : currentSourceFile;
                const shouldSkip = compilerOptions.noEmitHelpers || (sourceFile && getExternalHelpersModuleName(sourceFile) !== undefined);
                const shouldBundle = isSourceFile(currentNode) && !isOwnFileEmit;
                const helpers = getEmitHelpers(currentNode);
                if (helpers) {
                    for (const helper of stableSort(helpers, compareEmitHelpers)) {
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

                        writeLines(helper.text);
                        helpersEmitted = true;
                    }
                }
            }

            return helpersEmitted;
        }
    }
}