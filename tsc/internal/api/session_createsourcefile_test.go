package api

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/api/encoder"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
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
			tspath.ToRootedFilePath("src/input.tsx", session.currentDirectory()),
			`export const element = <div />;`,
			CreateSourceFileOptions{},
		)

		assert.NilError(t, err)
		t.Cleanup(lease.Release)
		sourceFile := lease.SourceFile()
		assert.Equal(t, sourceFile.FileName(), tspath.RootedFilePathFromNormalized("/src/input.tsx"))
		assert.Equal(t, sourceFile.PathKey().AsString(), "/src/input.tsx")
		assert.Equal(t, sourceFile.Text(), `export const element = <div />;`)
		assert.Equal(t, sourceFile.ScriptKind, core.ScriptKindTSX)
		assert.Equal(t, len(sourceFile.Statements.Nodes), 1)
		assert.Assert(t, sourceFile.IsBound())
	})

	t.Run("script kind override", func(t *testing.T) {
		t.Parallel()
		lease, err := session.createSourceFile(
			tspath.RootedFilePathFromNormalized("/src/component.txt"),
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
				if lease.SourceFile().FileName().AsString() == fileName {
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

	t.Run("retain by descriptor", func(t *testing.T) {
		t.Parallel()

		const fileName = "/src/retained.ts"
		const sourceText = "export const retained = true;"
		created, err := session.createSourceFile(fileName, sourceText, CreateSourceFileOptions{})
		assert.NilError(t, err)
		sourceFile := created.SourceFile()
		descriptor := newSourceFileDescriptor(sourceFile)

		result, err := session.handleRetainSourceFile(&RetainSourceFileParams{File: descriptor})
		assert.NilError(t, err)
		assert.Assert(t, result.Lease != 0)
		session.sourceFileLeasesMu.Lock()
		retainedSourceFile := session.sourceFileLeases[result.Lease].SourceFile()
		session.sourceFileLeasesMu.Unlock()
		assert.Assert(t, retainedSourceFile == sourceFile)

		created.Release()
		key, err := descriptor.parseCacheKey()
		assert.NilError(t, err)
		acquired := session.snapshotHost.AcquireExistingSourceFile(key)
		assert.Assert(t, acquired != nil)
		acquired.Release()

		_, err = session.handleReleaseSourceFile(&ReleaseSourceFileParams{Lease: result.Lease})
		assert.NilError(t, err)
		assert.Assert(t, session.snapshotHost.AcquireExistingSourceFile(key) == nil)
	})

	t.Run("retain cache miss", func(t *testing.T) {
		t.Parallel()

		descriptor := SourceFileDescriptor{
			FileName:        "/src/missing.ts",
			Path:            "/src/missing.ts",
			ContentHash:     "00000000000000000000000000000000",
			ParseOptionsKey: "0",
			ScriptKind:      core.ScriptKindTS,
			NodeID:          "1",
		}
		_, err := session.handleRetainSourceFile(&RetainSourceFileParams{File: descriptor})
		assert.ErrorContains(t, err, "source file is not available")
	})

	t.Run("declaration symbol lookup", func(t *testing.T) {
		t.Parallel()

		created, err := session.createSourceFile(
			"/src/symbols.ts",
			"function present() {}\nimport {} from './missing';",
			CreateSourceFileOptions{},
		)
		assert.NilError(t, err)
		defer created.Release()

		sourceFile := created.SourceFile()
		table := encoder.GetNodeIndexTable(sourceFile)
		descriptor := newSourceFileDescriptor(sourceFile)

		present, err := session.handleGetSymbolOfDeclaration(&GetSymbolOfDeclarationParams{
			File:  descriptor,
			Index: table.GetIndex(sourceFile.Statements.Nodes[0]),
		})
		assert.NilError(t, err)
		assert.Assert(t, present != nil)
		assert.Equal(t, present.Name, "present")
		assert.Equal(t, present.Reference.Kind, SymbolOwnerKindFile)

		_, err = session.handleGetSymbolOfDeclaration(&GetSymbolOfDeclarationParams{
			File:  descriptor,
			Index: 0,
		})
		assert.ErrorContains(t, err, "out of range")
	})

	t.Run("rejects stale node ID", func(t *testing.T) {
		t.Parallel()

		created, err := session.createSourceFile("/src/stale.ts", "export {};", CreateSourceFileOptions{})
		assert.NilError(t, err)
		defer created.Release()
		descriptor := newSourceFileDescriptor(created.SourceFile())
		descriptor.NodeID = "0"

		_, err = session.handleRetainSourceFile(&RetainSourceFileParams{File: descriptor})
		assert.ErrorContains(t, err, "cached source file")
	})

	t.Run("rejects an evicted file after equal-key recreation", func(t *testing.T) {
		t.Parallel()

		const fileName = "/src/recreated.ts"
		const sourceText = "export {};"
		first, err := session.createSourceFile(fileName, sourceText, CreateSourceFileOptions{})
		assert.NilError(t, err)
		staleDescriptor := newSourceFileDescriptor(first.SourceFile())
		first.Release()

		second, err := session.createSourceFile(fileName, sourceText, CreateSourceFileOptions{})
		assert.NilError(t, err)
		defer second.Release()
		assert.Assert(t, newSourceFileDescriptor(second.SourceFile()).NodeID != staleDescriptor.NodeID)

		_, err = session.handleRetainSourceFile(&RetainSourceFileParams{File: staleDescriptor})
		assert.ErrorContains(t, err, "cached source file")
	})

	t.Run("unknown extension defaults to TypeScript", func(t *testing.T) {
		t.Parallel()
		lease, err := session.createSourceFile(
			tspath.RootedFilePathFromNormalized("/src/component.txt"),
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
			tspath.RootedFilePathFromNormalized("/src/input.ts"),
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

	t.Run("empty file name", func(t *testing.T) {
		t.Parallel()
		_, err := session.handleCreateSourceFile(context.Background(), &CreateSourceFileParams{})
		assert.ErrorContains(t, err, "fileName must not be empty")

		_, err = session.handleCreateSourceFileFromFile(context.Background(), &CreateSourceFileFromFileParams{})
		assert.ErrorContains(t, err, "fileName must not be empty")
	})
}
