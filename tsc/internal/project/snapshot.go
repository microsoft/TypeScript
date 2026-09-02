package project

import (
	"context"
	"fmt"
	"maps"
	"slices"
	"sync"
	"sync/atomic"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/ls/autoimport"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project/ata"
	"github.com/microsoft/TypeScript/tsc/internal/project/dirty"
	"github.com/microsoft/TypeScript/tsc/internal/project/logging"
	"github.com/microsoft/TypeScript/tsc/internal/sourcemap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfsmatch"
)

type Snapshot struct {
	id       uint64
	parentId uint64
	refCount atomic.Int32

	// Session options are immutable for the server lifetime,
	// so can be a pointer.
	sessionOptions *SessionOptions
	toPath         func(fileName string) tspath.Path
	converters     *lsconv.Converters

	// Immutable state, cloned between snapshots
	fs                                     *SnapshotFS
	ProjectCollection                      *ProjectCollection
	ConfigFileRegistry                     *ConfigFileRegistry
	AutoImports                            *autoimport.Registry
	autoImportsWatch                       *WatchedFiles[map[tspath.Path]string]
	compilerOptionsForInferredProjects     *core.CompilerOptions
	inferredProjectContentMappers          []*contentmapper.Mapper
	inferredProjectContentMapperExtensions []string
	userPreferences                        lsutil.UserPreferences
	contentMapperWatchStateOnce            sync.Once
	contentMapperExtensions                []string
	contentMapperWatchedFiles              *collections.Set[tspath.Path]

	builderLogs *logging.LogTree
	apiError    error
}

func (s *Snapshot) contentMapperWatchState() ([]string, *collections.Set[tspath.Path]) {
	s.contentMapperWatchStateOnce.Do(func() {
		configured := s.ConfigFileRegistry.contentMappers()
		if configured != nil {
			s.contentMapperExtensions = slices.Clone(configured.extensions)
		}
		s.contentMapperExtensions = append(s.contentMapperExtensions, s.inferredProjectContentMapperExtensions...)
		slices.Sort(s.contentMapperExtensions)
		s.contentMapperExtensions = slices.Compact(s.contentMapperExtensions)

		s.contentMapperWatchedFiles = &collections.Set[tspath.Path]{}
		for _, project := range s.ProjectCollection.Projects() {
			if project.contentMapperWatchedFiles != nil {
				for path := range project.contentMapperWatchedFiles.Keys() {
					s.contentMapperWatchedFiles.Add(path)
				}
			}
		}
	})
	return s.contentMapperExtensions, s.contentMapperWatchedFiles
}

// NewSnapshot initializes a snapshot with refCount 1.
// The caller is responsible for calling Deref when done.
func NewSnapshot(
	id uint64,
	fs *SnapshotFS,
	sessionOptions *SessionOptions,
	configFileRegistry *ConfigFileRegistry,
	compilerOptionsForInferredProjects *core.CompilerOptions,
	userPreferences lsutil.UserPreferences,
	autoImports *autoimport.Registry,
	autoImportsWatch *WatchedFiles[map[tspath.Path]string],
	toPath func(fileName string) tspath.Path,
) *Snapshot {
	s := &Snapshot{
		id: id,

		sessionOptions: sessionOptions,
		toPath:         toPath,

		fs:                                 fs,
		ConfigFileRegistry:                 configFileRegistry,
		ProjectCollection:                  &ProjectCollection{toPath: toPath, openFiles: openFilePaths(fs.overlays)},
		compilerOptionsForInferredProjects: compilerOptionsForInferredProjects,
		userPreferences:                    userPreferences,
		AutoImports:                        autoImports,
		autoImportsWatch:                   autoImportsWatch,
	}
	s.refCount.Store(1)
	s.converters = lsconv.NewConverters(s.sessionOptions.PositionEncoding, s.LSPLineMap)
	return s
}

