package tsctests

import (
	"context"
	"fmt"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/microsoft/typescript-go/internal/execute"
	"github.com/microsoft/typescript-go/internal/execute/tsc"
	"github.com/microsoft/typescript-go/internal/fswatch"
	"gotest.tools/v3/assert"
)

// createTestWatcher sets up a minimal project with a tsconfig and
// returns a Watcher ready for concurrent testing, plus the TestSys
// for file manipulation.
func createTestWatcher(t *testing.T) (*execute.Watcher, *TestSys) {
	t.Helper()
	input := &tscInput{
		files: FileMap{
			"/home/src/workspaces/project/a.ts":          `const a: number = 1;`,
			"/home/src/workspaces/project/b.ts":          `import { a } from "./a"; export const b = a;`,
			"/home/src/workspaces/project/tsconfig.json": `{}`,
		},
		commandLineArgs: []string{"--watch"},
	}
	sys := newTestSys(input, false)
	result := execute.CommandLine(context.Background(), sys, []string{"--watch"}, sys)
	if result.Watcher == nil {
		t.Fatal("expected Watcher to be non-nil in watch mode")
	}
	w, ok := result.Watcher.(*execute.Watcher)
	if !ok {
		t.Fatalf("expected *execute.Watcher, got %T", result.Watcher)
	}
	return w, sys
}

// TestWatcherConcurrentDoCycle calls DoCycle from multiple goroutines
// while modifying source files, exposing data races on Watcher fields
// such as configModified, program, config, and the underlying
// FileWatcher state. Run with -race to detect.
func TestWatcherConcurrentDoCycle(t *testing.T) {
	t.Parallel()
	w, sys := createTestWatcher(t)

	var wg sync.WaitGroup

	for i := range 8 {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			for j := range 10 {
				_ = sys.fsFromFileMap().WriteFile(
					"/home/src/workspaces/project/a.ts",
					fmt.Sprintf("const a: number = %d;", i*10+j),
				)
				w.DoCycle()
			}
		}(i)
	}

	wg.Wait()
}

// TestWatcherDoCycleWithConcurrentStateReads calls DoCycle from
// multiple goroutines, some modifying files and some not, to test
// concurrent access to all Watcher and FileWatcher state.
func TestWatcherDoCycleWithConcurrentStateReads(t *testing.T) {
	t.Parallel()
	w, sys := createTestWatcher(t)

	var wg sync.WaitGroup

	// DoCycle goroutines
	for i := range 4 {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			for j := range 15 {
				_ = sys.fsFromFileMap().WriteFile(
					"/home/src/workspaces/project/a.ts",
					fmt.Sprintf("const a: number = %d;", i*15+j),
				)
				w.DoCycle()
			}
		}(i)
	}

	// State reader goroutines
	for range 8 {
		wg.Go(func() {
			for range 50 {
				w.DoCycle()
				w.DoCycle()
				w.DoCycle()
				w.DoCycle()
			}
		})
	}

	wg.Wait()
}

// TestWatcherConcurrentFileChangesAndDoCycle creates, modifies, and
// deletes files from multiple goroutines while DoCycle runs, testing
// races between FS mutations and watch state updates.
func TestWatcherConcurrentFileChangesAndDoCycle(t *testing.T) {
	t.Parallel()
	w, sys := createTestWatcher(t)

	var wg sync.WaitGroup

	// File creators
	for i := range 4 {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			for j := range 20 {
				path := fmt.Sprintf("/home/src/workspaces/project/gen_%d_%d.ts", i, j)
				_ = sys.fsFromFileMap().WriteFile(path, fmt.Sprintf("export const x%d_%d = %d;", i, j, j))
			}
		}(i)
	}

	// File deleters
	wg.Go(func() {
		for j := range 20 {
			_ = sys.fsFromFileMap().Remove(
				fmt.Sprintf("/home/src/workspaces/project/gen_0_%d.ts", j),
			)
		}
	})

	// DoCycle callers
	for range 4 {
		wg.Go(func() {
			for range 10 {
				w.DoCycle()
			}
		})
	}

	wg.Wait()
}

