package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func (l *LanguageService) ProvideDefinition(ctx context.Context, documentURI lsproto.DocumentUri, position lsproto.Position) (*lsproto.Definition, error) {
	program, file := l.getProgramAndFile(documentURI)
	node := astnav.GetTouchingPropertyName(file, int(l.converters.LineAndCharacterToPosition(file, position)))
	if node.Kind == ast.KindSourceFile {
		return nil, nil
	}

	checker, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()

	calledDeclaration := tryGetSignatureDeclaration(checker, node)
	if calledDeclaration != nil {
		name := ast.GetNameOfDeclaration(calledDeclaration)
		if name != nil {
			return l.createLocationsFromDeclarations([]*ast.Node{name})
		}
	}

	if symbol := checker.GetSymbolAtLocation(node); symbol != nil {
		if symbol.Flags&ast.SymbolFlagsAlias != 0 {
			if resolved, ok := checker.ResolveAlias(symbol); ok {
				symbol = resolved
			}
		}

		return l.createLocationsFromDeclarations(symbol.Declarations)
	}
	return nil, nil
}

func (l *LanguageService) createLocationsFromDeclarations(declarations []*ast.Node) (*lsproto.Definition, error) {
	locations := make([]lsproto.Location, 0, len(declarations))
	for _, decl := range declarations {
		file := ast.GetSourceFileOfNode(decl)
		loc := decl.Loc
		pos := scanner.GetTokenPosOfNode(decl, file, false /*includeJSDoc*/)
		locations = append(locations, lsproto.Location{
			Uri:   FileNameToDocumentURI(file.FileName()),
			Range: l.converters.ToLSPRange(file, core.NewTextRange(pos, loc.End())),
		})
	}
	return &lsproto.Definition{Locations: &locations}, nil
}

/** Returns a CallLikeExpression where `node` is the target being invoked. */
func getAncestorCallLikeExpression(node *ast.Node) *ast.Node {
	target := ast.FindAncestor(node, func(n *ast.Node) bool {
		return !isRightSideOfPropertyAccess(n)
	})

	callLike := target.Parent
	if callLike != nil && ast.IsCallLikeExpression(callLike) && ast.GetInvokedExpression(callLike) == target {
		return callLike
	}

	return nil
}

func tryGetSignatureDeclaration(typeChecker *checker.Checker, node *ast.Node) *ast.Node {
	var signature *checker.Signature
	callLike := getAncestorCallLikeExpression(node)
	if callLike != nil {
		signature = typeChecker.GetResolvedSignature(callLike)
	}

	// Don't go to a function type, go to the value having that type.
	var declaration *ast.Node
	if signature != nil && signature.Declaration() != nil {
		declaration = signature.Declaration()
		if ast.IsFunctionLike(declaration) && !ast.IsFunctionTypeNode(declaration) {
			return declaration
		}
	}

	return nil
}
