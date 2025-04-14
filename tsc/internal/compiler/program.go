package compiler

import (
	"fmt"
	"slices"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/compiler/module"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type ProgramOptions struct {
	ConfigFileName               string
	RootFiles                    []string
	Host                         CompilerHost
	Options                      *core.CompilerOptions
	SingleThreaded               bool
	ProjectReference             []core.ProjectReference
	ConfigFileParsingDiagnostics []*ast.Diagnostic
}

type Program struct {
	host                         CompilerHost
	programOptions               ProgramOptions
	compilerOptions              *core.CompilerOptions
	configFileName               string
	nodeModules                  map[string]*ast.SourceFile
	checkers                     []*checker.Checker
	checkersOnce                 sync.Once
	checkersByFile               map[*ast.SourceFile]*checker.Checker
	currentDirectory             string
	configFileParsingDiagnostics []*ast.Diagnostic

	sourceAffectingCompilerOptionsOnce sync.Once
	sourceAffectingCompilerOptions     *core.SourceFileAffectingCompilerOptions

	resolver *module.Resolver

	comparePathsOptions tspath.ComparePathsOptions

	processedFiles

	filesByPath map[tspath.Path]*ast.SourceFile

	// The below settings are to track if a .js file should be add to the program if loaded via searching under node_modules.
	// This works as imported modules are discovered recursively in a depth first manner, specifically:
	// - For each root file, findSourceFile is called.
	// - This calls processImportedModules for each module imported in the source file.
	// - This calls resolveModuleNames, and then calls findSourceFile for each resolved module.
	// As all these operations happen - and are nested - within the createProgram call, they close over the below variables.
	// The current resolution depth is tracked by incrementing/decrementing as the depth first search progresses.
	// maxNodeModuleJsDepth      int
	currentNodeModulesDepth int

	usesUriStyleNodeCoreModules core.Tristate

	commonSourceDirectory     string
	commonSourceDirectoryOnce sync.Once

	// List of present unsupported extensions
	unsupportedExtensions []string
}

func NewProgram(options ProgramOptions) *Program {
	p := &Program{}
	p.programOptions = options
	p.compilerOptions = options.Options
	p.configFileParsingDiagnostics = slices.Clip(options.ConfigFileParsingDiagnostics)
	if p.compilerOptions == nil {
		p.compilerOptions = &core.CompilerOptions{}
	}

	// p.maxNodeModuleJsDepth = p.options.MaxNodeModuleJsDepth

	// TODO(ercornel): !!! tracing?
	// tracing?.push(tracing.Phase.Program, "createProgram", { configFilePath: options.configFilePath, rootDir: options.rootDir }, /*separateBeginAndEnd*/ true);
	// performance.mark("beforeProgram");

	p.host = options.Host
	if p.host == nil {
		panic("host required")
	}

	rootFiles := options.RootFiles

	p.configFileName = options.ConfigFileName
	if p.configFileName != "" {
		jsonText, ok := p.host.FS().ReadFile(p.configFileName)
		if !ok {
			panic("config file not found")
		}
		configFilePath := tspath.ToPath(p.configFileName, p.host.GetCurrentDirectory(), p.host.FS().UseCaseSensitiveFileNames())
		parsedConfig := parser.ParseJSONText(p.configFileName, configFilePath, jsonText)
		if len(parsedConfig.Diagnostics()) > 0 {
			p.configFileParsingDiagnostics = append(p.configFileParsingDiagnostics, parsedConfig.Diagnostics()...)
			return p
		}

		tsConfigSourceFile := &tsoptions.TsConfigSourceFile{
			SourceFile: parsedConfig,
		}

		parseConfigFileContent := tsoptions.ParseJsonSourceFileConfigFileContent(
			tsConfigSourceFile,
			p.host,
			p.host.GetCurrentDirectory(),
			options.Options,
			p.configFileName,
			/*resolutionStack*/ nil,
			/*extraFileExtensions*/ nil,
			/*extendedConfigCache*/ nil,
		)

		p.compilerOptions = parseConfigFileContent.CompilerOptions()

		if len(parseConfigFileContent.Errors) > 0 {
			p.configFileParsingDiagnostics = append(p.configFileParsingDiagnostics, parseConfigFileContent.Errors...)
			return p
		}

		if rootFiles == nil {
			// !!! merge? override? this?
			rootFiles = parseConfigFileContent.FileNames()
		}
	}

	p.resolver = module.NewResolver(p.host, p.compilerOptions)

	var libs []string

	if p.compilerOptions.NoLib != core.TSTrue {
		if p.compilerOptions.Lib == nil {
			name := tsoptions.GetDefaultLibFileName(p.compilerOptions)
			libs = append(libs, tspath.CombinePaths(p.host.DefaultLibraryPath(), name))
		} else {
			for _, lib := range p.compilerOptions.Lib {
				name, ok := tsoptions.GetLibFileName(lib)
				if ok {
					libs = append(libs, tspath.CombinePaths(p.host.DefaultLibraryPath(), name))
				}
				// !!! error on unknown name
			}
		}
	}

	p.processedFiles = processAllProgramFiles(p.host, p.programOptions, p.compilerOptions, p.resolver, rootFiles, libs)
	p.filesByPath = make(map[tspath.Path]*ast.SourceFile, len(p.files))
	for _, file := range p.files {
		p.filesByPath[file.Path()] = file
	}

	for _, file := range p.files {
		extension := tspath.TryGetExtensionFromPath(file.FileName())
		if slices.Contains(tspath.SupportedJSExtensionsFlat, extension) {
			p.unsupportedExtensions = core.AppendIfUnique(p.unsupportedExtensions, extension)
		}
	}

	return p
}

