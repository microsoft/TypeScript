package vfsmatch

import (
	"math"
	"slices"
	"strings"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

//go:generate go tool golang.org/x/tools/cmd/stringer -type=Usage -trimprefix=Usage -output=stringer_generated.go
//go:generate npx dprint fmt stringer_generated.go

// This file implements the glob matching algorithm specified in MATCHING_ALGORITHM.md.

type Usage int8

const (
	UsageFiles Usage = iota
	UsageDirectories
	UsageExclude
)

// UnlimitedDepth can be passed as the depth argument to indicate there is no depth limit.
const UnlimitedDepth = math.MaxInt

func ReadDirectory(host vfs.FS, currentDir string, path string, extensions []string, excludes []string, includes []string, depth int) []string {
	return matchFiles(path, extensions, excludes, includes, host.UseCaseSensitiveFileNames(), currentDir, depth, host)
}

// IsImplicitGlob checks if a path component is implicitly a glob.
// An "includes" path "foo" is implicitly a glob "foo/** /*" (without the space) if its last component has no extension,
// and does not contain any glob characters itself.
func IsImplicitGlob(lastPathComponent string) bool {
	return !strings.ContainsAny(lastPathComponent, ".*?")
}

var wildcardCharCodes = []rune{'*', '?'}

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
	return absolute[:max(strings.LastIndex(absolute[:wildcardOffset], string(tspath.DirectorySeparator)), 0)]
}

// getBasePaths computes the unique non-wildcard base paths amongst the provided include patterns.
func getBasePaths(path string, includes []string, useCaseSensitiveFileNames bool) []string {
	// Storage for our results in the form of literal paths (e.g. the paths as written by the user).
	basePaths := []string{path}

	if len(includes) > 0 {
		comparePathsOptions := tspath.ComparePathsOptions{CurrentDirectory: path, UseCaseSensitiveFileNames: useCaseSensitiveFileNames}
		stringComparer := comparePathsOptions.GetComparer()

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
			includeBasePaths = append(includeBasePaths, getIncludeBasePath(absolute))
		}

		// Sort the offsets array using either the literal or canonical path representations.
		slices.SortStableFunc(includeBasePaths, stringComparer)

		// Iterate over each include base path and include unique base paths that are not a
		// subpath of an existing base path
		for _, includeBasePath := range includeBasePaths {
			if core.Every(basePaths, func(basepath string) bool {
				return !tspath.ContainsPath(basepath, includeBasePath, comparePathsOptions)
			}) {
				basePaths = append(basePaths, includeBasePath)
			}
		}
	}

	return basePaths
}

// globPattern is a compiled glob pattern for matching file paths without regex.
type globPattern struct {
	components    []component // path segments to match (e.g., ["src", "**", "*.ts"])
	isExclude     bool        // exclude patterns have different matching rules
	caseSensitive bool
	excludeMinJs  bool // for "files" patterns, exclude .min.js by default
}

// component is a single path segment in a glob pattern.
// Examples: "src" (literal), "*" (wildcard), "*.ts" (wildcard), "**" (recursive)
type component struct {
	kind     componentKind
	literal  string    // for kindLiteral: the exact string to match
	segments []segment // for kindWildcard: parsed wildcard pattern
	// Include patterns with wildcards skip common package folders (node_modules, etc.)
	skipPackageFolders bool
}

type componentKind int

const (
	kindLiteral        componentKind = iota // exact match (e.g., "src")
	kindWildcard                            // contains * or ? (e.g., "*.ts")
	kindDoubleAsterisk                      // ** matches zero or more directories
)

// segment is a piece of a wildcard component.
// Example: "*.ts" becomes [segStar, segLiteral(".ts")]
type segment struct {
	kind    segmentKind
	literal string // only for segLiteral
}

type segmentKind int

const (
	segLiteral  segmentKind = iota // exact text
	segStar                        // * matches any chars except /
	segQuestion                    // ? matches single char except /
)

