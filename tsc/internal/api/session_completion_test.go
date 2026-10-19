package api

import (
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

// TestCompletionSymbolTypeIsResolvable reproduces a crash where requesting the
// type of a completion-provided symbol panicked with a nil pointer dereference.
//
// Completion ran on an ephemeral query checker (default lifetime), so members of
// a generic type such as `string[]` (= Array<string>) were returned as
// *instantiated* symbols whose per-checker instantiation links live only on that
// query checker. GetTypeOfSymbol runs on the persistent API checker — a
// different instance — where those links are absent, so getTypeOfInstantiatedSymbol
// dereferenced a nil target and brought down the connection.
//
// The fix pins symbol-producing completion to the API checker, so the returned
// handles resolve on the same checker the client re-queries.
func TestCompletionSymbolTypeIsResolvable(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	// The caret sits right after `people.`, requesting members of `string[]`.
	const content = "declare const people: string[];\npeople."

	files := map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
		fileName:                         content,
	}
	projectSession, _ := projecttestutil.Setup(files)
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	snapshotResp, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)

	proj, err := session.handleGetDefaultProjectForFile(t.Context(), &GetDefaultProjectForFileParams{
		Snapshot: snapshotResp.Snapshot,
		File:     DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	assert.Assert(t, proj != nil, "file should resolve to a default project")

	// content is pure ASCII, so the UTF-16 caret offset equals the byte length.
	completions, err := session.handleGetCompletionsAtPosition(t.Context(), &GetCompletionsAtPositionParams{
		Snapshot:      snapshotResp.Snapshot,
		Project:       proj.Id,
		File:          DocumentIdentifier{FileName: fileName},
		Position:      uint32(len(content)),
		IncludeSymbol: true,
	})
	assert.NilError(t, err)
	assert.Assert(t, completions != nil, "expected a completion list for array members")

	// Resolving the type of every completion symbol must not panic, and known
	// members like `push` must produce a concrete type.
	var sawSymbol, sawPush bool
	for _, entry := range completions.Entries {
		if entry.Symbol == nil {
			continue
		}
		sawSymbol = true
		typeResp, err := session.handleGetTypeOfSymbol(t.Context(), &GetTypeOfSymbolParams{
			Snapshot: snapshotResp.Snapshot,
			Project:  proj.Id,
			Symbol:   entry.Symbol.Reference,
		})
		assert.NilError(t, err)
		assert.Assert(t, typeResp != nil, "type of completion symbol %q should resolve", entry.Name)
		if entry.Name == "push" {
			sawPush = true
		}
	}
	assert.Assert(t, sawSymbol, "completion entries should include resolvable symbols")
	assert.Assert(t, sawPush, "array member completions should include `push`")
}

// TestCompletionOnInferredProject reproduces a crash where requesting completions
// for a loose file — one not part of any tsconfig.json, so it resolves to an
// inferred project — panicked with "ConfigFilePath called on non-configured
// project".
//
// setupLanguageService called Project.ConfigFileKey(), which is only valid for
// configured projects and panics for inferred ones. The fix uses Project.ID(),
// which returns the project's path for both configured and inferred projects without panicking.
func TestCompletionOnInferredProject(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	// No tsconfig.json anywhere, so this file belongs to an inferred project.
	const fileName = "/home/projects/p/src/index.ts"
	const content = "declare const people: string[];\npeople."

	files := map[string]any{
		fileName: content,
	}
	projectSession, _ := projecttestutil.Setup(files)
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	snapshotResp, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)

	proj, err := session.handleGetDefaultProjectForFile(t.Context(), &GetDefaultProjectForFileParams{
		Snapshot: snapshotResp.Snapshot,
		File:     DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	assert.Assert(t, proj != nil, "file should resolve to an inferred default project")

	// This request previously panicked in setupLanguageService.
	// content is pure ASCII, so the UTF-16 caret offset equals the byte length.
	completions, err := session.handleGetCompletionsAtPosition(t.Context(), &GetCompletionsAtPositionParams{
		Snapshot: snapshotResp.Snapshot,
		Project:  proj.Id,
		File:     DocumentIdentifier{FileName: fileName},
		Position: uint32(len(content)),
	})
	assert.NilError(t, err)
	assert.Assert(t, completions != nil, "expected a completion list for array members")
}

func TestCompletionRetriesWithAutoImports(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	const content = "someV"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "module": "esnext", "target": "esnext" } }`,
		"/home/projects/p/src/export.ts": "export const someValue = 1;",
		fileName:                         content,
	})
	defer projectSession.Close()
	projectSession.Configure(lsutil.UserPreferences{
		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
	})

	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	snapshotResp, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)
	proj, err := session.handleGetDefaultProjectForFile(t.Context(), &GetDefaultProjectForFileParams{
		Snapshot: snapshotResp.Snapshot,
		File:     DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	assert.Assert(t, proj != nil, "file should resolve to a default project")

	completions, err := session.handleGetCompletionsAtPosition(t.Context(), &GetCompletionsAtPositionParams{
		Snapshot: snapshotResp.Snapshot,
		Project:  proj.Id,
		File:     DocumentIdentifier{FileName: fileName},
		Position: uint32(len(content)),
	})
	assert.NilError(t, err)
	assert.Assert(t, completions != nil, "expected a completion list")
	for _, entry := range completions.Entries {
		if entry.Name == "someValue" {
			return
		}
	}
	t.Fatal("expected auto-import completion for someValue")
}

func TestCompletionWithSymbolsRequiresPreparedAutoImports(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	const content = "someV"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "module": "esnext", "target": "esnext" } }`,
		"/home/projects/p/src/export.ts": "export const someValue = 1;",
		fileName:                         content,
	})
	defer projectSession.Close()

	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	snapshotResp, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: fileName}},
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports: core.TSTrue,
		},
	})
	assert.NilError(t, err)
	proj, err := session.handleGetDefaultProjectForFile(t.Context(), &GetDefaultProjectForFileParams{
		Snapshot: snapshotResp.Snapshot,
		File:     DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)

	_, err = session.handleGetCompletionsAtPosition(t.Context(), &GetCompletionsAtPositionParams{
		Snapshot:      snapshotResp.Snapshot,
		Project:       proj.Id,
		File:          DocumentIdentifier{FileName: fileName},
		Position:      uint32(len(content)),
		IncludeSymbol: true,
	})
	assert.ErrorContains(t, err, "snapshot is not prepared for auto-imports")
}

