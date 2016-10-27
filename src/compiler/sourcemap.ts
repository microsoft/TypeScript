/// <reference path="checker.ts"/>

/* @internal */
namespace ts {
    export interface SourceMapWriter {
        /**
         * Initialize the SourceMapWriter for a new output file.
         *
         * @param filePath The path to the generated output file.
         * @param sourceMapFilePath The path to the output source map file.
         * @param sourceFiles The input source files for the program.
         * @param isBundledEmit A value indicating whether the generated output file is a bundle.
         */
        initialize(filePath: string, sourceMapFilePath: string, sourceFiles: SourceFile[], isBundledEmit: boolean): void;

        /**
         * Reset the SourceMapWriter to an empty state.
         */
        reset(): void;

        /**
         * Set the current source file.
         *
         * @param sourceFile The source file.
         */
        setSourceFile(sourceFile: SourceFile): void;

        /**
         * Emits a mapping.
         *
         * If the position is synthetic (undefined or a negative value), no mapping will be
         * created.
         *
         * @param pos The position.
         */
        emitPos(pos: number): void;

        /**
         * Emits a node with possible leading and trailing source maps.
         *
         * @param emitContext The current emit context
         * @param node The node to emit.
         * @param emitCallback The callback used to emit the node.
         */
        emitNodeWithSourceMap(emitContext: EmitContext, node: Node, emitCallback: (emitContext: EmitContext, node: Node) => void): void;

        /**
         * Emits a token of a node node with possible leading and trailing source maps.
         *
         * @param node The node containing the token.
         * @param token The token to emit.
         * @param tokenStartPos The start pos of the token.
         * @param emitCallback The callback used to emit the token.
         */
        emitTokenWithSourceMap(node: Node, token: SyntaxKind, tokenStartPos: number, emitCallback: (token: SyntaxKind, tokenStartPos: number) => number): number;

        /**
         * Gets the text for the source map.
         */
        getText(): string;

        /**
         * Gets the SourceMappingURL for the source map.
         */
        getSourceMappingURL(): string;

        /**
         * Gets test data for source maps.
         */
        getSourceMapData(): SourceMapData;
    }

    // Used for initialize lastEncodedSourceMapSpan and reset lastEncodedSourceMapSpan when updateLastEncodedAndRecordedSpans
    const defaultLastEncodedSourceMapSpan: SourceMapSpan = {
        emittedLine: 1,
        emittedColumn: 1,
        sourceLine: 1,
        sourceColumn: 1,
        sourceIndex: 0
    };

