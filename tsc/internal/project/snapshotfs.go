package project

import (
	"maps"
	"slices"
	"strings"
	"sync"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project/dirty"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/cachedvfs"
	"github.com/zeebo/xxh3"
)

type FileHandleSource interface {
	GetFile(fileName tspath.RootedFilePath) FileHandle
	GetFileByPath(fileName tspath.RootedFilePath, path tspath.PathKey) FileHandle
}

type FileSource interface {
	FS() vfs.FS
	FileHandleSource
	FileExists(fileName tspath.RootedFilePath, path tspath.PathKey) bool
	GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries
}

type cachedLayeredFileSystem struct {
	*cachedvfs.FS
	layered LayeredFileSystem
}

func newCachedLayeredFileSystem(fileSystem LayeredFileSystem) LayeredFileSystem {
	return &cachedLayeredFileSystem{
		FS:      cachedvfs.From(fileSystem),
		layered: fileSystem,
	}
}

func (fs *cachedLayeredFileSystem) GetFile(fileName tspath.RootedFilePath) FileHandle {
	return fs.layered.GetFile(fileName)
}

func (fs *cachedLayeredFileSystem) GetFileByPath(fileName tspath.RootedFilePath, path tspath.PathKey) FileHandle {
	return fs.layered.GetFileByPath(fileName, path)
}

func (fs *cachedLayeredFileSystem) Overlays() map[tspath.PathKey]*Overlay {
	return fs.layered.Overlays()
}

func (fs *cachedLayeredFileSystem) ExpandFileChanges(change FileChangeSummary) FileChangeSummary {
	if expander, ok := fs.layered.(FileChangeExpander); ok {
		return expander.ExpandFileChanges(change)
	}
	return change
}

var (
	_ FileSource = (*snapshotFSBuilder)(nil)
	_ FileSource = (*SnapshotFS)(nil)
)

// realpathAliasSet is a thread-safe set of symlink paths that alias a single realpath.
// It implements dirty.Cloneable so it can be used as a value in dirty.SyncMap.
type aliasPaths map[tspath.PathKey]tspath.RootedFilePath

func (p aliasPaths) Has(path tspath.PathKey) bool {
	_, ok := p[path]
	return ok
}

func (p aliasPaths) Len() int {
	return len(p)
}

type realpathAliasSet struct {
	mu    sync.Mutex
	paths aliasPaths
}

func (s *realpathAliasSet) Add(path tspath.PathKey, fileName tspath.RootedFilePath) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.paths == nil {
		s.paths = make(aliasPaths)
	}
	s.paths[path] = fileName
}

func (s *realpathAliasSet) Clone() *realpathAliasSet {
	s.mu.Lock()
	defer s.mu.Unlock()
	clone := &realpathAliasSet{}
	clone.paths = maps.Clone(s.paths)
	return clone
}

type SnapshotFS struct {
	caseSensitivity  tspath.CaseSensitivity
	fs               LayeredFileSystem
	cacheFiles       map[tspath.PathKey]*cachedFile
	cacheDirectories map[tspath.PathKey]dirty.CloneableMap[tspath.PathKey, string]
	readFiles        collections.SyncMap[tspath.PathKey, memoizedCachedFile]
	// nodeModulesRealpathAliases maps realpath-based keys to sets of symlink-based keys,
	// for files inside node_modules that are accessed through directory symlinks.
	// This allows watch events (which use realpaths) to invalidate files cached under symlink paths.
	nodeModulesRealpathAliases map[tspath.PathKey]*realpathAliasSet
}

type memoizedCachedFile func() FileHandle

func (s *SnapshotFS) FS() vfs.FS {
	return s.fs
}

func (s *SnapshotFS) GetFile(fileName tspath.RootedFilePath) FileHandle {
	return s.GetFileByPath(fileName, s.caseSensitivity.PathKey(fileName.AsPath()))
}

func (s *SnapshotFS) FileExists(fileName tspath.RootedFilePath, path tspath.PathKey) bool {
	if _, ok := s.cacheFiles[path]; ok {
		return true
	}
	return s.fs.FileExists(fileName)
}

