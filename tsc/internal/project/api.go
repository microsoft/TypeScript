package project

import (
	"context"
	"fmt"
	"maps"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// APIUpdate creates a new snapshot incorporating the given file changes and the
// supplied API open/close request. The apiRequest may open or close projects and
// files; opens are tracked in the snapshot (ref-counted) so they persist across
// future updates, and closes release a previously taken ref. Even an empty
// apiRequest ensures all API-opened projects and files are kept up to date.
// Returns a ref'd snapshot (which the caller must Deref when done) and any error
// encountered while applying the request, e.g. failing to load a project to open.
func (s *Session) APIUpdate(ctx context.Context, apiFileChanges FileChangeSummary, apiRequest *APISnapshotRequest) (*Snapshot, error) {
	s.snapshotUpdateMu.Lock()
	defer s.snapshotUpdateMu.Unlock()
	s.cancelScheduledSnapshotUpdate()

	fileChanges, overlays, ataChanges, _ := s.flushChanges(ctx)
	mergeFileChangeSummary(&fileChanges, apiFileChanges)
	var fs vfs.FS
	var replaceFileSystem bool
	if apiRequest != nil {
		fs = apiRequest.FileSystem
		replaceFileSystem = apiRequest.ReplaceFileSystem
	}

	newSnapshot := s.updateSnapshotRef(ctx, overlays, SnapshotChange{
		apiRequest:         apiRequest,
		fs:                 fs,
		fileSystemOverride: fs != nil,
		replaceFileSystem:  replaceFileSystem,
		fileChanges:        fileChanges,
		ataChanges:         ataChanges,
	})
	return newSnapshot, newSnapshot.apiError
}

// APIUpdateTemporary creates a snapshot that layers a temporary in-memory content
// override for a file on top of baseSnapshot.
// The caller must retain baseSnapshot for the duration of this call.
// An error is returned if the file name does not have a recognized script extension.
// On success, the returned snapshot carries a single reference (the clone ref);
// the caller must call snapshot.Deref(s) when done.
func (s *Session) APIUpdateTemporary(ctx context.Context, baseSnapshot *Snapshot, uri lsproto.DocumentUri, newText string) (*Snapshot, error) {
	path := uri.Path(baseSnapshot.UseCaseSensitiveFileNames())

	overlays := maps.Clone(baseSnapshot.fs.overlays)
	version := int32(0)
	var fileChanges FileChangeSummary
	existing := overlays[path]
	var scriptKind core.ScriptKind
	if existing != nil {
		version = existing.Version() + 1
		scriptKind = existing.Kind()
		fileChanges.Changed.Add(uri)
	} else {
		scriptKind = core.GetScriptKindFromFileName(uri.FileName())
		if scriptKind == core.ScriptKindUnknown {
			return nil, fmt.Errorf("unsupported file extension: %s", uri.FileName())
		}
		fileChanges.Opened = uri
	}
	overlays[path] = newOverlay(uri.FileName(), newText, version, scriptKind)

	newSnapshot := baseSnapshot.Clone(ctx, SnapshotChange{
		fs:                 baseSnapshot.fs.fs,
		fileSystemOverride: baseSnapshot.fileSystemOverride,
		fileChanges:        fileChanges,
		ResourceRequest: ResourceRequest{
			Documents: []lsproto.DocumentUri{uri},
		},
	}, overlays, s)
	return newSnapshot, nil
}

// APICreateProgram creates an isolated snapshot containing one synthetic project.
// Without an old snapshot it starts from the underlying filesystem; otherwise it
// derives from oldSnapshot and applies fileChanges.
func (s *Session) APICreateProgram(
	ctx context.Context,
	rootFileNames []string,
	options *core.CompilerOptions,
	projectReferences []*core.ProjectReference,
	configFileParsingDiagnostics []*ast.Diagnostic,
	oldSnapshot *Snapshot,
	oldProject *Project,
	fileChanges FileChangeSummary,
) *Snapshot {
	if oldSnapshot != nil {
		return oldSnapshot.cloneForProgram(
			ctx,
			rootFileNames,
			options,
			projectReferences,
			configFileParsingDiagnostics,
			oldProject,
			fileChanges,
			s,
		)
	}

	snapshot, _ := s.APIUpdate(ctx, fileChanges, nil)
	defer snapshot.Deref(s)
	return snapshot.cloneForProgram(
		ctx,
		rootFileNames,
		options,
		projectReferences,
		configFileParsingDiagnostics,
		nil,
		fileChanges,
		s,
	)
}
