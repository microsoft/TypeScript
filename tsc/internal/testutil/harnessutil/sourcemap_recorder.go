package harnessutil

import (
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"strings"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

type writerAggregator struct {
	strings.Builder
}

func (w *writerAggregator) WriteStringF(format string, args ...any) {
	w.WriteString(fmt.Sprintf(format, args...))
}

func (w *writerAggregator) WriteLine(s string) {
	w.WriteString(s + "\r\n")
}

func (w *writerAggregator) WriteLineF(format string, args ...any) {
	w.WriteStringF(format+"\r\n", args...)
}

type sourceMapSpanWithDecodeErrors struct {
	sourceMapSpan *sourcemap.Mapping
	decodeErrors  []string
}

type decodedMapping struct {
	sourceMapSpan *sourcemap.Mapping
	error         error
}

type sourceMapDecoder struct {
	sourceMapMappings string
	mappings          *sourcemap.MappingsDecoder
}

func newSourceMapDecoder(sourceMap *sourcemap.RawSourceMap) *sourceMapDecoder {
	return &sourceMapDecoder{
		sourceMapMappings: sourceMap.Mappings,
		mappings:          sourcemap.DecodeMappings(sourceMap.Mappings),
	}
}

func (d *sourceMapDecoder) decodeNextEncodedSourceMapSpan() *decodedMapping {
	value, done := d.mappings.Next()
	if done {
		mapping := &decodedMapping{
			error:         d.mappings.Error(),
			sourceMapSpan: d.mappings.State(),
		}
		if mapping.error == nil {
			mapping.error = errors.New("No encoded entry found")
		}
		return mapping
	}
	return &decodedMapping{sourceMapSpan: value}
}

func (d *sourceMapDecoder) hasCompletedDecoding() bool {
	return d.mappings.Pos() == len(d.sourceMapMappings)
}

func (d *sourceMapDecoder) getRemainingDecodeString() string {
	return d.sourceMapMappings[d.mappings.Pos():]
}

type sourceMapSpanWriter struct {
	sourceMapRecorder    *writerAggregator
	sourceMapSources     []string
	sourceMapNames       []string
	jsFile               *TestFile
	jsLineMap            []core.TextPos
	tsCode               string
	tsLineMap            []core.TextPos
	spansOnSingleLine    []sourceMapSpanWithDecodeErrors
	prevWrittenSourcePos int
	nextJsLineToWrite    int
	spanMarkerContinues  bool
	sourceMapDecoder     *sourceMapDecoder
}

func newSourceMapSpanWriter(sourceMapRecorder *writerAggregator, sourceMap *sourcemap.RawSourceMap, jsFile *TestFile) *sourceMapSpanWriter {
	writer := &sourceMapSpanWriter{
		sourceMapRecorder:    sourceMapRecorder,
		sourceMapSources:     sourceMap.Sources,
		sourceMapNames:       sourceMap.Names,
		jsFile:               jsFile,
		jsLineMap:            core.ComputeLineStarts(jsFile.Content),
		spansOnSingleLine:    make([]sourceMapSpanWithDecodeErrors, 0),
		prevWrittenSourcePos: 0,
		nextJsLineToWrite:    0,
		spanMarkerContinues:  false,
		sourceMapDecoder:     newSourceMapDecoder(sourceMap),
	}

	sourceMapRecorder.WriteLine("===================================================================")
	sourceMapRecorder.WriteLineF("JsFile: %s", sourceMap.File)
	sourceMapRecorder.WriteLineF("mapUrl: %s", sourcemap.TryGetSourceMappingURL(sourcemap.GetLineInfo(jsFile.Content, writer.jsLineMap)))
	sourceMapRecorder.WriteLineF("sourceRoot: %s", sourceMap.SourceRoot)
	sourceMapRecorder.WriteLineF("sources: %s", strings.Join(sourceMap.Sources, ","))
	if len(sourceMap.SourcesContent) > 0 {
		content, err := json.Marshal(sourceMap.SourcesContent)
		if err != nil {
			panic(err)
		}
		sourceMapRecorder.WriteLineF("sourcesContent: %s", content)
	}
	sourceMapRecorder.WriteLine("===================================================================")
	return writer
}

func (w *sourceMapSpanWriter) getSourceMapSpanString(mapEntry *sourcemap.Mapping, getAbsentNameIndex bool) string {
	var mapString writerAggregator
	mapString.WriteStringF("Emitted(%d, %d)", mapEntry.GeneratedLine+1, mapEntry.GeneratedCharacter+1)
	if mapEntry.IsSourceMapping() {
		mapString.WriteStringF(" Source(%d, %d) + SourceIndex(%d)", mapEntry.SourceLine+1, mapEntry.SourceCharacter+1, mapEntry.SourceIndex)
		if mapEntry.NameIndex >= 0 && int(mapEntry.NameIndex) < len(w.sourceMapNames) {
			mapString.WriteStringF(" name (%s)", w.sourceMapNames[mapEntry.NameIndex])
		} else {
			if mapEntry.NameIndex != sourcemap.MissingName || getAbsentNameIndex {
				mapString.WriteStringF(" nameIndex (%d)", mapEntry.NameIndex)
			}
		}
	}
	return mapString.String()
}

func (w *sourceMapSpanWriter) recordSourceMapSpan(sourceMapSpan *sourcemap.Mapping) {
	// verify the decoded span is same as the new span
	decodeResult := w.sourceMapDecoder.decodeNextEncodedSourceMapSpan()
	var decodeErrors []string
	if decodeResult.error != nil || !decodeResult.sourceMapSpan.Equals(sourceMapSpan) {
		if decodeResult.error != nil {
			decodeErrors = []string{"!!^^ !!^^ There was decoding error in the sourcemap at this location: " + decodeResult.error.Error()}
		} else {
			decodeErrors = []string{"!!^^ !!^^ The decoded span from sourcemap's mapping entry does not match what was encoded for this span:"}
		}
		decodeErrors = append(decodeErrors,
			"!!^^ !!^^ Decoded span from sourcemap's mappings entry: "+
				w.getSourceMapSpanString(decodeResult.sourceMapSpan, true /*getAbsentNameIndex*/)+
				" Span encoded by the emitter:"+
				w.getSourceMapSpanString(sourceMapSpan, true /*getAbsentNameIndex*/),
		)
	}

	if len(w.spansOnSingleLine) > 0 && w.spansOnSingleLine[0].sourceMapSpan.GeneratedLine != sourceMapSpan.GeneratedLine {
		// On different line from the one that we have been recording till now,
		w.writeRecordedSpans()
		w.spansOnSingleLine = nil
	}
	w.spansOnSingleLine = append(w.spansOnSingleLine, sourceMapSpanWithDecodeErrors{
		sourceMapSpan: sourceMapSpan,
		decodeErrors:  decodeErrors,
	})
}

func (w *sourceMapSpanWriter) recordNewSourceFileSpan(sourceMapSpan *sourcemap.Mapping, newSourceFileCode string) {
	continuesLine := false
	if len(w.spansOnSingleLine) > 0 && w.spansOnSingleLine[0].sourceMapSpan.GeneratedCharacter == sourceMapSpan.GeneratedLine { // !!! char == line seems like a bug in Strada?
		w.writeRecordedSpans()
		w.spansOnSingleLine = nil
		w.nextJsLineToWrite-- // walk back one line to reprint the line
		continuesLine = true
	}

	w.recordSourceMapSpan(sourceMapSpan)

	if len(w.spansOnSingleLine) != 1 {
		panic("expected a single span")
	}

	w.sourceMapRecorder.WriteLine("-------------------------------------------------------------------")
	if continuesLine {
		w.sourceMapRecorder.WriteLineF("emittedFile:%s (%d, %d)", w.jsFile.UnitName, sourceMapSpan.GeneratedLine+1, sourceMapSpan.GeneratedCharacter+1)
	} else {
		w.sourceMapRecorder.WriteLineF("emittedFile:%s", w.jsFile.UnitName)
	}
	w.sourceMapRecorder.WriteLineF("sourceFile:%s", w.sourceMapSources[w.spansOnSingleLine[0].sourceMapSpan.SourceIndex])
	w.sourceMapRecorder.WriteLine("-------------------------------------------------------------------")

	w.tsLineMap = core.ComputeLineStarts(newSourceFileCode)
	w.tsCode = newSourceFileCode
	w.prevWrittenSourcePos = 0
}

func (w *sourceMapSpanWriter) close() {
	// Write the lines pending on the single line
	w.writeRecordedSpans()

	if !w.sourceMapDecoder.hasCompletedDecoding() {
		w.sourceMapRecorder.WriteLine("!!!! **** There are more source map entries in the sourceMap's mapping than what was encoded")
		w.sourceMapRecorder.WriteLineF("!!!! **** Remaining decoded string: %s", w.sourceMapDecoder.getRemainingDecodeString())
	}

	// write remaining js lines
	w.writeJsFileLines(len(w.jsLineMap))
}

func (w *sourceMapSpanWriter) getTextOfLine(line int, lineMap []core.TextPos, code string) string {
	startPos := lineMap[line]
	var endPos core.TextPos
	if line+1 < len(lineMap) {
		endPos = lineMap[line+1]
	} else {
		endPos = core.TextPos(len(code))
	}
	text := code[startPos:endPos]
	if line == 0 {
		return stringutil.RemoveByteOrderMark(text)
	}
	// return line == 0 ? Utils.removeByteOrderMark(text) : text;
	return text
}

func (w *sourceMapSpanWriter) writeJsFileLines(endJsLine int) {
	for ; w.nextJsLineToWrite < endJsLine; w.nextJsLineToWrite++ {
		w.sourceMapRecorder.WriteStringF(">>>%s", w.getTextOfLine(w.nextJsLineToWrite, w.jsLineMap, w.jsFile.Content))
	}
}

func (w *sourceMapSpanWriter) writeRecordedSpans() {
	recordedSpanWriter := recordedSpanWriter{w: w}
	recordedSpanWriter.writeRecordedSpans()
}

type recordedSpanWriter struct {
	markerIds      []string
	prevEmittedCol int
	w              *sourceMapSpanWriter
}

func (sw *recordedSpanWriter) getMarkerId(markerIndex int) string {
	markerId := ""
	if sw.w.spanMarkerContinues {
		if markerIndex != 0 {
			panic("expected markerIndex to be 0")
		}
		markerId = "1->"
	} else {
		markerId = strconv.Itoa(markerIndex + 1)
		if len(markerId) < 2 {
			markerId += " "
		}
		markerId += ">"
	}
	return markerId
}

func (sw *recordedSpanWriter) iterateSpans(fn func(currentSpan *sourceMapSpanWithDecodeErrors, index int)) {
	sw.prevEmittedCol = 0
	for i := range len(sw.w.spansOnSingleLine) {
		fn(&sw.w.spansOnSingleLine[i], i)
		sw.prevEmittedCol = sw.w.spansOnSingleLine[i].sourceMapSpan.GeneratedCharacter
	}
}

func (sw *recordedSpanWriter) writeSourceMapIndent(indentLength int, indentPrefix string) {
	sw.w.sourceMapRecorder.WriteString(indentPrefix)
	for range indentLength {
		sw.w.sourceMapRecorder.WriteString(" ")
	}
}

func (sw *recordedSpanWriter) writeSourceMapMarker(currentSpan *sourceMapSpanWithDecodeErrors, index int) {
	sw.writeSourceMapMarkerEx(currentSpan, index, currentSpan.sourceMapSpan.GeneratedCharacter, false /*endContinues*/)
}

func (sw *recordedSpanWriter) writeSourceMapMarkerEx(currentSpan *sourceMapSpanWithDecodeErrors, index int, endColumn int, endContinues bool) {
	markerId := sw.getMarkerId(index)
	sw.markerIds = append(sw.markerIds, markerId)
	sw.writeSourceMapIndent(sw.prevEmittedCol, markerId)
	for i := sw.prevEmittedCol; i < endColumn; i++ {
		sw.w.sourceMapRecorder.WriteString("^")
	}
	if endContinues {
		sw.w.sourceMapRecorder.WriteString("->")
	}
	sw.w.sourceMapRecorder.WriteLine("")
	sw.w.spanMarkerContinues = endContinues
}

func (sw *recordedSpanWriter) writeSourceMapSourceText(currentSpan *sourceMapSpanWithDecodeErrors, index int) {
	sourcePos := int(sw.w.tsLineMap[currentSpan.sourceMapSpan.SourceLine]) + currentSpan.sourceMapSpan.SourceCharacter
	var sourceText string
	if sw.w.prevWrittenSourcePos < sourcePos {
		// Position that goes forward, get text
		sourceText = sw.w.tsCode[sw.w.prevWrittenSourcePos:sourcePos]
	}

	// If there are decode errors, write
	for _, decodeError := range currentSpan.decodeErrors {
		sw.writeSourceMapIndent(sw.prevEmittedCol, sw.markerIds[index])
		sw.w.sourceMapRecorder.WriteLine(decodeError)
	}

	tsCodeLineMap := core.ComputeLineStarts(sourceText)
	for i := range tsCodeLineMap {
		if i == 0 {
			sw.writeSourceMapIndent(sw.prevEmittedCol, sw.markerIds[index])
		} else {
			sw.writeSourceMapIndent(sw.prevEmittedCol, "  >")
		}
		sw.w.sourceMapRecorder.WriteString(sw.w.getTextOfLine(i, tsCodeLineMap, sourceText))
		if i == len(tsCodeLineMap)-1 {
			sw.w.sourceMapRecorder.WriteLine("")
		}
	}

	sw.w.prevWrittenSourcePos = sourcePos
}

func (sw *recordedSpanWriter) writeSpanDetails(currentSpan *sourceMapSpanWithDecodeErrors, index int) {
	sw.w.sourceMapRecorder.WriteLineF("%s%s", sw.markerIds[index], sw.w.getSourceMapSpanString(currentSpan.sourceMapSpan, false /*getAbsentNameIndex*/))
}

func (sw *recordedSpanWriter) writeRecordedSpans() {
	w := sw.w
	writeSourceMapMarker := sw.writeSourceMapMarker
	writeSourceMapSourceText := sw.writeSourceMapSourceText
	writeSpanDetails := sw.writeSpanDetails

	if len(w.spansOnSingleLine) > 0 {
		currentJsLine := w.spansOnSingleLine[0].sourceMapSpan.GeneratedLine

		// Write js line
		w.writeJsFileLines(currentJsLine + 1)

		// Emit markers
		sw.iterateSpans(writeSourceMapMarker)

		jsFileText := w.getTextOfLine(currentJsLine+1, w.jsLineMap, w.jsFile.Content) // TODO: Strada is wrong here, we should be looking at `currentJsLine`, not `currentJsLine+1`
		if sw.prevEmittedCol < len(jsFileText)-1 {
			// There is remaining text on this line that will be part of next source span so write marker that continues
			sw.writeSourceMapMarkerEx(nil /*currentSpan*/, len(w.spansOnSingleLine), len(jsFileText)-1 /*endColumn*/, true /*endContinues*/)
		}

		// Emit Source text
		sw.iterateSpans(writeSourceMapSourceText)

		// Emit column number etc
		sw.iterateSpans(writeSpanDetails)

		w.sourceMapRecorder.WriteLine("---")
	}
}