func (s *SnapshotFS) GetFileByPath(fileName tspath.RootedFilePath, path tspath.PathKey) FileHandle {
	if file, ok := s.cacheFiles[path]; ok {
		return file
	}
	newEntry := memoizedCachedFile(sync.OnceValue(func() FileHandle {
		return s.fs.GetFileByPath(fileName, path)
	}))
	entry, _ := s.readFiles.LoadOrStore(path, newEntry)
	return entry()
}

func (s *SnapshotFS) GetAccessibleEntries(directoryName tspath.RootedDirectoryPath) vfs.Entries {
	lowerEntries := s.fs.GetAccessibleEntries(directoryName)
	directory, ok := s.cacheDirectories[s.caseSensitivity.PathKey(directoryName.AsPath())]
	if !ok {
		return lowerEntries
	}
	return mergeCachedDirectoryEntries(lowerEntries, directory, func(path tspath.PathKey, childName string) bool {
		_, cached := s.cacheFiles[path]
		return cached || s.fs.FileExists(directoryName.ResolveFile(childName))
	}, s.fs.CaseSensitivity())
}

func mergeCachedDirectoryEntries(directoryEntries vfs.Entries, cachedEntries dirty.CloneableMap[tspath.PathKey, string], isCachedFile func(tspath.PathKey, string) bool, caseSensitivity tspath.CaseSensitivity) vfs.Entries {
	entries := vfs.Entries{Symlinks: maps.Clone(directoryEntries.Symlinks)}
	equalName := func(left string, right string) bool {
		return caseSensitivity.GetComparer()(left, right) == 0
	}
	hasName := func(names []string, name string) bool {
		return slices.ContainsFunc(names, func(candidate string) bool { return equalName(candidate, name) })
	}
	for childPath, childName := range cachedEntries {
		for name := range entries.Symlinks {
			if equalName(name, childName) {
				delete(entries.Symlinks, name)
			}
		}
		if isCachedFile(childPath, childName) {
			entries.Files = append(entries.Files, childName)
		} else {
			entries.Directories = append(entries.Directories, childName)
		}
	}
	for _, fileName := range directoryEntries.Files {
		if !hasName(entries.Files, fileName) && !hasName(entries.Directories, fileName) {
			entries.Files = append(entries.Files, fileName)
		}
	}
	for _, directoryName := range directoryEntries.Directories {
		if !hasName(entries.Files, directoryName) && !hasName(entries.Directories, directoryName) {
			entries.Directories = append(entries.Directories, directoryName)
		}
	}
	return entries
}

type snapshotFSBuilder struct {
	fs                         LayeredFileSystem
	cacheFiles                 *dirty.SyncMap[tspath.PathKey, *cachedFile]
	cacheDirectories           *dirty.Map[tspath.PathKey, dirty.CloneableMap[tspath.PathKey, string]]
	sourceBackedReplacements   collections.Set[tspath.PathKey]
	nodeModulesRealpathAliases *dirty.SyncMap[tspath.PathKey, *realpathAliasSet]
	caseSensitivity            tspath.CaseSensitivity
}

func newSnapshotFSBuilderFromSource(
	fs LayeredFileSystem,
	cacheFiles map[tspath.PathKey]*cachedFile,
	cacheDirectories map[tspath.PathKey]dirty.CloneableMap[tspath.PathKey, string],
	nodeModulesRealpathAliases map[tspath.PathKey]*realpathAliasSet,
) *snapshotFSBuilder {
	fs = newCachedLayeredFileSystem(fs)

	return &snapshotFSBuilder{
		fs:                         fs,
		cacheFiles:                 dirty.NewSyncMap(cacheFiles),
		cacheDirectories:           dirty.NewMap(cacheDirectories),
		nodeModulesRealpathAliases: dirty.NewSyncMap(nodeModulesRealpathAliases),
		caseSensitivity:            fs.CaseSensitivity(),
	}
}

func (s *snapshotFSBuilder) FS() vfs.FS {
	return s.fs
}

