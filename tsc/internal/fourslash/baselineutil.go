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

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/vfs"
)

func (f *FourslashTest) addResultToBaseline(t *testing.T, command string, actual string) {
	b, ok := f.baselines[command]
	if !ok {
		f.baselines[command] = &strings.Builder{}
		b = f.baselines[command]
	}
	if b.Len() != 0 {
		b.WriteString("\n\n\n\n")
	}
	b.WriteString(`// === ` + command + " ===\n" + actual)
}

func (f *FourslashTest) writeToBaseline(command string, content string) {
	b, ok := f.baselines[command]
	if !ok {
		f.baselines[command] = &strings.Builder{}
		b = f.baselines[command]
	}
	b.WriteString(content)
}

func getBaselineFileName(t *testing.T, command string) string {
	return getBaseFileNameFromTest(t) + "." + getBaselineExtension(command)
}

func getBaselineExtension(command string) string {
	switch command {
	case "QuickInfo", "SignatureHelp":
		return "baseline"
	case "Auto Imports":
		return "baseline.md"
	case "findAllReferences", "goToDefinition", "findRenameLocations":
		return "baseline.jsonc"
	default:
		return "baseline.jsonc"
	}
}

func getBaselineOptions(command string) baseline.Options {
	subfolder := "fourslash/" + normalizeCommandName(command)
	switch command {
	case "findRenameLocations":
		return baseline.Options{
			Subfolder:   subfolder,
			IsSubmodule: true,
			DiffFixupOld: func(s string) string {
				var commandLines []string
				commandPrefix := regexp.MustCompile(`^// === ([a-z\sA-Z]*) ===`)
				testFilePrefix := "/tests/cases/fourslash"
				serverTestFilePrefix := "/server"
				contextSpanOpening := "<|"
				contextSpanClosing := "|>"
				oldPreference := "providePrefixAndSuffixTextForRename"
				newPreference := "useAliasesForRename"
				replacer := strings.NewReplacer(
					contextSpanOpening, "",
					contextSpanClosing, "",
					testFilePrefix, "",
					serverTestFilePrefix, "",
					oldPreference, newPreference,
				)
				lines := strings.Split(s, "\n")
				var isInCommand bool
				for _, line := range lines {
					if strings.HasPrefix(line, "// @findInStrings: ") || strings.HasPrefix(line, "// @findInComments: ") {
						continue
					}
					matches := commandPrefix.FindStringSubmatch(line)
					if len(matches) > 0 {
						commandName := matches[1]
						if commandName == command {
							isInCommand = true
						} else {
							isInCommand = false
						}
					}
					if isInCommand {
						fixedLine := replacer.Replace(line)
						commandLines = append(commandLines, fixedLine)
					}
				}
				return strings.Join(commandLines, "\n")
			},
		}
	default:
		return baseline.Options{
			Subfolder: subfolder,
		}
	}
}

func normalizeCommandName(command string) string {
	words := strings.Fields(command)
	command = strings.Join(words, "")
	return stringutil.LowerFirstChar(command)
}

type baselineFourslashLocationsOptions struct {
	// markerInfo
	marker     MarkerOrRange // location
	markerName string        // name of the marker to be printed in baseline

	endMarker string

	startMarkerPrefix func(span lsproto.Location) *string
	endMarkerSuffix   func(span lsproto.Location) *string
}

func (f *FourslashTest) getBaselineForLocationsWithFileContents(spans []lsproto.Location, options baselineFourslashLocationsOptions) string {
	locationsByFile := collections.GroupBy(spans, func(span lsproto.Location) lsproto.DocumentUri { return span.Uri })
	rangesByFile := collections.MultiMap[lsproto.DocumentUri, lsproto.Range]{}
	for file, locs := range locationsByFile.M {
		for _, loc := range locs {
			rangesByFile.Add(file, loc.Range)
		}
	}
	return f.getBaselineForGroupedLocationsWithFileContents(
		&rangesByFile,
		options,
	)
}

