package api

import (
	"context"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

// TestSessionTracksAndReleasesAPIRefs verifies that an API session holds at most
// one ref per opened project/file (opens are idempotent) and releases exactly
// those refs when the session is closed, so it never leaks or over-releases refs
// in the underlying (potentially shared) project session.
func TestSessionTracksAndReleasesAPIRefs(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	t.Run("project opens are idempotent and released on close", func(t *testing.T) {
		t.Parallel()
		const configFileName = "/home/projects/p/tsconfig.json"
		files := map[string]any{
			configFileName:                  `{ "compilerOptions": { "strict": true } }`,
			"/home/projects/p/src/index.ts": `export const x = 1;`,
		}
		projectSession, _ := projecttestutil.Setup(files)
		defer projectSession.Close()
		session := NewSession(projectSession, nil)

		_, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			OpenProjects: []DocumentIdentifier{{FileName: configFileName}},
		})
		assert.NilError(t, err)
		assert.Equal(t, session.openProjects.Len(), 1)

		// Opening the same project again must not take an additional ref.
		_, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			OpenProjects: []DocumentIdentifier{{FileName: configFileName}},
		})
		assert.NilError(t, err)
		assert.Equal(t, session.openProjects.Len(), 1)

		assert.Assert(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path(configFileName)) != nil)

		// Closing the session releases the single API ref, so the project is no
		// longer kept loaded.
		session.Close()
		assert.Equal(t, session.openProjects.Len(), 0)
		assert.Assert(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path(configFileName)) == nil)
	})

	t.Run("explicit close releases the project ref", func(t *testing.T) {
		t.Parallel()
		const configFileName = "/home/projects/p/tsconfig.json"
		files := map[string]any{
			configFileName:                  `{ "compilerOptions": { "strict": true } }`,
			"/home/projects/p/src/index.ts": `export const x = 1;`,
		}
		projectSession, _ := projecttestutil.Setup(files)
		defer projectSession.Close()
		session := NewSession(projectSession, nil)
		defer session.Close()

		_, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			OpenProjects: []DocumentIdentifier{{FileName: configFileName}},
		})
		assert.NilError(t, err)
		assert.Equal(t, session.openProjects.Len(), 1)
		assert.Assert(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path(configFileName)) != nil)

		// Closing a project we hold releases the ref and unloads the project.
		_, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			CloseProjects: []DocumentIdentifier{{FileName: configFileName}},
		})
		assert.NilError(t, err)
		assert.Equal(t, session.openProjects.Len(), 0)
		assert.Assert(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path(configFileName)) == nil)

		// Closing a project we don't hold is a no-op (never over-releases).
		_, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			CloseProjects: []DocumentIdentifier{{FileName: configFileName}},
		})
		assert.NilError(t, err)
		assert.Equal(t, session.openProjects.Len(), 0)
	})

	t.Run("file opens are idempotent and released on close", func(t *testing.T) {
		t.Parallel()
		const fileName = "/home/projects/p/src/index.ts"
		files := map[string]any{
			"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
			fileName:                         `export const x = 1;`,
		}
		projectSession, _ := projecttestutil.Setup(files)
		defer projectSession.Close()
		session := NewSession(projectSession, nil)

		_, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			OpenFiles: []DocumentIdentifier{{FileName: fileName}},
		})
		assert.NilError(t, err)
		assert.Equal(t, session.openFiles.Len(), 1)

		// Re-opening the same file must not take an additional ref.
		_, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			OpenFiles: []DocumentIdentifier{{FileName: fileName}},
		})
		assert.NilError(t, err)
		assert.Equal(t, session.openFiles.Len(), 1)

		// The file should resolve to the configured project via ancestor search.
		assert.Assert(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/p/tsconfig.json")) != nil)

		// Closing a file we don't hold is a no-op (never over-releases).
		_, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			CloseFiles: []DocumentIdentifier{{FileName: "/home/projects/p/other.ts"}},
		})
		assert.NilError(t, err)
		assert.Equal(t, session.openFiles.Len(), 1)

		// Explicitly closing the held file releases the ref.
		_, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			CloseFiles: []DocumentIdentifier{{FileName: fileName}},
		})
		assert.NilError(t, err)
		assert.Equal(t, session.openFiles.Len(), 0)

		// Closing the file also tears down the configured project that was
		// auto-loaded to serve it, instead of leaking it.
		assert.Assert(t,
			projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/p/tsconfig.json")) == nil,
			"configured project auto-loaded for the API-opened file should be unloaded after close",
		)

		session.Close()
		assert.Equal(t, session.openFiles.Len(), 0)
	})

	t.Run("relative file paths normalize consistently for open and close", func(t *testing.T) {
		t.Parallel()
		// The project session's current directory is "/", so a relative path
		// resolves to the corresponding absolute path.
		files := map[string]any{
			"/src/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
			"/src/index.ts":      `export const x = 1;`,
		}
		projectSession, _ := projecttestutil.Setup(files)
		defer projectSession.Close()
		session := NewSession(projectSession, nil)
		defer session.Close()

		// Open via a relative path; it should be tracked under the absolute path
		// and resolve to the containing configured project.
		openResp, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			OpenFiles: []DocumentIdentifier{{FileName: "src/index.ts"}},
		})
		assert.NilError(t, err)
		assert.Equal(t, session.openFiles.Len(), 1)
		assert.Assert(t, session.openFiles.Has(tspath.Path("/src/index.ts")))
		assert.Assert(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path("/src/tsconfig.json")) != nil)

		// getDefaultProjectForFile must also resolve a relative path to the same
		// configured project (it builds a URI from the identifier internally).
		proj, err := session.handleGetDefaultProjectForFile(context.Background(), &GetDefaultProjectForFileParams{
			Snapshot: openResp.Snapshot,
			File:     DocumentIdentifier{FileName: "src/index.ts"},
		})
		assert.NilError(t, err)
		assert.Assert(t, proj != nil, "relative path should resolve to a default project")
		assert.Equal(t, proj.ConfigFileName, "/src/tsconfig.json")

		// Re-opening via the absolute path must match the relative open (no new ref).
		_, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			OpenFiles: []DocumentIdentifier{{FileName: "/src/index.ts"}},
		})
		assert.NilError(t, err)
		assert.Equal(t, session.openFiles.Len(), 1)

		// Closing via a relative path must match the path stored when opening.
		_, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			CloseFiles: []DocumentIdentifier{{FileName: "src/index.ts"}},
		})
		assert.NilError(t, err)
		assert.Equal(t, session.openFiles.Len(), 0)
		assert.Assert(t,
			projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path("/src/tsconfig.json")) == nil,
			"configured project should be unloaded after closing the relatively-pathed file",
		)
	})
}