// compileGlobPattern compiles a glob spec (e.g., "src/**/*.ts") into a pattern.
// Returns (pattern, false) if the pattern would match nothing.
func compileGlobPattern(spec string, basePath string, usage Usage, caseSensitive bool) (globPattern, bool) {
	parts := tspath.GetNormalizedPathComponents(spec, basePath)

	// "src/**" without a filename matches nothing (for include patterns)
	if usage != UsageExclude && core.LastOrNil(parts) == "**" {
		return globPattern{}, false
	}

	// Normalize root: "/home/" -> "/home"
	parts[0] = tspath.RemoveTrailingDirectorySeparator(parts[0])

	// Directories implicitly match all files: "src" -> "src/**/*"
	if IsImplicitGlob(core.LastOrNil(parts)) {
		parts = append(parts, "**", "*")
	}

	p := globPattern{
		isExclude:     usage == UsageExclude,
		caseSensitive: caseSensitive,
		excludeMinJs:  usage == UsageFiles,
		// Avoid slice growth during compilation.
		components: make([]component, 0, len(parts)),
	}

	for _, part := range parts {
		p.components = append(p.components, parseComponent(part, usage != UsageExclude))
	}
	return p, true
}

// parseComponent converts a path segment string into a component.
func parseComponent(s string, isInclude bool) component {
	if s == "**" {
		return component{kind: kindDoubleAsterisk}
	}
	if !strings.ContainsAny(s, "*?") {
		return component{kind: kindLiteral, literal: s}
	}
	return component{
		kind:               kindWildcard,
		segments:           parseSegments(s),
		skipPackageFolders: isInclude,
	}
}

// parseSegments breaks "*.ts" into [segStar, segLiteral(".ts")]
func parseSegments(s string) []segment {
	// Preallocate based on wildcard count: each wildcard contributes 1 segment,
	// and each wildcard can split literals into at most one extra literal segment.
	wildcards := 0
	for i := range len(s) {
		if s[i] == '*' || s[i] == '?' {
			wildcards++
		}
	}
	result := make([]segment, 0, 2*wildcards+1)
	start := 0
	for i := range len(s) {
		switch s[i] {
		case '*', '?':
			if i > start {
				result = append(result, segment{kind: segLiteral, literal: s[start:i]})
			}
			if s[i] == '*' {
				result = append(result, segment{kind: segStar})
			} else {
				result = append(result, segment{kind: segQuestion})
			}
			start = i + 1
		}
	}
	if start < len(s) {
		result = append(result, segment{kind: segLiteral, literal: s[start:]})
	}
	return result
}

// matches returns true if path matches this pattern.
func (p *globPattern) matches(path string) bool {
	return p.matchPathParts(path, "", 0, 0, false)
}

// matchesParts returns true if prefix+suffix matches this pattern.
// This avoids allocating a combined string for common call sites where prefix ends with '/'.
func (p *globPattern) matchesParts(prefix, suffix string) bool {
	return p.matchPathParts(prefix, suffix, 0, 0, false)
}

// matchesPrefixParts returns true if files under prefix+suffix could match.
func (p *globPattern) matchesPrefixParts(prefix, suffix string) bool {
	return p.matchPathParts(prefix, suffix, 0, 0, true)
}

// matchPathParts is like matchPath, but operates on a virtual path formed by prefix+suffix.
// Offsets are in the combined string.
func (p *globPattern) matchPathParts(prefix, suffix string, pathOffset, compIdx int, prefixOnly bool) bool {
	for {
		pathPart, nextOffset, ok := nextPathPartParts(prefix, suffix, pathOffset)
		if !ok {
			if prefixOnly {
				return true
			}
			return p.patternSatisfied(compIdx)
		}

		if compIdx >= len(p.components) {
			return p.isExclude && !prefixOnly
		}

		comp := p.components[compIdx]
		switch comp.kind {
		case kindDoubleAsterisk:
			if p.matchPathParts(prefix, suffix, pathOffset, compIdx+1, prefixOnly) {
				return true
			}
			if !p.isExclude && (isHiddenPath(pathPart) || isPackageFolder(pathPart)) {
				return false
			}
			pathOffset = nextOffset
			continue
		case kindLiteral:
			if comp.skipPackageFolders && isPackageFolder(pathPart) {
				panic("unreachable: literal components never have skipPackageFolders")
			}
			if !p.stringsEqual(comp.literal, pathPart) {
				return false
			}
		case kindWildcard:
			if comp.skipPackageFolders && isPackageFolder(pathPart) {
				return false
			}
			if !p.matchWildcard(comp.segments, pathPart) {
				return false
			}
		}

		pathOffset = nextOffset
		compIdx++
	}
}

// patternSatisfied checks if remaining pattern components can match empty input.
func (p *globPattern) patternSatisfied(compIdx int) bool {
	// A pattern is satisfied when remaining components can match empty input.
	// For both include and exclude patterns, only trailing "**" components may match nothing.
	for _, c := range p.components[compIdx:] {
		if c.kind != kindDoubleAsterisk {
			return false
		}
	}
	return true
}

