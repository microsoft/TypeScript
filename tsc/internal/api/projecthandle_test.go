package api

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestProjectHandles(t *testing.T) {
	t.Parallel()

	decoded, err := unmarshalPayload(string(MethodGetSourceFileNames), []byte(`{"snapshot":1,"project":42}`))
	assert.NilError(t, err)
	assert.Equal(t, decoded.(*GetSourceFileNamesParams).Project, project.Handle(42))

	for _, value := range []string{`"#42"`, `"/full/tsconfig.json"`} {
		_, err := unmarshalPayload(string(MethodGetSourceFileNames), []byte(`{"snapshot":1,"project":`+value+`}`))
		assert.Assert(t, err != nil)
	}
}

func TestProjectHandlesAreScopedToSnapshots(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/index.ts": "export const x = 1;",
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	params := &CreateSnapshotParams{
		CreatePrograms: []*CreateSnapshotProgramParams{{
			RootFiles:       []DocumentIdentifier{{FileName: "/index.ts"}},
			CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
		}},
	}
	first, err := session.handleCreateSnapshot(context.Background(), params)
	assert.NilError(t, err)
	second, err := session.handleCreateSnapshot(context.Background(), params)
	assert.NilError(t, err)
	assert.Equal(t, first.Projects[0].Id, second.Projects[0].Id)
	assert.Assert(t, first.Projects[0].Handle != second.Projects[0].Handle)

	for _, response := range []*CreateSnapshotResponse{first, second} {
		_, err = session.handleGetSourceFileNames(context.Background(), &GetSourceFileNamesParams{
			Snapshot: response.Snapshot,
			Project:  response.Projects[0].Handle,
		})
		assert.NilError(t, err)
	}
	_, err = session.handleGetSourceFileNames(context.Background(), &GetSourceFileNamesParams{
		Snapshot: second.Snapshot,
		Project:  first.Projects[0].Handle,
	})
	assert.ErrorContains(t, err, "not found")
}
