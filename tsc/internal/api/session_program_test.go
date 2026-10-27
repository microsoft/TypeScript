package api

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

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