func NewProgramFromParsedCommandLine(config *tsoptions.ParsedCommandLine, host CompilerHost) *Program {
	programOptions := ProgramOptions{
		RootFiles: config.FileNames(),
		Options:   config.CompilerOptions(),
		Host:      host,
		// todo: ProjectReferences
		ConfigFileParsingDiagnostics: config.GetConfigFileParsingDiagnostics(),
	}
	return NewProgram(programOptions)
}

func (p *Program) SourceFiles() []*ast.SourceFile { return p.files }
func (p *Program) Options() *core.CompilerOptions { return p.compilerOptions }
func (p *Program) Host() CompilerHost             { return p.host }
func (p *Program) GetConfigFileParsingDiagnostics() []*ast.Diagnostic {
	return slices.Clip(p.configFileParsingDiagnostics)
}

func (p *Program) getSourceAffectingCompilerOptions() *core.SourceFileAffectingCompilerOptions {
	p.sourceAffectingCompilerOptionsOnce.Do(func() {
		p.sourceAffectingCompilerOptions = p.compilerOptions.SourceFileAffecting()
	})
	return p.sourceAffectingCompilerOptions
}

func (p *Program) BindSourceFiles() {
	wg := core.NewWorkGroup(p.programOptions.SingleThreaded)
	for _, file := range p.files {
		if !file.IsBound() {
			wg.Queue(func() {
				binder.BindSourceFile(file, p.getSourceAffectingCompilerOptions())
			})
		}
	}
	wg.RunAndWait()
}

func (p *Program) CheckSourceFiles() {
	p.createCheckers()
	wg := core.NewWorkGroup(p.programOptions.SingleThreaded)
	for index, checker := range p.checkers {
		wg.Queue(func() {
			for i := index; i < len(p.files); i += len(p.checkers) {
				checker.CheckSourceFile(p.files[i])
			}
		})
	}
	wg.RunAndWait()
}

func (p *Program) createCheckers() {
	p.checkersOnce.Do(func() {
		p.checkers = make([]*checker.Checker, core.IfElse(p.programOptions.SingleThreaded, 1, 4))
		wg := core.NewWorkGroup(p.programOptions.SingleThreaded)
		for i := range p.checkers {
			wg.Queue(func() {
				p.checkers[i] = checker.NewChecker(p)
			})
		}
		wg.RunAndWait()
		p.checkersByFile = make(map[*ast.SourceFile]*checker.Checker)
		for i, file := range p.files {
			p.checkersByFile[file] = p.checkers[i%len(p.checkers)]
		}
	})
}

// Return the type checker associated with the program.
func (p *Program) GetTypeChecker() *checker.Checker {
	p.createCheckers()
	// Just use the first (and possibly only) checker for checker requests. Such requests are likely
	// to obtain types through multiple API calls and we want to ensure that those types are created
	// by the same checker so they can interoperate.
	return p.checkers[0]
}

