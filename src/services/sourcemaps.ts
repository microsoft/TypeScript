/* @internal */
namespace ts.sourcemaps {
    export interface SourceMapData {
        version?: number;
        file?: string;
        sourceRoot?: string;
        sources: string[];
        sourcesContent?: string[];
        names?: string[];
        mappings: string;
    }

    export interface SourceMappableLocation {
        fileName: string;
        position: number;
    }

    export interface SourceMapper {
        getOriginalPosition(input: SourceMappableLocation): SourceMappableLocation;
        getGeneratedPosition(input: SourceMappableLocation): SourceMappableLocation;
    }

    export const identitySourceMapper = { getOriginalPosition: identity, getGeneratedPosition: identity };

    export interface SourceMapDecodeHost {
        readFile(path: string): string;
        fileExists(path: string): boolean;
        getCanonicalFileName(path: string): string;
        log(text: string): void;
    }

    export function decode(host: SourceMapDecodeHost, mapPath: string, map: SourceMapData, program?: Program): SourceMapper {
        const currentDirectory = getDirectoryPath(mapPath);
        const fallbackCache: Map<SourceFileLike> = createMap();
        let decodedMappings: ProcessedSourceMapSpan[];
        let forwardSortedMappings: ProcessedSourceMapSpan[];
        let reverseSortedMappings: ProcessedSourceMapSpan[];

        return {
            getOriginalPosition,
            getGeneratedPosition
        };

        function getGeneratedPosition(loc: SourceMappableLocation): SourceMappableLocation {
            const maps = filter(getForwardSortedMappings(), m => comparePaths(loc.fileName, m.sourcePath, currentDirectory) === 0);
            if (!length(maps)) return loc;
            let targetIndex = binarySearch(maps, { sourcePosition: loc.position }, getSourcePosition, compareValues);
            if (targetIndex < 0 && maps.length > 0) {
                // if no exact match, closest is 2's compliment of result
                targetIndex = ~targetIndex;
            }
            return { fileName: toPath(map.file, currentDirectory, host.getCanonicalFileName), position: maps[targetIndex].emittedPosition }; // Closest span
        }

        function getOriginalPosition(loc: SourceMappableLocation): SourceMappableLocation {
            const maps = getReverseSortedMappings();
            if (!length(maps)) return loc;
            let targetIndex = binarySearch(maps, { emittedPosition: loc.position }, identity, compareProcessedSpanEmittedPositions);
            if (targetIndex < 0 && maps.length > 0) {
                // if no exact match, closest is 2's compliment of result
                targetIndex = ~targetIndex;
            }
            return { fileName: toPath(maps[targetIndex].sourcePath, currentDirectory, host.getCanonicalFileName), position: maps[targetIndex].sourcePosition }; // Closest span
        }

        function getSourceFileLike(fileName: string): SourceFileLike | undefined {
            // Lookup file in program, if provided
            let file: SourceFileLike = program && program.getSourceFile(fileName);
            if (!file) {
                // Otherwise check the cache
                const path = toPath(fileName, currentDirectory, host.getCanonicalFileName);
                file = fallbackCache.get(path);
                if (!file) {
                    // And failing that, check the disk
                    if (host.fileExists(path)) {
                        const text = host.readFile(path);
                        fallbackCache.set(path, file = {
                            text,
                            lineMap: undefined,
                            getLineAndCharacterOfPosition(pos) {
                                return computeLineAndCharacterOfPosition(getLineStarts(this), pos);
                            }
                        });
                    }
                }
            }
            return file;
        }

        function getPositionOfLineAndCharacterUsingName(fileName: string, line: number, character: number) {
            const file = getSourceFileLike(fileName);
            if (!file) {
                return -1;
            }
            return getPositionOfLineAndCharacter(file, line, character);
        }

        function getDecodedMappings() {
            return decodedMappings || (decodedMappings = calculateDecodedMappings());
        }

        function getReverseSortedMappings() {
            return reverseSortedMappings || (reverseSortedMappings = getDecodedMappings().slice().sort(compareProcessedSpanSourcePositions));
        }

        function getForwardSortedMappings() {
            return forwardSortedMappings || (forwardSortedMappings = getDecodedMappings().slice().sort(compareProcessedSpanEmittedPositions));
        }

        function calculateDecodedMappings(): ProcessedSourceMapSpan[] {
            const state: DecoderState<ProcessedSourceMapSpan> = {
                encodedText: map.mappings,
                currentNameIndex: undefined,
                sourceMapNamesLength: map.names ? map.names.length : undefined,
                currentEmittedColumn: 1,
                currentEmittedLine: 1,
                currentSourceColumn: 1,
                currentSourceLine: 1,
                currentSourceIndex: 0,
                spans: [],
                decodingIndex: 0,
                processSpan,
            };
            while (!hasCompletedDecoding(state)) {
                decodeSingleSpan(state);
                if (state.error) {
                    host.log(`Encountered error while decoding sourcemap found at ${mapPath}: ${state.error}`);
                    return [];
                }
            }
            return state.spans;
        }

        function compareProcessedSpanSourcePositions(a: ProcessedSourceMapSpan, b: ProcessedSourceMapSpan) {
            return comparePaths(a.sourcePath, b.sourcePath, currentDirectory) ||
                compareValues(a.sourcePosition, b.sourcePosition);
        }

        function compareProcessedSpanEmittedPositions(a: ProcessedSourceMapSpan, b: ProcessedSourceMapSpan) {
            return compareValues(a.emittedPosition, b.emittedPosition);
        }

        function processSpan(span: RawSourceMapSpan): ProcessedSourceMapSpan {
            const sourcePath = map.sources[span.sourceIndex];
            return {
                emittedPosition: getPositionOfLineAndCharacterUsingName(map.file, span.emittedLine - 1, span.emittedColumn - 1),
                sourcePosition: getPositionOfLineAndCharacterUsingName(sourcePath, span.sourceLine - 1, span.sourceColumn - 1),
                sourcePath,
                name: span.nameIndex ? map.names[span.nameIndex] : undefined
            };
        }
    }

