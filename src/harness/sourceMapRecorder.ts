namespace Harness.SourceMapRecorder {

    interface SourceMapSpanWithDecodeErrors {
        sourceMapSpan: ts.Mapping;
        decodeErrors: string[] | undefined;
    }

    namespace SourceMapDecoder {
        let sourceMapMappings: string;
        let decodingIndex: number;
        let mappings: ts.MappingsDecoder | undefined;

        export interface DecodedMapping {
            sourceMapSpan: ts.Mapping;
            error?: string;
        }

        export function initializeSourceMapDecoding(sourceMap: ts.RawSourceMap) {
            decodingIndex = 0;
            sourceMapMappings = sourceMap.mappings;
            mappings = ts.decodeMappings(sourceMap.mappings);
        }

        export function decodeNextEncodedSourceMapSpan(): DecodedMapping {
            if (!mappings) return ts.Debug.fail("not initialized");
            const result = mappings.next();
            if (result.done) return { error: mappings.error || "No encoded entry found", sourceMapSpan: mappings.state };
            return { sourceMapSpan: result.value };
        }

        export function hasCompletedDecoding() {
            if (!mappings) return ts.Debug.fail("not initialized");
            return mappings.pos === sourceMapMappings.length;
        }

        export function getRemainingDecodeString() {
            return sourceMapMappings.substr(decodingIndex);
        }
    }

    namespace SourceMapSpanWriter {
        let sourceMapRecorder: Compiler.WriterAggregator;
        let sourceMapSources: string[];
        let sourceMapNames: string[] | null | undefined;

        let jsFile: documents.TextDocument;
        let jsLineMap: readonly number[];
        let tsCode: string;
        let tsLineMap: number[];

        let spansOnSingleLine: SourceMapSpanWithDecodeErrors[];
        let prevWrittenSourcePos: number;
        let nextJsLineToWrite: number;
        let spanMarkerContinues: boolean;

        export function initializeSourceMapSpanWriter(sourceMapRecordWriter: Compiler.WriterAggregator, sourceMap: ts.RawSourceMap, currentJsFile: documents.TextDocument) {
            sourceMapRecorder = sourceMapRecordWriter;
            sourceMapSources = sourceMap.sources;
            sourceMapNames = sourceMap.names;

            jsFile = currentJsFile;
            jsLineMap = jsFile.lineStarts;

            spansOnSingleLine = [];
            prevWrittenSourcePos = 0;
            nextJsLineToWrite = 0;
            spanMarkerContinues = false;

            SourceMapDecoder.initializeSourceMapDecoding(sourceMap);
            sourceMapRecorder.WriteLine("===================================================================");
            sourceMapRecorder.WriteLine("JsFile: " + sourceMap.file);
            sourceMapRecorder.WriteLine("mapUrl: " + ts.tryGetSourceMappingURL(ts.getLineInfo(jsFile.text, jsLineMap)));
            sourceMapRecorder.WriteLine("sourceRoot: " + sourceMap.sourceRoot);
            sourceMapRecorder.WriteLine("sources: " + sourceMap.sources);
            if (sourceMap.sourcesContent) {
                sourceMapRecorder.WriteLine("sourcesContent: " + JSON.stringify(sourceMap.sourcesContent));
            }
            sourceMapRecorder.WriteLine("===================================================================");
        }

        function getSourceMapSpanString(mapEntry: ts.Mapping, getAbsentNameIndex?: boolean) {
            let mapString = "Emitted(" + (mapEntry.generatedLine + 1) + ", " + (mapEntry.generatedCharacter + 1) + ")";
            if (ts.isSourceMapping(mapEntry)) {
                mapString += " Source(" + (mapEntry.sourceLine + 1) + ", " + (mapEntry.sourceCharacter + 1) + ") + SourceIndex(" + mapEntry.sourceIndex + ")";
                if (mapEntry.nameIndex! >= 0 && mapEntry.nameIndex! < sourceMapNames!.length) {
                    mapString += " name (" + sourceMapNames![mapEntry.nameIndex!] + ")";
                }
                else {
                    if ((mapEntry.nameIndex && mapEntry.nameIndex !== -1) || getAbsentNameIndex) {
                        mapString += " nameIndex (" + mapEntry.nameIndex + ")";
                    }
                }
            }

            return mapString;
        }

        export function recordSourceMapSpan(sourceMapSpan: ts.Mapping) {
            // verify the decoded span is same as the new span
            const decodeResult = SourceMapDecoder.decodeNextEncodedSourceMapSpan();
            let decodeErrors: string[] | undefined;
            if (typeof decodeResult.error === "string" || !ts.sameMapping(decodeResult.sourceMapSpan, sourceMapSpan)) {
                if (decodeResult.error) {
                    decodeErrors = ["!!^^ !!^^ There was decoding error in the sourcemap at this location: " + decodeResult.error];
                }
                else {
                    decodeErrors = ["!!^^ !!^^ The decoded span from sourcemap's mapping entry does not match what was encoded for this span:"];
                }
                decodeErrors.push("!!^^ !!^^ Decoded span from sourcemap's mappings entry: " + getSourceMapSpanString(decodeResult.sourceMapSpan, /*getAbsentNameIndex*/ true) + " Span encoded by the emitter:" + getSourceMapSpanString(sourceMapSpan, /*getAbsentNameIndex*/ true));
            }

            if (spansOnSingleLine.length && spansOnSingleLine[0].sourceMapSpan.generatedLine !== sourceMapSpan.generatedLine) {
                // On different line from the one that we have been recording till now,
                writeRecordedSpans();
                spansOnSingleLine = [];
            }
            spansOnSingleLine.push({ sourceMapSpan, decodeErrors });
        }

        export function recordNewSourceFileSpan(sourceMapSpan: ts.Mapping, newSourceFileCode: string) {
            let continuesLine = false;
            if (spansOnSingleLine.length > 0 && spansOnSingleLine[0].sourceMapSpan.generatedCharacter === sourceMapSpan.generatedLine) {
                writeRecordedSpans();
                spansOnSingleLine = [];
                nextJsLineToWrite--; // walk back one line to reprint the line
                continuesLine = true;
            }

            recordSourceMapSpan(sourceMapSpan);

            assert.isTrue(spansOnSingleLine.length === 1);
            sourceMapRecorder.WriteLine("-------------------------------------------------------------------");
            sourceMapRecorder.WriteLine("emittedFile:" + jsFile.file + (continuesLine ? ` (${sourceMapSpan.generatedLine + 1}, ${sourceMapSpan.generatedCharacter + 1})` : ""));
            sourceMapRecorder.WriteLine("sourceFile:" + sourceMapSources[spansOnSingleLine[0].sourceMapSpan.sourceIndex!]);
            sourceMapRecorder.WriteLine("-------------------------------------------------------------------");

            tsLineMap = ts.computeLineStarts(newSourceFileCode);
            tsCode = newSourceFileCode;
            prevWrittenSourcePos = 0;
        }

        export function close() {
            // Write the lines pending on the single line
            writeRecordedSpans();

            if (!SourceMapDecoder.hasCompletedDecoding()) {
                sourceMapRecorder.WriteLine("!!!! **** There are more source map entries in the sourceMap's mapping than what was encoded");
                sourceMapRecorder.WriteLine("!!!! **** Remaining decoded string: " + SourceMapDecoder.getRemainingDecodeString());

            }

            // write remaining js lines
            writeJsFileLines(jsLineMap.length);
        }

        function getTextOfLine(line: number, lineMap: readonly number[], code: string) {
            const startPos = lineMap[line];
            const endPos = lineMap[line + 1];
            const text = code.substring(startPos, endPos);
            return line === 0 ? Utils.removeByteOrderMark(text) : text;
        }

        function writeJsFileLines(endJsLine: number) {
            for (; nextJsLineToWrite < endJsLine; nextJsLineToWrite++) {
                sourceMapRecorder.Write(">>>" + getTextOfLine(nextJsLineToWrite, jsLineMap, jsFile.text));
            }
        }

        function writeRecordedSpans() {
            const markerIds: string[] = [];

            function getMarkerId(markerIndex: number) {
                let markerId = "";
                if (spanMarkerContinues) {
                    assert.isTrue(markerIndex === 0);
                    markerId = "1->";
                }
                else {
                    markerId = "" + (markerIndex + 1);
                    if (markerId.length < 2) {
                        markerId = markerId + " ";
                    }
                    markerId += ">";
                }
                return markerId;
            }

            let prevEmittedCol!: number;
            function iterateSpans(fn: (currentSpan: SourceMapSpanWithDecodeErrors, index: number) => void) {
                prevEmittedCol = 0;
                for (let i = 0; i < spansOnSingleLine.length; i++) {
                    fn(spansOnSingleLine[i], i);
                    prevEmittedCol = spansOnSingleLine[i].sourceMapSpan.generatedCharacter;
                }
            }

            function writeSourceMapIndent(indentLength: number, indentPrefix: string) {
                sourceMapRecorder.Write(indentPrefix);
                for (let i = 0; i < indentLength; i++) {
                    sourceMapRecorder.Write(" ");
                }
            }

            function writeSourceMapMarker(currentSpan: SourceMapSpanWithDecodeErrors, index: number, endColumn = currentSpan.sourceMapSpan.generatedCharacter, endContinues = false) {
                const markerId = getMarkerId(index);
                markerIds.push(markerId);

                writeSourceMapIndent(prevEmittedCol, markerId);

                for (let i = prevEmittedCol; i < endColumn; i++) {
                    sourceMapRecorder.Write("^");
                }
                if (endContinues) {
                    sourceMapRecorder.Write("->");
                }
                sourceMapRecorder.WriteLine("");
                spanMarkerContinues = endContinues;
            }

            function writeSourceMapSourceText(currentSpan: SourceMapSpanWithDecodeErrors, index: number) {
                const sourcePos = tsLineMap[currentSpan.sourceMapSpan.sourceLine!] + (currentSpan.sourceMapSpan.sourceCharacter!);
                let sourceText = "";
                if (prevWrittenSourcePos < sourcePos) {
                    // Position that goes forward, get text
                    sourceText = tsCode.substring(prevWrittenSourcePos, sourcePos);
                }

                if (currentSpan.decodeErrors) {
                    // If there are decode errors, write
                    for (const decodeError of currentSpan.decodeErrors) {
                        writeSourceMapIndent(prevEmittedCol, markerIds[index]);
                        sourceMapRecorder.WriteLine(decodeError);
                    }
                }

                const tsCodeLineMap = ts.computeLineStarts(sourceText);
                for (let i = 0; i < tsCodeLineMap.length; i++) {
                    writeSourceMapIndent(prevEmittedCol, i === 0 ? markerIds[index] : "  >");
                    sourceMapRecorder.Write(getTextOfLine(i, tsCodeLineMap, sourceText));
                    if (i === tsCodeLineMap.length - 1) {
                        sourceMapRecorder.WriteLine("");
                    }
                }

                prevWrittenSourcePos = sourcePos;
            }

            function writeSpanDetails(currentSpan: SourceMapSpanWithDecodeErrors, index: number) {
                sourceMapRecorder.WriteLine(markerIds[index] + getSourceMapSpanString(currentSpan.sourceMapSpan));
            }

            if (spansOnSingleLine.length) {
                const currentJsLine = spansOnSingleLine[0].sourceMapSpan.generatedLine;

                // Write js line
                writeJsFileLines(currentJsLine + 1);

                // Emit markers
                iterateSpans(writeSourceMapMarker);

                const jsFileText = getTextOfLine(currentJsLine + 1, jsLineMap, jsFile.text);
                if (prevEmittedCol < jsFileText.length - 1) {
                    // There is remaining text on this line that will be part of next source span so write marker that continues
                    writeSourceMapMarker(/*currentSpan*/ undefined!, spansOnSingleLine.length, /*endColumn*/ jsFileText.length - 1, /*endContinues*/ true); // TODO: GH#18217
                }

                // Emit Source text
                iterateSpans(writeSourceMapSourceText);

                // Emit column number etc
                iterateSpans(writeSpanDetails);

                sourceMapRecorder.WriteLine("---");
            }
        }
    }

    export function getSourceMapRecord(sourceMapDataList: readonly ts.SourceMapEmitResult[], program: ts.Program, jsFiles: readonly documents.TextDocument[], declarationFiles: readonly documents.TextDocument[]) {
        const sourceMapRecorder = new Compiler.WriterAggregator();

        for (let i = 0; i < sourceMapDataList.length; i++) {
            const sourceMapData = sourceMapDataList[i];
            let prevSourceFile: ts.SourceFile | undefined;
            let currentFile: documents.TextDocument;
            if (ts.endsWith(sourceMapData.sourceMap.file, ts.Extension.Dts)) {
                if (sourceMapDataList.length > jsFiles.length) {
                    currentFile = declarationFiles[Math.floor(i / 2)]; // When both kinds of source map are present, they alternate js/dts
                }
                else {
                    currentFile = declarationFiles[i];
                }
            }
            else {
                if (sourceMapDataList.length > jsFiles.length) {
                    currentFile = jsFiles[Math.floor(i / 2)];
                }
                else {
                    currentFile = jsFiles[i];
                }
            }

            SourceMapSpanWriter.initializeSourceMapSpanWriter(sourceMapRecorder, sourceMapData.sourceMap, currentFile);
            const mapper = ts.decodeMappings(sourceMapData.sourceMap.mappings);
            for (let iterResult = mapper.next(); !iterResult.done; iterResult = mapper.next()) {
                const decodedSourceMapping = iterResult.value;
                const currentSourceFile = ts.isSourceMapping(decodedSourceMapping)
                    ? program.getSourceFile(sourceMapData.inputSourceFileNames[decodedSourceMapping.sourceIndex])
                    : undefined;
                if (currentSourceFile !== prevSourceFile) {
                    if (currentSourceFile) {
                        SourceMapSpanWriter.recordNewSourceFileSpan(decodedSourceMapping, currentSourceFile.text);
                    }
                    prevSourceFile = currentSourceFile;
                }
                else {
                    SourceMapSpanWriter.recordSourceMapSpan(decodedSourceMapping);
                }
            }
            SourceMapSpanWriter.close(); // If the last spans werent emitted, emit them
        }
        sourceMapRecorder.Close();
        return sourceMapRecorder.lines.join("\r\n");
    }

    export function getSourceMapRecordWithSystem(sys: ts.System, sourceMapFile: string) {
        const sourceMapRecorder = new Compiler.WriterAggregator();
        let prevSourceFile: documents.TextDocument | undefined;
        const files = new ts.Map<string, documents.TextDocument>();
        const sourceMap = ts.tryParseRawSourceMap(sys.readFile(sourceMapFile, "utf8")!);
        if (sourceMap) {
            const mapDirectory = ts.getDirectoryPath(sourceMapFile);
            const sourceRoot = sourceMap.sourceRoot ? ts.getNormalizedAbsolutePath(sourceMap.sourceRoot, mapDirectory) : mapDirectory;
            const generatedAbsoluteFilePath = ts.getNormalizedAbsolutePath(sourceMap.file, mapDirectory);
            const sourceFileAbsolutePaths = sourceMap.sources.map(source => ts.getNormalizedAbsolutePath(source, sourceRoot));
            const currentFile = getFile(generatedAbsoluteFilePath);

            SourceMapSpanWriter.initializeSourceMapSpanWriter(sourceMapRecorder, sourceMap, currentFile);
            const mapper = ts.decodeMappings(sourceMap.mappings);
            for (let iterResult = mapper.next(); !iterResult.done; iterResult = mapper.next()) {
                const decodedSourceMapping = iterResult.value;
                const currentSourceFile = ts.isSourceMapping(decodedSourceMapping)
                    ? getFile(sourceFileAbsolutePaths[decodedSourceMapping.sourceIndex])
                    : undefined;
                if (currentSourceFile !== prevSourceFile) {
                    if (currentSourceFile) {
                        SourceMapSpanWriter.recordNewSourceFileSpan(decodedSourceMapping, currentSourceFile.text);
                    }
                    prevSourceFile = currentSourceFile;
                }
                else {
                    SourceMapSpanWriter.recordSourceMapSpan(decodedSourceMapping);
                }
            }
            SourceMapSpanWriter.close(); // If the last spans werent emitted, emit them
        }
        sourceMapRecorder.Close();
        return sourceMapRecorder.lines.join("\r\n");

        function getFile(path: string) {
            const existing = files.get(path);
            if (existing) return existing;
            const value = new documents.TextDocument(path, sys.readFile(path, "utf8")!);
            files.set(path, value);
            return value;
        }
    }
}
