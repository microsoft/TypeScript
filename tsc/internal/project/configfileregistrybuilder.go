package project

import (
	"fmt"
	"maps"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/project/dirty"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

var (
	_ tsoptions.ParseConfigHost     = (*configFileRegistryBuilder)(nil)
	_ tsoptions.ExtendedConfigCache = (*configFileRegistryBuilder)(nil)
)

// configFileRegistryBuilder tracks changes made on top of a previous
// configFileRegistry, producing a new clone with `finalize()` after
// all changes have been made.
type configFileRegistryBuilder struct {
	fs                  *snapshotFSBuilder
	extendedConfigCache *extendedConfigCache
	sessionOptions      *SessionOptions

	base            *ConfigFileRegistry
	configs         *dirty.SyncMap[tspath.Path, *configFileEntry]
	configFileNames *dirty.Map[tspath.Path, *configFileNames]
}

func newConfigFileRegistryBuilder(
	fs *snapshotFSBuilder,
	oldConfigFileRegistry *ConfigFileRegistry,
	extendedConfigCache *extendedConfigCache,
	sessionOptions *SessionOptions,
	logger *logging.LogTree,
) *configFileRegistryBuilder {
	return &configFileRegistryBuilder{
		fs:                  fs,
		base:                oldConfigFileRegistry,
		sessionOptions:      sessionOptions,
		extendedConfigCache: extendedConfigCache,

		configs:         dirty.NewSyncMap(oldConfigFileRegistry.configs, nil),
		configFileNames: dirty.NewMap(oldConfigFileRegistry.configFileNames),
	}
}

// Finalize creates a new configFileRegistry based on the changes made in the builder.
// If no changes were made, it returns the original base registry.
func (c *configFileRegistryBuilder) Finalize() *ConfigFileRegistry {
	var changed bool
	newRegistry := c.base
	ensureCloned := func() {
		if !changed {
			newRegistry = newRegistry.clone()
			changed = true
		}
	}

	if configs, changedConfigs := c.configs.Finalize(); changedConfigs {
		ensureCloned()
		newRegistry.configs = configs
	}

	if configFileNames, changedNames := c.configFileNames.Finalize(); changedNames {
		ensureCloned()
		newRegistry.configFileNames = configFileNames
	}

	return newRegistry
}

func (c *configFileRegistryBuilder) findOrAcquireConfigForOpenFile(
	configFileName string,
	configFilePath tspath.Path,
	openFilePath tspath.Path,
	loadKind projectLoadKind,
	logger *logging.LogTree,
) *tsoptions.ParsedCommandLine {
	switch loadKind {
	case projectLoadKindFind:
		if entry, ok := c.configs.Load(configFilePath); ok {
			return entry.Value().commandLine
		}
		return nil
	case projectLoadKindCreate:
		return c.acquireConfigForOpenFile(configFileName, configFilePath, openFilePath, logger)
	default:
		panic(fmt.Sprintf("unknown project load kind: %d", loadKind))
	}
}

// reloadIfNeeded updates the command line of the config file entry based on its
// pending reload state. This function should only be called from within the
// Change() method of a dirty map entry.
func (c *configFileRegistryBuilder) reloadIfNeeded(entry *configFileEntry, fileName string, path tspath.Path, logger *logging.LogTree) {
	switch entry.pendingReload {
	case PendingReloadFileNames:
		logger.Log("Reloading file names for config: " + fileName)
		entry.commandLine = entry.commandLine.ReloadFileNamesOfParsedCommandLine(c.fs.fs)
	case PendingReloadFull:
		logger.Log("Loading config file: " + fileName)
		entry.commandLine, _ = tsoptions.GetParsedCommandLineOfConfigFilePath(fileName, path, nil, c, c)
		c.updateExtendingConfigs(path, entry.commandLine, entry.commandLine)
		c.updateRootFilesWatch(fileName, entry)
		logger.Log("Finished loading config file")
	default:
		return
	}
	entry.pendingReload = PendingReloadNone
}

func (c *configFileRegistryBuilder) updateExtendingConfigs(extendingConfigPath tspath.Path, newCommandLine *tsoptions.ParsedCommandLine, oldCommandLine *tsoptions.ParsedCommandLine) {
	var newExtendedConfigPaths collections.Set[tspath.Path]
	if newCommandLine != nil {
		for _, extendedConfig := range newCommandLine.ExtendedSourceFiles() {
			extendedConfigPath := c.fs.toPath(extendedConfig)
			newExtendedConfigPaths.Add(extendedConfigPath)
			entry, loaded := c.configs.LoadOrStore(extendedConfigPath, newExtendedConfigFileEntry(extendingConfigPath))
			if loaded {
				entry.ChangeIf(
					func(config *configFileEntry) bool {
						_, alreadyRetaining := config.retainingConfigs[extendingConfigPath]
						return !alreadyRetaining
					},
					func(config *configFileEntry) {
						if config.retainingConfigs == nil {
							config.retainingConfigs = make(map[tspath.Path]struct{})
						}
						config.retainingConfigs[extendingConfigPath] = struct{}{}
					},
				)
			}
		}
	}
	if oldCommandLine != nil {
		for _, extendedConfig := range oldCommandLine.ExtendedSourceFiles() {
			extendedConfigPath := c.fs.toPath(extendedConfig)
			if newExtendedConfigPaths.Has(extendedConfigPath) {
				continue
			}
			if entry, ok := c.configs.Load(extendedConfigPath); ok {
				entry.ChangeIf(
					func(config *configFileEntry) bool {
						_, exists := config.retainingConfigs[extendingConfigPath]
						return exists
					},
					func(config *configFileEntry) {
						delete(config.retainingConfigs, extendingConfigPath)
					},
				)
			}
		}
	}
}

func (c *configFileRegistryBuilder) updateRootFilesWatch(fileName string, entry *configFileEntry) {
	if entry.rootFilesWatch == nil {
		return
	}

	var ignored map[string]struct{}
	var globs []string
	var externalDirectories []string
	var includeWorkspace bool
	var includeTsconfigDir bool
	tsconfigDir := tspath.GetDirectoryPath(fileName)
	wildcardDirectories := entry.commandLine.WildcardDirectories()
	comparePathsOptions := tspath.ComparePathsOptions{
		CurrentDirectory:          c.sessionOptions.CurrentDirectory,
		UseCaseSensitiveFileNames: c.FS().UseCaseSensitiveFileNames(),
	}
	for dir := range wildcardDirectories {
		if tspath.ContainsPath(c.sessionOptions.CurrentDirectory, dir, comparePathsOptions) {
			includeWorkspace = true
		} else if tspath.ContainsPath(tsconfigDir, dir, comparePathsOptions) {
			includeTsconfigDir = true
		} else {
			externalDirectories = append(externalDirectories, dir)
		}
	}
	for _, fileName := range entry.commandLine.LiteralFileNames() {
		if tspath.ContainsPath(c.sessionOptions.CurrentDirectory, fileName, comparePathsOptions) {
			includeWorkspace = true
		} else if tspath.ContainsPath(tsconfigDir, fileName, comparePathsOptions) {
			includeTsconfigDir = true
		} else {
			externalDirectories = append(externalDirectories, tspath.GetDirectoryPath(fileName))
		}
	}

	if includeWorkspace {
		globs = append(globs, getRecursiveGlobPattern(c.sessionOptions.CurrentDirectory))
	}
	if includeTsconfigDir {
		globs = append(globs, getRecursiveGlobPattern(tsconfigDir))
	}
	for _, fileName := range entry.commandLine.ExtendedSourceFiles() {
		if includeWorkspace && tspath.ContainsPath(c.sessionOptions.CurrentDirectory, fileName, comparePathsOptions) {
			continue
		}
		globs = append(globs, fileName)
	}
	if len(externalDirectories) > 0 {
		commonParents, ignoredExternalDirs := tspath.GetCommonParents(externalDirectories, minWatchLocationDepth, getPathComponentsForWatching, comparePathsOptions)
		for _, parent := range commonParents {
			globs = append(globs, getRecursiveGlobPattern(parent))
		}
		ignored = ignoredExternalDirs
	}

	slices.Sort(globs)
	entry.rootFilesWatch = entry.rootFilesWatch.Clone(patternsAndIgnored{
		patterns: globs,
		ignored:  ignored,
	})
}

// acquireConfigForProject loads a config file entry from the cache, or parses it if not already
// cached, then adds the project (if provided) to `retainingProjects` to keep it alive
// in the cache. Each `acquireConfigForProject` call that passes a `project` should be accompanied
// by an eventual `releaseConfigForProject` call with the same project.
func (c *configFileRegistryBuilder) acquireConfigForProject(fileName string, path tspath.Path, project *Project, logger *logging.LogTree) *tsoptions.ParsedCommandLine {
	entry, _ := c.configs.LoadOrStore(path, newConfigFileEntry(fileName))
	var needsRetainProject bool
	entry.ChangeIf(
		func(config *configFileEntry) bool {
			_, alreadyRetaining := config.retainingProjects[project.configFilePath]
			needsRetainProject = !alreadyRetaining
			return needsRetainProject || config.pendingReload != PendingReloadNone
		},
		func(config *configFileEntry) {
			if needsRetainProject {
				if config.retainingProjects == nil {
					config.retainingProjects = make(map[tspath.Path]struct{})
				}
				config.retainingProjects[project.configFilePath] = struct{}{}
			}
			c.reloadIfNeeded(config, fileName, path, logger)
		},
	)
	return entry.Value().commandLine
}

// acquireConfigForOpenFile loads a config file entry from the cache, or parses it if not already
// cached, then adds the open file to `retainingOpenFiles` to keep it alive in the cache.
// Each `acquireConfigForOpenFile` call that passes an `openFilePath`
// should be accompanied by an eventual `releaseConfigForOpenFile` call with the same open file.
func (c *configFileRegistryBuilder) acquireConfigForOpenFile(configFileName string, configFilePath tspath.Path, openFilePath tspath.Path, logger *logging.LogTree) *tsoptions.ParsedCommandLine {
	entry, _ := c.configs.LoadOrStore(configFilePath, newConfigFileEntry(configFileName))
	var needsRetainOpenFile bool
	entry.ChangeIf(
		func(config *configFileEntry) bool {
			_, alreadyRetaining := config.retainingOpenFiles[openFilePath]
			needsRetainOpenFile = !alreadyRetaining
			return needsRetainOpenFile || config.pendingReload != PendingReloadNone
		},
		func(config *configFileEntry) {
			if needsRetainOpenFile {
				if config.retainingOpenFiles == nil {
					config.retainingOpenFiles = make(map[tspath.Path]struct{})
				}
				config.retainingOpenFiles[openFilePath] = struct{}{}
			}
			c.reloadIfNeeded(config, configFileName, configFilePath, logger)
		},
	)
	return entry.Value().commandLine
}

// releaseConfigForProject removes the project from the config entry. Once no projects
// or files are associated with the config entry, it will be removed on the next call to `cleanup`.
func (c *configFileRegistryBuilder) releaseConfigForProject(configFilePath tspath.Path, projectPath tspath.Path) {
	if entry, ok := c.configs.Load(configFilePath); ok {
		entry.ChangeIf(
			func(config *configFileEntry) bool {
				_, exists := config.retainingProjects[projectPath]
				return exists
			},
			func(config *configFileEntry) {
				delete(config.retainingProjects, projectPath)
			},
		)
	}
}

// didCloseFile removes the open file from the config entry. Once no projects
// or files are associated with the config entry, it will be removed on the next call to `cleanup`.
func (c *configFileRegistryBuilder) didCloseFile(path tspath.Path) {
	c.configFileNames.Delete(path)
	c.configs.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *configFileEntry]) bool {
		entry.ChangeIf(
			func(config *configFileEntry) bool {
				_, ok := config.retainingOpenFiles[path]
				return ok
			},
			func(config *configFileEntry) {
				delete(config.retainingOpenFiles, path)
			},
		)
		return true
	})
}

