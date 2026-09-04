package compiler

import (
	"cmp"
	"errors"
	"fmt"
	"slices"
	"strings"
	"sync"
	"sync/atomic"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"github.com/microsoft/TypeScript/tsc/internal/tracing"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/zeebo/xxh3"
)

type libResolution struct {
	libraryName string
	resolution  *module.ResolvedModule
	trace       []module.DiagAndArgs
}

// maxContentMapperFailures is the number of transform failures a single content mapper may accumulate
// before it is disabled for the rest of the program.
const maxContentMapperFailures = 5

type LibFile struct {
	Name     string
	path     tspath.RootedFilePath
	pathKey  tspath.PathKey
	Replaced bool
}

type sourceFileFromReferenceDiagnostic struct {
	message *diagnostics.Message
	args    []any
}

type fileLoader struct {
	opts                                           ProgramOptions
	resolver                                       *module.Resolver
	defaultLibraryPath                             tspath.RootedDirectoryPath
	caseSensitivity                                tspath.CaseSensitivity
	supportedExtensions                            [][]string
	supportedExtensionsWithJsonIfResolveJsonModule [][]string
	contentMapperExtensions                        []string

	filesParser *filesParser
	rootTasks   []*parseTask

	totalFileCount atomic.Int32
	libFileCount   atomic.Int32

	factoryMu sync.Mutex
	factory   ast.NodeFactory

	projectReferenceFileMapper *projectReferenceFileMapper
	dtsDirectories             collections.Set[tspath.PathKey]

	pathForLibFileCache       collections.SyncMap[string, *LibFile]
	pathForLibFileResolutions collections.SyncMap[tspath.PathKey, *libResolution]

	// contentMapperMu guards the content-mapper bookkeeping below, which is written concurrently as
	// content-mapped files are parsed across worker goroutines.
	contentMapperMu          sync.Mutex
	contentMapperFailures    map[*contentmapper.Mapper]int
	contentMapperInitFailed  collections.Set[*contentmapper.Mapper]
	contentMapperDiagnostics []*ast.Diagnostic
}

type redirectsFile struct {
	// Index of file at which this redirect file needs to be iterated
	index    int
	fileName tspath.RootedFilePath
	path     tspath.PathKey
	target   tspath.PathKey
}

type DuplicateSourceFile struct {
	ParseOptions ast.SourceFileParseOptions
	// ContentMapperParseOptions are the acquire-time options for a content-mapped parse-cache entry.
	ContentMapperParseOptions ast.SourceFileParseOptions
	Hash                      xxh3.Uint128
	ScriptKind                core.ScriptKind
	// ContentMapper is the identity of the content mapper that produced this file,
	// or "" if the file is not content-mapped.
	ContentMapper string
	// IsContentMapperFailureStub reports whether the file is an empty placeholder
	// from a failed transform.
	IsContentMapperFailureStub bool
}

var _ ast.HasFileName = (*redirectsFile)(nil)

func (r *redirectsFile) FileName() tspath.RootedFilePath {
	return r.fileName
}

func (r *redirectsFile) PathKey() tspath.PathKey {
	return r.path
}

type processedFiles struct {
	resolver *module.Resolver
	files    []*ast.SourceFile
	// duplicateSourceFiles tracks parsed files loaded during program construction
	// that were later dropped from the final program, such as losing filename
	// casing variants for the same path or files hidden behind package redirect
	// deduplication. Their parse-cache acquires still need to be balanced when
	// the program is disposed.
	duplicateSourceFiles          []*DuplicateSourceFile
	filesByPath                   map[tspath.PathKey]*ast.SourceFile
	projectReferenceFileMapper    *projectReferenceFileMapper
	missingFiles                  collections.Set[tspath.PathKey]
	resolvedModules               map[tspath.PathKey]module.ModeAwareCache[*module.ResolvedModule]
	typeResolutionsInFile         map[tspath.PathKey]module.ModeAwareCache[*module.ResolvedTypeReferenceDirective]
	sourceFileMetaDatas           map[tspath.PathKey]ast.SourceFileMetaData
	jsxRuntimeImportSpecifiers    map[tspath.PathKey]*jsxRuntimeImportSpecifier
	importHelpersImportSpecifiers map[tspath.PathKey]*ast.StringLiteralNode
	libFiles                      map[tspath.PathKey]*LibFile
	// List of present unsupported extensions
	sourceFilesFoundSearchingNodeModules collections.Set[tspath.PathKey]
	includeProcessor                     *includeProcessor
	// if file was included using source file and its output is actually part of program
	// this contains mapping from output to source file
	outputFileToProjectReferenceSource map[tspath.PathKey]tspath.RootedFilePath
	// Key is a file path. Value is the list of files that redirect to it (same package, different install location)
	redirectTargetsMap map[tspath.PathKey][]tspath.RootedFilePath
	// filesByPath for redirect files
	redirectFilesByPath map[tspath.PathKey]*redirectsFile
	// Program-level diagnostics reported when a content mapper fails fatally (reported once per mapper).
	contentMapperDiagnostics []*ast.Diagnostic
	finishedProcessing       bool
}

type jsxRuntimeImportSpecifier struct {
	moduleReference string
	specifier       *ast.StringLiteralNode
}

