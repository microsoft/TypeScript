package build

import (
	"maps"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/trackingvfs"
)

type dependencyTrackingFS struct {
	trackingvfs.FS
	directories      collections.SyncSet[tspath.RootedDirectoryPath]
	enumerations     collections.SyncMap[tspath.RootedDirectoryPath, []string]
	realpaths        collections.SyncMap[tspath.RootedPath, tspath.RootedPath]
	watchDirectories []tspath.RootedDirectoryPath
}

func (f *dependencyTrackingFS) Realpath(path tspath.RootedPath) tspath.RootedPath {
	realPath := f.FS.Realpath(path)
	// Keep the identity consumed by resolution, not a later retarget before inventory capture.
	f.realpaths.LoadOrStore(path, realPath)
	return realPath
}

func (f *dependencyTrackingFS) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	f.directories.Add(path)
	return f.FS.DirectoryExists(path)
}

func (f *dependencyTrackingFS) GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries {
	f.directories.Add(path)
	entries := f.FS.GetAccessibleEntries(path)
	directories := slices.Clone(entries.Directories)
	slices.Sort(directories)
	f.enumerations.Store(path, directories)
	return entries
}

type directoryDependency struct {
	directory tspath.RootedDirectoryPath
	entries   []string
}

type inputAlias struct {
	file     tspath.RootedFilePath
	realPath tspath.PathKey
}

type watchDependencies struct {
	inputs              map[tspath.PathKey]tspath.RootedFilePath
	inputPaths          collections.Set[tspath.PathKey]
	inputAliases        map[tspath.PathKey]inputAlias
	lookups             map[tspath.PathKey]tspath.RootedPath
	missingDirectories  []tspath.PathKey
	relativeDirectories collections.Set[tspath.RootedDirectoryPath]
	enumerations        map[tspath.PathKey]directoryDependency
	referenceSources    collections.Set[tspath.PathKey]
	watchDirectories    []tspath.RootedDirectoryPath
	complete            bool
}

func watchDependenciesFromBuildInfo(o *Orchestrator, buildInfo *incremental.BuildInfo, buildInfoDirectory tspath.RootedDirectoryPath) *watchDependencies {
	dependencies := &watchDependencies{
		inputs:       make(map[tspath.PathKey]tspath.RootedFilePath),
		inputAliases: make(map[tspath.PathKey]inputAlias),
		lookups:      make(map[tspath.PathKey]tspath.RootedPath),
		enumerations: make(map[tspath.PathKey]directoryDependency),
	}
	addInput := func(file tspath.RootedFilePath) {
		path := o.caseSensitivity.PathKey(file.AsPath())
		dependencies.inputs[path] = file
		dependencies.inputPaths.Add(path)
		dependencies.inputPaths.Add(o.caseSensitivity.PathKey(o.host.FS().Realpath(file.AsPath())))
	}
	for _, file := range buildInfo.FileNames {
		if !incremental.IsBuildInfoFileNameDefaultLibrary(file) {
			addInput(incremental.ResolveBuildInfoFileName(file, buildInfoDirectory, o.host.DefaultLibraryPath()))
		}
	}
	for _, root := range buildInfo.Root {
		if root.NonIncremental != "" {
			addInput(incremental.ResolveBuildInfoFileName(root.NonIncremental, buildInfoDirectory, ""))
		}
	}
	for file := range buildInfo.GetNonIncrementalFileNames(buildInfoDirectory) {
		addInput(file)
	}
	for file, realPath := range buildInfo.GetInputAliases(buildInfoDirectory) {
		path := o.caseSensitivity.PathKey(file.AsPath())
		realPathKey := o.caseSensitivity.PathKey(realPath.AsPath())
		dependencies.inputAliases[path] = inputAlias{file: file, realPath: realPathKey}
		dependencies.inputPaths.Add(path)
		dependencies.inputPaths.Add(realPathKey)
		dependencies.lookups[path] = file.AsPath()
		dependencies.lookups[realPathKey] = realPath.AsPath()
	}
	dependencies.watchDirectories = core.Map(buildInfo.WatchDirectories, func(path incremental.BuildInfoPath) tspath.RootedDirectoryPath {
		return buildInfoDirectory.ResolveDirectory(path.AsString())
	})
	return dependencies
}

func (d *watchDependencies) addInputAlias(o *Orchestrator, path, realPath tspath.RootedPath) {
	key := o.caseSensitivity.PathKey(path)
	realKey := o.caseSensitivity.PathKey(realPath)
	if key != realKey && d.inputPaths.Has(realKey) && !d.referenceSources.Has(key) && !d.referenceSources.Has(realKey) {
		d.inputAliases[key] = inputAlias{tspath.RootedFilePathFromPath(path), realKey}
	}
}

