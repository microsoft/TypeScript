package api

import (
	"context"
	"encoding/base64"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestCreateSourceFile(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/src/input.ts": `export const fromFile = 1;`,
	})
	t.Cleanup(projectSession.Close)

	session := NewLSPSession(projectSession, nil)
	t.Cleanup(session.Close)

	t.Run("text", func(t *testing.T) {
		t.Parallel()
		sourceFile, err := session.createSourceFile(
			"src/input.tsx",
			`export const element = <div />;`,
			CreateSourceFileOptions{},
		)

		assert.NilError(t, err)
		assert.Equal(t, sourceFile.FileName(), "/src/input.tsx")
		assert.Equal(t, string(sourceFile.Path()), "/src/input.tsx")
		assert.Equal(t, sourceFile.Text(), `export const element = <div />;`)
		assert.Equal(t, sourceFile.ScriptKind, core.ScriptKindTSX)
		assert.Equal(t, len(sourceFile.Statements.Nodes), 1)
		assert.Assert(t, !sourceFile.IsBound())
	})

	t.Run("script kind override", func(t *testing.T) {
		t.Parallel()
		sourceFile, err := session.createSourceFile(
			"/src/component.txt",
			`export const element = <div />;`,
			CreateSourceFileOptions{ScriptKind: core.ScriptKindTSX},
		)

		assert.NilError(t, err)
		assert.Equal(t, sourceFile.ScriptKind, core.ScriptKindTSX)
		assert.Equal(t, len(sourceFile.Diagnostics()), 0)
	})

	t.Run("unknown extension defaults to TypeScript", func(t *testing.T) {
		t.Parallel()
		sourceFile, err := session.createSourceFile(
			"/src/component.txt",
			`export const value: string = "ok";`,
			CreateSourceFileOptions{},
		)

		assert.NilError(t, err)
		assert.Equal(t, sourceFile.ScriptKind, core.ScriptKindTS)
		assert.Equal(t, len(sourceFile.Diagnostics()), 0)
	})

	t.Run("from file", func(t *testing.T) {
		t.Parallel()
		result, err := session.handleCreateSourceFileFromFile(context.Background(), &CreateSourceFileFromFileParams{
			FileNameBase64: base64.StdEncoding.EncodeToString([]byte("/src/input.ts")),
		})

		assert.NilError(t, err)
		assert.Assert(t, result != nil)
	})

	t.Run("invalid script kind", func(t *testing.T) {
		t.Parallel()
		_, err := session.createSourceFile(
			"/src/input.ts",
			"",
			CreateSourceFileOptions{ScriptKind: 999},
		)

		assert.ErrorContains(t, err, "invalid scriptKind 999")
	})

	t.Run("missing file", func(t *testing.T) {
		t.Parallel()
		_, err := session.handleCreateSourceFileFromFile(context.Background(), &CreateSourceFileFromFileParams{
			FileNameBase64: base64.StdEncoding.EncodeToString([]byte("/src/missing.ts")),
		})

		assert.ErrorContains(t, err, `could not read file "/src/missing.ts"`)
	})
}
