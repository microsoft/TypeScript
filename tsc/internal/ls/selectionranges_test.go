package ls

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/jsonrpc"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func TestSelectionRangeDepthIsLimited(t *testing.T) {
	t.Parallel()

	const nestingDepth = 12000
	text := "const x = " + strings.Repeat("(", nestingDepth) + "1" + strings.Repeat(")", nestingDepth) + ";"
	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/index.ts",
		PathKey:  "/index.ts",
	}, text, core.ScriptKindTS)
	lineMap := lsconv.ComputeLSPLineStarts(text)
	languageService := &LanguageService{
		converters: lsconv.NewConverters(lsproto.PositionEncodingKindUTF16, func(tspath.RootedFilePath) *lsconv.LSPLineMap {
			return lineMap
		}),
	}

	result := getSmartSelectionRange(languageService, sourceFile, len("const x = ")+nestingDepth)
	depth := 0
	var outermost *lsproto.SelectionRange
	for current := result; current != nil; current = current.Parent {
		depth++
		outermost = current
	}

	if depth != maxSelectionRangeDepth {
		t.Fatalf("selection range depth = %d, want %d", depth, maxSelectionRangeDepth)
	}
	innerRange, _ := languageService.converters.ToLSPRange(sourceFile, core.NewTextRange(len("const x = ")+nestingDepth, len("const x = ")+nestingDepth+1))
	if result.Range != innerRange {
		t.Fatalf("innermost selection range = %v, want %v", result.Range, innerRange)
	}
	fullRange, _ := languageService.converters.ToLSPRange(sourceFile, core.NewTextRange(sourceFile.Pos(), sourceFile.End()))
	if outermost.Range != fullRange {
		t.Fatalf("outermost selection range = %v, want full file range %v", outermost.Range, fullRange)
	}
	results := []*lsproto.SelectionRange{result}
	response := lsproto.SelectionRangesOrNull{SelectionRanges: &results}
	id := jsonrpc.NewIDString("selectionRange")
	message := (&lsproto.ResponseMessage{ID: id, Result: &response}).Message()
	if _, err := json.Marshal(message); err != nil {
		t.Fatalf("failed to marshal limited selection range: %v", err)
	}
}
