package sourcemap

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestSourceMapGenerator_Empty(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceMap := gen.RawSourceMap()
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{},
		Mappings:       "",
		Names:          []string{},
		SourcesContent: nil,
	})
}

func TestSourceMapGenerator_Empty_Serialized(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	actual := gen.String()
	expected := `{"version":3,"file":"main.js","sourceRoot":"/","sources":[],"names":[],"mappings":""}`
	assert.Equal(t, actual, expected)
}

func TestSourceMapGenerator_AddSource(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	sourceMap := gen.RawSourceMap()
	assert.Equal(t, int(sourceIndex), 0)
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{"main.ts"},
		Mappings:       "",
		Names:          []string{},
		SourcesContent: nil,
	})
}

func TestSourceMapGenerator_SetSourceContent(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	sourceContent := "foo"
	assert.NilError(t, gen.SetSourceContent(sourceIndex, sourceContent))
	sourceMap := gen.RawSourceMap()
	assert.Equal(t, int(sourceIndex), 0)
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{"main.ts"},
		Mappings:       "",
		Names:          []string{},
		SourcesContent: []*string{&sourceContent},
	})
}

func TestSourceMapGenerator_SetSourceContent_ForSecondSourceOnly(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	gen.AddSource("/skipped.ts")
	sourceIndex := gen.AddSource("/main.ts")
	sourceContent := "foo"
	assert.NilError(t, gen.SetSourceContent(sourceIndex, sourceContent))
	sourceMap := gen.RawSourceMap()
	assert.Equal(t, int(sourceIndex), 1)
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{"skipped.ts", "main.ts"},
		Mappings:       "",
		Names:          []string{},
		SourcesContent: []*string{nil, &sourceContent},
	})
}

func TestSourceMapGenerator_SetSourceContent_SourceIndexOutOfRange(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	assert.Error(t, gen.SetSourceContent(-1, ""), "sourceIndex is out of range")
	assert.Error(t, gen.SetSourceContent(0, ""), "sourceIndex is out of range")
}

func TestSourceMapGenerator_SetSourceContent_ForSecondSourceOnly_Serialized(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	gen.AddSource("/skipped.ts")
	sourceIndex := gen.AddSource("/main.ts")
	sourceContent := "foo"
	assert.NilError(t, gen.SetSourceContent(sourceIndex, sourceContent))
	actual := gen.String()
	expected := `{"version":3,"file":"main.js","sourceRoot":"/","sources":["skipped.ts","main.ts"],"names":[],"mappings":"","sourcesContent":[null,"foo"]}`
	assert.Equal(t, actual, expected)
}

func TestSourceMapGenerator_AddName(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	nameIndex := gen.AddName("foo")
	sourceMap := gen.RawSourceMap()
	assert.Equal(t, int(nameIndex), 0)
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{},
		Mappings:       "",
		Names:          []string{"foo"},
		SourcesContent: nil,
	})
}

func TestSourceMapGenerator_AddGeneratedMapping(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	assert.NilError(t, gen.AddGeneratedMapping(0, 0))
	sourceMap := gen.RawSourceMap()
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{},
		Mappings:       "A",
		Names:          []string{},
		SourcesContent: nil,
	})
}

func TestSourceMapGenerator_AddGeneratedMapping_OnSecondLineOnly(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	assert.NilError(t, gen.AddGeneratedMapping(1, 0))
	sourceMap := gen.RawSourceMap()
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{},
		Mappings:       ";A",
		Names:          []string{},
		SourcesContent: nil,
	})
}

func TestSourceMapGenerator_AddSourceMapping(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	assert.NilError(t, gen.AddSourceMapping(0, 0, sourceIndex, 0, 0))
	sourceMap := gen.RawSourceMap()
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{"main.ts"},
		Mappings:       "AAAA",
		Names:          []string{},
		SourcesContent: nil,
	})
}

