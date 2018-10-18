/* @internal */
namespace ts {
    export interface SourceMapWriter {
        /**
         * Initialize the SourceMapWriter for a new output file.
         *
         * @param filePath The path to the generated output file.
         * @param sourceMapFilePath The path to the output source map file.
         * @param sourceFileOrBundle The input source file or bundle for the program.
         */
        initialize(filePath: string, sourceMapFilePath: string | undefined, sourceFileOrBundle: SourceFile | Bundle, sourceMapOutput?: SourceMapData[]): void;

        /**
         * Reset the SourceMapWriter to an empty state.
         */
        reset(): void;

        /**
         * Set the current source file.
         *
         * @param sourceFile The source file.
         */
        setSourceFile(sourceFile: SourceMapSource): void;

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
         * @param hint The current emit context
         * @param node The node to emit.
         * @param emitCallback The callback used to emit the node.
         */
        emitNodeWithSourceMap(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;

        /**
         * Emits a token of a node node with possible leading and trailing source maps.
         *
         * @param node The node containing the token.
         * @param token The token to emit.
         * @param tokenStartPos The start pos of the token.
         * @param emitCallback The callback used to emit the token.
         */
        emitTokenWithSourceMap(node: Node, token: SyntaxKind, writer: (s: string) => void, tokenStartPos: number, emitCallback: (token: SyntaxKind, writer: (s: string) => void, tokenStartPos: number) => number): number;

        /**
         * Gets the text for the source map.
         */
        getText(): string;

        /**
         * Gets the SourceMappingURL for the source map.
         */
        getSourceMappingURL(): string;
    }

    // Used for initialize lastEncodedSourceMapSpan and reset lastEncodedSourceMapSpan when updateLastEncodedAndRecordedSpans
    const defaultLastEncodedSourceMapSpan: SourceMapSpan = {
        emittedLine: 0,
        emittedColumn: 0,
        sourceLine: 0,
        sourceColumn: 0,
        sourceIndex: 0
    };

    export interface SourceMapOptions {
        sourceMap?: boolean;
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        sourceRoot?: string;
        mapRoot?: string;
        extendedDiagnostics?: boolean;
    }

