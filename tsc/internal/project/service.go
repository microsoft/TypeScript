package project

import (
	"context"
	"errors"
	"fmt"
	"maps"
	"runtime"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type projectLoadKind int

const (
	// Project is not created or updated, only looked up in cache
	projectLoadKindFind projectLoadKind = iota
	// Project is created and then its graph is updated
	projectLoadKindCreate
)

type ServiceOptions struct {
	TypingsInstallerOptions
	Logger           *Logger
	PositionEncoding lsproto.PositionEncodingKind
	WatchEnabled     bool

	ParsedFileCache ParsedFileCache
}

var _ ProjectHost = (*Service)(nil)

type Service struct {
	host                ServiceHost
	options             ServiceOptions
	comparePathsOptions tspath.ComparePathsOptions
	converters          *ls.Converters

	projectsMu         sync.RWMutex
	configuredProjects map[tspath.Path]*Project
	// inferredProjects is the list of all inferred projects, including the unrootedInferredProject
	// if it exists
	inferredProjects map[tspath.Path]*Project

	documentStore          *DocumentStore
	openFiles              map[tspath.Path]string // values are projectRootPath, if provided
	configFileForOpenFiles map[tspath.Path]string // default config project for open files !!! todo solution and project reference handling
	defaultProjectFinder   *defaultProjectFinder
	configFileRegistry     *ConfigFileRegistry

	typingsInstaller *TypingsInstaller

	compilerOptionsForInferredProjects *core.CompilerOptions
}

func NewService(host ServiceHost, options ServiceOptions) *Service {
	options.Logger.Info(fmt.Sprintf("currentDirectory:: %s useCaseSensitiveFileNames:: %t", host.GetCurrentDirectory(), host.FS().UseCaseSensitiveFileNames()))
	options.Logger.Info("libs Location:: " + host.DefaultLibraryPath())
	options.Logger.Info("globalTypingsCacheLocation:: " + host.TypingsLocation())
	service := &Service{
		host:    host,
		options: options,
		comparePathsOptions: tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		},

		configuredProjects: make(map[tspath.Path]*Project),
		inferredProjects:   make(map[tspath.Path]*Project),

		documentStore: NewDocumentStore(DocumentStoreOptions{
			ComparePathsOptions: tspath.ComparePathsOptions{
				UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
				CurrentDirectory:          host.GetCurrentDirectory(),
			},
			ParsedFileCache: options.ParsedFileCache,
		}),
		openFiles:              make(map[tspath.Path]string),
		configFileForOpenFiles: make(map[tspath.Path]string),
	}
	service.defaultProjectFinder = &defaultProjectFinder{
		service:                         service,
		configFileForOpenFiles:          make(map[tspath.Path]string),
		configFilesAncestorForOpenFiles: make(map[tspath.Path]map[string]string),
	}
	service.configFileRegistry = &ConfigFileRegistry{
		Host:                 service,
		defaultProjectFinder: service.defaultProjectFinder,
	}
	service.converters = ls.NewConverters(options.PositionEncoding, func(fileName string) *ls.LineMap {
		return service.GetScriptInfo(fileName).LineMap()
	})

	return service
}

// GetCurrentDirectory implements ProjectHost.
func (s *Service) GetCurrentDirectory() string {
	return s.host.GetCurrentDirectory()
}

// Log implements ProjectHost.
func (s *Service) Log(msg string) {
	s.options.Logger.Info(msg)
}

func (s *Service) Trace(msg string) {
	s.Log(msg)
}

func (s *Service) HasLevel(level LogLevel) bool {
	return s.options.Logger.HasLevel(level)
}

// NewLine implements ProjectHost.
func (s *Service) NewLine() string {
	return s.host.NewLine()
}

// DefaultLibraryPath implements ProjectHost.
func (s *Service) DefaultLibraryPath() string {
	return s.host.DefaultLibraryPath()
}

// TypingsInstaller implements ProjectHost.
func (s *Service) TypingsInstaller() *TypingsInstaller {
	if s.typingsInstaller != nil {
		return s.typingsInstaller
	}

	if typingsLocation := s.host.TypingsLocation(); typingsLocation != "" {
		s.typingsInstaller = &TypingsInstaller{
			TypingsLocation: typingsLocation,
			options:         &s.options.TypingsInstallerOptions,
		}
	}
	return s.typingsInstaller
}

