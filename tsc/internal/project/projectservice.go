package project

import (
	"fmt"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
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

type OpenFileArguments struct {
	FileName        string
	Content         string
	ScriptKind      core.ScriptKind
	HasMixedContent bool
	ProjectRootPath string
}

type ChangeFileArguments struct {
	FileName string
	Changes  []ls.TextChange
}

type ProjectServiceOptions struct {
	DefaultLibraryPath string
	Logger             *Logger
}

type ProjectService struct {
	host                ProjectServiceHost
	options             ProjectServiceOptions
	comparePathsOptions tspath.ComparePathsOptions

	configuredProjects map[tspath.Path]*Project
	// unrootedInferredProject is the inferred project for files opened without a projectRootDirectory
	// (e.g. dynamic files)
	unrootedInferredProject *Project
	// inferredProjects is the list of all inferred projects, including the unrootedInferredProject
	// if it exists
	inferredProjects []*Project

	documentRegistry *documentRegistry
	scriptInfosMu    sync.RWMutex
	scriptInfos      map[tspath.Path]*ScriptInfo
	openFiles        map[tspath.Path]string // values are projectRootPath, if provided
	// Contains all the deleted script info's version information so that
	// it does not reset when creating script info again
	filenameToScriptInfoVersion map[tspath.Path]int
	realpathToScriptInfosMu     sync.Mutex
	realpathToScriptInfos       map[tspath.Path]map[*ScriptInfo]struct{}
}

func NewProjectService(host ProjectServiceHost, options ProjectServiceOptions) *ProjectService {
	options.Logger.Info(fmt.Sprintf("currentDirectory:: %s useCaseSensitiveFileNames:: %t", host.GetCurrentDirectory(), host.FS().UseCaseSensitiveFileNames()))
	options.Logger.Info("libs Location:: " + options.DefaultLibraryPath)
	return &ProjectService{
		host:    host,
		options: options,
		comparePathsOptions: tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		},

		configuredProjects: make(map[tspath.Path]*Project),

		documentRegistry: newDocumentRegistry(tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		}),
		scriptInfos:                 make(map[tspath.Path]*ScriptInfo),
		openFiles:                   make(map[tspath.Path]string),
		filenameToScriptInfoVersion: make(map[tspath.Path]int),
		realpathToScriptInfos:       make(map[tspath.Path]map[*ScriptInfo]struct{}),
	}
}

func (s *ProjectService) GetScriptInfo(fileName string) *ScriptInfo {
	return s.getScriptInfo(s.toPath(fileName))
}

func (s *ProjectService) getScriptInfo(path tspath.Path) *ScriptInfo {
	s.scriptInfosMu.RLock()
	defer s.scriptInfosMu.RUnlock()
	if info, ok := s.scriptInfos[path]; ok && !info.deferredDelete {
		return info
	}
	return nil
}

func (s *ProjectService) OpenClientFile(fileName string, fileContent string, scriptKind core.ScriptKind, projectRootPath string) {
	path := s.toPath(fileName)
	existing := s.getScriptInfo(path)
	info := s.getOrCreateOpenScriptInfo(fileName, path, fileContent, scriptKind, projectRootPath)
	if existing == nil && info != nil && !info.isDynamic {
		// !!!
		// s.tryInvokeWildcardDirectories(info)
	}
	result := s.assignProjectToOpenedScriptInfo(info)
	s.cleanupProjectsAndScriptInfos(result.retainProjects, []tspath.Path{info.path})
	s.printProjects()
}

