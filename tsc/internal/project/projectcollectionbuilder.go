package project

import (
	"context"
	"fmt"
	"maps"
	"slices"
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/dirty"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type projectLoadKind int

const (
	// Project is not created or updated, only looked up in cache
	projectLoadKindFind projectLoadKind = iota
	// Project is created and then its graph is updated
	projectLoadKindCreate
)

type ProjectCollectionBuilder struct {
	sessionOptions      *SessionOptions
	parseCache          *ParseCache
	extendedConfigCache *ExtendedConfigCache

	ctx                                context.Context
	fs                                 *snapshotFSBuilder
	base                               *ProjectCollection
	compilerOptionsForInferredProjects *core.CompilerOptions
	configFileRegistryBuilder          *configFileRegistryBuilder

	newSnapshotID           uint64
	programStructureChanged bool

	fileDefaultProjects map[tspath.Path]tspath.Path
	configuredProjects  *dirty.SyncMap[tspath.Path, *Project]
	inferredProject     *dirty.Box[*Project]

	apiOpenedProjects map[tspath.Path]struct{}
}

func newProjectCollectionBuilder(
	ctx context.Context,
	newSnapshotID uint64,
	fs *snapshotFSBuilder,
	oldProjectCollection *ProjectCollection,
	oldConfigFileRegistry *ConfigFileRegistry,
	oldAPIOpenedProjects map[tspath.Path]struct{},
	compilerOptionsForInferredProjects *core.CompilerOptions,
	sessionOptions *SessionOptions,
	parseCache *ParseCache,
	extendedConfigCache *ExtendedConfigCache,
) *ProjectCollectionBuilder {
	return &ProjectCollectionBuilder{
		ctx:                                ctx,
		fs:                                 fs,
		compilerOptionsForInferredProjects: compilerOptionsForInferredProjects,
		sessionOptions:                     sessionOptions,
		parseCache:                         parseCache,
		extendedConfigCache:                extendedConfigCache,
		base:                               oldProjectCollection,
		configFileRegistryBuilder:          newConfigFileRegistryBuilder(fs, oldConfigFileRegistry, extendedConfigCache, sessionOptions, nil),
		newSnapshotID:                      newSnapshotID,
		configuredProjects:                 dirty.NewSyncMap(oldProjectCollection.configuredProjects, nil),
		inferredProject:                    dirty.NewBox(oldProjectCollection.inferredProject),
		apiOpenedProjects:                  maps.Clone(oldAPIOpenedProjects),
	}
}

func (b *ProjectCollectionBuilder) Finalize(logger *logging.LogTree) (*ProjectCollection, *ConfigFileRegistry) {
	var changed bool
	newProjectCollection := b.base
	ensureCloned := func() {
		if !changed {
			newProjectCollection = newProjectCollection.clone()
			changed = true
		}
	}

	if configuredProjects, configuredProjectsChanged := b.configuredProjects.Finalize(); configuredProjectsChanged {
		ensureCloned()
		newProjectCollection.configuredProjects = configuredProjects
	}

	if !changed && !maps.Equal(b.fileDefaultProjects, b.base.fileDefaultProjects) {
		ensureCloned()
		newProjectCollection.fileDefaultProjects = b.fileDefaultProjects
	}

	if newInferredProject, inferredProjectChanged := b.inferredProject.Finalize(); inferredProjectChanged {
		ensureCloned()
		newProjectCollection.inferredProject = newInferredProject
	}

	configFileRegistry := b.configFileRegistryBuilder.Finalize()
	newProjectCollection.configFileRegistry = configFileRegistry
	return newProjectCollection, configFileRegistry
}

func (b *ProjectCollectionBuilder) forEachProject(fn func(entry dirty.Value[*Project]) bool) {
	keepGoing := true
	b.configuredProjects.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *Project]) bool {
		keepGoing = fn(entry)
		return keepGoing
	})
	if !keepGoing {
		return
	}
	if b.inferredProject.Value() != nil {
		fn(b.inferredProject)
	}
}

func (b *ProjectCollectionBuilder) HandleAPIRequest(apiRequest *APISnapshotRequest, logger *logging.LogTree) error {
	var projectsToClose map[tspath.Path]struct{}
	if apiRequest.CloseProjects != nil {
		projectsToClose = maps.Clone(apiRequest.CloseProjects.M)
		for projectPath := range apiRequest.CloseProjects.Keys() {
			delete(b.apiOpenedProjects, projectPath)
		}
	}

	if apiRequest.OpenProjects != nil {
		for configFileName := range apiRequest.OpenProjects.Keys() {
			configPath := b.toPath(configFileName)
			if entry := b.findOrCreateProject(configFileName, configPath, projectLoadKindCreate, logger); entry != nil {
				if b.apiOpenedProjects == nil {
					b.apiOpenedProjects = make(map[tspath.Path]struct{})
				}
				b.apiOpenedProjects[configPath] = struct{}{}
				b.updateProgram(entry, logger)
			} else {
				return fmt.Errorf("project not found for open: %s", configFileName)
			}
		}
	}

	if apiRequest.UpdateProjects != nil {
		for configPath := range apiRequest.UpdateProjects.Keys() {
			if entry, ok := b.configuredProjects.Load(configPath); ok {
				b.updateProgram(entry, logger)
			} else {
				return fmt.Errorf("project not found for update: %s", configPath)
			}
		}
	}

	for _, overlay := range b.fs.overlays {
		if entry := b.findDefaultConfiguredProject(overlay.FileName(), b.toPath(overlay.FileName())); entry != nil {
			delete(projectsToClose, entry.Value().configFilePath)
		}
	}

	for projectPath := range projectsToClose {
		if entry, ok := b.configuredProjects.Load(projectPath); ok {
			b.deleteConfiguredProject(entry, logger)
		}
	}

	return nil
}