// TestUpdateSnapshotResponseSkipsUnloadedAncestorProject verifies that API
// updateSnapshot does not report unloaded ancestor project placeholders. This
// covers the case where opening a file loads its nearest configured project
// while solution search discovers an ancestor tsconfig placeholder whose command
// line is still nil.
func TestUpdateSnapshotResponseSkipsUnloadedAncestorProject(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const (
		nestedConfigFileName   = "/repo/packages/app/tsconfig.json"
		ancestorConfigFileName = "/repo/packages/tsconfig.json"
		fileName               = "/repo/packages/app/src/index.ts"
	)
	files := map[string]any{
		ancestorConfigFileName: `{ "files": [] }`,
		nestedConfigFileName: `{
			"compilerOptions": { "composite": true },
			"include": ["**/*"]
		}`,
		fileName: `let s: string = 1234;`,
	}
	projectSession, _ := projecttestutil.Setup(files)
	defer projectSession.Close()

	projectSession.DidOpenFile(context.Background(), lsproto.DocumentUri("file://"+fileName), 1, files[fileName].(string), lsproto.LanguageKindTypeScript)
	snapshot := projectSession.Snapshot()
	nestedProject := snapshot.ProjectCollection.ConfiguredProject(tspath.Path(nestedConfigFileName))
	assert.Assert(t, nestedProject != nil)
	assert.Assert(t, nestedProject.CommandLine != nil)
	ancestorProject := snapshot.ProjectCollection.ConfiguredProject(tspath.Path(ancestorConfigFileName))
	assert.Assert(t, ancestorProject != nil)
	assert.Assert(t, ancestorProject.CommandLine == nil)

	session := NewSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: nestedConfigFileName}},
	})
	assert.NilError(t, err)

	var foundNestedProject bool
	var foundAncestorProject bool
	for _, project := range response.Projects {
		switch project.ConfigFileName {
		case nestedConfigFileName:
			foundNestedProject = true
			assert.Assert(t, project.RootFiles != nil)
			assert.Assert(t, project.CompilerOptions != nil)
		case ancestorConfigFileName:
			foundAncestorProject = true
		}
	}
	assert.Assert(t, foundNestedProject)
	assert.Assert(t, !foundAncestorProject)
}