// nextPathPart extracts the next path component from path starting at offset.
func nextPathPartSingle(s string, offset int) (part string, nextOffset int, ok bool) {
	if offset >= len(s) {
		return "", offset, false
	}
	if offset == 0 && len(s) > 0 && s[0] == '/' {
		return "", 1, true
	}
	for offset < len(s) && s[offset] == '/' {
		offset++
	}
	if offset >= len(s) {
		return "", offset, false
	}
	rest := s[offset:]
	if idx := strings.IndexByte(rest, '/'); idx >= 0 {
		return rest[:idx], offset + idx, true
	}
	return rest, len(s), true
}

func nextPathPartParts(prefix, suffix string, offset int) (part string, nextOffset int, ok bool) {
	// Fast paths: keep the hot single-string scan tight.
	if len(suffix) == 0 {
		return nextPathPartSingle(prefix, offset)
	}
	if len(prefix) == 0 {
		return nextPathPartSingle(suffix, offset)
	}

	// For matchFilesNoRegex call sites, prefix is a directory path ending in '/',
	// and suffix is a single entry name (no '/'). That makes this significantly
	// simpler than a general-purpose "virtual concatenation" scanner.

	totalLen := len(prefix) + len(suffix)
	if offset >= totalLen {
		return "", offset, false
	}

	// Handle leading slash (root of absolute path)
	if offset == 0 && prefix[0] == '/' {
		return "", 1, true
	}

	// Scan within prefix.
	if offset < len(prefix) {
		for offset < len(prefix) && prefix[offset] == '/' {
			offset++
		}
		if offset < len(prefix) {
			rest := prefix[offset:]
			idx := strings.IndexByte(rest, '/')
			// idx is guaranteed >= 0 for the call sites we care about because prefix ends in '/'.
			return rest[:idx], offset + idx, true
		}
		// Fall through into suffix region.
	}

	// Scan suffix: it's a single component.
	sOff := offset - len(prefix)
	if sOff >= len(suffix) {
		return "", offset, false
	}
	return suffix[sOff:], totalLen, true
}

// matchWildcard matches a path component against wildcard segments.
func (p *globPattern) matchWildcard(segs []segment, s string) bool {
	// Include patterns: wildcards at start cannot match hidden files
	if !p.isExclude && len(segs) > 0 && isHiddenPath(s) && (segs[0].kind == segStar || segs[0].kind == segQuestion) {
		return false
	}

	// Fast path: single * followed by literal suffix (e.g., "*.ts")
	if len(segs) == 2 && segs[0].kind == segStar && segs[1].kind == segLiteral {
		suffix := segs[1].literal
		if len(s) < len(suffix) || !p.stringsEqual(suffix, s[len(s)-len(suffix):]) {
			return false
		}
		return p.shouldIncludeMinJs(s, segs)
	}

	return p.matchSegments(segs, s) && p.shouldIncludeMinJs(s, segs)
}

// matchSegments matches segments against string s using an iterative algorithm.
// This avoids exponential backtracking by tracking only the last star position.
// The algorithm is O(n*m) where n is the string length and m is pattern length.
func (p *globPattern) matchSegments(segs []segment, s string) bool {
	segIdx, sIdx := 0, 0
	starSegIdx, starSIdx := -1, 0

	for sIdx < len(s) {
		if segIdx < len(segs) {
			seg := segs[segIdx]
			switch seg.kind {
			case segLiteral:
				end := sIdx + len(seg.literal)
				if end <= len(s) && p.stringsEqual(seg.literal, s[sIdx:end]) {
					sIdx = end
					segIdx++
					continue
				}
			case segQuestion:
				if s[sIdx] != '/' {
					_, size := utf8.DecodeRuneInString(s[sIdx:])
					sIdx += size
					segIdx++
					continue
				}
			case segStar:
				// Record star position for backtracking, then try matching zero chars.
				starSegIdx = segIdx
				starSIdx = sIdx
				segIdx++
				continue
			}
		}

		// Current segment didn't match. Backtrack to last star if possible.
		if starSegIdx >= 0 && starSIdx < len(s) && s[starSIdx] != '/' {
			// Star consumes one more character (rune), retry from segment after star.
			_, size := utf8.DecodeRuneInString(s[starSIdx:])
			starSIdx += size
			sIdx = starSIdx
			segIdx = starSegIdx + 1
			continue
		}

		return false
	}

	// Consume any trailing stars.
	for segIdx < len(segs) && segs[segIdx].kind == segStar {
		segIdx++
	}
	return segIdx >= len(segs)
}

