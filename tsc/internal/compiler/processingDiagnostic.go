package compiler

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type processingDiagnosticKind int

const (
	processingDiagnosticKindUnknownReference processingDiagnosticKind = iota
	processingDiagnosticKindExplainingFileInclude
)

type processingDiagnostic struct {
	kind processingDiagnosticKind
	data any
}

func (d *processingDiagnostic) asFileIncludeReason() *fileIncludeReason {
	return d.data.(*fileIncludeReason)
}

type includeExplainingDiagnostic struct {
	file             tspath.Path
	diagnosticReason *fileIncludeReason
	message          *diagnostics.Message
	args             []any
}

func (d *processingDiagnostic) asIncludeExplainingDiagnostic() *includeExplainingDiagnostic {
	return d.data.(*includeExplainingDiagnostic)
}

func (d *processingDiagnostic) toDiagnostic(program *Program) *ast.Diagnostic {
	switch d.kind {
	case processingDiagnosticKindUnknownReference:
		ref := d.asFileIncludeReason()
		loc := ref.getReferencedLocation(program)
		switch ref.kind {
		case fileIncludeKindTypeReferenceDirective:
			return loc.diagnosticAt(diagnostics.Cannot_find_type_definition_file_for_0, loc.ref.FileName)
		case fileIncludeKindLibReferenceDirective:
			libName := tspath.ToFileNameLowerCase(loc.ref.FileName)
			unqualifiedLibName := strings.TrimSuffix(strings.TrimPrefix(libName, "lib."), ".d.ts")
			suggestion := core.GetSpellingSuggestion(unqualifiedLibName, tsoptions.Libs, core.Identity)
			return loc.diagnosticAt(core.IfElse(
				suggestion != "",
				diagnostics.Cannot_find_lib_definition_for_0_Did_you_mean_1,
				diagnostics.Cannot_find_lib_definition_for_0,
			), libName, suggestion)
		default:
			panic("unknown include kind")
		}
	case processingDiagnosticKindExplainingFileInclude:
		return d.createDiagnosticExplainingFile(program)
	default:
		panic("unknown processingDiagnosticKind")
	}
}

func (d *processingDiagnostic) createDiagnosticExplainingFile(program *Program) *ast.Diagnostic {
	diag := d.asIncludeExplainingDiagnostic()
	var includeDetails []*ast.Diagnostic
	var relatedInfo []*ast.Diagnostic
	var redirectInfo []*ast.Diagnostic
	var preferredLocation *fileIncludeReason
	var seenReasons collections.Set[*fileIncludeReason]
	if diag.diagnosticReason.isReferencedFile() && !program.includeProcessor.getReferenceLocation(diag.diagnosticReason, program).isSynthetic {
		preferredLocation = diag.diagnosticReason
	}

	processRelatedInfo := func(includeReason *fileIncludeReason) {
		if preferredLocation == nil && includeReason.isReferencedFile() && !program.includeProcessor.getReferenceLocation(includeReason, program).isSynthetic {
			preferredLocation = includeReason
		} else {
			info := program.includeProcessor.getRelatedInfo(includeReason, program)
			if info != nil {
				relatedInfo = append(relatedInfo, info)
			}
		}
	}
	processInclude := func(includeReason *fileIncludeReason) {
		if !seenReasons.AddIfAbsent(includeReason) {
			return
		}
		includeDetails = append(includeDetails, includeReason.toDiagnostic(program, false))
		processRelatedInfo(includeReason)
	}

	// !!! todo sheetal caching

	if diag.file != "" {
		reasons := program.includeProcessor.fileIncludeReasons[diag.file]
		includeDetails = make([]*ast.Diagnostic, 0, len(reasons))
		for _, reason := range reasons {
			processInclude(reason)
		}
		redirectInfo = program.includeProcessor.explainRedirectAndImpliedFormat(program, program.GetSourceFileByPath(diag.file), func(fileName string) string { return fileName })
	}
	if diag.diagnosticReason != nil {
		processInclude(diag.diagnosticReason)
	}
	var chain []*ast.Diagnostic
	if includeDetails != nil && (preferredLocation == nil || seenReasons.Len() != 1) {
		fileReason := ast.NewCompilerDiagnostic(diagnostics.The_file_is_in_the_program_because_Colon)
		fileReason.SetMessageChain(includeDetails)
		chain = []*ast.Diagnostic{fileReason}
	}
	if redirectInfo != nil {
		chain = append(chain, redirectInfo...)
	}

	var result *ast.Diagnostic
	if preferredLocation != nil {
		result = program.includeProcessor.getReferenceLocation(preferredLocation, program).diagnosticAt(diag.message, diag.args...)
	}
	if result == nil {
		result = ast.NewCompilerDiagnostic(diag.message, diag.args...)
	}
	if chain != nil {
		result.SetMessageChain(chain)
	}
	if relatedInfo != nil {
		result.SetRelatedInfo(relatedInfo)
	}
	return result
}
