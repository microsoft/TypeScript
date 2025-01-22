package tsoptions

import (
	"fmt"
	"regexp"
	"sort"
	"strings"
	"sync"

	"github.com/dlclark/regexp2"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type FileSystemEntries struct {
	files       []string
	directories []string
}

func getAccessibleFileSystemEntries(path string, host vfs.FS) FileSystemEntries {
	entries := host.GetEntries(path)
	var files []string
	var directories []string
	for _, dirent := range entries {
		entry := dirent.Name()

		// This is necessary because on some file system node fails to exclude
		// "." and "..". See https://github.com/nodejs/node/issues/4002
		if entry == "." || entry == ".." {
			continue
		}

		// !!! symlinks
		if dirent.IsDir() {
			directories = append(directories, entry)
		} else {
			files = append(files, entry)
		}
	}
	return FileSystemEntries{files: files, directories: directories}
}

type FileMatcherPatterns struct {
	// One pattern for each "include" spec.
	includeFilePatterns []string
	// One pattern matching one of any of the "include" specs.
	includeFilePattern      string
	includeDirectoryPattern string
	excludePattern          string
	basePaths               []string
}

type usage string

const (
	usageFiles       usage = "files"
	usageDirectories usage = "directories"
	usageExclude     usage = "exclude"
)

func getRegularExpressionsForWildcards(specs []string, basePath string, usage usage) []string {
	if len(specs) == 0 {
		return nil
	}
	return core.Map(specs, func(spec string) string {
		return getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage])
	})
}

func getRegularExpressionForWildcard(specs []string, basePath string, usage usage) string {
	patterns := getRegularExpressionsForWildcards(specs, basePath, usage)
	if len(patterns) == 0 {
		return ""
	}

	mappedPatterns := make([]string, len(patterns))
	for i, pattern := range patterns {
		mappedPatterns[i] = fmt.Sprintf("(%s)", pattern)
	}
	pattern := strings.Join(mappedPatterns, "|")

	// If excluding, match "foo/bar/baz...", but if including, only allow "foo".
	var terminator string
	if usage == "exclude" {
		terminator = "($|/)"
	} else {
		terminator = "$"
	}
	return fmt.Sprintf("^(%s)%s", pattern, terminator)
}

func replaceWildcardCharacter(match string, singleAsteriskRegexFragment string) string {
	if match == "*" {
		return singleAsteriskRegexFragment
	} else {
		if match == "?" {
			return "[^/]"
		} else {
			return "\\" + match
		}
	}
}

var isImplicitGlobRegex = regexp2.MustCompile(`[.*?]`, regexp2.None)

// An "includes" path "foo" is implicitly a glob "foo/** /*" (without the space) if its last component has no extension,
// and does not contain any glob characters itself.
func isImplicitGlob(lastPathComponent string) bool {
	match, err := isImplicitGlobRegex.MatchString(lastPathComponent)
	if err != nil {
		return false
	}
	return !match
}

// Reserved characters, forces escaping of any non-word (or digit), non-whitespace character.
// It may be inefficient (we could just match (/[-[\]{}()*+?.,\\^$|#\s]/g), but this is future
// proof.
var (
	reservedCharacterPattern *regexp.Regexp = regexp.MustCompile(`[^\w\s/]`)
	wildcardCharCodes                       = []rune{'*', '?'}
)

var (
	commonPackageFolders            = []string{"node_modules", "bower_components", "jspm_packages"}
	implicitExcludePathRegexPattern = "(?!(" + strings.Join(commonPackageFolders, "|") + ")(/|$))"
)

type WildcardMatcher struct {
	singleAsteriskRegexFragment string
	doubleAsteriskRegexFragment string
	replaceWildcardCharacter    func(match string) string
}

const (
	// Matches any single directory segment unless it is the last segment and a .min.js file
	// Breakdown:
	//
	//	[^./]                   # matches everything up to the first . character (excluding directory separators)
	//	(\\.(?!min\\.js$))?     # matches . characters but not if they are part of the .min.js file extension
	singleAsteriskRegexFragmentFilesMatcher = "([^./]|(\\.(?!min\\.js$))?)*"
	singleAsteriskRegexFragment             = "[^/]*"
)

