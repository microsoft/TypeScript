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
         * Gets test data for source maps.
         */
        getSourceMapData(): SourceMapData;

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
         * Emits a mapping for the start of a range.
         *
         * If the range's start position is synthetic (undefined or a negative value), no mapping
         * will be created. Any trivia at the start position in the original source will be
         * skipped.
         *
         * @param range The range to emit.
         */
        emitStart(range: TextRange): void;

        /**
         * Emits a mapping for the start of a range.
         *
         * If the node's start position is synthetic (undefined or a negative value), no mapping
         * will be created. Any trivia at the start position in the original source will be
         * skipped.
         *
         * @param range The range to emit.
         * @param contextNode The node for the current range.
         * @param ignoreNodeCallback A callback used to determine whether to skip source map
         *        emit for the start position of this node.
         * @param ignoreChildrenCallback A callback used to determine whether to skip source
         *        map emit for all children of this node.
         * @param getTextRangeCallbackCallback A callback used to get a custom source map
         *        range for this node.
         */
        emitStart(range: TextRange, contextNode: Node, ignoreNodeCallback: (node: Node) => boolean, ignoreChildrenCallback: (node: Node) => boolean, getTextRangeCallbackCallback: (node: Node) => TextRange): void;

        /**
         * Emits a mapping for the end of a range.
         *
         * If the range's end position is synthetic (undefined or a negative value), no mapping
         * will be created.
         *
         * @param range The range to emit.
         */
        emitEnd(range: TextRange): void;

        /**
         * Emits a mapping for the end of a range.
         *
         * If the node's end position is synthetic (undefined or a negative value), no mapping
         * will be created.
         *
         * @param range The range to emit.
         * @param contextNode The node for the current range.
         * @param ignoreNodeCallback A callback used to determine whether to skip source map
         *        emit for the end position of this node.
         * @param ignoreChildrenCallback A callback used to determine whether to skip source
         *        map emit for all children of this node.
         * @param getTextRangeCallbackCallback A callback used to get a custom source map
         *        range for this node.
         */
        emitEnd(range: TextRange, contextNode: Node, ignoreNodeCallback: (node: Node) => boolean, ignoreChildrenCallback: (node: Node) => boolean, getTextRangeCallbackCallback: (node: Node) => TextRange): void;

        /**
         * Emits a mapping for the start position of a token.
         *
         * If the token's start position is synthetic (undefined or a negative value), no mapping
         * will be created. Any trivia at the start position in the original source will be
         * skipped.
         *
         * @param token The token to emit.
         * @param tokenStartPos The start position of the token.
         * @returns The start position of the token, following any trivia.
         */
        emitTokenStart(token: SyntaxKind, tokenStartPos: number): number;

        /**
         * Emits a mapping for the start position of a token.
         *
         * If the token's start position is synthetic (undefined or a negative value), no mapping
         * will be created. Any trivia at the start position in the original source will be
         * skipped.
         *
         * @param token The token to emit.
         * @param tokenStartPos The start position of the token.
         * @param contextNode The node containing this token.
         * @param ignoreTokenCallback A callback used to determine whether to skip source map
         *        emit for the start position of this token.
         * @param getTokenTextRangeCallback A callback used to get a custom source
         *        map range for this node.
         * @returns The start position of the token, following any trivia.
         */
        emitTokenStart(token: SyntaxKind, tokenStartPos: number, contextNode: Node, ignoreTokenCallback: (node: Node, token: SyntaxKind) => boolean, getTokenTextRangeCallback: (node: Node, token: SyntaxKind) => TextRange): number;

        /**
         * Emits a mapping for the end position of a token.
         *
         * If the token's end position is synthetic (undefined or a negative value), no mapping
         * will be created.
         *
         * @param token The token to emit.
         * @param tokenEndPos The end position of the token.
         * @returns The end position of the token.
         */
        emitTokenEnd(token: SyntaxKind, tokenEndPos: number): number;

        /**
         * Emits a mapping for the end position of a token.
         *
         * If the token's end position is synthetic (undefined or a negative value), no mapping
         * will be created.
         *
         * @param token The token to emit.
         * @param tokenEndPos The end position of the token.
         * @param contextNode The node containing this token.
         * @param ignoreTokenCallback A callback used to determine whether to skip source map
         *        emit for the end position of this token.
         * @param getTokenTextRangeCallback A callback used to get a custom source
         *        map range for this node.
         * @returns The end position of the token.
         */
        emitTokenEnd(token: SyntaxKind, tokenEndPos: number, contextNode: Node, ignoreTokenCallback: (node: Node, token: SyntaxKind) => boolean, getTokenTextRangeCallback: (node: Node, token: SyntaxKind) => TextRange): number;

        /*@deprecated*/ changeEmitSourcePos(): void;
        /*@deprecated*/ stopOverridingSpan(): void;

        /**
         * Gets the text for the source map.
         */
        getText(): string;

        /**
         * Gets the SourceMappingURL for the source map.
         */
        getSourceMappingURL(): string;
    }

    export function createSourceMapWriter(host: EmitHost, writer: EmitTextWriter): SourceMapWriter {
        const compilerOptions = host.getCompilerOptions();
        if (compilerOptions.sourceMap || compilerOptions.inlineSourceMap) {
            if (compilerOptions.extendedDiagnostics) {
                return createSourceMapWriterWithExtendedDiagnostics(host, writer);
            }

            return createSourceMapWriterWorker(host, writer);
        }
        else {
            return getNullSourceMapWriter();
        }
    }

    let nullSourceMapWriter: SourceMapWriter;

    export function getNullSourceMapWriter(): SourceMapWriter {
        if (nullSourceMapWriter === undefined) {
            nullSourceMapWriter = {
                initialize(filePath: string, sourceMapFilePath: string, sourceFiles: SourceFile[], isBundledEmit: boolean): void { },
                reset(): void { },
                getSourceMapData(): SourceMapData { return undefined; },
                setSourceFile(sourceFile: SourceFile): void { },
                emitPos(pos: number): void { },
                emitStart(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (node: Node) => boolean, ignoreChildrenCallback?: (node: Node) => boolean, getTextRangeCallback?: (node: Node) => TextRange): void { },
                emitEnd(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (node: Node) => boolean, ignoreChildrenCallback?: (node: Node) => boolean, getTextRangeCallback?: (node: Node) => TextRange): void { },
                emitTokenStart(token: SyntaxKind, pos: number, contextNode?: Node, ignoreTokenCallback?: (node: Node) => boolean, getTokenTextRangeCallback?: (node: Node, token: SyntaxKind) => TextRange): number { return -1; },
                emitTokenEnd(token: SyntaxKind, end: number, contextNode?: Node, ignoreTokenCallback?: (node: Node) => boolean, getTokenTextRangeCallback?: (node: Node, token: SyntaxKind) => TextRange): number { return -1; },
                changeEmitSourcePos(): void { },
                stopOverridingSpan(): void { },
                getText(): string { return undefined; },
                getSourceMappingURL(): string { return undefined; }
            };
        }

        return nullSourceMapWriter;
    }

    // Used for initialize lastEncodedSourceMapSpan and reset lastEncodedSourceMapSpan when updateLastEncodedAndRecordedSpans
    const defaultLastEncodedSourceMapSpan: SourceMapSpan = {
        emittedLine: 1,
        emittedColumn: 1,
        sourceLine: 1,
        sourceColumn: 1,
        sourceIndex: 0
    };

    function createSourceMapWriterWorker(host: EmitHost, writer: EmitTextWriter): SourceMapWriter {
        const compilerOptions = host.getCompilerOptions();
        const extendedDiagnostics = compilerOptions.extendedDiagnostics;
        let currentSourceFile: SourceFile;
        let currentSourceText: string;
        let sourceMapDir: string; // The directory in which sourcemap will be
        let stopOverridingSpan = false;
        let modifyLastSourcePos = false;

        // Current source map file and its index in the sources list
        let sourceMapSourceIndex: number;

        // Last recorded and encoded spans
        let lastRecordedSourceMapSpan: SourceMapSpan;
        let lastEncodedSourceMapSpan: SourceMapSpan;
        let lastEncodedNameIndex: number;

        // Source map data
        let sourceMapData: SourceMapData;

        // This keeps track of the number of times `disable` has been called without a
        // corresponding call to `enable`. As long as this value is non-zero, mappings will not
        // be recorded.
        // This is primarily used to provide a better experience when debugging binding
        // patterns and destructuring assignments for simple expressions.
        let disableDepth: number;

        return {
            initialize,
            reset,
            getSourceMapData: () => sourceMapData,
            setSourceFile,
            emitPos,
            emitStart,
            emitEnd,
            emitTokenStart,
            emitTokenEnd,
            changeEmitSourcePos,
            stopOverridingSpan: () => stopOverridingSpan = true,
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
            if (sourceMapData) {
                reset();
            }

            currentSourceFile = undefined;
            currentSourceText = undefined;
            disableDepth = 0;

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
            currentSourceFile = undefined;
            sourceMapDir = undefined;
            sourceMapSourceIndex = undefined;
            lastRecordedSourceMapSpan = undefined;
            lastEncodedSourceMapSpan = undefined;
            lastEncodedNameIndex = undefined;
            sourceMapData = undefined;
            disableDepth = 0;
        }

        /**
         * Re-enables the recording of mappings.
         */
        function enable() {
            if (disableDepth > 0) {
                disableDepth--;
            }
        }

        /**
         * Disables the recording of mappings.
         */
        function disable() {
            disableDepth++;
        }

        function updateLastEncodedAndRecordedSpans() {
            if (modifyLastSourcePos) {
                // Reset the source pos
                modifyLastSourcePos = false;

                // Change Last recorded Map with last encoded emit line and character
                lastRecordedSourceMapSpan.emittedLine = lastEncodedSourceMapSpan.emittedLine;
                lastRecordedSourceMapSpan.emittedColumn = lastEncodedSourceMapSpan.emittedColumn;

                // Pop sourceMapDecodedMappings to remove last entry
                sourceMapData.sourceMapDecodedMappings.pop();

                // Point the lastEncodedSourceMapSpace to the previous encoded sourceMapSpan
                // If the list is empty which indicates that we are at the beginning of the file,
                // we have to reset it to default value (same value when we first initialize sourceMapWriter)
                lastEncodedSourceMapSpan = sourceMapData.sourceMapDecodedMappings.length ?
                    sourceMapData.sourceMapDecodedMappings[sourceMapData.sourceMapDecodedMappings.length - 1] :
                    defaultLastEncodedSourceMapSpan;

                // TODO: Update lastEncodedNameIndex
                // Since we dont support this any more, lets not worry about it right now.
                // When we start supporting nameIndex, we will get back to this

                // Change the encoded source map
                const sourceMapMappings = sourceMapData.sourceMapMappings;
                let lenthToSet = sourceMapMappings.length - 1;
                for (; lenthToSet >= 0; lenthToSet--) {
                    const currentChar = sourceMapMappings.charAt(lenthToSet);
                    if (currentChar === ",") {
                        // Separator for the entry found
                        break;
                    }
                    if (currentChar === ";" && lenthToSet !== 0 && sourceMapMappings.charAt(lenthToSet - 1) !== ";") {
                        // Last line separator found
                        break;
                    }
                }
                sourceMapData.sourceMapMappings = sourceMapMappings.substr(0, Math.max(0, lenthToSet));
            }
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
            if (positionIsSynthesized(pos) || disableDepth > 0) {
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

                stopOverridingSpan = false;
            }
            else if (!stopOverridingSpan) {
                // Take the new pos instead since there is no change in emittedLine and column since last location
                lastRecordedSourceMapSpan.sourceLine = sourceLinePos.line;
                lastRecordedSourceMapSpan.sourceColumn = sourceLinePos.character;
                lastRecordedSourceMapSpan.sourceIndex = sourceMapSourceIndex;
            }

            updateLastEncodedAndRecordedSpans();

            if (extendedDiagnostics) {
                performance.mark("afterSourcemap");
                performance.measure("Source Map", "beforeSourcemap", "afterSourcemap");
            }
        }

        function getStartPosPastDecorators(range: TextRange) {
            const rangeHasDecorators = !!(range as Node).decorators;
            return skipTrivia(currentSourceText, rangeHasDecorators ? (range as Node).decorators.end : range.pos);
        }

        /**
         * Emits a mapping for the start of a range.
         *
         * If the range's start position is synthetic (undefined or a negative value), no mapping
         * will be created. Any trivia at the start position in the original source will be
         * skipped.
         *
         * @param range The range to emit.0
         */
        function emitStart(range: TextRange): void;
        /**
         * Emits a mapping for the start of a range.
         *
         * If the node's start position is synthetic (undefined or a negative value), no mapping
         * will be created. Any trivia at the start position in the original source will be
         * skipped.
         *
         * @param range The range to emit.
         * @param contextNode The node for the current range.
         * @param ignoreNodeCallback A callback used to determine whether to skip source map
         *        emit for the start position of this node.
         * @param ignoreChildrenCallback A callback used to determine whether to skip source
         *        map emit for all children of this node.
         * @param getTextRangeCallbackCallback A callback used to get a custom source map
         *        range for this node.
         */
        function emitStart(range: TextRange, contextNode: Node, ignoreNodeCallback: (node: Node) => boolean, ignoreChildrenCallback: (node: Node) => boolean, getTextRangeCallback: (node: Node) => TextRange): void;
        function emitStart(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (node: Node) => boolean, ignoreChildrenCallback?: (node: Node) => boolean, getTextRangeCallback?: (node: Node) => TextRange) {
            if (contextNode) {
                if (!ignoreNodeCallback(contextNode)) {
                    range = getTextRangeCallback(contextNode) || range;
                    emitPos(getStartPosPastDecorators(range));
                }

                if (ignoreChildrenCallback(contextNode)) {
                    disable();
                }
            }
            else {
                emitPos(getStartPosPastDecorators(range));
            }
        }

        /**
         * Emits a mapping for the end of a range.
         *
         * If the range's end position is synthetic (undefined or a negative value), no mapping
         * will be created.
         *
         * @param range The range to emit.
         */
        function emitEnd(range: TextRange): void;
        /**
         * Emits a mapping for the end of a range.
         *
         * If the node's end position is synthetic (undefined or a negative value), no mapping
         * will be created.
         *
         * @param range The range to emit.
         * @param contextNode The node for the current range.
         * @param ignoreNodeCallback A callback used to determine whether to skip source map
         *        emit for the end position of this node.
         * @param ignoreChildrenCallback A callback used to determine whether to skip source
         *        map emit for all children of this node.
         * @param getTextRangeCallbackCallback A callback used to get a custom source map
         *        range for this node.
         */
        function emitEnd(range: TextRange, contextNode: Node, ignoreNodeCallback: (node: Node) => boolean, ignoreChildrenCallback: (node: Node) => boolean, getTextRangeCallback: (node: Node) => TextRange): void;
        function emitEnd(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (node: Node) => boolean, ignoreChildrenCallback?: (node: Node) => boolean, getTextRangeCallback?: (node: Node) => TextRange) {
            if (contextNode) {
                if (ignoreChildrenCallback(contextNode)) {
                    enable();
                }

                if (!ignoreNodeCallback(contextNode)) {
                    range = getTextRangeCallback(contextNode) || range;
                    emitPos(range.end);
                }
            }
            else {
                emitPos(range.end);
            }

            stopOverridingSpan = false;
        }

        /**
         * Emits a mapping for the start position of a token.
         *
         * If the token's start position is synthetic (undefined or a negative value), no mapping
         * will be created. Any trivia at the start position in the original source will be
         * skipped.
         *
         * @param token The token to emit.
         * @param tokenStartPos The start position of the token.
         * @returns The start position of the token, following any trivia.
         */
        function emitTokenStart(token: SyntaxKind, tokenStartPos: number): number;
        /**
         * Emits a mapping for the start position of a token.
         *
         * If the token's start position is synthetic (undefined or a negative value), no mapping
         * will be created. Any trivia at the start position in the original source will be
         * skipped.
         *
         * @param token The token to emit.
         * @param tokenStartPos The start position of the token.
         * @param contextNode The node containing this token.
         * @param ignoreTokenCallback A callback used to determine whether to skip source map
         *        emit for the start position of this token.
         * @param getTokenTextRangeCallback A callback used to get a custom source
         *        map range for this node.
         * @returns The start position of the token, following any trivia.
         */
        function emitTokenStart(token: SyntaxKind, tokenStartPos: number, contextNode: Node, ignoreTokenCallback: (node: Node, token: SyntaxKind) => boolean, getTokenTextRangeCallback: (node: Node, token: SyntaxKind) => TextRange): number;
        function emitTokenStart(token: SyntaxKind, tokenStartPos: number, contextNode?: Node, ignoreTokenCallback?: (node: Node, token: SyntaxKind) => boolean, getTokenTextRangeCallback?: (node: Node, token: SyntaxKind) => TextRange): number {
            if (contextNode) {
                if (ignoreTokenCallback(contextNode, token)) {
                    return skipTrivia(currentSourceText, tokenStartPos);
                }

                const range = getTokenTextRangeCallback(contextNode, token);
                if (range) {
                    tokenStartPos = range.pos;
                }
            }

            tokenStartPos = skipTrivia(currentSourceText, tokenStartPos);
            emitPos(tokenStartPos);
            return tokenStartPos;
        }

        /**
         * Emits a mapping for the end position of a token.
         *
         * If the token's end position is synthetic (undefined or a negative value), no mapping
         * will be created.
         *
         * @param token The token to emit.
         * @param tokenEndPos The end position of the token.
         * @returns The end position of the token.
         */
        function emitTokenEnd(token: SyntaxKind, tokenEndPos: number): number;
        /**
         * Emits a mapping for the end position of a token.
         *
         * If the token's end position is synthetic (undefined or a negative value), no mapping
         * will be created.
         *
         * @param token The token to emit.
         * @param tokenEndPos The end position of the token.
         * @param contextNode The node containing this token.
         * @param ignoreTokenCallback A callback used to determine whether to skip source map
         *        emit for the end position of this token.
         * @param getTokenTextRangeCallback A callback used to get a custom source
         *        map range for this node.
         * @returns The end position of the token.
         */
        function emitTokenEnd(token: SyntaxKind, tokenEndPos: number, contextNode: Node, ignoreTokenCallback: (node: Node, token: SyntaxKind) => boolean, getTokenTextRangeCallback: (node: Node, token: SyntaxKind) => TextRange): number;
        function emitTokenEnd(token: SyntaxKind, tokenEndPos: number, contextNode?: Node, ignoreTokenCallback?: (node: Node, token: SyntaxKind) => boolean, getTokenTextRangeCallback?: (node: Node, token: SyntaxKind) => TextRange): number {
            if (contextNode) {
                if (ignoreTokenCallback(contextNode, token)) {
                    return tokenEndPos;
                }

                const range = getTokenTextRangeCallback(contextNode, token);
                if (range) {
                    tokenEndPos = range.end;
                }
            }

            emitPos(tokenEndPos);
            return tokenEndPos;
        }


        // @deprecated
        function changeEmitSourcePos() {
            Debug.assert(!modifyLastSourcePos);
            modifyLastSourcePos = true;
        }

        /**
         * Set the current source file.
         *
         * @param sourceFile The source file.
         */
        function setSourceFile(sourceFile: SourceFile) {
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

    function createSourceMapWriterWithExtendedDiagnostics(host: EmitHost, writer: EmitTextWriter): SourceMapWriter {
        const {
            initialize,
            reset,
            getSourceMapData,
            setSourceFile,
            emitPos,
            emitStart,
            emitEnd,
            emitTokenStart,
            emitTokenEnd,
            changeEmitSourcePos,
            stopOverridingSpan,
            getText,
            getSourceMappingURL,
        } = createSourceMapWriterWorker(host, writer);
        return {
            initialize,
            reset,
            getSourceMapData,
            setSourceFile,
            emitPos(pos: number): void {
                 performance.mark("sourcemapStart");
                emitPos(pos);
                performance.measure("sourceMapTime", "sourcemapStart");
            },
            emitStart(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (node: Node) => boolean, ignoreChildrenCallback?: (node: Node) => boolean, getTextRangeCallback?: (node: Node) => TextRange): void {
                performance.mark("emitSourcemap:emitStart");
                emitStart(range, contextNode, ignoreNodeCallback, ignoreChildrenCallback, getTextRangeCallback);
                performance.measure("sourceMapTime", "emitSourcemap:emitStart");
            },
            emitEnd(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (node: Node) => boolean, ignoreChildrenCallback?: (node: Node) => boolean, getTextRangeCallback?: (node: Node) => TextRange): void {
                performance.mark("emitSourcemap:emitEnd");
                emitEnd(range, contextNode, ignoreNodeCallback, ignoreChildrenCallback, getTextRangeCallback);
                performance.measure("sourceMapTime", "emitSourcemap:emitEnd");
            },
            emitTokenStart(token: SyntaxKind, tokenStartPos: number, contextNode?: Node, ignoreTokenCallback?: (node: Node) => boolean, getTokenTextRangeCallback?: (node: Node, token: SyntaxKind) => TextRange): number {
                performance.mark("emitSourcemap:emitTokenStart");
                tokenStartPos = emitTokenStart(token, tokenStartPos, contextNode, ignoreTokenCallback, getTokenTextRangeCallback);
                performance.measure("sourceMapTime", "emitSourcemap:emitTokenStart");
                return tokenStartPos;
            },
            emitTokenEnd(token: SyntaxKind, tokenEndPos: number, contextNode?: Node, ignoreTokenCallback?: (node: Node) => boolean, getTokenTextRangeCallback?: (node: Node, token: SyntaxKind) => TextRange): number {
                performance.mark("emitSourcemap:emitTokenEnd");
                tokenEndPos = emitTokenEnd(token, tokenEndPos, contextNode, ignoreTokenCallback, getTokenTextRangeCallback);
                performance.measure("sourceMapTime", "emitSourcemap:emitTokenEnd");
                return tokenEndPos;
            },
            changeEmitSourcePos,
            stopOverridingSpan,
            getText,
            getSourceMappingURL,
        };
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