func (d *watchDependencies) addLookup(o *Orchestrator, path tspath.RootedPath) {
	if d.referenceSources.Has(o.caseSensitivity.PathKey(path)) {
		return
	}
	d.lookups[o.caseSensitivity.PathKey(path)] = path
	realPath := o.host.FS().Realpath(path)
	d.lookups[o.caseSensitivity.PathKey(realPath)] = realPath
}

func (t *BuildTask) captureWatchDependencies(o *Orchestrator, program *compiler.Program, fs *dependencyTrackingFS) bool {
	if fs == nil || len(t.resolved.GetConfigFileParsingDiagnostics()) != 0 {
		return false
	}
	dependencies := &watchDependencies{
		inputs:       make(map[tspath.PathKey]tspath.RootedFilePath),
		inputAliases: make(map[tspath.PathKey]inputAlias),
		lookups:      make(map[tspath.PathKey]tspath.RootedPath),
		enumerations: make(map[tspath.PathKey]directoryDependency),
	}
	program.RangeResolvedProjectReference(func(_ tspath.PathKey, config, _ *tsoptions.ParsedCommandLine, _ int) bool {
		if config == nil {
			return true
		}
		for _, file := range config.FileNames() {
			dependencies.referenceSources.Add(o.caseSensitivity.PathKey(file.AsPath()))
			dependencies.referenceSources.Add(o.caseSensitivity.PathKey(o.host.FS().Realpath(file.AsPath())))
		}
		return true
	})
	for _, file := range program.GetSourceFiles() {
		if lib := program.GetDefaultLibFile(file.PathKey()); lib != nil && !lib.Replaced {
			continue
		}
		if o.host.FS().FileExists(file.FileName()) {
			realPath, observed := fs.realpaths.Load(file.FileName().AsPath())
			if !observed {
				realPath = o.host.FS().Realpath(file.FileName().AsPath())
			}
			realPathKey := o.caseSensitivity.PathKey(realPath)
			if dependencies.referenceSources.Has(file.PathKey()) || dependencies.referenceSources.Has(realPathKey) {
				continue
			}
			dependencies.inputs[file.PathKey()] = file.FileName()
			dependencies.inputPaths.Add(file.PathKey())
			dependencies.inputPaths.Add(realPathKey)
			dependencies.addLookup(o, file.FileName().AsPath())
		}
	}
	fs.realpaths.Range(func(path, realPath tspath.RootedPath) bool {
		dependencies.addInputAlias(o, path, realPath)
		return true
	})
	for _, path := range fs.SeenFiles.ToSlice() {
		if o.caseSensitivity.ContainsPath(o.host.DefaultLibraryPath(), path) {
			continue
		}
		if o.host.FS().DirectoryExists(tspath.RootedDirectoryPathFromPath(path)) {
			continue
		}
		dependencies.addLookup(o, path)
	}
	for _, dir := range fs.directories.ToSlice() {
		for !o.host.FS().DirectoryExists(dir) {
			dependencies.missingDirectories = append(dependencies.missingDirectories, o.caseSensitivity.PathKey(dir.AsPath()))
			dependencies.addLookup(o, dir.AsPath())
			parent := dir.AsPath().Directory()
			if parent == dir {
				break
			}
			dir = parent
		}
	}
	program.ForEachResolvedModule(func(_ *module.ResolvedModule, name string, _ core.ResolutionMode, file tspath.PathKey) {
		if tspath.IsExternalModuleNameRelative(name) {
			dependencies.relativeDirectories.Add(program.GetSourceFileByPath(file).FileName().Directory().ResolveFile(name).Directory())
		}
	}, nil)
	fs.enumerations.Range(func(dir tspath.RootedDirectoryPath, entries []string) bool {
		dependency := directoryDependency{dir, entries}
		dependencies.enumerations[o.caseSensitivity.PathKey(dir.AsPath())] = dependency
		dependencies.enumerations[o.caseSensitivity.PathKey(o.host.FS().Realpath(dir.AsPath()))] = dependency
		return true
	})
	if t.watchDependencies != nil {
		for path, alias := range t.watchDependencies.inputAliases {
			_, observed := dependencies.lookups[path]
			for _, directory := range dependencies.missingDirectories {
				observed = observed || directory.ContainsPath(path)
			}
			if observed && !o.host.FS().FileExists(alias.file) {
				// Resolution can stop at a missing parent before probing the alias itself.
				dependencies.inputAliases[path] = inputAlias{file: alias.file}
			}
		}
		for path, current := range dependencies.inputAliases {
			if current.realPath != t.watchDependencies.inputAliases[path].realPath {
				// The topology may change after event classification but before resolution consumes it.
				t.changedInput = current.file.AsPath()
				t.inputAliasChanged = true
			}
		}
	}
	t.watchDependencies = dependencies
	t.watchDependenciesDirty = false
	dependencies.complete = true
	fs.watchDirectories = o.persistedDependencyWatchDirs(t.config.Directory(), dependencies)
	return true
}

