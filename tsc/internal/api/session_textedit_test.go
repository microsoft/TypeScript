package api

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestToAPITextEditsUsesOriginalCoordinates(t *testing.T) {
	t.Parallel()

	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/app.vue",
		PathKey:  tspath.PathKey("/app.vue"),
	}, "const transformed = true;", core.ScriptKindTS)
	sourceFile.SetContentMapperInfo(ast.ContentMapperSourceFileInfo{
		OriginalText:  "😀\nabc",
		ContentMapper: "mapper",
	})

	edits := toAPITextEdits(sourceFile, []*lsproto.TextEdit{{
		Range: lsproto.Range{
			Start: lsproto.Position{Line: 1, Character: 1},
			End:   lsproto.Position{Line: 1, Character: 2},
		},
		NewText: "x",
	}})

	assert.DeepEqual(t, edits, []*TextEdit{{
		Pos:     4,
		End:     5,
		NewText: "x",
	}})
}
