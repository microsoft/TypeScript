package project

import (
	iofs "io/fs"
	"maps"
	"slices"
	"strings"
	"sync"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/sourcemap"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/zeebo/xxh3"
)

type FileContent interface {
	Content() string
	Hash() xxh3.Uint128
}

type FileHandle interface {
	FileContent
	FileName() string
	Version() int32
	MatchesDiskText() bool
	IsOverlay() bool
	LSPLineMap() *lsconv.LSPLineMap
	ECMALineInfo() *sourcemap.ECMALineInfo
	Kind() core.ScriptKind
}

type fileBase struct {
	fileName string
	content  string
	hash     xxh3.Uint128

	lineMapOnce  sync.Once
	lineMap      *lsconv.LSPLineMap
	lineInfoOnce sync.Once
	lineInfo     *sourcemap.ECMALineInfo
}

func (f *fileBase) FileName() string {
	return f.fileName
}

func (f *fileBase) Hash() xxh3.Uint128 {
	return f.hash
}

func (f *fileBase) Content() string {
	return f.content
}

func (f *fileBase) LSPLineMap() *lsconv.LSPLineMap {
	f.lineMapOnce.Do(func() {
		f.lineMap = lsconv.ComputeLSPLineStarts(f.content)
	})
	return f.lineMap
}

func (f *fileBase) ECMALineInfo() *sourcemap.ECMALineInfo {
	f.lineInfoOnce.Do(func() {
		lineStarts := core.ComputeECMALineStarts(f.content)
		f.lineInfo = sourcemap.CreateECMALineInfo(f.content, lineStarts)
	})
	return f.lineInfo
}

type cachedFile struct {
	fileBase
	needsReload  bool
	realpathPath tspath.Path
}

func newCachedFile(fileName string, content string) *cachedFile {
	return &cachedFile{
		fileName: fileName,
		content:  content,
		hash:     xxh3.HashString128(content),
	}
}

func NewCachedFileHandle(fileName string, content string) FileHandle {
	return newCachedFile(fileName, content)
}

var _ FileHandle = (*cachedFile)(nil)

func (f *cachedFile) Version() int32 {
	return 0
}

func (f *cachedFile) MatchesDiskText() bool {
	return !f.needsReload
}

func (f *cachedFile) IsOverlay() bool {
	return false
}

func (f *cachedFile) Kind() core.ScriptKind {
	return core.GetScriptKindFromFileName(f.fileName)
}

func (f *cachedFile) Clone() *cachedFile {
	return &cachedFile{
		realpathPath: f.realpathPath,
		fileName:     f.fileName,
		content:      f.content,
		hash:         f.hash,
	}
}

var _ FileHandle = (*Overlay)(nil)

type Overlay struct {
	fileBase
	version         int32
	kind            core.ScriptKind
	matchesDiskText bool
}

func newOverlay(fileName string, content string, version int32, kind core.ScriptKind) *Overlay {
	return &Overlay{
		fileName: fileName,
		content:  content,
		hash:     xxh3.HashString128(content),
		version:  version,
		kind:     kind,
	}
}

func (o *Overlay) Version() int32 {
	return o.version
}

func (o *Overlay) Text() string {
	return o.content
}

func (o *Overlay) OriginalFileName() string { return o.FileName() }

// SpanMap and OriginalText satisfy lsconv.Script. An overlay holds the editor's raw text (for a
// content-mapped file, that is the original foreign text, not the transformed output), so it never
// carries a span map and its original text is its own text.
func (o *Overlay) SpanMap() *spanmap.SpanMap { return nil }

func (o *Overlay) OriginalText() string { return o.content }

// MatchesDiskText may return false negatives, but never false positives.
func (o *Overlay) MatchesDiskText() bool {
	return o.matchesDiskText
}

// !!! optimization: incorporate mtime
func (o *Overlay) computeMatchesDiskText(fs vfs.FS) (matchesDiskText bool, exists bool) {
	if tspath.IsDynamicFileName(o.fileName) {
		return false, false
	}
	diskContent, ok := fs.ReadFile(o.fileName)
	if !ok {
		return false, false
	}
	return xxh3.HashString128(diskContent) == o.hash, true
}

func (o *Overlay) IsOverlay() bool {
	return true
}

func (o *Overlay) Kind() core.ScriptKind {
	return o.kind
}

type overlayFS struct {
	toPath           func(string) tspath.Path
	host             vfs.FS
	positionEncoding lsproto.PositionEncodingKind

	mu                 sync.RWMutex
	overlays           map[tspath.Path]*Overlay
	overlayDirectories map[tspath.Path]map[tspath.Path]string
}

