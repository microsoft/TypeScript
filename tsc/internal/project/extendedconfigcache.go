package project

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/zeebo/xxh3"
)

type extendedConfigCache struct {
	entries collections.SyncMap[tspath.Path, *extendedConfigCacheEntry]
}

type extendedConfigCacheEntry struct {
	mu       sync.Mutex
	entry    *tsoptions.ExtendedConfigCacheEntry
	hash     xxh3.Uint128
	refCount int
}

func (c *extendedConfigCache) Acquire(fh FileHandle, path tspath.Path, parse func() *tsoptions.ExtendedConfigCacheEntry) *tsoptions.ExtendedConfigCacheEntry {
	entry, loaded := c.loadOrStoreNewLockedEntry(path)
	defer entry.mu.Unlock()
	var hash xxh3.Uint128
	if fh != nil {
		hash = fh.Hash()
	}
	if !loaded || entry.hash != hash {
		// Reparse the config if the hash has changed, or parse for the first time.
		entry.entry = parse()
		entry.hash = hash
	}
	return entry.entry
}

func (c *extendedConfigCache) Ref(path tspath.Path) {
	if entry, ok := c.entries.Load(path); ok {
		entry.mu.Lock()
		entry.refCount++
		entry.mu.Unlock()
	}
}

func (c *extendedConfigCache) Deref(path tspath.Path) {
	if entry, ok := c.entries.Load(path); ok {
		entry.mu.Lock()
		entry.refCount--
		remove := entry.refCount <= 0
		entry.mu.Unlock()
		if remove {
			c.entries.Delete(path)
		}
	}
}

func (c *extendedConfigCache) Has(path tspath.Path) bool {
	_, ok := c.entries.Load(path)
	return ok
}

// loadOrStoreNewLockedEntry loads an existing entry or creates a new one. The returned
// entry's mutex is locked and its refCount is incremented (or initialized to 1
// in the case of a new entry).
func (c *extendedConfigCache) loadOrStoreNewLockedEntry(path tspath.Path) (*extendedConfigCacheEntry, bool) {
	entry := &extendedConfigCacheEntry{refCount: 1}
	entry.mu.Lock()
	if existing, loaded := c.entries.LoadOrStore(path, entry); loaded {
		existing.mu.Lock()
		existing.refCount++
		return existing, true
	}
	return entry, false
}
