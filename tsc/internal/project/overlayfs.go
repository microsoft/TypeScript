package project

import (
	"maps"
	"sync"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
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
	LSPLineMap() *ls.LSPLineMap
	ECMALineInfo() *sourcemap.ECMALineInfo
	Kind() core.ScriptKind
}

type fileBase struct {
	fileName string
	content  string
	hash     xxh3.Uint128

	lineMapOnce  sync.Once
	lineMap      *ls.LSPLineMap
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

func (f *fileBase) LSPLineMap() *ls.LSPLineMap {
	f.lineMapOnce.Do(func() {
		f.lineMap = ls.ComputeLSPLineStarts(f.content)
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

type diskFile struct {
	fileBase
	needsReload bool
}

func newDiskFile(fileName string, content string) *diskFile {
	return &diskFile{
		fileBase: fileBase{
			fileName: fileName,
			content:  content,
			hash:     xxh3.Hash128([]byte(content)),
		},
	}
}

var _ FileHandle = (*diskFile)(nil)

func (f *diskFile) Version() int32 {
	return 0
}

func (f *diskFile) MatchesDiskText() bool {
	return !f.needsReload
}

func (f *diskFile) IsOverlay() bool {
	return false
}

func (f *diskFile) Kind() core.ScriptKind {
	return core.GetScriptKindFromFileName(f.fileName)
}

func (f *diskFile) Clone() *diskFile {
	return &diskFile{
		fileBase: fileBase{
			fileName: f.fileName,
			content:  f.content,
			hash:     f.hash,
		},
	}
}

var _ FileHandle = (*overlay)(nil)

type overlay struct {
	fileBase
	version         int32
	kind            core.ScriptKind
	matchesDiskText bool
}

func newOverlay(fileName string, content string, version int32, kind core.ScriptKind) *overlay {
	return &overlay{
		fileBase: fileBase{
			fileName: fileName,
			content:  content,
			hash:     xxh3.Hash128([]byte(content)),
		},
		version: version,
		kind:    kind,
	}
}

func (o *overlay) Version() int32 {
	return o.version
}

func (o *overlay) Text() string {
	return o.content
}

// MatchesDiskText may return false negatives, but never false positives.
func (o *overlay) MatchesDiskText() bool {
	return o.matchesDiskText
}

// !!! optimization: incorporate mtime
func (o *overlay) computeMatchesDiskText(fs vfs.FS) bool {
	if isDynamicFileName(o.fileName) {
		return false
	}
	diskContent, ok := fs.ReadFile(o.fileName)
	if !ok {
		return false
	}
	return xxh3.Hash128([]byte(diskContent)) == o.hash
}

func (o *overlay) IsOverlay() bool {
	return true
}

func (o *overlay) Kind() core.ScriptKind {
	return o.kind
}

type overlayFS struct {
	toPath           func(string) tspath.Path
	fs               vfs.FS
	positionEncoding lsproto.PositionEncodingKind

	mu       sync.RWMutex
	overlays map[tspath.Path]*overlay
}

func newOverlayFS(fs vfs.FS, overlays map[tspath.Path]*overlay, positionEncoding lsproto.PositionEncodingKind, toPath func(string) tspath.Path) *overlayFS {
	return &overlayFS{
		fs:               fs,
		positionEncoding: positionEncoding,
		overlays:         overlays,
		toPath:           toPath,
	}
}

func (fs *overlayFS) Overlays() map[tspath.Path]*overlay {
	fs.mu.RLock()
	defer fs.mu.RUnlock()
	return fs.overlays
}

func (fs *overlayFS) getFile(fileName string) FileHandle {
	fs.mu.RLock()
	overlays := fs.overlays
	fs.mu.RUnlock()

	path := fs.toPath(fileName)
	if overlay, ok := overlays[path]; ok {
		return overlay
	}

	content, ok := fs.fs.ReadFile(fileName)
	if !ok {
		return nil
	}
	return newDiskFile(fileName, content)
}

func (fs *overlayFS) processChanges(changes []FileChange) (FileChangeSummary, map[tspath.Path]*overlay) {
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

		switch change.Kind {
		case FileChangeKindOpen:
			events.openChange = &change
			events.closeChange = nil
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
		path := uri.Path(fs.fs.UseCaseSensitiveFileNames())
		o := newOverlays[path]

		if events.openChange != nil {
			if result.Opened != "" {
				panic("can only process one file open event at a time")
			}
			result.Opened = uri
			newOverlays[path] = newOverlay(
				uri.FileName(),
				events.openChange.Content,
				events.openChange.Version,
				ls.LanguageKindToScriptKind(events.openChange.LanguageKind),
			)
			continue
		}

		if events.closeChange != nil {
			if result.Closed == nil {
				result.Closed = make(map[lsproto.DocumentUri]xxh3.Uint128)
			}
			result.Closed[uri] = events.closeChange.Hash
			delete(newOverlays, path)
		}

		if events.watchChanged {
			if o == nil {
				result.Changed.Add(uri)
			} else if o != nil && !events.saved {
				if matchesDiskText := o.computeMatchesDiskText(fs.fs); matchesDiskText != o.MatchesDiskText() {
					o = newOverlay(o.FileName(), o.Content(), o.Version(), o.kind)
					o.matchesDiskText = matchesDiskText
					newOverlays[path] = o
				}
			}
		}

		if len(events.changes) > 0 {
			result.Changed.Add(uri)
			if o == nil {
				panic("overlay not found for changed file: " + uri)
			}
			for _, change := range events.changes {
				converters := ls.NewConverters(fs.positionEncoding, func(fileName string) *ls.LSPLineMap {
					return o.LSPLineMap()
				})
				for _, textChange := range change.Changes {
					if partialChange := textChange.Partial; partialChange != nil {
						newContent := converters.FromLSPTextChange(o, partialChange).ApplyTo(o.content)
						o = newOverlay(o.fileName, newContent, change.Version, o.kind)
					} else if wholeChange := textChange.WholeDocument; wholeChange != nil {
						o = newOverlay(o.fileName, wholeChange.Text, change.Version, o.kind)
					}
				}
				if len(change.Changes) > 0 {
					o.version = change.Version
					o.hash = xxh3.Hash128([]byte(o.content))
					o.matchesDiskText = false
					newOverlays[path] = o
				}
			}
		}

		if events.saved {
			if o == nil {
				panic("overlay not found for saved file: " + uri)
			}
			o = newOverlay(o.FileName(), o.Content(), o.Version(), o.kind)
			o.matchesDiskText = true
			newOverlays[path] = o
		}

		if events.created && o == nil {
			result.Created.Add(uri)
		}

		if events.deleted && o == nil {
			result.Deleted.Add(uri)
		}
	}

	fs.overlays = newOverlays
	return result, newOverlays
}
