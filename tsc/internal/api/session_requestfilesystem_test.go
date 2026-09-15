package api

import (
	"context"
	"errors"
	"fmt"
	"slices"
	"strconv"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestRequestLayerRemainsAboveCapturedEditorOverlays(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindFull,
			Files: map[string]string{
				"/shared.ts":      "inherited request",
				"/overlayOnly.ts": "inherited request",
			},
		},
	})
	assert.NilError(t, err)

	projectSession.DidOpenFile(ctx, "file:///shared.ts", 1, "editor overlay", lsproto.LanguageKindTypeScript)
	projectSession.DidOpenFile(ctx, "file:///overlayOnly.ts", 1, "editor overlay", lsproto.LanguageKindTypeScript)
	withOverlays, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{Snapshot: base.Snapshot})
	assert.NilError(t, err)
	snapshot := session.snapshots[withOverlays.Snapshot].snapshot
	content, ok := snapshot.ReadFile("/shared.ts")
	assert.Assert(t, ok)
	assert.Equal(t, content, "inherited request")

	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: withOverlays.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{"/shared.ts": "new request"},
		},
	})
	assert.NilError(t, err)
	snapshot = session.snapshots[updated.Snapshot].snapshot
	content, ok = snapshot.ReadFile("/shared.ts")
	assert.Assert(t, ok)
	assert.Equal(t, content, "new request")
	content, ok = snapshot.ReadFile("/overlayOnly.ts")
	assert.Assert(t, ok)
	assert.Equal(t, content, "inherited request")
}

func TestRequestFileChangeComparedAgainstEditorOverlay(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["value.ts"] }`,
		"/value.ts":      "host",
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///value.ts", 1, "overlay", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)
	baseProgram := session.snapshots[base.Snapshot].snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	assert.Equal(t, baseProgram.GetSourceFile("/value.ts").Text(), "overlay")

	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{"/value.ts": "host"},
		},
	})
	assert.NilError(t, err)
	program := session.snapshots[updated.Snapshot].snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	assert.Assert(t, program != baseProgram)
	assert.Equal(t, program.GetSourceFile("/value.ts").Text(), "host")
}

func TestRequestTombstoneComparedAgainstEditorOverlay(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["overlay.ts"] }`,
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///overlay.ts", 1, "overlay", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)
	baseProgram := session.snapshots[base.Snapshot].snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	assert.Assert(t, baseProgram.GetSourceFile("/overlay.ts") != nil)

	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:         project.RequestFileSystemKindLayer,
			RemovedPaths: []string{"/overlay.ts"},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[updated.Snapshot].snapshot
	assert.Assert(t, snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram().GetSourceFile("/overlay.ts") == nil)
	assert.Assert(t, snapshot.GetFile("/overlay.ts") == nil)
}

