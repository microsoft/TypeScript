package ls

import (
	"context"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/diagnosticwriter"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

func (l *LanguageService) ProvideDiagnostics(ctx context.Context, uri lsproto.DocumentUri) (lsproto.DocumentDiagnosticResponse, error) {
	program, file := l.getProgramAndFile(uri)

	diagnostics := make([][]*ast.Diagnostic, 0, 4)
	diagnostics = append(diagnostics, program.GetSyntacticDiagnostics(ctx, file))
	diagnostics = append(diagnostics, program.GetSemanticDiagnostics(ctx, file))
	// !!! user preference for suggestion diagnostics; keep only unnecessary/deprecated?
	// See: https://github.com/microsoft/vscode/blob/3dbc74129aaae102e5cb485b958fa5360e8d3e7a/extensions/typescript-language-features/src/languageFeatures/diagnostics.ts#L114
	diagnostics = append(diagnostics, program.GetSuggestionDiagnostics(ctx, file))
	if program.Options().GetEmitDeclarations() {
		diagnostics = append(diagnostics, program.GetDeclarationDiagnostics(ctx, file))
	}

	return lsproto.RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport{
		FullDocumentDiagnosticReport: &lsproto.RelatedFullDocumentDiagnosticReport{
			Items: toLSPDiagnostics(l.converters, diagnostics...),
		},
	}, nil
}

func toLSPDiagnostics(converters *Converters, diagnostics ...[]*ast.Diagnostic) []*lsproto.Diagnostic {
	size := 0
	for _, diagSlice := range diagnostics {
		size += len(diagSlice)
	}
	lspDiagnostics := make([]*lsproto.Diagnostic, 0, size)
	for _, diagSlice := range diagnostics {
		for _, diag := range diagSlice {
			lspDiagnostics = append(lspDiagnostics, toLSPDiagnostic(converters, diag))
		}
	}
	return lspDiagnostics
}

func toLSPDiagnostic(converters *Converters, diagnostic *ast.Diagnostic) *lsproto.Diagnostic {
	var severity lsproto.DiagnosticSeverity
	switch diagnostic.Category() {
	case diagnostics.CategorySuggestion:
		severity = lsproto.DiagnosticSeverityHint
	case diagnostics.CategoryMessage:
		severity = lsproto.DiagnosticSeverityInformation
	case diagnostics.CategoryWarning:
		severity = lsproto.DiagnosticSeverityWarning
	default:
		severity = lsproto.DiagnosticSeverityError
	}

	relatedInformation := make([]*lsproto.DiagnosticRelatedInformation, 0, len(diagnostic.RelatedInformation()))
	for _, related := range diagnostic.RelatedInformation() {
		relatedInformation = append(relatedInformation, &lsproto.DiagnosticRelatedInformation{
			Location: lsproto.Location{
				Uri:   FileNameToDocumentURI(related.File().FileName()),
				Range: converters.ToLSPRange(related.File(), related.Loc()),
			},
			Message: related.Message(),
		})
	}

	var tags []lsproto.DiagnosticTag
	if diagnostic.ReportsUnnecessary() || diagnostic.ReportsDeprecated() {
		tags = make([]lsproto.DiagnosticTag, 0, 2)
		if diagnostic.ReportsUnnecessary() {
			tags = append(tags, lsproto.DiagnosticTagUnnecessary)
		}
		if diagnostic.ReportsDeprecated() {
			tags = append(tags, lsproto.DiagnosticTagDeprecated)
		}
	}

	return &lsproto.Diagnostic{
		Range: converters.ToLSPRange(diagnostic.File(), diagnostic.Loc()),
		Code: &lsproto.IntegerOrString{
			Integer: ptrTo(diagnostic.Code()),
		},
		Severity:           &severity,
		Message:            messageChainToString(diagnostic),
		Source:             ptrTo("ts"),
		RelatedInformation: ptrToSliceIfNonEmpty(relatedInformation),
		Tags:               ptrToSliceIfNonEmpty(tags),
	}
}

func messageChainToString(diagnostic *ast.Diagnostic) string {
	if len(diagnostic.MessageChain()) == 0 {
		return diagnostic.Message()
	}
	var b strings.Builder
	diagnosticwriter.WriteFlattenedDiagnosticMessage(&b, diagnostic, "\n")
	return b.String()
}

func ptrToSliceIfNonEmpty[T any](s []T) *[]T {
	if len(s) == 0 {
		return nil
	}
	return &s
}
