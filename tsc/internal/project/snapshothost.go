package project

import (
	"context"
	"slices"
	"sync/atomic"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project/logging"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// SnapshotHost owns the services shared by a collection of immutable snapshots.
type SnapshotHost struct {
	options *SessionOptions
	toPath  func(string) tspath.Path
	fs      vfs.FS

	parseCache              *ParseCache
	contentMappedParseCache *ContentMappedParseCache
	extendedConfigCache     *ExtendedConfigCache
	programCounter          *programCounter
	contentMapperHost       contentmapper.Host

	snapshotID atomic.Uint64
}

func (s *SnapshotHost) nextSnapshotID() uint64 {
	return s.snapshotID.Add(1)
}

func NewSnapshotHost(init *SessionInit) *SnapshotHost {
	currentDirectory := init.Options.CurrentDirectory
	useCaseSensitiveFileNames := init.FS.UseCaseSensitiveFileNames()
	toPath := func(fileName string) tspath.Path {
		return tspath.ToPath(fileName, currentDirectory, useCaseSensitiveFileNames)
	}
	parseCache := init.ParseCache
	if parseCache == nil {
		parseCache = NewParseCache(RefCountCacheOptions{})
	}
	contentMappedParseCache := init.ContentMappedParseCache
	if contentMappedParseCache == nil {
		contentMappedParseCache = NewContentMappedParseCache(RefCountCacheOptions{})
	}

	return &SnapshotHost{
		options:                 init.Options,
		toPath:                  toPath,
		fs:                      init.FS,
		parseCache:              parseCache,
		contentMappedParseCache: contentMappedParseCache,
		extendedConfigCache:     NewExtendedConfigCache(),
		programCounter:          &programCounter{},
		contentMapperHost:       newContentMapperHost(init),
	}
}

// NewRootSnapshot creates an independent root snapshot.
func (s *SnapshotHost) NewRootSnapshot() *Snapshot {
	return s.newRootSnapshot(0, false)
}

// RetainSnapshot adds a reference to a snapshot owned by this host.
func (s *SnapshotHost) RetainSnapshot(snapshot *Snapshot) {
	snapshot.ref()
}

// CloneSnapshot derives a snapshot from baseSnapshot without adopting it as any
// canonical session state or performing session side effects.
func (s *SnapshotHost) CloneSnapshot(
	ctx context.Context,
	baseSnapshot *Snapshot,
	fileChanges FileChangeSummary,
	apiRequest *APISnapshotRequest,
) (*Snapshot, error) {
	change := SnapshotChange{
		apiRequest:  apiRequest,
		fileChanges: fileChanges,
	}
	if apiRequest != nil {
		change.fs = apiRequest.FileSystem
		change.fileSystemOverride = apiRequest.FileSystem != nil
		change.replaceFileSystem = apiRequest.ReplaceFileSystem
	}
	snapshot := s.update(ctx, baseSnapshot, change)
	return snapshot, snapshot.apiError
}

// update derives a snapshot from baseSnapshot without adopting it as any
// canonical session state or performing session side effects.
func (s *SnapshotHost) update(ctx context.Context, baseSnapshot *Snapshot, change SnapshotChange) *Snapshot {
	return baseSnapshot.Clone(ctx, change, baseSnapshot.overlays(), nil, nil)
}

// CloneSnapshotWithAutoImports derives a snapshot with auto-import preparation without
// adopting the clone in the background.
func (s *SnapshotHost) CloneSnapshotWithAutoImports(ctx context.Context, baseSnapshot *Snapshot, uri lsproto.DocumentUri, logger logging.Logger) *Snapshot {
	change := SnapshotChange{
		reason:             UpdateReasonRequestedLanguageServiceWithAutoImports,
		fs:                 baseSnapshot.fs.fs,
		fileSystemOverride: baseSnapshot.fileSystemOverride,
		ResourceRequest:    baseSnapshot.resourceRequestForDocument(uri),
	}
	change.AutoImports = uri
	return baseSnapshot.Clone(ctx, change, baseSnapshot.overlays(), logger, nil)
}

func (s *SnapshotHost) newRootSnapshot(id uint64, relativePatternSupport bool) *Snapshot {
	fileSystem := newOverlayFS(s.fs, nil, s.options.PositionEncoding, s.toPath)
	return s.newSnapshot(
		id,
		&SnapshotFS{
			toPath: s.toPath,
			fs:     fileSystem,
		},
		&ConfigFileRegistry{},
		nil,
		lsutil.NewDefaultUserPreferences(),
		nil,
		NewWatchedFiles(
			"auto-import",
			lsproto.WatchKindCreate|lsproto.WatchKindChange|lsproto.WatchKindDelete,
			relativePatternSupport,
			func(nodeModulesDirs map[tspath.Path]string) PatternsAndIgnored {
				patterns := make([]string, 0, len(nodeModulesDirs))
				for _, dir := range nodeModulesDirs {
					patterns = append(patterns, getRecursiveGlobPattern(dir))
				}
				slices.Sort(patterns)
				return PatternsAndIgnored{
					patternsInsideWorkspace: patterns,
				}
			},
		),
	)
}

func (s *SnapshotHost) FS() vfs.FS {
	return s.fs
}

func (s *SnapshotHost) GetCurrentDirectory() string {
	return s.options.CurrentDirectory
}

func (s *SnapshotHost) Close() {
	if s.contentMapperHost != nil {
		_ = s.contentMapperHost.Close()
	}
}
