package core

import "github.com/microsoft/TypeScript/tsc/internal/tspath"

type ProjectReference struct {
	// Path is a normalized path on disk.
	Path tspath.RootedPath `json:"path"`
	// OriginalPath is the path as it was originally written.
	OriginalPath string `json:"originalPath"`
	// Circular indicates that this reference is intended to form a circularity.
	Circular bool `json:"circular"`
}

func ResolveProjectReferencePath(ref *ProjectReference) tspath.RootedFilePath {
	return ResolveConfigFileNameOfProjectReference(ref.Path)
}

func ResolveConfigFileNameOfProjectReference(path tspath.RootedPath) tspath.RootedFilePath {
	fileName := tspath.RootedFilePathFromPath(path)
	if fileName.ExtensionIs(tspath.ExtensionJson) {
		return fileName
	}
	return tspath.RootedDirectoryPathFromPath(path).ResolveFile("tsconfig.json")
}
