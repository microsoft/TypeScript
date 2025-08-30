package compiler

import (
	"context"
	"fmt"
	"io"
	"maps"
	"slices"
	"strings"
	"sync"

	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/outputpaths"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type ProgramOptions struct {
	Host                        CompilerHost
	Config                      *tsoptions.ParsedCommandLine
	UseSourceOfProjectReference bool
	SingleThreaded              core.Tristate
	CreateCheckerPool           func(*Program) CheckerPool
	TypingsLocation             string
	ProjectName                 string
	JSDocParsingMode            ast.JSDocParsingMode
}

func (p *ProgramOptions) canUseProjectReferenceSource() bool {
	return p.UseSourceOfProjectReference && !p.Config.CompilerOptions().DisableSourceOfProjectReferenceRedirect.IsTrue()
}

type Program struct {
	opts        ProgramOptions
	checkerPool CheckerPool

	comparePathsOptions tspath.ComparePathsOptions

	processedFiles

	usesUriStyleNodeCoreModules core.Tristate

	commonSourceDirectory     string
	commonSourceDirectoryOnce sync.Once

	declarationDiagnosticCache collections.SyncMap[*ast.SourceFile, []*ast.Diagnostic]

	programDiagnostics         []*ast.Diagnostic
	hasEmitBlockingDiagnostics collections.Set[tspath.Path]

	sourceFilesToEmitOnce sync.Once
	sourceFilesToEmit     []*ast.SourceFile

	// Cached unresolved imports for ATA
	unresolvedImportsOnce sync.Once
	unresolvedImports     *collections.Set[string]
}

// FileExists implements checker.Program.
func (p *Program) FileExists(path string) bool {
	return p.Host().FS().FileExists(path)
}

// GetCurrentDirectory implements checker.Program.
func (p *Program) GetCurrentDirectory() string {
	return p.Host().GetCurrentDirectory()
}

// GetGlobalTypingsCacheLocation implements checker.Program.
func (p *Program) GetGlobalTypingsCacheLocation() string {
	return "" // !!! see src/tsserver/nodeServer.ts for strada's node-specific implementation
}

// GetNearestAncestorDirectoryWithPackageJson implements checker.Program.
func (p *Program) GetNearestAncestorDirectoryWithPackageJson(dirname string) string {
	scoped := p.resolver.GetPackageScopeForPath(dirname)
	if scoped != nil && scoped.Exists() {
		return scoped.PackageDirectory
	}
	return ""
}

// GetPackageJsonInfo implements checker.Program.
func (p *Program) GetPackageJsonInfo(pkgJsonPath string) modulespecifiers.PackageJsonInfo {
	scoped := p.resolver.GetPackageScopeForPath(pkgJsonPath)
	if scoped != nil && scoped.Exists() && scoped.PackageDirectory == tspath.GetDirectoryPath(pkgJsonPath) {
		return scoped
	}
	return nil
}

// GetRedirectTargets implements checker.Program.
func (p *Program) GetRedirectTargets(path tspath.Path) []string {
	return nil // !!! TODO: project references support
}

// gets the original file that was included in program
// this returns original source file name when including output of project reference
// otherwise same name
// Equivalent to originalFileName on SourceFile in Strada
func (p *Program) GetSourceOfProjectReferenceIfOutputIncluded(file ast.HasFileName) string {
	if source, ok := p.outputFileToProjectReferenceSource[file.Path()]; ok {
		return source
	}
	return file.FileName()
}

// GetProjectReferenceFromSource implements checker.Program.
func (p *Program) GetProjectReferenceFromSource(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
	return p.projectReferenceFileMapper.getProjectReferenceFromSource(path)
}

// IsSourceFromProjectReference implements checker.Program.
func (p *Program) IsSourceFromProjectReference(path tspath.Path) bool {
	return p.projectReferenceFileMapper.isSourceFromProjectReference(path)
}

func (p *Program) GetProjectReferenceFromOutputDts(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
	return p.projectReferenceFileMapper.getProjectReferenceFromOutputDts(path)
}

func (p *Program) GetResolvedProjectReferenceFor(path tspath.Path) (*tsoptions.ParsedCommandLine, bool) {
	return p.projectReferenceFileMapper.getResolvedReferenceFor(path)
}

func (p *Program) GetRedirectForResolution(file ast.HasFileName) *tsoptions.ParsedCommandLine {
	redirect, _ := p.projectReferenceFileMapper.getRedirectForResolution(file)
	return redirect
}

func (p *Program) GetParseFileRedirect(fileName string) string {
	return p.projectReferenceFileMapper.getParseFileRedirect(ast.NewHasFileName(fileName, p.toPath(fileName)))
}

func (p *Program) ForEachResolvedProjectReference(
	fn func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int),
) {
	p.projectReferenceFileMapper.forEachResolvedProjectReference(fn)
}

// UseCaseSensitiveFileNames implements checker.Program.
func (p *Program) UseCaseSensitiveFileNames() bool {
	return p.Host().FS().UseCaseSensitiveFileNames()
}

func (p *Program) UsesUriStyleNodeCoreModules() bool {
	return p.usesUriStyleNodeCoreModules.IsTrue()
}

var _ checker.Program = (*Program)(nil)

/** This should have similar behavior to 'processSourceFile' without diagnostics or mutation. */
func (p *Program) GetSourceFileFromReference(origin *ast.SourceFile, ref *ast.FileReference) *ast.SourceFile {
	// TODO: The module loader in corsa is fairly different than strada, it should probably be able to expose this functionality at some point,
	// rather than redoing the logic approximately here, since most of the related logic now lives in module.Resolver
	// Still, without the failed lookup reporting that only the loader does, this isn't terribly complicated

	fileName := tspath.ResolvePath(tspath.GetDirectoryPath(origin.FileName()), ref.FileName)
	supportedExtensionsBase := tsoptions.GetSupportedExtensions(p.Options(), nil /*extraFileExtensions*/)
	supportedExtensions := tsoptions.GetSupportedExtensionsWithJsonIfResolveJsonModule(p.Options(), supportedExtensionsBase)
	allowNonTsExtensions := p.Options().AllowNonTsExtensions.IsTrue()
	if tspath.HasExtension(fileName) {
		if !allowNonTsExtensions {
			canonicalFileName := tspath.GetCanonicalFileName(fileName, p.UseCaseSensitiveFileNames())
			supported := false
			for _, group := range supportedExtensions {
				if tspath.FileExtensionIsOneOf(canonicalFileName, group) {
					supported = true
					break
				}
			}
			if !supported {
				return nil // unsupported extensions are forced to fail
			}
		}

		return p.GetSourceFile(fileName)
	}
	if allowNonTsExtensions {
		extensionless := p.GetSourceFile(fileName)
		if extensionless != nil {
			return extensionless
		}
	}

	// Only try adding extensions from the first supported group (which should be .ts/.tsx/.d.ts)
	for _, ext := range supportedExtensions[0] {
		result := p.GetSourceFile(fileName + ext)
		if result != nil {
			return result
		}
	}
	return nil
}

func NewProgram(opts ProgramOptions) *Program {
	p := &Program{opts: opts}
	p.initCheckerPool()
	p.processedFiles = processAllProgramFiles(p.opts, p.SingleThreaded())
	p.verifyCompilerOptions()
	return p
}

// Return an updated program for which it is known that only the file with the given path has changed.
// In addition to a new program, return a boolean indicating whether the data of the old program was reused.
func (p *Program) UpdateProgram(changedFilePath tspath.Path, newHost CompilerHost) (*Program, bool) {
	oldFile := p.filesByPath[changedFilePath]
	newOpts := p.opts
	newOpts.Host = newHost
	newFile := newHost.GetSourceFile(oldFile.ParseOptions())
	if !canReplaceFileInProgram(oldFile, newFile) {
		return NewProgram(newOpts), false
	}
	// TODO: reverify compiler options when config has changed?
	result := &Program{
		opts:                        newOpts,
		comparePathsOptions:         p.comparePathsOptions,
		processedFiles:              p.processedFiles,
		usesUriStyleNodeCoreModules: p.usesUriStyleNodeCoreModules,
		programDiagnostics:          p.programDiagnostics,
		hasEmitBlockingDiagnostics:  p.hasEmitBlockingDiagnostics,
		unresolvedImports:           p.unresolvedImports,
	}
	result.initCheckerPool()
	index := core.FindIndex(result.files, func(file *ast.SourceFile) bool { return file.Path() == newFile.Path() })
	result.files = slices.Clone(result.files)
	result.files[index] = newFile
	result.filesByPath = maps.Clone(result.filesByPath)
	result.filesByPath[newFile.Path()] = newFile
	updateFileIncludeProcessor(result)
	return result, true
}

