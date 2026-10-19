package api

import (
	"fmt"
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/api/requestfilesystem"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestRebaseRemovesExplicitTombstoneDescendants(t *testing.T) {
	t.Parallel()
	for _, kind := range []requestfilesystem.Kind{requestfilesystem.KindLayer, requestfilesystem.KindFull} {
		t.Run(string(kind), func(t *testing.T) {
			t.Parallel()
			projectSession, _ := projecttestutil.Setup(map[string]any{})
			defer projectSession.Close()
			session := NewLSPSession(projectSession, nil)
			defer session.Close()
			source, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
				FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindLayer, RemovedPaths: []string{"/removed"}},
			})
			assert.NilError(t, err)
			target, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
				OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
				FileSystem: &requestfilesystem.RequestFileSystem{
					Kind: kind,
					Files: map[string]string{
						"/tsconfig.json":          `{"compilerOptions":{"noLib":true},"include":["**/*.ts"]}`,
						"/index.ts":               "export {};",
						"/removed/keep.ts":        "export const keep = true;",
						"/removed/nested/keep.ts": "export const nested = true;",
					},
					RemovedPaths: []string{"/removed"},
				},
			})
			assert.NilError(t, err)
			targetSnapshot := session.snapshots[target.Snapshot].snapshot
			targetProgram := targetSnapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram()
			assert.Assert(t, targetProgram.GetSourceFile("/removed/keep.ts") != nil)
			self, err := session.handleRebaseSnapshot(t.Context(), &RebaseSnapshotParams{
				Snapshot: target.Snapshot, NewSnapshot: target.Snapshot,
				Changes: &CreateSnapshotParams{EnsurePrograms: &EnsurePrograms{All: true}},
			})
			assert.NilError(t, err)
			assert.Assert(t, session.snapshots[self.Snapshot].snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram() == targetProgram)

			rebased, err := session.handleRebaseSnapshot(t.Context(), &RebaseSnapshotParams{
				Snapshot: source.Snapshot, NewSnapshot: target.Snapshot,
				Changes: &CreateSnapshotParams{EnsurePrograms: &EnsurePrograms{All: true}},
			})
			assert.NilError(t, err)
			snapshot := session.snapshots[rebased.Snapshot].snapshot
			program := snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram()
			for _, fileName := range []tspath.RootedFilePath{"/removed/keep.ts", "/removed/nested/keep.ts"} {
				assert.Assert(t, !snapshot.FileSystem().FileExists(fileName))
				assert.Assert(t, snapshot.GetFile(fileName) == nil)
				assert.Assert(t, program.GetSourceFile(fileName) == nil)
				assert.Assert(t, targetProgram.GetSourceFile(fileName) != nil)
			}
		})
	}
}

func TestRebaseFullFileSystemRemovesUnlistedFiles(t *testing.T) {
	t.Parallel()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	files := map[string]string{
		"/tsconfig.json": `{"compilerOptions":{"noLib":true},"files":["index.ts","hidden.ts"]}`,
		"/index.ts":      "export {};",
	}
	source, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindFull, Files: files},
	})
	assert.NilError(t, err)
	target, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindFull,
			Files: map[string]string{
				"/tsconfig.json": files["/tsconfig.json"],
				"/index.ts":      files["/index.ts"],
				"/hidden.ts":     "export const hidden = true;",
			},
			Directories: map[string]requestfilesystem.RequestDirectoryEntries{
				"/": {Files: []string{"index.ts", "tsconfig.json"}},
			},
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, session.snapshots[target.Snapshot].snapshot.GetFile("/hidden.ts") != nil)
	rebased, err := session.handleRebaseSnapshot(t.Context(), &RebaseSnapshotParams{
		Snapshot: source.Snapshot, NewSnapshot: target.Snapshot,
		Changes: &CreateSnapshotParams{EnsurePrograms: &EnsurePrograms{All: true}},
	})
	assert.NilError(t, err)
	snapshot := session.snapshots[rebased.Snapshot].snapshot
	assert.Assert(t, !snapshot.FileSystem().FileExists("/hidden.ts"))
	assert.Assert(t, snapshot.GetFile("/hidden.ts") == nil)
	assert.Assert(t, snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram().GetSourceFile("/hidden.ts") == nil)
}

