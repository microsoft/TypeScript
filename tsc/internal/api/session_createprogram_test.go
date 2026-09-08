package api

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestCreateSnapshotUsesIndependentRoots(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	init, _ := projecttestutil.GetSessionInitOptions(map[string]any{
		"/home/projects/p/src/index.ts": `export const x = 1;`,
	}, nil, &projecttestutil.TypingsInstallerOptions{})
	session := NewStandaloneSession(init, nil)
	defer session.Close()

	firstResponse, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		SnapshotRequestChangesParams: SnapshotRequestChangesParams{
			CreatePrograms: []*CreateSnapshotProgramParams{{
				RootFiles: []DocumentIdentifier{{FileName: "/home/projects/p/src/index.ts"}},
				Options: CreateProgramOptions{
					CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
				},
			}},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, firstResponse.Snapshot, SnapshotID(1))
	assert.Equal(t, len(firstResponse.Projects), 1)

	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{})
	assert.NilError(t, err)
	assert.Equal(t, response.Snapshot, SnapshotID(2))
	assert.Equal(t, len(response.Projects), 0)
	assert.Equal(t, len(firstResponse.Projects), 1)
}

func TestCreateSnapshotCreatesPrograms(t *testing.T) {
	t.Parallel()

	const (
		fileA = "/home/projects/p/a.ts"
		fileB = "/home/projects/p/b.ts"
	)
	projectSession, _ := projecttestutil.Setup(map[string]any{
		fileA: "export const a = 1;",
		fileB: "export const b = 1;",
	})
	defer projectSession.Close()

	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		SnapshotRequestChangesParams: SnapshotRequestChangesParams{
			CreatePrograms: []*CreateSnapshotProgramParams{
				{
					RootFiles: []DocumentIdentifier{{FileName: fileA}, {FileName: fileB}},
					Options: CreateProgramOptions{
						CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue, Strict: core.TSTrue},
					},
				},
				{
					RootFiles: []DocumentIdentifier{{FileName: fileB}},
					Options: CreateProgramOptions{
						CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
					},
				},
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(response.Projects), 2)
	assert.DeepEqual(t, *response.Operation.CreatedPrograms, []SyntheticProjectID{"/dev/null/synthetic/1", "/dev/null/synthetic/2"})
	assert.DeepEqual(t, response.Projects[0].RootFiles, []string{fileA, fileB})
	assert.Equal(t, response.Projects[0].CompilerOptions.Strict, core.TSTrue)
	assert.DeepEqual(t, response.Projects[1].RootFiles, []string{fileB})

	snapshot, err := session.getSnapshotData(response.Snapshot)
	assert.NilError(t, err)
	assert.Equal(t, len(snapshot.snapshot.ProjectCollection.SyntheticProjects()), 2)
	for _, projectResponse := range response.Projects {
		assert.Assert(t, snapshot.snapshot.ProjectCollection.GetProjectByPath(tspath.Path(projectResponse.Id)) != nil)
	}
}

func TestSnapshotOperationResponseOmitsUnrequestedFields(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{})
	assert.NilError(t, err)
	encoded, err := json.Marshal(response.Operation)
	assert.NilError(t, err)
	assert.Equal(t, string(encoded), `{}`)

	response, err = session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		SnapshotRequestChangesParams: SnapshotRequestChangesParams{
			CreatePrograms: []*CreateSnapshotProgramParams{},
			OpenFiles:      []DocumentIdentifier{},
		},
	})
	assert.NilError(t, err)
	encoded, err = json.Marshal(response.Operation)
	assert.NilError(t, err)
	assert.Equal(t, string(encoded), `{"createdPrograms":[],"openedFiles":[]}`)
}

func TestCreateSnapshotRejectsRemovingProgramFromIndependentRoot(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()

	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	_, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		SnapshotRequestChangesParams: SnapshotRequestChangesParams{
			RemovePrograms: []SyntheticProjectID{"/dev/null/synthetic/1"},
		},
	})
	assert.ErrorContains(t, err, "synthetic program not found for removal: 1")
}

func TestUpdateSnapshotEnsuresSyntheticProgram(t *testing.T) {
	t.Parallel()

	const fileName = "/home/projects/p/index.ts"
	projectSession, utils := projecttestutil.Setup(map[string]any{fileName: `export const value = 1;`})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	created, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		SnapshotRequestChangesParams: SnapshotRequestChangesParams{
			CreatePrograms: []*CreateSnapshotProgramParams{{
				RootFiles: []DocumentIdentifier{{FileName: fileName}},
				Options:   CreateProgramOptions{CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue}},
			}},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, created.Projects[0].Dirty, false)
	projectID := created.Projects[0].Id

	assert.NilError(t, utils.FS().WriteFile(fileName, `export const value = 2;`))
	dirty, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: created.Snapshot,
		Changes: &CreateSnapshotParams{
			FileChanges: &APIFileChanges{Changed: []DocumentIdentifier{{FileName: fileName}}},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, dirty.Projects[0].Dirty, true)

	ensured, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: dirty.Snapshot,
		Changes: &CreateSnapshotParams{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{
				EnsurePrograms: &EnsurePrograms{Projects: []ProjectID{projectID}},
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, ensured.Projects[0].Dirty, false)
}
