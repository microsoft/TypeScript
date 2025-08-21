package compiler

import (
	"fmt"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type fileIncludeKind int

const (
	// References from file
	fileIncludeKindImport = iota
	fileIncludeKindReferenceFile
	fileIncludeKindTypeReferenceDirective
	fileIncludeKindLibReferenceDirective

	fileIncludeKindRootFile
	fileIncludeKindSourceFromProjectReference
	fileIncludeKindOutputFromProjectReference
	fileIncludeKindLibFile
	fileIncludeKindAutomaticTypeDirectiveFile
)

type fileIncludeReason struct {
	kind fileIncludeKind
	data any

	// Uses relative file name
	relativeFileNameDiag     *ast.Diagnostic
	relativeFileNameDiagOnce sync.Once

	// Uses file name as is
	diag     *ast.Diagnostic
	diagOnce sync.Once
}

type referencedFileData struct {
	file      tspath.Path
	index     int
	synthetic *ast.Node
}

type referenceFileLocation struct {
	file        *ast.SourceFile
	node        *ast.Node
	ref         *ast.FileReference
	packageId   module.PackageId
	isSynthetic bool
}

func (r *referenceFileLocation) text() string {
	if r.node != nil {
		if !ast.NodeIsSynthesized(r.node) {
			return r.file.Text()[scanner.SkipTrivia(r.file.Text(), r.node.Loc.Pos()):r.node.End()]
		} else {
			return fmt.Sprintf(`"%s"`, r.node.Text())
		}
	} else {
		return r.file.Text()[r.ref.Pos():r.ref.End()]
	}
}

func (r *referenceFileLocation) diagnosticAt(message *diagnostics.Message, args ...any) *ast.Diagnostic {
	if r.node != nil {
		return tsoptions.CreateDiagnosticForNodeInSourceFile(r.file, r.node, message, args...)
	} else {
		return ast.NewDiagnostic(r.file, r.ref.TextRange, message, args...)
	}
}

type automaticTypeDirectiveFileData struct {
	typeReference string
	packageId     module.PackageId
}

func (r *fileIncludeReason) asIndex() int {
	return r.data.(int)
}

func (r *fileIncludeReason) asLibFileIndex() (int, bool) {
	index, ok := r.data.(int)
	return index, ok
}

func (r *fileIncludeReason) isReferencedFile() bool {
	return r != nil && r.kind <= fileIncludeKindLibReferenceDirective
}

func (r *fileIncludeReason) asReferencedFileData() *referencedFileData {
	return r.data.(*referencedFileData)
}

func (r *fileIncludeReason) asAutomaticTypeDirectiveFileData() *automaticTypeDirectiveFileData {
	return r.data.(*automaticTypeDirectiveFileData)
}

func (r *fileIncludeReason) getReferencedLocation(program *Program) *referenceFileLocation {
	ref := r.asReferencedFileData()
	file := program.GetSourceFileByPath(ref.file)
	switch r.kind {
	case fileIncludeKindImport:
		var specifier *ast.Node
		var isSynthetic bool
		if ref.synthetic != nil {
			specifier = ref.synthetic
			isSynthetic = true
		} else if ref.index < len(file.Imports()) {
			specifier = file.Imports()[ref.index]
		} else {
			augIndex := len(file.Imports())
			for _, imp := range file.ModuleAugmentations {
				if imp.Kind == ast.KindStringLiteral {
					if augIndex == ref.index {
						specifier = imp
						break
					}
					augIndex++
				}
			}
		}
		resolution := program.GetResolvedModuleFromModuleSpecifier(file, specifier)
		return &referenceFileLocation{
			file:        file,
			node:        specifier,
			packageId:   resolution.PackageId,
			isSynthetic: isSynthetic,
		}
	case fileIncludeKindReferenceFile:
		return &referenceFileLocation{
			file: file,
			ref:  file.ReferencedFiles[ref.index],
		}
	case fileIncludeKindTypeReferenceDirective:
		return &referenceFileLocation{
			file: file,
			ref:  file.TypeReferenceDirectives[ref.index],
		}
	case fileIncludeKindLibReferenceDirective:
		return &referenceFileLocation{
			file: file,
			ref:  file.LibReferenceDirectives[ref.index],
		}
	default:
		panic(fmt.Sprintf("unknown reason: %v", r.kind))
	}
}

func (r *fileIncludeReason) toDiagnostic(program *Program, relativeFileName bool) *ast.Diagnostic {
	if relativeFileName {
		r.relativeFileNameDiagOnce.Do(func() {
			r.relativeFileNameDiag = r.computeDiagnostic(program, func(fileName string) string {
				return tspath.GetRelativePathFromDirectory(program.GetCurrentDirectory(), fileName, program.comparePathsOptions)
			})
		})
		return r.relativeFileNameDiag
	} else {
		r.diagOnce.Do(func() {
			r.diag = r.computeDiagnostic(program, func(fileName string) string { return fileName })
		})
		return r.diag
	}
}

func (r *fileIncludeReason) computeDiagnostic(program *Program, toFileName func(string) string) *ast.Diagnostic {
	if r.isReferencedFile() {
		return r.computeReferenceFileDiagnostic(program, toFileName)
	}
	switch r.kind {
	case fileIncludeKindRootFile:
		if program.opts.Config.ConfigFile != nil {
			config := program.opts.Config
			fileName := tspath.GetNormalizedAbsolutePath(config.FileNames()[r.asIndex()], program.GetCurrentDirectory())
			if matchedFileSpec := config.GetMatchedFileSpec(fileName); matchedFileSpec != "" {
				return ast.NewCompilerDiagnostic(diagnostics.Part_of_files_list_in_tsconfig_json, matchedFileSpec, toFileName(fileName))
			} else if matchedIncludeSpec, isDefaultIncludeSpec := config.GetMatchedIncludeSpec(fileName); matchedIncludeSpec != "" {
				if isDefaultIncludeSpec {
					return ast.NewCompilerDiagnostic(diagnostics.Matched_by_default_include_pattern_Asterisk_Asterisk_Slash_Asterisk)
				} else {
					return ast.NewCompilerDiagnostic(diagnostics.Matched_by_include_pattern_0_in_1, matchedIncludeSpec, toFileName(config.ConfigName()))
				}
			} else {
				return ast.NewCompilerDiagnostic(diagnostics.Root_file_specified_for_compilation)
			}
		} else {
			return ast.NewCompilerDiagnostic(diagnostics.Root_file_specified_for_compilation)
		}
	case fileIncludeKindSourceFromProjectReference,
		fileIncludeKindOutputFromProjectReference:
		diag := core.IfElse(
			r.kind == fileIncludeKindOutputFromProjectReference,
			diagnostics.Output_from_referenced_project_0_included_because_module_is_specified_as_none,
			diagnostics.Source_from_referenced_project_0_included_because_module_is_specified_as_none,
		)
		referencedResolvedRef := program.projectReferenceFileMapper.getResolvedProjectReferences()[r.asIndex()]
		return ast.NewCompilerDiagnostic(diag, toFileName(referencedResolvedRef.ConfigName()))
	case fileIncludeKindAutomaticTypeDirectiveFile:
		data := r.asAutomaticTypeDirectiveFileData()
		if program.Options().Types != nil {
			if data.packageId.Name != "" {
				return ast.NewCompilerDiagnostic(diagnostics.Entry_point_of_type_library_0_specified_in_compilerOptions_with_packageId_1, data.typeReference, data.packageId.String())
			} else {
				return ast.NewCompilerDiagnostic(diagnostics.Entry_point_of_type_library_0_specified_in_compilerOptions, data.typeReference)
			}
		} else {
			if data.packageId.Name != "" {
				return ast.NewCompilerDiagnostic(diagnostics.Entry_point_for_implicit_type_library_0_with_packageId_1, data.typeReference, data.packageId.String())
			} else {
				return ast.NewCompilerDiagnostic(diagnostics.Entry_point_for_implicit_type_library_0, data.typeReference)
			}
		}
	case fileIncludeKindLibFile:
		if index, ok := r.asLibFileIndex(); ok {
			return ast.NewCompilerDiagnostic(diagnostics.Library_0_specified_in_compilerOptions, program.Options().Lib[index])
		} else if target := program.Options().GetEmitScriptTarget().String(); target != "" {
			return ast.NewCompilerDiagnostic(diagnostics.Default_library_for_target_0, target)
		} else {
			return ast.NewCompilerDiagnostic(diagnostics.Default_library)
		}
	default:
		panic(fmt.Sprintf("unknown reason: %v", r.kind))
	}
}

func (r *fileIncludeReason) computeReferenceFileDiagnostic(program *Program, toFileName func(string) string) *ast.Diagnostic {
	referenceLocation := program.includeProcessor.getReferenceLocation(r, program)
	referenceText := referenceLocation.text()
	switch r.kind {
	case fileIncludeKindImport:
		if !referenceLocation.isSynthetic {
			if referenceLocation.packageId.Name != "" {
				return ast.NewCompilerDiagnostic(diagnostics.Imported_via_0_from_file_1_with_packageId_2, referenceText, toFileName(referenceLocation.file.FileName()), referenceLocation.packageId.String())
			} else {
				return ast.NewCompilerDiagnostic(diagnostics.Imported_via_0_from_file_1, referenceText, toFileName(referenceLocation.file.FileName()))
			}
		} else if specifier, ok := program.importHelpersImportSpecifiers[referenceLocation.file.Path()]; ok && specifier == referenceLocation.node {
			if referenceLocation.packageId.Name != "" {
				return ast.NewCompilerDiagnostic(diagnostics.Imported_via_0_from_file_1_with_packageId_2_to_import_importHelpers_as_specified_in_compilerOptions, referenceText, toFileName(referenceLocation.file.FileName()), referenceLocation.packageId.String())
			} else {
				return ast.NewCompilerDiagnostic(diagnostics.Imported_via_0_from_file_1_to_import_importHelpers_as_specified_in_compilerOptions, referenceText, toFileName(referenceLocation.file.FileName()))
			}
		} else {
			if referenceLocation.packageId.Name != "" {
				return ast.NewCompilerDiagnostic(diagnostics.Imported_via_0_from_file_1_with_packageId_2_to_import_jsx_and_jsxs_factory_functions, referenceText, toFileName(referenceLocation.file.FileName()), referenceLocation.packageId.String())
			} else {
				return ast.NewCompilerDiagnostic(diagnostics.Imported_via_0_from_file_1_to_import_jsx_and_jsxs_factory_functions, referenceText, toFileName(referenceLocation.file.FileName()))
			}
		}
	case fileIncludeKindReferenceFile:
		return ast.NewCompilerDiagnostic(diagnostics.Referenced_via_0_from_file_1, referenceText, toFileName(referenceLocation.file.FileName()))
	case fileIncludeKindTypeReferenceDirective:
		if referenceLocation.packageId.Name != "" {
			return ast.NewCompilerDiagnostic(diagnostics.Type_library_referenced_via_0_from_file_1_with_packageId_2, referenceText, toFileName(referenceLocation.file.FileName()), referenceLocation.packageId.String())
		} else {
			return ast.NewCompilerDiagnostic(diagnostics.Type_library_referenced_via_0_from_file_1, referenceText, toFileName(referenceLocation.file.FileName()))
		}
	case fileIncludeKindLibReferenceDirective:
		return ast.NewCompilerDiagnostic(diagnostics.Library_referenced_via_0_from_file_1, referenceText, toFileName(referenceLocation.file.FileName()))
	default:
		panic(fmt.Sprintf("unknown reason: %v", r.kind))
	}
}

func (r *fileIncludeReason) toRelatedInfo(program *Program) *ast.Diagnostic {
	if r.isReferencedFile() {
		return r.computeReferenceFileRelatedInfo(program)
	}
	if program.opts.Config.ConfigFile == nil {
		return nil
	}
	config := program.opts.Config
	switch r.kind {
	case fileIncludeKindRootFile:
		fileName := tspath.GetNormalizedAbsolutePath(config.FileNames()[r.asIndex()], program.GetCurrentDirectory())
		if matchedFileSpec := config.GetMatchedFileSpec(fileName); matchedFileSpec != "" {
			if filesNode := tsoptions.GetTsConfigPropArrayElementValue(config.ConfigFile.SourceFile, "files", matchedFileSpec); filesNode != nil {
				return tsoptions.CreateDiagnosticForNodeInSourceFile(config.ConfigFile.SourceFile, filesNode.AsNode(), diagnostics.File_is_matched_by_files_list_specified_here)
			}
		} else if matchedIncludeSpec, isDefaultIncludeSpec := config.GetMatchedIncludeSpec(fileName); matchedIncludeSpec != "" && !isDefaultIncludeSpec {
			if includeNode := tsoptions.GetTsConfigPropArrayElementValue(config.ConfigFile.SourceFile, "include", matchedIncludeSpec); includeNode != nil {
				return tsoptions.CreateDiagnosticForNodeInSourceFile(config.ConfigFile.SourceFile, includeNode.AsNode(), diagnostics.File_is_matched_by_include_pattern_specified_here)
			}
		}
	case fileIncludeKindSourceFromProjectReference,
		fileIncludeKindOutputFromProjectReference:
		return tsoptions.CreateDiagnosticAtReferenceSyntax(
			config,
			r.asIndex(),
			core.IfElse(
				r.kind == fileIncludeKindOutputFromProjectReference,
				diagnostics.File_is_output_from_referenced_project_specified_here,
				diagnostics.File_is_source_from_referenced_project_specified_here,
			))
	case fileIncludeKindAutomaticTypeDirectiveFile:
		if program.Options().Types != nil {
			data := r.asAutomaticTypeDirectiveFileData()
			if typesSyntax := tsoptions.GetOptionsSyntaxByArrayElementValue(program.includeProcessor.getCompilerOptionsObjectLiteralSyntax(program), "types", data.typeReference); typesSyntax != nil {
				return tsoptions.CreateDiagnosticForNodeInSourceFile(config.ConfigFile.SourceFile, typesSyntax.AsNode(), diagnostics.File_is_entry_point_of_type_library_specified_here)
			}
		}
	case fileIncludeKindLibFile:
		if index, ok := r.asLibFileIndex(); ok {
			if libSyntax := tsoptions.GetOptionsSyntaxByArrayElementValue(program.includeProcessor.getCompilerOptionsObjectLiteralSyntax(program), "lib", program.Options().Lib[index]); libSyntax != nil {
				return tsoptions.CreateDiagnosticForNodeInSourceFile(config.ConfigFile.SourceFile, libSyntax.AsNode(), diagnostics.File_is_library_specified_here)
			}
		} else if target := program.Options().GetEmitScriptTarget().String(); target != "" {
			if targetValueSyntax := tsoptions.ForEachPropertyAssignment(program.includeProcessor.getCompilerOptionsObjectLiteralSyntax(program), "target", tsoptions.GetCallbackForFindingPropertyAssignmentByValue(target)); targetValueSyntax != nil {
				return tsoptions.CreateDiagnosticForNodeInSourceFile(config.ConfigFile.SourceFile, targetValueSyntax.AsNode(), diagnostics.File_is_default_library_for_target_specified_here)
			}
		}
	default:
		panic(fmt.Sprintf("unknown reason: %v", r.kind))
	}
	return nil
}

func (r *fileIncludeReason) computeReferenceFileRelatedInfo(program *Program) *ast.Diagnostic {
	referenceLocation := program.includeProcessor.getReferenceLocation(r, program)
	if referenceLocation.isSynthetic {
		return nil
	}
	switch r.kind {
	case fileIncludeKindImport:
		return referenceLocation.diagnosticAt(diagnostics.File_is_included_via_import_here)
	case fileIncludeKindReferenceFile:
		return referenceLocation.diagnosticAt(diagnostics.File_is_included_via_reference_here)
	case fileIncludeKindTypeReferenceDirective:
		return referenceLocation.diagnosticAt(diagnostics.File_is_included_via_type_library_reference_here)
	case fileIncludeKindLibReferenceDirective:
		return referenceLocation.diagnosticAt(diagnostics.File_is_included_via_library_reference_here)
	default:
		panic(fmt.Sprintf("unknown reason: %v", r.kind))
	}
}
