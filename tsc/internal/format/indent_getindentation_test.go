package format_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/parser"
)

func TestGetIndentationForNamedImportsPosition(t *testing.T) {
	t.Parallel()

	text := "import {\n    type SomeInterface,\n} from \"./exports.js\";"
	// Position 9: \n
	// Position 10: first space of "    type SomeInterface"

	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/test.ts",
		Path:     "/test.ts",
	}, text, core.ScriptKindTS)

	options := lsutil.GetDefaultFormatCodeSettings()

	// The line that contains "    type SomeInterface" starts at position 9 (the \n).
	// The getAdjustedStartPosition with LeadingTriviaOptionNone returns line start.
	// Let's test at position 9 (start of line containing the specifier)
	lineStart := format.GetLineStartPositionForPosition(14, sourceFile) // 14 is somewhere in "    type"

	indent := format.GetIndentation(lineStart, sourceFile, options, true)
	t.Logf("lineStart=%d, text[lineStart:]=%q", lineStart, text[lineStart:lineStart+10])
	t.Logf("GetIndentation at lineStart %d = %d", lineStart, indent)

	if indent != 4 {
		t.Errorf("Expected indentation 4, got %d", indent)
	}
}
