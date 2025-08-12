package compiler

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type includeProcessor struct {
	fileIncludeReasons    map[tspath.Path][]*fileIncludeReason
	processingDiagnostics []*processingDiagnostic

	reasonToReferenceLocation  collections.SyncMap[*fileIncludeReason, *referenceFileLocation]
	includeReasonToRelatedInfo collections.SyncMap[*fileIncludeReason, *ast.Diagnostic]
	redirectAndFileFormat      collections.SyncMap[tspath.Path, []*ast.Diagnostic]
	computedDiagnostics        *ast.DiagnosticsCollection
	computedDiagnosticsOnce    sync.Once
	compilerOptionsSyntax      *ast.ObjectLiteralExpression
	compilerOptionsSyntaxOnce  sync.Once
}

func updateFileIncludeProcessor(p *Program) {
	p.includeProcessor = &includeProcessor{
		fileIncludeReasons:    p.includeProcessor.fileIncludeReasons,
		processingDiagnostics: p.includeProcessor.processingDiagnostics,
	}
}

func (i *includeProcessor) getDiagnostics(p *Program) *ast.DiagnosticsCollection {
	i.computedDiagnosticsOnce.Do(func() {
		i.computedDiagnostics = &ast.DiagnosticsCollection{}
		for _, d := range i.processingDiagnostics {
			i.computedDiagnostics.Add(d.toDiagnostic(p))
		}
		for _, resolutions := range p.resolvedModules {
			for _, resolvedModule := range resolutions {
				for _, diag := range resolvedModule.ResolutionDiagnostics {
					i.computedDiagnostics.Add(diag)
				}
			}
		}
		for _, typeResolutions := range p.typeResolutionsInFile {
			for _, resolvedTypeRef := range typeResolutions {
				for _, diag := range resolvedTypeRef.ResolutionDiagnostics {
					i.computedDiagnostics.Add(diag)
				}
			}
		}
	})
	return i.computedDiagnostics
}

func (i *includeProcessor) addProcessingDiagnostic(d ...*processingDiagnostic) {
	i.processingDiagnostics = append(i.processingDiagnostics, d...)
}

func (i *includeProcessor) getReferenceLocation(r *fileIncludeReason, program *Program) *referenceFileLocation {
	if existing, ok := i.reasonToReferenceLocation.Load(r); ok {
		return existing
	}

	loc, _ := i.reasonToReferenceLocation.LoadOrStore(r, r.getReferencedLocation(program))
	return loc
}

func (i *includeProcessor) getCompilerOptionsObjectLiteralSyntax(program *Program) *ast.ObjectLiteralExpression {
	i.compilerOptionsSyntaxOnce.Do(func() {
		configFile := program.opts.Config.ConfigFile
		if configFile != nil {
			if compilerOptionsProperty := tsoptions.ForEachTsConfigPropArray(configFile.SourceFile, "compilerOptions", core.Identity); compilerOptionsProperty != nil &&
				compilerOptionsProperty.Initializer != nil &&
				ast.IsObjectLiteralExpression(compilerOptionsProperty.Initializer) {
				i.compilerOptionsSyntax = compilerOptionsProperty.Initializer.AsObjectLiteralExpression()
			}
		} else {
			i.compilerOptionsSyntax = nil
		}
	})
	return i.compilerOptionsSyntax
}

func (i *includeProcessor) getRelatedInfo(r *fileIncludeReason, program *Program) *ast.Diagnostic {
	if existing, ok := i.includeReasonToRelatedInfo.Load(r); ok {
		return existing
	}

	relatedInfo, _ := i.includeReasonToRelatedInfo.LoadOrStore(r, r.toRelatedInfo(program))
	return relatedInfo
}

func (i *includeProcessor) explainRedirectAndImpliedFormat(
	program *Program,
	file *ast.SourceFile,
	toFileName func(fileName string) string,
) []*ast.Diagnostic {
	if existing, ok := i.redirectAndFileFormat.Load(file.Path()); ok {
		return existing
	}
	var result []*ast.Diagnostic
	if source := program.GetSourceOfProjectReferenceIfOutputIncluded(file); source != file.FileName() {
		result = append(result, ast.NewCompilerDiagnostic(
			diagnostics.File_is_output_of_project_reference_source_0,
			toFileName(source),
		))
	}
	// !!! redirects
	// if (file.redirectInfo) {
	//     (result ??= []).push(chainDiagnosticMessages(
	//         /*details*/ undefined,
	//         Diagnostics.File_redirects_to_file_0,
	//         toFileName(file.redirectInfo.redirectTarget, fileNameConvertor),
	//     ));
	// }
	if ast.IsExternalOrCommonJSModule(file) {
		metaData := program.GetSourceFileMetaData(file.Path())
		switch program.GetImpliedNodeFormatForEmit(file) {
		case core.ModuleKindESNext:
			if metaData.PackageJsonType == "module" {
				result = append(result, ast.NewCompilerDiagnostic(
					diagnostics.File_is_ECMAScript_module_because_0_has_field_type_with_value_module,
					toFileName(metaData.PackageJsonDirectory+"/package.json"),
				))
			}
		case core.ModuleKindCommonJS:
			if metaData.PackageJsonType != "" {
				result = append(result, ast.NewCompilerDiagnostic(diagnostics.File_is_CommonJS_module_because_0_has_field_type_whose_value_is_not_module, toFileName(metaData.PackageJsonDirectory+"/package.json")))
			} else if metaData.PackageJsonDirectory != "" {
				if metaData.PackageJsonType == "" {
					result = append(result, ast.NewCompilerDiagnostic(diagnostics.File_is_CommonJS_module_because_0_does_not_have_field_type, toFileName(metaData.PackageJsonDirectory+"/package.json")))
				}
			} else {
				result = append(result, ast.NewCompilerDiagnostic(diagnostics.File_is_CommonJS_module_because_package_json_was_not_found))
			}
		}
	}

	result, _ = i.redirectAndFileFormat.LoadOrStore(file.Path(), result)
	return result
}
