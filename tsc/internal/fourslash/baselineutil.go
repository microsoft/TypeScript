package fourslash

import (
	"cmp"
	"errors"
	"fmt"
	"io/fs"
	"regexp"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/baseline"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

const (
	autoImportsCmd              baselineCommand = "Auto Imports"
	callHierarchyCmd            baselineCommand = "Call Hierarchy"
	closingTagCmd               baselineCommand = "Closing Tag"
	documentHighlightsCmd       baselineCommand = "documentHighlights"
	findAllReferencesCmd        baselineCommand = "findAllReferences"
	vsFindAllReferencesCmd      baselineCommand = "vsFindAllReferences"
	goToDefinitionCmd           baselineCommand = "goToDefinition"
	goToImplementationCmd       baselineCommand = "goToImplementation"
	goToSourceDefinitionCmd     baselineCommand = "goToSourceDefinition"
	goToTypeDefinitionCmd       baselineCommand = "goToType"
	inlayHintsCmd               baselineCommand = "Inlay Hints"
	nonSuggestionDiagnosticsCmd baselineCommand = "Syntax and Semantic Diagnostics"
	quickInfoCmd                baselineCommand = "QuickInfo"
	vsQuickInfoCmd              baselineCommand = "VSQuickInfo"
	linkedEditingCmd            baselineCommand = "linkedEditing"
	renameCmd                   baselineCommand = "findRenameLocations"
	signatureHelpCmd            baselineCommand = "SignatureHelp"
	smartSelectionCmd           baselineCommand = "Smart Selection"
	codeLensesCmd               baselineCommand = "Code Lenses"
	documentSymbolsCmd          baselineCommand = "Document Symbols"
)

type baselineCommand string

func (f *FourslashTest) addResultToBaseline(t *testing.T, command baselineCommand, actual string) {
	var b *strings.Builder
	if f.testData.isStateBaseliningEnabled() {
		// Single baseline for all commands
		b = &f.stateBaseline.baseline
	} else if builder, ok := f.baselines[command]; ok {
		b = builder
	} else {
		f.baselines[command] = &strings.Builder{}
		b = f.baselines[command]
	}
	if b.Len() != 0 {
		b.WriteString("\n\n\n\n")
	}
	b.WriteString("// === ")
	b.WriteString(string(command))
	b.WriteString(" ===\n")
	b.WriteString(actual)
}

func (f *FourslashTest) writeToBaseline(command baselineCommand, content string) {
	b, ok := f.baselines[command]
	if !ok {
		f.baselines[command] = &strings.Builder{}
		b = f.baselines[command]
	}
	b.WriteString(content)
}

func getBaselineFileName(t *testing.T, command baselineCommand) string {
	return getBaseFileNameFromTest(t) + "." + getBaselineExtension(command)
}

func getBaselineExtension(command baselineCommand) string {
	switch command {
	case quickInfoCmd, vsQuickInfoCmd, signatureHelpCmd, smartSelectionCmd, inlayHintsCmd, nonSuggestionDiagnosticsCmd, documentSymbolsCmd, closingTagCmd, vsFindAllReferencesCmd:
		return "baseline"
	case callHierarchyCmd:
		return "callHierarchy.txt"
	case autoImportsCmd:
		return "baseline.md"
	case linkedEditingCmd:
		return "linkedEditing.txt"
	default:
		return "baseline.jsonc"
	}
}

func (f *FourslashTest) getBaselineOptions(command baselineCommand, testPath string) baseline.Options {
	return baseline.Options{
		Subfolder: "fourslash/" + normalizeCommandName(string(command)),
	}
}

func dropTrailingEmptyLines(ss []string) []string {
	return ss[:core.FindLastIndex(ss, func(s string) bool { return s != "" })+1]
}

func normalizeCommandName(command string) string {
	words := strings.Fields(command)
	command = strings.Join(words, "")
	return stringutil.LowerFirstChar(command)
}

type documentSpan struct {
	uri         lsproto.DocumentUri
	textSpan    lsproto.Range
	contextSpan *lsproto.Range
}

type baselineFourslashLocationsOptions struct {
	// markerInfo
	marker     MarkerOrRange // location
	markerName string        // name of the marker to be printed in baseline

	endMarker string

	startMarkerPrefix func(span documentSpan) *string
	endMarkerSuffix   func(span documentSpan) *string
	getLocationData   func(span documentSpan) string

	additionalSpan      *documentSpan
	preserveResultOrder bool
	orderedFiles        []lsproto.DocumentUri
}

func locationToSpan(loc lsproto.Location) documentSpan {
	return documentSpan{
		uri:      loc.Uri,
		textSpan: loc.Range,
	}
}

func (f *FourslashTest) getBaselineForLocationsWithFileContents(locations []lsproto.Location, options baselineFourslashLocationsOptions) string {
	return f.getBaselineForSpansWithFileContents(
		core.Map(locations, locationToSpan),
		options,
	)
}

func (f *FourslashTest) getBaselineForSpansWithFileContents(spans []documentSpan, options baselineFourslashLocationsOptions) string {
	spansByFile := collections.GroupBy(spans, func(span documentSpan) lsproto.DocumentUri { return span.uri })
	if options.preserveResultOrder {
		options.orderedFiles = uniqueFilesInSpanOrder(spans)
	}
	return f.getBaselineForGroupedSpansWithFileContents(
		spansByFile,
		options,
	)
}

func (f *FourslashTest) getBaselineForGroupedSpansWithFileContents(groupedRanges *collections.MultiMap[lsproto.DocumentUri, documentSpan], options baselineFourslashLocationsOptions) string {
	// We must always print the file containing the marker,
	// but don't want to print it twice at the end if it already
	// found in a file with ranges.
	foundMarker := false
	foundAdditionalLocation := false
	spanToContextId := map[documentSpan]int{}

	baselineEntries := []string{}
	addFileEntry := func(path tspath.RootedFilePath) {
		fileName := lsconv.FilePathToDocumentURI(path)
		ranges := groupedRanges.Get(fileName)
		if len(ranges) == 0 {
			return
		}

		content, ok := f.textOfFile(path)
		if !ok {
			return
		}

		if options.marker != nil && options.marker.FileName() == path {
			foundMarker = true
		}

		if options.additionalSpan != nil && options.additionalSpan.uri == fileName {
			foundAdditionalLocation = true
		}

		baselineEntries = append(baselineEntries, f.getBaselineContentForFile(path, content, ranges, spanToContextId, options))
	}
	walkDirFn := func(path tspath.RootedPath, d vfs.DirEntry, e error) error {
		if e != nil {
			return e
		}

		if !d.Type().IsRegular() {
			return nil
		}

		addFileEntry(tspath.RootedFilePathFromPath(path))
		return nil
	}

	if options.preserveResultOrder {
		for _, uri := range options.orderedFiles {
			addFileEntry(uri.FileName())
		}
	} else {
		err := f.vfs.WalkDir(tspath.RootedDirectoryPathFromNormalized("/"), walkDirFn)
		if err != nil && !errors.Is(err, fs.ErrNotExist) {
			panic("walkdir error during fourslash baseline: " + err.Error())
		}

		err = f.vfs.WalkDir(tspath.RootedDirectoryPathFromNormalized("bundled:///"), walkDirFn)
		if err != nil && !errors.Is(err, fs.ErrNotExist) {
			panic("walkdir error during fourslash baseline: " + err.Error())
		}
	}

	// In Strada, there is a bug where we only ever add additional spans to baselines if we haven't
	// already added the file to the baseline.
	if options.additionalSpan != nil && !foundAdditionalLocation {
		fileName := options.additionalSpan.uri.FileName()
		if content, ok := f.textOfFile(fileName); ok {
			baselineEntries = append(
				baselineEntries,
				f.getBaselineContentForFile(fileName, content, []documentSpan{*options.additionalSpan}, spanToContextId, options),
			)
			if options.marker != nil && options.marker.FileName() == fileName {
				foundMarker = true
			}
		}
	}

	if !foundMarker && options.marker != nil {
		// If we didn't find the marker in any file, we need to add it.
		markerFileName := options.marker.FileName()
		if content, ok := f.textOfFile(markerFileName); ok {
			baselineEntries = append(baselineEntries, f.getBaselineContentForFile(markerFileName, content, nil, spanToContextId, options))
		}
	}

	// !!! skipDocumentContainingOnlyMarker

	return strings.Join(baselineEntries, "\n\n")
}

func uniqueFilesInSpanOrder(spans []documentSpan) []lsproto.DocumentUri {
	if len(spans) == 0 {
		return nil
	}
	seen := map[lsproto.DocumentUri]struct{}{}
	result := make([]lsproto.DocumentUri, 0, len(spans))
	for _, span := range spans {
		if _, ok := seen[span.uri]; ok {
			continue
		}
		seen[span.uri] = struct{}{}
		result = append(result, span.uri)
	}
	return result
}

func (f *FourslashTest) textOfFile(fileName tspath.RootedFilePath) (string, bool) {
	if _, ok := f.openFiles[fileName]; ok {
		return f.getScriptInfo(fileName).content, true
	}
	return f.vfs.ReadFile(fileName)
}

type detailKind int

const (
	detailKindMarker       detailKind = iota // /*MARKER*/
	detailKindContextStart                   // <|
	detailKindTextStart                      // [|
	detailKindTextEnd                        // |]
	detailKindContextEnd                     // |>
)

func (k detailKind) isEnd() bool {
	return k == detailKindContextEnd || k == detailKindTextEnd
}

func (k detailKind) isStart() bool {
	return k == detailKindContextStart || k == detailKindTextStart
}

type baselineDetail struct {
	pos            lsproto.Position
	positionMarker string
	span           *documentSpan
	kind           detailKind
}

func (d *baselineDetail) getRange() lsproto.Range {
	switch d.kind {
	case detailKindContextStart:
		return *d.span.contextSpan
	case detailKindContextEnd:
		return *d.span.contextSpan
	case detailKindTextStart:
		return d.span.textSpan
	case detailKindTextEnd:
		return d.span.textSpan
	case detailKindMarker:
		return lsproto.Range{
			Start: d.pos,
			End:   d.pos,
		}
	default:
		panic("unknown detail kind")
	}
}

func (f *FourslashTest) getBaselineContentForFile(
	fileName tspath.RootedFilePath,
	content string,
	spansInFile []documentSpan,
	spanToContextId map[documentSpan]int,
	options baselineFourslashLocationsOptions,
) string {
	details := []*baselineDetail{}
	detailPrefixes := map[*baselineDetail]string{}
	detailSuffixes := map[*baselineDetail]string{}
	canDetermineContextIdInline := true

	if options.marker != nil && options.marker.FileName() == fileName {
		details = append(details, &baselineDetail{pos: options.marker.LSPos(), positionMarker: options.markerName})
	}

	for _, span := range spansInFile {
		contextSpanIndex := len(details)

		// Add context span markers if present
		if span.contextSpan != nil {
			details = append(details, &baselineDetail{
				pos:            span.contextSpan.Start,
				positionMarker: "<|",
				span:           &span,
				kind:           detailKindContextStart,
			})

			// Check if context span starts after text span
			if lsproto.ComparePositions(span.contextSpan.Start, span.textSpan.Start) > 0 {
				canDetermineContextIdInline = false
			}
		}

		textSpanIndex := len(details)
		startMarker := "[|"
		if options.getLocationData != nil {
			startMarker += options.getLocationData(span)
		}
		details = append(
			details,
			&baselineDetail{pos: span.textSpan.Start, positionMarker: startMarker, span: &span, kind: detailKindTextStart},
			&baselineDetail{pos: span.textSpan.End, positionMarker: core.OrElse(options.endMarker, "|]"), span: &span, kind: detailKindTextEnd},
		)

		if span.contextSpan != nil {
			details = append(details, &baselineDetail{
				pos:            span.contextSpan.End,
				positionMarker: "|>",
				span:           &span,
				kind:           detailKindContextEnd,
			})
		}

		if options.startMarkerPrefix != nil {
			startPrefix := options.startMarkerPrefix(span)
			if startPrefix != nil {
				// Special case: if this span starts at the same position as the provided marker,
				// we want the span's prefix to appear before the marker name.
				// i.e. We want `/*START PREFIX*/A: /*RENAME*/[|ARENAME|]`,
				// not `/*RENAME*//*START PREFIX*/A: [|ARENAME|]`
				if options.marker != nil && fileName == options.marker.FileName() && span.textSpan.Start == options.marker.LSPos() {
					_, ok := detailPrefixes[details[0]]
					debug.Assert(!ok, "Expected only single prefix at marker location")
					detailPrefixes[details[0]] = *startPrefix
				} else if span.contextSpan != nil && span.contextSpan.Start == span.textSpan.Start {
					detailPrefixes[details[contextSpanIndex]] = *startPrefix
				} else {
					detailPrefixes[details[textSpanIndex]] = *startPrefix
				}
			}
		}

		if options.endMarkerSuffix != nil {
			endSuffix := options.endMarkerSuffix(span)
			if endSuffix != nil {
				// Same as above for suffixes:
				if options.marker != nil && fileName == options.marker.FileName() && span.textSpan.End == options.marker.LSPos() {
					detailSuffixes[details[0]] = *endSuffix
				} else if span.contextSpan != nil && span.contextSpan.End == span.textSpan.End {
					detailSuffixes[details[textSpanIndex+2]] = *endSuffix
				} else {
					detailSuffixes[details[textSpanIndex+1]] = *endSuffix
				}
			}
		}
	}

	// Our preferred way to write markers is
	// /*MARKER*/[| some text |]
	// [| some /*MARKER*/ text |]
	// [| some text |]/*MARKER*/
	slices.SortStableFunc(details, func(d1, d2 *baselineDetail) int {
		c := lsproto.ComparePositions(d1.pos, d2.pos)
		if c != 0 || d1.kind == detailKindMarker && d2.kind == detailKindMarker {
			return c
		}

		// /*MARKER*/[| some text |]
		if d1.kind == detailKindMarker && d2.kind.isStart() {
			return -1
		}
		if d2.kind == detailKindMarker && d1.kind.isStart() {
			return 1
		}

		// [| some text |]/*MARKER*/
		if d1.kind == detailKindMarker && d2.kind.isEnd() {
			return 1
		}
		if d2.kind == detailKindMarker && d1.kind.isEnd() {
			return -1
		}

		// [||] or <||>
		if d1.span == d2.span {
			return int(d1.kind - d2.kind)
		}

		// ...|><|...
		if d1.kind.isStart() && d2.kind.isEnd() {
			return 1
		}
		if d1.kind.isEnd() && d2.kind.isStart() {
			return -1
		}

		// <| ... [| ... |]|>
		if d1.kind.isEnd() && d2.kind.isEnd() {
			c := lsproto.ComparePositions(d2.getRange().Start, d1.getRange().Start)
			if c != 0 {
				return c
			}
			return int(d1.kind - d2.kind)
		}

		// <|[| ... |] ... |>
		if d1.kind.isStart() && d2.kind.isStart() {
			c := lsproto.ComparePositions(d2.getRange().End, d2.getRange().End)
			if c != 0 {
				return c
			}
			return int(d1.kind - d2.kind)
		}

		return 0
	})
	// !!! if canDetermineContextIdInline

	textWithContext := newTextWithContextFromFileName(fileName, content)
	for index, detail := range details {
		textWithContext.add(detail)
		textWithContext.pos = detail.pos
		// Prefix
		prefix := detailPrefixes[detail]
		if prefix != "" {
			textWithContext.newContent.WriteString(prefix)
		}
		textWithContext.newContent.WriteString(detail.positionMarker)
		if detail.span != nil {
			switch detail.kind {
			case detailKindTextStart:
				var text string
				if contextId, ok := spanToContextId[*detail.span]; ok {
					isAfterContextStart := false
					for textStartIndex := index - 1; textStartIndex >= 0; textStartIndex-- {
						textStartDetail := details[textStartIndex]
						if textStartDetail.kind == detailKindContextStart && textStartDetail.span == detail.span {
							isAfterContextStart = true
							break
						}
						// Marker is ok to skip over
						if textStartDetail.span != nil {
							break
						}
					}
					// Skip contextId on span thats surrounded by context span immediately
					if !isAfterContextStart {
						if text == "" {
							text = fmt.Sprintf(`contextId: %v`, contextId)
						} else {
							text = fmt.Sprintf(`contextId: %v`, contextId) + `, ` + text
						}
					}
				}
				if text != "" {
					textWithContext.newContent.WriteString("{ ")
					textWithContext.newContent.WriteString(text)
					textWithContext.newContent.WriteString(" |}")
				}
			case detailKindContextStart:
				if canDetermineContextIdInline {
					spanToContextId[*detail.span] = len(spanToContextId)
				}
			}
		}
		if suffix, ok := detailSuffixes[detail]; ok {
			textWithContext.newContent.WriteString(suffix)
		}
	}
	textWithContext.add(nil)
	if textWithContext.newContent.Len() != 0 {
		textWithContext.readableContents.WriteString("\n")
		textWithContext.readableJsoncBaseline(textWithContext.newContent.String())
	}
	return textWithContext.readableContents.String()
}

var lineSplitter = regexp.MustCompile(`\r?\n`)

type textWithContext struct {
	nLinesContext int // number of context lines to write to baseline

	readableContents *strings.Builder // builds what will be returned to be written to baseline

	newContent *strings.Builder // helper; the part of the original file content to write between details
	pos        lsproto.Position
	isLibFile  bool
	fileName   tspath.RootedFilePath
	content    string // content of the original file
	lineStarts *lsconv.LSPLineMap
	converters *testConverters

	// posLineInfo
	posInfo  *lsproto.Position
	lineInfo int
}

// implements lsconv.Script
func (t *textWithContext) FileName() tspath.RootedFilePath {
	return t.fileName
}

// implements lsconv.Script
func (t *textWithContext) OriginalFileName() tspath.RootedFilePath {
	return t.fileName
}

// implements lsconv.Script
func (t *textWithContext) Text() string {
	return t.content
}

// implements lsconv.Script
func (t *textWithContext) OriginalText() string { return t.content }

// implements lsconv.Script
func (t *textWithContext) SpanMap() *spanmap.SpanMap { return nil }

func newTextWithContextFromFileName(fileName tspath.RootedFilePath, content string) *textWithContext {
	t := &textWithContext{
		nLinesContext: 4,

		readableContents: &strings.Builder{},

		isLibFile:  isLibFile(fileName.AsString()),
		newContent: &strings.Builder{},
		pos:        lsproto.Position{Line: 0, Character: 0},
		fileName:   fileName,
		content:    content,
		lineStarts: lsconv.ComputeLSPLineStarts(content),
	}

	t.converters = newTestConverters(lsconv.NewConverters(lsproto.PositionEncodingKindUTF8, func(_ tspath.RootedFilePath) *lsconv.LSPLineMap {
		return t.lineStarts
	}))
	t.readableContents.WriteString("// === ")
	t.readableContents.WriteString(fileName.AsString())
	t.readableContents.WriteString(" ===")
	return t
}

func (t *textWithContext) add(detail *baselineDetail) {
	if t.newContent.Len() == 0 && detail == nil {
		panic("Unsupported")
	}
	if detail == nil || (detail.kind != detailKindTextEnd && detail.kind != detailKindContextEnd) {
		// Calculate pos to location number of lines
		posLineIndex := t.lineInfo
		if t.posInfo == nil || *t.posInfo != t.pos {
			posLineIndex = t.lineStarts.ComputeIndexOfLineStart(t.converters.LineAndCharacterToPosition(t, t.pos))
		}

		locationLineIndex := len(t.lineStarts.LineStarts) - 1
		if detail != nil {
			locationLineIndex = t.lineStarts.ComputeIndexOfLineStart(t.converters.LineAndCharacterToPosition(t, detail.pos))
			t.posInfo = &detail.pos
			t.lineInfo = locationLineIndex
		}

		nLines := 0
		if t.newContent.Len() != 0 {
			nLines += t.nLinesContext + 1
		}
		if detail != nil {
			nLines += t.nLinesContext + 1
		}
		// first nLinesContext and last nLinesContext
		if locationLineIndex-posLineIndex > nLines {
			if t.newContent.Len() != 0 {
				var skippedString string
				if t.isLibFile {
					skippedString = "--- (line: --) skipped ---\n"
				} else {
					skippedString = fmt.Sprintf(`--- (line: %v) skipped ---`, posLineIndex+t.nLinesContext+1)
				}

				t.readableContents.WriteString("\n")
				t.readableJsoncBaseline(t.newContent.String() + t.sliceOfContent(
					t.getIndex(t.pos),
					t.getIndex(t.lineStarts.LineStarts[posLineIndex+t.nLinesContext]),
				) + skippedString)

				if detail != nil {
					t.readableContents.WriteString("\n")
				}
				t.newContent.Reset()
			}
			if detail != nil {
				if t.isLibFile {
					t.newContent.WriteString("--- (line: --) skipped ---\n")
				} else {
					t.newContent.WriteString(fmt.Sprintf("--- (line: %v) skipped ---\n", locationLineIndex-t.nLinesContext+1))
				}
				t.newContent.WriteString(t.sliceOfContent(
					t.getIndex(t.lineStarts.LineStarts[locationLineIndex-t.nLinesContext+1]),
					t.getIndex(detail.pos),
				))
			}
			return
		}
	}
	if detail == nil {
		t.newContent.WriteString(t.sliceOfContent(t.getIndex(t.pos), nil))
	} else {
		t.newContent.WriteString(t.sliceOfContent(t.getIndex(t.pos), t.getIndex(detail.pos)))
	}
}

func (t *textWithContext) readableJsoncBaseline(text string) {
	for i, line := range lineSplitter.Split(text, -1) {
		if i > 0 {
			t.readableContents.WriteString("\n")
		}
		t.readableContents.WriteString("// ")
		t.readableContents.WriteString(line)
	}
}

type markerAndItem[T any] struct {
	Marker *Marker `json:"marker"`
	Item   T       `json:"item"`
}

func annotateContentWithTooltips[T comparable](
	t *testing.T,
	f *FourslashTest,
	markersAndItems []markerAndItem[T],
	opName string,
	getRange func(item T) *lsproto.Range,
	getTooltipLines func(item T, prev T) []string,
) string {
	barWithGutter := "| " + strings.Repeat("-", 70)

	// sort by file, then *backwards* by position in the file
	// so we can insert multiple times on a line without counting.
	sorted := slices.Clone(markersAndItems)
	slices.SortStableFunc(sorted, func(a, b markerAndItem[T]) int {
		if c := cmp.Compare(a.Marker.FileName(), b.Marker.FileName()); c != 0 {
			return c
		}
		return -cmp.Compare(a.Marker.Position, b.Marker.Position)
	})

	filesToLines := collections.NewOrderedMapWithSizeHint[tspath.RootedFilePath, []string](1)
	var previous T
	for _, itemAndMarker := range sorted {
		marker := itemAndMarker.Marker
		item := itemAndMarker.Item

		textRange := getRange(item)
		if textRange == nil {
			start := marker.LSPosition
			end := start
			end.Character = end.Character + 1
			textRange = &lsproto.Range{Start: start, End: end}
		}

		if textRange.Start.Line != textRange.End.Line {
			t.Fatalf("Expected text range to be on a single line, got %v", textRange)
		}
		underline := strings.Repeat(" ", int(textRange.Start.Character)) +
			strings.Repeat("^", int(textRange.End.Character-textRange.Start.Character))

		fileName := marker.FileName()
		lines, ok := filesToLines.Get(fileName)
		if !ok {
			lines = lineSplitter.Split(f.getScriptInfo(fileName).content, -1)
		}

		var tooltipLines []string
		if item != *new(T) {
			tooltipLines = getTooltipLines(item, previous)
		}
		if len(tooltipLines) == 0 {
			tooltipLines = []string{fmt.Sprintf("No %s at /*%s*/.", opName, *marker.Name)}
		}
		tooltipLines = core.Map(tooltipLines, func(line string) string {
			return "| " + line
		})

		linesToInsert := make([]string, len(tooltipLines)+3)
		linesToInsert[0] = underline
		linesToInsert[1] = barWithGutter
		copy(linesToInsert[2:], tooltipLines)
		linesToInsert[len(linesToInsert)-1] = barWithGutter

		lines = slices.Insert(
			lines,
			int(textRange.Start.Line+1),
			linesToInsert...,
		)
		filesToLines.Set(fileName, lines)

		previous = item
	}

	builder := strings.Builder{}
	seenFirst := false
	for fileName, lines := range filesToLines.Entries() {
		builder.WriteString(fmt.Sprintf("=== %s ===\n", fileName))
		for _, line := range lines {
			builder.WriteString("// ")
			builder.WriteString(line)
			builder.WriteByte('\n')
		}

		if seenFirst {
			builder.WriteString("\n\n")
		} else {
			seenFirst = true
		}
	}

	return builder.String()
}

func (t *textWithContext) sliceOfContent(start *int, end *int) string {
	if start == nil || *start < 0 {
		start = new(0)
	}

	if end == nil || *end > len(t.content) {
		end = new(len(t.content))
	}

	if *start > *end {
		return ""
	}

	return t.content[*start:*end]
}

func (t *textWithContext) getIndex(i any) *int {
	switch i := i.(type) {
	case *int:
		return i
	case int:
		return new(i)
	case core.TextPos:
		return new(int(i))
	case *core.TextPos:
		return new(int(*i))
	case lsproto.Position:
		return t.getIndex(t.converters.LineAndCharacterToPosition(t, i))
	case *lsproto.Position:
		return t.getIndex(t.converters.LineAndCharacterToPosition(t, *i))
	}
	panic(fmt.Sprintf("getIndex: unsupported type %T", i))
}

func codeFence(lang string, code string) string {
	return "```" + lang + "\n" + code + "\n```"
}

func symbolInformationToData(symbol *lsproto.SymbolInformation) string {
	return fmt.Sprintf("{| name: %s, kind: %s |}", symbol.Name, symbol.Kind.String())
}
