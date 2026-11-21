package tsctests

import (
	"context"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

// sendDelete removes path from the virtual FS and delivers the corresponding
// delete event to the watcher, mirroring what a real filesystem watcher reports.
func sendDelete(t *testing.T, sys *TestSys, w interface{ DoCycle(ctx context.Context) }, path string) {
	t.Helper()
	sys.removeNoError(path)
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventDelete, Path: path}})
	w.DoCycle(t.Context())
}

func fileExists(sys *TestSys, path string) bool {
	return sys.fsFromFileMap().FileExists(tspath.RootedFilePathFromNormalized(path))
}

// TestWatchDeletesOutputsOfDeletedSource is the regression test for
// https://github.com/microsoft/TypeScript/issues/16057: when a source file is
// deleted while running `tsc --watch`, the outputs that were emitted for it
// must be removed from the output directory instead of being left behind.
func TestWatchDeletesOutputsOfDeletedSource(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{
				"compilerOptions": {
					"outDir": "out",
					"declaration": true,
					"declarationMap": true,
					"sourceMap": true,
					"incremental": true,
					"tsBuildInfoFile": "./tsconfig.tsbuildinfo",
					"noLib": true
				},
				"include": ["**/*"]
			}`,
			"/app/index.ts": `import { a } from "./a"; import { b } from "./b"; export const main = a + b;`,
			"/app/a.ts":     `export const a = 1;`,
			"/app/b.ts":     `export const b = 2;`,
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)

	for _, path := range []string{
		"/app/out/index.js", "/app/out/index.d.ts", "/app/out/index.js.map", "/app/out/index.d.ts.map",
		"/app/out/a.js", "/app/out/a.d.ts", "/app/out/a.js.map", "/app/out/a.d.ts.map",
		"/app/out/b.js", "/app/out/b.d.ts", "/app/out/b.js.map", "/app/out/b.d.ts.map",
		"/app/tsconfig.tsbuildinfo",
	} {
		assert.Assert(t, fileExists(sys, path), "expected initial output %s", path)
	}

	sendDelete(t, sys, w, "/app/a.ts")

	for _, path := range []string{
		"/app/out/a.js", "/app/out/a.d.ts", "/app/out/a.js.map", "/app/out/a.d.ts.map",
	} {
		assert.Assert(t, !fileExists(sys, path), "stale output %s must be deleted when its source is deleted", path)
	}
	// Outputs of surviving sources and the build info must be kept.
	for _, path := range []string{
		"/app/out/index.js", "/app/out/index.d.ts", "/app/out/index.js.map", "/app/out/index.d.ts.map",
		"/app/out/b.js", "/app/out/b.d.ts", "/app/out/b.js.map", "/app/out/b.d.ts.map",
		"/app/tsconfig.tsbuildinfo",
	} {
		assert.Assert(t, fileExists(sys, path), "output %s of a surviving source must be kept", path)
	}
	// The remaining program must still compile without the deleted module.
	assert.Assert(t, !strings.Contains(sys.getOutput(false), "TS2307"), "unexpected module resolution error:\n%s", sys.getOutput(false))
}

// TestWatchDeletesOutputsOfDeletedSourceWithoutOutDir covers the layout where
// outputs sit next to their sources (no outDir): deleting b.ts must delete
// b.js/b.d.ts but keep a.js.
func TestWatchDeletesOutputsOfDeletedSourceWithoutOutDir(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{"compilerOptions":{"declaration":true,"noLib":true},"include":["**/*"]}`,
			"/app/a.ts":          `export const a = 1;`,
			"/app/b.ts":          `export const b = 2;`,
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	assert.Assert(t, fileExists(sys, "/app/a.js"))
	assert.Assert(t, fileExists(sys, "/app/b.js"))
	assert.Assert(t, fileExists(sys, "/app/b.d.ts"))

	sendDelete(t, sys, w, "/app/b.ts")

	assert.Assert(t, !fileExists(sys, "/app/b.js"), "b.js must be deleted with b.ts")
	assert.Assert(t, !fileExists(sys, "/app/b.d.ts"), "b.d.ts must be deleted with b.ts")
	assert.Assert(t, fileExists(sys, "/app/a.js"), "a.js must be kept")
	assert.Assert(t, fileExists(sys, "/app/a.d.ts"), "a.d.ts must be kept")
}

