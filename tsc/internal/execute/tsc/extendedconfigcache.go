package tsc

import (
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// extendedConfigCache is a minimal implementation of tsoptions.ExtendedConfigCache.
// It is concurrency-safe, but stores cached entries permanently. This implementation
// should not be used for long-running processes where configuration changes over the
// course of multiple compilations.
type ExtendedConfigCache struct {
	m collections.SyncMap[tspath.PathKey, *extendedConfigCacheEntry]
}

type extendedConfigCacheEntry struct {
	*tsoptions.ExtendedConfigCacheEntry
	mu sync.Mutex
}

var _ tsoptions.ExtendedConfigCache = (*ExtendedConfigCache)(nil)

// GetExtendedConfig implements tsoptions.ExtendedConfigCache.
func (e *ExtendedConfigCache) GetExtendedConfig(fileName tspath.RootedFilePath, path tspath.PathKey, resolutionStack []tspath.PathKey, host tsoptions.ParseConfigHost) *tsoptions.ExtendedConfigCacheEntry {
	entry, loaded := e.loadOrStoreNewLockedEntry(path)
	defer entry.mu.Unlock()
	if !loaded {
		entry.ExtendedConfigCacheEntry = tsoptions.ParseExtendedConfig(fileName, path, resolutionStack, host, e)
	}
	return entry.ExtendedConfigCacheEntry
}

// loadOrStoreNewLockedEntry loads an existing entry or creates a new one. The returned entry's mutex is locked.
func (c *ExtendedConfigCache) loadOrStoreNewLockedEntry(path tspath.PathKey) (*extendedConfigCacheEntry, bool) {
	entry := &extendedConfigCacheEntry{}
	entry.mu.Lock()
	if existing, loaded := c.m.LoadOrStore(path, entry); loaded {
		existing.mu.Lock()
		return existing, true
	}
	return entry, false
}
