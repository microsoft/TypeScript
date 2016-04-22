/// <reference path="checker.ts"/>

/* @internal */
namespace ts {
    export interface SourceMapWriter {
        getSourceMapData(): SourceMapData;
        setSourceFile(sourceFile: SourceFile): void;
        emitPos(pos: number, contextNode: Node, shouldIgnorePosCallback: (node: Node) => boolean): void;
        emitPos(pos: number): void;
        emitStart(node: Node, shouldIgnoreNodeCallback?: (node: Node) => boolean, shouldIgnoreChildrenCallback?: (node: Node) => boolean, getCustomSourceMapRangeForNode?: (node: Node) => TextRange): void;
        emitStart(range: TextRange): void;
        emitEnd(node: Node, shouldIgnoreNodeCallback?: (node: Node) => boolean, shouldIgnoreChildrenCallback?: (node: Node) => boolean, getCustomSourceMapRangeForNode?: (node: Node) => TextRange): void;
        emitEnd(range: TextRange): void;
        /*@deprecated*/ changeEmitSourcePos(): void;
        /*@deprecated*/ stopOverridingSpan(): void;
        getText(): string;
        getSourceMappingURL(): string;
        initialize(filePath: string, sourceMapFilePath: string, sourceFiles: SourceFile[], isBundledEmit: boolean): void;
        reset(): void;
        enable(): void;
        disable(): void;
    }

    let nullSourceMapWriter: SourceMapWriter;
    // Used for initialize lastEncodedSourceMapSpan and reset lastEncodedSourceMapSpan when updateLastEncodedAndRecordedSpans
    const defaultLastEncodedSourceMapSpan: SourceMapSpan = {
        emittedLine: 1,
        emittedColumn: 1,
        sourceLine: 1,
        sourceColumn: 1,
        sourceIndex: 0
    };

    export function getNullSourceMapWriter(): SourceMapWriter {
        if (nullSourceMapWriter === undefined) {
            nullSourceMapWriter = {
                getSourceMapData(): SourceMapData { return undefined; },
                setSourceFile(sourceFile: SourceFile): void { },
                emitStart(range: TextRange | Node, shouldIgnoreNodeCallback?: (node: Node) => boolean, shouldIgnoreChildrenCallback?: (node: Node) => boolean, getCustomSourceMapRangeForNode?: (node: Node) => TextRange): void { },
                emitEnd(range: TextRange | Node, shouldIgnoreNodeCallback?: (node: Node) => boolean, shouldIgnoreChildrenCallback?: (node: Node) => boolean, getCustomSourceMapRangeForNode?: (node: Node) => TextRange): void { },
                emitPos(pos: number): void { },
                changeEmitSourcePos(): void { },
                stopOverridingSpan(): void { },
                getText(): string { return undefined; },
                getSourceMappingURL(): string { return undefined; },
                initialize(filePath: string, sourceMapFilePath: string, sourceFiles: SourceFile[], isBundledEmit: boolean): void { },
                reset(): void { },
                enable(): void { },
                disable(): void { }
            };
        }

        return nullSourceMapWriter;
    }

    export function createSourceMapWriter(host: EmitHost, writer: EmitTextWriter): SourceMapWriter {
        const compilerOptions = host.getCompilerOptions();
        let currentSourceFile: SourceFile;
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
            getSourceMapData: () => sourceMapData,
            setSourceFile,
            emitPos,
            emitStart,
            emitEnd,
            changeEmitSourcePos,
            stopOverridingSpan: () => stopOverridingSpan = true,
            getText,
            getSourceMappingURL,
            initialize,
            reset,
            enable,
            disable,
        };

        function initialize(filePath: string, sourceMapFilePath: string, sourceFiles: SourceFile[], isBundledEmit: boolean) {
            if (sourceMapData) {
                reset();
            }

            currentSourceFile = undefined;
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

        function emitPos(pos: number, contextNode?: Node, shouldIgnorePosCallback?: (node: Node) => boolean) {
            if (positionIsSynthesized(pos) || disableDepth > 0) {
                return;
            }

            if (shouldIgnorePosCallback && shouldIgnorePosCallback(contextNode)) {
                return;
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
        }

        function getStartPos(range: TextRange) {
            const rangeHasDecorators = !!(range as Node).decorators;
            return range.pos !== -1 ? skipTrivia(currentSourceFile.text, rangeHasDecorators ? (range as Node).decorators.end : range.pos) : -1;
        }

        function emitStart(range: TextRange): void;
        function emitStart(node: Node, shouldIgnoreNodeCallback?: (node: Node) => boolean, shouldIgnoreChildrenCallback?: (node: Node) => boolean, getCustomSourceMapRangeForNode?: (node: Node) => TextRange): void;
        function emitStart(nodeOrRange: TextRange | Node, shouldIgnoreNodeCallback?: (node: Node) => boolean, shouldIgnoreChildrenCallback?: (node: Node) => boolean, getCustomSourceMapRangeForNode?: (node: Node) => TextRange) {
            let range = <TextRange>nodeOrRange;
            if (!(shouldIgnoreNodeCallback && shouldIgnoreNodeCallback(<Node>nodeOrRange))) {
                if (getCustomSourceMapRangeForNode) {
                    range = getCustomSourceMapRangeForNode(<Node>nodeOrRange) || range;
                }

                emitPos(getStartPos(range));
            }

            if (shouldIgnoreChildrenCallback && shouldIgnoreChildrenCallback(<Node>nodeOrRange)) {
                disable();
            }
        }

        function emitEnd(range: TextRange): void;
        function emitEnd(node: Node, shouldIgnoreNodeCallback?: (node: Node) => boolean, shouldIgnoreChildrenCallback?: (node: Node) => boolean, getCustomSourceMapRangeForNode?: (node: Node) => TextRange): void;
        function emitEnd(nodeOrRange: TextRange | Node, shouldIgnoreNodeCallback?: (node: Node) => boolean, shouldIgnoreChildrenCallback?: (node: Node) => boolean, getCustomSourceMapRangeForNode?: (node: Node) => TextRange) {
            let range = <TextRange>nodeOrRange;
            if (shouldIgnoreChildrenCallback && shouldIgnoreChildrenCallback(<Node>nodeOrRange)) {
                enable();
            }

            if (!(shouldIgnoreNodeCallback && shouldIgnoreNodeCallback(<Node>nodeOrRange))) {
                if (getCustomSourceMapRangeForNode) {
                    range = getCustomSourceMapRangeForNode(<Node>nodeOrRange) || range;
                }

                emitPos(range.end);
            }

            stopOverridingSpan = false;
        }

        function changeEmitSourcePos() {
            Debug.assert(!modifyLastSourcePos);
            modifyLastSourcePos = true;
        }

        function setSourceFile(sourceFile: SourceFile) {
            currentSourceFile = sourceFile;

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
                sourceMapData.inputSourceFileNames.push(sourceFile.fileName);

                if (compilerOptions.inlineSources) {
                    sourceMapData.sourceMapSourcesContent.push(sourceFile.text);
                }
            }
        }

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