func TestSourceMapGenerator_AddSourceMapping_NextGeneratedCharacter(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	assert.NilError(t, gen.AddSourceMapping(0, 0, sourceIndex, 0, 0))
	assert.NilError(t, gen.AddSourceMapping(0, 1, sourceIndex, 0, 0))
	sourceMap := gen.RawSourceMap()
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{"main.ts"},
		Mappings:       "AAAA,CAAA",
		Names:          []string{},
		SourcesContent: nil,
	})
}

func TestSourceMapGenerator_AddSourceMapping_NextGeneratedAndSourceCharacter(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	assert.NilError(t, gen.AddSourceMapping(0, 0, sourceIndex, 0, 0))
	assert.NilError(t, gen.AddSourceMapping(0, 1, sourceIndex, 0, 1))
	sourceMap := gen.RawSourceMap()
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{"main.ts"},
		Mappings:       "AAAA,CAAC",
		Names:          []string{},
		SourcesContent: nil,
	})
}

func TestSourceMapGenerator_AddSourceMapping_NextGeneratedLine(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	assert.NilError(t, gen.AddSourceMapping(0, 0, sourceIndex, 0, 0))
	assert.NilError(t, gen.AddSourceMapping(1, 0, sourceIndex, 0, 0))
	sourceMap := gen.RawSourceMap()
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{"main.ts"},
		Mappings:       "AAAA;AAAA",
		Names:          []string{},
		SourcesContent: nil,
	})
}

func TestSourceMapGenerator_AddSourceMapping_PreviousSourceCharacter(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	assert.NilError(t, gen.AddSourceMapping(0, 0, sourceIndex, 0, 1))
	assert.NilError(t, gen.AddSourceMapping(0, 1, sourceIndex, 0, 0))
	sourceMap := gen.RawSourceMap()
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{"main.ts"},
		Mappings:       "AAAC,CAAD",
		Names:          []string{},
		SourcesContent: nil,
	})
}

func TestSourceMapGenerator_AddNamedSourceMapping(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	nameIndex := gen.AddName("foo")
	assert.NilError(t, gen.AddNamedSourceMapping(0, 0, sourceIndex, 0, 0, nameIndex))
	sourceMap := gen.RawSourceMap()
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{"main.ts"},
		Mappings:       "AAAAA",
		Names:          []string{"foo"},
		SourcesContent: nil,
	})
}

func TestSourceMapGenerator_AddNamedSourceMapping_WithPreviousName(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	nameIndex1 := gen.AddName("foo")
	nameIndex2 := gen.AddName("bar")
	assert.NilError(t, gen.AddNamedSourceMapping(0, 0, sourceIndex, 0, 0, nameIndex2))
	assert.NilError(t, gen.AddNamedSourceMapping(0, 1, sourceIndex, 0, 0, nameIndex1))
	sourceMap := gen.RawSourceMap()
	assert.DeepEqual(t, sourceMap, &RawSourceMap{
		Version:        3,
		File:           "main.js",
		SourceRoot:     "/",
		Sources:        []string{"main.ts"},
		Mappings:       "AAAAC,CAAAD",
		Names:          []string{"foo", "bar"},
		SourcesContent: nil,
	})
}

func TestSourceMapGenerator_AddGeneratedMapping_GeneratedLineCannotBacktrack(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	assert.NilError(t, gen.AddGeneratedMapping(1, 0))
	assert.Error(t, gen.AddGeneratedMapping(0, 0), "generatedLine cannot backtrack")
}

func TestSourceMapGenerator_AddGeneratedMapping_GeneratedCharacterCannotBeNegative(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	assert.NilError(t, gen.AddGeneratedMapping(0, 0))
	assert.Error(t, gen.AddGeneratedMapping(0, -1), "generatedCharacter cannot be negative")
}

func TestSourceMapGenerator_AddSourceMapping_GeneratedLineCannotBacktrack(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	assert.NilError(t, gen.AddSourceMapping(1, 0, sourceIndex, 0, 0))
	assert.Error(t, gen.AddSourceMapping(0, 0, sourceIndex, 0, 0), "generatedLine cannot backtrack")
}