    export function createSourceMapWriter(host: EmitHost, writer: EmitTextWriter, compilerOptions: SourceMapOptions = host.getCompilerOptions()): SourceMapWriter {
        const extendedDiagnostics = compilerOptions.extendedDiagnostics;
        let currentSource: SourceMapSource;
        let currentSourceText: string;
        let sourceMapDir: string; // The directory in which sourcemap will be

        // Current source map file and its index in the sources list
        let sourceMapSourceIndex: number;

        // Last recorded and encoded spans
        let lastRecordedSourceMapSpan: SourceMapSpan | undefined;
        let lastEncodedSourceMapSpan: SourceMapSpan | undefined;
        let lastEncodedNameIndex: number | undefined;

        // Source map data
        let sourceMapData: SourceMapData;
        let sourceMapDataList: SourceMapData[] | undefined;
        let disabled: boolean = !(compilerOptions.sourceMap || compilerOptions.inlineSourceMap);

        return {
            initialize,
            reset,
            setSourceFile,
            emitPos,
            emitNodeWithSourceMap,
            emitTokenWithSourceMap,
            getText,
            getSourceMappingURL,
        };

        /**
         * Skips trivia such as comments and white-space that can optionally overriden by the source map source
         */
        function skipSourceTrivia(pos: number): number {
            return currentSource.skipTrivia ? currentSource.skipTrivia(pos) : skipTrivia(currentSourceText, pos);
        }

        /**
         * Initialize the SourceMapWriter for a new output file.
         *
         * @param filePath The path to the generated output file.
         * @param sourceMapFilePath The path to the output source map file.
         * @param sourceFileOrBundle The input source file or bundle for the program.
         */
        function initialize(filePath: string, sourceMapFilePath: string, sourceFileOrBundle: SourceFile | Bundle, outputSourceMapDataList?: SourceMapData[]) {
            if (disabled || fileExtensionIs(filePath, Extension.Json)) {
                return;
            }

            if (sourceMapData) {
                reset();
            }
            sourceMapDataList = outputSourceMapDataList;

            currentSource = undefined!;
            currentSourceText = undefined!;

            // Current source map file and its index in the sources list
            sourceMapSourceIndex = -1;

            // Last recorded and encoded spans
            lastRecordedSourceMapSpan = undefined;
            lastEncodedSourceMapSpan = defaultLastEncodedSourceMapSpan;
            lastEncodedNameIndex = 0;

            // Initialize source map data
            sourceMapData = {
                sourceMapFilePath,
                jsSourceMappingURL: !compilerOptions.inlineSourceMap ? getBaseFileName(normalizeSlashes(sourceMapFilePath)) : undefined!, // TODO: GH#18217
                sourceMapFile: getBaseFileName(normalizeSlashes(filePath)),
                sourceMapSourceRoot: compilerOptions.sourceRoot || "",
                sourceMapSources: [],
                inputSourceFileNames: [],
                sourceMapNames: [],
                sourceMapMappings: "",
                sourceMapSourcesContent: compilerOptions.inlineSources ? [] : undefined,
            };

            // Normalize source root and make sure it has trailing "/" so that it can be used to combine paths with the
            // relative paths of the sources list in the sourcemap
            sourceMapData.sourceMapSourceRoot = normalizeSlashes(sourceMapData.sourceMapSourceRoot);
            if (sourceMapData.sourceMapSourceRoot.length && sourceMapData.sourceMapSourceRoot.charCodeAt(sourceMapData.sourceMapSourceRoot.length - 1) !== CharacterCodes.slash) {
                sourceMapData.sourceMapSourceRoot += directorySeparator;
            }

            if (compilerOptions.mapRoot) {
                sourceMapDir = normalizeSlashes(compilerOptions.mapRoot);
                if (sourceFileOrBundle.kind === SyntaxKind.SourceFile) { // emitting single module file
                    // For modules or multiple emit files the mapRoot will have directory structure like the sources
                    // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                    sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceFileOrBundle.fileName, host, sourceMapDir));
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

            // Record source map data for the test harness.
            if (sourceMapDataList) {
                sourceMapDataList.push(sourceMapData);
            }

            currentSource = undefined!;
            sourceMapDir = undefined!;
            sourceMapSourceIndex = undefined!;
            lastRecordedSourceMapSpan = undefined;
            lastEncodedSourceMapSpan = undefined!;
            lastEncodedNameIndex = undefined;
            sourceMapData = undefined!;
            sourceMapDataList = undefined!;
        }

        type SourceMapSectionDefinition =
            | { offset: { line: number, column: number }, url: string } // Included for completeness
            | { offset: { line: number, column: number }, map: SourceMap };

        interface SectionalSourceMap {
            version: 3;
            file: string;
            sections: SourceMapSectionDefinition[];
        }

        type SourceMap = SectionalSourceMap | SourceMapSection;

        function captureSection(): SourceMapSection {
            return {
                version: 3,
                file: sourceMapData.sourceMapFile,
                sourceRoot: sourceMapData.sourceMapSourceRoot,
                sources: sourceMapData.sourceMapSources,
                names: sourceMapData.sourceMapNames,
                mappings: sourceMapData.sourceMapMappings,
                sourcesContent: sourceMapData.sourceMapSourcesContent,
            };
        }


        // Encoding for sourcemap span
        function encodeLastRecordedSourceMapSpan() {
            if (!lastRecordedSourceMapSpan || lastRecordedSourceMapSpan === lastEncodedSourceMapSpan) {
                return;
            }

            Debug.assert(lastRecordedSourceMapSpan.emittedColumn >= 0, "lastEncodedSourceMapSpan.emittedColumn was negative");
            Debug.assert(lastRecordedSourceMapSpan.sourceIndex >= 0, "lastEncodedSourceMapSpan.sourceIndex was negative");
            Debug.assert(lastRecordedSourceMapSpan.sourceLine >= 0, "lastEncodedSourceMapSpan.sourceLine was negative");
            Debug.assert(lastRecordedSourceMapSpan.sourceColumn >= 0, "lastEncodedSourceMapSpan.sourceColumn was negative");

            let prevEncodedEmittedColumn = lastEncodedSourceMapSpan!.emittedColumn;
            // Line/Comma delimiters
            if (lastEncodedSourceMapSpan!.emittedLine === lastRecordedSourceMapSpan.emittedLine) {
                // Emit comma to separate the entry
                if (sourceMapData.sourceMapMappings) {
                    sourceMapData.sourceMapMappings += ",";
                }
            }
            else {
                // Emit line delimiters
                for (let encodedLine = lastEncodedSourceMapSpan!.emittedLine; encodedLine < lastRecordedSourceMapSpan.emittedLine; encodedLine++) {
                    sourceMapData.sourceMapMappings += ";";
                }
                prevEncodedEmittedColumn = 0;
            }

            // 1. Relative Column 0 based
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.emittedColumn - prevEncodedEmittedColumn);

            // 2. Relative sourceIndex
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.sourceIndex - lastEncodedSourceMapSpan!.sourceIndex);

            // 3. Relative sourceLine 0 based
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.sourceLine - lastEncodedSourceMapSpan!.sourceLine);

            // 4. Relative sourceColumn 0 based
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.sourceColumn - lastEncodedSourceMapSpan!.sourceColumn);

