package packagejson_test

import (
	"fmt"
	"maps"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func infoCacheDirectory(name string) packagejson.PackageDirectory {
	return packagejson.NewPackageDirectory(tspath.RootedDirectoryPathFromAbsolute("/"+name), tspath.CaseSensitive)
}

func newInfoCacheEntry(name string, exists bool) *packagejson.InfoCacheEntry {
	entry := &packagejson.InfoCacheEntry{PackageDirectory: infoCacheDirectory(name), DirectoryExists: exists}
	if exists {
		entry.Contents = &packagejson.PackageJson{}
	}
	return entry
}

func infoCacheKeys(cache *packagejson.InfoCache) map[string]*packagejson.InfoCacheEntry {
	result := map[string]*packagejson.InfoCacheEntry{}
	cache.Range(func(key tspath.PathKey, value *packagejson.InfoCacheEntry) bool {
		result[key.AsString()] = value
		return true
	})
	return result
}

func TestInfoCacheCloneIsolation(t *testing.T) {
	t.Parallel()

	a := newInfoCacheEntry("a", true)
	missing := newInfoCacheEntry("missing", false)
	b := newInfoCacheEntry("b", true)
	c := newInfoCacheEntry("c", true)

	gen1 := packagejson.NewInfoCache(tspath.CaseSensitive)
	assert.Equal(t, gen1.Set(a.PackageDirectory, a), a)
	assert.Equal(t, gen1.Set(missing.PackageDirectory, missing), missing)

	gen2 := gen1.Clone()
	assert.Equal(t, gen2.Set(b.PackageDirectory, b), b)
	gen3 := gen2.Clone()
	assert.Equal(t, gen1.Set(c.PackageDirectory, c), c)

	assert.Assert(t, maps.Equal(infoCacheKeys(gen1), map[string]*packagejson.InfoCacheEntry{"/a": a, "/missing": missing, "/c": c}))
	assert.Assert(t, maps.Equal(infoCacheKeys(gen2), map[string]*packagejson.InfoCacheEntry{"/a": a, "/missing": missing, "/b": b}))
	assert.Assert(t, maps.Equal(infoCacheKeys(gen3), map[string]*packagejson.InfoCacheEntry{"/a": a, "/missing": missing, "/b": b}))

	assert.Assert(t, gen2.Get(c.PackageDirectory) == nil)
	assert.Assert(t, gen1.Get(b.PackageDirectory) == nil)

	// Negative entries are cached like any other entry.
	got := gen3.Get(missing.PackageDirectory)
	assert.Equal(t, got, missing)
	assert.Assert(t, !got.Exists())
}

func TestInfoCacheFirstWriterWins(t *testing.T) {
	t.Parallel()

	first := newInfoCacheEntry("a", true)
	second := newInfoCacheEntry("a", false)

	cache := packagejson.NewInfoCache(tspath.CaseSensitive)
	assert.Equal(t, cache.Set(first.PackageDirectory, first), first)
	assert.Equal(t, cache.Set(second.PackageDirectory, second), first, "overlay entry must win")

	clone := cache.Clone()
	assert.Equal(t, clone.Set(second.PackageDirectory, second), first, "base entry must win")
	assert.Equal(t, clone.Get(second.PackageDirectory), first)
}

func TestInfoCacheRangeStopsEarly(t *testing.T) {
	t.Parallel()

	cache := packagejson.NewInfoCache(tspath.CaseSensitive)
	for _, name := range []string{"a", "b"} {
		entry := newInfoCacheEntry(name, true)
		cache.Set(entry.PackageDirectory, entry)
	}
	cache = cache.Clone()
	for _, name := range []string{"c", "d"} {
		entry := newInfoCacheEntry(name, true)
		cache.Set(entry.PackageDirectory, entry)
	}

	for stopAfter := 1; stopAfter <= 4; stopAfter++ {
		visited := 0
		cache.Range(func(tspath.PathKey, *packagejson.InfoCacheEntry) bool {
			visited++
			return visited < stopAfter
		})
		assert.Equal(t, visited, stopAfter)
	}
}

func TestInfoCacheConcurrentUse(t *testing.T) {
	t.Parallel()

	const writers = 8
	const keys = 200

	base := packagejson.NewInfoCache(tspath.CaseSensitive)
	for i := range keys / 2 {
		entry := newInfoCacheEntry(fmt.Sprintf("k%d", i), true)
		base.Set(entry.PackageDirectory, entry)
	}
	cache := base.Clone()

	winners := make([][]*packagejson.InfoCacheEntry, writers)
	var clones sync.Map
	var wg sync.WaitGroup
	for w := range writers {
		winners[w] = make([]*packagejson.InfoCacheEntry, keys)
		wg.Go(func() {
			for i := range keys {
				entry := newInfoCacheEntry(fmt.Sprintf("k%d", i), w%2 == 0)
				winners[w][i] = cache.Set(entry.PackageDirectory, entry)
				assert.Equal(t, cache.Get(entry.PackageDirectory), winners[w][i])
				if i%50 == 0 {
					clones.Store(fmt.Sprintf("%d-%d", w, i), cache.Clone())
				}
			}
		})
	}
	wg.Wait()

	final := cache.Clone()
	for i := range keys {
		directory := infoCacheDirectory(fmt.Sprintf("k%d", i))
		winner := final.Get(directory)
		assert.Assert(t, winner != nil)
		for w := range writers {
			assert.Equal(t, winners[w][i], winner, "key %d writer %d", i, w)
		}
		if i < keys/2 {
			assert.Equal(t, winner, base.Get(directory))
		}
	}
	// Every snapshot taken during the writes agrees with the final winners.
	clones.Range(func(_, value any) bool {
		value.(*packagejson.InfoCache).Range(func(key tspath.PathKey, entry *packagejson.InfoCacheEntry) bool {
			assert.Equal(t, entry, final.Get(entry.PackageDirectory), "key %s", key)
			return true
		})
		return true
	})
}
