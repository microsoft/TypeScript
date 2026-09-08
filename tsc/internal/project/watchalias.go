package project

import (
	"errors"
	"fmt"
	"maps"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project/logging"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/watchalias"
)

// Build before publishing the snapshot. Notification processing only reads this
// generation's index; compiler paths and SourceFile identities remain unchanged.
func (s *Snapshot) initializeWatchAliases(logger logging.Logger) {
	if !s.host.options.WatchEnabled {
		return
	}
	var index *watchalias.Index
	if watchalias.Enabled(s.host.fs) {
		index = watchalias.New(s.host.fs)
	}
	add := func(name string) {
		if s.watchAliasesError != nil || name == "" || tspath.IsDynamicFileName(name) {
			return
		}
		name = tspath.GetNormalizedAbsolutePath(name, s.host.options.CurrentDirectory)
		if !tspath.IsRootedDiskPath(name) {
			return
		}
		if err := index.Add(name); err != nil {
			s.watchAliasesError = fmt.Errorf("indexing project watch path %q: %w", name, err)
		}
	}
	if index != nil {
		for _, file := range s.fs.diskFiles {
			add(file.FileName())
			add(file.realpathName)
		}
	}
	// Watchers preserve requested roots, which can themselves be symlinks
	// (for example /var -> /private/var). Resolve those spellings while the
	// generation is built, before a physical target can be deleted.
	var realpaths map[tspath.Path]string
	if len(s.fs.nodeModulesRealpathAliases) != 0 {
		realpaths = make(map[tspath.Path]string)
		for _, file := range s.fs.diskFiles {
			if file.realpathName == "" {
				continue
			}
			for directory := tspath.GetDirectoryPath(file.FileName()); ; {
				key := s.host.toPath(directory)
				if _, ok := realpaths[key]; ok {
					break
				}
				realpaths[key] = s.host.fs.Realpath(directory)
				parent := tspath.GetDirectoryPath(directory)
				if parent == directory || parent == "" {
					break
				}
				directory = parent
			}
		}
	}
	if index != nil {
		for _, file := range s.fs.overlays {
			add(file.FileName())
		}
		for _, config := range s.ConfigFileRegistry.configs {
			add(config.fileName)
			if config.commandLine != nil {
				for directory := range config.commandLine.WildcardDirectories() {
					add(directory)
				}
			}
		}
		for _, search := range s.ConfigFileRegistry.configFileNames {
			add(search.fileName)
		}
		for _, project := range s.ProjectCollection.Projects() {
			if project.host != nil {
				for _, names := range []*collections.SyncMap[tspath.Path, string]{
					project.host.sourceFS.seenFiles,
					project.host.sourceFS.missingDirectories,
				} {
					if names != nil {
						names.Range(func(_ tspath.Path, name string) bool {
							add(name)
							return true
						})
					}
				}
			}
			if project.contentMapperWatch != nil {
				for _, name := range project.contentMapperWatch.input {
					add(name)
				}
			}
		}
		if s.autoImportsWatch != nil {
			for _, directory := range s.autoImportsWatch.input {
				add(directory)
			}
		}
	}
	if s.watchAliasesError != nil {
		if logger != nil {
			logger.Warnf("Watch aliases unavailable; watch events will invalidate all cached project state until a later snapshot retries: %v", s.watchAliasesError)
		} else {
			s.apiError = errors.Join(s.apiError, s.watchAliasesError)
		}
		return
	}
	s.watchAliases = index
	s.watchRealpaths = realpaths
}

func (s *Session) watchAliasesNeedRefresh(change FileChangeSummary) bool {
	if !change.hasFileSystemChanges {
		return false
	}
	snapshot := s.Snapshot()
	return snapshot.watchAliases != nil || len(snapshot.watchRealpaths) != 0 || snapshot.watchAliasesError != nil
}

func (s *Snapshot) watchAliasChangesAreContentOnly(change FileChangeSummary, overlays map[tspath.Path]*Overlay) bool {
	if change.hasFileSystemChanges || change.InvalidateAll || change.IncludesWatchChangeOutsideNodeModules ||
		change.Opened != "" || change.Reopened != "" || change.Closed.Len() != 0 || change.Created.Len() != 0 || change.Deleted.Len() != 0 {
		return false
	}
	for uri := range change.Changed.Keys() {
		path := s.host.toPath(uri.FileName())
		previous, next := s.fs.overlays[path], overlays[path]
		// API callers can also supply Changed notifications. Only an actual
		// replacement of an existing overlay proves that this is a text edit.
		if previous == nil || next == nil || previous == next {
			return false
		}
	}
	return true
}

func (s *Snapshot) initializeWatchAliasesFrom(previous *Snapshot, contentOnly bool, logger logging.Logger) {
	if !s.host.options.WatchEnabled {
		return
	}
	enabled := watchalias.Enabled(s.host.fs)
	if !enabled && len(s.fs.nodeModulesRealpathAliases) == 0 {
		return
	}
	if contentOnly && previous.watchAliasesError == nil && enabled == (previous.watchAliases != nil) && s.sameWatchAliasInputs(previous) {
		s.watchAliases = previous.watchAliases
		s.watchRealpaths = previous.watchRealpaths
		return
	}
	s.initializeWatchAliases(logger)
}

