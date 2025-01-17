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
	"github.com/microsoft/typescript-go/internal/vfs"
)

type ProgramOptions struct {
	RootPath           string
	Host               CompilerHost
	Options            *core.CompilerOptions
	SingleThreaded     bool
	ProjectReference   []core.ProjectReference
	DefaultLibraryPath string
}

type Program struct {
	host             CompilerHost
	programOptions   ProgramOptions
	compilerOptions  *core.CompilerOptions
	rootPath         string
	nodeModules      map[string]*ast.SourceFile
	checkers         []*checker.Checker
	checkersByFile   map[*ast.SourceFile]*checker.Checker
	currentDirectory string

	resolver        *module.Resolver
	resolvedModules map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule]

	comparePathsOptions tspath.ComparePathsOptions
	defaultLibraryPath  string

	files       []*ast.SourceFile
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
}

var extensions = []string{".ts", ".tsx"}

func NewProgram(options ProgramOptions) *Program {
	p := &Program{}
	p.programOptions = options
	p.compilerOptions = options.Options
	if p.compilerOptions == nil {
		p.compilerOptions = &core.CompilerOptions{}
	}
	p.filesByPath = make(map[tspath.Path]*ast.SourceFile)

	// p.maxNodeModuleJsDepth = p.options.MaxNodeModuleJsDepth

	// TODO(ercornel): !!! tracing?
	// tracing?.push(tracing.Phase.Program, "createProgram", { configFilePath: options.configFilePath, rootDir: options.rootDir }, /*separateBeginAndEnd*/ true);
	// performance.mark("beforeProgram");

	p.host = options.Host
	if p.host == nil {
		panic("host required")
	}

	p.defaultLibraryPath = options.DefaultLibraryPath
	if p.defaultLibraryPath == "" {
		panic("default library path required")
	}

	p.resolver = module.NewResolver(p.host, p.compilerOptions)

	p.rootPath = options.RootPath
	if p.rootPath == "" {
		panic("root path required")
	}

	var libs []string

	if p.compilerOptions.NoLib != core.TSTrue {
		if p.compilerOptions.Lib == nil {
			name := tsoptions.GetDefaultLibFileName(p.compilerOptions)
			libs = append(libs, tspath.CombinePaths(p.defaultLibraryPath, name))
		} else {
			for _, lib := range p.compilerOptions.Lib {
				name, ok := tsoptions.GetLibFileName(lib)
				if ok {
					libs = append(libs, tspath.CombinePaths(p.defaultLibraryPath, name))
				}
				// !!! error on unknown name
			}
		}
	}

	rootFiles := walkFiles(p.host.FS(), p.rootPath, extensions)
	p.files, p.resolvedModules = processAllProgramFiles(p.host, p.programOptions, p.compilerOptions, p.resolver, rootFiles, libs)
	p.filesByPath = make(map[tspath.Path]*ast.SourceFile, len(p.files))
	for _, file := range p.files {
		p.filesByPath[file.Path()] = file
	}

	return p
}

func (p *Program) Files() []*ast.SourceFile {
	return p.files
}

func walkFiles(fs vfs.FS, rootPath string, extensions []string) []string {
	var files []string

	err := fs.WalkDir(rootPath, func(path string, d vfs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() && slices.ContainsFunc(extensions, func(ext string) bool { return tspath.FileExtensionIs(path, ext) }) {
			files = append(files, path)
		}
		return nil
	})
	if err != nil {
		fmt.Println(err)
	}

	return files
}

func (p *Program) SourceFiles() []*ast.SourceFile { return p.files }
func (p *Program) Options() *core.CompilerOptions { return p.compilerOptions }
func (p *Program) Host() CompilerHost             { return p.host }

func (p *Program) BindSourceFiles() {
	wg := core.NewWorkGroup(p.programOptions.SingleThreaded)
	for _, file := range p.files {
		if !file.IsBound {
			wg.Run(func() {
				binder.BindSourceFile(file, p.compilerOptions)
			})
		}
	}
	wg.Wait()
}

func (p *Program) CheckSourceFiles() {
	p.createCheckers()
	wg := core.NewWorkGroup(false)
	for index, checker := range p.checkers {
		wg.Run(func() {
			for i := index; i < len(p.files); i += len(p.checkers) {
				checker.CheckSourceFile(p.files[i])
			}
		})
	}
	wg.Wait()
}

func (p *Program) createCheckers() {
	if len(p.checkers) == 0 {
		p.checkers = make([]*checker.Checker, core.IfElse(p.programOptions.SingleThreaded, 1, 4))
		for i := range p.checkers {
			p.checkers[i] = checker.NewChecker(p)
		}
		p.checkersByFile = make(map[*ast.SourceFile]*checker.Checker)
		for i, file := range p.files {
			p.checkersByFile[file] = p.checkers[i%len(p.checkers)]
		}
	}
}

// Return the type checker associated with the program.
func (p *Program) GetTypeChecker() *checker.Checker {
	p.createCheckers()
	// Just use the first (and possibly only) checker for checker requests. Such requests are likely
	// to obtain types through multiple API calls and we want to ensure that those types are created
	// by the same checker so they can interoperate.
	return p.checkers[0]
}

