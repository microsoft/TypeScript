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
	GetFile(fileName string) FileHandle
	GetFileByPath(fileName string, path tspath.Path) FileHandle
}

type FileSource interface {
	FS() vfs.FS
	FileHandleSource
	FileExists(fileName string, path tspath.Path) bool
	GetAccessibleEntries(path string) vfs.Entries
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

func (fs *cachedLayeredFileSystem) GetFile(fileName string) FileHandle {
	return fs.layered.GetFile(fileName)
}

func (fs *cachedLayeredFileSystem) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	return fs.layered.GetFileByPath(fileName, path)
}

func (fs *cachedLayeredFileSystem) Overlays() map[tspath.Path]*Overlay {
	return fs.layered.Overlays()
}

func (fs *cachedLayeredFileSystem) WatchRealpath(fileName string) string {
	return WatchRealpath(fs.layered, fileName)
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

type SnapshotFS struct {
	toPath           func(fileName string) tspath.Path
	fs               LayeredFileSystem
	cacheFiles       map[tspath.Path]*cachedFile
	cacheDirectories map[tspath.Path]dirty.CloneableMap[tspath.Path, string]
	readFiles        collections.SyncMap[tspath.Path, memoizedCachedFile]
	realpathFiles    int
}

type memoizedCachedFile func() FileHandle

func (s *SnapshotFS) FS() vfs.FS {
	return s.fs
}

func (s *SnapshotFS) GetFile(fileName string) FileHandle {
	return s.GetFileByPath(fileName, s.toPath(fileName))
}

func (s *SnapshotFS) FileExists(fileName string, path tspath.Path) bool {
	if _, ok := s.cacheFiles[path]; ok {
		return true
	}
	return s.fs.FileExists(fileName)
}

func (s *SnapshotFS) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	if file, ok := s.cacheFiles[path]; ok {
		return file
	}
	newEntry := memoizedCachedFile(sync.OnceValue(func() FileHandle {
		return s.fs.GetFileByPath(fileName, path)
	}))
	entry, _ := s.readFiles.LoadOrStore(path, newEntry)
	return entry()
}

func (s *SnapshotFS) GetAccessibleEntries(directoryName string) vfs.Entries {
	lowerEntries := s.fs.GetAccessibleEntries(directoryName)
	directory, ok := s.cacheDirectories[s.toPath(directoryName)]
	if !ok {
		return lowerEntries
	}
	return mergeCachedDirectoryEntries(lowerEntries, directory, func(path tspath.Path) bool {
		_, cached := s.cacheFiles[path]
		return cached || s.fs.FileExists(string(path))
	}, s.fs.UseCaseSensitiveFileNames())
}

