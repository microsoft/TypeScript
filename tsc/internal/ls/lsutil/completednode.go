package lsutil

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
)

// PositionBelongsToNode returns true if the position belongs to the node.
// Assumes `candidate.Pos() <= position` holds.
func PositionBelongsToNode(candidate *ast.Node, position int, file *ast.SourceFile) bool {
	if candidate.Pos() > position {
		panic("Expected candidate.pos <= position")
	}
	return position < candidate.End() || !IsCompletedNode(candidate, file)
}

func IsCompletedNode(n *ast.Node, sourceFile *ast.SourceFile) bool {
	if n == nil || ast.NodeIsMissing(n) {
		return false
	}

	switch n.Kind {
	case ast.KindClassDeclaration,
		ast.KindInterfaceDeclaration,
		ast.KindEnumDeclaration,
		ast.KindObjectLiteralExpression,
		ast.KindObjectBindingPattern,
		ast.KindTypeLiteral,
		ast.KindBlock,
		ast.KindModuleBlock,
		ast.KindCaseBlock,
		ast.KindNamedImports,
		ast.KindNamedExports:
		return nodeEndsWith(n, ast.KindCloseBraceToken, sourceFile)

	case ast.KindCatchClause:
		return IsCompletedNode(n.AsCatchClause().Block, sourceFile)

	case ast.KindNewExpression:
		if n.ArgumentList() == nil {
			return true
		}
		fallthrough

	case ast.KindCallExpression,
		ast.KindParenthesizedExpression,
		ast.KindParenthesizedType:
		return nodeEndsWith(n, ast.KindCloseParenToken, sourceFile)

	case ast.KindFunctionType,
		ast.KindConstructorType:
		return IsCompletedNode(n.Type(), sourceFile)

	case ast.KindConstructor,
		ast.KindGetAccessor,
		ast.KindSetAccessor,
		ast.KindFunctionDeclaration,
		ast.KindFunctionExpression,
		ast.KindMethodDeclaration,
		ast.KindMethodSignature,
		ast.KindConstructSignature,
		ast.KindCallSignature,
		ast.KindArrowFunction:
		if n.Body() != nil {
			return IsCompletedNode(n.Body(), sourceFile)
		}
		if n.Type() != nil {
			return IsCompletedNode(n.Type(), sourceFile)
		}
		// Even though type parameters can be unclosed, we can get away with
		// having at least a closing paren.
		return hasChildOfKind(n, ast.KindCloseParenToken, sourceFile)

	case ast.KindModuleDeclaration:
		return n.Body() != nil && IsCompletedNode(n.Body(), sourceFile)

	case ast.KindIfStatement:
		if n.AsIfStatement().ElseStatement != nil {
			return IsCompletedNode(n.AsIfStatement().ElseStatement, sourceFile)
		}
		return IsCompletedNode(n.AsIfStatement().ThenStatement, sourceFile)

	case ast.KindExpressionStatement:
		return IsCompletedNode(n.Expression(), sourceFile) ||
			hasChildOfKind(n, ast.KindSemicolonToken, sourceFile)

	case ast.KindArrayLiteralExpression,
		ast.KindArrayBindingPattern,
		ast.KindElementAccessExpression,
		ast.KindComputedPropertyName,
		ast.KindTupleType:
		return nodeEndsWith(n, ast.KindCloseBracketToken, sourceFile)

	case ast.KindIndexSignature:
		if n.AsIndexSignatureDeclaration().Type != nil {
			return IsCompletedNode(n.AsIndexSignatureDeclaration().Type, sourceFile)
		}
		return hasChildOfKind(n, ast.KindCloseBracketToken, sourceFile)

	case ast.KindCaseClause,
		ast.KindDefaultClause:
		// there is no such thing as terminator token for CaseClause/DefaultClause so for simplicity always consider them non-completed
		return false

	case ast.KindForStatement,
		ast.KindForInStatement,
		ast.KindForOfStatement,
		ast.KindWhileStatement:
		return IsCompletedNode(n.Statement(), sourceFile)
	case ast.KindDoStatement:
		// rough approximation: if DoStatement has While keyword - then if node is completed is checking the presence of ')';
		if hasChildOfKind(n, ast.KindWhileKeyword, sourceFile) {
			return nodeEndsWith(n, ast.KindCloseParenToken, sourceFile)
		}
		return IsCompletedNode(n.Statement(), sourceFile)

	case ast.KindTypeQuery:
		return IsCompletedNode(n.AsTypeQueryNode().ExprName, sourceFile)

	case ast.KindTypeOfExpression,
		ast.KindDeleteExpression,
		ast.KindVoidExpression,
		ast.KindYieldExpression,
		ast.KindSpreadElement:
		return IsCompletedNode(n.Expression(), sourceFile)

	case ast.KindTaggedTemplateExpression:
		return IsCompletedNode(n.AsTaggedTemplateExpression().Template, sourceFile)

	case ast.KindTemplateExpression:
		if n.AsTemplateExpression().TemplateSpans == nil {
			return false
		}
		lastSpan := core.LastOrNil(n.AsTemplateExpression().TemplateSpans.Nodes)
		return IsCompletedNode(lastSpan, sourceFile)

	case ast.KindTemplateSpan:
		return ast.NodeIsPresent(n.AsTemplateSpan().Literal)

	case ast.KindExportDeclaration,
		ast.KindImportDeclaration:
		return ast.NodeIsPresent(n.ModuleSpecifier())

	case ast.KindPrefixUnaryExpression:
		return IsCompletedNode(n.AsPrefixUnaryExpression().Operand, sourceFile)

	case ast.KindBinaryExpression:
		return IsCompletedNode(n.AsBinaryExpression().Right, sourceFile)

	case ast.KindConditionalExpression:
		return IsCompletedNode(n.AsConditionalExpression().WhenFalse, sourceFile)

	default:
		return true
	}
}