type changeFileResult struct {
	affectedProjects map[tspath.Path]struct{}
	affectedFiles    map[tspath.Path]struct{}
}

func (r changeFileResult) IsEmpty() bool {
	return len(r.affectedProjects) == 0 && len(r.affectedFiles) == 0
}

func (c *configFileRegistryBuilder) DidChangeFiles(summary FileChangeSummary, logger *logging.LogTree) changeFileResult {
	var affectedProjects map[tspath.Path]struct{}
	var affectedFiles map[tspath.Path]struct{}
	logger.Log("Summarizing file changes")
	createdFiles := make(map[tspath.Path]string, summary.Created.Len())
	createdOrDeletedFiles := make(map[tspath.Path]struct{}, summary.Created.Len()+summary.Deleted.Len())
	createdOrChangedOrDeletedFiles := make(map[tspath.Path]struct{}, summary.Changed.Len()+summary.Deleted.Len())
	for uri := range summary.Changed.Keys() {
		if tspath.ContainsIgnoredPath(string(uri)) {
			continue
		}
		fileName := uri.FileName()
		path := c.fs.toPath(fileName)
		createdOrDeletedFiles[path] = struct{}{}
		createdOrChangedOrDeletedFiles[path] = struct{}{}
	}
	for uri := range summary.Deleted.Keys() {
		if tspath.ContainsIgnoredPath(string(uri)) {
			continue
		}
		fileName := uri.FileName()
		path := c.fs.toPath(fileName)
		createdOrDeletedFiles[path] = struct{}{}
		createdOrChangedOrDeletedFiles[path] = struct{}{}
	}
	for uri := range summary.Created.Keys() {
		if tspath.ContainsIgnoredPath(string(uri)) {
			continue
		}
		fileName := uri.FileName()
		path := c.fs.toPath(fileName)
		createdFiles[path] = fileName
		createdOrDeletedFiles[path] = struct{}{}
		createdOrChangedOrDeletedFiles[path] = struct{}{}
	}

	// Handle closed files - this ranges over config entries and could be combined
	// with the file change handling, but a separate loop is simpler and a snapshot
	// change with both closing and watch changes seems rare.
	for uri := range summary.Closed {
		fileName := uri.FileName()
		path := c.fs.toPath(fileName)
		c.didCloseFile(path)
	}

	// Handle changes to stored config files
	logger.Log("Checking if any changed files are config files")
	for path := range createdOrChangedOrDeletedFiles {
		if entry, ok := c.configs.Load(path); ok {
			affectedProjects = core.CopyMapInto(affectedProjects, c.handleConfigChange(entry, logger))
			for extendingConfigPath := range entry.Value().retainingConfigs {
				if extendingConfigEntry, ok := c.configs.Load(extendingConfigPath); ok {
					affectedProjects = core.CopyMapInto(affectedProjects, c.handleConfigChange(extendingConfigEntry, logger))
				}
			}
			// This was a config file, so assume it's not also a root file
			delete(createdFiles, path)
		}
	}

	// Handle possible root file creation
	if len(createdFiles) > 0 {
		c.configs.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *configFileEntry]) bool {
			entry.ChangeIf(
				func(config *configFileEntry) bool {
					if config.commandLine == nil || config.rootFilesWatch == nil || config.pendingReload != PendingReloadNone {
						return false
					}
					logger.Logf("Checking if any of %d created files match root files for config %s", len(createdFiles), entry.Key())
					for _, fileName := range createdFiles {
						if config.commandLine.PossiblyMatchesFileName(fileName) {
							return true
						}
					}
					return false
				},
				func(config *configFileEntry) {
					config.pendingReload = PendingReloadFileNames
					if affectedProjects == nil {
						affectedProjects = make(map[tspath.Path]struct{})
					}
					maps.Copy(affectedProjects, config.retainingProjects)
					logger.Logf("Root files for config %s changed", entry.Key())
				},
			)
			return true
		})
	}

	// Handle created/deleted files named "tsconfig.json" or "jsconfig.json"
	for path := range createdOrDeletedFiles {
		baseName := tspath.GetBaseFileName(string(path))
		if baseName == "tsconfig.json" || baseName == "jsconfig.json" {
			directoryPath := path.GetDirectoryPath()
			c.configFileNames.Range(func(entry *dirty.MapEntry[tspath.Path, *configFileNames]) bool {
				if directoryPath.ContainsPath(entry.Key()) {
					if affectedFiles == nil {
						affectedFiles = make(map[tspath.Path]struct{})
					}
					affectedFiles[entry.Key()] = struct{}{}
					entry.Delete()
				}
				return true
			})
		}
	}

	return changeFileResult{
		affectedProjects: affectedProjects,
		affectedFiles:    affectedFiles,
	}
}

