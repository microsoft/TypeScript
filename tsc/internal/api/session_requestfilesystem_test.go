package api

import (
	"context"
	"errors"
	"fmt"
	"strconv"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/api/requestfilesystem"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func updateCurrentLanguageServerSnapshot(ctx context.Context, session *Session, changes *CreateSnapshotParams) (*CreateSnapshotResponse, error) {
	base, err := session.handleGetCurrentLanguageServerSnapshot(ctx, &GetCurrentLanguageServerSnapshotParams{
		Changes: &LanguageServerSnapshotChanges{SnapshotRequestChangesParams: changes.SnapshotRequestChangesParams},
	})
	if err != nil {
		return nil, err
	}
	requestChanges := changes.SnapshotRequestChangesParams
	requestChanges.EnsurePrograms = &EnsurePrograms{All: true}
	return session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		Changes: &CreateSnapshotParams{
			SnapshotRequestChangesParams: requestChanges,
			FileSystem:                   changes.FileSystem,
		},
	})
}

func TestEditorChangeInvalidatesRequestSymlinkAlias(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["alias.ts"] }`,
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///target.ts", 1, "old", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := updateCurrentLanguageServerSnapshot(ctx, session, &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindLayer,
			Symlinks: map[string]requestfilesystem.RequestSymlink{
				"/alias.ts": {Target: "/target.ts"},
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, session.snapshots[base.Snapshot].snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram().GetSourceFile("/alias.ts").Text(), "old")

	projectSession.DidChangeFile(ctx, "file:///target.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{{
		WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: "new"},
	}})
	updated, err := updateCurrentLanguageServerSnapshot(ctx, session, &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindLayer,
			Symlinks: map[string]requestfilesystem.RequestSymlink{
				"/alias.ts": {Target: "/target.ts"},
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, session.snapshots[updated.Snapshot].snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram().GetSourceFile("/alias.ts").Text(), "new")
}

func TestLargeRequestLayerUpdateRetainsChanges(t *testing.T) {
	t.Parallel()

	const fillerCount = 1000
	baseFiles := make(map[string]string, fillerCount)
	updatedFiles := make(map[string]string, fillerCount+1)
	for i := range fillerCount {
		fileName := fmt.Sprintf("/unused/file%d.ts", i)
		baseFiles[fileName] = "old"
		updatedFiles[fileName] = "new"
	}
	updatedFiles["/index.ts"] = "new"

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["index.ts"] }`,
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///index.ts", 1, "old", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := updateCurrentLanguageServerSnapshot(ctx, session, &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem:   &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindLayer, Files: baseFiles},
	})
	assert.NilError(t, err)

	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		Changes: &CreateSnapshotParams{
			EnsurePrograms: &EnsurePrograms{All: true},
			FileSystem:     &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindLayer, Files: updatedFiles},
		},
	})
	assert.NilError(t, err)
	contents, ok := session.snapshots[updated.Snapshot].snapshot.ReadFile("/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, "new")
	assert.Equal(t, session.snapshots[updated.Snapshot].snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram().GetSourceFile("/index.ts").Text(), "new")
}

func TestAutoImportCloneRetainsRequestFileSystem(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := updateCurrentLanguageServerSnapshot(ctx, session, &CreateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindFull,
			Files: map[string]string{
				"/index.ts": "request",
			},
		},
	})
	assert.NilError(t, err)
	baseSnapshot := session.snapshots[base.Snapshot].snapshot

	clone := session.snapshotHost.CloneSnapshotWithAutoImports(ctx, baseSnapshot, "file:///index.ts", nil)
	defer clone.Deref()
	content, ok := clone.ReadFile("/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, content, "request")
}

