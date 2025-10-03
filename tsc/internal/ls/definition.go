package ls

import (
	"context"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func (l *LanguageService) ProvideDefinition(ctx context.Context, documentURI lsproto.DocumentUri, position lsproto.Position) (lsproto.DefinitionResponse, error) {
	program, file := l.getProgramAndFile(documentURI)
	node := astnav.GetTouchingPropertyName(file, int(l.converters.LineAndCharacterToPosition(file, position)))
	if node.Kind == ast.KindSourceFile {
		return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{}, nil
	}

	c, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()

	if node.Kind == ast.KindOverrideKeyword {
		if sym := getSymbolForOverriddenMember(c, node); sym != nil {
			return l.createLocationsFromDeclarations(sym.Declarations), nil
		}
	}

	if ast.IsJumpStatementTarget(node) {
		if label := getTargetLabel(node.Parent, node.Text()); label != nil {
			return l.createLocationsFromDeclarations([]*ast.Node{label}), nil
		}
	}

	if node.Kind == ast.KindCaseKeyword || node.Kind == ast.KindDefaultKeyword && ast.IsDefaultClause(node.Parent) {
		if stmt := ast.FindAncestor(node.Parent, ast.IsSwitchStatement); stmt != nil {
			file := ast.GetSourceFileOfNode(stmt)
			return l.createLocationFromFileAndRange(file, scanner.GetRangeOfTokenAtPosition(file, stmt.Pos())), nil
		}
	}

	if node.Kind == ast.KindReturnKeyword || node.Kind == ast.KindYieldKeyword || node.Kind == ast.KindAwaitKeyword {
		if fn := ast.FindAncestor(node, ast.IsFunctionLikeDeclaration); fn != nil {
			return l.createLocationsFromDeclarations([]*ast.Node{fn}), nil
		}
	}

	declarations := getDeclarationsFromLocation(c, node)
	calledDeclaration := tryGetSignatureDeclaration(c, node)
	if calledDeclaration != nil {
		// If we can resolve a call signature, remove all function-like declarations and add that signature.
		nonFunctionDeclarations := core.Filter(slices.Clip(declarations), func(node *ast.Node) bool { return !ast.IsFunctionLike(node) })
		declarations = append(nonFunctionDeclarations, calledDeclaration)
	}
	return l.createLocationsFromDeclarations(declarations), nil
}

func (l *LanguageService) ProvideTypeDefinition(ctx context.Context, documentURI lsproto.DocumentUri, position lsproto.Position) (lsproto.DefinitionResponse, error) {
	program, file := l.getProgramAndFile(documentURI)
	node := astnav.GetTouchingPropertyName(file, int(l.converters.LineAndCharacterToPosition(file, position)))
	if node.Kind == ast.KindSourceFile {
		return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{}, nil
	}

	c, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()

	node = getDeclarationNameForKeyword(node)

	if symbol := c.GetSymbolAtLocation(node); symbol != nil {
		symbolType := getTypeOfSymbolAtLocation(c, symbol, node)
		declarations := getDeclarationsFromType(symbolType)
		if typeArgument := c.GetFirstTypeArgumentFromKnownType(symbolType); typeArgument != nil {
			declarations = core.Concatenate(getDeclarationsFromType(typeArgument), declarations)
		}
		if len(declarations) != 0 {
			return l.createLocationsFromDeclarations(declarations), nil
		}
		if symbol.Flags&ast.SymbolFlagsValue == 0 && symbol.Flags&ast.SymbolFlagsType != 0 {
			return l.createLocationsFromDeclarations(symbol.Declarations), nil
		}
	}

	return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{}, nil
}

func getDeclarationNameForKeyword(node *ast.Node) *ast.Node {
	if node.Kind >= ast.KindFirstKeyword && node.Kind <= ast.KindLastKeyword {
		if ast.IsVariableDeclarationList(node.Parent) {
			if decl := core.FirstOrNil(node.Parent.AsVariableDeclarationList().Declarations.Nodes); decl != nil && decl.Name() != nil {
				return decl.Name()
			}
		} else if node.Parent.DeclarationData() != nil && node.Parent.Name() != nil && node.Pos() < node.Parent.Name().Pos() {
			return node.Parent.Name()
		}
	}
	return node
}

func (l *LanguageService) createLocationsFromDeclarations(declarations []*ast.Node) lsproto.DefinitionResponse {
	locations := make([]lsproto.Location, 0, len(declarations))
	for _, decl := range declarations {
		file := ast.GetSourceFileOfNode(decl)
		name := core.OrElse(ast.GetNameOfDeclaration(decl), decl)
		nodeRange := createRangeFromNode(name, file)
		mappedLocation := l.getMappedLocation(file.FileName(), nodeRange)
		locations = core.AppendIfUnique(locations, mappedLocation)
	}
	return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{Locations: &locations}
}

func (l *LanguageService) createLocationFromFileAndRange(file *ast.SourceFile, textRange core.TextRange) lsproto.DefinitionResponse {
	mappedLocation := l.getMappedLocation(file.FileName(), textRange)
	return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{
		Location: &mappedLocation,
	}
}

func getDeclarationsFromLocation(c *checker.Checker, node *ast.Node) []*ast.Node {
	if ast.IsIdentifier(node) && ast.IsShorthandPropertyAssignment(node.Parent) {
		return c.GetResolvedSymbol(node).Declarations
	}
	node = getDeclarationNameForKeyword(node)
	if symbol := c.GetSymbolAtLocation(node); symbol != nil {
		if symbol.Flags&ast.SymbolFlagsClass != 0 && symbol.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsVariable) == 0 && node.Kind == ast.KindConstructorKeyword {
			if constructor := symbol.Members[ast.InternalSymbolNameConstructor]; constructor != nil {
				symbol = constructor
			}
		}
		if symbol.Flags&ast.SymbolFlagsAlias != 0 {
			if resolved, ok := c.ResolveAlias(symbol); ok {
				symbol = resolved
			}
		}
		if symbol.Flags&(ast.SymbolFlagsProperty|ast.SymbolFlagsMethod|ast.SymbolFlagsAccessor) != 0 && symbol.Parent != nil && symbol.Parent.Flags&ast.SymbolFlagsObjectLiteral != 0 {
			if objectLiteral := core.FirstOrNil(symbol.Parent.Declarations); objectLiteral != nil {
				if declarations := c.GetContextualDeclarationsForObjectLiteralElement(objectLiteral, symbol.Name); len(declarations) != 0 {
					return declarations
				}
			}
		}
		return symbol.Declarations
	}
	if indexInfos := c.GetIndexSignaturesAtLocation(node); len(indexInfos) != 0 {
		return indexInfos
	}
	return nil
}