func (s *snapshotFSBuilder) Finalize() (*SnapshotFS, bool) {
	// Synchronize directory structure based on added and deleted cache entries.
	var onDeletedFileOrDirectory func(path tspath.PathKey)
	var deleted map[tspath.PathKey]*cachedFile

	onAddedFile := func(path tspath.PathKey, fileName tspath.RootedFilePath) {
		childPath := path
		child := fileName.AsPath()
		for {
			parentPath := childPath.Parent()
			parent := child.Directory()
			if childPath == parentPath {
				break // reached root
			}
			baseName := child.BaseName()
			if dirEntry, ok := s.cacheDirectories.Get(parentPath); ok {
				dirEntry.Change(func(dir dirty.CloneableMap[tspath.PathKey, string]) {
					dir[childPath] = baseName
				})
				break
			} else {
				dir := make(dirty.CloneableMap[tspath.PathKey, string])
				dir[childPath] = baseName
				s.cacheDirectories.Add(parentPath, dir)
			}
			childPath = parentPath
			child = parent.AsPath()
		}
	}

	onDeletedFileOrDirectory = func(path tspath.PathKey) {
		dirEntry, ok := s.cacheDirectories.Get(path.Parent())
		if !ok {
			return
		}
		dirEntry.Change(func(dir dirty.CloneableMap[tspath.PathKey, string]) {
			delete(dir, path)
			if len(dir) == 0 {
				dirEntry.Delete()
				onDeletedFileOrDirectory(dirEntry.Key())
			}
		})
	}

	cacheFiles, changed := s.cacheFiles.FinalizeWith(dirty.FinalizationHooks[tspath.PathKey, *cachedFile]{
		OnDelete: func(key tspath.PathKey, value *cachedFile) {
			if s.sourceBackedReplacements.Has(key) {
				return
			}
			if deleted == nil {
				deleted = make(map[tspath.PathKey]*cachedFile)
			}
			deleted[key] = value
		},
		OnAdd: func(key tspath.PathKey, value *cachedFile) {
			onAddedFile(key, value.FileName())
		},
	})

	for path := range deleted {
		onDeletedFileOrDirectory(path)
	}

	// Prune deleted symlink paths from realpath alias sets before finalizing,
	// so that empty sets are dropped during finalization.
	for deletedPath, deletedFile := range deleted {
		if deletedFile.realpathPath == "" {
			continue
		}
		if entry, ok := s.nodeModulesRealpathAliases.Load(deletedFile.realpathPath); ok {
			entry.Locked(func(e dirty.Value[*realpathAliasSet]) {
				e.Change(func(aliasSet *realpathAliasSet) {
					delete(aliasSet.paths, deletedPath)
				})
				if e.Value().paths.Len() == 0 {
					e.Delete()
				}
			})
		}
	}

	nodeModulesRealpathAliases, aliasesChanged := s.nodeModulesRealpathAliases.Finalize()

	return &SnapshotFS{
		caseSensitivity:            s.caseSensitivity,
		fs:                         s.fs,
		cacheFiles:                 cacheFiles,
		cacheDirectories:           core.FirstResult(s.cacheDirectories.Finalize()),
		nodeModulesRealpathAliases: nodeModulesRealpathAliases,
	}, changed || aliasesChanged
}

func (s *snapshotFSBuilder) GetFile(fileName tspath.RootedFilePath) FileHandle {
	path := s.caseSensitivity.PathKey(fileName.AsPath())
	return s.GetFileByPath(fileName, path)
}

func (s *snapshotFSBuilder) deleteCacheEntry(entry *dirty.SyncMapEntry[tspath.PathKey, *cachedFile]) {
	if file := entry.Value(); file != nil && s.fs.FileExists(file.FileName()) {
		s.sourceBackedReplacements.Add(entry.Key())
	}
	entry.Delete()
}

func (s *snapshotFSBuilder) FileExists(fileName tspath.RootedFilePath, path tspath.PathKey) bool {
	if entry, ok := s.cacheFiles.Load(path); ok {
		val := entry.Value()
		if val == nil {
			return false
		}
		// Entry may be dirty - reload to check current state in the source filesystem.
		return s.reloadEntryIfNeeded(entry) != nil
	}
	// Path never loaded into cacheFiles - use cached stat (no file read).
	return s.fs.FileExists(fileName)
}

func (s *snapshotFSBuilder) GetFileByPath(fileName tspath.RootedFilePath, path tspath.PathKey) FileHandle {
	if entry, ok := s.cacheFiles.Load(path); ok {
		return s.reloadEntryIfNeeded(entry)
	}
	file := s.fs.GetFileByPath(fileName, path)
	if file == nil || file.IsOverlay() {
		return file
	}
	return s.cacheSourceFile(fileName, path, file)
}

