package project

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/zeebo/xxh3"
)

type parseCacheKey struct {
	ast.SourceFileParseOptions
	scriptKind core.ScriptKind
}

func newParseCacheKey(
	options ast.SourceFileParseOptions,
	scriptKind core.ScriptKind,
) parseCacheKey {
	return parseCacheKey{
		SourceFileParseOptions: options,
		scriptKind:             scriptKind,
	}
}

type parseCacheEntry struct {
	mu         sync.Mutex
	sourceFile *ast.SourceFile
	hash       xxh3.Uint128
	refCount   int
}

type ParseCacheOptions struct {
	// DisableDeletion prevents entries from being removed from the cache.
	// Used for testing.
	DisableDeletion bool
}

type ParseCache struct {
	Options ParseCacheOptions
	entries collections.SyncMap[parseCacheKey, *parseCacheEntry]
}

func (c *ParseCache) Acquire(
	fh FileContent,
	opts ast.SourceFileParseOptions,
	scriptKind core.ScriptKind,
) *ast.SourceFile {
	key := newParseCacheKey(opts, scriptKind)
	entry, loaded := c.loadOrStoreNewLockedEntry(key)
	defer entry.mu.Unlock()
	if !loaded || entry.hash != fh.Hash() {
		// Reparse the file if the hash has changed, or parse for the first time.
		entry.sourceFile = parser.ParseSourceFile(opts, fh.Content(), scriptKind)
		entry.hash = fh.Hash()
	}
	return entry.sourceFile
}

func (c *ParseCache) Ref(file *ast.SourceFile) {
	key := newParseCacheKey(file.ParseOptions(), file.ScriptKind)
	if entry, ok := c.entries.Load(key); ok {
		entry.mu.Lock()
		if entry.refCount <= 0 && !c.Options.DisableDeletion {
			// Entry was deleted while we were acquiring the lock
			newEntry, loaded := c.loadOrStoreNewLockedEntry(key)
			if !loaded {
				newEntry.sourceFile = entry.sourceFile
				newEntry.hash = entry.hash
			}
			entry.mu.Unlock()
			newEntry.mu.Unlock()
			return
		}
		entry.refCount++
		entry.mu.Unlock()
	} else {
		panic("parse cache entry not found")
	}
}

func (c *ParseCache) Deref(file *ast.SourceFile) {
	key := newParseCacheKey(file.ParseOptions(), file.ScriptKind)
	if entry, ok := c.entries.Load(key); ok {
		entry.mu.Lock()
		entry.refCount--
		remove := entry.refCount <= 0
		if !c.Options.DisableDeletion && remove {
			c.entries.Delete(key)
		}
		entry.mu.Unlock()
	}
}

// loadOrStoreNewLockedEntry loads an existing entry or creates a new one. The returned
// entry's mutex is locked and its refCount is incremented (or initialized to 1 in the
// case of a new entry).
func (c *ParseCache) loadOrStoreNewLockedEntry(key parseCacheKey) (*parseCacheEntry, bool) {
	entry := &parseCacheEntry{refCount: 1}
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