// Returns a CallLikeExpression where `node` is the target being invoked.
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

func getSymbolForOverriddenMember(typeChecker *checker.Checker, node *ast.Node) *ast.Symbol {
	classElement := ast.FindAncestor(node, ast.IsClassElement)
	if classElement == nil || classElement.Name() == nil {
		return nil
	}
	baseDeclaration := ast.FindAncestor(classElement, ast.IsClassLike)
	if baseDeclaration == nil {
		return nil
	}
	baseTypeNode := ast.GetClassExtendsHeritageElement(baseDeclaration)
	if baseTypeNode == nil {
		return nil
	}
	expression := ast.SkipParentheses(baseTypeNode.Expression())
	var base *ast.Symbol
	if ast.IsClassExpression(expression) {
		base = expression.Symbol()
	} else {
		base = typeChecker.GetSymbolAtLocation(expression)
	}
	if base == nil {
		return nil
	}
	name := ast.GetTextOfPropertyName(classElement.Name())
	if ast.HasStaticModifier(classElement) {
		return typeChecker.GetPropertyOfType(typeChecker.GetTypeOfSymbol(base), name)
	}
	return typeChecker.GetPropertyOfType(typeChecker.GetDeclaredTypeOfSymbol(base), name)
}

func getTypeOfSymbolAtLocation(c *checker.Checker, symbol *ast.Symbol, node *ast.Node) *checker.Type {
	t := c.GetTypeOfSymbolAtLocation(symbol, node)
	// If the type is just a function's inferred type, go-to-type should go to the return type instead since
	// go-to-definition takes you to the function anyway.
	if t.Symbol() == symbol || t.Symbol() != nil && symbol.ValueDeclaration != nil && ast.IsVariableDeclaration(symbol.ValueDeclaration) && symbol.ValueDeclaration.Initializer() == t.Symbol().ValueDeclaration {
		sigs := c.GetCallSignatures(t)
		if len(sigs) == 1 {
			return c.GetReturnTypeOfSignature(sigs[0])
		}
	}
	return t
}

func getDeclarationsFromType(t *checker.Type) []*ast.Node {
	var result []*ast.Node
	for _, t := range t.Distributed() {
		if t.Symbol() != nil {
			for _, decl := range t.Symbol().Declarations {
				result = core.AppendIfUnique(result, decl)
			}
		}
	}
	return result
}
