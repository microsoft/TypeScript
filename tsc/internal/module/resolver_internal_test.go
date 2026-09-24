package module

import "testing"

func TestLoadModuleFromNilExportsOrImports(t *testing.T) {
	t.Parallel()

	var state resolutionState
	if result := state.loadModuleFromExportsOrImports(0, "pkg", nil, nil, false); !result.shouldContinueSearching() {
		t.Fatal("expected nil exports or imports to continue searching")
	}
}