// DocumentRegistry implements ProjectHost.
func (s *Service) DocumentRegistry() *DocumentRegistry {
	return s.documentStore.DocumentRegistry()
}

// ConfigFileRegistry implements ProjectHost.
func (s *Service) ConfigFileRegistry() *ConfigFileRegistry {
	return s.configFileRegistry
}

// FS implements ProjectHost.
func (s *Service) FS() vfs.FS {
	return s.host.FS()
}

// GetOrCreateScriptInfoForFile implements ProjectHost.
func (s *Service) GetOrCreateScriptInfoForFile(fileName string, path tspath.Path, scriptKind core.ScriptKind) *ScriptInfo {
	return s.getOrCreateScriptInfoNotOpenedByClient(fileName, path, scriptKind)
}

// PositionEncoding implements ProjectHost.
func (s *Service) PositionEncoding() lsproto.PositionEncodingKind {
	return s.options.PositionEncoding
}

// Client implements ProjectHost.
func (s *Service) Client() Client {
	return s.host.Client()
}

// IsWatchEnabled implements ProjectHost.
func (s *Service) IsWatchEnabled() bool {
	return s.options.WatchEnabled
}

func (s *Service) Projects() []*Project {
	s.projectsMu.RLock()
	defer s.projectsMu.RUnlock()
	projects := make([]*Project, 0, len(s.configuredProjects)+len(s.inferredProjects))
	for _, project := range s.configuredProjects {
		projects = append(projects, project)
	}
	for _, project := range s.inferredProjects {
		projects = append(projects, project)
	}
	return projects
}

func (s *Service) ConfiguredProject(path tspath.Path) *Project {
	s.projectsMu.RLock()
	defer s.projectsMu.RUnlock()
	if project, ok := s.configuredProjects[path]; ok {
		return project
	}
	return nil
}

func (s *Service) InferredProject(rootPath tspath.Path) *Project {
	s.projectsMu.RLock()
	defer s.projectsMu.RUnlock()
	if project, ok := s.inferredProjects[rootPath]; ok {
		return project
	}
	return nil
}

func (s *Service) GetScriptInfo(fileName string) *ScriptInfo {
	return s.GetScriptInfoByPath(s.toPath(fileName))
}

func (s *Service) GetScriptInfoByPath(path tspath.Path) *ScriptInfo {
	return s.documentStore.GetScriptInfoByPath(path)
}

func (s *Service) isOpenFile(info *ScriptInfo) bool {
	_, ok := s.openFiles[info.path]
	return ok
}

func (s *Service) OpenFile(fileName string, fileContent string, scriptKind core.ScriptKind, projectRootPath string) {
	path := s.toPath(fileName)
	existing := s.GetScriptInfoByPath(path)
	info := s.getOrCreateOpenScriptInfo(fileName, path, fileContent, scriptKind, projectRootPath)
	if existing == nil && info != nil && !info.isDynamic {
		// Invoke wild card directory watcher to ensure that the file presence is reflected
		s.configFileRegistry.tryInvokeWildCardDirectories(fileName, info.path)
	}
	result := s.assignProjectToOpenedScriptInfo(info)
	s.cleanupProjectsAndScriptInfos(info, result)
	s.printMemoryUsage()
	s.printProjects()
}

func (s *Service) ChangeFile(document lsproto.VersionedTextDocumentIdentifier, changes []lsproto.TextDocumentContentChangeEvent) error {
	fileName := ls.DocumentURIToFileName(document.Uri)
	path := s.toPath(fileName)
	scriptInfo := s.GetScriptInfoByPath(path)
	if scriptInfo == nil {
		return fmt.Errorf("file %s not found", fileName)
	}

	textChanges := make([]core.TextChange, len(changes))
	for i, change := range changes {
		if partialChange := change.TextDocumentContentChangePartial; partialChange != nil {
			textChanges[i] = s.converters.FromLSPTextChange(scriptInfo, partialChange)
		} else if wholeChange := change.TextDocumentContentChangeWholeDocument; wholeChange != nil {
			textChanges[i] = core.TextChange{
				TextRange: core.NewTextRange(0, len(scriptInfo.Text())),
				NewText:   wholeChange.Text,
			}
		} else {
			return errors.New("invalid change type")
		}
	}

	s.applyChangesToFile(scriptInfo, textChanges)
	return nil
}

