package requestfilesystem

import (
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

func addFileChanges(summary *project.FileChangeSummary, request *RequestFileSystem, baseFS vfs.FS, currentDirectory tspath.RootedDirectoryPath) {
	toPath := baseFS.CaseSensitivity().PathKey
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
		overlayFiles[toPath(absoluteFileName.AsPath())] = struct{}{}
		addChangeAndAliases(absoluteFileName.AsPath(), false)
	}
	for _, removedPath := range request.RemovedPaths {
		absolutePath := tspath.ToRootedPath(removedPath, currentDirectory)
		if _, replaced := overlayFiles[toPath(absolutePath)]; replaced {
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
	if summary.Changed.Len()+summary.Created.Len()+summary.Deleted.Len() > 0 {
		summary.IncludesWatchChangeOutsideNodeModules = true
	}
}
