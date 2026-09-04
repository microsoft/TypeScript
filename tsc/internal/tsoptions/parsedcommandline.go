package tsoptions

import (
	"iter"
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/glob"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/outputpaths"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfsmatch"
)

const (
	fileGlobPattern          = "*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}"
	recursiveFileGlobPattern = "**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}"
)

// fileGlobPatterns returns the include file glob patterns for this command line, augmenting the
// built-in patterns with the extensions registered by its content mappers so that created
// content-mapped files are recognized as possible root files.
func (p *ParsedCommandLine) fileGlobPatterns() (fileGlob string, recursiveFileGlob string) {
	mapperExtensions := p.ContentMapperExtensions()
	if len(mapperExtensions) == 0 {
		return fileGlobPattern, recursiveFileGlobPattern
	}
	extensions := make([]string, 0, 9+len(mapperExtensions))
	extensions = append(extensions, "js", "jsx", "mjs", "cjs", "ts", "tsx", "mts", "cts", "json")
	for _, extension := range mapperExtensions {
		extensions = append(extensions, strings.TrimPrefix(extension, "."))
	}
	fileGlob = "*.{" + strings.Join(extensions, ",") + "}"
	return fileGlob, "**/" + fileGlob
}

type ParsedCommandLine struct {
	ParsedConfig *ParsedOptions `json:"parsedConfig"`

	ConfigFile    *TsConfigSourceFile `json:"configFile"` // TsConfigSourceFile, used in Program and ExecuteCommandLine
	Errors        []*ast.Diagnostic   `json:"errors"`
	Raw           any                 `json:"raw"`
	CompileOnSave *bool               `json:"compileOnSave"`

	configFileSpecs         *configFileSpecs
	baseDirectory           tspath.RootedDirectoryPath
	caseSensitivity         tspath.CaseSensitivity
	wildcardDirectoriesOnce sync.Once
	wildcardDirectories     map[tspath.RootedDirectoryPath]bool
	includeGlobsOnce        sync.Once
	includeGlobs            []*glob.Glob

	sourceAndOutputMapsOnce     sync.Once
	sourceToProjectReference    map[tspath.PathKey]*SourceOutputAndProjectReference
	outputDtsToProjectReference map[tspath.PathKey]*SourceOutputAndProjectReference

	commonSourceDirectory     tspath.RootedDirectoryPath
	commonSourceDirectoryOnce sync.Once

	resolvedProjectReferencePaths     []tspath.RootedFilePath
	resolvedProjectReferencePathsOnce sync.Once

	literalFileNamesLen         int
	rootFileNamesForDiagnostics []string
	filePaths                   *collections.Set[tspath.PathKey]
	filePathsOnce               sync.Once

	locale     locale.Locale
	localeOnce sync.Once
}

func NewParsedCommandLine(
	compilerOptions *core.CompilerOptions,
	rootFileNames []tspath.RootedFilePath,
	projectReferences []*core.ProjectReference,
	baseDirectory tspath.RootedDirectoryPath,
	caseSensitivity tspath.CaseSensitivity,
) *ParsedCommandLine {
	return &ParsedCommandLine{
		ParsedConfig: &ParsedOptions{
			CompilerOptions:   compilerOptions,
			FileNames:         rootFileNames,
			ProjectReferences: projectReferences,
		},
		baseDirectory:   baseDirectory,
		caseSensitivity: caseSensitivity,
	}
}

func (p *ParsedCommandLine) WithFileNames(fileNames []tspath.RootedFilePath) *ParsedCommandLine {
	parsedConfig := *p.ParsedConfig
	parsedConfig.FileNames = fileNames
	return &ParsedCommandLine{
		ParsedConfig:                &parsedConfig,
		ConfigFile:                  p.ConfigFile,
		Errors:                      p.Errors,
		Raw:                         p.Raw,
		CompileOnSave:               p.CompileOnSave,
		configFileSpecs:             p.configFileSpecs,
		baseDirectory:               p.baseDirectory,
		caseSensitivity:             p.caseSensitivity,
		wildcardDirectories:         p.wildcardDirectories,
		includeGlobs:                p.includeGlobs,
		literalFileNamesLen:         p.literalFileNamesLen,
		rootFileNamesForDiagnostics: p.rootFileNamesForDiagnostics,
	}
}

func (p *ParsedCommandLine) getConfigFileSpecs() *configFileSpecs {
	if p.configFileSpecs != nil {
		return p.configFileSpecs
	}
	if p.ConfigFile != nil {
		return p.ConfigFile.configFileSpecs
	}
	return nil
}

type SourceOutputAndProjectReference struct {
	Source        tspath.RootedFilePath
	SourcePath    tspath.PathKey
	OutputDts     tspath.RootedFilePath
	OutputDtsPath tspath.PathKey
	Resolved      *ParsedCommandLine
}