var filesMatcher = WildcardMatcher{
	singleAsteriskRegexFragment: singleAsteriskRegexFragmentFilesMatcher,
	// Regex for the ** wildcard. Matches any number of subdirectories. When used for including
	// files or directories, does not match subdirectories that start with a . character
	doubleAsteriskRegexFragment: "(/" + implicitExcludePathRegexPattern + "[^/.][^/]*)*?",
	replaceWildcardCharacter: func(match string) string {
		return replaceWildcardCharacter(match, singleAsteriskRegexFragmentFilesMatcher)
	},
}

var directoriesMatcher = WildcardMatcher{
	singleAsteriskRegexFragment: singleAsteriskRegexFragment,
	// Regex for the ** wildcard. Matches any number of subdirectories. When used for including
	// files or directories, does not match subdirectories that start with a . character
	doubleAsteriskRegexFragment: "(/" + implicitExcludePathRegexPattern + "[^/.][^/]*)*?",
	replaceWildcardCharacter: func(match string) string {
		return replaceWildcardCharacter(match, singleAsteriskRegexFragment)
	},
}

var excludeMatcher = WildcardMatcher{
	singleAsteriskRegexFragment: singleAsteriskRegexFragment,
	doubleAsteriskRegexFragment: "(/.+?)?",
	replaceWildcardCharacter: func(match string) string {
		return replaceWildcardCharacter(match, singleAsteriskRegexFragment)
	},
}

var wildcardMatchers = map[usage]WildcardMatcher{
	usageFiles:       filesMatcher,
	usageDirectories: directoriesMatcher,
	usageExclude:     excludeMatcher,
}

func getSubPatternFromSpec(
	spec string,
	basePath string,
	usage usage,
	matcher WildcardMatcher,
) string {
	matcher = wildcardMatchers[usage]

	replaceWildcardCharacter := matcher.replaceWildcardCharacter

	var subpattern strings.Builder
	hasWrittenComponent := false
	components := tspath.GetNormalizedPathComponents(spec, basePath)
	lastComponent := core.LastOrNil(components)
	if usage != "exclude" && lastComponent == "**" {
		return ""
	}

	// getNormalizedPathComponents includes the separator for the root component.
	// We need to remove to create our regex correctly.
	components[0] = tspath.RemoveTrailingDirectorySeparator(components[0])

	if isImplicitGlob(lastComponent) {
		components = append(components, "**", "*")
	}

	optionalCount := 0
	for _, component := range components {
		if component == "**" {
			subpattern.WriteString(matcher.doubleAsteriskRegexFragment)
		} else {
			if usage == "directories" {
				subpattern.WriteString("(")
				optionalCount++
			}

			if hasWrittenComponent {
				subpattern.WriteRune(tspath.DirectorySeparator)
			}

			if usage != "exclude" {
				var componentPattern strings.Builder
				if strings.HasPrefix(component, "*") {
					componentPattern.WriteString("([^./]" + matcher.singleAsteriskRegexFragment + ")?")
					component = component[1:]
				} else if strings.HasPrefix(component, "?") {
					componentPattern.WriteString("[^./]")
					component = component[1:]
				}
				componentPattern.WriteString(reservedCharacterPattern.ReplaceAllStringFunc(component, replaceWildcardCharacter))

				// Patterns should not include subfolders like node_modules unless they are
				// explicitly included as part of the path.
				//
				// As an optimization, if the component pattern is the same as the component,
				// then there definitely were no wildcard characters and we do not need to
				// add the exclusion pattern.
				if componentPattern.String() != component {
					subpattern.WriteString(implicitExcludePathRegexPattern)
				}
				subpattern.WriteString(componentPattern.String())
			} else {
				subpattern.WriteString(reservedCharacterPattern.ReplaceAllStringFunc(component, replaceWildcardCharacter))
			}
		}
		hasWrittenComponent = true
	}

	for optionalCount > 0 {
		subpattern.WriteString(")?")
		optionalCount--
	}

	return subpattern.String()
}

func getIncludeBasePath(absolute string) string {
	wildcardOffset := strings.IndexAny(absolute, string(wildcardCharCodes))
	if wildcardOffset < 0 {
		// No "*" or "?" in the path
		if !tspath.HasExtension(absolute) {
			return absolute
		} else {
			return tspath.RemoveTrailingDirectorySeparator(tspath.GetDirectoryPath(absolute))
		}
	}
	return absolute[:strings.LastIndex(absolute, string(tspath.DirectorySeparator))]
}

