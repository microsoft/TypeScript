package api

import (
	"context"
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
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

func TestIncrementalProgramComposesWithSnapshotUpdates(t *testing.T) {
	t.Parallel()

	const (
		mainFile       = "/home/projects/p/main.ts"
		dependencyFile = "/home/projects/p/dependency.ts"
		buildInfoFile  = "/home/projects/p/out/build.tsbuildinfo"
	)
	projectSession, sessionUtils := projecttestutil.Setup(map[string]any{
		mainFile:       `import { value } from "./dependency"; export const result = value();`,
		dependencyFile: `export function value() { return 1; }`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()
	options := func() CreateProgramOptions {
		return CreateProgramOptions{CompilerOptions: core.CompilerOptions{
			Declaration:     core.TSTrue,
			Incremental:     core.TSTrue,
			NoLib:           core.TSTrue,
			OutDir:          "/home/projects/p/out",
			RootDir:         "/home/projects/p",
			TsBuildInfoFile: buildInfoFile,
		}}
	}

	created, err := session.handleCreateSnapshot(ctx, &CreateSnapshotParams{
		CreatePrograms: []*CreateSnapshotProgramParams{{
			RootFiles:   []DocumentIdentifier{{FileName: mainFile}},
			Options:     options(),
			Incremental: true,
		}},
	})
	assert.NilError(t, err)
	programID := (*created.Operation.CreatedPrograms)[0]
	buildInfoText, err := session.handleGetBuildInfoEmit(ctx, &GetProjectDiagnosticsParams{Snapshot: created.Snapshot, Project: ProjectID(programID)})
	assert.NilError(t, err)
	assert.Assert(t, len(buildInfoText) > 0)
	_, buildInfoExists := sessionUtils.FS().ReadFile(buildInfoFile)
	assert.Assert(t, !buildInfoExists)
	emittedBuildInfoSnapshot, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: created.Snapshot,
		Changes: &CreateSnapshotParams{
			IncrementalOperations: []*IncrementalOperationParams{{
				Program: programID,
				Kind:    IncrementalOperationKindEmitBuildInfo,
			}},
		},
	})
	assert.NilError(t, err)
	buildInfoEmit := (*emittedBuildInfoSnapshot.Operation.IncrementalOperations)[0].Result
	assert.DeepEqual(t, buildInfoEmit.EmittedFiles, []string{buildInfoFile})
	writtenBuildInfo, ok := sessionUtils.FS().ReadFile(buildInfoFile)
	assert.Assert(t, ok)
	assert.Equal(t, writtenBuildInfo, buildInfoText)

	firstEmit, err := session.handleEmit(ctx, &EmitParams{Snapshot: created.Snapshot, Project: ProjectID(programID)})
	assert.NilError(t, err)
	assert.Assert(t, slices.Contains(firstEmit.EmittedFiles, buildInfoFile))
	buildInfoAfterEmit, err := session.handleGetBuildInfoEmit(ctx, &GetProjectDiagnosticsParams{Snapshot: created.Snapshot, Project: ProjectID(programID)})
	assert.NilError(t, err)
	assert.Equal(t, buildInfoAfterEmit, buildInfoText)

	restored, err := session.handleCreateSnapshot(ctx, &CreateSnapshotParams{
		CreatePrograms: []*CreateSnapshotProgramParams{{
			RootFiles:   []DocumentIdentifier{{FileName: mainFile}},
			Options:     options(),
			Incremental: true,
		}},
	})
	assert.NilError(t, err)
	restoredProgramID := (*restored.Operation.CreatedPrograms)[0]

	assert.NilError(t, sessionUtils.FS().WriteFile(dependencyFile, `export function value() { return 2; }`))
	dirty, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: restored.Snapshot,
		Changes: &CreateSnapshotParams{
			FileNotifications: &FileNotifications{Changed: []DocumentIdentifier{{FileName: dependencyFile}}},
		},
	})
	assert.NilError(t, err)
	dirtySnapshot, err := session.getSnapshotData(dirty.Snapshot)
	assert.NilError(t, err)
	dirtyProject, err := dirtySnapshot.getProject(ProjectID(restoredProgramID))
	assert.NilError(t, err)
	_, isIncremental := dirtyProject.GetProgramLike().(*incremental.Program)
	assert.Assert(t, isIncremental)
	assert.Assert(t, dirtyProject.IsDirty())

	emittedSnapshot, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: dirty.Snapshot,
		Changes: &CreateSnapshotParams{
			IncrementalOperations: []*IncrementalOperationParams{{
				Program: restoredProgramID,
				Kind:    IncrementalOperationKindEmit,
			}},
		},
	})
	assert.NilError(t, err)
	emitted := (*emittedSnapshot.Operation.IncrementalOperations)[0].Result
	assert.Assert(t, !slices.Contains(emitted.EmittedFiles, "/home/projects/p/out/main.js"), "unexpected emitted files: %v", emitted.EmittedFiles)
	assert.Assert(t, slices.Contains(emitted.EmittedFiles, "/home/projects/p/out/dependency.js"))

	reconfigured, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: emittedSnapshot.Snapshot,
		Changes: &CreateSnapshotParams{
			ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{{
				Id:        restoredProgramID,
				RootFiles: []DocumentIdentifier{{FileName: mainFile}},
				Options:   options(),
			}},
		},
	})
	assert.NilError(t, err)
	reconfiguredSnapshot, err := session.getSnapshotData(reconfigured.Snapshot)
	assert.NilError(t, err)
	reconfiguredProject, err := reconfiguredSnapshot.getProject(ProjectID(restoredProgramID))
	assert.NilError(t, err)
	_, isIncremental = reconfiguredProject.GetProgramLike().(*incremental.Program)
	assert.Assert(t, isIncremental)
}

func TestReconfigureSyntheticProgramValidation(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	program := &ReconfigureSnapshotProgramParams{Id: "/dev/null/synthetic/1"}
	var nullReconfigure SnapshotRequestChangesParams
	assert.NilError(t, json.Unmarshal([]byte(`{"reconfigurePrograms":[null]}`), &nullReconfigure))
	_, err := session.toAPISnapshotRequest(&nullReconfigure)
	assert.ErrorContains(t, err, "reconfigurePrograms[0] must not be null")

	_, err = session.toAPISnapshotRequest(&SnapshotRequestChangesParams{
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

func TestCreateSyntheticProgramValidation(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	var nullCreate SnapshotRequestChangesParams
	assert.NilError(t, json.Unmarshal([]byte(`{"createPrograms":[null]}`), &nullCreate))
	_, err := session.toAPISnapshotRequest(&nullCreate)
	assert.ErrorContains(t, err, "createPrograms[0] must not be null")
	assert.ErrorIs(t, err, ErrClientError)
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
			FileNotifications: &FileNotifications{Changed: []DocumentIdentifier{{FileName: fileName}}},
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
