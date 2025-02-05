package tsoptions

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

type ParsedCommandLine struct {
	ParsedConfig *core.ParsedOptions

	ConfigFile *ast.SourceFile // TsConfigSourceFile, used in Program and ExecuteCommandLine
	Errors     []*ast.Diagnostic
	Raw        any
	// WildcardDirectories map[string]watchDirectoryFlags
	CompileOnSave *bool
	// TypeAquisition *core.TypeAcquisition
}

func (p *ParsedCommandLine) SetParsedOptions(o *core.ParsedOptions) {
	p.ParsedConfig = o
}

func (p *ParsedCommandLine) SetCompilerOptions(o *core.CompilerOptions) {
	p.ParsedConfig.CompilerOptions = o
}

func (p *ParsedCommandLine) CompilerOptions() *core.CompilerOptions {
	return p.ParsedConfig.CompilerOptions
}

func (p *ParsedCommandLine) FileNames() []string {
	return p.ParsedConfig.FileNames
}

func (p *ParsedCommandLine) ProjectReferences() []core.ProjectReference {
	return p.ParsedConfig.ProjectReferences
}

func (p *ParsedCommandLine) GetConfigFileParsingDiagnostics() []*ast.Diagnostic {
	if p.ConfigFile != nil {
		// todo: !!! should be ConfigFile.ParseDiagnostics, check if they are the same
		return slices.Concat(p.ConfigFile.Diagnostics(), p.Errors)
	}
	return p.Errors
}
