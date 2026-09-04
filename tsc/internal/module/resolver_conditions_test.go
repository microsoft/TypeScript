package module

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// The cached esm/cjs conditions must stay equivalent to GetConditions for every
// resolution mode, since getConditions re-derives the import/require selection.
func TestGetConditionsCacheMatchesGetConditions(t *testing.T) {
	t.Parallel()

	optionsList := []*core.CompilerOptions{
		{ModuleResolution: core.ModuleResolutionKindNode16},
		{ModuleResolution: core.ModuleResolutionKindNodeNext},
		{ModuleResolution: core.ModuleResolutionKindBundler},
		{ModuleResolution: core.ModuleResolutionKindBundler, NoDtsResolution: core.TSTrue},
		{ModuleResolution: core.ModuleResolutionKindNode16, CustomConditions: []string{"custom1", "custom2"}},
	}
	modes := []core.ResolutionMode{core.ModuleKindNone, core.ModuleKindCommonJS, core.ModuleKindESNext}

	for _, options := range optionsList {
		r := &Resolver{compilerOptions: options}
		r.initConditionCaches()
		for _, mode := range modes {
			got := r.getConditions(options, mode)
			want := GetConditions(options, mode)
			if !slices.Equal(got, want) {
				t.Errorf("options=%+v mode=%v: getConditions=%v, GetConditions=%v", options, mode, got, want)
			}
		}
	}
}
