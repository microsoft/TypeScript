package sourcemap

import (
	"encoding/json"
	"errors"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/tspath"
)

type (
	SourceIndex int
	NameIndex   int
)

const (
	sourceIndexNotSet SourceIndex = -1
	nameIndexNotSet   NameIndex   = -1
	notSet            int         = -1
)

type Generator struct {
	pathOptions               tspath.ComparePathsOptions
	file                      string
	sourceRoot                string
	sourcesDirectoryPath      string
	rawSources                []string
	sources                   []string
	sourceToSourceIndexMap    map[string]SourceIndex
	sourcesContent            []*string
	names                     []string
	nameToNameIndexMap        map[string]NameIndex
	mappings                  strings.Builder
	lastGeneratedLine         int
	lastGeneratedCharacter    int
	lastSourceIndex           SourceIndex
	lastSourceLine            int
	lastSourceCharacter       int
	lastNameIndex             NameIndex
	hasLast                   bool
	pendingGeneratedLine      int
	pendingGeneratedCharacter int
	pendingSourceIndex        SourceIndex
	pendingSourceLine         int
	pendingSourceCharacter    int
	pendingNameIndex          NameIndex
	hasPending                bool
	hasPendingSource          bool
	hasPendingName            bool
}

type RawSourceMap struct {
	Version        int       `json:"version"`
	File           string    `json:"file"`
	SourceRoot     string    `json:"sourceRoot"`
	Sources        []string  `json:"sources"`
	Names          []string  `json:"names"`
	Mappings       string    `json:"mappings"`
	SourcesContent []*string `json:"sourcesContent,omitempty"`
}

func NewGenerator(file string, sourceRoot string, sourcesDirectoryPath string, options tspath.ComparePathsOptions) *Generator {
	return &Generator{
		file:                 file,
		sourceRoot:           sourceRoot,
		sourcesDirectoryPath: sourcesDirectoryPath,
		pathOptions:          options,
	}
}

func (gen *Generator) Sources() []string { return gen.rawSources }

// Adds a source to the source map
func (gen *Generator) AddSource(fileName string) SourceIndex {
	source := tspath.GetRelativePathToDirectoryOrUrl(
		gen.sourcesDirectoryPath,
		fileName,
		true, /*isAbsolutePathAnUrl*/
		gen.pathOptions,
	)

	sourceIndex, found := gen.sourceToSourceIndexMap[source]
	if !found {
		sourceIndex = SourceIndex(len(gen.sources))
		gen.sources = append(gen.sources, source)
		gen.rawSources = append(gen.rawSources, fileName)
		if gen.sourceToSourceIndexMap == nil {
			gen.sourceToSourceIndexMap = make(map[string]SourceIndex)
		}
		gen.sourceToSourceIndexMap[source] = sourceIndex
	}

	return sourceIndex
}

// Sets the content for a source
func (gen *Generator) SetSourceContent(sourceIndex SourceIndex, content string) error {
	if sourceIndex < 0 || int(sourceIndex) >= len(gen.sources) {
		return errors.New("sourceIndex is out of range")
	}
	for len(gen.sourcesContent) <= int(sourceIndex) {
		gen.sourcesContent = append(gen.sourcesContent, nil)
	}
	gen.sourcesContent[sourceIndex] = &content
	return nil
}

// Declares a name in the source map, returning the index of the name
func (gen *Generator) AddName(name string) NameIndex {
	nameIndex, found := gen.nameToNameIndexMap[name]
	if !found {
		nameIndex = NameIndex(len(gen.names))
		gen.names = append(gen.names, name)
		if gen.nameToNameIndexMap == nil {
			gen.nameToNameIndexMap = make(map[string]NameIndex)
		}
		gen.nameToNameIndexMap[name] = nameIndex
	}
	return nameIndex
}

func (gen *Generator) isNewGeneratedPosition(generatedLine int, generatedCharacter int) bool {
	return !gen.hasPending ||
		gen.pendingGeneratedLine != generatedLine ||
		gen.pendingGeneratedCharacter != generatedCharacter
}