func (f *dependencyTrackingFS) BuildInfoInputAliases() map[tspath.RootedPath]tspath.RootedPath {
	aliases := make(map[tspath.RootedPath]tspath.RootedPath)
	f.realpaths.Range(func(path, realPath tspath.RootedPath) bool {
		aliases[path] = realPath
		return true
	})
	return aliases
}

func (f *dependencyTrackingFS) BuildInfoWatchDirectories() []tspath.RootedDirectoryPath {
	return slices.Clone(f.watchDirectories)
}

func (d *watchDependencies) changedInputAlias(o *Orchestrator, paths map[tspath.PathKey]fswatch.EventKind) tspath.RootedPath {
	if d == nil {
		return ""
	}
	for _, path := range slices.Sorted(maps.Keys(d.inputAliases)) {
		affected := paths == nil
		for eventPath := range paths {
			if eventPath.ContainsPath(path) {
				affected = true
				break
			}
		}
		if affected {
			alias := d.inputAliases[path]
			// Event classification must not cache a negative probe before the child is created.
			fs := o.opts.Sys.FS()
			exists := fs.FileExists(alias.file)
			if (alias.realPath == "" && exists) ||
				(alias.realPath != "" && (!exists || o.caseSensitivity.PathKey(fs.Realpath(alias.file.AsPath())) != alias.realPath)) {
				return alias.file.AsPath()
			}
		}
	}
	return ""
}

func (d *watchDependencies) changed(o *Orchestrator, paths map[tspath.PathKey]fswatch.EventKind, roots, handled *collections.Set[tspath.PathKey]) (input tspath.RootedPath, changed, aliasChanged bool) {
	if d == nil {
		return "", false, false
	}
	if alias := d.changedInputAlias(o, paths); alias != "" {
		return alias, true, true
	}
	eventPaths := slices.Sorted(maps.Keys(paths))
	inputChanged := false
	for _, path := range eventPaths {
		kind := paths[path]
		if roots.Has(path) || handled.Has(path) {
			continue
		}
		if d.inputPaths.Has(path) || d.inputAliases[path].file != "" {
			// Consumed inputs and unchanged aliases share the normal timestamp/hash checks.
			inputChanged = true
			continue
		}
		if lookup, ok := d.lookups[path]; ok {
			return lookup, true, false
		}
		if kind == fswatch.EventDelete {
			for _, dependency := range slices.Sorted(maps.Keys(d.lookups)) {
				if path.ContainsPath(dependency) {
					return d.lookups[dependency], true, false
				}
			}
		}
		for _, dir := range d.missingDirectories {
			if dir.ContainsPath(path) {
				return d.lookups[dir], true, false
			}
		}
		for _, key := range slices.Sorted(maps.Keys(d.enumerations)) {
			enumeration := d.enumerations[key]
			if path != key && path.Parent() != key && !(kind == fswatch.EventDelete && path.ContainsPath(key)) {
				continue
			}
			entries := slices.Clone(o.host.FS().GetAccessibleEntries(enumeration.directory).Directories)
			slices.Sort(entries)
			if !slices.Equal(entries, enumeration.entries) {
				return enumeration.directory.AsPath(), true, false
			}
		}
	}
	return "", inputChanged, false
}

func (d *watchDependencies) affectedInput(paths map[tspath.PathKey]fswatch.EventKind, knownInputs *collections.Set[tspath.PathKey]) (input tspath.RootedPath, changed bool) {
	for _, inputPath := range slices.Sorted(maps.Keys(d.inputPaths.Keys())) {
		for eventPath := range paths {
			if eventPath.ContainsPath(inputPath) || inputPath.ContainsPath(eventPath) {
				if input := d.lookups[inputPath]; input != "" {
					if !knownInputs.Has(inputPath) {
						return input, true
					}
					changed = true
				}
			}
		}
	}
	for _, aliasPath := range slices.Sorted(maps.Keys(d.inputAliases)) {
		for eventPath := range paths {
			if eventPath.ContainsPath(aliasPath) || aliasPath.ContainsPath(eventPath) {
				if !knownInputs.Has(aliasPath) {
					return d.inputAliases[aliasPath].file.AsPath(), true
				}
				changed = true
			}
		}
	}
	return "", changed
}
