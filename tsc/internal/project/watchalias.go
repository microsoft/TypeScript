package project

import (
	"errors"
	"fmt"
	"iter"
	"maps"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project/logging"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/watchalias"
)

func (s *Snapshot) nativeWatchAliasesEnabled() bool {
	return s.host.options.WatchEnabled && watchalias.Enabled(s.host.fs)
}

// Build after finalizing files and projects. Physical correspondence is also
// needed by direct API hosts that do not register native filesystem watches.
func (s *Snapshot) initializeWatchAliases(logger logging.Logger) {
	native := s.nativeWatchAliasesEnabled()
	if !native && s.fs.realpathFiles == 0 {
		return
	}
	index := watchalias.NewExact(s.host.fs)
	if native {
		index = watchalias.New(s.host.fs)
	}
	directories := make(map[string]struct{})
	register := func(registration watchalias.Registration) bool {
		if err := index.Register(registration); err != nil {
			s.watchAliasesError = fmt.Errorf("indexing project watch path %q: %w", registration.Name, err)
			return false
		}
		return true
	}
	for registration := range s.watchRegistrations(nil) {
		registration.Name = s.normalizeWatchAliasName(registration.Name)
		if registration.Name == "" {
			continue
		}
		if !register(registration) {
			break
		}
		if registration.Realpath == "" {
			continue
		}
		// Requested roots can themselves be symlinks. Resolve directories
		// explicitly: a file link does not imply a link between its parents.
		for directory := tspath.GetDirectoryPath(registration.Name); ; {
			if _, ok := directories[directory]; ok {
				break
			}
			directories[directory] = struct{}{}
			if !register(watchalias.Registration{Name: directory, Realpath: s.host.fs.Realpath(directory), Directory: true}) {
				break
			}
			parent := tspath.GetDirectoryPath(directory)
			if parent == directory || parent == "" {
				break
			}
			directory = parent
		}
		if s.watchAliasesError != nil {
			break
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

// Registration and reuse observe the same facts. Already-shared source lookup
// collections need not be traversed again during an overlay-only edit.
func (s *Snapshot) watchRegistrations(previous *Snapshot) iter.Seq[watchalias.Registration] {
	return func(yield func(watchalias.Registration) bool) {
		native := s.nativeWatchAliasesEnabled()
		for _, file := range s.fs.diskFiles {
			if native || file.realpathName != "" {
				if !yield(watchalias.Registration{Name: file.FileName(), Realpath: file.realpathName, Dependency: file.realpathName != ""}) {
					return
				}
			}
		}
		if !native {
			return
		}
		name := func(name string) bool { return yield(watchalias.Registration{Name: name}) }
		for _, file := range s.fs.overlays {
			if !name(file.FileName()) {
				return
			}
		}
		for _, config := range s.ConfigFileRegistry.configs {
			if !name(config.fileName) {
				return
			}
			if config.commandLine != nil {
				for directory := range config.commandLine.WildcardDirectories() {
					if !name(directory) {
						return
					}
				}
			}
		}
		for _, search := range s.ConfigFileRegistry.configFileNames {
			if !name(search.fileName) {
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
						names.Range(func(_ tspath.Path, value string) bool {
							more = name(value)
							return more
						})
						if !more {
							return
						}
					}
				}
			}
			if project.contentMapperWatch != nil {
				for _, value := range project.contentMapperWatch.input {
					if !name(value) {
						return
					}
				}
			}
		}
		if s.autoImportsWatch != nil {
			for _, directory := range s.autoImportsWatch.input {
				if !name(directory) {
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
	return snapshot.watchAliases != nil || snapshot.watchAliasesError != nil
}

func (s *Snapshot) watchAliasChangesAreContentOnly(change FileChangeSummary, overlays map[tspath.Path]*Overlay) bool {
	if change.hasFileSystemChanges || change.InvalidateAll || change.IncludesWatchChangeOutsideNodeModules ||
		change.Opened != "" || change.Reopened != "" || change.Closed.Len() != 0 || change.Created.Len() != 0 || change.Deleted.Len() != 0 {
		return false
	}
	for uri := range change.Changed.Keys() {
		path := s.host.toPath(uri.FileName())
		previous, next := s.fs.overlays[path], overlays[path]
		if previous == nil || next == nil || previous == next {
			return false
		}
	}
	return true
}

func (s *Snapshot) initializeWatchAliasesFrom(previous *Snapshot, contentOnly bool, logger logging.Logger) {
	if !s.nativeWatchAliasesEnabled() && s.fs.realpathFiles == 0 {
		return
	}
	if contentOnly && previous.watchAliasesError == nil && previous.watchAliases != nil &&
		s.nativeWatchAliasesEnabled() == previous.nativeWatchAliasesEnabled() && s.canReuseWatchAliases(previous) {
		s.watchAliases = previous.watchAliases
		return
	}
	s.initializeWatchAliases(logger)
}

// Surplus immutable coverage supplies candidates, never live project membership.
func (s *Snapshot) canReuseWatchAliases(previous *Snapshot) bool {
	for registration := range s.watchRegistrations(previous) {
		if !previous.watchAliases.Covers(registration) {
			registration.Name = s.normalizeWatchAliasName(registration.Name)
			if registration.Name != "" && !previous.watchAliases.Covers(registration) {
				return false
			}
		}
	}
	return true
}

func (s *Snapshot) watchNames(name string) []string {
	if s.watchAliases != nil {
		return s.watchAliases.Expand(name)
	}
	return []string{name}
}

func (s *Snapshot) expandWatchAliases(change FileChangeSummary) FileChangeSummary {
	change, _ = s.matchWatchChanges(change)
	return change
}

func (s *Snapshot) matchWatchChanges(change FileChangeSummary) (FileChangeSummary, []string) {
	if prepared := change.preparedWatchChanges; prepared != nil {
		if prepared.snapshotID != s.id {
			panic("watch changes must be prepared for the snapshot being cloned")
		}
		return change, prepared.affected
	}
	if s.watchAliasesError != nil && change.Created.Len()+change.Changed.Len()+change.Deleted.Len() != 0 {
		change.InvalidateAll = true
	}
	if s.watchAliases == nil {
		return change, nil
	}
	var affected collections.Set[string]
	expand := func(uris collections.Set[lsproto.DocumentUri], kind fswatch.EventKind) collections.Set[lsproto.DocumentUri] {
		if uris.Len() == 0 {
			return uris
		}
		events := make(map[string]fswatch.EventKind, uris.Len())
		for uri := range uris.Keys() {
			events[uri.FileName()] = kind
		}
		matches := s.watchAliases.Match(events)
		var result collections.Set[lsproto.DocumentUri]
		for name := range matches.Changes {
			result.Add(lsconv.FileNameToDocumentURI(name))
		}
		for _, name := range matches.Affected {
			affected.Add(name)
		}
		return result
	}
	change.Created = expand(change.Created, fswatch.EventUpdate)
	change.Changed = expand(change.Changed, fswatch.EventUpdate)
	change.Deleted = expand(change.Deleted, fswatch.EventDelete)
	return change, slices.Collect(maps.Keys(affected.Keys()))
}

func (s *Snapshot) watchChangesOverlapProjectState(change FileChangeSummary) bool {
	for _, events := range []collections.Set[lsproto.DocumentUri]{change.Changed, change.Deleted} {
		for uri := range events.Keys() {
			path := s.host.toPath(uri.FileName())
			base := tspath.GetBaseFileName(string(path))
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
