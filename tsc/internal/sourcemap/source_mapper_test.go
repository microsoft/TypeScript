package sourcemap

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

type sourceMapperTestHost struct {
	files map[tspath.RootedFilePath]string
}

func (h *sourceMapperTestHost) CaseSensitivity() tspath.CaseSensitivity {
	return tspath.CaseSensitive
}

func (h *sourceMapperTestHost) GetECMALineInfo(fileName tspath.RootedFilePath) *ECMALineInfo {
	text, ok := h.files[fileName]
	if !ok {
		return nil
	}
	return CreateECMALineInfo(text, core.ComputeECMALineStarts(text))
}

func (h *sourceMapperTestHost) ReadFile(fileName tspath.RootedFilePath) (string, bool) {
	text, ok := h.files[fileName]
	return text, ok
}

func TestSourceMapperPreservesEmptySourceEntries(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[tspath.RootedFilePath]string{
		"/project/out/out.d.ts": "generated",
		"/project/src/real.ts":  "source",
	}}
	mapper := convertDocumentToSourceMapper(
		host,
		`{"version":3,"file":"out.d.ts","sourceRoot":"../src","sources":["","real.ts"],"names":[],"mappings":"ACAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, mapper != nil)
	assert.DeepEqual(t, mapper.GetSourcePosition(&DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	}), &DocumentPosition{
		FileName: "/project/src/real.ts",
		Pos:      0,
	})
	assert.DeepEqual(t, mapper.GetGeneratedPosition(&DocumentPosition{
		FileName: "/project/src/real.ts",
		Pos:      0,
	}), &DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	})
}

func TestSourceMapperResolvesEmptySourceToSourceRoot(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[tspath.RootedFilePath]string{
		"/project/out/out.d.ts": "generated",
		"/project/src":          "source",
	}}
	mapper := convertDocumentToSourceMapper(
		host,
		`{"version":3,"file":"out.d.ts","sourceRoot":"../src","sources":[""],"names":[],"mappings":"AAAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, mapper != nil)
	assert.DeepEqual(t, mapper.GetSourcePosition(&DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	}), &DocumentPosition{
		FileName: "/project/src",
		Pos:      0,
	})
}

func TestSourceMapperResolvesEmptySourceToMapURLWithoutSourceRoot(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[tspath.RootedFilePath]string{
		"/project/out/out.d.ts":     "generated",
		"/project/out/out.d.ts.map": "source",
	}}
	mapper := convertDocumentToSourceMapper(
		host,
		`{"version":3,"file":"out.d.ts","sources":[""],"names":[],"mappings":"AAAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, mapper != nil)
	assert.DeepEqual(t, mapper.GetSourcePosition(&DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	}), &DocumentPosition{
		FileName: "/project/out/out.d.ts.map",
		Pos:      0,
	})
}

func TestSourceMapperTreatsEmptySourceRootAsAbsent(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[tspath.RootedFilePath]string{
		"/project/out/out.d.ts":     "generated",
		"/project/out/out.d.ts.map": "map-relative empty source",
		"/project/out/a.ts":         "map-relative source",
		"/project/src/a.ts":         "parent-relative source",
		"/":                         "unrelated root",
		"/a.ts":                     "unrelated root source",
		"/missing.ts":               "unrelated root source",
	}}
	for _, test := range []struct {
		name     string
		source   string
		fileName tspath.RootedFilePath
	}{
		{"empty source", "", "/project/out/out.d.ts.map"},
		{"relative source", "a.ts", "/project/out/a.ts"},
		{"parent-relative source", "../src/a.ts", "/project/src/a.ts"},
		{"missing source", "missing.ts", ""},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			for _, root := range []struct {
				name  string
				field string
			}{
				{"absent", ""},
				{"empty", `"sourceRoot":"",`},
			} {
				t.Run(root.name, func(t *testing.T) {
					t.Parallel()
					mapper := convertDocumentToSourceMapper(
						host,
						`{"version":3,"file":"out.d.ts",`+root.field+`"sources":["`+test.source+`"],"names":[],"mappings":"AAAA"}`,
						"/project/out/out.d.ts.map",
					)
					assert.Assert(t, mapper != nil)
					sourcePosition := mapper.GetSourcePosition(&DocumentPosition{
						FileName: "/project/out/out.d.ts",
						Pos:      0,
					})
					if test.fileName == "" {
						assert.Assert(t, sourcePosition == nil)
						return
					}
					assert.DeepEqual(t, sourcePosition, &DocumentPosition{
						FileName: test.fileName,
						Pos:      0,
					})
					assert.DeepEqual(t, mapper.GetGeneratedPosition(&DocumentPosition{
						FileName: test.fileName,
						Pos:      0,
					}), &DocumentPosition{
						FileName: "/project/out/out.d.ts",
						Pos:      0,
					})
				})
			}
		})
	}
}

func TestSourceMapperPrefixesAbsoluteSourceWithNonemptySourceRoot(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[tspath.RootedFilePath]string{
		"/project/out/out.d.ts":    "generated",
		"/project/src/actual/a.ts": "prefixed source",
		"/actual/a.ts":             "unprefixed source",
	}}
	mapper := convertDocumentToSourceMapper(
		host,
		`{"version":3,"file":"out.d.ts","sourceRoot":"../src","sources":["/actual/a.ts"],"names":[],"mappings":"AAAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, mapper != nil)
	assert.DeepEqual(t, mapper.GetSourcePosition(&DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	}), &DocumentPosition{
		FileName: "/project/src/actual/a.ts",
		Pos:      0,
	})
}