func (s *Service) CloseFile(fileName string) {
	if info := s.GetScriptInfoByPath(s.toPath(fileName)); info != nil {
		fileExists := !info.isDynamic && s.host.FS().FileExists(info.fileName)
		info.close(fileExists)
		delete(s.openFiles, info.path)
		delete(s.defaultProjectFinder.configFileForOpenFiles, info.path)
		delete(s.defaultProjectFinder.configFilesAncestorForOpenFiles, info.path)
		s.configFileRegistry.releaseConfigsForInfo(info)
		if !fileExists {
			s.handleDeletedFile(info, false /*deferredDelete*/)
		}
	}
}

func (s *Service) MarkFileSaved(fileName string, text string) {
	if info := s.GetScriptInfoByPath(s.toPath(fileName)); info != nil {
		info.SetTextFromDisk(text)
	}
}

func (s *Service) EnsureDefaultProjectForURI(url lsproto.DocumentUri) *Project {
	_, project := s.EnsureDefaultProjectForFile(ls.DocumentURIToFileName(url))
	return project
}

func (s *Service) EnsureDefaultProjectForFile(fileName string) (*ScriptInfo, *Project) {
	path := s.toPath(fileName)
	if info := s.GetScriptInfoByPath(path); info != nil && !info.isOrphan() {
		if project := s.getDefaultProjectForScript(info); project != nil {
			return info, project
		}
	}
	s.ensureProjectStructureUpToDate()
	if info := s.GetScriptInfoByPath(path); info != nil {
		if project := s.getDefaultProjectForScript(info); project != nil {
			return info, project
		}
	}
	panic("project not found")
}

func (s *Service) Close() {
	s.options.Logger.Close()
}

// SourceFileCount should only be used for testing.
func (s *Service) SourceFileCount() int {
	return s.documentStore.SourceFileCount()
}

func (s *Service) OnWatchedFilesChanged(ctx context.Context, changes []*lsproto.FileEvent) error {
	s.projectsMu.RLock()
	defer s.projectsMu.RUnlock()
	for _, change := range changes {
		fileName := ls.DocumentURIToFileName(change.Uri)
		path := s.toPath(fileName)
		if err, ok := s.configFileRegistry.onWatchedFilesChanged(path, change.Type); ok {
			if err != nil {
				return fmt.Errorf("error handling config file change: %w", err)
			}
		} else if _, ok := s.openFiles[path]; ok {
			// open file
			continue
		} else if info := s.GetScriptInfoByPath(path); info != nil {
			// closed existing file
			if change.Type == lsproto.FileChangeTypeDeleted {
				s.handleDeletedFile(info, true /*deferredDelete*/)
			} else {
				info.deferredDelete = false
				info.delayReloadNonMixedContentFile()
				// !!! s.delayUpdateProjectGraphs(info.containingProjects, false /*clearSourceMapperCache*/)
				// !!! s.handleSourceMapProjects(info)
			}
		} else {
			for _, project := range s.configuredProjects {
				project.onWatchEventForNilScriptInfo(fileName)
			}
			for _, project := range s.inferredProjects {
				project.onWatchEventForNilScriptInfo(fileName)
			}
			s.configFileRegistry.tryInvokeWildCardDirectories(fileName, path)
		}
	}

	client := s.host.Client()
	if client != nil {
		return client.RefreshDiagnostics(ctx)
	}

	return nil
}

func (s *Service) ensureProjectStructureUpToDate() {
	var hasChanges bool
	s.projectsMu.RLock()
	for _, project := range s.configuredProjects {
		_, updated := project.updateGraph()
		hasChanges = updated || hasChanges
	}
	for _, project := range s.inferredProjects {
		_, updated := project.updateGraph()
		hasChanges = updated || hasChanges
	}
	s.projectsMu.RUnlock()
	if hasChanges {
		s.ensureProjectForOpenFiles()
	}
}

