package outputpaths

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type OutputPathsHost interface {
	CommonSourceDirectory() tspath.RootedDirectoryPath
	ContentMapperExtensions() []string
	CaseSensitivity() tspath.CaseSensitivity
}

type OutputPaths struct {
	jsFilePath          tspath.RootedFilePath
	sourceMapFilePath   tspath.RootedFilePath
	declarationFilePath tspath.RootedFilePath
	declarationMapPath  tspath.RootedFilePath
}

// DeclarationFilePath implements declarations.OutputPaths.
func (o *OutputPaths) DeclarationFilePath() tspath.RootedFilePath {
	return o.declarationFilePath
}

// JsFilePath implements declarations.OutputPaths.
func (o *OutputPaths) JsFilePath() tspath.RootedFilePath {
	return o.jsFilePath
}

func (o *OutputPaths) SourceMapFilePath() tspath.RootedFilePath {
	return o.sourceMapFilePath
}

func (o *OutputPaths) DeclarationMapPath() tspath.RootedFilePath {
	return o.declarationMapPath
}

type ForceEmitPaths struct {
	Dts            bool
	Js             bool
	DeclarationMap bool
}

func GetOutputPathsFor(sourceFile *ast.SourceFile, options *core.CompilerOptions, host OutputPathsHost, force ForceEmitPaths) *OutputPaths {
	fileName := sourceFile.FileName()
	ownOutputFilePath := getOwnEmitOutputFilePathForFileName(fileName, options, host, GetOutputExtensionForFileName(fileName, options.Jsx))
	isJsonFile := ast.IsJsonSourceFile(sourceFile)
	// If json file emits to the same location skip writing it, if emitDeclarationOnly skip writing it
	isJsonEmittedToSameLocation := isJsonFile &&
		host.CaseSensitivity().CompareFilePaths(fileName, ownOutputFilePath) == 0
	paths := &OutputPaths{}
	if sourceFile.ContentMapper() == "" && (force.Js || options.EmitDeclarationOnly != core.TSTrue) && !isJsonEmittedToSameLocation {
		paths.jsFilePath = ownOutputFilePath
		if !ast.IsJsonSourceFile(sourceFile) {
			paths.sourceMapFilePath = GetSourceMapFilePath(paths.jsFilePath, options)
		}
	}
	if force.Dts || options.GetEmitDeclarations() && !isJsonFile {
		paths.declarationFilePath = getDeclarationEmitOutputFilePathForFileName(fileName, options, host)
		if options.GetAreDeclarationMapsEnabled() || force.DeclarationMap && options.DeclarationMap.IsTrue() {
			paths.declarationMapPath = paths.declarationFilePath.AppendSuffix(".map")
		}
	}
	return paths
}

func ForEachEmittedFile(host OutputPathsHost, options *core.CompilerOptions, action func(emitFileNames *OutputPaths, sourceFile *ast.SourceFile) bool, sourceFiles []*ast.SourceFile, forceDtsEmit bool) bool {
	for _, sourceFile := range sourceFiles {
		if action(GetOutputPathsFor(sourceFile, options, host, ForceEmitPaths{Dts: forceDtsEmit}), sourceFile) {
			return true
		}
	}
	return false
}

func GetOutputJSFileName(inputFileName tspath.RootedFilePath, options *core.CompilerOptions, host OutputPathsHost) tspath.RootedFilePath {
	if options.EmitDeclarationOnly.IsTrue() || isContentMappedFileName(inputFileName, host) {
		return ""
	}
	outputFileName := GetOutputJSFileNameWorker(inputFileName, options, host)
	if !outputFileName.ExtensionIs(tspath.ExtensionJson) ||
		host.CaseSensitivity().CompareFilePaths(inputFileName, outputFileName) != 0 {
		return outputFileName
	}

	return ""
}

func isContentMappedFileName(fileName tspath.RootedFilePath, host OutputPathsHost) bool {
	return fileName.LongestExtension(host.ContentMapperExtensions(), host.CaseSensitivity()) != ""
}

func GetOutputJSFileNameWorker(inputFileName tspath.RootedFilePath, options *core.CompilerOptions, host OutputPathsHost) tspath.RootedFilePath {
	return getOutputFileNameWithoutChangingExtension(inputFileName, options.OutDir, host).
		ChangeExtension(GetOutputExtensionForFileName(inputFileName, options.Jsx))
}