func (b *ProjectCollectionBuilder) DidChangeFiles(summary FileChangeSummary, logger *logging.LogTree) {
	changedFiles := make([]tspath.Path, 0, len(summary.Closed)+summary.Changed.Len())
	for uri, hash := range summary.Closed {
		fileName := uri.FileName()
		path := b.toPath(fileName)
		if fh := b.fs.GetFileByPath(fileName, path); fh == nil || fh.Hash() != hash {
			changedFiles = append(changedFiles, path)
		}
	}
	for uri := range summary.Changed.Keys() {
		fileName := uri.FileName()
		path := b.toPath(fileName)
		changedFiles = append(changedFiles, path)
	}

	configChangeLogger := logger.Fork("Checking for changes affecting config files")
	configChangeResult := b.configFileRegistryBuilder.DidChangeFiles(summary, configChangeLogger)
	logChangeFileResult(configChangeResult, configChangeLogger)

	b.forEachProject(func(entry dirty.Value[*Project]) bool {
		// Only consider change/delete; creates are handled by the config file registry
		if summary.HasExcessiveNonCreateWatchEvents() {
			entry.Change(func(p *Project) {
				p.dirty = true
				p.dirtyFilePath = ""
				if logger != nil {
					logger.Logf("Marking project as dirty due to excessive watch changes: %s", p.configFilePath)
				}
			})
			return true
		}

		// Handle closed and changed files
		b.markFilesChanged(entry, changedFiles, lsproto.FileChangeTypeChanged, logger)
		if entry.Value().Kind == KindInferred && len(summary.Closed) > 0 {
			rootFilesMap := entry.Value().CommandLine.FileNamesByPath()
			newRootFiles := entry.Value().CommandLine.FileNames()
			for uri := range summary.Closed {
				fileName := uri.FileName()
				path := b.toPath(fileName)
				if _, ok := rootFilesMap[path]; ok {
					newRootFiles = slices.Delete(newRootFiles, slices.Index(newRootFiles, fileName), slices.Index(newRootFiles, fileName)+1)
				}
			}
			b.updateInferredProjectRoots(newRootFiles, logger)
		}

		// Handle deleted files
		if summary.Deleted.Len() > 0 {
			deletedPaths := make([]tspath.Path, 0, summary.Deleted.Len())
			for uri := range summary.Deleted.Keys() {
				fileName := uri.FileName()
				path := b.toPath(fileName)
				deletedPaths = append(deletedPaths, path)
			}
			b.markFilesChanged(entry, deletedPaths, lsproto.FileChangeTypeDeleted, logger)
		}

		// Handle created files
		if summary.Created.Len() > 0 {
			createdPaths := make([]tspath.Path, 0, summary.Created.Len())
			for uri := range summary.Created.Keys() {
				fileName := uri.FileName()
				path := b.toPath(fileName)
				createdPaths = append(createdPaths, path)
			}
			b.markFilesChanged(entry, createdPaths, lsproto.FileChangeTypeCreated, logger)
		}

		return true
	})

	// Handle opened file
	if summary.Opened != "" {
		fileName := summary.Opened.FileName()
		path := b.toPath(fileName)
		var toRemoveProjects collections.Set[tspath.Path]
		openFileResult := b.ensureConfiguredProjectAndAncestorsForFile(fileName, path, logger)
		b.configuredProjects.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *Project]) bool {
			toRemoveProjects.Add(entry.Key())
			return true
		})
		var isReferencedBy func(project *Project, refPath tspath.Path, seenProjects *collections.Set[*Project]) bool
		isReferencedBy = func(project *Project, refPath tspath.Path, seenProjects *collections.Set[*Project]) bool {
			if !seenProjects.AddIfAbsent(project) {
				return false
			}

			if project.potentialProjectReferences != nil {
				for potentialRef := range project.potentialProjectReferences.Keys() {
					if potentialRef == refPath {
						return true
					}
				}
				for potentialRef := range project.potentialProjectReferences.Keys() {
					if refProject, foundRef := b.configuredProjects.Load(potentialRef); foundRef && isReferencedBy(refProject.Value(), refPath, seenProjects) {
						return true
					}
				}
			} else if program := project.GetProgram(); program != nil && !program.RangeResolvedProjectReference(func(referencePath tspath.Path, _ *tsoptions.ParsedCommandLine, _ *tsoptions.ParsedCommandLine, _ int) bool {
				return referencePath != refPath
			}) {
				return true
			}
			return false
		}

		retainProjectAndReferences := func(project *Project) {
			// Retain project
			toRemoveProjects.Delete(project.configFilePath)
			if program := project.GetProgram(); program != nil {
				program.RangeResolvedProjectReference(func(referencePath tspath.Path, _ *tsoptions.ParsedCommandLine, _ *tsoptions.ParsedCommandLine, _ int) bool {
					if _, ok := b.configuredProjects.Load(referencePath); ok {
						toRemoveProjects.Delete(referencePath)
					}
					return true
				})
			}
		}

		retainDefaultConfiguredProject := func(openFile string, openFilePath tspath.Path, project *Project) {
			// Retain project and its references
			retainProjectAndReferences(project)

			// Retain all the ancestor projects
			b.configFileRegistryBuilder.forEachConfigFileNameFor(openFile, openFilePath, func(configFileName string) {
				if ancestor := b.findOrCreateProject(configFileName, b.toPath(configFileName), projectLoadKindFind, logger); ancestor != nil {
					retainProjectAndReferences(ancestor.Value())
				}
			})
		}

		var inferredProjectFiles []string
		for _, overlay := range b.fs.overlays {
			openFile := overlay.FileName()
			openFilePath := b.toPath(openFile)
			if p := b.findDefaultConfiguredProject(openFile, openFilePath); p != nil {
				retainDefaultConfiguredProject(openFile, openFilePath, p.Value())
			} else {
				inferredProjectFiles = append(inferredProjectFiles, overlay.FileName())
			}
		}

		for projectPath := range toRemoveProjects.Keys() {
			if openFileResult.retain.Has(projectPath) {
				continue
			}
			if _, ok := b.apiOpenedProjects[projectPath]; ok {
				continue
			}
			if p, ok := b.configuredProjects.Load(projectPath); ok {
				b.deleteConfiguredProject(p, logger)
			}
		}
		slices.Sort(inferredProjectFiles)
		b.updateInferredProjectRoots(inferredProjectFiles, logger)
		b.configFileRegistryBuilder.Cleanup()
	}

	b.programStructureChanged = b.markProjectsAffectedByConfigChanges(configChangeResult, logger)
}