// TestWatcherRapidConfigChanges modifies tsconfig.json rapidly from
// multiple goroutines while DoCycle runs, testing races on
// config-related fields (configModified, configHasErrors,
// configFilePaths, config, extendedConfigCache).
func TestWatcherRapidConfigChanges(t *testing.T) {
	t.Parallel()
	w, sys := createTestWatcher(t)

	var wg sync.WaitGroup

	configs := []string{
		`{}`,
		`{"compilerOptions": {"strict": true}}`,
		`{"compilerOptions": {"target": "ES2020"}}`,
		`{"compilerOptions": {"noEmit": true}}`,
	}

	// Config modifiers + DoCycle
	for i := range 3 {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			for j := range 10 {
				_ = sys.fsFromFileMap().WriteFile(
					"/home/src/workspaces/project/tsconfig.json",
					configs[(i+j)%len(configs)],
				)
				w.DoCycle()
			}
		}(i)
	}

	// Concurrent source file modifications
	for i := range 2 {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			for j := range 15 {
				_ = sys.fsFromFileMap().WriteFile(
					"/home/src/workspaces/project/a.ts",
					fmt.Sprintf("const a: number = %d;", i*15+j),
				)
				w.DoCycle()
			}
		}(i)
	}

	// State readers
	for range 4 {
		wg.Go(func() {
			for range 30 {
				w.DoCycle()
				w.DoCycle()
			}
		})
	}

	wg.Wait()
}

// TestWatcherConcurrentDoCycleNoChanges calls DoCycle from many
// goroutines when no files have changed, testing the early-return
// path where WatchState is read and HasChanges is called.
func TestWatcherConcurrentDoCycleNoChanges(t *testing.T) {
	t.Parallel()
	w, _ := createTestWatcher(t)

	var wg sync.WaitGroup

	for range 16 {
		wg.Go(func() {
			for range 50 {
				w.DoCycle()
			}
		})
	}

	wg.Wait()
}

// TestWatcherAlternatingModifyAndDoCycle alternates between modifying
// a file and calling DoCycle from different goroutines, creating a
// realistic scenario where the file watcher detects changes mid-cycle.
func TestWatcherAlternatingModifyAndDoCycle(t *testing.T) {
	t.Parallel()
	w, sys := createTestWatcher(t)

	var wg sync.WaitGroup

	// Writer goroutine: continuously modifies files
	wg.Go(func() {
		for j := range 100 {
			_ = sys.fsFromFileMap().WriteFile(
				"/home/src/workspaces/project/a.ts",
				fmt.Sprintf("const a: number = %d;", j),
			)
		}
	})

	// Multiple DoCycle goroutines
	for range 4 {
		wg.Go(func() {
			for range 25 {
				w.DoCycle()
			}
		})
	}

	// State reader goroutines
	for range 4 {
		wg.Go(func() {
			for range 100 {
				w.DoCycle()
			}
		})
	}

	wg.Wait()
}

func TestBuildWatchStopsWhenContextIsCancelled(t *testing.T) {
	t.Parallel()

	sys := newTestSys(&tscInput{
		files: FileMap{
			"/home/src/workspaces/project/tsconfig.json": `{"compilerOptions":{"composite":true},"files":["index.ts"]}`,
			"/home/src/workspaces/project/index.ts":      `export const x = 1;`,
		},
	}, false)
	ctx, cancel := context.WithCancel(context.Background())
	cancel()

	resultCh := make(chan tsc.CommandLineResult, 1)
	go func() {
		resultCh <- execute.CommandLine(ctx, sys, []string{"--build", "--watch", "--watchInterval", "60000"}, sys)
	}()

	select {
	case result := <-resultCh:
		assert.Equal(t, result.Status, tsc.ExitStatusSuccess)
		assert.Assert(t, result.Watcher != nil)
	case <-time.After(2 * time.Second):
		t.Fatal("build watch did not stop after context cancellation")
	}
}