func (s *snapshotFSBuilder) GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries {
	lowerEntries := s.fs.GetAccessibleEntries(path)
	directory, ok := s.cacheDirectories.Get(s.caseSensitivity.PathKey(path.AsPath()))
	if !ok {
		return lowerEntries
	}
	return mergeCachedDirectoryEntries(lowerEntries, directory.Value(), func(key tspath.PathKey, childName string) bool {
		entry, cached := s.cacheFiles.Load(key)
		return cached && entry.Value() != nil || s.fs.FileExists(path.ResolveFile(childName))
	}, s.fs.CaseSensitivity())
}

func (s *snapshotFSBuilder) cacheSourceFile(fileName tspath.RootedFilePath, path tspath.PathKey, source FileHandle) FileHandle {
	file := newCachedFile(fileName, source.Content())
	file.hash = source.Hash()
	entry, loaded := s.cacheFiles.LoadOrStore(path, file)
	if entry == nil {
		return nil
	}
	if !loaded && strings.Contains(string(path), "/node_modules/") {
		s.recordRealpathAlias(entry, fileName, path)
	}
	return s.reloadEntryIfNeeded(entry)
}

func (s *snapshotFSBuilder) getCachedFile(fileName tspath.RootedFilePath, path tspath.PathKey, forceReload bool) FileHandle {
	entry, loaded := s.cacheFiles.LoadOrStore(path, &cachedFile{fileName: fileName, needsReload: true})
	if entry != nil {
		if !loaded && strings.Contains(string(path), "/node_modules/") {
			s.recordRealpathAlias(entry, fileName, path)
		}
		if forceReload {
			return s.reloadEntry(entry)
		}
		return s.reloadEntryIfNeeded(entry)
	}
	return nil
}

// recordRealpathAlias checks if fileName is accessed through a symlink and, if so,
// records a mapping from the realpath-based key to the symlink-based key.
// This is only called for files inside node_modules where symlinks are common.
func (s *snapshotFSBuilder) recordRealpathAlias(cachedFileEntry *dirty.SyncMapEntry[tspath.PathKey, *cachedFile], symlinkFileName tspath.RootedFilePath, symlinkPath tspath.PathKey) {
	realpath := tspath.RootedFilePathFromPath(s.fs.Realpath(symlinkFileName.AsPath()))
	realpathPath := s.caseSensitivity.PathKey(realpath.AsPath())
	if realpathPath != symlinkPath {
		cachedFileEntry.Change(func(file *cachedFile) {
			file.realpathPath = realpathPath
		})
		entry, _ := s.nodeModulesRealpathAliases.LoadOrStore(realpathPath, &realpathAliasSet{})
		entry.Change(func(aliasSet *realpathAliasSet) {
			aliasSet.Add(symlinkPath, symlinkFileName)
		})
	}
}

func (s *snapshotFSBuilder) reloadEntry(entry *dirty.SyncMapEntry[tspath.PathKey, *cachedFile]) FileHandle {
	var fileName tspath.RootedFilePath
	entry.Locked(func(e dirty.Value[*cachedFile]) {
		if e.Value() != nil {
			fileName = e.Value().fileName
		}
	})
	if fileName == "" {
		return nil
	}
	// Read file outside the lock to avoid blocking other goroutines.
	content, ok := s.fs.ReadFile(fileName)
	entry.Locked(func(e dirty.Value[*cachedFile]) {
		if e.Value() == nil {
			return
		}
		if ok {
			e.Change(func(file *cachedFile) {
				file.content = content
				file.hash = xxh3.HashString128(content)
				file.needsReload = false
			})
		} else {
			e.Delete()
		}
	})
	if entry.Value() == nil {
		return nil
	}
	return entry.Value()
}

func (s *snapshotFSBuilder) reloadEntryIfNeeded(entry *dirty.SyncMapEntry[tspath.PathKey, *cachedFile]) FileHandle {
	var fileName tspath.RootedFilePath
	entry.Locked(func(e dirty.Value[*cachedFile]) {
		if e.Value() != nil && !e.Value().MatchesDiskText() {
			fileName = e.Value().fileName
		}
	})
	if fileName != "" {
		// Read file outside the lock to avoid blocking other goroutines.
		content, ok := s.fs.ReadFile(fileName)
		entry.Locked(func(e dirty.Value[*cachedFile]) {
			if e.Value() == nil || e.Value().MatchesDiskText() {
				return // another goroutine already reloaded it
			}
			if ok {
				e.Change(func(file *cachedFile) {
					file.content = content
					file.hash = xxh3.HashString128(content)
					file.needsReload = false
				})
			} else {
				e.Delete()
			}
		})
	}
	if entry.Value() == nil {
		return nil
	}
	return entry.Value()
}