func (f *FourslashTest) getBaselineForGroupedLocationsWithFileContents(groupedRanges *collections.MultiMap[lsproto.DocumentUri, lsproto.Range], options baselineFourslashLocationsOptions) string {
	// We must always print the file containing the marker,
	// but don't want to print it twice at the end if it already
	// found in a file with ranges.
	foundMarker := false

	baselineEntries := []string{}
	err := f.vfs.WalkDir("/", func(path string, d vfs.DirEntry, e error) error {
		if e != nil {
			return e
		}

		if !d.Type().IsRegular() {
			return nil
		}

		fileName := ls.FileNameToDocumentURI(path)
		ranges := groupedRanges.Get(fileName)
		if len(ranges) == 0 {
			return nil
		}

		content, ok := f.vfs.ReadFile(path)
		if !ok {
			// !!! error?
			return nil
		}

		if options.marker != nil && options.marker.FileName() == path {
			foundMarker = true
		}

		baselineEntries = append(baselineEntries, f.getBaselineContentForFile(path, content, ranges, nil, options))
		return nil
	})

	if err != nil && !errors.Is(err, fs.ErrNotExist) {
		panic("walkdir error during fourslash baseline: " + err.Error())
	}

	if !foundMarker && options.marker != nil {
		// If we didn't find the marker in any file, we need to add it.
		markerFileName := options.marker.FileName()
		if content, ok := f.vfs.ReadFile(markerFileName); ok {
			baselineEntries = append(baselineEntries, f.getBaselineContentForFile(markerFileName, content, nil, nil, options))
		}
	}

	// !!! foundAdditionalSpan
	// !!! skipDocumentContainingOnlyMarker

	return strings.Join(baselineEntries, "\n\n")
}

type baselineDetail struct {
	pos            lsproto.Position
	positionMarker string
	span           *lsproto.Range
	kind           string
}