func TestCompletionWithSymbolsUsesPreparedSnapshot(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	const content = "someV"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "module": "esnext", "target": "esnext" } }`,
		"/home/projects/p/src/export.ts": "export const someValue = 1;",
		fileName:                         content,
	})
	defer projectSession.Close()

	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	snapshotResp, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenFiles:          []DocumentIdentifier{{FileName: fileName}},
		PrepareAutoImports: &DocumentIdentifier{FileName: fileName},
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports: core.TSTrue,
		},
	})
	assert.NilError(t, err)
	proj, err := session.handleGetDefaultProjectForFile(t.Context(), &GetDefaultProjectForFileParams{
		Snapshot: snapshotResp.Snapshot,
		File:     DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)

	completions, err := session.handleGetCompletionsAtPosition(t.Context(), &GetCompletionsAtPositionParams{
		Snapshot:      snapshotResp.Snapshot,
		Project:       proj.Id,
		File:          DocumentIdentifier{FileName: fileName},
		Position:      uint32(len(content)),
		IncludeSymbol: true,
	})
	assert.NilError(t, err)
	assert.Assert(t, completions != nil)
	for _, entry := range completions.Entries {
		if entry.Name == "someValue" {
			return
		}
	}
	t.Fatal("expected auto-import completion for someValue")
}

func TestCompletionUsesSnapshotPreferences(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	const content = "someV"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "module": "esnext", "target": "esnext" } }`,
		"/home/projects/p/src/export.ts": "export const someValue = 1;",
		fileName:                         content,
	})
	defer projectSession.Close()

	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	snapshotResp, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: fileName}},
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports: core.TSFalse,
		},
	})
	assert.NilError(t, err)
	proj, err := session.handleGetDefaultProjectForFile(t.Context(), &GetDefaultProjectForFileParams{
		Snapshot: snapshotResp.Snapshot,
		File:     DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)

	completions, err := session.handleGetCompletionsAtPosition(t.Context(), &GetCompletionsAtPositionParams{
		Snapshot:      snapshotResp.Snapshot,
		Project:       proj.Id,
		File:          DocumentIdentifier{FileName: fileName},
		Position:      uint32(len(content)),
		IncludeSymbol: true,
	})
	assert.NilError(t, err)
	assert.Assert(t, completions != nil)
	for _, entry := range completions.Entries {
		assert.Assert(t, entry.Name != "someValue", "snapshot preferences should disable auto-import completions")
	}
}