// TestWatchDeleteSourceKeepsOutputThatIsAlsoAnInput ensures the cleanup never
// deletes a file that is an input of the project: when a.js is listed
// explicitly in "files", the emit of a.ts's output is rejected with TS5055
// (cannot overwrite an input), so a.js is never tracked as an output and must
// survive the deletion of a.ts with its original content.
func TestWatchDeleteSourceKeepsOutputThatIsAlsoAnInput(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{"compilerOptions":{"allowJs":true,"noLib":true},"files":["a.ts","a.js"]}`,
			"/app/a.ts":          `export const a = 1;`,
			"/app/a.js":          `export const supplied = 1;`,
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	assert.Assert(t, strings.Contains(sys.getOutput(false), "TS5055"),
		"emitting over an input file must be rejected:\n%s", sys.getOutput(false))
	assert.Assert(t, fileExists(sys, "/app/a.js"))
	assert.Equal(t, sys.readFileNoError("/app/a.js"), `export const supplied = 1;`)

	sendDelete(t, sys, w, "/app/a.ts")

	assert.Assert(t, fileExists(sys, "/app/a.js"),
		"a.js is still an input of the project and must not be deleted when a.ts is removed")
	assert.Equal(t, sys.readFileNoError("/app/a.js"), `export const supplied = 1;`)
}

// TestWatchDeleteSourceListedInFilesArray covers a source that is enumerated
// explicitly via "files" (not a wildcard): its outputs must be cleaned too.
func TestWatchDeleteSourceListedInFilesArray(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{"compilerOptions":{"outDir":"out","noLib":true},"files":["main.ts","gone.ts"]}`,
			"/app/main.ts":       `export const main = 1;`,
			"/app/gone.ts":       `export const gone = 2;`,
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	assert.Assert(t, fileExists(sys, "/app/out/main.js"))
	assert.Assert(t, fileExists(sys, "/app/out/gone.js"))

	sendDelete(t, sys, w, "/app/gone.ts")

	assert.Assert(t, !fileExists(sys, "/app/out/gone.js"), "out/gone.js must be deleted with gone.ts")
	assert.Assert(t, fileExists(sys, "/app/out/main.js"), "out/main.js must be kept")
}

// TestWatchDeleteSourceWithOutputAlreadyGone verifies the cleanup does not
// crash or report errors when the output file has already been removed by the
// user before the watch cycle runs.
func TestWatchDeleteSourceWithOutputAlreadyGone(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{"compilerOptions":{"outDir":"out","noLib":true},"include":["**/*"]}`,
			"/app/main.ts":       `export const main = 1;`,
			"/app/gone.ts":       `export const gone = 2;`,
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	assert.Assert(t, fileExists(sys, "/app/out/gone.js"))

	sys.removeNoError("/app/gone.ts")
	sys.removeNoError("/app/out/gone.js")
	sys.mockWatchBackend.SendEvents([]fswatch.Event{
		{Kind: fswatch.EventDelete, Path: "/app/gone.ts"},
		{Kind: fswatch.EventDelete, Path: "/app/out/gone.js"},
	})
	w.DoCycle(t.Context())

	assert.Assert(t, !fileExists(sys, "/app/out/gone.js"))
	assert.Assert(t, fileExists(sys, "/app/out/main.js"))
	assert.Assert(t, !strings.Contains(sys.getOutput(false), "TS6053") && !strings.Contains(sys.getOutput(false), "Failed to delete"),
		"no delete-failure diagnostic expected:\n%s", sys.getOutput(false))
}

// TestWatchDeleteThenRecreateSource cleans the stale outputs on deletion and
// emits fresh outputs when the source comes back.
func TestWatchDeleteThenRecreateSource(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{"compilerOptions":{"outDir":"out","noLib":true},"include":["**/*"]}`,
			"/app/main.ts":       `export const main = 1;`,
			"/app/temp.ts":       `export const temp = 1;`,
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	assert.Assert(t, fileExists(sys, "/app/out/temp.js"))

	sendDelete(t, sys, w, "/app/temp.ts")
	assert.Assert(t, !fileExists(sys, "/app/out/temp.js"), "stale out/temp.js must be deleted")

	sys.writeFileNoError("/app/temp.ts", `export const temp = 2;`)
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/temp.ts"}})
	w.DoCycle(t.Context())
	assert.Assert(t, fileExists(sys, "/app/out/temp.js"), "out/temp.js must be re-emitted after recreation")
	assert.Assert(t, strings.Contains(sys.readFileNoError("/app/out/temp.js"), "temp = 2"))
}

// TestWatchDeleteMovedSourceCleansOldOutputs covers a rename: deleting the old
// path must remove its outputs while the new location gets fresh ones.
func TestWatchDeleteMovedSourceCleansOldOutputs(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{"compilerOptions":{"outDir":"out","noLib":true},"include":["**/*"]}`,
			"/app/main.ts":       `import { v } from "./old"; export const main = v;`,
			"/app/old.ts":        `export const v = 1;`,
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	assert.Assert(t, fileExists(sys, "/app/out/old.js"))
	assert.Assert(t, fileExists(sys, "/app/out/main.js"))

	sys.removeNoError("/app/old.ts")
	sys.writeFileNoError("/app/new.ts", `export const v = 2;`)
	sys.writeFileNoError("/app/main.ts", `import { v } from "./new"; export const main = v;`)
	sys.mockWatchBackend.SendEvents([]fswatch.Event{
		{Kind: fswatch.EventDelete, Path: "/app/old.ts"},
		{Kind: fswatch.EventUpdate, Path: "/app/new.ts"},
		{Kind: fswatch.EventUpdate, Path: "/app/main.ts"},
	})
	w.DoCycle(t.Context())

	assert.Assert(t, !fileExists(sys, "/app/out/old.js"), "out/old.js must be deleted after the move")
	assert.Assert(t, fileExists(sys, "/app/out/new.js"), "out/new.js must be emitted")
	assert.Assert(t, strings.Contains(sys.readFileNoError("/app/out/main.js"), `"./new"`), "main.js must be rebuilt:\n%s", sys.readFileNoError("/app/out/main.js"))
}
