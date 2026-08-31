package api

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestCreateProgram(t *testing.T) {
	t.Parallel()

	const fileName = "/home/projects/p/index.ts"
	projectSession, sessionUtils := projecttestutil.Setup(map[string]any{
		fileName: `export const value: string = 1;`,
	})
	defer projectSession.Close()

	session := NewSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()

	baseResponse, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{})
	assert.NilError(t, err)
	projectSession.DidOpenFile(
		ctx,
		DocumentIdentifier{FileName: fileName}.ToURI(projectSession.GetCurrentDirectory()),
		1,
		`export const value: string = "valid overlay";`,
		lsproto.LanguageKindTypeScript,
	)

	response, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: fileName}},
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{
				NoLib:  core.TSTrue,
				Strict: core.TSTrue,
			},
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, response.Snapshot != baseResponse.Snapshot)
	assert.Equal(t, session.latestSnapshot, baseResponse.Snapshot)
	assert.Assert(t, response.Project != nil)
	assert.DeepEqual(t, response.Project.RootFiles, []string{fileName})
	assert.Equal(t, response.Project.CompilerOptions.Strict, core.TSTrue)

	snapshot, err := session.getSnapshotData(response.Snapshot)
	assert.NilError(t, err)
	assert.Equal(t, len(snapshot.snapshot.ProjectCollection.Projects()), 1)

	diagnostics, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: response.Snapshot,
		Project:  response.Project.Id,
		Files:    []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(diagnostics), 0)

	assert.NilError(t, sessionUtils.FS().WriteFile(fileName, `export const value: string = "valid on disk";`))
	updatedResponse, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: fileName}},
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{
				NoLib:  core.TSTrue,
				Strict: core.TSTrue,
			},
		},
		OldProgram: &CreateProgramOldProgramParams{
			Snapshot: response.Snapshot,
			Project:  response.Project.Id,
		},
		FileChanges: &APIFileChanges{
			Changed: []DocumentIdentifier{{FileName: fileName}},
		},
	})
	assert.NilError(t, err)
	updatedSnapshot, err := session.getSnapshotData(updatedResponse.Snapshot)
	assert.NilError(t, err)
	updatedProject := updatedSnapshot.snapshot.ProjectCollection.InferredProject()
	assert.Assert(t, updatedProject != nil)

	updatedDiagnostics, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: updatedResponse.Snapshot,
		Project:  updatedResponse.Project.Id,
		Files:    []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(updatedDiagnostics), 0)

	oldDiagnostics, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: response.Snapshot,
		Project:  response.Project.Id,
		Files:    []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(oldDiagnostics), 0)

	_, err = session.handleRelease(ctx, &ReleaseParams{Snapshot: updatedResponse.Snapshot})
	assert.NilError(t, err)
	_, err = session.handleRelease(ctx, &ReleaseParams{Snapshot: response.Snapshot})
	assert.NilError(t, err)
	_, err = session.getSnapshotData(response.Snapshot)
	assert.ErrorContains(t, err, "not found")
	_, err = session.getSnapshotData(baseResponse.Snapshot)
	assert.NilError(t, err)
}

func TestCreateProgramWithNoRootFiles(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()

	session := NewSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleCreateProgram(context.Background(), &CreateProgramParams{
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, response.Project != nil)
	assert.Equal(t, len(response.Project.RootFiles), 0)

	snapshot, err := session.getSnapshotData(response.Snapshot)
	assert.NilError(t, err)
	project := snapshot.snapshot.ProjectCollection.InferredProject()
	assert.Assert(t, project != nil)
	assert.Assert(t, project.Program != nil)
	assert.Equal(t, len(project.Program.GetSourceFiles()), 0)
}

func TestCreateProgramFromSnapshotFileSystem(t *testing.T) {
	t.Parallel()

	const fileName = "/src/index.ts"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		fileName: `export const source = "host";`,
	})
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()

	base, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		FileSystem: &SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				fileName: `export const source = "memory";`,
			},
		},
	})
	assert.NilError(t, err)

	response, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles:    []DocumentIdentifier{{FileName: fileName}},
		BaseSnapshot: base.Snapshot,
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
		},
	})
	assert.NilError(t, err)
	created, err := session.getSnapshotData(response.Snapshot)
	assert.NilError(t, err)
	program := created.snapshot.ProjectCollection.InferredProject().Program
	assert.Equal(t, program.GetSourceFile(fileName).Text(), `export const source = "memory";`)
}

