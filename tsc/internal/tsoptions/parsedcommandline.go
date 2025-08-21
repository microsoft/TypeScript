package tsoptions

import (
	"iter"
	"slices"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/outputpaths"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type ParsedCommandLine struct {
	ParsedConfig *core.ParsedOptions `json:"parsedConfig"`

	ConfigFile    *TsConfigSourceFile `json:"configFile"` // TsConfigSourceFile, used in Program and ExecuteCommandLine
	Errors        []*ast.Diagnostic   `json:"errors"`
	Raw           any                 `json:"raw"`
	CompileOnSave *bool               `json:"compileOnSave"`

	comparePathsOptions     tspath.ComparePathsOptions
	wildcardDirectoriesOnce sync.Once
	wildcardDirectories     map[string]bool
	extraFileExtensions     []FileExtensionInfo

	sourceAndOutputMapsOnce     sync.Once
	sourceToProjectReference    map[tspath.Path]*SourceOutputAndProjectReference
	outputDtsToProjectReference map[tspath.Path]*SourceOutputAndProjectReference

	commonSourceDirectory     string
	commonSourceDirectoryOnce sync.Once

	resolvedProjectReferencePaths     []string
	resolvedProjectReferencePathsOnce sync.Once

	fileNamesByPath     map[tspath.Path]string // maps file names to their paths, used for quick lookups
	fileNamesByPathOnce sync.Once
}

func NewParsedCommandLine(
	compilerOptions *core.CompilerOptions,
	rootFileNames []string,
	comparePathsOptions tspath.ComparePathsOptions,
) *ParsedCommandLine {
	return &ParsedCommandLine{
		ParsedConfig: &core.ParsedOptions{
			CompilerOptions: compilerOptions,
			FileNames:       rootFileNames,
		},
		comparePathsOptions: comparePathsOptions,
	}
}

type SourceOutputAndProjectReference struct {
	Source    string
	OutputDts string
	Resolved  *ParsedCommandLine
}

var (
	_ module.ResolvedProjectReference = (*ParsedCommandLine)(nil)
	_ outputpaths.OutputPathsHost     = (*ParsedCommandLine)(nil)
)

func (p *ParsedCommandLine) ConfigName() string {
	if p == nil {
		return ""
	}
	return p.ConfigFile.SourceFile.FileName()
}

func (p *ParsedCommandLine) SourceToProjectReference() map[tspath.Path]*SourceOutputAndProjectReference {
	return p.sourceToProjectReference
}

func (p *ParsedCommandLine) OutputDtsToProjectReference() map[tspath.Path]*SourceOutputAndProjectReference {
	return p.outputDtsToProjectReference
}