func (f *FourslashTest) getBaselineContentForFile(
	fileName string,
	content string,
	spansInFile []lsproto.Range,
	spanToContextId map[lsproto.Range]int,
	options baselineFourslashLocationsOptions,
) string {
	details := []*baselineDetail{}
	detailPrefixes := map[*baselineDetail]string{}
	detailSuffixes := map[*baselineDetail]string{}
	canDetermineContextIdInline := true
	uri := ls.FileNameToDocumentURI(fileName)

	if options.marker != nil && options.marker.FileName() == fileName {
		details = append(details, &baselineDetail{pos: options.marker.LSPos(), positionMarker: options.markerName})
	}

	for _, span := range spansInFile {
		textSpanIndex := len(details)
		details = append(details,
			&baselineDetail{pos: span.Start, positionMarker: "[|", span: &span, kind: "textStart"},
			&baselineDetail{pos: span.End, positionMarker: core.OrElse(options.endMarker, "|]"), span: &span, kind: "textEnd"},
		)

		if options.startMarkerPrefix != nil {
			startPrefix := options.startMarkerPrefix(lsproto.Location{Uri: uri, Range: span})
			if startPrefix != nil {
				// Special case: if this span starts at the same position as the provided marker,
				// we want the span's prefix to appear before the marker name.
				// i.e. We want `/*START PREFIX*/A: /*RENAME*/[|ARENAME|]`,
				// not `/*RENAME*//*START PREFIX*/A: [|ARENAME|]`
				if options.marker != nil && fileName == options.marker.FileName() && span.Start == options.marker.LSPos() {
					_, ok := detailPrefixes[details[0]]
					debug.Assert(!ok, "Expected only single prefix at marker location")
					detailPrefixes[details[0]] = *startPrefix
				} else {
					detailPrefixes[details[textSpanIndex]] = *startPrefix
				}
			}
		}

		if options.endMarkerSuffix != nil {
			endSuffix := options.endMarkerSuffix(lsproto.Location{Uri: uri, Range: span})
			if endSuffix != nil {
				detailSuffixes[details[textSpanIndex+1]] = *endSuffix
			}
		}
	}

	slices.SortStableFunc(details, func(d1, d2 *baselineDetail) int {
		return ls.ComparePositions(d1.pos, d2.pos)
	})
	// !!! if canDetermineContextIdInline

	textWithContext := newTextWithContext(fileName, content)

	// Our preferred way to write marker is
	// /*MARKER*/[| some text |]
	// [| some /*MARKER*/ text |]
	// [| some text |]/*MARKER*/
	// Stable sort should handle first two cases but with that marker will be before rangeEnd if locations match
	// So we will defer writing marker in this case by checking and finding index of rangeEnd if same
	var deferredMarkerIndex *int

	for index, detail := range details {
		if detail.span == nil && deferredMarkerIndex == nil {
			// If this is marker position and its same as textEnd and/or contextEnd we want to write marker after those
			for matchingEndPosIndex := index + 1; matchingEndPosIndex < len(details); matchingEndPosIndex++ {
				// Defer after the location if its same as rangeEnd
				if details[matchingEndPosIndex].pos == detail.pos && strings.HasSuffix(details[matchingEndPosIndex].kind, "End") {
					deferredMarkerIndex = ptrTo(matchingEndPosIndex)
				}
				// Dont defer further than already determined
				break
			}
			// Defer writing marker position to deffered marker index
			if deferredMarkerIndex != nil {
				continue
			}
		}
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
			case "textStart":
				var text string
				if contextId, ok := spanToContextId[*detail.span]; ok {
					isAfterContextStart := false
					for textStartIndex := index - 1; textStartIndex >= 0; textStartIndex-- {
						textStartDetail := details[textStartIndex]
						if textStartDetail.kind == "contextStart" && textStartDetail.span == detail.span {
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
					textWithContext.newContent.WriteString(`{ ` + text + ` |}`)
				}
			case "contextStart":
				if canDetermineContextIdInline {
					spanToContextId[*detail.span] = len(spanToContextId)
				}
			}

			if deferredMarkerIndex != nil && *deferredMarkerIndex == index {
				// Write the marker
				textWithContext.newContent.WriteString(options.markerName)
				deferredMarkerIndex = nil
				detail = details[0] // Marker detail
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
	fileName   string
	content    string // content of the original file
	lineStarts *ls.LSPLineMap
	converters *ls.Converters

	// posLineInfo
	posInfo  *lsproto.Position
	lineInfo int
}

// implements ls.Script
func (t *textWithContext) FileName() string {
	return t.fileName
}

// implements ls.Script
func (t *textWithContext) Text() string {
	return t.content
}

func newTextWithContext(fileName string, content string) *textWithContext {
	t := &textWithContext{
		nLinesContext: 4,

		readableContents: &strings.Builder{},

		isLibFile:  regexp.MustCompile(`lib.*\.d\.ts$`).MatchString(fileName),
		newContent: &strings.Builder{},
		pos:        lsproto.Position{Line: 0, Character: 0},
		fileName:   fileName,
		content:    content,
		lineStarts: ls.ComputeLSPLineStarts(content),
	}

	t.converters = ls.NewConverters(lsproto.PositionEncodingKindUTF8, func(_ string) *ls.LSPLineMap {
		return t.lineStarts
	})
	t.readableContents.WriteString("// === " + fileName + " ===")
	return t
}

func (t *textWithContext) add(detail *baselineDetail) {
	if t.content == "" && detail == nil {
		panic("Unsupported")
	}
	if detail == nil || (detail.kind != "textEnd" && detail.kind != "contextEnd") {
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
					skippedString = fmt.Sprintf(`// --- (line: %v) skipped ---`, posLineIndex+t.nLinesContext+1)
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
		t.readableContents.WriteString(`// ` + line)
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
	// so we can insert multiple times on a line without counting
	sorted := slices.Clone(markersAndItems)
	slices.SortFunc(sorted, func(a, b markerAndItem[T]) int {
		if c := cmp.Compare(a.Marker.FileName(), b.Marker.FileName()); c != 0 {
			return c
		}
		return -cmp.Compare(a.Marker.Position, b.Marker.Position)
	})

	filesToLines := collections.NewOrderedMapWithSizeHint[string, []string](1)
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
		start = ptrTo(0)
	}

	if end == nil || *end > len(t.content) {
		end = ptrTo(len(t.content))
	}

	if *start > *end {
		return ""
	}

	return t.content[*start:*end]
}

func (t *textWithContext) getIndex(i interface{}) *int {
	switch i := i.(type) {
	case *int:
		return i
	case int:
		return ptrTo(i)
	case core.TextPos:
		return ptrTo(int(i))
	case *core.TextPos:
		return ptrTo(int(*i))
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
