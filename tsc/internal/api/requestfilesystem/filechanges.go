package requestfilesystem

import (
	"maps"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

func (s *requestFileSystem) ExpandFileChanges(summary project.FileChangeSummary) project.FileChangeSummary {
	expand := func(uris *collections.Set[lsproto.DocumentUri]) {
		var additional collections.Set[lsproto.DocumentUri]
		for uri := range uris.Keys() {
			for _, alias := range s.aliasesForPath(uri.FileName().AsPath()) {
				additional.Add(lsconv.FileNameToDocumentURI(tspath.RootedFilePathFromPath(alias)))
			}
		}
		for uri := range additional.Keys() {
			uris.Add(uri)
		}
	}
	expand(&summary.Changed)
	expand(&summary.Created)
	expand(&summary.Deleted)
	return summary
}

func addRebaseFileChanges(summary *project.FileChangeSummary, source *requestFileSystem, baseFS vfs.FS, baseContents vfs.FS, rebased *requestFileSystem) {
	baseRequestFS := getRequestFileSystem(baseFS)
	addChange := func(path tspath.RootedPath, kind lsproto.FileChangeType) {
		uri := lsconv.FileNameToDocumentURI(tspath.RootedFilePathFromPath(path))
		if kind == lsproto.FileChangeTypeDeleted {
			if baseContents.FileExists(tspath.RootedFilePathFromPath(path)) || baseContents.DirectoryExists(tspath.RootedDirectoryPathFromPath(path)) {
				summary.Deleted.Add(uri)
			}
		} else if kind == lsproto.FileChangeTypeCreated {
			summary.Created.Add(uri)
		} else if baseContents.FileExists(tspath.RootedFilePathFromPath(path)) {
			summary.Changed.Add(uri)
		} else {
			summary.Created.Add(uri)
		}
	}
	addChangeAndAliases := func(path tspath.RootedPath, kind lsproto.FileChangeType) {
		addChange(path, kind)
		if baseRequestFS != nil {
			for _, alias := range baseRequestFS.aliasesForPath(path) {
				addChange(alias, kind)
			}
		}
	}
	var addRemovedEntries func(*requestPathNode)
	addRemovedEntries = func(node *requestPathNode) {
		if node == nil {
			return
		}
		switch entry := node.entry.(type) {
		case *requestFile:
			if !rebased.FileExists(entry.fileName) {
				addChangeAndAliases(entry.fileName.AsPath(), lsproto.FileChangeTypeDeleted)
				return
			}
		case *requestDirectory:
			if !rebased.DirectoryExists(entry.directoryName) {
				addChangeAndAliases(entry.directoryName.AsPath(), lsproto.FileChangeTypeDeleted)
				return
			}
		case *requestSymlink:
			if !rebased.FileExists(tspath.RootedFilePathFromPath(entry.linkName)) && !rebased.DirectoryExists(tspath.RootedDirectoryPathFromPath(entry.linkName)) {
				addChangeAndAliases(entry.linkName, lsproto.FileChangeTypeDeleted)
				return
			}
		}
		for _, child := range node.children {
			addRemovedEntries(child)
		}
	}
	var visit func(*requestPathNode)
	visit = func(node *requestPathNode) {
		for path, child := range node.children {
			_, isFile := child.entry.(*requestFile)
			if child.fallback == requestFallbackMissing && child.fallbackPath != "" && !isFile {
				previousFallback := requestFallbackAllowed
				if baseRequestFS != nil {
					_, previousFallback = baseRequestFS.paths.lookup(path)
				}
				if previousFallback != requestFallbackMissing {
					addChangeAndAliases(child.fallbackPath, lsproto.FileChangeTypeDeleted)
				} else if baseRequestFS != nil {
					// A tombstone can still have explicit descendants. Reapplying
					// it drops target descendants not supplied by the source.
					previous, _ := baseRequestFS.paths.lookup(path)
					addRemovedEntries(previous)
				}
			}
			switch entry := child.entry.(type) {
			case *requestFile:
				if previous, ok := baseContents.ReadFile(entry.fileName); !ok || previous != entry.content {
					addChangeAndAliases(entry.fileName.AsPath(), lsproto.FileChangeTypeChanged)
				}
			case *requestDirectory:
				if entry.listing != nil {
					// The snapshot view merges cached files into listings, even
					// when omitted explicitly. Compare the supplied listings.
					previous := baseFS.GetAccessibleEntries(entry.directoryName)
					current := rebased.GetAccessibleEntries(entry.directoryName)
					if !slices.Equal(previous.Files, current.Files) || !slices.Equal(previous.Directories, current.Directories) || !maps.Equal(previous.Symlinks, current.Symlinks) {
						addChangeAndAliases(entry.directoryName.AsPath(), lsproto.FileChangeTypeDeleted)
						addChangeAndAliases(entry.directoryName.AsPath(), lsproto.FileChangeTypeCreated)
					}
				}
				if source.kind == KindFull {
					previous := baseContents.GetAccessibleEntries(entry.directoryName)
					for _, name := range previous.Files {
						fileName := entry.directoryName.ResolveFile(name)
						if !rebased.FileExists(fileName) {
							addChangeAndAliases(fileName.AsPath(), lsproto.FileChangeTypeDeleted)
						}
					}
					for _, name := range previous.Directories {
						directoryName := entry.directoryName.ResolveDirectory(name)
						if !rebased.DirectoryExists(directoryName) {
							addChangeAndAliases(directoryName.AsPath(), lsproto.FileChangeTypeDeleted)
						}
					}
				}
			case *requestSymlink:
				if baseRequestFS != nil {
					previous, _ := baseRequestFS.paths.lookup(path)
					if previous != nil {
						if previousLink, ok := previous.entry.(*requestSymlink); ok && *previousLink == *entry {
							break
						}
					}
				}
				addChangeAndAliases(entry.linkName, lsproto.FileChangeTypeDeleted)
				addChangeAndAliases(entry.linkName, lsproto.FileChangeTypeCreated)
			}
			visit(child)
		}
	}
	visit(source.paths)
	if summary.Changed.Len()+summary.Created.Len()+summary.Deleted.Len() > 0 {
		summary.IncludesWatchChangeOutsideNodeModules = true
	}
}

func addFileChanges(summary *project.FileChangeSummary, request *RequestFileSystem, baseFS vfs.FS, fileSystem *requestFileSystem, currentDirectory tspath.RootedDirectoryPath) {
	caseSensitivity := baseFS.CaseSensitivity()
	baseRequestFS := getRequestFileSystem(baseFS)
	addChange := func(fileName tspath.RootedPath, deleted bool) {
		uri := lsconv.FileNameToDocumentURI(tspath.RootedFilePathFromPath(fileName))
		if deleted {
			if baseFS.FileExists(tspath.RootedFilePathFromPath(fileName)) || baseFS.DirectoryExists(tspath.RootedDirectoryPathFromPath(fileName)) {
				summary.Deleted.Add(uri)
			}
			return
		}
		if baseFS.FileExists(tspath.RootedFilePathFromPath(fileName)) {
			summary.Changed.Add(uri)
		} else {
			summary.Created.Add(uri)
		}
	}
	addChangeAndAliases := func(fileName tspath.RootedPath, deleted bool) {
		addChange(fileName, deleted)
		if baseRequestFS != nil {
			for _, alias := range baseRequestFS.aliasesForPath(fileName) {
				addChange(alias, deleted)
			}
		}
	}
	overlayFiles := make(map[tspath.PathKey]struct{}, len(request.Files))
	for fileName := range request.Files {
		absoluteFileName := tspath.ToRootedFilePath(fileName, currentDirectory)
		overlayFiles[caseSensitivity.PathKey(absoluteFileName.AsPath())] = struct{}{}
		addChangeAndAliases(absoluteFileName.AsPath(), false)
	}
	for _, removedPath := range request.RemovedPaths {
		absolutePath := tspath.ToRootedPath(removedPath, currentDirectory)
		if _, replaced := overlayFiles[caseSensitivity.PathKey(absolutePath)]; replaced {
			continue
		}
		addChangeAndAliases(absolutePath, true)
	}
	// Replacing a listing or a symlink can change every cached descendant.
	// Delete events expand through the snapshot's cached directory tree and create
	// events that refresh wildcard roots and previously missing module resolutions.
	addReplacement := func(path string) {
		absolutePath := tspath.ToRootedPath(path, currentDirectory)
		addChangeAndAliases(absolutePath, true)
		summary.Created.Add(lsconv.FileNameToDocumentURI(tspath.RootedFilePathFromPath(absolutePath)))
		if baseRequestFS != nil {
			for _, alias := range baseRequestFS.aliasesForPath(absolutePath) {
				summary.Created.Add(lsconv.FileNameToDocumentURI(tspath.RootedFilePathFromPath(alias)))
			}
		}
	}
	for directoryName := range request.Directories {
		addReplacement(directoryName)
	}
	for linkName := range request.Symlinks {
		addReplacement(linkName)
	}
	if layeredBase, ok := baseFS.(project.LayeredFileSystem); ok {
		overlays := fileSystem.Overlays()
		for path, overlay := range layeredBase.Overlays() {
			if _, preserved := overlays[path]; preserved {
				continue
			}
			uri := lsconv.FileNameToDocumentURI(overlay.FileName())
			if summary.Closed.Has(uri) {
				continue
			}
			summary.Created.Delete(uri)
			if fileSystem.FileExists(overlay.FileName()) {
				summary.Deleted.Delete(uri)
				summary.Changed.Add(uri)
			} else {
				summary.Changed.Delete(uri)
				summary.Deleted.Add(uri)
			}
		}
	}
	if summary.Changed.Len()+summary.Created.Len()+summary.Deleted.Len() > 0 {
		summary.IncludesWatchChangeOutsideNodeModules = true
	}
}