func (p *ParsedCommandLine) ParseInputOutputNames() {
	p.sourceAndOutputMapsOnce.Do(func() {
		sourceToOutput := map[tspath.Path]*SourceOutputAndProjectReference{}
		outputDtsToSource := map[tspath.Path]*SourceOutputAndProjectReference{}

		for outputDts, source := range p.GetOutputDeclarationFileNames() {
			path := tspath.ToPath(source, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
			projectReference := &SourceOutputAndProjectReference{
				Source:    source,
				OutputDts: outputDts,
				Resolved:  p,
			}
			if outputDts != "" {
				outputDtsToSource[tspath.ToPath(outputDts, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())] = projectReference
			}
			sourceToOutput[path] = projectReference
		}
		p.outputDtsToProjectReference = outputDtsToSource
		p.sourceToProjectReference = sourceToOutput
	})
}

func (p *ParsedCommandLine) CommonSourceDirectory() string {
	p.commonSourceDirectoryOnce.Do(func() {
		p.commonSourceDirectory = outputpaths.GetCommonSourceDirectory(
			p.ParsedConfig.CompilerOptions,
			func() []string {
				return core.Filter(
					p.ParsedConfig.FileNames,
					func(file string) bool {
						return !(p.ParsedConfig.CompilerOptions.NoEmitForJsFiles.IsTrue() && tspath.HasJSFileExtension(file)) &&
							!tspath.IsDeclarationFileName(file)
					})
			},
			p.GetCurrentDirectory(),
			p.UseCaseSensitiveFileNames(),
		)
	})
	return p.commonSourceDirectory
}

func (p *ParsedCommandLine) GetCurrentDirectory() string {
	return p.comparePathsOptions.CurrentDirectory
}

func (p *ParsedCommandLine) UseCaseSensitiveFileNames() bool {
	return p.comparePathsOptions.UseCaseSensitiveFileNames
}

func (p *ParsedCommandLine) GetOutputDeclarationFileNames() iter.Seq2[string, string] {
	return func(yield func(dtsName string, inputName string) bool) {
		for _, fileName := range p.ParsedConfig.FileNames {
			if tspath.IsDeclarationFileName(fileName) {
				continue
			}
			var outputDts string
			if !tspath.FileExtensionIs(fileName, tspath.ExtensionJson) {
				outputDts = outputpaths.GetOutputDeclarationFileNameWorker(fileName, p.CompilerOptions(), p)
			}
			if !yield(outputDts, fileName) {
				return
			}
		}
	}
}

func (p *ParsedCommandLine) GetOutputFileNames() iter.Seq[string] {
	return func(yield func(outputName string) bool) {
		for _, fileName := range p.ParsedConfig.FileNames {
			if tspath.IsDeclarationFileName(fileName) {
				continue
			}
			jsFileName := outputpaths.GetOutputJSFileName(fileName, p.CompilerOptions(), p)
			isJson := tspath.FileExtensionIs(fileName, tspath.ExtensionJson)
			if jsFileName != "" {
				if !yield(jsFileName) {
					return
				}
				if !isJson {
					sourceMap := outputpaths.GetSourceMapFilePath(jsFileName, p.CompilerOptions())
					if sourceMap != "" {
						if !yield(sourceMap) {
							return
						}
					}
				}
			}
			if isJson {
				continue
			}
			if p.CompilerOptions().GetEmitDeclarations() {
				dtsFileName := outputpaths.GetOutputDeclarationFileNameWorker(fileName, p.CompilerOptions(), p)
				if dtsFileName != "" {
					if !yield(dtsFileName) {
						return
					}
					if p.CompilerOptions().GetAreDeclarationMapsEnabled() {
						declarationMap := dtsFileName + ".map"
						if !yield(declarationMap) {
							return
						}
					}
				}
			}
		}
	}
}

func (p *ParsedCommandLine) GetBuildInfoFileName() string {
	return outputpaths.GetBuildInfoFileName(p.CompilerOptions(), p.comparePathsOptions)
}

// WildcardDirectories returns the cached wildcard directories, initializing them if needed
func (p *ParsedCommandLine) WildcardDirectories() map[string]bool {
	if p == nil {
		return nil
	}

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
	if p != nil && p.ConfigFile != nil {
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
	if p == nil {
		return nil
	}
	return p.ParsedConfig.CompilerOptions
}

func (p *ParsedCommandLine) SetTypeAcquisition(o *core.TypeAcquisition) {
	p.ParsedConfig.TypeAcquisition = o
}

func (p *ParsedCommandLine) TypeAcquisition() *core.TypeAcquisition {
	return p.ParsedConfig.TypeAcquisition
}

// All file names matched by files, include, and exclude patterns
func (p *ParsedCommandLine) FileNames() []string {
	return p.ParsedConfig.FileNames
}

func (p *ParsedCommandLine) FileNamesByPath() map[tspath.Path]string {
	p.fileNamesByPathOnce.Do(func() {
		p.fileNamesByPath = make(map[tspath.Path]string, len(p.ParsedConfig.FileNames))
		for _, fileName := range p.ParsedConfig.FileNames {
			path := tspath.ToPath(fileName, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
			p.fileNamesByPath[path] = fileName
		}
	})
	return p.fileNamesByPath
}

func (p *ParsedCommandLine) ProjectReferences() []*core.ProjectReference {
	return p.ParsedConfig.ProjectReferences
}

func (p *ParsedCommandLine) ResolvedProjectReferencePaths() []string {
	p.resolvedProjectReferencePathsOnce.Do(func() {
		p.resolvedProjectReferencePaths = core.Map(p.ParsedConfig.ProjectReferences, core.ResolveProjectReferencePath)
	})
	return p.resolvedProjectReferencePaths
}

func (p *ParsedCommandLine) ExtendedSourceFiles() []string {
	if p == nil || p.ConfigFile == nil {
		return nil
	}
	return p.ConfigFile.ExtendedSourceFiles
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
	path := tspath.ToPath(fileName, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
	if slices.ContainsFunc(p.FileNames(), func(f string) bool {
		return path == tspath.ToPath(f, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
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

	var allFileNames collections.Set[tspath.Path]
	for _, fileName := range p.FileNames() {
		allFileNames.Add(tspath.ToPath(fileName, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames()))
	}

	if hasFileWithHigherPriorityExtension(string(path), supportedExtensions, func(fileName string) bool {
		return allFileNames.Has(tspath.Path(fileName))
	}) {
		return false
	}

	return p.ConfigFile.configFileSpecs.getMatchedIncludeSpec(fileName, p.comparePathsOptions) != ""
}

func (p *ParsedCommandLine) GetMatchedFileSpec(fileName string) string {
	return p.ConfigFile.configFileSpecs.getMatchedFileSpec(fileName, p.comparePathsOptions)
}

func (p *ParsedCommandLine) GetMatchedIncludeSpec(fileName string) (string, bool) {
	if len(p.ConfigFile.configFileSpecs.validatedIncludeSpecs) == 0 {
		return "", false
	}

	if p.ConfigFile.configFileSpecs.isDefaultIncludeSpec {
		return p.ConfigFile.configFileSpecs.validatedIncludeSpecs[0], true
	}

	return p.ConfigFile.configFileSpecs.getMatchedIncludeSpec(fileName, p.comparePathsOptions), false
}

func (p *ParsedCommandLine) ReloadFileNamesOfParsedCommandLine(fs vfs.FS) *ParsedCommandLine {
	parsedConfig := *p.ParsedConfig
	parsedConfig.FileNames = getFileNamesFromConfigSpecs(
		*p.ConfigFile.configFileSpecs,
		p.GetCurrentDirectory(),
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
