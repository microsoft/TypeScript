package project

import (
	"strings"
	"sync"
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/dirty"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/cachedvfs"
	"github.com/zeebo/xxh3"
)

type FileSource interface {
	FS() vfs.FS
	GetFile(fileName string) FileHandle
	GetFileByPath(fileName string, path tspath.Path) FileHandle
	FileExists(fileName string, path tspath.Path) bool
	GetAccessibleEntries(path string) vfs.Entries
}

var (
	_ FileSource = (*snapshotFSBuilder)(nil)
	_ FileSource = (*SnapshotFS)(nil)
)

type SnapshotFS struct {
	toPath             func(fileName string) tspath.Path
	fs                 vfs.FS
	overlays           map[tspath.Path]*Overlay
	overlayDirectories map[tspath.Path]map[tspath.Path]string
	diskFiles          map[tspath.Path]*diskFile
	diskDirectories    map[tspath.Path]dirty.CloneableMap[tspath.Path, string]
	readFiles          collections.SyncMap[tspath.Path, memoizedDiskFile]
}

type memoizedDiskFile func() FileHandle

func (s *SnapshotFS) FS() vfs.FS {
	return s.fs
}

func (s *SnapshotFS) GetFile(fileName string) FileHandle {
	return s.GetFileByPath(fileName, s.toPath(fileName))
}

func (s *SnapshotFS) FileExists(fileName string, path tspath.Path) bool {
	if _, ok := s.overlays[path]; ok {
		return true
	}
	if _, ok := s.diskFiles[path]; ok {
		return true
	}
	return s.fs.FileExists(fileName)
}

func (s *SnapshotFS) GetFileByPath(fileName string, path tspath.Path) FileHandle {
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
	var entries vfs.Entries
	path := s.toPath(directoryName)
	if diskDirectories, ok := s.diskDirectories[path]; ok {
		readDirectoryIntoEntries(diskDirectories, s.isFile, &entries)
	}
	if overlayDirectories, ok := s.overlayDirectories[path]; ok {
		readDirectoryIntoEntries(overlayDirectories, s.isFile, &entries)
	}
	return entries
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
	fs                 vfs.FS
	prevOverlays       map[tspath.Path]*Overlay
	overlays           map[tspath.Path]*Overlay
	overlayDirectories map[tspath.Path]map[tspath.Path]string
	diskFiles          *dirty.SyncMap[tspath.Path, *diskFile]
	diskDirectories    *dirty.Map[tspath.Path, dirty.CloneableMap[tspath.Path, string]]
	toPath             func(string) tspath.Path
}

func newSnapshotFSBuilder(
	fs vfs.FS,
	prevOverlays map[tspath.Path]*Overlay,
	overlays map[tspath.Path]*Overlay,
	diskFiles map[tspath.Path]*diskFile,
	diskDirectories map[tspath.Path]dirty.CloneableMap[tspath.Path, string],
	positionEncoding lsproto.PositionEncodingKind,
	toPath func(fileName string) tspath.Path,
) *snapshotFSBuilder {
	cachedFS := cachedvfs.From(fs)
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

	return &snapshotFSBuilder{
		fs:                 cachedFS,
		prevOverlays:       prevOverlays,
		overlays:           overlays,
		overlayDirectories: overlayDirectories,
		diskFiles:          dirty.NewSyncMap(diskFiles),
		diskDirectories:    dirty.NewMap(diskDirectories),
		toPath:             toPath,
	}
}

func (s *snapshotFSBuilder) FS() vfs.FS {
	return s.fs
}

func (s *snapshotFSBuilder) Finalize() (*SnapshotFS, bool) {
	// Synchronize directory structure based on added and deleted files (including overlays)
	var onDeletedFileOrDirectory func(path tspath.Path)
	var deleted collections.Set[tspath.Path]

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
			deleted.Add(key)
		},
		OnAdd: func(key tspath.Path, value *diskFile) {
			onAddedFile(key, value.FileName())
		},
	})

	for path := range deleted.Keys() {
		onDeletedFileOrDirectory(path)
	}

	return &SnapshotFS{
		fs:                 s.fs,
		overlays:           s.overlays,
		overlayDirectories: s.overlayDirectories,
		diskFiles:          diskFiles,
		diskDirectories:    core.FirstResult(s.diskDirectories.Finalize()),
		toPath:             s.toPath,
	}, changed
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
	if _, ok := s.overlays[path]; ok {
		return true
	}
	if entry, ok := s.diskFiles.Load(path); ok {
		val := entry.Value()
		if val == nil {
			return false
		}
		if val.MatchesDiskText() {
			return true
		}
		// Entry is dirty — reload to check current state on disk.
		return s.reloadEntryIfNeeded(entry) != nil
	}
	// Path never loaded into diskFiles — use cached stat (no file read).
	return s.fs.FileExists(fileName)
}

