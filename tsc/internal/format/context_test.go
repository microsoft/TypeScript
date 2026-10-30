package format

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"gotest.tools/v3/assert"
)

func TestFormattingLinePositions(t *testing.T) {
	t.Parallel()
	for _, text := range []string{"", "value", strings.Repeat("first\r\n\u4e2d\u2028next\nlast\u2029", 32)} {
		file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/test.ts", PathKey: "/test.ts"}, text, core.ScriptKindTS)
		context := NewFormattingContext(file, FormatRequestKindFormatDocument, lsutil.GetDefaultFormatCodeSettings())
		for _, reverse := range []bool{false, true, false} {
			for i := range len(text) + 1 {
				pos := i
				if reverse {
					pos = len(text) - i
				}
				start := scanner.GetECMALineOfPosition(file, pos)
				for _, end := range []int{pos, min(pos+1, len(text)), len(text)} {
					want := start == scanner.GetECMALineOfPosition(file, end)
					assert.Equal(t, context.rangeIsOnOneLine(core.NewTextRange(pos, end)).IsTrue(), want)
				}
			}
		}
	}
}
