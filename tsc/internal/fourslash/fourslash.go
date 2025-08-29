package fourslash

import (
	"fmt"
	"io"
	"maps"
	"slices"
	"strings"
	"testing"
	"unicode"
	"unicode/utf8"

	"github.com/go-json-experiment/json"
	"github.com/google/go-cmp/cmp"
	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type FourslashTest struct {
	server *lsp.Server
	in     *lspWriter
	out    *lspReader
	id     int32
	vfs    vfs.FS

	testData *TestData // !!! consolidate test files from test data and script info
	baseline *baselineFromTest

	scriptInfos map[string]*scriptInfo
	converters  *ls.Converters

	currentCaretPosition lsproto.Position
	lastKnownMarkerName  *string
	activeFilename       string
	selectionEnd         *lsproto.Position
}

type scriptInfo struct {
	fileName string
	content  string
	lineMap  *ls.LineMap
	version  int32
}

func newScriptInfo(fileName string, content string) *scriptInfo {
	return &scriptInfo{
		fileName: fileName,
		content:  content,
		lineMap:  ls.ComputeLineStarts(content),
		version:  1,
	}
}

func (s *scriptInfo) editContent(start int, end int, newText string) {
	s.content = s.content[:start] + newText + s.content[end:]
	s.lineMap = ls.ComputeLineStarts(s.content)
	s.version++
}

func (s *scriptInfo) Text() string {
	return s.content
}

func (s *scriptInfo) FileName() string {
	return s.fileName
}

type lspReader struct {
	c <-chan *lsproto.Message
}

func (r *lspReader) Read() (*lsproto.Message, error) {
	msg, ok := <-r.c
	if !ok {
		return nil, io.EOF
	}
	return msg, nil
}

type lspWriter struct {
	c chan<- *lsproto.Message
}

func (w *lspWriter) Write(msg *lsproto.Message) error {
	w.c <- msg
	return nil
}

func (r *lspWriter) Close() {
	close(r.c)
}

var (
	_ lsp.Reader = (*lspReader)(nil)
	_ lsp.Writer = (*lspWriter)(nil)
)

func newLSPPipe() (*lspReader, *lspWriter) {
	c := make(chan *lsproto.Message, 100)
	return &lspReader{c: c}, &lspWriter{c: c}
}

const rootDir = "/"

var parseCache = project.ParseCache{
	Options: project.ParseCacheOptions{
		DisableDeletion: true,
	},
}

func NewFourslash(t *testing.T, capabilities *lsproto.ClientCapabilities, content string) *FourslashTest {
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}
	fileName := getFileNameFromTest(t)
	testfs := make(map[string]string)
	scriptInfos := make(map[string]*scriptInfo)
	testData := ParseTestData(t, content, fileName)
	for _, file := range testData.Files {
		filePath := tspath.GetNormalizedAbsolutePath(file.fileName, rootDir)
		testfs[filePath] = file.Content
		scriptInfos[filePath] = newScriptInfo(filePath, file.Content)
	}

	compilerOptions := &core.CompilerOptions{
		SkipDefaultLibCheck: core.TSTrue,
	}
	harnessutil.SetCompilerOptionsFromTestConfig(t, testData.GlobalOptions, compilerOptions, rootDir)

	inputReader, inputWriter := newLSPPipe()
	outputReader, outputWriter := newLSPPipe()
	fs := bundled.WrapFS(vfstest.FromMap(testfs, true /*useCaseSensitiveFileNames*/))

	var err strings.Builder
	server := lsp.NewServer(&lsp.ServerOptions{
		In:  inputReader,
		Out: outputWriter,
		Err: &err,

		Cwd:                "/",
		FS:                 fs,
		DefaultLibraryPath: bundled.LibPath(),

		ParseCache: &parseCache,
	})

	go func() {
		defer func() {
			outputWriter.Close()
		}()
		err := server.Run()
		if err != nil {
			t.Error("server error:", err)
		}
	}()

	converters := ls.NewConverters(lsproto.PositionEncodingKindUTF8, func(fileName string) *ls.LineMap {
		scriptInfo, ok := scriptInfos[fileName]
		if !ok {
			return nil
		}
		return scriptInfo.lineMap
	})

	f := &FourslashTest{
		server:      server,
		in:          inputWriter,
		out:         outputReader,
		testData:    &testData,
		vfs:         fs,
		scriptInfos: scriptInfos,
		converters:  converters,
	}

	// !!! temporary; remove when we have `handleDidChangeConfiguration`/implicit project config support
	// !!! replace with a proper request *after initialize*
	f.server.SetCompilerOptionsForInferredProjects(t.Context(), compilerOptions)
	f.initialize(t, capabilities)
	for _, file := range testData.Files {
		f.openFile(t, file.fileName)
	}
	f.activeFilename = f.testData.Files[0].fileName

	t.Cleanup(func() {
		inputWriter.Close()
	})
	return f
}

func getFileNameFromTest(t *testing.T) string {
	name := strings.TrimPrefix(t.Name(), "Test")
	char, size := utf8.DecodeRuneInString(name)
	return string(unicode.ToLower(char)) + name[size:] + tspath.ExtensionTs
}

func (f *FourslashTest) nextID() int32 {
	id := f.id
	f.id++
	return id
}

func (f *FourslashTest) initialize(t *testing.T, capabilities *lsproto.ClientCapabilities) {
	params := &lsproto.InitializeParams{
		Locale: ptrTo("en-US"),
	}
	params.Capabilities = getCapabilitiesWithDefaults(capabilities)
	// !!! check for errors?
	sendRequest(t, f, lsproto.InitializeInfo, params)
	sendNotification(t, f, lsproto.InitializedInfo, &lsproto.InitializedParams{})
}

var (
	ptrTrue                       = ptrTo(true)
	defaultCompletionCapabilities = &lsproto.CompletionClientCapabilities{
		CompletionItem: &lsproto.ClientCompletionItemOptions{
			SnippetSupport:          ptrTrue,
			CommitCharactersSupport: ptrTrue,
			PreselectSupport:        ptrTrue,
			LabelDetailsSupport:     ptrTrue,
			InsertReplaceSupport:    ptrTrue,
		},
		CompletionList: &lsproto.CompletionListCapabilities{
			ItemDefaults: &[]string{"commitCharacters", "editRange"},
		},
	}
)

func getCapabilitiesWithDefaults(capabilities *lsproto.ClientCapabilities) *lsproto.ClientCapabilities {
	var capabilitiesWithDefaults lsproto.ClientCapabilities
	if capabilities != nil {
		capabilitiesWithDefaults = *capabilities
	}
	capabilitiesWithDefaults.General = &lsproto.GeneralClientCapabilities{
		PositionEncodings: &[]lsproto.PositionEncodingKind{lsproto.PositionEncodingKindUTF8},
	}
	if capabilitiesWithDefaults.TextDocument == nil {
		capabilitiesWithDefaults.TextDocument = &lsproto.TextDocumentClientCapabilities{}
	}
	if capabilitiesWithDefaults.TextDocument.Completion == nil {
		capabilitiesWithDefaults.TextDocument.Completion = defaultCompletionCapabilities
	}
	return &capabilitiesWithDefaults
}

