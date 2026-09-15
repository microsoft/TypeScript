package requestfilesystem

import (
	"fmt"
	"slices"
	"strings"

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

// RequestDirectoryEntries is the complete result of enumerating one directory.
// Entry names are relative to it.
//
// Supplying a listing makes the caller responsible for keeping it consistent with
// the files the filesystem exposes, whether from Files or from a lower layer,
// because it does not affect FileExists or ReadFile for paths inside that
// directory. In particular, a layer filesystem should not supply a listing for a
// directory that exists in a lower layer: the listing replaces what enumeration
// returns without hiding anything that layer contains. Use RemovedPaths to hide
// paths.
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

// requestFileSystem is either a full filesystem or a layer over the session host
// filesystem; inherited request entries are compacted into paths. On its own it
// reads its contents over the host. Stack binds it to a snapshot instead, putting
// it above that snapshot's editor overlays and cached files.
type requestFileSystem struct {
	kind Kind
	// base is the filesystem beneath this one: the session host, or, once stacked
	// onto a snapshot, the host as that snapshot sees it.
	base                  vfs.FS
	currentDirectory      string
	useCaseSensitiveNames bool
	paths                 *requestPathNode
}

type resolvedRequestPath struct {
	path            string
	followedSymlink bool
	host            bool
	ok              bool
}

type requestPathLookup struct {
	path            string
	info            requestEntry
	fileSystem      vfs.FS
	followedSymlink bool
	// host is set when an explicit host symlink routed the path out of this
	// filesystem. Such paths bypass any layers stacked beneath it.
	host bool
	ok   bool
}

func getRequestFileSystem(layer project.FileSystemLayer) *requestFileSystem {
	requestFileSystem, _ := layer.(*requestFileSystem)
	return requestFileSystem
}

// NewForUpdate creates the request filesystem layer for a snapshot update.
//
// inherited is the layer the update continues from, which a new layer is compacted
// onto so the result does not retain its base snapshot's filesystem. base is the
// snapshot the new layer will be stacked on; its contents, including editor
// overlays, determine which paths the layer actually changes. The two differ when
// an update names no base snapshot: it still applies to the session's current
// snapshot but deliberately starts its filesystem over from the host. This weirdness
// will go away in #64204.
func NewForUpdate(
	params *RequestFileSystem,
	inherited project.FileSystemLayer,
	base project.FileSource,
	host vfs.FS,
	currentDirectory string,
	fileChanges *project.FileChangeSummary,
) (project.FileSystemLayer, error) {
	if params == nil {
		return inherited, nil
	}
	inheritedLayer := getRequestFileSystem(inherited)
	if params.Kind == KindFull {
		// A full filesystem replaces everything the snapshot could see, so no
		// per-path comparison against it is meaningful.
		fileChanges.InvalidateAll = true
	} else if base != nil {
		addFileChanges(fileChanges, params, base, inheritedLayer, currentDirectory)
	}
	return newLayer(params, inheritedLayer, host, currentDirectory)
}

// newLayer builds one request filesystem, compacting it onto the layer it replaces
// so the result does not retain its base snapshot's filesystem.
func newLayer(params *RequestFileSystem, base *requestFileSystem, host vfs.FS, currentDirectory string) (*requestFileSystem, error) {
	fileSystem, err := newRequestFileSystemWorker(params, host, currentDirectory)
	if err != nil {
		return nil, err
	}
	if params.Kind == KindLayer && base != nil {
		compacted := fileSystem.applyTo(*base)
		return &compacted, nil
	}
	return fileSystem, nil
}

// HasFullFileSystem reports whether layer is a complete request filesystem.
func HasFullFileSystem(layer project.FileSystemLayer) bool {
	requestFileSystem := getRequestFileSystem(layer)
	return requestFileSystem != nil && requestFileSystem.kind == KindFull
}

func newRequestFileSystemWorker(params *RequestFileSystem, base vfs.FS, currentDirectory string) (*requestFileSystem, error) {
	if params.Kind != KindFull && params.Kind != KindLayer {
		return nil, fmt.Errorf("unknown request filesystem kind %q", params.Kind)
	}

	result := requestFileSystem{
		kind:                  params.Kind,
		base:                  base,
		currentDirectory:      currentDirectory,
		useCaseSensitiveNames: base.UseCaseSensitiveFileNames(),
		paths:                 &requestPathNode{},
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

func (s requestFileSystem) baseFileSystem() vfs.FS {
	return s.base
}

func (s requestFileSystem) applyTo(base requestFileSystem) requestFileSystem {
	s.paths = composeRequestPaths(base.paths, s.paths, requestFallbackAllowed, s.useCaseSensitiveNames)
	s.kind = base.kind
	s.base = base.base
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

func (s requestFileSystem) localPathInfo(path string) (requestEntry, requestFallback) {
	node, fallback := s.paths.lookup(s.toPath(path))
	if node == nil {
		return nil, fallback
	}
	if _, isSymlink := node.entry.(*requestSymlink); isSymlink {
		// A symlink is not an entry in its own right; the caller resolves it instead.
		return nil, fallback
	}
	return node.entry, fallback
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
		result.host = resolved.host
		result.fileSystem = s.base
		result.ok = result.fileSystem != nil
	}
	return result
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

// ReadFile implements project.FileSystemLayer.
func (s requestFileSystem) ReadFile(fileName string) (string, bool) {
	lookup := s.lookupPath(fileName)
	if !lookup.ok || lookup.fileSystem != nil {
		return "", false
	}
	if file, ok := lookup.info.(*requestFile); ok {
		return file.content, true
	}
	return "", false
}

// below is whatever this filesystem resolves through for paths it does not supply
// itself. A listing needs more than that filesystem's entries: classifying a
// symlink means asking whether its target exists, and the answer has to come from
// the same place the link would resolve to, not from the host underneath it.
type below interface {
	GetAccessibleEntries(path string) vfs.Entries
	FileExists(path string) bool
	DirectoryExists(path string) bool
}

// Shadows implements project.FileSystemLayer: this filesystem answers for the path
// itself rather than deferring to whatever it was stacked over. Supplying a
// directory listing does not shadow anything beneath it, since a listing is the
// source of truth for enumerating that directory only.
func (s requestFileSystem) Shadows(path string) bool {
	return s.lookupPath(path).fileSystem == nil
}

// accessibleEntries lists a directory, taking any entries this filesystem does not
// supply itself from below. Paths routed out by an explicit host symlink always read
// the host rather than below, since they deliberately escape this filesystem.
func (s requestFileSystem) accessibleEntries(directoryName string, resolvesThrough below) vfs.Entries {
	lookup := s.lookupPath(directoryName)
	if !lookup.ok || lookup.info != nil && !lookup.info.IsDir() {
		return vfs.Entries{Symlinks: map[string]struct{}{}}
	}
	if lookup.host {
		resolvesThrough = s.baseFileSystem()
	}
	var result vfs.Entries
	if lookup.fileSystem != nil {
		result = s.removeEntries(lookup.path, resolvesThrough.GetAccessibleEntries(lookup.path))
	} else {
		localEntries, explicit, _ := s.getLocalEntries(lookup.path)
		result = localEntries
		if s.kind == KindLayer && !explicit && !s.blocksFallback(directoryName) && !s.blocksFallback(lookup.path) {
			result = s.removeEntries(lookup.path, resolvesThrough.GetAccessibleEntries(lookup.path))
			result = mergeEntries(result, localEntries, s.equalEntryNames)
		}
		result = s.addSymlinkEntries(lookup.path, result, resolvesThrough)
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

func (s requestFileSystem) getLocalEntries(directoryName string) (entries vfs.Entries, explicit bool, ok bool) {
	node, _ := s.paths.lookup(s.toPath(directoryName))
	entries, ok = node.entries()
	if node != nil {
		if directory, isDirectory := node.entry.(*requestDirectory); isDirectory {
			explicit = directory.listing != nil
		}
	}
	return entries, explicit, ok
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

// symlinkTargetIsDirectory and symlinkTargetIsFile classify a link for a listing.
// The link resolves within this filesystem, but its target may only exist below,
// so the answer for a deferred path comes from there rather than from the host.
func (s requestFileSystem) symlinkTargetIsDirectory(symlink requestSymlink, resolvesThrough below) bool {
	lookup := s.lookupPath(symlink.linkName)
	if !lookup.ok || lookup.info != nil && !lookup.info.IsDir() {
		return false
	}
	if lookup.info != nil {
		return true
	}
	return lookup.fileSystem != nil && s.resolverFor(lookup, resolvesThrough).DirectoryExists(lookup.path)
}

func (s requestFileSystem) symlinkTargetIsFile(symlink requestSymlink, resolvesThrough below) bool {
	lookup := s.lookupPath(symlink.linkName)
	if !lookup.ok || lookup.info != nil && lookup.info.IsDir() {
		return false
	}
	if lookup.info != nil {
		return true
	}
	return lookup.fileSystem != nil && s.resolverFor(lookup, resolvesThrough).FileExists(lookup.path)
}

// resolverFor returns where a deferred lookup should be answered. An explicit host
// symlink deliberately escapes the stack, so it reads the host rather than below.
func (s requestFileSystem) resolverFor(lookup requestPathLookup, resolvesThrough below) below {
	if lookup.host {
		return s.baseFileSystem()
	}
	return resolvesThrough
}

func (s requestFileSystem) addSymlinkEntries(directoryName string, entries vfs.Entries, resolvesThrough below) vfs.Entries {
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
		if s.symlinkTargetIsDirectory(symlink, resolvesThrough) {
			result.Directories = append(result.Directories, name)
			result.Symlinks[name] = struct{}{}
		} else if s.symlinkTargetIsFile(symlink, resolvesThrough) {
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
