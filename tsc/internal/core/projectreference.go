package core

import "github.com/microsoft/TypeScript/tsc/internal/tspath"

type ProjectReference struct {
	// Path is a normalized path on disk.
	Path string `json:"path"`
	// OriginalPath is the path as it was originally written.
	OriginalPath string `json:"originalPath"`
	// Circular indicates that this reference is intended to form a circularity.
	Circular bool `json:"circular"`
}

func ResolveProjectReferencePath(ref *ProjectReference) string {
	return ResolveConfigFileNameOfProjectReference(ref.Path)
}

func ResolveConfigFileNameOfProjectReference(path string) string {
	if tspath.FileExtensionIs(path, tspath.ExtensionJson) {
		return path
	}
	return tspath.CombinePaths(path, "tsconfig.json")
}
