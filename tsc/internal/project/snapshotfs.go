package project

import (
	"errors"
	"io/fs"
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

type FileSource interface {
	GetFile(fileName string) FileHandle
	GetFileByPath(fileName string, path tspath.Path) FileHandle
	FileExists(fileName string, path tspath.Path) bool
	DirectoryExists(path string) bool
	GetAccessibleEntries(path string) vfs.Entries
	Realpath(path string) string
	Stat(path string) vfs.FileInfo
	UseCaseSensitiveFileNames() bool
	WalkDir(root string, walkFn vfs.WalkDirFunc) error
}

type FileSourceLayerLookupKind uint8

const (
	FileSourceLayerLookupMissing FileSourceLayerLookupKind = iota
	FileSourceLayerLookupFile
	FileSourceLayerLookupDirectory
	FileSourceLayerLookupFallback
	FileSourceLayerLookupHost
)

type FileSourceLayerLookup struct {
	Kind          FileSourceLayerLookupKind
	Path          string
	File          FileHandle
	Info          vfs.FileInfo
	Redirected    bool
	NeedsFallback bool
}

type FileSourceLayer interface {
	Lookup(path string) FileSourceLayerLookup
	MergeDirectoryEntries(path string, lookup FileSourceLayerLookup, base vfs.Entries) vfs.Entries
}

func fileSourceLayerShadows(lookup FileSourceLayerLookup) bool {
	return lookup.Kind != FileSourceLayerLookupFallback || lookup.Redirected
}

func fileSourceLayerGetFile(
	lookup FileSourceLayerLookup,
	fileName string,
	base func(string) FileHandle,
	host vfs.FS,
	memoize func(func() FileHandle) FileHandle,
) FileHandle {
	switch lookup.Kind {
	case FileSourceLayerLookupFile:
		return lookup.File
	case FileSourceLayerLookupFallback:
		if lookup.Redirected {
			return memoize(func() FileHandle {
				if file := base(lookup.Path); file != nil {
					return NewFileHandle(fileName, file.Content())
				}
				return nil
			})
		}
		return base(lookup.Path)
	case FileSourceLayerLookupHost:
		return memoize(func() FileHandle {
			if content, ok := host.ReadFile(lookup.Path); ok {
				return NewFileHandle(fileName, content)
			}
			return nil
		})
	}
	return nil
}

func fileSourceLayerFileExists(lookup FileSourceLayerLookup, base func(string) bool, host vfs.FS) bool {
	switch lookup.Kind {
	case FileSourceLayerLookupFile:
		return true
	case FileSourceLayerLookupFallback:
		return base(lookup.Path)
	case FileSourceLayerLookupHost:
		return host.FileExists(lookup.Path)
	}
	return false
}

func fileSourceLayerRealpath(layer FileSourceLayer, path string, base func(string) string, host vfs.FS) string {
	if layer == nil {
		return base(path)
	}
	lookup := layer.Lookup(path)
	switch lookup.Kind {
	case FileSourceLayerLookupFile, FileSourceLayerLookupDirectory:
		return lookup.Path
	case FileSourceLayerLookupFallback:
		return base(lookup.Path)
	case FileSourceLayerLookupHost:
		return host.Realpath(lookup.Path)
	default:
		return path
	}
}

func fileSourceLayerStat(layer FileSourceLayer, path string, base func(string) vfs.FileInfo, host vfs.FS) vfs.FileInfo {
	if layer == nil {
		return base(path)
	}
	lookup := layer.Lookup(path)
	switch lookup.Kind {
	case FileSourceLayerLookupFile, FileSourceLayerLookupDirectory:
		return lookup.Info
	case FileSourceLayerLookupFallback:
		return base(lookup.Path)
	case FileSourceLayerLookupHost:
		return host.Stat(lookup.Path)
	default:
		return nil
	}
}

func fileSourceLayerGetAccessibleEntries(
	layer FileSourceLayer,
	path string,
	base func(string) vfs.Entries,
	host vfs.FS,
	directoryExists func(string) bool,
	fileExists func(string) bool,
) vfs.Entries {
	lookup := layer.Lookup(path)
	var entries vfs.Entries
	switch lookup.Kind {
	case FileSourceLayerLookupDirectory:
		if lookup.NeedsFallback {
			entries = base(lookup.Path)
		}
	case FileSourceLayerLookupFallback:
		entries = base(lookup.Path)
	case FileSourceLayerLookupHost:
		entries = host.GetAccessibleEntries(lookup.Path)
	default:
		return vfs.Entries{Symlinks: map[string]struct{}{}}
	}
	entries = layer.MergeDirectoryEntries(path, lookup, entries)
	for name := range entries.Symlinks {
		child := tspath.CombinePaths(path, name)
		entries.Files = slices.DeleteFunc(entries.Files, func(entry string) bool { return entry == name })
		entries.Directories = slices.DeleteFunc(entries.Directories, func(entry string) bool { return entry == name })
		if directoryExists(child) {
			entries.Directories = append(entries.Directories, name)
		} else if fileExists(child) {
			entries.Files = append(entries.Files, name)
		} else {
			delete(entries.Symlinks, name)
		}
	}
	slices.Sort(entries.Files)
	slices.Sort(entries.Directories)
	return entries
}

func walkFileSource(source FileSource, root string, walkFn vfs.WalkDirFunc) error {
	info := source.Stat(root)
	if info == nil {
		return walkFn(root, nil, vfs.ErrNotExist)
	}
	visited := make(map[string]struct{})
	if err := walkFileSourceWorker(source, root, fs.FileInfoToDirEntry(info), walkFn, visited); errors.Is(err, fs.SkipAll) {
		return nil
	} else {
		return err
	}
}

func walkFileSourceWorker(source FileSource, path string, entry vfs.DirEntry, walkFn vfs.WalkDirFunc, visited map[string]struct{}) error {
	realpath := source.Realpath(path)
	if _, ok := visited[realpath]; ok {
		return nil
	}
	visited[realpath] = struct{}{}
	if err := walkFn(path, entry, nil); err != nil {
		if errors.Is(err, fs.SkipDir) && entry.IsDir() {
			return nil
		}
		return err
	}
	if !entry.IsDir() {
		return nil
	}
	entries := source.GetAccessibleEntries(path)
	names := append(slices.Clone(entries.Directories), entries.Files...)
	slices.Sort(names)
	for _, name := range names {
		childPath := tspath.CombinePaths(path, name)
		childInfo := source.Stat(childPath)
		if childInfo == nil {
			continue
		}
		if err := walkFileSourceWorker(source, childPath, fs.FileInfoToDirEntry(childInfo), walkFn, visited); err != nil {
			if errors.Is(err, fs.SkipDir) {
				continue
			}
			return err
		}
	}
	return nil
}

var (
	_ FileSource = (*snapshotFSBuilder)(nil)
	_ FileSource = (*SnapshotFS)(nil)
)

// realpathAliasSet is a thread-safe set of symlink paths that alias a single realpath.
// It implements dirty.Cloneable so it can be used as a value in dirty.SyncMap.
type realpathAliasSet struct {
	mu    sync.Mutex
	paths collections.Set[tspath.Path]
}

func (s *realpathAliasSet) Add(path tspath.Path) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.paths.Add(path)
}

