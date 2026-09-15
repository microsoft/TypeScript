package project

import (
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// addFileChanges records what a new layer changes about the snapshot it is stacked
// on. Because the layer sits above the snapshot's editor overlays, every path is
// compared against the snapshot's own view of it - an overlay when a file is open,
// otherwise its cached or on-disk state - rather than against the host alone.
func addFileChanges(
	summary *FileChangeSummary,
	request *RequestFileSystem,
	base FileSource,
	baseLayer *requestFileSystem,
	currentDirectory string,
) {
	toPath := func(fileName string) tspath.Path {
		return tspath.ToPath(fileName, currentDirectory, base.UseCaseSensitiveFileNames())
	}
	// A path that stops being visible, together with every file the snapshot can
	// currently see beneath it. The snapshot expands deletions through its own
	// cached directory tree, which describes neither the layer's contents, nor a
	// directory that exists only because an overlay lives in it, nor the paths a
	// request symlink made visible, so the walk happens here. Listing resolves
	// through the layer and falls through to the overlays, cached files, and host
	// below it unless a full filesystem or a supplied listing blocks it, so this
	// reports everything the path was hiding rather than only what had been read.
	hidden := func(fileName string) {
		var walked collections.Set[tspath.Path]
		var walk func(string)
		walk = func(directoryName string) {
			if walked.Has(toPath(directoryName)) {
				return
			}
			walked.Add(toPath(directoryName))
			entries := base.GetAccessibleEntries(directoryName)
			for _, name := range entries.Files {
				summary.Deleted.Add(lsconv.FileNameToDocumentURI(tspath.CombinePaths(directoryName, name)))
			}
			for _, name := range entries.Directories {
				walk(tspath.CombinePaths(directoryName, name))
			}
		}
		if base.FileExists(fileName, toPath(fileName)) || base.DirectoryExists(fileName) {
			summary.Deleted.Add(lsconv.FileNameToDocumentURI(fileName))
		}
		walk(fileName)
	}
	// A path whose contents the layer now supplies. Reading the base to see whether
	// the contents actually differ would defeat the point of supplying them, so the
	// path is reported changed and the snapshot filters it against its own caches.
	supplied := func(fileName string) {
		uri := lsconv.FileNameToDocumentURI(fileName)
		if base.FileExists(fileName, toPath(fileName)) {
			summary.Changed.Add(uri)
		} else {
			summary.Created.Add(uri)
		}
		if base.DirectoryExists(fileName) {
			// The path was a directory, so everything beneath it is now unreachable.
			hidden(fileName)
			summary.Created.Add(uri)
		}
	}
	// A directory whose listing the layer now supplies. A listing is the source of
	// truth for enumerating that directory and nothing more: it does not hide the
	// paths beneath it, which still resolve through the layers below, so nothing
	// there is invalidated. The delete-and-create pair refreshes wildcard roots
	// that enumerated the old listing.
	relisted := func(fileName string) {
		uri := lsconv.FileNameToDocumentURI(fileName)
		if base.DirectoryExists(fileName) {
			summary.Deleted.Add(uri)
		}
		summary.Created.Add(uri)
	}
	// A symlink the layer now points somewhere else. Unlike a listing this does
	// change what the paths beneath it resolve to, so they are invalidated.
	retargeted := func(fileName string) {
		hidden(fileName)
		summary.Created.Add(lsconv.FileNameToDocumentURI(fileName))
	}
	// A request symlink makes one file visible under several names, so a change to
	// the target is also a change to every path that aliases it.
	forEachPath := func(fileName string, mark func(string)) {
		fileName = tspath.GetNormalizedAbsolutePath(fileName, currentDirectory)
		mark(fileName)
		if baseLayer != nil {
			for _, alias := range baseLayer.aliasesForPath(fileName) {
				mark(alias)
			}
		}
	}
	// Repeating contents the base layer already supplies changes nothing. This is
	// the one comparison available for free: checking the base snapshot instead
	// would mean reading the very file the request supplied to avoid reading.
	unchanged := func(fileName string) bool {
		if baseLayer == nil {
			return false
		}
		node, _ := baseLayer.paths.lookup(baseLayer.toPath(fileName))
		if node == nil {
			return false
		}
		file, ok := node.entry.(*requestFile)
		return ok && file.content == request.Files[fileName]
	}

	suppliedFiles := make(map[tspath.Path]struct{}, len(request.Files))
	for fileName := range request.Files {
		suppliedFiles[toPath(fileName)] = struct{}{}
		if !unchanged(fileName) {
			forEachPath(fileName, supplied)
		}
	}
	for _, removedPath := range request.RemovedPaths {
		if _, isSupplied := suppliedFiles[toPath(removedPath)]; isSupplied {
			continue
		}
		forEachPath(removedPath, hidden)
	}
	for directoryName := range request.Directories {
		forEachPath(directoryName, relisted)
	}
	for linkName := range request.Symlinks {
		forEachPath(linkName, retargeted)
	}
	if summary.Changed.Len()+summary.Created.Len()+summary.Deleted.Len() > 0 {
		summary.IncludesWatchChangeOutsideNodeModules = true
	}
}