func (s *Service) ensureProjectForOpenFiles() {
	s.Log("Before ensureProjectForOpenFiles:")
	s.printProjects()

	for filePath, projectRootPath := range s.openFiles {
		info := s.GetScriptInfoByPath(filePath)
		if info == nil {
			panic("scriptInfo not found for open file")
		}
		if info.isOrphan() {
			s.assignOrphanScriptInfoToInferredProject(info, projectRootPath)
		} else {
			// !!! s.removeRootOfInferredProjectIfNowPartOfOtherProject(info)
		}
	}
	s.projectsMu.RLock()
	for _, project := range s.inferredProjects {
		project.updateGraph()
	}
	s.projectsMu.RUnlock()

	s.Log("After ensureProjectForOpenFiles:")
	s.printProjects()
}

func (s *Service) applyChangesToFile(info *ScriptInfo, changes []core.TextChange) {
	for _, change := range changes {
		info.editContent(change)
	}
}

func (s *Service) handleDeletedFile(info *ScriptInfo, deferredDelete bool) {
	if s.isOpenFile(info) {
		panic("cannot delete an open file")
	}

	// !!!
	// s.handleSourceMapProjects(info)
	containingProjects := info.ContainingProjects()
	info.detachAllProjects()
	if deferredDelete {
		info.delayReloadNonMixedContentFile()
		info.deferredDelete = true
	} else {
		s.deleteScriptInfo(info)
	}
	s.updateProjectGraphs(containingProjects, false /*clearSourceMapperCache*/)
}

func (s *Service) deleteScriptInfo(info *ScriptInfo) {
	if s.isOpenFile(info) {
		panic("cannot delete an open file")
	}
	s.deleteScriptInfoLocked(info)
}

func (s *Service) deleteScriptInfoLocked(info *ScriptInfo) {
	s.documentStore.DeleteScriptInfo(info)
	// !!! closeSourceMapFileWatcher
}

func (s *Service) OnDiscoveredSymlink(info *ScriptInfo) {
	s.documentStore.AddRealpathMapping(info)
}

func (s *Service) updateProjectGraphs(projects []*Project, clearSourceMapperCache bool) {
	for _, project := range projects {
		if clearSourceMapperCache {
			project.clearSourceMapperCache()
		}
		project.markAsDirty()
	}
}

func (s *Service) getOrCreateScriptInfoNotOpenedByClient(fileName string, path tspath.Path, scriptKind core.ScriptKind) *ScriptInfo {
	return s.getOrCreateScriptInfoWorker(fileName, path, scriptKind, false /*openedByClient*/, "" /*fileContent*/, false /*deferredDeleteOk*/)
}

func (s *Service) getOrCreateOpenScriptInfo(fileName string, path tspath.Path, fileContent string, scriptKind core.ScriptKind, projectRootPath string) *ScriptInfo {
	info := s.getOrCreateScriptInfoWorker(fileName, path, scriptKind, true /*openedByClient*/, fileContent, true /*deferredDeleteOk*/)
	s.openFiles[info.path] = projectRootPath
	return info
}

func (s *Service) getOrCreateScriptInfoWorker(fileName string, path tspath.Path, scriptKind core.ScriptKind, openedByClient bool, fileContent string, deferredDeleteOk bool) *ScriptInfo {
	return s.documentStore.getOrCreateScriptInfoWorker(fileName, path, scriptKind, openedByClient, fileContent, deferredDeleteOk, s.host.FS())
}

func (s *Service) createConfiguredProject(configFileName string, configFilePath tspath.Path) *Project {
	s.projectsMu.Lock()
	defer s.projectsMu.Unlock()

	// !!! config file existence cache stuff omitted
	project := NewConfiguredProject(configFileName, configFilePath, s)
	s.configuredProjects[configFilePath] = project
	// !!!
	// s.createConfigFileWatcherForParsedConfig(configFileName, configFilePath, project)
	return project
}