func logChangeFileResult(result changeFileResult, logger *logging.LogTree) {
	if len(result.affectedProjects) > 0 {
		logger.Logf("Config file change affected projects: %v", slices.Collect(maps.Keys(result.affectedProjects)))
	}
	if len(result.affectedFiles) > 0 {
		logger.Logf("Config file change affected config file lookups for %d files", len(result.affectedFiles))
	}
}

func (b *ProjectCollectionBuilder) DidRequestFile(uri lsproto.DocumentUri, logger *logging.LogTree) {
	startTime := time.Now()
	fileName := uri.FileName()
	path := b.toPath(fileName)
	if b.fs.isOpenFile(path) {
		hasChanges := b.programStructureChanged

		// See if we can find a default project without updating a bunch of stuff.
		if result := b.findDefaultProject(fileName, path); result != nil {
			hasChanges = b.updateProgram(result, logger) || hasChanges
			if result.Value() != nil {
				return
			}
		}

		// Make sure all projects we know about are up to date...
		b.configuredProjects.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *Project]) bool {
			hasChanges = b.updateProgram(entry, logger) || hasChanges
			return true
		})
		if hasChanges {
			// If the structure of other projects changed, we might need to move files
			// in/out of the inferred project.
			var inferredProjectFiles []string
			for path, overlay := range b.fs.overlays {
				if b.findDefaultConfiguredProject(overlay.FileName(), path) == nil {
					inferredProjectFiles = append(inferredProjectFiles, overlay.FileName())
				}
			}
			if len(inferredProjectFiles) > 0 {
				b.updateInferredProjectRoots(inferredProjectFiles, logger)
			}
		}

		if b.inferredProject.Value() != nil {
			b.updateProgram(b.inferredProject, logger)
		}

		// At this point we should be able to find the default project for the file without
		// creating anything else. Initially, I verified that and panicked if nothing was found,
		// but that panic was getting triggered by fourslash infrastructure when it told us to
		// open a package.json file. This is something the VS Code client would never do, but
		// it seems possible that another client would. There's no point in panicking; we don't
		// really even have an error condition until it tries to ask us language questions about
		// a non-TS-handleable file.
	} else {
		b.ensureConfiguredProjectAndAncestorsForFile(fileName, path, logger)
	}

	if logger != nil {
		elapsed := time.Since(startTime)
		logger.Log(fmt.Sprintf("Completed file request for %s in %v", fileName, elapsed))
	}
}