func TestUnmaskedOverlayContinuesUpdating(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["index.ts"] }`,
		"/index.ts":      "host",
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///index.ts", 1, "overlay1", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	masked, err := updateCurrentLanguageServerSnapshot(ctx, session, &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindLayer,
			Files: map[string]string{"/index.ts": "request"},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, session.snapshots[masked.Snapshot].snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram().GetSourceFile("/index.ts").Text(), "request")

	unmasked, err := updateCurrentLanguageServerSnapshot(ctx, session, &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)
	assert.Equal(t, session.snapshots[unmasked.Snapshot].snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram().GetSourceFile("/index.ts").Text(), "overlay1")

	projectSession.DidChangeFile(ctx, "file:///index.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{{
		WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: "overlay2"},
	}})
	updated, err := updateCurrentLanguageServerSnapshot(ctx, session, &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)
	assert.Equal(t, session.snapshots[updated.Snapshot].snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram().GetSourceFile("/index.ts").Text(), "overlay2")
}

func TestRequestHostMountReadsEditorOverlays(t *testing.T) {
	t.Parallel()

	for _, kind := range []requestfilesystem.Kind{requestfilesystem.KindFull, requestfilesystem.KindLayer} {
		t.Run(string(kind), func(t *testing.T) {
			t.Parallel()

			ctx := context.Background()
			projectSession, _ := projecttestutil.Setup(map[string]any{
				"/host/index.ts": "host",
			})
			defer projectSession.Close()
			projectSession.DidOpenFile(ctx, "file:///host/index.ts", 1, "overlay", lsproto.LanguageKindTypeScript)
			projectSession.DidOpenFile(ctx, "file:///host/new.ts", 1, "new overlay", lsproto.LanguageKindTypeScript)
			session := NewLSPSession(projectSession, nil)
			defer session.Close()

			base, err := updateCurrentLanguageServerSnapshot(ctx, session, &CreateSnapshotParams{
				FileSystem: &requestfilesystem.RequestFileSystem{
					Kind: kind,
					Files: map[string]string{
						"/host/index.ts": "request",
						"/host/new.ts":   "request",
					},
					Symlinks: map[string]requestfilesystem.RequestSymlink{
						"/mounted": {Target: "/host", Host: true},
					},
				},
			})
			assert.NilError(t, err)
			snapshot := session.snapshots[base.Snapshot].snapshot
			content, ok := snapshot.ReadFile("/mounted/index.ts")
			assert.Assert(t, ok)
			assert.Equal(t, content, "overlay")
			content, ok = snapshot.ReadFile("/mounted/new.ts")
			assert.Assert(t, ok)
			assert.Equal(t, content, "new overlay")
		})
	}
}

func TestCreateSnapshotUsesFullFileSystem(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/host.ts": "host",
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindFull,
			Files: map[string]string{
				"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["src/index.ts"] }`,
				"/src/index.ts":  `export const value = "memory";`,
				"/src/other.ts":  `export const other = true;`,
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(response.Projects), 1)
	assert.Equal(t, response.Projects[0].ConfigFileName, "/tsconfig.json")

	snapshot := session.snapshots[response.Snapshot].snapshot
	contents, ok := snapshot.ReadFile("/src/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, `export const value = "memory";`)
	_, ok = snapshot.ReadFile("/host.ts")
	assert.Assert(t, !ok)

	// Carrying the same filesystem forward without a delta must preserve
	// incremental state instead of forcing a full program rebuild.
	program := snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram()
	unchanged, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{Snapshot: response.Snapshot})
	assert.NilError(t, err)
	unchangedSnapshot := session.snapshots[unchanged.Snapshot].snapshot
	assert.Assert(t, unchangedSnapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram() == program)
	response = unchanged

	// Supplying a new filesystem replaces inherited snapshot file caches even
	// when the caller does not redundantly list every file in FileChanges.
	response, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: response.Snapshot,
		Changes: &CreateSnapshotParams{
			EnsurePrograms: &EnsurePrograms{All: true},
			FileSystem: &requestfilesystem.RequestFileSystem{
				Kind: requestfilesystem.KindFull,
				Files: map[string]string{
					"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["src/index.ts", "src/other.ts"] }`,
					"/src/index.ts":  `export const value = "updated";`,
					"/src/other.ts":  `export const other = true;`,
				},
			},
		},
	})
	assert.NilError(t, err)
	snapshot = session.snapshots[response.Snapshot].snapshot
	contents, ok = snapshot.ReadFile("/src/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, `export const value = "updated";`)

	// A new layer retains the base snapshot's supplied filesystem for every file
	// other than its override.
	temporary, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: response.Snapshot,
		Changes: &CreateSnapshotParams{
			FileSystem: &requestfilesystem.RequestFileSystem{
				Kind:  requestfilesystem.KindLayer,
				Files: map[string]string{"/src/index.ts": `export const value = "temporary";`},
			},
		},
	})
	assert.NilError(t, err)
	temporarySnapshot := session.snapshots[temporary.Snapshot].snapshot
	contents, ok = temporarySnapshot.ReadFile("/src/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, `export const value = "temporary";`)
	contents, ok = temporarySnapshot.ReadFile("/src/other.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, `export const other = true;`)
}

func TestUpdateSnapshotRequestFileOverridesOpenOverlay(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/index.ts": "host",
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(context.Background(), "file:///index.ts", 1, "overlay", lsproto.LanguageKindTypeScript)

	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindLayer,
			Files: map[string]string{
				"/index.ts": "request",
			},
		},
	})
	assert.NilError(t, err)

	snapshot := session.snapshots[response.Snapshot].snapshot
	contents, ok := snapshot.ReadFile("/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, "request")
}

