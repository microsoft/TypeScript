package project

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type registryKey struct {
	ast.SourceFileParseOptions
	scriptKind core.ScriptKind
}

func newRegistryKey(opts ast.SourceFileParseOptions, scriptKind core.ScriptKind) registryKey {
	return registryKey{
		SourceFileParseOptions: opts,
		scriptKind:             scriptKind,
	}
}

type registryEntry struct {
	sourceFile *ast.SourceFile
	version    int
	refCount   int
	mu         sync.Mutex
}

type DocumentRegistryHooks struct {
	OnReleaseDocument func(file *ast.SourceFile)
}

// The document registry represents a store of SourceFile objects that can be shared between
// multiple LanguageService instances.
type DocumentRegistry struct {
	Options         tspath.ComparePathsOptions
	Hooks           DocumentRegistryHooks
	documents       collections.SyncMap[registryKey, *registryEntry]
	parsedFileCache ParsedFileCache
}

// AcquireDocument gets a SourceFile from the registry if it exists as the same version tracked
// by the ScriptInfo. If it does not exist, or is out of date, it creates a new SourceFile and
// stores it, tracking that the caller has referenced it. If an oldSourceFile is passed, the registry
// will decrement its reference count and remove it from the registry if the count reaches 0.
// (If the old file and new file have the same key, this results in a no-op to the ref count.)
//
// This code is greatly simplified compared to the old TS codebase because of the lack of
// incremental parsing. Previously, source files could be updated and reused by the same
// LanguageService instance over time, as well as across multiple instances. Here, we still
// reuse files across multiple LanguageServices, but we only reuse them across Program updates
// when the files haven't changed.
func (r *DocumentRegistry) AcquireDocument(scriptInfo *ScriptInfo, opts ast.SourceFileParseOptions, oldSourceFile *ast.SourceFile) *ast.SourceFile {
	key := newRegistryKey(opts, scriptInfo.scriptKind)
	document := r.getDocumentWorker(scriptInfo, key)
	if oldSourceFile != nil {
		r.releaseDocumentWithKey(key)
	}
	return document
}

func (r *DocumentRegistry) ReleaseDocument(file *ast.SourceFile) {
	key := newRegistryKey(file.ParseOptions(), file.ScriptKind)
	r.releaseDocumentWithKey(key)
}

func (r *DocumentRegistry) releaseDocumentWithKey(key registryKey) {
	if entry, ok := r.documents.Load(key); ok {
		entry.mu.Lock()
		defer entry.mu.Unlock()
		entry.refCount--
		if entry.refCount == 0 {
			r.documents.Delete(key)
			if r.Hooks.OnReleaseDocument != nil {
				r.Hooks.OnReleaseDocument(entry.sourceFile)
			}
		}
	}
}

func (r *DocumentRegistry) getDocumentWorker(scriptInfo *ScriptInfo, key registryKey) *ast.SourceFile {
	scriptInfoVersion := scriptInfo.Version()
	scriptInfoText := scriptInfo.Text()
	if entry, ok := r.documents.Load(key); ok {
		// We have an entry for this file. However, it may be for a different version of
		// the script snapshot. If so, update it appropriately.
		if entry.version != scriptInfoVersion {
			sourceFile := r.getParsedFile(key.SourceFileParseOptions, scriptInfoText, key.scriptKind)
			entry.mu.Lock()
			defer entry.mu.Unlock()
			entry.sourceFile = sourceFile
			entry.version = scriptInfoVersion
		}
		entry.refCount++
		return entry.sourceFile
	} else {
		// Have never seen this file with these settings. Create a new source file for it.
		sourceFile := r.getParsedFile(key.SourceFileParseOptions, scriptInfoText, key.scriptKind)
		entry, _ := r.documents.LoadOrStore(key, &registryEntry{
			sourceFile: sourceFile,
			refCount:   0,
			version:    scriptInfoVersion,
		})
		entry.mu.Lock()
		defer entry.mu.Unlock()
		entry.refCount++
		return entry.sourceFile
	}
}

func (r *DocumentRegistry) getFileVersion(file *ast.SourceFile) int {
	key := newRegistryKey(file.ParseOptions(), file.ScriptKind)
	if entry, ok := r.documents.Load(key); ok && entry.sourceFile == file {
		return entry.version
	}
	return -1
}

func (r *DocumentRegistry) getParsedFile(opts ast.SourceFileParseOptions, text string, scriptKind core.ScriptKind) *ast.SourceFile {
	if r.parsedFileCache != nil {
		if file := r.parsedFileCache.GetFile(opts, text, scriptKind); file != nil {
			return file
		}
	}
	file := parser.ParseSourceFile(opts, text, scriptKind)
	if r.parsedFileCache != nil {
		r.parsedFileCache.CacheFile(opts, text, scriptKind, file)
	}
	return file
}

// size should only be used for testing.
func (r *DocumentRegistry) size() int {
	return r.documents.Size()
}

type ParsedFileCache interface {
	GetFile(opts ast.SourceFileParseOptions, text string, scriptKind core.ScriptKind) *ast.SourceFile
	CacheFile(opts ast.SourceFileParseOptions, text string, scriptKind core.ScriptKind, sourceFile *ast.SourceFile)
}
