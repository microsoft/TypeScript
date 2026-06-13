package api_test

import (
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/api"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/parser"
	"gotest.tools/v3/assert"
)

func TestDocumentIdentifierUnmarshalJSON(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name     string
		input    string
		fileName string
		uri      string
		err      string
	}{
		{
			name:     "plain string",
			input:    `"foo.ts"`,
			fileName: "foo.ts",
		},
		{
			name:  "uri object",
			input: `{"uri":"file:///foo.ts"}`,
			uri:   "file:///foo.ts",
		},
		{
			name:  "uri object with unknown fields",
			input: `{"uri":"file:///foo.ts","extra":true}`,
			uri:   "file:///foo.ts",
		},
		{
			name:  "empty object",
			input: `{}`,
		},
		{
			name:  "invalid type",
			input: `42`,
			err:   "expected string or object, got number",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			var d api.DocumentIdentifier
			err := json.Unmarshal([]byte(tt.input), &d)
			if tt.err != "" {
				assert.ErrorContains(t, err, tt.err)
				return
			}
			assert.NilError(t, err)
			assert.Equal(t, d.FileName, tt.fileName)
			assert.Equal(t, string(d.URI), tt.uri)
		})
	}
}

func TestNewDiagnosticResponseUsesUTF16Offsets(t *testing.T) {
	t.Parallel()

	text := "const 💩 = 1;"
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/unicode.ts"}, text, core.ScriptKindTS)
	pos := strings.Index(text, "=")
	assert.Assert(t, pos > 0)
	end := pos + len("=")

	diag := ast.NewDiagnostic(file, core.NewTextRange(pos, end), diagnostics.Expression_expected)
	resp := api.NewDiagnosticResponse(diag)

	assert.Equal(t, resp.Pos, 9)
	assert.Equal(t, resp.End, 10)
	assert.Equal(t, resp.Pos, file.GetPositionMap().UTF8ToUTF16(pos))
	assert.Equal(t, resp.End, file.GetPositionMap().UTF8ToUTF16(end))
}
