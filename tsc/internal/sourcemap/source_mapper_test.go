package sourcemap

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"gotest.tools/v3/assert"
)

type sourceMapperTestHost struct {
	files map[string]string
}

func (h *sourceMapperTestHost) UseCaseSensitiveFileNames() bool {
	return true
}

func (h *sourceMapperTestHost) GetECMALineInfo(fileName string) *ECMALineInfo {
	text, ok := h.files[fileName]
	if !ok {
		return nil
	}
	return CreateECMALineInfo(text, core.ComputeECMALineStarts(text))
}

func (h *sourceMapperTestHost) ReadFile(fileName string) (string, bool) {
	text, ok := h.files[fileName]
	return text, ok
}

func TestSourceMapperPreservesEmptySourceEntries(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[string]string{
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

	host := &sourceMapperTestHost{files: map[string]string{
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

	host := &sourceMapperTestHost{files: map[string]string{
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

func TestSourceMapperDistinguishesExplicitEmptySourceRoot(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[string]string{
		"/project/out/out.d.ts": "generated",
		"/":                     "empty source",
		"/a.ts":                 "named source",
	}}
	emptyMapper := convertDocumentToSourceMapper(
		host,
		`{"version":3,"file":"out.d.ts","sourceRoot":"","sources":[""],"names":[],"mappings":"AAAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, emptyMapper != nil)
	assert.DeepEqual(t, emptyMapper.GetSourcePosition(&DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	}), &DocumentPosition{
		FileName: "/",
		Pos:      0,
	})

	namedMapper := convertDocumentToSourceMapper(
		host,
		`{"version":3,"file":"out.d.ts","sourceRoot":"","sources":["a.ts"],"names":[],"mappings":"AAAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, namedMapper != nil)
	assert.DeepEqual(t, namedMapper.GetSourcePosition(&DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	}), &DocumentPosition{
		FileName: "/a.ts",
		Pos:      0,
	})
}

func TestSourceMapperSupportsLegacyExplicitEmptySourceRoot(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[string]string{
		"/project/out/out.d.ts": "generated",
		"/project/out/a.ts":     "legacy source",
	}}
	mapper := convertDocumentToSourceMapper(
		host,
		`{"version":3,"file":"out.d.ts","sourceRoot":"","sources":["a.ts"],"names":[],"mappings":"AAAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, mapper != nil)
	assert.DeepEqual(t, mapper.GetSourcePosition(&DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	}), &DocumentPosition{
		FileName: "/project/out/a.ts",
		Pos:      0,
	})
}

func TestSourceMapperDoesNotMapEmptySourceToMapFile(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[string]string{
		"/project/out/out.d.ts":     "generated",
		"/project/out/out.d.ts.map": "map",
	}}
	mapper := convertDocumentToSourceMapper(
		host,
		`{"version":3,"file":"out.d.ts","sourceRoot":"","sources":[""],"names":[],"mappings":"AAAA"}`,
		"/project/out/out.d.ts.map",
	)
	assert.Assert(t, mapper != nil)
	assert.Assert(t, mapper.GetSourcePosition(&DocumentPosition{
		FileName: "/project/out/out.d.ts",
		Pos:      0,
	}) == nil)
}

func TestSourceMapperRetainsDuplicateSourceIndices(t *testing.T) {
	t.Parallel()

	host := &sourceMapperTestHost{files: map[string]string{
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

	host := &sourceMapperTestHost{files: map[string]string{
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