func (s *snapshotFSBuilder) watchChangesOverlapCache(change FileChangeSummary, previousOpenFiles map[tspath.PathKey]FileHandle, openFiles map[tspath.PathKey]FileHandle) bool {
	for uri := range change.Changed.Keys() {
		path := s.caseSensitivity.PathKey(uri.FileName().AsPath())
		if previousOpenFiles[path] != nil || openFiles[path] != nil {
			return true
		}
		if _, ok := s.cacheFiles.Load(path); ok {
			return true
		}
		if _, ok := s.nodeModulesRealpathAliases.Load(path); ok {
			return true
		}
	}
	for uri := range change.Deleted.Keys() {
		path := s.caseSensitivity.PathKey(uri.FileName().AsPath())
		if previousOpenFiles[path] != nil || openFiles[path] != nil {
			return true
		}
		if _, ok := s.cacheFiles.Load(path); ok {
			return true
		}
		if _, ok := s.nodeModulesRealpathAliases.Load(path); ok {
			return true
		}
	}
	return false
}

func (s *snapshotFSBuilder) invalidateCache() {
	s.cacheFiles.Range(func(entry *dirty.SyncMapEntry[tspath.PathKey, *cachedFile]) bool {
		entry.Change(func(file *cachedFile) {
			file.needsReload = true
		})
		return true
	})
}

func (s *snapshotFSBuilder) invalidateNodeModulesCache() {
	s.cacheFiles.Range(func(entry *dirty.SyncMapEntry[tspath.PathKey, *cachedFile]) bool {
		if strings.Contains(string(entry.Key()), "/node_modules/") {
			entry.Change(func(file *cachedFile) {
				file.needsReload = true
			})
		}
		return true
	})
}

func (s *snapshotFSBuilder) markDirtyFiles(change FileChangeSummary) FileChangeSummary {
	if change.Changed.Len() > 0 {
		var filteredChanged collections.SyncSet[lsproto.DocumentUri]
		wg := core.NewWorkGroup(false)
		for uri := range change.Changed.Keys() {
			path := s.caseSensitivity.PathKey(uri.FileName().AsPath())
			if file := s.fs.GetFileByPath(uri.FileName(), path); file != nil && file.IsOverlay() {
				filteredChanged.Add(uri)
				continue
			}
			entry, ok := s.cacheFiles.Load(path)
			if !ok {
				filteredChanged.Add(uri)
				continue
			}
			wg.Queue(func() {
				if s.reloadEntryIfContentChanged(entry) {
					filteredChanged.Add(uri)
				}
			})
		}
		wg.RunAndWait()
		newChanged := collections.NewSetWithSizeHint[lsproto.DocumentUri](filteredChanged.Size())
		for uri := range filteredChanged.Keys() {
			newChanged.Add(uri)
		}
		change.Changed = *newChanged
	}
	for uri := range change.Deleted.Keys() {
		path := s.caseSensitivity.PathKey(uri.FileName().AsPath())
		if entry, ok := s.cacheFiles.Load(path); ok {
			s.deleteCacheEntry(entry)
		}
	}
	return change
}

func (s *snapshotFSBuilder) reloadEntryIfContentChanged(entry *dirty.SyncMapEntry[tspath.PathKey, *cachedFile]) (changed bool) {
	file := entry.Value()
	if file == nil {
		return true
	}
	content, ok := s.fs.ReadFile(file.fileName)
	changed = true
	entry.Locked(func(e dirty.Value[*cachedFile]) {
		cur := e.Value()
		if cur == nil {
			return
		}
		if !ok {
			e.Delete()
			return
		}
		if content == cur.content {
			changed = false
			if !cur.MatchesDiskText() {
				e.Change(func(file *cachedFile) {
					file.needsReload = false
				})
			}
			return
		}
		e.Change(func(file *cachedFile) {
			file.content = content
			file.hash = xxh3.HashString128(content)
			file.needsReload = false
		})
	})
	return changed
}

