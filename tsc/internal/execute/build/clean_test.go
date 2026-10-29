package build_test

import (
	"context"
	"io"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/execute/build"
	"github.com/microsoft/TypeScript/tsc/internal/execute/tsc"
	"github.com/microsoft/TypeScript/tsc/internal/execute/tsctests"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"gotest.tools/v3/assert"
)

func TestClean(t *testing.T) {
	t.Parallel()

	t.Run("cleans selected project and references", func(t *testing.T) {
		t.Parallel()
		sys := newCleanTestSystem()
		orchestrator := newCleanTestOrchestrator(sys, "a", "c")

		result := orchestrator.Clean(t.Context(), "a")
		assert.Equal(t, result.Result.Status, tsc.ExitStatusSuccess)
		assert.Equal(t, result.Statistics.Projects, 2)
		assert.Assert(t, !sys.FS().FileExists("/project/a/dist/index.js"))
		assert.Assert(t, !sys.FS().FileExists("/project/b/dist/index.js"))
		assert.Assert(t, sys.FS().FileExists("/project/c/dist/index.js"))
	})

	t.Run("dry run preserves outputs", func(t *testing.T) {
		t.Parallel()
		sys := newCleanTestSystem()
		orchestrator := newCleanTestOrchestrator(sys, "--dry", "a")

		result := orchestrator.Clean(t.Context(), "a")
		assert.Equal(t, result.Result.Status, tsc.ExitStatusSuccess)
		assert.Equal(t, result.Statistics.Projects, 2)
		assert.Assert(t, len(result.FilesToDelete) > 0)
		assert.Assert(t, sys.FS().FileExists("/project/a/dist/index.js"))
		assert.Assert(t, sys.FS().FileExists("/project/b/dist/index.js"))
	})

	t.Run("rejects project outside build", func(t *testing.T) {
		t.Parallel()
		sys := newCleanTestSystem()
		orchestrator := newCleanTestOrchestrator(sys, "a")

		result := orchestrator.Clean(t.Context(), "c")
		assert.Equal(t, result.Result.Status, tsc.ExitStatusInvalidProject_OutputsSkipped)
		assert.Assert(t, sys.FS().FileExists("/project/a/dist/index.js"))
		assert.Assert(t, sys.FS().FileExists("/project/b/dist/index.js"))
		assert.Assert(t, sys.FS().FileExists("/project/c/dist/index.js"))
	})

	t.Run("rejects circular build", func(t *testing.T) {
		t.Parallel()
		sys := newCleanTestSystem()
		orchestrator := newCleanTestOrchestrator(sys, "cycle1")

		result := orchestrator.Clean(t.Context(), "cycle1")
		assert.Equal(t, result.Result.Status, tsc.ExitStatusProjectReferenceCycle_OutputsSkipped)
		assert.Assert(t, len(result.Errors) > 0)
		assert.Assert(t, sys.FS().FileExists("/project/cycle1/dist/index.js"))
		assert.Assert(t, sys.FS().FileExists("/project/cycle2/dist/index.js"))
	})
}

func TestCleanCancellation(t *testing.T) {
	t.Parallel()
	for _, entrypoint := range []string{"CLI", "Clean", "CleanReferences"} {
		for _, phase := range []string{"before clean", "before remove", "after remove"} {
			t.Run(entrypoint+"/"+phase, func(t *testing.T) {
				t.Parallel()
				sys := newCleanTestSystem()
				ctx, cancel := context.WithCancel(t.Context())
				defer cancel()
				fs := &cancellingCleanFS{FS: sys.FS(), cancel: cancel, cancelBeforeRemove: phase == "before remove"}
				sys.fs = fs
				if phase == "before clean" {
					cancel()
				}
				orchestrator := newCleanTestOrchestrator(sys, "--clean", "--singleThreaded", "--extendedDiagnostics", "a")

				var result tsc.CommandLineResult
				switch entrypoint {
				case "CLI":
					result = orchestrator.Start(ctx)
				case "Clean":
					result = orchestrator.Clean(ctx, "a").Result
				case "CleanReferences":
					result = orchestrator.CleanReferences(ctx, "a").Result
				}

				assert.Equal(t, result.Status, tsc.ExitStatusCancelled)
				expectedRemovals := 0
				if phase == "after remove" {
					expectedRemovals = 1
				}
				assert.Equal(t, fs.removals, expectedRemovals)
				assert.Assert(t, !strings.Contains(sys.output.String(), "Total time:"))
				assert.Assert(t, sys.FS().FileExists("/project/a/dist/index.js"))
				assert.Assert(t, sys.FS().FileExists("/project/a/dist/index.d.ts"))
				assert.Assert(t, sys.FS().FileExists("/project/a/dist/tsconfig.tsbuildinfo"))
				assert.Assert(t, sys.FS().FileExists("/project/b/dist/tsconfig.tsbuildinfo"))
			})
		}
	}
}

