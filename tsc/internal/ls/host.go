package ls

import (
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/sourcemap"
)

type Host interface {
	UseCaseSensitiveFileNames() bool
	ReadFile(path string) (contents string, ok bool)
	Converters() *Converters
	UserPreferences() *UserPreferences
	FormatOptions() *format.FormatCodeSettings
	GetECMALineInfo(fileName string) *sourcemap.ECMALineInfo
}