func TestWatcherStartsFromExistingBuildInfo(t *testing.T) {
	t.Parallel()
	input := &tscInput{
		files: FileMap{
			"/home/src/workspaces/project/index.ts":      `export const x: number = 1;`,
			"/home/src/workspaces/project/tsconfig.json": `{"compilerOptions":{"composite":true},"files":["index.ts"]}`,
		},
	}
	sys := newTestSys(input, false)

	result := execute.CommandLine(context.Background(), sys, []string{"-p", "tsconfig.json", "--pretty", "false"}, sys)
	assert.Equal(t, result.Status, tsc.ExitStatusSuccess)
	assert.Assert(t, sys.fsFromFileMap().FileExists("/home/src/workspaces/project/tsconfig.tsbuildinfo"))

	sys.clearOutput()
	defer func() {
		if r := recover(); r != nil {
			t.Fatalf("watch startup with existing build info panicked: %v", r)
		}
	}()
	result = execute.CommandLine(context.Background(), sys, []string{"--watch", "--noEmit", "--pretty", "false"}, sys)
	assert.Equal(t, result.Status, tsc.ExitStatusSuccess)
	assert.Assert(t, result.Watcher != nil)
}

func TestWatcherRebuildsWhenJsxImportSourcePragmaChanges(t *testing.T) {
	t.Parallel()
	input := &tscInput{
		files: FileMap{
			"/home/src/workspaces/project/index.tsx": `/** @jsxImportSource foo */
export const x = <div />;`,
			"/home/src/workspaces/project/tsconfig.json": `{
				"compilerOptions":{"jsx":"react-jsx","module":"esnext","moduleResolution":"bundler","noEmit":true},
				"files":["index.tsx"]
			}`,
		},
		commandLineArgs: []string{"--watch"},
	}
	sys := newTestSys(input, false)
	result := execute.CommandLine(context.Background(), sys, []string{"--watch", "--pretty", "false"}, sys)
	if result.Watcher == nil {
		t.Fatal("expected Watcher to be non-nil in watch mode")
	}
	w := result.Watcher.(*execute.Watcher)

	sys.currentWrite.Reset()
	_ = sys.fsFromFileMap().WriteFile("/home/src/workspaces/project/index.tsx", `/** @jsxImportSource bar */
export const x = <div />;`)
	sys.mockWatchBackend.SendEvents([]fswatch.Event{
		{Kind: fswatch.EventUpdate, Path: "/home/src/workspaces/project/index.tsx"},
	})
	w.DoCycle()

	out := sys.currentWrite.String()
	assert.Assert(t, strings.Contains(out, "bar/jsx-runtime"), "expected updated JSX runtime diagnostic, got: %s", out)
	assert.Assert(t, !strings.Contains(out, "foo/jsx-runtime"), "expected stale JSX runtime diagnostic to be gone, got: %s", out)
}