func (p *Program) GetTypeCheckers() []*checker.Checker {
	p.createCheckers()
	return p.checkers
}

// Return a checker for the given file. We may have multiple checkers in concurrent scenarios and this
// method returns the checker that was tasked with checking the file. Note that it isn't possible to mix
// types obtained from different checkers, so only non-type data (such as diagnostics or string
// representations of types) should be obtained from checkers returned by this method.
func (p *Program) GetTypeCheckerForFile(file *ast.SourceFile) *checker.Checker {
	p.createCheckers()
	return p.checkersByFile[file]
}

func (p *Program) GetResolvedModule(file *ast.SourceFile, moduleReference string) *ast.SourceFile {
	if resolutions, ok := p.resolvedModules[file.Path()]; ok {
		if resolved, ok := resolutions[module.ModeAwareCacheKey{Name: moduleReference, Mode: core.ModuleKindCommonJS}]; ok {
			return p.findSourceFile(resolved.ResolvedFileName, FileIncludeReason{FileIncludeKindImport, 0})
		}
	}
	return nil
}

func (p *Program) GetResolvedModules() map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule] {
	return p.resolvedModules
}

func (p *Program) findSourceFile(candidate string, reason FileIncludeReason) *ast.SourceFile {
	path := tspath.ToPath(candidate, p.host.GetCurrentDirectory(), p.host.FS().UseCaseSensitiveFileNames())
	return p.filesByPath[path]
}

func (p *Program) GetSyntacticDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(sourceFile, false /*ensureBound*/, false /*ensureChecked*/, p.getSyntacticDiagnosticsForFile)
}

func (p *Program) GetBindDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(sourceFile, true /*ensureBound*/, false /*ensureChecked*/, p.getBindDiagnosticsForFile)
}

func (p *Program) GetSemanticDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(sourceFile, true /*ensureBound*/, true /*ensureChecked*/, p.getSemanticDiagnosticsForFile)
}

func (p *Program) GetGlobalDiagnostics() []*ast.Diagnostic {
	p.createCheckers()
	var globalDiagnostics []*ast.Diagnostic
	for _, checker := range p.checkers {
		globalDiagnostics = append(globalDiagnostics, checker.GetGlobalDiagnostics()...)
	}
	return SortAndDeduplicateDiagnostics(globalDiagnostics)
}

func (p *Program) GetOptionsDiagnostics() []*ast.Diagnostic {
	return SortAndDeduplicateDiagnostics(append(p.GetGlobalDiagnostics(), p.getOptionsDiagnosticsOfConfigFile()...))
}

func (p *Program) getOptionsDiagnosticsOfConfigFile() []*ast.Diagnostic {
	// todo update p.configParsingDiagnostics when updateAndGetProgramDiagnostics is implemented
	if p.Options() == nil || p.Options().ConfigFilePath == "" {
		return nil
	}
	return p.configFileParsingDiagnostics // TODO: actually call getDiagnosticsHelper on config path
}

func (p *Program) getSyntacticDiagnosticsForFile(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return sourceFile.Diagnostics()
}

func (p *Program) getBindDiagnosticsForFile(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	// TODO: restore this; tsgo's main depends on this function binding all files for timing.
	// if checker.SkipTypeChecking(sourceFile, p.compilerOptions) {
	// 	return nil
	// }

	return sourceFile.BindDiagnostics()
}

