package declarations

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
)

func needsScopeMarker(result *ast.Node) bool {
	return !ast.IsAnyImportOrReExport(result) && !ast.IsExportAssignment(result) && !ast.HasSyntacticModifier(result, ast.ModifierFlagsExport) && !ast.IsAmbientModule(result)
}

func canHaveLiteralInitializer(host DeclarationEmitHost, node *ast.Node) bool {
	switch node.Kind {
	case ast.KindPropertyDeclaration,
		ast.KindPropertySignature:
		return host.GetEffectiveDeclarationFlags(node, ast.ModifierFlagsPrivate) == 0
	case ast.KindParameter,
		ast.KindVariableDeclaration:
		return true
	}
	return false
}

func canProduceDiagnostics(node *ast.Node) bool {
	return ast.IsVariableDeclaration(node) ||
		ast.IsPropertyDeclaration(node) ||
		ast.IsPropertySignatureDeclaration(node) ||
		ast.IsBindingElement(node) ||
		ast.IsSetAccessorDeclaration(node) ||
		ast.IsGetAccessorDeclaration(node) ||
		ast.IsConstructSignatureDeclaration(node) ||
		ast.IsCallSignatureDeclaration(node) ||
		ast.IsMethodDeclaration(node) ||
		ast.IsMethodSignatureDeclaration(node) ||
		ast.IsFunctionDeclaration(node) ||
		ast.IsParameter(node) ||
		ast.IsTypeParameterDeclaration(node) ||
		ast.IsExpressionWithTypeArguments(node) ||
		ast.IsImportEqualsDeclaration(node) ||
		ast.IsTypeAliasDeclaration(node) ||
		ast.IsJSTypeAliasDeclaration(node) ||
		ast.IsConstructorDeclaration(node) ||
		ast.IsIndexSignatureDeclaration(node) ||
		ast.IsPropertyAccessExpression(node) ||
		ast.IsElementAccessExpression(node) ||
		ast.IsBinaryExpression(node) // || // !!! TODO: JSDoc support
	/* ast.IsJSDocTypeAlias(node); */
}

func hasInferredType(node *ast.Node) bool {
	// Debug.type<HasInferredType>(node); // !!!
	switch node.Kind {
	case ast.KindParameter,
		ast.KindPropertySignature,
		ast.KindPropertyDeclaration,
		ast.KindBindingElement,
		ast.KindPropertyAccessExpression,
		ast.KindElementAccessExpression,
		ast.KindBinaryExpression,
		ast.KindCallExpression,
		ast.KindVariableDeclaration,
		ast.KindExportAssignment,
		ast.KindJSExportAssignment,
		ast.KindPropertyAssignment,
		ast.KindShorthandPropertyAssignment,
		ast.KindJSDocParameterTag,
		ast.KindJSDocPropertyTag,
		ast.KindCommonJSExport:
		return true
	default:
		// assertType<never>(node); // !!!
		return false
	}
}

func isDeclarationAndNotVisible(emitContext *printer.EmitContext, resolver printer.EmitResolver, node *ast.Node) bool {
	node = emitContext.ParseNode(node)
	switch node.Kind {
	case ast.KindFunctionDeclaration,
		ast.KindModuleDeclaration,
		ast.KindInterfaceDeclaration,
		ast.KindClassDeclaration,
		ast.KindTypeAliasDeclaration,
		ast.KindJSTypeAliasDeclaration,
		ast.KindEnumDeclaration:
		return !resolver.IsDeclarationVisible(node)
	// The following should be doing their own visibility checks based on filtering their members
	case ast.KindVariableDeclaration:
		return !getBindingNameVisible(resolver, node)
	case ast.KindImportEqualsDeclaration,
		ast.KindImportDeclaration,
		ast.KindJSImportDeclaration,
		ast.KindExportDeclaration,
		ast.KindJSExportAssignment,
		ast.KindExportAssignment:
		return false
	case ast.KindClassStaticBlockDeclaration:
		return true
	}
	return false
}

func getBindingNameVisible(resolver printer.EmitResolver, elem *ast.Node) bool {
	if ast.IsOmittedExpression(elem) {
		return false
	}
	// TODO: parseArrayBindingElement _never_ parses out an OmittedExpression anymore, instead producing a nameless binding element
	// Audit if OmittedExpression should be removed
	if elem.Name() == nil {
		return false
	}
	if ast.IsBindingPattern(elem.Name()) {
		// If any child binding pattern element has been marked visible (usually by collect linked aliases), then this is visible
		for _, elem := range elem.Name().Elements() {
			if getBindingNameVisible(resolver, elem) {
				return true
			}
		}
		return false
	} else {
		return resolver.IsDeclarationVisible(elem)
	}
}

