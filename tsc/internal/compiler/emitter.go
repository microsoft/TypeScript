package compiler

import (
	"encoding/base64"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/outputpaths"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/transformers"
	"github.com/microsoft/typescript-go/internal/transformers/declarations"
	"github.com/microsoft/typescript-go/internal/transformers/estransforms"
	"github.com/microsoft/typescript-go/internal/transformers/inliners"
	"github.com/microsoft/typescript-go/internal/transformers/jsxtransforms"
	"github.com/microsoft/typescript-go/internal/transformers/moduletransforms"
	"github.com/microsoft/typescript-go/internal/transformers/tstransforms"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type EmitOnly byte

const (
	EmitAll EmitOnly = iota
	EmitOnlyJs
	EmitOnlyDts
	EmitOnlyForcedDts
)

type emitter struct {
	host               EmitHost
	emitOnly           EmitOnly
	emitterDiagnostics ast.DiagnosticsCollection
	writer             printer.EmitTextWriter
	paths              *outputpaths.OutputPaths
	sourceFile         *ast.SourceFile
	emitResult         EmitResult
	writeFile          func(fileName string, text string, writeByteOrderMark bool, data *WriteFileData) error
}

func (e *emitter) emit() {
	// !!! tracing
	e.emitJSFile(e.sourceFile, e.paths.JsFilePath(), e.paths.SourceMapFilePath())
	e.emitDeclarationFile(e.sourceFile, e.paths.DeclarationFilePath(), e.paths.DeclarationMapPath())
	e.emitResult.Diagnostics = e.emitterDiagnostics.GetDiagnostics()
}

func (e *emitter) getDeclarationTransformers(emitContext *printer.EmitContext, declarationFilePath string, declarationMapPath string) []*declarations.DeclarationTransformer {
	transform := declarations.NewDeclarationTransformer(e.host, emitContext, e.host.Options(), declarationFilePath, declarationMapPath)
	return []*declarations.DeclarationTransformer{transform}
}

func getModuleTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	switch opts.CompilerOptions.GetEmitModuleKind() {
	case core.ModuleKindPreserve:
		// `ESModuleTransformer` contains logic for preserving CJS input syntax in `--module preserve`
		return moduletransforms.NewESModuleTransformer(opts)

	case core.ModuleKindESNext,
		core.ModuleKindES2022,
		core.ModuleKindES2020,
		core.ModuleKindES2015,
		core.ModuleKindNode20,
		core.ModuleKindNode18,
		core.ModuleKindNode16,
		core.ModuleKindNodeNext,
		core.ModuleKindCommonJS:
		return moduletransforms.NewImpliedModuleTransformer(opts)

	default:
		return moduletransforms.NewCommonJSModuleTransformer(opts)
	}
}

func getScriptTransformers(emitContext *printer.EmitContext, host printer.EmitHost, sourceFile *ast.SourceFile) []*transformers.Transformer {
	var tx []*transformers.Transformer
	options := host.Options()

	// JS files don't use reference calculations as they don't do import elision, no need to calculate it
	importElisionEnabled := !options.VerbatimModuleSyntax.IsTrue() && !ast.IsInJSFile(sourceFile.AsNode())

	var emitResolver printer.EmitResolver
	var referenceResolver binder.ReferenceResolver
	if importElisionEnabled || options.GetJSXTransformEnabled() || !options.GetIsolatedModules() { // full emit resolver is needed for import ellision and const enum inlining
		emitResolver = host.GetEmitResolver()
		emitResolver.MarkLinkedReferencesRecursively(sourceFile)
		referenceResolver = emitResolver
	} else {
		referenceResolver = binder.NewReferenceResolver(options, binder.ReferenceResolverHooks{})
	}

	opts := transformers.TransformOptions{
		Context:                   emitContext,
		CompilerOptions:           options,
		Resolver:                  referenceResolver,
		EmitResolver:              emitResolver,
		GetEmitModuleFormatOfFile: host.GetEmitModuleFormatOfFile,
	}

	// transform TypeScript syntax
	{
		// erase types
		tx = append(tx, tstransforms.NewTypeEraserTransformer(&opts))

		// elide imports
		if importElisionEnabled {
			tx = append(tx, tstransforms.NewImportElisionTransformer(&opts))
		}

		// transform `enum`, `namespace`, and parameter properties
		tx = append(tx, tstransforms.NewRuntimeSyntaxTransformer(&opts))
	}

	// !!! transform legacy decorator syntax
	if options.GetJSXTransformEnabled() {
		tx = append(tx, jsxtransforms.NewJSXTransformer(&opts))
	}

	downleveler := estransforms.GetESTransformer(&opts)
	if downleveler != nil {
		tx = append(tx, downleveler)
	}

	// transform module syntax
	tx = append(tx, getModuleTransformer(&opts))

	// inlining (formerly done via substitutions)
	if !options.GetIsolatedModules() {
		tx = append(tx, inliners.NewConstEnumInliningTransformer(&opts))
	}
	return tx
}