func (s *realpathAliasSet) Clone() *realpathAliasSet {
	s.mu.Lock()
	defer s.mu.Unlock()
	clone := &realpathAliasSet{}
	if s.paths.Len() > 0 {
		clone.paths = *s.paths.Clone()
	}
	return clone
}

type memoizedDiskFile func() FileHandle

func memoizeFile(files *collections.SyncMap[tspath.Path, memoizedDiskFile], path tspath.Path, load func() FileHandle) FileHandle {
	entry, _ := files.LoadOrStore(path, memoizedDiskFile(sync.OnceValue(load)))
	return entry()
}

type SnapshotFS struct {
	toPath func(fileName string) tspath.Path
	// fs is the cached host filesystem beneath the snapshot's files and overlays.
	fs vfs.FS
	// requestLayer is a filesystem override provided by the API, if present.
	// It is the topmost layer, above editor overlays, diskFiles, and the base host filesystem.
	requestLayer FileSourceLayer
	// sourceFS is a view of the full snapshotFSBuilder as a vfs.FS,
	// reading from each layer in order of precedence: requestLayer, overlays, diskFiles, hostFS.
	sourceFS           *sourceFS
	overlays           map[tspath.Path]*Overlay
	overlayDirectories map[tspath.Path]map[tspath.Path]string
	// diskFiles and diskDirectories are the persistent per-snapshot file cache.
	// They sit logically above the host and below overlays and requestLayer.
	diskFiles       map[tspath.Path]*diskFile
	diskDirectories map[tspath.Path]dirty.CloneableMap[tspath.Path, string]
	readFiles       collections.SyncMap[tspath.Path, memoizedDiskFile]
	// nodeModulesRealpathAliases maps realpath-based keys to sets of symlink-based keys,
	// for files inside node_modules that are accessed through directory symlinks.
	// This allows watch events (which use realpaths) to invalidate files cached under symlink paths.
	nodeModulesRealpathAliases map[tspath.Path]*realpathAliasSet
}

