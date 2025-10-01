package project

import (
	"context"
	"fmt"
	"sync/atomic"
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/ata"
	"github.com/microsoft/typescript-go/internal/project/dirty"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type Snapshot struct {
	id       uint64
	parentId uint64
	refCount atomic.Int32

	// Session options are immutable for the server lifetime,
	// so can be a pointer.
	sessionOptions *SessionOptions
	toPath         func(fileName string) tspath.Path
	converters     *ls.Converters

	// Immutable state, cloned between snapshots
	fs                                 *snapshotFS
	ProjectCollection                  *ProjectCollection
	ConfigFileRegistry                 *ConfigFileRegistry
	compilerOptionsForInferredProjects *core.CompilerOptions

	builderLogs *logging.LogTree
	apiError    error
}

// NewSnapshot
func NewSnapshot(
	id uint64,
	fs *snapshotFS,
	sessionOptions *SessionOptions,
	parseCache *ParseCache,
	extendedConfigCache *extendedConfigCache,
	configFileRegistry *ConfigFileRegistry,
	compilerOptionsForInferredProjects *core.CompilerOptions,
	toPath func(fileName string) tspath.Path,
) *Snapshot {
	s := &Snapshot{
		id: id,

		sessionOptions: sessionOptions,
		toPath:         toPath,

		fs:                                 fs,
		ConfigFileRegistry:                 configFileRegistry,
		ProjectCollection:                  &ProjectCollection{toPath: toPath},
		compilerOptionsForInferredProjects: compilerOptionsForInferredProjects,
	}
	s.converters = ls.NewConverters(s.sessionOptions.PositionEncoding, s.LSPLineMap)
	s.refCount.Store(1)
	return s
}

func (s *Snapshot) GetDefaultProject(uri lsproto.DocumentUri) *Project {
	fileName := uri.FileName()
	path := s.toPath(fileName)
	return s.ProjectCollection.GetDefaultProject(fileName, path)
}

func (s *Snapshot) GetFile(fileName string) FileHandle {
	return s.fs.GetFile(fileName)
}

func (s *Snapshot) LSPLineMap(fileName string) *ls.LSPLineMap {
	if file := s.fs.GetFile(fileName); file != nil {
		return file.LSPLineMap()
	}
	return nil
}

func (s *Snapshot) Converters() *ls.Converters {
	return s.converters
}

func (s *Snapshot) ID() uint64 {
	return s.id
}

type APISnapshotRequest struct {
	OpenProjects   *collections.Set[string]
	CloseProjects  *collections.Set[tspath.Path]
	UpdateProjects *collections.Set[tspath.Path]
}

type SnapshotChange struct {
	reason UpdateReason
	// fileChanges are the changes that have occurred since the last snapshot.
	fileChanges FileChangeSummary
	// requestedURIs are URIs that were requested by the client.
	// The new snapshot should ensure projects for these URIs have loaded programs.
	requestedURIs []lsproto.DocumentUri
	// compilerOptionsForInferredProjects is the compiler options to use for inferred projects.
	// It should only be set the value in the next snapshot should be changed. If nil, the
	// value from the previous snapshot will be copied to the new snapshot.
	compilerOptionsForInferredProjects *core.CompilerOptions
	// ataChanges contains ATA-related changes to apply to projects in the new snapshot.
	ataChanges map[tspath.Path]*ATAStateChange
	apiRequest *APISnapshotRequest
}

// ATAStateChange represents a change to a project's ATA state.
type ATAStateChange struct {
	ProjectID tspath.Path
	// TypingsInfo is the new typings info for the project.
	TypingsInfo *ata.TypingsInfo
	// TypingsFiles is the new list of typing files for the project.
	TypingsFiles []string
	// TypingsFilesToWatch is the new list of typing files to watch for changes.
	TypingsFilesToWatch []string
	Logs                *logging.LogTree
}

func (s *Snapshot) Clone(ctx context.Context, change SnapshotChange, overlays map[tspath.Path]*overlay, session *Session) *Snapshot {
	var logger *logging.LogTree

	// Print in-progress logs immediately if cloning fails
	if session.options.LoggingEnabled {
		defer func() {
			if r := recover(); r != nil {
				session.logger.Write(logger.String())
				panic(r)
			}
		}()
	}

	if session.options.LoggingEnabled {
		logger = logging.NewLogTree(fmt.Sprintf("Cloning snapshot %d", s.id))
		switch change.reason {
		case UpdateReasonDidOpenFile:
			logger.Logf("Reason: DidOpenFile - %s", change.fileChanges.Opened)
		case UpdateReasonDidChangeCompilerOptionsForInferredProjects:
			logger.Logf("Reason: DidChangeCompilerOptionsForInferredProjects")
		case UpdateReasonRequestedLanguageServicePendingChanges:
			logger.Logf("Reason: RequestedLanguageService (pending file changes) - %v", change.requestedURIs)
		case UpdateReasonRequestedLanguageServiceProjectNotLoaded:
			logger.Logf("Reason: RequestedLanguageService (project not loaded) - %v", change.requestedURIs)
		case UpdateReasonRequestedLanguageServiceProjectDirty:
			logger.Logf("Reason: RequestedLanguageService (project dirty) - %v", change.requestedURIs)
		}
	}

	start := time.Now()
	fs := newSnapshotFSBuilder(session.fs.fs, overlays, s.fs.diskFiles, session.options.PositionEncoding, s.toPath)
	fs.markDirtyFiles(change.fileChanges)

	compilerOptionsForInferredProjects := s.compilerOptionsForInferredProjects
	if change.compilerOptionsForInferredProjects != nil {
		// !!! mark inferred projects as dirty?
		compilerOptionsForInferredProjects = change.compilerOptionsForInferredProjects
	}

	newSnapshotID := session.snapshotID.Add(1)
	projectCollectionBuilder := newProjectCollectionBuilder(
		ctx,
		newSnapshotID,
		fs,
		s.ProjectCollection,
		s.ConfigFileRegistry,
		s.ProjectCollection.apiOpenedProjects,
		compilerOptionsForInferredProjects,
		s.sessionOptions,
		session.parseCache,
		session.extendedConfigCache,
	)

	var apiError error
	if change.apiRequest != nil {
		apiError = projectCollectionBuilder.HandleAPIRequest(change.apiRequest, logger.Fork("HandleAPIRequest"))
	}

	if len(change.ataChanges) != 0 {
		projectCollectionBuilder.DidUpdateATAState(change.ataChanges, logger.Fork("DidUpdateATAState"))
	}

	if !change.fileChanges.IsEmpty() {
		projectCollectionBuilder.DidChangeFiles(change.fileChanges, logger.Fork("DidChangeFiles"))
	}

	for _, uri := range change.requestedURIs {
		projectCollectionBuilder.DidRequestFile(uri, logger.Fork("DidRequestFile"))
	}

	projectCollection, configFileRegistry := projectCollectionBuilder.Finalize(logger)

	// Clean cached disk files not touched by any open project. It's not important that we do this on
	// file open specifically, but we don't need to do it on every snapshot clone.
	if len(change.fileChanges.Opened) != 0 {
		var changedFiles bool
		for _, project := range projectCollection.Projects() {
			if project.ProgramLastUpdate == newSnapshotID && project.ProgramUpdateKind != ProgramUpdateKindCloned {
				changedFiles = true
				break
			}
		}
		// The set of seen files can change only if a program was constructed (not cloned) during this snapshot.
		if changedFiles {
			cleanFilesStart := time.Now()
			removedFiles := 0
			fs.diskFiles.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) bool {
				for _, project := range projectCollection.Projects() {
					if project.host.seenFiles.Has(entry.Key()) {
						return true
					}
				}
				entry.Delete()
				removedFiles++
				return true
			})
			if session.options.LoggingEnabled {
				logger.Logf("Removed %d cached files in %v", removedFiles, time.Since(cleanFilesStart))
			}
		}
	}

	snapshotFS, _ := fs.Finalize()
	newSnapshot := NewSnapshot(
		newSnapshotID,
		snapshotFS,
		s.sessionOptions,
		session.parseCache,
		session.extendedConfigCache,
		nil,
		compilerOptionsForInferredProjects,
		s.toPath,
	)
	newSnapshot.parentId = s.id
	newSnapshot.ProjectCollection = projectCollection
	newSnapshot.ConfigFileRegistry = configFileRegistry
	newSnapshot.builderLogs = logger
	newSnapshot.apiError = apiError

	for _, project := range newSnapshot.ProjectCollection.Projects() {
		session.programCounter.Ref(project.Program)
		if project.ProgramLastUpdate == newSnapshotID {
			// If the program was updated during this clone, the project and its host are new
			// and still retain references to the builder. Freezing clears the builder reference
			// so it's GC'd and to ensure the project can't access any data not already in the
			// snapshot during use. This is pretty kludgy, but it's an artifact of Program design:
			// Program has a single host, which is expected to implement a full vfs.FS, among
			// other things. That host is *mostly* only used during program *construction*, but a
			// few methods may get exercised during program *use*. So, our compiler host is allowed
			// to access caches and perform mutating effects (like acquire referenced project
			// config files) during snapshot building, and then we call `freeze` to ensure those
			// mutations don't happen afterwards. In the future, we might improve things by
			// separating what it takes to build a program from what it takes to use a program,
			// and only pass the former into NewProgram instead of retaining it indefinitely.
			project.host.freeze(snapshotFS, newSnapshot.ConfigFileRegistry)
		}
	}
	for path, config := range newSnapshot.ConfigFileRegistry.configs {
		if config.commandLine != nil && config.commandLine.ConfigFile != nil {
			if prevConfig, ok := s.ConfigFileRegistry.configs[path]; ok {
				if prevConfig.commandLine != nil && config.commandLine.ConfigFile == prevConfig.commandLine.ConfigFile {
					for _, file := range prevConfig.commandLine.ExtendedSourceFiles() {
						// Ref count extended configs that were already loaded in the previous snapshot.
						// New/changed ones were handled during config file registry building.
						session.extendedConfigCache.Ref(s.toPath(file))
					}
				}
			}
		}
	}

	logger.Logf("Finished cloning snapshot %d into snapshot %d in %v", s.id, newSnapshot.id, time.Since(start))
	return newSnapshot
}

func (s *Snapshot) Ref() {
	s.refCount.Add(1)
}

func (s *Snapshot) Deref() bool {
	return s.refCount.Add(-1) == 0
}

func (s *Snapshot) dispose(session *Session) {
	for _, project := range s.ProjectCollection.Projects() {
		if project.Program != nil && session.programCounter.Deref(project.Program) {
			for _, file := range project.Program.SourceFiles() {
				session.parseCache.Deref(file)
			}
		}
	}
	for _, config := range s.ConfigFileRegistry.configs {
		if config.commandLine != nil {
			for _, file := range config.commandLine.ExtendedSourceFiles() {
				session.extendedConfigCache.Deref(session.toPath(file))
			}
		}
	}
}