func processAllProgramFiles(
	opts ProgramOptions,
	singleThreaded bool,
) processedFiles {
	compilerOptions := opts.Config.CompilerOptions()
	rootFiles := opts.Config.FileNames()
	supportedExtensions := tsoptions.GetSupportedExtensions(compilerOptions, opts.Config.ContentMapperExtensions())
	supportedExtensionsWithJsonIfResolveJsonModule := tsoptions.GetSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions, supportedExtensions)
	var maxNodeModuleJsDepth int
	if p := opts.Config.CompilerOptions().MaxNodeModuleJsDepth; p != nil {
		maxNodeModuleJsDepth = *p
	}
	loader := fileLoader{
		opts:               opts,
		defaultLibraryPath: opts.Host.DefaultLibraryPath(),
		caseSensitivity:    opts.Host.FS().CaseSensitivity(),
		filesParser: &filesParser{
			wg:       core.NewWorkGroup(singleThreaded),
			maxDepth: maxNodeModuleJsDepth,
		},
		rootTasks:           make([]*parseTask, 0, len(rootFiles)+len(compilerOptions.Lib)),
		supportedExtensions: supportedExtensions,
		supportedExtensionsWithJsonIfResolveJsonModule: supportedExtensionsWithJsonIfResolveJsonModule,
		contentMapperExtensions:                        opts.Config.ContentMapperExtensions(),
	}
	loader.addProjectReferenceTasks(singleThreaded)
	loader.resolver = module.NewResolver(loader.projectReferenceFileMapper.host, opts.Config.BaseDirectory(), compilerOptions, opts.TypingsLocation, opts.ProjectName, opts.Config.ContentMapperExtensions())
	if opts.Tracing != nil {
		defer opts.Tracing.Push(tracing.PhaseProgram, "processRootFiles", map[string]any{"count": len(rootFiles)}, false)()
	}
	for index, rootFile := range rootFiles {
		loader.addRootFileTask(rootFile, opts.Config.RootFileNameForDiagnostic(index), nil, &FileIncludeReason{kind: fileIncludeKindRootFile, data: index})
	}
	if len(rootFiles) > 0 && compilerOptions.NoLib.IsFalseOrUnknown() {
		if compilerOptions.Lib == nil {
			name := tsoptions.GetDefaultLibFileName(compilerOptions)
			libFile := loader.pathForLibFile(name)
			loader.addRootTask(libFile.path, libFile.pathKey, libFile, &FileIncludeReason{kind: fileIncludeKindLibFile})

		} else {
			for index, lib := range compilerOptions.Lib {
				if name, ok := tsoptions.GetLibFileName(lib); ok {
					libFile := loader.pathForLibFile(name)
					loader.addRootTask(libFile.path, libFile.pathKey, libFile, &FileIncludeReason{kind: fileIncludeKindLibFile, data: index})
				}
				// !!! error on unknown name
			}
		}
	}

	if len(rootFiles) > 0 && !opts.SkipModuleResolution {
		loader.addAutomaticTypeDirectiveTasks()
	}

	loader.filesParser.parse(&loader, loader.rootTasks)

	// Clear out loader and host to ensure its not used post program creation
	loader.projectReferenceFileMapper.loader = nil
	loader.projectReferenceFileMapper.host = nil

	return loader.filesParser.getProcessedFiles(&loader)
}

func (p *fileLoader) addRootTask(fileName tspath.RootedFilePath, path tspath.PathKey, libFile *LibFile, includeReason *FileIncludeReason) {
	if p.opts.Config.CompilerOptions().AllowNonTsExtensions.IsTrue() || fileName.HasExtension() {
		p.rootTasks = append(p.rootTasks, &parseTask{
			normalizedFilePath: fileName,
			path:               path,
			libFile:            libFile,
			includeReason:      includeReason,
		})
	}
}

func (p *fileLoader) addRootFileTask(fileName tspath.RootedFilePath, referenceText string, libFile *LibFile, includeReason *FileIncludeReason) {
	resolvedFile, resolvedPath, diagnostic := p.getSourceFileFromReference(fileName, referenceText)
	normalizedFilePath := fileName
	if diagnostic == nil {
		normalizedFilePath = resolvedFile
	}
	rootTask := &parseTask{
		normalizedFilePath: normalizedFilePath,
		path:               resolvedPath,
		libFile:            libFile,
		includeReason:      includeReason,
	}
	if diagnostic != nil {
		rootTask.normalizedFilePath = fileName
		rootTask.path = p.caseSensitivity.PathKey(tspath.RootedPath(fileName))
		rootTask.failedLookup = true
		rootTask.processingDiagnostics = []*processingDiagnostic{{
			kind: processingDiagnosticKindExplainingFileInclude,
			data: &includeExplainingDiagnostic{
				diagnosticReason: includeReason,
				message:          diagnostic.message,
				args:             diagnostic.args,
			},
		}}
	}
	p.rootTasks = append(p.rootTasks, rootTask)
}

func (p *fileLoader) addAutomaticTypeDirectiveTasks() {
	containingFileName := p.opts.Config.BaseDirectory().ResolveFile(module.InferredTypesContainingFile)
	p.rootTasks = append(p.rootTasks, &parseTask{
		normalizedFilePath:          containingFileName,
		path:                        p.caseSensitivity.PathKey(tspath.RootedPath(containingFileName)),
		isForAutomaticTypeDirective: true,
	})
}

func (p *fileLoader) resolveAutomaticTypeDirectives(containingFileName tspath.RootedFilePath) (
	toParse []resolvedRef,
	typeResolutionsInFile module.ModeAwareCache[*module.ResolvedTypeReferenceDirective],
	typeResolutionsTrace []module.DiagAndArgs,
	pDiagnostics []*processingDiagnostic,
) {
	automaticTypeDirectiveNames := module.GetAutomaticTypeDirectiveNames(p.opts.Config.CompilerOptions(), p.opts.Config.BaseDirectory(), p.opts.Host)
	if len(automaticTypeDirectiveNames) != 0 {
		toParse = make([]resolvedRef, 0, len(automaticTypeDirectiveNames))
		typeResolutionsInFile = make(module.ModeAwareCache[*module.ResolvedTypeReferenceDirective], len(automaticTypeDirectiveNames))
		for _, name := range automaticTypeDirectiveNames {
			// Under node16/nodenext module resolution, load `types`/ata include names as cjs resolution results by passing an `undefined` mode.
			// Under bundler module resolution, this also triggers the "import" condition to be used.
			resolutionMode := core.ResolutionModeNone
			resolved, trace := p.resolver.ResolveTypeReferenceDirective(name, containingFileName, resolutionMode, nil)
			var traceDone func()
			if p.opts.Tracing != nil {
				traceDone = p.opts.Tracing.Push(tracing.PhaseProgram, "processTypeReferenceDirective", map[string]any{"directive": name, "hasResolved": resolved.IsResolved(), "refKind": int(fileIncludeKindAutomaticTypeDirectiveFile)}, false)
			}
			typeResolutionsInFile[module.ModeAwareCacheKey{Name: name, Mode: resolutionMode}] = resolved
			typeResolutionsTrace = append(typeResolutionsTrace, trace...)
			if resolved.IsResolved() {
				toParse = append(toParse, resolvedRef{
					fileName:      resolved.ResolvedFileName,
					path:          resolved.ResolvedPath,
					increaseDepth: resolved.IsExternalLibraryImport,
					elideOnDepth:  false,
					includeReason: &FileIncludeReason{
						kind: fileIncludeKindAutomaticTypeDirectiveFile,
						data: &automaticTypeDirectiveFileData{name, resolved.PackageId},
					},
					packageId: resolved.PackageId,
				})
			} else {
				pDiagnostics = append(pDiagnostics, &processingDiagnostic{
					kind: processingDiagnosticKindExplainingFileInclude,
					data: &includeExplainingDiagnostic{
						diagnosticReason: &FileIncludeReason{
							kind: fileIncludeKindAutomaticTypeDirectiveFile,
							data: &automaticTypeDirectiveFileData{typeReference: name},
						},
						message: diagnostics.Cannot_find_type_definition_file_for_0,
						args:    []any{name},
					},
				})
			}
			if traceDone != nil {
				traceDone()
			}
		}
	}
	return toParse, typeResolutionsInFile, typeResolutionsTrace, pDiagnostics
}

