package project

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type registryKey struct {
	core.SourceFileAffectingCompilerOptions
	path       tspath.Path
	scriptKind core.ScriptKind
}

func newRegistryKey(options *core.CompilerOptions, path tspath.Path, scriptKind core.ScriptKind) registryKey {
	return registryKey{
		SourceFileAffectingCompilerOptions: options.SourceFileAffecting(),
		path:                               path,
		scriptKind:                         scriptKind,
	}
}

type registryEntry struct {
	sourceFile *ast.SourceFile
	refCount   int
	mu         sync.Mutex
}

// The document registry represents a store of SourceFile objects that can be shared between
// multiple LanguageService instances.
type documentRegistry struct {
	options   tspath.ComparePathsOptions
	documents sync.Map
}

func newDocumentRegistry(options tspath.ComparePathsOptions) *documentRegistry {
	return &documentRegistry{
		options: options,
	}
}

// acquireDocument gets a SourceFile from the registry if it exists as the same version tracked
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
func (r *documentRegistry) acquireDocument(scriptInfo *ScriptInfo, compilerOptions *core.CompilerOptions, oldSourceFile *ast.SourceFile, oldCompilerOptions *core.CompilerOptions) *ast.SourceFile {
	key := newRegistryKey(compilerOptions, scriptInfo.path, scriptInfo.scriptKind)
	document := r.getDocumentWorker(scriptInfo, compilerOptions, key)
	if oldSourceFile != nil && oldCompilerOptions != nil {
		oldKey := newRegistryKey(oldCompilerOptions, scriptInfo.path, oldSourceFile.ScriptKind)
		r.releaseDocumentWithKey(oldKey)
	}
	return document
}

func (r *documentRegistry) releaseDocument(file *ast.SourceFile, compilerOptions *core.CompilerOptions) {
	key := newRegistryKey(compilerOptions, file.Path(), file.ScriptKind)
	r.releaseDocumentWithKey(key)
}

func (r *documentRegistry) releaseDocumentWithKey(key registryKey) {
	if entryAny, ok := r.documents.Load(key); ok {
		entry := entryAny.(*registryEntry)
		entry.mu.Lock()
		defer entry.mu.Unlock()
		entry.refCount--
		if entry.refCount == 0 {
			r.documents.Delete(key)
		}
	}
}

func (r *documentRegistry) getDocumentWorker(
	scriptInfo *ScriptInfo,
	compilerOptions *core.CompilerOptions,
	key registryKey,
) *ast.SourceFile {
	scriptTarget := core.IfElse(scriptInfo.scriptKind == core.ScriptKindJSON, core.ScriptTargetJSON, compilerOptions.GetEmitScriptTarget())
	if entryAny, ok := r.documents.Load(key); ok {
		// We have an entry for this file. However, it may be for a different version of
		// the script snapshot. If so, update it appropriately.
		entry := entryAny.(*registryEntry)
		if entry.sourceFile.Version != scriptInfo.version {
			sourceFile := parser.ParseSourceFile(scriptInfo.fileName, scriptInfo.path, scriptInfo.text, scriptTarget, scanner.JSDocParsingModeParseAll)
			sourceFile.Version = scriptInfo.version
			entry.mu.Lock()
			defer entry.mu.Unlock()
			entry.sourceFile = sourceFile
		}
		entry.refCount++
		return entry.sourceFile
	} else {
		// Have never seen this file with these settings. Create a new source file for it.
		sourceFile := parser.ParseSourceFile(scriptInfo.fileName, scriptInfo.path, scriptInfo.text, scriptTarget, scanner.JSDocParsingModeParseAll)
		sourceFile.Version = scriptInfo.version
		entryAny, _ := r.documents.LoadOrStore(key, &registryEntry{
			sourceFile: sourceFile,
			refCount:   0,
		})
		entry := entryAny.(*registryEntry)
		entry.mu.Lock()
		defer entry.mu.Unlock()
		entry.refCount++
		return entry.sourceFile
	}
}

// size should only be used for testing.
func (r *documentRegistry) size() int {
	count := 0
	r.documents.Range(func(_, _ any) bool {
		count++
		return true
	})
	return count
}
