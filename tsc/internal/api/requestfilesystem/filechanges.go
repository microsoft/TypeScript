package requestfilesystem

import (
	"cmp"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func getFileSourceLayerChanges(
	request *RequestFileSystem,
	base *requestFileSystem,
	currentDirectory string,
	useCaseSensitiveNames bool,
) []project.FileSourceLayerChange {
	if base != nil {
		useCaseSensitiveNames = base.useCaseSensitiveNames
	}
	toPath := func(fileName string) tspath.Path {
		return tspath.ToPath(fileName, currentDirectory, useCaseSensitiveNames)
	}
	changes := make(map[tspath.Path]project.FileSourceLayerChange)
	add := func(fileName string, recursive bool) {
		absolutePath := tspath.GetNormalizedAbsolutePath(fileName, currentDirectory)
		path := toPath(absolutePath)
		if existing, ok := changes[path]; !ok || recursive && !existing.Recursive {
			changes[path] = project.FileSourceLayerChange{Path: absolutePath, Recursive: recursive}
		}
	}
	addWithAliases := func(fileName string, recursive bool) {
		add(fileName, recursive)
		if base != nil {
			for _, alias := range base.aliasesForPath(fileName) {
				add(alias, recursive)
			}
		}
	}
	addRequestDescendants := func(fileName string) {
		if base == nil {
			return
		}
		node, _ := base.paths.lookup(base.toPath(fileName))
		node.walkFiles(func(file *requestFile) {
			addWithAliases(file.fileName, false)
		})
	}

	files := make(map[tspath.Path]struct{}, len(request.Files))
	for fileName := range request.Files {
		absolutePath := tspath.GetNormalizedAbsolutePath(fileName, currentDirectory)
		files[toPath(absolutePath)] = struct{}{}
		addRequestDescendants(absolutePath)
		addWithAliases(absolutePath, false)
	}
	for _, removedPath := range request.RemovedPaths {
		absolutePath := tspath.GetNormalizedAbsolutePath(removedPath, currentDirectory)
		if _, replaced := files[toPath(absolutePath)]; replaced {
			continue
		}
		addRequestDescendants(absolutePath)
		addWithAliases(absolutePath, true)
	}
	for directoryName := range request.Directories {
		addRequestDescendants(directoryName)
		addWithAliases(directoryName, true)
	}
	for linkName := range request.Symlinks {
		addRequestDescendants(linkName)
		addWithAliases(linkName, true)
	}

	result := make([]project.FileSourceLayerChange, 0, len(changes))
	for _, change := range changes {
		result = append(result, change)
	}
	slices.SortFunc(result, func(left project.FileSourceLayerChange, right project.FileSourceLayerChange) int {
		return cmp.Compare(left.Path, right.Path)
	})
	return result
}
