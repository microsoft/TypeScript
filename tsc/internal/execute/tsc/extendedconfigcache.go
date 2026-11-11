package tsc

import (
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// extendedConfigCache is a minimal implementation of tsoptions.ExtendedConfigCache.
// It is concurrency-safe, but stores cached entries permanently. This implementation
// should not be used for long-running processes where configuration changes over the
// course of multiple compilations.
type ExtendedConfigCache struct {
	m collections.SyncMap[tspath.PathKey, *tsoptions.ExtendedConfigCacheEntry]
}

var _ tsoptions.ExtendedConfigCache = (*ExtendedConfigCache)(nil)

// GetExtendedConfig implements tsoptions.ExtendedConfigCache.
func (e *ExtendedConfigCache) GetExtendedConfig(fileName tspath.RootedFilePath, path tspath.PathKey, resolutionStack []tspath.PathKey, fs vfs.FS) *tsoptions.ExtendedConfigCacheEntry {
	if entry, ok := e.m.Load(path); ok {
		return entry
	}
	// Parsing can re-enter the cache, so do not hold a lock while parsing.
	entry := tsoptions.ParseExtendedConfig(fileName, path, resolutionStack, fs, e)
	entry, _ = e.m.LoadOrStore(path, entry)
	return entry
}