func (gen *Generator) isBacktrackingSourcePosition(sourceIndex SourceIndex, sourceLine int, sourceCharacter int) bool {
	return sourceIndex != sourceIndexNotSet &&
		sourceLine != notSet &&
		sourceCharacter != notSet &&
		gen.pendingSourceIndex == sourceIndex &&
		(gen.pendingSourceLine > sourceLine ||
			gen.pendingSourceLine == sourceLine && gen.pendingSourceCharacter > sourceCharacter)
}

func (gen *Generator) shouldCommitMapping() bool {
	return gen.hasPending && (!gen.hasLast ||
		gen.lastGeneratedLine != gen.pendingGeneratedLine ||
		gen.lastGeneratedCharacter != gen.pendingGeneratedCharacter ||
		gen.lastSourceIndex != gen.pendingSourceIndex ||
		gen.lastSourceLine != gen.pendingSourceLine ||
		gen.lastSourceCharacter != gen.pendingSourceCharacter ||
		gen.lastNameIndex != gen.pendingNameIndex)
}

func (gen *Generator) appendMappingCharCode(charCode rune) {
	gen.mappings.WriteRune(charCode)
}

func (gen *Generator) appendBase64VLQ(inValue int) {
	// Add a new least significant bit that has the sign of the value.
	// if negative number the least significant bit that gets added to the number has value 1
	// else least significant bit value that gets added is 0
	// eg. -1 changes to binary : 01 [1] => 3
	//     +1 changes to binary : 01 [0] => 2
	if inValue < 0 {
		inValue = ((-inValue) << 1) + 1
	} else {
		inValue = inValue << 1
	}

	// Encode 5 bits at a time starting from least significant bits
	for {
		currentDigit := inValue & 31 // 11111
		inValue = inValue >> 5
		if inValue > 0 {
			// There are still more digits to decode, set the msb (6th bit)
			currentDigit = currentDigit | 32
		}
		gen.appendMappingCharCode(base64FormatEncode(currentDigit))
		if inValue <= 0 {
			break
		}
	}
}

func (gen *Generator) commitPendingMapping() {
	if !gen.shouldCommitMapping() {
		return
	}

	// Line/Comma delimiters
	if gen.lastGeneratedLine < gen.pendingGeneratedLine {
		// Emit line delimiters
		for {
			gen.appendMappingCharCode(';')
			gen.lastGeneratedLine++
			if gen.lastGeneratedLine >= gen.pendingGeneratedLine {
				break
			}
		}
		// Only need to set this once
		gen.lastGeneratedCharacter = 0
	} else {
		if gen.lastGeneratedLine != gen.pendingGeneratedLine {
			// panic rather than error as an invariant has been violated
			panic("generatedLine cannot backtrack")
		}
		// Emit comma to separate the entry
		if gen.hasLast {
			gen.appendMappingCharCode(',')
		}
	}

	// 1. Relative generated character
	gen.appendBase64VLQ(gen.pendingGeneratedCharacter - gen.lastGeneratedCharacter)
	gen.lastGeneratedCharacter = gen.pendingGeneratedCharacter

	if gen.hasPendingSource {
		// 2. Relative sourceIndex
		gen.appendBase64VLQ(int(gen.pendingSourceIndex - gen.lastSourceIndex))
		gen.lastSourceIndex = gen.pendingSourceIndex

		// 3. Relative source line
		gen.appendBase64VLQ(gen.pendingSourceLine - gen.lastSourceLine)
		gen.lastSourceLine = gen.pendingSourceLine

		// 4. Relative source character
		gen.appendBase64VLQ(gen.pendingSourceCharacter - gen.lastSourceCharacter)
		gen.lastSourceCharacter = gen.pendingSourceCharacter

		if gen.hasPendingName {
			// 5. Relative nameIndex
			gen.appendBase64VLQ(int(gen.pendingNameIndex - gen.lastNameIndex))
			gen.lastNameIndex = gen.pendingNameIndex
		}
	}

	gen.hasLast = true
}

func (gen *Generator) addMapping(generatedLine int, generatedCharacter int, sourceIndex SourceIndex, sourceLine int, sourceCharacter int, nameIndex NameIndex) {
	if gen.isNewGeneratedPosition(generatedLine, generatedCharacter) ||
		gen.isBacktrackingSourcePosition(sourceIndex, sourceLine, sourceCharacter) {
		gen.commitPendingMapping()
		gen.pendingGeneratedLine = generatedLine
		gen.pendingGeneratedCharacter = generatedCharacter
		gen.hasPendingSource = false
		gen.hasPendingName = false
		gen.hasPending = true
	}

	if sourceIndex != sourceIndexNotSet && sourceLine != notSet && sourceCharacter != notSet {
		gen.pendingSourceIndex = sourceIndex
		gen.pendingSourceLine = sourceLine
		gen.pendingSourceCharacter = sourceCharacter
		gen.hasPendingSource = true
		if nameIndex != nameIndexNotSet {
			gen.pendingNameIndex = nameIndex
			gen.hasPendingName = true
		}
	}
}

