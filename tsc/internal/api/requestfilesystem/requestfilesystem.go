package requestfilesystem

import (
	"errors"
	"fmt"
	"io/fs"
	"slices"
	"strings"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/project"
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

// RequestDirectoryEntries is a complete cached result for GetAccessibleEntries.
// Entry names are relative to the directory. Listings do not constrain direct
// descendant lookups, which may still fall back in a layered filesystem.
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

// requestFileSystem stores one compacted request layer.
type requestFileSystem struct {
	kind Kind
	// host is the fallback for its standalone vfs.FS view and the target of
	// explicit host symlinks. Pure FileSourceLayer lookups do not access it.
	host                  vfs.FS
	currentDirectory      string
	useCaseSensitiveNames bool
	paths                 *requestPathNode
	handles               *collections.SyncMap[tspath.Path, project.FileHandle]
}

var _ project.FileSourceLayer = (*requestFileSystem)(nil)

type resolvedRequestPath struct {
	path            string
	followedSymlink bool
	host            bool
	ok              bool
}

type requestPathLookup struct {
	path            string
	info            vfs.FileInfo
	useHost         bool
	followedSymlink bool
	ok              bool
}

func getRequestFileSystem(fileSystem vfs.FS) *requestFileSystem {
	requestFileSystem, _ := fileSystem.(*requestFileSystem)
	return requestFileSystem
}

// NewForUpdate creates the compacted request layer for a snapshot update.
// startsFromHost means the caller intentionally did not inherit a request layer
// from a base snapshot. The current snapshot may still contain an unrelated
// request layer, so restarting from the host conservatively invalidates its
// cached state. A nil base alone does not imply this: an explicitly selected
// host-backed snapshot also has no request layer. This distinction is a
// compatibility workaround for the legacy updateSnapshot API and should be
// removed with the snapshot state redesign in #64154.
func NewForUpdate(params *RequestFileSystem, base project.FileSourceLayer, startsFromHost bool, host vfs.FS, currentDirectory string) (project.FileSourceLayer, project.FileSourceLayerChanges, error) {
	changes := project.FileSourceLayerChanges{InvalidateAll: startsFromHost}
	if params == nil {
		return base, changes, nil
	}
	baseRequestFileSystem, ok := base.(*requestFileSystem)
	if base != nil && !ok {
		return nil, project.FileSourceLayerChanges{}, fmt.Errorf("unsupported request filesystem base layer %T", base)
	}
	if params.Kind == KindFull {
		changes.InvalidateAll = true
	}
	if params.Kind == KindLayer {
		changes.Changes = getFileSourceLayerChanges(params, baseRequestFileSystem, currentDirectory, host.UseCaseSensitiveFileNames())
	}
	fileSystem, err := newRequestFileSystemWorker(params, host, currentDirectory)
	if err != nil {
		return nil, project.FileSourceLayerChanges{}, err
	}
	if baseRequestFileSystem != nil && params.Kind == KindLayer {
		compacted := fileSystem.applyTo(*baseRequestFileSystem)
		return &compacted, changes, nil
	}
	return fileSystem, changes, nil
}

// IsFullLayer reports whether layer contains a complete request filesystem.
func IsFullLayer(layer project.FileSourceLayer) bool {
	requestFileSystem, _ := layer.(*requestFileSystem)
	return requestFileSystem != nil && requestFileSystem.kind == KindFull
}

func newRequestFileSystemWorker(params *RequestFileSystem, host vfs.FS, currentDirectory string) (*requestFileSystem, error) {
	if params.Kind != KindFull && params.Kind != KindLayer {
		return nil, fmt.Errorf("unknown request filesystem kind %q", params.Kind)
	}

	result := requestFileSystem{
		kind:                  params.Kind,
		host:                  host,
		currentDirectory:      currentDirectory,
		useCaseSensitiveNames: host.UseCaseSensitiveFileNames(),
		paths:                 &requestPathNode{},
		handles:               &collections.SyncMap[tspath.Path, project.FileHandle]{},
	}
	result.registerDirectory(currentDirectory)
	for fileName, content := range params.Files {
		absoluteFileName := result.toAbsolutePath(fileName)
		path := result.toPath(absoluteFileName)
		node := result.paths.ensure(path)
		if existing, ok := node.entry.(*requestFile); ok {
			return nil, fmt.Errorf("duplicate request filesystem file path %q and %q", existing.fileName, absoluteFileName)
		}
		node.entry = &requestFile{fileName: absoluteFileName, content: content}
		result.registerDirectory(tspath.GetDirectoryPath(absoluteFileName))
	}
	seenDirectories := make(map[tspath.Path]struct{}, len(params.Directories))
	var listedDirectories []string
	for directoryName, entries := range params.Directories {
		absoluteDirectoryName := result.toAbsolutePath(directoryName)
		path := result.toPath(absoluteDirectoryName)
		node := result.paths.ensure(path)
		if _, ok := seenDirectories[path]; ok {
			return nil, fmt.Errorf("duplicate request filesystem directory path %q", absoluteDirectoryName)
		}
		seenDirectories[path] = struct{}{}
		if _, isFile := node.entry.(*requestFile); !isFile {
			node.entry = &requestDirectory{
				directoryName: absoluteDirectoryName,
				listing: &vfs.Entries{
					Files:       slices.Clone(entries.Files),
					Directories: slices.Clone(entries.Directories),
				},
			}
		}
		result.registerDirectory(tspath.GetDirectoryPath(absoluteDirectoryName))
		for _, child := range entries.Directories {
			listedDirectories = append(listedDirectories, tspath.CombinePaths(absoluteDirectoryName, child))
		}
	}
	for linkName := range params.Symlinks {
		result.registerDirectory(tspath.GetDirectoryPath(result.toAbsolutePath(linkName)))
	}
	seenSymlinks := make(map[tspath.Path]string, len(params.Symlinks))
	for linkName, symlink := range params.Symlinks {
		absoluteLinkName := result.toAbsolutePath(linkName)
		path := result.toPath(absoluteLinkName)
		node := result.paths.ensure(path)
		if existing, ok := seenSymlinks[path]; ok {
			return nil, fmt.Errorf("duplicate request filesystem symlink path %q and %q", existing, absoluteLinkName)
		}
		seenSymlinks[path] = absoluteLinkName
		targetDirectory := tspath.GetDirectoryPath(absoluteLinkName)
		absoluteTarget := result.toAbsolutePathFrom(symlink.Target, targetDirectory)
		if node.entry == nil {
			node.entry = &requestSymlink{
				linkName: absoluteLinkName,
				target:   absoluteTarget,
				host:     symlink.Host,
			}
		}
	}
	for _, directoryName := range listedDirectories {
		result.registerDirectory(directoryName)
	}
	for _, path := range params.RemovedPaths {
		result.paths.ensure(result.toPath(result.toAbsolutePath(path))).fallback = requestFallbackMissing
	}
	result.paths = composeRequestPaths(nil, result.paths, requestFallbackAllowed, result.useCaseSensitiveNames)
	return &result, nil
}

func (s *requestFileSystem) Lookup(path string) project.FileSourceLayerLookup {
	absolutePath := s.toAbsolutePath(path)
	if info, fallback := s.localPathInfo(absolutePath); info != nil {
		return s.localLookup(info, absolutePath, absolutePath, false)
	} else if fallback == requestFallbackMissing {
		return project.FileSourceLayerLookup{Kind: project.FileSourceLayerLookupMissing, Path: absolutePath}
	}
	resolved := s.resolvePath(path)
	if !resolved.ok {
		return project.FileSourceLayerLookup{Kind: project.FileSourceLayerLookupMissing, Path: absolutePath}
	}
	if info, fallback := s.localPathInfo(resolved.path); !resolved.host && info != nil {
		return s.localLookup(info, resolved.path, absolutePath, resolved.followedSymlink)
	} else if fallback == requestFallbackMissing {
		return project.FileSourceLayerLookup{Kind: project.FileSourceLayerLookupMissing, Path: resolved.path, Redirected: resolved.followedSymlink}
	}
	if resolved.host {
		return project.FileSourceLayerLookup{Kind: project.FileSourceLayerLookupHost, Path: resolved.path, Redirected: resolved.followedSymlink}
	}
	if s.kind == KindLayer {
		return project.FileSourceLayerLookup{Kind: project.FileSourceLayerLookupFallback, Path: resolved.path, Redirected: resolved.followedSymlink}
	}
	return project.FileSourceLayerLookup{Kind: project.FileSourceLayerLookupMissing, Path: resolved.path, Redirected: resolved.followedSymlink}
}

func (s *requestFileSystem) localLookup(info vfs.FileInfo, path string, requestedPath string, redirected bool) project.FileSourceLayerLookup {
	if info.IsDir() {
		directory := info.(*requestDirectory)
		return project.FileSourceLayerLookup{
			Kind:          project.FileSourceLayerLookupDirectory,
			Path:          path,
			Info:          info,
			Redirected:    redirected,
			NeedsFallback: s.kind == KindLayer && directory.listing == nil && !s.blocksFallback(requestedPath) && !s.blocksFallback(path),
		}
	}
	file, ok := info.(*requestFile)
	if !ok {
		return project.FileSourceLayerLookup{Kind: project.FileSourceLayerLookupMissing, Path: path, Redirected: redirected}
	}
	if !redirected {
		return project.FileSourceLayerLookup{
			Kind: project.FileSourceLayerLookupFile,
			Path: path,
			File: file.fileHandle(),
			Info: file,
		}
	}
	handlePath := s.toPath(requestedPath)
	if handle, ok := s.handles.Load(handlePath); ok {
		return project.FileSourceLayerLookup{Kind: project.FileSourceLayerLookupFile, Path: path, File: handle, Info: file, Redirected: true}
	}
	handle, _ := s.handles.LoadOrStore(handlePath, project.NewFileHandle(requestedPath, file.content))
	return project.FileSourceLayerLookup{Kind: project.FileSourceLayerLookupFile, Path: path, File: handle, Info: file, Redirected: true}
}

func (s *requestFileSystem) MergeDirectoryEntries(path string, lookup project.FileSourceLayerLookup, base vfs.Entries) vfs.Entries {
	if lookup.Kind == project.FileSourceLayerLookupFallback || lookup.Kind == project.FileSourceLayerLookupHost {
		return s.filterLocalEntries(path, s.removeEntries(lookup.Path, base))
	}
	localEntries, _ := s.getLocalEntries(lookup.Path)
	var result vfs.Entries
	if lookup.NeedsFallback {
		result = s.removeEntries(lookup.Path, base)
		result = mergeEntries(result, localEntries, s.equalEntryNames)
	} else {
		result = localEntries
	}
	result = s.addUnclassifiedSymlinkEntries(lookup.Path, result)
	return s.filterLocalEntries(path, result)
}

func (s requestFileSystem) applyTo(base requestFileSystem) requestFileSystem {
	s.paths = composeRequestPaths(base.paths, s.paths, requestFallbackAllowed, s.useCaseSensitiveNames)
	s.kind = base.kind
	s.host = base.host
	return s
}

func (s requestFileSystem) blocksFallback(path string) bool {
	_, fallback := s.paths.lookup(s.toPath(path))
	return fallback == requestFallbackMissing
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

func (s requestFileSystem) registerDirectory(directoryName string) {
	directoryName = s.toAbsolutePath(directoryName)
	for {
		node := s.paths.ensure(s.toPath(directoryName))
		if node.entry != nil {
			return
		}
		node.entry = &requestDirectory{directoryName: directoryName}
		parentName := tspath.GetDirectoryPath(directoryName)
		if parentName == directoryName {
			return
		}
		directoryName = parentName
	}
}

func (s requestFileSystem) resolvePath(path string) resolvedRequestPath {
	path = s.toAbsolutePath(path)
	result := resolvedRequestPath{path: path, ok: true}
	seen := make(map[tspath.Path]struct{})
	for {
		canonicalPath := s.toPath(result.path)
		if s.paths.containsFileAncestor(canonicalPath) {
			result.ok = false
			return result
		}
		matchPath, match := s.paths.firstSymlink(canonicalPath)
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
		result.path = s.toAbsolutePath(tspath.CombinePaths(match.target, strings.TrimPrefix(suffix, "/")))
		if match.host {
			result.host = true
			return result
		}
	}
}

func (s requestFileSystem) isHostPath(path string) bool {
	canonicalPath := s.toPath(path)
	found := false
	s.paths.walkSymlinks(func(_ tspath.Path, symlink *requestSymlink) {
		if symlink.host && requestPathContains(s.toPath(symlink.target), canonicalPath) {
			found = true
		}
	})
	return found
}

func (s requestFileSystem) aliasesForPath(path string) []string {
	var symlinks []requestSymlink
	s.paths.walkSymlinks(func(_ tspath.Path, symlink *requestSymlink) {
		symlinks = append(symlinks, *symlink)
	})

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
			alias := s.toAbsolutePath(tspath.CombinePaths(symlink.linkName, strings.TrimPrefix(suffix, "/")))
			aliasPath := s.toPath(alias)
			if _, ok := seen[aliasPath]; ok {
				continue
			}
			if resolved := s.resolvePath(alias); !resolved.ok {
				continue
			}
			seen[aliasPath] = struct{}{}
			aliases = append(aliases, alias)
			queue = append(queue, alias)
		}
	}
	return aliases
}