func TestRebaseComparesTargetSnapshotContents(t *testing.T) {
	t.Parallel()
	for _, editor := range []bool{false, true} {
		for _, layeredTarget := range []bool{false, true} {
			t.Run(fmt.Sprintf("editor=%v/layer=%v", editor, layeredTarget), func(t *testing.T) {
				t.Parallel()
				const oldText = "export const value = 1;"
				const newText = "export const value = 2;"
				projectSession, _ := projecttestutil.Setup(map[string]any{
					"/tsconfig.json": `{"compilerOptions":{"noLib":true},"files":["index.ts"]}`,
					"/index.ts":      oldText,
				})
				defer projectSession.Close()
				session := NewLSPSession(projectSession, nil)
				defer session.Close()
				expected := newText
				if editor {
					expected = oldText
					projectSession.DidOpenFile(t.Context(), "file:///index.ts", 1, newText, lsproto.LanguageKindTypeScript)
				}
				target, err := session.handleGetCurrentLanguageServerSnapshot(t.Context(), &GetCurrentLanguageServerSnapshotParams{
					Changes: &LanguageServerSnapshotChanges{OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}}},
				})
				assert.NilError(t, err)
				if layeredTarget {
					target, err = session.handleUpdateSnapshot(t.Context(), &UpdateSnapshotParams{
						Snapshot: target.Snapshot,
						Changes: &CreateSnapshotParams{
							FileSystem:     &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindLayer},
							EnsurePrograms: &EnsurePrograms{All: true},
						},
					})
					assert.NilError(t, err)
				}
				targetProgram := session.snapshots[target.Snapshot].snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram()
				assert.Assert(t, targetProgram.GetSourceFile("/index.ts").Text() != expected)
				if !editor {
					assert.NilError(t, session.FS().WriteFile("/index.ts", newText))
				}
				source, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
					FileSystem: &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindLayer, Files: map[string]string{"/index.ts": expected}},
				})
				assert.NilError(t, err)
				rebased, err := session.handleRebaseSnapshot(t.Context(), &RebaseSnapshotParams{
					Snapshot: source.Snapshot, NewSnapshot: target.Snapshot,
					Changes: &CreateSnapshotParams{EnsurePrograms: &EnsurePrograms{All: true}},
				})
				assert.NilError(t, err)
				snapshot := session.snapshots[rebased.Snapshot].snapshot
				content, ok := snapshot.ReadFile("/index.ts")
				assert.Assert(t, ok)
				assert.Equal(t, content, expected)
				proj := snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json"))
				assert.Equal(t, proj.GetProgram().GetSourceFile("/index.ts").Text(), expected)
				assert.Equal(t, proj.ProgramUpdateKind, project.ProgramUpdateKindCloned)
			})
		}
	}
}

func TestRebaseUnchangedListingPreservesIncrementalState(t *testing.T) {
	t.Parallel()
	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	directories := map[string]requestfilesystem.RequestDirectoryEntries{
		"/": {Files: []string{"index.ts", "tsconfig.json"}},
	}
	target, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind: requestfilesystem.KindFull,
			Files: map[string]string{
				"/tsconfig.json": `{"compilerOptions":{"noLib":true},"files":["index.ts","hidden.ts"]}`,
				"/index.ts":      "export const value = 1;",
				"/hidden.ts":     "export const hidden = true;",
			},
			Directories: directories,
		},
	})
	assert.NilError(t, err)
	targetProgram := session.snapshots[target.Snapshot].snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json")).GetProgram()
	source, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		FileSystem: &requestfilesystem.RequestFileSystem{
			Kind:        requestfilesystem.KindLayer,
			Files:       map[string]string{"/index.ts": "export const value = 2;"},
			Directories: directories,
		},
	})
	assert.NilError(t, err)
	rebased, err := session.handleRebaseSnapshot(t.Context(), &RebaseSnapshotParams{
		Snapshot: source.Snapshot, NewSnapshot: target.Snapshot,
		Changes: &CreateSnapshotParams{EnsurePrograms: &EnsurePrograms{All: true}},
	})
	assert.NilError(t, err)
	proj := session.snapshots[rebased.Snapshot].snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json"))
	assert.Assert(t, proj != nil)
	assert.Equal(t, proj.ProgramUpdateKind, project.ProgramUpdateKindCloned)
	assert.Equal(t, proj.GetProgram().GetSourceFile("/index.ts").Text(), "export const value = 2;")
	assert.Assert(t, proj.GetProgram().GetSourceFile("/hidden.ts") == targetProgram.GetSourceFile("/hidden.ts"))
}

