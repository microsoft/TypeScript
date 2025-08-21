package execute

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// extendedConfigCache is a minimal implementation of tsoptions.ExtendedConfigCache.
// It is concurrency-safe, but stores cached entries permanently. This implementation
// should not be used for long-running processes where configuration changes over the
// course of multiple compilations.
type extendedConfigCache struct {
	m collections.SyncMap[tspath.Path, *extendedConfigCacheEntry]
}

type extendedConfigCacheEntry struct {
	*tsoptions.ExtendedConfigCacheEntry
	mu sync.Mutex
}

var _ tsoptions.ExtendedConfigCache = (*extendedConfigCache)(nil)

// GetExtendedConfig implements tsoptions.ExtendedConfigCache.
func (e *extendedConfigCache) GetExtendedConfig(fileName string, path tspath.Path, parse func() *tsoptions.ExtendedConfigCacheEntry) *tsoptions.ExtendedConfigCacheEntry {
	entry, loaded := e.loadOrStoreNewLockedEntry(path)
	defer entry.mu.Unlock()
	if !loaded {
		entry.ExtendedConfigCacheEntry = parse()
	}
	return entry.ExtendedConfigCacheEntry
}

// loadOrStoreNewLockedEntry loads an existing entry or creates a new one. The returned entry's mutex is locked.
func (c *extendedConfigCache) loadOrStoreNewLockedEntry(path tspath.Path) (*extendedConfigCacheEntry, bool) {
	entry := &extendedConfigCacheEntry{}
	entry.mu.Lock()
	if existing, loaded := c.m.LoadOrStore(path, entry); loaded {
		existing.mu.Lock()
		return existing, true
	}
	return entry, false
}