func (s *ProjectService) ApplyChangesInOpenFiles(
	openFiles []OpenFileArguments,
	changedFiles []ChangeFileArguments,
	closedFiles []string,
) {
	var assignOrphanScriptInfosToInferredProject bool
	existingOpenScriptInfos := make([]*ScriptInfo, 0, len(openFiles))
	openScriptInfos := make([]*ScriptInfo, 0, len(openFiles))
	openScriptInfoPaths := make([]tspath.Path, 0, len(openFiles))

	for _, openFile := range openFiles {
		openFilePath := s.toPath(openFile.FileName)
		existingOpenScriptInfos = append(existingOpenScriptInfos, s.getScriptInfo(openFilePath))
		openScriptInfos = append(openScriptInfos, s.getOrCreateOpenScriptInfo(openFile.FileName, openFilePath, openFile.Content, openFile.ScriptKind, openFile.ProjectRootPath))
		openScriptInfoPaths = append(openScriptInfoPaths, openFilePath)
	}

	for _, changedFile := range changedFiles {
		info := s.getScriptInfo(s.toPath(changedFile.FileName))
		if info == nil {
			panic("scriptInfo for changed file not found")
		}
		s.applyChangesToFile(info, changedFile.Changes)
	}

	for _, closedFile := range closedFiles {
		closedFilePath := s.toPath(closedFile)
		assignOrphanScriptInfosToInferredProject = s.closeClientFile(closedFilePath, true /*skipAssignOrphanScriptInfosToInferredProject*/) || assignOrphanScriptInfosToInferredProject
	}

	retainedProjects := make(map[*Project]projectLoadKind)
	for i, existing := range existingOpenScriptInfos {
		if existing == nil && openScriptInfos[i] != nil && !openScriptInfos[i].isDynamic {
			// !!!
			// s.tryInvokeWildcardDirectories(openScriptInfos[i])
		}
	}
	for _, info := range openScriptInfos {
		for project, loadKind := range s.assignProjectToOpenedScriptInfo(info).retainProjects {
			retainedProjects[project] = loadKind
		}
	}

	if assignOrphanScriptInfosToInferredProject {
		// !!!
		// s.assignOrphanScriptInfosToInferredProject()
	}

	if len(openScriptInfos) > 0 {
		s.cleanupProjectsAndScriptInfos(retainedProjects, openScriptInfoPaths)
		s.printProjects()
	} else if len(closedFiles) > 0 {
		s.printProjects()
	}
}

func (s *ProjectService) EnsureDefaultProjectForFile(fileName string) (*ScriptInfo, *Project) {
	path := s.toPath(fileName)
	if info := s.getScriptInfo(path); info != nil && !info.isOrphan() {
		if project := info.getDefaultProject(); project != nil {
			return info, project
		}
	}
	s.ensureProjectStructureUpToDate()
	if info := s.getScriptInfo(path); info != nil {
		if project := info.getDefaultProject(); project != nil {
			return info, project
		}
	}
	panic("project not found")
}

func (s *ProjectService) Close() {
	// !!!
}