func (b *ProjectCollectionBuilder) DidRequestProject(projectId tspath.Path, logger *logging.LogTree) {
	startTime := time.Now()
	if projectId == inferredProjectName {
		// Update inferred project
		if b.inferredProject.Value() != nil {
			b.updateProgram(b.inferredProject, logger)
		}
	} else {
		if entry, ok := b.configuredProjects.Load(projectId); ok {
			b.updateProgram(entry, logger)
		}
	}

	if logger != nil {
		elapsed := time.Since(startTime)
		logger.Log(fmt.Sprintf("Completed project update request for %s in %v", projectId, elapsed))
	}
}

func (b *ProjectCollectionBuilder) DidRequestProjectTrees(projectTreeRequest *ProjectTreeRequest, logger *logging.LogTree) {
	startTime := time.Now()

	var currentProjects []tspath.Path
	b.configuredProjects.Range(func(sme *dirty.SyncMapEntry[tspath.Path, *Project]) bool {
		currentProjects = append(currentProjects, sme.Key())
		return true
	})

	var seenProjects collections.SyncSet[tspath.Path]
	wg := core.NewWorkGroup(false)
	for _, projectId := range currentProjects {
		wg.Queue(func() {
			if entry, ok := b.configuredProjects.Load(projectId); ok {
				// If this project has potential project reference for any of the project we are loading ancestor tree for
				// load this project first
				if project := entry.Value(); project != nil && (projectTreeRequest.IsAllProjects() || project.hasPotentialProjectReference(projectTreeRequest)) {
					b.updateProgram(entry, logger)
				}
				b.ensureProjectTree(wg, entry, projectTreeRequest, &seenProjects, logger)
			}
		})
	}
	wg.RunAndWait()

	if logger != nil {
		elapsed := time.Since(startTime)
		logger.Log(fmt.Sprintf("Completed project tree request for %v in %v", projectTreeRequest.Projects(), elapsed))
	}
}

func (b *ProjectCollectionBuilder) ensureProjectTree(
	wg core.WorkGroup,
	entry *dirty.SyncMapEntry[tspath.Path, *Project],
	projectTreeRequest *ProjectTreeRequest,
	seenProjects *collections.SyncSet[tspath.Path],
	logger *logging.LogTree,
) {
	if !seenProjects.AddIfAbsent(entry.Key()) {
		return
	}

	project := entry.Value()
	if project == nil {
		return
	}

	program := project.GetProgram()
	if program == nil {
		return
	}

	// If this project disables child load ignore it
	if program.CommandLine().CompilerOptions().DisableReferencedProjectLoad.IsTrue() {
		return
	}

	children := program.GetResolvedProjectReferences()
	if children == nil {
		return
	}
	for _, childConfig := range children {
		wg.Queue(func() {
			if !projectTreeRequest.IsAllProjects() && program.RangeResolvedProjectReferenceInChildConfig(
				childConfig,
				func(referencePath tspath.Path, config *tsoptions.ParsedCommandLine, _ *tsoptions.ParsedCommandLine, _ int) bool {
					return !projectTreeRequest.IsProjectReferenced(referencePath)
				}) {
				return
			}

			// Load this child project since this is referenced
			childProjectEntry := b.findOrCreateProject(childConfig.ConfigName(), childConfig.ConfigFile.SourceFile.Path(), projectLoadKindCreate, logger)
			b.updateProgram(childProjectEntry, logger)

			// Ensure children for this project
			b.ensureProjectTree(wg, childProjectEntry, projectTreeRequest, seenProjects, logger)
		})
	}
}

func (b *ProjectCollectionBuilder) DidUpdateATAState(ataChanges map[tspath.Path]*ATAStateChange, logger *logging.LogTree) {
	updateProject := func(project dirty.Value[*Project], ataChange *ATAStateChange) {
		project.ChangeIf(
			func(p *Project) bool {
				if p == nil {
					return false
				}
				// Consistency check: the ATA demands (project options, unresolved imports) of this project
				// has not changed since the time the ATA request was dispatched; the change can still be
				// applied to this project in its current state.
				return ataChange.TypingsInfo.Equals(p.ComputeTypingsInfo())
			},
			func(p *Project) {
				// We checked before triggering this change (in Session.triggerATAForUpdatedProjects) that
				// the set of typings files is actually different.
				p.installedTypingsInfo = ataChange.TypingsInfo
				p.typingsFiles = ataChange.TypingsFiles
				typingsWatchGlobs := getTypingsLocationsGlobs(
					ataChange.TypingsFilesToWatch,
					b.sessionOptions.TypingsLocation,
					b.sessionOptions.CurrentDirectory,
					p.currentDirectory,
					b.fs.fs.UseCaseSensitiveFileNames(),
				)
				p.typingsWatch = p.typingsWatch.Clone(typingsWatchGlobs)
				p.dirty = true
				p.dirtyFilePath = ""
			},
		)
	}

	for projectPath, ataChange := range ataChanges {
		logger.Embed(ataChange.Logs)
		if projectPath == inferredProjectName {
			updateProject(b.inferredProject, ataChange)
		} else if project, ok := b.configuredProjects.Load(projectPath); ok {
			updateProject(project, ataChange)
		}

		if logger != nil {
			logger.Log(fmt.Sprintf("Updated ATA state for project %s", projectPath))
		}
	}
}

