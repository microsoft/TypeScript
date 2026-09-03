package api

import (
	"context"
	"errors"
	"fmt"
	"strconv"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/api/requestfilesystem"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestUpdateSnapshotUsesFullFileSystem(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/host.ts": "host",
	})
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
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
	program := snapshot.ProjectCollection.GetProjectByPath(tspath.Path("/tsconfig.json")).GetProgram()
	unchanged, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{Snapshot: response.Snapshot})
	assert.NilError(t, err)
	unchangedSnapshot := session.snapshots[unchanged.Snapshot].snapshot
	assert.Assert(t, unchangedSnapshot.ProjectCollection.GetProjectByPath(tspath.Path("/tsconfig.json")).GetProgram() == program)
	response = unchanged

	// Supplying a new filesystem replaces inherited snapshot disk caches even
	// when the caller does not redundantly list every file in FileChanges.
	response, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindFull,
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

	// Temporary snapshots retain the base snapshot's supplied filesystem for
	// every file other than the temporary overlay.
	temporary, err := session.handleUpdateTemporarySnapshot(context.Background(), &UpdateTemporarySnapshotParams{
		Snapshot: response.Snapshot,
		File:     DocumentIdentifier{FileName: "/src/index.ts"},
		NewText:  `export const value = "temporary";`,
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

func TestSnapshotUpdateFullFileSystemIsTotal(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/host.ts": "host",
	})
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{})
	assert.NilError(t, err)
	replaced, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindFull,
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
	session := NewSession(projectSession, nil)
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

func TestEmitFromLayerOverFullFileSystemReturnsFileContents(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
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
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindLayer,
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
	session := NewSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
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
	baseFileSystem := session.snapshots[base.Snapshot].fileSystemHandle()
	assert.Assert(t, baseFileSystem != nil)

	layered, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindLayer,
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
	layeredFileSystem := layeredSnapshotData.fileSystemHandle()
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
	assert.Assert(t, layeredFileSystem.HasFullFileSystem())
}

func TestEagerSnapshotReleaseDoesNotRetainFileSystemHistory(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
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
			FileSystem: &requestfilesystem.RequestFileSystem{
				Kind: requestfilesystem.KindLayer,
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
		fileSystem := current.fileSystemHandle()
		assert.Assert(t, fileSystem != nil)
		assert.Assert(t, fileSystem.HasFullFileSystem())
		actual, ok := current.snapshot.ReadFile("/pkg/index.ts")
		assert.Assert(t, ok)
		assert.Equal(t, actual, content)
	}
}

func TestSnapshotReleaseCompactsChainedFileSystems(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()

	responses := make([]*UpdateSnapshotResponse, 4)
	var err error
	responses[0], err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindFull,
			Files: map[string]string{"/pkg/index.ts": "0"},
		},
	})
	assert.NilError(t, err)
	for i := 1; i < len(responses); i++ {
		responses[i], err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
			Snapshot: responses[i-1].Snapshot,
			FileSystem: &requestfilesystem.RequestFileSystem{
				Kind:  requestfilesystem.KindLayer,
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
		fileSystem := current.fileSystemHandle()
		assert.Assert(t, fileSystem != nil)
		assert.Assert(t, fileSystem.HasFullFileSystem())
		contents, ok := current.snapshot.ReadFile("/pkg/index.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, strconv.Itoa(i))
	}
}

func TestTemporarySnapshotRetainsLayeredFileSystemHistory(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()

	base, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindFull,
			Files: map[string]string{"/pkg/index.ts": "base"},
		},
	})
	assert.NilError(t, err)
	layered, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindLayer,
			Files: map[string]string{"/pkg/index.ts": "layered"},
		},
	})
	assert.NilError(t, err)
	layeredFileSystem := session.snapshots[layered.Snapshot].fileSystemHandle()
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
	fileSystem := current.fileSystemHandle()
	assert.Assert(t, fileSystem != nil)
	assert.Assert(t, fileSystem != layeredFileSystem)
	assert.Assert(t, fileSystem.HasFullFileSystem())
}

func TestSnapshotReleaseCompactionSupportsConcurrentReaders(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()

	files := make(map[string]string, 1024)
	for index := range 1024 {
		files[fmt.Sprintf("/pkg/file%d.ts", index)] = strconv.Itoa(index)
	}
	base, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindFull, Files: files},
	})
	assert.NilError(t, err)
	layered, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: base.Snapshot,
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:  requestfilesystem.KindLayer,
			Files: map[string]string{"/pkg/file0.ts": "updated"},
		},
	})
	assert.NilError(t, err)
	fileSystem := session.snapshots[layered.Snapshot].fileSystemHandle()

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
