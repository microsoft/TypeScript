package fourslash

import (
	"context"
	"fmt"
	"io"
	"maps"
	"runtime"
	"slices"
	"strconv"
	"strings"
	"testing"
	"unicode/utf8"

	"github.com/google/go-cmp/cmp"
	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/diagnosticwriter"
	"github.com/microsoft/typescript-go/internal/execute/tsctests"
	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/jsonrpc"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/testutil/lsptestutil"
	"github.com/microsoft/typescript-go/internal/testutil/tsbaseline"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/iovfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type FourslashTest struct {
	client *lsptestutil.LSPClient
	vfs    vfs.FS

	testData      *TestData // !!! consolidate test files from test data and script info
	baselines     map[baselineCommand]*strings.Builder
	rangesByText  *collections.MultiMap[string, *RangeMarker]
	openFiles     map[string]struct{}
	stateBaseline *stateBaseline

	scriptInfos map[string]*scriptInfo
	converters  *lsconv.Converters

	stateEnableFormatting   bool
	reportFormatOnTypeCrash bool
	userPreferences         *lsutil.UserPreferences
	currentCaretPosition    lsproto.Position
	lastKnownMarkerName     *string
	activeFilename          string
	selectionEnd            *lsproto.Position

	isStradaServer bool // Whether this is a fourslash server test in Strada. !!! Remove once we don't need to diff baselines.
}

type scriptInfo struct {
	fileName string
	content  string
	lineMap  *lsconv.LSPLineMap
	version  int32
}

func newScriptInfo(fileName string, content string) *scriptInfo {
	return &scriptInfo{
		fileName: fileName,
		content:  content,
		lineMap:  lsconv.ComputeLSPLineStarts(content),
		version:  1,
	}
}

func (s *scriptInfo) editContent(start int, end int, newText string) {
	s.content = s.content[:start] + newText + s.content[end:]
	s.lineMap = lsconv.ComputeLSPLineStarts(s.content)
	s.version++
}

func (s *scriptInfo) Text() string {
	return s.content
}

func (s *scriptInfo) FileName() string {
	return s.fileName
}

func (s *scriptInfo) GetLineContent(line int) string {
	numLines := len(s.lineMap.LineStarts)
	if line < 0 || line >= numLines {
		return ""
	}
	start := s.lineMap.LineStarts[line]
	var end core.TextPos
	if line+1 < numLines {
		end = s.lineMap.LineStarts[line+1]
	} else {
		end = core.TextPos(len(s.content))
	}

	// delete trailing newline
	content := s.content[start:end]
	if len(content) > 0 && content[len(content)-1] == '\n' {
		content = content[:len(content)-1]
	}
	return content
}

const rootDir = "/"

var parseCache = project.NewParseCache(project.RefCountCacheOptions{
	DisableDeletion: true,
},
)

func NewFourslash(t *testing.T, capabilities *lsproto.ClientCapabilities, content string) (*FourslashTest, func()) {
	repo.SkipIfNoTypeScriptSubmodule(t)
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	fileName := getBaseFileNameFromTest(t) + tspath.ExtensionTs
	testfs := make(map[string]any)
	scriptInfos := make(map[string]*scriptInfo)
	testData := ParseTestData(t, content, fileName)
	for _, file := range testData.Files {
		filePath := tspath.GetNormalizedAbsolutePath(file.fileName, rootDir)
		// Dynamic files (e.g., untitled:) shouldn't be added to the VFS
		if !tspath.IsDynamicFileName(filePath) {
			testfs[filePath] = file.Content
		}
		scriptInfos[filePath] = newScriptInfo(filePath, file.Content)
	}

	for link, target := range testData.Symlinks {
		filePath := tspath.GetNormalizedAbsolutePath(link, rootDir)
		testfs[filePath] = vfstest.Symlink(tspath.GetNormalizedAbsolutePath(target, rootDir))
	}

	// !!! use default compiler options for inferred project as base
	compilerOptions := &core.CompilerOptions{
		SkipDefaultLibCheck: core.TSTrue,
		Target:              core.ScriptTargetLatestStandard,
		Jsx:                 core.JsxEmitPreserve,
	}
	harnessutil.SetCompilerOptionsFromTestConfig(t, testData.GlobalOptions, compilerOptions, rootDir)
	if commandLines := testData.GlobalOptions["tsc"]; commandLines != "" {
		for commandLine := range strings.SplitSeq(commandLines, ",") {
			tsctests.GetFileMapWithBuild(testfs, strings.Split(commandLine, " "))
		}
	}

	harnessutil.SkipUnsupportedCompilerOptions(t, compilerOptions)

	fsFromMap := vfstest.FromMap(testfs, true /*useCaseSensitiveFileNames*/)
	fs := bundled.WrapFS(fsFromMap)

	serverOpts := lsp.ServerOptions{
		Err: io.Discard,

		Cwd:                "/",
		FS:                 fs,
		DefaultLibraryPath: bundled.LibPath(),

		ParseCache: parseCache,
	}

	converters := lsconv.NewConverters(lsproto.PositionEncodingKindUTF8, func(fileName string) *lsconv.LSPLineMap {
		scriptInfo, ok := scriptInfos[fileName]
		if !ok {
			return nil
		}
		return scriptInfo.lineMap
	})

	f := &FourslashTest{
		testData:                &testData,
		stateEnableFormatting:   true,
		reportFormatOnTypeCrash: true,
		userPreferences:         lsutil.NewDefaultUserPreferences(), // !!! parse default preferences for fourslash case?
		vfs:                     fs,
		scriptInfos:             scriptInfos,
		converters:              converters,
		baselines:               make(map[baselineCommand]*strings.Builder),
		openFiles:               make(map[string]struct{}),
	}
	client, closeClient := lsptestutil.NewLSPClient(t, serverOpts, f.handleServerRequest)
	f.client = client

	// !!! temporary; remove when we have `handleDidChangeConfiguration`/implicit project config support
	// !!! replace with a proper request *after initialize*
	client.SetCompilerOptionsForInferredProjects(compilerOptions)
	f.initialize(t, capabilities)

	if testData.isStateBaseliningEnabled() {
		// Single baseline, so initialize project state baseline too
		f.stateBaseline = newStateBaseline(fsFromMap.(iovfs.FsWithSys))
	} else {
		for _, file := range testData.Files {
			f.openFile(t, file.fileName)
		}
		f.activeFilename = f.testData.Files[0].fileName
	}

	_, testPath, _, _ := runtime.Caller(1)
	return f, func() {
		t.Helper()
		err := closeClient()
		if err != nil {
			t.Errorf("goroutine error: %v", err)
		}
		f.verifyBaselines(t, testPath)
	}
}

// handleServerRequest handles requests initiated by the server (e.g., workspace/configuration).
func (f *FourslashTest) handleServerRequest(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {
	switch req.Method {
	case lsproto.MethodWorkspaceConfiguration:
		// Return current user preferences
		return &lsproto.ResponseMessage{
			ID:      req.ID,
			JSONRPC: req.JSONRPC,
			Result:  []any{f.userPreferences},
		}

	case lsproto.MethodClientRegisterCapability:
		// Accept all capability registrations
		return &lsproto.ResponseMessage{
			ID:      req.ID,
			JSONRPC: req.JSONRPC,
			Result:  lsproto.Null{},
		}

	case lsproto.MethodClientUnregisterCapability:
		// Accept all capability unregistrations
		return &lsproto.ResponseMessage{
			ID:      req.ID,
			JSONRPC: req.JSONRPC,
			Result:  lsproto.Null{},
		}

	default:
		// Unknown server request
		return &lsproto.ResponseMessage{
			ID:      req.ID,
			JSONRPC: req.JSONRPC,
			Error: &jsonrpc.ResponseError{
				Code:    int32(lsproto.ErrorCodeMethodNotFound),
				Message: fmt.Sprintf("Unknown method: %s", req.Method),
			},
		}
	}
}

func getBaseFileNameFromTest(t *testing.T) string {
	name := t.Name()
	name = core.LastOrNil(strings.Split(name, "/"))
	name = strings.TrimPrefix(name, "Test")
	name = stringutil.LowerFirstChar(name)

	// Special case: TypeScript has "callHierarchyFunctionAmbiguity.N" with periods
	switch name {
	case "callHierarchyFunctionAmbiguity1":
		name = "callHierarchyFunctionAmbiguity.1"
	case "callHierarchyFunctionAmbiguity2":
		name = "callHierarchyFunctionAmbiguity.2"
	case "callHierarchyFunctionAmbiguity3":
		name = "callHierarchyFunctionAmbiguity.3"
	case "callHierarchyFunctionAmbiguity4":
		name = "callHierarchyFunctionAmbiguity.4"
	case "callHierarchyFunctionAmbiguity5":
		name = "callHierarchyFunctionAmbiguity.5"
	}

	return name
}

const showCodeLensLocationsCommandName = "typescript.showCodeLensLocations"

func (f *FourslashTest) initialize(t *testing.T, capabilities *lsproto.ClientCapabilities) {
	params := &lsproto.InitializeParams{
		Locale: new("en-US"),
		InitializationOptions: &lsproto.InitializationOptions{
			CodeLensShowLocationsCommandName: new(showCodeLensLocationsCommandName),
		},
	}
	params.Capabilities = getCapabilitiesWithDefaults(capabilities)
	resp, _, ok := lsptestutil.SendRequest(t, f.client, lsproto.InitializeInfo, params)
	if !ok {
		t.Fatalf("Initialize request failed")
	}
	if resp.AsResponse().Error != nil {
		t.Fatalf("Initialize request returned error: %s", resp.AsResponse().Error.String())
	}
	lsptestutil.SendNotification(t, f.client, lsproto.InitializedInfo, &lsproto.InitializedParams{})

	// Wait for the initial configuration exchange to complete
	// The server will send workspace/configuration as part of handleInitialized
	<-f.client.Server.InitComplete()
}

// If modifying the defaults, update GetDefaultCapabilities too.
var (
	ptrTrue                       = new(true)
	defaultCompletionCapabilities = &lsproto.CompletionClientCapabilities{
		CompletionItem: &lsproto.ClientCompletionItemOptions{
			SnippetSupport:          ptrTrue,
			CommitCharactersSupport: ptrTrue,
			PreselectSupport:        ptrTrue,
			LabelDetailsSupport:     ptrTrue,
			InsertReplaceSupport:    ptrTrue,
			DocumentationFormat:     &[]lsproto.MarkupKind{lsproto.MarkupKindMarkdown, lsproto.MarkupKindPlainText},
		},
		CompletionList: &lsproto.CompletionListCapabilities{
			ItemDefaults: &[]string{"commitCharacters", "editRange"},
		},
	}
	defaultDefinitionCapabilities = &lsproto.DefinitionClientCapabilities{
		LinkSupport: ptrTrue,
	}
	defaultTypeDefinitionCapabilities = &lsproto.TypeDefinitionClientCapabilities{
		LinkSupport: ptrTrue,
	}
	defaultImplementationCapabilities = &lsproto.ImplementationClientCapabilities{
		LinkSupport: ptrTrue,
	}
	defaultHoverCapabilities = &lsproto.HoverClientCapabilities{
		ContentFormat: &[]lsproto.MarkupKind{lsproto.MarkupKindMarkdown, lsproto.MarkupKindPlainText},
	}
	defaultSignatureHelpCapabilities = &lsproto.SignatureHelpClientCapabilities{
		SignatureInformation: &lsproto.ClientSignatureInformationOptions{
			DocumentationFormat: &[]lsproto.MarkupKind{lsproto.MarkupKindMarkdown, lsproto.MarkupKindPlainText},
			ParameterInformation: &lsproto.ClientSignatureParameterInformationOptions{
				LabelOffsetSupport: ptrTrue,
			},
			ActiveParameterSupport: ptrTrue,
		},
		ContextSupport: ptrTrue,
	}
	defaultDocumentSymbolCapabilities = &lsproto.DocumentSymbolClientCapabilities{
		HierarchicalDocumentSymbolSupport: ptrTrue,
	}
	defaultFoldingRangeCapabilities = &lsproto.FoldingRangeClientCapabilities{
		RangeLimit: new(uint32(5000)),
		// LineFoldingOnly: ptrTrue,
		FoldingRangeKind: &lsproto.ClientFoldingRangeKindOptions{
			ValueSet: &[]lsproto.FoldingRangeKind{
				lsproto.FoldingRangeKindComment,
				lsproto.FoldingRangeKindImports,
				lsproto.FoldingRangeKindRegion,
			},
		},
		FoldingRange: &lsproto.ClientFoldingRangeOptions{
			CollapsedText: ptrTrue, // Unused by our testing, but set to exercise the code.
		},
	}
	defaultDiagnosticCapabilities = &lsproto.DiagnosticClientCapabilities{
		RelatedInformation: ptrTrue,
		TagSupport: &lsproto.ClientDiagnosticsTagOptions{
			ValueSet: []lsproto.DiagnosticTag{
				lsproto.DiagnosticTagUnnecessary,
				lsproto.DiagnosticTagDeprecated,
			},
		},
	}
	defaultPublishDiagnosticCapabilities = &lsproto.PublishDiagnosticsClientCapabilities{
		RelatedInformation: ptrTrue,
		TagSupport: &lsproto.ClientDiagnosticsTagOptions{
			ValueSet: []lsproto.DiagnosticTag{
				lsproto.DiagnosticTagUnnecessary,
				lsproto.DiagnosticTagDeprecated,
			},
		},
	}
)

func GetDefaultCapabilities() *lsproto.ClientCapabilities {
	return &lsproto.ClientCapabilities{
		General: &lsproto.GeneralClientCapabilities{
			PositionEncodings: &[]lsproto.PositionEncodingKind{lsproto.PositionEncodingKindUTF8},
		},
		TextDocument: &lsproto.TextDocumentClientCapabilities{
			Completion: &lsproto.CompletionClientCapabilities{
				CompletionItem: &lsproto.ClientCompletionItemOptions{
					SnippetSupport:          ptrTrue,
					CommitCharactersSupport: ptrTrue,
					PreselectSupport:        ptrTrue,
					LabelDetailsSupport:     ptrTrue,
					InsertReplaceSupport:    ptrTrue,
					DocumentationFormat:     &[]lsproto.MarkupKind{lsproto.MarkupKindMarkdown, lsproto.MarkupKindPlainText},
				},
				CompletionList: &lsproto.CompletionListCapabilities{
					ItemDefaults: &[]string{"commitCharacters", "editRange"},
				},
			},
			Diagnostic: &lsproto.DiagnosticClientCapabilities{
				RelatedInformation: ptrTrue,
				TagSupport: &lsproto.ClientDiagnosticsTagOptions{
					ValueSet: []lsproto.DiagnosticTag{
						lsproto.DiagnosticTagUnnecessary,
						lsproto.DiagnosticTagDeprecated,
					},
				},
			},
			PublishDiagnostics: &lsproto.PublishDiagnosticsClientCapabilities{
				RelatedInformation: ptrTrue,
				TagSupport: &lsproto.ClientDiagnosticsTagOptions{
					ValueSet: []lsproto.DiagnosticTag{
						lsproto.DiagnosticTagUnnecessary,
						lsproto.DiagnosticTagDeprecated,
					},
				},
			},
			Definition: &lsproto.DefinitionClientCapabilities{
				LinkSupport: ptrTrue,
			},
			TypeDefinition: &lsproto.TypeDefinitionClientCapabilities{
				LinkSupport: ptrTrue,
			},
			Implementation: &lsproto.ImplementationClientCapabilities{
				LinkSupport: ptrTrue,
			},
			Hover: &lsproto.HoverClientCapabilities{
				ContentFormat: &[]lsproto.MarkupKind{lsproto.MarkupKindMarkdown, lsproto.MarkupKindPlainText},
			},
			SignatureHelp: &lsproto.SignatureHelpClientCapabilities{
				SignatureInformation: &lsproto.ClientSignatureInformationOptions{
					DocumentationFormat: &[]lsproto.MarkupKind{lsproto.MarkupKindMarkdown, lsproto.MarkupKindPlainText},
					ParameterInformation: &lsproto.ClientSignatureParameterInformationOptions{
						LabelOffsetSupport: ptrTrue,
					},
					ActiveParameterSupport: ptrTrue,
				},
				ContextSupport: ptrTrue,
			},
			DocumentSymbol: &lsproto.DocumentSymbolClientCapabilities{
				HierarchicalDocumentSymbolSupport: ptrTrue,
			},
			FoldingRange: &lsproto.FoldingRangeClientCapabilities{
				RangeLimit: new(uint32(5000)),
				FoldingRangeKind: &lsproto.ClientFoldingRangeKindOptions{
					ValueSet: &[]lsproto.FoldingRangeKind{
						lsproto.FoldingRangeKindComment,
						lsproto.FoldingRangeKindImports,
						lsproto.FoldingRangeKindRegion,
					},
				},
				FoldingRange: &lsproto.ClientFoldingRangeOptions{
					CollapsedText: ptrTrue,
				},
			},
		},
		Workspace: &lsproto.WorkspaceClientCapabilities{
			Configuration: ptrTrue,
		},
	}
}

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
	if capabilitiesWithDefaults.TextDocument.Diagnostic == nil {
		capabilitiesWithDefaults.TextDocument.Diagnostic = defaultDiagnosticCapabilities
	}
	if capabilitiesWithDefaults.TextDocument.PublishDiagnostics == nil {
		capabilitiesWithDefaults.TextDocument.PublishDiagnostics = defaultPublishDiagnosticCapabilities
	}
	if capabilitiesWithDefaults.Workspace == nil {
		capabilitiesWithDefaults.Workspace = &lsproto.WorkspaceClientCapabilities{}
	}
	if capabilitiesWithDefaults.Workspace.Configuration == nil {
		capabilitiesWithDefaults.Workspace.Configuration = ptrTrue
	}
	if capabilitiesWithDefaults.TextDocument.Definition == nil {
		capabilitiesWithDefaults.TextDocument.Definition = defaultDefinitionCapabilities
	}
	if capabilitiesWithDefaults.TextDocument.TypeDefinition == nil {
		capabilitiesWithDefaults.TextDocument.TypeDefinition = defaultTypeDefinitionCapabilities
	}
	if capabilitiesWithDefaults.TextDocument.Implementation == nil {
		capabilitiesWithDefaults.TextDocument.Implementation = defaultImplementationCapabilities
	}
	if capabilitiesWithDefaults.TextDocument.Hover == nil {
		capabilitiesWithDefaults.TextDocument.Hover = defaultHoverCapabilities
	}
	if capabilitiesWithDefaults.TextDocument.SignatureHelp == nil {
		capabilitiesWithDefaults.TextDocument.SignatureHelp = defaultSignatureHelpCapabilities
	}
	if capabilitiesWithDefaults.TextDocument.DocumentSymbol == nil {
		capabilitiesWithDefaults.TextDocument.DocumentSymbol = defaultDocumentSymbolCapabilities
	}
	if capabilitiesWithDefaults.TextDocument.FoldingRange == nil {
		capabilitiesWithDefaults.TextDocument.FoldingRange = defaultFoldingRangeCapabilities
	}
	return &capabilitiesWithDefaults
}

func sendRequest[Params, Resp any](t *testing.T, f *FourslashTest, info lsproto.RequestInfo[Params, Resp], params Params) Resp {
	t.Helper()
	return sendRequestAndBaselineWorker(t, f, info, params, true)
}

func sendRequestAndBaselineWorker[Params, Resp any](t *testing.T, f *FourslashTest, info lsproto.RequestInfo[Params, Resp], params Params, baselineProjects bool) Resp {
	t.Helper()
	prefix := f.getCurrentPositionPrefix()
	if baselineProjects {
		f.baselineState(t)
	}
	f.baselineRequestOrNotification(t, info.Method, params)
	resMsg, result, resultOk := lsptestutil.SendRequest(t, f.client, info, params)
	if baselineProjects {
		f.baselineState(t)
	}
	switch info.Method {
	case lsproto.MethodTextDocumentOnTypeFormatting:
		if !f.reportFormatOnTypeCrash {
			break
		}
		fallthrough
	default:
		if resMsg == nil {
			t.Fatalf(prefix+"Nil response received for %s request", info.Method)
		}
		resp := resMsg.AsResponse()
		if resp.Error != nil {
			t.Fatalf(prefix+"%s request returned error: %s", info.Method, resp.Error.String())
		}
		if !resultOk {
			t.Fatalf(prefix+"Unexpected %s response type: %T, error: %v", info.Method, resp.Result, resp.Error)
		}
	}
	return result
}

func sendNotification[Params any](t *testing.T, f *FourslashTest, info lsproto.NotificationInfo[Params], params Params) {
	t.Helper()
	if info.Method != lsproto.MethodTextDocumentDidChange {
		// This is called eg when doing typeText = which is series of edits and formatting - which becomes non deterministic "after state"
		// The notification can only guarantee before state and thats what it baselines, but in case of type it creates
		// multiple edits which results in getting different state -based on if the snapshot was updated or not at the time of formatting requests
		// So this is used for all the incremental edits - to baseline only request data but not project state between those edits
		f.baselineState(t)
		f.updateState(info.Method, params)
	}
	f.baselineRequestOrNotification(t, info.Method, params)
	lsptestutil.SendNotification(t, f.client, info, params)
}

func (f *FourslashTest) updateState(method lsproto.Method, params any) {
	switch method {
	case lsproto.MethodTextDocumentDidOpen:
		f.openFiles[params.(*lsproto.DidOpenTextDocumentParams).TextDocument.Uri.FileName()] = struct{}{}
	case lsproto.MethodTextDocumentDidClose:
		delete(f.openFiles, params.(*lsproto.DidCloseTextDocumentParams).TextDocument.Uri.FileName())
	}
}

func (f *FourslashTest) GetOptions() *lsutil.UserPreferences {
	return f.userPreferences
}

func (f *FourslashTest) Configure(t *testing.T, config *lsutil.UserPreferences) {
	// !!!
	// We send 'js/ts' by default because that is what we expect the primary config to be in vscode and VS (one
	// set of preferences for both languages). This should be fine in fourslash since tests that need
	// multiple options usually send reconfiguration commands for each `verify` anyways
	f.userPreferences = config
	sendNotification(t, f, lsproto.WorkspaceDidChangeConfigurationInfo, &lsproto.DidChangeConfigurationParams{
		Settings: map[string]any{
			"js/ts": config,
		},
	})
}

func (f *FourslashTest) ConfigureWithReset(t *testing.T, config *lsutil.UserPreferences) (reset func()) {
	originalConfig := f.userPreferences.Copy()
	f.Configure(t, config)
	return func() {
		f.Configure(t, originalConfig)
	}
}

func (f *FourslashTest) GoToMarkerOrRange(t *testing.T, markerOrRange MarkerOrRange) {
	f.goToMarker(t, markerOrRange)
}

func (f *FourslashTest) GoToMarker(t *testing.T, markerName string) {
	marker, ok := f.testData.MarkerPositions[markerName]
	if !ok {
		t.Fatalf("Marker '%s' not found", markerName)
	}
	f.goToMarker(t, marker)
}

func (f *FourslashTest) goToMarker(t *testing.T, markerOrRange MarkerOrRange) {
	f.ensureActiveFile(t, markerOrRange.FileName())
	f.goToPosition(t, markerOrRange.LSPos())
	f.lastKnownMarkerName = markerOrRange.GetName()
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

func (f *FourslashTest) MarkerByName(t *testing.T, name string) *Marker {
	return f.testData.MarkerPositions[name]
}

func (f *FourslashTest) Ranges() []*RangeMarker {
	return f.testData.Ranges
}

func (f *FourslashTest) getRangesInFile(fileName string) []*RangeMarker {
	var rangesInFile []*RangeMarker
	for _, rangeMarker := range f.testData.Ranges {
		if rangeMarker.FileName() == fileName {
			rangesInFile = append(rangesInFile, rangeMarker)
		}
	}
	return rangesInFile
}

func (f *FourslashTest) ensureActiveFile(t *testing.T, filename string) {
	if f.activeFilename != filename {
		if _, ok := f.openFiles[filename]; !ok {
			f.openFile(t, filename)
		} else {
			f.activeFilename = filename
		}
	}
}

func (f *FourslashTest) CloseFileOfMarker(t *testing.T, markerName string) {
	marker, ok := f.testData.MarkerPositions[markerName]
	if !ok {
		t.Fatalf("Marker '%s' not found", markerName)
	}
	if f.activeFilename == marker.FileName() {
		f.activeFilename = ""
	}
	if index := slices.IndexFunc(f.testData.Files, func(f *TestFileInfo) bool { return f.fileName == marker.FileName() }); index >= 0 {
		testFile := f.testData.Files[index]
		f.scriptInfos[testFile.fileName] = newScriptInfo(testFile.fileName, testFile.Content)
	} else {
		delete(f.scriptInfos, marker.FileName())
	}
	sendNotification(t, f, lsproto.TextDocumentDidCloseInfo, &lsproto.DidCloseTextDocumentParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(marker.FileName()),
		},
	})
}

