package project

import (
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
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

	parse func(K, AcquireArgs) V
}

func NewRefCountCache[K comparable, V any, AcquireArgs any](
	options RefCountCacheOptions,
	parse func(K, AcquireArgs) V,
) *RefCountCache[K, V, AcquireArgs] {
	return &RefCountCache[K, V, AcquireArgs]{
		Options: options,
		parse:   parse,
	}
}

// Acquire retrieves or creates a cache entry for the given identity and hash.
// If an entry exists with matching identity and hash, its refcount is incremented
// and the cached value is returned. Otherwise, parse() is called to create the
// value, which is stored and returned with refcount 1.
//
// The caller is responsible for calling Deref when done with the value.
func (c *RefCountCache[K, V, AcquireArgs]) Acquire(identity K, acquireArgs AcquireArgs) V {
	entry, loaded := c.loadOrStoreNewLockedEntry(identity)
	defer entry.mu.Unlock()
	if !loaded {
		// New entry - parse the value
		entry.value = c.parse(identity, acquireArgs)
		return entry.value
	}
	return entry.value
}

func (c *RefCountCache[K, V, AcquireArgs]) Has(identity K) bool {
	_, ok := c.entries.Load(identity)
	return ok
}

// AcquireOrError retrieves an existing entry (incrementing its refcount) or produces a new one via
// produce. If produce returns an error, no entry is stored and the error is returned, so callers can
// cache only successful results. produce runs while holding the new entry's lock, so concurrent
// acquisitions of the same identity that miss serialize on it.
//
// The caller is responsible for calling Deref when a value is returned without error.
func (c *RefCountCache[K, V, AcquireArgs]) AcquireOrError(identity K, produce func() (V, error)) (V, error) {
	entry, loaded := c.loadOrStoreNewLockedEntry(identity)
	defer entry.mu.Unlock()
	if loaded {
		return entry.value, nil
	}
	value, err := produce()
	if err != nil {
		// Undo the speculative entry so failures are not cached.
		entry.refCount = 0
		c.entries.Delete(identity)
		return value, err
	}
	entry.value = value
	return value, nil
}

// RefOrAcquire increments the reference count for an existing entry, or
// installs value as a fresh entry with refCount 1 if none exists.
//
// It never panics on a missing entry. It exists for callers that already
// hold value from elsewhere (e.g. a *ast.SourceFile reused from
// an old Program while cloning a new one) and are re-establishing their own
// claim on it. Such callers can legitimately race with a concurrent Deref of
// the last other claim on the same identity: two independent snapshot builds
// (for example a normal edit and a speculative auto-import clone, see
// GetLanguageServiceWithAutoImports) can each be cloning from the same
// shared Program concurrently, and the moment the file's last other owner
// releases it can fall between this call's initial lookup and its lock
// acquisition. Since the caller already possesses a valid value for
// identity, recreating the entry is always safe: it never returns a value
// the caller didn't already have.
func (c *RefCountCache[K, V, AcquireArgs]) RefOrAcquire(identity K, value V) {
	entry, loaded := c.loadOrStoreNewLockedEntry(identity)
	if !loaded {
		entry.value = value
	}
	entry.mu.Unlock()
}

// RefIfPresent increments the reference count for an existing entry and
// reports true, or reports false if no trace of the entry could be found.
//
// It exists for callers that are recording an additional owner of an entry
// they do not themselves have a value for (e.g. a duplicate source file,
// which is only ever a bookkeeping reference to a canonical entry acquired
// elsewhere). If the entry is concurrently deleted between this call's
// lookup and its lock acquisition, it is resurrected using the value it
// already held (the same recovery loadOrStoreNewLockedEntry performs for
// Acquire/RefOrAcquire), so the ref this call records — and the Deref its
// caller will issue later to release it — stay balanced. A plain no-op here
// would leave that later Deref unmatched, and it could land on an unrelated
// entry that happens to reuse the same key by the time it runs.
//
// Only if the entry was never observed at all (not even a stale, about to be
// deleted one) does this return false; there is no value to recover in that
// case, so the caller must skip the corresponding Deref to stay balanced.
func (c *RefCountCache[K, V, AcquireArgs]) RefIfPresent(identity K) bool {
	entry, ok := c.entries.Load(identity)
	if !ok {
		return false
	}
	entry.mu.Lock()
	if entry.refCount <= 0 && !c.Options.DisableDeletion {
		// Entry was deleted while we were acquiring the lock; resurrect it
		// from the value it already held so this ref stays balanced.
		entry.mu.Unlock()
		newEntry, _ := c.loadOrStoreNewLockedEntry(identity)
		newEntry.value = entry.value
		newEntry.mu.Unlock()
		return true
	}
	entry.refCount++
	entry.mu.Unlock()
	return true
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
		entry.mu.Unlock()
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
