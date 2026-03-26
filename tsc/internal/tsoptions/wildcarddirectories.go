package tsoptions

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/vfsmatch"
)

func getWildcardDirectories(include []string, exclude []string, comparePathsOptions tspath.ComparePathsOptions) map[string]bool {
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

	excludeMatcher := vfsmatch.NewSpecMatcher(exclude, comparePathsOptions.CurrentDirectory, vfsmatch.UsageExclude, comparePathsOptions.UseCaseSensitiveFileNames)

	wildcardDirectories := make(map[string]bool)
	wildCardKeyToPath := make(map[string]string)

	var recursiveKeys []string

	for _, file := range include {
		spec := tspath.NormalizeSlashes(tspath.CombinePaths(comparePathsOptions.CurrentDirectory, file))
		if excludeMatcher != nil && excludeMatcher.MatchString(spec) {
			continue
		}

		match := getWildcardDirectoryFromSpec(spec, comparePathsOptions.UseCaseSensitiveFileNames)
		if match != nil {
			key := match.Key
			path := match.Path
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
				key := toCanonicalKey(path, comparePathsOptions.UseCaseSensitiveFileNames)
				if key != recursiveKey && tspath.ContainsPath(recursiveKey, key, comparePathsOptions) {
					delete(wildcardDirectories, path)
				}
			}
		}
	}

	return wildcardDirectories
}

func toCanonicalKey(path string, useCaseSensitiveFileNames bool) string {
	if useCaseSensitiveFileNames {
		return path
	}
	return strings.ToLower(path)
}

// wildcardDirectoryMatch represents the result of a wildcard directory match
type wildcardDirectoryMatch struct {
	Key       string
	Path      string
	Recursive bool
}

func getWildcardDirectoryFromSpec(spec string, useCaseSensitiveFileNames bool) *wildcardDirectoryMatch {
	// Find the first occurrence of a wildcard character
	firstWildcard := strings.IndexAny(spec, "*?")
	if firstWildcard != -1 {
		// Find the last directory separator before the wildcard
		lastSepBeforeWildcard := strings.LastIndexByte(spec[:firstWildcard], tspath.DirectorySeparator)
		if lastSepBeforeWildcard != -1 {
			path := spec[:lastSepBeforeWildcard]
			lastDirectorySeparatorIndex := strings.LastIndexByte(spec, tspath.DirectorySeparator)

			// Determine if this should be watched recursively:
			// recursive if the wildcard appears in a directory segment (not just the final file segment)
			recursive := firstWildcard < lastDirectorySeparatorIndex

			return &wildcardDirectoryMatch{
				Key:       toCanonicalKey(path, useCaseSensitiveFileNames),
				Path:      path,
				Recursive: recursive,
			}
		}
	}

	if lastSepIndex := strings.LastIndexByte(spec, tspath.DirectorySeparator); lastSepIndex != -1 {
		lastSegment := spec[lastSepIndex+1:]
		if vfsmatch.IsImplicitGlob(lastSegment) {
			path := tspath.RemoveTrailingDirectorySeparator(spec)
			return &wildcardDirectoryMatch{
				Key:       toCanonicalKey(path, useCaseSensitiveFileNames),
				Path:      path,
				Recursive: true,
			}
		}
	}

	return nil
}
