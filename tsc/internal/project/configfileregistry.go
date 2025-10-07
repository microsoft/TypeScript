package project

import (
	"maps"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type ConfigFileRegistry struct {
	// configs is a map of config file paths to their entries.
	configs map[tspath.Path]*configFileEntry
	// configFileNames is a map of open file paths to information
	// about their ancestor config file names. It is only used as
	// a cache during
	configFileNames map[tspath.Path]*configFileNames
}

type configFileEntry struct {
	pendingReload PendingReload
	commandLine   *tsoptions.ParsedCommandLine
	// retainingProjects is the set of projects that have called acquireConfig
	// without releasing it. A config file entry may be acquired by a project
	// either because it is the config for that project or because it is the
	// config for a referenced project.
	retainingProjects map[tspath.Path]struct{}
	// retainingOpenFiles is the set of open files that caused this config to
	// load during project collection building. This config file may or may not
	// end up being the config for the default project for these files, but
	// determining the default project loaded this config as a candidate, so
	// subsequent calls to `projectCollectionBuilder.findDefaultConfiguredProject`
	// will use this config as part of the search, so it must be retained.
	retainingOpenFiles map[tspath.Path]struct{}
	// retainingConfigs is the set of config files that extend this one. This
	// provides a cheap reverse mapping for a project config's
	// `commandLine.ExtendedSourceFiles()` that can be used to notify the
	// extending projects when this config changes. An extended config file may
	// or may not also be used directly by a project, so it's possible that
	// when this is set, no other fields will be used.
	retainingConfigs map[tspath.Path]struct{}
	// rootFilesWatch is a watch for the root files of this config file.
	rootFilesWatch *WatchedFiles[patternsAndIgnored]
}

func newConfigFileEntry(fileName string) *configFileEntry {
	return &configFileEntry{
		pendingReload: PendingReloadFull,
		rootFilesWatch: NewWatchedFiles(
			"root files for "+fileName,
			lsproto.WatchKindCreate|lsproto.WatchKindChange|lsproto.WatchKindDelete,
			core.Identity,
		),
	}
}

func newExtendedConfigFileEntry(extendingConfigPath tspath.Path) *configFileEntry {
	return &configFileEntry{
		pendingReload:    PendingReloadFull,
		retainingConfigs: map[tspath.Path]struct{}{extendingConfigPath: {}},
	}
}

func (e *configFileEntry) Clone() *configFileEntry {
	return &configFileEntry{
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

func (c *ConfigFileRegistry) GetConfig(path tspath.Path) *tsoptions.ParsedCommandLine {
	if entry, ok := c.configs[path]; ok {
		return entry.commandLine
	}
	return nil
}

func (c *ConfigFileRegistry) GetConfigFileName(path tspath.Path) string {
	if entry, ok := c.configFileNames[path]; ok {
		return entry.nearestConfigFileName
	}
	return ""
}

func (c *ConfigFileRegistry) GetAncestorConfigFileName(path tspath.Path, higherThanConfig string) string {
	if entry, ok := c.configFileNames[path]; ok {
		return entry.ancestors[higherThanConfig]
	}
	return ""
}

// clone creates a shallow copy of the configFileRegistry.
func (c *ConfigFileRegistry) clone() *ConfigFileRegistry {
	return &ConfigFileRegistry{
		configs:         maps.Clone(c.configs),
		configFileNames: maps.Clone(c.configFileNames),
	}
}

type configFileNames struct {
	// nearestConfigFileName is the file name of the nearest ancestor config file.
	nearestConfigFileName string
	// ancestors is a map from one ancestor config file path to the next.
	// For example, if `/a`, `/a/b`, and `/a/b/c` all contain config files,
	// the fully loaded map will look like:
	//		{
	//			"/a/b/c/tsconfig.json": "/a/b/tsconfig.json",
	//			"/a/b/tsconfig.json": "/a/tsconfig.json"
	//		}
	ancestors map[string]string
}

func (c *configFileNames) Clone() *configFileNames {
	return &configFileNames{
		nearestConfigFileName: c.nearestConfigFileName,
		ancestors:             maps.Clone(c.ancestors),
	}
}