func TestUpdateSnapshotRequestTombstoneRemovesOpenOverlay(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/index.ts": "host",
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(context.Background(), "file:///index.ts", 1, "overlay", lsproto.LanguageKindTypeScript)

	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:         requestfilesystem.KindLayer,
			RemovedPaths: []string{"/index.ts"},
		},
	})
	assert.NilError(t, err)

	snapshot := session.snapshots[response.Snapshot].snapshot
	_, ok := snapshot.ReadFile("/index.ts")
	assert.Assert(t, !ok)
	assert.Assert(t, snapshot.GetDefaultProject("file:///index.ts") == nil)
}

func TestUpdateSnapshotRequestTombstoneRemovesHostlessOpenOverlay(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	projectSession.DidOpenFile(context.Background(), "file:///index.ts", 1, "overlay", lsproto.LanguageKindTypeScript)

	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:         requestfilesystem.KindLayer,
			RemovedPaths: []string{"/index.ts"},
		},
	})
	assert.NilError(t, err)

	snapshot := session.snapshots[response.Snapshot].snapshot
	_, ok := snapshot.ReadFile("/index.ts")
	assert.Assert(t, !ok)
	assert.Assert(t, snapshot.GetDefaultProject("file:///index.ts") == nil)
}

func TestUpdateSnapshotRequestFileMasksHostlessOpenOverlayDirectory(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	projectSession.DidOpenFile(context.Background(), "file:///src/index.ts", 1, "overlay", lsproto.LanguageKindTypeScript)

	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindLayer,
			Files: map[string]string{"/src": "request"},
		},
	})
	assert.NilError(t, err)

	snapshot := session.snapshots[response.Snapshot].snapshot
	contents, ok := snapshot.ReadFile("/src")
	assert.Assert(t, ok)
	assert.Equal(t, contents, "request")
	_, ok = snapshot.ReadFile("/src/index.ts")
	assert.Assert(t, !ok)
	assert.Assert(t, snapshot.GetDefaultProject("file:///src/index.ts") == nil)
}