// cloneForProgram clones a snapshot and creates a single synthetic inferred
// project representing createProgram input.
func (s *Snapshot) cloneForProgram(
	ctx context.Context,
	rootFileNames []string,
	compilerOptions *core.CompilerOptions,
	projectReferences []*core.ProjectReference,
	configFileParsingDiagnostics []*ast.Diagnostic,
	oldProject *Project,
	fileChanges FileChangeSummary,
	session *Session,
) *Snapshot {
	var logger *logging.LogTree

	if session.options.LoggingEnabled {
		defer func() {
			if r := recover(); r != nil {
				session.logger.Log(logger.String())
				panic(r)
			}
		}()
		logger = logging.NewLogTree(fmt.Sprintf("Cloning snapshot %d for program", s.id))
	}

	start := time.Now()
	fs := newSnapshotFSBuilder(session.fs.fs, s.fs.overlays, s.fs.overlays, s.fs.diskFiles, s.fs.diskDirectories, s.fs.nodeModulesRealpathAliases, session.options.PositionEncoding, s.toPath)
	fileChanges = s.processFileChanges(fs, fileChanges, logger, nil)

	newSnapshotID := session.snapshotID.Add(1)
	projectCollectionBuilder := newProjectCollectionBuilder(
		ctx,
		newSnapshotID,
		fs,
		s.ProjectCollection,
		s.ConfigFileRegistry,
		APIState{},
		compilerOptions,
		s.inferredProjectContentMappers,
		s.inferredProjectContentMapperExtensions,
		s.sessionOptions,
		s.ConfigFileRegistry.customConfigFileName,
		session.parseCache,
		session.contentMappedParseCache,
		session.extendedConfigCache,
		session.contentMapperHost,
		session.client,
	)

	projectCollectionBuilder.seedInferredProjectForProgram(oldProject, logger)
	if !fileChanges.IsEmpty() {
		changeLogger := logger
		if changeLogger != nil {
			changeLogger = logger.Fork("DidChangeFiles")
		}
		projectCollectionBuilder.DidChangeFiles(fileChanges, changeLogger)
	}
	updateLogger := logger
	if updateLogger != nil {
		updateLogger = logger.Fork("UpdateProgramConfig")
	}
	projectCollectionBuilder.updateOrCreateInferredProject(
		slices.Clone(rootFileNames),
		compilerOptions,
		projectReferences,
		configFileParsingDiagnostics,
		s.inferredProjectContentMappers,
		updateLogger,
	)
	if projectCollectionBuilder.inferredProject.Value().dirty {
		createLogger := logger
		if createLogger != nil {
			createLogger = logger.Fork("CreateProgram")
		}
		projectCollectionBuilder.updateProgram(projectCollectionBuilder.inferredProject, createLogger)
	}
	projectCollectionBuilder.cleanupAllConfiguredProjects(logger.Fork("cleanupAllConfiguredProjects"))
	newProjectCollection, newConfigFileRegistry := projectCollectionBuilder.Finalize(logger)

	cleanFilesStart := time.Now()
	removedFiles := 0
	fs.diskFiles.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) bool {
		for _, project := range newProjectCollection.Projects() {
			if project.host != nil && project.host.sourceFS.SeenFile(entry.Key()) {
				return true
			}
		}
		entry.Delete()
		removedFiles++
		return true
	})
	if session.options.LoggingEnabled {
		logger.Logf("Removed %d cached file(s) in %v", removedFiles, time.Since(cleanFilesStart))
	}

	snapshotFS, _ := fs.Finalize()
	newSnapshot := NewSnapshot(
		newSnapshotID,
		snapshotFS,
		s.sessionOptions,
		newConfigFileRegistry,
		compilerOptions,
		s.userPreferences,
		nil,
		nil,
		s.toPath,
	)
	newSnapshot.parentId = s.id
	newSnapshot.ProjectCollection = newProjectCollection
	newSnapshot.ConfigFileRegistry = newConfigFileRegistry
	newSnapshot.inferredProjectContentMappers = s.inferredProjectContentMappers
	newSnapshot.inferredProjectContentMapperExtensions = s.inferredProjectContentMapperExtensions
	newSnapshot.builderLogs = logger

	for _, project := range newSnapshot.ProjectCollection.Projects() {
		if project.Program != nil {
			session.programCounter.Ref(project.Program)
			if project.ProgramLastUpdate == newSnapshotID {
				project.host.freeze(snapshotFS, newConfigFileRegistry)
			}
		}
	}

	for _, config := range newSnapshot.ConfigFileRegistry.configs {
		if config.commandLine != nil && config.commandLine.ConfigFile != nil {
			for _, file := range config.commandLine.ConfigFile.ExtendedSourceFiles {
				session.extendedConfigCache.AddOwner(newSnapshot.toPath(file), newSnapshot.id)
			}
		}
	}

	if logger != nil {
		logger.Logf("Finished cloning snapshot %d into snapshot %d for program in %v", s.id, newSnapshot.id, time.Since(start))
	}
	return newSnapshot
}

