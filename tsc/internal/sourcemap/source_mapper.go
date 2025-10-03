package sourcemap

import (
	"encoding/base64"
	"slices"
	"strings"

	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type Host interface {
	UseCaseSensitiveFileNames() bool
	GetECMALineInfo(fileName string) *ECMALineInfo
	ReadFile(fileName string) (string, bool)
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
	useCaseSensitiveFileNames bool

	sourceFileAbsolutePaths   []string
	sourceToSourceIndexMap    map[string]SourceIndex
	generatedAbsoluteFilePath string

	generatedMappings []*MappedPosition
	sourceMappings    map[SourceIndex][]*SourceMappedPosition
}

func createDocumentPositionMapper(host Host, sourceMap *RawSourceMap, mapPath string) *DocumentPositionMapper {
	mapDirectory := tspath.GetDirectoryPath(mapPath)
	var sourceRoot string
	if sourceMap.SourceRoot != "" {
		sourceRoot = tspath.GetNormalizedAbsolutePath(sourceMap.SourceRoot, mapDirectory)
	} else {
		sourceRoot = mapDirectory
	}
	generatedAbsoluteFilePath := tspath.GetNormalizedAbsolutePath(sourceMap.File, mapDirectory)
	sourceFileAbsolutePaths := core.Map(sourceMap.Sources, func(source string) string {
		return tspath.GetNormalizedAbsolutePath(source, sourceRoot)
	})
	useCaseSensitiveFileNames := host.UseCaseSensitiveFileNames()
	sourceToSourceIndexMap := make(map[string]SourceIndex, len(sourceFileAbsolutePaths))
	for i, source := range sourceFileAbsolutePaths {
		sourceToSourceIndexMap[tspath.GetCanonicalFileName(source, useCaseSensitiveFileNames)] = SourceIndex(i)
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
			generatedPosition = scanner.ComputePositionOfLineAndCharacterEx(
				lineInfo.lineStarts,
				mapping.GeneratedLine,
				mapping.GeneratedCharacter,
				&lineInfo.text,
				true, /*allowEdits*/
			)
		}

		sourcePosition := -1
		if mapping.IsSourceMapping() {
			lineInfo := host.GetECMALineInfo(sourceFileAbsolutePaths[mapping.SourceIndex])
			if lineInfo != nil {
				pos := scanner.ComputePositionOfLineAndCharacterEx(
					lineInfo.lineStarts,
					mapping.SourceLine,
					mapping.SourceCharacter,
					&lineInfo.text,
					true, /*allowEdits*/
				)
				sourcePosition = pos
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
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
		sourceFileAbsolutePaths:   sourceFileAbsolutePaths,
		sourceToSourceIndexMap:    sourceToSourceIndexMap,
		generatedAbsoluteFilePath: generatedAbsoluteFilePath,
		generatedMappings:         generatedMappings,
		sourceMappings:            sourceMappings,
	}
}

type DocumentPosition struct {
	FileName string
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
	sourceIndex, ok := d.sourceToSourceIndexMap[tspath.GetCanonicalFileName(loc.FileName, d.useCaseSensitiveFileNames)]
	if !ok {
		return nil
	}
	if sourceIndex < 0 || int(sourceIndex) >= len(d.sourceMappings) {
		return nil
	}
	sourceMappings := d.sourceMappings[sourceIndex]
	targetIndex, _ := slices.BinarySearchFunc(sourceMappings, loc.Pos, func(m *SourceMappedPosition, pos int) int {
		return m.sourcePosition - pos
	})

	if targetIndex < 0 || targetIndex >= len(sourceMappings) {
		return nil
	}

	mapping := sourceMappings[targetIndex]
	if mapping.sourceIndex != sourceIndex {
		return nil
	}

	// Closest position
	return &DocumentPosition{
		FileName: d.generatedAbsoluteFilePath,
		Pos:      mapping.generatedPosition,
	}
}

func GetDocumentPositionMapper(host Host, generatedFileName string) *DocumentPositionMapper {
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
	possibleMapLocations = append(possibleMapLocations, generatedFileName+".map")
	for _, location := range possibleMapLocations {
		mapFileName := tspath.GetNormalizedAbsolutePath(location, tspath.GetDirectoryPath(generatedFileName))
		if mapFileContents, ok := host.ReadFile(mapFileName); ok {
			return convertDocumentToSourceMapper(host, mapFileContents, mapFileName)
		}
	}
	return nil
}

func convertDocumentToSourceMapper(host Host, contents string, mapFileName string) *DocumentPositionMapper {
	sourceMap := tryParseRawSourceMap(contents)
	if sourceMap == nil || len(sourceMap.Sources) == 0 || sourceMap.File == "" || sourceMap.Mappings == "" {
		// invalid map
		return nil
	}

	// Don't support source maps that contain inlined sources
	if core.Some(sourceMap.SourcesContent, func(s *string) bool { return s != nil }) {
		return nil
	}

	return createDocumentPositionMapper(host, sourceMap, mapFileName)
}

func tryParseRawSourceMap(contents string) *RawSourceMap {
	sourceMap := &RawSourceMap{}
	err := json.Unmarshal([]byte(contents), sourceMap)
	if err != nil {
		return nil
	}
	if sourceMap.Version != 3 {
		return nil
	}
	return sourceMap
}

func tryGetSourceMappingURL(host Host, fileName string) string {
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