func TestRequestDirectoryListingExcludesEditorOverlayDescendantFromWildcard(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "include": ["dir/**/*.ts"] }`,
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///dir/file.ts", 1, "overlay", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)
	baseProgram := session.snapshots[base.Snapshot].snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	assert.Assert(t, baseProgram.GetSourceFile("/dir/file.ts") != nil)

	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindLayer,
			Directories: map[string]project.RequestDirectoryEntries{
				"/dir": {Files: []string{}, Directories: []string{}},
			},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[updated.Snapshot].snapshot
	assert.Assert(t, snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram().GetSourceFile("/dir/file.ts") == nil)
	assert.Assert(t, snapshot.GetFile("/dir/file.ts") != nil)
}

func TestFullRequestLayerOmitsCapturedEditorOverlay(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	projectSession.DidOpenFile(ctx, "file:///overlay.ts", 1, "editor overlay", lsproto.LanguageKindTypeScript)
	withOverlay, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{})
	assert.NilError(t, err)
	assert.Assert(t, session.snapshots[withOverlay.Snapshot].snapshot.GetFile("/overlay.ts") != nil)

	replaced, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: withOverlay.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindFull,
			Files: map[string]string{"/replacement.ts": "replacement"},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[replaced.Snapshot].snapshot
	assert.Assert(t, !snapshot.FileExists("/overlay.ts"))
	assert.Assert(t, snapshot.GetFile("/overlay.ts") == nil)
}

func TestRequestFileReplacesCachedDirectory(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindFull,
			Files: map[string]string{
				"/tsconfig.json":     `{ "compilerOptions": { "noLib": true }, "include": ["replaced/**/*.ts"] }`,
				"/replaced/child.ts": `export const child = true;`,
			},
		},
	})
	assert.NilError(t, err)
	baseSnapshot := session.snapshots[base.Snapshot].snapshot
	baseProgram := baseSnapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	assert.Assert(t, baseProgram.GetSourceFile("/replaced/child.ts") != nil)

	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{"/replaced": "replacement file"},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[updated.Snapshot].snapshot
	program := snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	assert.Assert(t, program.GetSourceFile("/replaced/child.ts") == nil)
	content, ok := snapshot.ReadFile("/replaced")
	assert.Assert(t, ok)
	assert.Equal(t, content, "replacement file")
	_, ok = snapshot.ReadFile("/replaced/child.ts")
	assert.Assert(t, !ok)
}

func TestRequestFileReplacesDirectoryWithEditorOverlayDescendant(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "include": ["dir/**/*.ts"] }`,
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///dir/file.ts", 1, "overlay", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)
	assert.Assert(t, session.snapshots[base.Snapshot].snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram().GetSourceFile("/dir/file.ts") != nil)

	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{"/dir": "replacement"},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[updated.Snapshot].snapshot
	assert.Assert(t, snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram().GetSourceFile("/dir/file.ts") == nil)
	assert.Assert(t, snapshot.GetFile("/dir/file.ts") == nil)
}

func TestRequestSymlinkFileHandlesAreStable(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/target.ts": "target",
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindLayer,
			Symlinks: map[string]project.RequestSymlink{
				"/alias.ts":     {Target: "/target.ts"},
				"/hostAlias.ts": {Target: "/target.ts", Host: true},
			},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[response.Snapshot].snapshot
	for _, path := range []string{"/alias.ts", "/hostAlias.ts"} {
		first := snapshot.GetFile(path)
		second := snapshot.GetFile(path)
		assert.Assert(t, first != nil, path)
		assert.Assert(t, first == second, path)
		assert.Equal(t, first.FileName(), path)
	}
}

func TestRequestSymlinkFallsBackToEditorOverlayTarget(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///target.ts", 1, "overlay", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{})
	assert.NilError(t, err)
	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindLayer,
			Symlinks: map[string]project.RequestSymlink{
				"/alias.ts": {Target: "/target.ts"},
			},
		},
	})
	assert.NilError(t, err)

	snapshot := session.snapshots[updated.Snapshot].snapshot
	file := snapshot.GetFile("/alias.ts")
	assert.Assert(t, file != nil)
	assert.Equal(t, file.FileName(), "/alias.ts")
	assert.Equal(t, file.Content(), "overlay")
	assert.Assert(t, snapshot.FileExists("/alias.ts"))
}

func TestRequestSymlinkFallsBackToEditorOverlayDirectory(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///target/file.ts", 1, "overlay", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{})
	assert.NilError(t, err)
	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindLayer,
			Symlinks: map[string]project.RequestSymlink{
				"/alias": {Target: "/target"},
			},
		},
	})
	assert.NilError(t, err)

	snapshot := session.snapshots[updated.Snapshot].snapshot
	assert.Assert(t, snapshot.DirectoryExists("/alias"))
	assert.Assert(t, slices.Contains(snapshot.GetAccessibleEntries("/alias").Files, "file.ts"))
	// Enumerating the parent must agree with DirectoryExists about the link.
	assert.Assert(t, slices.Contains(snapshot.GetAccessibleEntries("/").Directories, "alias"))
	file := snapshot.GetFile("/alias/file.ts")
	assert.Assert(t, file != nil)
	assert.Equal(t, file.Content(), "overlay")
}

