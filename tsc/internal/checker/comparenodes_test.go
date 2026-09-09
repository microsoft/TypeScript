package checker

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

// Regression test for github.com/microsoft/TypeScript/issues/64203: a
// declaration whose source file isn't present in the program's
// fileIndexMap (e.g. a synthetic file from a custom host, or a
// content-mapper-produced supplemental file) was silently compared as if
// it were program file index 0 (a plain map lookup returns the zero value
// for a missing key), rather than being recognized as unindexed.
func TestCompareFileIndicesUnindexedFile(t *testing.T) {
	t.Parallel()

	parse := func(fileName, text string) *ast.SourceFile {
		return parser.ParseSourceFile(ast.SourceFileParseOptions{
			FileName: fileName,
			Path:     tspath.Path(fileName),
		}, text, core.ScriptKindTS)
	}

	file0 := parse("/file0.ts", "export const a = 1;")
	unindexedA := parse("/unindexed-a.ts", "export const b = 1;")
	unindexedB := parse("/unindexed-b.ts", "export const c = 1;")

	fileIndexMap := map[*ast.SourceFile]int{file0: 0}

	// An unindexed file must not silently compare as equal to (or, worse, "before")
	// the program's real file 0: it must be consistently ordered relative to indexed
	// files, not coincide with whichever file happens to occupy index 0.
	forward := compareFileIndices(fileIndexMap, file0, unindexedA)
	backward := compareFileIndices(fileIndexMap, unindexedA, file0)
	assert.Assert(t, forward != 0, "an indexed file must not compare equal to an unindexed file")
	assert.Equal(t, forward, -backward, "comparison must be antisymmetric")

	// Two different unindexed files must not silently compare as equal to each other
	// just because both fall back to the map's zero value.
	c1 := compareFileIndices(fileIndexMap, unindexedA, unindexedB)
	c2 := compareFileIndices(fileIndexMap, unindexedB, unindexedA)
	assert.Assert(t, c1 != 0, "two different unindexed files must not compare equal")
	assert.Equal(t, c1, -c2, "comparison must be antisymmetric")

	// Comparing a file against itself, indexed or not, must always match.
	assert.Equal(t, compareFileIndices(fileIndexMap, unindexedA, unindexedA), 0)
	assert.Equal(t, compareFileIndices(fileIndexMap, file0, file0), 0)

	// Two indexed files still compare by index, unaffected by this change.
	fileIndexMap[unindexedA] = 1
	assert.Assert(t, compareFileIndices(fileIndexMap, file0, unindexedA) < 0)
	assert.Assert(t, compareFileIndices(fileIndexMap, unindexedA, file0) > 0)
}