    export function createSourceMapWriter(host: EmitHost, writer: EmitTextWriter): SourceMapWriter {
        const compilerOptions = host.getCompilerOptions();
        const extendedDiagnostics = compilerOptions.extendedDiagnostics;
        let currentSourceFile: SourceFile;
        let currentSourceText: string;
        let sourceMapDir: string; // The directory in which sourcemap will be

        // Current source map file and its index in the sources list
        let sourceMapSourceIndex: number;

        // Last recorded and encoded spans
        let lastRecordedSourceMapSpan: SourceMapSpan;
        let lastEncodedSourceMapSpan: SourceMapSpan;
        let lastEncodedNameIndex: number;

        // Source map data
        let sourceMapData: SourceMapData;
        let disabled: boolean = !(compilerOptions.sourceMap || compilerOptions.inlineSourceMap);

        return {
            initialize,
            reset,
            getSourceMapData: () => sourceMapData,
            setSourceFile,
            emitPos,
            emitNodeWithSourceMap,
            emitTokenWithSourceMap,
            getText,
            getSourceMappingURL,
        };

        /**
         * Initialize the SourceMapWriter for a new output file.
         *
         * @param filePath The path to the generated output file.
         * @param sourceMapFilePath The path to the output source map file.
         * @param sourceFiles The input source files for the program.
         * @param isBundledEmit A value indicating whether the generated output file is a bundle.
         */
        function initialize(filePath: string, sourceMapFilePath: string, sourceFiles: SourceFile[], isBundledEmit: boolean) {
            if (disabled) {
                return;
            }

            if (sourceMapData) {
                reset();
            }

            currentSourceFile = undefined;
            currentSourceText = undefined;

            // Current source map file and its index in the sources list
            sourceMapSourceIndex = -1;

            // Last recorded and encoded spans
            lastRecordedSourceMapSpan = undefined;
            lastEncodedSourceMapSpan = defaultLastEncodedSourceMapSpan;
            lastEncodedNameIndex = 0;

            // Initialize source map data
            sourceMapData = {
                sourceMapFilePath: sourceMapFilePath,
                jsSourceMappingURL: !compilerOptions.inlineSourceMap ? getBaseFileName(normalizeSlashes(sourceMapFilePath)) : undefined,
                sourceMapFile: getBaseFileName(normalizeSlashes(filePath)),
                sourceMapSourceRoot: compilerOptions.sourceRoot || "",
                sourceMapSources: [],
                inputSourceFileNames: [],
                sourceMapNames: [],
                sourceMapMappings: "",
                sourceMapSourcesContent: compilerOptions.inlineSources ? [] : undefined,
                sourceMapDecodedMappings: []
            };

            // Normalize source root and make sure it has trailing "/" so that it can be used to combine paths with the
            // relative paths of the sources list in the sourcemap
            sourceMapData.sourceMapSourceRoot = ts.normalizeSlashes(sourceMapData.sourceMapSourceRoot);
            if (sourceMapData.sourceMapSourceRoot.length && sourceMapData.sourceMapSourceRoot.charCodeAt(sourceMapData.sourceMapSourceRoot.length - 1) !== CharacterCodes.slash) {
                sourceMapData.sourceMapSourceRoot += directorySeparator;
            }

            if (compilerOptions.mapRoot) {
                sourceMapDir = normalizeSlashes(compilerOptions.mapRoot);
                if (!isBundledEmit) { // emitting single module file
                    Debug.assert(sourceFiles.length === 1);
                    // For modules or multiple emit files the mapRoot will have directory structure like the sources
                    // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                    sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceFiles[0], host, sourceMapDir));
                }

                if (!isRootedDiskPath(sourceMapDir) && !isUrl(sourceMapDir)) {
                    // The relative paths are relative to the common directory
                    sourceMapDir = combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
                    sourceMapData.jsSourceMappingURL = getRelativePathToDirectoryOrUrl(
                        getDirectoryPath(normalizePath(filePath)), // get the relative sourceMapDir path based on jsFilePath
                        combinePaths(sourceMapDir, sourceMapData.jsSourceMappingURL), // this is where user expects to see sourceMap
                        host.getCurrentDirectory(),
                        host.getCanonicalFileName,
                        /*isAbsolutePathAnUrl*/ true);
                }
                else {
                    sourceMapData.jsSourceMappingURL = combinePaths(sourceMapDir, sourceMapData.jsSourceMappingURL);
                }
            }
            else {
                sourceMapDir = getDirectoryPath(normalizePath(filePath));
            }
        }

        /**
         * Reset the SourceMapWriter to an empty state.
         */
        function reset() {
            if (disabled) {
                return;
            }

            currentSourceFile = undefined;
            sourceMapDir = undefined;
            sourceMapSourceIndex = undefined;
            lastRecordedSourceMapSpan = undefined;
            lastEncodedSourceMapSpan = undefined;
            lastEncodedNameIndex = undefined;
            sourceMapData = undefined;
        }

        // Encoding for sourcemap span
        function encodeLastRecordedSourceMapSpan() {
            if (!lastRecordedSourceMapSpan || lastRecordedSourceMapSpan === lastEncodedSourceMapSpan) {
                return;
            }

            let prevEncodedEmittedColumn = lastEncodedSourceMapSpan.emittedColumn;
            // Line/Comma delimiters
            if (lastEncodedSourceMapSpan.emittedLine === lastRecordedSourceMapSpan.emittedLine) {
                // Emit comma to separate the entry
                if (sourceMapData.sourceMapMappings) {
                    sourceMapData.sourceMapMappings += ",";
                }
            }
            else {
                // Emit line delimiters
                for (let encodedLine = lastEncodedSourceMapSpan.emittedLine; encodedLine < lastRecordedSourceMapSpan.emittedLine; encodedLine++) {
                    sourceMapData.sourceMapMappings += ";";
                }
                prevEncodedEmittedColumn = 1;
            }

            // 1. Relative Column 0 based
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.emittedColumn - prevEncodedEmittedColumn);

            // 2. Relative sourceIndex
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.sourceIndex - lastEncodedSourceMapSpan.sourceIndex);

