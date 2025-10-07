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
	"github.com/microsoft/typescript-go/internal/ls"
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
	UpdateReasonRequestedLanguageServiceProjectDirty
)

// SessionOptions are the immutable initialization options for a session.
// Snapshots may reference them as a pointer since they never change.
type SessionOptions struct {
	CurrentDirectory   string
	DefaultLibraryPath string
	TypingsLocation    string
	PositionEncoding   lsproto.PositionEncodingKind
	WatchEnabled       bool
	LoggingEnabled     bool
	DebounceDelay      time.Duration
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
	extendedConfigCache *extendedConfigCache
	// programCounter counts how many snapshots reference a program.
	// When a program is no longer referenced, its source files are
	// released from the parseCache.
	programCounter *programCounter

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
	overlayFS := newOverlayFS(init.FS, make(map[tspath.Path]*overlay), init.Options.PositionEncoding, toPath)
	parseCache := init.ParseCache
	if parseCache == nil {
		parseCache = &ParseCache{}
	}
	extendedConfigCache := &extendedConfigCache{}

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
		snapshotID:          atomic.Uint64{},
		snapshot: NewSnapshot(
			uint64(0),
			&snapshotFS{
				toPath: toPath,
				fs:     init.FS,
			},
			init.Options,
			parseCache,
			extendedConfigCache,
			&ConfigFileRegistry{},
			nil,
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

// Trace implements module.ResolutionHost
func (s *Session) Trace(msg string) {
	panic("ATA module resolution should not use tracing")
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
		reason:        UpdateReasonDidOpenFile,
		fileChanges:   changes,
		requestedURIs: []lsproto.DocumentUri{uri},
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

func (s *Session) GetLanguageService(ctx context.Context, uri lsproto.DocumentUri) (*ls.LanguageService, error) {
	var snapshot *Snapshot
	fileChanges, overlays, ataChanges := s.flushChanges(ctx)
	updateSnapshot := !fileChanges.IsEmpty() || len(ataChanges) > 0
	if updateSnapshot {
		// If there are pending file changes, we need to update the snapshot.
		// Sending the requested URI ensures that the project for this URI is loaded.
		snapshot = s.UpdateSnapshot(ctx, overlays, SnapshotChange{
			reason:        UpdateReasonRequestedLanguageServicePendingChanges,
			fileChanges:   fileChanges,
			ataChanges:    ataChanges,
			requestedURIs: []lsproto.DocumentUri{uri},
		})
	} else {
		// If there are no pending file changes, we can try to use the current snapshot.
		s.snapshotMu.RLock()
		snapshot = s.snapshot
		s.snapshotMu.RUnlock()
	}

	project := snapshot.GetDefaultProject(uri)
	if project == nil && !updateSnapshot || project != nil && project.dirty {
		// The current snapshot does not have an up to date project for the URI,
		// so we need to update the snapshot to ensure the project is loaded.
		// !!! Allow multiple projects to update in parallel
		snapshot = s.UpdateSnapshot(ctx, overlays, SnapshotChange{
			reason:        core.IfElse(project == nil, UpdateReasonRequestedLanguageServiceProjectNotLoaded, UpdateReasonRequestedLanguageServiceProjectDirty),
			requestedURIs: []lsproto.DocumentUri{uri},
		})
		project = snapshot.GetDefaultProject(uri)
	}
	if project == nil {
		return nil, fmt.Errorf("no project found for URI %s", uri)
	}
	return ls.NewLanguageService(project.GetProgram(), snapshot), nil
}

func (s *Session) UpdateSnapshot(ctx context.Context, overlays map[tspath.Path]*overlay, change SnapshotChange) *Snapshot {
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

func (s *Session) flushChanges(ctx context.Context) (FileChangeSummary, map[tspath.Path]*overlay, map[tspath.Path]*ATAStateChange) {
	s.pendingFileChangesMu.Lock()
	defer s.pendingFileChangesMu.Unlock()
	s.pendingATAChangesMu.Lock()
	defer s.pendingATAChangesMu.Unlock()
	pendingATAChanges := s.pendingATAChanges
	s.pendingATAChanges = make(map[tspath.Path]*ATAStateChange)
	fileChanges, overlays := s.flushChangesLocked(ctx)
	return fileChanges, overlays, pendingATAChanges
}

// flushChangesLocked should only be called with s.pendingFileChangesMu held.
func (s *Session) flushChangesLocked(ctx context.Context) (FileChangeSummary, map[tspath.Path]*overlay) {
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
