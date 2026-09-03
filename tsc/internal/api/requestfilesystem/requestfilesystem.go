package requestfilesystem

import (
	"errors"
	"fmt"
	"io/fs"
	"maps"
	"slices"
	"strings"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// Kind controls how a request filesystem is used.
type Kind string

const (
	// KindFull makes the supplied filesystem canonical and total.
	KindFull Kind = "full"
	// KindLayer checks the supplied filesystem before falling back to the host.
	KindLayer Kind = "layer"
)

// RequestDirectoryEntries is a cached directory listing. Entry names are
// relative to the directory, matching vfs.GetAccessibleEntries.
type RequestDirectoryEntries struct {
	Files       []string `json:"files" nonnil:"true"`
	Directories []string `json:"directories" nonnil:"true"`
}

// RequestSymlink describes a symbolic link in a request filesystem.
type RequestSymlink struct {
	// Target is resolved relative to the directory containing the link, matching
	// native symbolic-link semantics.
	Target string `json:"target"`
	// Host routes the target through the host filesystem. This is the only way a
	// full filesystem can access paths not supplied in the request filesystem.
	Host bool `json:"host,omitempty"`
}

// RequestFileSystem supplies file contents and, optionally, directory listings
// for a request that creates a snapshot.
type RequestFileSystem struct {
	Kind Kind `json:"kind"`
	// Files maps file names to their complete contents.
	Files map[string]string `json:"files" nonnil:"true"`
	// Directories maps directory names to complete listing results.
	Directories map[string]RequestDirectoryEntries `json:"directories,omitempty"`
	// Symlinks maps link paths to targets in this filesystem or the host filesystem.
	Symlinks map[string]RequestSymlink `json:"symlinks,omitempty"`
	// RemovedPaths lists files or directory trees that must be treated as missing
	// even when present in an underlying snapshot or host filesystem.
	RemovedPaths []string `json:"removedPaths,omitempty"`
}

// requestFileSystem is either a full filesystem or a layer over the session
// host filesystem. Layer misses deliberately go
// through base, which may itself be a callback filesystem.
type requestFileSystem struct {
	kind                   Kind
	base                   vfs.FS
	layered                bool
	currentDirectory       string
	useCaseSensitiveNames  bool
	files                  map[tspath.Path]requestFile
	directoryListings      map[tspath.Path]vfs.Entries
	symlinks               map[tspath.Path]requestSymlink
	removedPaths           map[tspath.Path]struct{}
	preSymlinkRemovedPaths map[tspath.Path]struct{}
	sealedListings         map[tspath.Path]struct{}
	directories            map[tspath.Path]string
	derivedListings        map[tspath.Path]*requestDirectoryBuilder
}

type requestFile struct {
	fileName string
	content  string
}

type requestSymlink struct {
	linkName string
	target   string
	host     bool
}

type resolvedRequestPath struct {
	path            string
	followedSymlink bool
	host            bool
	ok              bool
}

type requestPathKind uint8

const (
	requestPathKindMissing requestPathKind = iota
	requestPathKindFile
	requestPathKindDirectory
)

type requestPathLookup struct {
	path            string
	kind            requestPathKind
	fileSystem      vfs.FS
	followedSymlink bool
	ok              bool
}

type requestDirectoryBuilder struct {
	files       map[tspath.Path]string
	directories map[tspath.Path]string
}

func getRequestFileSystem(fileSystem vfs.FS) *Handle {
	requestFileSystem, _ := fileSystem.(*Handle)
	return requestFileSystem
}

func getHostFileSystem(fileSystem vfs.FS) vfs.FS {
	for {
		requestFileSystem := getRequestFileSystem(fileSystem)
		if requestFileSystem == nil {
			return fileSystem
		}
		fileSystem = requestFileSystem.baseFileSystem()
	}
}

func newRequestFileSystemWorker(params *RequestFileSystem, base vfs.FS, currentDirectory string, layered bool) (*requestFileSystem, error) {
	if params.Kind != KindFull && params.Kind != KindLayer {
		return nil, fmt.Errorf("unknown request filesystem kind %q", params.Kind)
	}

	result := requestFileSystem{
		kind:                   params.Kind,
		base:                   base,
		layered:                layered,
		currentDirectory:       currentDirectory,
		useCaseSensitiveNames:  base.UseCaseSensitiveFileNames(),
		files:                  make(map[tspath.Path]requestFile, len(params.Files)),
		directoryListings:      make(map[tspath.Path]vfs.Entries, len(params.Directories)),
		symlinks:               make(map[tspath.Path]requestSymlink, len(params.Symlinks)),
		removedPaths:           make(map[tspath.Path]struct{}, len(params.RemovedPaths)),
		preSymlinkRemovedPaths: make(map[tspath.Path]struct{}),
		sealedListings:         make(map[tspath.Path]struct{}, len(params.Directories)),
	}
	for fileName, content := range params.Files {
		absoluteFileName := result.toAbsolutePath(fileName)
		path := result.toPath(absoluteFileName)
		if existing, ok := result.files[path]; ok {
			return nil, fmt.Errorf("duplicate request filesystem file path %q and %q", existing.fileName, absoluteFileName)
		}
		result.files[path] = requestFile{fileName: absoluteFileName, content: content}
	}
	for directoryName, entries := range params.Directories {
		absoluteDirectoryName := result.toAbsolutePath(directoryName)
		path := result.toPath(absoluteDirectoryName)
		if _, ok := result.directoryListings[path]; ok {
			return nil, fmt.Errorf("duplicate request filesystem directory path %q", absoluteDirectoryName)
		}
		result.directoryListings[path] = vfs.Entries{
			Files:       slices.Clone(entries.Files),
			Directories: slices.Clone(entries.Directories),
		}
		if !layered {
			result.sealedListings[path] = struct{}{}
		}
	}
	for linkName, symlink := range params.Symlinks {
		absoluteLinkName := result.toAbsolutePath(linkName)
		path := result.toPath(absoluteLinkName)
		if existing, ok := result.symlinks[path]; ok {
			return nil, fmt.Errorf("duplicate request filesystem symlink path %q and %q", existing.linkName, absoluteLinkName)
		}
		targetDirectory := tspath.GetDirectoryPath(absoluteLinkName)
		absoluteTarget := result.toAbsolutePathFrom(symlink.Target, targetDirectory)
		result.symlinks[path] = requestSymlink{
			linkName: absoluteLinkName,
			target:   absoluteTarget,
			host:     symlink.Host,
		}
	}
	for _, path := range params.RemovedPaths {
		result.removedPaths[result.toPath(result.toAbsolutePath(path))] = struct{}{}
	}
	result = result.rebuildDirectories()
	return &result, nil
}

func (s requestFileSystem) fallsBack() bool {
	return s.layered || s.kind == KindLayer
}

func (s requestFileSystem) baseFileSystem() vfs.FS {
	return s.base
}

func (s requestFileSystem) applyTo(base requestFileSystem) requestFileSystem {
	files := maps.Clone(base.files)
	directoryListings := make(map[tspath.Path]vfs.Entries, len(base.directoryListings)+len(s.directoryListings))
	for path, entries := range base.directoryListings {
		directoryListings[path] = cloneEntries(entries)
	}
	symlinks := maps.Clone(base.symlinks)
	removedPaths := maps.Clone(base.removedPaths)
	preSymlinkRemovedPaths := maps.Clone(base.preSymlinkRemovedPaths)
	sealedListings := maps.Clone(base.sealedListings)

	removeListingEntry := func(path tspath.Path) {
		parentPath := s.toPath(tspath.GetDirectoryPath(string(path)))
		entries, ok := directoryListings[parentPath]
		if !ok {
			return
		}
		name := tspath.GetBaseFileName(string(path))
		entries.Files = s.deleteEntryName(entries.Files, name)
		entries.Directories = s.deleteEntryName(entries.Directories, name)
		for existingName := range entries.Symlinks {
			if s.equalEntryNames(existingName, name) {
				delete(entries.Symlinks, existingName)
			}
		}
		directoryListings[parentPath] = entries
	}
	removePath := func(path tspath.Path) {
		removeListingEntry(path)
		prefix := tspath.EnsureTrailingDirectorySeparator(string(path))
		for candidate := range files {
			if candidate == path || strings.HasPrefix(string(candidate), prefix) {
				delete(files, candidate)
			}
		}
		for candidate := range symlinks {
			if candidate == path || strings.HasPrefix(string(candidate), prefix) {
				delete(symlinks, candidate)
			}
		}
		for candidate := range directoryListings {
			if candidate == path || strings.HasPrefix(string(candidate), prefix) {
				delete(directoryListings, candidate)
				delete(sealedListings, candidate)
			}
		}
	}
	clearPreSymlinkRemovedPath := func(path tspath.Path) {
		for removedPath := range preSymlinkRemovedPaths {
			if path == removedPath || strings.HasPrefix(string(removedPath), tspath.EnsureTrailingDirectorySeparator(string(path))) {
				delete(preSymlinkRemovedPaths, removedPath)
			}
		}
	}
	for path := range s.removedPaths {
		if !s.pathUsesSymlink(path) && base.pathUsesSymlink(path) {
			preSymlinkRemovedPaths[path] = struct{}{}
		}
		removePath(path)
		removedPaths[path] = struct{}{}
	}
	for path := range s.directories {
		delete(files, path)
		delete(symlinks, path)
	}
	for path, file := range s.files {
		clearPreSymlinkRemovedPath(path)
		removePath(path)
		files[path] = file
	}
	for path, symlink := range s.symlinks {
		clearPreSymlinkRemovedPath(path)
		removePath(path)
		symlinks[path] = symlink
	}
	for path, entries := range s.directoryListings {
		if baseEntries, ok := directoryListings[path]; ok {
			directoryListings[path] = mergeEntries(baseEntries, entries, s.equalEntryNames)
		} else {
			directoryListings[path] = cloneEntries(entries)
		}
	}
	for path, builder := range s.derivedListings {
		entries, ok := directoryListings[path]
		if !ok {
			continue
		}
		if _, explicit := s.directoryListings[path]; explicit {
			continue
		}
		var overlay vfs.Entries
		for _, name := range builder.files {
			overlay.Files = append(overlay.Files, name)
		}
		for _, name := range builder.directories {
			overlay.Directories = append(overlay.Directories, name)
		}
		directoryListings[path] = mergeEntries(entries, overlay, s.equalEntryNames)
	}

	compacted := requestFileSystem{
		kind:                   base.kind,
		base:                   base.base,
		layered:                base.layered,
		currentDirectory:       s.currentDirectory,
		useCaseSensitiveNames:  s.useCaseSensitiveNames,
		files:                  files,
		directoryListings:      directoryListings,
		symlinks:               symlinks,
		removedPaths:           removedPaths,
		preSymlinkRemovedPaths: preSymlinkRemovedPaths,
		sealedListings:         sealedListings,
	}
	return compacted.rebuildDirectories()
}

func (s requestFileSystem) pathUsesSymlink(path tspath.Path) bool {
	canonicalPath := string(path)
	for linkPath := range s.symlinks {
		canonicalLink := string(linkPath)
		if canonicalPath == canonicalLink || strings.HasPrefix(canonicalPath, tspath.EnsureTrailingDirectorySeparator(canonicalLink)) {
			return true
		}
	}
	return false
}

func (s requestFileSystem) isPreSymlinkRemoved(path string) bool {
	canonicalPath := s.toPath(path)
	for removedPath := range s.preSymlinkRemovedPaths {
		if canonicalPath == removedPath || strings.HasPrefix(string(canonicalPath), tspath.EnsureTrailingDirectorySeparator(string(removedPath))) {
			return true
		}
	}
	return false
}

func (s requestFileSystem) isRemoved(path string) bool {
	canonicalPath := s.toPath(path)
	for removedPath := range s.removedPaths {
		if canonicalPath == removedPath || strings.HasPrefix(string(canonicalPath), tspath.EnsureTrailingDirectorySeparator(string(removedPath))) {
			return true
		}
	}
	return false
}

func (s requestFileSystem) toAbsolutePath(path string) string {
	return s.toAbsolutePathFrom(path, s.currentDirectory)
}

func (s requestFileSystem) toAbsolutePathFrom(path string, currentDirectory string) string {
	absolutePath := tspath.GetNormalizedAbsolutePath(path, currentDirectory)
	if tspath.IsDiskPathRoot(absolutePath) {
		return absolutePath
	}
	return tspath.RemoveTrailingDirectorySeparator(absolutePath)
}

func (s requestFileSystem) toPath(path string) tspath.Path {
	return tspath.ToPath(path, s.currentDirectory, s.useCaseSensitiveNames)
}

func (s requestFileSystem) rebuildDirectories() requestFileSystem {
	s.directories = make(map[tspath.Path]string)
	s.derivedListings = make(map[tspath.Path]*requestDirectoryBuilder)
	var registerDirectory func(string)
	registerDirectory = func(directoryName string) {
		directoryName = s.toAbsolutePath(directoryName)
		directoryPath := s.toPath(directoryName)
		if _, ok := s.directories[directoryPath]; ok {
			return
		}
		s.directories[directoryPath] = directoryName
		if s.derivedListings[directoryPath] == nil {
			s.derivedListings[directoryPath] = &requestDirectoryBuilder{}
		}

		parentName := tspath.GetDirectoryPath(directoryName)
		parentPath := s.toPath(parentName)
		if parentPath == directoryPath {
			return
		}
		registerDirectory(parentName)
		parent := s.derivedListings[parentPath]
		if parent.directories == nil {
			parent.directories = make(map[tspath.Path]string)
		}
		parent.directories[directoryPath] = tspath.GetBaseFileName(directoryName)
	}
	registerDirectory(s.currentDirectory)
	for path, file := range s.files {
		parentName := tspath.GetDirectoryPath(file.fileName)
		parentPath := s.toPath(parentName)
		registerDirectory(parentName)
		listing := s.derivedListings[parentPath]
		if listing.files == nil {
			listing.files = make(map[tspath.Path]string)
		}
		listing.files[path] = tspath.GetBaseFileName(file.fileName)
	}
	for path, entries := range s.directoryListings {
		directoryName := string(path)
		registerDirectory(directoryName)
		for _, child := range entries.Directories {
			registerDirectory(tspath.CombinePaths(directoryName, child))
		}
	}
	for _, symlink := range s.symlinks {
		registerDirectory(tspath.GetDirectoryPath(symlink.linkName))
	}
	return s
}

func (s requestFileSystem) resolvePath(path string) resolvedRequestPath {
	path = s.toAbsolutePath(path)
	result := resolvedRequestPath{path: path, ok: true}
	seen := make(map[tspath.Path]struct{}, len(s.symlinks))
	for {
		canonicalPath := string(s.toPath(result.path))
		var matchPath tspath.Path
		var match requestSymlink
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
			result.host = s.isHostPath(result.path)
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
func (s requestFileSystem) resolvePathForOverlay(path string) resolvedRequestPath {
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

func (s requestFileSystem) resolveBasePath(path string) resolvedRequestPath {
	if base := getRequestFileSystem(s.baseFileSystem()); base != nil {
		return base.load().resolvePathForOverlay(path)
	}
	return resolvedRequestPath{path: path, ok: true}
}

func (s requestFileSystem) isHostPath(path string) bool {
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

func (s requestFileSystem) aliasesForPath(path string) []string {
	symlinks := make([]requestSymlink, 0, len(s.symlinks))
	for current := s; ; {
		for _, symlink := range current.symlinks {
			symlinks = append(symlinks, symlink)
		}
		base := getRequestFileSystem(current.baseFileSystem())
		if base == nil {
			break
		}
		current = *base.load()
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

func (s requestFileSystem) fileAt(path string) (requestFile, bool) {
	file, ok := s.files[s.toPath(path)]
	return file, ok
}

func (s requestFileSystem) directoryAt(path string) (string, bool) {
	directory, ok := s.directories[s.toPath(path)]
	return directory, ok
}

func (s requestFileSystem) pathKind(path string) requestPathKind {
	if _, ok := s.fileAt(path); ok {
		return requestPathKindFile
	}
	if _, ok := s.directoryAt(path); ok {
		return requestPathKindDirectory
	}
	return requestPathKindMissing
}

func (s requestFileSystem) lookupPath(path string) requestPathLookup {
	absolutePath := s.toAbsolutePath(path)
	if kind := s.pathKind(absolutePath); kind != requestPathKindMissing {
		return requestPathLookup{path: absolutePath, kind: kind, ok: true}
	}
	if s.isPreSymlinkRemoved(path) {
		return requestPathLookup{}
	}
	resolved := s.resolvePath(path)
	if !resolved.ok {
		return requestPathLookup{}
	}
	result := requestPathLookup{
		path:            resolved.path,
		followedSymlink: resolved.followedSymlink,
		ok:              true,
	}
	if resolved.host {
		if s.isRemoved(resolved.path) {
			return requestPathLookup{}
		}
		result.fileSystem = getHostFileSystem(s.baseFileSystem())
		result.ok = result.fileSystem != nil
		return result
	}
	if kind := s.pathKind(resolved.path); kind != requestPathKindMissing {
		result.kind = kind
		return result
	}
	if !resolved.followedSymlink && s.isRemoved(path) {
		return requestPathLookup{}
	}
	if s.fallsBack() {
		fallback := s.resolveBasePath(resolved.path)
		if !fallback.ok {
			return requestPathLookup{}
		}
		if fallback.host {
			if s.isRemoved(resolved.path) || s.isRemoved(fallback.path) {
				return requestPathLookup{}
			}
			result.path = fallback.path
			result.fileSystem = getHostFileSystem(s.baseFileSystem())
			result.ok = result.fileSystem != nil
			return result
		}
		if kind := s.pathKind(fallback.path); kind != requestPathKindMissing {
			result.path = fallback.path
			result.kind = kind
			return result
		}
		if s.isRemoved(resolved.path) || s.isRemoved(fallback.path) {
			return requestPathLookup{}
		}
		result.fileSystem = s.baseFileSystem()
	}
	return result
}

func (s requestFileSystem) mutationPath(path string) (vfs.FS, string, bool) {
	if s.kind != KindLayer {
		return nil, "", false
	}
	resolved := s.resolvePathForOverlay(path)
	if !resolved.ok {
		return nil, "", false
	}
	host := getHostFileSystem(s.baseFileSystem())
	return host, resolved.path, host != nil
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

func (s requestFileSystem) UseCaseSensitiveFileNames() bool {
	return s.useCaseSensitiveNames
}

func (s requestFileSystem) ReadFile(fileName string) (string, bool) {
	lookup := s.lookupPath(fileName)
	if !lookup.ok || lookup.kind == requestPathKindDirectory {
		return "", false
	}
	if lookup.fileSystem != nil {
		return lookup.fileSystem.ReadFile(lookup.path)
	}
	if file, ok := s.fileAt(lookup.path); ok {
		return file.content, true
	}
	return "", false
}

func (s requestFileSystem) FileExists(fileName string) bool {
	lookup := s.lookupPath(fileName)
	if !lookup.ok || lookup.kind == requestPathKindDirectory {
		return false
	}
	return lookup.kind == requestPathKindFile || lookup.fileSystem != nil && lookup.fileSystem.FileExists(lookup.path)
}

func (s requestFileSystem) DirectoryExists(directoryName string) bool {
	lookup := s.lookupPath(directoryName)
	if !lookup.ok || lookup.kind == requestPathKindFile {
		return false
	}
	return lookup.kind == requestPathKindDirectory || lookup.fileSystem != nil && lookup.fileSystem.DirectoryExists(lookup.path)
}

func (s requestFileSystem) GetAccessibleEntries(directoryName string) vfs.Entries {
	if s.isPreSymlinkRemoved(directoryName) {
		if entries, _, ok := s.getLocalEntries(directoryName); ok {
			return s.addSymlinkEntries(directoryName, entries)
		}
		return vfs.Entries{Symlinks: map[string]struct{}{}}
	}
	resolved := s.resolvePath(directoryName)
	if !resolved.ok {
		return vfs.Entries{Symlinks: map[string]struct{}{}}
	}
	if _, ok := s.fileAt(resolved.path); ok {
		return vfs.Entries{Symlinks: map[string]struct{}{}}
	}

	localEntries, hasExplicitListing, hasLocalEntries := s.getLocalEntries(resolved.path)
	sealedListing := s.hasSealedListing(resolved.path)
	if !resolved.followedSymlink && s.isRemoved(directoryName) && !hasLocalEntries {
		return vfs.Entries{Symlinks: map[string]struct{}{}}
	}
	fallbackPath := resolved.path
	fallbackHost := false
	if !resolved.host && s.fallsBack() {
		fallback := s.resolveBasePath(resolved.path)
		if !fallback.ok {
			return vfs.Entries{Symlinks: map[string]struct{}{}}
		}
		fallbackPath = fallback.path
		fallbackHost = fallback.host
		if !fallbackHost {
			if _, ok := s.fileAt(fallbackPath); ok {
				return vfs.Entries{Symlinks: map[string]struct{}{}}
			}
		}
		if !fallbackHost && s.toPath(fallbackPath) != s.toPath(resolved.path) {
			targetEntries, targetExplicit, targetLocal := s.getLocalEntries(fallbackPath)
			if targetLocal {
				localEntries = mergeEntries(localEntries, targetEntries, s.equalEntryNames)
				hasLocalEntries = true
			}
			hasExplicitListing = hasExplicitListing || targetExplicit
			sealedListing = sealedListing || s.hasSealedListing(fallbackPath)
		}
	}
	var result vfs.Entries
	if resolved.host || fallbackHost {
		hostPath := resolved.path
		if fallbackHost {
			hostPath = fallbackPath
		}
		if !s.isRemoved(directoryName) && !s.isRemoved(resolved.path) && !s.isRemoved(hostPath) {
			if host := getHostFileSystem(s.baseFileSystem()); host != nil {
				result = s.removeEntries(directoryName, host.GetAccessibleEntries(hostPath))
				if s.toPath(directoryName) != s.toPath(resolved.path) {
					result = s.removeEntries(resolved.path, result)
				}
				if s.toPath(hostPath) != s.toPath(resolved.path) {
					result = s.removeEntries(hostPath, result)
				}
			}
		}
		if hasLocalEntries {
			result = mergeEntries(result, localEntries, s.equalEntryNames)
		}
	} else if !s.fallsBack() || hasExplicitListing && sealedListing {
		result = localEntries
	} else {
		if !s.isRemoved(directoryName) && !s.isRemoved(resolved.path) && !s.isRemoved(fallbackPath) {
			result = s.removeEntries(directoryName, s.baseFileSystem().GetAccessibleEntries(resolved.path))
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
	if !fallbackHost && s.toPath(fallbackPath) != s.toPath(resolved.path) {
		result = s.addSymlinkEntries(fallbackPath, result)
	}
	result = s.removePreSymlinkEntries(directoryName, result)
	return result
}

func (s requestFileSystem) removePreSymlinkEntries(directoryName string, entries vfs.Entries) vfs.Entries {
	result := cloneEntries(entries)
	filter := func(values []string) []string {
		return slices.DeleteFunc(values, func(name string) bool {
			fileName := tspath.CombinePaths(directoryName, name)
			if _, ok := s.fileAt(fileName); ok {
				return false
			}
			if _, ok := s.directoryAt(fileName); ok {
				return false
			}
			path := s.toPath(fileName)
			for removedPath := range s.preSymlinkRemovedPaths {
				if path == removedPath || strings.HasPrefix(string(path), tspath.EnsureTrailingDirectorySeparator(string(removedPath))) {
					return true
				}
			}
			return false
		})
	}
	result.Files = filter(result.Files)
	result.Directories = filter(result.Directories)
	for name := range result.Symlinks {
		if len(filter([]string{name})) == 0 {
			delete(result.Symlinks, name)
		}
	}
	return result
}

func (s requestFileSystem) hasSealedListing(directoryName string) bool {
	_, ok := s.sealedListings[s.toPath(directoryName)]
	return ok
}

func (s requestFileSystem) getLocalEntries(directoryName string) (entries vfs.Entries, explicit bool, ok bool) {
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

func (s requestFileSystem) removeEntries(directoryName string, entries vfs.Entries) vfs.Entries {
	result := cloneEntries(entries)
	filter := func(values []string) []string {
		return slices.DeleteFunc(values, func(name string) bool {
			return s.isRemoved(tspath.CombinePaths(directoryName, name))
		})
	}
	result.Files = filter(result.Files)
	result.Directories = filter(result.Directories)
	for name := range result.Symlinks {
		if s.isRemoved(tspath.CombinePaths(directoryName, name)) {
			delete(result.Symlinks, name)
		}
	}
	return result
}

func (s requestFileSystem) addSymlinkEntries(directoryName string, entries vfs.Entries) vfs.Entries {
	result := cloneEntries(entries)
	if result.Symlinks == nil {
		result.Symlinks = map[string]struct{}{}
	}

	directoryPath := s.toPath(directoryName)
	var links []requestSymlink
	for _, symlink := range s.symlinks {
		if s.toPath(tspath.GetDirectoryPath(symlink.linkName)) == directoryPath {
			links = append(links, symlink)
		}
	}
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

func (s requestFileSystem) deleteEntryName(values []string, value string) []string {
	return slices.DeleteFunc(values, func(candidate string) bool { return s.equalEntryNames(candidate, value) })
}

func (s requestFileSystem) equalEntryNames(left string, right string) bool {
	return tspath.GetCanonicalFileName(left, s.useCaseSensitiveNames) == tspath.GetCanonicalFileName(right, s.useCaseSensitiveNames)
}

func (s requestFileSystem) Realpath(path string) string {
	lookup := s.lookupPath(path)
	if !lookup.ok {
		return path
	}
	if lookup.fileSystem != nil {
		return lookup.fileSystem.Realpath(lookup.path)
	}
	if lookup.kind != requestPathKindMissing || !lookup.followedSymlink {
		return lookup.path
	}
	return path
}

func (s requestFileSystem) WriteFile(fileName string, data string) error {
	host, path, ok := s.mutationPath(fileName)
	if !ok {
		return vfs.ErrInvalid
	}
	return host.WriteFile(path, data)
}

func (s requestFileSystem) AppendFile(fileName string, data string) error {
	host, path, ok := s.mutationPath(fileName)
	if !ok {
		return vfs.ErrInvalid
	}
	return host.AppendFile(path, data)
}

func (s requestFileSystem) Remove(path string) error {
	host, path, ok := s.mutationPath(path)
	if !ok {
		return vfs.ErrInvalid
	}
	return host.Remove(path)
}

func (s requestFileSystem) Chtimes(path string, aTime time.Time, mTime time.Time) error {
	host, path, ok := s.mutationPath(path)
	if !ok {
		return vfs.ErrInvalid
	}
	return host.Chtimes(path, aTime, mTime)
}

func (s requestFileSystem) Stat(path string) vfs.FileInfo {
	lookup := s.lookupPath(path)
	if !lookup.ok {
		return nil
	}
	if lookup.fileSystem != nil {
		return statFileSystem(lookup.fileSystem, lookup.path)
	}
	if lookup.kind == requestPathKindFile {
		file, _ := s.fileAt(lookup.path)
		return requestFileInfo{name: tspath.GetBaseFileName(file.fileName), size: int64(len(file.content))}
	}
	if lookup.kind == requestPathKindDirectory {
		directoryName, _ := s.directoryAt(lookup.path)
		return requestFileInfo{name: tspath.GetBaseFileName(directoryName), directory: true}
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
		return requestFileInfo{name: name, directory: true}
	}
	if fileSystem.FileExists(path) {
		return requestFileInfo{name: name}
	}
	return nil
}

func (s requestFileSystem) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
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
	if err := s.walkDir(originalRoot, requestDirEntry{info: info}, walkFn, visited); errors.Is(err, fs.SkipAll) {
		return nil
	} else {
		return err
	}
}

func (s requestFileSystem) walkDir(path string, entry requestDirEntry, walkFn vfs.WalkDirFunc, visited map[string]struct{}) error {
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
		if err := s.walkDir(childPath, requestDirEntry{info: childInfo}, walkFn, visited); err != nil {
			if errors.Is(err, fs.SkipDir) {
				return nil
			}
			return err
		}
	}
	return nil
}

type requestFileInfo struct {
	name      string
	size      int64
	directory bool
}

func (i requestFileInfo) Name() string       { return i.name }
func (i requestFileInfo) Size() int64        { return i.size }
func (i requestFileInfo) ModTime() time.Time { return time.Time{} }
func (i requestFileInfo) IsDir() bool        { return i.directory }
func (i requestFileInfo) Sys() any           { return nil }
func (i requestFileInfo) Mode() fs.FileMode {
	if i.directory {
		return fs.ModeDir | 0o555
	}
	return 0o444
}

type requestDirEntry struct {
	info vfs.FileInfo
}

func (e requestDirEntry) Name() string               { return e.info.Name() }
func (e requestDirEntry) IsDir() bool                { return e.info.IsDir() }
func (e requestDirEntry) Type() fs.FileMode          { return e.info.Mode().Type() }
func (e requestDirEntry) Info() (fs.FileInfo, error) { return e.info, nil }
