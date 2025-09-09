package build

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/collections"
)

type parseCacheEntry[V any] struct {
	value V
	mu    sync.Mutex
}

type parseCache[K comparable, V any] struct {
	entries collections.SyncMap[K, *parseCacheEntry[V]]
}

func (c *parseCache[K, V]) loadOrStoreNew(key K, parse func(K) V) V {
	return c.loadOrStoreNewIf(key, parse, func(value V) bool { return true })
}

func (c *parseCache[K, V]) loadOrStoreNewIf(key K, parse func(K) V, canCacheValue func(V) bool) V {
	newEntry := &parseCacheEntry[V]{}
	newEntry.mu.Lock()
	defer newEntry.mu.Unlock()
	if entry, loaded := c.entries.LoadOrStore(key, newEntry); loaded {
		entry.mu.Lock()
		defer entry.mu.Unlock()
		if canCacheValue(entry.value) {
			return entry.value
		}
		newEntry = entry
	}
	newEntry.value = parse(key)
	return newEntry.value
}

func (c *parseCache[K, V]) store(key K, value V) {
	c.entries.Store(key, &parseCacheEntry[V]{value: value})
}

func (c *parseCache[K, V]) delete(key K) {
	c.entries.Delete(key)
}

func (c *parseCache[K, V]) reset() {
	c.entries = collections.SyncMap[K, *parseCacheEntry[V]]{}
}
