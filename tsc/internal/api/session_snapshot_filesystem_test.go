package api

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/api/requestfilesystem"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestSnapshotFileSystem(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["index.ts", "extra.ts"] }`,
		"/index.ts":      "export const value = 1;",
	})
	defer projectSession.Close()
	projectSession.DidOpenFile(ctx, "file:///index.ts", 1, "export const value = 1;", lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	original, err := session.handleGetCurrentLanguageServerSnapshot(ctx, &GetCurrentLanguageServerSnapshotParams{
		Changes: &LanguageServerSnapshotChanges{
			OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		},
	})
	assert.NilError(t, err)
	extras, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: original.Snapshot,
		Changes: &CreateSnapshotParams{
			FileSystem: &requestfilesystem.RequestFileSystem{
				Kind: requestfilesystem.KindLayer,
				Files: map[string]string{
					"/extra.ts": "export const extra = true;",
				},
				RemovedPaths: []string{"/removed"},
				Symlinks: map[string]requestfilesystem.RequestSymlink{
					"/alias.ts": {Target: "/index.ts"},
				},
			},
		},
	})
	assert.NilError(t, err)
	extras, err = session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: extras.Snapshot,
		Changes: &CreateSnapshotParams{
			FileSystem: &requestfilesystem.RequestFileSystem{
				Kind:  requestfilesystem.KindLayer,
				Files: map[string]string{"/second.ts": "second"},
			},
		},
	})
	assert.NilError(t, err)
	projectSession.DidChangeFile(ctx, "file:///index.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{{
		WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: "export const value = 2;"},
	}})
	newOriginal, err := session.handleGetCurrentLanguageServerSnapshot(ctx, &GetCurrentLanguageServerSnapshotParams{})
	assert.NilError(t, err)
	target, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: newOriginal.Snapshot,
		Changes: &CreateSnapshotParams{
			FileSystem: &requestfilesystem.RequestFileSystem{
				Kind: requestfilesystem.KindLayer,
				Files: map[string]string{
					"/extra.ts":          "target extra",
					"/target.ts":         "target",
					"/removed/nested.ts": "removed",
				},
			},
		},
	})
	assert.NilError(t, err)
	rebased, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: target.Snapshot,
		Changes: &CreateSnapshotParams{
			FileSystem:     &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(extras.Snapshot)},
			EnsurePrograms: &EnsurePrograms{All: true},
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, rebased.Snapshot != extras.Snapshot && rebased.Snapshot != target.Snapshot)
	snapshot := session.snapshots[rebased.Snapshot].snapshot
	for fileName, expected := range map[string]string{
		"/extra.ts":  "export const extra = true;",
		"/second.ts": "second",
		"/target.ts": "target",
		"/index.ts":  "export const value = 2;",
		"/alias.ts":  "export const value = 2;",
	} {
		content, ok := snapshot.ReadFile(tspath.RootedFilePathFromAbsolute(fileName))
		assert.Assert(t, ok, fileName)
		assert.Equal(t, content, expected, fileName)
	}
	_, ok := snapshot.ReadFile("/removed/nested.ts")
	assert.Assert(t, !ok)
	program := snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram()
	assert.Equal(t, program.GetSourceFile("/extra.ts").Text(), "export const extra = true;")
	assert.Equal(t, program.GetSourceFile("/index.ts").Text(), "export const value = 2;")
	content, ok := session.snapshots[extras.Snapshot].snapshot.ReadFile("/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, content, "export const value = 1;")
	content, ok = session.snapshots[target.Snapshot].snapshot.ReadFile("/extra.ts")
	assert.Assert(t, ok)
	assert.Equal(t, content, "target extra")
}