func sendRequest[Params, Resp any](t *testing.T, f *FourslashTest, info lsproto.RequestInfo[Params, Resp], params Params) (*lsproto.Message, Resp, bool) {
	id := f.nextID()
	req := lsproto.NewRequestMessage(
		info.Method,
		lsproto.NewID(lsproto.IntegerOrString{Integer: &id}),
		params,
	)
	f.writeMsg(t, req.Message())
	resp := f.readMsg(t)
	if resp == nil {
		return nil, *new(Resp), false
	}
	result, ok := resp.AsResponse().Result.(Resp)
	return resp, result, ok
}

func sendNotification[Params any](t *testing.T, f *FourslashTest, info lsproto.NotificationInfo[Params], params Params) {
	notification := lsproto.NewNotificationMessage(
		info.Method,
		params,
	)
	f.writeMsg(t, notification.Message())
}

func (f *FourslashTest) writeMsg(t *testing.T, msg *lsproto.Message) {
	assert.NilError(t, json.MarshalWrite(io.Discard, msg), "failed to encode message as JSON")
	if err := f.in.Write(msg); err != nil {
		t.Fatalf("failed to write message: %v", err)
	}
}

func (f *FourslashTest) readMsg(t *testing.T) *lsproto.Message {
	// !!! filter out response by id etc
	msg, err := f.out.Read()
	if err != nil {
		t.Fatalf("failed to read message: %v", err)
	}
	assert.NilError(t, json.MarshalWrite(io.Discard, msg), "failed to encode message as JSON")
	return msg
}

func (f *FourslashTest) GoToMarkerOrRange(t *testing.T, markerOrRange MarkerOrRange) {
	// GoToRangeStart
	f.goToMarker(t, markerOrRange.GetMarker())
}

func (f *FourslashTest) GoToMarker(t *testing.T, markerName string) {
	marker, ok := f.testData.MarkerPositions[markerName]
	if !ok {
		t.Fatalf("Marker '%s' not found", markerName)
	}
	f.goToMarker(t, marker)
}

func (f *FourslashTest) goToMarker(t *testing.T, marker *Marker) {
	f.ensureActiveFile(t, marker.FileName())
	f.goToPosition(t, marker.LSPosition)
	f.lastKnownMarkerName = marker.Name
}

func (f *FourslashTest) GoToEOF(t *testing.T) {
	script := f.getScriptInfo(f.activeFilename)
	pos := len(script.content)
	LSPPos := f.converters.PositionToLineAndCharacter(script, core.TextPos(pos))
	f.goToPosition(t, LSPPos)
}

func (f *FourslashTest) GoToBOF(t *testing.T) {
	f.goToPosition(t, lsproto.Position{Line: 0, Character: 0})
}

func (f *FourslashTest) GoToPosition(t *testing.T, position int) {
	script := f.getScriptInfo(f.activeFilename)
	LSPPos := f.converters.PositionToLineAndCharacter(script, core.TextPos(position))
	f.goToPosition(t, LSPPos)
}

func (f *FourslashTest) goToPosition(t *testing.T, position lsproto.Position) {
	f.currentCaretPosition = position
	f.selectionEnd = nil
}

func (f *FourslashTest) GoToEachMarker(t *testing.T, markerNames []string, action func(marker *Marker, index int)) {
	var markers []*Marker
	if len(markers) == 0 {
		markers = f.Markers()
	} else {
		markers = make([]*Marker, 0, len(markerNames))
		for _, name := range markerNames {
			marker, ok := f.testData.MarkerPositions[name]
			if !ok {
				t.Fatalf("Marker '%s' not found", name)
			}
			markers = append(markers, marker)
		}
	}
	for i, marker := range markers {
		f.goToMarker(t, marker)
		action(marker, i)
	}
}

func (f *FourslashTest) GoToEachRange(t *testing.T, action func(t *testing.T, rangeMarker *RangeMarker)) {
	ranges := f.Ranges()
	for _, rangeMarker := range ranges {
		f.goToPosition(t, rangeMarker.LSRange.Start)
		action(t, rangeMarker)
	}
}

func (f *FourslashTest) GoToRangeStart(t *testing.T, rangeMarker *RangeMarker) {
	f.openFile(t, rangeMarker.FileName())
	f.goToPosition(t, rangeMarker.LSRange.Start)
}

func (f *FourslashTest) GoToSelect(t *testing.T, startMarkerName string, endMarkerName string) {
	startMarker := f.testData.MarkerPositions[startMarkerName]
	if startMarker == nil {
		t.Fatalf("Start marker '%s' not found", startMarkerName)
	}
	endMarker := f.testData.MarkerPositions[endMarkerName]
	if endMarker == nil {
		t.Fatalf("End marker '%s' not found", endMarkerName)
	}
	if startMarker.FileName() != endMarker.FileName() {
		t.Fatalf("Markers '%s' and '%s' are in different files", startMarkerName, endMarkerName)
	}
	f.ensureActiveFile(t, startMarker.FileName())
	f.goToPosition(t, startMarker.LSPosition)
	f.selectionEnd = &endMarker.LSPosition
}

func (f *FourslashTest) GoToSelectRange(t *testing.T, rangeMarker *RangeMarker) {
	f.GoToRangeStart(t, rangeMarker)
	f.selectionEnd = &rangeMarker.LSRange.End
}

func (f *FourslashTest) GoToFile(t *testing.T, filename string) {
	filename = tspath.GetNormalizedAbsolutePath(filename, rootDir)
	f.openFile(t, filename)
}

func (f *FourslashTest) GoToFileNumber(t *testing.T, index int) {
	if index < 0 || index >= len(f.testData.Files) {
		t.Fatalf("File index %d out of range (0-%d)", index, len(f.testData.Files)-1)
	}
	filename := f.testData.Files[index].fileName
	f.openFile(t, filename)
}

func (f *FourslashTest) Markers() []*Marker {
	return f.testData.Markers
}

func (f *FourslashTest) MarkerNames() []string {
	return core.MapFiltered(f.testData.Markers, func(marker *Marker) (string, bool) {
		if marker.Name == nil {
			return "", false
		}
		return *marker.Name, true
	})
}

func (f *FourslashTest) Ranges() []*RangeMarker {
	return f.testData.Ranges
}

func (f *FourslashTest) ensureActiveFile(t *testing.T, filename string) {
	if f.activeFilename != filename {
		f.openFile(t, filename)
	}
}

func (f *FourslashTest) openFile(t *testing.T, filename string) {
	script := f.getScriptInfo(filename)
	if script == nil {
		t.Fatalf("File %s not found in test data", filename)
	}
	f.activeFilename = filename
	sendNotification(t, f, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri:        ls.FileNameToDocumentURI(filename),
			LanguageId: getLanguageKind(filename),
			Text:       script.content,
		},
	})
}