func (s *Snapshot) processFileChanges(
	fs *snapshotFSBuilder,
	fileChanges FileChangeSummary,
	logger *logging.LogTree,
	contentMapperContributions *ContentMapperContributions,
) FileChangeSummary {
	if fileChanges.HasExcessiveWatchEvents() {
		invalidateStart := time.Now()
		if fileChanges.InvalidateAll {
			fs.invalidateCache()
			if logger != nil {
				logger.Logf("InvalidateAll: invalidated file cache in %v", time.Since(invalidateStart))
			}
		} else if !fs.watchChangesOverlapCache(fileChanges) {
			// All watch changes/deletes are files we haven't seen; should be irrelevant to us (probably an external tool's build or something)
			fileChanges.Changed = collections.Set[lsproto.DocumentUri]{}
			fileChanges.Deleted = collections.Set[lsproto.DocumentUri]{}
		} else if fileChanges.IncludesWatchChangeOutsideNodeModules {
			fs.invalidateCache()
			if logger != nil {
				logger.Logf("Excessive watch changes detected, invalidated file cache in %v", time.Since(invalidateStart))
			}
		} else {
			fs.invalidateNodeModulesCache()
			if logger != nil {
				logger.Logf("npm install detected, invalidated node_modules cache in %v", time.Since(invalidateStart))
			}
		}
	} else {
		var contentMapperExtensions []string
		if contentMapperContributions == nil {
			contentMapperExtensions, _ = s.contentMapperWatchState()
		} else {
			if configuredContentMappers := s.ConfigFileRegistry.contentMappers(); configuredContentMappers != nil {
				contentMapperExtensions = slices.Clone(configuredContentMappers.extensions)
			}
			contentMapperExtensions = append(contentMapperExtensions, contentMapperContributions.Extensions...)
		}
		_, contentMapperWatchedFiles := s.contentMapperWatchState()
		fileChanges = fs.expandAndFilterWatchEvents(fileChanges, contentMapperExtensions, contentMapperWatchedFiles)
		fileChanges = s.fs.expandRealpathAliases(fileChanges)
		fileChanges = fs.markDirtyFiles(fileChanges)
		fileChanges = fs.convertOpenAndCloseToChanges(fileChanges)
	}
	return fileChanges
}

func (s *Snapshot) GetDefaultProject(uri lsproto.DocumentUri) *Project {
	return s.ProjectCollection.GetDefaultProject(uri.Path(s.UseCaseSensitiveFileNames()))
}

func (s *Snapshot) GetProjectsContainingFile(uri lsproto.DocumentUri) []ls.Project {
	fileName := uri.FileName()
	path := s.toPath(fileName)
	// TODO!! sheetal may be change this to handle symlinks!!
	return s.ProjectCollection.GetProjectsContainingFile(path)
}