func (p *Program) getSemanticDiagnosticsForFile(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	if checker.SkipTypeChecking(sourceFile, p.compilerOptions) {
		return nil
	}

	var fileChecker *checker.Checker
	if sourceFile != nil {
		fileChecker = p.GetTypeCheckerForFile(sourceFile)
	}

	diags := slices.Clip(sourceFile.BindDiagnostics())
	// Ask for diags from all checkers; checking one file may add diagnostics to other files.
	// These are deduplicated later.
	for _, checker := range p.checkers {
		if sourceFile == nil || checker == fileChecker {
			diags = append(diags, checker.GetDiagnostics(sourceFile)...)
		} else {
			diags = append(diags, checker.GetDiagnosticsWithoutCheck(sourceFile)...)
		}
	}
	if len(sourceFile.CommentDirectives) == 0 {
		return diags
	}
	// Build map of directives by line number
	directivesByLine := make(map[int]ast.CommentDirective)
	for _, directive := range sourceFile.CommentDirectives {
		line, _ := scanner.GetLineAndCharacterOfPosition(sourceFile, directive.Loc.Pos())
		directivesByLine[line] = directive
	}
	lineStarts := scanner.GetLineStarts(sourceFile)
	filtered := make([]*ast.Diagnostic, 0, len(diags))
	for _, diagnostic := range diags {
		ignoreDiagnostic := false
		for line := scanner.ComputeLineOfPosition(lineStarts, diagnostic.Pos()) - 1; line >= 0; line-- {
			// If line contains a @ts-ignore or @ts-expect-error directive, ignore this diagnostic and change
			// the directive kind to @ts-ignore to indicate it was used.
			if directive, ok := directivesByLine[line]; ok {
				ignoreDiagnostic = true
				directive.Kind = ast.CommentDirectiveKindIgnore
				directivesByLine[line] = directive
				break
			}
			// Stop searching backwards when we encounter a line that isn't blank or a comment.
			if !isCommentOrBlankLine(sourceFile.Text(), int(lineStarts[line])) {
				break
			}
		}
		if !ignoreDiagnostic {
			filtered = append(filtered, diagnostic)
		}
	}
	for _, directive := range directivesByLine {
		// Above we changed all used directive kinds to @ts-ignore, so any @ts-expect-error directives that
		// remain are unused and thus errors.
		if directive.Kind == ast.CommentDirectiveKindExpectError {
			filtered = append(filtered, ast.NewDiagnostic(sourceFile, directive.Loc, diagnostics.Unused_ts_expect_error_directive))
		}
	}
	return filtered
}

func isCommentOrBlankLine(text string, pos int) bool {
	for pos < len(text) && (text[pos] == ' ' || text[pos] == '\t') {
		pos++
	}
	return pos == len(text) ||
		pos < len(text) && (text[pos] == '\r' || text[pos] == '\n') ||
		pos+1 < len(text) && text[pos] == '/' && text[pos+1] == '/'
}

func SortAndDeduplicateDiagnostics(diagnostics []*ast.Diagnostic) []*ast.Diagnostic {
	result := slices.Clone(diagnostics)
	slices.SortFunc(result, ast.CompareDiagnostics)
	return slices.CompactFunc(result, ast.EqualDiagnostics)
}

func (p *Program) getDiagnosticsHelper(sourceFile *ast.SourceFile, ensureBound bool, ensureChecked bool, getDiagnostics func(*ast.SourceFile) []*ast.Diagnostic) []*ast.Diagnostic {
	if sourceFile != nil {
		if ensureBound {
			binder.BindSourceFile(sourceFile, p.getSourceAffectingCompilerOptions())
		}
		return SortAndDeduplicateDiagnostics(getDiagnostics(sourceFile))
	}
	if ensureBound {
		p.BindSourceFiles()
	}
	if ensureChecked {
		p.CheckSourceFiles()
	}
	var result []*ast.Diagnostic
	for _, file := range p.files {
		result = append(result, getDiagnostics(file)...)
	}
	return SortAndDeduplicateDiagnostics(result)
}

func (p *Program) LineCount() int {
	var count int
	for _, file := range p.files {
		count += len(file.LineMap())
	}
	return count
}

func (p *Program) IdentifierCount() int {
	var count int
	for _, file := range p.files {
		count += file.IdentifierCount
	}
	return count
}

func (p *Program) SymbolCount() int {
	var count int
	for _, file := range p.files {
		count += file.SymbolCount
	}
	for _, checker := range p.checkers {
		count += int(checker.SymbolCount)
	}
	return count
}

func (p *Program) TypeCount() int {
	var count int
	for _, checker := range p.checkers {
		count += int(checker.TypeCount)
	}
	return count
}

func (p *Program) InstantiationCount() int {
	var count int
	for _, checker := range p.checkers {
		count += int(checker.TotalInstantiationCount)
	}
	return count
}