// expandRealpathAliases adds synthetic URIs to the Changed and Deleted sets for
// files that were accessed through node_modules symlinks. When a watch event arrives
// using a realpath, this expands it to include the symlink-based path so that
// downstream consumers (markDirtyFiles, markFilesChanged) can find cached entries.
func (s *SnapshotFS) expandRealpathAliases(change FileChangeSummary) FileChangeSummary {
	if len(s.nodeModulesRealpathAliases) == 0 {
		return change
	}

	var additionalChanged collections.Set[lsproto.DocumentUri]
	for uri := range change.Changed.Keys() {
		path := s.caseSensitivity.PathKey(uri.FileName().AsPath())
		if aliases, ok := s.nodeModulesRealpathAliases[path]; ok {
			for _, aliasFileName := range aliases.paths {
				additionalChanged.Add(lsconv.FileNameToDocumentURI(aliasFileName))
			}
		}
	}
	for uri := range additionalChanged.Keys() {
		change.Changed.Add(uri)
	}

	var additionalDeleted collections.Set[lsproto.DocumentUri]
	for uri := range change.Deleted.Keys() {
		path := s.caseSensitivity.PathKey(uri.FileName().AsPath())
		if aliases, ok := s.nodeModulesRealpathAliases[path]; ok {
			for _, aliasFileName := range aliases.paths {
				additionalDeleted.Add(lsconv.FileNameToDocumentURI(aliasFileName))
			}
		}
	}
	for uri := range additionalDeleted.Keys() {
		change.Deleted.Add(uri)
	}

	return change
}

// isRelevantFileName returns true if the given URI refers to a file that
// could affect the project: it has a TypeScript-relevant or configured content-mapper extension,
// is dynamic (e.g. untitled), or is present in the supplied open-file state.
func (s *snapshotFSBuilder) isRelevantFileName(uri lsproto.DocumentUri, contentMapperExtensions []string, contentMapperWatchedFiles *collections.Set[tspath.PathKey], openFiles map[tspath.PathKey]FileHandle) bool {
	fileName := uri.FileName()
	if contentMapperWatchedFiles != nil && contentMapperWatchedFiles.Has(s.caseSensitivity.PathKey(fileName.AsPath())) {
		return true
	}
	if fileName.ExtensionIsOneOf(contentMapperExtensions) {
		return true
	}
	if fileName.IsDynamic() {
		return true
	}
	if _, ok := openFiles[s.caseSensitivity.PathKey(fileName.AsPath())]; ok {
		return true
	}
	return isRelevantExtension(fileName.AnyExtension(nil, tspath.CaseSensitive))
}

// isRelevantExtension returns true if the given extension is a known TypeScript
// or JavaScript extension that can affect the project.
func isRelevantExtension(ext string) bool {
	switch ext {
	case ".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".mts", ".cts", ".json":
		return true
	}
	return false
}

// expandAndFilterWatchEvents expands directory deletion URIs into individual
// file deletion URIs using the cached directory structure, and filters out
// watch events for paths that are neither known directories nor have relevant
// file extensions.
func (s *snapshotFSBuilder) expandAndFilterWatchEvents(change FileChangeSummary, contentMapperExtensions []string, contentMapperWatchedFiles *collections.Set[tspath.PathKey], previousOpenFiles map[tspath.PathKey]FileHandle, openFiles map[tspath.PathKey]FileHandle) FileChangeSummary {
	if change.Deleted.Len() > 0 {
		var filteredDeleted collections.Set[lsproto.DocumentUri]
		for uri := range change.Deleted.Keys() {
			path := s.caseSensitivity.PathKey(uri.FileName().AsPath())
			if _, ok := s.cacheDirectories.Get(path); ok || hasOpenFileWithin(path, previousOpenFiles, openFiles) {
				s.collectFilesRecursive(path, &filteredDeleted, previousOpenFiles, openFiles)
			} else if s.isRelevantFileName(uri, contentMapperExtensions, contentMapperWatchedFiles, openFiles) || isNodeModulesPath(path) {
				// node_modules deletions must always be preserved for auto-import registry change handlers.
				// They won't be in cacheDirectories since the registry doesn't use the snapshotFSBuilder for
				// its file system, since we don't want to retain files read there.
				filteredDeleted.Add(uri)
			}
		}
		change.Deleted = filteredDeleted
	}

	if change.Changed.Len() > 0 {
		var filteredChanged collections.Set[lsproto.DocumentUri]
		for uri := range change.Changed.Keys() {
			if s.isRelevantFileName(uri, contentMapperExtensions, contentMapperWatchedFiles, openFiles) {
				filteredChanged.Add(uri)
			}
		}
		change.Changed = filteredChanged
	}

	// We can't filter created events because any created path could be a directory symlink
	// that includes relevant files. configFileRegistryBuilder will do check if these paths
	// are directories if they fall within a config's wildcard directories.

	return change
}

