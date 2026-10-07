package api

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/api/requestfilesystem"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestRebasePreservesFullInvalidation(t *testing.T) {
	t.Parallel()
	projectSession, _ := projecttestutil.Setup(map[string]any{"/index.ts": "export const value = 1;"})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	base, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		CreatePrograms: []*CreateSnapshotProgramParams{{
			RootFiles:       []DocumentIdentifier{{FileName: "/index.ts"}},
			CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
		}},
	})
	assert.NilError(t, err)
	programID := project.ID((*base.Operation.CreatedPrograms)[0])
	target, err := session.handleUpdateSnapshot(t.Context(), &UpdateSnapshotParams{Snapshot: base.Snapshot})
	assert.NilError(t, err)
	assert.NilError(t, session.FS().WriteFile("/index.ts", "export const value = 2;"))
	changes := &CreateSnapshotParams{FileNotifications: &FileNotifications{InvalidateAll: true}, EnsurePrograms: &EnsurePrograms{All: true}}
	updated, err := session.handleUpdateSnapshot(t.Context(), &UpdateSnapshotParams{Snapshot: base.Snapshot, Changes: changes})
	assert.NilError(t, err)
	updatedProgram, err := session.snapshots[updated.Snapshot].getProgram(programID)
	assert.NilError(t, err)
	assert.Equal(t, updatedProgram.GetSourceFile("/index.ts").Text(), "export const value = 2;")
	for _, targetID := range []SnapshotID{base.Snapshot, target.Snapshot} {
		rebased, err := session.handleRebaseSnapshot(t.Context(), &RebaseSnapshotParams{Snapshot: base.Snapshot, NewSnapshot: targetID, Changes: changes})
		assert.NilError(t, err)
		program, err := session.snapshots[rebased.Snapshot].getProgram(programID)
		assert.NilError(t, err)
		assert.Equal(t, program.GetSourceFile("/index.ts").Text(), "export const value = 2;")
	}
}