func TestReplacingRequestSymlinkInvalidatesAliasedProgramFile(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindFull,
			Files: map[string]string{
				"/tsconfig.json":  `{ "compilerOptions": { "noLib": true }, "files": ["link/file.ts"] }`,
				"/target/file.ts": "old",
			},
			Symlinks: map[string]project.RequestSymlink{
				"/link": {Target: "/target"},
			},
		},
	})
	assert.NilError(t, err)
	baseProgram := session.snapshots[base.Snapshot].snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	assert.Assert(t, baseProgram.GetSourceFile("/link/file.ts") != nil)

	updated, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:         project.RequestFileSystemKindLayer,
			RemovedPaths: []string{"/link"},
		},
	})
	assert.NilError(t, err)
	program := session.snapshots[updated.Snapshot].snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	assert.Assert(t, program.GetSourceFile("/link/file.ts") == nil)
}

func TestUpdateSnapshotUsesFullFileSystem(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/host.ts": "host",
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindFull,
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
	program := snapshot.ProjectCollection.GetProjectByPath(tspath.Path("/tsconfig.json")).GetProgram()
	unchanged, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{Snapshot: response.Snapshot})
	assert.NilError(t, err)
	unchangedSnapshot := session.snapshots[unchanged.Snapshot].snapshot
	assert.Assert(t, unchangedSnapshot.ProjectCollection.GetProjectByPath(tspath.Path("/tsconfig.json")).GetProgram() == program)
	response = unchanged

	// Supplying a new filesystem replaces inherited snapshot disk caches even
	// when the caller does not redundantly list every file in FileChanges.
	response, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindFull,
			Files: map[string]string{
				"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["src/index.ts", "src/other.ts"] }`,
				"/src/index.ts":  `export const value = "updated";`,
				"/src/other.ts":  `export const other = true;`,
			},
		},
	})
	assert.NilError(t, err)
	snapshot = session.snapshots[response.Snapshot].snapshot
	contents, ok = snapshot.ReadFile("/src/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, `export const value = "updated";`)

	// A request filesystem sits above editor overlays, including the temporary
	// overlay, so temporary snapshots keep showing the supplied contents.
	temporary, err := session.handleUpdateTemporarySnapshot(context.Background(), &UpdateTemporarySnapshotParams{
		Snapshot: response.Snapshot,
		File:     DocumentIdentifier{FileName: "/src/index.ts"},
		NewText:  `export const value = "temporary";`,
	})
	assert.NilError(t, err)
	temporarySnapshot := session.snapshots[temporary.Snapshot].snapshot
	contents, ok = temporarySnapshot.ReadFile("/src/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, `export const value = "updated";`)
	contents, ok = temporarySnapshot.ReadFile("/src/other.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, `export const other = true;`)
}

func TestCreateProgramRetainsFullFileSystem(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	ctx := context.Background()
	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: "/old.ts"}},
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindFull,
			Files: map[string]string{
				"/old.ts": `export const oldValue = 1;`,
				"/new.ts": `export const newValue = 2;`,
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(base.Projects), 1)

	created, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: "/new.ts"}},
		OldProgram: &CreateProgramOldProgramParams{
			Snapshot: base.Snapshot,
			Project:  base.Projects[0].Id,
		},
	})
	assert.NilError(t, err)

	snapshot, err := session.getSnapshotData(created.Snapshot)
	assert.NilError(t, err)
	program, err := snapshot.getProgram(created.Project.Id)
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

	base, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{})
	assert.NilError(t, err)
	replaced, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindFull,
			Files: map[string]string{
				"/memory.ts": "memory",
			},
		},
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

	base, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)
	baseSnapshot := session.snapshots[base.Snapshot].snapshot
	program := baseSnapshot.ProjectCollection.GetProjectByPath(tspath.Path("/tsconfig.json")).GetProgram()

	updated, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{Snapshot: base.Snapshot})
	assert.NilError(t, err)
	updatedSnapshot := session.snapshots[updated.Snapshot].snapshot
	assert.Assert(t, updatedSnapshot.ProjectCollection.GetProjectByPath(tspath.Path("/tsconfig.json")).GetProgram() == program)
}