func isEnclosingDeclaration(node *ast.Node) bool {
	return ast.IsSourceFile(node) ||
		ast.IsTypeAliasDeclaration(node) ||
		ast.IsJSTypeAliasDeclaration(node) ||
		ast.IsModuleDeclaration(node) ||
		ast.IsClassDeclaration(node) ||
		ast.IsInterfaceDeclaration(node) ||
		ast.IsFunctionLike(node) ||
		ast.IsIndexSignatureDeclaration(node) ||
		ast.IsMappedTypeNode(node)
}

func isAlwaysType(node *ast.Node) bool {
	if node.Kind == ast.KindInterfaceDeclaration {
		return true
	}
	return false
}

func maskModifierFlags(host DeclarationEmitHost, node *ast.Node, modifierMask ast.ModifierFlags, modifierAdditions ast.ModifierFlags) ast.ModifierFlags {
	flags := host.GetEffectiveDeclarationFlags(node, modifierMask) | modifierAdditions
	if flags&ast.ModifierFlagsDefault != 0 && (flags&ast.ModifierFlagsExport == 0) {
		// A non-exported default is a nonsequitor - we usually try to remove all export modifiers
		// from statements in ambient declarations; but a default export must retain its export modifier to be syntactically valid
		flags ^= ast.ModifierFlagsExport
	}
	if flags&ast.ModifierFlagsDefault != 0 && flags&ast.ModifierFlagsAmbient != 0 {
		flags ^= ast.ModifierFlagsAmbient // `declare` is never required alongside `default` (and would be an error if printed)
	}
	return flags
}

func unwrapParenthesizedExpression(o *ast.Node) *ast.Node {
	for o.Kind == ast.KindParenthesizedExpression {
		o = o.Expression()
	}
	return o
}

func isPrimitiveLiteralValue(node *ast.Node, includeBigInt bool) bool {
	// !!! Debug.type<PrimitiveLiteral>(node);
	switch node.Kind {
	case ast.KindTrueKeyword,
		ast.KindFalseKeyword,
		ast.KindNumericLiteral,
		ast.KindStringLiteral,
		ast.KindNoSubstitutionTemplateLiteral:
		return true
	case ast.KindBigIntLiteral:
		return includeBigInt
	case ast.KindPrefixUnaryExpression:
		if node.AsPrefixUnaryExpression().Operator == ast.KindMinusToken {
			return ast.IsNumericLiteral(node.AsPrefixUnaryExpression().Operand) || (includeBigInt && ast.IsBigIntLiteral(node.AsPrefixUnaryExpression().Operand))
		}
		if node.AsPrefixUnaryExpression().Operator == ast.KindPlusToken {
			return ast.IsNumericLiteral(node.AsPrefixUnaryExpression().Operand)
		}
		return false
	default:
		// !!! assertType<never>(node);
		return false
	}
}

func isPrivateMethodTypeParameter(host DeclarationEmitHost, node *ast.TypeParameterDeclaration) bool {
	return node.AsNode().Parent.Kind == ast.KindMethodDeclaration && host.GetEffectiveDeclarationFlags(node.AsNode().Parent, ast.ModifierFlagsPrivate) != 0
}

// Returns true if expando properties should be emitted for this function.
// Properties are emitted if any overload in the symbol has a body (implementation).
func shouldEmitFunctionProperties(input *ast.FunctionDeclaration) bool {
	if input.Body != nil {
		return true
	}
	return !core.Every(input.Symbol.Declarations, func(decl *ast.Node) bool {
		return !ast.IsFunctionDeclaration(decl) || decl.AsFunctionDeclaration().Body == nil
	})
}

func getEffectiveBaseTypeNode(node *ast.Node) *ast.Node {
	baseType := ast.GetClassExtendsHeritageElement(node)
	// !!! TODO: JSDoc support
	// if (baseType && isInJSFile(node)) {
	//     // Prefer an @augments tag because it may have type parameters.
	//     const tag = getJSDocAugmentsTag(node);
	//     if (tag) {
	//         return tag.class;
	//     }
	// }
	return baseType
}

func isScopeMarker(node *ast.Node) bool {
	return ast.IsExportAssignment(node) || ast.IsExportDeclaration(node)
}

func hasScopeMarker(statements *ast.StatementList) bool {
	if statements == nil {
		return false
	}
	return core.Some(statements.Nodes, isScopeMarker)
}
