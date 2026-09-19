package ls

import (
	"context"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/astnav"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/ls/change"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
)

const convertToTypeOnlyImportFixID = "convertToTypeOnlyImport"

var convertToTypeOnlyImportErrorCodes = []int32{
	diagnostics.X_0_is_a_type_and_must_be_imported_using_a_type_only_import_when_verbatimModuleSyntax_is_enabled.Code(),
	diagnostics.X_0_resolves_to_a_type_only_declaration_and_must_be_imported_using_a_type_only_import_when_verbatimModuleSyntax_is_enabled.Code(),
}

var ConvertToTypeOnlyImportProvider = &CodeFixProvider{
	ErrorCodes:     convertToTypeOnlyImportErrorCodes,
	GetCodeActions: getConvertToTypeOnlyImportCodeActions,
	FixIds:         []string{convertToTypeOnlyImportFixID},
}

func getConvertToTypeOnlyImportCodeActions(ctx context.Context, fixContext *CodeFixContext) ([]*CodeAction, error) {
	importDeclaration := getImportDeclarationForSoleSpecifier(fixContext.SourceFile, fixContext.Span.Pos())
	if importDeclaration == nil {
		return nil, nil
	}

	tracker := change.NewTracker(ctx, fixContext.Program.Options(), fixContext.LS.FormatOptions(), fixContext.LS.converters)
	// Do not reprint the import declaration: its attached trivia would be emitted
	// again while the original comments remain outside the replacement range.
	scan := scanner.GetScannerForSourceFile(fixContext.SourceFile, importDeclaration.Pos())
	if scan.Token() != ast.KindImportKeyword {
		return nil, nil
	}
	position := scan.TokenEnd()
	tracker.ReplaceTextRangeWithText(fixContext.SourceFile, core.NewTextRange(position, position), " type")

	changes, unmappable := tracker.GetChanges()
	if len(unmappable) != 0 {
		return nil, nil
	}
	return []*CodeAction{{
		Description: diagnostics.Use_import_type.Localize(locale.FromContext(ctx)),
		Changes:     changes[fixContext.SourceFile.OriginalFileName()],
		FixID:       convertToTypeOnlyImportFixID,
	}}, nil
}

// getImportDeclarationForSoleSpecifier limits this text-only edit to the
// `import { Foo } from "..."` shape, where adding `type` changes no other import.
func getImportDeclarationForSoleSpecifier(sourceFile *ast.SourceFile, pos int) *ast.Node {
	token := astnav.GetTokenAtPosition(sourceFile, pos)
	if token == nil || token.Parent == nil || token.Parent.Kind != ast.KindImportSpecifier {
		return nil
	}
	specifier := token.Parent
	if specifier.Parent == nil || specifier.Parent.Kind != ast.KindNamedImports || specifier.Parent.Parent == nil || specifier.Parent.Parent.Kind != ast.KindImportClause || specifier.Parent.Parent.Parent == nil || specifier.Parent.Parent.Parent.Kind != ast.KindImportDeclaration {
		return nil
	}

	namedImports := specifier.Parent.AsNamedImports()
	if len(namedImports.Elements.Nodes) != 1 || namedImports.Elements.Nodes[0] != specifier {
		return nil
	}
	importClause := specifier.Parent.Parent.AsImportClause()
	if importClause.IsTypeOnly() || importClause.Name() != nil {
		return nil
	}
	return specifier.Parent.Parent.Parent
}