// TestWatcherUpdateProgramFastPath verifies that the UpdateProgram optimization
// produces correct compilation results for body-only edits (fast path) and
// correctly falls back to full NewProgram when the set of imported modules
// changes. The build path taken is asserted via FastPathBuilds/FullBuilds so a
// regression that stops using (or stops falling back from) the fast path is
// caught, not just a diagnostics difference.
func TestWatcherUpdateProgramFastPath(t *testing.T) {
	t.Parallel()

	input := &tscInput{
		files: FileMap{
			"/home/src/workspaces/project/a.ts":          `export const a: number = 1;`,
			"/home/src/workspaces/project/b.ts":          `import { a } from "./a"; export const b = a;`,
			"/home/src/workspaces/project/c.ts":          `export const c: number = 10;`,
			"/home/src/workspaces/project/tsconfig.json": `{}`,
		},
		commandLineArgs: []string{"--watch"},
	}
	sys := newTestSys(input, false)
	result := execute.CommandLine(context.Background(), sys, []string{"--watch"}, sys)
	if result.Watcher == nil {
		t.Fatal("expected Watcher to be non-nil in watch mode")
	}
	w := result.Watcher.(*execute.Watcher)

	// Helper to write a file, send the event, cycle, and return output
	editAndCycle := func(path, content string) string {
		sys.currentWrite.Reset()
		_ = sys.fsFromFileMap().WriteFile(path, content)
		sys.mockWatchBackend.SendEvents([]fswatch.Event{
			{Kind: fswatch.EventUpdate, Path: path},
		})
		w.DoCycle()
		return sys.currentWrite.String()
	}

	// Body-only edit — should use UpdateProgram fast path, no errors
	fast, full := w.FastPathBuilds(), w.FullBuilds()
	out := editAndCycle("/home/src/workspaces/project/a.ts", `export const a: number = 2;`)
	assert.Assert(t, strings.Contains(out, "Found 0 errors"), "expected 0 errors after body edit, got: %s", out)
	assert.Equal(t, w.FastPathBuilds(), fast+1, "body-only edit should take the UpdateProgram fast path")
	assert.Equal(t, w.FullBuilds(), full, "body-only edit should not trigger a full rebuild")

	// Introduce a type error via body-only edit — fast path should detect it
	fast, full = w.FastPathBuilds(), w.FullBuilds()
	out = editAndCycle("/home/src/workspaces/project/a.ts", `export const a: number = "not a number";`)
	assert.Assert(t, !strings.Contains(out, "Found 0 errors"), "expected errors after type error, got: %s", out)
	assert.Equal(t, w.FastPathBuilds(), fast+1, "type error via body edit should still take the fast path")
	assert.Equal(t, w.FullBuilds(), full, "type error via body edit should not trigger a full rebuild")

	// Fix the type error — fast path should clear it
	out = editAndCycle("/home/src/workspaces/project/a.ts", `export const a: number = 3;`)
	assert.Assert(t, strings.Contains(out, "Found 0 errors"), "expected 0 errors after fix, got: %s", out)

	// Change b.ts's imported module (./a -> ./c). The set of imported module
	// specifiers changes, so the file cannot be replaced in place and the build
	// must fall back to a full NewProgram rebuild.
	fast, full = w.FastPathBuilds(), w.FullBuilds()
	out = editAndCycle("/home/src/workspaces/project/b.ts", `import { c } from "./c"; export const b = c;`)
	assert.Assert(t, strings.Contains(out, "Found 0 errors"), "expected 0 errors after import change, got: %s", out)
	assert.Equal(t, w.FullBuilds(), full+1, "changing the imported module should fall back to a full NewProgram rebuild")
	assert.Equal(t, w.FastPathBuilds(), fast, "changing the imported module should not take the fast path")

	// Body edit after import change — should use fast path again, no errors
	fast, full = w.FastPathBuilds(), w.FullBuilds()
	out = editAndCycle("/home/src/workspaces/project/b.ts", `import { c } from "./c"; export const b = c + 1;`)
	assert.Assert(t, strings.Contains(out, "Found 0 errors"), "expected 0 errors after body edit post-import-change, got: %s", out)
	assert.Equal(t, w.FastPathBuilds(), fast+1, "body edit after an import change should take the fast path again")
	assert.Equal(t, w.FullBuilds(), full, "body edit after an import change should not trigger a full rebuild")
}