func (p *Program) initCheckerPool() {
	if p.opts.CreateCheckerPool != nil {
		p.checkerPool = p.opts.CreateCheckerPool(p)
	} else {
		p.checkerPool = newCheckerPool(core.IfElse(p.SingleThreaded(), 1, 4), p)
	}
}

func canReplaceFileInProgram(file1 *ast.SourceFile, file2 *ast.SourceFile) bool {
	return file2 != nil &&
		file1.ParseOptions() == file2.ParseOptions() &&
		file1.UsesUriStyleNodeCoreModules == file2.UsesUriStyleNodeCoreModules &&
		slices.EqualFunc(file1.Imports(), file2.Imports(), equalModuleSpecifiers) &&
		slices.EqualFunc(file1.ModuleAugmentations, file2.ModuleAugmentations, equalModuleAugmentationNames) &&
		slices.Equal(file1.AmbientModuleNames, file2.AmbientModuleNames) &&
		slices.EqualFunc(file1.ReferencedFiles, file2.ReferencedFiles, equalFileReferences) &&
		slices.EqualFunc(file1.TypeReferenceDirectives, file2.TypeReferenceDirectives, equalFileReferences) &&
		slices.EqualFunc(file1.LibReferenceDirectives, file2.LibReferenceDirectives, equalFileReferences) &&
		equalCheckJSDirectives(file1.CheckJsDirective, file2.CheckJsDirective)
}

func equalModuleSpecifiers(n1 *ast.Node, n2 *ast.Node) bool {
	return n1.Kind == n2.Kind && (!ast.IsStringLiteral(n1) || n1.Text() == n2.Text())
}

func equalModuleAugmentationNames(n1 *ast.Node, n2 *ast.Node) bool {
	return n1.Kind == n2.Kind && n1.Text() == n2.Text()
}

func equalFileReferences(f1 *ast.FileReference, f2 *ast.FileReference) bool {
	return f1.FileName == f2.FileName && f1.ResolutionMode == f2.ResolutionMode && f1.Preserve == f2.Preserve
}

func equalCheckJSDirectives(d1 *ast.CheckJsDirective, d2 *ast.CheckJsDirective) bool {
	return d1 == nil && d2 == nil || d1 != nil && d2 != nil && d1.Enabled == d2.Enabled
}

func (p *Program) SourceFiles() []*ast.SourceFile            { return p.files }
func (p *Program) Options() *core.CompilerOptions            { return p.opts.Config.CompilerOptions() }
func (p *Program) CommandLine() *tsoptions.ParsedCommandLine { return p.opts.Config }
func (p *Program) Host() CompilerHost                        { return p.opts.Host }
func (p *Program) GetConfigFileParsingDiagnostics() []*ast.Diagnostic {
	return slices.Clip(p.opts.Config.GetConfigFileParsingDiagnostics())
}

// GetUnresolvedImports returns the unresolved imports for this program.
// The result is cached and computed only once.
func (p *Program) GetUnresolvedImports() *collections.Set[string] {
	p.unresolvedImportsOnce.Do(func() {
		if p.unresolvedImports == nil {
			p.unresolvedImports = p.extractUnresolvedImports()
		}
	})

	return p.unresolvedImports
}

func (p *Program) extractUnresolvedImports() *collections.Set[string] {
	unresolvedSet := &collections.Set[string]{}

	for _, sourceFile := range p.files {
		unresolvedImports := p.extractUnresolvedImportsFromSourceFile(sourceFile)
		for _, imp := range unresolvedImports {
			unresolvedSet.Add(imp)
		}
	}

	return unresolvedSet
}

func (p *Program) extractUnresolvedImportsFromSourceFile(file *ast.SourceFile) []string {
	var unresolvedImports []string

	resolvedModules := p.resolvedModules[file.Path()]
	for cacheKey, resolution := range resolvedModules {
		resolved := resolution.IsResolved()
		if (!resolved || !tspath.ExtensionIsOneOf(resolution.Extension, tspath.SupportedTSExtensionsWithJsonFlat)) &&
			!tspath.IsExternalModuleNameRelative(cacheKey.Name) {
			unresolvedImports = append(unresolvedImports, cacheKey.Name)
		}
	}

	return unresolvedImports
}

func (p *Program) SingleThreaded() bool {
	return p.opts.SingleThreaded.DefaultIfUnknown(p.Options().SingleThreaded).IsTrue()
}

func (p *Program) BindSourceFiles() {
	wg := core.NewWorkGroup(p.SingleThreaded())
	for _, file := range p.files {
		if !file.IsBound() {
			wg.Queue(func() {
				binder.BindSourceFile(file)
			})
		}
	}
	wg.RunAndWait()
}

func (p *Program) CheckSourceFiles(ctx context.Context, files []*ast.SourceFile) {
	wg := core.NewWorkGroup(p.SingleThreaded())
	checkers, done := p.checkerPool.GetAllCheckers(ctx)
	defer done()
	for _, checker := range checkers {
		wg.Queue(func() {
			for file := range p.checkerPool.Files(checker) {
				if files == nil || slices.Contains(files, file) {
					checker.CheckSourceFile(ctx, file)
				}
			}
		})
	}
	wg.RunAndWait()
}

// Return the type checker associated with the program.
func (p *Program) GetTypeChecker(ctx context.Context) (*checker.Checker, func()) {
	return p.checkerPool.GetChecker(ctx)
}

func (p *Program) GetTypeCheckers(ctx context.Context) ([]*checker.Checker, func()) {
	return p.checkerPool.GetAllCheckers(ctx)
}

// Return a checker for the given file. We may have multiple checkers in concurrent scenarios and this
// method returns the checker that was tasked with checking the file. Note that it isn't possible to mix
// types obtained from different checkers, so only non-type data (such as diagnostics or string
// representations of types) should be obtained from checkers returned by this method.
func (p *Program) GetTypeCheckerForFile(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	return p.checkerPool.GetCheckerForFile(ctx, file)
}

func (p *Program) GetResolvedModule(file ast.HasFileName, moduleReference string, mode core.ResolutionMode) *module.ResolvedModule {
	if resolutions, ok := p.resolvedModules[file.Path()]; ok {
		if resolved, ok := resolutions[module.ModeAwareCacheKey{Name: moduleReference, Mode: mode}]; ok {
			return resolved
		}
	}
	return nil
}

func (p *Program) GetResolvedModuleFromModuleSpecifier(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) *module.ResolvedModule {
	if !ast.IsStringLiteralLike(moduleSpecifier) {
		panic("moduleSpecifier must be a StringLiteralLike")
	}
	mode := p.GetModeForUsageLocation(file, moduleSpecifier)
	return p.GetResolvedModule(file, moduleSpecifier.Text(), mode)
}

func (p *Program) GetResolvedModules() map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule] {
	return p.resolvedModules
}

func (p *Program) GetSyntacticDiagnostics(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(ctx, sourceFile, false /*ensureBound*/, false /*ensureChecked*/, p.getSyntacticDiagnosticsForFile)
}

func (p *Program) GetBindDiagnostics(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(ctx, sourceFile, true /*ensureBound*/, false /*ensureChecked*/, p.getBindDiagnosticsForFile)
}

func (p *Program) GetSemanticDiagnostics(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(ctx, sourceFile, true /*ensureBound*/, true /*ensureChecked*/, p.getSemanticDiagnosticsForFile)
}

func (p *Program) GetSemanticDiagnosticsNoFilter(ctx context.Context, sourceFiles []*ast.SourceFile) map[*ast.SourceFile][]*ast.Diagnostic {
	p.BindSourceFiles()
	p.CheckSourceFiles(ctx, sourceFiles)
	if ctx.Err() != nil {
		return nil
	}
	result := make(map[*ast.SourceFile][]*ast.Diagnostic, len(sourceFiles))
	for _, file := range sourceFiles {
		result[file] = SortAndDeduplicateDiagnostics(p.getSemanticDiagnosticsForFileNotFilter(ctx, file))
	}
	return result
}

func (p *Program) GetSuggestionDiagnostics(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(ctx, sourceFile, true /*ensureBound*/, true /*ensureChecked*/, p.getSuggestionDiagnosticsForFile)
}

func (p *Program) GetProgramDiagnostics() []*ast.Diagnostic {
	return SortAndDeduplicateDiagnostics(slices.Concat(
		p.programDiagnostics,
		p.includeProcessor.getDiagnostics(p).GetGlobalDiagnostics()))
}

func (p *Program) GetIncludeProcessorDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
	if checker.SkipTypeChecking(sourceFile, p.Options(), p, false) {
		return nil
	}
	filtered, _ := p.getDiagnosticsWithPrecedingDirectives(sourceFile, p.includeProcessor.getDiagnostics(p).GetDiagnosticsForFile(sourceFile.FileName()))
	return filtered
}