func (f *FourslashTest) openFile(t *testing.T, filename string) {
	script := f.getScriptInfo(filename)
	if script == nil {
		if content, ok := f.vfs.ReadFile(filename); ok {
			script = newScriptInfo(filename, content)
			f.scriptInfos[filename] = script
		} else {
			t.Fatalf("File %s not found in test data", filename)
		}
	}
	f.activeFilename = filename
	sendNotification(t, f, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{
		TextDocument: &lsproto.TextDocumentItem{
			Uri:        lsconv.FileNameToDocumentURI(filename),
			LanguageId: getLanguageKind(filename),
			Text:       script.content,
		},
	})
	f.baselineProjectsAfterNotification(t, filename)
}

func (f *FourslashTest) FormatDocument(t *testing.T, filename string) {
	if filename == "" {
		filename = f.activeFilename
	}
	result := sendRequest(t, f, lsproto.TextDocumentFormattingInfo, &lsproto.DocumentFormattingParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(filename),
		},
		Options: f.userPreferences.FormatCodeSettings.ToLSFormatOptions(),
	})
	if result.TextEdits == nil {
		return
	}
	f.applyTextEdits(t, *result.TextEdits)
}

func (f *FourslashTest) VerifyCurrentFileContent(t *testing.T, expectedContent string) {
	t.Helper()
	actualContent := f.getScriptInfo(f.activeFilename).content
	assert.Equal(t, actualContent, expectedContent)
}

func (f *FourslashTest) VerifyCurrentLineContent(t *testing.T, expectedContent string) {
	t.Helper()
	actualContent := f.getScriptInfo(f.activeFilename).GetLineContent(int(f.currentCaretPosition.Line))
	assert.Equal(t, actualContent, expectedContent, fmt.Sprintf(`
  actual line: "%s"
expected line: "%s"
`,
		actualContent,
		expectedContent,
	))
}

func (f *FourslashTest) VerifyIndentation(t *testing.T, numSpaces int) {
	t.Helper()
	// not implemented
	// actualContent := f.getScriptInfo(f.activeFilename).GetLineContent(int(f.currentCaretPosition.Line))
	// assert.Equal(t, actualContent, expectedContent, fmt.Sprintf("Actual line content %s does not match expected content.", actualContent))
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
	UserPreferences *lsutil.UserPreferences
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

type CompletionsExpectedCodeAction struct {
	Name           string
	Source         string
	Description    string
	NewFileContent string
}

type VerifyCompletionsResult struct {
	AndApplyCodeAction func(t *testing.T, expectedAction *CompletionsExpectedCodeAction)
}

// string | *Marker | []string | []*Marker
type MarkerInput = any

// !!! user preferences param
// !!! completion context param
func (f *FourslashTest) VerifyCompletions(t *testing.T, markerInput MarkerInput, expected *CompletionsExpectedList) VerifyCompletionsResult {
	t.Helper()
	var list *lsproto.CompletionList
	switch marker := markerInput.(type) {
	case string:
		f.GoToMarker(t, marker)
		list = f.verifyCompletionsWorker(t, expected)
	case *Marker:
		f.goToMarker(t, marker)
		list = f.verifyCompletionsWorker(t, expected)
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
		list = f.verifyCompletionsWorker(t, expected)
	default:
		t.Fatalf("Invalid marker input type: %T. Expected string, *Marker, []string, or []*Marker.", markerInput)
	}

	return VerifyCompletionsResult{
		AndApplyCodeAction: func(t *testing.T, expectedAction *CompletionsExpectedCodeAction) {
			item := core.Find(list.Items, func(item *lsproto.CompletionItem) bool {
				if item.Label != expectedAction.Name || item.Data == nil {
					return false
				}
				data := item.Data
				if data.AutoImport == nil {
					return false
				}
				return data.AutoImport.ModuleSpecifier == expectedAction.Source
			})
			if item == nil {
				t.Fatalf("Code action '%s' from source '%s' not found in completions.", expectedAction.Name, expectedAction.Source)
			}
			assert.Check(t, strings.Contains(*item.Detail, expectedAction.Description), "Completion item detail does not contain expected description.")
			f.applyTextEdits(t, *item.AdditionalTextEdits)
			assert.Equal(t, f.getScriptInfo(f.activeFilename).content, expectedAction.NewFileContent, fmt.Sprintf("File content after applying code action '%s' did not match expected content.", expectedAction.Name))
		},
	}
}

func (f *FourslashTest) verifyCompletionsWorker(t *testing.T, expected *CompletionsExpectedList) *lsproto.CompletionList {
	t.Helper()
	prefix := f.getCurrentPositionPrefix()
	var userPreferences *lsutil.UserPreferences
	if expected != nil {
		userPreferences = expected.UserPreferences
	}
	list := f.getCompletions(t, userPreferences)
	f.verifyCompletionsResult(t, list, expected, prefix)
	return list
}

func (f *FourslashTest) GetCompletions(t *testing.T, userPreferences *lsutil.UserPreferences) *lsproto.CompletionList {
	t.Helper()
	return f.getCompletions(t, userPreferences)
}

func (f *FourslashTest) getCompletions(t *testing.T, userPreferences *lsutil.UserPreferences) *lsproto.CompletionList {
	t.Helper()
	params := &lsproto.CompletionParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
		Position: f.currentCaretPosition,
		Context:  &lsproto.CompletionContext{},
	}
	if userPreferences != nil {
		reset := f.ConfigureWithReset(t, userPreferences)
		defer reset()
	}
	result := sendRequest(t, f, lsproto.TextDocumentCompletionInfo, params)
	// For performance, the server may return unsorted completion lists.
	// The client is expected to sort them by SortText and then by Label.
	// We are the client here.
	if result.List != nil {
		slices.SortStableFunc(result.List.Items, ls.CompareCompletionEntries)
	}
	return result.List
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
		if len(actual.Items) == 0 {
			return
		}
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
			t.Fatalf(prefix+"Expected %d exact completion items but got %d.", len(expected.Exact), len(actual))
		}
		if len(actual) > 0 {
			f.verifyCompletionsAreExactly(t, prefix, actual, expected.Exact)
		}
		return
	}
	nameToActualItems := make(map[string][]*lsproto.CompletionItem)
	for _, item := range actual {
		nameToActualItems[item.Label] = append(nameToActualItems[item.Label], item)
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
				_, ok := nameToActualItems[item]
				if !ok {
					t.Fatalf("%sLabel '%s' not found in actual items.", prefix, item)
				}
				delete(nameToActualItems, item)
			case *lsproto.CompletionItem:
				actualItems, ok := nameToActualItems[item.Label]
				if !ok {
					t.Fatalf("%sLabel '%s' not found in actual items.", prefix, item.Label)
				}
				var mismatchPrefix string
				if len(actualItems) > 1 {
					mismatchPrefix = prefix + "No completion item match for label " + item.Label + " (multiple candidates found): "
				} else {
					mismatchPrefix = prefix + "Includes completion item mismatch for label " + item.Label + ": "
				}
				itemIndex := core.FindIndex(actualItems, func(actualItem *lsproto.CompletionItem) bool {
					if err := f.verifyCompletionItem(t, prefix, actualItem, item); err != "" {
						mismatchPrefix += "\n    " + err
						return false
					}
					return true
				})

				// fail test if no match found
				if itemIndex == -1 {
					t.Fatal(mismatchPrefix)
				}

				if len(actualItems) == 1 {
					delete(nameToActualItems, item.Label)
				} else if itemIndex == 0 {
					nameToActualItems[item.Label] = actualItems[1:]
				} else if itemIndex == len(actualItems)-1 {
					nameToActualItems[item.Label] = actualItems[:itemIndex]
				} else {
					nameToActualItems[item.Label] = append(actualItems[:itemIndex], actualItems[itemIndex+1:]...)
				}

			default:
				t.Fatalf("%sExpected completion item to be a string or *lsproto.CompletionItem, got %T", prefix, item)
			}
		}
		if len(expected.Unsorted) != len(actual) {
			unmatched := slices.Collect(maps.Keys(nameToActualItems))
			t.Fatalf("%sAdditional completions found but not included in 'unsorted': %s", prefix, strings.Join(unmatched, "\n"))
		}
		return
	}
	if expected.Includes != nil {
		for _, item := range expected.Includes {
			switch item := item.(type) {
			case string:
				_, ok := nameToActualItems[item]
				if !ok {
					t.Fatalf("%sLabel '%s' not found in actual items.", prefix, item)
				}
			case *lsproto.CompletionItem:
				actualItems, ok := nameToActualItems[item.Label]
				if !ok {
					t.Fatalf("%sLabel '%s' not found in actual items.", prefix, item.Label)
				}

				var mismatchPrefix string
				if len(actualItems) > 1 {
					mismatchPrefix = prefix + "No completion item match for label " + item.Label + " (multiple candidates found): "
				} else {
					mismatchPrefix = prefix + "Includes completion item mismatch for label " + item.Label + ": "
				}
				itemIndex := core.FindIndex(actualItems, func(actualItem *lsproto.CompletionItem) bool {
					if err := f.verifyCompletionItem(t, prefix, actualItem, item); err != "" {
						mismatchPrefix += "\n    " + err
						return false
					}
					return true
				})

				// fail test if no match found
				if itemIndex == -1 {
					t.Fatal(mismatchPrefix)
				}

				// delete previous entries since we verify entries in order
				if len(actualItems) == 1 || itemIndex == len(actualItems)-1 {
					delete(nameToActualItems, item.Label)
				} else {
					nameToActualItems[item.Label] = actualItems[itemIndex:]
				}
			default:
				t.Fatalf("%sExpected completion item to be a string or *lsproto.CompletionItem, got %T", prefix, item)
			}
		}
	}
	for _, exclude := range expected.Excludes {
		if _, ok := nameToActualItems[exclude]; ok {
			t.Fatalf("%sLabel '%s' should not be in actual items but was found.", prefix, exclude)
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
			if err := f.verifyCompletionItem(t, prefix+"Completion item mismatch for label "+actualItem.Label, actualItem, expectedItem); err != "" {
				t.Fatalf("%s:\n%s", prefix+"Completion item mismatch for label "+actualItem.Label, err)
			}
		}
	}
}

