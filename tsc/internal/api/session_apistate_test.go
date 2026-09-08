package api

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestGetCurrentLanguageServerSnapshotAdoptsChanges(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const configFileName = "/home/projects/p/tsconfig.json"
	const fileName = "/home/projects/p/src/index.ts"
	projectSession, utils := projecttestutil.Setup(map[string]any{
		configFileName: `{ "compilerOptions": { "strict": true } }`,
		fileName:       `export const x = 1;`,
	})
	defer projectSession.Close()

	session := NewLSPSession(projectSession, nil)
	response, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		Changes: &LanguageServerSnapshotChanges{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{
				OpenProjects: []DocumentIdentifier{{FileName: configFileName}},
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, session.openProjects.Len(), 1)
	assert.Equal(t, response.Snapshot, snapshotHandle(projectSession.Snapshot()))
	assert.Assert(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path(configFileName)) != nil)
	assert.NilError(t, utils.FS().WriteFile(fileName, `export const x = 2;`))
	projectSession.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{
		Uri:  DocumentIdentifier{FileName: fileName}.ToURI(projectSession.GetCurrentDirectory()),
		Type: lsproto.FileChangeTypeChanged,
	}})
	dirty, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{BaseSnapshot: response.Snapshot})
	assert.NilError(t, err)
	assert.Equal(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path(configFileName)).IsDirty(), true)

	unchanged, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		BaseSnapshot: dirty.Snapshot,
		Changes: &LanguageServerSnapshotChanges{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{
				OpenProjects: []DocumentIdentifier{{FileName: configFileName}},
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, unchanged.Projects[0].Dirty, false)
	assert.Equal(t, session.openProjects.Len(), 1)

	removed, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		BaseSnapshot: unchanged.Snapshot,
		Changes: &LanguageServerSnapshotChanges{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{
				CloseProjects: []DocumentIdentifier{{FileName: configFileName}},
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(removed.Projects), 0)
	assert.DeepEqual(t, removed.Changes.RemovedProjects, []ProjectID{ProjectID(configFileName)})
	assert.Equal(t, session.openProjects.Len(), 0)

	session.Close()
	assert.Equal(t, session.openProjects.Len(), 0)
	assert.Assert(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path(configFileName)) == nil)
}

func TestGetCurrentLanguageServerSnapshotRejectsStandaloneSession(t *testing.T) {
	t.Parallel()

	init, _ := projecttestutil.GetSessionInitOptions(map[string]any{}, nil, &projecttestutil.TypingsInstallerOptions{})
	session := NewStandaloneSession(init, nil)
	defer session.Close()

	_, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{})
	assert.ErrorContains(t, err, "requires an LSP-connected API session")
}

func TestGetCurrentLanguageServerSnapshotFlushesPendingLSPChanges(t *testing.T) {
	t.Parallel()

	const fileName = "/home/projects/p/index.ts"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		fileName: `export const value: string = 1;`,
	})
	defer projectSession.Close()

	projectSession.DidOpenFile(
		context.Background(),
		DocumentIdentifier{FileName: fileName}.ToURI(projectSession.GetCurrentDirectory()),
		1,
		`export const value: string = "ok";`,
		lsproto.LanguageKindTypeScript,
	)

	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	response, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{})
	assert.NilError(t, err)
	assert.Equal(t, response.Snapshot, snapshotHandle(projectSession.Snapshot()))

	snapshot, err := session.getSnapshotData(response.Snapshot)
	assert.NilError(t, err)
	assert.Equal(t, snapshot.snapshot.GetFile(fileName).Content(), `export const value: string = "ok";`)
}