type LayeredFileSystem interface {
	vfs.FS
	FileHandleSource
	Overlays() map[tspath.Path]*Overlay
}

type RebasableFileSystem interface {
	vfs.FS
	BaseFileSystem() vfs.FS
	WithBaseFileSystem(base vfs.FS) LayeredFileSystem
}

func newOverlayFS(fs vfs.FS, overlays map[tspath.Path]*Overlay, positionEncoding lsproto.PositionEncodingKind, toPath func(string) tspath.Path) *overlayFS {
	return &overlayFS{
		host:               fs,
		positionEncoding:   positionEncoding,
		overlays:           overlays,
		overlayDirectories: createOverlayDirectories(overlays),
		toPath:             toPath,
	}
}

var (
	_ vfs.FS            = (*overlayFS)(nil)
	_ FileHandleSource  = (*overlayFS)(nil)
	_ LayeredFileSystem = (*overlayFS)(nil)
)

func (fs *overlayFS) Overlays() map[tspath.Path]*Overlay {
	fs.mu.RLock()
	defer fs.mu.RUnlock()
	return fs.overlays
}

func layerOverlayFileSystem(fileSystem vfs.FS, overlays map[tspath.Path]*Overlay, positionEncoding lsproto.PositionEncodingKind, toPath func(string) tspath.Path) LayeredFileSystem {
	base := fileSystem
	var layer RebasableFileSystem
	if candidate, ok := fileSystem.(RebasableFileSystem); ok {
		layer = candidate
		base = candidate.BaseFileSystem()
	}
	if previous, ok := base.(*overlayFS); ok {
		base = previous.host
	}
	overlay := newOverlayFS(base, overlays, positionEncoding, toPath)
	if layer == nil {
		return overlay
	}
	return layer.WithBaseFileSystem(overlay)
}

func (fs *overlayFS) GetFile(fileName string) FileHandle {
	return fs.GetFileByPath(fileName, fs.toPath(fileName))
}

func (fs *overlayFS) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	fs.mu.RLock()
	overlay := fs.overlays[path]
	_, directory := fs.overlayDirectories[path]
	fs.mu.RUnlock()
	if overlay != nil {
		return overlay
	}
	if directory {
		return nil
	}

	if source, ok := fs.host.(FileHandleSource); ok {
		return source.GetFileByPath(fileName, path)
	}
	content, ok := fs.host.ReadFile(fileName)
	if !ok {
		return nil
	}
	return newCachedFile(fileName, content)
}

func (fs *overlayFS) UseCaseSensitiveFileNames() bool { return fs.host.UseCaseSensitiveFileNames() }

func (fs *overlayFS) FileExists(fileName string) bool {
	fs.mu.RLock()
	path := fs.toPath(fileName)
	_, file := fs.overlays[path]
	_, directory := fs.overlayDirectories[path]
	fs.mu.RUnlock()
	return file || !directory && fs.host.FileExists(fileName)
}

func (fs *overlayFS) ReadFile(fileName string) (string, bool) {
	if file := fs.GetFile(fileName); file != nil {
		return file.Content(), true
	}
	return "", false
}

func (fs *overlayFS) WriteFile(path string, data string) error { return fs.host.WriteFile(path, data) }

func (fs *overlayFS) AppendFile(path string, data string) error {
	return fs.host.AppendFile(path, data)
}
func (fs *overlayFS) Remove(path string) error { return fs.host.Remove(path) }
func (fs *overlayFS) Chtimes(path string, atime time.Time, mtime time.Time) error {
	return fs.host.Chtimes(path, atime, mtime)
}

func (fs *overlayFS) DirectoryExists(directoryName string) bool {
	fs.mu.RLock()
	path := fs.toPath(directoryName)
	_, file := fs.overlays[path]
	_, directory := fs.overlayDirectories[path]
	fs.mu.RUnlock()
	return directory || !file && fs.host.DirectoryExists(directoryName)
}