func TestSnapshotFileSystemKinds(t *testing.T) {
	t.Parallel()
	for _, sourceKind := range []requestfilesystem.Kind{"host", requestfilesystem.KindLayer, requestfilesystem.KindFull} {
		for _, targetKind := range []requestfilesystem.Kind{"host", requestfilesystem.KindLayer, requestfilesystem.KindFull} {
			t.Run(string(sourceKind)+"/"+string(targetKind), func(t *testing.T) {
				t.Parallel()
				ctx := context.Background()
				projectSession, _ := projecttestutil.Setup(map[string]any{"/host.ts": "host"})
				defer projectSession.Close()
				session := NewLSPSession(projectSession, nil)
				defer session.Close()
				sourceParams := &CreateSnapshotParams{}
				if sourceKind != "host" {
					sourceParams.FileSystem = &requestfilesystem.RequestFileSystem{
						Kind:  sourceKind,
						Files: map[string]string{"/source.ts": "source", "/shared.ts": "source"},
					}
				}
				source, err := session.handleCreateSnapshot(ctx, sourceParams)
				assert.NilError(t, err)
				targetParams := &CreateSnapshotParams{}
				if targetKind != "host" {
					targetParams.FileSystem = &requestfilesystem.RequestFileSystem{
						Kind:  targetKind,
						Files: map[string]string{"/target.ts": "target", "/shared.ts": "target"},
					}
				}
				target, err := session.handleCreateSnapshot(ctx, targetParams)
				assert.NilError(t, err)
				rebased, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
					Snapshot: target.Snapshot,
					Changes:  &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(source.Snapshot)}},
				})
				assert.NilError(t, err)
				assert.Assert(t, rebased.Snapshot != source.Snapshot && rebased.Snapshot != target.Snapshot)
				assert.NilError(t, session.releaseSnapshot(source.Snapshot))
				assert.NilError(t, session.releaseSnapshot(target.Snapshot))
				snapshot := session.snapshots[rebased.Snapshot].snapshot
				content, ok := snapshot.ReadFile("/source.ts")
				assert.Equal(t, ok, sourceKind != "host")
				if ok {
					assert.Equal(t, content, "source")
				}
				content, ok = snapshot.ReadFile("/target.ts")
				assert.Equal(t, ok, sourceKind != requestfilesystem.KindFull && targetKind != "host")
				if ok {
					assert.Equal(t, content, "target")
				}
				_, ok = snapshot.ReadFile("/host.ts")
				assert.Equal(t, ok, sourceKind != requestfilesystem.KindFull && targetKind != requestfilesystem.KindFull)
				content, ok = snapshot.ReadFile("/shared.ts")
				assert.Equal(t, ok, sourceKind != "host" || targetKind != "host")
				if sourceKind != "host" {
					assert.Equal(t, content, "source")
				} else if targetKind != "host" {
					assert.Equal(t, content, "target")
				}
			})
		}
	}
}

func TestSnapshotFileSystemRejectsInactiveSnapshots(t *testing.T) {
	t.Parallel()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()
	snapshot, err := session.handleCreateSnapshot(ctx, &CreateSnapshotParams{})
	assert.NilError(t, err)
	_, err = session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: snapshot.Snapshot,
		Changes:  &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindSnapshot, Snapshot: 999}},
	})
	assert.ErrorIs(t, err, ErrClientError)
	_, err = session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: 999,
		Changes:  &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(snapshot.Snapshot)}},
	})
	assert.ErrorIs(t, err, ErrClientError)
	assert.Equal(t, session.snapshots[snapshot.Snapshot].refCount, 1)
	rebased, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: snapshot.Snapshot,
		Changes:  &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(snapshot.Snapshot)}},
	})
	assert.NilError(t, err)
	assert.Assert(t, rebased.Snapshot != snapshot.Snapshot)
	assert.Equal(t, session.snapshots[snapshot.Snapshot].refCount, 1)
	assert.NilError(t, session.releaseSnapshot(snapshot.Snapshot))
	_, err = session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: rebased.Snapshot,
		Changes:  &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(snapshot.Snapshot)}},
	})
	assert.ErrorIs(t, err, ErrClientError)
	_, err = session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: snapshot.Snapshot,
		Changes:  &CreateSnapshotParams{FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(rebased.Snapshot)}},
	})
	assert.ErrorIs(t, err, ErrClientError)
}

