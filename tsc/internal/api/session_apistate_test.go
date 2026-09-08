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
	projectSession, _ := projecttestutil.Setup(map[string]any{
		configFileName:                  `{ "compilerOptions": { "strict": true } }`,
		"/home/projects/p/src/index.ts": `export const x = 1;`,
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

	unchanged, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		BaseSnapshot: response.Snapshot,
		Changes: &LanguageServerSnapshotChanges{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{
				OpenProjects: []DocumentIdentifier{{FileName: configFileName}},
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(unchanged.Projects), 0)
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
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{RemovePrograms: []ProjectID{created.Projects[0].Id}},
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
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{RemovePrograms: []ProjectID{created.Projects[0].Id}},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(projectSession.Snapshot().ProjectCollection.SyntheticProjects()), 1)

	other.Close()
	assert.Equal(t, len(projectSession.Snapshot().ProjectCollection.SyntheticProjects()), 1)
	owner.Close()
	assert.Equal(t, len(projectSession.Snapshot().ProjectCollection.SyntheticProjects()), 0)
}