func TestSnapshotFileSystemLayersPreserveIncrementalState(t *testing.T) {
	t.Parallel()

	for _, baseKind := range []project.RequestFileSystemKind{"host", project.RequestFileSystemKindFull, project.RequestFileSystemKindLayer} {
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
			params := &UpdateSnapshotParams{
				OpenProjects: []DocumentIdentifier{{FileName: "/a/tsconfig.json"}, {FileName: "/b/tsconfig.json"}},
			}
			if baseKind != "host" {
				params.FileSystem = &project.RequestFileSystem{Kind: baseKind, Files: files}
			}
			base, err := session.handleUpdateSnapshot(ctx, params)
			assert.NilError(t, err)
			baseSnapshot := session.snapshots[base.Snapshot].snapshot
			baseProgram := baseSnapshot.ProjectCollection.GetProjectByPath("/a/tsconfig.json").GetProgram()
			unrelatedProgram := baseSnapshot.ProjectCollection.GetProjectByPath("/b/tsconfig.json").GetProgram()
			unrelatedFile := baseSnapshot.GetFile("/b/index.ts")

			unchanged, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
				Snapshot: base.Snapshot,
				FileSystem: &project.RequestFileSystem{
					Kind:  project.RequestFileSystemKindLayer,
					Files: map[string]string{"/a/index.ts": files["/a/index.ts"]},
				},
			})
			assert.NilError(t, err)
			unchangedSnapshot := session.snapshots[unchanged.Snapshot].snapshot
			assert.Assert(t, unchangedSnapshot.ProjectCollection.GetProjectByPath("/a/tsconfig.json").GetProgram() == baseProgram)
			assert.Assert(t, unchangedSnapshot.ProjectCollection.GetProjectByPath("/b/tsconfig.json").GetProgram() == unrelatedProgram)
			assert.Assert(t, unchangedSnapshot.GetFile("/b/index.ts") == unrelatedFile)

			const updatedText = `export const value = 2;`
			updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
				Snapshot: unchanged.Snapshot,
				FileSystem: &project.RequestFileSystem{
					Kind:  project.RequestFileSystemKindLayer,
					Files: map[string]string{"/a/index.ts": updatedText},
				},
			})
			assert.NilError(t, err)
			updatedSnapshot := session.snapshots[updated.Snapshot].snapshot
			updatedProject := updatedSnapshot.ProjectCollection.GetProjectByPath("/a/tsconfig.json")
			assert.Assert(t, updatedProject.GetProgram() != baseProgram)
			assert.Equal(t, updatedProject.ProgramUpdateKind, project.ProgramUpdateKindCloned)
			assert.Equal(t, updatedProject.GetProgram().GetSourceFile("/a/index.ts").Text(), updatedText)
			assert.Assert(t, updatedSnapshot.ProjectCollection.GetProjectByPath("/b/tsconfig.json").GetProgram() == unrelatedProgram)
			assert.Assert(t, updatedSnapshot.GetFile("/b/index.ts") == unrelatedFile)

			removed, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
				Snapshot: updated.Snapshot,
				FileSystem: &project.RequestFileSystem{
					Kind:         project.RequestFileSystemKindLayer,
					RemovedPaths: []string{"/a/removed"},
				},
			})
			assert.NilError(t, err)
			removedSnapshot := session.snapshots[removed.Snapshot].snapshot
			removedProgram := removedSnapshot.ProjectCollection.GetProjectByPath("/a/tsconfig.json").GetProgram()
			for _, path := range []string{"/a/removed/nested.ts", "/a/removed/deep/file.ts"} {
				assert.Assert(t, removedProgram.GetSourceFile(path) == nil, path)
				assert.Assert(t, removedSnapshot.GetFile(path) == nil, path)
				assert.Assert(t, baseProgram.GetSourceFile(path) != nil, path)
			}
			assert.Assert(t, removedSnapshot.ProjectCollection.GetProjectByPath("/b/tsconfig.json").GetProgram() == unrelatedProgram)
			assert.Assert(t, removedSnapshot.GetFile("/b/index.ts") == unrelatedFile)

			// A request without a base snapshot returns to the host, so the old
			// layer's changed contents and directory tombstones must not survive.
			restored, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{})
			assert.NilError(t, err)
			restoredSnapshot := session.snapshots[restored.Snapshot].snapshot
			restoredProgram := restoredSnapshot.ProjectCollection.GetProjectByPath("/a/tsconfig.json").GetProgram()
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
	_, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)

	const updatedText = `export const value = 2;`
	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{"/index.ts": updatedText},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[updated.Snapshot].snapshot
	updatedProject := snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json")
	assert.Equal(t, updatedProject.GetProgram().GetSourceFile("/index.ts").Text(), updatedText)
	// Naming no base snapshot replaces the filesystem outright, and nothing can be
	// diffed against what it replaced, so the update invalidates rather than cloning
	// incrementally. Temporary: #64204 removes this path.
	assert.Equal(t, updatedProject.ProgramUpdateKind, project.ProgramUpdateKindSameFileNames)
}