func (s *SnapshotFS) FS() vfs.FS {
	if s.sourceFS == nil {
		return s.fs
	}
	return s.sourceFS
}

func (s *SnapshotFS) GetFile(fileName string) FileHandle {
	return s.GetFileByPath(fileName, s.toPath(fileName))
}

func (s *SnapshotFS) FileExists(fileName string, path tspath.Path) bool {
	if s.requestLayer != nil {
		return fileSourceLayerFileExists(s.requestLayer.Lookup(fileName), func(name string) bool {
			return s.baseFileExists(name, s.toPath(name))
		}, s.fs)
	}
	return s.baseFileExists(fileName, path)
}

func (s *SnapshotFS) baseFileExists(fileName string, path tspath.Path) bool {
	if _, ok := s.overlays[path]; ok {
		return true
	}
	if _, ok := s.diskFiles[path]; ok {
		return true
	}
	return s.fs.FileExists(fileName)
}

func (s *SnapshotFS) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	if s.requestLayer != nil {
		return fileSourceLayerGetFile(s.requestLayer.Lookup(fileName), fileName, func(name string) FileHandle {
			return s.baseGetFileByPath(name, s.toPath(name))
		}, s.fs, func(load func() FileHandle) FileHandle {
			return memoizeFile(&s.readFiles, path, load)
		})
	}
	return s.baseGetFileByPath(fileName, path)
}