func (p *Program) getSourceFilesToEmit(targetSourceFile *ast.SourceFile, forceDtsEmit bool) []*ast.SourceFile {
	if targetSourceFile == nil && !forceDtsEmit {
		p.sourceFilesToEmitOnce.Do(func() {
			p.sourceFilesToEmit = getSourceFilesToEmit(p, nil, false)
		})
		return p.sourceFilesToEmit
	}
	return getSourceFilesToEmit(p, targetSourceFile, forceDtsEmit)
}

func (p *Program) verifyCompilerOptions() {
	options := p.Options()

	sourceFile := core.Memoize(func() *ast.SourceFile {
		configFile := p.opts.Config.ConfigFile
		if configFile == nil {
			return nil
		}
		return configFile.SourceFile
	})

	configFilePath := core.Memoize(func() string {
		file := sourceFile()
		if file != nil {
			return file.FileName()
		}
		return ""
	})

	getCompilerOptionsPropertySyntax := core.Memoize(func() *ast.PropertyAssignment {
		return tsoptions.ForEachTsConfigPropArray(sourceFile(), "compilerOptions", core.Identity)
	})

	getCompilerOptionsObjectLiteralSyntax := core.Memoize(func() *ast.ObjectLiteralExpression {
		compilerOptionsProperty := getCompilerOptionsPropertySyntax()
		if compilerOptionsProperty != nil &&
			compilerOptionsProperty.Initializer != nil &&
			ast.IsObjectLiteralExpression(compilerOptionsProperty.Initializer) {
			return compilerOptionsProperty.Initializer.AsObjectLiteralExpression()
		}
		return nil
	})

	createOptionDiagnosticInObjectLiteralSyntax := func(objectLiteral *ast.ObjectLiteralExpression, onKey bool, key1 string, key2 string, message *diagnostics.Message, args ...any) *ast.Diagnostic {
		diag := tsoptions.ForEachPropertyAssignment(objectLiteral, key1, func(property *ast.PropertyAssignment) *ast.Diagnostic {
			return tsoptions.CreateDiagnosticForNodeInSourceFile(sourceFile(), core.IfElse(onKey, property.Name(), property.Initializer), message, args...)
		}, key2)
		if diag != nil {
			p.programDiagnostics = append(p.programDiagnostics, diag)
		}
		return diag
	}

	createCompilerOptionsDiagnostic := func(message *diagnostics.Message, args ...any) *ast.Diagnostic {
		compilerOptionsProperty := getCompilerOptionsPropertySyntax()
		var diag *ast.Diagnostic
		if compilerOptionsProperty != nil {
			diag = tsoptions.CreateDiagnosticForNodeInSourceFile(sourceFile(), compilerOptionsProperty.Name(), message, args...)
		} else {
			diag = ast.NewCompilerDiagnostic(message, args...)
		}
		p.programDiagnostics = append(p.programDiagnostics, diag)
		return diag
	}

	createDiagnosticForOption := func(onKey bool, option1 string, option2 string, message *diagnostics.Message, args ...any) *ast.Diagnostic {
		diag := createOptionDiagnosticInObjectLiteralSyntax(getCompilerOptionsObjectLiteralSyntax(), onKey, option1, option2, message, args...)
		if diag == nil {
			diag = createCompilerOptionsDiagnostic(message, args...)
		}
		return diag
	}

	createDiagnosticForOptionName := func(message *diagnostics.Message, option1 string, option2 string, args ...any) {
		newArgs := make([]any, 0, len(args)+2)
		newArgs = append(newArgs, option1, option2)
		newArgs = append(newArgs, args...)
		createDiagnosticForOption(true /*onKey*/, option1, option2, message, newArgs...)
	}

	createOptionValueDiagnostic := func(option1 string, message *diagnostics.Message, args ...any) {
		createDiagnosticForOption(false /*onKey*/, option1, "", message, args...)
	}

	createRemovedOptionDiagnostic := func(name string, value string, useInstead string) {
		var message *diagnostics.Message
		var args []any
		if value == "" {
			message = diagnostics.Option_0_has_been_removed_Please_remove_it_from_your_configuration
			args = []any{name}
		} else {
			message = diagnostics.Option_0_1_has_been_removed_Please_remove_it_from_your_configuration
			args = []any{name, value}
		}

		diag := createDiagnosticForOption(value == "", name, "", message, args...)
		if useInstead != "" {
			diag.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.Use_0_instead, useInstead))
		}
	}

	getStrictOptionValue := func(value core.Tristate) bool {
		if value != core.TSUnknown {
			return value == core.TSTrue
		}
		return options.Strict == core.TSTrue
	}

	// Removed in TS7

	if options.BaseUrl != "" {
		// BaseUrl will have been turned absolute by this point.
		var useInstead string
		if configFilePath() != "" {
			relative := tspath.GetRelativePathFromFile(configFilePath(), options.BaseUrl, p.comparePathsOptions)
			if !(strings.HasPrefix(relative, "./") || strings.HasPrefix(relative, "../")) {
				relative = "./" + relative
			}
			suggestion := tspath.CombinePaths(relative, "*")
			useInstead = fmt.Sprintf(`"paths": {"*": [%s]}`, core.Must(json.Marshal(suggestion)))
		}
		createRemovedOptionDiagnostic("baseUrl", "", useInstead)
	}

	if options.OutFile != "" {
		createRemovedOptionDiagnostic("outFile", "", "")
	}

	// if options.Target == core.ScriptTargetES3 {
	// 	createRemovedOptionDiagnostic("target", "ES3", "")
	// }
	// if options.Target == core.ScriptTargetES5 {
	// 	createRemovedOptionDiagnostic("target", "ES5", "")
	// }

	if options.Module == core.ModuleKindAMD {
		createRemovedOptionDiagnostic("module", "AMD", "")
	}
	if options.Module == core.ModuleKindSystem {
		createRemovedOptionDiagnostic("module", "System", "")
	}
	if options.Module == core.ModuleKindUMD {
		createRemovedOptionDiagnostic("module", "UMD", "")
	}

	if options.StrictPropertyInitialization.IsTrue() && !getStrictOptionValue(options.StrictNullChecks) {
		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "strictPropertyInitialization", "strictNullChecks")
	}
	if options.ExactOptionalPropertyTypes.IsTrue() && !getStrictOptionValue(options.StrictNullChecks) {
		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "exactOptionalPropertyTypes", "strictNullChecks")
	}

	if options.IsolatedDeclarations.IsTrue() {
		if options.GetAllowJS() {
			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "allowJs", "isolatedDeclarations")
		}
		if !options.GetEmitDeclarations() {
			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "isolatedDeclarations", "declaration", "composite")
		}
	}

	if options.InlineSourceMap.IsTrue() {
		if options.SourceMap.IsTrue() {
			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "sourceMap", "inlineSourceMap")
		}
		if options.MapRoot != "" {
			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "mapRoot", "inlineSourceMap")
		}
	}

	if options.Composite.IsTrue() {
		if options.Declaration.IsFalse() {
			createDiagnosticForOptionName(diagnostics.Composite_projects_may_not_disable_declaration_emit, "declaration", "")
		}
		if options.Incremental.IsFalse() {
			createDiagnosticForOptionName(diagnostics.Composite_projects_may_not_disable_incremental_compilation, "declaration", "")
		}
	}

	p.verifyProjectReferences()

	if options.Composite.IsTrue() {
		var rootPaths collections.Set[tspath.Path]
		for _, fileName := range p.opts.Config.FileNames() {
			rootPaths.Add(p.toPath(fileName))
		}

		for _, file := range p.files {
			if sourceFileMayBeEmitted(file, p, false) && !rootPaths.Has(file.Path()) {
				p.includeProcessor.addProcessingDiagnostic(&processingDiagnostic{
					kind: processingDiagnosticKindExplainingFileInclude,
					data: &includeExplainingDiagnostic{
						file:    file.Path(),
						message: diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern,
						args:    []any{file.FileName(), configFilePath()},
					},
				})
			}
		}
	}

	forEachOptionPathsSyntax := func(callback func(*ast.PropertyAssignment) *ast.Diagnostic) *ast.Diagnostic {
		return tsoptions.ForEachPropertyAssignment(getCompilerOptionsObjectLiteralSyntax(), "paths", callback)
	}

	createDiagnosticForOptionPaths := func(onKey bool, key string, message *diagnostics.Message, args ...any) *ast.Diagnostic {
		diag := forEachOptionPathsSyntax(func(pathProp *ast.PropertyAssignment) *ast.Diagnostic {
			if ast.IsObjectLiteralExpression(pathProp.Initializer) {
				return createOptionDiagnosticInObjectLiteralSyntax(pathProp.Initializer.AsObjectLiteralExpression(), onKey, key, "", message, args...)
			}
			return nil
		})
		if diag == nil {
			diag = createCompilerOptionsDiagnostic(message, args...)
		}
		return diag
	}

	createDiagnosticForOptionPathKeyValue := func(key string, valueIndex int, message *diagnostics.Message, args ...any) *ast.Diagnostic {
		diag := forEachOptionPathsSyntax(func(pathProp *ast.PropertyAssignment) *ast.Diagnostic {
			if ast.IsObjectLiteralExpression(pathProp.Initializer) {
				return tsoptions.ForEachPropertyAssignment(pathProp.Initializer.AsObjectLiteralExpression(), key, func(keyProps *ast.PropertyAssignment) *ast.Diagnostic {
					initializer := keyProps.Initializer
					if ast.IsArrayLiteralExpression(initializer) {
						elements := initializer.AsArrayLiteralExpression().Elements
						if elements != nil && len(elements.Nodes) > valueIndex {
							diag := tsoptions.CreateDiagnosticForNodeInSourceFile(sourceFile(), elements.Nodes[valueIndex], message, args...)
							p.programDiagnostics = append(p.programDiagnostics, diag)
							return diag
						}
					}
					return nil
				})
			}
			return nil
		})
		if diag == nil {
			diag = createCompilerOptionsDiagnostic(message, args...)
		}
		return diag
	}

	for key, value := range options.Paths.Entries() {
		// !!! This code does not handle cases where where the path mappings have the wrong types,
		// as that information is mostly lost during the parsing process.
		if !hasZeroOrOneAsteriskCharacter(key) {
			createDiagnosticForOptionPaths(true /*onKey*/, key, diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, key)
		}
		if value == nil {
			createDiagnosticForOptionPaths(false /*onKey*/, key, diagnostics.Substitutions_for_pattern_0_should_be_an_array, key)
		} else if len(value) == 0 {
			createDiagnosticForOptionPaths(false /*onKey*/, key, diagnostics.Substitutions_for_pattern_0_shouldn_t_be_an_empty_array, key)
		}
		for i, subst := range value {
			if !hasZeroOrOneAsteriskCharacter(subst) {
				createDiagnosticForOptionPathKeyValue(key, i, diagnostics.Substitution_0_in_pattern_1_can_have_at_most_one_Asterisk_character, subst, key)
			}
			if !tspath.PathIsRelative(subst) && !tspath.PathIsAbsolute(subst) {
				createDiagnosticForOptionPathKeyValue(key, i, diagnostics.Non_relative_paths_are_not_allowed_Did_you_forget_a_leading_Slash)
			}
		}
	}

	if options.SourceMap.IsFalseOrUnknown() && options.InlineSourceMap.IsFalseOrUnknown() {
		if options.InlineSources.IsTrue() {
			createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "inlineSources", "")
		}
		if options.SourceRoot != "" {
			createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "sourceRoot", "")
		}
	}

	if options.MapRoot != "" && !(options.SourceMap.IsTrue() || options.DeclarationMap.IsTrue()) {
		// Error to specify --mapRoot without --sourcemap
		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "mapRoot", "sourceMap", "declarationMap")
	}

	if options.DeclarationDir != "" {
		if !options.GetEmitDeclarations() {
			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "declarationDir", "declaration", "composite")
		}
	}

	if options.DeclarationMap.IsTrue() && !options.GetEmitDeclarations() {
		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "declarationMap", "declaration", "composite")
	}

	if options.Lib != nil && options.NoLib.IsTrue() {
		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "lib", "noLib")
	}

	languageVersion := options.GetEmitScriptTarget()

	firstNonAmbientExternalModuleSourceFile := core.Find(p.files, func(f *ast.SourceFile) bool { return ast.IsExternalModule(f) && !f.IsDeclarationFile })
	if options.IsolatedModules.IsTrue() || options.VerbatimModuleSyntax.IsTrue() {
		if options.Module == core.ModuleKindNone && languageVersion < core.ScriptTargetES2015 && options.IsolatedModules.IsTrue() {
			// !!!
			// createDiagnosticForOptionName(diagnostics.Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES2015_or_higher, "isolatedModules", "target")
		}

		if options.PreserveConstEnums.IsFalse() {
			createDiagnosticForOptionName(diagnostics.Option_preserveConstEnums_cannot_be_disabled_when_0_is_enabled, core.IfElse(options.VerbatimModuleSyntax.IsTrue(), "verbatimModuleSyntax", "isolatedModules"), "preserveConstEnums")
		}
	} else if firstNonAmbientExternalModuleSourceFile != nil && languageVersion < core.ScriptTargetES2015 && options.Module == core.ModuleKindNone {
		// !!!
	}

	if options.OutDir != "" ||
		options.RootDir != "" ||
		options.SourceRoot != "" ||
		options.MapRoot != "" ||
		(options.GetEmitDeclarations() && options.DeclarationDir != "") {
		// !!! sheetal checkSourceFilesBelongToPath - for root Dir and configFile - explaining why file is in the program
		dir := p.CommonSourceDirectory()
		if options.OutDir != "" && dir == "" && core.Some(p.files, func(f *ast.SourceFile) bool { return tspath.GetRootLength(f.FileName()) > 1 }) {
			createDiagnosticForOptionName(diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files, "outDir", "")
		}
	}

	if options.CheckJs.IsTrue() && !options.GetAllowJS() {
		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "checkJs", "allowJs")
	}

	if options.EmitDeclarationOnly.IsTrue() {
		if !options.GetEmitDeclarations() {
			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "emitDeclarationOnly", "declaration", "composite")
		}
	}

	// !!! emitDecoratorMetadata

	if options.JsxFactory != "" {
		if options.ReactNamespace != "" {
			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "reactNamespace", "jsxFactory")
		}
		if options.Jsx == core.JsxEmitReactJSX || options.Jsx == core.JsxEmitReactJSXDev {
			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxFactory", tsoptions.InverseJsxOptionMap.GetOrZero(options.Jsx))
		}
		if parser.ParseIsolatedEntityName(options.JsxFactory) == nil {
			createOptionValueDiagnostic("jsxFactory", diagnostics.Invalid_value_for_jsxFactory_0_is_not_a_valid_identifier_or_qualified_name, options.JsxFactory)
		}
	} else if options.ReactNamespace != "" && !scanner.IsIdentifierText(options.ReactNamespace, core.LanguageVariantStandard) {
		createOptionValueDiagnostic("reactNamespace", diagnostics.Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier, options.ReactNamespace)
	}

	if options.JsxFragmentFactory != "" {
		if options.JsxFactory == "" {
			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "jsxFragmentFactory", "jsxFactory")
		}
		if options.Jsx == core.JsxEmitReactJSX || options.Jsx == core.JsxEmitReactJSXDev {
			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxFragmentFactory", tsoptions.InverseJsxOptionMap.GetOrZero(options.Jsx))
		}
		if parser.ParseIsolatedEntityName(options.JsxFragmentFactory) == nil {
			createOptionValueDiagnostic("jsxFragmentFactory", diagnostics.Invalid_value_for_jsxFragmentFactory_0_is_not_a_valid_identifier_or_qualified_name, options.JsxFragmentFactory)
		}
	}

	if options.ReactNamespace != "" {
		if options.Jsx == core.JsxEmitReactJSX || options.Jsx == core.JsxEmitReactJSXDev {
			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "reactNamespace", tsoptions.InverseJsxOptionMap.GetOrZero(options.Jsx))
		}
	}

	if options.JsxImportSource != "" {
		if options.Jsx == core.JsxEmitReact {
			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxImportSource", tsoptions.InverseJsxOptionMap.GetOrZero(options.Jsx))
		}
	}

	moduleKind := options.GetEmitModuleKind()

	if options.AllowImportingTsExtensions.IsTrue() && !(options.NoEmit.IsTrue() || options.EmitDeclarationOnly.IsTrue() || options.RewriteRelativeImportExtensions.IsTrue()) {
		createOptionValueDiagnostic("allowImportingTsExtensions", diagnostics.Option_allowImportingTsExtensions_can_only_be_used_when_either_noEmit_or_emitDeclarationOnly_is_set)
	}

	moduleResolution := options.GetModuleResolutionKind()
	if options.ResolvePackageJsonExports.IsTrue() && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution) {
		createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "resolvePackageJsonExports", "")
	}
	if options.ResolvePackageJsonImports.IsTrue() && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution) {
		createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "resolvePackageJsonImports", "")
	}
	if options.CustomConditions != nil && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution) {
		createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "customConditions", "")
	}

	// !!! Reenable once we don't map old moduleResolution kinds to bundler.
	// if moduleResolution == core.ModuleResolutionKindBundler && !emitModuleKindIsNonNodeESM(moduleKind) && moduleKind != core.ModuleKindPreserve {
	// 	createOptionValueDiagnostic("moduleResolution", diagnostics.Option_0_can_only_be_used_when_module_is_set_to_preserve_or_to_es2015_or_later, "bundler")
	// }

	if core.ModuleKindNode16 <= moduleKind && moduleKind <= core.ModuleKindNodeNext &&
		!(core.ModuleResolutionKindNode16 <= moduleResolution && moduleResolution <= core.ModuleResolutionKindNodeNext) {
		moduleKindName := moduleKind.String()
		var moduleResolutionName string
		if v, ok := core.ModuleKindToModuleResolutionKind[moduleKind]; ok {
			moduleResolutionName = v.String()
		} else {
			moduleResolutionName = "Node16"
		}
		createOptionValueDiagnostic("moduleResolution", diagnostics.Option_moduleResolution_must_be_set_to_0_or_left_unspecified_when_option_module_is_set_to_1, moduleResolutionName, moduleKindName)
	} else if core.ModuleResolutionKindNode16 <= moduleResolution && moduleResolution <= core.ModuleResolutionKindNodeNext &&
		!(core.ModuleKindNode16 <= moduleKind && moduleKind <= core.ModuleKindNodeNext) {
		moduleResolutionName := moduleResolution.String()
		createOptionValueDiagnostic("module", diagnostics.Option_module_must_be_set_to_0_when_option_moduleResolution_is_set_to_1, moduleResolutionName, moduleResolutionName)
	}

	// !!! The below needs filesByName, which is not equivalent to p.filesByPath.

	// If the emit is enabled make sure that every output file is unique and not overwriting any of the input files
	if !options.NoEmit.IsTrue() && !options.SuppressOutputPathCheck.IsTrue() {
		var emitFilesSeen collections.Set[string]

		// Verify that all the emit files are unique and don't overwrite input files
		verifyEmitFilePath := func(emitFileName string) {
			if emitFileName != "" {
				emitFilePath := p.toPath(emitFileName)
				// Report error if the output overwrites input file
				if _, ok := p.filesByPath[emitFilePath]; ok {
					diag := ast.NewCompilerDiagnostic(diagnostics.Cannot_write_file_0_because_it_would_overwrite_input_file, emitFileName)
					if configFilePath() == "" {
						// The program is from either an inferred project or an external project
						diag.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript_files_Learn_more_at_https_Colon_Slash_Slashaka_ms_Slashtsconfig))
					}
					p.blockEmittingOfFile(emitFileName, diag)
				}

				var emitFileKey string
				if !p.Host().FS().UseCaseSensitiveFileNames() {
					emitFileKey = tspath.ToFileNameLowerCase(string(emitFilePath))
				} else {
					emitFileKey = string(emitFilePath)
				}

				// Report error if multiple files write into same file
				if emitFilesSeen.Has(emitFileKey) {
					// Already seen the same emit file - report error
					p.blockEmittingOfFile(emitFileName, ast.NewCompilerDiagnostic(diagnostics.Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files, emitFileName))
				} else {
					emitFilesSeen.Add(emitFileKey)
				}
			}
		}

		outputpaths.ForEachEmittedFile(p, options, func(emitFileNames *outputpaths.OutputPaths, sourceFile *ast.SourceFile) bool {
			verifyEmitFilePath(emitFileNames.JsFilePath())
			verifyEmitFilePath(emitFileNames.SourceMapFilePath())
			verifyEmitFilePath(emitFileNames.DeclarationFilePath())
			verifyEmitFilePath(emitFileNames.DeclarationMapPath())
			return false
		}, p.getSourceFilesToEmit(nil, false), false)
		verifyEmitFilePath(p.opts.Config.GetBuildInfoFileName())
	}
}