func TestRebaseGeneratedFilesAreRelativeToTarget(t *testing.T) {
	t.Parallel()
	for _, targetHasGeneratedFiles := range []bool{false, true} {
		t.Run(fmt.Sprintf("targetHasGeneratedFiles=%v", targetHasGeneratedFiles), func(t *testing.T) {
			t.Parallel()
			projectSession, _ := projecttestutil.Setup(map[string]any{
				"/tsconfig.json":       `{"compilerOptions":{"noLib":true},"include":["*.ts"]}`,
				"/index.ts":            "export const value = 1;",
				"/other/tsconfig.json": `{"compilerOptions":{"noLib":true},"files":["index.ts"]}`,
				"/other/index.ts":      "export {};",
			})
			defer projectSession.Close()
			projectSession.DidOpenFile(t.Context(), "file:///index.ts", 1, "export const value = 1;", lsproto.LanguageKindTypeScript)
			session := NewLSPSession(projectSession, nil)
			defer session.Close()
			base, err := session.handleGetCurrentLanguageServerSnapshot(t.Context(), &GetCurrentLanguageServerSnapshotParams{
				Changes: &LanguageServerSnapshotChanges{OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}, {FileName: "/other/tsconfig.json"}}},
			})
			assert.NilError(t, err)
			const count = 200
			files := make(map[string]string, count)
			for i := range count {
				files[fmt.Sprintf("/file%d.ngtypecheck.ts", i)] = "export {};"
			}
			layer := &requestfilesystem.RequestFileSystem{Kind: requestfilesystem.KindLayer, Files: files}
			source, err := session.handleUpdateSnapshot(t.Context(), &UpdateSnapshotParams{
				Snapshot: base.Snapshot,
				Changes:  &CreateSnapshotParams{FileSystem: layer, EnsurePrograms: &EnsurePrograms{All: true}},
			})
			assert.NilError(t, err)
			projectSession.DidChangeFile(t.Context(), "file:///index.ts", 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{{
				WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: "export const value = 2;"},
			}})
			target, err := session.handleGetCurrentLanguageServerSnapshot(t.Context(), &GetCurrentLanguageServerSnapshotParams{})
			assert.NilError(t, err)
			if targetHasGeneratedFiles {
				target, err = session.handleUpdateSnapshot(t.Context(), &UpdateSnapshotParams{
					Snapshot: target.Snapshot,
					Changes:  &CreateSnapshotParams{FileSystem: layer, EnsurePrograms: &EnsurePrograms{All: true}},
				})
				assert.NilError(t, err)
			}
			targetSnapshot := session.snapshots[target.Snapshot].snapshot
			unrelated := targetSnapshot.ProjectCollection.GetProject(project.ID("/other/tsconfig.json")).GetProgram()
			rebased, err := session.handleRebaseSnapshot(t.Context(), &RebaseSnapshotParams{
				Snapshot: source.Snapshot, NewSnapshot: target.Snapshot,
				Changes: &CreateSnapshotParams{
					FileSystem: &requestfilesystem.RequestFileSystem{
						Kind: requestfilesystem.KindLayer, Files: map[string]string{"/index.ts": "export const value = 3;"},
					},
					EnsurePrograms: &EnsurePrograms{All: true},
				},
			})
			assert.NilError(t, err)
			snapshot := session.snapshots[rebased.Snapshot].snapshot
			proj := snapshot.ProjectCollection.GetProject(project.ID("/tsconfig.json"))
			expectedKind := project.ProgramUpdateKindNewFiles
			if targetHasGeneratedFiles {
				expectedKind = project.ProgramUpdateKindCloned
			}
			assert.Equal(t, proj.ProgramUpdateKind, expectedKind)
			assert.Equal(t, len(proj.GetProgram().SourceFiles()), count+1)
			assert.Equal(t, proj.GetProgram().GetSourceFile("/index.ts").Text(), "export const value = 3;")
			assert.Assert(t, snapshot.ProjectCollection.GetProject(project.ID("/other/tsconfig.json")).GetProgram() == unrelated)
			assert.DeepEqual(t, rebased.Changes, &SnapshotChanges{
				ChangedProjects: map[project.ID]*ProjectFileChanges{
					"/tsconfig.json": {ChangedFiles: []tspath.PathKey{"/index.ts"}},
				},
			})
		})
	}
}

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