// Compare original spellings, not compiler path keys or file contents. The
// previous generation is immutable; reuse never adds to its published index.
func (s *Snapshot) sameWatchAliasInputs(previous *Snapshot) bool {
	if !maps.EqualFunc(s.fs.diskFiles, previous.fs.diskFiles, func(a, b *diskFile) bool {
		return a.FileName() == b.FileName() && a.realpathName == b.realpathName
	}) || !maps.EqualFunc(s.fs.overlays, previous.fs.overlays, func(a, b *Overlay) bool {
		return a.FileName() == b.FileName()
	}) || !maps.EqualFunc(s.ConfigFileRegistry.configs, previous.ConfigFileRegistry.configs, func(a, b *configFileEntry) bool {
		return a.fileName == b.fileName && a.commandLine == b.commandLine
	}) || !maps.EqualFunc(s.ConfigFileRegistry.configFileNames, previous.ConfigFileRegistry.configFileNames, func(a, b *configFileNames) bool {
		return a.fileName == b.fileName
	}) {
		return false
	}
	sameWatch := func(a, b *WatchedFiles[map[tspath.Path]string]) bool {
		if a == nil || b == nil {
			return a == b
		}
		return maps.Equal(a.input, b.input)
	}
	if !sameWatch(s.autoImportsWatch, previous.autoImportsWatch) {
		return false
	}
	sameTracked := func(a, b *collections.SyncMap[tspath.Path, string]) bool {
		if a == b {
			return true
		}
		if a == nil || b == nil {
			return false
		}
		count, equal := 0, true
		a.Range(func(path tspath.Path, name string) bool {
			count++
			other, ok := b.Load(path)
			equal = ok && name == other
			return equal
		})
		return equal && count == b.Size()
	}
	sameProject := func(a, b *Project) bool {
		if a == b {
			return true
		}
		if a == nil || b == nil {
			return false
		}
		if a.contentMapperWatch != b.contentMapperWatch {
			if a.contentMapperWatch == nil || b.contentMapperWatch == nil ||
				!slices.Equal(a.contentMapperWatch.input, b.contentMapperWatch.input) {
				return false
			}
		}
		if a.host == nil || b.host == nil {
			return a.host == b.host
		}
		return sameTracked(a.host.sourceFS.seenFiles, b.host.sourceFS.seenFiles) &&
			sameTracked(a.host.sourceFS.missingDirectories, b.host.sourceFS.missingDirectories)
	}
	return sameProject(s.ProjectCollection.inferredProject, previous.ProjectCollection.inferredProject) &&
		maps.EqualFunc(s.ProjectCollection.configuredProjects, previous.ProjectCollection.configuredProjects, sameProject)
}

func (s *Snapshot) watchNames(name string) []string {
	expand := func(name string) []string {
		if s.watchAliases != nil {
			return s.watchAliases.Expand(name)
		}
		return []string{name}
	}
	names := expand(name)
	if len(s.watchRealpaths) == 0 {
		return names
	}
	seen := collections.NewSetFromItems(names...)
	for _, name := range names {
		for ancestor := name; ; {
			if realPath, ok := s.watchRealpaths[s.host.toPath(ancestor)]; ok && realPath != ancestor {
				for _, alias := range expand(realPath + name[len(ancestor):]) {
					if seen.AddIfAbsent(alias) {
						names = append(names, alias)
					}
				}
			}
			parent := tspath.GetDirectoryPath(ancestor)
			if parent == ancestor || parent == "" {
				break
			}
			ancestor = parent
		}
	}
	return names
}

func (s *Snapshot) expandWatchAliases(change FileChangeSummary) FileChangeSummary {
	if s.watchAliasesError != nil && change.Created.Len()+change.Changed.Len()+change.Deleted.Len() != 0 {
		change.InvalidateAll = true
	}
	expand := func(events collections.Set[lsproto.DocumentUri]) collections.Set[lsproto.DocumentUri] {
		var result collections.Set[lsproto.DocumentUri]
		for uri := range events.Keys() {
			for _, name := range s.watchNames(uri.FileName()) {
				result.Add(lsconv.FileNameToDocumentURI(name))
			}
		}
		return result
	}
	change.Created = expand(change.Created)
	change.Changed = expand(change.Changed)
	change.Deleted = expand(change.Deleted)
	return change
}

func (s *Snapshot) watchChangesOverlapProjectState(change FileChangeSummary) bool {
	for _, events := range []collections.Set[lsproto.DocumentUri]{change.Changed, change.Deleted} {
		for uri := range events.Keys() {
			path := s.host.toPath(uri.FileName())
			base := tspath.GetBaseFileName(string(path))
			// A newly discovered config has no cache entry yet.
			if base == "tsconfig.json" || base == "jsconfig.json" || base == s.ConfigFileRegistry.customConfigFileName {
				return true
			}
			if s.ConfigFileRegistry.isTracked(path) {
				return true
			}
			if _, ok := s.fs.overlays[path]; ok {
				return true
			}
			if _, ok := s.fs.overlayDirectories[path]; ok {
				return true
			}
			for _, project := range s.ProjectCollection.Projects() {
				if project.host != nil && project.host.sourceFS.SeenFileOrMissingParentDirectory(path) {
					return true
				}
			}
		}
	}
	return false
}