            // 5. Relative namePosition 0 based
            if (lastRecordedSourceMapSpan.nameIndex! >= 0) {
                Debug.assert(false, "We do not support name index right now, Make sure to update updateLastEncodedAndRecordedSpans when we start using this");
                sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.nameIndex! - lastEncodedNameIndex!);
                lastEncodedNameIndex = lastRecordedSourceMapSpan.nameIndex;
            }

            lastEncodedSourceMapSpan = lastRecordedSourceMapSpan;
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
            if (disabled || positionIsSynthesized(pos) || isJsonSourceMapSource(currentSource)) {
                return;
            }

            if (extendedDiagnostics) {
                performance.mark("beforeSourcemap");
            }

            const sourceLinePos = getLineAndCharacterOfPosition(currentSource, pos);

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
                    emittedLine,
                    emittedColumn,
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

        function isPossiblySourceMap(x: {}): x is SourceMapSection {
            return typeof x === "object" && !!(x as any).mappings && typeof (x as any).mappings === "string" && !!(x as any).sources;
        }

        /**
         * Emits a node with possible leading and trailing source maps.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to emit.
         * @param emitCallback The callback used to emit the node.
         */
        function emitNodeWithSourceMap(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) {
            if (disabled || isInJsonFile(node)) {
                return emitCallback(hint, node);
            }

            if (node) {
                if (isUnparsedSource(node) && node.sourceMapText !== undefined) {
                    const text = node.sourceMapText;
                    let parsed: {} | undefined;
                    try {
                        parsed = JSON.parse(text);
                    }
                    catch {
                        // empty
                    }
                    if (!parsed || !isPossiblySourceMap(parsed)) {
                        return emitCallback(hint, node);
                    }
                    const offsetLine = writer.getLine();
                    const firstLineColumnOffset = writer.getColumn();
                    // First, decode the old component sourcemap
                    const originalMap = parsed;

                    const sourcesDirectoryPath = compilerOptions.sourceRoot ? host.getCommonSourceDirectory() : sourceMapDir;
                    const resolvedPathCache = createMap<string>();
                    const absolutePathCache = createMap<string>();
                    const sourcemapIterator = sourcemaps.decodeMappings(originalMap);
                    for (let { value: raw, done } = sourcemapIterator.next(); !done; { value: raw, done } = sourcemapIterator.next()) {
                        const pathCacheKey = "" + raw.sourceIndex;
                        // Apply offsets to each position and fixup source entries
                        if (!resolvedPathCache.has(pathCacheKey)) {
                            const rawPath = originalMap.sources[raw.sourceIndex];
                            const relativePath = originalMap.sourceRoot ? combinePaths(originalMap.sourceRoot, rawPath) : rawPath;
                            const combinedPath = combinePaths(getDirectoryPath(node.sourceMapPath!), relativePath);
                            const resolvedPath = getRelativePathToDirectoryOrUrl(
                                sourcesDirectoryPath,
                                combinedPath,
                                host.getCurrentDirectory(),
                                host.getCanonicalFileName,
                                /*isAbsolutePathAnUrl*/ true
                            );
                            resolvedPathCache.set(pathCacheKey, resolvedPath);
                            absolutePathCache.set(pathCacheKey, getNormalizedAbsolutePath(resolvedPath, sourcesDirectoryPath));
                        }
                        const resolvedPath = resolvedPathCache.get(pathCacheKey)!;
                        const absolutePath = absolutePathCache.get(pathCacheKey)!;
                        // tslint:disable-next-line:no-null-keyword
                        setupSourceEntry(absolutePath, originalMap.sourcesContent ? originalMap.sourcesContent[raw.sourceIndex] : null, resolvedPath); // TODO: Lookup content for inlining?
                        const newIndex = sourceMapData.sourceMapSources.indexOf(resolvedPath);
                        // Then reencode all the updated spans into the overall map
                        encodeLastRecordedSourceMapSpan();
                        lastRecordedSourceMapSpan = {
                            ...raw,
                            emittedLine: raw.emittedLine + offsetLine,
                            emittedColumn: raw.emittedLine === 0 ? (raw.emittedColumn + firstLineColumnOffset) : raw.emittedColumn,
                            sourceIndex: newIndex,
                        };
                    }
                    // And actually emit the text these sourcemaps are for
                    return emitCallback(hint, node);
                }
                const emitNode = node.emitNode;
                const emitFlags = emitNode && emitNode.flags || EmitFlags.None;
                const range = emitNode && emitNode.sourceMapRange;
                const { pos, end } = range || node;
                let source = range && range.source;
                const oldSource = currentSource;
                if (source === oldSource) source = undefined;

                if (source) setSourceFile(source);

                if (node.kind !== SyntaxKind.NotEmittedStatement
                    && (emitFlags & EmitFlags.NoLeadingSourceMap) === 0
                    && pos >= 0) {
                    emitPos(skipSourceTrivia(pos));
                }

                if (source) setSourceFile(oldSource);

                if (emitFlags & EmitFlags.NoNestedSourceMaps) {
                    disabled = true;
                    emitCallback(hint, node);
                    disabled = false;
                }
                else {
                    emitCallback(hint, node);
                }

                if (source) setSourceFile(source);

                if (node.kind !== SyntaxKind.NotEmittedStatement
                    && (emitFlags & EmitFlags.NoTrailingSourceMap) === 0
                    && end >= 0) {
                    emitPos(end);
                }

                if (source) setSourceFile(oldSource);
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
        function emitTokenWithSourceMap(node: Node, token: SyntaxKind, writer: (s: string) => void, tokenPos: number, emitCallback: (token: SyntaxKind, writer: (s: string) => void, tokenStartPos: number) => number) {
            if (disabled || isInJsonFile(node)) {
                return emitCallback(token, writer, tokenPos);
            }

            const emitNode = node && node.emitNode;
            const emitFlags = emitNode && emitNode.flags || EmitFlags.None;
            const range = emitNode && emitNode.tokenSourceMapRanges && emitNode.tokenSourceMapRanges[token];

            tokenPos = skipSourceTrivia(range ? range.pos : tokenPos);
            if ((emitFlags & EmitFlags.NoTokenLeadingSourceMaps) === 0 && tokenPos >= 0) {
                emitPos(tokenPos);
            }

            tokenPos = emitCallback(token, writer, tokenPos);

            if (range) tokenPos = range.end;
            if ((emitFlags & EmitFlags.NoTokenTrailingSourceMaps) === 0 && tokenPos >= 0) {
                emitPos(tokenPos);
            }

            return tokenPos;
        }

        function isJsonSourceMapSource(sourceFile: SourceMapSource) {
            return fileExtensionIs(sourceFile.fileName, Extension.Json);
        }

        /**
         * Set the current source file.
         *
         * @param sourceFile The source file.
         */
        function setSourceFile(sourceFile: SourceMapSource) {
            if (disabled) {
                return;
            }

            currentSource = sourceFile;
            currentSourceText = currentSource.text;

            if (isJsonSourceMapSource(sourceFile)) {
                return;
            }

            setupSourceEntry(sourceFile.fileName, sourceFile.text);
        }

        function setupSourceEntry(fileName: string, content: string | null, source?: string) {
            if (!source) {
                // Add the file to tsFilePaths
                // If sourceroot option: Use the relative path corresponding to the common directory path
                // otherwise source locations relative to map file location
                const sourcesDirectoryPath = compilerOptions.sourceRoot ? host.getCommonSourceDirectory() : sourceMapDir;

                source = getRelativePathToDirectoryOrUrl(sourcesDirectoryPath,
                    fileName,
                    host.getCurrentDirectory(),
                    host.getCanonicalFileName,
                    /*isAbsolutePathAnUrl*/ true);
            }

            sourceMapSourceIndex = sourceMapData.sourceMapSources.indexOf(source);
            if (sourceMapSourceIndex === -1) {
                sourceMapSourceIndex = sourceMapData.sourceMapSources.length;
                sourceMapData.sourceMapSources.push(source);

                // The one that can be used from program to get the actual source file
                sourceMapData.inputSourceFileNames.push(fileName);

                if (compilerOptions.inlineSources) {
                    sourceMapData.sourceMapSourcesContent!.push(content);
                }
            }
        }

        /**
         * Gets the text for the source map.
         */
        function getText() {
            if (disabled || isJsonSourceMapSource(currentSource)) {
                return undefined!; // TODO: GH#18217
            }

            encodeLastRecordedSourceMapSpan();

            return JSON.stringify(captureSection());
        }

        /**
         * Gets the SourceMappingURL for the source map.
         */
        function getSourceMappingURL() {
            if (disabled || isJsonSourceMapSource(currentSource)) {
                return undefined!; // TODO: GH#18217
            }

            if (compilerOptions.inlineSourceMap) {
                // Encode the sourceMap into the sourceMap url
                const base64SourceMapText = base64encode(sys, getText());
                return sourceMapData.jsSourceMappingURL = `data:application/json;base64,${base64SourceMapText}`;
            }
            else {
                return sourceMapData.jsSourceMappingURL;
            }
        }
    }

    export interface SourceMapSection {
        version: 3;
        file: string;
        sourceRoot?: string;
        sources: string[];
        names?: string[];
        mappings: string;
        sourcesContent?: (string | null)[];
        sections?: undefined;
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
