package tracing

import (
	"io/fs"
	"testing"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestConcurrentDurationEventsUseSeparateThreadIDs(t *testing.T) {
	t.Parallel()

	fsys := vfstest.FromMap(fstest.MapFS{
		"/trace": &fstest.MapFile{Mode: fs.ModeDir},
	}, true)

	tr, err := StartTracing(fsys, "/trace", "", true /*deterministic*/)
	assert.NilError(t, err)

	endA := tr.Push(PhaseParse, "createSourceFile", map[string]any{"path": "/a.ts"}, true)
	endB := tr.Push(PhaseParse, "createSourceFile", map[string]any{"path": "/b.ts"}, true)
	endA()
	endB()

	endCheck := tr.Push(PhaseCheck, "checkSourceFile", map[string]any{"checkerId": 0, "path": "/a.ts"}, true)
	endVariance := tr.Push(PhaseCheckTypes, "getVariancesWorker", map[string]any{"checkerId": 0, "id": 1}, true)
	endVariance()
	endCheck()

	assert.NilError(t, tr.StopTracing())

	traceText, ok := fsys.ReadFile("/trace/trace.json")
	assert.Assert(t, ok)

	var events []traceEvent
	assert.NilError(t, json.Unmarshal([]byte(traceText), &events))

	aBegin := findEvent(t, events, "B", "createSourceFile", "path", "/a.ts")
	aEnd := findEvent(t, events, "E", "createSourceFile", "path", "/a.ts")
	bBegin := findEvent(t, events, "B", "createSourceFile", "path", "/b.ts")
	bEnd := findEvent(t, events, "E", "createSourceFile", "path", "/b.ts")
	assert.Equal(t, aBegin.TID, aEnd.TID)
	assert.Equal(t, bBegin.TID, bEnd.TID)
	assert.Assert(t, aBegin.TID != bBegin.TID)
	assertThreadName(t, events, aBegin.TID, "file:/a.ts")
	assertThreadName(t, events, bBegin.TID, "file:/b.ts")

	checkBegin := findEvent(t, events, "B", "checkSourceFile", "path", "/a.ts")
	varianceBegin := findEvent(t, events, "B", "getVariancesWorker", "id", float64(1))
	assert.Equal(t, checkBegin.TID, varianceBegin.TID)
	assertThreadName(t, events, checkBegin.TID, "checker:0")

	assertDurationEventsAreWellNestedByThread(t, events)
}

func TestThreadIDsAreStableAcrossFirstSeenOrder(t *testing.T) {
	t.Parallel()

	first := traceThreadIDsForPaths(t, []string{"/a.ts", "/b.ts"})
	second := traceThreadIDsForPaths(t, []string{"/b.ts", "/a.ts"})

	assert.DeepEqual(t, first, second)
}

func traceThreadIDsForPaths(t *testing.T, paths []string) map[string]int {
	t.Helper()

	fsys := vfstest.FromMap(fstest.MapFS{
		"/trace": &fstest.MapFile{Mode: fs.ModeDir},
	}, true)

	tr, err := StartTracing(fsys, "/trace", "", true /*deterministic*/)
	assert.NilError(t, err)

	for _, path := range paths {
		end := tr.Push(PhaseParse, "createSourceFile", map[string]any{"path": path}, true)
		end()
	}

	assert.NilError(t, tr.StopTracing())

	traceText, ok := fsys.ReadFile("/trace/trace.json")
	assert.Assert(t, ok)

	var events []traceEvent
	assert.NilError(t, json.Unmarshal([]byte(traceText), &events))

	threadIDs := make(map[string]int)
	for _, path := range paths {
		threadIDs[path] = findEvent(t, events, "B", "createSourceFile", "path", path).TID
	}
	return threadIDs
}

func findEvent(t *testing.T, events []traceEvent, phase string, name string, argName string, argValue any) traceEvent {
	t.Helper()
	for _, event := range events {
		if event.PH == phase && event.Name == name && event.Args[argName] == argValue {
			return event
		}
	}
	t.Fatalf("failed to find %s event %q with %s=%v", phase, name, argName, argValue)
	return traceEvent{}
}

func assertThreadName(t *testing.T, events []traceEvent, tid int, name string) {
	t.Helper()
	for _, event := range events {
		if event.PH == "M" && event.Name == "thread_name" && event.TID == tid && event.Args["name"] == name {
			return
		}
	}
	t.Fatalf("failed to find thread_name metadata for thread %d named %q", tid, name)
}

func assertDurationEventsAreWellNestedByThread(t *testing.T, events []traceEvent) {
	t.Helper()

	stacks := make(map[int][]traceEvent)
	for _, event := range events {
		switch event.PH {
		case "B":
			stacks[event.TID] = append(stacks[event.TID], event)
		case "E":
			stack := stacks[event.TID]
			assert.Assert(t, len(stack) > 0, "unmatched end event %q on thread %d", event.Name, event.TID)
			begin := stack[len(stack)-1]
			assert.Equal(t, begin.Cat, event.Cat)
			assert.Equal(t, begin.Name, event.Name)
			stacks[event.TID] = stack[:len(stack)-1]
		}
	}

	for tid, stack := range stacks {
		assert.Assert(t, len(stack) == 0, "thread %d has %d unterminated events", tid, len(stack))
	}
}
