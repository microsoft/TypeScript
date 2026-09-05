package project

import (
	"maps"
	"slices"
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

type FileSource interface {
	FS() vfs.FS
	GetFile(fileName tspath.RootedFilePath) FileHandle
	GetFileByPath(fileName tspath.RootedFilePath, path tspath.PathKey) FileHandle
	FileExists(fileName tspath.RootedFilePath, path tspath.PathKey) bool
	GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries
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
	caseSensitivity    tspath.CaseSensitivity
	fs                 vfs.FS
	overlays           map[tspath.PathKey]*Overlay
	overlayDirectories map[tspath.PathKey]map[tspath.PathKey]string
	diskFiles          map[tspath.PathKey]*diskFile
	diskDirectories    map[tspath.PathKey]dirty.CloneableMap[tspath.PathKey, string]
	readFiles          collections.SyncMap[tspath.PathKey, memoizedDiskFile]
	// nodeModulesRealpathAliases maps realpath-based keys to sets of symlink-based keys,
	// for files inside node_modules that are accessed through directory symlinks.
	// This allows watch events (which use realpaths) to invalidate files cached under symlink paths.
	nodeModulesRealpathAliases map[tspath.PathKey]*realpathAliasSet
}

type memoizedDiskFile func() FileHandle

func (s *SnapshotFS) FS() vfs.FS {
	return s.fs
}

func (s *SnapshotFS) GetFile(fileName tspath.RootedFilePath) FileHandle {
	return s.GetFileByPath(fileName, s.caseSensitivity.PathKey(tspath.RootedPath(fileName)))
}

func (s *SnapshotFS) FileExists(fileName tspath.RootedFilePath, path tspath.PathKey) bool {
	if _, ok := s.overlays[path]; ok {
		return true
	}
	if _, ok := s.diskFiles[path]; ok {
		return true
	}
	return s.fs.FileExists(fileName)
}

func (s *SnapshotFS) GetFileByPath(fileName tspath.RootedFilePath, path tspath.PathKey) FileHandle {
	if file, ok := s.overlays[path]; ok {
		return file
	}
	if file, ok := s.diskFiles[path]; ok {
		return file
	}
	newEntry := memoizedDiskFile(sync.OnceValue(func() FileHandle {
		if contents, ok := s.fs.ReadFile(fileName); ok {
			return newDiskFile(fileName, contents)
		}
		return nil
	}))
	entry, _ := s.readFiles.LoadOrStore(path, newEntry)
	return entry()
}

func (s *SnapshotFS) GetAccessibleEntries(directoryName tspath.RootedDirectoryPath) vfs.Entries {
	var entries vfs.Entries
	path := s.caseSensitivity.PathKey(directoryName.AsPath())
	if diskDirectories, ok := s.diskDirectories[path]; ok {
		readDirectoryIntoEntries(diskDirectories, s.isFile, &entries)
	}
	if overlayDirectories, ok := s.overlayDirectories[path]; ok {
		readDirectoryIntoEntries(overlayDirectories, s.isFile, &entries)
	}
	return entries
}

func (s *SnapshotFS) isOpenFile(fileName tspath.RootedFilePath) bool {
	path := s.caseSensitivity.PathKey(tspath.RootedPath(fileName))
	_, ok := s.overlays[path]
	return ok
}

func (s *SnapshotFS) isFile(path tspath.PathKey) bool {
	if _, ok := s.diskFiles[path]; ok {
		return true
	}
	if _, ok := s.overlays[path]; ok {
		return true
	}
	return false
}

type snapshotFSBuilder struct {
	fs                         vfs.FS
	prevOverlays               map[tspath.PathKey]*Overlay
	overlays                   map[tspath.PathKey]*Overlay
	overlayDirectories         map[tspath.PathKey]map[tspath.PathKey]string
	diskFiles                  *dirty.SyncMap[tspath.PathKey, *diskFile]
	diskDirectories            *dirty.Map[tspath.PathKey, dirty.CloneableMap[tspath.PathKey, string]]
	nodeModulesRealpathAliases *dirty.SyncMap[tspath.PathKey, *realpathAliasSet]
	caseSensitivity            tspath.CaseSensitivity
	accessibleEntries          collections.SyncMap[tspath.PathKey, *vfs.Entries]
}

func newSnapshotFSBuilder(
	fs vfs.FS,
	prevOverlays map[tspath.PathKey]*Overlay,
	overlays map[tspath.PathKey]*Overlay,
	diskFiles map[tspath.PathKey]*diskFile,
	diskDirectories map[tspath.PathKey]dirty.CloneableMap[tspath.PathKey, string],
	nodeModulesRealpathAliases map[tspath.PathKey]*realpathAliasSet,
	positionEncoding lsproto.PositionEncodingKind,
) *snapshotFSBuilder {
	cachedFS := cachedvfs.From(fs)
	cachedFS.Enable()

	overlayDirectories := make(map[tspath.PathKey]map[tspath.PathKey]string)
	for path := range overlays {
		childPath := path
		child := overlays[path].FileName().AsPath()
		for {
			parentPath := childPath.Parent()
			parent := child.Directory()
			if childPath == parentPath {
				break // reached root
			}
			baseName := child.BaseName()
			if dir, ok := overlayDirectories[parentPath]; ok {
				dir[childPath] = baseName
			} else {
				dir := make(map[tspath.PathKey]string)
				overlayDirectories[parentPath] = dir
				dir[childPath] = baseName
			}
			childPath = parentPath
			child = parent.AsPath()
		}
	}

	return &snapshotFSBuilder{
		fs:                         cachedFS,
		prevOverlays:               prevOverlays,
		overlays:                   overlays,
		overlayDirectories:         overlayDirectories,
		diskFiles:                  dirty.NewSyncMap(diskFiles),
		diskDirectories:            dirty.NewMap(diskDirectories),
		nodeModulesRealpathAliases: dirty.NewSyncMap(nodeModulesRealpathAliases),
		caseSensitivity:            cachedFS.CaseSensitivity(),
	}
}

func (s *snapshotFSBuilder) FS() vfs.FS {
	return s.fs
}

func (s *snapshotFSBuilder) Finalize() (*SnapshotFS, bool) {
	// Synchronize directory structure based on added and deleted files (including overlays)
	var onDeletedFileOrDirectory func(path tspath.PathKey)
	var deleted map[tspath.PathKey]*diskFile

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
			if dirEntry, ok := s.diskDirectories.Get(parentPath); ok {
				dirEntry.Change(func(dir dirty.CloneableMap[tspath.PathKey, string]) {
					dir[childPath] = baseName
				})
				break
			} else {
				dir := make(dirty.CloneableMap[tspath.PathKey, string])
				dir[childPath] = baseName
				s.diskDirectories.Add(parentPath, dir)
			}
			childPath = parentPath
			child = parent.AsPath()
		}
	}

	onDeletedFileOrDirectory = func(path tspath.PathKey) {
		dirEntry, ok := s.diskDirectories.Get(path.Parent())
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

	diskFiles, changed := s.diskFiles.FinalizeWith(dirty.FinalizationHooks[tspath.PathKey, *diskFile]{
		OnDelete: func(key tspath.PathKey, value *diskFile) {
			if deleted == nil {
				deleted = make(map[tspath.PathKey]*diskFile)
			}
			deleted[key] = value
		},
		OnAdd: func(key tspath.PathKey, value *diskFile) {
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
				if len(e.Value().paths) == 0 {
					e.Delete()
				}
			})
		}
	}

	nodeModulesRealpathAliases, aliasesChanged := s.nodeModulesRealpathAliases.Finalize()

	return &SnapshotFS{
		fs:                         s.fs,
		overlays:                   s.overlays,
		overlayDirectories:         s.overlayDirectories,
		diskFiles:                  diskFiles,
		diskDirectories:            core.FirstResult(s.diskDirectories.Finalize()),
		nodeModulesRealpathAliases: nodeModulesRealpathAliases,
		caseSensitivity:            s.caseSensitivity,
	}, changed || aliasesChanged
}