func (s *snapshotFSBuilder) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	if file, ok := s.overlays[path]; ok {
		return file
	}
	return s.getDiskFile(fileName, path, false)
}

func (s *snapshotFSBuilder) GetAccessibleEntries(path string) vfs.Entries {
	entries := s.fs.GetAccessibleEntries(path)
	overlayDirectories, ok := s.overlayDirectories[s.toPath(path)]
	if !ok {
		return entries
	}

	readDirectoryIntoEntries(overlayDirectories, s.isOpenFile, &entries)
	return entries
}

func (s *snapshotFSBuilder) getDiskFile(fileName string, path tspath.Path, forceReload bool) FileHandle {
	if entry, _ := s.diskFiles.LoadOrStore(path, &diskFile{fileBase: fileBase{fileName: fileName}, needsReload: true}); entry != nil {
		if forceReload {
			return s.reloadEntry(entry)
		}
		return s.reloadEntryIfNeeded(entry)
	}
	return nil
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

func (s *snapshotFSBuilder) reloadEntryIfNeeded(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) FileHandle {
	var fileName string
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
		path := s.toPath(uri.FileName())
		if _, ok := s.diskFiles.Load(path); ok {
			return true
		}
	}
	for uri := range change.Deleted.Keys() {
		path := s.toPath(uri.FileName())
		if _, ok := s.diskFiles.Load(path); ok {
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

func (s *snapshotFSBuilder) markDirtyFiles(change FileChangeSummary) {
	for uri := range change.Changed.Keys() {
		path := s.toPath(uri.FileName())
		if entry, ok := s.diskFiles.Load(path); ok {
			entry.Change(func(file *diskFile) {
				file.needsReload = true
			})
		}
	}
	for uri := range change.Deleted.Keys() {
		path := s.toPath(uri.FileName())
		if entry, ok := s.diskFiles.Load(path); ok {
			entry.Delete()
		}
	}
}

// hasRelevantWatchExtension returns true if the given path ends with a file
// extension relevant to TypeScript compilation. This is used to quickly filter
// out watch events for files that cannot affect the project.
func hasRelevantWatchExtension(path string) bool {
	i := strings.LastIndexByte(path, '.')
	if i < 0 {
		return false
	}
	switch path[i:] {
	case ".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".mts", ".cts", ".json":
		return true
	}
	return false
}

// expandAndFilterWatchEvents expands directory deletion URIs into individual
// file deletion URIs using the cached directory structure, and filters out
// watch events for paths that are neither known directories nor have relevant
// file extensions.
func (s *snapshotFSBuilder) expandAndFilterWatchEvents(change FileChangeSummary) FileChangeSummary {
	if change.Deleted.Len() > 0 {
		var filteredDeleted collections.Set[lsproto.DocumentUri]
		for uri := range change.Deleted.Keys() {
			path := s.toPath(uri.FileName())
			if _, ok := s.diskDirectories.Get(path); ok {
				s.collectFilesRecursive(path, &filteredDeleted)
			} else if hasRelevantWatchExtension(string(path)) {
				filteredDeleted.Add(uri)
			}
		}
		change.Deleted = filteredDeleted
	}

	if change.Changed.Len() > 0 {
		var filteredChanged collections.Set[lsproto.DocumentUri]
		for uri := range change.Changed.Keys() {
			if hasRelevantWatchExtension(string(s.toPath(uri.FileName()))) {
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
	exists := fs.source.FS().DirectoryExists(path)
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

// WalkDir implements vfs.FS.
func (fs *sourceFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	return fs.source.FS().WalkDir(root, walkFn)
}

// WriteFile implements vfs.FS.
func (fs *sourceFS) WriteFile(path string, data string) error {
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

func readDirectoryIntoEntries[M ~map[tspath.Path]string](directories M, isFile func(tspath.Path) bool, entries *vfs.Entries) {
	for childPath, childName := range directories {
		if isFile(childPath) {
			entries.Files = append(entries.Files, childName)
		} else {
			entries.Directories = append(entries.Directories, childName)
		}
	}
}
