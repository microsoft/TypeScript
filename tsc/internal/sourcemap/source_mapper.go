package sourcemap

import (
	"encoding/base64"
	"slices"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type Host interface {
	CaseSensitivity() tspath.CaseSensitivity
	GetECMALineInfo(fileName tspath.RootedFilePath) *ECMALineInfo
	ReadFile(fileName tspath.RootedFilePath) (string, bool)
}

// Similar to `Mapping`, but position-based.
type MappedPosition struct {
	generatedPosition int
	sourcePosition    int
	sourceIndex       SourceIndex
	nameIndex         NameIndex
}

const (
	missingPosition = -1
)

func (m *MappedPosition) isSourceMappedPosition() bool {
	return m.sourceIndex != MissingSource && m.sourcePosition != missingPosition
}

type SourceMappedPosition = MappedPosition

// Maps source positions to generated positions and vice versa.
type DocumentPositionMapper struct {
	caseSensitivity           tspath.CaseSensitivity
	sourceFileAbsolutePaths   []tspath.RootedFilePath
	sourceMappingsByPath      map[tspath.PathKey][]*SourceMappedPosition
	generatedAbsoluteFilePath tspath.RootedFilePath

	generatedMappings []*MappedPosition
	sourceMappings    map[SourceIndex][]*SourceMappedPosition
}

func createDocumentPositionMapper(host Host, sourceMap *RawSourceMap, sourceRootField *string, nullSources []bool, mapPath tspath.RootedFilePath) *DocumentPositionMapper {
	mapDirectory := mapPath.Directory()
	sourceURLPrefix := ""
	if sourceRootField != nil {
		sourceURLPrefix = *sourceRootField
		if !strings.HasSuffix(sourceURLPrefix, "/") {
			sourceURLPrefix += "/"
		}
	}
	generatedAbsoluteFilePath, ok := tryResolveSourceMapPath(sourceMap.File, mapDirectory)
	if !ok {
		return nil
	}
	unmappedSources := make([]bool, len(sourceMap.Sources))
	copy(unmappedSources, nullSources)
	sourceFileAbsolutePaths := make([]tspath.RootedFilePath, len(sourceMap.Sources))
	for i, source := range sourceMap.Sources {
		if unmappedSources[i] {
			continue
		}
		sourceWithPrefix := sourceURLPrefix + source
		var resolved tspath.RootedFilePath
		if sourceWithPrefix == "" {
			resolved = mapPath
		} else {
			resolved, ok = tryResolveSourceMapPath(sourceWithPrefix, mapDirectory)
			if !ok {
				unmappedSources[i] = true
				continue
			}
		}
		if sourceRootField != nil && *sourceRootField == "" && source != "" {
			legacy, legacyOK := tryResolveSourceMapPath(source, mapDirectory)
			if legacyOK &&
				resolved != legacy &&
				host.GetECMALineInfo(resolved) == nil &&
				host.GetECMALineInfo(legacy) != nil {
				resolved = legacy
			}
		}
		sourceFileAbsolutePaths[i] = resolved
	}
	caseSensitivity := host.CaseSensitivity()
	sourceToSourceIndexMap := make(map[tspath.PathKey][]SourceIndex, len(sourceFileAbsolutePaths))
	for i, source := range sourceFileAbsolutePaths {
		if unmappedSources[i] {
			continue
		}
		key := caseSensitivity.PathKey(tspath.RootedPath(source))
		sourceToSourceIndexMap[key] = append(sourceToSourceIndexMap[key], SourceIndex(i))
	}

	var decodedMappings []*MappedPosition
	var generatedMappings []*MappedPosition
	sourceMappings := make(map[SourceIndex][]*SourceMappedPosition)

	// getDecodedMappings()
	decoder := DecodeMappings(sourceMap.Mappings)
	for mapping := range decoder.Values() {
		// processMapping()
		generatedPosition := -1
		lineInfo := host.GetECMALineInfo(generatedAbsoluteFilePath)
		if lineInfo != nil {
			generatedPosition = scanner.ComputePositionOfLineAndUTF16Character(
				lineInfo.lineStarts,
				mapping.GeneratedLine,
				mapping.GeneratedCharacter,
				lineInfo.text,
				true, /*allowEdits*/
			)
		}

		sourcePosition := -1
		if mapping.IsSourceMapping() {
			sourceIndex := int(mapping.SourceIndex)
			if sourceIndex >= 0 &&
				sourceIndex < len(sourceFileAbsolutePaths) &&
				!unmappedSources[sourceIndex] {
				lineInfo := host.GetECMALineInfo(sourceFileAbsolutePaths[sourceIndex])
				if lineInfo != nil {
					pos := scanner.ComputePositionOfLineAndUTF16Character(
						lineInfo.lineStarts,
						mapping.SourceLine,
						mapping.SourceCharacter,
						lineInfo.text,
						true, /*allowEdits*/
					)
					sourcePosition = pos
				}
			}
		}

		decodedMappings = append(decodedMappings, &MappedPosition{
			generatedPosition: generatedPosition,
			sourceIndex:       mapping.SourceIndex,
			sourcePosition:    sourcePosition,
			nameIndex:         mapping.NameIndex,
		})
	}
	if decoder.Error() != nil {
		decodedMappings = nil
	}

	// getSourceMappings()
	for _, mapping := range decodedMappings {
		if !mapping.isSourceMappedPosition() {
			continue
		}
		sourceIndex := mapping.sourceIndex
		list := sourceMappings[sourceIndex]
		list = append(list, &SourceMappedPosition{
			generatedPosition: mapping.generatedPosition,
			sourceIndex:       sourceIndex,
			sourcePosition:    mapping.sourcePosition,
			nameIndex:         mapping.nameIndex,
		})
		sourceMappings[sourceIndex] = list
	}
	for i, list := range sourceMappings {
		slices.SortFunc(list, func(a, b *SourceMappedPosition) int {
			debug.Assert(a.sourceIndex == b.sourceIndex, "All source mappings should have the same source index")
			return a.sourcePosition - b.sourcePosition
		})
		sourceMappings[i] = core.DeduplicateSorted(list, func(a, b *SourceMappedPosition) bool {
			return a.generatedPosition == b.generatedPosition &&
				a.sourceIndex == b.sourceIndex &&
				a.sourcePosition == b.sourcePosition
		})
	}
	sourceMappingsByPath := make(map[tspath.PathKey][]*SourceMappedPosition, len(sourceToSourceIndexMap))
	for path, sourceIndices := range sourceToSourceIndexMap {
		var mappings []*SourceMappedPosition
		for _, sourceIndex := range sourceIndices {
			mappings = append(mappings, sourceMappings[sourceIndex]...)
		}
		slices.SortFunc(mappings, func(a, b *SourceMappedPosition) int {
			return a.sourcePosition - b.sourcePosition
		})
		sourceMappingsByPath[path] = mappings
	}

	// getGeneratedMappings()
	generatedMappings = decodedMappings
	slices.SortFunc(generatedMappings, func(a, b *MappedPosition) int {
		return a.generatedPosition - b.generatedPosition
	})
	generatedMappings = core.DeduplicateSorted(generatedMappings, func(a, b *MappedPosition) bool {
		return a.generatedPosition == b.generatedPosition &&
			a.sourceIndex == b.sourceIndex &&
			a.sourcePosition == b.sourcePosition
	})

	return &DocumentPositionMapper{
		caseSensitivity:           caseSensitivity,
		sourceFileAbsolutePaths:   sourceFileAbsolutePaths,
		sourceMappingsByPath:      sourceMappingsByPath,
		generatedAbsoluteFilePath: generatedAbsoluteFilePath,
		generatedMappings:         generatedMappings,
		sourceMappings:            sourceMappings,
	}
}

func tryResolveSourceMapPath(path string, directory tspath.RootedDirectoryPath) (tspath.RootedFilePath, bool) {
	if path == "" {
		return "", false
	}
	if tspath.PathIsAbsolute(path) {
		return tspath.TryRootedFilePathFromAbsolute(path)
	}
	return tspath.TryRootedFilePathFromAbsolute(tspath.CombinePaths(directory.AsString(), path))
}

type DocumentPosition struct {
	FileName tspath.RootedFilePath
	Pos      int
}

func (d *DocumentPositionMapper) GetSourcePosition(loc *DocumentPosition) *DocumentPosition {
	if d == nil {
		return nil
	}
	if len(d.generatedMappings) == 0 {
		return nil
	}

	targetIndex, _ := slices.BinarySearchFunc(d.generatedMappings, loc.Pos, func(m *MappedPosition, pos int) int {
		return m.generatedPosition - pos
	})

	if targetIndex < 0 || targetIndex >= len(d.generatedMappings) {
		return nil
	}

	mapping := d.generatedMappings[targetIndex]
	if !mapping.isSourceMappedPosition() {
		return nil
	}

	// Closest position
	return &DocumentPosition{
		FileName: d.sourceFileAbsolutePaths[mapping.sourceIndex],
		Pos:      mapping.sourcePosition,
	}
}

func (d *DocumentPositionMapper) GetGeneratedPosition(loc *DocumentPosition) *DocumentPosition {
	if d == nil {
		return nil
	}
	sourceMappings, ok := d.sourceMappingsByPath[d.caseSensitivity.PathKey(tspath.RootedPath(loc.FileName))]
	if !ok {
		return nil
	}
	if len(sourceMappings) == 0 {
		return nil
	}
	targetIndex, _ := slices.BinarySearchFunc(sourceMappings, loc.Pos, func(m *SourceMappedPosition, pos int) int {
		return m.sourcePosition - pos
	})

	if targetIndex < 0 || targetIndex >= len(sourceMappings) {
		return nil
	}

	mapping := sourceMappings[targetIndex]
	// Closest position
	return &DocumentPosition{
		FileName: d.generatedAbsoluteFilePath,
		Pos:      mapping.generatedPosition,
	}
}

func GetDocumentPositionMapper(host Host, generatedFileName tspath.RootedFilePath) *DocumentPositionMapper {
	mapFileName := tryGetSourceMappingURL(host, generatedFileName)
	if mapFileName != "" {
		if base64Object, matched := tryParseBase64Url(mapFileName); matched {
			if base64Object != "" {
				if decoded, err := base64.StdEncoding.DecodeString(base64Object); err == nil {
					return convertDocumentToSourceMapper(host, string(decoded), generatedFileName)
				}
			}
			// Not a data URL we can parse, skip it
			mapFileName = ""
		}
	}

	var possibleMapLocations []string
	if mapFileName != "" {
		possibleMapLocations = append(possibleMapLocations, mapFileName)
	}
	possibleMapLocations = append(possibleMapLocations, generatedFileName.AppendSuffix(".map").AsString())
	for _, location := range possibleMapLocations {
		mapFileName, ok := tryResolveSourceMapPath(location, generatedFileName.Directory())
		if !ok {
			continue
		}
		if mapFileContents, ok := host.ReadFile(mapFileName); ok {
			return convertDocumentToSourceMapper(host, mapFileContents, mapFileName)
		}
	}
	return nil
}

func convertDocumentToSourceMapper(host Host, contents string, mapFileName tspath.RootedFilePath) *DocumentPositionMapper {
	parsed := tryParseRawSourceMap(contents)
	if parsed == nil || len(parsed.sourceMap.Sources) == 0 || parsed.sourceMap.File == "" || parsed.sourceMap.Mappings == "" {
		// invalid map
		return nil
	}

	// Don't support source maps that contain inlined sources
	if core.Some(parsed.sourceMap.SourcesContent, func(s *string) bool { return s != nil }) {
		return nil
	}

	return createDocumentPositionMapper(host, parsed.sourceMap, parsed.sourceRoot, parsed.nullSources, mapFileName)
}

type parsedRawSourceMap struct {
	sourceMap   *RawSourceMap
	sourceRoot  *string
	nullSources []bool
}

func tryParseRawSourceMap(contents string) *parsedRawSourceMap {
	type rawSourceMapJSON struct {
		Version        int       `json:"version"`
		File           string    `json:"file"`
		SourceRoot     *string   `json:"sourceRoot"`
		Sources        []*string `json:"sources"`
		Names          []string  `json:"names"`
		Mappings       string    `json:"mappings"`
		SourcesContent []*string `json:"sourcesContent,omitzero"`
	}

	encoded := &rawSourceMapJSON{}
	err := json.Unmarshal([]byte(contents), encoded)
	if err != nil {
		return nil
	}
	if encoded.Version != 3 {
		return nil
	}
	sources := make([]string, len(encoded.Sources))
	nullSources := make([]bool, len(encoded.Sources))
	for i, source := range encoded.Sources {
		if source == nil {
			nullSources[i] = true
			continue
		}
		sources[i] = *source
	}
	return &parsedRawSourceMap{
		sourceMap: &RawSourceMap{
			Version:        encoded.Version,
			File:           encoded.File,
			Sources:        sources,
			Names:          encoded.Names,
			Mappings:       encoded.Mappings,
			SourcesContent: encoded.SourcesContent,
		},
		sourceRoot:  encoded.SourceRoot,
		nullSources: nullSources,
	}
}

func tryGetSourceMappingURL(host Host, fileName tspath.RootedFilePath) string {
	lineInfo := host.GetECMALineInfo(fileName)
	return TryGetSourceMappingURL(lineInfo)
}

// Equivalent to /^data:(?:application\/json;(?:charset=[uU][tT][fF]-8;)?base64,([A-Za-z0-9+/=]+)$)?/
func tryParseBase64Url(url string) (parseableUrl string, isBase64Url bool) {
	var found bool
	if url, found = strings.CutPrefix(url, `data:`); !found {
		return "", false
	}
	if url, found = strings.CutPrefix(url, `application/json;`); !found {
		return "", true
	}
	if url, found = strings.CutPrefix(url, `charset=`); found {
		if !strings.EqualFold(url[:len(`utf-8;`)], `utf-8;`) {
			return "", true
		}
		url = url[len(`utf-8;`):]
	}
	if url, found = strings.CutPrefix(url, `base64,`); !found {
		return "", true
	}
	for _, r := range url {
		if !(stringutil.IsASCIILetter(r) || stringutil.IsDigit(r) || r == '+' || r == '/' || r == '=') {
			return "", true
		}
	}
	return url, true
}