func TestCreateProgramRemovesAllRootFiles(t *testing.T) {
	t.Parallel()

	const fileName = "/home/projects/p/index.ts"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		fileName: "export {};",
	})
	defer projectSession.Close()

	session := NewSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()

	oldResponse, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: fileName}},
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
		},
	})
	assert.NilError(t, err)

	response, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
		},
		OldProgram: &CreateProgramOldProgramParams{
			Snapshot: oldResponse.Snapshot,
			Project:  oldResponse.Project.Id,
		},
		FileChanges: &APIFileChanges{
			Changed: []DocumentIdentifier{{FileName: fileName}},
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, response.Project != nil)
	assert.Equal(t, len(response.Project.RootFiles), 0)

	snapshot, err := session.getSnapshotData(response.Snapshot)
	assert.NilError(t, err)
	project := snapshot.snapshot.ProjectCollection.InferredProject()
	assert.Assert(t, project != nil)
	assert.Assert(t, project.Program != nil)
	assert.Equal(t, len(project.Program.GetSourceFiles()), 0)
}

func TestCreateProgramPreservesRootFileOrder(t *testing.T) {
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

	session := NewSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()

	oldResponse, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: fileB}, {FileName: fileA}},
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
		},
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, oldResponse.Project.RootFiles, []string{fileB, fileA})

	response, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: fileA}, {FileName: fileB}},
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
		},
		OldProgram: &CreateProgramOldProgramParams{
			Snapshot: oldResponse.Snapshot,
			Project:  oldResponse.Project.Id,
		},
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, response.Project.RootFiles, []string{fileA, fileB})

	snapshot, err := session.getSnapshotData(response.Snapshot)
	assert.NilError(t, err)
	assert.Equal(t, snapshot.snapshot.ProjectCollection.InferredProject().ProgramUpdateKind, project.ProgramUpdateKindSameFileNames)
}

func TestCreateProgramReusesProgram(t *testing.T) {
	t.Parallel()

	const fileName = "/home/projects/p/index.ts"
	projectSession, sessionUtils := projecttestutil.Setup(map[string]any{
		fileName: `export const value: string = 1;`,
	})
	defer projectSession.Close()

	session := NewSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()

	oldResponse, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: fileName}},
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{
				NoLib:  core.TSTrue,
				Strict: core.TSTrue,
			},
		},
	})
	assert.NilError(t, err)

	assert.NilError(t, sessionUtils.FS().WriteFile(fileName, `export const value: string = "valid";`))
	updatedResponse, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: fileName}},
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{
				NoLib:  core.TSTrue,
				Strict: core.TSTrue,
			},
		},
		OldProgram: &CreateProgramOldProgramParams{
			Snapshot: oldResponse.Snapshot,
			Project:  oldResponse.Project.Id,
		},
		FileChanges: &APIFileChanges{
			Changed: []DocumentIdentifier{{FileName: fileName}},
		},
	})
	assert.NilError(t, err)

	updatedSnapshot, err := session.getSnapshotData(updatedResponse.Snapshot)
	assert.NilError(t, err)
	updatedProject := updatedSnapshot.snapshot.ProjectCollection.InferredProject()
	assert.Assert(t, updatedProject != nil)
	assert.Equal(t, updatedProject.ProgramUpdateKind, project.ProgramUpdateKindCloned)

	changedOptionsResponse, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: fileName}},
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{
				NoLib:  core.TSTrue,
				Strict: core.TSFalse,
			},
		},
		OldProgram: &CreateProgramOldProgramParams{
			Snapshot: oldResponse.Snapshot,
			Project:  oldResponse.Project.Id,
		},
	})
	assert.NilError(t, err)
	changedOptionsSnapshot, err := session.getSnapshotData(changedOptionsResponse.Snapshot)
	assert.NilError(t, err)
	changedOptionsProject := changedOptionsSnapshot.snapshot.ProjectCollection.InferredProject()
	assert.Assert(t, changedOptionsProject != nil)
	assert.Equal(t, changedOptionsProject.CommandLine.CompilerOptions().Strict, core.TSFalse)
	assert.Equal(t, changedOptionsProject.ProgramUpdateKind, project.ProgramUpdateKindSameFileNames)
}