func (s *ProjectService) ensureProjectStructureUpToDate() {
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

func (s *ProjectService) ensureProjectForOpenFiles() {
	s.log("Before ensureProjectForOpenFiles:")
	s.printProjects()

	for filePath, projectRootPath := range s.openFiles {
		info := s.getScriptInfo(filePath)
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

	s.log("After ensureProjectForOpenFiles:")
	s.printProjects()
}

func (s *ProjectService) applyChangesToFile(info *ScriptInfo, changes []ls.TextChange) {
	for _, change := range changes {
		info.editContent(change)
	}
}

func (s *ProjectService) closeClientFile(path tspath.Path, skipAssignOrphanScriptInfosToInferredProject bool) bool {
	if !skipAssignOrphanScriptInfosToInferredProject {
		defer s.printProjects()
	}
	if info := s.getScriptInfo(path); info != nil {
		return s.closeOpenFile(info, skipAssignOrphanScriptInfosToInferredProject)
	}
	return false
}

func (s *ProjectService) closeOpenFile(info *ScriptInfo, skipAssignOrphanScriptInfosToInferredProject bool) bool {
	fileExists := !info.isDynamic && s.host.FS().FileExists(info.fileName)
	info.close(fileExists)
	// s.stopWatchingConfigFilesForScriptInfo(info)

	var ensureProjectsForOpenFiles bool
	// !!! collect all projects that should be removed

	delete(s.openFiles, info.path)

	if !skipAssignOrphanScriptInfosToInferredProject && ensureProjectsForOpenFiles {
		// !!!
		// s.assignOrphanScriptInfoToInferredProject()
	}

	// Cleanup script infos that arent part of any project (eg. those could be closed script infos not referenced by any project)
	// is postponed to next file open so that if file from same project is opened,
	// we wont end up creating same script infos

	// If the current info is being just closed - add the watcher file to track changes
	// But if file was deleted, handle that part
	if fileExists {
		// s.watchClosedScriptInfo(info)
	} else {
		// s.handleDeletedFile(info /*deferredDelete*/, false)
	}
	return ensureProjectsForOpenFiles
}

func (s *ProjectService) handleDeletedFile(info *ScriptInfo, deferredDelete bool) {
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

func (s *ProjectService) deleteScriptInfo(info *ScriptInfo) {
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

func (s *ProjectService) recordSymlink(info *ScriptInfo) {
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

func (s *ProjectService) delayUpdateProjectGraphs(projects []*Project, clearSourceMapperCache bool) {
	for _, project := range projects {
		if clearSourceMapperCache {
			project.clearSourceMapperCache()
		}
		s.delayUpdateProjectGraph(project)
	}
}

func (s *ProjectService) delayUpdateProjectGraph(project *Project) {
	if project.deferredClose {
		return
	}
	project.markAsDirty()
	if project.kind == ProjectKindAutoImportProvider || project.kind == ProjectKindAuxiliary {
		return
	}
	// !!! throttle
	project.updateIfDirty()
}

func (s *ProjectService) getOrCreateScriptInfoNotOpenedByClient(fileName string, path tspath.Path, scriptKind core.ScriptKind) *ScriptInfo {
	if tspath.IsRootedDiskPath(fileName) || isDynamicFileName(fileName) {
		return s.getOrCreateScriptInfoWorker(fileName, path, scriptKind, false /*openedByClient*/, "" /*fileContent*/, false /*deferredDeleteOk*/)
	}
	// !!!
	// This is non rooted path with different current directory than project service current directory
	// Only paths recognized are open relative file paths
	// const info = this.openFilesWithNonRootedDiskPath.get(this.toCanonicalFileName(fileName))
	// if info {
	// 	return info
	// }

	// This means triple slash references wont be resolved in dynamic and unsaved files
	// which is intentional since we dont know what it means to be relative to non disk files
	return nil
}

func (s *ProjectService) getOrCreateOpenScriptInfo(fileName string, path tspath.Path, fileContent string, scriptKind core.ScriptKind, projectRootPath string) *ScriptInfo {
	info := s.getOrCreateScriptInfoWorker(fileName, path, scriptKind, true /*openedByClient*/, fileContent, true /*deferredDeleteOk*/)
	s.openFiles[info.path] = projectRootPath
	return info
}

func (s *ProjectService) getOrCreateScriptInfoWorker(fileName string, path tspath.Path, scriptKind core.ScriptKind, openedByClient bool, fileContent string, deferredDeleteOk bool) *ScriptInfo {
	s.scriptInfosMu.RLock()
	info, ok := s.scriptInfos[path]
	s.scriptInfosMu.RUnlock()

	if !ok {
		if !openedByClient && !isDynamicFileName(fileName) {
			if content, ok := s.host.FS().ReadFile(fileName); !ok {
				return nil
			} else {
				fileContent = content
			}
		}

		info = newScriptInfo(fileName, path, scriptKind)
		info.setTextFromDisk(fileContent)
		s.scriptInfosMu.Lock()
		defer s.scriptInfosMu.Unlock()
		if prevVersion, ok := s.filenameToScriptInfoVersion[path]; ok {
			info.version = prevVersion
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

func (s *ProjectService) configFileExists(configFilename string) bool {
	// !!! convoluted cache goes here
	return s.host.FS().FileExists(configFilename)
}

func (s *ProjectService) getConfigFileNameForFile(info *ScriptInfo, findFromCacheOnly bool) string {
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

func (s *ProjectService) findDefaultConfiguredProject(scriptInfo *ScriptInfo) *Project {
	return s.findCreateOrReloadConfiguredProject(s.getConfigFileNameForFile(scriptInfo, true /*findFromCacheOnly*/), projectLoadKindFind, false /*includeDeferredClosedProjects*/)
}

func (s *ProjectService) findConfiguredProjectByName(configFilePath tspath.Path, includeDeferredClosedProjects bool) *Project {
	if result, ok := s.configuredProjects[configFilePath]; ok {
		if includeDeferredClosedProjects || !result.deferredClose {
			return result
		}
	}
	return nil
}

func (s *ProjectService) createConfiguredProject(configFileName string, configFilePath tspath.Path) *Project {
	// !!! config file existence cache stuff omitted
	project := NewConfiguredProject(configFileName, configFilePath, s)
	s.configuredProjects[configFilePath] = project
	// !!!
	// s.createConfigFileWatcherForParsedConfig(configFileName, configFilePath, project)
	return project
}

func (s *ProjectService) findCreateOrReloadConfiguredProject(configFileName string, projectLoadKind projectLoadKind, includeDeferredClosedProjects bool) *Project {
	// !!! many such things omitted
	configFilePath := s.toPath(configFileName)
	project := s.findConfiguredProjectByName(configFilePath, includeDeferredClosedProjects)
	switch projectLoadKind {
	case projectLoadKindFind, projectLoadKindCreateReplay:
		return project
	case projectLoadKindCreate:
		if project == nil {
			project = s.createConfiguredProject(configFileName, configFilePath)
			s.loadConfiguredProject(project)
		}
	case projectLoadKindReload:
		if project == nil {
			project = s.createConfiguredProject(configFileName, configFilePath)
			s.loadConfiguredProject(project)
		}
	default:
		panic("unhandled projectLoadKind")
	}
	return project
}

func (s *ProjectService) tryFindDefaultConfiguredProjectForOpenScriptInfo(info *ScriptInfo, projectLoadKind projectLoadKind, includeDeferredClosedProjects bool) *Project {
	findConfigFromCacheOnly := projectLoadKind == projectLoadKindFind || projectLoadKind == projectLoadKindCreateReplay
	if configFileName := s.getConfigFileNameForFile(info, findConfigFromCacheOnly); configFileName != "" {
		// !!! Maybe this recently added "optimized" stuff can be simplified?
		// const optimizedKind = toConfiguredProjectLoadOptimized(kind);
		return s.findCreateOrReloadConfiguredProject(configFileName, projectLoadKind, includeDeferredClosedProjects)
	}
	return nil
}

func (s *ProjectService) tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(info *ScriptInfo, projectLoadKind projectLoadKind) *Project {
	includeDeferredClosedProjects := projectLoadKind == projectLoadKindFind
	result := s.tryFindDefaultConfiguredProjectForOpenScriptInfo(info, projectLoadKind, includeDeferredClosedProjects)
	// !!! I don't even know what an ancestor project is
	return result
}

func (s *ProjectService) assignProjectToOpenedScriptInfo(info *ScriptInfo) assignProjectResult {
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

func (s *ProjectService) cleanupProjectsAndScriptInfos(toRetainConfiguredProjects map[*Project]projectLoadKind, openFilesWithRetainedConfiguredProject []tspath.Path) {
	// !!!
}

func (s *ProjectService) assignOrphanScriptInfoToInferredProject(info *ScriptInfo, projectRootDirectory string) {
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

func (s *ProjectService) getOrCreateUnrootedInferredProject() *Project {
	if s.unrootedInferredProject == nil {
		s.unrootedInferredProject = s.createInferredProject(s.host.GetCurrentDirectory(), "")
	}
	return s.unrootedInferredProject
}

func (s *ProjectService) getOrCreateInferredProjectForProjectRootPath(info *ScriptInfo, projectRootDirectory string) *Project {
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

func (s *ProjectService) createInferredProject(currentDirectory string, projectRootPath tspath.Path) *Project {
	// !!!
	compilerOptions := core.CompilerOptions{}
	project := NewInferredProject(&compilerOptions, currentDirectory, projectRootPath, s)
	s.inferredProjects = append(s.inferredProjects, project)
	return project
}

func (s *ProjectService) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, s.host.GetCurrentDirectory(), s.host.FS().UseCaseSensitiveFileNames())
}

func (s *ProjectService) loadConfiguredProject(project *Project) {
	if configFileContent, ok := s.host.FS().ReadFile(project.configFileName); ok {
		configDir := tspath.GetDirectoryPath(project.configFileName)
		tsConfigSourceFile := tsoptions.NewTsconfigSourceFileFromFilePath(project.configFileName, configFileContent)
		tsConfigSourceFile.SourceFile.SetPath(s.toPath(project.configFileName))
		parsedCommandLine := tsoptions.ParseJsonSourceFileConfigFileContent(
			tsConfigSourceFile,
			s.host,
			configDir,
			nil, /*existingOptions*/
			project.configFileName,
			nil, /*resolutionStack*/
			nil, /*extraFileExtensions*/
			nil, /*extendedConfigCache*/
		)

		s.logf("Config: %s : %s",
			project.configFileName,
			core.Must(core.StringifyJson(map[string]interface{}{
				"rootNames":         parsedCommandLine.FileNames(),
				"options":           parsedCommandLine.CompilerOptions(),
				"projectReferences": parsedCommandLine.ProjectReferences(),
			}, "    ", "  ")),
		)

		newRootScriptInfos := make(map[tspath.Path]struct{}, len(parsedCommandLine.FileNames()))
		project.compilerOptions = parsedCommandLine.CompilerOptions()
		for _, file := range parsedCommandLine.FileNames() {
			scriptKind := project.getScriptKind(file)
			scriptInfo := s.getOrCreateScriptInfoNotOpenedByClient(file, s.toPath(file), scriptKind)
			newRootScriptInfos[scriptInfo.path] = struct{}{}
			if _, isRoot := project.rootFileNames.Get(scriptInfo.path); !isRoot {
				project.addRoot(scriptInfo)
				if scriptInfo.isOpen {
					// !!!
					// s.removeRootOfInferredProjectIfNowPartOfOtherProject(scriptInfo)
				}
			} else {
				project.rootFileNames.Set(scriptInfo.path, file)
			}
		}

		if project.rootFileNames.Size() > len(parsedCommandLine.FileNames()) {
			for root := range project.rootFileNames.Keys() {
				if _, ok := newRootScriptInfos[root]; !ok {
					if info := s.getScriptInfo(root); info != nil {
						project.removeFile(info, true /*fileExists*/, true /*detachFromProject*/)
					} else {
						project.rootFileNames.Delete(root)
					}
				}
			}
		}
	} else {
		project.compilerOptions = &core.CompilerOptions{}
	}

	project.updateGraph()
}

func (s *ProjectService) printProjects() {
	if !s.options.Logger.HasLevel(LogLevelNormal) {
		return
	}

	s.options.Logger.StartGroup()
	for _, project := range s.configuredProjects {
		s.log(project.print(false /*writeFileNames*/, false /*writeFileExpanation*/, false /*writeFileVersionAndText*/))
	}
	for _, project := range s.inferredProjects {
		s.log(project.print(false /*writeFileNames*/, false /*writeFileExpanation*/, false /*writeFileVersionAndText*/))
	}

	s.log("Open files: ")
	for path, projectRootPath := range s.openFiles {
		info := s.getScriptInfo(path)
		s.logf("\tFileName: %s ProjectRootPath: %s", info.fileName, projectRootPath)
		s.log("\t\tProjects: " + strings.Join(core.Map(info.containingProjects, func(project *Project) string { return project.name }), ", "))
	}
	s.options.Logger.EndGroup()
}

func (s *ProjectService) log(msg string) {
	s.options.Logger.Info(msg)
}

func (s *ProjectService) logf(format string, args ...interface{}) {
	s.log(fmt.Sprintf(format, args...))
}
