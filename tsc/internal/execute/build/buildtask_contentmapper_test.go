package build

import (
	"slices"
	"testing"

	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestIsContentMapperSupplementalBuildInfoPath(t *testing.T) {
	t.Parallel()
	roots := []tspath.Path{"/src/app.vue", "/src/index.ts"}

	assert.Assert(t, isContentMapperSupplementalBuildInfoPath("/src/app.vue.0.ts", slices.Values(roots)))
	assert.Assert(t, isContentMapperSupplementalBuildInfoPath("/src/app.vue.12.mts", slices.Values(roots)))
	assert.Assert(t, !isContentMapperSupplementalBuildInfoPath("/src/app.vue.ts", slices.Values(roots)))
	assert.Assert(t, !isContentMapperSupplementalBuildInfoPath("/src/app.vue.0.txt", slices.Values(roots)))
	assert.Assert(t, !isContentMapperSupplementalBuildInfoPath("/src/other.vue.0.ts", slices.Values(roots)))
}
