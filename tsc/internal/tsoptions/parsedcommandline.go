package tsoptions

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

// todo: used in executeCommandLine
type ParsedCommandLine struct {
	Options *core.ParsedOptions
	// WatchOptions WatchOptions

	ConfigFile *ast.SourceFile // TsConfigSourceFile, used in Program and ExecuteCommandLine
	Errors     []*ast.Diagnostic
	Raw        any
	// WildcardDirectories map[string]watchDirectoryFlags
	CompileOnSave *bool
	// TypeAquisition *core.TypeAcquisition
}

func (p *ParsedCommandLine) GetConfigFileParsingDiagnostics() []*ast.Diagnostic {
	if p.ConfigFile != nil {
		// todo: !!! should be ConfigFile.ParseDiagnostics, check if they are the same
		return slices.Concat(p.ConfigFile.Diagnostics(), p.Errors)
	}
	return p.Errors
}