func (s *Service) assignProjectToOpenedScriptInfo(info *ScriptInfo) *openScriptInfoProjectResult {
	// !!! todo retain projects list when its multiple projects that are looked up
	result := s.defaultProjectFinder.tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(info, projectLoadKindCreate)

	for _, project := range info.ContainingProjects() {
		project.updateGraph()
	}
	if info.isOrphan() {
		// !!!
		// more new "optimized" stuff
		if projectRootDirectory, ok := s.openFiles[info.path]; ok {
			s.assignOrphanScriptInfoToInferredProject(info, projectRootDirectory)
		} else {
			panic("opened script info should be in openFiles map")
		}
	}
	return result
}

func (s *Service) cleanupProjectsAndScriptInfos(openInfo *ScriptInfo, retainedByOpenFile *openScriptInfoProjectResult) {
	// This was postponed from closeOpenFile to after opening next file,
	// so that we can reuse the project if we need to right away
	// Remove all the non marked projects
	s.cleanupConfiguredProjects(openInfo, retainedByOpenFile)

	// Remove orphan inferred projects now that we have reused projects
	// We need to create a duplicate because we cant guarantee order after removal
	s.projectsMu.RLock()
	inferredProjects := maps.Clone(s.inferredProjects)
	s.projectsMu.RUnlock()
	for _, inferredProject := range inferredProjects {
		if inferredProject.isOrphan() {
			s.removeProject(inferredProject)
		}
	}

	// Delete the orphan files here because there might be orphan script infos (which are not part of project)
	// when some file/s were closed which resulted in project removal.
	// It was then postponed to cleanup these script infos so that they can be reused if
	// the file from that old project is reopened because of opening file from here.
	s.removeOrphanScriptInfos()
}

func (s *Service) cleanupConfiguredProjects(openInfo *ScriptInfo, retainedByOpenFile *openScriptInfoProjectResult) {
	s.projectsMu.RLock()
	toRemoveProjects := maps.Clone(s.configuredProjects)
	s.projectsMu.RUnlock()

	toRemoveConfigs := s.configFileRegistry.ConfigFiles.ToMap()

	// !!! handle declarationMap
	retainConfiguredProject := func(r *openScriptInfoProjectResult) {
		if r == nil {
			return
		}
		r.seenProjects.Range(func(project *Project, _ projectLoadKind) bool {
			delete(toRemoveProjects, project.configFilePath)
			return true
		})
		r.seenConfigs.Range(func(config tspath.Path, _ projectLoadKind) bool {
			delete(toRemoveConfigs, config)
			return true
		})
		// // Keep original projects used
		// markOriginalProjectsAsUsed(project);
		// // Keep all the references alive
		// forEachReferencedProject(project, retainConfiguredProject);
	}

	if retainedByOpenFile != nil {
		retainConfiguredProject(retainedByOpenFile)
	}

	// Everything needs to be retained, fast path to skip all the work
	if len(toRemoveProjects) != 0 {
		// Retain default configured project for open script info
		for path := range s.openFiles {
			if path == openInfo.path {
				continue
			}
			info := s.GetScriptInfoByPath(path)
			// We want to retain the projects for open file if they are pending updates so deferredClosed projects are ok
			result := s.defaultProjectFinder.tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
				info,
				projectLoadKindFind,
			)
			retainConfiguredProject(result)
			// Everything needs to be retained, fast path to skip all the work
			if len(toRemoveProjects) == 0 {
				break
			}
		}
	}
	for _, project := range toRemoveProjects {
		s.removeProject(project)
	}
	s.configFileRegistry.cleanup(toRemoveConfigs)
}

func (s *Service) removeProject(project *Project) {
	s.Log("remove Project:: " + project.name)
	s.Log(project.print( /*writeProjectFileNames*/ true /*writeFileExplaination*/, true /*writeFileVersionAndText*/, false, &strings.Builder{}))
	s.projectsMu.Lock()
	switch project.kind {
	case KindConfigured:
		delete(s.configuredProjects, project.configFilePath)
	case KindInferred:
		delete(s.inferredProjects, project.rootPath)
	}
	s.projectsMu.Unlock()
	project.Close()
}