func (p *fileLoader) addProjectReferenceTasks(singleThreaded bool) {
	p.projectReferenceFileMapper = &projectReferenceFileMapper{
		opts: p.opts,
		host: p.opts.Host,
	}
	projectReferences := p.opts.Config.ResolvedProjectReferencePaths()
	if len(projectReferences) == 0 {
		return
	}

	parser := &projectReferenceParser{
		loader: p,
		wg:     core.NewWorkGroup(singleThreaded),
	}
	rootTasks := createProjectReferenceParseTasks(projectReferences)
	parser.parse(rootTasks)
}

func (p *fileLoader) sortLibs(libFiles []*ast.SourceFile) {
	slices.SortFunc(libFiles, func(f1 *ast.SourceFile, f2 *ast.SourceFile) int {
		return cmp.Compare(p.getDefaultLibFilePriority(f1), p.getDefaultLibFilePriority(f2))
	})
}

func (p *fileLoader) getDefaultLibFilePriority(a *ast.SourceFile) int {
	if relative, ok := a.FileName().RelativeTo(p.defaultLibraryPath); ok && relative != "" {
		basename := relative.BaseName()
		if basename == "lib.d.ts" || basename == "lib.es6.d.ts" {
			return 0
		}
		name := strings.TrimSuffix(strings.TrimPrefix(basename, "lib."), ".d.ts")
		index := slices.Index(tsoptions.Libs, name)
		if index != -1 {
			return index + 1
		}
	}
	return len(tsoptions.Libs) + 2
}

func (p *fileLoader) loadSourceFileMetaData(fileName tspath.RootedFilePath) ast.SourceFileMetaData {
	if p.opts.SkipModuleResolution {
		return ast.SourceFileMetaData{
			ImpliedNodeFormat: ast.GetImpliedNodeFormatForFile(fileName, ""),
		}
	}

	packageJsonScope := p.resolver.GetPackageScopeForPath(fileName.Directory())
	moduleResolutionKind := p.opts.Config.CompilerOptions().GetModuleResolutionKind()

	var packageJsonType string
	var packageJsonDirectory tspath.RootedDirectoryPath
	if packageJsonScope.Exists() {
		packageJsonDirectory = packageJsonScope.PackageDirectory.AsDirectoryPath()
		if value, ok := packageJsonScope.Contents.Type.GetValue(); ok {
			if !fileName.ExtensionIsOneOf([]string{tspath.ExtensionMts, tspath.ExtensionCts, tspath.ExtensionMjs, tspath.ExtensionCjs}) &&
				core.ModuleResolutionKindNode16 <= moduleResolutionKind && moduleResolutionKind <= core.ModuleResolutionKindNodeNext || fileName.ContainsLowercaseDirectorySequence("/node_modules/") {
				packageJsonType = value
			}
		}
	}

	impliedNodeFormat := ast.GetImpliedNodeFormatForFile(fileName, packageJsonType)
	return ast.SourceFileMetaData{
		PackageJsonType:      packageJsonType,
		PackageJsonDirectory: packageJsonDirectory,
		ImpliedNodeFormat:    impliedNodeFormat,
	}
}

func (p *fileLoader) parseSourceFile(t *parseTask) *ast.SourceFile {
	if p.opts.Tracing != nil {
		defer p.opts.Tracing.Push(tracing.PhaseParse, "createSourceFile", map[string]any{"path": t.normalizedFilePath.AsString()}, true)()
	}
	options := p.projectReferenceFileMapper.getCompilerOptionsForFile(t)
	parseOptions := ast.SourceFileParseOptions{
		FileName:                       t.normalizedFilePath,
		PathKey:                        t.path,
		ExternalModuleIndicatorOptions: ast.GetExternalModuleIndicatorOptions(t.normalizedFilePath, options, t.metadata),
	}
	if t.normalizedFilePath.ExtensionIsOneOf(p.contentMapperExtensions) {
		return p.parseContentMappedFile(parseOptions)
	}
	return p.opts.Host.GetSourceFile(parseOptions)
}

// parseContentMappedFile produces a content-mapped virtual source file via the host's content
// mapper, preserving the original file name and retaining the untransformed text on the
// source file. Content mapper extensions only reach the parser when content mappers are configured.
//
// When initialization fails, one program diagnostic is reported and the mapper is not attempted for
// subsequent files. Other failures produce per-file diagnostics and count toward a failure budget; after
// maxContentMapperFailures, one program diagnostic reports that the mapper was disabled and subsequent
// files are silently substituted with empty files. It returns nil only if the file cannot be read.
func (p *fileLoader) parseContentMappedFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
	mapper := p.opts.Config.GetContentMapperForFileName(opts.FileName)
	label := mapper.DiagnosticName()
	transformIdentity := p.getContentMapperTransformIdentity(mapper)
	if p.contentMapperUnavailable(mapper) {
		// The mapper failed initialization or exceeded its failure budget; add the file empty without re-reporting.
		return p.emptyContentMappedFile(opts, mapper.Identity(), transformIdentity)
	}
	files, err := p.opts.Host.GetContentMappedSourceFiles(opts, mapper)
	if err != nil {
		sourceFile := p.emptyContentMappedFile(opts, mapper.Identity(), transformIdentity)
		if transformError, ok := errors.AsType[*contentmapper.TransformError](err); ok && transformError.Kind == contentmapper.TransformErrorKindInitialize {
			p.recordContentMapperInitializationFailure(mapper, label, transformError)
			return sourceFile
		}
		if p.recordContentMapperFailure(mapper, label) {
			var diagnostic *ast.Diagnostic
			if problem, ok := errors.AsType[*spanmap.MappingError](err); ok {
				diagnostic = contentMapperMappingDiagnostic(sourceFile, label, problem)
			} else {
				diagnostic = contentMapperTransformDiagnostic(sourceFile, label, err)
			}
			sourceFile.SetDiagnostics(append(sourceFile.Diagnostics(), diagnostic))
		}
		return sourceFile
	}
	return files.Canonical
}

