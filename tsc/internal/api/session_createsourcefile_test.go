package api

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
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
		lease, err := session.createSourceFile(
			"src/input.tsx",
			`export const element = <div />;`,
			CreateSourceFileOptions{},
		)

		assert.NilError(t, err)
		t.Cleanup(lease.Release)
		sourceFile := lease.SourceFile()
		assert.Equal(t, sourceFile.FileName(), "/src/input.tsx")
		assert.Equal(t, string(sourceFile.Path()), "/src/input.tsx")
		assert.Equal(t, sourceFile.Text(), `export const element = <div />;`)
		assert.Equal(t, sourceFile.ScriptKind, core.ScriptKindTSX)
		assert.Equal(t, len(sourceFile.Statements.Nodes), 1)
		assert.Assert(t, sourceFile.IsBound())
	})

	t.Run("script kind override", func(t *testing.T) {
		t.Parallel()
		lease, err := session.createSourceFile(
			"/src/component.txt",
			`export const element = <div />;`,
			CreateSourceFileOptions{ScriptKind: core.ScriptKindTSX},
		)

		assert.NilError(t, err)
		t.Cleanup(lease.Release)
		sourceFile := lease.SourceFile()
		assert.Equal(t, sourceFile.ScriptKind, core.ScriptKindTSX)
		assert.Equal(t, len(sourceFile.Diagnostics()), 0)
	})

	t.Run("shares parse cache with programs", func(t *testing.T) {
		t.Parallel()

		const fileName = "/src/shared.ts"
		const sourceText = `export const shared = 1;`
		cacheProjectSession, _ := projecttestutil.Setup(map[string]any{fileName: sourceText})
		t.Cleanup(cacheProjectSession.Close)
		cacheSession := NewLSPSession(cacheProjectSession, nil)
		t.Cleanup(cacheSession.Close)

		cacheProjectSession.DidOpenFile(context.Background(), "file:///src/shared.ts", 1, sourceText, lsproto.LanguageKindTypeScript)
		languageService, err := cacheProjectSession.GetLanguageService(context.Background(), "file:///src/shared.ts")
		assert.NilError(t, err)
		cacheProjectSession.WaitForBackgroundTasks()

		programFile := languageService.GetProgram().GetSourceFile(fileName)
		direct := cacheSession.acquireSourceFile(programFile.ParseOptions(), sourceText, programFile.ScriptKind)
		t.Cleanup(direct.Release)
		assert.Assert(t, programFile == direct.SourceFile())
	})

	t.Run("lease release", func(t *testing.T) {
		t.Parallel()

		findLease := func(fileName string) SourceFileLeaseID {
			session.sourceFileLeasesMu.Lock()
			defer session.sourceFileLeasesMu.Unlock()
			for id, lease := range session.sourceFileLeases {
				if lease.SourceFile().FileName() == fileName {
					return id
				}
			}
			return 0
		}

		first, err := session.handleCreateSourceFile(context.Background(), &CreateSourceFileParams{
			FileName:   "/src/lease-1.ts",
			SourceText: "export {};",
		})
		assert.NilError(t, err)
		assert.Assert(t, first != nil)
		firstLease := findLease("/src/lease-1.ts")
		assert.Assert(t, firstLease != 0)

		second, err := session.handleCreateSourceFile(context.Background(), &CreateSourceFileParams{
			FileName:   "/src/lease-2.ts",
			SourceText: "export {};",
		})
		assert.NilError(t, err)
		assert.Assert(t, second != nil)
		secondLease := findLease("/src/lease-2.ts")
		assert.Assert(t, secondLease != 0)
		assert.Assert(t, firstLease != secondLease)

		_, err = session.handleReleaseSourceFile(&ReleaseSourceFileParams{Lease: firstLease})
		assert.NilError(t, err)
		assert.Equal(t, findLease("/src/lease-1.ts"), SourceFileLeaseID(0))

		_, err = session.handleReleaseSourceFile(&ReleaseSourceFileParams{Lease: firstLease})
		assert.ErrorContains(t, err, "source file lease")

		_, err = session.handleReleaseSourceFile(&ReleaseSourceFileParams{Lease: secondLease})
		assert.NilError(t, err)
	})

	t.Run("unknown extension defaults to TypeScript", func(t *testing.T) {
		t.Parallel()
		lease, err := session.createSourceFile(
			"/src/component.txt",
			`export const value: string = "ok";`,
			CreateSourceFileOptions{},
		)

		assert.NilError(t, err)
		t.Cleanup(lease.Release)
		sourceFile := lease.SourceFile()
		assert.Equal(t, sourceFile.ScriptKind, core.ScriptKindTS)
		assert.Equal(t, len(sourceFile.Diagnostics()), 0)
	})

	t.Run("from file", func(t *testing.T) {
		t.Parallel()
		result, err := session.handleCreateSourceFileFromFile(context.Background(), &CreateSourceFileFromFileParams{
			FileName: "/src/input.ts",
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
			FileName: "/src/missing.ts",
		})

		assert.ErrorContains(t, err, `could not read file "/src/missing.ts"`)
	})
}
