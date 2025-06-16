package project

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

// DocumentStore manages ScriptInfo instances and the DocumentRegistry
// with thread-safe operations.
type DocumentStore struct {
	documentRegistry *DocumentRegistry

	scriptInfosMu sync.RWMutex
	scriptInfos   map[tspath.Path]*ScriptInfo

	// Contains all the deleted script info's version information so that
	// it does not reset when creating script info again
	filenameToScriptInfoVersion map[tspath.Path]int

	realpathToScriptInfosMu sync.Mutex
	realpathToScriptInfos   map[tspath.Path]map[*ScriptInfo]struct{}
}

// DocumentStoreOptions contains options for creating a DocumentStore
type DocumentStoreOptions struct {
	ComparePathsOptions tspath.ComparePathsOptions
	ParsedFileCache     ParsedFileCache
	Hooks               DocumentRegistryHooks
}

// NewDocumentStore creates a new DocumentStore with the given options
func NewDocumentStore(options DocumentStoreOptions) *DocumentStore {
	return &DocumentStore{
		documentRegistry: &DocumentRegistry{
			Options:         options.ComparePathsOptions,
			parsedFileCache: options.ParsedFileCache,
			Hooks:           options.Hooks,
		},
		scriptInfos:                 make(map[tspath.Path]*ScriptInfo),
		filenameToScriptInfoVersion: make(map[tspath.Path]int),
		realpathToScriptInfos:       make(map[tspath.Path]map[*ScriptInfo]struct{}),
	}
}

// DocumentRegistry returns the document registry
func (ds *DocumentStore) DocumentRegistry() *DocumentRegistry {
	return ds.documentRegistry
}

// GetScriptInfoByPath returns the ScriptInfo for the given path, or nil if not found
func (ds *DocumentStore) GetScriptInfoByPath(path tspath.Path) *ScriptInfo {
	ds.scriptInfosMu.RLock()
	defer ds.scriptInfosMu.RUnlock()
	if info, ok := ds.scriptInfos[path]; ok && !info.deferredDelete {
		return info
	}
	return nil
}

// GetOrCreateScriptInfo creates or returns an existing ScriptInfo for the given file
func (ds *DocumentStore) GetOrCreateScriptInfo(fileName string, path tspath.Path, scriptKind core.ScriptKind, fs vfs.FS) *ScriptInfo {
	return ds.getOrCreateScriptInfoWorker(fileName, path, scriptKind, false, "", true, fs)
}

// GetOrCreateOpenScriptInfo creates or returns an existing ScriptInfo for an opened file
func (ds *DocumentStore) GetOrCreateOpenScriptInfo(fileName string, path tspath.Path, fileContent string, scriptKind core.ScriptKind, fs vfs.FS) *ScriptInfo {
	return ds.getOrCreateScriptInfoWorker(fileName, path, scriptKind, true, fileContent, true, fs)
}

// getOrCreateScriptInfoWorker is the internal implementation for creating/getting ScriptInfo
func (ds *DocumentStore) getOrCreateScriptInfoWorker(fileName string, path tspath.Path, scriptKind core.ScriptKind, openedByClient bool, fileContent string, deferredDeleteOk bool, fs vfs.FS) *ScriptInfo {
	ds.scriptInfosMu.RLock()
	info, ok := ds.scriptInfos[path]
	ds.scriptInfosMu.RUnlock()

	var fromDisk bool
	if !ok {
		if !openedByClient && !isDynamicFileName(fileName) {
			if content, ok := fs.ReadFile(fileName); !ok {
				return nil
			} else {
				fileContent = content
				fromDisk = true
			}
		}

		info = NewScriptInfo(fileName, path, scriptKind, fs)
		if fromDisk {
			info.SetTextFromDisk(fileContent)
		}

		ds.scriptInfosMu.Lock()
		defer ds.scriptInfosMu.Unlock()
		if prevVersion, ok := ds.filenameToScriptInfoVersion[path]; ok {
			info.version = prevVersion + 1
			delete(ds.filenameToScriptInfoVersion, path)
		}
		ds.scriptInfos[path] = info
	} else if info.deferredDelete {
		if !openedByClient && !fs.FileExists(fileName) {
			// If the file is not opened by client and the file does not exist on the disk, return
			return core.IfElse(deferredDeleteOk, info, nil)
		}
		info.deferredDelete = false
	}

	if openedByClient {
		info.open(fileContent)
	}

	return info
}

// DeleteScriptInfo removes a ScriptInfo from the store
func (ds *DocumentStore) DeleteScriptInfo(info *ScriptInfo) {
	ds.scriptInfosMu.Lock()
	defer ds.scriptInfosMu.Unlock()

	ds.filenameToScriptInfoVersion[info.path] = info.version
	delete(ds.scriptInfos, info.path)

	realpath := info.realpath
	if realpath != "" {
		ds.realpathToScriptInfosMu.Lock()
		defer ds.realpathToScriptInfosMu.Unlock()
		delete(ds.realpathToScriptInfos[realpath], info)
	}
}

// AddRealpathMapping adds a realpath mapping for a ScriptInfo
func (ds *DocumentStore) AddRealpathMapping(info *ScriptInfo) {
	ds.realpathToScriptInfosMu.Lock()
	defer ds.realpathToScriptInfosMu.Unlock()
	if scriptInfos, ok := ds.realpathToScriptInfos[info.realpath]; ok {
		scriptInfos[info] = struct{}{}
	} else {
		ds.realpathToScriptInfos[info.realpath] = map[*ScriptInfo]struct{}{
			info: {},
		}
	}
}

// SourceFileCount returns the number of documents in the registry
func (ds *DocumentStore) SourceFileCount() int {
	return ds.documentRegistry.size()
}

func (ds *DocumentStore) ScriptInfoCount() int {
	return len(ds.scriptInfos)
}

// ForEachScriptInfo calls the given function for each ScriptInfo in the store
func (ds *DocumentStore) ForEachScriptInfo(fn func(info *ScriptInfo)) {
	ds.scriptInfosMu.RLock()
	defer ds.scriptInfosMu.RUnlock()
	for _, info := range ds.scriptInfos {
		if !info.deferredDelete {
			fn(info)
		}
	}
}