func (p *Program) PrintSourceFileWithTypes() {
	for _, file := range p.files {
		if tspath.GetBaseFileName(file.FileName()) == "main.ts" {
			fmt.Print(p.GetTypeChecker().SourceFileWithTypes(file))
		}
	}
}

func (p *Program) GetSourceFileMetaData(path tspath.Path) *ast.SourceFileMetaData {
	return p.sourceFileMetaDatas[path]
}

func (p *Program) GetEmitModuleFormatOfFile(sourceFile *ast.SourceFile) core.ModuleKind {
	return p.GetEmitModuleFormatOfFileWorker(sourceFile, p.compilerOptions)
}

func (p *Program) GetEmitModuleFormatOfFileWorker(sourceFile *ast.SourceFile, options *core.CompilerOptions) core.ModuleKind {
	return ast.GetEmitModuleFormatOfFileWorker(sourceFile, options, p.GetSourceFileMetaData(sourceFile.Path()))
}

func (p *Program) GetImpliedNodeFormatForEmit(sourceFile *ast.SourceFile) core.ResolutionMode {
	return ast.GetImpliedNodeFormatForEmitWorker(sourceFile.FileName(), p.compilerOptions, p.GetSourceFileMetaData(sourceFile.Path()))
}

func (p *Program) CommonSourceDirectory() string {
	p.commonSourceDirectoryOnce.Do(func() {
		var files []string
		host := &emitHost{program: p}
		for _, file := range p.files {
			if sourceFileMayBeEmitted(file, host, false /*forceDtsEmit*/) {
				files = append(files, file.FileName())
			}
		}
		p.commonSourceDirectory = getCommonSourceDirectory(
			p.compilerOptions,
			files,
			p.host.GetCurrentDirectory(),
			p.host.FS().UseCaseSensitiveFileNames(),
		)
	})
	return p.commonSourceDirectory
}

func (p *Program) GetCompilerOptions() *core.CompilerOptions {
	return p.compilerOptions
}

func computeCommonSourceDirectoryOfFilenames(fileNames []string, currentDirectory string, useCaseSensitiveFileNames bool) string {
	var commonPathComponents []string
	for _, sourceFile := range fileNames {
		// Each file contributes into common source file path
		sourcePathComponents := tspath.GetNormalizedPathComponents(sourceFile, currentDirectory)

		// The base file name is not part of the common directory path
		sourcePathComponents = sourcePathComponents[:len(sourcePathComponents)-1]

		if commonPathComponents == nil {
			// first file
			commonPathComponents = sourcePathComponents
			continue
		}

		n := min(len(commonPathComponents), len(sourcePathComponents))
		for i := range n {
			if tspath.GetCanonicalFileName(commonPathComponents[i], useCaseSensitiveFileNames) != tspath.GetCanonicalFileName(sourcePathComponents[i], useCaseSensitiveFileNames) {
				if i == 0 {
					// Failed to find any common path component
					return ""
				}

				// New common path found that is 0 -> i-1
				commonPathComponents = commonPathComponents[:i]
				break
			}
		}

		// If the sourcePathComponents was shorter than the commonPathComponents, truncate to the sourcePathComponents
		if len(sourcePathComponents) < len(commonPathComponents) {
			commonPathComponents = commonPathComponents[:len(sourcePathComponents)]
		}
	}

	if len(commonPathComponents) == 0 {
		// Can happen when all input files are .d.ts files
		return currentDirectory
	}

	return tspath.GetPathFromPathComponents(commonPathComponents)
}

func getCommonSourceDirectory(options *core.CompilerOptions, files []string, currentDirectory string, useCaseSensitiveFileNames bool) string {
	var commonSourceDirectory string
	// !!! If a rootDir is specified use it as the commonSourceDirectory
	// !!! Project compilations never infer their root from the input source paths

	commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(files, currentDirectory, useCaseSensitiveFileNames)

	if len(commonSourceDirectory) > 0 {
		// Make sure directory path ends with directory separator so this string can directly
		// used to replace with "" to get the relative path of the source file and the relative path doesn't
		// start with / making it rooted path
		commonSourceDirectory = tspath.EnsureTrailingDirectorySeparator(commonSourceDirectory)
	}

	return commonSourceDirectory
}

type EmitOptions struct {
	TargetSourceFile *ast.SourceFile // Single file to emit. If `nil`, emits all files
	forceDtsEmit     bool
}