// TestWatcherOverflowForcesFullRebuild verifies that an event-queue overflow
// forces a full NewProgram rebuild rather than reusing the existing program via
// the single-file UpdateProgram fast path. For a single-file program with an
// unresolved import, clearing the source-file cache on overflow leaves exactly
// one cache miss, which the fast path would misread as a lone content edit and
// reuse the stale (unresolved) program, never discovering a dependency created
// while events were dropped. Program membership is observed via the emitted
// output for the dependency.
func TestWatcherOverflowForcesFullRebuild(t *testing.T) {
	t.Parallel()

	input := &tscInput{
		files: FileMap{
			"/home/src/workspaces/project/index.ts": `import { dep } from "./dep"; export const x = dep;`,
			"/home/src/workspaces/project/tsconfig.json": `{
				"compilerOptions":{"noLib":true,"moduleResolution":"bundler","module":"esnext","outDir":"out"},
				"files":["index.ts"]
			}`,
		},
		commandLineArgs: []string{"--watch"},
	}
	sys := newTestSys(input, false)
	result := execute.CommandLine(context.Background(), sys, []string{"--watch", "--pretty", "false"}, sys)
	if result.Watcher == nil {
		t.Fatal("expected Watcher to be non-nil in watch mode")
	}
	w := result.Watcher.(*execute.Watcher)
	fs := sys.fsFromFileMap()

	// The import is initially unresolved, so the dependency is not part of the
	// program and produces no emitted output.
	assert.Assert(t, !fs.FileExists("/home/src/workspaces/project/out/dep.js"),
		"dep.js should not exist while ./dep is unresolved")

	// Create the missing dependency, but deliver an overflow instead of a
	// precise event (as if the create event were dropped by the kernel queue).
	_ = fs.WriteFile("/home/src/workspaces/project/dep.ts", `export const dep: number = 1;`)
	full := w.FullBuilds()
	sys.mockWatchBackend.SendOverflow()
	w.DoCycle()

	assert.Equal(t, w.FullBuilds(), full+1, "overflow must force a full rebuild, not the single-file fast path")
	assert.Assert(t, fs.FileExists("/home/src/workspaces/project/out/dep.js"),
		"overflow rebuild should rediscover the created dependency and emit dep.js")
}

// TestWatcherNonSourceDependencyForcesFullRebuild verifies that when a
// non-source build dependency changes in the same cycle as a source edit, the
// single-file fast path is rejected. A previously-missing module path is
// tracked in seenFiles (via failed resolution) but is never stored in the
// source-file cache, so counting source-cache misses alone would report a lone
// changed file and reuse stale module resolutions.
func TestWatcherNonSourceDependencyForcesFullRebuild(t *testing.T) {
	t.Parallel()

	input := &tscInput{
		files: FileMap{
			"/home/src/workspaces/project/index.ts": `import { dep } from "./dep"; export const x = dep;`,
			"/home/src/workspaces/project/tsconfig.json": `{
				"compilerOptions":{"noLib":true,"moduleResolution":"bundler","module":"esnext","outDir":"out"},
				"files":["index.ts"]
			}`,
		},
		commandLineArgs: []string{"--watch"},
	}
	sys := newTestSys(input, false)
	result := execute.CommandLine(context.Background(), sys, []string{"--watch", "--pretty", "false"}, sys)
	if result.Watcher == nil {
		t.Fatal("expected Watcher to be non-nil in watch mode")
	}
	w := result.Watcher.(*execute.Watcher)
	fs := sys.fsFromFileMap()

	// "./dep" is unresolved initially; the failed resolution probes dep.ts,
	// recording it as a (missing) non-source dependency in seenFiles.
	assert.Assert(t, !fs.FileExists("/home/src/workspaces/project/out/dep.js"),
		"dep.js should not exist while ./dep is unresolved")

	// In a single cycle, edit index.ts's body (a lone source-cache miss) and
	// create the previously-missing dependency. The batched dependency change
	// must reject the fast path so the new module resolution is discovered.
	_ = fs.WriteFile("/home/src/workspaces/project/index.ts",
		`import { dep } from "./dep"; export const x = dep + 0;`)
	_ = fs.WriteFile("/home/src/workspaces/project/dep.ts", `export const dep: number = 1;`)
	full := w.FullBuilds()
	sys.mockWatchBackend.SendEvents([]fswatch.Event{
		{Kind: fswatch.EventUpdate, Path: "/home/src/workspaces/project/index.ts"},
		{Kind: fswatch.EventUpdate, Path: "/home/src/workspaces/project/dep.ts"},
	})
	w.DoCycle()

	assert.Equal(t, w.FullBuilds(), full+1,
		"a changed non-source dependency must force a full rebuild, not the fast path")
	assert.Assert(t, fs.FileExists("/home/src/workspaces/project/out/dep.js"),
		"full rebuild should resolve the created dependency and emit dep.js")
}