func TestSourceMapGenerator_AddSourceMapping_GeneratedCharacterCannotBeNegative(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	assert.NilError(t, gen.AddSourceMapping(0, 0, sourceIndex, 0, 0))
	assert.Error(t, gen.AddSourceMapping(0, -1, sourceIndex, 0, 0), "generatedCharacter cannot be negative")
}

func TestSourceMapGenerator_AddSourceMapping_SourceIndexIsOutOfRange(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	assert.Error(t, gen.AddSourceMapping(0, 0, -1, 0, 0), "sourceIndex is out of range")
	assert.Error(t, gen.AddSourceMapping(0, 0, 0, 0, 0), "sourceIndex is out of range")
}

func TestSourceMapGenerator_AddSourceMapping_SourceLineCannotBeNegative(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	assert.Error(t, gen.AddSourceMapping(0, 0, sourceIndex, -1, 0), "sourceLine cannot be negative")
}

func TestSourceMapGenerator_AddSourceMapping_SourceCharacterCannotBeNegative(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	assert.Error(t, gen.AddSourceMapping(0, 0, sourceIndex, 0, -1), "sourceCharacter cannot be negative")
}

func TestSourceMapGenerator_AddNamedSourceMapping_GeneratedLineCannotBacktrack(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	nameIndex := gen.AddName("foo")
	assert.NilError(t, gen.AddNamedSourceMapping(1, 0, sourceIndex, 0, 0, nameIndex))
	assert.Error(t, gen.AddNamedSourceMapping(0, 0, sourceIndex, 0, 0, nameIndex), "generatedLine cannot backtrack")
}

func TestSourceMapGenerator_AddNamedSourceMapping_GeneratedCharacterCannotBeNegative(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	nameIndex := gen.AddName("foo")
	assert.NilError(t, gen.AddNamedSourceMapping(0, 0, sourceIndex, 0, 0, nameIndex))
	assert.Error(t, gen.AddNamedSourceMapping(0, -1, sourceIndex, 0, 0, nameIndex), "generatedCharacter cannot be negative")
}

func TestSourceMapGenerator_AddNamedSourceMapping_SourceIndexIsOutOfRange(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	nameIndex := gen.AddName("foo")
	assert.Error(t, gen.AddNamedSourceMapping(0, 0, -1, 0, 0, nameIndex), "sourceIndex is out of range")
	assert.Error(t, gen.AddNamedSourceMapping(0, 0, 0, 0, 0, nameIndex), "sourceIndex is out of range")
}

func TestSourceMapGenerator_AddNamedSourceMapping_SourceLineCannotBeNegative(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	nameIndex := gen.AddName("foo")
	sourceIndex := gen.AddSource("/main.ts")
	assert.Error(t, gen.AddNamedSourceMapping(0, 0, sourceIndex, -1, 0, nameIndex), "sourceLine cannot be negative")
}

func TestSourceMapGenerator_AddNamedSourceMapping_SourceCharacterCannotBeNegative(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	nameIndex := gen.AddName("foo")
	sourceIndex := gen.AddSource("/main.ts")
	assert.Error(t, gen.AddNamedSourceMapping(0, 0, sourceIndex, 0, -1, nameIndex), "sourceCharacter cannot be negative")
}

func TestSourceMapGenerator_AddNamedSourceMapping_NameIndexIsOutOfRange(t *testing.T) {
	t.Parallel()
	gen := NewGenerator("main.js", "/", "/", tspath.ComparePathsOptions{})
	sourceIndex := gen.AddSource("/main.ts")
	assert.Error(t, gen.AddNamedSourceMapping(0, 0, sourceIndex, 0, 0, -1), "nameIndex is out of range")
	assert.Error(t, gen.AddNamedSourceMapping(0, 0, sourceIndex, 0, 0, 0), "nameIndex is out of range")
}
