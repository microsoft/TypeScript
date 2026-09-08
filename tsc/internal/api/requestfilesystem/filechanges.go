package requestfilesystem

import (
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

func addFileChanges(summary *project.FileChangeSummary, request *RequestFileSystem, baseFS vfs.FS, currentDirectory string) {
	toPath := func(fileName string) tspath.Path {
		return tspath.ToPath(fileName, currentDirectory, baseFS.UseCaseSensitiveFileNames())
	}
	baseRequestFS := getRequestFileSystem(baseFS)
	addChange := func(fileName string, deleted bool) {
		uri := lsconv.FileNameToDocumentURI(fileName)
		if deleted {
			if baseFS.FileExists(fileName) || baseFS.DirectoryExists(fileName) {
				summary.Deleted.Add(uri)
			}
			return
		}
		if baseFS.FileExists(fileName) {
			summary.Changed.Add(uri)
		} else {
			summary.Created.Add(uri)
		}
	}
	addChangeAndAliases := func(fileName string, deleted bool) {
		addChange(fileName, deleted)
		if baseRequestFS != nil {
			for _, alias := range baseRequestFS.aliasesForPath(fileName) {
				addChange(alias, deleted)
			}
		}
	}
	overlayFiles := make(map[tspath.Path]struct{}, len(request.Files))
	for fileName := range request.Files {
		absoluteFileName := tspath.GetNormalizedAbsolutePath(fileName, currentDirectory)
		overlayFiles[toPath(absoluteFileName)] = struct{}{}
		addChangeAndAliases(absoluteFileName, false)
	}
	for _, removedPath := range request.RemovedPaths {
		absoluteFileName := tspath.GetNormalizedAbsolutePath(removedPath, currentDirectory)
		if _, replaced := overlayFiles[toPath(absoluteFileName)]; replaced {
			continue
		}
		addChangeAndAliases(absoluteFileName, true)
	}
	// Replacing a listing or a symlink can change every cached descendant.
	// Delete events expand through the snapshot's cached directory tree and create
	// events that refresh wildcard roots and previously missing module resolutions.
	addReplacement := func(path string) {
		absolutePath := tspath.GetNormalizedAbsolutePath(path, currentDirectory)
		addChangeAndAliases(absolutePath, true)
		summary.Created.Add(lsconv.FileNameToDocumentURI(absolutePath))
		if baseRequestFS != nil {
			for _, alias := range baseRequestFS.aliasesForPath(absolutePath) {
				summary.Created.Add(lsconv.FileNameToDocumentURI(alias))
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