func TestRebaseRefreshesDependencyAutoImports(t *testing.T) {
	t.Parallel()
	const fileName = "/home/project/index.ts"
	const dependency = "/home/project/node_modules/my-pkg/index.d.ts"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/home/project/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`,
		fileName:                      "package",
		"/home/project/package.json":  `{"dependencies":{"my-pkg":"1.0.0"}}`,
		"/home/project/node_modules/my-pkg/package.json": `{"name":"my-pkg","version":"1.0.0","types":"index.d.ts"}`,
		dependency: "export declare const packageOld: number;",
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	target, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenProjects:       []DocumentIdentifier{{FileName: "/home/project/tsconfig.json"}},
		PrepareAutoImports: &DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	completionNames := func(snapshotID SnapshotID) []string {
		t.Helper()
		proj := session.snapshots[snapshotID].snapshot.GetDefaultProject("file:///home/project/index.ts")
		completions, completionErr := session.handleGetCompletionsAtPosition(t.Context(), &GetCompletionsAtPositionParams{
			Snapshot: snapshotID, Project: proj.ID(), File: DocumentIdentifier{FileName: fileName}, Position: 7, IncludeSymbol: true,
		})
		assert.NilError(t, completionErr)
		assert.Assert(t, completions != nil)
		var names []string
		for _, entry := range completions.Entries {
			names = append(names, entry.Name)
		}
		return names
	}
	assert.Assert(t, slices.Contains(completionNames(target.Snapshot), "packageOld"))
	source, err := session.handleUpdateSnapshot(t.Context(), &UpdateSnapshotParams{
		Snapshot: target.Snapshot,
		Changes: &CreateSnapshotParams{
			FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindLayer, Files: map[string]string{
				dependency: "export declare const packageNew: number;",
			}},
			PrepareAutoImports: &DocumentIdentifier{FileName: fileName},
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, slices.Contains(completionNames(source.Snapshot), "packageNew"))
	rebased, err := session.handleRebaseSnapshot(t.Context(), &RebaseSnapshotParams{
		Snapshot: source.Snapshot, NewSnapshot: target.Snapshot,
		Changes: &CreateSnapshotParams{PrepareAutoImports: &DocumentIdentifier{FileName: fileName}},
	})
	assert.NilError(t, err)
	names := completionNames(rebased.Snapshot)
	assert.Assert(t, slices.Contains(names, "packageNew"))
	assert.Assert(t, !slices.Contains(names, "packageOld"))
}

func TestSelfRebaseMatchesUpdateProgramState(t *testing.T) {
	t.Parallel()
	for _, baseKind := range []requestfilesystem.Kind{"host", requestfilesystem.KindLayer, requestfilesystem.KindFull} {
		t.Run(string(baseKind), func(t *testing.T) {
			t.Parallel()
			projectSession, _ := projecttestutil.Setup(map[string]any{
				"/index.ts": "export const value = 1;",
				"/other.ts": "export const other = true;",
			})
			defer projectSession.Close()
			session := NewLSPSession(projectSession, nil)
			defer session.Close()
			params := &CreateSnapshotParams{CreatePrograms: []*CreateSnapshotProgramParams{{
				RootFiles: []DocumentIdentifier{{FileName: "/index.ts"}}, CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
			}}}
			if baseKind != "host" {
				params.FileSystem = &requestfilesystem.RequestFileSystem{
					Kind: baseKind,
					Files: map[string]string{
						"/index.ts":       "export const value = 1;",
						"/other.ts":       "export const other = true;",
						"/masked/keep.ts": "export const keep = true;",
					},
					Directories:  map[string]requestfilesystem.RequestDirectoryEntries{"/": {Files: []string{"index.ts", "other.ts"}, Directories: []string{"masked"}}},
					Symlinks:     map[string]requestfilesystem.RequestSymlink{"/alias.ts": {Target: "/index.ts"}},
					RemovedPaths: []string{"/masked"},
				}
			}
			base, err := session.handleCreateSnapshot(t.Context(), params)
			assert.NilError(t, err)
			programID := (*base.Operation.CreatedPrograms)[0]
			for name, changes := range map[string]*CreateSnapshotParams{
				"no changes": {},
				"dirty program": {
					FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindLayer, Files: map[string]string{"/index.ts": "export const value = 2;"}},
				},
				"ensured program": {
					FileSystem:     &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindLayer, Files: map[string]string{"/index.ts": "export const value = 2;"}},
					EnsurePrograms: &EnsurePrograms{All: true},
				},
				"total replacement": {
					FileSystem:     &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindFull, Files: map[string]string{"/index.ts": "export const value = 3;"}},
					EnsurePrograms: &EnsurePrograms{All: true},
				},
				"listing and symlink": {
					FileSystem: &requestfilesystem.RequestFileSystem{
						Kind:        requestfilesystem.KindLayer,
						Directories: map[string]requestfilesystem.RequestDirectoryEntries{"/": {Files: []string{"index.ts"}}},
						Symlinks:    map[string]requestfilesystem.RequestSymlink{"/alias.ts": {Target: "/other.ts"}},
					},
				},
				"create and open": {
					CreatePrograms: []*CreateSnapshotProgramParams{{RootFiles: []DocumentIdentifier{{FileName: "/other.ts"}}, CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue}}},
					OpenFiles:      []DocumentIdentifier{{FileName: "/index.ts"}},
				},
				"reconfigure": {
					ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{{Id: programID, RootFiles: []DocumentIdentifier{{FileName: "/other.ts"}}, CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue, Strict: core.TSTrue}}},
				},
				"remove": {RemovePrograms: []project.SyntheticProjectID{programID}},
			} {
				t.Log(name)
				updated, err := session.handleUpdateSnapshot(t.Context(), &UpdateSnapshotParams{Snapshot: base.Snapshot, Changes: changes})
				assert.NilError(t, err, name)
				rebased, err := session.handleRebaseSnapshot(t.Context(), &RebaseSnapshotParams{Snapshot: base.Snapshot, NewSnapshot: base.Snapshot, Changes: changes})
				assert.NilError(t, err, name)
				assert.DeepEqual(t, rebased.Projects, updated.Projects)
				assert.DeepEqual(t, rebased.Changes, updated.Changes)
				assert.DeepEqual(t, rebased.Operation, updated.Operation)
				assert.Equal(t, session.snapshots[base.Snapshot].refCount, 1)
			}
		})
	}
}
