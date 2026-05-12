package checker

import (
	"io/fs"
	"testing"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/tracing"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestTracerPushPreservesEndArgMutations(t *testing.T) {
	t.Parallel()

	fsys := vfstest.FromMap(fstest.MapFS{
		"/trace": &fstest.MapFile{Mode: fs.ModeDir},
	}, true)

	tr, err := tracing.StartTracing(fsys, "/trace", "", true /*deterministic*/)
	assert.NilError(t, err)

	args := map[string]any{"id": 1}
	tracer := NewTracer(tr, 7)
	pop := tracer.Push(tracing.PhaseCheckTypes, "getVariancesWorker", args, true)
	_, hasCheckerID := args["checkerId"]
	assert.Assert(t, !hasCheckerID)

	args["variances"] = []string{"out"}
	pop()
	_, hasCheckerID = args["checkerId"]
	assert.Assert(t, !hasCheckerID)

	assert.NilError(t, tr.StopTracing())

	traceText, ok := fsys.ReadFile("/trace/trace.json")
	assert.Assert(t, ok)

	var events []testTraceEvent
	assert.NilError(t, json.Unmarshal([]byte(traceText), &events))

	beginEvent := findTestTraceEvent(t, events, "B", "getVariancesWorker")
	assert.Equal(t, beginEvent.Args["checkerId"], float64(7))
	assert.Equal(t, beginEvent.Args["variances"], nil)

	endEvent := findTestTraceEvent(t, events, "E", "getVariancesWorker")
	assert.Equal(t, endEvent.Args["checkerId"], float64(7))
	variances, ok := endEvent.Args["variances"].([]any)
	assert.Assert(t, ok)
	assert.DeepEqual(t, variances, []any{"out"})
}

type testTraceEvent struct {
	PH   string         `json:"ph"`
	Name string         `json:"name"`
	Args map[string]any `json:"args"`
}

func findTestTraceEvent(t *testing.T, events []testTraceEvent, phase string, name string) testTraceEvent {
	t.Helper()
	for _, event := range events {
		if event.PH == phase && event.Name == name {
			return event
		}
	}
	t.Fatalf("failed to find %s event %q", phase, name)
	return testTraceEvent{}
}
