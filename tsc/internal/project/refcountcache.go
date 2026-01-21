package project

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
)

type refCountCacheEntry[V any] struct {
	mu       sync.Mutex
	value    V
	refCount int
	deleted  bool
}

type RefCountCacheOptions struct {
	// DisableDeletion prevents entries from being removed from the cache.
	// Used for testing.
	DisableDeletion bool
}

type RefCountCache[K comparable, V any, LoadArgs any] struct {
	Options RefCountCacheOptions
	entries collections.SyncMap[K, *refCountCacheEntry[V]]

	isExpired func(K, V, LoadArgs) bool
	parse     func(K, LoadArgs) V
}

func NewRefCountCache[K comparable, V any, LoadArgs any](
	options RefCountCacheOptions,
	parse func(K, LoadArgs) V,
	isExpired func(K, V, LoadArgs) bool,
) *RefCountCache[K, V, LoadArgs] {
	return &RefCountCache[K, V, LoadArgs]{
		Options:   options,
		isExpired: isExpired,
		parse:     parse,
	}
}

// Load retrieves or creates a cache entry without modifying the ref count.
// The caller should explicitly Ref later if the result is used.
func (c *RefCountCache[K, V, LoadArgs]) Load(identity K, loadArgs LoadArgs) V {
	entry, loaded := c.loadOrStoreLockedEntry(identity, false)
	defer entry.mu.Unlock()
	if !loaded || c.isExpired != nil && c.isExpired(identity, entry.value, loadArgs) {
		entry.value = c.parse(identity, loadArgs)
	}
	return entry.value
}

func (c *RefCountCache[K, V, LoadArgs]) Has(identity K) bool {
	_, ok := c.entries.Load(identity)
	return ok
}

// Ref increments the reference count for an existing entry.
// Panics if the entry does not exist.
func (c *RefCountCache[K, V, LoadArgs]) Ref(identity K) {
	entry, ok := c.entries.Load(identity)
	if !ok {
		panic("cache entry not found")
	}
	entry.mu.Lock()
	defer entry.mu.Unlock()
	if entry.deleted {
		// Entry was deleted while we were acquiring the lock; recover it
		newEntry, _ := c.loadOrStoreLockedEntry(identity, true)
		defer newEntry.mu.Unlock()
		newEntry.value = entry.value
		return
	}
	entry.refCount++
}

// Deref decrements the reference count for an entry.
// When the refcount reaches zero, the entry is removed from the cache
// (unless DisableDeletion is set).
func (c *RefCountCache[K, V, LoadArgs]) Deref(identity K) {
	entry, ok := c.entries.Load(identity)
	if !ok {
		return
	}
	entry.mu.Lock()
	defer entry.mu.Unlock()
	entry.refCount--
	if entry.refCount <= 0 && !c.Options.DisableDeletion {
		entry.deleted = true
		c.entries.Delete(identity)
	}
}

// loadOrStoreLockedEntry loads an existing entry or creates a new one.
// The returned entry's mutex is locked. If ref is true, the refCount is
// incremented (or initialized to 1 for a new entry).
func (c *RefCountCache[K, V, LoadArgs]) loadOrStoreLockedEntry(key K, ref bool) (*refCountCacheEntry[V], bool) {
	entry := &refCountCacheEntry[V]{refCount: core.IfElse(ref, 1, 0)}
	entry.mu.Lock()
	existing, loaded := c.entries.LoadOrStore(key, entry)
	if loaded {
		entry.mu.Unlock()
		existing.mu.Lock()
		if existing.deleted {
			// Existing entry was deleted while we were acquiring the lock
			existing.mu.Unlock()
			return c.loadOrStoreLockedEntry(key, ref)
		}
		if ref {
			existing.refCount++
		}
		return existing, true
	}
	return entry, false
}