func ignorePaths(paths ...string) cmp.Option {
	return cmp.FilterPath(
		func(p cmp.Path) bool {
			return slices.Contains(paths, p.Last().String())
		},
		cmp.Ignore(),
	)
}

var (
	completionIgnoreOpts  = ignorePaths(".Kind", ".SortText", ".FilterText", ".Data", ".AdditionalTextEdits")
	autoImportIgnoreOpts  = ignorePaths(".Kind", ".SortText", ".FilterText", ".Data", ".LabelDetails", ".Detail", ".AdditionalTextEdits")
	diagnosticsIgnoreOpts = ignorePaths(".Severity", ".Source", ".RelatedInformation")
)

func (f *FourslashTest) verifyCompletionItem(t *testing.T, prefix string, actual *lsproto.CompletionItem, expected *lsproto.CompletionItem) string {
	// returns error message if not matched
	t.Helper()
	var actualAutoImportFix, expectedAutoImportFix *lsproto.AutoImportFix
	if actual.Data != nil {
		actualAutoImportFix = actual.Data.AutoImport
	}
	if expected.Data != nil {
		expectedAutoImportFix = expected.Data.AutoImport
	}
	if (actualAutoImportFix == nil) != (expectedAutoImportFix == nil) {
		return "Mismatch in auto-import data presence"
	}

	if expected.Detail != nil || expected.Documentation != nil || actualAutoImportFix != nil {
		actual = f.resolveCompletionItem(t, actual)
	}

	if actualAutoImportFix != nil {
		if err := cmp.Diff(actual, expected, autoImportIgnoreOpts); err != "" {
			return err
		}
		if expected.AdditionalTextEdits == AnyTextEdits {
			if !(actual.AdditionalTextEdits != nil && len(*actual.AdditionalTextEdits) > 0) {
				return "Expected non-nil AdditionalTextEdits for auto-import completion item"
			}
		}
		if expected.LabelDetails != nil {
			if err := cmp.Diff(actual.LabelDetails, expected.LabelDetails); err != "" {
				return fmt.Sprintf("%s:\n%s", "LabelDetailsMismatch", err)
			}
		}
		if actualAutoImportFix.ModuleSpecifier != expectedAutoImportFix.ModuleSpecifier {
			return "ModuleSpecifier mismatch"
		}
	} else {
		if err := cmp.Diff(actual, expected, completionIgnoreOpts); err != "" {
			return err
		}
		if expected.AdditionalTextEdits != AnyTextEdits {
			if err := cmp.Diff(actual.AdditionalTextEdits, expected.AdditionalTextEdits); err != "" {
				return fmt.Sprintf("%s:\n%s", "AdditionalTextEdits mismatch", err)
			}
		}
	}

	if expected.FilterText != nil {
		if err := cmp.Diff(actual.FilterText, expected.FilterText); err != "" {
			return fmt.Sprintf("%s:\n%s", "FilterText mismatch", err)
		}
	}
	if expected.Kind != nil {
		if err := cmp.Diff(actual.Kind, expected.Kind); err != "" {
			return fmt.Sprintf("%s:\n%s", "Kind mismatch", err)
		}
	}
	if err := cmp.Diff(actual.SortText, core.OrElse(expected.SortText, new(string(ls.SortTextLocationPriority)))); err != "" {
		return fmt.Sprintf("%s:\n%s", "SortText mismatch", err)
	}

	return ""
}

func (f *FourslashTest) ResolveCompletionItem(t *testing.T, item *lsproto.CompletionItem) *lsproto.CompletionItem {
	t.Helper()
	return f.resolveCompletionItem(t, item)
}

func (f *FourslashTest) resolveCompletionItem(t *testing.T, item *lsproto.CompletionItem) *lsproto.CompletionItem {
	result := sendRequest(t, f, lsproto.CompletionItemResolveInfo, item)
	return result
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

func (f *FourslashTest) VerifyOrganizeImports(t *testing.T, expectedContent string, codeActionKind lsproto.CodeActionKind, preferences *lsutil.UserPreferences) {
	t.Helper()

	if preferences != nil {
		reset := f.ConfigureWithReset(t, preferences)
		defer reset()
	}

	params := &lsproto.CodeActionParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
		Range: lsproto.Range{
			Start: lsproto.Position{Line: 0, Character: 0},
			End:   f.converters.PositionToLineAndCharacter(f.getScriptInfo(f.activeFilename), core.TextPos(len(f.getScriptInfo(f.activeFilename).content))),
		},
		Context: &lsproto.CodeActionContext{
			Only: &[]lsproto.CodeActionKind{codeActionKind},
		},
	}

	result := sendRequest(t, f, lsproto.TextDocumentCodeActionInfo, params)

	if result.CommandOrCodeActionArray == nil || len(*result.CommandOrCodeActionArray) == 0 {
		t.Fatalf("No organize imports code action found")
	}

	var organizeAction *lsproto.CodeAction
	for _, item := range *result.CommandOrCodeActionArray {
		if item.CodeAction != nil && item.CodeAction.Kind != nil && *item.CodeAction.Kind == codeActionKind {
			organizeAction = item.CodeAction
			break
		}
	}

	if organizeAction == nil {
		t.Fatalf("No organize imports code action found")
	}

	expectedURI := lsconv.FileNameToDocumentURI(f.activeFilename)
	if organizeAction.Edit != nil && organizeAction.Edit.Changes != nil {
		for uri, edits := range *organizeAction.Edit.Changes {
			if uri != expectedURI {
				t.Fatalf("Organize imports changed unexpected file: %s (expected %s)", uri, expectedURI)
			}
			f.applyTextEdits(t, edits)
		}
	}

	actualContent := f.getScriptInfo(f.activeFilename).content
	if actualContent != expectedContent {
		t.Fatalf("Organize imports result doesn't match.\nExpected:\n%s\n\nActual:\n%s", expectedContent, actualContent)
	}
}

type ApplyCodeActionFromCompletionOptions struct {
	Name            string
	Source          string
	AutoImportFix   *lsproto.AutoImportFix
	Description     string
	NewFileContent  *string
	NewRangeContent *string
	UserPreferences *lsutil.UserPreferences
}

func (f *FourslashTest) VerifyApplyCodeActionFromCompletion(t *testing.T, markerName *string, options *ApplyCodeActionFromCompletionOptions) {
	t.Helper()
	f.GoToMarker(t, *markerName)
	var userPreferences *lsutil.UserPreferences
	if options != nil && options.UserPreferences != nil {
		userPreferences = options.UserPreferences
	} else {
		// Default preferences: enables auto-imports
		userPreferences = lsutil.NewDefaultUserPreferences()
	}

	reset := f.ConfigureWithReset(t, userPreferences)
	defer reset()
	completionsList := f.getCompletions(t, nil) // Already configured, so we do not need to pass it in again
	items := core.Filter(completionsList.Items, func(item *lsproto.CompletionItem) bool {
		if item.Label != options.Name || item.Data == nil {
			return false
		}

		data := item.Data
		if options.AutoImportFix != nil {
			return data.AutoImport != nil &&
				(options.AutoImportFix.ModuleSpecifier == "" || data.AutoImport.ModuleSpecifier == options.AutoImportFix.ModuleSpecifier)
		}
		if data.AutoImport == nil && data.Source != "" && data.Source == options.Source {
			return true
		}
		if data.AutoImport != nil && data.AutoImport.ModuleSpecifier == options.Source {
			return true
		}
		return false
	})

	if len(items) == 0 {
		t.Fatalf("Code action '%s' from source '%s' not found in completions.", options.Name, options.Source)
	}

	var correctResolvedItem lsproto.CompletionItem
	correctItem := core.Find(items, func(item *lsproto.CompletionItem) bool {
		correctResolvedItem = *f.resolveCompletionItem(t, item)
		var actualDetail string
		if correctResolvedItem.Detail != nil {
			actualDetail = *correctResolvedItem.Detail
		}
		if !strings.Contains(actualDetail, options.Description) || correctResolvedItem.AdditionalTextEdits == nil {
			return false
		}
		return true
	})

	if correctItem == nil {
		t.Fatalf("No matching code action found for '%s' from source '%s'.", options.Name, options.Source)
		var actualDetail string
		if correctResolvedItem.Detail != nil {
			actualDetail = *correctResolvedItem.Detail
		}
		assert.Check(t, strings.Contains(actualDetail, options.Description), "Completion item detail does not contain expected description.")
		if correctResolvedItem.AdditionalTextEdits == nil {
			t.Fatalf("Expected non-nil AdditionalTextEdits for code action completion item.")
		}
	}

	// apply the item to the test files
	f.applyTextEdits(t, *correctResolvedItem.AdditionalTextEdits)
	if options.NewFileContent != nil {
		assert.Equal(t, f.getScriptInfo(f.activeFilename).content, *options.NewFileContent, "File content after applying code action did not match expected content.")
	} else if options.NewRangeContent != nil {
		t.Fatal("!!! TODO")
	}
}

func (f *FourslashTest) VerifyImportFixAtPosition(t *testing.T, expectedTexts []string, preferences *lsutil.UserPreferences) {
	t.Helper()
	fileName := f.activeFilename
	ranges := f.Ranges()
	var filteredRanges []*RangeMarker
	for _, r := range ranges {
		if r.FileName() == fileName {
			filteredRanges = append(filteredRanges, r)
		}
	}
	if len(filteredRanges) > 1 {
		t.Fatalf("Exactly one range should be specified in the testfile.")
	}
	var rangeMarker *RangeMarker
	if len(filteredRanges) == 1 {
		rangeMarker = filteredRanges[0]
	}

	if preferences != nil {
		reset := f.ConfigureWithReset(t, preferences)
		defer reset()
	}

	// Get diagnostics at the current position to find errors that need import fixes
	diagParams := &lsproto.DocumentDiagnosticParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
	}
	diagResult := sendRequest(t, f, lsproto.TextDocumentDiagnosticInfo, diagParams)

	var diagnostics []*lsproto.Diagnostic
	if diagResult.FullDocumentDiagnosticReport != nil && diagResult.FullDocumentDiagnosticReport.Items != nil {
		diagnostics = diagResult.FullDocumentDiagnosticReport.Items
	}

	currentCaretPosition := f.currentCaretPosition
	params := &lsproto.CodeActionParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
		Range: lsproto.Range{
			End:   currentCaretPosition,
			Start: currentCaretPosition,
		},
		Context: &lsproto.CodeActionContext{
			Diagnostics: diagnostics,
		},
	}
	result := sendRequest(t, f, lsproto.TextDocumentCodeActionInfo, params)

	// Find all auto-import code actions (fixes with fixId/fixName related to imports)
	var importActions []*lsproto.CodeAction
	if result.CommandOrCodeActionArray != nil {
		for _, item := range *result.CommandOrCodeActionArray {
			if item.CodeAction != nil && item.CodeAction.Kind != nil && *item.CodeAction.Kind == lsproto.CodeActionKindQuickFix {
				importActions = append(importActions, item.CodeAction)
			}
		}
	}

	if len(importActions) == 0 {
		if len(expectedTexts) != 0 {
			t.Fatalf("No codefixes returned.")
		}
		return
	}

	// Save the original content before any edits
	script := f.getScriptInfo(f.activeFilename)
	originalContent := script.content
	// For each import action, apply it and check the result
	actualTextArray := make([]string, 0, len(importActions))
	for _, action := range importActions {
		// Apply the code action
		var edits []*lsproto.TextEdit
		if action.Edit != nil && action.Edit.Changes != nil {
			if len(*action.Edit.Changes) != 1 {
				t.Fatalf("Expected exactly 1 change, got %d", len(*action.Edit.Changes))
			}
			for uri, changeEdits := range *action.Edit.Changes {
				if uri != lsconv.FileNameToDocumentURI(f.activeFilename) {
					t.Fatalf("Expected change to file %s, got %s", f.activeFilename, uri)
				}
				edits = changeEdits
				f.applyTextEdits(t, changeEdits)
			}
		}

		// Get the result text
		var text string
		if rangeMarker != nil {
			text = f.getRangeText(rangeMarker)
		} else {
			text = f.getScriptInfo(f.activeFilename).content
		}
		actualTextArray = append(actualTextArray, text)

		// Undo changes to perform next fix
		for _, textChange := range edits {
			start := int(f.converters.LineAndCharacterToPosition(script, textChange.Range.Start))
			end := int(f.converters.LineAndCharacterToPosition(script, textChange.Range.End))
			deletedText := originalContent[start:end]
			insertedText := textChange.NewText
			f.editScriptAndUpdateMarkers(t, f.activeFilename, start, start+len(insertedText), deletedText)
		}
		f.currentCaretPosition = currentCaretPosition
	}

	// Compare results
	if len(expectedTexts) != len(actualTextArray) {
		var actualJoined strings.Builder
		for i, actual := range actualTextArray {
			if i > 0 {
				actualJoined.WriteString("\n\n" + strings.Repeat("-", 20) + "\n\n")
			}
			actualJoined.WriteString(actual)
		}
		t.Fatalf("Expected %d import fixes, got %d:\n\n%s", len(expectedTexts), len(actualTextArray), actualJoined.String())
	}
	for i, expected := range expectedTexts {
		actual := actualTextArray[i]
		assert.Equal(t, expected, actual, fmt.Sprintf("Import fix at index %d doesn't match.\n", i))
	}
}

func (f *FourslashTest) VerifyImportFixModuleSpecifiers(
	t *testing.T,
	markerName string,
	expectedModuleSpecifiers []string,
	preferences *lsutil.UserPreferences,
) {
	t.Helper()
	f.GoToMarker(t, markerName)

	if preferences != nil {
		reset := f.ConfigureWithReset(t, preferences)
		defer reset()
	}

	// Get diagnostics at the current position to find errors that need import fixes
	diagParams := &lsproto.DocumentDiagnosticParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
	}
	diagResult := sendRequest(t, f, lsproto.TextDocumentDiagnosticInfo, diagParams)

	var diagnostics []*lsproto.Diagnostic
	if diagResult.FullDocumentDiagnosticReport != nil && diagResult.FullDocumentDiagnosticReport.Items != nil {
		diagnostics = diagResult.FullDocumentDiagnosticReport.Items
	}

	params := &lsproto.CodeActionParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
		Range: lsproto.Range{
			Start: f.currentCaretPosition,
			End:   f.currentCaretPosition,
		},
		Context: &lsproto.CodeActionContext{
			Diagnostics: diagnostics,
		},
	}
	result := sendRequest(t, f, lsproto.TextDocumentCodeActionInfo, params)

	// Extract module specifiers from import fix code actions
	var actualModuleSpecifiers []string
	if result.CommandOrCodeActionArray != nil {
		for _, item := range *result.CommandOrCodeActionArray {
			if item.CodeAction != nil && item.CodeAction.Kind != nil && *item.CodeAction.Kind == lsproto.CodeActionKindQuickFix {
				if item.CodeAction.Edit != nil && item.CodeAction.Edit.Changes != nil {
					for _, changeEdits := range *item.CodeAction.Edit.Changes {
						for _, edit := range changeEdits {
							moduleSpec := extractModuleSpecifier(edit.NewText)
							if moduleSpec != "" {
								if !slices.Contains(actualModuleSpecifiers, moduleSpec) {
									actualModuleSpecifiers = append(actualModuleSpecifiers, moduleSpec)
								}
							}
						}
					}
				}
			}
		}
	}

	// Compare results
	if len(actualModuleSpecifiers) != len(expectedModuleSpecifiers) {
		t.Fatalf("Expected %d module specifiers, got %d.\nExpected: %v\nActual: %v",
			len(expectedModuleSpecifiers), len(actualModuleSpecifiers),
			expectedModuleSpecifiers, actualModuleSpecifiers)
	}

	for i, expected := range expectedModuleSpecifiers {
		if i >= len(actualModuleSpecifiers) || actualModuleSpecifiers[i] != expected {
			t.Fatalf("Module specifier mismatch at index %d.\nExpected: %v\nActual: %v",
				i, expectedModuleSpecifiers, actualModuleSpecifiers)
		}
	}
}

func extractModuleSpecifier(text string) string {
	// Try to match: from "..." or from '...'
	if idx := strings.Index(text, "from \""); idx != -1 {
		start := idx + 6 // len("from \"")
		if end := strings.Index(text[start:], "\""); end != -1 {
			return text[start : start+end]
		}
	}
	if idx := strings.Index(text, "from '"); idx != -1 {
		start := idx + 6 // len("from '")
		if end := strings.Index(text[start:], "'"); end != -1 {
			return text[start : start+end]
		}
	}

	// Try to match: require("...") or require('...')
	if idx := strings.Index(text, "require(\""); idx != -1 {
		start := idx + 9 // len("require(\"")
		if end := strings.Index(text[start:], "\""); end != -1 {
			return text[start : start+end]
		}
	}
	if idx := strings.Index(text, "require('"); idx != -1 {
		start := idx + 9 // len("require('")
		if end := strings.Index(text[start:], "'"); end != -1 {
			return text[start : start+end]
		}
	}

	return ""
}