func (s *SnapshotFS) baseGetFileByPath(fileName string, path tspath.Path) FileHandle {
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

func (s *SnapshotFS) GetAccessibleEntries(directoryName string) vfs.Entries {
	if s.requestLayer != nil {
		return fileSourceLayerGetAccessibleEntries(s.requestLayer, directoryName, s.baseGetAccessibleEntries, s.fs, s.DirectoryExists, func(path string) bool {
			return s.FileExists(path, s.toPath(path))
		})
	}
	return s.baseGetAccessibleEntries(directoryName)
}

func (s *SnapshotFS) baseGetAccessibleEntries(directoryName string) vfs.Entries {
	entries := cloneVFSEntries(s.fs.GetAccessibleEntries(directoryName))
	path := s.toPath(directoryName)
	if diskDirectories, ok := s.diskDirectories[path]; ok {
		mergeDirectoryIntoEntries(diskDirectories, s.isFile, s.UseCaseSensitiveFileNames(), &entries)
	}
	if overlayDirectories, ok := s.overlayDirectories[path]; ok {
		mergeDirectoryIntoEntries(overlayDirectories, s.isFile, s.UseCaseSensitiveFileNames(), &entries)
	}
	slices.Sort(entries.Files)
	slices.Sort(entries.Directories)
	return entries
}

func (s *SnapshotFS) DirectoryExists(path string) bool {
	if s.requestLayer != nil {
		switch lookup := s.requestLayer.Lookup(path); lookup.Kind {
		case FileSourceLayerLookupDirectory:
			return true
		case FileSourceLayerLookupFallback:
			return s.baseDirectoryExists(lookup.Path)
		case FileSourceLayerLookupHost:
			return s.fs.DirectoryExists(lookup.Path)
		default:
			return false
		}
	}
	return s.baseDirectoryExists(path)
}

func (s *SnapshotFS) baseDirectoryExists(path string) bool {
	key := s.toPath(path)
	if _, ok := s.overlays[key]; ok {
		return false
	}
	if _, ok := s.overlayDirectories[key]; ok {
		return true
	}
	return s.fs.DirectoryExists(path)
}

func (s *SnapshotFS) Realpath(path string) string {
	// Editor overlays do not affect realpaths; only the request layer can redirect a path.
	return fileSourceLayerRealpath(s.requestLayer, path, s.fs.Realpath, s.fs)
}

func (s *SnapshotFS) Stat(path string) vfs.FileInfo {
	// Stat historically ignored editor overlays. Current consumers use FileExists
	// and GetFile for overlay-aware queries, so preserve that behavior here.
	return fileSourceLayerStat(s.requestLayer, path, s.fs.Stat, s.fs)
}

func (s *SnapshotFS) UseCaseSensitiveFileNames() bool {
	return s.fs.UseCaseSensitiveFileNames()
}

func (s *SnapshotFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	// Without a request layer, preserve the historical host-only walk. Overlay-aware
	// directory discovery uses GetAccessibleEntries instead.
	if s.requestLayer == nil {
		return s.fs.WalkDir(root, walkFn)
	}
	return walkFileSource(s, root, walkFn)
}

func (s *SnapshotFS) isOpenFile(fileName string) bool {
	path := s.toPath(fileName)
	_, ok := s.overlays[path]
	return ok
}

func (s *SnapshotFS) isFile(path tspath.Path) bool {
	if _, ok := s.diskFiles[path]; ok {
		return true
	}
	if _, ok := s.overlays[path]; ok {
		return true
	}
	return false
}

type snapshotFSBuilder struct {
	// hostFS caches host metadata queries during this snapshot build.
	hostFS vfs.FS
	// requestLayer is a filesystem override provided by the API, if present.
	// It is the topmost layer, above editor overlays, diskFiles, and the base host filesystem.
	requestLayer FileSourceLayer
	// sourceFS is a view of the full snapshotFSBuilder as a vfs.FS,
	// reading from each layer in order of precedence: requestLayer, overlays, diskFiles, hostFS.
	sourceFS                   *sourceFS
	prevOverlays               map[tspath.Path]*Overlay
	overlays                   map[tspath.Path]*Overlay
	overlayDirectories         map[tspath.Path]map[tspath.Path]string
	diskFiles                  *dirty.SyncMap[tspath.Path, *diskFile]
	diskDirectories            *dirty.Map[tspath.Path, dirty.CloneableMap[tspath.Path, string]]
	layerFiles                 collections.SyncMap[tspath.Path, memoizedDiskFile]
	nodeModulesRealpathAliases *dirty.SyncMap[tspath.Path, *realpathAliasSet]
	toPath                     func(string) tspath.Path
	accessibleEntries          collections.SyncMap[tspath.Path, *vfs.Entries]
}

func newSnapshotFSBuilder(
	hostFS vfs.FS,
	prevOverlays map[tspath.Path]*Overlay,
	overlays map[tspath.Path]*Overlay,
	diskFiles map[tspath.Path]*diskFile,
	diskDirectories map[tspath.Path]dirty.CloneableMap[tspath.Path, string],
	nodeModulesRealpathAliases map[tspath.Path]*realpathAliasSet,
	positionEncoding lsproto.PositionEncodingKind,
	toPath func(fileName string) tspath.Path,
	requestLayer FileSourceLayer,
) *snapshotFSBuilder {
	cachedFS := cachedvfs.From(hostFS)
	cachedFS.Enable()

	overlayDirectories := make(map[tspath.Path]map[tspath.Path]string)
	for path := range overlays {
		childPath := path
		child := overlays[path].FileName()
		for {
			parentPath := childPath.GetDirectoryPath()
			parent := tspath.GetDirectoryPath(child)
			if childPath == parentPath {
				break // reached root
			}
			baseName := tspath.GetBaseFileName(child)
			if dir, ok := overlayDirectories[parentPath]; ok {
				dir[childPath] = baseName
			} else {
				dir := make(map[tspath.Path]string)
				overlayDirectories[parentPath] = dir
				dir[childPath] = baseName
			}
			childPath = parentPath
			child = parent
		}
	}

	result := &snapshotFSBuilder{
		hostFS:                     cachedFS,
		requestLayer:               requestLayer,
		prevOverlays:               prevOverlays,
		overlays:                   overlays,
		overlayDirectories:         overlayDirectories,
		diskFiles:                  dirty.NewSyncMap(diskFiles),
		diskDirectories:            dirty.NewMap(diskDirectories),
		nodeModulesRealpathAliases: dirty.NewSyncMap(nodeModulesRealpathAliases),
		toPath:                     toPath,
	}
	result.sourceFS = newSourceFS(false, result, toPath)
	return result
}

func (s *snapshotFSBuilder) FS() vfs.FS {
	return s.sourceFS
}

func (s *snapshotFSBuilder) Finalize() (*SnapshotFS, bool) {
	// Synchronize directory structure based on added and deleted files (including overlays)
	var onDeletedFileOrDirectory func(path tspath.Path)
	var deleted map[tspath.Path]*diskFile

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
			if dirEntry, ok := s.diskDirectories.Get(parentPath); ok {
				dirEntry.Change(func(dir dirty.CloneableMap[tspath.Path, string]) {
					dir[childPath] = baseName
				})
				break
			} else {
				dir := make(dirty.CloneableMap[tspath.Path, string])
				dir[childPath] = baseName
				s.diskDirectories.Add(parentPath, dir)
			}
			childPath = parentPath
			child = parent
		}
	}

	onDeletedFileOrDirectory = func(path tspath.Path) {
		dirEntry, ok := s.diskDirectories.Get(path.GetDirectoryPath())
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

	diskFiles, changed := s.diskFiles.FinalizeWith(dirty.FinalizationHooks[tspath.Path, *diskFile]{
		OnDelete: func(key tspath.Path, value *diskFile) {
			if deleted == nil {
				deleted = make(map[tspath.Path]*diskFile)
			}
			deleted[key] = value
		},
		OnAdd: func(key tspath.Path, value *diskFile) {
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
					aliasSet.paths.Delete(deletedPath)
				})
				if e.Value().paths.Len() == 0 {
					e.Delete()
				}
			})
		}
	}

	nodeModulesRealpathAliases, aliasesChanged := s.nodeModulesRealpathAliases.Finalize()

	result := &SnapshotFS{
		fs:                         s.hostFS,
		requestLayer:               s.requestLayer,
		overlays:                   s.overlays,
		overlayDirectories:         s.overlayDirectories,
		diskFiles:                  diskFiles,
		diskDirectories:            core.FirstResult(s.diskDirectories.Finalize()),
		nodeModulesRealpathAliases: nodeModulesRealpathAliases,
		toPath:                     s.toPath,
	}
	result.sourceFS = newSourceFS(false, result, s.toPath)
	return result, changed || aliasesChanged
}