// OpenProjects returns the projects that contain at least one file open in the editor.
// ReleaseCheckingPool drops the checkers a sweep used on a project. They hold the types of every
// file in it, which is the largest thing a pull creates, and keeping them buys nothing: a pull that
// finds the project unchanged answers from the result ids the client already holds without checking
// anything, and a pull that finds it changed needs new checkers regardless.
func (s *Snapshot) ReleaseCheckingPool(project *Project) bool {
	if project.checkerPool == nil {
		return false
	}
	return project.checkerPool.releaseCheckingPool()
}

func (s *Snapshot) OpenProjects() []*Project {
	var open []*Project
	for _, project := range s.ProjectCollection.Projects() {
		if s.ProjectCollection.isOpen(project) {
			open = append(open, project)
		}
	}
	return open
}

func (s *Snapshot) GetFile(fileName string) FileHandle {
	return s.fs.GetFile(fileName)
}

func (s *Snapshot) LSPLineMap(fileName string) *lsconv.LSPLineMap {
	if file := s.fs.GetFile(fileName); file != nil {
		return file.LSPLineMap()
	}
	return nil
}

func (s *Snapshot) GetECMALineInfo(fileName string) *sourcemap.ECMALineInfo {
	if file := s.fs.GetFile(fileName); file != nil {
		return file.ECMALineInfo()
	}
	return nil
}

func (s *Snapshot) GetPreferences(activeFile string) lsutil.UserPreferences {
	return s.userPreferences
}

func (s *Snapshot) UserPreferences() lsutil.UserPreferences {
	return s.userPreferences
}

func (s *Snapshot) Converters() *lsconv.Converters {
	return s.converters
}

func (s *Snapshot) AutoImportRegistry() *autoimport.Registry {
	return s.AutoImports
}

func (s *Snapshot) ID() uint64 {
	return s.id
}

func (s *Snapshot) UseCaseSensitiveFileNames() bool {
	return s.fs.fs.UseCaseSensitiveFileNames()
}

func (s *Snapshot) ReadFile(fileName string) (string, bool) {
	handle := s.GetFile(fileName)
	if handle == nil {
		return "", false
	}
	return handle.Content(), true
}

func (s *Snapshot) DirectoryExists(path string) bool {
	return s.fs.fs.DirectoryExists(path)
}

func (s *Snapshot) FileExists(path string) bool {
	return s.fs.fs.FileExists(path)
}

func (s *Snapshot) GetDirectories(path string) []string {
	return s.fs.fs.GetAccessibleEntries(path).Directories
}

func (s *Snapshot) ReadDirectory(currentDir string, path string, extensions []string, excludes []string, includes []string, depth int) []string {
	return vfsmatch.ReadDirectory(s.fs.fs, currentDir, path, extensions, excludes, includes, depth)
}

type APISnapshotRequest struct {
	OpenProjects  *collections.Set[string]
	CloseProjects *collections.Set[tspath.Path]
	OpenFiles     *collections.Set[lsproto.DocumentUri]
	CloseFiles    *collections.Set[tspath.Path]
}

type ProjectTreeRequest struct {
	// If null, all project trees need to be loaded, otherwise only those that are referenced
	referencedProjects *collections.Set[tspath.Path]
}

func (p *ProjectTreeRequest) IsAllProjects() bool {
	return p.referencedProjects == nil
}

func (p *ProjectTreeRequest) IsProjectReferenced(projectID tspath.Path) bool {
	return p.referencedProjects.Has(projectID)
}

func (p *ProjectTreeRequest) Projects() []tspath.Path {
	if p.referencedProjects == nil {
		return nil
	}
	return slices.Collect(maps.Keys(p.referencedProjects.Keys()))
}

type ResourceRequest struct {
	// Documents are URIs that were requested by the client.
	// The new snapshot should ensure projects for these URIs have loaded programs.
	Documents []lsproto.DocumentUri
	// ConfiguredProjectDocuments are URIs for which configured projects should be loaded
	// (if disableSolutionSearching/disableReferencedProjectLoad settings allow),
	// but no inferred project should be created if no configured project is found.
	// This is used by cross-project operations like find-all-references.
	ConfiguredProjectDocuments []lsproto.DocumentUri
	// Update requested Projects.
	// this is used when we want to get LS and from all the Projects the file can be part of
	Projects []tspath.Path
	// Update and ensure project trees that reference the projects
	// This is used to compute the solution and project tree so that
	// we can find references across all the projects in the solution irrespective of which project is open
	ProjectTree *ProjectTreeRequest
	// AutoImports is the document URI for which auto imports should be prepared.
	AutoImports lsproto.DocumentUri
}