var (
	_ module.ResolvedProjectReference = (*ParsedCommandLine)(nil)
	_ outputpaths.OutputPathsHost     = (*ParsedCommandLine)(nil)
)

func (p *ParsedCommandLine) ConfigName() tspath.RootedFilePath {
	if p == nil || p.ConfigFile == nil {
		return ""
	}
	return p.ConfigFile.SourceFile.FileName()
}

func (p *ParsedCommandLine) ConfigFileName() tspath.RootedFilePath {
	if configName := p.ConfigName(); configName != "" {
		return configName
	}
	return p.CompilerOptions().ConfigFilePath
}

func (p *ParsedCommandLine) SourceToProjectReference() map[tspath.PathKey]*SourceOutputAndProjectReference {
	return p.sourceToProjectReference
}

func (p *ParsedCommandLine) OutputDtsToProjectReference() map[tspath.PathKey]*SourceOutputAndProjectReference {
	return p.outputDtsToProjectReference
}

func (p *ParsedCommandLine) ParseInputOutputNames() {
	p.sourceAndOutputMapsOnce.Do(func() {
		sourceToOutput := map[tspath.PathKey]*SourceOutputAndProjectReference{}
		outputDtsToSource := map[tspath.PathKey]*SourceOutputAndProjectReference{}

		for outputDtsFileName, sourceFileName := range p.getOutputDeclarationAndSourceFileNames() {
			projectReference := &SourceOutputAndProjectReference{
				Source:     sourceFileName,
				SourcePath: p.caseSensitivity.PathKey(tspath.RootedPath(sourceFileName)),
				OutputDts:  outputDtsFileName,
				Resolved:   p,
			}
			if outputDtsFileName != "" {
				projectReference.OutputDtsPath = p.caseSensitivity.PathKey(tspath.RootedPath(outputDtsFileName))
				outputDtsToSource[projectReference.OutputDtsPath] = projectReference
			}
			sourceToOutput[projectReference.SourcePath] = projectReference
		}
		p.outputDtsToProjectReference = outputDtsToSource
		p.sourceToProjectReference = sourceToOutput
	})
}

func (p *ParsedCommandLine) CommonSourceDirectory() tspath.RootedDirectoryPath {
	p.commonSourceDirectoryOnce.Do(func() {
		files := func() []tspath.RootedFilePath {
			return core.Filter(p.ParsedConfig.FileNames, func(file tspath.RootedFilePath) bool {
				return !(p.ParsedConfig.CompilerOptions.NoEmitForJsFiles.IsTrue() && file.HasJSFileExtension()) && !file.IsDeclarationFile()
			})
		}

		p.commonSourceDirectory = outputpaths.GetCommonSourceDirectory(
			p.ParsedConfig.CompilerOptions,
			files,
			p.BaseDirectory(),
			p.CaseSensitivity(),
			p.checkSourceFilesBelongToPath,
		)
	})
	return p.commonSourceDirectory
}

func (p *ParsedCommandLine) checkSourceFilesBelongToPath(sourceFiles []tspath.RootedFilePath, rootDirectory tspath.RootedDirectoryPath) bool {
	allFilesBelongToPath := true
	for _, file := range sourceFiles {
		if !p.caseSensitivity.ContainsFilePath(rootDirectory, file) {
			p.Errors = append(p.Errors, ast.NewCompilerDiagnostic(diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files, p.caseSensitivity.PathKey(tspath.RootedPath(file)), rootDirectory))
			allFilesBelongToPath = false
		}
	}

	return allFilesBelongToPath
}

func (p *ParsedCommandLine) BaseDirectory() tspath.RootedDirectoryPath {
	return p.baseDirectory
}

func (p *ParsedCommandLine) GetCurrentDirectory() tspath.RootedDirectoryPath {
	return p.baseDirectory
}

func (p *ParsedCommandLine) CaseSensitivity() tspath.CaseSensitivity {
	return p.caseSensitivity
}

func (p *ParsedCommandLine) getOutputDeclarationAndSourceFileNames() iter.Seq2[tspath.RootedFilePath, tspath.RootedFilePath] {
	return func(yield func(dtsName tspath.RootedFilePath, inputName tspath.RootedFilePath) bool) {
		for _, fileName := range p.ParsedConfig.FileNames {
			var outputDts tspath.RootedFilePath
			if !fileName.IsDeclarationFile() && !fileName.ExtensionIs(tspath.ExtensionJson) {
				outputDts = outputpaths.GetOutputDeclarationFileNameWorker(fileName, p.CompilerOptions(), p)
			}
			if !yield(outputDts, fileName) {
				return
			}
		}
	}
}

