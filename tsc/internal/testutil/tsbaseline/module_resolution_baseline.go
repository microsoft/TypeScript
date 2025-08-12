package tsbaseline

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil/baseline"
)

func DoModuleResolutionBaseline(t *testing.T, baselinePath string, trace string, opts baseline.Options) {
	baselinePath = tsExtension.ReplaceAllString(baselinePath, ".trace.json")
	var errorBaseline string
	if trace != "" {
		errorBaseline = trace
	} else {
		errorBaseline = baseline.NoContent
	}
	baseline.Run(t, baselinePath, errorBaseline, opts)
}
