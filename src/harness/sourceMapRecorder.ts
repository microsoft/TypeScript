namespace Harness.SourceMapRecorder {

    interface SourceMapSpanWithDecodeErrors {
        sourceMapSpan: ts.SourceMapSpan;
        decodeErrors: string[] | undefined;
    }

    namespace SourceMapDecoder {
        let sourceMapMappings: string;
        let decodingIndex: number;
        let mappings: ts.sourcemaps.MappingsDecoder | undefined;

        export interface DecodedMapping {
            sourceMapSpan: ts.SourceMapSpan;
            error?: string;
        }

        export function initializeSourceMapDecoding(sourceMapData: ts.SourceMapData) {
            decodingIndex = 0;
            sourceMapMappings = sourceMapData.sourceMapMappings;
            mappings = ts.sourcemaps.decodeMappings({
                version: 3,
                file: sourceMapData.sourceMapFile,
                sources: sourceMapData.sourceMapSources,
                sourceRoot: sourceMapData.sourceMapSourceRoot,
                sourcesContent: sourceMapData.sourceMapSourcesContent,
                mappings: sourceMapData.sourceMapMappings,
                names: sourceMapData.sourceMapNames
            });
        }

        export function decodeNextEncodedSourceMapSpan(): DecodedMapping {
            if (!mappings) return ts.Debug.fail("not initialized");
            const result = mappings.next();
            if (result.done) return { error: mappings.error || "No encoded entry found", sourceMapSpan: mappings.lastSpan };
            return { sourceMapSpan: result.value };
        }

        export function hasCompletedDecoding() {
            if (!mappings) return ts.Debug.fail("not initialized");
            return mappings.decodingIndex === sourceMapMappings.length;
        }

        export function getRemainingDecodeString() {
            return sourceMapMappings.substr(decodingIndex);
        }
    }

    namespace SourceMapSpanWriter {
        let sourceMapRecorder: Compiler.WriterAggregator;
        let sourceMapSources: string[];
        let sourceMapNames: string[] | undefined;

        let jsFile: documents.TextDocument;
        let jsLineMap: ReadonlyArray<number>;
        let tsCode: string;
        let tsLineMap: number[];

        let spansOnSingleLine: SourceMapSpanWithDecodeErrors[];
        let prevWrittenSourcePos: number;
        let nextJsLineToWrite: number;
        let spanMarkerContinues: boolean;

        export function initializeSourceMapSpanWriter(sourceMapRecordWriter: Compiler.WriterAggregator, sourceMapData: ts.SourceMapData, currentJsFile: documents.TextDocument) {
            sourceMapRecorder = sourceMapRecordWriter;
            sourceMapSources = sourceMapData.sourceMapSources;
            sourceMapNames = sourceMapData.sourceMapNames;

            jsFile = currentJsFile;
            jsLineMap = jsFile.lineStarts;

            spansOnSingleLine = [];
            prevWrittenSourcePos = 0;
            nextJsLineToWrite = 0;
            spanMarkerContinues = false;

            SourceMapDecoder.initializeSourceMapDecoding(sourceMapData);

            sourceMapRecorder.WriteLine("===================================================================");
            sourceMapRecorder.WriteLine("JsFile: " + sourceMapData.sourceMapFile);
            sourceMapRecorder.WriteLine("mapUrl: " + sourceMapData.jsSourceMappingURL);
            sourceMapRecorder.WriteLine("sourceRoot: " + sourceMapData.sourceMapSourceRoot);
            sourceMapRecorder.WriteLine("sources: " + sourceMapData.sourceMapSources);
            if (sourceMapData.sourceMapSourcesContent) {
                sourceMapRecorder.WriteLine("sourcesContent: " + JSON.stringify(sourceMapData.sourceMapSourcesContent));
            }
            sourceMapRecorder.WriteLine("===================================================================");
        }

        function getSourceMapSpanString(mapEntry: ts.SourceMapSpan, getAbsentNameIndex?: boolean) {
            let mapString = "Emitted(" + (mapEntry.emittedLine + 1) + ", " + (mapEntry.emittedColumn + 1) + ") Source(" + (mapEntry.sourceLine + 1) + ", " + (mapEntry.sourceColumn + 1) + ") + SourceIndex(" + mapEntry.sourceIndex + ")";
            if (mapEntry.nameIndex! >= 0 && mapEntry.nameIndex! < sourceMapNames!.length) {
                mapString += " name (" + sourceMapNames![mapEntry.nameIndex!] + ")";
            }
            else {
                if ((mapEntry.nameIndex && mapEntry.nameIndex !== -1) || getAbsentNameIndex) {
                    mapString += " nameIndex (" + mapEntry.nameIndex + ")";
                }
            }

            return mapString;
        }

        export function recordSourceMapSpan(sourceMapSpan: ts.SourceMapSpan) {
            // verify the decoded span is same as the new span
            const decodeResult = SourceMapDecoder.decodeNextEncodedSourceMapSpan();
            let decodeErrors: string[] | undefined;
            if (typeof decodeResult.error === "string"
                || decodeResult.sourceMapSpan.emittedLine   !== sourceMapSpan.emittedLine
                || decodeResult.sourceMapSpan.emittedColumn !== sourceMapSpan.emittedColumn
                || decodeResult.sourceMapSpan.sourceLine    !== sourceMapSpan.sourceLine
                || decodeResult.sourceMapSpan.sourceColumn  !== sourceMapSpan.sourceColumn
                || decodeResult.sourceMapSpan.sourceIndex   !== sourceMapSpan.sourceIndex
                || decodeResult.sourceMapSpan.nameIndex     !== sourceMapSpan.nameIndex) {
                if (decodeResult.error) {
                    decodeErrors = ["!!^^ !!^^ There was decoding error in the sourcemap at this location: " + decodeResult.error];
                }
                else {
                    decodeErrors = ["!!^^ !!^^ The decoded span from sourcemap's mapping entry does not match what was encoded for this span:"];
                }
                decodeErrors.push("!!^^ !!^^ Decoded span from sourcemap's mappings entry: " + getSourceMapSpanString(decodeResult.sourceMapSpan, /*getAbsentNameIndex*/ true) + " Span encoded by the emitter:" + getSourceMapSpanString(sourceMapSpan, /*getAbsentNameIndex*/ true));
            }

            if (spansOnSingleLine.length && spansOnSingleLine[0].sourceMapSpan.emittedLine !== sourceMapSpan.emittedLine) {
                // On different line from the one that we have been recording till now,
                writeRecordedSpans();
                spansOnSingleLine = [];
            }
            spansOnSingleLine.push({ sourceMapSpan, decodeErrors });
        }

        export function recordNewSourceFileSpan(sourceMapSpan: ts.SourceMapSpan, newSourceFileCode: string) {
            assert.isTrue(spansOnSingleLine.length === 0 || spansOnSingleLine[0].sourceMapSpan.emittedLine !== sourceMapSpan.emittedLine, "new file source map span should be on new line. We currently handle only that scenario");
            recordSourceMapSpan(sourceMapSpan);

            assert.isTrue(spansOnSingleLine.length === 1);
            sourceMapRecorder.WriteLine("-------------------------------------------------------------------");
            sourceMapRecorder.WriteLine("emittedFile:" + jsFile.file);
            sourceMapRecorder.WriteLine("sourceFile:" + sourceMapSources[spansOnSingleLine[0].sourceMapSpan.sourceIndex]);
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

        function getTextOfLine(line: number, lineMap: ReadonlyArray<number>, code: string) {
            const startPos = lineMap[line];
            const endPos = lineMap[line + 1];
            const text = code.substring(startPos, endPos);
            return line === 0 ? utils.removeByteOrderMark(text) : text;
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
                    prevEmittedCol = spansOnSingleLine[i].sourceMapSpan.emittedColumn;
                }
            }

            function writeSourceMapIndent(indentLength: number, indentPrefix: string) {
                sourceMapRecorder.Write(indentPrefix);
                for (let i = 0; i < indentLength; i++) {
                    sourceMapRecorder.Write(" ");
                }
            }

            function writeSourceMapMarker(currentSpan: SourceMapSpanWithDecodeErrors, index: number, endColumn = currentSpan.sourceMapSpan.emittedColumn, endContinues = false) {
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
                const sourcePos = tsLineMap[currentSpan.sourceMapSpan.sourceLine] + (currentSpan.sourceMapSpan.sourceColumn);
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
                const currentJsLine = spansOnSingleLine[0].sourceMapSpan.emittedLine;

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

    export function getSourceMapRecord(sourceMapDataList: ReadonlyArray<ts.SourceMapData>, program: ts.Program, jsFiles: ReadonlyArray<documents.TextDocument>, declarationFiles: ReadonlyArray<documents.TextDocument>) {
        const sourceMapRecorder = new Compiler.WriterAggregator();

        for (let i = 0; i < sourceMapDataList.length; i++) {
            const sourceMapData = sourceMapDataList[i];
            let prevSourceFile: ts.SourceFile | undefined;
            let currentFile: documents.TextDocument;
            if (ts.endsWith(sourceMapData.sourceMapFile, ts.Extension.Dts)) {
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

            SourceMapSpanWriter.initializeSourceMapSpanWriter(sourceMapRecorder, sourceMapData, currentFile);
            const mapper = ts.sourcemaps.decodeMappings({ mappings: sourceMapData.sourceMapMappings, sources: sourceMapData.sourceMapSources });
            for (let { value: decodedSourceMapping, done } = mapper.next(); !done; { value: decodedSourceMapping, done } = mapper.next()) {
                const currentSourceFile = program.getSourceFile(sourceMapData.inputSourceFileNames[decodedSourceMapping.sourceIndex])!;
                if (currentSourceFile !== prevSourceFile) {
                    SourceMapSpanWriter.recordNewSourceFileSpan(decodedSourceMapping, currentSourceFile.text);
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
}