type SnapshotChange struct {
	ResourceRequest
	reason UpdateReason
	// fileChanges are the changes that have occurred since the last snapshot.
	fileChanges FileChangeSummary
	// compilerOptionsForInferredProjects is the compiler options to use for inferred projects.
	// It should only be set the value in the next snapshot should be changed. If nil, the
	// value from the previous snapshot will be copied to the new snapshot.
	compilerOptionsForInferredProjects *core.CompilerOptions
	contentMapperContributions         *ContentMapperContributions
	newConfig                          *lsutil.UserPreferences
	// ataChanges contains ATA-related changes to apply to projects in the new snapshot.
	ataChanges map[tspath.Path]*ATAStateChange
	apiRequest *APISnapshotRequest
	// cleanDiskCache triggers cleaning of cached disk files not referenced by any open project.
	cleanDiskCache bool
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

func (s *Snapshot) Clone(
	ctx context.Context,
	change SnapshotChange,
	overlays map[tspath.Path]*Overlay,
	session *Session,
) *Snapshot {
	var logger *logging.LogTree

	// Print in-progress logs immediately if cloning fails
	if session.options.LoggingEnabled {
		defer func() {
			if r := recover(); r != nil {
				session.logger.Log(logger.String())
				panic(r)
			}
		}()
	}

	if session.options.LoggingEnabled {
		logger = logging.NewLogTree(fmt.Sprintf("Cloning snapshot %d", s.id))
		getDetails := func() string {
			details := ""
			if len(change.Documents) != 0 {
				details += fmt.Sprintf(" Documents: %v", change.Documents)
			}
			if len(change.ConfiguredProjectDocuments) != 0 {
				details += fmt.Sprintf(" ConfiguredProjectDocuments: %v", change.ConfiguredProjectDocuments)
			}
			if len(change.Projects) != 0 {
				details += fmt.Sprintf(" Projects: %v", change.Projects)
			}
			if change.ProjectTree != nil {
				details += fmt.Sprintf(" ProjectTree: %v", change.ProjectTree.Projects())
			}
			return details
		}
		switch change.reason {
		case UpdateReasonDidOpenFile:
			logger.Logf("Reason: DidOpenFile - %s", change.fileChanges.Opened)
		case UpdateReasonDidCloseFile:
			logger.Logf("Reason: DidCloseFile - %v", change.fileChanges.Closed)
		case UpdateReasonDidChangeCompilerOptionsForInferredProjects:
			logger.Logf("Reason: DidChangeCompilerOptionsForInferredProjects")
		case UpdateReasonRequestedLanguageServicePendingChanges:
			logger.Logf("Reason: RequestedLanguageService (pending file changes) - %v", getDetails())
		case UpdateReasonRequestedLanguageServiceProjectNotLoaded:
			logger.Logf("Reason: RequestedLanguageService (project not loaded) - %v", getDetails())
		case UpdateReasonRequestedLanguageServiceForFileNotOpen:
			logger.Logf("Reason: RequestedLanguageService (file not open) - %v", getDetails())
		case UpdateReasonRequestedLanguageServiceProjectDirty:
			logger.Logf("Reason: RequestedLanguageService (project dirty) - %v", getDetails())
		case UpdateReasonRequestedLoadProjectTree:
			logger.Logf("Reason: RequestedLoadProjectTree - %v", getDetails())
		case UpdateReasonIdleCleanDiskCache:
			logger.Logf("Reason: IdleCleanDiskCache")
		case UpdateReasonDidChangeConfigFile:
			logger.Logf("Reason: DidChangeConfigFile - %v", getDetails())
		case UpdateReasonDidChangeContentMapperContributions:
			logger.Logf("Reason: DidChangeContentMapperContributions - %v", getDetails())
		}
	}

	start := time.Now()
	inferredContentMappers := s.inferredProjectContentMappers
	inferredContentMapperExtensions := s.inferredProjectContentMapperExtensions
	if change.contentMapperContributions != nil {
		inferredContentMappers = change.contentMapperContributions.Mappers
		inferredContentMapperExtensions = change.contentMapperContributions.Extensions
	}
	fs := newSnapshotFSBuilder(session.fs.fs, s.fs.overlays, overlays, s.fs.diskFiles, s.fs.diskDirectories, s.fs.nodeModulesRealpathAliases, session.options.PositionEncoding, s.toPath)
	change.fileChanges = s.processFileChanges(fs, change.fileChanges, logger, change.contentMapperContributions)

	compilerOptionsForInferredProjects := s.compilerOptionsForInferredProjects
	if change.compilerOptionsForInferredProjects != nil {
		compilerOptionsForInferredProjects = change.compilerOptionsForInferredProjects
	}

	// Compute effective customConfigFileName from user preferences
	customConfigFileName := s.ConfigFileRegistry.customConfigFileName
	if change.newConfig != nil {
		customConfigFileName = change.newConfig.CustomConfigFileName
	}

	newSnapshotID := session.snapshotID.Add(1)
	projectCollectionBuilder := newProjectCollectionBuilder(
		ctx,
		newSnapshotID,
		fs,
		s.ProjectCollection,
		s.ConfigFileRegistry,
		s.ProjectCollection.apiState,
		compilerOptionsForInferredProjects,
		inferredContentMappers,
		inferredContentMapperExtensions,
		s.sessionOptions,
		customConfigFileName,
		session.parseCache,
		session.contentMappedParseCache,
		session.extendedConfigCache,
		session.contentMapperHost,
		session.client,
	)

	if len(change.ataChanges) != 0 {
		projectCollectionBuilder.DidUpdateATAState(change.ataChanges, logger.Fork("DidUpdateATAState"))
	}

	projectCollectionBuilder.DidChangeCustomConfigFileName(logger.Fork("DidChangeCustomConfigFileName"))
	if change.compilerOptionsForInferredProjects != nil && projectCollectionBuilder.inferredProject.Value() != nil {
		projectCollectionBuilder.updateInferredProject(
			projectCollectionBuilder.inferredProject.Value().CommandLine.FileNames(),
			change.compilerOptionsForInferredProjects,
			projectCollectionBuilder.inferredProject.Value().CommandLine.ProjectReferences(),
			projectCollectionBuilder.inferredProject.Value().CommandLine.Errors,
			projectCollectionBuilder.inferredProject.Value().CommandLine.ContentMappers(),
			logger.Fork("DidChangeCompilerOptionsForInferredProjects"),
		)
	}
	if change.contentMapperContributions != nil {
		projectCollectionBuilder.DidChangeContentMapperContributions(logger.Fork("DidChangeContentMapperContributions"))
	}
	if change.newConfig != nil {
		projectCollectionBuilder.DidChangeUserPreferences(s.userPreferences, *change.newConfig, logger.Fork("DidChangeUserPreferences"))
	}

	if !change.fileChanges.IsEmpty() {
		projectCollectionBuilder.DidChangeFiles(change.fileChanges, logger.Fork("DidChangeFiles"))
	}

	var apiError error
	if change.apiRequest != nil {
		apiError = projectCollectionBuilder.HandleAPIRequest(change.apiRequest, logger.Fork("HandleAPIRequest"))
	}

	for _, uri := range change.Documents {
		projectCollectionBuilder.DidRequestFile(uri, false /*configuredProjectsOnly*/, logger.Fork("DidRequestFile"))
	}

	for _, uri := range change.ConfiguredProjectDocuments {
		projectCollectionBuilder.DidRequestFile(uri, true /*configuredProjectsOnly*/, logger.Fork("DidRequestFile (optional)"))
	}

	for _, projectId := range change.Projects {
		projectCollectionBuilder.DidRequestProject(projectId, logger.Fork("DidRequestProject"))
	}

	if change.ProjectTree != nil {
		projectCollectionBuilder.DidRequestProjectTrees(change.ProjectTree, logger.Fork("DidRequestProjectTrees"))
	}

	projectCollection, configFileRegistry := projectCollectionBuilder.Finalize(logger)

	projectsWithNewProgramStructure := make(map[tspath.Path]bool)
	for _, project := range projectCollection.Projects() {
		if project.ProgramLastUpdate == newSnapshotID && project.ProgramUpdateKind != ProgramUpdateKindCloned {
			projectsWithNewProgramStructure[project.configFilePath] = project.ProgramUpdateKind == ProgramUpdateKindNewFiles
		}
	}

	// Clean cached disk files not touched by any open project on file open, close, delete,
	// or when explicitly requested (e.g. by an idle timer).
	shouldCleanDiskCache := change.cleanDiskCache ||
		change.fileChanges.Opened != "" ||
		change.fileChanges.Reopened != "" ||
		change.fileChanges.Closed.Len() > 0 ||
		change.fileChanges.Deleted.Len() > 0
	if shouldCleanDiskCache {
		// The set of seen files can change only if a program was constructed (not cloned) during this snapshot.
		// When cleanDiskCache is explicitly set, always attempt cleaning.
		if len(projectsWithNewProgramStructure) > 0 || change.cleanDiskCache {
			cleanFilesStart := time.Now()
			removedFiles := 0
			fs.diskFiles.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) bool {
				for _, project := range projectCollection.Projects() {
					if project.host != nil && project.host.sourceFS.SeenFile(entry.Key()) {
						return true
					}
				}
				entry.Delete()
				removedFiles++
				return true
			})
			if session.options.LoggingEnabled {
				logger.Logf("Removed %d cached file(s) in %v", removedFiles, time.Since(cleanFilesStart))
			}
		}
	}

	config := s.userPreferences
	if change.newConfig != nil {
		config = *change.newConfig
	}

	autoImportHost := newAutoImportRegistryCloneHost(
		projectCollection,
		session.parseCache,
		fs,
		s.sessionOptions.CurrentDirectory,
		s.toPath,
	)
	openFiles := make(map[tspath.Path]string, len(overlays))
	for path, overlay := range overlays {
		openFiles[path] = overlay.FileName()
	}
	prepareAutoImports := tspath.Path("")
	if change.ResourceRequest.AutoImports != "" {
		prepareAutoImports = change.ResourceRequest.AutoImports.Path(s.UseCaseSensitiveFileNames())
	}
	oldAutoImports := s.AutoImports
	if oldAutoImports == nil {
		oldAutoImports = autoimport.NewRegistry(s.toPath, s.userPreferences)
	}
	var autoImportsWatch *WatchedFiles[map[tspath.Path]string]
	autoImports, err := oldAutoImports.Clone(ctx, autoimport.RegistryChange{
		RequestedFile:   prepareAutoImports,
		OpenFiles:       openFiles,
		Changed:         change.fileChanges.Changed,
		Created:         change.fileChanges.Created,
		Deleted:         change.fileChanges.Deleted,
		RebuiltPrograms: projectsWithNewProgramStructure,
		UserPreferences: change.newConfig,
	}, autoImportHost, logger.Fork("UpdateAutoImports"))
	if err == nil {
		autoImportsWatch = s.autoImportsWatch.Clone(autoImports.NodeModulesDirectories())
	}

	snapshotFS, _ := fs.Finalize()
	newSnapshot := NewSnapshot(
		newSnapshotID,
		snapshotFS,
		s.sessionOptions,
		nil,
		compilerOptionsForInferredProjects,
		config,
		autoImports,
		autoImportsWatch,
		s.toPath,
	)
	newSnapshot.parentId = s.id
	newSnapshot.ProjectCollection = projectCollection
	newSnapshot.ConfigFileRegistry = configFileRegistry
	newSnapshot.inferredProjectContentMappers = inferredContentMappers
	newSnapshot.inferredProjectContentMapperExtensions = inferredContentMapperExtensions
	newSnapshot.builderLogs = logger
	newSnapshot.apiError = apiError

	for _, project := range newSnapshot.ProjectCollection.Projects() {
		if project.Program != nil {
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
	}
	for _, config := range newSnapshot.ConfigFileRegistry.configs {
		if config.commandLine != nil && config.commandLine.ConfigFile != nil {
			for _, file := range config.commandLine.ConfigFile.ExtendedSourceFiles {
				session.extendedConfigCache.AddOwner(newSnapshot.toPath(file), newSnapshot.id)
			}
		}
	}

	autoImportHost.Dispose()

	logger.Logf("Finished cloning snapshot %d into snapshot %d in %v", s.id, newSnapshot.id, time.Since(start))
	return newSnapshot
}

