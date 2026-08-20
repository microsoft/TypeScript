package ls

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ls/autoimport"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/sourcemap"
	"gotest.tools/v3/assert"
)

// caseInsensitiveHost is a minimal Host implementation for tests that only exercise
// case-insensitivity-dependent path logic; every other method panics if called.
type caseInsensitiveHost struct{}

func (caseInsensitiveHost) UseCaseSensitiveFileNames() bool { return false }
func (caseInsensitiveHost) ReadFile(path string) (string, bool) {
	panic("not implemented")
}
func (caseInsensitiveHost) Converters() *lsconv.Converters { panic("not implemented") }
func (caseInsensitiveHost) GetPreferences(activeFile string) lsutil.UserPreferences {
	panic("not implemented")
}

func (caseInsensitiveHost) GetECMALineInfo(fileName string) *sourcemap.ECMALineInfo {
	panic("not implemented")
}
func (caseInsensitiveHost) AutoImportRegistry() *autoimport.Registry { panic("not implemented") }
func (caseInsensitiveHost) ReadDirectory(currentDir string, path string, extensions []string, excludes []string, includes []string, depth int) []string {
	panic("not implemented")
}
func (caseInsensitiveHost) GetDirectories(path string) []string { panic("not implemented") }
func (caseInsensitiveHost) DirectoryExists(path string) bool    { panic("not implemented") }
func (caseInsensitiveHost) FileExists(path string) bool         { panic("not implemented") }

// TestCreatePathUpdaterCaseFoldingShrinksOldPath reproduces a panic that used to occur when
// createPathUpdater confirmed a case-insensitive directory match via tspath.StartsWithDirectory,
// then sliced the raw (non-canonicalized) file path using the raw byte length of oldPath. Each
// Kelvin sign '\u212A' below case-folds to the single-byte 'k', so the raw oldPath is longer in
// bytes (15) than path (12), even though path's canonical form is case-insensitively prefixed by
// oldPath's canonical form. Slicing path[len(oldPath):] used to panic with "slice bounds out of
// range [15:12]"; createPathUpdater must instead trim by rune count via
// tspath.TrimFilePathPrefix.
func TestCreatePathUpdaterCaseFoldingShrinksOldPath(t *testing.T) {
	t.Parallel()

	l := &LanguageService{host: caseInsensitiveHost{}}
	oldPath := "/a/\u212A\u212A\u212A\u212A"
	newPath := "/a/new"
	updater := l.createPathUpdater(oldPath, newPath)

	updated, ok := updater("/a/kkkk/x.ts")
	assert.Assert(t, ok)
	assert.Equal(t, updated, "/a/new/x.ts")
}
