package contentmapper

import (
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfsmatch"
)

// FileMatcher is the static, host-independent file association data for a project.
type FileMatcher struct {
	mappers         []*Mapper
	includes        []*vfsmatch.SpecMatcher
	caseSensitivity tspath.CaseSensitivity
}

func NewFileMatcher(mappers []*Mapper, baseDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) *FileMatcher {
	matcher := &FileMatcher{mappers: mappers, caseSensitivity: caseSensitivity}
	for _, mapper := range mappers {
		matcher.includes = append(matcher.includes, vfsmatch.NewSpecMatcher(mapper.Include, baseDirectory, vfsmatch.UsageContentMapperInclude, caseSensitivity))
	}
	return matcher
}

func (m *FileMatcher) GetMapperForFileName(fileName tspath.RootedFilePath) *Mapper {
	mapper, _ := m.match(fileName)
	return mapper
}

func (m *FileMatcher) ExtensionForFileName(fileName tspath.RootedFilePath) string {
	_, extension := m.match(fileName)
	return extension
}

func (m *FileMatcher) match(fileName tspath.RootedFilePath) (*Mapper, string) {
	if m == nil {
		return nil, ""
	}
	var fallback *Mapper
	longestExtension := ""
	for i, mapper := range m.mappers {
		extension := fileName.LongestExtension(mapper.Extensions, m.caseSensitivity)
		if extension == "" {
			continue
		}
		if mapper.Include != nil {
			matcher := m.includes[i]
			if matcher == nil {
				// An empty include matches nothing.
				continue
			}
			if !matcher.MatchFileName(fileName) {
				continue
			}
			return mapper, extension
		}
		if len(extension) > len(longestExtension) {
			fallback = mapper
			longestExtension = extension
		}
	}
	return fallback, longestExtension
}

// IsUnclaimed reports whether a registered extension matches but no mapper claims the file.
func (m *FileMatcher) IsUnclaimed(fileName tspath.RootedFilePath) bool {
	if m != nil {
		for _, mapper := range m.mappers {
			if fileName.LongestExtension(mapper.Extensions, m.caseSensitivity) != "" {
				return m.GetMapperForFileName(fileName) == nil
			}
		}
	}
	return false
}

func RewritesForImport(rewrites []tspath.ExtensionRewrite, importingFile tspath.RootedFilePath, specifier tspath.ModuleSpecifier, extensionForFileName func(tspath.RootedFilePath) string, caseSensitivity tspath.CaseSensitivity) []tspath.ExtensionRewrite {
	if importingFile != "" && extensionForFileName != nil && specifier.IsRelative() {
		path := importingFile.Directory().ResolveFile(specifier.AsString())
		return FilterExtensionRewrites(rewrites, extensionForFileName(path), caseSensitivity)
	}
	return rewrites
}

// FilterExtensionRewrites selects the rewrite for the winning mapper's extension, rather than a
// longer extension registered by a mapper that does not claim this file.
func FilterExtensionRewrites(rewrites []tspath.ExtensionRewrite, extension string, caseSensitivity tspath.CaseSensitivity) []tspath.ExtensionRewrite {
	if extension != "" {
		for i, rewrite := range rewrites {
			if caseSensitivity.Canonicalize(rewrite.Source) == caseSensitivity.Canonicalize(extension) {
				return rewrites[i : i+1]
			}
		}
	}
	return nil
}