// Adds a mapping without source information
func (gen *Generator) AddGeneratedMapping(generatedLine int, generatedCharacter int) error {
	if generatedLine < gen.pendingGeneratedLine {
		return errors.New("generatedLine cannot backtrack")
	}
	if generatedCharacter < 0 {
		return errors.New("generatedCharacter cannot be negative")
	}
	gen.addMapping(generatedLine, generatedCharacter, sourceIndexNotSet, notSet /*sourceLine*/, notSet /*sourceCharacter*/, nameIndexNotSet)
	return nil
}

// Adds a mapping with source information
func (gen *Generator) AddSourceMapping(generatedLine int, generatedCharacter int, sourceIndex SourceIndex, sourceLine int, sourceCharacter int) error {
	if generatedLine < gen.pendingGeneratedLine {
		return errors.New("generatedLine cannot backtrack")
	}
	if generatedCharacter < 0 {
		return errors.New("generatedCharacter cannot be negative")
	}
	if sourceIndex < 0 || int(sourceIndex) >= len(gen.sources) {
		return errors.New("sourceIndex is out of range")
	}
	if sourceLine < 0 {
		return errors.New("sourceLine cannot be negative")
	}
	if sourceCharacter < 0 {
		return errors.New("sourceCharacter cannot be negative")
	}
	gen.addMapping(generatedLine, generatedCharacter, sourceIndex, sourceLine, sourceCharacter, nameIndexNotSet)
	return nil
}

// Adds a mapping with source and name information
func (gen *Generator) AddNamedSourceMapping(generatedLine int, generatedCharacter int, sourceIndex SourceIndex, sourceLine int, sourceCharacter int, nameIndex NameIndex) error {
	if generatedLine < gen.pendingGeneratedLine {
		return errors.New("generatedLine cannot backtrack")
	}
	if generatedCharacter < 0 {
		return errors.New("generatedCharacter cannot be negative")
	}
	if sourceIndex < 0 || int(sourceIndex) >= len(gen.sources) {
		return errors.New("sourceIndex is out of range")
	}
	if sourceLine < 0 {
		return errors.New("sourceLine cannot be negative")
	}
	if sourceCharacter < 0 {
		return errors.New("sourceCharacter cannot be negative")
	}
	if nameIndex < 0 || int(nameIndex) >= len(gen.names) {
		return errors.New("nameIndex is out of range")
	}
	gen.addMapping(generatedLine, generatedCharacter, sourceIndex, sourceLine, sourceCharacter, nameIndex)
	return nil
}

// Gets the source map as a `RawSourceMap` object
func (gen *Generator) RawSourceMap() *RawSourceMap {
	gen.commitPendingMapping()
	sources := slices.Clone(gen.sources)
	if sources == nil {
		sources = []string{}
	}
	names := slices.Clone(gen.names)
	if names == nil {
		names = []string{}
	}
	return &RawSourceMap{
		Version:        3,
		File:           gen.file,
		SourceRoot:     gen.sourceRoot,
		Sources:        sources,
		Names:          names,
		Mappings:       gen.mappings.String(),
		SourcesContent: slices.Clone(gen.sourcesContent),
	}
}

// Gets the string representation of the source map
func (gen *Generator) String() string {
	buf, err := json.Marshal(gen.RawSourceMap())
	if err != nil {
		panic(err.Error())
	}
	return string(buf)
}

func base64FormatEncode(value int) rune {
	switch {
	case value >= 0 && value < 26:
		return 'A' + rune(value)
	case value >= 26 && value < 52:
		return 'a' + rune(value) - 26
	case value >= 52 && value < 62:
		return '0' + rune(value) - 52
	case value == 62:
		return '+'
	case value == 63:
		return '/'
	default:
		panic("not a base64 value")
	}
}