func TestUpdateSnapshotRequestMaskUpdatesOpenConfiguredProjects(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["index.ts"] }`,
		"/index.ts":      "host",
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(context.Background(), "file:///index.ts", 1, "overlay", lsproto.LanguageKindTypeScript)

	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	base, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		Changes: &LanguageServerSnapshotChanges{
			OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		},
	})
	assert.NilError(t, err)
	baseSnapshot := session.snapshots[base.Snapshot].snapshot
	assert.Assert(t, baseSnapshot.ProjectCollection.GetOpenConfiguredProjects().Has("/tsconfig.json"))

	masked, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		Changes: &CreateSnapshotParams{
			FileSystem: &requestfilesystem.RequestFileSystem{
				Kind: requestfilesystem.KindLayer,
				Files: map[string]string{
					"/index.ts": "request",
				},
			},
		},
	})
	assert.NilError(t, err)
	maskedSnapshot := session.snapshots[masked.Snapshot].snapshot
	assert.Assert(t, !maskedSnapshot.ProjectCollection.GetOpenConfiguredProjects().Has("/tsconfig.json"))

	unmasked, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		Changes: &LanguageServerSnapshotChanges{
			OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		},
	})
	assert.NilError(t, err)
	unmaskedSnapshot := session.snapshots[unmasked.Snapshot].snapshot
	assert.Assert(t, unmaskedSnapshot.ProjectCollection.GetOpenConfiguredProjects().Has("/tsconfig.json"))
}

func TestUpdateSnapshotConfigChangeSkipsMaskedOpenOverlay(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/index.ts": "host",
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(context.Background(), "file:///index.ts", 1, "overlay", lsproto.LanguageKindTypeScript)

	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	base, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{})
	assert.NilError(t, err)

	updated, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		Changes: &CreateSnapshotParams{
			FileSystem: &requestfilesystem.RequestFileSystem{
				Kind: requestfilesystem.KindLayer,
				Files: map[string]string{
					"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["index.ts"] }`,
				},
				RemovedPaths: []string{"/index.ts"},
			},
		},
	})
	assert.NilError(t, err)

	snapshot := session.snapshots[updated.Snapshot].snapshot
	_, ok := snapshot.ReadFile("/index.ts")
	assert.Assert(t, !ok)
}

func TestCreateProgramRetainsFullFileSystem(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	ctx := context.Background()
	base, err := session.handleCreateSnapshot(ctx, &CreateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: "/old.ts"}},
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindFull,
			Files: map[string]string{
				"/old.ts": `export const oldValue = 1;`,
				"/new.ts": `export const newValue = 2;`,
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(base.Projects), 1)

	created, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		Changes: &CreateSnapshotParams{
			CreatePrograms: []*CreateSnapshotProgramParams{{
				RootFiles:       []DocumentIdentifier{{FileName: "/new.ts"}},
				CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
			}},
		},
	})
	assert.NilError(t, err)

	snapshot, err := session.getSnapshotData(created.Snapshot)
	assert.NilError(t, err)
	program, err := snapshot.getProgram(project.ID((*created.Operation.CreatedPrograms)[0]))
	assert.NilError(t, err)
	assert.Assert(t, program.GetSourceFile("/new.ts") != nil)
}

func TestSnapshotUpdateFullFileSystemIsTotal(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/host.ts": "host",
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{})
	assert.NilError(t, err)
	replaced, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		Changes: &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindFull,
			Files: map[string]string{
				"/memory.ts": "memory",
			},
		}},
	})
	assert.NilError(t, err)

	snapshot := session.snapshots[replaced.Snapshot].snapshot
	contents, ok := snapshot.ReadFile("/memory.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, "memory")
	_, ok = snapshot.ReadFile("/host.ts")
	assert.Assert(t, !ok)
}