func (c *configFileRegistryBuilder) handleConfigChange(entry *dirty.SyncMapEntry[tspath.Path, *configFileEntry], logger *logging.LogTree) map[tspath.Path]struct{} {
	var affectedProjects map[tspath.Path]struct{}
	changed := entry.ChangeIf(
		func(config *configFileEntry) bool { return config.pendingReload != PendingReloadFull },
		func(config *configFileEntry) { config.pendingReload = PendingReloadFull },
	)
	if changed {
		logger.Logf("Config file %s changed", entry.Key())
		affectedProjects = maps.Clone(entry.Value().retainingProjects)
	}

	return affectedProjects
}

func (c *configFileRegistryBuilder) computeConfigFileName(fileName string, skipSearchInDirectoryOfFile bool, logger *logging.LogTree) string {
	searchPath := tspath.GetDirectoryPath(fileName)
	result, _ := tspath.ForEachAncestorDirectory(searchPath, func(directory string) (result string, stop bool) {
		tsconfigPath := tspath.CombinePaths(directory, "tsconfig.json")
		if !skipSearchInDirectoryOfFile && c.FS().FileExists(tsconfigPath) {
			return tsconfigPath, true
		}
		jsconfigPath := tspath.CombinePaths(directory, "jsconfig.json")
		if !skipSearchInDirectoryOfFile && c.FS().FileExists(jsconfigPath) {
			return jsconfigPath, true
		}
		if strings.HasSuffix(directory, "/node_modules") {
			return "", true
		}
		skipSearchInDirectoryOfFile = false
		return "", false
	})
	logger.Logf("computeConfigFileName:: File: %s:: Result: %s", fileName, result)
	return result
}