// Checks if node ends with 'expectedLastToken'.
// If child at position 'length - 1' is 'SemicolonToken' it is skipped and 'expectedLastToken' is compared with child at position 'length - 2'.
func nodeEndsWith(n *ast.Node, expectedLastToken ast.Kind, sourceFile *ast.SourceFile) bool {
	lastChildNode := GetLastVisitedChild(n, sourceFile)
	var lastNodeAndTokens []*ast.Node
	var tokenStartPos int
	if lastChildNode != nil {
		lastNodeAndTokens = []*ast.Node{lastChildNode}
		tokenStartPos = lastChildNode.End()
	} else {
		tokenStartPos = n.Pos()
	}
	scanner := scanner.GetScannerForSourceFile(sourceFile, tokenStartPos)
	for startPos := tokenStartPos; startPos < n.End(); {
		tokenKind := scanner.Token()
		tokenFullStart := scanner.TokenFullStart()
		tokenEnd := scanner.TokenEnd()
		token := sourceFile.GetOrCreateToken(tokenKind, tokenFullStart, tokenEnd, n, scanner.TokenFlags())
		lastNodeAndTokens = append(lastNodeAndTokens, token)
		startPos = tokenEnd
		scanner.Scan()
	}
	if len(lastNodeAndTokens) == 0 {
		return false
	}
	lastChild := lastNodeAndTokens[len(lastNodeAndTokens)-1]
	if lastChild.Kind == expectedLastToken {
		return true
	} else if lastChild.Kind == ast.KindSemicolonToken && len(lastNodeAndTokens) > 1 {
		return lastNodeAndTokens[len(lastNodeAndTokens)-2].Kind == expectedLastToken
	}
	return false
}

func hasChildOfKind(containingNode *ast.Node, kind ast.Kind, sourceFile *ast.SourceFile) bool {
	return astnav.FindChildOfKind(containingNode, kind, sourceFile) != nil
}