func (f *FourslashTest) VerifyBaselineFindAllReferences(
	t *testing.T,
	markers ...string,
) {
	referenceLocations := f.lookupMarkersOrGetRanges(t, markers)

	for _, markerOrRange := range referenceLocations {
		// worker in `baselineEachMarkerOrRange`
		f.GoToMarkerOrRange(t, markerOrRange)

		params := &lsproto.ReferenceParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
			},
			Position: f.currentCaretPosition,
			Context: &lsproto.ReferenceContext{
				IncludeDeclaration: true,
			},
		}
		result := sendRequest(t, f, lsproto.TextDocumentReferencesInfo, params)
		f.addResultToBaseline(t, findAllReferencesCmd, f.getBaselineForLocationsWithFileContents(*result.Locations, baselineFourslashLocationsOptions{
			marker:     markerOrRange,
			markerName: "/*FIND ALL REFS*/",
		}))

	}
}

func (f *FourslashTest) VerifyBaselineCodeLens(t *testing.T, preferences *lsutil.UserPreferences) {
	if preferences != nil {
		reset := f.ConfigureWithReset(t, preferences)
		defer reset()
	}

	foundAtLeastOneCodeLens := false
	for _, openFile := range slices.Sorted(maps.Keys(f.openFiles)) {
		params := &lsproto.CodeLensParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: lsconv.FileNameToDocumentURI(openFile),
			},
		}

		unresolvedCodeLensList := sendRequest(t, f, lsproto.TextDocumentCodeLensInfo, params)
		if unresolvedCodeLensList.CodeLenses == nil || len(*unresolvedCodeLensList.CodeLenses) == 0 {
			continue
		}
		foundAtLeastOneCodeLens = true

		for _, unresolvedCodeLens := range *unresolvedCodeLensList.CodeLenses {
			assert.Assert(t, unresolvedCodeLens != nil)
			resolvedCodeLens := sendRequest(t, f, lsproto.CodeLensResolveInfo, unresolvedCodeLens)
			assert.Assert(t, resolvedCodeLens != nil)
			assert.Assert(t, resolvedCodeLens.Command != nil, "Expected resolved code lens to have a command.")
			if len(resolvedCodeLens.Command.Command) > 0 {
				assert.Equal(t, resolvedCodeLens.Command.Command, showCodeLensLocationsCommandName)
			}

			var locations []lsproto.Location
			// commandArgs: (DocumentUri, Position, Location[])
			if commandArgs := resolvedCodeLens.Command.Arguments; commandArgs != nil {
				locs, err := roundtripThroughJson[[]lsproto.Location]((*commandArgs)[2])
				if err != nil {
					t.Fatalf("failed to re-encode code lens locations: %v", err)
				}
				locations = locs
			}

			f.addResultToBaseline(t, codeLensesCmd, f.getBaselineForLocationsWithFileContents(locations, baselineFourslashLocationsOptions{
				marker: &RangeMarker{
					fileName: openFile,
					LSRange:  resolvedCodeLens.Range,
					Range:    f.converters.FromLSPRange(f.getScriptInfo(openFile), resolvedCodeLens.Range),
				},
				markerName: "/*CODELENS: " + resolvedCodeLens.Command.Title + "*/",
			}))
		}
	}

	if !foundAtLeastOneCodeLens {
		t.Fatalf("Expected at least one code lens in any open file, but got none.")
	}
}

func (f *FourslashTest) MarkTestAsStradaServer() {
	f.isStradaServer = true
}

func (f *FourslashTest) VerifyBaselineGoToDefinition(
	t *testing.T,
	includeOriginalSelectionRange bool,
	markers ...string,
) {
	f.verifyBaselineDefinitions(
		t,
		goToDefinitionCmd,
		"/*GOTO DEF*/", /*definitionMarker*/
		func(t *testing.T, f *FourslashTest, fileName string, position lsproto.Position) lsproto.LocationOrLocationsOrDefinitionLinksOrNull {
			params := &lsproto.DefinitionParams{
				TextDocument: lsproto.TextDocumentIdentifier{
					Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
				},
				Position: f.currentCaretPosition,
			}

			return sendRequest(t, f, lsproto.TextDocumentDefinitionInfo, params)
		},
		includeOriginalSelectionRange,
		markers...,
	)
}

func (f *FourslashTest) verifyBaselineDefinitions(
	t *testing.T,
	definitionCommand baselineCommand,
	definitionMarker string,
	getDefinitions func(t *testing.T, f *FourslashTest, fileName string, position lsproto.Position) lsproto.LocationOrLocationsOrDefinitionLinksOrNull,
	includeOriginalSelectionRange bool,
	markers ...string,
) {
	referenceLocations := f.lookupMarkersOrGetRanges(t, markers)

	for _, markerOrRange := range referenceLocations {
		// worker in `baselineEachMarkerOrRange`
		f.GoToMarkerOrRange(t, markerOrRange)

		result := getDefinitions(t, f, f.activeFilename, f.currentCaretPosition)

		var resultAsSpans []documentSpan
		var additionalSpan *documentSpan
		if result.Locations != nil {
			resultAsSpans = core.Map(*result.Locations, locationToSpan)
		} else if result.Location != nil {
			resultAsSpans = []documentSpan{locationToSpan(*result.Location)}
		} else if result.DefinitionLinks != nil {
			var originRange *lsproto.Range
			resultAsSpans = core.Map(*result.DefinitionLinks, func(link *lsproto.LocationLink) documentSpan {
				if originRange != nil && originRange != link.OriginSelectionRange {
					panic("multiple different origin ranges in definition links")
				}
				originRange = link.OriginSelectionRange
				var contextSpan *lsproto.Range
				if link.TargetRange != link.TargetSelectionRange && !f.isStradaServer {
					contextSpan = &link.TargetRange
				}
				return documentSpan{
					uri:         link.TargetUri,
					textSpan:    link.TargetSelectionRange,
					contextSpan: contextSpan,
				}
			})
			if originRange != nil && includeOriginalSelectionRange {
				additionalSpan = &documentSpan{
					uri:      lsconv.FileNameToDocumentURI(f.activeFilename),
					textSpan: *originRange,
				}
			}
		}

		f.addResultToBaseline(t, definitionCommand, f.getBaselineForSpansWithFileContents(resultAsSpans, baselineFourslashLocationsOptions{
			marker:         markerOrRange,
			markerName:     definitionMarker,
			additionalSpan: additionalSpan,
		}))
	}
}

func (f *FourslashTest) VerifyBaselineGoToTypeDefinition(
	t *testing.T,
	markers ...string,
) {
	f.verifyBaselineDefinitions(
		t,
		goToTypeDefinitionCmd,
		"/*GOTO TYPE*/", /*definitionMarker*/
		func(t *testing.T, f *FourslashTest, fileName string, position lsproto.Position) lsproto.LocationOrLocationsOrDefinitionLinksOrNull {
			params := &lsproto.TypeDefinitionParams{
				TextDocument: lsproto.TextDocumentIdentifier{
					Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
				},
				Position: f.currentCaretPosition,
			}

			return sendRequest(t, f, lsproto.TextDocumentTypeDefinitionInfo, params)
		},
		false, /*includeOriginalSelectionRange*/
		markers...,
	)
}

func (f *FourslashTest) VerifyBaselineWorkspaceSymbol(t *testing.T, query string) {
	t.Helper()
	result := sendRequest(t, f, lsproto.WorkspaceSymbolInfo, &lsproto.WorkspaceSymbolParams{Query: query})

	locationToText := map[documentSpan]*lsproto.SymbolInformation{}
	groupedRanges := collections.MultiMap[lsproto.DocumentUri, documentSpan]{}
	var symbolInformations []*lsproto.SymbolInformation
	if result.SymbolInformations != nil {
		symbolInformations = *result.SymbolInformations
	}
	for _, symbol := range symbolInformations {
		uri := symbol.Location.Uri
		span := locationToSpan(symbol.Location)
		groupedRanges.Add(uri, span)
		locationToText[span] = symbol
	}

	f.addResultToBaseline(t, "workspaceSymbol", f.getBaselineForGroupedSpansWithFileContents(
		&groupedRanges,
		baselineFourslashLocationsOptions{
			getLocationData: func(span documentSpan) string { return symbolInformationToData(locationToText[span]) },
		},
	))
}

func (f *FourslashTest) VerifyOutliningSpans(t *testing.T, foldingRangeKind ...lsproto.FoldingRangeKind) {
	params := &lsproto.FoldingRangeParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
	}
	result := sendRequest(t, f, lsproto.TextDocumentFoldingRangeInfo, params)
	if result.FoldingRanges == nil {
		t.Fatalf("Nil response received for folding range request")
	}

	// Extract actual folding ranges from the result and filter by kind if specified
	var actualRanges []*lsproto.FoldingRange
	actualRanges = *result.FoldingRanges
	if len(foldingRangeKind) > 0 {
		targetKind := foldingRangeKind[0]
		var filtered []*lsproto.FoldingRange
		for _, r := range actualRanges {
			if r.Kind != nil && *r.Kind == targetKind {
				filtered = append(filtered, r)
			}
		}
		actualRanges = filtered
	}

	if len(actualRanges) != len(f.Ranges()) {
		t.Fatalf("verifyOutliningSpans failed - expected total spans to be %d, but was %d",
			len(f.Ranges()), len(actualRanges))
	}

	slices.SortFunc(f.Ranges(), func(a, b *RangeMarker) int {
		return lsproto.ComparePositions(a.LSPos(), b.LSPos())
	})

	for i, expectedRange := range f.Ranges() {
		actualRange := actualRanges[i]
		startPos := lsproto.Position{Line: actualRange.StartLine, Character: *actualRange.StartCharacter}
		endPos := lsproto.Position{Line: actualRange.EndLine, Character: *actualRange.EndCharacter}

		if lsproto.ComparePositions(startPos, expectedRange.LSRange.Start) != 0 ||
			lsproto.ComparePositions(endPos, expectedRange.LSRange.End) != 0 {
			t.Fatalf("verifyOutliningSpans failed - span %d has invalid positions:\n  actual: start (%d,%d), end (%d,%d)\n  expected: start (%d,%d), end (%d,%d)",
				i+1,
				actualRange.StartLine, *actualRange.StartCharacter, actualRange.EndLine, *actualRange.EndCharacter,
				expectedRange.LSRange.Start.Line, expectedRange.LSRange.Start.Character, expectedRange.LSRange.End.Line, expectedRange.LSRange.End.Character)
		}
	}
}

// FoldingRangeLineExpected represents expected start and end lines for a folding range.
type FoldingRangeLineExpected struct {
	StartLine uint32
	EndLine   uint32
}

// VerifyFoldingRangeLines verifies folding ranges by comparing only start and end lines.
// This is useful for testing with lineFoldingOnly where character positions are ignored.
func (f *FourslashTest) VerifyFoldingRangeLines(t *testing.T, expected []FoldingRangeLineExpected) {
	params := &lsproto.FoldingRangeParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
	}
	result := sendRequest(t, f, lsproto.TextDocumentFoldingRangeInfo, params)
	if result.FoldingRanges == nil {
		t.Fatalf("Nil response received for folding range request")
	}

	actualRanges := *result.FoldingRanges
	if len(actualRanges) != len(expected) {
		t.Fatalf("verifyFoldingRangeLines failed - expected %d ranges, got %d", len(expected), len(actualRanges))
	}

	for i, exp := range expected {
		got := actualRanges[i]
		if got.StartLine != exp.StartLine || got.EndLine != exp.EndLine {
			t.Errorf("verifyFoldingRangeLines failed - range %d: expected (startLine=%d, endLine=%d), got (startLine=%d, endLine=%d)",
				i, exp.StartLine, exp.EndLine, got.StartLine, got.EndLine)
		}
	}
}

func (f *FourslashTest) VerifyBaselineHover(t *testing.T) {
	markersAndItems := core.MapFiltered(f.Markers(), func(marker *Marker) (markerAndItem[*lsproto.Hover], bool) {
		if marker.Name == nil {
			return markerAndItem[*lsproto.Hover]{}, false
		}

		params := &lsproto.HoverParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: lsconv.FileNameToDocumentURI(marker.fileName),
			},
			Position: marker.LSPosition,
		}

		result := sendRequest(t, f, lsproto.TextDocumentHoverInfo, params)
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

	f.addResultToBaseline(t, quickInfoCmd, annotateContentWithTooltips(t, f, markersAndItems, "quickinfo", getRange, getTooltipLines))
	if jsonStr, err := core.StringifyJson(markersAndItems, "", "  "); err == nil {
		f.writeToBaseline(quickInfoCmd, jsonStr)
	} else {
		t.Fatalf("Failed to stringify markers and items for baseline: %v", err)
	}
}

func appendLinesForMarkedStringWithLanguage(result []string, ms *lsproto.MarkedStringWithLanguage) []string {
	result = append(result, "```"+ms.Language)
	result = append(result, ms.Value)
	result = append(result, "```")
	return result
}

func (f *FourslashTest) VerifyBaselineSignatureHelp(t *testing.T) {
	markersAndItems := core.MapFiltered(f.Markers(), func(marker *Marker) (markerAndItem[*lsproto.SignatureHelp], bool) {
		if marker.Name == nil {
			return markerAndItem[*lsproto.SignatureHelp]{}, false
		}

		params := &lsproto.SignatureHelpParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: lsconv.FileNameToDocumentURI(marker.FileName()),
			},
			Position: marker.LSPosition,
		}

		result := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)
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

		// Determine active parameter: per-signature takes precedence over top-level per LSP spec
		// "If provided (or `null`), this is used in place of `SignatureHelp.activeParameter`."
		var activeParamPtr *lsproto.UintegerOrNull
		if sig.ActiveParameter != nil {
			activeParamPtr = sig.ActiveParameter
		} else {
			activeParamPtr = item.ActiveParameter
		}

		// Show active parameter if specified, and the signature text.
		if activeParamPtr != nil && activeParamPtr.Uinteger != nil && sig.Parameters != nil {
			activeParamIndex := int(*activeParamPtr.Uinteger)
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

	f.addResultToBaseline(t, signatureHelpCmd, annotateContentWithTooltips(t, f, markersAndItems, "signaturehelp", getRange, getTooltipLines))
	if jsonStr, err := core.StringifyJson(markersAndItems, "", "  "); err == nil {
		f.writeToBaseline(signatureHelpCmd, jsonStr)
	} else {
		t.Fatalf("Failed to stringify markers and items for baseline: %v", err)
	}
}

func (f *FourslashTest) VerifyBaselineSelectionRanges(t *testing.T) {
	markers := f.Markers()
	var result strings.Builder
	newLine := "\n"

	for i, marker := range markers {
		if i > 0 {
			result.WriteString(newLine + strings.Repeat("=", 80) + newLine + newLine)
		}

		script := f.getScriptInfo(marker.FileName())
		fileContent := script.content

		// Add the marker position indicator
		markerPos := marker.Position
		baselineContent := fileContent[:markerPos] + "/**/" + fileContent[markerPos:] + newLine
		result.WriteString(baselineContent)

		// Get selection ranges at this marker
		params := &lsproto.SelectionRangeParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: lsconv.FileNameToDocumentURI(marker.FileName()),
			},
			Positions: []lsproto.Position{marker.LSPosition},
		}

		selectionRangeResult := sendRequest(t, f, lsproto.TextDocumentSelectionRangeInfo, params)

		if selectionRangeResult.SelectionRanges == nil || len(*selectionRangeResult.SelectionRanges) == 0 {
			result.WriteString("No selection ranges available\n")
			continue
		}

		selectionRange := (*selectionRangeResult.SelectionRanges)[0]

		// Add blank line after source code section
		result.WriteString(newLine)

		// Walk through the selection range chain
		for selectionRange != nil {
			start := int(f.converters.LineAndCharacterToPosition(script, selectionRange.Range.Start))
			end := int(f.converters.LineAndCharacterToPosition(script, selectionRange.Range.End))

			// Create a masked version of the file showing only this range
			runes := []rune(fileContent)
			masked := make([]rune, len(runes))
			for i, ch := range runes {
				if i >= start && i < end {
					// Keep characters in the selection range
					if ch == ' ' {
						masked[i] = '•'
					} else if ch == '\n' || ch == '\r' {
						masked[i] = ch // Keep line breaks as-is, will add arrow later
					} else {
						masked[i] = ch
					}
				} else {
					// Replace characters outside the range
					if ch == '\n' || ch == '\r' {
						masked[i] = ch
					} else {
						masked[i] = ' '
					}
				}
			}

			maskedStr := string(masked)

			// Add line break arrows
			maskedStr = strings.ReplaceAll(maskedStr, "\n", "↲\n")
			maskedStr = strings.ReplaceAll(maskedStr, "\r", "↲\r")

			// Remove blank lines
			lines := strings.Split(maskedStr, "\n")
			var nonBlankLines []string
			for _, line := range lines {
				trimmed := strings.TrimSpace(line)
				if trimmed != "" && trimmed != "↲" {
					nonBlankLines = append(nonBlankLines, line)
				}
			}
			maskedStr = strings.Join(nonBlankLines, "\n")

			// Find leading and trailing width of non-whitespace characters
			maskedRunes := []rune(maskedStr)
			isRealCharacter := func(ch rune) bool {
				return ch != '•' && ch != '↲' && !stringutil.IsWhiteSpaceLike(ch)
			}

			leadingWidth := -1
			for i, ch := range maskedRunes {
				if isRealCharacter(ch) {
					leadingWidth = i
					break
				}
			}

			trailingWidth := -1
			for j := len(maskedRunes) - 1; j >= 0; j-- {
				if isRealCharacter(maskedRunes[j]) {
					trailingWidth = j
					break
				}
			}

			if leadingWidth != -1 && trailingWidth != -1 && leadingWidth <= trailingWidth {
				// Clean up middle section
				prefix := string(maskedRunes[:leadingWidth])
				middle := string(maskedRunes[leadingWidth : trailingWidth+1])
				suffix := string(maskedRunes[trailingWidth+1:])

				middle = strings.ReplaceAll(middle, "•", " ")
				middle = strings.ReplaceAll(middle, "↲", "")

				maskedStr = prefix + middle + suffix
			}

			// Add blank line before multi-line ranges
			if strings.Contains(maskedStr, "\n") {
				result.WriteString(newLine)
			}

			result.WriteString(maskedStr)
			if !strings.HasSuffix(maskedStr, "\n") {
				result.WriteString(newLine)
			}

			selectionRange = selectionRange.Parent
		}
	}
	f.addResultToBaseline(t, smartSelectionCmd, strings.TrimSuffix(result.String(), "\n"))
}