// Return a checker for the given file. We may have multiple checkers in concurrent scenarios and this
// method returns the checker that was tasked with checking the file. Note that it isn't possible to mix
// types obtained from different checkers, so only non-type data (such as diagnostics or string
// representations of types) should be obtained from checkers returned by this method.
func (p *Program) getTypeCheckerForFile(file *ast.SourceFile) *checker.Checker {
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

func (p *Program) findSourceFile(candidate string, reason FileIncludeReason) *ast.SourceFile {
	path := tspath.ToPath(candidate, p.host.GetCurrentDirectory(), p.host.FS().UseCaseSensitiveFileNames())
	return p.filesByPath[path]
}

func (p *Program) parseSourceFile(fileName string) *ast.SourceFile {
	path := tspath.ToPath(fileName, p.currentDirectory, p.host.FS().UseCaseSensitiveFileNames())
	text, _ := p.host.FS().ReadFile(fileName)
	sourceFile := parser.ParseSourceFile(fileName, text, p.compilerOptions.GetEmitScriptTarget())
	sourceFile.SetPath(path)
	return sourceFile
}

func getModuleNames(file *ast.SourceFile) []*ast.Node {
	res := slices.Clone(file.Imports)
	for _, imp := range file.ModuleAugmentations {
		if imp.Kind == ast.KindStringLiteral {
			res = append(res, imp)
		}
		// Do nothing if it's an Identifier; we don't need to do module resolution for `declare global`.
	}
	return res
}

func (p *Program) GetSyntacticDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(sourceFile, false /*ensureBound*/, false /*ensureChecked*/, p.getSyntaticDiagnosticsForFile)
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
	return sortAndDeduplicateDiagnostics(globalDiagnostics)
}

func (p *Program) getSyntaticDiagnosticsForFile(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return sourceFile.Diagnostics()
}

func (p *Program) getBindDiagnosticsForFile(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return sourceFile.BindDiagnostics()
}

func (p *Program) getSemanticDiagnosticsForFile(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	diags := core.Concatenate(sourceFile.BindDiagnostics(), p.getTypeCheckerForFile(sourceFile).GetDiagnostics(sourceFile))
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
			if !isCommentOrBlankLine(sourceFile.Text, int(lineStarts[line])) {
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

func sortAndDeduplicateDiagnostics(diagnostics []*ast.Diagnostic) []*ast.Diagnostic {
	result := slices.Clone(diagnostics)
	slices.SortFunc(result, ast.CompareDiagnostics)
	return slices.CompactFunc(result, ast.EqualDiagnostics)
}

func (p *Program) getDiagnosticsHelper(sourceFile *ast.SourceFile, ensureBound bool, ensureChecked bool, getDiagnostics func(*ast.SourceFile) []*ast.Diagnostic) []*ast.Diagnostic {
	if sourceFile != nil {
		if ensureBound {
			binder.BindSourceFile(sourceFile, p.compilerOptions)
		}
		return sortAndDeduplicateDiagnostics(getDiagnostics(sourceFile))
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
	return sortAndDeduplicateDiagnostics(result)
}

func (p *Program) TypeCount() int {
	var count int
	for _, checker := range p.checkers {
		count += int(checker.TypeCount)
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

var unprefixedNodeCoreModules = map[string]bool{
	"assert":              true,
	"assert/strict":       true,
	"async_hooks":         true,
	"buffer":              true,
	"child_process":       true,
	"cluster":             true,
	"console":             true,
	"constants":           true,
	"crypto":              true,
	"dgram":               true,
	"diagnostics_channel": true,
	"dns":                 true,
	"dns/promises":        true,
	"domain":              true,
	"events":              true,
	"fs":                  true,
	"fs/promises":         true,
	"http":                true,
	"http2":               true,
	"https":               true,
	"inspector":           true,
	"inspector/promises":  true,
	"module":              true,
	"net":                 true,
	"os":                  true,
	"path":                true,
	"path/posix":          true,
	"path/win32":          true,
	"perf_hooks":          true,
	"process":             true,
	"punycode":            true,
	"querystring":         true,
	"readline":            true,
	"readline/promises":   true,
	"repl":                true,
	"stream":              true,
	"stream/consumers":    true,
	"stream/promises":     true,
	"stream/web":          true,
	"string_decoder":      true,
	"sys":                 true,
	"test/mock_loader":    true,
	"timers":              true,
	"timers/promises":     true,
	"tls":                 true,
	"trace_events":        true,
	"tty":                 true,
	"url":                 true,
	"util":                true,
	"util/types":          true,
	"v8":                  true,
	"vm":                  true,
	"wasi":                true,
	"worker_threads":      true,
	"zlib":                true,
}

var exclusivelyPrefixedNodeCoreModules = map[string]bool{
	"node:sea":            true,
	"node:sqlite":         true,
	"node:test":           true,
	"node:test/reporters": true,
}

func (p *Program) GetEmitModuleFormatOfFile(sourceFile *ast.SourceFile) core.ModuleKind {
	// !!!
	// Must reimplement the below.
	// Also, previous version is a method on `TypeCheckerHost`/`Program`.

	// mode, hadImpliedFormat := getImpliedNodeFormatForEmitWorker(sourceFile, options)
	// if !hadImpliedFormat {
	// 	mode = options.GetEmitModuleKind()
	// }
	return p.compilerOptions.GetEmitModuleKind()
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
	sourceMaps   []*sourceMapEmitResult // Array of sourceMapData if compiler emitted sourcemaps
}

type sourceMapEmitResult struct {
	inputSourceFileNames []string // Input source file (which one can use on program to get the file), 1:1 mapping with the sourceMap.sources list
	sourceMap            *sourcemap.RawSourceMap
}

func (p *Program) Emit(options *EmitOptions) *EmitResult {
	// !!! performance measurement

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
		wg.Run(func() {
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
	wg.Wait()

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
			result.sourceMaps = append(result.sourceMaps, emitter.sourceMapDataList...)
		}
	}
	return result
}

func (p *Program) GetSourceFile(filename string) *ast.SourceFile {
	path := tspath.ToPath(filename, p.host.GetCurrentDirectory(), p.host.FS().UseCaseSensitiveFileNames())
	return p.filesByPath[path]
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
