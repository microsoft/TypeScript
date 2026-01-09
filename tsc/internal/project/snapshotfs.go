package project

import (
	"strings"
	"sync"
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
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
}

var (
	_ FileSource = (*snapshotFSBuilder)(nil)
	_ FileSource = (*SnapshotFS)(nil)
)

type SnapshotFS struct {
	toPath    func(fileName string) tspath.Path
	fs        vfs.FS
	overlays  map[tspath.Path]*Overlay
	diskFiles map[tspath.Path]*diskFile
	readFiles collections.SyncMap[tspath.Path, memoizedDiskFile]
}

type memoizedDiskFile func() FileHandle

func (s *SnapshotFS) FS() vfs.FS {
	return s.fs
}

func (s *SnapshotFS) GetFile(fileName string) FileHandle {
	return s.GetFileByPath(fileName, s.toPath(fileName))
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

func (s *SnapshotFS) isOpenFile(fileName string) bool {
	path := s.toPath(fileName)
	_, ok := s.overlays[path]
	return ok
}

type snapshotFSBuilder struct {
	fs        vfs.FS
	overlays  map[tspath.Path]*Overlay
	diskFiles *dirty.SyncMap[tspath.Path, *diskFile]
	toPath    func(string) tspath.Path
}

func newSnapshotFSBuilder(
	fs vfs.FS,
	overlays map[tspath.Path]*Overlay,
	diskFiles map[tspath.Path]*diskFile,
	positionEncoding lsproto.PositionEncodingKind,
	toPath func(fileName string) tspath.Path,
) *snapshotFSBuilder {
	cachedFS := cachedvfs.From(fs)
	cachedFS.Enable()
	return &snapshotFSBuilder{
		fs:        cachedFS,
		overlays:  overlays,
		diskFiles: dirty.NewSyncMap(diskFiles, nil),
		toPath:    toPath,
	}
}

func (s *snapshotFSBuilder) FS() vfs.FS {
	return s.fs
}

func (s *snapshotFSBuilder) Finalize() (*SnapshotFS, bool) {
	diskFiles, changed := s.diskFiles.Finalize()
	return &SnapshotFS{
		fs:        s.fs,
		overlays:  s.overlays,
		diskFiles: diskFiles,
		toPath:    s.toPath,
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

func (s *snapshotFSBuilder) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	if file, ok := s.overlays[path]; ok {
		return file
	}
	if entry, _ := s.diskFiles.LoadOrStore(path, &diskFile{fileBase: fileBase{fileName: fileName}, needsReload: true}); entry != nil {
		return s.reloadEntryIfNeeded(entry)
	}
	return nil
}

func (s *snapshotFSBuilder) reloadEntryIfNeeded(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) FileHandle {
	entry.Locked(func(entry dirty.Value[*diskFile]) {
		if entry.Value() != nil && !entry.Value().MatchesDiskText() {
			if content, ok := s.fs.ReadFile(entry.Value().fileName); ok {
				entry.Change(func(file *diskFile) {
					file.content = content
					file.hash = xxh3.HashString128(content)
					file.needsReload = false
				})
			} else {
				entry.Delete()
			}
		}
	})
	if entry == nil || entry.Value() == nil {
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
			entry.Change(func(file *diskFile) {
				file.needsReload = true
			})
		}
	}
}

// sourceFS is a vfs.FS that sources files from a FileSource and tracks seen files.
type sourceFS struct {
	tracking  bool
	toPath    func(fileName string) tspath.Path
	seenFiles *collections.SyncSet[tspath.Path]
	source    FileSource
}

func newSourceFS(tracking bool, source FileSource, toPath func(fileName string) tspath.Path) *sourceFS {
	fs := &sourceFS{
		tracking: tracking,
		toPath:   toPath,
		source:   source,
	}
	if tracking {
		fs.seenFiles = &collections.SyncSet[tspath.Path]{}
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

func (fs *sourceFS) Seen(path tspath.Path) bool {
	if fs.seenFiles == nil {
		return false
	}
	return fs.seenFiles.Has(path)
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
	return fs.source.FS().DirectoryExists(path)
}

// FileExists implements vfs.FS.
func (fs *sourceFS) FileExists(path string) bool {
	if fh := fs.GetFile(path); fh != nil {
		return true
	}
	return fs.source.FS().FileExists(path)
}

// GetAccessibleEntries implements vfs.FS.
func (fs *sourceFS) GetAccessibleEntries(path string) vfs.Entries {
	return fs.source.FS().GetAccessibleEntries(path)
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
func (fs *sourceFS) WriteFile(path string, data string, writeByteOrderMark bool) error {
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
