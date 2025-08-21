package outputpaths

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type OutputPathsHost interface {
	CommonSourceDirectory() string
	GetCurrentDirectory() string
	UseCaseSensitiveFileNames() bool
}

type OutputPaths struct {
	jsFilePath          string
	sourceMapFilePath   string
	declarationFilePath string
	declarationMapPath  string
}

// DeclarationFilePath implements declarations.OutputPaths.
func (o *OutputPaths) DeclarationFilePath() string {
	return o.declarationFilePath
}

// JsFilePath implements declarations.OutputPaths.
func (o *OutputPaths) JsFilePath() string {
	return o.jsFilePath
}

func (o *OutputPaths) SourceMapFilePath() string {
	return o.sourceMapFilePath
}

func (o *OutputPaths) DeclarationMapPath() string {
	return o.declarationMapPath
}

func GetOutputPathsFor(sourceFile *ast.SourceFile, options *core.CompilerOptions, host OutputPathsHost, forceDtsEmit bool) *OutputPaths {
	// !!! bundle not implemented, may be deprecated
	ownOutputFilePath := getOwnEmitOutputFilePath(sourceFile.FileName(), options, host, GetOutputExtension(sourceFile.FileName(), options.Jsx))
	isJsonFile := ast.IsJsonSourceFile(sourceFile)
	// If json file emits to the same location skip writing it, if emitDeclarationOnly skip writing it
	isJsonEmittedToSameLocation := isJsonFile &&
		tspath.ComparePaths(sourceFile.FileName(), ownOutputFilePath, tspath.ComparePathsOptions{
			CurrentDirectory:          host.GetCurrentDirectory(),
			UseCaseSensitiveFileNames: host.UseCaseSensitiveFileNames(),
		}) == 0
	paths := &OutputPaths{}
	if options.EmitDeclarationOnly != core.TSTrue && !isJsonEmittedToSameLocation {
		paths.jsFilePath = ownOutputFilePath
		if !ast.IsJsonSourceFile(sourceFile) {
			paths.sourceMapFilePath = GetSourceMapFilePath(paths.jsFilePath, options)
		}
	}
	if forceDtsEmit || options.GetEmitDeclarations() && !isJsonFile {
		paths.declarationFilePath = GetDeclarationEmitOutputFilePath(sourceFile.FileName(), options, host)
		if options.GetAreDeclarationMapsEnabled() {
			paths.declarationMapPath = paths.declarationFilePath + ".map"
		}
	}
	return paths
}

func ForEachEmittedFile(host OutputPathsHost, options *core.CompilerOptions, action func(emitFileNames *OutputPaths, sourceFile *ast.SourceFile) bool, sourceFiles []*ast.SourceFile, forceDtsEmit bool) bool {
	for _, sourceFile := range sourceFiles {
		if action(GetOutputPathsFor(sourceFile, options, host, forceDtsEmit), sourceFile) {
			return true
		}
	}
	return false
}

func GetOutputJSFileName(inputFileName string, options *core.CompilerOptions, host OutputPathsHost) string {
	if options.EmitDeclarationOnly.IsTrue() {
		return ""
	}
	outputFileName := GetOutputJSFileNameWorker(inputFileName, options, host)
	if !tspath.FileExtensionIs(outputFileName, tspath.ExtensionJson) ||
		tspath.ComparePaths(inputFileName, outputFileName, tspath.ComparePathsOptions{
			CurrentDirectory:          host.GetCurrentDirectory(),
			UseCaseSensitiveFileNames: host.UseCaseSensitiveFileNames(),
		}) != 0 {
		return outputFileName
	}
	return ""
}

func GetOutputJSFileNameWorker(inputFileName string, options *core.CompilerOptions, host OutputPathsHost) string {
	return tspath.ChangeExtension(
		getOutputPathWithoutChangingExtension(inputFileName, options.OutDir, host),
		GetOutputExtension(inputFileName, options.Jsx),
	)
}

func GetOutputDeclarationFileNameWorker(inputFileName string, options *core.CompilerOptions, host OutputPathsHost) string {
	dir := options.DeclarationDir
	if len(dir) == 0 {
		dir = options.OutDir
	}
	return tspath.ChangeExtension(
		getOutputPathWithoutChangingExtension(inputFileName, dir, host),
		getDeclarationEmitExtensionForPath(inputFileName),
	)
}

func GetOutputExtension(fileName string, jsx core.JsxEmit) string {
	switch {
	case tspath.FileExtensionIs(fileName, tspath.ExtensionJson):
		return tspath.ExtensionJson
	case jsx == core.JsxEmitPreserve && tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionJsx, tspath.ExtensionTsx}):
		return tspath.ExtensionJsx
	case tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionMts, tspath.ExtensionMjs}):
		return tspath.ExtensionMjs
	case tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionCts, tspath.ExtensionCjs}):
		return tspath.ExtensionCjs
	default:
		return tspath.ExtensionJs
	}
}

