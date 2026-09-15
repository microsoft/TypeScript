package project

import (
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

// FileSource is a view of the filesystem that also hands out FileHandles. It is
// deliberately self-contained: every filesystem question is answered here, so
// stacking one source on another composes and nothing can reach past a layer to
// the filesystem underneath.
type FileSource interface {
	GetFile(fileName string) FileHandle
	GetFileByPath(fileName string, path tspath.Path) FileHandle
	FileExists(fileName string, path tspath.Path) bool
	DirectoryExists(path string) bool
	GetAccessibleEntries(path string) vfs.Entries
	Realpath(path string) string
	UseCaseSensitiveFileNames() bool
	// Stat and WalkDir are deliberately absent. Nothing in the project system calls
	// them, and neither can describe an overlay or layer content that has no entry
	// on disk, so answering from the host would contradict GetFile.
}

// FileSystemLayer is a source of file contents that can be stacked above a snapshot's
// own view of the filesystem. It is not a vfs.FS: a layer answers questions only in
// terms of what it was stacked over, so it has no meaningful standalone behavior.
type FileSystemLayer interface {
	// Shadows reports whether the layer decides what is at path on its own, rather
	// than deferring to what it was stacked over.
	Shadows(path string) bool
	// ReadFile returns the content the layer itself holds for fileName. Unlike a
	// filesystem read it never reaches past the layer: it reports false for any path
	// the layer hides, or defers to whatever it was stacked over.
	ReadFile(fileName string) (string, bool)
	// Stack returns a FileSource reading from this layer, resolving any path the
	// layer does not supply itself through base.
	Stack(base FileSource) FileSource
}

// stack returns the top of a snapshot's file source stack.
func stack(layer FileSystemLayer, base FileSource) FileSource {
	if layer == nil {
		return base
	}
	return layer.Stack(base)
}

// The lower layers are reached through accessors so that the split between upper
// and lower stays inside this file; everywhere else asks the filesystem itself.

func (s *SnapshotFS) host() vfs.FS                         { return s.lower.host }
func (s *SnapshotFS) toPath(fileName string) tspath.Path   { return s.lower.toPath(fileName) }
func (s *SnapshotFS) overlays() map[tspath.Path]*Overlay   { return s.lower.overlays }
func (s *SnapshotFS) diskFiles() map[tspath.Path]*diskFile { return s.lower.diskFiles }
func (s *SnapshotFS) isOpenFile(fileName string) bool      { return s.lower.isOpenFile(fileName) }

func (s *SnapshotFS) diskDirectories() map[tspath.Path]dirty.CloneableMap[tspath.Path, string] {
	return s.lower.diskDirectories
}

func (s *SnapshotFS) nodeModulesRealpathAliases() map[tspath.Path]*realpathAliasSet {
	return s.lower.nodeModulesRealpathAliases
}

func (s *SnapshotFS) expandRealpathAliases(change FileChangeSummary) FileChangeSummary {
	return s.lower.expandRealpathAliases(change)
}

func (s *snapshotFSBuilder) toPath(fileName string) tspath.Path { return s.lower.toPath(fileName) }
func (s *snapshotFSBuilder) overlays() map[tspath.Path]*Overlay { return s.lower.overlays }
func (s *snapshotFSBuilder) isOpenFile(path tspath.Path) bool   { return s.lower.isOpenFile(path) }
func (s *snapshotFSBuilder) invalidateCache()                   { s.lower.invalidateCache() }
func (s *snapshotFSBuilder) invalidateNodeModulesCache()        { s.lower.invalidateNodeModulesCache() }

func (s *snapshotFSBuilder) diskFiles() *dirty.SyncMap[tspath.Path, *diskFile] {
	return s.lower.diskFiles
}

func (s *snapshotFSBuilder) host() vfs.FS { return s.lower.host }

func (s *snapshotFSBuilder) overlayDirectories() map[tspath.Path]map[tspath.Path]string {
	return s.lower.overlayDirectories
}

func (s *snapshotFSBuilder) watchChangesOverlapCache(change FileChangeSummary) bool {
	return s.lower.watchChangesOverlapCache(change)
}

// initStack composes the layers into the FileSource that SnapshotFS presents. It
// cannot be done in a struct literal because the composition refers back to the
// SnapshotFS, so every construction site calls this before the value is read.
func (s *SnapshotFS) initStack() {
	s.FileSource = stack(s.upperLayer, &s.lower)
}

// lowerLayers is a FileSource over everything beneath an API-supplied upperLayer:
// editor overlays, then files cached from disk, then the host filesystem. Stacking
// an upperLayer above it produces the union that SnapshotFS and snapshotFSBuilder
// present.
//
// These hold their owner in a field rather than embedding it so that a method left
// undefined here fails to compile, instead of silently promoting the whole-stack
// method and recursing back through the layer.
var (
	_ FileSource = (*lowerLayers)(nil)
	_ FileSource = (*builderLowerLayers)(nil)
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

// lowerLayers owns the layers beneath an API-supplied one: editor overlays, the
// files cached from the host, and the host itself. Upper and lower are the terms a
// union filesystem uses for this - overlayfs calls them upperdir and lowerdir -
// rather than top and bottom, which would suggest a stack with one item on top.
type lowerLayers struct {
	host               vfs.FS
	toPath             func(fileName string) tspath.Path
	overlays           map[tspath.Path]*Overlay
	overlayDirectories map[tspath.Path]map[tspath.Path]string
	diskFiles          map[tspath.Path]*diskFile
	diskDirectories    map[tspath.Path]dirty.CloneableMap[tspath.Path, string]
	readFiles          collections.SyncMap[tspath.Path, memoizedDiskFile]
	// nodeModulesRealpathAliases maps realpath-based keys to sets of symlink-based keys,
	// for files inside node_modules that are accessed through directory symlinks.
	// This allows watch events (which use realpaths) to invalidate files cached under symlink paths.
	nodeModulesRealpathAliases map[tspath.Path]*realpathAliasSet
}

type SnapshotFS struct {
	// FileSource is the union of upperLayer over lower. It is embedded so that
	// reading a SnapshotFS always reads through the upper layer.
	FileSource
	lower lowerLayers
	// upperLayer is a filesystem supplied by an API request, layered above everything
	// else here. It is nil when the snapshot reads the session host directly.
	upperLayer FileSystemLayer
}

type memoizedDiskFile func() FileHandle

// Realpath implements FileSource. Overlays and layer contents have no path on disk,
// so symlink resolution is the host's answer for paths that do exist there.
func (s *lowerLayers) Realpath(path string) string {
	return s.host.Realpath(path)
}

// UseCaseSensitiveFileNames implements FileSource.
func (s *lowerLayers) UseCaseSensitiveFileNames() bool {
	return s.host.UseCaseSensitiveFileNames()
}

func (s *lowerLayers) GetFile(fileName string) FileHandle {
	return s.GetFileByPath(fileName, s.toPath(fileName))
}

func (s *lowerLayers) FileExists(fileName string, path tspath.Path) bool {
	if _, ok := s.overlays[path]; ok {
		return true
	}
	if _, ok := s.diskFiles[path]; ok {
		return true
	}
	return s.host.FileExists(fileName)
}

func (s *lowerLayers) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	if file, ok := s.overlays[path]; ok {
		return file
	}
	if file, ok := s.diskFiles[path]; ok {
		return file
	}
	newEntry := memoizedDiskFile(sync.OnceValue(func() FileHandle {
		if contents, ok := s.host.ReadFile(fileName); ok {
			return newDiskFile(fileName, contents)
		}
		return nil
	}))
	entry, _ := s.readFiles.LoadOrStore(path, newEntry)
	return entry()
}

// DirectoryExists reports directories the snapshot knows of even when the host does
// not, which is the case for a directory that exists only because an editor overlay
// lives inside it.
func (s *lowerLayers) DirectoryExists(directoryName string) bool {
	path := s.toPath(directoryName)
	if _, ok := s.overlayDirectories[path]; ok {
		return true
	}
	if _, ok := s.diskDirectories[path]; ok {
		return true
	}
	return s.host.DirectoryExists(directoryName)
}

func (s *lowerLayers) GetAccessibleEntries(directoryName string) vfs.Entries {
	entries := s.host.GetAccessibleEntries(directoryName)
	path := s.toPath(directoryName)
	return mergeOverlayEntries(entries, s.overlayDirectories[path], s.overlays, s.host.UseCaseSensitiveFileNames())
}

func (s *lowerLayers) isOpenFile(fileName string) bool {
	path := s.toPath(fileName)
	_, ok := s.overlays[path]
	return ok
}

func (s *lowerLayers) isFile(path tspath.Path) bool {
	if _, ok := s.diskFiles[path]; ok {
		return true
	}
	if _, ok := s.overlays[path]; ok {
		return true
	}
	return false
}

// builderLowerLayers owns the lower layers while a snapshot is being built - editor overlays, the cache of files read from the host, and the
// host itself - along with the bookkeeping that keeps that cache in sync.
type builderLowerLayers struct {
	host                       vfs.FS
	toPath                     func(string) tspath.Path
	overlays                   map[tspath.Path]*Overlay
	overlayDirectories         map[tspath.Path]map[tspath.Path]string
	diskFiles                  *dirty.SyncMap[tspath.Path, *diskFile]
	diskDirectories            *dirty.Map[tspath.Path, dirty.CloneableMap[tspath.Path, string]]
	nodeModulesRealpathAliases *dirty.SyncMap[tspath.Path, *realpathAliasSet]
	accessibleEntries          collections.SyncMap[tspath.Path, *vfs.Entries]
}

type snapshotFSBuilder struct {
	// FileSource is the union of upperLayer over lower. It is embedded so that
	// reading a snapshotFSBuilder always reads through the full stack.
	FileSource
	// upperLayer is a filesystem supplied by an API request, layered above everything
	// else here. It is nil when the snapshot reads the session host directly.
	upperLayer FileSystemLayer
	lower      builderLowerLayers
	// prevUpperLayer and prevOverlays are what the previous snapshot had, used to
	// tell whether a path a change was reported for really changed.
	prevUpperLayer FileSystemLayer
	prevOverlays   map[tspath.Path]*Overlay
}

func newSnapshotFSBuilder(
	fs vfs.FS,
	layer FileSystemLayer,
	prevLayer FileSystemLayer,
	prevOverlays map[tspath.Path]*Overlay,
	overlays map[tspath.Path]*Overlay,
	diskFiles map[tspath.Path]*diskFile,
	diskDirectories map[tspath.Path]dirty.CloneableMap[tspath.Path, string],
	nodeModulesRealpathAliases map[tspath.Path]*realpathAliasSet,
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

	builder := &snapshotFSBuilder{
		upperLayer:     layer,
		prevUpperLayer: prevLayer,
		prevOverlays:   prevOverlays,
		lower: builderLowerLayers{
			host:                       cachedFS,
			toPath:                     toPath,
			overlays:                   overlays,
			overlayDirectories:         overlayDirectories,
			diskFiles:                  dirty.NewSyncMap(diskFiles),
			diskDirectories:            dirty.NewMap(diskDirectories),
			nodeModulesRealpathAliases: dirty.NewSyncMap(nodeModulesRealpathAliases),
		},
	}
	builder.initStack()
	return builder
}

// Realpath implements FileSource. Overlays and layer contents have no path on disk,
// so symlink resolution is the host's answer for paths that do exist there.
func (s *builderLowerLayers) Realpath(path string) string {
	return s.host.Realpath(path)
}

// UseCaseSensitiveFileNames implements FileSource.
func (s *builderLowerLayers) UseCaseSensitiveFileNames() bool {
	return s.host.UseCaseSensitiveFileNames()
}

// initStack composes the layers into the FileSource that snapshotFSBuilder presents.
// See SnapshotFS.initStack.
func (s *snapshotFSBuilder) initStack() {
	s.FileSource = stack(s.upperLayer, &s.lower)
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
			if dirEntry, ok := s.lower.diskDirectories.Get(parentPath); ok {
				dirEntry.Change(func(dir dirty.CloneableMap[tspath.Path, string]) {
					dir[childPath] = baseName
				})
				break
			} else {
				dir := make(dirty.CloneableMap[tspath.Path, string])
				dir[childPath] = baseName
				s.lower.diskDirectories.Add(parentPath, dir)
			}
			childPath = parentPath
			child = parent
		}
	}

	onDeletedFileOrDirectory = func(path tspath.Path) {
		dirEntry, ok := s.lower.diskDirectories.Get(path.GetDirectoryPath())
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

	diskFiles, changed := s.lower.diskFiles.FinalizeWith(dirty.FinalizationHooks[tspath.Path, *diskFile]{
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
		if entry, ok := s.lower.nodeModulesRealpathAliases.Load(deletedFile.realpathPath); ok {
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

	nodeModulesRealpathAliases, aliasesChanged := s.lower.nodeModulesRealpathAliases.Finalize()

	snapshotFS := &SnapshotFS{
		upperLayer: s.upperLayer,
		lower: lowerLayers{
			host:                       s.lower.host,
			toPath:                     s.lower.toPath,
			overlays:                   s.lower.overlays,
			overlayDirectories:         s.lower.overlayDirectories,
			diskFiles:                  diskFiles,
			diskDirectories:            core.FirstResult(s.lower.diskDirectories.Finalize()),
			nodeModulesRealpathAliases: nodeModulesRealpathAliases,
		},
	}
	snapshotFS.initStack()
	return snapshotFS, changed || aliasesChanged
}

func (s *builderLowerLayers) isOpenFile(path tspath.Path) bool {
	_, ok := s.overlays[path]
	return ok
}

func (s *builderLowerLayers) GetFile(fileName string) FileHandle {
	path := s.toPath(fileName)
	return s.GetFileByPath(fileName, path)
}

func (s *builderLowerLayers) FileExists(fileName string, path tspath.Path) bool {
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
	return s.host.FileExists(fileName)
}

func (s *builderLowerLayers) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	if file, ok := s.overlays[path]; ok {
		return file
	}
	return s.getDiskFile(fileName, path, false)
}

// DirectoryExists reports directories the snapshot knows of even when the host does
// not, which is the case for a directory that exists only because an editor overlay
// lives inside it.
func (s *builderLowerLayers) DirectoryExists(directoryName string) bool {
	path := s.toPath(directoryName)
	if _, ok := s.overlayDirectories[path]; ok {
		return true
	}
	if _, ok := s.diskDirectories.Get(path); ok {
		return true
	}
	return s.host.DirectoryExists(directoryName)
}

func (s *builderLowerLayers) GetAccessibleEntries(path string) vfs.Entries {
	entries := s.host.GetAccessibleEntries(path)
	p := s.toPath(path)
	overlayDirectories, ok := s.overlayDirectories[p]
	if !ok {
		return entries
	}
	if merged, ok := s.accessibleEntries.Load(p); ok {
		return *merged
	}
	merged := mergeOverlayEntries(entries, overlayDirectories, s.overlays, s.host.UseCaseSensitiveFileNames())
	stored, _ := s.accessibleEntries.LoadOrStore(p, &merged)
	return *stored
}

func (s *builderLowerLayers) getDiskFile(fileName string, path tspath.Path, forceReload bool) FileHandle {
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

// recordRealpathAlias checks if fileName is accessed through a symlink and, if so,
// records a mapping from the realpath-based key to the symlink-based key.
// This is only called for files inside node_modules where symlinks are common.
func (s *builderLowerLayers) recordRealpathAlias(diskFileEntry *dirty.SyncMapEntry[tspath.Path, *diskFile], symlinkFileName string, symlinkPath tspath.Path) {
	realpath := s.host.Realpath(symlinkFileName)
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

func (s *builderLowerLayers) reloadEntry(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) FileHandle {
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
	content, ok := s.host.ReadFile(fileName)
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

func (s *builderLowerLayers) reloadEntryIfNeeded(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) FileHandle {
	var fileName string
	entry.Locked(func(e dirty.Value[*diskFile]) {
		if e.Value() != nil && !e.Value().MatchesDiskText() {
			fileName = e.Value().fileName
		}
	})
	if fileName != "" {
		// Read file outside the lock to avoid blocking other goroutines.
		content, ok := s.host.ReadFile(fileName)
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

func (s *builderLowerLayers) watchChangesOverlapCache(change FileChangeSummary) bool {
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

func (s *builderLowerLayers) invalidateCache() {
	s.diskFiles.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) bool {
		entry.Change(func(file *diskFile) {
			file.needsReload = true
		})
		return true
	})
}

func (s *builderLowerLayers) invalidateNodeModulesCache() {
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
			fileName := uri.FileName()
			path := s.lower.toPath(fileName)
			// A path the layer decides has nothing on disk worth re-reading, so
			// compare what it now supplies against what the snapshot already had.
			if s.upperLayer != nil && s.upperLayer.Shadows(fileName) {
				if !s.upperLayerMatchesPrevious(fileName, path) {
					filteredChanged.Add(uri)
				}
				continue
			}
			if _, ok := s.lower.overlays[path]; ok {
				filteredChanged.Add(uri)
				continue
			}
			entry, ok := s.lower.diskFiles.Load(path)
			if !ok {
				filteredChanged.Add(uri)
				continue
			}
			wg.Queue(func() {
				if s.lower.reloadEntryIfContentChanged(entry) {
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
		path := s.lower.toPath(uri.FileName())
		if entry, ok := s.lower.diskFiles.Load(path); ok {
			entry.Delete()
		}
	}
	return change
}

// upperLayerMatchesPrevious reports whether the upper layer now supplies exactly
// what the previous snapshot showed at path, in which case nothing downstream needs
// rebuilding. Overlays and cached files carry a precomputed hash, so those compare
// hashes; a layer only hands back content, which is cheaper to compare directly
// than to hash first.
func (s *snapshotFSBuilder) upperLayerMatchesPrevious(fileName string, path tspath.Path) bool {
	file := s.GetFileByPath(fileName, path)
	if file == nil {
		return false
	}
	if s.prevUpperLayer != nil && s.prevUpperLayer.Shadows(fileName) {
		// Shadowed paths are supplied by the layer itself, so this reads no further.
		content, ok := s.prevUpperLayer.ReadFile(fileName)
		return ok && content == file.Content()
	}
	if overlay, ok := s.prevOverlays[path]; ok {
		return overlay.Hash() == file.Hash()
	}
	entry, ok := s.lower.diskFiles.Load(path)
	if !ok {
		return false
	}
	cached := entry.Value()
	return cached != nil && cached.Hash() == file.Hash()
}

func (s *builderLowerLayers) reloadEntryIfContentChanged(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) (changed bool) {
	file := entry.Value()
	if file == nil {
		return true
	}
	content, ok := s.host.ReadFile(file.fileName)
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
func (s *lowerLayers) expandRealpathAliases(change FileChangeSummary) FileChangeSummary {
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
	if contentMapperWatchedFiles != nil && contentMapperWatchedFiles.Has(s.lower.toPath(fileName)) {
		return true
	}
	if tspath.FileExtensionIsOneOf(fileName, contentMapperExtensions) {
		return true
	}
	if tspath.IsDynamicFileName(fileName) {
		return true
	}
	path := s.lower.toPath(fileName)
	if _, ok := s.lower.overlays[path]; ok {
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
			path := s.lower.toPath(uri.FileName())
			if _, ok := s.lower.diskDirectories.Get(path); ok {
				s.lower.collectFilesRecursive(path, &filteredDeleted)
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
func (s *builderLowerLayers) collectFilesRecursive(dirPath tspath.Path, files *collections.Set[lsproto.DocumentUri]) {
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
		path := s.lower.toPath(change.Opened.FileName())
		if entry, ok := s.lower.diskFiles.Load(path); !ok || entry.Original() == nil {
			change.Created.Add(change.Opened)
		} else if overlay, ok := s.lower.overlays[path]; ok {
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
		path := s.lower.toPath(fileName)
		// We may have ignored watcher events while the file was open, so force a reload.
		if fh := s.lower.getDiskFile(fileName, path, true /*forceReload*/); fh != nil {
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

// Stat implements vfs.FS. A snapshot cannot stat its contents: see FileSource.
func (fs *sourceFS) Stat(path string) vfs.FileInfo {
	panic("unimplemented")
}

// UseCaseSensitiveFileNames implements vfs.FS.
func (fs *sourceFS) UseCaseSensitiveFileNames() bool {
	return fs.source.UseCaseSensitiveFileNames()
}

// WalkDir implements vfs.FS. A snapshot cannot be walked: see FileSource.
func (fs *sourceFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	panic("unimplemented")
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

// mergeOverlayEntries adds to a host directory listing the entries contributed by open
// files, which the host does not report if they have never been saved. A path in the
// overlay tree that is not itself an open file is an ancestor directory of one.
func mergeOverlayEntries(hostEntries vfs.Entries, overlayDirectory map[tspath.Path]string, overlays map[tspath.Path]*Overlay, useCaseSensitiveFileNames bool) vfs.Entries {
	merged := vfs.Entries{
		Files:       slices.Clip(hostEntries.Files),
		Directories: slices.Clip(hostEntries.Directories),
		Symlinks:    hostEntries.Symlinks,
	}
	contains := func(names []string, name string) bool {
		return slices.ContainsFunc(names, func(existing string) bool {
			return tspath.GetCanonicalFileName(existing, useCaseSensitiveFileNames) == tspath.GetCanonicalFileName(name, useCaseSensitiveFileNames)
		})
	}
	for childPath, childName := range overlayDirectory {
		if _, isOpenFile := overlays[childPath]; isOpenFile {
			if !contains(merged.Files, childName) {
				merged.Files = append(merged.Files, childName)
			}
		} else if !contains(merged.Directories, childName) {
			merged.Directories = append(merged.Directories, childName)
		}
	}
	return merged
}