func getLanguageKind(filename string) lsproto.LanguageKind {
	if tspath.FileExtensionIsOneOf(
		filename,
		[]string{
			tspath.ExtensionTs, tspath.ExtensionMts, tspath.ExtensionCts,
			tspath.ExtensionDmts, tspath.ExtensionDcts, tspath.ExtensionDts,
		}) {
		return lsproto.LanguageKindTypeScript
	}
	if tspath.FileExtensionIsOneOf(filename, []string{tspath.ExtensionJs, tspath.ExtensionMjs, tspath.ExtensionCjs}) {
		return lsproto.LanguageKindJavaScript
	}
	if tspath.FileExtensionIs(filename, tspath.ExtensionJsx) {
		return lsproto.LanguageKindJavaScriptReact
	}
	if tspath.FileExtensionIs(filename, tspath.ExtensionTsx) {
		return lsproto.LanguageKindTypeScriptReact
	}
	if tspath.FileExtensionIs(filename, tspath.ExtensionJson) {
		return lsproto.LanguageKindJSON
	}
	return lsproto.LanguageKindTypeScript // !!! should we error in this case?
}

type CompletionsExpectedList struct {
	IsIncomplete    bool
	ItemDefaults    *CompletionsExpectedItemDefaults
	Items           *CompletionsExpectedItems
	UserPreferences *ls.UserPreferences // !!! allow user preferences in fourslash
}

type Ignored = struct{}

// *EditRange | Ignored
type ExpectedCompletionEditRange = any

type EditRange struct {
	Insert  *RangeMarker
	Replace *RangeMarker
}

type CompletionsExpectedItemDefaults struct {
	CommitCharacters *[]string
	EditRange        ExpectedCompletionEditRange
}

// *lsproto.CompletionItem | string
type CompletionsExpectedItem = any

type CompletionsExpectedItems struct {
	Includes []CompletionsExpectedItem
	Excludes []string
	Exact    []CompletionsExpectedItem
	Unsorted []CompletionsExpectedItem
}

// string | *Marker | []string | []*Marker
type MarkerInput = any

// !!! user preferences param
// !!! completion context param
func (f *FourslashTest) VerifyCompletions(t *testing.T, markerInput MarkerInput, expected *CompletionsExpectedList) {
	switch marker := markerInput.(type) {
	case string:
		f.GoToMarker(t, marker)
		f.verifyCompletionsWorker(t, expected)
	case *Marker:
		f.goToMarker(t, marker)
		f.verifyCompletionsWorker(t, expected)
	case []string:
		for _, markerName := range marker {
			f.GoToMarker(t, markerName)
			f.verifyCompletionsWorker(t, expected)
		}
	case []*Marker:
		for _, marker := range marker {
			f.goToMarker(t, marker)
			f.verifyCompletionsWorker(t, expected)
		}
	case nil:
		f.verifyCompletionsWorker(t, expected)
	default:
		t.Fatalf("Invalid marker input type: %T. Expected string, *Marker, []string, or []*Marker.", markerInput)
	}
}

func (f *FourslashTest) verifyCompletionsWorker(t *testing.T, expected *CompletionsExpectedList) {
	prefix := f.getCurrentPositionPrefix()
	params := &lsproto.CompletionParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: ls.FileNameToDocumentURI(f.activeFilename),
		},
		Position: f.currentCaretPosition,
		Context:  &lsproto.CompletionContext{},
	}
	resMsg, result, resultOk := sendRequest(t, f, lsproto.TextDocumentCompletionInfo, params)
	if resMsg == nil {
		t.Fatalf(prefix+"Nil response received for completion request", f.lastKnownMarkerName)
	}
	if !resultOk {
		t.Fatalf(prefix+"Unexpected response type for completion request: %T", resMsg.AsResponse().Result)
	}
	f.verifyCompletionsResult(t, result.List, expected, prefix)
}

func (f *FourslashTest) verifyCompletionsResult(
	t *testing.T,
	actual *lsproto.CompletionList,
	expected *CompletionsExpectedList,
	prefix string,
) {
	if actual == nil {
		if !isEmptyExpectedList(expected) {
			t.Fatal(prefix + "Expected completion list but got nil.")
		}
		return
	} else if expected == nil {
		// !!! cmp.Diff(actual, nil) should probably be a .String() call here and elswhere
		t.Fatalf(prefix+"Expected nil completion list but got non-nil: %s", cmp.Diff(actual, nil))
	}
	assert.Equal(t, actual.IsIncomplete, expected.IsIncomplete, prefix+"IsIncomplete mismatch")
	verifyCompletionsItemDefaults(t, actual.ItemDefaults, expected.ItemDefaults, prefix+"ItemDefaults mismatch: ")
	f.verifyCompletionsItems(t, prefix, actual.Items, expected.Items)
}

func isEmptyExpectedList(expected *CompletionsExpectedList) bool {
	return expected == nil || (len(expected.Items.Exact) == 0 && len(expected.Items.Includes) == 0 && len(expected.Items.Excludes) == 0)
}

func verifyCompletionsItemDefaults(t *testing.T, actual *lsproto.CompletionItemDefaults, expected *CompletionsExpectedItemDefaults, prefix string) {
	if actual == nil {
		if expected == nil {
			return
		}
		t.Fatalf(prefix+"Expected non-nil completion item defaults but got nil: %s", cmp.Diff(actual, nil))
	}
	if expected == nil {
		t.Fatalf(prefix+"Expected nil completion item defaults but got non-nil: %s", cmp.Diff(actual, nil))
	}
	assertDeepEqual(t, actual.CommitCharacters, expected.CommitCharacters, prefix+"CommitCharacters mismatch:")
	switch editRange := expected.EditRange.(type) {
	case *EditRange:
		if actual.EditRange == nil {
			t.Fatal(prefix + "Expected non-nil EditRange but got nil")
		}
		expectedInsert := editRange.Insert.LSRange
		expectedReplace := editRange.Replace.LSRange
		assertDeepEqual(
			t,
			actual.EditRange,
			&lsproto.RangeOrEditRangeWithInsertReplace{
				EditRangeWithInsertReplace: &lsproto.EditRangeWithInsertReplace{
					Insert:  expectedInsert,
					Replace: expectedReplace,
				},
			},
			prefix+"EditRange mismatch:")
	case nil:
		if actual.EditRange != nil {
			t.Fatalf(prefix+"Expected nil EditRange but got non-nil: %s", cmp.Diff(actual.EditRange, nil))
		}
	case Ignored:
	default:
		t.Fatalf(prefix+"Expected EditRange to be *EditRange or Ignored, got %T", editRange)
	}
}

