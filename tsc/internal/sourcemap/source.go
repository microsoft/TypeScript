package sourcemap

import (
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type Source interface {
	Text() string
	FileName() tspath.RootedFilePath
	ECMALineMap() []core.TextPos
}