func mergeCachedDirectoryEntries(directoryEntries vfs.Entries, cachedEntries dirty.CloneableMap[tspath.Path, string], isCachedFile func(tspath.Path) bool, useCaseSensitiveFileNames bool) vfs.Entries {
	entries := vfs.Entries{Symlinks: maps.Clone(directoryEntries.Symlinks)}
	equalName := func(left string, right string) bool {
		return tspath.GetCanonicalFileName(left, useCaseSensitiveFileNames) == tspath.GetCanonicalFileName(right, useCaseSensitiveFileNames)
	}
	hasName := func(names []string, name string) bool {
		return slices.ContainsFunc(names, func(candidate string) bool { return equalName(candidate, name) })
	}
	for childPath, childName := range cachedEntries {
		// Cached ancestry is for invalidation; it must not extend a source's
		// directory listings (for example, with host library fallback paths).
		if !isCachedFile(childPath) {
			continue
		}
		for name := range entries.Symlinks {
			if equalName(name, childName) {
				delete(entries.Symlinks, name)
			}
		}
		entries.Files = append(entries.Files, childName)
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
	fs                       LayeredFileSystem
	cacheFiles               *dirty.SyncMap[tspath.Path, *cachedFile]
	previousCacheFiles       map[tspath.Path]*cachedFile
	cacheDirectories         *dirty.Map[tspath.Path, dirty.CloneableMap[tspath.Path, string]]
	sourceBackedReplacements collections.Set[tspath.Path]
	realpathFiles            int
	toPath                   func(string) tspath.Path
}

func newSnapshotFSBuilderFromSource(
	fs LayeredFileSystem,
	cacheFiles map[tspath.Path]*cachedFile,
	cacheDirectories map[tspath.Path]dirty.CloneableMap[tspath.Path, string],
	realpathFiles int,
	toPath func(fileName string) tspath.Path,
) *snapshotFSBuilder {
	fs = newCachedLayeredFileSystem(fs)

	return &snapshotFSBuilder{
		fs:                 fs,
		cacheFiles:         dirty.NewSyncMap(cacheFiles),
		previousCacheFiles: cacheFiles,
		cacheDirectories:   dirty.NewMap(cacheDirectories),
		realpathFiles:      realpathFiles,
		toPath:             toPath,
	}
}

func (s *snapshotFSBuilder) FS() vfs.FS {
	return s.fs
}

func (s *snapshotFSBuilder) Finalize() (*SnapshotFS, bool) {
	// Synchronize directory structure based on added and deleted cache entries.
	var onDeletedFileOrDirectory func(path tspath.Path)
	var deleted map[tspath.Path]*cachedFile

	onAddedFile := func(path tspath.Path, fileName string) {
		childPath := path
		child := fileName
		for {
			parentPath := childPath.GetDirectoryPath()
			parent := tspath.GetDirectoryPath(child)
			if childPath == parentPath {
				break // reached root
			}
			baseName := tspath.GetBaseFileName(child)
			if dirEntry, ok := s.cacheDirectories.Get(parentPath); ok {
				dirEntry.Change(func(dir dirty.CloneableMap[tspath.Path, string]) {
					dir[childPath] = baseName
				})
				break
			} else {
				dir := make(dirty.CloneableMap[tspath.Path, string])
				dir[childPath] = baseName
				s.cacheDirectories.Add(parentPath, dir)
			}
			childPath = parentPath
			child = parent
		}
	}

	onDeletedFileOrDirectory = func(path tspath.Path) {
		dirEntry, ok := s.cacheDirectories.Get(path.GetDirectoryPath())
		if !ok {
			return
		}
		dirEntry.Change(func(dir dirty.CloneableMap[tspath.Path, string]) {
			delete(dir, path)
			if len(dir) == 0 {
				dirEntry.Delete()
				onDeletedFileOrDirectory(dirEntry.Key())
			}
		})
	}

	cacheFiles, changed := s.cacheFiles.FinalizeWith(dirty.FinalizationHooks[tspath.Path, *cachedFile]{
		OnDelete: func(key tspath.Path, value *cachedFile) {
			if previous := s.previousCacheFiles[key]; previous != nil && previous.realpathName != "" {
				s.realpathFiles--
			}
			if s.sourceBackedReplacements.Has(key) {
				return
			}
			if deleted == nil {
				deleted = make(map[tspath.Path]*cachedFile)
			}
			deleted[key] = value
		},
		OnAdd: func(key tspath.Path, value *cachedFile) {
			onAddedFile(key, value.FileName())
			if value.realpathName != "" {
				s.realpathFiles++
			}
		},
		OnChange: func(_ tspath.Path, old, next *cachedFile) {
			if old.realpathName != "" {
				s.realpathFiles--
			}
			if next.realpathName != "" {
				s.realpathFiles++
			}
		},
	})

	for path := range deleted {
		onDeletedFileOrDirectory(path)
	}

	return &SnapshotFS{
		fs:               s.fs,
		cacheFiles:       cacheFiles,
		cacheDirectories: core.FirstResult(s.cacheDirectories.Finalize()),
		realpathFiles:    s.realpathFiles,
		toPath:           s.toPath,
	}, changed
}

func (s *snapshotFSBuilder) GetFile(fileName string) FileHandle {
	path := s.toPath(fileName)
	return s.GetFileByPath(fileName, path)
}

func (s *snapshotFSBuilder) deleteCacheEntry(entry *dirty.SyncMapEntry[tspath.Path, *cachedFile]) {
	if file := entry.Value(); file != nil && s.fs.FileExists(file.FileName()) {
		s.sourceBackedReplacements.Add(entry.Key())
	}
	entry.Delete()
}

func (s *snapshotFSBuilder) FileExists(fileName string, path tspath.Path) bool {
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

func (s *snapshotFSBuilder) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	if entry, ok := s.cacheFiles.Load(path); ok {
		return s.reloadEntryIfNeeded(entry)
	}
	file := s.fs.GetFileByPath(fileName, path)
	if file == nil || file.IsOverlay() {
		return file
	}
	return s.cacheSourceFile(fileName, path, file)
}

func (s *snapshotFSBuilder) GetAccessibleEntries(path string) vfs.Entries {
	lowerEntries := s.fs.GetAccessibleEntries(path)
	directory, ok := s.cacheDirectories.Get(s.toPath(path))
	if !ok {
		return lowerEntries
	}
	return mergeCachedDirectoryEntries(lowerEntries, directory.Value(), func(path tspath.Path) bool {
		entry, cached := s.cacheFiles.Load(path)
		return cached && entry.Value() != nil || s.fs.FileExists(string(path))
	}, s.fs.UseCaseSensitiveFileNames())
}

func (s *snapshotFSBuilder) cacheSourceFile(fileName string, path tspath.Path, source FileHandle) FileHandle {
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

func (s *snapshotFSBuilder) getCachedFile(fileName string, path tspath.Path, forceReload bool) FileHandle {
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

// Physical observations live with the file. Reverse lookup is derived only
// when publishing the snapshot's watch index.
func (s *snapshotFSBuilder) recordRealpathAlias(entry *dirty.SyncMapEntry[tspath.Path, *cachedFile], fileName string, path tspath.Path) bool {
	realpath := WatchRealpath(s.fs, fileName)
	if s.toPath(realpath) == path {
		realpath = ""
	}
	return entry.ChangeIf(
		func(file *cachedFile) bool { return file.realpathName != realpath },
		func(file *cachedFile) { file.realpathName = realpath },
	)
}

func (s *snapshotFSBuilder) reloadEntry(entry *dirty.SyncMapEntry[tspath.Path, *cachedFile]) FileHandle {
	var fileName string
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

func (s *snapshotFSBuilder) reloadEntryIfNeeded(entry *dirty.SyncMapEntry[tspath.Path, *cachedFile]) FileHandle {
	var fileName string
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

func (s *snapshotFSBuilder) watchChangesOverlapCache(change FileChangeSummary, previousOpenFiles map[tspath.Path]FileHandle, openFiles map[tspath.Path]FileHandle) bool {
	for uri := range change.Changed.Keys() {
		path := s.toPath(uri.FileName())
		if previousOpenFiles[path] != nil || openFiles[path] != nil {
			return true
		}
		if _, ok := s.cacheFiles.Load(path); ok {
			return true
		}
	}
	for uri := range change.Deleted.Keys() {
		path := s.toPath(uri.FileName())
		if previousOpenFiles[path] != nil || openFiles[path] != nil {
			return true
		}
		if _, ok := s.cacheDirectories.Get(path); ok {
			return true
		}
		if _, ok := s.cacheFiles.Load(path); ok {
			return true
		}
	}
	return false
}

func (s *snapshotFSBuilder) invalidateCache() {
	s.cacheFiles.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *cachedFile]) bool {
		entry.Change(func(file *cachedFile) {
			file.needsReload = true
		})
		return true
	})
}

func (s *snapshotFSBuilder) invalidateNodeModulesCache() {
	s.cacheFiles.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *cachedFile]) bool {
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
			path := s.toPath(uri.FileName())
			if file := s.fs.GetFileByPath(uri.FileName(), path); file != nil && file.IsOverlay() {
				if entry, ok := s.cacheFiles.Load(path); ok {
					s.deleteCacheEntry(entry)
				}
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
		path := s.toPath(uri.FileName())
		if entry, ok := s.cacheFiles.Load(path); ok {
			s.deleteCacheEntry(entry)
		}
	}
	return change
}

func (s *snapshotFSBuilder) reloadEntryIfContentChanged(entry *dirty.SyncMapEntry[tspath.Path, *cachedFile]) (changed bool) {
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

// isRelevantFileName returns true if the given URI refers to a file that
// could affect the project: it has a TypeScript-relevant or configured content-mapper extension,
// is dynamic (e.g. untitled), or is present in the supplied open-file state.
func (s *snapshotFSBuilder) isRelevantFileName(uri lsproto.DocumentUri, contentMapperExtensions []string, contentMapperWatchedFiles *collections.Set[tspath.Path], openFiles map[tspath.Path]FileHandle) bool {
	fileName := uri.FileName()
	if contentMapperWatchedFiles != nil && contentMapperWatchedFiles.Has(s.toPath(fileName)) {
		return true
	}
	if tspath.FileExtensionIsOneOf(fileName, contentMapperExtensions) {
		return true
	}
	if tspath.IsDynamicFileName(fileName) {
		return true
	}
	path := s.toPath(fileName)
	if _, ok := openFiles[path]; ok {
		return true
	}
	i := strings.LastIndexByte(string(path), '.')
	if i < 0 {
		return false
	}
	return isRelevantExtension(string(path)[i:])
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
func (s *snapshotFSBuilder) expandAndFilterWatchEvents(change FileChangeSummary, contentMapperExtensions []string, contentMapperWatchedFiles *collections.Set[tspath.Path], previousOpenFiles map[tspath.Path]FileHandle, openFiles map[tspath.Path]FileHandle) FileChangeSummary {
	if change.Deleted.Len() > 0 {
		var filteredDeleted collections.Set[lsproto.DocumentUri]
		for uri := range change.Deleted.Keys() {
			path := s.toPath(uri.FileName())
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
func isNodeModulesPath(path tspath.Path) bool {
	s := string(path)
	return strings.HasSuffix(s, "/node_modules") || strings.Contains(s, "/node_modules/")
}

func hasOpenFileWithin(path tspath.Path, previousOpenFiles map[tspath.Path]FileHandle, openFiles map[tspath.Path]FileHandle) bool {
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
func (s *snapshotFSBuilder) collectFilesRecursive(dirPath tspath.Path, files *collections.Set[lsproto.DocumentUri], previousOpenFiles map[tspath.Path]FileHandle, openFiles map[tspath.Path]FileHandle) {
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

func (s *snapshotFSBuilder) convertOpenAndCloseToChanges(change FileChangeSummary, previousOpenFiles map[tspath.Path]FileHandle, openFiles map[tspath.Path]FileHandle) FileChangeSummary {
	if change.Opened != "" && !tspath.IsDynamicFileName(change.Opened.FileName()) {
		path := s.toPath(change.Opened.FileName())
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
		if tspath.IsDynamicFileName(fileName) {
			continue
		}
		path := s.toPath(fileName)
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
	toPath             func(fileName string) tspath.Path
	missingDirectories *collections.SyncMap[tspath.Path, string]
	seenFiles          *collections.SyncMap[tspath.Path, string]
	source             FileSource
}

func newSourceFS(tracking bool, source FileSource, toPath func(fileName string) tspath.Path) *sourceFS {
	fs := &sourceFS{
		tracking: tracking,
		toPath:   toPath,
		source:   source,
	}
	if tracking {
		fs.seenFiles = &collections.SyncMap[tspath.Path, string]{}
		fs.missingDirectories = &collections.SyncMap[tspath.Path, string]{}
	}
	return fs
}

var _ vfs.FS = (*sourceFS)(nil)

func (fs *sourceFS) DisableTracking() {
	fs.tracking = false
}

func (fs *sourceFS) Track(fileName string) {
	if !fs.tracking {
		return
	}
	fs.seenFiles.LoadOrStore(fs.toPath(fileName), fileName)
}

func (fs *sourceFS) SeenFile(path tspath.Path) bool {
	if fs.seenFiles == nil {
		return false
	}
	_, ok := fs.seenFiles.Load(path)
	return ok
}

func (fs *sourceFS) SeenFileOrMissingParentDirectory(path tspath.Path) bool {
	if fs.SeenFile(path) {
		return true
	}
	if fs.missingDirectories != nil {
		for {
			if _, ok := fs.missingDirectories.Load(path); ok {
				return true
			}

			parent := path.GetDirectoryPath()
			if parent == path {
				break
			}
			path = parent
		}
	}
	return false
}

func (fs *sourceFS) GetFile(fileName string) FileHandle {
	fs.Track(fileName)
	return fs.source.GetFile(fileName)
}

func (fs *sourceFS) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	fs.Track(fileName)
	return fs.source.GetFileByPath(fileName, path)
}

// DirectoryExists implements vfs.FS.
func (fs *sourceFS) DirectoryExists(path string) bool {
	exists := fs.source.FS().DirectoryExists(path)
	if !exists && fs.tracking {
		fs.missingDirectories.LoadOrStore(fs.toPath(path), path)
	}
	return exists
}

// FileExists implements vfs.FS.
func (fs *sourceFS) FileExists(path string) bool {
	fs.Track(path)
	return fs.source.FileExists(path, fs.toPath(path))
}

// GetAccessibleEntries implements vfs.FS.
func (fs *sourceFS) GetAccessibleEntries(path string) vfs.Entries {
	return fs.source.GetAccessibleEntries(path)
}

// ReadFile implements vfs.FS.
func (fs *sourceFS) ReadFile(path string) (contents string, ok bool) {
	if fh := fs.GetFile(path); fh != nil {
		return fh.Content(), true
	}
	return "", false
}

// Realpath implements vfs.FS.
func (fs *sourceFS) Realpath(path string) string {
	return fs.source.FS().Realpath(path)
}

// Stat implements vfs.FS.
func (fs *sourceFS) Stat(path string) vfs.FileInfo {
	return fs.source.FS().Stat(path)
}

// UseCaseSensitiveFileNames implements vfs.FS.
func (fs *sourceFS) UseCaseSensitiveFileNames() bool {
	return fs.source.FS().UseCaseSensitiveFileNames()
}

// WriteFile implements vfs.FS.
func (fs *sourceFS) WriteFile(path string, data string) error {
	panic("unimplemented")
}

// AppendFile implements vfs.FS.
func (fs *sourceFS) AppendFile(path string, data string) error {
	panic("unimplemented")
}

// Remove implements vfs.FS.
func (fs *sourceFS) Remove(path string) error {
	panic("unimplemented")
}

// Chtimes implements vfs.FS.
func (fs *sourceFS) Chtimes(path string, atime time.Time, mtime time.Time) error {
	panic("unimplemented")
}