type cancellingCleanFS struct {
	vfs.FS
	cancel             context.CancelFunc
	cancelBeforeRemove bool
	removals           int
}

func (fs *cancellingCleanFS) FileExists(path tspath.RootedFilePath) bool {
	exists := fs.FS.FileExists(path)
	if exists && fs.cancelBeforeRemove && strings.Contains(path.AsString(), "/dist/") {
		fs.cancel()
	}
	return exists
}

func (fs *cancellingCleanFS) Remove(path tspath.RootedPath) error {
	err := fs.FS.Remove(path)
	if err == nil {
		fs.removals++
		fs.cancel()
	}
	return err
}

type cleanTestSystem struct {
	*tsctests.TestSys
	output strings.Builder
	fs     vfs.FS
}

func (s *cleanTestSystem) FS() vfs.FS {
	return s.fs
}

func (s *cleanTestSystem) Writer() io.Writer {
	return &s.output
}

func (s *cleanTestSystem) ErrorWriter() io.Writer {
	return &s.output
}

func newCleanTestSystem() *cleanTestSystem {
	sys := &cleanTestSystem{TestSys: tsctests.NewTscSystem(tsctests.FileMap{
		"/project/a/tsconfig.json": `{
			"compilerOptions": { "composite": true, "noLib": true, "outDir": "dist" },
			"files": ["index.ts"],
			"references": [{ "path": "../b" }]
		}`,
		"/project/a/index.ts":                  "export const a = 1;",
		"/project/a/dist/index.js":             "export const a = 1;",
		"/project/a/dist/index.d.ts":           "export declare const a = 1;",
		"/project/a/dist/tsconfig.tsbuildinfo": `{}`,
		"/project/b/tsconfig.json":             `{ "compilerOptions": { "composite": true, "noLib": true, "outDir": "dist" }, "files": ["index.ts"] }`,
		"/project/b/index.ts":                  "export const b = 1;",
		"/project/b/dist/index.js":             "export const b = 1;",
		"/project/b/dist/index.d.ts":           "export declare const b = 1;",
		"/project/b/dist/tsconfig.tsbuildinfo": `{}`,
		"/project/c/tsconfig.json":             `{ "compilerOptions": { "composite": true, "noLib": true, "outDir": "dist" }, "files": ["index.ts"] }`,
		"/project/c/index.ts":                  "export const c = 1;",
		"/project/c/dist/index.js":             "export const c = 1;",
		"/project/c/dist/index.d.ts":           "export declare const c = 1;",
		"/project/cycle1/tsconfig.json": `{
			"compilerOptions": { "composite": true, "noLib": true, "outDir": "dist" },
			"files": ["index.ts"],
			"references": [{ "path": "../cycle2" }]
		}`,
		"/project/cycle1/index.ts":      "export const cycle1 = 1;",
		"/project/cycle1/dist/index.js": "export const cycle1 = 1;",
		"/project/cycle2/tsconfig.json": `{
			"compilerOptions": { "composite": true, "noLib": true, "outDir": "dist" },
			"files": ["index.ts"],
			"references": [{ "path": "../cycle1" }]
		}`,
		"/project/cycle2/index.ts":      "export const cycle2 = 1;",
		"/project/cycle2/dist/index.js": "export const cycle2 = 1;",
	}, tspath.CaseSensitive, "/project")}
	sys.fs = sys.TestSys.FS()
	return sys
}

func newCleanTestOrchestrator(sys tsc.System, args ...string) *build.Orchestrator {
	command := tsoptions.ParseBuildCommandLine(append([]string{"--build"}, args...), sys.FS(), sys.GetCurrentDirectory())
	return build.NewOrchestrator(build.Options{
		Sys:     sys,
		Command: command,
	})
}
