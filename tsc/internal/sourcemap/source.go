package sourcemap

import "github.com/microsoft/TypeScript/tsc/internal/core"

type Source interface {
	Text() string
	FileName() string
	ECMALineMap() []core.TextPos
}
