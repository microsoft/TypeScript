package tspath

import (
	"path/filepath"
	"slices"
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
	supportedDeclarationExtensions                 = []string{ExtensionDts, ExtensionDcts, ExtensionDmts}
	supportedTSImplementationExtensions            = []string{ExtensionTs, ExtensionTsx, ExtensionMts, ExtensionCts}
	supportedTSExtensionsForExtractExtension       = []string{ExtensionDts, ExtensionDcts, ExtensionDmts, ExtensionTs, ExtensionTsx, ExtensionMts, ExtensionCts}
	AllSupportedExtensions                         = [][]string{{ExtensionTs, ExtensionTsx, ExtensionDts, ExtensionJs, ExtensionJsx}, {ExtensionCts, ExtensionDcts, ExtensionCjs}, {ExtensionMts, ExtensionDmts, ExtensionMjs}}
	SupportedTSExtensions                          = [][]string{{ExtensionTs, ExtensionTsx, ExtensionDts}, {ExtensionCts, ExtensionDcts}, {ExtensionMts, ExtensionDmts}}
	SupportedTSExtensionsFlat                      = []string{ExtensionTs, ExtensionTsx, ExtensionDts, ExtensionCts, ExtensionDcts, ExtensionMts, ExtensionDmts}
	SupportedJSExtensions                          = [][]string{{ExtensionJs, ExtensionJsx}, {ExtensionMjs}, {ExtensionCjs}}
	SupportedJSExtensionsFlat                      = []string{ExtensionJs, ExtensionJsx, ExtensionMjs, ExtensionCjs}
	AllSupportedExtensionsWithJson                 = slices.Concat(AllSupportedExtensions, [][]string{{ExtensionJson}})
	SupportedTSExtensionsWithJson                  = slices.Concat(SupportedTSExtensions, [][]string{{ExtensionJson}})
	SupportedTSExtensionsWithJsonFlat              = slices.Concat(SupportedTSExtensionsFlat, []string{ExtensionJson})
	ExtensionsNotSupportingExtensionlessResolution = []string{ExtensionMts, ExtensionDmts, ExtensionMjs, ExtensionCts, ExtensionDcts, ExtensionCjs}
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

func HasTSFileExtension(path string) bool {
	return FileExtensionIsOneOf(path, SupportedTSExtensionsFlat)
}

func HasImplementationTSFileExtension(path string) bool {
	return FileExtensionIsOneOf(path, supportedTSImplementationExtensions) && !IsDeclarationFileName(path)
}

func HasJSFileExtension(path string) bool {
	return FileExtensionIsOneOf(path, SupportedJSExtensionsFlat)
}

func HasJSONFileExtension(path string) bool {
	return FileExtensionIs(path, ExtensionJson)
}

func IsDeclarationFileName(fileName string) bool {
	return GetDeclarationFileExtension(fileName) != ""
}

func ExtensionIsOneOf(ext string, extensions []string) bool {
	return slices.Contains(extensions, ext)
}

func GetDeclarationFileExtension(fileName string) string {
	base := GetBaseFileName(fileName)
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

func GetDeclarationEmitExtensionForPath(path string) string {
	switch {
	case FileExtensionIsOneOf(path, []string{ExtensionMjs, ExtensionMts}):
		return ExtensionDmts
	case FileExtensionIsOneOf(path, []string{ExtensionCjs, ExtensionCts}):
		return ExtensionDcts
	case FileExtensionIsOneOf(path, []string{ExtensionJson}):
		return `.d.json.ts` // Drive-by redefinition of json declaration file output name so if it's ever enabled, it behaves well
	default:
		return ExtensionDts
	}
}

// changeAnyExtension changes the extension of a path to the provided extension if it has one of the provided extensions.
//
// changeAnyExtension("/path/to/file.ext", ".js", ".ext") === "/path/to/file.js"
// changeAnyExtension("/path/to/file.ext", ".js", ".ts") === "/path/to/file.ext"
// changeAnyExtension("/path/to/file.ext", ".js", [".ext", ".ts"]) === "/path/to/file.js"
func changeAnyExtension(path string, ext string, extensions []string, ignoreCase bool) string {
	pathext := GetAnyExtensionFromPath(path, extensions, ignoreCase)
	if pathext != "" {
		result := path[:len(path)-len(pathext)]
		if strings.HasPrefix(ext, ".") {
			return result + ext
		} else {
			return result + "." + ext
		}
	}
	return path
}

func ChangeExtension(path string, newExtension string) string {
	return changeAnyExtension(path, newExtension, extensionsToRemove /*ignoreCase*/, false)
}
