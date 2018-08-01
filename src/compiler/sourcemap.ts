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
        getText(): string | undefined;

        /**
         * Gets the SourceMappingURL for the source map.
         */
        getSourceMappingURL(): string | undefined;
    }

    export interface SourceMapOptions {
        sourceMap?: boolean;
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        sourceRoot?: string;
        mapRoot?: string;
        extendedDiagnostics?: boolean;
    }

    export function createSourceMapWriter(host: EmitHost, writer: EmitTextWriter, writerOptions: SourceMapOptions = host.getCompilerOptions()): SourceMapWriter {
        let currentSource: SourceMapSource;
        let currentSourceIndex = -1;
        let sourceMapDir: string; // The directory in which sourcemap will be

        // Source map data
        let sourceMapData: SourceMapData;
        let sourceMapDataList: SourceMapData[] | undefined;
        let disabled: boolean = !(writerOptions.sourceMap || writerOptions.inlineSourceMap);

        let sourceMapGenerator: SourceMapGenerator | undefined;
        let sourceMapEmitter: SourceMapEmitter | undefined;

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
            return currentSource.skipTrivia ? currentSource.skipTrivia(pos) : skipTrivia(currentSource.text, pos);
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

            // Initialize source map data
            sourceMapData = {
                sourceMapFilePath,
                jsSourceMappingURL: !writerOptions.inlineSourceMap ? getBaseFileName(normalizeSlashes(sourceMapFilePath)) : undefined!, // TODO: GH#18217
                sourceMapFile: getBaseFileName(normalizeSlashes(filePath)),
                sourceMapSourceRoot: writerOptions.sourceRoot || "",
                sourceMapSources: [],
                inputSourceFileNames: [],
                sourceMapNames: [],
                sourceMapMappings: "",
                sourceMapSourcesContent: writerOptions.inlineSources ? [] : undefined,
            };

            // Normalize source root and make sure it has trailing "/" so that it can be used to combine paths with the
            // relative paths of the sources list in the sourcemap
            sourceMapData.sourceMapSourceRoot = normalizeSlashes(sourceMapData.sourceMapSourceRoot);
            if (sourceMapData.sourceMapSourceRoot.length && sourceMapData.sourceMapSourceRoot.charCodeAt(sourceMapData.sourceMapSourceRoot.length - 1) !== CharacterCodes.slash) {
                sourceMapData.sourceMapSourceRoot += directorySeparator;
            }

            if (writerOptions.mapRoot) {
                sourceMapDir = normalizeSlashes(writerOptions.mapRoot);
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

            // If sourceroot option: Use the relative path corresponding to the common directory path
            // otherwise source locations relative to map file location
            const sourcesDirectoryPath = writerOptions.sourceRoot ? host.getCommonSourceDirectory() : sourceMapDir;
            sourceMapGenerator = createSourceMapGenerator(host, sourceMapData, sourcesDirectoryPath, writerOptions);
            sourceMapEmitter = getSourceMapEmitter(sourceMapGenerator, writer);
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
            currentSourceIndex = -1;
            sourceMapDir = undefined!;
            sourceMapData = undefined!;
            sourceMapDataList = undefined!;
            sourceMapEmitter = undefined;
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

            const { line: sourceLine, character: sourceCharacter } = getLineAndCharacterOfPosition(currentSource, pos);
            Debug.assertDefined(sourceMapEmitter, "Not initialized").emitMapping(currentSourceIndex, sourceLine, sourceCharacter, /*nameIndex*/ undefined);
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
                    const parsed = tryParseRawSourceMap(node.sourceMapText);
                    if (parsed) {
                        Debug.assertDefined(sourceMapEmitter, "Not initialized").emitSourceMap(parsed, node.sourceMapPath!);
                    }
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

            if (isJsonSourceMapSource(sourceFile)) {
                return;
            }

            if (!sourceMapGenerator) return Debug.fail("Not initialized");

            currentSourceIndex = sourceMapGenerator.addSource(sourceFile.fileName);
            if (writerOptions.inlineSources) {
                sourceMapGenerator.setSourceContent(currentSourceIndex, sourceFile.text);
            }
        }

        /**
         * Gets the text for the source map.
         */
        function getText() {
            if (disabled || isJsonSourceMapSource(currentSource)) {
                return undefined;
            }

            return Debug.assertDefined(sourceMapGenerator, "Not initialized").toString();
        }

        /**
         * Gets the SourceMappingURL for the source map.
         */
        function getSourceMappingURL() {
            if (disabled || isJsonSourceMapSource(currentSource)) {
                return undefined;
            }

            if (writerOptions.inlineSourceMap) {
                // Encode the sourceMap into the sourceMap url
                const sourceMapText = Debug.assertDefined(sourceMapGenerator, "Not initialized").toString();
                const base64SourceMapText = base64encode(sys, sourceMapText);
                return sourceMapData.jsSourceMappingURL = `data:application/json;base64,${base64SourceMapText}`;
            }
            else {
                return sourceMapData.jsSourceMappingURL;
            }
        }
    }

    interface SourceMapGeneratorOptions {
        extendedDiagnostics?: boolean;
    }

    function createSourceMapGenerator(host: EmitHost, sourceMapData: SourceMapData, sourcesDirectoryPath: string, generatorOptions: SourceMapGeneratorOptions): SourceMapGenerator {
        const { enter, exit } = generatorOptions.extendedDiagnostics
            ? performance.createTimer("Source Map", "beforeSourcemap", "afterSourcemap")
            : performance.nullTimer;

        // Current source map file and its index in the sources list
        const sourceToSourceIndexMap = createMap<number>();
        let nameToNameIndexMap: Map<number> | undefined;

        // Last recorded and encoded mappings
        let lastGeneratedLine = 0;
        let lastGeneratedCharacter = 0;
        let lastSourceIndex = 0;
        let lastSourceLine = 0;
        let lastSourceCharacter = 0;
        let lastNameIndex = 0;
        let hasLast = false;

        let pendingGeneratedLine = 0;
        let pendingGeneratedCharacter = 0;
        let pendingSourceIndex = 0;
        let pendingSourceLine = 0;
        let pendingSourceCharacter = 0;
        let pendingNameIndex = 0;
        let hasPending = false;
        let hasPendingSource = false;
        let hasPendingName = false;

        return {
            addSource,
            setSourceContent,
            addName,
            addMapping,
            appendSourceMap,
            toJSON,
            toString: () => JSON.stringify(toJSON())
        };

        function addSource(fileName: string) {
            enter();
            const source = getRelativePathToDirectoryOrUrl(sourcesDirectoryPath,
                fileName,
                host.getCurrentDirectory(),
                host.getCanonicalFileName,
                /*isAbsolutePathAnUrl*/ true);

            let sourceIndex = sourceToSourceIndexMap.get(source);
            if (sourceIndex === undefined) {
                sourceIndex = sourceMapData.sourceMapSources.length;
                sourceMapData.sourceMapSources.push(source);
                sourceMapData.inputSourceFileNames.push(fileName);
                sourceToSourceIndexMap.set(source, sourceIndex);
            }
            exit();
            return sourceIndex;
        }

        function setSourceContent(sourceIndex: number, content: string | null) {
            enter();
            if (content !== null) {
                if (!sourceMapData.sourceMapSourcesContent) sourceMapData.sourceMapSourcesContent = [];
                while (sourceMapData.sourceMapSourcesContent.length < sourceIndex) {
                    // tslint:disable-next-line:no-null-keyword boolean-trivia
                    sourceMapData.sourceMapSourcesContent.push(null);
                }
                sourceMapData.sourceMapSourcesContent[sourceIndex] = content;
            }
            exit();
        }

        function addName(name: string) {
            enter();
            if (!sourceMapData.sourceMapNames) sourceMapData.sourceMapNames = [];
            if (!nameToNameIndexMap) nameToNameIndexMap = createMap();
            let nameIndex = nameToNameIndexMap.get(name);
            if (nameIndex === undefined) {
                nameIndex = sourceMapData.sourceMapNames.length;
                sourceMapData.sourceMapNames.push(name);
                nameToNameIndexMap.set(name, nameIndex);
            }
            exit();
            return nameIndex;
        }

        function isNewGeneratedPosition(generatedLine: number, generatedCharacter: number) {
            return !hasPending
                || pendingGeneratedLine !== generatedLine
                || pendingGeneratedCharacter !== generatedCharacter;
        }

        function isBacktrackingSourcePosition(sourceIndex: number | undefined, sourceLine: number | undefined, sourceCharacter: number | undefined) {
            return sourceIndex !== undefined
                && sourceLine !== undefined
                && sourceCharacter !== undefined
                && pendingSourceIndex === sourceIndex
                && (pendingSourceLine > sourceLine
                    || pendingSourceLine === sourceLine && pendingSourceCharacter > sourceCharacter);
        }

        function addMapping(generatedLine: number, generatedCharacter: number, sourceIndex?: number, sourceLine?: number, sourceCharacter?: number, nameIndex?: number) {
            Debug.assert(generatedLine >= pendingGeneratedLine, "generatedLine cannot backtrack");
            Debug.assert(generatedCharacter >= 0, "generatedCharacter cannot be negative");
            Debug.assert(sourceIndex === undefined || sourceIndex >= 0, "sourceIndex cannot be negative");
            Debug.assert(sourceLine === undefined || sourceLine >= 0, "sourceLine cannot be negative");
            Debug.assert(sourceCharacter === undefined || sourceCharacter >= 0, "sourceCharacter cannot be negative");
            enter();
            // If this location wasn't recorded or the location in source is going backwards, record the mapping
            if (isNewGeneratedPosition(generatedLine, generatedCharacter) ||
                isBacktrackingSourcePosition(sourceIndex, sourceLine, sourceCharacter)) {
                commitPendingMapping();
                pendingGeneratedLine = generatedLine;
                pendingGeneratedCharacter = generatedCharacter;
                hasPendingSource = false;
                hasPendingName = false;
                hasPending = true;
            }

            if (sourceIndex !== undefined && sourceLine !== undefined && sourceCharacter !== undefined) {
                pendingSourceIndex = sourceIndex;
                pendingSourceLine = sourceLine;
                pendingSourceCharacter = sourceCharacter;
                hasPendingSource = true;
                if (nameIndex !== undefined) {
                    pendingNameIndex = nameIndex;
                    hasPendingName = true;
                }
            }
            exit();
        }

        function appendSourceMap(generatedLine: number, generatedCharacter: number, map: RawSourceMap, sourceMapPath: string) {
            Debug.assert(generatedLine >= pendingGeneratedLine, "generatedLine cannot backtrack");
            Debug.assert(generatedCharacter >= 0, "generatedCharacter cannot be negative");
            enter();
            // First, decode the old component sourcemap
            const sourceIndexToNewSourceIndexMap: number[] = [];
            let nameIndexToNewNameIndexMap: number[] | undefined;
            const mappingIterator = sourcemaps.decodeMappings(map);
            for (let { value: raw, done } = mappingIterator.next(); !done; { value: raw, done } = mappingIterator.next()) {
                // Then reencode all the updated mappings into the overall map
                let newSourceIndex: number | undefined;
                let newSourceLine: number | undefined;
                let newSourceCharacter: number | undefined;
                let newNameIndex: number | undefined;
                if (raw.sourceIndex !== undefined) {
                    newSourceIndex = sourceIndexToNewSourceIndexMap[raw.sourceIndex];
                    if (newSourceIndex === undefined) {
                        // Apply offsets to each position and fixup source entries
                        const rawPath = map.sources[raw.sourceIndex];
                        const relativePath = map.sourceRoot ? combinePaths(map.sourceRoot, rawPath) : rawPath;
                        const combinedPath = combinePaths(getDirectoryPath(sourceMapPath), relativePath);
                        sourceIndexToNewSourceIndexMap[raw.sourceIndex] = newSourceIndex = addSource(combinedPath);
                        if (map.sourcesContent && typeof map.sourcesContent[raw.sourceIndex] === "string") {
                            setSourceContent(newSourceIndex, map.sourcesContent[raw.sourceIndex]);
                        }
                    }

                    newSourceLine = raw.sourceLine;
                    newSourceCharacter = raw.sourceColumn;
                    if (map.names && raw.nameIndex !== undefined) {
                        if (!nameIndexToNewNameIndexMap) nameIndexToNewNameIndexMap = [];
                        newNameIndex = nameIndexToNewNameIndexMap[raw.nameIndex];
                        if (newNameIndex === undefined) {
                            nameIndexToNewNameIndexMap[raw.nameIndex] = newNameIndex = addName(map.names[raw.nameIndex]);
                        }
                    }
                }

                const newGeneratedLine = raw.emittedLine + generatedLine;
                const newGeneratedCharacter = raw.emittedLine === 0 ? raw.emittedColumn + generatedCharacter : raw.emittedColumn;
                addMapping(newGeneratedLine, newGeneratedCharacter, newSourceIndex, newSourceLine, newSourceCharacter, newNameIndex);
            }
            exit();
        }

        function shouldCommitMapping() {
            return !hasLast
                || lastGeneratedLine !== pendingGeneratedLine
                || lastGeneratedCharacter !== pendingGeneratedCharacter
                || lastSourceIndex !== pendingSourceIndex
                || lastSourceLine !== pendingSourceLine
                || lastSourceCharacter !== pendingSourceCharacter
                || lastNameIndex !== pendingNameIndex;
        }

        // Encoding for sourcemap span
        function commitPendingMapping() {
            if (!hasPending || !shouldCommitMapping()) {
                return;
            }

            enter();

            // Line/Comma delimiters
            if (lastGeneratedLine < pendingGeneratedLine) {
                // Emit line delimiters
                do {
                    sourceMapData.sourceMapMappings += ";";
                    lastGeneratedLine++;
                    lastGeneratedCharacter = 0;
                }
                while (lastGeneratedLine < pendingGeneratedLine);
            }
            else {
                Debug.assertEqual(lastGeneratedLine, pendingGeneratedLine, "generatedLine cannot backtrack");
                // Emit comma to separate the entry
                if (hasLast) {
                    sourceMapData.sourceMapMappings += ",";
                }
            }

            // 1. Relative generated character
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(pendingGeneratedCharacter - lastGeneratedCharacter);
            lastGeneratedCharacter = pendingGeneratedCharacter;

            if (hasPendingSource) {
                // 2. Relative sourceIndex
                sourceMapData.sourceMapMappings += base64VLQFormatEncode(pendingSourceIndex - lastSourceIndex);
                lastSourceIndex = pendingSourceIndex;

                // 3. Relative source line
                sourceMapData.sourceMapMappings += base64VLQFormatEncode(pendingSourceLine - lastSourceLine);
                lastSourceLine = pendingSourceLine;

                // 4. Relative source character
                sourceMapData.sourceMapMappings += base64VLQFormatEncode(pendingSourceCharacter - lastSourceCharacter);
                lastSourceCharacter = pendingSourceCharacter;

                if (hasPendingName) {
                    // 5. Relative nameIndex
                    sourceMapData.sourceMapMappings += base64VLQFormatEncode(pendingNameIndex - lastNameIndex);
                    lastNameIndex = pendingNameIndex;
                }
            }

            hasLast = true;
            exit();
        }

        function toJSON(): RawSourceMap {
            commitPendingMapping();
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
    }

    function getSourceMapEmitter(generator: SourceMapGenerator, writer: EmitTextWriter): SourceMapEmitter {
        if (writer.getSourceMapEmitter) {
            return writer.getSourceMapEmitter(generator);
        }

        return createSourceMapEmitter(generator, writer);
    }

    function createSourceMapEmitter(generator: SourceMapGenerator, writer: EmitTextWriter) {
        return {
            emitMapping,
            emitSourceMap
        };

        function emitMapping(sourceIndex?: number, sourceLine?: number, sourceCharacter?: number, nameIndex?: number) {
            return generator.addMapping(writer.getLine(), writer.getColumn(), sourceIndex!, sourceLine!, sourceCharacter!, nameIndex);
        }

        function emitSourceMap(sourceMap: RawSourceMap, sourceMapPath: string): void {
            return generator.appendSourceMap(writer.getLine(), writer.getColumn(), sourceMap, sourceMapPath);
        }
    }

    function isStringOrNull(x: any) {
        // tslint:disable-next-line:no-null-keyword
        return typeof x === "string" || x === null;
    }

    export function isRawSourceMap(x: any): x is RawSourceMap {
        // tslint:disable-next-line:no-null-keyword
        return x !== null
            && typeof x === "object"
            && x.version === 3
            && typeof x.file === "string"
            && typeof x.mappings === "string"
            && isArray(x.sources) && every(x.sources, isString)
            && (x.sourceRoot === undefined || x.sourceRoot === null || typeof x.sourceRoot === "string")
            && (x.sourcesContent === undefined || x.sourcesContent === null || isArray(x.sourcesContent) && every(x.sourcesContent, isStringOrNull))
            && (x.names === undefined || x.names === null || isArray(x.names) && every(x.names, isString));
    }

    export function tryParseRawSourceMap(text: string) {
        try {
            const parsed = JSON.parse(text);
            if (isRawSourceMap(parsed)) {
                return parsed;
            }
        }
        catch {
            // empty
        }

        return undefined;
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