func TestEmitFromLayerOverFullFileSystemReturnsFileContents(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindFull,
			Files: map[string]string{
				"/tsconfig.json": `{ "compilerOptions": { "noLib": true, "outDir": "/out" }, "files": ["src/main.ts"] }`,
				"/src/main.ts":   `export const value: number = 1;`,
			},
		},
	})
	assert.NilError(t, err)
	layered, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(layered.Projects), 1)

	emitted, err := session.handleEmit(ctx, &EmitParams{
		Snapshot: layered.Snapshot,
		Project:  layered.Projects[0].Id,
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, emitted.EmittedFiles, []string{"/out/src/main.js"})
	assert.DeepEqual(t, emitted.EmittedFilesContents, []string{"export const value = 1;\n"})

	_, err = session.handleRelease(ctx, &ReleaseParams{Snapshot: base.Snapshot})
	assert.NilError(t, err)
	emittedAfterRelease, err := session.handleEmit(ctx, &EmitParams{
		Snapshot: layered.Snapshot,
		Project:  layered.Projects[0].Id,
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

	base, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindFull,
			Files: map[string]string{
				"/inherited.ts": "inherited",
				"/changed.ts":   "old",
				"/removed.ts":   "removed",
			},
		},
	})
	assert.NilError(t, err)
	layered, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindLayer,
			Files: map[string]string{
				"/changed.ts": "new",
				"/added.ts":   "added",
			},
			RemovedPaths: []string{"/removed.ts"},
		},
	})
	assert.NilError(t, err)
	layeredSnapshotData := session.snapshots[layered.Snapshot]
	layeredSnapshot := layeredSnapshotData.snapshot
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
	assert.Assert(t, layeredSnapshot.HasFullFileSystemLayer())
}

