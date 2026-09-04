package project

import (
	"context"
	"slices"
	"sync/atomic"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
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

// NewStandaloneRootSnapshot creates the compatibility root for a standalone API session.
func (s *SnapshotHost) NewStandaloneRootSnapshot() *Snapshot {
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
	return baseSnapshot.Clone(ctx, change, baseSnapshot.fs.overlays, nil)
}

// CloneSnapshotWithTemporaryFile derives a snapshot with a temporary file content override.
func (s *SnapshotHost) CloneSnapshotWithTemporaryFile(
	ctx context.Context,
	baseSnapshot *Snapshot,
	fileSystem vfs.FS,
	uri lsproto.DocumentUri,
	newText string,
) (*Snapshot, error) {
	return baseSnapshot.cloneWithTemporaryFile(ctx, fileSystem, uri, newText)
}

// CloneSnapshotForProgram derives an isolated snapshot containing one synthetic
// project. The base snapshot is not adopted as canonical state.
func (s *SnapshotHost) CloneSnapshotForProgram(
	ctx context.Context,
	baseSnapshot *Snapshot,
	fileSystem vfs.FS,
	rootFileNames []string,
	options *core.CompilerOptions,
	projectReferences []*core.ProjectReference,
	configFileParsingDiagnostics []*ast.Diagnostic,
	oldProject *Project,
	fileChanges FileChangeSummary,
) *Snapshot {
	return baseSnapshot.cloneForProgram(
		ctx,
		fileSystem,
		rootFileNames,
		options,
		projectReferences,
		configFileParsingDiagnostics,
		oldProject,
		fileChanges,
		nil,
	)
}

// CloneSnapshotWithAutoImports derives a snapshot with auto-import preparation without
// adopting the clone in the background.
func (s *SnapshotHost) CloneSnapshotWithAutoImports(ctx context.Context, baseSnapshot *Snapshot, uri lsproto.DocumentUri, logger logging.Logger) *Snapshot {
	change := SnapshotChange{
		reason: UpdateReasonRequestedLanguageServiceWithAutoImports,
		ResourceRequest: ResourceRequest{
			Documents:   []lsproto.DocumentUri{uri},
			AutoImports: uri,
		},
	}
	return baseSnapshot.Clone(ctx, change, baseSnapshot.fs.overlays, logger)
}

func (s *SnapshotHost) newRootSnapshot(id uint64, relativePatternSupport bool) *Snapshot {
	return s.newSnapshot(
		id,
		&SnapshotFS{
			toPath:   s.toPath,
			fs:       s.fs,
			overlays: make(map[tspath.Path]*Overlay),
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