func (fs *overlayFS) GetAccessibleEntries(directoryName string) vfs.Entries {
	fs.mu.RLock()
	path := fs.toPath(directoryName)
	_, file := fs.overlays[path]
	directory := fs.overlayDirectories[path]
	if directory != nil {
		directory = maps.Clone(directory)
	}
	overlays := fs.overlays
	fs.mu.RUnlock()
	if file {
		return vfs.Entries{}
	}
	hostEntries := fs.host.GetAccessibleEntries(directoryName)
	entries := vfs.Entries{
		Files:       slices.Clone(hostEntries.Files),
		Directories: slices.Clone(hostEntries.Directories),
		Symlinks:    maps.Clone(hostEntries.Symlinks),
	}
	equalName := func(left string, right string) bool {
		return tspath.GetCanonicalFileName(left, fs.UseCaseSensitiveFileNames()) == tspath.GetCanonicalFileName(right, fs.UseCaseSensitiveFileNames())
	}
	for childPath, childName := range directory {
		entries.Files = slices.DeleteFunc(entries.Files, func(name string) bool { return equalName(name, childName) })
		entries.Directories = slices.DeleteFunc(entries.Directories, func(name string) bool { return equalName(name, childName) })
		for name := range entries.Symlinks {
			if equalName(name, childName) {
				delete(entries.Symlinks, name)
			}
		}
		if _, ok := overlays[childPath]; ok {
			entries.Files = append(entries.Files, childName)
		} else {
			entries.Directories = append(entries.Directories, childName)
		}
	}
	return entries
}

func (fs *overlayFS) Stat(path string) vfs.FileInfo {
	fs.mu.RLock()
	canonicalPath := fs.toPath(path)
	overlay := fs.overlays[canonicalPath]
	_, directory := fs.overlayDirectories[canonicalPath]
	fs.mu.RUnlock()
	if overlay != nil {
		return overlayFileInfo{overlay: overlay}
	}
	if directory {
		return overlayDirectoryInfo{name: tspath.GetBaseFileName(path)}
	}
	return fs.host.Stat(path)
}

func (fs *overlayFS) Realpath(path string) string { return fs.host.Realpath(path) }

type overlayFileInfo struct {
	overlay *Overlay
}

func (info overlayFileInfo) Name() string        { return tspath.GetBaseFileName(info.overlay.FileName()) }
func (info overlayFileInfo) Size() int64         { return int64(len(info.overlay.Content())) }
func (info overlayFileInfo) Mode() iofs.FileMode { return 0o444 }
func (info overlayFileInfo) ModTime() time.Time  { return time.Time{} }
func (info overlayFileInfo) IsDir() bool         { return false }
func (info overlayFileInfo) Sys() any            { return nil }

type overlayDirectoryInfo struct {
	name string
}

func (info overlayDirectoryInfo) Name() string        { return info.name }
func (info overlayDirectoryInfo) Size() int64         { return 0 }
func (info overlayDirectoryInfo) Mode() iofs.FileMode { return iofs.ModeDir | 0o555 }
func (info overlayDirectoryInfo) ModTime() time.Time  { return time.Time{} }
func (info overlayDirectoryInfo) IsDir() bool         { return true }
func (info overlayDirectoryInfo) Sys() any            { return nil }

func createOverlayDirectories(overlays map[tspath.Path]*Overlay) map[tspath.Path]map[tspath.Path]string {
	overlayDirectories := make(map[tspath.Path]map[tspath.Path]string)
	for path, overlay := range overlays {
		childPath := path
		child := overlay.FileName()
		for {
			parentPath := childPath.GetDirectoryPath()
			parent := tspath.GetDirectoryPath(child)
			if childPath == parentPath {
				break
			}
			if directory := overlayDirectories[parentPath]; directory != nil {
				directory[childPath] = tspath.GetBaseFileName(child)
			} else {
				overlayDirectories[parentPath] = map[tspath.Path]string{childPath: tspath.GetBaseFileName(child)}
			}
			childPath = parentPath
			child = parent
		}
	}
	return overlayDirectories
}