func (s *snapshotFSBuilder) isOpenFile(path tspath.PathKey) bool {
	_, ok := s.overlays[path]
	return ok
}

func (s *snapshotFSBuilder) GetFile(fileName tspath.RootedFilePath) FileHandle {
	path := s.caseSensitivity.PathKey(tspath.RootedPath(fileName))
	return s.GetFileByPath(fileName, path)
}

func (s *snapshotFSBuilder) FileExists(fileName tspath.RootedFilePath, path tspath.PathKey) bool {
	if _, ok := s.overlays[path]; ok {
		return true
	}
	if entry, ok := s.diskFiles.Load(path); ok {
		val := entry.Value()
		if val == nil {
			return false
		}
		// Entry may be dirty - reload to check current state on disk.
		return s.reloadEntryIfNeeded(entry) != nil
	}
	// Path never loaded into diskFiles - use cached stat (no file read).
	return s.fs.FileExists(fileName)
}

func (s *snapshotFSBuilder) GetFileByPath(fileName tspath.RootedFilePath, path tspath.PathKey) FileHandle {
	if file, ok := s.overlays[path]; ok {
		return file
	}
	return s.getDiskFile(fileName, path, false)
}

func (s *snapshotFSBuilder) GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries {
	entries := s.fs.GetAccessibleEntries(path)
	p := s.caseSensitivity.PathKey(path.AsPath())
	overlayDirectories, ok := s.overlayDirectories[p]
	if !ok {
		return entries
	}

	if merged, ok := s.accessibleEntries.Load(p); ok {
		return *merged
	}
	merged := &vfs.Entries{
		Files:       slices.Clip(entries.Files),
		Directories: slices.Clip(entries.Directories),
		Symlinks:    entries.Symlinks,
	}
	readDirectoryIntoEntries(overlayDirectories, s.isOpenFile, merged)
	merged, _ = s.accessibleEntries.LoadOrStore(p, merged)
	return *merged
}