func (b *ProjectCollectionBuilder) markProjectsAffectedByConfigChanges(
	configChangeResult changeFileResult,
	logger *logging.LogTree,
) bool {
	for projectPath := range configChangeResult.affectedProjects {
		project, ok := b.configuredProjects.Load(projectPath)
		if !ok {
			panic(fmt.Sprintf("project %s affected by config change not found", projectPath))
		}
		project.ChangeIf(
			func(p *Project) bool { return !p.dirty || p.dirtyFilePath != "" },
			func(p *Project) {
				p.dirty = true
				p.dirtyFilePath = ""
				if logger != nil {
					logger.Logf("Marking project %s as dirty due to change affecting config", projectPath)
				}
			},
		)
	}

	// Recompute default projects for open files that now have different config file presence.
	var hasChanges bool
	for path := range configChangeResult.affectedFiles {
		fileName := b.fs.overlays[path].FileName()
		_ = b.ensureConfiguredProjectAndAncestorsForFile(fileName, path, logger)
		hasChanges = true
	}

	return hasChanges
}

func (b *ProjectCollectionBuilder) findDefaultProject(fileName string, path tspath.Path) dirty.Value[*Project] {
	if configuredProject := b.findDefaultConfiguredProject(fileName, path); configuredProject != nil {
		return configuredProject
	}
	if key, ok := b.fileDefaultProjects[path]; ok && key == inferredProjectName {
		return b.inferredProject
	}
	if inferredProject := b.inferredProject.Value(); inferredProject != nil && inferredProject.containsFile(path) {
		if b.fileDefaultProjects == nil {
			b.fileDefaultProjects = make(map[tspath.Path]tspath.Path)
		}
		b.fileDefaultProjects[path] = inferredProjectName
		return b.inferredProject
	}
	return nil
}

func (b *ProjectCollectionBuilder) findDefaultConfiguredProject(fileName string, path tspath.Path) *dirty.SyncMapEntry[tspath.Path, *Project] {
	// !!! look in fileDefaultProjects first?
	// Sort configured projects so we can use a deterministic "first" as a last resort.
	var configuredProjectPaths []tspath.Path
	configuredProjects := make(map[tspath.Path]*dirty.SyncMapEntry[tspath.Path, *Project])
	b.configuredProjects.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *Project]) bool {
		configuredProjectPaths = append(configuredProjectPaths, entry.Key())
		configuredProjects[entry.Key()] = entry
		return true
	})
	slices.Sort(configuredProjectPaths)

	project, multipleCandidates := findDefaultConfiguredProjectFromProgramInclusion(fileName, path, configuredProjectPaths, func(path tspath.Path) *Project {
		return configuredProjects[path].Value()
	})

	if multipleCandidates {
		if p := b.findOrCreateDefaultConfiguredProjectForFile(fileName, path, projectLoadKindFind, nil).project; p != nil {
			return p
		}
	}

	return configuredProjects[project]
}

func (b *ProjectCollectionBuilder) ensureConfiguredProjectAndAncestorsForFile(fileName string, path tspath.Path, logger *logging.LogTree) searchResult {
	result := b.findOrCreateDefaultConfiguredProjectForFile(fileName, path, projectLoadKindCreate, logger)
	if result.project != nil && b.fs.isOpenFile(path) {
		b.createAncestorTree(fileName, path, &result, logger)
	}
	return result
}

func (b *ProjectCollectionBuilder) createAncestorTree(fileName string, path tspath.Path, openResult *searchResult, logger *logging.LogTree) {
	project := openResult.project.Value()
	for {
		// Skip if project is not composite and we are only looking for solution
		if project.CommandLine != nil &&
			(!project.CommandLine.CompilerOptions().Composite.IsTrue() ||
				project.CommandLine.CompilerOptions().DisableSolutionSearching.IsTrue()) {
			return
		}

		// Get config file name
		ancestorConfigName := b.configFileRegistryBuilder.getAncestorConfigFileName(fileName, path, project.configFileName, logger)
		if ancestorConfigName == "" {
			return
		}

		// find or delay load the project
		ancestorPath := b.toPath(ancestorConfigName)
		ancestor := b.findOrCreateProject(ancestorConfigName, ancestorPath, projectLoadKindCreate, logger)
		if ancestor == nil {
			return
		}

		openResult.retain.Add(ancestorPath)

		// If this ancestor is new and was not updated because we are just creating it for future loading
		// eg when invoking find all references or rename that could span multiple projects
		// we would make the current project as its potential project reference
		if ancestor.Value().CommandLine == nil &&
			(project.CommandLine == nil || project.CommandLine.CompilerOptions().Composite.IsTrue()) {
			ancestor.Change(func(ancestorProject *Project) {
				ancestorProject.setPotentialProjectReference(project.configFilePath)
			})
		}

		project = ancestor.Value()
	}
}

type searchNode struct {
	configFileName string
	loadKind       projectLoadKind
	logger         *logging.LogTree
}

