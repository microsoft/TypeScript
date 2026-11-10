package autoimport

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestPartialExtractionsInvalidation(t *testing.T) {
	t.Parallel()
	const (
		pkgA   = "/repo/packages/a"
		shared = "/repo/packages/shared/index.d.ts"
		other  = "/repo/src/index.ts"
	)
	key := extractionKey{realpath: tspath.RootedDirectoryPathFromNormalized(pkgA), packageName: "a"}

	changeOf := func(fileName string) collections.Set[lsproto.DocumentUri] {
		var s collections.Set[lsproto.DocumentUri]
		s.Add(lsproto.DocumentUri("file://" + fileName))
		return s
	}

	setup := func() (*partialExtractions, *extractionSet, func(uint64) *perPackageExtractionResult, *int) {
		p := newPartialExtractions(tspath.CaseSensitive)
		set := p.setFor(bucketBuildPreferences{}, nil)
		runs := 0
		extract := func(generation uint64) *perPackageExtractionResult {
			return p.extract(context.Background(), set, key, generation, func() (*perPackageExtractionResult, *collections.Set[tspath.PathKey]) {
				runs++
				return &perPackageExtractionResult{statsExports: runs}, collections.NewSetFromItems(tspath.CaseSensitive.PathKey(tspath.RootedPath(shared)))
			})
		}
		return p, set, extract, &runs
	}

	t.Run("older build publishing after an edit is not reused", func(t *testing.T) {
		t.Parallel()
		p, _, extract, runs := setup()
		edited := p.recordChange(0, changeOf(pkgA+"/index.d.ts"))
		assert.Equal(t, extract(0).statsExports, 1)
		assert.Equal(t, extract(edited).statsExports, 2)
		assert.Equal(t, extract(edited).statsExports, 2)
		assert.Equal(t, *runs, 2)
	})

	t.Run("edits to dependencies outside the package root invalidate", func(t *testing.T) {
		t.Parallel()
		p, _, extract, runs := setup()
		assert.Equal(t, extract(0).statsExports, 1)
		assert.Equal(t, extract(p.recordChange(0, changeOf(shared))).statsExports, 2)
		assert.Equal(t, *runs, 2)
	})

	t.Run("unrelated edits keep the extraction", func(t *testing.T) {
		t.Parallel()
		p, _, extract, runs := setup()
		assert.Equal(t, extract(0).statsExports, 1)
		g1 := p.recordChange(0, changeOf(other))
		g2 := p.recordChange(g1, changeOf(other))
		assert.Equal(t, extract(g2).statsExports, 1)
		assert.Equal(t, *runs, 1)
	})

	t.Run("sibling snapshots do not share edits", func(t *testing.T) {
		t.Parallel()
		p, _, extract, runs := setup()
		edited := p.recordChange(0, changeOf(pkgA+"/index.d.ts"))
		sibling := p.recordChange(0, changeOf(other))
		assert.Equal(t, extract(edited).statsExports, 1)
		assert.Equal(t, extract(sibling).statsExports, 2)
		assert.Equal(t, *runs, 2)
	})

	t.Run("replacement set stays reachable", func(t *testing.T) {
		t.Parallel()
		p, set, _, _ := setup()
		changed := bucketBuildPreferences{fileExcludePatterns: []string{"**/internal/**"}}
		replacement := p.setFor(changed, nil)
		assert.Assert(t, replacement != set)
		assert.Assert(t, p.setFor(changed, nil) == replacement)
	})
}
