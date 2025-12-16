package tsoptions

import (
	"strings"

	"github.com/dlclark/regexp2"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
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

	rawExcludeRegex := vfs.GetRegularExpressionForWildcard(exclude, comparePathsOptions.CurrentDirectory, "exclude")
	var excludeRegex *regexp2.Regexp
	if rawExcludeRegex != "" {
		flags := regexp2.ECMAScript
		if !comparePathsOptions.UseCaseSensitiveFileNames {
			flags |= regexp2.IgnoreCase
		}
		excludeRegex = regexp2.MustCompile(rawExcludeRegex, regexp2.RegexOptions(flags))
	}

	wildcardDirectories := make(map[string]bool)
	wildCardKeyToPath := make(map[string]string)

	var recursiveKeys []string

	for _, file := range include {
		spec := tspath.NormalizeSlashes(tspath.CombinePaths(comparePathsOptions.CurrentDirectory, file))
		if excludeRegex != nil {
			if matched, _ := excludeRegex.MatchString(spec); matched {
				continue
			}
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

// wildcardDirectoryPattern matches paths with wildcard characters
var wildcardDirectoryPattern = regexp2.MustCompile(`^[^*?]*(?=\/[^/]*[*?])`, 0)

// wildcardDirectoryMatch represents the result of a wildcard directory match
type wildcardDirectoryMatch struct {
	Key       string
	Path      string
	Recursive bool
}

func getWildcardDirectoryFromSpec(spec string, useCaseSensitiveFileNames bool) *wildcardDirectoryMatch {
	match, _ := wildcardDirectoryPattern.FindStringMatch(spec)
	if match != nil {
		// We check this with a few `Index` calls because it's more efficient than complex regex
		questionWildcardIndex := strings.Index(spec, "?")
		starWildcardIndex := strings.Index(spec, "*")
		lastDirectorySeparatorIndex := strings.LastIndexByte(spec, tspath.DirectorySeparator)

		// Determine if this should be watched recursively
		recursive := (questionWildcardIndex != -1 && questionWildcardIndex < lastDirectorySeparatorIndex) ||
			(starWildcardIndex != -1 && starWildcardIndex < lastDirectorySeparatorIndex)

		return &wildcardDirectoryMatch{
			Key:       toCanonicalKey(match.String(), useCaseSensitiveFileNames),
			Path:      match.String(),
			Recursive: recursive,
		}
	}

	if lastSepIndex := strings.LastIndexByte(spec, tspath.DirectorySeparator); lastSepIndex != -1 {
		lastSegment := spec[lastSepIndex+1:]
		if vfs.IsImplicitGlob(lastSegment) {
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
