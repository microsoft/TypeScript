package project

import (
	"iter"
	"maps"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type ConfigFileRegistry struct {
	// configs is a map of config file paths to their entries.
	configs map[tspath.PathKey]*configFileEntry
	// configFileNames is a map of open file paths to information
	// about their ancestor config file names. It is only used as
	// a cache during
	configFileNames map[tspath.PathKey]*configFileNames
	// customConfigFileName is the custom config file name preference that was
	// used when building this registry's configFileNames cache.
	customConfigFileName        string
	allConfiguredContentMappers *configuredContentMappers
}

type configuredContentMappers struct {
	extensions []string
}

func collectConfiguredContentMappers(commandLines []*tsoptions.ParsedCommandLine) *configuredContentMappers {
	var seenExtensions collections.Set[string]
	var extensions []string
	for _, commandLine := range commandLines {
		for _, mapper := range commandLine.ContentMappers() {
			for _, extension := range mapper.Definition.Extensions {
				if seenExtensions.AddIfAbsent(extension) {
					extensions = append(extensions, extension)
				}
			}
		}
	}
	slices.Sort(extensions)
	return &configuredContentMappers{extensions: extensions}
}

func (c *ConfigFileRegistry) contentMappers() *configuredContentMappers {
	if c.allConfiguredContentMappers != nil {
		return c.allConfiguredContentMappers
	}
	var commandLines []*tsoptions.ParsedCommandLine
	for _, entry := range c.configs {
		if entry.commandLine != nil {
			commandLines = append(commandLines, entry.commandLine)
		}
	}
	return collectConfiguredContentMappers(commandLines)
}

type configFileEntry struct {
	fileName      tspath.RootedFilePath
	pendingReload PendingReload
	commandLine   *tsoptions.ParsedCommandLine
	// retainingProjects is the set of projects that have called acquireConfig
	// without releasing it. A config file entry may be acquired by a project
	// either because it is the config for that project or because it is the
	// config for a referenced project.
	retainingProjects map[tspath.PathKey]struct{}
	// retainingOpenFiles is the set of open files that caused this config to
	// load during project collection building. This config file may or may not
	// end up being the config for the default project for these files, but
	// determining the default project loaded this config as a candidate, so
	// subsequent calls to `projectCollectionBuilder.findDefaultConfiguredProject`
	// will use this config as part of the search, so it must be retained.
	retainingOpenFiles map[tspath.PathKey]struct{}
	// retainingConfigs is the set of config files that extend this one. This
	// provides a cheap reverse mapping for a project config's
	// `commandLine.ExtendedSourceFiles()` that can be used to notify the
	// extending projects when this config changes. An extended config file may
	// or may not also be used directly by a project, so it's possible that
	// when this is set, no other fields will be used.
	retainingConfigs map[tspath.PathKey]struct{}
	// rootFilesWatch is a watch for the root files of this config file.
	rootFilesWatch *WatchedFiles[PatternsAndIgnored]
}

func newConfigFileEntry(hasRelativePatternCapability bool, fileName tspath.RootedFilePath) *configFileEntry {
	return &configFileEntry{
		fileName:      fileName,
		pendingReload: PendingReloadFull,
		rootFilesWatch: NewWatchedFiles(
			"root files for "+fileName.AsString(),
			lsproto.WatchKindCreate|lsproto.WatchKindChange|lsproto.WatchKindDelete,
			hasRelativePatternCapability,
			core.Identity,
		),
	}
}

func newExtendedConfigFileEntry(fileName tspath.RootedFilePath, extendingConfigPath tspath.PathKey) *configFileEntry {
	return &configFileEntry{
		fileName:         fileName,
		pendingReload:    PendingReloadFull,
		retainingConfigs: map[tspath.PathKey]struct{}{extendingConfigPath: {}},
	}
}

func (e *configFileEntry) Clone() *configFileEntry {
	return &configFileEntry{
		fileName:      e.fileName,
		pendingReload: e.pendingReload,
		commandLine:   e.commandLine,
		// !!! eagerly cloning these maps makes everything more convenient,
		// but it could be avoided if needed.
		retainingProjects:  maps.Clone(e.retainingProjects),
		retainingOpenFiles: maps.Clone(e.retainingOpenFiles),
		retainingConfigs:   maps.Clone(e.retainingConfigs),
		rootFilesWatch:     e.rootFilesWatch,
	}
}

func (c *ConfigFileRegistry) GetConfig(path tspath.PathKey) *tsoptions.ParsedCommandLine {
	if entry, ok := c.configs[path]; ok {
		return entry.commandLine
	}
	return nil
}

func (c *ConfigFileRegistry) isTracked(path tspath.PathKey) bool {
	_, ok := c.configs[path]
	return ok
}

func (c *ConfigFileRegistry) GetConfigFileName(path tspath.PathKey) tspath.RootedFilePath {
	if entry, ok := c.configFileNames[path]; ok {
		return entry.nearestConfigFileName
	}
	return ""
}

func (c *ConfigFileRegistry) GetAncestorConfigFileName(path tspath.PathKey, higherThanConfig tspath.RootedFilePath) tspath.RootedFilePath {
	if entry, ok := c.configFileNames[path]; ok {
		return entry.ancestors[higherThanConfig]
	}
	return ""
}

// clone creates a shallow copy of the configFileRegistry.
func (c *ConfigFileRegistry) clone() *ConfigFileRegistry {
	return &ConfigFileRegistry{
		configs:                     maps.Clone(c.configs),
		configFileNames:             maps.Clone(c.configFileNames),
		customConfigFileName:        c.customConfigFileName,
		allConfiguredContentMappers: c.allConfiguredContentMappers,
	}
}

// For testing
type TestConfigEntry struct {
	FileName           tspath.RootedFilePath
	RetainingProjects  iter.Seq[tspath.PathKey]
	RetainingOpenFiles iter.Seq[tspath.PathKey]
	RetainingConfigs   iter.Seq[tspath.PathKey]
}

// For testing
func (c *ConfigFileRegistry) ForEachTestConfigEntry(cb func(tspath.PathKey, *TestConfigEntry)) {
	if c != nil {
		for path, entry := range c.configs {
			cb(path, &TestConfigEntry{
				FileName:           entry.fileName,
				RetainingProjects:  maps.Keys(entry.retainingProjects),
				RetainingOpenFiles: maps.Keys(entry.retainingOpenFiles),
				RetainingConfigs:   maps.Keys(entry.retainingConfigs),
			})
		}
	}
}

// For testing
func (c *ConfigFileRegistry) GetTestConfigEntry(path tspath.PathKey) *TestConfigEntry {
	if c != nil {
		if entry, ok := c.configs[path]; ok {
			return &TestConfigEntry{
				FileName:           entry.fileName,
				RetainingProjects:  maps.Keys(entry.retainingProjects),
				RetainingOpenFiles: maps.Keys(entry.retainingOpenFiles),
				RetainingConfigs:   maps.Keys(entry.retainingConfigs),
			}
		}
	}
	return nil
}

type TestConfigFileNamesEntry struct {
	NearestConfigFileName tspath.RootedFilePath
	Ancestors             map[tspath.RootedFilePath]tspath.RootedFilePath
}

// For testing
func (c *ConfigFileRegistry) ForEachTestConfigFileNamesEntry(cb func(tspath.PathKey, *TestConfigFileNamesEntry)) {
	if c != nil {
		for path, entry := range c.configFileNames {
			cb(path, &TestConfigFileNamesEntry{
				NearestConfigFileName: entry.nearestConfigFileName,
				Ancestors:             entry.ancestors,
			})
		}
	}
}

// For testing
func (c *ConfigFileRegistry) GetTestConfigFileNamesEntry(path tspath.PathKey) *TestConfigFileNamesEntry {
	if c != nil {
		if entry, ok := c.configFileNames[path]; ok {
			return &TestConfigFileNamesEntry{
				NearestConfigFileName: entry.nearestConfigFileName,
				Ancestors:             entry.ancestors,
			}
		}
	}
	return nil
}

type configFileNames struct {
	// nearestConfigFileName is the file name of the nearest ancestor config file.
	nearestConfigFileName tspath.RootedFilePath
	// ancestors is a map from one ancestor config file path to the next.
	// For example, if `/a`, `/a/b`, and `/a/b/c` all contain config files,
	// the fully loaded map will look like:
	//		{
	//			"/a/b/c/tsconfig.json": "/a/b/tsconfig.json",
	//			"/a/b/tsconfig.json": "/a/tsconfig.json"
	//		}
	ancestors map[tspath.RootedFilePath]tspath.RootedFilePath
}

func (c *configFileNames) Clone() *configFileNames {
	return &configFileNames{
		nearestConfigFileName: c.nearestConfigFileName,
		ancestors:             maps.Clone(c.ancestors),
	}
}