func (f *FourslashTest) VerifyBaselineCallHierarchy(t *testing.T) {
	fileName := f.activeFilename
	position := f.currentCaretPosition

	params := &lsproto.CallHierarchyPrepareParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(fileName),
		},
		Position: position,
	}

	prepareResult := sendRequest(t, f, lsproto.TextDocumentPrepareCallHierarchyInfo, params)
	if prepareResult.CallHierarchyItems == nil || len(*prepareResult.CallHierarchyItems) == 0 {
		f.addResultToBaseline(t, callHierarchyCmd, "No call hierarchy items available")
		return
	}

	var result strings.Builder

	for _, callHierarchyItem := range *prepareResult.CallHierarchyItems {
		seen := make(map[callHierarchyItemKey]bool)
		itemFileName := callHierarchyItem.Uri.FileName()
		script := f.getScriptInfo(itemFileName)
		formatCallHierarchyItem(t, f, script, &result, *callHierarchyItem, callHierarchyItemDirectionRoot, seen, "")
	}

	f.addResultToBaseline(t, callHierarchyCmd, strings.TrimSuffix(result.String(), "\n"))
}

type callHierarchyItemDirection int

const (
	callHierarchyItemDirectionRoot callHierarchyItemDirection = iota
	callHierarchyItemDirectionIncoming
	callHierarchyItemDirectionOutgoing
)

type callHierarchyItemKey struct {
	uri       lsproto.DocumentUri
	range_    lsproto.Range
	direction callHierarchyItemDirection
}

func symbolKindToLowercase(kind lsproto.SymbolKind) string {
	return strings.ToLower(kind.String())
}

func formatCallHierarchyItem(
	t *testing.T,
	f *FourslashTest,
	file *scriptInfo,
	result *strings.Builder,
	callHierarchyItem lsproto.CallHierarchyItem,
	direction callHierarchyItemDirection,
	seen map[callHierarchyItemKey]bool,
	prefix string,
) {
	key := callHierarchyItemKey{
		uri:       callHierarchyItem.Uri,
		range_:    callHierarchyItem.Range,
		direction: direction,
	}
	alreadySeen := seen[key]
	seen[key] = true

	type incomingCallResult struct {
		skip   bool
		seen   bool
		values []*lsproto.CallHierarchyIncomingCall
	}
	type outgoingCallResult struct {
		skip   bool
		seen   bool
		values []*lsproto.CallHierarchyOutgoingCall
	}

	var incomingCalls incomingCallResult
	var outgoingCalls outgoingCallResult

	if direction == callHierarchyItemDirectionOutgoing {
		incomingCalls.skip = true
	} else if alreadySeen {
		incomingCalls.seen = true
	} else {
		incomingParams := &lsproto.CallHierarchyIncomingCallsParams{
			Item: &callHierarchyItem,
		}
		incomingResult := sendRequest(t, f, lsproto.CallHierarchyIncomingCallsInfo, incomingParams)
		if incomingResult.CallHierarchyIncomingCalls != nil {
			incomingCalls.values = *incomingResult.CallHierarchyIncomingCalls
		}
	}

	if direction == callHierarchyItemDirectionIncoming {
		outgoingCalls.skip = true
	} else if alreadySeen {
		outgoingCalls.seen = true
	} else {
		outgoingParams := &lsproto.CallHierarchyOutgoingCallsParams{
			Item: &callHierarchyItem,
		}
		outgoingResult := sendRequest(t, f, lsproto.CallHierarchyOutgoingCallsInfo, outgoingParams)
		if outgoingResult.CallHierarchyOutgoingCalls != nil {
			outgoingCalls.values = *outgoingResult.CallHierarchyOutgoingCalls
		}
	}

	trailingPrefix := prefix
	result.WriteString(fmt.Sprintf("%s╭ name: %s\n", prefix, callHierarchyItem.Name))
	result.WriteString(fmt.Sprintf("%s├ kind: %s\n", prefix, symbolKindToLowercase(callHierarchyItem.Kind)))
	if callHierarchyItem.Detail != nil && *callHierarchyItem.Detail != "" {
		result.WriteString(fmt.Sprintf("%s├ containerName: %s\n", prefix, *callHierarchyItem.Detail))
	}
	result.WriteString(fmt.Sprintf("%s├ file: %s\n", prefix, callHierarchyItem.Uri.FileName()))
	result.WriteString(prefix + "├ span:\n")
	formatCallHierarchyItemSpan(f, file, result, callHierarchyItem.Range, prefix+"│ ", prefix+"│ ")
	result.WriteString(prefix + "├ selectionSpan:\n")
	formatCallHierarchyItemSpan(f, file, result, callHierarchyItem.SelectionRange, prefix+"│ ", prefix+"│ ")

	// Handle incoming calls
	if incomingCalls.seen {
		if outgoingCalls.skip {
			result.WriteString(trailingPrefix + "╰ incoming: ...\n")
		} else {
			result.WriteString(prefix + "├ incoming: ...\n")
		}
	} else if !incomingCalls.skip {
		if len(incomingCalls.values) == 0 {
			if outgoingCalls.skip {
				result.WriteString(trailingPrefix + "╰ incoming: none\n")
			} else {
				result.WriteString(prefix + "├ incoming: none\n")
			}
		} else {
			result.WriteString(prefix + "├ incoming:\n")
			for i, incomingCall := range incomingCalls.values {
				fromFileName := incomingCall.From.Uri.FileName()
				fromFile := f.getScriptInfo(fromFileName)
				result.WriteString(prefix + "│ ╭ from:\n")
				formatCallHierarchyItem(t, f, fromFile, result, *incomingCall.From, callHierarchyItemDirectionIncoming, seen, prefix+"│ │ ")
				result.WriteString(prefix + "│ ├ fromSpans:\n")

				fromSpansTrailingPrefix := trailingPrefix + "╰ ╰ "
				if i < len(incomingCalls.values)-1 {
					fromSpansTrailingPrefix = prefix + "│ ╰ "
				} else if !outgoingCalls.skip && (!outgoingCalls.seen || len(outgoingCalls.values) > 0) {
					fromSpansTrailingPrefix = prefix + "│ ╰ "
				}
				formatCallHierarchyItemSpans(f, fromFile, result, incomingCall.FromRanges, prefix+"│ │ ", fromSpansTrailingPrefix)
			}
		}
	}

	// Handle outgoing calls
	if outgoingCalls.seen {
		result.WriteString(trailingPrefix + "╰ outgoing: ...\n")
	} else if !outgoingCalls.skip {
		if len(outgoingCalls.values) == 0 {
			result.WriteString(trailingPrefix + "╰ outgoing: none\n")
		} else {
			result.WriteString(prefix + "├ outgoing:\n")
			for i, outgoingCall := range outgoingCalls.values {
				toFileName := outgoingCall.To.Uri.FileName()
				toFile := f.getScriptInfo(toFileName)
				result.WriteString(prefix + "│ ╭ to:\n")
				formatCallHierarchyItem(t, f, toFile, result, *outgoingCall.To, callHierarchyItemDirectionOutgoing, seen, prefix+"│ │ ")
				result.WriteString(prefix + "│ ├ fromSpans:\n")

				fromSpansTrailingPrefix := trailingPrefix + "╰ ╰ "
				if i < len(outgoingCalls.values)-1 {
					fromSpansTrailingPrefix = prefix + "│ ╰ "
				}
				formatCallHierarchyItemSpans(f, file, result, outgoingCall.FromRanges, prefix+"│ │ ", fromSpansTrailingPrefix)
			}
		}
	}
}

func formatCallHierarchyItemSpan(
	f *FourslashTest,
	file *scriptInfo,
	result *strings.Builder,
	span lsproto.Range,
	prefix string,
	closingPrefix string,
) {
	startLc := span.Start
	endLc := span.End
	startPos := f.converters.LineAndCharacterToPosition(file, span.Start)
	endPos := f.converters.LineAndCharacterToPosition(file, span.End)

	// Compute line starts for the file
	lineStarts := computeLineStarts(file.content)

	// Find the line boundaries - expand to full lines
	contextStart := int(startPos)
	contextEnd := int(endPos)

	// Expand to start of first line
	for contextStart > 0 && file.content[contextStart-1] != '\n' && file.content[contextStart-1] != '\r' {
		contextStart--
	}

	// Expand to end of last line
	for contextEnd < len(file.content) && file.content[contextEnd] != '\n' && file.content[contextEnd] != '\r' {
		contextEnd++
	}

	// Get actual line and character positions for the context
	contextStartLine := int(startLc.Line)
	contextEndLine := int(endLc.Line)

	// Calculate line number padding
	lineNumWidth := len(strconv.Itoa(contextEndLine+1)) + 2

	result.WriteString(fmt.Sprintf("%s╭ %s:%d:%d-%d:%d\n", prefix, file.fileName, startLc.Line+1, startLc.Character+1, endLc.Line+1, endLc.Character+1))

	for lineNum := contextStartLine; lineNum <= contextEndLine; lineNum++ {
		lineStart := lineStarts[lineNum]
		lineEnd := len(file.content)
		if lineNum+1 < len(lineStarts) {
			lineEnd = lineStarts[lineNum+1]
		}

		// Get the line content, trimming trailing newlines
		lineContent := file.content[lineStart:lineEnd]
		lineContent = strings.TrimRight(lineContent, "\r\n")

		// Format with line number
		lineNumStr := fmt.Sprintf("%d:", lineNum+1)
		paddedLineNum := strings.Repeat(" ", lineNumWidth-len(lineNumStr)-1) + lineNumStr
		if lineContent == "" {
			result.WriteString(fmt.Sprintf("%s│ %s\n", prefix, paddedLineNum))
		} else {
			result.WriteString(fmt.Sprintf("%s│ %s %s\n", prefix, paddedLineNum, lineContent))
		}

		// Add selection carets if this line contains part of the span
		if lineNum >= int(startLc.Line) && lineNum <= int(endLc.Line) {
			selStart := 0
			selEnd := len(lineContent)

			if lineNum == int(startLc.Line) {
				selStart = int(startLc.Character)
			}
			if lineNum == int(endLc.Line) {
				selEnd = int(endLc.Character)
			}

			// Don't show carets for empty selections
			isEmpty := startLc.Line == endLc.Line && startLc.Character == endLc.Character
			if isEmpty {
				// For empty selections, show a single "<" character
				padding := strings.Repeat(" ", lineNumWidth+selStart)
				result.WriteString(fmt.Sprintf("%s│ %s<\n", prefix, padding))
			} else {
				// Calculate selection length (at least 1)
				selLength := selEnd - selStart
				selLength = max(selLength, 1) // Trim to actual content on the line
				if lineNum < int(endLc.Line) {
					// For lines before the last, trim to line content length
					if selEnd > len(lineContent) {
						selEnd = len(lineContent)
						selLength = selEnd - selStart
					}
				}

				padding := strings.Repeat(" ", lineNumWidth+selStart)
				carets := strings.Repeat("^", selLength)
				result.WriteString(fmt.Sprintf("%s│ %s%s\n", prefix, padding, carets))
			}
		}
	}

	result.WriteString(closingPrefix + "╰\n")
}

func computeLineStarts(content string) []int {
	lineStarts := []int{0}
	for i, ch := range content {
		if ch == '\n' {
			lineStarts = append(lineStarts, i+1)
		}
	}
	return lineStarts
}

func formatCallHierarchyItemSpans(
	f *FourslashTest,
	file *scriptInfo,
	result *strings.Builder,
	spans []lsproto.Range,
	prefix string,
	trailingPrefix string,
) {
	for i, span := range spans {
		closingPrefix := prefix
		if i == len(spans)-1 {
			closingPrefix = trailingPrefix
		}
		formatCallHierarchyItemSpan(f, file, result, span, prefix, closingPrefix)
	}
}

func (f *FourslashTest) VerifyBaselineDocumentHighlights(
	t *testing.T,
	preferences *lsutil.UserPreferences,
	markerOrRangeOrNames ...MarkerOrRangeOrName,
) {
	var markerOrRanges []MarkerOrRange
	for _, markerOrRangeOrName := range markerOrRangeOrNames {
		switch markerOrNameOrRange := markerOrRangeOrName.(type) {
		case string:
			marker, ok := f.testData.MarkerPositions[markerOrNameOrRange]
			if !ok {
				t.Fatalf("Marker '%s' not found", markerOrNameOrRange)
			}
			markerOrRanges = append(markerOrRanges, marker)
		case *Marker:
			markerOrRanges = append(markerOrRanges, markerOrNameOrRange)
		case *RangeMarker:
			markerOrRanges = append(markerOrRanges, markerOrNameOrRange)
		default:
			t.Fatalf("Invalid marker or range type: %T. Expected string, *Marker, or *RangeMarker.", markerOrNameOrRange)
		}
	}

	f.verifyBaselineDocumentHighlights(t, preferences, markerOrRanges)
}

func (f *FourslashTest) verifyBaselineDocumentHighlights(
	t *testing.T,
	preferences *lsutil.UserPreferences,
	markerOrRanges []MarkerOrRange,
) {
	for _, markerOrRange := range markerOrRanges {
		f.goToMarker(t, markerOrRange)

		params := &lsproto.DocumentHighlightParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
			},
			Position: f.currentCaretPosition,
		}
		result := sendRequest(t, f, lsproto.TextDocumentDocumentHighlightInfo, params)
		highlights := result.DocumentHighlights
		if highlights == nil {
			highlights = &[]*lsproto.DocumentHighlight{}
		}

		var spans []lsproto.Location
		for _, h := range *highlights {
			spans = append(spans, lsproto.Location{
				Uri:   lsconv.FileNameToDocumentURI(f.activeFilename),
				Range: h.Range,
			})
		}

		// Add result to baseline
		f.addResultToBaseline(t, documentHighlightsCmd, f.getBaselineForLocationsWithFileContents(spans, baselineFourslashLocationsOptions{
			marker:     markerOrRange,
			markerName: "/*HIGHLIGHTS*/",
		}))
	}
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

// This function is intended for spots where a complex
// value needs to be reinterpreted following some prior JSON deserialization.
// The default deserializer for `any` properties will give us a map at runtime,
// but we want to validate against, and use, the types as returned from the the language service.
//
// Use this function sparingly. You can treat it as a "map-to-struct" converter,
// but updating the original types is probably better in most cases.
func roundtripThroughJson[T any](value any) (T, error) {
	var result T
	bytes, err := json.Marshal(value)
	if err != nil {
		return result, fmt.Errorf("failed to marshal value to JSON: %w", err)
	}
	if err := json.Unmarshal(bytes, &result); err != nil {
		return result, fmt.Errorf("failed to unmarshal value from JSON: %w", err)
	}
	return result, nil
}

// Insert text at the current caret position.
func (f *FourslashTest) Insert(t *testing.T, text string) {
	t.Helper()
	f.baselineState(t)
	f.typeText(t, text)
}

// Insert text and a new line at the current caret position.
func (f *FourslashTest) InsertLine(t *testing.T, text string) {
	t.Helper()
	f.baselineState(t)
	f.typeText(t, text+"\n")
}

// Removes the text at the current caret position as if the user pressed backspace `count` times.
func (f *FourslashTest) Backspace(t *testing.T, count int) {
	script := f.getScriptInfo(f.activeFilename)
	offset := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))
	f.baselineState(t)

	for range count {
		offset--
		f.editScriptAndUpdateMarkers(t, f.activeFilename, offset, offset+1, "")
		f.currentCaretPosition = f.converters.PositionToLineAndCharacter(script, core.TextPos(offset))
		// Don't need to examine formatting because there are no formatting changes on backspace.
	}

	// f.checkPostEditInvariants() // !!! do we need this?
}

// DeleteAtCaret removes the text at the current caret position as if the user pressed delete `count` times.
func (f *FourslashTest) DeleteAtCaret(t *testing.T, count int) {
	script := f.getScriptInfo(f.activeFilename)
	offset := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))
	f.baselineState(t)

	for range count {
		f.editScriptAndUpdateMarkers(t, f.activeFilename, offset, offset+1, "")
		// Position stays the same after delete (unlike backspace)
	}
}