func contentMapperTransformDiagnostic(file *ast.SourceFile, label string, err error) *ast.Diagnostic {
	if collision, ok := errors.AsType[*contentmapper.SupplementalFileCollisionError](err); ok {
		return contentMapperTransformDiagnosticChain(file, label, diagnostics.Content_mapper_supplemental_output_file_0_conflicts_with_an_existing_file, collision.FileName)
	}
	if transformError, ok := errors.AsType[*contentmapper.TransformError](err); ok {
		switch transformError.Kind {
		case contentmapper.TransformErrorKindInitialize:
			if initializeError, ok := errors.AsType[*contentmapper.InitializeError](transformError); ok {
				switch initializeError.Kind {
				case contentmapper.InitializeErrorKindPositionEncoding:
					return contentMapperTransformDiagnosticChain(file, label, diagnostics.The_content_mapper_selected_unsupported_position_encoding_0, initializeError.PositionEncoding)
				case contentmapper.InitializeErrorKindEmptyDiagnosticSource:
					return contentMapperTransformDiagnosticChain(file, label, diagnostics.The_content_mapper_diagnostic_source_must_not_be_empty)
				case contentmapper.InitializeErrorKindReservedDiagnosticSource:
					return contentMapperTransformDiagnosticChain(file, label, diagnostics.The_content_mapper_diagnostic_source_0_is_reserved_by_TypeScript, initializeError.DiagnosticSource)
				}
			}
			return contentMapperTransformDiagnosticChain(file, label, diagnostics.The_content_mapper_process_could_not_be_started_or_initialized)
		case contentmapper.TransformErrorKindProject:
			return contentMapperTransformDiagnosticChain(file, label, ContentMapperProjectErrorDiagnostic(transformError))
		case contentmapper.TransformErrorKindRequest:
			return contentMapperTransformDiagnosticChain(file, label, diagnostics.The_content_mapper_process_failed_while_handling_the_transform_request)
		case contentmapper.TransformErrorKindResponse:
			if extensionError, ok := errors.AsType[*contentmapper.InvalidVirtualExtensionError](transformError); ok {
				return contentMapperTransformDiagnosticChain(file, label, diagnostics.The_content_mapper_returned_an_output_with_unsupported_virtual_extension_0, extensionError.Extension)
			}
			if directiveError, ok := errors.AsType[*contentmapper.DiagnosticDirectiveError](transformError); ok {
				var detail *ast.Diagnostic
				switch directiveError.Kind {
				case contentmapper.DiagnosticDirectiveErrorKindInvalidRange:
					detail = ast.NewCompilerDiagnostic(diagnostics.Diagnostic_directive_0_returned_by_the_content_mapper_has_an_invalid_range, directiveError.Index)
				case contentmapper.DiagnosticDirectiveErrorKindInvalidPolicy:
					detail = ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_returned_a_diagnostic_directive_with_invalid_policy_0, directiveError.Policy)
				case contentmapper.DiagnosticDirectiveErrorKindExpectMissingUnusedDiagnostic:
					detail = ast.NewCompilerDiagnostic(diagnostics.Diagnostic_directive_0_returned_by_the_content_mapper_must_specify_unusedExpectDirectiveIndex_when_there_is_not_exactly_one_unusedExpectDirectiveDiagnostics_entry, directiveError.Index)
				case contentmapper.DiagnosticDirectiveErrorKindInvalidUnusedDiagnosticIndex:
					detail = ast.NewCompilerDiagnostic(diagnostics.Diagnostic_directive_0_returned_by_the_content_mapper_has_an_invalid_unusedExpectDirectiveIndex, directiveError.Index)
				case contentmapper.DiagnosticDirectiveErrorKindOverlap:
					detail = ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_returned_diagnostic_directives_with_overlapping_virtual_ranges)
				}
				if detail != nil {
					if directiveError.SupplementalIndex >= 0 {
						detail = ast.NewDiagnosticChain(detail, diagnostics.The_invalid_diagnostic_directive_is_in_supplemental_output_0_returned_by_the_content_mapper, directiveError.SupplementalIndex)
					}
					return contentMapperTransformDiagnosticWithDetail(file, label, detail)
				}
			}
			return contentMapperTransformDiagnosticChain(file, label, diagnostics.The_content_mapper_returned_an_invalid_transform_response)
		case contentmapper.TransformErrorKindMappings:
			return ast.NewDiagnostic(file, core.NewTextRange(0, 0), diagnostics.The_content_mapper_0_did_not_provide_the_required_position_mappings, label)
		}
	}
	return ast.NewDiagnostic(file, core.NewTextRange(0, 0), diagnostics.The_content_mapper_0_failed_to_transform_this_file, label)
}

// ContentMapperProjectErrorDiagnostic returns the localized diagnostic message for a project setup error.
func ContentMapperProjectErrorDiagnostic(err error) *diagnostics.Message {
	if projectError, ok := errors.AsType[*contentmapper.ProjectError](err); ok {
		switch projectError.Kind {
		case contentmapper.ProjectErrorKindMalformedResponse:
			return diagnostics.The_content_mapper_returned_a_project_response_that_could_not_be_decoded
		case contentmapper.ProjectErrorKindMissingConfigIdentity:
			return diagnostics.The_content_mapper_did_not_return_configIdentity_which_is_required_when_the_content_mapper_has_dynamicConfig_Colon_true_in_its_package_json
		case contentmapper.ProjectErrorKindNonAbsoluteWatchedFile:
			return diagnostics.The_content_mapper_returned_a_non_absolute_path_in_watchedFiles
		case contentmapper.ProjectErrorKindUnexpectedConfigIdentity:
			return diagnostics.The_content_mapper_returned_configIdentity_which_is_only_allowed_when_it_declares_dynamicConfig_Colon_true_in_its_package_json
		case contentmapper.ProjectErrorKindUnexpectedWatchedFiles:
			return diagnostics.The_content_mapper_returned_watchedFiles_which_is_only_allowed_when_it_declares_dynamicConfig_Colon_true_in_its_package_json
		}
	}
	return diagnostics.The_content_mapper_process_failed_while_handling_the_project_request
}

func contentMapperTransformDiagnosticChain(file *ast.SourceFile, label string, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	return contentMapperTransformDiagnosticWithDetail(file, label, ast.NewCompilerDiagnostic(message, args...))
}

func contentMapperTransformDiagnosticWithDetail(file *ast.SourceFile, label string, detail *ast.Diagnostic) *ast.Diagnostic {
	return ast.NewDiagnostic(
		file,
		core.NewTextRange(0, 0),
		diagnostics.The_content_mapper_0_failed_to_transform_this_file,
		label,
	).AddMessageChain(detail)
}