func (c *configFileRegistryBuilder) getConfigFileNameForFile(fileName string, path tspath.Path, loadKind projectLoadKind, logger *logging.LogTree) string {
	if isDynamicFileName(fileName) {
		return ""
	}

	if entry, ok := c.configFileNames.Get(path); ok {
		return entry.Value().nearestConfigFileName
	}

	if loadKind == projectLoadKindFind {
		return ""
	}

	configName := c.computeConfigFileName(fileName, false, logger)

	if _, ok := c.fs.overlays[path]; ok {
		c.configFileNames.Add(path, &configFileNames{
			nearestConfigFileName: configName,
		})
	}
	return configName
}

func (c *configFileRegistryBuilder) getAncestorConfigFileName(fileName string, path tspath.Path, configFileName string, loadKind projectLoadKind, logger *logging.LogTree) string {
	if isDynamicFileName(fileName) {
		return ""
	}

	entry, ok := c.configFileNames.Get(path)
	if !ok {
		return ""
	}
	if ancestorConfigName, found := entry.Value().ancestors[configFileName]; found {
		return ancestorConfigName
	}

	if loadKind == projectLoadKindFind {
		return ""
	}

	// Look for config in parent folders of config file
	result := c.computeConfigFileName(configFileName, true, logger)

	if _, ok := c.fs.overlays[path]; ok {
		entry.Change(func(value *configFileNames) {
			if value.ancestors == nil {
				value.ancestors = make(map[string]string)
			}
			value.ancestors[configFileName] = result
		})
	}
	return result
}

// FS implements tsoptions.ParseConfigHost.
func (c *configFileRegistryBuilder) FS() vfs.FS {
	return c.fs.fs
}

// GetCurrentDirectory implements tsoptions.ParseConfigHost.
func (c *configFileRegistryBuilder) GetCurrentDirectory() string {
	return c.sessionOptions.CurrentDirectory
}

// GetExtendedConfig implements tsoptions.ExtendedConfigCache.
func (c *configFileRegistryBuilder) GetExtendedConfig(fileName string, path tspath.Path, parse func() *tsoptions.ExtendedConfigCacheEntry) *tsoptions.ExtendedConfigCacheEntry {
	fh := c.fs.GetFileByPath(fileName, path)
	return c.extendedConfigCache.Acquire(fh, path, parse)
}

func (c *configFileRegistryBuilder) Cleanup() {
	c.configs.Range(func(entry *dirty.SyncMapEntry[tspath.Path, *configFileEntry]) bool {
		entry.DeleteIf(func(value *configFileEntry) bool {
			return len(value.retainingProjects) == 0 && len(value.retainingOpenFiles) == 0 && len(value.retainingConfigs) == 0
		})
		return true
	})
}
