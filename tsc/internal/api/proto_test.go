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
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestCompilerOptionsInput(t *testing.T) {
	t.Parallel()

	var options api.TranspileOptions
	assert.NilError(t, json.Unmarshal([]byte(`{"compilerOptions":{"module":1,"outDir":"dist"}}`), &options))
	assert.Assert(t, options.CompilerOptionsInput != nil)
	compilerOptions, diagnostics := options.CompilerOptionsInput.Finalize(tspath.RootedDirectoryPath("/project"))
	assert.Equal(t, len(diagnostics), 0)
	assert.Equal(t, compilerOptions.Module, core.ModuleKindCommonJS)
	assert.Equal(t, compilerOptions.OutDir, tspath.RootedDirectoryPath("/project/dist"))
}

func TestDocumentIdentifierUnmarshalJSON(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name     string
		input    string
		fileName string
		uri      string
		resolved string
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
			name:     "file uri with one slash",
			input:    `{"uri":"file:/workspace/sub/src/index.ts"}`,
			uri:      "file:///workspace/sub/src/index.ts",
			resolved: "/workspace/sub/src/index.ts",
		},
		{
			name:     "file uri with opaque path",
			input:    `{"uri":"file:workspace/sub/src/index.ts"}`,
			uri:      "file:///workspace/sub/src/index.ts",
			resolved: "/workspace/sub/src/index.ts",
		},
		{
			name:     "uri without scheme",
			input:    `{"uri":"/workspace/sub/src/index.ts"}`,
			uri:      "file:///workspace/sub/src/index.ts",
			resolved: "/workspace/sub/src/index.ts",
		},
		{
			name:     "escaped file uri",
			input:    `{"uri":"file:/workspace/file%20name.ts"}`,
			uri:      "file:///workspace/file%20name.ts",
			resolved: "/workspace/file name.ts",
		},
		{
			name:     "file uri with authority",
			input:    `{"uri":"file://server/share/index.ts"}`,
			uri:      "file://server/share/index.ts",
			resolved: "//server/share/index.ts",
		},
		{
			name:     "empty file uri path",
			input:    `{"uri":"file://"}`,
			uri:      "file:///",
			resolved: "/",
		},
		{
			name:  "untitled uri",
			input: `{"uri":"untitled:Untitled-1"}`,
			uri:   "untitled:Untitled-1",
		},
		{
			name:  "remote uri",
			input: `{"uri":"vscode-remote://ssh-remote+host/workspace/file%20name.ts?query#fragment"}`,
			uri:   "vscode-remote://ssh-remote+host/workspace/file%20name.ts?query#fragment",
		},
		{
			name:     "file uri as plain file name",
			input:    `"file:/workspace/sub/src/index.ts"`,
			fileName: "file:/workspace/sub/src/index.ts",
		},
		{
			name:  "invalid uri escape",
			input: `{"uri":"file:///test%xx.ts"}`,
			err:   "invalid URI",
		},
		{
			name:  "invalid non-file uri",
			input: `{"uri":"vscode-remote://host/test%xx.ts"}`,
			err:   "invalid URI",
		},
		{
			name:  "file uri path without authority",
			input: `{"uri":"file:////server/share"}`,
			err:   "invalid URI",
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
			name:  "null uri",
			input: `{"uri":null}`,
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
			if tt.resolved != "" {
				assert.Equal(t, d.ToFileName("/cwd").AsString(), tt.resolved)
				assert.Equal(t, string(d.ToURI("/cwd")), tt.uri)
			}
		})
	}
}

func TestEnsureProgramsUnmarshalJSON(t *testing.T) {
	t.Parallel()

	var all api.EnsurePrograms
	assert.NilError(t, json.Unmarshal([]byte(`true`), &all))
	assert.Equal(t, all.All, true)

	var projects api.EnsurePrograms
	assert.NilError(t, json.Unmarshal([]byte(`["/tsconfig.json","/dev/null/synthetic/1"]`), &projects))
	assert.DeepEqual(t, projects.Projects, []project.ID{
		project.ConfiguredProjectIDFromPathKey(tspath.PathKeyFromCanonical("/tsconfig.json")).AsID(),
		project.NewSyntheticProjectID(1).AsID(),
	})

	var invalid api.EnsurePrograms
	assert.ErrorContains(t, json.Unmarshal([]byte(`false`), &invalid), "must be true or an array")
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