type searchNodeKey struct {
	configFileName string
	loadKind       projectLoadKind
}

type searchResult struct {
	project *dirty.SyncMapEntry[tspath.Path, *Project]
	retain  collections.Set[tspath.Path]
}

func (b *ProjectCollectionBuilder) findOrCreateDefaultConfiguredProjectWorker(
	fileName string,
	path tspath.Path,
	configFileName string,
	loadKind projectLoadKind,
	visited *collections.SyncSet[searchNodeKey],
	fallback *searchResult,
	logger *logging.LogTree,
) searchResult {
	var configs collections.SyncMap[tspath.Path, *tsoptions.ParsedCommandLine]
	if visited == nil {
		visited = &collections.SyncSet[searchNodeKey]{}
	}

	search := core.BreadthFirstSearchParallelEx(
		searchNode{configFileName: configFileName, loadKind: loadKind, logger: logger},
		func(node searchNode) []searchNode {
			if config, ok := configs.Load(b.toPath(node.configFileName)); ok && len(config.ProjectReferences()) > 0 {
				referenceLoadKind := node.loadKind
				if config.CompilerOptions().DisableReferencedProjectLoad.IsTrue() {
					referenceLoadKind = projectLoadKindFind
				}

				var refLogger *logging.LogTree
				references := config.ResolvedProjectReferencePaths()
				if len(references) > 0 && node.logger != nil {
					refLogger = node.logger.Fork(fmt.Sprintf("Searching %d project references of %s", len(references), node.configFileName))
				}
				return core.Map(references, func(configFileName string) searchNode {
					return searchNode{configFileName: configFileName, loadKind: referenceLoadKind, logger: refLogger.Fork("Searching project reference " + configFileName)}
				})
			}
			return nil
		},
		func(node searchNode) (isResult bool, stop bool) {
			configFilePath := b.toPath(node.configFileName)
			config := b.configFileRegistryBuilder.findOrAcquireConfigForFile(node.configFileName, configFilePath, path, node.loadKind, node.logger.Fork("Acquiring config for open file"))
			if config == nil {
				node.logger.Log("Config file for project does not already exist")
				return false, false
			}
			configs.Store(configFilePath, config)
			if len(config.FileNames()) == 0 {
				// Likely a solution tsconfig.json - the search will fan out to its references.
				node.logger.Log("Project does not contain file (no root files)")
				return false, false
			}

			if config.CompilerOptions().Composite == core.TSTrue {
				// For composite projects, we can get an early negative result.
				// !!! what about declaration files in node_modules? wouldn't it be better to
				//     check project inclusion if the project is already loaded?
				if _, ok := config.FileNamesByPath()[path]; !ok {
					node.logger.Log("Project does not contain file (by composite config inclusion)")
					return false, false
				}
			}

			project := b.findOrCreateProject(node.configFileName, configFilePath, node.loadKind, node.logger)
			if project == nil {
				node.logger.Log("Project does not already exist")
				return false, false
			}

			if node.loadKind == projectLoadKindCreate {
				// Ensure project is up to date before checking for file inclusion
				b.updateProgram(project, node.logger)
			}

			if project.Value().containsFile(path) {
				isDirectInclusion := !project.Value().IsSourceFromProjectReference(path)
				if node.logger != nil {
					node.logger.Logf("Project contains file %s", core.IfElse(isDirectInclusion, "directly", "as a source of a referenced project"))
				}
				return true, isDirectInclusion
			}

			node.logger.Log("Project does not contain file")
			return false, false
		},
		core.BreadthFirstSearchOptions[searchNodeKey, searchNode]{
			Visited: visited,
			PreprocessLevel: func(level *core.BreadthFirstSearchLevel[searchNodeKey, searchNode]) {
				level.Range(func(node searchNode) bool {
					if node.loadKind == projectLoadKindFind && level.Has(searchNodeKey{configFileName: node.configFileName, loadKind: projectLoadKindCreate}) {
						// Remove find requests when a create request for the same project is already present.
						level.Delete(searchNodeKey{configFileName: node.configFileName, loadKind: node.loadKind})
					}
					return true
				})
			},
		},
		func(node searchNode) searchNodeKey {
			return searchNodeKey{configFileName: node.configFileName, loadKind: node.loadKind}
		},
	)

	var retain collections.Set[tspath.Path]
	var project *dirty.SyncMapEntry[tspath.Path, *Project]
	if len(search.Path) > 0 {
		project, _ = b.configuredProjects.Load(b.toPath(search.Path[0].configFileName))
		// If we found a project, we retain each project along the BFS path.
		// We don't want to retain everything we visited since BFS can terminate
		// early, and we don't want to retain nondeterministically.
		for _, node := range search.Path {
			retain.Add(b.toPath(node.configFileName))
		}
	}

	if search.Stopped {
		// Found a project that directly contains the file.
		return searchResult{
			project: project,
			retain:  retain,
		}
	}

	if project != nil {
		// If we found a project that contains the file, but it is a source from
		// a project reference, record it as a fallback.
		fallback = &searchResult{
			project: project,
			retain:  retain,
		}
	}

	// Look for tsconfig.json files higher up the directory tree and do the same. This handles
	// the common case where a higher-level "solution" tsconfig.json contains all projects in a
	// workspace.
	if config, ok := configs.Load(b.toPath(configFileName)); ok && config.CompilerOptions().DisableSolutionSearching.IsTrue() {
		if fallback != nil {
			return *fallback
		}
	}
	if ancestorConfigName := b.configFileRegistryBuilder.getAncestorConfigFileName(fileName, path, configFileName, logger); ancestorConfigName != "" {
		return b.findOrCreateDefaultConfiguredProjectWorker(
			fileName,
			path,
			ancestorConfigName,
			loadKind,
			visited,
			fallback,
			logger.Fork("Searching ancestor config file at "+ancestorConfigName),
		)
	}
	if fallback != nil {
		return *fallback
	}
	// If we didn't find anything, we can retain everything we visited,
	// since the whole graph must have been traversed (i.e., the set of
	// retained projects is guaranteed to be deterministic).
	visited.Range(func(node searchNodeKey) bool {
		retain.Add(b.toPath(node.configFileName))
		return true
	})
	return searchResult{retain: retain}
}

