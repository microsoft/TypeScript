package build

import (
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestContentMapperVirtualFilePaths(t *testing.T) {
	t.Parallel()
	buildInfo := &incremental.BuildInfo{
		Root: []*incremental.BuildInfoRoot{
			{NonIncremental: "/src/a.vue"},
			{NonIncremental: "/src/b.ts"},
			{NonIncremental: "/src/a.vue.0"},
		},
	}
	roots := buildInfo.GetBuildInfoRootInfoReader("/", tspath.CaseSensitive)

	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.0.ts", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.1.tsx", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.12.mts", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.2.cts", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.0.js", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.0.jsx", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.0.mjs", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.0.cjs", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.0.json", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/b.ts.0.ts", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.0.1.ts", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.+1.ts", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.-1.ts", roots))
	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.001.ts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/a.vue.ts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/a.vue.0.txt", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/a.vue.0.d.ts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/a.vue.0.d.mts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/a.vue.0.d.cts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/a.vue.0", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/a.vue..ts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/a.vue.x.ts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/a.vue.99999999999999999999.ts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/a.vue.1.0.ts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/b.vue.0.ts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/a.vuex.0.ts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/a.ts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/.0.ts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/..0.ts", roots))
}

func TestContentMapperVirtualFilePathsUseOriginalRoots(t *testing.T) {
	t.Parallel()
	buildInfo := &incremental.BuildInfo{
		FileNames:    []incremental.BuildInfoPath{"./src/a.vue", "./src/b.vue"},
		Root:         []*incremental.BuildInfoRoot{{Start: 2}},
		ResolvedRoot: []*incremental.BuildInfoResolvedRoot{{Resolved: 2, Root: 1}},
	}
	roots := buildInfo.GetBuildInfoRootInfoReader("/", tspath.CaseSensitive)

	assert.Assert(t, isContentMapperVirtualFilePath("/src/a.vue.0.ts", roots))
	assert.Assert(t, !isContentMapperVirtualFilePath("/src/b.vue.0.ts", roots))
}

func BenchmarkContentMapperVirtualFilePaths(b *testing.B) {
	for _, count := range []int{100, 1000, 10000} {
		buildInfo := &incremental.BuildInfo{}
		for i := range count {
			buildInfo.Root = append(buildInfo.Root, &incremental.BuildInfoRoot{
				NonIncremental: incremental.BuildInfoPath("/project/packages/a/src/components/a" + strconv.Itoa(i) + ".vue"),
			})
		}
		roots := buildInfo.GetBuildInfoRootInfoReader("/", tspath.CaseSensitive)
		b.Run("roots="+strconv.Itoa(count), func(b *testing.B) {
			b.Run("declarationFile", func(b *testing.B) {
				b.ReportAllocs()
				for b.Loop() {
					isContentMapperVirtualFilePath("/project/node_modules/a/b.d.ts", roots)
				}
			})
			b.Run("sourceFile", func(b *testing.B) {
				b.ReportAllocs()
				for b.Loop() {
					isContentMapperVirtualFilePath("/project/node_modules/a/b.js", roots)
				}
			})
			b.Run("virtualFile", func(b *testing.B) {
				path := tspath.PathKeyFromCanonical(buildInfo.Root[count-1].NonIncremental.AsString() + ".0.ts")
				b.ReportAllocs()
				for b.Loop() {
					isContentMapperVirtualFilePath(path, roots)
				}
			})
		})
	}
}