func (s *Service) removeOrphanScriptInfos() {
	// Get all script infos from document store
	scriptInfos := make(map[tspath.Path]*ScriptInfo)
	s.documentStore.ForEachScriptInfo(func(info *ScriptInfo) {
		scriptInfos[info.path] = info
	})

	toRemoveScriptInfos := maps.Clone(scriptInfos)

	for _, info := range scriptInfos {
		if info.deferredDelete {
			continue
		}

		// If script info is not open and orphan, remove it
		if !s.isOpenFile(info) &&
			info.isOrphan() &&
			// !scriptInfoIsContainedByBackgroundProject(info) &&
			!info.containedByDeferredClosedProject() {
			// !!! dts map related infos and code
			continue
		}
		// Retain this script info
		delete(toRemoveScriptInfos, info.path)
	}

	// if there are not projects that include this script info - delete it
	for _, info := range toRemoveScriptInfos {
		s.deleteScriptInfoLocked(info)
	}
}

func (s *Service) assignOrphanScriptInfoToInferredProject(info *ScriptInfo, projectRootDirectory string) *Project {
	if !info.isOrphan() {
		panic("scriptInfo is not orphan")
	}

	project := s.getOrCreateInferredProjectForProjectRootPath(info, projectRootDirectory)
	project.AddInferredProjectRoot(info)
	project.updateGraph()
	return project
	// !!! old code ensures that scriptInfo is only part of one project
}

func (s *Service) getOrCreateInferredProjectForProjectRootPath(info *ScriptInfo, projectRootDirectory string) *Project {
	project := s.getInferredProjectForProjectRootPath(info, projectRootDirectory)
	if project != nil {
		return project
	}
	if projectRootDirectory != "" {
		return s.createInferredProject(projectRootDirectory, s.toPath(projectRootDirectory))
	}
	return s.createInferredProject(s.host.GetCurrentDirectory(), "")
}

func (s *Service) getInferredProjectForProjectRootPath(info *ScriptInfo, projectRootDirectory string) *Project {
	s.projectsMu.RLock()
	defer s.projectsMu.RUnlock()
	if projectRootDirectory != "" {
		projectRootPath := s.toPath(projectRootDirectory)
		if project, ok := s.inferredProjects[projectRootPath]; ok {
			return project
		}
		return nil
	}

	if !info.isDynamic {
		var bestMatch *Project
		for _, project := range s.inferredProjects {
			if project.rootPath != "" &&
				tspath.ContainsPath(string(project.rootPath), string(info.path), s.comparePathsOptions) &&
				(bestMatch == nil || len(bestMatch.rootPath) <= len(project.rootPath)) {
				bestMatch = project
			}
		}

		if bestMatch != nil {
			return bestMatch
		}
	}

	// unrooted inferred project if no best match found
	if unrootedProject, ok := s.inferredProjects[""]; ok {
		return unrootedProject
	}
	return nil
}

func (s *Service) getDefaultProjectForScript(scriptInfo *ScriptInfo) *Project {
	containingProjects := scriptInfo.ContainingProjects()
	switch len(containingProjects) {
	case 0:
		return nil
	case 1:
		project := containingProjects[0]
		if project.deferredClose || project.kind == KindAutoImportProvider || project.kind == KindAuxiliary {
			return nil
		}
		return project
	default:
		// If this file belongs to multiple projects, below is the order in which default project is used
		// - first external project
		// - for open script info, its default configured project during opening is default if info is part of it
		// - first configured project of which script info is not a source of project reference redirect
		// - first configured project
		// - first inferred project
		var firstConfiguredProject *Project
		var firstInferredProject *Project
		var firstNonSourceOfProjectReferenceRedirect *Project
		var defaultConfiguredProject *Project

		for index, project := range containingProjects {
			if project.kind == KindConfigured {
				if project.deferredClose {
					continue
				}
				if !project.isSourceFromProjectReference(scriptInfo) {
					if defaultConfiguredProject == nil && index != len(containingProjects)-1 {
						defaultConfiguredProject = s.defaultProjectFinder.findDefaultConfiguredProject(scriptInfo)
					}
					if defaultConfiguredProject == project {
						return project
					}
					if firstNonSourceOfProjectReferenceRedirect == nil {
						firstNonSourceOfProjectReferenceRedirect = project
					}
				}
				if firstConfiguredProject == nil {
					firstConfiguredProject = project
				}
			} else if firstInferredProject == nil && project.kind == KindInferred {
				firstInferredProject = project
			}
		}
		if defaultConfiguredProject != nil {
			return defaultConfiguredProject
		}
		if firstNonSourceOfProjectReferenceRedirect != nil {
			return firstNonSourceOfProjectReferenceRedirect
		}
		if firstConfiguredProject != nil {
			return firstConfiguredProject
		}
		if firstInferredProject != nil {
			return firstInferredProject
		}
	}
	return nil
}