func (p *Program) blockEmittingOfFile(emitFileName string, diag *ast.Diagnostic) {
	p.hasEmitBlockingDiagnostics.Add(p.toPath(emitFileName))
	p.programDiagnostics = append(p.programDiagnostics, diag)
}

func (p *Program) IsEmitBlocked(emitFileName string) bool {
	return p.hasEmitBlockingDiagnostics.Has(p.toPath(emitFileName))
}

func (p *Program) verifyProjectReferences() {
	buildInfoFileName := core.IfElse(!p.Options().SuppressOutputPathCheck.IsTrue(), p.opts.Config.GetBuildInfoFileName(), "")
	createDiagnosticForReference := func(config *tsoptions.ParsedCommandLine, index int, message *diagnostics.Message, args ...any) {
		diag := tsoptions.CreateDiagnosticAtReferenceSyntax(config, index, message, args...)
		if diag == nil {
			diag = ast.NewCompilerDiagnostic(message, args...)
		}
		p.programDiagnostics = append(p.programDiagnostics, diag)
	}

	p.ForEachResolvedProjectReference(func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) {
		ref := parent.ProjectReferences()[index]
		// !!! Deprecated in 5.0 and removed since 5.5
		// verifyRemovedProjectReference(ref, parent, index);
		if config == nil {
			createDiagnosticForReference(parent, index, diagnostics.File_0_not_found, ref.Path)
			return
		}
		refOptions := config.CompilerOptions()
		if !refOptions.Composite.IsTrue() || refOptions.NoEmit.IsTrue() {
			if len(parent.FileNames()) > 0 {
				if !refOptions.Composite.IsTrue() {
					createDiagnosticForReference(parent, index, diagnostics.Referenced_project_0_must_have_setting_composite_Colon_true, ref.Path)
				}
				if refOptions.NoEmit.IsTrue() {
					createDiagnosticForReference(parent, index, diagnostics.Referenced_project_0_may_not_disable_emit, ref.Path)
				}
			}
		}
		if buildInfoFileName != "" && buildInfoFileName == config.GetBuildInfoFileName() {
			createDiagnosticForReference(parent, index, diagnostics.Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_file_generated_by_referenced_project_1, buildInfoFileName, ref.Path)
			p.hasEmitBlockingDiagnostics.Add(p.toPath(buildInfoFileName))
		}
	})
}