func (s *snapshotFSBuilder) isOpenFile(path tspath.Path) bool {
	_, ok := s.overlays[path]
	return ok
}

func (s *snapshotFSBuilder) GetFile(fileName string) FileHandle {
	path := s.toPath(fileName)
	return s.GetFileByPath(fileName, path)
}

func (s *snapshotFSBuilder) FileExists(fileName string, path tspath.Path) bool {
	if s.requestLayer != nil {
		return fileSourceLayerFileExists(s.requestLayer.Lookup(fileName), func(name string) bool {
			return s.baseFileExists(name, s.toPath(name))
		}, s.hostFS)
	}
	return s.baseFileExists(fileName, path)
}

func (s *snapshotFSBuilder) baseFileExists(fileName string, path tspath.Path) bool {
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
	return s.hostFS.FileExists(fileName)
}

func (s *snapshotFSBuilder) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	if s.requestLayer != nil {
		return s.getFileByPathWithLookup(fileName, path, s.requestLayer.Lookup(fileName))
	}
	return s.baseGetFileByPath(fileName, path)
}

func (s *snapshotFSBuilder) getFileByPathWithLookup(fileName string, path tspath.Path, lookup FileSourceLayerLookup) FileHandle {
	return fileSourceLayerGetFile(lookup, fileName, func(name string) FileHandle {
		return s.baseGetFileByPath(name, s.toPath(name))
	}, s.hostFS, func(load func() FileHandle) FileHandle {
		return memoizeFile(&s.layerFiles, path, load)
	})
}