// Enters text as if the user had pasted it.
func (f *FourslashTest) Paste(t *testing.T, text string) {
	script := f.getScriptInfo(f.activeFilename)
	start := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))
	f.baselineState(t)
	f.editScriptAndUpdateMarkers(t, f.activeFilename, start, start, text)

	// post-paste fomatting
	if f.stateEnableFormatting {
		result := sendRequestAndBaselineWorker(t, f, lsproto.TextDocumentRangeFormattingInfo, &lsproto.DocumentRangeFormattingParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
			},
			Range: lsproto.Range{
				Start: f.currentCaretPosition,
				End:   f.converters.PositionToLineAndCharacter(script, core.TextPos(start+len(text))),
			},
			Options: f.userPreferences.FormatCodeSettings.ToLSFormatOptions(),
		}, false)
		if result.TextEdits != nil {
			f.applyTextEdits(t, *result.TextEdits)
		}
	}
	// this.checkPostEditInvariants(); // !!! do we need this?
}

// Selects a line and replaces it with a new text.
func (f *FourslashTest) ReplaceLine(t *testing.T, lineIndex int, text string) {
	f.baselineState(t)
	f.selectLine(t, lineIndex)
	f.typeText(t, text)
}

func (f *FourslashTest) selectLine(t *testing.T, lineIndex int) {
	script := f.getScriptInfo(f.activeFilename)
	start := script.lineMap.LineStarts[lineIndex]
	var end core.TextPos
	if lineIndex+1 >= len(script.lineMap.LineStarts) {
		end = core.TextPos(len(script.content))
	} else {
		end = script.lineMap.LineStarts[lineIndex+1] - 1
	}
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

// Updates f.currentCaretPosition
func (f *FourslashTest) applyTextEdits(t *testing.T, edits []*lsproto.TextEdit) int {
	script := f.getScriptInfo(f.activeFilename)
	slices.SortFunc(edits, func(a, b *lsproto.TextEdit) int {
		aStart := f.converters.LineAndCharacterToPosition(script, a.Range.Start)
		bStart := f.converters.LineAndCharacterToPosition(script, b.Range.Start)
		return int(aStart) - int(bStart)
	})

	totalOffset := 0
	currentCaretPosition := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))
	// Apply edits in reverse order to avoid affecting the positions of earlier edits.
	for i := len(edits) - 1; i >= 0; i-- {
		edit := edits[i]
		start := int(f.converters.LineAndCharacterToPosition(script, edit.Range.Start))
		end := int(f.converters.LineAndCharacterToPosition(script, edit.Range.End))
		f.editScriptAndUpdateMarkers(t, f.activeFilename, start, end, edit.NewText)

		delta := len(edit.NewText) - (end - start)
		if start <= currentCaretPosition {
			if end <= currentCaretPosition {
				// The entirety of the edit span falls before the caret position, shift the caret accordingly
				currentCaretPosition += delta
			} else {
				// The span being replaced includes the caret position, place the caret at the beginning of the span
				currentCaretPosition = start
			}
		}
		totalOffset += delta
	}
	f.currentCaretPosition = f.converters.PositionToLineAndCharacter(script, core.TextPos(currentCaretPosition))
	return totalOffset
}

func (f *FourslashTest) Replace(t *testing.T, start int, length int, text string) {
	f.baselineState(t)
	f.replaceWorker(t, start, length, text)
}

func (f *FourslashTest) replaceWorker(t *testing.T, start int, length int, text string) {
	t.Helper()
	f.editScriptAndUpdateMarkers(t, f.activeFilename, start, start+length, text)
	// f.checkPostEditInvariants() // !!! do we need this?
}

// Inserts the text currently at the caret position character by character, as if the user typed it.
func (f *FourslashTest) typeText(t *testing.T, text string) {
	// temprorary -- this disables tests failing if format crashes; this unblocks unrelated tests such as codefixes
	f.reportFormatOnTypeCrash = false
	defer func() {
		f.reportFormatOnTypeCrash = true
	}()

	script := f.getScriptInfo(f.activeFilename)
	selection := f.getSelection()
	f.replaceWorker(t, selection.Pos(), selection.End()-selection.Pos(), "")

	totalSize := 0

	offset := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))
	for totalSize < len(text) {
		r, size := utf8.DecodeRuneInString(text[totalSize:])
		f.editScriptAndUpdateMarkers(t, f.activeFilename, offset, offset, string(r))

		totalSize += size
		offset += size
		f.currentCaretPosition = f.converters.PositionToLineAndCharacter(script, core.TextPos(offset))

		// Handle post-keystroke formatting
		if f.stateEnableFormatting {
			result := sendRequestAndBaselineWorker(t, f, lsproto.TextDocumentOnTypeFormattingInfo, &lsproto.DocumentOnTypeFormattingParams{
				TextDocument: lsproto.TextDocumentIdentifier{
					Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
				},
				Position: f.currentCaretPosition,
				Ch:       string(r),
				Options:  f.userPreferences.FormatCodeSettings.ToLSFormatOptions(),
			}, false)
			if result.TextEdits != nil {
				offset += f.applyTextEdits(t, *result.TextEdits)
			}
		}
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
	f.rangesByText = nil
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
	sendNotification(t, f, lsproto.TextDocumentDidChangeInfo, &lsproto.DidChangeTextDocumentParams{
		TextDocument: lsproto.VersionedTextDocumentIdentifier{
			Uri:     lsconv.FileNameToDocumentURI(fileName),
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
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
		Position: f.currentCaretPosition,
	}
	result := sendRequest(t, f, lsproto.TextDocumentHoverInfo, params)
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

func (f *FourslashTest) VerifyJsxClosingTag(t *testing.T, markersToNewText map[string]*string) {
	for marker, expectedText := range markersToNewText {
		f.GoToMarker(t, marker)
		params := &lsproto.TextDocumentPositionParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
			},
			Position: f.currentCaretPosition,
		}

		requestResult := sendRequest(t, f, lsproto.CustomTextDocumentClosingTagCompletionInfo, params)

		var actualText *string
		if closingTag := requestResult.CustomClosingTagCompletion; closingTag != nil {
			actualText = &closingTag.NewText
		}
		assertDeepEqual(t, actualText, expectedText, f.getCurrentPositionPrefix()+"JSX closing tag text mismatch")
	}
}

// VerifyBaselineClosingTags generates a baseline for JSX closing tag completions at all markers.
func (f *FourslashTest) VerifyBaselineClosingTags(t *testing.T) {
	t.Helper()

	markersAndItems := core.MapFiltered(f.Markers(), func(marker *Marker) (markerAndItem[*lsproto.CustomClosingTagCompletion], bool) {
		if marker.Name == nil {
			return markerAndItem[*lsproto.CustomClosingTagCompletion]{}, false
		}

		params := &lsproto.TextDocumentPositionParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: lsconv.FileNameToDocumentURI(marker.FileName()),
			},
			Position: marker.LSPosition,
		}

		result := sendRequest(t, f, lsproto.CustomTextDocumentClosingTagCompletionInfo, params)
		return markerAndItem[*lsproto.CustomClosingTagCompletion]{Marker: marker, Item: result.CustomClosingTagCompletion}, true
	})

	getRange := func(item *lsproto.CustomClosingTagCompletion) *lsproto.Range {
		return nil
	}

	getTooltipLines := func(item, _prev *lsproto.CustomClosingTagCompletion) []string {
		if item == nil {
			return []string{"No closing tag"}
		}
		return []string{fmt.Sprintf("newText: %q", item.NewText)}
	}

	result := annotateContentWithTooltips(t, f, markersAndItems, "closing tag", getRange, getTooltipLines)
	f.addResultToBaseline(t, closingTagCmd, result)
}

// VerifySignatureHelpOptions contains options for verifying signature help.
// All fields are optional - only specified fields will be verified.
type VerifySignatureHelpOptions struct {
	// Text is the full signature text (e.g., "fn(x: string, y: number): void")
	Text string
	// DocComment is the documentation comment for the signature
	DocComment string
	// ParameterCount is the expected number of parameters
	ParameterCount int
	// ParameterName is the expected name of the active parameter
	ParameterName string
	// ParameterSpan is the expected label of the active parameter (e.g., "x: string")
	ParameterSpan string
	// ParameterDocComment is the documentation for the active parameter
	ParameterDocComment string
	// OverloadsCount is the expected number of overloads (signatures)
	OverloadsCount int
	// OverrideSelectedItemIndex overrides which signature to check (default: ActiveSignature)
	OverrideSelectedItemIndex int
	// IsVariadic indicates if the signature has a rest parameter
	IsVariadic bool
	// IsVariadicSet is true when IsVariadic was explicitly set (to distinguish from default false)
	IsVariadicSet bool
}

// VerifySignatureHelp verifies signature help at the current position matches the expected options.
func (f *FourslashTest) VerifySignatureHelp(t *testing.T, expected VerifySignatureHelpOptions) {
	t.Helper()
	prefix := f.getCurrentPositionPrefix()
	params := &lsproto.SignatureHelpParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
		Position: f.currentCaretPosition,
	}
	result := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)
	help := result.SignatureHelp
	if help == nil {
		t.Fatalf("%sCould not get signature help", prefix)
	}

	// Determine which signature to check
	selectedIndex := 0
	if expected.OverrideSelectedItemIndex > 0 {
		selectedIndex = expected.OverrideSelectedItemIndex
	} else if help.ActiveSignature != nil {
		selectedIndex = int(*help.ActiveSignature)
	}

	if selectedIndex >= len(help.Signatures) {
		t.Fatalf("%sSelected signature index %d out of range (have %d signatures)", prefix, selectedIndex, len(help.Signatures))
	}

	selectedSig := help.Signatures[selectedIndex]

	// Verify overloads count
	if expected.OverloadsCount > 0 {
		if len(help.Signatures) != expected.OverloadsCount {
			t.Errorf("%sExpected %d overloads, got %d", prefix, expected.OverloadsCount, len(help.Signatures))
		}
	}

	// Verify signature text
	if expected.Text != "" {
		if selectedSig.Label != expected.Text {
			t.Errorf("%sExpected signature text %q, got %q", prefix, expected.Text, selectedSig.Label)
		}
	}

	// Verify doc comment
	if expected.DocComment != "" {
		actualDoc := ""
		if selectedSig.Documentation != nil {
			if selectedSig.Documentation.MarkupContent != nil {
				actualDoc = selectedSig.Documentation.MarkupContent.Value
			} else if selectedSig.Documentation.String != nil {
				actualDoc = *selectedSig.Documentation.String
			}
		}
		if actualDoc != expected.DocComment {
			t.Errorf("%sExpected doc comment %q, got %q", prefix, expected.DocComment, actualDoc)
		}
	}

	// Verify parameter count
	if expected.ParameterCount > 0 {
		paramCount := 0
		if selectedSig.Parameters != nil {
			paramCount = len(*selectedSig.Parameters)
		}
		if paramCount != expected.ParameterCount {
			t.Errorf("%sExpected %d parameters, got %d", prefix, expected.ParameterCount, paramCount)
		}
	}

	// Get active parameter
	var activeParamIndex int
	if selectedSig.ActiveParameter != nil && selectedSig.ActiveParameter.Uinteger != nil {
		activeParamIndex = int(*selectedSig.ActiveParameter.Uinteger)
	} else if help.ActiveParameter != nil && help.ActiveParameter.Uinteger != nil {
		activeParamIndex = int(*help.ActiveParameter.Uinteger)
	}

	var activeParam *lsproto.ParameterInformation
	if selectedSig.Parameters != nil && activeParamIndex < len(*selectedSig.Parameters) {
		activeParam = (*selectedSig.Parameters)[activeParamIndex]
	}

	// Verify parameter name
	if expected.ParameterName != "" {
		if activeParam == nil {
			t.Errorf("%sExpected parameter name %q, but no active parameter", prefix, expected.ParameterName)
		} else {
			// Parameter name is extracted from the label
			actualName := ""
			if activeParam.Label.String != nil {
				// Extract name from label like "x: string" -> "x" or "T extends Foo" -> "T" or "...x: any[]" -> "x"
				label := *activeParam.Label.String
				// Strip leading "..." for rest parameters
				label = strings.TrimPrefix(label, "...")
				if name, _, found := strings.Cut(label, ":"); found {
					actualName = strings.TrimSpace(name)
				} else if name, _, found := strings.Cut(label, " extends "); found {
					actualName = strings.TrimSpace(name)
				} else {
					actualName = label
				}
			}
			if actualName != expected.ParameterName {
				t.Errorf("%sExpected parameter name %q, got %q", prefix, expected.ParameterName, actualName)
			}
		}
	}

	// Verify parameter span (label)
	if expected.ParameterSpan != "" {
		if activeParam == nil {
			t.Errorf("%sExpected parameter span %q, but no active parameter", prefix, expected.ParameterSpan)
		} else {
			actualSpan := ""
			if activeParam.Label.String != nil {
				actualSpan = *activeParam.Label.String
			}
			if actualSpan != expected.ParameterSpan {
				t.Errorf("%sExpected parameter span %q, got %q", prefix, expected.ParameterSpan, actualSpan)
			}
		}
	}

	// Verify parameter doc comment
	if expected.ParameterDocComment != "" {
		if activeParam == nil {
			t.Errorf("%sExpected parameter doc comment %q, but no active parameter", prefix, expected.ParameterDocComment)
		} else {
			actualDoc := ""
			if activeParam.Documentation != nil {
				if activeParam.Documentation.MarkupContent != nil {
					actualDoc = activeParam.Documentation.MarkupContent.Value
				} else if activeParam.Documentation.String != nil {
					actualDoc = *activeParam.Documentation.String
				}
			}
			if actualDoc != expected.ParameterDocComment {
				t.Errorf("%sExpected parameter doc comment %q, got %q", prefix, expected.ParameterDocComment, actualDoc)
			}
		}
	}

	// Verify isVariadic (check if any parameter starts with "...")
	if expected.IsVariadicSet {
		actualIsVariadic := false
		if selectedSig.Parameters != nil {
			for _, param := range *selectedSig.Parameters {
				if param.Label.String != nil && strings.HasPrefix(*param.Label.String, "...") {
					actualIsVariadic = true
					break
				}
			}
		}
		if actualIsVariadic != expected.IsVariadic {
			t.Errorf("%sExpected isVariadic=%v, got %v", prefix, expected.IsVariadic, actualIsVariadic)
		}
	}
}

// VerifyNoSignatureHelp verifies that no signature help is available at the current position.
func (f *FourslashTest) VerifyNoSignatureHelp(t *testing.T) {
	t.Helper()
	prefix := f.getCurrentPositionPrefix()
	params := &lsproto.SignatureHelpParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
		Position: f.currentCaretPosition,
	}
	result := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)
	if result.SignatureHelp != nil && len(result.SignatureHelp.Signatures) > 0 {
		t.Errorf("%sExpected no signature help, but got %d signatures", prefix, len(result.SignatureHelp.Signatures))
	}
}

// VerifyNoSignatureHelpWithContext verifies that no signature help is available at the current position with a given context.
func (f *FourslashTest) VerifyNoSignatureHelpWithContext(t *testing.T, context *lsproto.SignatureHelpContext) {
	t.Helper()
	prefix := f.getCurrentPositionPrefix()
	params := &lsproto.SignatureHelpParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
		Position: f.currentCaretPosition,
		Context:  context,
	}
	result := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)
	if result.SignatureHelp != nil && len(result.SignatureHelp.Signatures) > 0 {
		t.Errorf("%sExpected no signature help, but got %d signatures", prefix, len(result.SignatureHelp.Signatures))
	}
}

// VerifyNoSignatureHelpForMarkersWithContext verifies that no signature help is available at the given markers with a given context.
func (f *FourslashTest) VerifyNoSignatureHelpForMarkersWithContext(t *testing.T, context *lsproto.SignatureHelpContext, markers ...string) {
	t.Helper()
	for _, marker := range markers {
		f.GoToMarker(t, marker)
		f.VerifyNoSignatureHelpWithContext(t, context)
	}
}

// VerifySignatureHelpPresent verifies that signature help is available at the current position with a given context.
func (f *FourslashTest) VerifySignatureHelpPresent(t *testing.T, context *lsproto.SignatureHelpContext) {
	t.Helper()
	prefix := f.getCurrentPositionPrefix()
	params := &lsproto.SignatureHelpParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
		Position: f.currentCaretPosition,
		Context:  context,
	}
	result := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)
	if result.SignatureHelp == nil || len(result.SignatureHelp.Signatures) == 0 {
		t.Errorf("%sExpected signature help to be present, but got none", prefix)
	}
}

// VerifySignatureHelpPresentForMarkers verifies that signature help is available at the given markers with a given context.
func (f *FourslashTest) VerifySignatureHelpPresentForMarkers(t *testing.T, context *lsproto.SignatureHelpContext, markers ...string) {
	t.Helper()
	for _, marker := range markers {
		f.GoToMarker(t, marker)
		f.VerifySignatureHelpPresent(t, context)
	}
}

// VerifyNoSignatureHelpForMarkers verifies that no signature help is available at the given markers.
func (f *FourslashTest) VerifyNoSignatureHelpForMarkers(t *testing.T, markers ...string) {
	t.Helper()
	for _, marker := range markers {
		f.GoToMarker(t, marker)
		f.VerifyNoSignatureHelp(t)
	}
}

type SignatureHelpCase struct {
	Context     *lsproto.SignatureHelpContext
	MarkerInput MarkerInput
	Expected    *lsproto.SignatureHelp
}