// contentMapperMappingDiagnostic builds the diagnostic reported against a mapper that produced an
// invalid span map, including the offsets involved so the mapper's author can locate the problem.
func contentMapperMappingDiagnostic(file *ast.SourceFile, label string, problem *spanmap.MappingError) *ast.Diagnostic {
	loc := core.NewTextRange(0, 0)
	switch problem.Kind {
	case spanmap.MappingErrorKindOverlap:
		return ast.NewDiagnostic(file, loc, diagnostics.The_content_mapper_0_produced_overlapping_or_out_of_order_position_mappings_near_virtual_offset_1, label, int(problem.VirtualPos))
	case spanmap.MappingErrorKindOutOfBounds:
		return ast.NewDiagnostic(file, loc, diagnostics.The_content_mapper_0_produced_a_position_mapping_that_points_outside_the_original_content_original_offset_1, label, int(problem.OriginalPos))
	case spanmap.MappingErrorKindVerbatimMismatch:
		return ast.NewDiagnostic(file, loc, diagnostics.The_content_mapper_0_produced_a_verbatim_mapping_that_does_not_match_the_original_content_virtual_offset_1_original_offset_2, label, int(problem.VirtualPos), int(problem.OriginalPos))
	case spanmap.MappingErrorKindKind:
		return ast.NewDiagnostic(file, loc, diagnostics.The_content_mapper_0_produced_a_position_mapping_with_an_invalid_kind_near_virtual_offset_1, label, int(problem.VirtualPos))
	case spanmap.MappingErrorKindFeature:
		return ast.NewDiagnostic(file, loc, diagnostics.The_content_mapper_0_produced_invalid_mapping_features_near_original_offset_1, label, int(problem.OriginalPos))
	default:
		return ast.NewDiagnostic(file, loc, diagnostics.The_content_mapper_0_did_not_provide_the_required_position_mappings, label)
	}
}

// emptyContentMappedFile produces an empty TypeScript source file for a content-mapped file whose
// transform could not be used, retaining the original content for diagnostics. Importers see it as an
// empty module rather than triggering a "cannot find module" error. It is still marked as content-mapped
// so it is excluded from emit like a successfully mapped file.
func (p *fileLoader) getContentMapperTransformIdentity(mapper *contentmapper.Mapper) string {
	if project := p.opts.Host.ContentMapperProject(); project != nil {
		if identity, err := project.Identity(mapper); err == nil {
			return identity
		}
	}
	return fmt.Sprintf("%x", mapper.TransformIdentity(p.opts.Config.CompilerOptions()).Bytes())
}

func (p *fileLoader) emptyContentMappedFile(opts ast.SourceFileParseOptions, mapperIdentity string, transformIdentity string) *ast.SourceFile {
	content, _ := p.opts.Host.FS().ReadFile(opts.FileName)
	sourceFile := parser.ParseSourceFile(opts, "", core.ScriptKindTS)
	sourceFile.SetContentMapperInfo(ast.ContentMapperSourceFileInfo{
		ContentMapper:     mapperIdentity,
		TransformIdentity: transformIdentity,
		ParseOptions:      opts,
		VirtualFileName:   opts.FileName.AppendSuffix(tspath.ExtensionTs),
		OriginalText:      content,
	})
	return sourceFile
}

// ContentMapperInitializationDiagnostic returns a fileless diagnostic for a mapper initialization failure.
func ContentMapperInitializationDiagnostic(label string, err error) *ast.Diagnostic {
	if initializeError, ok := errors.AsType[*contentmapper.InitializeError](err); ok && label == "" {
		label = initializeError.MapperName
	}
	diagnostic := ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_0_could_not_be_initialized, label)
	if initializeError, ok := errors.AsType[*contentmapper.InitializeError](err); ok {
		switch initializeError.Kind {
		case contentmapper.InitializeErrorKindProcessStart:
			return diagnostic.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_command_0_could_not_be_started_Colon_1, initializeError.Command, initializeError.Detail))
		case contentmapper.InitializeErrorKindProcessExit:
			return diagnostic.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_process_exited_before_responding_to_the_initialize_request_exit_code_0, initializeError.ExitCode))
		case contentmapper.InitializeErrorKindNoResponse:
			return diagnostic.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_did_not_respond_to_the_initialize_request_within_0_seconds, initializeError.TimeoutSeconds))
		case contentmapper.InitializeErrorKindInvalidResponse:
			return diagnostic.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_returned_an_initialize_response_that_could_not_be_decoded_Colon_0, initializeError.Detail))
		case contentmapper.InitializeErrorKindRequest:
			return diagnostic.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_s_initialize_request_failed_Colon_0, initializeError.Detail))
		case contentmapper.InitializeErrorKindPositionEncoding:
			return diagnostic.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_selected_unsupported_position_encoding_0, initializeError.PositionEncoding))
		case contentmapper.InitializeErrorKindEmptyDiagnosticSource:
			return diagnostic.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_diagnostic_source_must_not_be_empty))
		case contentmapper.InitializeErrorKindReservedDiagnosticSource:
			return diagnostic.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_diagnostic_source_0_is_reserved_by_TypeScript, initializeError.DiagnosticSource))
		}
	}
	return diagnostic.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_process_could_not_be_started_or_initialized))
}

// ContentMapperProjectDiagnostic returns a fileless diagnostic for project setup or mapper initialization.
func ContentMapperProjectDiagnostic(err error) *ast.Diagnostic {
	if _, ok := errors.AsType[*contentmapper.InitializeError](err); ok {
		return ContentMapperInitializationDiagnostic("", err)
	}
	return ast.NewCompilerDiagnostic(ContentMapperProjectErrorDiagnostic(err))
}

// contentMapperUnavailable reports whether mapper failed initialization or exceeded its failure budget.
func (p *fileLoader) contentMapperUnavailable(mapper *contentmapper.Mapper) bool {
	if mapper == nil {
		return false
	}
	p.contentMapperMu.Lock()
	defer p.contentMapperMu.Unlock()
	return p.contentMapperInitFailed.Has(mapper) || p.contentMapperFailures[mapper] >= maxContentMapperFailures
}

func (p *fileLoader) recordContentMapperInitializationFailure(mapper *contentmapper.Mapper, label string, err error) {
	p.contentMapperMu.Lock()
	defer p.contentMapperMu.Unlock()
	if p.contentMapperInitFailed.Has(mapper) {
		return
	}
	p.contentMapperInitFailed.Add(mapper)
	p.contentMapperDiagnostics = append(p.contentMapperDiagnostics, ContentMapperInitializationDiagnostic(label, err))
}

// recordContentMapperFailure counts a transform failure for mapper. It returns whether the failure
// should be reported for this file (false once the mapper is already disabled). On the failure that
// reaches maxContentMapperFailures it appends a single program diagnostic disabling the mapper.
func (p *fileLoader) recordContentMapperFailure(mapper *contentmapper.Mapper, label string) bool {
	p.contentMapperMu.Lock()
	defer p.contentMapperMu.Unlock()
	if p.contentMapperFailures == nil {
		p.contentMapperFailures = make(map[*contentmapper.Mapper]int)
	}
	if p.contentMapperFailures[mapper] >= maxContentMapperFailures {
		return false
	}
	p.contentMapperFailures[mapper]++
	if p.contentMapperFailures[mapper] >= maxContentMapperFailures {
		p.contentMapperDiagnostics = append(p.contentMapperDiagnostics, ast.NewCompilerDiagnostic(
			diagnostics.The_content_mapper_0_failed_1_times_and_will_not_be_used,
			label,
			maxContentMapperFailures,
		))
	}
	return true
}

