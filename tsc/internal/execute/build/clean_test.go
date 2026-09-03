package build_test

import (
	"io"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/execute/build"
	"github.com/microsoft/TypeScript/tsc/internal/execute/tsc"
	"github.com/microsoft/TypeScript/tsc/internal/execute/tsctests"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"gotest.tools/v3/assert"
)

func TestClean(t *testing.T) {
	t.Parallel()

	t.Run("cleans selected project and references", func(t *testing.T) {
		t.Parallel()
		sys := newCleanTestSystem()
		orchestrator := newCleanTestOrchestrator(sys, "a", "c")

		assert.Equal(t, orchestrator.Clean("a"), tsc.ExitStatusSuccess)
		assert.Assert(t, !sys.FS().FileExists("/project/a/dist/index.js"))
		assert.Assert(t, !sys.FS().FileExists("/project/b/dist/index.js"))
		assert.Assert(t, sys.FS().FileExists("/project/c/dist/index.js"))
	})

	t.Run("dry run preserves outputs", func(t *testing.T) {
		t.Parallel()
		sys := newCleanTestSystem()
		orchestrator := newCleanTestOrchestrator(sys, "--dry", "a")

		assert.Equal(t, orchestrator.Clean("a"), tsc.ExitStatusSuccess)
		assert.Assert(t, sys.FS().FileExists("/project/a/dist/index.js"))
		assert.Assert(t, sys.FS().FileExists("/project/b/dist/index.js"))
	})

	t.Run("rejects project outside build", func(t *testing.T) {
		t.Parallel()
		sys := newCleanTestSystem()
		orchestrator := newCleanTestOrchestrator(sys, "a")

		assert.Equal(t, orchestrator.Clean("c"), tsc.ExitStatusInvalidProject_OutputsSkipped)
		assert.Assert(t, sys.FS().FileExists("/project/a/dist/index.js"))
		assert.Assert(t, sys.FS().FileExists("/project/b/dist/index.js"))
		assert.Assert(t, sys.FS().FileExists("/project/c/dist/index.js"))
	})

	t.Run("rejects circular build", func(t *testing.T) {
		t.Parallel()
		sys := newCleanTestSystem()
		orchestrator := newCleanTestOrchestrator(sys, "cycle1")

		assert.Equal(t, orchestrator.Clean("cycle1"), tsc.ExitStatusProjectReferenceCycle_OutputsSkipped)
		assert.Assert(t, sys.FS().FileExists("/project/cycle1/dist/index.js"))
		assert.Assert(t, sys.FS().FileExists("/project/cycle2/dist/index.js"))
	})
}

type cleanTestSystem struct {
	*tsctests.TestSys
	output strings.Builder
}

func (s *cleanTestSystem) Writer() io.Writer {
	return &s.output
}

func (s *cleanTestSystem) ErrorWriter() io.Writer {
	return &s.output
}

func newCleanTestSystem() *cleanTestSystem {
	return &cleanTestSystem{TestSys: tsctests.NewTscSystem(tsctests.FileMap{
		"/project/a/tsconfig.json": `{
			"compilerOptions": { "composite": true, "noLib": true, "outDir": "dist" },
			"files": ["index.ts"],
			"references": [{ "path": "../b" }]
		}`,
		"/project/a/index.ts":        "export const a = 1;",
		"/project/a/dist/index.js":   "export const a = 1;",
		"/project/a/dist/index.d.ts": "export declare const a = 1;",
		"/project/b/tsconfig.json":   `{ "compilerOptions": { "composite": true, "noLib": true, "outDir": "dist" }, "files": ["index.ts"] }`,
		"/project/b/index.ts":        "export const b = 1;",
		"/project/b/dist/index.js":   "export const b = 1;",
		"/project/b/dist/index.d.ts": "export declare const b = 1;",
		"/project/c/tsconfig.json":   `{ "compilerOptions": { "composite": true, "noLib": true, "outDir": "dist" }, "files": ["index.ts"] }`,
		"/project/c/index.ts":        "export const c = 1;",
		"/project/c/dist/index.js":   "export const c = 1;",
		"/project/c/dist/index.d.ts": "export declare const c = 1;",
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
	}, true, "/project")}
}

func newCleanTestOrchestrator(sys tsc.System, args ...string) *build.Orchestrator {
	command := tsoptions.ParseBuildCommandLine(append([]string{"--build"}, args...), sys)
	return build.NewOrchestrator(build.Options{
		Sys:     sys,
		Command: command,
	})
}
