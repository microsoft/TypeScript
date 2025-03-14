package runner

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

// Runs the new compiler tests and produces baselines (e.g. `test1.symbols`).
func TestLocal(t *testing.T) { runCompilerTests(t, false) } //nolint:paralleltest

// Runs the old compiler tests, and produces new baselines (e.g. `test1.symbols`)
// and a diff between the new and old baselines (e.g. `test1.symbols.diff`).
func TestSubmodule(t *testing.T) { runCompilerTests(t, true) } //nolint:paralleltest

func runCompilerTests(t *testing.T, isSubmodule bool) {
	t.Parallel()

	if isSubmodule {
		repo.SkipIfNoTypeScriptSubmodule(t)
	}

	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	runners := []*CompilerBaselineRunner{
		NewCompilerBaselineRunner(TestTypeRegression, isSubmodule),
		NewCompilerBaselineRunner(TestTypeConformance, isSubmodule),
	}

	var seenTests core.Set[string]
	for _, runner := range runners {
		for _, test := range runner.EnumerateTestFiles() {
			test = tspath.GetBaseFileName(test)
			assert.Assert(t, !seenTests.Has(test), "Duplicate test file: %s", test)
			seenTests.Add(test)
		}
	}

	for _, runner := range runners {
		runner.RunTests(t)
	}
}
