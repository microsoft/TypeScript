package ls

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ls/autoimport"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/sourcemap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

// caseInsensitiveHost is a minimal Host implementation for tests that only exercise
// case-insensitivity-dependent path logic; every other method panics if called.
type caseInsensitiveHost struct{}

func (caseInsensitiveHost) CaseSensitivity() tspath.CaseSensitivity { return tspath.CaseInsensitive }

func (caseInsensitiveHost) ReadFile(path tspath.RootedFilePath) (string, bool) {
	panic("not implemented")
}
func (caseInsensitiveHost) Converters() *lsconv.Converters { panic("not implemented") }
func (caseInsensitiveHost) GetPreferences(activeFile string) lsutil.UserPreferences {
	panic("not implemented")
}

func (caseInsensitiveHost) GetECMALineInfo(fileName tspath.RootedFilePath) *sourcemap.ECMALineInfo {
	panic("not implemented")
}
func (caseInsensitiveHost) AutoImportRegistry() *autoimport.Registry { panic("not implemented") }
func (caseInsensitiveHost) ReadDirectory(path tspath.RootedDirectoryPath, extensions []string, excludes []string, includes []string, depth int) []tspath.RootedFilePath {
	panic("not implemented")
}

func (caseInsensitiveHost) GetDirectories(path tspath.RootedDirectoryPath) []string {
	panic("not implemented")
}

func (caseInsensitiveHost) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	panic("not implemented")
}

func (caseInsensitiveHost) FileExists(path tspath.RootedFilePath) bool { panic("not implemented") }

func TestTryRemoveIndexFileName(t *testing.T) {
	t.Parallel()

	assert.Equal(t, tryRemoveIndexFileName(tspath.RootedFilePathFromNormalized("/project/index.ts")), tspath.RootedPathFromNormalized("/project"))
	assert.Equal(t, tryRemoveIndexFileName(tspath.RootedFilePathFromNormalized("/index.ts")), tspath.RootedPath(""))
	assert.Equal(t, tryRemoveIndexFileName(tspath.RootedFilePathFromNormalized("c:/index.ts")), tspath.RootedPathFromNormalized("c:/"))
	assert.Equal(t, tryRemoveIndexFileName(tspath.RootedFilePathFromNormalized("^/index.ts")), tspath.RootedPath(""))
}

// TestCreatePathUpdaterCaseFoldingShrinksOldPath verifies that a case-insensitive
// descendant update does not depend on the byte lengths of differently-cased paths.
func TestCreatePathUpdaterCaseFoldingShrinksOldPath(t *testing.T) {
	t.Parallel()

	l := &LanguageService{host: caseInsensitiveHost{}}
	oldPath := tspath.RootedFilePathFromNormalized("/a/\u212A\u212A\u212A\u212A")
	newPath := tspath.RootedFilePathFromNormalized("/a/new")
	updater := l.createPathUpdater(
		tspath.RootedPath(oldPath),
		tspath.RootedPath(newPath),
	)

	updated, ok := updater(tspath.RootedFilePathFromNormalized("/a/kkkk/x.ts"))
	assert.Assert(t, ok)
	assert.Equal(t, updated, tspath.RootedFilePathFromNormalized("/a/new/x.ts"))
}