func (b *ProjectCollectionBuilder) findOrCreateDefaultConfiguredProjectForFile(
	fileName string,
	path tspath.Path,
	loadKind projectLoadKind,
	logger *logging.LogTree,
) searchResult {
	if key, ok := b.fileDefaultProjects[path]; ok {
		if key == inferredProjectName {
			// The file belongs to the inferred project
			return searchResult{}
		}
		entry, _ := b.configuredProjects.Load(key)
		return searchResult{project: entry}
	}
	if configFileName := b.configFileRegistryBuilder.getConfigFileNameForFile(fileName, path, logger); configFileName != "" {
		startTime := time.Now()
		result := b.findOrCreateDefaultConfiguredProjectWorker(
			fileName,
			path,
			configFileName,
			loadKind,
			nil,
			nil,
			logger.Fork("Searching for default configured project for "+fileName),
		)
		if result.project != nil {
			if b.fileDefaultProjects == nil {
				b.fileDefaultProjects = make(map[tspath.Path]tspath.Path)
			}
			b.fileDefaultProjects[path] = result.project.Value().configFilePath
		}
		if logger != nil {
			elapsed := time.Since(startTime)
			if result.project != nil {
				logger.Log(fmt.Sprintf("Found default configured project for %s: %s (in %v)", fileName, result.project.Value().configFileName, elapsed))
			} else {
				logger.Log(fmt.Sprintf("No default configured project found for %s (searched in %v)", fileName, elapsed))
			}
		}
		return result
	}
	return searchResult{}
}

func (b *ProjectCollectionBuilder) findOrCreateProject(
	configFileName string,
	configFilePath tspath.Path,
	loadKind projectLoadKind,
	logger *logging.LogTree,
) *dirty.SyncMapEntry[tspath.Path, *Project] {
	if loadKind == projectLoadKindFind {
		entry, _ := b.configuredProjects.Load(configFilePath)
		return entry
	}
	entry, _ := b.configuredProjects.LoadOrStore(configFilePath, NewConfiguredProject(configFileName, configFilePath, b, logger))
	return entry
}

func (b *ProjectCollectionBuilder) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, b.sessionOptions.CurrentDirectory, b.fs.fs.UseCaseSensitiveFileNames())
}

func (b *ProjectCollectionBuilder) updateInferredProjectRoots(rootFileNames []string, logger *logging.LogTree) bool {
	if len(rootFileNames) == 0 {
		if b.inferredProject.Value() != nil {
			if logger != nil {
				logger.Log("Deleting inferred project")
			}
			b.inferredProject.Delete()
			return true
		}
		return false
	}

	if b.inferredProject.Value() == nil {
		b.inferredProject.Set(NewInferredProject(b.sessionOptions.CurrentDirectory, b.compilerOptionsForInferredProjects, rootFileNames, b, logger))
	} else {
		newCompilerOptions := b.inferredProject.Value().CommandLine.CompilerOptions()
		if b.compilerOptionsForInferredProjects != nil {
			newCompilerOptions = b.compilerOptionsForInferredProjects
		}
		newCommandLine := tsoptions.NewParsedCommandLine(newCompilerOptions, rootFileNames, tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: b.fs.fs.UseCaseSensitiveFileNames(),
			CurrentDirectory:          b.sessionOptions.CurrentDirectory,
		})
		changed := b.inferredProject.ChangeIf(
			func(p *Project) bool {
				return !maps.Equal(p.CommandLine.FileNamesByPath(), newCommandLine.FileNamesByPath())
			},
			func(p *Project) {
				if logger != nil {
					logger.Log(fmt.Sprintf("Updating inferred project config with %d root files", len(rootFileNames)))
				}
				p.CommandLine = newCommandLine
				p.commandLineWithTypingsFiles = nil
				p.dirty = true
				p.dirtyFilePath = ""
			},
		)
		if !changed {
			return false
		}
	}
	return true
}