func (e *emitter) emitJSFile(sourceFile *ast.SourceFile, jsFilePath string, sourceMapFilePath string) {
	options := e.host.Options()

	if sourceFile == nil || e.emitOnly != EmitAll && e.emitOnly != EmitOnlyJs || len(jsFilePath) == 0 {
		return
	}

	if options.NoEmit == core.TSTrue || e.host.IsEmitBlocked(jsFilePath) {
		e.emitResult.EmitSkipped = true
		return
	}

	emitContext, putEmitContext := printer.GetEmitContext()
	defer putEmitContext()

	for _, transformer := range getScriptTransformers(emitContext, e.host, sourceFile) {
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

	e.printSourceFile(jsFilePath, sourceMapFilePath, sourceFile, printer, shouldEmitSourceMaps(options, sourceFile))
}

func (e *emitter) emitDeclarationFile(sourceFile *ast.SourceFile, declarationFilePath string, declarationMapPath string) {
	options := e.host.Options()

	if sourceFile == nil || e.emitOnly == EmitOnlyJs || len(declarationFilePath) == 0 {
		return
	}

	if e.emitOnly != EmitOnlyForcedDts && (options.NoEmit == core.TSTrue || e.host.IsEmitBlocked(declarationFilePath)) {
		e.emitResult.EmitSkipped = true
		return
	}

	var diags []*ast.Diagnostic
	emitContext, putEmitContext := printer.GetEmitContext()
	defer putEmitContext()
	for _, transformer := range e.getDeclarationTransformers(emitContext, declarationFilePath, declarationMapPath) {
		sourceFile = transformer.TransformSourceFile(sourceFile)
		diags = append(diags, transformer.GetDiagnostics()...)
	}

	// !!! strada skipped emit if there were diagnostics

	printerOptions := printer.PrinterOptions{
		RemoveComments:      options.RemoveComments.IsTrue(),
		OnlyPrintJSDocStyle: true,
		NewLine:             options.NewLine,
		NoEmitHelpers:       options.NoEmitHelpers.IsTrue(),
		SourceMap:           options.DeclarationMap.IsTrue(),
		InlineSourceMap:     options.InlineSourceMap.IsTrue(),
		InlineSources:       options.InlineSources.IsTrue(),
		// !!!
	}

	// create a printer to print the nodes
	printer := printer.NewPrinter(printerOptions, printer.PrintHandlers{
		// !!!
	}, emitContext)

	for _, elem := range diags {
		// Add declaration transform diagnostics to emit diagnostics
		e.emitterDiagnostics.Add(elem)
	}
	e.printSourceFile(declarationFilePath, declarationMapPath, sourceFile, printer, e.emitOnly != EmitOnlyForcedDts && shouldEmitDeclarationSourceMaps(options, sourceFile))
}

func (e *emitter) printSourceFile(jsFilePath string, sourceMapFilePath string, sourceFile *ast.SourceFile, printer_ *printer.Printer, shouldEmitSourceMaps bool) {
	// !!! sourceMapGenerator
	options := e.host.Options()
	var sourceMapGenerator *sourcemap.Generator
	if shouldEmitSourceMaps {
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

	printer_.Write(sourceFile.AsNode(), sourceFile, e.writer, sourceMapGenerator)

	sourceMapUrlPos := -1
	if sourceMapGenerator != nil {
		if options.SourceMap.IsTrue() || options.InlineSourceMap.IsTrue() || options.GetAreDeclarationMapsEnabled() {
			e.emitResult.SourceMaps = append(e.emitResult.SourceMaps, &SourceMapEmitResult{
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
			err := e.writeText(sourceMapFilePath, sourceMap, false /*writeByteOrderMark*/, nil)
			if err != nil {
				e.emitterDiagnostics.Add(ast.NewCompilerDiagnostic(diagnostics.Could_not_write_file_0_Colon_1, jsFilePath, err.Error()))
			} else {
				e.emitResult.EmittedFiles = append(e.emitResult.EmittedFiles, sourceMapFilePath)
			}
		}
	} else {
		e.writer.WriteLine()
	}

	// Write the output file
	text := e.writer.String()
	data := &WriteFileData{
		SourceMapUrlPos: sourceMapUrlPos,
		Diagnostics:     e.emitterDiagnostics.GetDiagnostics(),
	}
	err := e.writeText(jsFilePath, text, options.EmitBOM.IsTrue(), data)
	skippedDtsWrite := data.SkippedDtsWrite
	if err != nil {
		e.emitterDiagnostics.Add(ast.NewCompilerDiagnostic(diagnostics.Could_not_write_file_0_Colon_1, jsFilePath, err.Error()))
	} else if !skippedDtsWrite {
		e.emitResult.EmittedFiles = append(e.emitResult.EmittedFiles, jsFilePath)
	}

	// Reset state
	e.writer.Clear()
}

func (e *emitter) writeText(fileName string, text string, writeByteOrderMark bool, data *WriteFileData) error {
	if e.writeFile != nil {
		return e.writeFile(fileName, text, writeByteOrderMark, data)
	}
	return e.host.WriteFile(fileName, text, writeByteOrderMark)
}

func shouldEmitSourceMaps(mapOptions *core.CompilerOptions, sourceFile *ast.SourceFile) bool {
	return (mapOptions.SourceMap.IsTrue() || mapOptions.InlineSourceMap.IsTrue()) &&
		!tspath.FileExtensionIs(sourceFile.FileName(), tspath.ExtensionJson)
}

func shouldEmitDeclarationSourceMaps(mapOptions *core.CompilerOptions, sourceFile *ast.SourceFile) bool {
	return mapOptions.DeclarationMap.IsTrue() &&
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
			sourceMapDir = tspath.GetDirectoryPath(outputpaths.GetSourceFilePathInNewDir(
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
			sourceMapDir = tspath.GetDirectoryPath(outputpaths.GetSourceFilePathInNewDir(
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

type SourceFileMayBeEmittedHost interface {
	Options() *core.CompilerOptions
	GetProjectReferenceFromSource(path tspath.Path) *tsoptions.SourceOutputAndProjectReference
	IsSourceFileFromExternalLibrary(file *ast.SourceFile) bool
	GetCurrentDirectory() string
	UseCaseSensitiveFileNames() bool
	SourceFiles() []*ast.SourceFile
}

func sourceFileMayBeEmitted(sourceFile *ast.SourceFile, host SourceFileMayBeEmittedHost, forceDtsEmit bool) bool {
	// TODO: move this to outputpaths?

	options := host.Options()
	// Js files are emitted only if option is enabled
	if options.NoEmitForJsFiles.IsTrue() && ast.IsSourceFileJS(sourceFile) {
		return false
	}

	// Declaration files are not emitted
	if sourceFile.IsDeclarationFile {
		return false
	}

	// Source file from node_modules are not emitted
	if host.IsSourceFileFromExternalLibrary(sourceFile) {
		return false
	}

	// forcing dts emit => file needs to be emitted
	if forceDtsEmit {
		return true
	}

	// Check other conditions for file emit
	// Source files from referenced projects are not emitted
	if host.GetProjectReferenceFromSource(sourceFile.Path()) != nil {
		return false
	}

	// Any non json file should be emitted
	if !ast.IsJsonSourceFile(sourceFile) {
		return true
	}

	// Json file is not emitted if outDir is not specified
	if options.OutDir == "" {
		return false
	}

	// Otherwise if rootDir or composite config file, we know common sourceDir and can check if file would be emitted in same location
	if options.RootDir != "" || (options.Composite.IsTrue() && options.ConfigFilePath != "") {
		commonDir := tspath.GetNormalizedAbsolutePath(outputpaths.GetCommonSourceDirectory(options, func() []string { return nil }, host.GetCurrentDirectory(), host.UseCaseSensitiveFileNames()), host.GetCurrentDirectory())
		outputPath := outputpaths.GetSourceFilePathInNewDirWorker(sourceFile.FileName(), options.OutDir, host.GetCurrentDirectory(), commonDir, host.UseCaseSensitiveFileNames())
		if tspath.ComparePaths(sourceFile.FileName(), outputPath, tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: host.UseCaseSensitiveFileNames(),
			CurrentDirectory:          host.GetCurrentDirectory(),
		}) == 0 {
			return false
		}
	}

	return true
}

func getSourceFilesToEmit(host SourceFileMayBeEmittedHost, targetSourceFile *ast.SourceFile, forceDtsEmit bool) []*ast.SourceFile {
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

func isSourceFileNotJson(file *ast.SourceFile) bool {
	return !ast.IsJsonSourceFile(file)
}

func getDeclarationDiagnostics(host EmitHost, file *ast.SourceFile) []*ast.Diagnostic {
	// TODO: use p.getSourceFilesToEmit cache
	fullFiles := core.Filter(getSourceFilesToEmit(host, file, false), isSourceFileNotJson)
	if !core.Some(fullFiles, func(f *ast.SourceFile) bool { return f == file }) {
		return []*ast.Diagnostic{}
	}
	options := host.Options()
	transform := declarations.NewDeclarationTransformer(host, nil, options, "", "")
	transform.TransformSourceFile(file)
	return transform.GetDiagnostics()
}