// ref increments the snapshot's reference count, preventing it from being
// disposed until a corresponding Deref is called. The snapshot must still
// be alive (refCount > 0) when ref is called. Only the project Session
// should call ref(), and it should be done while holding session.snapshotMu.
func (s *Snapshot) ref() {
	if s.refCount.Add(1) <= 1 {
		panic(fmt.Sprintf("snapshot %d: ref on disposed snapshot, parentId=%d", s.id, s.parentId))
	}
}

// tryRef attempts to increment the snapshot's reference count. If the
// snapshot is already disposed (refCount == 0), it returns false without
// modifying the count. On success the caller must eventually call Deref.
func (s *Snapshot) tryRef() bool {
	for {
		rc := s.refCount.Load()
		if rc <= 0 {
			return false
		}
		if s.refCount.CompareAndSwap(rc, rc+1) {
			return true
		}
	}
}

// Deref decrements the snapshot's reference count. When the count reaches
// zero, the snapshot is disposed and its resources are released.
func (s *Snapshot) Deref(session *Session) {
	rc := s.refCount.Add(-1)
	if rc < 0 {
		panic(fmt.Sprintf("snapshot %d: ref count below zero, parentId=%d", s.id, s.parentId))
	}
	if rc == 0 {
		s.dispose(session)
	}
}