func TestEagerSnapshotReleaseDoesNotRetainFileSystemHistory(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindFull,
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
			FileSystem: &project.RequestFileSystem{
				Kind: project.RequestFileSystemKindLayer,
				Files: map[string]string{
					"/pkg/index.ts": content,
				},
			},
		})
		assert.NilError(t, err)
		_, err = session.handleRelease(context.Background(), &ReleaseParams{Snapshot: oldSnapshot})
		assert.NilError(t, err)

		assert.Equal(t, len(session.snapshots), 1)
		current := session.snapshots[response.Snapshot]
		assert.Assert(t, current != nil)
		assert.Equal(t, current.refCount, 1)
		assert.Assert(t, current.snapshot.HasFullFileSystemLayer())
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

	responses := make([]*UpdateSnapshotResponse, 4)
	var err error
	responses[0], err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindFull,
			Files: map[string]string{"/pkg/index.ts": "0"},
		},
	})
	assert.NilError(t, err)
	for i := 1; i < len(responses); i++ {
		responses[i], err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			Snapshot: responses[i-1].Snapshot,
			FileSystem: &project.RequestFileSystem{
				Kind:  project.RequestFileSystemKindLayer,
				Files: map[string]string{"/pkg/index.ts": strconv.Itoa(i)},
			},
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
		assert.Assert(t, current.snapshot.HasFullFileSystemLayer())
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

	base, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindFull,
			Files: map[string]string{"/pkg/index.ts": "base"},
		},
	})
	assert.NilError(t, err)
	layered, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{"/pkg/index.ts": "layered"},
		},
	})
	assert.NilError(t, err)
	temporary, err := session.handleUpdateTemporarySnapshot(context.Background(), &UpdateTemporarySnapshotParams{
		Snapshot: layered.Snapshot,
		File:     DocumentIdentifier{FileName: "/pkg/index.ts"},
		NewText:  "temporary",
	})
	assert.NilError(t, err)

	_, err = session.handleRelease(context.Background(), &ReleaseParams{Snapshot: layered.Snapshot})
	assert.NilError(t, err)
	_, err = session.handleRelease(context.Background(), &ReleaseParams{Snapshot: base.Snapshot})
	assert.NilError(t, err)

	current := session.snapshots[temporary.Snapshot]
	assert.Assert(t, current != nil)
	assert.Assert(t, current.snapshot.HasFullFileSystemLayer())
	contents, ok := current.snapshot.ReadFile("/pkg/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, "layered")
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
	base, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		FileSystem: &project.RequestFileSystem{Kind: project.RequestFileSystemKindFull, Files: files},
	})
	assert.NilError(t, err)
	layered, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{"/pkg/file0.ts": "updated"},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[layered.Snapshot].snapshot

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
				contents, ok := snapshot.ReadFile("/pkg/file0.ts")
				if !ok || contents != "updated" {
					readerError <- fmt.Errorf("unexpected overridden file: %q, %t", contents, ok)
					return
				}
				if !snapshot.FileExists("/pkg/file1023.ts") {
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

func TestRequestLayerEntriesAppearInSnapshotDirectoryListings(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "include": ["dir/**/*.ts"] }`,
		"/dir/host.ts":   "export const host = true;",
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///dir/overlay.ts", 1, "export const overlay = true;", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)

	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{"/dir/request.ts": "export const request = true;"},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[updated.Snapshot].snapshot

	// Every layer contributes to a listing: the request file, the editor overlay,
	// and the host file underneath both.
	files := snapshot.GetAccessibleEntries("/dir").Files
	slices.Sort(files)
	assert.DeepEqual(t, files, []string{"host.ts", "overlay.ts", "request.ts"})

	program := snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	for _, fileName := range []string{"/dir/host.ts", "/dir/overlay.ts", "/dir/request.ts"} {
		assert.Assert(t, program.GetSourceFile(fileName) != nil, fileName)
	}
}

func TestRequestSymlinkAliasedFileIsNotReparsed(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindFull,
			Files: map[string]string{
				"/tsconfig.json":  `{ "compilerOptions": { "noLib": true }, "files": ["link/file.ts", "other.ts"] }`,
				"/target/file.ts": "export const aliased = true;",
				"/other.ts":       "export const other = true;",
			},
			Symlinks: map[string]project.RequestSymlink{
				"/link": {Target: "/target"},
			},
		},
	})
	assert.NilError(t, err)
	baseFile := session.snapshots[base.Snapshot].snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram().GetSourceFile("/link/file.ts")
	assert.Assert(t, baseFile != nil)

	// An unrelated change rebuilds the program. The aliased file's handle is
	// synthesized per snapshot, but it hashes the same content, so the parse cache
	// still returns the source file that was already parsed.
	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{"/other.ts": "export const other = false;"},
		},
	})
	assert.NilError(t, err)
	program := session.snapshots[updated.Snapshot].snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	assert.Equal(t, program.GetSourceFile("/other.ts").Text(), "export const other = false;")
	assert.Assert(t, program.GetSourceFile("/link/file.ts") == baseFile)
}

func TestRequestSymlinkToEditorOverlayDirectoryExists(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	// The directory exists only because an editor has a document open inside it.
	projectSession.DidOpenFile(ctx, "file:///overlayDir/file.ts", 1, "overlay", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{})
	assert.NilError(t, err)
	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind: project.RequestFileSystemKindLayer,
			Symlinks: map[string]project.RequestSymlink{
				"/alias": {Target: "/overlayDir"},
			},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[updated.Snapshot].snapshot

	// Exposing the file through the link and denying that its directory exists
	// would be contradictory, so both answers come from the same stack.
	file := snapshot.GetFile("/alias/file.ts")
	assert.Assert(t, file != nil)
	assert.Equal(t, file.Content(), "overlay")
	assert.Assert(t, snapshot.DirectoryExists("/alias"))
	assert.Assert(t, snapshot.DirectoryExists("/overlayDir"))
	assert.DeepEqual(t, snapshot.GetAccessibleEntries("/alias").Files, []string{"file.ts"})
}

func TestRequestLayerLineMapsMatchFileContents(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///file.ts", 1, "overlay\nspanning\nthree lines", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{})
	assert.NilError(t, err)
	assert.Equal(t, len(session.snapshots[base.Snapshot].snapshot.LSPLineMap("/file.ts").LineStarts), 3)

	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{"/file.ts": "one line"},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[updated.Snapshot].snapshot

	// Line maps are derived from file contents, so they must be read from the same
	// place as the contents rather than from the overlay the layer replaced.
	assert.Equal(t, snapshot.GetFile("/file.ts").Content(), "one line")
	assert.Equal(t, len(snapshot.LSPLineMap("/file.ts").LineStarts), 1)
	assert.Assert(t, snapshot.GetECMALineInfo("/file.ts") != nil)
}

func TestRequestFileReplacingEditorOverlayDirectoryIsStructural(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{
		// "files" rather than a wildcard, so only a structural replacement can drop
		// the descendant; there is no directory rescan to fall back on.
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["dir/file.ts"] }`,
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///dir/file.ts", 1, "export const overlay = true;", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)
	baseProgram := session.snapshots[base.Snapshot].snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	assert.Assert(t, baseProgram.GetSourceFile("/dir/file.ts") != nil)

	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{"/dir": "replacement"},
		},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[updated.Snapshot].snapshot
	assert.Assert(t, snapshot.GetFile("/dir/file.ts") == nil)
	assert.Assert(t, snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram().GetSourceFile("/dir/file.ts") == nil)
}