func TestCreateSnapshotWithSnapshotFileSystem(t *testing.T) {
	t.Parallel()
	for _, kind := range []requestfilesystem.Kind{requestfilesystem.KindLayer, requestfilesystem.KindFull} {
		t.Run(string(kind), func(t *testing.T) {
			t.Parallel()
			projectSession, _ := projecttestutil.Setup(map[string]any{"/host.ts": "host"})
			defer projectSession.Close()
			session := NewLSPSession(projectSession, nil)
			defer session.Close()
			source, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
				FileSystem: &requestfilesystem.RequestFileSystem{
					Kind:  requestfilesystem.KindLayer,
					Files: map[string]string{"/source.ts": "source", "/shared.ts": "source", "/removed/nested.ts": "removed"},
				},
			})
			assert.NilError(t, err)
			cloned, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
				FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(source.Snapshot)},
			})
			assert.NilError(t, err)
			assert.Assert(t, cloned.Snapshot != source.Snapshot)
			content, ok := session.snapshots[cloned.Snapshot].snapshot.ReadFile("/source.ts")
			assert.Assert(t, ok)
			assert.Equal(t, content, "source")
			created, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
				FileSystem: &requestfilesystem.RequestFileSystem{
					Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(source.Snapshot),
					FileSystem: &requestfilesystem.RequestFileSystem{
						Kind:  kind,
						Files: map[string]string{"/extra.ts": "extra", "/shared.ts": "extra"},
						Directories: map[string]requestfilesystem.RequestDirectoryEntries{
							"/listed": {Files: []string{"entry.ts"}},
						},
						Symlinks: map[string]requestfilesystem.RequestSymlink{
							"/alias.ts": {Target: "/shared.ts"},
						},
						RemovedPaths: []string{"/removed"},
					},
				},
			})
			assert.NilError(t, err)
			assert.Assert(t, created.Snapshot != source.Snapshot)
			assert.NilError(t, session.releaseSnapshot(source.Snapshot))
			snapshot := session.snapshots[created.Snapshot].snapshot
			for fileName, expected := range map[tspath.RootedFilePath]string{
				"/extra.ts": "extra", "/shared.ts": "extra", "/alias.ts": "extra",
			} {
				content, ok = snapshot.ReadFile(fileName)
				assert.Assert(t, ok)
				assert.Equal(t, content, expected)
			}
			_, ok = snapshot.ReadFile("/source.ts")
			assert.Equal(t, ok, kind == requestfilesystem.KindLayer)
			_, ok = snapshot.ReadFile("/host.ts")
			assert.Equal(t, ok, kind == requestfilesystem.KindLayer)
			_, ok = snapshot.ReadFile("/removed/nested.ts")
			assert.Assert(t, !ok)
			assert.Assert(t, snapshot.FileSystem().DirectoryExists("/listed"))
		})
	}
}

func TestSnapshotFileSystemRejectsInvalidDescriptors(t *testing.T) {
	t.Parallel()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	source, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{})
	assert.NilError(t, err)
	released, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{})
	assert.NilError(t, err)
	assert.NilError(t, session.releaseSnapshot(released.Snapshot))
	for name, fileSystem := range map[string]*requestfilesystem.RequestFileSystem{
		"invalid kind":      {Kind: "invalid"},
		"zero snapshot":     {Kind: requestfilesystem.KindSnapshot},
		"unknown snapshot":  {Kind: requestfilesystem.KindSnapshot, Snapshot: 999},
		"released snapshot": {Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(released.Snapshot)},
		"snapshot on layer": {Kind: requestfilesystem.KindLayer, Snapshot: uint64(source.Snapshot)},
		"nested filesystem on full": {
			Kind:       requestfilesystem.KindFull,
			FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindLayer},
		},
		"nested snapshot": {
			Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(source.Snapshot),
			FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(source.Snapshot)},
		},
		"invalid nested kind": {
			Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(source.Snapshot),
			FileSystem: &requestfilesystem.RequestFileSystem{Kind: "invalid"},
		},
		"unnested entries": {
			Kind: requestfilesystem.KindSnapshot, Snapshot: uint64(source.Snapshot),
			Files: map[string]string{"/extra.ts": "extra"},
		},
	} {
		t.Log(name)
		_, err = session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{FileSystem: fileSystem})
		assert.ErrorIs(t, err, ErrClientError, name)
		_, err = session.handleUpdateSnapshot(t.Context(), &UpdateSnapshotParams{
			Snapshot: source.Snapshot,
			Changes:  &CreateSnapshotParams{FileSystem: fileSystem},
		})
		assert.ErrorIs(t, err, ErrClientError, name)
		assert.Equal(t, session.snapshots[source.Snapshot].refCount, 1)
	}
}
