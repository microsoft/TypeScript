package project

import (
	"sync"

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
}

var (
	_ FileSource = (*snapshotFSBuilder)(nil)
	_ FileSource = (*snapshotFS)(nil)
)

type snapshotFS struct {
	toPath    func(fileName string) tspath.Path
	fs        vfs.FS
	overlays  map[tspath.Path]*overlay
	diskFiles map[tspath.Path]*diskFile
	readFiles collections.SyncMap[tspath.Path, memoizedDiskFile]
}

type memoizedDiskFile func() FileHandle

func (s *snapshotFS) FS() vfs.FS {
	return s.fs
}

func (s *snapshotFS) GetFile(fileName string) FileHandle {
	if file, ok := s.overlays[s.toPath(fileName)]; ok {
		return file
	}
	if file, ok := s.diskFiles[s.toPath(fileName)]; ok {
		return file
	}
	newEntry := memoizedDiskFile(sync.OnceValue(func() FileHandle {
		if contents, ok := s.fs.ReadFile(fileName); ok {
			return newDiskFile(fileName, contents)
		}
		return nil
	}))
	entry, _ := s.readFiles.LoadOrStore(s.toPath(fileName), newEntry)
	return entry()
}

type snapshotFSBuilder struct {
	fs        vfs.FS
	overlays  map[tspath.Path]*overlay
	diskFiles *dirty.SyncMap[tspath.Path, *diskFile]
	toPath    func(string) tspath.Path
}

func newSnapshotFSBuilder(
	fs vfs.FS,
	overlays map[tspath.Path]*overlay,
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

func (s *snapshotFSBuilder) Finalize() (*snapshotFS, bool) {
	diskFiles, changed := s.diskFiles.Finalize()
	return &snapshotFS{
		fs:        s.fs,
		overlays:  s.overlays,
		diskFiles: diskFiles,
		toPath:    s.toPath,
	}, changed
}

func (s *snapshotFSBuilder) GetFile(fileName string) FileHandle {
	path := s.toPath(fileName)
	return s.GetFileByPath(fileName, path)
}

func (s *snapshotFSBuilder) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	if file, ok := s.overlays[path]; ok {
		return file
	}
	entry, _ := s.diskFiles.LoadOrStore(path, &diskFile{fileBase: fileBase{fileName: fileName}, needsReload: true})
	if entry != nil {
		entry.Locked(func(entry dirty.Value[*diskFile]) {
			if entry.Value() != nil && !entry.Value().MatchesDiskText() {
				if content, ok := s.fs.ReadFile(fileName); ok {
					entry.Change(func(file *diskFile) {
						file.content = content
						file.hash = xxh3.Hash128([]byte(content))
						file.needsReload = false
					})
				} else {
					entry.Delete()
				}
			}
		})
	}
	if entry == nil || entry.Value() == nil {
		return nil
	}
	return entry.Value()
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