func (f *FourslashTest) verifyCompletionsItems(t *testing.T, prefix string, actual []*lsproto.CompletionItem, expected *CompletionsExpectedItems) {
	if expected.Exact != nil {
		if expected.Includes != nil {
			t.Fatal(prefix + "Expected exact completion list but also specified 'includes'.")
		}
		if expected.Excludes != nil {
			t.Fatal(prefix + "Expected exact completion list but also specified 'excludes'.")
		}
		if expected.Unsorted != nil {
			t.Fatal(prefix + "Expected exact completion list but also specified 'unsorted'.")
		}
		if len(actual) != len(expected.Exact) {
			t.Fatalf(prefix+"Expected %d exact completion items but got %d: %s", len(expected.Exact), len(actual), cmp.Diff(actual, expected.Exact))
		}
		if len(actual) > 0 {
			f.verifyCompletionsAreExactly(t, prefix, actual, expected.Exact)
		}
		return
	}
	nameToActualItem := make(map[string]*lsproto.CompletionItem)
	for _, item := range actual {
		nameToActualItem[item.Label] = item
	}
	if expected.Unsorted != nil {
		if expected.Includes != nil {
			t.Fatal(prefix + "Expected unsorted completion list but also specified 'includes'.")
		}
		if expected.Excludes != nil {
			t.Fatal(prefix + "Expected unsorted completion list but also specified 'excludes'.")
		}
		for _, item := range expected.Unsorted {
			switch item := item.(type) {
			case string:
				_, ok := nameToActualItem[item]
				if !ok {
					t.Fatalf("%sLabel '%s' not found in actual items. Actual items: %s", prefix, item, cmp.Diff(actual, nil))
				}
				delete(nameToActualItem, item)
			case *lsproto.CompletionItem:
				actualItem, ok := nameToActualItem[item.Label]
				if !ok {
					t.Fatalf("%sLabel '%s' not found in actual items. Actual items: %s", prefix, item.Label, cmp.Diff(actual, nil))
				}
				delete(nameToActualItem, item.Label)
				f.verifyCompletionItem(t, prefix+"Includes completion item mismatch for label "+item.Label+": ", actualItem, item)
			default:
				t.Fatalf("%sExpected completion item to be a string or *lsproto.CompletionItem, got %T", prefix, item)
			}
		}
		if len(expected.Unsorted) != len(actual) {
			unmatched := slices.Collect(maps.Keys(nameToActualItem))
			t.Fatalf("%sAdditional completions found but not included in 'unsorted': %s", prefix, strings.Join(unmatched, "\n"))
		}
		return
	}
	if expected.Includes != nil {
		for _, item := range expected.Includes {
			switch item := item.(type) {
			case string:
				_, ok := nameToActualItem[item]
				if !ok {
					t.Fatalf("%sLabel '%s' not found in actual items. Actual items: %s", prefix, item, cmp.Diff(actual, nil))
				}
			case *lsproto.CompletionItem:
				actualItem, ok := nameToActualItem[item.Label]
				if !ok {
					t.Fatalf("%sLabel '%s' not found in actual items. Actual items: %s", prefix, item.Label, cmp.Diff(actual, nil))
				}
				f.verifyCompletionItem(t, prefix+"Includes completion item mismatch for label "+item.Label+": ", actualItem, item)
			default:
				t.Fatalf("%sExpected completion item to be a string or *lsproto.CompletionItem, got %T", prefix, item)
			}
		}
	}
	for _, exclude := range expected.Excludes {
		if _, ok := nameToActualItem[exclude]; ok {
			t.Fatalf("%sLabel '%s' should not be in actual items but was found. Actual items: %s", prefix, exclude, cmp.Diff(actual, nil))
		}
	}
}

func (f *FourslashTest) verifyCompletionsAreExactly(t *testing.T, prefix string, actual []*lsproto.CompletionItem, expected []CompletionsExpectedItem) {
	// Verify labels first
	assertDeepEqual(t, core.Map(actual, func(item *lsproto.CompletionItem) string {
		return item.Label
	}), core.Map(expected, func(item CompletionsExpectedItem) string {
		return getExpectedLabel(t, item)
	}), prefix+"Labels mismatch")
	for i, actualItem := range actual {
		switch expectedItem := expected[i].(type) {
		case string:
			continue // already checked labels
		case *lsproto.CompletionItem:
			f.verifyCompletionItem(t, prefix+"Completion item mismatch for label "+actualItem.Label, actualItem, expectedItem)
		}
	}
}

var completionIgnoreOpts = cmp.FilterPath(
	func(p cmp.Path) bool {
		switch p.Last().String() {
		case ".Kind", ".SortText", ".Data":
			return true
		default:
			return false
		}
	},
	cmp.Ignore(),
)

func (f *FourslashTest) verifyCompletionItem(t *testing.T, prefix string, actual *lsproto.CompletionItem, expected *lsproto.CompletionItem) {
	if expected.Detail != nil || expected.Documentation != nil {
		resMsg, result, resultOk := sendRequest(t, f, lsproto.CompletionItemResolveInfo, actual)
		if resMsg == nil {
			t.Fatal(prefix + "Expected non-nil response for completion item resolve, got nil")
		}
		if !resultOk {
			t.Fatalf(prefix+"Unexpected response type for completion item resolve: %T", resMsg.AsResponse().Result)
		}
		actual = result
	}
	assertDeepEqual(t, actual, expected, prefix, completionIgnoreOpts)
	if expected.Kind != nil {
		assertDeepEqual(t, actual.Kind, expected.Kind, prefix+" Kind mismatch")
	}
	assertDeepEqual(t, actual.SortText, core.OrElse(expected.SortText, ptrTo(string(ls.SortTextLocationPriority))), prefix+" SortText mismatch")
}

func getExpectedLabel(t *testing.T, item CompletionsExpectedItem) string {
	switch item := item.(type) {
	case string:
		return item
	case *lsproto.CompletionItem:
		return item.Label
	default:
		t.Fatalf("Expected completion item to be a string or *lsproto.CompletionItem, got %T", item)
		return ""
	}
}

func assertDeepEqual(t *testing.T, actual any, expected any, prefix string, opts ...cmp.Option) {
	t.Helper()

	diff := cmp.Diff(actual, expected, opts...)
	if diff != "" {
		t.Fatalf("%s:\n%s", prefix, diff)
	}
}

func (f *FourslashTest) VerifyBaselineFindAllReferences(
	t *testing.T,
	markers ...string,
) {
	referenceLocations := f.lookupMarkersOrGetRanges(t, markers)

	if f.baseline != nil {
		t.Fatalf("Error during test '%s': Another baseline is already in progress", t.Name())
	} else {
		f.baseline = &baselineFromTest{
			content:      &strings.Builder{},
			baselineName: "findAllRef/" + strings.TrimPrefix(t.Name(), "Test"),
			ext:          ".baseline.jsonc",
		}
	}

	// empty baseline after test completes
	defer func() {
		f.baseline = nil
	}()

	for _, markerOrRange := range referenceLocations {
		// worker in `baselineEachMarkerOrRange`
		f.GoToMarkerOrRange(t, markerOrRange)

		params := &lsproto.ReferenceParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: ls.FileNameToDocumentURI(f.activeFilename),
			},
			Position: f.currentCaretPosition,
			Context:  &lsproto.ReferenceContext{},
		}
		resMsg, result, resultOk := sendRequest(t, f, lsproto.TextDocumentReferencesInfo, params)
		if resMsg == nil {
			if f.lastKnownMarkerName == nil {
				t.Fatalf("Nil response received for references request at pos %v", f.currentCaretPosition)
			} else {
				t.Fatalf("Nil response received for references request at marker '%s'", *f.lastKnownMarkerName)
			}
		}
		if !resultOk {
			if f.lastKnownMarkerName == nil {
				t.Fatalf("Unexpected references response type at pos %v: %T", f.currentCaretPosition, resMsg.AsResponse().Result)
			} else {
				t.Fatalf("Unexpected references response type at marker '%s': %T", *f.lastKnownMarkerName, resMsg.AsResponse().Result)
			}
		}

		f.baseline.addResult("findAllReferences", f.getBaselineForLocationsWithFileContents(*result.Locations, baselineFourslashLocationsOptions{
			marker:     markerOrRange.GetMarker(),
			markerName: "/*FIND ALL REFS*/",
		}))

	}

	baseline.Run(t, f.baseline.getBaselineFileName(), f.baseline.content.String(), baseline.Options{})
}