func (p *globPattern) shouldIncludeMinJs(filename string, segs []segment) bool {
	if !p.excludeMinJs {
		return true
	}

	// Preserve legacy behavior:
	// - When matching is case-sensitive, only the exact ".min.js" suffix is excluded by default.
	// - When matching is case-insensitive, any casing variant is excluded by default.
	if !p.hasMinJsSuffix(filename) {
		return true
	}
	// Allow when the user's pattern explicitly references the .min. suffix.
	if p.patternMentionsMinSuffix(segs) {
		return true
	}
	return false
}

func (p *globPattern) hasMinJsSuffix(filename string) bool {
	if p.caseSensitive {
		return strings.HasSuffix(filename, ".min.js")
	}
	const minJs = ".min.js"
	if len(filename) < len(minJs) {
		return false
	}
	// Avoid allocating via strings.ToLower; compare suffix case-insensitively.
	return strings.EqualFold(filename[len(filename)-len(minJs):], minJs)
}

func (p *globPattern) patternMentionsMinSuffix(segs []segment) bool {
	for _, seg := range segs {
		if seg.kind != segLiteral {
			continue
		}
		lit := seg.literal
		if !p.caseSensitive {
			lit = strings.ToLower(lit)
		}
		if strings.Contains(lit, ".min.js") || strings.Contains(lit, ".min.") {
			return true
		}
	}
	return false
}

// stringsEqual compares strings with appropriate case sensitivity.
func (p *globPattern) stringsEqual(a, b string) bool {
	if p.caseSensitive {
		return a == b
	}
	return strings.EqualFold(a, b)
}

// isHiddenPath checks if a path component is hidden (starts with dot).
func isHiddenPath(name string) bool {
	return len(name) > 0 && name[0] == '.'
}

// isPackageFolder checks if name is a common package folder (node_modules, etc.)
func isPackageFolder(name string) bool {
	switch len(name) {
	case len("node_modules"):
		return strings.EqualFold(name, "node_modules")
	case len("jspm_packages"):
		return strings.EqualFold(name, "jspm_packages")
	case len("bower_components"):
		return strings.EqualFold(name, "bower_components")
	}
	return false
}

func ensureTrailingSlash(s string) string {
	if len(s) > 0 && s[len(s)-1] != '/' {
		return s + "/"
	}
	return s
}

// globMatcher combines include and exclude patterns for file matching.
type globMatcher struct {
	includes    []globPattern
	excludes    []globPattern
	hadIncludes bool // true if include specs were provided (even if none compiled)
}

func newGlobMatcher(includeSpecs, excludeSpecs []string, basePath string, caseSensitive bool, usage Usage) *globMatcher {
	m := &globMatcher{
		hadIncludes: len(includeSpecs) > 0,
		includes:    make([]globPattern, 0, len(includeSpecs)),
		excludes:    make([]globPattern, 0, len(excludeSpecs)),
	}

	for _, spec := range includeSpecs {
		if p, ok := compileGlobPattern(spec, basePath, usage, caseSensitive); ok {
			m.includes = append(m.includes, p)
		}
	}
	for _, spec := range excludeSpecs {
		if p, ok := compileGlobPattern(spec, basePath, UsageExclude, caseSensitive); ok {
			m.excludes = append(m.excludes, p)
		}
	}
	return m
}

// matchesFileParts checks if prefix+suffix matches against the glob patterns.
// Returns the index of the matching include pattern and true if matched, or (0, false) if not.
func (m *globMatcher) matchesFileParts(prefix, suffix string) (int, bool) {
	for i := range m.excludes {
		if m.excludes[i].matchesParts(prefix, suffix) {
			return 0, false
		}
	}
	if len(m.includes) == 0 {
		if m.hadIncludes {
			return 0, false
		}
		return 0, true
	}
	for i := range m.includes {
		if m.includes[i].matchesParts(prefix, suffix) {
			return i, true
		}
	}
	return 0, false
}