func (p *ParsedCommandLine) GetOutputFileNames() iter.Seq[tspath.RootedFilePath] {
	return func(yield func(outputName tspath.RootedFilePath) bool) {
		for _, fileName := range p.ParsedConfig.FileNames {
			if fileName.IsDeclarationFile() {
				continue
			}
			jsFileName := outputpaths.GetOutputJSFileName(fileName, p.CompilerOptions(), p)
			isJson := fileName.ExtensionIs(tspath.ExtensionJson)
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
				if !yield(dtsFileName) {
					return
				}
				if p.GetContentMapperForFileName(fileName) == nil && p.CompilerOptions().GetAreDeclarationMapsEnabled() {
					declarationMap := dtsFileName.AppendSuffix(".map")
					if !yield(declarationMap) {
						return
					}
				}
			}
		}
	}
}

func (p *ParsedCommandLine) GetBuildInfoFileName() tspath.RootedFilePath {
	return outputpaths.GetBuildInfoFileName(p.CompilerOptions(), p.caseSensitivity)
}

// WildcardDirectories returns the cached wildcard directories, initializing them if needed
func (p *ParsedCommandLine) WildcardDirectories() map[tspath.RootedDirectoryPath]bool {
	if p == nil {
		return nil
	}

	p.wildcardDirectoriesOnce.Do(func() {
		if p.wildcardDirectories == nil {
			specs := p.getConfigFileSpecs()
			p.wildcardDirectories = getWildcardDirectories(
				specs.validatedIncludeSpecs,
				specs.validatedExcludeSpecs,
				p.baseDirectory,
				p.caseSensitivity,
			)
		}
	})

	return p.wildcardDirectories
}

func (p *ParsedCommandLine) WildcardDirectoryGlobs() []*glob.Glob {
	wildcardDirectories := p.WildcardDirectories()
	if wildcardDirectories == nil {
		return nil
	}

	p.includeGlobsOnce.Do(func() {
		if p.includeGlobs == nil {
			fileGlob, recursiveFileGlob := p.fileGlobPatterns()
			globs := make([]*glob.Glob, 0, len(wildcardDirectories))
			for dir, recursive := range wildcardDirectories {
				pattern := tspath.CombinePaths(dir.AsString(), core.IfElse(recursive, recursiveFileGlob, fileGlob))
				if parsed, err := glob.Parse(pattern); err == nil {
					globs = append(globs, parsed)
				}
			}
			p.includeGlobs = globs
		}
	})

	return p.includeGlobs
}

// Normalized file names explicitly specified in `files`
func (p *ParsedCommandLine) LiteralFileNames() []tspath.RootedFilePath {
	if p != nil && p.ConfigFile != nil {
		return p.FileNames()[0:p.literalFileNamesLen]
	}
	return nil
}