func TestGetCurrentLanguageServerSnapshotReportsOpenedFilesInRequestOrder(t *testing.T) {
	t.Parallel()

	const configuredFile = "/home/projects/p/index.ts"
	const inferredFile = "/home/projects/loose.ts"
	projectSession, utils := projecttestutil.Setup(map[string]any{
		"/home/projects/p/tsconfig.json": `{}`,
		configuredFile:                   `export const configured = 1;`,
		inferredFile:                     `export const inferred = 1;`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	changes := &LanguageServerSnapshotChanges{SnapshotRequestChangesParams: SnapshotRequestChangesParams{
		OpenFiles: []DocumentIdentifier{{FileName: inferredFile}, {FileName: configuredFile}},
	}}
	first, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{Changes: changes})
	assert.NilError(t, err)
	assert.Equal(t, len(*first.Operation.OpenedFiles), 2)
	assert.Equal(t, (*first.Operation.OpenedFiles)[0].Project, ProjectID("/dev/null/inferred"))
	assert.Equal(t, (*first.Operation.OpenedFiles)[1].Project, ProjectID("/home/projects/p/tsconfig.json"))
	assert.NilError(t, utils.FS().WriteFile(configuredFile, `export const configured = 2;`))
	projectSession.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{
		Uri:  DocumentIdentifier{FileName: configuredFile}.ToURI(projectSession.GetCurrentDirectory()),
		Type: lsproto.FileChangeTypeChanged,
	}})
	dirty, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{BaseSnapshot: first.Snapshot})
	assert.NilError(t, err)
	assert.Equal(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/p/tsconfig.json")).IsDirty(), true)

	reopened, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		BaseSnapshot: dirty.Snapshot,
		Changes:      changes,
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, *reopened.Operation.OpenedFiles, *first.Operation.OpenedFiles)
	assert.Equal(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/p/tsconfig.json")).IsDirty(), false)
	assert.Equal(t, session.openFiles.Len(), 2)
}

func TestGetCurrentLanguageServerSnapshotCreatesAndRemovesPrograms(t *testing.T) {
	t.Parallel()

	const fileName = "/home/projects/p/index.ts"
	projectSession, _ := projecttestutil.Setup(map[string]any{fileName: `export const value = 1;`})
	defer projectSession.Close()

	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	created, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		Changes: &LanguageServerSnapshotChanges{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{
				CreatePrograms: []*CreateSnapshotProgramParams{{
					RootFiles: []DocumentIdentifier{{FileName: fileName}},
					Options: CreateProgramOptions{
						CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
					},
				}},
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(created.Projects), 1)
	assert.Equal(t, len(projectSession.Snapshot().ProjectCollection.SyntheticProjects()), 1)

	removed, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		Changes: &LanguageServerSnapshotChanges{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{RemovePrograms: []SyntheticProjectID{SyntheticProjectID(created.Projects[0].Id), SyntheticProjectID(created.Projects[0].Id)}},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(removed.Projects), 0)
	assert.Equal(t, len(projectSession.Snapshot().ProjectCollection.SyntheticProjects()), 0)
}

func TestClosingAPISessionRemovesCreatedLanguageServerPrograms(t *testing.T) {
	t.Parallel()

	const fileName = "/home/projects/p/index.ts"
	projectSession, _ := projecttestutil.Setup(map[string]any{fileName: `export const value = 1;`})
	defer projectSession.Close()

	session := NewLSPSession(projectSession, nil)
	_, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		Changes: &LanguageServerSnapshotChanges{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{
				CreatePrograms: []*CreateSnapshotProgramParams{{
					RootFiles: []DocumentIdentifier{{FileName: fileName}},
					Options: CreateProgramOptions{
						CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
					},
				}},
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(projectSession.Snapshot().ProjectCollection.SyntheticProjects()), 1)

	session.Close()
	assert.Equal(t, len(projectSession.Snapshot().ProjectCollection.SyntheticProjects()), 0)
}

func TestLanguageServerProgramOwnershipIsIsolatedByAPISession(t *testing.T) {
	t.Parallel()

	const fileName = "/home/projects/p/index.ts"
	projectSession, _ := projecttestutil.Setup(map[string]any{fileName: `export const value = 1;`})
	defer projectSession.Close()

	owner := NewLSPSession(projectSession, nil)
	created, err := owner.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		Changes: &LanguageServerSnapshotChanges{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{
				CreatePrograms: []*CreateSnapshotProgramParams{{
					RootFiles: []DocumentIdentifier{{FileName: fileName}},
					Options: CreateProgramOptions{
						CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
					},
				}},
			},
		},
	})
	assert.NilError(t, err)

	other := NewLSPSession(projectSession, nil)
	_, err = other.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		Changes: &LanguageServerSnapshotChanges{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{RemovePrograms: []SyntheticProjectID{SyntheticProjectID(created.Projects[0].Id)}},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(projectSession.Snapshot().ProjectCollection.SyntheticProjects()), 1)

	other.Close()
	assert.Equal(t, len(projectSession.Snapshot().ProjectCollection.SyntheticProjects()), 1)
	owner.Close()
	assert.Equal(t, len(projectSession.Snapshot().ProjectCollection.SyntheticProjects()), 0)
}