func TestCreateProgramProjectReferencesAndReuse(t *testing.T) {
	t.Parallel()

	const (
		fileName        = "/home/projects/app/index.ts"
		libConfigName   = "/home/projects/lib/tsconfig.json"
		otherConfigName = "/home/projects/other/tsconfig.json"
	)
	projectSession, sessionUtils := projecttestutil.Setup(map[string]any{
		fileName:                        `export const value: string = 1;`,
		libConfigName:                   `{ "compilerOptions": { "composite": true, "noLib": true }, "files": ["index.ts"] }`,
		"/home/projects/lib/index.ts":   `export const lib = 1;`,
		otherConfigName:                 `{ "compilerOptions": { "composite": true, "noLib": true }, "files": ["index.ts"] }`,
		"/home/projects/other/index.ts": `export const other = 1;`,
	})
	defer projectSession.Close()

	session := NewSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()
	libReference := &core.ProjectReference{Path: libConfigName, OriginalPath: libConfigName}

	oldResponse, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: fileName}},
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions:   core.CompilerOptions{NoLib: core.TSTrue, Strict: core.TSTrue},
			ProjectReferences: []*core.ProjectReference{libReference},
		},
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, oldResponse.Project.ParsedCommandLine.ProjectReferences, []*core.ProjectReference{libReference})
	oldSnapshot, err := session.getSnapshotData(oldResponse.Snapshot)
	assert.NilError(t, err)
	resolvedReferences := oldSnapshot.snapshot.ProjectCollection.InferredProject().Program.GetResolvedProjectReferences()
	assert.Equal(t, len(resolvedReferences), 1)
	assert.Equal(t, resolvedReferences[0].ConfigName(), libConfigName)

	assert.NilError(t, sessionUtils.FS().WriteFile(fileName, `export const value: string = "valid";`))
	equivalentLibReference := &core.ProjectReference{Path: libConfigName, OriginalPath: "../lib"}
	reusedResponse, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: fileName}},
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions:   core.CompilerOptions{NoLib: core.TSTrue, Strict: core.TSTrue},
			ProjectReferences: []*core.ProjectReference{equivalentLibReference},
		},
		OldProgram: &CreateProgramOldProgramParams{
			Snapshot: oldResponse.Snapshot,
			Project:  oldResponse.Project.Id,
		},
		FileChanges: &APIFileChanges{Changed: []DocumentIdentifier{{FileName: fileName}}},
	})
	assert.NilError(t, err)
	reusedSnapshot, err := session.getSnapshotData(reusedResponse.Snapshot)
	assert.NilError(t, err)
	assert.Equal(t, reusedSnapshot.snapshot.ProjectCollection.InferredProject().ProgramUpdateKind, project.ProgramUpdateKindCloned)

	otherReference := &core.ProjectReference{Path: otherConfigName, OriginalPath: otherConfigName}
	changedResponse, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: fileName}},
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions:   core.CompilerOptions{NoLib: core.TSTrue, Strict: core.TSTrue},
			ProjectReferences: []*core.ProjectReference{otherReference},
		},
		OldProgram: &CreateProgramOldProgramParams{
			Snapshot: oldResponse.Snapshot,
			Project:  oldResponse.Project.Id,
		},
	})
	assert.NilError(t, err)
	changedSnapshot, err := session.getSnapshotData(changedResponse.Snapshot)
	assert.NilError(t, err)
	changedProject := changedSnapshot.snapshot.ProjectCollection.InferredProject()
	assert.Equal(t, changedProject.ProgramUpdateKind, project.ProgramUpdateKindSameFileNames)
	assert.DeepEqual(t, changedProject.CommandLine.ProjectReferences(), []*core.ProjectReference{otherReference})
}

