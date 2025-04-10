package project

import (
	"fmt"
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
	projectLoadKindFind projectLoadKind = iota
	projectLoadKindCreateReplay
	projectLoadKindCreate
	projectLoadKindReload
)

type assignProjectResult struct {
	configFileName string
	retainProjects map[*Project]projectLoadKind
	// configFileErrors []*ast.Diagnostic
}

type ServiceOptions struct {
	Logger           *Logger
	PositionEncoding lsproto.PositionEncodingKind
}

var _ ProjectHost = (*Service)(nil)

type Service struct {
	host                ServiceHost
	options             ServiceOptions
	comparePathsOptions tspath.ComparePathsOptions

	configuredProjects map[tspath.Path]*Project
	// unrootedInferredProject is the inferred project for files opened without a projectRootDirectory
	// (e.g. dynamic files)
	unrootedInferredProject *Project
	// inferredProjects is the list of all inferred projects, including the unrootedInferredProject
	// if it exists
	inferredProjects []*Project

	documentRegistry *DocumentRegistry
	scriptInfosMu    sync.RWMutex
	scriptInfos      map[tspath.Path]*ScriptInfo
	openFiles        map[tspath.Path]string // values are projectRootPath, if provided
	// Contains all the deleted script info's version information so that
	// it does not reset when creating script info again
	filenameToScriptInfoVersion map[tspath.Path]int
	realpathToScriptInfosMu     sync.Mutex
	realpathToScriptInfos       map[tspath.Path]map[*ScriptInfo]struct{}
}

func NewService(host ServiceHost, options ServiceOptions) *Service {
	options.Logger.Info(fmt.Sprintf("currentDirectory:: %s useCaseSensitiveFileNames:: %t", host.GetCurrentDirectory(), host.FS().UseCaseSensitiveFileNames()))
	options.Logger.Info("libs Location:: " + host.DefaultLibraryPath())
	return &Service{
		host:    host,
		options: options,
		comparePathsOptions: tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		},

		configuredProjects: make(map[tspath.Path]*Project),

		documentRegistry: &DocumentRegistry{
			Options: tspath.ComparePathsOptions{
				UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
				CurrentDirectory:          host.GetCurrentDirectory(),
			},
		},
		scriptInfos:                 make(map[tspath.Path]*ScriptInfo),
		openFiles:                   make(map[tspath.Path]string),
		filenameToScriptInfoVersion: make(map[tspath.Path]int),
		realpathToScriptInfos:       make(map[tspath.Path]map[*ScriptInfo]struct{}),
	}
}

// GetCurrentDirectory implements ProjectHost.
func (s *Service) GetCurrentDirectory() string {
	return s.host.GetCurrentDirectory()
}

// Log implements ProjectHost.
func (s *Service) Log(msg string) {
	s.options.Logger.Info(msg)
}

// NewLine implements ProjectHost.
func (s *Service) NewLine() string {
	return s.host.NewLine()
}

// DefaultLibraryPath implements ProjectHost.
func (s *Service) DefaultLibraryPath() string {
	return s.host.DefaultLibraryPath()
}