func hasZeroOrOneAsteriskCharacter(str string) bool {
	seenAsterisk := false
	for _, ch := range str {
		if ch == '*' {
			if !seenAsterisk {
				seenAsterisk = true
			} else {
				// have already seen asterisk
				return false
			}
		}
	}
	return true
}

func moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution core.ModuleResolutionKind) bool {
	return moduleResolution >= core.ModuleResolutionKindNode16 && moduleResolution <= core.ModuleResolutionKindNodeNext ||
		moduleResolution == core.ModuleResolutionKindBundler
}

func emitModuleKindIsNonNodeESM(moduleKind core.ModuleKind) bool {
	return moduleKind >= core.ModuleKindES2015 && moduleKind <= core.ModuleKindESNext
}

func (p *Program) GetGlobalDiagnostics(ctx context.Context) []*ast.Diagnostic {
	if len(p.files) == 0 {
		return nil
	}

	var globalDiagnostics []*ast.Diagnostic
	checkers, done := p.checkerPool.GetAllCheckers(ctx)
	defer done()
	for _, checker := range checkers {
		globalDiagnostics = append(globalDiagnostics, checker.GetGlobalDiagnostics()...)
	}

	return SortAndDeduplicateDiagnostics(globalDiagnostics)
}

func (p *Program) GetDeclarationDiagnostics(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return p.getDiagnosticsHelper(ctx, sourceFile, true /*ensureBound*/, true /*ensureChecked*/, p.getDeclarationDiagnosticsForFile)
}

func (p *Program) GetOptionsDiagnostics(ctx context.Context) []*ast.Diagnostic {
	return SortAndDeduplicateDiagnostics(append(p.GetGlobalDiagnostics(ctx), p.getOptionsDiagnosticsOfConfigFile()...))
}

func (p *Program) getOptionsDiagnosticsOfConfigFile() []*ast.Diagnostic {
	// todo update p.configParsingDiagnostics when updateAndGetProgramDiagnostics is implemented
	if p.Options() == nil || p.Options().ConfigFilePath == "" {
		return nil
	}
	return p.GetConfigFileParsingDiagnostics() // TODO: actually call getDiagnosticsHelper on config path
}

func (p *Program) getSyntacticDiagnosticsForFile(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return sourceFile.Diagnostics()
}

func (p *Program) getBindDiagnosticsForFile(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
	// TODO: restore this; tsgo's main depends on this function binding all files for timing.
	// if checker.SkipTypeChecking(sourceFile, p.compilerOptions) {
	// 	return nil
	// }

	return sourceFile.BindDiagnostics()
}

func FilterNoEmitSemanticDiagnostics(diagnostics []*ast.Diagnostic, options *core.CompilerOptions) []*ast.Diagnostic {
	if !options.NoEmit.IsTrue() {
		return diagnostics
	}
	return core.Filter(diagnostics, func(d *ast.Diagnostic) bool {
		return !d.SkippedOnNoEmit()
	})
}

func (p *Program) getSemanticDiagnosticsForFile(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
	return slices.Concat(
		FilterNoEmitSemanticDiagnostics(p.getSemanticDiagnosticsForFileNotFilter(ctx, sourceFile), p.Options()),
		p.GetIncludeProcessorDiagnostics(sourceFile),
	)
}