func TestSnapshotCreatesProgramsAndPreparesAutoImportsInOneClone(t *testing.T) {
	t.Parallel()
	for _, update := range []bool{false, true} {
		t.Run(map[bool]string{false: "create", true: "update"}[update], func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "snapshot creation panicked")
			const fileName = "/home/projects/p/index.ts"
			projectSession, _ := projecttestutil.Setup(map[string]any{
				"/home/projects/p/tsconfig.json": "{}",
				fileName:                         "someV",
				"/home/projects/p/export.ts":     "export const someValue = 1;",
				"/home/projects/synthetic.ts":    "export const x = 1;",
			})
			defer projectSession.Close()
			session := NewLSPSession(projectSession, nil)
			defer session.Close()
			params := &CreateSnapshotParams{
				OpenProjects:       []DocumentIdentifier{{FileName: "/home/projects/p/tsconfig.json"}},
				PrepareAutoImports: &DocumentIdentifier{FileName: fileName},
				CreatePrograms: []*CreateSnapshotProgramParams{{
					RootFiles:       []DocumentIdentifier{{FileName: "/home/projects/synthetic.ts"}},
					CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
				}},
			}
			var response *CreateSnapshotResponse
			var err error
			expectedID := SnapshotID(1)
			if update {
				base, e := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{})
				assert.NilError(t, e)
				expectedID = base.Snapshot + 1
				response, err = session.handleUpdateSnapshot(t.Context(), &UpdateSnapshotParams{
					Snapshot: base.Snapshot,
					Changes:  params,
				})
			} else {
				response, err = session.handleCreateSnapshot(t.Context(), params)
			}
			assert.NilError(t, err)
			assert.Equal(t, response.Snapshot, expectedID)
			assert.Equal(t, len(*response.Operation.CreatedPrograms), 1)
			snapshot := session.snapshots[response.Snapshot].snapshot
			proj := snapshot.GetDefaultProject("file:///home/projects/p/index.ts")
			assert.Assert(t, snapshot.AutoImportRegistry().IsPreparedForImportingFile(fileName, proj.ID(), snapshot.UserPreferences()))
		})
	}
}