// DocumentRegistry implements ProjectHost.
func (s *Service) DocumentRegistry() *DocumentRegistry {
	return s.documentRegistry
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

func (s *Service) Projects() []*Project {
	projects := make([]*Project, 0, len(s.configuredProjects)+len(s.inferredProjects))
	for _, project := range s.configuredProjects {
		projects = append(projects, project)
	}
	projects = append(projects, s.inferredProjects...)
	return projects
}

func (s *Service) GetScriptInfo(fileName string) *ScriptInfo {
	return s.GetScriptInfoByPath(s.toPath(fileName))
}

func (s *Service) GetScriptInfoByPath(path tspath.Path) *ScriptInfo {
	s.scriptInfosMu.RLock()
	defer s.scriptInfosMu.RUnlock()
	if info, ok := s.scriptInfos[path]; ok && !info.deferredDelete {
		return info
	}
	return nil
}

func (s *Service) OpenFile(fileName string, fileContent string, scriptKind core.ScriptKind, projectRootPath string) {
	path := s.toPath(fileName)
	existing := s.GetScriptInfoByPath(path)
	info := s.getOrCreateOpenScriptInfo(fileName, path, fileContent, scriptKind, projectRootPath)
	if existing == nil && info != nil && !info.isDynamic {
		// !!!
		// s.tryInvokeWildcardDirectories(info)
	}
	result := s.assignProjectToOpenedScriptInfo(info)
	s.cleanupProjectsAndScriptInfos(result.retainProjects, []tspath.Path{info.path})
	s.printProjects()
}

func (s *Service) ChangeFile(fileName string, changes []ls.TextChange) {
	path := s.toPath(fileName)
	info := s.GetScriptInfoByPath(path)
	if info == nil {
		panic("scriptInfo not found")
	}
	s.applyChangesToFile(info, changes)
}

func (s *Service) CloseFile(fileName string) {
	if info := s.GetScriptInfoByPath(s.toPath(fileName)); info != nil {
		fileExists := !info.isDynamic && s.host.FS().FileExists(info.fileName)
		info.close(fileExists)
		for _, project := range info.containingProjects {
			if project.kind == KindInferred && project.isRoot(info) {
				project.removeFile(info, fileExists, true /*detachFromProject*/)
			}
		}
		delete(s.openFiles, info.path)
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
	return s.documentRegistry.size()
}

func (s *Service) ensureProjectStructureUpToDate() {
	var hasChanges bool
	for _, project := range s.configuredProjects {
		hasChanges = project.updateIfDirty() || hasChanges
	}
	for _, project := range s.inferredProjects {
		hasChanges = project.updateIfDirty() || hasChanges
	}
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
	for _, project := range s.inferredProjects {
		project.updateIfDirty()
	}

	s.Log("After ensureProjectForOpenFiles:")
	s.printProjects()
}

func (s *Service) applyChangesToFile(info *ScriptInfo, changes []ls.TextChange) {
	for _, change := range changes {
		info.editContent(change)
	}
}

func (s *Service) handleDeletedFile(info *ScriptInfo, deferredDelete bool) {
	if info.isOpen {
		panic("cannot delete an open file")
	}

	s.delayUpdateProjectGraphs(info.containingProjects, false /*clearSourceMapperCache*/)
	// !!!
	// s.handleSourceMapProjects(info)
	info.detachAllProjects()
	if deferredDelete {
		info.delayReloadNonMixedContentFile()
		info.deferredDelete = true
	} else {
		s.deleteScriptInfo(info)
	}
}

func (s *Service) deleteScriptInfo(info *ScriptInfo) {
	if info.isOpen {
		panic("cannot delete an open file")
	}
	s.scriptInfosMu.Lock()
	defer s.scriptInfosMu.Unlock()
	delete(s.scriptInfos, info.path)
	s.filenameToScriptInfoVersion[info.path] = info.version
	// !!!
	// s.stopWatchingScriptInfo(info)
	if realpath, ok := info.getRealpathIfDifferent(); ok {
		s.realpathToScriptInfosMu.Lock()
		defer s.realpathToScriptInfosMu.Unlock()
		delete(s.realpathToScriptInfos[realpath], info)
	}
	// !!! closeSourceMapFileWatcher
}

func (s *Service) OnDiscoveredSymlink(info *ScriptInfo) {
	s.realpathToScriptInfosMu.Lock()
	defer s.realpathToScriptInfosMu.Unlock()
	if scriptInfos, ok := s.realpathToScriptInfos[info.realpath]; ok {
		scriptInfos[info] = struct{}{}
	} else {
		scriptInfos = make(map[*ScriptInfo]struct{})
		scriptInfos[info] = struct{}{}
		s.realpathToScriptInfos[info.realpath] = scriptInfos
	}
}

func (s *Service) delayUpdateProjectGraphs(projects []*Project, clearSourceMapperCache bool) {
	for _, project := range projects {
		if clearSourceMapperCache {
			project.clearSourceMapperCache()
		}
		s.delayUpdateProjectGraph(project)
	}
}

func (s *Service) delayUpdateProjectGraph(project *Project) {
	if project.deferredClose {
		return
	}
	project.markAsDirty()
	if project.kind == KindAutoImportProvider || project.kind == KindAuxiliary {
		return
	}
	// !!! throttle
	project.updateIfDirty()
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
	s.scriptInfosMu.RLock()
	info, ok := s.scriptInfos[path]
	s.scriptInfosMu.RUnlock()

	var fromDisk bool
	if !ok {
		if !openedByClient && !isDynamicFileName(fileName) {
			if content, ok := s.host.FS().ReadFile(fileName); !ok {
				return nil
			} else {
				fileContent = content
				fromDisk = true
			}
		}

		info = NewScriptInfo(fileName, path, scriptKind)
		if fromDisk {
			info.SetTextFromDisk(fileContent)
		}

		s.scriptInfosMu.Lock()
		defer s.scriptInfosMu.Unlock()
		if prevVersion, ok := s.filenameToScriptInfoVersion[path]; ok {
			info.version = prevVersion + 1
			delete(s.filenameToScriptInfoVersion, path)
		}
		s.scriptInfos[path] = info
	} else if info.deferredDelete {
		if !openedByClient && !s.host.FS().FileExists(fileName) {
			// If the file is not opened by client and the file does not exist on the disk, return
			return core.IfElse(deferredDeleteOk, info, nil)
		}
		info.deferredDelete = false
	}

	if openedByClient {
		// Opening closed script info
		// either it was created just now, or was part of projects but was closed
		// !!!
		// s.stopWatchingScriptInfo(info)
		info.open(fileContent)
	} else {
		// !!!
		// s.watchClosedScriptInfo(info)
	}
	return info
}

func (s *Service) configFileExists(configFilename string) bool {
	// !!! convoluted cache goes here
	return s.host.FS().FileExists(configFilename)
}

func (s *Service) getConfigFileNameForFile(info *ScriptInfo, findFromCacheOnly bool) string {
	// !!!
	// const fromCache = this.getConfigFileNameForFileFromCache(info, findFromCacheOnly);
	// if (fromCache !== undefined) return fromCache || undefined;
	// if (findFromCacheOnly) return undefined;
	//
	// !!!
	// good grief, this is convoluted. I'm skipping so much stuff right now
	projectRootPath := s.openFiles[info.path]
	if info.isDynamic {
		return ""
	}

	searchPath := tspath.GetDirectoryPath(info.fileName)
	fileName, _ := tspath.ForEachAncestorDirectory(searchPath, func(directory string) (result string, stop bool) {
		tsconfigPath := tspath.CombinePaths(directory, "tsconfig.json")
		if s.configFileExists(tsconfigPath) {
			return tsconfigPath, true
		}
		if strings.HasSuffix(directory, "/node_modules") {
			return "", true
		}
		if projectRootPath != "" && !tspath.ContainsPath(projectRootPath, directory, s.comparePathsOptions) {
			return "", true
		}
		return "", false
	})
	s.logf("getConfigFileNameForFile:: File: %s ProjectRootPath: %s:: Result: %s", info.fileName, s.openFiles[info.path], fileName)
	return fileName
}

func (s *Service) findDefaultConfiguredProject(scriptInfo *ScriptInfo) *Project {
	return s.findCreateOrReloadConfiguredProject(s.getConfigFileNameForFile(scriptInfo, true /*findFromCacheOnly*/), projectLoadKindFind, false /*includeDeferredClosedProjects*/)
}

func (s *Service) findConfiguredProjectByName(configFilePath tspath.Path, includeDeferredClosedProjects bool) *Project {
	if result, ok := s.configuredProjects[configFilePath]; ok {
		if includeDeferredClosedProjects || !result.deferredClose {
			return result
		}
	}
	return nil
}

func (s *Service) createConfiguredProject(configFileName string, configFilePath tspath.Path) *Project {
	// !!! config file existence cache stuff omitted
	project := NewConfiguredProject(configFileName, configFilePath, s)
	s.configuredProjects[configFilePath] = project
	// !!!
	// s.createConfigFileWatcherForParsedConfig(configFileName, configFilePath, project)
	return project
}

func (s *Service) findCreateOrReloadConfiguredProject(configFileName string, projectLoadKind projectLoadKind, includeDeferredClosedProjects bool) *Project {
	// !!! many such things omitted
	configFilePath := s.toPath(configFileName)
	project := s.findConfiguredProjectByName(configFilePath, includeDeferredClosedProjects)
	switch projectLoadKind {
	case projectLoadKindFind, projectLoadKindCreateReplay:
		return project
	case projectLoadKindCreate, projectLoadKindReload:
		if project == nil {
			project = s.createConfiguredProject(configFileName, configFilePath)
		}
		s.loadConfiguredProject(project)
	default:
		panic("unhandled projectLoadKind")
	}
	return project
}

func (s *Service) tryFindDefaultConfiguredProjectForOpenScriptInfo(info *ScriptInfo, projectLoadKind projectLoadKind, includeDeferredClosedProjects bool) *Project {
	findConfigFromCacheOnly := projectLoadKind == projectLoadKindFind || projectLoadKind == projectLoadKindCreateReplay
	if configFileName := s.getConfigFileNameForFile(info, findConfigFromCacheOnly); configFileName != "" {
		// !!! Maybe this recently added "optimized" stuff can be simplified?
		// const optimizedKind = toConfiguredProjectLoadOptimized(kind);
		return s.findCreateOrReloadConfiguredProject(configFileName, projectLoadKind, includeDeferredClosedProjects)
	}
	return nil
}

func (s *Service) tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(info *ScriptInfo, projectLoadKind projectLoadKind) *Project {
	includeDeferredClosedProjects := projectLoadKind == projectLoadKindFind
	result := s.tryFindDefaultConfiguredProjectForOpenScriptInfo(info, projectLoadKind, includeDeferredClosedProjects)
	// !!! I don't even know what an ancestor project is
	return result
}

func (s *Service) assignProjectToOpenedScriptInfo(info *ScriptInfo) assignProjectResult {
	var result assignProjectResult
	if project := s.tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(info, projectLoadKindCreate); project != nil {
		result.configFileName = project.configFileName
		// result.configFileErrors = project.getAllProjectErrors()
	}
	for _, project := range info.containingProjects {
		project.updateIfDirty()
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

func (s *Service) cleanupProjectsAndScriptInfos(toRetainConfiguredProjects map[*Project]projectLoadKind, openFilesWithRetainedConfiguredProject []tspath.Path) {
	// !!!
}

func (s *Service) assignOrphanScriptInfoToInferredProject(info *ScriptInfo, projectRootDirectory string) {
	if !info.isOrphan() {
		panic("scriptInfo is not orphan")
	}

	project := s.getOrCreateInferredProjectForProjectRootPath(info, projectRootDirectory)
	if project == nil {
		project = s.getOrCreateUnrootedInferredProject()
	}

	project.addRoot(info)
	project.updateGraph()
	// !!! old code ensures that scriptInfo is only part of one project
}

func (s *Service) getOrCreateUnrootedInferredProject() *Project {
	if s.unrootedInferredProject == nil {
		s.unrootedInferredProject = s.createInferredProject(s.host.GetCurrentDirectory(), "")
	}
	return s.unrootedInferredProject
}

func (s *Service) getOrCreateInferredProjectForProjectRootPath(info *ScriptInfo, projectRootDirectory string) *Project {
	if info.isDynamic && projectRootDirectory == "" {
		return nil
	}

	if projectRootDirectory != "" {
		projectRootPath := s.toPath(projectRootDirectory)
		for _, project := range s.inferredProjects {
			if project.rootPath == projectRootPath {
				return project
			}
		}
		return s.createInferredProject(projectRootDirectory, projectRootPath)
	}

	var bestMatch *Project
	for _, project := range s.inferredProjects {
		if project.rootPath == "" {
			continue
		}
		if !tspath.ContainsPath(string(project.rootPath), string(info.path), s.comparePathsOptions) {
			continue
		}
		if bestMatch != nil && len(bestMatch.rootPath) > len(project.rootPath) {
			continue
		}
		bestMatch = project
	}

	return bestMatch
}

func (s *Service) getDefaultProjectForScript(scriptInfo *ScriptInfo) *Project {
	switch len(scriptInfo.containingProjects) {
	case 0:
		panic("scriptInfo must be attached to a project before calling getDefaultProject")
	case 1:
		project := scriptInfo.containingProjects[0]
		if project.deferredClose || project.kind == KindAutoImportProvider || project.kind == KindAuxiliary {
			panic("scriptInfo must be attached to a non-background project before calling getDefaultProject")
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

		for index, project := range scriptInfo.containingProjects {
			if project.kind == KindConfigured {
				if project.deferredClose {
					continue
				}
				// !!! if !project.isSourceOfProjectReferenceRedirect(scriptInfo.fileName) {
				if defaultConfiguredProject == nil && index != len(scriptInfo.containingProjects)-1 {
					defaultConfiguredProject = s.findDefaultConfiguredProject(scriptInfo)
				}
				if defaultConfiguredProject == project {
					return project
				}
				if firstNonSourceOfProjectReferenceRedirect == nil {
					firstNonSourceOfProjectReferenceRedirect = project
				}
				// }
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
		panic("no project found")
	}
}

func (s *Service) createInferredProject(currentDirectory string, projectRootPath tspath.Path) *Project {
	// !!!
	compilerOptions := core.CompilerOptions{}
	project := NewInferredProject(&compilerOptions, currentDirectory, projectRootPath, s)
	s.inferredProjects = append(s.inferredProjects, project)
	return project
}

func (s *Service) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, s.host.GetCurrentDirectory(), s.host.FS().UseCaseSensitiveFileNames())
}

func (s *Service) loadConfiguredProject(project *Project) {
	if err := project.LoadConfig(); err != nil {
		panic(fmt.Errorf("failed to load project %q: %w", project.configFileName, err))
	}
}

func (s *Service) printProjects() {
	if !s.options.Logger.HasLevel(LogLevelNormal) {
		return
	}

	s.options.Logger.StartGroup()
	for _, project := range s.configuredProjects {
		s.Log(project.print(false /*writeFileNames*/, false /*writeFileExpanation*/, false /*writeFileVersionAndText*/))
	}
	for _, project := range s.inferredProjects {
		s.Log(project.print(false /*writeFileNames*/, false /*writeFileExpanation*/, false /*writeFileVersionAndText*/))
	}

	s.Log("Open files: ")
	for path, projectRootPath := range s.openFiles {
		info := s.GetScriptInfoByPath(path)
		s.logf("\tFileName: %s ProjectRootPath: %s", info.fileName, projectRootPath)
		s.Log("\t\tProjects: " + strings.Join(core.Map(info.containingProjects, func(project *Project) string { return project.name }), ", "))
	}
	s.options.Logger.EndGroup()
}

func (s *Service) logf(format string, args ...any) {
	s.Log(fmt.Sprintf(format, args...))
}
