package project

import (
	"errors"
	"fmt"
	"iter"

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
	if index != nil {
		for name := range s.watchAliasNames(nil) {
			if name = s.normalizeWatchAliasName(name); name == "" {
				continue
			}
			if err := index.Add(name); err != nil {
				s.watchAliasesError = fmt.Errorf("indexing project watch path %q: %w", name, err)
				break
			}
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

func (s *Snapshot) normalizeWatchAliasName(name string) string {
	if name == "" || tspath.IsDynamicFileName(name) {
		return ""
	}
	name = tspath.GetNormalizedAbsolutePath(name, s.host.options.CurrentDirectory)
	if !tspath.IsRootedDiskPath(name) {
		return ""
	}
	return name
}

// Registration and reuse must observe the same original names. Keeping this
// traversal in one place avoids a second model of each project's cache inputs.
// A previous snapshot allows immutable, shared lookup sets to be skipped.
func (s *Snapshot) watchAliasNames(previous *Snapshot) iter.Seq[string] {
	return func(yield func(string) bool) {
		for _, file := range s.fs.diskFiles {
			if !yield(file.FileName()) || !yield(file.realpathName) {
				return
			}
		}
		for _, file := range s.fs.overlays {
			if !yield(file.FileName()) {
				return
			}
		}
		for _, config := range s.ConfigFileRegistry.configs {
			if !yield(config.fileName) {
				return
			}
			if config.commandLine != nil {
				for directory := range config.commandLine.WildcardDirectories() {
					if !yield(directory) {
						return
					}
				}
			}
		}
		for _, search := range s.ConfigFileRegistry.configFileNames {
			if !yield(search.fileName) {
				return
			}
		}
		for _, project := range s.ProjectCollection.Projects() {
			var old *sourceFS
			if previous != nil {
				if p := previous.ProjectCollection.GetProjectByPath(project.configFilePath); p != nil && p.host != nil {
					old = p.host.sourceFS
				}
			}
			if project.host != nil {
				for _, names := range []*collections.SyncMap[tspath.Path, string]{
					project.host.sourceFS.seenFiles,
					project.host.sourceFS.missingDirectories,
				} {
					if names != nil && (old == nil || names != old.seenFiles && names != old.missingDirectories) {
						more := true
						names.Range(func(_ tspath.Path, name string) bool {
							more = yield(name)
							return more
						})
						if !more {
							return
						}
					}
				}
			}
			if project.contentMapperWatch != nil {
				for _, name := range project.contentMapperWatch.input {
					if !yield(name) {
						return
					}
				}
			}
		}
		if s.autoImportsWatch != nil {
			for _, directory := range s.autoImportsWatch.input {
				if !yield(directory) {
					return
				}
			}
		}
	}
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
	if contentOnly && previous.watchAliasesError == nil && enabled == (previous.watchAliases != nil) && s.canReuseWatchAliases(previous) {
		s.watchAliases = previous.watchAliases
		s.watchRealpaths = previous.watchRealpaths
		return
	}
	s.initializeWatchAliases(logger)
}

// Content-only snapshots may retain surplus registrations: expansion only
// supplies candidates to the existing dependency checks. Reuse never grows or
// mutates an index; new names and filesystem changes build a fresh generation.
func (s *Snapshot) canReuseWatchAliases(previous *Snapshot) bool {
	if previous.watchAliases != nil {
		for name := range s.watchAliasNames(previous) {
			if !previous.watchAliases.Contains(name) {
				name = s.normalizeWatchAliasName(name)
				if name != "" && !previous.watchAliases.Contains(name) {
					return false
				}
			}
		}
	}
	if len(s.fs.nodeModulesRealpathAliases) != 0 {
		for path, file := range s.fs.diskFiles {
			if file.realpathName != "" {
				old := previous.fs.diskFiles[path]
				if old == nil || old.FileName() != file.FileName() || old.realpathName != file.realpathName {
					return false
				}
			}
		}
	}
	return true
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