func TestCreateProgramFromConfiguredProgramDoesNotRetainOtherProjects(t *testing.T) {
	t.Parallel()

	const (
		configFileName      = "/home/projects/p/tsconfig.json"
		fileName            = "/home/projects/p/index.ts"
		otherConfigFileName = "/home/projects/other/tsconfig.json"
		otherFileName       = "/home/projects/other/index.ts"
	)
	projectSession, sessionUtils := projecttestutil.Setup(map[string]any{
		configFileName:      `{ "compilerOptions": { "noLib": true, "strict": true }, "files": ["index.ts"] }`,
		fileName:            `export const value: string = 1;`,
		otherConfigFileName: `{ "files": ["index.ts"] }`,
		otherFileName:       `export const other = 1;`,
	})
	defer projectSession.Close()

	session := NewSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()

	baseResponse, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: configFileName}, {FileName: otherConfigFileName}},
	})
	assert.NilError(t, err)
	var baseProject *ProjectResponse
	for _, candidate := range baseResponse.Projects {
		if candidate.ConfigFileName == configFileName {
			baseProject = candidate
			break
		}
	}
	assert.Assert(t, baseProject != nil)
	rootFiles := make([]DocumentIdentifier, len(baseProject.RootFiles))
	for i, rootFile := range baseProject.RootFiles {
		rootFiles[i] = DocumentIdentifier{FileName: rootFile}
	}

	assert.NilError(t, sessionUtils.FS().WriteFile(fileName, `export const value: string = "valid";`))
	updatedResponse, err := session.handleCreateProgram(ctx, &CreateProgramParams{
		RootFiles: rootFiles,
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{
				NoLib:  core.TSTrue,
				Strict: core.TSTrue,
			},
		},
		OldProgram: &CreateProgramOldProgramParams{
			Snapshot: baseResponse.Snapshot,
			Project:  baseProject.Id,
		},
		FileChanges: &APIFileChanges{
			Changed: []DocumentIdentifier{{FileName: fileName}},
		},
	})
	assert.NilError(t, err)

	updatedSnapshot, err := session.getSnapshotData(updatedResponse.Snapshot)
	assert.NilError(t, err)
	assert.Equal(t, len(updatedSnapshot.snapshot.ProjectCollection.Projects()), 1)
	assert.Equal(t, len(updatedSnapshot.snapshot.ProjectCollection.ConfiguredProjects()), 0)
	assert.Assert(t, updatedSnapshot.snapshot.ConfigFileRegistry.GetConfig(tspath.Path(otherConfigFileName)) == nil)
	updatedProject := updatedSnapshot.snapshot.ProjectCollection.InferredProject()
	assert.Assert(t, updatedProject != nil)
	assert.Equal(t, updatedProject.ProgramUpdateKind, project.ProgramUpdateKindSameFileNames)
	updatedDiagnostics, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: updatedResponse.Snapshot,
		Project:  updatedResponse.Project.Id,
		Files:    []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(updatedDiagnostics), 0)

	_, err = session.handleRelease(ctx, &ReleaseParams{Snapshot: updatedResponse.Snapshot})
	assert.NilError(t, err)
	baseDiagnostics, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: baseResponse.Snapshot,
		Project:  baseProject.Id,
		Files:    []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(baseDiagnostics), 1)
}
