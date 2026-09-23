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

func assertShallowProjectWatches(t *testing.T, sys *TestSys) {
	t.Helper()
	dirs := sys.mockWatchBackend.Dirs
	assert.Assert(t, dirs["/app"] != nil, "the tsconfig directory /app must be watched")
	assert.Assert(t, dirs["/shared"] != nil, "the directory of the imported program file /shared/s.ts must be watched")
	// Failed lookups of "missing-package" reach /node_modules. They must not turn into a watch on /.
	assert.Assert(t, dirs["/"] == nil, "/ must never be watched")
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
