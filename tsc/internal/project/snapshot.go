package project

import (
	"context"
	"fmt"
	"maps"
	"slices"
	"sync/atomic"
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/ls/autoimport"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/ata"
	"github.com/microsoft/typescript-go/internal/project/dirty"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
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
	fs                                 *SnapshotFS
	ProjectCollection                  *ProjectCollection
	ConfigFileRegistry                 *ConfigFileRegistry
	AutoImports                        *autoimport.Registry
	autoImportsWatch                   *WatchedFiles[map[tspath.Path]string]
	compilerOptionsForInferredProjects *core.CompilerOptions
	allUserPreferences                 *lsutil.UserConfig

	builderLogs *logging.LogTree
	apiError    error
}

// NewSnapshot
func NewSnapshot(
	id uint64,
	fs *SnapshotFS,
	sessionOptions *SessionOptions,
	configFileRegistry *ConfigFileRegistry,
	compilerOptionsForInferredProjects *core.CompilerOptions,
	allUserPreferences *lsutil.UserConfig,
	autoImports *autoimport.Registry,
	autoImportsWatch *WatchedFiles[map[tspath.Path]string],
	toPath func(fileName string) tspath.Path,
) *Snapshot {
	if allUserPreferences == nil {
		allUserPreferences = lsutil.NewUserConfig(nil) // disallow nil config
	}
	s := &Snapshot{
		id: id,

		sessionOptions: sessionOptions,
		toPath:         toPath,

		fs:                                 fs,
		ConfigFileRegistry:                 configFileRegistry,
		ProjectCollection:                  &ProjectCollection{toPath: toPath},
		compilerOptionsForInferredProjects: compilerOptionsForInferredProjects,
		allUserPreferences:                 allUserPreferences,
		AutoImports:                        autoImports,
		autoImportsWatch:                   autoImportsWatch,
	}
	s.converters = lsconv.NewConverters(s.sessionOptions.PositionEncoding, s.LSPLineMap)
	s.refCount.Store(1)
	return s
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

func (s *Snapshot) GetPreferences(activeFile string) *lsutil.UserPreferences {
	return s.allUserPreferences.GetPreferences(activeFile)
}

func (s *Snapshot) UserPreferences() *lsutil.UserPreferences {
	// returns `ts`
	if s.allUserPreferences.TS() != nil {
		return s.allUserPreferences.TS()
	}
	return lsutil.NewDefaultUserPreferences()
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

func (s *Snapshot) GetDirectories(path string) []string {
	return s.fs.fs.GetAccessibleEntries(path).Directories
}

func (s *Snapshot) ReadDirectory(currentDir string, path string, extensions []string, excludes []string, includes []string, depth *int) []string {
	return vfs.ReadDirectory(s.fs.fs, currentDir, path, extensions, excludes, includes, depth)
}

type APISnapshotRequest struct {
	OpenProjects  *collections.Set[string]
	CloseProjects *collections.Set[tspath.Path]
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
	// If the requested Documents are not open, ensure that their default project is created
	Documents []lsproto.DocumentUri
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
	newConfig                          *lsutil.UserConfig
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

func (s *Snapshot) Clone(ctx context.Context, change SnapshotChange, overlays map[tspath.Path]*Overlay, session *Session) *Snapshot {
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
		}
	}

	start := time.Now()
	fs := newSnapshotFSBuilder(session.fs.fs, s.fs.overlays, overlays, s.fs.diskFiles, s.fs.diskDirectories, session.options.PositionEncoding, s.toPath)
	if change.fileChanges.HasExcessiveWatchEvents() {
		invalidateStart := time.Now()
		if change.fileChanges.InvalidateAll {
			fs.invalidateCache()
			logger.Logf("InvalidateAll: invalidated file cache in %v", time.Since(invalidateStart))
		} else if !fs.watchChangesOverlapCache(change.fileChanges) {
			// All watch changes/deletes are files we haven't seen; should be irrelevant to us (probably an external tool's build or something)
			change.fileChanges.Changed = collections.Set[lsproto.DocumentUri]{}
			change.fileChanges.Deleted = collections.Set[lsproto.DocumentUri]{}
		} else if change.fileChanges.IncludesWatchChangeOutsideNodeModules {
			fs.invalidateCache()
			logger.Logf("Excessive watch changes detected, invalidated file cache in %v", time.Since(invalidateStart))
		} else {
			fs.invalidateNodeModulesCache()
			logger.Logf("npm install detected, invalidated node_modules cache in %v", time.Since(invalidateStart))
		}
	} else {
		fs.markDirtyFiles(change.fileChanges)
		change.fileChanges = fs.convertOpenAndCloseToChanges(change.fileChanges)
	}

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

	if len(change.ataChanges) != 0 {
		projectCollectionBuilder.DidUpdateATAState(change.ataChanges, logger.Fork("DidUpdateATAState"))
	}

	if !change.fileChanges.IsEmpty() {
		projectCollectionBuilder.DidChangeFiles(change.fileChanges, logger.Fork("DidChangeFiles"))
	}

	var apiError error
	if change.apiRequest != nil {
		apiError = projectCollectionBuilder.HandleAPIRequest(change.apiRequest, logger.Fork("HandleAPIRequest"))
	}

	for _, uri := range change.Documents {
		projectCollectionBuilder.DidRequestFile(uri, logger.Fork("DidRequestFile"))
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

	// Clean cached disk files not touched by any open project. It's not important that we do this on
	// file open specifically, but we don't need to do it on every snapshot clone.
	if change.fileChanges.Opened != "" || change.fileChanges.Reopened != "" {
		// The set of seen files can change only if a program was constructed (not cloned) during this snapshot.
		if len(projectsWithNewProgramStructure) > 0 {
			cleanFilesStart := time.Now()
			removedFiles := 0
			fs.diskFiles.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *diskFile]) bool {
				for _, project := range projectCollection.Projects() {
					if project.host != nil && project.host.sourceFS.Seen(entry.Key()) {
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

	config := s.allUserPreferences
	if change.newConfig != nil {
		config = config.Merge(change.newConfig)
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
		oldAutoImports = autoimport.NewRegistry(s.toPath, s.allUserPreferences.GetPreferences(string(prepareAutoImports)))
	}
	var autoImportsWatch *WatchedFiles[map[tspath.Path]string]
	autoImports, err := oldAutoImports.Clone(ctx, autoimport.RegistryChange{
		RequestedFile:   prepareAutoImports,
		OpenFiles:       openFiles,
		Changed:         change.fileChanges.Changed,
		Created:         change.fileChanges.Created,
		Deleted:         change.fileChanges.Deleted,
		RebuiltPrograms: projectsWithNewProgramStructure,
		UserPreferences: config.GetPreferences(string(prepareAutoImports)),
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
	newSnapshot.builderLogs = logger
	newSnapshot.apiError = apiError

	for _, project := range newSnapshot.ProjectCollection.Projects() {
		session.programCounter.Ref(project.Program)
		if project.ProgramLastUpdate == newSnapshotID {
			// Only ref source files when the program was created/updated in this snapshot.
			// This matches dispose, which only derefs when programCounter reaches zero.
			if project.Program != nil {
				for _, file := range project.Program.SourceFiles() {
					session.parseCache.Ref(NewParseCacheKey(file.ParseOptions(), file.Hash, file.ScriptKind))
				}
			}
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
	for _, config := range newSnapshot.ConfigFileRegistry.configs {
		if config.commandLine != nil && config.commandLine.ConfigFile != nil {
			for _, file := range config.commandLine.ConfigFile.ExtendedSourceFiles {
				session.extendedConfigCache.Ref(newSnapshot.toPath(file))
			}
		}
	}

	autoImportHost.Dispose()

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
				session.parseCache.Deref(NewParseCacheKey(file.ParseOptions(), file.Hash, file.ScriptKind))
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
