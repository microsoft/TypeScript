package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

func (l *LanguageService) GetDocumentDiagnostics(ctx context.Context, documentURI lsproto.DocumentUri) (*lsproto.DocumentDiagnosticReport, error) {
	program, file := l.getProgramAndFile(documentURI)
	syntaxDiagnostics := program.GetSyntacticDiagnostics(ctx, file)
	var lspDiagnostics []*lsproto.Diagnostic
	if len(syntaxDiagnostics) != 0 {
		lspDiagnostics = make([]*lsproto.Diagnostic, len(syntaxDiagnostics))
		for i, diag := range syntaxDiagnostics {
			lspDiagnostics[i] = toLSPDiagnostic(diag, l.converters)
		}
	} else {
		checker, done := program.GetTypeCheckerForFile(ctx, file)
		defer done()
		semanticDiagnostics := checker.GetDiagnostics(ctx, file)
		lspDiagnostics = make([]*lsproto.Diagnostic, len(semanticDiagnostics))
		for i, diag := range semanticDiagnostics {
			lspDiagnostics[i] = toLSPDiagnostic(diag, l.converters)
		}
	}
	return &lsproto.DocumentDiagnosticReport{
		RelatedFullDocumentDiagnosticReport: &lsproto.RelatedFullDocumentDiagnosticReport{
			FullDocumentDiagnosticReport: lsproto.FullDocumentDiagnosticReport{
				Kind:  lsproto.StringLiteralFull{},
				Items: lspDiagnostics,
			},
		},
	}, nil
}

func toLSPDiagnostic(diagnostic *ast.Diagnostic, converters *Converters) *lsproto.Diagnostic {
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

	return &lsproto.Diagnostic{
		Range: converters.ToLSPRange(diagnostic.File(), diagnostic.Loc()),
		Code: &lsproto.IntegerOrString{
			Integer: ptrTo(diagnostic.Code()),
		},
		Severity:           &severity,
		Message:            diagnostic.Message(),
		Source:             ptrTo("ts"),
		RelatedInformation: &relatedInformation,
	}
}