func (p *fileLoader) isSupportedExtension(canonicalFileName tspath.PathKey) bool {
	return slices.ContainsFunc(p.supportedExtensionsWithJsonIfResolveJsonModule, canonicalFileName.ExtensionIsOneOf)
}

func (p *fileLoader) getSourceFileFromReference(
	fileName tspath.RootedFilePath,
	referenceText string,
) (tspath.RootedFilePath, tspath.PathKey, *sourceFileFromReferenceDiagnostic) {
	options := p.opts.Config.CompilerOptions()
	allowNonTsExtensions := options.AllowNonTsExtensions.IsTrue()

	if fileName.HasExtension() {
		fileNamePath := p.caseSensitivity.PathKey(tspath.RootedPath(fileName))
		canonicalFileName := fileNamePath
		if !allowNonTsExtensions && !p.isSupportedExtension(canonicalFileName) {
			if canonicalFileName.HasJSFileExtension() {
				return "", "", &sourceFileFromReferenceDiagnostic{message: diagnostics.File_0_is_a_JavaScript_file_Did_you_mean_to_enable_the_allowJs_option, args: []any{normalizeDiagnosticReferenceText(referenceText)}}
			}
			return "", "", &sourceFileFromReferenceDiagnostic{message: diagnostics.File_0_has_an_unsupported_extension_The_only_supported_extensions_are_1, args: []any{normalizeDiagnosticReferenceText(referenceText), "'" + strings.Join(core.Flatten(p.supportedExtensions), "', '") + "'"}}
		}

		if !p.opts.Host.FS().FileExists(fileName) {
			return "", "", &sourceFileFromReferenceDiagnostic{message: diagnostics.File_0_not_found, args: []any{normalizeDiagnosticReferenceText(referenceText)}}
		}

		return fileName, fileNamePath, nil
	}

	if allowNonTsExtensions && p.opts.Host.FS().FileExists(fileName) {
		return fileName, p.caseSensitivity.PathKey(tspath.RootedPath(fileName)), nil
	}

	if allowNonTsExtensions {
		return "", "", &sourceFileFromReferenceDiagnostic{message: diagnostics.File_0_not_found, args: []any{normalizeDiagnosticReferenceText(referenceText)}}
	}

	for _, ext := range p.supportedExtensions[0] {
		candidate := fileName.AppendSuffix(ext)
		if p.opts.Host.FS().FileExists(candidate) {
			return candidate, p.caseSensitivity.PathKey(tspath.RootedPath(candidate)), nil
		}
	}

	return "", "", &sourceFileFromReferenceDiagnostic{message: diagnostics.Could_not_resolve_the_path_0_with_the_extensions_Colon_1, args: []any{normalizeDiagnosticReferenceText(referenceText), "'" + strings.Join(core.Flatten(p.supportedExtensions), "', '") + "'"}}
}

func normalizeDiagnosticReferenceText(referenceText string) string {
	return tspath.NormalizeSlashes(referenceText)
}

func (p *fileLoader) resolveTripleslashPathReference(moduleName string, containingFile tspath.RootedFilePath, index int) (*resolvedRef, *processingDiagnostic) {
	normalizedFileName := containingFile.Directory().ResolveFile(moduleName)
	containingPath := p.caseSensitivity.PathKey(tspath.RootedPath(containingFile))
	includeReason := &FileIncludeReason{
		kind: fileIncludeKindReferenceFile,
		data: &referencedFileData{
			file:  containingPath,
			index: index,
		},
	}

	resolvedFileName, resolvedPath, diagnostic := p.getSourceFileFromReference(
		normalizedFileName,
		moduleName,
	)
	if diagnostic != nil {
		return nil, &processingDiagnostic{
			kind: processingDiagnosticKindExplainingFileInclude,
			data: &includeExplainingDiagnostic{
				diagnosticReason: includeReason,
				message:          diagnostic.message,
				args:             diagnostic.args,
			},
		}
	}
	if containingPath == resolvedPath {
		return nil, &processingDiagnostic{
			kind: processingDiagnosticKindExplainingFileInclude,
			data: &includeExplainingDiagnostic{
				diagnosticReason: includeReason,
				message:          diagnostics.A_file_cannot_have_a_reference_to_itself,
			},
		}
	}

	return &resolvedRef{
		fileName:      resolvedFileName,
		path:          resolvedPath,
		includeReason: includeReason,
	}, nil
}

func (p *fileLoader) resolveTypeReferenceDirectives(t *parseTask) {
	file := t.file
	if len(file.TypeReferenceDirectives) == 0 {
		return
	}
	if p.opts.Tracing != nil {
		defer p.opts.Tracing.Push(tracing.PhaseProgram, "resolveTypeReferenceDirectiveNamesWorker", map[string]any{"containingFileName": file.FileName()}, false)()
	}
	meta := t.metadata

	typeResolutionsInFile := make(module.ModeAwareCache[*module.ResolvedTypeReferenceDirective], len(file.TypeReferenceDirectives))
	var typeResolutionsTrace []module.DiagAndArgs
	for index, ref := range file.TypeReferenceDirectives {
		redirect, fileName := p.projectReferenceFileMapper.getRedirectForResolution(file)
		resolutionMode := getModeForTypeReferenceDirectiveInFile(ref, file, meta, module.GetCompilerOptionsWithRedirect(p.opts.Config.CompilerOptions(), redirect))
		resolved, trace := p.resolver.ResolveTypeReferenceDirective(ref.FileName, fileName, resolutionMode, redirect)
		var traceDone func()
		if p.opts.Tracing != nil {
			traceDone = p.opts.Tracing.Push(tracing.PhaseProgram, "processTypeReferenceDirective", map[string]any{"directive": ref.FileName, "hasResolved": resolved.IsResolved(), "refKind": int(fileIncludeKindTypeReferenceDirective), "refPath": string(t.path)}, false)
		}
		typeResolutionsInFile[module.ModeAwareCacheKey{Name: ref.FileName, Mode: resolutionMode}] = resolved
		includeReason := &FileIncludeReason{
			kind: fileIncludeKindTypeReferenceDirective,
			data: &referencedFileData{
				file:  t.path,
				index: index,
			},
		}
		typeResolutionsTrace = append(typeResolutionsTrace, trace...)

		if resolved.IsResolved() {
			t.addSubTask(resolvedRef{
				fileName:      resolved.ResolvedFileName,
				path:          resolved.ResolvedPath,
				increaseDepth: resolved.IsExternalLibraryImport,
				elideOnDepth:  false,
				includeReason: includeReason,
				packageId:     resolved.PackageId,
			}, nil)
		} else {
			t.processingDiagnostics = append(t.processingDiagnostics, &processingDiagnostic{
				kind: processingDiagnosticKindUnknownReference,
				data: includeReason,
			})
		}
		if traceDone != nil {
			traceDone()
		}
	}

	t.typeResolutionsInFile = typeResolutionsInFile
	t.typeResolutionsTrace = typeResolutionsTrace
}