func GetDeclarationEmitOutputFilePath(file string, options *core.CompilerOptions, host OutputPathsHost) string {
	var outputDir *string
	if len(options.DeclarationDir) > 0 {
		outputDir = &options.DeclarationDir
	} else if len(options.OutDir) > 0 {
		outputDir = &options.OutDir
	}

	var path string
	if outputDir != nil {
		path = GetSourceFilePathInNewDirWorker(file, *outputDir, host.GetCurrentDirectory(), host.CommonSourceDirectory(), host.UseCaseSensitiveFileNames())
	} else {
		path = file
	}
	declarationExtension := tspath.GetDeclarationEmitExtensionForPath(path)
	return tspath.RemoveFileExtension(path) + declarationExtension
}

func GetSourceFilePathInNewDir(fileName string, newDirPath string, currentDirectory string, commonSourceDirectory string, useCaseSensitiveFileNames bool) string {
	sourceFilePath := tspath.GetNormalizedAbsolutePath(fileName, currentDirectory)
	commonSourceDirectory = tspath.EnsureTrailingDirectorySeparator(commonSourceDirectory)
	isSourceFileInCommonSourceDirectory := tspath.ContainsPath(commonSourceDirectory, sourceFilePath, tspath.ComparePathsOptions{
		UseCaseSensitiveFileNames: useCaseSensitiveFileNames,
		CurrentDirectory:          currentDirectory,
	})
	if isSourceFileInCommonSourceDirectory {
		sourceFilePath = sourceFilePath[len(commonSourceDirectory):]
	}
	return tspath.CombinePaths(newDirPath, sourceFilePath)
}

func getOutputPathWithoutChangingExtension(inputFileName string, outputDirectory string, host OutputPathsHost) string {
	if len(outputDirectory) > 0 {
		return tspath.ResolvePath(outputDirectory, tspath.GetRelativePathFromDirectory(host.CommonSourceDirectory(), inputFileName, tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		}))
	}
	return inputFileName
}

func GetSourceFilePathInNewDirWorker(fileName string, newDirPath string, currentDirectory string, commonSourceDirectory string, useCaseSensitiveFileNames bool) string {
	sourceFilePath := tspath.GetNormalizedAbsolutePath(fileName, currentDirectory)
	commonDir := tspath.GetCanonicalFileName(commonSourceDirectory, useCaseSensitiveFileNames)
	canonFile := tspath.GetCanonicalFileName(sourceFilePath, useCaseSensitiveFileNames)
	isSourceFileInCommonSourceDirectory := strings.HasPrefix(canonFile, commonDir)
	if isSourceFileInCommonSourceDirectory {
		sourceFilePath = sourceFilePath[len(commonSourceDirectory):]
	}
	return tspath.CombinePaths(newDirPath, sourceFilePath)
}

func getOwnEmitOutputFilePath(fileName string, options *core.CompilerOptions, host OutputPathsHost, extension string) string {
	var emitOutputFilePathWithoutExtension string
	if len(options.OutDir) > 0 {
		currentDirectory := host.GetCurrentDirectory()
		emitOutputFilePathWithoutExtension = tspath.RemoveFileExtension(GetSourceFilePathInNewDir(
			fileName,
			options.OutDir,
			currentDirectory,
			host.CommonSourceDirectory(),
			host.UseCaseSensitiveFileNames(),
		))
	} else {
		emitOutputFilePathWithoutExtension = tspath.RemoveFileExtension(fileName)
	}
	return emitOutputFilePathWithoutExtension + extension
}

func GetSourceMapFilePath(jsFilePath string, options *core.CompilerOptions) string {
	if options.SourceMap.IsTrue() && !options.InlineSourceMap.IsTrue() {
		return jsFilePath + ".map"
	}
	return ""
}

func getDeclarationEmitExtensionForPath(fileName string) string {
	if tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionMjs, tspath.ExtensionMts}) {
		return tspath.ExtensionDmts
	} else if tspath.FileExtensionIsOneOf(fileName, []string{tspath.ExtensionCjs, tspath.ExtensionCts}) {
		return tspath.ExtensionDcts
	} else if tspath.FileExtensionIs(fileName, tspath.ExtensionJson) {
		return ".d.json.ts"
	}
	return tspath.ExtensionDts
}

func GetBuildInfoFileName(options *core.CompilerOptions, opts tspath.ComparePathsOptions) string {
	if !options.IsIncremental() && !options.Build.IsTrue() {
		return ""
	}
	if options.TsBuildInfoFile != "" {
		return options.TsBuildInfoFile
	}
	if options.ConfigFilePath == "" {
		return ""
	}
	configFileExtensionLess := tspath.RemoveFileExtension(options.ConfigFilePath)
	var buildInfoExtensionLess string
	if options.OutDir != "" {
		if options.RootDir != "" {
			buildInfoExtensionLess = tspath.ResolvePath(options.OutDir, tspath.GetRelativePathFromDirectory(options.RootDir, configFileExtensionLess, opts))
		} else {
			buildInfoExtensionLess = tspath.CombinePaths(options.OutDir, tspath.GetBaseFileName(configFileExtensionLess))
		}
	} else {
		buildInfoExtensionLess = configFileExtensionLess
	}
	return buildInfoExtensionLess + tspath.ExtensionTsBuildInfo
}