// VerifySignatureHelpWithCases verifies signature help using detailed SignatureHelpCase structs.
// This is useful for more complex tests that need to verify the full signature help response.
func (f *FourslashTest) VerifySignatureHelpWithCases(t *testing.T, signatureHelpCases ...*SignatureHelpCase) {
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
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
		Position: f.currentCaretPosition,
		Context:  context,
	}
	result := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)
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
	return fmt.Sprintf("At position %s(Ln %d, Col %d): ", f.activeFilename, f.currentCaretPosition.Line, f.currentCaretPosition.Character)
}

func (f *FourslashTest) BaselineAutoImportsCompletions(t *testing.T, markerNames []string) {
	t.Helper()
	reset := f.ConfigureWithReset(t, &lsutil.UserPreferences{
		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
		ImportModuleSpecifierEnding:           f.userPreferences.ImportModuleSpecifierEnding,
		ImportModuleSpecifierPreference:       f.userPreferences.ImportModuleSpecifierPreference,
		AutoImportFileExcludePatterns:         f.userPreferences.AutoImportFileExcludePatterns,
		AutoImportSpecifierExcludeRegexes:     f.userPreferences.AutoImportSpecifierExcludeRegexes,
		PreferTypeOnlyAutoImports:             f.userPreferences.PreferTypeOnlyAutoImports,
	})
	defer reset()

	for _, markerName := range markerNames {
		f.GoToMarker(t, markerName)
		params := &lsproto.CompletionParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
			},
			Position: f.currentCaretPosition,
			Context:  &lsproto.CompletionContext{},
		}
		result := sendRequest(t, f, lsproto.TextDocumentCompletionInfo, params)

		prefix := fmt.Sprintf("At marker '%s': ", markerName)

		f.writeToBaseline(autoImportsCmd, "// === Auto Imports === \n")

		fileContent, ok := f.textOfFile(f.activeFilename)
		if !ok {
			t.Fatalf(prefix+"Failed to read file %s for auto-import baseline", f.activeFilename)
		}

		marker := f.testData.MarkerPositions[markerName]
		ext := strings.TrimPrefix(tspath.GetAnyExtensionFromPath(f.activeFilename, nil, true), ".")
		lang := core.IfElse(ext == "mts" || ext == "cts", "ts", ext)
		f.writeToBaseline(autoImportsCmd, (codeFence(
			lang,
			"// @FileName: "+f.activeFilename+"\n"+fileContent[:marker.Position]+"/*"+markerName+"*/"+fileContent[marker.Position:],
		)))

		currentFile := newScriptInfo(f.activeFilename, fileContent)
		converters := lsconv.NewConverters(lsproto.PositionEncodingKindUTF8, func(_ string) *lsconv.LSPLineMap {
			return currentFile.lineMap
		})
		var list []*lsproto.CompletionItem
		if result.Items == nil || len(*result.Items) == 0 {
			if result.List == nil || result.List.Items == nil || len(result.List.Items) == 0 {
				f.writeToBaseline(autoImportsCmd, "no autoimport completions found"+"\n\n")

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
			details := sendRequest(t, f, lsproto.CompletionItemResolveInfo, item)
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
			slices.SortFunc(allChanges, func(a, b *lsproto.TextEdit) int { return lsproto.ComparePositions(b.Range.Start, a.Range.Start) })
			newFileContent := fileContent
			for _, change := range allChanges {
				newFileContent = newFileContent[:converters.LineAndCharacterToPosition(currentFile, change.Range.Start)] + change.NewText + newFileContent[converters.LineAndCharacterToPosition(currentFile, change.Range.End):]
			}
			f.writeToBaseline(autoImportsCmd, codeFence(lang, newFileContent)+"\n\n")
		}
	}
}

// string | *Marker | *RangeMarker
type MarkerOrRangeOrName = any

func (f *FourslashTest) VerifyBaselineRename(
	t *testing.T,
	preferences *lsutil.UserPreferences,
	markerOrNameOrRanges ...MarkerOrRangeOrName,
) {
	var markerOrRanges []MarkerOrRange
	for _, markerOrNameOrRange := range markerOrNameOrRanges {
		switch markerOrNameOrRange := markerOrNameOrRange.(type) {
		case string:
			marker, ok := f.testData.MarkerPositions[markerOrNameOrRange]
			if !ok {
				t.Fatalf("Marker '%s' not found", markerOrNameOrRange)
			}
			markerOrRanges = append(markerOrRanges, marker)
		case *Marker:
			markerOrRanges = append(markerOrRanges, markerOrNameOrRange)
		case *RangeMarker:
			markerOrRanges = append(markerOrRanges, markerOrNameOrRange)
		default:
			t.Fatalf("Invalid marker or range type: %T. Expected string, *Marker, or *RangeMarker.", markerOrNameOrRange)
		}
	}

	f.verifyBaselineRename(t, preferences, markerOrRanges)
}

func (f *FourslashTest) verifyBaselineRename(
	t *testing.T,
	preferences *lsutil.UserPreferences,
	markerOrRanges []MarkerOrRange,
) {
	for _, markerOrRange := range markerOrRanges {
		f.GoToMarkerOrRange(t, markerOrRange)

		// !!! set preferences
		params := &lsproto.RenameParams{
			TextDocument: lsproto.TextDocumentIdentifier{
				Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
			},
			Position: f.currentCaretPosition,
			NewName:  "?",
		}

		result := sendRequest(t, f, lsproto.TextDocumentRenameInfo, params)

		var changes map[lsproto.DocumentUri][]*lsproto.TextEdit
		if result.WorkspaceEdit != nil && result.WorkspaceEdit.Changes != nil {
			changes = *result.WorkspaceEdit.Changes
		}
		spanToText := map[documentSpan]string{}
		fileToSpan := collections.MultiMap[lsproto.DocumentUri, documentSpan]{}
		for uri, edits := range changes {
			for _, edit := range edits {
				span := documentSpan{uri: uri, textSpan: edit.Range}
				fileToSpan.Add(uri, span)
				spanToText[span] = edit.NewText
			}
		}

		var renameOptions strings.Builder
		if preferences != nil {
			if preferences.UseAliasesForRename != core.TSUnknown {
				fmt.Fprintf(&renameOptions, "// @useAliasesForRename: %v\n", preferences.UseAliasesForRename.IsTrue())
			}
			if preferences.QuotePreference != lsutil.QuotePreferenceUnknown {
				fmt.Fprintf(&renameOptions, "// @quotePreference: %v\n", preferences.QuotePreference)
			}
		}

		baselineFileContent := f.getBaselineForGroupedSpansWithFileContents(
			&fileToSpan,
			baselineFourslashLocationsOptions{
				marker:     markerOrRange,
				markerName: "/*RENAME*/",
				endMarker:  "RENAME|]",
				startMarkerPrefix: func(span documentSpan) *string {
					text := spanToText[span]
					prefixAndSuffix := strings.Split(text, "?")
					if prefixAndSuffix[0] != "" {
						return new("/*START PREFIX*/" + prefixAndSuffix[0])
					}
					return nil
				},
				endMarkerSuffix: func(span documentSpan) *string {
					text := spanToText[span]
					prefixAndSuffix := strings.Split(text, "?")
					if prefixAndSuffix[1] != "" {
						return new(prefixAndSuffix[1] + "/*END SUFFIX*/")
					}
					return nil
				},
			},
		)

		var baselineResult string
		if renameOptions.Len() > 0 {
			baselineResult = renameOptions.String() + "\n" + baselineFileContent
		} else {
			baselineResult = baselineFileContent
		}

		f.addResultToBaseline(t, renameCmd, baselineResult)
	}
}

func (f *FourslashTest) VerifyRenameSucceeded(t *testing.T, preferences *lsutil.UserPreferences) {
	// !!! set preferences
	params := &lsproto.RenameParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
		Position: f.currentCaretPosition,
		NewName:  "?",
	}

	prefix := f.getCurrentPositionPrefix()
	result := sendRequest(t, f, lsproto.TextDocumentRenameInfo, params)
	if result.WorkspaceEdit == nil || result.WorkspaceEdit.Changes == nil || len(*result.WorkspaceEdit.Changes) == 0 {
		t.Fatal(prefix + "Expected rename to succeed, but got no changes")
	}
}

func (f *FourslashTest) VerifyRenameFailed(t *testing.T, preferences *lsutil.UserPreferences) {
	// !!! set preferences
	params := &lsproto.RenameParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
		Position: f.currentCaretPosition,
		NewName:  "?",
	}

	prefix := f.getCurrentPositionPrefix()
	result := sendRequest(t, f, lsproto.TextDocumentRenameInfo, params)
	if result.WorkspaceEdit != nil {
		t.Fatalf(prefix+"Expected rename to fail, but got changes: %s", cmp.Diff(result.WorkspaceEdit, nil))
	}
}

func (f *FourslashTest) VerifyBaselineRenameAtRangesWithText(
	t *testing.T,
	preferences *lsutil.UserPreferences,
	texts ...string,
) {
	var markerOrRanges []MarkerOrRange
	for _, text := range texts {
		ranges := core.Map(f.GetRangesByText().Get(text), func(r *RangeMarker) MarkerOrRange { return r })
		markerOrRanges = append(markerOrRanges, ranges...)
	}
	f.verifyBaselineRename(t, preferences, markerOrRanges)
}

func (f *FourslashTest) GetRangesByText() *collections.MultiMap[string, *RangeMarker] {
	if f.rangesByText != nil {
		return f.rangesByText
	}
	rangesByText := collections.MultiMap[string, *RangeMarker]{}
	for _, r := range f.testData.Ranges {
		rangeText := f.getRangeText(r)
		rangesByText.Add(rangeText, r)
	}
	f.rangesByText = &rangesByText
	return &rangesByText
}

func (f *FourslashTest) getRangeText(r *RangeMarker) string {
	script := f.getScriptInfo(r.FileName())
	return script.content[r.Range.Pos():r.Range.End()]
}

func (f *FourslashTest) verifyBaselines(t *testing.T, testPath string) {
	if !f.testData.isStateBaseliningEnabled() {
		for command, content := range f.baselines {
			baseline.Run(t, getBaselineFileName(t, command), content.String(), f.getBaselineOptions(command, testPath))
		}
	} else {
		baseline.Run(t, getBaseFileNameFromTest(t)+".baseline", f.stateBaseline.baseline.String(), baseline.Options{Subfolder: "fourslash/state"})
	}
}

func (f *FourslashTest) VerifyBaselineInlayHints(
	t *testing.T,
	span *lsproto.Range,
	testPreferences *lsutil.UserPreferences,
) {
	fileName := f.activeFilename
	var lspRange lsproto.Range
	if span == nil {
		lspRange = f.converters.ToLSPRange(f.getScriptInfo(fileName), core.NewTextRange(0, len(f.scriptInfos[fileName].content)))
	} else {
		lspRange = *span
	}

	params := &lsproto.InlayHintParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: lsconv.FileNameToDocumentURI(fileName)},
		Range:        lspRange,
	}

	preferences := testPreferences
	if preferences == nil {
		preferences = lsutil.NewDefaultUserPreferences()
	}
	reset := f.ConfigureWithReset(t, preferences)
	defer reset()

	prefix := fmt.Sprintf("At position (Ln %d, Col %d): ", lspRange.Start.Line, lspRange.Start.Character)
	result := sendRequest(t, f, lsproto.TextDocumentInlayHintInfo, params)
	fileLines := strings.Split(f.getScriptInfo(fileName).content, "\n")
	var annotations []string
	if result.InlayHints != nil {
		slices.SortFunc(*result.InlayHints, func(a, b *lsproto.InlayHint) int {
			return lsproto.ComparePositions(a.Position, b.Position)
		})
		annotations = core.Map(*result.InlayHints, func(hint *lsproto.InlayHint) string {
			if hint.Label.InlayHintLabelParts != nil {
				for _, part := range *hint.Label.InlayHintLabelParts {
					// Avoid diffs caused by lib file updates.
					if part.Location != nil && isLibFile(part.Location.Uri.FileName()) {
						part.Location.Range.Start = lsproto.Position{Line: 0, Character: 0}
						part.Location.Range.End = lsproto.Position{Line: 0, Character: 0}
					}
				}
			}
			underline := strings.Repeat(" ", int(hint.Position.Character)) + "^"
			hintJson, err := core.StringifyJson(hint, "", "  ")
			if err != nil {
				t.Fatalf(prefix+"Failed to stringify inlay hint for baseline: %v", err)
			}
			annotation := fileLines[hint.Position.Line]
			annotation += "\n" + underline + "\n" + hintJson
			return annotation
		})
	}

	if len(annotations) == 0 {
		annotations = append(annotations, "=== No inlay hints ===")
	}

	f.addResultToBaseline(t, inlayHintsCmd, strings.Join(annotations, "\n\n"))
}

func (f *FourslashTest) VerifyDiagnostics(t *testing.T, expected []*lsproto.Diagnostic) {
	f.verifyDiagnostics(t, expected, func(d *lsproto.Diagnostic) bool { return true })
}

// Similar to `VerifyDiagnostics`, but excludes suggestion diagnostics returned from server.
func (f *FourslashTest) VerifyNonSuggestionDiagnostics(t *testing.T, expected []*lsproto.Diagnostic) {
	f.verifyDiagnostics(t, expected, func(d *lsproto.Diagnostic) bool { return !isSuggestionDiagnostic(d) })
}

// Similar to `VerifyDiagnostics`, but includes only suggestion diagnostics returned from server.
func (f *FourslashTest) VerifySuggestionDiagnostics(t *testing.T, expected []*lsproto.Diagnostic) {
	f.verifyDiagnostics(t, expected, isSuggestionDiagnostic)
}

func (f *FourslashTest) verifyDiagnostics(t *testing.T, expected []*lsproto.Diagnostic, filterDiagnostics func(*lsproto.Diagnostic) bool) {
	actualDiagnostics := f.getDiagnostics(t, f.activeFilename)
	actualDiagnostics = core.Filter(actualDiagnostics, filterDiagnostics)
	emptyRange := lsproto.Range{}
	expectedWithRanges := make([]*lsproto.Diagnostic, len(expected))
	for i, diag := range expected {
		if diag.Range == emptyRange {
			rangesInFile := f.getRangesInFile(f.activeFilename)
			if len(rangesInFile) == 0 {
				t.Fatalf("No ranges found in file %s to assign to diagnostic with empty range", f.activeFilename)
			}
			diagWithRange := *diag
			diagWithRange.Range = rangesInFile[0].LSRange
			expectedWithRanges[i] = &diagWithRange
		} else {
			expectedWithRanges[i] = diag
		}
	}
	if len(actualDiagnostics) == 0 && len(expectedWithRanges) == 0 {
		return
	}
	assertDeepEqual(t, actualDiagnostics, expectedWithRanges, "Diagnostics do not match expected", diagnosticsIgnoreOpts)
}

func (f *FourslashTest) getDiagnostics(t *testing.T, fileName string) []*lsproto.Diagnostic {
	params := &lsproto.DocumentDiagnosticParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(fileName),
		},
	}
	result := sendRequest(t, f, lsproto.TextDocumentDiagnosticInfo, params)
	if result.FullDocumentDiagnosticReport != nil {
		return result.FullDocumentDiagnosticReport.Items
	}
	return nil
}

func isSuggestionDiagnostic(diag *lsproto.Diagnostic) bool {
	return diag.Severity != nil && *diag.Severity == lsproto.DiagnosticSeverityHint
}

func (f *FourslashTest) VerifyBaselineNonSuggestionDiagnostics(t *testing.T) {
	var diagnostics []*fourslashDiagnostic
	var files []*harnessutil.TestFile
	for fileName, scriptInfo := range f.scriptInfos {
		if tspath.HasJSONFileExtension(fileName) {
			continue
		}
		files = append(files, &harnessutil.TestFile{UnitName: fileName, Content: scriptInfo.content})
		lspDiagnostics := core.Filter(
			f.getDiagnostics(t, fileName),
			func(d *lsproto.Diagnostic) bool { return !isSuggestionDiagnostic(d) },
		)
		diagnostics = append(diagnostics, core.Map(lspDiagnostics, func(d *lsproto.Diagnostic) *fourslashDiagnostic {
			return f.toDiagnostic(scriptInfo, d)
		})...)
	}
	slices.SortFunc(files, func(a, b *harnessutil.TestFile) int {
		return strings.Compare(a.UnitName, b.UnitName)
	})
	result := tsbaseline.GetErrorBaseline(t, files, diagnostics, compareDiagnostics, false /*pretty*/)
	f.addResultToBaseline(t, nonSuggestionDiagnosticsCmd, result)
}

type fourslashDiagnostic struct {
	file               *fourslashDiagnosticFile
	loc                core.TextRange
	code               int32
	category           diagnostics.Category
	message            string
	relatedDiagnostics []*fourslashDiagnostic
	reportsUnnecessary bool
	reportsDeprecated  bool
}

type fourslashDiagnosticFile struct {
	file        *harnessutil.TestFile
	ecmaLineMap []core.TextPos
}

var _ diagnosticwriter.FileLike = (*fourslashDiagnosticFile)(nil)

func (f *fourslashDiagnosticFile) FileName() string {
	return f.file.UnitName
}

func (f *fourslashDiagnosticFile) Text() string {
	return f.file.Content
}

func (f *fourslashDiagnosticFile) ECMALineMap() []core.TextPos {
	if f.ecmaLineMap == nil {
		f.ecmaLineMap = core.ComputeECMALineStarts(f.file.Content)
	}
	return f.ecmaLineMap
}

var _ diagnosticwriter.Diagnostic = (*fourslashDiagnostic)(nil)