const externalHelpersModuleNameText = "tslib" // TODO(jakebailey): dedupe

func (p *fileLoader) resolveImportsAndModuleAugmentations(t *parseTask) {
	if p.opts.Tracing != nil {
		defer p.opts.Tracing.Push(tracing.PhaseProgram, "resolveModuleNamesWorker", map[string]any{"containingFileName": t.file.FileName()}, false)()
	}
	file := t.file
	meta := t.metadata

	moduleNames := make([]*ast.Node, 0, len(file.Imports())+len(file.ModuleAugmentations)+2)

	isJavaScriptFile := ast.IsSourceFileJS(file)
	isExternalModuleFile := ast.IsExternalModule(file)

	redirect, fileName := p.projectReferenceFileMapper.getRedirectForResolution(file)
	optionsForFile := module.GetCompilerOptionsWithRedirect(p.opts.Config.CompilerOptions(), redirect)
	if isJavaScriptFile || (!file.IsDeclarationFile && (optionsForFile.GetIsolatedModules() || isExternalModuleFile)) {
		if optionsForFile.ImportHelpers.IsTrue() {
			specifier := p.createSyntheticImport(externalHelpersModuleNameText, file)
			moduleNames = append(moduleNames, specifier)
			t.importHelpersImportSpecifier = specifier
		}
	}

	if isJavaScriptFile || file.ScriptKind == core.ScriptKindTSX {
		jsxImport := ast.GetJSXRuntimeImport(ast.GetJSXImplicitImportBase(optionsForFile, file), optionsForFile)
		if jsxImport != "" {
			specifier := p.createSyntheticImport(jsxImport, file)
			moduleNames = append(moduleNames, specifier)
			t.jsxRuntimeImportSpecifier = &jsxRuntimeImportSpecifier{
				moduleReference: jsxImport,
				specifier:       specifier,
			}
		}
	}

	importsStart := len(moduleNames)

	moduleNames = append(moduleNames, file.Imports()...)
	for _, imp := range file.ModuleAugmentations {
		if imp.Kind == ast.KindStringLiteral {
			moduleNames = append(moduleNames, imp)
		}
		// Do nothing if it's an Identifier; we don't need to do module resolution for `declare global`.
	}

	if p.opts.SkipModuleResolution {
		return
	}

	if len(moduleNames) != 0 {
		resolutionsInFile := make(module.ModeAwareCache[*module.ResolvedModule], len(moduleNames))
		var resolutionsTrace []module.DiagAndArgs

		for index, entry := range moduleNames {
			moduleName := entry.Text()
			if moduleName == "" {
				continue
			}

			mode := getModeForUsageLocation(file.FileName(), meta, entry, optionsForFile)
			resolvedModule, trace := p.resolver.ResolveModuleName(moduleName, fileName, mode, redirect)
			resolutionsInFile[module.ModeAwareCacheKey{Name: moduleName, Mode: mode}] = resolvedModule
			resolutionsTrace = append(resolutionsTrace, trace...)

			if !resolvedModule.IsResolved() {
				continue
			}

			resolvedFileName := resolvedModule.ResolvedFileName
			isFromNodeModulesSearch := resolvedModule.IsExternalLibraryImport
			// Don't treat redirected files as JS files.
			isJsFile := !resolvedModule.ResolvedUsingExtraExtensions && !resolvedFileName.ExtensionIsOneOf(tspath.SupportedTSExtensionsWithJsonFlat) && p.projectReferenceFileMapper.getRedirectParsedCommandLineForResolution(ast.NewHasFileName(resolvedFileName, resolvedModule.ResolvedPath)) == nil
			isJsFileFromNodeModules := isFromNodeModulesSearch && isJsFile && resolvedFileName.ContainsLowercaseDirectorySequence("/node_modules/")

			// add file to program only if:
			// - resolution was successful
			// - noResolve is falsy
			// - module name comes from the list of imports
			// - it's not a top level JavaScript module that exceeded the search max

			importIndex := index - importsStart

			shouldAddFile := moduleName != "" &&
				module.GetResolutionDiagnostic(optionsForFile, resolvedModule, file) == nil &&
				!optionsForFile.NoResolve.IsTrue() &&
				!(isJsFile && !optionsForFile.GetAllowJS()) &&
				(importIndex < 0 || (importIndex < len(file.Imports()) && (ast.IsInJSFile(file.Imports()[importIndex]) || file.Imports()[importIndex].Flags&ast.NodeFlagsJSDoc == 0)))

			if shouldAddFile {
				t.addSubTask(resolvedRef{
					fileName:      resolvedFileName,
					path:          resolvedModule.ResolvedPath,
					increaseDepth: resolvedModule.IsExternalLibraryImport,
					elideOnDepth:  isJsFileFromNodeModules,
					includeReason: &FileIncludeReason{
						kind: fileIncludeKindImport,
						data: &referencedFileData{
							file:      t.path,
							index:     importIndex,
							synthetic: core.IfElse(importIndex < 0, entry, nil),
						},
					},
					packageId: resolvedModule.PackageId,
				}, nil)
			}
		}

		t.resolutionsInFile = resolutionsInFile
		t.resolutionsTrace = resolutionsTrace
	}
}

func (p *fileLoader) createSyntheticImport(text string, file *ast.SourceFile) *ast.StringLiteralNode {
	p.factoryMu.Lock()
	defer p.factoryMu.Unlock()
	externalHelpersModuleReference := p.factory.NewStringLiteral(text, ast.TokenFlagsNone)
	importDecl := p.factory.NewImportDeclaration(nil, nil, externalHelpersModuleReference, nil)
	externalHelpersModuleReference.Parent = importDecl
	importDecl.Parent = file.AsNode()
	return externalHelpersModuleReference
}