func TestSnapshotUpdateCarriesHostFileSystemWithoutOverride(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["index.ts"] }`,
		"/index.ts":      `export const value = true;`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)
	baseSnapshot := session.snapshots[base.Snapshot].snapshot
	program := baseSnapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram()

	updated, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{Snapshot: base.Snapshot})
	assert.NilError(t, err)
	updatedSnapshot := session.snapshots[updated.Snapshot].snapshot
	assert.Assert(t, updatedSnapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram() == program)
}

func TestSnapshotFileSystemLayersPreserveIncrementalState(t *testing.T) {
	t.Parallel()

	for _, baseKind := range []requestfilesystem.Kind{"host", requestfilesystem.KindFull, requestfilesystem.KindLayer} {
		t.Run(string(baseKind), func(t *testing.T) {
			t.Parallel()
			files := map[string]string{
				"/a/tsconfig.json":        `{ "compilerOptions": { "noLib": true }, "include": ["**/*.ts"] }`,
				"/a/index.ts":             `export const value = 1;`,
				"/a/removed/nested.ts":    `export const nested = true;`,
				"/a/removed/deep/file.ts": `export const deep = true;`,
				"/b/tsconfig.json":        `{ "compilerOptions": { "noLib": true }, "files": ["index.ts"] }`,
				"/b/index.ts":             `export const unrelated = true;`,
			}
			hostFiles := make(map[string]any, len(files))
			for path, content := range files {
				hostFiles[path] = content
			}
			projectSession, _ := projecttestutil.Setup(hostFiles)
			defer projectSession.Close()
			session := NewLSPSession(projectSession, nil)
			defer session.Close()
			ctx := context.Background()
			params := &CreateSnapshotParams{
				OpenProjects: []DocumentIdentifier{{FileName: "/a/tsconfig.json"}, {FileName: "/b/tsconfig.json"}},
			}
			if baseKind != "host" {
				params.FileSystem = &requestfilesystem.RequestFileSystem{Kind: baseKind, Files: files}
			}
			base, err := session.handleCreateSnapshot(ctx, params)
			assert.NilError(t, err)
			baseSnapshot := session.snapshots[base.Snapshot].snapshot
			baseProgram := baseSnapshot.ProjectCollection.GetProject(project.ID("/a/tsconfig.json")).GetProgram()
			unrelatedProgram := baseSnapshot.ProjectCollection.GetProject(project.ID("/b/tsconfig.json")).GetProgram()
			unrelatedFile := baseSnapshot.GetFile("/b/index.ts")

			unchanged, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
				Snapshot: base.Snapshot,
				Changes: &CreateSnapshotParams{
					EnsurePrograms: &EnsurePrograms{All: true},
					FileSystem: &requestfilesystem.RequestFileSystem{
						Kind:  requestfilesystem.KindLayer,
						Files: map[string]string{"/a/index.ts": files["/a/index.ts"]},
					},
				},
			})
			assert.NilError(t, err)
			unchangedSnapshot := session.snapshots[unchanged.Snapshot].snapshot
			assert.Assert(t, unchangedSnapshot.ProjectCollection.GetProject(project.ID("/a/tsconfig.json")).GetProgram() == baseProgram)
			assert.Assert(t, unchangedSnapshot.ProjectCollection.GetProject(project.ID("/b/tsconfig.json")).GetProgram() == unrelatedProgram)
			assert.Assert(t, unchangedSnapshot.GetFile("/b/index.ts") == unrelatedFile)

			const updatedText = `export const value = 2;`
			updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
				Snapshot: unchanged.Snapshot,
				Changes: &CreateSnapshotParams{
					EnsurePrograms: &EnsurePrograms{All: true},
					FileSystem: &requestfilesystem.RequestFileSystem{
						Kind:  requestfilesystem.KindLayer,
						Files: map[string]string{"/a/index.ts": updatedText},
					},
				},
			})
			assert.NilError(t, err)
			updatedSnapshot := session.snapshots[updated.Snapshot].snapshot
			updatedProject := updatedSnapshot.ProjectCollection.GetProject(project.ID("/a/tsconfig.json"))
			assert.Assert(t, updatedProject.GetProgram() != baseProgram)
			assert.Equal(t, updatedProject.ProgramUpdateKind, project.ProgramUpdateKindCloned)
			assert.Equal(t, updatedProject.GetProgram().GetSourceFile("/a/index.ts").Text(), updatedText)
			assert.Assert(t, updatedSnapshot.ProjectCollection.GetProject(project.ID("/b/tsconfig.json")).GetProgram() == unrelatedProgram)
			assert.Assert(t, updatedSnapshot.GetFile("/b/index.ts") == unrelatedFile)

			removed, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
				Snapshot: updated.Snapshot,
				Changes: &CreateSnapshotParams{
					EnsurePrograms: &EnsurePrograms{All: true},
					FileSystem: &requestfilesystem.RequestFileSystem{
						Kind:         requestfilesystem.KindLayer,
						RemovedPaths: []string{"/a/removed"},
					},
				},
			})
			assert.NilError(t, err)
			removedSnapshot := session.snapshots[removed.Snapshot].snapshot
			removedProgram := removedSnapshot.ProjectCollection.GetProject(project.ID("/a/tsconfig.json")).GetProgram()
			for _, path := range []string{"/a/removed/nested.ts", "/a/removed/deep/file.ts"} {
				assert.Assert(t, removedProgram.GetSourceFile(path) == nil, path)
				assert.Assert(t, removedSnapshot.GetFile(path) == nil, path)
				assert.Assert(t, baseProgram.GetSourceFile(path) != nil, path)
			}
			assert.Assert(t, removedSnapshot.ProjectCollection.GetProject(project.ID("/b/tsconfig.json")).GetProgram() == unrelatedProgram)
			assert.Assert(t, removedSnapshot.GetFile("/b/index.ts") == unrelatedFile)

			// A request without a base snapshot returns to the host, so the old
			// layer's changed contents and directory tombstones must not survive.
			restored, err := session.handleCreateSnapshot(ctx, &CreateSnapshotParams{SnapshotRequestChangesParams: params.SnapshotRequestChangesParams})
			assert.NilError(t, err)
			restoredSnapshot := session.snapshots[restored.Snapshot].snapshot
			assert.Assert(t, !restoredSnapshot.HasFileSystemOverride())
			restoredProgram := restoredSnapshot.ProjectCollection.GetProject(project.ID("/a/tsconfig.json")).GetProgram()
			assert.Equal(t, restoredProgram.GetSourceFile("/a/index.ts").Text(), files["/a/index.ts"])
			assert.Assert(t, restoredProgram.GetSourceFile("/a/removed/deep/file.ts") != nil)
		})
	}
}

func TestSnapshotFileSystemLayerWithoutBaseUpdatesHostState(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["index.ts"] }`,
		"/index.ts":      `export const value = 1;`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()
	_, err := session.handleCreateSnapshot(ctx, &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)

	const updatedText = `export const value = 2;`
	updated, err := session.handleCreateSnapshot(ctx, &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindLayer,
			Files: map[string]string{"/index.ts": updatedText},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[updated.Snapshot].snapshot
	updatedProject := snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json"))
	assert.Equal(t, updatedProject.GetProgram().GetSourceFile("/index.ts").Text(), updatedText)
	assert.Equal(t, updatedProject.ProgramUpdateKind, project.ProgramUpdateKindNewFiles)
}