// getBasePaths computes the unique non-wildcard base paths amongst the provided include patterns.
func getBasePaths(path string, includes []string, useCaseSensitiveFileNames bool) []string {
	// Storage for our results in the form of literal paths (e.g. the paths as written by the user).
	basePaths := []string{path}

	if len(includes) > 0 {
		// Storage for literal base paths amongst the include patterns.
		includeBasePaths := []string{}
		for _, include := range includes {
			// We also need to check the relative paths by converting them to absolute and normalizing
			// in case they escape the base path (e.g "..\somedirectory")
			var absolute string
			if tspath.IsRootedDiskPath(include) {
				absolute = include
			} else {
				absolute = tspath.NormalizePath(tspath.CombinePaths(path, include))
			}
			// Append the literal and canonical candidate base paths.
			includeBasePaths = []string{getIncludeBasePath(absolute)}
		}

		// Sort the offsets array using either the literal or canonical path representations.
		stringComparer := stringutil.GetStringComparer(!useCaseSensitiveFileNames)
		sort.SliceStable(includeBasePaths, func(i, j int) bool {
			return stringComparer(includeBasePaths[i], includeBasePaths[j]) < 0
		})

		// Iterate over each include base path and include unique base paths that are not a
		// subpath of an existing base path
		for _, includeBasePath := range includeBasePaths {
			if core.Every(basePaths, func(basepath string) bool {
				return !tspath.ContainsPath(basepath, includeBasePath, tspath.ComparePathsOptions{CurrentDirectory: path, UseCaseSensitiveFileNames: !useCaseSensitiveFileNames})
			}) {
				basePaths = append(basePaths, includeBasePath)
			}
		}
	}

	return basePaths
}

// getFileMatcherPatterns generates file matching patterns based on the provided path,
// includes, excludes, and other parameters. path is the directory of the tsconfig.json file.
func getFileMatcherPatterns(path string, excludes []string, includes []string, useCaseSensitiveFileNames bool, currentDirectory string) FileMatcherPatterns {
	path = tspath.NormalizePath(path)
	currentDirectory = tspath.NormalizePath(currentDirectory)
	absolutePath := tspath.CombinePaths(currentDirectory, path)

	return FileMatcherPatterns{
		includeFilePatterns:     core.Map(getRegularExpressionsForWildcards(includes, absolutePath, "files"), func(pattern string) string { return "^" + pattern + "$" }),
		includeFilePattern:      getRegularExpressionForWildcard(includes, absolutePath, "files"),
		includeDirectoryPattern: getRegularExpressionForWildcard(includes, absolutePath, "directories"),
		excludePattern:          getRegularExpressionForWildcard(excludes, absolutePath, "exclude"),
		basePaths:               getBasePaths(path, includes, useCaseSensitiveFileNames),
	}
}

type regexp2CacheKey struct {
	pattern string
	opts    regexp2.RegexOptions
}

var (
	regexp2CacheMu sync.RWMutex
	regexp2Cache   = make(map[regexp2CacheKey]*regexp2.Regexp)
)

func getRegexFromPattern(pattern string, useCaseSensitiveFileNames bool) *regexp2.Regexp {
	flags := regexp2.ECMAScript
	if !useCaseSensitiveFileNames {
		flags |= regexp2.IgnoreCase
	}
	opts := regexp2.RegexOptions(flags)

	key := regexp2CacheKey{pattern, opts}

	regexp2CacheMu.RLock()
	re, ok := regexp2Cache[key]
	regexp2CacheMu.RUnlock()
	if ok {
		return re
	}

	regexp2CacheMu.Lock()
	defer regexp2CacheMu.Unlock()

	re, ok = regexp2Cache[key]
	if ok {
		return re
	}

	// Avoid infinite growth; may cause thrashing but no worse than not caching at all.
	if len(regexp2Cache) > 1000 {
		clear(regexp2Cache)
	}

	// Avoid holding onto the pattern string, since this may pin a full config file in memory.
	pattern = strings.Clone(pattern)
	key.pattern = pattern

	re = regexp2.MustCompile(pattern, opts)
	regexp2Cache[key] = re
	return re
}

type visitor struct {
	includeFileRegexes        []*regexp2.Regexp
	excludeRegex              *regexp2.Regexp
	includeDirectoryRegex     *regexp2.Regexp
	extensions                []string
	useCaseSensitiveFileNames bool
	host                      vfs.FS
	getFileSystemEntries      func(path string, host vfs.FS) FileSystemEntries
	visited                   core.Set[string]
	results                   [][]string
}

