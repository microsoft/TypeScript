package outputpaths_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/outputpaths"
	"gotest.tools/v3/assert"
)

func TestGetSourceFilePathInNewDirSourceMatchesCommonDirectory(t *testing.T) {
	t.Parallel()

	actual := outputpaths.GetSourceFilePathInNewDir("/project/src", "/project/out", "/project", "/project/src/", true)
	assert.Equal(t, actual, "/project/src")
}

func TestGetSourceFilePathInNewDirCanonicalizationShrinksCommonDirectory(t *testing.T) {
	t.Parallel()

	// Each Kelvin sign '\u212A' case-folds to the single-byte 'k', so the raw
	// (non-canonicalized) commonSourceDirectory is longer, in bytes, than the source
	// file path it's a case-insensitive prefix of, even though the file path itself
	// is longer overall once its own (already-lowercase) suffix is included.
	// Slicing sourceFilePath by len(commonSourceDirectory) bytes would still panic
	// here ([14:11]); this must clamp per-rune instead, like the reference
	// implementation's substring does.
	actual := outputpaths.GetSourceFilePathInNewDir("/kkkk/a.ts", "/out", "/", "/\u212A\u212A\u212A\u212A/", false)
	assert.Equal(t, actual, "/out/a.ts")
}
