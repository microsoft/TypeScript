package api

import (
	"errors"
	"fmt"
	"io/fs"
	"slices"
	"strings"
	"sync"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// snapshotFileSystem is either a total in-memory filesystem or a read-through
// cache layered over the session host filesystem. Cache misses deliberately go
// through base, which may itself be a callback filesystem.
type snapshotFileSystem struct {
	mu                    sync.RWMutex
	kind                  SnapshotFileSystemKind
	base                  vfs.FS
	layered               bool
	currentDirectory      string
	useCaseSensitiveNames bool
	files                 map[tspath.Path]snapshotFile
	directoryListings     map[tspath.Path]vfs.Entries
	symlinks              map[tspath.Path]snapshotSymlink
	removedPaths          map[tspath.Path]struct{}
	directories           map[tspath.Path]string
	derivedListings       map[tspath.Path]*snapshotDirectoryBuilder
}

type snapshotFile struct {
	fileName string
	content  string
}

type snapshotSymlink struct {
	linkName string
	target   string
	host     bool
}

type resolvedSnapshotPath struct {
	path            string
	followedSymlink bool
	host            bool
	ok              bool
}

type snapshotDirectoryBuilder struct {
	files       map[tspath.Path]string
	directories map[tspath.Path]string
}

type fileSystemUnwrapper interface {
	Unwrap() vfs.FS
}

func getSnapshotFileSystem(fileSystem vfs.FS) *snapshotFileSystem {
	seen := make(map[vfs.FS]struct{})
	for fileSystem != nil {
		if _, ok := seen[fileSystem]; ok {
			return nil
		}
		seen[fileSystem] = struct{}{}
		if snapshotFileSystem, ok := fileSystem.(*snapshotFileSystem); ok {
			return snapshotFileSystem
		}
		unwrapper, ok := fileSystem.(fileSystemUnwrapper)
		if !ok {
			return nil
		}
		fileSystem = unwrapper.Unwrap()
	}
	return nil
}

func getHostFileSystem(fileSystem vfs.FS) vfs.FS {
	seen := make(map[vfs.FS]struct{})
	for fileSystem != nil {
		if _, ok := seen[fileSystem]; ok {
			return nil
		}
		seen[fileSystem] = struct{}{}
		if snapshotFileSystem, ok := fileSystem.(*snapshotFileSystem); ok {
			fileSystem = snapshotFileSystem.base
			continue
		}
		if unwrapper, ok := fileSystem.(fileSystemUnwrapper); ok {
			fileSystem = unwrapper.Unwrap()
			continue
		}
		return fileSystem
	}
	return nil
}

func newSnapshotFileSystem(params *SnapshotFileSystem, base vfs.FS, currentDirectory string) (vfs.FS, error) {
	return newSnapshotFileSystemWorker(params, base, currentDirectory, false)
}

func newLayeredSnapshotFileSystem(params *SnapshotFileSystem, base vfs.FS, currentDirectory string) (vfs.FS, error) {
	return newSnapshotFileSystemWorker(params, base, currentDirectory, params.Kind == SnapshotFileSystemKindCache)
}

func newSnapshotFileSystemWorker(params *SnapshotFileSystem, base vfs.FS, currentDirectory string, layered bool) (vfs.FS, error) {
	if params.Kind != SnapshotFileSystemKindMemory && params.Kind != SnapshotFileSystemKindCache {
		return nil, fmt.Errorf("unknown snapshot filesystem kind %q", params.Kind)
	}

	result := &snapshotFileSystem{
		kind:                  params.Kind,
		base:                  base,
		layered:               layered,
		currentDirectory:      currentDirectory,
		useCaseSensitiveNames: base.UseCaseSensitiveFileNames(),
		files:                 make(map[tspath.Path]snapshotFile, len(params.Files)),
		directoryListings:     make(map[tspath.Path]vfs.Entries, len(params.Directories)),
		symlinks:              make(map[tspath.Path]snapshotSymlink, len(params.Symlinks)),
		removedPaths:          make(map[tspath.Path]struct{}, len(params.RemovedPaths)),
	}
	for fileName, content := range params.Files {
		absoluteFileName := result.toAbsolutePath(fileName)
		path := result.toPath(absoluteFileName)
		if existing, ok := result.files[path]; ok {
			return nil, fmt.Errorf("duplicate snapshot filesystem file path %q and %q", existing.fileName, absoluteFileName)
		}
		result.files[path] = snapshotFile{fileName: absoluteFileName, content: content}
	}
	for directoryName, entries := range params.Directories {
		absoluteDirectoryName := result.toAbsolutePath(directoryName)
		path := result.toPath(absoluteDirectoryName)
		if _, ok := result.directoryListings[path]; ok {
			return nil, fmt.Errorf("duplicate snapshot filesystem directory path %q", absoluteDirectoryName)
		}
		result.directoryListings[path] = vfs.Entries{
			Files:       slices.Clone(entries.Files),
			Directories: slices.Clone(entries.Directories),
		}
	}
	for linkName, symlink := range params.Symlinks {
		absoluteLinkName := result.toAbsolutePath(linkName)
		path := result.toPath(absoluteLinkName)
		if existing, ok := result.symlinks[path]; ok {
			return nil, fmt.Errorf("duplicate snapshot filesystem symlink path %q and %q", existing.linkName, absoluteLinkName)
		}
		targetDirectory := tspath.GetDirectoryPath(absoluteLinkName)
		absoluteTarget := result.toAbsolutePathFrom(symlink.Target, targetDirectory)
		result.symlinks[path] = snapshotSymlink{
			linkName: absoluteLinkName,
			target:   absoluteTarget,
			host:     symlink.Host,
		}
	}
	for _, path := range params.RemovedPaths {
		result.removedPaths[result.toPath(result.toAbsolutePath(path))] = struct{}{}
	}
	result.rebuildDirectoriesLocked()
	return result, nil
}

func (s *snapshotFileSystem) fallsBack() bool {
	return s.layered || s.kind == SnapshotFileSystemKindCache
}

func (s *snapshotFileSystem) isRemoved(path string) bool {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.isRemovedLocked(path)
}

func (s *snapshotFileSystem) isRemovedLocked(path string) bool {
	canonicalPath := s.toPath(path)
	for removedPath := range s.removedPaths {
		if canonicalPath == removedPath || strings.HasPrefix(string(canonicalPath), tspath.EnsureTrailingDirectorySeparator(string(removedPath))) {
			return true
		}
	}
	return false
}

func (s *snapshotFileSystem) toAbsolutePath(path string) string {
	return s.toAbsolutePathFrom(path, s.currentDirectory)
}

func (s *snapshotFileSystem) toAbsolutePathFrom(path string, currentDirectory string) string {
	absolutePath := tspath.GetNormalizedAbsolutePath(path, currentDirectory)
	if tspath.IsDiskPathRoot(absolutePath) {
		return absolutePath
	}
	return tspath.RemoveTrailingDirectorySeparator(absolutePath)
}

func (s *snapshotFileSystem) toPath(path string) tspath.Path {
	return tspath.ToPath(path, s.currentDirectory, s.useCaseSensitiveNames)
}

func (s *snapshotFileSystem) registerDirectoryLocked(directoryName string) {
	directoryName = s.toAbsolutePath(directoryName)
	directoryPath := s.toPath(directoryName)
	if _, ok := s.directories[directoryPath]; ok {
		return
	}
	s.directories[directoryPath] = directoryName
	if s.derivedListings[directoryPath] == nil {
		s.derivedListings[directoryPath] = &snapshotDirectoryBuilder{}
	}

	parentName := tspath.GetDirectoryPath(directoryName)
	parentPath := s.toPath(parentName)
	if parentPath == directoryPath {
		return
	}
	s.registerDirectoryLocked(parentName)
	parent := s.derivedListings[parentPath]
	if parent.directories == nil {
		parent.directories = make(map[tspath.Path]string)
	}
	parent.directories[directoryPath] = tspath.GetBaseFileName(directoryName)
}

func (s *snapshotFileSystem) rebuildDirectoriesLocked() {
	s.directories = make(map[tspath.Path]string)
	s.derivedListings = make(map[tspath.Path]*snapshotDirectoryBuilder)
	s.registerDirectoryLocked(s.currentDirectory)
	for path, file := range s.files {
		parentName := tspath.GetDirectoryPath(file.fileName)
		parentPath := s.toPath(parentName)
		s.registerDirectoryLocked(parentName)
		listing := s.derivedListings[parentPath]
		if listing.files == nil {
			listing.files = make(map[tspath.Path]string)
		}
		listing.files[path] = tspath.GetBaseFileName(file.fileName)
	}
	for path, entries := range s.directoryListings {
		directoryName := string(path)
		s.registerDirectoryLocked(directoryName)
		for _, child := range entries.Directories {
			s.registerDirectoryLocked(tspath.CombinePaths(directoryName, child))
		}
	}
	for _, symlink := range s.symlinks {
		s.registerDirectoryLocked(tspath.GetDirectoryPath(symlink.linkName))
	}
}

func (s *snapshotFileSystem) resolvePath(path string) resolvedSnapshotPath {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.resolvePathLocked(path)
}

func (s *snapshotFileSystem) resolvePathLocked(path string) resolvedSnapshotPath {
	path = s.toAbsolutePath(path)
	result := resolvedSnapshotPath{path: path, ok: true}
	seen := make(map[tspath.Path]struct{}, len(s.symlinks))
	for {
		canonicalPath := string(s.toPath(result.path))
		var matchPath tspath.Path
		var match snapshotSymlink
		for linkPath, symlink := range s.symlinks {
			canonicalLink := string(linkPath)
			if canonicalPath != canonicalLink && !strings.HasPrefix(canonicalPath, tspath.EnsureTrailingDirectorySeparator(canonicalLink)) {
				continue
			}
			// Resolve the first link encountered while walking from the root. This
			// matches native path traversal when links happen to overlap.
			if matchPath == "" || len(linkPath) < len(matchPath) {
				matchPath = linkPath
				match = symlink
			}
		}
		if matchPath == "" {
			result.host = s.isHostPathLocked(result.path)
			return result
		}
		if _, ok := seen[matchPath]; ok {
			result.ok = false
			return result
		}
		seen[matchPath] = struct{}{}
		result.followedSymlink = true
		suffix, ok := tspath.TrimFilePathPrefix(result.path, match.linkName, s.useCaseSensitiveNames)
		if !ok {
			result.ok = false
			return result
		}
		result.path = s.toAbsolutePath(match.target + suffix)
		if match.host {
			result.host = true
			return result
		}
	}
}

// resolvePathForOverlay resolves the effective path through this snapshot layer
// and any underlying snapshot layers, stopping when this layer supplies or removes
// the resolved path. Callers in a newer layer use this to apply their own entries
// to targets of inherited symlinks before delegating the operation to the base.
func (s *snapshotFileSystem) resolvePathForOverlay(path string) resolvedSnapshotPath {
	resolved := s.resolvePath(path)
	if !resolved.ok || resolved.host {
		return resolved
	}
	if _, ok := s.fileAt(resolved.path); ok {
		return resolved
	}
	if _, ok := s.directoryAt(resolved.path); ok {
		return resolved
	}
	if !resolved.followedSymlink && s.isRemoved(path) || s.isRemoved(resolved.path) || !s.fallsBack() {
		return resolved
	}
	baseResolved := s.resolveBasePath(resolved.path)
	baseResolved.followedSymlink = baseResolved.followedSymlink || resolved.followedSymlink
	return baseResolved
}

func (s *snapshotFileSystem) resolveBasePath(path string) resolvedSnapshotPath {
	if base := getSnapshotFileSystem(s.base); base != nil {
		return base.resolvePathForOverlay(path)
	}
	return resolvedSnapshotPath{path: path, ok: true}
}

func (s *snapshotFileSystem) isHostPathLocked(path string) bool {
	canonicalPath := string(s.toPath(path))
	for _, symlink := range s.symlinks {
		if !symlink.host {
			continue
		}
		canonicalTarget := string(s.toPath(symlink.target))
		if canonicalPath == canonicalTarget || strings.HasPrefix(canonicalPath, tspath.EnsureTrailingDirectorySeparator(canonicalTarget)) {
			return true
		}
	}
	return false
}

func (s *snapshotFileSystem) aliasesForPath(path string) []string {
	symlinks := make([]snapshotSymlink, 0, len(s.symlinks))
	for current := s; current != nil; {
		current.mu.RLock()
		for _, symlink := range current.symlinks {
			symlinks = append(symlinks, symlink)
		}
		current.mu.RUnlock()
		base := getSnapshotFileSystem(current.base)
		if base == nil {
			break
		}
		current = base
	}

	seen := map[tspath.Path]struct{}{s.toPath(path): {}}
	queue := []string{s.toAbsolutePath(path)}
	var aliases []string
	for len(queue) > 0 {
		candidate := queue[0]
		queue = queue[1:]
		for _, symlink := range symlinks {
			suffix, ok := tspath.TrimFilePathPrefix(candidate, symlink.target, s.useCaseSensitiveNames)
			if !ok || suffix != "" && !tspath.HasTrailingDirectorySeparator(symlink.target) && !strings.HasPrefix(suffix, "/") {
				continue
			}
			alias := s.toAbsolutePath(symlink.linkName + suffix)
			aliasPath := s.toPath(alias)
			if _, ok := seen[aliasPath]; ok {
				continue
			}
			seen[aliasPath] = struct{}{}
			aliases = append(aliases, alias)
			queue = append(queue, alias)
		}
	}
	return aliases
}

func (s *snapshotFileSystem) fileAt(path string) (snapshotFile, bool) {
	s.mu.RLock()
	file, ok := s.files[s.toPath(path)]
	s.mu.RUnlock()
	return file, ok
}

func (s *snapshotFileSystem) directoryAt(path string) (string, bool) {
	s.mu.RLock()
	directory, ok := s.directories[s.toPath(path)]
	s.mu.RUnlock()
	return directory, ok
}

func cloneEntries(entries vfs.Entries) vfs.Entries {
	result := vfs.Entries{
		Files:       slices.Clone(entries.Files),
		Directories: slices.Clone(entries.Directories),
	}
	if entries.Symlinks != nil {
		result.Symlinks = make(map[string]struct{}, len(entries.Symlinks))
		for name := range entries.Symlinks {
			result.Symlinks[name] = struct{}{}
		}
	}
	return result
}

func (s *snapshotFileSystem) UseCaseSensitiveFileNames() bool {
	return s.useCaseSensitiveNames
}

func (s *snapshotFileSystem) ReadFile(fileName string) (string, bool) {
	resolved := s.resolvePath(fileName)
	if !resolved.ok {
		return "", false
	}
	if resolved.host {
		if s.isRemoved(resolved.path) {
			return "", false
		}
		host := getHostFileSystem(s.base)
		if host == nil {
			return "", false
		}
		return host.ReadFile(resolved.path)
	}
	file, ok := s.fileAt(resolved.path)
	if ok {
		return file.content, true
	}
	if _, ok := s.directoryAt(resolved.path); ok {
		return "", false
	}
	if !resolved.followedSymlink && s.isRemoved(fileName) {
		return "", false
	}
	fallbackPath := resolved.path
	if s.fallsBack() {
		fallback := s.resolveBasePath(resolved.path)
		if !fallback.ok {
			return "", false
		}
		fallbackPath = fallback.path
		if file, ok := s.fileAt(fallbackPath); ok {
			return file.content, true
		}
		if _, ok := s.directoryAt(fallbackPath); ok {
			return "", false
		}
	}
	if s.isRemoved(resolved.path) || s.isRemoved(fallbackPath) {
		return "", false
	}
	if s.fallsBack() {
		return s.base.ReadFile(resolved.path)
	}
	return "", false
}

func (s *snapshotFileSystem) FileExists(fileName string) bool {
	resolved := s.resolvePath(fileName)
	if !resolved.ok {
		return false
	}
	if resolved.host {
		if s.isRemoved(resolved.path) {
			return false
		}
		host := getHostFileSystem(s.base)
		return host != nil && host.FileExists(resolved.path)
	}
	_, ok := s.fileAt(resolved.path)
	if ok {
		return true
	}
	if _, ok := s.directoryAt(resolved.path); ok {
		return false
	}
	if !resolved.followedSymlink && s.isRemoved(fileName) {
		return false
	}
	fallbackPath := resolved.path
	if s.fallsBack() {
		fallback := s.resolveBasePath(resolved.path)
		if !fallback.ok {
			return false
		}
		fallbackPath = fallback.path
		if _, ok := s.fileAt(fallbackPath); ok {
			return true
		}
		if _, ok := s.directoryAt(fallbackPath); ok {
			return false
		}
	}
	if s.isRemoved(resolved.path) || s.isRemoved(fallbackPath) || !s.fallsBack() {
		return false
	}
	return s.base.FileExists(resolved.path)
}

func (s *snapshotFileSystem) DirectoryExists(directoryName string) bool {
	resolved := s.resolvePath(directoryName)
	if !resolved.ok {
		return false
	}
	if resolved.host {
		if s.isRemoved(resolved.path) {
			return false
		}
		host := getHostFileSystem(s.base)
		return host != nil && host.DirectoryExists(resolved.path)
	}
	_, ok := s.directoryAt(resolved.path)
	if ok {
		return true
	}
	if _, ok := s.fileAt(resolved.path); ok {
		return false
	}
	if !resolved.followedSymlink && s.isRemoved(directoryName) {
		return false
	}
	fallbackPath := resolved.path
	if s.fallsBack() {
		fallback := s.resolveBasePath(resolved.path)
		if !fallback.ok {
			return false
		}
		fallbackPath = fallback.path
		if _, ok := s.directoryAt(fallbackPath); ok {
			return true
		}
		if _, ok := s.fileAt(fallbackPath); ok {
			return false
		}
	}
	if s.isRemoved(resolved.path) || s.isRemoved(fallbackPath) || !s.fallsBack() {
		return false
	}
	return s.base.DirectoryExists(resolved.path)
}

func (s *snapshotFileSystem) GetAccessibleEntries(directoryName string) vfs.Entries {
	resolved := s.resolvePath(directoryName)
	if !resolved.ok {
		return vfs.Entries{Symlinks: map[string]struct{}{}}
	}
	if _, ok := s.fileAt(resolved.path); ok {
		return vfs.Entries{Symlinks: map[string]struct{}{}}
	}

	localEntries, hasExplicitListing, hasLocalEntries := s.getLocalEntries(resolved.path)
	if !resolved.followedSymlink && s.isRemoved(directoryName) && !hasLocalEntries {
		return vfs.Entries{Symlinks: map[string]struct{}{}}
	}
	fallbackPath := resolved.path
	if !resolved.host && s.fallsBack() {
		fallback := s.resolveBasePath(resolved.path)
		if !fallback.ok {
			return vfs.Entries{Symlinks: map[string]struct{}{}}
		}
		fallbackPath = fallback.path
		if _, ok := s.fileAt(fallbackPath); ok {
			return vfs.Entries{Symlinks: map[string]struct{}{}}
		}
		if s.toPath(fallbackPath) != s.toPath(resolved.path) {
			targetEntries, targetExplicit, targetLocal := s.getLocalEntries(fallbackPath)
			if targetLocal {
				localEntries = mergeEntries(localEntries, targetEntries, s.equalEntryNames)
				hasLocalEntries = true
			}
			hasExplicitListing = hasExplicitListing || targetExplicit
		}
	}
	var result vfs.Entries
	if resolved.host {
		if !s.isRemoved(resolved.path) {
			if host := getHostFileSystem(s.base); host != nil {
				result = s.removeEntries(resolved.path, host.GetAccessibleEntries(resolved.path))
			}
		}
	} else if !s.fallsBack() || hasExplicitListing && !s.layered {
		result = localEntries
	} else {
		if !s.isRemoved(directoryName) && !s.isRemoved(resolved.path) && !s.isRemoved(fallbackPath) {
			result = s.removeEntries(directoryName, s.base.GetAccessibleEntries(resolved.path))
			if s.toPath(directoryName) != s.toPath(resolved.path) {
				result = s.removeEntries(resolved.path, result)
			}
			if s.toPath(fallbackPath) != s.toPath(resolved.path) {
				result = s.removeEntries(fallbackPath, result)
			}
		}
		if hasLocalEntries {
			result = mergeEntries(result, localEntries, s.equalEntryNames)
		}
	}
	result = s.addSymlinkEntries(resolved.path, result)
	if s.toPath(fallbackPath) != s.toPath(resolved.path) {
		result = s.addSymlinkEntries(fallbackPath, result)
	}
	return result
}

func (s *snapshotFileSystem) getLocalEntries(directoryName string) (entries vfs.Entries, explicit bool, ok bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	path := s.toPath(directoryName)
	if listing, ok := s.directoryListings[path]; ok {
		return cloneEntries(listing), true, true
	}
	builder := s.derivedListings[path]
	if builder == nil {
		return vfs.Entries{}, false, false
	}
	for _, name := range builder.files {
		entries.Files = append(entries.Files, name)
	}
	for _, name := range builder.directories {
		entries.Directories = append(entries.Directories, name)
	}
	slices.Sort(entries.Files)
	slices.Sort(entries.Directories)
	return entries, false, true
}

func mergeEntries(base vfs.Entries, overlay vfs.Entries, equal func(string, string) bool) vfs.Entries {
	result := cloneEntries(base)
	if result.Symlinks == nil {
		result.Symlinks = map[string]struct{}{}
	}
	deleteSymlink := func(name string) {
		for existingName := range result.Symlinks {
			if equal(existingName, name) {
				delete(result.Symlinks, existingName)
			}
		}
	}
	addFile := func(name string) {
		result.Directories = slices.DeleteFunc(result.Directories, func(value string) bool { return equal(value, name) })
		if !slices.ContainsFunc(result.Files, func(value string) bool { return equal(value, name) }) {
			result.Files = append(result.Files, name)
		}
		deleteSymlink(name)
	}
	addDirectory := func(name string) {
		result.Files = slices.DeleteFunc(result.Files, func(value string) bool { return equal(value, name) })
		if !slices.ContainsFunc(result.Directories, func(value string) bool { return equal(value, name) }) {
			result.Directories = append(result.Directories, name)
		}
		deleteSymlink(name)
	}
	for _, name := range overlay.Files {
		addFile(name)
	}
	for _, name := range overlay.Directories {
		addDirectory(name)
	}
	for name := range overlay.Symlinks {
		result.Symlinks[name] = struct{}{}
	}
	slices.Sort(result.Files)
	slices.Sort(result.Directories)
	return result
}

func (s *snapshotFileSystem) removeEntries(directoryName string, entries vfs.Entries) vfs.Entries {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.removeEntriesLocked(directoryName, entries)
}

func (s *snapshotFileSystem) removeEntriesLocked(directoryName string, entries vfs.Entries) vfs.Entries {
	result := cloneEntries(entries)
	filter := func(values []string) []string {
		return slices.DeleteFunc(values, func(name string) bool {
			return s.isRemovedLocked(tspath.CombinePaths(directoryName, name))
		})
	}
	result.Files = filter(result.Files)
	result.Directories = filter(result.Directories)
	for name := range result.Symlinks {
		if s.isRemovedLocked(tspath.CombinePaths(directoryName, name)) {
			delete(result.Symlinks, name)
		}
	}
	return result
}

func (s *snapshotFileSystem) addSymlinkEntries(directoryName string, entries vfs.Entries) vfs.Entries {
	result := cloneEntries(entries)
	if result.Symlinks == nil {
		result.Symlinks = map[string]struct{}{}
	}

	s.mu.RLock()
	directoryPath := s.toPath(directoryName)
	var links []snapshotSymlink
	for _, symlink := range s.symlinks {
		if s.toPath(tspath.GetDirectoryPath(symlink.linkName)) == directoryPath {
			links = append(links, symlink)
		}
	}
	s.mu.RUnlock()

	for _, symlink := range links {
		name := tspath.GetBaseFileName(symlink.linkName)
		result.Files = s.deleteEntryName(result.Files, name)
		result.Directories = s.deleteEntryName(result.Directories, name)
		for existingName := range result.Symlinks {
			if s.equalEntryNames(existingName, name) {
				delete(result.Symlinks, existingName)
			}
		}
		if s.DirectoryExists(symlink.linkName) {
			result.Directories = append(result.Directories, name)
			result.Symlinks[name] = struct{}{}
		} else if s.FileExists(symlink.linkName) {
			result.Files = append(result.Files, name)
			result.Symlinks[name] = struct{}{}
		}
	}
	slices.Sort(result.Files)
	slices.Sort(result.Directories)
	return result
}

func (s *snapshotFileSystem) deleteEntryName(values []string, value string) []string {
	return slices.DeleteFunc(values, func(candidate string) bool { return s.equalEntryNames(candidate, value) })
}

func (s *snapshotFileSystem) equalEntryNames(left string, right string) bool {
	return tspath.GetCanonicalFileName(left, s.useCaseSensitiveNames) == tspath.GetCanonicalFileName(right, s.useCaseSensitiveNames)
}

func (s *snapshotFileSystem) Realpath(path string) string {
	resolved := s.resolvePath(path)
	if !resolved.ok {
		return path
	}
	if _, ok := s.fileAt(resolved.path); ok {
		return resolved.path
	}
	if _, ok := s.directoryAt(resolved.path); ok {
		return resolved.path
	}
	if !resolved.followedSymlink && s.isRemoved(path) {
		return path
	}
	fallbackPath := resolved.path
	if !resolved.host && s.fallsBack() {
		fallback := s.resolveBasePath(resolved.path)
		if !fallback.ok {
			return path
		}
		fallbackPath = fallback.path
		if _, ok := s.fileAt(fallbackPath); ok {
			return fallbackPath
		}
		if _, ok := s.directoryAt(fallbackPath); ok {
			return fallbackPath
		}
	}
	if s.isRemoved(resolved.path) || s.isRemoved(fallbackPath) {
		return path
	}
	if resolved.host {
		if host := getHostFileSystem(s.base); host != nil {
			return host.Realpath(resolved.path)
		}
		return path
	}
	if resolved.followedSymlink && !s.fallsBack() {
		return path
	}
	if s.fallsBack() {
		return s.base.Realpath(resolved.path)
	}
	return resolved.path
}

func (s *snapshotFileSystem) WriteFile(fileName string, data string) error {
	if s.kind != SnapshotFileSystemKindCache {
		return vfs.ErrInvalid
	}
	host := getHostFileSystem(s.base)
	if host == nil {
		return vfs.ErrInvalid
	}
	return host.WriteFile(s.toAbsolutePath(fileName), data)
}

func (s *snapshotFileSystem) AppendFile(fileName string, data string) error {
	if s.kind != SnapshotFileSystemKindCache {
		return vfs.ErrInvalid
	}
	host := getHostFileSystem(s.base)
	if host == nil {
		return vfs.ErrInvalid
	}
	return host.AppendFile(s.toAbsolutePath(fileName), data)
}

func (s *snapshotFileSystem) Remove(path string) error {
	if s.kind != SnapshotFileSystemKindCache {
		return vfs.ErrInvalid
	}
	host := getHostFileSystem(s.base)
	if host == nil {
		return vfs.ErrInvalid
	}
	return host.Remove(s.toAbsolutePath(path))
}

func (s *snapshotFileSystem) Chtimes(path string, aTime time.Time, mTime time.Time) error {
	resolved := s.resolvePath(path)
	if !resolved.ok {
		return vfs.ErrInvalid
	}
	if s.kind != SnapshotFileSystemKindCache {
		return vfs.ErrInvalid
	}
	host := getHostFileSystem(s.base)
	if host == nil {
		return vfs.ErrInvalid
	}
	return host.Chtimes(s.toAbsolutePath(path), aTime, mTime)
}

func (s *snapshotFileSystem) Stat(path string) vfs.FileInfo {
	resolved := s.resolvePath(path)
	if !resolved.ok {
		return nil
	}
	s.mu.RLock()
	canonicalPath := s.toPath(resolved.path)
	if file, ok := s.files[canonicalPath]; ok {
		info := snapshotFileInfo{name: tspath.GetBaseFileName(file.fileName), size: int64(len(file.content))}
		s.mu.RUnlock()
		return info
	}
	if directoryName, ok := s.directories[canonicalPath]; ok {
		info := snapshotFileInfo{name: tspath.GetBaseFileName(directoryName), directory: true}
		s.mu.RUnlock()
		return info
	}
	s.mu.RUnlock()
	if !resolved.followedSymlink && s.isRemoved(path) {
		return nil
	}
	fallbackPath := resolved.path
	if !resolved.host && s.fallsBack() {
		fallback := s.resolveBasePath(resolved.path)
		if !fallback.ok {
			return nil
		}
		fallbackPath = fallback.path
		s.mu.RLock()
		canonicalFallbackPath := s.toPath(fallbackPath)
		if file, ok := s.files[canonicalFallbackPath]; ok {
			info := snapshotFileInfo{name: tspath.GetBaseFileName(file.fileName), size: int64(len(file.content))}
			s.mu.RUnlock()
			return info
		}
		if directoryName, ok := s.directories[canonicalFallbackPath]; ok {
			info := snapshotFileInfo{name: tspath.GetBaseFileName(directoryName), directory: true}
			s.mu.RUnlock()
			return info
		}
		s.mu.RUnlock()
	}
	if s.isRemoved(resolved.path) || s.isRemoved(fallbackPath) {
		return nil
	}
	if resolved.host {
		return statFileSystem(getHostFileSystem(s.base), resolved.path)
	}
	if s.fallsBack() {
		return statFileSystem(s.base, resolved.path)
	}
	return nil
}

func statFileSystem(fileSystem vfs.FS, path string) vfs.FileInfo {
	if fileSystem == nil {
		return nil
	}
	if info := fileSystem.Stat(path); info != nil {
		return info
	}
	name := tspath.GetBaseFileName(path)
	if fileSystem.DirectoryExists(path) {
		return snapshotFileInfo{name: name, directory: true}
	}
	if fileSystem.FileExists(path) {
		return snapshotFileInfo{name: name}
	}
	return nil
}

func (s *snapshotFileSystem) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	originalRoot := s.toAbsolutePath(root)
	resolved := s.resolvePath(originalRoot)
	if !resolved.ok {
		return walkFn(originalRoot, nil, vfs.ErrNotExist)
	}
	info := s.Stat(originalRoot)
	if info == nil {
		return walkFn(originalRoot, nil, vfs.ErrNotExist)
	}
	visited := map[string]struct{}{}
	if err := s.walkDir(originalRoot, snapshotDirEntry{info: info}, walkFn, visited); errors.Is(err, fs.SkipAll) {
		return nil
	} else {
		return err
	}
}

