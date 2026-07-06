package api

import (
	"context"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
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
	session := NewSession(projectSession, nil)
	defer session.Close()

	ctx := context.Background()

	snapshotResp, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)

	proj, err := session.handleGetDefaultProjectForFile(ctx, &GetDefaultProjectForFileParams{
		Snapshot: snapshotResp.Snapshot,
		File:     DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	assert.Assert(t, proj != nil, "file should resolve to a default project")

	// content is pure ASCII, so the UTF-16 caret offset equals the byte length.
	completions, err := session.handleGetCompletionsAtPosition(ctx, &GetCompletionsAtPositionParams{
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
		typeResp, err := session.handleGetTypeOfSymbol(ctx, &GetTypeOfSymbolParams{
			Snapshot: snapshotResp.Snapshot,
			Project:  proj.Id,
			Symbol:   entry.Symbol.Id,
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
// setupLanguageService called Project.ConfigFilePath(), which is only valid for
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
	session := NewSession(projectSession, nil)
	defer session.Close()

	ctx := context.Background()

	snapshotResp, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)

	proj, err := session.handleGetDefaultProjectForFile(ctx, &GetDefaultProjectForFileParams{
		Snapshot: snapshotResp.Snapshot,
		File:     DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	assert.Assert(t, proj != nil, "file should resolve to an inferred default project")

	// This request previously panicked in setupLanguageService.
	// content is pure ASCII, so the UTF-16 caret offset equals the byte length.
	completions, err := session.handleGetCompletionsAtPosition(ctx, &GetCompletionsAtPositionParams{
		Snapshot: snapshotResp.Snapshot,
		Project:  proj.Id,
		File:     DocumentIdentifier{FileName: fileName},
		Position: uint32(len(content)),
	})
	assert.NilError(t, err)
	assert.Assert(t, completions != nil, "expected a completion list for array members")
}