func (f *FourslashTest) VerifyBaselineGoToDefinition(
	t *testing.T,
	markers ...string,
) {
	referenceLocations := f.lookupMarkersOrGetRanges(t, markers)

	if f.baseline != nil {
		t.Fatalf("Error during test '%s': Another baseline is already in progress", t.Name())
	} else {
		f.baseline = &baselineFromTest{
			content:      &strings.Builder{},
			baselineName: "goToDef/" + strings.TrimPrefix(t.Name(), "Test"),
			ext:          ".baseline.jsonc",
		}
	}

	// empty baseline after test completes
	defer func() {
		f.baseline = nil
	}()

	for _, markerOrRange := range referenceLocations {
		// worker in `baselineEachMarkerOrRange`
		f.GoToMarkerOrRange(t, markerOrRange)

		params := &lsproto.DefinitionParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: ls.FileNameToDocumentURI(f.activeFilename),
			},
			Position: f.currentCaretPosition,
		}

		resMsg, result, resultOk := sendRequest(t, f, lsproto.TextDocumentDefinitionInfo, params)
		if resMsg == nil {
			if f.lastKnownMarkerName == nil {
				t.Fatalf("Nil response received for definition request at pos %v", f.currentCaretPosition)
			} else {
				t.Fatalf("Nil response received for definition request at marker '%s'", *f.lastKnownMarkerName)
			}
		}
		if !resultOk {
			if f.lastKnownMarkerName == nil {
				t.Fatalf("Unexpected definition response type at pos %v: %T", f.currentCaretPosition, resMsg.AsResponse().Result)
			} else {
				t.Fatalf("Unexpected definition response type at marker '%s': %T", *f.lastKnownMarkerName, resMsg.AsResponse().Result)
			}
		}

		var resultAsLocations []lsproto.Location
		if result.Locations != nil {
			resultAsLocations = *result.Locations
		} else if result.Location != nil {
			resultAsLocations = []lsproto.Location{*result.Location}
		} else if result.DefinitionLinks != nil {
			t.Fatalf("Unexpected definition response type at marker '%s': %T", *f.lastKnownMarkerName, result.DefinitionLinks)
		}

		f.baseline.addResult("goToDefinition", f.getBaselineForLocationsWithFileContents(resultAsLocations, baselineFourslashLocationsOptions{
			marker:     markerOrRange.GetMarker(),
			markerName: "/*GO TO DEFINITION*/",
		}))
	}

	baseline.Run(t, f.baseline.getBaselineFileName(), f.baseline.content.String(), baseline.Options{})
}

func (f *FourslashTest) VerifyBaselineHover(t *testing.T) {
	if f.baseline != nil {
		t.Fatalf("Error during test '%s': Another baseline is already in progress", t.Name())
	} else {
		f.baseline = &baselineFromTest{
			content:      &strings.Builder{},
			baselineName: "hover/" + strings.TrimPrefix(t.Name(), "Test"),
			ext:          ".baseline",
		}
	}

	// empty baseline after test completes
	defer func() {
		f.baseline = nil
	}()

	markersAndItems := core.MapFiltered(f.Markers(), func(marker *Marker) (markerAndItem[*lsproto.Hover], bool) {
		if marker.Name == nil {
			return markerAndItem[*lsproto.Hover]{}, false
		}

		params := &lsproto.HoverParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: ls.FileNameToDocumentURI(f.activeFilename),
			},
			Position: marker.LSPosition,
		}

		resMsg, result, resultOk := sendRequest(t, f, lsproto.TextDocumentHoverInfo, params)
		if resMsg == nil {
			t.Fatalf(f.getCurrentPositionPrefix()+"Nil response received for quick info request", f.lastKnownMarkerName)
		}
		if !resultOk {
			t.Fatalf(f.getCurrentPositionPrefix()+"Unexpected response type for quick info request: %T", resMsg.AsResponse().Result)
		}

		return markerAndItem[*lsproto.Hover]{Marker: marker, Item: result.Hover}, true
	})

	getRange := func(item *lsproto.Hover) *lsproto.Range {
		if item == nil || item.Range == nil {
			return nil
		}
		return item.Range
	}

	getTooltipLines := func(item, _prev *lsproto.Hover) []string {
		var result []string

		if item.Contents.MarkupContent != nil {
			result = strings.Split(item.Contents.MarkupContent.Value, "\n")
		}
		if item.Contents.String != nil {
			result = strings.Split(*item.Contents.String, "\n")
		}
		if item.Contents.MarkedStringWithLanguage != nil {
			result = appendLinesForMarkedStringWithLanguage(result, item.Contents.MarkedStringWithLanguage)
		}
		if item.Contents.MarkedStrings != nil {
			for _, ms := range *item.Contents.MarkedStrings {
				if ms.MarkedStringWithLanguage != nil {
					result = appendLinesForMarkedStringWithLanguage(result, ms.MarkedStringWithLanguage)
				} else {
					result = append(result, *ms.String)
				}
			}
		}

		return result
	}

	f.baseline.addResult("QuickInfo", annotateContentWithTooltips(t, f, markersAndItems, "quickinfo", getRange, getTooltipLines))
	if jsonStr, err := core.StringifyJson(markersAndItems, "", "  "); err == nil {
		f.baseline.content.WriteString(jsonStr)
	} else {
		t.Fatalf("Failed to stringify markers and items for baseline: %v", err)
	}
	baseline.Run(t, f.baseline.getBaselineFileName(), f.baseline.content.String(), baseline.Options{})
}

func appendLinesForMarkedStringWithLanguage(result []string, ms *lsproto.MarkedStringWithLanguage) []string {
	result = append(result, "```"+ms.Language)
	result = append(result, ms.Value)
	result = append(result, "```")
	return result
}