func TestRequestFileChangeComparedAgainstOverlayOverCachedHostFile(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["value.ts"] }`,
		"/value.ts":      "host",
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	// Load the project first so the host contents land in the snapshot's disk cache,
	// then open an overlay on top of them.
	_, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)
	projectSession.DidOpenFile(ctx, "file:///value.ts", 1, "overlay", lsproto.LanguageKindTypeScript)
	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{})
	assert.NilError(t, err)
	baseProgram := session.snapshots[base.Snapshot].snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	assert.Equal(t, baseProgram.GetSourceFile("/value.ts").Text(), "overlay")

	// The layer supplies what the disk cache holds, but what the program is actually
	// using is the overlay, so this is a change and must not be filtered out.
	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &project.RequestFileSystem{
			Kind:  project.RequestFileSystemKindLayer,
			Files: map[string]string{"/value.ts": "host"},
		},
	})
	assert.NilError(t, err)
	program := session.snapshots[updated.Snapshot].snapshot.ProjectCollection.GetProjectByPath("/tsconfig.json").GetProgram()
	assert.Equal(t, program.GetSourceFile("/value.ts").Text(), "host")
}

// A malformed request filesystem is a client error. The layer is built during the
// snapshot clone rather than before it, so the failure has to travel back out as
// an API error, leaving the snapshot it was rejected from usable.
func TestInvalidRequestFileSystemIsRejected(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["index.ts"] }`,
		"/index.ts":      `export const value = 1;`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
	})
	assert.NilError(t, err)

	_, err = session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot:   base.Snapshot,
		FileSystem: &project.RequestFileSystem{Kind: "bogus"},
	})
	assert.Assert(t, errors.Is(err, ErrClientError))
	assert.ErrorContains(t, err, "unknown request filesystem kind")

	updated, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{Snapshot: base.Snapshot})
	assert.NilError(t, err)
	snapshot := session.snapshots[updated.Snapshot].snapshot
	assert.Assert(t, !snapshot.HasFullFileSystemLayer())
	contents, ok := snapshot.ReadFile("/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, `export const value = 1;`)
}