func TestOpeningProjectOwnedByAnotherAPISessionEnsuresProgram(t *testing.T) {
	t.Parallel()

	const configFileName = "/home/projects/p/tsconfig.json"
	const fileName = "/home/projects/p/index.ts"
	projectSession, utils := projecttestutil.Setup(map[string]any{
		configFileName: `{}`,
		fileName:       `export const value = 1;`,
	})
	defer projectSession.Close()
	openProject := &LanguageServerSnapshotChanges{SnapshotRequestChangesParams: SnapshotRequestChangesParams{
		OpenProjects: []DocumentIdentifier{{FileName: configFileName}},
	}}

	owner := NewLSPSession(projectSession, nil)
	_, err := owner.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{Changes: openProject})
	assert.NilError(t, err)
	assert.NilError(t, utils.FS().WriteFile(fileName, `export const value = 2;`))
	projectSession.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{
		Uri:  DocumentIdentifier{FileName: fileName}.ToURI(projectSession.GetCurrentDirectory()),
		Type: lsproto.FileChangeTypeChanged,
	}})
	_, err = owner.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{})
	assert.NilError(t, err)
	assert.Equal(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path(configFileName)).IsDirty(), true)

	other := NewLSPSession(projectSession, nil)
	opened, err := other.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{Changes: openProject})
	assert.NilError(t, err)
	assert.Equal(t, opened.Projects[0].Dirty, false)
	assert.Equal(t, other.openProjects.Len(), 1)

	other.Close()
	assert.Assert(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path(configFileName)) != nil)
	owner.Close()
	assert.Assert(t, projectSession.Snapshot().ProjectCollection.ConfiguredProject(tspath.Path(configFileName)) == nil)
}

func TestGetCurrentLanguageServerSnapshotOpeningLSPFileEnsuresConfiguredProgram(t *testing.T) {
	t.Parallel()

	const configFileName = "/home/projects/p/tsconfig.json"
	const fileName = "/home/projects/p/index.ts"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		configFileName: `{}`,
		fileName:       `export const value = 1;`,
	})
	defer projectSession.Close()
	uri := DocumentIdentifier{FileName: fileName}.ToURI(projectSession.GetCurrentDirectory())
	projectSession.DidOpenFile(context.Background(), uri, 1, `export const value = 1;`, lsproto.LanguageKindTypeScript)

	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	initial, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{})
	assert.NilError(t, err)
	assert.Equal(t, initial.Projects[0].Dirty, false)
	projectID := initial.Projects[0].Id

	projectSession.DidChangeFile(context.Background(), uri, 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{{
		WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: `export const value = 2;`},
	}})
	dirty, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{BaseSnapshot: initial.Snapshot})
	assert.NilError(t, err)
	assert.Equal(t, dirty.Projects[0].Dirty, true)

	ensured, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		BaseSnapshot: dirty.Snapshot,
		Changes: &LanguageServerSnapshotChanges{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{
				OpenFiles: []DocumentIdentifier{{FileName: fileName}},
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, ensured.Projects[0].Dirty, false)
	assert.Equal(t, (*ensured.Operation.OpenedFiles)[0].Project, projectID)
}