    function getSourcePosition(span: ProcessedSourceMapSpan) {
        return span.sourcePosition;
    }

    interface ProcessedSourceMapSpan {
        emittedPosition: number;
        sourcePosition: number;
        sourcePath: string;
        name?: string;
    }

    interface RawSourceMapSpan {
        emittedLine: number;
        emittedColumn: number;
        sourceLine: number;
        sourceColumn: number;
        sourceIndex: number;
        nameIndex?: number;
    }

    interface DecoderState<T> {
        decodingIndex: number;
        currentEmittedLine: number;
        currentEmittedColumn: number;
        currentSourceLine: number;
        currentSourceColumn: number;
        currentSourceIndex: number;
        currentNameIndex: number;
        encodedText: string;
        sourceMapNamesLength?: number;
        error?: string;
        spans: T[];
        processSpan: (span: RawSourceMapSpan) => T;
    }

    function hasCompletedDecoding(state: DecoderState<any>) {
        return state.decodingIndex === state.encodedText.length;
    }

    function decodeSingleSpan<T>(state: DecoderState<T>): void {
        while (state.decodingIndex < state.encodedText.length) {
            const char = state.encodedText.charAt(state.decodingIndex);
            if (char === ";") {
                // New line
                state.currentEmittedLine++;
                state.currentEmittedColumn = 1;
                state.decodingIndex++;
                continue;
            }

            if (char === ",") {
                // Next entry is on same line - no action needed
                state.decodingIndex++;
                continue;
            }

            // Read the current span
            // 1. Column offset from prev read jsColumn
            state.currentEmittedColumn += base64VLQFormatDecode();
            // Incorrect emittedColumn dont support this map
            if (createErrorIfCondition(state.currentEmittedColumn < 1, "Invalid emittedColumn found")) {
                return;
            }
            // Dont support reading mappings that dont have information about original source and its line numbers
            if (createErrorIfCondition(isSourceMappingSegmentEnd(state.encodedText, state.decodingIndex), "Unsupported Error Format: No entries after emitted column")) {
                return;
            }

            // 2. Relative sourceIndex
            state.currentSourceIndex += base64VLQFormatDecode();
            // Incorrect sourceIndex dont support this map
            if (createErrorIfCondition(state.currentSourceIndex < 0, "Invalid sourceIndex found")) {
                return;
            }
            // Dont support reading mappings that dont have information about original source span
            if (createErrorIfCondition(isSourceMappingSegmentEnd(state.encodedText, state.decodingIndex), "Unsupported Error Format: No entries after sourceIndex")) {
                return;
            }

            // 3. Relative sourceLine 0 based
            state.currentSourceLine += base64VLQFormatDecode();
            // Incorrect sourceLine dont support this map
            if (createErrorIfCondition(state.currentSourceLine < 1, "Invalid sourceLine found")) {
                return;
            }
            // Dont support reading mappings that dont have information about original source and its line numbers
            if (createErrorIfCondition(isSourceMappingSegmentEnd(state.encodedText, state.decodingIndex), "Unsupported Error Format: No entries after emitted Line")) {
                return;
            }

            // 4. Relative sourceColumn 0 based
            state.currentSourceColumn += base64VLQFormatDecode();
            // Incorrect sourceColumn dont support this map
            if (createErrorIfCondition(state.currentSourceColumn < 1, "Invalid sourceLine found")) {
                return;
            }
            // 5. Check if there is name:
            if (!isSourceMappingSegmentEnd(state.encodedText, state.decodingIndex)) {
                if (state.currentNameIndex === undefined) {
                    state.currentNameIndex = 0;
                }
                state.currentNameIndex += base64VLQFormatDecode();
                // Incorrect nameIndex dont support this map
                if (createErrorIfCondition(state.currentNameIndex < 0 || state.currentNameIndex >= state.sourceMapNamesLength, "Invalid name index for the source map entry")) {
                    return;
                }
            }
            // Dont support reading mappings that dont have information about original source and its line numbers
            if (createErrorIfCondition(!isSourceMappingSegmentEnd(state.encodedText, state.decodingIndex), "Unsupported Error Format: There are more entries after " + (state.currentNameIndex === undefined ? "sourceColumn" : "nameIndex"))) {
                return;
            }

            // Entry should be complete
            captureSpan();
            return;
        }

        createErrorIfCondition(/*condition*/ true, "No encoded entry found");
        return;

        function captureSpan() {
            state.spans.push(state.processSpan({
                emittedColumn: state.currentEmittedColumn,
                emittedLine: state.currentEmittedLine,
                sourceColumn: state.currentSourceColumn,
                sourceIndex: state.currentSourceIndex,
                sourceLine: state.currentSourceLine,
                nameIndex: state.currentNameIndex
            }));
        }

        function createErrorIfCondition(condition: boolean, errormsg: string) {
            if (state.error) {
                // An error was already reported
                return true;
            }

            if (condition) {
                state.error = errormsg;
            }

            return condition;
        }

        function base64VLQFormatDecode() {
            let moreDigits = true;
            let shiftCount = 0;
            let value = 0;

            for (; moreDigits; state.decodingIndex++) {
                if (createErrorIfCondition(state.decodingIndex >= state.encodedText.length, "Error in decoding base64VLQFormatDecode, past the mapping string")) {
                    return;
                }

                // 6 digit number
                const currentByte = base64FormatDecode(state.encodedText.charAt(state.decodingIndex));

                // If msb is set, we still have more bits to continue
                moreDigits = (currentByte & 32) !== 0;

                // least significant 5 bits are the next msbs in the final value.
                value = value | ((currentByte & 31) << shiftCount);
                shiftCount += 5;
            }

            // Least significant bit if 1 represents negative and rest of the msb is actual absolute value
            if ((value & 1) === 0) {
                // + number
                value = value >> 1;
            }
            else {
                // - number
                value = value >> 1;
                value = -value;
            }

            return value;
        }
    }

    function base64FormatDecode(char: string) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(char);
    }

    function isSourceMappingSegmentEnd(encodedText: string, pos: number) {
        return (pos === encodedText.length ||
            encodedText.charAt(pos) === "," ||
            encodedText.charAt(pos) === ";");
    }
}