// isNodeModulesPath reports whether path is a node_modules directory itself or
// lives inside one. Used to preserve node_modules watch deletions, whose package
// files are read transiently and therefore never tracked in cacheDirectories.
func isNodeModulesPath(path tspath.PathKey) bool {
	s := string(path)
	return strings.HasSuffix(s, "/node_modules") || strings.Contains(s, "/node_modules/")
}

func hasOpenFileWithin(path tspath.PathKey, previousOpenFiles map[tspath.PathKey]FileHandle, openFiles map[tspath.PathKey]FileHandle) bool {
	for openFilePath := range openFiles {
		if path.ContainsPath(openFilePath) {
			return true
		}
	}
	for openFilePath := range previousOpenFiles {
		if path.ContainsPath(openFilePath) {
			return true
		}
	}
	return false
}

// collectFilesRecursive recursively collects all cached file URIs under the
// given directory path using the cacheDirectories and cacheFiles maps.
func (s *snapshotFSBuilder) collectFilesRecursive(dirPath tspath.PathKey, files *collections.Set[lsproto.DocumentUri], previousOpenFiles map[tspath.PathKey]FileHandle, openFiles map[tspath.PathKey]FileHandle) {
	for path, file := range openFiles {
		if dirPath.ContainsPath(path) {
			files.Add(lsconv.FileNameToDocumentURI(file.FileName()))
		}
	}
	for path, file := range previousOpenFiles {
		if dirPath.ContainsPath(path) {
			files.Add(lsconv.FileNameToDocumentURI(file.FileName()))
		}
	}
	dirEntry, ok := s.cacheDirectories.Get(dirPath)
	if !ok {
		return
	}
	for childPath := range dirEntry.Value() {
		if entry, ok := s.cacheFiles.Load(childPath); ok {
			if file := entry.Value(); file != nil {
				files.Add(lsconv.FileNameToDocumentURI(file.FileName()))
			}
		}
		s.collectFilesRecursive(childPath, files, previousOpenFiles, openFiles)
	}
}

func (s *snapshotFSBuilder) convertOpenAndCloseToChanges(change FileChangeSummary, previousOpenFiles map[tspath.PathKey]FileHandle, openFiles map[tspath.PathKey]FileHandle) FileChangeSummary {
	if change.Opened != "" && !change.Opened.FileName().IsDynamic() {
		path := s.caseSensitivity.PathKey(change.Opened.FileName().AsPath())
		if entry, ok := s.cacheFiles.Load(path); !ok || entry.Original() == nil {
			change.Created.Add(change.Opened)
		} else if openFile, ok := openFiles[path]; ok {
			// The file already exists in the program, but the open-file content from
			// didOpen may differ from what was originally read from the source (e.g. the
			// editor normalizes line endings, or the source file changed since the
			// project was loaded). Mark it as Changed so the project rebuilds.
			if cachedFile := entry.Original(); cachedFile != nil && openFile.Hash() != cachedFile.Hash() {
				change.Changed.Add(change.Opened)
			}
			s.deleteCacheEntry(entry)
		}
	}
	for uri := range change.Closed.Keys() {
		fileName := uri.FileName()
		if fileName.IsDynamic() {
			continue
		}
		path := s.caseSensitivity.PathKey(fileName.AsPath())
		// We may have ignored watcher events while the file was open, so force a reload.
		if fh := s.getCachedFile(fileName, path, true /*forceReload*/); fh != nil {
			if previousOpenFile := previousOpenFiles[path]; previousOpenFile != nil && fh.Hash() != previousOpenFile.Hash() {
				change.Changed.Add(uri)
			}
			continue
		}
		change.Deleted.Add(uri)
	}
	return change
}

