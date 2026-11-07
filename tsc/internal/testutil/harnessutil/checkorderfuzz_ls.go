package harnessutil

import (
	"cmp"
	"context"
	"os"
	"slices"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/ls/autoimport"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/sourcemap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// Setting TS_CHECK_ORDER_FUZZ_LS=1 as well also makes language service
// requests queries: hover and definition at identifiers, signature help at
// arguments, member completions after property accesses, and the inlay hints
// of a file. Their results must not differ either.
var fuzzLS = os.Getenv("TS_CHECK_ORDER_FUZZ_LS") != ""

// fuzzLSNodeQueryKinds returns the kinds of language service request that
// apply to node.
func fuzzLSNodeQueryKinds(node *ast.Node, kinds []fuzzQueryKind) []fuzzQueryKind {
	if !fuzzLS || ast.PositionIsSynthesized(node.Pos()) {
		return kinds
	}
	if ast.IsIdentifier(node) {
		kinds = append(kinds, fuzzQueryHover, fuzzQueryDefinition)
		if ast.IsPropertyAccessExpression(node.Parent) && node.Parent.Name() == node {
			kinds = append(kinds, fuzzQueryCompletion)
		}
	}
	if parent := node.Parent; parent != nil && ast.IsCallOrNewExpression(parent) && node != parent.Expression() {
		kinds = append(kinds, fuzzQuerySignatureHelp)
	}
	return kinds
}

func fuzzIsLSQuery(kind fuzzQueryKind) bool {
	return kind >= fuzzQueryHover
}

// fuzzLanguageService returns a language service for program.
func fuzzLanguageService(program *compiler.Program) *fuzzLSService {
	host := &fuzzLSHost{program: program}
	// Results in lib files are converted often, and computing their line
	// maps each time makes requests quadratic in their size.
	var mu sync.Mutex
	lineMaps := make(map[tspath.RootedFilePath]*lsconv.LSPLineMap)
	host.converters = lsconv.NewConverters(lsproto.PositionEncodingKindUTF16, func(fileName tspath.RootedFilePath) *lsconv.LSPLineMap {
		mu.Lock()
		defer mu.Unlock()
		if lineMap, ok := lineMaps[fileName]; ok {
			return lineMap
		}
		var lineMap *lsconv.LSPLineMap
		if file := program.GetSourceFile(fileName); file != nil {
			lineMap = lsconv.ComputeLSPLineStarts(file.Text())
		}
		lineMaps[fileName] = lineMap
		return lineMap
	})
	return &fuzzLSService{ls.NewLanguageService(fuzzProjectID{}, program, host, ""), host.converters}
}

type fuzzLSService struct {
	*ls.LanguageService
	converters *lsconv.Converters
}

// fuzzLSResult makes the language service request of kind at node, or for
// the whole file if node is nil, returning its result as text.
func fuzzLSResult(ctx context.Context, lang *fuzzLSService, file *ast.SourceFile, node *ast.Node, kind fuzzQueryKind) string {
	uri := lsconv.FileNameToDocumentURI(file.FileName())
	if uri.FileName() != file.FileName() {
		// The language service cannot find a file whose name a URI does not
		// preserve.
		return ""
	}
	position := func(pos int) lsproto.Position {
		p, _ := lang.converters.ToLSPPosition(file, core.TextPos(pos))
		return p
	}
	var result any
	var err error
	switch kind {
	case fuzzQueryHover:
		result, err = lang.ProvideHover(ctx, &lsproto.HoverParams{
			TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
			Position:     position(scanner.GetTokenPosOfNode(node, file, false)),
		})
	case fuzzQueryDefinition:
		result, err = lang.ProvideDefinition(ctx, uri, position(scanner.GetTokenPosOfNode(node, file, false)))
	case fuzzQuerySignatureHelp:
		result, err = lang.ProvideSignatureHelp(ctx, uri, position(scanner.GetTokenPosOfNode(node, file, false)), nil)
	case fuzzQueryCompletion:
		var completions lsproto.CompletionResponse
		completions, err = lang.ProvideCompletion(ctx, uri, position(node.End()), nil)
		if completions.List != nil {
			// Editors sort items by sort text and label, and the language
			// service leaves those that tie in no particular order.
			slices.SortStableFunc(completions.List.Items, func(a, b *lsproto.CompletionItem) int {
				return cmp.Or(cmp.Compare(fuzzSortText(a), fuzzSortText(b)), cmp.Compare(a.Label, b.Label))
			})
		}
		result = completions
	case fuzzQueryInlayHints:
		result, err = lang.ProvideInlayHint(ctx, &lsproto.InlayHintParams{
			TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
			Range:        lsproto.Range{Start: position(0), End: position(len(file.Text()))},
		})
	}
	if err != nil {
		return "error: " + err.Error()
	}
	text, err := json.Marshal(result)
	if err != nil {
		return "error: " + err.Error()
	}
	if string(text) == "null" {
		return ""
	}
	return string(text)
}

func fuzzSortText(item *lsproto.CompletionItem) string {
	if item.SortText == nil {
		return ""
	}
	return *item.SortText
}

type fuzzProjectID struct{}

func (fuzzProjectID) String() string { return "fuzz" }

// fuzzLSHost is the language service host of a program alone.
type fuzzLSHost struct {
	program    *compiler.Program
	converters *lsconv.Converters
}

func (h *fuzzLSHost) CaseSensitivity() tspath.CaseSensitivity {
	return h.program.Host().FS().CaseSensitivity()
}

func (h *fuzzLSHost) ReadFile(path tspath.RootedFilePath) (string, bool) {
	return h.program.Host().FS().ReadFile(path)
}

func (h *fuzzLSHost) Converters() *lsconv.Converters {
	return h.converters
}

func (h *fuzzLSHost) GetPreferences(activeFile string) lsutil.UserPreferences {
	preferences := lsutil.NewDefaultUserPreferences()
	preferences.IncludeCompletionsForModuleExports = core.TSFalse
	preferences.IncludeCompletionsForImportStatements = core.TSFalse
	preferences.InlayHintsPreferences = lsutil.InlayHintsPreferences{
		IncludeInlayEnumMemberValueHints:         core.TSTrue,
		IncludeInlayFunctionLikeReturnTypeHints:  core.TSTrue,
		IncludeInlayFunctionParameterTypeHints:   core.TSTrue,
		IncludeInlayParameterNameHints:           lsutil.IncludeInlayParameterNameHintsAll,
		IncludeInlayPropertyDeclarationTypeHints: core.TSTrue,
		IncludeInlayVariableTypeHints:            core.TSTrue,
	}
	return preferences
}

func (h *fuzzLSHost) GetWorkspaceFolders() []ls.WorkspaceFolder {
	return nil
}

func (h *fuzzLSHost) GetECMALineInfo(fileName tspath.RootedFilePath) *sourcemap.ECMALineInfo {
	if file := h.program.GetSourceFile(fileName); file != nil {
		return sourcemap.CreateECMALineInfo(file.Text(), file.ECMALineMap())
	}
	return nil
}

func (h *fuzzLSHost) AutoImportRegistry() *autoimport.Registry {
	return nil
}

func (h *fuzzLSHost) ReadDirectory(path tspath.RootedDirectoryPath, extensions []string, excludes []string, includes []string, depth int) []tspath.RootedFilePath {
	return nil
}

func (h *fuzzLSHost) GetDirectories(path tspath.RootedDirectoryPath) []string {
	return nil
}

func (h *fuzzLSHost) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	return h.program.Host().FS().DirectoryExists(path)
}

func (h *fuzzLSHost) FileExists(path tspath.RootedFilePath) bool {
	return h.program.Host().FS().FileExists(path)
}