func (f *FourslashTest) VerifyBaselineSignatureHelp(t *testing.T) {
	if f.baseline != nil {
		t.Fatalf("Error during test '%s': Another baseline is already in progress", t.Name())
	} else {
		f.baseline = &baselineFromTest{
			content:      &strings.Builder{},
			baselineName: "signatureHelp/" + strings.TrimPrefix(t.Name(), "Test"),
			ext:          ".baseline",
		}
	}

	// empty baseline after test completes
	defer func() {
		f.baseline = nil
	}()

	markersAndItems := core.MapFiltered(f.Markers(), func(marker *Marker) (markerAndItem[*lsproto.SignatureHelp], bool) {
		if marker.Name == nil {
			return markerAndItem[*lsproto.SignatureHelp]{}, false
		}

		params := &lsproto.SignatureHelpParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: ls.FileNameToDocumentURI(f.activeFilename),
			},
			Position: marker.LSPosition,
		}

		resMsg, result, resultOk := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)
		if resMsg == nil {
			t.Fatalf(f.getCurrentPositionPrefix()+"Nil response received for signature help request", f.lastKnownMarkerName)
		}
		if !resultOk {
			t.Fatalf(f.getCurrentPositionPrefix()+"Unexpected response type for signature help request: %T", resMsg.AsResponse().Result)
		}

		return markerAndItem[*lsproto.SignatureHelp]{Marker: marker, Item: result.SignatureHelp}, true
	})

	getRange := func(item *lsproto.SignatureHelp) *lsproto.Range {
		// SignatureHelp doesn't have a range like hover does
		return nil
	}

	getTooltipLines := func(item, _prev *lsproto.SignatureHelp) []string {
		if item == nil || len(item.Signatures) == 0 {
			return []string{"No signature help available"}
		}

		// Show active signature if specified, otherwise first signature
		activeSignature := 0
		if item.ActiveSignature != nil && int(*item.ActiveSignature) < len(item.Signatures) {
			activeSignature = int(*item.ActiveSignature)
		}

		sig := item.Signatures[activeSignature]

		// Build signature display
		signatureLine := sig.Label
		activeParamLine := ""

		// Show active parameter if specified, and the signature text.
		if item.ActiveParameter != nil && sig.Parameters != nil {
			activeParamIndex := int(*item.ActiveParameter.Uinteger)
			if activeParamIndex >= 0 && activeParamIndex < len(*sig.Parameters) {
				activeParam := (*sig.Parameters)[activeParamIndex]

				// Get the parameter label and bold the
				// parameter text within the original string.
				activeParamLabel := ""
				if activeParam.Label.String != nil {
					activeParamLabel = *activeParam.Label.String
				} else if activeParam.Label.Tuple != nil {
					activeParamLabel = signatureLine[(*activeParam.Label.Tuple)[0]:(*activeParam.Label.Tuple)[1]]
				} else {
					t.Fatal("Unsupported param label kind.")
				}
				signatureLine = strings.Replace(signatureLine, activeParamLabel, "**"+activeParamLabel+"**", 1)

				if activeParam.Documentation != nil {
					if activeParam.Documentation.MarkupContent != nil {
						activeParamLine = activeParam.Documentation.MarkupContent.Value
					} else if activeParam.Documentation.String != nil {
						activeParamLine = *activeParam.Documentation.String
					}

					activeParamLine = fmt.Sprintf("- `%s`: %s", activeParamLabel, activeParamLine)
				}

			}
		}

		result := make([]string, 0, 16)
		result = append(result, signatureLine)
		if activeParamLine != "" {
			result = append(result, activeParamLine)
		}

		// ORIGINALLY we would "only display signature documentation on the last argument when multiple arguments are marked".
		// !!!
		// Note that this is harder than in Strada, because LSP signature help has no concept of
		// applicable spans.
		if sig.Documentation != nil {
			if sig.Documentation.MarkupContent != nil {
				result = append(result, strings.Split(sig.Documentation.MarkupContent.Value, "\n")...)
			} else if sig.Documentation.String != nil {
				result = append(result, strings.Split(*sig.Documentation.String, "\n")...)
			} else {
				t.Fatal("Unsupported documentation format.")
			}
		}

		return result
	}

	f.baseline.addResult("SignatureHelp", annotateContentWithTooltips(t, f, markersAndItems, "signaturehelp", getRange, getTooltipLines))
	if jsonStr, err := core.StringifyJson(markersAndItems, "", "  "); err == nil {
		f.baseline.content.WriteString(jsonStr)
	} else {
		t.Fatalf("Failed to stringify markers and items for baseline: %v", err)
	}
	baseline.Run(t, f.baseline.getBaselineFileName(), f.baseline.content.String(), baseline.Options{})
}

// Collects all named markers if provided, or defaults to anonymous ranges
func (f *FourslashTest) lookupMarkersOrGetRanges(t *testing.T, markers []string) []MarkerOrRange {
	var referenceLocations []MarkerOrRange
	if len(markers) == 0 {
		referenceLocations = core.Map(f.testData.Ranges, func(r *RangeMarker) MarkerOrRange { return r })
	} else {
		referenceLocations = core.Map(markers, func(markerName string) MarkerOrRange {
			marker, ok := f.testData.MarkerPositions[markerName]
			if !ok {
				t.Fatalf("Marker '%s' not found", markerName)
			}
			return marker
		})
	}
	return referenceLocations
}

func ptrTo[T any](v T) *T {
	return &v
}

// Insert text at the current caret position.
func (f *FourslashTest) Insert(t *testing.T, text string) {
	f.typeText(t, text)
}

// Insert text and a new line at the current caret position.
func (f *FourslashTest) InsertLine(t *testing.T, text string) {
	f.typeText(t, text+"\n")
}

// Removes the text at the current caret position as if the user pressed backspace `count` times.
func (f *FourslashTest) Backspace(t *testing.T, count int) {
	script := f.getScriptInfo(f.activeFilename)
	offset := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))

	for range count {
		offset--
		f.editScriptAndUpdateMarkers(t, f.activeFilename, offset, offset+1, "")
		f.currentCaretPosition = f.converters.PositionToLineAndCharacter(script, core.TextPos(offset))
		// Don't need to examine formatting because there are no formatting changes on backspace.
	}

	// f.checkPostEditInvariants() // !!! do we need this?
}

// Enters text as if the user had pasted it.
func (f *FourslashTest) Paste(t *testing.T, text string) {
	script := f.getScriptInfo(f.activeFilename)
	start := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))
	f.editScriptAndUpdateMarkers(t, f.activeFilename, start, start, text)
	// this.checkPostEditInvariants(); // !!! do we need this?
}

// Selects a line and replaces it with a new text.
func (f *FourslashTest) ReplaceLine(t *testing.T, lineIndex int, text string) {
	f.selectLine(t, lineIndex)
	f.typeText(t, text)
}

func (f *FourslashTest) selectLine(t *testing.T, lineIndex int) {
	script := f.getScriptInfo(f.activeFilename)
	start := script.lineMap.LineStarts[lineIndex]
	end := script.lineMap.LineStarts[lineIndex+1] - 1
	f.selectRange(t, core.NewTextRange(int(start), int(end)))
}

func (f *FourslashTest) selectRange(t *testing.T, textRange core.TextRange) {
	script := f.getScriptInfo(f.activeFilename)
	start := f.converters.PositionToLineAndCharacter(script, core.TextPos(textRange.Pos()))
	end := f.converters.PositionToLineAndCharacter(script, core.TextPos(textRange.End()))
	f.goToPosition(t, start)
	f.selectionEnd = &end
}

func (f *FourslashTest) getSelection() core.TextRange {
	script := f.getScriptInfo(f.activeFilename)
	if f.selectionEnd == nil {
		return core.NewTextRange(
			int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition)),
			int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition)),
		)
	}
	return core.NewTextRange(
		int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition)),
		int(f.converters.LineAndCharacterToPosition(script, *f.selectionEnd)),
	)
}

func (f *FourslashTest) Replace(t *testing.T, start int, length int, text string) {
	f.editScriptAndUpdateMarkers(t, f.activeFilename, start, start+length, text)
	// f.checkPostEditInvariants() // !!! do we need this?
}

