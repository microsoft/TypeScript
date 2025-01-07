package tsoptions

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

// todo: used in executeCommandLine
type ParsedCommandLine struct {
	options *core.ParsedOptions
	// WatchOptions WatchOptions

	ConfigFile *ast.SourceFile // TsConfigSourceFile, used in Program and ExecuteCommandLine
	Errors     []*ast.Diagnostic
	Raw        any
	// WildcardDirectories map[string]watchDirectoryFlags
	CompileOnSave *bool
	// TypeAquisition *core.TypeAcquisition
}

func NewParsedCommandLine(
	options *core.ParsedOptions,
	configFile *ast.SourceFile,
	errors []*ast.Diagnostic,
	raw any,
	compileOnSave *bool,
) ParsedCommandLine {
	return ParsedCommandLine{
		options:       options,
		ConfigFile:    configFile,
		Errors:        errors,
		Raw:           raw,
		CompileOnSave: compileOnSave,
	}
}

func (p *ParsedCommandLine) SetParsedOptions(o *core.ParsedOptions) {
	p.options = o
}

func (p *ParsedCommandLine) SetCompilerOptions(o *core.CompilerOptions) {
	p.options.CompilerOptions = o
}

func (p *ParsedCommandLine) CompilerOptions() *core.CompilerOptions {
	return p.options.CompilerOptions
}

func (p *ParsedCommandLine) FileNames() []string {
	return p.options.FileNames
}

func (p *ParsedCommandLine) ProjectReferences() []core.ProjectReference {
	return p.options.ProjectReferences
}

func (p *ParsedCommandLine) GetConfigFileParsingDiagnostics() []*ast.Diagnostic {
	if p.ConfigFile != nil {
		// todo: !!! should be ConfigFile.ParseDiagnostics, check if they are the same
		return slices.Concat(p.ConfigFile.Diagnostics(), p.Errors)
	}
	return p.Errors
}
