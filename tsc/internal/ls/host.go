package ls

import (
	"github.com/microsoft/TypeScript/tsc/internal/ls/autoimport"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/sourcemap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type Host interface {
	CaseSensitivity() tspath.CaseSensitivity
	ReadFile(path tspath.RootedFilePath) (contents string, ok bool)
	Converters() *lsconv.Converters
	GetPreferences(activeFile string) lsutil.UserPreferences
	GetECMALineInfo(fileName tspath.RootedFilePath) *sourcemap.ECMALineInfo
	AutoImportRegistry() *autoimport.Registry

	// Used for module specifier completions.
	// ! Do not use for anything else, as this violates the principle that
	// the host is a snapshot-in-time.
	ReadDirectory(path tspath.RootedDirectoryPath, extensions []string, excludes []string, includes []string, depth int) []tspath.RootedFilePath
	GetDirectories(path tspath.RootedDirectoryPath) []string
	DirectoryExists(path tspath.RootedDirectoryPath) bool
	FileExists(path tspath.RootedFilePath) bool
}