// Inserts the text currently at the caret position character by character, as if the user typed it.
func (f *FourslashTest) typeText(t *testing.T, text string) {
	script := f.getScriptInfo(f.activeFilename)
	offset := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))
	selection := f.getSelection()
	f.Replace(t, selection.Pos(), selection.End()-selection.Pos(), "")

	totalSize := 0

	for totalSize < len(text) {
		r, size := utf8.DecodeRuneInString(text[totalSize:])
		f.editScriptAndUpdateMarkers(t, f.activeFilename, totalSize+offset, totalSize+offset, string(r))

		totalSize += size
		f.currentCaretPosition = f.converters.PositionToLineAndCharacter(script, core.TextPos(totalSize+offset))

		// !!! formatting
		// Handle post-keystroke formatting
		// if this.enableFormatting {
		// 	const edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, offset, ch, this.formatCodeSettings)
		// 	if edits.length {
		// 		offset += this.applyEdits(this.activeFile.fileName, edits)
		// 	}
		// }

	}

	// f.checkPostEditInvariants() // !!! do we need this?
}

// Edits the script and updates marker and range positions accordingly.
// This does not update the current caret position.
func (f *FourslashTest) editScriptAndUpdateMarkers(t *testing.T, fileName string, editStart int, editEnd int, newText string) {
	script := f.editScript(t, fileName, editStart, editEnd, newText)
	for _, marker := range f.testData.Markers {
		if marker.FileName() == fileName {
			marker.Position = updatePosition(marker.Position, editStart, editEnd, newText)
			marker.LSPosition = f.converters.PositionToLineAndCharacter(script, core.TextPos(marker.Position))
		}
	}
	for _, rangeMarker := range f.testData.Ranges {
		if rangeMarker.FileName() == fileName {
			start := updatePosition(rangeMarker.Range.Pos(), editStart, editEnd, newText)
			end := updatePosition(rangeMarker.Range.End(), editStart, editEnd, newText)
			rangeMarker.Range = core.NewTextRange(start, end)
			rangeMarker.LSRange = f.converters.ToLSPRange(script, rangeMarker.Range)
		}
	}
	// !!! clean up ranges by text
}

func updatePosition(pos int, editStart int, editEnd int, newText string) int {
	if pos <= editStart {
		return pos
	}
	// If inside the edit, return -1 to mark as invalid
	if pos < editEnd {
		return -1
	}
	return pos + len(newText) - (editEnd - editStart)
}

func (f *FourslashTest) editScript(t *testing.T, fileName string, start int, end int, newText string) *scriptInfo {
	script := f.getScriptInfo(fileName)
	changeRange := f.converters.ToLSPRange(script, core.NewTextRange(start, end))
	if script == nil {
		panic(fmt.Sprintf("Script info for file %s not found", fileName))
	}

	script.editContent(start, end, newText)
	err := f.vfs.WriteFile(fileName, script.content, false)
	if err != nil {
		panic(fmt.Sprintf("Failed to write file %s: %v", fileName, err))
	}
	sendNotification(t, f, lsproto.TextDocumentDidChangeInfo, &lsproto.DidChangeTextDocumentParams{
		TextDocument: lsproto.VersionedTextDocumentIdentifier{
			Uri:     ls.FileNameToDocumentURI(fileName),
			Version: script.version,
		},
		ContentChanges: []lsproto.TextDocumentContentChangePartialOrWholeDocument{
			{
				Partial: &lsproto.TextDocumentContentChangePartial{
					Range: changeRange,
					Text:  newText,
				},
			},
		},
	})
	return script
}

func (f *FourslashTest) getScriptInfo(fileName string) *scriptInfo {
	return f.scriptInfos[fileName]
}

// !!! expected tags
func (f *FourslashTest) VerifyQuickInfoAt(t *testing.T, marker string, expectedText string, expectedDocumentation string) {
	f.GoToMarker(t, marker)
	hover := f.getQuickInfoAtCurrentPosition(t)
	f.verifyHoverContent(t, hover.Contents, expectedText, expectedDocumentation, f.getCurrentPositionPrefix())
}

func (f *FourslashTest) getQuickInfoAtCurrentPosition(t *testing.T) *lsproto.Hover {
	params := &lsproto.HoverParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: ls.FileNameToDocumentURI(f.activeFilename),
		},
		Position: f.currentCaretPosition,
	}
	resMsg, result, resultOk := sendRequest(t, f, lsproto.TextDocumentHoverInfo, params)
	if resMsg == nil {
		t.Fatalf("Nil response received for hover request at marker '%s'", *f.lastKnownMarkerName)
	}
	if !resultOk {
		t.Fatalf("Unexpected hover response type at marker '%s': %T", *f.lastKnownMarkerName, resMsg.AsResponse().Result)
	}
	if result.Hover == nil {
		t.Fatalf("Expected hover result at marker '%s' but got nil", *f.lastKnownMarkerName)
	}
	return result.Hover
}

func (f *FourslashTest) verifyHoverContent(
	t *testing.T,
	actual lsproto.MarkupContentOrStringOrMarkedStringWithLanguageOrMarkedStrings,
	expectedText string,
	expectedDocumentation string,
	prefix string,
) {
	switch {
	case actual.MarkupContent != nil:
		f.verifyHoverMarkdown(t, actual.MarkupContent.Value, expectedText, expectedDocumentation, prefix)
	default:
		t.Fatalf(prefix+"Expected markup content, got: %s", cmp.Diff(actual, nil))
	}
}

func (f *FourslashTest) verifyHoverMarkdown(
	t *testing.T,
	actual string,
	expectedText string,
	expectedDocumentation string,
	prefix string,
) {
	expected := fmt.Sprintf("```tsx\n%s\n```\n%s", expectedText, expectedDocumentation)
	assertDeepEqual(t, actual, expected, prefix+"Hover markdown content mismatch")
}

func (f *FourslashTest) VerifyQuickInfoExists(t *testing.T) {
	if isEmpty, _ := f.quickInfoIsEmpty(t); isEmpty {
		t.Fatalf("Expected non-nil hover content at marker '%s'", *f.lastKnownMarkerName)
	}
}

func (f *FourslashTest) VerifyNotQuickInfoExists(t *testing.T) {
	if isEmpty, hover := f.quickInfoIsEmpty(t); !isEmpty {
		t.Fatalf("Expected empty hover content at marker '%s', got '%s'", *f.lastKnownMarkerName, cmp.Diff(hover, nil))
	}
}

func (f *FourslashTest) quickInfoIsEmpty(t *testing.T) (bool, *lsproto.Hover) {
	hover := f.getQuickInfoAtCurrentPosition(t)
	if hover == nil ||
		(hover.Contents.MarkupContent == nil && hover.Contents.MarkedStrings == nil && hover.Contents.String == nil) {
		return true, nil
	}
	return false, hover
}

func (f *FourslashTest) VerifyQuickInfoIs(t *testing.T, expectedText string, expectedDocumentation string) {
	hover := f.getQuickInfoAtCurrentPosition(t)
	f.verifyHoverContent(t, hover.Contents, expectedText, expectedDocumentation, f.getCurrentPositionPrefix())
}

type SignatureHelpCase struct {
	Context     *lsproto.SignatureHelpContext
	MarkerInput MarkerInput
	Expected    *lsproto.SignatureHelp
}

