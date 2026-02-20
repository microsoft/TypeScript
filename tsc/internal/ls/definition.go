package ls

import (
	"context"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func (l *LanguageService) ProvideDefinition(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	position lsproto.Position,
) (lsproto.DefinitionResponse, error) {
	caps := lsproto.GetClientCapabilities(ctx)
	clientSupportsLink := caps.TextDocument.Definition.LinkSupport

	program, file := l.getProgramAndFile(documentURI)
	pos := int(l.converters.LineAndCharacterToPosition(file, position))
	node := astnav.GetTouchingPropertyName(file, pos)
	reference := getReferenceAtPosition(file, pos, program)

	if node.Kind == ast.KindSourceFile {
		return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{}, nil
	}

	originSelectionRange := l.createLspRangeFromNode(node, file)
	if reference != nil && reference.file != nil {
		return l.createDefinitionLocations(originSelectionRange, clientSupportsLink, []*ast.Node{}, reference), nil
	}

	c, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()

	if node.Kind == ast.KindOverrideKeyword {
		if sym := getSymbolForOverriddenMember(c, node); sym != nil {
			return l.createDefinitionLocations(originSelectionRange, clientSupportsLink, sym.Declarations, nil /*reference*/), nil
		}
	}

	if ast.IsJumpStatementTarget(node) {
		if label := getTargetLabel(node.Parent, node.Text()); label != nil {
			return l.createDefinitionLocations(originSelectionRange, clientSupportsLink, []*ast.Node{label}, nil /*reference*/), nil
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
			return l.createDefinitionLocations(originSelectionRange, clientSupportsLink, []*ast.Node{fn}, nil /*reference*/), nil
		}
	}

	declarations := getDeclarationsFromLocation(c, node)
	calledDeclaration := tryGetSignatureDeclaration(c, node)
	if calledDeclaration != nil {
		// If we can resolve a call signature, remove all function-like declarations and add that signature.
		nonFunctionDeclarations := core.Filter(slices.Clip(declarations), func(node *ast.Node) bool { return !ast.IsFunctionLike(node) })
		declarations = append(nonFunctionDeclarations, calledDeclaration)
	}
	return l.createDefinitionLocations(originSelectionRange, clientSupportsLink, declarations, reference), nil
}

func (l *LanguageService) ProvideTypeDefinition(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	position lsproto.Position,
) (lsproto.TypeDefinitionResponse, error) {
	caps := lsproto.GetClientCapabilities(ctx)
	clientSupportsLink := caps.TextDocument.TypeDefinition.LinkSupport

	program, file := l.getProgramAndFile(documentURI)
	node := astnav.GetTouchingPropertyName(file, int(l.converters.LineAndCharacterToPosition(file, position)))
	if node.Kind == ast.KindSourceFile {
		return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{}, nil
	}
	originSelectionRange := l.createLspRangeFromNode(node, file)

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
			return l.createDefinitionLocations(originSelectionRange, clientSupportsLink, declarations, nil /*reference*/), nil
		}
		if symbol.Flags&ast.SymbolFlagsValue == 0 && symbol.Flags&ast.SymbolFlagsType != 0 {
			return l.createDefinitionLocations(originSelectionRange, clientSupportsLink, symbol.Declarations, nil /*reference*/), nil
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

type fileRange struct {
	fileName  string
	fileRange core.TextRange
}

func (l *LanguageService) createDefinitionLocations(
	originSelectionRange *lsproto.Range,
	clientSupportsLink bool,
	declarations []*ast.Node,
	reference *refInfo,
) lsproto.DefinitionResponse {
	locations := make([]*lsproto.LocationLink, 0)
	locationRanges := collections.Set[fileRange]{}

	if reference != nil {
		targetRange := lsproto.Range{
			Start: lsproto.Position{
				Line:      0,
				Character: 0,
			},
			End: lsproto.Position{
				Line:      0,
				Character: 0,
			},
		}
		locations = append(locations, &lsproto.LocationLink{
			OriginSelectionRange: originSelectionRange,
			TargetUri:            lsconv.FileNameToDocumentURI(reference.fileName),
			TargetRange:          targetRange,
			TargetSelectionRange: targetRange,
		})
	}

	for _, decl := range declarations {
		file := ast.GetSourceFileOfNode(decl)
		fileName := file.FileName()
		name := core.OrElse(ast.GetNameOfDeclaration(decl), decl)
		nameRange := createRangeFromNode(name, file)
		if locationRanges.AddIfAbsent(fileRange{fileName, nameRange}) {
			contextNode := core.OrElse(getContextNode(decl), decl)
			contextRange := core.OrElse(toContextRange(&nameRange, file, contextNode), &nameRange)
			targetSelectionLoc := l.getMappedLocation(fileName, nameRange)
			targetLoc := l.getMappedLocation(fileName, *contextRange)
			locations = append(locations, &lsproto.LocationLink{
				OriginSelectionRange: originSelectionRange,
				TargetSelectionRange: targetSelectionLoc.Range,
				TargetUri:            targetLoc.Uri,
				TargetRange:          targetLoc.Range,
			})
		}
	}

	if clientSupportsLink {
		return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{DefinitionLinks: &locations}
	}
	return createLocationsFromLinks(locations)
}

func createLocationsFromLinks(links []*lsproto.LocationLink) lsproto.DefinitionResponse {
	locations := core.Map(links, func(link *lsproto.LocationLink) lsproto.Location {
		return lsproto.Location{
			Uri:   link.TargetUri,
			Range: link.TargetSelectionRange,
		}
	})
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
		// Because name in short-hand property assignment has two different meanings: property name and property value,
		// using go-to-definition at such position should go to the variable declaration of the property value rather than
		// go to the declaration of the property name (in this case stay at the same position). However, if go-to-definition
		// is performed at the location of property access, we would like to go to definition of the property in the short-hand
		// assignment. This case and others are handled by the following code.
		// and the contextual type's property declarations
		shorthandSymbol := c.GetResolvedSymbol(node)
		var declarations []*ast.Node
		if shorthandSymbol != nil {
			declarations = shorthandSymbol.Declarations
		}
		contextualDeclarations := getDeclarationsFromObjectLiteralElement(c, node)
		return core.Concatenate(declarations, contextualDeclarations)
	}

	if ast.IsPropertyName(node) && ast.IsBindingElement(node.Parent) && ast.IsObjectBindingPattern(node.Parent.Parent) {
		// If the node is the name of a BindingElement within an ObjectBindingPattern instead of just returning the
		// declaration of the symbol (which is itself), we should try to get to the original type of the
		// ObjectBindingPattern and return the property declaration for the referenced property.
		// For example:
		//      import('./foo').then(({ bar }) => undefined); => should navigate to the declaration in file "./foo"
		//
		//      function bar<T>(onfulfilled: (value: T) => void) { }
		//      interface Test { prop1: number }
		//      bar<Test>(({ prop1 }) => {});  => should navigate to prop1 in Test
		bindingEl := node.Parent.AsBindingElement()
		if bindingEl.DotDotDotToken == nil && node == core.OrElse(bindingEl.PropertyName, node.Parent.Name()) {
			if name, ok := ast.TryGetTextOfPropertyName(node); ok {
				t := c.GetTypeAtLocation(node.Parent.Parent)
				types := []*checker.Type{t}
				if t.IsUnion() {
					types = t.Types()
				}
				var result []*ast.Node
				for _, unionType := range types {
					if prop := c.GetPropertyOfType(unionType, name); prop != nil {
						result = append(result, prop.Declarations...)
					}
				}
				return result
			}
		}
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
		objectLiteralElementDeclarations := getDeclarationsFromObjectLiteralElement(c, node)
		if len(objectLiteralElementDeclarations) > 0 {
			return objectLiteralElementDeclarations
		}
		return symbol.Declarations
	}
	if indexInfos := c.GetIndexSignaturesAtLocation(node); len(indexInfos) != 0 {
		return indexInfos
	}
	return nil
}

// getDeclarationsFromObjectLiteralElement returns declarations from the contextual type
// of an object literal element, if available.
func getDeclarationsFromObjectLiteralElement(c *checker.Checker, node *ast.Node) []*ast.Node {
	element := getContainingObjectLiteralElement(node)
	if element == nil {
		return nil
	}

	contextualType := c.GetContextualType(element.Parent, checker.ContextFlagsNone)
	if contextualType == nil {
		return nil
	}

	properties := c.GetPropertySymbolsFromContextualType(element, contextualType, false /*unionSymbolOk*/)
	if core.Some(properties, func(p *ast.Symbol) bool {
		return p.ValueDeclaration != nil && ast.IsObjectLiteralExpression(p.ValueDeclaration.Parent) && ast.IsObjectLiteralElement(p.ValueDeclaration) && p.ValueDeclaration.Name() == node
	}) {
		if withoutNodeInferencesType := c.GetContextualType(element.Parent, checker.ContextFlagsIgnoreNodeInferences); withoutNodeInferencesType != nil {
			if withoutNodeInferencesProperties := c.GetPropertySymbolsFromContextualType(element, withoutNodeInferencesType, false /*unionSymbolOk*/); len(withoutNodeInferencesProperties) > 0 {
				properties = withoutNodeInferencesProperties
			}
		}
	}

	var result []*ast.Node
	for _, prop := range properties {
		result = append(result, prop.Declarations...)
	}
	return result
}

// Returns a CallLikeExpression where `node` is the target being invoked.
func getAncestorCallLikeExpression(node *ast.Node) *ast.Node {
	target := ast.FindAncestor(node, func(n *ast.Node) bool {
		return !ast.IsRightSideOfPropertyAccess(n)
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
