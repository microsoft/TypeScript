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
		CreatePrograms: []*CreateSnapshotProgramParams{{
			RootFiles: []DocumentIdentifier{{FileName: "/home/projects/p/src/index.ts"}},
			Options: CreateProgramOptions{
				CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
			},
		}},
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
	})
	assert.NilError(t, err)
	assert.Equal(t, len(response.Projects), 2)
	assert.DeepEqual(t, *response.Operation.CreatedPrograms, []SyntheticProjectID{"/dev/null/synthetic/1", "/dev/null/synthetic/2"})
	assert.DeepEqual(t, response.Projects[0].RootFiles, []string{fileA, fileB})
	assert.Equal(t, response.Projects[0].CompilerOptions.Strict, core.TSTrue)
	assert.DeepEqual(t, response.Projects[1].RootFiles, []string{fileB})

	snapshot, err := session.getSnapshotData(response.Snapshot)
	assert.NilError(t, err)
	assert.Equal(t, len(snapshot.snapshot.CreatedPrograms()), 2)
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
		CreatePrograms:      []*CreateSnapshotProgramParams{},
		ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{},
		OpenFiles:           []DocumentIdentifier{},
	})
	assert.NilError(t, err)
	encoded, err = json.Marshal(response.Operation)
	assert.NilError(t, err)
	assert.Equal(t, string(encoded), `{"createdPrograms":[],"openedFiles":[]}`)
}

func TestUpdateSnapshotReconfiguresSyntheticProgram(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/home/projects/p/a.ts": `export const a = 1;`,
		"/home/projects/p/b.ts": `export const b = 2;`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	created, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		CreatePrograms: []*CreateSnapshotProgramParams{{
			RootFiles: []DocumentIdentifier{{FileName: "/home/projects/p/a.ts"}},
			Options:   CreateProgramOptions{CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue}},
		}},
	})
	assert.NilError(t, err)
	programID := (*created.Operation.CreatedPrograms)[0]

	reconfigured, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		Snapshot: created.Snapshot,
		Changes: &CreateSnapshotParams{
			ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{{
				Id:        programID,
				RootFiles: []DocumentIdentifier{{FileName: "/home/projects/p/b.ts"}},
				Options:   CreateProgramOptions{CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue, Strict: core.TSTrue}},
			}},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, reconfigured.Projects[0].Id, ProjectID(programID))
	assert.DeepEqual(t, reconfigured.Projects[0].RootFiles, []string{"/home/projects/p/b.ts"})
	assert.Equal(t, reconfigured.Projects[0].CompilerOptions.Strict, core.TSTrue)
}

func TestReconfigureSyntheticProgramValidation(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	program := &ReconfigureSnapshotProgramParams{Id: "/dev/null/synthetic/1"}
	_, err := session.toAPISnapshotRequest(&SnapshotRequestChangesParams{
		ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{{Id: "/tsconfig.json"}},
	})
	assert.ErrorContains(t, err, "invalid synthetic project handle")

	_, err = session.toAPISnapshotRequest(&SnapshotRequestChangesParams{
		ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{program, program},
	})
	assert.ErrorContains(t, err, "reconfigured more than once")

	_, err = session.toAPISnapshotRequest(&SnapshotRequestChangesParams{
		ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{program},
		RemovePrograms:      []SyntheticProjectID{program.Id},
	})
	assert.ErrorContains(t, err, "cannot be reconfigured and removed")

	_, err = session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		CreatePrograms:      []*CreateSnapshotProgramParams{{}},
		ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{program},
	})
	assert.ErrorContains(t, err, "not found for reconfiguration")
}

func TestCreateSnapshotRejectsRemovingProgramFromIndependentRoot(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()

	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	_, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		RemovePrograms: []SyntheticProjectID{"/dev/null/synthetic/1"},
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
		CreatePrograms: []*CreateSnapshotProgramParams{{
			RootFiles: []DocumentIdentifier{{FileName: fileName}},
			Options:   CreateProgramOptions{CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue}},
		}},
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
			EnsurePrograms: &EnsurePrograms{Projects: []ProjectID{projectID}},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, ensured.Projects[0].Dirty, false)
}
