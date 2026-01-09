package project

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/collections"
)

type refCountCacheEntry[V any] struct {
	mu       sync.Mutex
	value    V
	refCount int
}

type RefCountCacheOptions struct {
	// DisableDeletion prevents entries from being removed from the cache.
	// Used for testing.
	DisableDeletion bool
}

type RefCountCache[K comparable, V any, AcquireArgs any] struct {
	Options RefCountCacheOptions
	entries collections.SyncMap[K, *refCountCacheEntry[V]]

	isExpired func(K, V, AcquireArgs) bool
	parse     func(K, AcquireArgs) V
}

func NewRefCountCache[K comparable, V any, AcquireArgs any](
	options RefCountCacheOptions,
	parse func(K, AcquireArgs) V,
	isExpired func(K, V, AcquireArgs) bool,
) *RefCountCache[K, V, AcquireArgs] {
	return &RefCountCache[K, V, AcquireArgs]{
		Options:   options,
		isExpired: isExpired,
		parse:     parse,
	}
}

// Acquire retrieves or creates a cache entry for the given identity.
// If an entry exists with matching identity, its refcount is incremented
// and the cached value is returned. Otherwise, parse() is called to create the
// value, which is stored and returned with refcount 1.
//
// The caller is responsible for calling Deref when done with the value.
func (c *RefCountCache[K, V, AcquireArgs]) Acquire(identity K, acquireArgs AcquireArgs) V {
	entry, loaded := c.loadOrStoreNewLockedEntry(identity)
	defer entry.mu.Unlock()
	if !loaded || c.isExpired != nil && c.isExpired(identity, entry.value, acquireArgs) {
		// New entry - parse the value
		entry.value = c.parse(identity, acquireArgs)
	}
	return entry.value
}

// Ref increments the reference count for an existing entry.
// Panics if the entry does not exist.
func (c *RefCountCache[K, V, AcquireArgs]) Ref(identity K) {
	entry, ok := c.entries.Load(identity)
	if !ok {
		panic("cache entry not found")
	}
	entry.mu.Lock()
	defer entry.mu.Unlock()
	if entry.refCount <= 0 && !c.Options.DisableDeletion {
		// Entry was deleted while we were acquiring the lock
		newEntry, loaded := c.loadOrStoreNewLockedEntry(identity)
		defer newEntry.mu.Unlock()
		if !loaded {
			newEntry.value = entry.value
		}
		return
	}
	entry.refCount++
}

// Deref decrements the reference count for an entry.
// When the refcount reaches zero, the entry is removed from the cache
// (unless DisableDeletion is set).
func (c *RefCountCache[K, V, AcquireArgs]) Deref(identity K) {
	entry, ok := c.entries.Load(identity)
	if !ok {
		return
	}
	entry.mu.Lock()
	defer entry.mu.Unlock()
	entry.refCount--
	if entry.refCount <= 0 && !c.Options.DisableDeletion {
		c.entries.Delete(identity)
	}
}

// loadOrStoreNewLockedEntry loads an existing entry or creates a new one.
// The returned entry's mutex is locked and its refCount is incremented
// (or initialized to 1 in the case of a new entry).
func (c *RefCountCache[K, V, AcquireArgs]) loadOrStoreNewLockedEntry(key K) (*refCountCacheEntry[V], bool) {
	entry := &refCountCacheEntry[V]{refCount: 1}
	entry.mu.Lock()
	existing, loaded := c.entries.LoadOrStore(key, entry)
	if loaded {
		existing.mu.Lock()
		if existing.refCount <= 0 && !c.Options.DisableDeletion {
			// Existing entry was deleted while we were acquiring the lock
			existing.mu.Unlock()
			return c.loadOrStoreNewLockedEntry(key)
		}
		existing.refCount++
		return existing, true
	}
	return entry, false
}