func TestSourceMapperRetainsDuplicateSourceIndices(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[tspath.RootedFilePath]string{
		"/project/out/out.d.ts": "generated",
		"/project/src":          "source",
	}}
	mapper := convertDocumentToSourceMapper(
		host,
		`{"version":3,"file":"out.d.ts","sourceRoot":"../src","sources":["",""],"names":[],"mappings":"AAAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, mapper != nil)
	assert.DeepEqual(t, mapper.GetGeneratedPosition(&DocumentPosition{
		FileName: "/project/src",
		Pos:      0,
	}), &DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	})
}

func TestSourceMapperPreservesNullSourceEntries(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[tspath.RootedFilePath]string{
		"/project/out/out.d.ts": "generated",
		"/project/out/real.ts":  "source",
	}}
	mapper := convertDocumentToSourceMapper(
		host,
		`{"version":3,"file":"out.d.ts","sources":[null,"real.ts"],"names":[],"mappings":"ACAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, mapper != nil)
	assert.DeepEqual(t, mapper.GetSourcePosition(&DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	}), &DocumentPosition{
		FileName: "/project/out/real.ts",
		Pos:      0,
	})

	nullMapper := convertDocumentToSourceMapper(
		host,
		`{"version":3,"file":"out.d.ts","sources":[null],"names":[],"mappings":"AAAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, nullMapper != nil)
	assert.Assert(t, nullMapper.GetSourcePosition(&DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	}) == nil)
}

func TestSourceMapperIgnoresOutOfRangeSourceIndex(t *testing.T) {
	t.Parallel()

	mapper := convertDocumentToSourceMapper(
		&sourceMapperTestHost{},
		`{"version":3,"file":"out.d.ts","sources":["real.ts"],"names":[],"mappings":"ACAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, mapper != nil)
	assert.Assert(t, mapper.GetSourcePosition(&DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	}) == nil)
}

func TestSourceMapperIgnoresSourceURLSuffix(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[tspath.RootedFilePath]string{
		"/project/out/out.d.ts": "generated",
	}}
	mapper := convertDocumentToSourceMapper(
		host,
		`{"version":3,"file":"out.d.ts","sources":["https://example.com/source.ts?version=1"],"names":[],"mappings":"AAAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, mapper != nil)
	assert.Assert(t, mapper.GetSourcePosition(&DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	}) == nil)
}

func TestSourceMapperIgnoresExternalMapURLSuffix(t *testing.T) {
	t.Parallel()

	const generatedFile = "/project/out/out.d.ts"
	host := &sourceMapperTestHost{files: map[tspath.RootedFilePath]string{
		generatedFile: "declare const value: number;\n//# sourceMappingURL=https://example.com/out.d.ts.map?version=1",
	}}
	assert.Assert(t, GetDocumentPositionMapper(host, generatedFile) == nil)
}
