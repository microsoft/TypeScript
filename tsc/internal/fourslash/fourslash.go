package fourslash

import (
	"fmt"
	"io"
	"strings"
	"testing"
	"unicode"
	"unicode/utf8"

	"github.com/google/go-cmp/cmp"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
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

	scriptInfos map[string]*scriptInfo
	converters  *ls.Converters

	currentCaretPosition lsproto.Position
	lastKnownMarkerName  string
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

var sourceFileCache collections.SyncMap[harnessutil.SourceFileCacheKey, *ast.SourceFile]

type parsedFileCache struct{}

func (c *parsedFileCache) GetFile(opts ast.SourceFileParseOptions, text string, scriptKind core.ScriptKind) *ast.SourceFile {
	key := harnessutil.GetSourceFileCacheKey(opts, text, scriptKind)
	cachedFile, ok := sourceFileCache.Load(key)
	if !ok {
		return nil
	}
	return cachedFile
}

func (c *parsedFileCache) CacheFile(opts ast.SourceFileParseOptions, text string, scriptKind core.ScriptKind, sourceFile *ast.SourceFile) {
	key := harnessutil.GetSourceFileCacheKey(opts, text, scriptKind)
	sourceFileCache.Store(key, sourceFile)
}

var _ project.ParsedFileCache = (*parsedFileCache)(nil)

func NewFourslash(t *testing.T, capabilities *lsproto.ClientCapabilities, content string) *FourslashTest {
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}
	rootDir := "/"
	fileName := getFileNameFromTest(t)
	testfs := make(map[string]string)
	scriptInfos := make(map[string]*scriptInfo)
	testData := ParseTestData(t, content, fileName)
	for _, file := range testData.Files {
		filePath := tspath.GetNormalizedAbsolutePath(file.fileName, rootDir)
		testfs[filePath] = file.Content
		scriptInfos[filePath] = newScriptInfo(filePath, file.Content)
	}

	compilerOptions := &core.CompilerOptions{}
	harnessutil.SetCompilerOptionsFromTestConfig(t, testData.GlobalOptions, compilerOptions)
	compilerOptions.SkipDefaultLibCheck = core.TSTrue

	inputReader, inputWriter := newLSPPipe()
	outputReader, outputWriter := newLSPPipe()
	fs := bundled.WrapFS(vfstest.FromMap(testfs, true /*useCaseSensitiveFileNames*/))

	var err strings.Builder
	server := lsp.NewServer(&lsp.ServerOptions{
		In:  inputReader,
		Out: outputWriter,
		Err: &err,

		Cwd:                "/",
		NewLine:            core.NewLineKindLF,
		FS:                 fs,
		DefaultLibraryPath: bundled.LibPath(),

		ParsedFileCache: &parsedFileCache{},
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
	f.server.SetCompilerOptionsForInferredProjects(compilerOptions)
	f.initialize(t, capabilities)
	f.openFile(t, f.testData.Files[0].fileName)

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
	params := &lsproto.InitializeParams{}
	params.Capabilities = getCapabilitiesWithDefaults(capabilities)
	// !!! check for errors?
	f.sendRequest(t, lsproto.MethodInitialize, params)
	f.sendNotification(t, lsproto.MethodInitialized, &lsproto.InitializedParams{})
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

func (f *FourslashTest) sendRequest(t *testing.T, method lsproto.Method, params any) *lsproto.Message {
	id := f.nextID()
	req := lsproto.NewRequestMessage(
		method,
		lsproto.NewID(lsproto.IntegerOrString{Integer: &id}),
		params,
	)
	f.writeMsg(t, req.Message())
	return f.readMsg(t)
}

func (f *FourslashTest) sendNotification(t *testing.T, method lsproto.Method, params any) {
	notification := lsproto.NewNotificationMessage(
		method,
		params,
	)
	f.writeMsg(t, notification.Message())
}

func (f *FourslashTest) writeMsg(t *testing.T, msg *lsproto.Message) {
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
	return msg
}

func (f *FourslashTest) GoToMarker(t *testing.T, markerName string) {
	marker, ok := f.testData.MarkerPositions[markerName]
	if !ok {
		t.Fatalf("Marker %s not found", markerName)
	}
	f.ensureActiveFile(t, marker.FileName)
	f.goToPosition(t, marker.LSPosition)
	f.lastKnownMarkerName = marker.Name
}

func (f *FourslashTest) GoToEOF(t *testing.T) {
	script := f.getScriptInfo(f.activeFilename)
	pos := len(script.content)
	LSPPos := f.converters.PositionToLineAndCharacter(script, core.TextPos(pos))
	f.goToPosition(t, LSPPos)
}

func (f *FourslashTest) goToPosition(t *testing.T, position lsproto.Position) {
	f.currentCaretPosition = position
	f.selectionEnd = nil
}

func (f *FourslashTest) Markers() []*Marker {
	return f.testData.Markers
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
	f.sendNotification(t, lsproto.MethodTextDocumentDidOpen, &lsproto.DidOpenTextDocumentParams{
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
	IsIncomplete bool
	ItemDefaults *CompletionsExpectedItemDefaults
	Items        *CompletionsExpectedItems
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

// !!! unsorted completions
type CompletionsExpectedItems struct {
	Includes []CompletionsExpectedItem
	Excludes []string
	Exact    []CompletionsExpectedItem
}

// string | *Marker | []string | []*Marker
type MarkerInput = any

// !!! user preferences param
// !!! completion context param
// !!! go to marker: use current marker if none specified/support nil marker input
func (f *FourslashTest) VerifyCompletions(t *testing.T, markerInput MarkerInput, expected *CompletionsExpectedList) {
	switch marker := markerInput.(type) {
	case string:
		f.verifyCompletionsAtMarker(t, marker, expected)
	case *Marker:
		f.verifyCompletionsAtMarker(t, marker.Name, expected)
	case []string:
		for _, markerName := range marker {
			f.verifyCompletionsAtMarker(t, markerName, expected)
		}
	case []*Marker:
		for _, marker := range marker {
			f.verifyCompletionsAtMarker(t, marker.Name, expected)
		}
	case nil:
		f.verifyCompletionsWorker(t, expected)
	default:
		t.Fatalf("Invalid marker input type: %T. Expected string, *Marker, []string, or []*Marker.", markerInput)
	}
}

func (f *FourslashTest) verifyCompletionsAtMarker(t *testing.T, markerName string, expected *CompletionsExpectedList) {
	f.GoToMarker(t, markerName)
	f.verifyCompletionsWorker(t, expected)
}

func (f *FourslashTest) verifyCompletionsWorker(t *testing.T, expected *CompletionsExpectedList) {
	params := &lsproto.CompletionParams{
		TextDocumentPositionParams: lsproto.TextDocumentPositionParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: ls.FileNameToDocumentURI(f.activeFilename),
			},
			Position: f.currentCaretPosition,
		},
		Context: &lsproto.CompletionContext{},
	}
	resMsg := f.sendRequest(t, lsproto.MethodTextDocumentCompletion, params)
	if resMsg == nil {
		t.Fatalf("Nil response received for completion request at marker %s", f.lastKnownMarkerName)
	}
	result := resMsg.AsResponse().Result
	switch result := result.(type) {
	case *lsproto.CompletionList:
		verifyCompletionsResult(t, f.lastKnownMarkerName, result, expected)
	default:
		t.Fatalf("Unexpected response type for completion request at marker %s: %v", f.lastKnownMarkerName, result)
	}
}

func verifyCompletionsResult(t *testing.T, markerName string, actual *lsproto.CompletionList, expected *CompletionsExpectedList) {
	prefix := fmt.Sprintf("At marker '%s': ", markerName)
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
	verifyCompletionsItems(t, prefix, actual.Items, expected.Items)
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

func verifyCompletionsItems(t *testing.T, prefix string, actual []*lsproto.CompletionItem, expected *CompletionsExpectedItems) {
	if expected.Exact != nil {
		if expected.Includes != nil {
			t.Fatal(prefix + "Expected exact completion list but also specified 'includes'.")
		}
		if expected.Excludes != nil {
			t.Fatal(prefix + "Expected exact completion list but also specified 'excludes'.")
		}
		if len(actual) != len(expected.Exact) {
			t.Fatalf(prefix+"Expected %d exact completion items but got %d: %s", len(expected.Exact), len(actual), cmp.Diff(actual, expected.Exact))
		}
		if len(actual) > 0 {
			verifyCompletionsAreExactly(t, prefix, actual, expected.Exact)
		}
		return
	}
	nameToActualItem := make(map[string]*lsproto.CompletionItem)
	for _, item := range actual {
		nameToActualItem[item.Label] = item
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
				verifyCompletionItem(t, prefix+"Includes completion item mismatch for label "+item.Label, actualItem, item)
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

func verifyCompletionsAreExactly(t *testing.T, prefix string, actual []*lsproto.CompletionItem, expected []CompletionsExpectedItem) {
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
			verifyCompletionItem(t, prefix+"Completion item mismatch for label "+actualItem.Label, actualItem, expectedItem)
		}
	}
}

func verifyCompletionItem(t *testing.T, prefix string, actual *lsproto.CompletionItem, expected *lsproto.CompletionItem) {
	ignoreKind := cmp.FilterPath(
		func(p cmp.Path) bool {
			switch p.Last().String() {
			case ".Kind", ".SortText":
				return true
			default:
				return false
			}
		},
		cmp.Ignore(),
	)
	assertDeepEqual(t, actual, expected, prefix, ignoreKind)
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
		if marker.FileName == fileName {
			marker.Position = updatePosition(marker.Position, editStart, editEnd, newText)
			marker.LSPosition = f.converters.PositionToLineAndCharacter(script, core.TextPos(marker.Position))
		}
	}
	for _, rangeMarker := range f.testData.Ranges {
		if rangeMarker.FileName == fileName {
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
	f.sendNotification(t, lsproto.MethodTextDocumentDidChange, &lsproto.DidChangeTextDocumentParams{
		TextDocument: lsproto.VersionedTextDocumentIdentifier{
			TextDocumentIdentifier: lsproto.TextDocumentIdentifier{
				Uri: ls.FileNameToDocumentURI(fileName),
			},
			Version: script.version,
		},
		ContentChanges: []lsproto.TextDocumentContentChangeEvent{
			{
				TextDocumentContentChangePartial: &lsproto.TextDocumentContentChangePartial{
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