func (f *FourslashTest) VerifySignatureHelp(t *testing.T, signatureHelpCases ...*SignatureHelpCase) {
	for _, option := range signatureHelpCases {
		switch marker := option.MarkerInput.(type) {
		case string:
			f.GoToMarker(t, marker)
			f.verifySignatureHelp(t, option.Context, option.Expected)
		case *Marker:
			f.goToMarker(t, marker)
			f.verifySignatureHelp(t, option.Context, option.Expected)
		case []string:
			for _, markerName := range marker {
				f.GoToMarker(t, markerName)
				f.verifySignatureHelp(t, option.Context, option.Expected)
			}
		case []*Marker:
			for _, marker := range marker {
				f.goToMarker(t, marker)
				f.verifySignatureHelp(t, option.Context, option.Expected)
			}
		case nil:
			f.verifySignatureHelp(t, option.Context, option.Expected)
		default:
			t.Fatalf("Invalid marker input type: %T. Expected string, *Marker, []string, or []*Marker.", option.MarkerInput)
		}
	}
}

func (f *FourslashTest) verifySignatureHelp(
	t *testing.T,
	context *lsproto.SignatureHelpContext,
	expected *lsproto.SignatureHelp,
) {
	prefix := f.getCurrentPositionPrefix()
	params := &lsproto.SignatureHelpParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: ls.FileNameToDocumentURI(f.activeFilename),
		},
		Position: f.currentCaretPosition,
		Context:  context,
	}
	resMsg, result, resultOk := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)
	if resMsg == nil {
		t.Fatalf(prefix+"Nil response received for signature help request", f.lastKnownMarkerName)
	}
	if !resultOk {
		t.Fatalf(prefix+"Unexpected response type for signature help request: %T", resMsg.AsResponse().Result)
	}
	f.verifySignatureHelpResult(t, result.SignatureHelp, expected, prefix)
}

func (f *FourslashTest) verifySignatureHelpResult(
	t *testing.T,
	actual *lsproto.SignatureHelp,
	expected *lsproto.SignatureHelp,
	prefix string,
) {
	assertDeepEqual(t, actual, expected, prefix+" SignatureHelp mismatch")
}

func (f *FourslashTest) getCurrentPositionPrefix() string {
	if f.lastKnownMarkerName != nil {
		return fmt.Sprintf("At marker '%s': ", *f.lastKnownMarkerName)
	}
	return fmt.Sprintf("At position (Ln %d, Col %d): ", f.currentCaretPosition.Line, f.currentCaretPosition.Character)
}

func (f *FourslashTest) BaselineAutoImportsCompletions(t *testing.T, markerNames []string) {
	if f.baseline != nil {
		t.Fatalf("Error during test '%s': Another baseline is already in progress", t.Name())
	} else {
		f.baseline = &baselineFromTest{
			content:      &strings.Builder{},
			baselineName: "autoImport/" + strings.TrimPrefix(t.Name(), "Test"),
			ext:          ".baseline.md",
		}
	}
	for _, markerName := range markerNames {
		f.GoToMarker(t, markerName)
		params := &lsproto.CompletionParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: ls.FileNameToDocumentURI(f.activeFilename),
			},
			Position: f.currentCaretPosition,
			Context:  &lsproto.CompletionContext{},
		}
		resMsg, result, resultOk := sendRequest(t, f, lsproto.TextDocumentCompletionInfo, params)

		prefix := fmt.Sprintf("At marker '%s': ", markerName)
		if resMsg == nil {
			t.Fatalf(prefix+"Nil response received for completion request for autoimports", f.lastKnownMarkerName)
		}
		if !resultOk {
			t.Fatalf(prefix+"Unexpected response type for completion request for autoimports: %T", resMsg.AsResponse().Result)
		}

		f.baseline.content.WriteString("// === Auto Imports === \n")

		fileContent, ok := f.vfs.ReadFile(f.activeFilename)
		if !ok {
			t.Fatalf(prefix+"Failed to read file %s for auto-import baseline", f.activeFilename)
		}

		marker := f.testData.MarkerPositions[markerName]
		ext := strings.TrimPrefix(tspath.GetAnyExtensionFromPath(f.activeFilename, nil, true), ".")
		lang := core.IfElse(ext == "mts" || ext == "cts", "ts", ext)
		f.baseline.content.WriteString(codeFence(
			lang,
			"// @FileName: "+f.activeFilename+"\n"+fileContent[:marker.Position]+"/*"+markerName+"*/"+fileContent[marker.Position:],
		))

		currentFile := newScriptInfo(f.activeFilename, fileContent)
		converters := ls.NewConverters(lsproto.PositionEncodingKindUTF8, func(_ string) *ls.LineMap {
			return currentFile.lineMap
		})
		var list []*lsproto.CompletionItem
		if result.Items == nil || len(*result.Items) == 0 {
			if result.List == nil || result.List.Items == nil || len(result.List.Items) == 0 {
				f.baseline.content.WriteString("no autoimport completions found" + "\n\n")

				continue
			}
			list = result.List.Items
		} else {
			list = *result.Items
		}

		for _, item := range list {
			if item.Data == nil || *item.SortText != string(ls.SortTextAutoImportSuggestions) {
				continue
			}
			resMsg, details, resultOk := sendRequest(t, f, lsproto.CompletionItemResolveInfo, item)
			if resMsg == nil {
				t.Fatalf(prefix+"Nil response received for resolve completion", f.lastKnownMarkerName)
			}
			if !resultOk {
				t.Fatalf(prefix+"Unexpected response type for resolve completion: %T", resMsg.AsResponse().Result)
			}
			if details == nil || details.AdditionalTextEdits == nil || len(*details.AdditionalTextEdits) == 0 {
				t.Fatalf(prefix+"Entry %s from %s returned no code changes from completion details request", item.Label, item.Detail)
			}
			allChanges := *details.AdditionalTextEdits

			// !!! calculate the change provided by the completiontext
			// completionChange:= &lsproto.TextEdit{}
			// if details.TextEdit != nil {
			// 	completionChange = details.TextEdit.TextEdit
			// } else if details.AdditionalTextEdits != nil && len(*details.AdditionalTextEdits) > 0 {
			// 	completionChange = (*details.AdditionalTextEdits)[0]
			// } else {
			// 	completionChange.Range = lsproto.Range{ Start: marker.LSPosition, End: marker.LSPosition }
			// 	if item.InsertText != nil {
			// 		completionChange.NewText = *item.InsertText
			// 	} else {
			// 		completionChange.NewText = item.Label
			// 	}
			// }
			// allChanges := append(allChanges, completionChange)
			// sorted from back-of-file-most to front-of-file-most
			slices.SortFunc(allChanges, func(a, b *lsproto.TextEdit) int { return ls.ComparePositions(b.Range.Start, a.Range.Start) })
			newFileContent := fileContent
			for _, change := range allChanges {
				newFileContent = newFileContent[:converters.LineAndCharacterToPosition(currentFile, change.Range.Start)] + change.NewText + newFileContent[converters.LineAndCharacterToPosition(currentFile, change.Range.End):]
			}
			f.baseline.content.WriteString(codeFence(lang, newFileContent) + "\n\n")
		}
	}
	baseline.Run(t, f.baseline.getBaselineFileName(), f.baseline.content.String(), baseline.Options{})
}
