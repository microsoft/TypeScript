package api

import (
	"context"
	"slices"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

// TestUpdateTemporarySnapshot verifies that a temporary snapshot reflects an
// overridden file content, leaves the session's latest snapshot untouched, and
// does not disturb the original snapshot's view of the file.
func TestUpdateTemporarySnapshot(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	// Valid content: no type errors.
	const content = "export const x: number = 1;"

	files := map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
		fileName:                         content,
	}
	projectSession, _ := projecttestutil.Setup(files)
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()

	ctx := context.Background()

	baseResp, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)
	assert.Assert(t, len(baseResp.Projects) > 0, "expected at least one project")
	projectID := baseResp.Projects[0].Id

	// The base snapshot should be the session's latest snapshot.
	baseHandle := baseResp.Snapshot
	assert.Equal(t, session.latestSnapshot, baseHandle)

	// Sanity: the original content type-checks cleanly.
	baseDiags, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: baseHandle,
		Project:  projectID,
		File:     &DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(baseDiags), 0, "original content should have no semantic errors")

	// Create a temporary snapshot whose content introduces a type error.
	const badText = "export const x: string = 1;"
	tempResp, err := session.handleUpdateTemporarySnapshot(ctx, &UpdateTemporarySnapshotParams{
		Snapshot: baseHandle,
		File:     DocumentIdentifier{FileName: fileName},
		NewText:  badText,
	})
	assert.NilError(t, err)
	assert.Assert(t, tempResp.Snapshot != baseHandle, "temporary snapshot should have a distinct handle")

	// The temporary snapshot must NOT become the session's latest snapshot.
	assert.Equal(t, session.latestSnapshot, baseHandle, "latest snapshot must be unchanged by a temporary update")

	// The temporary snapshot reflects the overridden content and reports the error.
	tempProjectID := tempResp.Projects[0].Id
	tempDiags, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: tempResp.Snapshot,
		Project:  tempProjectID,
		File:     &DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	assert.Assert(t, len(tempDiags) > 0, "temporary content should have a semantic error")

	// The original snapshot is unaffected: still no errors.
	baseDiagsAgain, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: baseHandle,
		Project:  projectID,
		File:     &DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(baseDiagsAgain), 0, "original snapshot must be unaffected by the temporary update")

	// Releasing the temporary snapshot cleans it up without affecting the base.
	_, err = session.handleRelease(ctx, &ReleaseParams{Snapshot: tempResp.Snapshot})
	assert.NilError(t, err)

	baseDiagsFinal, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: baseHandle,
		Project:  projectID,
		File:     &DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(baseDiagsFinal), 0, "base snapshot should remain valid after releasing the temporary snapshot")
}

func TestUpdateTemporarySnapshotAddsUnopenedFile(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const existingFileName = "/home/projects/p/src/index.ts"
	const temporaryFileName = "/home/projects/p/src/temporary.ts"
	files := map[string]any{
		"/home/projects/p/tsconfig.json": `{ "include": ["src/**/*.ts"] }`,
		existingFileName:                 "export const existing = 1;",
	}
	projectSession, _ := projecttestutil.Setup(files)
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()

	ctx := context.Background()
	baseResp, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: existingFileName}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(baseResp.Projects), 1)
	assert.Assert(t, !slices.Contains(baseResp.Projects[0].RootFiles, temporaryFileName))

	tempResp, err := session.handleUpdateTemporarySnapshot(ctx, &UpdateTemporarySnapshotParams{
		Snapshot: baseResp.Snapshot,
		File:     DocumentIdentifier{FileName: temporaryFileName},
		NewText:  "export const temporary = 1;",
	})
	assert.NilError(t, err)
	assert.Equal(t, len(tempResp.Projects), 1)
	assert.Assert(t, slices.Contains(tempResp.Projects[0].RootFiles, temporaryFileName), "temporary file should be included in the configured project")
	assert.Assert(t, !slices.Contains(baseResp.Projects[0].RootFiles, temporaryFileName), "base snapshot should remain unchanged")

	_, err = session.handleRelease(ctx, &ReleaseParams{Snapshot: tempResp.Snapshot})
	assert.NilError(t, err)
}

func TestUpdateTemporarySnapshotRejectsUnsupportedExtension(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()

	ctx := context.Background()
	const fileName = "/home/projects/p/src/temporary.custom"
	baseResp, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{})
	assert.NilError(t, err)
	_, err = session.handleUpdateTemporarySnapshot(ctx, &UpdateTemporarySnapshotParams{
		Snapshot: baseResp.Snapshot,
		File:     DocumentIdentifier{FileName: fileName},
		NewText:  "export const temporary = 1;",
	})
	assert.ErrorContains(t, err, "unsupported file extension")
}

func TestUpdateTemporarySnapshotUsesClientSnapshotAsBase(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	const laterFileName = "/home/projects/p/src/later.ts"
	files := map[string]any{
		"/home/projects/p/tsconfig.json": `{ "include": ["src/**/*.ts"] }`,
		fileName:                         "export const existing = 1;",
	}
	projectSession, _ := projecttestutil.Setup(files)
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()

	ctx := context.Background()
	baseResp, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)

	laterURI := DocumentIdentifier{FileName: laterFileName}.ToURI(projectSession.GetCurrentDirectory())
	projectSession.DidOpenFile(ctx, laterURI, 1, "export const later = 1;", lsproto.LanguageKindTypeScript)

	tempResp, err := session.handleUpdateTemporarySnapshot(ctx, &UpdateTemporarySnapshotParams{
		Snapshot: baseResp.Snapshot,
		File:     DocumentIdentifier{FileName: fileName},
		NewText:  "export const existing = 2;",
	})
	assert.NilError(t, err)
	assert.Equal(t, len(tempResp.Projects), 1)
	assert.Assert(t, !slices.Contains(tempResp.Projects[0].RootFiles, laterFileName), "temporary snapshot should not include files opened after the client snapshot")

	_, err = session.handleRelease(ctx, &ReleaseParams{Snapshot: tempResp.Snapshot})
	assert.NilError(t, err)
}