func (s *snapshotFSBuilder) getDiskFile(fileName tspath.RootedFilePath, path tspath.PathKey, forceReload bool) FileHandle {
	entry, loaded := s.diskFiles.LoadOrStore(path, &diskFile{fileBase: fileBase{fileName: fileName}, needsReload: true})
	if entry != nil {
		if !loaded && path.ContainsLowercaseDirectorySequence("/node_modules/") {
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
func (s *snapshotFSBuilder) recordRealpathAlias(diskFileEntry *dirty.SyncMapEntry[tspath.PathKey, *diskFile], symlinkFileName tspath.RootedFilePath, symlinkPath tspath.PathKey) {
	realpath := s.fs.Realpath(symlinkFileName.AsPath())
	realpathPath := s.caseSensitivity.PathKey(realpath)
	if realpathPath != symlinkPath {
		diskFileEntry.Change(func(file *diskFile) {
			file.realpathPath = realpathPath
		})
		entry, _ := s.nodeModulesRealpathAliases.LoadOrStore(realpathPath, &realpathAliasSet{})
		entry.Change(func(aliasSet *realpathAliasSet) {
			aliasSet.Add(symlinkPath, symlinkFileName)
		})
	}
}

func (s *snapshotFSBuilder) reloadEntry(entry *dirty.SyncMapEntry[tspath.PathKey, *diskFile]) FileHandle {
	var fileName tspath.RootedFilePath
	entry.Locked(func(e dirty.Value[*diskFile]) {
		if e.Value() != nil {
			fileName = e.Value().fileName
		}
	})
	if fileName == "" {
		return nil
	}
	// Read file outside the lock to avoid blocking other goroutines.
	content, ok := s.fs.ReadFile(fileName)
	entry.Locked(func(e dirty.Value[*diskFile]) {
		if e.Value() == nil {
			return
		}
		if ok {
			e.Change(func(file *diskFile) {
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

func (s *snapshotFSBuilder) reloadEntryIfNeeded(entry *dirty.SyncMapEntry[tspath.PathKey, *diskFile]) FileHandle {
	var fileName tspath.RootedFilePath
	entry.Locked(func(e dirty.Value[*diskFile]) {
		if e.Value() != nil && !e.Value().MatchesDiskText() {
			fileName = e.Value().fileName
		}
	})
	if fileName != "" {
		// Read file outside the lock to avoid blocking other goroutines.
		content, ok := s.fs.ReadFile(fileName)
		entry.Locked(func(e dirty.Value[*diskFile]) {
			if e.Value() == nil || e.Value().MatchesDiskText() {
				return // another goroutine already reloaded it
			}
			if ok {
				e.Change(func(file *diskFile) {
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

func (s *snapshotFSBuilder) watchChangesOverlapCache(change FileChangeSummary) bool {
	for uri := range change.Changed.Keys() {
		path := s.caseSensitivity.PathKey(tspath.RootedPath(uri.FileName()))
		if _, ok := s.diskFiles.Load(path); ok {
			return true
		}
		if _, ok := s.nodeModulesRealpathAliases.Load(path); ok {
			return true
		}
	}
	for uri := range change.Deleted.Keys() {
		path := s.caseSensitivity.PathKey(tspath.RootedPath(uri.FileName()))
		if _, ok := s.diskFiles.Load(path); ok {
			return true
		}
		if _, ok := s.nodeModulesRealpathAliases.Load(path); ok {
			return true
		}
	}
	return false
}

func (s *snapshotFSBuilder) invalidateCache() {
	s.diskFiles.Range(func(entry *dirty.SyncMapEntry[tspath.PathKey, *diskFile]) bool {
		entry.Change(func(file *diskFile) {
			file.needsReload = true
		})
		return true
	})
}

func (s *snapshotFSBuilder) invalidateNodeModulesCache() {
	s.diskFiles.Range(func(entry *dirty.SyncMapEntry[tspath.PathKey, *diskFile]) bool {
		if entry.Key().ContainsLowercaseDirectorySequence("/node_modules/") {
			entry.Change(func(file *diskFile) {
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
			path := s.caseSensitivity.PathKey(tspath.RootedPath(uri.FileName()))
			if _, ok := s.overlays[path]; ok {
				filteredChanged.Add(uri)
				continue
			}
			entry, ok := s.diskFiles.Load(path)
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
		path := s.caseSensitivity.PathKey(tspath.RootedPath(uri.FileName()))
		if entry, ok := s.diskFiles.Load(path); ok {
			entry.Delete()
		}
	}
	return change
}

func (s *snapshotFSBuilder) reloadEntryIfContentChanged(entry *dirty.SyncMapEntry[tspath.PathKey, *diskFile]) (changed bool) {
	file := entry.Value()
	if file == nil {
		return true
	}
	content, ok := s.fs.ReadFile(file.fileName)
	changed = true
	entry.Locked(func(e dirty.Value[*diskFile]) {
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
				e.Change(func(file *diskFile) {
					file.needsReload = false
				})
			}
			return
		}
		e.Change(func(file *diskFile) {
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
		path := s.caseSensitivity.PathKey(tspath.RootedPath(uri.FileName()))
		if aliases, ok := s.nodeModulesRealpathAliases[path]; ok {
			for _, aliasFileName := range aliases.paths {
				additionalChanged.Add(lsconv.FilePathToDocumentURI(aliasFileName))
			}
		}
	}
	for uri := range additionalChanged.Keys() {
		change.Changed.Add(uri)
	}

	var additionalDeleted collections.Set[lsproto.DocumentUri]
	for uri := range change.Deleted.Keys() {
		path := s.caseSensitivity.PathKey(tspath.RootedPath(uri.FileName()))
		if aliases, ok := s.nodeModulesRealpathAliases[path]; ok {
			for _, aliasFileName := range aliases.paths {
				additionalDeleted.Add(lsconv.FilePathToDocumentURI(aliasFileName))
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
// is a dynamic (e.g. untitled) file, or is currently open as an overlay.
func (s *snapshotFSBuilder) isRelevantFileName(uri lsproto.DocumentUri, contentMapperExtensions []string, contentMapperWatchedFiles *collections.Set[tspath.PathKey]) bool {
	fileName := uri.FileName()
	if contentMapperWatchedFiles != nil && contentMapperWatchedFiles.Has(s.caseSensitivity.PathKey(tspath.RootedPath(fileName))) {
		return true
	}
	if fileName.ExtensionIsOneOf(contentMapperExtensions) {
		return true
	}
	if fileName.IsDynamic() {
		return true
	}
	path := s.caseSensitivity.PathKey(tspath.RootedPath(fileName))
	if _, ok := s.overlays[path]; ok {
		return true
	}
	return isRelevantExtension(path.Extension())
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
func (s *snapshotFSBuilder) expandAndFilterWatchEvents(change FileChangeSummary, contentMapperExtensions []string, contentMapperWatchedFiles *collections.Set[tspath.PathKey]) FileChangeSummary {
	if change.Deleted.Len() > 0 {
		var filteredDeleted collections.Set[lsproto.DocumentUri]
		for uri := range change.Deleted.Keys() {
			path := s.caseSensitivity.PathKey(tspath.RootedPath(uri.FileName()))
			if _, ok := s.diskDirectories.Get(path); ok {
				s.collectFilesRecursive(path, &filteredDeleted)
			} else if s.isRelevantFileName(uri, contentMapperExtensions, contentMapperWatchedFiles) || isNodeModulesPath(path) {
				// node_modules deletions must always be preserved for auto-import registry change handlers.
				// They won't be in diskDirectories since the registry doesn't use the snapshotFSBuilder for
				// its file system, since we don't want to retain files read there.
				filteredDeleted.Add(uri)
			}
		}
		change.Deleted = filteredDeleted
	}

	if change.Changed.Len() > 0 {
		var filteredChanged collections.Set[lsproto.DocumentUri]
		for uri := range change.Changed.Keys() {
			if s.isRelevantFileName(uri, contentMapperExtensions, contentMapperWatchedFiles) {
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
// files are read transiently and therefore never tracked in diskDirectories.
func isNodeModulesPath(path tspath.PathKey) bool {
	return path.BaseName() == "node_modules" || path.ContainsLowercaseDirectorySequence("/node_modules/")
}

// collectFilesRecursive recursively collects all cached file URIs under the
// given directory path using the diskDirectories and diskFiles maps.
func (s *snapshotFSBuilder) collectFilesRecursive(dirPath tspath.PathKey, files *collections.Set[lsproto.DocumentUri]) {
	dirEntry, ok := s.diskDirectories.Get(dirPath)
	if !ok {
		return
	}
	for childPath := range dirEntry.Value() {
		if entry, ok := s.diskFiles.Load(childPath); ok {
			if file := entry.Value(); file != nil {
				files.Add(lsconv.FilePathToDocumentURI(file.FileName()))
			}
		}
		s.collectFilesRecursive(childPath, files)
	}
}

func (s *snapshotFSBuilder) convertOpenAndCloseToChanges(change FileChangeSummary) FileChangeSummary {
	if change.Opened != "" && !change.Opened.FileName().IsDynamic() {
		path := s.caseSensitivity.PathKey(tspath.RootedPath(change.Opened.FileName()))
		if entry, ok := s.diskFiles.Load(path); !ok || entry.Original() == nil {
			change.Created.Add(change.Opened)
		} else if overlay, ok := s.overlays[path]; ok {
			// The file already exists in the program, but the overlay content from
			// didOpen may differ from what was originally read from disk (e.g. the
			// editor normalizes line endings, or the file changed on disk since the
			// project was loaded). Mark it as Changed so the project rebuilds.
			if diskFile := entry.Original(); diskFile != nil && overlay.Hash() != diskFile.Hash() {
				change.Changed.Add(change.Opened)
			}
		}
	}
	for uri := range change.Closed.Keys() {
		fileName := uri.FileName()
		if fileName.IsDynamic() {
			continue
		}
		path := s.caseSensitivity.PathKey(tspath.RootedPath(fileName))
		// We may have ignored watcher events while the file was open, so force a reload.
		if fh := s.getDiskFile(fileName, path, true /*forceReload*/); fh != nil {
			if fh.Hash() != s.prevOverlays[path].Hash() {
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
	caseSensitivity    tspath.CaseSensitivity
	missingDirectories *collections.SyncSet[tspath.PathKey]
	seenFiles          *collections.SyncMap[tspath.PathKey, tspath.RootedFilePath]
	source             FileSource
}

func newSourceFS(tracking bool, source FileSource) *sourceFS {
	fs := &sourceFS{
		tracking:        tracking,
		caseSensitivity: source.FS().CaseSensitivity(),
		source:          source,
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
	fs.seenFiles.Store(fs.caseSensitivity.PathKey(tspath.RootedPath(fileName)), fileName)
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
	return fs.source.FileExists(path, fs.caseSensitivity.PathKey(tspath.RootedPath(path)))
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

// WalkDir implements vfs.FS.
func (fs *sourceFS) WalkDir(root tspath.RootedDirectoryPath, walkFn vfs.WalkDirFunc) error {
	return fs.source.FS().WalkDir(root, walkFn)
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

func readDirectoryIntoEntries[M ~map[tspath.PathKey]string](directories M, isFile func(tspath.PathKey) bool, entries *vfs.Entries) {
	for childPath, childName := range directories {
		if isFile(childPath) {
			entries.Files = append(entries.Files, childName)
		} else {
			entries.Directories = append(entries.Directories, childName)
		}
	}
}