func (s *snapshotFileSystem) walkDir(path string, entry snapshotDirEntry, walkFn vfs.WalkDirFunc, visited map[string]struct{}) error {
	realpath := s.Realpath(path)
	if _, ok := visited[realpath]; ok {
		return nil
	}
	visited[realpath] = struct{}{}
	err := walkFn(path, entry, nil)
	if err != nil {
		if errors.Is(err, fs.SkipDir) && entry.IsDir() {
			return nil
		}
		return err
	}
	if !entry.IsDir() {
		return nil
	}
	entries := s.GetAccessibleEntries(path)
	names := append(slices.Clone(entries.Directories), entries.Files...)
	slices.Sort(names)
	for _, name := range names {
		childPath := tspath.CombinePaths(path, name)
		childInfo := s.Stat(childPath)
		if childInfo == nil {
			continue
		}
		if err := s.walkDir(childPath, snapshotDirEntry{info: childInfo}, walkFn, visited); err != nil {
			if errors.Is(err, fs.SkipDir) {
				return nil
			}
			return err
		}
	}
	return nil
}

type snapshotFileInfo struct {
	name      string
	size      int64
	directory bool
}

func (i snapshotFileInfo) Name() string       { return i.name }
func (i snapshotFileInfo) Size() int64        { return i.size }
func (i snapshotFileInfo) ModTime() time.Time { return time.Time{} }
func (i snapshotFileInfo) IsDir() bool        { return i.directory }
func (i snapshotFileInfo) Sys() any           { return nil }
func (i snapshotFileInfo) Mode() fs.FileMode {
	if i.directory {
		return fs.ModeDir | 0o555
	}
	return 0o444
}

type snapshotDirEntry struct {
	info vfs.FileInfo
}

func (e snapshotDirEntry) Name() string               { return e.info.Name() }
func (e snapshotDirEntry) IsDir() bool                { return e.info.IsDir() }
func (e snapshotDirEntry) Type() fs.FileMode          { return e.info.Mode().Type() }
func (e snapshotDirEntry) Info() (fs.FileInfo, error) { return e.info, nil }

var _ vfs.FS = (*snapshotFileSystem)(nil)