func TestEmitFromLayerOverFullFileSystemReturnsFileContents(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()

	base, err := session.handleCreateSnapshot(ctx, &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindFull,
			Files: map[string]string{
				"/tsconfig.json": `{ "compilerOptions": { "noLib": true, "outDir": "/out" }, "files": ["src/main.ts"] }`,
				"/src/main.ts":   `export const value: number = 1;`,
			},
		},
	})
	assert.NilError(t, err)
	layered, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		Changes: &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindLayer,
			Files: map[string]string{},
		}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(layered.Projects), 0)

	emitted, err := session.handleEmit(ctx, &EmitParams{
		Snapshot: layered.Snapshot,
		Project:  base.Projects[0].Id,
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, emitted.EmittedFiles, []string{"/out/src/main.js"})
	assert.DeepEqual(t, emitted.EmittedFilesContents, []string{"export const value = 1;\n"})

	_, err = session.handleRelease(ctx, &ReleaseParams{Snapshot: base.Snapshot})
	assert.NilError(t, err)
	emittedAfterRelease, err := session.handleEmit(ctx, &EmitParams{
		Snapshot: layered.Snapshot,
		Project:  base.Projects[0].Id,
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, emittedAfterRelease.EmittedFiles, emitted.EmittedFiles)
	assert.DeepEqual(t, emittedAfterRelease.EmittedFilesContents, emitted.EmittedFilesContents)
}

func TestReleaseSnapshotCompactsSoleLayeredFileSystem(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/host.ts": "host",
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindFull,
			Files: map[string]string{
				"/inherited.ts": "inherited",
				"/changed.ts":   "old",
				"/removed.ts":   "removed",
			},
		},
	})
	assert.NilError(t, err)
	baseFileSystem := session.snapshots[base.Snapshot].fileSystem
	assert.Assert(t, baseFileSystem != nil)

	layered, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		Changes: &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindLayer,
			Files: map[string]string{
				"/changed.ts": "new",
				"/added.ts":   "added",
			},
			RemovedPaths: []string{"/removed.ts"},
		}},
	})
	assert.NilError(t, err)
	layeredSnapshotData := session.snapshots[layered.Snapshot]
	layeredSnapshot := layeredSnapshotData.snapshot
	layeredFileSystem := layeredSnapshotData.fileSystem
	assert.Assert(t, layeredFileSystem != nil)
	assert.Equal(t, session.snapshots[base.Snapshot].refCount, 1)

	_, err = session.handleRelease(context.Background(), &ReleaseParams{Snapshot: base.Snapshot})
	assert.NilError(t, err)
	assert.Assert(t, session.snapshots[base.Snapshot] == nil)

	for path, expected := range map[string]string{
		"/inherited.ts": "inherited",
		"/changed.ts":   "new",
		"/added.ts":     "added",
	} {
		contents, readOK := layeredSnapshot.ReadFile(path)
		assert.Assert(t, readOK, path)
		assert.Equal(t, contents, expected)
	}
	_, ok := layeredSnapshot.ReadFile("/removed.ts")
	assert.Assert(t, !ok)
	_, ok = layeredSnapshot.ReadFile("/host.ts")
	assert.Assert(t, !ok)
	assert.Assert(t, requestfilesystem.HasFullFileSystem(layeredFileSystem))
}

