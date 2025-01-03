package tsoptions

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

type ParsedCommandLine struct {
	Options *core.ParsedOptions
	// ConfigFile    *ast.SourceFile  // used in Program and ExecuteCommandLine
	Errors        []*ast.Diagnostic
	Raw           any
	CompileOnSave *bool
}
