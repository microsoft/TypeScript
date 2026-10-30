package scanner_test

import (
	"strings"
	"testing"
	"unicode/utf8"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
	"gotest.tools/v3/assert"
)

func TestGetECMAEndLinePosition(t *testing.T) {
	t.Parallel()
	for _, text := range []string{
		"", "value", "\n", "\r", "\r\n", "\u2028", "\u2029",
		"\r\n\n\r\u2028\u2029",
		"value\r\nnext\rthird\nfourth\u2028fifth\u2029last",
		"\u4e2d\U0001f600\u2028\u03bb\r\n",
		"\xff\n\xe2\x80\r\n",
		strings.Repeat(" ", 1024) + "\r\nlast",
	} {
		file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/test.ts", PathKey: "/test.ts"}, text, core.ScriptKindTS)
		for line, start := range scanner.GetECMALineStarts(file) {
			pos := int(start)
			for {
				ch, size := utf8.DecodeRuneInString(text[pos:])
				if size == 0 || stringutil.IsLineBreak(ch) {
					break
				}
				pos += size
			}
			assert.Equal(t, scanner.GetECMAEndLinePosition(file, line), pos-1, "text %q, line %d", text, line)
		}
	}
}
