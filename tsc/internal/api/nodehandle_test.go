package api

import (
	"context"
	"fmt"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/api/encoder"
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestNodeHandlesIdentifyExactSourceFiles(t *testing.T) {
	t.Parallel()
	const text = "export const x = 1;"
	projectSession, _ := projecttestutil.Setup(map[string]any{"/index.ts": text})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		CreatePrograms: []*CreateSnapshotProgramParams{{
			RootFiles:       []DocumentIdentifier{{FileName: "/index.ts"}},
			CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue},
		}},
	})
	assert.NilError(t, err)
	sd, err := session.getSnapshotData(response.Snapshot)
	assert.NilError(t, err)
	program, err := sd.getProgram(response.Projects[0].Handle)
	assert.NilError(t, err)
	file := program.GetSourceFiles()[0]
	node := file.Statements.Nodes[0]
	var lookups sync.WaitGroup
	for range 8 {
		lookups.Go(func() {
			if got := program.GetSourceFileByNodeID(ast.GetNodeId(file.AsNode())); got != file {
				t.Errorf("source-file identity lookup returned %p, expected %p", got, file)
			}
		})
	}
	lookups.Wait()
	handle := NodeHandle(fmt.Sprintf("%d.#%d", encoder.GetNodeIndexTable(file).GetIndex(node), sourceFileNodeID(file)))
	resolved, err := sd.resolveNodeHandle(program, handle)
	assert.NilError(t, err)
	assert.Equal(t, resolved, node)

	// Equal text and path do not make a separately parsed AST part of this program.
	separate := parseAndBind(t, "/index.ts", text)
	_, err = sd.resolveNodeHandle(program, NodeHandle(fmt.Sprintf("1.#%d", sourceFileNodeID(separate))))
	assert.ErrorContains(t, err, "could not be resolved")

	resolved, err = sd.resolveNodeHandle(program, NodeHandle(fmt.Sprintf("1.#%d", sourceFileNodeID(file))))
	assert.NilError(t, err)
	assert.Equal(t, resolved, file.AsNode())
	assert.Equal(t, nodeHandleFrom(node), NodeHandle(fmt.Sprintf("%d.%d.#%d.%s",
		encoder.GetNodeIndexTable(file).GetIndex(node), node.Kind, sourceFileNodeID(file), file.PathKey())))

	for _, handle := range []NodeHandle{
		nodeHandleFrom(node),
		NodeHandle(fmt.Sprintf("1.%d.#%d", node.Kind, sourceFileNodeID(file))),
		NodeHandle(fmt.Sprintf("1.%d.%s", file.Kind, file.PathKey())),
		"1.#0",
		"1.#x",
		"x.#1",
		"1.1",
		"1.#18446744073709551616",
		NodeHandle(fmt.Sprintf("0.#%d", sourceFileNodeID(file))),
		NodeHandle(fmt.Sprintf("4294967295.#%d", sourceFileNodeID(file))),
	} {
		_, err = sd.resolveNodeHandle(program, handle)
		assert.Assert(t, err != nil, "unexpectedly resolved %q", handle)
	}
}
