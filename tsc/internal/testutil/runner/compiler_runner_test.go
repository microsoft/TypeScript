package runner

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/repo"
)

// Runs the new compiler tests and produces baselines (e.g. `test1.symbols`).
func TestCompilerBaselinesLocal(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	testTypes := []CompilerTestType{TestTypeRegression, TestTypeConformance}
	for _, testType := range testTypes {
		t.Run(testType.String(), func(t *testing.T) {
			t.Parallel()
			runner := NewCompilerBaselineRunner(testType, false /*isSubmodule*/)
			runner.RunTests(t)
		})
	}
}

// Runs the old compiler tests, and produces new baselines (e.g. `test1.symbols`)
// and a diff between the new and old baselines (e.g. `test1.symbols.diff`).
func TestCompilerBaselinesSubmodule(t *testing.T) {
	t.Parallel()
	repo.SkipIfNoTypeScriptSubmodule(t)

	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	testTypes := []CompilerTestType{TestTypeRegression, TestTypeConformance}
	for _, testType := range testTypes {
		t.Run(testType.String(), func(t *testing.T) {
			t.Parallel()
			runner := NewCompilerBaselineRunner(testType, true /*isSubmodule*/)
			runner.RunTests(t)
		})
	}
}