// matchesDirectoryParts checks if files under the directory prefix+suffix could match any pattern.
func (m *globMatcher) matchesDirectoryParts(prefix, suffix string) bool {
	for i := range m.excludes {
		if m.excludes[i].matchesParts(prefix, suffix) {
			return false
		}
	}
	if len(m.includes) == 0 {
		return !m.hadIncludes
	}
	for i := range m.includes {
		if m.includes[i].matchesPrefixParts(prefix, suffix) {
			return true
		}
	}
	return false
}

// globVisitor traverses directories matching files against glob patterns.
type globVisitor struct {
	host                      vfs.FS
	fileMatcher               *globMatcher
	directoryMatcher          *globMatcher
	extensions                []string
	useCaseSensitiveFileNames bool
	visited                   collections.Set[string]
	results                   [][]string
}

func (v *globVisitor) visit(path, absolutePath string, depth int) {
	// Detect symlink cycles
	realPath := v.host.Realpath(absolutePath)
	canonicalPath := tspath.GetCanonicalFileName(realPath, v.useCaseSensitiveFileNames)
	if v.visited.Has(canonicalPath) {
		return
	}
	v.visited.Add(canonicalPath)

	entries := v.host.GetAccessibleEntries(absolutePath)

	pathPrefix := ensureTrailingSlash(path)
	absPrefix := ensureTrailingSlash(absolutePath)

	for _, file := range entries.Files {
		if len(v.extensions) > 0 && !tspath.FileExtensionIsOneOf(file, v.extensions) {
			continue
		}
		if idx, ok := v.fileMatcher.matchesFileParts(absPrefix, file); ok {
			v.results[idx] = append(v.results[idx], pathPrefix+file)
		}
	}

	if depth != UnlimitedDepth {
		depth--
		if depth == 0 {
			return
		}
	}

	for _, dir := range entries.Directories {
		if !v.directoryMatcher.matchesDirectoryParts(absPrefix, dir) {
			continue
		}
		absDir := absPrefix + dir
		v.visit(pathPrefix+dir, absDir, depth)
	}
}

func matchFiles(path string, extensions, excludes, includes []string, useCaseSensitiveFileNames bool, currentDirectory string, depth int, host vfs.FS) []string {
	path = tspath.NormalizePath(path)
	currentDirectory = tspath.NormalizePath(currentDirectory)
	absolutePath := tspath.CombinePaths(currentDirectory, path)

	fileMatcher := newGlobMatcher(includes, excludes, absolutePath, useCaseSensitiveFileNames, UsageFiles)
	directoryMatcher := newGlobMatcher(includes, excludes, absolutePath, useCaseSensitiveFileNames, UsageDirectories)

	v := globVisitor{
		host:                      host,
		fileMatcher:               fileMatcher,
		directoryMatcher:          directoryMatcher,
		extensions:                extensions,
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
		results:                   make([][]string, max(len(fileMatcher.includes), 1)),
	}

	for _, basePath := range getBasePaths(path, includes, useCaseSensitiveFileNames) {
		v.visit(basePath, tspath.CombinePaths(currentDirectory, basePath), depth)
	}

	// Fast path: a single include bucket (or no includes) doesn't need flattening.
	if len(v.results) == 1 {
		return v.results[0]
	}
	return core.Flatten(v.results)
}

// SpecMatcher wraps multiple glob patterns for matching paths.
type SpecMatcher struct {
	patterns []globPattern
}

// MatchString returns true if any pattern matches the path.
func (m *SpecMatcher) MatchString(path string) bool {
	for i := range m.patterns {
		if m.patterns[i].matches(path) {
			return true
		}
	}
	return false
}

// MatchIndex returns the index of the first matching pattern, or -1.
func (m *SpecMatcher) MatchIndex(path string) int {
	for i := range m.patterns {
		if m.patterns[i].matches(path) {
			return i
		}
	}
	return -1
}

// NewSpecMatcher creates a matcher for one or more glob specs.
// It returns a matcher that can test if paths match any of the patterns.
func NewSpecMatcher(specs []string, basePath string, usage Usage, useCaseSensitiveFileNames bool) *SpecMatcher {
	if len(specs) == 0 {
		return nil
	}
	patterns := make([]globPattern, 0, len(specs))
	for _, spec := range specs {
		if p, ok := compileGlobPattern(spec, basePath, usage, useCaseSensitiveFileNames); ok {
			patterns = append(patterns, p)
		}
	}
	if len(patterns) == 0 {
		return nil
	}
	return &SpecMatcher{patterns: patterns}
}