func (s *snapshotFSBuilder) baseGetFileByPath(fileName string, path tspath.Path) FileHandle {
	if file, ok := s.overlays[path]; ok {
		return file
	}
	return s.getDiskFile(fileName, path, false)
}

func (s *snapshotFSBuilder) GetAccessibleEntries(path string) vfs.Entries {
	if s.requestLayer != nil {
		return fileSourceLayerGetAccessibleEntries(s.requestLayer, path, s.baseGetAccessibleEntries, s.hostFS, s.DirectoryExists, func(path string) bool {
			return s.FileExists(path, s.toPath(path))
		})
	}
	return s.baseGetAccessibleEntries(path)
}

func (s *snapshotFSBuilder) baseGetAccessibleEntries(path string) vfs.Entries {
	entries := s.hostFS.GetAccessibleEntries(path)
	p := s.toPath(path)
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
		Symlinks:    maps.Clone(entries.Symlinks),
	}
	mergeDirectoryIntoEntries(overlayDirectories, s.isOpenFile, s.UseCaseSensitiveFileNames(), merged)
	slices.Sort(merged.Files)
	slices.Sort(merged.Directories)
	merged, _ = s.accessibleEntries.LoadOrStore(p, merged)
	return *merged
}

func (s *snapshotFSBuilder) DirectoryExists(path string) bool {
	if s.requestLayer != nil {
		switch lookup := s.requestLayer.Lookup(path); lookup.Kind {
		case FileSourceLayerLookupDirectory:
			return true
		case FileSourceLayerLookupFallback:
			return s.baseDirectoryExists(lookup.Path)
		case FileSourceLayerLookupHost:
			return s.hostFS.DirectoryExists(lookup.Path)
		default:
			return false
		}
	}
	return s.baseDirectoryExists(path)
}

func (s *snapshotFSBuilder) baseDirectoryExists(path string) bool {
	key := s.toPath(path)
	if _, ok := s.overlays[key]; ok {
		return false
	}
	if _, ok := s.overlayDirectories[key]; ok {
		return true
	}
	return s.hostFS.DirectoryExists(path)
}

func (s *snapshotFSBuilder) Realpath(path string) string {
	// Editor overlays do not affect realpaths; only the request layer can redirect a path.
	return fileSourceLayerRealpath(s.requestLayer, path, s.hostFS.Realpath, s.hostFS)
}

func (s *snapshotFSBuilder) Stat(path string) vfs.FileInfo {
	// Stat historically ignored editor overlays. Current consumers use FileExists
	// and GetFile for overlay-aware queries, so preserve that behavior here.
	return fileSourceLayerStat(s.requestLayer, path, s.hostFS.Stat, s.hostFS)
}

func (s *snapshotFSBuilder) UseCaseSensitiveFileNames() bool {
	return s.hostFS.UseCaseSensitiveFileNames()
}

func (s *snapshotFSBuilder) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	// Without a request layer, preserve the historical host-only walk. Overlay-aware
	// directory discovery uses GetAccessibleEntries instead.
	if s.requestLayer == nil {
		return s.hostFS.WalkDir(root, walkFn)
	}
	return walkFileSource(s, root, walkFn)
}

