package requestfilesystem

import (
	"maps"
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

type requestFallback uint8

const (
	requestFallbackInherit requestFallback = iota
	requestFallbackAllowed
	requestFallbackMissing
)

// requestEntry is a file, directory, or symlink the request supplied. A symlink is
// never observed as an entry: lookups resolve it and report whatever it points at.
type requestEntry interface {
	isRequestEntry()
	IsDir() bool
}

type requestFile struct {
	fileName   string
	content    string
	handle     project.FileHandle
	handleOnce sync.Once
}

func (file *requestFile) fileHandle() project.FileHandle {
	file.handleOnce.Do(func() {
		file.handle = project.NewFileHandle(file.fileName, file.content)
	})
	return file.handle
}

type requestSymlink struct {
	linkName string
	target   string
	host     bool
}

type requestDirectory struct {
	directoryName string
	listing       *vfs.Entries
}

func (*requestFile) isRequestEntry()      {}
func (*requestSymlink) isRequestEntry()   {}
func (*requestDirectory) isRequestEntry() {}

func (*requestFile) IsDir() bool      { return false }
func (*requestSymlink) IsDir() bool   { return false }
func (*requestDirectory) IsDir() bool { return true }

type requestPathNode struct {
	entry       requestEntry
	fallback    requestFallback
	children    map[tspath.Path]*requestPathNode
	hasSymlinks bool
}

func (node *requestPathNode) replacesSubtree() bool {
	switch node.entry.(type) {
	case *requestFile, *requestSymlink:
		return true
	}
	return false
}

func requestPathAncestors(path tspath.Path) []tspath.Path {
	var paths []tspath.Path
	for {
		paths = append(paths, path)
		parent := tspath.Path(tspath.GetDirectoryPath(string(path)))
		if parent == path {
			break
		}
		path = parent
	}
	slices.Reverse(paths)
	return paths
}

func (node *requestPathNode) ensure(path tspath.Path) *requestPathNode {
	for _, ancestor := range requestPathAncestors(path) {
		if node.children == nil {
			node.children = make(map[tspath.Path]*requestPathNode)
		}
		child := node.children[ancestor]
		if child == nil {
			child = &requestPathNode{}
			node.children[ancestor] = child
		}
		node = child
	}
	return node
}

func (node *requestPathNode) lookup(path tspath.Path) (*requestPathNode, requestFallback) {
	fallback := requestFallbackInherit
	for _, ancestor := range requestPathAncestors(path) {
		if node == nil {
			break
		}
		if node.fallback != requestFallbackInherit {
			fallback = node.fallback
		}
		node = node.children[ancestor]
	}
	if node != nil && node.fallback != requestFallbackInherit {
		fallback = node.fallback
	}
	return node, fallback
}

func (node *requestPathNode) walkSymlinks(visit func(tspath.Path, *requestSymlink)) {
	if node == nil || !node.hasSymlinks {
		return
	}
	for path, child := range node.children {
		if symlink, ok := child.entry.(*requestSymlink); ok {
			visit(path, symlink)
		}
		child.walkSymlinks(visit)
	}
}

func (node *requestPathNode) entries() (vfs.Entries, bool) {
	if node == nil {
		return vfs.Entries{}, false
	}
	directory, ok := node.entry.(*requestDirectory)
	if !ok {
		return vfs.Entries{}, false
	}
	if directory.listing != nil {
		return cloneEntries(*directory.listing), true
	}
	var entries vfs.Entries
	for _, child := range node.children {
		switch entry := child.entry.(type) {
		case *requestFile:
			entries.Files = append(entries.Files, tspath.GetBaseFileName(entry.fileName))
		case *requestDirectory:
			entries.Directories = append(entries.Directories, tspath.GetBaseFileName(entry.directoryName))
		}
	}
	slices.Sort(entries.Files)
	slices.Sort(entries.Directories)
	return entries, true
}

func composeRequestPaths(base *requestPathNode, overlay *requestPathNode, fallback requestFallback, caseSensitive bool) *requestPathNode {
	if overlay == nil {
		return base
	}
	if overlay.fallback != requestFallbackInherit {
		fallback = overlay.fallback
		base = nil
	}
	if overlay.replacesSubtree() {
		base = nil
	}
	var result requestPathNode
	if base != nil {
		result = *base
	}
	result.children = maps.Clone(result.children)
	if overlay.fallback != requestFallbackInherit || overlay.replacesSubtree() {
		result.fallback = fallback
	}
	previousDirectory, _ := result.entry.(*requestDirectory)
	overlayDirectory, _ := overlay.entry.(*requestDirectory)
	if overlay.entry != nil {
		result.entry = overlay.entry
		// Repeating a file's existing content leaves it unchanged, so keep the
		// entry the snapshots below are already using.
		if overlayFile, ok := overlay.entry.(*requestFile); ok && base != nil {
			if baseFile, ok := base.entry.(*requestFile); ok && overlayFile.content == baseFile.content {
				result.entry = baseFile
			}
		}
		if overlayDirectory != nil && overlayDirectory.listing == nil && previousDirectory != nil {
			result.entry = &requestDirectory{directoryName: overlayDirectory.directoryName, listing: previousDirectory.listing}
		}
	}
	for path, child := range overlay.children {
		if result.children == nil {
			result.children = make(map[tspath.Path]*requestPathNode)
		}
		result.children[path] = composeRequestPaths(result.children[path], child, fallback, caseSensitive)
	}
	if directory, ok := result.entry.(*requestDirectory); ok && directory.listing != nil && (overlayDirectory == nil || overlayDirectory.listing == nil) {
		entries := cloneEntries(*directory.listing)
		equal := func(left string, right string) bool {
			return tspath.GetCanonicalFileName(left, caseSensitive) == tspath.GetCanonicalFileName(right, caseSensitive)
		}
		for path, child := range overlay.children {
			name := tspath.GetBaseFileName(string(path))
			if child.fallback == requestFallbackMissing || child.replacesSubtree() {
				entries.Files = slices.DeleteFunc(entries.Files, func(entry string) bool { return equal(entry, name) })
				entries.Directories = slices.DeleteFunc(entries.Directories, func(entry string) bool { return equal(entry, name) })
				for entry := range entries.Symlinks {
					if equal(entry, name) {
						delete(entries.Symlinks, entry)
					}
				}
			}
			switch entry := child.entry.(type) {
			case *requestFile:
				entries = mergeEntries(entries, vfs.Entries{Files: []string{tspath.GetBaseFileName(entry.fileName)}}, equal)
			case *requestDirectory:
				entries = mergeEntries(entries, vfs.Entries{Directories: []string{tspath.GetBaseFileName(entry.directoryName)}}, equal)
			}
		}
		result.entry = &requestDirectory{directoryName: directory.directoryName, listing: &entries}
	}
	_, result.hasSymlinks = result.entry.(*requestSymlink)
	for _, child := range result.children {
		result.hasSymlinks = result.hasSymlinks || child.hasSymlinks
	}
	return &result
}

func (node *requestPathNode) firstSymlink(path tspath.Path) (tspath.Path, *requestSymlink) {
	for _, ancestor := range requestPathAncestors(path) {
		if node == nil {
			break
		}
		node = node.children[ancestor]
		if node != nil {
			if symlink, ok := node.entry.(*requestSymlink); ok {
				return ancestor, symlink
			}
		}
	}
	return "", nil
}

func (node *requestPathNode) containsFileAncestor(path tspath.Path) bool {
	for _, ancestor := range requestPathAncestors(path) {
		if node == nil {
			return false
		}
		node = node.children[ancestor]
		if ancestor != path && node != nil {
			if _, ok := node.entry.(*requestFile); ok {
				return true
			}
		}
	}
	return false
}

func requestPathContains(parent tspath.Path, path tspath.Path) bool {
	return path == parent || strings.HasPrefix(string(path), tspath.EnsureTrailingDirectorySeparator(string(parent)))
}
