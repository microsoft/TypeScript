package printer

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type SourceFileMetaDataProvider interface {
	GetSourceFileMetaData(path tspath.PathKey) *ast.SourceFileMetaData
}
