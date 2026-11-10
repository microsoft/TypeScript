package autoimport

import (
	"context"
	"testing"
	"testing/synctest"

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
			return p.extract(context.Background(), set, key, generation, func() (*perPackageExtractionResult, *collections.Set[tspath.PathKey], bool) {
				runs++
				return &perPackageExtractionResult{statsExports: runs}, collections.NewSetFromItems(tspath.CaseSensitive.PathKey(tspath.RootedPath(shared))), true
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

	t.Run("validated reuse advances the generation", func(t *testing.T) {
		t.Parallel()
		p, set, extract, runs := setup()
		assert.Equal(t, extract(0).statsExports, 1)
		g1 := p.recordChange(0, changeOf(other))
		g2 := p.recordChange(g1, changeOf(other))
		assert.Equal(t, extract(g2).statsExports, 1)
		assert.Equal(t, set.results[key].generation, g2)
		assert.Equal(t, *runs, 1)
	})

	t.Run("cancelled waiter does not start a new extraction", func(t *testing.T) {
		t.Parallel()
		p, set, extract, runs := setup()
		assert.Equal(t, extract(0).statsExports, 1)
		edited := p.recordChange(0, changeOf(pkgA+"/index.d.ts"))
		ctx, cancel := context.WithCancel(context.Background())
		cancel()
		result := p.extract(ctx, set, key, edited, func() (*perPackageExtractionResult, *collections.Set[tspath.PathKey], bool) {
			*runs++
			return nil, nil, true
		})
		assert.Assert(t, result == nil)
		assert.Equal(t, *runs, 1)
	})

	t.Run("invalidate all discards extractions", func(t *testing.T) {
		t.Parallel()
		assert.Assert(t, requiresNewPartialExtractions(RegistryChange{InvalidateAll: true}, tspath.CaseSensitive))
		assert.Assert(t, !requiresNewPartialExtractions(RegistryChange{Changed: changeOf(other)}, tspath.CaseSensitive))
	})

	t.Run("aborted extraction is not cached", func(t *testing.T) {
		t.Parallel()
		p, set, extract, runs := setup()
		result := p.extract(context.Background(), set, key, 0, func() (*perPackageExtractionResult, *collections.Set[tspath.PathKey], bool) {
			*runs++
			return nil, nil, false
		})
		assert.Assert(t, result == nil)
		_, cached := set.results[key]
		assert.Assert(t, !cached)
		assert.Equal(t, extract(0).statsExports, 2)
	})

	t.Run("change history is bounded", func(t *testing.T) {
		t.Parallel()
		p, _, extract, _ := setup()
		extract(0)
		var generation uint64
		for range maxPartialExtractionChanges - 1 {
			generation = p.recordChange(generation, changeOf(other))
		}
		assert.Assert(t, !p.needsRotation())
		p.recordChange(generation, changeOf(other))
		assert.Assert(t, p.needsRotation())
	})

	t.Run("manifest changes match case-insensitively", func(t *testing.T) {
		t.Parallel()
		manifest := RegistryChange{Changed: changeOf("/repo/packages/shared/Package.json")}
		assert.Assert(t, requiresNewPartialExtractions(manifest, tspath.CaseInsensitive))
		assert.Assert(t, !requiresNewPartialExtractions(manifest, tspath.CaseSensitive))
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

func TestPartialExtractionsConcurrency(t *testing.T) {
	t.Parallel()
	key := extractionKey{realpath: tspath.RootedDirectoryPathFromNormalized("/repo/node_modules/a"), packageName: "a"}

	start := func(p *partialExtractions, set *extractionSet, release chan struct{}, runs *int) func(context.Context) *perPackageExtractionResult {
		return func(ctx context.Context) *perPackageExtractionResult {
			return p.extract(ctx, set, key, 0, func() (*perPackageExtractionResult, *collections.Set[tspath.PathKey], bool) {
				*runs++
				<-release
				return &perPackageExtractionResult{statsExports: *runs}, &collections.Set[tspath.PathKey]{}, true
			})
		}
	}

	t.Run("concurrent callers share one extraction", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			p := newPartialExtractions(tspath.CaseSensitive)
			set := p.setFor(bucketBuildPreferences{}, nil)
			release := make(chan struct{})
			runs := 0
			extract := start(p, set, release, &runs)
			results := make(chan *perPackageExtractionResult, 2)
			go func() { results <- extract(context.Background()) }()
			synctest.Wait()
			go func() { results <- extract(context.Background()) }()
			synctest.Wait()
			close(release)
			first, second := <-results, <-results
			assert.Assert(t, first != nil && first == second)
			assert.Equal(t, runs, 1)
		})
	})

	t.Run("cancelled waiter returns without extracting", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			p := newPartialExtractions(tspath.CaseSensitive)
			set := p.setFor(bucketBuildPreferences{}, nil)
			release := make(chan struct{})
			runs := 0
			extract := start(p, set, release, &runs)
			owner := make(chan *perPackageExtractionResult, 1)
			go func() { owner <- extract(context.Background()) }()
			synctest.Wait()
			ctx, cancel := context.WithCancel(context.Background())
			waiter := make(chan *perPackageExtractionResult, 1)
			go func() { waiter <- extract(ctx) }()
			synctest.Wait()
			cancel()
			assert.Assert(t, <-waiter == nil)
			assert.Equal(t, runs, 1)
			close(release)
			assert.Assert(t, <-owner != nil)
			assert.Equal(t, runs, 1)
		})
	})

	t.Run("extraction outlives build cancellation but not the lifetime", func(t *testing.T) {
		t.Parallel()
		lifetime, stop := context.WithCancel(context.Background())
		build, cancelBuild := context.WithCancel(WithExtractionLifetime(lifetime))
		extractCtx := detachedExtractionContext(build)
		cancelBuild()
		assert.NilError(t, extractCtx.Err())
		stop()
		assert.Assert(t, extractCtx.Err() != nil)

		plain, cancelPlain := context.WithCancel(context.Background())
		plainCtx := detachedExtractionContext(plain)
		cancelPlain()
		assert.NilError(t, plainCtx.Err())
	})
}