func TestEagerSnapshotReleaseDoesNotRetainFileSystemHistory(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindFull,
			Files: map[string]string{
				"/pkg/index.ts": "",
			},
		},
	})
	assert.NilError(t, err)

	content := ""
	for _, character := range "export const x = 1" {
		oldSnapshot := response.Snapshot
		content += string(character)
		response, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			Snapshot: oldSnapshot,
			Changes: &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{
				Kind: requestfilesystem.KindLayer,
				Files: map[string]string{
					"/pkg/index.ts": content,
				},
			}},
		})
		assert.NilError(t, err)
		_, err = session.handleRelease(context.Background(), &ReleaseParams{Snapshot: oldSnapshot})
		assert.NilError(t, err)

		assert.Equal(t, len(session.snapshots), 1)
		current := session.snapshots[response.Snapshot]
		assert.Assert(t, current != nil)
		assert.Equal(t, current.refCount, 1)
		fileSystem := current.fileSystem
		assert.Assert(t, fileSystem != nil)
		assert.Assert(t, requestfilesystem.HasFullFileSystem(fileSystem))
		actual, ok := current.snapshot.ReadFile("/pkg/index.ts")
		assert.Assert(t, ok)
		assert.Equal(t, actual, content)
	}
}

func TestSnapshotReleaseCompactsChainedFileSystems(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	responses := make([]*CreateSnapshotResponse, 4)
	var err error
	responses[0], err = session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindFull,
			Files: map[string]string{"/pkg/index.ts": "0"},
		},
	})
	assert.NilError(t, err)
	for i := 1; i < len(responses); i++ {
		responses[i], err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			Snapshot: responses[i-1].Snapshot,
			Changes: &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{
				Kind:  requestfilesystem.KindLayer,
				Files: map[string]string{"/pkg/index.ts": strconv.Itoa(i)},
			}},
		})
		assert.NilError(t, err)
	}

	_, err = session.handleRelease(context.Background(), &ReleaseParams{Snapshot: responses[0].Snapshot})
	assert.NilError(t, err)
	assert.Assert(t, session.snapshots[responses[0].Snapshot] == nil)

	for i := 1; i < len(responses); i++ {
		current := session.snapshots[responses[i].Snapshot]
		assert.Assert(t, current != nil)
		assert.Equal(t, current.refCount, 1)
		fileSystem := current.fileSystem
		assert.Assert(t, fileSystem != nil)
		assert.Assert(t, requestfilesystem.HasFullFileSystem(fileSystem))
		contents, ok := current.snapshot.ReadFile("/pkg/index.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, strconv.Itoa(i))
	}
}