func (s *snapshotFSBuilder) getDiskFile(fileName string, path tspath.Path, forceReload bool) FileHandle {
	entry, loaded := s.diskFiles.LoadOrStore(path, &diskFile{fileBase: fileBase{fileName: fileName}, needsReload: true})
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

func (s *snapshotFSBuilder) readDiskFile(fileName string) (string, bool) {
	return s.hostFS.ReadFile(fileName)
}

// recordRealpathAlias checks if fileName is accessed through a symlink and, if so,
// records a mapping from the realpath-based key to the symlink-based key.
// This is only called for files inside node_modules where symlinks are common.
func (s *snapshotFSBuilder) recordRealpathAlias(diskFileEntry *dirty.SyncMapEntry[tspath.Path, *diskFile], symlinkFileName string, symlinkPath tspath.Path) {
	realpath := s.hostFS.Realpath(symlinkFileName)
	realpathPath := s.toPath(realpath)
	if realpathPath != symlinkPath {
		diskFileEntry.Change(func(file *diskFile) {
			file.realpathPath = realpathPath
		})
		entry, _ := s.nodeModulesRealpathAliases.LoadOrStore(realpathPath, &realpathAliasSet{})
		entry.Change(func(aliasSet *realpathAliasSet) {
			aliasSet.Add(symlinkPath)
		})
	}
}

func (s *snapshotFSBuilder) reloadEntry(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) FileHandle {
	var fileName string
	entry.Locked(func(e dirty.Value[*diskFile]) {
		if e.Value() != nil {
			fileName = e.Value().fileName
		}
	})
	if fileName == "" {
		return nil
	}
	// Read file outside the lock to avoid blocking other goroutines.
	content, ok := s.readDiskFile(fileName)
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

func (s *snapshotFSBuilder) reloadEntryIfNeeded(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) FileHandle {
	var fileName string
	entry.Locked(func(e dirty.Value[*diskFile]) {
		if e.Value() != nil && !e.Value().MatchesDiskText() {
			fileName = e.Value().fileName
		}
	})
	if fileName != "" {
		// Read file outside the lock to avoid blocking other goroutines.
		content, ok := s.readDiskFile(fileName)
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
		path := s.toPath(uri.FileName())
		if _, ok := s.diskFiles.Load(path); ok {
			return true
		}
		if _, ok := s.nodeModulesRealpathAliases.Load(path); ok {
			return true
		}
	}
	for uri := range change.Deleted.Keys() {
		path := s.toPath(uri.FileName())
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
	s.diskFiles.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) bool {
		entry.Change(func(file *diskFile) {
			file.needsReload = true
		})
		return true
	})
}

func (s *snapshotFSBuilder) invalidateNodeModulesCache() {
	s.diskFiles.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) bool {
		if strings.Contains(string(entry.Key()), "/node_modules/") {
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
			path := s.toPath(uri.FileName())
			if s.requestLayer != nil {
				if fileSourceLayerShadows(s.requestLayer.Lookup(uri.FileName())) {
					filteredChanged.Add(uri)
					continue
				}
			}
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
		path := s.toPath(uri.FileName())
		if entry, ok := s.diskFiles.Load(path); ok {
			entry.Delete()
		}
	}
	return change
}

func (s *snapshotFSBuilder) reloadEntryIfContentChanged(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) (changed bool) {
	file := entry.Value()
	if file == nil {
		return true
	}
	content, ok := s.readDiskFile(file.fileName)
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
		path := s.toPath(uri.FileName())
		if aliases, ok := s.nodeModulesRealpathAliases[path]; ok {
			for aliasPath := range aliases.paths.Keys() {
				additionalChanged.Add(lsconv.FileNameToDocumentURI(string(aliasPath)))
			}
		}
	}
	for uri := range additionalChanged.Keys() {
		change.Changed.Add(uri)
	}

	var additionalDeleted collections.Set[lsproto.DocumentUri]
	for uri := range change.Deleted.Keys() {
		path := s.toPath(uri.FileName())
		if aliases, ok := s.nodeModulesRealpathAliases[path]; ok {
			for aliasPath := range aliases.paths.Keys() {
				additionalDeleted.Add(lsconv.FileNameToDocumentURI(string(aliasPath)))
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
func (s *snapshotFSBuilder) isRelevantFileName(uri lsproto.DocumentUri, contentMapperExtensions []string, contentMapperWatchedFiles *collections.Set[tspath.Path]) bool {
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
	if _, ok := s.overlays[path]; ok {
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
func (s *snapshotFSBuilder) expandAndFilterWatchEvents(change FileChangeSummary, contentMapperExtensions []string, contentMapperWatchedFiles *collections.Set[tspath.Path]) FileChangeSummary {
	if change.Deleted.Len() > 0 {
		var filteredDeleted collections.Set[lsproto.DocumentUri]
		for uri := range change.Deleted.Keys() {
			path := s.toPath(uri.FileName())
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
func isNodeModulesPath(path tspath.Path) bool {
	s := string(path)
	return strings.HasSuffix(s, "/node_modules") || strings.Contains(s, "/node_modules/")
}

// collectFilesRecursive recursively collects all cached file URIs under the
// given directory path using the diskDirectories and diskFiles maps.
func (s *snapshotFSBuilder) collectFilesRecursive(dirPath tspath.Path, files *collections.Set[lsproto.DocumentUri]) {
	dirEntry, ok := s.diskDirectories.Get(dirPath)
	if !ok {
		return
	}
	for childPath := range dirEntry.Value() {
		if entry, ok := s.diskFiles.Load(childPath); ok {
			if file := entry.Value(); file != nil {
				files.Add(lsconv.FileNameToDocumentURI(file.FileName()))
			}
		}
		s.collectFilesRecursive(childPath, files)
	}
}

func (s *snapshotFSBuilder) convertOpenAndCloseToChanges(change FileChangeSummary) FileChangeSummary {
	if change.Opened != "" && !tspath.IsDynamicFileName(change.Opened.FileName()) {
		path := s.toPath(change.Opened.FileName())
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
		if tspath.IsDynamicFileName(fileName) {
			continue
		}
		path := s.toPath(fileName)
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
	toPath             func(fileName string) tspath.Path
	missingDirectories *collections.SyncSet[tspath.Path]
	seenFiles          *collections.SyncSet[tspath.Path]
	source             FileSource
}

func newSourceFS(tracking bool, source FileSource, toPath func(fileName string) tspath.Path) *sourceFS {
	fs := &sourceFS{
		tracking: tracking,
		toPath:   toPath,
		source:   source,
	}
	if tracking {
		fs.seenFiles = &collections.SyncSet[tspath.Path]{}
		fs.missingDirectories = &collections.SyncSet[tspath.Path]{}
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
	fs.seenFiles.Add(fs.toPath(fileName))
}

func (fs *sourceFS) SeenFile(path tspath.Path) bool {
	if fs.seenFiles == nil {
		return false
	}
	return fs.seenFiles.Has(path)
}

func (fs *sourceFS) SeenFileOrMissingParentDirectory(path tspath.Path) bool {
	if fs.seenFiles != nil && fs.seenFiles.Has(path) {
		return true
	}
	if fs.missingDirectories != nil && !fs.missingDirectories.IsEmpty() {
		for {
			if fs.missingDirectories.Has(path) {
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
	exists := fs.source.DirectoryExists(path)
	if !exists && fs.tracking {
		fs.missingDirectories.Add(fs.toPath(path))
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
	return fs.source.Realpath(path)
}

// Stat implements vfs.FS.
func (fs *sourceFS) Stat(path string) vfs.FileInfo {
	return fs.source.Stat(path)
}

// UseCaseSensitiveFileNames implements vfs.FS.
func (fs *sourceFS) UseCaseSensitiveFileNames() bool {
	return fs.source.UseCaseSensitiveFileNames()
}

// WalkDir implements vfs.FS.
func (fs *sourceFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	return fs.source.WalkDir(root, walkFn)
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

func cloneVFSEntries(entries vfs.Entries) vfs.Entries {
	return vfs.Entries{
		Files:       slices.Clone(entries.Files),
		Directories: slices.Clone(entries.Directories),
		Symlinks:    maps.Clone(entries.Symlinks),
	}
}

func mergeDirectoryIntoEntries[M ~map[tspath.Path]string](
	directories M,
	isFile func(tspath.Path) bool,
	useCaseSensitiveFileNames bool,
	entries *vfs.Entries,
) {
	for childPath, childName := range directories {
		equal := func(name string) bool {
			return tspath.GetCanonicalFileName(name, useCaseSensitiveFileNames) ==
				tspath.GetCanonicalFileName(childName, useCaseSensitiveFileNames)
		}
		entries.Files = slices.DeleteFunc(entries.Files, equal)
		entries.Directories = slices.DeleteFunc(entries.Directories, equal)
		for name := range entries.Symlinks {
			if equal(name) {
				delete(entries.Symlinks, name)
			}
		}
		if isFile(childPath) {
			entries.Files = append(entries.Files, childName)
		} else {
			entries.Directories = append(entries.Directories, childName)
		}
	}
}