type EmitResult struct {
	EmitSkipped  bool
	Diagnostics  []*ast.Diagnostic      // Contains declaration emit diagnostics
	EmittedFiles []string               // Array of files the compiler wrote to disk
	SourceMaps   []*SourceMapEmitResult // Array of sourceMapData if compiler emitted sourcemaps
}

type SourceMapEmitResult struct {
	InputSourceFileNames []string // Input source file (which one can use on program to get the file), 1:1 mapping with the sourceMap.sources list
	SourceMap            *sourcemap.RawSourceMap
	GeneratedFile        string
}

func (p *Program) Emit(options EmitOptions) *EmitResult {
	// !!! performance measurement
	p.BindSourceFiles()

	host := &emitHost{program: p}

	writerPool := &sync.Pool{
		New: func() any {
			return printer.NewTextWriter(host.Options().NewLine.GetNewLineCharacter())
		},
	}
	wg := core.NewWorkGroup(p.programOptions.SingleThreaded)
	var emitters []*emitter
	sourceFiles := getSourceFilesToEmit(host, options.TargetSourceFile, options.forceDtsEmit)

	for _, sourceFile := range sourceFiles {
		emitter := &emitter{
			host:              host,
			emittedFilesList:  nil,
			sourceMapDataList: nil,
			writer:            nil,
			sourceFile:        sourceFile,
		}
		emitters = append(emitters, emitter)
		wg.Queue(func() {
			// take an unused writer
			writer := writerPool.Get().(printer.EmitTextWriter)
			writer.Clear()

			// attach writer and perform emit
			emitter.writer = writer
			emitter.paths = getOutputPathsFor(sourceFile, host, options.forceDtsEmit)
			emitter.emit()
			emitter.writer = nil

			// put the writer back in the pool
			writerPool.Put(writer)
		})
	}

	// wait for emit to complete
	wg.RunAndWait()

	// collect results from emit, preserving input order
	result := &EmitResult{}
	for _, emitter := range emitters {
		if emitter.emitSkipped {
			result.EmitSkipped = true
		}
		result.Diagnostics = append(result.Diagnostics, emitter.emitterDiagnostics.GetDiagnostics()...)
		if emitter.emittedFilesList != nil {
			result.EmittedFiles = append(result.EmittedFiles, emitter.emittedFilesList...)
		}
		if emitter.sourceMapDataList != nil {
			result.SourceMaps = append(result.SourceMaps, emitter.sourceMapDataList...)
		}
	}
	return result
}

func (p *Program) GetSourceFile(filename string) *ast.SourceFile {
	path := tspath.ToPath(filename, p.host.GetCurrentDirectory(), p.host.FS().UseCaseSensitiveFileNames())
	return p.GetSourceFileByPath(path)
}

func (p *Program) GetSourceFileByPath(path tspath.Path) *ast.SourceFile {
	return p.filesByPath[path]
}

func (p *Program) GetSourceFiles() []*ast.SourceFile {
	return p.files
}

type FileIncludeKind int

const (
	FileIncludeKindRootFile FileIncludeKind = iota
	FileIncludeKindSourceFromProjectReference
	FileIncludeKindOutputFromProjectReference
	FileIncludeKindImport
	FileIncludeKindReferenceFile
	FileIncludeKindTypeReferenceDirective
	FileIncludeKindLibFile
	FileIncludeKindLibReferenceDirective
	FileIncludeKindAutomaticTypeDirectiveFile
)

type FileIncludeReason struct {
	Kind  FileIncludeKind
	Index int
}

// UnsupportedExtensions returns a list of all present "unsupported" extensions,
// e.g. extensions that are not yet supported by the port.
func (p *Program) UnsupportedExtensions() []string {
	return p.unsupportedExtensions
}

func (p *Program) GetJSXRuntimeImportSpecifier(path tspath.Path) (moduleReference string, specifier *ast.Node) {
	if result := p.jsxRuntimeImportSpecifiers[path]; result != nil {
		return result.moduleReference, result.specifier
	}
	return "", nil
}

func (p *Program) GetImportHelpersImportSpecifier(path tspath.Path) *ast.Node {
	return p.importHelpersImportSpecifiers[path]
}