func (s requestFileSystem) localPathInfo(path string) (vfs.FileInfo, requestFallback) {
	node, fallback := s.paths.lookup(s.toPath(path))
	if node == nil {
		return nil, fallback
	}
	info, _ := node.entry.(vfs.FileInfo)
	return info, fallback
}

func (s requestFileSystem) lookupPath(path string) requestPathLookup {
	absolutePath := s.toAbsolutePath(path)
	info, pathFallback := s.localPathInfo(absolutePath)
	if info != nil {
		return requestPathLookup{path: absolutePath, info: info, ok: true}
	}
	if pathFallback == requestFallbackMissing {
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
	resolvedInfo, resolvedFallback := s.localPathInfo(resolved.path)
	if !resolved.host && resolvedInfo != nil {
		result.info = resolvedInfo
	} else if resolved.host || s.kind == KindLayer {
		if resolvedFallback == requestFallbackMissing {
			return requestPathLookup{}
		}
		result.useHost = true
	}
	return result
}

func (s requestFileSystem) mutationPath(path string) (string, bool) {
	if s.kind != KindLayer {
		return "", false
	}
	resolved := s.resolvePath(path)
	if !resolved.ok {
		return "", false
	}
	return resolved.path, true
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
	if !lookup.ok || lookup.info != nil && lookup.info.IsDir() {
		return "", false
	}
	if lookup.useHost {
		return s.host.ReadFile(lookup.path)
	}
	if file, ok := lookup.info.(*requestFile); ok {
		return file.content, true
	}
	return "", false
}

func (s requestFileSystem) FileExists(fileName string) bool {
	lookup := s.lookupPath(fileName)
	if !lookup.ok || lookup.info != nil && lookup.info.IsDir() {
		return false
	}
	return lookup.info != nil || lookup.useHost && s.host.FileExists(lookup.path)
}

func (s requestFileSystem) DirectoryExists(directoryName string) bool {
	lookup := s.lookupPath(directoryName)
	if !lookup.ok || lookup.info != nil && !lookup.info.IsDir() {
		return false
	}
	return lookup.info != nil || lookup.useHost && s.host.DirectoryExists(lookup.path)
}

func (s requestFileSystem) GetAccessibleEntries(directoryName string) vfs.Entries {
	lookup := s.lookupPath(directoryName)
	if !lookup.ok || lookup.info != nil && !lookup.info.IsDir() {
		return vfs.Entries{Symlinks: map[string]struct{}{}}
	}
	var result vfs.Entries
	if lookup.useHost {
		result = s.removeEntries(lookup.path, s.host.GetAccessibleEntries(lookup.path))
	} else {
		localEntries, explicit := s.getLocalEntries(lookup.path)
		result = localEntries
		if s.kind == KindLayer && !explicit && !s.blocksFallback(directoryName) && !s.blocksFallback(lookup.path) {
			result = s.removeEntries(lookup.path, s.host.GetAccessibleEntries(lookup.path))
			result = mergeEntries(result, localEntries, s.equalEntryNames)
		}
		result = s.addSymlinkEntries(lookup.path, result)
	}
	result = s.filterLocalEntries(directoryName, result)
	return result
}

func (s requestFileSystem) filterLocalEntries(directoryName string, entries vfs.Entries) vfs.Entries {
	result := cloneEntries(entries)
	filter := func(values []string) []string {
		return slices.DeleteFunc(values, func(name string) bool {
			fileName := tspath.CombinePaths(directoryName, name)
			if info, _ := s.localPathInfo(fileName); info != nil {
				return false
			}
			return s.blocksFallback(fileName)
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

func (s requestFileSystem) getLocalEntries(directoryName string) (entries vfs.Entries, explicit bool) {
	node, _ := s.paths.lookup(s.toPath(directoryName))
	entries, _ = node.entries()
	if node != nil {
		if directory, isDirectory := node.entry.(*requestDirectory); isDirectory {
			explicit = directory.listing != nil
		}
	}
	return entries, explicit
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
			return s.blocksFallback(tspath.CombinePaths(directoryName, name))
		})
	}
	result.Files = filter(result.Files)
	result.Directories = filter(result.Directories)
	for name := range result.Symlinks {
		if s.blocksFallback(tspath.CombinePaths(directoryName, name)) {
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
	if node, _ := s.paths.lookup(directoryPath); node != nil {
		for _, child := range node.children {
			if symlink, ok := child.entry.(*requestSymlink); ok {
				links = append(links, *symlink)
			}
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

func (s requestFileSystem) addUnclassifiedSymlinkEntries(directoryName string, entries vfs.Entries) vfs.Entries {
	result := cloneEntries(entries)
	if result.Symlinks == nil {
		result.Symlinks = map[string]struct{}{}
	}
	directoryPath := s.toPath(directoryName)
	if node, _ := s.paths.lookup(directoryPath); node != nil {
		for _, child := range node.children {
			symlink, ok := child.entry.(*requestSymlink)
			if !ok {
				continue
			}
			name := tspath.GetBaseFileName(symlink.linkName)
			result.Files = s.deleteEntryName(result.Files, name)
			result.Directories = s.deleteEntryName(result.Directories, name)
			result.Symlinks[name] = struct{}{}
		}
	}
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
	if lookup.useHost {
		return s.host.Realpath(lookup.path)
	}
	if lookup.info != nil || !lookup.followedSymlink {
		return lookup.path
	}
	return path
}

func (s requestFileSystem) WriteFile(fileName string, data string) error {
	path, ok := s.mutationPath(fileName)
	if !ok {
		return vfs.ErrInvalid
	}
	return s.host.WriteFile(path, data)
}

func (s requestFileSystem) AppendFile(fileName string, data string) error {
	path, ok := s.mutationPath(fileName)
	if !ok {
		return vfs.ErrInvalid
	}
	return s.host.AppendFile(path, data)
}

func (s requestFileSystem) Remove(path string) error {
	path, ok := s.mutationPath(path)
	if !ok {
		return vfs.ErrInvalid
	}
	return s.host.Remove(path)
}

func (s requestFileSystem) Chtimes(path string, aTime time.Time, mTime time.Time) error {
	path, ok := s.mutationPath(path)
	if !ok {
		return vfs.ErrInvalid
	}
	return s.host.Chtimes(path, aTime, mTime)
}

func (s requestFileSystem) Stat(path string) vfs.FileInfo {
	lookup := s.lookupPath(path)
	if !lookup.ok {
		return nil
	}
	if lookup.useHost {
		if info := s.host.Stat(lookup.path); info != nil {
			return info
		}
		if s.host.DirectoryExists(lookup.path) {
			return &requestDirectory{directoryName: lookup.path}
		}
		if s.host.FileExists(lookup.path) {
			return &requestFile{fileName: lookup.path}
		}
		return nil
	}
	return lookup.info
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
	if err := s.walkDir(originalRoot, info, walkFn, visited); errors.Is(err, fs.SkipAll) {
		return nil
	} else {
		return err
	}
}

func (s requestFileSystem) walkDir(path string, info vfs.FileInfo, walkFn vfs.WalkDirFunc, visited map[string]struct{}) error {
	realpath := s.Realpath(path)
	if _, ok := visited[realpath]; ok {
		return nil
	}
	visited[realpath] = struct{}{}
	entry, ok := info.(vfs.DirEntry)
	if !ok {
		entry = fs.FileInfoToDirEntry(info)
	}
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
		if err := s.walkDir(childPath, childInfo, walkFn, visited); err != nil {
			if errors.Is(err, fs.SkipDir) {
				return nil
			}
			return err
		}
	}
	return nil
}
