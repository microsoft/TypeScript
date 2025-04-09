package compiler

import (
	"encoding/base64"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/transformers"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type emitOnly byte

const (
	emitAll emitOnly = iota
	emitOnlyJs
	emitOnlyDts
	emitOnlyBuildInfo
)

type emitter struct {
	host               EmitHost
	emitOnly           emitOnly
	emittedFilesList   []string
	emitterDiagnostics ast.DiagnosticsCollection
	emitSkipped        bool
	sourceMapDataList  []*SourceMapEmitResult
	writer             printer.EmitTextWriter
	paths              *outputPaths
	sourceFile         *ast.SourceFile
}

func (e *emitter) emit() {
	// !!! tracing
	e.emitJSFile(e.sourceFile, e.paths.jsFilePath, e.paths.sourceMapFilePath)
	e.emitDeclarationFile(e.sourceFile, e.paths.declarationFilePath, e.paths.declarationMapPath)
	e.emitBuildInfo(e.paths.buildInfoPath)
}

func (e *emitter) getModuleTransformer(emitContext *printer.EmitContext, resolver binder.ReferenceResolver, sourceFileMetaDataProvider printer.SourceFileMetaDataProvider) *transformers.Transformer {
	options := e.host.Options()

	switch options.GetEmitModuleKind() {
	case core.ModuleKindPreserve:
		// `ESModuleTransformer` contains logic for preserving CJS input syntax in `--module preserve`
		return transformers.NewESModuleTransformer(emitContext, options, resolver, sourceFileMetaDataProvider)

	case core.ModuleKindESNext,
		core.ModuleKindES2022,
		core.ModuleKindES2020,
		core.ModuleKindES2015,
		core.ModuleKindNode16,
		core.ModuleKindNodeNext,
		core.ModuleKindCommonJS:
		return transformers.NewImpliedModuleTransformer(emitContext, options, resolver, sourceFileMetaDataProvider)

	default:
		return transformers.NewCommonJSModuleTransformer(emitContext, options, resolver, sourceFileMetaDataProvider)
	}
}

func (e *emitter) getScriptTransformers(emitContext *printer.EmitContext, sourceFile *ast.SourceFile) []*transformers.Transformer {
	var tx []*transformers.Transformer
	options := e.host.Options()

	// JS files don't use reference calculations as they don't do import elision, no need to calculate it
	importElisionEnabled := !options.VerbatimModuleSyntax.IsTrue() && !ast.IsInJSFile(sourceFile.AsNode())

	var emitResolver printer.EmitResolver
	var referenceResolver binder.ReferenceResolver
	if importElisionEnabled {
		emitResolver = e.host.GetEmitResolver(sourceFile, false /*skipDiagnostics*/) // !!! conditionally skip diagnostics
		emitResolver.MarkLinkedReferencesRecursively(sourceFile)
		referenceResolver = emitResolver
	} else {
		referenceResolver = binder.NewReferenceResolver(options, binder.ReferenceResolverHooks{})
	}

	// erase types
	tx = append(tx, transformers.NewTypeEraserTransformer(emitContext, options))

	// elide imports
	if importElisionEnabled {
		tx = append(tx, transformers.NewImportElisionTransformer(emitContext, options, emitResolver))
	}

	// transform `enum`, `namespace`, and parameter properties
	tx = append(tx, transformers.NewRuntimeSyntaxTransformer(emitContext, options, referenceResolver))

	// transform module syntax
	tx = append(tx, e.getModuleTransformer(emitContext, referenceResolver, e.host))
	return tx
}

func (e *emitter) emitJSFile(sourceFile *ast.SourceFile, jsFilePath string, sourceMapFilePath string) {
	options := e.host.Options()

	if sourceFile == nil || e.emitOnly != emitAll && e.emitOnly != emitOnlyJs || len(jsFilePath) == 0 {
		return
	}

	if options.NoEmit == core.TSTrue || e.host.IsEmitBlocked(jsFilePath) {
		return
	}

	emitContext := printer.NewEmitContext()
	for _, transformer := range e.getScriptTransformers(emitContext, sourceFile) {
		sourceFile = transformer.TransformSourceFile(sourceFile)
	}

	printerOptions := printer.PrinterOptions{
		RemoveComments:  options.RemoveComments.IsTrue(),
		NewLine:         options.NewLine,
		NoEmitHelpers:   options.NoEmitHelpers.IsTrue(),
		SourceMap:       options.SourceMap.IsTrue(),
		InlineSourceMap: options.InlineSourceMap.IsTrue(),
		InlineSources:   options.InlineSources.IsTrue(),
		// !!!
	}

	// create a printer to print the nodes
	printer := printer.NewPrinter(printerOptions, printer.PrintHandlers{
		// !!!
	}, emitContext)

	e.printSourceFile(jsFilePath, sourceMapFilePath, sourceFile, printer)

	if e.emittedFilesList != nil {
		e.emittedFilesList = append(e.emittedFilesList, jsFilePath)
		if sourceMapFilePath != "" {
			e.emittedFilesList = append(e.emittedFilesList, sourceMapFilePath)
		}
	}
}

func (e *emitter) emitDeclarationFile(sourceFile *ast.SourceFile, declarationFilePath string, declarationMapPath string) {
	// !!!
}

func (e *emitter) emitBuildInfo(buildInfoPath string) {
	// !!!
}

func (e *emitter) printSourceFile(jsFilePath string, sourceMapFilePath string, sourceFile *ast.SourceFile, printer *printer.Printer) bool {
	// !!! sourceMapGenerator
	options := e.host.Options()
	var sourceMapGenerator *sourcemap.Generator
	if shouldEmitSourceMaps(options, sourceFile) {
		sourceMapGenerator = sourcemap.NewGenerator(
			tspath.GetBaseFileName(tspath.NormalizeSlashes(jsFilePath)),
			getSourceRoot(options),
			e.getSourceMapDirectory(options, jsFilePath, sourceFile),
			tspath.ComparePathsOptions{
				UseCaseSensitiveFileNames: e.host.UseCaseSensitiveFileNames(),
				CurrentDirectory:          e.host.GetCurrentDirectory(),
			},
		)
	}

	// !!! bundles not implemented, may be deprecated
	sourceFiles := []*ast.SourceFile{sourceFile}

	printer.Write(sourceFile.AsNode(), sourceFile, e.writer, sourceMapGenerator)

	sourceMapUrlPos := -1
	if sourceMapGenerator != nil {
		if options.SourceMap.IsTrue() || options.InlineSourceMap.IsTrue() || options.GetAreDeclarationMapsEnabled() {
			e.sourceMapDataList = append(e.sourceMapDataList, &SourceMapEmitResult{
				InputSourceFileNames: sourceMapGenerator.Sources(),
				SourceMap:            sourceMapGenerator.RawSourceMap(),
				GeneratedFile:        jsFilePath,
			})
		}

		sourceMappingURL := e.getSourceMappingURL(
			options,
			sourceMapGenerator,
			jsFilePath,
			sourceMapFilePath,
			sourceFile,
		)

		if len(sourceMappingURL) > 0 {
			if !e.writer.IsAtStartOfLine() {
				e.writer.RawWrite(core.IfElse(options.NewLine == core.NewLineKindCRLF, "\r\n", "\n"))
			}
			sourceMapUrlPos = e.writer.GetTextPos()
			e.writer.WriteComment("//# sourceMappingURL=" + sourceMappingURL)
		}

		// Write the source map
		if len(sourceMapFilePath) > 0 {
			sourceMap := sourceMapGenerator.String()
			err := e.host.WriteFile(sourceMapFilePath, sourceMap, false /*writeByteOrderMark*/, sourceFiles, nil /*data*/)
			if err != nil {
				e.emitterDiagnostics.Add(ast.NewCompilerDiagnostic(diagnostics.Could_not_write_file_0_Colon_1, jsFilePath, err.Error()))
			}
		}
	} else {
		e.writer.WriteLine()
	}

	// Write the output file
	text := e.writer.String()
	data := &WriteFileData{SourceMapUrlPos: sourceMapUrlPos} // !!! transform diagnostics
	err := e.host.WriteFile(jsFilePath, text, e.host.Options().EmitBOM.IsTrue(), sourceFiles, data)
	if err != nil {
		e.emitterDiagnostics.Add(ast.NewCompilerDiagnostic(diagnostics.Could_not_write_file_0_Colon_1, jsFilePath, err.Error()))
	}

	// Reset state
	e.writer.Clear()
	return !data.SkippedDtsWrite
}

func getSourceFilePathInNewDir(fileName string, newDirPath string, currentDirectory string, commonSourceDirectory string, useCaseSensitiveFileNames bool) string {
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

func getOwnEmitOutputFilePath(fileName string, host EmitHost, extension string) string {
	compilerOptions := host.Options()
	var emitOutputFilePathWithoutExtension string
	if len(compilerOptions.OutDir) > 0 {
		currentDirectory := host.GetCurrentDirectory()
		emitOutputFilePathWithoutExtension = tspath.RemoveFileExtension(getSourceFilePathInNewDir(
			fileName,
			compilerOptions.OutDir,
			currentDirectory,
			host.CommonSourceDirectory(),
			host.UseCaseSensitiveFileNames(),
		))
	} else {
		emitOutputFilePathWithoutExtension = tspath.RemoveFileExtension(fileName)
	}
	return emitOutputFilePathWithoutExtension + extension
}

func getSourceMapFilePath(jsFilePath string, options *core.CompilerOptions) string {
	if options.SourceMap.IsTrue() && !options.InlineSourceMap.IsTrue() {
		return jsFilePath + ".map"
	}
	return ""
}

func shouldEmitSourceMaps(mapOptions *core.CompilerOptions, sourceFile *ast.SourceFile) bool {
	return (mapOptions.SourceMap.IsTrue() || mapOptions.InlineSourceMap.IsTrue()) &&
		!tspath.FileExtensionIs(sourceFile.FileName(), tspath.ExtensionJson)
}

func getSourceRoot(mapOptions *core.CompilerOptions) string {
	// Normalize source root and make sure it has trailing "/" so that it can be used to combine paths with the
	// relative paths of the sources list in the sourcemap
	sourceRoot := tspath.NormalizeSlashes(mapOptions.SourceRoot)
	if len(sourceRoot) > 0 {
		sourceRoot = tspath.EnsureTrailingDirectorySeparator(sourceRoot)
	}
	return sourceRoot
}

func (e *emitter) getSourceMapDirectory(mapOptions *core.CompilerOptions, filePath string, sourceFile *ast.SourceFile) string {
	if len(mapOptions.SourceRoot) > 0 {
		return e.host.CommonSourceDirectory()
	}
	if len(mapOptions.MapRoot) > 0 {
		sourceMapDir := tspath.NormalizeSlashes(mapOptions.MapRoot)
		if sourceFile != nil {
			// For modules or multiple emit files the mapRoot will have directory structure like the sources
			// So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
			sourceMapDir = tspath.GetDirectoryPath(getSourceFilePathInNewDir(
				sourceFile.FileName(),
				sourceMapDir,
				e.host.GetCurrentDirectory(),
				e.host.CommonSourceDirectory(),
				e.host.UseCaseSensitiveFileNames(),
			))
		}
		if tspath.GetRootLength(sourceMapDir) == 0 {
			// The relative paths are relative to the common directory
			sourceMapDir = tspath.CombinePaths(e.host.CommonSourceDirectory(), sourceMapDir)
		}
		return sourceMapDir
	}
	return tspath.GetDirectoryPath(tspath.NormalizePath(filePath))
}

func (e *emitter) getSourceMappingURL(mapOptions *core.CompilerOptions, sourceMapGenerator *sourcemap.Generator, filePath string, sourceMapFilePath string, sourceFile *ast.SourceFile) string {
	if mapOptions.InlineSourceMap.IsTrue() {
		// Encode the sourceMap into the sourceMap url
		sourceMapText := sourceMapGenerator.String()
		base64SourceMapText := base64.StdEncoding.EncodeToString([]byte(sourceMapText))
		return "data:application/json;base64," + base64SourceMapText
	}

	sourceMapFile := tspath.GetBaseFileName(tspath.NormalizeSlashes(sourceMapFilePath))
	if len(mapOptions.MapRoot) > 0 {
		sourceMapDir := tspath.NormalizeSlashes(mapOptions.MapRoot)
		if sourceFile != nil {
			// For modules or multiple emit files the mapRoot will have directory structure like the sources
			// So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
			sourceMapDir = tspath.GetDirectoryPath(getSourceFilePathInNewDir(
				sourceFile.FileName(),
				sourceMapDir,
				e.host.GetCurrentDirectory(),
				e.host.CommonSourceDirectory(),
				e.host.UseCaseSensitiveFileNames(),
			))
		}
		if tspath.GetRootLength(sourceMapDir) == 0 {
			// The relative paths are relative to the common directory
			sourceMapDir = tspath.CombinePaths(e.host.CommonSourceDirectory(), sourceMapDir)
			return stringutil.EncodeURI(
				tspath.GetRelativePathToDirectoryOrUrl(
					tspath.GetDirectoryPath(tspath.NormalizePath(filePath)), // get the relative sourceMapDir path based on jsFilePath
					tspath.CombinePaths(sourceMapDir, sourceMapFile),        // this is where user expects to see sourceMap
					/*isAbsolutePathAnUrl*/ true,
					tspath.ComparePathsOptions{
						UseCaseSensitiveFileNames: e.host.UseCaseSensitiveFileNames(),
						CurrentDirectory:          e.host.GetCurrentDirectory(),
					},
				),
			)
		} else {
			return stringutil.EncodeURI(tspath.CombinePaths(sourceMapDir, sourceMapFile))
		}
	}
	return stringutil.EncodeURI(sourceMapFile)
}

func getDeclarationEmitOutputFilePath(file string, host EmitHost) string {
	// !!!
	return ""
}

type outputPaths struct {
	jsFilePath          string
	sourceMapFilePath   string
	declarationFilePath string
	declarationMapPath  string
	buildInfoPath       string
}

func getOutputPathsFor(sourceFile *ast.SourceFile, host EmitHost, forceDtsEmit bool) *outputPaths {
	options := host.Options()
	// !!! bundle not implemented, may be deprecated
	ownOutputFilePath := getOwnEmitOutputFilePath(sourceFile.FileName(), host, core.GetOutputExtension(sourceFile.FileName(), options.Jsx))
	isJsonFile := ast.IsJsonSourceFile(sourceFile)
	// If json file emits to the same location skip writing it, if emitDeclarationOnly skip writing it
	isJsonEmittedToSameLocation := isJsonFile &&
		tspath.ComparePaths(sourceFile.FileName(), ownOutputFilePath, tspath.ComparePathsOptions{
			CurrentDirectory:          host.GetCurrentDirectory(),
			UseCaseSensitiveFileNames: host.UseCaseSensitiveFileNames(),
		}) == 0
	paths := &outputPaths{}
	if options.EmitDeclarationOnly != core.TSTrue && !isJsonEmittedToSameLocation {
		paths.jsFilePath = ownOutputFilePath
		if !ast.IsJsonSourceFile(sourceFile) {
			paths.sourceMapFilePath = getSourceMapFilePath(paths.jsFilePath, options)
		}
	}
	if forceDtsEmit || options.GetEmitDeclarations() && !isJsonFile {
		paths.declarationFilePath = getDeclarationEmitOutputFilePath(sourceFile.FileName(), host)
		if options.GetAreDeclarationMapsEnabled() {
			paths.declarationMapPath = paths.declarationFilePath + ".map"
		}
	}
	return paths
}

func forEachEmittedFile(host EmitHost, action func(emitFileNames *outputPaths, sourceFile *ast.SourceFile) bool, sourceFiles []*ast.SourceFile, options *EmitOptions) bool {
	// !!! outFile not yet implemented, may be deprecated
	for _, sourceFile := range sourceFiles {
		if action(getOutputPathsFor(sourceFile, host, options.forceDtsEmit), sourceFile) {
			return true
		}
	}
	return false
}

func sourceFileMayBeEmitted(sourceFile *ast.SourceFile, host EmitHost, forceDtsEmit bool) bool {
	// !!! Js files are emitted only if option is enabled

	// Declaration files are not emitted
	if sourceFile.IsDeclarationFile {
		return false
	}

	// !!! Source file from node_modules are not emitted. In Strada, this depends on module resolution and uses
	// `sourceFilesFoundSearchingNodeModules` in `createProgram`. For now, we will just check for `/node_modules/` in
	// the file name.
	if strings.Contains(sourceFile.FileName(), "/node_modules/") {
		return false
	}

	// forcing dts emit => file needs to be emitted
	if forceDtsEmit {
		return true
	}

	// !!! Source files from referenced projects are not emitted

	// Any non json file should be emitted
	if !ast.IsJsonSourceFile(sourceFile) {
		return true
	}

	// !!! Should JSON input files be emitted
	return false
}

func getSourceFilesToEmit(host EmitHost, targetSourceFile *ast.SourceFile, forceDtsEmit bool) []*ast.SourceFile {
	// !!! outFile not yet implemented, may be deprecated
	var sourceFiles []*ast.SourceFile
	if targetSourceFile != nil {
		sourceFiles = []*ast.SourceFile{targetSourceFile}
	} else {
		sourceFiles = host.SourceFiles()
	}
	return core.Filter(sourceFiles, func(sourceFile *ast.SourceFile) bool {
		return sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit)
	})
}