func (fs *overlayFS) processChanges(changes []FileChange) (FileChangeSummary, map[tspath.Path]*Overlay) {
	fs.mu.Lock()
	defer fs.mu.Unlock()

	var result FileChangeSummary
	newOverlays := maps.Clone(fs.overlays)

	// Reduced collection of changes that occurred on a single file
	type fileEvents struct {
		openChange   *FileChange
		closeChange  *FileChange
		watchChanged bool
		changes      []*FileChange
		saved        bool
		created      bool
		deleted      bool
	}

	fileEventMap := make(map[lsproto.DocumentUri]*fileEvents)

	for _, change := range changes {
		uri := change.URI
		events, exists := fileEventMap[uri]
		if exists {
			if events.openChange != nil {
				panic("should see no changes after open")
			}
		} else {
			events = &fileEvents{}
			fileEventMap[uri] = events
		}

		if !result.IncludesWatchChangeOutsideNodeModules && change.Kind.IsWatchKind() && !strings.Contains(string(uri), "/node_modules/") {
			result.IncludesWatchChangeOutsideNodeModules = true
		}

		switch change.Kind {
		case FileChangeKindOpen:
			if events.closeChange != nil {
				events.closeChange = nil
			}
			events.openChange = &change
			events.watchChanged = false
			events.changes = nil
			events.saved = false
			events.created = false
			events.deleted = false
		case FileChangeKindClose:
			events.closeChange = &change
			events.changes = nil
			events.saved = false
			events.watchChanged = false
		case FileChangeKindChange:
			if events.closeChange != nil {
				panic("should see no changes after close")
			}
			events.changes = append(events.changes, &change)
			events.saved = false
			events.watchChanged = false
		case FileChangeKindSave:
			events.saved = true
		case FileChangeKindWatchCreate:
			if events.deleted {
				// Delete followed by create becomes a change
				events.deleted = false
				events.watchChanged = true
			} else {
				events.created = true
			}
		case FileChangeKindWatchChange:
			if !events.created {
				events.watchChanged = true
				events.saved = false
			}
		case FileChangeKindWatchDelete:
			events.watchChanged = false
			events.saved = false
			// Delete after create cancels out
			if events.created {
				events.created = false
			} else {
				events.deleted = true
			}
		}
	}

	// Process deduplicated events per file
	for uri, events := range fileEventMap {
		path := uri.Path(fs.host.UseCaseSensitiveFileNames())
		o := newOverlays[path]

		if events.openChange != nil {
			if result.Opened != "" || result.Reopened != "" {
				panic("can only process one file open event at a time")
			}
			if o != nil && o.Content() != events.openChange.Content {
				result.Changed.Add(uri)
			} else if o == nil {
				result.Opened = uri
			} else {
				result.Reopened = uri
			}
			scriptKind := lsconv.LanguageKindToScriptKind(events.openChange.LanguageKind)
			if scriptKind == core.ScriptKindUnknown {
				scriptKind = core.GetScriptKindFromFileName(uri.FileName())
			}
			newOverlays[path] = newOverlay(
				uri.FileName(),
				events.openChange.Content,
				events.openChange.Version,
				scriptKind,
			)
			continue
		}

		if events.closeChange != nil && o != nil {
			result.Closed.Add(uri)
			delete(newOverlays, path)
			o = nil
		}

		if events.watchChanged {
			if o == nil {
				result.Changed.Add(uri)
			} else if o != nil && !events.saved {
				if matchesDiskText, _ := o.computeMatchesDiskText(fs.host); matchesDiskText != o.MatchesDiskText() {
					o = newOverlay(o.FileName(), o.Content(), o.Version(), o.kind)
					o.matchesDiskText = matchesDiskText
					newOverlays[path] = o
				}
			}
		}

		if len(events.changes) > 0 && o != nil {
			result.Changed.Add(uri)
			for _, change := range events.changes {
				converters := lsconv.NewConverters(fs.positionEncoding, func(fileName string) *lsconv.LSPLineMap {
					return o.LSPLineMap()
				})
				for _, textChange := range change.Changes {
					if partialChange := textChange.Partial; partialChange != nil {
						ranges := converters.FromLSPRange(o, partialChange.Range, spanmap.FeatureAll)
						debug.Assert(len(ranges) == 1, "expected exactly one range for partial change")
						textChange := core.TextChange{TextRange: ranges[0].Span, NewText: partialChange.Text}
						newContent := textChange.ApplyTo(o.content)
						o = newOverlay(o.fileName, newContent, change.Version, o.kind)
					} else if wholeChange := textChange.WholeDocument; wholeChange != nil {
						o = newOverlay(o.fileName, wholeChange.Text, change.Version, o.kind)
					}
				}
				if len(change.Changes) > 0 {
					o.version = change.Version
					o.hash = xxh3.HashString128(o.content)
					o.matchesDiskText = false
					newOverlays[path] = o
				}
			}
		}

		if events.saved {
			if o != nil {
				o = newOverlay(o.FileName(), o.Content(), o.Version(), o.kind)
				o.matchesDiskText = true
				newOverlays[path] = o
			} else if !events.watchChanged {
				// File was saved but never opened via didOpen; treat as a disk change.
				result.Changed.Add(uri)
			}
		}

		if events.created && o == nil {
			result.Created.Add(uri)
		}

		if events.deleted && o == nil {
			result.Deleted.Add(uri)
		}
	}

	fs.overlays = newOverlays
	fs.overlayDirectories = createOverlayDirectories(newOverlays)
	return result, newOverlays
}