func (p *ParsedCommandLine) SetParsedOptions(o *ParsedOptions) {
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
func (p *ParsedCommandLine) FileNames() []tspath.RootedFilePath {
	return p.ParsedConfig.FileNames
}

func (p *ParsedCommandLine) RootFileNameForDiagnostic(index int) string {
	if index < len(p.rootFileNamesForDiagnostics) {
		return p.rootFileNamesForDiagnostics[index]
	}
	return p.ParsedConfig.FileNames[index].AsString()
}

func (p *ParsedCommandLine) FilePaths() *collections.Set[tspath.PathKey] {
	p.filePathsOnce.Do(func() {
		p.filePaths = collections.NewSetWithSizeHint[tspath.PathKey](len(p.ParsedConfig.FileNames))
		for _, fileName := range p.ParsedConfig.FileNames {
			path := p.caseSensitivity.PathKey(tspath.RootedPath(fileName))
			p.filePaths.Add(path)
		}
	})
	return p.filePaths
}

func (p *ParsedCommandLine) ProjectReferences() []*core.ProjectReference {
	return p.ParsedConfig.ProjectReferences
}

func (p *ParsedCommandLine) ContentMappers() []*contentmapper.Mapper {
	if p == nil || p.ParsedConfig == nil {
		return nil
	}
	return p.ParsedConfig.ContentMappers
}

// ContentMapperExtensions returns the flattened list of file extensions registered by the
// config's content mappers.
func (p *ParsedCommandLine) ContentMapperExtensions() []string {
	return core.FlatMap(p.ContentMappers(), func(m *contentmapper.Mapper) []string {
		return m.Definition.Extensions
	})
}

// GetContentMapperForFileName returns the configured content mapper whose extensions include fileName,
// or nil if no content mapper is registered for the file's extension.
func (p *ParsedCommandLine) GetContentMapperForFileName(fileName tspath.RootedFilePath) *contentmapper.Mapper {
	caseSensitivity := p.CaseSensitivity()
	extension := fileName.LongestExtension(p.ContentMapperExtensions(), caseSensitivity)
	for _, mapper := range p.ContentMappers() {
		if slices.ContainsFunc(mapper.Definition.Extensions, func(mapperExtension string) bool {
			return extension == mapperExtension || caseSensitivity.IsCaseInsensitive() && strings.EqualFold(extension, mapperExtension)
		}) {
			return mapper
		}
	}
	return nil
}

func (p *ParsedCommandLine) ResolvedProjectReferencePaths() []tspath.RootedFilePath {
	p.resolvedProjectReferencePathsOnce.Do(func() {
		p.resolvedProjectReferencePaths = core.Map(p.ParsedConfig.ProjectReferences, core.ResolveProjectReferencePath)
	})
	return p.resolvedProjectReferencePaths
}

func (p *ParsedCommandLine) ExtendedSourceFiles() []tspath.RootedFilePath {
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

// PossiblyMatchesFileName is a fast check to see if a file is currently included by a config
// or would be included if the file were to be created. It may return false positives.
func (p *ParsedCommandLine) PossiblyMatchesFileName(fileName tspath.RootedFilePath) bool {
	path := p.caseSensitivity.PathKey(tspath.RootedPath(fileName))
	if p.FilePaths().Has(path) {
		return true
	}

	specs := p.getConfigFileSpecs()
	for _, include := range specs.validatedIncludeSpecs {
		text := include.AsString()
		if !strings.ContainsAny(text, "*?") && !vfsmatch.IsImplicitGlob(text) {
			includePath := p.CaseSensitivity().PathKey(tspath.ToRootedPath(text, p.BaseDirectory()))
			if includePath == path {
				return true
			}
		}
	}
	if p.GetContentMapperForFileName(fileName) != nil {
		directoryPath := path.Parent()
		if p.PossiblyMatchesDirectoryName(directoryPath) {
			return true
		}
	}
	if wildcardDirectoryGlobs := p.WildcardDirectoryGlobs(); len(wildcardDirectoryGlobs) > 0 {
		for _, glob := range wildcardDirectoryGlobs {
			if glob.Match(fileName.AsString()) {
				return true
			}
		}
	}
	return false
}

func (p *ParsedCommandLine) PossiblyMatchesDirectoryName(directoryPath tspath.PathKey) bool {
	for wildcardDir, recursive := range p.WildcardDirectories() {
		wildcardDirPath := p.caseSensitivity.PathKey(wildcardDir.AsPath())
		if recursive {
			if wildcardDirPath.ContainsPath(directoryPath) {
				return true
			}
		} else {
			if wildcardDirPath == directoryPath {
				return true
			}
		}
	}
	return false
}

func (p *ParsedCommandLine) GetMatchedFileSpec(fileName tspath.RootedFilePath) string {
	return p.getConfigFileSpecs().getMatchedFileSpec(p.caseSensitivity.PathKey(tspath.RootedPath(fileName))).AsString()
}

func (p *ParsedCommandLine) GetMatchedIncludeSpec(fileName tspath.RootedFilePath) (string, bool) {
	specs := p.getConfigFileSpecs()
	if len(specs.validatedIncludeSpecs) == 0 {
		return "", false
	}

	if specs.isDefaultIncludeSpec {
		return specs.validatedIncludeSpecs[0].AsString(), true
	}

	return specs.getMatchedIncludeSpec(fileName, p.baseDirectory, p.caseSensitivity).AsString(), false
}

func (p *ParsedCommandLine) ReloadFileNamesOfParsedCommandLine(fs vfs.FS) *ParsedCommandLine {
	parsedConfig := *p.ParsedConfig
	fileNames, literalFileNamesLen := getFileNamesFromConfigSpecs(
		*p.getConfigFileSpecs(),
		p.BaseDirectory(),
		p.CompilerOptions(),
		fs,
		p.ContentMapperExtensions(),
	)
	parsedConfig.FileNames = fileNames
	parsedCommandLine := ParsedCommandLine{
		ParsedConfig:                &parsedConfig,
		ConfigFile:                  p.ConfigFile,
		Errors:                      p.Errors,
		Raw:                         p.Raw,
		CompileOnSave:               p.CompileOnSave,
		configFileSpecs:             p.configFileSpecs,
		baseDirectory:               p.baseDirectory,
		caseSensitivity:             p.caseSensitivity,
		wildcardDirectories:         p.wildcardDirectories,
		includeGlobs:                p.includeGlobs,
		literalFileNamesLen:         literalFileNamesLen,
		rootFileNamesForDiagnostics: p.rootFileNamesForDiagnostics,
	}
	return &parsedCommandLine
}

func (p *ParsedCommandLine) Locale() locale.Locale {
	p.localeOnce.Do(func() {
		p.locale, _ = locale.Parse(p.CompilerOptions().Locale)
	})
	return p.locale
}