            // 3. Relative sourceLine 0 based
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.sourceLine - lastEncodedSourceMapSpan.sourceLine);

            // 4. Relative sourceColumn 0 based
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.sourceColumn - lastEncodedSourceMapSpan.sourceColumn);

            // 5. Relative namePosition 0 based
            if (lastRecordedSourceMapSpan.nameIndex >= 0) {
                Debug.assert(false, "We do not support name index right now, Make sure to update updateLastEncodedAndRecordedSpans when we start using this");
                sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.nameIndex - lastEncodedNameIndex);
                lastEncodedNameIndex = lastRecordedSourceMapSpan.nameIndex;
            }

            lastEncodedSourceMapSpan = lastRecordedSourceMapSpan;
            sourceMapData.sourceMapDecodedMappings.push(lastEncodedSourceMapSpan);
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
            if (disabled || positionIsSynthesized(pos)) {
                return;
            }

            if (extendedDiagnostics) {
                performance.mark("beforeSourcemap");
            }

            const sourceLinePos = getLineAndCharacterOfPosition(currentSourceFile, pos);

            // Convert the location to be one-based.
            sourceLinePos.line++;
            sourceLinePos.character++;

            const emittedLine = writer.getLine();
            const emittedColumn = writer.getColumn();

            // If this location wasn't recorded or the location in source is going backwards, record the span
            if (!lastRecordedSourceMapSpan ||
                lastRecordedSourceMapSpan.emittedLine !== emittedLine ||
                lastRecordedSourceMapSpan.emittedColumn !== emittedColumn ||
                (lastRecordedSourceMapSpan.sourceIndex === sourceMapSourceIndex &&
                    (lastRecordedSourceMapSpan.sourceLine > sourceLinePos.line ||
                        (lastRecordedSourceMapSpan.sourceLine === sourceLinePos.line && lastRecordedSourceMapSpan.sourceColumn > sourceLinePos.character)))) {

                // Encode the last recordedSpan before assigning new
                encodeLastRecordedSourceMapSpan();

                // New span
                lastRecordedSourceMapSpan = {
                    emittedLine: emittedLine,
                    emittedColumn: emittedColumn,
                    sourceLine: sourceLinePos.line,
                    sourceColumn: sourceLinePos.character,
                    sourceIndex: sourceMapSourceIndex
                };
            }
            else {
                // Take the new pos instead since there is no change in emittedLine and column since last location
                lastRecordedSourceMapSpan.sourceLine = sourceLinePos.line;
                lastRecordedSourceMapSpan.sourceColumn = sourceLinePos.character;
                lastRecordedSourceMapSpan.sourceIndex = sourceMapSourceIndex;
            }

            if (extendedDiagnostics) {
                performance.mark("afterSourcemap");
                performance.measure("Source Map", "beforeSourcemap", "afterSourcemap");
            }
        }

        /**
         * Emits a node with possible leading and trailing source maps.
         *
         * @param node The node to emit.
         * @param emitCallback The callback used to emit the node.
         */
        function emitNodeWithSourceMap(emitContext: EmitContext, node: Node, emitCallback: (emitContext: EmitContext, node: Node) => void) {
            if (disabled) {
                return emitCallback(emitContext, node);
            }

            if (node) {
                const emitNode = node.emitNode;
                const emitFlags = emitNode && emitNode.flags;
                const { pos, end } = emitNode && emitNode.sourceMapRange || node;

                if (node.kind !== SyntaxKind.NotEmittedStatement
                    && (emitFlags & EmitFlags.NoLeadingSourceMap) === 0
                    && pos >= 0) {
                    emitPos(skipTrivia(currentSourceText, pos));
                }

                if (emitFlags & EmitFlags.NoNestedSourceMaps) {
                    disabled = true;
                    emitCallback(emitContext, node);
                    disabled = false;
                }
                else {
                    emitCallback(emitContext, node);
                }

                if (node.kind !== SyntaxKind.NotEmittedStatement
                    && (emitFlags & EmitFlags.NoTrailingSourceMap) === 0
                    && end >= 0) {
                    emitPos(end);
                }
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
        function emitTokenWithSourceMap(node: Node, token: SyntaxKind, tokenPos: number, emitCallback: (token: SyntaxKind, tokenStartPos: number) => number) {
            if (disabled) {
                return emitCallback(token, tokenPos);
            }

            const emitNode = node && node.emitNode;
            const emitFlags = emitNode && emitNode.flags;
            const range = emitNode && emitNode.tokenSourceMapRanges && emitNode.tokenSourceMapRanges.get(token);

            tokenPos = skipTrivia(currentSourceText, range ? range.pos : tokenPos);
            if ((emitFlags & EmitFlags.NoTokenLeadingSourceMaps) === 0 && tokenPos >= 0) {
                emitPos(tokenPos);
            }

            tokenPos = emitCallback(token, tokenPos);

            if (range) tokenPos = range.end;
            if ((emitFlags & EmitFlags.NoTokenTrailingSourceMaps) === 0 && tokenPos >= 0) {
                emitPos(tokenPos);
            }

            return tokenPos;
        }

        /**
         * Set the current source file.
         *
         * @param sourceFile The source file.
         */
        function setSourceFile(sourceFile: SourceFile) {
            if (disabled) {
                return;
            }

            currentSourceFile = sourceFile;
            currentSourceText = currentSourceFile.text;

            // Add the file to tsFilePaths
            // If sourceroot option: Use the relative path corresponding to the common directory path
            // otherwise source locations relative to map file location
            const sourcesDirectoryPath = compilerOptions.sourceRoot ? host.getCommonSourceDirectory() : sourceMapDir;

            const source = getRelativePathToDirectoryOrUrl(sourcesDirectoryPath,
                currentSourceFile.fileName,
                host.getCurrentDirectory(),
                host.getCanonicalFileName,
                /*isAbsolutePathAnUrl*/ true);

            sourceMapSourceIndex = indexOf(sourceMapData.sourceMapSources, source);
            if (sourceMapSourceIndex === -1) {
                sourceMapSourceIndex = sourceMapData.sourceMapSources.length;
                sourceMapData.sourceMapSources.push(source);

                // The one that can be used from program to get the actual source file
                sourceMapData.inputSourceFileNames.push(currentSourceFile.fileName);

                if (compilerOptions.inlineSources) {
                    sourceMapData.sourceMapSourcesContent.push(currentSourceFile.text);
                }
            }
        }

        /**
         * Gets the text for the source map.
         */
        function getText() {
            if (disabled) {
                return;
            }

            encodeLastRecordedSourceMapSpan();

            return stringify({
                version: 3,
                file: sourceMapData.sourceMapFile,
                sourceRoot: sourceMapData.sourceMapSourceRoot,
                sources: sourceMapData.sourceMapSources,
                names: sourceMapData.sourceMapNames,
                mappings: sourceMapData.sourceMapMappings,
                sourcesContent: sourceMapData.sourceMapSourcesContent,
            });
        }

        /**
         * Gets the SourceMappingURL for the source map.
         */
        function getSourceMappingURL() {
            if (disabled) {
                return;
            }

            if (compilerOptions.inlineSourceMap) {
                // Encode the sourceMap into the sourceMap url
                const base64SourceMapText = convertToBase64(getText());
                return sourceMapData.jsSourceMappingURL = `data:application/json;base64,${base64SourceMapText}`;
            }
            else {
                return sourceMapData.jsSourceMappingURL;
            }
        }
    }

    const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    function base64FormatEncode(inValue: number) {
        if (inValue < 64) {
            return base64Chars.charAt(inValue);
        }

        throw TypeError(inValue + ": not a 64 based value");
    }

    function base64VLQFormatEncode(inValue: number) {
        // Add a new least significant bit that has the sign of the value.
        // if negative number the least significant bit that gets added to the number has value 1
        // else least significant bit value that gets added is 0
        // eg. -1 changes to binary : 01 [1] => 3
        //     +1 changes to binary : 01 [0] => 2
        if (inValue < 0) {
            inValue = ((-inValue) << 1) + 1;
        }
        else {
            inValue = inValue << 1;
        }

        // Encode 5 bits at a time starting from least significant bits
        let encodedStr = "";
        do {
            let currentDigit = inValue & 31; // 11111
            inValue = inValue >> 5;
            if (inValue > 0) {
                // There are still more digits to decode, set the msb (6th bit)
                currentDigit = currentDigit | 32;
            }
            encodedStr = encodedStr + base64FormatEncode(currentDigit);
        } while (inValue > 0);

        return encodedStr;
    }
}