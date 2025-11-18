package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

func (l *LanguageService) ProvideDiagnostics(ctx context.Context, uri lsproto.DocumentUri) (lsproto.DocumentDiagnosticResponse, error) {
	program, file := l.getProgramAndFile(uri)

	diagnostics := make([][]*ast.Diagnostic, 0, 4)
	diagnostics = append(diagnostics, program.GetSyntacticDiagnostics(ctx, file))
	diagnostics = append(diagnostics, program.GetSemanticDiagnostics(ctx, file))
	// !!! user preference for suggestion diagnostics; keep only unnecessary/deprecated?
	// See: https://github.com/microsoft/vscode/blob/3dbc74129aaae102e5cb485b958fa5360e8d3e7a/extensions/typescript-language-features/src/languageFeatures/diagnostics.ts#L114
	// TODO: also implement reportStyleCheckAsWarnings to rewrite diags with Warning severity
	diagnostics = append(diagnostics, program.GetSuggestionDiagnostics(ctx, file))
	if program.Options().GetEmitDeclarations() {
		diagnostics = append(diagnostics, program.GetDeclarationDiagnostics(ctx, file))
	}

	return lsproto.RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport{
		FullDocumentDiagnosticReport: &lsproto.RelatedFullDocumentDiagnosticReport{
			Items: l.toLSPDiagnostics(ctx, diagnostics...),
		},
	}, nil
}

func (l *LanguageService) toLSPDiagnostics(ctx context.Context, diagnostics ...[]*ast.Diagnostic) []*lsproto.Diagnostic {
	size := 0
	for _, diagSlice := range diagnostics {
		size += len(diagSlice)
	}
	lspDiagnostics := make([]*lsproto.Diagnostic, 0, size)
	for _, diagSlice := range diagnostics {
		for _, diag := range diagSlice {
			lspDiagnostics = append(lspDiagnostics, lsconv.DiagnosticToLSPPull(ctx, l.converters, diag))
		}
	}
	return lspDiagnostics
}
