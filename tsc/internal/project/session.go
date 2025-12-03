package project

import (
	"context"
	"fmt"
	"slices"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/ata"
	"github.com/microsoft/typescript-go/internal/project/background"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type UpdateReason int

const (
	UpdateReasonUnknown UpdateReason = iota
	UpdateReasonDidOpenFile
	UpdateReasonDidChangeCompilerOptionsForInferredProjects
	UpdateReasonRequestedLanguageServicePendingChanges
	UpdateReasonRequestedLanguageServiceProjectNotLoaded
	UpdateReasonRequestedLanguageServiceForFileNotOpen
	UpdateReasonRequestedLanguageServiceProjectDirty
	UpdateReasonRequestedLoadProjectTree
)

// SessionOptions are the immutable initialization options for a session.
// Snapshots may reference them as a pointer since they never change.
type SessionOptions struct {
	CurrentDirectory       string
	DefaultLibraryPath     string
	TypingsLocation        string
	PositionEncoding       lsproto.PositionEncodingKind
	WatchEnabled           bool
	LoggingEnabled         bool
	PushDiagnosticsEnabled bool
	DebounceDelay          time.Duration
	Locale                 locale.Locale
}

type SessionInit struct {
	Options     *SessionOptions
	FS          vfs.FS
	Client      Client
	Logger      logging.Logger
	NpmExecutor ata.NpmExecutor
	ParseCache  *ParseCache
}

// Session manages the state of an LSP session. It receives textDocument
// events and requests for LanguageService objects from the LPS server
// and processes them into immutable snapshots as the data source for
// LanguageServices. When Session transitions from one snapshot to the
// next, it diffs them and updates file watchers and Automatic Type
// Acquisition (ATA) state accordingly.
type Session struct {
	options     *SessionOptions
	toPath      func(string) tspath.Path
	client      Client
	logger      logging.Logger
	npmExecutor ata.NpmExecutor
	fs          *overlayFS

	// parseCache is the ref-counted cache of source files used when
	// creating programs during snapshot cloning.
	parseCache *ParseCache
	// extendedConfigCache is the ref-counted cache of tsconfig ASTs
	// that are used in the "extends" of another tsconfig.
	extendedConfigCache *ExtendedConfigCache
	// programCounter counts how many snapshots reference a program.
	// When a program is no longer referenced, its source files are
	// released from the parseCache.
	programCounter *programCounter

	// read-only after initialization
	initialPreferences                 *lsutil.UserPreferences
	userPreferences                    *lsutil.UserPreferences // !!! update to Config
	compilerOptionsForInferredProjects *core.CompilerOptions
	typingsInstaller                   *ata.TypingsInstaller
	backgroundQueue                    *background.Queue

	// snapshotID is the counter for snapshot IDs. It does not necessarily
	// equal the `snapshot.ID`. It is stored on Session instead of globally
	// so IDs are predictable in tests.
	snapshotID atomic.Uint64

	// snapshot is the current immutable state of all projects.
	snapshot   *Snapshot
	snapshotMu sync.RWMutex

	pendingConfigChanges bool
	configRWMu           sync.Mutex

	// pendingFileChanges are accumulated from textDocument/* events delivered
	// by the LSP server through DidOpenFile(), DidChangeFile(), etc. They are
	// applied to the next snapshot update.
	pendingFileChanges   []FileChange
	pendingFileChangesMu sync.Mutex

	// pendingATAChanges are produced by Automatic Type Acquisition (ATA)
	// installations and applied to the next snapshot update.
	pendingATAChanges   map[tspath.Path]*ATAStateChange
	pendingATAChangesMu sync.Mutex

	// diagnosticsRefreshCancel is the cancelation function for a scheduled
	// diagnostics refresh. Diagnostics refreshes are scheduled and debounced
	// after file watch changes and ATA updates.
	diagnosticsRefreshCancel context.CancelFunc
	diagnosticsRefreshMu     sync.Mutex

	// watches tracks the current watch globs and how many individual WatchedFiles
	// are using each glob.
	watches   map[fileSystemWatcherKey]*fileSystemWatcherValue
	watchesMu sync.Mutex
}

func NewSession(init *SessionInit) *Session {
	currentDirectory := init.Options.CurrentDirectory
	useCaseSensitiveFileNames := init.FS.UseCaseSensitiveFileNames()
	toPath := func(fileName string) tspath.Path {
		return tspath.ToPath(fileName, currentDirectory, useCaseSensitiveFileNames)
	}
	overlayFS := newOverlayFS(init.FS, make(map[tspath.Path]*Overlay), init.Options.PositionEncoding, toPath)
	parseCache := init.ParseCache
	if parseCache == nil {
		parseCache = &ParseCache{}
	}
	extendedConfigCache := &ExtendedConfigCache{}

	session := &Session{
		options:             init.Options,
		toPath:              toPath,
		client:              init.Client,
		logger:              init.Logger,
		npmExecutor:         init.NpmExecutor,
		fs:                  overlayFS,
		parseCache:          parseCache,
		extendedConfigCache: extendedConfigCache,
		programCounter:      &programCounter{},
		backgroundQueue:     background.NewQueue(),
		snapshot: NewSnapshot(
			uint64(0),
			&SnapshotFS{
				toPath: toPath,
				fs:     init.FS,
			},
			init.Options,
			parseCache,
			extendedConfigCache,
			&ConfigFileRegistry{},
			nil,
			Config{},
			toPath,
		),
		pendingATAChanges: make(map[tspath.Path]*ATAStateChange),
		watches:           make(map[fileSystemWatcherKey]*fileSystemWatcherValue),
	}

	if init.Options.TypingsLocation != "" && init.NpmExecutor != nil {
		session.typingsInstaller = ata.NewTypingsInstaller(&ata.TypingsInstallerOptions{
			TypingsLocation: init.Options.TypingsLocation,
			ThrottleLimit:   5,
		}, session)
	}

	return session
}

// FS implements module.ResolutionHost
func (s *Session) FS() vfs.FS {
	return s.fs.fs
}

// GetCurrentDirectory implements module.ResolutionHost
func (s *Session) GetCurrentDirectory() string {
	return s.options.CurrentDirectory
}

// Gets current UserPreferences, always a copy
func (s *Session) UserPreferences() *lsutil.UserPreferences {
	s.configRWMu.Lock()
	defer s.configRWMu.Unlock()
	return s.userPreferences.Copy()
}

// Gets original UserPreferences of the session
func (s *Session) NewUserPreferences() *lsutil.UserPreferences {
	return s.initialPreferences.CopyOrDefault()
}

// Trace implements module.ResolutionHost
func (s *Session) Trace(msg string) {
	panic("ATA module resolution should not use tracing")
}

func (s *Session) Configure(userPreferences *lsutil.UserPreferences) {
	s.configRWMu.Lock()
	defer s.configRWMu.Unlock()
	s.pendingConfigChanges = true

	// Tell the client to re-request certain commands depending on user preference changes.
	oldUserPreferences := s.userPreferences
	s.userPreferences = userPreferences
	if oldUserPreferences != userPreferences && oldUserPreferences != nil && userPreferences != nil {
		s.refreshInlayHintsIfNeeded(oldUserPreferences, userPreferences)
		s.refreshCodeLensIfNeeded(oldUserPreferences, userPreferences)
	}
}

func (s *Session) InitializeWithConfig(userPreferences *lsutil.UserPreferences) {
	s.initialPreferences = userPreferences.CopyOrDefault()
	s.Configure(s.initialPreferences)
}

func (s *Session) DidOpenFile(ctx context.Context, uri lsproto.DocumentUri, version int32, content string, languageKind lsproto.LanguageKind) {
	s.cancelDiagnosticsRefresh()
	s.pendingFileChangesMu.Lock()
	s.pendingFileChanges = append(s.pendingFileChanges, FileChange{
		Kind:         FileChangeKindOpen,
		URI:          uri,
		Version:      version,
		Content:      content,
		LanguageKind: languageKind,
	})
	changes, overlays := s.flushChangesLocked(ctx)
	s.pendingFileChangesMu.Unlock()
	s.UpdateSnapshot(ctx, overlays, SnapshotChange{
		reason:      UpdateReasonDidOpenFile,
		fileChanges: changes,
		ResourceRequest: ResourceRequest{
			Documents: []lsproto.DocumentUri{uri},
		},
	})
}

func (s *Session) DidCloseFile(ctx context.Context, uri lsproto.DocumentUri) {
	s.cancelDiagnosticsRefresh()
	s.pendingFileChangesMu.Lock()
	defer s.pendingFileChangesMu.Unlock()
	s.pendingFileChanges = append(s.pendingFileChanges, FileChange{
		Kind: FileChangeKindClose,
		URI:  uri,
		Hash: s.fs.getFile(uri.FileName()).Hash(),
	})
}

func (s *Session) DidChangeFile(ctx context.Context, uri lsproto.DocumentUri, version int32, changes []lsproto.TextDocumentContentChangePartialOrWholeDocument) {
	s.cancelDiagnosticsRefresh()
	s.pendingFileChangesMu.Lock()
	defer s.pendingFileChangesMu.Unlock()
	s.pendingFileChanges = append(s.pendingFileChanges, FileChange{
		Kind:    FileChangeKindChange,
		URI:     uri,
		Version: version,
		Changes: changes,
	})
}

func (s *Session) DidSaveFile(ctx context.Context, uri lsproto.DocumentUri) {
	s.cancelDiagnosticsRefresh()
	s.pendingFileChangesMu.Lock()
	defer s.pendingFileChangesMu.Unlock()
	s.pendingFileChanges = append(s.pendingFileChanges, FileChange{
		Kind: FileChangeKindSave,
		URI:  uri,
	})
}

func (s *Session) DidChangeWatchedFiles(ctx context.Context, changes []*lsproto.FileEvent) {
	fileChanges := make([]FileChange, 0, len(changes))
	for _, change := range changes {
		var kind FileChangeKind
		switch change.Type {
		case lsproto.FileChangeTypeCreated:
			kind = FileChangeKindWatchCreate
		case lsproto.FileChangeTypeChanged:
			kind = FileChangeKindWatchChange
		case lsproto.FileChangeTypeDeleted:
			kind = FileChangeKindWatchDelete
		default:
			continue // Ignore unknown change types.
		}
		fileChanges = append(fileChanges, FileChange{
			Kind: kind,
			URI:  change.Uri,
		})
	}

	s.pendingFileChangesMu.Lock()
	s.pendingFileChanges = append(s.pendingFileChanges, fileChanges...)
	s.pendingFileChangesMu.Unlock()

	// Schedule a debounced diagnostics refresh
	s.ScheduleDiagnosticsRefresh()
}

func (s *Session) DidChangeCompilerOptionsForInferredProjects(ctx context.Context, options *core.CompilerOptions) {
	s.compilerOptionsForInferredProjects = options
	s.UpdateSnapshot(ctx, s.fs.Overlays(), SnapshotChange{
		reason:                             UpdateReasonDidChangeCompilerOptionsForInferredProjects,
		compilerOptionsForInferredProjects: options,
	})
}

func (s *Session) ScheduleDiagnosticsRefresh() {
	s.diagnosticsRefreshMu.Lock()
	defer s.diagnosticsRefreshMu.Unlock()

	// Cancel any existing scheduled diagnostics refresh
	if s.diagnosticsRefreshCancel != nil {
		s.diagnosticsRefreshCancel()
		s.logger.Log("Delaying scheduled diagnostics refresh...")
	} else {
		s.logger.Log("Scheduling new diagnostics refresh...")
	}

	// Create a new cancellable context for the debounce task
	debounceCtx, cancel := context.WithCancel(context.Background())
	s.diagnosticsRefreshCancel = cancel

	// Enqueue the debounced diagnostics refresh
	s.backgroundQueue.Enqueue(debounceCtx, func(ctx context.Context) {
		// Sleep for the debounce delay
		select {
		case <-time.After(s.options.DebounceDelay):
			// Delay completed, proceed with refresh
		case <-ctx.Done():
			// Context was cancelled, newer events arrived
			return
		}

		// Clear the cancel function since we're about to execute the refresh
		s.diagnosticsRefreshMu.Lock()
		s.diagnosticsRefreshCancel = nil
		s.diagnosticsRefreshMu.Unlock()

		if s.options.LoggingEnabled {
			s.logger.Log("Running scheduled diagnostics refresh")
		}
		if err := s.client.RefreshDiagnostics(context.Background()); err != nil && s.options.LoggingEnabled {
			s.logger.Logf("Error refreshing diagnostics: %v", err)
		}
	})
}

func (s *Session) cancelDiagnosticsRefresh() {
	s.diagnosticsRefreshMu.Lock()
	defer s.diagnosticsRefreshMu.Unlock()
	if s.diagnosticsRefreshCancel != nil {
		s.diagnosticsRefreshCancel()
		s.logger.Log("Canceled scheduled diagnostics refresh")
		s.diagnosticsRefreshCancel = nil
	}
}

func (s *Session) Snapshot() (*Snapshot, func()) {
	s.snapshotMu.RLock()
	defer s.snapshotMu.RUnlock()
	snapshot := s.snapshot
	snapshot.Ref()
	return snapshot, func() {
		if snapshot.Deref() {
			// The session itself accounts for one reference to the snapshot, and it derefs
			// in UpdateSnapshot while holding the snapshotMu lock, so the only way to end
			// up here is for an external caller to release the snapshot after the session
			// has already dereferenced it and moved to a new snapshot. In other words, we
			// can assume that `snapshot != s.snapshot`, and therefor there's no way for
			// anyone else to acquire a reference to this snapshot again.
			snapshot.dispose(s)
		}
	}
}

func (s *Session) getSnapshot(
	ctx context.Context,
	request ResourceRequest,
) *Snapshot {
	var snapshot *Snapshot
	fileChanges, overlays, ataChanges, newConfig := s.flushChanges(ctx)
	updateSnapshot := !fileChanges.IsEmpty() || len(ataChanges) > 0 || newConfig != nil
	if updateSnapshot {
		// If there are pending file changes, we need to update the snapshot.
		// Sending the requested URI ensures that the project for this URI is loaded.
		return s.UpdateSnapshot(ctx, overlays, SnapshotChange{
			reason:          UpdateReasonRequestedLanguageServicePendingChanges,
			fileChanges:     fileChanges,
			ataChanges:      ataChanges,
			newConfig:       newConfig,
			ResourceRequest: request,
		})
	}

	// If there are no pending file changes, we can try to use the current snapshot.
	s.snapshotMu.RLock()
	snapshot = s.snapshot
	s.snapshotMu.RUnlock()

	var updateReason UpdateReason
	if len(request.Projects) > 0 {
		updateReason = UpdateReasonRequestedLanguageServiceProjectDirty
	} else if request.ProjectTree != nil {
		updateReason = UpdateReasonRequestedLoadProjectTree
	} else {
		for _, document := range request.Documents {
			if snapshot.fs.isOpenFile(document.FileName()) {
				// The current snapshot does not have an up to date project for the URI,
				// so we need to update the snapshot to ensure the project is loaded.
				// !!! Allow multiple projects to update in parallel
				project := snapshot.GetDefaultProject(document)
				if project == nil {
					updateReason = UpdateReasonRequestedLanguageServiceProjectNotLoaded
					break
				} else if project.dirty {
					updateReason = UpdateReasonRequestedLanguageServiceProjectDirty
					break
				}
			} else {
				updateReason = UpdateReasonRequestedLanguageServiceForFileNotOpen
				break
			}
		}
	}

	if updateReason != UpdateReasonUnknown {
		snapshot = s.UpdateSnapshot(ctx, overlays, SnapshotChange{
			reason:          updateReason,
			ResourceRequest: request,
		})
	}
	return snapshot
}

func (s *Session) getSnapshotAndDefaultProject(ctx context.Context, uri lsproto.DocumentUri) (*Snapshot, *Project, *ls.LanguageService, error) {
	snapshot := s.getSnapshot(
		ctx,
		ResourceRequest{Documents: []lsproto.DocumentUri{uri}},
	)
	project := snapshot.GetDefaultProject(uri)
	if project == nil {
		return nil, nil, nil, fmt.Errorf("no project found for URI %s", uri)
	}
	return snapshot, project, ls.NewLanguageService(project.GetProgram(), snapshot), nil
}

func (s *Session) GetLanguageService(ctx context.Context, uri lsproto.DocumentUri) (*ls.LanguageService, error) {
	_, _, languageService, err := s.getSnapshotAndDefaultProject(ctx, uri)
	if err != nil {
		return nil, err
	}
	return languageService, nil
}

func (s *Session) GetLanguageServiceAndProjectsForFile(ctx context.Context, uri lsproto.DocumentUri) (*Project, *ls.LanguageService, []*Project, error) {
	snapshot, project, defaultLs, err := s.getSnapshotAndDefaultProject(ctx, uri)
	if err != nil {
		return nil, nil, nil, err
	}
	// !!! TODO: sheetal:  Get other projects that contain the file with symlink
	allProjects := snapshot.GetProjectsContainingFile(uri)
	return project, defaultLs, allProjects, nil
}

func (s *Session) GetProjectsForFile(ctx context.Context, uri lsproto.DocumentUri) ([]*Project, error) {
	snapshot := s.getSnapshot(
		ctx,
		ResourceRequest{Documents: []lsproto.DocumentUri{uri}},
	)

	// !!! TODO: sheetal:  Get other projects that contain the file with symlink
	allProjects := snapshot.GetProjectsContainingFile(uri)
	return allProjects, nil
}

func (s *Session) GetLanguageServiceForProjectWithFile(ctx context.Context, project *Project, uri lsproto.DocumentUri) *ls.LanguageService {
	snapshot := s.getSnapshot(
		ctx,
		ResourceRequest{Projects: []tspath.Path{project.Id()}},
	)
	// Ensure we have updated project
	project = snapshot.ProjectCollection.GetProjectByPath(project.Id())
	if project == nil {
		return nil
	}
	// if program doesnt contain this file any more ignore it
	if !project.HasFile(uri.FileName()) {
		return nil
	}
	return ls.NewLanguageService(project.GetProgram(), snapshot)
}

func (s *Session) GetSnapshotLoadingProjectTree(
	ctx context.Context,
	// If null, all project trees need to be loaded, otherwise only those that are referenced
	requestedProjectTrees map[tspath.Path]struct{},
) *Snapshot {
	snapshot := s.getSnapshot(
		ctx,
		ResourceRequest{ProjectTree: &ProjectTreeRequest{requestedProjectTrees}},
	)
	return snapshot
}

func (s *Session) UpdateSnapshot(ctx context.Context, overlays map[tspath.Path]*Overlay, change SnapshotChange) *Snapshot {
	s.snapshotMu.Lock()
	oldSnapshot := s.snapshot
	newSnapshot := oldSnapshot.Clone(ctx, change, overlays, s)
	s.snapshot = newSnapshot
	s.snapshotMu.Unlock()

	shouldDispose := newSnapshot != oldSnapshot && oldSnapshot.Deref()
	if shouldDispose {
		oldSnapshot.dispose(s)
	}

	// Enqueue ATA updates if needed
	if s.typingsInstaller != nil {
		s.triggerATAForUpdatedProjects(newSnapshot)
	}

	// Enqueue logging, watch updates, and diagnostic refresh tasks
	// !!! userPreferences/configuration updates
	s.backgroundQueue.Enqueue(context.Background(), func(ctx context.Context) {
		if s.options.LoggingEnabled {
			s.logger.Write(newSnapshot.builderLogs.String())
			s.logProjectChanges(oldSnapshot, newSnapshot)
			s.logger.Write("")
		}
		if s.options.WatchEnabled {
			if err := s.updateWatches(oldSnapshot, newSnapshot); err != nil && s.options.LoggingEnabled {
				s.logger.Log(err)
			}
		}
		s.publishProgramDiagnostics(oldSnapshot, newSnapshot)
	})

	return newSnapshot
}

// WaitForBackgroundTasks waits for all background tasks to complete.
// This is intended to be used only for testing purposes.
func (s *Session) WaitForBackgroundTasks() {
	s.backgroundQueue.Wait()
}

func updateWatch[T any](ctx context.Context, session *Session, logger logging.Logger, oldWatcher, newWatcher *WatchedFiles[T]) []error {
	var errors []error
	session.watchesMu.Lock()
	defer session.watchesMu.Unlock()
	if newWatcher != nil {
		if id, watchers, ignored := newWatcher.Watchers(); len(watchers) > 0 {
			var newWatchers collections.OrderedMap[WatcherID, *lsproto.FileSystemWatcher]
			for i, watcher := range watchers {
				key := toFileSystemWatcherKey(watcher)
				value := session.watches[key]
				globId := WatcherID(fmt.Sprintf("%s.%d", id, i))
				if value == nil {
					value = &fileSystemWatcherValue{id: globId}
					session.watches[key] = value
				}
				value.count++
				if value.count == 1 {
					newWatchers.Set(globId, watcher)
				}
			}
			for id, watcher := range newWatchers.Entries() {
				if err := session.client.WatchFiles(ctx, id, []*lsproto.FileSystemWatcher{watcher}); err != nil {
					errors = append(errors, err)
				} else if logger != nil {
					if oldWatcher == nil {
						logger.Log(fmt.Sprintf("Added new watch: %s", id))
					} else {
						logger.Log(fmt.Sprintf("Updated watch: %s", id))
					}
					logger.Log("\t" + *watcher.GlobPattern.Pattern)
					logger.Log("")
				}
			}
			if len(ignored) > 0 {
				logger.Logf("%d paths ineligible for watching", len(ignored))
				if logger.IsVerbose() {
					for path := range ignored {
						logger.Log("\t" + path)
					}
				}
			}
		}
	}
	if oldWatcher != nil {
		if _, watchers, _ := oldWatcher.Watchers(); len(watchers) > 0 {
			var removedWatchers []WatcherID
			for _, watcher := range watchers {
				key := toFileSystemWatcherKey(watcher)
				value := session.watches[key]
				if value == nil {
					continue
				}
				if value.count <= 1 {
					delete(session.watches, key)
					removedWatchers = append(removedWatchers, value.id)
				} else {
					value.count--
				}
			}
			for _, id := range removedWatchers {
				if err := session.client.UnwatchFiles(ctx, id); err != nil {
					errors = append(errors, err)
				} else if logger != nil && newWatcher == nil {
					logger.Log(fmt.Sprintf("Removed watch: %s", id))
				}
			}
		}
	}
	return errors
}

func (s *Session) updateWatches(oldSnapshot *Snapshot, newSnapshot *Snapshot) error {
	var errors []error
	start := time.Now()
	ctx := context.Background()
	core.DiffMapsFunc(
		oldSnapshot.ConfigFileRegistry.configs,
		newSnapshot.ConfigFileRegistry.configs,
		func(a, b *configFileEntry) bool {
			return a.rootFilesWatch.ID() == b.rootFilesWatch.ID()
		},
		func(_ tspath.Path, addedEntry *configFileEntry) {
			errors = append(errors, updateWatch(ctx, s, s.logger, nil, addedEntry.rootFilesWatch)...)
		},
		func(_ tspath.Path, removedEntry *configFileEntry) {
			errors = append(errors, updateWatch(ctx, s, s.logger, removedEntry.rootFilesWatch, nil)...)
		},
		func(_ tspath.Path, oldEntry, newEntry *configFileEntry) {
			errors = append(errors, updateWatch(ctx, s, s.logger, oldEntry.rootFilesWatch, newEntry.rootFilesWatch)...)
		},
	)

	collections.DiffOrderedMaps(
		oldSnapshot.ProjectCollection.ProjectsByPath(),
		newSnapshot.ProjectCollection.ProjectsByPath(),
		func(_ tspath.Path, addedProject *Project) {
			errors = append(errors, updateWatch(ctx, s, s.logger, nil, addedProject.programFilesWatch)...)
			errors = append(errors, updateWatch(ctx, s, s.logger, nil, addedProject.affectingLocationsWatch)...)
			errors = append(errors, updateWatch(ctx, s, s.logger, nil, addedProject.failedLookupsWatch)...)
			errors = append(errors, updateWatch(ctx, s, s.logger, nil, addedProject.typingsWatch)...)
		},
		func(_ tspath.Path, removedProject *Project) {
			errors = append(errors, updateWatch(ctx, s, s.logger, removedProject.programFilesWatch, nil)...)
			errors = append(errors, updateWatch(ctx, s, s.logger, removedProject.affectingLocationsWatch, nil)...)
			errors = append(errors, updateWatch(ctx, s, s.logger, removedProject.failedLookupsWatch, nil)...)
			errors = append(errors, updateWatch(ctx, s, s.logger, removedProject.typingsWatch, nil)...)
		},
		func(_ tspath.Path, oldProject, newProject *Project) {
			if oldProject.programFilesWatch.ID() != newProject.programFilesWatch.ID() {
				errors = append(errors, updateWatch(ctx, s, s.logger, oldProject.programFilesWatch, newProject.programFilesWatch)...)
			}
			if oldProject.affectingLocationsWatch.ID() != newProject.affectingLocationsWatch.ID() {
				errors = append(errors, updateWatch(ctx, s, s.logger, oldProject.affectingLocationsWatch, newProject.affectingLocationsWatch)...)
			}
			if oldProject.failedLookupsWatch.ID() != newProject.failedLookupsWatch.ID() {
				errors = append(errors, updateWatch(ctx, s, s.logger, oldProject.failedLookupsWatch, newProject.failedLookupsWatch)...)
			}
			if oldProject.typingsWatch.ID() != newProject.typingsWatch.ID() {
				errors = append(errors, updateWatch(ctx, s, s.logger, oldProject.typingsWatch, newProject.typingsWatch)...)
			}
		},
	)

	if len(errors) > 0 {
		return fmt.Errorf("errors updating watches: %v", errors)
	} else if s.options.LoggingEnabled {
		s.logger.Log(fmt.Sprintf("Updated watches in %v", time.Since(start)))
	}
	return nil
}

func (s *Session) Close() {
	// Cancel any pending diagnostics refresh
	s.cancelDiagnosticsRefresh()
	s.backgroundQueue.Close()
}

func (s *Session) flushChanges(ctx context.Context) (FileChangeSummary, map[tspath.Path]*Overlay, map[tspath.Path]*ATAStateChange, *Config) {
	s.pendingFileChangesMu.Lock()
	defer s.pendingFileChangesMu.Unlock()
	s.pendingATAChangesMu.Lock()
	defer s.pendingATAChangesMu.Unlock()
	pendingATAChanges := s.pendingATAChanges
	s.pendingATAChanges = make(map[tspath.Path]*ATAStateChange)
	fileChanges, overlays := s.flushChangesLocked(ctx)
	s.configRWMu.Lock()
	defer s.configRWMu.Unlock()
	var newConfig *Config
	if s.pendingConfigChanges {
		newConfig = &Config{
			tsUserPreferences: s.userPreferences.Copy(),
		}
	}
	s.pendingConfigChanges = false
	return fileChanges, overlays, pendingATAChanges, newConfig
}

// flushChangesLocked should only be called with s.pendingFileChangesMu held.
func (s *Session) flushChangesLocked(ctx context.Context) (FileChangeSummary, map[tspath.Path]*Overlay) {
	if len(s.pendingFileChanges) == 0 {
		return FileChangeSummary{}, s.fs.Overlays()
	}

	start := time.Now()
	changes, overlays := s.fs.processChanges(s.pendingFileChanges)
	if s.options.LoggingEnabled {
		s.logger.Log(fmt.Sprintf("Processed %d file changes in %v", len(s.pendingFileChanges), time.Since(start)))
	}
	s.pendingFileChanges = nil
	return changes, overlays
}

// logProjectChanges logs information about projects that have changed between snapshots
func (s *Session) logProjectChanges(oldSnapshot *Snapshot, newSnapshot *Snapshot) {
	var loggedProjectChanges bool
	logProject := func(project *Project) {
		var builder strings.Builder
		project.print(s.logger.IsVerbose() /*writeFileNames*/, s.logger.IsVerbose() /*writeFileExplanation*/, &builder)
		s.logger.Log(builder.String())
		loggedProjectChanges = true
	}
	collections.DiffOrderedMaps(
		oldSnapshot.ProjectCollection.ProjectsByPath(),
		newSnapshot.ProjectCollection.ProjectsByPath(),
		func(path tspath.Path, addedProject *Project) {
			// New project added
			logProject(addedProject)
		},
		func(path tspath.Path, removedProject *Project) {
			// Project removed
			s.logger.Logf("\nProject '%s' removed\n%s", removedProject.Name(), hr)
		},
		func(path tspath.Path, oldProject, newProject *Project) {
			// Project updated
			if newProject.ProgramUpdateKind == ProgramUpdateKindNewFiles {
				logProject(newProject)
			}
		},
	)

	if loggedProjectChanges || s.logger.IsVerbose() {
		s.logCacheStats(newSnapshot)
	}
}

func (s *Session) logCacheStats(snapshot *Snapshot) {
	var parseCacheSize int
	var programCount int
	var extendedConfigCount int
	if s.logger.IsVerbose() {
		s.parseCache.entries.Range(func(_ parseCacheKey, _ *parseCacheEntry) bool {
			parseCacheSize++
			return true
		})
		s.programCounter.refs.Range(func(_ *compiler.Program, _ *atomic.Int32) bool {
			programCount++
			return true
		})
		s.extendedConfigCache.entries.Range(func(_ tspath.Path, _ *extendedConfigCacheEntry) bool {
			extendedConfigCount++
			return true
		})
	}
	s.logger.Write("\n======== Cache Statistics ========")
	s.logger.Logf("Open file count:   %6d", len(snapshot.fs.overlays))
	s.logger.Logf("Cached disk files: %6d", len(snapshot.fs.diskFiles))
	s.logger.Logf("Project count:     %6d", len(snapshot.ProjectCollection.Projects()))
	s.logger.Logf("Config count:      %6d", len(snapshot.ConfigFileRegistry.configs))
	if s.logger.IsVerbose() {
		s.logger.Logf("Parse cache size:           %6d", parseCacheSize)
		s.logger.Logf("Program count:              %6d", programCount)
		s.logger.Logf("Extended config cache size: %6d", extendedConfigCount)
	}
}

func (s *Session) NpmInstall(cwd string, npmInstallArgs []string) ([]byte, error) {
	return s.npmExecutor.NpmInstall(cwd, npmInstallArgs)
}

func (s *Session) refreshInlayHintsIfNeeded(oldPrefs *lsutil.UserPreferences, newPrefs *lsutil.UserPreferences) {
	if oldPrefs.InlayHints != newPrefs.InlayHints {
		if err := s.client.RefreshInlayHints(context.Background()); err != nil && s.options.LoggingEnabled {
			s.logger.Logf("Error refreshing inlay hints: %v", err)
		}
	}
}

func (s *Session) refreshCodeLensIfNeeded(oldPrefs *lsutil.UserPreferences, newPrefs *lsutil.UserPreferences) {
	if oldPrefs.CodeLens != newPrefs.CodeLens {
		if err := s.client.RefreshCodeLens(context.Background()); err != nil && s.options.LoggingEnabled {
			s.logger.Logf("Error refreshing code lens: %v", err)
		}
	}
}

func (s *Session) publishProgramDiagnostics(oldSnapshot *Snapshot, newSnapshot *Snapshot) {
	if !s.options.PushDiagnosticsEnabled {
		return
	}

	ctx := context.Background()
	collections.DiffOrderedMaps(
		oldSnapshot.ProjectCollection.ProjectsByPath(),
		newSnapshot.ProjectCollection.ProjectsByPath(),
		func(configFilePath tspath.Path, addedProject *Project) {
			if !shouldPublishProgramDiagnostics(addedProject, newSnapshot.ID()) {
				return
			}
			s.publishProjectDiagnostics(ctx, string(configFilePath), addedProject.Program.GetProgramDiagnostics(), newSnapshot.converters)
		},
		func(configFilePath tspath.Path, removedProject *Project) {
			if removedProject.Kind != KindConfigured {
				return
			}
			s.publishProjectDiagnostics(ctx, string(configFilePath), nil, oldSnapshot.converters)
		},
		func(configFilePath tspath.Path, oldProject, newProject *Project) {
			if !shouldPublishProgramDiagnostics(newProject, newSnapshot.ID()) {
				return
			}
			s.publishProjectDiagnostics(ctx, string(configFilePath), newProject.Program.GetProgramDiagnostics(), newSnapshot.converters)
		},
	)
}

func shouldPublishProgramDiagnostics(p *Project, snapshotID uint64) bool {
	if p.Kind != KindConfigured || p.Program == nil || p.ProgramLastUpdate != snapshotID {
		return false
	}
	return p.ProgramUpdateKind > ProgramUpdateKindCloned
}

func (s *Session) publishProjectDiagnostics(ctx context.Context, configFilePath string, diagnostics []*ast.Diagnostic, converters *lsconv.Converters) {
	lspDiagnostics := make([]*lsproto.Diagnostic, 0, len(diagnostics))
	for _, diag := range diagnostics {
		lspDiagnostics = append(lspDiagnostics, lsconv.DiagnosticToLSPPush(ctx, converters, diag))
	}

	if err := s.client.PublishDiagnostics(ctx, &lsproto.PublishDiagnosticsParams{
		Uri:         lsconv.FileNameToDocumentURI(configFilePath),
		Diagnostics: lspDiagnostics,
	}); err != nil && s.options.LoggingEnabled {
		s.logger.Logf("Error publishing diagnostics: %v", err)
	}
}

func (s *Session) triggerATAForUpdatedProjects(newSnapshot *Snapshot) {
	for _, project := range newSnapshot.ProjectCollection.Projects() {
		if project.ShouldTriggerATA(newSnapshot.ID()) {
			s.backgroundQueue.Enqueue(context.Background(), func(ctx context.Context) {
				var logTree *logging.LogTree
				if s.options.LoggingEnabled {
					logTree = logging.NewLogTree("Triggering ATA for project " + project.Name())
				}

				typingsInfo := project.ComputeTypingsInfo()
				request := &ata.TypingsInstallRequest{
					ProjectID:        project.configFilePath,
					TypingsInfo:      &typingsInfo,
					FileNames:        core.Map(project.Program.GetSourceFiles(), func(file *ast.SourceFile) string { return file.FileName() }),
					ProjectRootPath:  project.currentDirectory,
					CompilerOptions:  project.CommandLine.CompilerOptions(),
					CurrentDirectory: s.options.CurrentDirectory,
					GetScriptKind:    core.GetScriptKindFromFileName,
					FS:               s.fs.fs,
					Logger:           logTree,
				}

				if result, err := s.typingsInstaller.InstallTypings(request); err != nil && logTree != nil {
					s.logger.Log(fmt.Sprintf("ATA installation failed for project %s: %v", project.Name(), err))
					s.logger.Log(logTree.String())
				} else {
					if !slices.Equal(result.TypingsFiles, project.typingsFiles) {
						s.pendingATAChangesMu.Lock()
						defer s.pendingATAChangesMu.Unlock()
						s.pendingATAChanges[project.configFilePath] = &ATAStateChange{
							TypingsInfo:         &typingsInfo,
							TypingsFiles:        result.TypingsFiles,
							TypingsFilesToWatch: result.FilesToWatch,
							Logs:                logTree,
						}
						s.ScheduleDiagnosticsRefresh()
					}
				}
			})
		}
	}
}
