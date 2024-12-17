package tspath

import (
	"path"
	"path/filepath"
	"strings"
)

const (
	ExtensionTs          = ".ts"
	ExtensionTsx         = ".tsx"
	ExtensionDts         = ".d.ts"
	ExtensionJs          = ".js"
	ExtensionJsx         = ".jsx"
	ExtensionJson        = ".json"
	ExtensionTsBuildInfo = ".tsbuildinfo"
	ExtensionMjs         = ".mjs"
	ExtensionMts         = ".mts"
	ExtensionDmts        = ".d.mts"
	ExtensionCjs         = ".cjs"
	ExtensionCts         = ".cts"
	ExtensionDcts        = ".d.cts"
)

var (
	supportedDeclarationExtensions           = []string{ExtensionDts, ExtensionDcts, ExtensionDmts}
	supportedTSImplementationExtensions      = []string{ExtensionTs, ExtensionTsx, ExtensionMts, ExtensionCts}
	supportedTSExtensionsForExtractExtension = []string{ExtensionDts, ExtensionDcts, ExtensionDmts, ExtensionTs, ExtensionTsx, ExtensionMts, ExtensionCts}
)

func ExtensionIsTs(ext string) bool {
	return ext == ExtensionTs || ext == ExtensionTsx || ext == ExtensionDts || ext == ExtensionMts || ext == ExtensionDmts || ext == ExtensionCts || ext == ExtensionDcts || len(ext) >= 7 && ext[:3] == ".d." && ext[len(ext)-3:] == ".ts"
}

var extensionsToRemove = []string{ExtensionDts, ExtensionDmts, ExtensionDcts, ExtensionMjs, ExtensionMts, ExtensionCjs, ExtensionCts, ExtensionTs, ExtensionJs, ExtensionTsx, ExtensionJsx, ExtensionJson}

func RemoveFileExtension(path string) string {
	// Remove any known extension even if it has more than one dot
	for _, ext := range extensionsToRemove {
		if strings.HasSuffix(path, ext) {
			return path[:len(path)-len(ext)]
		}
	}
	// Otherwise just remove single dot extension, if any
	return path[:len(path)-len(filepath.Ext(path))]
}

func TryGetExtensionFromPath(p string) string {
	for _, ext := range extensionsToRemove {
		if FileExtensionIs(p, ext) {
			return ext
		}
	}
	return ""
}

func RemoveExtension(path string, extension string) string {
	return path[:len(path)-len(extension)]
}

func FileExtensionIsOneOf(path string, extensions []string) bool {
	for _, ext := range extensions {
		if FileExtensionIs(path, ext) {
			return true
		}
	}
	return false
}

func TryExtractTSExtension(fileName string) string {
	for _, ext := range supportedTSExtensionsForExtractExtension {
		if FileExtensionIs(fileName, ext) {
			return ext
		}
	}
	return ""
}

func HasImplementationTSFileExtension(path string) bool {
	return FileExtensionIsOneOf(path, supportedTSImplementationExtensions) && !IsDeclarationFileName(path)
}

func IsDeclarationFileName(fileName string) bool {
	return GetDeclarationFileExtension(fileName) != ""
}

func GetDeclarationFileExtension(fileName string) string {
	_, base := path.Split(fileName)
	for _, ext := range supportedDeclarationExtensions {
		if strings.HasSuffix(base, ext) {
			return ext
		}
	}
	if strings.HasSuffix(base, ExtensionTs) {
		index := strings.Index(base, ".d.")
		if index >= 0 {
			return base[index:]
		}
	}
	return ""
}