func (p *Program) getSemanticDiagnosticsForFileNotFilter(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
	compilerOptions := p.Options()
	if checker.SkipTypeChecking(sourceFile, compilerOptions, p, false) {
		return nil
	}

	var fileChecker *checker.Checker
	var done func()
	if sourceFile != nil {
		fileChecker, done = p.checkerPool.GetCheckerForFile(ctx, sourceFile)
		defer done()
	}
	diags := slices.Clip(sourceFile.BindDiagnostics())
	checkers, closeCheckers := p.checkerPool.GetAllCheckers(ctx)
	defer closeCheckers()

	// Ask for diags from all checkers; checking one file may add diagnostics to other files.
	// These are deduplicated later.
	for _, checker := range checkers {
		if sourceFile == nil || checker == fileChecker {
			diags = append(diags, checker.GetDiagnostics(ctx, sourceFile)...)
		} else {
			diags = append(diags, checker.GetDiagnosticsWithoutCheck(sourceFile)...)
		}
	}
	if ctx.Err() != nil {
		return nil
	}

	// !!! This should be rewritten to work like getBindAndCheckDiagnosticsForFileNoCache.

	isPlainJS := ast.IsPlainJSFile(sourceFile, compilerOptions.CheckJs)
	if isPlainJS {
		return core.Filter(diags, func(d *ast.Diagnostic) bool {
			return plainJSErrors.Has(d.Code())
		})
	}

	filtered, directivesByLine := p.getDiagnosticsWithPrecedingDirectives(sourceFile, diags)
	for _, directive := range directivesByLine {
		// Above we changed all used directive kinds to @ts-ignore, so any @ts-expect-error directives that
		// remain are unused and thus errors.
		if directive.Kind == ast.CommentDirectiveKindExpectError {
			filtered = append(filtered, ast.NewDiagnostic(sourceFile, directive.Loc, diagnostics.Unused_ts_expect_error_directive))
		}
	}
	return filtered
}

