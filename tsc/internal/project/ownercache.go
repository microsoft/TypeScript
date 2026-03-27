package project

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/collections"
)

type ownerCacheEntry[V any] struct {
	mu     sync.Mutex
	value  V
	owners map[uint64]struct{}
}

// OwnerCache is like RefCountCache, but each entry tracks the set of its
// owners instead of a count. We use this to associate extended config cache
// entries with each snapshot that contains them, since the same config can
// be Acquired multiple times during config parsing while only appearing once in
// the ParsedCommandLine's list of extended files. When updating this code, check
// if the same changes should be made to RefCountCache as well.
type OwnerCache[K comparable, V any, LoadArgs any] struct {
	entries collections.SyncMap[K, *ownerCacheEntry[V]]

	isExpired func(K, V, LoadArgs) bool
	parse     func(K, LoadArgs) V
}

func NewOwnerCache[K comparable, V any, LoadArgs any](
	parse func(K, LoadArgs) V,
	isExpired func(K, V, LoadArgs) bool,
) *OwnerCache[K, V, LoadArgs] {
	return &OwnerCache[K, V, LoadArgs]{
		isExpired: isExpired,
		parse:     parse,
	}
}

func (c *OwnerCache[K, V, LoadArgs]) LoadAndAcquire(identity K, owner uint64, loadArgs LoadArgs) V {
	entry, loaded := c.loadOrStoreLockedEntry(identity)
	defer entry.mu.Unlock()
	if !loaded || c.isExpired != nil && c.isExpired(identity, entry.value, loadArgs) {
		entry.value = c.parse(identity, loadArgs)
	}
	entry.owners[owner] = struct{}{}
	return entry.value
}

func (c *OwnerCache[K, V, LoadArgs]) Acquire(identity K, owner uint64, value V) {
	entry, loaded := c.loadOrStoreLockedEntry(identity)
	defer entry.mu.Unlock()
	if !loaded {
		entry.value = value
	}
	entry.owners[owner] = struct{}{}
}

// AddOwner adds an owner to an existing live entry. The entry must exist
// and have at least one current owner; callers must ensure the entry is
// kept alive (e.g. via snapshot ref counting).
func (c *OwnerCache[K, V, LoadArgs]) AddOwner(identity K, owner uint64) {
	entry, ok := c.entries.Load(identity)
	if !ok {
		panic("OwnerCache.AddOwner: entry not found")
	}
	entry.mu.Lock()
	defer entry.mu.Unlock()
	if len(entry.owners) == 0 {
		panic("OwnerCache.AddOwner: entry has no owners")
	}
	entry.owners[owner] = struct{}{}
}

func (c *OwnerCache[K, V, LoadArgs]) Has(identity K) bool {
	_, ok := c.entries.Load(identity)
	return ok
}

func (c *OwnerCache[K, V, LoadArgs]) Release(identity K, owner uint64) {
	entry, ok := c.entries.Load(identity)
	if !ok {
		return
	}
	entry.mu.Lock()
	defer entry.mu.Unlock()
	delete(entry.owners, owner)
	if len(entry.owners) == 0 {
		c.entries.Delete(identity)
	}
}

func (c *OwnerCache[K, V, LoadArgs]) loadOrStoreLockedEntry(key K) (*ownerCacheEntry[V], bool) {
	entry := &ownerCacheEntry[V]{
		owners: make(map[uint64]struct{}),
	}
	entry.mu.Lock()
	existing, loaded := c.entries.LoadOrStore(key, entry)
	if loaded {
		entry.mu.Unlock()
		existing.mu.Lock()
		if len(existing.owners) == 0 {
			existing.mu.Unlock()
			return c.loadOrStoreLockedEntry(key)
		}
		return existing, true
	}
	return entry, false
}