func (s *Snapshot) dispose(session *Session) {
	for _, project := range s.ProjectCollection.Projects() {
		if project.Program != nil && session.programCounter.Deref(project.Program) {
			if contentMapperProject := project.Program.ContentMapperProject(); contentMapperProject != nil {
				_ = contentMapperProject.Close()
			}
			// This program is no longer referenced by any snapshot.
			// Mark its checker pool as discarded so its idle-cleanup timer stops
			// keeping the pool alive, allowing the pool and any idle checkers it
			// still references to be reclaimed when the pool is garbage-collected.
			if project.checkerPool != nil {
				project.checkerPool.Discard()
			}
			for _, file := range project.Program.SourceFiles() {
				if !file.IsContentMapperFailureStub() && !file.IsContentMapperSupplemental() {
					if file.ContentMapper() != "" {
						session.contentMappedParseCache.Deref(contentMappedParseCacheKeyForFile(file))
					} else {
						session.parseCache.Deref(parseCacheKeyForFile(file))
					}
				}
			}
			for _, file := range project.Program.DuplicateSourceFiles() {
				if !file.IsContentMapperFailureStub {
					if file.ContentMapper != "" {
						session.contentMappedParseCache.Deref(contentMappedParseCacheKeyForDuplicate(file))
					} else {
						session.parseCache.Deref(parseCacheKeyForDuplicate(file))
					}
				}
			}
		}
	}
	for _, config := range s.ConfigFileRegistry.configs {
		if config.commandLine != nil {
			for _, file := range config.commandLine.ExtendedSourceFiles() {
				session.extendedConfigCache.Release(session.toPath(file), s.id)
			}
		}
	}
}
