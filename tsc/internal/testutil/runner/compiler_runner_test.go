package runner

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
)

func TestCompilerBaselines(t *testing.T) {
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
			cleanUpLocalCompilerTests(testType)
			runner := NewCompilerBaselineRunner(testType)
			runner.RunTests(t)
		})
	}
}