func GetOutputDeclarationFileNameWorker(inputFileName tspath.RootedFilePath, options *core.CompilerOptions, host OutputPathsHost) tspath.RootedFilePath {
	dir := options.DeclarationDir
	if len(dir) == 0 {
		dir = options.OutDir
	}
	path := getOutputFileNameWithoutChangingExtension(inputFileName, dir, host)
	return ChangeToDeclarationExtension(path, host)
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

func GetOutputExtensionForFileName(fileName tspath.RootedFilePath, jsx core.JsxEmit) string {
	return GetOutputExtension(fileName.AsString(), jsx)
}

func getDeclarationEmitOutputFilePathForFileName(file tspath.RootedFilePath, options *core.CompilerOptions, host OutputPathsHost) tspath.RootedFilePath {
	var outputDir tspath.RootedDirectoryPath
	if len(options.DeclarationDir) > 0 {
		outputDir = options.DeclarationDir
	} else if len(options.OutDir) > 0 {
		outputDir = options.OutDir
	}

	if outputDir != "" {
		return ChangeToDeclarationExtension(
			GetSourceFileNameInNewDir(
				file,
				outputDir,
				host.CommonSourceDirectory(),
				host.CaseSensitivity(),
			),
			host,
		)
	}
	return ChangeToDeclarationExtension(file, host)
}

func ChangeToDeclarationExtension(path tspath.RootedFilePath, host OutputPathsHost) tspath.RootedFilePath {
	if extension := path.LongestExtension(host.ContentMapperExtensions(), tspath.CaseSensitive); extension != "" {
		return path.RemoveExtension(extension).AppendSuffix(".d" + extension + ".ts")
	}
	pathWithoutExtension := path.RemoveFileExtension()
	if pathWithoutExtension == path {
		if extension := path.AnyExtension(nil, tspath.CaseSensitive); extension != "" {
			pathWithoutExtension = path.RemoveExtension(extension)
		}
	}
	return pathWithoutExtension.AppendSuffix(path.DeclarationEmitExtension())
}

func getOutputFileNameWithoutChangingExtension(inputFileName tspath.RootedFilePath, outputDirectory tspath.RootedDirectoryPath, host OutputPathsHost) tspath.RootedFilePath {
	if outputDirectory != "" {
		relativePath, ok := host.CaseSensitivity().RelativePathFromDirectory(
			host.CommonSourceDirectory(),
			inputFileName,
		)
		if !ok {
			return inputFileName
		}

		return outputDirectory.ResolveRelativeFile(relativePath)
	}
	return inputFileName
}

func GetSourceFileNameInNewDir(fileName tspath.RootedFilePath, newDirPath tspath.RootedDirectoryPath, commonSourceDirectory tspath.RootedDirectoryPath, caseSensitivity tspath.CaseSensitivity) tspath.RootedFilePath {
	if fileName.AsPath() == commonSourceDirectory.AsPath() {
		return fileName
	}
	if relativePath, ok := caseSensitivity.RelativeFilePathFromDirectory(commonSourceDirectory, fileName); ok {
		return newDirPath.ResolveRelativeFile(relativePath)
	}
	return fileName
}

func getOwnEmitOutputFilePathForFileName(fileName tspath.RootedFilePath, options *core.CompilerOptions, host OutputPathsHost, extension string) tspath.RootedFilePath {
	var emitOutputFilePathWithoutExtension tspath.RootedFilePath
	if len(options.OutDir) > 0 {
		emitOutputFilePathWithoutExtension = GetSourceFileNameInNewDir(
			fileName,
			options.OutDir,
			host.CommonSourceDirectory(),
			host.CaseSensitivity(),
		).RemoveFileExtension()
	} else {
		emitOutputFilePathWithoutExtension = fileName.RemoveFileExtension()
	}
	return emitOutputFilePathWithoutExtension.AppendSuffix(extension)
}

func GetSourceMapFilePath(jsFilePath tspath.RootedFilePath, options *core.CompilerOptions) tspath.RootedFilePath {
	if options.SourceMap.IsTrue() && !options.InlineSourceMap.IsTrue() {
		return jsFilePath.AppendSuffix(".map")
	}
	return ""
}

func GetBuildInfoFileName(options *core.CompilerOptions, caseSensitivity tspath.CaseSensitivity) tspath.RootedFilePath {
	if !options.IsIncremental() && !options.Build.IsTrue() {
		return ""
	}
	if options.TsBuildInfoFile != "" {
		return options.TsBuildInfoFile
	}
	if options.ConfigFilePath == "" {
		return ""
	}
	configFileExtensionLess := options.ConfigFilePath.RemoveFileExtension()
	var buildInfoExtensionLess tspath.RootedFilePath
	if options.OutDir != "" {
		if options.RootDir != "" {
			relativePath, ok := caseSensitivity.RelativePathFromDirectory(options.RootDir, configFileExtensionLess)
			if ok {
				buildInfoExtensionLess = options.OutDir.ResolveRelativeFile(relativePath)
			} else {
				buildInfoExtensionLess = configFileExtensionLess
			}
		} else {
			buildInfoExtensionLess = options.OutDir.ResolveFile(configFileExtensionLess.BaseName())
		}
	} else {
		buildInfoExtensionLess = configFileExtensionLess
	}
	return buildInfoExtensionLess.AppendSuffix(tspath.ExtensionTsBuildInfo)
}