func (p *fileLoader) pathForLibFile(name string) *LibFile {
	if cached, ok := p.pathForLibFileCache.Load(name); ok {
		return cached
	}

	path := p.defaultLibraryPath.ResolveFile(name)
	pathKey := p.caseSensitivity.PathKey(tspath.RootedPath(path))
	replaced := false
	if !p.opts.SkipModuleResolution && p.opts.Config.CompilerOptions().LibReplacement.IsTrue() && name != "lib.d.ts" {
		libraryName := getLibraryNameFromLibFileName(name)
		resolveFrom := getInferredLibraryNameResolveFrom(p.opts.Config.BaseDirectory(), name)
		resolution, trace := p.resolveLibrary(libraryName, resolveFrom)
		if resolution.IsResolved() {
			path = resolution.ResolvedFileName
			pathKey = resolution.ResolvedPath
			replaced = true
		}
		p.pathForLibFileResolutions.LoadOrStore(p.caseSensitivity.PathKey(tspath.RootedPath(resolveFrom)), &libResolution{
			libraryName: libraryName,
			resolution:  resolution,
			trace:       trace,
		})
	}

	libPath, _ := p.pathForLibFileCache.LoadOrStore(name, &LibFile{name, path, pathKey, replaced})
	return libPath
}

func (p *fileLoader) resolveLibrary(libraryName string, resolveFrom tspath.RootedFilePath) (*module.ResolvedModule, []module.DiagAndArgs) {
	if tr := p.opts.Tracing; tr != nil {
		defer tr.Push(tracing.PhaseProgram, "resolveLibrary", map[string]any{"resolveFrom": resolveFrom.AsString()}, false)()
	}
	return p.resolver.ResolveModuleName(libraryName, resolveFrom, core.ModuleKindCommonJS, nil)
}

func getLibraryNameFromLibFileName(libFileName string) string {
	// Support resolving to lib.dom.d.ts -> @typescript/lib-dom, and
	//                      lib.dom.iterable.d.ts -> @typescript/lib-dom/iterable
	//                      lib.es2015.symbol.wellknown.d.ts -> @typescript/lib-es2015/symbol-wellknown
	components := strings.Split(libFileName, ".")
	var path strings.Builder
	path.WriteString("@typescript/lib-")
	if len(components) > 1 {
		path.WriteString(components[1])
	}
	i := 2
	for i < len(components) && components[i] != "" && components[i] != "d" {
		if i == 2 {
			path.WriteByte('/')
		} else {
			path.WriteByte('-')
		}
		path.WriteString(components[i])
		i++
	}
	return path.String()
}

func getInferredLibraryNameResolveFrom(baseDirectory tspath.RootedDirectoryPath, libFileName string) tspath.RootedFilePath {
	return baseDirectory.ResolveFile("__lib_node_modules_lookup_" + libFileName + "__.ts")
}

func getModeForTypeReferenceDirectiveInFile(ref *ast.FileReference, file *ast.SourceFile, meta ast.SourceFileMetaData, options *core.CompilerOptions) core.ResolutionMode {
	if ref.ResolutionMode != core.ResolutionModeNone {
		return ref.ResolutionMode
	} else {
		return getDefaultResolutionModeForFile(file.FileName(), meta, options)
	}
}

func getDefaultResolutionModeForFile(fileName tspath.RootedFilePath, meta ast.SourceFileMetaData, options *core.CompilerOptions) core.ResolutionMode {
	if importSyntaxAffectsModuleResolution(options) {
		return ast.GetImpliedNodeFormatForEmitWorker(fileName, options.GetEmitModuleKind(), meta)
	} else {
		return core.ResolutionModeNone
	}
}

func getModeForUsageLocation(fileName tspath.RootedFilePath, meta ast.SourceFileMetaData, usage *ast.StringLiteralLike, options *core.CompilerOptions) core.ResolutionMode {
	if ast.IsImportDeclaration(usage.Parent) || usage.Parent.Kind == ast.KindJSImportDeclaration || ast.IsExportDeclaration(usage.Parent) || ast.IsJSDocImportTag(usage.Parent) {
		isTypeOnly := ast.IsExclusivelyTypeOnlyImportOrExport(usage.Parent)
		if isTypeOnly {
			var override core.ResolutionMode
			var ok bool
			switch usage.Parent.Kind {
			case ast.KindImportDeclaration, ast.KindJSImportDeclaration:
				override, ok = usage.Parent.AsImportDeclaration().Attributes.GetResolutionModeOverride(nil)
			case ast.KindExportDeclaration:
				override, ok = usage.Parent.AsExportDeclaration().Attributes.GetResolutionModeOverride(nil)
			case ast.KindJSDocImportTag:
				override, ok = usage.Parent.AsJSDocImportTag().Attributes.GetResolutionModeOverride(nil)
			}
			if ok {
				return override
			}
		}
	}
	if ast.IsLiteralTypeNode(usage.Parent) && ast.IsImportTypeNode(usage.Parent.Parent) {
		if override, ok := usage.Parent.Parent.AsImportTypeNode().Attributes.GetResolutionModeOverride(nil); ok {
			return override
		}
	}

	if options != nil && importSyntaxAffectsModuleResolution(options) {
		return getEmitSyntaxForUsageLocationWorker(fileName, meta, usage, options)
	}

	return core.ResolutionModeNone
}

func importSyntaxAffectsModuleResolution(options *core.CompilerOptions) bool {
	moduleResolution := options.GetModuleResolutionKind()
	return core.ModuleResolutionKindNode16 <= moduleResolution && moduleResolution <= core.ModuleResolutionKindNodeNext ||
		options.GetResolvePackageJsonExports() || options.GetResolvePackageJsonImports()
}

func getEmitSyntaxForUsageLocationWorker(fileName tspath.RootedFilePath, meta ast.SourceFileMetaData, usage *ast.Node, options *core.CompilerOptions) core.ResolutionMode {
	if ast.IsRequireCall(usage.Parent, false /*requireStringLiteralLikeArgument*/) || ast.IsExternalModuleReference(usage.Parent) && ast.IsImportEqualsDeclaration(usage.Parent.Parent) {
		return core.ModuleKindCommonJS
	}
	fileEmitMode := ast.GetEmitModuleFormatOfFileWorker(fileName, options, meta)
	if ast.IsImportCall(ast.WalkUpParenthesizedExpressions(usage.Parent)) {
		if ast.ShouldTransformImportCall(fileName, options, fileEmitMode) {
			return core.ModuleKindCommonJS
		} else {
			return core.ModuleKindESNext
		}
	}
	// If we're in --module preserve on an input file, we know that an import
	// is an import. But if this is a declaration file, we'd prefer to use the
	// impliedNodeFormat. Since we want things to be consistent between the two,
	// we need to issue errors when the user writes ESM syntax in a definitely-CJS
	// file, until/unless declaration emit can indicate a true ESM import. On the
	// other hand, writing CJS syntax in a definitely-ESM file is fine, since declaration
	// emit preserves the CJS syntax.
	if fileEmitMode == core.ModuleKindCommonJS {
		return core.ModuleKindCommonJS
	} else {
		if fileEmitMode.IsNonNodeESM() || fileEmitMode == core.ModuleKindPreserve {
			return core.ModuleKindESNext
		}
	}
	return core.ModuleKindNone
}
