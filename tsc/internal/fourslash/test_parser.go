package fourslash

import (
	"fmt"
	"slices"
	"strings"
	"testing"
	"unicode/utf8"

	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/testrunner"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// Inserted in source files by surrounding desired text
// in a range with `[|` and `|]`. For example,
//
// [|text in range|]
//
// is a range with `text in range` "selected".
type RangeMarker struct {
	fileName string
	Range    core.TextRange
	LSRange  lsproto.Range
	Marker   *Marker
}

func (r *RangeMarker) LSPos() lsproto.Position {
	return r.LSRange.Start
}

func (r *RangeMarker) FileName() string {
	return r.fileName
}

func (r *RangeMarker) GetName() *string {
	if r.Marker == nil {
		return nil
	}
	return r.Marker.Name
}

type Marker struct {
	fileName   string
	Position   int
	LSPosition lsproto.Position
	Name       *string // `nil` for anonymous markers such as `{| "foo": "bar" |}`
	Data       map[string]any
}

func (m *Marker) LSPos() lsproto.Position {
	return m.LSPosition
}

func (m *Marker) FileName() string {
	return m.fileName
}

func (m *Marker) GetName() *string {
	return m.Name
}

type MarkerOrRange interface {
	FileName() string
	LSPos() lsproto.Position
	GetName() *string
}

type TestData struct {
	Files           []*TestFileInfo
	MarkerPositions map[string]*Marker
	Markers         []*Marker
	Symlinks        map[string]string
	GlobalOptions   map[string]string
	Ranges          []*RangeMarker
}

type testFileWithMarkers struct {
	file    *TestFileInfo
	markers []*Marker
	ranges  []*RangeMarker
}

func ParseTestData(t *testing.T, contents string, fileName string) TestData {
	// List of all the subfiles we've parsed out
	var files []*TestFileInfo

	markerPositions := make(map[string]*Marker)
	var markers []*Marker
	var ranges []*RangeMarker

	filesWithMarker, symlinks, _, globalOptions, e := testrunner.ParseTestFilesAndSymlinks(
		contents,
		fileName,
		parseFileContent,
	)
	if e != nil {
		t.Fatalf("Error parsing fourslash data: %s", e.Error())
	}

	hasTSConfig := false
	for _, file := range filesWithMarker {
		files = append(files, file.file)
		hasTSConfig = hasTSConfig || isConfigFile(file.file.fileName)

		markers = append(markers, file.markers...)
		ranges = append(ranges, file.ranges...)
		for _, marker := range file.markers {
			if marker.Name == nil {
				if marker.Data != nil {
					// The marker is an anonymous object marker, which does not need a name. Markers are only set into markerPositions if they have a name
					continue
				}
				t.Fatalf(`Marker at position %v is unnamed`, marker.Position)
			}
			if existing, ok := markerPositions[*marker.Name]; ok {
				t.Fatalf(`Duplicate marker name: "%s" at %v and %v`, *marker.Name, marker.Position, existing.Position)
			}
			markerPositions[*marker.Name] = marker
		}

	}

	if hasTSConfig && len(globalOptions) > 0 {
		t.Fatalf("It is not allowed to use global options along with config files.")
	}

	return TestData{
		Files:           files,
		MarkerPositions: markerPositions,
		Markers:         markers,
		Symlinks:        symlinks,
		GlobalOptions:   globalOptions,
		Ranges:          ranges,
	}
}

func isConfigFile(fileName string) bool {
	fileName = strings.ToLower(fileName)
	return strings.HasSuffix(fileName, "tsconfig.json") || strings.HasSuffix(fileName, "jsconfig.json")
}

type locationInformation struct {
	position       int
	sourcePosition int
	sourceLine     int
	sourceColumn   int
}

type rangeLocationInformation struct {
	locationInformation
	marker *Marker
}

type TestFileInfo struct {
	fileName string
	// The contents of the file (with markers, etc stripped out)
	Content string
	emit    bool
}

// FileName implements ls.Script.
func (t *TestFileInfo) FileName() string {
	return t.fileName
}

// Text implements ls.Script.
func (t *TestFileInfo) Text() string {
	return t.Content
}

var _ ls.Script = (*TestFileInfo)(nil)

const emitThisFileOption = "emitthisfile"

type parserState int

const (
	stateNone parserState = iota
	stateInSlashStarMarker
	stateInObjectMarker
)

func parseFileContent(fileName string, content string, fileOptions map[string]string) (*testFileWithMarkers, error) {
	fileName = tspath.GetNormalizedAbsolutePath(fileName, "/")

	// The file content (minus metacharacters) so far
	var output strings.Builder

	var markers []*Marker

	/// A stack of the open range markers that are still unclosed
	openRanges := []rangeLocationInformation{}
	/// A list of closed ranges we've collected so far
	rangeMarkers := []*RangeMarker{}

	// The total number of metacharacters removed from the file (so far)
	difference := 0

	// One-based current position data
	line := 1
	column := 1

	// The current marker (or maybe multi-line comment?) we're parsing, possibly
	var openMarker *locationInformation

	// The latest position of the start of an unflushed plain text area
	lastNormalCharPosition := 0

	flush := func(lastSafeCharIndex int) {
		if lastSafeCharIndex != -1 {
			output.WriteString(content[lastNormalCharPosition:lastSafeCharIndex])
		} else {
			output.WriteString(content[lastNormalCharPosition:])
		}
	}

	state := stateNone
	previousCharacter, i := utf8.DecodeRuneInString(content)
	var size int
	var currentCharacter rune
	for ; i < len(content); i = i + size {
		currentCharacter, size = utf8.DecodeRuneInString(content[i:])
		switch state {
		case stateNone:
			if previousCharacter == '[' && currentCharacter == '|' {
				// found a range start
				openRanges = append(openRanges, rangeLocationInformation{
					locationInformation: locationInformation{
						position:       (i - 1) - difference,
						sourcePosition: i - 1,
						sourceLine:     line,
						sourceColumn:   column,
					},
				})
				// copy all text up to marker position
				flush(i - 1)
				lastNormalCharPosition = i + 1
				difference += 2
			} else if previousCharacter == '|' && currentCharacter == ']' {
				// found a range end
				if len(openRanges) == 0 {
					return nil, reportError(fileName, line, column, "Found range end with no matching start.")
				}
				rangeStart := openRanges[len(openRanges)-1]
				openRanges = openRanges[:len(openRanges)-1]

				closedRange := &RangeMarker{
					fileName: fileName,
					Range:    core.NewTextRange(rangeStart.position, (i-1)-difference),
					Marker:   rangeStart.marker,
				}

				rangeMarkers = append(rangeMarkers, closedRange)

				// copy all text up to range marker position
				flush(i - 1)
				lastNormalCharPosition = i + 1
				difference += 2
			} else if previousCharacter == '/' && currentCharacter == '*' {
				// found a possible marker start
				state = stateInSlashStarMarker
				openMarker = &locationInformation{
					position:       (i - 1) - difference,
					sourcePosition: i - 1,
					sourceLine:     line,
					sourceColumn:   column - 1,
				}
			} else if previousCharacter == '{' && currentCharacter == '|' {
				// found an object marker start
				state = stateInObjectMarker
				openMarker = &locationInformation{
					position:       (i - 1) - difference,
					sourcePosition: i - 1,
					sourceLine:     line,
					sourceColumn:   column,
				}
				flush(i - 1)
			}
		case stateInObjectMarker:
			// Object markers are only ever terminated by |} and have no content restrictions
			if previousCharacter == '|' && currentCharacter == '}' {
				objectMarkerData := strings.TrimSpace(content[openMarker.sourcePosition+2 : i-1])
				marker, e := getObjectMarker(fileName, openMarker, objectMarkerData)
				if e != nil {
					return nil, e
				}

				if len(openRanges) > 0 {
					openRanges[len(openRanges)-1].marker = marker
				}
				markers = append(markers, marker)

				// Set the current start to point to the end of the current marker to ignore its text
				lastNormalCharPosition = i + 1
				difference += i + 1 - openMarker.sourcePosition

				// Reset the state
				openMarker = nil
				state = stateNone
			}
		case stateInSlashStarMarker:
			if previousCharacter == '*' && currentCharacter == '/' {
				// Record the marker
				// start + 2 to ignore the */, -1 on the end to ignore the * (/ is next)
				markerNameText := strings.TrimSpace(content[openMarker.sourcePosition+2 : i-1])
				marker := &Marker{
					fileName: fileName,
					Position: openMarker.position,
					Name:     &markerNameText,
				}
				if len(openRanges) > 0 {
					openRanges[len(openRanges)-1].marker = marker
				}
				markers = append(markers, marker)

				// Set the current start to point to the end of the current marker to ignore its text
				flush(openMarker.sourcePosition)
				lastNormalCharPosition = i + 1
				difference += i + 1 - openMarker.sourcePosition

				// Reset the state
				openMarker = nil
				state = stateNone
			} else if !(stringutil.IsDigit(currentCharacter) ||
				stringutil.IsASCIILetter(currentCharacter) ||
				currentCharacter == '$' ||
				currentCharacter == '_') { // Invalid marker character
				if currentCharacter == '*' && i < len(content)-1 && content[i+1] == '/' {
					// The marker is about to be closed, ignore the 'invalid' char
				} else {
					// We've hit a non-valid marker character, so we were actually in a block comment
					// Bail out the text we've gathered so far back into the output
					flush(i)
					lastNormalCharPosition = i
					openMarker = nil
					state = stateNone
				}
			}
		}
		if currentCharacter == '\n' && previousCharacter == '\r' {
			// Ignore trailing \n after \r
			continue
		} else if currentCharacter == '\n' || currentCharacter == '\r' {
			line++
			column = 1
			continue
		}
		column++
		previousCharacter = currentCharacter
	}

	// Add the remaining text
	flush(-1)

	if len(openRanges) > 0 {
		openRange := openRanges[0]
		return nil, reportError(fileName, openRange.sourceLine, openRange.sourceColumn, "Unterminated range.")
	}

	if openMarker != nil {
		return nil, reportError(fileName, openMarker.sourceLine, openMarker.sourceColumn, "Unterminated marker.")
	}

	outputString := output.String()
	// Set LS positions for markers
	lineMap := ls.ComputeLSPLineStarts(outputString)
	converters := ls.NewConverters(lsproto.PositionEncodingKindUTF8, func(_ string) *ls.LSPLineMap {
		return lineMap
	})

	emit := fileOptions[emitThisFileOption] == "true"

	testFileInfo := &TestFileInfo{
		fileName: fileName,
		Content:  outputString,
		emit:     emit,
	}

	slices.SortStableFunc(rangeMarkers, func(a, b *RangeMarker) int {
		if a.Range.Pos() != b.Range.Pos() {
			return a.Range.Pos() - b.Range.Pos()
		}
		return b.Range.End() - a.Range.End()
	})

	for _, marker := range markers {
		marker.LSPosition = converters.PositionToLineAndCharacter(testFileInfo, core.TextPos(marker.Position))
	}
	for _, rangeMarker := range rangeMarkers {
		rangeMarker.LSRange = lsproto.Range{
			Start: converters.PositionToLineAndCharacter(testFileInfo, core.TextPos(rangeMarker.Range.Pos())),
			End:   converters.PositionToLineAndCharacter(testFileInfo, core.TextPos(rangeMarker.Range.End())),
		}
	}

	return &testFileWithMarkers{
		file:    testFileInfo,
		markers: markers,
		ranges:  rangeMarkers,
	}, nil
}

func getObjectMarker(fileName string, location *locationInformation, text string) (*Marker, error) {
	// Attempt to parse the marker value as JSON
	var v interface{}
	e := json.Unmarshal([]byte("{ "+text+" }"), &v)

	if e != nil {
		return nil, reportError(fileName, location.sourceLine, location.sourceColumn, "Unable to parse marker text "+text)
	}
	markerValue, ok := v.(map[string]interface{})
	if !ok || len(markerValue) == 0 {
		return nil, reportError(fileName, location.sourceLine, location.sourceColumn, "Object markers can not be empty")
	}

	marker := &Marker{
		fileName: fileName,
		Position: location.position,
		Data:     markerValue,
	}

	// Object markers can be anonymous
	if markerValue["name"] != nil {
		if name, ok := markerValue["name"].(string); ok && name != "" {
			marker.Name = &name
		}
	}

	return marker, nil
}

func reportError(fileName string, line int, col int, message string) error {
	return &fourslashError{fmt.Sprintf("%v (%v,%v): %v", fileName, line, col, message)}
}

type fourslashError struct {
	err string
}

func (e *fourslashError) Error() string {
	return e.err
}
