package ls

import (
	"github.com/microsoft/TypeScript/tsc/internal/ls/autoimport"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/pnp"
	"github.com/microsoft/TypeScript/tsc/internal/sourcemap"
)

type Host interface {
	PnpApi() *pnp.PnpApi
	UseCaseSensitiveFileNames() bool
	ReadFile(path string) (contents string, ok bool)
	Converters() *lsconv.Converters
	GetPreferences(activeFile string) lsutil.UserPreferences
	GetECMALineInfo(fileName string) *sourcemap.ECMALineInfo
	AutoImportRegistry() *autoimport.Registry

	// Used for module specifier completions.
	// ! Do not use for anything else, as this violates the principle that
	// the host is a snapshot-in-time.
	ReadDirectory(currentDir string, path string, extensions []string, excludes []string, includes []string, depth int) []string
	GetDirectories(path string) []string
	DirectoryExists(path string) bool
	FileExists(path string) bool
}