// sourceFS is a vfs.FS that sources files from a FileSource and tracks seen files.
type sourceFS struct {
	tracking           bool
	missingDirectories *collections.SyncSet[tspath.PathKey]
	seenFiles          *collections.SyncMap[tspath.PathKey, tspath.RootedFilePath]
	source             FileSource
	caseSensitivity    tspath.CaseSensitivity
}

func newSourceFS(tracking bool, source FileSource) *sourceFS {
	fs := &sourceFS{
		tracking:        tracking,
		source:          source,
		caseSensitivity: source.FS().CaseSensitivity(),
	}
	if tracking {
		fs.seenFiles = &collections.SyncMap[tspath.PathKey, tspath.RootedFilePath]{}
		fs.missingDirectories = &collections.SyncSet[tspath.PathKey]{}
	}
	return fs
}

var _ vfs.FS = (*sourceFS)(nil)

func (fs *sourceFS) DisableTracking() {
	fs.tracking = false
}

func (fs *sourceFS) Track(fileName tspath.RootedFilePath) {
	if !fs.tracking {
		return
	}
	fs.seenFiles.Store(fs.caseSensitivity.PathKey(fileName.AsPath()), fileName)
}

func (fs *sourceFS) SeenFile(path tspath.PathKey) bool {
	if fs.seenFiles == nil {
		return false
	}
	_, ok := fs.seenFiles.Load(path)
	return ok
}

func (fs *sourceFS) SeenFileOrMissingParentDirectory(path tspath.PathKey) bool {
	if fs.seenFiles != nil {
		if _, ok := fs.seenFiles.Load(path); ok {
			return true
		}
	}
	if fs.missingDirectories != nil && !fs.missingDirectories.IsEmpty() {
		for {
			if fs.missingDirectories.Has(path) {
				return true
			}

			parent := path.Parent()
			if parent == path {
				break
			}
			path = parent
		}
	}
	return false
}

func (fs *sourceFS) GetFile(fileName tspath.RootedFilePath) FileHandle {
	fs.Track(fileName)
	return fs.source.GetFile(fileName)
}

func (fs *sourceFS) GetFileByPath(fileName tspath.RootedFilePath, path tspath.PathKey) FileHandle {
	fs.Track(fileName)
	return fs.source.GetFileByPath(fileName, path)
}

// DirectoryExists implements vfs.FS.
func (fs *sourceFS) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	exists := fs.source.FS().DirectoryExists(path)
	if !exists && fs.tracking {
		fs.missingDirectories.Add(fs.caseSensitivity.PathKey(path.AsPath()))
	}
	return exists
}

// FileExists implements vfs.FS.
func (fs *sourceFS) FileExists(path tspath.RootedFilePath) bool {
	fs.Track(path)
	return fs.source.FileExists(path, fs.caseSensitivity.PathKey(path.AsPath()))
}

// GetAccessibleEntries implements vfs.FS.
func (fs *sourceFS) GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries {
	return fs.source.GetAccessibleEntries(path)
}

// ReadFile implements vfs.FS.
func (fs *sourceFS) ReadFile(path tspath.RootedFilePath) (contents string, ok bool) {
	if fh := fs.GetFile(path); fh != nil {
		return fh.Content(), true
	}
	return "", false
}

// Realpath implements vfs.FS.
func (fs *sourceFS) Realpath(path tspath.RootedPath) tspath.RootedPath {
	return fs.source.FS().Realpath(path)
}

// Stat implements vfs.FS.
func (fs *sourceFS) Stat(path tspath.RootedPath) vfs.FileInfo {
	return fs.source.FS().Stat(path)
}

// CaseSensitivity implements vfs.FS.
func (fs *sourceFS) CaseSensitivity() tspath.CaseSensitivity {
	return fs.caseSensitivity
}

// WriteFile implements vfs.FS.
func (fs *sourceFS) WriteFile(path tspath.RootedFilePath, data string) error {
	panic("unimplemented")
}

// AppendFile implements vfs.FS.
func (fs *sourceFS) AppendFile(path tspath.RootedFilePath, data string) error {
	panic("unimplemented")
}

// Remove implements vfs.FS.
func (fs *sourceFS) Remove(path tspath.RootedPath) error {
	panic("unimplemented")
}

// Chtimes implements vfs.FS.
func (fs *sourceFS) Chtimes(path tspath.RootedPath, atime time.Time, mtime time.Time) error {
	panic("unimplemented")
}
