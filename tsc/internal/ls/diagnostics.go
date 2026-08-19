package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/spanmap"
)

// getAllDiagnostics collects all diagnostics for a file: syntactic, semantic,
// suggestion, and (when declarations are emitted) declaration diagnostics.
func getAllDiagnostics(ctx context.Context, program *compiler.Program, file *ast.SourceFile) []*ast.Diagnostic {
	var diags []*ast.Diagnostic
	files := append([]*ast.SourceFile{file}, file.SupplementalSourceFiles()...)
	for _, sourceFile := range files {
		diags = append(diags, program.GetSyntacticDiagnostics(ctx, sourceFile)...)
		diags = append(diags, program.GetSemanticDiagnostics(ctx, sourceFile)...)
		diags = append(diags, program.GetSuggestionDiagnostics(ctx, sourceFile)...)
		if program.Options().GetEmitDeclarations() {
			diags = append(diags, program.GetDeclarationDiagnostics(ctx, sourceFile)...)
		}
	}
	return diags
}

func (l *LanguageService) ProvideDiagnostics(ctx context.Context, uri lsproto.DocumentUri) (lsproto.DocumentDiagnosticResponse, error) {
	program, file := l.getProgramAndFile(uri)

	if l.UserPreferences().EnableValidation.IsFalse() {
		diagnostics := []*lsproto.Diagnostic{}
		return lsproto.RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport{
			FullDocumentDiagnosticReport: &lsproto.RelatedFullDocumentDiagnosticReport{
				Items: diagnostics,
			},
		}, nil
	}

	diagnostics := getAllDiagnostics(ctx, program, file)

	return lsproto.RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport{
		FullDocumentDiagnosticReport: &lsproto.RelatedFullDocumentDiagnosticReport{
			Items: l.toLSPDiagnostics(ctx, diagnostics),
		},
	}, nil
}

func (l *LanguageService) toLSPDiagnostics(ctx context.Context, diagnostics ...[]*ast.Diagnostic) []*lsproto.Diagnostic {
	reportStyleChecksAsWarnings := l.UserPreferences().ReportStyleChecksAsWarnings.IsTrue()
	size := 0
	for _, diagSlice := range diagnostics {
		size += len(diagSlice)
	}
	lspDiagnostics := make([]*lsproto.Diagnostic, 0, size)
	// Compiler diagnostics located entirely in a content-mapped file's synthesized code have no location
	// in the original file. Collect them per file and surface them through a single aggregate at the top
	// of the file (with the real messages as related information) rather than dropping them or scattering
	// them at position 0.
	var synthesizedByFile collections.OrderedMap[*ast.SourceFile, []*ast.Diagnostic]
	for _, diagSlice := range diagnostics {
		for _, diag := range diagSlice {
			if isSynthesizedContentMappedDiagnostic(diag) {
				synthesizedByFile.Set(diag.File(), append(synthesizedByFile.GetOrZero(diag.File()), diag))
				continue
			}
			lspDiagnostics = append(lspDiagnostics, lsconv.DiagnosticToLSPPull(ctx, l.converters, diag, reportStyleChecksAsWarnings))
		}
	}
	for file, diags := range synthesizedByFile.Entries() {
		aggregate := aggregateSynthesizedDiagnostics(file, diags)
		lspDiagnostics = append(lspDiagnostics, lsconv.DiagnosticToLSPPull(ctx, l.converters, aggregate, reportStyleChecksAsWarnings))
	}
	return lspDiagnostics
}

// isSynthesizedContentMappedDiagnostic reports whether diag is a compiler diagnostic on a content-mapped
// file whose location lies entirely in synthesized virtual code with no counterpart in the original
// file, and so has no meaningful position to report against the original file.
func isSynthesizedContentMappedDiagnostic(diag *ast.Diagnostic) bool {
	file := diag.File()
	if file == nil || file.SpanMap() == nil || diag.Source() != "" {
		return false
	}
	_, fidelity := file.SpanMap().VirtualToOriginalSpan(diag.Loc())
	return fidelity == spanmap.FidelityNone
}

// aggregateSynthesizedDiagnostics builds a single diagnostic at the top of a content-mapped file standing
// in for compiler diagnostics located in synthesized code with no original location. The originals are
// attached as related information so their messages are surfaced rather than silently dropped. (A later
// change will point the related locations at a read-only view of the file's virtual TypeScript.)
func aggregateSynthesizedDiagnostics(file *ast.SourceFile, diags []*ast.Diagnostic) *ast.Diagnostic {
	aggregate := ast.NewDiagnostic(
		file,
		core.NewTextRange(0, 0),
		diagnostics.Virtual_code_produced_by_the_content_mapper_0_has_problems_with_no_corresponding_location_in_this_file,
		file.ContentMapper(),
	)
	aggregate.SetRelatedInfo(diags)
	aggregate.SetCategory(worstCategory(diags))
	return aggregate
}

func worstCategory(diags []*ast.Diagnostic) diagnostics.Category {
	worst := diags[0].Category()
	for _, diag := range diags {
		switch diag.Category() {
		case diagnostics.CategoryError:
			return diagnostics.CategoryError
		case diagnostics.CategoryWarning:
			worst = diagnostics.CategoryWarning
		}
	}
	return worst
}
