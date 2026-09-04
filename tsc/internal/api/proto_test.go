package api_test

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/api"
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestCompilerOptionsInput(t *testing.T) {
	t.Parallel()

	var options api.TranspileOptions
	assert.NilError(t, json.Unmarshal([]byte(`{"compilerOptions":{"module":1,"outDir":"dist"}}`), &options))
	assert.Assert(t, options.CompilerOptionsInput != nil)
	compilerOptions, diagnostics := options.CompilerOptionsInput.Finalize(tspath.RootedDirectoryPathFromNormalized("/project"))
	assert.Equal(t, len(diagnostics), 0)
	assert.Equal(t, compilerOptions.Module, core.ModuleKindCommonJS)
	assert.Equal(t, compilerOptions.OutDir, tspath.RootedDirectoryPathFromNormalized("/project/dist"))
}

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
			name:  "uri object with nested unknown field",
			input: `{"extra":{"nested":true},"uri":"file:///foo.ts"}`,
			uri:   "file:///foo.ts",
		},
		{
			name:  "empty object",
			input: `{}`,
			err:   "object must contain uri",
		},
		{
			name:  "empty file name",
			input: `""`,
			err:   "file name must not be empty",
		},
		{
			name:  "empty uri",
			input: `{"uri":""}`,
			err:   "uri must be a non-empty string",
		},
		{
			name:  "non-string uri",
			input: `{"uri":42}`,
			err:   "uri must be a non-empty string",
		},
		{
			name:  "duplicate uri",
			input: `{"uri":"file:///foo.ts","uri":"file:///bar.ts"}`,
			err:   `duplicate object member name "uri"`,
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

func TestNewDiagnosticResponseIncludesFormattingContext(t *testing.T) {
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
	assert.DeepEqual(t, resp.StartPosition, &api.DiagnosticPositionResponse{Line: 0, Character: 9})
	assert.DeepEqual(t, resp.EndPosition, &api.DiagnosticPositionResponse{Line: 0, Character: 10})
	assert.DeepEqual(t, resp.SourceLines, []*api.DiagnosticSourceLineResponse{{Line: 0, Text: text}})
	assert.Equal(t, resp.Pos, file.GetPositionMap().UTF8ToUTF16(pos))
	assert.Equal(t, resp.End, file.GetPositionMap().UTF8ToUTF16(end))
}

func TestNewDiagnosticResponseTruncatesLongFormattingContext(t *testing.T) {
	t.Parallel()

	text := "one\ntwo\nthree\nfour\nfive\nsix\nseven"
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/multiline.ts"}, text, core.ScriptKindTS)
	diag := ast.NewDiagnostic(file, core.NewTextRange(0, len(text)), diagnostics.Expression_expected)
	resp := api.NewDiagnosticResponse(diag)

	assert.DeepEqual(t, resp.StartPosition, &api.DiagnosticPositionResponse{Line: 0, Character: 0})
	assert.DeepEqual(t, resp.EndPosition, &api.DiagnosticPositionResponse{Line: 6, Character: 5})
	assert.DeepEqual(t, resp.SourceLines, []*api.DiagnosticSourceLineResponse{
		{Line: 0, Text: "one\n"},
		{Line: 1, Text: "two\n"},
		{Line: 5, Text: "six\n"},
		{Line: 6, Text: "seven"},
	})
}