func (v *visitor) visitDirectory(
	path string,
	absolutePath string,
	depth *int,
) {
	canonicalPath := tspath.GetCanonicalFileName(absolutePath, v.useCaseSensitiveFileNames)
	if v.visited.Has(canonicalPath) {
		return
	}
	v.visited.Add(canonicalPath)
	systemEntries := v.getFileSystemEntries(absolutePath, v.host)
	files := systemEntries.files
	directories := systemEntries.directories

	for _, current := range files {
		name := tspath.CombinePaths(path, current)
		absoluteName := tspath.CombinePaths(absolutePath, current)
		if len(v.extensions) > 0 && !tspath.FileExtensionIsOneOf(name, v.extensions) {
			continue
		}
		if v.excludeRegex != nil && core.Must(v.excludeRegex.MatchString(absoluteName)) {
			continue
		}
		if v.includeFileRegexes == nil {
			(v.results)[0] = append((v.results)[0], name)
		} else {
			includeIndex := core.FindIndex(v.includeFileRegexes, func(re *regexp2.Regexp) bool { return core.Must(re.MatchString(absoluteName)) })
			if includeIndex != -1 {
				(v.results)[includeIndex] = append((v.results)[includeIndex], name)
			}
		}
	}

	if depth != nil {
		newDepth := *depth - 1
		if newDepth == 0 {
			return
		}
		depth = &newDepth
	}

	for _, current := range directories {
		name := tspath.CombinePaths(path, current)
		absoluteName := tspath.CombinePaths(absolutePath, current)
		if (v.includeDirectoryRegex == nil || core.Must(v.includeDirectoryRegex.MatchString(absoluteName))) && (v.excludeRegex == nil || !core.Must(v.excludeRegex.MatchString(absoluteName))) {
			v.visitDirectory(name, absoluteName, depth)
		}
	}
}

// path is the directory of the tsconfig.json
func matchFiles(path string, extensions []string, excludes []string, includes []string, useCaseSensitiveFileNames bool, currentDirectory string, depth *int, host vfs.FS, getFileSystemEntries func(path string, host vfs.FS) FileSystemEntries, realpath func(path string) string) []string {
	path = tspath.NormalizePath(path)
	currentDirectory = tspath.NormalizePath(currentDirectory)

	patterns := getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory)
	var includeFileRegexes []*regexp2.Regexp
	if patterns.includeFilePatterns != nil {
		includeFileRegexes = core.Map(patterns.includeFilePatterns, func(pattern string) *regexp2.Regexp { return getRegexFromPattern(pattern, useCaseSensitiveFileNames) })
	}
	var includeDirectoryRegex *regexp2.Regexp
	if patterns.includeDirectoryPattern != "" {
		includeDirectoryRegex = getRegexFromPattern(patterns.includeDirectoryPattern, useCaseSensitiveFileNames)
	}
	var excludeRegex *regexp2.Regexp
	if patterns.excludePattern != "" {
		excludeRegex = getRegexFromPattern(patterns.excludePattern, useCaseSensitiveFileNames)
	}

	// Associate an array of results with each include regex. This keeps results in order of the "include" order.
	// If there are no "includes", then just put everything in results[0].
	var results [][]string
	if len(includeFileRegexes) > 0 {
		tempResults := make([][]string, len(includeFileRegexes))
		for i := range includeFileRegexes {
			tempResults[i] = []string{}
		}
		results = tempResults
	} else {
		results = [][]string{{}}
	}
	v := visitor{
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
		host:                      host,
		getFileSystemEntries:      getFileSystemEntries,
		includeFileRegexes:        includeFileRegexes,
		excludeRegex:              excludeRegex,
		includeDirectoryRegex:     includeDirectoryRegex,
		extensions:                extensions,
		results:                   results,
	}
	for _, basePath := range patterns.basePaths {
		v.visitDirectory(basePath, tspath.CombinePaths(currentDirectory, basePath), depth)
	}

	return core.Flatten(results)
}

func readDirectory(host vfs.FS, currentDir string, path string, extensions []string, excludes []string, includes []string, depth *int) []string {
	return matchFiles(path, extensions, excludes, includes, host.UseCaseSensitiveFileNames(), currentDir, depth, host, getAccessibleFileSystemEntries, host.Realpath)
}