func TestTemporarySnapshotRetainsLayeredFileSystemHistory(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindFull,
			Files: map[string]string{"/pkg/index.ts": "base"},
		},
	})
	assert.NilError(t, err)
	layered, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		Changes: &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindLayer,
			Files: map[string]string{"/pkg/index.ts": "layered"},
		}},
	})
	assert.NilError(t, err)
	temporary, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: layered.Snapshot,
		Changes: &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindLayer,
			Files: map[string]string{"/pkg/index.ts": "temporary"},
		}},
	})
	assert.NilError(t, err)

	_, err = session.handleRelease(context.Background(), &ReleaseParams{Snapshot: layered.Snapshot})
	assert.NilError(t, err)
	_, err = session.handleRelease(context.Background(), &ReleaseParams{Snapshot: base.Snapshot})
	assert.NilError(t, err)

	current := session.snapshots[temporary.Snapshot]
	assert.Assert(t, current != nil)
	fileSystem := current.fileSystem
	assert.Assert(t, fileSystem != nil)
	assert.Assert(t, requestfilesystem.HasFullFileSystem(fileSystem))
	contents, ok := current.snapshot.ReadFile("/pkg/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, "temporary")
}

func TestSnapshotReleaseCompactionSupportsConcurrentReaders(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	files := make(map[string]string, 1024)
	for index := range 1024 {
		files[fmt.Sprintf("/pkg/file%d.ts", index)] = strconv.Itoa(index)
	}
	base, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindFull, Files: files},
	})
	assert.NilError(t, err)
	layered, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		Changes: &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindLayer,
			Files: map[string]string{"/pkg/file0.ts": "updated"},
		}},
	})
	assert.NilError(t, err)
	fileSystem := session.snapshots[layered.Snapshot].fileSystem

	started := make(chan struct{})
	done := make(chan struct{})
	readerError := make(chan error, 1)
	var waitGroup sync.WaitGroup
	waitGroup.Go(func() {
		close(started)
		for {
			select {
			case <-done:
				return
			default:
				contents, ok := fileSystem.ReadFile("/pkg/file0.ts")
				if !ok || contents != "updated" {
					readerError <- fmt.Errorf("unexpected overridden file: %q, %t", contents, ok)
					return
				}
				if !fileSystem.FileExists("/pkg/file1023.ts") {
					readerError <- errors.New("inherited file disappeared")
					return
				}
			}
		}
	})
	<-started
	_, err = session.handleRelease(context.Background(), &ReleaseParams{Snapshot: base.Snapshot})
	assert.NilError(t, err)
	close(done)
	waitGroup.Wait()
	close(readerError)
	assert.NilError(t, <-readerError)
}
