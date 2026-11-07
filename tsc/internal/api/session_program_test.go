package api

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestProgramSourceFileIncludesSupplementalFile(t *testing.T) {
	t.Parallel()

	const supplementalFileName = "/home/project/app.box.0.ts"
	files := map[string]any{
		"/home/project/tsconfig.json":                    `{"compilerOptions":{"noLib":true},"files":["app.box","main.ts","missing.ts"],"contentMappers":[{"package":"mapper","extensions":[".box"]}]}`,
		"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.SupplementalMapper),
		"/home/project/app.box":                          "declare const supplementalValue: number;",
		"/home/project/main.ts":                          "const value: number = supplementalValue;",
	}
	init, _ := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory: "/home/project",
		RunExternalCode:  true,
	}, nil)
	init.Spawner = contentmappertest.NewSpawner()
	projectSession := project.NewSession(init)
	defer projectSession.Close()
	projectSession.DidOpenFile(context.Background(), "file:///home/project/main.ts", 1, files["/home/project/main.ts"].(string), lsproto.LanguageKindTypeScript)
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	response, err := session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{})
	assert.NilError(t, err)
	params := &GetSourceFileParams{
		Snapshot: response.Snapshot,
		Project:  response.Projects[0].Handle,
		File:     DocumentIdentifier{FileName: supplementalFileName},
	}
	sd, err := session.getSnapshotData(response.Snapshot)
	assert.NilError(t, err)
	assert.Assert(t, sd.snapshot.GetFile(supplementalFileName) == nil)
	sourceFile, err := session.handleGetSourceFile(context.Background(), params)
	assert.NilError(t, err)
	assert.Assert(t, sourceFile != nil)
}

func TestProgramStatisticsUseAPIChecker(t *testing.T) {
	t.Parallel()

	const fileName = "/home/projects/p/index.ts"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		fileName: "export const value = 1;",
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		CreatePrograms: []*CreateSnapshotProgramParams{{
			RootFiles:       []DocumentIdentifier{{FileName: fileName}},
			CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
		}},
	})
	assert.NilError(t, err)
	params := &GetProjectDiagnosticsParams{Snapshot: response.Snapshot, Project: response.Projects[0].Handle}
	setup, err := session.setupChecker(context.Background(), params.Snapshot, params.Project)
	assert.NilError(t, err)
	file := setup.program.GetSourceFile(fileName)
	setup.checker.GetTypeAtLocation(file.Statements.Nodes[0])
	expected := ProgramStatisticsResponse{
		NodeCount:          file.NodeCount,
		IdentifierCount:    file.IdentifierCount,
		SymbolCount:        file.SymbolCount + int(setup.checker.SymbolCount),
		TypeCount:          setup.checker.TypeCount,
		InstantiationCount: setup.checker.TotalInstantiationCount,
		RelationCacheSizes: setup.checker.GetRelationCacheSizes(),
	}
	setup.done()

	actual, err := session.handleGetProgramStatistics(context.Background(), params)
	assert.NilError(t, err)
	assert.DeepEqual(t, *actual, expected)
	_, err = session.handleGetProgramStatistics(context.Background(), &GetProjectDiagnosticsParams{
		Snapshot: response.Snapshot, Project: project.Handle(999999),
	})
	assert.ErrorContains(t, err, "not found")
}