func TestPreparedIndependentSnapshotPreservesLSPOverlays(t *testing.T) {
	t.Parallel()
	const fileName = "/home/projects/p/index.ts"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/home/projects/p/tsconfig.json":                    "{}",
		fileName:                                            "diskOnly",
		"/home/projects/p/package.json":                     `{"dependencies":{"my-pkg":"1.0.0"}}`,
		"/home/projects/p/node_modules/my-pkg/package.json": `{"name":"my-pkg","version":"1.0.0","types":"index.d.ts"}`,
		"/home/projects/p/node_modules/my-pkg/index.d.ts":   "export declare const packageValue: number;",
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(t.Context(), "file:///home/projects/p/index.ts", 1, "packageV", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	base, err := session.handleGetCurrentLanguageServerSnapshot(t.Context(), &GetCurrentLanguageServerSnapshotParams{})
	assert.NilError(t, err)
	prepared, err := session.handleUpdateSnapshot(t.Context(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		Changes: &CreateSnapshotParams{
			PrepareAutoImports: &DocumentIdentifier{FileName: fileName},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[prepared.Snapshot].snapshot
	content, ok := snapshot.ReadFile(fileName)
	assert.Assert(t, ok)
	assert.Equal(t, content, "packageV")
	proj := snapshot.GetDefaultProject("file:///home/projects/p/index.ts")
	assert.Equal(t, proj.GetProgram().GetSourceFile(fileName).Text(), "packageV")
	completions, err := session.handleGetCompletionsAtPosition(t.Context(), &GetCompletionsAtPositionParams{
		Snapshot:      prepared.Snapshot,
		Project:       proj.ID(),
		File:          DocumentIdentifier{FileName: fileName},
		Position:      8,
		IncludeSymbol: true,
	})
	assert.NilError(t, err)
	for _, entry := range completions.Entries {
		if entry.Name == "packageValue" {
			return
		}
	}
	t.Fatal("expected dependency auto-import completion from an LSP-derived snapshot")
}

func TestFreshSnapshotIncludesDependencyAutoImports(t *testing.T) {
	t.Parallel()
	for _, prepare := range []bool{false, true} {
		t.Run(map[bool]string{false: "retry", true: "prepared"}[prepare], func(t *testing.T) {
			t.Parallel()
			const fileName = "/home/projects/MixedCase/index.ts"
			projectSession, _ := projecttestutil.Setup(map[string]any{
				"/home/projects/MixedCase/tsconfig.json":                    "{}",
				fileName:                                                    "packageV",
				"/home/projects/MixedCase/package.json":                     `{"dependencies":{"my-pkg":"1.0.0"}}`,
				"/home/projects/MixedCase/node_modules/my-pkg/package.json": `{"name":"my-pkg","version":"1.0.0","types":"index.d.ts"}`,
				"/home/projects/MixedCase/node_modules/my-pkg/index.d.ts":   "export declare const packageValue: number;",
			})
			defer projectSession.Close()
			projectSession.DidOpenFile(t.Context(), "file:///home/projects/MixedCase/index.ts", 1, "editorOnly", lsproto.LanguageKindTypeScript)
			session := NewLSPSession(projectSession, nil)
			defer session.Close()
			params := &CreateSnapshotParams{
				OpenProjects: []DocumentIdentifier{{FileName: "/home/projects/MixedCase/tsconfig.json"}},
			}
			if prepare {
				params.PrepareAutoImports = &DocumentIdentifier{FileName: fileName}
			}
			response, err := session.handleCreateSnapshot(t.Context(), params)
			assert.NilError(t, err)
			snapshot := session.snapshots[response.Snapshot].snapshot
			content, ok := snapshot.ReadFile(fileName)
			assert.Assert(t, ok)
			assert.Equal(t, content, "packageV")
			proj := snapshot.GetDefaultProject("file:///home/projects/MixedCase/index.ts")
			completions, err := session.handleGetCompletionsAtPosition(t.Context(), &GetCompletionsAtPositionParams{
				Snapshot:      response.Snapshot,
				Project:       proj.ID(),
				File:          DocumentIdentifier{FileName: fileName},
				Position:      8,
				IncludeSymbol: prepare,
			})
			assert.NilError(t, err)
			assert.Assert(t, completions != nil)
			for _, entry := range completions.Entries {
				if entry.Name == "packageValue" {
					return
				}
			}
			t.Fatal("expected dependency auto-import completion from a fresh API snapshot")
		})
	}
}

func TestCompletionWithSymbolsAndExistingImportDoesNotDeadlock(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	const content = "import { otherValue } from \"./export\";\nsomeV"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "module": "esnext", "target": "esnext" } }`,
		"/home/projects/p/src/export.ts": "export const otherValue = 0; export const someValue = 1;",
		fileName:                         content,
	})
	defer projectSession.Close()
	projectSession.Configure(lsutil.UserPreferences{
		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
	})

	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	snapshotResp, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenFiles:          []DocumentIdentifier{{FileName: fileName}},
		PrepareAutoImports: &DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	proj, err := session.handleGetDefaultProjectForFile(t.Context(), &GetDefaultProjectForFileParams{
		Snapshot: snapshotResp.Snapshot,
		File:     DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	assert.Assert(t, proj != nil, "file should resolve to a default project")

	// IncludeSymbol pins completion to the single persistent API checker. When
	// ranking the auto-import completion, the existing import makes the view
	// consult that checker. This used to try to acquire the same checker again
	// and deadlock.
	type completionResult struct {
		completions *CompletionInfoResponse
		err         error
	}
	result := make(chan completionResult, 1)
	go func() {
		completions, e := session.handleGetCompletionsAtPosition(t.Context(), &GetCompletionsAtPositionParams{
			Snapshot:      snapshotResp.Snapshot,
			Project:       proj.Id,
			File:          DocumentIdentifier{FileName: fileName},
			Position:      uint32(len(content)),
			IncludeSymbol: true,
		})
		result <- completionResult{completions: completions, err: e}
	}()

	select {
	case completion := <-result:
		assert.NilError(t, completion.err)
		assert.Assert(t, completion.completions != nil, "expected a completion list")
		for _, entry := range completion.completions.Entries {
			if entry.Name == "someValue" {
				return
			}
		}
		t.Fatal("expected auto-import completion for someValue")
	case <-time.After(10 * time.Second):
		t.Fatal("completion request deadlocked while examining an existing import")
	}
}