// updateProgram updates the program for the given project entry if necessary. It returns
// a boolean indicating whether the update could have caused any structure-affecting changes.
func (b *ProjectCollectionBuilder) updateProgram(entry dirty.Value[*Project], logger *logging.LogTree) bool {
	var updateProgram bool
	var filesChanged bool
	configFileName := entry.Value().configFileName
	startTime := time.Now()
	entry.Locked(func(entry dirty.Value[*Project]) {
		if entry.Value().Kind == KindConfigured {
			commandLine := b.configFileRegistryBuilder.acquireConfigForProject(
				entry.Value().configFileName,
				entry.Value().configFilePath,
				entry.Value(),
				logger.Fork("Acquiring config for project"),
			)
			if entry.Value().CommandLine != commandLine {
				updateProgram = true
				if commandLine == nil {
					b.deleteConfiguredProject(entry, logger)
					filesChanged = true
					return
				}
				entry.Change(func(p *Project) {
					p.CommandLine = commandLine
					p.commandLineWithTypingsFiles = nil
					p.potentialProjectReferences = nil
				})
			}
		}
		if !updateProgram {
			updateProgram = entry.Value().dirty
		}
		if updateProgram {
			entry.Change(func(project *Project) {
				oldHost := project.host
				project.host = newCompilerHost(project.currentDirectory, project, b, logger.Fork("CompilerHost"))
				result := project.CreateProgram()
				project.Program = result.Program
				project.checkerPool = result.CheckerPool
				project.ProgramUpdateKind = result.UpdateKind
				project.ProgramLastUpdate = b.newSnapshotID
				if result.UpdateKind == ProgramUpdateKindCloned {
					project.host.seenFiles = oldHost.seenFiles
				}
				if result.UpdateKind == ProgramUpdateKindNewFiles {
					filesChanged = true
					if b.sessionOptions.WatchEnabled {
						programFilesWatch, failedLookupsWatch, affectingLocationsWatch := project.CloneWatchers(b.sessionOptions.CurrentDirectory, b.sessionOptions.DefaultLibraryPath)
						project.programFilesWatch = programFilesWatch
						project.failedLookupsWatch = failedLookupsWatch
						project.affectingLocationsWatch = affectingLocationsWatch
					}
				}
				project.dirty = false
				project.dirtyFilePath = ""
			})
		}
	})
	if updateProgram && logger != nil {
		elapsed := time.Since(startTime)
		logger.Log(fmt.Sprintf("Program update for %s completed in %v", configFileName, elapsed))
	}
	return filesChanged
}

func (b *ProjectCollectionBuilder) markFilesChanged(entry dirty.Value[*Project], paths []tspath.Path, changeType lsproto.FileChangeType, logger *logging.LogTree) {
	var dirty bool
	var dirtyFilePath tspath.Path
	entry.ChangeIf(
		func(p *Project) bool {
			if p.Program == nil || p.dirty && p.dirtyFilePath == "" {
				return false
			}

			dirtyFilePath = p.dirtyFilePath
			for _, path := range paths {
				if changeType == lsproto.FileChangeTypeCreated {
					if _, ok := p.affectingLocationsWatch.input[path]; ok {
						dirty = true
						dirtyFilePath = ""
						break
					}
					if _, ok := p.failedLookupsWatch.input[path]; ok {
						dirty = true
						dirtyFilePath = ""
						break
					}
				} else if p.containsFile(path) {
					dirty = true
					if changeType == lsproto.FileChangeTypeDeleted {
						dirtyFilePath = ""
						break
					}
					if dirtyFilePath == "" {
						dirtyFilePath = path
					} else if dirtyFilePath != path {
						dirtyFilePath = ""
						break
					}
				}
			}
			return dirty || p.dirtyFilePath != dirtyFilePath
		},
		func(p *Project) {
			p.dirty = true
			p.dirtyFilePath = dirtyFilePath
			if logger != nil {
				if dirtyFilePath != "" {
					logger.Logf("Marking project %s as dirty due to changes in %s", p.configFileName, dirtyFilePath)
				} else {
					logger.Logf("Marking project %s as dirty", p.configFileName)
				}
			}
		},
	)
}

func (b *ProjectCollectionBuilder) deleteConfiguredProject(project dirty.Value[*Project], logger *logging.LogTree) {
	projectPath := project.Value().configFilePath
	if logger != nil {
		logger.Log("Deleting configured project: " + project.Value().configFileName)
	}
	if program := project.Value().Program; program != nil {
		program.RangeResolvedProjectReference(func(referencePath tspath.Path, config *tsoptions.ParsedCommandLine, _ *tsoptions.ParsedCommandLine, _ int) bool {
			b.configFileRegistryBuilder.releaseConfigForProject(referencePath, projectPath)
			return true
		})
	}
	b.configFileRegistryBuilder.releaseConfigForProject(projectPath, projectPath)
	project.Delete()
}