func (d *fourslashDiagnostic) File() diagnosticwriter.FileLike {
	return d.file
}

func (d *fourslashDiagnostic) Pos() int {
	return d.loc.Pos()
}

func (d *fourslashDiagnostic) End() int {
	return d.loc.End()
}

func (d *fourslashDiagnostic) Len() int {
	return d.loc.Len()
}

func (d *fourslashDiagnostic) Code() int32 {
	return d.code
}

func (d *fourslashDiagnostic) Category() diagnostics.Category {
	return d.category
}

func (d *fourslashDiagnostic) Localize(locale locale.Locale) string {
	return d.message
}

func (d *fourslashDiagnostic) MessageChain() []diagnosticwriter.Diagnostic {
	return nil
}

func (d *fourslashDiagnostic) RelatedInformation() []diagnosticwriter.Diagnostic {
	relatedInfo := make([]diagnosticwriter.Diagnostic, 0, len(d.relatedDiagnostics))
	for _, relDiag := range d.relatedDiagnostics {
		relatedInfo = append(relatedInfo, relDiag)
	}
	return relatedInfo
}

func (f *FourslashTest) toDiagnostic(scriptInfo *scriptInfo, lspDiagnostic *lsproto.Diagnostic) *fourslashDiagnostic {
	var category diagnostics.Category
	switch *lspDiagnostic.Severity {
	case lsproto.DiagnosticSeverityError:
		category = diagnostics.CategoryError
	case lsproto.DiagnosticSeverityWarning:
		category = diagnostics.CategoryWarning
	case lsproto.DiagnosticSeverityInformation:
		category = diagnostics.CategoryMessage
	case lsproto.DiagnosticSeverityHint:
		category = diagnostics.CategorySuggestion
	default:
		category = diagnostics.CategoryError
	}
	code := *lspDiagnostic.Code.Integer

	var relatedDiagnostics []*fourslashDiagnostic
	if lspDiagnostic.RelatedInformation != nil {
		for _, info := range *lspDiagnostic.RelatedInformation {
			relatedScriptInfo := f.getScriptInfo(info.Location.Uri.FileName())
			if relatedScriptInfo == nil {
				continue
			}
			relatedDiagnostic := &fourslashDiagnostic{
				file:     &fourslashDiagnosticFile{file: &harnessutil.TestFile{UnitName: relatedScriptInfo.fileName, Content: relatedScriptInfo.content}},
				loc:      f.converters.FromLSPRange(relatedScriptInfo, info.Location.Range),
				code:     code,
				category: category,
				message:  info.Message,
			}
			relatedDiagnostics = append(relatedDiagnostics, relatedDiagnostic)
		}
	}

	diagnostic := &fourslashDiagnostic{
		file: &fourslashDiagnosticFile{
			file: &harnessutil.TestFile{
				UnitName: scriptInfo.fileName,
				Content:  scriptInfo.content,
			},
		},
		loc:                f.converters.FromLSPRange(scriptInfo, lspDiagnostic.Range),
		code:               code,
		category:           category,
		message:            lspDiagnostic.Message,
		relatedDiagnostics: relatedDiagnostics,
	}
	return diagnostic
}

func compareDiagnostics(d1, d2 *fourslashDiagnostic) int {
	c := strings.Compare(d1.file.FileName(), d2.file.FileName())
	if c != 0 {
		return c
	}
	c = d1.Pos() - d2.Pos()
	if c != 0 {
		return c
	}
	c = d1.End() - d2.End()
	if c != 0 {
		return c
	}
	c = int(d1.code) - int(d2.code)
	if c != 0 {
		return c
	}
	c = strings.Compare(d1.message, d2.message)
	if c != 0 {
		return c
	}
	return compareRelatedDiagnostics(d1.relatedDiagnostics, d2.relatedDiagnostics)
}

func compareRelatedDiagnostics(d1, d2 []*fourslashDiagnostic) int {
	c := len(d2) - len(d1)
	if c != 0 {
		return c
	}
	for i := range d1 {
		c = compareDiagnostics(d1[i], d2[i])
		if c != 0 {
			return c
		}
	}
	return 0
}

func isLibFile(fileName string) bool {
	baseName := tspath.GetBaseFileName(fileName)
	if strings.HasPrefix(baseName, "lib.") && strings.HasSuffix(baseName, ".d.ts") {
		return true
	}
	return false
}

var AnyTextEdits *[]*lsproto.TextEdit

func (f *FourslashTest) VerifyBaselineGoToImplementation(t *testing.T, markerNames ...string) {
	f.verifyBaselineDefinitions(
		t,
		goToImplementationCmd,
		"/*GOTO IMPL*/", /*definitionMarker*/
		func(t *testing.T, f *FourslashTest, fileName string, position lsproto.Position) lsproto.LocationOrLocationsOrDefinitionLinksOrNull {
			params := &lsproto.ImplementationParams{
				TextDocument: lsproto.TextDocumentIdentifier{
					Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
				},
				Position: f.currentCaretPosition,
			}

			return sendRequest(t, f, lsproto.TextDocumentImplementationInfo, params)
		},
		false, /*includeOriginalSelectionRange*/
		markerNames...,
	)
}

type VerifyWorkspaceSymbolCase struct {
	Pattern     string
	Includes    *[]*lsproto.SymbolInformation
	Exact       *[]*lsproto.SymbolInformation
	Preferences *lsutil.UserPreferences
}

// `verify.navigateTo` in Strada.
func (f *FourslashTest) VerifyWorkspaceSymbol(t *testing.T, cases []*VerifyWorkspaceSymbolCase) {
	originalPreferences := f.userPreferences.Copy()
	for _, testCase := range cases {
		preferences := testCase.Preferences
		if preferences == nil {
			preferences = lsutil.NewDefaultUserPreferences()
		}
		f.Configure(t, preferences)
		result := sendRequest(t, f, lsproto.WorkspaceSymbolInfo, &lsproto.WorkspaceSymbolParams{Query: testCase.Pattern})
		if result.SymbolInformations == nil {
			t.Fatalf("Expected non-nil symbol information array from workspace symbol request")
		}
		if testCase.Includes != nil {
			if testCase.Exact != nil {
				t.Fatalf("Test case cannot have both 'Includes' and 'Exact' fields set")
			}
			verifyIncludesSymbols(t, *result.SymbolInformations, *testCase.Includes, "Workspace symbols mismatch with pattern '"+testCase.Pattern+"'")
		} else {
			if testCase.Exact == nil {
				t.Fatalf("Test case must have either 'Includes' or 'Exact' field set")
			}
			verifyExactSymbols(t, *result.SymbolInformations, *testCase.Exact, "Workspace symbols mismatch with pattern '"+testCase.Pattern+"'")
		}
	}
	f.Configure(t, originalPreferences)
}

func verifyExactSymbols(
	t *testing.T,
	actual []*lsproto.SymbolInformation,
	expected []*lsproto.SymbolInformation,
	prefix string,
) {
	if len(actual) != len(expected) {
		t.Fatalf("%s: Expected %d symbols, but got %d:\n%s", prefix, len(expected), len(actual), cmp.Diff(actual, expected))
	}
	for i := range actual {
		assertDeepEqual(t, actual[i], expected[i], prefix)
	}
}

func verifyIncludesSymbols(
	t *testing.T,
	actual []*lsproto.SymbolInformation,
	includes []*lsproto.SymbolInformation,
	prefix string,
) {
	type key struct {
		name string
		loc  lsproto.Location
	}
	nameAndLocToActualSymbol := make(map[key]*lsproto.SymbolInformation, len(actual))
	for _, sym := range actual {
		nameAndLocToActualSymbol[key{name: sym.Name, loc: sym.Location}] = sym
	}

	for _, sym := range includes {
		actualSym, ok := nameAndLocToActualSymbol[key{name: sym.Name, loc: sym.Location}]
		if !ok {
			t.Fatalf("%s: Expected symbol '%s' at location '%v' not found", prefix, sym.Name, sym.Location)
		}
		assertDeepEqual(t, actualSym, sym, fmt.Sprintf("%s: Symbol '%s' at location '%v' mismatch", prefix, sym.Name, sym.Location))
	}
}

func (f *FourslashTest) VerifyBaselineDocumentSymbol(t *testing.T) {
	params := &lsproto.DocumentSymbolParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
	}
	result := sendRequest(t, f, lsproto.TextDocumentDocumentSymbolInfo, params)
	uri := lsconv.FileNameToDocumentURI(f.activeFilename)
	spansToSymbol := make(map[documentSpan]*lsproto.DocumentSymbol)
	if result.DocumentSymbols != nil {
		for _, symbol := range *result.DocumentSymbols {
			collectDocumentSymbolSpans(uri, symbol, spansToSymbol)
		}
	}
	f.addResultToBaseline(
		t,
		documentSymbolsCmd,
		f.getBaselineForSpansWithFileContents(slices.Collect(maps.Keys(spansToSymbol)), baselineFourslashLocationsOptions{
			getLocationData: func(span documentSpan) string {
				symbol := spansToSymbol[span]
				return fmt.Sprintf("{| name: %s, kind: %s |}", symbol.Name, symbol.Kind.String())
			},
		}),
	)

	var detailsBuilder strings.Builder
	if result.DocumentSymbols != nil {
		writeDocumentSymbolDetails(*result.DocumentSymbols, 0, &detailsBuilder)
	}
	f.writeToBaseline(documentSymbolsCmd, "\n\n// === Details ===\n"+detailsBuilder.String())
}

func writeDocumentSymbolDetails(symbols []*lsproto.DocumentSymbol, indent int, builder *strings.Builder) {
	for _, symbol := range symbols {
		fmt.Fprintf(builder, "%s(%s) %s\n", strings.Repeat("  ", indent), symbol.Kind.String(), symbol.Name)
		if symbol.Children != nil {
			writeDocumentSymbolDetails(*symbol.Children, indent+1, builder)
		}
	}
}

func collectDocumentSymbolSpans(
	uri lsproto.DocumentUri,
	symbol *lsproto.DocumentSymbol,
	spansToSymbol map[documentSpan]*lsproto.DocumentSymbol,
) {
	span := documentSpan{
		uri:         uri,
		textSpan:    symbol.SelectionRange,
		contextSpan: &symbol.Range,
	}
	spansToSymbol[span] = symbol
	if symbol.Children != nil {
		for _, child := range *symbol.Children {
			collectDocumentSymbolSpans(uri, child, spansToSymbol)
		}
	}
}

// VerifyNumberOfErrorsInCurrentFile verifies that the current file has the expected number of errors.
func (f *FourslashTest) VerifyNumberOfErrorsInCurrentFile(t *testing.T, expectedCount int) {
	diagnostics := f.getDiagnostics(t, f.activeFilename)
	// Filter to only include errors (not suggestions/hints)
	errors := core.Filter(diagnostics, func(d *lsproto.Diagnostic) bool {
		return !isSuggestionDiagnostic(d)
	})
	if len(errors) != expectedCount {
		t.Fatalf("Expected %d errors in current file, but got %d", expectedCount, len(errors))
	}
}

// VerifyNoErrors verifies that no errors exist in any open files.
func (f *FourslashTest) VerifyNoErrors(t *testing.T) {
	for fileName := range f.openFiles {
		diagnostics := f.getDiagnostics(t, fileName)
		// Filter to only include errors (not suggestions/hints)
		errors := core.Filter(diagnostics, func(d *lsproto.Diagnostic) bool {
			return !isSuggestionDiagnostic(d)
		})
		if len(errors) > 0 {
			var messages []string
			for _, err := range errors {
				messages = append(messages, err.Message)
			}
			t.Fatalf("Expected no errors but found %d in %s: %v", len(errors), fileName, messages)
		}
	}
}

// VerifyErrorExistsAtRange verifies that an error with the given code exists at the given range.
func (f *FourslashTest) VerifyErrorExistsAtRange(t *testing.T, rangeMarker *RangeMarker, code int, message string) {
	diagnostics := f.getDiagnostics(t, rangeMarker.FileName())
	for _, diag := range diagnostics {
		if diag.Code != nil && diag.Code.Integer != nil && int(*diag.Code.Integer) == code {
			// Check if the range matches
			if diag.Range.Start.Line == rangeMarker.LSRange.Start.Line &&
				diag.Range.Start.Character == rangeMarker.LSRange.Start.Character &&
				diag.Range.End.Line == rangeMarker.LSRange.End.Line &&
				diag.Range.End.Character == rangeMarker.LSRange.End.Character {
				// If message is provided, verify it matches
				if message != "" && diag.Message != message {
					t.Fatalf("Error at range has code %d but message mismatch. Expected: %q, Got: %q", code, message, diag.Message)
				}
				return
			}
		}
	}
	t.Fatalf("Expected error with code %d at range %v but it was not found", code, rangeMarker.LSRange)
}

// VerifyCurrentLineContentIs verifies that the current line content matches the expected text.
func (f *FourslashTest) VerifyCurrentLineContentIs(t *testing.T, expectedText string) {
	script := f.getScriptInfo(f.activeFilename)
	lines := strings.Split(script.content, "\n")
	lineNum := int(f.currentCaretPosition.Line)
	if lineNum >= len(lines) {
		t.Fatalf("Current line %d is out of range (file has %d lines)", lineNum, len(lines))
	}
	actualLine := lines[lineNum]
	// Handle \r if present
	actualLine = strings.TrimSuffix(actualLine, "\r")
	if actualLine != expectedText {
		t.Fatalf("Current line content mismatch.\nExpected: %q\nActual: %q", expectedText, actualLine)
	}
}

// VerifyCurrentFileContentIs verifies that the current file content matches the expected text.
func (f *FourslashTest) VerifyCurrentFileContentIs(t *testing.T, expectedText string) {
	script := f.getScriptInfo(f.activeFilename)
	if script.content != expectedText {
		t.Fatalf("Current file content mismatch.\nExpected: %q\nActual: %q", expectedText, script.content)
	}
}

// VerifyErrorExistsBetweenMarkers verifies that an error exists between the two markers.
func (f *FourslashTest) VerifyErrorExistsBetweenMarkers(t *testing.T, startMarkerName string, endMarkerName string) {
	startMarker, ok := f.testData.MarkerPositions[startMarkerName]
	if !ok {
		t.Fatalf("Start marker '%s' not found", startMarkerName)
	}
	endMarker, ok := f.testData.MarkerPositions[endMarkerName]
	if !ok {
		t.Fatalf("End marker '%s' not found", endMarkerName)
	}
	if startMarker.FileName() != endMarker.FileName() {
		t.Fatalf("Markers '%s' and '%s' are in different files", startMarkerName, endMarkerName)
	}

	diagnostics := f.getDiagnostics(t, startMarker.FileName())
	startPos := startMarker.Position
	endPos := endMarker.Position

	for _, diag := range diagnostics {
		if !isSuggestionDiagnostic(diag) {
			diagStart := int(f.converters.LineAndCharacterToPosition(f.getScriptInfo(startMarker.FileName()), diag.Range.Start))
			diagEnd := int(f.converters.LineAndCharacterToPosition(f.getScriptInfo(startMarker.FileName()), diag.Range.End))
			if diagStart >= startPos && diagEnd <= endPos {
				return // Found an error in the range
			}
		}
	}
	t.Fatalf("Expected error between markers '%s' and '%s' but none was found", startMarkerName, endMarkerName)
}

// VerifyErrorExistsAfterMarker verifies that an error exists after the given marker.
func (f *FourslashTest) VerifyErrorExistsAfterMarker(t *testing.T, markerName string) {
	var fileName string
	var markerPos int

	if markerName == "" {
		// Use current position
		fileName = f.activeFilename
		markerPos = int(f.converters.LineAndCharacterToPosition(f.getScriptInfo(f.activeFilename), f.currentCaretPosition))
	} else {
		marker, ok := f.testData.MarkerPositions[markerName]
		if !ok {
			t.Fatalf("Marker '%s' not found", markerName)
		}
		fileName = marker.FileName()
		markerPos = marker.Position
	}

	diagnostics := f.getDiagnostics(t, fileName)

	for _, diag := range diagnostics {
		if !isSuggestionDiagnostic(diag) {
			diagStart := int(f.converters.LineAndCharacterToPosition(f.getScriptInfo(fileName), diag.Range.Start))
			if diagStart >= markerPos {
				return // Found an error after the marker
			}
		}
	}
	t.Fatalf("Expected error after marker '%s' but none was found", markerName)
}

// VerifyErrorExistsBeforeMarker verifies that an error exists before the given marker.
func (f *FourslashTest) VerifyErrorExistsBeforeMarker(t *testing.T, markerName string) {
	var fileName string
	var markerPos int

	if markerName == "" {
		// Use current position
		fileName = f.activeFilename
		markerPos = int(f.converters.LineAndCharacterToPosition(f.getScriptInfo(f.activeFilename), f.currentCaretPosition))
	} else {
		marker, ok := f.testData.MarkerPositions[markerName]
		if !ok {
			t.Fatalf("Marker '%s' not found", markerName)
		}
		fileName = marker.FileName()
		markerPos = marker.Position
	}

	diagnostics := f.getDiagnostics(t, fileName)

	for _, diag := range diagnostics {
		if !isSuggestionDiagnostic(diag) {
			diagEnd := int(f.converters.LineAndCharacterToPosition(f.getScriptInfo(fileName), diag.Range.End))
			if diagEnd <= markerPos {
				return // Found an error before the marker
			}
		}
	}
	t.Fatalf("Expected error before marker '%s' but none was found", markerName)
}
