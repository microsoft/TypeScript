package module_test

import (
	"strings"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

type resolutionHostStub struct {
	fs  vfs.FS
	cwd string
}

func (h *resolutionHostStub) FS() vfs.FS                  { return h.fs }
func (h *resolutionHostStub) GetCurrentDirectory() string { return h.cwd }

// Regression test for https://github.com/microsoft/typescript-go/issues/3526.
//
// Resolving a node_modules import with a trailing slash (e.g. `pkg/`) must
// produce the same result as without one.
func TestResolveModuleNameTrailingSlash(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{
		"/repo/node_modules/pkg/package.json": `{"name":"pkg","main":"main.js","types":"main.d.ts"}`,
		"/repo/node_modules/pkg/main.d.ts":    "export const x: number;",
		"/repo/node_modules/pkg/main.js":      "exports.x = 1;",
		"/repo/src/file.ts":                   "",
	}, true)
	host := &resolutionHostStub{fs: fs, cwd: "/repo"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, opts, "", "")

	for _, name := range []string{"pkg", "pkg/"} {
		r, _ := resolver.ResolveModuleName(name, "/repo/src/file.ts", core.ModuleKindESNext, nil)
		if !r.IsResolved() {
			t.Errorf("%q failed to resolve", name)
		}
	}
}

// blockingFS wraps a vfs.FS and forces FileExists calls for `targetPath` to
// block on `gate` until released. It also counts how many goroutines are
// waiting at the gate. This is used to deterministically reproduce the
// `package.json` info-cache insert race described in
// https://github.com/microsoft/typescript-go/issues/3526.
type blockingFS struct {
	vfs.FS
	targetPath string
	gate       chan struct{}
	waiting    atomic.Int32
}

func (f *blockingFS) FileExists(path string) bool {
	if path == f.targetPath {
		f.waiting.Add(1)
		<-f.gate
	}
	return f.FS.FileExists(path)
}

// Regression test for https://github.com/microsoft/typescript-go/issues/3526.
//
// Two goroutines resolve the same package via specifiers that differ only by
// a trailing slash (`pkg` and `pkg/`). A blocking FS holds both at the
// `FileExists` check for `package.json` — *after* each has confirmed a
// `package.json` info-cache miss but *before* either has called `Set`. When
// released, both proceed to `LoadOrStore` and one of them loses. Without the
// fix, the loser receives the winner's `InfoCacheEntry` whose
// `PackageDirectory` doesn't match its own `candidate` (because one spelling
// has a trailing slash and the other doesn't), and
// `loadNodeModuleFromDirectoryWorker`'s `ComparePaths` check skips loading
// the package's `main`/`types`. With no `index.*` present, resolution falls
// through to "unresolved" — the phantom TS2307 the issue describes. This
// test deterministically fails when the fix is reverted.
func TestResolveModuleNameTrailingSlashRace(t *testing.T) {
	t.Parallel()

	const pkgJSONPath = "/repo/node_modules/pkg/package.json"
	files := map[string]string{
		// `types` points at a file that is not discoverable through any
		// fallback path: there is no `index.*` and no `main`. The only way
		// to resolve `pkg` (or `pkg/`) is via the package.json `types` field
		// inside `loadNodeModuleFromDirectoryWorker`, which is exactly the
		// step that the bug skips when `candidate` and
		// `packageInfo.PackageDirectory` mismatch.
		pkgJSONPath: `{"name":"pkg","types":"./typings/index.d.ts"}`,
		"/repo/node_modules/pkg/typings/index.d.ts": "export const x: number;",
		// Distinct containing files so each `ResolveModuleName` call has a
		// unique module-resolution-cache key.
		"/repo/src/a/file.ts": "",
		"/repo/src/b/file.ts": "",
	}
	fs := &blockingFS{
		FS:         vfstest.FromMap(files, true),
		targetPath: pkgJSONPath,
		gate:       make(chan struct{}),
	}
	host := &resolutionHostStub{fs: fs, cwd: "/repo"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, opts, "", "")

	type result struct {
		name     string
		resolved bool
	}
	results := make(chan result, 2)
	var wg sync.WaitGroup
	for _, name := range []string{"pkg", "pkg/"} {
		containingFile := "/repo/src/a/file.ts"
		if strings.HasSuffix(name, "/") {
			containingFile = "/repo/src/b/file.ts"
		}
		wg.Go(func() {
			r, _ := resolver.ResolveModuleName(name, containingFile, core.ModuleKindESNext, nil)
			results <- result{name, r.IsResolved()}
		})
	}

	// Wait for both goroutines to reach the FileExists gate, guaranteeing
	// both have observed a package.json info-cache miss.
	deadline := time.Now().Add(5 * time.Second)
	for fs.waiting.Load() < 2 {
		if time.Now().After(deadline) {
			t.Fatalf("timed out waiting for both goroutines to reach FileExists gate; got %d", fs.waiting.Load())
		}
		time.Sleep(time.Millisecond)
	}
	close(fs.gate)

	wg.Wait()
	close(results)
	for r := range results {
		if !r.resolved {
			t.Errorf("%q failed to resolve", r.name)
		}
	}
}
