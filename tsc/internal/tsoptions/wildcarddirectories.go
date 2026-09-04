package tsoptions

import (
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfsmatch"
)

func getWildcardDirectories[T ~string](include []T, exclude []T, currentDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) map[tspath.RootedDirectoryPath]bool {
	// We watch a directory recursively if it contains a wildcard anywhere in a directory segment
	// of the pattern:
	//
	//  /a/b/**/d   - Watch /a/b recursively to catch changes to any d in any subfolder recursively
	//  /a/b/*/d    - Watch /a/b recursively to catch any d in any immediate subfolder, even if a new subfolder is added
	//  /a/b        - Watch /a/b recursively to catch changes to anything in any recursive subfoler
	//
	// We watch a directory without recursion if it contains a wildcard in the file segment of
	// the pattern:
	//
	//  /a/b/*      - Watch /a/b directly to catch any new file
	//  /a/b/a?z    - Watch /a/b directly to catch any new file matching a?z

	if len(include) == 0 {
		return nil
	}

	excludeMatcher := vfsmatch.NewSpecMatcher(exclude, currentDirectory, vfsmatch.UsageExclude, caseSensitivity)

	wildcardDirectories := make(map[tspath.RootedDirectoryPath]bool)
	wildCardKeyToPath := make(map[tspath.PathKey]tspath.RootedDirectoryPath)

	var recursiveKeys []tspath.PathKey

	for _, file := range include {
		spec := tspath.NormalizePath(tspath.CombinePaths(currentDirectory.AsString(), string(file)))
		if excludeMatcher != nil && excludeMatcher.MatchString(spec) {
			continue
		}

		match := getWildcardDirectoryFromSpec(spec)
		if match != nil {
			path := match.Path
			if path == "" {
				path = tspath.RootedDirectoryPathFromNormalized(spec[:tspath.GetRootLength(spec)])
			}
			key := caseSensitivity.PathKey(path.AsPath())
			recursive := match.Recursive

			existingPath, existsPath := wildCardKeyToPath[key]
			var existingRecursive bool

			if existsPath {
				existingRecursive = wildcardDirectories[existingPath]
			}

			if !existsPath || (!existingRecursive && recursive) {
				pathToUse := path
				if existsPath {
					pathToUse = existingPath
				}
				wildcardDirectories[pathToUse] = recursive

				if !existsPath {
					wildCardKeyToPath[key] = path
				}

				if recursive {
					recursiveKeys = append(recursiveKeys, key)
				}
			}
		}

		// Remove any subpaths under an existing recursively watched directory
		for path := range wildcardDirectories {
			for _, recursiveKey := range recursiveKeys {
				key := caseSensitivity.PathKey(path.AsPath())
				if key != recursiveKey && recursiveKey.ContainsPath(key) {
					delete(wildcardDirectories, path)
				}
			}
		}
	}

	return wildcardDirectories
}

// wildcardDirectoryMatch represents the result of a wildcard directory match
type wildcardDirectoryMatch struct {
	Path      tspath.RootedDirectoryPath
	Recursive bool
}

func getWildcardDirectoryFromSpec(spec string) *wildcardDirectoryMatch {
	// Find the first occurrence of a wildcard character
	firstWildcard := strings.IndexAny(spec, "*?")
	if firstWildcard != -1 {
		// Find the last directory separator before the wildcard
		lastSepBeforeWildcard := strings.LastIndexByte(spec[:firstWildcard], tspath.DirectorySeparator)
		if lastSepBeforeWildcard != -1 {
			var path tspath.RootedDirectoryPath
			if pathText := spec[:lastSepBeforeWildcard]; pathText != "" {
				path = tspath.RootedDirectoryPathFromAbsolute(pathText)
			}
			lastDirectorySeparatorIndex := strings.LastIndexByte(spec, tspath.DirectorySeparator)

			// Determine if this should be watched recursively:
			// recursive if the wildcard appears in a directory segment (not just the final file segment)
			recursive := firstWildcard < lastDirectorySeparatorIndex

			return &wildcardDirectoryMatch{
				Path:      path,
				Recursive: recursive,
			}
		}
	}

	if lastSepIndex := strings.LastIndexByte(spec, tspath.DirectorySeparator); lastSepIndex != -1 {
		lastSegment := spec[lastSepIndex+1:]
		if vfsmatch.IsImplicitGlob(lastSegment) {
			path := tspath.RootedDirectoryPathFromAbsolute(tspath.RemoveTrailingDirectorySeparator(spec))
			return &wildcardDirectoryMatch{
				Path:      path,
				Recursive: true,
			}
		}
	}

	return nil
}
