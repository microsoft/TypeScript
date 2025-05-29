package tsoptions

import (
	"slices"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type ParsedCommandLine struct {
	ParsedConfig *core.ParsedOptions `json:"parsedConfig"`

	ConfigFile    *TsConfigSourceFile `json:"configFile"` // TsConfigSourceFile, used in Program and ExecuteCommandLine
	Errors        []*ast.Diagnostic   `json:"errors"`
	Raw           any                 `json:"raw"`
	CompileOnSave *bool               `json:"compileOnSave"`
	// TypeAquisition *core.TypeAcquisition

	comparePathsOptions     tspath.ComparePathsOptions
	wildcardDirectoriesOnce sync.Once
	wildcardDirectories     map[string]bool
	extraFileExtensions     []FileExtensionInfo
}

// WildcardDirectories returns the cached wildcard directories, initializing them if needed
func (p *ParsedCommandLine) WildcardDirectories() map[string]bool {
	if p.wildcardDirectories != nil {
		return p.wildcardDirectories
	}

	p.wildcardDirectoriesOnce.Do(func() {
		p.wildcardDirectories = getWildcardDirectories(
			p.ConfigFile.configFileSpecs.validatedIncludeSpecs,
			p.ConfigFile.configFileSpecs.validatedExcludeSpecs,
			p.comparePathsOptions,
		)
	})

	return p.wildcardDirectories
}

// Normalized file names explicitly specified in `files`
func (p *ParsedCommandLine) LiteralFileNames() []string {
	if p.ConfigFile != nil {
		return p.FileNames()[0:len(p.ConfigFile.configFileSpecs.validatedFilesSpec)]
	}
	return nil
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

// All file names matched by files, include, and exclude patterns
func (p *ParsedCommandLine) FileNames() []string {
	return p.ParsedConfig.FileNames
}

func (p *ParsedCommandLine) ProjectReferences() []core.ProjectReference {
	return p.ParsedConfig.ProjectReferences
}

func (p *ParsedCommandLine) GetConfigFileParsingDiagnostics() []*ast.Diagnostic {
	if p.ConfigFile != nil {
		// todo: !!! should be ConfigFile.ParseDiagnostics, check if they are the same
		return slices.Concat(p.ConfigFile.SourceFile.Diagnostics(), p.Errors)
	}
	return p.Errors
}

// Porting reference: ProjectService.isMatchedByConfig
func (p *ParsedCommandLine) MatchesFileName(fileName string) bool {
	path := tspath.ToPath(fileName, p.comparePathsOptions.CurrentDirectory, p.comparePathsOptions.UseCaseSensitiveFileNames)
	if slices.ContainsFunc(p.FileNames(), func(f string) bool {
		return path == tspath.ToPath(f, p.comparePathsOptions.CurrentDirectory, p.comparePathsOptions.UseCaseSensitiveFileNames)
	}) {
		return true
	}

	if p.ConfigFile == nil {
		return false
	}

	if len(p.ConfigFile.configFileSpecs.validatedIncludeSpecs) == 0 {
		return false
	}

	supportedExtensions := GetSupportedExtensionsWithJsonIfResolveJsonModule(
		p.CompilerOptions(),
		GetSupportedExtensions(p.CompilerOptions(), p.extraFileExtensions),
	)

	if !tspath.FileExtensionIsOneOf(fileName, core.Flatten(supportedExtensions)) {
		return false
	}

	if p.ConfigFile.configFileSpecs.matchesExclude(fileName, p.comparePathsOptions) {
		return false
	}

	var allFileNames core.Set[tspath.Path]
	for _, fileName := range p.FileNames() {
		allFileNames.Add(tspath.ToPath(fileName, p.comparePathsOptions.CurrentDirectory, p.comparePathsOptions.UseCaseSensitiveFileNames))
	}

	if hasFileWithHigherPriorityExtension(string(path), supportedExtensions, func(fileName string) bool {
		return allFileNames.Has(tspath.Path(fileName))
	}) {
		return false
	}

	return p.ConfigFile.configFileSpecs.matchesInclude(fileName, p.comparePathsOptions)
}

func ReloadFileNamesOfParsedCommandLine(p *ParsedCommandLine, fs vfs.FS) *ParsedCommandLine {
	parsedConfig := *p.ParsedConfig
	parsedConfig.FileNames = getFileNamesFromConfigSpecs(
		*p.ConfigFile.configFileSpecs,
		p.comparePathsOptions.CurrentDirectory,
		p.CompilerOptions(),
		fs,
		p.extraFileExtensions,
	)
	parsedCommandLine := ParsedCommandLine{
		ParsedConfig:        &parsedConfig,
		ConfigFile:          p.ConfigFile,
		Errors:              p.Errors,
		Raw:                 p.Raw,
		CompileOnSave:       p.CompileOnSave,
		comparePathsOptions: p.comparePathsOptions,
		wildcardDirectories: p.wildcardDirectories,
		extraFileExtensions: p.extraFileExtensions,
	}
	return &parsedCommandLine
}