func (s *Service) createInferredProject(currentDirectory string, projectRootPath tspath.Path) *Project {
	s.projectsMu.Lock()
	defer s.projectsMu.Unlock()
	if existingProject, ok := s.inferredProjects[projectRootPath]; ok {
		return existingProject
	}

	compilerOptions := s.compilerOptionsForInferredProjects
	if compilerOptions == nil {
		compilerOptions = &core.CompilerOptions{
			AllowJs:                    core.TSTrue,
			Module:                     core.ModuleKindESNext,
			ModuleResolution:           core.ModuleResolutionKindBundler,
			Target:                     core.ScriptTargetES2022,
			Jsx:                        core.JsxEmitReactJSX,
			AllowImportingTsExtensions: core.TSTrue,
			StrictNullChecks:           core.TSTrue,
			StrictFunctionTypes:        core.TSTrue,
			SourceMap:                  core.TSTrue,
			ESModuleInterop:            core.TSTrue,
			AllowNonTsExtensions:       core.TSTrue,
			ResolveJsonModule:          core.TSTrue,
		}
	}
	project := NewInferredProject(compilerOptions, currentDirectory, projectRootPath, s)
	s.inferredProjects[project.rootPath] = project
	return project
}

func (s *Service) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, s.host.GetCurrentDirectory(), s.host.FS().UseCaseSensitiveFileNames())
}

func (s *Service) printProjects() {
	if !s.options.Logger.HasLevel(LogLevelNormal) {
		return
	}

	var builder strings.Builder
	s.projectsMu.RLock()
	for _, project := range s.configuredProjects {
		project.print(false /*writeFileNames*/, false /*writeFileExpanation*/, false /*writeFileVersionAndText*/, &builder)
		builder.WriteRune('\n')
	}
	for _, project := range s.inferredProjects {
		project.print(false /*writeFileNames*/, false /*writeFileExpanation*/, false /*writeFileVersionAndText*/, &builder)
		builder.WriteRune('\n')
	}
	s.projectsMu.RUnlock()

	builder.WriteString("Open files:")
	for path, projectRootPath := range s.openFiles {
		info := s.GetScriptInfoByPath(path)
		builder.WriteString(fmt.Sprintf("\n\tFileName: %s ProjectRootPath: %s", info.fileName, projectRootPath))
		builder.WriteString("\n\t\tProjects: " + strings.Join(core.Map(info.ContainingProjects(), func(project *Project) string { return project.name }), ", "))
	}
	builder.WriteString("\n" + hr)
	s.Log(builder.String())
}

func (s *Service) logf(format string, args ...any) {
	s.Log(fmt.Sprintf(format, args...))
}

func (s *Service) printMemoryUsage() {
	runtime.GC() // Force garbage collection to get accurate memory stats
	var memStats runtime.MemStats
	runtime.ReadMemStats(&memStats)
	s.logf("MemoryStats:\n\tAlloc: %v KB\n\tSys: %v KB\n\tNumGC: %v", memStats.Alloc/1024, memStats.Sys/1024, memStats.NumGC)
}

// !!! per root compiler options
func (s *Service) SetCompilerOptionsForInferredProjects(compilerOptions *core.CompilerOptions) {
	s.compilerOptionsForInferredProjects = compilerOptions

	// !!! set compiler options for all inferred projects
	// for _, project := range s.inferredProjects {
	// 	project.SetCompilerOptions(compilerOptions)
	// }
}
