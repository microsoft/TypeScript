package tsctests

import (
	"context"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"gotest.tools/v3/assert"
)

// shallowProjectFiles is a project close to the filesystem root (a common Docker WORKDIR) that imports a file from a
// sibling directory which is not part of "include", plus a bare import whose failed lookups walk up to /node_modules.
func shallowProjectFiles(compilerOptions string) FileMap {
	return FileMap{
		"/app/tsconfig.json": `{"compilerOptions":{` + compilerOptions + `"rootDir":"..","outDir":"out","noLib":true},"include":["*.ts"]}`,
		"/app/index.ts": `import { s } from "../shared/s";
// @ts-ignore
import "missing-package";
export const x = s;`,
		"/shared/s.ts": `export const s = 1;`,
	}
}

// isWatched reports whether dir has an open watch. The mock keeps closed watches in Dirs, so a nil check is not enough.
func isWatched(sys *TestSys, dir string) bool {
	w := sys.mockWatchBackend.Dirs[dir]
	return w != nil && !w.Closed
}

func assertShallowProjectWatches(t *testing.T, sys *TestSys) {
	t.Helper()
	assert.Assert(t, isWatched(sys, "/app"), "the tsconfig directory /app must be watched")
	assert.Assert(t, isWatched(sys, "/shared"), "the directory of the imported program file /shared/s.ts must be watched")
	// Failed lookups of "missing-package" reach /node_modules. They must not turn into a watch on /.
	assert.Assert(t, !isWatched(sys, "/"), "/ must never be watched")
}

func editShallowProjectFiles(t *testing.T, sys *TestSys, w interface{ DoCycle() }) {
	t.Helper()
	fs := sys.fsFromFileMap()

	sys.writeFileNoError("/shared/s.ts", `export const s = 2;`)
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/shared/s.ts"}})
	w.DoCycle()
	out, _ := fs.ReadFile("/app/out/shared/s.js")
	assert.Assert(t, strings.Contains(out, "s = 2"), "editing /shared/s.ts must rebuild, got:\n%s", out)

	sys.writeFileNoError("/app/index.ts", `import { s } from "../shared/s"; export const y = s;`)
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/index.ts"}})
	w.DoCycle()
	out, _ = fs.ReadFile("/app/out/app/index.js")
	assert.Assert(t, strings.Contains(out, "y = "), "editing /app/index.ts must rebuild, got:\n%s", out)
}

// TestWatchShallowProjectWithImportedFile verifies that tsc --watch rebuilds a project that lives close to the
// filesystem root, both for its own files and for a file it imports from outside "include".
func TestWatchShallowProjectWithImportedFile(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{files: shallowProjectFiles(""), cwd: "/app"}, false)
	result := execute.CommandLine(context.Background(), sys, []string{"--watch"}, sys)
	assert.Assert(t, result.Watcher != nil)

	assertShallowProjectWatches(t, sys)
	editShallowProjectFiles(t, sys, result.Watcher)
}

// TestBuildWatchShallowProjectWithImportedFile is the tsc -b --watch variant of
// TestWatchShallowProjectWithImportedFile.
func TestBuildWatchShallowProjectWithImportedFile(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{files: shallowProjectFiles(`"composite":true,`), cwd: "/app"}, false)
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()
	result := execute.CommandLine(ctx, sys, []string{"--build", "--watch"}, sys)
	assert.Assert(t, result.Watcher != nil)

	assertShallowProjectWatches(t, sys)
	editShallowProjectFiles(t, sys, result.Watcher)
}

// shallowRootFileProjectFiles is a project in /app whose "files" list a root file in the sibling directory /shared.
func shallowRootFileProjectFiles(compilerOptions string) FileMap {
	return FileMap{
		"/app/tsconfig.json": `{"compilerOptions":{` + compilerOptions + `"rootDir":"..","outDir":"out","noLib":true},"files":["index.ts","../shared/root.ts"]}`,
		"/app/index.ts":      `export const x = 1;`,
		"/shared/root.ts":    `export const r = 1;`,
	}
}

// deleteAndRecreateShallowRootFile deletes /shared/root.ts and writes it back. While the file is missing it is not
// part of the program, but it is still a root file, so /shared must stay watched for the rebuild on recreation.
func deleteAndRecreateShallowRootFile(t *testing.T, sys *TestSys, w interface{ DoCycle() }) {
	t.Helper()
	fs := sys.fsFromFileMap()
	assert.Assert(t, isWatched(sys, "/shared"), "the directory of the root file /shared/root.ts must be watched")

	sys.removeNoError("/shared/root.ts")
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventDelete, Path: "/shared/root.ts"}})
	w.DoCycle()
	assert.Assert(t, isWatched(sys, "/shared"), "/shared must stay watched while the root file /shared/root.ts is missing")
	assert.Assert(t, !isWatched(sys, "/"), "/ must never be watched")

	sys.writeFileNoError("/shared/root.ts", `export const r = 2;`)
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/shared/root.ts"}})
	w.DoCycle()
	out, _ := fs.ReadFile("/app/out/shared/root.js")
	assert.Assert(t, strings.Contains(out, "r = 2"), "recreating /shared/root.ts must rebuild, got:\n%s", out)
}

// TestWatchShallowProjectRecreatedRootFile verifies that tsc --watch rebuilds when a root file near the filesystem
// root is deleted and created again.
func TestWatchShallowProjectRecreatedRootFile(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{files: shallowRootFileProjectFiles(""), cwd: "/app"}, false)
	result := execute.CommandLine(context.Background(), sys, []string{"--watch"}, sys)
	assert.Assert(t, result.Watcher != nil)

	deleteAndRecreateShallowRootFile(t, sys, result.Watcher)
}

// TestBuildWatchShallowProjectRecreatedRootFile is the tsc -b --watch variant of
// TestWatchShallowProjectRecreatedRootFile.
func TestBuildWatchShallowProjectRecreatedRootFile(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{files: shallowRootFileProjectFiles(`"composite":true,`), cwd: "/app"}, false)
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()
	result := execute.CommandLine(ctx, sys, []string{"--build", "--watch"}, sys)
	assert.Assert(t, result.Watcher != nil)

	deleteAndRecreateShallowRootFile(t, sys, result.Watcher)
}