func (p *Program) getDiagnosticsWithPrecedingDirectives(sourceFile *ast.SourceFile, diags []*ast.Diagnostic) ([]*ast.Diagnostic, map[int]ast.CommentDirective) {
	if len(sourceFile.CommentDirectives) == 0 {
		return diags, nil
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
	return filtered, directivesByLine
}

func (p *Program) getDeclarationDiagnosticsForFile(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
	if sourceFile.IsDeclarationFile {
		return []*ast.Diagnostic{}
	}

	if cached, ok := p.declarationDiagnosticCache.Load(sourceFile); ok {
		return cached
	}

	host, done := newEmitHost(ctx, p, sourceFile)
	defer done()
	diagnostics := getDeclarationDiagnostics(host, sourceFile)
	diagnostics, _ = p.declarationDiagnosticCache.LoadOrStore(sourceFile, diagnostics)
	return diagnostics
}

func (p *Program) getSuggestionDiagnosticsForFile(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
	if checker.SkipTypeChecking(sourceFile, p.Options(), p, false) {
		return nil
	}

	var fileChecker *checker.Checker
	var done func()
	if sourceFile != nil {
		fileChecker, done = p.checkerPool.GetCheckerForFile(ctx, sourceFile)
		defer done()
	}

	diags := slices.Clip(sourceFile.BindSuggestionDiagnostics)

	checkers, closeCheckers := p.checkerPool.GetAllCheckers(ctx)
	defer closeCheckers()

	// Ask for diags from all checkers; checking one file may add diagnostics to other files.
	// These are deduplicated later.
	for _, checker := range checkers {
		if sourceFile == nil || checker == fileChecker {
			diags = append(diags, checker.GetSuggestionDiagnostics(ctx, sourceFile)...)
		} else {
			// !!! is there any case where suggestion diagnostics are produced in other checkers?
		}
	}
	if ctx.Err() != nil {
		return nil
	}

	return diags
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
	diagnostics = slices.Clone(diagnostics)
	slices.SortFunc(diagnostics, ast.CompareDiagnostics)
	return compactAndMergeRelatedInfos(diagnostics)
}

// Remove duplicate diagnostics and, for sequences of diagnostics that differ only by related information,
// create a single diagnostic with sorted and deduplicated related information.
func compactAndMergeRelatedInfos(diagnostics []*ast.Diagnostic) []*ast.Diagnostic {
	if len(diagnostics) < 2 {
		return diagnostics
	}
	i := 0
	j := 0
	for i < len(diagnostics) {
		d := diagnostics[i]
		n := 1
		for i+n < len(diagnostics) && ast.EqualDiagnosticsNoRelatedInfo(d, diagnostics[i+n]) {
			n++
		}
		if n > 1 {
			var relatedInfos []*ast.Diagnostic
			for k := range n {
				relatedInfos = append(relatedInfos, diagnostics[i+k].RelatedInformation()...)
			}
			if relatedInfos != nil {
				slices.SortFunc(relatedInfos, ast.CompareDiagnostics)
				relatedInfos = slices.CompactFunc(relatedInfos, ast.EqualDiagnostics)
				d = d.Clone().SetRelatedInfo(relatedInfos)
			}
		}
		diagnostics[j] = d
		i += n
		j++
	}
	clear(diagnostics[j:])
	return diagnostics[:j]
}

func (p *Program) getDiagnosticsHelper(ctx context.Context, sourceFile *ast.SourceFile, ensureBound bool, ensureChecked bool, getDiagnostics func(context.Context, *ast.SourceFile) []*ast.Diagnostic) []*ast.Diagnostic {
	if sourceFile != nil {
		if ensureBound {
			binder.BindSourceFile(sourceFile)
		}
		return SortAndDeduplicateDiagnostics(getDiagnostics(ctx, sourceFile))
	}
	if ensureBound {
		p.BindSourceFiles()
	}
	if ensureChecked {
		p.CheckSourceFiles(ctx, nil)
		if ctx.Err() != nil {
			return nil
		}
	}
	var result []*ast.Diagnostic
	for _, file := range p.files {
		result = append(result, getDiagnostics(ctx, file)...)
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
	checkers, done := p.checkerPool.GetAllCheckers(context.Background())
	defer done()
	for _, checker := range checkers {
		count += int(checker.SymbolCount)
	}
	return count
}

func (p *Program) TypeCount() int {
	var count int
	checkers, done := p.checkerPool.GetAllCheckers(context.Background())
	defer done()
	for _, checker := range checkers {
		count += int(checker.TypeCount)
	}
	return count
}

func (p *Program) InstantiationCount() int {
	var count int
	checkers, done := p.checkerPool.GetAllCheckers(context.Background())
	defer done()
	for _, checker := range checkers {
		count += int(checker.TotalInstantiationCount)
	}
	return count
}

func (p *Program) GetSourceFileMetaData(path tspath.Path) ast.SourceFileMetaData {
	return p.sourceFileMetaDatas[path]
}

func (p *Program) GetEmitModuleFormatOfFile(sourceFile ast.HasFileName) core.ModuleKind {
	return ast.GetEmitModuleFormatOfFileWorker(sourceFile.FileName(), p.projectReferenceFileMapper.getCompilerOptionsForFile(sourceFile), p.GetSourceFileMetaData(sourceFile.Path()))
}

func (p *Program) GetEmitSyntaxForUsageLocation(sourceFile ast.HasFileName, location *ast.StringLiteralLike) core.ResolutionMode {
	return getEmitSyntaxForUsageLocationWorker(sourceFile.FileName(), p.sourceFileMetaDatas[sourceFile.Path()], location, p.projectReferenceFileMapper.getCompilerOptionsForFile(sourceFile))
}

func (p *Program) GetImpliedNodeFormatForEmit(sourceFile ast.HasFileName) core.ResolutionMode {
	return ast.GetImpliedNodeFormatForEmitWorker(sourceFile.FileName(), p.projectReferenceFileMapper.getCompilerOptionsForFile(sourceFile).GetEmitModuleKind(), p.GetSourceFileMetaData(sourceFile.Path()))
}

func (p *Program) GetModeForUsageLocation(sourceFile ast.HasFileName, location *ast.StringLiteralLike) core.ResolutionMode {
	return getModeForUsageLocation(sourceFile.FileName(), p.sourceFileMetaDatas[sourceFile.Path()], location, p.projectReferenceFileMapper.getCompilerOptionsForFile(sourceFile))
}

func (p *Program) GetDefaultResolutionModeForFile(sourceFile ast.HasFileName) core.ResolutionMode {
	return getDefaultResolutionModeForFile(sourceFile.FileName(), p.sourceFileMetaDatas[sourceFile.Path()], p.projectReferenceFileMapper.getCompilerOptionsForFile(sourceFile))
}

func (p *Program) IsSourceFileDefaultLibrary(path tspath.Path) bool {
	_, ok := p.libFiles[path]
	return ok
}

func (p *Program) GetDefaultLibFile(path tspath.Path) *LibFile {
	if libFile, ok := p.libFiles[path]; ok {
		return libFile
	}
	return nil
}

func (p *Program) CommonSourceDirectory() string {
	p.commonSourceDirectoryOnce.Do(func() {
		p.commonSourceDirectory = outputpaths.GetCommonSourceDirectory(
			p.Options(),
			func() []string {
				var files []string
				for _, file := range p.files {
					if sourceFileMayBeEmitted(file, p, false /*forceDtsEmit*/) {
						files = append(files, file.FileName())
					}
				}
				return files
			},
			p.GetCurrentDirectory(),
			p.UseCaseSensitiveFileNames(),
		)
	})
	return p.commonSourceDirectory
}

type WriteFileData struct {
	SourceMapUrlPos int
	BuildInfo       any
	Diagnostics     []*ast.Diagnostic
	SkippedDtsWrite bool
}

type EmitOptions struct {
	TargetSourceFile *ast.SourceFile // Single file to emit. If `nil`, emits all files
	EmitOnly         EmitOnly
	WriteFile        func(fileName string, text string, writeByteOrderMark bool, data *WriteFileData) error
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

func (p *Program) Emit(ctx context.Context, options EmitOptions) *EmitResult {
	// !!! performance measurement
	p.BindSourceFiles()
	if options.EmitOnly != EmitOnlyForcedDts {
		result := HandleNoEmitOnError(
			ctx,
			p,
			options.TargetSourceFile,
		)
		if result != nil || ctx.Err() != nil {
			return result
		}
	}

	writerPool := &sync.Pool{
		New: func() any {
			return printer.NewTextWriter(p.Options().NewLine.GetNewLineCharacter())
		},
	}
	wg := core.NewWorkGroup(p.SingleThreaded())
	var emitters []*emitter
	sourceFiles := p.getSourceFilesToEmit(options.TargetSourceFile, options.EmitOnly == EmitOnlyForcedDts)

	for _, sourceFile := range sourceFiles {
		emitter := &emitter{
			writer:     nil,
			sourceFile: sourceFile,
			emitOnly:   options.EmitOnly,
			writeFile:  options.WriteFile,
		}
		emitters = append(emitters, emitter)
		wg.Queue(func() {
			host, done := newEmitHost(ctx, p, sourceFile)
			defer done()
			emitter.host = host

			// take an unused writer
			writer := writerPool.Get().(printer.EmitTextWriter)
			writer.Clear()

			// attach writer and perform emit
			emitter.writer = writer
			emitter.paths = outputpaths.GetOutputPathsFor(sourceFile, host.Options(), host, options.EmitOnly == EmitOnlyForcedDts)
			emitter.emit()
			emitter.writer = nil

			// put the writer back in the pool
			writerPool.Put(writer)
		})
	}

	// wait for emit to complete
	wg.RunAndWait()

	// collect results from emit, preserving input order
	return CombineEmitResults(core.Map(emitters, func(e *emitter) *EmitResult {
		return &e.emitResult
	}))
}

func CombineEmitResults(results []*EmitResult) *EmitResult {
	result := &EmitResult{}
	for _, emitResult := range results {
		if emitResult == nil {
			continue // Skip nil results
		}
		if emitResult.EmitSkipped {
			result.EmitSkipped = true
		}
		result.Diagnostics = append(result.Diagnostics, emitResult.Diagnostics...)
		result.EmittedFiles = append(result.EmittedFiles, emitResult.EmittedFiles...)
		if emitResult.SourceMaps != nil {
			result.SourceMaps = append(result.SourceMaps, emitResult.SourceMaps...)
		}
	}
	return result
}

type ProgramLike interface {
	Options() *core.CompilerOptions
	GetSourceFiles() []*ast.SourceFile
	GetConfigFileParsingDiagnostics() []*ast.Diagnostic
	GetSyntacticDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic
	GetBindDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic
	GetOptionsDiagnostics(ctx context.Context) []*ast.Diagnostic
	GetProgramDiagnostics() []*ast.Diagnostic
	GetGlobalDiagnostics(ctx context.Context) []*ast.Diagnostic
	GetSemanticDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic
	GetDeclarationDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic
	Emit(ctx context.Context, options EmitOptions) *EmitResult
}

func HandleNoEmitOnError(ctx context.Context, program ProgramLike, file *ast.SourceFile) *EmitResult {
	if !program.Options().NoEmitOnError.IsTrue() {
		return nil // No emit on error is not set, so we can proceed with emitting
	}

	diagnostics := GetDiagnosticsOfAnyProgram(
		ctx,
		program,
		file,
		true,
		program.GetBindDiagnostics,
		program.GetSemanticDiagnostics,
	)
	if len(diagnostics) == 0 {
		return nil // No diagnostics, so we can proceed with emitting
	}
	return &EmitResult{
		Diagnostics: diagnostics,
		EmitSkipped: true,
	}
}

func GetDiagnosticsOfAnyProgram(
	ctx context.Context,
	program ProgramLike,
	file *ast.SourceFile,
	skipNoEmitCheckForDtsDiagnostics bool,
	getBindDiagnostics func(context.Context, *ast.SourceFile) []*ast.Diagnostic,
	getSemanticDiagnostics func(context.Context, *ast.SourceFile) []*ast.Diagnostic,
) []*ast.Diagnostic {
	allDiagnostics := slices.Clip(program.GetConfigFileParsingDiagnostics())
	configFileParsingDiagnosticsLength := len(allDiagnostics)

	allDiagnostics = append(allDiagnostics, program.GetSyntacticDiagnostics(ctx, file)...)
	allDiagnostics = append(allDiagnostics, program.GetProgramDiagnostics()...)

	if len(allDiagnostics) == configFileParsingDiagnosticsLength {
		// Options diagnostics include global diagnostics (even though we collect them separately),
		// and global diagnostics create checkers, which then bind all of the files. Do this binding
		// early so we can track the time.
		getBindDiagnostics(ctx, file)

		allDiagnostics = append(allDiagnostics, program.GetOptionsDiagnostics(ctx)...)

		if program.Options().ListFilesOnly.IsFalseOrUnknown() {
			allDiagnostics = append(allDiagnostics, program.GetGlobalDiagnostics(ctx)...)

			if len(allDiagnostics) == configFileParsingDiagnosticsLength {
				allDiagnostics = append(allDiagnostics, getSemanticDiagnostics(ctx, file)...)
			}

			if (skipNoEmitCheckForDtsDiagnostics || program.Options().NoEmit.IsTrue()) && program.Options().GetEmitDeclarations() && len(allDiagnostics) == configFileParsingDiagnosticsLength {
				allDiagnostics = append(allDiagnostics, program.GetDeclarationDiagnostics(ctx, file)...)
			}
		}
	}
	return allDiagnostics
}

func (p *Program) toPath(filename string) tspath.Path {
	return tspath.ToPath(filename, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
}

func (p *Program) GetSourceFile(filename string) *ast.SourceFile {
	path := p.toPath(filename)
	return p.GetSourceFileByPath(path)
}

func (p *Program) GetSourceFileForResolvedModule(fileName string) *ast.SourceFile {
	file := p.GetSourceFile(fileName)
	if file == nil {
		filename := p.GetParseFileRedirect(fileName)
		if filename != "" {
			return p.GetSourceFile(filename)
		}
	}
	return file
}

func (p *Program) GetSourceFileByPath(path tspath.Path) *ast.SourceFile {
	return p.filesByPath[path]
}

func (p *Program) HasSameFileNames(other *Program) bool {
	return maps.EqualFunc(p.filesByPath, other.filesByPath, func(a, b *ast.SourceFile) bool {
		// checks for casing differences on case-insensitive file systems
		return a.FileName() == b.FileName()
	})
}

func (p *Program) GetSourceFiles() []*ast.SourceFile {
	return p.files
}

func (p *Program) ExplainFiles(w io.Writer) {
	toRelativeFileName := func(fileName string) string {
		return tspath.GetRelativePathFromDirectory(p.GetCurrentDirectory(), fileName, p.comparePathsOptions)
	}
	for _, file := range p.GetSourceFiles() {
		fmt.Fprintln(w, toRelativeFileName(file.FileName()))
		for _, reason := range p.includeProcessor.fileIncludeReasons[file.Path()] {
			fmt.Fprintln(w, "  ", reason.toDiagnostic(p, true).Message())
		}
		for _, diag := range p.includeProcessor.explainRedirectAndImpliedFormat(p, file, toRelativeFileName) {
			fmt.Fprintln(w, "  ", diag.Message())
		}
	}
}

func (p *Program) GetLibFileFromReference(ref *ast.FileReference) *ast.SourceFile {
	path, ok := tsoptions.GetLibFileName(ref.FileName)
	if !ok {
		return nil
	}
	if sourceFile, ok := p.filesByPath[tspath.Path(path)]; ok {
		return sourceFile
	}
	return nil
}

func (p *Program) GetResolvedTypeReferenceDirectiveFromTypeReferenceDirective(typeRef *ast.FileReference, sourceFile *ast.SourceFile) *module.ResolvedTypeReferenceDirective {
	if resolutions, ok := p.typeResolutionsInFile[sourceFile.Path()]; ok {
		if resolved, ok := resolutions[module.ModeAwareCacheKey{Name: typeRef.FileName, Mode: p.getModeForTypeReferenceDirectiveInFile(typeRef, sourceFile)}]; ok {
			return resolved
		}
	}
	return nil
}

func (p *Program) GetResolvedTypeReferenceDirectives() map[tspath.Path]module.ModeAwareCache[*module.ResolvedTypeReferenceDirective] {
	return p.typeResolutionsInFile
}

func (p *Program) getModeForTypeReferenceDirectiveInFile(ref *ast.FileReference, sourceFile *ast.SourceFile) core.ResolutionMode {
	if ref.ResolutionMode != core.ResolutionModeNone {
		return ref.ResolutionMode
	}
	return p.GetDefaultResolutionModeForFile(sourceFile)
}

func (p *Program) IsSourceFileFromExternalLibrary(file *ast.SourceFile) bool {
	return p.sourceFilesFoundSearchingNodeModules.Has(file.Path())
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

func (p *Program) SourceFileMayBeEmitted(sourceFile *ast.SourceFile, forceDtsEmit bool) bool {
	return sourceFileMayBeEmitted(sourceFile, p, forceDtsEmit)
}

var plainJSErrors = collections.NewSetFromItems(
	// binder errors
	diagnostics.Cannot_redeclare_block_scoped_variable_0.Code(),
	diagnostics.A_module_cannot_have_multiple_default_exports.Code(),
	diagnostics.Another_export_default_is_here.Code(),
	diagnostics.The_first_export_default_is_here.Code(),
	diagnostics.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module.Code(),
	diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode.Code(),
	diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here.Code(),
	diagnostics.X_constructor_is_a_reserved_word.Code(),
	diagnostics.X_delete_cannot_be_called_on_an_identifier_in_strict_mode.Code(),
	diagnostics.Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of_0_For_more_information_see_https_Colon_Slash_Slashdeveloper_mozilla_org_Slashen_US_Slashdocs_SlashWeb_SlashJavaScript_SlashReference_SlashStrict_mode.Code(),
	diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode.Code(),
	diagnostics.Invalid_use_of_0_in_strict_mode.Code(),
	diagnostics.A_label_is_not_allowed_here.Code(),
	diagnostics.X_with_statements_are_not_allowed_in_strict_mode.Code(),
	// grammar errors
	diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement.Code(),
	diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement.Code(),
	diagnostics.A_class_declaration_without_the_default_modifier_must_have_a_name.Code(),
	diagnostics.A_class_member_cannot_have_the_0_keyword.Code(),
	diagnostics.A_comma_expression_is_not_allowed_in_a_computed_property_name.Code(),
	diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement.Code(),
	diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement.Code(),
	diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement.Code(),
	diagnostics.A_default_export_must_be_at_the_top_level_of_a_file_or_module_declaration.Code(),
	diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context.Code(),
	diagnostics.A_destructuring_declaration_must_have_an_initializer.Code(),
	diagnostics.A_get_accessor_cannot_have_parameters.Code(),
	diagnostics.A_rest_element_cannot_contain_a_binding_pattern.Code(),
	diagnostics.A_rest_element_cannot_have_a_property_name.Code(),
	diagnostics.A_rest_element_cannot_have_an_initializer.Code(),
	diagnostics.A_rest_element_must_be_last_in_a_destructuring_pattern.Code(),
	diagnostics.A_rest_parameter_cannot_have_an_initializer.Code(),
	diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list.Code(),
	diagnostics.A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma.Code(),
	diagnostics.A_return_statement_cannot_be_used_inside_a_class_static_block.Code(),
	diagnostics.A_set_accessor_cannot_have_rest_parameter.Code(),
	diagnostics.A_set_accessor_must_have_exactly_one_parameter.Code(),
	diagnostics.An_export_declaration_can_only_be_used_at_the_top_level_of_a_module.Code(),
	diagnostics.An_export_declaration_cannot_have_modifiers.Code(),
	diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_module.Code(),
	diagnostics.An_import_declaration_cannot_have_modifiers.Code(),
	diagnostics.An_object_member_cannot_be_declared_optional.Code(),
	diagnostics.Argument_of_dynamic_import_cannot_be_spread_element.Code(),
	diagnostics.Cannot_assign_to_private_method_0_Private_methods_are_not_writable.Code(),
	diagnostics.Cannot_redeclare_identifier_0_in_catch_clause.Code(),
	diagnostics.Catch_clause_variable_cannot_have_an_initializer.Code(),
	diagnostics.Class_decorators_can_t_be_used_with_static_private_identifier_Consider_removing_the_experimental_decorator.Code(),
	diagnostics.Classes_can_only_extend_a_single_class.Code(),
	diagnostics.Classes_may_not_have_a_field_named_constructor.Code(),
	diagnostics.Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_part_of_a_destructuring_pattern.Code(),
	diagnostics.Duplicate_label_0.Code(),
	diagnostics.Dynamic_imports_can_only_accept_a_module_specifier_and_an_optional_set_of_attributes_as_arguments.Code(),
	diagnostics.X_for_await_loops_cannot_be_used_inside_a_class_static_block.Code(),
	diagnostics.JSX_attributes_must_only_be_assigned_a_non_empty_expression.Code(),
	diagnostics.JSX_elements_cannot_have_multiple_attributes_with_the_same_name.Code(),
	diagnostics.JSX_expressions_may_not_use_the_comma_operator_Did_you_mean_to_write_an_array.Code(),
	diagnostics.JSX_property_access_expressions_cannot_include_JSX_namespace_names.Code(),
	diagnostics.Jump_target_cannot_cross_function_boundary.Code(),
	diagnostics.Line_terminator_not_permitted_before_arrow.Code(),
	diagnostics.Modifiers_cannot_appear_here.Code(),
	diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement.Code(),
	diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement.Code(),
	diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies.Code(),
	diagnostics.Private_identifiers_are_only_allowed_in_class_bodies_and_may_only_be_used_as_part_of_a_class_member_declaration_property_access_or_on_the_left_hand_side_of_an_in_expression.Code(),
	diagnostics.Property_0_is_not_accessible_outside_class_1_because_it_has_a_private_identifier.Code(),
	diagnostics.Tagged_template_expressions_are_not_permitted_in_an_optional_chain.Code(),
	diagnostics.The_left_hand_side_of_a_for_of_statement_may_not_be_async.Code(),
	diagnostics.The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer.Code(),
	diagnostics.The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer.Code(),
	diagnostics.Trailing_comma_not_allowed.Code(),
	diagnostics.Variable_declaration_list_cannot_be_empty.Code(),
	diagnostics.X_0_and_1_operations_cannot_be_mixed_without_parentheses.Code(),
	diagnostics.X_0_expected.Code(),
	diagnostics.X_0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2.Code(),
	diagnostics.X_0_list_cannot_be_empty.Code(),
	diagnostics.X_0_modifier_already_seen.Code(),
	diagnostics.X_0_modifier_cannot_appear_on_a_constructor_declaration.Code(),
	diagnostics.X_0_modifier_cannot_appear_on_a_module_or_namespace_element.Code(),
	diagnostics.X_0_modifier_cannot_appear_on_a_parameter.Code(),
	diagnostics.X_0_modifier_cannot_appear_on_class_elements_of_this_kind.Code(),
	diagnostics.X_0_modifier_cannot_be_used_here.Code(),
	diagnostics.X_0_modifier_must_precede_1_modifier.Code(),
	diagnostics.X_0_declarations_can_only_be_declared_inside_a_block.Code(),
	diagnostics.X_0_declarations_must_be_initialized.Code(),
	diagnostics.X_extends_clause_already_seen.Code(),
	diagnostics.X_let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations.Code(),
	diagnostics.Class_constructor_may_not_be_a_generator.Code(),
	diagnostics.Class_constructor_may_not_be_an_accessor.Code(),
	diagnostics.X_await_expressions_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules.Code(),
	diagnostics.X_await_using_statements_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules.Code(),
	diagnostics.Private_field_0_must_be_declared_in_an_enclosing_class.Code(),
	// Type errors
	diagnostics.This_condition_will_always_return_0_since_JavaScript_compares_objects_by_reference_not_value.Code(),
)
