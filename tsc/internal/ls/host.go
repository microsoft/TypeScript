package ls

import (
	"github.com/microsoft/typescript-go/internal/ls/autoimport"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/sourcemap"
)

type Host interface {
	UseCaseSensitiveFileNames() bool
	ReadFile(path string) (contents string, ok bool)
	Converters() *lsconv.Converters
	GetPreferences(activeFile string) *lsutil.UserPreferences
	GetECMALineInfo(fileName string) *sourcemap.ECMALineInfo
	AutoImportRegistry() *autoimport.Registry
}
