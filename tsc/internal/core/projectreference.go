package core

import "github.com/microsoft/typescript-go/internal/tspath"

type ProjectReference struct {
	Path         string `json:"path"`
	OriginalPath string `json:"originalPath"`
	Circular     bool   `json:"circular"`
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
